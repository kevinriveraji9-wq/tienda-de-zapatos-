# Directory Structure

```
index.html              # the whole page (one file, semantic regions + dialogs)
css/estilos.css         # all styles; tokens on :root; breakpoints 1100px and 760px
js/productos.js         # DATA ONLY: TIENDA config, CATEGORIAS, PRODUCTOS (80 items)
js/app.js               # behaviour: render, filters, dialogs, drawer, WhatsApp, order form (one IIFE)
img/<categoria>/        # (future) real product photos, e.g. img/dama/D01.jpg
.claude/launch.json     # preview server: python -m http.server 5173
.taste-skill/           # scratch output of the design inspector (gitignored)
```

## Rules

- Content the shop owner edits (products, prices, WhatsApp number, social links, contact rows, service and policy copy, announcements) lives **only** in `js/productos.js`.
- `productos.js` loads before `app.js` (globals `TIENDA`, `CATEGORIAS`, `PRODUCTOS`).
- No stock or third-party photos of places or other brands. Product pictures are the owner's own photos (`imagen`) or the SVG illustrations.
- Identifiers, CSS classes and comments are in Spanish, matching the existing code.
