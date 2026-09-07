/**
 * Gate de movimento.
 *
 * O site nasce visível: nenhum texto e nenhuma imagem depende de JS. A única
 * coisa que o gate faz é *liberar* movimento, adicionando `motion-ready` no
 * <html> — enquanto a classe não existe, o CSS de `global.css` mantém tudo
 * opaco e no lugar. Por isso o gate pode negar à vontade: negar é o estado
 * seguro, nunca uma página quebrada.
 *
 * São duas decisões independentes: `motion` (animar qualquer coisa) e `webgl`
 * (subir a cena Three do hero). Máquina fraca ou plano de dados econômico
 * perde o WebGL mas continua com as transições, que custam quase nada.
 */

export type MotionGate = { motion: boolean; webgl: boolean; reason: string };

/**
 * Abaixo desta largura a cena não sobe.
 *
 * Não é estética — é medição. Num Lighthouse mobile o campo de tinta sozinho
 * respondia por ~9 s de trabalho de main thread e derrubava o TBT para 3,5 s:
 * `deviceMemory` num telefone real costuma reportar 8, então a heurística de
 * memória não pega o caso, e sem GPU dedicada o quad em tela cheia é rasterizado
 * por software. No telefone o hero já mostra o fundo estático de qualquer jeito,
 * e o retrato tem outro peso na composição — a cena não é o que se perde.
 *
 * O mesmo 768 do breakpoint `md` do resto do site, de propósito: um lugar só
 * onde "isto é desktop" está escrito.
 */
const WEBGL_MIN_WIDTH = 768;

/** `?flag=1` liga, `?flag=0` desliga, ausente/qualquer outra coisa não opina. */
function readFlag(params: URLSearchParams, key: string): boolean | null {
  const raw = params.get(key);
  if (raw === '1') return true;
  if (raw === '0') return false;
  return null;
}

/**
 * Sonda um contexto real em vez de confiar em `'WebGLRenderingContext' in
 * window`: o construtor existe em navegadores que, por driver bloqueado ou
 * contexto esgotado, não entregam contexto nenhum.
 */
function canCreateWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const context =
      (probe.getContext('webgl2') as WebGLRenderingContext | null) ??
      (probe.getContext('webgl') as WebGLRenderingContext | null);
    if (!context) return false;
    // Devolve o slot de GPU na hora — a cena do hero vai querer o dela.
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function resolveGate(): MotionGate {
  // O módulo roda num <script> de cliente, mas a guarda evita explodir se
  // alguém importar o gate de dentro do frontmatter de um .astro.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { motion: false, webgl: false, reason: 'sem-dom' };
  }

  const params = new URLSearchParams(window.location.search);
  const webglFlag = readFlag(params, 'webgl');

  // A decisão de `motion` já foi tomada — pelo snippet inline no <head> do
  // Base.astro, antes da primeira pintura. Ela NÃO é refeita aqui de propósito:
  // este bundle chega centenas de milissegundos depois, e decidir agora
  // significaria pintar o conteúdo visível e só então escondê-lo para animar.
  // Numa conexão lenta isso é um piscar bem visível. Aqui só se lê o veredito.
  const root = document.documentElement;
  const motion = root.classList.contains('motion-ready');
  let reason = root.dataset.motionGate ?? (motion ? 'ok' : 'sem-gate');

  // Movimento negado encerra o assunto: WebGL é o mais caro de todos, não faz
  // sentido subir uma cena animada numa página que decidiu não animar. Este é
  // o único veto que `?webgl=1` não atravessa.
  if (!motion) {
    return { motion: false, webgl: false, reason };
  }

  const nav = window.navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  let webgl = true;
  if (nav.connection?.saveData) {
    webgl = false;
    reason = 'save-data';
  } else if (window.innerWidth < WEBGL_MIN_WIDTH) {
    webgl = false;
    reason = 'tela-estreita';
  } else if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) {
    webgl = false;
    reason = 'pouca-memoria';
  } else if (!canCreateWebGL()) {
    webgl = false;
    reason = 'sem-webgl';
  }

  // A URL fala por último e sobrepõe as heurísticas: `?webgl=1` força a cena
  // mesmo com memória baixa, que é justamente o cenário que se quer testar.
  if (webglFlag !== null) {
    webgl = webglFlag;
    reason = webglFlag ? 'url:webgl=1' : 'url:webgl=0';
  }

  return { motion, webgl, reason };
}

/**
 * Registra o veredito final no DOM.
 *
 * A classe `motion-ready` já foi posta pelo snippet do <head>; o que sobra aqui
 * é a razão, agora completa — o head só sabia sobre reduced-motion, e é neste
 * ponto que "sem-webgl", "tela-estreita" ou "save-data" entram. O teste e2e lê
 * `data-motion-gate` para saber por que a página está do jeito que está.
 */
export function applyGate(gate: MotionGate): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (gate.motion) root.classList.add('motion-ready');
  else root.classList.remove('motion-ready');
  root.dataset.motionGate = gate.reason;
}
