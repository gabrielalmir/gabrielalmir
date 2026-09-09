/**
 * Motor de capítulos — a home como uma sequência de telas.
 *
 * O documento continua em fluxo normal (âncoras, histórico, leitor de tela e
 * barra de rolagem funcionam como sempre); o que muda é quem decide a posição.
 * Cada `[data-chapter]` mede `steps × 100svh` (ver global.css) e o motor
 * calcula as PARADAS: uma por passo, múltiplos exatos de uma tela. A roda, o
 * toque e o teclado viram intenção ("próxima", "anterior") e o Lenis anima
 * até a parada. Um scroll que venha de outra fonte — arrastar a barra, o
 * `scrollTo` do Playwright — assenta sozinho na parada mais próxima.
 *
 * Só existe em desktop com ponteiro fino (`CHAPTER_MEDIA`). Fora disso o
 * scroll fluido de sempre continua, e a classe `chapters` nunca entra no
 * <html> — o CSS dos capítulos só existe com ela.
 */
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MotionGate } from './gate';
import { captureInput, getLenis } from './lenis';

gsap.registerPlugin(Observer, ScrollTrigger);

/**
 * Tablet ≥768px fica de fora de propósito: capturar o toque com
 * `preventDefault` num aparelho de verdade é o caminho de entrada mais
 * arriscado, e a leitura vertical já funciona lá.
 */
export const CHAPTER_MEDIA = '(min-width: 1024px) and (pointer: fine)';

/**
 * Quanto dura a viagem entre duas paradas, em segundos. Era 0.9: bonito numa
 * parada, cansativo em vinte — com o cooldown, cada gesto custava mais de um
 * segundo e atravessar a home virava trabalho. 0.62 ainda lê como viagem, mas
 * responde perto do imediato.
 */
const TRAVEL = 0.62;
/** Depois de chegar, quanto tempo a roda fica surda — é o que come a inércia. */
const COOLDOWN_MS = 120;
/** Um scroll de fonte externa assenta depois deste silêncio. */
const SETTLE_MS = 160;

export type ChapterStop = { chapter: number; step: number; y: number };
export type ChapterState = {
  chapter: number;
  step: number;
  /** 0..1 dentro do capítulo, contando a saída dele. */
  progress: number;
  /** 0..1 no documento inteiro. */
  global: number;
};

export type ChapterEngine = {
  readonly active: boolean;
  readonly chapters: readonly HTMLElement[];
  stops(): readonly ChapterStop[];
  state(): ChapterState;
  goTo(chapter: number, step?: number, options?: { immediate?: boolean }): void;
  /** Chamado a cada quadro de scroll com o estado atual. */
  onChange(listener: (state: ChapterState) => void): () => void;
};

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    /^(input|textarea|select|button)$/i.test(target.tagName) ||
    target.closest('[data-scroll-inside]') !== null
  );
}

/**
 * Uma área com rolagem própria (o diagrama de IA, um passo mais alto que a
 * tela) fica com a roda enquanto ainda tiver para onde rolar naquele sentido.
 * Chegou ao fim, o gesto seguinte vira capítulo.
 */
function scrollsInside(target: EventTarget | null, deltaY: number): boolean {
  if (!(target instanceof Element)) return false;
  const inside = target.closest<HTMLElement>('[data-scroll-inside]');
  if (!inside) return false;
  const room = deltaY > 0
    ? inside.scrollHeight - inside.clientHeight - inside.scrollTop
    : inside.scrollTop;
  return room > 1;
}

export function initChapters(gate: MotionGate): ChapterEngine | null {
  if (!gate.motion || typeof window === 'undefined') return null;

  const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
  const lenis = getLenis();
  if (!chapters.length || !lenis) return null;

  const root = document.documentElement;
  const listeners = new Set<(state: ChapterState) => void>();

  let stops: ChapterStop[] = [];
  let active = false;
  /** Viagem em curso: a roda espera, e o assentamento não interfere. */
  let locked = false;
  let travelling = false;
  let cooldown = 0;
  let settleTimer = 0;

  function viewport(): number {
    return window.innerHeight;
  }

  function maxScroll(): number {
    return Math.max(0, document.documentElement.scrollHeight - viewport());
  }

  function measure(): void {
    const vh = viewport();
    const scroll = lenis!.scroll;
    const next: ChapterStop[] = [];

    chapters.forEach((chapter, index) => {
      const top = Math.round(chapter.getBoundingClientRect().top + scroll);
      const steps = Math.max(
        1,
        Number.parseInt(chapter.dataset.steps ?? '', 10) ||
          chapter.querySelectorAll('[data-step]').length,
      );
      for (let step = 0; step < steps; step += 1) {
        next.push({ chapter: index, step, y: top + step * vh });
      }
    });

    // O rodapé vem depois do último capítulo: ele é a última parada, senão
    // ninguém chega nele com a roda.
    const end = maxScroll();
    const last = next[next.length - 1];
    if (last && end > last.y + 2) next.push({ chapter: last.chapter, step: last.step, y: end });

    stops = next;
  }

  function nearestIndex(y = lenis!.scroll): number {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    stops.forEach((stop, index) => {
      const distance = Math.abs(stop.y - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    return best;
  }

  function state(): ChapterState {
    const y = lenis!.scroll;
    const vh = viewport();
    let chapter = 0;
    for (let i = 0; i < chapters.length; i += 1) {
      const first = stops.find((stop) => stop.chapter === i);
      if (first && y >= first.y - vh * 0.5) chapter = i;
    }
    const first = stops.find((stop) => stop.chapter === chapter);
    const height = chapters[chapter]?.offsetHeight || vh;
    const top = first?.y ?? 0;
    let step = 0;
    for (const stop of stops) {
      if (stop.chapter === chapter && y >= stop.y - vh * 0.5) step = stop.step;
    }
    return {
      chapter,
      step,
      progress: gsap.utils.clamp(0, 1, (y - top) / Math.max(1, height)),
      global: gsap.utils.clamp(0, 1, y / Math.max(1, maxScroll())),
    };
  }

  function emit(): void {
    if (!listeners.size) return;
    const current = state();
    listeners.forEach((listener) => listener(current));
  }

  function travelTo(index: number, immediate = false): void {
    const stop = stops[gsap.utils.clamp(0, stops.length - 1, index)];
    if (!stop) return;

    window.clearTimeout(settleTimer);
    window.clearTimeout(cooldown);
    locked = true;
    travelling = true;

    const done = () => {
      travelling = false;
      cooldown = window.setTimeout(() => {
        locked = false;
      }, COOLDOWN_MS);
    };

    lenis!.scrollTo(stop.y, {
      immediate,
      duration: TRAVEL,
      easing: easeOutExpo,
      // `force`: uma viagem pode começar enquanto outra ainda segura o lock.
      force: true,
      lock: true,
      onComplete: done,
    });
  }

  function stepBy(direction: 1 | -1): void {
    if (!active || locked) return;
    travelTo(nearestIndex() + direction);
  }

  function settle(): void {
    if (!active || travelling) return;
    const index = nearestIndex();
    const stop = stops[index];
    if (stop && Math.abs(stop.y - lenis!.scroll) > 2) travelTo(index);
  }

  function goTo(chapter: number, step = 0, options: { immediate?: boolean } = {}): void {
    const index = stops.findIndex((stop) => stop.chapter === chapter && stop.step === step);
    if (index < 0) return;
    if (!active) {
      lenis!.scrollTo(stops[index].y, { immediate: options.immediate, force: true });
      return;
    }
    travelTo(index, options.immediate);
  }

  function chapterFromHash(hash: string): number {
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return -1;
    return chapters.findIndex((chapter) => chapter.id === id);
  }

  // --- entradas -----------------------------------------------------------

  let observer: Observer | null = null;

  function onKeyDown(event: KeyboardEvent): void {
    if (!active || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isEditable(event.target)) return;

    let direction: 1 | -1 | 0 = 0;
    let absolute: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        direction = 1;
        break;
      case 'ArrowUp':
      case 'PageUp':
        direction = -1;
        break;
      case ' ':
        direction = event.shiftKey ? -1 : 1;
        break;
      case 'Home':
        absolute = 0;
        break;
      case 'End':
        absolute = stops.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (absolute !== null) travelTo(absolute);
    else if (direction) stepBy(direction);
  }

  function onClick(event: MouseEvent): void {
    if (!active || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) return;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
    const chapter = chapterFromHash(url.hash);
    if (chapter < 0) return;

    event.preventDefault();
    history.pushState(null, '', url.hash);
    goTo(chapter, 0);
  }

  function onHashChange(): void {
    const chapter = chapterFromHash(window.location.hash);
    if (chapter >= 0) goTo(chapter, 0);
  }

  function onScroll(): void {
    emit();
    if (!active || travelling) return;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, SETTLE_MS);
  }

  function onRefresh(): void {
    measure();
    emit();
  }

  // --- ciclo de vida ------------------------------------------------------

  function activate(): void {
    if (active) return;
    active = true;
    root.classList.add('chapters');
    captureInput(true);

    observer = Observer.create({
      type: 'wheel,touch',
      preventDefault: true,
      tolerance: 10,
      // Invertido para que "próximo" seja `onUp` na roda E no toque: a roda
      // para baixo dá deltaY positivo, o dedo subindo dá negativo.
      wheelSpeed: -1,
      ignoreCheck: (event) =>
        scrollsInside(event.target, (event as WheelEvent).deltaY || 0) ||
        !!(event.target as Element | null)?.closest?.('[data-chapter-nav]'),
      onUp: () => stepBy(1),
      onDown: () => stepBy(-1),
    });

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);

    // As alturas mudam com a classe: remedir tudo, e só então ler o hash.
    ScrollTrigger.refresh();
    measure();
    const chapter = chapterFromHash(window.location.hash);
    if (chapter >= 0) goTo(chapter, 0, { immediate: true });
    else settle();
    emit();
  }

  function deactivate(): void {
    if (!active) return;
    active = false;
    root.classList.remove('chapters');
    captureInput(false);

    observer?.kill();
    observer = null;
    window.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onClick);
    window.removeEventListener('hashchange', onHashChange);
    window.clearTimeout(settleTimer);
    window.clearTimeout(cooldown);
    locked = false;
    travelling = false;
    ScrollTrigger.refresh();
  }

  lenis.on('scroll', onScroll);
  ScrollTrigger.addEventListener('refresh', onRefresh);
  measure();

  gsap.matchMedia().add(CHAPTER_MEDIA, () => {
    activate();
    return deactivate;
  });

  return {
    get active() {
      return active;
    },
    chapters,
    stops: () => stops,
    state,
    goTo,
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
