/**
 * Os passos de cada capítulo — o crossfade sobre o palco.
 *
 * Um ScrollTrigger por capítulo, com scrub: entre a parada `i` e a `i+1` o
 * passo que sai sobe e apaga, o que entra desce e acende. Como as paradas do
 * motor (src/motion/chapters.ts) caem exatamente nos labels, o crossfade
 * viaja junto com o `scrollTo` — a pessoa nunca vê meio passo parado.
 *
 * Só roda com a classe `chapters` no <html>: é o CSS de global.css que deixa
 * os passos em opacity 0 e sobrepostos, e é ele que os devolve ao fluxo se o
 * motion cair. Este módulo não esconde nada por conta própria.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { ChapterEngine } from './chapters';

export type StepHooks = {
  /** Um passo acabou de virar o ativo do seu capítulo. */
  onStepActive?: (step: HTMLElement, chapter: HTMLElement, index: number) => void;
  /** Um alvo de `data-reveal` dentro de um passo foi posto inteiro. */
  onRevealed?: (el: Element) => void;
};

/** Quanto do intervalo entre paradas o crossfade ocupa. */
const OUT = 0.4;
const IN = 0.55;

function setActive(steps: HTMLElement[], index: number): void {
  steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
}

/**
 * O entra-e-sai do capítulo inteiro: o palco apaga enquanto o capítulo sai
 * pelo topo e acende enquanto o próximo chega por baixo. Duas variáveis, e
 * não a opacidade direta, porque a timeline dos passos já anima a opacidade
 * do primeiro e do último passo — duas tweens na mesma propriedade brigam.
 */
function buildChapterFade(chapter: HTMLElement, stage: HTMLElement, first: boolean, last: boolean): void {
  if (!first) {
    gsap.fromTo(
      stage,
      { '--enter': 0 },
      {
        '--enter': 1,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top 70%', end: 'top 15%', scrub: true },
      },
    );
  }
  if (!last) {
    gsap.fromTo(
      stage,
      { '--exit': 1 },
      {
        '--exit': 0,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'bottom 85%', end: 'bottom 30%', scrub: true },
      },
    );
  }
}

function buildStepTimeline(
  chapter: HTMLElement,
  steps: HTMLElement[],
  hooks: StepHooks,
): void {
  const count = steps.length;
  let activeIndex = -1;

  const activate = (index: number) => {
    if (index === activeIndex) return;
    activeIndex = index;
    setActive(steps, index);
    hooks.onStepActive?.(steps[index], chapter, index);
  };

  // O primeiro passo nasce inteiro; os outros esperam a vez. A classe entra
  // já (é ela que libera o ponteiro); os hooks só disparam com o capítulo
  // em cena, pelo trigger abaixo.
  gsap.set(steps, { opacity: 0, y: 24 });
  gsap.set(steps[0], { opacity: 1, y: 0 });
  setActive(steps, 0);

  if (count === 1) {
    // Sem passos para trocar, o "ativo" é decidido pela entrada do capítulo.
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (self.isActive) activate(0);
      },
    });
    return;
  }

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: chapter,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => activate(Math.round(self.progress * (count - 1))),
      onToggle: (self) => {
        if (self.isActive) activate(Math.round(self.progress * (count - 1)));
      },
    },
  });

  for (let i = 0; i < count - 1; i += 1) {
    const leaving = steps[i];
    const entering = steps[i + 1];
    // Os filhos do passo entram em degrau: dá corpo ao movimento sem cada
    // um precisar do próprio trigger.
    const children = Array.from(entering.children) as HTMLElement[];

    timeline.to(leaving, { opacity: 0, y: -24, duration: OUT }, i);
    timeline.fromTo(entering, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: IN }, i + 0.15);
    if (children.length) {
      timeline.fromTo(
        children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: IN, stagger: 0.06 },
        i + 0.2,
      );
    }
    // Segmento fechado em 1 unidade por parada, para o label casar com o scroll.
    timeline.to({}, { duration: Math.max(0, 1 - IN - 0.2) }, i + 0.2 + IN);
  }
}

export function initSteps(engine: ChapterEngine, hooks: StepHooks = {}): void {
  const chapters = engine.chapters;

  chapters.forEach((chapter, index) => {
    const stage = chapter.querySelector<HTMLElement>('[data-chapter-stage]');
    if (!stage) return;
    const steps = Array.from(chapter.querySelectorAll<HTMLElement>('[data-step]'));
    if (!steps.length) return;

    // Dentro de um passo, `data-reveal` não faz sentido: o passo inteiro é
    // quem entra. Posto inteiro e anotado para o reveal genérico pular.
    steps.forEach((step) => {
      step.querySelectorAll<HTMLElement>('[data-reveal], [data-proof-item]').forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
        hooks.onRevealed?.(el);
      });
    });

    buildChapterFade(chapter, stage, index === 0, index === chapters.length - 1);
    buildStepTimeline(chapter, steps, hooks);
  });
}
