/**
 * Movimento do hero.
 *
 * Ordem de decisões que importam aqui:
 *  1. Sem movimento liberado ainda há trabalho: `--mask-progress` nasce em 0 e
 *     deixaria o retrato recortado para sempre. O fundo estático do canvas
 *     continua onde está — nada some.
 *  2. Com movimento, o headline só é dividido depois de `document.fonts.ready`.
 *     Dividir antes mede a fonte de fallback e as larguras saem erradas.
 *  3. A cena Three entra por `await import()`: quem não passa no gate de WebGL
 *     não baixa o bundle, e o fundo estático segue sendo o fundo real.
 *
 * Tudo vive num `gsap.context()` com escopo em `[data-hero]`, para ser
 * revertido de uma vez.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import type { MotionGate } from './gate';

// Registrar é idempotente. Fazer aqui evita que o hero dependa da ordem de
// import de index.ts para funcionar.
gsap.registerPlugin(ScrollTrigger, SplitText);

/** Teto para a espera das fontes. Ver `whenFontsReady`. */
const FONTS_TIMEOUT_MS = 1600;

export function initHero(gate: MotionGate): void {
  const root = document.querySelector<HTMLElement>('[data-hero]');
  if (!root) return;

  const portrait = root.querySelector<HTMLElement>('[data-hero-portrait]');

  if (!gate.motion) {
    // A pincelada do retrato é desenhada pelo CSS a partir desta propriedade:
    // sem animação ela precisa nascer inteira.
    portrait?.style.setProperty('--mask-progress', '1');
    return;
  }

  gsap.context((self) => {
    const headline = root.querySelector<HTMLElement>('[data-hero-headline]');
    const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
    const fallback = root.querySelector<HTMLElement>('[data-hero-fallback]');
    // Um seletor só, para o stagger seguir a ordem do documento (a ordem de
    // leitura) em vez da ordem em que eu listei os atributos.
    const supporting = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-hero-kicker], [data-hero-status], [data-hero-lead], [data-hero-actions]',
      ),
    );

    // O scroll é montado já: se as fontes demorarem, o parallax não espera.
    const scroll = buildScrollTimeline(root, headline, portrait);

    void whenFontsReady().then(() => {
      // `self.add` recoloca o que nasce depois do await dentro do contexto —
      // um callback `async` perderia o escopo no primeiro `await`.
      self.add(() => playIntro(headline, supporting, portrait));
    });

    if (gate.webgl && canvas) {
      void mountField(self, canvas, fallback, scroll);
    }
  }, root);
}

/**
 * O kicker, o lead e as ações só reaparecem no fim desta espera (o CSS os
 * esconde sob `.motion-ready`). Um `fonts.ready` que nunca resolve deixaria o
 * hero mudo, então a espera tem teto.
 */
function whenFontsReady(): Promise<void> {
  const ready = document.fonts?.ready;
  if (!ready) return Promise.resolve();

  return Promise.race([
    ready.then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, FONTS_TIMEOUT_MS);
    }),
  ]);
}

/** Entrada: headline por caractere, apoio escalonado, máscara do retrato. */
function playIntro(
  headline: HTMLElement | null,
  supporting: HTMLElement[],
  portrait: HTMLElement | null,
): void {
  const splits: SplitText[] = [];
  const chars: Element[] = [];

  if (headline) {
    // Uma divisão por linha: cada `[data-split-line]` guarda o próprio
    // overflow, que é o que recorta os caracteres.
    for (const line of Array.from(headline.querySelectorAll<HTMLElement>('[data-split-line]'))) {
      try {
        const split = new SplitText(line, {
          type: 'chars',
          tag: 'span',
          charsClass: 'hero-char',
          // Sem isto o navegador pode quebrar a linha no meio de uma palavra:
          // cada caractere vira uma caixa própria.
          smartWrap: true,
          // O padrão `auto` põe `aria-label` no elemento dividido. Num <span>
          // sem role isso é atributo proibido — o axe reprova, e o rótulo nem
          // seria necessário: o <h1> inteiro continua sendo lido como frase,
          // porque o texto dos caracteres permanece no DOM.
          aria: 'none',
        });
        splits.push(split);
        chars.push(...split.chars);
      } catch (error) {
        // Meio dividido é pior que nada: desfaz tudo e o headline entra inteiro.
        splits.forEach((done) => done.revert());
        splits.length = 0;
        chars.length = 0;
        console.warn('[hero] SplitText falhou; o headline entra inteiro.', error);
        break;
      }
    }
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (chars.length) {
    // `tag: 'span'` mantém o HTML válido dentro da linha, mas span é inline e
    // ignora transform — o inline-block é o que faz os caracteres subirem.
    gsap.set(chars, { display: 'inline-block' });
    tl.fromTo(
      chars,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.02 },
      0,
    );
    /*
     * E desfaz assim que termina.
     *
     * Um <h1> partido em <span> por caractere continua partido para o leitor de
     * tela: o nome acessível do título principal do site vira
     * "E u   t r a n s f o r m o …", soletrado. Os caracteres já terminam em
     * opacity 1 / yPercent 0, e a timeline de scroll anima o próprio
     * `[data-hero-headline]`, não os chars — depois da entrada ninguém depende
     * deles. O texto volta a ser texto.
     */
    tl.eventCallback('onComplete', () => {
      splits.forEach((split) => split.revert());
      splits.length = 0;
      ScrollTrigger.refresh();
    });
  } else if (headline) {
    tl.fromTo(headline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0);
  }

  if (supporting.length) {
    tl.fromTo(
      supporting,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      0.45,
    );
  }

  if (portrait) {
    tl.fromTo(
      portrait,
      { '--mask-progress': 0 },
      { '--mask-progress': 1, duration: 1.4, ease: 'power2.out' },
      0.1,
    );
  }

  // Dividir o headline mexe na altura da caixa por frações de pixel; os
  // triggers precisam remedir depois disso.
  ScrollTrigger.refresh();
}

/** Parallax do hero enquanto a seção sai de cena. */
function buildScrollTimeline(
  root: HTMLElement,
  headline: HTMLElement | null,
  portrait: HTMLElement | null,
): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
  });

  if (portrait) tl.to(portrait, { yPercent: 15, duration: 1 }, 0);

  if (headline) {
    tl.to(headline, { y: -60, duration: 1 }, 0);
    // `fromTo` e não `to`: se o headline chegasse escondido por CSS, o valor de
    // partida gravado seria 0 e o scrub o prenderia invisível.
    tl.fromTo(headline, { opacity: 1 }, { opacity: 0, duration: 0.6 }, 0);
  }

  return tl;
}

/** Sobe a cena Three e troca o fundo estático por ela. */
async function mountField(
  self: gsap.Context,
  canvas: HTMLCanvasElement,
  fallback: HTMLElement | null,
  scroll: gsap.core.Timeline,
): Promise<void> {
  let dispose: (() => void) | undefined;

  try {
    const { mountInkField } = await import('../webgl/ink-field');
    dispose = mountInkField(canvas);
  } catch (error) {
    // Sem cena, o fundo estático continua sendo o fundo do hero.
    console.warn('[hero] campo de tinta indisponível; fica o fundo estático.', error);
    return;
  }

  const release = disposeOnce(dispose);

  self.add(() => {
    const intro = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power2.out' },
      onComplete: () => {
        // O scrub só toca a opacidade do canvas depois da entrada: dois tweens
        // na mesma propriedade fariam o fundo piscar.
        scroll.to(canvas, { opacity: 0.25, duration: 1 }, 0);
      },
    });

    intro.fromTo(canvas, { opacity: 0 }, { opacity: 1 }, 0);

    if (fallback) {
      intro.to(
        fallback,
        {
          opacity: 0,
          onComplete: () => {
            fallback.style.display = 'none';
          },
        },
        0,
      );
    }

    const onPageHide = (event: PageTransitionEvent) => {
      release();
      // Voltando do bfcache o contexto WebGL está morto: o fundo estático
      // precisa estar de pé de novo, senão o hero volta sem fundo.
      if (event.persisted && fallback) gsap.set(fallback, { display: '', opacity: 1 });
    };
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.removeEventListener('pagehide', onPageHide);
      release();
      if (fallback) fallback.style.display = '';
    };
  });
}

/** `dispose()` pode chegar por `pagehide` e por revert do contexto. */
function disposeOnce(dispose: (() => void) | undefined): () => void {
  let released = false;
  return () => {
    if (released || typeof dispose !== 'function') return;
    released = true;
    dispose();
  };
}
