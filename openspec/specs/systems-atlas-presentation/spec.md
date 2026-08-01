## Purpose

Defines the visual presentation requirements for the "02 / Systems Atlas" section's dossier and lab cards, independent of the underlying content data, so the section reads as polished and professional as the rest of the site.

## Requirements

### Requirement: Dossier and lab cards show interactive depth
Each `.system-plate` and `.lab-card` SHALL visually respond to hover and keyboard focus with a lift and shadow treatment consistent with the site's existing editorial "stamped" look, on pointer devices that support hover.

#### Scenario: Hovering a dossier card lifts it
- **WHEN** a pointer hovers over a `.system-plate` on a device that supports hover
- **THEN** the card shows a shadow and a small upward translation not present in its resting state

#### Scenario: Touch devices are unaffected
- **WHEN** the site is viewed on a touch-only device (no hover support)
- **THEN** hover-only lift/shadow effects do not apply and cards remain fully usable

### Requirement: Dossiers and labs are visually distinguishable by color coding
Dossier cards and lab cards SHALL each use a consistent accent color (already established: amber for dossiers, blue for labs) applied to both their card border/accent and their kicker label, so a visitor can distinguish the two groups without reading the section heading.

#### Scenario: Lab card kicker matches its accent color
- **WHEN** a `.lab-card` is rendered
- **THEN** its status kicker and top border share the same blue accent color

### Requirement: Systems Atlas uses editorial imagery
The Systems Atlas section header SHALL display editorial illustration imagery sourced from `public/images/editorial/`, applying the existing scroll-parallax image treatment used elsewhere on the homepage.

#### Scenario: Atlas header image parallaxes on scroll
- **WHEN** motion is not reduced and the visitor scrolls the Systems Atlas header into view
- **THEN** its editorial image translates at a different rate than the surrounding content, consistent with the site's existing image parallax pattern

### Requirement: Card structure and content are unchanged
The visual redesign SHALL NOT change the number of dossier or lab cards, their content, or their outbound links.

#### Scenario: Dossier and lab counts remain fixed
- **WHEN** the Systems Atlas section is rendered in either locale
- **THEN** it contains exactly 3 `.system-plate` elements and exactly 4 `.lab-card` elements, linking to the same project slugs as before
