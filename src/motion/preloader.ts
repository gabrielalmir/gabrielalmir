/**
 * A abertura: um pincel escreve o "A" da marca.
 *
 * A cortina é enfeite, e enfeite nunca segura a página — daí o `Promise.race`
 * com um teto duro. Se a animação travar, o teto vence, a cortina sai do DOM e
 * o scroll volta. Roda uma vez por sessão, só no primeiro carregamento.
 *
 * Quem decide se a cortina aparece é o snippet do <head>, que marca
 * `html.preloading` antes da primeira pintura — este módulo chega tarde demais
 * para essa decisão e, quando a tomava, a página piscava: conteúdo, cortina
 * por cima, conteúdo de novo. Aqui só se anima o que já está na tela, e se
 * tira a classe no fim. Quem não vai ver (movimento negado, sessão que já viu)
 * nunca ganha a classe — o caminho sem JS e o do gate fechado são o mesmo.
 */
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import type { MotionGate } from './gate';

gsap.registerPlugin(MotionPathPlugin);

/** A mesma chave que o snippet do <head> lê para decidir a classe. */
const SEEN_KEY = 'ga:preloaded';
/**
 * Teto total, do primeiro quadro até o elemento sair do DOM.
 *
 * Escrever a letra leva ~1,5 s e a saída ~0,4 s. O teto tem folga sobre isso
 * para não decepar o gesto num aparelho lento, mas continua sendo um teto: se
 * a timeline não terminar, ele termina por ela.
 */
const MAX_MS = 2600;

function markSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Idem: não poder marcar não é motivo para falhar.
  }
}

/**
 * A escrita.
 *
 * Cada traço é revelado por stroke-dashoffset, na ordem em que a mão escreveria
 * — a diagonal principal primeiro, depois a perna, depois o travessão. A
 * máscara do SVG apara o traço na silhueta da marca, então o que se vê é tinta
 * enchendo a letra, e não um contorno sendo percorrido.
 *
 * O pincel corre pelo mesmo `d` do traço via MotionPath, com `autoRotate`, de
 * modo que ele está sempre na ponta da tinta e inclinado como ela. Os dois
 * andam na mesma tween para não haver como dessincronizar.
 */
function sweep(curtain: HTMLElement): GSAPTimeline {
  const strokes = Array.from(
    curtain.querySelectorAll<SVGPathElement>('[data-preloader-stroke]'),
  ).sort((a, b) => Number(a.dataset.strokeIndex) - Number(b.dataset.strokeIndex));
  const brush = curtain.querySelector<SVGGElement>('[data-preloader-brush]');
  const mark = curtain.querySelector<SVGElement>('[data-preloader-mark]');

  const tl = gsap.timeline();

  // Sem os traços não há o que escrever: cai para um fade e sai. Vale para o
  // caso de o SVG não ter sido renderizado por qualquer motivo.
  if (!strokes.length) {
    return tl.to(curtain, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' });
  }

  // Só a escala. Animar a opacidade daqui apagaria o papel que já está na
  // tela desde o primeiro quadro, para reacendê-lo — um piscar no lugar de
  // uma entrada.
  if (mark) tl.fromTo(mark, { scale: 0.94 }, { scale: 1, duration: 0.3 }, 0);

  strokes.forEach((path, index) => {
    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      length = 0;
    }
    if (!length) return;

    /*
     * O repouso é `autoAlpha: 0`, não só dashoffset.
     *
     * Com `stroke-linecap: round` e o traço todo recolhido, o navegador ainda
     * pinta a meia-esfera da ponta: um disco branco parado no meio da marca,
     * antes de a escrita começar — e nenhum ajuste de dasharray o remove de
     * forma confiável, porque o cap não pertence ao tracejado. Esconder o
     * elemento e acendê-lo no quadro em que a tinta começa a correr resolve
     * sem depender do que cada motor faz com a ponta.
     */
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 0 });

    // Traço mais longo, gesto mais longo — é o que faz o ritmo parecer mão e
    // não temporizador.
    const duration = 0.34 + length / 150;
    const at = index === 0 ? 0.16 : '>-0.06';

    tl.set(path, { autoAlpha: 1 }, at);
    tl.to(path, { strokeDashoffset: 0, duration, ease: 'power1.inOut' }, at);

    if (brush) {
      tl.to(
        brush,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
          duration,
          ease: 'power1.inOut',
        },
        '<',
      );
      // O pincel encosta no papel no começo do traço e levanta no fim.
      tl.to(brush, { opacity: 1, duration: 0.12 }, '<');
      tl.to(brush, { opacity: 0, duration: 0.16 }, `<${duration - 0.16}`);
    }
  });

  // A marca respira uma vez e a cortina sobe.
  tl.to(mark ?? curtain, { scale: 1.04, duration: 0.34, ease: 'power2.out' }, '>-0.1');
  tl.to(curtain, { autoAlpha: 0, duration: 0.42, ease: 'power2.inOut' }, '>-0.18');

  return tl;
}

export async function initPreloader(gate: MotionGate): Promise<void> {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const curtain = document.querySelector<HTMLElement>('[data-preloader-curtain]');
  if (!curtain) return;

  // A cortina não está na tela: ou o gate negou, ou a sessão já viu a abertura.
  // O markup fica no DOM sem fazer nada; tirá-lo daqui é só limpeza.
  if (!gate.motion || !root.classList.contains('preloading')) {
    curtain.remove();
    return;
  }

  let timeline: gsap.core.Timeline | null = null;
  let timer = 0;

  // Tudo o que trava a página entra DENTRO do try: se `sweep()` estourar, o
  // `finally` ainda tira a classe. Sem isso a pessoa ficaria com uma cortina
  // opaca por cima e sem scroll — a falha mais cara possível, logo no primeiro
  // quadro.
  try {
    timeline = sweep(curtain);

    const settled = timeline;
    await Promise.race([
      new Promise<void>((resolve) => {
        settled.eventCallback('onComplete', () => resolve());
      }),
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, MAX_MS);
      }),
    ]);
  } finally {
    // Roda mesmo se a animação estourar: a página nunca fica sem scroll nem
    // com uma cortina esquecida por cima. A classe destrava o scroll e esconde
    // a cortina no mesmo quadro — não há estado de `style` para restaurar.
    window.clearTimeout(timer);
    timeline?.kill();
    root.classList.remove('preloading');
    curtain.remove();
    markSeen();
  }
}
