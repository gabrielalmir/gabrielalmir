/**
 * Movimento das seções da home.
 *
 * Três regras governam este arquivo:
 *
 *  1. O HTML nasce visível. Só é lícito esconder um elemento aqui porque o
 *     CSS já o escondeu sob `.motion-ready` (caso de `[data-reveal]`) ou
 *     porque este módulo — que só roda com o gate liberado — o esconde e
 *     assume a responsabilidade de revelá-lo.
 *  2. Todo trigger nasce dentro de um `gsap.matchMedia()`. Atravessar os
 *     768px reverte o contexto inteiro: nenhum pin fica órfão, nenhum
 *     `ScrollTrigger` de desktop sobrevive no mobile.
 *  3. Nada anima duas vezes. `settled` guarda o que já apareceu, para que uma
 *     troca de breakpoint reponha o elemento no estado final em vez de
 *     recomeçar o fade na cara de quem já leu aquele trecho.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MotionGate } from './gate';

const DESKTOP = '(min-width: 768px)';
/*
 * `.98` e não `767px`: com zoom de página, escala de tela fracionária ou DPI
 * não inteiro, a largura de layout pode ser 767,5. Entre `max-width: 767px` e
 * `min-width: 768px` existe uma faixa em que NENHUM dos dois contextos roda —
 * e como o CSS já escondeu os `[data-reveal]` sob `.motion-ready`, ninguém os
 * revelaria: a home inteira ficaria em branco. As duas queries têm que cobrir
 * a reta sem buraco.
 */
const MOBILE = '(max-width: 767.98px)';

/** O elemento entrou 15% na viewport. Mesmo ponto para tudo que revela. */
const REVEAL_START = 'top 85%';
/** Equivalente horizontal, para o que anda dentro de um trilho pinado. */
const REVEAL_START_X = 'left 85%';

/**
 * Alvos com movimento próprio mais adiante neste arquivo. O reveal genérico
 * os ignora para que duas tweens não disputem a mesma opacidade.
 */
const OWN_MOTION = '[data-lab-card], [data-system-panel], [data-trajectory-item]';

/** Onde o cursor custom cresce e vira vermelho. */
const INTERACTIVE = '[data-cta], a[href^="mailto"], button';

/**
 * Um trilho pinado e a tween que o move. Os triggers de quem viaja dentro
 * dele precisam da tween em `containerAnimation`, senão medem a posição
 * vertical de um elemento que na prática se desloca na horizontal.
 */
type Track = { root: Element; tween: gsap.core.Tween };

/** Elementos que já chegaram ao estado final nesta visita à página. */
const settled = new WeakSet<Element>();

function containerFor(el: Element, tracks: Track[]): gsap.core.Tween | undefined {
  // `contains` inclui o próprio nó: o trilho não viaja dentro de si mesmo.
  return tracks.find((track) => track.root !== el && track.root.contains(el))?.tween;
}

/* -------------------------------------------------------------------------
   Rede de segurança

   Esconder é a única coisa perigosa que este módulo faz: um elemento posto em
   `opacity: 0` por JS depende de JS para voltar. Todo esconder passa por
   `hide()`, que anota o alvo; se a montagem estourar no meio, `build()`
   devolve todos eles ao estado do CSS e repassa o erro — index.ts remove o
   `motion-ready` e a página volta a ser a versão estática, inteira.
   ------------------------------------------------------------------------- */

let hiddenInBuild: Element[] = [];

function hide(targets: Element[], vars: gsap.TweenVars): void {
  if (!targets.length) return;
  hiddenInBuild.push(...targets);
  gsap.set(targets, vars);
}

function build(assemble: () => void): void {
  const outer = hiddenInBuild;
  hiddenInBuild = [];
  try {
    assemble();
  } catch (error) {
    gsap.set(hiddenInBuild, { clearProps: 'all' });
    throw error;
  } finally {
    hiddenInBuild = outer;
  }
}

/* -------------------------------------------------------------------------
   Reveal genérico
   ------------------------------------------------------------------------- */

type RevealOptions = {
  container?: gsap.core.Tween;
  /** Sobrepõe `data-reveal-delay`; usado pelo stagger manual dos grupos. */
  delay?: number;
};

function revealed(el: Element): void {
  gsap.set(el, { opacity: 1, y: 0 });
}

function reveal(el: HTMLElement, options: RevealOptions = {}): void {
  if (settled.has(el)) {
    revealed(el);
    return;
  }

  const delay = options.delay ?? (Number.parseFloat(el.dataset.revealDelay ?? '') || 0);
  const container = options.container;

  hide([el], { opacity: 0, y: 24 });
  ScrollTrigger.create({
    trigger: el,
    containerAnimation: container,
    start: container ? REVEAL_START_X : REVEAL_START,
    once: true,
    onEnter: () => {
      settled.add(el);
      gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay });
    },
  });
}

function revealGroup(group: HTMLElement, tracks: Track[], skip: Element | null): void {
  const children = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
    (child) => child !== skip && !child.matches(OWN_MOTION),
  );
  if (!children.length) return;

  const container = containerFor(group, tracks);
  // `ScrollTrigger.batch` não aceita `containerAnimation`: dentro de um
  // trilho pinado o stagger vira delay por índice, com triggers próprios.
  if (container) {
    children.forEach((child, index) => reveal(child, { container, delay: index * 0.08 }));
    return;
  }

  children.filter((child) => settled.has(child)).forEach(revealed);
  const pending = children.filter((child) => !settled.has(child));
  if (!pending.length) return;

  hide(pending, { opacity: 0, y: 24 });
  ScrollTrigger.batch(pending, {
    start: REVEAL_START,
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => settled.add(el));
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 });
    },
  });
}

function initReveals(tracks: Track[], skip: Element | null): void {
  document
    .querySelectorAll<HTMLElement>('[data-reveal-group]')
    .forEach((group) => revealGroup(group, tracks, skip));

  Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-proof-item]'))
    .filter((el) => el !== skip)
    .filter((el) => !el.matches(OWN_MOTION))
    // Filhos de grupo já foram animados em stagger; `parentElement` porque um
    // grupo pode ser ele mesmo um alvo de reveal.
    .filter((el) => !el.parentElement?.closest('[data-reveal-group]'))
    .forEach((el) => reveal(el, { container: containerFor(el, tracks) }));
}

/* -------------------------------------------------------------------------
   Traços de tinta
   ------------------------------------------------------------------------- */

/** Só geometria SVG tem comprimento; o resto passa reto, sem quebrar nada. */
function isGeometry(el: Element): el is SVGGeometryElement {
  return typeof (el as SVGGeometryElement).getTotalLength === 'function';
}

/**
 * Prepara os traços: mede e esconde com o próprio stroke. Precisa acontecer
 * no init, não no trigger — armar só na hora deixaria o traço inteiro
 * visível até o instante em que ele deveria começar a ser desenhado.
 */
function armDraw(nodes: ArrayLike<Element>): SVGGeometryElement[] {
  const armed: SVGGeometryElement[] = [];

  for (const el of Array.from(nodes)) {
    if (!isGeometry(el) || settled.has(el)) continue;

    let length = 0;
    try {
      length = el.getTotalLength();
    } catch {
      // Path degenerado ou dentro de um <svg> sem layout: ignora em silêncio.
      continue;
    }
    if (!Number.isFinite(length) || length <= 0) continue;

    hide([el], { strokeDasharray: length, strokeDashoffset: length });
    armed.push(el);
  }

  return armed;
}

function runDraw(paths: SVGGeometryElement[], stagger: number, onComplete?: () => void): void {
  if (!paths.length) {
    onComplete?.();
    return;
  }
  paths.forEach((el) => settled.add(el));
  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.1,
    ease: 'power2.inOut',
    stagger,
    onComplete,
  });
}

function initMarks(tracks: Track[]): void {
  // Mapas e pipeline têm sequência própria, disparada pela seção deles.
  const marks = document.querySelectorAll<SVGElement>(
    '[data-mark-draw]:not([data-map-line]):not([data-pipeline-path])',
  );

  marks.forEach((mark) => {
    const armed = armDraw([mark]);
    if (!armed.length) return;

    // O <svg> tem caixa previsível; um <path> com viewBox escalado, nem sempre.
    const trigger = mark.closest('svg') ?? mark;
    const container = containerFor(mark, tracks);
    ScrollTrigger.create({
      trigger,
      containerAnimation: container,
      start: container ? REVEAL_START_X : REVEAL_START,
      once: true,
      onEnter: () => runDraw(armed, 0),
    });
  });
}

/* -------------------------------------------------------------------------
   Contadores
   ------------------------------------------------------------------------- */

function initCounters(tracks: Track[]): void {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (settled.has(el)) return;

    const to = Number.parseFloat(el.dataset.countTo ?? '');
    if (!Number.isFinite(to)) return;
    const from = Number.parseFloat(el.dataset.countFrom ?? '') || 0;
    const prefix = el.dataset.countPrefix ?? '';
    const suffix = el.dataset.countSuffix ?? '';
    const write = (value: number) => {
      el.textContent = `${prefix}${Math.round(value)}${suffix}`;
    };

    const container = containerFor(el, tracks);
    ScrollTrigger.create({
      trigger: el,
      containerAnimation: container,
      start: container ? REVEAL_START_X : REVEAL_START,
      once: true,
      onEnter: () => {
        settled.add(el);
        // O HTML já traz o valor final. Zerar só agora: quem parar o scroll
        // acima da seção continua lendo −90%, nunca um 0 congelado.
        const counter = { v: from };
        write(from);
        gsap.to(counter, {
          v: to,
          duration: 1.6,
          ease: 'power2.out',
          snap: { v: 1 },
          onUpdate: () => write(counter.v),
        });
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Sistemas
   ------------------------------------------------------------------------- */

function colorizeAtlas(atlas: HTMLElement | null): void {
  if (!atlas || settled.has(atlas)) return;

  /*
   * Quem carrega `u-inked` é a <img>, não o wrapper `[data-atlas-image]`.
   *
   * A versão anterior removia a classe do wrapper — onde ela nunca esteve — e
   * animava o filtro do wrapper, que já era `none`. A tween rodava inteira,
   * bonitinha, sem tocar no pixel: a imagem ficava cinza para sempre e nada
   * acusava o erro, porque não havia falha, só um alvo trocado.
   */
  const image = atlas.querySelector<HTMLElement>('img') ?? atlas;
  settled.add(atlas);

  // `mix-blend-mode` não interpola — não existe meio caminho entre
  // luminosity e normal. Então a mistura troca de uma vez, junto com o
  // primeiro quadro do filtro, quando a imagem ainda está cinza e a
  // diferença entre os dois modos é mínima.
  image.classList.remove('u-inked');
  gsap.fromTo(
    image,
    { filter: 'grayscale(1) contrast(1.15) brightness(0.92)', opacity: 0.72 },
    {
      filter: 'grayscale(0) contrast(1) brightness(1)',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
  );
}

function focusPanel(panel: HTMLElement, lines: SVGGeometryElement[]): void {
  colorizeAtlas(panel.querySelector<HTMLElement>('[data-atlas-image]'));
  runDraw(lines, 0.12);
}

/** Desktop: os três dossiês andam na horizontal enquanto a seção fica pinada. */
function pinSystems(tracks: Track[]): void {
  const section = document.querySelector<HTMLElement>('[data-systems]');
  const track = section?.querySelector<HTMLElement>('[data-systems-track]');
  // O palco, não a seção. A seção carrega cabeçalho e laboratórios junto; pinar
  // ela prenderia na tela um bloco maior que a própria tela, e o leitor ficaria
  // olhando o cabeçalho enquanto os painéis passam cortados.
  const stage = section?.querySelector<HTMLElement>('[data-systems-stage]');
  if (!section || !track || !stage) return;

  const panels = Array.from(track.querySelectorAll<HTMLElement>('[data-system-panel]'));
  if (panels.length < 2) {
    // Um painel só não tem para onde andar: vira reveal, como no mobile.
    stackSystemPanels();
    return;
  }

  /*
   * A faixa anda em degraus, não em velocidade constante.
   *
   * Com uma tween linear o trilho nunca para: medido, apenas 30% das posições
   * de scroll mostravam um painel inteiro — nos outros 70% havia meio painel de
   * cada lado, com o texto cortado ao meio. Esticar o pin não mudava nada,
   * porque a proporção é a mesma em qualquer comprimento; só deixava a seção
   * mais longa.
   *
   * A timeline alterna PARADA e TRAVESSIA. Cada painel fica imóvel por
   * `DWELL` unidades e a passagem para o próximo leva `MOVE`, com ease nas
   * duas pontas — o gesto de virar a página. Com scrub, a duração da timeline
   * é o comprimento do pin, então a razão dwell/move é literalmente a fração do
   * scroll em que dá para ler.
   *
   * O preço é abrir mão de `containerAnimation` nos triggers dos painéis: ele
   * exige `ease: 'none'`. Em troca, quem decide o painel ativo é o progresso da
   * própria timeline, logo abaixo — mais direto que medir posição horizontal.
   */
  const DWELL = 1.8;
  const MOVE = 1;
  const steps = panels.length - 1;

  const overflow = () => Math.max(1, track.scrollWidth - window.innerWidth);
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      pin: stage,
      start: 'top top',
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      /*
       * O comprimento do pin é independente da razão dwell/move — essa razão
       * vem da estrutura da timeline. Aqui só se escolhe quanto scroll a seção
       * inteira custa. `1.45x` dá cerca de uma tela e meia de rolagem por
       * painel; a fórmula anterior somava as unidades de parada e chegava a
       * 11 500px, quase treze telas para três painéis.
       */
      end: () => `+=${overflow() * 1.45}`,
    },
  });

  for (let i = 1; i <= steps; i += 1) {
    timeline.to(
      track,
      {
        xPercent: (-100 * i) / panels.length,
        duration: MOVE,
        ease: 'power2.inOut',
      },
      `+=${DWELL}`,
    );
  }
  // Parada final: sem ela o último painel sairia da tela no mesmo quadro em
  // que chega.
  timeline.to({}, { duration: DWELL });

  tracks.push({ root: track, tween: timeline as unknown as gsap.core.Tween });

  // No desktop o painel viaja, não aparece: se ele também for `[data-reveal]`,
  // o CSS o deixou opaco e ninguém neste caminho iria revelá-lo.
  panels.forEach((panel) => settled.add(panel));
  gsap.set(panels, { opacity: 1, y: 0 });

  // Painel ativo pelo progresso da timeline: cada painel ocupa uma fatia igual
  // do total, e a fatia é atravessada uma vez só (`once` por painel).
  const armed = panels.map((panel) => ({
    panel,
    lines: armDraw(panel.querySelectorAll('[data-map-line]')),
    done: false,
  }));
  timeline.eventCallback('onUpdate', () => {
    const index = Math.min(panels.length - 1, Math.floor(timeline.progress() * panels.length));
    const entry = armed[index];
    if (entry && !entry.done) {
      entry.done = true;
      focusPanel(entry.panel, entry.lines);
    }
  });

  /*
   * Tab dentro de um trilho pinado.
   *
   * O foco caminha na ordem do DOM, mas os painéis 2 e 3 estão fora da tela até
   * o scroll levar o trilho até eles: o anel de foco ia parar em x negativo, e
   * o navegador ainda tentava "trazer à vista" rolando o próprio wrapper — o
   * que desalinhava o trilho de forma permanente, já que quem manda na posição
   * é o progresso do ScrollTrigger, não `scrollLeft`.
   *
   * `overflow-x: clip` no palco tira do navegador a caixa de rolagem. Aqui o
   * documento é levado até a fatia de scroll que põe aquele painel na tela, de
   * modo que o foco fique onde a pessoa está olhando.
   */
  const trigger = timeline.scrollTrigger;
  section.addEventListener('focusin', (event) => {
    if (!trigger) return;
    const target = (event.target as HTMLElement | null)?.closest('[data-system-panel]');
    if (!target) return;

    const index = panels.indexOf(target as HTMLElement);
    if (index < 0) return;

    // O trilho anda de `start` a `end` cobrindo os n-1 saltos entre painéis.
    const span = trigger.end - trigger.start;
    const targetScroll = trigger.start + (span * index) / (panels.length - 1);
    if (Math.abs(trigger.scroll() - targetScroll) < 4) return;
    // `trigger.scroll(value)` passa pelo scrollerProxy do Lenis; um
    // `window.scrollTo` direto duraria um quadro e o Lenis o desfaria.
    trigger.scroll(targetScroll);
  });
}

/** Mobile: sem pin. Os painéis são blocos empilhados que revelam ao subir. */
function stackSystemPanels(): void {
  document.querySelectorAll<HTMLElement>('[data-system-panel]').forEach((panel) => {
    const lines = armDraw(panel.querySelectorAll('[data-map-line]'));
    reveal(panel);
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 70%',
      once: true,
      onEnter: () => focusPanel(panel, lines),
    });
  });
}

function initLabCards(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-lab-card]'));
  // Um card já revelado pode carregar também `data-reveal`: o revert do
  // matchMedia devolveu a ele o `opacity: 0` do CSS, e ninguém mais viria.
  cards
    .filter((card) => settled.has(card))
    .forEach((card) => gsap.set(card, { opacity: 1, y: 0, rotateX: 0 }));

  const pending = cards.filter((card) => !settled.has(card));
  if (!pending.length) return;

  hide(pending, { opacity: 0, y: 32, rotateX: 8, transformPerspective: 800 });
  ScrollTrigger.batch(pending, {
    start: REVEAL_START,
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => settled.add(el));
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      });
    },
  });
}

/* -------------------------------------------------------------------------
   Trajetória
   ------------------------------------------------------------------------- */

/**
 * O ano de cada etapa. O contrato de `data-*` não prevê um atributo para ele,
 * então o valor é lido do próprio conteúdo do cartão: primeiro um descendente
 * cujo texto seja exatamente um ano (ou o ∞ da presença pública) e, se nada
 * casar, o primeiro ano que aparecer no texto todo.
 */
function readYear(item: HTMLElement): string {
  const exact = /^(?:\d{4}|∞)$/;
  for (const node of Array.from(item.querySelectorAll('*'))) {
    const text = node.textContent?.trim() ?? '';
    if (exact.test(text)) return text;
  }
  const loose = item.textContent?.match(/\d{4}|∞/);
  return loose ? loose[0] : '';
}

/**
 * Troca o ano gigante do fundo. A opacidade de repouso vem do CSS — o número
 * é uma marca d'água, e voltar para 1 o transformaria em texto de leitura.
 */
function makeYearSwitch(yearEl: HTMLElement | null): (year: string) => void {
  if (!yearEl) return () => {};
  const parsed = Number.parseFloat(getComputedStyle(yearEl).opacity);
  const rest = Number.isFinite(parsed) ? parsed : 1;

  return (year) => {
    if (!year || yearEl.textContent?.trim() === year) return;
    gsap.to(yearEl, {
      opacity: rest * 0.15,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => {
        yearEl.textContent = year;
        gsap.to(yearEl, { opacity: rest, duration: 0.45, ease: 'power2.out' });
      },
    });
  };
}

/**
 * Trajetória, em todos os tamanhos: lista vertical, com o ano gigante de fundo
 * trocando conforme cada etapa passa.
 *
 * Houve uma versão pinada, em faixa horizontal, e ela não funcionava. São
 * quatro etapas de carreira em cartões de 24rem: o trilho inteiro mede pouco
 * mais que a tela, então a viagem toda dava ~500px e as duas últimas etapas
 * nunca cruzavam o centro — o ano travava em 2016 e nunca chegava a 2026.
 * Um trilho horizontal precisa de conteúdo que não caiba na tela; este cabe.
 * Na vertical cada etapa tem a própria travessia e o ano acompanha de verdade.
 */
function scrollTrajectory(): void {
  const section = document.querySelector<HTMLElement>('[data-trajectory]');
  if (!section) return;

  const switchYear = makeYearSwitch(section.querySelector<HTMLElement>('[data-trajectory-year]'));
  section.querySelectorAll<HTMLElement>('[data-trajectory-item]').forEach((item) => {
    const year = readYear(item);
    reveal(item);
    ScrollTrigger.create({
      trigger: item,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => switchYear(year),
      onEnterBack: () => switchYear(year),
    });
  });
}

/* -------------------------------------------------------------------------
   Pipeline de IA
   ------------------------------------------------------------------------- */

function initPipeline(): void {
  const section = document.querySelector<HTMLElement>('[data-ai]');
  if (!section) return;

  const paths = armDraw(section.querySelectorAll('[data-pipeline-path]'));
  const nodes = Array.from(section.querySelectorAll<SVGElement>('[data-pipeline-node]'));
  if (!paths.length && !nodes.length) return;

  const blue = getComputedStyle(document.documentElement).getPropertyValue('--color-blue-bright');
  const pulse = gsap.timeline({ paused: true });
  nodes.forEach((node, index) => {
    pulse.fromTo(
      node,
      { opacity: 0.6, scale: 1 },
      {
        opacity: 1,
        scale: 1.06,
        color: blue.trim() || undefined,
        duration: 0.9,
        ease: 'sine.inOut',
        transformOrigin: 'center',
        repeat: -1,
        yoyo: true,
        // Sem isto o nó cairia para 0.6 de opacidade já no init, antes de o
        // diagrama sequer ter sido desenhado.
        immediateRender: false,
      },
      index * 0.35,
    );
  });

  let armed = false;

  // O guarda vem PRIMEIRO, e a referência dele é consultada ao armar. O desenho
  // leva ~1,3 s: quem passa rolando rápido termina com a seção já fora da tela
  // quando `runDraw` chama de volta, e um `pulse.play()` incondicional ali
  // deixaria uma timeline `repeat: -1` girando invisível até a próxima
  // travessia — o `onToggle` não dispara sozinho para corrigir.
  const inView = ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      if (!armed) return;
      if (self.isActive) pulse.play();
      else pulse.pause();
    },
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    once: true,
    onEnter: () =>
      runDraw(paths, 0.15, () => {
        armed = true;
        if (inView.isActive) pulse.play();
      }),
  });
}

/* -------------------------------------------------------------------------
   Processo
   ------------------------------------------------------------------------- */

/**
 * Empilhamento dos quatro cartões.
 *
 * Decisão: o pin fica com o CSS (`position: sticky`) e o JS só encolhe o
 * cartão de baixo enquanto o próximo sobe. Quatro `ScrollTrigger` com
 * `pin` + `pinSpacing: false` encadeados dependem de os quatro se medirem na
 * ordem certa e brigam com o `refresh()` que roda depois das fontes; o sticky
 * já resolve o empilhamento sozinho, sem JS, e o scrub só acrescenta a
 * profundidade. É a versão que degrada para "cartões normais" em vez de
 * "cartões sobrepostos no lugar errado".
 */
function stackProcessCards(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-process-card]'));
  if (cards.length < 2) return;

  cards.forEach((card, index) => {
    const next = cards[index + 1];
    if (!next) return;
    gsap.to(card, {
      scale: 0.94,
      ease: 'none',
      transformOrigin: 'center top',
      scrollTrigger: {
        trigger: next,
        start: 'top 85%',
        end: 'top 30%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Contato
   ------------------------------------------------------------------------- */

/** O H2 do contato entra desfocado; o Underline abaixo dele é `data-mark-draw`. */
function initContact(heading: HTMLElement | null): void {
  if (!heading) return;
  if (settled.has(heading)) {
    gsap.set(heading, { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  hide([heading], { opacity: 0, y: 24, filter: 'blur(12px)' });
  ScrollTrigger.create({
    trigger: heading,
    start: REVEAL_START,
    once: true,
    onEnter: () => {
      settled.add(heading);
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
      });
    },
  });
}

/* -------------------------------------------------------------------------
   Cursor
   ------------------------------------------------------------------------- */

/**
 * Ponto de tinta que segue o mouse. Fica fora do `matchMedia` porque quem
 * decide não é a largura da tela e sim o tipo de ponteiro: num touch ele não
 * existe, e o `mix-blend-mode: difference` garante contraste sobre qualquer
 * superfície sem precisar de uma segunda cor.
 */
let cursorMounted = false;

function initCursor(): void {
  // O ponto é anexado ao <body>: montar duas vezes deixaria dois na tela.
  if (cursorMounted || !window.matchMedia('(pointer: fine)').matches) return;
  cursorMounted = true;

  const tokens = getComputedStyle(document.documentElement);
  const idle = tokens.getPropertyValue('--color-blue').trim() || '#5c85b5';
  const active = tokens.getPropertyValue('--color-red-bright').trim() || '#ff7a71';

  const dot = document.createElement('div');
  dot.setAttribute('aria-hidden', 'true');
  dot.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:10px',
    'height:10px',
    'border-radius:9999px',
    `background-color:${idle}`,
    'mix-blend-mode:difference',
    'pointer-events:none',
    // Acima do grão (100) e da cortina (150), abaixo do link de pular (200).
    'z-index:180',
    'opacity:0',
    'will-change:transform',
  ].join(';');
  document.body.appendChild(dot);

  gsap.set(dot, { xPercent: -50, yPercent: -50 });
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });

  let visible = false;

  const onMove = (event: PointerEvent) => {
    if (!visible) {
      visible = true;
      // Sem o salto inicial o ponto viajaria do canto 0,0 até o cursor.
      gsap.set(dot, { x: event.clientX, y: event.clientY });
      gsap.to(dot, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
    xTo(event.clientX);
    yTo(event.clientY);
  };

  // `pointerover` basta para os dois sentidos: sair de um botão é entrar em
  // outro elemento, e o evento dispara de novo com o alvo novo.
  const onOver = (event: PointerEvent) => {
    const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
    gsap.to(dot, {
      scale: target ? 3.2 : 1,
      backgroundColor: target ? active : idle,
      duration: 0.28,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    visible = false;
    gsap.to(dot, { opacity: 0, duration: 0.2, ease: 'power2.out' });
  };

  const dispose = (event?: PageTransitionEvent) => {
    // `persisted` significa que a página foi para o bfcache e vai VOLTAR viva,
    // com este mesmo módulo já executado. Desmontar aqui deixaria a pessoa sem
    // cursor ao apertar "voltar", e nada o remontaria.
    if (event?.persisted) return;

    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerover', onOver);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('pagehide', dispose);
    gsap.killTweensOf(dot);
    dot.remove();
    cursorMounted = false;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  // `pagehide` e não `unload`: é o único que dispara também no bfcache.
  window.addEventListener('pagehide', dispose);
}

/* -------------------------------------------------------------------------
   Entrada
   ------------------------------------------------------------------------- */

/**
 * O que vale nos dois breakpoints. Roda depois dos pins, porque os reveals
 * precisam saber se o alvo viaja dentro de um trilho para escolher entre o
 * eixo vertical e o horizontal.
 */
function initShared(tracks: Track[]): void {
  const contactHeading = document.querySelector<HTMLElement>('[data-contact] h2');

  initReveals(tracks, contactHeading);
  initMarks(tracks);
  initCounters(tracks);
  initLabCards();
  initPipeline();
  initContact(contactHeading);
}

export function initSections(gate: MotionGate): void {
  // Gate negado: o CSS nunca escondeu nada e não há o que revelar.
  if (!gate.motion) return;

  const mm = gsap.matchMedia();

  mm.add(DESKTOP, () => {
    build(() => {
      const tracks: Track[] = [];
      pinSystems(tracks);
      scrollTrajectory();
      initShared(tracks);
      stackProcessCards();
    });
  });

  mm.add(MOBILE, () => {
    build(() => {
      // Nenhum pin: trilho horizontal em tela estreita é overflow garantido.
      stackSystemPanels();
      scrollTrajectory();
      initShared([]);
    });
  });

  initCursor();
}
