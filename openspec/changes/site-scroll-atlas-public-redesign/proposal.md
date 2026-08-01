## Why

The homepage's scroll-driven "build" effect (`data-build-section`/`data-build-item` in `src/components/Home.astro` + `src/styles/globals.css`) already gives most sections a bespoke assembly animation, but a few sections (Systems Atlas, open-source support) still fall back to a generic fade/translateY, breaking the "site assembling itself" narrative. Separately, the "02 / Systems Atlas" section reads flat compared to the rest of the site's editorial polish, and the "Em público" (public presence) trajectory cards hide which platform each entry is on, making them feel generic. All three gaps were identified together during a design review and should ship as one coordinated visual/content pass.

## What Changes

- Add per-section signature build/reveal effects for `.systems-atlas` (dossier/lab card reveal) and `.open-source-support`, following the existing `--build-progress`/`--item-progress` CSS pattern — no new JS libraries.
- Add a visual "seam" transition between sections that draws a divider line tied to scroll progress.
- Smooth the existing rAF-driven transform/opacity updates with a short CSS transition.
- Redesign `.system-plate`/`.lab-card` visuals in the Systems Atlas: hover/focus depth (shadow + lift), clearer dossier-vs-lab color coding, aligned card rhythm, and integrate existing pre-generated editorial illustrations (from `/home/gabriel/.codex/generated_images/`) as new images under `public/images/editorial/`.
- Show the platform/handle (e.g. "Instagram · @momentoalmir") on each "Em público" trajectory card instead of only image + summary + link, and update the `@avlye` entry's copy to reference both YouTube and Instagram.
- No structural/count changes to `SystemsAtlas.astro` markup (still 3 dossiers, 4 labs) or to the 9 `data-build-section` elements — existing Playwright assertions in `tests/e2e/portfolio.spec.ts` must keep passing.

## Capabilities

### New Capabilities
- `scroll-build-transitions`: Section-entry "assembly" animation behavior driven by scroll progress, including per-section signature reveals, inter-section seam transitions, and reduced-motion handling.
- `systems-atlas-presentation`: Visual presentation rules for the Systems Atlas section's dossier/lab cards (depth, color coding, editorial imagery), independent of its content/data structure.
- `public-presence-cards`: Display requirements for the "Em público" trajectory cards, including visible platform/handle and multi-platform references.

### Modified Capabilities
(none — no existing `openspec/specs/` capabilities to modify)

## Impact

- `src/components/Home.astro`: build-progress script, `data-build-item` markup, `.public-branch` card markup.
- `src/styles/globals.css`: `.build-motion .*` reveal rules (~1780-2090), `.systems-atlas .*` rules (~2714-2966), new seam-transition rules.
- `src/lib/portfolio-content.ts`: `public` track moment copy (pt-BR and en) for `@momentoalmir`/`@avlye`.
- `public/images/editorial/`: new optimized `.webp` assets sourced from `/home/gabriel/.codex/generated_images/`.
- `tests/e2e/portfolio.spec.ts`: existing assertions must continue to pass unmodified (section/card counts, hrefs); screenshot baselines will need regeneration after the visual change.
