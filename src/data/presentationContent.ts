import type { SupportedLang } from "@/i18n/types";

export interface PresentationContent {
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Shell
  shareLabel: string;
  shareCopied: string;
  fullscreenLabel: string;
  ctaTalk: string;
  preparedFor: (group: string) => string;
  // Slide 1 — Cover
  s1Eyebrow: string;
  s1Title: string;
  s1Subtitle: string;
  // Slide 2 — Problem
  s2Eyebrow: string;
  s2Title: string;
  s2Subtitle: string;
  // Slide 2b — 5 pains / 5 antidotes
  sPainsEyebrow: string;
  sPainsTitle: string;
  sPainsSubtitle: string;
  sPainsItems: { pain: string; antidote: string }[];
  sPainsPainLabel: string;
  sPainsAntidoteLabel: string;
  // Slide 3 — What
  s3Eyebrow: string;
  s3Title: string;
  s3Body: string;
  // Slide 4 — Match
  s4Eyebrow: string;
  s4Title: string;
  s4ColDinerTitle: string;
  s4ColDinerBody: string;
  s4ColRestaurantTitle: string;
  s4ColRestaurantBody: string;
  // Slide 5 — Restaurant benefits
  s5Eyebrow: string;
  s5Title: string;
  s5Items: { title: string; body: string }[];
  // Slide 6 — Diner benefits
  s6Eyebrow: string;
  s6Title: string;
  s6Items: { title: string; body: string }[];
  // Slide 7 — Pillars
  s7Eyebrow: string;
  s7Title: string;
  s7Subtitle: string;
  s7Pillars: { title: string; body: string }[];
  // Slide 8 — Tasting + Pairing
  s8Eyebrow: string;
  s8TastingTitle: string;
  s8TastingBody: string;
  s8PairingTitle: string;
  s8PairingBody: string;
  // Slide 9 — Big data + comparator
  s9Eyebrow: string;
  s9BigDataTitle: string;
  s9BigDataBullets: string[];
  s9CompTitle: string;
  s9CompBody: string;
  // Slide 10 — Stock
  s10Eyebrow: string;
  s10Title: string;
  s10Body: string;
  s10Items: { title: string; body: string }[];
  // Slide 11 — Groups
  s11Eyebrow: string;
  s11Title: string;
  s11Subtitle: string;
  s11Items: { title: string; body: string }[];
  // Slide 11b — Restaurant management & dynamic intelligence
  sMgmtEyebrow: string;
  sMgmtTitle: string;
  sMgmtSubtitle: string;
  sMgmtItems: { title: string; body: string }[];
  sMgmtFootnote: string;
  // Slide 11c — Winerim Supply
  sSupplyEyebrow: string;
  sSupplyTitle: string;
  sSupplyBody: string;
  sSupplyItems: { title: string; body: string }[];
  sSupplyTag: string;
  // Slide 12 — Implementation
  s12Eyebrow: string;
  s12Title: string;
  s12Body: string;
  s12Steps: { title: string; body: string }[];
  // Slide 13 — Clients
  s13Eyebrow: string;
  s13Title: string;
  s13Subtitle: string;
  s13Quote: string;
  s13QuoteAuthor: string;
  // Slide 14 — CTA
  s14Eyebrow: string;
  s14Title: string;
  s14Highlight1: string;
  s14Highlight2: string;
  s14CtaPrimary: string;
  s14CtaSecondary: string;
  s14Email: string;
  s14Phone: string;
}

const es: PresentationContent = {
  metaTitle: "Presentación Winerim · La carta de vinos inteligente",
  metaDescription: "Descubre cómo Winerim transforma la carta de vinos de tu grupo de restauración en una herramienta de venta inteligente, multi-local y rentable.",
  shareLabel: "Compartir",
  shareCopied: "Enlace copiado",
  fullscreenLabel: "Pantalla completa",
  ctaTalk: "Hablemos",
  preparedFor: (g) => `Preparado para ${g}`,
  s1Eyebrow: "Presentación oficial",
  s1Title: "La reVINOlución de la carta de vinos",
  s1Subtitle: "Inteligencia dinámica para vender más vino, controlar mejor la bodega y dar una experiencia memorable.",
  s2Eyebrow: "El reto",
  s2Title: "Si tienes más de 100 vinos, tu cliente tiene más de 100 dudas.",
  s2Subtitle: "Cartas extensas, márgenes opacos y decisiones lentas. La mayoría de restaurantes deja de vender vino simplemente porque su carta no ayuda a elegir.",
  sPainsEyebrow: "5 dolores · 5 antídotos",
  sPainsTitle: "Sabemos exactamente qué te frena cada día",
  sPainsSubtitle: "Cinco problemas reales del vino en hostelería y cómo Winerim los resuelve sin añadir trabajo a tu equipo.",
  sPainsPainLabel: "Dolor habitual",
  sPainsAntidoteLabel: "Antídoto Winerim",
  sPainsItems: [
    { pain: "El equipo no sabe vender vino.", antidote: "Sumiller digital con storytelling y notas de cata listas para usar." },
    { pain: "El comensal se bloquea al elegir.", antidote: "Filtros sensoriales y comparador de vinos guiado por IA." },
    { pain: "Maridajes fallidos arruinan el plato.", antidote: "Maridaje automático plato ↔ vino, en cualquier idioma." },
    { pain: "Carta y stock no se hablan.", antidote: "Inventario en tiempo real conectado a la carta del cliente." },
    { pain: "Botellas que nunca se mueven.", antidote: "IA que activa ventas y destaca referencias dormidas." },
  ],
  s3Eyebrow: "Qué es Winerim",
  s3Title: "Inteligencia dinámica para la carta de vinos",
  s3Body: "Winerim es la primera plataforma que combina recomendación con IA, gestión de bodega en tiempo real y analítica de ventas en una sola herramienta. Pensada para restaurantes y grupos que quieren convertir su carta en una palanca de rentabilidad.",
  s4Eyebrow: "Cómo funciona",
  s4Title: "Haz match con tu vino",
  s4ColDinerTitle: "Para el comensal",
  s4ColDinerBody: "Encuentra su vino ideal en segundos según su gusto, ocasión o maridaje. Sin dudas, sin barreras de compra.",
  s4ColRestaurantTitle: "Para el restaurante",
  s4ColRestaurantBody: "Control total sobre la oferta, el stock y los márgenes. Decisiones basadas en datos reales, no en intuiciones.",
  s5Eyebrow: "Beneficios",
  s5Title: "Lo que aporta Winerim a tu restaurante",
  s5Items: [
    { title: "Aumento del ticket medio", body: "Recomendaciones de maridaje personalizadas que elevan el gasto por mesa." },
    { title: "Servicio más eficiente", body: "Tu equipo recomienda con seguridad sin necesidad de ser sumiller." },
    { title: "Estrategia optimizada", body: "Destaca referencias clave y maximiza el beneficio por venta." },
    { title: "Stock en tiempo real", body: "Gestión y disponibilidad actualizadas al instante, sin conteos manuales." },
    { title: "Carta multilingüe", body: "Adaptada a clientela internacional sin trabajo extra." },
    { title: "Mayor rotación", body: "Reduce desperdicios y mejora el margen real de la bodega." },
    { title: "Más conversión en venta", body: "Elimina barreras de elección y facilita el cierre del pedido." },
  ],
  s6Eyebrow: "Beneficios",
  s6Title: "Lo que aporta Winerim a tu comensal",
  s6Items: [
    { title: "Selección sin dudas", body: "Herramienta intuitiva con descripciones claras y honestas." },
    { title: "Recomendaciones personalizadas", body: "Adaptadas a su gusto, su plato y la ocasión." },
    { title: "Confianza en la búsqueda", body: "Descubre vinos nuevos sin miedo a equivocarse." },
    { title: "Experiencia enriquecida", body: "Notas de cata detalladas y maridajes que añaden valor." },
  ],
  s7Eyebrow: "Capacidades clave",
  s7Title: "Una sola plataforma, seis pilares analíticos",
  s7Subtitle: "Cada decisión sobre tu carta tiene su lugar y sus métricas.",
  s7Pillars: [
    { title: "Notas de cata IA", body: "Descripciones precisas para que cada vino se venda solo." },
    { title: "Maridaje automático", body: "El sumiller digital que recomienda el vino perfecto para cada plato." },
    { title: "Big Data de bodega", body: "Tendencias, top ventas y decisiones basadas en consumo real." },
    { title: "Comparador de vinos", body: "Cotejar referencias por estilo, intensidad o margen." },
    { title: "Gestión de stock", body: "Inventario vivo con alertas y pedidos automatizados." },
    { title: "Pricing y márgenes", body: "Optimización de precios sin comprometer la experiencia." },
  ],
  s8Eyebrow: "Características",
  s8TastingTitle: "Notas de cata con IA",
  s8TastingBody: "Descripciones precisas y atractivas de cada vino: perfiles aromáticos, opiniones de expertos y guía de elección. El cliente siente seguridad y disfruta más.",
  s8PairingTitle: "Maridaje automático",
  s8PairingBody: "La IA recomienda el vino perfecto para cada plato considerando ingredientes, técnica y preferencias. Un sumiller digital siempre disponible.",
  s9Eyebrow: "Características",
  s9BigDataTitle: "Big Data y analítica de bodega",
  s9BigDataBullets: [
    "Identifica los vinos más vendidos y demandados.",
    "Ajusta oferta y precios según demanda y estacionalidad.",
    "Predice qué etiquetas funcionarán en tu carta.",
  ],
  s9CompTitle: "Comparador y recomendador",
  s9CompBody: "Selecciona vinos por potencia, acidez, dulzor, taninos y afrutado. Compara dos referencias de tu carta y descubre opciones similares con un solo clic.",
  s10Eyebrow: "Características",
  s10Title: "Gestión de stock y rentabilidad",
  s10Body: "Llevar el control de la bodega deja de ser un reto. Actualización en tiempo real y automatización para evitar errores y mejorar la operativa diaria.",
  s10Items: [
    { title: "Actualización automática", body: "Sin conteos manuales." },
    { title: "Alertas de umbral", body: "Aviso cuando quedan pocas botellas." },
    { title: "Optimización de rotación", body: "Asegura que los vinos rentables se mantengan." },
    { title: "Pedidos automatizados", body: "Sin desabastecimiento ni sobrestock." },
    { title: "Mejor rentabilidad", body: "Sugerencias inteligentes sin comprometer la experiencia." },
  ],
  s11Eyebrow: "Especial grupos",
  s11Title: "Pensado para grupos de restauración",
  s11Subtitle: "Una sola capa de inteligencia para todos tus locales, sin perder la personalidad de cada uno.",
  s11Items: [
    { title: "Control central, autonomía local", body: "Define estándares de grupo y deja que cada local module su carta dentro de esos límites." },
    { title: "Benchmarking entre locales", body: "Compara ticket medio de vino, rotación y márgenes entre tus restaurantes para detectar buenas prácticas." },
    { title: "Implementación coordinada", body: "Lanza Winerim en todos tus locales con una metodología y soporte únicos." },
    { title: "ROI medible", body: "Mide en cada local el retorno real sobre la inversión y prioriza siguientes pasos con datos." },
  ],
  sMgmtEyebrow: "Gestión + inteligencia dinámica",
  sMgmtTitle: "Una capa de inteligencia que opera sobre tu día a día",
  sMgmtSubtitle: "Más allá de la carta digital: Winerim conecta carta, bodega, ventas y equipo en tiempo real para que cada decisión esté basada en datos vivos.",
  sMgmtItems: [
    { title: "Backoffice unificado", body: "Carta, stock, precios, márgenes y rendimiento del equipo en un solo panel." },
    { title: "Inteligencia dinámica", body: "Recomendaciones que se recalculan cada día según ventas reales, estacionalidad y demanda." },
    { title: "Alertas accionables", body: "Vinos sin rotación, mermas de margen o referencias agotadas: avisos antes de que afecten al servicio." },
    { title: "Decision Center", body: "Centro de decisiones con playbooks por área (carta, compras, vino por copa, grupos) listos para ejecutar." },
    { title: "Equipo y formación", body: "Tu sala vende mejor con notas de cata, maridajes y argumentarios siempre actualizados." },
    { title: "Informes ejecutivos", body: "Reportes mensuales para dirección con KPIs de vino claros y comparables." },
  ],
  sMgmtFootnote: "La carta deja de ser un PDF estático y se convierte en el sistema operativo del vino del restaurante.",
  sSupplyEyebrow: "Winerim Supply",
  sSupplyTitle: "Inteligencia de compras conectada a tu carta",
  sSupplyBody: "Winerim Supply es el módulo de compras inteligente: cruza tus ventas reales con catálogos de distribuidores para que pidas mejor, negocies con datos y protejas tu margen.",
  sSupplyItems: [
    { title: "Pedidos sugeridos", body: "Propuestas de compra basadas en rotación, estacionalidad y stock objetivo." },
    { title: "Comparativa de proveedores", body: "Mismo vino, varios distribuidores: precio, condiciones y disponibilidad de un vistazo." },
    { title: "Negociación con datos", body: "Llega a cada reunión comercial con histórico de consumo y volumen real por bodega." },
    { title: "Margen protegido", body: "Detecta subidas de coste y simula el impacto en tu PVP antes de aceptar la tarifa." },
  ],
  sSupplyTag: "Disponible para grupos de restauración y restaurantes con bodega activa.",
  s12Eyebrow: "Implementación",
  s12Title: "En marcha en cuestión de días",
  s12Body: "Implementar Winerim es un proceso sencillo y sin complicaciones. Nuestro equipo se encarga de todo para que el restaurante empiece a usar la herramienta sin esfuerzo.",
  s12Steps: [
    { title: "Carga inicial", body: "Subimos tu carta completa con referencias y notas de cata, configuradas al detalle." },
    { title: "QR y enlace a carta", body: "Acceso inmediato desde cualquier dispositivo, sin instalación." },
    { title: "Posibilidad de impresión", body: "Imprime la carta cuando quieras, con o sin imágenes de botellas." },
    { title: "Soporte y actualizaciones", body: "Soporte continuo y mejoras incluidas, sin coste adicional." },
  ],
  s13Eyebrow: "Clientes",
  s13Title: "Restaurantes que ya confían en Winerim",
  s13Subtitle: "Estrellas Michelin, grupos hoteleros y referentes de hospitalidad usan Winerim cada día.",
  s13Quote: "Lo único que nos diferencia de la competencia es que nosotros te hacemos ganar dinero.",
  s13QuoteAuthor: "Equipo Winerim",
  s14Eyebrow: "¿Hablamos?",
  s14Title: "¿Ribera, Rioja o Winerim?",
  s14Highlight1: "Convierte la elección del vino en una experiencia emocionante, intuitiva y rentable.",
  s14Highlight2: "Descubre cómo Winerim puede hacer crecer tu restaurante y transformar tu carta en una herramienta de ventas inteligente.",
  s14CtaPrimary: "Agendar demo",
  s14CtaSecondary: "Compartir presentación",
  s14Email: "info@winerim.com",
  s14Phone: "+34 614 499 864",
};

const en: PresentationContent = {
  metaTitle: "Winerim Presentation · The intelligent wine list",
  metaDescription: "See how Winerim turns your restaurant group's wine list into a smart, multi-unit, profitable sales tool.",
  shareLabel: "Share",
  shareCopied: "Link copied",
  fullscreenLabel: "Fullscreen",
  ctaTalk: "Let's talk",
  preparedFor: (g) => `Prepared for ${g}`,
  s1Eyebrow: "Official deck",
  s1Title: "The reVINOlution of the wine list",
  s1Subtitle: "Dynamic intelligence to sell more wine, manage your cellar in real time and create a memorable experience.",
  s2Eyebrow: "The challenge",
  s2Title: "If you have over 100 wines, your customer has over 100 doubts.",
  s2Subtitle: "Long lists, opaque margins and slow decisions. Most restaurants stop selling wine simply because their list doesn't help diners choose.",
  sPainsEyebrow: "5 pains · 5 remedies",
  sPainsTitle: "We know exactly what holds you back every day",
  sPainsSubtitle: "Five real wine pains in hospitality and how Winerim solves them without adding work to your team.",
  sPainsPainLabel: "Typical pain",
  sPainsAntidoteLabel: "Winerim remedy",
  sPainsItems: [
    { pain: "Staff doesn't know how to sell wine.", antidote: "Digital sommelier with storytelling and ready tasting notes." },
    { pain: "Diners get blocked when choosing.", antidote: "Sensory filters and AI-guided wine comparator." },
    { pain: "Failed pairings ruin the dish.", antidote: "Automatic dish-to-wine pairing, in any language." },
    { pain: "Menu and stock don't talk.", antidote: "Real-time inventory connected to the customer's menu." },
    { pain: "Bottles that never move.", antidote: "AI that activates sales and surfaces dormant references." },
  ],
  s3Eyebrow: "What Winerim is",
  s3Title: "Dynamic intelligence for your wine list",
  s3Body: "Winerim is the first platform that combines AI recommendation, real-time cellar management and sales analytics in a single tool. Built for restaurants and groups that want their wine list to be a profitability lever.",
  s4Eyebrow: "How it works",
  s4Title: "Match with your wine",
  s4ColDinerTitle: "For the diner",
  s4ColDinerBody: "Find the perfect wine in seconds based on taste, occasion or pairing. No doubts, no purchase friction.",
  s4ColRestaurantTitle: "For the restaurant",
  s4ColRestaurantBody: "Full control over your offer, stock and margins. Decisions backed by real data, not intuition.",
  s5Eyebrow: "Advantages",
  s5Title: "What Winerim brings to your restaurant",
  s5Items: [
    { title: "Higher average ticket", body: "Personalized pairing suggestions that lift spend per table." },
    { title: "More efficient service", body: "Your team recommends with confidence — no sommelier required." },
    { title: "Optimized strategy", body: "Highlight key labels and maximize profit per sale." },
    { title: "Real-time inventory", body: "Live availability, no manual counts." },
    { title: "Multilingual list", body: "Adapted for international diners with zero extra work." },
    { title: "Better rotation", body: "Reduce waste and improve real cellar margins." },
    { title: "Higher conversion", body: "Remove choice barriers and help close the order." },
  ],
  s6Eyebrow: "Advantages",
  s6Title: "What Winerim brings to your guests",
  s6Items: [
    { title: "Effortless selection", body: "Intuitive tool with clear, honest descriptions." },
    { title: "Personalized picks", body: "Tailored to taste, dish and occasion." },
    { title: "Confidence in choice", body: "Discover new wines with peace of mind." },
    { title: "Enriched experience", body: "Detailed tasting notes and pairings that add value." },
  ],
  s7Eyebrow: "Core capabilities",
  s7Title: "One platform, six analytical pillars",
  s7Subtitle: "Every wine-list decision has its place — and its metrics.",
  s7Pillars: [
    { title: "AI tasting notes", body: "Precise descriptions so every wine sells itself." },
    { title: "Automatic pairing", body: "The digital sommelier that picks the perfect wine for every dish." },
    { title: "Cellar Big Data", body: "Trends, top sellers and decisions based on real consumption." },
    { title: "Wine comparator", body: "Compare references by style, intensity or margin." },
    { title: "Stock management", body: "Live inventory with alerts and automated ordering." },
    { title: "Pricing & margins", body: "Optimize prices without compromising the experience." },
  ],
  s8Eyebrow: "Features",
  s8TastingTitle: "AI tasting notes",
  s8TastingBody: "Precise, appealing descriptions of every wine: aroma profiles, expert opinions and choice guidance. Diners feel confident and enjoy more.",
  s8PairingTitle: "Automatic pairing",
  s8PairingBody: "AI recommends the perfect wine for every dish, considering ingredients, technique and preferences. A digital sommelier always on duty.",
  s9Eyebrow: "Features",
  s9BigDataTitle: "Big Data and cellar analytics",
  s9BigDataBullets: [
    "Identify top-selling and most-demanded wines.",
    "Adjust offer and prices based on demand and seasonality.",
    "Predict which labels will succeed on your list.",
  ],
  s9CompTitle: "Comparator and advisor",
  s9CompBody: "Pick wines by body, acidity, sweetness, tannins and fruit. Compare two references and surface similar options in a single click.",
  s10Eyebrow: "Features",
  s10Title: "Stock management and profitability",
  s10Body: "Cellar control stops being a challenge. Real-time updates and automation prevent errors and improve daily operations.",
  s10Items: [
    { title: "Automatic updates", body: "No more manual counts." },
    { title: "Threshold alerts", body: "Get notified when stock runs low." },
    { title: "Rotation optimization", body: "Keep profitable wines always on the list." },
    { title: "Automated ordering", body: "No stockouts, no overstock." },
    { title: "Better profitability", body: "Smart suggestions that don't compromise experience." },
  ],
  s11Eyebrow: "For groups",
  s11Title: "Built for restaurant groups",
  s11Subtitle: "One layer of intelligence across every venue — without losing each one's personality.",
  s11Items: [
    { title: "Central control, local autonomy", body: "Set group standards and let each unit fine-tune its list within those limits." },
    { title: "Cross-venue benchmarking", body: "Compare wine ticket, rotation and margins between units to spot best practices." },
    { title: "Coordinated rollout", body: "Launch Winerim across every venue with one methodology and one support team." },
    { title: "Measurable ROI", body: "Track real return per venue and prioritize next steps with data." },
  ],
  sMgmtEyebrow: "Management + dynamic intelligence",
  sMgmtTitle: "An intelligence layer that runs your day-to-day",
  sMgmtSubtitle: "Beyond a digital wine list: Winerim connects menu, cellar, sales and team in real time so every decision is based on live data.",
  sMgmtItems: [
    { title: "Unified backoffice", body: "Menu, stock, prices, margins and team performance in one panel." },
    { title: "Dynamic intelligence", body: "Recommendations recalculated daily from real sales, seasonality and demand." },
    { title: "Actionable alerts", body: "Slow-moving wines, margin drops or out-of-stock labels: warnings before they hit service." },
    { title: "Decision Center", body: "A decision hub with playbooks by area (menu, purchasing, wine by the glass, groups) ready to execute." },
    { title: "Team & training", body: "Your floor sells better with always up-to-date tasting notes, pairings and talking points." },
    { title: "Executive reporting", body: "Monthly reports for leadership with clear, comparable wine KPIs." },
  ],
  sMgmtFootnote: "The wine list stops being a static PDF and becomes the restaurant's wine operating system.",
  sSupplyEyebrow: "Winerim Supply",
  sSupplyTitle: "Purchasing intelligence connected to your list",
  sSupplyBody: "Winerim Supply is the smart purchasing module: it cross-references real sales with distributor catalogues so you order better, negotiate with data and protect your margin.",
  sSupplyItems: [
    { title: "Suggested orders", body: "Purchase proposals based on rotation, seasonality and target stock." },
    { title: "Supplier benchmarking", body: "Same wine, several distributors: price, terms and availability at a glance." },
    { title: "Data-backed negotiation", body: "Walk into every supplier meeting with consumption history and real volume per winery." },
    { title: "Margin protected", body: "Spot cost increases and simulate the impact on your retail price before accepting." },
  ],
  sSupplyTag: "Available for restaurant groups and restaurants with an active cellar.",
  s12Eyebrow: "Implementation",
  s12Title: "Live in a matter of days",
  s12Body: "Implementing Winerim is smooth and hassle-free. Our team handles everything so the restaurant can start using the tool effortlessly.",
  s12Steps: [
    { title: "Initial upload", body: "We upload your full list with references and tasting notes, set up to detail." },
    { title: "QR and menu link", body: "Instant access from any device, no install required." },
    { title: "Print option", body: "Print the menu whenever you want, with or without bottle images." },
    { title: "Support and updates", body: "Continuous support and improvements included, no extra cost." },
  ],
  s13Eyebrow: "Clients",
  s13Title: "Restaurants already trusting Winerim",
  s13Subtitle: "Michelin stars, hotel groups and hospitality leaders use Winerim every day.",
  s13Quote: "The only thing that sets us apart from the competition is that we make you money.",
  s13QuoteAuthor: "Winerim team",
  s14Eyebrow: "Let's talk",
  s14Title: "Ribera, Rioja or Winerim?",
  s14Highlight1: "Turn wine selection into an exciting, intuitive and profitable experience.",
  s14Highlight2: "See how Winerim can grow your restaurant and turn your wine list into a smart sales tool.",
  s14CtaPrimary: "Book a demo",
  s14CtaSecondary: "Share this deck",
  s14Email: "info@winerim.com",
  s14Phone: "+34 614 499 864",
};

const fr: PresentationContent = {
  ...en,
  metaTitle: "Présentation Winerim · La carte des vins intelligente",
  metaDescription: "Découvrez comment Winerim transforme la carte des vins de votre groupe de restauration en un outil de vente intelligent, multi-sites et rentable.",
  shareLabel: "Partager",
  shareCopied: "Lien copié",
  fullscreenLabel: "Plein écran",
  ctaTalk: "Parlons-en",
  preparedFor: (g) => `Préparé pour ${g}`,
  s1Eyebrow: "Présentation officielle",
  s1Title: "La reVINOlution de la carte des vins",
  s1Subtitle: "Intelligence dynamique pour vendre plus de vin, gérer la cave en temps réel et créer une expérience mémorable.",
  s2Eyebrow: "Le défi",
  s2Title: "Si vous avez plus de 100 vins, votre client a plus de 100 doutes.",
  s2Subtitle: "Cartes longues, marges opaques et décisions lentes. La plupart des restaurants vendent moins de vin simplement parce que leur carte n'aide pas à choisir.",
  s3Eyebrow: "Qu'est-ce que Winerim",
  s3Title: "Intelligence dynamique pour votre carte des vins",
  s3Body: "Winerim est la première plateforme qui combine recommandation par IA, gestion de cave en temps réel et analyse des ventes en un seul outil. Pensée pour les restaurants et les groupes qui veulent que leur carte devienne un levier de rentabilité.",
  s4Title: "Trouvez votre accord avec le vin",
  s4ColDinerTitle: "Pour le client",
  s4ColDinerBody: "Trouve son vin idéal en quelques secondes selon son goût, l'occasion ou l'accord. Sans hésitation, sans frein à l'achat.",
  s4ColRestaurantTitle: "Pour le restaurant",
  s4ColRestaurantBody: "Contrôle total sur l'offre, le stock et les marges. Décisions appuyées par des données réelles, pas l'intuition.",
  s11Title: "Pensé pour les groupes de restauration",
  s11Subtitle: "Une seule couche d'intelligence pour tous vos établissements, sans perdre leur personnalité.",
  s14Title: "Bordeaux, Bourgogne ou Winerim ?",
  s14CtaPrimary: "Réserver une démo",
  s14CtaSecondary: "Partager cette présentation",
};

const it: PresentationContent = {
  ...en,
  metaTitle: "Presentazione Winerim · La carta dei vini intelligente",
  metaDescription: "Scopri come Winerim trasforma la carta dei vini del tuo gruppo di ristorazione in uno strumento di vendita intelligente, multi-locale e redditizio.",
  shareLabel: "Condividi",
  shareCopied: "Link copiato",
  fullscreenLabel: "Schermo intero",
  ctaTalk: "Parliamone",
  preparedFor: (g) => `Preparato per ${g}`,
  s1Eyebrow: "Presentazione ufficiale",
  s1Title: "La reVINOluzione della carta dei vini",
  s1Subtitle: "Intelligenza dinamica per vendere più vino, gestire la cantina in tempo reale e creare un'esperienza memorabile.",
  s2Eyebrow: "La sfida",
  s2Title: "Se hai più di 100 vini, il tuo cliente ha più di 100 dubbi.",
  s2Subtitle: "Carte lunghe, margini opachi e decisioni lente. Molti ristoranti vendono meno vino solo perché la carta non aiuta a scegliere.",
  s3Title: "Intelligenza dinamica per la tua carta dei vini",
  s3Body: "Winerim è la prima piattaforma che unisce raccomandazione IA, gestione della cantina in tempo reale e analisi delle vendite in un unico strumento. Pensata per ristoranti e gruppi che vogliono trasformare la carta in una leva di redditività.",
  s4Title: "Trova il tuo abbinamento con il vino",
  s4ColDinerTitle: "Per il cliente",
  s4ColDinerBody: "Trova il vino ideale in pochi secondi in base al gusto, all'occasione o all'abbinamento. Senza dubbi, senza barriere all'acquisto.",
  s4ColRestaurantTitle: "Per il ristorante",
  s4ColRestaurantBody: "Controllo totale su offerta, stock e margini. Decisioni basate su dati reali, non sull'intuito.",
  s11Title: "Pensato per i gruppi di ristorazione",
  s14Title: "Toscana, Piemonte o Winerim?",
  s14CtaPrimary: "Prenota una demo",
  s14CtaSecondary: "Condividi questa presentazione",
};

const de: PresentationContent = {
  ...en,
  metaTitle: "Winerim Präsentation · Die intelligente Weinkarte",
  metaDescription: "Entdecken Sie, wie Winerim die Weinkarte Ihrer Gastronomiegruppe in ein intelligentes, multi-standortfähiges und profitables Verkaufsinstrument verwandelt.",
  shareLabel: "Teilen",
  shareCopied: "Link kopiert",
  fullscreenLabel: "Vollbild",
  ctaTalk: "Sprechen wir",
  preparedFor: (g) => `Vorbereitet für ${g}`,
  s1Eyebrow: "Offizielle Präsentation",
  s1Title: "Die reVINOlution der Weinkarte",
  s1Subtitle: "Dynamische Intelligenz, um mehr Wein zu verkaufen, den Weinkeller in Echtzeit zu steuern und ein einzigartiges Erlebnis zu schaffen.",
  s2Eyebrow: "Die Herausforderung",
  s2Title: "Mit über 100 Weinen hat Ihr Gast über 100 Zweifel.",
  s2Subtitle: "Lange Karten, undurchsichtige Margen und langsame Entscheidungen. Viele Restaurants verkaufen weniger Wein, weil die Karte beim Wählen nicht hilft.",
  s3Title: "Dynamische Intelligenz für Ihre Weinkarte",
  s3Body: "Winerim ist die erste Plattform, die KI-Empfehlung, Echtzeit-Kellersteuerung und Verkaufsanalyse vereint. Für Restaurants und Gruppen, die ihre Karte zum Renditehebel machen wollen.",
  s4Title: "Finden Sie Ihren Wein-Match",
  s4ColDinerTitle: "Für den Gast",
  s4ColDinerBody: "Findet seinen Wein in Sekunden – nach Geschmack, Anlass oder Speise. Keine Zweifel, keine Kaufbarrieren.",
  s4ColRestaurantTitle: "Für das Restaurant",
  s4ColRestaurantBody: "Volle Kontrolle über Angebot, Bestand und Margen. Entscheidungen auf Basis echter Daten, nicht Intuition.",
  s11Title: "Gemacht für Gastronomiegruppen",
  s14Title: "Rheingau, Mosel oder Winerim?",
  s14CtaPrimary: "Demo buchen",
  s14CtaSecondary: "Diese Präsentation teilen",
};

const pt: PresentationContent = {
  ...en,
  metaTitle: "Apresentação Winerim · A carta de vinhos inteligente",
  metaDescription: "Descubra como a Winerim transforma a carta de vinhos do seu grupo de restauração numa ferramenta de venda inteligente, multi-local e rentável.",
  shareLabel: "Partilhar",
  shareCopied: "Link copiado",
  fullscreenLabel: "Ecrã inteiro",
  ctaTalk: "Falemos",
  preparedFor: (g) => `Preparado para ${g}`,
  s1Eyebrow: "Apresentação oficial",
  s1Title: "A reVINOlução da carta de vinhos",
  s1Subtitle: "Inteligência dinâmica para vender mais vinho, gerir a adega em tempo real e criar uma experiência memorável.",
  s2Eyebrow: "O desafio",
  s2Title: "Se tem mais de 100 vinhos, o seu cliente tem mais de 100 dúvidas.",
  s2Subtitle: "Cartas longas, margens opacas e decisões lentas. Muitos restaurantes deixam de vender vinho apenas porque a carta não ajuda a escolher.",
  s3Title: "Inteligência dinâmica para a sua carta de vinhos",
  s3Body: "A Winerim é a primeira plataforma que combina recomendação por IA, gestão de adega em tempo real e analítica de vendas numa única ferramenta. Pensada para restaurantes e grupos que querem transformar a carta numa alavanca de rentabilidade.",
  s4Title: "Faça match com o seu vinho",
  s4ColDinerTitle: "Para o cliente",
  s4ColDinerBody: "Encontra o vinho ideal em segundos consoante o gosto, ocasião ou harmonização. Sem dúvidas, sem barreiras.",
  s4ColRestaurantTitle: "Para o restaurante",
  s4ColRestaurantBody: "Controlo total sobre oferta, stock e margens. Decisões baseadas em dados reais, não em intuição.",
  s11Title: "Pensado para grupos de restauração",
  s14Title: "Douro, Alentejo ou Winerim?",
  s14CtaPrimary: "Agendar demo",
  s14CtaSecondary: "Partilhar apresentação",
};

export const PRESENTATION_CONTENT: Record<SupportedLang, PresentationContent> = {
  es, en, fr, it, de, pt,
};

/** ES path → localized presentation path */
export const PRESENTATION_ROUTE: Record<SupportedLang, string> = {
  es: "/presentacion",
  en: "/en/presentation",
  fr: "/fr/presentation",
  it: "/it/presentazione",
  de: "/de/praesentation",
  pt: "/pt/apresentacao",
};