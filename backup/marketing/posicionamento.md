# Posicionamento — copy pronta por plataforma

Gerado em 2026-09-07. Execução da Parte 2 e 3 do plano de direcionamento de carreira.
GitHub em inglês; redes em PT-BR. Instagram (@momentoalmir) fica pessoal e fora deste documento.

## Tese (uma frase, repetida em todo lugar)

**PT:** Construo backend e integrações onde rastreabilidade e continuidade operacional são requisito de produto — e levo essa disciplina para sistemas de IA.

**EN:** I build backend systems and integrations where traceability and operational continuity are product requirements — and bring that discipline to AI systems.

## Três pilares (filtro de publicação)

1. **Backend em ambiente regulado** — ERP, integrações SAP/TOTVS, conformidade, migrações.
2. **Dados na prática** — relatórios multi-fonte, pipelines, o serviço de bulas.
3. **IA como componente de sistema** — MCP, avaliação, guardrails, GPU local vs cloud.

Se um post não cabe em um dos três, não é publicado.

## Provas reutilizáveis

- −90% no tempo de carregamento de um sistema crítico de SAC.
- −98% no tempo de busca de bulas (SAP ↔ TOTVS, serviço Python).
- Responsável técnico da migração de sistema legado e auditado para TOTVS Cloud.
- PhotoGIMP: **"contribuí na evolução; hoje participo da organização e revisão"**.
  Nunca "principal mantenedor" — é a claim coberta pelo gate de release.

---

# LinkedIn (PT-BR)

## Headline

```
Analista de Sistemas Pleno · Backend, Dados e AI Systems · Node.js/TypeScript, Python, PHP · Integrações ERP em ambiente regulado
```

## Sobre

```
Construo backend e integrações onde rastreabilidade e continuidade operacional
são requisito de produto — não detalhe de implementação.

Trabalho desde 2013 com sistemas que outras pessoas precisam operar depois que
eu saio da sala: ERP, integrações, APIs e aplicações corporativas em ambiente
regulado, onde uma decisão técnica mal documentada vira um problema de
conformidade meses depois.

Alguns resultados:
· Reduzi ~90% o tempo de carregamento de um sistema crítico de atendimento.
· Fui responsável técnico da migração de um sistema legado e auditado para o
  TOTVS Cloud.
· Construí um serviço em Python que mapeia bulas entre SAP e TOTVS e reduziu
  98% o tempo de busca.

Hoje sou Analista de Sistemas Pleno no Laboratório Cristália, trabalhando com
PHP, Node.js e TypeScript junto às áreas de Qualidade, RH, Compras, Jurídico e TI.

Estou levando essa mesma disciplina para sistemas de IA: servidores MCP,
avaliação, guardrails, observabilidade e a decisão entre inferência local e
cloud. IA como componente de sistema, que precisa de teste e revisão humana —
não como mágica.

No open source, contribuí na evolução do PhotoGIMP e hoje participo da
organização e revisão do projeto.

Stack: TypeScript/Node.js · Python · PHP · PostgreSQL · Docker · AWS · CI/CD

Dossiês de arquitetura e laboratórios: gabrielalmir.com.br
```

## Ajustes pontuais

- **Banner:** `docs/banner-linkedin.jpg` (1584×396).
- **Destaques (nesta ordem):** site → README do GitHub → artigo dos −90% → artigo das bulas.
- **Experiência:** alinhar com `backup/curriculo.md`, que já está reconciliado com o Profile.pdf.
- **Corrigir:** o texto atual diz "principal mantenedor do PhotoGIMP" e "mais de 5 anos".
  A primeira contraria a copy aprovada; a segunda subestima (são desde 2013).

---

# YouTube (PT-BR)

- **Renomear** @avlye → Gabriel Almir. Banner: `docs/banner-youtube.jpg` (2560×1440,
  conteúdo dentro da área segura de 1546×423).
- **Descrição do canal:**

```
Decisões técnicas de backend, dados e IA — explicadas com o contexto que levou
a elas, os limites que ficaram de pé e o que eu faria diferente.

Node.js/TypeScript · Python · PHP
gabrielalmir.com.br
```

- **Formato único:** "Decisão técnica em 8 minutos" — tela + voz, sem edição pesada.
  Um dossiê do site = um vídeo.
- **Backlog (6 meses, 1 por mês):**
  1. Maybe — por que erros explícitos em PHP 7.4 legado
  2. Resulta — API total sem perder ergonomia entre ESM e CJS
  3. Pimbas — preservar contratos durante uma migração
  4. Saturno — monólito modular em vez de distribuir cedo demais
  5. MCP AnimagineXL — expor GPU por MCP sem esconder a fronteira
  6. Hush — o que um servidor RESP precisa tornar explícito
- Conteúdo antigo do @avlye fora dos três pilares: **despublicar**, não deletar.

---

# Twitter/X (PT-BR)

- Handle unificado: verificar disponibilidade de `gabrielalmir`.
- **Bio:**

```
Backend, dados e AI systems. Integrações ERP em ambiente regulado.
TypeScript · Python · PHP
gabrielalmir.com.br
```

- **Uso: distribuição, não criação.** Zero conteúdo exclusivo.
  - Cada post do LinkedIn → 1 tweet + link.
  - Cada vídeo → thread de 3–4 tweets com os pontos principais.

---

# Cadência (2–3 h/semana)

| Quando | O quê | Tempo |
|---|---|---|
| Semanal | 1 post LinkedIn + replicar no Twitter | 45 min |
| Semanal | 1 pendência de repo (tabela 1a/1b do plano) | 60 min |
| Mensal | 1 vídeo "Decisão técnica em 8 minutos" | 2 h no mês |
| Trimestral | Atualizar "Current focus" no README, revisar pinned | 30 min |

## Primeiro mês

1. **Semana 1** — veto do GitHub (feito), pinned, topics (feito).
2. **Semana 2** — LinkedIn: headline, sobre, banner, corrigir PhotoGIMP.
3. **Semana 3** — YouTube renomeado + primeiro vídeo (Maybe).
4. **Semana 4** — mergear a licença do Pimbas; começar as pendências do 1b.
