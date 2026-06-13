/**
 * Cloudflare Worker v3.2 — winerim.wine hybrid router
 *
 * Logic:
 *   1. Technical routes (health, robots, sitemap)
 *   2. Legacy WordPress → redirects edge function (301/410)
 *   3. SEO aliases → 301 to canonical
 *   4. Bot traffic → prerender edge function
 *   5. Known routes (SEO exact + SPA exact + SPA prefix + SEO wildcard + private) → origin
 *   6. Everything else → real 404
 *
 * Environment variables (Cloudflare dashboard):
 *   ORIGIN            = https://seo-migration-magic.lovable.app
 *   PRERENDER_URL     = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/prerender
 *   REDIRECTS_URL     = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/redirects
 *   SUPABASE_ANON_KEY = (set as secret)
 *   SITE_URL          = https://winerim.wine
 */

// ─── Bot detection ───
const BOT_REGEX = /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexitybot|cohere-ai|bytespider|google-extended|ccbot|petalbot|sogou|exabot/i;

// ─── Legacy WordPress URLs ───
const LEGACY_PREFIXES = [
  '/wp-content/', '/wp-admin/', '/wp-includes/', '/wp-login',
  '/author/', '/category/', '/tag/', '/feed',
  '/clientes/', '/estadisticas/', '/programa-afiliados',
  '/contacto-analizar-carta', '/privacy-policy', '/page/',
];
const LEGACY_EXACT = new Set([
  '/un-comensal-cada-vez-mas-exigente-el-vertigo-con-las-extensas-cartas-de-vinos',
  '/el-peso-del-vino-en-la-facturacion-de-los-restaurantes',
  '/el-sommelier-digital-el-nuevo-aliado-del-sommelier',
  '/los-beneficios-de-una-carta-de-vinos-digital',
  '/elegir-el-vino-una-tarea-complicada-para-muchos-comensales',
  '/wine-aging-differences-between-crianza-reserva-and-gran-reserva',
  '/when-the-food-goes-with-the-wine-the-best-restaurants',
  '/our-picks-for-memorable-wines',
  '/meet-our-winemaker-john-duo',
  '/the-best-wines-for-summer',
  '/10-reasons-to-enjoy-wine',
  '/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world',
  '/sitemap_index.xml', '/post-sitemap.xml', '/page-sitemap.xml',
  '/clientes-sitemap.xml', '/estadisticas-sitemap.xml',
  '/eazy_flickity_slider-sitemap.xml',
]);

// ─── SEO aliases → 301 to canonical ───
const SEO_ALIASES = {
  '/wine-list-management-software': '/en/wine-list-management-software',
  '/what-is-winerim': '/en/what-is-winerim',
  '/ai-wine-software': '/en/ai-wine-software',
  '/wine-list-analyzer': '/en/wine-list-analyzer',
  '/wine-roi-calculator': '/en/wine-roi-calculator',
  '/wine-pairing-generator': '/en/wine-pairing-generator',
  '/wine-pricing-tool': '/en/wine-pricing-tool',
  '/wine-list-benchmark': '/en/wine-list-benchmark',
  '/en/digital-wine-list': '/en/wine-list-management-software',
  // Spanish aliases for English-slug tools
  '/herramientas/puntuacion-carta-vinos': '/herramientas/wine-list-score',
};

// ─── High-confidence legacy URLs surfaced by Search Console ───
const LEGACY_DIRECT_REDIRECTS = {
  '/privacy-policy': '/privacidad',
  '/terms-of-service': '/terminos',
  '/home': '/',
  '/homepage': '/',
  '/en/homepage': '/en',
  '/landing': '/',
  '/alex-pardo': '/article/alex-pardo',
  '/aumenta-la-venta-de-vinos-en-tu-restaurante-mejores-estrategias': '/como-vender-mas-vino-en-un-restaurante',
  '/por-que-los-jovenes-no-beben-vino-en-los-restaurantes': '/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes',
  '/winerim-vs-wineadvisor-2': '/comparativas',
  '/winerim-vs-wineadvisor': '/comparativas',
  '/winerim-vs-vinipad': '/comparativas',
  '/reviews-restaurante': '/casos-exito',
  '/winerim-sommelier-magazine': '/sommelier-corner',
  '/corso-vino-cata-mw-examen-practico': '/decision-center/cursos',
  '/winerim-academy': '/decision-center/cursos',
  '/winerim-academy-2': '/decision-center/cursos',
  '/en/the-importance-of-choosing-the-wine-that-goes-best-with-food': '/en/blog',
  '/en/when-the-food-goes-with-the-wine-the-best-restaurants': '/en/guides/wine-pairing-strategy-restaurants',
  '/estadisticas': '/benchmarks-playbooks',
  '/programa-afiliados': '/afiliate',
  '/programa-afiliados/afiliacion': '/afiliate',
  '/blog-2': '/blog',
  '/revista': '/blog',
  '/contacto-analizar-carta': '/analisis-carta',
  '/analiza-tu-carta': '/analisis-carta',
  '/formulario-contacto': '/contacto',
  '/formulario-de-contacto-web-link-carta': '/contacto',
  '/condiciones-de-servicio-2': '/terminos',
  '/carta-vinos-digital': '/software-carta-de-vinos',
  '/carta_vinos_digital': '/software-carta-de-vinos',
  '/choosing-wine-a-not-so-easy-task-for-many-diners': '/software-carta-de-vinos',
  '/en/choosing-wine-a-not-so-easy-task-for-many-diners': '/en/wine-list-management-software',
  '/como-mejorar-la-experiencia-del-cliente-en-un-restaurante': '/software-carta-de-vinos',
  '/como-hacer-una-carta-de-vinos-perfecta-para-tu-restaurante': '/como-hacer-una-carta-de-vinos',
  '/ia-para-restaurantes-las-mejores-aplicaciones': '/inteligencia-artificial-restaurantes',
  '/venta-de-vinos-en-restaurantes-7-errores-comunes-y-como-solucionarlos': '/como-vender-mas-vino-en-un-restaurante',
  '/los-mejores-software-tpv-para-restaurante': '/integraciones',
  '/maridaje-de-vinos-guia-completa-para-restaurantes': '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion',
  '/envejecimiento-del-vino': '/biblioteca-vino/glosario',
  '/uvas-poco-comunes-vinos-poco-conocidos': '/biblioteca-vino/uvas',
  '/vinos-y-comida-vegana': '/biblioteca-vino/maridajes',
  '/vinos-ecologicos': '/biblioteca-vino/estilos/ecologico-biodinamico-natural',
  '/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino': '/blog',
  '/como-ser-sommelier-formacion-funciones-y-salidas-profesionales': '/decision-center/cursos',
  '/periko-ortega': '/article/periko-ortega',
  '/simone-monese': '/article/simone-monese',
  '/joan-guso': '/article/joan-guso',
  '/berta-romero': '/article/berta-romero',
  '/david-paredes': '/article/david-paredes',
  '/nacho-otamendi': '/article/nacho-otamendi',
  '/xavi-nolla-cuenta-por-que-winerim-es-el-mejor-aliado-del-sommelier': '/article/xavi-nolla',
  '/jordi-subiros-motel-emporda': '/casos-exito',
  '/jordi-subiros-lo-que-winerim-aporta-a-un-responsable-de-fb': '/casos-exito',
  '/informe-can-bosch': '/casos-exito',
  '/informe-il-mulino-di-monza': '/casos-exito',
  '/andre-jullien-el-arte-del-sommelier': '/sommelier-corner',
  '/un-consejo-salirnos-de-nuestra-zona-de-confort': '/sommelier-corner',
  '/un-consejo-prueba-todo-lo-que-puedas': '/sommelier-corner',
  '/un-consejo-apreciar-lo-bien-hecho': '/sommelier-corner',
  '/un-consejo-prueba-vinos-': '/article/un-consejo-prueba-vinos-nuevos',
  '/un-consejo-cata-con-el-': '/article/un-consejo-cata-con-el-corazon',
  '/un-consejo-cata-con-el-corazon': '/sommelier-corner',
  '/en/cookies': '/en/privacy',
};

const LEGACY_GONE_PATHS = new Set([
  '/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world',
]);

function getMalformedAbsolutePathTarget(path) {
  const match = path.match(/^\/https?:\/(?:\/)?(?:www\.)?winerim\.wine(\/.*)$/i);
  if (!match) return null;
  const target = match[1].replace(/\/{2,}/g, '/');
  return target && target !== path ? target : null;
}

function getLegacyLanguageQueryTarget(url) {
  if (url.pathname !== '/' || !url.searchParams.has('lang')) return null;
  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  const targets = { en: '/en', it: '/it', fr: '/fr', de: '/de', pt: '/pt', es: '/' };
  return targets[lang] || null;
}

function getLegacyLocalizedArticleTarget(path) {
  const match = path.match(/^\/article\/([^/]+)_(en|it|fr|de|pt)$/);
  if (!match) return null;
  const [, baseSlug, lang] = match;
  return `/${lang}/article/${baseSlug}`;
}

const LOCALIZED_ARTICLE_CANONICAL_REDIRECTS = {
  '/article/alternative-zur-pdf-weinkarte': '/de/article/alternative-zur-pdf-weinkarte',
  '/article/come-sapere-se-la-carta-vini-squilibrata': '/it/article/come-sapere-se-la-carta-vini-squilibrata',
  '/article/como-saber-carta-vinhos-desequilibrada': '/pt/article/como-saber-carta-vinhos-desequilibrada',
  '/article/fehler-weinepreis-restaurant': '/de/article/fehler-weinepreis-restaurant',
  '/article/pricing-vino-errori-comuni': '/it/article/pricing-vino-errori-comuni',
  '/article/quali-vini-offrire-al-bicchiere-secondo-tipo-locale': '/it/article/quali-vini-offrire-al-bicchiere-secondo-tipo-locale',
  '/article/quand-carte-vins-trop-longue': '/fr/article/quand-carte-vins-trop-longue',
  '/article/quando-carta-vinhos-demasiado-longa': '/pt/article/quando-carta-vinhos-demasiado-longa',
  '/article/quels-vins-proposer-au-verre-selon-type-etablissement': '/fr/article/quels-vins-proposer-au-verre-selon-type-etablissement',
  '/article/software-offener-weinausschank-restaurants': '/de/article/software-offener-weinausschank-restaurants',
  '/article/software-vinho-copo-restaurantes': '/pt/article/software-vinho-copo-restaurantes',
  '/article/what-wines-offer-by-glass-venue-type': '/en/article/what-wines-offer-by-glass-venue-type',
  '/article/wine-by-the-glass-software-restaurants': '/en/article/wine-by-the-glass-software-restaurants',
  '/article/zu-lange-weinkarte': '/de/article/zu-lange-weinkarte',
};

function getLocalizedArticleCanonicalTarget(path) {
  return LOCALIZED_ARTICLE_CANONICAL_REDIRECTS[path] || null;
}

function normalizeLegacyLookupPath(path) {
  if (path.length <= 1 || !path.endsWith('/')) return path;
  return path.slice(0, -1);
}

function getDirectLegacyTarget(path) {
  const legacyLookupPath = normalizeLegacyLookupPath(path);
  return LEGACY_DIRECT_REDIRECTS[legacyLookupPath]
    || (legacyLookupPath.startsWith('/clientes/') ? '/clientes' : null)
    || (legacyLookupPath.startsWith('/estadisticas/') ? '/benchmarks-playbooks' : null)
    || (legacyLookupPath.startsWith('/blog-2/') ? '/blog' : null)
    || (legacyLookupPath.startsWith('/programa-afiliados/') ? '/afiliate' : null);
}

// ─── Wine library legacy one-segment shortcuts → canonical entity URLs ───
const WINE_LIBRARY_BASES = {
  es: '/biblioteca-vino',
  en: '/en/wine-library',
  it: '/it/biblioteca-vino',
  fr: '/fr/bibliotheque-vin',
  de: '/de/weinbibliothek',
  pt: '/pt/biblioteca-vinho',
};
const WINE_LIBRARY_SECTION_MAP = {
  es: { regiones: 'regiones', uvas: 'uvas', estilos: 'estilos', maridajes: 'maridajes' },
  en: { regiones: 'regions', uvas: 'grapes', estilos: 'styles', maridajes: 'pairings' },
  it: { regiones: 'regioni', uvas: 'vitigni', estilos: 'stili', maridajes: 'abbinamenti' },
  fr: { regiones: 'regions', uvas: 'cepages', estilos: 'styles-de-vin', maridajes: 'accords' },
  de: { regiones: 'regionen', uvas: 'rebsorten', estilos: 'weinstile', maridajes: 'weinbegleitung' },
  pt: { regiones: 'regioes', uvas: 'castas', estilos: 'estilos', maridajes: 'harmonizacoes' },
};
const WINE_LIBRARY_LEGACY_SHORTCUTS = {
  'tempranillo': '/biblioteca-vino/uvas/tempranillo',
  'chardonnay': '/biblioteca-vino/uvas/chardonnay',
  'garnacha': '/biblioteca-vino/uvas/garnacha',
  'sauvignon-blanc': '/biblioteca-vino/uvas/sauvignon-blanc',
  'cabernet-sauvignon': '/biblioteca-vino/uvas/cabernet-sauvignon',
  'rioja': '/biblioteca-vino/regiones/espana/rioja',
  'borgona': '/biblioteca-vino/regiones/francia/bourgogne',
  'priorat': '/biblioteca-vino/regiones/espana/priorat',
  'napa-valley': '/biblioteca-vino/regiones/estados-unidos/napa-valley',
  'vino-tinto': '/biblioteca-vino/estilos/tinto',
  'vino-blanco': '/biblioteca-vino/estilos/blanco',
  'vino-rosado': '/biblioteca-vino/estilos/rosado',
  'vino-espumoso': '/biblioteca-vino/estilos/espumoso',
  'maridaje-carne': '/biblioteca-vino/maridajes/carnes-rojas',
  'maridaje-pescado': '/biblioteca-vino/maridajes/pescados-y-mariscos',
  'maridaje-queso': '/biblioteca-vino/maridajes/quesos',
};

function localizeWineLibraryPath(lang, esPath) {
  const base = WINE_LIBRARY_BASES[lang] || WINE_LIBRARY_BASES.es;
  if (esPath === '/biblioteca-vino') return base;

  const match = esPath.match(/^\/biblioteca-vino\/([^/]+)(.*)$/);
  if (!match) return esPath;

  const section = match[1];
  const rest = match[2] || '';
  const localizedSection = WINE_LIBRARY_SECTION_MAP[lang]?.[section] || section;
  return `${base}/${localizedSection}${rest}`;
}

function getWineLibraryLegacyShortcutTarget(path) {
  for (const [lang, base] of Object.entries(WINE_LIBRARY_BASES)) {
    if (!path.startsWith(`${base}/`)) continue;
    const slug = path.slice(base.length + 1);
    if (!slug || slug.includes('/')) return null;
    const canonicalEsPath = WINE_LIBRARY_LEGACY_SHORTCUTS[slug];
    if (!canonicalEsPath) return null;
    return localizeWineLibraryPath(lang, canonicalEsPath);
  }
  return null;
}

// ─── Worker bridge prerender for resource/benchmark detail pages ───
// Keeps production bot HTML canonical while Supabase Edge Functions are published from Lovable.
const RESOURCE_DETAIL_PRERENDER_PAGES = {
  'plantilla-estrategia-vinos-por-copa': ['Plantilla de estrategia de vinos por copa', 'Descarga gratis la plantilla para diseñar tu estrategia de vino por copa: selección, pricing, rotación, control de merma y objetivos de venta.', 'Diseña, ejecuta y controla tu programa de vino por copa con un documento operativo que cubre selección, pricing, rotación y objetivos.', 'El vino por copa es una de las palancas de margen más potentes en restauración, pero sin un plan estructurado se gestiona de forma reactiva.', 'Un documento de trabajo completo para gestionar tu programa de vino por copa de forma profesional.'],
  'checklist-deteccion-vinos-muertos': ['Checklist de detección de vinos muertos y baja rotación', 'Descarga la checklist para identificar vinos sin rotación en tu carta. Detecta stock muerto.', 'Identifica las referencias que no rotan, cuantifica el capital inmovilizado y toma decisiones informadas.', 'Los vinos que no se venden ocupan espacio, inmovilizan capital y pueden deteriorarse.', 'Un proceso estructurado para auditar tu bodega e identificar referencias que necesitan acción inmediata.'],
  'plantilla-formacion-equipo-sala': ['Plantilla de formación exprés en vino para equipos de sala', 'Descarga la plantilla para formar a tu equipo de sala en vino en menos de 2 semanas.', 'Un programa de formación práctico para que tu equipo recomiende vino con confianza.', 'Sin una guía clara, el personal evita recomendar vino por miedo a equivocarse o no saber qué decir.', 'Un programa completo de formación diseñado para sesiones cortas antes del servicio.'],
  'plantilla-analisis-margenes': ['Plantilla de análisis de márgenes por referencia', 'Descarga la plantilla para analizar el margen de cada vino de tu carta. Coste, PVP, multiplicador, contribución al margen global y ranking de rentabilidad.', 'Analiza la rentabilidad real de cada vino de tu carta.', 'Muchos restaurantes conocen su margen bruto general, pero no qué referencias contribuyen más o menos al resultado.', 'Una hoja de cálculo estructurada para analizar la rentabilidad de cada referencia.'],
  'scorecard-rendimiento-carta': ['Scorecard mensual de rendimiento de carta de vinos', 'Descarga el scorecard para medir el rendimiento de tu carta de vinos cada mes. KPIs de venta, rotación, margen, copa y ticket medio en un solo documento.', 'Un cuadro de mando mensual con los KPIs esenciales para evaluar tu carta.', 'Sin métricas claras, la gestión de la carta se basa en sensaciones.', 'Un documento mensual que agrupa los indicadores más importantes de tu carta de vinos.'],
  'checklist-carta-que-vende': ['Checklist: ¿Tu carta de vinos realmente vende?', 'Descarga la checklist para evaluar si tu carta de vinos está diseñada para vender.', '30 puntos de control para evaluar si tu carta está diseñada para convertir.', 'Muchas cartas informan, pero no guían la decisión del cliente.', '6 dimensiones de conversión con 30 puntos de control para diagnosticar la capacidad de venta.'],
  'plantilla-equilibrio-carta': ['Plantilla para evaluar el equilibrio de tu carta de vinos', 'Descarga la plantilla para analizar el equilibrio de tu carta por estilos, regiones, precios y tipologías. Detecta desequilibrios y mejora la composición.', 'Analiza si tu carta está equilibrada por estilos, regiones, rangos de precio y tipologías.', 'Muchas cartas acumulan referencias por inercia y los desequilibrios quedan ocultos.', 'Un análisis multidimensional de la composición de tu carta.'],
  'plantilla-revision-mensual-carta': ['Plantilla de revisión mensual de carta de vinos', 'Descarga la plantilla para revisar tu carta de vinos cada mes: rendimiento por referencia, oportunidades de mejora, rotación, pricing y plan de acción.', 'Un proceso estructurado para revisar tu carta cada mes.', 'Sin revisión periódica, se acumulan vinos muertos, precios desactualizados y oportunidades perdidas.', 'Un documento mensual con 5 bloques para cubrir el ciclo de revisión.'],
  'plantilla-control-grupo-restauracion': ['Plantilla de control y análisis de carta de vinos para grupos de restauración', 'Descarga la plantilla para gestionar y comparar la carta de vinos en múltiples locales.', 'Gestiona, compara y optimiza la carta en todos tus locales con control centralizado.', 'Cada local puede gestionar el vino de forma distinta y sin visibilidad cruzada.', 'Un framework para gestionar la carta de vinos de forma centralizada en grupos.'],
  'plantilla-carta-de-vinos': ['Plantilla de carta de vinos para restaurante', 'Descarga gratis una plantilla profesional para diseñar tu carta de vinos. Estructura de categorías, precios equilibrados y sección por copa incluida.', 'Diseña una carta clara, equilibrada y pensada para vender más.', 'Diseñar una carta desde cero puede generar errores de experiencia y rentabilidad.', 'Todo lo necesario para diseñar una carta de vinos profesional desde el primer día.'],
  'checklist-carta-de-vinos-rentable': ['Checklist: ¿Tu carta de vinos es rentable?', 'Descarga gratis la checklist para evaluar si tu carta de vinos está optimizada: estructura, precios, estilos, vino por copa y rotación.', '25 puntos de control para evaluar si tu carta está optimizada.', 'La mayoría de cartas tiene puntos ciegos que impactan ventas y márgenes.', '5 áreas de evaluación para diagnosticar tu carta de vinos.'],
  'guia-vino-por-copa-para-restaurantes': ['Guía de vino por copa para restaurantes', 'Descarga gratis la guía completa de vino por copa: cuántos ofrecer, cómo fijar precios, qué vinos elegir y cómo aumentar ventas en tu restaurante.', 'Diseña un programa de vino por copa rentable.', 'Muchos restaurantes ofrecen vino por copa sin estrategia clara.', '5 capítulos para lanzar o mejorar tu programa de vino por copa.'],
  'plantilla-wine-mapping-restaurante': ['Plantilla de Wine Mapping para restaurantes', 'Descarga gratis la plantilla de wine mapping para estructurar los precios y la distribución de vinos en tu carta.', 'Mapea tu carta en una matriz de precio por estilo.', 'Sin un mapa visual es difícil detectar solapamientos, huecos y franjas mal cubiertas.', 'Todo lo necesario para mapear tu carta y detectar oportunidades de mejora.'],
  'revision-mensual-margenes': ['Revisión mensual de márgenes', 'Descarga la plantilla para revisar cada mes el margen de tu carta de vinos. Detecta erosión de rentabilidad.', 'Revisa cada mes cómo evoluciona el margen real de tu carta.', 'Muchos restaurantes detectan tarde pérdidas de margen por costes, precios o referencias poco rentables.', 'Una rutina útil para pricing, compras, copeo y rentabilidad real.'],
};

const BENCHMARK_DETAIL_PRERENDER_PAGES = {
  'benchmark-referencias-por-tipo-restaurante': ['Benchmark', 'Número ideal de referencias según tipo de restaurante', '¿Cuántas referencias debe tener tu carta de vinos? Benchmark por tipo de restaurante: gastronómico, casual, hotel, vinoteca.', 'Descubre cuántas referencias debería tener tu carta según tipo de establecimiento, ticket medio y perfil de cliente.', 'Una carta sobredimensionada genera stock muerto y confusión; una carta demasiado corta limita la experiencia.', 'El número ideal depende del tipo de restaurante, posicionamiento, rotación esperada y capacidad del equipo.'],
  'benchmark-distribucion-rangos-precio': ['Benchmark', 'Distribución ideal por rangos de precio', 'Cómo distribuir los rangos de precio en tu carta de vinos para maximizar ventas y margen. Benchmark con criterios prácticos para hostelería.', 'Estructura precios para que el cliente navegue con facilidad y el restaurante proteja margen.', 'Una carta con precios mal distribuidos concentra ventas en el vino más barato o bloquea la gama alta.', 'La distribución debe guiar hacia una zona de confort rentable.'],
  'benchmark-estrategia-por-copa': ['Benchmark', 'Estrategia de vino por copa: cuántos y cuáles', '¿Cuántos vinos por copa ofrecer? ¿Cuáles elegir? Benchmark con criterios prácticos para diseñar una oferta de vino por copa rentable.', 'El vino por copa es una palanca potente para aumentar ventas.', 'Pocas copas limitan experiencia; demasiadas generan merma y complejidad.', 'Una oferta bien diseñada aumenta ticket medio y reduce barreras de compra.'],
  'benchmark-equilibrio-regiones-estilos': ['Benchmark', 'Equilibrio entre regiones, estilos y tipologías', '¿Tu carta está equilibrada en regiones, estilos y tipologías? Benchmark para construir una carta diversa, coherente y alineada con tu cocina.', 'Una carta equilibrada hace que cada vino cumpla una función.', 'Una región o estilo dominante limita experiencia y maridaje.', 'Cada región, estilo y tipología debe responder a cocina, cliente e identidad.'],
  'benchmark-peso-vino-ticket-medio': ['Benchmark', 'Peso del vino en el ticket medio', '¿Cuánto debería representar el vino en tu ticket medio? Benchmark por tipo de restaurante para evaluar y mejorar la contribución del vino a la facturación.', 'El vino puede representar entre un 15% y un 40% del ticket medio.', 'Muchos restaurantes desconocen qué porcentaje del ticket corresponde al vino.', 'Los rangos del sector permiten identificar oportunidades de venta y margen.'],
  'benchmark-margen-por-tipo-referencia': ['Benchmark', 'Margen por tipo de referencia', '¿Qué margen aplicar a cada tipo de vino? Benchmark con criterios por categoría: entrada, medio, premium, copa, espumoso. Estrategia de pricing real.', 'No todos los vinos necesitan el mismo margen.', 'Un multiplicador uniforme distorsiona referencias caras y baratas.', 'La estrategia debe variar por coste, contexto competitivo y percepción de valor.'],
  'playbook-vender-mas-vino': ['Playbook', 'Cómo vender más vino en sala', 'Playbook práctico para aumentar las ventas de vino en tu restaurante. Técnicas de recomendación, formación de personal y diseño de carta.', 'Un plan para que el equipo venda más vino sin ser sumiller.', 'El personal no recomienda vino si no se siente seguro o si la carta es compleja.', 'Vender más requiere carta clara, equipo preparado y sistema de recomendación.'],
  'playbook-mejorar-rotacion': ['Playbook', 'Cómo mejorar la rotación de vinos', 'Playbook para eliminar stock muerto y mejorar la rotación de tu bodega. Criterios de análisis, acciones correctivas y prevención.', 'Identifica vinos que no rotan y decide qué hacer con ellos.', 'El stock muerto inmoviliza capital y genera costes ocultos.', 'La rotación mejora con análisis periódico, decisiones claras y prevención.'],
  'playbook-carta-rentable': ['Playbook', 'Cómo construir una carta más rentable', 'Playbook completo para diseñar una carta de vinos que maximice márgenes, rotación y experiencia del cliente. Estructura, pricing y selección.', 'Rediseña la carta con foco en rentabilidad sin sacrificar experiencia.', 'Las cartas construidas por inercia acumulan referencias y precios sin estrategia.', 'Cada referencia debe tener propósito, precio calculado y conexión con la cocina.'],
  'playbook-optimizar-vino-copa': ['Playbook', 'Cómo optimizar tu oferta de vino por copa', 'Playbook para diseñar, gestionar y rentabilizar tu oferta de vino por copa. Selección, pricing, control de merma y estrategia de rotación.', 'La copa puede maximizar facturación y minimizar merma.', 'Merma, selección débil y precios mal calculados frenan rentabilidad.', 'La copa rentable requiere selección inteligente, pricing ajustado y control operativo.'],
  'playbook-formar-personal': ['Playbook', 'Cómo formar al personal para recomendar vino', 'Playbook para formar al personal de sala en vino. Técnicas simples, sin jerga, para que tu equipo recomiende con confianza y aumente las ventas.', 'Tu equipo necesita confianza y una carta que pueda explicar rápido.', 'El miedo a equivocarse frena la recomendación de vino.', 'La formación debe ser práctica, centrada en la carta real y orientada a venta.'],
  'playbook-decidir-compras-datos': ['Playbook', 'Cómo decidir qué vinos comprar con datos', 'Playbook para tomar decisiones de compra de vino basadas en datos reales: rotación, margen, demanda y tendencias. Reduce riesgos y mejora tu selección.', 'Usa ventas reales para comprar mejor.', 'Comprar por inercia o presión comercial genera surtido débil y stock inmovilizado.', 'Comprar bien es comprar lo que el restaurante necesita según datos reales.'],
};

const STATIC_WORKER_PRERENDER_PAGES = {
  '/integraciones': {
    lang: 'es',
    title: 'Integraciones de Winerim | TPV, PMS, ERP, Inventario y API',
    description: 'Winerim se integra con los sistemas que ya usas: TPV, PMS hotelero, ERP y gestión de inventario. Ecosistema conectado para restaurantes, hoteles y grupos.',
    h1: 'Integraciones de Winerim',
    subtitle: 'Conecta la carta de vinos con ventas, stock, costes, PMS hotelero, ERP y sistemas de punto de venta para tomar decisiones con datos reales.',
    canonical: '/integraciones',
    schemaType: 'WebPage',
    sections: [
      ['Por qué importan las integraciones', 'Sin conexión con el TPV, el vino queda aislado: no sabes qué referencias se venden realmente, qué margen generan ni qué vinos se quedan sin rotación. Winerim conecta carta, ventas, stock y coste para convertir la carta en un sistema de decisión.'],
      ['TPV, POS y ventas reales', 'Winerim se integra con sistemas de punto de venta para sincronizar ventas por referencia, periodo y punto de servicio. Esto permite medir ticket medio de vino, rotación, margen y rendimiento por copa o botella.'],
      ['Inventario, ERP y compras', 'La integración con inventario y ERP ayuda a mantener stock actualizado, detectar sobrestock, revisar costes y decidir compras con información real en lugar de intuición o presión comercial.'],
      ['Hoteles, grupos y API', 'En hoteles y grupos, Winerim centraliza datos entre locales, outlets y sistemas PMS. Para equipos técnicos, la API permite proyectos personalizados y conexión con sistemas propios.'],
    ],
    links: [['Funcionalidades', '/funcionalidades'], ['Precios', '/precios'], ['Winerim Supply', '/producto/winerim-supply'], ['Solicitar demo', '/demo']],
  },
  '/it/prezzi': {
    lang: 'it',
    title: 'Prezzi Winerim | Software carta vini per ristoranti',
    description: 'Scopri quale piano Winerim si adatta al tuo ristorante, hotel o gruppo. Carta vini digitale, analytics, pricing, stock, integrazioni e supporto.',
    h1: 'Prezzi Winerim',
    subtitle: 'Piani per ristoranti, hotel e gruppi che vogliono vendere più vino, migliorare margini e gestire la carta con dati reali.',
    canonical: '/it/prezzi',
    schemaType: 'WebPage',
    sections: [
      ['Piani per ogni operazione', 'Starter digitalizza la carta e migliora la presentazione. Pro aggiunge analytics, pricing, raccomandazioni e controllo della rotazione. Enterprise centralizza multi-locale, integrazioni POS/PMS, API e reporting direzionale.'],
      ['Cosa cambia con Winerim', 'Il prezzo dipende dal numero di referenze, locali e livello di integrazione richiesto. L’obiettivo non è solo pubblicare una carta digitale, ma trasformarla in uno strumento di vendita e decisione.'],
      ['ROI e margine', 'Winerim aiuta a migliorare ticket medio del vino, identificare stock fermo, ottimizzare prezzi, formare il team e misurare l’impatto delle decisioni sulla carta.'],
      ['Come scegliere il piano', 'Un ristorante indipendente può iniziare con Starter o Pro. Un gastronomico, wine bar o hotel richiede Pro o Enterprise. Un gruppo multi-locale dovrebbe partire da Enterprise per governance e benchmarking.'],
    ],
    links: [['Prodotto', '/it/software-carta-vini'], ['Funzionalità', '/it/funzionalita'], ['Integrazioni', '/it/integrazioni'], ['Demo', '/it/demo']],
  },
};

const BAROMETER_ALTERNATES = {
  es: '/barometro-cartas-vino-2026',
  en: '/en/wine-list-barometer-2026',
  it: '/it/barometro-carte-vini-2026',
  fr: '/fr/barometre-cartes-vins-2026',
  de: '/de/weinkarten-barometer-2026',
  pt: '/pt/barometro-cartas-vinhos-2026',
  'x-default': '/barometro-cartas-vino-2026',
};

const WORKER_BAROMETER_SITEMAP_LASTMOD = '2026-06-10';

const WORKER_TERMS_PATHS = {
  es: '/terminos',
  en: '/en/terms',
  it: '/it/termini',
  fr: '/fr/conditions',
  de: '/de/agb',
  pt: '/pt/termos',
};

function escapeHtml(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderWorkerStaticPrerender(path, site) {
  const page = STATIC_WORKER_PRERENDER_PAGES[path];
  if (!page) return null;

  const canonicalPath = page.canonical || path;
  const canonical = `${site}${canonicalPath}`;
  const schemaType = page.schemaType || 'WebPage';
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: page.h1,
    headline: page.title,
    description: page.description,
    url: canonical,
    inLanguage: page.lang,
    publisher: { '@type': 'Organization', name: 'Winerim', url: site },
  });
  const datasetSchema = schemaType === 'Report' ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${page.h1} dataset`,
    description: page.description,
    url: canonical,
    inLanguage: page.lang,
    creator: { '@type': 'Organization', name: 'Winerim', url: site },
    publisher: { '@type': 'Organization', name: 'Winerim', url: site },
    license: `${site}${WORKER_TERMS_PATHS[page.lang] || '/terminos'}`,
    measurementTechnique: 'Aggregated and anonymized wine list analysis',
    variableMeasured: ['references per wine list', 'price ranges', 'by-the-glass offer', 'regions', 'grapes', 'styles', 'pairings', 'rotation', 'margin', 'dead stock signals'],
  }) : '';
  const schemaScripts = [`<script type="application/ld+json">${schema}</script>`, datasetSchema ? `<script type="application/ld+json">${datasetSchema}</script>` : ''].join('\n  ');
  const alternates = page.alternates || null;
  const alternateLinks = alternates ? Object.entries(alternates)
    .map(([lang, altPath]) => `<link rel="alternate" hreflang="${lang}" href="${site}${altPath}">`)
    .join('\n  ') : '';
  const navLinks = page.links.map(([label, url]) => `<a href="${site}${url}">${escapeHtml(label)}</a>`).join(' | ');
  const sections = page.sections.map(([heading, body]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('\n      ');

  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  ${alternateLinks}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}">
  ${schemaScripts}
</head>
<body>
  <header><nav><a href="${site}${page.lang === 'it' ? '/it' : '/'}">Winerim</a> | ${navLinks}</nav></header>
  <main>
    <article>
      <h1>${escapeHtml(page.h1)}</h1>
      <p><strong>${escapeHtml(page.subtitle)}</strong></p>
      <p>${escapeHtml(page.description)}</p>
      ${sections}
    </article>
    <nav aria-label="Enlaces relacionados">${navLinks}</nav>
  </main>
  <footer><p>Winerim. Carta inteligente de vinos para restaurantes.</p></footer>
  <!-- worker-static:${escapeHtml(path)} -->
</body>
</html>`;
}

function renderWorkerDetailPrerender(path, site) {
  const resourceMatch = path.match(/^\/recursos\/([^/]+)$/);
  const benchmarkMatch = path.match(/^\/benchmarks-playbooks\/([^/]+)$/);
  const resource = resourceMatch ? RESOURCE_DETAIL_PRERENDER_PAGES[resourceMatch[1]] : null;
  const benchmark = benchmarkMatch ? BENCHMARK_DETAIL_PRERENDER_PAGES[benchmarkMatch[1]] : null;
  if (!resource && !benchmark) return null;

  const slug = resourceMatch?.[1] || benchmarkMatch?.[1];
  const canonical = `${site}${path}`;
  const [kind, title, description, subtitle, problem, content] = resource
    ? ['CreativeWork', resource[0], resource[1], resource[2], resource[3], resource[4]]
    : [benchmark[0], benchmark[1], benchmark[2], benchmark[3], benchmark[4], benchmark[5]];
  const schemaType = kind === 'CreativeWork' ? 'CreativeWork' : 'Article';
  const hubPath = resource ? '/recursos' : '/benchmarks-playbooks';
  const hubLabel = resource ? 'Recursos descargables' : 'Benchmarks y playbooks';
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: title,
    name: title,
    description,
    url: canonical,
    inLanguage: 'es',
    author: { '@type': 'Organization', name: 'Winerim', url: site },
    publisher: { '@type': 'Organization', name: 'Winerim', url: site },
  });
  const breadcrumb = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: hubLabel, item: `${site}${hubPath}` },
      { '@type': 'ListItem', position: 3, name: title, item: canonical },
    ],
  });

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Winerim</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)} | Winerim">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <script type="application/ld+json">${schema}</script>
  <script type="application/ld+json">${breadcrumb}</script>
</head>
<body>
  <header><nav><a href="${site}/">Winerim</a> | <a href="${site}/software-carta-de-vinos">Software carta de vinos</a> | <a href="${site}${hubPath}">${hubLabel}</a> | <a href="${site}/demo">Demo</a></nav></header>
  <main>
    <nav aria-label="Breadcrumb"><a href="${site}/">Inicio</a> / <a href="${site}${hubPath}">${hubLabel}</a> / ${escapeHtml(title)}</nav>
    <article>
      <h1>${escapeHtml(title)}</h1>
      <p><strong>${escapeHtml(subtitle)}</strong></p>
      <p>${escapeHtml(description)}</p>
      <section><h2>Problema que resuelve</h2><p>${escapeHtml(problem)}</p></section>
      <section><h2>Qué incluye</h2><p>${escapeHtml(content)}</p></section>
      <section><h2>Cómo aplicarlo en tu carta</h2><p>Este contenido ayuda a equipos de sala, F&amp;B managers, propietarios y grupos de restauración a ordenar decisiones de carta, precio, rotación, formación y compras con criterios repetibles.</p></section>
      <section><h2>Siguiente paso con Winerim</h2><p>Winerim convierte este criterio en seguimiento continuo: carta, ventas, stock, margen, recomendaciones y oportunidades conectadas en una plataforma de decisión.</p></section>
    </article>
    <nav aria-label="Enlaces relacionados">
      <a href="${site}${hubPath}">${hubLabel}</a> |
      <a href="${site}/guias-y-recursos">Guías y recursos</a> |
      <a href="${site}/herramientas">Herramientas</a> |
      <a href="${site}/analisis-carta">Analizar mi carta gratis</a> |
      <a href="${site}/demo">Solicitar demo</a>
    </nav>
  </main>
  <footer><p>Winerim. Carta inteligente de vinos para restaurantes.</p></footer>
  <!-- worker-detail:${escapeHtml(slug)} -->
</body>
</html>`;
}

function detailUrlBlock(site, path, lastmod) {
  return `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
}

const WORKER_DETAIL_SITEMAP_LASTMOD = '2026-06-05';
const WINE_LIBRARY_SITEMAP_LASTMOD = '2026-06-01';

function isWineLibrarySitemapPath(path) {
  return path.startsWith('/biblioteca-vino')
    || path.startsWith('/en/wine-library')
    || path.startsWith('/it/biblioteca-vino')
    || path.startsWith('/fr/bibliotheque-vin')
    || path.startsWith('/de/weinbibliothek')
    || path.startsWith('/pt/biblioteca-vinho');
}

function stabilizeSitemapLastmod(xml) {
  return xml.replace(
    /(<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>)([^<]+)(<\/lastmod>)/g,
    (match, prefix, loc, currentLastmod, suffix) => {
      try {
        const path = new URL(loc).pathname;
        if (isWineLibrarySitemapPath(path)) {
          return `${prefix}${WINE_LIBRARY_SITEMAP_LASTMOD}${suffix}`;
        }
      } catch {
        return match;
      }
      return `${prefix}${currentLastmod}${suffix}`;
    },
  );
}

function injectWorkerDetailUrlsIntoSitemap(xml, site) {
  const hasDetailUrls = xml.includes(`${site}/recursos/plantilla-formacion-equipo-sala`)
    && xml.includes(`${site}/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`);
  const barometerPaths = [...new Set(Object.values(BAROMETER_ALTERNATES))];
  const missingBarometerPaths = barometerPaths.filter(path => !xml.includes(`${site}${path}`));

  if (hasDetailUrls && missingBarometerPaths.length === 0) {
    return stabilizeSitemapLastmod(xml);
  }

  const blocks = [
    ...(hasDetailUrls ? [] : Object.keys(RESOURCE_DETAIL_PRERENDER_PAGES).map(slug => detailUrlBlock(site, `/recursos/${slug}`, WORKER_DETAIL_SITEMAP_LASTMOD))),
    ...(hasDetailUrls ? [] : Object.keys(BENCHMARK_DETAIL_PRERENDER_PAGES).map(slug => detailUrlBlock(site, `/benchmarks-playbooks/${slug}`, WORKER_DETAIL_SITEMAP_LASTMOD))),
    ...missingBarometerPaths.map(path => detailUrlBlock(site, path, WORKER_BAROMETER_SITEMAP_LASTMOD)),
  ].join('');

  const bridgedXml = xml.includes('</urlset>') ? xml.replace('</urlset>', `${blocks}</urlset>`) : `${xml}\n${blocks}`;
  return stabilizeSitemapLastmod(bridgedXml);
}

// ─── NOINDEX routes (served but with noindex header) ───
const NOINDEX_ROUTES = new Set([
  '/gracias',
  '/unsubscribe',
  '/privacidad',
  '/terminos',
  '/en/privacy',
  '/en/terms',
  '/it/privacy',
  '/it/termini',
  '/fr/confidentialite',
  '/fr/conditions',
  '/de/datenschutz',
  '/de/agb',
  '/pt/privacidade',
  '/pt/termos',
]);

// ─── SEO EXACT routes (indexable, sitemap) ───
const SEO_EXACT = new Set([
  '/',
  '/blog',
  '/sommelier-corner',
  '/afiliate',
  '/contacto',
  '/demo',
  '/software-carta-de-vinos',
  '/inteligencia-artificial-restaurantes',
  '/precio-vino-restaurante',
  '/vino-por-copa-restaurante',
  '/que-es-winerim',
  '/sobre-winerim',
  '/calculadora-margen-vino',
  '/biblioteca-vino',
  '/casos-exito',
  '/ejemplos-carta-vinos',
  '/carta-papel-vs-digital',
  '/precios',
  '/integraciones',
  '/implantacion',
  '/como-vender-mas-vino-en-un-restaurante',
  '/analisis-carta',
  '/como-hacer-una-carta-de-vinos',
  '/guias-y-recursos',
  '/recursos',
  '/herramientas',
  '/soluciones',
  '/problemas',
  '/clientes',
  '/funcionalidades',
  '/comparativas',
  '/benchmarks-playbooks',
  '/barometro-cartas-vino-2026',
  '/privacidad',
  '/terminos',
  // Producto
  '/producto/inteligencia-dinamica',
  '/producto/winerim-core',
  '/producto/winerim-supply',
  // Soluciones
  '/soluciones/grupos-restauracion',
  '/soluciones/hoteles',
  '/soluciones/restaurantes-sin-sumiller',
  '/soluciones/restaurantes-gastronomicos',
  '/soluciones/wine-bars',
  '/soluciones/carta-amplia',
  '/soluciones/carta-crecimiento',
  '/soluciones/aumentar-ticket-medio-restaurante',
  '/soluciones/inteligencia-de-compras',
  // Blog posts
  '/blog/como-organizar-carta-de-vinos',
  '/blog/cuantos-vinos-carta-restaurante',
  '/blog/como-disenar-carta-vinos-rentable',
  // Guias
  '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante',
  '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion',
  '/guias/como-estructurar-carta-vinos-grupo-restauracion',
  '/guias/como-fijar-estrategia-rentable-vino-por-copa',
  '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad',
  '/guias/como-formar-equipo-sala-para-vender-vino',
  '/guias/como-usar-datos-para-decidir-que-vinos-comprar',
  '/guias/como-conectar-carta-stock-ventas-margen',
  '/guias/como-gestionar-carta-vinos-grupos-restauracion',
  '/guias/como-implantar-vino-por-copa-sin-perder-margen',
  '/guias/como-usar-winerim-sin-sumiller',
  '/guias/como-decidir-surtido-segun-ticket-medio-tipo-local',
  '/guias/como-detectar-canibalizacion-vinos-carta',
  '/guias/como-revisar-carta-vinos-cada-mes',
  // Herramientas
  '/herramientas/calculadora-precio-vino-por-copa',
  '/herramientas/diagnostico-vino-por-copa',
  '/herramientas/wine-list-score',
  '/herramientas/calculadora-stock-muerto',
  '/herramientas/calculadora-ticket-medio-vino',
  '/herramientas/auditor-carta-multilocal',
  '/herramientas/calculadora-compra-inteligente',
  '/simulador-carta',
  // Problemas
  '/problemas/carta-de-vinos-no-vende',
  // Biblioteca sub-hubs
  '/biblioteca-vino/regiones',
  '/biblioteca-vino/uvas',
  '/biblioteca-vino/estilos',
  '/biblioteca-vino/maridajes',
  '/biblioteca-vino/guia-servicio',
  '/biblioteca-vino/glosario',
  // Library localized sub-hubs
  '/en/wine-library',
  '/en/wine-library/regions',
  '/en/wine-library/grapes',
  '/en/wine-library/styles',
  '/en/wine-library/pairings',
  '/en/wine-library/service-guide',
  '/en/wine-library/glossary',
  '/it/biblioteca-vino',
  '/it/biblioteca-vino/regioni',
  '/it/biblioteca-vino/vitigni',
  '/it/biblioteca-vino/stili',
  '/it/biblioteca-vino/abbinamenti',
  '/it/biblioteca-vino/guida-servizio',
  '/it/biblioteca-vino/glossario',
  '/fr/bibliotheque-vin',
  '/fr/bibliotheque-vin/regions',
  '/fr/bibliotheque-vin/cepages',
  '/fr/bibliotheque-vin/styles-de-vin',
  '/fr/bibliotheque-vin/accords',
  '/fr/bibliotheque-vin/guide-service',
  '/fr/bibliotheque-vin/glossaire',
  '/de/weinbibliothek',
  '/de/weinbibliothek/regionen',
  '/de/weinbibliothek/rebsorten',
  '/de/weinbibliothek/weinstile',
  '/de/weinbibliothek/weinbegleitung',
  '/de/weinbibliothek/service-guide',
  '/de/weinbibliothek/glossar',
  '/pt/biblioteca-vinho',
  '/pt/biblioteca-vinho/regioes',
  '/pt/biblioteca-vinho/castas',
  '/pt/biblioteca-vinho/estilos',
  '/pt/biblioteca-vinho/harmonizacoes',
  '/pt/biblioteca-vinho/guia-servico',
  '/pt/biblioteca-vinho/glossario',
  // ─── EN ───
  '/en',
  '/en/blog',
  '/en/demo',
  '/en/contact',
  '/en/pricing',
  '/en/features',
  '/en/clients',
  '/en/integrations',
  '/en/case-studies',
  '/en/tools',
  '/en/guides',
  '/en/resources',
  '/en/solutions',
  '/en/challenges',
  '/en/sommelier-corner',
  '/en/affiliate',
  '/en/wine-list-management-software',
  '/en/what-is-winerim',
  '/en/about-winerim',
  '/en/product/dynamic-intelligence',
  '/en/product/winerim-core',
  '/en/product/winerim-supply',
  '/en/privacy',
  '/en/terms',
  '/en/benchmarks-playbooks',
  '/en/wine-list-barometer-2026',
  '/en/comparisons',
  '/en/wine-list-analysis',
  '/en/wine-margin-calculator',
  '/en/implementation',
  '/en/solutions/restaurant-groups',
  '/en/solutions/fine-dining',
  '/en/solutions/wine-bars',
  '/en/solutions/hotels',
  '/en/solutions/no-sommelier',
  '/en/solutions/large-wine-list',
  '/en/solutions/growing-wine-list',
  '/en/solutions/purchasing-intelligence',
  '/en/solutions/increase-average-ticket',
  '/en/tools/wine-by-glass-price-calculator',
  '/en/tools/dead-stock-calculator',
  '/en/tools/average-ticket-calculator',
  '/en/tools/smart-purchasing-calculator',
  '/en/tools/by-glass-diagnostic',
  '/en/tools/wine-list-score',
  '/en/tools/multi-unit-auditor',
  '/en/how-to-sell-more-wine-in-restaurants',
  '/en/wine-pricing-restaurant',
  '/en/wine-by-glass-restaurant',
  '/en/artificial-intelligence-restaurants',
  '/en/how-to-create-a-wine-list',
  '/en/how-to-organize-wine-list',
  '/en/how-to-design-profitable-wine-list',
  '/en/paper-vs-digital-wine-list',
  '/en/how-many-wines-restaurant-list',
  '/en/wine-list-examples',
  '/en/problems/wine-list-not-selling',
  '/en/decision-center',
  '/en/distributor',
  '/en/wine-list-simulator',
  // EN guides
  '/en/guides/how-to-structure-wine-list-restaurant-group',
  '/en/guides/how-to-set-profitable-wine-by-glass-strategy',
  '/en/guides/how-to-detect-dead-stock-wines',
  '/en/guides/how-to-train-staff-to-sell-wine',
  '/en/guides/how-to-use-data-to-decide-which-wines-to-buy',
  '/en/guides/how-to-connect-wine-list-stock-sales-margin',
  '/en/guides/how-to-manage-wine-list-restaurant-groups',
  '/en/guides/how-to-implement-wine-by-glass-without-losing-margin',
  '/en/guides/how-to-use-winerim-without-sommelier',
  '/en/guides/how-to-choose-wine-selection-by-average-ticket',
  '/en/guides/how-to-detect-wine-cannibalization',
  '/en/guides/how-to-review-wine-list-monthly',
  '/en/guides/how-to-improve-wine-rotation-in-restaurants',
  '/en/guides/wine-pairing-strategy-restaurants',
  // ─── IT ───
  '/it',
  '/it/blog',
  '/it/demo',
  '/it/contatto',
  '/it/prezzi',
  '/it/funzionalita',
  '/it/clienti',
  '/it/integrazioni',
  '/it/casi-di-successo',
  '/it/strumenti',
  '/it/guide',
  '/it/risorse',
  '/it/soluzioni',
  '/it/sfide',
  '/it/sommelier-corner',
  '/it/affiliati',
  '/it/software-carta-vini',
  '/it/cose-winerim',
  '/it/chi-siamo',
  '/it/lavora-con-noi',
  '/it/distributore',
  '/it/prodotto/intelligenza-dinamica',
  '/it/prodotto/winerim-core',
  '/it/prodotto/winerim-supply',
  '/it/privacy',
  '/it/termini',
  '/it/benchmarks-playbooks',
  '/it/barometro-carte-vini-2026',
  '/it/confronti',
  '/it/analisi-carta',
  '/it/calcolatrice-margini-vino',
  '/it/implementazione',
  '/it/soluzioni/gruppi-ristorazione',
  '/it/soluzioni/ristoranti-gourmet',
  '/it/soluzioni/wine-bar',
  '/it/soluzioni/hotel',
  '/it/soluzioni/senza-sommelier',
  '/it/soluzioni/carta-vini-ampia',
  '/it/soluzioni/carta-vini-crescita',
  '/it/soluzioni/intelligenza-acquisti',
  '/it/soluzioni/aumentare-scontrino-medio',
  '/it/strumenti/calcolatrice-prezzo-vino-al-calice',
  '/it/strumenti/calcolatrice-stock-morto',
  '/it/strumenti/calcolatrice-scontrino-medio',
  '/it/strumenti/calcolatrice-acquisto-intelligente',
  '/it/strumenti/diagnostico-vino-al-calice',
  '/it/strumenti/wine-list-score',
  '/it/strumenti/auditor-carta-multilocale',
  '/it/come-vendere-piu-vino-ristorante',
  '/it/prezzo-vino-ristorante',
  '/it/vino-al-calice-ristorante',
  '/it/intelligenza-artificiale-ristoranti',
  '/it/come-creare-una-carta-dei-vini',
  '/it/come-organizzare-carta-vini',
  '/it/come-progettare-carta-vini-redditizia',
  '/it/carta-cartacea-vs-digitale',
  '/it/quanti-vini-carta-ristorante',
  '/it/esempi-carta-vini',
  '/it/problemi/carta-vini-non-vende',
  '/it/decision-center',
  '/it/simulatore-carta',
  // IT guides
  '/it/guide/come-strutturare-carta-vini-gruppo-ristorazione',
  '/it/guide/come-fissare-strategia-redditizia-vino-al-calice',
  '/it/guide/come-rilevare-vini-morti',
  '/it/guide/come-formare-personale-sala-vendere-vino',
  '/it/guide/come-usare-dati-per-decidere-quali-vini-acquistare',
  '/it/guide/come-collegare-carta-stock-vendite-margine',
  '/it/guide/come-gestire-carta-vini-gruppi-ristorazione',
  '/it/guide/come-implementare-vino-al-calice-senza-perdere-margine',
  '/it/guide/come-usare-winerim-senza-sommelier',
  '/it/guide/come-scegliere-selezione-vini-per-scontrino-medio',
  '/it/guide/come-rilevare-cannibalizzazione-vini',
  '/it/guide/come-revisionare-carta-vini-ogni-mese',
  '/it/guide/come-migliorare-rotazione-vini-ristorante',
  '/it/guide/strategia-abbinamento-vino-ristorante',
  // ─── FR ───
  '/fr',
  '/fr/blog',
  '/fr/demo',
  '/fr/contact',
  '/fr/tarifs',
  '/fr/fonctionnalites',
  '/fr/clients',
  '/fr/integrations',
  '/fr/cas-clients',
  '/fr/outils',
  '/fr/guides',
  '/fr/ressources',
  '/fr/solutions',
  '/fr/defis',
  '/fr/sommelier-corner',
  '/fr/affilies',
  '/fr/logiciel-carte-des-vins',
  '/fr/quest-ce-que-winerim',
  '/fr/a-propos',
  '/fr/emploi',
  '/fr/distributeur',
  '/fr/produit/intelligence-dynamique',
  '/fr/produit/winerim-core',
  '/fr/produit/winerim-supply',
  '/fr/confidentialite',
  '/fr/conditions',
  '/fr/benchmarks-playbooks',
  '/fr/barometre-cartes-vins-2026',
  '/fr/comparatifs',
  '/fr/analyse-carte',
  '/fr/calculateur-marge-vin',
  '/fr/implementation',
  '/fr/solutions/groupes-restauration',
  '/fr/solutions/restaurants-gastronomiques',
  '/fr/solutions/bars-a-vin',
  '/fr/solutions/hotels',
  '/fr/solutions/sans-sommelier',
  '/fr/solutions/grande-carte-des-vins',
  '/fr/solutions/carte-en-croissance',
  '/fr/solutions/intelligence-achats',
  '/fr/solutions/augmenter-ticket-moyen',
  '/fr/outils/calculateur-prix-vin-au-verre',
  '/fr/outils/calculateur-stock-mort',
  '/fr/outils/calculateur-ticket-moyen',
  '/fr/outils/calculateur-achat-intelligent',
  '/fr/outils/diagnostic-vin-au-verre',
  '/fr/outils/wine-list-score',
  '/fr/outils/auditeur-carte-multi-sites',
  '/fr/comment-vendre-plus-vin-restaurant',
  '/fr/prix-vin-restaurant',
  '/fr/vin-au-verre-restaurant',
  '/fr/intelligence-artificielle-restaurants',
  '/fr/comment-creer-une-carte-des-vins',
  '/fr/comment-organiser-carte-des-vins',
  '/fr/comment-concevoir-carte-vins-rentable',
  '/fr/carte-papier-vs-digitale',
  '/fr/combien-de-vins-carte-restaurant',
  '/fr/exemples-carte-vins',
  '/fr/problemes/carte-des-vins-ne-vend-pas',
  '/fr/decision-center',
  '/fr/simulateur-carte',
  // FR guides
  '/fr/guides/comment-structurer-carte-vins-groupe-restauration',
  '/fr/guides/comment-fixer-strategie-rentable-vin-au-verre',
  '/fr/guides/comment-detecter-vins-morts',
  '/fr/guides/comment-former-equipe-salle-vendre-vin',
  '/fr/guides/comment-utiliser-donnees-pour-choisir-vins',
  '/fr/guides/comment-connecter-carte-stock-ventes-marge',
  '/fr/guides/comment-gerer-carte-vins-groupes-restauration',
  '/fr/guides/comment-implanter-vin-au-verre-sans-perdre-marge',
  '/fr/guides/comment-utiliser-winerim-sans-sommelier',
  '/fr/guides/comment-choisir-selection-vins-par-ticket-moyen',
  '/fr/guides/comment-detecter-cannibalisation-vins',
  '/fr/guides/comment-reviser-carte-vins-chaque-mois',
  '/fr/guides/comment-ameliorer-rotation-vins-restaurant',
  '/fr/guides/strategie-accords-mets-vins-restaurant',
  // EN secondary (EN also has these at root via aliases above, but also under /en/)
  '/en/ai-wine-software',
  // IT/FR software duplicates already covered above
  '/it/software-carta-vini',
  '/fr/logiciel-carte-des-vins',
  // ─── DE ───
  '/de',
  '/de/blog',
  '/de/demo',
  '/de/kontakt',
  '/de/preise',
  '/de/funktionen',
  '/de/kunden',
  '/de/integrationen',
  '/de/erfolgsgeschichten',
  '/de/tools',
  '/de/ratgeber',
  '/de/ressourcen',
  '/de/loesungen',
  '/de/herausforderungen',
  '/de/sommelier-corner',
  '/de/partner',
  '/de/weinkarten-software',
  '/de/was-ist-winerim',
  '/de/ueber-uns',
  '/de/karriere',
  '/de/haendler',
  '/de/produkt/dynamische-intelligenz',
  '/de/produkt/winerim-core',
  '/de/produkt/winerim-supply',
  '/de/datenschutz',
  '/de/agb',
  '/de/benchmarks-playbooks',
  '/de/weinkarten-barometer-2026',
  '/de/vergleiche',
  '/de/weinkarten-analyse',
  '/de/wein-margen-rechner',
  '/de/implementierung',
  '/de/loesungen/restaurant-gruppen',
  '/de/loesungen/fine-dining',
  '/de/loesungen/weinbars',
  '/de/loesungen/hotels',
  '/de/loesungen/ohne-sommelier',
  '/de/loesungen/grosse-weinkarte',
  '/de/loesungen/wachsende-weinkarte',
  '/de/loesungen/einkaufsintelligenz',
  '/de/loesungen/durchschnittsbon-erhoehen',
  '/de/tools/glaspreis-rechner',
  '/de/tools/totbestand-rechner',
  '/de/tools/durchschnittsbon-rechner',
  '/de/tools/intelligenter-einkauf-rechner',
  '/de/tools/glasausschank-diagnose',
  '/de/tools/wine-list-score',
  '/de/tools/multi-standort-auditor',
  '/de/weinkarten-analyzer',
  '/de/wein-roi-rechner',
  '/de/weinbegleitung-generator',
  '/de/wein-pricing-tool',
  '/de/weinkarten-benchmark',
  '/de/wie-man-mehr-wein-im-restaurant-verkauft',
  '/de/weinpreise-im-restaurant',
  '/de/wein-im-glas-restaurant',
  '/de/kuenstliche-intelligenz-restaurants',
  '/de/weinkarten-beispiele',
  '/de/wie-viele-weine-auf-der-restaurantkarte',
  '/de/probleme/weinkarte-verkauft-nicht',
  '/de/decision-center',
  '/de/weinkarten-simulator',
  '/de/ratgeber/weinkarte-restaurantgruppe-strukturieren',
  '/de/ratgeber/rentable-glasausschank-strategie',
  '/de/ratgeber/totbestand-weine-erkennen',
  '/de/ratgeber/service-team-wein-verkaufen-trainieren',
  '/de/ratgeber/daten-nutzen-weinkauf-entscheiden',
  '/de/ratgeber/weinkarte-bestand-verkauf-marge-verbinden',
  '/de/ratgeber/weinkarten-restaurantgruppen-verwalten',
  '/de/ratgeber/glasausschank-ohne-margenverlust',
  '/de/ratgeber/winerim-ohne-sommelier-nutzen',
  '/de/ratgeber/weinauswahl-nach-durchschnittsbon',
  '/de/ratgeber/wein-kannibalisierung-erkennen',
  '/de/ratgeber/weinkarte-monatlich-ueberpruefen',
  '/de/ratgeber/weinrotation-im-restaurant-verbessern',
  '/de/ratgeber/speisen-wein-kombinationsstrategie-restaurant',
  // ─── PT ───
  '/pt',
  '/pt/blog',
  '/pt/demo',
  '/pt/contacto',
  '/pt/precos',
  '/pt/funcionalidades',
  '/pt/clientes',
  '/pt/integracoes',
  '/pt/casos-de-sucesso',
  '/pt/ferramentas',
  '/pt/guias',
  '/pt/recursos',
  '/pt/solucoes',
  '/pt/desafios',
  '/pt/sommelier-corner',
  '/pt/afiliados',
  '/pt/software-carta-vinhos',
  '/pt/o-que-e-winerim',
  '/pt/sobre-nos',
  '/pt/carreiras',
  '/pt/distribuidor',
  '/pt/produto/inteligencia-dinamica',
  '/pt/produto/winerim-core',
  '/pt/produto/winerim-supply',
  '/pt/privacidade',
  '/pt/termos',
  '/pt/benchmarks-playbooks',
  '/pt/barometro-cartas-vinhos-2026',
  '/pt/comparativos',
  '/pt/analise-carta',
  '/pt/calculadora-margem-vinho',
  '/pt/implementacao',
  '/pt/solucoes/grupos-restauracao',
  '/pt/solucoes/restaurantes-gastronomicos',
  '/pt/solucoes/wine-bars',
  '/pt/solucoes/hoteis',
  '/pt/solucoes/sem-sommelier',
  '/pt/solucoes/carta-vinhos-extensa',
  '/pt/solucoes/carta-vinhos-crescimento',
  '/pt/solucoes/inteligencia-compras',
  '/pt/solucoes/aumentar-ticket-medio',
  '/pt/ferramentas/calculadora-preco-vinho-por-copo',
  '/pt/ferramentas/calculadora-stock-morto',
  '/pt/ferramentas/calculadora-ticket-medio',
  '/pt/ferramentas/calculadora-compra-inteligente',
  '/pt/ferramentas/diagnostico-vinho-por-copo',
  '/pt/ferramentas/wine-list-score',
  '/pt/ferramentas/auditor-carta-multilocal',
  '/pt/analisador-carta-vinhos',
  '/pt/calculadora-roi-vinhos',
  '/pt/gerador-harmonizacoes-ia',
  '/pt/ferramenta-pricing-vinhos',
  '/pt/benchmark-carta-vinhos',
  '/pt/como-vender-mais-vinho-restaurante',
  '/pt/preco-vinho-restaurante',
  '/pt/vinho-por-copo-restaurante',
  '/pt/inteligencia-artificial-restaurantes',
  '/pt/exemplos-carta-vinhos',
  '/pt/quantos-vinhos-carta-restaurante',
  '/pt/problemas/carta-vinhos-nao-vende',
  '/pt/decision-center',
  '/pt/simulador-carta',
  '/pt/guias/como-estruturar-carta-vinhos-grupo-restauracao',
  '/pt/guias/estrategia-rentavel-vinho-por-copo',
  '/pt/guias/como-detectar-vinhos-mortos',
  '/pt/guias/como-formar-equipa-sala-vender-vinho',
  '/pt/guias/como-usar-dados-para-decidir-que-vinhos-comprar',
  '/pt/guias/como-conectar-carta-stock-vendas-margem',
  '/pt/guias/como-gerir-carta-vinhos-grupos-restauracao',
  '/pt/guias/como-implementar-vinho-por-copo-sem-perder-margem',
  '/pt/guias/como-usar-winerim-sem-sommelier',
  '/pt/guias/como-escolher-selecao-vinhos-por-ticket-medio',
  '/pt/guias/como-detectar-canibalizacao-vinhos',
  '/pt/guias/como-rever-carta-vinhos-todos-meses',
  '/pt/guias/como-melhorar-rotacao-vinhos-restaurante',
  '/pt/guias/estrategia-harmonizacao-vinhos-restaurante',
]);

// ─── SPA EXACT routes (utility, work on refresh, most are noindex) ───
const SPA_EXACT = new Set([
  '/faqs',
  '/gracias',
  '/unsubscribe',
  '/decision-center',
  // EN tools that exist at root (before alias redirect)
  '/wine-list-analyzer',
  '/wine-roi-calculator',
  '/wine-pairing-generator',
  '/wine-pricing-tool',
  '/wine-list-benchmark',
  // These also exist as EN root
  '/wine-list-management-software',
  '/what-is-winerim',
  '/ai-wine-software',
  '/en/digital-wine-list',
]);

// ─── SPA PREFIX routes (dynamic children) ───
const SPA_PREFIXES = [
  '/biblioteca-vino/',
  '/en/wine-library/',
  '/it/biblioteca-vino/',
  '/fr/bibliotheque-vin/',
  '/de/weinbibliothek/',
  '/pt/biblioteca-vinho/',
  '/article/',
  '/recursos/',
  '/comparativa/',
  '/benchmarks-playbooks/',
  '/decision-center/',
  '/en/comparisons/',
  '/en/resources/',
  '/en/article/',
  '/en/decision-center/',
  '/en/benchmarks-playbooks/',
  '/it/confronti/',
  '/it/risorse/',
  '/it/article/',
  '/it/decision-center/',
  '/it/benchmarks-playbooks/',
  '/fr/comparatifs/',
  '/fr/ressources/',
  '/fr/article/',
  '/fr/decision-center/',
  '/fr/benchmarks-playbooks/',
  // Resources localized
  '/en/resources/',
  '/it/risorse/',
  '/fr/ressources/',
  // Guides children (already exact but just in case)
  '/en/guides/',
  '/it/guide/',
  '/fr/guides/',
  '/guias/',
  // DE
  '/de/vergleiche/',
  '/de/ressourcen/',
  '/de/article/',
  '/de/decision-center/',
  '/de/benchmarks-playbooks/',
  '/de/ratgeber/',
  // PT
  '/pt/comparativos/',
  '/pt/recursos/',
  '/pt/article/',
  '/pt/decision-center/',
  '/pt/benchmarks-playbooks/',
  '/pt/guias/',
];

// Localized SPA fallback trees that must reach the React router on origin
const LOCALIZED_SPA_FALLBACK_PREFIXES = [
  '/de/',
  '/pt/',
];

// ─── SEO WILDCARD prefixes (programmatic SEO pages) ───
const SEO_WILDCARD_PREFIXES = [
  '/software-carta-de-vinos-',   // ES city pages
  '/software-vino-',              // ES cuisine city pages
  '/wine-list-software-',         // EN city pages
  '/software-carta-dei-vini-',    // IT city pages
  '/logiciel-carte-des-vins-',    // FR city pages
  '/weinkarten-software-',        // DE city pages
  '/software-carta-de-vinhos-',   // PT city pages
];

// ─── PRIVATE routes (proxy but noindex) ───
const PRIVATE_ROUTES = new Set([
  '/admin',
  '/admin/login',
]);

// ─── Static file extensions ───
const STATIC_EXT = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif|map|json|webmanifest|txt)$/i;

// ─── Helpers ───
function isBot(ua) { return BOT_REGEX.test(ua || ''); }
function isLegacyUrl(path) {
  if (LEGACY_EXACT.has(path)) return true;
  return LEGACY_PREFIXES.some(p => path.startsWith(p));
}
function isKnownRoute(path) {
  // Exact SEO
  if (SEO_EXACT.has(path)) return true;
  // Exact SPA
  if (SPA_EXACT.has(path)) return true;
  // Private
  if (PRIVATE_ROUTES.has(path)) return true;
  // Noindex utility
  if (NOINDEX_ROUTES.has(path)) return true;
  // SPA prefix
  if (SPA_PREFIXES.some(p => path.startsWith(p))) return true;
  // Localized SPA fallback trees
  if (LOCALIZED_SPA_FALLBACK_PREFIXES.some(p => path.startsWith(p))) return true;
  // SEO wildcard
  if (SEO_WILDCARD_PREFIXES.some(p => path.startsWith(p))) return true;
  return false;
}

function getXRobotsTag(path) {
  if (NOINDEX_ROUTES.has(path)) return 'noindex, follow';
  if (PRIVATE_ROUTES.has(path)) return 'noindex, nofollow';
  return null; // let the page handle it
}

// ─── Proxy to origin ───
async function proxyToOrigin(request, env, path, search, extraHeaders = {}) {
  const originUrl = new URL(path + search, env.ORIGIN);
  const headers = new Headers(request.headers);
  headers.set('Host', new URL(env.ORIGIN).host);
  const res = await fetch(originUrl, { method: request.method, headers });
  const response = new Response(res.body, res);
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  for (const [k, v] of Object.entries(extraHeaders)) {
    response.headers.set(k, v);
  }
  return response;
}

// ─── Main handler ───
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    const ua = request.headers.get('User-Agent') || '';

    // ── 0. Static assets → pass through to origin directly ──
    if (STATIC_EXT.test(path)) {
      return proxyToOrigin(request, env, path, url.search, {
        'X-Worker-Branch': 'static',
      });
    }

    // ── 1. Technical routes ──
    if (path === '/_worker-health') {
      return new Response('OK', {
        status: 200,
        headers: { 'Content-Type': 'text/plain', 'X-Worker-Branch': 'health' },
      });
    }
    if (path === '/~api/analytics') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex',
          'X-Worker-Branch': 'analytics-noop',
        },
      });
    }
    if (path === '/google0be715f4ef205b3d.html') {
      return new Response('google-site-verification: google0be715f4ef205b3d.html', {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Robots-Tag': 'noindex',
          'X-Worker-Branch': 'gsc-verification',
        },
      });
    }
    if (path === '/robots.txt') {
      return proxyToOrigin(request, env, path, '', {
        'X-Worker-Branch': 'robots',
        'Cache-Control': 'public, max-age=3600',
      });
    }
    if (path === '/sitemap.xml') {
      try {
        const sitemapUrl = env.PRERENDER_URL.replace('/prerender', '/sitemap');
        const res = await fetch(sitemapUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
          },
        });
        const sitemapXml = injectWorkerDetailUrlsIntoSitemap(
          await res.text(),
          env.SITE_URL || 'https://winerim.wine',
        );
        return new Response(sitemapXml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Robots-Tag': 'index, follow',
            'X-Worker-Branch': 'sitemap-worker-detail-bridge',
          },
        });
      } catch (e) {
        return new Response('Sitemap error', { status: 502, headers: { 'X-Worker-Branch': 'sitemap-error' } });
      }
    }

    // ── 2. Direct legacy redirects from Search Console samples ──
    const directLegacyTarget = getDirectLegacyTarget(path);
    if (directLegacyTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${directLegacyTarget}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'direct-legacy-redirect',
        },
      });
    }

    // ── 2. Trailing slash normalization (not root) ──
    if (path.length > 1 && path.endsWith('/')) {
      const clean = path.slice(0, -1);
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${clean}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'trailing-slash',
        },
      });
    }

    // ── 3. Uppercase normalization ──
    if (path !== path.toLowerCase()) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${path.toLowerCase()}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'lowercase',
        },
      });
    }

    const malformedAbsoluteTarget = getMalformedAbsolutePathTarget(path);
    if (malformedAbsoluteTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${malformedAbsoluteTarget}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'malformed-absolute-url-redirect',
        },
      });
    }

    const legacyLanguageQueryTarget = getLegacyLanguageQueryTarget(url);
    if (legacyLanguageQueryTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${legacyLanguageQueryTarget}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'legacy-language-query-redirect',
        },
      });
    }

    const legacyLocalizedArticleTarget = getLegacyLocalizedArticleTarget(path);
    if (legacyLocalizedArticleTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${legacyLocalizedArticleTarget}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'legacy-localized-article-redirect',
        },
      });
    }

    const localizedArticleCanonicalTarget = getLocalizedArticleCanonicalTarget(path);
    if (localizedArticleCanonicalTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${localizedArticleCanonicalTarget}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'localized-article-canonical-redirect',
        },
      });
    }

    if (LEGACY_GONE_PATHS.has(path)) {
      return new Response('Gone', {
        status: 410,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'legacy-gone',
        },
      });
    }

    const wineLibraryLegacyTarget = getWineLibraryLegacyShortcutTarget(path);
    if (wineLibraryLegacyTarget) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${wineLibraryLegacyTarget}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'wine-library-legacy-redirect',
        },
      });
    }

    if (path === '/' && url.searchParams.has('p')) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}/blog`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'wordpress-query-redirect',
        },
      });
    }

    // ── 5. Legacy WordPress URLs → redirects function ──
    if (isLegacyUrl(path)) {
      try {
        const res = await fetch(`${env.REDIRECTS_URL}?path=${encodeURIComponent(path)}`, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
          },
        });
        const data = await res.json();
        if (data.status === 301 && data.location) {
          return new Response(null, {
            status: 301,
            headers: {
              'Location': data.location,
              'Cache-Control': 'public, max-age=31536000',
              'X-Worker-Branch': 'legacy-redirect',
            },
          });
        }
        if (data.status === 410) {
          return new Response('Gone', {
            status: 410,
            headers: { 'Content-Type': 'text/plain', 'X-Worker-Branch': 'legacy-gone' },
          });
        }
      } catch (e) {
        console.error('Redirects error:', e);
      }
      // Fallback: 404 for unresolved legacy
      return new Response('Not Found', { status: 404, headers: { 'X-Worker-Branch': 'legacy-404' } });
    }

    // ── 5. SEO aliases → 301 ──
    if (SEO_ALIASES[path]) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${SEO_ALIASES[path]}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'alias-redirect',
        },
      });
    }

    // ── 6. Check if known route ──
    if (!isKnownRoute(path)) {
      // REAL 404 — not a known route
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'X-Worker-Branch': 'not-found',
          'X-Robots-Tag': 'noindex',
        },
      });
    }

    // ── 7. Bot traffic → prerender ──
    if (isBot(ua)) {
      const workerStaticHtml = renderWorkerStaticPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerStaticHtml) {
        return new Response(workerStaticHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'X-Prerendered': 'true',
            'X-Worker-Branch': 'worker-static-prerender',
          },
        });
      }

      const workerDetailHtml = renderWorkerDetailPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerDetailHtml) {
        return new Response(workerDetailHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'X-Prerendered': 'true',
            'X-Worker-Branch': 'worker-detail-prerender',
          },
        });
      }

      try {
        const prerenderUrl = `${env.PRERENDER_URL}?path=${encodeURIComponent(path)}`;
        const res = await fetch(prerenderUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
            'User-Agent': ua,
          },
        });
        const ct = res.headers.get('Content-Type') || '';
        const html = await res.text();
        const looksLikeHtml = /^\s*(?:<!doctype html|<html\b)/i.test(html);
        if (ct.includes('text/html') || looksLikeHtml) {
          const robotsTag = getXRobotsTag(path);
          const headers = {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'X-Prerendered': 'true',
            'X-Worker-Branch': 'bot-prerender',
          };
          if (robotsTag) headers['X-Robots-Tag'] = robotsTag;
          return new Response(html, { status: 200, headers });
        }
      } catch (e) {
        console.error('Prerender error:', e);
      }
      // Fallback: serve SPA shell to bot
    }

    // ── 8. Proxy to SPA origin ──
    const robotsTag = getXRobotsTag(path);
    const extra = { 'X-Worker-Branch': isBot(ua) ? 'bot-fallback' : 'spa' };
    if (robotsTag) extra['X-Robots-Tag'] = robotsTag;
    return proxyToOrigin(request, env, path, url.search, extra);
  },
};
