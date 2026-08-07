import { defineConfig } from '@playwright/test';

const sizes = [
  ['phone-360', 360, 800],
  ['phone-430', 430, 932],
  ['tablet', 768, 1024],
  ['desktop', 1280, 800],
  ['wide', 1600, 1000],
] as const;

const reducedMotionInit = `
(() => {
  const reduceQuery = /(prefers-reduced-motion:\\s*reduce)/i;
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query) => {
    if (reduceQuery.test(String(query))) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() { return false; },
      };
    }
    return original(query);
  };
})();
`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
  },
  use: { baseURL: 'http://127.0.0.1:4321', browserName: 'chromium', colorScheme: 'light' },
  projects: [
    ...sizes.map(([name, width, height]) => ({ name, use: { viewport: { width, height } } })),
    {
      name: 'reduced-motion',
      use: {
        viewport: { width: 1280, height: 800 },
        reducedMotion: 'reduce' as const,
      },
    },
    {
      name: 'no-javascript',
      use: { viewport: { width: 430, height: 932 }, javaScriptEnabled: false },
    },
  ],
});

// Ensure reduced-motion project always sees the media query (some Chromium builds
// under WSL ignore context.reducedMotion for matchMedia during early scripts).
export const reducedMotionInitScript = reducedMotionInit;
