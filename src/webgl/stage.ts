/**
 * O palco — a cena WebGL atrás da home inteira.
 *
 * Um quad em tela cheia com o fragment do campo de luz, mais uma nuvem de
 * pontos que a câmera atravessa devagar (ver gl.ts). O que muda por capítulo
 * chega por `setAct()`: um número contínuo que o loop suaviza antes de
 * entregar aos shaders, para a luz mudar de temperatura sem pular.
 *
 * A cena é enfeite: nada de conteúdo depende dela. O canvas tem alfa e fica
 * sobre a chapa em CSS — onde a luz não chega, a chapa aparece.
 */
import { createBuffer, createProgram, getContext, QUAD } from './gl';
import inkFragment from './shaders/ink.frag.glsl?raw';
import inkVertex from './shaders/ink.vert.glsl?raw';
import particlesFragment from './shaders/particles.frag.glsl?raw';
import particlesVertex from './shaders/particles.vert.glsl?raw';

export type StageHandle = {
  /** Capítulo atual (contínuo) e progresso no documento. */
  setAct(act: number, global: number): void;
  dispose(): void;
};

/** Segundos até a luz estar toda acesa. */
const REVEAL_DURATION = 1.6;
/** Ver o comentário em ink.frag.glsl: o drift é circular e o ciclo fecha aqui. */
const TIME_PERIOD = (Math.PI * 2) / 0.01875;
/** Fração do caminho que o mouse suavizado cobre por quadro, a 60 Hz. */
const MOUSE_EASING = 0.045;
/** Idem para o ato: a luz leva ~1 s para assentar no capítulo novo. */
const ACT_EASING = 0.06;
/** Um quadro travado não pode empurrar o campo meio segundo de uma vez. */
const MAX_DELTA = 0.05;
const PARTICLES = 1400;

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

/** Semente determinística: a nuvem é a mesma a cada visita. */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function buildParticles(): { positions: Float32Array; seeds: Float32Array } {
  const random = seeded(20260909);
  const positions = new Float32Array(PARTICLES * 3);
  const seeds = new Float32Array(PARTICLES * 2);
  for (let i = 0; i < PARTICLES; i += 1) {
    positions[i * 3] = random() * 2.4 - 1.2;
    positions[i * 3 + 1] = random() * 2.4 - 1.2;
    positions[i * 3 + 2] = random() * 6;
    seeds[i * 2] = random();
    // Menos de 1% em terracota: acento, nunca superfície.
    seeds[i * 2 + 1] = random() < 0.008 ? 1 : 0;
  }
  return { positions, seeds };
}

export function mountStage(canvas: HTMLCanvasElement): StageHandle {
  const context = getContext(canvas);
  if (!context) throw new Error('[stage] sem contexto WebGL');
  const gl: WebGLRenderingContext = context;

  const ink = createProgram(gl, inkVertex, inkFragment);
  const particles = createProgram(gl, particlesVertex, particlesFragment);

  const quad = createBuffer(gl, QUAD);
  const cloud = buildParticles();
  const positions = createBuffer(gl, cloud.positions);
  const seeds = createBuffer(gl, cloud.seeds);

  const clock = createDeltaClock();
  const pointer = { x: 0.5, y: 0.5 };
  const mouse = { x: 0.5, y: 0.5 };

  let targetAct = 0;
  let act = 0;
  let elapsed = 0;
  let revealElapsed = 0;
  let frame = 0;
  let resizeFrame = 0;
  let running = false;
  let disposed = false;
  let width = 1;
  let height = 1;
  let pixelRatio = 1;

  function drawInk(): void {
    gl.useProgram(ink.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    const position = ink.attribute('aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(ink.uniform('uTime'), elapsed);
    gl.uniform2f(ink.uniform('uResolution'), width, height);
    gl.uniform2f(ink.uniform('uMouse'), mouse.x, mouse.y);
    gl.uniform1f(ink.uniform('uAct'), act);
    const progress = revealElapsed / REVEAL_DURATION;
    // easeOutCubic: começa rápido e assenta.
    gl.uniform1f(ink.uniform('uReveal'), 1 - Math.pow(1 - progress, 3));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function drawParticles(): void {
    gl.useProgram(particles.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positions);
    const position = particles.attribute('aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, seeds);
    const seed = particles.attribute('aSeed');
    gl.enableVertexAttribArray(seed);
    gl.vertexAttribPointer(seed, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(particles.uniform('uTime'), elapsed);
    gl.uniform1f(particles.uniform('uAct'), act);
    gl.uniform2f(particles.uniform('uMouse'), mouse.x, mouse.y);
    gl.uniform1f(particles.uniform('uAspect'), width / Math.max(1, height));
    gl.uniform1f(particles.uniform('uPixelRatio'), pixelRatio);

    gl.drawArrays(gl.POINTS, 0, PARTICLES);
  }

  function render(): void {
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Pré-multiplicado nos dois passes: o campo "por cima" da chapa, os
    // pontos somando luz por cima do campo.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    drawInk();
    gl.blendFunc(gl.ONE, gl.ONE);
    drawParticles();
  }

  function applySize(): void {
    // Acima de 1.5 o custo do fragment dobra e a diferença some sob o grão.
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
    height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
    canvas.width = width;
    canvas.height = height;
    if (!running) render();
  }

  function tick(): void {
    if (disposed) return;
    frame = requestAnimationFrame(tick);

    const delta = Math.min(clock.getDelta(), MAX_DELTA);
    elapsed = (elapsed + delta) % TIME_PERIOD;
    revealElapsed = Math.min(revealElapsed + delta, REVEAL_DURATION);

    // Lerps corrigidos pelo delta: a mesma suavidade a 60 e a 120 Hz.
    const frames = delta * 60;
    const mouseT = 1 - Math.pow(1 - MOUSE_EASING, frames);
    mouse.x += (pointer.x - mouse.x) * mouseT;
    mouse.y += (pointer.y - mouse.y) * mouseT;
    act += (targetAct - act) * (1 - Math.pow(1 - ACT_EASING, frames));

    render();
  }

  /** Liga e desliga o loop. Pausar cancela o rAF: a aba oculta não acorda. */
  function sync(): void {
    const shouldRun = !document.hidden && !disposed;
    if (shouldRun === running) return;
    running = shouldRun;
    if (running) {
      clock.start();
      frame = requestAnimationFrame(tick);
    } else {
      clock.stop();
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  function onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = 1 - event.clientY / window.innerHeight;
  }

  function onVisibilityChange(): void {
    sync();
  }

  const resizeObserver = new ResizeObserver(() => {
    if (resizeFrame !== 0) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      if (!disposed) applySize();
    });
  });
  resizeObserver.observe(canvas);

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  applySize();
  sync();

  return {
    setAct(next) {
      targetAct = next;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      clock.stop();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(positions);
      gl.deleteBuffer(seeds);
      gl.deleteProgram(ink.program);
      gl.deleteProgram(particles.program);
      // Os recursos já foram; o contexto só morre no GC, e o navegador
      // derruba o mais antigo quando passa do limite por aba.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
