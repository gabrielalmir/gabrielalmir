#!/usr/bin/env node
/**
 * Servidor estático de `dist/`, em primeiro plano.
 *
 * Por que não `astro preview`: no Astro 7 ele se desprende e sai com 0 — mesmo
 * sem `--background`, e mesmo com a porta livre. O Playwright vê o processo
 * terminar e desiste com "Process from config.webServer exited early". O mesmo
 * vale para `astro dev`, que ainda por cima toma um lock. Um servidor que fica
 * de pé até receber um sinal é o que a suíte precisa, e são cinquenta linhas.
 *
 * Serve exatamente o que vai ao ar: a saída estática, com a mesma resolução de
 * diretório (`/projects/pimbas` → `dist/projects/pimbas/index.html`) e o mesmo
 * 404 do build.
 *
 * Uso: node scripts/serve-dist.mjs [--port 4321] [--host 127.0.0.1] [--root dist]
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { argv, exit } from 'node:process';
import { createBrotliCompress, createGzip, constants as zlibConstants } from 'node:zlib';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function flag(name, fallback) {
  const at = argv.indexOf(`--${name}`);
  return at !== -1 && argv[at + 1] ? argv[at + 1] : fallback;
}

const port = Number(flag('port', 4321));
const host = flag('host', '127.0.0.1');
const root = resolve(flag('root', 'dist'));

/** Resolve a URL para um arquivo dentro de `root`, ou `null` se escapar dele. */
async function resolveFile(pathname) {
  // `decodeURIComponent` lança em escape malformado (`/%`, `/%zz`). Sem o
  // try/catch o rejeitado sobe por um handler async e derruba o processo
  // inteiro — a suíte perderia o servidor no meio da execução por causa de um
  // request torto.
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  // `normalize` depois do decode: sem isso, `%2e%2e/` sairia da raiz.
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const target = join(root, clean);
  if (target !== root && !target.startsWith(root + sep)) return null;

  for (const candidate of [target, join(target, 'index.html'), `${target}.html`]) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // segue para o próximo candidato
    }
  }
  return null;
}

/** O que vale comprimir. Imagem e fonte já vêm comprimidas na origem. */
const COMPRESSIBLE = /^(text\/|application\/(json|xml|javascript))/;

/**
 * Comprime o que um host real comprimiria.
 *
 * Sem isto o Lighthouse mede um site que ninguém vai receber: o HTML de ~83 KB
 * e o CSS de ~36 KB viajam crus, e o FCP simulado em 4G leva a culpa por uma
 * limitação deste servidor. Netlify, Vercel e Cloudflare servem brotli por
 * padrão — a medição honesta é com ele.
 */
function encoderFor(accept, type) {
  if (!COMPRESSIBLE.test(type)) return null;
  if (/\bbr\b/.test(accept)) {
    return {
      name: 'br',
      stream: createBrotliCompress({
        params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 },
      }),
    };
  }
  if (/\bgzip\b/.test(accept)) return { name: 'gzip', stream: createGzip({ level: 6 }) };
  return null;
}

async function send(res, status, file, accept = '') {
  const type = TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream';
  const encoder = encoderFor(accept, type);

  res.writeHead(status, {
    'content-type': type,
    // `no-cache` revalida sempre — a suíte reconstrói entre execuções e um 304
    // esconderia a mudança. Não é `no-store`: esse desabilita o back/forward
    // cache do Chrome, e o Lighthouse reprovaria o site por um defeito que
    // seria só deste servidor de teste.
    'cache-control': 'no-cache',
    ...(encoder ? { 'content-encoding': encoder.name, vary: 'accept-encoding' } : {}),
  });

  try {
    const source = createReadStream(file);
    await (encoder ? pipeline(source, encoder.stream, res) : pipeline(source, res));
  } catch {
    // Cliente desistiu no meio do download; nada a fazer além de não derrubar
    // o servidor com um erro não tratado.
    res.destroy();
  }
}

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url ?? '/', `http://${host}:${port}`).pathname;
  const accept = String(req.headers['accept-encoding'] ?? '');
  const file = await resolveFile(pathname);

  if (file) return send(res, 200, file, accept);

  const notFound = await resolveFile('/404');
  if (notFound) return send(res, 404, notFound, accept);

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('404');
});

server.on('error', (error) => {
  console.error(`[serve-dist] ${error.message}`);
  exit(1);
});

server.listen(port, host, () => {
  console.log(`[serve-dist] servindo ${root} em http://${host}:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => exit(0)));
}
