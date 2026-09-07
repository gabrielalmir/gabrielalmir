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

import portraitPlate from '../assets/texture/portrait-plate.webp';
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

export const figureImages = {
  /**
   * A chapa do hero: o desenho a grafite do Gabriel, duotonado para a rampa
   * ink → papel do site.
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
