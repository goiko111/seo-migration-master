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
};

// ── Static page definitions ──
// Each page has full semantic content for bots — independent of React hydration.
const STATIC_PAGES: Record<string, { meta: PageMeta; content: PageContent }> = {
  '/': {
    meta: {
      title: 'Winerim – Carta Inteligente de Vinos para Restaurantes',
      description: 'Winerim es la carta inteligente de vinos para restaurantes. Recomendaciones con IA, maridajes automáticos, analítica de ventas y gestión de bodega.',
      canonical: `${SITE}/`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Carta inteligente de vinos con recomendador IA',
      subtitle: 'Winerim convierte tu carta de vinos en un vendedor inteligente con IA. Recomienda el vino perfecto, optimiza márgenes y transforma la experiencia del comensal.',
      sections: [
        { heading: 'El problema', content: 'La mayoría de restaurantes pierden ventas de vino por cartas desactualizadas, falta de recomendaciones y márgenes mal calculados. El 70% de los comensales elige el segundo vino más barato por inseguridad.' },
        { heading: 'La solución', content: 'Winerim automatiza la gestión de tu carta de vinos con IA: recomendaciones personalizadas por plato, precios óptimos calculados automáticamente y análisis de rendimiento en tiempo real.' },
        { heading: 'Resultados', content: 'Restaurantes que usan Winerim aumentan su ticket medio en vino un 23%, reducen el stock muerto un 40% y ahorran más de 10 horas semanales en gestión de bodega.' },
        { heading: 'Cómo funciona', content: '1. Sube tu carta de vinos. 2. Winerim analiza tus referencias, márgenes y rotación. 3. Activa el recomendador inteligente. 4. Monitoriza resultados en tiempo real.' },
      ],
      faqs: [
        { q: '¿Qué es Winerim?', a: 'Winerim es una carta inteligente de vinos con recomendador IA para restaurantes, hoteles y vinotecas. Digitaliza tu carta, recomienda vinos y optimiza la rentabilidad.' },
        { q: '¿Cómo funciona el recomendador?', a: 'Analiza las preferencias del comensal, el plato elegido y el contexto para sugerir el vino ideal de tu carta con la mejor combinación de satisfacción y margen.' },
        { q: '¿Necesito instalar algo?', a: 'No. Winerim funciona 100% en la nube. Solo necesitas un dispositivo con navegador — tablet, móvil o QR.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que veas cómo funciona con tu carta real.' },
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
        { heading: 'Plan para restaurantes independientes', content: 'Carta digital con recomendador inteligente, fichas de vino completas y maridajes automáticos. Ideal para restaurantes con hasta 100 referencias.' },
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
    const path = url.searchParams.get('path') || '/';

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

    // No content found — let the SPA handle it
    return new Response(JSON.stringify({ prerender: false, reason: 'no-content' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(JSON.stringify({ prerender: false, reason: 'error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
