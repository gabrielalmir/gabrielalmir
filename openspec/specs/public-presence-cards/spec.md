## Purpose

Defines what information the "Em público" (public presence) trajectory cards must surface so visitors can tell which platform each entry belongs to, rather than reading a generic summary with no attribution.

## Requirements

### Requirement: Public presence cards display their platform and handle
Each card in the trajectory's `public` track SHALL visibly display its platform name and handle/organization (e.g. "Instagram · @momentoalmir"), not only the summary text and an outbound link.

#### Scenario: Instagram card shows its platform
- **WHEN** the trajectory's "Em público" branch is expanded
- **THEN** the `@momentoalmir` card visibly shows "Instagram" and the handle `@momentoalmir`, in both pt-BR and en locales

#### Scenario: YouTube card shows its platform
- **WHEN** the trajectory's "Em público" branch is expanded
- **THEN** the `@avlye` card visibly shows its platform information and handle, in both pt-BR and en locales

### Requirement: Technology video content references both YouTube and Instagram
The `@avlye` technology video entry SHALL reference both YouTube and Instagram as places the content appears, rather than YouTube alone.

#### Scenario: Video entry mentions both platforms
- **WHEN** the `@avlye` public-presence card is rendered
- **THEN** its platform label and/or summary text mention both YouTube and Instagram

### Requirement: PhotoGIMP entry is unaffected
The existing PhotoGIMP open-source entry in the `public` track SHALL continue to render as before (its own logo treatment and "Open source" role), since it already communicates its context clearly.

#### Scenario: PhotoGIMP card unchanged
- **WHEN** the trajectory's "Em público" branch is expanded
- **THEN** the PhotoGIMP card still shows its dedicated logo image and repository link
