/**
 * Ponto de entrada único do movimento. Base.astro chama `startMotion()` e
 * nada mais.
 *
 * A ordem importa: o gate decide e marca o <html> antes de qualquer animação
 * existir, senão o CSS esconderia elementos que ninguém iria revelar. Depois
 * a cortina, que é a única coisa autorizada a segurar o boot — e mesmo ela só
 * até o teto de tempo dela.
 *
 * Cada módulo roda no seu próprio try/catch: uma seção que quebra não pode
 * levar as outras junto, porque no `.motion-ready` o CSS já escondeu os
 * `[data-reveal]` e quem os revela é justamente o módulo que falhou.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { applyGate, resolveGate, type MotionGate } from './gate';
import { initPreloader } from './preloader';
import { initSmoothScroll } from './lenis';
import { initHero } from './hero';
import { initSections } from './sections';
import { initProject } from './project';

/**
 * Qualquer coisa que `sections.ts` saiba animar. Os alvos genéricos entram na
 * lista porque o CSS os deixa em `opacity: 0` sob `.motion-ready`: se a home
 * fosse a única página com raiz de seção, um `[data-reveal]` solto no 404
 * ficaria invisível para sempre.
 */
const SECTION_ROOTS = [
  '[data-proofs]',
  '[data-systems]',
  '[data-trajectory]',
  '[data-ai]',
  '[data-process]',
  '[data-contact]',
  '[data-reveal]',
  '[data-reveal-group]',
  '[data-mark-draw]',
].join(',');

let started = false;

/**
 * Roda um módulo isolado. Se ele estourar, o movimento inteiro perde a
 * classe `motion-ready`: é o único jeito de trazer de volta o que o CSS
 * escondeu esperando uma animação que não vai acontecer.
 */
function run(name: string, init: (gate: MotionGate) => void, gate: MotionGate): void {
  try {
    init(gate);
  } catch (error) {
    console.error(`[motion] ${name} falhou; revertendo para a página estática`, error);
    document.documentElement.classList.remove('motion-ready');
  }
}

export function startMotion(): void {
  if (typeof window === 'undefined' || started) return;
  started = true;

  // Primeira linha: o snippet do <head> armou um relógio para tirar o
  // `motion-ready` caso este bundle nunca chegasse. Ele chegou.
  const disarm = (window as Window & { __motionDisarm?: number }).__motionDisarm;
  if (disarm !== undefined) clearTimeout(disarm);

  const gate = resolveGate();
  applyGate(gate);

  // Uma vez só, antes de qualquer módulo: registrar de novo é barato, mas
  // esquecer faz o ScrollTrigger virar um plugin fantasma em produção, onde
  // o tree-shaking já removeu o aviso do console.
  gsap.registerPlugin(ScrollTrigger, SplitText);

  void (async () => {
    try {
      await initPreloader(gate);
    } catch (error) {
      console.error('[motion] preloader falhou', error);
    }

    try {
      initSmoothScroll(gate);
    } catch (error) {
      console.error('[motion] lenis falhou', error);
    }

    if (document.querySelector('[data-hero]')) run('hero', initHero, gate);
    if (document.querySelector(SECTION_ROOTS)) run('sections', initSections, gate);
    if (document.querySelector('[data-project]')) run('project', initProject, gate);

    // As fontes display mudam a altura dos blocos; medir antes delas
    // carregarem deixa todo trigger alguns pixels fora do lugar.
    try {
      await document.fonts?.ready;
    } catch (error) {
      console.error('[motion] document.fonts.ready falhou', error);
    }
    ScrollTrigger.refresh();
  })();
}
