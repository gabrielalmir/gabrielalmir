## Context

The homepage's scroll-build system (`src/components/Home.astro` rAF script + `src/styles/globals.css` `.build-motion .*` rules) already computes `--build-progress` per `data-build-section` and `--item-progress`/`--parallax` per `data-build-item`, and several sections (hero, proof, trajectory, process, personal, writing) each have a bespoke CSS rule keyed off those variables. Systems Atlas and open-source-support currently rely only on the generic item fade. The Systems Atlas cards (`.system-plate`, `.lab-card`) are flat-bordered with no hover/depth treatment. The "Em público" trajectory cards render `moment.summary` and an image but never `moment.role`/`moment.organization`. `tests/e2e/portfolio.spec.ts` pins exact counts (9 `data-build-section`, 3 `.system-plate`, 4 `.lab-card`, 3 `data-parallax-layer`) and specific hrefs/text that must keep passing, plus full-page and build-final screenshots that will need re-baselining after the visual change. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Extend the existing scroll-build CSS pattern (no new JS, no new animation library) to cover the two sections lacking a signature reveal, plus an inter-section seam transition.
- Elevate the Systems Atlas cards visually using CSS only, plus new static editorial images already generated (no live image generation calls during implementation).
- Surface platform/handle on public-presence cards via small template + copy changes.

**Non-Goals:**
- No change to Astro/JS architecture, no view-transitions API, no new dependency (e.g. GSAP, framer-motion) despite framer-motion being present in the repo for React islands.
- No change to `SystemsAtlas.astro`'s data structure, card counts, or dossier/lab slugs.
- No redesign of unrelated sections (hero, proof, trajectory timeline itself, process, personal, writing) beyond the seam transition touching their edges.

## Decisions

- **Reuse `--build-progress`/`--item-progress` rather than introducing new custom properties.** The rAF script in `Home.astro` already sets these per section/item; new CSS rules for Systems Atlas, open-source-support, and the seam transition read the same variables scoped to `.build-motion .systems-atlas`, `.build-motion .open-source-support`, and a new `::before` seam selector. Alternative considered: a second IntersectionObserver-based system — rejected, would duplicate logic and risk drifting from the existing progress values the tests already assert on.
- **Seam transition as a pure-CSS `::before` per section**, sized/opacity driven by that section's own `--build-progress` (no new script hook needed since the value is already written to the section element's inline style).
- **Editorial images are pre-selected files, not generated at implementation time.** The mapping in proposal.md/Impact assigns specific existing PNGs (from `/home/gabriel/.codex/generated_images/`) to specific dossiers/labs; implementation copies, converts to `.webp`, and optimizes them into `public/images/editorial/` with descriptive filenames. Alternative considered: generating new bespoke images per card — rejected per user direction to delegate any further image generation/optimization to Codex separately, and because suitable assets already exist.
- **Dossier/lab color coding reuses existing tokens** (`--amber` for dossiers, `--blue` for labs, already used for `.lab-card`'s top border) rather than introducing new palette colors, to stay consistent with the rest of the site's ink/amber/blue/green system.
- **Hover/lift effects gated behind `@media (hover: hover)`** so touch devices don't get stuck hover states, matching the plan's mobile-safety note.
- **Public-presence platform label reuses the existing `.moment-role` class** already used for career/learning track cards, rather than introducing a new class, for visual consistency across all trajectory tracks.

## Risks / Trade-offs

- [Adding visible transforms to Systems Atlas cards could reintroduce horizontal overflow on narrow viewports] → Constrain new shadow/lift effects to `transform`/`box-shadow` only (no width/margin growth) and verify against the existing "no horizontal overflow" Playwright test.
- [New editorial images increase page weight] → Convert to `.webp`, size for the existing `.atlas-editorial` aspect ratio (3/1) and `SystemVisual` slots, and keep `loading="lazy"` as already used.
- [Playwright screenshot baselines (`build-final-*.png`, `home-pt-*.png`, `home-en-*.png`) will fail after the visual change] → Expected; regenerate with `--update-snapshots` and manually review the diff before committing, per the plan's verification section.
- [Seam transition selectors could accidentally apply to non-homepage pages reusing `.section`/shared classes] → Scope new seam CSS explicitly to `.home-story` descendants.

## Migration Plan

No data migration. Rollout is a normal PR: implement CSS/markup/copy changes, run `npx playwright test tests/e2e/portfolio.spec.ts`, update screenshot baselines, review diffs, merge. Rollback is a plain revert since no schema or persisted state changes.
