# Retrato protagonista, grafite e cobalto

Implementação de 24 de outubro de 2026, sobre o estado local existente. Referência de composição: [cartaz da Visme](https://assets.visme.co/templates/banners/thumbnails/i_Product-Design-Engineer-Portfolio-full_1.jpg). Este relatório substitui a direção cromática e a exigência de MCP na primeira tela dos relatórios anteriores.

## Decisões e escopo

- A abertura centraliza nome, proposta profissional e as ações existentes. O retrato existente tem 420 × 525 px no desktop, com placas cobalto e neutra a −6° e +6°. Pseudoelementos CSS decorativos não adicionam conteúdo acessível. Uma superfície isolada preserva o grafite e impede que a placa tinja a imagem.
- Abaixo de 1100 px, apresentação e atuação atual passam para baixo do retrato. No celular, o retrato tem no máximo 320 px, reservando 48 px para as placas; nome de 48–64 px e ações empilhadas abaixo de 480 px. O MCP inicia após a abertura e continua acessível pela ação principal e pelas âncoras existentes.
- Paleta clara: marfim `#F4F1EA`, grafite `#1D2430`, cobalto `#294FE6`, secundário `#596170`. Escuro: `#111722`, marfim e acento `#A3B7FF`. Diagramas, estados selecionados, formulário, foco, seleção, estudos e 404 usam os mesmos tokens. Erros usam vermelho com mensagem textual; recomendações têm cor âmbar e rótulo próprio.
- Geist permanece nos títulos, corpo e controles; Geist Mono identifica etapas e referências; Instrument Serif permanece nos destaques editoriais secundários. Textos extensos são limitados a aproximadamente 65 caracteres por linha.
- A nova identidade inclui monograma, SVG/ICO e imagem social de 1200 × 630, gerados com fontes e retrato locais. A cor da interface do navegador acompanha o tema inicial e a preferência persistida.
- Preservados: seis estudos, cargo atual, fatos e evidências, ordem das seções, rotas, navegação, conteúdo em português, argumentos de `generate_image`, commit `7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39`, exportação de JSON e animações funcionais. Nenhuma dependência foi adicionada. Astro permanece estático.

## Comparação visual

Abrir [a comparação navegável](../reports/design-review/portrait-comparison.html). Os controles alternam oito páginas, três tamanhos, dois temas e captura inicial/completa. Os links mostram arquitetura selecionada, Pimbas anterior, argumentos válidos e formulário inválido.

Capturas reais do Chromium em **1440 × 900**, **768 × 1024** e **390 × 844**, em ambos os temas:

- Antes: `reports/design-review/portrait-before/`.
- Depois: `reports/design-review/portrait-final/`.
- Auditoria final: `reports/design-review/portrait-final/audit.json`.

As capturas foram inspecionadas antes de aceitar as novas referências do Playwright. A revisão cobriu hierarquia, retrato, placas, alinhamento, legibilidade, superfícies, foco e estados funcionais. Os artefatos pesados ficam ignorados pelo Git e podem ser reproduzidos pelos scripts.

## Verificação

- `astro check`: 32 arquivos, zero erros, avisos ou sugestões.
- Build estático: oito páginas; rotas, sitemap e fontes locais preservados.
- Gate de conteúdo: autotestes aprovados e 16 arquivos do build sem violações.
- Prettier: todos os arquivos cobertos aprovados.
- Auditoria visual com Axe: 54 combinações, zero violações WCAG A/AA, erros de navegador ou overflow, incluindo formulário inválido nos seis pares tamanho/tema.
- Comparação: 192 imagens de antes/depois disponíveis; controles de página, tamanho, tema e captura completa conferidos no Chromium.
- Teclado, toque em 390 × 844, exportação real para clipboard/download, temas persistidos, armazenamento bloqueado, ausência de JavaScript e movimento reduzido cobertos pelo Playwright.
- Teste da primeira tela atualizado: título e retrato visíveis, largura de 400–440 px, retrato centralizado em 1440 × 900, MCP após a primeira tela e navegação por ação principal. Carregamento exclusivo da ferramenta MCP preservado.
- As 56 referências visuais foram atualizadas após inspeção. A execução final de `npm run verify` passou: **278 testes aprovados e 254 omitidos por condições da matriz**, sem falhas, em 59,9 s de Playwright. As omissões restringem verificações específicas aos dispositivos e modos correspondentes.

## Desempenho

Lighthouse 13.5.0, três navegações locais móveis com limitação simulada padrão, sobre o build estático e servidor com compressão:

| Medição        | Execução 1 | Execução 2 | Execução 3 | Meta  |
| -------------- | ---------- | ---------- | ---------- | ----- |
| Performance    | 99         | 99         | 99         | ≥ 90  |
| Acessibilidade | 100        | 100        | 100        | —     |
| Boas práticas  | 100        | 100        | 100        | —     |
| SEO            | 100        | 100        | 100        | —     |
| LCP            | 1958 ms    | 2105 ms    | 2105 ms    | —     |
| CLS            | 0          | 0          | 0          | ≤ 0,1 |
| TBT            | 0 ms       | 0 ms       | 0 ms       | —     |

JavaScript inicial da home: **2071 bytes gzip (2,02 KiB)**; meta ≤ 20 KiB. A ferramenta continua restrita à página MCP. Dados em `reports/lighthouse/summary.json` e relatórios HTML individuais. São medições locais de laboratório, não dados de produção.

## Reprodução

```sh
npm run check
npm run build
npm run test:claims:self
npm run test:claims
npm run format:check
npm run test:e2e
node scripts/review-design.mjs portrait-final
node scripts/compare-design.mjs portrait-before portrait-final portrait-comparison
npm run measure:performance
```

Neste ambiente, o Chromium usa as bibliotecas já extraídas em `/tmp/gabriel-browser-libs/root/usr/lib/x86_64-linux-gnu` por `LD_LIBRARY_PATH`, com execução autorizada fora do sandbox para abrir o navegador e os servidores locais. Nenhuma biblioteca foi instalada no sistema. O site não foi publicado.
