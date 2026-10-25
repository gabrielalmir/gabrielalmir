/** A local review artifact: compare captured screens without changing the site. */
import { access, writeFile } from 'node:fs/promises';
const root = 'reports/design-review';
const [beforePhase = 'baseline', afterPhase = 'final', outputName] = process.argv.slice(2);
if (outputName && !/^[a-z-]+$/.test(outputName)) throw new Error('Use a simple output name');
for (const phase of [beforePhase, afterPhase]) {
  if (!/^[a-z-]+$/.test(phase)) throw new Error('Use simple phase names');
}
for (const phase of [beforePhase, afterPhase]) await access(`${root}/${phase}/audit.json`);
const html = `<!doctype html>
<html lang="pt-BR">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gabriel Almir — comparação visual</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 32px; background: #f4f1ea; color: #1d2430; font: 16px/1.6 system-ui, sans-serif; }
  main { max-width: 1600px; margin: auto; }
  h1 { font-size: 30px; line-height: 1.2; font-weight: 550; letter-spacing: -.04em; }
  p { max-width: 80ch; }
  fieldset { margin: 24px 0; padding: 16px; border: 1px solid #cbd0da; display: flex; gap: 24px; flex-wrap: wrap; }
  label { display: flex; gap: 10px; align-items: center; min-height: 44px; }
  select { padding: 10px; font: inherit; background: #f4f1ea; color: inherit; border: 1px solid #596170; }
  input { width: 20px; height: 20px; }
  :focus-visible { outline: 3px solid #294fe6; outline-offset: 4px; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
  figure { margin: 0; min-width: 0; }
  figcaption { margin-bottom: 12px; font-weight: 550; }
  img { display: block; width: 100%; height: auto; border: 1px solid #cbd0da; }
  a { color: #294fe6; text-underline-offset: 3px; }
  @media (max-width: 600px) { body { padding: 20px; } .comparison { grid-template-columns: 1fr; } }
</style>
<main>
<h1>Gabriel Almir · evolução visual</h1>
<p>Capturas reais no Chromium, antes e depois das alterações. O enquadramento inicial permite comparar a apresentação; a página completa mostra a hierarquia, a ordem das seções e o tratamento de cada projeto.</p>
<fieldset><legend>Comparar capturas</legend>
<label>Página <select id="route"><option value="home">Abertura</option><option value="mcp-animaginexl">MCP AnimagineXL</option><option value="pimbas">Pimbas</option><option value="maybe">Maybe</option><option value="saturno">Saturno</option><option value="hush">Hush</option><option value="resulta">Resulta</option><option value="404">404</option></select></label>
<label>Tamanho <select id="size"><option value="desktop">Desktop · 1440 × 900</option><option value="tablet">Tablet · 768 × 1024</option><option value="mobile">Mobile · 390 × 844</option></select></label>
<label>Tema <select id="theme"><option value="light">Claro</option><option value="dark">Escuro</option></select></label>
<label><input type="checkbox" id="full"> Página completa</label>
</fieldset>
<div class="comparison">
<figure><figcaption>Antes</figcaption><a id="before-link" href="${beforePhase}/home-desktop-light-first.png"><img id="before" src="${beforePhase}/home-desktop-light-first.png" alt="Portfólio antes da evolução visual" width="1440" height="900"></a></figure>
<figure><figcaption>Depois</figcaption><a id="after-link" href="${afterPhase}/home-desktop-light-first.png"><img id="after" src="${afterPhase}/home-desktop-light-first.png" alt="Portfólio após a evolução visual" width="1440" height="900"></a></figure>
</div>
<p><a href="${afterPhase}/audit.json">Auditoria final: oito páginas, três tamanhos, dois temas</a> · <a id="projects" href="${afterPhase}/projects-desktop-light.png">Projetos em detalhe</a></p>
<p>Estados interativos: <a id="architecture" href="${afterPhase}/architecture-files-desktop-light.png">Arquivos de saída</a> · <a id="pimbas" href="${afterPhase}/pimbas-before-desktop-light.png">Pimbas anterior</a> · <a id="valid" href="${afterPhase}/builder-valid-desktop-light.png">Argumentos válidos</a> · <a id="invalid" href="${afterPhase}/builder-invalid-desktop-light.png">Erros estruturais</a></p>
</main>
<script>
const route = document.getElementById('route');
const size = document.getElementById('size');
const theme = document.getElementById('theme');
const full = document.getElementById('full');
function update() {
  const suffix = size.value + '-' + theme.value + (full.checked ? '' : '-first') + '.png';
  for (const [name, phase] of [['before', '${beforePhase}'], ['after', '${afterPhase}']]) {
    const img = document.getElementById(name);
    img.src = phase + '/' + route.value + '-' + suffix;
    img.removeAttribute('width');
    img.removeAttribute('height');
    document.getElementById(name + '-link').href = img.src;
  }
  document.getElementById('projects').href = '${afterPhase}/projects-' + size.value + '-' + theme.value + '.png';
  for (const [id, name] of [['architecture', 'architecture-files'], ['pimbas', 'pimbas-before'], ['valid', 'builder-valid'], ['invalid', 'builder-invalid']]) document.getElementById(id).href = '${afterPhase}/' + name + '-' + size.value + '-' + theme.value + '.png';
}
for (const control of [route, size, theme, full]) control.addEventListener('change', update);
</script>
</html>`;
const output = `${root}/${outputName || (process.argv.length > 2 ? 'ai-comparison' : 'comparison')}.html`;
await writeFile(output, html);
console.log(`Comparison: ${output}`);
