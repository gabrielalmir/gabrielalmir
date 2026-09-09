/**
 * As chapas do palco — o fundo de cada capítulo da home.
 *
 * Antes eram seis .webp: aguadas de nanquim cinza-azuladas sobre papel quase
 * preto, cada uma com um respingo terracota. Lidas juntas, mancha orgânica
 * escura mais ponto vermelho no meio dão Rorschach, não dossiê. Saíram.
 *
 * No lugar, um campo de luz: dois ou três blooms largos e fora de centro sobre
 * preto, desenhados como SVG e servidos em data-URI. Três razões para gerar em
 * vez de desenhar:
 *
 * - Continuidade. As seis chapas são a MESMA receita com a temperatura girando
 *   um arco fechado (azul → petróleo → sálvia → âmbar → violeta → azul). A
 *   troca de capítulo vira deriva de cor, que é o efeito pedido; seis imagens
 *   diferentes viravam corte.
 * - Peso. ~1 KB por chapa contra 11–36 KB, e nenhuma passa por `getImage`.
 * - Contrato. Continua sendo `url(...)`, que é o que o projeto no-JS dos
 *   testes verifica no `background-image` do hero.
 *
 * As cores aqui e as de `actParams()` em src/webgl/shaders/ink.frag.glsl são o
 * mesmo arco: a chapa é o que se vê sem WebGL, a cena é a mesma luz em
 * movimento por cima. Mexeu numa, mexe na outra.
 */

/** Um bloom: centro em fração da chapa, raio, cor e opacidade no centro. */
type Bloom = {
  cx: number;
  cy: number;
  r: number;
  color: string;
  alpha: number;
};

/**
 * O arco de temperaturas, um por ato. O ato 6 fecha de volta no azul do ato 1
 * — a home rola em looping visual, e um salto violeta→azul no fim seria o
 * único corte da sequência.
 *
 * Os alfas parecem altos para "atmosfera", e são: a base é quase preta e o
 * .stage-scrim de global.css ainda joga 62%→18% de ink por cima. Medido na
 * tela, um bloom de 0.30 somava uns 20/255 e sumia sob o véu. O que segura o
 * contraste do texto é o véu, não o brilho da chapa.
 */
const ACTS: Bloom[][] = [
  // 1 — Início. Azul-aço, a luz mais fria e mais alta da sequência.
  [
    { cx: 0.72, cy: 0.3, r: 0.72, color: '#5f86bd', alpha: 0.6 },
    { cx: 0.28, cy: 0.82, r: 0.58, color: '#3d5f8a', alpha: 0.36 },
  ],
  // 2 — Provas. O azul cede para ciano-petróleo e desce na tela.
  [
    { cx: 0.64, cy: 0.58, r: 0.76, color: '#4d8fa0', alpha: 0.56 },
    { cx: 0.14, cy: 0.2, r: 0.5, color: '#43688f', alpha: 0.34 },
  ],
  // 3 — Sistemas. Petróleo → sálvia: ainda frio, já com verde.
  [
    { cx: 0.34, cy: 0.36, r: 0.7, color: '#57907f', alpha: 0.54 },
    { cx: 0.86, cy: 0.76, r: 0.6, color: '#3f7d86', alpha: 0.36 },
  ],
  // 4 — Trajetória. O único ato quente: âmbar baixo, sem chegar a laranja.
  [
    { cx: 0.7, cy: 0.68, r: 0.74, color: '#a8834e', alpha: 0.52 },
    { cx: 0.22, cy: 0.28, r: 0.56, color: '#7d7f56', alpha: 0.33 },
  ],
  // 5 — IA. Âmbar virando violeta-magenta, o ponto mais distante do azul.
  [
    { cx: 0.5, cy: 0.42, r: 0.78, color: '#8f6295', alpha: 0.54 },
    { cx: 0.9, cy: 0.86, r: 0.54, color: '#9b6f78', alpha: 0.34 },
  ],
  // 6 — Processo e Contato. Violeta voltando ao azul: o arco fecha.
  [
    { cx: 0.6, cy: 0.24, r: 0.72, color: '#6c73ad', alpha: 0.55 },
    { cx: 0.2, cy: 0.74, r: 0.62, color: '#4a6ea3', alpha: 0.35 },
  ],
];

/** O preto de base das chapas — o mesmo `--color-ink-950` de global.css. */
const BASE = '#060708';

/** Proporção nominal do SVG. `background-size: cover` reenquadra; isto só
 *  define o sistema de coordenadas em que os blooms foram posicionados. */
const W = 1600;
const H = 900;

function bloomStops(bloom: Bloom, id: string): string {
  /* Três paradas, não duas: uma gaussiana falsa. Com duas, o gradiente radial
     do SVG é linear no raio e deixa um anel visível onde termina. */
  return (
    `<radialGradient id="${id}" cx="${bloom.cx}" cy="${bloom.cy}" r="${bloom.r}">` +
    `<stop offset="0" stop-color="${bloom.color}" stop-opacity="${bloom.alpha}"/>` +
    `<stop offset="0.45" stop-color="${bloom.color}" stop-opacity="${(bloom.alpha * 0.4).toFixed(3)}"/>` +
    `<stop offset="1" stop-color="${bloom.color}" stop-opacity="0"/>` +
    `</radialGradient>`
  );
}

function plateSvg(blooms: Bloom[]): string {
  const defs = blooms.map((bloom, index) => bloomStops(bloom, `b${index}`)).join('');
  const rects = blooms
    .map((_, index) => `<rect width="${W}" height="${H}" fill="url(#b${index})"/>`)
    .join('');

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" ` +
    `viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs>${defs}</defs>` +
    `<rect width="${W}" height="${H}" fill="${BASE}"/>${rects}</svg>`
  );
}

/**
 * Data-URI de um SVG, sem base64: o SVG é texto e um `encodeURIComponent`
 * seletivo sai menor que base64 e continua legível no devtools. Só o que
 * quebraria a URL ou o `url('…')` do CSS precisa escapar.
 */
function dataUri(svg: string): string {
  const escaped = svg
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/#/g, '%23')
    .replace(/"/g, "'");
  return `data:image/svg+xml,${escaped}`;
}

/**
 * O bloco `:root{…}` que Stage.astro publica: `--plate-1` … `--plate-6`. Cada
 * seção lê `var(--plate-N)` e o motion escreve a mesma variável nas camadas do
 * palco, então este é o único lugar onde as chapas existem.
 */
export function platesCss(): string {
  const vars = ACTS.map((blooms, index) => `--plate-${index + 1}:url("${dataUri(plateSvg(blooms))}")`);
  return `:root{${vars.join(';')}}`;
}
