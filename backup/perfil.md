# Gabriel Almir — perfil consolidado

Consolidação de três fontes, em 2026-09-07:

- **`Profile.pdf`** — exportação do LinkedIn (gerada em 07/09/2026).
- **Site** — `src/lib/portfolio-content.ts` (copy, trajetória, provas, processo) e `src/content/blog/`.
- **Projetos** — `src/content/systems/pt-BR/*.json`, os dossiês e laboratórios publicados.

Onde as fontes divergem, isso está marcado em [Divergências](#divergências).

---

## Identidade

| Campo | Valor |
| --- | --- |
| Nome | Gabriel Almir |
| Título atual | Analista de Sistemas Pleno — Backend, Cloud e AI Systems |
| Localização | Itapira, São Paulo, Brasil |
| E-mail | gabr.almir@gmail.com |
| Telefone | (19) 99560-3286 |
| LinkedIn | linkedin.com/in/gabrielalmir |
| GitHub | github.com/gabrielalmir |
| Site | gabrielalmir.com.br |
| Instagram (pessoal) | @momentoalmir — fotografia e diário visual |
| YouTube / Instagram | @avlye |

**Posicionamento do site:** "Eu transformo restrições em caminhos confiáveis."
Investigo limites, dependências e falhas para transformar decisões técnicas em
sistemas que outras pessoas conseguem operar e evoluir.

**Direção declarada no LinkedIn:** AI Platform Engineering — aplicar experiência
de backend, integrações e sistemas distribuídos na base que permite a outros
desenvolvedores usar recursos de IA com mais confiabilidade e controle.

---

## Resumo (LinkedIn)

Mais de 5 anos com sistemas corporativos, backend, APIs, integrações e cloud.
Entender o problema antes da tecnologia: conversar com diferentes áreas,
entender processos e transformar necessidade de negócio em sistema confiável e
fácil de manter.

Resultados citados:

- redução de ~90% da carga de um processo;
- liderança técnica da migração de um sistema legado para cloud;
- integrações entre SAP e TOTVS via OData.

Também: documentação, testes, onboarding e mentoria de desenvolvedores.

Base técnica: Node.js, TypeScript, Python, APIs REST, mensageria, bancos
relacionais e NoSQL, AWS, Docker, CI/CD, observabilidade. O foco declarado não é
a lista, e sim como as partes se conectam e como o sistema se comporta ao longo
do tempo.

Em projetos pessoais: AI Systems — serviços MCP, APIs compatíveis com OpenAI,
inferência local em GPU, pipelines de voz e imagem. Servem para praticar
integração entre runtimes, roteamento de modelos, streaming, filas, retries,
segurança, observabilidade, medição de latência e a decisão entre execução local
e cloud.

Open source: principal mantenedor do **PhotoGIMP**, que adapta a experiência do
GIMP para quem vem do Adobe Photoshop.

---

## As três provas do site (30 segundos)

| Marca | Afirmação | Lastro |
| --- | --- | --- |
| **−90%** | Reduzi o carregamento de um sistema crítico | Resultado medido e aprovado para divulgação |
| **RIGOR** | Trabalho com limites reais | Integrações e aplicações que exigem rastreabilidade e conformidade |
| **COMUNIDADE** | Colaboro com o PhotoGIMP | Contribuição na evolução; hoje organização e revisão do projeto |

---

## Experiência

### Laboratório Cristália — Analista de Sistemas Pleno
*abril/2026 — presente · Itapira, SP*

Análise e evolução de sistemas corporativos junto a Garantia da Qualidade, RH,
Compras, Jurídico e TI. Entender processos de negócio, identificar impactos
entre sistemas e apoiar soluções sob requisitos de rastreabilidade, segurança e
conformidade. Integrações com o ERP; testes, documentação, onboarding e
acompanhamento técnico de outros desenvolvedores.

Contato com iniciativas internas de IA — uso ainda limitado e em evolução; o
foco declarado é entender onde a tecnologia agrega valor e como integrá-la de
forma responsável ao ambiente corporativo.

### CTC — Desenvolvedor Backend Node.js
*agosto/2023 — abril/2026 (2a 9m) · Itapira, SP*

Backend em Node.js e TypeScript, com foco em APIs, integrações e evolução de
aplicações corporativas.

- Reorganizou um processo da plataforma interna de SAC e **reduziu ~90% o tempo
  de carregamento** das requisições.
- **Responsável técnico pela migração** de um sistema legado e auditado para o
  TOTVS Cloud: levantamento de dependências, planejamento da transição, ajustes
  na aplicação e acompanhamento pós-mudança.
- Integrações **SAP ↔ TOTVS via OData**.
- Pipelines de CI/CD, documentação, testes e requisitos de conformidade.
- Onboarding e mentoria de desenvolvedores.

### Atuação independente — Desenvolvimento e suporte
*2016 — 2023 (só no site)*

Projetos e demandas diversas que ampliaram autonomia, escuta e responsabilidade
de ponta a ponta.

### Diolinux — Desenvolvedor Full-Stack
*maio/2013 — agosto/2016 (3a 4m) · Marau, RS*

Desenvolvimento e manutenção de soluções web e iniciativas de comunidade open
source. Projeto principal: **PhotoGIMP** — manutenção, compatibilidade entre
versões, organização do projeto e contato direto com a comunidade. Formou sua
visão sobre manutenção de software, experiência do usuário, documentação e
evolução de um projeto usado por pessoas com ambientes diferentes.

---

## Formação

| Instituição | Curso | Período |
| --- | --- | --- |
| FATEC (São Paulo / Itapira) | Desenvolvimento de Software Multiplataforma | ago/2022 — dez/2025 (concluído) |
| Senac Brasil | Técnico em Tecnologia da Informação | ago/2014 — jun/2016 |

### Certificações (LinkedIn)

- Masterclass Aplicação Serverless na AWS
- Introdução a OpenTelemetry
- Docker
- AWS Academy Graduate — AWS Academy Cloud Developing
- Versionamento de Código com Git e GitHub

### Competições (só no site)

- **Minimaratona · FATEC Itapira** — 15/03/2025, competidor.
- **InterFatecs** — 16/08/2025, competidor.
- **Maratona de Programação da SBC** — 13/09/2025, competidor.

> O site explicita: maratona de programação é resolução de problemas
> algorítmicos sob limite de tempo — prática de raciocínio colaborativo,
> estratégia e clareza sob pressão, não uma corrida física.

---

## Projetos publicados

### Dossiês de arquitetura

**Pimbas** — evolução arquitetural · implementado
`github.com/gabrielalmir/pimbas`
Partidas amistosas e torneios de pimbolim viram um domínio claro enquanto a
arquitetura reduz runtimes e preserva contratos.
*Restrições:* preservar contratos durante a migração; isolar dados e permissões
por grupo; reduzir drift sem acoplar o domínio ao framework.
*Decisões:* consolidar o runtime · proteger o domínio · tratar acesso como fronteira.
*Limites declarados:* não teve adoção (faltou tempo de manutenção); licença a
confirmar; commit-fonte a fixar; dívidas permanecem explícitas.

**Saturno** — arquitetura de produto · implementado
`github.com/gabrielalmir/saturno`
Monólito moderno Laravel/Inertia com fronteira modular para gestão do trabalho.
*Restrições:* multi-organização e autorização coerentes; evoluir sem
complexidade distribuída prematura; distinguir intenção de capacidade comprovada.
*Decisões:* monólito moderno · DDD seletivo · isolamento organizacional.
*Limites declarados:* sem alegação de adoção, escala ou produção; filas,
auditoria e portabilidade fora da narrativa até haver evidência.

**Maybe** — arquitetura para PHP legado · implementado
`github.com/gabrielalmir/maybe`
Erros e ausência viram estados explícitos, adotados gradualmente nas bordas de
sistemas PHP 7.4.
*Restrições:* compatibilidade com PHP 7.4; adoção gradual; concorrência por
processos com fronteiras de segurança claras.
*Decisões:* erros explícitos · adoção nas bordas · async como processo.
*Limites declarados:* async não substitui filas duráveis nem supervisão; a
aplicação segue responsável por idempotência e recuperação.

### Laboratórios técnicos

| Projeto | Pergunta que investiga | Status |
| --- | --- | --- |
| **Hush** (`/hush`) | O que um servidor compatível com RESP precisa tornar explícito sobre memória e concorrência? | implementado |
| **Resulta** (`/resulta`) | Como manter API total e erros explícitos sem perder ergonomia entre ESM e CJS? | implementado |
| **MCP AnimagineXL** | Como expor geração de imagem por MCP e REST sem esconder a fronteira de GPU? | experimental |
| **MCP Qwen3-TTS** | Onde ficam os limites entre síntese, batching e clonagem de voz? | experimental |

Limites declarados em comum: são laboratórios, não produtos; capacidade e
latência dependem de modelo e hardware; sem alegação de uso em produção.

### Open source

**PhotoGIMP** — `github.com/Diolinux/PhotoGIMP`
Contribuição direta no período principal; hoje organização de issues, revisão e
aprovação de mudanças. O LinkedIn descreve o papel como "principal mantenedor".

---

## Escrita

| Artigo | Tema | Data |
| --- | --- | --- |
| Como uma Mudança Reduziu em 90% o Carregamento de um Sistema Crítico | relato anonimizado: medir o fluxo, achar o gargalo dominante | ago/2024 |
| Desenvolvimento não é 8 ou 80 | recado a quem começa; carreira | nov/2025 |
| A Verdade Sobre Escolher Tecnologias no Backend | o erro não é escolher errado, é não escolher | nov/2025 |
| Para de Querer Criar o Portfólio Perfeito | autenticidade e evolução sobre perfeição | nov/2025 |

---

## Processo declarado

1. **Observar** — seguir o fluxo inteiro antes de escolher uma ferramenta.
2. **Decidir** — tornar restrições e trade-offs visíveis.
3. **Verificar** — comparar evidências e desenhar recuperação.
4. **Compartilhar** — escrever para que o trabalho não dependa só dele.

Como conta cada trabalho: pela restrição, pela decisão e pelo que consegue
provar — sem reconstruir contextos confidenciais.

## Camada pessoal

Café (uma ideia quase sempre começa com café) · programação (código é meio,
clareza é parte da entrega) · anime (histórias construídas quadro a quadro) ·
jogos (aprendo, salvo, tento de novo) · Linux (prefiro entender as camadas antes
de abstraí-las).

---

## Reconciliação

O `Profile.pdf` foi confirmado como fonte correta (2026-09-07). O site foi
ajustado a partir dele:

- **CTC (ago/2023 — abr/2026)** passou a existir na trajetória publicada, com o
  −90%, a migração para cloud e as integrações SAP/TOTVS via OData atribuídos a
  esse período.
- **Laboratório Cristália** teve o período corrigido de `2023—presente` para
  `abr 2026—presente` e o papel para *Analista de Sistemas Pleno*; o resumo
  agora descreve a atuação real (sistemas corporativos, ERP, conformidade) em
  vez de herdar o resultado que era da CTC.
- **Diolinux** passou a `mai 2013—ago 2016`, papel *Desenvolvedor full-stack*.
- A ordenação da linha do tempo passou a usar o ano inicial do período, não a
  comparação textual — que quebraria com períodos escritos por extenso.

Pontos que permanecem em aberto, por serem decisão editorial e não erro factual:

1. **"Atuação independente" (2016—2023)** existe só no site. O PDF não a
   contradiz — apenas não lista trabalho autônomo. Mantida.
2. **PhotoGIMP.** O LinkedIn diz "principal mantenedor"; o site diz "contribuí
   na evolução e hoje participo da organização e revisão". A formulação do site
   é a conservadora e é a coberta pelo release gate de claims. Mantida como
   está — subir para "principal mantenedor" exigiria decidir pelo gate.
3. **`docs/curriculo.md`** ainda descreve a CTC como emprego atual e usa o
   título antigo. Atualizado apenas quanto a esses dois pontos.
