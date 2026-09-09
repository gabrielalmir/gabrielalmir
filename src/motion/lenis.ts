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

/**
 * Enquanto verdadeiro, o Lenis ignora roda e toque — é o modo capítulos, em
 * que src/motion/chapters.ts captura o gesto e decide para onde ir. Não é
 * `lenis.stop()`: parar o Lenis põe `overflow: clip` no <html> (lenis.css) e
 * a barra de rolagem some, o que quebraria arrastar a barra e o `scrollTo`
 * do Playwright. Aqui só a entrada é devolvida ao capturador; o resto — o
 * sync com a barra, o `scrollTo` programático — continua igual.
 */
let inputCaptured = false;

export function captureInput(captured: boolean): void {
  inputCaptured = captured;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function initSmoothScroll(gate: MotionGate): Lenis | null {
  if (!gate.motion || typeof window === 'undefined') return null;
  // Uma instância por página: duas competiriam pelo mesmo scrollTop.
  if (instance) return instance;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    autoRaf: false,
    // Avaliado a cada gesto, por nó do caminho do evento: devolver `true`
    // faz o Lenis sair antes de tocar no evento.
    prevent: () => inputCaptured,
  });

  // O `scroll-behavior: smooth` nativo do global.css é desligado pela classe
  // `lenis` que o próprio Lenis põe no <html> — com os dois interpolando a
  // mesma âncora dava solavanco. (Uma classe própria não sobrevive: o Lenis
  // limpa todo `lenis*` do <html> a cada troca de estado.)

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  // Sem isto, uma aba em segundo plano volta com um salto de scroll gigante.
  gsap.ticker.lagSmoothing(0);

  /*
   * E o proxy — sem ele, todo scroll PROGRAMÁTICO é perdido.
   *
   * O ScrollTrigger move a página escrevendo em `scrollTop`. O Lenis mantém a
   * própria posição-alvo interpolada e a reescreve no quadro seguinte, então a
   * escrita do ScrollTrigger dura um frame e some. O proxy faz os dois falarem
   * a mesma língua: ler devolve a posição do Lenis, escrever pede ao Lenis
   * para ir até lá (`immediate`, porque quem chama já está animando).
   */
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (value !== undefined) {
        // Um `refresh()` do ScrollTrigger (o da entrada do hero, por exemplo)
        // lê a posição e a escreve de volta. Um `scrollTo` imediato aqui chama
        // o `reset()` do Lenis e mata a viagem em curso entre capítulos — a
        // página parava a meio caminho, a 64px do topo. Com uma animação
        // rodando, a escrita é ignorada: ela vai chegar onde ia de qualquer
        // jeito, e o refresh só queria devolver a posição que já tinha.
        if (lenis.isScrolling === 'smooth' && lenis.animate.isRunning) return undefined;
        if (Math.abs(value - lenis.scroll) < 1) return undefined;
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
