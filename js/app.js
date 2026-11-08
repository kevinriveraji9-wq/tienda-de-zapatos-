(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pesos = (n) => "$ " + n.toLocaleString("es-CO");
  const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const listaY = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs.at(-1)}` : xs[0] || "");
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desplazar = (el) => el.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });

  /* ---------- Ilustraciones (mientras no haya foto del producto) ---------- */
  const FORMA = {
    Tenis: "tenis", Tacones: "tacon", Sandalias: "sandalia", Botas: "bota",
    Baletas: "bajo", Formal: "formal", Mocasines: "bajo", Escolar: "formal",
  };
  const SVGS = {
    tenis: (c) => `
      <path d="M30 104c-3-24 8-40 30-46l28-16c7-4 14-2 19 4l13 14c26 4 56 14 70 28 6 6 6 12 4 16z" fill="${c}"/>
      <path d="M78 70l10 10M90 62l10 10M102 56l9 9" stroke="#fff" stroke-opacity=".75" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 92c34 6 74 2 112-8" stroke="#000" stroke-opacity=".18" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M24 102h172q8 0 8 7v1q0 9-9 9H34q-12 0-12-9v-2q0-6 2-6z" fill="#fbfaf7" stroke="#000" stroke-opacity=".14" stroke-width="2"/>`,
    tacon: (c) => `
      <path d="M40 36q10-4 16 6c18 32 52 42 90 44 30 2 48 8 52 20q1 6-6 6h-58c-36 0-62-14-80-34l-6 34h-9l-1-46q-6-18 2-30z" fill="${c}"/>
      <path d="M44 40c16 34 50 48 96 50" stroke="#000" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    sandalia: (c) => `
      <path d="M28 104q-2-8 8-8l148 2q18 2 18 10t-10 8H36q-10 0-8-12z" fill="#e2d3bf"/>
      <path d="M26 112h176" stroke="#000" stroke-opacity=".2" stroke-width="5" stroke-linecap="round"/>
      <path d="M46 98q2-26 20-30M74 98q8-34 34-32 12 2 14 32M136 98q14-26 40 0" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>`,
    bota: (c) => `
      <path d="M42 108V32q0-10 10-10h40q10 0 10 10v40c34 4 66 12 82 24q12 8 12 18H42z" fill="${c}"/>
      <path d="M102 72q-2 14-14 18" stroke="#000" stroke-opacity=".2" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M42 30h60" stroke="#000" stroke-opacity=".2" stroke-width="4"/>
      <rect x="38" y="108" width="162" height="10" rx="4" fill="#2a2420"/>
      <rect x="38" y="108" width="34" height="14" rx="3" fill="#2a2420"/>`,
    bajo: (c) => `
      <path d="M32 106c-4-22 2-36 18-40 14-3 22 4 36 6 28 2 66 4 96 18 14 6 18 12 16 16z" fill="${c}"/>
      <path d="M52 68c16-2 28 8 46 8" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M28 104h172q6 0 6 6 0 6-8 6H32q-6 0-6-6t2-6z" fill="#2a2420" fill-opacity=".85"/>`,
    formal: (c) => `
      <path d="M32 104c-4-22 2-36 18-40 14-3 22 4 36 6 28 2 66 4 96 18 14 6 18 12 16 16z" fill="${c}"/>
      <path d="M52 66c16-2 28 8 46 8M98 74c10-8 26-8 34 4" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M104 70l14 4M108 64l14 4" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M28 104h172q6 0 6 6 0 6-8 6H32q-6 0-6-6t2-6z" fill="#2a2420"/>
      <rect x="28" y="104" width="30" height="16" rx="3" fill="#2a2420"/>`,
  };
  // decorativo: la imagen va junto al nombre del producto, así que no se repite en el lector de pantalla
  const dibujo = (p, decorativo = false, color = p.colores[0]) => p.imagen
    ? `<img src="${esc(p.imagen)}" alt="${decorativo ? "" : esc(p.nombre)}" loading="lazy">`
    : `<svg viewBox="0 0 230 140" aria-hidden="true"${esClaro(color) ? ' class="claro"' : ""}><ellipse cx="116" cy="124" rx="92" ry="6" fill="#000" fill-opacity=".07"/>${SVGS[FORMA[p.tipo] || "bajo"](color)}</svg>`;

  // los colores muy claros se pierden sobre el gris de la ficha: llevan contorno
  function esClaro(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return false;
    const n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 205;
  }

  /* ---------- Colores con nombre (un código desconocido se llama "Color N") ---------- */
  const COLOR_NOMBRES = {
    "#1d1a1a": "Negro", "#a3233a": "Vino", "#d9b49a": "Nude", "#7b4b33": "Café", "#3c3a3a": "Gris oscuro",
    "#c79a3b": "Dorado", "#b9b9b9": "Plateado", "#2b2f45": "Azul oscuro", "#c98a5c": "Camel", "#f1e6d6": "Crema",
    "#efe4d2": "Beige", "#8a5a3b": "Miel", "#f4f1ec": "Blanco", "#e7b7b4": "Rosa palo", "#e7a3b0": "Rosado",
    "#9aa7c7": "Azul claro", "#5d7a6a": "Verde", "#6e4630": "Café", "#3a2a22": "Café oscuro", "#8b6a4f": "Tabaco",
    "#b07a4f": "Caramelo", "#b88a52": "Ocre", "#c2553a": "Terracota", "#8d9196": "Gris", "#3d5a80": "Azul",
    "#5a3523": "Chocolate", "#6b6a4f": "Verde oliva", "#a86a3d": "Coñac", "#c3b3d9": "Lila", "#f2c6c2": "Rosa claro",
  };
  const nombreColor = (hex, i) => COLOR_NOMBRES[String(hex).toLowerCase()] || `Color ${i + 1}`;
  const nombresColores = (p) => p.colores.map(nombreColor);

  /* ---------- Tallas ---------- */
  const rango = (p) => {
    const [a, b] = p.tallas.split(/[–-]/).map((n) => parseInt(n, 10));
    return [a, b ?? a];
  };
  const leQueda = (p, t) => { const [a, b] = rango(p); return t >= a && t <= b; };
  const tallasTexto = (p) => { const [a, b] = rango(p); return a === b ? `Talla ${a}` : `Tallas ${a} a ${b}`; };
  const extremos = (lista) => {
    const r = lista.map(rango);
    return [Math.min(...r.map((x) => x[0])), Math.max(...r.map((x) => x[1]))];
  };
  const serie = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  /* ---------- Precio (con descuento opcional "precioAntes") ---------- */
  const enOferta = (p) => Number(p.precioAntes) > p.precio;
  const descuento = (p) => Math.round((1 - p.precio / p.precioAntes) * 100);
  const precioHTML = (p) => enOferta(p)
    ? `<s><span class="oculto">Antes </span>${pesos(p.precioAntes)}</s> <span class="precio-oferta"><span class="oculto">Ahora </span>${pesos(p.precio)}</span>`
    : pesos(p.precio);
  const sellos = (p) => {
    const s = [];
    if (enOferta(p)) s.push(`<span class="sello">-${descuento(p)}%</span>`);
    if (p.nuevo) s.push(`<span class="sello">Nuevo</span>`);
    return s.length ? `<span class="sellos">${s.join("")}</span>` : "";
  };

  /* ---------- WhatsApp ---------- */
  const SALUDO = `Hola, ${TIENDA.nombre}.`;
  const linkWA = (texto) =>
    `https://wa.me/${(TIENDA.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
  const msgProducto = (p, talla) =>
    `${SALUDO} Me interesa este zapato:\n- ${p.nombre} (Ref. ${p.id})\n- Precio: ${pesos(p.precio)}\n` +
    (talla ? `¿Lo tienen en talla ${talla}?` : "¿En qué tallas lo tienen disponible?");
  const msgPedido = (p, talla, color) =>
    `${SALUDO} Quiero pedir este zapato:\n- ${p.nombre} (Ref. ${p.id})\n- Color: ${color}\n- Talla: ${talla}\n` +
    `- Precio: ${pesos(p.precio)}\n¿Está disponible?`;
  const msgOtraTalla = (p) =>
    `${SALUDO} Me gusta el modelo ${p.nombre} (Ref. ${p.id}), pero no encuentro mi talla. Mi talla es: `;
  const msgFotos = (p) =>
    `${SALUDO} ¿Me pueden enviar fotos reales del modelo ${p.nombre} (Ref. ${p.id})?`;
  const MENSAJES = {
    general: `${SALUDO} Quiero información sobre el catálogo.`,
    compra: `${SALUDO} Quiero comprar y me gustaría que me ayuden a elegir modelo y talla.`,
    servicio: `${SALUDO} Tengo una pregunta sobre un pedido.`,
  };
  const pintarEnlacesWA = (raiz = document) =>
    $$("[data-wa]", raiz).forEach((a) => { a.href = linkWA(MENSAJES[a.dataset.wa] || MENSAJES.general); });

  /* ---------- Categorías ---------- */
  const TODAS = "todas";
  const deCat = (id) => (id === TODAS ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === id));
  const nombreCat = (id) => (id === TODAS ? "Todo el catálogo" : CATEGORIAS.find((c) => c.id === id).nombre);
  const tiposDe = (lista) => [...new Set(lista.map((p) => p.tipo))];
  const NINOS = ["nino", "nina"]; // categorías infantiles: la guía de tallas muestra la edad aproximada

  /* ---------- Bandas de precio, calculadas con los precios del catálogo ---------- */
  const PRECIOS = PRODUCTOS.map((p) => p.precio);
  const P_MIN = Math.min(...PRECIOS), P_MAX = Math.max(...PRECIOS);
  const PASO = Math.max(10000, Math.ceil((P_MAX - P_MIN) / 4 / 10000) * 10000);
  const BANDAS = [];
  for (let lo = Math.floor(P_MIN / PASO) * PASO; lo <= P_MAX; lo += PASO) BANDAS.push([lo, lo + PASO]);
  const enBanda = (p, i) => p.precio >= BANDAS[i][0] && p.precio < BANDAS[i][1];
  const nombreBanda = (i) => {
    const [lo, hi] = BANDAS[i];
    if (lo === 0) return `Menos de ${pesos(hi)}`;
    if (i === BANDAS.length - 1) return `Desde ${pesos(lo)}`;
    return `${pesos(lo)} a ${pesos(hi)}`;
  };

  /* ---------- Estado ---------- */
  const estado = { cat: "todas", tipo: "Todo", talla: null, precio: null, orden: "relevancia", q: "" };
  function leerHash(h) {
    if (CATEGORIAS.some((c) => c.id === h) || h === TODAS) { estado.cat = h; estado.tipo = "Todo"; return true; }
    if (h === "nuevos") { estado.cat = TODAS; estado.tipo = "Nuevos"; return true; }
    return false;
  }
  const hashInicial = leerHash(location.hash.slice(1));

  const buscando = () => estado.q.trim().length > 0;
  // Palabras que la gente escribe y cómo se llaman en el catálogo
  const SINONIMOS = {
    colegio: "escolar", colegial: "escolar", colegiales: "escolar", escolares: "escolar", uniforme: "escolar",
    tennis: "tenis", zapatilla: "tenis", zapatillas: "tenis", deportivo: "tenis", deportivos: "tenis",
    chancla: "sandalia", chanclas: "sandalia", sandalias: "sandalia",
    tacon: "tacon", tacones: "tacon", bailarina: "baleta", bailarinas: "baleta", baletas: "baleta",
    botas: "bota", botines: "botin", mocasin: "mocasin", mocasines: "mocasin", elegante: "formal",
    mujer: "dama", mujeres: "dama", senora: "dama", hombre: "caballero", hombres: "caballero",
    ninos: "nino", ninas: "nina", bebes: "bebe",
  };
  const RELLENO = new Set(["zapato", "zapatos", "calzado", "para", "de", "del", "la", "el", "los", "las", "en", "con", "y", "un", "una", "unos", "unas"]);
  function base() {
    const palabras = sinTildes(estado.q.trim()).split(/\s+/)
      .filter((w) => w && !RELLENO.has(w))
      .map((w) => SINONIMOS[w] || w)
      .map((w) => (w.length > 4 && w.endsWith("s") ? w.slice(0, -1) : w)); // plurales: "botas" encuentra "bota"
    if (!palabras.length && estado.q.trim()) return PRODUCTOS;
    if (!palabras.length) return deCat(estado.cat);
    return PRODUCTOS.filter((p) => {
      const texto = sinTildes(`${p.nombre} ${p.tipo} ${p.id} ${nombreCat(p.categoria)}`);
      return palabras.every((w) => texto.includes(w));
    });
  }
  const cumpleTipo = (p) => estado.tipo === "Todo" || (estado.tipo === "Nuevos" ? !!p.nuevo : p.tipo === estado.tipo);
  // "sin" deja fuera un filtro para contar las opciones de ese mismo filtro
  const filtrar = (sin) => base().filter((p) =>
    (sin === "tipo" || cumpleTipo(p)) &&
    (sin === "talla" || !estado.talla || leQueda(p, estado.talla)) &&
    (sin === "precio" || estado.precio === null || enBanda(p, estado.precio)));
  function ordenar(lista) {
    const l = [...lista];
    if (estado.orden === "precio-menor") l.sort((a, b) => a.precio - b.precio);
    else if (estado.orden === "precio-mayor") l.sort((a, b) => b.precio - a.precio);
    else if (estado.orden === "nuevos") l.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0));
    return l;
  }
  const activos = () => (estado.tipo !== "Todo" ? 1 : 0) + (estado.talla ? 1 : 0) + (estado.precio !== null ? 1 : 0);

  /* ---------- Contenido que sale de los datos (una sola vez) ---------- */
  const [T_MIN, T_MAX] = extremos(PRODUCTOS);
  $("#portadaResumen").innerHTML = [`${PRODUCTOS.length} modelos`, `Tallas ${T_MIN} a ${T_MAX}`]
    .map((t) => `<li>${t}</li>`).join("");
  $("#anio").textContent = new Date().getFullYear();
  $("#pieCiudad").textContent = TIENDA.ciudad;
  $("#lnkFacebook").href = TIENDA.facebook;
  $("#lnkInstagram").href = TIENDA.instagram;
  $("#lnkTiktok").href = TIENDA.tiktok;

  $("#navLista").innerHTML = CATEGORIAS.map((c) => `
    <li class="nav__item">
      <a class="nav__enlace" href="#${c.id}" data-ir="${c.id}">${c.nombre}</a>
      <div class="nav__panel">
        <ul>
          <li><a href="#${c.id}" data-ir="${c.id}">Ver todo ${c.nombre.toLowerCase()} <span>${deCat(c.id).length}</span></a></li>
          ${tiposDe(deCat(c.id)).map((t) => `<li><a href="#${c.id}" data-ir="${c.id}" data-ir-tipo="${t}">${t}</a></li>`).join("")}
        </ul>
      </div>
    </li>`).join("") +
    `<li class="nav__item"><a class="nav__enlace" href="#nuevos" data-ir="${TODAS}" data-ir-tipo="Nuevos">Nuevos</a></li>`;

  $("#mosaico").innerHTML = CATEGORIAS.map((c) => {
    const ps = deCat(c.id);
    const muestra = ps.find((p) => p.nuevo) || ps[0];
    return `
      <li><a class="mosaico__tile" href="#${c.id}" data-ir="${c.id}">
        <span class="mosaico__foto">${dibujo(muestra, true)}</span>
        <span class="mosaico__nombre">${c.nombre}</span>
        <span class="mosaico__n">${plural(ps.length, "modelo", "modelos")}</span>
      </a></li>`;
  }).join("");

  /* ---------- Vitrina de la portada: una foto por categoría que se turna ---------- */
  // Cada diapositiva lleva a su categoría. Con foto (CATEGORIAS[].foto) se muestra la foto;
  // sin foto, el dibujo de un modelo de esa categoría.
  const fotoSrc = (url, w) => (/^https:\/\/images\.unsplash\.com\//.test(url) ? `${url}?w=${w}&q=70&auto=format&fit=crop` : url);
  const destacados = CATEGORIAS.map((c) => {
    const ps = deCat(c.id);
    const nuevosCat = ps.filter((p) => p.nuevo);
    return { c, n: ps.length, muestra: nuevosCat[1] || ps.find((p) => p !== (nuevosCat[0] || ps[0])) || ps[0] };
  }).filter((d) => d.n);
  const vitrina = $("#vitrina");
  if (!destacados.length) vitrina.hidden = true;
  $("#vitrinaMarco").innerHTML = destacados.map(({ c, n, muestra }, i) => {
    const foto = c.foto
      ? `<img src="${fotoSrc(c.foto, 1000)}" srcset="${[600, 1000, 1400].map((w) => `${fotoSrc(c.foto, w)} ${w}w`).join(", ")}"
          sizes="(min-width: 1100px) 50vw, 100vw" alt="" fetchpriority="${i === 0 ? "high" : "low"}" decoding="async">`
      : dibujo(muestra, true);
    return `
    <a class="vitrina__slide${i === 0 ? " activa" : ""}${c.foto ? " vitrina__slide--foto" : ""}" href="#${c.id}" data-ir="${c.id}"
      aria-label="${c.nombre}: ver ${plural(n, "modelo", "modelos")}" ${i === 0 ? "" : 'tabindex="-1" aria-hidden="true"'}>
      <span class="vitrina__zapato">${foto}</span>
      <span class="vitrina__etiqueta"><b>${c.nombre}</b><span>${plural(n, "modelo", "modelos")} <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoFlecha"/></svg></span></span>
    </a>`;
  }).join("");
  $("#vitrinaPuntos").innerHTML = destacados.map(({ c }, i) =>
    `<button type="button" class="vitrina__punto" data-vitrina="${i}" aria-pressed="${i === 0}"><span class="oculto">Ver ${c.nombre}</span></button>`).join("");

  let vActual = 0, vPausa = false, vTimer = null;
  function irVitrina(n, desdeUsuario = false) {
    const slides = $$(".vitrina__slide", vitrina);
    const total = slides.length;
    const sig = ((n % total) + total) % total;
    if (sig === vActual) return;
    const dir = (n > vActual || (vActual === total - 1 && sig === 0)) ? 1 : -1;
    slides[vActual].classList.remove("activa");
    slides[vActual].setAttribute("aria-hidden", "true");
    slides[vActual].tabIndex = -1;
    const nueva = slides[sig];
    nueva.classList.add("activa");
    nueva.removeAttribute("aria-hidden");
    nueva.tabIndex = 0;
    if (!reducido) {
      const conFoto = nueva.classList.contains("vitrina__slide--foto");
      $(".vitrina__zapato", nueva).animate(conFoto
        ? [{ opacity: 0.4, transform: `scale(1.08) translateX(${dir * 16}px)` }, { opacity: 1, transform: "none" }]
        : [{ opacity: 0, transform: `translateX(${dir * 48}px) rotate(${dir * -8}deg)` }, { opacity: 1, transform: "none" }],
        { duration: conFoto ? 900 : 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
      $(".vitrina__etiqueta", nueva).animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
        { duration: 450, delay: 120, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
    }
    $$(".vitrina__punto", vitrina).forEach((b, i) => b.setAttribute("aria-pressed", String(i === sig)));
    vActual = sig;
    if (desdeUsuario) reiniciarVitrina();
  }
  function reiniciarVitrina() {
    clearInterval(vTimer);
    // se turna solo si se permite el movimiento y la vitrina está a la vista
    if (reducido || destacados.length < 2) return;
    vTimer = setInterval(() => {
      if (!vPausa && vitrina.offsetParent !== null && document.visibilityState === "visible") irVitrina(vActual + 1);
    }, 4000);
  }
  vitrina.addEventListener("click", (e) => {
    const punto = e.target.closest("[data-vitrina]");
    if (punto) irVitrina(Number(punto.dataset.vitrina), true);
  });
  ["pointerenter", "focusin"].forEach((ev) => vitrina.addEventListener(ev, () => { vPausa = true; }));
  ["pointerleave", "focusout"].forEach((ev) => vitrina.addEventListener(ev, () => { vPausa = false; }));
  // deslizar con el dedo
  let x0 = null;
  vitrina.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; vPausa = true; }, { passive: true });
  vitrina.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null; vPausa = false;
    if (Math.abs(dx) > 40) irVitrina(vActual + (dx < 0 ? 1 : -1), true);
  });
  reiniciarVitrina();

  const servicios = (TIENDA.servicios || []).filter((s) => s && s.titulo);
  const ICONOS_SERVICIO = ["iconoEnvio", "iconoCambio", "iconoPago", "iconoChat"];
  $("#servicios").innerHTML = servicios.map((s, i) =>
    `<li><svg class="servicios__icono" viewBox="0 0 24 24" aria-hidden="true"><use href="#${ICONOS_SERVICIO[i % 4]}"/></svg>
      <b>${esc(s.titulo)}</b><span>${esc(s.texto || "")}</span></li>`).join("");

  // Cinta: categorías, tipos y datos clave; se repite dos veces para que el bucle no tenga corte
  const cintaItems = [...CATEGORIAS.map((c) => c.nombre), ...tiposDe(PRODUCTOS), `Tallas ${T_MIN} a ${T_MAX}`, "Pide por WhatsApp"];
  const cintaHTML = cintaItems.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#cinta").innerHTML = reducido ? cintaHTML : cintaHTML + cintaHTML; // quieta: una sola vuelta
  if (!servicios.length) $(".servicios").hidden = true;

  const POLITICAS = [["envios", "Envíos"], ["cambios", "Cambios"], ["pagos", "Medios de pago"]];
  const htmlPoliticas = () => POLITICAS.filter(([k]) => TIENDA.politicas?.[k])
    .map(([k, t]) => `<details class="acordeon__item"><summary>${t}</summary><p>${esc(TIENDA.politicas[k])}</p></details>`).join("");
  $("#politicas").innerHTML = htmlPoliticas();

  $("#pieCategorias").innerHTML = CATEGORIAS.map((c) =>
    `<li><a href="#${c.id}" data-ir="${c.id}">${c.nombre}</a></li>`).join("") +
    `<li><a href="#nuevos" data-ir="${TODAS}" data-ir-tipo="Nuevos">Nuevos</a></li>`;

  // Los datos de la tienda solo se muestran si están llenos en TIENDA
  const consulta = encodeURIComponent(`${TIENDA.nombre} ${TIENDA.direccion || ""} ${TIENDA.ciudad}`.replace(/\s+/g, " "));
  $("#pieTienda").innerHTML = [
    TIENDA.ciudad && `<li><a href="https://www.google.com/maps/search/?api=1&amp;query=${consulta}" target="_blank" rel="noopener">${esc(TIENDA.ciudad)}</a></li>`,
    TIENDA.direccion && `<li>${esc(TIENDA.direccion)}</li>`,
    TIENDA.horario && `<li>${esc(TIENDA.horario)}</li>`,
    TIENDA.telefono && `<li><a href="tel:${esc(TIENDA.telefono.replace(/[^\d+]/g, ""))}">Tel. ${esc(TIENDA.telefono)}</a></li>`,
    `<li><a data-wa="general" target="_blank" rel="noopener">WhatsApp</a></li>`,
    TIENDA.nit && `<li>NIT ${esc(TIENDA.nit)}</li>`,
  ].filter(Boolean).join("");

  pintarEnlacesWA();

  /* ---------- Lo nuevo: carrusel con flechas (se desliza con el dedo en el teléfono) ---------- */
  const riel = $("#riel");
  const nuevos = PRODUCTOS.filter((p) => p.nuevo);
  if (!nuevos.length) $(".nuevos").hidden = true;
  riel.innerHTML = nuevos.map((p) => tarjeta(p, { mixto: true })).join("");
  const flechas = $$("[data-riel]");
  const estadoFlechas = () => {
    flechas[0].disabled = riel.scrollLeft < 8;
    flechas[1].disabled = riel.scrollLeft + riel.clientWidth > riel.scrollWidth - 8;
  };
  flechas.forEach((b) => b.addEventListener("click", () => {
    riel.scrollBy({ left: Number(b.dataset.riel) * riel.clientWidth * 0.85, behavior: reducido ? "auto" : "smooth" });
  }));
  riel.addEventListener("scroll", estadoFlechas, { passive: true });
  addEventListener("resize", estadoFlechas);
  estadoFlechas();

  /* ---------- Seguro de la entrada: si el navegador no la anima (pestaña en segundo plano, vista previa),
     a los 2,5 s se completa y el contenido queda visible ---------- */
  const ENTRADAS = new Set(["subir-linea", "aparecer", "fundido", "barrido", "pisar"]);
  setTimeout(() => {
    document.getAnimations?.().forEach((an) => {
      if (ENTRADAS.has(an.animationName) && an.playState !== "finished") an.finish();
    });
  }, 2500);

  /* ---------- Cabecera: una sombra leve cuando la página ya bajó ---------- */
  const cab = $(".cabecera");
  const marcarCabecera = () => cab.classList.toggle("con-sombra", scrollY > 8);
  addEventListener("scroll", marcarCabecera, { passive: true });
  marcarCabecera();

  /* ---------- Revelado al bajar: solo secuencias (pasos, carrusel, servicios); lo ya visible no se esconde ---------- */
  if (!reducido && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entradas) => {
      entradas.filter((e) => e.isIntersecting).forEach((e, n) => {
        io.unobserve(e.target);
        const an = e.target.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }],
          { duration: 600, delay: n * 90, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
        setTimeout(() => { if (an.playState !== "finished") an.finish(); }, 600 + n * 90 + 800); // seguro
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    $$(".pasos li, .riel .tarjeta, .servicios__lista li").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) io.observe(el);
    });
  }

  /* ---------- Pintar el catálogo ---------- */
  const opcion = (attr, valor, texto, n, activo) => `
    <li><button type="button" class="opcion" data-${attr}="${valor}" aria-pressed="${activo}" ${n === 0 && !activo ? "disabled" : ""}>
      <span>${texto}</span><span class="opcion__n">${n}</span>
    </button></li>`;

  function opcionesTipo() {
    const b = base(), sinTipo = filtrar("tipo");
    const lista = [["Todo", sinTipo.length]];
    if (b.some((p) => p.nuevo)) lista.push(["Nuevos", sinTipo.filter((p) => p.nuevo).length]);
    tiposDe(b).forEach((t) => lista.push([t, sinTipo.filter((p) => p.tipo === t).length]));
    // el tipo activo sigue visible aunque la búsqueda ya no lo incluya, para poder quitarlo
    if (!lista.some(([t]) => t === estado.tipo)) lista.push([estado.tipo, 0]);
    return lista;
  }

  function htmlFiltros() {
    const b = base();
    let h = `<div class="filtro"><h3 class="filtro__titulo">Categoría</h3>`;
    h += buscando()
      ? `<p class="filtro__nota">Buscando en todo el catálogo.</p>
         <button type="button" class="enlace enlace--bloque" data-borrar-busqueda>Borrar búsqueda</button>`
      // al cambiar de categoría se conserva la talla (tipo y precio se reinician), así que el conteo la incluye
      : `<ul class="filtro__lista">${[TODAS, ...CATEGORIAS.map((c) => c.id)].map((id) =>
          opcion("cat", id, id === TODAS ? "Todas" : nombreCat(id),
            deCat(id).filter((p) => !estado.talla || leQueda(p, estado.talla)).length, id === estado.cat)).join("")}</ul>`;
    h += `</div>`;

    h += `<div class="filtro"><h3 class="filtro__titulo">Tipo</h3><ul class="filtro__lista">${
      opcionesTipo().map(([t, n]) => opcion("tipo", t, t, n, t === estado.tipo)).join("")}</ul></div>`;

    if (b.length) {
      const sinTalla = filtrar("talla");
      const presentes = new Set(b.flatMap((p) => serie(...rango(p))));
      if (estado.talla) presentes.add(estado.talla);
      const tallas = [...presentes].sort((x, y) => x - y);
      h += `<div class="filtro"><h3 class="filtro__titulo">Talla</h3>
        <div class="tallas" role="group" aria-label="Talla">${tallas.map((t) => {
          const n = sinTalla.filter((p) => leQueda(p, t)).length;
          const activo = t === estado.talla;
          return `<button type="button" class="talla" data-talla="${t}" aria-pressed="${activo}" ${n === 0 && !activo ? "disabled" : ""}>${t}<span class="oculto">, ${plural(n, "modelo", "modelos")}</span></button>`;
        }).join("")}</div>
        <button type="button" class="enlace enlace--bloque" data-guia>Guía de tallas</button></div>`;

      const sinPrecio = filtrar("precio");
      h += `<div class="filtro"><h3 class="filtro__titulo">Precio</h3><ul class="filtro__lista">${
        BANDAS.map((_, i) => i).filter((i) => b.some((p) => enBanda(p, i)) || estado.precio === i)
          .map((i) => opcion("precio", i, nombreBanda(i), sinPrecio.filter((p) => enBanda(p, i)).length, i === estado.precio)).join("")
      }</ul></div>`;
    }
    if (activos()) h += `<div class="filtro"><button type="button" class="boton boton--claro filtros__limpiar" data-limpiar>Limpiar filtros</button></div>`;
    return h;
  }

  function tarjeta(p, { mixto = false, mini = false, i = null } = {}) {
    const nombres = nombresColores(p);
    // al pasar el mouse se ve el segundo color del modelo
    const alterno = !mini && !p.imagen && p.colores.length > 1
      ? `<span class="tarjeta__alt">${dibujo(p, true, p.colores[1])}</span>` : "";
    const entra = i !== null && !reducido ? ` tarjeta--entra" style="--i:${Math.min(i, 11)}` : "";
    const h = mini ? "h4" : "h3"; // en la ficha las mini tarjetas van bajo el h3 "También te puede gustar"
    return `
      <li class="tarjeta${mini ? " tarjeta--mini" : ""}${entra}">
        <div class="tarjeta__foto">${dibujo(p, true)}${alterno}${sellos(p)}</div>
        <div class="tarjeta__info">
          <${h} class="tarjeta__nombre"><button type="button" class="tarjeta__abrir" data-abrir="${p.id}">${esc(p.nombre)}</button></${h}>
          <p class="tarjeta__meta">${mixto ? `${nombreCat(p.categoria)} · ` : ""}${esc(p.tipo)} · ${plural(p.colores.length, "color", "colores")}</p>
          <p class="tarjeta__precio">${precioHTML(p)}</p>
          ${mini ? "" : `<span class="puntos" role="img" aria-label="Colores: ${listaY(nombres).toLowerCase()}">${p.colores.map((c) => `<i style="background:${c}"></i>`).join("")}</span>`}
        </div>
        ${mini ? "" : `<a class="tarjeta__wa" href="${linkWA(msgProducto(p, estado.talla))}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoWa"/></svg><span class="oculto">Pedir ${esc(p.nombre)} por WhatsApp</span>
        </a>`}
      </li>`;
  }

  function pintarLista() {
    const lista = ordenar(filtrar());
    const q = estado.q.trim();
    const mixto = buscando() || estado.cat === TODAS;

    let titulo = nombreCat(estado.cat);
    if (q) titulo = `Resultados para “${q}”`;
    else if (estado.tipo !== "Todo") titulo = estado.cat === TODAS ? estado.tipo : `${titulo} · ${estado.tipo}`;
    $("#catTitulo").textContent = titulo;
    $("#catCuenta").textContent = plural(lista.length, "modelo", "modelos") +
      (estado.talla ? ` en talla ${estado.talla}` : "") + (q ? " en todo el catálogo" : "");
    $("#verResultados").textContent = lista.length ? `Ver ${plural(lista.length, "resultado", "resultados")}` : "Cerrar";
    $("#filtrosN").textContent = activos() ? ` (${activos()})` : "";

    const vacio = $("#vacio");
    if (!lista.length) {
      $("#rejilla").innerHTML = "";
      const busca = q ? `"${q}"` : `zapatos de ${nombreCat(estado.cat).toLowerCase()}${estado.tipo !== "Todo" ? ` (${estado.tipo.toLowerCase()})` : ""}`;
      vacio.innerHTML = `
        <h3 class="vacio__titulo">No encontramos modelos con estos filtros</h3>
        <p>A veces llega mercancía antes de que la subamos al catálogo. Pregúntanos por WhatsApp${estado.talla ? ` por la talla ${estado.talla}` : ""}.</p>
        <div class="vacio__acciones">
          <a class="boton boton--wa" href="${linkWA(`${SALUDO} Busco ${busca}${estado.talla ? ` en talla ${estado.talla}` : ""}. ¿Tienen algo?`)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoWa"/></svg>¿No ves tu talla? Pregúntanos</a>
          ${activos() || q ? `<button type="button" class="boton boton--claro" data-limpiar>Limpiar filtros</button>` : ""}
        </div>`;
      vacio.hidden = false;
      return;
    }
    vacio.hidden = true;
    vacio.innerHTML = "";
    $("#rejilla").innerHTML = lista.map((p, i) => tarjeta(p, { mixto, i })).join("");
  }

  function pintarFiltros() {
    const filtros = htmlFiltros();
    $("#filtrosLado").innerHTML = filtros;
    $("#filtrosHoja").innerHTML = filtros;
    // en tableta y teléfono la categoría se cambia desde aquí (la barra lateral no se ve)
    const cats = buscando() ? "" : [TODAS, ...CATEGORIAS.map((c) => c.id)].map((id) =>
      `<button type="button" class="pildora pildora--cat" data-cat="${id}" aria-pressed="${id === estado.cat}">${id === TODAS ? "Todas" : nombreCat(id)}</button>`).join("");
    $("#pildoras").innerHTML = cats + opcionesTipo().map(([t]) =>
      `<button type="button" class="pildora" data-tipo="${t}" aria-pressed="${t === estado.tipo}">${t}</button>`).join("");
  }

  // Al repintar una zona de filtros, el foco vuelve al mismo botón (o al primero de la zona)
  function pintar() {
    const a = document.activeElement;
    const zona = a?.closest?.("[data-region]");
    const attr = zona && ["cat", "tipo", "talla", "precio"].find((k) => a.dataset[k] !== undefined);
    pintarFiltros();
    pintarLista();
    if (zona && zona.isConnected) {
      const b = (attr && $(`[data-${attr}="${CSS.escape(a.dataset[attr])}"]:not(:disabled)`, zona)) || $("button:not(:disabled)", zona);
      b?.focus();
    }
  }

  /* ---------- Acciones ---------- */
  const buscar = $("#buscar");
  function irACategoria(id, tipo = "Todo", llevar = true) {
    estado.cat = id; estado.tipo = tipo; estado.precio = null; estado.q = ""; buscar.value = "";
    history.replaceState(null, "", "#" + (id === TODAS && tipo === "Nuevos" ? "nuevos" : id));
    pintar();
    if (llevar) desplazar($("#catalogo"));
  }
  function limpiar() {
    estado.tipo = "Todo"; estado.talla = null; estado.precio = null;
    if (buscando()) { estado.q = ""; buscar.value = ""; }
    pintar();
  }
  const llevarAlCatalogo = () => {
    const r = $("#catalogo").getBoundingClientRect();
    if (r.top > innerHeight * 0.4 || r.bottom < innerHeight * 0.3) desplazar($("#catalogo"));
  };

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (e.defaultPrevented || !(t instanceof Element)) return;

    // Un enlace interno dentro de una ventana la cierra antes de llevarte
    const interno = t.closest("a[href^='#']");
    if (interno) interno.closest("dialog[open]")?.close();

    const cerrar = t.closest("[data-cerrar]");
    if (cerrar) { cerrar.closest("dialog")?.close(); return; }

    const ir = t.closest("[data-ir]");
    if (ir) { e.preventDefault(); return irACategoria(ir.dataset.ir, ir.dataset.irTipo || "Todo", true); }

    const cat = t.closest("[data-cat]");
    if (cat) return irACategoria(cat.dataset.cat, "Todo", false);

    const tipo = t.closest("[data-tipo]");
    if (tipo) { estado.tipo = tipo.dataset.tipo; return pintar(); }

    const talla = t.closest("[data-talla]");
    if (talla) { const n = Number(talla.dataset.talla); estado.talla = estado.talla === n ? null : n; return pintar(); }

    const precio = t.closest("[data-precio]");
    if (precio) { const i = Number(precio.dataset.precio); estado.precio = estado.precio === i ? null : i; return pintar(); }

    if (t.closest("[data-limpiar]")) return limpiar();
    if (t.closest("[data-borrar-busqueda]")) { estado.q = ""; buscar.value = ""; return pintar(); }

    const abrir = t.closest("[data-abrir]");
    if (abrir) return abrirFicha(abrir.dataset.abrir);

    const comp = t.closest("[data-compartir]");
    if (comp) return compartir(comp.dataset.compartir);

    const guia = t.closest("[data-guia]");
    if (guia) {
      if (guia.closest("#menuMovil")) $("#menuMovil").close();
      return abrirGuia();
    }

    const menuCat = t.closest("[data-menu-cat]");
    if (menuCat) { pintarCajon(menuCat.dataset.menuCat); return $("[data-menu-volver]").focus(); }
    const volver = t.closest("[data-menu-volver]");
    if (volver) { const id = volver.dataset.menuVolver; pintarCajon(null); return $(`[data-menu-cat="${id}"]`).focus(); }

    const fTalla = t.closest("[data-ficha-talla]");
    if (fTalla) return elegirTalla(Number(fTalla.dataset.fichaTalla));
    const fColor = t.closest("[data-ficha-color]");
    if (fColor) return elegirColor(Number(fColor.dataset.fichaColor));
  });

  $("#orden").addEventListener("change", (e) => { estado.orden = e.target.value; pintarLista(); });

  buscar.addEventListener("input", () => {
    const antes = buscando();
    estado.q = buscar.value;
    if (buscando() !== antes) { estado.tipo = "Todo"; estado.precio = null; }
    pintar();
    if (!antes && buscando()) llevarAlCatalogo();
  });
  $("#buscador").addEventListener("submit", (e) => { e.preventDefault(); llevarAlCatalogo(); });

  const productoDelHash = () => PRODUCTOS.find((x) => x.id === location.hash.slice(1).toUpperCase());
  addEventListener("hashchange", () => {
    const p = productoDelHash();
    if (p) return abrirFicha(p.id);
    if (leerHash(location.hash.slice(1))) { estado.q = ""; buscar.value = ""; pintar(); }
  });

  // Buscador plegable en el teléfono
  const cabecera = $(".cabecera");
  $("#abrirBuscar").addEventListener("click", (e) => {
    const abrir = !cabecera.classList.contains("buscando");
    cabecera.classList.toggle("buscando", abrir);
    e.currentTarget.setAttribute("aria-expanded", String(abrir));
    if (abrir) buscar.focus();
  });

  // Menú de categorías: Escape cierra el panel abierto por el foco
  $("#navLista").addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const item = e.target.closest(".nav__item");
    if (!item) return;
    item.classList.add("cerrado");
    $(".nav__enlace", item).focus();
  });
  $$(".nav__item").forEach((item) => {
    const abrir = () => item.classList.remove("cerrado");
    item.addEventListener("mouseleave", abrir);
    item.addEventListener("focusout", (e) => { if (!item.contains(e.relatedTarget)) abrir(); });
  });

  /* ---------- Ventanas (dialog nativo: Escape y foco atrapado) ---------- */
  $$("dialog.modal").forEach((d) => {
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); }); // clic en el fondo
  });

  // Filtros en teléfono y tableta
  const hojaFiltros = $("#hojaFiltros");
  $("#abrirFiltros").addEventListener("click", () => hojaFiltros.showModal());
  hojaFiltros.addEventListener("close", () => $("#abrirFiltros").focus());

  // Menú en teléfono y tableta, por niveles
  const menu = $("#menuMovil");
  function pintarCajon(id) {
    const cuerpo = $("#cajonCuerpo");
    if (!id) {
      cuerpo.innerHTML = `
        <ul class="cajon__lista">
          ${CATEGORIAS.map((c) => `<li><button type="button" class="cajon__item cajon__item--cat" data-menu-cat="${c.id}">${c.nombre}
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoFlecha"/></svg></button></li>`).join("")}
          <li><a class="cajon__item cajon__item--cat" href="#nuevos" data-ir="${TODAS}" data-ir-tipo="Nuevos">Nuevos</a></li>
        </ul>
        <ul class="cajon__lista">
          <li><a class="cajon__item" href="#ayuda">Cómo pedir</a></li>
          <li><button type="button" class="cajon__item" data-guia>Guía de tallas</button></li>
          <li><a class="cajon__item" href="#envios">Envíos, cambios y pagos</a></li>
          <li><a class="cajon__item" href="#pedido">¿No encuentras tu talla?</a></li>
        </ul>
        <div class="cajon__pie">
          <a class="boton boton--wa" data-wa="general" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoWa"/></svg>Escribir por WhatsApp</a>
        </div>`;
      pintarEnlacesWA(cuerpo);
      return;
    }
    const c = CATEGORIAS.find((x) => x.id === id);
    cuerpo.innerHTML = `
      <button type="button" class="cajon__volver" data-menu-volver="${c.id}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoFlecha"/></svg>Volver</button>
      <h2 class="cajon__titulo">${c.nombre}</h2>
      <ul class="cajon__lista">
        <li><a class="cajon__item" href="#${c.id}" data-ir="${c.id}">Ver todo <span>${deCat(c.id).length}</span></a></li>
        ${tiposDe(deCat(c.id)).map((t) => `<li><a class="cajon__item" href="#${c.id}" data-ir="${c.id}" data-ir-tipo="${t}">${t}
          <span>${deCat(c.id).filter((p) => p.tipo === t).length}</span></a></li>`).join("")}
      </ul>`;
  }
  const abrirMenu = $("#abrirMenu");
  abrirMenu.addEventListener("click", () => {
    pintarCajon(null);
    menu.showModal();
    abrirMenu.setAttribute("aria-expanded", "true");
  });
  menu.addEventListener("close", () => abrirMenu.setAttribute("aria-expanded", "false"));

  /* ---------- Ficha del producto ---------- */
  const ficha = $("#ficha");
  let sel = null; // { p, talla, color }

  function abrirFicha(id) {
    const p = PRODUCTOS.find((x) => x.id === id);
    if (!p) return;
    const [a, b] = rango(p);
    sel = { p, talla: estado.talla && leQueda(p, estado.talla) ? estado.talla : null, color: 0 };
    const nombres = nombresColores(p);
    const relacionados = [
      ...PRODUCTOS.filter((x) => x.id !== p.id && x.categoria === p.categoria && x.tipo === p.tipo),
      ...PRODUCTOS.filter((x) => x.categoria === p.categoria && x.tipo !== p.tipo),
    ].slice(0, 4);
    const pol = POLITICAS.filter(([k]) => TIENDA.politicas?.[k]);

    $("#fichaContenido").innerHTML = `
      <div class="modal__barra">
        <nav class="migas" aria-label="Ruta">
          <ol>
            <li><a href="#${p.categoria}" data-ir="${p.categoria}">${nombreCat(p.categoria)}</a></li>
            <li><a href="#${p.categoria}" data-ir="${p.categoria}" data-ir-tipo="${p.tipo}">${esc(p.tipo)}</a></li>
            <li aria-current="page">${esc(p.nombre)}</li>
          </ol>
        </nav>
        <button type="button" class="icono" data-cerrar autofocus><span class="oculto">Cerrar</span><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoX"/></svg></button>
      </div>
      <div class="ficha__cuerpo">
        <div class="ficha__foto" id="fichaFoto">${dibujo(p)}${sellos(p)}</div>
        <div class="ficha__info">
          <h2 class="ficha__nombre" id="fichaNombre" tabindex="-1">${esc(p.nombre)}</h2>
          <p class="ficha__ref">Ref. ${p.id} · ${nombreCat(p.categoria)} · ${esc(p.tipo)}</p>
          <p class="ficha__precio">${precioHTML(p)}</p>

          <div class="ficha__grupo" role="group" aria-labelledby="fichaColorTitulo">
            <p class="ficha__etiqueta" id="fichaColorTitulo">Color: <b id="fichaColor">${nombres[0]}</b></p>
            <div class="colores">${p.colores.map((c, i) => `
              <button type="button" class="color" data-ficha-color="${i}" aria-pressed="${i === 0}"><i style="background:${c}"></i>${nombres[i]}</button>`).join("")}
            </div>
          </div>

          <div class="ficha__grupo" role="group" aria-labelledby="fichaTallaTitulo">
            <div class="ficha__fila">
              <p class="ficha__etiqueta" id="fichaTallaTitulo">Talla <span class="ficha__rango">(${a} a ${b})</span></p>
              <button type="button" class="enlace enlace--bloque" data-guia>Guía de tallas</button>
            </div>
            <div class="tallas tallas--ficha">${serie(a, b).map((t) =>
              `<button type="button" class="talla" data-ficha-talla="${t}" aria-pressed="${t === sel.talla}">${t}</button>`).join("")}
            </div>
            <p class="ficha__aviso" id="fichaAviso" role="alert"></p>
          </div>

          <a class="boton boton--wa ficha__pedir" id="fichaPedir" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#iconoWa"/></svg>Pedir por WhatsApp</a>
          <p class="ficha__confianza">Antes de pagar te confirmamos talla, color y disponibilidad por chat.</p>
          <div class="ficha__enlaces">
            <a class="enlace enlace--bloque" href="${linkWA(msgOtraTalla(p))}" target="_blank" rel="noopener">¿No encuentras tu talla? Escríbenos</a>
            ${p.imagen ? "" : `<a class="enlace enlace--bloque" href="${linkWA(msgFotos(p))}" target="_blank" rel="noopener">Pide fotos reales de este modelo</a>`}
            <button type="button" class="enlace enlace--bloque" data-compartir="${p.id}">Compartir este modelo</button>
          </div>
          <p class="ficha__copiado" id="fichaCopiado" role="status"></p>

          ${servicios.length ? `<ul class="ficha__servicios">${servicios.map((s) => `<li><b>${esc(s.titulo)}.</b> ${esc(s.texto || "")}</li>`).join("")}</ul>` : ""}

          <div class="acordeon">
            <details class="acordeon__item"><summary>Detalles del producto</summary>
              <dl class="datos">
                <dt>Referencia</dt><dd>${p.id}</dd>
                <dt>Categoría</dt><dd>${nombreCat(p.categoria)}</dd>
                <dt>Tipo</dt><dd>${esc(p.tipo)}</dd>
                <dt>Tallas</dt><dd>${tallasTexto(p).replace(/^Tallas? /, "")}</dd>
                <dt>Colores</dt><dd>${listaY(nombres)}</dd>
              </dl>
            </details>
            ${pol.length ? `<details class="acordeon__item"><summary>Envíos, cambios y pagos</summary>
              ${pol.map(([k, t]) => `<p><b>${t}.</b> ${esc(TIENDA.politicas[k])}</p>`).join("")}</details>` : ""}
          </div>
        </div>
      </div>
      ${relacionados.length ? `
        <section class="ficha__relacionados" aria-labelledby="relTitulo">
          <h3 class="ficha__subtitulo" id="relTitulo">También te puede gustar</h3>
          <ul class="rejilla rejilla--mini">${relacionados.map((x) => tarjeta(x, { mini: true })).join("")}</ul>
        </section>` : ""}`;

    actualizarPedido();
    $("#pedidoModelo").value = `${p.nombre} (Ref. ${p.id})`;
    $("#pedidoTalla").value = sel.talla || ""; // no deja la talla de otro modelo
    if (ficha.open) {
      ficha.scrollTop = 0;
      $("#fichaNombre").focus();
    } else ficha.showModal();
    history.replaceState(null, "", "#" + p.id); // cada modelo tiene su enlace (ej. #D01) para compartirlo
  }
  const hashCategoria = () => "#" + (estado.cat === TODAS && estado.tipo === "Nuevos" ? "nuevos" : estado.cat);
  ficha.addEventListener("close", () => {
    // el evento llega un instante después: si ya se abrió otro modelo, se deja su enlace
    if (!ficha.open && PRODUCTOS.some((x) => "#" + x.id === location.hash)) history.replaceState(null, "", hashCategoria());
  });
  async function compartir(id) {
    const p = PRODUCTOS.find((x) => x.id === id);
    const url = `${location.origin}${location.pathname}#${id}`;
    const aviso = $("#fichaCopiado");
    try {
      if (navigator.share) { await navigator.share({ title: p.nombre, text: `${p.nombre} · ${pesos(p.precio)}`, url }); return; }
      await navigator.clipboard.writeText(url);
      aviso.textContent = "Enlace copiado. Pégalo en WhatsApp para compartirlo.";
    } catch (err) {
      if (err?.name === "AbortError") return; // la persona cerró el menú de compartir
      aviso.textContent = `Copia este enlace: ${url}`;
    }
  }

  function actualizarPedido() {
    const { p, talla, color } = sel;
    $("#fichaPedir").href = talla ? linkWA(msgPedido(p, talla, nombreColor(p.colores[color], color))) : "#";
  }
  function elegirTalla(t) {
    sel.talla = t;
    $$("[data-ficha-talla]", ficha).forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.fichaTalla) === t)));
    $("#fichaAviso").textContent = "";
    $("#pedidoTalla").value = t;
    actualizarPedido();
  }
  function elegirColor(i) {
    sel.color = i;
    const { p } = sel;
    $$("[data-ficha-color]", ficha).forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.fichaColor) === i)));
    $("#fichaColor").textContent = nombreColor(p.colores[i], i);
    if (!p.imagen) {
      $("#fichaFoto svg").outerHTML = dibujo(p, false, p.colores[i]);
      if (!reducido) $("#fichaFoto svg").animate([{ opacity: 0, transform: "translateX(-12px)" }, { opacity: 1, transform: "none" }],
        { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    }
    actualizarPedido();
  }
  // Sin talla no se arma el pedido: se pide elegirla primero
  ficha.addEventListener("click", (e) => {
    if (!(e.target instanceof Element) || !e.target.closest("#fichaPedir") || sel?.talla) return;
    e.preventDefault();
    $("#fichaAviso").textContent = "Elige tu talla para pedir por WhatsApp.";
    $("[data-ficha-talla]", ficha).focus();
  });

  /* ---------- Guía de tallas (aproximada, calculada con las tallas del catálogo) ---------- */
  const guia = $("#guia");
  const largoPie = (t) => ((t - 2) / 1.5).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const EDADES = [[17, 19, "6 a 12 meses"], [20, 22, "1 a 2 años"], [23, 25, "2 a 3 años"], [26, 28, "3 a 5 años"],
    [29, 31, "5 a 7 años"], [32, 34, "7 a 9 años"], [35, 38, "9 a 12 años"]];
  const edad = (t) => (EDADES.find(([a, b]) => t >= a && t <= b) || [])[2] || "12 años o más";
  function abrirGuia() {
    const ninos = PRODUCTOS.filter((p) => NINOS.includes(p.categoria));
    const adultos = PRODUCTOS.filter((p) => !NINOS.includes(p.categoria));
    const marcada = (ficha.open && sel?.talla) || estado.talla;
    const fila = (t, conEdad) => `<tr${t === marcada ? ` class="marcada"` : ""}><th scope="row">${t}</th><td>${largoPie(t)} cm</td>${conEdad ? `<td>${edad(t)}</td>` : ""}</tr>`;
    const tabla = (titulo, lista, conEdad) => {
      if (!lista.length) return "";
      const [a, b] = extremos(lista);
      return `<div class="guia__tabla">
        <h3 class="guia__subtitulo">${titulo}</h3>
        <table>
          <thead><tr><th scope="col">Talla</th><th scope="col">Largo del pie</th>${conEdad ? `<th scope="col">Edad aproximada</th>` : ""}</tr></thead>
          <tbody>${serie(a, b).map((t) => fila(t, conEdad)).join("")}</tbody>
        </table></div>`;
    };
    $("#guiaCuerpo").innerHTML = `
      <p class="guia__nota">Medidas aproximadas: cada horma calza distinto. Si quedas entre dos tallas, elige la mayor y pregúntanos por WhatsApp antes de pedir.</p>
      <div class="guia__tablas">
        ${tabla(listaY(CATEGORIAS.filter((c) => !NINOS.includes(c.id)).map((c) => c.nombre)), adultos, false)}
        ${tabla(listaY(CATEGORIAS.filter((c) => NINOS.includes(c.id)).map((c) => c.nombre)), ninos, true)}
      </div>
      <h3 class="guia__subtitulo">Cómo medir el pie en casa</h3>
      <ol class="pasos">
        <li>Pon una hoja de papel en el piso contra la pared y párate encima, con el talón tocando la pared.</li>
        <li>Marca en la hoja la punta del dedo más largo y mide en centímetros desde la pared hasta la marca.</li>
        <li>Mide los dos pies, preferiblemente en la tarde, y busca en la tabla la medida del pie más largo.</li>
      </ol>`;
    guia.showModal();
  }

  /* ---------- WhatsApp flotante: dos intenciones ---------- */
  const waBoton = $("#waBoton"), waMenu = $("#waMenu");
  const cerrarWa = (foco) => {
    waMenu.hidden = true;
    waBoton.setAttribute("aria-expanded", "false");
    if (foco) waBoton.focus();
  };
  waBoton.addEventListener("click", () => {
    const abrir = waMenu.hidden;
    waMenu.hidden = !abrir;
    waBoton.setAttribute("aria-expanded", String(abrir));
    if (abrir) $("a", waMenu).focus();
  });
  waMenu.addEventListener("click", (e) => { if (e.target.closest("a")) cerrarWa(true); }); // el foco no se pierde en el menú oculto
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !waMenu.hidden) cerrarWa(true); });
  document.addEventListener("click", (e) => { if (!waMenu.hidden && !e.target.closest("#waFlota")) cerrarWa(false); });
  $("#waFlota").addEventListener("focusout", (e) => {
    if (!waMenu.hidden && e.relatedTarget && !$("#waFlota").contains(e.relatedTarget)) cerrarWa(false);
  });

  /* ---------- Pedido rápido: arma el mensaje y abre WhatsApp ---------- */
  const formPedido = $("#formPedido");
  formPedido.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(formPedido);
    const error = $("#pedidoError");
    const faltan = ["nombre", "modelo", "talla"].filter((k) => !String(f.get(k) || "").trim());
    $$("input", formPedido).forEach((i) => i.removeAttribute("aria-invalid"));
    if (faltan.length) {
      const nombres = { nombre: "tu nombre", modelo: "el modelo o la referencia", talla: "la talla" };
      error.textContent = `Falta ${listaY(faltan.map((k) => nombres[k]))}.`;
      error.hidden = false;
      faltan.forEach((k) => $(`[name="${k}"]`, formPedido).setAttribute("aria-invalid", "true"));
      $(`[name="${faltan[0]}"]`, formPedido).focus();
      return;
    }
    const talla = Number(f.get("talla"));
    if (!Number.isInteger(talla) || talla < 15 || talla > 46) {
      error.textContent = "Escribe tu talla en número entero, entre 15 y 46 (por ejemplo, 37).";
      error.hidden = false;
      $('[name="talla"]', formPedido).setAttribute("aria-invalid", "true");
      $('[name="talla"]', formPedido).focus();
      return;
    }
    error.hidden = true;
    const texto = `${SALUDO} Soy ${f.get("nombre").trim()}.\n` +
      `Quiero pedir: ${f.get("modelo").trim()}\nTalla: ${talla}` +
      (String(f.get("nota") || "").trim() ? `\nNota: ${f.get("nota").trim()}` : "");
    window.open(linkWA(texto), "_blank", "noopener");
  });

  /* ---------- Arranque ---------- */
  pintar();
  if (hashInicial) requestAnimationFrame(() => $("#catalogo").scrollIntoView());
  const pInicial = productoDelHash();
  if (pInicial) requestAnimationFrame(() => { $("#catalogo").scrollIntoView(); abrirFicha(pInicial.id); });
})();
