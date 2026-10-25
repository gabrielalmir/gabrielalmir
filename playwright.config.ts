import { defineConfig } from '@playwright/test';
const sizes = [
  ['phone-360', 360, 800],
  ['phone-430', 430, 932],
  ['tablet', 768, 1024],
  ['desktop', 1280, 800],
  ['wide', 1600, 1000],
] as const;
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 4,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run build && npm run serve -- --host 127.0.0.1 --port 4325',
    url: 'http://127.0.0.1:4325',
    // The normal Astro dev server has no generated sitemap. Always test dist.
    reuseExistingServer: false,
    timeout: 180_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4325',
    browserName: 'chromium',
    colorScheme: 'light',
    trace: 'retain-on-failure',
  },
  projects: (['light', 'dark'] as const).flatMap((colorScheme) => [
    ...sizes.map(([name, width, height]) => ({
      name: colorScheme === 'light' ? name : `${name}-dark`,
      use: { viewport: { width, height }, colorScheme },
    })),
    {
      name: colorScheme === 'light' ? 'reduced-motion' : 'reduced-motion-dark',
      use: {
        viewport: { width: 1280, height: 800 },
        reducedMotion: 'reduce' as const,
        colorScheme,
      },
    },
    {
      name: colorScheme === 'light' ? 'no-javascript' : 'no-javascript-dark',
      use: { viewport: { width: 430, height: 932 }, javaScriptEnabled: false, colorScheme },
    },
  ]),
});
