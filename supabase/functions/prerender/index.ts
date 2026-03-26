/**
 * Dynamic Rendering Edge Function — v2
 * 
 * Serves pre-rendered HTML to search engine bots and AI crawlers.
 * Human visitors get the normal SPA (index.html).
 * 
 * COVERAGE:
 * - 20+ static pages with full semantic HTML, hreflang, schema
 * - Dynamic SEO pages from seo_pages table
 * - Dynamic articles from articles table
 * - Fallback: SPA for humans
 */

const SITE = 'https://winerim.wine';
const OG_IMAGE = `${SITE}/og-image.png`;

const BOT_UA_PATTERNS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
  'slurp', 'ia_archiver', 'facebot', 'facebookexternalhit',
  'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'applebot', 'semrushbot', 'ahrefsbot', 'mj12bot',
  'chatgpt-user', 'gptbot', 'claudebot', 'anthropic-ai',
  'perplexitybot', 'cohere-ai', 'bytespider',
  'google-extended', 'ccbot',
  'petalbot', 'sogou', 'exabot',
];

function isBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_UA_PATTERNS.some(p => lower.includes(p));
}

// ── Types ──
interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  lang: string;
  type: string;
  schemaType: string;
}

interface PageContent {
  h1: string;
  subtitle?: string;
  intro?: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
  breadcrumbs: { name: string; url: string }[];
  internalLinks: { label: string; url: string }[];
}

interface HreflangEntry { lang: string; url: string }

// ── Hreflang map: ES path → other language paths ──
const HREFLANG_MAP: Record<string, HreflangEntry[]> = {
  '/': [
    { lang: 'es', url: `${SITE}/` },
    { lang: 'en', url: `${SITE}/en` },
    { lang: 'it', url: `${SITE}/it` },
    { lang: 'fr', url: `${SITE}/fr` },
    { lang: 'x-default', url: `${SITE}/` },
  ],
  '/funcionalidades': [
    { lang: 'es', url: `${SITE}/funcionalidades` },
    { lang: 'en', url: `${SITE}/en/features` },
    { lang: 'it', url: `${SITE}/it/funzionalita` },
    { lang: 'fr', url: `${SITE}/fr/fonctionnalites` },
    { lang: 'x-default', url: `${SITE}/funcionalidades` },
  ],
  '/precios': [
    { lang: 'es', url: `${SITE}/precios` },
    { lang: 'en', url: `${SITE}/en/pricing` },
    { lang: 'it', url: `${SITE}/it/prezzi` },
    { lang: 'fr', url: `${SITE}/fr/tarifs` },
    { lang: 'x-default', url: `${SITE}/precios` },
  ],
  '/software-carta-de-vinos': [
    { lang: 'es', url: `${SITE}/software-carta-de-vinos` },
    { lang: 'en', url: `${SITE}/en/wine-list-management-software` },
    { lang: 'it', url: `${SITE}/it/software-carta-vini` },
    { lang: 'fr', url: `${SITE}/fr/logiciel-carte-des-vins` },
    { lang: 'x-default', url: `${SITE}/software-carta-de-vinos` },
  ],
  '/contacto': [
    { lang: 'es', url: `${SITE}/contacto` },
    { lang: 'en', url: `${SITE}/en/contact` },
    { lang: 'it', url: `${SITE}/it/contatto` },
    { lang: 'x-default', url: `${SITE}/contacto` },
  ],
  '/demo': [
    { lang: 'es', url: `${SITE}/demo` },
    { lang: 'en', url: `${SITE}/en/demo` },
    { lang: 'it', url: `${SITE}/it/demo` },
    { lang: 'fr', url: `${SITE}/fr/demo` },
    { lang: 'x-default', url: `${SITE}/demo` },
  ],
  '/casos-exito': [
    { lang: 'es', url: `${SITE}/casos-exito` },
    { lang: 'en', url: `${SITE}/en/case-studies` },
    { lang: 'it', url: `${SITE}/it/casi-di-successo` },
    { lang: 'fr', url: `${SITE}/fr/cas-clients` },
    { lang: 'x-default', url: `${SITE}/casos-exito` },
  ],
  '/clientes': [
    { lang: 'es', url: `${SITE}/clientes` },
    { lang: 'en', url: `${SITE}/en/clients` },
    { lang: 'it', url: `${SITE}/it/clienti` },
    { lang: 'x-default', url: `${SITE}/clientes` },
  ],
  '/integraciones': [
    { lang: 'es', url: `${SITE}/integraciones` },
    { lang: 'en', url: `${SITE}/en/integrations` },
    { lang: 'it', url: `${SITE}/it/integrazioni` },
    { lang: 'x-default', url: `${SITE}/integraciones` },
  ],
  '/herramientas': [
    { lang: 'es', url: `${SITE}/herramientas` },
    { lang: 'en', url: `${SITE}/en/tools` },
    { lang: 'it', url: `${SITE}/it/strumenti` },
    { lang: 'fr', url: `${SITE}/fr/outils` },
    { lang: 'x-default', url: `${SITE}/herramientas` },
  ],
  '/guias-y-recursos': [
    { lang: 'es', url: `${SITE}/guias-y-recursos` },
    { lang: 'en', url: `${SITE}/en/guides` },
    { lang: 'it', url: `${SITE}/it/guide` },
    { lang: 'x-default', url: `${SITE}/guias-y-recursos` },
  ],
  '/soluciones': [
    { lang: 'es', url: `${SITE}/soluciones` },
    { lang: 'en', url: `${SITE}/en/solutions` },
    { lang: 'it', url: `${SITE}/it/soluzioni` },
    { lang: 'x-default', url: `${SITE}/soluciones` },
  ],
  '/problemas': [
    { lang: 'es', url: `${SITE}/problemas` },
    { lang: 'en', url: `${SITE}/en/challenges` },
    { lang: 'it', url: `${SITE}/it/sfide` },
    { lang: 'fr', url: `${SITE}/fr/defis` },
    { lang: 'x-default', url: `${SITE}/problemas` },
  ],
  '/producto/winerim-core': [
    { lang: 'es', url: `${SITE}/producto/winerim-core` },
    { lang: 'en', url: `${SITE}/en/product/winerim-core` },
    { lang: 'it', url: `${SITE}/it/prodotto/winerim-core` },
    { lang: 'fr', url: `${SITE}/fr/produit/winerim-core` },
    { lang: 'x-default', url: `${SITE}/producto/winerim-core` },
  ],
  '/producto/winerim-supply': [
    { lang: 'es', url: `${SITE}/producto/winerim-supply` },
    { lang: 'en', url: `${SITE}/en/product/winerim-supply` },
    { lang: 'it', url: `${SITE}/it/prodotto/winerim-supply` },
    { lang: 'fr', url: `${SITE}/fr/produit/winerim-supply` },
    { lang: 'x-default', url: `${SITE}/producto/winerim-supply` },
  ],
  '/producto/inteligencia-dinamica': [
    { lang: 'es', url: `${SITE}/producto/inteligencia-dinamica` },
    { lang: 'en', url: `${SITE}/en/product/dynamic-intelligence` },
    { lang: 'it', url: `${SITE}/it/prodotto/intelligenza-dinamica` },
    { lang: 'fr', url: `${SITE}/fr/produit/intelligence-dynamique` },
    { lang: 'x-default', url: `${SITE}/producto/inteligencia-dinamica` },
  ],
  '/analisis-carta': [
    { lang: 'es', url: `${SITE}/analisis-carta` },
    { lang: 'en', url: `${SITE}/en/wine-list-analysis` },
    { lang: 'it', url: `${SITE}/it/analisi-carta` },
    { lang: 'fr', url: `${SITE}/fr/analyse-carte` },
    { lang: 'x-default', url: `${SITE}/analisis-carta` },
  ],
  '/calculadora-margen-vino': [
    { lang: 'es', url: `${SITE}/calculadora-margen-vino` },
    { lang: 'en', url: `${SITE}/en/wine-margin-calculator` },
    { lang: 'it', url: `${SITE}/it/calcolatrice-margini-vino` },
    { lang: 'fr', url: `${SITE}/fr/calculateur-marge-vin` },
    { lang: 'x-default', url: `${SITE}/calculadora-margen-vino` },
  ],
  '/afiliate': [
    { lang: 'es', url: `${SITE}/afiliate` },
    { lang: 'en', url: `${SITE}/en/affiliate` },
    { lang: 'it', url: `${SITE}/it/affiliati` },
    { lang: 'fr', url: `${SITE}/fr/affilies` },
    { lang: 'x-default', url: `${SITE}/afiliate` },
  ],
  '/sommelier-corner': [
    { lang: 'es', url: `${SITE}/sommelier-corner` },
    { lang: 'en', url: `${SITE}/en/sommelier-corner` },
    { lang: 'it', url: `${SITE}/it/sommelier-corner` },
    { lang: 'fr', url: `${SITE}/fr/sommelier-corner` },
    { lang: 'x-default', url: `${SITE}/sommelier-corner` },
  ],
  '/que-es-winerim': [
    { lang: 'es', url: `${SITE}/que-es-winerim` },
    { lang: 'en', url: `${SITE}/en/what-is-winerim` },
    { lang: 'it', url: `${SITE}/it/cose-winerim` },
    { lang: 'fr', url: `${SITE}/fr/quest-ce-que-winerim` },
    { lang: 'x-default', url: `${SITE}/que-es-winerim` },
  ],
};

// ── Static page definitions ──
// Each page has full semantic content for bots — independent of React hydration.
const STATIC_PAGES: Record<string, { meta: PageMeta; content: PageContent }> = {
  '/': {
    meta: {
      title: 'Software de IA para Restaurantes — Vende Más Vino | Winerim',
      description: 'Winerim es el software de IA que ayuda a restaurantes a vender más vino, mejorar el ticket medio, optimizar márgenes y controlar la bodega. Carta digital inteligente con recomendaciones, maridajes y analítica.',
      canonical: SITE,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Convierte tu carta de vinos en ventas, margen y control',
      subtitle: 'Winerim es el software que ayuda a restaurantes a vender más vino, mejorar el ticket medio, optimizar márgenes y controlar la bodega — con inteligencia artificial, sin depender del sommelier.',
      sections: [
        { heading: 'El problema', content: 'La carta de vinos no vende, solo informa. El equipo de sala no tiene tiempo ni conocimiento para recomendar. Hay vinos parados sin rotación. No hay datos claros para tomar decisiones de compra ni pricing.' },
        { heading: 'La solución: 5 herramientas en una', content: 'Winerim transforma tu carta en herramienta de venta (guía al comensal), recomendación (IA + maridajes), gestión (stock y pricing), análisis (KPIs y datos) y formación (el equipo aprende mientras trabaja).' },
        { heading: 'Cómo ayuda a cada equipo', content: 'Equipo de sala: recomienda vino con confianza sin ser sommelier. Dirección: visibilidad sobre ventas, KPIs y margen en tiempo real. Compras: alertas de stock, datos de rotación y análisis de margen por referencia.' },
        { heading: 'Resultados', content: 'Los restaurantes que implementan Winerim pueden experimentar mejoras en ticket medio de vino, rotación de referencias y eficiencia de gestión. El potencial estimado de mejora oscila entre un 15 % y un 25 %, según el contexto del restaurante.' },
        { heading: 'Cómo funciona', content: '1. Envías tu carta actual en cualquier formato. 2. Winerim la digitaliza con fichas, maridajes y recomendaciones. 3. El comensal accede por QR, web o app. 4. Empiezas a vender más vino desde el primer día.' },
        { heading: 'Por qué no es un simple QR o PDF', content: 'Un QR con PDF es estático: no recomienda, no analiza, no se actualiza. Winerim es una plataforma activa con IA que personaliza la experiencia, genera datos de venta y optimiza precios automáticamente.' },
      ],
      faqs: [
        { q: '¿Qué es Winerim?', a: 'Winerim es un software de gestión de cartas de vinos para restaurantes. Combina carta digital interactiva, recomendaciones con IA, maridajes automáticos, analítica de ventas y optimización de precios.' },
        { q: '¿Cómo funciona?', a: 'El restaurante envía su carta. Winerim digitaliza las referencias, genera descripciones y maridajes. El comensal accede por QR o web y recibe recomendaciones inteligentes.' },
        { q: '¿Sustituye al sommelier?', a: 'No. Complementa al equipo de sala con datos y recomendaciones. En restaurantes sin sommelier, actúa como asistente inteligente.' },
        { q: '¿Qué resultados genera?', a: 'Los resultados varían según el restaurante. El potencial estimado de mejora en ticket medio de vino oscila entre un 15 % y un 25 %, según contexto e implementación.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita con tu carta real.' },
      ],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Sobre Winerim', url: '/sobre-winerim' },
        { label: 'Blog', url: '/blog' },
        { label: 'Demo gratuita', url: '/demo' },
      ],
    },
  },
  '/software-carta-de-vinos': {
    meta: {
      title: 'Software Carta Inteligente de Vinos para Restaurantes | Winerim',
      description: 'Winerim es el software de carta inteligente de vinos líder para restaurantes. Gestión inteligente, recomendador IA y análisis de rendimiento en una sola plataforma.',
      canonical: `${SITE}/software-carta-de-vinos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Software de carta inteligente de vinos para restaurantes',
      subtitle: 'Gestiona, optimiza y potencia tu carta de vinos con inteligencia artificial.',
      sections: [
        { heading: 'Carta inteligente interactiva', content: 'Tu carta de vinos disponible en tablet, móvil o QR. Actualizable en tiempo real, con fichas detalladas, notas de cata y maridajes inteligentes para cada plato.' },
        { heading: 'Recomendador inteligente', content: 'Winerim sugiere el vino perfecto según el plato, las preferencias del comensal y tu stock disponible. Aumenta el ticket medio sin presionar al cliente.' },
        { heading: 'Gestión de bodega', content: 'Control de stock, alertas de rotación, análisis de rendimiento por referencia y optimización automática de precios basada en datos reales.' },
        { heading: 'Analítica de ventas', content: 'Dashboards en tiempo real: ventas por referencia, márgenes por botella, rotación semanal, tendencias estacionales y comparativa entre períodos.' },
      ],
      faqs: [
        { q: '¿Necesito instalar algo?', a: 'No. Winerim funciona 100% en la nube. Solo necesitas un dispositivo con navegador.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que veas cómo funciona con tu carta.' },
        { q: '¿Se integra con mi TPV?', a: 'Sí. Winerim se integra con los principales sistemas de punto de venta y gestión de restauración.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Software carta de vinos', url: `${SITE}/software-carta-de-vinos` },
      ],
      internalLinks: [
        { label: 'Funcionalidades completas', url: '/funcionalidades' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios y planes', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Integraciones', url: '/integraciones' },
        { label: 'Solicitar demo', url: '/demo' },
      ],
    },
  },
  '/funcionalidades': {
    meta: {
      title: 'Funcionalidades | Carta Inteligente de Vinos Winerim',
      description: 'Descubre todas las funcionalidades de Winerim: carta inteligente, recomendador IA, gestión de stock, analytics de ventas y automatizaciones.',
      canonical: `${SITE}/funcionalidades`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Funcionalidades de Winerim',
      subtitle: 'Todo lo que necesitas para gestionar y potenciar tu carta de vinos en una sola plataforma.',
      sections: [
        { heading: 'Carta inteligente interactiva', content: 'Carta de vinos accesible desde tablet, móvil o QR con fichas completas, notas de cata, imágenes y maridajes automáticos.' },
        { heading: 'Recomendador inteligente con IA', content: 'IA que sugiere vinos según el plato, presupuesto y preferencias del comensal. Aumenta el ticket medio de forma natural.' },
        { heading: 'Analytics y rendimiento', content: 'Dashboards en tiempo real: ventas por referencia, márgenes, rotación, tendencias estacionales y comparativas entre períodos.' },
        { heading: 'Gestión de stock y bodega', content: 'Control automático de inventario con alertas de reposición, detección de vinos muertos y optimización de compras.' },
        { heading: 'Maridajes automáticos', content: 'Sugerencias de maridaje generadas por IA para cada plato de tu carta, actualizadas automáticamente al cambiar el menú.' },
        { heading: 'Inteligencia dinámica', content: 'Motor de decisión en tiempo real que ajusta recomendaciones, precios sugeridos y alertas según datos de venta, stock y estacionalidad.' },
        { heading: 'Automatizaciones', content: 'Alertas de stock bajo, informes automáticos de rendimiento, notificaciones de vinos con baja rotación y sugerencias de descatalogación.' },
      ],
      faqs: [
        { q: '¿Cuántas funcionalidades incluye cada plan?', a: 'Todos los planes incluyen carta digital y recomendador. Los planes superiores añaden analytics avanzados, inteligencia dinámica y gestión multi-restaurante.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Funcionalidades', url: `${SITE}/funcionalidades` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
        { label: 'Integraciones', url: '/integraciones' },
      ],
    },
  },
  '/precios': {
    meta: {
      title: 'Precios de Winerim | Planes para Restaurantes',
      description: 'Descubre los planes y precios de Winerim. Desde restaurantes independientes hasta grupos de restauración. Prueba gratuita disponible.',
      canonical: `${SITE}/precios`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Planes y precios de Winerim',
      subtitle: 'Encuentra el plan perfecto para tu restaurante. Sin permanencia, sin sorpresas.',
      sections: [
        { heading: 'Plan para restaurantes independientes', content: 'Carta digital con recomendador inteligente, fichas de vino completas y maridajes automáticos. Ideal para restaurantes con hasta 250 referencias.' },
        { heading: 'Plan para grupos y cadenas', content: 'Todo lo anterior más gestión multi-restaurante, analytics avanzados, inteligencia dinámica y soporte prioritario.' },
      ],
      faqs: [
        { q: '¿Hay período de prueba?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que pruebes Winerim con tu carta real antes de decidir.' },
        { q: '¿Hay permanencia?', a: 'No. Puedes cancelar en cualquier momento sin penalización.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Precios', url: `${SITE}/precios` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo gratuita', url: '/demo' },
        { label: 'Casos de éxito', url: '/casos-exito' },
      ],
    },
  },
  '/producto/inteligencia-dinamica': {
    meta: {
      title: 'Inteligencia Dinámica | IA para Cartas de Vinos | Winerim',
      description: 'Motor de inteligencia artificial para restaurantes que optimiza recomendaciones, precios y rotación de vinos en tiempo real.',
      canonical: `${SITE}/producto/inteligencia-dinamica`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Inteligencia dinámica para cartas de vinos',
      subtitle: 'El motor de IA que analiza, recomienda y optimiza tu carta de vinos en tiempo real.',
      sections: [
        { heading: 'Qué es la inteligencia dinámica', content: 'Un sistema de IA que procesa datos de ventas, stock, estacionalidad y preferencias para generar recomendaciones y alertas automáticas que maximizan la rentabilidad de tu carta.' },
        { heading: 'Optimización de precios', content: 'Análisis continuo de márgenes y elasticidad para sugerir ajustes de precio que maximicen ingresos sin sacrificar la percepción de valor del comensal.' },
        { heading: 'Detección de vinos muertos', content: 'Identificación automática de referencias con baja rotación que ocupan capital y espacio en bodega, con sugerencias de acción (descuento, promoción o descatalogación).' },
        { heading: 'Recomendaciones contextuales', content: 'El recomendador se adapta al contexto real: hora del día, día de la semana, tipo de comida, perfil del comensal y stock disponible.' },
      ],
      faqs: [
        { q: '¿Cómo aprende la IA?', a: 'Procesa datos de venta, stock, estacionalidad y feedback del equipo para mejorar sus recomendaciones de forma continua.' },
        { q: '¿Necesita muchos datos para funcionar?', a: 'Empieza a generar valor desde el primer día con tu carta actual. Las recomendaciones mejoran con cada venta registrada.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Producto', url: `${SITE}/software-carta-de-vinos` },
        { name: 'Inteligencia dinámica', url: `${SITE}/producto/inteligencia-dinamica` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones': {
    meta: {
      title: 'Soluciones para Restaurantes | Winerim',
      description: 'Soluciones de Winerim para restaurantes independientes, grupos de restauración y hoteles. Optimiza tu carta de vinos y aumenta el ticket medio.',
      canonical: `${SITE}/soluciones`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Soluciones de Winerim para hostelería',
      subtitle: 'Cada tipo de negocio tiene sus retos. Winerim se adapta a todos.',
      sections: [
        { heading: 'Para restaurantes independientes', content: 'Carta digital interactiva, recomendador inteligente y gestión de bodega simplificada. Aumenta tu ticket medio en vino sin necesidad de un sommelier a tiempo completo.' },
        { heading: 'Para grupos de restauración', content: 'Gestión centralizada de cartas multi-restaurante, coherencia de precios entre locales, analytics comparativos y control de stock unificado.' },
        { heading: 'Para hoteles', content: 'Cartas de vinos para restaurante, room service y eventos. Integración con sistemas de gestión hotelera y analytics de consumo por canal.' },
        { heading: 'Para aumentar el ticket medio', content: 'Estrategias probadas para incrementar el gasto en vino: recomendaciones contextuales, vino por copa optimizado y sugerencias de maridaje.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
      ],
      internalLinks: [
        { label: 'Grupos de restauración', url: '/soluciones/grupos-restauracion' },
        { label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones/grupos-restauracion': {
    meta: {
      title: 'Software Carta Vinos para Grupos de Restauración | Winerim',
      description: 'Gestión centralizada de cartas de vinos para grupos y cadenas de restaurantes. Control multi-local, precios coherentes y analytics comparativos.',
      canonical: `${SITE}/soluciones/grupos-restauracion`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Software de carta de vinos para grupos de restauración',
      subtitle: 'Gestión centralizada, coherencia de marca y control total de tu oferta de vinos en todos tus locales.',
      sections: [
        { heading: 'Gestión multi-restaurante', content: 'Una sola plataforma para gestionar las cartas de vinos de todos tus restaurantes. Actualiza referencias, precios y maridajes desde un panel central.' },
        { heading: 'Coherencia de precios', content: 'Asegura que los precios sean coherentes entre locales o aplica estrategias diferenciadas por zona, tipo de restaurante o canal de venta.' },
        { heading: 'Analytics comparativos', content: 'Compara el rendimiento de cada local: ventas por referencia, márgenes, rotación y tendencias. Detecta oportunidades y problemas rápidamente.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
        { name: 'Grupos de restauración', url: `${SITE}/soluciones/grupos-restauracion` },
      ],
      internalLinks: [
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones/aumentar-ticket-medio-restaurante': {
    meta: {
      title: 'Cómo Aumentar el Ticket Medio en Vino | Winerim',
      description: 'Estrategias probadas para aumentar el ticket medio en vino en tu restaurante: recomendaciones IA, vino por copa optimizado y maridajes inteligentes.',
      canonical: `${SITE}/soluciones/aumentar-ticket-medio-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Cómo aumentar el ticket medio en vino en tu restaurante',
      subtitle: 'Estrategias basadas en datos para incrementar los ingresos por vino sin presionar al comensal.',
      sections: [
        { heading: 'Recomendaciones inteligentes', content: 'El recomendador IA sugiere vinos que equilibran satisfacción del comensal y margen del restaurante. Los restaurantes con recomendador activo aumentan un 23% el gasto medio en vino.' },
        { heading: 'Vino por copa optimizado', content: 'Selecciona las referencias óptimas para vino por copa basándote en datos de rotación, margen y complementariedad con tu carta de comidas.' },
        { heading: 'Maridajes como herramienta de venta', content: 'Los maridajes automáticos eliminan la barrera de elección del comensal y aumentan la probabilidad de pedido de vino con cada plato.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
        { name: 'Aumentar ticket medio', url: `${SITE}/soluciones/aumentar-ticket-medio-restaurante` },
      ],
      internalLinks: [
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Vino por copa', url: '/vino-por-copa-restaurante' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/herramientas': {
    meta: {
      title: 'Herramientas Gratuitas para Cartas de Vinos | Winerim',
      description: 'Calculadoras, analizadores y diagnósticos gratuitos para optimizar tu carta de vinos: márgenes, precios por copa, stock muerto y más.',
      canonical: `${SITE}/herramientas`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Herramientas gratuitas para tu carta de vinos',
      subtitle: 'Calculadoras, analizadores y diagnósticos para optimizar la rentabilidad de tu carta.',
      sections: [
        { heading: 'Calculadora de margen de vino', content: 'Calcula el margen real de cada referencia de tu carta considerando coste de compra, precio de venta, merma y coste de bodega.' },
        { heading: 'Calculadora de precio por copa', content: 'Determina el precio óptimo por copa para maximizar la rentabilidad de tu oferta de vino por copa.' },
        { heading: 'Diagnóstico de vino por copa', content: 'Analiza tu oferta actual de vino por copa e identifica oportunidades de mejora en selección, precio y presentación.' },
        { heading: 'Wine List Score', content: 'Evalúa la calidad y completitud de tu carta de vinos con un análisis automático de diversidad, precios, maridajes y estructura.' },
        { heading: 'Calculadora de stock muerto', content: 'Identifica cuánto capital tienes inmovilizado en vinos con baja rotación y calcula el coste de oportunidad.' },
        { heading: 'Analizador de carta', content: 'Sube tu carta y obtén un diagnóstico completo: diversidad, precios, equilibrio por regiones y sugerencias de mejora.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Herramientas', url: `${SITE}/herramientas` },
      ],
      internalLinks: [
        { label: 'Calculadora de margen', url: '/calculadora-margen-vino' },
        { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' },
        { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' },
        { label: 'Wine List Score', url: '/herramientas/wine-list-score' },
        { label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' },
        { label: 'Analizador de carta', url: '/analisis-carta' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/guias-y-recursos': {
    meta: {
      title: 'Guías y Recursos para Cartas de Vinos | Winerim',
      description: 'Guías, plantillas, checklists y recursos descargables para diseñar, gestionar y rentabilizar tu carta de vinos en restauración.',
      canonical: `${SITE}/guias-y-recursos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Guías y recursos para cartas de vinos',
      subtitle: 'Guías prácticas, plantillas descargables y checklists para optimizar tu carta de vinos.',
      sections: [
        { heading: 'Guías de gestión', content: 'Guías paso a paso para diseñar una carta de vinos rentable, fijar estrategias de vino por copa, detectar vinos muertos y formar al equipo de sala.' },
        { heading: 'Plantillas descargables', content: 'Plantillas de carta de vinos, wine mapping, análisis de márgenes y scorecards de rendimiento listas para usar.' },
        { heading: 'Checklists', content: 'Checklists de lanzamiento de carta, detección de problemas y auditoría de rentabilidad para restauradores.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Guías y recursos', url: `${SITE}/guias-y-recursos` },
      ],
      internalLinks: [
        { label: 'Plantilla carta de vinos', url: '/recursos/plantilla-carta-de-vinos' },
        { label: 'Checklist carta rentable', url: '/recursos/checklist-carta-de-vinos-rentable' },
        { label: 'Guía vino por copa', url: '/recursos/guia-vino-por-copa-para-restaurantes' },
        { label: 'Guía rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' },
        { label: 'Guía formar equipo sala', url: '/guias/como-formar-equipo-sala-para-vender-vino' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Benchmarks y playbooks', url: '/benchmarks-playbooks' },
      ],
    },
  },
  '/benchmarks-playbooks': {
    meta: {
      title: 'Benchmarks y Playbooks para Cartas de Vinos | Winerim',
      description: 'Datos de referencia y playbooks estratégicos para la gestión de cartas de vinos en restaurantes: márgenes, rotación, precios y más.',
      canonical: `${SITE}/benchmarks-playbooks`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Benchmarks y playbooks para cartas de vinos',
      subtitle: 'Datos de referencia del sector y estrategias probadas para optimizar la gestión de vinos en restauración.',
      sections: [
        { heading: 'Benchmarks del sector', content: 'Datos de referencia sobre márgenes medios, rotación por tipo de vino, número óptimo de referencias y distribución de precios en restauración.' },
        { heading: 'Playbooks estratégicos', content: 'Guías de acción paso a paso para resolver los problemas más comunes: lanzar una carta nueva, reducir stock muerto, aumentar ventas por copa y optimizar márgenes.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Benchmarks y playbooks', url: `${SITE}/benchmarks-playbooks` },
      ],
      internalLinks: [
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/casos-exito': {
    meta: {
      title: 'Casos de Éxito | Restaurantes que usan Winerim',
      description: 'Descubre cómo restaurantes y hoteles han aumentado sus ventas de vino y optimizado su carta con Winerim.',
      canonical: `${SITE}/casos-exito`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Casos de éxito con Winerim',
      subtitle: 'Restaurantes y hoteles que han transformado su gestión de vinos con Winerim.',
      sections: [
        { heading: 'Restaurantes independientes', content: 'Restaurantes que han aumentado su ticket medio en vino entre un 15% y un 30% con el recomendador inteligente y la carta digital.' },
        { heading: 'Grupos de restauración', content: 'Cadenas y grupos que han unificado la gestión de cartas, reducido stock muerto y mejorado la coherencia de su oferta de vinos.' },
        { heading: 'Hoteles', content: 'Hoteles que han integrado Winerim en restaurante, room service y eventos para maximizar ingresos por vino en todos los canales.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Casos de éxito', url: `${SITE}/casos-exito` },
      ],
      internalLinks: [
        { label: 'Clientes', url: '/clientes' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/clientes': {
    meta: {
      title: 'Clientes de Winerim | Restaurantes y Hoteles',
      description: 'Conoce los restaurantes, hoteles y grupos de restauración que confían en Winerim para gestionar y optimizar su carta de vinos.',
      canonical: `${SITE}/clientes`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Nuestros clientes',
      subtitle: 'Restaurantes, hoteles y grupos de restauración de toda España y Europa confían en Winerim.',
      sections: [
        { heading: 'Restaurantes independientes', content: 'Desde bistrós con 30 referencias hasta restaurantes gastronómicos con más de 500 etiquetas.' },
        { heading: 'Grupos y cadenas', content: 'Grupos de restauración con múltiples locales que necesitan coherencia, control y eficiencia en la gestión de vinos.' },
        { heading: 'Hoteles', content: 'Cadenas hoteleras internacionales que integran Winerim en sus servicios de restauración.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Clientes', url: `${SITE}/clientes` },
      ],
      internalLinks: [
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/integraciones': {
    meta: {
      title: 'Integraciones | Winerim se conecta con tu stack',
      description: 'Winerim se integra con TPVs, sistemas de gestión de restaurantes, ERPs y plataformas hoteleras para una gestión de vinos sin fricciones.',
      canonical: `${SITE}/integraciones`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Integraciones de Winerim',
      subtitle: 'Conecta Winerim con las herramientas que ya usas en tu restaurante.',
      sections: [
        { heading: 'TPV y punto de venta', content: 'Integración directa con los principales sistemas de punto de venta para sincronizar ventas, stock y precios automáticamente.' },
        { heading: 'Sistemas de gestión', content: 'Conexión con ERPs y plataformas de gestión de restauración para unificar datos de compras, inventario y facturación.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Integraciones', url: `${SITE}/integraciones` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/blog': {
    meta: {
      title: 'Blog | Winerim – Gestión de Vinos en Restauración',
      description: 'Artículos sobre gestión de cartas de vinos, estrategias de venta, IA en restauración, maridajes y tendencias del sector.',
      canonical: `${SITE}/blog`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Blog de Winerim',
      subtitle: 'Artículos, análisis y tendencias sobre gestión de vinos en restauración.',
      sections: [
        { heading: 'Estrategia y negocio', content: 'Cómo diseñar una carta de vinos rentable, fijar precios óptimos y aumentar las ventas de vino en tu restaurante.' },
        { heading: 'Tecnología y IA', content: 'El papel de la inteligencia artificial en la restauración moderna: recomendaciones, analytics y automatización.' },
        { heading: 'Gestión de bodega', content: 'Mejores prácticas para gestionar el stock, reducir mermas y optimizar las compras de vino.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/problemas': {
    meta: {
      title: 'Problemas Comunes en Cartas de Vinos | Winerim',
      description: 'Identifica los problemas más comunes en la gestión de cartas de vinos: baja rotación, stock muerto, márgenes pobres y cartas que no venden.',
      canonical: `${SITE}/problemas`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Problemas comunes en cartas de vinos',
      subtitle: 'Diagnóstico de los retos más frecuentes en la gestión de vinos en restauración.',
      sections: [
        { heading: 'La carta no vende', content: 'Cartas extensas, mal organizadas o sin recomendaciones que generan parálisis de elección y bajan el ticket medio.' },
        { heading: 'Stock muerto', content: 'Referencias con baja rotación que inmovilizan capital y ocupan espacio en bodega sin generar ingresos.' },
        { heading: 'Márgenes pobres', content: 'Precios fijados sin datos que reducen la rentabilidad global de la oferta de vinos.' },
        { heading: 'Falta de datos', content: 'Decisiones de compra y carta basadas en intuición en lugar de datos de venta y rotación reales.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Problemas', url: `${SITE}/problemas` },
      ],
      internalLinks: [
        { label: 'Carta que no vende', url: '/problemas/carta-de-vinos-no-vende' },
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/como-vender-mas-vino-en-un-restaurante': {
    meta: {
      title: 'Cómo Vender Más Vino en un Restaurante | Winerim',
      description: 'Guía completa con estrategias probadas para aumentar las ventas de vino en restaurantes: carta optimizada, recomendaciones, formación y tecnología.',
      canonical: `${SITE}/como-vender-mas-vino-en-un-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Cómo vender más vino en un restaurante',
      subtitle: 'Estrategias probadas para restauradores que quieren aumentar sus ingresos por vino.',
      sections: [
        { heading: 'Optimiza tu carta de vinos', content: 'Reduce referencias, mejora la estructura y usa descripciones que vendan. Una carta bien diseñada puede aumentar las ventas de vino un 20%.' },
        { heading: 'Activa las recomendaciones', content: 'El 68% de los comensales piden vino cuando reciben una recomendación. Usa tecnología para escalar las sugerencias personalizadas.' },
        { heading: 'Forma a tu equipo', content: 'Un camarero que conoce 5 vinos de la carta y sabe maridarlos con los platos principales genera un 30% más de ventas de vino.' },
        { heading: 'Vino por copa estratégico', content: 'Una oferta de vino por copa bien seleccionada reduce la barrera de entrada y aumenta la frecuencia de pedido.' },
      ],
      faqs: [
        { q: '¿Cuánto puede aumentar el ticket medio con un recomendador?', a: 'Los restaurantes con recomendador inteligente activo aumentan el ticket medio en vino entre un 15% y un 30%.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Cómo vender más vino', url: `${SITE}/como-vender-mas-vino-en-un-restaurante` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Vino por copa', url: '/vino-por-copa-restaurante' },
        { label: 'Guía formar equipo', url: '/guias/como-formar-equipo-sala-para-vender-vino' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/vino-por-copa-restaurante': {
    meta: {
      title: 'Vino por Copa en Restaurantes: Guía Estratégica | Winerim',
      description: 'Cómo diseñar una oferta de vino por copa rentable: selección, precios, rotación y servicio. Guía completa para restauradores.',
      canonical: `${SITE}/vino-por-copa-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Vino por copa en restaurantes: guía estratégica',
      subtitle: 'Cómo convertir el vino por copa en una fuente de ingresos rentable y diferenciadora.',
      sections: [
        { heading: 'Por qué el vino por copa es estratégico', content: 'El vino por copa representa la mayor oportunidad de margen en la oferta de vinos. Permite al comensal probar sin compromiso y al restaurante maximizar la rentabilidad por botella.' },
        { heading: 'Cuántas referencias ofrecer', content: 'Entre 6 y 12 referencias por copa es el rango óptimo. Menos limita la elección; más complica la rotación y aumenta la merma.' },
        { heading: 'Fijar precios por copa', content: 'El precio por copa debe cubrir el coste de la botella completa con las 3-4 primeras copas vendidas. Las restantes son margen puro.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Vino por copa', url: `${SITE}/vino-por-copa-restaurante` },
      ],
      internalLinks: [
        { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' },
        { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' },
        { label: 'Guía estrategia vino por copa', url: '/guias/como-fijar-estrategia-rentable-vino-por-copa' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/como-hacer-una-carta-de-vinos': {
    meta: {
      title: 'Cómo Hacer una Carta de Vinos para tu Restaurante | Winerim',
      description: 'Guía paso a paso para crear una carta de vinos rentable: selección, estructura, precios, diseño y presentación.',
      canonical: `${SITE}/como-hacer-una-carta-de-vinos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Cómo hacer una carta de vinos para tu restaurante',
      subtitle: 'Guía práctica para diseñar una carta de vinos que venda, informe y genere margen.',
      sections: [
        { heading: 'Define tu identidad vinícola', content: 'Tu carta de vinos debe reflejar la personalidad de tu restaurante: cocina, nivel de servicio y perfil de cliente.' },
        { heading: 'Selecciona las referencias', content: 'Equilibra diversidad y manejabilidad. Un restaurante medio funciona bien con 40-80 referencias bien elegidas.' },
        { heading: 'Estructura y organización', content: 'Organiza por regiones, estilos o momentos. Facilita la navegación con categorías claras y descripciones breves.' },
        { heading: 'Fija los precios', content: 'Usa datos de margen, competencia y posicionamiento para fijar precios que maximicen ingresos y percepción de valor.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Cómo hacer una carta de vinos', url: `${SITE}/como-hacer-una-carta-de-vinos` },
      ],
      internalLinks: [
        { label: 'Plantilla carta de vinos', url: '/recursos/plantilla-carta-de-vinos' },
        { label: 'Ejemplos de carta', url: '/ejemplos-carta-vinos' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/analisis-carta': {
    meta: {
      title: 'Analiza tu Carta de Vinos Gratis | Winerim',
      description: 'Sube tu carta de vinos y recibe un diagnóstico completo gratuito: diversidad, precios, equilibrio y sugerencias de mejora con IA.',
      canonical: `${SITE}/analisis-carta`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Analiza tu carta de vinos con IA',
      subtitle: 'Diagnóstico gratuito de tu carta: identifica problemas y oportunidades en minutos.',
      sections: [
        { heading: 'Qué analiza', content: 'Diversidad de regiones y estilos, equilibrio de precios, cobertura de maridajes, número de referencias y estructura general.' },
        { heading: 'Cómo funciona', content: 'Sube tu carta en cualquier formato. Nuestra IA la procesa y genera un informe con puntuación, problemas detectados y recomendaciones concretas.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Análisis de carta', url: `${SITE}/analisis-carta` },
      ],
      internalLinks: [
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/contacto': {
    meta: {
      title: 'Contacto | Winerim',
      description: 'Contacta con el equipo de Winerim. Solicita información, una demo personalizada o soporte técnico.',
      canonical: `${SITE}/contacto`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Contacta con Winerim',
      subtitle: 'Cuéntanos sobre tu restaurante y te ayudamos a optimizar tu carta de vinos.',
      sections: [],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Contacto', url: `${SITE}/contacto` },
      ],
      internalLinks: [
        { label: 'Demo', url: '/demo' },
        { label: 'Precios', url: '/precios' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
      ],
    },
  },
  '/demo': {
    meta: {
      title: 'Demo Gratuita | Winerim',
      description: 'Solicita una demo personalizada de Winerim. Te mostramos cómo optimizar tu carta de vinos con IA en 30 minutos.',
      canonical: `${SITE}/demo`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Solicita una demo gratuita de Winerim',
      subtitle: 'Te mostramos cómo Winerim puede transformar la gestión de vinos en tu restaurante.',
      sections: [],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Demo', url: `${SITE}/demo` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
      ],
    },
  },
  '/que-es-winerim': {
    meta: {
      title: '¿Qué es Winerim? | Carta Inteligente de Vinos',
      description: 'Winerim es la plataforma de gestión inteligente de cartas de vinos para restaurantes. Descubre qué hace, cómo funciona y por qué es diferente.',
      canonical: `${SITE}/que-es-winerim`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: '¿Qué es Winerim?',
      subtitle: 'La plataforma que convierte tu carta de vinos en un motor de ventas inteligente.',
      sections: [
        { heading: 'Carta digital inteligente', content: 'Winerim digitaliza tu carta de vinos con fichas completas, imágenes, notas de cata y maridajes automáticos para cada plato.' },
        { heading: 'Recomendador con IA', content: 'Un motor de recomendación que sugiere el vino ideal para cada comensal y plato, maximizando satisfacción y margen.' },
        { heading: 'Analytics y gestión', content: 'Dashboards de ventas, control de stock, alertas de rotación y optimización de precios basados en datos reales.' },
      ],
      faqs: [
        { q: '¿Para quién es Winerim?', a: 'Para restaurantes, hoteles, vinotecas y grupos de restauración que quieren profesionalizar y rentabilizar su oferta de vinos.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: '¿Qué es Winerim?', url: `${SITE}/que-es-winerim` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/sobre-winerim': {
    meta: {
      title: 'Sobre Winerim — Metodología, Equipo y Expertise',
      description: 'Conoce quién está detrás de Winerim, nuestra metodología de trabajo, cómo medimos resultados y las áreas de expertise que avalan nuestra tecnología para restaurantes.',
      canonical: `${SITE}/sobre-winerim`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'AboutPage',
    },
    content: {
      h1: 'La tecnología detrás de cada copa vendida',
      subtitle: 'Winerim nace de la intersección entre tecnología, hostelería y vino. Construimos herramientas que ayudan a restaurantes a tomar mejores decisiones sobre su carta, su bodega y sus ventas de vino.',
      sections: [
        { heading: '¿Qué es Winerim?', content: 'Winerim es una plataforma de gestión inteligente de cartas de vino para restaurantes, hoteles y grupos de restauración. Combina carta digital interactiva, recomendaciones con IA, analítica de ventas y herramientas de optimización de precios. Fundada en 2024, con presencia en 15 países, +1.000 bodegas gestionadas y +300.000 referencias únicas de vino en la base de datos.' },
        { heading: 'Cómo trabajamos', content: 'Nuestra metodología combina rigor técnico con experiencia real en restauración. Integramos la carta existente, analizamos con benchmarks del sector, generamos recomendaciones con IA y medimos el impacto en tiempo real.' },
        { heading: 'Cómo medimos resultados', content: 'Métricas clave: ticket medio de vino por mesa, ratio copa vs. botella, rotación de referencias, margen bruto y porcentaje de vinos muertos. Los potenciales de mejora se presentan como rangos, no cifras absolutas.' },
        { heading: 'Áreas de expertise', content: 'Gestión de carta de vinos, analítica de ventas de vino, pricing y estrategia de precios, IA aplicada a restauración, gestión de bodega y stock, formación de equipos de sala.' },
        { heading: 'Quién valida el contenido', content: 'Todo el contenido editorial es revisado por profesionales con experiencia en sommellerie, dirección de restaurantes, análisis de datos en hostelería y tecnología SaaS.' },
      ],
      faqs: [
        { q: '¿Quién está detrás de Winerim?', a: 'Un equipo multidisciplinar con experiencia en tecnología, hostelería, sommellerie y análisis de datos.' },
        { q: '¿Cómo se generan las recomendaciones?', a: 'Se basan en datos de la carta, preferencias de maridaje, patrones de venta y objetivos comerciales configurados.' },
        { q: '¿Winerim vende datos de clientes finales?', a: 'No. Winerim no recopila datos personales de comensales. Trabaja exclusivamente con datos operativos del restaurante.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Sobre Winerim', url: `${SITE}/sobre-winerim` },
      ],
      internalLinks: [
        { label: '¿Qué es Winerim?', url: '/que-es-winerim' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Integraciones', url: '/integraciones' },
        { label: 'Clientes', url: '/clientes' },
        { label: 'Benchmarks & Playbooks', url: '/benchmarks-playbooks' },
      ],
    },
  },
  '/producto/winerim-core': {
    meta: { title: 'Winerim Core — Carta Digital Inteligente | Winerim', description: 'Winerim Core es el módulo central: carta digital interactiva, recomendador IA, fichas de vino, maridajes automáticos y experiencia de comensal personalizada.', canonical: `${SITE}/producto/winerim-core`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'Winerim Core — Carta digital inteligente para restaurantes',
      subtitle: 'El módulo central de Winerim: transforma tu carta de vinos en una experiencia interactiva que vende.',
      sections: [
        { heading: 'Carta digital interactiva', content: 'Carta accesible por QR, tablet o web con fichas completas, imágenes, notas de cata y filtros inteligentes por estilo, región y precio.' },
        { heading: 'Recomendador IA integrado', content: 'Motor de recomendación que sugiere vinos según plato, perfil del comensal y stock disponible. Aumenta el ticket medio de forma natural.' },
        { heading: 'Maridajes automáticos', content: 'Cada plato de tu carta recibe sugerencias de maridaje generadas por IA, actualizadas automáticamente al cambiar el menú.' },
      ],
      faqs: [{ q: '¿Qué incluye Winerim Core?', a: 'Carta digital interactiva, recomendador IA, fichas de vino completas, maridajes automáticos y panel de gestión básico.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Producto', url: `${SITE}/software-carta-de-vinos` }, { name: 'Winerim Core', url: `${SITE}/producto/winerim-core` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/producto/winerim-supply': {
    meta: { title: 'Winerim Supply — Gestión de Compras y Bodega | Winerim', description: 'Winerim Supply optimiza compras, stock y bodega con datos de rotación, alertas de reposición y análisis de margen por referencia.', canonical: `${SITE}/producto/winerim-supply`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'Winerim Supply — Gestión inteligente de compras y bodega',
      subtitle: 'Controla tu stock, optimiza las compras y maximiza el margen de cada referencia con datos reales.',
      sections: [
        { heading: 'Control de stock inteligente', content: 'Inventario en tiempo real con alertas de reposición, detección de vinos muertos y análisis de rotación por referencia.' },
        { heading: 'Inteligencia de compras', content: 'Datos de rotación, margen y estacionalidad para decidir qué vinos comprar, cuánto y cuándo. Reduce capital inmovilizado.' },
        { heading: 'Análisis de margen', content: 'Margen real por referencia considerando coste de compra, precio de venta, merma y coste de bodega.' },
      ],
      faqs: [{ q: '¿Winerim Supply sustituye mi ERP?', a: 'No. Se integra con tu sistema actual para enriquecer los datos de gestión de vinos con inteligencia de negocio.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Producto', url: `${SITE}/software-carta-de-vinos` }, { name: 'Winerim Supply', url: `${SITE}/producto/winerim-supply` }],
      internalLinks: [{ label: 'Winerim Core', url: '/producto/winerim-core' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/biblioteca-vino': {
    meta: { title: 'Biblioteca de Vino — Uvas, Regiones, Estilos y Maridajes | Winerim', description: 'Explora la biblioteca de vino de Winerim: variedades de uva, regiones vinícolas, estilos de vino, maridajes y glosario para profesionales de restauración.', canonical: `${SITE}/biblioteca-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Biblioteca de vino para profesionales de restauración',
      subtitle: 'Conocimiento vinícola estructurado para equipos de sala, sommeliers y responsables de compras.',
      sections: [
        { heading: 'Variedades de uva', content: 'Fichas completas de las principales variedades: perfil aromático, regiones de origen, maridajes y potencial de guarda.' },
        { heading: 'Regiones vinícolas', content: 'Guía por países y denominaciones de origen: clima, suelos, variedades principales y estilos característicos.' },
        { heading: 'Estilos de vino', content: 'Clasificación por estilos (crianza, joven, espumoso, dulce) con perfiles de sabor y sugerencias de servicio.' },
        { heading: 'Maridajes', content: 'Base de datos de maridajes por tipo de cocina, ingrediente y técnica culinaria.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Biblioteca de vino', url: `${SITE}/biblioteca-vino` }],
      internalLinks: [{ label: 'Uvas', url: '/biblioteca-vino/uvas' }, { label: 'Regiones', url: '/biblioteca-vino/regiones' }, { label: 'Estilos', url: '/biblioteca-vino/estilos' }, { label: 'Maridajes', url: '/biblioteca-vino/maridajes' }, { label: 'Glosario', url: '/biblioteca-vino/glosario' }],
    },
  },
  '/calculadora-margen-vino': {
    meta: { title: 'Calculadora de Margen de Vino para Restaurantes | Winerim', description: 'Calcula el margen real de cada vino de tu carta: coste, precio de venta, merma y rentabilidad. Herramienta gratuita para restauradores.', canonical: `${SITE}/calculadora-margen-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de margen de vino para restaurantes',
      subtitle: 'Calcula el margen real de cada referencia de tu carta en segundos.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce el coste de compra y precio de venta. La calculadora muestra el margen bruto, porcentaje y comparativa con benchmarks del sector.' },
        { heading: 'Por qué importa el margen real', content: 'Muchos restaurantes fijan precios por intuición. Conocer el margen real permite optimizar la carta para maximizar ingresos sin sacrificar calidad.' },
      ],
      faqs: [{ q: '¿Es gratuita?', a: 'Sí. La calculadora de margen es 100% gratuita y no requiere registro.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora de margen', url: `${SITE}/calculadora-margen-vino` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/inteligencia-artificial-restaurantes': {
    meta: { title: 'Inteligencia Artificial para Restaurantes | Winerim', description: 'Cómo la IA transforma la gestión de restaurantes: cartas inteligentes, recomendaciones personalizadas, optimización de precios y analítica predictiva.', canonical: `${SITE}/inteligencia-artificial-restaurantes`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Inteligencia artificial para restaurantes',
      subtitle: 'Cómo la IA está transformando la gestión, la venta y la experiencia del comensal en restauración.',
      sections: [
        { heading: 'IA aplicada a cartas de vinos', content: 'La IA permite crear cartas dinámicas que se adaptan al comensal, optimizan precios según datos de venta y detectan oportunidades de mejora automáticamente.' },
        { heading: 'Recomendaciones personalizadas', content: 'Motores de recomendación que sugieren vinos según el plato, perfil del comensal y contexto (hora, día, temporada).' },
        { heading: 'Analítica predictiva', content: 'Modelos que anticipan tendencias de demanda, estacionalidad y rotación para optimizar compras y reducir stock muerto.' },
      ],
      faqs: [{ q: '¿Qué restaurantes pueden usar IA?', a: 'Cualquier restaurante con carta de vinos puede beneficiarse. Winerim es apto desde restaurantes con 20 referencias hasta grupos con miles.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'IA para restaurantes', url: `${SITE}/inteligencia-artificial-restaurantes` }],
      internalLinks: [{ label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/precio-vino-restaurante': {
    meta: { title: 'Precio del Vino en Restaurantes: Guía de Pricing | Winerim', description: 'Guía completa de pricing de vino en restaurantes: cómo fijar precios, márgenes de referencia, estrategias por copa y botella, y errores comunes.', canonical: `${SITE}/precio-vino-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Precio del vino en restaurantes: guía de pricing',
      subtitle: 'Estrategias de fijación de precios de vino basadas en datos, márgenes y percepción de valor.',
      sections: [
        { heading: 'Factores que determinan el precio', content: 'Coste de compra, posicionamiento del restaurante, competencia, elasticidad de demanda y margen objetivo.' },
        { heading: 'Márgenes de referencia del sector', content: 'El margen bruto medio en vino en restauración oscila entre el 65% y el 75%. Los vinos por copa permiten márgenes superiores al 80%.' },
        { heading: 'Errores comunes de pricing', content: 'Aplicar multiplicador fijo a todas las referencias, no diferenciar entre copa y botella, no revisar precios periódicamente.' },
      ],
      faqs: [{ q: '¿Cuál es el margen ideal en vino?', a: 'Depende del tipo de restaurante. El rango habitual es 65%-75% en botella y 75%-85% en copa.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Precio vino restaurante', url: `${SITE}/precio-vino-restaurante` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/carta-papel-vs-digital': {
    meta: { title: 'Carta de Vinos en Papel vs Digital | Winerim', description: 'Comparativa entre carta de vinos en papel y digital: ventajas, inconvenientes, costes y cuándo elegir cada formato.', canonical: `${SITE}/carta-papel-vs-digital`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Carta de vinos en papel vs digital',
      subtitle: 'Análisis objetivo de ventajas e inconvenientes de cada formato para tu restaurante.',
      sections: [
        { heading: 'Ventajas de la carta digital', content: 'Actualización instantánea, cero costes de impresión, datos de interacción, recomendaciones inteligentes y maridajes automáticos.' },
        { heading: 'Cuándo tiene sentido el papel', content: 'En restaurantes de alta gama donde la carta física forma parte de la experiencia de marca y el nivel de servicio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Carta papel vs digital', url: `${SITE}/carta-papel-vs-digital` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Ejemplos carta', url: '/ejemplos-carta-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/ejemplos-carta-vinos': {
    meta: { title: 'Ejemplos de Cartas de Vinos para Restaurantes | Winerim', description: 'Ejemplos reales de cartas de vinos bien diseñadas: estructura, categorías, precios y presentación para diferentes tipos de restaurante.', canonical: `${SITE}/ejemplos-carta-vinos`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Ejemplos de cartas de vinos para restaurantes',
      subtitle: 'Inspiración y buenas prácticas para diseñar tu carta de vinos.',
      sections: [
        { heading: 'Carta para restaurante casual', content: 'Estructura sencilla con 30-50 referencias, organización por estilo y rango de precio accesible.' },
        { heading: 'Carta para gastronómico', content: 'Carta amplia con 100-300+ referencias, organización por región/denominación y selección premium.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Ejemplos carta vinos', url: `${SITE}/ejemplos-carta-vinos` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Plantilla carta', url: '/recursos/plantilla-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/problemas/carta-de-vinos-no-vende': {
    meta: { title: 'Mi Carta de Vinos No Vende — Diagnóstico y Solución | Winerim', description: 'Tu carta de vinos no genera ventas? Diagnóstico de los problemas más comunes y soluciones prácticas para convertir tu carta en herramienta de venta.', canonical: `${SITE}/problemas/carta-de-vinos-no-vende`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Mi carta de vinos no vende — diagnóstico y solución',
      subtitle: 'Identifica por qué tu carta no genera ventas y cómo solucionarlo.',
      sections: [
        { heading: 'Síntomas de una carta que no vende', content: 'Bajo ticket medio en vino, comensales que no piden vino, vinos caros que nunca se venden y equipo de sala que no recomienda.' },
        { heading: 'Causas habituales', content: 'Carta demasiado larga, mal organizada, sin descripciones atractivas, precios desalineados y falta de recomendaciones activas.' },
        { heading: 'Soluciones concretas', content: 'Reducir referencias, mejorar descripciones, activar recomendaciones inteligentes, optimizar precios y formar al equipo.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Problemas', url: `${SITE}/problemas` }, { name: 'Carta no vende', url: `${SITE}/problemas/carta-de-vinos-no-vende` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Cómo vender más vino', url: '/como-vender-mas-vino-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/implantacion': {
    meta: { title: 'Implantación de Winerim — Cómo Empezar | Winerim', description: 'Proceso de implantación de Winerim en tu restaurante: onboarding, digitalización de carta, formación del equipo y puesta en marcha.', canonical: `${SITE}/implantacion`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Cómo implantar Winerim en tu restaurante',
      subtitle: 'Un proceso sencillo y acompañado para que empieces a vender más vino desde el primer día.',
      sections: [
        { heading: 'Onboarding personalizado', content: 'Analizamos tu carta actual, tu modelo de negocio y tus objetivos para configurar Winerim a medida.' },
        { heading: 'Digitalización de carta', content: 'Transformamos tu carta actual en una carta digital inteligente con fichas, maridajes y recomendaciones.' },
        { heading: 'Formación del equipo', content: 'Formamos a tu equipo de sala para que aproveche al máximo las herramientas de recomendación y venta.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Implantación', url: `${SITE}/implantacion` }],
      internalLinks: [{ label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Precios', url: '/precios' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/comparativas': {
    meta: { title: 'Comparativas de Software de Carta de Vinos | Winerim', description: 'Compara Winerim con otras soluciones de gestión de cartas de vinos. Análisis objetivo de funcionalidades, precios y resultados.', canonical: `${SITE}/comparativas`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Comparativas de software de carta de vinos',
      subtitle: 'Análisis objetivo para elegir la mejor solución para tu restaurante.',
      sections: [
        { heading: 'Qué comparamos', content: 'Funcionalidades, precio, facilidad de uso, integraciones, soporte y resultados medidos en restaurantes reales.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Comparativas', url: `${SITE}/comparativas` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/como-organizar-carta-de-vinos': {
    meta: { title: 'Cómo Organizar una Carta de Vinos | Winerim Blog', description: 'Guía para organizar tu carta de vinos: por regiones, estilos, precios o momentos. Mejora la experiencia del comensal y aumenta las ventas.', canonical: `${SITE}/blog/como-organizar-carta-de-vinos`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo organizar una carta de vinos',
      sections: [
        { heading: 'Organización por regiones', content: 'La clasificación geográfica facilita la navegación para comensales con preferencias regionales claras.' },
        { heading: 'Organización por estilos', content: 'Agrupar por estilo (ligeros, con cuerpo, dulces) facilita la elección a comensales menos expertos.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Cómo organizar carta', url: `${SITE}/blog/como-organizar-carta-de-vinos` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Ejemplos carta', url: '/ejemplos-carta-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/cuantos-vinos-carta-restaurante': {
    meta: { title: 'Cuántos Vinos Debe Tener una Carta de Restaurante | Winerim Blog', description: 'Guía para definir el número óptimo de referencias en tu carta de vinos según tipo de restaurante, público y modelo de negocio.', canonical: `${SITE}/blog/cuantos-vinos-carta-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cuántos vinos debe tener una carta de restaurante',
      sections: [
        { heading: 'El problema de la carta excesiva', content: 'Más referencias no significa más ventas. A partir de cierto punto, la parálisis de elección reduce el ticket medio.' },
        { heading: 'Rangos recomendados', content: 'Casual: 30-50 referencias. Gastronómico: 80-200. Vinoteca: 200+. El número óptimo depende del servicio y el público.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Cuántos vinos', url: `${SITE}/blog/cuantos-vinos-carta-restaurante` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/como-disenar-carta-vinos-rentable': {
    meta: { title: 'Cómo Diseñar una Carta de Vinos Rentable | Winerim Blog', description: 'Claves para diseñar una carta de vinos que maximice ingresos y margen: selección, precios, estructura y análisis de rendimiento.', canonical: `${SITE}/blog/como-disenar-carta-vinos-rentable`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo diseñar una carta de vinos rentable',
      sections: [
        { heading: 'Selección estratégica', content: 'Elige referencias que cubran rangos de precio, estilos y ocasiones sin redundancia. Cada vino debe tener un rol claro.' },
        { heading: 'Pricing inteligente', content: 'Diferencia márgenes por rango de precio: mayor margen porcentual en vinos económicos, mayor margen absoluto en premium.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Carta rentable', url: `${SITE}/blog/como-disenar-carta-vinos-rentable` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Checklist carta rentable', url: '/recursos/checklist-carta-de-vinos-rentable' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante': {
    meta: { title: 'Cómo Mejorar la Rotación de Vinos en Restaurantes | Winerim', description: 'Estrategias para mejorar la rotación de vinos: detección de stock muerto, ajuste de carta, promoción por copa y análisis de datos.', canonical: `${SITE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo mejorar la rotación de vinos en un restaurante',
      sections: [
        { heading: 'Diagnóstico de rotación', content: 'Clasifica cada referencia por frecuencia de venta. Las que no se venden en 30 días necesitan acción inmediata.' },
        { heading: 'Estrategias de activación', content: 'Vino por copa, recomendación activa del equipo, maridajes visibles y promociones temporales.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Rotación de vinos', url: `${SITE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante` }],
      internalLinks: [{ label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' }, { label: 'Guía detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion': {
    meta: { title: 'Cómo Crear una Estrategia de Maridaje en Restauración | Winerim', description: 'Guía para desarrollar una estrategia de maridaje efectiva: selección, formación del equipo y herramientas tecnológicas.', canonical: `${SITE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo crear una estrategia de maridaje en restauración',
      sections: [
        { heading: 'Por qué el maridaje vende', content: 'Un maridaje bien presentado elimina la barrera de elección y aumenta la probabilidad de pedido de vino con cada plato.' },
        { heading: 'Diseñar maridajes rentables', content: 'Selecciona vinos que complementen los platos principales y tengan buen margen. Usa IA para automatizar sugerencias.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Estrategia maridaje', url: `${SITE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion` }],
      internalLinks: [{ label: 'Biblioteca maridajes', url: '/biblioteca-vino/maridajes' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-estructurar-carta-vinos-grupo-restauracion': {
    meta: { title: 'Cómo Estructurar la Carta de Vinos en Grupos de Restauración | Winerim', description: 'Guía para diseñar y gestionar cartas de vinos coherentes en grupos multi-restaurante: estandarización, diferenciación y control.', canonical: `${SITE}/guias/como-estructurar-carta-vinos-grupo-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo estructurar la carta de vinos en grupos de restauración',
      sections: [
        { heading: 'Carta base vs diferenciación local', content: 'Define una estructura base común y permite adaptaciones locales controladas por zona, tipo de cocina o perfil de cliente.' },
        { heading: 'Control centralizado', content: 'Panel único para gestionar precios, referencias y maridajes en todos los locales con coherencia de marca.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Carta grupos restauración', url: `${SITE}/guias/como-estructurar-carta-vinos-grupo-restauracion` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-fijar-estrategia-rentable-vino-por-copa': {
    meta: { title: 'Cómo Fijar una Estrategia Rentable de Vino por Copa | Winerim', description: 'Guía para diseñar una oferta de vino por copa rentable: selección, pricing, rotación y control de merma.', canonical: `${SITE}/guias/como-fijar-estrategia-rentable-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo fijar una estrategia rentable de vino por copa',
      sections: [
        { heading: 'Selección de referencias por copa', content: 'Elige vinos con buena rotación, margen alto y complementariedad con tu carta de comidas.' },
        { heading: 'Pricing por copa', content: 'El precio debe cubrir el coste de la botella con 3-4 copas. Las restantes son beneficio puro.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Estrategia vino por copa', url: `${SITE}/guias/como-fijar-estrategia-rentable-vino-por-copa` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad': {
    meta: { title: 'Cómo Detectar Vinos Muertos en tu Carta | Winerim', description: 'Guía para identificar vinos con baja rotación que inmovilizan capital y frenan la rentabilidad de tu carta.', canonical: `${SITE}/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo detectar vinos muertos que frenan tu rentabilidad',
      sections: [
        { heading: 'Qué es un vino muerto', content: 'Referencia con menos de 1 venta/mes que ocupa capital, espacio en bodega y complejidad en la gestión.' },
        { heading: 'Protocolo de detección', content: 'Analiza rotación mensual por referencia. Clasifica en activos, lentos y muertos. Actúa sobre los muertos.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Detectar vinos muertos', url: `${SITE}/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad` }],
      internalLinks: [{ label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' }, { label: 'Rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-formar-equipo-sala-para-vender-vino': {
    meta: { title: 'Cómo Formar al Equipo de Sala para Vender Vino | Winerim', description: 'Guía de formación para equipos de sala: conocimiento básico, técnicas de recomendación y uso de herramientas digitales.', canonical: `${SITE}/guias/como-formar-equipo-sala-para-vender-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo formar al equipo de sala para vender vino',
      sections: [
        { heading: 'Conocimiento mínimo viable', content: 'Un camarero no necesita ser sommelier. Con conocer 5-10 vinos clave de la carta y sus maridajes principales, puede recomendar con confianza.' },
        { heading: 'Herramientas de apoyo', content: 'El recomendador inteligente actúa como asistente digital: el equipo consulta en tiempo real y aprende mientras trabaja.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Formar equipo sala', url: `${SITE}/guias/como-formar-equipo-sala-para-vender-vino` }],
      internalLinks: [{ label: 'Cómo vender más vino', url: '/como-vender-mas-vino-en-un-restaurante' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-usar-datos-para-decidir-que-vinos-comprar': {
    meta: { title: 'Cómo Usar Datos para Decidir Qué Vinos Comprar | Winerim', description: 'Guía para tomar decisiones de compra de vino basadas en datos: rotación, margen, estacionalidad y tendencias de venta.', canonical: `${SITE}/guias/como-usar-datos-para-decidir-que-vinos-comprar`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo usar datos para decidir qué vinos comprar',
      sections: [
        { heading: 'Datos clave para decisiones de compra', content: 'Rotación por referencia, margen bruto, estacionalidad de demanda y análisis de categorías (tinto/blanco/rosado/espumoso).' },
        { heading: 'De la intuición a los datos', content: 'Sustituye el criterio subjetivo por métricas objetivas. Los datos revelan qué vinos realmente se venden y cuáles ocupan espacio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Datos compra vinos', url: `${SITE}/guias/como-usar-datos-para-decidir-que-vinos-comprar` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-conectar-carta-stock-ventas-margen': {
    meta: { title: 'Cómo Conectar Carta, Stock, Ventas y Margen | Winerim', description: 'Guía para integrar carta de vinos con datos de stock, ventas y margen en un solo flujo de gestión inteligente.', canonical: `${SITE}/guias/como-conectar-carta-stock-ventas-margen`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo conectar carta, stock, ventas y margen',
      sections: [
        { heading: 'El problema de los silos', content: 'Carta, stock, ventas y margen suelen gestionarse por separado. Sin conexión, las decisiones son lentas e imprecisas.' },
        { heading: 'Integración con Winerim', content: 'Winerim unifica los 4 pilares: la carta refleja el stock real, los datos de venta alimentan las recomendaciones y el margen se optimiza en tiempo real.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Conectar carta-stock-ventas', url: `${SITE}/guias/como-conectar-carta-stock-ventas-margen` }],
      internalLinks: [{ label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-gestionar-carta-vinos-grupos-restauracion': {
    meta: { title: 'Cómo Gestionar la Carta de Vinos en Grupos de Restauración | Winerim', description: 'Guía para la gestión eficiente de cartas de vinos en cadenas y grupos multi-restaurante.', canonical: `${SITE}/guias/como-gestionar-carta-vinos-grupos-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo gestionar la carta de vinos en grupos de restauración',
      sections: [
        { heading: 'Retos específicos de grupos', content: 'Coherencia de marca, diferenciación por local, negociación con proveedores y reporting consolidado.' },
        { heading: 'Solución multi-local', content: 'Panel centralizado con control de carta por local, analytics comparativos y gestión unificada de proveedores.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Gestionar carta grupos', url: `${SITE}/guias/como-gestionar-carta-vinos-grupos-restauracion` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Auditor multi-local', url: '/herramientas/auditor-carta-multilocal' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-implantar-vino-por-copa-sin-perder-margen': {
    meta: { title: 'Cómo Implantar Vino por Copa sin Perder Margen | Winerim', description: 'Guía para implementar una oferta de vino por copa rentable controlando merma, rotación y pricing.', canonical: `${SITE}/guias/como-implantar-vino-por-copa-sin-perder-margen`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo implantar vino por copa sin perder margen',
      sections: [
        { heading: 'Control de merma', content: 'Sistemas de conservación, rotación diaria y seguimiento de botellas abiertas para minimizar pérdidas.' },
        { heading: 'Pricing que protege el margen', content: 'Calcula precio por copa para recuperar coste de botella con 3 copas. Todo lo vendido después es beneficio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Vino por copa sin perder margen', url: `${SITE}/guias/como-implantar-vino-por-copa-sin-perder-margen` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-usar-winerim-sin-sumiller': {
    meta: { title: 'Cómo Usar Winerim sin Sumiller | Winerim', description: 'Guía para restaurantes sin sommelier: cómo Winerim actúa como asistente inteligente para que tu equipo recomiende vino con confianza.', canonical: `${SITE}/guias/como-usar-winerim-sin-sumiller`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo usar Winerim sin sumiller',
      sections: [
        { heading: 'El recomendador como sommelier digital', content: 'Winerim sugiere vinos al comensal basándose en plato, preferencias y stock. Tu equipo no necesita ser experto.' },
        { heading: 'Formación progresiva', content: 'El equipo aprende sobre vinos mientras usa la herramienta. Las fichas y maridajes funcionan como material de formación continua.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Winerim sin sumiller', url: `${SITE}/guias/como-usar-winerim-sin-sumiller` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Formar equipo sala', url: '/guias/como-formar-equipo-sala-para-vender-vino' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-decidir-surtido-segun-ticket-medio-tipo-local': {
    meta: { title: 'Cómo Decidir el Surtido de Vinos según Ticket Medio | Winerim', description: 'Guía para seleccionar el surtido de vinos adecuado según el ticket medio y tipo de local.', canonical: `${SITE}/guias/como-decidir-surtido-segun-ticket-medio-tipo-local`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo decidir el surtido de vinos según ticket medio y tipo de local',
      sections: [
        { heading: 'Ticket medio y selección', content: 'El ticket medio determina el rango de precios aceptable. Un restaurante con ticket de 40€ no necesita vinos de 200€.' },
        { heading: 'Adaptación por tipo de local', content: 'Casual, gastronómico, vinoteca y hotel requieren surtidos muy diferentes en profundidad y precio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Surtido según ticket medio', url: `${SITE}/guias/como-decidir-surtido-segun-ticket-medio-tipo-local` }],
      internalLinks: [{ label: 'Calculadora ticket medio', url: '/herramientas/calculadora-ticket-medio-vino' }, { label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-detectar-canibalizacion-vinos-carta': {
    meta: { title: 'Cómo Detectar Canibalización de Vinos en tu Carta | Winerim', description: 'Guía para identificar vinos que se canibalizan entre sí en tu carta y cómo optimizar la selección.', canonical: `${SITE}/guias/como-detectar-canibalizacion-vinos-carta`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo detectar canibalización de vinos en tu carta',
      sections: [
        { heading: 'Qué es la canibalización', content: 'Ocurre cuando dos o más referencias compiten por el mismo comensal: similar región, estilo y precio. Una vende, las otras no.' },
        { heading: 'Cómo detectarla', content: 'Agrupa referencias por perfil (región + estilo + rango precio). Si hay más de 2-3 en el mismo grupo, hay riesgo de canibalización.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Canibalización vinos', url: `${SITE}/guias/como-detectar-canibalizacion-vinos-carta` }],
      internalLinks: [{ label: 'Wine List Score', url: '/herramientas/wine-list-score' }, { label: 'Rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-revisar-carta-vinos-cada-mes': {
    meta: { title: 'Cómo Revisar tu Carta de Vinos Cada Mes | Winerim', description: 'Protocolo mensual para revisar y optimizar tu carta de vinos: métricas clave, acciones y calendario.', canonical: `${SITE}/guias/como-revisar-carta-vinos-cada-mes`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo revisar tu carta de vinos cada mes',
      sections: [
        { heading: 'Métricas de revisión mensual', content: 'Ventas por referencia, rotación, margen bruto, vinos muertos y evolución del ticket medio en vino.' },
        { heading: 'Acciones tras la revisión', content: 'Descatalogar vinos muertos, ajustar precios, incorporar novedades y actualizar recomendaciones.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Revisión mensual carta', url: `${SITE}/guias/como-revisar-carta-vinos-cada-mes` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/afiliate': {
    meta: { title: 'Programa de Afiliados Winerim', description: 'Únete al programa de afiliados de Winerim y gana comisiones recomendando la carta inteligente de vinos a restaurantes.', canonical: `${SITE}/afiliate`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Programa de afiliados Winerim',
      sections: [{ heading: 'Cómo funciona', content: 'Recomienda Winerim a restaurantes de tu red. Por cada cliente que se convierta, recibes una comisión recurrente.' }],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Afíliate', url: `${SITE}/afiliate` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/sommelier-corner': {
    meta: { title: 'Sommelier Corner — Contenido para Profesionales del Vino | Winerim', description: 'Espacio dedicado a sommeliers y profesionales del vino: tendencias, análisis de mercado, herramientas y recursos premium.', canonical: `${SITE}/sommelier-corner`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Sommelier Corner',
      subtitle: 'Contenido exclusivo para profesionales del vino en restauración.',
      sections: [{ heading: 'Recursos para sommeliers', content: 'Análisis de tendencias, benchmarks del sector, herramientas de gestión y contenido editorial curado para profesionales.' }],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Sommelier Corner', url: `${SITE}/sommelier-corner` }],
      internalLinks: [{ label: 'Biblioteca de vino', url: '/biblioteca-vino' }, { label: 'Benchmarks', url: '/benchmarks-playbooks' }, { label: 'Blog', url: '/blog' }],
    },
  },
  '/herramientas/calculadora-precio-vino-por-copa': {
    meta: { title: 'Calculadora de Precio de Vino por Copa | Winerim', description: 'Calcula el precio óptimo por copa para maximizar la rentabilidad de tu oferta de vino por copa. Herramienta gratuita.', canonical: `${SITE}/herramientas/calculadora-precio-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de precio de vino por copa',
      subtitle: 'Determina el precio óptimo por copa para maximizar la rentabilidad.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce el coste de la botella, número de copas por botella y margen objetivo. La calculadora sugiere el precio por copa ideal.' },
        { heading: 'Regla de las 3 copas', content: 'El precio debe permitir recuperar el coste total de la botella con las primeras 3 copas vendidas.' },
      ],
      faqs: [{ q: '¿Es gratuita?', a: 'Sí. 100% gratuita y sin registro.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora precio copa', url: `${SITE}/herramientas/calculadora-precio-vino-por-copa` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/diagnostico-vino-por-copa': {
    meta: { title: 'Diagnóstico de Vino por Copa | Winerim', description: 'Analiza tu oferta actual de vino por copa e identifica oportunidades de mejora en selección, precio y presentación.', canonical: `${SITE}/herramientas/diagnostico-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Diagnóstico de vino por copa',
      subtitle: 'Evalúa tu oferta actual de vino por copa y descubre oportunidades de mejora.',
      sections: [
        { heading: 'Qué evalúa', content: 'Diversidad de estilos, equilibrio de precios, rotación esperada, margen por copa y complementariedad con la carta de comidas.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Diagnóstico vino por copa', url: `${SITE}/herramientas/diagnostico-vino-por-copa` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/wine-list-score': {
    meta: { title: 'Wine List Score — Evalúa tu Carta de Vinos | Winerim', description: 'Evalúa la calidad y completitud de tu carta de vinos con un análisis automático de diversidad, precios, maridajes y estructura.', canonical: `${SITE}/herramientas/wine-list-score`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Wine List Score — Evalúa tu carta de vinos',
      subtitle: 'Puntuación automática de calidad, diversidad y rentabilidad de tu carta.',
      sections: [
        { heading: 'Cómo funciona', content: 'Sube tu carta y obtén una puntuación basada en diversidad, equilibrio de precios, cobertura de estilos y estructura general.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Wine List Score', url: `${SITE}/herramientas/wine-list-score` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Analizador de carta', url: '/analisis-carta' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-stock-muerto': {
    meta: { title: 'Calculadora de Stock Muerto en Bodega | Winerim', description: 'Identifica cuánto capital tienes inmovilizado en vinos con baja rotación y calcula el coste de oportunidad.', canonical: `${SITE}/herramientas/calculadora-stock-muerto`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de stock muerto en bodega',
      subtitle: 'Descubre cuánto capital tienes parado en vinos que no se venden.',
      sections: [
        { heading: 'Qué calcula', content: 'Capital inmovilizado, coste de oportunidad mensual y proyección de pérdida si no se actúa.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora stock muerto', url: `${SITE}/herramientas/calculadora-stock-muerto` }],
      internalLinks: [{ label: 'Detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-ticket-medio-vino': {
    meta: { title: 'Calculadora de Ticket Medio de Vino | Winerim', description: 'Calcula y optimiza el ticket medio de vino en tu restaurante. Herramienta gratuita con benchmarks del sector.', canonical: `${SITE}/herramientas/calculadora-ticket-medio-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de ticket medio de vino',
      subtitle: 'Mide y mejora el gasto medio en vino por mesa.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce ventas de vino y número de mesas. Obtén tu ticket medio actual y comparativa con benchmarks.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora ticket medio', url: `${SITE}/herramientas/calculadora-ticket-medio-vino` }],
      internalLinks: [{ label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/auditor-carta-multilocal': {
    meta: { title: 'Auditor de Carta Multi-Local | Winerim', description: 'Audita y compara las cartas de vinos de todos tus locales. Detecta inconsistencias y oportunidades de mejora.', canonical: `${SITE}/herramientas/auditor-carta-multilocal`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Auditor de carta de vinos multi-local',
      subtitle: 'Compara y optimiza las cartas de vinos de todos tus restaurantes.',
      sections: [
        { heading: 'Qué detecta', content: 'Inconsistencias de precios entre locales, referencias duplicadas, gaps de cobertura y oportunidades de estandarización.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Auditor multi-local', url: `${SITE}/herramientas/auditor-carta-multilocal` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-compra-inteligente': {
    meta: { title: 'Calculadora de Compra Inteligente de Vino | Winerim', description: 'Optimiza tus compras de vino con datos de rotación, margen y estacionalidad. Herramienta gratuita para restauradores.', canonical: `${SITE}/herramientas/calculadora-compra-inteligente`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de compra inteligente de vino',
      subtitle: 'Decide qué, cuánto y cuándo comprar basándote en datos reales.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce rotación actual, margen objetivo y estacionalidad. Obtén recomendaciones de volumen de compra por referencia.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Compra inteligente', url: `${SITE}/herramientas/calculadora-compra-inteligente` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Guía compras con datos', url: '/guias/como-usar-datos-para-decidir-que-vinos-comprar' }, { label: 'Demo', url: '/demo' }],
    },
  },
};

// ── HTML Generator ──
function generateHTML(meta: PageMeta, content: PageContent, hreflang?: HreflangEntry[]): string {
  const faqSchema = content.faqs.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }) : '';

  const breadcrumbSchema = content.breadcrumbs.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: content.breadcrumbs.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.name,
      item: bc.url,
    })),
  }) : '';

  const mainSchema = meta.schemaType === 'SoftwareApplication'
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Winerim',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: meta.description,
        url: SITE,
        offers: { '@type': 'Offer', priceCurrency: 'EUR', url: `${SITE}/precios` },
      })
    : JSON.stringify({
        '@context': 'https://schema.org',
        '@type': meta.schemaType || 'WebPage',
        headline: meta.title,
        description: meta.description,
        url: meta.canonical,
        author: { '@type': 'Organization', name: 'Winerim', url: SITE },
        publisher: { '@type': 'Organization', name: 'Winerim', url: SITE, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
        inLanguage: meta.lang,
      });

  const orgSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Winerim',
    url: SITE,
    logo: OG_IMAGE,
    description: 'Carta inteligente de vinos con IA para restaurantes, hoteles y vinotecas.',
    foundingDate: '2024',
    knowsAbout: ['Wine list management', 'Restaurant wine sales optimization', 'AI-powered wine recommendations', 'Digital wine menus', 'Wine pricing strategy', 'Food and wine pairing', 'Hospitality technology'],
    sameAs: [
      'https://www.instagram.com/winerim/',
      'https://www.youtube.com/@Winerim',
      'https://www.linkedin.com/company/winerim/',
    ],
  });

  const hreflangHTML = (hreflang || []).map(h =>
    `  <link rel="alternate" hreflang="${h.lang}" href="${h.url}" />`
  ).join('\n');

  const sectionsHTML = content.sections.map(s => `
    <section>
      <h2>${escapeHtml(s.heading)}</h2>
      <p>${escapeHtml(s.content)}</p>
    </section>`).join('\n');

  const faqsHTML = content.faqs.length > 0 ? `
    <section>
      <h2>Preguntas frecuentes</h2>
      <dl>
        ${content.faqs.map(f => `<dt>${escapeHtml(f.q)}</dt><dd>${escapeHtml(f.a)}</dd>`).join('\n        ')}
      </dl>
    </section>` : '';

  const navHTML = content.internalLinks.map(l =>
    `<a href="${SITE}${l.url}">${escapeHtml(l.label)}</a>`
  ).join(' | ');

  const breadcrumbHTML = content.breadcrumbs.length > 1
    ? `<nav aria-label="Breadcrumb"><ol>${content.breadcrumbs.map(bc => `<li><a href="${bc.url}">${escapeHtml(bc.name)}</a></li>`).join('')}</ol></nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="${meta.lang}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeAttr(meta.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${meta.canonical}">
${hreflangHTML}
  
  <meta property="og:type" content="${meta.type}">
  <meta property="og:title" content="${escapeAttr(meta.title)}">
  <meta property="og:description" content="${escapeAttr(meta.description)}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:image" content="${meta.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Winerim">
  <meta property="og:locale" content="${meta.lang === 'en' ? 'en_GB' : meta.lang === 'it' ? 'it_IT' : meta.lang === 'fr' ? 'fr_FR' : 'es_ES'}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(meta.title)}">
  <meta name="twitter:description" content="${escapeAttr(meta.description)}">
  <meta name="twitter:image" content="${meta.ogImage}">
  
  <script type="application/ld+json">${mainSchema}</script>
  ${faqSchema ? `<script type="application/ld+json">${faqSchema}</script>` : ''}
  ${breadcrumbSchema ? `<script type="application/ld+json">${breadcrumbSchema}</script>` : ''}
  <script type="application/ld+json">${orgSchema}</script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="${SITE}/">Winerim</a> |
      <a href="${SITE}/software-carta-de-vinos">Producto</a> |
      <a href="${SITE}/funcionalidades">Funcionalidades</a> |
      <a href="${SITE}/precios">Precios</a> |
      <a href="${SITE}/herramientas">Herramientas</a> |
      <a href="${SITE}/guias-y-recursos">Guías</a> |
      <a href="${SITE}/blog">Blog</a> |
      <a href="${SITE}/demo">Demo</a> |
      <a href="${SITE}/contacto">Contacto</a>
    </nav>
  </header>
  
  <main>
    ${breadcrumbHTML}
    <article>
      <h1>${escapeHtml(content.h1)}</h1>
      ${content.subtitle ? `<p><strong>${escapeHtml(content.subtitle)}</strong></p>` : ''}
      ${content.intro ? `<p>${escapeHtml(content.intro)}</p>` : ''}
      ${sectionsHTML}
      ${faqsHTML}
    </article>
    
    <nav aria-label="Enlaces relacionados">
      ${navHTML}
    </nav>
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Winerim. Carta inteligente de vinos para restaurantes.</p>
    <nav aria-label="Legal">
      <a href="${SITE}/privacidad">Privacidad</a> |
      <a href="${SITE}/terminos">Términos</a>
    </nav>
  </footer>
</body>
</html>`;
}

// ── Dynamic SEO page renderer ──
async function renderSeoPage(slug: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/seo_pages?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const page = data[0];
  const body = (typeof page.body === 'object' && page.body !== null ? page.body : {}) as Record<string, any>;
  const faqs = Array.isArray(page.faqs) ? page.faqs as { q: string; a: string }[] : [];

  const sections: { heading: string; content: string }[] = [];
  if (body.intro) sections.push({ heading: 'Introducción', content: body.intro });
  if (Array.isArray(body.sections)) {
    for (const s of body.sections) {
      if (s.heading && s.content) sections.push({ heading: s.heading, content: s.content });
    }
  }
  if (Array.isArray(body.problems)) {
    sections.push({ heading: 'Retos habituales', content: body.problems.join('. ') });
  }
  if (Array.isArray(body.benefits)) {
    sections.push({ heading: 'Beneficios', content: body.benefits.join('. ') });
  }
  if (Array.isArray(body.features)) {
    const featText = body.features.map((f: any) => `${f.title}: ${f.desc}`).join('. ');
    sections.push({ heading: 'Cómo te ayuda Winerim', content: featText });
  }

  const canonical = page.canonical_url || `${SITE}/${page.slug}`;

  const meta: PageMeta = {
    title: page.meta_title,
    description: page.meta_description,
    canonical,
    ogImage: page.og_image || OG_IMAGE,
    lang: page.lang || 'es',
    type: 'article',
    schemaType: page.schema_type || 'Article',
  };

  const internalLinks = Array.isArray(body.internal_links)
    ? body.internal_links.map((l: any) => ({ label: l.label || l.title || '', url: l.url || l.to || '/' }))
    : [
        { label: 'Solicitar demo', url: '/demo' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Herramientas', url: '/herramientas' },
      ];

  const content: PageContent = {
    h1: page.hero_title,
    subtitle: page.hero_subtitle || undefined,
    intro: body.intro || undefined,
    sections,
    faqs,
    breadcrumbs: [
      { name: 'Inicio', url: `${SITE}/` },
      { name: page.hero_title, url: canonical },
    ],
    internalLinks,
  };

  return generateHTML(meta, content);
}

// ── Dynamic article renderer ──
async function renderArticle(slug: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const article = data[0];
  const body = article.body || '';

  const sections: { heading: string; content: string }[] = [];
  const lines = body.split('\n');
  let currentHeading = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (currentHeading || currentContent.length) {
        sections.push({ heading: currentHeading, content: currentContent.join(' ').replace(/[#*_`]/g, '').trim() });
      }
      currentHeading = h2Match[1].trim();
      currentContent = [];
    } else if (line.trim()) {
      currentContent.push(line.replace(/[#*_`]/g, '').trim());
    }
  }
  if (currentHeading || currentContent.length) {
    sections.push({ heading: currentHeading, content: currentContent.join(' ').trim() });
  }

  const canonical = `${SITE}/article/${article.slug}`;

  return generateHTML(
    {
      title: article.title,
      description: article.excerpt || article.title,
      canonical,
      ogImage: article.image_url || OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    {
      h1: article.title,
      subtitle: article.excerpt || undefined,
      sections: sections.slice(0, 10),
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: article.title, url: canonical },
      ],
      internalLinks: [
        { label: 'Blog', url: '/blog' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Demo', url: '/demo' },
      ],
    }
  );
}

// ── Helpers ──
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── Main handler ──
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const ua = req.headers.get('user-agent') || '';

    // Robust path extraction — supports ?url=, ?path=, headers, and URL suffix
    let path: string | null = null;

    // 1. ?url=https://winerim.wine/biblioteca-vino → extract pathname
    const urlParam = url.searchParams.get('url');
    if (urlParam) {
      try {
        const parsed = new URL(urlParam);
        path = parsed.pathname || '/';
      } catch {
        // If not a valid URL, treat it as a path
        path = urlParam.startsWith('/') ? urlParam : '/' + urlParam;
      }
    }

    // 2. ?path=/biblioteca-vino
    if (!path) path = url.searchParams.get('path');

    // 3. Headers
    if (!path) path = req.headers.get('x-original-path') || req.headers.get('x-forwarded-path');

    // 4. URL pathname suffix: /functions/v1/prerender/biblioteca-vino
    if (!path) {
      const match = url.pathname.match(/\/prerender\/(.*)/);
      if (match && match[1]) path = '/' + match[1];
    }

    // Final fallback
    if (!path) path = '/';

    console.log('Prerender request — path:', path, '| ua:', ua.substring(0, 60));

    // Only serve prerendered HTML to bots
    if (!isBot(ua)) {
      return new Response(JSON.stringify({ prerender: false, reason: 'not-a-bot' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let html: string | null = null;

    // 1. Check static pages — instant, no DB query
    const staticPage = STATIC_PAGES[path];
    if (staticPage) {
      const hreflang = HREFLANG_MAP[path];
      html = generateHTML(staticPage.meta, staticPage.content, hreflang);
    }

    // 2. Check dynamic SEO pages (programmatic)
    if (!html && (path.startsWith('/software-carta-de-vinos-') || path.startsWith('/software-vino-') || path.startsWith('/wine-list-software-'))) {
      const slug = path.replace(/^\//, '');
      html = await renderSeoPage(slug);
    }

    // 3. Check any other SEO page by slug
    if (!html && !path.startsWith('/article/')) {
      const slug = path.replace(/^\//, '');
      if (slug) html = await renderSeoPage(slug);
    }

    // 4. Check articles
    if (!html && path.startsWith('/article/')) {
      const slug = path.replace('/article/', '');
      html = await renderArticle(slug);
    }

    if (html) {
      return new Response(html, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Prerender': 'true',
        },
      });
    }

    // No specific content found — fallback to homepage HTML for bots
    const fallbackPage = STATIC_PAGES['/'];
    const fallbackHreflang = HREFLANG_MAP['/'];
    html = generateHTML(fallbackPage.meta, fallbackPage.content, fallbackHreflang);
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Prerender': 'true',
        'X-Prerender-Fallback': 'homepage',
      },
    });

  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(JSON.stringify({ prerender: false, reason: 'error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
