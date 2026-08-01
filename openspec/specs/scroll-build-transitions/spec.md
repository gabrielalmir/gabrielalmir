## Purpose

Defines the scroll-driven "assembly" behavior that reveals homepage sections and their items as the visitor scrolls, including per-section signature reveals, inter-section seam transitions, and accessibility fallbacks.

## Requirements

### Requirement: Every homepage section has a signature reveal effect
Each element marked `data-build-section` on the homepage SHALL apply a distinct, section-specific visual reveal (beyond a generic opacity/translateY fade) as its scroll progress increases, consistent with the reveal already implemented for hero, proof, trajectory, process, personal, and writing sections.

#### Scenario: Systems Atlas cards reveal progressively
- **WHEN** the visitor scrolls the Systems Atlas section into view
- **THEN** each `.system-plate` and `.lab-card` reveals with a distinct clip/inset-based transition tied to its own `--item-progress`, rather than only fading and shifting vertically

#### Scenario: Open-source support section reveals with a signature effect
- **WHEN** the visitor scrolls the `.open-source-support` section into view
- **THEN** the section applies a section-specific reveal effect (not only the generic item fade/translateY)

### Requirement: Sections are visually connected by a scroll-driven seam
Consecutive homepage sections SHALL display a divider/seam element whose visibility or extent is driven by the entering section's scroll progress, reinforcing continuity between sections.

#### Scenario: Seam draws in as a section enters
- **WHEN** a section crosses the reveal threshold and its `--build-progress` increases from 0
- **THEN** the seam element between it and the previous section transitions (e.g. scales or fades in) proportionally to that progress

### Requirement: Reveal transitions do not conflict with existing behavior
The added reveal and seam effects SHALL preserve all pre-existing scroll-build behavior: section and item counts, progress monotonicity, and the hero's three parallax depths.

#### Scenario: Section and parallax counts are unchanged
- **WHEN** the homepage is loaded
- **THEN** there are still exactly 9 elements with `data-build-section` and exactly 3 `[data-parallax-layer]` elements inside `[data-parallax-hero]`

#### Scenario: Progress remains monotonic while scrolling forward
- **WHEN** the visitor scrolls a section further into view
- **THEN** that section's `data-build-progress` value does not decrease

### Requirement: Reveal effects respect reduced motion preference
When the user's system requests reduced motion, none of the added reveal or seam transition effects SHALL apply transform, clip-path, or scale animation; content SHALL render in its final state immediately.

#### Scenario: Reduced motion disables new effects
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** the `.build-motion` class is not applied and none of the new Systems Atlas, open-source-support, or seam transition effects animate
