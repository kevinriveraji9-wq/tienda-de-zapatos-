/* =========================================================
   CATÁLOGO — Calzado Leidy Carolina
   ---------------------------------------------------------
   Para editar el catálogo solo hay que cambiar este archivo.
   - nombre:   nombre del zapato
   - categoria: "dama" | "caballero" | "nino" | "nina"
   - tipo:     subcategoría (Tacones, Tenis, Botas, ...)
   - precio:   en pesos, sin puntos (129900 = $ 129.900)
   - precioAntes: (opcional) precio anterior, sin puntos. Solo si
               hay un descuento real: si es mayor que "precio" se
               muestra tachado, con el porcentaje de descuento.
   - tallas:   rango de tallas, ej. "35 – 40"
   - colores:  colores disponibles (código de color)
   - imagen:   ruta de la foto, ej. "img/dama/D01.jpg".
               Si se deja vacío "" se muestra una ilustración.
   - nuevo:    true para mostrar la etiqueta "Nuevo"
   ========================================================= */

/* ---------------------------------------------------------
   DATOS DE LA TIENDA
   Todo lo que diga la página sobre envíos, cambios, pagos,
   dirección u horario sale de aquí. Cambia los textos por las
   condiciones reales de la tienda. Los campos vacíos "" no se
   muestran en la página.
   --------------------------------------------------------- */
const TIENDA = {
  nombre: "Calzado Leidy Carolina",
  ciudad: "Pitalito, Huila",
  // Número de WhatsApp con indicativo, sin + ni espacios. Ej: "573001234567"
  whatsapp: "",
  facebook: "https://www.facebook.com/share/19vXXxZTyL/",
  instagram: "https://www.instagram.com/calzadoleidy",
  tiktok: "https://www.tiktok.com/@leidycarolinashoes",

  // EDITAR: datos de contacto. Se muestran en el pie solo si tienen texto.
  direccion: "",   // Ej: "Calle 0 # 0-00, centro"
  telefono: "",    // Ej: "(608) 000 0000"
  horario: "",     // Ej: "Lunes a sábado, 8:00 a. m. a 7:00 p. m."
  nit: "",         // Ej: "000.000.000-0"

  // EDITAR: franja de servicio (4 puntos). Mientras no haya condiciones
  // confirmadas, los textos invitan a preguntar y no prometen nada.
  servicios: [
    { titulo: "Envíos", texto: "Consulta por WhatsApp el costo y el tiempo de entrega a tu ciudad." },
    { titulo: "Cambios de talla", texto: "Pregunta las condiciones antes de comprar." },
    { titulo: "Medios de pago", texto: "Te contamos las opciones por WhatsApp." },
    { titulo: "Atención por WhatsApp", texto: "Te confirmamos talla, color y disponibilidad." },
  ],

  // EDITAR: políticas que se ven en la ficha del producto y en "Ayuda".
  politicas: {
    envios: "Consulta por WhatsApp si llegamos a tu ciudad, cuánto cuesta el envío y cuánto tarda.",
    cambios: "Antes de comprar te contamos las condiciones para cambiar la talla o el modelo.",
    pagos: "Te contamos por WhatsApp los medios de pago disponibles.",
  },
};

// "foto": imagen de la vitrina de la portada (una por categoría).
// EDITAR: son fotos de referencia de Unsplash (licencia libre). Cámbialas por
// fotos reales de la tienda, por ejemplo "img/portada-dama.jpg". Si se deja
// vacía, la vitrina muestra el dibujo de un modelo de esa categoría.
const CATEGORIAS = [
  { id: "dama", nombre: "Dama", foto: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95" },
  { id: "caballero", nombre: "Caballero", foto: "https://images.unsplash.com/photo-1603191659812-ee978eeeef76" },
  { id: "nino", nombre: "Niño", foto: "https://images.unsplash.com/photo-1742390671657-c8738e123962" },
  { id: "nina", nombre: "Niña", foto: "https://images.unsplash.com/photo-1742390671609-9811019fe538" },
];

const PRODUCTOS = [
  // ---------------- DAMA ----------------
  { id: "D01", nombre: "Stiletto Charol", categoria: "dama", tipo: "Tacones", precio: 129900, tallas: "35 – 40", colores: ["#1d1a1a", "#a3233a"], imagen: "", nuevo: true },
  { id: "D02", nombre: "Tacón Puntal Nude", categoria: "dama", tipo: "Tacones", precio: 119900, tallas: "35 – 40", colores: ["#d9b49a", "#1d1a1a"], imagen: "" },
  { id: "D03", nombre: "Tacón Bloque Gamuza", categoria: "dama", tipo: "Tacones", precio: 139900, tallas: "35 – 40", colores: ["#7b4b33", "#3c3a3a"], imagen: "" },
  { id: "D04", nombre: "Tacón Fiesta Dorado", categoria: "dama", tipo: "Tacones", precio: 149900, tallas: "35 – 39", colores: ["#c79a3b", "#b9b9b9"], imagen: "" },
  { id: "D05", nombre: "Tacón Medio Oficina", categoria: "dama", tipo: "Tacones", precio: 109900, tallas: "35 – 41", colores: ["#2b2f45", "#1d1a1a"], imagen: "" },
  { id: "D06", nombre: "Sandalia Tiras Cruzadas", categoria: "dama", tipo: "Sandalias", precio: 79900, tallas: "35 – 40", colores: ["#c98a5c", "#f1e6d6"], imagen: "", nuevo: true },
  { id: "D07", nombre: "Sandalia Plataforma", categoria: "dama", tipo: "Sandalias", precio: 99900, tallas: "35 – 40", colores: ["#efe4d2", "#1d1a1a"], imagen: "" },
  { id: "D08", nombre: "Sandalia Trenzada", categoria: "dama", tipo: "Sandalias", precio: 89900, tallas: "35 – 40", colores: ["#8a5a3b"], imagen: "" },
  { id: "D09", nombre: "Sandalia Pedrería", categoria: "dama", tipo: "Sandalias", precio: 94900, tallas: "35 – 39", colores: ["#b9b9b9", "#c79a3b"], imagen: "" },
  { id: "D10", nombre: "Tenis Urbano Blanco", categoria: "dama", tipo: "Tenis", precio: 139900, tallas: "35 – 40", colores: ["#f4f1ec", "#e7b7b4"], imagen: "", nuevo: true },
  { id: "D11", nombre: "Tenis Plataforma", categoria: "dama", tipo: "Tenis", precio: 149900, tallas: "35 – 40", colores: ["#f4f1ec", "#1d1a1a"], imagen: "" },
  { id: "D12", nombre: "Tenis Deportivo Rosa", categoria: "dama", tipo: "Tenis", precio: 129900, tallas: "35 – 40", colores: ["#e7a3b0", "#9aa7c7"], imagen: "" },
  { id: "D13", nombre: "Tenis Casual Lona", categoria: "dama", tipo: "Tenis", precio: 99900, tallas: "35 – 40", colores: ["#5d7a6a", "#f4f1ec"], imagen: "" },
  { id: "D14", nombre: "Botín Tacón Cuero", categoria: "dama", tipo: "Botas", precio: 179900, tallas: "35 – 40", colores: ["#1d1a1a", "#6e4630"], imagen: "" },
  { id: "D15", nombre: "Bota Alta Caña", categoria: "dama", tipo: "Botas", precio: 189900, tallas: "35 – 40", colores: ["#3a2a22"], imagen: "" },
  { id: "D16", nombre: "Botín Chelsea", categoria: "dama", tipo: "Botas", precio: 159900, tallas: "35 – 40", colores: ["#8b6a4f", "#1d1a1a"], imagen: "" },
  { id: "D17", nombre: "Botín Texano", categoria: "dama", tipo: "Botas", precio: 169900, tallas: "35 – 40", colores: ["#b07a4f"], imagen: "" },
  { id: "D18", nombre: "Baleta Clásica", categoria: "dama", tipo: "Baletas", precio: 69900, tallas: "35 – 41", colores: ["#1d1a1a", "#d9b49a", "#a3233a"], imagen: "" },
  { id: "D19", nombre: "Baleta Moño", categoria: "dama", tipo: "Baletas", precio: 74900, tallas: "35 – 40", colores: ["#e7b7b4", "#1d1a1a"], imagen: "" },
  { id: "D20", nombre: "Baleta Punta Animal Print", categoria: "dama", tipo: "Baletas", precio: 79900, tallas: "35 – 40", colores: ["#b88a52"], imagen: "" },

  // ---------------- CABALLERO ----------------
  { id: "C01", nombre: "Tenis Running Pro", categoria: "caballero", tipo: "Tenis", precio: 169900, tallas: "38 – 44", colores: ["#2b2f45", "#c2553a"], imagen: "", nuevo: true },
  { id: "C02", nombre: "Tenis Urbano Cuero", categoria: "caballero", tipo: "Tenis", precio: 159900, tallas: "38 – 44", colores: ["#f4f1ec", "#1d1a1a"], imagen: "" },
  { id: "C03", nombre: "Tenis Casual Gris", categoria: "caballero", tipo: "Tenis", precio: 139900, tallas: "38 – 44", colores: ["#8d9196"], imagen: "" },
  { id: "C04", nombre: "Tenis Skate Lona", categoria: "caballero", tipo: "Tenis", precio: 109900, tallas: "38 – 44", colores: ["#1d1a1a", "#5d7a6a"], imagen: "" },
  { id: "C05", nombre: "Tenis Training", categoria: "caballero", tipo: "Tenis", precio: 149900, tallas: "38 – 44", colores: ["#3d5a80", "#1d1a1a"], imagen: "" },
  { id: "C06", nombre: "Tenis Retro", categoria: "caballero", tipo: "Tenis", precio: 154900, tallas: "38 – 44", colores: ["#efe4d2", "#a3233a"], imagen: "" },
  { id: "C07", nombre: "Zapato Oxford Cuero", categoria: "caballero", tipo: "Formal", precio: 189900, tallas: "38 – 44", colores: ["#1d1a1a", "#5a3523"], imagen: "", nuevo: true },
  { id: "C08", nombre: "Zapato Derby", categoria: "caballero", tipo: "Formal", precio: 179900, tallas: "38 – 44", colores: ["#5a3523"], imagen: "" },
  { id: "C09", nombre: "Zapato Formal Hebilla", categoria: "caballero", tipo: "Formal", precio: 199900, tallas: "38 – 44", colores: ["#1d1a1a"], imagen: "" },
  { id: "C10", nombre: "Zapato Ejecutivo", categoria: "caballero", tipo: "Formal", precio: 169900, tallas: "38 – 44", colores: ["#3a2a22", "#1d1a1a"], imagen: "" },
  { id: "C11", nombre: "Bota Trabajo Puntera", categoria: "caballero", tipo: "Botas", precio: 219900, tallas: "38 – 44", colores: ["#8b6a4f"], imagen: "" },
  { id: "C12", nombre: "Botín Casual Cuero", categoria: "caballero", tipo: "Botas", precio: 199900, tallas: "38 – 44", colores: ["#5a3523", "#1d1a1a"], imagen: "" },
  { id: "C13", nombre: "Bota Montaña", categoria: "caballero", tipo: "Botas", precio: 209900, tallas: "38 – 44", colores: ["#6b6a4f", "#3a2a22"], imagen: "" },
  { id: "C14", nombre: "Botín Chelsea Hombre", categoria: "caballero", tipo: "Botas", precio: 189900, tallas: "38 – 44", colores: ["#1d1a1a"], imagen: "" },
  { id: "C15", nombre: "Mocasín Clásico", categoria: "caballero", tipo: "Mocasines", precio: 149900, tallas: "38 – 44", colores: ["#7b4b33", "#1d1a1a"], imagen: "" },
  { id: "C16", nombre: "Mocasín Gamuza", categoria: "caballero", tipo: "Mocasines", precio: 139900, tallas: "38 – 44", colores: ["#2b2f45", "#8b6a4f"], imagen: "" },
  { id: "C17", nombre: "Mocasín Driver", categoria: "caballero", tipo: "Mocasines", precio: 134900, tallas: "38 – 44", colores: ["#a86a3d"], imagen: "" },
  { id: "C18", nombre: "Sandalia Cuero Hombre", categoria: "caballero", tipo: "Sandalias", precio: 89900, tallas: "38 – 44", colores: ["#5a3523"], imagen: "" },
  { id: "C19", nombre: "Sandalia Deportiva", categoria: "caballero", tipo: "Sandalias", precio: 79900, tallas: "38 – 44", colores: ["#1d1a1a", "#3d5a80"], imagen: "" },
  { id: "C20", nombre: "Chancla Playera", categoria: "caballero", tipo: "Sandalias", precio: 49900, tallas: "38 – 44", colores: ["#2b2f45", "#1d1a1a"], imagen: "" },

  // ---------------- NIÑO ----------------
  { id: "N01", nombre: "Tenis Luces LED", categoria: "nino", tipo: "Tenis", precio: 99900, tallas: "24 – 34", colores: ["#3d5a80", "#1d1a1a"], imagen: "", nuevo: true },
  { id: "N02", nombre: "Tenis Velcro Azul", categoria: "nino", tipo: "Tenis", precio: 79900, tallas: "22 – 32", colores: ["#3d5a80"], imagen: "" },
  { id: "N03", nombre: "Tenis Deportivo Junior", categoria: "nino", tipo: "Tenis", precio: 89900, tallas: "27 – 37", colores: ["#1d1a1a", "#c2553a"], imagen: "" },
  { id: "N04", nombre: "Tenis Casual Verde", categoria: "nino", tipo: "Tenis", precio: 74900, tallas: "24 – 34", colores: ["#5d7a6a"], imagen: "" },
  { id: "N05", nombre: "Tenis Lona Clásico", categoria: "nino", tipo: "Tenis", precio: 59900, tallas: "22 – 34", colores: ["#a3233a", "#2b2f45"], imagen: "" },
  { id: "N06", nombre: "Tenis Fútbol Sala", categoria: "nino", tipo: "Tenis", precio: 84900, tallas: "27 – 37", colores: ["#f4f1ec", "#3d5a80"], imagen: "" },
  { id: "N07", nombre: "Tenis Bebé Primeros Pasos", categoria: "nino", tipo: "Tenis", precio: 54900, tallas: "17 – 22", colores: ["#9aa7c7", "#f4f1ec"], imagen: "" },
  { id: "N08", nombre: "Zapato Escolar Cordón", categoria: "nino", tipo: "Escolar", precio: 89900, tallas: "27 – 38", colores: ["#1d1a1a"], imagen: "", nuevo: true },
  { id: "N09", nombre: "Zapato Escolar Velcro", categoria: "nino", tipo: "Escolar", precio: 84900, tallas: "24 – 34", colores: ["#1d1a1a"], imagen: "" },
  { id: "N10", nombre: "Tenis Escolar Blanco", categoria: "nino", tipo: "Escolar", precio: 79900, tallas: "27 – 38", colores: ["#f4f1ec"], imagen: "" },
  { id: "N11", nombre: "Tenis Escolar Negro", categoria: "nino", tipo: "Escolar", precio: 79900, tallas: "27 – 38", colores: ["#1d1a1a"], imagen: "" },
  { id: "N12", nombre: "Mocasín Escolar", categoria: "nino", tipo: "Escolar", precio: 74900, tallas: "27 – 36", colores: ["#3a2a22"], imagen: "" },
  { id: "N13", nombre: "Sandalia Aventura", categoria: "nino", tipo: "Sandalias", precio: 54900, tallas: "22 – 34", colores: ["#3d5a80", "#5d7a6a"], imagen: "" },
  { id: "N14", nombre: "Sandalia Velcro", categoria: "nino", tipo: "Sandalias", precio: 49900, tallas: "20 – 30", colores: ["#c2553a"], imagen: "" },
  { id: "N15", nombre: "Chancla Personajes", categoria: "nino", tipo: "Sandalias", precio: 34900, tallas: "22 – 34", colores: ["#3d5a80"], imagen: "" },
  { id: "N16", nombre: "Sandalia Cuero Niño", categoria: "nino", tipo: "Sandalias", precio: 59900, tallas: "22 – 32", colores: ["#7b4b33"], imagen: "" },
  { id: "N17", nombre: "Bota Lluvia", categoria: "nino", tipo: "Botas", precio: 59900, tallas: "22 – 34", colores: ["#c79a3b", "#3d5a80"], imagen: "" },
  { id: "N18", nombre: "Botín Casual Niño", categoria: "nino", tipo: "Botas", precio: 99900, tallas: "24 – 34", colores: ["#8b6a4f"], imagen: "" },
  { id: "N19", nombre: "Bota Explorador", categoria: "nino", tipo: "Botas", precio: 109900, tallas: "27 – 37", colores: ["#6b6a4f"], imagen: "" },
  { id: "N20", nombre: "Botín Gamuza Niño", categoria: "nino", tipo: "Botas", precio: 94900, tallas: "22 – 32", colores: ["#2b2f45"], imagen: "" },

  // ---------------- NIÑA ----------------
  { id: "A01", nombre: "Tenis Brillos", categoria: "nina", tipo: "Tenis", precio: 89900, tallas: "24 – 34", colores: ["#e7a3b0", "#c3b3d9"], imagen: "", nuevo: true },
  { id: "A02", nombre: "Tenis Luces LED Rosa", categoria: "nina", tipo: "Tenis", precio: 99900, tallas: "24 – 34", colores: ["#e7a3b0"], imagen: "" },
  { id: "A03", nombre: "Tenis Velcro Lila", categoria: "nina", tipo: "Tenis", precio: 79900, tallas: "22 – 32", colores: ["#c3b3d9"], imagen: "" },
  { id: "A04", nombre: "Tenis Plataforma Junior", categoria: "nina", tipo: "Tenis", precio: 94900, tallas: "27 – 37", colores: ["#f4f1ec"], imagen: "" },
  { id: "A05", nombre: "Tenis Bebé Corazones", categoria: "nina", tipo: "Tenis", precio: 54900, tallas: "17 – 22", colores: ["#f2c6c2", "#f4f1ec"], imagen: "" },
  { id: "A06", nombre: "Zapato Escolar Correa", categoria: "nina", tipo: "Escolar", precio: 84900, tallas: "24 – 36", colores: ["#1d1a1a"], imagen: "", nuevo: true },
  { id: "A07", nombre: "Zapato Escolar Hebilla", categoria: "nina", tipo: "Escolar", precio: 89900, tallas: "27 – 38", colores: ["#1d1a1a"], imagen: "" },
  { id: "A08", nombre: "Tenis Escolar Blanco Niña", categoria: "nina", tipo: "Escolar", precio: 79900, tallas: "27 – 38", colores: ["#f4f1ec"], imagen: "" },
  { id: "A09", nombre: "Baleta Escolar", categoria: "nina", tipo: "Escolar", precio: 69900, tallas: "24 – 36", colores: ["#1d1a1a", "#2b2f45"], imagen: "" },
  { id: "A10", nombre: "Mocasín Escolar Niña", categoria: "nina", tipo: "Escolar", precio: 74900, tallas: "27 – 36", colores: ["#3a2a22"], imagen: "" },
  { id: "A11", nombre: "Baleta Charol Moño", categoria: "nina", tipo: "Baletas", precio: 64900, tallas: "22 – 34", colores: ["#a3233a", "#1d1a1a"], imagen: "" },
  { id: "A12", nombre: "Baleta Glitter", categoria: "nina", tipo: "Baletas", precio: 69900, tallas: "22 – 34", colores: ["#c79a3b", "#e7a3b0"], imagen: "" },
  { id: "A13", nombre: "Baleta Fiesta", categoria: "nina", tipo: "Baletas", precio: 74900, tallas: "22 – 34", colores: ["#efe4d2"], imagen: "" },
  { id: "A14", nombre: "Baleta Flores", categoria: "nina", tipo: "Baletas", precio: 59900, tallas: "20 – 30", colores: ["#f2c6c2"], imagen: "" },
  { id: "A15", nombre: "Sandalia Flores", categoria: "nina", tipo: "Sandalias", precio: 54900, tallas: "20 – 32", colores: ["#e7a3b0", "#f4f1ec"], imagen: "" },
  { id: "A16", nombre: "Sandalia Brillos", categoria: "nina", tipo: "Sandalias", precio: 59900, tallas: "22 – 34", colores: ["#c79a3b"], imagen: "" },
  { id: "A17", nombre: "Chancla Unicornio", categoria: "nina", tipo: "Sandalias", precio: 34900, tallas: "22 – 34", colores: ["#c3b3d9"], imagen: "" },
  { id: "A18", nombre: "Bota Lluvia Niña", categoria: "nina", tipo: "Botas", precio: 59900, tallas: "22 – 34", colores: ["#e7a3b0"], imagen: "" },
  { id: "A19", nombre: "Botín Peluche", categoria: "nina", tipo: "Botas", precio: 99900, tallas: "24 – 34", colores: ["#d9b49a", "#f4f1ec"], imagen: "" },
  { id: "A20", nombre: "Bota Caña Niña", categoria: "nina", tipo: "Botas", precio: 109900, tallas: "27 – 36", colores: ["#3a2a22"], imagen: "" },
];
