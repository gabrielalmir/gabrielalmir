/**
 * Campo de tinta — a cena de fundo do hero.
 *
 * É um quad em tela cheia, não uma cena 3D: a imagem inteira sai do fragment
 * shader. Por isso não há luz, material PBR, depth nem pós-processamento, e a
 * câmera ortográfica existe só porque `render()` exige uma.
 *
 * A cena é enfeite: nada de conteúdo depende dela. Se o contexto não nascer, o
 * erro sobe para quem montou, que já mostra o fundo estático no lugar.
 */
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import fragmentShader from './shaders/ink.frag.glsl?raw';
import vertexShader from './shaders/ink.vert.glsl?raw';

/** Segundos até o último respingo ter caído. */
const REVEAL_DURATION = 2.5;

/**
 * O drift do shader é circular e o ciclo fecha aqui: em ink.frag.glsl o ângulo
 * é `uTime * 0.01875`, então 2π/0.01875 é a única volta em que o wrap some.
 * Mexer na taxa lá obriga a mexer neste número.
 */
const TIME_PERIOD = (Math.PI * 2) / 0.01875;

/** Fração do caminho que o mouse suavizado cobre por quadro, a 60 Hz. */
const MOUSE_EASING = 0.045;

/** Um quadro travado não pode empurrar o campo meio segundo de uma vez. */
const MAX_DELTA = 0.05;

/**
 * Relógio de delta em segundos.
 *
 * O `Clock` do three está deprecado em favor do `Timer`, que traz um ciclo de
 * update próprio que esta cena não usa — o loop já é um rAF só. São seis linhas
 * e uma dependência a menos no bundle.
 *
 * `start()` zera a referência: voltar de uma aba oculta precisa custar um
 * quadro, não os quarenta segundos em que a aba ficou parada.
 */
function createDeltaClock(): { start(): void; stop(): void; getDelta(): number } {
  let last = 0;
  let running = false;

  return {
    start() {
      last = performance.now();
      running = true;
    },
    stop() {
      running = false;
    },
    getDelta() {
      if (!running) return 0;
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      return delta;
    },
  };
}

export function mountInkField(canvas: HTMLCanvasElement): () => void {
  const renderer = new WebGLRenderer({
    canvas,
    // É um quad: não existe aresta de geometria para o MSAA suavizar.
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
  });

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new PlaneGeometry(2, 2);

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uReveal: { value: 0 },
  };

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    // Um quad único que cobre tudo: testar profundidade só custaria banda.
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new Mesh(geometry, material);
  // O quad já está em clip space, então a bounding box não diz nada sobre ele
  // e o culling poderia descartá-lo.
  mesh.frustumCulled = false;
  scene.add(mesh);

  const clock = createDeltaClock();
  const pointer = new Vector2(0.5, 0.5);

  let elapsed = 0;
  let revealElapsed = 0;
  let frame = 0;
  let resizeFrame = 0;
  let running = false;
  let visible = false;
  let disposed = false;
  /** `scrollHeight` força layout; medir por resize basta, o loop só lê `scrollY`. */
  let documentHeight = 1;

  function render(): void {
    renderer.render(scene, camera);
  }

  function applySize(): void {
    const width = Math.max(1, Math.round(canvas.clientWidth));
    const height = Math.max(1, Math.round(canvas.clientHeight));
    // Acima de 1.5 o custo do fragment dobra e a diferença some sob o grão da
    // página. Relido a cada resize porque o DPR muda ao arrastar a janela para
    // outro monitor.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    // `false`: o tamanho em CSS é do layout, não do renderer.
    renderer.setSize(width, height, false);
    uniforms.uResolution.value.set(width, height);
    documentHeight = Math.max(1, document.body.scrollHeight);
    // Redimensionar com a cena pausada deixaria o buffer velho esticado na
    // tela até ela voltar.
    if (!running) render();
  }

  function tick(): void {
    if (disposed) return;
    frame = requestAnimationFrame(tick);

    const delta = Math.min(clock.getDelta(), MAX_DELTA);
    elapsed = (elapsed + delta) % TIME_PERIOD;
    uniforms.uTime.value = elapsed;

    // O reveal só corre com a cena rodando: os respingos têm que cair na
    // frente de quem está olhando, não com o hero fora da tela.
    revealElapsed = Math.min(revealElapsed + delta, REVEAL_DURATION);
    const progress = revealElapsed / REVEAL_DURATION;
    // easeOutCubic: começa rápido e assenta. Uma linha, sem dependência.
    uniforms.uReveal.value = 1 - Math.pow(1 - progress, 3);

    // Lerp corrigido pelo delta: a mesma suavidade a 60 e a 120 Hz.
    uniforms.uMouse.value.lerp(pointer, 1 - Math.pow(1 - MOUSE_EASING, delta * 60));

    // Lido aqui e não num listener: com Lenis o scroll dispara várias vezes
    // por quadro e só o último valor chega à tela.
    uniforms.uScroll.value = window.scrollY / documentHeight;

    render();
  }

  /**
   * Liga e desliga o loop. Pausar tem que cancelar o rAF — só pular o render
   * ainda acordaria a aba 60 vezes por segundo.
   */
  function sync(): void {
    const shouldRun = visible && !document.hidden && !disposed;
    if (shouldRun === running) return;
    running = shouldRun;

    if (running) {
      // O relógio para junto com o loop; sem isso, voltar de uma aba oculta
      // daria um salto de vários segundos no campo.
      clock.start();
      frame = requestAnimationFrame(tick);
    } else {
      clock.stop();
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  function onPointerMove(event: PointerEvent): void {
    // Toque não move o campo: o dedo já cobre a região que ele empurraria, e
    // redesenhar sob o arrasto custa mais do que o efeito rende.
    if (event.pointerType !== 'mouse') return;
    pointer.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
  }

  function onVisibilityChange(): void {
    sync();
  }

  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) visible = entry.isIntersecting;
    sync();
  });
  intersectionObserver.observe(canvas);

  // No canvas, não na janela: o hero pode mudar de altura sem a janela mudar.
  const resizeObserver = new ResizeObserver(() => {
    // Debounce por rAF: arrastar a janela dispara dezenas de callbacks e cada
    // setSize realoca o buffer.
    if (resizeFrame !== 0) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      if (!disposed) applySize();
    });
  });
  resizeObserver.observe(canvas);

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  // applySize desenha um quadro aqui porque o loop ainda não está rodando: o
  // IntersectionObserver só responde no próximo tick e até lá o canvas ficaria
  // transparente por cima do fundo estático.
  applySize();

  return function dispose(): void {
    // Idempotente: o mesmo dispose pode vir do unload e da troca de página.
    if (disposed) return;
    disposed = true;
    running = false;

    cancelAnimationFrame(frame);
    cancelAnimationFrame(resizeFrame);
    frame = 0;
    resizeFrame = 0;

    clock.stop();
    intersectionObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    const gl = renderer.getContext();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    // dispose() devolve texturas e buffers, mas o contexto só morre no GC — e
    // o browser derruba o mais antigo quando passa do limite por aba.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
