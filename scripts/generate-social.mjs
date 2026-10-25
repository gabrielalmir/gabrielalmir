/** Render the code-based identity with the same local fonts as the site. */
import { hero, site } from '../src/lib/content.ts';
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
const geist = (await readFile('public/fonts/GeistVF.woff2')).toString('base64');
const portrait = (await readFile('src/assets/texture/portrait-plate-v2.webp')).toString('base64');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><style>
  @font-face{font-family:Geist;src:url(data:font/woff2;base64,${geist});font-weight:100 900}
  *{box-sizing:border-box}body{margin:0;background:#f4f1ea;color:#1d2430;font-family:Geist;width:1200px;height:630px;padding:32px 48px}
  header,footer{display:flex;justify-content:space-between;align-items:center;font-size:14px;color:#596170}
  header{border-bottom:1px solid #cbd0da;padding-bottom:16px}.mark{font-size:36px;letter-spacing:-3px;font-weight:650;color:#1d2430}.mark b{color:#294fe6}
  h1{text-align:center;font-size:84px;letter-spacing:-6px;font-weight:550;line-height:1;margin:24px 0 12px}h1 span{color:#294fe6}
  .composition{display:grid;grid-template-columns:1fr 260px 1fr;gap:64px;align-items:center;margin:24px 20px 0}
  .portrait{position:relative;isolation:isolate}.portrait:before,.portrait:after{content:'';position:absolute;inset:0;z-index:-1;background:#294fe6;transform:rotate(-6deg)}.portrait:after{background:#d8dce5;transform:rotate(6deg);z-index:-2}img{width:260px;height:325px;display:block;filter:grayscale(1)}
  p{font-size:29px;line-height:1.3;letter-spacing:-1px;margin:0}p span{color:#294fe6}aside{font-size:18px;line-height:1.6;color:#596170}aside strong{display:block;color:#1d2430;font-size:22px;font-weight:500}
  footer{position:absolute;bottom:20px;left:48px;right:48px;border-top:1px solid #cbd0da;padding-top:14px}
  </style><body><header><span class="mark">ga<b>.</b></span><span>${hero.kicker}</span></header><h1>${site.author}<span>.</span></h1><div class="composition"><p>${hero.headline}<br><span>${hero.focus}</span></p><div class="portrait"><img alt="Retrato ilustrado de Gabriel Almir" src="data:image/webp;base64,${portrait}"></div><aside><strong>Analista de Sistemas Pleno</strong>APIs, sistemas legados<br>e integrações corporativas.</aside></div><footer><span>Backend · Integrações · IA aplicada</span><span>gabrielalmir.com.br</span></footer></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });
  await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 92 });
  const icon = await readFile('public/favicon.svg', 'utf8');
  await page.setViewportSize({ width: 32, height: 32 });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:32px;height:32px}</style>${icon}`,
  );
  const png = await page.screenshot({ type: 'png', omitBackground: true });
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header[6] = 32;
  header[7] = 32;
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  await writeFile('public/favicon.ico', Buffer.concat([header, png]));
  console.log('public/og.jpg · 1200 × 630 · fontes locais; favicon.ico · 32 × 32');
} finally {
  await browser.close();
}
