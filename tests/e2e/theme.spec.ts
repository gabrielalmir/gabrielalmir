import { expect, test, type Page } from '@playwright/test';

const toggle = (page: Page) => page.getByRole('button', { name: 'Tema escuro', exact: true });
const background = (page: Page) =>
  page.locator('html').evaluate((el) => getComputedStyle(el).backgroundColor);
const colors = { light: 'rgb(244, 241, 234)', dark: 'rgb(17, 23, 34)' };

// The route matrix already checks layout, content, Axe and snapshots in both themes.
test('tema acompanha o dispositivo e alterações ao vivo sem gravar preferência', async ({
  page,
}, testInfo) => {
  test.skip(!/^desktop(-dark)?$/.test(testInfo.project.name));
  await page.goto('/');
  const initial = testInfo.project.use.colorScheme === 'dark' ? 'dark' : 'light';
  const other = initial === 'dark' ? 'light' : 'dark';
  await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
  expect(await background(page)).toBe(colors[initial]);
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  await page.emulateMedia({ colorScheme: other });
  await expect(page.locator('html')).toHaveAttribute('data-theme', other);
  await expect(toggle(page)).toHaveAttribute('aria-pressed', String(other === 'dark'));
  await expect(toggle(page)).toHaveAccessibleDescription(
    other === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro',
  );
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute(
    'content',
    other === 'dark' ? '#111722' : '#F4F1EA',
  );
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(
    other,
  );
});

test('botão acessível por teclado, persistência entre páginas e recarregamento', async ({
  page,
}, testInfo) => {
  test.skip(!/^(desktop|phone-360)(-dark)?$/.test(testInfo.project.name));
  await page.goto('/');
  const initial = testInfo.project.use.colorScheme === 'dark' ? 'dark' : 'light';
  const other = initial === 'dark' ? 'light' : 'dark';
  const button = toggle(page);
  expect(await button.evaluate((el) => el.closest('details'))).toBeNull();
  const size = await button.boundingBox();
  expect(size!.width).toBeGreaterThanOrEqual(44);
  expect(size!.height).toBeGreaterThanOrEqual(44);
  // Tab through the actual navigation order to the control.
  for (let i = 0; i < 10 && !(await button.evaluate((el) => el === document.activeElement)); i++)
    await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  expect(await button.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe('solid');
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-pressed', String(other === 'dark'));
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(other);
  await page.emulateMedia({ colorScheme: other });
  await page.emulateMedia({ colorScheme: initial });
  await expect(page.locator('html')).toHaveAttribute('data-theme', other);
  await page.locator('#sistemas a[href="/projects/maybe"]').first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', other);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', other);
  await toggle(page).focus();
  await page.keyboard.press('Space');
  await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
});

for (const saved of ['light', 'dark', 'invalid']) {
  test(`preferência salva ${saved} é resolvida antes da primeira pintura`, async ({
    page,
  }, testInfo) => {
    test.skip(!/^desktop(-dark)?$/.test(testInfo.project.name));
    await page.addInitScript((value) => {
      localStorage.setItem('theme', value);
      // Capture theme and background at the first rendered frame with content.
      const inspect = () => {
        if (!document.body) {
          requestAnimationFrame(inspect);
          return;
        }
        const root = document.documentElement;
        (window as unknown as { firstTheme: unknown }).firstTheme = {
          theme: root.dataset.theme,
          background: getComputedStyle(root).backgroundColor,
        };
      };
      requestAnimationFrame(inspect);
    }, saved);
    await page.goto('/');
    const expected = saved === 'invalid' ? testInfo.project.use.colorScheme! : saved;
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { firstTheme: unknown }).firstTheme))
      .toEqual({ theme: expected, background: colors[expected as 'light' | 'dark'] });
    await expect(page.locator('html')).toHaveAttribute('data-theme', expected);
    if (saved === 'invalid') {
      const other = expected === 'dark' ? 'light' : 'dark';
      await page.emulateMedia({ colorScheme: other });
      await expect(page.locator('html')).toHaveAttribute('data-theme', other);
      await toggle(page).click();
      expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(expected);
    }
  });
}

test('armazenamento bloqueado mantém o controle funcional e não causa erros', async ({
  page,
}, testInfo) => {
  test.skip(!/^desktop(-dark)?$/.test(testInfo.project.name));
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    }),
  );
  await page.goto('/');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await toggle(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await toggle(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('sem JavaScript segue o dispositivo e oculta o botão', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('no-javascript'));
  await page.goto('/');
  const expected = testInfo.project.use.colorScheme === 'dark' ? 'dark' : 'light';
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  expect(await background(page)).toBe(colors[expected]);
  await expect(page.locator('[data-theme-toggle]')).toBeHidden();
  await page.emulateMedia({ colorScheme: expected === 'dark' ? 'light' : 'dark' });
  expect(await background(page)).toBe(colors[expected === 'dark' ? 'light' : 'dark']);
});

test('retrato sobre papel claro, encerramento escuro e impressão clara', async ({
  page,
}, testInfo) => {
  test.skip(!/^(desktop|no-javascript)(-dark)?$/.test(testInfo.project.name));
  await page.goto('/');
  const styles = await page.evaluate(() => {
    const css = (selector: string) => getComputedStyle(document.querySelector(selector)!);
    return {
      portrait: css('.portrait-frame').backgroundColor,
      blend: css('.portrait-frame img').mixBlendMode,
      contact: css('.contact-section').backgroundColor,
      footer: css('.site-footer').backgroundColor,
    };
  });
  expect(styles).toEqual({
    portrait: colors.light,
    blend: testInfo.project.use.colorScheme === 'dark' ? 'normal' : 'multiply',
    contact: 'rgb(29, 36, 48)',
    footer: 'rgb(29, 36, 48)',
  });
  await page.emulateMedia({ media: 'print' });
  expect(await background(page)).toBe(colors.light);
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).colorScheme)).toBe(
    'light',
  );
});
