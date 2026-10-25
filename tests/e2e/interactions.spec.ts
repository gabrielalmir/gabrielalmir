import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name.startsWith('no-javascript'));
});

test('explorador mantém espaço e foco ao selecionar cada etapa por teclado', async ({ page }) => {
  await page.goto('/');
  const explorer = page.locator('[data-architecture]');
  await expect(explorer.locator('[data-panel="agent"]')).toBeVisible();
  const original = await explorer.boundingBox();
  for (const [stage, label] of [
    ['tools', 'Ferramentas MCP'],
    ['pipeline', 'Pipeline local'],
    ['files', 'Arquivos de saída'],
    ['agent', 'Agente'],
  ]) {
    const button = explorer.getByRole('button', { name: label!, exact: false });
    await button.focus();
    await page.keyboard.press('Space');
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(explorer.locator(`[data-panel="${stage}"]`)).toBeVisible();
    await expect(explorer.locator('[data-panel]:visible')).toHaveCount(1);
    await expect(explorer.locator(`[data-panel="${stage}"] a`)).toHaveAttribute(
      'href',
      /7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/,
    );
    expect((await explorer.boundingBox())!.height).toBeCloseTo(original!.height, 0);
  }
});

test('Pimbas alterna a camada web e mantém a posição do domínio', async ({ page }) => {
  for (const route of ['/', '/projects/pimbas']) {
    await page.goto(route);
    const figure = page.locator('[data-migration]');
    const domain = figure.locator('.migration-domain');
    await figure.scrollIntoViewIfNeeded();
    const before = await domain.boundingBox();
    const button = figure.getByRole('button', { name: 'Antes · Fastify' });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(figure.locator('[data-runtime="before"]')).toBeVisible();
    await expect(figure.locator('[data-runtime="after"]')).toBeHidden();
    expect((await domain.boundingBox())!.y).toBeCloseTo(before!.y, 0);
    await figure.getByRole('button', { name: 'Atual · Next.js' }).click();
    await expect(figure.locator('[data-runtime="after"]')).toBeVisible();
    expect((await domain.boundingBox())!.y).toBeCloseTo(before!.y, 0);
  }
});

test('formulário atualiza JSON, diferencia recomendações e recupera erros', async ({ page }) => {
  await page.goto('/projects/mcp-animaginexl#experimentar');
  const builder = page.locator('#experimentar');
  const output = builder.locator('[data-arguments-json]');
  const payload = async () => JSON.parse((await output.textContent())!);
  await expect(builder.locator('[data-builder-status]')).toContainText('Estrutura válida');
  await builder.getByLabel('Prompt', { exact: true }).fill('1boy, solo');
  await builder.getByLabel('Largura', { exact: true }).fill('1024');
  await builder.getByLabel('Altura', { exact: true }).fill('1024');
  await builder.getByLabel('Steps', { exact: true }).fill('32');
  await builder.getByLabel('Guidance', { exact: true }).fill('6.5');
  await builder.getByLabel('Seed (opcional)', { exact: true }).fill('');
  expect(await payload()).toEqual({
    prompt: '1boy, solo',
    width: 1024,
    height: 1024,
    steps: 32,
    guidance_scale: 6.5,
  });
  await expect(builder.locator('[data-checklist]')).toContainText('Recomendação');
  await expect(builder.getByRole('button', { name: 'Copiar JSON' })).toBeEnabled();
  for (const [label, invalid, valid] of [
    ['Prompt', '', '<script>alert(1)</script>, solo'],
    ['Largura', '0', '832'],
    ['Altura', '-3', '1216'],
    ['Steps', '1.5', '28'],
    ['Guidance', '-1', '0'],
    ['Seed (opcional)', '9007199254740992', '42'],
  ]) {
    const input = builder.getByLabel(label!, { exact: true });
    await input.fill(invalid!);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(builder.getByRole('button', { name: 'Baixar JSON' })).toBeDisabled();
    await expect(output).toContainText('Corrija os erros');
    await input.fill(valid!);
    await expect(input).toHaveAttribute('aria-invalid', 'false');
    await expect(builder.getByRole('button', { name: 'Baixar JSON' })).toBeEnabled();
  }
  expect((await payload()).guidance_scale).toBe(0);
  expect((await payload()).prompt).toContain('<script>');
  await expect(builder.locator('script:not([type])')).toHaveCount(0);
  await builder.getByLabel('Largura', { exact: true }).fill('2048');
  await builder.getByLabel('Altura', { exact: true }).fill('2048');
  await expect(builder.locator('[data-checklist]')).toContainText('pode exceder a memória');
  await builder.getByRole('button', { name: 'Carregar exemplo documentado' }).click();
  expect(await payload()).toMatchObject({
    width: 832,
    height: 1216,
    steps: 28,
    guidance_scale: 5,
    seed: 42,
  });
  await expect(builder.locator('[data-checklist] [data-recommendation]')).toHaveCount(0);
});

test('cópia e download exportam os valores atuais, com recuperação após falhas', async ({
  page,
}) => {
  await page.addInitScript(() => {
    let failCopy = true;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          if (failCopy) {
            failCopy = false;
            throw new Error('Denied');
          }
          (window as unknown as { copied: string }).copied = value;
        },
      },
    });
    const original = URL.createObjectURL.bind(URL);
    let failDownload = true;
    URL.createObjectURL = (blob: Blob | MediaSource) => {
      if (failDownload) {
        failDownload = false;
        throw new Error('Unavailable');
      }
      return original(blob);
    };
  });
  const unexpected: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') unexpected.push(request.url());
  });
  await page.goto('/projects/mcp-animaginexl#experimentar');
  const builder = page.locator('#experimentar');
  const copy = builder.getByRole('button', { name: 'Copiar JSON' });
  const download = builder.getByRole('button', { name: 'Baixar JSON' });
  const feedback = builder.locator('[data-export-status]');
  await copy.click();
  await expect(feedback).toContainText('Não foi possível copiar');
  await builder.getByLabel('Seed (opcional)', { exact: true }).fill('99');
  await copy.click();
  await expect(feedback).toHaveText('JSON copiado.');
  const copied = await page.evaluate(() => (window as unknown as { copied: string }).copied);
  expect(JSON.parse(copied).seed).toBe(99);
  await download.click();
  await expect(feedback).toContainText('Não foi possível baixar');
  const downloaded = page.waitForEvent('download');
  await download.click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toBe('generate-image-arguments.json');
  expect(JSON.parse(await readFile((await file.path())!, 'utf8'))).toEqual(JSON.parse(copied));
  expect(unexpected).toEqual([]);
});

test('contraste e semântica nos estados selecionado e inválido', async ({ page }, testInfo) => {
  test.skip(!/^(desktop|phone-360)(-dark)?$/.test(testInfo.project.name));
  await page.goto('/');
  await page.getByRole('button', { name: /Arquivos de saída/ }).click();
  await page.getByRole('button', { name: 'Antes · Fastify' }).click();
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((animation) => animation.finished)),
  );
  let audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.goto('/projects/mcp-animaginexl#experimentar');
  await page.getByLabel('Prompt', { exact: true }).fill('');
  await page.getByLabel('Largura', { exact: true }).fill('0');
  audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test('reduced motion atualiza interações sem animações', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('reduced-motion'));
  await page.goto('/');
  await page.getByRole('button', { name: /Pipeline local/ }).click();
  await page.getByRole('button', { name: 'Antes · Fastify' }).click();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator('[data-panel="pipeline"]')).toBeVisible();
  await expect(page.locator('[data-runtime="before"]')).toBeVisible();
});

test('abertura protagonista leva ao MCP e ferramenta só carrega no estudo MCP', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.setViewportSize({ width: 1440, height: 900 });
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#hero-title')).toBeInViewport();
  await expect(page.locator('.portrait-frame')).toBeInViewport();
  const portrait = await page.locator('.portrait-frame').boundingBox();
  expect(portrait!.width).toBeGreaterThanOrEqual(400);
  expect(portrait!.width).toBeLessThanOrEqual(440);
  expect(portrait!.x + portrait!.width / 2).toBeCloseTo(720, 0);
  const heading = await page.locator('#mcp-title').boundingBox();
  expect(heading!.y).toBeGreaterThanOrEqual(900);
  await page.getByRole('link', { name: 'Explorar o projeto de IA', exact: true }).click();
  await expect(page).toHaveURL(/#sistemas$/);
  await expect(page.locator('#mcp-title')).toBeInViewport();
  expect(requests.some((url) => url.includes('ArgumentBuilder'))).toBe(false);
  await page.goto('/projects/maybe');
  expect(requests.some((url) => url.includes('ArgumentBuilder'))).toBe(false);
  await page.goto('/projects/mcp-animaginexl');
  expect(requests.some((url) => url.includes('ArgumentBuilder'))).toBe(true);
});

test('controles respondem ao toque em 390 × 844', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:4325/');
    await page.getByRole('button', { name: /Ferramentas MCP/ }).tap();
    await expect(page.locator('[data-panel="tools"]')).toBeVisible();
    await page.getByRole('button', { name: 'Antes · Fastify' }).tap();
    await expect(page.locator('[data-runtime="before"]')).toBeVisible();
    await page.goto('http://127.0.0.1:4325/projects/mcp-animaginexl#experimentar');
    await page.getByLabel('Steps', { exact: true }).fill('35');
    await page.getByRole('button', { name: 'Carregar exemplo documentado' }).tap();
    await expect(page.getByLabel('Steps', { exact: true })).toHaveValue('28');
  } finally {
    await context.close();
  }
});

test('copia usando a área de transferência do navegador', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/projects/mcp-animaginexl#experimentar');
  await page.getByRole('button', { name: 'Copiar JSON' }).click();
  await expect(page.locator('[data-export-status]')).toHaveText('JSON copiado.');
  const content = await page.evaluate(() => navigator.clipboard.readText());
  expect(JSON.parse(content)).toMatchObject({ width: 832, height: 1216, seed: 42 });
});
