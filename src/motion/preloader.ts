/**
 * A abertura: um pincel escreve o "A" da marca.
 *
 * A cortina é enfeite, e enfeite nunca segura a página — daí o `Promise.race`
 * com um teto duro. Se a animação travar, o teto vence, a cortina sai do DOM e
 * o scroll volta. Roda uma vez por sessão, só no primeiro carregamento.
 *
 * O elemento já vem de Preloader.astro com `hidden`. Quem não vai ver
 * (movimento negado, ou sessão que já viu) nunca tira esse `hidden` — assim o
 * caminho sem JS e o caminho com o gate fechado são exatamente o mesmo.
 */
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import type { MotionGate } from './gate';

gsap.registerPlugin(MotionPathPlugin);

const SEEN_KEY = 'ga:preloaded';
/**
 * Teto total, do primeiro quadro até o elemento sair do DOM.
 *
 * Escrever a letra leva ~1,5 s e a saída ~0,4 s. O teto tem folga sobre isso
 * para não decepar o gesto num aparelho lento, mas continua sendo um teto: se
 * a timeline não terminar, ele termina por ela.
 */
const MAX_MS = 2600;

function wasSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) !== null;
  } catch {
    // Janela privativa lança no acesso. Sem marca, a cortina roda de novo —
    // um enfeite repetido é menos grave que uma exceção no boot do motion.
    return false;
  }
}

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

  if (mark) tl.fromTo(mark, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.3 }, 0);

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

  const curtain = document.querySelector<HTMLElement>('[data-preloader-curtain]');
  if (!curtain) return;
  if (!gate.motion || wasSeen()) return;

  const root = document.documentElement;
  const previousOverflow = root.style.overflow;

  let timeline: gsap.core.Timeline | null = null;
  let timer = 0;

  // Tudo o que trava a página entra DENTRO do try. Antes, `sweep()` era
  // chamado depois de `overflow: hidden` e antes do `try`: se ele estourasse,
  // o `finally` nunca rodava e a pessoa ficava com uma cortina opaca por cima
  // e sem scroll — a falha mais cara possível, logo no primeiro quadro.
  try {
    curtain.hidden = false;
    root.style.overflow = 'hidden';
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
    // com uma cortina esquecida por cima.
    window.clearTimeout(timer);
    timeline?.kill();
    root.style.overflow = previousOverflow;
    curtain.remove();
    markSeen();
  }
}
