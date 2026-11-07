# Quality Guidelines

## Visual system (restrained retail)

- Tokens only: `--blanco`, `--gris`, `--gris-hondo`, `--linea`, `--tinta`, `--tinta-suave`, `--apagado`, `--acento` (wine, badges/sale/active), `--wa` (WhatsApp actions only), `--sombra` (overlays only).
- Font: Archivo variable, one family in two widths: condensed uppercase for display/section titles, normal width for UI.
- Square corners everywhere except the round floating WhatsApp button and colour dots.
- 1px `--linea` separators are allowed in filters, footer columns and accordions.
- Shadows only on overlays: dialogs, nav panel, floating button and its menu.
- No gradients, glass/backdrop blur, emoji, monospace.

## Accessibility (impeccable polish checklist)

- Text contrast at least 4.5:1 (secondary text 7.4:1, accent 9.1:1, WhatsApp green 6.5:1 on white); input borders at least 3:1.
- Visible `:focus-visible` (white outline on dark areas); touch targets at least 44px.
- Native `<dialog>` for overlays; Escape closes; focus returns to the opener.
- `aria-live` on result counts; no `aria-haspopup` on plain hover panels.
- `prefers-reduced-motion`: announcement bar does not rotate, transitions shortened.

## Business-fact guard

Never publish unconfirmed specifics: shipping thresholds or prices, "a todo Colombia", payment brands (Nequi, PSE, Addi...), return-day counts, warranties, address, hours, NIT. Neutral "consulta por WhatsApp" wording lives in `TIENDA` until the owner confirms the real terms.

## Design gates (advisory for this direction)

`lint.mjs` / `inspect.mjs` from design-taste-frontend. Accepted findings: `hairline`, `outlined-box`, `few-pictures` (no photos until the owner supplies product photos), `still-page` (minimal motion by design), `no-footage`, `side-scroll` on the type-pill row at 390px. Anything else must be fixed.

## Common mistakes

- `aria-label` on a plain `div`/`span` needs a role (`group`, `img`).
- Spanish lists: "a, b y c", never "a y b y c".
- Facet counts must include filters that persist across category switches (size).
- Numeric inputs need an integer check, not only a range check.
- Prefilled fields must not keep a value from a previously opened product.
- Heading levels inside nested sections (related products under an h3 use h4).

## Testing

No test runner. Manual or scripted browser checks at 1440 / 768 / 390 for the flows listed in the index Quality Check.


## Motion (task 11-07-diseno-animaciones)

- Signature moment: hero title lines rise (`subir-linea`), category shoes walk in (`pisar`), wine block wipes in (`barrido`).
- Entrance animations only run under `html.anima`, set by an inline script in `<head>` when the page is visible and `prefers-reduced-motion` is not `reduce`. Without it, content is static and visible.
- Safety net: after 2.5 s `app.js` finishes any stalled entrance animation (`ENTRADAS` set); scroll reveals (WAAPI) finish themselves after their duration + 800 ms. Never ship a reveal that can leave content hidden.
- Scroll reveals are only for sequences (how-to steps, carousel cards, service items), never whole sections.
- Easing `--expo` (cubic-bezier(0.16, 1, 0.3, 1)); feedback 150-300 ms, entrances 500-900 ms; no bounce.
- The marquee duplicates its items for a seamless loop only when motion is allowed; with reduced motion it renders once and stays still.
