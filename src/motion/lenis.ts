/**
 * Scroll suave.
 *
 * Lenis reescreve a posição de scroll a cada quadro; o ScrollTrigger precisa
 * ser avisado no mesmo quadro, senão os pins ficam um frame atrás e tremem.
 * Por isso os dois compartilham um relógio só: o ticker do GSAP conduz o
 * `raf` do Lenis (`autoRaf: false`) e o evento de scroll do Lenis chama
 * `ScrollTrigger.update`.
 *
 * O import é estático porque a assinatura congelada devolve a instância de
 * forma síncrona — não dá para esperar um `await import()` e ainda retornar
 * `Lenis`. Quem recusou movimento paga só o download do módulo, nunca o
 * custo de execução: o gate corta antes de qualquer listener existir.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MotionGate } from './gate';

let instance: Lenis | null = null;

export function initSmoothScroll(gate: MotionGate): Lenis | null {
  if (!gate.motion || typeof window === 'undefined') return null;
  // Uma instância por página: duas competiriam pelo mesmo scrollTop.
  if (instance) return instance;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });

  // Desliga o `scroll-behavior: smooth` nativo do global.css — com Lenis
  // ligado, os dois interpolando a mesma âncora dão um solavanco.
  document.documentElement.classList.add('lenis-active');

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  // Sem isto, uma aba em segundo plano volta com um salto de scroll gigante.
  gsap.ticker.lagSmoothing(0);

  /*
   * E o proxy — sem ele, todo scroll PROGRAMÁTICO é perdido.
   *
   * O ScrollTrigger move a página escrevendo em `scrollTop`. O Lenis mantém a
   * própria posição-alvo interpolada e a reescreve no quadro seguinte, então a
   * escrita do ScrollTrigger dura um frame e some. Isso derrubava em silêncio
   * duas coisas: o `snap` dos painéis de Sistemas (que nunca assentava, mesmo
   * configurado) e o salto de foco por Tab dentro do trilho pinado.
   *
   * O proxy faz os dois falarem a mesma língua: ler devolve a posição do
   * Lenis, escrever pede ao Lenis para ir até lá (`immediate`, porque quem
   * chama já está animando).
   */
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true, force: true });
        return undefined;
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });
  ScrollTrigger.defaults({ scroller: document.documentElement });
  ScrollTrigger.addEventListener('refresh', () => lenis.resize());

  instance = lenis;
  return lenis;
}
