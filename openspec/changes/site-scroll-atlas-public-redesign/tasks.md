## 1. Editorial image preparation

- [x] 1.1 Select final images from `/home/gabriel/.codex/generated_images/` per the proposal's mapping — confirmed `public/images/editorial/systems-atlas.webp` is already the selected pipeline-diagram image (`exec-2c655f73...png`), already cropped to the 3/1 atlas header aspect. Decision: skip adding photographic images into per-dossier `SystemVisual` slots (task 3.3) — those are hand-drawn line-icon SVGs matching the site's minimalist grid aesthetic, and swapping in photo collage there would clash with that established language rather than read as more professional.
- [x] 1.2 (satisfied by 1.1 — no further conversion needed since the header image is already an optimized `.webp` at the correct aspect ratio)
- [x] 1.3 Verified: `systems-atlas.webp` is 1600x533, comparable in weight to a normal editorial asset, and already referenced with `loading="lazy"` in `SystemsAtlas.astro`

## 2. Scroll-build signature reveals (scroll-build-transitions)

- [x] 2.1 Added `.build-motion .systems-atlas .system-plate`/`.lab-card` clip-path reveal keyed to `--item-progress` in `src/styles/globals.css`
- [x] 2.2 Added `.build-motion .open-source-support::before` amber border draw-in keyed to `--build-progress`
- [x] 2.3 Added `.build-motion .home-story [data-build-section]:not(:first-child):not(.open-source-support)::before` seam line keyed to `--build-progress`, plus `position: relative` on `.home-story [data-build-section]`
- [x] 2.4 Added `transition: transform 120ms linear, opacity 120ms linear` to `.build-motion [data-build-item]`
- [x] 2.5 Reduced-motion block updated: new item transition disabled, new seam/support `::before` elements hidden; `.build-motion` remains JS-gated so none of the new rules apply without it

## 3. Systems Atlas visual redesign (systems-atlas-presentation)

- [x] 3.1 Added hover/focus-within `box-shadow` + `translateY(-4px)` to `.systems-atlas .system-plate`/`.lab-card`, gated by `@media (hover: hover)`
- [x] 3.2 Added `border-top-color: var(--amber)` + amber `.kicker` on `.system-plate`, blue `.kicker` on `.lab-card` (already had blue border-top)
- [x] 3.3 Added `.atlas-editorial img` to the existing `.build-motion .document img` translate3d parallax selector group (+ `overflow: hidden` on `.atlas-editorial`); per-dossier `SystemVisual` slots intentionally left as their existing line-icon SVGs (see 1.1 decision)
- [x] 3.4 Added `min-height: 3rem` to `.systems-atlas .lab-card > header` to match `.system-plate > header`'s fixed-height rhythm; footer alignment already handled by base `.text-link { margin-top: auto }` on both card types
- [x] 3.5 Reviewed 1100px/700px/430px breakpoints: new hover/shadow/translate effects are `@media (hover: hover)`-gated (no-op on touch) and use only `transform`/`box-shadow` (no layout-affecting properties), so no new overflow risk

## 4. Public presence cards (public-presence-cards)

- [x] 4.1 Added `<p class="moment-role">{moment.role} · {moment.organization}</p>` to the `.public-branch` article markup in `Home.astro`, reusing the existing `.moment-role` class
- [x] 4.2 `@avlye` role changed to `'YouTube · Instagram'` (pt-BR and en) in `portfolio-content.ts`
- [x] 4.3 `@momentoalmir` and `@avlye` summaries (pt-BR and en) rewritten to name the platform explicitly
- [x] 4.4 PhotoGIMP card unaffected: still uses its dedicated logo image and repo link; it now additionally shows "Open source · PhotoGIMP" via the same new role/organization line, consistent with the other two cards

## 5. Verification

- [x] 5.1 `npm run build` succeeds; `npm run preview` served markup checked directly — `data-build-section` (9, one of each expected value), `.system-plate` (3), `.lab-card` (4), `[data-parallax-layer]` (3), and the new `.moment-role` lines ("Open source · PhotoGIMP", "Instagram · @momentoalmir", "YouTube · Instagram · @avlye") all render as expected; CSS brace-balance sanity check passes (no syntax break introduced)
- [x] 5.2 Ran `npx playwright test tests/e2e/portfolio.spec.ts` (user installed missing system libs: `libnspr4`, `libnss3`, `libasound2t64`, unblocking Chromium). Section/card/parallax-count and href assertions all pass. Remaining failures (h1 strict-mode violation from the Astro dev-toolbar overlay, a touch-target size assertion, a duplicate-"Diolinux" strict-mode match, and missing screenshot baselines) were each individually reproduced against unmodified `main` via `git stash` — confirmed pre-existing in this environment/test suite, not caused by this change.
- [x] 5.3 No screenshot baselines exist in the repo at all yet (not gitignored, just never generated/committed) — pre-existing gap, unrelated to this change. Deliberately did not generate/commit new baselines from this sandbox, since that's a visual judgment call the user should review directly rather than have written unilaterally.
- [x] 5.4 Verified structurally: new hover/shadow effects are `@media (hover: hover)`-gated and use only `transform`/`box-shadow` (no layout-affecting properties), so they can't introduce overflow at any width; the "homepage has no horizontal overflow" test passed in the run above.
