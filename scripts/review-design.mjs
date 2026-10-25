/** Browser inspection at the requested design review sizes, in both themes. */
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const phase = process.argv[2] || 'after';
if (!/^[a-z-]+$/.test(phase)) throw new Error('Use a simple phase name');
const directory = `reports/design-review/${phase}`;
const sectionsOnly = process.argv.includes('--sections');
const interactionsOnly = process.argv.includes('--interactions-only');
const isolatedStyle = '.site-header, .skip-link { visibility: hidden !important; }';
const routes = [
  '/',
  '/projects/mcp-animaginexl',
  '/projects/pimbas',
  '/projects/maybe',
  '/projects/saturno',
  '/projects/hush',
  '/projects/resulta',
  '/404',
];
const sizes = [
  ['desktop', 1440, 900],
  ['tablet', 768, 1024],
  ['mobile', 390, 844],
];
const server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', '4323'], {
  stdio: 'ignore',
});
let browser;
try {
  for (let attempt = 0; ; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4323')).ok) break;
    } catch {}
    if (attempt === 100) throw new Error('Review server did not start');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  browser = await chromium.launch();
  await mkdir(directory, { recursive: true });
  const results = [];
  for (const [size, width, height] of sizes) {
    for (const colorScheme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height }, colorScheme });
      const page = await context.newPage();
      for (const route of interactionsOnly
        ? ['/', '/projects/mcp-animaginexl']
        : sectionsOnly
          ? ['/']
          : routes) {
        const errors = [];
        const onError = (error) => errors.push(error.message);
        page.on('pageerror', onError);
        await page.goto(`http://127.0.0.1:4323${route}`);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(Array.from(document.images, (img) => img.decode()));
        });
        const name = `${route === '/' ? 'home' : route.split('/').pop()}-${size}-${colorScheme}`;
        await page.screenshot({ path: `${directory}/${name}-first.png`, animations: 'disabled' });
        await page.screenshot({
          path: `${directory}/${name}.png`,
          fullPage: true,
          animations: 'disabled',
        });
        if (route === '/') {
          for (const [id, name] of [
            ['provas', 'experience'],
            ['sistemas', 'projects'],
            ['ia', 'ai'],
            ['trajetoria', 'about'],
            ['contato', 'contact'],
          ]) {
            await page.locator(`#${id}`).screenshot({
              path: `${directory}/${name}-${size}-${colorScheme}.png`,
              animations: 'disabled',
              style: '.site-header, .skip-link { visibility: hidden !important; }',
            });
          }
        }
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        results.push({
          route,
          width,
          height,
          colorScheme,
          overflow,
          errors,
          violations: axe.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        });
        if (route === '/' && (await page.locator('[data-architecture]').count())) {
          for (const stage of ['tools', 'pipeline', 'files']) {
            await page.locator(`[data-stage="${stage}"]`).click();
            await page.evaluate(() =>
              Promise.all(document.getAnimations().map((animation) => animation.finished)),
            );
            await page.locator('[data-architecture]').screenshot({
              path: `${directory}/architecture-${stage}-${size}-${colorScheme}.png`,
              style: isolatedStyle,
            });
          }
          await page.getByRole('button', { name: 'Antes · Fastify' }).click();
          await page.evaluate(() =>
            Promise.all(document.getAnimations().map((animation) => animation.finished)),
          );
          await page.locator('[data-migration]').screenshot({
            style: isolatedStyle,
            path: `${directory}/pimbas-before-${size}-${colorScheme}.png`,
          });
        }
        if (
          route === '/projects/mcp-animaginexl' &&
          (await page.locator('[data-argument-builder]').count())
        ) {
          await page.locator('#experimentar').screenshot({
            style: isolatedStyle,
            path: `${directory}/builder-valid-${size}-${colorScheme}.png`,
          });
          await page.getByLabel('Prompt', { exact: true }).fill('');
          await page.getByLabel('Largura', { exact: true }).fill('0');
          await page.locator('#experimentar').screenshot({
            style: isolatedStyle,
            path: `${directory}/builder-invalid-${size}-${colorScheme}.png`,
          });
          const invalidAudit = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();
          results.push({
            route: `${route}#experimentar-invalid`,
            width,
            height,
            colorScheme,
            overflow: await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            ),
            errors: [...errors],
            violations: invalidAudit.violations.map((v) => ({
              id: v.id,
              targets: v.nodes.map((n) => n.target),
            })),
          });
        }
        page.off('pageerror', onError);
      }
      await context.close();
    }
    console.log(`${phase}: ${width} × ${height}, light + dark inspected`);
  }
  await writeFile(
    `${directory}/audit${interactionsOnly ? '-interactions' : sectionsOnly ? '-sections' : ''}.json`,
    JSON.stringify(results, null, 2) + '\n',
  );
  const failures = results.filter((r) => r.overflow || r.errors.length || r.violations.length);
  console.log(
    `${results.length} page/size/theme combinations; ${failures.length} failed audits. Screenshots: ${directory}`,
  );
  if (failures.length) {
    console.log(JSON.stringify(failures));
    process.exitCode = 1;
  }
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
