# Portfólio de AI Engineering — implementação e validação

Data: 24/10/2026. As alterações locais existentes foram usadas como base e preservadas. O site
continua estático em Astro, com seis casos Markdown, oito páginas, as rotas e as âncoras existentes.

## Decisões de conteúdo e composição

- Posicionamento: “Backend e integrações para sistemas de IA”. O cargo atual continua sendo
  Analista de Sistemas Pleno; o título não transforma projetos experimentais em experiência profissional.
- Ordem: apresentação → MCP AnimagineXL → experiência profissional → Pimbas e Maybe → outras
  investigações → desenvolvimento atual → trajetória → contato.
- Abertura com nome de até 96 px e retrato de até 248 px. Em 1440 × 900, o título e o início do
  explorador MCP aparecem antes da dobra. A suíte verifica a posição do título.
- Papel quente, verde, cobre, retrato a grafite e fontes locais preservados. Geist atende leitura
  e controles; o corpo dos textos tem pelo menos 16 px; Geist Mono fica em identificadores e código.
- Pimbas demonstra separação do domínio e evolução da entrega web; Maybe, contratos para erro,
  ausência e dados externos. A conexão com sistemas de IA é uma aplicação dessas competências,
  sem alegar que esses dois projetos implementam IA.
- A redução de 90% continua como a única métrica profissional publicada. É um relato anonimizado,
  sem divulgar domínio, volumes ou latência absoluta. A atribuição do PhotoGIMP foi preservada.
- Avaliação, guardrails, observabilidade e operação de modelos seguem identificados como estudos.

## Fontes e limites da ferramenta

Referência fixa: [anime-diffusion-mcp, commit 7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39](https://github.com/gabrielalmir/anime-diffusion-mcp/tree/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39).
README, assinatura das ferramentas, pipeline e validador foram consultados diretamente nessa versão.

| Fonte                                                                                                                                                          | Uso no portfólio                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [server.py](https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/src/anime_diffusion_mcp/server.py)               | Ferramentas, argumentos, padrões e fluxo recomendado         |
| [README](https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/README.md)                                          | Exemplo carregável, tags, execução e artefatos               |
| [pipeline.py](https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/src/anime_diffusion_mcp/diffusion/pipeline.py) | Responsabilidade da inferência e dependência de hardware     |
| [validator.py](https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/src/anime_diffusion_mcp/prompt/validator.py)  | Resoluções recomendadas e distinção dos limites do checklist |

A mensagem permanente é: “Monta e verifica argumentos no navegador. A geração acontece no
servidor MCP.” Não há chamada de rede, carregamento de modelo ou simulação de imagem no formulário.

A ferramenta expõe `prompt`, `width`, `height`, `steps`, `guidance_scale` e `seed`. Seed vazia é
omitida; o servidor escolhe uma seed aleatória. A validação estrutural local exige prompt não vazio,
dimensões e steps inteiros positivos, guidance finito não negativo e inteiros seguros em JavaScript.
Essas são condições do formulário, não uma afirmação de equivalência com as verificações Python.

Recomendações de tags e resolução não bloqueiam a exportação. Personagem e série exigem revisão
manual; não há classificador semântico no navegador. O formulário omite `negative_prompt`, usando
o padrão do servidor. Checkpoints, LoRAs e image-to-image permanecem no contrato original, fora
deste formulário de texto para imagem. Repetir argumentos não garante imagens idênticas entre ambientes.

JSON inválido não é exportado: erros desabilitam cópia e download e removem a prévia anterior.
As mensagens usam texto, rótulos e `aria-invalid`, com feedback de exportação em região de status.
Falhas de clipboard ou download permitem tentar novamente. Os dados não são persistidos.

## Interações e acessibilidade

O explorador tem quatro botões HTML com estado pressionado, painel correspondente e fontes.
O SVG é complementar. Os painéis ocupam o mesmo espaço no grid para evitar deslocamentos durante
a seleção. As relações animam por 360 ms; o texto entra em 180 ms. No Pimbas, a camada web muda em
360 ms, enquanto o domínio mantém sua posição. Com movimento reduzido, não são criadas animações.

Sem JavaScript, as quatro explicações MCP e as duas versões do Pimbas ficam visíveis. O formulário
fica desabilitado, com explicação, exemplo JSON, regras e fontes disponíveis. O código da ferramenta
é carregado apenas no estudo MCP; esse isolamento é verificado por requisições no Playwright.

O servidor de testes mantém a porta exclusiva 4325 e responde HTTP 404 para a página de erro,
suas variantes e URLs desconhecidas. A correção compara o arquivo resolvido com a página de erro,
incluindo caminhos codificados.

## Evidências de verificação

- `npm run verify`: Astro check sem erros, avisos ou sugestões; build estático de oito páginas;
  gate de conteúdo e seus testes próprios aprovados; **278 testes Playwright passaram**.
  Foram ignoradas 254 combinações que não se aplicam ao respectivo cenário.
- As **56 referências visuais** passaram na comparação final sem atualização. Os candidatos foram
  capturados e inspecionados antes de aceitar mudanças, incluindo nova inspeção do estudo MCP após
  ajustar os botões secundários aos dois temas.
- Os testes verificam campos, JSON atualizado, seed omitida, números inválidos e recuperação,
  recomendações sem bloqueio, clipboard real e simulado, download com conteúdo real, falhas e
  novas tentativas. Conteúdo digitado é tratado como texto, inclusive sequências HTML.
- Seleções da arquitetura e Pimbas, foco, teclado, toque emulado em 390 × 844, geometria estável,
  movimento reduzido e fallback sem JavaScript passaram.
- Axe não detectou violações WCAG 2 A/AA e 2.1 A/AA nas páginas e nos estados selecionados e
  inválidos testados. A revisão em três tamanhos e dois temas registrou 54 auditorias completas
  e 18 auditorias de recaptura das interações, sem overflow, erros de página ou violações.
- `/404`, `/404/`, `/404.html`, variante codificada e query string respondem 404. URLs desconhecidas,
  destinos internos, âncoras e sitemap foram verificados no servidor exclusivo da porta 4325.
- Os 26 destinos externos emitidos responderam HTTP 200. Esse resultado não garante disponibilidade
  futura nem substitui a leitura das fontes. Os projetos Pimbas e Maybe mantêm os limites de auditoria
  e licença já declarados.
- `npm run format:check` e `git diff --check` passaram.

Lighthouse 13.5.0 em três navegações móveis com throttling simulado, servidor estático local
com Brotli/gzip e sem outros testes de navegador em execução:

| Medida                         | Resultado                                          | Meta     |
| ------------------------------ | -------------------------------------------------- | -------- |
| Performance móvel              | 99 / 99 / 99                                       | ≥ 90     |
| Acessibilidade                 | 100 / 100 / 100                                    | —        |
| Boas práticas                  | 100 / 100 / 100                                    | —        |
| SEO                            | 100 / 100 / 100                                    | —        |
| CLS                            | 0 / 0 / 0                                          | ≤ 0,1    |
| TBT                            | 0 ms em todas as medições                          | —        |
| LCP                            | 1,81 / 1,96 / 1,96 s                               | —        |
| JavaScript inicial da home     | 2.071 bytes gzip (2,02 KiB)                        | ≤ 20 KiB |
| Bundle adicional da ferramenta | 2.037 bytes gzip (1,99 KiB), somente no estudo MCP | —        |

O tamanho inicial soma o gzip isolado dos scripts executáveis, excluindo JSON-LD. Os scripts
inline são transferidos dentro do HTML comprimido; essa soma é uma estimativa conservadora do
código próprio, não o tamanho de uma requisição separada. A home permanece sem dependências
JavaScript de interface ou animação. O resumo e os três relatórios completos estão em
`reports/lighthouse/`. Todas as metas foram atendidas.

## Revisão visual e reprodução

Antes: `reports/design-review/ai-before/`. Depois: `reports/design-review/ai-final/`.
Capturas em 1440 × 900, 768 × 1024 e 390 × 844, nos temas claro e escuro. A comparação local em
`reports/design-review/ai-comparison.html` permite alternar tamanho, tema e página inteira.
Há links para os estados selecionados, Pimbas anterior e argumentos válidos/inválidos.

```sh
npm run verify
npm run format:check
npm run measure:performance
node scripts/review-design.mjs ai-final
node scripts/compare-design.mjs ai-before ai-final
```

Os relatórios e capturas são artefatos locais ignorados pelo Git. O script de revisão permite
recriá-los. Para repetir uma comparação com o estado anterior, preserve `ai-before` antes de editar.
As referências Playwright só são atualizadas após inspecionar os candidatos.

Neste ambiente, o Chromium usa as bibliotecas já extraídas em
`/tmp/gabriel-browser-libs/root/usr/lib/x86_64-linux-gnu` via `LD_LIBRARY_PATH`; os processos do navegador
e as portas locais exigem execução fora do sandbox. Isso não altera o site publicado.

As auditorias automáticas, o toque emulado e a inspeção no Chromium não substituem testes com
leitores de tela e dispositivos físicos. Lighthouse é uma medição local com rede simulada, sem
representar dados de campo. Esta entrega não publica o site nem executa o servidor de inferência.
