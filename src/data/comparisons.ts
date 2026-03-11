/**
 * BOFU comparison pages data — 6 comparisons.
 * Each comparison is factual, balanced, and avoids empty attacks.
 */

export interface ComparisonData {
  slug: string;
  seoTitle: string;
  seoDesc: string;
  badge: string;
  h1: string;
  h1Highlight: string;
  subtitle: string;
  /** Context: why this comparison matters */
  context: string;
  /** Summary box */
  summary: {
    definition: string;
    bullets: string[];
  };
  /** Comparison table rows */
  tableColumns: string[];
  tableRows: { feature: string; options: (boolean | "partial")[] }[];
  /** Advantages and limits of each option */
  prosConsSections: {
    title: string;
    pros: string[];
    cons: string[];
  }[];
  /** Who fits each option */
  whoFits: {
    winerimIdeal: string[];
    alternativeOk: string[];
    alternativeLabel: string;
  };
  /** When Winerim makes more sense */
  whenWinerim: string[];
  /** FAQs */
  faqs: { q: string; a: string }[];
  /** Internal links */
  relatedLinks: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" }[];
}

export const comparisons: ComparisonData[] = [
  /* ════════════════════════════════════════════════════
     1. Winerim vs Carta PDF
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-carta-pdf-vinos",
    seoTitle: "Winerim vs Carta de Vinos en PDF — Comparativa Completa",
    seoDesc: "Comparativa detallada entre Winerim y una carta de vinos en PDF. Descubre cuál encaja mejor en tu restaurante según tus necesidades reales.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs carta de vinos",
    h1Highlight: "en PDF",
    subtitle: "El PDF es el formato más común para digitalizar una carta de vinos. Pero ¿es suficiente para vender más, gestionar la bodega y mejorar la experiencia del comensal?",
    context: "Muchos restaurantes dan el primer paso digitalizando su carta en PDF. Es rápido y barato, pero tiene limitaciones importantes en venta, gestión y experiencia de usuario. Esta comparativa ayuda a decidir si merece la pena dar el siguiente paso.",
    summary: {
      definition: "Una carta en PDF es un archivo estático que el comensal descarga o visualiza en su dispositivo. Winerim es una plataforma activa con IA que personaliza la experiencia, genera datos de venta y optimiza precios.",
      bullets: [
        "El PDF no recomienda, no analiza, no se actualiza automáticamente",
        "Winerim ofrece búsqueda, filtros, maridajes y recomendaciones inteligentes",
        "El PDF no genera datos de interacción ni métricas de venta",
        "Winerim integra gestión de stock, pricing y analítica en un solo panel",
      ],
    },
    tableColumns: ["Winerim", "Carta PDF"],
    tableRows: [
      { feature: "Actualización en tiempo real", options: [true, false] },
      { feature: "Búsqueda y filtros", options: [true, false] },
      { feature: "Recomendaciones con IA", options: [true, false] },
      { feature: "Maridajes automáticos", options: [true, false] },
      { feature: "Fichas con fotos y notas de cata", options: [true, false] },
      { feature: "Gestión de stock", options: [true, false] },
      { feature: "Analítica de ventas", options: [true, false] },
      { feature: "Multiidioma automático", options: [true, false] },
      { feature: "Coste inicial bajo", options: ["partial", true] },
      { feature: "Sin necesidad de conexión", options: [false, true] },
    ],
    prosConsSections: [
      {
        title: "Carta en PDF",
        pros: ["Coste cero o muy bajo", "Fácil de crear y compartir", "Funciona sin conexión una vez descargado", "Compatible con cualquier dispositivo"],
        cons: ["No se actualiza en tiempo real", "No ofrece búsqueda, filtros ni navegación", "No genera datos de interacción", "No recomienda ni sugiere maridajes", "No gestiona stock ni precios", "Experiencia pobre en móvil si no está optimizado"],
      },
      {
        title: "Winerim",
        pros: ["Actualización instantánea de precios, añadas y stock", "Recomendaciones con IA y maridajes automáticos", "Analítica de ventas y rotación en tiempo real", "Gestión integral de bodega", "Multiidioma automático", "Experiencia visual premium para el comensal"],
        cons: ["Requiere suscripción", "Requiere conexión a internet", "Curva de aprendizaje inicial para el equipo"],
      },
    ],
    whoFits: {
      alternativeLabel: "Carta PDF",
      alternativeOk: [
        "Restaurantes con menos de 10 referencias de vino",
        "Negocios con carta que cambia muy poco",
        "Presupuesto mínimo y sin interés en métricas",
      ],
      winerimIdeal: [
        "Restaurantes con más de 20 referencias",
        "Negocios que quieren vender más vino y subir ticket medio",
        "Equipos de sala sin sommelier que necesitan apoyo",
        "Restaurantes que quieren datos de venta y rotación",
        "Hoteles con clientes internacionales",
      ],
    },
    whenWinerim: [
      "Cuando quieres que la carta recomiende activamente, no solo informe",
      "Cuando necesitas datos reales sobre qué vinos se venden y cuáles no",
      "Cuando el equipo de sala necesita ayuda para recomendar con confianza",
      "Cuando gestionas stock y quieres evitar vinos muertos",
      "Cuando tienes clientes internacionales y necesitas multiidioma",
    ],
    faqs: [
      { q: "¿Es mejor un PDF que no tener carta digital?", a: "Sí. Un PDF es mejor que no tener nada digital. Pero si quieres vender más vino, gestionar stock y tener datos, necesitas una herramienta activa como Winerim." },
      { q: "¿Puedo pasar de PDF a Winerim fácilmente?", a: "Sí. Envías tu carta en cualquier formato (PDF, Excel, foto) y Winerim la digitaliza con fichas, maridajes y recomendaciones." },
      { q: "¿Winerim sustituye al sommelier?", a: "No. Complementa al equipo de sala con datos y sugerencias. En restaurantes sin sommelier, actúa como asistente inteligente." },
    ],
    relatedLinks: [
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/analisis-carta", label: "Analiza tu carta de vinos", type: "tool" },
      { to: "/funcionalidades", label: "Todas las funcionalidades", type: "solution" },
      { to: "/casos-exito", label: "Casos reales", type: "resource" },
    ],
  },

  /* ════════════════════════════════════════════════════
     2. Winerim vs QR simple
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-qr-simple",
    seoTitle: "Winerim vs QR Simple para Carta de Vinos — Comparativa",
    seoDesc: "¿Un QR que enlaza a un PDF o imagen es suficiente? Comparativa entre Winerim y un código QR simple para la carta de vinos del restaurante.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs QR",
    h1Highlight: "simple",
    subtitle: "Un QR que enlaza a un PDF o una imagen es el punto de partida más habitual. Pero ¿es suficiente para vender más vino y gestionar tu bodega?",
    context: "El QR se popularizó durante la pandemia como solución rápida. Muchos restaurantes siguen usándolo para enlazar a un PDF estático o una imagen de la carta. La pregunta clave es: ¿genera ventas o solo muestra información?",
    summary: {
      definition: "Un QR simple es un código que enlaza a un archivo estático (PDF, imagen o web básica). Winerim es una plataforma inteligente que transforma ese punto de contacto en una herramienta de venta, gestión y análisis.",
      bullets: [
        "El QR simple solo muestra información estática",
        "Winerim convierte el QR en una experiencia interactiva con búsqueda, filtros y recomendaciones",
        "Con un QR simple no hay datos de interacción ni analítica",
        "Winerim registra qué vinos explora cada comensal y genera métricas de rendimiento",
      ],
    },
    tableColumns: ["Winerim", "QR simple"],
    tableRows: [
      { feature: "Experiencia interactiva", options: [true, false] },
      { feature: "Búsqueda y filtros por tipo, precio, región", options: [true, false] },
      { feature: "Recomendaciones inteligentes", options: [true, false] },
      { feature: "Maridajes por plato", options: [true, false] },
      { feature: "Analítica de interacciones", options: [true, false] },
      { feature: "Gestión de stock integrada", options: [true, false] },
      { feature: "Actualización sin cambiar el QR", options: [true, false] },
      { feature: "Multiidioma", options: [true, false] },
      { feature: "Coste de implementación", options: ["partial", true] },
      { feature: "Rapidez de setup", options: ["partial", true] },
    ],
    prosConsSections: [
      {
        title: "QR simple",
        pros: ["Coste prácticamente nulo", "Setup en minutos", "Cualquier restaurante puede implementarlo", "No requiere formación"],
        cons: ["No genera ningún dato de venta", "No recomienda ni personaliza", "Experiencia pobre: zoom, scroll horizontal", "Cada cambio requiere regenerar el archivo", "No ayuda al equipo de sala"],
      },
      {
        title: "Winerim",
        pros: ["Experiencia visual premium con fichas, fotos y descripciones", "Recomendaciones con IA que guían al comensal", "Datos de interacción y ventas en tiempo real", "Gestión de stock, precios y rotación integrada", "El QR siempre apunta al contenido más actualizado"],
        cons: ["Requiere suscripción mensual", "Setup inicial algo más largo", "Requiere conexión a internet"],
      },
    ],
    whoFits: {
      alternativeLabel: "QR simple",
      alternativeOk: [
        "Bares con menos de 10 vinos que cambian muy poco",
        "Negocios que solo quieren eliminar la carta física como mínimo",
        "Presupuesto cero para tecnología",
      ],
      winerimIdeal: [
        "Restaurantes con más de 15-20 referencias",
        "Negocios que quieren que la carta recomiende y venda",
        "Equipos sin sommelier que necesitan apoyo en sala",
        "Restaurantes con rotación frecuente de vinos",
        "Hoteles o locales con clientela internacional",
      ],
    },
    whenWinerim: [
      "Cuando el QR solo muestra información pero no genera ventas",
      "Cuando quieres saber qué vinos miran los comensales y cuáles ignoran",
      "Cuando el equipo de sala no tiene tiempo para explicar la carta",
      "Cuando necesitas actualizar precios o añadas sin tocar el QR físico",
    ],
    faqs: [
      { q: "¿Puedo usar Winerim con un código QR?", a: "Sí. Winerim genera un QR que enlaza a tu carta inteligente. Cada vez que actualizas la carta, el QR sigue funcionando sin cambios." },
      { q: "¿Un QR simple es malo?", a: "No. Es mejor que no tener carta digital. Pero si quieres vender más vino, necesitas algo que recomiende, analice y se actualice." },
      { q: "¿Cuánto tarda implementar Winerim vs un QR?", a: "Un QR simple se genera en minutos. Winerim se implementa en pocos días, con tu carta digitalizada, fichas completas y maridajes configurados." },
    ],
    relatedLinks: [
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/funcionalidades", label: "Funcionalidades de Winerim", type: "solution" },
      { to: "/carta-papel-vs-digital", label: "Carta papel vs digital", type: "guide" },
      { to: "/herramientas", label: "Herramientas gratuitas", type: "tool" },
    ],
  },

  /* ════════════════════════════════════════════════════
     3. Winerim vs Carta impresa tradicional
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-carta-impresa",
    seoTitle: "Winerim vs Carta de Vinos Impresa — Comparativa Detallada",
    seoDesc: "¿Merece la pena pasar de carta impresa a carta digital inteligente? Comparativa entre Winerim y la carta de vinos impresa tradicional.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs carta",
    h1Highlight: "impresa tradicional",
    subtitle: "La carta impresa ha sido el estándar durante décadas. Pero en un mundo donde los costes, la rotación y la competencia exigen eficiencia, ¿sigue siendo suficiente?",
    context: "La carta impresa transmite elegancia y tradición, pero tiene costes ocultos: cada cambio de precio, añada o referencia requiere reimpresión. El comensal no puede buscar, filtrar ni recibir sugerencias. Y el restaurante no obtiene ningún dato.",
    summary: {
      definition: "La carta impresa es un documento físico que muestra los vinos disponibles. Winerim es una plataforma digital que además de mostrar, recomienda, analiza y gestiona la bodega en tiempo real.",
      bullets: [
        "Cada cambio en carta impresa implica coste y tiempo de reimpresión",
        "Winerim se actualiza al instante: precios, añadas, disponibilidad",
        "La carta impresa no personaliza la experiencia del comensal",
        "Winerim adapta las sugerencias al plato, preferencias y contexto",
      ],
    },
    tableColumns: ["Winerim", "Carta impresa"],
    tableRows: [
      { feature: "Actualización instantánea", options: [true, false] },
      { feature: "Sin costes de impresión", options: [true, false] },
      { feature: "Búsqueda y navegación interactiva", options: [true, false] },
      { feature: "Recomendaciones personalizadas", options: [true, false] },
      { feature: "Maridajes automáticos", options: [true, false] },
      { feature: "Gestión de stock y precios", options: [true, false] },
      { feature: "Analítica de ventas", options: [true, false] },
      { feature: "Elegancia y tacto físico", options: [false, true] },
      { feature: "Funciona sin tecnología", options: [false, true] },
      { feature: "Independiente de conexión", options: [false, true] },
    ],
    prosConsSections: [
      {
        title: "Carta impresa",
        pros: ["Elegancia y percepción premium en restaurantes de alta gama", "No depende de conexión ni dispositivos", "Experiencia táctil que algunos comensales valoran", "Sin curva tecnológica para el equipo"],
        cons: ["Cada cambio requiere reimpresión y coste", "No permite buscar, filtrar ni navegar", "No genera datos de interacción", "Cartas largas abruman al comensal", "No ayuda al equipo de sala a recomendar"],
      },
      {
        title: "Winerim",
        pros: ["Actualización instantánea sin coste", "Recomendaciones con IA, maridajes y fichas visuales", "Datos de ventas, rotación y rendimiento", "Multiidioma para clientes internacionales", "Compatible con tablet en mesa para mantener elegancia"],
        cons: ["Requiere dispositivo y conexión", "Algunos comensales prefieren el papel", "Suscripción mensual"],
      },
    ],
    whoFits: {
      alternativeLabel: "Carta impresa",
      alternativeOk: [
        "Restaurantes de alta gama con carta muy estable (cambia menos de 2 veces al año)",
        "Establecimientos donde la experiencia táctil es parte de la identidad",
        "Negocios con menos de 15 referencias",
      ],
      winerimIdeal: [
        "Restaurantes con rotación frecuente de referencias",
        "Negocios que quieren eliminar costes de impresión recurrentes",
        "Equipos de sala que necesitan apoyo para recomendar",
        "Restaurantes con clientes internacionales",
        "Locales que quieren datos de venta por referencia",
      ],
    },
    whenWinerim: [
      "Cuando los costes de reimpresión se acumulan por cambios frecuentes",
      "Cuando la carta tiene más de 30 referencias y el comensal se pierde",
      "Cuando el equipo de sala necesita herramientas para recomendar",
      "Cuando quieres saber qué vinos se venden y cuáles están muertos",
    ],
    faqs: [
      { q: "¿Puedo usar Winerim y mantener también una carta impresa?", a: "Sí. Muchos restaurantes usan ambas: carta impresa reducida con highlights y Winerim para la carta completa con fichas y recomendaciones." },
      { q: "¿Winerim funciona en tablets para mantener la elegancia?", a: "Sí. Winerim se usa en tablet en la mesa, manteniendo una experiencia premium y elegante, adaptada al branding del restaurante." },
      { q: "¿Cuánto ahorro en impresión con Winerim?", a: "Depende de la frecuencia de cambios. Restaurantes con rotación mensual pueden ahorrar varios cientos de euros al año solo en impresiones." },
    ],
    relatedLinks: [
      { to: "/carta-papel-vs-digital", label: "Carta papel vs digital — análisis completo", type: "guide" },
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/casos-exito", label: "Casos reales de restaurantes", type: "resource" },
      { to: "/funcionalidades", label: "Todas las funcionalidades", type: "solution" },
    ],
  },

  /* ════════════════════════════════════════════════════
     4. Winerim vs Gestión manual
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-gestion-manual",
    seoTitle: "Winerim vs Gestión Manual de Carta y Stock de Vinos",
    seoDesc: "¿Excel, papel y memoria? Comparativa entre Winerim y la gestión manual de carta de vinos, stock y pricing.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs gestión",
    h1Highlight: "manual de carta y stock",
    subtitle: "Excel, cuadernos, memoria del sommelier. La gestión manual funciona… hasta que deja de funcionar.",
    context: "La mayoría de restaurantes gestionan su carta de vinos, stock y precios con herramientas dispersas: Excel para precios, cuaderno para stock, memoria para saber qué recomendar. El problema no es que no funcione, sino que no escala, no genera datos y consume tiempo.",
    summary: {
      definition: "La gestión manual usa hojas de cálculo, notas y conocimiento personal para mantener la carta. Winerim centraliza carta, stock, pricing, analítica y recomendaciones en una sola plataforma con actualización en tiempo real.",
      bullets: [
        "La gestión manual depende de personas concretas — riesgo operativo alto",
        "Winerim centraliza todo: si alguien se va, los datos quedan",
        "Excel no genera alertas de stock bajo ni detecta vinos muertos",
        "Winerim automatiza alertas, rotación y optimización de precios",
      ],
    },
    tableColumns: ["Winerim", "Gestión manual"],
    tableRows: [
      { feature: "Carta siempre actualizada", options: [true, "partial"] },
      { feature: "Stock en tiempo real", options: [true, false] },
      { feature: "Alertas de stock bajo", options: [true, false] },
      { feature: "Detección de vinos muertos", options: [true, false] },
      { feature: "Pricing con datos de margen", options: [true, "partial"] },
      { feature: "Analítica de ventas y rotación", options: [true, false] },
      { feature: "Recomendaciones para el equipo", options: [true, false] },
      { feature: "Independiente de personas", options: [true, false] },
      { feature: "Coste cero", options: [false, true] },
      { feature: "Flexibilidad total", options: ["partial", true] },
    ],
    prosConsSections: [
      {
        title: "Gestión manual",
        pros: ["Sin coste de software", "Flexibilidad total para adaptar procesos", "El sommelier controla todo personalmente", "No requiere formación tecnológica"],
        cons: ["Depende de personas concretas — riesgo operativo", "No genera datos ni métricas automáticas", "Errores frecuentes en precios y stock", "Tiempo excesivo dedicado a tareas administrativas", "No detecta vinos muertos ni problemas de rotación"],
      },
      {
        title: "Winerim",
        pros: ["Centralización de carta, stock, precios y analítica", "Alertas automáticas de stock bajo y vinos sin rotación", "Datos de margen por referencia en tiempo real", "El conocimiento queda en el sistema, no en personas", "Ahorro significativo de horas de gestión"],
        cons: ["Requiere suscripción", "Cambio de hábitos para el equipo", "Requiere conexión a internet"],
      },
    ],
    whoFits: {
      alternativeLabel: "Gestión manual",
      alternativeOk: [
        "Restaurantes con menos de 15 referencias y un sommelier estable",
        "Negocios donde una sola persona gestiona todo y está cómoda con Excel",
        "Establecimientos sin interés en métricas ni optimización",
      ],
      winerimIdeal: [
        "Restaurantes con más de 25 referencias",
        "Negocios con rotación de personal en sala o bodega",
        "Grupos de restauración con varios puntos de venta",
        "Restaurantes que quieren reducir vinos muertos y optimizar compras",
        "Equipos que dedican más de 3 horas semanales a gestionar carta y stock",
      ],
    },
    whenWinerim: [
      "Cuando el sommelier se va y el conocimiento se pierde con él",
      "Cuando dedicas más tiempo a Excel que a atender mesas",
      "Cuando no sabes qué vinos no se venden hasta que es demasiado tarde",
      "Cuando gestionas más de un punto de venta",
    ],
    faqs: [
      { q: "¿Winerim sustituye a Excel para la gestión de bodega?", a: "Sí. Winerim centraliza lo que antes hacías en Excel (precios, stock, márgenes) con automatización, alertas y datos en tiempo real." },
      { q: "¿Qué pasa si mi sommelier se va?", a: "Con gestión manual, el conocimiento se pierde. Con Winerim, las fichas, notas, precios y datos quedan en el sistema, accesibles para el siguiente equipo." },
      { q: "¿Cuántas horas ahorra Winerim a la semana?", a: "Depende del volumen, pero restaurantes con +50 referencias reportan un ahorro de 3 a 8 horas semanales en tareas de gestión." },
    ],
    relatedLinks: [
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Guía: conectar carta, stock y margen", type: "guide" },
      { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Guía: detectar vinos muertos", type: "guide" },
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
    ],
  },

  /* ════════════════════════════════════════════════════
     5. Winerim vs herramientas genéricas de menú digital
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-menu-digital-generico",
    seoTitle: "Winerim vs Menú Digital Genérico — Comparativa para Carta de Vinos",
    seoDesc: "¿Un menú digital genérico sirve para gestionar tu carta de vinos? Comparativa entre Winerim y herramientas de menú digital estándar.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs menú digital",
    h1Highlight: "genérico",
    subtitle: "Las herramientas de menú digital resuelven el problema general. Pero la carta de vinos tiene necesidades muy específicas que un menú genérico no cubre.",
    context: "Existen decenas de herramientas para crear menús digitales. Funcionan bien para la carta de comida, pero la carta de vinos requiere fichas técnicas, maridajes, gestión de añadas, control de stock por referencia y recomendaciones inteligentes. Un menú genérico no está diseñado para esto.",
    summary: {
      definition: "Un menú digital genérico permite listar platos y bebidas con precios. Winerim es una plataforma vertical especializada en vino: fichas técnicas, maridajes, recomendaciones con IA, gestión de stock y analítica por referencia.",
      bullets: [
        "Los menús genéricos no tienen fichas técnicas de vino (uva, región, añada, notas de cata)",
        "Winerim incluye fichas completas con foto de etiqueta, perfil de sabor y maridajes",
        "Los menús genéricos no gestionan añadas ni stock por referencia",
        "Winerim conecta carta, stock, precios y ventas en un solo sistema",
      ],
    },
    tableColumns: ["Winerim", "Menú digital genérico"],
    tableRows: [
      { feature: "Fichas técnicas de vino", options: [true, false] },
      { feature: "Maridajes automáticos", options: [true, false] },
      { feature: "Recomendaciones con IA", options: [true, false] },
      { feature: "Gestión de añadas", options: [true, false] },
      { feature: "Stock por referencia", options: [true, false] },
      { feature: "Analítica de ventas de vino", options: [true, false] },
      { feature: "Filtros por tipo, región, precio", options: [true, "partial"] },
      { feature: "Carta de comida", options: [false, true] },
      { feature: "Coste bajo", options: ["partial", true] },
      { feature: "Setup rápido", options: ["partial", true] },
    ],
    prosConsSections: [
      {
        title: "Menú digital genérico",
        pros: ["Resuelve comida y bebida en una sola herramienta", "Setup rápido con plantillas", "Coste bajo o gratuito", "Integración con TPV en algunos casos"],
        cons: ["No tiene fichas técnicas de vino", "No gestiona añadas, stock ni rotación", "No ofrece maridajes ni recomendaciones", "No genera analítica específica de vino", "No ayuda al equipo a vender más vino"],
      },
      {
        title: "Winerim",
        pros: ["Especializado en vino: fichas, maridajes, IA, stock", "Recomendaciones inteligentes que suben el ticket medio", "Gestión completa de bodega y pricing", "Analítica de ventas por referencia y rotación", "Compatible con herramientas de menú para la carta de comida"],
        cons: ["No gestiona la carta de comida", "Requiere suscripción", "Setup más detallado por la riqueza de datos"],
      },
    ],
    whoFits: {
      alternativeLabel: "Menú digital genérico",
      alternativeOk: [
        "Restaurantes donde el vino es secundario (menos de 10 referencias)",
        "Negocios que solo necesitan una carta digital básica",
        "Establecimientos que priorizan la carta de comida sobre la de vinos",
      ],
      winerimIdeal: [
        "Restaurantes donde el vino es estratégico para el negocio",
        "Negocios con más de 20 referencias que necesitan gestión",
        "Equipos que quieren recomendaciones inteligentes para vender más",
        "Restaurantes que quieren analítica de ventas de vino",
        "Hoteles y grupos con múltiples cartas y puntos de venta",
      ],
    },
    whenWinerim: [
      "Cuando el vino representa más del 20% de tu facturación",
      "Cuando necesitas fichas técnicas, no solo un listado con precios",
      "Cuando quieres que la carta recomiende y suba el ticket medio",
      "Cuando gestionas más de 30 referencias y necesitas control de stock",
    ],
    faqs: [
      { q: "¿Puedo usar Winerim junto con mi menú digital actual?", a: "Sí. Winerim se encarga de la carta de vinos y se complementa con cualquier herramienta de menú digital para la carta de comida." },
      { q: "¿Un menú digital genérico puede mostrar vinos?", a: "Sí, como un listado con nombre y precio. Pero no ofrece fichas técnicas, maridajes, recomendaciones ni gestión de stock — que es lo que necesita una carta de vinos profesional." },
      { q: "¿Winerim es solo para restaurantes grandes?", a: "No. Winerim encaja en cualquier restaurante donde el vino sea importante para el negocio, desde gastrobares con 25 referencias hasta hoteles con 300." },
    ],
    relatedLinks: [
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/funcionalidades", label: "Todas las funcionalidades", type: "solution" },
      { to: "/integraciones", label: "Integraciones con TPV y sistemas", type: "solution" },
      { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "guide" },
    ],
  },

  /* ════════════════════════════════════════════════════
     6. Winerim vs depender solo de la recomendación humana
     ════════════════════════════════════════════════════ */
  {
    slug: "winerim-vs-recomendacion-humana",
    seoTitle: "Winerim vs Depender Solo del Sommelier o Camarero",
    seoDesc: "¿Es suficiente depender de la recomendación humana para vender vino? Comparativa entre Winerim y la recomendación exclusivamente humana en sala.",
    badge: "Comparativa BOFU",
    h1: "Winerim vs depender solo de la",
    h1Highlight: "recomendación humana",
    subtitle: "Un buen sommelier vende más que cualquier herramienta. Pero ¿qué pasa cuando no hay sommelier, cuando hay demasiadas mesas o cuando el equipo rota?",
    context: "La recomendación humana es la forma más efectiva de vender vino cuando funciona bien. El problema es que depende de una persona, de su conocimiento, de su disponibilidad y de su estado. Winerim no sustituye a esa persona — la amplifica.",
    summary: {
      definition: "La recomendación humana depende del conocimiento y disponibilidad del equipo de sala. Winerim complementa al equipo con datos, sugerencias y herramientas que amplían su capacidad de recomendar — sin sustituirlo.",
      bullets: [
        "Winerim no sustituye al sommelier: lo complementa y amplifica",
        "Cuando el sommelier no está, Winerim actúa como asistente inteligente",
        "El equipo de sala puede recomendar con confianza usando las fichas y maridajes de Winerim",
        "Winerim asegura consistencia: la recomendación no depende de quién esté en turno",
      ],
    },
    tableColumns: ["Winerim + equipo", "Solo recomendación humana"],
    tableRows: [
      { feature: "Consistencia en la recomendación", options: [true, false] },
      { feature: "Disponible en todas las mesas simultáneamente", options: [true, false] },
      { feature: "No depende de quién esté en turno", options: [true, false] },
      { feature: "Maridajes sugeridos automáticamente", options: [true, false] },
      { feature: "Datos de venta por referencia", options: [true, false] },
      { feature: "Conexión emocional con el comensal", options: ["partial", true] },
      { feature: "Lectura del contexto y estado de ánimo", options: [false, true] },
      { feature: "Capacidad de upselling sutil", options: [true, true] },
      { feature: "Funciona con personal sin formación en vino", options: [true, false] },
      { feature: "Coste adicional", options: ["partial", false] },
    ],
    prosConsSections: [
      {
        title: "Solo recomendación humana",
        pros: ["Conexión emocional con el comensal", "Lectura del contexto, estado de ánimo y preferencias", "Capacidad de storytelling sobre el vino", "Upselling natural y sutil", "No requiere tecnología"],
        cons: ["Depende de una persona — no escala", "Si el sommelier no está, la calidad cae", "El equipo junior no tiene el mismo nivel", "No genera datos para optimizar", "Inconsistencia entre turnos y equipos"],
      },
      {
        title: "Winerim + equipo",
        pros: ["Consistencia en la recomendación independientemente del turno", "El equipo junior recomienda con la misma calidad", "Datos de venta y rotación para decisiones informadas", "Maridajes automáticos que el camarero puede compartir", "Disponible en todas las mesas simultáneamente"],
        cons: ["No sustituye la conexión emocional humana", "Requiere suscripción", "Algunos comensales prefieren la interacción pura con el sommelier"],
      },
    ],
    whoFits: {
      alternativeLabel: "Solo recomendación humana",
      alternativeOk: [
        "Restaurantes con un sommelier excelente siempre presente",
        "Negocios con equipo estable y muy formado en vino",
        "Establecimientos pequeños con pocas mesas y pocas referencias",
      ],
      winerimIdeal: [
        "Restaurantes sin sommelier donde el equipo necesita apoyo",
        "Negocios con rotación de personal en sala",
        "Restaurantes con muchas mesas donde el sommelier no llega a todas",
        "Grupos de restauración que quieren consistencia entre locales",
        "Equipos donde quieres que todos recomienden al mismo nivel",
      ],
    },
    whenWinerim: [
      "Cuando el sommelier no puede atender todas las mesas en hora punta",
      "Cuando el equipo de sala rota y el conocimiento se pierde",
      "Cuando quieres que un camarero sin formación en vino recomiende con confianza",
      "Cuando necesitas datos para saber qué recomendar, no solo intuición",
    ],
    faqs: [
      { q: "¿Winerim sustituye al sommelier?", a: "No. Winerim complementa al equipo. En restaurantes con sommelier, amplifica su alcance. En restaurantes sin sommelier, actúa como asistente inteligente para el equipo de sala." },
      { q: "¿Un camarero sin formación en vino puede usar Winerim?", a: "Sí. Las fichas, maridajes y recomendaciones de Winerim permiten a cualquier camarero compartir información de calidad y recomendar con confianza." },
      { q: "¿Winerim reduce la necesidad de contratar un sommelier?", a: "Puede ayudar en restaurantes donde contratar un sommelier no es viable. Pero si tienes un sommelier excelente, Winerim potencia su trabajo en lugar de sustituirlo." },
    ],
    relatedLinks: [
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guía: formar al equipo de sala", type: "guide" },
      { to: "/casos-exito", label: "Casos reales de restaurantes", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica", type: "solution" },
    ],
  },
];
