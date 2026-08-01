import { test, expect } from '@playwright/test';

for (const path of ['/', '/en/']) {
  test(`${path} communicates the essentials and stays usable`, async ({ page }, testInfo) => {
    await page.route(/github|microlink/i, route => route.abort());
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('90%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText(/PhotoGIMP/i).first()).toBeVisible();
    await expect(page.getByText(/rigor|regulated/i).first()).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page).toHaveScreenshot(`${path === '/' ? 'home-pt' : 'home-en'}-${testInfo.project.name}.png`, { fullPage: true, animations: 'disabled' });
  });
}

test('language links resolve equivalent content', async ({ page }) => {
  await page.goto('/blog/performance-90');
  await page.getByRole('link', { name: /EN/ }).last().click();
  await expect(page).toHaveURL(/\/en\/blog\/performance-90/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('touch targets and heading structure are sound', async ({ page }) => {
  await page.goto('/');
  const links = await page.locator('a').all();
  for (const link of links.slice(0, 12)) {
    const box = await link.boundingBox();
    if (box) expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(40);
  }
  await expect(page.locator('h1')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
});

test('homepage sections build with scroll without hiding content', async ({ page }, testInfo) => {
  test.skip(['no-javascript','reduced-motion'].includes(testInfo.project.name), 'Scroll controller is disabled in the final-state accessibility modes');
  await page.goto('/');
  const home = page.locator('.home-story');
  await expect(home.locator('[data-build-section]')).toHaveCount(9);
  const process = page.locator('#processo');
  const initial = Number(await process.getAttribute('data-build-progress'));
  await process.scrollIntoViewIfNeeded(); await page.waitForTimeout(50);
  const intermediate = Number(await process.getAttribute('data-build-progress'));
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(50);
  const final = Number(await process.getAttribute('data-build-progress'));
  expect(intermediate).toBeGreaterThan(initial); expect(final).toBeGreaterThanOrEqual(intermediate);
  await expect(page.locator('#processo h2')).toBeVisible();
  await expect(page).toHaveScreenshot(`build-final-${testInfo.project.name}.png`, { fullPage: false, animations: 'disabled' });
});

test('trajectory is bilingual, documentary, and free of the old decoration', async ({ page }) => {
  await page.goto('/');
  const trajectory = page.locator('#trajetoria');
  await expect(trajectory.getByText('Diolinux')).toBeVisible();
  await expect(trajectory.getByText('Laboratório Cristália')).toBeVisible();
  await expect(trajectory.getByText(/2022—2025 · concluído/)).toBeVisible();
  await trajectory.locator('.trajectory-more summary').click();
  await expect(trajectory.getByText(/problemas algorítmicos sob limite de tempo/i)).toBeVisible();
  await expect(trajectory.getByText('@momentoalmir')).toBeVisible();
  await expect(page.locator('.architecture-layer,.chapter-mark,.coffee-ring,.checkpoint')).toHaveCount(0);
  await page.goto('/en/');
  await page.locator('#trajectory .trajectory-more summary').click();
  await expect(page.locator('#trajectory').getByText(/São Paulo’s public state college system/)).toBeVisible();
  await expect(page.locator('#trajectory').getByText(/Brazilian Computer Society/)).toBeVisible();
});

test('homepage has no horizontal overflow or external image requests', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (request.resourceType() === 'image' && !request.url().startsWith('http://127.0.0.1:4321')) external.push(request.url()); });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1); expect(external).toEqual([]);
});

test('hero has three accessible parallax depths', async ({ page }, testInfo) => {
  await page.goto('/');
  const hero = page.locator('[data-parallax-hero]');
  await expect(hero.locator('[data-parallax-layer][data-speed="0.3"]')).toHaveCount(1);
  await expect(hero.locator('[data-parallax-layer][data-speed="0.6"]')).toHaveCount(1);
  await expect(hero.locator('[data-depth="foreground"][data-speed="1.0"]')).toHaveCount(2);
  if (testInfo.project.name === 'reduced-motion') {
    await expect(hero.locator('[data-parallax-layer]').first()).toHaveCSS('transform', 'none');
  }
});

test('personal signals reveal accessible microcopy', async ({ page }) => {
  await page.goto('/');
  const coffee = page.locator('.signal-coffee');
  await coffee.locator('summary').click();
  await expect(coffee).toHaveAttribute('open', '');
  await expect(coffee.getByText('Uma ideia quase sempre começa com café.')).toBeVisible();
});

for (const [localePath, systemPath] of [['/', '/projects/'], ['/en/', '/en/projects/']] as const) {
  test(`${localePath} presents three dossiers and four technical labs`, async ({ page }) => {
    await page.goto(localePath);
    const atlas = page.locator('.systems-atlas');
    await expect(atlas.locator('.system-plate')).toHaveCount(3);
    await expect(atlas.locator('.lab-card')).toHaveCount(4);
    for (const slug of ['pimbas', 'maybe', 'saturno', 'mcp-animaginexl', 'mcp-qwen3-tts', 'hush', 'resulta']) {
      await expect(atlas.locator(`a[href="${systemPath}${slug}"]`)).toHaveCount(1);
    }
  });
}

test('system dossiers expose evidence, limits, and readable architecture maps in both languages', async ({ page }) => {
  for (const path of ['/projects/pimbas', '/en/projects/pimbas']) {
    await page.goto(path);
    await expect(page.locator('.system-map li')).toHaveCount(4);
    await expect(page.locator('.quality-matrix [role="row"]')).toHaveCount(3);
    await expect(page.locator('.evidence-limits article')).toHaveCount(2);
    await expect(page.locator('h1')).toHaveText('Pimbas');
  }
});

test('Ko-fi support is a plain safe external link and loads no Ko-fi resources', async ({ page }) => {
  const kofiRequests: string[] = [];
  page.on('request', request => { if (/ko-fi\.com/i.test(request.url())) kofiRequests.push(request.url()); });
  await page.goto('/');
  const support = page.locator('.open-source-support a');
  await expect(support).toHaveAttribute('href', 'https://ko-fi.com/gabrielalmir');
  await expect(support).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(support).toHaveAttribute('aria-label', /serviço externo/i);
  await expect(page.locator('script[src*="ko-fi"],iframe[src*="ko-fi"],img[src*="ko-fi"]')).toHaveCount(0);
  expect(kofiRequests).toEqual([]);
});
