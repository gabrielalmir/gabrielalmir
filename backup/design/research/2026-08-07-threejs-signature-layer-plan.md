# Next-level craft: Three.js signature layer

**Status:** implemented (P0 hero) on `feat/threejs-signature-layer` — atlas/contact polish still P1  
**Branch intent:** document goals, FR/NFR, architecture, fidelity, risks, phased delivery  
**Related:** `docs/research/2026-08-07-wodniack-comparison.md`, craft refresh on `main` (signal rail, hero path, system windows)

### Runtime map (P0)

| Path | Role |
|---|---|
| `src/webgl/can-run-signature.ts` | FR-4 gate |
| `src/webgl/signature-scene.ts` | mount/unmount Three scene |
| `src/components/SignatureField.tsx` | lazy island |
| `?webgl=0` / `PUBLIC_THREE_SIGNATURE=0` | force off |
| `?webgl=1` | force attempt on |

---

## 1. Goal

Elevar a **assinatura visual e espacial** do portfólio com uma camada WebGL (Three.js) que:

1. Reforce a tese *restrições → caminhos confiáveis / estados de sistema*
2. Tenha originalidade de craft comparável a portfolios creative-dev (ex.: wodniack.dev) **sem** copiar estética vermelha/Awwwards
3. Preserve conteúdo legível, bilíngue, a11y, confidencialidade e budgets de performance

**Não-objetivo deste ciclo:** reescrever o site em SPA; Three.js como *camada opcional de presença*, não como único meio de comunicação.

---

## 2. Positioning (non-negotiable)

| Princípio | Implicação |
|---|---|
| Conteúdo primeiro | HTML/CSS da home continua completo com JS off |
| Motion com significado | Geometria = fluxo/estados/fronteiras, não partículas decorativas aleatórias |
| Reduced motion | WebGL desliga ou vira still frame estático |
| Mobile mid-tier | Fallback 2D se GPU fraca / save-data / low-end |
| Tese backend/sistemas | Evitar “creative developer freelance” skin |

---

## 3. Functional requirements

### FR-1 — Hero field (P0)

- Canvas WebGL no hero (atrás do copy e do retrato; `pointer-events: none` exceto se houver hit-area explícita documentada).
- Motivo: **grafo de estados / caminho** (nós IN → DEC → OUT → OK) em espaço 3D sutil, perspectiva baixa, paleta paper/ink/amber/green.
- Parallax leve ligado ao scroll já existente (`--page-progress`, `--hero-draw`) — Three.js *lê* progresso, não inventa segundo scroll engine.
- Controles: nenhum obrigatório; orbit auto opcional e desligável.

### FR-2 — Atlas / dossiers accent (P1)

- Ao entrar no viewport do Systems Atlas, transição de material/linha que “ilumina” o dossiê ativo (scroll-linked).
- Alternativa mais barata: só hero no P0; atlas fica 2D craft atual.

### FR-3 — Contact verified bloom (P1)

- No trecho contact, nó final em verde (verified) com bloom controlado (tone mapping + emissive baixo), uma vez por sessão.

### FR-4 — Capability gating (P0)

- Detectar e **não montar** WebGL quando:
  - `prefers-reduced-motion: reduce`
  - `navigator.connection.saveData`
  - falha de `WebGLRenderingContext` / context lost
  - device memory ≤ 4 (quando disponível) **ou** falha de smoke bench
- Com JS off: zero canvas; hero 2D atual permanece.

### FR-5 — Paridade PT/EN

- Labels 3D (se houver texto em mesh/texture) vêm de `portfolio-content` / props de locale.
- Preferir **sem texto em GPU** (só geometria + UI HTML).

### FR-6 — Dev / ops

- Feature flag: `PUBLIC_THREE_SIGNATURE=1` ou query `?webgl=1` em preview; default on em prod só após Lighthouse gate.
- Documentar como desligar em incidente.

---

## 4. Non-functional requirements

| ID | Requisito | Alvo |
|---|---|---|
| NFR-P1 | JS inicial da home (compressed) | não regredir > +40 KB gzip vs baseline atual sem Three; Three **lazy** após idle/hero visible |
| NFR-P2 | Chunk Three + scene | code-split dinâmico; carregar só se FR-4 passar |
| NFR-P3 | LCP | hero image/text LCP não pode esperar WebGL; canvas `aria-hidden` |
| NFR-P4 | INP | rAF único; sem raycast contínuo no pointer se não necessário |
| NFR-P5 | CLS | canvas com dimensões reservadas (absolute fill do hero middle layer) |
| NFR-A1 | A11y | canvas `aria-hidden="true"`; sem info exclusiva no WebGL |
| NFR-A2 | Reduced motion | still ou unmount |
| NFR-S1 | Segurança | sem shaders remotos; assets locais |
| NFR-M1 | Manutenção | scene isolada em `src/webgl/`; API estreita `mount(el, opts) / unmount()` |

---

## 5. Architecture

```text
Home.astro
  └─ hero middle layer
       ├─ (existing) CSS orbits / HeroSignalField SVG  ← keep as progressive enhancement floor
       └─ <div data-signature-canvas>                   ← mount point
            └─ client island: SignatureField.tsx
                 └─ dynamic import('../webgl/signature-scene')
                      └─ three (tree-shaken) + custom scene

storytelling-controller.tsx
  └─ writes --page-progress, --hero-draw (unchanged contract)
  └─ SignatureField reads CSS vars or custom event (no second scroll listener if possible)
```

### Package choice

| Opção | Prós | Contras |
|---|---|---|
| **three** (recomendado) | padrão, docs, tree-shake parcial com imports nomeados | peso se importar mal |
| drei/r3f | DX React | mais deps, mais bundle; overkill para 1 scene |
| vanilla WebGL | mínimo | custo de manutenção alto |

**Decisão proposta:** `three` vanilla + thin React/Astro island. Avaliar `three/webgpu` só depois de suporte estável; começar WebGL2 renderer.

### Scene concept (“State Lattice”)

- Plano de grid editorial (paper) com linhas ink de baixa opacidade.
- Curva tipo Catmull-Rom / tube sutil alinhada ao path 2D atual (mesma narrativa).
- 4 nós com emissive amber → green no último conforme progresso.
- Fog suave paper-colored para fundir com CSS.
- Sem modelos GLTF pesados no P0 (geometria procedural).

### Integration with existing craft

- **Não remover** signal rail / SVG path no P0 — WebGL *complementa*; se WebGL falhar, 2D já carrega a assinatura.
- Após estabilidade, opcionalmente reduzir CSS orbits para evitar competição visual (flag).

---

## 6. Fidelity criteria (definition of done)

### Visual

- [ ] Em desktop full-motion, hero transmite “sistema vivo” em ≤ 3 s sem bloquear leitura do h1.
- [ ] Paleta só tokens do site (`--ink --paper --amber --green --blue`).
- [ ] Screenshot reduced-motion = still estável, sem drift de animação.
- [ ] Contrast mode ink: cena adapta cores (ler computed styles ou data-contrast).

### Technical

- [ ] `npm run build` + e2e desktop/reduced/no-js verdes.
- [ ] no-js: zero requests a chunk three.
- [ ] reduced-motion: three não anima (unmount ou freeze frame).
- [ ] Lighthouse mobile (lab): LCP/INP/CLS dentro dos budgets do experience-spec (±10% justificado).
- [ ] Bundle report anexado no PR de implementação (antes/depois).

### Content / brand

- [ ] Review do Commander: não parece clone Wodniack; reforça tese de sistemas.
- [ ] Nenhuma claim profissional nova sem aprovação.

---

## 7. Phased delivery

### Phase 0 — this draft PR

- Spec + diagramas + tasks OpenSpec-style
- Sem dependência `three` ainda

### Phase 1 — spike (follow-up PR)

- Branch `spike/three-signature-hero`
- Adicionar `three`, scene mínima em `/dev/signature` (rota só dev) ou query flag
- Medir bundle + FPS em notebook + 1 mobile
- Go/no-go escrito

### Phase 2 — hero production

- Island no hero + gating FR-4
- E2E: “three chunk not loaded when reduced / no-js”
- Perf gate

### Phase 3 — polish

- Atlas accent opcional
- Contact bloom
- Tunar com design review

---

## 8. Open questions (Commander)

1. **Intensidade:** sutil (quase blueprint) vs presença forte (mais “wow”)? Default: sutil-editorial.
2. **Interação:** pointer parallax leve ok ou só scroll-driven?
3. **Rota de spike:** página `/lab/signature` pública ou só local?
4. **Licença/assets:** procedural only no P0 (recomendado)?

---

## 9. Risks

| Risco | Mitigação |
|---|---|
| Bundle bloat | dynamic import + named imports; sem r3f no P0 |
| LCP regression | canvas não no LCP path; fetchpriority só na foto |
| A11y theater | aria-hidden; info no HTML |
| Manutenção shader | shaders curtos, comentados; prefer material standard no P0 |
| Competição com craft 2D | feature flag; reduzir CSS só depois de validar |
| Mobile heat/battery | FPS cap 30 em mobile; pause offscreen via IntersectionObserver |

---

## 10. Implementation task checklist (for implementer PR)

1. [ ] Baseline: `npm run build` + size of current home JS chunks  
2. [ ] `npm i three` + `@types/three` dev  
3. [ ] `src/webgl/signature-scene.ts` — mount/unmount API  
4. [ ] `src/components/SignatureField.tsx` — client:visible or idle  
5. [ ] Wire mount point in `Home.astro` hero middle  
6. [ ] Bridge scroll vars from CSS (`getComputedStyle` / `ResizeObserver`)  
7. [ ] Gating module `src/webgl/can-run-signature.ts`  
8. [ ] E2E cases (no-js, reduced-motion, happy path mount)  
9. [ ] Update `docs/controlled-flow/experience-spec.md` motion allowlist  
10. [ ] Lighthouse + note in PR  

---

## 11. Out of scope

- Three.js em blog/case pages  
- Physics engines  
- Audio reactive  
- Full-page WebGL takeover  
- Custom cursor + WebGL picking  

---

## 12. References

- Live craft: signal rail, hero SVG path, storytelling-controller scroll contract  
- Competitive study: `docs/research/2026-08-07-wodniack-comparison.md`  
- Three.js docs: https://threejs.org/docs/  
- Astro islands + client directives  
