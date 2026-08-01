import { test, expect } from '@playwright/test';

for (const path of ['/', '/en/']) {
  test(`${path} communicates the essentials and stays usable`, async ({ page }, testInfo) => {
    await page.route(/github|microlink/i, route => route.abort());
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('90%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText(/PhotoGIMP/i).first()).toBeVisible();
    await expect(page.getByText(/regulad|regulated/i).first()).toBeVisible();
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
