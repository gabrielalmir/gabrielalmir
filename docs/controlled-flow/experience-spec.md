# Controlled Flow — experience specification

## Homepage wire narrative

The page is a conventional, linear document. The flow interaction adds explanation; it never hides the complete text or replaces navigation.

| Order | Section | What a recruiter should learn | Primary visual behavior |
|---|---|---|---|
| 1 | Positioning | Gabriel turns invisible complexity into reliable flows. | A single amber path enters the page and resolves into the hero statement. |
| 2 | Immediate proof | 90% verified reduction, regulated-system experience, PhotoGIMP collaboration. | Three compact evidence blocks; no animated counters. |
| 3 | Flagship stories | Gabriel can optimize a protected professional system, steward public work, and reason about distributed reliability. | Selecting a story activates its constraint → decision → result path. All three summaries remain visible. |
| 4 | Working principles | Explicit states, recovery, evidence, supervised AI exploration. | The active path branches into four stable operating principles. |
| 5 | Human layer | He communicates across disciplines and designs for the people operating systems. | Portrait or approved personal artifact interrupts the system rhythm with warmer spacing and prose. |
| 6 | Selected writing | He can explain trade-offs without exposing confidential work. | Editorial list with topic, reading time, language availability, and clear link. |
| 7 | Contact | The next action is obvious. | The path ends in a verified green state beside email and LinkedIn links. |

### First 30 seconds

At 100% zoom on a typical laptop, the first viewport must include the positioning and at least the start of immediate proof. A single scroll reveals the three proof points and flagship story titles. No critical fact waits for animation, hover, carousel progression, or a GitHub response.

### Navigation and language

- Portuguese is always the default at `/`; do not redirect from browser language.
- English has equivalent routes below `/en/`, equivalent metadata, navigation, evidence qualifiers, and case-study depth.
- The language switch is persistently available in the header and footer. Switching remembers the explicit choice, but only applies it on a future root visit if the resulting behavior is clearly communicated and does not create an automatic redirect loop.
- Deep links switch to the equivalent localized page. Missing equivalents fall back to the other locale's homepage with a visible notice.

## Flagship case-study outlines

### 1. Critical loading — anonymized

Purpose: make the verified outcome immediate while demonstrating disciplined reasoning under confidentiality.

1. Summary: the exact bilingual copy from the content model.
2. Context: “critical system” and “regulated environment” only.
3. Constraint: performance mattered, while internal rules, data, and integrations could not be exposed.
4. Method: observe the complete user-visible path; isolate the dominant bottleneck; choose the smallest safe intervention; compare the same measure before and after.
5. Result: 90% reduction in loading time.
6. Limits: explicitly state that employer, architecture, volumes, components, failure modes, and implementation are withheld.
7. Reflection: reliable optimization begins with measurement and ends with evidence, not with a fashionable technique.

Forbidden: employer or client identity, pharmacy/medical/SAC references, ERP names, diagrams, synchronization descriptions, before/after absolute times, availability figures, schedules, code, infrastructure, data scale, internal alerts, department names, or estimated labor savings.

### 2. PhotoGIMP — public stewardship

Purpose: demonstrate sustained public contribution and collaborative maintenance without erasing collective authorship.

1. Origin and attribution: describe PhotoGIMP as a Diolinux community project and credit the official repository's authors and contributors.
2. Gabriel's major contribution period: exact dates and representative public contributions to be supplied and approved.
3. Present responsibility: issue organization and participation in review/approval, phrased as collaboration.
4. Constraint: cross-platform user expectations, compatibility, and a public review trail.
5. Decision examples: only attributable issues, pull requests, reviews, or commits from the official repository.
6. Result: continuity and traceable decisions; do not use popularity as a substitute for Gabriel's contribution.
7. Evidence panel: locally stored links and dated metadata, refreshed before publication.

Forbidden: “created by Gabriel,” “Gabriel's project,” sole-maintainer language, undated live metrics in narrative copy, or screenshots/assets without explicit rights confirmation.

### 3. Public distributed-systems project — selection pending

Purpose: carry the technical depth that confidential professional work cannot provide.

Selection requirements:

- Gabriel owns or has clearly attributable contributions in the public repository.
- A license permits display and reuse of selected material.
- The repository demonstrates an API boundary and asynchronous messaging.
- Reliability behavior is reproducible: at minimum, retry/idempotency, failure handling, or recovery can be tested or observed.
- The README explains how to run the evidence without a project-critical third-party service.
- No secrets, employer-derived code, copied architecture, or unlicensed assets are present.

Provisional narrative: accept work at an API boundary, persist or queue intent, process independently, expose state, and recover safely. Replace every provisional sentence with repository-grounded facts after selection.

## Motion storyboard

| Moment | Trigger | Full-motion behavior | Reduced-motion equivalent | Meaning |
|---|---|---|---|---|
| Entry | Initial render | Amber line draws once toward the hero over 350–500 ms. | Complete line appears immediately. | A flow is entering the system. |
| Proof | Proof enters viewport | Evidence labels resolve sequentially with 80–120 ms spacing; no number count-up. | All labels appear together. | Claims become verified states. |
| Story selection | Click, tap, Enter, or Space on a story control | Existing path dims; selected constraint, decision, and result segments illuminate in order over at most 600 ms. | Selected states change immediately. | The viewer follows causality. |
| Failure illustration | A case explicitly discusses failure | One segment changes to red and stops; recovery branch then moves to amber and ends green. | Red failure and green recovered states appear together with labels. | Failure is meaningful and recoverable. |
| Section continuity | Scrolling between major sections | A short connector preserves the active amber route; never tracks pointer position. | Static connector. | One operating philosophy connects the page. |
| Contact | Contact enters viewport | Final node changes from amber to green once. | Green verified node appears immediately. | The route has a clear outcome. |

Motion rules:

- Every animation must use opacity or transform where possible and remain under 700 ms for *state transitions*; continuous ambient loops (orbit, ticker, status pulse) are allowed only when decorative, `aria-hidden`, and disabled under `prefers-reduced-motion`.
- Motion stops after reaching a state for content-critical reveals; ambient signature motion may loop if it does not block reading.
- Disable smooth scrolling and sequencing under `prefers-reduced-motion: reduce`.
- Allowed signature motion (production + openspec): hero depth parallax (three layers), scroll-build section/item progress, hero path stroke (`--hero-draw`), page signal rail, slow orbit rotation, mono ticker, status pulse, verified bloom once at contact.
- Do not implement typing loops, glitch, scanlines, fake terminal chrome, fake loading screens, a custom cursor, or pointer-tracking decorative networks.
- The written constraint, decision, and result remain adjacent to each diagram and present in the DOM before interaction.

## Responsive behavior

- Small mobile (320–479 px): each case is a vertical sequence of three labeled blocks. No horizontal scroll, drag, or clipped diagram.
- Large mobile (480–767 px): same vertical sequence with a short vertical connector; touch targets are at least 44 × 44 CSS px.
- Tablet (768–1023 px): story selector may form a two-column arrangement, but reading order stays title → summary → constraint → decision → result.
- Laptop (1024–1439 px): selector and active path can share a row; complete inactive summaries remain available.
- Wide desktop (1440 px and above): cap text measure and canvas width; do not stretch paths simply to fill space.
- At 200% zoom, content reflows without two-dimensional scrolling and no control becomes hover-only.

## Accessibility contract

- One `h1`; section headings follow a logical hierarchy. Each case has a descriptive heading.
- Story selection uses native buttons or links. Selection is expressed with text and `aria-current` or `aria-pressed`, not color alone.
- Diagrams are either decorative when adjacent prose is identical, or have a short accessible description. Never expose dozens of meaningless SVG nodes.
- Focus indicators have at least 3:1 contrast against adjacent colors and are not obscured by sticky UI.
- Graphite/bone, amber/graphite, and green/graphite pairs must pass WCAG AA for their actual text size. Red is reserved for real failure and always paired with a label/icon.
- Keyboard order follows visual and document order. No global single-key shortcuts. Native cursor behavior is preserved.
- Links communicate destination; external links are identified without relying only on iconography.
- Language is declared per route. English adaptations preserve meaning and evidence status.

## Visual system tokens (framework neutral)

Exact values are candidates to validate during visual design, not production constants.

| Role | Candidate | Constraint |
|---|---|---|
| Graphite background | `#171816` | Primary dark field. |
| Bone foreground | `#F1EBDD` | Long-form text; verify contrast at body sizes. |
| Safety amber | `#F5A623` | Active flow and primary action, never large body copy without testing. |
| Verified green | `#47A36B` | Successful/verified state plus written label. |
| Failure red | `#D65A4A` | Meaningful failure only plus written label. |

Typography roles:

- Positioning: expressive condensed grotesk, locally hosted, with a system fallback and no layout shift.
- Narrative: humanist sans, locally hosted, 45–75 character line length.
- Evidence/state: monospace used only for small labels and verified values—not paragraphs or navigation.

## Performance budgets

Budgets apply to a cold mobile visit at the production origin and must be checked in both languages.

| Resource | Budget |
|---|---|
| Initial compressed HTML + critical CSS + route JavaScript | ≤ 170 KB |
| Initial route JavaScript, compressed | ≤ 70 KB |
| Fonts, initial route, compressed | ≤ 140 KB; maximum two families and only required subsets/weights |
| Hero image | ≤ 120 KB, responsive AVIF/WebP with intrinsic dimensions |
| All above-the-fold images | ≤ 180 KB |
| Third-party JavaScript | 0 KB preferred; any exception requires approval |
| Initial requests | ≤ 18 |

Outcome targets on representative mid-tier mobile hardware: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. The homepage's complete copy and locally stored project evidence render without JavaScript. GitHub is never a critical runtime dependency.

## Asset list

| Asset | Source/owner | Needed state | Rights and privacy gate |
|---|---|---|---|
| Primary portrait | Existing `public/me.webp`, Gabriel-owned status to confirm | Re-export responsive AVIF/WebP variants after approval | Written confirmation that Gabriel owns/controls publication rights. |
| Alternate portrait | Gabriel | Optional, natural horizontal crop for human layer | Same confirmation; no workplace background or badges. |
| Personal process artifact | Gabriel | One notebook page, sketch, or personal making artifact | Must contain no employer, client, personal third-party, or confidential information. |
| PhotoGIMP mark/screenshot | Official repository or Gabriel-owned source | Optional; use repository link first | Confirm license and attribution for each exact file; do not assume repository license covers every screenshot. |
| PhotoGIMP evidence snapshot | Official GitHub repository | Local structured record of approved PRs/issues/reviews, capture date, canonical links | Public facts only; refresh before launch. |
| Distributed-project evidence | Selected public repository | README excerpt, test output, and optional diagram derived solely from public code | Gabriel attribution and repository license required. |
| Flow graphics | Original site-native vector system | Produce during visual implementation | Abstract editorial model only; no employer architecture. |
| Fonts | Rights-cleared local files | Select during visual design | Web embedding license and subsetting permission required. |

No generated imagery, workplace assets, copied reference treatments, large icon bundles, mandatory video, or 3D payload.

## Validation matrix

### Content and confidentiality

- A five-person recruiter test can identify positioning, 90% result, regulated-context experience, and PhotoGIMP responsibility in 30 seconds.
- Gabriel signs off every professional sentence and the forbidden-detail audit.
- A reviewer can trace every public-project claim to a dated local record and canonical public URL.
- Search the built output for forbidden terms and legacy claims before release.

### Bilingual parity

- Route, metadata, navigation, headings, CTA intent, evidence status, qualifiers, and case depth map one-to-one.
- Review English as professional adaptation, including punctuation and accessible names; do not compare only key counts.
- Every language switch lands on an equivalent route or explains fallback.

### Accessibility and responsive

- Keyboard-only pass at all target widths.
- Screen-reader landmark, heading, control-name, selected-state, and diagram-description pass.
- Contrast check for default, hover, focus, active, verified, and failure states.
- 200% zoom/reflow and 320 CSS-pixel width pass without horizontal content loss.
- Reduced-motion screenshots show all final states without transitional dependency.

### Resilience and visual regression

- Disable JavaScript: positioning, proof, all project summaries, principles, writing, and contact remain readable and linked.
- Block GitHub: locally stored evidence and static project content remain complete.
- Capture both locales at 360 × 800, 430 × 932, 768 × 1024, 1280 × 800, and 1600 × 1000.
- Repeat core snapshots with reduced motion and with the second and third stories selected.
- Treat unexpected text clipping, path overlap, focus loss, or language-depth differences as release blockers.

