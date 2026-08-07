# Estudo comparativo: gabrielalmir × wodniack.dev

**Data:** 2026-08-07  
**Base local:** `~/projetos/gabrielalmir` (`gabrielalmir/gabrielalmir`)  
**Produção:** https://gabrielalmir.com.br/  
**Referência:** https://wodniack.dev/  
**Objetivo:** extrair *princípios transferíveis* de craft do Wodniack sem copiar o posicionamento de creative freelance nem violar o contrato de conteúdo/a11y/performance do site.

---

## 1. Posicionamento (não negociar)

| Dimensão | Wodniack | Gabriel (atual) |
|---|---|---|
| Produto | Experiência animada memorável | Decisão técnica legível e operável |
| Público | Agências / designers / hire | Recrutadores backend, pares, comunidade |
| Prova social | Awwwards, FWA, CSSDA, Webby, 140+ projetos | −90% medido, ambiente regulado, PhotoGIMP |
| Idioma | EN | PT-BR default + EN parity |
| Conteúdo sensível | Sites cliente públicos | Confidencialidade rígida (Cristália) |
| Stack de craft | Astro + Lenis + motion denso | Astro 7 + React islands + Framer scroll-build |

**Regra de ouro:** Wodniack vende *como a interface se move*. Você vende *como o sistema se comporta sob restrição*. Melhorias devem reforçar o segundo com o rigor visual do primeiro — não inverter a tese.

---

## 2. O que o Wodniack faz excepcionalmente bem

### 2.1 Identidade monotemática

- Campo cromático único (vermelho `#f40c3f` + preto `#160000`) em *toda* a página.
- Tipografia de display custom (`Bigger Display`, `Editorial New`, `Fraktion Mono`) como personagem principal.
- Hero = manifesto tipográfico (“CREATIVE DEVELOPER”), não biografia.

### 2.2 Header como superfície de negócio

- Nav curta: ABOUT · WORK · CONTACT.
- Sociais sempre visíveis (CodePen, LinkedIn).
- **CTA sticky de conversão:** “Available for freelance → Hire me”.
- **Toggle de contraste** (acessibilidade + assinatura de craft).
- Status geográfico: “Coding globally from France.”

### 2.3 WORK como espetáculo de evidência

- Seção `#work` com altura massiva (~10k px no DOM inspecionado).
- Grade de **sites reais** (previews/links para projetos live).
- O trabalho *é* a interface — zero dossiê textual na home.

### 2.4 Motivo visual recorrente

- Padrões binários / moiré / grade / raios como *assinatura de sistema*.
- Loading com mensagens de personalidade (“PLEASE WAIT WHILE I OVERTHINK THIS”) — charme de creative dev; **proibido no teu controlled-flow**.

### 2.5 About curto + mural de prêmios

- Dois parágrafos + lista densa de awards.
- Densidade de prova sem case studies longos na home.

### 2.6 Stack e polish

- Astro (mesmo núcleo que você).
- Smooth scroll (Lenis), seções com tipografia animada letra a letra.
- Meta/OG/theme-color consistentes com a marca.

### 2.7 Dívidas que **não** copiar

- Links de work com `innerText` vazio (rótulos só visuais → frágil para leitores de tela).
- Experiência pesada em JS; conteúdo de work pouco legível sem interação.
- Loader performático/teatral conflita com LCP e com teu spec.
- Um único idioma.

---

## 3. O que o teu site já faz melhor (proteger)

1. **Prova em 30 segundos** com métrica verificável (−90%), rigor regulado, comunidade (PhotoGIMP).
2. **Atlas de sistemas** com contrato explícito: contexto → decisão → evidência → limite.
3. **PT/EN** com rotas e conteúdo paralelos.
4. **Escrita em primeira pessoa** com honestidade sobre confidencialidade.
5. **Trajetória + processo + notes** — narrativa de engenheiro, não de vitrine de agência.
6. **OpenSpec + Playwright + budgets** em `docs/controlled-flow/experience-spec.md`.
7. **Scroll-build com `prefers-reduced-motion`** em `storytelling-controller.tsx` (já maduro).
8. **Sem dependência crítica de GitHub em runtime** (spec).

Visual em produção: editorial bone/ink/amber, hierarquia clara, alternância paper/ink, dossiês legíveis, contato final com e-mail. Craft sólido — menos “explodir a tela”, mais “caderno de decisões”.

---

## 4. Gaps relevantes (teu site × craft Wodniack)

### P0 — Conversão e presença no header

| Gap | Hoje | Wodniack | Direção Gabriel |
|---|---|---|---|
| CTA permanente | Só no rodapé da home (“Enviar e-mail”) | Hire me no header | Chip sticky: e-mail + LinkedIn; opcional “Aberto a conversas” |
| Status | Ausente | Available for freelance | Status honesto (ex.: “Backend · sistemas regulados · aberto a conversas”) sem fingir freelance full-time se não for o caso |
| Sociais no chrome | Quase só no corpo/trajetória | Header | Ícones LinkedIn/GitHub/Ko-fi discretos no header ou footer rico |

### P0 — Higiene de código e contrato de experiência

| Gap | Evidência |
|---|---|
| Spec antigo vs produção | `docs/controlled-flow/experience-spec.md` **proíbe** parallax/typing/glitch/cursor; produção **usa** parallax + scroll-build (`Home.astro`, `storytelling-controller.tsx`, openspec `scroll-build-transitions`) |
| Componentes mortos na árvore | `home-client.tsx`, `typing-effect.tsx`, `ui/glitch-text.tsx`, `custom-cursor.tsx`, `coffee-splash*`, `command-menu.tsx`, `controlled-flow-home.astro`, `vim-scroll.tsx`, `tech-marquee.tsx` — **não** montados por `pages/index.astro` |
| Canonical site | `astro.config.mjs` → `https://gabrielalmir.com` (sem `.br`); produção pública usa `.br` |

### P1 — WORK com mais “presença de produto”

- Dossiês são excelentes para engenharia; carecem do *impacto tátil* dos previews live do Wodniack.
- Maybe e Saturno já têm URL pública — subutilizadas como “janela do sistema”.
- Labs (Hush, MCP, Resulta) com ícone vazio / placeholder visual fraco vs dossiês ilustrados.

### P1 — Motivo de sistema mais memorável

- Grid sutil no hero e orbits decorativos existem, mas não formam uma **assinatura** tão legível quanto o binário/moiré do AW.
- Opcional alinhado à tese: caminho estado (`input → decision → output` / amber→green) como leitmotiv visual *único*, repetido com disciplina.

### P1 — Tipografia e hierarquia de display

- Geist cobre bem o editorial; falta um **display moment** controlado (uma linha de hero ou títulos de seção com mais peso/tracking) sem virar “creative developer clone”.
- Wodniack usa mono + serif editorial + ultra display; você usa sans + mono pontual — pode enriquecer *um* eixo (ex.: mono só em kickers/estados, display condensado no h1).

### P2 — Acessibilidade e preferência

- Contrast toggle do Wodniack é barato e marcante; casa com teu público e com AA.
- Garantir nomes acessíveis em cards e demos (não repetir o antipadrão de links mudos).

### P2 — Conteúdo ainda aberto no teu próprio spec

- Case flagship #3 (sistema distribuído público) ainda “selection pending” no controlled-flow.
- Flow interativo constraint→decision→result (`FlowStories`) existe no legado `controlled-flow-home` mas **não** está na home atual — oportunidade de reintroduzir *só* nos dossiês/case studies.

### P2 — Performance

- `StorytellingController` com `client:load` + Framer Motion compete com budget ≤70 KB JS inicial do controlled-flow.
- Medir bundle real pós-build; considerar `client:idle` ou scroll rAF vanilla (já houve openspec com rAF) se o budget estourar.

---

## 5. Melhorias recomendadas (priorizadas)

### Fase A — Fundação (1–2 PRs)

1. **Reconciliar doutrina de motion**  
   - Atualizar `experience-spec.md` para refletir scroll-build + parallax *limitado* do openspec, ou reverter parallax se a doutrina antiga vencer.  
   - Uma fonte de verdade.

2. **Quarentena de legado**  
   - Mover componentes não referenciados para `src/_archive/` ou deletar com commit explícito.  
   - Reduz ruído cognitivo e risco de “voltar o glitch”.

3. **Canonical / domínio**  
   - Alinhar `site` no Astro, `hreflang`, sitemap e redirects `.com` ↔ `.br`.

4. **Header de ação**  
   - CTA `mailto:` + LinkedIn.  
   - Status textual curto (editável em `portfolio-content.ts`).  
   - Manter nav atual (Sistemas / Trajetória / Processo / Contato).

### Fase B — Craft transferível do Wodniack (sem copiar a pele)

5. **Contrast mode**  
   - `data-theme="ink" | "paper"` ou high-contrast.  
   - Preferência em `localStorage`; respeitar `prefers-color-scheme` só se não conflitar com a identidade paper-first.

6. **Assinatura visual de sistema**  
   - Elevar `input → decision → output` / estados amber-green a motivo de marca (SVG/CSS, sem loader teatral).  
   - Usar no hero, no fim do contato (nó “verified”) e nos dossiês.

7. **WORK com janelas live**  
   - Para Maybe/Saturno: frame ou captura atualizada + link “Abrir sistema” com peso visual ≥ “Abrir dossiê”.  
   - Labs: ícones/diagramas mínimos consistentes (hoje vários slots vazios).

8. **Micro-motion de seção (opcional)**  
   - Stagger de kickers/títulos sob scroll-build já existente.  
   - **Não** letter-split massivo nem smooth-scroll Lenis se prejudicar a11y/orçamento.

9. **Display type pontual**  
   - Avaliar uma face display self-hosted (licença ok) só para h1/h2 de home, mantendo Geist no corpo.

### Fase C — Conteúdo e profundidade

10. **Fechar case flagship #3** com repo público atribuível (Hush / Resulta / Astrum / etc. conforme critérios do spec).  
11. **Reativar narrative path** constraint→decision→result nas páginas `/projects/[slug]` (não necessariamente na home).  
12. **Prova social estruturada** (sem inventar award): PhotoGIMP role, FATEC concluída, maratonas como *raciocínio sob pressão* (já narrado — só empacotar em faixa densa estilo “awards wall” mas honesta).

### Fase D — Medição

13. Lighthouse mobile PT + EN; checar budgets do experience-spec.  
14. Playwright: header CTA, contrast toggle, reduced-motion, contagens openspec.  
15. Teste de 30s com 3–5 pessoas (recrutador / dev / leigo técnico).

---

## 6. O que *não* fazer (anti-padrões se copiar Wodniack)

- Loader com copy “overthinking” / fake progress.
- Página que esconde prova atrás de animação.
- Monocromia extrema que quebre AA em body text.
- Esvaziar dossiês em favor só de screenshots bonitos.
- Remover bilíngue.
- Custom cursor / glitch / typing loop (legado já tenta puxar isso).
- WORK de 10k px decorativo sem headings e nomes acessíveis.
- Posicionar-se como “creative developer freelance” se a tese continua sistemas/backend.

---

## 7. Mapa de arquivos relevantes

| Área | Caminho |
|---|---|
| Home produção | `src/components/Home.astro` |
| Atlas | `src/components/SystemsAtlas.astro` |
| Shell/nav | `src/components/Shell.astro` |
| Motion | `src/components/storytelling-controller.tsx` |
| Copy | `src/lib/portfolio-content.ts` |
| Tokens CSS | `src/styles/globals.css` (`:root` ink/paper/amber…) |
| Spec experiência | `docs/controlled-flow/experience-spec.md` |
| Spec scroll atual | `openspec/specs/scroll-build-transitions/spec.md` |
| Config site | `astro.config.mjs` |
| E2E | `tests/e2e/portfolio.spec.ts` |
| Legado (não montado) | `home-client.tsx`, `controlled-flow-home.astro`, `glitch-text`, `typing-effect`, `custom-cursor`… |

---

## 8. Princípios de adaptação (checklist de design)

Ao puxar uma ideia do Wodniack, ela só entra se:

- [ ] Reforça “restrições → caminhos confiáveis”
- [ ] Funciona com JS desligado no conteúdo crítico
- [ ] Tem equivalente reduced-motion
- [ ] Tem rótulo acessível (não só visual)
- [ ] Cabe no budget de performance
- [ ] Não expõe detalhe confidencial
- [ ] Tem paridade PT/EN
- [ ] Não parece um skin vermelho de Awwwards colado em cima do caderno editorial

---

## 9. Síntese executiva

O teu portfólio já é **mais maduro em tese e conteúdo** do que a maioria dos clones de creative dev. O Wodniack ganha em **intensidade de marca, CTA de header, espetáculo de work live e motivo visual obsessivo**.

O ganho máximo para Gabriel não é “ficar igual ao AW”. É:

1. **Header que fecha conversa** (status + hire/mail).  
2. **Work com janelas de sistema real** onde o código é público.  
3. **Uma assinatura de sistema** (estados/fluxo) tão memorável quanto o moiré vermelho — mas sua.  
4. **Limpar legado e unificar a doutrina de motion**.  
5. **Contrast mode** como craft + a11y.

Próximo passo natural: transformar a Fase A+B em change OpenSpec + tasks executáveis.
