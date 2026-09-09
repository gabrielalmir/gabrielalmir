/**
 * Registro de imagens locais.
 *
 * Astro precisa de imports estáticos para otimizar; um `import()` dinâmico com
 * caminho variável não é analisável. Então cada imagem é registrada aqui uma
 * vez e resolvida por chave — as chaves são as mesmas usadas no frontmatter
 * (`atlas:`) e em src/lib/content.ts (`image:`).
 */
import type { ImageMetadata } from 'astro';

import hush from '../assets/atlas/hush.webp';
import maybe from '../assets/atlas/maybe.webp';
import mcpAnimaginexl from '../assets/atlas/mcp-animaginexl.webp';
import pimbas from '../assets/atlas/pimbas.webp';
import saturno from '../assets/atlas/saturno.webp';

import portraitPlate from '../assets/texture/portrait-plate-v2.webp';

import act01 from '../assets/stage/act-01.webp';
import act02 from '../assets/stage/act-02.webp';
import act03 from '../assets/stage/act-03.webp';
import act04 from '../assets/stage/act-04.webp';
import act05 from '../assets/stage/act-05.webp';
import act06 from '../assets/stage/act-06.webp';
import notFoundFigure from '../assets/texture/gabriel-404.webp';
import processFigure from '../assets/texture/gabriel-process.webp';

import instagram from '../assets/trajectory/instagram-960.webp';
import interfatecs from '../assets/trajectory/interfatecs-960.webp';
import minimarathon from '../assets/trajectory/minimarathon-960.webp';
import photogimp from '../assets/trajectory/photogimp.png';
import sbcMarathon from '../assets/trajectory/sbc-marathon-960.webp';
import youtube from '../assets/trajectory/youtube-960.webp';

export const atlasImages = {
  hush,
  maybe,
  'mcp-animaginexl': mcpAnimaginexl,
  pimbas,
  saturno,
} satisfies Record<string, ImageMetadata>;

/**
 * As chapas de tinta atrás de cada capítulo da home (ver `chapters` em
 * content.ts). Geradas em 2026-09-09 a partir da paleta do site: nanquim
 * diluído em azul-acinzentado sobre preto, um respingo terracota por chapa.
 * Já saem escurecidas na origem — a chapa é textura atrás de texto, nunca
 * pode competir com ele.
 */
export const stageImages = [act01, act02, act03, act04, act05, act06] as const;

export const figureImages = {
  /**
   * A chapa do hero: desenho a grafite do Gabriel sobre papel claro, com o
   * bloco azul ao lado — gerado em 2026-09-09 a partir de uma foto dele, com
   * ombros e moletom visíveis de propósito.
   *
   * Não é `texture/portrait.webp`, que é uma foto em que só os olhos escapam
   * do preto: recortada e posta sobre o hero quase preto, ela virava uma
   * cabeça encapuzada flutuando. O desenho tem rosto inteiro, expressão aberta
   * e fundo claro — é ele que tira o hero da penumbra.
   */
  portrait: portraitPlate,
  'not-found': notFoundFigure,
  process: processFigure,
} satisfies Record<string, ImageMetadata>;

export const trajectoryImages = {
  instagram,
  interfatecs,
  minimarathon,
  photogimp,
  'sbc-marathon': sbcMarathon,
  youtube,
} satisfies Record<string, ImageMetadata>;

export type AtlasKey = keyof typeof atlasImages;
export type TrajectoryImageKey = keyof typeof trajectoryImages;

/** `key` é opcional: um caso pode não ter arte própria, e mentir com a arte de
 *  outro projeto é pior que publicar sem imagem. */
export function atlasImage(key: string | undefined): ImageMetadata | undefined {
  if (!key) return undefined;
  return (atlasImages as Record<string, ImageMetadata>)[key];
}

export function trajectoryImage(key: string | undefined): ImageMetadata | undefined {
  if (!key) return undefined;
  return (trajectoryImages as Record<string, ImageMetadata>)[key];
}
