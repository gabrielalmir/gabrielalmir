/**
 * O palco e o cromo dos capítulos.
 *
 * Tudo que reage ao estado do motor (src/motion/chapters.ts) e não mora
 * numa seção: a chapa de tinta atrás da página (crossfade entre duas
 * camadas), os pontos da navegação lateral, o marcador "Capítulo 03 /
 * Sistemas" e a cena WebGL, que só sobe se o gate permitir.
 *
 * Nada aqui é conteúdo. Sem motor (mobile, gate negado) o módulo não faz
 * nada: o palco é `display: none` e cada seção mostra a própria chapa.
 */
import gsap from 'gsap';

import type { ChapterEngine, ChapterState } from './chapters';
import type { MotionGate } from './gate';

/** Comprimento do anel de progresso (2π·10), o mesmo do CSS. */
const RING = 62.83;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** A chapa que a seção declara em `--plate` (uma `url(...)` já resolvida). */
function plateOf(chapter: HTMLElement): string {
  return getComputedStyle(chapter).getPropertyValue('--plate').trim();
}

/** Duas camadas que se alternam: a que entra acende, a que sai apaga. */
function makePlates(engine: ChapterEngine): (chapter: number) => void {
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-stage-plate]'));
  if (layers.length < 2) return () => {};

  let front = 0;
  let current = plateOf(engine.chapters[0]);
  layers[0].style.backgroundImage = current;
  layers[0].style.opacity = '1';
  layers[1].style.opacity = '0';

  return (chapter) => {
    const next = plateOf(engine.chapters[chapter] ?? engine.chapters[0]);
    if (!next || next === current) return;
    current = next;
    const back = 1 - front;
    layers[back].style.backgroundImage = next;
    // A transição de opacidade vem do CSS (.stage-plate).
    layers[back].style.opacity = '1';
    layers[front].style.opacity = '0';
    front = back;
  };
}

function makeDots(): (state: ChapterState) => void {
  const dots = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter-dot]'));
  const rings = dots.map((dot) => dot.querySelector<SVGCircleElement>('[data-chapter-ring]'));
  let active = -1;

  return (state) => {
    if (state.chapter !== active) {
      active = state.chapter;
      dots.forEach((dot, index) => {
        if (index === active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    const ring = rings[active];
    if (ring) ring.style.strokeDashoffset = String(RING * (1 - state.progress));
  };
}

function makeMarker(engine: ChapterEngine): (chapter: number) => void {
  const marker = document.querySelector<HTMLElement>('[data-chapter-marker]');
  const number = marker?.querySelector<HTMLElement>('[data-chapter-marker-number]');
  const title = marker?.querySelector<HTMLElement>('[data-chapter-marker-title]');
  if (!marker || !number || !title) return () => {};

  let shown = 0;
  return (chapter) => {
    if (chapter === shown) return;
    shown = chapter;
    const name = engine.chapters[chapter]?.dataset.chapterTitle ?? '';
    gsap.to([number, title], {
      opacity: 0,
      y: -6,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => {
        number.textContent = `Capítulo ${pad(chapter + 1)}`;
        title.textContent = name;
        gsap.fromTo(
          [number, title],
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05 },
        );
      },
    });
  };
}

/** Sobe a cena e a revela; devolve o que o motor precisa chamar por quadro. */
async function mountScene(
  canvas: HTMLCanvasElement,
  engine: ChapterEngine,
): Promise<(() => void) | null> {
  let handle: import('../webgl/stage').StageHandle;
  try {
    const { mountStage } = await import('../webgl/stage');
    handle = mountStage(canvas);
  } catch (error) {
    // Sem cena, a chapa em CSS continua sendo o fundo.
    console.warn('[stage] cena indisponível; fica a chapa.', error);
    return null;
  }

  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    handle.dispose();
    gsap.set(canvas, { opacity: 0 });
  };

  const feed = (state: ChapterState) => {
    // O passo dentro do capítulo adianta a tinta um pouco: a troca de humor
    // começa antes da chegada, como uma câmera que já está indo.
    handle.setAct(state.chapter + state.progress * 0.6, state.global);
  };
  feed(engine.state());
  const unsubscribe = engine.onChange(feed);

  gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });

  const onPageHide = () => {
    // Voltando do bfcache o contexto WebGL está morto; a chapa segue de pé.
    unsubscribe();
    release();
  };
  window.addEventListener('pagehide', onPageHide);

  return () => {
    window.removeEventListener('pagehide', onPageHide);
    unsubscribe();
    release();
  };
}

export function initStage(gate: MotionGate, engine: ChapterEngine | null): void {
  if (!gate.motion || !engine) return;

  const stage = document.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;

  const plates = makePlates(engine);
  const dots = makeDots();
  const marker = makeMarker(engine);

  let chapter = -1;
  engine.onChange((state) => {
    dots(state);
    if (state.chapter !== chapter) {
      chapter = state.chapter;
      plates(chapter);
      marker(chapter);
    }
  });

  const canvas = stage.querySelector<HTMLCanvasElement>('[data-stage-canvas]');
  if (gate.webgl && canvas && engine.active) {
    void mountScene(canvas, engine);
  }
}
