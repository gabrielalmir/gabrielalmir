# Redesign — Gabriel Almir, engenharia e IA aplicada

Implementação e verificação local em 24 de outubro de 2026. Sem publicação em produção.

## Conceito e decisões

O portfólio funciona como um caderno de engenharia: papel quente `#F4F1E9`, texto `#202421`,
verde `#17645B` e cobre `#9B442C`; Geist no texto e nos títulos, Instrument Serif em destaques
editoriais e Geist Mono em legendas. Fontes locais, retrato ilustrado existente com dimensões e
`srcset`, diagramas próprios em SVG e encerramento escuro.

A home apresenta nome, atuação e foco crescente em IA antes de abrir os estudos de caso. A ordem
é apresentação, evidências, IA aplicada, projetos, trajetória, processo e contato. MCP AnimagineXL,
Pimbas e Maybe recebem destaque; Saturno, Hush e Resulta continuam acessíveis na seleção complementar.

Astro estático e a coleção Markdown foram mantidos. A apresentação e os textos principais ficam em
`src/lib/content.ts`. Os casos mantêm contexto, restrições, decisões, evidências e limites, além de
código e referência-fonte. Diagramas se recompõem verticalmente quando a coluna fica estreita.

Preloader, motor de capítulos, Lenis, GSAP, WebGL e suas dependências sem consumidores foram
removidos. O único JavaScript de interface aprimora o menu móvel nativo (`details`): fecha após
navegação, direciona o foco para a seção e devolve foco ao acionador com Escape. Sem JavaScript,
todas as páginas e os links permanecem disponíveis. Movimento reduzido desativa transições.

Preservados: seis URLs de projeto, âncoras `inicio`, `provas`, `sistemas`, `trajetoria`, `ia`,
`processo` e `contato`, contatos, canonical, sitemap e JSON-LD de pessoa. Metadados, SVG/ICO e imagem
social JPEG de 1200 × 630 acompanham a identidade. A 404 tem o mesmo sistema e `noindex`.

## Revisão de conteúdo

O [README do anime-diffusion-mcp](https://github.com/gabrielalmir/anime-diffusion-mcp/blob/main/README.md)
foi consultado em 24/10/2026. O destino antigo foi corrigido. O caso descreve as ferramentas
`optimize_prompt`, `validate_prompt`, `list_models` e `generate_image`, geração text-to-image e
image-to-image, checkpoints e LoRAs, parâmetros em JSON e limites de hardware. A alegação de API REST
foi retirada: o README consultado documenta a integração MCP.

A revisão foi documental; não foi executada inferência. Não há afirmação de benchmark, avaliação,
guardrails ou operação em produção. Licença MIT do código é distinguida das licenças dos modelos.
Os demais casos preservam limites conhecidos, inclusive falta de adoção do Pimbas e auditorias de
licença/commit ainda pendentes. Referências `main` são móveis e essa limitação aparece nas páginas.

O único resultado quantitativo profissional continua sendo a redução de carregamento de 90%, sem
reconstrução de contexto interno. A atribuição do PhotoGIMP permanece contribuição, organização e
revisão em projeto comunitário. A atuação profissional em IA é mencionada apenas em termos gerais.
Qwen3-TTS não entra na coleção, na home nem no sitemap; sua antiga rota retorna 404.

## Verificações

- Astro: zero erros, avisos ou sugestões; build estático com oito páginas.
- Gate de claims e seus testes próprios passaram. A verificação também inclui bundles de texto.
- Playwright: 100 testes passaram, incluindo comparação dos 28 baselines sem atualização. As 40
  combinações não aplicáveis foram ignoradas de propósito. Cobertura: home, seis estudos de caso e
  404, em 360, 430, 768, 1280 e 1600 pixels; também sem
  JavaScript e com movimento reduzido. A suíte verifica títulos e hierarquia, textos, imagens e
  dimensões, URLs canônicas, ausência de transbordamento, rolagem nativa, âncoras, teclado e foco.
- Axe: WCAG 2 A/AA e 2.1 A/AA nas oito páginas, em 360 e 1280 pixels, sem violações detectadas.
- Navegação: todos os destinos internos apresentados resolvem, e todas as âncoras existem. A rota
  desconhecida e a antiga rota Qwen3-TTS retornam 404.
- Links externos: os 19 destinos apresentados responderam HTTP 200 em 24/10/2026. Isso comprova
  resposta HTTP, sem garantir acesso autenticado nem conteúdo futuro de plataformas sociais.
- Capturas: 28 candidatos revisados antes de atualizar baselines, incluindo sete variantes da home
  e sete páginas internas em desktop, movimento reduzido e ausência de JavaScript. Baselines antigos
  do motor de capítulos e do Qwen3-TTS foram substituídos/removidos.
- Formatação e `git diff --check` passaram.

As auditorias automáticas e a inspeção visual local não substituem testes com pessoas usando leitores
de tela e diferentes dispositivos físicos.

## Desempenho local

Lighthouse 13.5.0, Chromium 153 do Playwright 1.63.0, Node.js 24.21.0. Três navegações móveis com
throttling simulado padrão, em servidor estático local com Brotli/gzip, sem cache de navegação.

| Medida                     | Resultado              | Meta         |
| -------------------------- | ---------------------- | ------------ |
| Performance móvel          | 99 / 99 / 99           | ≥ 90         |
| Acessibilidade             | 100 / 100 / 100        | —            |
| Boas práticas              | 100 / 100 / 100        | —            |
| SEO                        | 100 / 100 / 100        | —            |
| CLS                        | 0 / 0 / 0              | ≤ 0,1        |
| TBT                        | 0 ms nas três medições | —            |
| LCP                        | aproximadamente 2,1 s  | —            |
| JavaScript próprio inicial | 433 bytes gzip         | ≤ 20 KB gzip |

O JavaScript é inline: o tamanho acima é o gzip isolado do código executável, excluindo JSON-LD;
a transferência real faz parte do HTML comprimido. Não há bundle de biblioteca no cliente.

Medições locais não representam dados de campo, a latência de um host em produção ou toda combinação
de aparelho e rede. Os relatórios completos e o resumo JSON são gerados em `reports/lighthouse/`.

## Reproduzir

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
npm run format:check
npm run measure:performance
npm run test:links
```

Neste ambiente, portas locais e processos do navegador exigiram execução fora do sandbox.
A instalação de dependências do Chromium com sudo não estava disponível; as três bibliotecas
faltantes foram baixadas dos pacotes oficiais e extraídas em `/tmp/gabriel-browser-libs`, sem alterar
o sistema. O teste usou `LD_LIBRARY_PATH=/tmp/gabriel-browser-libs/root/usr/lib/x86_64-linux-gnu`.
Essa adaptação é local e não é exigida pelo site publicado.

Para revisar visuais antes de aceitá-los, use `REVIEW_SCREENSHOTS=1 npm run test:e2e -- --grep 'visual:'`.
Os candidatos ficam em `/tmp/gabriel-visual-review`. Só após inspecioná-los, execute
`npm run test:e2e:update -- --grep 'visual:'` e depois `npm run test:e2e` sem atualizar snapshots.
