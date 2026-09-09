/**
 * Gate de release do portfólio.
 *
 * O que este arquivo protege, em ordem de importância: os claims (o site não
 * pode afirmar mais do que o Profile.pdf sustenta), o conteúdo sobreviver sem
 * JS e sem movimento, a hierarquia de leitura e a ausência de vazamento
 * horizontal em todo viewport. O resto é acabamento.
 *
 * Sobre os baselines de screenshot: as capturas são `-linux` e o rasterizador
 * muda entre distros, então as imagens pertencem ao container de CI, não a esta
 * máquina. Na primeira execução local elas são *criadas*, não comparadas — um
 * verde de primeira rodada não prova nada.
 */
import { expect, test, type Page } from '@playwright/test';
import { reducedMotionInitScript } from '../../playwright.config';

const DOSSIER_SLUGS = [
  'pimbas',
  'saturno',
  'maybe',
  'hush',
  'resulta',
  'mcp-animaginexl',
  'mcp-qwen3-tts',
] as const;

const SYSTEM_NAMES = [
  'Pimbas',
  'Saturno',
  'Maybe',
  'Hush',
  'Resulta',
  'MCP AnimagineXL',
  'MCP Qwen3-TTS',
] as const;

/** A home mais os 7 dossiês: tudo que publica texto sobre o trabalho. */
const TEXT_PAGES = ['/', ...DOSSIER_SLUGS.map((slug) => `/projects/${slug}`)] as const;

/** As páginas acima mais a 404 — estrutura vale para tudo que o site serve. */
const STRUCTURE_PAGES = [...TEXT_PAGES, '/404'] as const;

const EMAIL = 'gabr.almir@gmail.com';
const LINKEDIN = 'https://linkedin.com/in/gabrielalmir';
const GITHUB = 'https://github.com/gabrielalmir';

/**
 * U+2212 MINUS SIGN, escrito por escape de propósito: um hífen comum é
 * indistinguível a olho nu no editor, e trocá-lo aqui faria a asserção passar
 * a aceitar exatamente o erro que ela existe para pegar.
 */
const MINUS_90 = '\u2212' + '90%';

/**
 * Formulações proibidas em qualquer capitalização. Vêm do registro de claims
 * (`scripts/check-claims.mjs`), repetidas aqui porque o gate estático lê o
 * `dist/` e este lê a página renderizada — um pega o que o outro não vê.
 */
const FORBIDDEN_CLAIMS = [
  'criador do photogimp',
  'mantenedor principal',
  'principal mantenedor',
  'creator of',
  'sole maintainer',
] as const;

/** Estrutura e claims não mudam com a largura: basta um projeto com JS e um sem. */
const STRUCTURE_PROJECTS = ['desktop', 'no-javascript'];

/** Onde os dossiês são fotografados: um de cada regime de renderização. */
const SHOT_PROJECTS = ['desktop', 'reduced-motion', 'no-javascript'];

/**
 * CSS aplicado só durante a captura.
 *
 * Vai como opção `style` da própria asserção, e não por `page.addStyleTag`:
 * com `javaScriptEnabled: false` o addStyleTag fica pendurado esperando o
 * evento `load` da tag que ele injeta, e o teste morre por timeout. A opção
 * `style` é aplicada pelo próprio Playwright na hora de fotografar, funciona
 * nos dois regimes, e não deixa a página mutada para o resto do teste.
 *
 * O que some: as camadas que leem a rolagem (o retrato com parallax, o canvas,
 * o ano de fundo em sticky) e o grão, que é `position: fixed` e acompanharia a
 * costura da imagem manchando cada emenda.
 */
const SHOT_STYLE = `
  [data-hero-portrait],
  [data-stage],
  [data-chapter-nav],
  [data-chapter-marker],
  [data-trajectory-year],
  .u-noise { visibility: hidden !important; }
  [data-reveal] { opacity: 1 !important; }
`;

/** Onde o motor de capítulos entra: desktop com ponteiro fino, ≥1024px. */
const CHAPTER_PROJECTS = ['desktop', 'wide'];

/** Os sete capítulos da home, na ordem do documento (src/lib/content.ts). */
const CHAPTER_IDS = ['inicio', 'provas', 'sistemas', 'trajetoria', 'ia', 'processo', 'contato'];

type MotionDebug = {
  engine: {
    active: boolean;
    state(): { chapter: number; step: number; progress: number; global: number };
    stops(): { chapter: number; step: number; y: number }[];
  } | null;
};

/** O estado do motor, exposto por src/motion/index.ts em `window.__motion`. */
async function chapterState(page: Page) {
  return page.evaluate(() => {
    const motion = (window as Window & { __motion?: MotionDebug }).__motion;
    const engine = motion?.engine ?? null;
    return {
      active: engine?.active ?? false,
      state: engine?.state() ?? null,
      y: Math.round(window.scrollY),
      current: document.querySelector('[data-chapter-dot][aria-current="true"]')?.getAttribute('data-chapter-dot'),
    };
  });
}

const SHOT = {
  fullPage: true,
  animations: 'disabled',
  style: SHOT_STYLE,
  // A rasterização de texto varia por fração de pixel entre execuções; um teto
  // baixo ainda pega qualquer mudança real de layout.
  maxDiffPixelRatio: 0.005,
  // Costurar uma página longa demora mais que o teto padrão de asserção.
  timeout: 20_000,
} as const;

/**
 * Texto que um leitor realmente vê. O achatamento do espaço em branco é o que
 * faz uma frase quebrada em três linhas casar com a frase proibida.
 */
async function visibleText(page: Page): Promise<string> {
  const text = await page.evaluate(() => `${document.title}\n${document.body.innerText}`);
  return text.replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Deixa a página no estado estático antes de fotografar.
 *
 * A armadilha desta suíte: uma captura de página inteira rola o documento, e
 * rolar é justamente o que alimenta o scrub — a imagem sai diferente a cada
 * rodada. Por isso a página é carregada com `?motion=0` e, mesmo assim, o que
 * sobrou de movimento é desarmado aqui.
 */
async function prepareForScreenshot(page: Page): Promise<void> {
  // Medir com a fonte de fallback deslocaria cada linha por alguns pixels.
  await page.evaluate(async () => {
    await document.fonts?.ready;
  });

  // Sem a classe, o CSS devolve tudo ao lugar: é o layout que o site já entrega
  // para quem não tem JS.
  await page.evaluate(() => document.documentElement.classList.remove('motion-ready'));

  // Rede de segurança para o que for fixo e decorativo — grão, cortina do
  // preloader, qualquer camada que siga o ponteiro. Elemento fixo acompanha a
  // rolagem da captura e mancha a costura da imagem. O que é conhecido já está
  // no `SHOT_STYLE`; esta varredura pega o que aparecer depois.
  await page.evaluate(() => {
    for (const element of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const style = getComputedStyle(element);
      const decorative =
        element.getAttribute('aria-hidden') === 'true' || style.pointerEvents === 'none';
      if (style.position === 'fixed' && decorative) element.style.visibility = 'hidden';
    }
  });

  // Toda imagem do site abaixo da dobra é `loading="lazy"`, e uma captura de
  // página inteira costura faixas: a que ainda não decodificou entra cinza, e
  // entra ou não conforme o disco do dia. Forçar `eager` e esperar o decode é o
  // que torna o baseline comparável — foi assim que a imagem do terceiro painel
  // saiu vazia na primeira geração.
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    for (const image of images) image.loading = 'eager';
    await Promise.all(
      images.map((image) =>
        image.complete ? image.decode().catch(() => undefined) : new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        }),
      ),
    );
  });
}

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.project.name === 'reduced-motion') {
    await page.addInitScript(reducedMotionInitScript);
  }
});

// ---------------------------------------------------------------------------
// Conteúdo da home — roda em todo viewport, porque "sumiu no mobile" é a forma
// mais comum de o conteúdo desaparecer.
// ---------------------------------------------------------------------------

test('a home entrega manchete, provas, sistemas, trajetória e contato', async ({ page }) => {
  await page.goto('/');

  const headline = page.locator('h1');
  await expect(headline, 'a home tem um único h1').toHaveCount(1);
  await expect(headline).toBeVisible();
  await expect(headline).toContainText('caminhos confiáveis');

  const proofs = page.locator('[data-proofs]');
  await expect(page.locator('[data-proof-item]')).toHaveCount(3);
  await page.locator('[data-proof-item]').first().scrollIntoViewIfNeeded();
  // O contador sobe de 0 a 90: a asserção espera o valor final, nunca um quadro
  // do meio do caminho.
  await expect(proofs, 'o único número publicável do site').toContainText(MINUS_90, {
    timeout: 10_000,
  });
  await expect(proofs).toContainText('RIGOR');
  await expect(proofs).toContainText('COMUNIDADE');

  const systems = page.locator('[data-systems]');
  for (const name of SYSTEM_NAMES) {
    await expect(systems, `o sistema ${name} sumiu da home`).toContainText(name);
  }
  for (const slug of DOSSIER_SLUGS) {
    expect(
      await page.locator(`a[href^="/projects/${slug}"]`).count(),
      `nenhum link leva ao dossiê ${slug}`,
    ).toBeGreaterThan(0);
  }

  const trajectory = page.locator('[data-trajectory]');
  for (const org of ['Diolinux', 'CTC', 'Laboratório Cristália']) {
    await expect(trajectory, `a trajetória perdeu ${org}`).toContainText(org);
  }

  for (const href of [`mailto:${EMAIL}`, LINKEDIN, GITHUB]) {
    const count = await page.locator(`a[href="${href}"]`).count();
    expect(count, `falta link para ${href}`).toBeGreaterThan(0);
    // Existir não basta: pelo menos uma ocorrência precisa estar à vista.
    await expect(page.locator('footer').locator(`a[href="${href}"]`)).toBeVisible();
  }
  await expect(page.locator('[data-contact]')).toContainText(EMAIL);
});

// ---------------------------------------------------------------------------
// Claims — o teste mais importante do arquivo.
// ---------------------------------------------------------------------------

for (const path of TEXT_PAGES) {
  test(`${path} respeita o registro de claims`, async ({ page }, testInfo) => {
    test.skip(
      !STRUCTURE_PROJECTS.includes(testInfo.project.name),
      'a copy é a mesma em toda largura; um projeto com JS e um sem bastam',
    );
    await page.goto(path);
    const text = await visibleText(page);

    for (const claim of FORBIDDEN_CLAIMS) {
      expect(text, `"${claim}" é uma atribuição que o site não pode fazer`).not.toContain(claim);
    }

    if (path === '/') {
      expect(
        text,
        'a formulação conservadora do PhotoGIMP é o que autoriza a seção inteira',
      ).toContain('participo da organização e revisão');
    }
  });
}

// ---------------------------------------------------------------------------
// Estrutura — hierarquia de leitura e imagens descritas.
// ---------------------------------------------------------------------------

for (const path of STRUCTURE_PAGES) {
  test(`${path} tem headings em ordem e imagens com alt`, async ({ page }, testInfo) => {
    test.skip(
      !STRUCTURE_PROJECTS.includes(testInfo.project.name),
      'a marcação é a mesma em toda largura',
    );
    await page.goto(path);

    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1,h2,h3,h4')).map((heading) =>
        Number(heading.tagName.slice(1)),
      ),
    );

    expect(levels.length, 'nenhum heading na página').toBeGreaterThan(0);
    expect(levels[0], 'a página abre em h1').toBe(1);
    for (let index = 1; index < levels.length; index += 1) {
      // Descer é livre; subir é de um em um. Um h3 sem h2 acima deixa quem
      // navega por headings sem o degrau do meio.
      expect(
        levels[index] - levels[index - 1],
        `salto de h${levels[index - 1]} para h${levels[index]} em ${path}`,
      ).toBeLessThanOrEqual(1);
    }

    // Imagem decorativa é SVG inline com aria-hidden; se virou <img>, precisa
    // de alt — e um alt vazio aqui é omissão, não decisão.
    const withoutAlt = await page.evaluate(() =>
      Array.from(document.images)
        .filter((image) => !image.getAttribute('alt')?.trim())
        .map((image) => image.currentSrc || image.src),
    );
    expect(withoutAlt, 'imagem sem alt').toEqual([]);
  });
}

// ---------------------------------------------------------------------------
// Layout — o vazamento horizontal é a regressão que só aparece no celular de
// outra pessoa, então roda em todos os viewports.
// ---------------------------------------------------------------------------

for (const path of ['/', '/projects/pimbas']) {
  test(`${path} não vaza na horizontal`, async ({ page }) => {
    await page.goto(path);

    const overflowAtTop = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflowAtTop, 'algo empurra o documento já no topo').toBeLessThanOrEqual(1);

    // Os trilhos horizontais só andam com a rolagem: medir só no topo deixaria
    // passar um painel que escapa do wrapper no meio do caminho.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(700);
    const overflowAtBottom = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflowAtBottom, 'um trilho escapou do wrapper durante a rolagem').toBeLessThanOrEqual(
      1,
    );
  });
}

// ---------------------------------------------------------------------------
// Os dois regimes degradados.
// ---------------------------------------------------------------------------

test('com reduced-motion a home é estática e legível sem rolar', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'reduced-motion', 'exercita a emulação deste projeto');
  await page.goto('/');

  await expect(page.locator('html'), 'o gate liberou movimento a quem pediu menos').not.toHaveClass(
    /motion-ready/,
  );
  // O pin do ScrollTrigger deixa esta assinatura no DOM; sem ela, nada foi
  // pregado na tela.
  await expect(page.locator('.pin-spacer')).toHaveCount(0);

  const pinned = await page.evaluate(
    () =>
      Array.from(
        document.querySelectorAll('[data-systems-track], [data-trajectory-track], [data-hero]'),
      ).filter((element) => getComputedStyle(element).position === 'fixed').length,
  );
  expect(pinned, 'uma seção ficou presa na tela').toBe(0);

  // O modo capítulos nunca entra sem movimento: os passos ficam empilhados e
  // inteiros, e nenhum palco fica pregado no topo.
  await expect(page.locator('html')).not.toHaveClass(/chapters/);
  const stuck = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-chapter-stage]')).filter(
      (stage) => getComputedStyle(stage).position === 'sticky',
    ).length,
  );
  expect(stuck, 'um palco de capítulo ficou sticky sem movimento').toBe(0);
  const hiddenSteps = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-step]')).filter(
      (step) => Number(getComputedStyle(step).opacity) < 1,
    ).length,
  );
  expect(hiddenSteps, 'um passo ficou apagado sem ninguém para revelá-lo').toBe(0);

  await expect(page.locator('h1'), 'a manchete exige rolagem para ser lida').toBeInViewport();
});

test('sem JS a home continua completa e navegável', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'no-javascript', 'exercita a emulação deste projeto');
  await page.goto('/');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/motion-ready/);
  await expect(page.locator('[data-proof-item]')).toHaveCount(3);

  const text = await visibleText(page);
  for (const name of SYSTEM_NAMES) {
    expect(text, `o sistema ${name} depende de JS para aparecer`).toContain(name.toLowerCase());
  }

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText('Gabriel');

  // A cena nunca é montada, e o palco nem existe nesta largura: a chapa de
  // tinta de cada seção vem do CSS, sem um pixel de JS.
  await expect(page.locator('[data-stage-canvas]')).toHaveCount(1);
  await expect(page.locator('[data-stage-canvas]')).toHaveCSS('opacity', '0');
  const heroPlate = await page
    .locator('[data-hero]')
    .evaluate((hero) => getComputedStyle(hero).backgroundImage);
  expect(heroPlate, 'o hero perdeu a chapa estática').toMatch(/url\(/);

  // O menu de telas pequenas é <details>: abre pelo navegador, sem uma linha
  // de JS envolvida.
  const disclosure = page.locator('header details');
  await expect(disclosure).not.toHaveAttribute('open', '');
  await disclosure.locator('summary').click();
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(disclosure.getByRole('link', { name: 'Sistemas' })).toBeVisible();
});

// ---------------------------------------------------------------------------
// WebGL — a cena é opcional; o que não é opcional é o hero ter fundo.
// ---------------------------------------------------------------------------

test('o gate de WebGL troca cena por fundo sem erro de shader', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'a cena só tem permissão para subir no desktop');

  const noisy: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') noisy.push(message.text());
  });

  const canvas = page.locator('[data-stage-canvas]');

  await page.goto('/?webgl=0');
  await expect(canvas, 'o canvas apareceu com o gate negando WebGL').toHaveCSS('opacity', '0');
  await expect(page.locator('[data-stage-plate="a"]')).toHaveCSS('opacity', '1');

  await page.goto('/?webgl=1');
  await expect
    .poll(() => canvas.evaluate((element) => Number(getComputedStyle(element).opacity)), {
      timeout: 5_000,
    })
    .toBeGreaterThan(0);

  const broken = noisy.filter((line) => /shader|GLSL|WebGL: INVALID/i.test(line));
  expect(broken, 'a cena de tinta compilou com erro').toEqual([]);
});

// ---------------------------------------------------------------------------
// Capítulos — a home como sequência de telas, só em desktop com ponteiro fino.
// ---------------------------------------------------------------------------

test.describe('capítulos', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      !CHAPTER_PROJECTS.includes(testInfo.project.name),
      'o motor de capítulos só entra em desktop com ponteiro fino',
    );
    // Sem a cena: no Chromium headless o WebGL é rasterizado por software e
    // derruba o rAF a poucos quadros por segundo, o que faz uma viagem de
    // 0,9 s levar vários segundos. A cena tem o próprio teste, abaixo.
    await page.goto('/?webgl=0');
    await expect(page.locator('html')).toHaveClass(/chapters/);
    // O motor remede as paradas depois das fontes; esperar por elas evita
    // medir um layout que ainda vai mudar de altura.
    await page.evaluate(async () => {
      await document.fonts?.ready;
    });
  });

  test('os pontos apontam para os sete capítulos', async ({ page }) => {
    const dots = page.locator('[data-chapter-nav] a');
    await expect(dots).toHaveCount(CHAPTER_IDS.length);
    for (const [index, id] of CHAPTER_IDS.entries()) {
      await expect(dots.nth(index)).toHaveAttribute('href', `#${id}`);
      await expect(page.locator(`[data-chapter]#${id}`)).toHaveCount(1);
    }
    await expect(dots.first()).toHaveAttribute('aria-current', 'true');
  });

  test('cada capítulo mede múltiplos exatos de uma tela', async ({ page }) => {
    const tops = await page.evaluate(() => ({
      vh: window.innerHeight,
      tops: Array.from(document.querySelectorAll('[data-chapter]')).map((chapter) =>
        Math.round(chapter.getBoundingClientRect().top + window.scrollY),
      ),
    }));
    for (const top of tops.tops) {
      expect(top % tops.vh, `um capítulo começa em ${top}px, fora do múltiplo de tela`).toBeLessThanOrEqual(1);
    }
  });

  test('a roda avança um capítulo por gesto, e a inércia não pula outro', async ({ page }) => {
    await page.mouse.move(640, 400);
    await page.mouse.wheel(0, 120);
    await expect.poll(async () => (await chapterState(page)).current, { timeout: 4_000 }).toBe('1');
    await expect.poll(async () => (await chapterState(page)).y, { timeout: 4_000 }).toBe(
      await page.evaluate(() => window.innerHeight),
    );

    // Três ticks em sequência, como a inércia de um trackpad: um passo só.
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(2_000);
    const after = await chapterState(page);
    expect(after.state?.chapter, 'a inércia atravessou mais de um capítulo').toBeLessThanOrEqual(2);
    expect(after.y % (await page.evaluate(() => window.innerHeight)), 'parou fora de uma parada').toBeLessThanOrEqual(1);
  });

  test('o teclado percorre as paradas', async ({ page }) => {
    await page.keyboard.press('PageDown');
    await expect.poll(async () => (await chapterState(page)).current, { timeout: 4_000 }).toBe('1');
    await page.keyboard.press('End');
    await expect.poll(async () => (await chapterState(page)).state?.chapter, { timeout: 4_000 }).toBe(
      CHAPTER_IDS.length - 1,
    );
    await page.keyboard.press('Home');
    await expect.poll(async () => (await chapterState(page)).y, { timeout: 4_000 }).toBe(0);
  });

  test('uma âncora leva ao capítulo e o hash acompanha', async ({ page }) => {
    await page.locator('header nav ul a[href="/#ia"]').first().click();
    await expect.poll(async () => (await chapterState(page)).current, { timeout: 4_000 }).toBe(
      String(CHAPTER_IDS.indexOf('ia')),
    );
    expect(new URL(page.url()).hash).toBe('#ia');
    // O passo ativo do capítulo é o primeiro, e é o único que aceita ponteiro.
    await expect(page.locator('#ia [data-step].is-active')).toHaveCount(1);
  });

  test('um scroll de fora assenta na parada mais próxima, e nada vaza na horizontal', async ({ page }) => {
    const vh = await page.evaluate(() => window.innerHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(vh * 2.4));
    await expect.poll(async () => (await chapterState(page)).y % vh, { timeout: 4_000 }).toBeLessThanOrEqual(1);

    // Em cada parada, nada pode empurrar o documento para o lado.
    const stops = await page.evaluate(() => {
      const motion = (window as Window & { __motion?: MotionDebug }).__motion;
      return motion?.engine?.stops().map((stop) => stop.y) ?? [];
    });
    expect(stops.length).toBeGreaterThan(CHAPTER_IDS.length);
    for (const y of stops) {
      await page.evaluate((target) => window.scrollTo(0, target), y);
      await page.waitForTimeout(250);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `vazamento horizontal na parada ${y}`).toBeLessThanOrEqual(1);
    }
  });
});

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

test('a 404 se identifica e devolve o caminho de casa', async ({ page }) => {
  await page.goto('/404');

  await expect(page, 'a 404 herdou o título da home').toHaveTitle(/404|não chegou/i);
  const text = await visibleText(page);
  expect(text).toContain('este caminho não chegou a lugar nenhum');
  await expect(page.getByRole('link', { name: /voltar para a home/i })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Capturas
// ---------------------------------------------------------------------------

test('captura da home', async ({ page }) => {
  await page.goto('/?motion=0');
  await prepareForScreenshot(page);
  await expect(page).toHaveScreenshot('home.png', SHOT);
});

for (const slug of DOSSIER_SLUGS) {
  test(`captura do dossiê ${slug}`, async ({ page }, testInfo) => {
    test.skip(
      !SHOT_PROJECTS.includes(testInfo.project.name),
      'um projeto por regime de renderização já cobre o dossiê',
    );
    await page.goto(`/projects/${slug}?motion=0`);
    await prepareForScreenshot(page);
    await expect(page).toHaveScreenshot(`dossier-${slug}.png`, SHOT);
  });
}
