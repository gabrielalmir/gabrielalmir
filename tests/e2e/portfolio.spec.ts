import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
const projects = [
  ['mcp-animaginexl', 'MCP AnimagineXL'],
  ['pimbas', 'Pimbas'],
  ['maybe', 'Maybe'],
  ['saturno', 'Saturno'],
  ['hush', 'Hush'],
  ['resulta', 'Resulta'],
] as const;
const pages = [
  { path: '/', title: 'Gabriel Almir' },
  ...projects.map(([slug, title]) => ({ path: `/projects/${slug}`, title })),
  { path: '/404', title: 'Página não encontrada' },
];
async function readyForScreenshot(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.images) img.loading = 'eager';
    await Promise.all(Array.from(document.images, (img) => img.decode()));
  });
}
for (const route of pages) {
  test(`estrutura, conteúdo e layout: ${route.path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route.path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveAccessibleName(route.title);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://gabrielalmir.com.br${route.path}`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S{10}/);
    const audit = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
        Number(h.tagName[1]),
      );
      const jumps = headings.filter(
        (level, index) => index > 0 && level > headings[index - 1]! + 1,
      );
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images]
          .filter(
            (img) =>
              !img.hasAttribute('width') ||
              !img.hasAttribute('height') ||
              !img.alt ||
              (img.complete && img.naturalWidth === 0),
          )
          .map((img) => img.src),
        jumps,
        ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });
    expect(audit.overflow).toBe(false);
    expect(audit.brokenImages).toEqual([]);
    expect(audit.jumps).toEqual([]);
    expect(new Set(audit.ids).size).toBe(audit.ids.length);
    expect(audit.scrollBehavior).toBe('auto');
    expect(errors).toEqual([]);
    await expect(page.locator('canvas, [data-preloader], [data-chapter]')).toHaveCount(0);
    if (route.path.startsWith('/projects/')) {
      for (const title of ['Forças e restrições', 'Decisões', 'Evidências', 'Limites conhecidos']) {
        await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
      }
      await expect(page.getByRole('heading', { name: 'Contexto', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Acessar o código' })).toHaveAttribute(
        'href',
        /github\.com\/gabrielalmir\//,
      );
    }
    if (/^(desktop|phone-360)(-dark)?$/.test(testInfo.project.name)) {
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        accessibility.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
    }
  });
}

test('home apresenta as seis investigações e os fatos públicos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Gabriel Almir');
  await expect(page.locator('.hero-heading')).toContainText('Backend e integrações');
  await expect(page.getByText('para sistemas de IA.', { exact: true })).toBeVisible();
  await expect(page.getByText('−90%', { exact: true })).toBeVisible();
  await expect(
    page
      .getByText('Contribuí na evolução e hoje participo da organização e revisão', {
        exact: false,
      })
      .first(),
  ).toBeVisible();
  for (const [slug] of projects)
    await expect(page.locator(`#sistemas a[href="/projects/${slug}"]`).first()).toBeVisible();
  for (const id of ['inicio', 'provas', 'ia', 'sistemas', 'trajetoria', 'processo', 'contato'])
    await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.locator('.approach, .process-section, .portrait-tag')).toHaveCount(0);
  for (const heading of [
    'Experiência profissional',
    'Desenvolvimento atual',
    'Arquitetura que sustenta integrações',
    'Sobre mim',
    'Vamos conversar?',
  ])
    await expect(page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
  await expect(page.locator('#processo + #contato')).toHaveCount(1);
  await expect(page.getByText('Na prática', { exact: true })).toHaveCount(3);
  await expect(page.getByText('Estou estudando', { exact: true })).toHaveCount(3);
  await expect(
    page.locator('a[href*="mcp-qwen3"], a[href="https://github.com/gabrielalmir/mcp-animaginexl"]'),
  ).toHaveCount(0);
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent())!,
  );
  expect(person.name).toBe('Gabriel Almir');
  expect(person.jobTitle).toBe('Analista de Sistemas Pleno');
  await expect(page.locator('a[href="mailto:gabr.almir@gmail.com"]').first()).toBeAttached();
  await expect(
    page.locator('a[href="https://linkedin.com/in/gabrielalmir"]').first(),
  ).toBeAttached();
});

test('âncoras, menu móvel, teclado e foco', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const isMobile = (page.viewportSize()?.width ?? 0) < 768;
  const hasJS = !testInfo.project.name.startsWith('no-javascript');
  if (isMobile) {
    const summary = page.locator('.mobile-menu summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
    if (hasJS) {
      await page.keyboard.press('Escape');
      await expect(summary).toBeFocused();
      await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
      await page.keyboard.press('Enter');
    }
    const mobileNav = page.getByRole('navigation', { name: 'Navegação móvel' });
    await mobileNav.getByRole('link', { name: 'IA aplicada', exact: true }).click();
    await expect(page).toHaveURL(/#ia$/);
    if (hasJS) {
      await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
      await expect(page.locator('#ia')).toBeFocused();
    } else {
      await summary.click();
    }
    const sizes = await summary.boundingBox();
    expect(sizes!.height).toBeGreaterThanOrEqual(44);
  } else {
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Trabalho', exact: true })
      .click();
    await expect(page).toHaveURL(/#sistemas$/);
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Explorar o projeto de IA', exact: true }).click();
  await expect(page).toHaveURL(/#sistemas$/);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 300);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
});

test('todos os destinos internos resolvem e as âncoras existem', async ({
  page,
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  const destinations = new Set<string>();
  for (const route of pages) {
    await page.goto(route.path);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((links) =>
        links
          .map((link) => (link as HTMLAnchorElement).href)
          .filter((href) => new URL(href).origin === location.origin),
      );
    hrefs.forEach((href) => destinations.add(href));
  }
  for (const destination of destinations) {
    const url = new URL(destination);
    expect((await request.get(url.pathname)).status(), destination).toBe(
      url.pathname === '/404' ? 404 : 200,
    );
    if (url.hash) {
      await page.goto(destination);
      expect(await page.locator(`[id="${url.hash.slice(1)}"]`).count(), destination).toBe(1);
    }
  }
  for (const variant of ['/404', '/404/', '/404.html', '/%34%30%34', '/404?origem=teste'])
    expect((await request.get(variant)).status(), variant).toBe(404);
  expect((await request.get('/nao-existe')).status()).toBe(404);
  await page.goto('/nao-existe');
  await expect(page.locator('h1')).toHaveText('Página não encontrada');
  expect((await request.get('/projects/mcp-qwen3-tts')).status()).toBe(404);
  const sitemap = await request.get('/sitemap-0.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain('mcp-qwen3-tts');
});

test('movimento reduzido desativa as transições', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('reduced-motion'));
  await page.goto('/');
  const result = await page.evaluate(() => ({
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    transition: getComputedStyle(document.querySelector('.arrow')!).transitionDuration,
  }));
  expect(result).toEqual({ reduced: true, transition: '0s' });
});

for (const route of pages) {
  test(`visual: ${route.path}`, async ({ page }, testInfo) => {
    test.skip(
      route.path !== '/' &&
        !/^(desktop|reduced-motion|no-javascript)(-dark)?$/.test(testInfo.project.name),
    );
    await page.goto(route.path);
    await readyForScreenshot(page);
    const name = route.path === '/' ? 'home' : route.path.split('/').pop()!;
    if (process.env.REVIEW_SCREENSHOTS) {
      await mkdir('/tmp/gabriel-visual-review', { recursive: true });
      await page.screenshot({
        path: `/tmp/gabriel-visual-review/${name}-${testInfo.project.name}-first.png`,
        animations: 'disabled',
      });
      await page.screenshot({
        path: `/tmp/gabriel-visual-review/${name}-${testInfo.project.name}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    } else {
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixelRatio: 0.005,
      });
    }
  });
}
