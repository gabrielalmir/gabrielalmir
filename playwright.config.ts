import { defineConfig } from '@playwright/test';

const sizes = [
  ['phone-360', 360, 800],
  ['phone-430', 430, 932],
  ['tablet', 768, 1024],
  ['desktop', 1280, 800],
  ['wide', 1600, 1000],
] as const;

/**
 * Alguns builds do Chromium ignoram `context.reducedMotion` nos scripts que
 * rodam antes do primeiro paint — e é exatamente ali que `motion/gate.ts` lê a
 * media query. Forçar a resposta no init script mantém o projeto
 * `reduced-motion` testando o que o nome dele promete.
 */
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
    // Nem `astro dev` nem `astro preview`: no Astro 7 os dois se desprendem e
    // saem com 0, e o Playwright desiste com "Process from config.webServer
    // exited early" — `astro dev` ainda toma um lock por cima. `scripts/
    // serve-dist.mjs` serve o mesmo `dist/` e fica de pé até receber um sinal.
    // O teto é largo porque o build processa as imagens antes de servir.
    command: 'npm run build && npm run serve -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    // O site é escuro por natureza: `light` faria o navegador emular uma
    // preferência que a página nunca atende, e o baseline sairia de outro site.
    colorScheme: 'dark',
  },
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

export const reducedMotionInitScript = reducedMotionInit;
