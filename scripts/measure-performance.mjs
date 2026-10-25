/** Local mobile Lighthouse, with the real static output and HTTP compression. */
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
const port = 4322;
const debugPort = 9224;
const directory = 'reports/lighthouse';
const chrome = spawn(
  chromium.executablePath(),
  [
    '--headless',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--remote-debugging-port=${debugPort}`,
    '--user-data-dir=/tmp/gabriel-lighthouse-profile',
  ],
  { stdio: 'ignore' },
);
const server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], {
  stdio: 'ignore',
});
async function waitFor(url) {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Could not start ${url}`);
}
try {
  await Promise.all([
    waitFor(`http://127.0.0.1:${debugPort}/json/version`),
    waitFor(`http://127.0.0.1:${port}`),
  ]);
  await mkdir(directory, { recursive: true });
  const runs = [];
  for (let index = 1; index <= 3; index++) {
    const result = await lighthouse(`http://127.0.0.1:${port}`, {
      port: debugPort,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    if (!result) throw new Error('Lighthouse returned no result');
    const { lhr, report } = result;
    const metrics = {
      run: index,
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100),
      lcpMs: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
      tbtMs: Math.round(lhr.audits['total-blocking-time'].numericValue),
    };
    runs.push(metrics);
    console.log(JSON.stringify(metrics));
    await Promise.all([
      writeFile(`${directory}/mobile-${index}.html`, report[0]),
      writeFile(`${directory}/mobile-${index}.json`, report[1]),
    ]);
  }
  const html = await readFile('dist/index.html', 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(
    (match) => !match[1].includes('application/ld+json'),
  );
  let initialJsGzip = scripts.reduce(
    (total, match) => total + (match[2].trim() ? gzipSync(match[2]).length : 0),
    0,
  );
  for (const match of scripts) {
    const src = /src="([^"]+)"/.exec(match[1])?.[1];
    if (src?.startsWith('/')) initialJsGzip += gzipSync(await readFile(join('dist', src))).length;
  }
  const summary = {
    timestamp: new Date().toISOString(),
    lighthouse: JSON.parse(await readFile('node_modules/lighthouse/package.json', 'utf8')).version,
    runs,
    initialJsGzip,
    note: 'Mobile default simulated throttling; localhost static server with Brotli/gzip. Three cold navigation audits on this machine, not field data or a production-host assessment.',
  };
  await writeFile(`${directory}/summary.json`, JSON.stringify(summary, null, 2) + '\n');
  console.log(`Initial application JavaScript: ${initialJsGzip} gzip bytes`);
  if (runs.some((run) => run.performance < 90 || run.cls > 0.1) || initialJsGzip > 20 * 1024)
    process.exitCode = 1;
} finally {
  chrome.kill('SIGTERM');
  server.kill('SIGTERM');
}
