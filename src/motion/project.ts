/**
 * Movimento das páginas de dossiê (`/projects/[slug]`).
 *
 * Quatro decisões que valem registro:
 *  1. A cortina de entrada é local, não uma View Transition: o site não usa
 *     ClientRouter nesta fase. Ela nasce e morre em JS — sem JS a página
 *     simplesmente aparece, que é o comportamento correto.
 *  2. `[data-mark-draw]` NÃO é tratado aqui. sections.ts desenha todos os do
 *     documento; duplicar significaria animar o mesmo traço duas vezes. Já
 *     `[data-map-line]` fora de `[data-system-panel]` só tem dono aqui.
 *  3. `.motion-ready [data-reveal]` nasce em opacity 0. Todo `[data-reveal]`
 *     do dossiê que nenhum outro módulo reivindicou entra em algum grupo
 *     daqui — texto invisível é pior que uma entrada de menos.
 *  4. Esconder é a única coisa perigosa: um alvo posto em opacity 0 por JS
 *     depende de JS para voltar. Se a montagem estourar no meio, tudo que foi
 *     escondido volta ao CSS antes do erro subir.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { MotionGate } from './gate';

/** Bordo macio da cortina, em % da altura: tinta não sai com régua. */
const CURTAIN_FEATHER = 16;

/**
 * Depois disto a página já foi vista. Cobrir a tela agora seria exatamente o
 * flash que a cortina existe para evitar — então ela desiste.
 */
const CURTAIN_DEADLINE_MS = 1200;

/** Mesmo ponto de entrada usado por sections.ts, para o site ter um ritmo só. */
const REVEAL_START = 'top 85%';

export function initProject(gate: MotionGate): void {
  if (!gate.motion) return;

  // O gate pode ter sido revertido depois de aplicado: quando um módulo
  // estoura, index.ts tira `motion-ready` para devolver a página estática
  // inteira. Esconder qualquer coisa a partir daí seria esconder para sempre.
  if (!document.documentElement.classList.contains('motion-ready')) return;

  const root = document.querySelector<HTMLElement>('[data-project]');
  if (!root) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Antes de qualquer outra coisa e fora do contexto: a cortina só cumpre o
  // papel dela se existir no primeiro quadro.
  const disposeCurtain = raiseCurtain();
  const entrance = disposeCurtain ? 0.28 : 0;

  const ctx = gsap.context(() => {
    /** Tudo que este módulo tocou; a rede de segurança devolve ao CSS. */
    const touched: Element[] = [];
    let split: SplitText | null = null;
    let bar: HTMLElement | null = null;

    try {
      // sections.ts roda antes deste módulo e varre o documento inteiro. Ele
      // esconde com `gsap.set` e só cria a tween quando o trigger dispara,
      // então a marca confiável de "já tem dono" é o ScrollTrigger apontado
      // para o elemento — a tween ainda não existe para ser encontrada.
      const claimed = new Set<Element>();
      for (const st of ScrollTrigger.getAll()) {
        if (st.trigger) claimed.add(st.trigger);
      }
      const unclaimed = (el: Element): boolean =>
        !claimed.has(el) && gsap.getTweensOf(el).length === 0;

      const headline = root.querySelector<HTMLElement>('h1');
      const atlas = root.querySelector<HTMLElement>('[data-atlas-image]');
      const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-project-section]'));
      const inSection = (el: Element): Element | null => el.closest('[data-project-section]');

      // O cabeçalho do dossiê é o que está fora dos blocos: um `<header>`
      // dentro de um `[data-project-section]` é do bloco, e quem o anima é o
      // bloco.
      const header = root.querySelector<HTMLElement>('header');
      const heroRoot =
        header && inSection(header) === null ? header : (headline?.parentElement ?? null);

      // A colheita toda acontece antes do primeiro tween: `unclaimed()` só
      // distingue o que é de outro módulo enquanto este não animou nada.
      const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
        (el) =>
          el !== headline &&
          el !== atlas &&
          !el.hasAttribute('data-project-section') &&
          unclaimed(el),
      );
      const heroReveals = reveals.filter(
        (el) => heroRoot !== null && heroRoot.contains(el) && inSection(el) === null,
      );
      const looseReveals = reveals.filter(
        (el) => !heroReveals.includes(el) && inSection(el) === null,
      );

      // Sem `[data-reveal]` no cabeçalho, status/commit/licença ainda são uma
      // lista de definições, e o link do repositório é o irmão dela — é a
      // única forma que esse metadado pode ter.
      const metaTargets = heroReveals.length
        ? heroReveals
        : heroRoot
          ? Array.from(
              heroRoot.querySelectorAll<HTMLElement>(
                'dl > div, dl > dt, dl > dd, ul > li, dl ~ a',
              ),
            ).filter((el) => inSection(el) === null && unclaimed(el))
          : [];

      const mapLines = Array.from(root.querySelectorAll<SVGGeometryElement>('[data-map-line]'))
        .filter((line) => typeof line.getTotalLength === 'function' && unclaimed(line))
        .map((line) => ({ line, length: line.getTotalLength() }))
        .filter((entry) => entry.length > 0);

      /* --- hero do dossiê ------------------------------------------------ */
      const hero = gsap.timeline({ delay: entrance, defaults: { ease: 'expo.out' } });

      if (atlas && unclaimed(atlas)) {
        touched.push(atlas);
        hero.fromTo(atlas, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.9 }, 0);
      }

      if (metaTargets.length) {
        touched.push(...metaTargets);
        hero.fromTo(
          metaTargets,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 },
          0.18,
        );
      }

      if (headline) {
        touched.push(headline);
        split = splitHeadline(headline, entrance);
      }

      /* --- blocos do dossiê ---------------------------------------------- */
      for (const section of sections) {
        const inner = reveals.filter((el) => inSection(el) === section);
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: section, start: REVEAL_START, once: true },
        });

        touched.push(section);
        tl.fromTo(section, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 });

        if (inner.length) {
          touched.push(...inner);
          tl.fromTo(
            inner,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
            '-=0.45',
          );
        }
      }

      // Reveal solto — nem no cabeçalho, nem dentro de um bloco. Cada um com
      // o próprio trigger, porque não há um pai comum para disparar todos.
      for (const el of looseReveals) {
        touched.push(el);
        gsap.fromTo(
          el,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      }

      /* --- mapa arquitetural --------------------------------------------- */
      // O SVG nasce desenhado: o traço só vira dashoffset aqui, sob movimento.
      // Um `<svg>` por vez, para que cada mapa desenhe na própria sequência.
      const diagrams = new Map<Element, typeof mapLines>();
      for (const entry of mapLines) {
        const svg: Element | null = entry.line.ownerSVGElement ?? entry.line.parentElement;
        if (!svg) continue;
        const group = diagrams.get(svg);
        if (group) group.push(entry);
        else diagrams.set(svg, [entry]);
      }

      diagrams.forEach((group, svg) => {
        for (const { line, length } of group) {
          touched.push(line);
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        }
        gsap.to(
          group.map((entry) => entry.line),
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: svg, start: REVEAL_START, once: true },
          },
        );
      });

      /* --- progresso de leitura ------------------------------------------ */
      // Criado por JS porque só existe com movimento; `aria-hidden` porque é
      // redundante com a barra de rolagem nativa.
      const readingBar = document.createElement('div');
      readingBar.setAttribute('aria-hidden', 'true');
      readingBar.style.cssText =
        'position:fixed;top:0;left:0;right:0;height:2px;z-index:120;pointer-events:none;' +
        'transform:scaleX(0);transform-origin:0 50%;will-change:transform;' +
        'background-color:var(--color-blue)';
      document.body.append(readingBar);
      bar = readingBar;

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        // Escrita direta no style: é uma propriedade por quadro de scroll, e
        // assim a barra não depende de nenhum plugin estar registrado.
        onUpdate: (self) => {
          readingBar.style.transform = `scaleX(${self.progress})`;
        },
      });
    } catch (error) {
      gsap.set(touched, { clearProps: 'all' });
      split?.revert();
      bar?.remove();
      throw error;
    }

    // SplitText e a barra não são tweens: o contexto não os reverte sozinho.
    return () => {
      split?.revert();
      bar?.remove();
    };
  }, root);

  const dispose = (event: PageTransitionEvent): void => {
    // Em bfcache a página volta exatamente como saiu: reverter aqui devolveria
    // os `[data-reveal]` ao opacity 0 do CSS e o dossiê voltaria invisível.
    if (event.persisted) return;
    window.removeEventListener('pagehide', dispose);
    disposeCurtain?.();
    ctx.revert();
  };
  window.addEventListener('pagehide', dispose);
}

/**
 * Cortina de tinta da entrada. Devolve o próprio dispose, ou `null` quando não
 * couber — falhar aqui nunca pode impedir a página de aparecer.
 */
function raiseCurtain(): (() => void) | null {
  if (performance.now() > CURTAIN_DEADLINE_MS) return null;

  let el: HTMLDivElement;
  try {
    el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    // Sem pointer-events: um clique apressado não espera a tinta sair.
    el.style.cssText =
      'position:fixed;inset:0;z-index:190;pointer-events:none;' +
      'background-color:var(--color-ink-950)';
    paintCurtain(el, -CURTAIN_FEATHER);
    document.body.append(el);
  } catch {
    return null;
  }

  const sweep = { edge: -CURTAIN_FEATHER };
  const tween = gsap.to(sweep, {
    edge: 100,
    duration: 0.7,
    ease: 'power3.inOut',
    onUpdate: () => paintCurtain(el, sweep.edge),
    onComplete: () => el.remove(),
  });

  return () => {
    tween.kill();
    el.remove();
  };
}

/**
 * A cortina se retira de baixo para cima. A máscara é o que faz a borda
 * parecer tinta; o clip-path acompanha o mesmo corte para que a retirada
 * continue acontecendo onde `mask-image` não existir.
 */
function paintCurtain(el: HTMLElement, edge: number): void {
  const mask = `linear-gradient(to top, transparent ${edge}%, #000 ${edge + CURTAIN_FEATHER}%)`;
  el.style.setProperty('mask-image', mask);
  el.style.setProperty('-webkit-mask-image', mask);
  el.style.setProperty('clip-path', `inset(0 0 ${Math.max(edge, 0)}% 0)`);
}

/**
 * Título do dossiê em linhas mascaradas. `autoSplit` refaz a quebra quando a
 * fonte carrega ou a largura muda — sem isso a linha se parte no lugar errado
 * e a animação recomeça do zero em vez de continuar de onde estava.
 */
function splitHeadline(headline: HTMLElement, delay: number): SplitText | null {
  // Se o título carrega `data-reveal`, o CSS o deixou em opacity 0 e quem o
  // revela é a entrada das linhas, não o stagger do metadado.
  if (headline.hasAttribute('data-reveal')) gsap.set(headline, { opacity: 1 });

  try {
    return SplitText.create(headline, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.08,
          delay,
        }),
    });
  } catch {
    // SplitText falhou: o título entra inteiro, mas entra.
    gsap.fromTo(
      headline,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay },
    );
    return null;
  }
}
