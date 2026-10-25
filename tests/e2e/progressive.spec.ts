import { expect, test } from '@playwright/test';

test('sem JavaScript, etapas e versões são legíveis e o exemplo está disponível', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('no-javascript'));
  await page.goto('/');
  await expect(page.locator('[data-panel]:visible')).toHaveCount(4);
  await expect(page.locator('[data-runtime]:visible')).toHaveCount(2);
  await expect(page.locator('.architecture-controls')).toBeHidden();
  await expect(page.locator('.migration-controls')).toBeHidden();
  await page.goto('/projects/mcp-animaginexl#experimentar');
  await expect(page.getByText('Ative JavaScript para editar', { exact: false })).toBeVisible();
  await expect(page.locator('[data-arguments-json]')).toContainText('"guidance_scale": 5');
  await expect(page.getByLabel('Prompt', { exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Copiar JSON' })).toBeDisabled();
});
