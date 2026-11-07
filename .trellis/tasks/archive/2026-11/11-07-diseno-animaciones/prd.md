# PRD: Más diseño y animaciones (versión blanca)

## Context
The developer chose the white version (translated): "I want the white version, delete the
other one and upload the white changes, but before that add more design to everything and
also animations." Previous uncommitted impeccable polish (critique 29/40) is included.

## Requirements
1. Delete the gold version (`dorado.html`, `css/tema-dorado.css`).
2. More visual design across the page, without photos and without invented business facts.
3. Purposeful animations (impeccable animate guide), all with reduced-motion fallbacks and
   content that stays visible if animations do not run.
4. Commit and push only the white version to `tienda-de-zapatos-` (repo of proposal 1).

## Acceptance criteria
- [x] Gold files removed; `index.html` is the only page
- [x] Hero: title reveals line by line, category shoes "walk in", wine accent block behind the mosaic, arrow on the main button
- [x] Moving ribbon (marquee) of categories and types; pauses on hover; static under reduced motion
- [x] "Lo nuevo" carousel with arrows and scroll-snap (9 new models)
- [x] Cards: second colour on hover, staggered entrance on every filter change
- [x] Service strip with line icons; order form as a wine band; big wordmark in the footer
- [x] Ficha: colour change slides in, chosen size pops, size warning shakes
- [x] Header gets a soft shadow once scrolled
- [x] Entrance animations gated by `html.anima` (only when visible and motion allowed) + 2.5 s safety net that finishes stalled animations
- [x] Verified at 1440 and 375: no horizontal scroll, console clean, WhatsApp message includes colour and size
