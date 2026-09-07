// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gabrielalmir.com.br',
  output: 'static',
  devToolbar: { enabled: false },
  // O canonical das páginas é sem barra final; o sitemap publicava `/projects/
  // pimbas/`. Duas URLs para a mesma página é exatamente o que o canonical
  // existe para evitar, então o sitemap passa a falar a mesma língua.
  integrations: [
    sitemap({
      serialize: (item) => ({ ...item, url: item.url.replace(/(.)\/$/, '$1') }),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 2048 },
  },
});
