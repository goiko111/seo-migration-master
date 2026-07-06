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
  '/biblioteca-vino/como-empezar': '/aprender-vino',
  '/en/wine-library/how-to-start': '/en/learn-wine',
  '/it/biblioteca-vino/iniziare': '/it/imparare-il-vino',
  '/fr/bibliotheque-vin/debuter': '/fr/apprendre-le-vin',
  '/de/weinbibliothek/einsteigen': '/de/wein-lernen',
  '/pt/biblioteca-vinho/como-comecar': '/pt/aprender-vinho',
  // Spanish aliases for English-slug tools
  '/herramientas/puntuacion-carta-vinos': '/herramientas/wine-list-score',
};

// ─── High-confidence legacy URLs surfaced by Search Console ───
const LEGACY_DIRECT_REDIRECTS = {
  '/privacy-policy': '/politica-privacidad',
  '/terms-of-service': '/terminos-y-condiciones-del-contrato',
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
  '/condiciones-de-servicio-2': '/terminos-y-condiciones-del-contrato',
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

const PRESENTATION_ALTERNATES = {
  es: '/presentacion',
  en: '/en/presentation',
  it: '/it/presentazione',
  fr: '/fr/presentation',
  de: '/de/praesentation',
  pt: '/pt/apresentacao',
  'x-default': '/presentacion',
};

const LEARN_WINE_ALTERNATES = {
  es: '/aprender-vino',
  en: '/en/learn-wine',
  it: '/it/imparare-il-vino',
  fr: '/fr/apprendre-le-vin',
  de: '/de/wein-lernen',
  pt: '/pt/aprender-vinho',
  'x-default': '/aprender-vino',
};

const WORKER_LINK_RELEASES = {
  '/article/recomendar-vino-por-estilos-restaurante': '2026-07-13T09:00:00+02:00',
  '/en/article/recommend-wine-by-style-restaurant': '2026-07-13T09:05:00+02:00',
  '/it/article/raccomandare-vino-per-stile-ristorante': '2026-07-13T09:10:00+02:00',
  '/fr/article/recommander-vin-par-style-restaurant': '2026-07-13T09:15:00+02:00',
  '/de/article/wein-nach-stil-empfehlen-restaurant': '2026-07-13T09:20:00+02:00',
  '/pt/article/recomendar-vinho-por-estilos-restaurante': '2026-07-13T09:25:00+02:00',
};

function isWorkerLinkVisible(url) {
  const releaseAt = WORKER_LINK_RELEASES[url];
  return !releaseAt || Date.now() >= Date.parse(releaseAt);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripUnreleasedSitemapUrls(xml, site) {
  let nextXml = xml;
  for (const [url, releaseAt] of Object.entries(WORKER_LINK_RELEASES)) {
    if (Date.now() >= Date.parse(releaseAt)) continue;
    const loc = `${site}${url}`;
    const blockPattern = new RegExp(
      `\\s*<url>(?:(?!</url>)[\\s\\S])*?<loc>${escapeRegExp(loc)}</loc>(?:(?!</url>)[\\s\\S])*?</url>`,
      'g',
    );
    nextXml = nextXml.replace(blockPattern, '');
  }
  return nextXml;
}

function unreleasedArticleResponse() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Robots-Tag': 'noindex, follow',
      'X-Worker-Branch': 'future-article-not-found',
    },
  });
}

const DISTRIBUTOR_ALTERNATES = {
  es: '/distribuidor',
  en: '/en/distributor',
  it: '/it/distributore',
  fr: '/fr/distributeur',
  de: '/de/haendler',
  pt: '/pt/distribuidor',
  'x-default': '/distribuidor',
};

const CLOUDRIM_ALTERNATES = {
  es: '/producto/cloudrim',
  en: '/en/product/cloudrim',
  it: '/it/prodotto/cloudrim',
  fr: '/fr/produit/cloudrim',
  de: '/de/produkt/cloudrim',
  pt: '/pt/produto/cloudrim',
  'x-default': '/producto/cloudrim',
};

const SAVIA_ALTERNATES = {
  es: '/producto/savia',
  en: '/en/product/savia',
  it: '/it/prodotto/savia',
  fr: '/fr/produit/savia',
  de: '/de/produkt/savia',
  pt: '/pt/produto/savia',
  'x-default': '/producto/savia',
};

const CLOUDRIM_WORKER_PAGES = Object.fromEntries([
  {
    path: '/producto/cloudrim',
    lang: 'es',
    title: 'CloudRIM | Nube documental operativa para restaurantes',
    description: 'CloudRIM recoge cartas, ventas, albaranes, facturas, stock, reportes TPV y tarifas de distribuidores, distingue el tipo documental, prepara conciliacion albaran-factura y enruta todo dentro de Winerim.',
    h1: 'La nube donde tu restaurante deja los documentos y Winerim hace el trabajo pesado',
    subtitle: 'CloudRIM centraliza documentos y datos dispersos para convertirlos en informacion operativa dentro de Winerim.',
    sections: [
      ['El problema', 'Cartas, albaranes, facturas, tarifas, stock y ventas suelen vivir en canales distintos. CloudRIM permite que entren en Winerim sin multiplicar trabajo manual.'],
      ['Como funciona', 'El restaurante sube o conecta documentos por portal, email, carpeta compartida, FTP/SFTP, API, TPV o proveedor. CloudRIM identifica el origen y enruta cada archivo.'],
      ['Que recoge', 'Cartas de vino, ventas, albaranes, facturas, stock, reportes TPV y tarifas de distribuidores, incluso cuando llegan en formatos diferentes.'],
      ['Conciliacion albaran-factura', 'Cuando detecta una factura o albaran, Winerim compara proveedor, lineas, cantidades, precios y totales antes de actualizar costes, stock o margenes. Si algo no cuadra, queda en revision humana.'],
      ['Que gana el restaurante', 'Menos administracion manual, menos errores de copia, costes y stock mas actualizados, margenes mas claros y mejores datos para Winerim Core, Winerim Supply y SAVia.'],
      ['Decision conectada', 'CloudRIM convierte documentos dispersos en senales trazables para compras, reposicion, pricing, RIMs, alertas de margen y conversaciones con SAVia.'],
    ],
    links: [['SAVia', '/producto/savia'], ['Integraciones', '/integraciones'], ['Winerim Supply', '/producto/winerim-supply'], ['Demo', '/demo']],
  },
  {
    path: '/en/product/cloudrim',
    lang: 'en',
    title: 'CloudRIM | Operational Document Cloud for Restaurants',
    description: 'CloudRIM collects wine lists, sales, delivery notes, invoices, stock, POS reports and distributor tariffs, identifies document type, prepares delivery-note-to-invoice reconciliation and routes everything inside Winerim.',
    h1: 'The operational cloud where your restaurant drops documents and Winerim does the heavy work',
    subtitle: 'CloudRIM centralises scattered documents and data so they become usable operational inputs inside Winerim.',
    sections: [
      ['The problem', 'Wine lists, delivery notes, invoices, tariffs, stock and sales often live in different channels. CloudRIM brings them into Winerim without adding manual work.'],
      ['How it works', 'The restaurant uploads or connects documents through a portal, email, shared folder, FTP/SFTP, API, POS or supplier. CloudRIM identifies the source and routes each file.'],
      ['What it collects', 'Wine lists, sales, delivery notes, invoices, stock, POS reports and distributor tariffs, even when formats and channels differ.'],
      ['Delivery-note-to-invoice reconciliation', 'When CloudRIM detects an invoice or delivery note, Winerim compares supplier, lines, quantities, prices and totals before costs, stock or margins are updated. If something does not match, it stays under human review.'],
      ['What the restaurant gains', 'Less manual administration, fewer copy-paste errors, updated costs and stock, clearer margins and better data for Winerim Core, Winerim Supply and SAVia.'],
      ['Connected decision layer', 'CloudRIM turns scattered documents into traceable signals for purchasing, replenishment, pricing, RIMs, margin alerts and SAVia conversations.'],
    ],
    links: [['SAVia', '/en/product/savia'], ['Integrations', '/en/integrations'], ['Winerim Supply', '/en/product/winerim-supply'], ['Demo', '/en/demo']],
  },
  {
    path: '/it/prodotto/cloudrim',
    lang: 'it',
    title: 'CloudRIM | Nube documentale operativa per ristoranti',
    description: 'CloudRIM raccoglie carte vini, vendite, bolle, fatture, stock, report POS e tariffe dei distributori, riconosce il tipo di documento, prepara riconciliazione bolla-fattura e instrada tutto dentro Winerim.',
    h1: 'La nube operativa dove il ristorante lascia i documenti e Winerim fa il lavoro pesante',
    subtitle: 'CloudRIM centralizza documenti e dati dispersi per trasformarli in input operativi dentro Winerim.',
    sections: [
      ['Il problema', 'Carta, bolle, fatture, listini, stock e vendite arrivano da canali diversi. CloudRIM li porta in Winerim senza aggiungere lavoro manuale.'],
      ['Come funziona', 'Il ristorante carica o collega documenti tramite portale, email, cartella condivisa, FTP/SFTP, API, POS o fornitore. CloudRIM riconosce origine e tipo, poi instrada ogni file.'],
      ['Cosa raccoglie', 'Carte vini, vendite, bolle, fatture, stock, report POS e listini distributori anche con formati diversi.'],
      ['Riconciliazione bolla-fattura', 'Quando rileva una fattura o una bolla, Winerim confronta fornitore, righe, quantita, prezzi e totali prima di aggiornare costi, stock o margini. Se qualcosa non torna, resta in revisione umana.'],
      ['Cosa guadagna il ristorante', 'Meno amministrazione manuale, meno errori, costi e stock piu aggiornati, margini piu chiari e dati migliori per Winerim Core, Winerim Supply e SAVia.'],
      ['Decisione connessa', 'CloudRIM trasforma documenti dispersi in segnali tracciabili per acquisti, riordino, pricing, RIM, avvisi di margine e conversazioni con SAVia.'],
    ],
    links: [['SAVia', '/it/prodotto/savia'], ['Integrazioni', '/it/integrazioni'], ['Winerim Supply', '/it/prodotto/winerim-supply'], ['Demo', '/it/demo']],
  },
  {
    path: '/fr/produit/cloudrim',
    lang: 'fr',
    title: 'CloudRIM | Nuage documentaire operationnel pour restaurants',
    description: 'CloudRIM collecte cartes, ventes, bons de livraison, factures, stock, rapports POS et tarifs distributeurs, reconnait le type documentaire, prepare le rapprochement bon-facture et route tout dans Winerim.',
    h1: 'Le nuage operationnel ou le restaurant depose ses documents et Winerim fait le travail lourd',
    subtitle: 'CloudRIM centralise documents et donnees disperses pour les transformer en entrees operationnelles dans Winerim.',
    sections: [
      ['Le probleme', 'Carte, bons, factures, tarifs, stock et ventes arrivent par des canaux differents. CloudRIM les fait entrer dans Winerim sans ajouter du travail manuel.'],
      ['Comment ca fonctionne', 'Le restaurant envoie ou connecte les documents via portail, email, dossier partage, FTP/SFTP, API, POS ou fournisseur. CloudRIM reconnait la source et route chaque fichier.'],
      ['Ce qui est collecte', 'Cartes des vins, ventes, bons, factures, stock, rapports POS et tarifs distributeurs, meme avec des formats differents.'],
      ['Rapprochement bon-facture', 'Quand CloudRIM detecte une facture ou un bon, Winerim compare fournisseur, lignes, quantites, prix et totaux avant de modifier couts, stock ou marges. En cas d ecart, le document reste en validation humaine.'],
      ['Ce que gagne le restaurant', 'Moins d administration manuelle, moins d erreurs, couts et stocks plus a jour, marges plus lisibles et meilleures donnees pour Winerim Core, Winerim Supply et SAVia.'],
      ['Decision connectee', 'CloudRIM transforme les documents disperses en signaux tracables pour achats, reassort, pricing, RIM, alertes de marge et conversations avec SAVia.'],
    ],
    links: [['SAVia', '/fr/produit/savia'], ['Integrations', '/fr/integrations'], ['Winerim Supply', '/fr/produit/winerim-supply'], ['Demo', '/fr/demo']],
  },
  {
    path: '/de/produkt/cloudrim',
    lang: 'de',
    title: 'CloudRIM | Operative Dokumenten-Cloud fuer Restaurants',
    description: 'CloudRIM sammelt Weinkarten, Verkaeufe, Lieferscheine, Rechnungen, Bestand, POS-Reports und Lieferantentarife, erkennt Dokumenttypen, bereitet den Abgleich Lieferschein-Rechnung vor und routet alles in Winerim.',
    h1: 'Die operative Cloud, in der das Restaurant Dokumente ablegt und Winerim die schwere Arbeit uebernimmt',
    subtitle: 'CloudRIM zentralisiert verstreute Dokumente und Daten, damit sie in Winerim operativ nutzbar werden.',
    sections: [
      ['Das Problem', 'Karte, Lieferscheine, Rechnungen, Tarife, Bestand und Verkauf liegen oft in getrennten Kanaelen. CloudRIM bringt sie ohne zusaetzliche Handarbeit in Winerim.'],
      ['So funktioniert es', 'Das Restaurant laedt Dokumente hoch oder verbindet Portal, E-Mail, geteilte Ordner, FTP/SFTP, API, POS oder Lieferanten. CloudRIM erkennt Quelle und Typ und routet jede Datei.'],
      ['Was gesammelt wird', 'Weinkarten, Verkaeufe, Lieferscheine, Rechnungen, Bestand, POS-Reports und Lieferantentarife, auch bei unterschiedlichen Formaten.'],
      ['Abgleich Lieferschein-Rechnung', 'Wenn CloudRIM eine Rechnung oder einen Lieferschein erkennt, vergleicht Winerim Lieferant, Positionen, Mengen, Preise und Summen, bevor Kosten, Bestand oder Margen geaendert werden. Abweichungen bleiben in menschlicher Pruefung.'],
      ['Was das Restaurant gewinnt', 'Weniger manuelle Verwaltung, weniger Fehler, aktuellere Kosten und Bestaende, klarere Margen und bessere Daten fuer Winerim Core, Winerim Supply und SAVia.'],
      ['Verbundene Entscheidungsebene', 'CloudRIM macht aus verstreuten Dokumenten nachvollziehbare Signale fuer Einkauf, Nachschub, Pricing, RIMs, Margenalarme und SAVia-Gespraeche.'],
    ],
    links: [['SAVia', '/de/produkt/savia'], ['Integrationen', '/de/integrationen'], ['Winerim Supply', '/de/produkt/winerim-supply'], ['Demo', '/de/demo']],
  },
  {
    path: '/pt/produto/cloudrim',
    lang: 'pt',
    title: 'CloudRIM | Nuvem documental operacional para restaurantes',
    description: 'CloudRIM recolhe cartas, vendas, guias, faturas, stock, relatorios POS e tabelas de distribuidores, deteta o tipo documental, prepara conciliacao guia-fatura e encaminha tudo dentro da Winerim.',
    h1: 'A nuvem operacional onde o restaurante deixa documentos e a Winerim faz o trabalho pesado',
    subtitle: 'CloudRIM centraliza documentos e dados dispersos para os transformar em informacao operacional dentro da Winerim.',
    sections: [
      ['O problema', 'Carta, guias, faturas, tabelas, stock e vendas vivem em canais diferentes. CloudRIM faz entrar tudo na Winerim sem criar mais trabalho manual.'],
      ['Como funciona', 'O restaurante carrega ou liga documentos por portal, email, pasta partilhada, FTP/SFTP, API, POS ou fornecedor. CloudRIM identifica origem e tipo e encaminha cada ficheiro.'],
      ['O que recolhe', 'Cartas de vinho, vendas, guias, faturas, stock, relatorios POS e tabelas de distribuidores mesmo com formatos diferentes.'],
      ['Conciliacao guia-fatura', 'Quando deteta uma fatura ou guia, a Winerim compara fornecedor, linhas, quantidades, precos e totais antes de atualizar custos, stock ou margens. Se algo nao bate certo, fica em revisao humana.'],
      ['O que ganha o restaurante', 'Menos administracao manual, menos erros, custos e stock mais atualizados, margens mais claras e melhores dados para Winerim Core, Winerim Supply e SAVia.'],
      ['Camada de decisao ligada', 'CloudRIM transforma documentos dispersos em sinais rastreaveis para compras, reposicao, pricing, RIMs, alertas de margem e conversas com SAVia.'],
    ],
    links: [['SAVia', '/pt/produto/savia'], ['Integracoes', '/pt/integracoes'], ['Winerim Supply', '/pt/produto/winerim-supply'], ['Demo', '/pt/demo']],
  },
].map(page => [page.path, { ...page, canonical: page.path, schemaType: 'SoftwareApplication', alternates: CLOUDRIM_ALTERNATES }]));

const SAVIA_WORKER_PAGES = Object.fromEntries([
  {
    path: '/producto/savia',
    lang: 'es',
    title: 'SAVia | Agente conversacional para carta, stock y margenes',
    description: 'SAVia es el agente conversacional de Winerim para preguntar sobre carta, ventas, stock, costes, margenes, facturas, albaranes, RIMs y oportunidades. Explica datos y prepara acciones sin ejecutar cambios criticos sin aprobacion humana.',
    h1: 'Pregunta a tu bodega. SAVia responde con datos de Winerim.',
    subtitle: 'SAVia ayuda a interpretar carta, ventas, stock, costes, margenes, albaranes, facturas, RIMs y oportunidades sin perderse en dashboards.',
    sections: [
      ['Por que existe', 'Los dashboards muestran datos. SAVia ayuda a interpretarlos, conectar senales y preparar decisiones en lenguaje natural.'],
      ['Que puedes preguntar', 'Que vinos inmovilizan capital, que referencias han perdido margen, que conviene impulsar, que factura no cuadra con su albaran o que RIM preparar antes de aprobar.'],
      ['Preview antes de actuar', 'SAVia puede resumir impacto previsto en stock, coste, margen, rotacion, precio y carta antes de que el equipo decida aplicar un cambio.'],
      ['Aprobacion humana', 'SAVia consulta, explica, resume y prepara acciones, pero no cambia stock, PVP, costes, albaranes, facturas, RIMs o referencias sin aprobacion humana.'],
      ['Contexto conectado', 'SAVia trabaja con carta, ventas, stock, costes, albaranes, facturas, tarifas y documentos procesados por CloudRIM.'],
      ['Para quien ayuda', 'Direccion, sumiller, compras y sala pueden hacer preguntas distintas sobre la misma realidad operativa y recibir una respuesta trazable.'],
    ],
    links: [['CloudRIM', '/producto/cloudrim'], ['Inteligencia dinamica', '/producto/inteligencia-dinamica'], ['Winerim Core', '/producto/winerim-core'], ['Demo', '/demo']],
  },
  {
    path: '/en/product/savia',
    lang: 'en',
    title: 'SAVia | Conversational Agent for Wine List, Stock and Margins',
    description: 'SAVia is Winerim conversational intelligence for asking about wine list, sales, stock, costs, margins, invoices, delivery notes, RIMs and opportunities. It explains data and prepares actions without executing critical changes without human approval.',
    h1: 'Ask your cellar. SAVia answers with Winerim data.',
    subtitle: 'SAVia helps teams understand wine list, sales, stock, costs, margins, invoices, delivery notes, RIMs and opportunities without digging through dashboards.',
    sections: [
      ['Why it exists', 'Dashboards show data. SAVia helps interpret it, connect signals and prepare decisions in everyday language.'],
      ['What you can ask', 'Which wines tie up capital, which references lost margin, what to push, which invoice does not match its delivery note or which RIM to prepare before approval.'],
      ['Preview before action', 'SAVia can summarize the expected impact on stock, cost, margin, rotation, price and the wine list before the team decides to apply a change.'],
      ['Human approval', 'SAVia can consult, explain, summarize and prepare actions, but it does not change stock, prices, costs, delivery notes, invoices, RIMs or references without human approval.'],
      ['Connected context', 'SAVia works with wine list, sales, stock, costs, delivery notes, invoices, tariffs and documents processed by CloudRIM.'],
      ['Who it helps', 'Owners, sommeliers, purchasing and floor teams can ask different questions about the same operation and receive a traceable answer.'],
    ],
    links: [['CloudRIM', '/en/product/cloudrim'], ['Dynamic intelligence', '/en/product/dynamic-intelligence'], ['Winerim Core', '/en/product/winerim-core'], ['Demo', '/en/demo']],
  },
  {
    path: '/it/prodotto/savia',
    lang: 'it',
    title: 'SAVia | Agente conversazionale per carta vini, stock e margini',
    description: 'SAVia e l agente conversazionale di Winerim per interrogare carta, vendite, stock, costi, margini, fatture, bolle, RIM e opportunita. Spiega dati e prepara azioni senza eseguire cambi critici senza approvazione umana.',
    h1: 'Chiedi alla tua cantina. SAVia risponde con i dati Winerim.',
    subtitle: 'SAVia aiuta a interpretare carta, vendite, stock, costi, margini, fatture, bolle, RIM e opportunita senza perdersi nei dashboard.',
    sections: [
      ['Perche esiste', 'I dashboard mostrano dati. SAVia aiuta a interpretarli, collegare segnali e preparare decisioni in linguaggio naturale.'],
      ['Cosa puoi chiedere', 'Quali vini immobilizzano capitale, quali referenze hanno perso margine, cosa spingere, quale fattura non torna con la bolla o quale RIM preparare prima dell approvazione.'],
      ['Preview prima dell azione', 'SAVia puo riassumere impatto previsto su stock, costo, margine, rotazione, prezzo e carta prima che il team decida di applicare un cambio.'],
      ['Approvazione umana', 'SAVia consulta, spiega, riassume e prepara azioni, ma non cambia stock, prezzi, costi, bolle, fatture, RIM o referenze senza approvazione umana.'],
      ['Contesto connesso', 'SAVia lavora con carta, vendite, stock, costi, bolle, fatture, tariffe e documenti processati da CloudRIM.'],
      ['Per chi aiuta', 'Direzione, sommelier, acquisti e sala possono fare domande diverse sulla stessa operativita e ricevere una risposta tracciabile.'],
    ],
    links: [['CloudRIM', '/it/prodotto/cloudrim'], ['Intelligenza dinamica', '/it/prodotto/intelligenza-dinamica'], ['Winerim Core', '/it/prodotto/winerim-core'], ['Demo', '/it/demo']],
  },
  {
    path: '/fr/produit/savia',
    lang: 'fr',
    title: 'SAVia | Agent conversationnel pour carte, stock et marges',
    description: 'SAVia est l agent conversationnel de Winerim pour interroger carte, ventes, stock, couts, marges, factures, bons, RIM et opportunites. Elle explique les donnees et prepare les actions sans executer de changement critique sans validation humaine.',
    h1: 'Interrogez votre cave. SAVia repond avec les donnees Winerim.',
    subtitle: 'SAVia aide a interpreter carte, ventes, stock, couts, marges, factures, bons, RIM et opportunites sans fouiller dans les dashboards.',
    sections: [
      ['Pourquoi il existe', 'Les dashboards montrent les donnees. SAVia aide a les interpreter, relier les signaux et preparer des decisions en langage courant.'],
      ['Ce que vous pouvez demander', 'Quels vins immobilisent du capital, quelles references perdent de la marge, quoi pousser, quelle facture ne correspond pas a son bon ou quel RIM preparer avant validation.'],
      ['Preview avant action', 'SAVia peut resumer l impact attendu sur stock, cout, marge, rotation, prix et carte avant que l equipe decide d appliquer un changement.'],
      ['Validation humaine', 'SAVia consulte, explique, resume et prepare, mais ne change pas stock, prix, couts, bons, factures, RIM ou references sans validation humaine.'],
      ['Contexte connecte', 'SAVia travaille avec carte, ventes, stock, couts, bons, factures, tarifs et documents traites par CloudRIM.'],
      ['Pour qui elle aide', 'Direction, sommelier, achats et salle peuvent poser des questions differentes sur la meme operation et recevoir une reponse tracable.'],
    ],
    links: [['CloudRIM', '/fr/produit/cloudrim'], ['Intelligence dynamique', '/fr/produit/intelligence-dynamique'], ['Winerim Core', '/fr/produit/winerim-core'], ['Demo', '/fr/demo']],
  },
  {
    path: '/de/produkt/savia',
    lang: 'de',
    title: 'SAVia | Konversationsagent fuer Weinkarte, Bestand und Marge',
    description: 'SAVia ist der Winerim-Konversationsagent fuer Fragen zu Karte, Verkauf, Bestand, Kosten, Margen, Rechnungen, Lieferscheinen, RIMs und Chancen. SAVia erklaert Daten und bereitet Aktionen vor, ohne kritische Aenderungen ohne menschliche Freigabe auszufuehren.',
    h1: 'Fragen Sie Ihren Keller. SAVia antwortet mit Winerim-Daten.',
    subtitle: 'SAVia hilft Teams, Weinkarte, Verkauf, Bestand, Kosten, Margen, Rechnungen, Lieferscheine, RIMs und Chancen zu verstehen, ohne sich durch Dashboards zu klicken.',
    sections: [
      ['Warum es SAVia gibt', 'Dashboards zeigen Daten. SAVia hilft, sie zu interpretieren, Signale zu verbinden und Entscheidungen in Alltagssprache vorzubereiten.'],
      ['Was Sie fragen koennen', 'Welche Weine Kapital binden, welche Referenzen Marge verlieren, was gepusht werden sollte, welche Rechnung nicht zum Lieferschein passt oder welcher RIM vor Freigabe vorbereitet werden soll.'],
      ['Vorschau vor Aktion', 'SAVia kann die erwartete Auswirkung auf Bestand, Kosten, Marge, Rotation, Preis und Karte zusammenfassen, bevor das Team eine Aenderung anwendet.'],
      ['Menschliche Freigabe', 'SAVia kann abfragen, erklaeren, zusammenfassen und Aktionen vorbereiten. Bestand, Preise, Kosten, Lieferscheine, Rechnungen, RIMs und Referenzen werden nicht ohne menschliche Freigabe geaendert.'],
      ['Verbundener Kontext', 'SAVia nutzt Weinkarte, Verkauf, Bestand, Kosten, Lieferscheine, Rechnungen, Tarife und durch CloudRIM verarbeitete Dokumente.'],
      ['Wem es hilft', 'Management, Sommeliers, Einkauf und Service koennen unterschiedliche Fragen zur gleichen Operation stellen und eine nachvollziehbare Antwort erhalten.'],
    ],
    links: [['CloudRIM', '/de/produkt/cloudrim'], ['Dynamische Intelligenz', '/de/produkt/dynamische-intelligenz'], ['Winerim Core', '/de/produkt/winerim-core'], ['Demo', '/de/demo']],
  },
  {
    path: '/pt/produto/savia',
    lang: 'pt',
    title: 'SAVia | Agente conversacional para carta, stock e margens',
    description: 'SAVia e o agente conversacional da Winerim para perguntar sobre carta, vendas, stock, custos, margens, faturas, guias, RIMs e oportunidades. Explica dados e prepara acoes sem executar alteracoes criticas sem aprovacao humana.',
    h1: 'Pergunte a sua garrafeira. SAVia responde com dados Winerim.',
    subtitle: 'SAVia ajuda a interpretar carta, vendas, stock, custos, margens, faturas, guias, RIMs e oportunidades sem procurar em dashboards.',
    sections: [
      ['Porque existe', 'Os dashboards mostram dados. SAVia ajuda a interpreta-los, ligar sinais e preparar decisoes em linguagem natural.'],
      ['O que pode perguntar', 'Que vinhos imobilizam capital, que referencias perderam margem, o que promover, que fatura nao bate certo com a guia ou que RIM preparar antes de aprovar.'],
      ['Preview antes da acao', 'SAVia pode resumir impacto previsto em stock, custo, margem, rotacao, preco e carta antes de a equipa decidir aplicar uma alteracao.'],
      ['Aprovacao humana', 'SAVia consulta, explica, resume e prepara acoes, mas nao altera stock, precos, custos, guias, faturas, RIMs ou referencias sem aprovacao humana.'],
      ['Contexto ligado', 'SAVia trabalha com carta, vendas, stock, custos, guias, faturas, tabelas e documentos processados pelo CloudRIM.'],
      ['Para quem ajuda', 'Direcao, sommelier, compras e sala podem fazer perguntas diferentes sobre a mesma operacao e receber uma resposta rastreavel.'],
    ],
    links: [['CloudRIM', '/pt/produto/cloudrim'], ['Inteligencia dinamica', '/pt/produto/inteligencia-dinamica'], ['Winerim Core', '/pt/produto/winerim-core'], ['Demo', '/pt/demo']],
  },
].map(page => [page.path, { ...page, canonical: page.path, schemaType: 'SoftwareApplication', alternates: SAVIA_ALTERNATES }]));

const ONLINE_TOOL_LANGUAGE_CONFIG = {
  es: {
    tools: '/herramientas',
    toolsLabel: 'Herramientas',
    core: '/producto/winerim-core',
    supply: '/producto/winerim-supply',
    demo: '/demo',
    demoLabel: 'Solicitar demo',
    headings: {
      problem: 'Que problema resuelve',
      usage: 'Cuando usarla',
      decision: 'Que decision prepara',
      connect: 'Como conecta con Winerim',
      next: 'Siguiente paso',
    },
    connect: 'La herramienta funciona como diagnostico inicial. Winerim Core y Winerim Supply conectan esa lectura con carta, stock, compras, ventas, coste y margen para que la decision no dependa solo de una hoja de calculo.',
    next: 'Despues del calculo, el equipo puede revisar la carta completa, comparar referencias, pedir una demo o subir su carta para recibir un analisis mas profundo.',
  },
  en: {
    tools: '/en/tools',
    toolsLabel: 'Tools',
    core: '/en/product/winerim-core',
    supply: '/en/product/winerim-supply',
    demo: '/en/demo',
    demoLabel: 'Request a demo',
    headings: {
      problem: 'Problem solved',
      usage: 'When to use it',
      decision: 'Decision it prepares',
      connect: 'How it connects with Winerim',
      next: 'Next step',
    },
    connect: 'The tool is an initial diagnostic. Winerim Core and Winerim Supply connect that reading with wine list, stock, purchases, sales, cost and margin so decisions are not made from a spreadsheet alone.',
    next: 'After the calculation, the team can review the full wine list, compare references, request a demo or upload the list for a deeper analysis.',
  },
  it: {
    tools: '/it/strumenti',
    toolsLabel: 'Strumenti',
    core: '/it/prodotto/winerim-core',
    supply: '/it/prodotto/winerim-supply',
    demo: '/it/demo',
    demoLabel: 'Richiedi demo',
    headings: {
      problem: 'Problema risolto',
      usage: 'Quando usarlo',
      decision: 'Decisione che prepara',
      connect: 'Come si collega a Winerim',
      next: 'Passo successivo',
    },
    connect: 'Lo strumento e una diagnosi iniziale. Winerim Core e Winerim Supply collegano questa lettura con carta, stock, acquisti, vendite, costo e margine per evitare decisioni basate solo su un foglio di calcolo.',
    next: 'Dopo il calcolo, il team puo rivedere la carta completa, confrontare referenze, chiedere una demo o caricare la carta per un analisi piu profonda.',
  },
  fr: {
    tools: '/fr/outils',
    toolsLabel: 'Outils',
    core: '/fr/produit/winerim-core',
    supply: '/fr/produit/winerim-supply',
    demo: '/fr/demo',
    demoLabel: 'Demander une demo',
    headings: {
      problem: 'Probleme resolu',
      usage: 'Quand l utiliser',
      decision: 'Decision preparee',
      connect: 'Comment cela se relie a Winerim',
      next: 'Etape suivante',
    },
    connect: 'L outil sert de diagnostic initial. Winerim Core et Winerim Supply relient cette lecture a la carte, au stock, aux achats, aux ventes, au cout et a la marge pour eviter les decisions isolees.',
    next: 'Apres le calcul, l equipe peut reviser toute la carte, comparer les references, demander une demo ou envoyer la carte pour une analyse plus complete.',
  },
  de: {
    tools: '/de/tools',
    toolsLabel: 'Tools',
    core: '/de/produkt/winerim-core',
    supply: '/de/produkt/winerim-supply',
    demo: '/de/demo',
    demoLabel: 'Demo anfragen',
    headings: {
      problem: 'Geloestes Problem',
      usage: 'Wann nutzen',
      decision: 'Welche Entscheidung vorbereitet wird',
      connect: 'Wie es mit Winerim verbunden ist',
      next: 'Naechster Schritt',
    },
    connect: 'Das Tool ist eine erste Diagnose. Winerim Core und Winerim Supply verbinden diese Einschaetzung mit Karte, Bestand, Einkauf, Verkauf, Kosten und Marge, damit Entscheidungen nicht nur aus einer Tabelle entstehen.',
    next: 'Nach der Berechnung kann das Team die gesamte Karte pruefen, Referenzen vergleichen, eine Demo anfragen oder die Karte fuer eine tiefere Analyse hochladen.',
  },
  pt: {
    tools: '/pt/ferramentas',
    toolsLabel: 'Ferramentas',
    core: '/pt/produto/winerim-core',
    supply: '/pt/produto/winerim-supply',
    demo: '/pt/demo',
    demoLabel: 'Pedir demo',
    headings: {
      problem: 'Problema resolvido',
      usage: 'Quando usar',
      decision: 'Decisao que prepara',
      connect: 'Como se liga a Winerim',
      next: 'Proximo passo',
    },
    connect: 'A ferramenta e um diagnostico inicial. Winerim Core e Winerim Supply ligam essa leitura a carta, stock, compras, vendas, custo e margem para que a decisao nao dependa apenas de uma folha de calculo.',
    next: 'Depois do calculo, a equipa pode rever a carta completa, comparar referencias, pedir uma demo ou carregar a carta para uma analise mais profunda.',
  },
};

const ONLINE_TOOL_GROUPS = [
  {
    key: 'margin-signal',
    paths: {
      es: '/herramientas/simulador-senal-margenes',
      en: '/en/tools/margin-signal-simulator',
      it: '/it/strumenti/simulatore-segnale-margini',
      fr: '/fr/outils/simulateur-signal-marges',
      de: '/de/tools/margensignal-simulator',
      pt: '/pt/ferramentas/simulador-sinal-margens',
    },
    copies: {
      es: {
        title: 'Simulador de senal de margenes | Winerim',
        h1: 'Simulador de senal de margenes para cartas de vino',
        description: 'Evalua si una referencia merece impulso, revision de precio, negociacion de coste o retirada segun margen, rotacion y contexto de carta.',
        subtitle: 'Una forma rapida de convertir margen, rotacion y stock en una senal operativa para el equipo.',
        problem: 'Muchas cartas miran margen y ventas por separado. El resultado es que algunos vinos parecen rentables, pero rotan poco, inmovilizan stock o compiten con referencias similares.',
        usage: 'Usala cuando una referencia genera dudas: buen margen pero baja salida, venta estable con coste subiendo, stock elevado o necesidad de decidir si impulsar, reponer o revisar.',
        decision: 'La senal no sustituye al criterio del responsable de vino. Ordena la conversacion y muestra si conviene empujar la referencia, renegociar coste, ajustar precio, pasar a copa o retirarla.',
      },
      en: {
        title: 'Margin Signal Simulator | Winerim',
        h1: 'Margin signal simulator for restaurant wine lists',
        description: 'Check whether a wine needs promotion, price review, cost negotiation or removal by reading margin, rotation and list context together.',
        subtitle: 'A quick way to turn margin, rotation and stock into an operational signal for the team.',
        problem: 'Many wine lists read margin and sales separately. Some wines look profitable but rotate slowly, tie up stock or compete with similar references.',
        usage: 'Use it when a reference is unclear: good margin but low sales, stable demand with rising cost, high stock or a decision about promotion, reorder or review.',
        decision: 'The signal does not replace the wine manager. It structures the conversation and shows whether to push, renegotiate cost, adjust price, offer by the glass or remove.',
      },
      it: {
        title: 'Simulatore Segnale Margini | Winerim',
        h1: 'Simulatore di segnale margini per carte vini',
        description: 'Valuta se una referenza richiede spinta, revisione prezzo, negoziazione costo o ritiro leggendo insieme margine, rotazione e contesto carta.',
        subtitle: 'Un modo rapido per trasformare margine, rotazione e stock in un segnale operativo per il team.',
        problem: 'Molte carte leggono margine e vendite separatamente. Alcuni vini sembrano redditizi ma ruotano poco, immobilizzano stock o competono con referenze simili.',
        usage: 'Usalo quando una referenza crea dubbi: buon margine ma bassa uscita, costo in aumento, stock alto o decisione su spinta, riordino o revisione.',
        decision: 'Il segnale non sostituisce il responsabile vino. Ordina la conversazione e indica se spingere, negoziare costo, cambiare prezzo, proporre al calice o ritirare.',
      },
      fr: {
        title: 'Simulateur de Signal de Marges | Winerim',
        h1: 'Simulateur de signal de marges pour cartes des vins',
        description: 'Evaluez si une reference doit etre poussee, reprixee, renegociee ou retiree en croisant marge, rotation et contexte de carte.',
        subtitle: 'Une facon rapide de transformer marge, rotation et stock en signal operationnel pour l equipe.',
        problem: 'Beaucoup de cartes lisent marge et ventes separement. Certains vins semblent rentables mais tournent peu, immobilisent du stock ou concurrencent des references proches.',
        usage: 'Utilisez-le quand une reference pose question: bonne marge mais faible sortie, cout en hausse, stock eleve ou decision de pousser, recommander ou reviser.',
        decision: 'Le signal ne remplace pas le responsable vin. Il structure la discussion et montre s il faut pousser, renegocier, ajuster le prix, passer au verre ou retirer.',
      },
      de: {
        title: 'Margensignal-Simulator | Winerim',
        h1: 'Margensignal-Simulator fuer Weinkarten',
        description: 'Pruefen Sie, ob eine Referenz Promotion, Preispruefung, Kostenverhandlung oder Entfernung braucht, indem Marge, Rotation und Kartenkontext zusammen gelesen werden.',
        subtitle: 'Ein schneller Weg, Marge, Rotation und Bestand in ein operatives Signal fuer das Team zu uebersetzen.',
        problem: 'Viele Karten betrachten Marge und Verkauf getrennt. Manche Weine wirken profitabel, drehen aber langsam, binden Bestand oder konkurrieren mit aehnlichen Referenzen.',
        usage: 'Nutzen Sie es bei unklaren Referenzen: gute Marge aber wenig Verkauf, steigende Kosten, hoher Bestand oder Entscheidung ueber Push, Nachkauf oder Pruefung.',
        decision: 'Das Signal ersetzt nicht den Weinverantwortlichen. Es ordnet die Diskussion und zeigt, ob Push, Kostenverhandlung, Preisanpassung, Glaswein oder Entfernung sinnvoll ist.',
      },
      pt: {
        title: 'Simulador de Sinal de Margens | Winerim',
        h1: 'Simulador de sinal de margens para cartas de vinho',
        description: 'Avalie se uma referencia precisa de impulso, revisao de preco, negociacao de custo ou retirada cruzando margem, rotacao e contexto da carta.',
        subtitle: 'Uma forma rapida de transformar margem, rotacao e stock num sinal operacional para a equipa.',
        problem: 'Muitas cartas leem margem e vendas separadamente. Alguns vinhos parecem rentaveis mas rodam pouco, imobilizam stock ou competem com referencias parecidas.',
        usage: 'Use quando uma referencia gera duvidas: boa margem mas pouca saida, custo a subir, stock alto ou decisao sobre promover, repor ou rever.',
        decision: 'O sinal nao substitui o responsavel de vinho. Organiza a conversa e mostra se convem promover, renegociar custo, ajustar preco, vender a copo ou retirar.',
      },
    },
  },
  {
    key: 'rim-profile',
    paths: {
      es: '/herramientas/test-perfil-rim',
      en: '/en/tools/rim-profile-test',
      it: '/it/strumenti/test-profilo-rim',
      fr: '/fr/outils/test-profil-rim',
      de: '/de/tools/rim-profiltest',
      pt: '/pt/ferramentas/teste-perfil-rim',
    },
    copies: {
      es: {
        title: 'Test de perfil RIM para restaurantes | Winerim',
        h1: 'Test de perfil RIM para entender tu carta de vinos',
        description: 'Identifica el perfil operativo de tu carta segun referencias, rotacion, stock, margen, equipo y forma de decidir compras.',
        subtitle: 'Un diagnostico breve para saber si tu restaurante necesita mas control, mas venta, mas rotacion o mas gobierno de carta.',
        problem: 'Dos restaurantes pueden tener el mismo numero de vinos y problemas muy distintos. Sin perfil operativo, la mejora se vuelve generica y cuesta priorizar.',
        usage: 'Usalo al iniciar un proyecto, antes de redisenar la carta, cuando cambia el responsable de vino o cuando el equipo no sabe por donde empezar.',
        decision: 'El resultado ayuda a priorizar: estructura de carta, stock muerto, venta por copa, compras, margen, formacion de sala o integraciones necesarias.',
      },
      en: {
        title: 'RIM Profile Test for Restaurants | Winerim',
        h1: 'RIM profile test for understanding your wine list',
        description: 'Identify the operating profile of your list by references, rotation, stock, margin, team and purchasing decision style.',
        subtitle: 'A short diagnostic to see whether the restaurant needs more control, more sales, more rotation or stronger list governance.',
        problem: 'Two restaurants can have the same number of wines and very different problems. Without an operating profile, improvement becomes generic.',
        usage: 'Use it at the start of a project, before redesigning the list, when the wine owner changes or when the team does not know where to begin.',
        decision: 'The result helps prioritize list structure, dead stock, by-the-glass, purchasing, margin, floor training or required integrations.',
      },
      it: {
        title: 'Test Profilo RIM per Ristoranti | Winerim',
        h1: 'Test profilo RIM per capire la carta vini',
        description: 'Identifica il profilo operativo della carta secondo referenze, rotazione, stock, margine, team e modo di decidere gli acquisti.',
        subtitle: 'Una diagnosi breve per capire se servono piu controllo, piu vendita, piu rotazione o piu governo della carta.',
        problem: 'Due ristoranti possono avere lo stesso numero di vini e problemi diversi. Senza profilo operativo, il miglioramento diventa generico.',
        usage: 'Usalo all inizio di un progetto, prima di ridisegnare la carta, quando cambia il responsabile vino o quando il team non sa da dove partire.',
        decision: 'Il risultato aiuta a dare priorita a struttura carta, stock fermo, vino al calice, acquisti, margine, formazione sala o integrazioni.',
      },
      fr: {
        title: 'Test de Profil RIM pour Restaurants | Winerim',
        h1: 'Test de profil RIM pour comprendre votre carte des vins',
        description: 'Identifiez le profil operationnel de votre carte selon references, rotation, stock, marge, equipe et decisions d achat.',
        subtitle: 'Un diagnostic court pour savoir si le restaurant a besoin de plus de controle, vente, rotation ou gouvernance de carte.',
        problem: 'Deux restaurants peuvent avoir le meme nombre de vins et des problemes tres differents. Sans profil operationnel, l amelioration reste generale.',
        usage: 'Utilisez-le au debut d un projet, avant de refaire la carte, quand le responsable vin change ou quand l equipe ne sait pas par ou commencer.',
        decision: 'Le resultat aide a prioriser structure de carte, stock dormant, vin au verre, achats, marge, formation salle ou integrations.',
      },
      de: {
        title: 'RIM-Profiltest fuer Restaurants | Winerim',
        h1: 'RIM-Profiltest zum Verstehen Ihrer Weinkarte',
        description: 'Ermitteln Sie das operative Profil Ihrer Karte nach Referenzen, Rotation, Bestand, Marge, Team und Einkaufsentscheidung.',
        subtitle: 'Eine kurze Diagnose, ob das Restaurant mehr Kontrolle, Verkauf, Rotation oder Kartensteuerung braucht.',
        problem: 'Zwei Restaurants koennen gleich viele Weine haben und sehr unterschiedliche Probleme. Ohne operatives Profil bleibt Verbesserung allgemein.',
        usage: 'Nutzen Sie es zu Projektbeginn, vor einem Kartenrelaunch, bei Wechsel der Weinverantwortung oder wenn das Team keinen Startpunkt sieht.',
        decision: 'Das Ergebnis priorisiert Kartenstruktur, Totbestand, Glaswein, Einkauf, Marge, Servicetraining oder benoetigte Integrationen.',
      },
      pt: {
        title: 'Teste de Perfil RIM para Restaurantes | Winerim',
        h1: 'Teste de perfil RIM para entender a carta de vinhos',
        description: 'Identifique o perfil operacional da carta por referencias, rotacao, stock, margem, equipa e forma de decidir compras.',
        subtitle: 'Um diagnostico curto para saber se o restaurante precisa de mais controlo, venda, rotacao ou governo de carta.',
        problem: 'Dois restaurantes podem ter o mesmo numero de vinhos e problemas muito diferentes. Sem perfil operacional, a melhoria fica generica.',
        usage: 'Use no inicio de um projeto, antes de redesenhar a carta, quando muda o responsavel de vinho ou quando a equipa nao sabe por onde comecar.',
        decision: 'O resultado ajuda a priorizar estrutura da carta, stock parado, vinho a copo, compras, margem, formacao de sala ou integracoes.',
      },
    },
  },
  {
    key: 'pareto',
    paths: {
      es: '/herramientas/simulador-pareto-carta-vinos',
      en: '/en/tools/pareto-wine-list-simulator',
      it: '/it/strumenti/simulatore-pareto-carta-vini',
      fr: '/fr/outils/simulateur-pareto-carte-vins',
      de: '/de/tools/pareto-weinkarten-simulator',
      pt: '/pt/ferramentas/simulador-pareto-carta-vinhos',
    },
    copies: {
      es: {
        title: 'Simulador Pareto de carta de vinos | Winerim',
        h1: 'Simulador Pareto 80/20 para cartas de vino',
        description: 'Estima si una parte pequena de la carta concentra la mayor parte de ventas, margen o rotacion y que hacer con el resto.',
        subtitle: 'Una lectura rapida para distinguir vinos tractores, referencias estrategicas y stock que exige revision.',
        problem: 'En muchas cartas, pocas referencias concentran ventas mientras el resto ocupa espacio, capital y atencion del equipo sin una funcion clara.',
        usage: 'Usalo en revisiones mensuales, antes de reducir carta, al preparar vino por copa o cuando el equipo recomienda siempre los mismos vinos.',
        decision: 'Ayuda a decidir que proteger, que impulsar, que rotar, que vender por copa y que referencias necesitan baja, promocion o reposicion limitada.',
      },
      en: {
        title: 'Pareto Wine List Simulator | Winerim',
        h1: 'Pareto 80/20 simulator for wine lists',
        description: 'Estimate whether a small part of the list concentrates most sales, margin or rotation and what to do with the rest.',
        subtitle: 'A quick read to separate anchor wines, strategic references and stock that needs review.',
        problem: 'In many lists, a few references concentrate sales while the rest takes space, capital and team attention without a clear role.',
        usage: 'Use it in monthly reviews, before reducing the list, when preparing by-the-glass strategy or when the team always recommends the same wines.',
        decision: 'It helps decide what to protect, push, rotate, sell by the glass and which references need removal, promotion or limited replenishment.',
      },
      it: {
        title: 'Simulatore Pareto Carta Vini | Winerim',
        h1: 'Simulatore Pareto 80/20 per carte vini',
        description: 'Stima se una piccola parte della carta concentra vendite, margine o rotazione e cosa fare con il resto.',
        subtitle: 'Una lettura rapida per separare vini trainanti, referenze strategiche e stock da rivedere.',
        problem: 'In molte carte poche referenze concentrano le vendite mentre il resto occupa spazio, capitale e attenzione senza una funzione chiara.',
        usage: 'Usalo nelle revisioni mensili, prima di ridurre la carta, preparando il vino al calice o quando il team consiglia sempre gli stessi vini.',
        decision: 'Aiuta a decidere cosa proteggere, spingere, ruotare, vendere al calice e quali referenze ritirare, promuovere o riordinare con limite.',
      },
      fr: {
        title: 'Simulateur Pareto Carte des Vins | Winerim',
        h1: 'Simulateur Pareto 80/20 pour cartes des vins',
        description: 'Estimez si une petite partie de la carte concentre ventes, marge ou rotation et quoi faire avec le reste.',
        subtitle: 'Une lecture rapide pour distinguer vins moteurs, references strategiques et stock a reviser.',
        problem: 'Dans beaucoup de cartes, quelques references concentrent les ventes tandis que le reste occupe espace, capital et attention sans role clair.',
        usage: 'Utilisez-le en revue mensuelle, avant de reduire la carte, pour le vin au verre ou quand l equipe recommande toujours les memes vins.',
        decision: 'Il aide a decider quoi proteger, pousser, faire tourner, vendre au verre et quelles references retirer, promouvoir ou reapprovisionner avec limite.',
      },
      de: {
        title: 'Pareto-Weinkarten-Simulator | Winerim',
        h1: 'Pareto 80/20 Simulator fuer Weinkarten',
        description: 'Schaetzen Sie, ob ein kleiner Teil der Karte den Grossteil von Verkauf, Marge oder Rotation traegt und was mit dem Rest passiert.',
        subtitle: 'Eine schnelle Lesart fuer Zugpferde, strategische Referenzen und Bestand, der geprueft werden muss.',
        problem: 'In vielen Karten konzentrieren wenige Referenzen den Verkauf, waehrend der Rest Platz, Kapital und Teamaufmerksamkeit ohne klare Rolle bindet.',
        usage: 'Nutzen Sie es in Monatsreviews, vor Kartenreduktion, bei Glasweinstrategie oder wenn das Team immer dieselben Weine empfiehlt.',
        decision: 'Es hilft zu entscheiden, was geschuetzt, gepusht, rotiert, glasweise verkauft, entfernt, beworben oder begrenzt nachgekauft wird.',
      },
      pt: {
        title: 'Simulador Pareto de Carta de Vinhos | Winerim',
        h1: 'Simulador Pareto 80/20 para cartas de vinho',
        description: 'Estime se uma pequena parte da carta concentra vendas, margem ou rotacao e o que fazer com o resto.',
        subtitle: 'Uma leitura rapida para separar vinhos motores, referencias estrategicas e stock que pede revisao.',
        problem: 'Em muitas cartas, poucas referencias concentram vendas enquanto o resto ocupa espaco, capital e atencao sem funcao clara.',
        usage: 'Use em revisoes mensais, antes de reduzir a carta, ao preparar vinho a copo ou quando a equipa recomenda sempre os mesmos vinhos.',
        decision: 'Ajuda a decidir o que proteger, promover, rodar, vender a copo e que referencias retirar, destacar ou repor com limite.',
      },
    },
  },
  {
    key: 'margin-leakage',
    paths: {
      es: '/herramientas/calculadora-fuga-margen',
      en: '/en/tools/margin-leakage-calculator',
      it: '/it/strumenti/calcolatrice-fuga-margine',
      fr: '/fr/outils/calculateur-fuite-marge',
      de: '/de/tools/margenverlust-rechner',
      pt: '/pt/ferramentas/calculadora-fuga-margem',
    },
    copies: {
      es: {
        title: 'Calculadora de fuga de margen en vino | Winerim',
        h1: 'Calculadora de fuga de margen para cartas de vino',
        description: 'Detecta cuanto margen puede perder una carta por costes desactualizados, precios sin revisar, mermas, descuentos o referencias lentas.',
        subtitle: 'Una calculadora para hacer visible el dinero que se pierde sin que aparezca en la venta diaria.',
        problem: 'El margen se escapa cuando sube el coste, cambia la tarifa, se mantiene el PVP, aumenta la merma o una referencia rota demasiado lento.',
        usage: 'Usala tras recibir nuevas tarifas, antes de imprimir o publicar carta, al revisar albaranes o cuando el margen teorico no coincide con caja.',
        decision: 'Prepara decisiones de repricing, renegociacion, sustitucion de proveedor, ajuste de copa, cambio de visibilidad o retirada de referencias.',
      },
      en: {
        title: 'Wine Margin Leakage Calculator | Winerim',
        h1: 'Margin leakage calculator for wine lists',
        description: 'Estimate how much margin a list may lose through outdated costs, unrevised prices, waste, discounts or slow references.',
        subtitle: 'A calculator that makes invisible margin loss visible before it hurts profitability.',
        problem: 'Margin leaks when cost rises, supplier tariffs change, selling price stays fixed, waste increases or a reference rotates too slowly.',
        usage: 'Use it after new tariffs, before publishing a list, when reviewing delivery notes or when theoretical margin does not match real cash.',
        decision: 'It prepares repricing, renegotiation, supplier change, by-the-glass adjustment, visibility changes or removal decisions.',
      },
      it: {
        title: 'Calcolatrice Fuga Margine Vino | Winerim',
        h1: 'Calcolatrice fuga margine per carte vini',
        description: 'Stima quanto margine perde una carta per costi non aggiornati, prezzi non rivisti, spreco, sconti o referenze lente.',
        subtitle: 'Una calcolatrice per rendere visibile il margine che si perde prima che pesi sulla redditivita.',
        problem: 'Il margine fugge quando il costo sale, cambiano i listini, il prezzo resta fermo, aumenta lo spreco o una referenza ruota troppo lentamente.',
        usage: 'Usala dopo nuovi listini, prima di pubblicare la carta, rivedendo bolle o quando il margine teorico non coincide con la cassa.',
        decision: 'Prepara repricing, negoziazione, cambio fornitore, adeguamento al calice, cambio visibilita o ritiro delle referenze.',
      },
      fr: {
        title: 'Calculateur de Fuite de Marge Vin | Winerim',
        h1: 'Calculateur de fuite de marge pour cartes des vins',
        description: 'Estimez la marge perdue a cause de couts non actualises, prix non revus, pertes, remises ou references lentes.',
        subtitle: 'Un calculateur pour rendre visible la marge qui disparait avant qu elle ne pese sur la rentabilite.',
        problem: 'La marge fuit quand le cout augmente, les tarifs changent, le prix de vente reste fixe, la perte augmente ou une reference tourne trop lentement.',
        usage: 'Utilisez-le apres de nouveaux tarifs, avant de publier la carte, en revisant les bons ou quand la marge theorique ne colle pas a la caisse.',
        decision: 'Il prepare repricing, renegociation, changement fournisseur, ajustement au verre, visibilite ou retrait de references.',
      },
      de: {
        title: 'Margenverlust-Rechner fuer Wein | Winerim',
        h1: 'Margenverlust-Rechner fuer Weinkarten',
        description: 'Schaetzen Sie Margenverlust durch veraltete Kosten, nicht gepruefte Preise, Schwund, Rabatte oder langsame Referenzen.',
        subtitle: 'Ein Rechner, der unsichtbaren Margenverlust sichtbar macht, bevor er die Profitabilitaet belastet.',
        problem: 'Marge geht verloren, wenn Kosten steigen, Tarife wechseln, Verkaufspreise gleich bleiben, Schwund zunimmt oder Referenzen zu langsam rotieren.',
        usage: 'Nutzen Sie ihn nach neuen Tarifen, vor Kartenveroeffentlichung, bei Lieferscheinpruefung oder wenn Theorie und Kasse nicht uebereinstimmen.',
        decision: 'Er bereitet Repricing, Neuverhandlung, Lieferantenwechsel, Glasweinanpassung, Sichtbarkeit oder Entfernung von Referenzen vor.',
      },
      pt: {
        title: 'Calculadora de Fuga de Margem no Vinho | Winerim',
        h1: 'Calculadora de fuga de margem para cartas de vinho',
        description: 'Estime quanta margem a carta perde por custos desatualizados, precos sem revisao, desperdicio, descontos ou referencias lentas.',
        subtitle: 'Uma calculadora para tornar visivel a margem que desaparece antes de afetar a rentabilidade.',
        problem: 'A margem escapa quando o custo sobe, a tabela muda, o preco fica igual, a quebra aumenta ou uma referencia roda demasiado devagar.',
        usage: 'Use depois de novas tabelas, antes de publicar a carta, ao rever guias ou quando a margem teorica nao bate com a caixa.',
        decision: 'Prepara repricing, renegociacao, troca de fornecedor, ajuste de vinho a copo, mudanca de visibilidade ou retirada de referencias.',
      },
    },
  },
  {
    key: 'distributor-comparator',
    paths: {
      es: '/herramientas/comparador-distribuidores',
      en: '/en/tools/distributor-comparator',
      it: '/it/strumenti/comparatore-distributori',
      fr: '/fr/outils/comparateur-distributeurs',
      de: '/de/tools/distributoren-vergleich',
      pt: '/pt/ferramentas/comparador-distribuidores',
    },
    copies: {
      es: {
        title: 'Comparador de distribuidores de vino | Winerim',
        h1: 'Comparador de distribuidores para compras de vino',
        description: 'Compara distribuidores por precio real, condiciones, minimo, servicio, disponibilidad y efecto sobre margen y rotacion.',
        subtitle: 'Una herramienta para dejar de comparar solo tarifa y empezar a comparar coste operativo completo.',
        problem: 'Dos distribuidores pueden parecer iguales por precio unitario y ser muy distintos por portes, minimo, disponibilidad, plazo, condiciones y sustituciones.',
        usage: 'Usala al negociar tarifas, cambiar proveedor, preparar compras por temporada o revisar si el coste real coincide con la rentabilidad esperada.',
        decision: 'Ayuda a decidir proveedor principal, proveedor alternativo, volumen, condicion minima, renegociacion o cambio de referencia por disponibilidad.',
      },
      en: {
        title: 'Wine Distributor Comparator | Winerim',
        h1: 'Distributor comparator for wine purchasing',
        description: 'Compare distributors by real price, conditions, minimum order, service, availability and impact on margin and rotation.',
        subtitle: 'A tool for comparing total operating cost, not just the supplier price list.',
        problem: 'Two distributors can look similar on unit price and be very different once delivery, minimums, availability, terms and substitutions are included.',
        usage: 'Use it when negotiating tariffs, changing supplier, preparing seasonal purchases or checking whether real cost matches expected margin.',
        decision: 'It helps decide main supplier, alternative supplier, volume, minimum condition, renegotiation or reference change due to availability.',
      },
      it: {
        title: 'Comparatore Distributori Vino | Winerim',
        h1: 'Comparatore distributori per acquisti vino',
        description: 'Confronta distributori per prezzo reale, condizioni, minimo, servizio, disponibilita e impatto su margine e rotazione.',
        subtitle: 'Uno strumento per confrontare il costo operativo completo, non solo il listino.',
        problem: 'Due distributori possono sembrare uguali per prezzo unitario e cambiare molto con trasporto, minimi, disponibilita, termini e sostituzioni.',
        usage: 'Usalo negoziando listini, cambiando fornitore, preparando acquisti stagionali o verificando se il costo reale coincide con il margine atteso.',
        decision: 'Aiuta a decidere fornitore principale, alternativo, volume, condizione minima, rinegoziazione o cambio referenza per disponibilita.',
      },
      fr: {
        title: 'Comparateur de Distributeurs Vin | Winerim',
        h1: 'Comparateur de distributeurs pour achats de vin',
        description: 'Comparez distributeurs par prix reel, conditions, minimum, service, disponibilite et impact sur marge et rotation.',
        subtitle: 'Un outil pour comparer le cout operationnel complet, pas seulement le tarif fournisseur.',
        problem: 'Deux distributeurs peuvent sembler proches au prix unitaire et differer fortement avec transport, minimums, disponibilite, conditions et substitutions.',
        usage: 'Utilisez-le pour negocier les tarifs, changer fournisseur, preparer les achats saisonniers ou verifier le cout reel face a la marge attendue.',
        decision: 'Il aide a choisir fournisseur principal, fournisseur alternatif, volume, condition minimale, renegociation ou changement de reference.',
      },
      de: {
        title: 'Distributoren-Vergleich fuer Wein | Winerim',
        h1: 'Distributoren-Vergleich fuer Weineinkauf',
        description: 'Vergleichen Sie Distributoren nach echtem Preis, Konditionen, Mindestbestellung, Service, Verfuegbarkeit und Wirkung auf Marge und Rotation.',
        subtitle: 'Ein Tool, um operative Gesamtkosten zu vergleichen, nicht nur die Preisliste.',
        problem: 'Zwei Distributoren koennen beim Stueckpreis gleich wirken und sich durch Lieferung, Mindestmengen, Verfuegbarkeit, Konditionen und Ersatz stark unterscheiden.',
        usage: 'Nutzen Sie es bei Tarifverhandlung, Lieferantenwechsel, saisonalem Einkauf oder Pruefung, ob echte Kosten zur erwarteten Marge passen.',
        decision: 'Es hilft bei Hauptlieferant, Alternativlieferant, Volumen, Mindestbedingung, Neuverhandlung oder Referenzwechsel wegen Verfuegbarkeit.',
      },
      pt: {
        title: 'Comparador de Distribuidores de Vinho | Winerim',
        h1: 'Comparador de distribuidores para compras de vinho',
        description: 'Compare distribuidores por preco real, condicoes, minimo, servico, disponibilidade e impacto em margem e rotacao.',
        subtitle: 'Uma ferramenta para comparar custo operacional completo, nao apenas tabela de fornecedor.',
        problem: 'Dois distribuidores podem parecer iguais no preco unitario e ser diferentes por transporte, minimos, disponibilidade, condicoes e substituicoes.',
        usage: 'Use ao negociar tabelas, mudar fornecedor, preparar compras de temporada ou verificar se o custo real combina com a margem esperada.',
        decision: 'Ajuda a decidir fornecedor principal, alternativo, volume, condicao minima, renegociacao ou troca de referencia por disponibilidade.',
      },
    },
  },
];

const ONLINE_TOOL_ALTERNATES_BY_PATH = Object.fromEntries(
  ONLINE_TOOL_GROUPS.flatMap(group => {
    const alternates = { ...group.paths, 'x-default': group.paths.es };
    return Object.values(group.paths).map(path => [path, alternates]);
  }),
);

const ONLINE_TOOL_WORKER_PAGES = Object.fromEntries(
  ONLINE_TOOL_GROUPS.flatMap(group => {
    const alternates = { ...group.paths, 'x-default': group.paths.es };
    return Object.entries(group.paths).map(([lang, path]) => {
      const config = ONLINE_TOOL_LANGUAGE_CONFIG[lang];
      const copy = group.copies[lang];
      return [path, {
        path,
        lang,
        title: copy.title,
        description: copy.description,
        h1: copy.h1,
        subtitle: copy.subtitle,
        canonical: path,
        schemaType: 'SoftwareApplication',
        alternates,
        sections: [
          [config.headings.problem, copy.problem],
          [config.headings.usage, copy.usage],
          [config.headings.decision, copy.decision],
          [config.headings.connect, config.connect],
          [config.headings.next, config.next],
        ],
        links: [
          [config.toolsLabel, config.tools],
          ['Winerim Core', config.core],
          ['Winerim Supply', config.supply],
          [config.demoLabel, config.demo],
        ],
      }];
    });
  }),
);

const STATIC_WORKER_PRERENDER_PAGES = {
  ...CLOUDRIM_WORKER_PAGES,
  ...SAVIA_WORKER_PAGES,
  ...ONLINE_TOOL_WORKER_PAGES,
  '/politica-privacidad': {
    lang: 'es',
    title: 'Politica de Privacidad | Winerim',
    description: 'Politica de privacidad de Winerim.',
    h1: 'Politica de Privacidad',
    subtitle: 'Informacion sobre el tratamiento de datos personales en Winerim.',
    canonical: '/politica-privacidad',
    schemaType: 'WebPage',
    robots: 'noindex, follow',
    sections: [
      ['Responsable del tratamiento', 'Winerim S.L. es responsable del tratamiento de los datos personales recogidos a traves de este sitio web.'],
      ['Datos recogidos', 'Recogemos los datos que nos proporcionas voluntariamente a traves de formularios de contacto, demo y solicitudes comerciales.'],
      ['Finalidad', 'Los datos se utilizan para gestionar solicitudes de informacion, demos, contacto comercial y comunicaciones relacionadas con Winerim.'],
      ['Base legal y derechos', 'El tratamiento se basa en el consentimiento del interesado. Puedes ejercer tus derechos de acceso, rectificacion y supresion escribiendo a info@winerim.com.'],
      ['Cookies y conservacion', 'El sitio puede usar cookies propias y de terceros para mejorar la experiencia. Los datos se conservan mientras exista interes mutuo y durante los plazos legales.'],
    ],
    links: [['Inicio', '/'], ['Contacto', '/contacto'], ['Demo', '/demo'], ['Terminos', '/terminos-y-condiciones-del-contrato']],
  },
  '/terminos-y-condiciones-del-contrato': {
    lang: 'es',
    title: 'Terminos y Condiciones del Contrato | Winerim',
    description: 'Terminos y condiciones de uso y contratacion de Winerim.',
    h1: 'Terminos de Uso',
    subtitle: 'Condiciones generales aplicables al uso del sitio y servicios de Winerim.',
    canonical: '/terminos-y-condiciones-del-contrato',
    schemaType: 'WebPage',
    robots: 'noindex, follow',
    sections: [
      ['Titularidad', 'Este sitio web es propiedad de Winerim S.L. El acceso y uso del sitio implica la aceptacion de estos terminos.'],
      ['Uso del servicio', 'El usuario se compromete a utilizar el sitio web y sus servicios de forma licita y conforme a la normativa aplicable.'],
      ['Propiedad intelectual', 'Todos los contenidos del sitio son propiedad de Winerim o de sus licenciantes, salvo indicacion expresa en contrario.'],
      ['Limitacion de responsabilidad', 'Winerim no se responsabiliza de los danos que puedan derivarse del uso indebido del sitio web o de interrupciones ajenas a su control.'],
      ['Modificaciones y legislacion', 'Winerim puede modificar estos terminos cuando sea necesario. Estos terminos se rigen por la legislacion espanola.'],
    ],
    links: [['Inicio', '/'], ['Contacto', '/contacto'], ['Demo', '/demo'], ['Privacidad', '/politica-privacidad']],
  },
  '/presentacion': {
    lang: 'es',
    title: 'Presentacion Winerim | Carta inteligente de vinos para restaurantes',
    description: 'Presentacion oficial de Winerim para restaurantes, hoteles y grupos: carta digital, recomendaciones, analytics, stock, pricing y herramientas para vender mas vino.',
    h1: 'Presentacion Winerim',
    subtitle: 'La carta de vinos convertida en una herramienta de venta, gestion y decision para restaurantes, hoteles y grupos.',
    canonical: '/presentacion',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Que problema resuelve', 'Winerim ayuda a transformar cartas de vino estaticas, dificiles de actualizar y poco conectadas con ventas, stock y margen en un sistema operativo para vender mejor vino.'],
      ['Que incluye', 'Carta digital, fichas de vino, maridajes, recomendaciones, comparador, analitica, stock, control de rotacion, pricing y herramientas para equipos de sala y direccion.'],
      ['Para quien es', 'Restaurantes independientes, hoteles, wine bars y grupos de restauracion que necesitan una carta mas rentable, actualizada y facil de explicar.'],
      ['Siguiente paso', 'La presentacion permite compartir la propuesta, descargar el deck y solicitar una demo para revisar el caso concreto de cada negocio.'],
    ],
    links: [['Demo', '/demo'], ['Producto', '/software-carta-de-vinos'], ['Funcionalidades', '/funcionalidades'], ['Analizar carta', '/analisis-carta']],
  },
  '/en/presentation': {
    lang: 'en',
    title: 'Winerim Presentation | Smart wine list software for restaurants',
    description: 'Official Winerim presentation for restaurants, hotels and groups: digital wine list, recommendations, analytics, stock, pricing and tools to sell more wine.',
    h1: 'Winerim presentation',
    subtitle: 'A wine list turned into a sales, management and decision system for restaurants, hotels and hospitality groups.',
    canonical: '/en/presentation',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Problem solved', 'Winerim turns static wine lists into operational tools connected to guest choice, sales, stock, margin and team recommendations.'],
      ['What is included', 'Digital wine list, wine cards, pairings, recommendations, comparator, analytics, stock, rotation control, pricing and tools for floor teams and management.'],
      ['Who it is for', 'Independent restaurants, hotels, wine bars and hospitality groups that need a more profitable, updated and easier-to-explain wine list.'],
      ['Next step', 'The presentation can be shared, downloaded as a deck and used to request a demo for a specific business case.'],
    ],
    links: [['Demo', '/en/demo'], ['Product', '/en/wine-list-management-software'], ['Features', '/en/features'], ['Analyze wine list', '/en/wine-list-analysis']],
  },
  '/it/presentazione': {
    lang: 'it',
    title: 'Presentazione Winerim | Software carta vini per ristoranti',
    description: 'Presentazione ufficiale di Winerim per ristoranti, hotel e gruppi: carta vini digitale, raccomandazioni, analytics, stock, pricing e strumenti per vendere piu vino.',
    h1: 'Presentazione Winerim',
    subtitle: 'La carta vini trasformata in uno strumento di vendita, gestione e decisione per ristoranti, hotel e gruppi.',
    canonical: '/it/presentazione',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Problema risolto', 'Winerim trasforma carte vini statiche e difficili da aggiornare in un sistema collegato a vendite, stock, margine e raccomandazioni in sala.'],
      ['Cosa include', 'Carta digitale, schede vino, abbinamenti, raccomandazioni, comparatore, analytics, stock, controllo rotazione, pricing e strumenti per sala e direzione.'],
      ['Per chi e', 'Ristoranti, hotel, wine bar e gruppi che hanno bisogno di una carta piu redditizia, aggiornata e facile da spiegare.'],
      ['Prossimo passo', 'La presentazione puo essere condivisa, scaricata come deck e usata per richiedere una demo sul caso concreto del locale.'],
    ],
    links: [['Demo', '/it/demo'], ['Prodotto', '/it/software-carta-vini'], ['Funzionalita', '/it/funzionalita'], ['Analisi carta', '/it/analisi-carta']],
  },
  '/fr/presentation': {
    lang: 'fr',
    title: 'Presentation Winerim | Logiciel de carte des vins pour restaurants',
    description: 'Presentation officielle de Winerim pour restaurants, hotels et groupes: carte des vins digitale, recommandations, analytics, stock, pricing et outils pour vendre plus de vin.',
    h1: 'Presentation Winerim',
    subtitle: 'La carte des vins transformee en outil de vente, de gestion et de decision pour restaurants, hotels et groupes.',
    canonical: '/fr/presentation',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Probleme resolu', 'Winerim transforme les cartes des vins statiques en systemes connectes au choix client, aux ventes, au stock, a la marge et aux recommandations en salle.'],
      ['Ce qui est inclus', 'Carte digitale, fiches vin, accords, recommandations, comparateur, analytics, stock, controle de rotation, pricing et outils pour equipes et direction.'],
      ['Pour qui', 'Restaurants, hotels, bars a vin et groupes qui veulent une carte plus rentable, a jour et facile a expliquer.'],
      ['Prochaine etape', 'La presentation peut etre partagee, telechargee comme deck et servir a demander une demo adaptee au cas concret.'],
    ],
    links: [['Demo', '/fr/demo'], ['Produit', '/fr/logiciel-carte-des-vins'], ['Fonctionnalites', '/fr/fonctionnalites'], ['Analyse carte', '/fr/analyse-carte']],
  },
  '/de/praesentation': {
    lang: 'de',
    title: 'Winerim Praesentation | Weinkarten-Software fuer Restaurants',
    description: 'Offizielle Winerim Praesentation fuer Restaurants, Hotels und Gruppen: digitale Weinkarte, Empfehlungen, Analytics, Bestand, Pricing und Tools fuer mehr Weinverkauf.',
    h1: 'Winerim Praesentation',
    subtitle: 'Die Weinkarte als Verkaufs-, Management- und Entscheidungssystem fuer Restaurants, Hotels und Gastronomiegruppen.',
    canonical: '/de/praesentation',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Geloestes Problem', 'Winerim macht aus statischen Weinkarten ein System, das Gaestewahl, Verkauf, Bestand, Marge und Empfehlungen im Service verbindet.'],
      ['Was enthalten ist', 'Digitale Weinkarte, Weinprofile, Pairings, Empfehlungen, Vergleich, Analytics, Bestand, Rotation, Pricing und Tools fuer Service und Management.'],
      ['Fuer wen', 'Restaurants, Hotels, Weinbars und Gruppen, die eine profitablere, aktuelle und leichter erklaerbare Weinkarte brauchen.'],
      ['Naechster Schritt', 'Die Praesentation kann geteilt, als Deck heruntergeladen und fuer eine konkrete Demo-Anfrage genutzt werden.'],
    ],
    links: [['Demo', '/de/demo'], ['Produkt', '/de/weinkarten-software'], ['Funktionen', '/de/funktionen'], ['Weinkarten-Analyse', '/de/weinkarten-analyse']],
  },
  '/pt/apresentacao': {
    lang: 'pt',
    title: 'Apresentacao Winerim | Software de carta de vinhos para restaurantes',
    description: 'Apresentacao oficial da Winerim para restaurantes, hoteis e grupos: carta de vinhos digital, recomendacoes, analytics, stock, pricing e ferramentas para vender mais vinho.',
    h1: 'Apresentacao Winerim',
    subtitle: 'A carta de vinhos transformada numa ferramenta de venda, gestao e decisao para restaurantes, hoteis e grupos.',
    canonical: '/pt/apresentacao',
    schemaType: 'WebPage',
    alternates: PRESENTATION_ALTERNATES,
    sections: [
      ['Problema resolvido', 'A Winerim transforma cartas estaticas num sistema ligado a escolha do cliente, vendas, stock, margem e recomendacoes da equipa.'],
      ['O que inclui', 'Carta digital, fichas de vinho, harmonizacoes, recomendacoes, comparador, analytics, stock, rotacao, pricing e ferramentas para sala e gestao.'],
      ['Para quem e', 'Restaurantes, hoteis, wine bars e grupos que precisam de uma carta mais rentavel, atualizada e facil de explicar.'],
      ['Proximo passo', 'A apresentacao pode ser partilhada, descarregada como deck e usada para pedir uma demo adaptada ao caso concreto.'],
    ],
    links: [['Demo', '/pt/demo'], ['Produto', '/pt/software-carta-vinhos'], ['Funcionalidades', '/pt/funcionalidades'], ['Analise carta', '/pt/analise-carta']],
  },
  '/distribuidor': {
    lang: 'es',
    title: 'Distribuidores Winerim | Partner comercial para hosteleria',
    description: 'Programa de distribucion Winerim para partners HORECA: software de carta de vinos, analisis de margen, stock, compras y soporte centralizado.',
    h1: 'Lleva Winerim a restaurantes, hoteles y grupos de tu mercado',
    subtitle: 'Un programa para partners HORECA que ya venden a hosteleria y quieren incorporar una plataforma de carta de vinos, stock, compras, margen y analitica.',
    canonical: '/distribuidor',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['Oportunidad HORECA', 'Muchos restaurantes gestionan carta, stock, compras y margenes con hojas de calculo, PDFs o decisiones dispersas. Eso crea referencias paradas, precios desactualizados y poca visibilidad para negociar.'],
      ['Modelo de partner', 'El distribuidor trabaja como partner B2B independiente, con materiales comerciales, soporte centralizado, acompanamiento en primeras demos y condiciones segun territorio.'],
      ['Perfil ideal', 'Encajan distribuidores de vino, consultores HORECA, empresas de software hospitality y profesionales con acceso real a restaurantes, hoteles, wine bars o grupos.'],
      ['Como empezar', 'Primero se revisan red, mercado y fit. Despues se prepara una demo, plan de territorio, acuerdo de distribucion y onboarding comercial con primeros clientes acompanados.'],
    ],
    links: [['Winerim Supply', '/producto/winerim-supply'], ['Winerim Core', '/producto/winerim-core'], ['Calculadora de margen', '/calculadora-margen-vino'], ['Demo', '/demo']],
  },
  '/en/distributor': {
    lang: 'en',
    title: 'Winerim Distributors | Commercial Partner for Hospitality',
    description: 'Winerim distribution program for HORECA partners: wine-list software, margin analysis, stock, purchasing and central support.',
    h1: 'Bring Winerim to restaurants, hotels and groups in your market',
    subtitle: 'A program for HORECA partners already selling into hospitality who want to add a platform for wine lists, stock, purchasing, margin and analytics.',
    canonical: '/en/distributor',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['Hospitality opportunity', 'Many restaurants still manage lists, stock, purchasing and margin with spreadsheets, PDFs or scattered decisions. That leaves slow references, outdated prices and weak negotiating visibility.'],
      ['Partner model', 'The distributor works as an independent B2B partner with commercial assets, central support, first-demo guidance and territory conditions defined by agreement.'],
      ['Ideal profile', 'Wine distributors, HORECA consultants, hospitality software companies and professionals with real access to restaurants, hotels, wine bars or groups fit best.'],
      ['How to start', 'We review network, market and fit first. Then we prepare a demo, territory plan, distribution agreement and commercial onboarding with first accounts supported.'],
    ],
    links: [['Winerim Supply', '/en/product/winerim-supply'], ['Winerim Core', '/en/product/winerim-core'], ['Wine margin calculator', '/en/wine-margin-calculator'], ['Request a demo', '/en/demo']],
  },
  '/it/distributore': {
    lang: 'it',
    title: 'Distributori Winerim | Partner commerciale per ospitalita',
    description: 'Programma di distribuzione Winerim per partner HORECA: software carta vini, analisi margini, stock, acquisti e supporto centrale.',
    h1: 'Porta Winerim a ristoranti, hotel e gruppi nel tuo mercato',
    subtitle: 'Un programma per partner HORECA che gia vendono alla ristorazione e vogliono aggiungere una piattaforma per carta vini, stock, acquisti, margini e analytics.',
    canonical: '/it/distributore',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['Opportunita HORECA', 'Molti ristoranti gestiscono carta, stock, acquisti e margini con fogli di calcolo, PDF o decisioni disperse. Questo lascia referenze ferme, prezzi non aggiornati e poca visibilita in negoziazione.'],
      ['Modello partner', 'Il distributore lavora come partner B2B indipendente con materiali commerciali, supporto centrale e condizioni di territorio definite per accordo.'],
      ['Profilo ideale', 'Distributori vino, consulenti HORECA, software hospitality e professionisti con accesso reale a ristoranti, hotel, wine bar o gruppi.'],
      ['Come iniziare', 'Si valutano rete, mercato e fit. Poi si prepara demo, piano territorio, accordo distributivo e onboarding commerciale con i primi clienti accompagnati.'],
    ],
    links: [['Winerim Supply', '/it/prodotto/winerim-supply'], ['Winerim Core', '/it/prodotto/winerim-core'], ['Calcolatrice margini vino', '/it/calcolatrice-margini-vino'], ['Richiedi demo', '/it/demo']],
  },
  '/fr/distributeur': {
    lang: 'fr',
    title: 'Distributeurs Winerim | Partenaire commercial HORECA',
    description: 'Programme distributeurs Winerim pour partenaires HORECA : logiciel carte des vins, marge, stock, achats et support central.',
    h1: 'Amenez Winerim aux restaurants, hotels et groupes de votre marche',
    subtitle: 'Un programme pour partenaires HORECA qui vendent deja a la restauration et veulent ajouter une plateforme carte des vins, stock, achats, marge et analytics.',
    canonical: '/fr/distributeur',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['Opportunite HORECA', 'Beaucoup de restaurants gerent encore carte, stock, achats et marges avec tableurs, PDF ou decisions dispersees. Cela laisse des references dormantes, des prix obsoletes et peu de visibilite pour negocier.'],
      ['Modele partenaire', 'Le distributeur travaille comme partenaire B2B independant avec supports commerciaux, accompagnement central et conditions de territoire definies par accord.'],
      ['Profil ideal', 'Distributeurs de vin, consultants HORECA, logiciels hospitality et professionnels avec acces reel aux restaurants, hotels, bars a vin ou groupes.'],
      ['Comment commencer', 'Nous validons reseau, marche et fit. Puis nous preparons demo, plan de territoire, accord de distribution et onboarding commercial avec premiers comptes accompagnes.'],
    ],
    links: [['Winerim Supply', '/fr/produit/winerim-supply'], ['Winerim Core', '/fr/produit/winerim-core'], ['Calculateur marge vin', '/fr/calculateur-marge-vin'], ['Demander une demo', '/fr/demo']],
  },
  '/de/haendler': {
    lang: 'de',
    title: 'Winerim Haendler | Vertriebspartner fuer Gastronomie',
    description: 'Winerim Distributionsprogramm fuer HORECA-Partner: Weinkarten-Software, Marge, Bestand, Einkauf und zentraler Support.',
    h1: 'Bringen Sie Winerim zu Restaurants, Hotels und Gruppen in Ihrem Markt',
    subtitle: 'Ein Programm fuer HORECA-Partner, die bereits an Gastronomie verkaufen und eine Plattform fuer Weinkarte, Bestand, Einkauf, Marge und Analytics ergaenzen wollen.',
    canonical: '/de/haendler',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['HORECA-Chance', 'Viele Restaurants verwalten Weinkarte, Bestand, Einkauf und Margen noch mit Tabellen, PDFs oder getrennten Entscheidungen. Das fuehrt zu langsamen Referenzen, veralteten Preisen und schwacher Verhandlungsbasis.'],
      ['Partnermodell', 'Der Haendler arbeitet als unabhaengiger B2B-Partner mit Vertriebsunterlagen, zentraler Unterstuetzung und gebietsbezogenen Bedingungen.'],
      ['Ideales Profil', 'Weindistributoren, HORECA-Berater, Hospitality-Softwareanbieter und Profis mit echtem Zugang zu Restaurants, Hotels, Weinbars oder Gruppen.'],
      ['So starten wir', 'Wir pruefen Netzwerk, Markt und Fit. Danach folgen Demo, Gebietsplan, Distributionsvertrag und kommerzielles Onboarding mit begleiteten ersten Accounts.'],
    ],
    links: [['Winerim Supply', '/de/produkt/winerim-supply'], ['Winerim Core', '/de/produkt/winerim-core'], ['Wein-Margenrechner', '/de/wein-margen-rechner'], ['Demo anfragen', '/de/demo']],
  },
  '/pt/distribuidor': {
    lang: 'pt',
    title: 'Distribuidores Winerim | Parceiro comercial para hotelaria',
    description: 'Programa de distribuicao Winerim para parceiros HORECA: software carta de vinhos, margem, stock, compras e suporte central.',
    h1: 'Leve a Winerim a restaurantes, hoteis e grupos no seu mercado',
    subtitle: 'Um programa para parceiros HORECA que ja vendem a restauracao e querem acrescentar uma plataforma de carta, stock, compras, margem e analitica.',
    canonical: '/pt/distribuidor',
    schemaType: 'WebPage',
    alternates: DISTRIBUTOR_ALTERNATES,
    sections: [
      ['Oportunidade HORECA', 'Muitos restaurantes ainda gerem carta, stock, compras e margens com folhas de calculo, PDFs ou decisoes desligadas. Isso deixa referencias paradas, precos desatualizados e pouca visibilidade para negociar.'],
      ['Modelo de parceiro', 'O distribuidor trabalha como parceiro B2B independente, com materiais comerciais, suporte central e condicoes de territorio definidas em acordo.'],
      ['Perfil ideal', 'Distribuidores de vinho, consultores HORECA, software de hotelaria e profissionais com acesso real a restaurantes, hoteis, wine bars ou grupos.'],
      ['Como comecar', 'Validamos rede, mercado e encaixe. Depois preparamos demo, plano de territorio, acordo de distribuicao e onboarding comercial com primeiras contas acompanhadas.'],
    ],
    links: [['Winerim Supply', '/pt/produto/winerim-supply'], ['Winerim Core', '/pt/produto/winerim-core'], ['Calculadora de margem', '/pt/calculadora-margem-vinho'], ['Pedir demo', '/pt/demo']],
  },
  '/aprender-vino': {
    lang: 'es',
    title: 'Aprender Vino desde Cero para Restaurantes | Winerim',
    description: 'Ruta para aprender vino desde cero: botella, cata, uvas, regiones, estilos, maridajes, servicio y decisiones de carta para equipos de sala.',
    h1: 'Aprender vino desde cero, aplicado a vender mejor en sala',
    subtitle: 'Una guia ordenada para que un equipo entienda una botella, describa un vino sin jerga, recomiende con seguridad y conecte conocimiento con margen, rotacion y experiencia del cliente.',
    canonical: '/aprender-vino',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Entender la botella', 'Etiqueta, origen, variedad, anada, crianza, estilo y precio ayudan al equipo a explicar por que un vino esta en carta.'],
      ['Catar y describir sin jerga', 'Aroma, acidez, cuerpo, tanino, dulzor, alcohol y final se traducen a lenguaje claro de sala.'],
      ['Conectar uvas, regiones y estilos', 'La Biblioteca del vino es la base de datos; Aprender vino es la ruta guiada para usarla en conversaciones reales.'],
      ['Recomendar por comida', 'El aprendizaje aterriza en maridajes practicos para pescado, carne, arroces, cocina asiatica, quesos, postres y platos de la casa.'],
      ['Servir y decidir mejor', 'Temperatura, copa, medidas, vino por copa, margen, rotacion y revision mensual convierten conocimiento en gestion.'],
      ['Guias publicadas', 'Aprender vino enlaza como catar, vocabulario, maridajes, tipos de vino, uvas para empezar, regiones vinicolas y recomendacion por estilos para usar en sala.'],
    ],
    links: [['Biblioteca', '/biblioteca-vino'], ['Glosario', '/biblioteca-vino/glosario'], ['Maridajes', '/biblioteca-vino/maridajes'], ['Catar vino en cinco pasos', '/article/como-catar-vino-en-cinco-pasos'], ['Vocabulario de cata', '/article/vocabulario-de-cata-de-vino'], ['Maridajes basicos', '/article/maridajes-basicos-para-restaurantes'], ['Tipos de vino', '/article/tipos-de-vino-para-entender-una-carta'], ['Uvas para empezar', '/article/uvas-que-conocer-para-empezar'], ['Regiones para empezar', '/article/regiones-vinicolas-para-empezar-en-restaurante'], ['Recomendar por estilos', '/article/recomendar-vino-por-estilos-restaurante'], ['Analizar carta', '/analisis-carta']],
  },
  '/en/learn-wine': {
    lang: 'en',
    title: 'Learn Wine from Scratch for Restaurants | Winerim',
    description: 'Practical wine learning path for restaurant teams: bottle basics, tasting, grapes, regions, styles, pairings, service and wine-list decisions.',
    h1: 'Learn wine from scratch and use it to sell better on the floor',
    subtitle: 'A clear path for teams to understand a bottle, describe wine without jargon, recommend with confidence and connect knowledge with margin, rotation and guest experience.',
    canonical: '/en/learn-wine',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Understand the bottle', 'Label, origin, grape, vintage, ageing, style and price help the team explain why a wine belongs on the list.'],
      ['Taste and describe without jargon', 'Aroma, acidity, body, tannin, sweetness, alcohol and finish become simple service language.'],
      ['Connect grapes, regions and styles', 'The Wine Library is the database; Learn Wine is the guided path for using it in real guest conversations.'],
      ['Recommend by food', 'Learning turns into practical pairings for fish, meat, rice, Asian cuisine, cheese, desserts and signature dishes.'],
      ['Serve and decide better', 'Temperature, glassware, pour size, by-the-glass strategy, margin, rotation and monthly review make learning operational.'],
      ['Published guides', 'Learn Wine links tasting, vocabulary, pairings, wine types, beginner grapes, wine regions and recommendation by style for restaurant service.'],
    ],
    links: [['Wine Library', '/en/wine-library'], ['Glossary', '/en/wine-library/glossary'], ['Pairings', '/en/wine-library/pairings'], ['Taste wine in five steps', '/en/article/how-to-taste-wine-in-five-steps'], ['Tasting vocabulary', '/en/article/wine-tasting-vocabulary'], ['Basic pairings', '/en/article/basic-food-and-wine-pairing-for-restaurants'], ['Wine types', '/en/article/types-of-wine-restaurant-wine-list'], ['Grapes to know', '/en/article/grapes-to-know-when-starting-with-wine'], ['Wine regions', '/en/article/wine-regions-to-know-for-restaurant-service'], ['Recommend by style', '/en/article/recommend-wine-by-style-restaurant'], ['Analyze list', '/en/wine-list-analysis']],
  },
  '/it/imparare-il-vino': {
    lang: 'it',
    title: 'Imparare il Vino da Zero per Ristoranti | Winerim',
    description: 'Percorso pratico per imparare il vino: bottiglia, degustazione, vitigni, regioni, stili, abbinamenti, servizio e decisioni di carta.',
    h1: 'Imparare il vino da zero e usarlo per vendere meglio in sala',
    subtitle: 'Un percorso ordinato per capire una bottiglia, descrivere un vino senza gergo, consigliare con sicurezza e collegare conoscenza, margine, rotazione ed esperienza cliente.',
    canonical: '/it/imparare-il-vino',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Capire la bottiglia', 'Etichetta, origine, vitigno, annata, affinamento, stile e prezzo aiutano il team a spiegare perche una referenza e in carta.'],
      ['Degustare e descrivere senza gergo', 'Aroma, acidita, corpo, tannino, dolcezza, alcol e finale diventano linguaggio semplice da sala.'],
      ['Collegare vitigni, regioni e stili', 'La Biblioteca del vino e la base dati; Imparare il vino e il percorso guidato per usarla in sala.'],
      ['Consigliare con il cibo', 'Il sapere diventa abbinamenti pratici per pesce, carne, riso, cucina asiatica, formaggi, dessert e piatti della casa.'],
      ['Servire e decidere meglio', 'Temperatura, calice, dosi, vino al calice, margine, rotazione e revisione mensile rendono operativo l apprendimento.'],
      ['Guide pubblicate', 'Imparare il vino collega degustazione, vocabolario, abbinamenti, tipi di vino, vitigni, regioni e raccomandazione per stile per la sala.'],
    ],
    links: [['Biblioteca', '/it/biblioteca-vino'], ['Glossario', '/it/biblioteca-vino/glossario'], ['Abbinamenti', '/it/biblioteca-vino/abbinamenti'], ['Degustare in cinque passaggi', '/it/article/come-degustare-il-vino-in-cinque-passaggi'], ['Vocabolario degustazione', '/it/article/vocabolario-degustazione-vino'], ['Abbinamenti base', '/it/article/abbinamenti-base-cibo-vino-per-ristoranti'], ['Tipi di vino', '/it/article/tipi-di-vino-per-capire-una-carta'], ['Vitigni per iniziare', '/it/article/vitigni-da-conoscere-per-iniziare'], ['Regioni vinicole', '/it/article/regioni-vinicole-da-conoscere-in-ristorante'], ['Consigliare per stile', '/it/article/raccomandare-vino-per-stile-ristorante'], ['Analisi carta', '/it/analisi-carta']],
  },
  '/fr/apprendre-le-vin': {
    lang: 'fr',
    title: 'Apprendre le Vin depuis Zero pour Restaurants | Winerim',
    description: 'Parcours pratique pour apprendre le vin : bouteille, degustation, cepages, regions, styles, accords, service et decisions de carte.',
    h1: 'Apprendre le vin depuis zero et mieux vendre en salle',
    subtitle: 'Un parcours clair pour comprendre une bouteille, decrire un vin sans jargon, recommander avec confiance et relier connaissance, marge, rotation et experience client.',
    canonical: '/fr/apprendre-le-vin',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Comprendre la bouteille', 'Etiquette, origine, cepage, millesime, elevage, style et prix aident l equipe a expliquer pourquoi un vin est a la carte.'],
      ['Deguster et decrire sans jargon', 'Aromes, acidite, corps, tanin, sucrosite, alcool et finale deviennent un langage simple pour le service.'],
      ['Relier cepages, regions et styles', 'La Bibliotheque du vin est la base de donnees; Apprendre le vin est le parcours guide pour l utiliser en salle.'],
      ['Recommander avec les plats', 'Le savoir devient accords pratiques pour poisson, viande, riz, cuisine asiatique, fromages, desserts et plats signature.'],
      ['Servir et mieux decider', 'Temperature, verre, dose, vin au verre, marge, rotation et revue mensuelle rendent l apprentissage operationnel.'],
      ['Guides publies', 'Apprendre le vin relie degustation, vocabulaire, accords, types de vin, cepages, regions et recommandation par style pour la salle.'],
    ],
    links: [['Bibliotheque', '/fr/bibliotheque-vin'], ['Glossaire', '/fr/bibliotheque-vin/glossaire'], ['Accords', '/fr/bibliotheque-vin/accords'], ['Deguster en cinq etapes', '/fr/article/comment-deguster-le-vin-en-cinq-etapes'], ['Vocabulaire de degustation', '/fr/article/vocabulaire-de-degustation-du-vin'], ['Accords de base', '/fr/article/accords-mets-vins-de-base-pour-restaurants'], ['Types de vin', '/fr/article/types-de-vin-pour-comprendre-une-carte'], ['Cepages pour commencer', '/fr/article/cepages-a-connaitre-pour-commencer'], ['Regions viticoles', '/fr/article/regions-viticoles-a-connaitre-en-restauration'], ['Recommander par style', '/fr/article/recommander-vin-par-style-restaurant'], ['Analyse carte', '/fr/analyse-carte']],
  },
  '/de/wein-lernen': {
    lang: 'de',
    title: 'Wein Lernen von Grund auf fuer Restaurants | Winerim',
    description: 'Praktischer Lernpfad fuer Restaurantteams: Flasche, Verkostung, Rebsorten, Regionen, Stile, Pairings, Service und Weinkartenentscheidungen.',
    h1: 'Wein von Grund auf lernen und im Service besser verkaufen',
    subtitle: 'Ein klarer Pfad, damit Teams eine Flasche verstehen, Wein ohne Fachjargon beschreiben, sicher empfehlen und Wissen mit Marge, Rotation und Gaesteerlebnis verbinden.',
    canonical: '/de/wein-lernen',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Die Flasche verstehen', 'Etikett, Herkunft, Rebsorte, Jahrgang, Ausbau, Stil und Preis helfen dem Team zu erklaeren, warum ein Wein auf der Karte steht.'],
      ['Verkosten und ohne Fachjargon beschreiben', 'Aroma, Saeure, Koerper, Tannin, Suesse, Alkohol und Abgang werden in einfache Servicesprache uebersetzt.'],
      ['Rebsorten, Regionen und Stile verbinden', 'Die Weinbibliothek ist die Datenbasis; Wein lernen ist der gefuehrte Pfad fuer den Service.'],
      ['Zum Essen empfehlen', 'Wissen wird zu praktischen Pairings fuer Fisch, Fleisch, Reisgerichte, asiatische Kueche, Kaese, Desserts und Signature-Gerichte.'],
      ['Besser servieren und entscheiden', 'Temperatur, Glas, Ausschankmenge, Glaswein, Marge, Rotation und Monatsreview machen Lernen operativ.'],
      ['Veroeffentlichte Leitfaeden', 'Wein lernen verbindet Verkostung, Vokabular, Pairings, Weinarten, Rebsorten, Regionen und Empfehlung nach Stil fuer den Service.'],
    ],
    links: [['Weinbibliothek', '/de/weinbibliothek'], ['Glossar', '/de/weinbibliothek/glossar'], ['Pairings', '/de/weinbibliothek/weinbegleitung'], ['In fuenf Schritten verkosten', '/de/article/wein-verkosten-in-fuenf-schritten'], ['Verkostungs-Vokabular', '/de/article/weinverkostung-vokabular'], ['Einfache Pairings', '/de/article/einfache-food-wine-pairings-fuer-restaurants'], ['Weinarten', '/de/article/weinarten-weinkarte-verstehen'], ['Rebsorten Einstieg', '/de/article/rebsorten-die-man-zum-einstieg-kennen-sollte'], ['Weinregionen', '/de/article/weinregionen-fuer-den-service-kennen'], ['Nach Stil empfehlen', '/de/article/wein-nach-stil-empfehlen-restaurant'], ['Analyse', '/de/weinkarten-analyse']],
  },
  '/pt/aprender-vinho': {
    lang: 'pt',
    title: 'Aprender Vinho do Zero para Restaurantes | Winerim',
    description: 'Percurso pratico para aprender vinho: garrafa, prova, castas, regioes, estilos, harmonizacoes, servico e decisoes de carta.',
    h1: 'Aprender vinho do zero e vender melhor na sala',
    subtitle: 'Um percurso claro para a equipa entender uma garrafa, descrever vinho sem jargao, recomendar com seguranca e ligar conhecimento a margem, rotacao e experiencia do cliente.',
    canonical: '/pt/aprender-vinho',
    schemaType: 'LearningResource',
    alternates: LEARN_WINE_ALTERNATES,
    sections: [
      ['Entender a garrafa', 'Rotulo, origem, casta, ano, estagio, estilo e preco ajudam a equipa a explicar porque um vinho esta na carta.'],
      ['Provar e descrever sem jargao', 'Aroma, acidez, corpo, tanino, docura, alcool e final tornam-se linguagem simples de sala.'],
      ['Ligar castas, regioes e estilos', 'A Biblioteca do vinho e a base de dados; Aprender vinho e o percurso guiado para usar essa base na sala.'],
      ['Recomendar com comida', 'O conhecimento torna-se harmonizacoes praticas para peixe, carne, arroz, cozinha asiatica, queijos, sobremesas e pratos da casa.'],
      ['Servir e decidir melhor', 'Temperatura, copo, dose, vinho a copo, margem, rotacao e revisao mensal tornam a aprendizagem operacional.'],
      ['Guias publicados', 'Aprender vinho liga prova, vocabulario, harmonizacoes, tipos de vinho, castas, regioes e recomendacao por estilos para a sala.'],
    ],
    links: [['Biblioteca', '/pt/biblioteca-vinho'], ['Glossario', '/pt/biblioteca-vinho/glossario'], ['Harmonizacoes', '/pt/biblioteca-vinho/harmonizacoes'], ['Provar em cinco passos', '/pt/article/como-provar-vinho-em-cinco-passos'], ['Vocabulario de prova', '/pt/article/vocabulario-de-prova-de-vinho'], ['Harmonizacoes basicas', '/pt/article/harmonizacoes-basicas-para-restaurantes'], ['Tipos de vinho', '/pt/article/tipos-de-vinho-para-entender-uma-carta'], ['Castas para comecar', '/pt/article/castas-para-conhecer-ao-comecar'], ['Regioes vinicolas', '/pt/article/regioes-vinicolas-para-conhecer-em-restaurante'], ['Recomendar por estilos', '/pt/article/recomendar-vinho-por-estilos-restaurante'], ['Analise carta', '/pt/analise-carta']],
  },
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
const WORKER_LEARN_WINE_SITEMAP_LASTMOD = '2026-06-30';
const WORKER_DISTRIBUTOR_SITEMAP_LASTMOD = '2026-07-01';
const WORKER_CLOUDRIM_SAVIA_SITEMAP_LASTMOD = '2026-07-03';
const WORKER_PRESENTATION_SITEMAP_LASTMOD = '2026-07-03';

const WORKER_TERMS_PATHS = {
  es: '/terminos-y-condiciones-del-contrato',
  en: '/en/terms',
  it: '/it/termini',
  fr: '/fr/conditions',
  de: '/de/agb',
  pt: '/pt/termos',
};

const WORKER_STATIC_HUMAN_ROUTES = new Set([
  '/politica-privacidad',
  '/terminos-y-condiciones-del-contrato',
]);

function escapeHtml(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sitemapAlternateLinks(site, alternates) {
  if (!alternates) return '';
  return Object.entries(alternates)
    .map(([lang, altPath]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${site}${altPath}"/>`)
    .join('\n');
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
    license: `${site}${WORKER_TERMS_PATHS[page.lang] || '/terminos-y-condiciones-del-contrato'}`,
    measurementTechnique: 'Aggregated and anonymized wine list analysis',
    variableMeasured: ['references per wine list', 'price ranges', 'by-the-glass offer', 'regions', 'grapes', 'styles', 'pairings', 'rotation', 'margin', 'dead stock signals'],
  }) : '';
  const schemaScripts = [`<script type="application/ld+json">${schema}</script>`, datasetSchema ? `<script type="application/ld+json">${datasetSchema}</script>` : ''].join('\n  ');
  const alternates = page.alternates || null;
  const alternateLinks = alternates ? Object.entries(alternates)
    .map(([lang, altPath]) => `<link rel="alternate" hreflang="${lang}" href="${site}${altPath}">`)
    .join('\n  ') : '';
  const navLinks = page.links
    .filter(([, url]) => isWorkerLinkVisible(url))
    .map(([label, url]) => `<a href="${site}${url}">${escapeHtml(label)}</a>`)
    .join(' | ');
  const sections = page.sections.map(([heading, body]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('\n      ');

  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="${escapeHtml(page.robots || 'index, follow')}">
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

function detailUrlBlock(site, path, lastmod, priority = '0.6', alternates = null) {
  const alternateLinks = sitemapAlternateLinks(site, alternates);
  return `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>${alternateLinks ? `\n${alternateLinks}` : ''}
  </url>
`;
}

const WORKER_DETAIL_SITEMAP_LASTMOD = '2026-06-05';
const WINE_LIBRARY_SITEMAP_LASTMOD = '2026-06-01';
const WORKER_TOOLS_SITEMAP_LASTMOD = '2026-07-02';

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
  const presentationPaths = [...new Set(Object.values(PRESENTATION_ALTERNATES))];
  const missingPresentationPaths = presentationPaths.filter(path => !xml.includes(`${site}${path}`));
  const barometerPaths = [...new Set(Object.values(BAROMETER_ALTERNATES))];
  const missingBarometerPaths = barometerPaths.filter(path => !xml.includes(`${site}${path}`));
  const learnWinePaths = [...new Set(Object.values(LEARN_WINE_ALTERNATES))];
  const missingLearnWinePaths = learnWinePaths.filter(path => !xml.includes(`${site}${path}`));
  const distributorPaths = [...new Set(Object.values(DISTRIBUTOR_ALTERNATES))];
  const missingDistributorPaths = distributorPaths.filter(path => !xml.includes(`${site}${path}`));
  const cloudRimSaviaPaths = [...new Set([
    ...Object.values(CLOUDRIM_ALTERNATES),
    ...Object.values(SAVIA_ALTERNATES),
  ])];
  const missingCloudRimSaviaPaths = cloudRimSaviaPaths.filter(path => !xml.includes(`${site}${path}`));
  const onlineToolPaths = ONLINE_TOOL_GROUPS.flatMap(group => Object.values(group.paths));
  const missingOnlineToolPaths = onlineToolPaths.filter(path => !xml.includes(`${site}${path}`));

  if (
    hasDetailUrls
    && missingPresentationPaths.length === 0
    && missingBarometerPaths.length === 0
    && missingLearnWinePaths.length === 0
    && missingDistributorPaths.length === 0
    && missingCloudRimSaviaPaths.length === 0
    && missingOnlineToolPaths.length === 0
  ) {
    return ensureWorkerSitemapAlternates(stabilizeSitemapLastmod(xml), site);
  }

  const blocks = [
    ...(hasDetailUrls ? [] : Object.keys(RESOURCE_DETAIL_PRERENDER_PAGES).map(slug => detailUrlBlock(site, `/recursos/${slug}`, WORKER_DETAIL_SITEMAP_LASTMOD))),
    ...(hasDetailUrls ? [] : Object.keys(BENCHMARK_DETAIL_PRERENDER_PAGES).map(slug => detailUrlBlock(site, `/benchmarks-playbooks/${slug}`, WORKER_DETAIL_SITEMAP_LASTMOD))),
    ...missingPresentationPaths.map(path => detailUrlBlock(site, path, WORKER_PRESENTATION_SITEMAP_LASTMOD, path === '/presentacion' ? '0.7' : '0.6', PRESENTATION_ALTERNATES)),
    ...missingBarometerPaths.map(path => detailUrlBlock(site, path, WORKER_BAROMETER_SITEMAP_LASTMOD, path === '/barometro-cartas-vino-2026' ? '0.8' : '0.7', BAROMETER_ALTERNATES)),
    ...missingLearnWinePaths.map(path => detailUrlBlock(site, path, WORKER_LEARN_WINE_SITEMAP_LASTMOD, path === '/aprender-vino' ? '0.8' : '0.7', LEARN_WINE_ALTERNATES)),
    ...missingDistributorPaths.map(path => detailUrlBlock(site, path, WORKER_DISTRIBUTOR_SITEMAP_LASTMOD, path === '/distribuidor' ? '0.7' : '0.6', DISTRIBUTOR_ALTERNATES)),
    ...missingCloudRimSaviaPaths.map(path => detailUrlBlock(site, path, WORKER_CLOUDRIM_SAVIA_SITEMAP_LASTMOD, path === '/producto/cloudrim' || path === '/producto/savia' ? '0.7' : '0.6', path.includes('savia') ? SAVIA_ALTERNATES : CLOUDRIM_ALTERNATES)),
    ...missingOnlineToolPaths.map(path => detailUrlBlock(site, path, WORKER_TOOLS_SITEMAP_LASTMOD, path.startsWith('/herramientas/') ? '0.7' : '0.6', ONLINE_TOOL_ALTERNATES_BY_PATH[path])),
  ].join('');

  const bridgedXml = xml.includes('</urlset>') ? xml.replace('</urlset>', `${blocks}</urlset>`) : `${xml}\n${blocks}`;
  return ensureWorkerSitemapAlternates(stabilizeSitemapLastmod(bridgedXml), site);
}

function addAlternatesToExistingSitemapUrl(xml, site, alternates) {
  return [...new Set(Object.values(alternates))].reduce((currentXml, path) => {
    const loc = `${site}${path}`;
    const pattern = new RegExp(`(<url>\\s*<loc>${escapeRegex(loc)}<\\/loc>)([\\s\\S]*?<\\/url>)`);
    return currentXml.replace(pattern, (match, start, rest) => {
      if (match.includes('<xhtml:link')) return match;
      return `${start}${rest.replace('</url>', `${sitemapAlternateLinks(site, alternates)}\n  </url>`)}`;
    });
  }, xml);
}

function ensureWorkerSitemapAlternates(xml, site) {
  return [
    PRESENTATION_ALTERNATES,
    CLOUDRIM_ALTERNATES,
    SAVIA_ALTERNATES,
  ].reduce((currentXml, alternates) => addAlternatesToExistingSitemapUrl(currentXml, site, alternates), xml);
}

// ─── NOINDEX routes (served but with noindex header) ───
const NOINDEX_ROUTES = new Set([
  '/meta-demo',
  '/gracias',
  '/unsubscribe',
  '/privacidad',
  '/politica-privacidad',
  '/terminos',
  '/terminos-y-condiciones-del-contrato',
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
  '/distribuidor',
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
  '/aprender-vino',
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
  '/presentacion',
  '/barometro-cartas-vino-2026',
  '/privacidad',
  '/politica-privacidad',
  '/terminos',
  '/terminos-y-condiciones-del-contrato',
  // Producto
  '/producto/inteligencia-dinamica',
  '/producto/winerim-core',
  '/producto/winerim-supply',
  '/producto/cloudrim',
  '/producto/savia',
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
  '/herramientas/simulador-senal-margenes',
  '/herramientas/test-perfil-rim',
  '/herramientas/simulador-pareto-carta-vinos',
  '/herramientas/calculadora-fuga-margen',
  '/herramientas/comparador-distribuidores',
  '/herramientas/calculadora-ticket-medio-vino',
  '/herramientas/auditor-carta-multilocal',
  '/herramientas/calculadora-compra-inteligente',
  ...ONLINE_TOOL_GROUPS.flatMap(group => Object.values(group.paths)),
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
  '/en/product/cloudrim',
  '/en/product/savia',
  '/en/privacy',
  '/en/terms',
  '/en/benchmarks-playbooks',
  '/en/presentation',
  '/en/wine-list-barometer-2026',
  '/en/comparisons',
  '/en/wine-list-analysis',
  '/en/learn-wine',
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
  '/en/tools/margin-signal-simulator',
  '/en/tools/rim-profile-test',
  '/en/tools/pareto-wine-list-simulator',
  '/en/tools/margin-leakage-calculator',
  '/en/tools/distributor-comparator',
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
  '/it/prodotto/cloudrim',
  '/it/prodotto/savia',
  '/it/privacy',
  '/it/termini',
  '/it/benchmarks-playbooks',
  '/it/barometro-carte-vini-2026',
  '/it/presentazione',
  '/it/confronti',
  '/it/analisi-carta',
  '/it/imparare-il-vino',
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
  '/it/strumenti/simulatore-segnale-margini',
  '/it/strumenti/test-profilo-rim',
  '/it/strumenti/simulatore-pareto-carta-vini',
  '/it/strumenti/calcolatrice-fuga-margine',
  '/it/strumenti/comparatore-distributori',
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
  '/fr/produit/cloudrim',
  '/fr/produit/savia',
  '/fr/confidentialite',
  '/fr/conditions',
  '/fr/benchmarks-playbooks',
  '/fr/barometre-cartes-vins-2026',
  '/fr/presentation',
  '/fr/comparatifs',
  '/fr/analyse-carte',
  '/fr/apprendre-le-vin',
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
  '/fr/outils/simulateur-signal-marges',
  '/fr/outils/test-profil-rim',
  '/fr/outils/simulateur-pareto-carte-vins',
  '/fr/outils/calculateur-fuite-marge',
  '/fr/outils/comparateur-distributeurs',
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
  '/de/haendler',
  '/de/karriere',
  '/de/produkt/dynamische-intelligenz',
  '/de/produkt/winerim-core',
  '/de/produkt/winerim-supply',
  '/de/produkt/cloudrim',
  '/de/produkt/savia',
  '/de/datenschutz',
  '/de/agb',
  '/de/benchmarks-playbooks',
  '/de/weinkarten-barometer-2026',
  '/de/praesentation',
  '/de/vergleiche',
  '/de/weinkarten-analyse',
  '/de/wein-lernen',
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
  '/de/tools/margensignal-simulator',
  '/de/tools/rim-profiltest',
  '/de/tools/pareto-weinkarten-simulator',
  '/de/tools/margenverlust-rechner',
  '/de/tools/distributoren-vergleich',
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
  '/pt/produto/cloudrim',
  '/pt/produto/savia',
  '/pt/privacidade',
  '/pt/termos',
  '/pt/benchmarks-playbooks',
  '/pt/barometro-cartas-vinhos-2026',
  '/pt/apresentacao',
  '/pt/comparativos',
  '/pt/analise-carta',
  '/pt/aprender-vinho',
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
  '/pt/ferramentas/simulador-sinal-margens',
  '/pt/ferramentas/teste-perfil-rim',
  '/pt/ferramentas/simulador-pareto-carta-vinhos',
  '/pt/ferramentas/calculadora-fuga-margem',
  '/pt/ferramentas/comparador-distribuidores',
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
function isCampaignHost(hostname) {
  return (hostname || '').toLowerCase() === 'go.winerim.wine';
}
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

function getXRobotsTag(path, hostname = '') {
  if (isCampaignHost(hostname)) return 'noindex, follow';
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
    const hostname = url.hostname.toLowerCase();
    const canonicalSite = env.SITE_URL || 'https://winerim.wine';

    // ── 0. Canonical host/scheme ──
    if (
      (hostname === 'winerim.wine' || hostname === 'www.winerim.wine')
      && (url.protocol === 'http:' || hostname === 'www.winerim.wine')
    ) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${canonicalSite}${path}${url.search}`,
          'Cache-Control': 'public, max-age=31536000',
          'X-Worker-Branch': 'canonical-host-scheme-redirect',
        },
      });
    }

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
        const site = env.SITE_URL || 'https://winerim.wine';
        const sitemapXml = stripUnreleasedSitemapUrls(
          injectWorkerDetailUrlsIntoSitemap(
            await res.text(),
            site,
          ),
          site,
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

    if (!isWorkerLinkVisible(path)) {
      return unreleasedArticleResponse();
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

    // ── 7. Legal static fallback for humans while Lovable frontend catches up ──
    if (WORKER_STATIC_HUMAN_ROUTES.has(path)) {
      const workerStaticHtml = renderWorkerStaticPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerStaticHtml) {
        const robotsTag = getXRobotsTag(path, hostname);
        const headers = {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
          'X-Worker-Branch': 'worker-static-human',
        };
        if (robotsTag) headers['X-Robots-Tag'] = robotsTag;
        return new Response(workerStaticHtml, {
          status: 200,
          headers,
        });
      }
    }

    // ── 8. Bot traffic → prerender ──
    if (isBot(ua)) {
      const workerStaticHtml = renderWorkerStaticPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerStaticHtml) {
        const robotsTag = getXRobotsTag(path, hostname);
        const headers = {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Prerendered': 'true',
          'X-Worker-Branch': 'worker-static-prerender',
        };
        if (robotsTag) headers['X-Robots-Tag'] = robotsTag;
        return new Response(workerStaticHtml, {
          status: 200,
          headers,
        });
      }

      const workerDetailHtml = renderWorkerDetailPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerDetailHtml) {
        const robotsTag = getXRobotsTag(path, hostname);
        const headers = {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Prerendered': 'true',
          'X-Worker-Branch': 'worker-detail-prerender',
        };
        if (robotsTag) headers['X-Robots-Tag'] = robotsTag;
        return new Response(workerDetailHtml, {
          status: 200,
          headers,
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
          const robotsTag = getXRobotsTag(path, hostname);
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
    const robotsTag = getXRobotsTag(path, hostname);
    const extra = { 'X-Worker-Branch': isBot(ua) ? 'bot-fallback' : 'spa' };
    if (robotsTag) extra['X-Robots-Tag'] = robotsTag;
    return proxyToOrigin(request, env, path, url.search, extra);
  },
};
