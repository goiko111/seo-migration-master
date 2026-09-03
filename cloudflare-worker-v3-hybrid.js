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
const BOT_REGEX = /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|chatgpt-user|gptbot|oai-searchbot|claudebot|anthropic-ai|perplexitybot|cohere-ai|bytespider|google-extended|ccbot|petalbot|sogou|exabot/i;

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
  '/simulador': '/simulador-carta',
  '/en/simulador': '/en/wine-list-simulator',
  '/en/simulador-carta': '/en/wine-list-simulator',
  '/it/simulador': '/it/simulatore-carta',
  '/it/simulador-carta': '/it/simulatore-carta',
  '/fr/simulador': '/fr/simulateur-carte',
  '/fr/simulador-carta': '/fr/simulateur-carte',
  '/de/simulador': '/de/weinkarten-simulator',
  '/de/simulador-carta': '/de/weinkarten-simulator',
  '/it/analisi-carta-vini': '/it/analisi-carta',
  '/fr/analyse-carte-vins': '/fr/analyse-carte',
  '/pt/analise-carta-de-vinhos': '/pt/analise-carta',
  '/de/software-weinkarte': '/de/weinkarten-software',
  '/pt/software-carta-de-vinhos': '/pt/software-carta-vinhos',
  '/de/wie-mehr-wein-verkaufen-restaurant': '/de/blog',
  '/pt/herramientas/calculadora-ticket-medio': '/pt/ferramentas/calculadora-ticket-medio',
  '/biblioteca-vino/como-empezar': '/aprender-vino',
  '/en/wine-library/how-to-start': '/en/learn-wine',
  '/it/biblioteca-vino/iniziare': '/it/imparare-il-vino',
  '/fr/bibliotheque-vin/debuter': '/fr/apprendre-le-vin',
  '/de/weinbibliothek/einsteigen': '/de/wein-lernen',
  '/pt/biblioteca-vinho/como-comecar': '/pt/aprender-vinho',
  '/sobre-nosotros': '/sobre-winerim',
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
  '/cours-vin-negocio-del-vino': '/fr/apprendre-le-vin',
  '/corso-vino-gestion-bodega-sommelier': '/it/imparare-il-vino',
  '/wine-course-bordeaux-profundidad': '/en/learn-wine',
  '/rechner-weinmargen': '/de/wein-margen-rechner',
  '/cepage-cabernet-sauvignon': '/fr/bibliotheque-vin/cepages/cabernet-sauvignon',
  '/blog/wie-viele-weine-weinkarte-restaurant': '/de/blog',
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
  '/casta-mencía': '/biblioteca-vino/uvas/mencia',
  '/casta-mencÃ­a': '/biblioteca-vino/uvas/mencia',
  '/biblioteca-vino/uvas/mencía': '/biblioteca-vino/uvas/mencia',
  '/biblioteca-vino/estilos/crémant': '/biblioteca-vino/estilos/cremant',
  '/biblioteca-vino/regiones/alemania/württemberg': '/biblioteca-vino/regiones/alemania/wurttemberg',
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
  let value = path;
  try {
    value = decodeURI(value);
  } catch (_) {
    value = path;
  }
  if (value.length <= 1 || !value.endsWith('/')) return value;
  return value.slice(0, -1);
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
  es: { regiones: 'regiones', uvas: 'uvas', estilos: 'estilos', maridajes: 'maridajes', 'guia-servicio': 'guia-servicio', glosario: 'glosario' },
  en: { regiones: 'regions', uvas: 'grapes', estilos: 'styles', maridajes: 'pairings', 'guia-servicio': 'service-guide', glosario: 'glossary' },
  it: { regiones: 'regioni', uvas: 'vitigni', estilos: 'stili', maridajes: 'abbinamenti', 'guia-servicio': 'guida-servizio', glosario: 'glossario' },
  fr: { regiones: 'regions', uvas: 'cepages', estilos: 'styles-de-vin', maridajes: 'accords', 'guia-servicio': 'guide-service', glosario: 'glossaire' },
  de: { regiones: 'regionen', uvas: 'rebsorten', estilos: 'weinstile', maridajes: 'weinbegleitung', 'guia-servicio': 'service-guide', glosario: 'glossar' },
  pt: { regiones: 'regioes', uvas: 'castas', estilos: 'estilos', maridajes: 'harmonizacoes', 'guia-servicio': 'guia-servico', glosario: 'glossario' },
};

const WINE_LIBRARY_SHELL_COPY = {
  es: {
    home: 'Biblioteca de vino',
    sections: { regiones: 'Regiones vinicolas', uvas: 'Variedades de uva', estilos: 'Estilos de vino', maridajes: 'Maridajes', 'guia-servicio': 'Guia de servicio', glosario: 'Glosario del vino' },
    detail: { regiones: 'region vinicola', uvas: 'variedad de uva', estilos: 'estilo de vino', maridajes: 'maridaje', 'guia-servicio': 'guia de servicio', glosario: 'termino de glosario', article: 'guia de vino' },
    description: (subject, type) => `${subject} en la biblioteca de vino de Winerim: ${type} para carta, servicio, venta y formacion en restaurante.`,
  },
  en: {
    home: 'Wine library',
    sections: { regiones: 'Wine regions', uvas: 'Grape varieties', estilos: 'Wine styles', maridajes: 'Wine pairings', 'guia-servicio': 'Service guide', glosario: 'Wine glossary' },
    detail: { regiones: 'wine region', uvas: 'grape variety', estilos: 'wine style', maridajes: 'wine pairing', 'guia-servicio': 'service guide', glosario: 'glossary term', article: 'wine guide' },
    description: (subject, type) => `${subject} in the Winerim wine library: ${type} for restaurant wine lists, service, sales and training.`,
  },
  it: {
    home: 'Biblioteca del vino',
    sections: { regiones: 'Regioni vinicole', uvas: 'Vitigni', estilos: 'Stili di vino', maridajes: 'Abbinamenti', 'guia-servicio': 'Guida di servizio', glosario: 'Glossario del vino' },
    detail: { regiones: 'regione vinicola', uvas: 'vitigno', estilos: 'stile di vino', maridajes: 'abbinamento', 'guia-servicio': 'guida di servizio', glosario: 'termine di glossario', article: 'guida vino' },
    description: (subject, type) => `${subject} nella biblioteca del vino Winerim: ${type} per carta vini, servizio, vendita e formazione.`,
  },
  fr: {
    home: 'Bibliotheque du vin',
    sections: { regiones: 'Regions viticoles', uvas: 'Cepages', estilos: 'Styles de vin', maridajes: 'Accords mets-vins', 'guia-servicio': 'Guide de service', glosario: 'Glossaire du vin' },
    detail: { regiones: 'region viticole', uvas: 'cepage', estilos: 'style de vin', maridajes: 'accord mets-vin', 'guia-servicio': 'guide de service', glosario: 'terme de glossaire', article: 'guide vin' },
    description: (subject, type) => `${subject} dans la bibliotheque du vin Winerim : ${type} pour carte des vins, service, vente et formation.`,
  },
  de: {
    home: 'Weinbibliothek',
    sections: { regiones: 'Weinregionen', uvas: 'Rebsorten', estilos: 'Weinstile', maridajes: 'Weinbegleitung', 'guia-servicio': 'Service-Guide', glosario: 'Weinglossar' },
    detail: { regiones: 'Weinregion', uvas: 'Rebsorte', estilos: 'Weinstil', maridajes: 'Weinbegleitung', 'guia-servicio': 'Service-Guide', glosario: 'Glossarbegriff', article: 'Wein-Guide' },
    description: (subject, type) => `${subject} in der Winerim Weinbibliothek: ${type} fuer Weinkarte, Service, Verkauf und Teamtraining.`,
  },
  pt: {
    home: 'Biblioteca do vinho',
    sections: { regiones: 'Regioes vinicolas', uvas: 'Castas', estilos: 'Estilos de vinho', maridajes: 'Harmonizacoes', 'guia-servicio': 'Guia de servico', glosario: 'Glossario do vinho' },
    detail: { regiones: 'regiao vinicola', uvas: 'casta', estilos: 'estilo de vinho', maridajes: 'harmonizacao', 'guia-servicio': 'guia de servico', glosario: 'termo de glossario', article: 'guia de vinho' },
    description: (subject, type) => `${subject} na biblioteca do vinho da Winerim: ${type} para carta, servico, venda e formacao.`,
  },
};

const WINE_LIBRARY_SHELL_TERM_LABELS = {
  albarino: { es: 'Albarino', en: 'Albarino', it: 'Albarino', fr: 'Albarino', de: 'Albarino', pt: 'Alvarinho' },
  mencia: { es: 'Mencia', en: 'Mencia', it: 'Mencia', fr: 'Mencia', de: 'Mencia', pt: 'Mencia' },
  xarello: { es: 'Xarel-lo', en: 'Xarel-lo', it: 'Xarel-lo', fr: 'Xarel-lo', de: 'Xarel-lo', pt: 'Xarel-lo' },
  'carnes-rojas': { es: 'Carnes rojas', en: 'Red meat', it: 'Carni rosse', fr: 'Viandes rouges', de: 'Rotes Fleisch', pt: 'Carnes vermelhas' },
  'pescados-y-mariscos': { es: 'Pescados y mariscos', en: 'Fish and seafood', it: 'Pesce e frutti di mare', fr: 'Poissons et fruits de mer', de: 'Fisch und Meeresfruechte', pt: 'Peixes e mariscos' },
  'lubina-dorada': { es: 'Lubina y dorada', en: 'Sea bass and sea bream', it: 'Branzino e orata', fr: 'Bar et dorade', de: 'Wolfsbarsch und Dorade', pt: 'Robalo e dourada' },
  'pasta-arroces-y-legumbres': { es: 'Pasta, arroces y legumbres', en: 'Pasta, rice and legumes', it: 'Pasta, riso e legumi', fr: 'Pates, riz et legumineuses', de: 'Pasta, Reis und Huelsenfruechte', pt: 'Massas, arroz e leguminosas' },
  'cocina-asiatica-y-fusion': { es: 'Cocina asiatica y fusion', en: 'Asian and fusion cuisine', it: 'Cucina asiatica e fusion', fr: 'Cuisine asiatique et fusion', de: 'Asiatische und Fusion-Kueche', pt: 'Cozinha asiatica e fusao' },
  quesos: { es: 'Quesos', en: 'Cheese', it: 'Formaggi', fr: 'Fromages', de: 'Kaese', pt: 'Queijos' },
  'queso-azul': { es: 'Queso azul', en: 'Blue cheese', it: 'Formaggio erborinato', fr: 'Fromage bleu', de: 'Blauschimmelkaese', pt: 'Queijo azul' },
  'queso-de-cabra': { es: 'Queso de cabra', en: 'Goat cheese', it: 'Formaggio di capra', fr: 'Fromage de chevre', de: 'Ziegenkaese', pt: 'Queijo de cabra' },
  'postres-y-chocolate': { es: 'Postres y chocolate', en: 'Desserts and chocolate', it: 'Dessert e cioccolato', fr: 'Desserts et chocolat', de: 'Desserts und Schokolade', pt: 'Sobremesas e chocolate' },
  'tapas-y-aperitivos': { es: 'Tapas y aperitivos', en: 'Tapas and appetizers', it: 'Tapas e antipasti', fr: 'Tapas et aperitifs', de: 'Tapas und Aperitifs', pt: 'Tapas e aperitivos' },
  'verduras-y-cocina-vegetariana': { es: 'Verduras y cocina vegetariana', en: 'Vegetables and vegetarian cuisine', it: 'Verdure e cucina vegetariana', fr: 'Legumes et cuisine vegetarienne', de: 'Gemuese und vegetarische Kueche', pt: 'Legumes e cozinha vegetariana' },
  'aves-y-caza': { es: 'Aves y caza', en: 'Poultry and game', it: 'Pollame e selvaggina', fr: 'Volailles et gibier', de: 'Gefluegel und Wild', pt: 'Aves e caca' },
  ostras: { es: 'Ostras', en: 'Oysters', it: 'Ostriche', fr: 'Huitres', de: 'Austern', pt: 'Ostras' },
  'cordero-asado': { es: 'Cordero asado', en: 'Roast lamb', it: 'Agnello arrosto', fr: 'Agneau roti', de: 'Lammbraten', pt: 'Borrego assado' },
  'solomillo-de-ternera': { es: 'Solomillo de ternera', en: 'Beef tenderloin', it: 'Filetto di manzo', fr: 'Filet de boeuf', de: 'Rinderfilet', pt: 'Lombo de vitela' },
  'risotto-setas': { es: 'Risotto de setas', en: 'Mushroom risotto', it: 'Risotto ai funghi', fr: 'Risotto aux champignons', de: 'Pilzrisotto', pt: 'Risotto de cogumelos' },
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
  '/article/como-usar-biblioteca-vino-para-vino-por-copa-y-rotacion': '2026-07-20T09:00:00+02:00',
  '/en/article/wine-library-by-the-glass-stock-rotation': '2026-07-20T09:05:00+02:00',
  '/it/article/biblioteca-vino-calice-stock-rotazione': '2026-07-20T09:10:00+02:00',
  '/fr/article/bibliotheque-vin-verre-stock-rotation': '2026-07-20T09:15:00+02:00',
  '/de/article/weinbibliothek-offenwein-bestand-rotation': '2026-07-20T09:20:00+02:00',
  '/pt/article/biblioteca-vinho-copo-stock-rotacao': '2026-07-20T09:25:00+02:00',
  '/article/como-leer-etiqueta-vino-restaurante': '2026-07-27T09:00:00+02:00',
  '/en/article/read-wine-label-restaurant': '2026-07-27T09:05:00+02:00',
  '/it/article/come-leggere-etichetta-vino-ristorante': '2026-07-27T09:10:00+02:00',
  '/fr/article/lire-etiquette-vin-restaurant': '2026-07-27T09:15:00+02:00',
  '/de/article/weinetikett-lesen-restaurant': '2026-07-27T09:20:00+02:00',
  '/pt/article/como-ler-rotulo-vinho-restaurante': '2026-07-27T09:25:00+02:00',
  '/article/como-conservar-una-botella-de-vino-abierta': '2026-08-03T09:00:00+02:00',
  '/en/article/how-to-preserve-an-open-bottle-of-wine': '2026-08-03T09:05:00+02:00',
  '/it/article/come-conservare-una-bottiglia-di-vino-aperta': '2026-08-03T09:10:00+02:00',
  '/fr/article/comment-conserver-une-bouteille-de-vin-ouverte': '2026-08-03T09:15:00+02:00',
  '/de/article/offene-weinflasche-aufbewahren': '2026-08-03T09:20:00+02:00',
  '/pt/article/como-conservar-uma-garrafa-de-vinho-aberta': '2026-08-03T09:25:00+02:00',
  '/article/mapa-sustituciones-vino-restaurante-biblioteca': '2026-08-10T09:00:00+02:00',
  '/en/article/wine-substitution-map-restaurant-wine-library': '2026-08-10T09:05:00+02:00',
  '/it/article/mappa-sostituzioni-vino-ristorante-biblioteca': '2026-08-10T09:10:00+02:00',
  '/fr/article/carte-substitution-vin-restaurant-bibliotheque': '2026-08-10T09:15:00+02:00',
  '/de/article/wein-substitutionskarte-restaurant-weinbibliothek': '2026-08-10T09:20:00+02:00',
  '/pt/article/mapa-substituicoes-vinho-restaurante-biblioteca': '2026-08-10T09:25:00+02:00',
  '/article/temperatura-servicio-vino-restaurante': '2026-08-17T09:00:00+02:00',
  '/en/article/wine-service-temperature-restaurant': '2026-08-17T09:05:00+02:00',
  '/it/article/temperatura-servizio-vino-ristorante': '2026-08-17T09:10:00+02:00',
  '/fr/article/temperature-service-vin-restaurant': '2026-08-17T09:15:00+02:00',
  '/de/article/serviertemperatur-wein-restaurant': '2026-08-17T09:20:00+02:00',
  '/pt/article/temperatura-servico-vinho-restaurante': '2026-08-17T09:25:00+02:00',
  '/article/matriz-maridaje-textura-acidez-grasa-restaurante': '2026-08-24T09:00:00+02:00',
  '/en/article/pairing-matrix-texture-acidity-fat-restaurant': '2026-08-24T09:05:00+02:00',
  '/it/article/matrice-abbinamenti-texture-acidita-grasso-ristorante': '2026-08-24T09:10:00+02:00',
  '/fr/article/matrice-accords-texture-acidite-gras-restaurant': '2026-08-24T09:15:00+02:00',
  '/de/article/pairing-matrix-textur-saeure-fett-restaurant': '2026-08-24T09:20:00+02:00',
  '/pt/article/matriz-harmonizacao-textura-acidez-gordura-restaurante': '2026-08-24T09:25:00+02:00',
  '/article/fugas-margen-carta-vinos-restaurante': '2026-08-31T09:00:00+02:00',
  '/en/article/wine-list-margin-leaks-restaurant': '2026-08-31T09:05:00+02:00',
  '/it/article/fughe-margine-carta-vini-ristorante': '2026-08-31T09:10:00+02:00',
  '/fr/article/fuites-marge-carte-vins-restaurant': '2026-08-31T09:15:00+02:00',
  '/de/article/margenverluste-weinkarte-restaurant': '2026-08-31T09:20:00+02:00',
  '/pt/article/fugas-margem-carta-vinhos-restaurante': '2026-08-31T09:25:00+02:00',
  '/article/arquitectura-carta-vinos-estilo-pais-precio-restaurante': '2026-09-07T09:00:00+02:00',
  '/en/article/restaurant-wine-list-architecture-style-country-price': '2026-09-07T09:05:00+02:00',
  '/it/article/architettura-carta-vini-stile-paese-prezzo-ristorante': '2026-09-07T09:10:00+02:00',
  '/fr/article/architecture-carte-vins-style-pays-prix-restaurant': '2026-09-07T09:15:00+02:00',
  '/de/article/weinkarten-architektur-stil-land-preis-restaurant': '2026-09-07T09:20:00+02:00',
  '/pt/article/arquitetura-carta-vinhos-estilo-pais-preco-restaurante': '2026-09-07T09:25:00+02:00',
  '/article/guiones-recomendacion-vino-sala': '2026-09-14T09:00:00+02:00',
  '/en/article/wine-recommendation-scripts-restaurant-floor': '2026-09-14T09:05:00+02:00',
  '/it/article/copioni-consigliare-vino-sala': '2026-09-14T09:10:00+02:00',
  '/fr/article/scripts-recommandation-vin-salle': '2026-09-14T09:15:00+02:00',
  '/de/article/weinempfehlung-service-skripte': '2026-09-14T09:20:00+02:00',
  '/pt/article/guioes-recomendacao-vinho-sala': '2026-09-14T09:25:00+02:00',
  '/article/stock-dormido-bodega-rotacion-tpv-cloudrim-savia': '2026-09-28T09:00:00+02:00',
  '/en/article/sleeping-cellar-stock-pos-cloudrim-savia-rotation': '2026-09-28T09:05:00+02:00',
  '/it/article/stock-dormiente-cantina-rotazione-tpv-cloudrim-savia': '2026-09-28T09:10:00+02:00',
  '/fr/article/stock-dormant-cave-rotation-tpv-cloudrim-savia': '2026-09-28T09:15:00+02:00',
  '/de/article/schlafender-kellerbestand-rotation-pos-cloudrim-savia': '2026-09-28T09:20:00+02:00',
  '/pt/article/stock-adormecido-adega-rotacao-pos-cloudrim-savia': '2026-09-28T09:25:00+02:00',
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

const ONLINE_TOOL_COPY_TEMPLATES = {
  es: {
    subtitle: (label) => `${label} para convertir una duda de carta en una decision operativa.`,
    problem: (focus) => `El problema aparece cuando ${focus} y el equipo decide con datos incompletos o desactualizados.`,
    usage: (label) => `Usa ${label} antes de cambiar precios, compras, copa, surtido o prioridades de venta.`,
    decision: (focus) => `Prepara una decision sobre ${focus}, conectandola despues con carta, stock, ventas, costes y margen en Winerim.`,
  },
  en: {
    subtitle: (label) => `${label} for turning a wine-list question into an operational decision.`,
    problem: (focus) => `The problem appears when ${focus} and the team is deciding with incomplete or outdated data.`,
    usage: (label) => `Use ${label} before changing prices, purchasing, by-the-glass strategy, assortment or sales priorities.`,
    decision: (focus) => `It prepares a decision about ${focus}, then connects it with wine list, stock, sales, cost and margin in Winerim.`,
  },
  it: {
    subtitle: (label) => `${label} per trasformare un dubbio di carta in una decisione operativa.`,
    problem: (focus) => `Il problema nasce quando ${focus} e il team decide con dati incompleti o non aggiornati.`,
    usage: (label) => `Usa ${label} prima di cambiare prezzi, acquisti, vino al calice, assortimento o priorita di vendita.`,
    decision: (focus) => `Prepara una decisione su ${focus}, collegandola poi a carta, stock, vendite, costi e margine in Winerim.`,
  },
  fr: {
    subtitle: (label) => `${label} pour transformer une question de carte en decision operationnelle.`,
    problem: (focus) => `Le probleme apparait quand ${focus} et que l equipe decide avec des donnees incompletes ou non actualisees.`,
    usage: (label) => `Utilisez ${label} avant de changer prix, achats, vin au verre, assortiment ou priorites de vente.`,
    decision: (focus) => `Il prepare une decision sur ${focus}, puis la relie a carte, stock, ventes, couts et marge dans Winerim.`,
  },
  de: {
    subtitle: (label) => `${label} um eine Weinkartenfrage in eine operative Entscheidung zu uebersetzen.`,
    problem: (focus) => `Das Problem entsteht, wenn ${focus} und das Team mit unvollstaendigen oder veralteten Daten entscheidet.`,
    usage: (label) => `Nutzen Sie ${label}, bevor Preise, Einkauf, Glasweinstrategie, Sortiment oder Verkaufsprioritaeten geaendert werden.`,
    decision: (focus) => `Es bereitet eine Entscheidung ueber ${focus} vor und verbindet sie danach in Winerim mit Karte, Bestand, Verkauf, Kosten und Marge.`,
  },
  pt: {
    subtitle: (label) => `${label} para transformar uma duvida de carta numa decisao operacional.`,
    problem: (focus) => `O problema aparece quando ${focus} e a equipa decide com dados incompletos ou desatualizados.`,
    usage: (label) => `Use ${label} antes de alterar precos, compras, vinho a copo, sortido ou prioridades de venda.`,
    decision: (focus) => `Prepara uma decisao sobre ${focus}, ligando-a depois a carta, stock, vendas, custos e margem na Winerim.`,
  },
};

const ONLINE_TOOL_COMPACT_GROUPS = [
  {
    key: 'wine-by-glass-price',
    paths: {
      es: '/herramientas/calculadora-precio-vino-por-copa',
      en: '/en/tools/wine-by-glass-price-calculator',
      it: '/it/strumenti/calcolatrice-prezzo-vino-al-calice',
      fr: '/fr/outils/calculateur-prix-vin-au-verre',
      de: '/de/tools/glaspreis-rechner',
      pt: '/pt/ferramentas/calculadora-preco-vinho-por-copo',
    },
    copy: {
      es: { label: 'Calculadora de precio por copa', description: 'Calcula el precio recomendado por copa teniendo en cuenta coste, merma y margen objetivo.', focus: 'precio por copa, merma y margen real' },
      en: { label: 'Wine by-the-glass price calculator', description: 'Calculate the recommended by-the-glass price using bottle cost, waste and target margin.', focus: 'by-the-glass price, waste and real margin' },
      it: { label: 'Calcolatrice prezzo vino al calice', description: 'Calcola il prezzo consigliato al calice considerando costo bottiglia, spreco e margine obiettivo.', focus: 'prezzo al calice, spreco e margine reale' },
      fr: { label: 'Calculateur prix vin au verre', description: 'Calculez le prix recommande au verre avec cout bouteille, pertes et marge cible.', focus: 'prix au verre, pertes et marge reelle' },
      de: { label: 'Glaspreis-Rechner', description: 'Berechnen Sie den empfohlenen Glaspreis mit Flaschenkosten, Schwund und Zielmarge.', focus: 'Glaspreis, Schwund und reale Marge' },
      pt: { label: 'Calculadora preço vinho por copo', description: 'Calcule o preço recomendado por copo usando custo da garrafa, quebra e margem-alvo.', focus: 'preço por copo, quebra e margem real' },
    },
  },
  {
    key: 'dead-stock',
    paths: {
      es: '/herramientas/calculadora-stock-muerto',
      en: '/en/tools/dead-stock-calculator',
      it: '/it/strumenti/calcolatrice-stock-morto',
      fr: '/fr/outils/calculateur-stock-mort',
      de: '/de/tools/totbestand-rechner',
      pt: '/pt/ferramentas/calculadora-stock-morto',
    },
    copy: {
      es: { label: 'Calculadora de stock muerto', description: 'Estima cuanto capital tienes inmovilizado en vinos con baja rotacion.', focus: 'stock inmovilizado, rotacion lenta y coste de oportunidad' },
      en: { label: 'Dead stock calculator', description: 'Estimate how much capital is tied up in slow-moving wines.', focus: 'tied-up stock, slow rotation and opportunity cost' },
      it: { label: 'Calcolatrice stock morto', description: 'Stima il capitale immobilizzato in vini a bassa rotazione.', focus: 'stock fermo, rotazione lenta e costo opportunita' },
      fr: { label: 'Calculateur stock mort', description: 'Estimez le capital immobilise dans les vins a faible rotation.', focus: 'stock dormant, rotation lente et cout opportunite' },
      de: { label: 'Totbestand-Rechner', description: 'Schaetzen Sie, wie viel Kapital in langsam rotierenden Weinen gebunden ist.', focus: 'gebundener Bestand, langsame Rotation und Opportunitaetskosten' },
      pt: { label: 'Calculadora de stock morto', description: 'Estime quanto capital esta imobilizado em vinhos de baixa rotacao.', focus: 'stock parado, rotacao lenta e custo de oportunidade' },
    },
  },
  {
    key: 'average-ticket',
    paths: {
      es: '/herramientas/calculadora-ticket-medio-vino',
      en: '/en/tools/average-ticket-calculator',
      it: '/it/strumenti/calcolatrice-scontrino-medio',
      fr: '/fr/outils/calculateur-ticket-moyen',
      de: '/de/tools/durchschnittsbon-rechner',
      pt: '/pt/ferramentas/calculadora-ticket-medio',
    },
    copy: {
      es: { label: 'Calculadora de ticket medio de vino', description: 'Mide el gasto medio en vino y simula el impacto de vender mejor por mesa.', focus: 'ticket medio, ratio de mesas con vino y venta sugerida' },
      en: { label: 'Average wine ticket calculator', description: 'Measure average wine spend and simulate the impact of better table-level selling.', focus: 'average ticket, table conversion and suggested selling' },
      it: { label: 'Calcolatrice scontrino medio vino', description: 'Misura lo scontrino medio vino e simula l impatto di vendere meglio per tavolo.', focus: 'scontrino medio, conversione tavoli e vendita suggerita' },
      fr: { label: 'Calculateur ticket moyen vin', description: 'Mesurez le ticket moyen vin et simulez l impact d une meilleure vente par table.', focus: 'ticket moyen, conversion des tables et vente suggeree' },
      de: { label: 'Durchschnittsbon-Rechner', description: 'Messen Sie den durchschnittlichen Weinbon und simulieren Sie bessere Tischverkaeufe.', focus: 'Durchschnittsbon, Tischquote und Empfehlung im Service' },
      pt: { label: 'Calculadora de ticket médio', description: 'Meça o ticket médio de vinho e simule o impacto de vender melhor por mesa.', focus: 'ticket médio, conversão de mesas e venda sugerida' },
    },
  },
  {
    key: 'smart-purchasing',
    paths: {
      es: '/herramientas/calculadora-compra-inteligente',
      en: '/en/tools/smart-purchasing-calculator',
      it: '/it/strumenti/calcolatrice-acquisto-intelligente',
      fr: '/fr/outils/calculateur-achat-intelligent',
      de: '/de/tools/intelligenter-einkauf-rechner',
      pt: '/pt/ferramentas/calculadora-compra-inteligente',
    },
    copy: {
      es: { label: 'Calculadora de compra inteligente', description: 'Evalua que comprar, cuanto comprar y cuando reponer segun rotacion, stock y margen.', focus: 'reposicion, volumen de compra, rotacion y margen' },
      en: { label: 'Smart purchasing calculator', description: 'Assess what to buy, how much to buy and when to reorder based on rotation, stock and margin.', focus: 'replenishment, purchase volume, rotation and margin' },
      it: { label: 'Calcolatrice acquisto intelligente', description: 'Valuta cosa comprare, quanto comprare e quando riordinare in base a rotazione, stock e margine.', focus: 'riordino, volume acquisto, rotazione e margine' },
      fr: { label: 'Calculateur achat intelligent', description: 'Evaluez quoi acheter, quelle quantite et quand recommander selon rotation, stock et marge.', focus: 'reassort, volume achat, rotation et marge' },
      de: { label: 'Intelligenter Einkaufsrechner', description: 'Bewerten Sie, was, wie viel und wann nachgekauft werden sollte, basierend auf Rotation, Bestand und Marge.', focus: 'Nachkauf, Einkaufsvolumen, Rotation und Marge' },
      pt: { label: 'Calculadora de compra inteligente', description: 'Avalie o que comprar, quanto comprar e quando repor segundo rotacao, stock e margem.', focus: 'reposicao, volume de compra, rotacao e margem' },
    },
  },
  {
    key: 'by-glass-diagnostic',
    paths: {
      es: '/herramientas/diagnostico-vino-por-copa',
      en: '/en/tools/by-glass-diagnostic',
      it: '/it/strumenti/diagnostico-vino-al-calice',
      fr: '/fr/outils/diagnostic-vin-au-verre',
      de: '/de/tools/glasausschank-diagnose',
      pt: '/pt/ferramentas/diagnostico-vinho-por-copo',
    },
    copy: {
      es: { label: 'Diagnostico de vino por copa', description: 'Evalua si tu programa por copa esta equilibrado en estilos, precios, rotacion y margen.', focus: 'programa por copa, equilibrio de estilos, precio y rotacion' },
      en: { label: 'By-the-glass wine diagnostic', description: 'Evaluate whether the by-the-glass program is balanced by style, price, rotation and margin.', focus: 'by-the-glass program, style balance, price and rotation' },
      it: { label: 'Diagnostico vino al calice', description: 'Valuta se il programma al calice e equilibrato per stili, prezzi, rotazione e margine.', focus: 'programma al calice, equilibrio stili, prezzo e rotazione' },
      fr: { label: 'Diagnostic vin au verre', description: 'Evaluez si le programme au verre est equilibre par styles, prix, rotation et marge.', focus: 'programme au verre, equilibre des styles, prix et rotation' },
      de: { label: 'Glasausschank-Diagnose', description: 'Bewerten Sie, ob das Glasweinprogramm nach Stil, Preis, Rotation und Marge ausgewogen ist.', focus: 'Glasweinprogramm, Stilbalance, Preis und Rotation' },
      pt: { label: 'Diagnostico vinho por copo', description: 'Avalie se o programa a copo esta equilibrado por estilos, precos, rotacao e margem.', focus: 'programa a copo, equilibrio de estilos, preco e rotacao' },
    },
  },
  {
    key: 'wine-list-score',
    paths: {
      es: '/herramientas/wine-list-score',
      en: '/en/tools/wine-list-score',
      it: '/it/strumenti/wine-list-score',
      fr: '/fr/outils/wine-list-score',
      de: '/de/tools/wine-list-score',
      pt: '/pt/ferramentas/wine-list-score',
    },
    copy: {
      es: { label: 'Wine List Score', description: 'Obtén una puntuacion de tu carta por diversidad, equilibrio, claridad comercial y potencial de venta.', focus: 'estructura de carta, diversidad, claridad y potencial comercial' },
      en: { label: 'Wine List Score', description: 'Score the list by diversity, balance, commercial clarity and selling potential.', focus: 'list structure, diversity, clarity and commercial potential' },
      it: { label: 'Wine List Score', description: 'Ottieni un punteggio della carta per diversita, equilibrio, chiarezza commerciale e potenziale vendita.', focus: 'struttura carta, diversita, chiarezza e potenziale commerciale' },
      fr: { label: 'Wine List Score', description: 'Obtenez un score de carte selon diversite, equilibre, clarte commerciale et potentiel de vente.', focus: 'structure de carte, diversite, clarte et potentiel commercial' },
      de: { label: 'Wine List Score', description: 'Bewerten Sie die Karte nach Vielfalt, Balance, kommerzieller Klarheit und Verkaufspotenzial.', focus: 'Kartenstruktur, Vielfalt, Klarheit und kommerzielles Potenzial' },
      pt: { label: 'Wine List Score', description: 'Obtenha uma pontuacao da carta por diversidade, equilibrio, clareza comercial e potencial de venda.', focus: 'estrutura da carta, diversidade, clareza e potencial comercial' },
    },
  },
  {
    key: 'multi-unit-auditor',
    paths: {
      es: '/herramientas/auditor-carta-multilocal',
      en: '/en/tools/multi-unit-auditor',
      it: '/it/strumenti/auditor-carta-multilocale',
      fr: '/fr/outils/auditeur-carte-multi-sites',
      de: '/de/tools/multi-standort-auditor',
      pt: '/pt/ferramentas/auditor-carta-multilocal',
    },
    copy: {
      es: { label: 'Auditor de carta multi-local', description: 'Compara cartas entre locales para detectar incoherencias de surtido, precios, copa y ticket.', focus: 'consistencia entre locales, surtido, precios y copa' },
      en: { label: 'Multi-unit wine list auditor', description: 'Compare wine lists across venues to detect assortment, pricing, by-the-glass and ticket inconsistencies.', focus: 'venue consistency, assortment, pricing and by-the-glass' },
      it: { label: 'Auditor carta multilocale', description: 'Confronta le carte tra locali per rilevare incoerenze di assortimento, prezzi, calice e scontrino.', focus: 'coerenza tra locali, assortimento, prezzi e calice' },
      fr: { label: 'Auditeur carte multi-sites', description: 'Comparez les cartes entre sites pour detecter incoherences de gamme, prix, verre et ticket.', focus: 'coherence entre sites, assortiment, prix et verre' },
      de: { label: 'Multi-Standort-Karten-Auditor', description: 'Vergleichen Sie Weinkarten ueber Standorte hinweg und finden Sie Sortiments-, Preis-, Glaswein- und Bon-Abweichungen.', focus: 'Standortkonsistenz, Sortiment, Preise und Glaswein' },
      pt: { label: 'Auditor de carta multilocal', description: 'Compare cartas entre unidades para detetar incoerencias de sortido, precos, copo e ticket.', focus: 'consistencia entre unidades, sortido, precos e copo' },
    },
  },
];

ONLINE_TOOL_GROUPS.push(
  {
    key: 'wine-list-simulator',
    paths: {
      es: '/simulador-carta',
      en: '/en/wine-list-simulator',
      it: '/it/simulatore-carta',
      fr: '/fr/simulateur-carte',
      de: '/de/weinkarten-simulator',
      pt: '/pt/simulador-carta',
    },
    copies: {
      es: {
        title: 'Simulador de carta de vinos | Winerim',
        h1: 'Simulador de carta de vinos para restaurantes',
        description: 'Simula una carta de vinos por estilos, precios, rotacion y margen para detectar oportunidades antes de cambiar la carta real.',
        subtitle: 'Una forma rapida de revisar surtido, equilibrio y decisiones de carta antes de tocar el servicio.',
        problem: 'Muchas cartas se cambian por intuicion: se anaden referencias, se mantienen vinos lentos y no se ve el impacto en margen, precio medio o rotacion.',
        usage: 'Usalo antes de redisenar la carta, abrir una nueva temporada, revisar vino por copa o preparar una conversacion de compra.',
        decision: 'El simulador ayuda a priorizar que conservar, impulsar, retirar, pasar a copa o revisar con datos de carta, stock, ventas y margen.',
      },
      en: {
        title: 'Wine List Simulator | Winerim',
        h1: 'Wine list simulator for restaurants',
        description: 'Simulate a restaurant wine list by style, price, rotation and margin before changing the live list.',
        subtitle: 'A quick way to review assortment, balance and list decisions before changing service.',
        problem: 'Many wine lists are changed by instinct: references are added, slow wines stay in place and the impact on margin, average price or rotation is unclear.',
        usage: 'Use it before redesigning the list, opening a new season, reviewing by-the-glass strategy or preparing a purchasing conversation.',
        decision: 'The simulator helps prioritize what to keep, push, remove, move by the glass or review using list, stock, sales and margin data.',
      },
      it: {
        title: 'Simulatore Carta Vini | Winerim',
        h1: 'Simulatore di carta vini per ristoranti',
        description: 'Simula una carta vini per stili, prezzi, rotazione e margine prima di modificare la carta reale.',
        subtitle: 'Un modo rapido per rivedere assortimento, equilibrio e decisioni di carta prima di cambiare il servizio.',
        problem: 'Molte carte cambiano per intuito: si aggiungono referenze, restano vini lenti e non si vede l impatto su margine, prezzo medio o rotazione.',
        usage: 'Usalo prima di ridisegnare la carta, aprire una stagione, rivedere il vino al calice o preparare gli acquisti.',
        decision: 'Il simulatore aiuta a decidere cosa tenere, spingere, ritirare, proporre al calice o rivedere con dati di carta, stock, vendite e margine.',
      },
      fr: {
        title: 'Simulateur de Carte des Vins | Winerim',
        h1: 'Simulateur de carte des vins pour restaurants',
        description: 'Simulez une carte des vins par styles, prix, rotation et marge avant de modifier la carte reelle.',
        subtitle: 'Une facon rapide de revoir assortiment, equilibre et decisions de carte avant de changer le service.',
        problem: 'Beaucoup de cartes changent a l intuition: des references sont ajoutees, les vins lents restent et l impact sur marge, prix moyen ou rotation reste flou.',
        usage: 'Utilisez-le avant de refaire la carte, lancer une saison, revoir le vin au verre ou preparer les achats.',
        decision: 'Le simulateur aide a choisir quoi garder, pousser, retirer, passer au verre ou revoir avec les donnees de carte, stock, ventes et marge.',
      },
      de: {
        title: 'Weinkarten-Simulator | Winerim',
        h1: 'Weinkarten-Simulator fuer Restaurants',
        description: 'Simulieren Sie eine Weinkarte nach Stil, Preis, Rotation und Marge, bevor die Live-Karte geaendert wird.',
        subtitle: 'Ein schneller Weg, Sortiment, Balance und Kartenentscheidungen vor dem Servicewechsel zu pruefen.',
        problem: 'Viele Karten werden aus dem Bauch heraus geaendert: Referenzen kommen dazu, langsame Weine bleiben und die Wirkung auf Marge, Durchschnittspreis oder Rotation ist unklar.',
        usage: 'Nutzen Sie es vor Kartenrelaunch, Saisonwechsel, Glasweinreview oder Einkaufsgespraech.',
        decision: 'Der Simulator priorisiert, was bleiben, gepusht, entfernt, glasweise angeboten oder mit Karten-, Bestands-, Verkaufs- und Margendaten geprueft werden sollte.',
      },
      pt: {
        title: 'Simulador de Carta de Vinhos | Winerim',
        h1: 'Simulador de carta de vinhos para restaurantes',
        description: 'Simule uma carta de vinhos por estilos, precos, rotacao e margem antes de alterar a carta real.',
        subtitle: 'Uma forma rapida de rever sortido, equilibrio e decisoes de carta antes de mudar o servico.',
        problem: 'Muitas cartas mudam por intuicao: adicionam-se referencias, vinhos lentos ficam e o impacto em margem, preco medio ou rotacao nao fica claro.',
        usage: 'Use antes de redesenhar a carta, abrir uma temporada, rever vinho a copo ou preparar compras.',
        decision: 'O simulador ajuda a decidir o que manter, promover, retirar, passar a copo ou rever com dados de carta, stock, vendas e margem.',
      },
    },
  },
  ...ONLINE_TOOL_COMPACT_GROUPS.map((group) => ({
    key: group.key,
    paths: group.paths,
    copies: Object.fromEntries(
      Object.entries(group.copy).map(([lang, copy]) => {
        const template = ONLINE_TOOL_COPY_TEMPLATES[lang];
        return [lang, {
          title: `${copy.label} | Winerim`,
          h1: copy.label,
          description: copy.description,
          subtitle: template.subtitle(copy.label),
          problem: template.problem(copy.focus),
          usage: template.usage(copy.label),
          decision: template.decision(copy.focus),
        }];
      }),
    ),
  })),
);

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

const LEGACY_TOOL_GROUPS = [
  {
    key: 'wine-list-analyzer',
    paths: {
      en: '/en/wine-list-analyzer',
      it: '/it/analizzatore-carta-vini',
      fr: '/fr/analyseur-carte-vins',
      de: '/de/weinkarten-analyzer',
      pt: '/pt/analisador-carta-vinhos',
    },
    copies: {
      en: {
        title: 'Wine List Analyzer | Winerim',
        h1: 'Wine list analyzer for restaurants',
        description: 'Analyze a restaurant wine list and detect opportunities in structure, pricing, variety, rotation and sales potential.',
        subtitle: 'A practical analyzer for turning a static wine list into a clearer operating decision.',
        problem: 'A wine list can look complete while hiding duplicated styles, weak price ladders, slow references and poor commercial hierarchy.',
        usage: 'Use it before a list review, seasonal change, pricing update, supplier negotiation or demo conversation.',
        decision: 'It helps prioritize structure, price ranges, by-the-glass candidates, dead stock, team recommendations and next actions in Winerim.',
      },
      it: {
        title: 'Analizzatore Carta Vini | Winerim',
        h1: 'Analizzatore di carta vini per ristoranti',
        description: 'Analizza una carta vini e individua opportunita in struttura, prezzi, varieta, rotazione e potenziale vendita.',
        subtitle: 'Un analizzatore pratico per trasformare una carta statica in una decisione operativa piu chiara.',
        problem: 'Una carta puo sembrare completa ma nascondere stili duplicati, scale prezzo deboli, referenze lente e gerarchia commerciale poco chiara.',
        usage: 'Usalo prima di una revisione carta, cambio stagione, aggiornamento prezzi, negoziazione fornitori o demo.',
        decision: 'Aiuta a priorizzare struttura, fasce prezzo, candidati al calice, stock fermo, raccomandazioni di sala e prossime azioni in Winerim.',
      },
      fr: {
        title: 'Analyseur de Carte des Vins | Winerim',
        h1: 'Analyseur de carte des vins pour restaurants',
        description: 'Analysez une carte des vins et detectez les opportunites de structure, prix, variete, rotation et potentiel de vente.',
        subtitle: 'Un analyseur pratique pour transformer une carte statique en decision operationnelle plus claire.',
        problem: 'Une carte peut sembler complete tout en cachant des styles dupliques, une echelle de prix fragile, des references lentes et une hierarchie commerciale faible.',
        usage: 'Utilisez-le avant une revue de carte, un changement de saison, une mise a jour des prix, une negociation fournisseur ou une demo.',
        decision: 'Il aide a prioriser structure, fourchettes de prix, candidats au verre, stock dormant, recommandations en salle et prochaines actions dans Winerim.',
      },
      de: {
        title: 'Weinkarten-Analyzer | Winerim',
        h1: 'Weinkarten-Analyzer fuer Restaurants',
        description: 'Analysieren Sie eine Weinkarte und finden Sie Chancen bei Struktur, Preis, Vielfalt, Rotation und Verkaufspotenzial.',
        subtitle: 'Ein praktischer Analyzer, der aus einer statischen Weinkarte eine klarere operative Entscheidung macht.',
        problem: 'Eine Karte kann vollstaendig wirken und dennoch doppelte Stile, schwache Preisstufen, langsame Referenzen und geringe Verkaufshierarchie verbergen.',
        usage: 'Nutzen Sie ihn vor Kartenreview, Saisonwechsel, Preisupdate, Lieferantengespraech oder Demo.',
        decision: 'Er priorisiert Struktur, Preisbereiche, Glasweinkandidaten, Totbestand, Serviceempfehlungen und naechste Aktionen in Winerim.',
      },
      pt: {
        title: 'Analisador de Carta de Vinhos | Winerim',
        h1: 'Analisador de carta de vinhos para restaurantes',
        description: 'Analise uma carta de vinhos e detete oportunidades em estrutura, precos, variedade, rotacao e potencial de venda.',
        subtitle: 'Um analisador pratico para transformar uma carta estatica numa decisao operacional mais clara.',
        problem: 'Uma carta pode parecer completa e esconder estilos duplicados, escadas de preco fracas, referencias lentas e pouca hierarquia comercial.',
        usage: 'Use antes de rever a carta, mudar temporada, atualizar precos, negociar fornecedores ou preparar uma demo.',
        decision: 'Ajuda a priorizar estrutura, faixas de preco, candidatos a copo, stock parado, recomendacoes da equipa e proximas acoes na Winerim.',
      },
    },
  },
  {
    key: 'wine-pairing-generator',
    paths: {
      en: '/en/wine-pairing-generator',
      it: '/it/generatore-abbinamenti-ia',
      fr: '/fr/generateur-accords-ia',
      de: '/de/weinbegleitung-generator',
      pt: '/pt/gerador-harmonizacoes-ia',
    },
    copies: {
      en: {
        title: 'Wine Pairing Generator | Winerim',
        h1: 'AI wine pairing generator for restaurants',
        description: 'Generate food and wine pairing ideas with practical explanations for restaurant service.',
        subtitle: 'A quick way to turn a dish into wine recommendations the team can explain at the table.',
        problem: 'Pairing fails when the team starts from color only and ignores sauce, fat, intensity, spice, sweetness and service context.',
        usage: 'Use it for specials, menu changes, staff training, by-the-glass planning or when a dish needs an easier recommendation.',
        decision: 'It prepares pairing options that can later connect with stock, margin, rotation and Winerim recommendations.',
      },
      it: {
        title: 'Generatore Abbinamenti IA | Winerim',
        h1: 'Generatore IA di abbinamenti vino per ristoranti',
        description: 'Genera idee di abbinamento cibo-vino con spiegazioni pratiche per il servizio.',
        subtitle: 'Un modo rapido per trasformare un piatto in raccomandazioni vino spiegabili al tavolo.',
        problem: 'L abbinamento fallisce quando il team parte solo dal colore e ignora salsa, grasso, intensita, spezie, dolcezza e contesto servizio.',
        usage: 'Usalo per piatti del giorno, cambi menu, formazione sala, vino al calice o quando serve una raccomandazione piu facile.',
        decision: 'Prepara opzioni di abbinamento che possono collegarsi poi a stock, margine, rotazione e raccomandazioni Winerim.',
      },
      fr: {
        title: 'Generateur d Accords IA | Winerim',
        h1: 'Generateur IA d accords mets et vins pour restaurants',
        description: 'Generez des idees d accords mets-vins avec explications pratiques pour le service.',
        subtitle: 'Une facon rapide de transformer un plat en recommandations vin faciles a expliquer a table.',
        problem: 'L accord echoue quand l equipe part seulement de la couleur et ignore sauce, gras, intensite, epices, sucre et contexte de service.',
        usage: 'Utilisez-le pour plats du jour, changements de menu, formation salle, vin au verre ou quand un plat demande une recommandation plus simple.',
        decision: 'Il prepare des options d accord qui peuvent ensuite se connecter au stock, a la marge, a la rotation et aux recommandations Winerim.',
      },
      de: {
        title: 'Speisenbegleitung-Generator | Winerim',
        h1: 'KI-Speisenbegleitung-Generator fuer Restaurants',
        description: 'Generieren Sie Food-Wine-Pairing-Ideen mit praktischen Erklaerungen fuer den Service.',
        subtitle: 'Ein schneller Weg, ein Gericht in Weinempfehlungen zu uebersetzen, die das Team am Tisch erklaeren kann.',
        problem: 'Pairing scheitert, wenn nur Farbe zaehlt und Sauce, Fett, Intensitaet, Schaerfe, Suesse und Servicekontext fehlen.',
        usage: 'Nutzen Sie es fuer Specials, Menuewechsel, Servicetraining, Glasweinplanung oder wenn ein Gericht eine einfachere Empfehlung braucht.',
        decision: 'Es bereitet Pairing-Optionen vor, die spaeter mit Bestand, Marge, Rotation und Winerim-Empfehlungen verbunden werden koennen.',
      },
      pt: {
        title: 'Gerador de Harmonizacoes IA | Winerim',
        h1: 'Gerador IA de harmonizacoes de vinho para restaurantes',
        description: 'Gere ideias de harmonizacao comida-vinho com explicacoes praticas para o servico.',
        subtitle: 'Uma forma rapida de transformar um prato em recomendacoes de vinho que a equipa consegue explicar.',
        problem: 'A harmonizacao falha quando a equipa parte apenas da cor e ignora molho, gordura, intensidade, especiarias, docura e contexto de servico.',
        usage: 'Use para pratos especiais, mudancas de menu, formacao de sala, vinho a copo ou quando um prato precisa de recomendacao mais simples.',
        decision: 'Prepara opcoes de harmonizacao que podem depois ligar-se a stock, margem, rotacao e recomendacoes Winerim.',
      },
    },
  },
];

const LEGACY_TOOL_ALTERNATES_BY_PATH = Object.fromEntries(
  LEGACY_TOOL_GROUPS.flatMap(group => {
    const alternates = { ...group.paths, 'x-default': group.paths.en };
    return Object.values(group.paths).map(path => [path, alternates]);
  }),
);

const LEGACY_TOOL_WORKER_PAGES = Object.fromEntries(
  LEGACY_TOOL_GROUPS.flatMap(group => {
    const alternates = { ...group.paths, 'x-default': group.paths.en };
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

const LEGAL_WORKER_PAGES = {
  "/politica-privacidad": {
    "lang": "es",
    "title": "Política de Privacidad · España | Winerim",
    "description": "Política de privacidad de Winerim para clientes, usuarios y visitantes en España.",
    "h1": "Política de Privacidad · España",
    "subtitle": "Documento independiente de privacidad para clientes, usuarios y visitantes en España. · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
    "canonical": "/politica-privacidad",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Documento",
        "Política de Privacidad"
      ],
      [
        "Territorio",
        "España"
      ],
      [
        "Responsable",
        "Basque Highlands S.L. · CIF B01729607"
      ],
      [
        "Domicilio",
        "Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, España"
      ],
      [
        "Contacto privacidad",
        "info@winerim.com"
      ],
      [
        "Baja contractual",
        "cancel@winerim.com"
      ],
      [
        "Marco",
        "RGPD · LOPDGDD · LSSI · Cookies"
      ],
      [
        "Versión",
        "Versión 4.0 · 7 de julio de 2026"
      ],
      [
        "1. Responsable del tratamiento y contacto",
        "El responsable del tratamiento será Basque Highlands S.L., con CIF B01729607, con domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim, respecto de los tratamientos propios descritos en esta Política.\n\nContacto para privacidad y ejercicio de derechos: info@winerim.com. Las solicitudes de baja contractual del servicio no se gestionan por este canal y deberán enviarse exclusivamente a cancel@winerim.com conforme a los Términos y Condiciones.\n\nDelegado de Protección de Datos: [NO DESIGNADO / DATOS_DPO], salvo que Winerim comunique otro dato en su web o documentación contractual."
      ],
      [
        "2. Ámbito de aplicación",
        "Esta Política regula los tratamientos de datos personales realizados por Basque Highlands S.L. en relación con Winerim para clientes ubicados en España, usuarios autorizados, usuarios finales, visitantes web, proveedores, partners y contactos comerciales.\n\nEsta Política se aplica a clientes profesionales, representantes, usuarios administradores, empleados o colaboradores del Cliente, usuarios finales que visualizan o interactúan con cartas digitales, visitantes de la web, leads comerciales, proveedores, partners, candidatos y otras personas que se relacionen con Winerim.\n\nCuando Winerim trate datos personales por cuenta del Cliente dentro de la Plataforma, Winerim actuará como encargado del tratamiento y el Cliente será responsable de determinar la base jurídica, finalidad y contenido de los datos que introduce en el Servicio. En esos casos se aplicará el Acuerdo de Encargo de Tratamiento incluido en los Términos o documento específico."
      ],
      [
        "3. Categorías de datos tratados",
        "• Datos identificativos y de contacto: nombre, apellidos, cargo, empresa, email, teléfono, dirección profesional, país e idioma.\n\n• Datos de cuenta y autenticación: usuarios, roles, permisos, credenciales cifradas o tokens, registros de acceso, cambios de configuración y logs de actividad.\n\n• Datos contractuales y de facturación: razón social, NIF/CIF/VAT/ID fiscal, domicilio, plan, precio, facturas, pagos, método de pago, vencimientos, renovaciones, bajas, impagos y comunicaciones comerciales.\n\n• Datos de carta y negocio: referencias de vino, precios, añadas, stock, ventas, rotación, disponibilidad, imágenes, descripciones, maridajes, filtros, visualizaciones, favoritos, recomendaciones, interacciones y métricas operativas.\n\n• Datos técnicos: IP, identificadores de dispositivo, navegador, sistema operativo, cookies, eventos, logs, errores, rendimiento, seguridad, geolocalización aproximada y datos de uso.\n\n• Datos de soporte: tickets, emails, conversaciones, incidencias, adjuntos, capturas, grabaciones o notas cuando se faciliten o sean necesarias para atender la solicitud.\n\n• Datos comerciales: preferencias, intereses, participación en demos, newsletters, eventos, comunicaciones, campañas y relación con ventas.\n\n• Datos de candidatos, proveedores o partners: currículum, experiencia, datos profesionales, propuestas, contratos, facturas, pagos y comunicaciones."
      ],
      [
        "4. Fuentes de los datos",
        "Los datos pueden proceder directamente del interesado, del Cliente, de usuarios autorizados, de formularios web, procesos de contratación, emails, llamadas, demos, soporte, facturas, integraciones, proveedores de pago, tiendas de aplicaciones, herramientas de analítica, sistemas de seguridad, partners, fuentes públicas profesionales o del uso de la Plataforma."
      ],
      [
        "5. Finalidades del tratamiento",
        "• gestionar altas, cuentas, usuarios, autenticación, permisos y relación contractual;\n\n• prestar, mantener, configurar, personalizar y mejorar la Plataforma Winerim;\n\n• cargar, publicar, visualizar y gestionar cartas de vino digitales, QR, web, app y paneles;\n\n• gestionar pagos, facturación, impuestos, contabilidad, renovaciones, bajas, impagos y contracargos;\n\n• prestar soporte, resolver incidencias, comunicar cambios, enviar avisos de servicio, seguridad o facturación;\n\n• analizar stock, ventas, rotación, disponibilidad, interacciones, preferencias, filtros y rendimiento de la carta para ofrecer paneles, recomendaciones, estadísticas, benchmarking e inteligencia de negocio;\n\n• desarrollar, entrenar, probar y mejorar sistemas internos de análisis, recomendación, clasificación, maridaje, traducción, normalización, búsqueda e IA, preferentemente con datos agregados, anonimizados o disociados cuando sea viable;\n\n• prevenir fraude, abuso, scraping, crawling, ingeniería inversa, extracción automatizada, accesos indebidos, uso competitivo no autorizado, incidentes de seguridad y actividades ilícitas;\n\n• enviar comunicaciones comerciales B2B sobre Winerim, novedades, funcionalidades, contenidos, eventos o servicios similares, cuando exista base legal;\n\n• cumplir obligaciones legales, atender requerimientos de autoridades, conservar evidencias, defender derechos, gestionar auditorías, operaciones corporativas o reclamaciones."
      ],
      [
        "6. Bases jurídicas",
        "Los tratamientos se basan en el RGPD, la LOPDGDD y demás normativa española y europea aplicable. No todos los datos de carta, stock, ventas o bodega son datos personales; cuando sean datos empresariales o agregados podrán tratarse conforme al contrato, interés legítimo o ausencia de identificación personal.\n\n• Ejecución de contrato o medidas precontractuales: alta, acceso al Servicio, soporte, facturación contractual y gestión de la relación con clientes.\n\n• Cumplimiento de obligaciones legales: contabilidad, fiscalidad, facturación, conservación de registros, atención de autoridades y obligaciones regulatorias.\n\n• Interés legítimo: seguridad, prevención de fraude, mejora del Servicio, analítica interna, comunicaciones B2B, defensa de reclamaciones, uso de datos empresariales no personales, estadísticas agregadas, protección de activos, prevención de scraping e ingeniería inversa.\n\n• Consentimiento: cookies no necesarias, newsletters no amparadas por otra base, funcionalidades opcionales y tratamientos voluntarios.\n\n• Instrucciones del Cliente: cuando Winerim actúe como encargado del tratamiento respecto de datos personales tratados por cuenta del Cliente."
      ],
      [
        "7. Visualización pública de cartas de vino",
        "La finalidad esencial de Winerim es permitir que los Clientes muestren públicamente sus cartas de vinos en formato digital. Por ello, datos como referencias, precios, añadas, imágenes, descripciones, maridajes y disponibilidad podrán ser visibles para comensales, visitantes y usuarios finales desde enlaces, códigos QR, apps, webs o páginas asociadas al Servicio.\n\nEn principio, esta información tiene naturaleza empresarial o comercial. Si el Cliente incluye datos personales dentro de la carta o de sus contenidos, será responsable de contar con base legal y de no publicar información innecesaria o no autorizada."
      ],
      [
        "8. Uso de datos de ventas, stock, analítica e IA",
        "Winerim podrá tratar datos de ventas, stock, rotación, disponibilidad, interacciones, filtros, visualizaciones, preferencias y rendimiento comercial para prestar el Servicio, mostrar analítica al Cliente, mejorar recomendaciones, detectar errores, desarrollar funcionalidades y optimizar la experiencia.\n\nWinerim podrá utilizar datos agregados, anonimizados, disociados o no personales para análisis sectorial, benchmarking, informes internos o externos, inteligencia de mercado, entrenamiento o mejora de modelos, estadísticas, comunicaciones comerciales y mejora del producto, sin identificar razonablemente a personas físicas ni publicar datos individualizados sensibles de un Cliente sin autorización o base legal suficiente.\n\nWinerim no vende datos personales. Tampoco publicará datos individualizados de ventas, stock, márgenes o rendimiento económico identificando directamente al Cliente sin autorización o necesidad contractual/legal.\n\nEsta Política no concede al Cliente ni a usuarios autorizados ningún derecho para extraer, copiar, vender, revender, licenciar, ceder, transferir, publicar, comercializar, entrenar modelos de IA, crear datasets, explotar bases de datos, alimentar sistemas externos o aprovechar fuera de Winerim datos, contenidos, estructuras, taxonomías, modelos, recomendaciones, métricas, informes, benchmarks, visualizaciones o activos de Winerim. Estas restricciones se regulan en los Términos y Condiciones."
      ],
      [
        "9. Inteligencia artificial y decisiones automatizadas",
        "Winerim puede utilizar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, generar o sugerir descripciones, traducir, crear maridajes, ordenar resultados, recomendar vinos, detectar patrones, mejorar búsquedas, detectar errores y ofrecer analítica.\n\nEstas funcionalidades son de apoyo y pueden cometer errores. No producen decisiones legales o efectos significativamente similares sobre personas físicas. El Cliente debe revisar información crítica antes de utilizarla comercialmente.\n\nCuando se utilicen datos personales en sistemas automatizados, Winerim procurará aplicar minimización, seudonimización, anonimización o agregación cuando sea viable y proporcionado."
      ],
      [
        "10. Destinatarios, proveedores y subencargados",
        "Winerim podrá compartir datos con proveedores que prestan servicios necesarios, incluyendo hosting cloud, almacenamiento, seguridad, monitorización, email, soporte, analítica, pagos, facturación, inteligencia artificial, traducción, gestión de errores, tiendas de aplicaciones, integraciones, asesoría legal, fiscal, contable, auditoría y otros servicios auxiliares.\n\nStripe u otros proveedores de pago tratarán datos necesarios para pagos, suscripciones, facturación, prevención de fraude, cumplimiento financiero y obligaciones regulatorias conforme a sus propias condiciones y políticas.\n\nApple, Google u operadores de tiendas de aplicaciones podrán tratar datos cuando el usuario descargue o utilice aplicaciones móviles desde sus entornos.\n\nTambién podrán comunicarse datos a autoridades, juzgados, administraciones públicas, fuerzas de seguridad, asesores, auditores, compradores, inversores o terceros en operaciones corporativas cuando exista obligación legal, requerimiento válido, defensa de derechos, prevención de fraude, interés legítimo o base suficiente.\n\nEl listado concreto de proveedores y subencargados relevantes deberá mantenerse actualizado y estar disponible previa solicitud razonable o en una página específica de Winerim. En materia de pagos y cookies vinculadas al cobro, el proveedor identificado actualmente es Stripe."
      ],
      [
        "11. Transferencias internacionales",
        "Basque Highlands S.L. puede utilizar proveedores o entidades ubicadas fuera del Espacio Económico Europeo, incluyendo proveedores cloud, pagos, soporte, analítica o inteligencia artificial. También podrá existir acceso o soporte por Winerim LLC si interviene en la prestación internacional del Servicio.\n\nCuando los datos personales estén sujetos al RGPD y se transfieran fuera del Espacio Económico Europeo a países sin decisión de adecuación, Winerim aplicará garantías adecuadas, como cláusulas contractuales tipo aprobadas por la Comisión Europea, medidas suplementarias, decisiones de adecuación, certificaciones u otros mecanismos válidos."
      ],
      [
        "12. Plazos de conservación",
        "• Datos de cuenta y contrato: mientras exista relación contractual y posteriormente durante los plazos necesarios para obligaciones legales, contables, fiscales y defensa de reclamaciones.\n\n• Datos de facturación: durante los plazos exigidos por normativa fiscal, mercantil y contable aplicable.\n\n• Solicitudes de baja y comunicaciones contractuales: durante el plazo necesario para acreditar su recepción, tramitación, efectos y posibles reclamaciones.\n\n• Datos de soporte: durante el tiempo necesario para atender la consulta o incidencia y posteriormente durante un plazo razonable para seguimiento, calidad, seguridad y defensa.\n\n• Logs técnicos y de seguridad: durante periodos proporcionados a seguridad, diagnóstico, prevención de fraude, abuso, scraping y mejora del Servicio.\n\n• Datos de cartas, stock, ventas y operativa: mientras la cuenta esté activa y durante un periodo posterior razonable para exportación, recuperación, copias de seguridad, cumplimiento legal o reclamaciones.\n\n• Datos agregados, anonimizados o disociados: podrán conservarse indefinidamente porque no permiten identificar razonablemente a una persona física."
      ],
      [
        "13. Derechos de las personas",
        "Las personas interesadas podrán ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad, retirada del consentimiento y derecho a no ser objeto de decisiones automatizadas cuando proceda conforme al RGPD.\n\nLas solicitudes deberán enviarse a info@winerim.com indicando el derecho ejercitado, identidad del solicitante y datos necesarios para tramitar la petición. Winerim podrá solicitar información adicional para verificar la identidad o legitimación del solicitante.\n\nCuando Winerim actúe como encargado del tratamiento, podrá remitir la solicitud al Cliente responsable del tratamiento o asistirle en su respuesta, según proceda."
      ],
      [
        "14. Seguridad",
        "Winerim aplicará medidas técnicas y organizativas razonables para proteger los datos personales y la Plataforma frente a acceso no autorizado, pérdida, alteración, divulgación, uso indebido, scraping, extracción automatizada, ingeniería inversa, abuso de cuentas y otros riesgos proporcionados al contexto del Servicio.\n\nNingún sistema es absolutamente seguro. El Cliente debe custodiar credenciales, configurar permisos, formar a sus usuarios y notificar de inmediato cualquier incidente, pérdida de acceso o sospecha de uso indebido."
      ],
      [
        "15. Cookies y tecnologías similares",
        "Actualmente Winerim no utiliza cookies analíticas, publicitarias o de marketing propias. La Plataforma podrá utilizar cookies técnicas propias estrictamente necesarias para autenticación, sesión, seguridad, prevención de abuso y funcionamiento ordinario del Servicio. En materia de pagos, Winerim utiliza Stripe como proveedor externo, que puede instalar o utilizar cookies y tecnologías similares necesarias para procesar pagos, gestionar suscripciones, prevenir fraude, reforzar la seguridad y cumplir obligaciones financieras o regulatorias.\n\nSi en el futuro Winerim incorporara cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, se informará al usuario y se habilitará el mecanismo de aceptación, rechazo o configuración cuando legalmente corresponda. Rechazar cookies no necesarias no impedirá el uso básico del Servicio cuando dichas cookies no sean imprescindibles."
      ],
      [
        "16. Menores, alcohol y responsabilidad del Cliente",
        "Winerim no está dirigida a menores ni vende bebidas alcohólicas. La Plataforma es una herramienta tecnológica para profesionales de hostelería. El Cliente es responsable de cumplir la normativa aplicable sobre venta, promoción, edad legal, servicio responsable y consumo de alcohol en su jurisdicción."
      ],
      [
        "17. Comunicaciones comerciales",
        "Winerim podrá enviar comunicaciones de servicio, soporte, seguridad, facturación y cambios contractuales. También podrá enviar comunicaciones comerciales B2B sobre productos, servicios, eventos, contenidos o novedades relacionados con Winerim cuando exista base legal. El destinatario podrá oponerse o darse de baja de comunicaciones comerciales cuando proceda, sin que ello afecte a comunicaciones contractuales necesarias."
      ],
      [
        "18. Reclamaciones y autoridad de control",
        "Las personas interesadas tienen derecho a presentar una reclamación ante la Agencia Española de Protección de Datos si consideran que el tratamiento no se ajusta a la normativa aplicable, sin perjuicio de intentar previamente una solución con Winerim."
      ],
      [
        "19. Cambios en esta Política",
        "Winerim podrá actualizar esta Política para reflejar cambios legales, técnicos, operativos, de proveedores, funcionalidades, tratamientos, estructura societaria o modelo de negocio. Cuando los cambios sean relevantes, se comunicarán por medios razonables, como web, Plataforma, email o documentación contractual."
      ],
      [
        "20. Anexo: resumen operativo de tratamientos",
        "Tratamiento\n\nFinalidad\n\nBase\n\nCuenta y contrato\n\nAlta, acceso, soporte, facturación y relación contractual\n\nContrato / interés legítimo / obligación legal\n\nCarta digital\n\nPublicar y gestionar carta de vinos del Cliente\n\nContrato / interés legítimo del Cliente\n\nStock, ventas y analítica\n\nPaneles, recomendaciones, estadísticas, benchmarking y mejora del producto\n\nContrato / interés legítimo / datos agregados\n\nIA y automatización\n\nClasificación, maridajes, descripciones, traducción y mejora de modelos\n\nContrato / interés legítimo / consentimiento si aplica\n\nSeguridad y antifraude\n\nPrevenir scraping, ingeniería inversa, abuso y accesos indebidos\n\nInterés legítimo / obligación legal\n\nCookies técnicas y Stripe\n\nFuncionamiento técnico del Servicio y cookies/tecnologías de Stripe vinculadas al proceso de pago y prevención de fraude\n\nContrato / interés legítimo / obligación legal; consentimiento si en el futuro se activan cookies no necesarias\n\nPagos y facturación\n\nCobros, impuestos, contabilidad y cumplimiento financiero\n\nContrato / obligación legal"
      ]
    ],
    "links": [
      [
        "Inicio",
        "/"
      ],
      [
        "Producto",
        "/software-carta-de-vinos"
      ],
      [
        "Demo",
        "/demo"
      ],
      [
        "Contacto",
        "/contacto"
      ],
      [
        "Términos",
        "/terminos-y-condiciones-del-contrato"
      ]
    ]
  },
  "/privacidad": {
    "lang": "es",
    "title": "Política de Privacidad · España | Winerim",
    "description": "Política de privacidad de Winerim para clientes, usuarios y visitantes en España.",
    "h1": "Política de Privacidad · España",
    "subtitle": "Documento independiente de privacidad para clientes, usuarios y visitantes en España. · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
    "canonical": "/privacidad",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Documento",
        "Política de Privacidad"
      ],
      [
        "Territorio",
        "España"
      ],
      [
        "Responsable",
        "Basque Highlands S.L. · CIF B01729607"
      ],
      [
        "Domicilio",
        "Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, España"
      ],
      [
        "Contacto privacidad",
        "info@winerim.com"
      ],
      [
        "Baja contractual",
        "cancel@winerim.com"
      ],
      [
        "Marco",
        "RGPD · LOPDGDD · LSSI · Cookies"
      ],
      [
        "Versión",
        "Versión 4.0 · 7 de julio de 2026"
      ],
      [
        "1. Responsable del tratamiento y contacto",
        "El responsable del tratamiento será Basque Highlands S.L., con CIF B01729607, con domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim, respecto de los tratamientos propios descritos en esta Política.\n\nContacto para privacidad y ejercicio de derechos: info@winerim.com. Las solicitudes de baja contractual del servicio no se gestionan por este canal y deberán enviarse exclusivamente a cancel@winerim.com conforme a los Términos y Condiciones.\n\nDelegado de Protección de Datos: [NO DESIGNADO / DATOS_DPO], salvo que Winerim comunique otro dato en su web o documentación contractual."
      ],
      [
        "2. Ámbito de aplicación",
        "Esta Política regula los tratamientos de datos personales realizados por Basque Highlands S.L. en relación con Winerim para clientes ubicados en España, usuarios autorizados, usuarios finales, visitantes web, proveedores, partners y contactos comerciales.\n\nEsta Política se aplica a clientes profesionales, representantes, usuarios administradores, empleados o colaboradores del Cliente, usuarios finales que visualizan o interactúan con cartas digitales, visitantes de la web, leads comerciales, proveedores, partners, candidatos y otras personas que se relacionen con Winerim.\n\nCuando Winerim trate datos personales por cuenta del Cliente dentro de la Plataforma, Winerim actuará como encargado del tratamiento y el Cliente será responsable de determinar la base jurídica, finalidad y contenido de los datos que introduce en el Servicio. En esos casos se aplicará el Acuerdo de Encargo de Tratamiento incluido en los Términos o documento específico."
      ],
      [
        "3. Categorías de datos tratados",
        "• Datos identificativos y de contacto: nombre, apellidos, cargo, empresa, email, teléfono, dirección profesional, país e idioma.\n\n• Datos de cuenta y autenticación: usuarios, roles, permisos, credenciales cifradas o tokens, registros de acceso, cambios de configuración y logs de actividad.\n\n• Datos contractuales y de facturación: razón social, NIF/CIF/VAT/ID fiscal, domicilio, plan, precio, facturas, pagos, método de pago, vencimientos, renovaciones, bajas, impagos y comunicaciones comerciales.\n\n• Datos de carta y negocio: referencias de vino, precios, añadas, stock, ventas, rotación, disponibilidad, imágenes, descripciones, maridajes, filtros, visualizaciones, favoritos, recomendaciones, interacciones y métricas operativas.\n\n• Datos técnicos: IP, identificadores de dispositivo, navegador, sistema operativo, cookies, eventos, logs, errores, rendimiento, seguridad, geolocalización aproximada y datos de uso.\n\n• Datos de soporte: tickets, emails, conversaciones, incidencias, adjuntos, capturas, grabaciones o notas cuando se faciliten o sean necesarias para atender la solicitud.\n\n• Datos comerciales: preferencias, intereses, participación en demos, newsletters, eventos, comunicaciones, campañas y relación con ventas.\n\n• Datos de candidatos, proveedores o partners: currículum, experiencia, datos profesionales, propuestas, contratos, facturas, pagos y comunicaciones."
      ],
      [
        "4. Fuentes de los datos",
        "Los datos pueden proceder directamente del interesado, del Cliente, de usuarios autorizados, de formularios web, procesos de contratación, emails, llamadas, demos, soporte, facturas, integraciones, proveedores de pago, tiendas de aplicaciones, herramientas de analítica, sistemas de seguridad, partners, fuentes públicas profesionales o del uso de la Plataforma."
      ],
      [
        "5. Finalidades del tratamiento",
        "• gestionar altas, cuentas, usuarios, autenticación, permisos y relación contractual;\n\n• prestar, mantener, configurar, personalizar y mejorar la Plataforma Winerim;\n\n• cargar, publicar, visualizar y gestionar cartas de vino digitales, QR, web, app y paneles;\n\n• gestionar pagos, facturación, impuestos, contabilidad, renovaciones, bajas, impagos y contracargos;\n\n• prestar soporte, resolver incidencias, comunicar cambios, enviar avisos de servicio, seguridad o facturación;\n\n• analizar stock, ventas, rotación, disponibilidad, interacciones, preferencias, filtros y rendimiento de la carta para ofrecer paneles, recomendaciones, estadísticas, benchmarking e inteligencia de negocio;\n\n• desarrollar, entrenar, probar y mejorar sistemas internos de análisis, recomendación, clasificación, maridaje, traducción, normalización, búsqueda e IA, preferentemente con datos agregados, anonimizados o disociados cuando sea viable;\n\n• prevenir fraude, abuso, scraping, crawling, ingeniería inversa, extracción automatizada, accesos indebidos, uso competitivo no autorizado, incidentes de seguridad y actividades ilícitas;\n\n• enviar comunicaciones comerciales B2B sobre Winerim, novedades, funcionalidades, contenidos, eventos o servicios similares, cuando exista base legal;\n\n• cumplir obligaciones legales, atender requerimientos de autoridades, conservar evidencias, defender derechos, gestionar auditorías, operaciones corporativas o reclamaciones."
      ],
      [
        "6. Bases jurídicas",
        "Los tratamientos se basan en el RGPD, la LOPDGDD y demás normativa española y europea aplicable. No todos los datos de carta, stock, ventas o bodega son datos personales; cuando sean datos empresariales o agregados podrán tratarse conforme al contrato, interés legítimo o ausencia de identificación personal.\n\n• Ejecución de contrato o medidas precontractuales: alta, acceso al Servicio, soporte, facturación contractual y gestión de la relación con clientes.\n\n• Cumplimiento de obligaciones legales: contabilidad, fiscalidad, facturación, conservación de registros, atención de autoridades y obligaciones regulatorias.\n\n• Interés legítimo: seguridad, prevención de fraude, mejora del Servicio, analítica interna, comunicaciones B2B, defensa de reclamaciones, uso de datos empresariales no personales, estadísticas agregadas, protección de activos, prevención de scraping e ingeniería inversa.\n\n• Consentimiento: cookies no necesarias, newsletters no amparadas por otra base, funcionalidades opcionales y tratamientos voluntarios.\n\n• Instrucciones del Cliente: cuando Winerim actúe como encargado del tratamiento respecto de datos personales tratados por cuenta del Cliente."
      ],
      [
        "7. Visualización pública de cartas de vino",
        "La finalidad esencial de Winerim es permitir que los Clientes muestren públicamente sus cartas de vinos en formato digital. Por ello, datos como referencias, precios, añadas, imágenes, descripciones, maridajes y disponibilidad podrán ser visibles para comensales, visitantes y usuarios finales desde enlaces, códigos QR, apps, webs o páginas asociadas al Servicio.\n\nEn principio, esta información tiene naturaleza empresarial o comercial. Si el Cliente incluye datos personales dentro de la carta o de sus contenidos, será responsable de contar con base legal y de no publicar información innecesaria o no autorizada."
      ],
      [
        "8. Uso de datos de ventas, stock, analítica e IA",
        "Winerim podrá tratar datos de ventas, stock, rotación, disponibilidad, interacciones, filtros, visualizaciones, preferencias y rendimiento comercial para prestar el Servicio, mostrar analítica al Cliente, mejorar recomendaciones, detectar errores, desarrollar funcionalidades y optimizar la experiencia.\n\nWinerim podrá utilizar datos agregados, anonimizados, disociados o no personales para análisis sectorial, benchmarking, informes internos o externos, inteligencia de mercado, entrenamiento o mejora de modelos, estadísticas, comunicaciones comerciales y mejora del producto, sin identificar razonablemente a personas físicas ni publicar datos individualizados sensibles de un Cliente sin autorización o base legal suficiente.\n\nWinerim no vende datos personales. Tampoco publicará datos individualizados de ventas, stock, márgenes o rendimiento económico identificando directamente al Cliente sin autorización o necesidad contractual/legal.\n\nEsta Política no concede al Cliente ni a usuarios autorizados ningún derecho para extraer, copiar, vender, revender, licenciar, ceder, transferir, publicar, comercializar, entrenar modelos de IA, crear datasets, explotar bases de datos, alimentar sistemas externos o aprovechar fuera de Winerim datos, contenidos, estructuras, taxonomías, modelos, recomendaciones, métricas, informes, benchmarks, visualizaciones o activos de Winerim. Estas restricciones se regulan en los Términos y Condiciones."
      ],
      [
        "9. Inteligencia artificial y decisiones automatizadas",
        "Winerim puede utilizar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, generar o sugerir descripciones, traducir, crear maridajes, ordenar resultados, recomendar vinos, detectar patrones, mejorar búsquedas, detectar errores y ofrecer analítica.\n\nEstas funcionalidades son de apoyo y pueden cometer errores. No producen decisiones legales o efectos significativamente similares sobre personas físicas. El Cliente debe revisar información crítica antes de utilizarla comercialmente.\n\nCuando se utilicen datos personales en sistemas automatizados, Winerim procurará aplicar minimización, seudonimización, anonimización o agregación cuando sea viable y proporcionado."
      ],
      [
        "10. Destinatarios, proveedores y subencargados",
        "Winerim podrá compartir datos con proveedores que prestan servicios necesarios, incluyendo hosting cloud, almacenamiento, seguridad, monitorización, email, soporte, analítica, pagos, facturación, inteligencia artificial, traducción, gestión de errores, tiendas de aplicaciones, integraciones, asesoría legal, fiscal, contable, auditoría y otros servicios auxiliares.\n\nStripe u otros proveedores de pago tratarán datos necesarios para pagos, suscripciones, facturación, prevención de fraude, cumplimiento financiero y obligaciones regulatorias conforme a sus propias condiciones y políticas.\n\nApple, Google u operadores de tiendas de aplicaciones podrán tratar datos cuando el usuario descargue o utilice aplicaciones móviles desde sus entornos.\n\nTambién podrán comunicarse datos a autoridades, juzgados, administraciones públicas, fuerzas de seguridad, asesores, auditores, compradores, inversores o terceros en operaciones corporativas cuando exista obligación legal, requerimiento válido, defensa de derechos, prevención de fraude, interés legítimo o base suficiente.\n\nEl listado concreto de proveedores y subencargados relevantes deberá mantenerse actualizado y estar disponible previa solicitud razonable o en una página específica de Winerim. En materia de pagos y cookies vinculadas al cobro, el proveedor identificado actualmente es Stripe."
      ],
      [
        "11. Transferencias internacionales",
        "Basque Highlands S.L. puede utilizar proveedores o entidades ubicadas fuera del Espacio Económico Europeo, incluyendo proveedores cloud, pagos, soporte, analítica o inteligencia artificial. También podrá existir acceso o soporte por Winerim LLC si interviene en la prestación internacional del Servicio.\n\nCuando los datos personales estén sujetos al RGPD y se transfieran fuera del Espacio Económico Europeo a países sin decisión de adecuación, Winerim aplicará garantías adecuadas, como cláusulas contractuales tipo aprobadas por la Comisión Europea, medidas suplementarias, decisiones de adecuación, certificaciones u otros mecanismos válidos."
      ],
      [
        "12. Plazos de conservación",
        "• Datos de cuenta y contrato: mientras exista relación contractual y posteriormente durante los plazos necesarios para obligaciones legales, contables, fiscales y defensa de reclamaciones.\n\n• Datos de facturación: durante los plazos exigidos por normativa fiscal, mercantil y contable aplicable.\n\n• Solicitudes de baja y comunicaciones contractuales: durante el plazo necesario para acreditar su recepción, tramitación, efectos y posibles reclamaciones.\n\n• Datos de soporte: durante el tiempo necesario para atender la consulta o incidencia y posteriormente durante un plazo razonable para seguimiento, calidad, seguridad y defensa.\n\n• Logs técnicos y de seguridad: durante periodos proporcionados a seguridad, diagnóstico, prevención de fraude, abuso, scraping y mejora del Servicio.\n\n• Datos de cartas, stock, ventas y operativa: mientras la cuenta esté activa y durante un periodo posterior razonable para exportación, recuperación, copias de seguridad, cumplimiento legal o reclamaciones.\n\n• Datos agregados, anonimizados o disociados: podrán conservarse indefinidamente porque no permiten identificar razonablemente a una persona física."
      ],
      [
        "13. Derechos de las personas",
        "Las personas interesadas podrán ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad, retirada del consentimiento y derecho a no ser objeto de decisiones automatizadas cuando proceda conforme al RGPD.\n\nLas solicitudes deberán enviarse a info@winerim.com indicando el derecho ejercitado, identidad del solicitante y datos necesarios para tramitar la petición. Winerim podrá solicitar información adicional para verificar la identidad o legitimación del solicitante.\n\nCuando Winerim actúe como encargado del tratamiento, podrá remitir la solicitud al Cliente responsable del tratamiento o asistirle en su respuesta, según proceda."
      ],
      [
        "14. Seguridad",
        "Winerim aplicará medidas técnicas y organizativas razonables para proteger los datos personales y la Plataforma frente a acceso no autorizado, pérdida, alteración, divulgación, uso indebido, scraping, extracción automatizada, ingeniería inversa, abuso de cuentas y otros riesgos proporcionados al contexto del Servicio.\n\nNingún sistema es absolutamente seguro. El Cliente debe custodiar credenciales, configurar permisos, formar a sus usuarios y notificar de inmediato cualquier incidente, pérdida de acceso o sospecha de uso indebido."
      ],
      [
        "15. Cookies y tecnologías similares",
        "Actualmente Winerim no utiliza cookies analíticas, publicitarias o de marketing propias. La Plataforma podrá utilizar cookies técnicas propias estrictamente necesarias para autenticación, sesión, seguridad, prevención de abuso y funcionamiento ordinario del Servicio. En materia de pagos, Winerim utiliza Stripe como proveedor externo, que puede instalar o utilizar cookies y tecnologías similares necesarias para procesar pagos, gestionar suscripciones, prevenir fraude, reforzar la seguridad y cumplir obligaciones financieras o regulatorias.\n\nSi en el futuro Winerim incorporara cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, se informará al usuario y se habilitará el mecanismo de aceptación, rechazo o configuración cuando legalmente corresponda. Rechazar cookies no necesarias no impedirá el uso básico del Servicio cuando dichas cookies no sean imprescindibles."
      ],
      [
        "16. Menores, alcohol y responsabilidad del Cliente",
        "Winerim no está dirigida a menores ni vende bebidas alcohólicas. La Plataforma es una herramienta tecnológica para profesionales de hostelería. El Cliente es responsable de cumplir la normativa aplicable sobre venta, promoción, edad legal, servicio responsable y consumo de alcohol en su jurisdicción."
      ],
      [
        "17. Comunicaciones comerciales",
        "Winerim podrá enviar comunicaciones de servicio, soporte, seguridad, facturación y cambios contractuales. También podrá enviar comunicaciones comerciales B2B sobre productos, servicios, eventos, contenidos o novedades relacionados con Winerim cuando exista base legal. El destinatario podrá oponerse o darse de baja de comunicaciones comerciales cuando proceda, sin que ello afecte a comunicaciones contractuales necesarias."
      ],
      [
        "18. Reclamaciones y autoridad de control",
        "Las personas interesadas tienen derecho a presentar una reclamación ante la Agencia Española de Protección de Datos si consideran que el tratamiento no se ajusta a la normativa aplicable, sin perjuicio de intentar previamente una solución con Winerim."
      ],
      [
        "19. Cambios en esta Política",
        "Winerim podrá actualizar esta Política para reflejar cambios legales, técnicos, operativos, de proveedores, funcionalidades, tratamientos, estructura societaria o modelo de negocio. Cuando los cambios sean relevantes, se comunicarán por medios razonables, como web, Plataforma, email o documentación contractual."
      ],
      [
        "20. Anexo: resumen operativo de tratamientos",
        "Tratamiento\n\nFinalidad\n\nBase\n\nCuenta y contrato\n\nAlta, acceso, soporte, facturación y relación contractual\n\nContrato / interés legítimo / obligación legal\n\nCarta digital\n\nPublicar y gestionar carta de vinos del Cliente\n\nContrato / interés legítimo del Cliente\n\nStock, ventas y analítica\n\nPaneles, recomendaciones, estadísticas, benchmarking y mejora del producto\n\nContrato / interés legítimo / datos agregados\n\nIA y automatización\n\nClasificación, maridajes, descripciones, traducción y mejora de modelos\n\nContrato / interés legítimo / consentimiento si aplica\n\nSeguridad y antifraude\n\nPrevenir scraping, ingeniería inversa, abuso y accesos indebidos\n\nInterés legítimo / obligación legal\n\nCookies técnicas y Stripe\n\nFuncionamiento técnico del Servicio y cookies/tecnologías de Stripe vinculadas al proceso de pago y prevención de fraude\n\nContrato / interés legítimo / obligación legal; consentimiento si en el futuro se activan cookies no necesarias\n\nPagos y facturación\n\nCobros, impuestos, contabilidad y cumplimiento financiero\n\nContrato / obligación legal"
      ]
    ],
    "links": [
      [
        "Inicio",
        "/"
      ],
      [
        "Producto",
        "/software-carta-de-vinos"
      ],
      [
        "Demo",
        "/demo"
      ],
      [
        "Contacto",
        "/contacto"
      ],
      [
        "Términos",
        "/terminos-y-condiciones-del-contrato"
      ]
    ]
  },
  "/terminos-y-condiciones-del-contrato": {
    "lang": "es",
    "title": "Términos y Condiciones de Contratación y Uso SaaS | Winerim",
    "description": "Términos y condiciones de contratación y uso SaaS de Winerim para clientes en España.",
    "h1": "Términos y Condiciones de Contratación y Uso SaaS",
    "subtitle": "Contrato SaaS B2B integrado para clientes profesionales de Winerim · Versión final operativa - 7 de julio de 2026 · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
    "canonical": "/terminos-y-condiciones-del-contrato",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Documento",
        "Términos y Condiciones de Contratación y Uso SaaS con contrato SaaS integrado"
      ],
      [
        "Ámbito",
        "Clientes con establecimiento, domicilio fiscal o centro principal de actividad en España"
      ],
      [
        "Prestador y facturación",
        "Basque Highlands S.L., CIF B01729607, Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España"
      ],
      [
        "Marca",
        "Winerim"
      ],
      [
        "Naturaleza",
        "Servicio SaaS B2B para hostelería, restauración, hoteles y grupos profesionales"
      ],
      [
        "Bajas contractuales",
        "Únicamente por email a cancel@winerim.com con 15 días naturales de antelación"
      ],
      [
        "Contacto general",
        "info@winerim.com"
      ],
      [
        "Ley y jurisdicción",
        "Derecho español; Juzgados y Tribunales de Donostia-San Sebastián, salvo norma imperativa"
      ],
      [
        "1. Identificación del prestador y ámbito de aplicación",
        "Estos Términos y Condiciones regulan la contratación, acceso y uso profesional de Winerim, incluyendo sus aplicaciones web y móviles, paneles de control, cartas digitales, módulos de gestión, integraciones, APIs, funcionalidades de analítica, inteligencia artificial, soporte y servicios asociados.\n\nPara clientes con establecimiento, domicilio fiscal o centro principal de actividad en España, el prestador contractual y entidad emisora de facturas será Basque Highlands S.L., con CIF B01729607 y domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim.\n\nEl cliente será la persona física o jurídica que contrate el servicio en condición de empresario, profesional, sociedad, restaurante, hotel, grupo hostelero, establecimiento turístico, club, distribuidor o entidad equivalente, en adelante el Cliente."
      ],
      [
        "2. Naturaleza profesional del servicio",
        "Winerim es una plataforma SaaS B2B orientada a la digitalización, gestión, análisis y explotación comercial de cartas de vino, bodegas, stock, datos de venta y experiencia de servicio en hostelería.\n\nEl Cliente declara que contrata Winerim en el marco de su actividad profesional o empresarial y no como consumidor o usuario final. La Plataforma no está destinada a contratación por consumidores para fines particulares.\n\nLos comensales, visitantes o usuarios finales que consulten una carta digital del Cliente no adquieren por ello la condición de clientes contractuales directos de Winerim, salvo que creen una cuenta propia, utilicen funcionalidades independientes o acepten términos específicos adicionales."
      ],
      [
        "3. Objeto contractual e integración del contrato SaaS",
        "Estos Términos constituyen el contrato SaaS aplicable entre Winerim y el Cliente. No existe un contrato SaaS separado salvo que las partes firmen condiciones particulares, una orden de servicio, presupuesto, pedido, anexo o acuerdo específico.\n\nLa contratación otorga al Cliente una licencia limitada, revocable en caso de incumplimiento, no exclusiva, no sublicenciable, no transferible y condicionada al pago para acceder y utilizar la Plataforma durante la vigencia de la relación contractual y únicamente para el Uso Permitido.\n\nLa licencia no implica venta, cesión, transmisión ni adquisición de propiedad sobre software, código, datos, bases de datos, documentación, imágenes, taxonomías, huellas digitales, reglas, algoritmos, modelos, recomendaciones, insights, interfaces, diseños, know-how ni cualquier otro activo de Winerim."
      ],
      [
        "4. Aceptación y documentos contractuales",
        "La aceptación de estos Términos podrá realizarse mediante firma manuscrita o electrónica, aceptación en proceso de alta, confirmación por correo electrónico, pago de la suscripción, uso efectivo de la Plataforma, aceptación de presupuesto o cualquier otro acto inequívoco de contratación.\n\nLa contratación implica la aceptación de estos Términos, la Política de Privacidad, la Política de Cookies cuando proceda, el Anexo de Encargo de Tratamiento, la ficha de contratación, presupuesto, plan, pedido, factura o condiciones particulares aceptadas.\n\nEn caso de contradicción entre estos Términos y una condición particular firmada o aceptada expresamente por ambas partes, prevalecerá la condición particular únicamente respecto del punto concreto regulado."
      ],
      [
        "5. Definiciones esenciales",
        "Plataforma significa el conjunto de aplicaciones web, aplicaciones móviles, paneles de control, bases de datos, APIs, módulos, servicios, diseños, documentación, funcionalidades y sistemas ofrecidos bajo la marca Winerim.\n\nDatos de la Carta significa toda información relacionada con la carta de vinos del Cliente, incluyendo referencias, añadas, precios, denominaciones, regiones, países, bodegas, uvas, formatos, imágenes, descripciones, notas de cata, maridajes, disponibilidad, categorías, etiquetas, idiomas, recomendaciones, favoritos, orden de presentación y cualquier dato equivalente.\n\nDatos Operativos significa datos de stock, ventas, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, rendimiento comercial, interacciones, uso de filtros, visualizaciones, clicks, reservas o pedidos cuando existan, integraciones con terceros y cualquier información relacionada con la gestión o explotación de la carta de vinos.\n\nContenido del Cliente significa logotipos, marcas, imágenes, textos, cartas, precios, materiales, datos comerciales e información aportada por el Cliente.\n\nContenido de Winerim significa software, código, arquitectura, diseño, interfaz, bases de datos, huellas digitales de vinos, imágenes, descripciones, traducciones, recomendaciones, taxonomías, datos enriquecidos, modelos, reglas, algoritmos, documentación, textos, know-how, métricas, benchmarks, insights, materiales formativos y cualquier activo creado, licenciado, normalizado o incorporado por Winerim.\n\nDatos y Activos de Winerim significa, además del Contenido de Winerim, cualquier dataset, estructura de datos, taxonomía, normalización, clasificación, enriquecimiento, relación entre datos, modelo, patrón de uso, ranking, recomendación, métrica, informe, benchmark, señal analítica o conocimiento generado o tratado por Winerim.\n\nUso Permitido significa el uso interno, profesional y ordinario de la Plataforma por el Cliente para gestionar, visualizar y explotar su propia carta de vinos dentro del establecimiento, grupo o cuenta contratada, sin extracción, cesión, reventa, uso competitivo ni explotación externa de activos de Winerim."
      ],
      [
        "6. Alcance general del servicio",
        "Winerim permite al Cliente crear, gestionar, visualizar, explotar y analizar digitalmente su carta de vinos y la información asociada a su bodega, stock y servicio de sala.\n\nSalvo que el plan contratado indique otra cosa, el servicio podrá incluir alta del Cliente, configuración inicial, carga inicial de la carta facilitada, carta digital personalizada, enlace web o QR, aplicación descargable cuando esté disponible, panel de control, formatos de visualización, filtros, favoritos, recomendados, selección, multiidioma, activación y desactivación de vinos, modificación de precios, uvas, añadas, maridajes, descripciones y notas de cata, solicitud de nuevas referencias, analítica y soporte ordinario.\n\nLa parte frontal de la carta digital podrá ser consultada por comensales sin coste directo adicional para ellos, sin perjuicio de las tarifas abonadas por el Cliente a Winerim.\n\nLa carta podrá ser pública y accesible desde cualquier lugar, sin necesidad de que el usuario final esté físicamente en el establecimiento, salvo configuración distinta solicitada por el Cliente y aceptada técnicamente por Winerim."
      ],
      [
        "7. Servicios no incluidos salvo pacto expreso",
        "Salvo contratación expresa por escrito, no se incluyen desarrollos a medida, integraciones con TPV, PMS, ERP, CRM u otros sistemas, migraciones complejas, depuración avanzada de datos, fotografía profesional, impresión de códigos QR o material físico, formación presencial, consultoría estratégica, auditoría de bodega, gestión operativa de stock por cuenta del Cliente, soporte fuera de horario, SLA específico, APIs privadas, modelos de IA personalizados, traducciones profesionales revisadas por humano, personalización avanzada de marca ni funcionalidades no descritas en el plan contratado.\n\nWinerim podrá ofrecer servicios adicionales mediante presupuesto, pedido, anexo o contrato específico. Su contratación no modificará automáticamente estos Términos salvo indicación expresa."
      ],
      [
        "8. Alta, implantación y colaboración del Cliente",
        "El Cliente deberá facilitar a Winerim, en formato razonablemente utilizable, toda la información necesaria para la implantación: carta de vinos, precios, añadas, stock, imágenes, logos, datos fiscales, datos de contacto, accesos o cualquier otro material necesario.\n\nEl Cliente responde de la veracidad, exactitud, actualización y licitud de los contenidos y datos que entregue, cargue, modifique o mantenga en Winerim.\n\nLos plazos de activación o carga comenzarán a contar desde la recepción completa de la información necesaria y, cuando proceda, del pago inicial. Los plazos operativos son estimaciones razonables salvo garantía expresa por escrito.\n\nWinerim podrá solicitar imágenes, fichas técnicas, datos de bodega, añadas, precios u otra información necesaria para crear, completar, corregir o enriquecer referencias sin huella digital o con información insuficiente."
      ],
      [
        "9. Licencia de uso y límites",
        "El Cliente recibe una licencia limitada para usar la Plataforma únicamente durante la vigencia de la relación contractual, para su actividad profesional propia, conforme al plan contratado y al Uso Permitido.\n\nLa licencia se concede por cuenta, establecimiento, grupo, territorio, número de usuarios, módulos, funcionalidades o límites de uso indicados en la ficha de contratación o plan contratado.\n\nEl Cliente no podrá sublicenciar, ceder, alquilar, vender, revender, poner a disposición de terceros, explotar como servicio, operar en nombre de terceros, prestar servicios de consultoría basados en Winerim ni permitir el acceso de terceros no autorizados sin consentimiento previo y escrito de Winerim."
      ],
      [
        "10. Prohibiciones esenciales: ingeniería inversa, extracción y explotación de datos",
        "El Cliente no podrá realizar, permitir, facilitar, encargar o intentar realizar directa o indirectamente ingeniería inversa, descompilación, desensamblado, análisis de código, análisis de arquitectura, auditoría técnica no autorizada, escaneo, test de intrusión, explotación de vulnerabilidades, copia de lógica, copia de flujos, copia de interfaz, copia de estructura de datos o cualquier actuación orientada a comprender, replicar, sustituir o competir con Winerim.\n\nQueda prohibido descargar, extraer, copiar, indexar, minar, sincronizar, fotografiar de forma sistemática, capturar masivamente, hacer scraping, crawling, harvesting, data mining, API abuse, consultas automatizadas o cualquier obtención masiva o no autorizada de datos, contenidos, imágenes, fichas, taxonomías, estructuras, etiquetas, clasificaciones, huellas digitales, métricas, insights, recomendaciones o documentación de Winerim.\n\nQueda prohibido vender, revender, licenciar, alquilar, ceder, transferir, publicar, redistribuir, monetizar, comercializar o explotar de cualquier forma Datos y Activos de Winerim, Contenido de Winerim, datos enriquecidos, benchmarks, datasets, recomendaciones, modelos, reglas, algoritmos, know-how, informes, outputs o resultados generados por la Plataforma fuera del Uso Permitido.\n\nQueda prohibido utilizar Winerim, su contenido o sus datos para alimentar bases de datos propias o de terceros, entrenar, ajustar, evaluar o mejorar sistemas de inteligencia artificial, crear comparadores, marketplaces, buscadores, catálogos, sistemas de recomendación, soluciones de gestión de vino, herramientas de analítica, servicios de consultoría, informes sectoriales o productos competidores.\n\nEl Cliente no podrá permitir acceso o visualización de la Plataforma, demos, paneles, documentación, capturas, configuraciones, propuestas, materiales o datos a competidores directos o indirectos de Winerim, ni a terceros que desarrollen, comercialicen, asesoren o inviertan en soluciones competidoras, salvo autorización previa y escrita de Winerim.\n\nLa posibilidad técnica de visualizar, descargar, exportar, copiar o acceder a información no supone autorización jurídica para su extracción, reutilización, venta, cesión, entrenamiento de IA, monetización o explotación fuera del Uso Permitido.\n\nEl incumplimiento de esta cláusula tendrá la consideración de incumplimiento esencial y podrá justificar suspensión inmediata, resolución contractual, bloqueo de accesos, retirada o destrucción de materiales, indemnización de daños y perjuicios y ejercicio de acciones legales."
      ],
      [
        "11. Datos y Activos de Winerim",
        "Winerim conserva todos los derechos sobre sus Datos y Activos de Winerim, incluyendo datasets, taxonomías, huellas digitales de vinos, reglas de normalización, clasificaciones, modelos, patrones, benchmarks, recomendaciones, traducciones, descripciones, imágenes, documentación, interfaces, métricas, insights y cualquier enriquecimiento generado por Winerim.\n\nEl Cliente reconoce que la inversión de Winerim en creación, normalización, curación, estructuración y explotación de datos constituye un activo esencial, protegido contractual y legalmente, incluyendo, cuando proceda, derechos de propiedad intelectual, derechos sobre bases de datos, secretos empresariales y competencia desleal.\n\nNingún dato, pantalla, informe, exportación, recomendación, insight o resultado generado por Winerim podrá ser usado por el Cliente para fines ajenos a la gestión interna de su carta y servicio contratado."
      ],
      [
        "12. Contenido del Cliente",
        "El Cliente conserva la titularidad de sus marcas, logos, imágenes propias, cartas, precios, datos comerciales y demás contenido original que aporte a la Plataforma, siempre que sea efectivamente de su titularidad o disponga de derechos suficientes.\n\nEl Cliente concede a Winerim una licencia mundial, no exclusiva, gratuita, sublicenciable a proveedores técnicos, durante la vigencia del servicio y por el tiempo necesario posterior para cumplimiento legal, soporte, copias de seguridad y defensa de derechos, para alojar, reproducir, adaptar técnicamente, traducir, normalizar, enriquecer, mostrar, comunicar públicamente y tratar dicho contenido en la medida necesaria para prestar, mejorar y proteger el servicio.\n\nEl Cliente garantiza que cuenta con derechos suficientes sobre imágenes, logotipos, textos, datos, fichas, precios y materiales que aporte. Winerim no será responsable de reclamaciones de terceros derivadas de contenido proporcionado por el Cliente."
      ],
      [
        "13. Uso y exhibición pública de cartas de vino",
        "El Cliente autoriza expresamente a Winerim a mostrar y poner a disposición de usuarios finales la carta de vinos del Cliente y sus Datos de la Carta a través de la Plataforma, web, app, enlaces, códigos QR, widgets, integraciones y canales asociados al servicio.\n\nEsta autorización incluye nombres de vinos, bodegas, regiones, denominaciones, uvas, añadas, precios, formatos, imágenes, descripciones, notas de cata, maridajes, etiquetas, categorías, idiomas, disponibilidad, recomendaciones y cualquier información que forme parte de la carta digital.\n\nEl Cliente reconoce que la visualización pública de la carta forma parte esencial del servicio y que la información incluida podrá ser accesible por comensales, buscadores, navegadores, sistemas de cache, redes o terceros técnicos en la medida propia del funcionamiento de internet, salvo configuración distinta aceptada por Winerim.\n\nEl Cliente será responsable de que precios, añadas, disponibilidad, promociones, imágenes, derechos de terceros y demás información publicada sean correctos, lícitos y estén actualizados."
      ],
      [
        "14. Datos de ventas, stock, rotación y analítica",
        "El Cliente autoriza a Winerim a recoger, almacenar, tratar, analizar, visualizar, cruzar, enriquecer y utilizar Datos Operativos relacionados con carta, ventas, stock, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, interacciones, visualizaciones, filtros, favoritos, reservas o pedidos cuando existan.\n\nWinerim podrá utilizar estos datos para prestar el servicio, generar paneles, métricas, recomendaciones, alertas, informes, comparativas internas, detección de errores, mejora de funcionalidades, seguridad, prevención de fraude, soporte, desarrollo de producto y creación de inteligencia de negocio para el Cliente.\n\nWinerim podrá usar datos agregados, anonimizados o disociados para análisis sectorial, benchmarking, estadísticas, informes, desarrollo de producto, entrenamiento y mejora de modelos, comunicación comercial, estudios de mercado, recomendaciones y creación de nuevos servicios, siempre sin identificar directamente al Cliente cuando se trate de datos sensibles de ventas, stock, márgenes o rendimiento económico salvo autorización específica.\n\nWinerim no venderá datos personales. La explotación comercial de datos no personales, agregados, anonimizados o generados por Winerim no atribuye al Cliente derechos de compensación, participación o control adicional, salvo pacto escrito distinto."
      ],
      [
        "15. Alcohol, normativa de hostelería y responsabilidad del restaurante",
        "Winerim no vende, sirve, suministra, transporta, distribuye ni cobra bebidas alcohólicas a usuarios finales. La Plataforma es una herramienta tecnológica de gestión, visualización, analítica y apoyo comercial.\n\nEl Cliente es el único responsable de la venta, servicio, disponibilidad, precios, impuestos, licencias, edad legal, consumo responsable, normativa sanitaria, normativa de hostelería, normativa de publicidad de alcohol y cumplimiento local aplicable a su actividad.\n\nLas recomendaciones, maridajes, rankings, descripciones o sugerencias generadas por Winerim no sustituyen el criterio profesional del Cliente ni sus obligaciones legales frente a consumidores, autoridades o terceros."
      ],
      [
        "16. Inteligencia artificial, recomendaciones y contenido automatizado",
        "Winerim puede incorporar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, traducir, generar descripciones, sugerir maridajes, ordenar resultados, detectar patrones, recomendar referencias y mejorar la experiencia de usuario.\n\nEstas funcionalidades son herramientas de apoyo. Pueden contener errores, omisiones, sesgos, inexactitudes o resultados no adecuados a una situación concreta. El Cliente debe revisar la información relevante antes de publicarla, usarla comercialmente o tomar decisiones de compra, venta, stock o servicio.\n\nWinerim podrá modificar, limitar, sustituir, desactivar o mejorar funcionalidades de IA en cualquier momento por razones técnicas, legales, comerciales, de seguridad, de calidad o de proveedores.\n\nEl Cliente no podrá usar outputs de IA, recomendaciones, embeddings, puntuaciones, prompts, resultados, taxonomías, descripciones o datasets generados por Winerim para entrenar modelos externos, crear productos competidores, vender datos o alimentar bases de datos ajenas al Uso Permitido."
      ],
      [
        "17. Integraciones, APIs y terceros",
        "Winerim puede integrarse con proveedores de pago, TPV, PMS, ERP, CRM, herramientas de analítica, servicios de email, alojamiento cloud, tiendas de aplicaciones, proveedores de inteligencia artificial y otros terceros.\n\nLas integraciones dependerán de la disponibilidad, condiciones, APIs, cambios técnicos, tarifas, limitaciones y decisiones de esos terceros. Winerim no será responsable de fallos, cambios, interrupciones, pérdidas o limitaciones imputables a terceros ajenos a su control razonable.\n\nEl Cliente autoriza a Winerim a intercambiar datos con los terceros necesarios cuando active una integración o cuando sea imprescindible para prestar el servicio, siempre dentro del marco contractual y de privacidad aplicable."
      ],
      [
        "18. Obligaciones de Winerim",
        "Winerim prestará el servicio con diligencia profesional, conforme a los usos habituales del sector SaaS y con medios técnicos y humanos razonablemente disponibles.\n\nWinerim realizará la carga inicial de la carta facilitada por el Cliente conforme al plan contratado y a la información recibida. La exactitud final de precios, disponibilidad, añadas, stock y datos comerciales será responsabilidad del Cliente.\n\nWinerim procurará informar al Cliente de incidencias relevantes que afecten sustancialmente al servicio cuando tenga conocimiento de ellas y sea razonablemente posible."
      ],
      [
        "19. Obligaciones del Cliente",
        "El Cliente deberá pagar puntualmente las tarifas contratadas, impuestos, comisiones bancarias, gastos de devolución y cualquier importe pendiente conforme a estos Términos.\n\nEl Cliente deberá utilizar la Plataforma conforme a la ley, buena fe, documentación, instrucciones de Winerim y Uso Permitido.\n\nEl Cliente deberá formar a su personal autorizado, controlar credenciales, revisar la carta publicada, mantener datos actualizados y no cargar información ilícita, innecesaria, falsa, protegida o de terceros sin derechos suficientes.\n\nEl Cliente responderá de cualquier actuación de sus administradores, empleados, colaboradores, proveedores o terceros autorizados que accedan a la Plataforma por su cuenta o bajo sus credenciales."
      ],
      [
        "20. Cuentas, credenciales y seguridad del Cliente",
        "El Cliente será responsable de custodiar credenciales, usuarios administradores, permisos y accesos. Cualquier actuación realizada desde una cuenta del Cliente se presumirá realizada por el Cliente o por persona autorizada, salvo prueba en contrario.\n\nEl Cliente deberá notificar inmediatamente a Winerim cualquier acceso no autorizado, pérdida de credenciales, uso indebido, fuga de datos o incidencia de seguridad que afecte a su cuenta.\n\nWinerim podrá bloquear, suspender, restablecer o limitar accesos cuando existan indicios razonables de riesgo, abuso, uso no autorizado, scraping, extracción, vulneración de seguridad o incumplimiento contractual."
      ],
      [
        "21. Soporte, mantenimiento y actualizaciones",
        "El soporte ordinario se prestará a través de los canales habilitados por Winerim, incluyendo panel, email u otros medios indicados, dentro del horario operativo comunicado o contratado.\n\nWinerim es un producto vivo y en evolución continua. Winerim podrá introducir actualizaciones, mejoras, cambios técnicos, automatizaciones, integraciones, modificaciones de interfaz, nuevos módulos, ajustes de arquitectura, parches de seguridad y cambios funcionales.\n\nLas actualizaciones podrán modificar la apariencia, flujos, funcionalidades, campos, filtros, módulos o forma de prestación del servicio, siempre que no vacíen de contenido esencial el servicio contratado.\n\nWinerim podrá realizar mantenimiento programado o de emergencia. En situaciones críticas, de seguridad o de terceros, el servicio podrá interrumpirse sin aviso previo, procurando restablecerse en el menor tiempo razonable."
      ],
      [
        "22. Disponibilidad y ausencia de garantía absoluta",
        "Winerim procurará mantener la Plataforma disponible con estándares razonables del sector SaaS, pero no garantiza disponibilidad ininterrumpida, ausencia total de errores, compatibilidad permanente con todos los dispositivos, navegadores o sistemas, ni continuidad indefinida de todas las funcionalidades.\n\nSalvo que exista un SLA firmado, la Plataforma se presta en modalidad de medios razonables y según disponibilidad, sin compromisos de disponibilidad, créditos de servicio o indemnizaciones automáticas por interrupciones.\n\nWinerim no será responsable de caídas, interrupciones, pérdida de conectividad, lentitud, indisponibilidad o errores causados por proveedores cloud, internet, tiendas de aplicaciones, Stripe, APIs de terceros, dispositivos del Cliente, redes locales, configuraciones incorrectas, fuerza mayor o hechos fuera de su control razonable."
      ],
      [
        "23. Funcionalidades beta, pilotos y pruebas",
        "Winerim podrá ofrecer funcionalidades beta, pilotos, pruebas, módulos experimentales o accesos anticipados. Dichas funcionalidades se ofrecen sin garantía de continuidad, estabilidad, disponibilidad, resultado o permanencia.\n\nWinerim podrá modificar, limitar o retirar funcionalidades beta en cualquier momento sin que ello genere derecho a compensación, salvo pacto escrito distinto."
      ],
      [
        "24. Precio, facturación y forma de pago",
        "El Cliente abonará a Basque Highlands S.L. las cantidades indicadas en el plan, presupuesto, ficha de contratación, factura, enlace de pago o condición particular aceptada, más los impuestos indirectos que resulten aplicables.\n\nLa facturación podrá ser mensual, anual, por piloto, por grupo, por establecimiento, por módulo o según la modalidad contratada. El cobro podrá realizarse mediante tarjeta, domiciliación, transferencia, Stripe u otro medio aceptado por Winerim.\n\nLas facturas se emitirán en formato electrónico al email facilitado por el Cliente o a través de los medios habilitados por Winerim. El Cliente acepta la facturación electrónica salvo que solicite otro formato cuando legalmente proceda.\n\nEl Cliente será responsable de mantener actualizados sus datos fiscales y de pago. Los cambios no obligarán a modificar facturas ya emitidas correctamente con la información disponible en el momento de emisión."
      ],
      [
        "25. Actualización anual de precios",
        "El Cliente reconoce y acepta que Winerim podrá actualizar automáticamente sus precios cada año natural.\n\nCon efectos desde el 1 de enero de cada año, Winerim podrá aplicar una actualización anual de precios de entre el cinco por ciento (5%) y el diez por ciento (10%) sobre los precios vigentes durante el año anterior.\n\nEsta actualización responderá, entre otros motivos, al incremento de costes operativos, tecnológicos, infraestructura, soporte, mantenimiento, desarrollo de producto, seguridad, proveedores externos, inflación, evolución de la Plataforma y nuevas funcionalidades.\n\nLa actualización anual se entiende aceptada desde la contratación por formar parte de las condiciones económicas del contrato y no requerirá aceptación adicional. Winerim podrá comunicarla mediante email, plataforma, factura, presupuesto, renovación, comunicación comercial o cualquier otro medio escrito, sin que la falta de comunicación individualizada impida su aplicación cuando esté dentro del rango pactado.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento de cancelación previsto en estos Términos."
      ],
      [
        "26. Modificación extraordinaria de precios, planes y servicios",
        "Además de la actualización anual ordinaria, Winerim podrá modificar precios, planes, módulos, límites de uso, funcionalidades o condiciones económicas por razones técnicas, comerciales, operativas, fiscales, regulatorias, de divisa, de proveedores externos, de seguridad o de evolución del producto.\n\nCuando la modificación suponga un incremento del precio recurrente contratado fuera de la actualización anual ordinaria, Winerim lo comunicará al Cliente con una antelación mínima de quince (15) días naturales antes del siguiente cobro o renovación.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento previsto. La falta de baja en plazo o la continuidad de uso se entenderá como aceptación de las nuevas condiciones económicas."
      ],
      [
        "27. Cancelación y baja del servicio",
        "El Cliente podrá solicitar la cancelación de su suscripción exclusivamente mediante comunicación escrita enviada por correo electrónico a cancel@winerim.com.\n\nLa solicitud de baja deberá recibirse con una antelación mínima de quince (15) días naturales respecto de la fecha del siguiente cobro, renovación o periodo de facturación.\n\nLa solicitud deberá enviarse desde el correo asociado a la cuenta del Cliente o desde un correo que permita identificarlo razonablemente, e incluir como mínimo razón social, nombre comercial del establecimiento, identificación fiscal, país, servicio o suscripción cuya baja se solicita y fecha solicitada de baja.\n\nNo serán válidas a efectos de cancelación contractual las solicitudes realizadas por teléfono, WhatsApp, mensaje verbal, redes sociales, mensajes a comerciales, gestores, empleados, soporte operativo o cualquier canal distinto de cancel@winerim.com.\n\nLa baja será efectiva al finalizar el periodo de facturación en curso si la solicitud se recibe con la antelación mínima indicada. Si se recibe con menos de quince (15) días naturales, la baja producirá efectos al finalizar el periodo de facturación siguiente, quedando el Cliente obligado al pago de dicho periodo.\n\nLa cancelación no dará derecho a devolución de importes ya facturados o abonados, salvo acuerdo expreso por escrito de Winerim o exigencia legal. La baja no exime del pago de cantidades vencidas, facturas pendientes, impuestos, comisiones, servicios adicionales prestados o importes devengados antes de la fecha efectiva de baja."
      ],
      [
        "28. Impagos, devoluciones y suspensión",
        "En caso de impago, retraso, devolución de recibos, contracargo, fallo de tarjeta, rechazo bancario o incidencia de cobro, Winerim podrá reclamar el importe pendiente, comisiones bancarias, costes razonables de recobro e intereses legalmente aplicables.\n\nWinerim podrá suspender total o parcialmente el acceso a la Plataforma desde el incumplimiento de pago o tras aviso razonable, según la gravedad, sin que la suspensión libere al Cliente de sus obligaciones de pago.\n\nSi el impago persiste durante más de siete (7) días naturales desde la suspensión o requerimiento, Winerim podrá resolver la relación contractual, eliminar o limitar accesos y reclamar cantidades pendientes, daños, costes y perjuicios."
      ],
      [
        "29. Duración y renovación",
        "La duración inicial será la indicada en el plan, ficha de contratación, presupuesto, factura, orden de servicio o condición particular aceptada. A falta de indicación expresa, la duración será mensual renovable.\n\nSalvo baja válida conforme a la cláusula de cancelación, la suscripción se renovará automáticamente por periodos sucesivos equivalentes, aplicándose las tarifas vigentes, actualizaciones anuales y condiciones económicas aplicables.\n\nEn contratos anuales, pilotos con precio cerrado, compromisos mínimos o contratos con permanencia, no procederá devolución de periodos ya iniciados salvo pacto escrito distinto o exigencia legal."
      ],
      [
        "30. Suspensión y resolución por incumplimiento",
        "Winerim podrá suspender o resolver el servicio, con efecto inmediato o tras requerimiento de subsanación según la gravedad, en supuestos de impago, uso ilícito o abusivo, vulneración de propiedad intelectual, incumplimiento de confidencialidad, acceso o cesión no autorizada, uso por o para competidores, ingeniería inversa, scraping, extracción de datos, entrenamiento de IA no autorizado, monetización de datos o cualquier actuación que ponga en riesgo activos, seguridad o posición competitiva de Winerim.\n\nEn tales casos, Winerim podrá bloquear accesos, exigir el cese inmediato, ordenar retirada o destrucción de materiales, revocar licencias, conservar evidencias técnicas, reclamar indemnización y ejercitar acciones legales.\n\nEl Cliente podrá resolver la relación si Winerim incurre en incumplimiento grave no subsanado en un plazo razonable de treinta (30) días desde requerimiento escrito, siempre que el incumplimiento sea imputable a Winerim y no derive de terceros, fuerza mayor, impago o actuación del Cliente."
      ],
      [
        "31. Efectos de la terminación",
        "Finalizada la relación, cesará inmediatamente el derecho de uso del Cliente sobre la Plataforma y Winerim podrá desactivar accesos, retirar cartas públicas, detener integraciones y limitar funcionalidades.\n\nSalvo imposibilidad técnica o legal, Winerim permitirá al Cliente solicitar durante treinta (30) días naturales desde la terminación una exportación razonable de su información operativa alojada en la Plataforma, siempre que el Cliente esté al corriente de pago y la exportación no incluya Datos y Activos de Winerim, datos de otros clientes, secretos empresariales, taxonomías propietarias, modelos, reglas, estructuras, datasets enriquecidos o información no exportable.\n\nWinerim podrá conservar información necesaria para cumplimiento legal, facturación, seguridad, defensa de reclamaciones, evidencias de incumplimientos, copias de seguridad y registros internos, así como datos agregados, anonimizados o disociados.\n\nLas cláusulas de propiedad intelectual, prohibiciones de uso, no extracción, confidencialidad, protección de datos, limitación de responsabilidad, indemnidad, pagos pendientes, jurisdicción y cualesquiera otras que por su naturaleza deban subsistir permanecerán vigentes tras la terminación."
      ],
      [
        "32. Confidencialidad y secretos empresariales",
        "Ambas partes se comprometen a mantener la confidencialidad de la información técnica, comercial, estratégica, operativa, económica, financiera, jurídica, de producto, seguridad, clientes, precios, roadmap, datos y know-how a la que accedan con ocasión de la relación.\n\nEl Cliente reconoce que el software, arquitectura, bases de datos, taxonomías, modelos, recomendaciones, métricas, documentación, flujos, interfaces, lógica de negocio, datos enriquecidos y know-how de Winerim pueden constituir secretos empresariales.\n\nLa obligación de confidencialidad permanecerá durante la relación contractual y durante cinco (5) años tras su terminación. La información que constituya secreto empresarial, know-how, código, arquitectura, modelos, datos, seguridad o activos estratégicos de Winerim se protegerá mientras mantenga tal naturaleza.\n\nEl Cliente no podrá revelar a terceros información sobre funcionamiento, funcionalidades, detalles técnicos, estrategia, documentación, propuestas, precios no públicos, roadmap, datos, benchmarks o materiales de Winerim sin autorización escrita."
      ],
      [
        "33. Propiedad intelectual, industrial y bases de datos",
        "Todos los derechos de propiedad intelectual e industrial sobre Winerim, software, código, arquitectura, diseño, interfaz, marca, logotipos, documentación, bases de datos, taxonomías, modelos, algoritmos, reglas, imágenes, descripciones, traducciones, materiales, desarrollos, mejoras y activos asociados pertenecen a Winerim o sus licenciantes.\n\nEl Cliente no adquiere propiedad ni derechos de explotación por contratar, acceder o visualizar la Plataforma. Cualquier derecho no concedido expresamente queda reservado a Winerim.\n\nQueda prohibido reproducir, modificar, distribuir, transformar, comunicar públicamente, poner a disposición, sublicenciar, revender, crear obras derivadas, clonar, copiar, registrar, entrenar modelos, explotar datasets o utilizar activos de Winerim fuera del Uso Permitido.\n\nLas fotografías, textos, descripciones, fichas, traducciones, notas de cata, maridajes, etiquetas, taxonomías y contenidos proporcionados o enriquecidos por Winerim no podrán ser usados fuera de la Plataforma sin consentimiento previo y escrito."
      ],
      [
        "34. Uso comercial de nombre, logo y casos de éxito",
        "Salvo oposición escrita del Cliente o pacto particular distinto, Winerim podrá mencionar al Cliente como cliente de Winerim y utilizar su nombre comercial y logotipo en web, propuestas, presentaciones, redes sociales, materiales comerciales, portfolio y comunicaciones corporativas.\n\nLa publicación de métricas individualizadas, resultados económicos, datos de ventas, stock, márgenes o caso de éxito identificable requerirá autorización previa del Cliente, salvo que se utilicen datos agregados, anonimizados o no identificables."
      ],
      [
        "35. Protección de datos, privacidad y cookies",
        "El tratamiento de datos personales se regirá por la Política de Privacidad de Winerim y, cuando proceda, por el Anexo de Encargo de Tratamiento incluido en estos Términos o por un DPA específico.\n\nCada parte será responsable de los tratamientos de datos personales que realice por cuenta propia. Cuando Winerim trate datos personales por cuenta del Cliente, actuará como encargado del tratamiento conforme al Anexo correspondiente.\n\nEl Cliente declara disponer de base legal suficiente para incorporar datos personales a la Plataforma y se obliga a no cargar datos innecesarios, ilícitos, especialmente protegidos o de terceros sin legitimación.\n\nEl uso de cookies y tecnologías similares se limita, con carácter actual, a cookies técnicas estrictamente necesarias para el funcionamiento ordinario de la Plataforma y a las tecnologías de Stripe asociadas al proceso de pago, gestión de suscripciones, seguridad y prevención del fraude. Si Winerim incorporara en el futuro cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, informará al usuario y habilitará los mecanismos de aceptación, rechazo o configuración cuando legalmente corresponda."
      ],
      [
        "36. Seguridad, auditorías y medidas técnicas",
        "Winerim aplicará medidas técnicas y organizativas razonables para proteger la Plataforma, datos y activos, incluyendo control de accesos, autenticación, roles, medidas de confidencialidad, copias de seguridad, monitorización, seguridad de proveedores y gestión de incidencias según corresponda.\n\nEl Cliente no podrá realizar pruebas de seguridad, pentesting, escaneos, auditorías técnicas, análisis de vulnerabilidades o monitorización no autorizada sobre Winerim sin autorización previa y escrita.\n\nWinerim podrá monitorizar logs, patrones de uso, accesos, solicitudes, dispositivos, IPs, descargas, uso de API y actividad para detectar fraude, abuso, scraping, ingeniería inversa, extracción de datos, uso competitivo, vulnerabilidades o incumplimientos."
      ],
      [
        "37. Limitación de responsabilidad",
        "Winerim responderá únicamente por daños directos efectivamente acreditados que deriven de incumplimiento contractual imputable a Winerim.\n\nSalvo dolo, culpa grave o responsabilidades que legalmente no puedan excluirse, la responsabilidad total acumulada de Winerim quedará limitada al importe efectivamente abonado por el Cliente a Winerim en los doce (12) meses anteriores al hecho causante de la reclamación.\n\nWinerim no responderá por lucro cesante, pérdida de ingresos, pérdida de oportunidad, pérdida de reputación, decisiones comerciales del Cliente, pérdida de datos no imputable a Winerim, interrupciones de terceros, fallos de internet, errores de contenido del Cliente, inexactitudes de cartas, disponibilidad real de productos, cumplimiento de normativa de alcohol, ni daños indirectos, incidentales, especiales, punitivos o consecuenciales.\n\nLa Plataforma se presta tal cual y según disponibilidad, salvo garantías expresas pactadas por escrito. Winerim no garantiza que las recomendaciones, maridajes, traducciones, analíticas, previsiones o outputs sean exactos, completos o adecuados para todos los supuestos."
      ],
      [
        "38. Indemnidad del Cliente",
        "El Cliente mantendrá indemne a Winerim frente a reclamaciones, sanciones, daños, costes, gastos, honorarios, pérdidas o responsabilidades derivadas de contenido aportado por el Cliente, incumplimiento legal, uso indebido, impago, vulneración de derechos de terceros, normativa de alcohol, licencias, fiscalidad local, accesos no autorizados, extracción de datos, ingeniería inversa, uso competitivo o incumplimiento de estos Términos.\n\nSi Winerim recibe una reclamación de tercero, autoridad o competidor derivada de actuación del Cliente, el Cliente colaborará en la defensa, asumirá costes razonables y resarcirá daños y gastos en la medida legalmente procedente."
      ],
      [
        "39. Fuerza mayor",
        "Ninguna parte será responsable de retrasos o incumplimientos derivados de causas fuera de su control razonable, incluyendo desastres naturales, incendios, inundaciones, pandemias, conflictos, actos gubernamentales, huelgas, fallos eléctricos, fallos generalizados de telecomunicaciones, ataques a infraestructuras, ciberataques, interrupciones de proveedores críticos, indisponibilidad de tiendas de aplicaciones o cambios normativos imprevistos.\n\nLa parte afectada procurará comunicar la situación y mitigar sus efectos cuando resulte razonablemente posible. Si la fuerza mayor impide sustancialmente la prestación durante más de treinta (30) días, cualquiera de las partes podrá resolver el servicio afectado sin penalización, sin perjuicio de importes devengados."
      ],
      [
        "40. Cesión, subcontratación y operaciones societarias",
        "El Cliente no podrá ceder, transferir ni subcontratar sus derechos u obligaciones sin consentimiento previo y escrito de Winerim.\n\nWinerim podrá subcontratar parte de la prestación del servicio con proveedores técnicos, profesionales, cloud, pagos, soporte, analítica, IA, integraciones u otros necesarios, manteniendo la responsabilidad contractual que legalmente corresponda.\n\nWinerim podrá ceder estos Términos, la relación contractual, créditos, derechos, obligaciones o datos asociados en el marco de reorganización societaria, fusión, adquisición, venta de negocio, financiación, aportación de rama de actividad o transmisión de activos vinculados a Winerim, notificándolo cuando sea razonable o legalmente exigible."
      ],
      [
        "41. Notificaciones",
        "Para notificaciones ordinarias, Winerim podrá utilizar el email facilitado por el Cliente, avisos en la Plataforma, factura, presupuesto, panel, web o cualquier otro medio escrito razonable.\n\nEl Cliente deberá mantener actualizados sus datos de contacto. Las notificaciones enviadas al email registrado se considerarán válidamente realizadas salvo error imputable a Winerim.\n\nLas comunicaciones de baja solo serán válidas si se remiten a cancel@winerim.com conforme a la cláusula de cancelación."
      ],
      [
        "42. Cumplimiento normativo y sanciones",
        "El Cliente declara que no está sujeto a sanciones, embargos, restricciones comerciales o prohibiciones que impidan contratar con Winerim o utilizar la Plataforma.\n\nEl Cliente se compromete a no usar Winerim en actividades ilegales, territorios prohibidos, sectores restringidos, para fraude, blanqueo, evasión fiscal, infracción de derechos, scraping, competencia desleal o incumplimiento de leyes de control de exportaciones, sanciones internacionales o normativa equivalente."
      ],
      [
        "43. Modificación de estos Términos",
        "Winerim podrá actualizar estos Términos para reflejar cambios legales, técnicos, operativos, comerciales, de seguridad, proveedores, funcionalidades, estructura societaria, modelo de negocio o riesgos detectados.\n\nCuando una modificación afecte de forma material a derechos u obligaciones esenciales del Cliente, Winerim procurará comunicarla por email, aviso en Plataforma, factura, web u otro medio razonable antes de su entrada en vigor.\n\nEl uso continuado de la Plataforma tras la entrada en vigor se entenderá como aceptación de los nuevos Términos, sin perjuicio del derecho del Cliente a solicitar la baja conforme al procedimiento previsto."
      ],
      [
        "44. Nulidad parcial, interpretación y acuerdo completo",
        "Si alguna cláusula fuera declarada nula, inválida o inaplicable, ello no afectará al resto del contrato, que permanecerá vigente. La cláusula afectada se sustituirá por otra válida que se aproxime a la finalidad económica y jurídica perseguida.\n\nLa falta de ejercicio por Winerim de un derecho no constituirá renuncia. Los títulos son orientativos y no limitan el contenido de las cláusulas.\n\nEstos Términos, junto con la Política de Privacidad, Política de Cookies, Anexo de Encargo de Tratamiento, ficha de contratación, presupuesto, pedido, plan, factura o condiciones particulares aceptadas, constituyen el acuerdo completo entre las partes y sustituyen cualquier comunicación o acuerdo anterior sobre el mismo objeto."
      ],
      [
        "45. Ley aplicable y jurisdicción",
        "Estos Términos se regirán e interpretarán conforme al derecho español.\n\nPara cualquier controversia derivada de la interpretación, cumplimiento, incumplimiento o terminación de estos Términos, las partes se someten expresamente a los Juzgados y Tribunales de Donostia-San Sebastián, con renuncia a cualquier otro fuero que pudiera corresponderles, salvo norma imperativa en contrario."
      ],
      [
        "46. Contactos",
        "Para soporte, incidencias ordinarias y comunicaciones generales: info@winerim.com.\n\nPara solicitudes de cancelación o baja del servicio: cancel@winerim.com, único canal contractual válido para bajas.\n\nPara privacidad y protección de datos: info@winerim.com.\n\nANEXO I. Ficha de contratación / Orden de Servicio\n\nEsta hoja de contratación puede completarse por cada cliente o incorporarse a presupuesto, pedido, oferta, enlace de pago, factura proforma o documento equivalente. En caso de contradicción, prevalecerá lo específicamente pactado en esta hoja solo respecto de la materia concreta regulada.\n\nRazón social del Cliente\n\n[RAZÓN_SOCIAL_CLIENTE]\n\nNombre comercial / establecimiento\n\n[NOMBRE_COMERCIAL]\n\nDomicilio del establecimiento\n\n[DIRECCIÓN_ESTABLECIMIENTO]\n\nIdentificación fiscal\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPersona de contacto\n\n[NOMBRE_CONTACTO]\n\nEmail operativo\n\n[EMAIL_OPERATIVO]\n\nEmail de facturación\n\n[EMAIL_FACTURACIÓN]\n\nPlan contratado\n\n[PLAN]\n\nPeriodicidad\n\n[MENSUAL / ANUAL / PILOTO / GRUPO]\n\nPrecio\n\n[IMPORTE] EUR + impuestos aplicables\n\nFecha de activación\n\n[FECHA_ACTIVACIÓN]\n\nPermanencia inicial\n\n[SÍ / NO / DURACIÓN]\n\nForma de pago\n\n[TARJETA / TRANSFERENCIA / DOMICILIACIÓN / OTRO]\n\nSoporte incluido\n\n[HORARIO / CANALES / SLA SI EXISTE]\n\nServicios incluidos adicionales\n\n[DESCRIPCIÓN]\n\nServicios excluidos o a presupuestar\n\n[DESCRIPCIÓN]\n\nAutorización de uso de logo\n\n[SÍ / NO / CONDICIONES]\n\nCondiciones particulares\n\n[CONDICIONES_PARTICULARES]\n\nFirma o aceptación: el Cliente acepta estos Términos mediante firma, aceptación electrónica, confirmación escrita, pago, uso efectivo de la Plataforma o cualquier otro acto inequívoco de contratación.\n\nANEXO II. Acuerdo de Encargo de Tratamiento de Datos\n\nA.1. Objeto, duración y finalidad\n\nEste Anexo regula los tratamientos de datos personales que Winerim pueda realizar por cuenta del Cliente cuando el Cliente actúe como responsable del tratamiento y Winerim como encargado, en el marco de la prestación del servicio SaaS.\n\nEl objeto del tratamiento es permitir la prestación de la Plataforma, incluyendo alojamiento, configuración, publicación de cartas digitales, panel de control, soporte, mantenimiento, seguridad, analítica, integraciones y servicios asociados.\n\nLa duración coincidirá con la vigencia de la relación contractual y con los periodos posteriores necesarios para devolución, supresión, bloqueo, conservación legal, copias de seguridad, defensa frente a reclamaciones o cumplimiento normativo.\n\nA.2. Categorías de datos y personas afectadas\n\nLos datos podrán incluir datos identificativos y de contacto de representantes, administradores, empleados, colaboradores o usuarios autorizados del Cliente; credenciales; logs; datos de uso; datos de soporte; datos de facturación; y, cuando el Cliente los incorpore o conecte, datos operativos vinculados a ventas, stock, pedidos, reservas, preferencias o interacciones.\n\nLas personas afectadas podrán ser representantes del Cliente, personal del establecimiento, administradores, colaboradores, proveedores, comensales o usuarios finales, siempre en la medida en que sus datos sean tratados en el servicio.\n\nNo está previsto el tratamiento de categorías especiales de datos personales. El Cliente no deberá incorporar datos de salud, ideología, religión, afiliación sindical, datos biométricos, genéticos, vida sexual, orientación sexual, infracciones penales u otros datos especialmente protegidos salvo instrucción documentada, base legal suficiente y aceptación expresa de Winerim.\n\nA.3. Instrucciones del Cliente\n\nWinerim tratará los datos personales por cuenta del Cliente únicamente conforme a estos Términos, la Política de Privacidad, las instrucciones documentadas del Cliente y la normativa aplicable.\n\nSi Winerim considera que una instrucción infringe la normativa aplicable, podrá informar al Cliente y suspender su ejecución en la medida necesaria para evitar incumplimientos legales, riesgos de seguridad o perjuicios a terceros.\n\nA.4. Obligaciones de Winerim como encargado\n\nWinerim se obliga a tratar los datos conforme a instrucciones documentadas; garantizar que las personas autorizadas a tratarlos estén sujetas a deber de confidencialidad; aplicar medidas técnicas y organizativas apropiadas; asistir razonablemente al Cliente en solicitudes de derechos, brechas, evaluaciones de impacto o consultas previas cuando proceda; y suprimir o devolver los datos al finalizar el servicio salvo obligación de conservación.\n\nLa asistencia que exceda el soporte ordinario, requiera desarrollos, auditorías específicas, exportaciones complejas o tareas extraordinarias podrá presupuestarse aparte.\n\nA.5. Subencargados\n\nEl Cliente autoriza a Winerim a utilizar subencargados necesarios para prestar el servicio, incluyendo proveedores de alojamiento, almacenamiento, seguridad, monitorización, pagos, facturación, email, soporte, analítica, inteligencia artificial, traducción, integraciones, tiendas de aplicaciones y otros servicios técnicos.\n\nWinerim exigirá a sus subencargados obligaciones de protección de datos sustancialmente equivalentes a las asumidas en este Anexo. Winerim podrá incorporar o sustituir subencargados cuando sea necesario para la prestación del servicio, informando por medios razonables cuando sea legalmente exigible.\n\nEl listado real de subencargados deberá mantenerse actualizado en la documentación interna o pública de Winerim y facilitarse al Cliente previa solicitud razonable.\n\nA.6. Transferencias internacionales\n\nCuando el tratamiento implique transferencias internacionales de datos personales fuera del Espacio Económico Europeo o territorios con decisión de adecuación, Winerim adoptará garantías adecuadas conforme al RGPD, incluyendo cláusulas contractuales tipo, decisiones de adecuación, medidas suplementarias u otros mecanismos legalmente válidos.\n\nA.7. Seguridad y brechas\n\nWinerim aplicará medidas proporcionales de control de acceso, confidencialidad, integridad, disponibilidad, segregación lógica, copias de seguridad, monitorización, gestión de incidencias, cifrado cuando proceda y seguridad organizativa.\n\nEn caso de violación de seguridad de datos personales que afecte a datos tratados por cuenta del Cliente, Winerim notificará al Cliente sin dilación indebida desde que tenga conocimiento razonable del incidente, proporcionando la información disponible para que el Cliente pueda cumplir sus obligaciones legales.\n\nA.8. Derechos de los interesados y auditorías\n\nCuando Winerim reciba una solicitud de acceso, rectificación, supresión, oposición, limitación o portabilidad relacionada con datos tratados por cuenta del Cliente, remitirá la solicitud al Cliente o prestará asistencia razonable, salvo que Winerim actúe como responsable independiente respecto de dicho tratamiento.\n\nEl Cliente podrá solicitar información razonable para verificar el cumplimiento de este Anexo. Las auditorías presenciales o técnicas requerirán preaviso, confidencialidad, alcance limitado, no afectación a la seguridad ni a otros clientes y podrán estar sujetas a costes cuando excedan la asistencia ordinaria.\n\nA.9. Devolución y supresión\n\nA la finalización del contrato, Winerim suprimirá o devolverá los datos personales tratados por cuenta del Cliente conforme a instrucciones razonables, salvo obligación legal de conservación, bloqueo, defensa de reclamaciones, copias de seguridad o necesidad técnica temporal.\n\nLa supresión de datos no afectará a datos agregados, anonimizados o disociados que no permitan identificar razonablemente a una persona física."
      ]
    ],
    "links": [
      [
        "Inicio",
        "/"
      ],
      [
        "Producto",
        "/software-carta-de-vinos"
      ],
      [
        "Demo",
        "/demo"
      ],
      [
        "Contacto",
        "/contacto"
      ],
      [
        "Privacidad",
        "/politica-privacidad"
      ]
    ]
  },
  "/terminos": {
    "lang": "es",
    "title": "Términos y Condiciones de Contratación y Uso SaaS | Winerim",
    "description": "Términos y condiciones de contratación y uso SaaS de Winerim para clientes en España.",
    "h1": "Términos y Condiciones de Contratación y Uso SaaS",
    "subtitle": "Contrato SaaS B2B integrado para clientes profesionales de Winerim · Versión final operativa - 7 de julio de 2026 · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
    "canonical": "/terminos",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Documento",
        "Términos y Condiciones de Contratación y Uso SaaS con contrato SaaS integrado"
      ],
      [
        "Ámbito",
        "Clientes con establecimiento, domicilio fiscal o centro principal de actividad en España"
      ],
      [
        "Prestador y facturación",
        "Basque Highlands S.L., CIF B01729607, Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España"
      ],
      [
        "Marca",
        "Winerim"
      ],
      [
        "Naturaleza",
        "Servicio SaaS B2B para hostelería, restauración, hoteles y grupos profesionales"
      ],
      [
        "Bajas contractuales",
        "Únicamente por email a cancel@winerim.com con 15 días naturales de antelación"
      ],
      [
        "Contacto general",
        "info@winerim.com"
      ],
      [
        "Ley y jurisdicción",
        "Derecho español; Juzgados y Tribunales de Donostia-San Sebastián, salvo norma imperativa"
      ],
      [
        "1. Identificación del prestador y ámbito de aplicación",
        "Estos Términos y Condiciones regulan la contratación, acceso y uso profesional de Winerim, incluyendo sus aplicaciones web y móviles, paneles de control, cartas digitales, módulos de gestión, integraciones, APIs, funcionalidades de analítica, inteligencia artificial, soporte y servicios asociados.\n\nPara clientes con establecimiento, domicilio fiscal o centro principal de actividad en España, el prestador contractual y entidad emisora de facturas será Basque Highlands S.L., con CIF B01729607 y domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim.\n\nEl cliente será la persona física o jurídica que contrate el servicio en condición de empresario, profesional, sociedad, restaurante, hotel, grupo hostelero, establecimiento turístico, club, distribuidor o entidad equivalente, en adelante el Cliente."
      ],
      [
        "2. Naturaleza profesional del servicio",
        "Winerim es una plataforma SaaS B2B orientada a la digitalización, gestión, análisis y explotación comercial de cartas de vino, bodegas, stock, datos de venta y experiencia de servicio en hostelería.\n\nEl Cliente declara que contrata Winerim en el marco de su actividad profesional o empresarial y no como consumidor o usuario final. La Plataforma no está destinada a contratación por consumidores para fines particulares.\n\nLos comensales, visitantes o usuarios finales que consulten una carta digital del Cliente no adquieren por ello la condición de clientes contractuales directos de Winerim, salvo que creen una cuenta propia, utilicen funcionalidades independientes o acepten términos específicos adicionales."
      ],
      [
        "3. Objeto contractual e integración del contrato SaaS",
        "Estos Términos constituyen el contrato SaaS aplicable entre Winerim y el Cliente. No existe un contrato SaaS separado salvo que las partes firmen condiciones particulares, una orden de servicio, presupuesto, pedido, anexo o acuerdo específico.\n\nLa contratación otorga al Cliente una licencia limitada, revocable en caso de incumplimiento, no exclusiva, no sublicenciable, no transferible y condicionada al pago para acceder y utilizar la Plataforma durante la vigencia de la relación contractual y únicamente para el Uso Permitido.\n\nLa licencia no implica venta, cesión, transmisión ni adquisición de propiedad sobre software, código, datos, bases de datos, documentación, imágenes, taxonomías, huellas digitales, reglas, algoritmos, modelos, recomendaciones, insights, interfaces, diseños, know-how ni cualquier otro activo de Winerim."
      ],
      [
        "4. Aceptación y documentos contractuales",
        "La aceptación de estos Términos podrá realizarse mediante firma manuscrita o electrónica, aceptación en proceso de alta, confirmación por correo electrónico, pago de la suscripción, uso efectivo de la Plataforma, aceptación de presupuesto o cualquier otro acto inequívoco de contratación.\n\nLa contratación implica la aceptación de estos Términos, la Política de Privacidad, la Política de Cookies cuando proceda, el Anexo de Encargo de Tratamiento, la ficha de contratación, presupuesto, plan, pedido, factura o condiciones particulares aceptadas.\n\nEn caso de contradicción entre estos Términos y una condición particular firmada o aceptada expresamente por ambas partes, prevalecerá la condición particular únicamente respecto del punto concreto regulado."
      ],
      [
        "5. Definiciones esenciales",
        "Plataforma significa el conjunto de aplicaciones web, aplicaciones móviles, paneles de control, bases de datos, APIs, módulos, servicios, diseños, documentación, funcionalidades y sistemas ofrecidos bajo la marca Winerim.\n\nDatos de la Carta significa toda información relacionada con la carta de vinos del Cliente, incluyendo referencias, añadas, precios, denominaciones, regiones, países, bodegas, uvas, formatos, imágenes, descripciones, notas de cata, maridajes, disponibilidad, categorías, etiquetas, idiomas, recomendaciones, favoritos, orden de presentación y cualquier dato equivalente.\n\nDatos Operativos significa datos de stock, ventas, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, rendimiento comercial, interacciones, uso de filtros, visualizaciones, clicks, reservas o pedidos cuando existan, integraciones con terceros y cualquier información relacionada con la gestión o explotación de la carta de vinos.\n\nContenido del Cliente significa logotipos, marcas, imágenes, textos, cartas, precios, materiales, datos comerciales e información aportada por el Cliente.\n\nContenido de Winerim significa software, código, arquitectura, diseño, interfaz, bases de datos, huellas digitales de vinos, imágenes, descripciones, traducciones, recomendaciones, taxonomías, datos enriquecidos, modelos, reglas, algoritmos, documentación, textos, know-how, métricas, benchmarks, insights, materiales formativos y cualquier activo creado, licenciado, normalizado o incorporado por Winerim.\n\nDatos y Activos de Winerim significa, además del Contenido de Winerim, cualquier dataset, estructura de datos, taxonomía, normalización, clasificación, enriquecimiento, relación entre datos, modelo, patrón de uso, ranking, recomendación, métrica, informe, benchmark, señal analítica o conocimiento generado o tratado por Winerim.\n\nUso Permitido significa el uso interno, profesional y ordinario de la Plataforma por el Cliente para gestionar, visualizar y explotar su propia carta de vinos dentro del establecimiento, grupo o cuenta contratada, sin extracción, cesión, reventa, uso competitivo ni explotación externa de activos de Winerim."
      ],
      [
        "6. Alcance general del servicio",
        "Winerim permite al Cliente crear, gestionar, visualizar, explotar y analizar digitalmente su carta de vinos y la información asociada a su bodega, stock y servicio de sala.\n\nSalvo que el plan contratado indique otra cosa, el servicio podrá incluir alta del Cliente, configuración inicial, carga inicial de la carta facilitada, carta digital personalizada, enlace web o QR, aplicación descargable cuando esté disponible, panel de control, formatos de visualización, filtros, favoritos, recomendados, selección, multiidioma, activación y desactivación de vinos, modificación de precios, uvas, añadas, maridajes, descripciones y notas de cata, solicitud de nuevas referencias, analítica y soporte ordinario.\n\nLa parte frontal de la carta digital podrá ser consultada por comensales sin coste directo adicional para ellos, sin perjuicio de las tarifas abonadas por el Cliente a Winerim.\n\nLa carta podrá ser pública y accesible desde cualquier lugar, sin necesidad de que el usuario final esté físicamente en el establecimiento, salvo configuración distinta solicitada por el Cliente y aceptada técnicamente por Winerim."
      ],
      [
        "7. Servicios no incluidos salvo pacto expreso",
        "Salvo contratación expresa por escrito, no se incluyen desarrollos a medida, integraciones con TPV, PMS, ERP, CRM u otros sistemas, migraciones complejas, depuración avanzada de datos, fotografía profesional, impresión de códigos QR o material físico, formación presencial, consultoría estratégica, auditoría de bodega, gestión operativa de stock por cuenta del Cliente, soporte fuera de horario, SLA específico, APIs privadas, modelos de IA personalizados, traducciones profesionales revisadas por humano, personalización avanzada de marca ni funcionalidades no descritas en el plan contratado.\n\nWinerim podrá ofrecer servicios adicionales mediante presupuesto, pedido, anexo o contrato específico. Su contratación no modificará automáticamente estos Términos salvo indicación expresa."
      ],
      [
        "8. Alta, implantación y colaboración del Cliente",
        "El Cliente deberá facilitar a Winerim, en formato razonablemente utilizable, toda la información necesaria para la implantación: carta de vinos, precios, añadas, stock, imágenes, logos, datos fiscales, datos de contacto, accesos o cualquier otro material necesario.\n\nEl Cliente responde de la veracidad, exactitud, actualización y licitud de los contenidos y datos que entregue, cargue, modifique o mantenga en Winerim.\n\nLos plazos de activación o carga comenzarán a contar desde la recepción completa de la información necesaria y, cuando proceda, del pago inicial. Los plazos operativos son estimaciones razonables salvo garantía expresa por escrito.\n\nWinerim podrá solicitar imágenes, fichas técnicas, datos de bodega, añadas, precios u otra información necesaria para crear, completar, corregir o enriquecer referencias sin huella digital o con información insuficiente."
      ],
      [
        "9. Licencia de uso y límites",
        "El Cliente recibe una licencia limitada para usar la Plataforma únicamente durante la vigencia de la relación contractual, para su actividad profesional propia, conforme al plan contratado y al Uso Permitido.\n\nLa licencia se concede por cuenta, establecimiento, grupo, territorio, número de usuarios, módulos, funcionalidades o límites de uso indicados en la ficha de contratación o plan contratado.\n\nEl Cliente no podrá sublicenciar, ceder, alquilar, vender, revender, poner a disposición de terceros, explotar como servicio, operar en nombre de terceros, prestar servicios de consultoría basados en Winerim ni permitir el acceso de terceros no autorizados sin consentimiento previo y escrito de Winerim."
      ],
      [
        "10. Prohibiciones esenciales: ingeniería inversa, extracción y explotación de datos",
        "El Cliente no podrá realizar, permitir, facilitar, encargar o intentar realizar directa o indirectamente ingeniería inversa, descompilación, desensamblado, análisis de código, análisis de arquitectura, auditoría técnica no autorizada, escaneo, test de intrusión, explotación de vulnerabilidades, copia de lógica, copia de flujos, copia de interfaz, copia de estructura de datos o cualquier actuación orientada a comprender, replicar, sustituir o competir con Winerim.\n\nQueda prohibido descargar, extraer, copiar, indexar, minar, sincronizar, fotografiar de forma sistemática, capturar masivamente, hacer scraping, crawling, harvesting, data mining, API abuse, consultas automatizadas o cualquier obtención masiva o no autorizada de datos, contenidos, imágenes, fichas, taxonomías, estructuras, etiquetas, clasificaciones, huellas digitales, métricas, insights, recomendaciones o documentación de Winerim.\n\nQueda prohibido vender, revender, licenciar, alquilar, ceder, transferir, publicar, redistribuir, monetizar, comercializar o explotar de cualquier forma Datos y Activos de Winerim, Contenido de Winerim, datos enriquecidos, benchmarks, datasets, recomendaciones, modelos, reglas, algoritmos, know-how, informes, outputs o resultados generados por la Plataforma fuera del Uso Permitido.\n\nQueda prohibido utilizar Winerim, su contenido o sus datos para alimentar bases de datos propias o de terceros, entrenar, ajustar, evaluar o mejorar sistemas de inteligencia artificial, crear comparadores, marketplaces, buscadores, catálogos, sistemas de recomendación, soluciones de gestión de vino, herramientas de analítica, servicios de consultoría, informes sectoriales o productos competidores.\n\nEl Cliente no podrá permitir acceso o visualización de la Plataforma, demos, paneles, documentación, capturas, configuraciones, propuestas, materiales o datos a competidores directos o indirectos de Winerim, ni a terceros que desarrollen, comercialicen, asesoren o inviertan en soluciones competidoras, salvo autorización previa y escrita de Winerim.\n\nLa posibilidad técnica de visualizar, descargar, exportar, copiar o acceder a información no supone autorización jurídica para su extracción, reutilización, venta, cesión, entrenamiento de IA, monetización o explotación fuera del Uso Permitido.\n\nEl incumplimiento de esta cláusula tendrá la consideración de incumplimiento esencial y podrá justificar suspensión inmediata, resolución contractual, bloqueo de accesos, retirada o destrucción de materiales, indemnización de daños y perjuicios y ejercicio de acciones legales."
      ],
      [
        "11. Datos y Activos de Winerim",
        "Winerim conserva todos los derechos sobre sus Datos y Activos de Winerim, incluyendo datasets, taxonomías, huellas digitales de vinos, reglas de normalización, clasificaciones, modelos, patrones, benchmarks, recomendaciones, traducciones, descripciones, imágenes, documentación, interfaces, métricas, insights y cualquier enriquecimiento generado por Winerim.\n\nEl Cliente reconoce que la inversión de Winerim en creación, normalización, curación, estructuración y explotación de datos constituye un activo esencial, protegido contractual y legalmente, incluyendo, cuando proceda, derechos de propiedad intelectual, derechos sobre bases de datos, secretos empresariales y competencia desleal.\n\nNingún dato, pantalla, informe, exportación, recomendación, insight o resultado generado por Winerim podrá ser usado por el Cliente para fines ajenos a la gestión interna de su carta y servicio contratado."
      ],
      [
        "12. Contenido del Cliente",
        "El Cliente conserva la titularidad de sus marcas, logos, imágenes propias, cartas, precios, datos comerciales y demás contenido original que aporte a la Plataforma, siempre que sea efectivamente de su titularidad o disponga de derechos suficientes.\n\nEl Cliente concede a Winerim una licencia mundial, no exclusiva, gratuita, sublicenciable a proveedores técnicos, durante la vigencia del servicio y por el tiempo necesario posterior para cumplimiento legal, soporte, copias de seguridad y defensa de derechos, para alojar, reproducir, adaptar técnicamente, traducir, normalizar, enriquecer, mostrar, comunicar públicamente y tratar dicho contenido en la medida necesaria para prestar, mejorar y proteger el servicio.\n\nEl Cliente garantiza que cuenta con derechos suficientes sobre imágenes, logotipos, textos, datos, fichas, precios y materiales que aporte. Winerim no será responsable de reclamaciones de terceros derivadas de contenido proporcionado por el Cliente."
      ],
      [
        "13. Uso y exhibición pública de cartas de vino",
        "El Cliente autoriza expresamente a Winerim a mostrar y poner a disposición de usuarios finales la carta de vinos del Cliente y sus Datos de la Carta a través de la Plataforma, web, app, enlaces, códigos QR, widgets, integraciones y canales asociados al servicio.\n\nEsta autorización incluye nombres de vinos, bodegas, regiones, denominaciones, uvas, añadas, precios, formatos, imágenes, descripciones, notas de cata, maridajes, etiquetas, categorías, idiomas, disponibilidad, recomendaciones y cualquier información que forme parte de la carta digital.\n\nEl Cliente reconoce que la visualización pública de la carta forma parte esencial del servicio y que la información incluida podrá ser accesible por comensales, buscadores, navegadores, sistemas de cache, redes o terceros técnicos en la medida propia del funcionamiento de internet, salvo configuración distinta aceptada por Winerim.\n\nEl Cliente será responsable de que precios, añadas, disponibilidad, promociones, imágenes, derechos de terceros y demás información publicada sean correctos, lícitos y estén actualizados."
      ],
      [
        "14. Datos de ventas, stock, rotación y analítica",
        "El Cliente autoriza a Winerim a recoger, almacenar, tratar, analizar, visualizar, cruzar, enriquecer y utilizar Datos Operativos relacionados con carta, ventas, stock, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, interacciones, visualizaciones, filtros, favoritos, reservas o pedidos cuando existan.\n\nWinerim podrá utilizar estos datos para prestar el servicio, generar paneles, métricas, recomendaciones, alertas, informes, comparativas internas, detección de errores, mejora de funcionalidades, seguridad, prevención de fraude, soporte, desarrollo de producto y creación de inteligencia de negocio para el Cliente.\n\nWinerim podrá usar datos agregados, anonimizados o disociados para análisis sectorial, benchmarking, estadísticas, informes, desarrollo de producto, entrenamiento y mejora de modelos, comunicación comercial, estudios de mercado, recomendaciones y creación de nuevos servicios, siempre sin identificar directamente al Cliente cuando se trate de datos sensibles de ventas, stock, márgenes o rendimiento económico salvo autorización específica.\n\nWinerim no venderá datos personales. La explotación comercial de datos no personales, agregados, anonimizados o generados por Winerim no atribuye al Cliente derechos de compensación, participación o control adicional, salvo pacto escrito distinto."
      ],
      [
        "15. Alcohol, normativa de hostelería y responsabilidad del restaurante",
        "Winerim no vende, sirve, suministra, transporta, distribuye ni cobra bebidas alcohólicas a usuarios finales. La Plataforma es una herramienta tecnológica de gestión, visualización, analítica y apoyo comercial.\n\nEl Cliente es el único responsable de la venta, servicio, disponibilidad, precios, impuestos, licencias, edad legal, consumo responsable, normativa sanitaria, normativa de hostelería, normativa de publicidad de alcohol y cumplimiento local aplicable a su actividad.\n\nLas recomendaciones, maridajes, rankings, descripciones o sugerencias generadas por Winerim no sustituyen el criterio profesional del Cliente ni sus obligaciones legales frente a consumidores, autoridades o terceros."
      ],
      [
        "16. Inteligencia artificial, recomendaciones y contenido automatizado",
        "Winerim puede incorporar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, traducir, generar descripciones, sugerir maridajes, ordenar resultados, detectar patrones, recomendar referencias y mejorar la experiencia de usuario.\n\nEstas funcionalidades son herramientas de apoyo. Pueden contener errores, omisiones, sesgos, inexactitudes o resultados no adecuados a una situación concreta. El Cliente debe revisar la información relevante antes de publicarla, usarla comercialmente o tomar decisiones de compra, venta, stock o servicio.\n\nWinerim podrá modificar, limitar, sustituir, desactivar o mejorar funcionalidades de IA en cualquier momento por razones técnicas, legales, comerciales, de seguridad, de calidad o de proveedores.\n\nEl Cliente no podrá usar outputs de IA, recomendaciones, embeddings, puntuaciones, prompts, resultados, taxonomías, descripciones o datasets generados por Winerim para entrenar modelos externos, crear productos competidores, vender datos o alimentar bases de datos ajenas al Uso Permitido."
      ],
      [
        "17. Integraciones, APIs y terceros",
        "Winerim puede integrarse con proveedores de pago, TPV, PMS, ERP, CRM, herramientas de analítica, servicios de email, alojamiento cloud, tiendas de aplicaciones, proveedores de inteligencia artificial y otros terceros.\n\nLas integraciones dependerán de la disponibilidad, condiciones, APIs, cambios técnicos, tarifas, limitaciones y decisiones de esos terceros. Winerim no será responsable de fallos, cambios, interrupciones, pérdidas o limitaciones imputables a terceros ajenos a su control razonable.\n\nEl Cliente autoriza a Winerim a intercambiar datos con los terceros necesarios cuando active una integración o cuando sea imprescindible para prestar el servicio, siempre dentro del marco contractual y de privacidad aplicable."
      ],
      [
        "18. Obligaciones de Winerim",
        "Winerim prestará el servicio con diligencia profesional, conforme a los usos habituales del sector SaaS y con medios técnicos y humanos razonablemente disponibles.\n\nWinerim realizará la carga inicial de la carta facilitada por el Cliente conforme al plan contratado y a la información recibida. La exactitud final de precios, disponibilidad, añadas, stock y datos comerciales será responsabilidad del Cliente.\n\nWinerim procurará informar al Cliente de incidencias relevantes que afecten sustancialmente al servicio cuando tenga conocimiento de ellas y sea razonablemente posible."
      ],
      [
        "19. Obligaciones del Cliente",
        "El Cliente deberá pagar puntualmente las tarifas contratadas, impuestos, comisiones bancarias, gastos de devolución y cualquier importe pendiente conforme a estos Términos.\n\nEl Cliente deberá utilizar la Plataforma conforme a la ley, buena fe, documentación, instrucciones de Winerim y Uso Permitido.\n\nEl Cliente deberá formar a su personal autorizado, controlar credenciales, revisar la carta publicada, mantener datos actualizados y no cargar información ilícita, innecesaria, falsa, protegida o de terceros sin derechos suficientes.\n\nEl Cliente responderá de cualquier actuación de sus administradores, empleados, colaboradores, proveedores o terceros autorizados que accedan a la Plataforma por su cuenta o bajo sus credenciales."
      ],
      [
        "20. Cuentas, credenciales y seguridad del Cliente",
        "El Cliente será responsable de custodiar credenciales, usuarios administradores, permisos y accesos. Cualquier actuación realizada desde una cuenta del Cliente se presumirá realizada por el Cliente o por persona autorizada, salvo prueba en contrario.\n\nEl Cliente deberá notificar inmediatamente a Winerim cualquier acceso no autorizado, pérdida de credenciales, uso indebido, fuga de datos o incidencia de seguridad que afecte a su cuenta.\n\nWinerim podrá bloquear, suspender, restablecer o limitar accesos cuando existan indicios razonables de riesgo, abuso, uso no autorizado, scraping, extracción, vulneración de seguridad o incumplimiento contractual."
      ],
      [
        "21. Soporte, mantenimiento y actualizaciones",
        "El soporte ordinario se prestará a través de los canales habilitados por Winerim, incluyendo panel, email u otros medios indicados, dentro del horario operativo comunicado o contratado.\n\nWinerim es un producto vivo y en evolución continua. Winerim podrá introducir actualizaciones, mejoras, cambios técnicos, automatizaciones, integraciones, modificaciones de interfaz, nuevos módulos, ajustes de arquitectura, parches de seguridad y cambios funcionales.\n\nLas actualizaciones podrán modificar la apariencia, flujos, funcionalidades, campos, filtros, módulos o forma de prestación del servicio, siempre que no vacíen de contenido esencial el servicio contratado.\n\nWinerim podrá realizar mantenimiento programado o de emergencia. En situaciones críticas, de seguridad o de terceros, el servicio podrá interrumpirse sin aviso previo, procurando restablecerse en el menor tiempo razonable."
      ],
      [
        "22. Disponibilidad y ausencia de garantía absoluta",
        "Winerim procurará mantener la Plataforma disponible con estándares razonables del sector SaaS, pero no garantiza disponibilidad ininterrumpida, ausencia total de errores, compatibilidad permanente con todos los dispositivos, navegadores o sistemas, ni continuidad indefinida de todas las funcionalidades.\n\nSalvo que exista un SLA firmado, la Plataforma se presta en modalidad de medios razonables y según disponibilidad, sin compromisos de disponibilidad, créditos de servicio o indemnizaciones automáticas por interrupciones.\n\nWinerim no será responsable de caídas, interrupciones, pérdida de conectividad, lentitud, indisponibilidad o errores causados por proveedores cloud, internet, tiendas de aplicaciones, Stripe, APIs de terceros, dispositivos del Cliente, redes locales, configuraciones incorrectas, fuerza mayor o hechos fuera de su control razonable."
      ],
      [
        "23. Funcionalidades beta, pilotos y pruebas",
        "Winerim podrá ofrecer funcionalidades beta, pilotos, pruebas, módulos experimentales o accesos anticipados. Dichas funcionalidades se ofrecen sin garantía de continuidad, estabilidad, disponibilidad, resultado o permanencia.\n\nWinerim podrá modificar, limitar o retirar funcionalidades beta en cualquier momento sin que ello genere derecho a compensación, salvo pacto escrito distinto."
      ],
      [
        "24. Precio, facturación y forma de pago",
        "El Cliente abonará a Basque Highlands S.L. las cantidades indicadas en el plan, presupuesto, ficha de contratación, factura, enlace de pago o condición particular aceptada, más los impuestos indirectos que resulten aplicables.\n\nLa facturación podrá ser mensual, anual, por piloto, por grupo, por establecimiento, por módulo o según la modalidad contratada. El cobro podrá realizarse mediante tarjeta, domiciliación, transferencia, Stripe u otro medio aceptado por Winerim.\n\nLas facturas se emitirán en formato electrónico al email facilitado por el Cliente o a través de los medios habilitados por Winerim. El Cliente acepta la facturación electrónica salvo que solicite otro formato cuando legalmente proceda.\n\nEl Cliente será responsable de mantener actualizados sus datos fiscales y de pago. Los cambios no obligarán a modificar facturas ya emitidas correctamente con la información disponible en el momento de emisión."
      ],
      [
        "25. Actualización anual de precios",
        "El Cliente reconoce y acepta que Winerim podrá actualizar automáticamente sus precios cada año natural.\n\nCon efectos desde el 1 de enero de cada año, Winerim podrá aplicar una actualización anual de precios de entre el cinco por ciento (5%) y el diez por ciento (10%) sobre los precios vigentes durante el año anterior.\n\nEsta actualización responderá, entre otros motivos, al incremento de costes operativos, tecnológicos, infraestructura, soporte, mantenimiento, desarrollo de producto, seguridad, proveedores externos, inflación, evolución de la Plataforma y nuevas funcionalidades.\n\nLa actualización anual se entiende aceptada desde la contratación por formar parte de las condiciones económicas del contrato y no requerirá aceptación adicional. Winerim podrá comunicarla mediante email, plataforma, factura, presupuesto, renovación, comunicación comercial o cualquier otro medio escrito, sin que la falta de comunicación individualizada impida su aplicación cuando esté dentro del rango pactado.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento de cancelación previsto en estos Términos."
      ],
      [
        "26. Modificación extraordinaria de precios, planes y servicios",
        "Además de la actualización anual ordinaria, Winerim podrá modificar precios, planes, módulos, límites de uso, funcionalidades o condiciones económicas por razones técnicas, comerciales, operativas, fiscales, regulatorias, de divisa, de proveedores externos, de seguridad o de evolución del producto.\n\nCuando la modificación suponga un incremento del precio recurrente contratado fuera de la actualización anual ordinaria, Winerim lo comunicará al Cliente con una antelación mínima de quince (15) días naturales antes del siguiente cobro o renovación.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento previsto. La falta de baja en plazo o la continuidad de uso se entenderá como aceptación de las nuevas condiciones económicas."
      ],
      [
        "27. Cancelación y baja del servicio",
        "El Cliente podrá solicitar la cancelación de su suscripción exclusivamente mediante comunicación escrita enviada por correo electrónico a cancel@winerim.com.\n\nLa solicitud de baja deberá recibirse con una antelación mínima de quince (15) días naturales respecto de la fecha del siguiente cobro, renovación o periodo de facturación.\n\nLa solicitud deberá enviarse desde el correo asociado a la cuenta del Cliente o desde un correo que permita identificarlo razonablemente, e incluir como mínimo razón social, nombre comercial del establecimiento, identificación fiscal, país, servicio o suscripción cuya baja se solicita y fecha solicitada de baja.\n\nNo serán válidas a efectos de cancelación contractual las solicitudes realizadas por teléfono, WhatsApp, mensaje verbal, redes sociales, mensajes a comerciales, gestores, empleados, soporte operativo o cualquier canal distinto de cancel@winerim.com.\n\nLa baja será efectiva al finalizar el periodo de facturación en curso si la solicitud se recibe con la antelación mínima indicada. Si se recibe con menos de quince (15) días naturales, la baja producirá efectos al finalizar el periodo de facturación siguiente, quedando el Cliente obligado al pago de dicho periodo.\n\nLa cancelación no dará derecho a devolución de importes ya facturados o abonados, salvo acuerdo expreso por escrito de Winerim o exigencia legal. La baja no exime del pago de cantidades vencidas, facturas pendientes, impuestos, comisiones, servicios adicionales prestados o importes devengados antes de la fecha efectiva de baja."
      ],
      [
        "28. Impagos, devoluciones y suspensión",
        "En caso de impago, retraso, devolución de recibos, contracargo, fallo de tarjeta, rechazo bancario o incidencia de cobro, Winerim podrá reclamar el importe pendiente, comisiones bancarias, costes razonables de recobro e intereses legalmente aplicables.\n\nWinerim podrá suspender total o parcialmente el acceso a la Plataforma desde el incumplimiento de pago o tras aviso razonable, según la gravedad, sin que la suspensión libere al Cliente de sus obligaciones de pago.\n\nSi el impago persiste durante más de siete (7) días naturales desde la suspensión o requerimiento, Winerim podrá resolver la relación contractual, eliminar o limitar accesos y reclamar cantidades pendientes, daños, costes y perjuicios."
      ],
      [
        "29. Duración y renovación",
        "La duración inicial será la indicada en el plan, ficha de contratación, presupuesto, factura, orden de servicio o condición particular aceptada. A falta de indicación expresa, la duración será mensual renovable.\n\nSalvo baja válida conforme a la cláusula de cancelación, la suscripción se renovará automáticamente por periodos sucesivos equivalentes, aplicándose las tarifas vigentes, actualizaciones anuales y condiciones económicas aplicables.\n\nEn contratos anuales, pilotos con precio cerrado, compromisos mínimos o contratos con permanencia, no procederá devolución de periodos ya iniciados salvo pacto escrito distinto o exigencia legal."
      ],
      [
        "30. Suspensión y resolución por incumplimiento",
        "Winerim podrá suspender o resolver el servicio, con efecto inmediato o tras requerimiento de subsanación según la gravedad, en supuestos de impago, uso ilícito o abusivo, vulneración de propiedad intelectual, incumplimiento de confidencialidad, acceso o cesión no autorizada, uso por o para competidores, ingeniería inversa, scraping, extracción de datos, entrenamiento de IA no autorizado, monetización de datos o cualquier actuación que ponga en riesgo activos, seguridad o posición competitiva de Winerim.\n\nEn tales casos, Winerim podrá bloquear accesos, exigir el cese inmediato, ordenar retirada o destrucción de materiales, revocar licencias, conservar evidencias técnicas, reclamar indemnización y ejercitar acciones legales.\n\nEl Cliente podrá resolver la relación si Winerim incurre en incumplimiento grave no subsanado en un plazo razonable de treinta (30) días desde requerimiento escrito, siempre que el incumplimiento sea imputable a Winerim y no derive de terceros, fuerza mayor, impago o actuación del Cliente."
      ],
      [
        "31. Efectos de la terminación",
        "Finalizada la relación, cesará inmediatamente el derecho de uso del Cliente sobre la Plataforma y Winerim podrá desactivar accesos, retirar cartas públicas, detener integraciones y limitar funcionalidades.\n\nSalvo imposibilidad técnica o legal, Winerim permitirá al Cliente solicitar durante treinta (30) días naturales desde la terminación una exportación razonable de su información operativa alojada en la Plataforma, siempre que el Cliente esté al corriente de pago y la exportación no incluya Datos y Activos de Winerim, datos de otros clientes, secretos empresariales, taxonomías propietarias, modelos, reglas, estructuras, datasets enriquecidos o información no exportable.\n\nWinerim podrá conservar información necesaria para cumplimiento legal, facturación, seguridad, defensa de reclamaciones, evidencias de incumplimientos, copias de seguridad y registros internos, así como datos agregados, anonimizados o disociados.\n\nLas cláusulas de propiedad intelectual, prohibiciones de uso, no extracción, confidencialidad, protección de datos, limitación de responsabilidad, indemnidad, pagos pendientes, jurisdicción y cualesquiera otras que por su naturaleza deban subsistir permanecerán vigentes tras la terminación."
      ],
      [
        "32. Confidencialidad y secretos empresariales",
        "Ambas partes se comprometen a mantener la confidencialidad de la información técnica, comercial, estratégica, operativa, económica, financiera, jurídica, de producto, seguridad, clientes, precios, roadmap, datos y know-how a la que accedan con ocasión de la relación.\n\nEl Cliente reconoce que el software, arquitectura, bases de datos, taxonomías, modelos, recomendaciones, métricas, documentación, flujos, interfaces, lógica de negocio, datos enriquecidos y know-how de Winerim pueden constituir secretos empresariales.\n\nLa obligación de confidencialidad permanecerá durante la relación contractual y durante cinco (5) años tras su terminación. La información que constituya secreto empresarial, know-how, código, arquitectura, modelos, datos, seguridad o activos estratégicos de Winerim se protegerá mientras mantenga tal naturaleza.\n\nEl Cliente no podrá revelar a terceros información sobre funcionamiento, funcionalidades, detalles técnicos, estrategia, documentación, propuestas, precios no públicos, roadmap, datos, benchmarks o materiales de Winerim sin autorización escrita."
      ],
      [
        "33. Propiedad intelectual, industrial y bases de datos",
        "Todos los derechos de propiedad intelectual e industrial sobre Winerim, software, código, arquitectura, diseño, interfaz, marca, logotipos, documentación, bases de datos, taxonomías, modelos, algoritmos, reglas, imágenes, descripciones, traducciones, materiales, desarrollos, mejoras y activos asociados pertenecen a Winerim o sus licenciantes.\n\nEl Cliente no adquiere propiedad ni derechos de explotación por contratar, acceder o visualizar la Plataforma. Cualquier derecho no concedido expresamente queda reservado a Winerim.\n\nQueda prohibido reproducir, modificar, distribuir, transformar, comunicar públicamente, poner a disposición, sublicenciar, revender, crear obras derivadas, clonar, copiar, registrar, entrenar modelos, explotar datasets o utilizar activos de Winerim fuera del Uso Permitido.\n\nLas fotografías, textos, descripciones, fichas, traducciones, notas de cata, maridajes, etiquetas, taxonomías y contenidos proporcionados o enriquecidos por Winerim no podrán ser usados fuera de la Plataforma sin consentimiento previo y escrito."
      ],
      [
        "34. Uso comercial de nombre, logo y casos de éxito",
        "Salvo oposición escrita del Cliente o pacto particular distinto, Winerim podrá mencionar al Cliente como cliente de Winerim y utilizar su nombre comercial y logotipo en web, propuestas, presentaciones, redes sociales, materiales comerciales, portfolio y comunicaciones corporativas.\n\nLa publicación de métricas individualizadas, resultados económicos, datos de ventas, stock, márgenes o caso de éxito identificable requerirá autorización previa del Cliente, salvo que se utilicen datos agregados, anonimizados o no identificables."
      ],
      [
        "35. Protección de datos, privacidad y cookies",
        "El tratamiento de datos personales se regirá por la Política de Privacidad de Winerim y, cuando proceda, por el Anexo de Encargo de Tratamiento incluido en estos Términos o por un DPA específico.\n\nCada parte será responsable de los tratamientos de datos personales que realice por cuenta propia. Cuando Winerim trate datos personales por cuenta del Cliente, actuará como encargado del tratamiento conforme al Anexo correspondiente.\n\nEl Cliente declara disponer de base legal suficiente para incorporar datos personales a la Plataforma y se obliga a no cargar datos innecesarios, ilícitos, especialmente protegidos o de terceros sin legitimación.\n\nEl uso de cookies y tecnologías similares se limita, con carácter actual, a cookies técnicas estrictamente necesarias para el funcionamiento ordinario de la Plataforma y a las tecnologías de Stripe asociadas al proceso de pago, gestión de suscripciones, seguridad y prevención del fraude. Si Winerim incorporara en el futuro cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, informará al usuario y habilitará los mecanismos de aceptación, rechazo o configuración cuando legalmente corresponda."
      ],
      [
        "36. Seguridad, auditorías y medidas técnicas",
        "Winerim aplicará medidas técnicas y organizativas razonables para proteger la Plataforma, datos y activos, incluyendo control de accesos, autenticación, roles, medidas de confidencialidad, copias de seguridad, monitorización, seguridad de proveedores y gestión de incidencias según corresponda.\n\nEl Cliente no podrá realizar pruebas de seguridad, pentesting, escaneos, auditorías técnicas, análisis de vulnerabilidades o monitorización no autorizada sobre Winerim sin autorización previa y escrita.\n\nWinerim podrá monitorizar logs, patrones de uso, accesos, solicitudes, dispositivos, IPs, descargas, uso de API y actividad para detectar fraude, abuso, scraping, ingeniería inversa, extracción de datos, uso competitivo, vulnerabilidades o incumplimientos."
      ],
      [
        "37. Limitación de responsabilidad",
        "Winerim responderá únicamente por daños directos efectivamente acreditados que deriven de incumplimiento contractual imputable a Winerim.\n\nSalvo dolo, culpa grave o responsabilidades que legalmente no puedan excluirse, la responsabilidad total acumulada de Winerim quedará limitada al importe efectivamente abonado por el Cliente a Winerim en los doce (12) meses anteriores al hecho causante de la reclamación.\n\nWinerim no responderá por lucro cesante, pérdida de ingresos, pérdida de oportunidad, pérdida de reputación, decisiones comerciales del Cliente, pérdida de datos no imputable a Winerim, interrupciones de terceros, fallos de internet, errores de contenido del Cliente, inexactitudes de cartas, disponibilidad real de productos, cumplimiento de normativa de alcohol, ni daños indirectos, incidentales, especiales, punitivos o consecuenciales.\n\nLa Plataforma se presta tal cual y según disponibilidad, salvo garantías expresas pactadas por escrito. Winerim no garantiza que las recomendaciones, maridajes, traducciones, analíticas, previsiones o outputs sean exactos, completos o adecuados para todos los supuestos."
      ],
      [
        "38. Indemnidad del Cliente",
        "El Cliente mantendrá indemne a Winerim frente a reclamaciones, sanciones, daños, costes, gastos, honorarios, pérdidas o responsabilidades derivadas de contenido aportado por el Cliente, incumplimiento legal, uso indebido, impago, vulneración de derechos de terceros, normativa de alcohol, licencias, fiscalidad local, accesos no autorizados, extracción de datos, ingeniería inversa, uso competitivo o incumplimiento de estos Términos.\n\nSi Winerim recibe una reclamación de tercero, autoridad o competidor derivada de actuación del Cliente, el Cliente colaborará en la defensa, asumirá costes razonables y resarcirá daños y gastos en la medida legalmente procedente."
      ],
      [
        "39. Fuerza mayor",
        "Ninguna parte será responsable de retrasos o incumplimientos derivados de causas fuera de su control razonable, incluyendo desastres naturales, incendios, inundaciones, pandemias, conflictos, actos gubernamentales, huelgas, fallos eléctricos, fallos generalizados de telecomunicaciones, ataques a infraestructuras, ciberataques, interrupciones de proveedores críticos, indisponibilidad de tiendas de aplicaciones o cambios normativos imprevistos.\n\nLa parte afectada procurará comunicar la situación y mitigar sus efectos cuando resulte razonablemente posible. Si la fuerza mayor impide sustancialmente la prestación durante más de treinta (30) días, cualquiera de las partes podrá resolver el servicio afectado sin penalización, sin perjuicio de importes devengados."
      ],
      [
        "40. Cesión, subcontratación y operaciones societarias",
        "El Cliente no podrá ceder, transferir ni subcontratar sus derechos u obligaciones sin consentimiento previo y escrito de Winerim.\n\nWinerim podrá subcontratar parte de la prestación del servicio con proveedores técnicos, profesionales, cloud, pagos, soporte, analítica, IA, integraciones u otros necesarios, manteniendo la responsabilidad contractual que legalmente corresponda.\n\nWinerim podrá ceder estos Términos, la relación contractual, créditos, derechos, obligaciones o datos asociados en el marco de reorganización societaria, fusión, adquisición, venta de negocio, financiación, aportación de rama de actividad o transmisión de activos vinculados a Winerim, notificándolo cuando sea razonable o legalmente exigible."
      ],
      [
        "41. Notificaciones",
        "Para notificaciones ordinarias, Winerim podrá utilizar el email facilitado por el Cliente, avisos en la Plataforma, factura, presupuesto, panel, web o cualquier otro medio escrito razonable.\n\nEl Cliente deberá mantener actualizados sus datos de contacto. Las notificaciones enviadas al email registrado se considerarán válidamente realizadas salvo error imputable a Winerim.\n\nLas comunicaciones de baja solo serán válidas si se remiten a cancel@winerim.com conforme a la cláusula de cancelación."
      ],
      [
        "42. Cumplimiento normativo y sanciones",
        "El Cliente declara que no está sujeto a sanciones, embargos, restricciones comerciales o prohibiciones que impidan contratar con Winerim o utilizar la Plataforma.\n\nEl Cliente se compromete a no usar Winerim en actividades ilegales, territorios prohibidos, sectores restringidos, para fraude, blanqueo, evasión fiscal, infracción de derechos, scraping, competencia desleal o incumplimiento de leyes de control de exportaciones, sanciones internacionales o normativa equivalente."
      ],
      [
        "43. Modificación de estos Términos",
        "Winerim podrá actualizar estos Términos para reflejar cambios legales, técnicos, operativos, comerciales, de seguridad, proveedores, funcionalidades, estructura societaria, modelo de negocio o riesgos detectados.\n\nCuando una modificación afecte de forma material a derechos u obligaciones esenciales del Cliente, Winerim procurará comunicarla por email, aviso en Plataforma, factura, web u otro medio razonable antes de su entrada en vigor.\n\nEl uso continuado de la Plataforma tras la entrada en vigor se entenderá como aceptación de los nuevos Términos, sin perjuicio del derecho del Cliente a solicitar la baja conforme al procedimiento previsto."
      ],
      [
        "44. Nulidad parcial, interpretación y acuerdo completo",
        "Si alguna cláusula fuera declarada nula, inválida o inaplicable, ello no afectará al resto del contrato, que permanecerá vigente. La cláusula afectada se sustituirá por otra válida que se aproxime a la finalidad económica y jurídica perseguida.\n\nLa falta de ejercicio por Winerim de un derecho no constituirá renuncia. Los títulos son orientativos y no limitan el contenido de las cláusulas.\n\nEstos Términos, junto con la Política de Privacidad, Política de Cookies, Anexo de Encargo de Tratamiento, ficha de contratación, presupuesto, pedido, plan, factura o condiciones particulares aceptadas, constituyen el acuerdo completo entre las partes y sustituyen cualquier comunicación o acuerdo anterior sobre el mismo objeto."
      ],
      [
        "45. Ley aplicable y jurisdicción",
        "Estos Términos se regirán e interpretarán conforme al derecho español.\n\nPara cualquier controversia derivada de la interpretación, cumplimiento, incumplimiento o terminación de estos Términos, las partes se someten expresamente a los Juzgados y Tribunales de Donostia-San Sebastián, con renuncia a cualquier otro fuero que pudiera corresponderles, salvo norma imperativa en contrario."
      ],
      [
        "46. Contactos",
        "Para soporte, incidencias ordinarias y comunicaciones generales: info@winerim.com.\n\nPara solicitudes de cancelación o baja del servicio: cancel@winerim.com, único canal contractual válido para bajas.\n\nPara privacidad y protección de datos: info@winerim.com.\n\nANEXO I. Ficha de contratación / Orden de Servicio\n\nEsta hoja de contratación puede completarse por cada cliente o incorporarse a presupuesto, pedido, oferta, enlace de pago, factura proforma o documento equivalente. En caso de contradicción, prevalecerá lo específicamente pactado en esta hoja solo respecto de la materia concreta regulada.\n\nRazón social del Cliente\n\n[RAZÓN_SOCIAL_CLIENTE]\n\nNombre comercial / establecimiento\n\n[NOMBRE_COMERCIAL]\n\nDomicilio del establecimiento\n\n[DIRECCIÓN_ESTABLECIMIENTO]\n\nIdentificación fiscal\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPersona de contacto\n\n[NOMBRE_CONTACTO]\n\nEmail operativo\n\n[EMAIL_OPERATIVO]\n\nEmail de facturación\n\n[EMAIL_FACTURACIÓN]\n\nPlan contratado\n\n[PLAN]\n\nPeriodicidad\n\n[MENSUAL / ANUAL / PILOTO / GRUPO]\n\nPrecio\n\n[IMPORTE] EUR + impuestos aplicables\n\nFecha de activación\n\n[FECHA_ACTIVACIÓN]\n\nPermanencia inicial\n\n[SÍ / NO / DURACIÓN]\n\nForma de pago\n\n[TARJETA / TRANSFERENCIA / DOMICILIACIÓN / OTRO]\n\nSoporte incluido\n\n[HORARIO / CANALES / SLA SI EXISTE]\n\nServicios incluidos adicionales\n\n[DESCRIPCIÓN]\n\nServicios excluidos o a presupuestar\n\n[DESCRIPCIÓN]\n\nAutorización de uso de logo\n\n[SÍ / NO / CONDICIONES]\n\nCondiciones particulares\n\n[CONDICIONES_PARTICULARES]\n\nFirma o aceptación: el Cliente acepta estos Términos mediante firma, aceptación electrónica, confirmación escrita, pago, uso efectivo de la Plataforma o cualquier otro acto inequívoco de contratación.\n\nANEXO II. Acuerdo de Encargo de Tratamiento de Datos\n\nA.1. Objeto, duración y finalidad\n\nEste Anexo regula los tratamientos de datos personales que Winerim pueda realizar por cuenta del Cliente cuando el Cliente actúe como responsable del tratamiento y Winerim como encargado, en el marco de la prestación del servicio SaaS.\n\nEl objeto del tratamiento es permitir la prestación de la Plataforma, incluyendo alojamiento, configuración, publicación de cartas digitales, panel de control, soporte, mantenimiento, seguridad, analítica, integraciones y servicios asociados.\n\nLa duración coincidirá con la vigencia de la relación contractual y con los periodos posteriores necesarios para devolución, supresión, bloqueo, conservación legal, copias de seguridad, defensa frente a reclamaciones o cumplimiento normativo.\n\nA.2. Categorías de datos y personas afectadas\n\nLos datos podrán incluir datos identificativos y de contacto de representantes, administradores, empleados, colaboradores o usuarios autorizados del Cliente; credenciales; logs; datos de uso; datos de soporte; datos de facturación; y, cuando el Cliente los incorpore o conecte, datos operativos vinculados a ventas, stock, pedidos, reservas, preferencias o interacciones.\n\nLas personas afectadas podrán ser representantes del Cliente, personal del establecimiento, administradores, colaboradores, proveedores, comensales o usuarios finales, siempre en la medida en que sus datos sean tratados en el servicio.\n\nNo está previsto el tratamiento de categorías especiales de datos personales. El Cliente no deberá incorporar datos de salud, ideología, religión, afiliación sindical, datos biométricos, genéticos, vida sexual, orientación sexual, infracciones penales u otros datos especialmente protegidos salvo instrucción documentada, base legal suficiente y aceptación expresa de Winerim.\n\nA.3. Instrucciones del Cliente\n\nWinerim tratará los datos personales por cuenta del Cliente únicamente conforme a estos Términos, la Política de Privacidad, las instrucciones documentadas del Cliente y la normativa aplicable.\n\nSi Winerim considera que una instrucción infringe la normativa aplicable, podrá informar al Cliente y suspender su ejecución en la medida necesaria para evitar incumplimientos legales, riesgos de seguridad o perjuicios a terceros.\n\nA.4. Obligaciones de Winerim como encargado\n\nWinerim se obliga a tratar los datos conforme a instrucciones documentadas; garantizar que las personas autorizadas a tratarlos estén sujetas a deber de confidencialidad; aplicar medidas técnicas y organizativas apropiadas; asistir razonablemente al Cliente en solicitudes de derechos, brechas, evaluaciones de impacto o consultas previas cuando proceda; y suprimir o devolver los datos al finalizar el servicio salvo obligación de conservación.\n\nLa asistencia que exceda el soporte ordinario, requiera desarrollos, auditorías específicas, exportaciones complejas o tareas extraordinarias podrá presupuestarse aparte.\n\nA.5. Subencargados\n\nEl Cliente autoriza a Winerim a utilizar subencargados necesarios para prestar el servicio, incluyendo proveedores de alojamiento, almacenamiento, seguridad, monitorización, pagos, facturación, email, soporte, analítica, inteligencia artificial, traducción, integraciones, tiendas de aplicaciones y otros servicios técnicos.\n\nWinerim exigirá a sus subencargados obligaciones de protección de datos sustancialmente equivalentes a las asumidas en este Anexo. Winerim podrá incorporar o sustituir subencargados cuando sea necesario para la prestación del servicio, informando por medios razonables cuando sea legalmente exigible.\n\nEl listado real de subencargados deberá mantenerse actualizado en la documentación interna o pública de Winerim y facilitarse al Cliente previa solicitud razonable.\n\nA.6. Transferencias internacionales\n\nCuando el tratamiento implique transferencias internacionales de datos personales fuera del Espacio Económico Europeo o territorios con decisión de adecuación, Winerim adoptará garantías adecuadas conforme al RGPD, incluyendo cláusulas contractuales tipo, decisiones de adecuación, medidas suplementarias u otros mecanismos legalmente válidos.\n\nA.7. Seguridad y brechas\n\nWinerim aplicará medidas proporcionales de control de acceso, confidencialidad, integridad, disponibilidad, segregación lógica, copias de seguridad, monitorización, gestión de incidencias, cifrado cuando proceda y seguridad organizativa.\n\nEn caso de violación de seguridad de datos personales que afecte a datos tratados por cuenta del Cliente, Winerim notificará al Cliente sin dilación indebida desde que tenga conocimiento razonable del incidente, proporcionando la información disponible para que el Cliente pueda cumplir sus obligaciones legales.\n\nA.8. Derechos de los interesados y auditorías\n\nCuando Winerim reciba una solicitud de acceso, rectificación, supresión, oposición, limitación o portabilidad relacionada con datos tratados por cuenta del Cliente, remitirá la solicitud al Cliente o prestará asistencia razonable, salvo que Winerim actúe como responsable independiente respecto de dicho tratamiento.\n\nEl Cliente podrá solicitar información razonable para verificar el cumplimiento de este Anexo. Las auditorías presenciales o técnicas requerirán preaviso, confidencialidad, alcance limitado, no afectación a la seguridad ni a otros clientes y podrán estar sujetas a costes cuando excedan la asistencia ordinaria.\n\nA.9. Devolución y supresión\n\nA la finalización del contrato, Winerim suprimirá o devolverá los datos personales tratados por cuenta del Cliente conforme a instrucciones razonables, salvo obligación legal de conservación, bloqueo, defensa de reclamaciones, copias de seguridad o necesidad técnica temporal.\n\nLa supresión de datos no afectará a datos agregados, anonimizados o disociados que no permitan identificar razonablemente a una persona física."
      ]
    ],
    "links": [
      [
        "Inicio",
        "/"
      ],
      [
        "Producto",
        "/software-carta-de-vinos"
      ],
      [
        "Demo",
        "/demo"
      ],
      [
        "Contacto",
        "/contacto"
      ],
      [
        "Privacidad",
        "/politica-privacidad"
      ]
    ]
  },
  "/en/privacy": {
    "lang": "en",
    "title": "Privacy Policy | Winerim",
    "description": "International privacy policy for Winerim customers, administrators, visitors, diners and contacts outside Spain.",
    "h1": "Privacy Policy",
    "subtitle": "Processing of personal data on the Winerim platform · Final operational version - July 7, 2026 · Applicable to customers located outside Spain, unless otherwise agreed in writing.",
    "canonical": "/en/privacy",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "International Senior Manager",
        "Winerim LLC, Florida company, address 1210 Washington Ave 213, Miami Beach, FL 33139, USA"
      ],
      [
        "Brand/platform",
        "Winerim"
      ],
      [
        "Contact privacy",
        "info@winerim.com"
      ],
      [
        "Scope",
        "Clients, administrative users, visitors, diners and contacts located outside of Spain"
      ],
      [
        "EU representative if applicable",
        "info@winerim.com as point of contact; formal representative in the EU if legally required"
      ],
      [
        "Main regulations",
        "Privacy regulations applicable by territory; GDPR when applicable to EEA data subjects"
      ],
      [
        "Contractual withdrawals",
        "Cancellations of the service are managed exclusively at cancel@winerim.com; This policy does not replace that procedure"
      ],
      [
        "1. Responsible for international treatment",
        "The data controller for clients and users located outside of Spain will be Winerim LLC, a company incorporated under the laws of the State of Florida, United States of America, with address at 1210 Washington Ave 213, Miami Beach, FL 33139, USA, unless an offer, contract or local policy indicates another responsible entity.\n\nWhen Winerim processes data on behalf of a Client, the Client will be responsible for the processing and Winerim will act as processor or service provider in accordance with the contract, the Processing Order Annex, the documented instructions and the applicable regulations.\n\nWhen this Policy is applicable to interested parties from the European Economic Area, the United Kingdom or Switzerland, Winerim will apply the rights, guarantees and bases of legitimacy required by applicable regulations, including the GDPR when applicable. If it is mandatory to designate a formal representative in the European Union, Winerim will update this Policy with your data; in the meantime, info@winerim.com will be the operational point of contact for privacy inquiries."
      ],
      [
        "2. Who this Policy applies to",
        "This Policy applies to representatives, administrators, employees, collaborators and authorized users of professional clients; website visitors; application users; diners or end users who consult digital menus; business contacts; suppliers; candidates; people who contact support; and any person whose data is processed in the context of Winerim.\n\nWinerim is a B2B platform. Restaurants, hotels or professional clients may be responsible for certain data that they incorporate, connect or publish on the Platform, including data of their staff, users, diners or third parties."
      ],
      [
        "3. Personal data that we can process",
        "Identification and contact data: name, surname, position, company, restaurant, hotel or group, professional address, telephone number, email, username, encrypted password, account identifiers, country and language.\n\nContracting and billing data: entity, CIF/NIF/VAT/CUIT/tax ID, tax address, contracted plan, amount, currency, invoices, payments, collection status, tokenized payment method, data managed by Stripe or other payment providers, collection incidents, returns and contractual communications.\n\nTechnical and usage data: IP address, device, browser, operating system, logs, date and time, language, approximate location derived from IP, pages visited, events, clicks, sessions, errors, tokens, cookie identifiers, panel activity, security traces and API usage.\n\nAccount and preferences data: favorites, wines viewed, saved selections, searches, language preferences, interactions with recommendations, account settings and communications.\n\nMenu and operational data: wine references, prices, vintages, stock, rotation, sales, availability, notes, pairings, images, categories, filters, visualizations, commercial performance, metrics and integration data, when the Client provides or connects them.\n\nSupport and communications data: emails, tickets, messages, attachments, calls, meetings, incidents, requests, responses, support history and any information that the user voluntarily provides.\n\nContractual cancellation data: requests sent to cancel@winerim.com, Customer identification, sender email, date and time, affected subscription, associated communications and evidence necessary to prove receipt or lack of valid receipt.\n\nWe do not request special categories of data. Users and clients should not provide data on health, ideology, religion, union membership, biometrics, genetics, sex life, sexual orientation, criminal offenses or other specially protected data unless it is strictly necessary, there is a legal basis and Winerim expressly accepts it."
      ],
      [
        "4. Origin of data",
        "The data may come directly from the user or Client; of administrators authorized by the Client; from payment providers; from integrations activated by the Client, such as POS, PMS, ERP, CRM or other tools; from technical suppliers; from application stores; cookies and similar technologies; from public sources; and data generated by the use of the Platform.\n\nWhen the Client incorporates third party data into Winerim, they declare that they have sufficient legal basis and have provided the corresponding privacy information."
      ],
      [
        "5. Purposes of the treatment",
        "Create and manage accounts, authenticate users, manage permissions, allow access to the Platform and maintain security.\n\nProvide the contracted service, including configuration, upload, publication, visualization, translation, enrichment, maintenance, analysis and management of digital wine lists.\n\nManage registrations, renewals, cancellations, cancellations, payments, billing, accounting, taxes, returns, chargebacks, non-payments and contractual relationship.\n\nProvide technical and functional support, answer queries, resolve incidents, communicate changes, perform maintenance, send security, billing or service notices.\n\nAnalyze sales, stock, rotation, availability, interactions, preferences, menu performance, use of filters and exploitation metrics to offer panels, recommendations, alerts, insights and management improvement.\n\nDevelop, train, tune, test and improve internal systems for analysis, recommendation, classification, pairing, translation, normalization, error detection, security and other functionalities, preferably with aggregated, anonymized or minimized data when feasible.\n\nPrevent fraud, abuse, unauthorized access, scraping, crawling, automated extraction, reverse engineering, competitive use, breaches of contract, security incidents and attacks.\n\nSend your own commercial communications about Winerim, news, functionalities, events or similar services when there is a legal basis and respecting the right of opposition or cancellation.\n\nComply with legal obligations, respond to authorities, address claims, preserve evidence, defend rights, manage audits and corporate operations."
      ],
      [
        "6. Legal bases or foundations of the treatment",
        "For international B2B relationships, Winerim will process data on the basis of contractual execution, pre-contractual measures, compliance with legal obligations, legitimate business interests, consent when required or any other basis permitted by applicable regulations.\n\nWhen the GDPR is applicable to interested parties from the European Economic Area, the bases of legitimacy will be execution of contract, compliance with legal obligations, legitimate interest, consent and, where appropriate, instructions from the person responsible for the treatment if Winerim acts as processor.\n\nLegitimate interests include security, fraud prevention, service improvement, internal analytics, support, defense of claims, B2B communications, intellectual property protection, scraping detection, reverse engineering, data mining, API abuse and unauthorized competitive use.\n\nWhen local regulations require specific consent, Winerim will request it or the Client must obtain it before incorporating data into the Platform."
      ],
      [
        "7. Public display of wine lists",
        "The essential purpose of Winerim is to allow Clients to publicly display their wine lists in digital format. Therefore, menu data, such as references, prices, vintages, images, descriptions, pairings, categories and availability, may be publicly visible to diners, visitors, search engines and technical third parties necessary for the operation of the Internet.\n\nIn principle, this information is of a business or commercial nature. If the Client includes personal data within a letter, it will be responsible for having a legal basis and for avoiding publishing unnecessary or unauthorized personal information."
      ],
      [
        "8. Sales data, stock, analytics and benchmarking",
        "Winerim may process sales data, stock, rotation, availability, interactions, filters, visualizations, preferences and commercial performance to provide the service, show analytics to the Client, generate recommendations, improve functionalities, detect errors and offer business intelligence.\n\nWinerim may use aggregated, anonymized or dissociated data for sector analysis, benchmarking, internal or external reports, market intelligence, model training, product improvement, commercial studies and development of new features.\n\nWinerim will not sell personal data. Nor will it publish individualized data on sales, stock, margins or economic performance of a Client directly identifying it without authorization or legal need.\n\nThis Policy does not grant Customer, authorized users or third parties any right to extract, copy, sell, resell, license, assign, transfer, publish, market, train models, feed databases, scrape or exploit Winerim data, content, metrics, recommendations, taxonomies, datasets, images, descriptions or assets outside of the use permitted in the Terms."
      ],
      [
        "9. Artificial intelligence and automated decisions",
        "Winerim may use automated or artificial intelligence systems to classify wines, enrich data, generate descriptions, translate, create pairings, sort results, recommend wines, detect anomalies, improve search and optimize functionalities.\n\nThese functionalities are supportive and may make errors. They do not produce legal decisions or significantly similar effects on natural persons in the strict sense of the GDPR, unless expressly indicated otherwise in a specific functionality.\n\nWhere personal data is used in automated systems, Winerim will endeavor to apply minimisation, pseudonymisation, anonymisation or aggregation where feasible and proportionate.\n\nThe Client may not use Winerim data or outputs to train external models or develop competing solutions, in accordance with the Terms."
      ],
      [
        "10. Recipients, suppliers and subprocessors",
        "We may share data with providers who provide services to Winerim, including cloud hosting, storage, security, monitoring, email, support, analytics, payments, billing, artificial intelligence, translation, integration, internal tools, professional advisors and application stores.\n\nStripe or other payment providers may process data necessary for payments, subscriptions, billing, fraud prevention, financial compliance and regulatory obligations in accordance with their own terms and policies.\n\nApple, Google or application store operators may process data when the user downloads or uses mobile applications from their environments.\n\nWe may also communicate data to authorities, courts, public administrations, security forces, advisors, potential buyers or third parties when there is a legal obligation, valid requirement, defense of rights, corporate operation or sufficient legitimate interest.\n\nThe specific list of relevant suppliers and subprocessors must be kept up to date and made available upon reasonable request or on a specific Winerim page."
      ],
      [
        "11. International transfers and treatment from the United States",
        "Winerim LLC is located in the United States, so the data may be processed, stored or accessible from the United States and other countries where Winerim suppliers operate.\n\nWhen the processing is subject to the GDPR or other regulations that restrict international transfers, Winerim will apply appropriate guarantees, such as standard contractual clauses, adequacy decisions, supplementary measures, supplier contracts or legally valid equivalent mechanisms.\n\nThe Client acknowledges that the use of an international SaaS service may involve cross-border transfers, remote access, cloud providers, payments, support, security, analytics and artificial intelligence in different jurisdictions."
      ],
      [
        "12. Data retention",
        "The account and contract data will be kept as long as there is a contractual relationship and subsequently for the periods necessary for legal, accounting, tax compliance, defense of claims, auditing, security and responsibilities.\n\nBilling data will be kept for the periods required by applicable tax, commercial and accounting regulations.\n\nCancellation requests, contractual communications and associated evidence will be kept for the periods necessary to process the cancellation, prove their receipt or lack of valid receipt, defend claims and comply with legal obligations.\n\nThe supporting data will be kept for the time necessary to address the query or incident and subsequently for a reasonable period of time for monitoring, quality, security and defense of claims.\n\nTechnical data, logs and security will be kept for periods provided for the purposes of security, diagnosis, fraud prevention, detection of scraping, abuse, reverse engineering and service improvement.\n\nLetter, stock, sales and operational data will be kept while the account is active and for a reasonable period thereafter for export, recovery, support, backup copies, legal compliance and defense of rights.\n\nAggregated, anonymized or dissociated data may be kept indefinitely because they do not reasonably identify a natural person."
      ],
      [
        "13. Privacy Rights",
        "Interested persons may exercise the rights recognized by the regulations applicable in their jurisdiction. Where the GDPR applies, these rights include access, rectification, deletion, opposition, limitation, portability and withdrawal of consent.\n\nDepending on the country or state, there may also be rights to information, correction, deletion, exclusion of sale or sharing, limitation of certain uses, appeal or filing a complaint with competent authorities.\n\nTo exercise rights, you must contact info@winerim.com, indicating the right you wish to exercise, country of residence and sufficient data to identify the request. Winerim may request additional information to verify identity or representation.\n\nIf the request refers to data processed on behalf of a Client, Winerim may forward the request to the Client or act according to its instructions.\n\nIn the case of interested parties from the European Economic Area, they may contact the competent control authority. If there is a formally designated European representative, their details will be indicated in this Policy; in the meantime, info@winerim.com will be the operational point of contact for privacy inquiries."
      ],
      [
        "14. Cookies and similar technologies",
        "Winerim currently does not use its own analytical, advertising or marketing cookies. The Platform may use its own technical cookies strictly necessary for authentication, session, security, abuse prevention and ordinary operation of the Service. For payments, Winerim uses Stripe as a third-party provider, which may install or use cookies and similar technologies necessary to process payments, manage subscriptions, prevent fraud, enhance security, and meet financial or regulatory obligations.\n\nIf in the future Winerim incorporates non-necessary cookies, such as analytics, advertising, measurement or non-essential personalization, the user will be informed and the acceptance, rejection or configuration mechanism will be enabled when legally applicable. Rejecting non-necessary cookies will not prevent basic use of the Service when such cookies are not essential."
      ],
      [
        "15. Commercial communications",
        "Winerim may send communications regarding service, security, billing, contractual changes, maintenance, incidents or account operation, as they are necessary for the contractual relationship.\n\nWinerim may send its own commercial communications about similar services, new features, content, events or news, when there is a legal basis. The recipient may object or unsubscribe using the mechanisms indicated in each communication.\n\nThe cancellation of commercial communications does not imply the cancellation of the service. Contractual cancellation will only be valid if requested by email to cancel@winerim.com in accordance with the Terms."
      ],
      [
        "16. Security and confidentiality",
        "Winerim will apply reasonable technical and organizational measures to protect personal data against unauthorized access, alteration, loss, destruction, disclosure or misuse.\n\nThese measures may include access control, roles, authentication, encryption where appropriate, backups, monitoring, logging, incident management, contractual confidentiality, supplier review and reasonable continuity measures.\n\nNo system is completely secure. Customer and users must safeguard credentials, use strong passwords, limit permissions, and report incidents or unauthorized access."
      ],
      [
        "17. Minors",
        "Winerim is a professional B2B service and is not directed at minors. We do not knowingly request data from minors.\n\nThe Client is responsible for compliance with applicable regulations when diners or minor end users can access public menus, especially in relation to alcoholic beverages, advertising, legal age and responsible consumption."
      ],
      [
        "18. Responsibility of the Client for incorporated data",
        "The Client will be responsible for the personal data that they decide to incorporate, connect or publish in Winerim, including data of employees, collaborators, suppliers, diners, images, comments, notes or information from third parties.\n\nThe Client must inform affected persons when appropriate, obtain necessary consents, establish legal bases, respond to rights requests and avoid incorporating unnecessary or specially protected data.\n\nWinerim may delete, block or require withdrawal of data when there are indications of illegality, excess, infringement of rights, security risk or breach of contract."
      ],
      [
        "19. Non-sale of personal data and data usage limits",
        "Winerim does not sell personal data in the ordinary sense of transferring identifiable data in exchange for money.\n\nWinerim may exploit non-personal data, aggregated, anonymized, dissociated or generated by the Platform for improvement, analysis, benchmarking, AI, product, security and business purposes, in accordance with the Terms and this Policy.\n\nCustomers, users or third parties may not extract, resell, license, transfer, monetize or use Winerim data or assets for their own products, third parties, external AI, consulting, comparators, catalogs or competing solutions."
      ],
      [
        "20. Changes to this Policy",
        "Winerim may update this Policy to reflect legal, technical, operational changes, suppliers, functionalities, treatments, corporate structure or business model.\n\nWhen changes are relevant, Winerim will try to communicate them by email, platform, website or other reasonable means. Continued use of the Platform after the update implies knowledge of the current version, without prejudice to legally applicable rights."
      ],
      [
        "21. Contact",
        "For privacy and data protection: info@winerim.com.\n\nFor regular support: info@winerim.com.\n\nFor contractual cancellations of the service: exclusively cancel@winerim.com, in accordance with the Terms and Conditions."
      ]
    ],
    "links": [
      [
        "Home",
        "/en"
      ],
      [
        "Product",
        "/en/wine-list-management-software"
      ],
      [
        "Demo",
        "/en/demo"
      ],
      [
        "Contact",
        "/en/contact"
      ],
      [
        "Terms",
        "/en/terms"
      ]
    ]
  },
  "/en/terms": {
    "lang": "en",
    "title": "Terms and Conditions of Contract and Use SaaS | Winerim",
    "description": "International SaaS contracting and use terms and conditions for Winerim customers outside Spain.",
    "h1": "Terms and Conditions of Contract and Use SaaS",
    "subtitle": "Integrated B2B SaaS Contract for Winerim Professional Clients · Final operational version - July 7, 2026 · Applicable to customers located outside Spain, unless otherwise agreed in writing.",
    "canonical": "/en/terms",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Document",
        "International Terms and Conditions / International Terms and Conditions with integrated SaaS contract"
      ],
      [
        "Scope",
        "Clients located outside of Spain, unless otherwise agreed in writing"
      ],
      [
        "Provider and billing",
        "Winerim LLC, a company incorporated under the laws of the State of Florida, address 1210 Washington Ave 213, Miami Beach, FL 33139, USA"
      ],
      [
        "Brand",
        "Winerim"
      ],
      [
        "Nature",
        "B2B SaaS service for hospitality, restaurants, hotels and professional groups"
      ],
      [
        "Contractual withdrawals",
        "Only by email to cancel@winerim.com 15 calendar days in advance"
      ],
      [
        "General contact",
        "info@winerim.com"
      ],
      [
        "Law and jurisdiction",
        "Laws of the State of Florida; state or federal courts located in Miami-Dade County, Florida, except mandatory rule"
      ],
      [
        "1. Identification of the provider and scope of international application",
        "These international Terms and Conditions regulate the contracting, access and professional use of Winerim outside of Spain, including its web and mobile applications, control panels, digital menus, management modules, integrations, APIs, analytics functionalities, artificial intelligence, support and associated services.\n\nFor clients located outside of Spain, the contractual provider and invoice issuing entity will be Winerim LLC, a company incorporated under the laws of the State of Florida, United States of America, with address at 1210 Washington Ave 213, Miami Beach, FL 33139, USA, unless an offer, order, invoice or particular contract expressly indicates another providing entity.\n\nThe client will be the natural or legal person who contracts the service as a businessman, professional, company, restaurant, hotel, hospitality group, tourist establishment, club, distributor or equivalent entity, hereinafter the Client."
      ],
      [
        "2. Professional nature of the service",
        "Winerim is a B2B SaaS platform aimed at the digitization, management, analysis and commercial exploitation of wine lists, wineries, stock, sales data and service experience in hospitality.\n\nThe Client declares that he contracts Winerim within the framework of his professional or business activity and not as a consumer or end user. The Platform is not intended for contracting by consumers for particular purposes.\n\nDiners, visitors or end users who consult a digital menu from the Client do not thereby acquire the status of direct contractual clients of Winerim, unless they create their own account, use independent functionalities or accept additional specific terms."
      ],
      [
        "3. Contractual object and integration of the SaaS contract",
        "These Terms constitute the applicable SaaS agreement between Winerim and Customer. There is no separate SaaS contract unless the parties sign particular conditions, a service order, quote, order, addendum or specific agreement.\n\nThe contract grants the Client a limited license, revocable in case of non-compliance, non-exclusive, non-sublicensable, non-transferable and conditional on payment to access and use the Platform during the term of the contractual relationship and only for the Permitted Use.\n\nThe license does not imply sale, assignment, transmission or acquisition of ownership of software, code, data, databases, documentation, images, taxonomies, fingerprints, rules, algorithms, models, recommendations, insights, interfaces, designs, know-how or any other Winerim asset."
      ],
      [
        "4. Acceptance and contractual documents",
        "Acceptance of these Terms may be made by handwritten or electronic signature, acceptance in the registration process, email confirmation, subscription payment, effective use of the Platform, quote acceptance or any other unequivocal contracting act.\n\nContracting implies acceptance of these Terms, the Privacy Policy, the Cookies Policy when applicable, the Processing Order Annex, the contracting form, budget, plan, order, invoice or accepted particular conditions.\n\nIn the event of a contradiction between these Terms and a particular condition expressly signed or accepted by both parties, the particular condition will prevail only with respect to the specific point regulated."
      ],
      [
        "5. Essential definitions",
        "Platform means the set of web applications, mobile applications, control panels, databases, APIs, modules, services, designs, documentation, functionalities and systems offered under the Winerim brand.\n\nMenu Data means all information related to the Client's wine list, including references, vintages, prices, appellations, regions, countries, wineries, grapes, formats, images, descriptions, tasting notes, pairings, availability, categories, labels, languages, recommendations, favorites, order of presentation and any equivalent data.\n\nOperational Data means data on stock, sales, rotation, consumption, margins, availability, history, winery movements, commercial performance, interactions, use of filters, views, clicks, reservations or orders when they exist, integrations with third parties and any information related to the management or exploitation of the wine list.\n\nClient Content means logos, brands, images, texts, letters, prices, materials, commercial data and information provided by the Client.\n\nWinerim Content means software, code, architecture, design, interface, databases, wine fingerprints, images, descriptions, translations, recommendations, taxonomies, rich data, models, rules, algorithms, documentation, texts, know-how, metrics, benchmarks, insights, training materials and any assets created, licensed, normalized or incorporated by Winerim.\n\nWinerim Data and Assets means, in addition to the Winerim Content, any dataset, data structure, taxonomy, normalization, classification, enrichment, data relationship, model, usage pattern, ranking, recommendation, metric, report, benchmark, analytical signal or knowledge generated or processed by Winerim.\n\nPermitted Use means the internal, professional and ordinary use of the Platform by the Client to manage, view and exploit their own wine list within the establishment, group or contracted account, without extraction, transfer, resale, competitive use or external exploitation of Winerim assets."
      ],
      [
        "6. General scope of service",
        "Winerim allows the Client to digitally create, manage, visualize, exploit and analyze their wine list and the information associated with their winery, stock and room service.\n\nUnless the contracted plan indicates otherwise, the service may include Customer registration, initial configuration, initial loading of the menu provided, personalized digital menu, web or QR link, downloadable application when available, control panel, display formats, filters, favorites, recommended, selection, multi-language, activation and deactivation of wines, modification of prices, grapes, vintages, pairings, descriptions and tasting notes, request for new references, analytics and ordinary support.\n\nThe front part of the digital menu may be consulted by diners at no additional direct cost to them, without prejudice to the rates paid by the Client to Winerim.\n\nThe menu may be public and accessible from anywhere, without the end user needing to be physically in the establishment, unless a different configuration requested by the Client and technically accepted by Winerim."
      ],
      [
        "7. Services not included unless expressly agreed",
        "Unless expressly contracted in writing, custom developments, integrations with POS, PMS, ERP, CRM or other systems, complex migrations, advanced data purification, professional photography, printing of QR codes or physical material, face-to-face training, strategic consulting, warehouse audit, operational stock management on behalf of the Client, out-of-hours support, specific SLA, private APIs, personalized AI models, human-reviewed professional translations, advanced brand customization or functionalities not described in the contracted plan are not included.\n\nWinerim may offer additional services through a quote, order, annex or specific contract. Your contract will not automatically modify these Terms unless expressly indicated."
      ],
      [
        "8. Registration, implementation and collaboration of the Client",
        "The Client must provide Winerim, in a reasonably usable format, with all the information necessary for implementation: wine list, prices, vintages, stock, images, logos, tax data, contact information, access or any other necessary material.\n\nThe Client is responsible for the veracity, accuracy, updating and legality of the content and data that is delivered, uploaded, modified or maintained in Winerim.\n\nThe activation or loading periods will begin to count from the complete receipt of the necessary information and, where applicable, the initial payment. Operating times are reasonable estimates unless expressly guaranteed in writing.\n\nWinerim may request images, technical sheets, winery data, vintages, prices or other information necessary to create, complete, correct or enrich references without a digital footprint or with insufficient information."
      ],
      [
        "9. License of use and limits",
        "The Client receives a limited license to use the Platform only during the term of the contractual relationship, for its own professional activity, in accordance with the contracted plan and the Permitted Use.\n\nThe license is granted per account, establishment, group, territory, number of users, modules, functionalities or usage limits indicated in the contract form or contracted plan.\n\nThe Client may not sublicense, assign, rent, sell, resell, make available to third parties, exploit as a service, operate on behalf of third parties, provide consulting services based on Winerim or allow access to unauthorized third parties without prior written consent of Winerim."
      ],
      [
        "10. Essential Prohibitions: Reverse Engineering, Data Extraction and Exploitation",
        "The Client may not directly or indirectly perform, allow, facilitate, commission or attempt to perform reverse engineering, decompilation, disassembly, code analysis, architectural analysis, unauthorized technical audit, scanning, penetration testing, vulnerability exploitation, logic copy, flow copy, interface copy, data structure copy or any action aimed at understanding, replicating, replacing or competing with Winerim.\n\nIt is prohibited to download, extract, copy, index, mine, synchronize, systematically photograph, mass capture, scrape, crawl, harvest, data mining, API abuse, automated queries or any massive or unauthorized obtaining of data, content, images, files, taxonomies, structures, labels, classifications, fingerprints, metrics, insights, recommendations or documentation from Winerim.\n\nIt is prohibited to sell, resell, license, rent, assign, transfer, publish, redistribute, monetize, market or exploit in any way Winerim Data and Assets, Winerim Content, enriched data, benchmarks, datasets, recommendations, models, rules, algorithms, know-how, reports, outputs or results generated by the Platform outside the Permitted Use.\n\nIt is prohibited to use Winerim, its content or its data to feed its own or third-party databases, train, adjust, evaluate or improve artificial intelligence systems, create comparators, marketplaces, search engines, catalogues, recommendation systems, wine management solutions, analytical tools, consulting services, sector reports or competing products.\n\nThe Client may not allow access to or viewing of the Platform, demos, panels, documentation, screenshots, configurations, proposals, materials or data to direct or indirect competitors of Winerim, or to third parties that develop, market, advise or invest in competing solutions, unless prior written authorization from Winerim.\n\nThe technical possibility of viewing, downloading, exporting, copying or accessing information does not imply legal authorization for its extraction, reuse, sale, transfer, AI training, monetization or exploitation outside the Permitted Use.\n\nFailure to comply with this clause will be considered a fundamental breach and may justify immediate suspension, contractual termination, blocking of access, removal or destruction of materials, compensation for damages and exercise of legal actions."
      ],
      [
        "11. Winerim Data and Assets",
        "Winerim retains all rights to your Winerim Data and Assets, including datasets, taxonomies, wine fingerprints, normalization rules, classifications, models, patterns, benchmarks, recommendations, translations, descriptions, images, documentation, interfaces, metrics, insights and any enrichments generated by Winerim.\n\nThe Client acknowledges that Winerim's investment in the creation, normalization, curation, structuring and exploitation of data constitutes an essential asset, protected contractually and legally, including, where applicable, intellectual property rights, database rights, trade secrets and unfair competition.\n\nNo data, screen, report, export, recommendation, insight or result generated by Winerim may be used by the Client for purposes other than the internal management of their menu and contracted service."
      ],
      [
        "12. Client Content",
        "The Client retains ownership of its brands, logos, own images, letters, prices, commercial data and other original content that it contributes to the Platform, provided that it is effectively its ownership or has sufficient rights.\n\nThe Client grants Winerim a worldwide, non-exclusive, free-of-charge license, sublicensable to technical providers, during the term of the service and for the time necessary thereafter for legal compliance, support, backup copies and defense of rights, to host, reproduce, technically adapt, translate, normalize, enrich, display, publicly communicate and process said content to the extent necessary to provide, improve and protect the service.\n\nThe Client guarantees that it has sufficient rights over images, logos, texts, data, files, prices and materials that it provides. Winerim will not be responsible for third party claims arising from content provided by the Client."
      ],
      [
        "13. Use and public display of wine lists",
        "The Client expressly authorizes Winerim to display and make available to end users the Client's wine list and its Menu Data through the Platform, website, app, links, QR codes, widgets, integrations and channels associated with the service.\n\nThis authorization includes names of wines, wineries, regions, appellations, grapes, vintages, prices, formats, images, descriptions, tasting notes, pairings, labels, categories, languages, availability, recommendations and any information that is part of the digital menu.\n\nThe Client acknowledges that the public display of the menu is an essential part of the service and that the information included may be accessible by diners, search engines, browsers, cache systems, networks or technical third parties to the extent of the operation of the Internet, unless a different configuration is accepted by Winerim.\n\nThe Client will be responsible for ensuring that prices, vintages, availability, promotions, images, third party rights and other published information are correct, lawful and up to date."
      ],
      [
        "14. Sales, stock, turnover and analytics data",
        "The Client authorizes Winerim to collect, store, process, analyze, visualize, cross, enrich and use Operational Data related to menu, sales, stock, rotation, consumption, margins, availability, history, warehouse movements, interactions, visualizations, filters, favorites, reservations or orders when they exist.\n\nWinerim may use this data to provide the service, generate panels, metrics, recommendations, alerts, reports, internal comparisons, error detection, functionality improvement, security, fraud prevention, support, product development and creation of business intelligence for the Client.\n\nWinerim may use aggregated, anonymized or dissociated data for sector analysis, benchmarking, statistics, reports, product development, training and improvement of models, commercial communication, market studies, recommendations and creation of new services, always without directly identifying the Client when dealing with sensitive data on sales, stock, margins or economic performance unless specifically authorized.\n\nWinerim will not sell personal data. The commercial exploitation of non-personal, aggregated, anonymized or generated data by Winerim does not grant the Client rights of compensation, participation or additional control, unless otherwise agreed in writing."
      ],
      [
        "15. Alcohol, hospitality regulations and restaurant responsibility",
        "Winerim does not sell, serve, supply, transport, distribute or charge alcoholic beverages to end users. The Platform is a technological tool for management, visualization, analytics and commercial support.\n\nThe Client is solely responsible for the sale, service, availability, prices, taxes, licenses, legal age, responsible consumption, health regulations, hospitality regulations, alcohol advertising regulations and local compliance applicable to their activity.\n\nThe recommendations, pairings, rankings, descriptions or suggestions generated by Winerim do not replace the Client's professional judgment or their legal obligations towards consumers, authorities or third parties."
      ],
      [
        "16. Artificial intelligence, recommendations and automated content",
        "Winerim can incorporate automated or artificial intelligence systems to classify wines, enrich data, translate, generate descriptions, suggest pairings, sort results, detect patterns, recommend references and improve the user experience.\n\nThese functionalities are support tools. They may contain errors, omissions, biases, inaccuracies or results that are not appropriate for a specific situation. The Client must review the relevant information before publishing it, using it commercially or making purchasing, selling, stock or service decisions.\n\nWinerim may modify, limit, replace, disable or improve AI functionalities at any time for technical, legal, commercial, security, quality or supplier reasons.\n\nThe Client may not use AI outputs, recommendations, embeddings, scores, prompts, results, taxonomies, descriptions or datasets generated by Winerim to train external models, create competing products, sell data or feed databases outside the Permitted Use."
      ],
      [
        "17. Integrations, APIs and third parties",
        "Winerim can integrate with payment providers, POS, PMS, ERP, CRM, analytics tools, email services, cloud hosting, application stores, artificial intelligence providers and other third parties.\n\nIntegrations will depend on the availability, conditions, APIs, technical changes, rates, limitations and decisions of those third parties. Winerim will not be responsible for failures, changes, interruptions, losses or limitations attributable to third parties beyond its reasonable control.\n\nThe Client authorizes Winerim to exchange data with the necessary third parties when activating an integration or when it is essential to provide the service, always within the applicable contractual and privacy framework."
      ],
      [
        "18. Obligations of Winerim",
        "Winerim will provide the service with professional diligence, in accordance with the usual uses of the SaaS sector and with reasonably available technical and human means.\n\nWinerim will carry out the initial loading of the letter provided by the Client in accordance with the contracted plan and the information received. The final accuracy of prices, availability, vintages, stock and commercial data will be the responsibility of the Client.\n\nWinerim will endeavor to inform the Client of relevant incidents that substantially affect the service when it is aware of them and it is reasonably possible."
      ],
      [
        "19. Obligations of the Client",
        "The Customer must promptly pay the contracted fees, taxes, bank fees, return charges and any amounts outstanding in accordance with these Terms.\n\nThe Client must use the Platform in accordance with the law, good faith, documentation, Winerim instructions and Permitted Use.\n\nThe Client must train its authorized personnel, control credentials, review the published letter, keep data updated and not upload illegal, unnecessary, false, protected information or information from third parties without sufficient rights.\n\nThe Client will be responsible for any actions of its administrators, employees, collaborators, suppliers or authorized third parties who access the Platform on their own or under their credentials."
      ],
      [
        "20. Customer Accounts, Credentials and Security",
        "The Client will be responsible for safeguarding credentials, administrative users, permissions and access. Any action carried out from a Client account will be presumed to have been carried out by the Client or an authorized person, unless proven otherwise.\n\nThe Client must immediately notify Winerim of any unauthorized access, loss of credentials, misuse, data leak or security incident that affects its account.\n\nWinerim may block, suspend, restore or limit access when there are reasonable indications of risk, abuse, unauthorized use, scraping, extraction, security breach or breach of contract."
      ],
      [
        "21. Support, maintenance and updates",
        "Ordinary support will be provided through the channels enabled by Winerim, including panel, email or other indicated means, within the communicated or contracted operating hours.\n\nWinerim is a living and continually evolving product. Winerim may introduce updates, improvements, technical changes, automations, integrations, interface modifications, new modules, architectural adjustments, security patches and functional changes.\n\nThe updates may modify the appearance, flows, functionalities, fields, filters, modules or way of providing the service, as long as they do not empty the contracted service of essential content.\n\nWinerim may perform scheduled or emergency maintenance. In critical, security or third-party situations, the service may be interrupted without prior notice, trying to restore it in the shortest reasonable time."
      ],
      [
        "22. Availability and absence of absolute guarantee",
        "Winerim will endeavor to keep the Platform available to reasonable SaaS industry standards, but does not guarantee uninterrupted availability, complete absence of errors, permanent compatibility with all devices, browsers or systems, or indefinite continuity of all functionalities.\n\nUnless there is a signed SLA, the Platform is provided on a reasonable means and as available basis, without availability commitments, service credits or automatic compensation for interruptions.\n\nWinerim will not be responsible for outages, interruptions, loss of connectivity, slowness, unavailability or errors caused by cloud providers, internet, application stores, Stripe, third-party APIs, Customer devices, local networks, incorrect configurations, force majeure or events beyond its reasonable control."
      ],
      [
        "23. Beta features, pilots and tests",
        "Winerim may offer beta functionalities, pilots, tests, experimental modules or early access. These functionalities are offered without guarantee of continuity, stability, availability, results or permanence.\n\nWinerim may modify, limit or withdraw beta functionalities at any time without generating the right to compensation, unless otherwise agreed in writing."
      ],
      [
        "24. Price, international billing, taxes and payment method",
        "The Client will pay Winerim LLC the amounts indicated in the plan, budget, contract form, invoice, payment link or accepted particular condition, normally in United States dollars (USD), unless otherwise agreed in writing.\n\nPrices do not include taxes, fees, charges, withholdings, bank charges, transfer commissions, exchange charges, financial intermediary charges or equivalent charges applicable in the Client's jurisdiction or in international collection operations.\n\nWhen the Client's local regulations require withholdings, payments or deductions on payments abroad, these charges will be assumed by the Client through gross-up, so that Winerim LLC receives the entire agreed net amount.\n\nBilling may be monthly, annual, per pilot, per group, per establishment, per module or according to the contracted modality. Payment can be made by card, transfer, Stripe or other means accepted by Winerim.\n\nThe Client will be responsible for complying with tax, exchange, customs obligations, import of services, registration of payments abroad, withholdings or declarations that are applicable in their country."
      ],
      [
        "25. Annual price update",
        "The Client acknowledges and accepts that Winerim may automatically update its prices each calendar year.\n\nEffective January 1 of each year, Winerim may apply an annual price update of between five percent (5%) and ten percent (10%) on the prices in effect during the previous year.\n\nThis update will respond, among other reasons, to the increase in operational, technological, infrastructure, support, maintenance, product development, security, external suppliers, inflation, evolution of the Platform and new functionalities.\n\nThe annual update is understood to be accepted from the moment of contracting as it is part of the economic conditions of the contract and will not require additional acceptance. Winerim may communicate it by email, platform, invoice, budget, renewal, commercial communication or any other written means, without the lack of individualized communication preventing its application when it is within the agreed range.\n\nIf the Client is not satisfied, they may request cancellation in accordance with the cancellation procedure provided for in these Terms."
      ],
      [
        "26. Extraordinary modification of prices, plans and services",
        "In addition to the ordinary annual update, Winerim may modify prices, plans, modules, usage limits, functionalities or economic conditions for technical, commercial, operational, fiscal, regulatory, currency, external suppliers, security or product evolution reasons.\n\nWhen the modification involves an increase in the contracted recurring price outside of the ordinary annual update, Winerim will notify the Client at least fifteen (15) calendar days before the next payment or renewal.\n\nIf the Client is not satisfied, they may request cancellation in accordance with the established procedure. Failure to cancel within the period or continuity of use will be understood as acceptance of the new economic conditions."
      ],
      [
        "27. Cancellation and termination of service",
        "The Client may request the cancellation of his subscription exclusively by written communication sent by email to cancel@winerim.com.\n\nThe cancellation request must be received at least fifteen (15) calendar days in advance of the date of the next payment, renewal or billing period.\n\nThe request must be sent from the email associated with the Client's account or from an email that allows the Client to be reasonably identified, and include at least the company name, commercial name of the establishment, tax identification, country, service or subscription whose cancellation is requested and the requested date of cancellation.\n\nRequests made by telephone, WhatsApp, verbal message, social networks, messages to salespeople, managers, employees, operational support or any channel other than cancel@winerim.com will not be valid for contractual cancellation purposes.\n\nThe cancellation will be effective at the end of the current billing period if the request is received with the minimum notice indicated. If received less than fifteen (15) calendar days, the cancellation will take effect at the end of the following billing period, leaving the Client obligated to pay for said period.\n\nCancellation will not give the right to a refund of amounts already invoiced or paid, unless expressly agreed in writing by Winerim or legal requirement. The cancellation does not exempt from the payment of overdue amounts, pending invoices, taxes, commissions, additional services provided or amounts accrued before the effective date of cancellation."
      ],
      [
        "28. Non-payments, returns and suspension",
        "In the event of non-payment, delay, returned receipts, chargeback, card failure, bank rejection or collection incident, Winerim may claim the outstanding amount, bank fees, reasonable collection costs and legally applicable interest.\n\nWinerim may totally or partially suspend access to the Platform upon non-payment or after reasonable notice, depending on the severity, without the suspension releasing the Client from its payment obligations.\n\nIf non-payment persists for more than seven (7) calendar days from the suspension or requirement, Winerim may terminate the contractual relationship, eliminate or limit access and claim outstanding amounts, damages, costs and losses."
      ],
      [
        "29. Duration and renewal",
        "The initial duration will be that indicated in the plan, contracting form, budget, invoice, service order or accepted particular condition. In the absence of express indication, the duration will be renewable monthly.\n\nUnless valid cancellation in accordance with the cancellation clause, the subscription will be automatically renewed for successive equivalent periods, applying the current rates, annual updates and applicable economic conditions.\n\nIn annual contracts, pilots with a fixed price, minimum commitments or contracts with permanence, there will be no refund of periods already started unless there is a different written agreement or legal requirement."
      ],
      [
        "30. Suspension and resolution for non-compliance",
        "Winerim may suspend or terminate the service, with immediate effect or after a request for rectification depending on the severity, in cases of non-payment, illicit or abusive use, intellectual property violation, breach of confidentiality, unauthorized access or transfer, use by or for competitors, reverse engineering, scraping, data extraction, unauthorized AI training, data monetization or any action that puts Winerim's assets, security or competitive position at risk.\n\nIn such cases, Winerim may block access, demand immediate cessation, order removal or destruction of materials, revoke licenses, preserve technical evidence, claim compensation and take legal action.\n\nThe Client may terminate the relationship if Winerim incurs a serious breach that has not been remedied within a reasonable period of thirty (30) days from the written request, provided that the breach is attributable to Winerim and does not arise from third parties, force majeure, non-payment or actions of the Client."
      ],
      [
        "31. Effects of termination",
        "Once the relationship ends, the Client's right to use the Platform will immediately cease and Winerim may deactivate access, remove public letters, stop integrations and limit functionalities.\n\nUnless technically or legally impossible, Winerim will allow the Client to request, for thirty (30) calendar days from termination, a reasonable export of its operational information hosted on the Platform, provided that the Client is up to date with payment and the export does not include Winerim Data and Assets, data from other clients, business secrets, proprietary taxonomies, models, rules, structures, enriched datasets or non-exportable information.\n\nWinerim may retain information necessary for legal compliance, billing, security, defense of claims, evidence of non-compliance, backup copies and internal records, as well as aggregated, anonymized or dissociated data.\n\nThe intellectual property clauses, prohibitions on use, non-extraction, confidentiality, data protection, limitation of liability, indemnity, pending payments, jurisdiction and any others that by their nature should survive will remain in force after termination."
      ],
      [
        "32. Confidentiality and business secrets",
        "Both parties undertake to maintain the confidentiality of the technical, commercial, strategic, operational, economic, financial, legal, product, security, clients, prices, roadmap, data and know-how information to which they access during the relationship.\n\nCustomer acknowledges that Winerim's software, architecture, databases, taxonomies, models, recommendations, metrics, documentation, flows, interfaces, business logic, rich data and know-how may constitute trade secrets.\n\nThe obligation of confidentiality will remain during the contractual relationship and for five (5) years after its termination. Information that constitutes a business secret, know-how, code, architecture, models, data, security or strategic assets of Winerim will be protected as long as it remains such.\n\nThe Client may not reveal to third parties information about operation, functionalities, technical details, strategy, documentation, proposals, non-public prices, roadmap, data, benchmarks or Winerim materials without written authorization."
      ],
      [
        "33. Intellectual and industrial property and databases",
        "All intellectual and industrial property rights over Winerim, software, code, architecture, design, interface, brand, logos, documentation, databases, taxonomies, models, algorithms, rules, images, descriptions, translations, materials, developments, improvements and associated assets belong to Winerim or its licensors.\n\nThe Client does not acquire ownership or exploitation rights by contracting, accessing or viewing the Platform. Any rights not expressly granted are reserved to Winerim.\n\nIt is prohibited to reproduce, modify, distribute, transform, publicly communicate, make available, sublicense, resell, create derivative works, clone, copy, register, train models, exploit datasets or use Winerim assets outside of the Permitted Use.\n\nThe photographs, texts, descriptions, files, translations, tasting notes, pairings, labels, taxonomies and content provided or enriched by Winerim may not be used outside the Platform without prior written consent."
      ],
      [
        "34. Commercial use of name, logo and success stories",
        "Unless there is written opposition from the Client or a different private agreement, Winerim may mention the Client as a client of Winerim and use its commercial name and logo on the website, proposals, presentations, social networks, commercial materials, portfolio and corporate communications.\n\nThe publication of individualized metrics, economic results, sales data, stock, margins or identifiable success story will require prior authorization from the Client, unless aggregated, anonymized or non-identifiable data is used."
      ],
      [
        "35. Data protection, privacy and cookies",
        "The processing of personal data will be governed by the Winerim Privacy Policy and, where applicable, by the Processing Order Annex included in these Terms or by a specific DPA.\n\nEach party will be responsible for the processing of personal data carried out on its own behalf. When Winerim processes personal data on behalf of the Client, it will act as data processor in accordance with the corresponding Annex.\n\nThe Client declares that it has a sufficient legal basis to incorporate personal data into the Platform and undertakes not to upload unnecessary, illicit, specially protected data or data from third parties without legitimacy.\n\nThe use of cookies and similar technologies is currently limited to technical cookies strictly necessary for the ordinary functioning of the Platform and Stripe technologies associated with the payment process, subscription management, security and fraud prevention. If Winerim incorporates non-necessary cookies in the future, such as analytics, advertising, measurement or non-essential personalization, it will inform the user and enable acceptance, rejection or configuration mechanisms when legally applicable."
      ],
      [
        "36. Security, audits and technical measures",
        "Winerim will apply reasonable technical and organizational measures to protect the Platform, data and assets, including access control, authentication, roles, confidentiality measures, backups, monitoring, supplier security and incident management as appropriate.\n\nThe Client may not perform security testing, pentesting, scans, technical audits, vulnerability analysis or unauthorized monitoring on Winerim without prior written authorization.\n\nWinerim may monitor logs, usage patterns, accesses, requests, devices, IPs, downloads, API usage and activity to detect fraud, abuse, scraping, reverse engineering, data extraction, competitive use, vulnerabilities or breaches."
      ],
      [
        "37. Limitation of liability",
        "Winerim will only be liable for directly proven direct damages resulting from contractual breach attributable to Winerim.\n\nExcept for fraud, gross negligence or liabilities that cannot legally be excluded, the total accumulated liability of Winerim will be limited to the amount actually paid by the Client to Winerim in the twelve (12) months prior to the event giving rise to the claim.\n\nWinerim will not be liable for loss of profits, loss of income, loss of opportunity, loss of reputation, commercial decisions of the Client, loss of data not attributable to Winerim, third party interruptions, internet failures, errors in the Client's content, inaccuracies in letters, actual availability of products, compliance with alcohol regulations, or indirect, incidental, special, punitive or consequential damages.\n\nThe Platform is provided as is and as available, except for express guarantees agreed in writing. Winerim does not guarantee that the recommendations, pairings, translations, analytics, forecasts or outputs are accurate, complete or appropriate for all cases."
      ],
      [
        "38. Client Indemnity",
        "The Client will hold Winerim harmless against claims, penalties, damages, costs, expenses, fees, losses or liabilities arising from content contributed by the Client, legal non-compliance, misuse, non-payment, violation of third party rights, alcohol regulations, licenses, local taxation, unauthorized access, data extraction, reverse engineering, competitive use or breach of these Terms.\n\nIf Winerim receives a claim from a third party, authority or competitor arising from the Client's actions, the Client will collaborate in the defense, assume reasonable costs and compensate for damages and expenses to the extent legally appropriate."
      ],
      [
        "39. Force majeure",
        "Neither party will be liable for delays or non-compliance resulting from causes beyond its reasonable control, including natural disasters, fires, floods, pandemics, conflicts, government actions, strikes, power failures, widespread telecommunications failures, infrastructure attacks, cyber-attacks, disruptions of critical suppliers, unavailability of app stores or unforeseen regulatory changes.\n\nThe affected party will endeavor to communicate the situation and mitigate its effects when reasonably possible. If force majeure substantially prevents the provision for more than thirty (30) days, either party may terminate the affected service without penalty, without prejudice to amounts accrued."
      ],
      [
        "40. Transfer, subcontracting and corporate operations",
        "The Client may not assign, transfer or subcontract its rights or obligations without prior written consent from Winerim.\n\nWinerim may subcontract part of the provision of the service with technical, professional, cloud, payments, support, analytics, AI, integrations or other necessary providers, maintaining the contractual responsibility that legally corresponds.\n\nWinerim may assign these Terms, the contractual relationship, credits, rights, obligations or associated data within the framework of corporate reorganization, merger, acquisition, sale of business, financing, contribution of branch of activity or transfer of assets linked to Winerim, notifying it when reasonable or legally required."
      ],
      [
        "41. Notifications",
        "For ordinary notifications, Winerim may use the email provided by the Client, notices on the Platform, invoice, quote, panel, website or any other reasonable written means.\n\nThe Client must keep their contact information updated. Notifications sent to the registered email will be considered validly made unless there is an error attributable to Winerim.\n\nCancellation communications will only be valid if they are sent to cancel@winerim.com in accordance with the cancellation clause."
      ],
      [
        "42. Regulatory compliance and sanctions",
        "The Client declares that it is not subject to sanctions, embargoes, commercial restrictions or prohibitions that prevent contracting with Winerim or using the Platform.\n\nThe Client agrees not to use Winerim in illegal activities, prohibited territories, restricted sectors, for fraud, money laundering, tax evasion, infringement of rights, scraping, unfair competition or non-compliance with export control laws, international sanctions or equivalent regulations."
      ],
      [
        "43. Modification of these Terms",
        "Winerim may update these Terms to reflect legal, technical, operational, commercial, security changes, suppliers, functionalities, corporate structure, business model or detected risks.\n\nWhen a modification materially affects the essential rights or obligations of the Client, Winerim will endeavor to communicate it by email, notice on the Platform, invoice, website or other reasonable means before it comes into effect.\n\nContinued use of the Platform after entry into force will be understood as acceptance of the new Terms, without prejudice to the Client's right to request cancellation in accordance with the established procedure."
      ],
      [
        "44. Partial nullity, interpretation and complete agreement",
        "If any clause is declared null, invalid or inapplicable, this will not affect the rest of the contract, which will remain in force. The affected clause will be replaced by another valid one that is close to the economic and legal purpose pursued.\n\nWinerim's failure to exercise a right will not constitute a waiver. The titles are indicative and do not limit the content of the clauses.\n\nThese Terms, together with the Privacy Policy, Cookies Policy, Processing Order Annex, contract form, budget, order, plan, invoice or accepted particular conditions, constitute the complete agreement between the parties and replace any previous communication or agreement on the same subject."
      ],
      [
        "45. Applicable law and international jurisdiction",
        "These Terms will be governed and construed in accordance with the laws of the State of Florida, United States of America, without prejudice to mandatory regulations that may be applicable in the Customer's jurisdiction.\n\nFor any controversy arising from the interpretation, compliance, breach or termination of these Terms, the parties submit to the exclusive jurisdiction of the state or federal courts located in Miami-Dade County, Florida, United States of America, waiving any other jurisdiction that may apply to them, unless otherwise mandatory.\n\nThe Client acknowledges that the contract is B2B and that he is not acting as a consumer. If mandatory local protection rules are applicable in any jurisdiction, these will be applied only to the strictly mandatory extent."
      ],
      [
        "46. Contacts",
        "For support, ordinary incidents and general communications: info@winerim.com.\n\nFor cancellation or cancellation requests from the service: cancel@winerim.com, the only valid contractual channel for cancellations.\n\nFor privacy and data protection: info@winerim.com.\n\nANNEX I. Contracting form / Service Order\n\nThis contracting sheet can be completed for each client or incorporated into a budget, order, offer, payment link, proforma invoice or equivalent document. In case of contradiction, what is specifically agreed on this sheet will prevail only with respect to the specific regulated matter.\n\nCompany name of the Client\n\n[CUSTOMER_SOCIAL_NATURE]\n\nTrade name/establishment\n\n[BUSINESS_NAME]\n\nEstablishment address\n\n[ESTABLISHMENT_ADDRESS]\n\nTax ID\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nContact person\n\n[CONTACT_NAME]\n\nOperational email\n\n[OPERATIONAL_EMAIL]\n\nBilling email\n\n[BILLING_EMAIL]\n\nContracted plan\n\n[PLAN]\n\nPeriodicity\n\n[MONTHLY / ANNUAL / PILOT / GROUP]\n\nPrice\n\n[AMOUNT] USD + applicable taxes, withholdings and expenses\n\nActivation date\n\n[ACTIVATION_DATE]\n\nInitial stay\n\n[YES / NO / DURATION]\n\nPayment method\n\n[CARD / TRANSFER / DIRECT DEMICILIATION / OTHER]\n\nSupport included\n\n[SCHEDULE / CHANNELS / SLA IF EXISTS]\n\nAdditional included services\n\n[DESCRIPTION]\n\nServices excluded or to be budgeted\n\n[DESCRIPTION]\n\nLogo use authorization\n\n[YES / NO / CONDITIONS]\n\nSpecific conditions\n\n[SPECIAL_CONDITIONS]\n\nSignature or acceptance: the Client accepts these Terms by signature, electronic acceptance, written confirmation, payment, effective use of the Platform or any other unequivocal act of contract.\n\nANNEX II. Data Processing Commission Agreement\n\nA.1. Object, duration and purpose\n\nThis Annex regulates the processing of personal data that Winerim may carry out on behalf of the Client when the Client acts as data controller and Winerim as processor, within the framework of the provision of the SaaS service.\n\nThe purpose of the processing is to allow the provision of the Platform, including hosting, configuration, publication of digital charts, control panel, support, maintenance, security, analytics, integrations and associated services.\n\nThe duration will coincide with the validity of the contractual relationship and with the subsequent periods necessary for return, deletion, blocking, legal conservation, backup copies, defense against claims or regulatory compliance.\n\nA.2. Categories of data and affected persons\n\nThe data may include identification and contact data of representatives, administrators, employees, collaborators or authorized users of the Client; credentials; logs; usage data; supporting data; billing information; and, when the Client incorporates or connects them, operational data linked to sales, stock, orders, reservations, preferences or interactions.\n\nThe affected persons may be representatives of the Client, establishment staff, administrators, collaborators, suppliers, diners or end users, always to the extent that their data is processed in the service.\n\nThe processing of special categories of personal data is not foreseen. The Client must not incorporate data on health, ideology, religion, union membership, biometric, genetic data, sex life, sexual orientation, criminal offenses or other specially protected data unless documented instruction, sufficient legal basis and express acceptance by Winerim.\n\nA.3. Client Instructions\n\nWinerim will process personal data on behalf of the Client only in accordance with these Terms, the Privacy Policy, the Client's documented instructions and applicable regulations.\n\nIf Winerim considers that an instruction violates applicable regulations, it may inform the Client and suspend its execution to the extent necessary to avoid legal breaches, security risks or harm to third parties.\n\nA.4. Obligations of Winerim as manager\n\nWinerim undertakes to process the data in accordance with documented instructions; guarantee that the people authorized to process them are subject to the duty of confidentiality; apply appropriate technical and organizational measures; reasonably assist the Client with entitlement requests, gaps, impact assessments or prior consultations where appropriate; and delete or return the data at the end of the service unless there is an obligation to retain it.\n\nAssistance that exceeds ordinary support, requires developments, specific audits, complex exports or extraordinary tasks may be budgeted separately.\n\nA.5. Subprocessors\n\nThe Client authorizes Winerim to use subprocessors necessary to provide the service, including providers of hosting, storage, security, monitoring, payments, billing, email, support, analytics, artificial intelligence, translation, integrations, application stores and other technical services.\n\nWinerim will require its subprocessors to have data protection obligations substantially equivalent to those assumed in this Annex. Winerim may incorporate or replace sub-processors when necessary for the provision of the service, informing by reasonable means when legally required.\n\nThe actual list of subprocessors must be kept up to date in Winerim's internal or public documentation and provided to the Client upon reasonable request.\n\nA.6. International transfers\n\nWhen the processing involves international transfers of personal data outside the European Economic Area or territories with an adequacy decision, Winerim will adopt appropriate guarantees in accordance with the GDPR, including standard contractual clauses, adequacy decisions, supplementary measures or other legally valid mechanisms. Since Winerim LLC is located in the United States, the parties acknowledge that there may be access or processing from the United States and that the applicable guarantees must be documented when the processing is subject to the GDPR or other equivalent regulations.\n\nA.7. Security and breaches\n\nWinerim will apply proportionate measures of access control, confidentiality, integrity, availability, logical segregation, backups, monitoring, incident management, encryption where appropriate and organizational security.\n\nIn the event of a personal data security breach that affects data processed on behalf of the Client, Winerim will notify the Client without undue delay as soon as it has reasonable knowledge of the incident, providing the information available so that the Client can comply with its legal obligations.\n\nA.8. Rights of interested parties and audits\n\nWhen Winerim receives a request for access, rectification, deletion, opposition, limitation or portability related to data processed on behalf of the Client, it will forward the request to the Client or provide reasonable assistance, unless Winerim acts as an independent controller with respect to such processing.\n\nCustomer may request reasonable information to verify compliance with this Addendum. In-person or technical audits will require prior notice, confidentiality, limited scope, no impact on security or other clients and may be subject to costs when they exceed ordinary assistance.\n\nA.9. Return and deletion\n\nAt the end of the contract, Winerim will delete or return the personal data processed on behalf of the Client in accordance with reasonable instructions, except for legal obligation of conservation, blocking, defense of claims, backup copies or temporary technical need.\n\nThe deletion of data will not affect aggregated, anonymized or dissociated data that does not allow a natural person to be reasonably identified."
      ]
    ],
    "links": [
      [
        "Home",
        "/en"
      ],
      [
        "Product",
        "/en/wine-list-management-software"
      ],
      [
        "Demo",
        "/en/demo"
      ],
      [
        "Contact",
        "/en/contact"
      ],
      [
        "Privacy",
        "/en/privacy"
      ]
    ]
  },
  "/it/privacy": {
    "lang": "it",
    "title": "Informativa sulla privacy | Winerim",
    "description": "Informativa privacy internazionale per clienti, amministratori, visitatori, commensali e contatti Winerim fuori dalla Spagna.",
    "h1": "Informativa sulla privacy",
    "subtitle": "Trattamento dei dati personali sulla piattaforma Winerim · Versione operativa finale: 7 luglio 2026 · Applicabile ai clienti situati fuori dalla Spagna, salvo diverso accordo scritto.",
    "canonical": "/it/privacy",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Direttore senior internazionale",
        "Winerim LLC, società della Florida, indirizzo 1210 Washington Ave 213, Miami Beach, FL 33139, Stati Uniti"
      ],
      [
        "Marchio/piattaforma",
        "Winerim"
      ],
      [
        "Contattoprivacy",
        "info@winerim.com"
      ],
      [
        "Ambito",
        "Clienti, utenti amministrativi, visitatori, commensali e contatti situati al di fuori della Spagna"
      ],
      [
        "Rappresentante dell'UE, se applicabile",
        "info@winerim.com come punto di contatto; rappresentante formale nell’UE se richiesto dalla legge"
      ],
      [
        "Principali normative",
        "Normativa Privacy applicabile per territorio; GDPR quando applicabile agli interessati del SEE"
      ],
      [
        "Recessi contrattuali",
        "Le cancellazioni del servizio vengono gestite esclusivamente all'indirizzo cancel@winerim.com; Questa politica non sostituisce tale procedura"
      ],
      [
        "1. Responsabile del trattamento internazionale",
        "Il titolare del trattamento dei dati per i clienti e gli utenti situati al di fuori della Spagna sarà Winerim LLC, una società costituita secondo le leggi dello Stato della Florida, Stati Uniti d'America, con indirizzo a 1210 Washington Ave 213, Miami Beach, FL 33139, USA, a meno che un'offerta, un contratto o una politica locale non indichino un'altra entità responsabile.\n\nQuando Winerim elabora i dati per conto di un Cliente, il Cliente sarà responsabile del trattamento e Winerim agirà come responsabile del trattamento o fornitore di servizi in conformità con il contratto, l'Allegato sull'Ordine di Elaborazione, le istruzioni documentate e le normative applicabili.\n\nQuando la presente Politica è applicabile alle parti interessate dello Spazio Economico Europeo, del Regno Unito o della Svizzera, Winerim applicherà i diritti, le garanzie e le basi di legittimità richieste dalle normative applicabili, incluso il RGPD quando applicabile. Qualora fosse obbligatorio designare un rappresentante formale nell'Unione Europea, Winerim aggiornerà la presente Policy con i tuoi dati; nel frattempo, info@winerim.com sarà il punto di contatto operativo per richieste di privacy."
      ],
      [
        "2. A chi si applica questa Politica",
        "La presente Policy si applica ai rappresentanti, amministratori, dipendenti, collaboratori e utenti autorizzati di clienti professionali; visitatori del sito web; utenti dell'applicazione; commensali o utenti finali che consultano i menù digitali; contatti commerciali; fornitori; candidati; persone che contattano l'assistenza; e qualsiasi persona i cui dati vengono trattati nell'ambito di Winerim.\n\nWinerim è una piattaforma B2B. Ristoranti, hotel o clienti professionali possono essere responsabili di alcuni dati che incorporano, collegano o pubblicano sulla Piattaforma, compresi i dati del loro personale, degli utenti, dei commensali o di terzi."
      ],
      [
        "3. Dati personali che possiamo trattare",
        "Dati identificativi e di contatto: nome, cognome, posizione, azienda, ristorante, hotel o gruppo, indirizzo professionale, numero di telefono, email, nome utente, password crittografata, identificatori dell'account, paese e lingua.\n\nDati contrattuali e di fatturazione: entità, CIF/NIF/IVA/CUIT/ID fiscale, indirizzo fiscale, piano contrattuale, importo, valuta, fatture, pagamenti, stato di riscossione, metodo di pagamento tokenizzato, dati gestiti da Stripe o altri fornitori di pagamenti, incidenti di riscossione, resi e comunicazioni contrattuali.\n\nDati tecnici e di utilizzo: indirizzo IP, dispositivo, browser, sistema operativo, registri, data e ora, lingua, posizione approssimativa derivata dall'IP, pagine visitate, eventi, clic, sessioni, errori, token, identificatori di cookie, attività del pannello, tracce di sicurezza e utilizzo dell'API.\n\nDati sull'account e sulle preferenze: preferiti, vini visualizzati, selezioni salvate, ricerche, preferenze della lingua, interazioni con consigli, impostazioni dell'account e comunicazioni.\n\nMenu e dati operativi: referenze di vini, prezzi, annate, stock, rotazione, vendite, disponibilità, note, abbinamenti, immagini, categorie, filtri, visualizzazioni, performance commerciale, metriche e dati di integrazione, quando il Cliente li fornisce o li collega.\n\nDati di supporto e comunicazioni: e-mail, ticket, messaggi, allegati, chiamate, riunioni, incidenti, richieste, risposte, cronologia del supporto e qualsiasi informazione fornita volontariamente dall'utente.\n\nDati di cancellazione contrattuale: richieste inviate a cancel@winerim.com, identificazione del Cliente, email del mittente, data e ora, abbonamento interessato, comunicazioni associate e prove necessarie per dimostrare la ricezione o la mancanza di ricevuta valida.\n\nNon richiediamo categorie particolari di dati. Gli utenti e i clienti non dovrebbero fornire dati su salute, ideologia, religione, appartenenza sindacale, dati biometrici, genetica, vita sessuale, orientamento sessuale, reati penali o altri dati particolarmente protetti a meno che non sia strettamente necessario, non vi sia una base legale e Winerim lo accetti espressamente."
      ],
      [
        "4. Origine dei dati",
        "I dati possono provenire direttamente dall'utente o dal Cliente; di amministratori autorizzati dal Cliente; dai fornitori di servizi di pagamento; da integrazioni attivate dal Cliente, quali POS, PMS, ERP, CRM o altri strumenti; da fornitori tecnici; dagli store di applicazioni; cookie e tecnologie simili; da fonti pubbliche; e dati generati dall'utilizzo della Piattaforma.\n\nQuando il Cliente incorpora dati di terzi in Winerim, dichiara di disporre di basi giuridiche sufficienti e di aver fornito la corrispondente informativa sulla privacy."
      ],
      [
        "5. Finalità del trattamento",
        "Crea e gestisci account, autentica gli utenti, gestisci le autorizzazioni, consenti l'accesso alla piattaforma e mantieni la sicurezza.\n\nFornire il servizio contrattato, inclusa la configurazione, il caricamento, la pubblicazione, la visualizzazione, la traduzione, l'arricchimento, la manutenzione, l'analisi e la gestione delle carte dei vini digitali.\n\nGestire iscrizioni, rinnovi, cancellazioni, cancellazioni, pagamenti, fatturazione, contabilità, tasse, resi, storni di addebito, mancati pagamenti e rapporto contrattuale.\n\nFornire supporto tecnico e funzionale, rispondere a domande, risolvere incidenti, comunicare modifiche, eseguire manutenzioni, inviare avvisi di sicurezza, fatturazione o servizio.\n\nAnalizza vendite, stock, rotazione, disponibilità, interazioni, preferenze, prestazioni dei menu, utilizzo di filtri e metriche di sfruttamento per offrire pannelli, consigli, avvisi, approfondimenti e miglioramenti gestionali.\n\nSviluppare, formare, mettere a punto, testare e migliorare i sistemi interni per l'analisi, la raccomandazione, la classificazione, l'abbinamento, la traduzione, la normalizzazione, il rilevamento degli errori, la sicurezza e altre funzionalità, preferibilmente con dati aggregati, anonimizzati o ridotti al minimo quando possibile.\n\nPrevenire frodi, abusi, accessi non autorizzati, scraping, crawling, estrazioni automatizzate, reverse engineering, uso competitivo, violazioni contrattuali, incidenti di sicurezza e attacchi.\n\nInviare le proprie comunicazioni commerciali su Winerim, novità, funzionalità, eventi o servizi simili quando esiste una base legale e rispettando il diritto di opposizione o cancellazione.\n\nRispettare gli obblighi legali, rispondere alle autorità, affrontare i reclami, conservare le prove, difendere i diritti, gestire audit e operazioni aziendali."
      ],
      [
        "6. Basi giuridiche o fondamenti del trattamento",
        "Per i rapporti B2B internazionali, Winerim tratterà i dati sulla base dell'esecuzione contrattuale, delle misure precontrattuali, del rispetto degli obblighi di legge, dei legittimi interessi commerciali, del consenso quando richiesto o di qualsiasi altra base consentita dalle normative applicabili.\n\nQuando il GDPR è applicabile a soggetti interessati dello Spazio Economico Europeo, le basi di legittimità saranno l’esecuzione del contratto, il rispetto degli obblighi legali, l’interesse legittimo, il consenso e, se del caso, le istruzioni del responsabile del trattamento se Winerim agisce in qualità di responsabile del trattamento.\n\nGli interessi legittimi includono sicurezza, prevenzione delle frodi, miglioramento del servizio, analisi interna, supporto, difesa dei reclami, comunicazioni B2B, protezione della proprietà intellettuale, rilevamento di scraping, reverse engineering, data mining, abuso di API e uso competitivo non autorizzato.\n\nQuando le normative locali richiedono un consenso specifico, Winerim lo richiederà o il Cliente dovrà ottenerlo prima di incorporare i dati nella Piattaforma."
      ],
      [
        "7. Esposizione al pubblico delle carte dei vini",
        "Lo scopo essenziale di Winerim è quello di consentire ai Clienti di visualizzare pubblicamente le proprie carte dei vini in formato digitale. Pertanto, i dati dei menu, quali referenze, prezzi, annate, immagini, descrizioni, abbinamenti, categorie e disponibilità, potrebbero essere pubblicamente visibili ai commensali, ai visitatori, ai motori di ricerca e a terzi tecnici necessari per il funzionamento di Internet.\n\nIn linea di principio, queste informazioni sono di natura aziendale o commerciale. Se il Cliente include dati personali all'interno di una lettera, sarà responsabile di avere una base legale e di evitare la pubblicazione di informazioni personali non necessarie o non autorizzate."
      ],
      [
        "8. Dati di vendita, stock, analisi e benchmarking",
        "Winerim può elaborare dati di vendita, stock, rotazione, disponibilità, interazioni, filtri, visualizzazioni, preferenze e prestazioni commerciali per fornire il servizio, mostrare analisi al Cliente, generare raccomandazioni, migliorare funzionalità, rilevare errori e offrire business intelligence.\n\nWinerim può utilizzare dati aggregati, resi anonimi o dissociati per analisi di settore, benchmarking, rapporti interni o esterni, informazioni di mercato, formazione di modelli, miglioramento dei prodotti, studi commerciali e sviluppo di nuove funzionalità.\n\nWinerim non venderà i dati personali. Né pubblicherà dati individualizzati sulle vendite, sulle scorte, sui margini o sulla performance economica di un Cliente identificandolo direttamente senza autorizzazione o necessità legale.\n\nLa presente Politica non concede al Cliente, agli utenti autorizzati o a terze parti alcun diritto di estrarre, copiare, vendere, rivendere, concedere in licenza, assegnare, trasferire, pubblicare, commercializzare, addestrare modelli, alimentare database, estrarre o sfruttare dati, contenuti, metriche, raccomandazioni, tassonomie, set di dati, immagini, descrizioni o risorse di Winerim al di fuori dell'uso consentito nei Termini."
      ],
      [
        "9. Intelligenza artificiale e decisioni automatizzate",
        "Winerim può utilizzare sistemi automatizzati o di intelligenza artificiale per classificare vini, arricchire dati, generare descrizioni, tradurre, creare abbinamenti, ordinare risultati, consigliare vini, rilevare anomalie, migliorare la ricerca e ottimizzare le funzionalità.\n\nQueste funzionalità sono di supporto e potrebbero causare errori. Non producono decisioni legali o effetti significativamente simili sulle persone fisiche nel senso stretto del GDPR, a meno che non sia espressamente indicato diversamente in una funzionalità specifica.\n\nLaddove i dati personali vengano utilizzati in sistemi automatizzati, Winerim si impegnerà ad applicare la minimizzazione, la pseudonimizzazione, l'anonimizzazione o l'aggregazione ove fattibile e proporzionato.\n\nIl Cliente non può utilizzare dati o output di Winerim per addestrare modelli esterni o sviluppare soluzioni concorrenti, in conformità con i Termini."
      ],
      [
        "10. Destinatari, fornitori e subresponsabili",
        "Potremmo condividere dati con fornitori che forniscono servizi a Winerim, tra cui cloud hosting, archiviazione, sicurezza, monitoraggio, e-mail, supporto, analisi, pagamenti, fatturazione, intelligenza artificiale, traduzione, integrazione, strumenti interni, consulenti professionali e negozi di applicazioni.\n\nStripe o altri fornitori di servizi di pagamento possono elaborare i dati necessari per pagamenti, abbonamenti, fatturazione, prevenzione delle frodi, conformità finanziaria e obblighi normativi in conformità con i propri termini e politiche.\n\nApple, Google o gli operatori degli application store possono trattare i dati quando l'utente scarica o utilizza applicazioni mobili dai loro ambienti.\n\nPotremo anche comunicare i dati ad autorità, tribunali, pubbliche amministrazioni, forze di sicurezza, consulenti, potenziali acquirenti o terzi quando esiste un obbligo legale, un requisito valido, la difesa dei diritti, l'operazione aziendale o un interesse legittimo sufficiente.\n\nL'elenco specifico dei relativi fornitori e subresponsabili deve essere mantenuto aggiornato e reso disponibile su ragionevole richiesta o su una specifica pagina Winerim."
      ],
      [
        "11. Trasferimenti e cure internazionali dagli Stati Uniti",
        "Winerim LLC ha sede negli Stati Uniti, pertanto i dati potrebbero essere elaborati, archiviati o accessibili dagli Stati Uniti e da altri paesi in cui operano i fornitori di Winerim.\n\nQuando il trattamento è soggetto al GDPR o ad altre normative che limitano i trasferimenti internazionali, Winerim applicherà garanzie adeguate, quali clausole contrattuali tipo, decisioni di adeguatezza, misure integrative, contratti con i fornitori o meccanismi equivalenti legalmente validi.\n\nIl Cliente riconosce che l'utilizzo di un servizio SaaS internazionale può comportare trasferimenti transfrontalieri, accesso remoto, fornitori di servizi cloud, pagamenti, supporto, sicurezza, analisi e intelligenza artificiale in diverse giurisdizioni."
      ],
      [
        "12. Conservazione dei dati",
        "I dati contabili e contrattuali saranno conservati per tutta la durata del rapporto contrattuale e successivamente per i periodi necessari agli adempimenti legali, contabili, fiscali, alla difesa dei crediti, alla revisione, alla sicurezza e alle responsabilità.\n\nI dati di fatturazione saranno conservati per i periodi previsti dalle normative fiscali, commerciali e contabili applicabili.\n\nLe richieste di cancellazione, le comunicazioni contrattuali e le relative prove saranno conservate per i periodi necessari a elaborare la cancellazione, provarne la ricezione o la mancanza di ricevuta valida, difendere reclami e rispettare gli obblighi di legge.\n\nI dati di supporto saranno conservati per il tempo necessario a rispondere alla domanda o all'incidente e successivamente per un periodo di tempo ragionevole per il monitoraggio, la qualità, la sicurezza e la difesa dei reclami.\n\nI dati tecnici, i registri e la sicurezza verranno conservati per i periodi previsti per finalità di sicurezza, diagnosi, prevenzione delle frodi, rilevamento di scraping, abusi, reverse engineering e miglioramento del servizio.\n\nLa lettera, le scorte, le vendite e i dati operativi saranno conservati mentre l'account è attivo e successivamente per un periodo ragionevole per l'esportazione, il recupero, il supporto, le copie di backup, la conformità legale e la difesa dei diritti.\n\nI dati aggregati, anonimizzati o dissociati possono essere conservati a tempo indeterminato perché non identificano ragionevolmente una persona fisica."
      ],
      [
        "13. Diritti sulla privacy",
        "Gli interessati potranno esercitare i diritti riconosciuti dalla normativa applicabile nella propria giurisdizione. Laddove si applica il GDPR, tali diritti includono l’accesso, la rettifica, la cancellazione, l’opposizione, la limitazione, la portabilità e la revoca del consenso.\n\nA seconda del Paese o dello Stato, potrebbero esserci anche diritti di informazione, correzione, cancellazione, esclusione dalla vendita o condivisione, limitazione di determinati usi, ricorso o presentazione di un reclamo alle autorità competenti.\n\nPer esercitare i diritti è necessario contattare info@winerim.com, indicando il diritto che si desidera esercitare, il paese di residenza e dati sufficienti per identificare la richiesta. Winerim può richiedere ulteriori informazioni per verificare l'identità o la rappresentanza.\n\nQualora la richiesta riguardi dati trattati per conto di un Cliente, Winerim potrà inoltrare la richiesta al Cliente o agire secondo le sue istruzioni.\n\nNel caso di soggetti interessati provenienti dallo Spazio Economico Europeo, possono rivolgersi all'autorità di controllo competente. Se esiste un rappresentante europeo formalmente designato, i suoi dettagli saranno indicati nella presente Policy; nel frattempo, info@winerim.com sarà il punto di contatto operativo per richieste di privacy."
      ],
      [
        "14. Cookie e tecnologie simili",
        "Winerim attualmente non utilizza i propri cookie analitici, pubblicitari o di marketing. La Piattaforma può utilizzare propri cookie tecnici strettamente necessari per l'autenticazione, la sessione, la sicurezza, la prevenzione degli abusi e l'ordinario funzionamento del Servizio. Per i pagamenti, Winerim utilizza Stripe come fornitore di terze parti, che può installare o utilizzare cookie e tecnologie simili necessarie per elaborare pagamenti, gestire abbonamenti, prevenire frodi, migliorare la sicurezza e soddisfare obblighi finanziari o normativi.\n\nSe in futuro Winerim incorpora cookie non necessari, come quelli analitici, pubblicitari, di misurazione o di personalizzazione non essenziali, l'utente sarà informato e il meccanismo di accettazione, rifiuto o configurazione sarà abilitato quando legalmente applicabile. Il rifiuto dei cookie non necessari non impedirà l'utilizzo di base del Servizio quando tali cookie non sono essenziali."
      ],
      [
        "15. Comunicazioni commerciali",
        "Winerim può inviare comunicazioni relative al servizio, alla sicurezza, alla fatturazione, alle modifiche contrattuali, alla manutenzione, agli incidenti o al funzionamento dell'account, poiché necessari per il rapporto contrattuale.\n\nWinerim potrà inviare proprie comunicazioni commerciali su servizi simili, nuove funzionalità, contenuti, eventi o novità, quando sussista una base giuridica. Il destinatario potrà opporsi o cancellarsi utilizzando i meccanismi indicati in ciascuna comunicazione.\n\nLa cancellazione delle comunicazioni commerciali non implica la cancellazione del servizio. La risoluzione contrattuale sarà valida solo se richiesta via e-mail a cancel@winerim.com in conformità con i Termini."
      ],
      [
        "16. Sicurezza e riservatezza",
        "Winerim applicherà misure tecniche e organizzative ragionevoli per proteggere i dati personali da accesso non autorizzato, alterazione, perdita, distruzione, divulgazione o uso improprio.\n\nQueste misure possono includere controllo degli accessi, ruoli, autenticazione, crittografia ove appropriato, backup, monitoraggio, registrazione, gestione degli incidenti, riservatezza contrattuale, revisione dei fornitori e ragionevoli misure di continuità.\n\nNessun sistema è completamente sicuro. Il cliente e gli utenti devono salvaguardare le credenziali, utilizzare password complesse, limitare le autorizzazioni e segnalare incidenti o accessi non autorizzati."
      ],
      [
        "17. Minori",
        "Winerim è un servizio professionale B2B e non è rivolto ai minori. Non richiediamo consapevolmente dati a minori.\n\nIl Cliente è responsabile del rispetto delle normative applicabili quando i commensali o gli utenti finali minori possono accedere ai menu pubblici, con particolare riferimento alle bevande alcoliche, alla pubblicità, alla maggiore età e al consumo responsabile."
      ],
      [
        "18. Responsabilità del Cliente per i dati incorporati",
        "Il Cliente sarà responsabile dei dati personali che deciderà di incorporare, collegare o pubblicare in Winerim, compresi i dati di dipendenti, collaboratori, fornitori, commensali, immagini, commenti, note o informazioni provenienti da terzi.\n\nIl Cliente deve informare le persone interessate ove opportuno, ottenere i consensi necessari, stabilire le basi giuridiche, rispondere alle richieste di diritti ed evitare di incorporare dati non necessari o appositamente protetti.\n\nWinerim può cancellare, bloccare o richiedere il ritiro dei dati quando vi sono indizi di illegalità, eccesso, violazione di diritti, rischio per la sicurezza o violazione del contratto."
      ],
      [
        "19. Divieto di vendita dei dati personali e limiti di utilizzo dei dati",
        "Winerim non vende dati personali nel senso comune del trasferimento di dati identificabili in cambio di denaro.\n\nWinerim può sfruttare dati non personali, aggregati, resi anonimi, dissociati o generati dalla Piattaforma per scopi di miglioramento, analisi, benchmarking, intelligenza artificiale, prodotto, sicurezza e aziendali, in conformità con i Termini e la presente Politica.\n\nClienti, utenti o terze parti non possono estrarre, rivendere, concedere in licenza, trasferire, monetizzare o utilizzare dati o risorse Winerim per i propri prodotti, terze parti, AI esterna, consulenza, comparatori, cataloghi o soluzioni concorrenti."
      ],
      [
        "20. Modifiche a questa Politica",
        "Winerim può aggiornare la presente Politica per riflettere cambiamenti legali, tecnici, operativi, fornitori, funzionalità, trattamenti, struttura aziendale o modello di business.\n\nQuando le modifiche sono rilevanti, Winerim proverà a comunicarle tramite e-mail, piattaforma, sito Web o altri mezzi ragionevoli. L'uso continuato della Piattaforma dopo l'aggiornamento implica la conoscenza della versione attuale, fatti salvi i diritti legalmente applicabili."
      ],
      [
        "21. Contatto",
        "Per la privacy e la protezione dei dati: info@winerim.com.\n\nPer supporto regolare: info@winerim.com.\n\nPer cancellazioni contrattuali del servizio: esclusivamente cancel@winerim.com, in conformità con i Termini e Condizioni."
      ]
    ],
    "links": [
      [
        "Home",
        "/it"
      ],
      [
        "Prodotto",
        "/it/software-carta-vini"
      ],
      [
        "Demo",
        "/it/demo"
      ],
      [
        "Contatto",
        "/it/contatto"
      ],
      [
        "Termini",
        "/it/termini"
      ]
    ]
  },
  "/it/termini": {
    "lang": "it",
    "title": "Termini e condizioni di contratto e utilizzo SaaS | Winerim",
    "description": "Termini e condizioni internazionali di contrattazione e utilizzo SaaS per i clienti Winerim fuori dalla Spagna.",
    "h1": "Termini e condizioni di contratto e utilizzo SaaS",
    "subtitle": "Contratto SaaS B2B integrato per clienti professionali Winerim · Versione operativa finale: 7 luglio 2026 · Applicabile ai clienti situati fuori dalla Spagna, salvo diverso accordo scritto.",
    "canonical": "/it/termini",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Documento",
        "Termini e condizioni internazionali / Termini e condizioni internazionali con contratto SaaS integrato"
      ],
      [
        "Ambito",
        "Clienti situati al di fuori della Spagna, salvo diverso accordo scritto"
      ],
      [
        "Fornitore e fatturazione",
        "Winerim LLC, società costituita secondo le leggi dello Stato della Florida, con indirizzo 1210 Washington Ave 213, Miami Beach, FL 33139, USA"
      ],
      [
        "Marchio",
        "Winerim"
      ],
      [
        "Natura",
        "Servizio SaaS B2B per l'ospitalità, ristoranti, hotel e gruppi professionali"
      ],
      [
        "Recessi contrattuali",
        "Solo via e-mail a cancel@winerim.com 15 giorni di calendario in anticipo"
      ],
      [
        "Contatto generale",
        "info@winerim.com"
      ],
      [
        "Legge e giurisdizione",
        "Leggi dello Stato della Florida; tribunali statali o federali situati nella contea di Miami-Dade, in Florida, salvo norma imperativa"
      ],
      [
        "1. Identificazione del fornitore e ambito di applicazione internazionale",
        "I presenti Termini e Condizioni internazionali regolano la contrattazione, l'accesso e l'uso professionale di Winerim al di fuori della Spagna, comprese le sue applicazioni web e mobili, pannelli di controllo, menu digitali, moduli di gestione, integrazioni, API, funzionalità di analisi, intelligenza artificiale, supporto e servizi associati.\n\nPer i clienti situati al di fuori della Spagna, il fornitore contrattuale e l'entità emittente della fattura sarà Winerim LLC, una società costituita secondo le leggi dello Stato della Florida, Stati Uniti d'America, con indirizzo a 1210 Washington Ave 213, Miami Beach, FL 33139, USA, a meno che un'offerta, un ordine, una fattura o un contratto particolare non indichino espressamente un'altra entità fornitrice.\n\nIl cliente sarà la persona fisica o giuridica che contrae il servizio in qualità di imprenditore, professionista, azienda, ristorante, hotel, gruppo alberghiero, struttura turistica, club, distributore o entità equivalente, di seguito il Cliente."
      ],
      [
        "2. Natura professionale del servizio",
        "Winerim è una piattaforma SaaS B2B finalizzata alla digitalizzazione, gestione, analisi e sfruttamento commerciale di carte dei vini, cantine, stock, dati di vendita ed esperienze di servizio nel settore dell'ospitalità.\n\nIl Cliente dichiara di stipulare un contratto con Winerim nell'ambito della propria attività professionale o commerciale e non in qualità di consumatore o utente finale. La Piattaforma non è destinata alla contrattazione da parte dei consumatori per scopi particolari.\n\nI commensali, i visitatori o gli utenti finali che consultano un menu digitale del Cliente non acquisiscono con ciò lo status di clienti contrattuali diretti di Winerim, a meno che non creino un proprio account, utilizzino funzionalità indipendenti o accettino condizioni specifiche aggiuntive."
      ],
      [
        "3. Oggetto contrattuale ed integrazione del contratto SaaS",
        "I presenti Termini costituiscono l'accordo SaaS applicabile tra Winerim e il Cliente. Non esiste un contratto SaaS separato a meno che le parti non firmino condizioni particolari, un ordine di servizio, un preventivo, un ordine, un addendum o un accordo specifico.\n\nIl contratto concede al Cliente una licenza limitata, revocabile in caso di inosservanza, non esclusiva, non sublicenziabile, non trasferibile e condizionata al pagamento per accedere e utilizzare la Piattaforma durante la durata del rapporto contrattuale e solo per l'Uso Consentito.\n\nLa licenza non implica vendita, assegnazione, trasmissione o acquisizione della proprietà di software, codice, dati, database, documentazione, immagini, tassonomie, impronte digitali, regole, algoritmi, modelli, raccomandazioni, approfondimenti, interfacce, progetti, know-how o qualsiasi altra risorsa Winerim."
      ],
      [
        "4. Accettazione e documenti contrattuali",
        "L'accettazione delle presenti Condizioni può essere effettuata mediante firma autografa o elettronica, accettazione nel processo di registrazione, conferma via e-mail, pagamento dell'abbonamento, utilizzo effettivo della Piattaforma, accettazione del preventivo o qualsiasi altro atto contrattuale inequivocabile.\n\nLa stipula del contratto implica l'accettazione dei presenti Termini, dell'Informativa sulla privacy, della Politica sui cookie ove applicabile, dell'Allegato sull'ordine di elaborazione, del modulo contrattuale, del budget, del piano, dell'ordine, della fattura o delle condizioni particolari accettate.\n\nIn caso di contraddizione tra le presenti Condizioni ed una condizione particolare espressamente sottoscritta o accettata da entrambe le parti, la condizione particolare prevarrà solo rispetto allo specifico punto regolato."
      ],
      [
        "5. Definizioni essenziali",
        "Per piattaforma si intende l'insieme di applicazioni web, applicazioni mobili, pannelli di controllo, database, API, moduli, servizi, progetti, documentazione, funzionalità e sistemi offerti con il marchio Winerim.\n\nPer Dati Menu si intendono tutte le informazioni relative alla carta dei vini del Cliente, inclusi riferimenti, annate, prezzi, denominazioni, regioni, paesi, cantine, uve, formati, immagini, descrizioni, note di degustazione, abbinamenti, disponibilità, categorie, etichette, lingue, consigli, preferiti, ordine di presentazione e qualsiasi dato equivalente.\n\nPer Dati Operativi si intendono i dati su stock, vendite, rotazione, consumo, margini, disponibilità, storico, movimenti della cantina, performance commerciale, interazioni, utilizzo di filtri, visualizzazioni, clic, prenotazioni o ordini quando esistenti, integrazioni con terze parti e qualsiasi informazione relativa alla gestione o allo sfruttamento della carta dei vini.\n\nPer Contenuto del Cliente si intendono loghi, marchi, immagini, testi, lettere, prezzi, materiali, dati commerciali e informazioni fornite dal Cliente.\n\nPer Contenuto Winerim si intende software, codice, architettura, design, interfaccia, database, impronte del vino, immagini, descrizioni, traduzioni, raccomandazioni, tassonomie, dati avanzati, modelli, regole, algoritmi, documentazione, testi, know-how, metriche, benchmark, approfondimenti, materiali di formazione e qualsiasi risorsa creata, concessa in licenza, normalizzata o incorporata da Winerim.\n\nDati e risorse Winerim indica, oltre ai Contenuti Winerim, qualsiasi set di dati, struttura di dati, tassonomia, normalizzazione, classificazione, arricchimento, relazione tra dati, modello, modello di utilizzo, classificazione, raccomandazione, metrica, report, benchmark, segnale analitico o conoscenza generata o elaborata da Winerim.\n\nPer Uso Consentito si intende l'uso interno, professionale e ordinario della Piattaforma da parte del Cliente per gestire, visualizzare e sfruttare la propria carta dei vini all'interno dell'azienda, del gruppo o dell'account contrattato, senza estrazione, trasferimento, rivendita, uso competitivo o sfruttamento esterno dei beni Winerim."
      ],
      [
        "6. Ambito generale del servizio",
        "Winerim consente al Cliente di creare, gestire, visualizzare, sfruttare e analizzare digitalmente la propria carta dei vini e le informazioni associate alla propria cantina, magazzino e servizio in camera.\n\nSalvo diversa indicazione prevista dal piano contrattato, il servizio può comprendere registrazione del Cliente, configurazione iniziale, caricamento iniziale del menu fornito, menu digitale personalizzato, collegamento web o QR, applicazione scaricabile quando disponibile, pannello di controllo, formati di visualizzazione, filtri, preferiti, consigliati, selezione, multilingua, attivazione e disattivazione dei vini, modifica dei prezzi, uve, annate, abbinamenti, descrizioni e note di degustazione, richiesta di nuove referenze, analisi e supporto ordinario.\n\nLa parte frontale del menù digitale potrà essere consultata dai commensali senza alcun costo diretto aggiuntivo a loro carico, ferme restando le tariffe corrisposte dal Cliente a Winerim.\n\nIl menu potrà essere pubblico ed accessibile da qualsiasi luogo, senza che l'utente finale debba trovarsi fisicamente nel locale, salvo diversa configurazione richiesta dal Cliente e tecnicamente accettata da Winerim."
      ],
      [
        "7. Servizi non inclusi se non espressamente concordati",
        "Se non espressamente concordato per iscritto, non sono previsti sviluppi personalizzati, integrazioni con POS, PMS, ERP, CRM o altri sistemi, migrazioni complesse, purificazione avanzata dei dati, fotografia professionale, stampa di codici QR o materiale fisico, formazione in presenza, consulenza strategica, audit di magazzino, gestione operativa delle scorte per conto del Cliente, supporto fuori orario, SLA specifici, API private, modelli IA personalizzati, traduzioni professionali revisionate da persone umane, personalizzazione avanzata del marchio o funzionalità non descritte nel piano contrattato. incluso.\n\nWinerim può offrire servizi aggiuntivi attraverso un preventivo, un ordine, un allegato o un contratto specifico. Il tuo contratto non modificherà automaticamente le presenti Condizioni se non espressamente indicato."
      ],
      [
        "8. Registrazione, implementazione e collaborazione del Cliente",
        "Il Cliente dovrà fornire a Winerim, in un formato ragionevolmente utilizzabile, tutte le informazioni necessarie per l'implementazione: carta dei vini, prezzi, annate, stock, immagini, loghi, dati fiscali, informazioni di contatto, accesso o qualsiasi altro materiale necessario.\n\nIl Cliente è responsabile della veridicità, accuratezza, aggiornamento e legalità del contenuto e dei dati forniti, caricati, modificati o mantenuti in Winerim.\n\nI periodi di attivazione o di caricamento inizieranno a contare dalla ricezione completa delle informazioni necessarie e, ove applicabile, dal pagamento iniziale. I tempi di funzionamento sono stime ragionevoli, a meno che non siano espressamente garantiti per iscritto.\n\nWinerim può richiedere immagini, schede tecniche, dati di cantina, annate, prezzi o altre informazioni necessarie per creare, completare, correggere o arricchire referenze senza impronta digitale o con informazioni insufficienti."
      ],
      [
        "9. Licenza d'uso e limiti",
        "Il Cliente riceve una licenza limitata per utilizzare la Piattaforma solo durante la durata del rapporto contrattuale, per la propria attività professionale, in conformità con il piano contrattato e l'Uso Consentito.\n\nLa licenza è concessa per account, stabilimento, gruppo, territorio, numero di utenti, moduli, funzionalità o limiti di utilizzo indicati nel modulo di contratto o nel piano contrattato.\n\nIl Cliente non può concedere in sublicenza, cedere, affittare, vendere, rivendere, mettere a disposizione di terzi, sfruttare come servizio, operare per conto di terzi, fornire servizi di consulenza basati su Winerim o consentire l'accesso a terzi non autorizzati senza previo consenso scritto di Winerim."
      ],
      [
        "10. Divieti essenziali: reverse engineering, estrazione e sfruttamento dei dati",
        "Il Cliente non può direttamente o indirettamente eseguire, consentire, facilitare, commissionare o tentare di eseguire reverse engineering, decompilazione, disassemblaggio, analisi del codice, analisi dell'architettura, audit tecnico non autorizzato, scansione, test di penetrazione, sfruttamento delle vulnerabilità, copia logica, copia di flusso, copia di interfaccia, copia di struttura dati o qualsiasi azione volta a comprendere, replicare, sostituire o competere con Winerim.\n\nÈ vietato scaricare, estrarre, copiare, indicizzare, estrarre, sincronizzare, fotografare sistematicamente, catturare in massa, raschiare, scansionare, raccogliere, data mining, abuso di API, query automatizzate o qualsiasi acquisizione massiccia o non autorizzata di dati, contenuti, immagini, file, tassonomie, strutture, etichette, classificazioni, impronte digitali, metriche, approfondimenti, raccomandazioni o documentazione da Winerim.\n\nÈ vietato vendere, rivendere, concedere in licenza, affittare, assegnare, trasferire, pubblicare, ridistribuire, monetizzare, commercializzare o sfruttare in qualsiasi modo Dati e Beni Winerim, Contenuti Winerim, dati arricchiti, benchmark, set di dati, raccomandazioni, modelli, regole, algoritmi, know-how, report, output o risultati generati dalla Piattaforma al di fuori dell'Uso Consentito.\n\nÈ vietato utilizzare Winerim, i suoi contenuti o i suoi dati per alimentare database propri o di terzi, formare, adattare, valutare o migliorare sistemi di intelligenza artificiale, creare comparatori, mercati, motori di ricerca, cataloghi, sistemi di raccomandazione, soluzioni di gestione del vino, strumenti analitici, servizi di consulenza, rapporti di settore o prodotti concorrenti.\n\nIl Cliente non può consentire l'accesso o la visualizzazione della Piattaforma, demo, pannelli, documentazione, screenshot, configurazioni, proposte, materiali o dati a concorrenti diretti o indiretti di Winerim, o a terzi che sviluppano, commercializzano, consigliano o investono in soluzioni concorrenti, salvo previa autorizzazione scritta di Winerim.\n\nLa possibilità tecnica di visualizzare, scaricare, esportare, copiare o accedere alle informazioni non implica l'autorizzazione legale per la loro estrazione, riutilizzo, vendita, trasferimento, formazione AI, monetizzazione o sfruttamento al di fuori dell'Uso Consentito.\n\nIl mancato rispetto di questa clausola sarà considerato inadempimento fondamentale e potrà giustificare l'immediata sospensione, la risoluzione contrattuale, il blocco dell'accesso, la rimozione o distruzione dei materiali, il risarcimento dei danni e l'esercizio di azioni legali."
      ],
      [
        "11. Dati e risorse di Winerim",
        "Winerim conserva tutti i diritti sui dati e sulle risorse Winerim, inclusi set di dati, tassonomie, impronte digitali del vino, regole di normalizzazione, classificazioni, modelli, modelli, benchmark, raccomandazioni, traduzioni, descrizioni, immagini, documentazione, interfacce, metriche, approfondimenti e qualsiasi arricchimento generato da Winerim.\n\nIl Cliente riconosce che l'investimento di Winerim nella creazione, normalizzazione, curation, strutturazione e sfruttamento dei dati costituisce un bene essenziale, protetto contrattualmente e legalmente, inclusi, ove applicabili, diritti di proprietà intellettuale, diritti di database, segreti commerciali e concorrenza sleale.\n\nNessun dato, schermata, report, esportazione, raccomandazione, intuizione o risultato generato da Winerim può essere utilizzato dal Cliente per scopi diversi dalla gestione interna del proprio menu e del servizio contrattato."
      ],
      [
        "12. Contenuti del cliente",
        "Il Cliente conserva la proprietà dei propri marchi, loghi, immagini, lettere, prezzi, dati commerciali e altri contenuti originali che contribuisce alla Piattaforma, a condizione che sia effettivamente di sua proprietà o disponga di diritti sufficienti.\n\nIl Cliente concede a Winerim una licenza mondiale, non esclusiva, gratuita, cedibile in sublicenza a fornitori tecnici, durante la durata del servizio e per il tempo successivamente necessario per la conformità legale, il supporto, le copie di backup e la difesa dei diritti, per ospitare, riprodurre, adattare tecnicamente, tradurre, normalizzare, arricchire, visualizzare, comunicare pubblicamente ed elaborare tali contenuti nella misura necessaria per fornire, migliorare e proteggere il servizio.\n\nIl Cliente garantisce di avere diritti sufficienti sulle immagini, loghi, testi, dati, file, prezzi e materiali che fornisce. Winerim non sarà responsabile per reclami di terzi derivanti dai contenuti forniti dal Cliente."
      ],
      [
        "13. Utilizzo ed esposizione al pubblico delle carte dei vini",
        "Il Cliente autorizza espressamente Winerim a visualizzare e rendere disponibile agli utenti finali la carta dei vini del Cliente e i suoi Dati Menu attraverso la Piattaforma, il sito web, l'app, i link, i codici QR, i widget, le integrazioni e i canali associati al servizio.\n\nTale autorizzazione comprende nomi di vini, cantine, regioni, denominazioni, uve, annate, prezzi, formati, immagini, descrizioni, note di degustazione, abbinamenti, etichette, categorie, lingue, disponibilità, consigli e qualsiasi informazione che faccia parte del menu digitale.\n\nIl Cliente riconosce che la visualizzazione pubblica del menu è una parte essenziale del servizio e che le informazioni incluse possono essere accessibili da commensali, motori di ricerca, browser, sistemi di cache, reti o terzi tecnici nell'ambito del funzionamento di Internet, a meno che una diversa configurazione non sia accettata da Winerim.\n\nSarà cura del Cliente garantire che prezzi, annate, disponibilità, promozioni, immagini, diritti di terzi e altre informazioni pubblicate siano corrette, lecite e aggiornate."
      ],
      [
        "14. Dati di vendita, stock, fatturato e analisi",
        "Il Cliente autorizza Winerim a raccogliere, archiviare, elaborare, analizzare, visualizzare, incrociare, arricchire e utilizzare i Dati Operativi relativi a menu, vendite, stock, rotazione, consumo, margini, disponibilità, storico, movimenti di magazzino, interazioni, visualizzazioni, filtri, preferiti, prenotazioni o ordini quando esistenti.\n\nWinerim può utilizzare questi dati per fornire il servizio, generare pannelli, metriche, raccomandazioni, avvisi, report, confronti interni, rilevamento di errori, miglioramento delle funzionalità, sicurezza, prevenzione delle frodi, supporto, sviluppo del prodotto e creazione di business intelligence per il Cliente.\n\nWinerim potrà utilizzare dati aggregati, anonimizzati o dissociati per analisi di settore, benchmarking, statistiche, report, sviluppo di prodotti, formazione e miglioramento di modelli, comunicazione commerciale, studi di mercato, raccomandazioni e creazione di nuovi servizi, sempre senza identificare direttamente il Cliente quando si tratta di dati sensibili su vendite, scorte, margini o performance economica se non espressamente autorizzato.\n\nWinerim non venderà i dati personali. Lo sfruttamento commerciale di dati non personali, aggregati, anonimizzati o generati da Winerim non conferisce al Cliente diritti di compensazione, partecipazione o controllo aggiuntivo, salvo diverso accordo scritto."
      ],
      [
        "15. Alcol, norme sull'ospitalità e responsabilità del ristorante",
        "Winerim non vende, serve, fornisce, trasporta, distribuisce o addebita bevande alcoliche agli utenti finali. La Piattaforma è uno strumento tecnologico di gestione, visualizzazione, analisi e supporto commerciale.\n\nIl Cliente è l'unico responsabile della vendita, del servizio, della disponibilità, dei prezzi, delle tasse, delle licenze, dell'età legale, del consumo responsabile, delle norme sanitarie, delle norme sull'ospitalità, delle norme sulla pubblicità degli alcolici e della conformità locale applicabile alla propria attività.\n\nLe raccomandazioni, gli abbinamenti, le classifiche, le descrizioni o i suggerimenti generati da Winerim non sostituiscono il giudizio professionale del Cliente o i suoi obblighi legali nei confronti dei consumatori, delle autorità o di terzi."
      ],
      [
        "16. Intelligenza artificiale, raccomandazioni e contenuti automatizzati",
        "Winerim può incorporare sistemi automatizzati o di intelligenza artificiale per classificare vini, arricchire dati, tradurre, generare descrizioni, suggerire abbinamenti, ordinare risultati, rilevare modelli, consigliare riferimenti e migliorare l'esperienza dell'utente.\n\nQueste funzionalità sono strumenti di supporto. Potrebbero contenere errori, omissioni, distorsioni, imprecisioni o risultati non appropriati per una situazione specifica. Il Cliente deve rivedere le informazioni rilevanti prima di pubblicarle, utilizzarle commercialmente o prendere decisioni di acquisto, vendita, stock o servizi.\n\nWinerim può modificare, limitare, sostituire, disabilitare o migliorare le funzionalità AI in qualsiasi momento per motivi tecnici, legali, commerciali, di sicurezza, di qualità o di fornitore.\n\nIl Cliente non può utilizzare output, raccomandazioni, incorporamenti, punteggi, prompt, risultati, tassonomie, descrizioni o set di dati dell'intelligenza artificiale generati da Winerim per addestrare modelli esterni, creare prodotti concorrenti, vendere dati o alimentare database al di fuori dell'uso consentito."
      ],
      [
        "17. Integrazioni, API e terze parti",
        "Winerim può integrarsi con fornitori di pagamenti, POS, PMS, ERP, CRM, strumenti di analisi, servizi di posta elettronica, hosting su cloud, negozi di applicazioni, fornitori di intelligenza artificiale e altre terze parti.\n\nLe integrazioni dipenderanno dalla disponibilità, dalle condizioni, dalle API, dalle modifiche tecniche, dalle tariffe, dalle limitazioni e dalle decisioni di tali terze parti. Winerim non sarà responsabile per guasti, modifiche, interruzioni, perdite o limitazioni attribuibili a terzi al di fuori del suo ragionevole controllo.\n\nIl Cliente autorizza Winerim a scambiare dati con le terze parti necessarie quando attiva un'integrazione o quando è essenziale per fornire il servizio, sempre nell'ambito del quadro contrattuale e della privacy applicabile."
      ],
      [
        "18. Obblighi di Winerim",
        "Winerim fornirà il servizio con diligenza professionale, in conformità con gli usi abituali del settore SaaS e con mezzi tecnici e umani ragionevolmente disponibili.\n\nWinerim effettuerà il caricamento iniziale della lettera fornita dal Cliente in conformità con il piano contrattato e le informazioni ricevute. L'accuratezza finale di prezzi, disponibilità, annate, giacenze e dati commerciali sarà responsabilità del Cliente.\n\nWinerim si impegnerà a informare il Cliente di incidenti rilevanti che incidono sostanzialmente sul servizio quando ne è a conoscenza ed è ragionevolmente possibile."
      ],
      [
        "19. Obblighi del Cliente",
        "Il Cliente deve pagare tempestivamente le tariffe contratte, le tasse, le spese bancarie, le spese di restituzione e qualsiasi importo in sospeso in conformità con i presenti Termini.\n\nIl Cliente deve utilizzare la Piattaforma in conformità con la legge, la buona fede, la documentazione, le istruzioni di Winerim e l'Uso Consentito.\n\nIl Cliente deve formare il proprio personale autorizzato, controllare le credenziali, rivedere la lettera pubblicata, mantenere aggiornati i dati e non caricare informazioni illegali, non necessarie, false, protette o di terze parti senza diritti sufficienti.\n\nIl Cliente sarà responsabile di qualsiasi azione dei suoi amministratori, dipendenti, collaboratori, fornitori o terzi autorizzati che accedono alla Piattaforma per conto proprio o con le proprie credenziali."
      ],
      [
        "20. Account cliente, credenziali e sicurezza",
        "Il Cliente sarà responsabile della salvaguardia delle credenziali, degli utenti amministrativi, dei permessi e degli accessi. Si presume che qualsiasi azione eseguita a partire da un account Cliente sia stata eseguita dal Cliente o da una persona autorizzata, salvo prova contraria.\n\nIl Cliente deve comunicare immediatamente a Winerim qualsiasi accesso non autorizzato, perdita di credenziali, uso improprio, perdita di dati o incidente di sicurezza che interessi il suo account.\n\nWinerim può bloccare, sospendere, ripristinare o limitare l'accesso quando vi siano ragionevoli indicazioni di rischio, abuso, uso non autorizzato, scraping, estrazione, violazione della sicurezza o violazione del contratto."
      ],
      [
        "21. Supporto, manutenzione e aggiornamenti",
        "Il supporto ordinario sarà fornito attraverso i canali abilitati da Winerim, incluso pannello, email o altri mezzi indicati, entro gli orari di operatività comunicati o contrattati.\n\nWinerim è un prodotto vivo e in continua evoluzione. Winerim potrebbe introdurre aggiornamenti, miglioramenti, modifiche tecniche, automazioni, integrazioni, modifiche dell'interfaccia, nuovi moduli, adeguamenti dell'architettura, patch di sicurezza e modifiche funzionali.\n\nGli aggiornamenti possono modificare l'aspetto, i flussi, le funzionalità, i campi, i filtri, i moduli o il modo di fornire il servizio, purché non svuotino il servizio contrattato di contenuti essenziali.\n\nWinerim può eseguire interventi di manutenzione programmata o di emergenza. In situazioni critiche, di sicurezza o di terze parti, il servizio potrà essere interrotto senza preavviso, cercando di ripristinarlo nel più breve tempo ragionevole."
      ],
      [
        "22. Disponibilità e assenza di garanzia assoluta",
        "Winerim si impegnerà a mantenere la Piattaforma disponibile secondo ragionevoli standard di settore SaaS, ma non garantisce la disponibilità ininterrotta, la completa assenza di errori, la compatibilità permanente con tutti i dispositivi, browser o sistemi o la continuità indefinita di tutte le funzionalità.\n\nA meno che non vi sia uno SLA firmato, la Piattaforma viene fornita con mezzi ragionevoli e come disponibile, senza impegni di disponibilità, crediti di servizio o compensazione automatica per interruzioni.\n\nWinerim non sarà responsabile per interruzioni, interruzioni, perdita di connettività, lentezza, indisponibilità o errori causati da fornitori di servizi cloud, Internet, negozi di applicazioni, Stripe, API di terze parti, dispositivi del Cliente, reti locali, configurazioni errate, forza maggiore o eventi al di fuori del suo ragionevole controllo."
      ],
      [
        "23. Funzionalità beta, progetti pilota e test",
        "Winerim può offrire funzionalità beta, progetti pilota, test, moduli sperimentali o accesso anticipato. Queste funzionalità sono offerte senza garanzia di continuità, stabilità, disponibilità, risultati o permanenza.\n\nWinerim può modificare, limitare o ritirare le funzionalità beta in qualsiasi momento senza dar luogo a diritto di risarcimento, salvo diverso accordo scritto."
      ],
      [
        "24. Prezzo, fatturazione internazionale, tasse e modalità di pagamento",
        "Il Cliente pagherà a Winerim LLC gli importi indicati nel piano, budget, modulo contrattuale, fattura, link di pagamento o condizione particolare accettata, normalmente in dollari statunitensi (USD), salvo diverso accordo scritto.\n\nI prezzi non includono tasse, commissioni, oneri, ritenute, spese bancarie, commissioni di trasferimento, spese di cambio, spese di intermediari finanziari o spese equivalenti applicabili nella giurisdizione del Cliente o nelle operazioni di incasso internazionali.\n\nQuando le normative locali del Cliente richiedono ritenute, pagamenti o detrazioni su pagamenti all'estero, tali oneri saranno assunti dal Cliente tramite lordazione, in modo che Winerim LLC riceva l'intero importo netto concordato.\n\nLa fatturazione può essere mensile, annuale, per pilota, per gruppo, per stabilimento, per modulo o secondo la modalità contrattata. Il pagamento può essere effettuato tramite carta, bonifico, Stripe o altri mezzi accettati da Winerim.\n\nIl Cliente sarà responsabile dell'adempimento degli obblighi fiscali, valutari, doganali, dell'importazione di servizi, della registrazione dei pagamenti all'estero, delle ritenute o delle dichiarazioni applicabili nel proprio paese."
      ],
      [
        "25. Aggiornamento annuale dei prezzi",
        "Il Cliente riconosce e accetta che Winerim possa aggiornare automaticamente i suoi prezzi ogni anno solare.\n\nA partire dal 1° gennaio di ogni anno, Winerim può applicare un aggiornamento annuale dei prezzi compreso tra il cinque% (5%) e il dieci% (10%) sui prezzi in vigore durante l'anno precedente.\n\nQuesto aggiornamento risponderà, tra le altre ragioni, all'aumento delle prestazioni operative, tecnologiche, dell'infrastruttura, del supporto, della manutenzione, dello sviluppo del prodotto, della sicurezza, dei fornitori esterni, dell'inflazione, dell'evoluzione della Piattaforma e delle nuove funzionalità.\n\nL'aggiornamento annuale si intende accettato dal momento della stipula del contratto in quanto rientra nelle condizioni economiche del contratto e non richiederà ulteriore accettazione. Winerim potrà comunicarlo tramite e-mail, piattaforma, fattura, budget, rinnovo, comunicazione commerciale o qualsiasi altro mezzo scritto, senza che la mancanza di comunicazione individualizzata ne impedisca l'applicazione quando rientra nell'intervallo concordato.\n\nSe il Cliente non è soddisfatto, potrà richiedere la cancellazione secondo la procedura di cancellazione prevista nelle presenti Condizioni."
      ],
      [
        "26. Modifica straordinaria di prezzi, piani e servizi",
        "Oltre all'ordinario aggiornamento annuale, Winerim può modificare prezzi, piani, moduli, limiti di utilizzo, funzionalità o condizioni economiche per ragioni tecniche, commerciali, operative, fiscali, normative, valutarie, fornitori esterni, sicurezza o evoluzione del prodotto.\n\nQuando la modifica comporta un aumento del prezzo ricorrente contratto al di fuori dell'ordinario aggiornamento annuale, Winerim avviserà il Cliente almeno quindici (15) giorni di calendario prima del successivo pagamento o rinnovo.\n\nSe il Cliente non è soddisfatto potrà richiederne la cancellazione secondo la procedura stabilita. La mancata disdetta entro il termine o la continuità di utilizzo verrà intesa come accettazione delle nuove condizioni economiche."
      ],
      [
        "27. Annullamento e cessazione del servizio",
        "The Client may request the cancellation of his subscription exclusively by written communication sent by email to cancel@winerim.com.\n\nLa richiesta di cancellazione deve pervenire almeno quindici (15) giorni di calendario prima della data del successivo periodo di pagamento, rinnovo o fatturazione.\n\nLa richiesta deve essere inviata dall'e-mail associata all'account del Cliente o da un'e-mail che consenta di identificare ragionevolmente il Cliente e includere almeno il nome della società, il nome commerciale dello stabilimento, l'identificazione fiscale, il paese, il servizio o l'abbonamento di cui si richiede l'annullamento e la data di annullamento richiesta.\n\nLe richieste effettuate tramite telefono, WhatsApp, messaggio verbale, social network, messaggi a venditori, dirigenti, dipendenti, supporto operativo o qualsiasi canale diverso da cancel@winerim.com non saranno valide ai fini della risoluzione contrattuale.\n\nLa cancellazione avrà effetto al termine del periodo di fatturazione in corso se la richiesta perverrà con il preavviso minimo indicato. Se ricevuta meno di quindici (15) giorni di calendario, la cancellazione avrà effetto alla fine del periodo di fatturazione successivo, lasciando il Cliente obbligato al pagamento di tale periodo.\n\nL'annullamento non darà diritto alla restituzione delle somme già fatturate o pagate, se non espressamente concordato per iscritto da Winerim o obbligo di legge. La cancellazione non esenta dal pagamento di importi scaduti, fatture pendenti, tasse, commissioni, servizi aggiuntivi forniti o importi maturati prima della data di efficacia della cancellazione."
      ],
      [
        "28. Mancati pagamenti, resi e sospensioni",
        "In caso di mancato pagamento, ritardo, ricevute restituite, storno di addebito, fallimento della carta, rifiuto bancario o incidente di riscossione, Winerim può richiedere l'importo dovuto, commissioni bancarie, costi di riscossione ragionevoli e interessi legalmente applicabili.\n\nWinerim potrà sospendere totalmente o parzialmente l'accesso alla Piattaforma in caso di mancato pagamento o dopo ragionevole preavviso, a seconda della gravità, senza che la sospensione liberi il Cliente dai suoi obblighi di pagamento.\n\nSe il mancato pagamento persiste per più di sette (7) giorni di calendario dalla sospensione o dall'obbligo, Winerim può risolvere il rapporto contrattuale, eliminare o limitare l'accesso e richiedere importi in sospeso, danni, costi e perdite."
      ],
      [
        "29. Durata e rinnovo",
        "La durata iniziale sarà quella indicata nel piano, nel modulo contrattuale, nel budget, nella fattura, nell'ordine di servizio o nella condizione particolare accettata. In assenza di espressa indicazione, la durata sarà rinnovabile mensilmente.\n\nSalvo valida disdetta ai sensi della clausola risolutiva, l'abbonamento si rinnoverà automaticamente per periodi equivalenti successivi, applicando le tariffe vigenti, gli aggiornamenti annuali e le condizioni economiche applicabili.\n\nNei contratti annuali, piloti a prezzo fisso, impegni minimi o contratti a permanenza, non è previsto alcun rimborso dei periodi già iniziati salvo diverso accordo scritto o obbligo di legge."
      ],
      [
        "30. Sospensione e risoluzione per inadempienza",
        "Winerim può sospendere o interrompere il servizio, con effetto immediato o previa richiesta di rettifica a seconda della gravità, in casi di mancato pagamento, uso illecito o abusivo, violazione della proprietà intellettuale, violazione della riservatezza, accesso o trasferimento non autorizzato, utilizzo da o per concorrenti, reverse engineering, scraping, estrazione di dati, formazione AI non autorizzata, monetizzazione dei dati o qualsiasi azione che metta a rischio il patrimonio, la sicurezza o la posizione competitiva di Winerim.\n\nIn tali casi, Winerim può bloccare l'accesso, richiederne la cessazione immediata, ordinare la rimozione o la distruzione dei materiali, revocare licenze, conservare prove tecniche, richiedere risarcimenti e intraprendere azioni legali.\n\nIl Cliente potrà risolvere il rapporto qualora Winerim incorra in una violazione grave alla quale non sia stato posto rimedio entro un termine ragionevole di trenta (30) giorni dalla richiesta scritta, a condizione che la violazione sia imputabile a Winerim e non derivi da terzi, forza maggiore, mancato pagamento o azioni del Cliente."
      ],
      [
        "31. Effetti della risoluzione",
        "Una volta terminato il rapporto, il diritto del Cliente di utilizzare la Piattaforma cesserà immediatamente e Winerim potrà disattivare l'accesso, rimuovere lettere pubbliche, interrompere integrazioni e limitare funzionalità.\n\nA meno che non sia tecnicamente o legalmente impossibile, Winerim consentirà al Cliente di richiedere, per trenta (30) giorni di calendario dalla risoluzione, un'esportazione ragionevole delle sue informazioni operative ospitate sulla Piattaforma, a condizione che il Cliente sia in regola con il pagamento e che l'esportazione non includa dati e risorse Winerim, dati di altri clienti, segreti aziendali, tassonomie proprietarie, modelli, regole, strutture, set di dati arricchiti o informazioni non esportabili.\n\nWinerim può conservare le informazioni necessarie per conformità legale, fatturazione, sicurezza, difesa di reclami, prove di non conformità, copie di backup e registri interni, nonché dati aggregati, anonimizzati o dissociati.\n\nLe clausole di proprietà intellettuale, divieti di utilizzo, non estrazione, riservatezza, protezione dei dati, limitazione di responsabilità, indennizzo, pendenze di pagamento, giurisdizione e qualsiasi altra che per loro natura dovesse sopravvivere rimarranno in vigore dopo la risoluzione."
      ],
      [
        "32. Riservatezza e segreti aziendali",
        "Entrambe le parti si impegnano a mantenere la riservatezza delle informazioni tecniche, commerciali, strategiche, operative, economiche, finanziarie, legali, di prodotto, di sicurezza, di clienti, di prezzi, di roadmap, di dati e di know-how a cui accedono nel corso del rapporto.\n\nIl Cliente riconosce che il software, l'architettura, i database, le tassonomie, i modelli, le raccomandazioni, le metriche, la documentazione, i flussi, le interfacce, la logica aziendale, i dati complessi e il know-how di Winerim possono costituire segreti commerciali.\n\nL'obbligo di riservatezza permarrà durante il rapporto contrattuale e per cinque (5) anni dopo la sua cessazione. Le informazioni che costituiscono un segreto aziendale, know-how, codice, architettura, modelli, dati, sicurezza o risorse strategiche di Winerim saranno protette finché rimarranno tali.\n\nIl Cliente non può rivelare a terzi informazioni su operazioni, funzionalità, dettagli tecnici, strategia, documentazione, proposte, prezzi non pubblici, roadmap, dati, benchmark o materiali Winerim senza autorizzazione scritta."
      ],
      [
        "33. Proprietà intellettuale e industriale e banche dati",
        "Tutti i diritti di proprietà intellettuale e industriale su Winerim, software, codice, architettura, design, interfaccia, marchio, loghi, documentazione, database, tassonomie, modelli, algoritmi, regole, immagini, descrizioni, traduzioni, materiali, sviluppi, miglioramenti e risorse associate appartengono a Winerim o ai suoi concessori di licenza.\n\nIl Cliente non acquisisce diritti di proprietà o di sfruttamento contraendo, accedendo o visualizzando la Piattaforma. Tutti i diritti non espressamente concessi sono riservati a Winerim.\n\nÈ vietato riprodurre, modificare, distribuire, trasformare, comunicare pubblicamente, rendere disponibile, concedere in sublicenza, rivendere, creare opere derivate, clonare, copiare, registrare, addestrare modelli, sfruttare set di dati o utilizzare risorse Winerim al di fuori dell'uso consentito.\n\nLe fotografie, i testi, le descrizioni, i file, le traduzioni, le note di degustazione, gli abbinamenti, le etichette, le tassonomie e i contenuti forniti o arricchiti da Winerim non possono essere utilizzati al di fuori della Piattaforma senza previo consenso scritto."
      ],
      [
        "34. Uso commerciale del nome, del logo e delle storie di successo",
        "Salvo opposizione scritta da parte del Cliente o diverso accordo privato, Winerim potrà menzionare il Cliente come cliente di Winerim e utilizzare il suo nome commerciale e logo sul sito web, proposte, presentazioni, social network, materiali commerciali, portfolio e comunicazioni aziendali.\n\nLa pubblicazione di metriche personalizzate, risultati economici, dati di vendita, azioni, margini o storie di successo identificabili richiederà la previa autorizzazione da parte del Cliente, a meno che non vengano utilizzati dati aggregati, anonimizzati o non identificabili."
      ],
      [
        "35. Protezione dei dati, privacy e cookie",
        "Il trattamento dei dati personali sarà regolato dalla Privacy Policy di Winerim e, ove applicabile, dall'Allegato sull'Ordine di Elaborazione incluso nei presenti Termini o da uno specifico DPA.\n\nCiascun soggetto sarà responsabile del trattamento dei dati personali effettuato per proprio conto. Quando Winerim tratta i dati personali per conto del Cliente, agirà in qualità di responsabile del trattamento dei dati in conformità con il corrispondente Allegato.\n\nIl Cliente dichiara di disporre di una base giuridica sufficiente per incorporare dati personali nella Piattaforma e si impegna a non caricare dati non necessari, illeciti, particolarmente protetti o dati di terzi privi di legittimità.\n\nL'uso di cookie e tecnologie simili è attualmente limitato ai cookie tecnici strettamente necessari per il normale funzionamento della Piattaforma e delle tecnologie Stripe legate al processo di pagamento, alla gestione degli abbonamenti, alla sicurezza e alla prevenzione delle frodi. Se Winerim incorpora in futuro cookie non necessari, come quelli analitici, pubblicitari, di misurazione o di personalizzazione non essenziali, informerà l'utente e abiliterà i meccanismi di accettazione, rifiuto o configurazione quando legalmente applicabile."
      ],
      [
        "36. Sicurezza, audit e misure tecniche",
        "Winerim applicherà misure tecniche e organizzative ragionevoli per proteggere la Piattaforma, i dati e le risorse, inclusi il controllo degli accessi, l'autenticazione, i ruoli, le misure di riservatezza, i backup, il monitoraggio, la sicurezza dei fornitori e la gestione degli incidenti, a seconda dei casi.\n\nIl Cliente non può eseguire test di sicurezza, pentest, scansioni, audit tecnici, analisi di vulnerabilità o monitoraggio non autorizzato su Winerim senza previa autorizzazione scritta.\n\nWinerim può monitorare registri, modelli di utilizzo, accessi, richieste, dispositivi, IP, download, utilizzo e attività dell'API per rilevare frodi, abusi, scraping, reverse engineering, estrazione di dati, uso competitivo, vulnerabilità o violazioni."
      ],
      [
        "37. Limitazione di responsabilità",
        "Winerim sarà responsabile solo per danni diretti direttamente provati derivanti da inadempimento contrattuale imputabile a Winerim.\n\nFatta eccezione per frode, colpa grave o responsabilità che non possono essere legalmente escluse, la responsabilità totale accumulata di Winerim sarà limitata all'importo effettivamente pagato dal Cliente a Winerim nei dodici (12) mesi precedenti l'evento che ha dato origine al reclamo.\n\nWinerim non sarà responsabile per perdita di profitti, perdita di reddito, perdita di opportunità, perdita di reputazione, decisioni commerciali del Cliente, perdita di dati non imputabili a Winerim, interruzioni di terze parti, guasti di Internet, errori nei contenuti del Cliente, inesattezze nelle lettere, effettiva disponibilità dei prodotti, conformità alle normative sull'alcol o danni indiretti, incidentali, speciali, punitivi o consequenziali.\n\nLa Piattaforma viene fornita così com'è e come disponibile, salvo espresse garanzie concordate per iscritto. Winerim non garantisce che le raccomandazioni, gli abbinamenti, le traduzioni, le analisi, le previsioni o i risultati siano accurati, completi o appropriati per tutti i casi."
      ],
      [
        "38. Indennizzo del cliente",
        "Il Cliente manterrà Winerim indenne da reclami, sanzioni, danni, costi, spese, commissioni, perdite o responsabilità derivanti da contenuti forniti dal Cliente, non conformità legale, uso improprio, mancato pagamento, violazione di diritti di terzi, normative sull'alcol, licenze, tassazione locale, accesso non autorizzato, estrazione di dati, reverse engineering, uso competitivo o violazione dei presenti Termini.\n\nSe Winerim riceve un reclamo da una terza parte, autorità o concorrente derivante dalle azioni del Cliente, il Cliente collaborerà alla difesa, assumerà costi ragionevoli e risarcirà danni e spese nella misura legalmente appropriata."
      ],
      [
        "39. Forza maggiore",
        "Nessuna delle parti sarà responsabile per ritardi o inadempienze derivanti da cause al di fuori del suo ragionevole controllo, inclusi disastri naturali, incendi, inondazioni, pandemie, conflitti, azioni governative, scioperi, interruzioni di corrente, guasti diffusi alle telecomunicazioni, attacchi alle infrastrutture, attacchi informatici, interruzioni di fornitori critici, indisponibilità di app store o modifiche normative impreviste.\n\nLa parte interessata cercherà di comunicare la situazione e di mitigarne gli effetti quando ragionevolmente possibile. Se cause di forza maggiore impediscono sostanzialmente la fornitura per più di trenta (30) giorni, ciascuna delle parti può recedere dal servizio interessato senza penalità, fatti salvi gli importi maturati."
      ],
      [
        "40. Cessioni, subappalti e operazioni societarie",
        "Il Cliente non può cedere, trasferire o subappaltare i propri diritti o obblighi senza il previo consenso scritto di Winerim.\n\nWinerim può subappaltare parte della fornitura del servizio a fornitori tecnici, professionali, cloud, pagamenti, supporto, analisi, intelligenza artificiale, integrazioni o altri fornitori necessari, mantenendo la responsabilità contrattuale che legalmente corrisponde.\n\nWinerim può cedere le presenti Condizioni, il rapporto contrattuale, i crediti, i diritti, gli obblighi o i dati associati nell'ambito di riorganizzazioni aziendali, fusioni, acquisizioni, vendite di aziende, finanziamenti, conferimenti di rami di attività o trasferimenti di beni legati a Winerim, dandone comunicazione quando ragionevole o legalmente richiesto."
      ],
      [
        "41. Notifiche",
        "Per le notifiche ordinarie, Winerim può utilizzare l'e-mail fornita dal Cliente, gli avvisi sulla Piattaforma, la fattura, il preventivo, il pannello, il sito Web o qualsiasi altro mezzo scritto ragionevole.\n\nIl Cliente deve mantenere aggiornate le proprie informazioni di contatto. Le notifiche inviate alla email registrata saranno considerate validamente effettuate a meno che non vi sia un errore imputabile a Winerim.\n\nLe comunicazioni di cancellazione saranno valide solo se inviate a cancel@winerim.com in conformità alla clausola di cancellazione."
      ],
      [
        "42. Adempimenti normativi e sanzioni",
        "Il Cliente dichiara di non essere soggetto a sanzioni, embarghi, restrizioni commerciali o divieti che impediscano di contrattare con Winerim o di utilizzare la Piattaforma.\n\nIl Cliente si impegna a non utilizzare Winerim in attività illegali, territori proibiti, settori soggetti a restrizioni, per frode, riciclaggio di denaro, evasione fiscale, violazione di diritti, scraping, concorrenza sleale o mancato rispetto delle leggi sul controllo delle esportazioni, sanzioni internazionali o regolamenti equivalenti."
      ],
      [
        "43. Modifica delle presenti Condizioni",
        "Winerim può aggiornare i presenti Termini per riflettere cambiamenti legali, tecnici, operativi, commerciali, di sicurezza, fornitori, funzionalità, struttura aziendale, modello di business o rischi rilevati.\n\nQuando una modifica incide materialmente sui diritti o sugli obblighi essenziali del Cliente, Winerim cercherà di comunicarla tramite e-mail, avviso sulla Piattaforma, fattura, sito Web o altri mezzi ragionevoli prima che entri in vigore.\n\nLa prosecuzione dell'utilizzo della Piattaforma successivamente all'entrata in vigore sarà intesa come accettazione dei nuovi Termini, fermo restando il diritto del Cliente di richiederne la cancellazione secondo le modalità previste."
      ],
      [
        "44. Nullità parziale, interpretazione e accordo totale",
        "Qualora una qualsiasi clausola venga dichiarata nulla, non valida o inapplicabile, ciò non pregiudicherà il resto del contratto, che rimarrà in vigore. La clausola interessata sarà sostituita da un'altra valida e vicina allo scopo economico e giuridico perseguito.\n\nIl mancato esercizio di un diritto da parte di Winerim non costituirà una rinuncia. I titoli sono indicativi e non limitano il contenuto delle clausole.\n\nI presenti Termini, insieme all'Informativa sulla privacy, alla Politica sui cookie, all'Allegato sull'elaborazione dell'ordine, al modulo contrattuale, al budget, all'ordine, al piano, alla fattura o alle condizioni particolari accettate, costituiscono l'accordo completo tra le parti e sostituiscono qualsiasi precedente comunicazione o accordo sullo stesso argomento."
      ],
      [
        "45. Legge applicabile e giurisdizione internazionale",
        "Le presenti Condizioni saranno regolate e interpretate in conformità con le leggi dello Stato della Florida, Stati Uniti d'America, fatte salve le normative imperative che potrebbero essere applicabili nella giurisdizione del Cliente.\n\nPer qualsiasi controversia derivante dall'interpretazione, conformità, violazione o risoluzione delle presenti Condizioni, le parti si sottopongono alla giurisdizione esclusiva dei tribunali statali o federali situati nella contea di Miami-Dade, Florida, Stati Uniti d'America, rinunciando a qualsiasi altra giurisdizione che possa applicarsi a loro, salvo diversamente obbligatorio.\n\nIl Cliente riconosce che il contratto è B2B e di non agire in qualità di consumatore. Se in qualsiasi giurisdizione sono applicabili norme obbligatorie di protezione locale, queste verranno applicate solo nella misura strettamente obbligatoria."
      ],
      [
        "46. Contatti",
        "Per supporto, incidenti ordinari e comunicazioni generali: info@winerim.com.\n\nPer richieste di cancellazione o cancellazione dal servizio: cancel@winerim.com, unico canale contrattuale valido per le cancellazioni.\n\nPer la privacy e la protezione dei dati: info@winerim.com.\n\nALLEGATO I. Modulo contrattuale/Ordine di servizio\n\nQuesta scheda contrattuale può essere completata per ciascun cliente o incorporata in un budget, ordine, offerta, collegamento di pagamento, fattura proforma o documento equivalente. In caso di contraddittorio, quanto specificatamente pattuito nella presente scheda prevarrà solo rispetto alla specifica materia regolamentata.\n\nRagione sociale del Cliente\n\n[CLIENTE_SOCIAL_NATURA]\n\nNome commerciale/stabilimento\n\n[NOME_IMPRESA]\n\nIndirizzo dello stabilimento\n\n[INDIRIZZO_STABILIMENTO]\n\nCodice fiscale\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPersona di contatto\n\n[CONTACT_NAME]\n\nE-mail operativa\n\n[EMAIL_OPERAZIONALE]\n\nE-mail di fatturazione\n\n[EMAIL_FATTURAZIONE]\n\nPiano contrattato\n\n[PIANO]\n\nPeriodicità\n\n[MENSILE/ANNUALE/PILOTA/GRUPPO]\n\nPrezzo\n\n[IMPORTO] USD + tasse, ritenute e spese applicabili\n\nData di attivazione\n\n[DATA_ATTIVAZIONE]\n\nSoggiorno iniziale\n\n[SÌ / NO / DURATA]\n\nMetodo di pagamento\n\n[CARTA / TRASFERIMENTO / DEMICILIAZIONE DIRETTA / ALTRO]\n\nSupporto incluso\n\n[PIANIFICAZIONE/CANALI/SLA SE ESISTE]\n\nServizi aggiuntivi inclusi\n\n[DESCRIZIONE]\n\nServizi esclusi o da preventivare\n\n[DESCRIZIONE]\n\nAutorizzazione all'uso del logo\n\n[SI/NO/CONDIZIONI]\n\nCondizioni specifiche\n\n[CONDIZIONI_SPECIALI]\n\nFirma o accettazione: il Cliente accetta le presenti Condizioni mediante firma, accettazione elettronica, conferma scritta, pagamento, utilizzo effettivo della Piattaforma o qualsiasi altro atto contrattuale inequivocabile.\n\nALLEGATO II. Contratto di Commissione per il trattamento dei dati\n\nA.1. Oggetto, durata e scopo\n\nIl presente Allegato regola il trattamento dei dati personali che Winerim può effettuare per conto del Cliente quando il Cliente agisce in qualità di titolare del trattamento e Winerim in qualità di responsabile del trattamento, nell'ambito della fornitura del servizio SaaS.\n\nLo scopo del trattamento è consentire la fornitura della Piattaforma, inclusi hosting, configurazione, pubblicazione di grafici digitali, pannello di controllo, supporto, manutenzione, sicurezza, analisi, integrazioni e servizi associati.\n\nLa durata coinciderà con la validità del rapporto contrattuale e con i successivi periodi necessari alla restituzione, cancellazione, blocco, conservazione legale, copie di backup, difesa da pretese o adempimenti normativi.\n\nA.2. Categorie di dati e soggetti interessati\n\nI dati potranno comprendere dati identificativi e di contatto di rappresentanti, amministratori, dipendenti, collaboratori o utenti autorizzati del Cliente; credenziali; registri; dati di utilizzo; dati di supporto; Informazioni di fatturazione; e, quando il Cliente li incorpora o li collega, dati operativi legati a vendite, stock, ordini, prenotazioni, preferenze o interazioni.\n\nLe persone interessate possono essere rappresentanti del Cliente, personale del locale, amministratori, collaboratori, fornitori, commensali o utenti finali, sempre nella misura in cui i loro dati sono trattati nell'ambito del servizio.\n\nNon è previsto il trattamento di categorie particolari di dati personali. Il Cliente non deve incorporare dati relativi a salute, ideologia, religione, appartenenza sindacale, dati biometrici, genetici, vita sessuale, orientamento sessuale, reati penali o altri dati particolarmente protetti salvo istruzioni documentate, base giuridica sufficiente e accettazione espressa da parte di Winerim.\n\nA.3. Istruzioni per il cliente\n\nWinerim tratterà i dati personali per conto del Cliente solo in conformità con i presenti Termini, l'Informativa sulla privacy, le istruzioni documentate del Cliente e le normative applicabili.\n\nSe Winerim ritiene che un'istruzione violi le norme applicabili, può informare il Cliente e sospenderne l'esecuzione nella misura necessaria per evitare violazioni legali, rischi per la sicurezza o danni a terzi.\n\nA.4. Obblighi di Winerim in qualità di manager\n\nWinerim si impegna a trattare i dati secondo istruzioni documentate; garantire che le persone autorizzate al trattamento siano soggette al dovere di riservatezza; applicare misure tecniche e organizzative adeguate; assistere ragionevolmente il Cliente con richieste di diritti, lacune, valutazioni di impatto o consultazioni preventive, ove appropriato; e cancellare o restituire i dati al termine del servizio a meno che non sussista un obbligo di conservazione.\n\nL'assistenza che eccede il sostegno ordinario, richiede sviluppi, audit specifici, esportazioni complesse o compiti straordinari può essere preventivata separatamente.\n\nA.5. Subresponsabili del trattamento\n\nIl Cliente autorizza Winerim a utilizzare subresponsabili necessari per fornire il servizio, inclusi fornitori di hosting, archiviazione, sicurezza, monitoraggio, pagamenti, fatturazione, e-mail, supporto, analisi, intelligenza artificiale, traduzione, integrazioni, negozi di applicazioni e altri servizi tecnici.\n\nWinerim richiederà ai suoi subresponsabili del trattamento di avere obblighi di protezione dei dati sostanzialmente equivalenti a quelli assunti nel presente Allegato. Winerim può incorporare o sostituire sub-responsabili del trattamento quando necessario per la fornitura del servizio, informando con mezzi ragionevoli quando richiesto dalla legge.\n\nL'elenco effettivo dei subresponsabili deve essere mantenuto aggiornato nella documentazione interna o pubblica di Winerim e fornito al Cliente su ragionevole richiesta.\n\nA.6. Trasferimenti internazionali\n\nQuando il trattamento comporta trasferimenti internazionali di dati personali al di fuori dello Spazio Economico Europeo o territori con una decisione di adeguatezza, Winerim adotterà garanzie adeguate in conformità al GDPR, comprese clausole contrattuali tipo, decisioni di adeguatezza, misure integrative o altri meccanismi giuridicamente validi. Poiché Winerim LLC ha sede negli Stati Uniti, le parti riconoscono che potrebbe esserci accesso o trattamento dagli Stati Uniti e che le garanzie applicabili devono essere documentate quando il trattamento è soggetto al GDPR o ad altre norme equivalenti.\n\nA.7. Sicurezza e violazioni\n\nWinerim applicherà misure proporzionate di controllo degli accessi, riservatezza, integrità, disponibilità, segregazione logica, backup, monitoraggio, gestione degli incidenti, crittografia ove appropriato e sicurezza organizzativa.\n\nIn caso di violazione della sicurezza dei dati personali che incida sui dati trattati per conto del Cliente, Winerim avviserà il Cliente senza indebito ritardo non appena avrà ragionevole conoscenza dell'incidente, fornendo le informazioni disponibili in modo che il Cliente possa adempiere ai propri obblighi legali.\n\nA.8. Diritti degli interessati e controlli\n\nQuando Winerim riceve una richiesta di accesso, rettifica, cancellazione, opposizione, limitazione o portabilità relativa ai dati trattati per conto del Cliente, inoltrerà la richiesta al Cliente o fornirà ragionevole assistenza, a meno che Winerim non agisca come titolare del trattamento indipendente rispetto a tale trattamento.\n\nIl Cliente può richiedere informazioni ragionevoli per verificare la conformità al presente Addendum. Gli audit di persona o tecnici richiederanno preavviso, riservatezza, portata limitata, nessun impatto sulla sicurezza o su altri clienti e potrebbero essere soggetti a costi quando superano l'assistenza ordinaria.\n\nA.9. Restituzione e cancellazione\n\nAl termine del contratto, Winerim cancellerà o restituirà i dati personali trattati per conto del Cliente secondo istruzioni ragionevoli, fatti salvi obblighi legali di conservazione, blocco, difesa da reclami, copie di backup o necessità tecniche temporanee.\n\nLa cancellazione dei dati non riguarderà i dati aggregati, anonimizzati o dissociati che non consentono di identificare ragionevolmente una persona fisica."
      ]
    ],
    "links": [
      [
        "Home",
        "/it"
      ],
      [
        "Prodotto",
        "/it/software-carta-vini"
      ],
      [
        "Demo",
        "/it/demo"
      ],
      [
        "Contatto",
        "/it/contatto"
      ],
      [
        "Privacy",
        "/it/privacy"
      ]
    ]
  },
  "/fr/confidentialite": {
    "lang": "fr",
    "title": "Politique de confidentialité | Winerim",
    "description": "Politique de confidentialité internationale pour les clients, administrateurs, visiteurs, convives et contacts Winerim hors Espagne.",
    "h1": "Politique de confidentialité",
    "subtitle": "Traitement des données personnelles sur la plateforme Winerim · Version opérationnelle finale - 7 juillet 2026 · Applicable aux clients situés hors d’Espagne, sauf accord écrit contraire.",
    "canonical": "/fr/confidentialite",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Responsable senior international",
        "Winerim LLC, société de Floride, adresse 1210 Washington Ave 213, Miami Beach, FL 33139, États-Unis"
      ],
      [
        "Marque/plateforme",
        "Winerim"
      ],
      [
        "Confidentialité des contacts",
        "info@winerim.com"
      ],
      [
        "Portée",
        "Clients, utilisateurs administratifs, visiteurs, convives et contacts situés en dehors de l'Espagne"
      ],
      [
        "Représentant de l'UE le cas échéant",
        "info@winerim.com comme point de contact ; représentant formel dans l’UE si la loi l’exige"
      ],
      [
        "Principales réglementations",
        "Réglementation en matière de confidentialité applicable par territoire ; RGPD lorsqu'il est applicable aux personnes concernées de l'EEE"
      ],
      [
        "Retraits contractuels",
        "Les annulations du service sont gérées exclusivement à cancel@winerim.com ; Cette politique ne remplace pas cette procédure"
      ],
      [
        "1. Responsable du traitement international",
        "Le responsable du traitement des données pour les clients et utilisateurs situés en dehors de l'Espagne sera Winerim LLC, une société constituée selon les lois de l'État de Floride, États-Unis d'Amérique, dont l'adresse est 1210 Washington Ave 213, Miami Beach, FL 33139, États-Unis, à moins qu'une offre, un contrat ou une politique locale n'indique une autre entité responsable.\n\nLorsque Winerim traite des données pour le compte d'un Client, le Client sera responsable du traitement et Winerim agira en tant que sous-traitant ou prestataire de services conformément au contrat, à l'Annexe de la Commande de Traitement, aux instructions documentées et à la réglementation applicable.\n\nLorsque la présente Politique est applicable aux parties intéressées de l’Espace Économique Européen, du Royaume-Uni ou de la Suisse, Winerim appliquera les droits, garanties et bases de légitimité requis par la réglementation applicable, y compris le RGPD le cas échéant. S'il est obligatoire de désigner un représentant formel dans l'Union européenne, Winerim mettra à jour cette Politique avec vos données ; en attendant, info@winerim.com sera le point de contact opérationnel pour les demandes de renseignements sur la confidentialité."
      ],
      [
        "2. À qui s’applique cette politique",
        "Cette Politique s'applique aux représentants, administrateurs, employés, collaborateurs et utilisateurs autorisés des clients professionnels ; les visiteurs du site Web ; les utilisateurs d'applications ; les convives ou les utilisateurs finaux qui consultent les menus numériques ; contacts d'affaires; fournisseurs ; candidats; les personnes qui contactent le support ; et toute personne dont les données sont traitées dans le cadre de Winerim.\n\nWinerim est une plateforme B2B. Les restaurants, hôtels ou clients professionnels peuvent être responsables de certaines données qu'ils intègrent, connectent ou publient sur la Plateforme, y compris les données de leur personnel, des utilisateurs, des convives ou de tiers."
      ],
      [
        "3. Données personnelles que nous pouvons traiter",
        "Données d'identification et de contact : nom, prénom, fonction, entreprise, restaurant, hôtel ou groupe, adresse professionnelle, numéro de téléphone, email, identifiant, mot de passe crypté, identifiants de compte, pays et langue.\n\nDonnées de passation et de facturation : entité, CIF/NIF/TVA/CUIT/ID fiscal, adresse fiscale, plan contracté, montant, devise, factures, paiements, statut de recouvrement, mode de paiement tokenisé, données gérées par Stripe ou d'autres prestataires de paiement, incidents de recouvrement, retours et communications contractuelles.\n\nDonnées techniques et d'utilisation : adresse IP, appareil, navigateur, système d'exploitation, journaux, date et heure, langue, localisation approximative dérivée de l'IP, pages visitées, événements, clics, sessions, erreurs, jetons, identifiants de cookies, activité du panneau, traces de sécurité et utilisation de l'API.\n\nDonnées du compte et des préférences : favoris, vins consultés, sélections enregistrées, recherches, préférences linguistiques, interactions avec les recommandations, paramètres du compte et communications.\n\nMenu et données opérationnelles : références de vins, prix, millésimes, stock, rotation, ventes, disponibilité, notes, accords, images, catégories, filtres, visualisations, performances commerciales, métriques et données d'intégration, lorsque le Client les fournit ou les connecte.\n\nDonnées d'assistance et de communication : e-mails, tickets, messages, pièces jointes, appels, réunions, incidents, demandes, réponses, historique d'assistance et toute information fournie volontairement par l'utilisateur.\n\nDonnées contractuelles d'annulation : demandes envoyées à cancel@winerim.com, identification du client, email de l'expéditeur, date et heure, abonnement concerné, communications associées et preuves nécessaires pour prouver la réception ou l'absence de réception valide.\n\nNous ne demandons pas de catégories particulières de données. Les utilisateurs et clients ne doivent pas fournir de données sur la santé, l'idéologie, la religion, l'appartenance syndicale, la biométrie, la génétique, la vie sexuelle, l'orientation sexuelle, les infractions pénales ou d'autres données spécialement protégées, sauf si cela est strictement nécessaire, s'il existe une base légale et que Winerim l'accepte expressément."
      ],
      [
        "4. Origine des données",
        "Les données peuvent provenir directement de l'utilisateur ou du Client ; des administrateurs autorisés par le Client ; auprès des prestataires de paiement ; à partir d'intégrations activées par le Client, telles que POS, PMS, ERP, CRM ou autres outils ; auprès de fournisseurs techniques ; depuis les magasins d'applications ; cookies et technologies similaires ; de sources publiques ; et les données générées par l’utilisation de la Plateforme.\n\nLorsque le Client intègre des données de tiers dans Winerim, il déclare disposer d'une base juridique suffisante et avoir fourni les informations de confidentialité correspondantes."
      ],
      [
        "5. Finalités du traitement",
        "Créez et gérez des comptes, authentifiez les utilisateurs, gérez les autorisations, autorisez l'accès à la plateforme et maintenez la sécurité.\n\nFournir le service sous-traité, comprenant la configuration, le téléchargement, la publication, la visualisation, la traduction, l'enrichissement, la maintenance, l'analyse et la gestion des cartes des vins numériques.\n\nGérer les inscriptions, les renouvellements, les annulations, les annulations, les paiements, la facturation, la comptabilité, les taxes, les retours, les rétrofacturations, les non-paiements et les relations contractuelles.\n\nFournir un support technique et fonctionnel, répondre aux requêtes, résoudre les incidents, communiquer les modifications, effectuer la maintenance, envoyer des avis de sécurité, de facturation ou de service.\n\nAnalysez les ventes, le stock, la rotation, la disponibilité, les interactions, les préférences, les performances des menus, l'utilisation de filtres et les mesures d'exploitation pour proposer des panneaux, des recommandations, des alertes, des informations et une amélioration de la gestion.\n\nDévelopper, former, régler, tester et améliorer les systèmes internes pour l'analyse, la recommandation, la classification, l'appariement, la traduction, la normalisation, la détection d'erreurs, la sécurité et d'autres fonctionnalités, de préférence avec des données agrégées, anonymisées ou minimisées lorsque cela est possible.\n\nEmpêchez la fraude, les abus, les accès non autorisés, le scraping, l’exploration, l’extraction automatisée, l’ingénierie inverse, l’utilisation concurrentielle, les ruptures de contrat, les incidents de sécurité et les attaques.\n\nEnvoyez vos propres communications commerciales sur Winerim, des actualités, des fonctionnalités, des événements ou des services similaires lorsqu'il existe une base légale et en respectant le droit d'opposition ou d'annulation.\n\nSe conformer aux obligations légales, répondre aux autorités, traiter les réclamations, préserver les preuves, défendre les droits, gérer les audits et les opérations de l'entreprise."
      ],
      [
        "6. Bases juridiques ou fondements du traitement",
        "Pour les relations B2B internationales, Winerim traitera les données sur la base de l'exécution contractuelle, de mesures précontractuelles, du respect des obligations légales, des intérêts commerciaux légitimes, du consentement lorsque requis ou de toute autre base autorisée par la réglementation applicable.\n\nLorsque le RGPD est applicable aux parties intéressées de l'Espace économique européen, les bases de légitimité seront l'exécution du contrat, le respect des obligations légales, l'intérêt légitime, le consentement et, le cas échéant, les instructions du responsable du traitement si Winerim agit en tant que sous-traitant.\n\nLes intérêts légitimes comprennent la sécurité, la prévention de la fraude, l'amélioration des services, l'analyse interne, l'assistance, la défense des réclamations, les communications B2B, la protection de la propriété intellectuelle, la détection du scraping, l'ingénierie inverse, l'exploration de données, l'abus d'API et l'utilisation concurrentielle non autorisée.\n\nLorsque la réglementation locale exige un consentement spécifique, Winerim le demandera ou le Client devra l'obtenir avant d'incorporer des données dans la Plateforme."
      ],
      [
        "7. Affichage public des cartes des vins",
        "L'objectif essentiel de Winerim est de permettre aux Clients d'afficher publiquement leurs cartes des vins au format numérique. Par conséquent, les données du menu, telles que les références, les prix, les millésimes, les images, les descriptions, les accords, les catégories et la disponibilité, peuvent être visibles publiquement par les convives, les visiteurs, les moteurs de recherche et les tiers techniques nécessaires au fonctionnement d'Internet.\n\nEn principe, ces informations sont de nature commerciale ou commerciale. Si le Client inclut des données personnelles dans une lettre, il sera responsable d'avoir une base légale et d'éviter de publier des informations personnelles inutiles ou non autorisées."
      ],
      [
        "8. Données de vente, stocks, analyses et analyses comparatives",
        "Winerim peut traiter les données de vente, le stock, la rotation, la disponibilité, les interactions, les filtres, les visualisations, les préférences et les performances commerciales pour fournir le service, présenter des analyses au Client, générer des recommandations, améliorer les fonctionnalités, détecter les erreurs et offrir une intelligence d'affaires.\n\nWinerim peut utiliser des données agrégées, anonymisées ou dissociées à des fins d'analyse sectorielle, d'analyse comparative, de rapports internes ou externes, de veille commerciale, de formation de modèles, d'amélioration de produits, d'études commerciales et de développement de nouvelles fonctionnalités.\n\nWinerim ne vendra pas de données personnelles. Il ne publiera pas non plus de données individualisées sur les ventes, les stocks, les marges ou les performances économiques d'un Client l'identifiant directement sans autorisation ou nécessité légale.\n\nCette politique n'accorde au client, aux utilisateurs autorisés ou à des tiers aucun droit d'extraire, de copier, de vendre, de revendre, de concéder sous licence, de céder, de transférer, de publier, de commercialiser, de former des modèles, de nourrir des bases de données, de gratter ou d'exploiter les données, le contenu, les mesures, les recommandations, les taxonomies, les ensembles de données, les images, les descriptions ou les actifs de Winerim en dehors de l'utilisation autorisée dans les Conditions."
      ],
      [
        "9. Intelligence artificielle et décisions automatisées",
        "Winerim peut utiliser des systèmes automatisés ou d'intelligence artificielle pour classer les vins, enrichir les données, générer des descriptions, traduire, créer des accords, trier les résultats, recommander des vins, détecter des anomalies, améliorer la recherche et optimiser les fonctionnalités.\n\nCes fonctionnalités sont complémentaires et peuvent provoquer des erreurs. Ils ne produisent pas de décisions de justice ni d’effets sensiblement similaires sur les personnes physiques au sens strict du RGPD, sauf indication contraire expresse dans une fonctionnalité spécifique.\n\nLorsque les données personnelles sont utilisées dans des systèmes automatisés, Winerim s'efforcera d'appliquer la minimisation, la pseudonymisation, l'anonymisation ou l'agrégation lorsque cela est possible et proportionné.\n\nLe Client ne peut pas utiliser les données ou les sorties de Winerim pour former des modèles externes ou développer des solutions concurrentes, conformément aux Conditions."
      ],
      [
        "10. Destinataires, fournisseurs et sous-traitants",
        "Nous pouvons partager des données avec des fournisseurs qui fournissent des services à Winerim, notamment l'hébergement cloud, le stockage, la sécurité, la surveillance, la messagerie électronique, l'assistance, l'analyse, les paiements, la facturation, l'intelligence artificielle, la traduction, l'intégration, les outils internes, les conseillers professionnels et les magasins d'applications.\n\nStripe ou d'autres fournisseurs de paiement peuvent traiter les données nécessaires aux paiements, aux abonnements, à la facturation, à la prévention de la fraude, à la conformité financière et aux obligations réglementaires conformément à leurs propres conditions et politiques.\n\nApple, Google ou les opérateurs de magasins d'applications peuvent traiter des données lorsque l'utilisateur télécharge ou utilise des applications mobiles depuis leurs environnements.\n\nNous pouvons également communiquer des données aux autorités, tribunaux, administrations publiques, forces de sécurité, conseillers, acheteurs potentiels ou tiers lorsqu'il existe une obligation légale, une exigence valable, la défense des droits, le fonctionnement de l'entreprise ou un intérêt légitime suffisant.\n\nLa liste spécifique des fournisseurs et sous-traitants concernés doit être tenue à jour et mise à disposition sur demande raisonnable ou sur une page Winerim spécifique."
      ],
      [
        "11. Transferts et traitement internationaux depuis les États-Unis",
        "Winerim LLC est située aux États-Unis, les données peuvent donc être traitées, stockées ou accessibles depuis les États-Unis et d'autres pays où les fournisseurs de Winerim opèrent.\n\nLorsque le traitement est soumis au RGPD ou à d'autres réglementations restreignant les transferts internationaux, Winerim appliquera des garanties appropriées, telles que des clauses contractuelles types, des décisions d'adéquation, des mesures complémentaires, des contrats de fournisseurs ou des mécanismes équivalents juridiquement valables.\n\nLe Client reconnaît que l'utilisation d'un service SaaS international peut impliquer des transferts transfrontaliers, un accès à distance, des fournisseurs de cloud, des paiements, une assistance, une sécurité, des analyses et une intelligence artificielle dans différentes juridictions."
      ],
      [
        "12. Conservation des données",
        "Les données du compte et du contrat seront conservées aussi longtemps qu'il existe une relation contractuelle et ensuite pendant les périodes nécessaires à la conformité juridique, comptable, fiscale, à la défense des réclamations, à l'audit, à la sécurité et aux responsabilités.\n\nLes données de facturation seront conservées pendant les durées requises par la réglementation fiscale, commerciale et comptable applicable.\n\nLes demandes d'annulation, les communications contractuelles et les preuves associées seront conservées pendant les périodes nécessaires pour traiter l'annulation, prouver leur réception ou leur défaut de réception valable, défendre les réclamations et respecter les obligations légales.\n\nLes données justificatives seront conservées pendant la durée nécessaire au traitement de la requête ou de l'incident et ultérieurement pendant une durée raisonnable pour le suivi, la qualité, la sécurité et la défense des réclamations.\n\nLes données techniques, les logs et la sécurité seront conservés pendant les durées prévues à des fins de sécurité, de diagnostic, de prévention des fraudes, de détection de scraping, d'abus, de rétro-ingénierie et d'amélioration du service.\n\nLes données de courrier, de stock, de vente et opérationnelles seront conservées pendant la durée d'activité du compte et pendant une durée raisonnable par la suite à des fins d'exportation, de récupération, de support, de copies de sauvegarde, de conformité légale et de défense des droits.\n\nLes données agrégées, anonymisées ou dissociées peuvent être conservées indéfiniment car elles ne permettent pas raisonnablement d'identifier une personne physique."
      ],
      [
        "13. Droits à la vie privée",
        "Les personnes intéressées peuvent exercer les droits reconnus par la réglementation applicable dans leur ressort. Lorsque le RGPD s'applique, ces droits comprennent l'accès, la rectification, la suppression, l'opposition, la limitation, la portabilité et le retrait du consentement.\n\nSelon le pays ou l'état, il peut également exister des droits d'information, de rectification, de suppression, d'exclusion de vente ou de partage, de limitation de certaines utilisations, de recours ou de dépôt de plainte auprès des autorités compétentes.\n\nPour exercer les droits, vous devez contacter info@winerim.com, en indiquant le droit que vous souhaitez exercer, le pays de résidence et des données suffisantes pour identifier la demande. Winerim peut demander des informations supplémentaires pour vérifier l'identité ou la représentation.\n\nSi la demande concerne des données traitées pour le compte d'un Client, Winerim peut transmettre la demande au Client ou agir selon ses instructions.\n\nLes intéressés de l'Espace économique européen peuvent s'adresser à l'autorité de contrôle compétente. S'il existe un représentant européen formellement désigné, ses coordonnées seront indiquées dans la présente Politique ; en attendant, info@winerim.com sera le point de contact opérationnel pour les demandes de renseignements sur la confidentialité."
      ],
      [
        "14. Cookies et technologies similaires",
        "Winerim n'utilise actuellement pas ses propres cookies analytiques, publicitaires ou marketing. La Plateforme peut utiliser ses propres cookies techniques strictement nécessaires à l'authentification, à la session, à la sécurité, à la prévention des abus et au fonctionnement ordinaire du Service. Pour les paiements, Winerim utilise Stripe en tant que fournisseur tiers, qui peut installer ou utiliser des cookies et des technologies similaires nécessaires au traitement des paiements, gérer les abonnements, prévenir la fraude, améliorer la sécurité et respecter les obligations financières ou réglementaires.\n\nSi à l'avenir Winerim intègre des cookies non nécessaires, tels que des cookies d'analyse, de publicité, de mesure ou de personnalisation non essentielles, l'utilisateur en sera informé et le mécanisme d'acceptation, de rejet ou de configuration sera activé lorsqu'il est légalement applicable. Le rejet des cookies non nécessaires n'empêchera pas l'utilisation de base du Service lorsque ces cookies ne sont pas essentiels."
      ],
      [
        "15. Communications commerciales",
        "Winerim peut envoyer des communications concernant le service, la sécurité, la facturation, les modifications contractuelles, la maintenance, les incidents ou le fonctionnement du compte, dans la mesure où elles sont nécessaires à la relation contractuelle.\n\nWinerim peut envoyer ses propres communications commerciales sur des services similaires, de nouvelles fonctionnalités, des contenus, des événements ou des actualités, lorsqu'il existe une base légale. Le destinataire peut s'opposer ou se désinscrire en utilisant les mécanismes indiqués dans chaque communication.\n\nL'annulation des communications commerciales n'implique pas l'annulation du service. L'annulation contractuelle ne sera valable que si elle est demandée par courrier électronique à cancel@winerim.com conformément aux Conditions."
      ],
      [
        "16. Sécurité et confidentialité",
        "Winerim appliquera des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles contre tout accès non autorisé, altération, perte, destruction, divulgation ou utilisation abusive.\n\nCes mesures peuvent inclure le contrôle d'accès, les rôles, l'authentification, le cryptage le cas échéant, les sauvegardes, la surveillance, la journalisation, la gestion des incidents, la confidentialité contractuelle, l'examen des fournisseurs et des mesures de continuité raisonnables.\n\nAucun système n’est complètement sécurisé. Le client et les utilisateurs doivent protéger leurs informations d'identification, utiliser des mots de passe forts, limiter les autorisations et signaler les incidents ou les accès non autorisés."
      ],
      [
        "17. Mineurs",
        "Winerim est un service B2B professionnel et ne s'adresse pas aux mineurs. Nous ne demandons pas sciemment de données à des mineurs.\n\nLe Client est responsable du respect de la réglementation applicable lorsque des convives ou des utilisateurs finaux mineurs peuvent accéder aux menus publics, notamment en matière de boissons alcoolisées, de publicité, d'âge légal et de consommation responsable."
      ],
      [
        "18. Responsabilité du Client pour les données incorporées",
        "Le Client sera responsable des données personnelles qu'il décide d'incorporer, de connecter ou de publier dans Winerim, y compris les données des employés, collaborateurs, fournisseurs, convives, images, commentaires, notes ou informations de tiers.\n\nLe Client doit informer les personnes concernées le cas échéant, obtenir les consentements nécessaires, établir les bases juridiques, répondre aux demandes de droits et éviter d'incorporer des données inutiles ou spécialement protégées.\n\nWinerim peut supprimer, bloquer ou exiger le retrait de données lorsqu'il existe des indices d'illégalité, d'excès, de violation des droits, de risque de sécurité ou de rupture de contrat."
      ],
      [
        "19. Non-vente de données personnelles et limites d'utilisation des données",
        "Winerim ne vend pas de données personnelles au sens ordinaire du transfert de données identifiables en échange d'argent.\n\nWinerim peut exploiter des données non personnelles, agrégées, anonymisées, dissociées ou générées par la Plateforme à des fins d'amélioration, d'analyse, d'analyse comparative, d'IA, de produit, de sécurité et commerciales, conformément aux Conditions et à la présente Politique.\n\nLes clients, utilisateurs ou tiers ne peuvent pas extraire, revendre, concéder sous licence, transférer, monétiser ou utiliser les données ou les actifs de Winerim pour leurs propres produits, tiers, IA externe, conseils, comparateurs, catalogues ou solutions concurrentes."
      ],
      [
        "20. Modifications de cette politique",
        "Winerim peut mettre à jour cette politique pour refléter les changements juridiques, techniques, opérationnels, les fournisseurs, les fonctionnalités, les traitements, la structure de l'entreprise ou le modèle commercial.\n\nLorsque des modifications sont pertinentes, Winerim tentera de les communiquer par courrier électronique, plateforme, site Web ou tout autre moyen raisonnable. La poursuite de l'utilisation de la Plateforme après la mise à jour implique la connaissance de la version actuelle, sans préjudice des droits légalement applicables."
      ],
      [
        "21. Contacter",
        "Pour la confidentialité et la protection des données : info@winerim.com.\n\nPour une assistance régulière : info@winerim.com.\n\nPour les annulations contractuelles du service : exclusivement cancel@winerim.com, conformément aux Conditions Générales."
      ]
    ],
    "links": [
      [
        "Accueil",
        "/fr"
      ],
      [
        "Produit",
        "/fr/logiciel-carte-des-vins"
      ],
      [
        "Démo",
        "/fr/demo"
      ],
      [
        "Contact",
        "/fr/contact"
      ],
      [
        "Conditions",
        "/fr/conditions"
      ]
    ]
  },
  "/fr/conditions": {
    "lang": "fr",
    "title": "Conditions générales de contrat et d'utilisation SaaS | Winerim",
    "description": "Conditions internationales de souscription et d’utilisation SaaS pour les clients Winerim hors Espagne.",
    "h1": "Conditions générales de contrat et d'utilisation SaaS",
    "subtitle": "Contrat SaaS B2B intégré pour les clients professionnels Winerim · Version opérationnelle finale - 7 juillet 2026 · Applicable aux clients situés hors d’Espagne, sauf accord écrit contraire.",
    "canonical": "/fr/conditions",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Documenter",
        "Conditions générales internationales / Conditions générales internationales avec contrat SaaS intégré"
      ],
      [
        "Portée",
        "Clients situés en dehors de l’Espagne, sauf accord écrit contraire"
      ],
      [
        "Fournisseur et facturation",
        "Winerim LLC, une société constituée en vertu des lois de l'État de Floride, adresse 1210 Washington Ave 213, Miami Beach, FL 33139, États-Unis"
      ],
      [
        "Marque",
        "Winerim"
      ],
      [
        "Nature",
        "Service B2B SaaS pour l'hôtellerie, la restauration, l'hôtellerie et les groupes professionnels"
      ],
      [
        "Retraits contractuels",
        "Uniquement par email à cancel@winerim.com 15 jours calendaires à l'avance"
      ],
      [
        "Contact général",
        "info@winerim.com"
      ],
      [
        "Loi et juridiction",
        "Lois de l'État de Floride ; tribunaux d'État ou fédéraux situés dans le comté de Miami-Dade, en Floride, sauf règle impérative"
      ],
      [
        "1. Identification du fournisseur et portée de la demande internationale",
        "Les présentes Conditions générales internationales régissent la souscription, l'accès et l'utilisation professionnelle de Winerim en dehors de l'Espagne, y compris ses applications Web et mobiles, ses panneaux de contrôle, ses menus numériques, ses modules de gestion, ses intégrations, ses API, ses fonctionnalités d'analyse, son intelligence artificielle, son support et ses services associés.\n\nPour les clients situés en dehors de l'Espagne, le fournisseur contractuel et l'entité émettrice de la facture seront Winerim LLC, une société constituée selon les lois de l'État de Floride, aux États-Unis d'Amérique, dont l'adresse est 1210 Washington Ave 213, Miami Beach, FL 33139, USA, à moins qu'une offre, une commande, une facture ou un contrat particulier n'indique expressément une autre entité fournisseur.\n\nLe client sera la personne physique ou morale qui contracte la prestation en tant qu'entrepreneur, professionnel, entreprise, restaurant, hôtel, groupe hôtelier, établissement touristique, club, distributeur ou entité équivalente, ci-après le Client."
      ],
      [
        "2. Caractère professionnel de la prestation",
        "Winerim est une plateforme SaaS B2B destinée à la numérisation, à la gestion, à l'analyse et à l'exploitation commerciale de cartes de vins, de caves, de stocks, de données de vente et d'expériences de service dans l'hôtellerie.\n\nLe Client déclare qu'il contracte Winerim dans le cadre de son activité professionnelle ou commerciale et non en tant que consommateur ou utilisateur final. La Plateforme n'est pas destinée à la souscription de consommateurs à des fins particulières.\n\nLes convives, visiteurs ou utilisateurs finaux qui consultent un menu numérique du Client n'acquièrent pas de ce fait la qualité de clients contractuels directs de Winerim, sauf s'ils créent leur propre compte, utilisent des fonctionnalités indépendantes ou acceptent des conditions spécifiques supplémentaires."
      ],
      [
        "3. Objet contractuel et intégration du contrat SaaS",
        "Les présentes Conditions constituent l'accord SaaS applicable entre Winerim et le Client. Il n’existe pas de contrat SaaS distinct sauf si les parties signent des conditions particulières, une commande de service, un devis, une commande, un avenant ou un accord spécifique.\n\nLe contrat accorde au Client une licence limitée, révocable en cas de non-respect, non exclusive, ne pouvant faire l'objet d'une sous-licence, non transférable et conditionnée au paiement pour accéder et utiliser la Plateforme pendant la durée de la relation contractuelle et uniquement pour l'Utilisation Autorisée.\n\nLa licence n'implique pas la vente, la cession, la transmission ou l'acquisition de propriété de logiciels, codes, données, bases de données, documentation, images, taxonomies, empreintes digitales, règles, algorithmes, modèles, recommandations, informations, interfaces, conceptions, savoir-faire ou tout autre actif de Winerim."
      ],
      [
        "4. Réception et documents contractuels",
        "L'acceptation des présentes Conditions peut être faite par signature manuscrite ou électronique, acceptation dans le processus d'inscription, confirmation par courrier électronique, paiement de l'abonnement, utilisation effective de la Plateforme, acceptation du devis ou tout autre acte contractuel sans équivoque.\n\nLa souscription implique l'acceptation des présentes Conditions, de la Politique de Confidentialité, de la Politique de Cookies le cas échéant, de l'Annexe de Commande de Traitement, du formulaire de souscription, du budget, du plan, de la commande, de la facture ou des conditions particulières acceptées.\n\nEn cas de contradiction entre les présentes Conditions et une condition particulière expressément signée ou acceptée par les deux parties, la condition particulière ne prévaudra que sur le point spécifique réglementé."
      ],
      [
        "5. Définitions essentielles",
        "Plateforme désigne l'ensemble des applications web, des applications mobiles, des panneaux de contrôle, des bases de données, des API, des modules, des services, des conceptions, de la documentation, des fonctionnalités et des systèmes proposés sous la marque Winerim.\n\nDonnées du Menu désigne toutes les informations relatives à la carte des vins du Client, notamment les références, millésimes, prix, appellations, régions, pays, caves, raisins, formats, images, descriptions, notes de dégustation, accords, disponibilités, catégories, étiquettes, langues, recommandations, favoris, ordre de présentation et toute donnée équivalente.\n\nLes Données Opérationnelles désignent les données sur le stock, les ventes, la rotation, la consommation, les marges, la disponibilité, l'historique, les mouvements de cave, les performances commerciales, les interactions, l'utilisation de filtres, les vues, les clics, les réservations ou les commandes lorsqu'elles existent, les intégrations avec des tiers et toute information liée à la gestion ou à l'exploitation de la carte des vins.\n\nLe Contenu Client désigne les logos, marques, images, textes, lettres, prix, matériels, données commerciales et informations fournies par le Client.\n\nLe contenu Winerim désigne les logiciels, le code, l'architecture, la conception, l'interface, les bases de données, les empreintes digitales du vin, les images, les descriptions, les traductions, les recommandations, les taxonomies, les données riches, les modèles, les règles, les algorithmes, la documentation, les textes, le savoir-faire, les mesures, les références, les informations, le matériel de formation et tout actif créé, sous licence, normalisé ou incorporé par Winerim.\n\nDonnées et actifs Winerim désignent, en plus du contenu Winerim, tout ensemble de données, structure de données, taxonomie, normalisation, classification, enrichissement, relation de données, modèle, modèle d'utilisation, classement, recommandation, métrique, rapport, référence, signal analytique ou connaissance généré ou traité par Winerim.\n\nL'Utilisation Autorisée désigne l'utilisation interne, professionnelle et ordinaire de la Plateforme par le Client pour gérer, visualiser et exploiter sa propre carte des vins au sein de l'établissement, du groupe ou du compte souscrit, sans extraction, transfert, revente, utilisation concurrentielle ou exploitation externe des actifs de Winerim."
      ],
      [
        "6. Etendue générale des prestations",
        "Winerim permet au Client de créer, gérer, visualiser, exploiter et analyser numériquement sa carte des vins et les informations associées à son domaine viticole, son stock et son service en chambre.\n\nSauf indication contraire du plan contracté, le service peut inclure l'inscription du Client, la configuration initiale, le chargement initial du menu fourni, le menu numérique personnalisé, le lien web ou QR, l'application téléchargeable si disponible, le panneau de contrôle, les formats d'affichage, les filtres, les favoris, les recommandés, la sélection, le multilingue, l'activation et la désactivation des vins, la modification des prix, des raisins, des millésimes, des accords, des descriptions et des notes de dégustation, la demande de nouvelles références, l'analyse et l'assistance ordinaire.\n\nLa partie avant du menu numérique peut être consultée par les convives sans frais supplémentaires directs pour eux, sans préjudice des tarifs payés par le Client à Winerim.\n\nLe menu peut être public et accessible de partout, sans que l'utilisateur final ait besoin d'être physiquement présent dans l'établissement, sauf configuration différente demandée par le Client et techniquement acceptée par Winerim."
      ],
      [
        "7. Prestations non incluses sauf accord exprès",
        "Sauf accord expresse écrit, les développements personnalisés, les intégrations avec des systèmes POS, PMS, ERP, CRM ou autres, les migrations complexes, la purification avancée des données, la photographie professionnelle, l'impression de codes QR ou de matériel physique, la formation en face à face, le conseil stratégique, l'audit d'entrepôt, la gestion opérationnelle des stocks pour le compte du client, l'assistance en dehors des heures d'ouverture, les SLA spécifiques, les API privées, les modèles d'IA personnalisés, les traductions professionnelles révisées par des humains, la personnalisation avancée de la marque ou les fonctionnalités non décrites dans le plan contracté ne sont pas inclus.\n\nWinerim peut proposer des prestations complémentaires par le biais d'un devis, d'une commande, d'une annexe ou d'un contrat spécifique. Votre contrat ne modifiera pas automatiquement ces Conditions sauf indication expresse."
      ],
      [
        "8. Inscription, mise en œuvre et collaboration du Client",
        "Le Client devra fournir à Winerim, dans un format raisonnablement exploitable, toutes les informations nécessaires à la mise en œuvre : carte des vins, prix, millésimes, stock, images, logos, données fiscales, coordonnées, accès ou tout autre élément nécessaire.\n\nLe Client est responsable de la véracité, de l'exactitude, de la mise à jour et de la légalité du contenu et des données livrés, téléchargés, modifiés ou maintenus dans Winerim.\n\nLes délais d'activation ou de chargement commenceront à compter à partir de la réception complète des informations nécessaires et, le cas échéant, du paiement initial. Les temps de fonctionnement sont des estimations raisonnables, sauf garantie expresse par écrit.\n\nWinerim peut demander des images, fiches techniques, données de cave, millésimes, prix ou autres informations nécessaires pour créer, compléter, corriger ou enrichir des références sans empreinte numérique ou avec des informations insuffisantes."
      ],
      [
        "9. Licence d'utilisation et limites",
        "Le Client reçoit une licence limitée pour utiliser la Plateforme uniquement pendant la durée de la relation contractuelle, pour sa propre activité professionnelle, conformément au plan contracté et à l'Utilisation Autorisée.\n\nLa licence est accordée par compte, établissement, groupe, territoire, nombre d'utilisateurs, modules, fonctionnalités ou limites d'utilisation indiqués dans le formulaire de contrat ou le plan contracté.\n\nLe Client ne peut pas concéder de sous-licence, céder, louer, vendre, revendre, mettre à disposition de tiers, exploiter en tant que service, opérer pour le compte de tiers, fournir des services de conseil basés sur Winerim ou autoriser l'accès à des tiers non autorisés sans le consentement écrit préalable de Winerim."
      ],
      [
        "10. Interdictions essentielles : ingénierie inverse, extraction et exploitation de données",
        "Le Client ne peut pas directement ou indirectement effectuer, autoriser, faciliter, commander ou tenter d'effectuer de l'ingénierie inverse, une décompilation, un désassemblage, une analyse de code, une analyse architecturale, un audit technique non autorisé, une analyse, des tests d'intrusion, une exploitation de vulnérabilités, une copie logique, une copie de flux, une copie d'interface, une copie de structure de données ou toute action visant à comprendre, répliquer, remplacer ou concurrencer Winerim.\n\nIl est interdit de télécharger, d'extraire, de copier, d'indexer, d'exploiter, de synchroniser, de photographier systématiquement, de capturer en masse, de gratter, d'explorer, de récolter, d'explorer des données, d'abus d'API, de requêtes automatisées ou toute obtention massive ou non autorisée de données, contenus, images, fichiers, taxonomies, structures, étiquettes, classifications, empreintes digitales, métriques, informations, recommandations ou documentation de Winerim.\n\nIl est interdit de vendre, revendre, concéder sous licence, louer, céder, transférer, publier, redistribuer, monétiser, commercialiser ou exploiter de quelque manière que ce soit les données et actifs de Winerim, le contenu de Winerim, les données enrichies, les références, les ensembles de données, les recommandations, les modèles, les règles, les algorithmes, le savoir-faire, les rapports, les sorties ou les résultats générés par la Plateforme en dehors de l'Utilisation autorisée.\n\nIl est interdit d'utiliser Winerim, son contenu ou ses données pour alimenter ses bases de données propres ou celles de tiers, former, ajuster, évaluer ou améliorer des systèmes d'intelligence artificielle, créer des comparateurs, des places de marché, des moteurs de recherche, des catalogues, des systèmes de recommandation, des solutions de gestion du vin, des outils d'analyse, des services de conseil, des rapports sectoriels ou des produits concurrents.\n\nLe Client ne peut pas autoriser l'accès ou la visualisation de la Plateforme, des démos, des panneaux, de la documentation, des captures d'écran, des configurations, des propositions, du matériel ou des données à des concurrents directs ou indirects de Winerim, ou à des tiers qui développent, commercialisent, conseillent ou investissent dans des solutions concurrentes, sauf autorisation écrite préalable de Winerim.\n\nLa possibilité technique de visualiser, télécharger, exporter, copier ou accéder aux informations n'implique pas une autorisation légale pour leur extraction, réutilisation, vente, transfert, formation à l'IA, monétisation ou exploitation en dehors de l'utilisation autorisée.\n\nLe non-respect de cette clause sera considéré comme un manquement fondamental et pourra justifier une suspension immédiate, une résiliation contractuelle, un blocage d'accès, un retrait ou une destruction de matériel, une indemnisation pour dommages et l'exercice d'actions en justice."
      ],
      [
        "11. Données et actifs Winerim",
        "Winerim conserve tous les droits sur vos données et actifs Winerim, y compris les ensembles de données, les taxonomies, les empreintes digitales du vin, les règles de normalisation, les classifications, les modèles, les modèles, les références, les recommandations, les traductions, les descriptions, les images, la documentation, les interfaces, les métriques, les informations et tout enrichissement généré par Winerim.\n\nLe Client reconnaît que l'investissement de Winerim dans la création, la normalisation, la conservation, la structuration et l'exploitation des données constitue un actif essentiel, protégé contractuellement et légalement, incluant, le cas échéant, les droits de propriété intellectuelle, les droits sur les bases de données, les secrets commerciaux et la concurrence déloyale.\n\nAucune donnée, écran, rapport, exportation, recommandation, aperçu ou résultat généré par Winerim ne peut être utilisé par le Client à des fins autres que la gestion interne de son menu et du service sous-traité."
      ],
      [
        "12. Contenu client",
        "Le Client conserve la propriété de ses marques, logos, images propres, lettres, prix, données commerciales et autres contenus originaux qu'il apporte à la Plateforme, à condition qu'il en soit effectivement la propriété ou qu'il dispose de droits suffisants.\n\nLe Client accorde à Winerim une licence mondiale, non exclusive, gratuite, sous-licenciable aux prestataires techniques, pendant la durée du service et pendant le temps nécessaire par la suite pour la conformité légale, le support, les copies de sauvegarde et la défense des droits, pour héberger, reproduire, adapter techniquement, traduire, normaliser, enrichir, afficher, communiquer publiquement et traiter ledit contenu dans la mesure nécessaire pour fournir, améliorer et protéger le service.\n\nLe Client garantit qu'il dispose de droits suffisants sur les images, logos, textes, données, fichiers, prix et matériels qu'il fournit. Winerim ne sera pas responsable des réclamations de tiers découlant du contenu fourni par le Client."
      ],
      [
        "13. Utilisation et affichage public des cartes des vins",
        "Le Client autorise expressément Winerim à afficher et mettre à disposition des utilisateurs finaux la carte des vins du Client et ses Données de Menu via la Plateforme, le site Internet, l'application, les liens, les codes QR, les widgets, les intégrations et les canaux associés au service.\n\nCette autorisation comprend les noms des vins, des domaines viticoles, des régions, des appellations, des raisins, des millésimes, des prix, des formats, des images, des descriptions, des notes de dégustation, des accords, des étiquettes, des catégories, des langues, des disponibilités, des recommandations et toute information faisant partie du menu numérique.\n\nLe Client reconnaît que l'affichage public du menu est une partie essentielle du service et que les informations incluses peuvent être accessibles par les clients, moteurs de recherche, navigateurs, systèmes de cache, réseaux ou tiers techniques dans la mesure du fonctionnement d'Internet, sauf si une configuration différente est acceptée par Winerim.\n\nIl appartiendra au Client de s'assurer que les prix, millésimes, disponibilités, promotions, images, droits de tiers et autres informations publiées sont corrects, licites et à jour."
      ],
      [
        "14. Données de ventes, de stocks, de chiffre d'affaires et d'analyse",
        "Le Client autorise Winerim à collecter, stocker, traiter, analyser, visualiser, croiser, enrichir et utiliser les Données Opérationnelles liées au menu, aux ventes, au stock, à la rotation, à la consommation, aux marges, à la disponibilité, à l'historique, aux mouvements d'entrepôt, aux interactions, aux visualisations, aux filtres, aux favoris, aux réservations ou aux commandes lorsqu'ils existent.\n\nWinerim peut utiliser ces données pour fournir le service, générer des panels, des métriques, des recommandations, des alertes, des rapports, des comparaisons internes, la détection d'erreurs, l'amélioration des fonctionnalités, la sécurité, la prévention de la fraude, le support, le développement de produits et la création de business intelligence pour le Client.\n\nWinerim peut utiliser des données agrégées, anonymisées ou dissociées à des fins d'analyse sectorielle, de benchmarking, de statistiques, de rapports, de développement de produits, de formation et d'amélioration de modèles, de communication commerciale, d'études de marché, de recommandations et de création de nouveaux services, toujours sans identifier directement le Client lorsqu'il s'agit de données sensibles sur les ventes, les stocks, les marges ou les performances économiques, sauf autorisation expresse.\n\nWinerim ne vendra pas de données personnelles. L'exploitation commerciale de données non personnelles, agrégées, anonymisées ou générées par Winerim ne confère pas au Client des droits de compensation, de participation ou de contrôle supplémentaire, sauf accord écrit contraire."
      ],
      [
        "15. Alcool, réglementation de l’hôtellerie et responsabilité du restaurant",
        "Winerim ne vend, ne sert, ne fournit, ne transporte, ne distribue ni ne facture de boissons alcoolisées aux utilisateurs finaux. La Plateforme est un outil technologique de gestion, de visualisation, d'analyse et de support commercial.\n\nLe Client est seul responsable de la vente, du service, de la disponibilité, des prix, des taxes, des licences, de l'âge légal, de la consommation responsable, des réglementations sanitaires, des réglementations d'accueil, des réglementations en matière de publicité sur les alcools et de la conformité locale applicable à son activité.\n\nLes recommandations, accords, classements, descriptions ou suggestions générés par Winerim ne remplacent pas le jugement professionnel du Client ni ses obligations légales envers les consommateurs, les autorités ou les tiers."
      ],
      [
        "16. Intelligence artificielle, recommandations et contenus automatisés",
        "Winerim peut intégrer des systèmes automatisés ou d'intelligence artificielle pour classer les vins, enrichir les données, traduire, générer des descriptions, suggérer des accords, trier les résultats, détecter des modèles, recommander des références et améliorer l'expérience utilisateur.\n\nCes fonctionnalités sont des outils de support. Ils peuvent contenir des erreurs, des omissions, des biais, des inexactitudes ou des résultats non adaptés à une situation spécifique. Le Client doit examiner les informations pertinentes avant de les publier, de les utiliser commercialement ou de prendre des décisions d'achat, de vente, de stock ou de service.\n\nWinerim peut modifier, limiter, remplacer, désactiver ou améliorer les fonctionnalités de l'IA à tout moment pour des raisons techniques, juridiques, commerciales, de sécurité, de qualité ou de fournisseur.\n\nLe Client ne peut pas utiliser les sorties, recommandations, intégrations, scores, invites, résultats, taxonomies, descriptions ou ensembles de données de l'IA générés par Winerim pour former des modèles externes, créer des produits concurrents, vendre des données ou alimenter des bases de données en dehors de l'utilisation autorisée."
      ],
      [
        "17. Intégrations, API et tiers",
        "Winerim peut s'intégrer aux fournisseurs de paiement, aux points de vente, aux PMS, aux ERP, aux CRM, aux outils d'analyse, aux services de messagerie, à l'hébergement cloud, aux magasins d'applications, aux fournisseurs d'intelligence artificielle et à d'autres tiers.\n\nLes intégrations dépendront de la disponibilité, des conditions, des API, des modifications techniques, des tarifs, des limitations et des décisions de ces tiers. Winerim ne sera pas responsable des pannes, modifications, interruptions, pertes ou limitations imputables à des tiers échappant à son contrôle raisonnable.\n\nLe Client autorise Winerim à échanger des données avec les tiers nécessaires lors de l'activation d'une intégration ou lorsqu'il est essentiel de fournir le service, toujours dans le cadre contractuel et de confidentialité applicable."
      ],
      [
        "18. Obligations de Winerim",
        "Winerim fournira le service avec une diligence professionnelle, conformément aux usages habituels du secteur SaaS et avec des moyens techniques et humains raisonnablement disponibles.\n\nWinerim effectuera le chargement initial de la lettre fournie par le Client conformément au plan contracté et aux informations reçues. L'exactitude définitive des prix, des disponibilités, des millésimes, des stocks et des données commerciales relèvera de la responsabilité du Client.\n\nWinerim s'efforcera d'informer le Client des incidents pertinents qui affectent substantiellement le service lorsqu'il en a connaissance et que cela est raisonnablement possible."
      ],
      [
        "19. Obligations du Client",
        "Le Client doit payer dans les plus brefs délais les frais contractuels, les taxes, les frais bancaires, les frais de retour et tout montant impayé conformément aux présentes Conditions.\n\nLe Client doit utiliser la Plateforme conformément à la loi, de bonne foi, à la documentation, aux instructions de Winerim et à l'utilisation autorisée.\n\nLe Client doit former son personnel autorisé, contrôler les informations d'identification, examiner la lettre publiée, maintenir les données à jour et ne pas télécharger d'informations illégales, inutiles, fausses, protégées ou provenant de tiers sans droits suffisants.\n\nLe Client sera responsable de toutes les actions de ses administrateurs, employés, collaborateurs, fournisseurs ou tiers autorisés qui accèdent à la Plateforme par eux-mêmes ou sous leurs identifiants."
      ],
      [
        "20. Comptes clients, informations d'identification et sécurité",
        "Le client sera responsable de la protection des informations d'identification, des utilisateurs administratifs, des autorisations et des accès. Toute action réalisée à partir d'un compte Client sera présumée avoir été réalisée par le Client ou une personne habilitée, sauf preuve contraire.\n\nLe Client doit immédiatement informer Winerim de tout accès non autorisé, perte d'identifiants, utilisation abusive, fuite de données ou incident de sécurité affectant son compte.\n\nWinerim peut bloquer, suspendre, restaurer ou limiter l'accès lorsqu'il existe des indications raisonnables de risque, d'abus, d'utilisation non autorisée, de grattage, d'extraction, de violation de sécurité ou de rupture de contrat."
      ],
      [
        "21. Assistance, maintenance et mises à jour",
        "L'assistance ordinaire sera fournie via les canaux activés par Winerim, y compris le panel, le courrier électronique ou tout autre moyen indiqué, dans les heures de fonctionnement communiquées ou contractuelles.\n\nWinerim est un produit vivant et en constante évolution. Winerim peut introduire des mises à jour, des améliorations, des modifications techniques, des automatisations, des intégrations, des modifications d'interface, de nouveaux modules, des ajustements architecturaux, des correctifs de sécurité et des modifications fonctionnelles.\n\nLes mises à jour pourront modifier l'apparence, les flux, les fonctionnalités, les champs, les filtres, les modules ou la manière de fournir le service, à condition qu'elles ne vident pas le service souscrit de contenus essentiels.\n\nWinerim peut effectuer une maintenance programmée ou d'urgence. Dans des situations critiques, de sécurité ou de tiers, le service pourra être interrompu sans préavis, en essayant de le restaurer dans les plus brefs délais raisonnables."
      ],
      [
        "22. Disponibilité et absence de garantie absolue",
        "Winerim will endeavor to keep the Platform available to reasonable SaaS industry standards, but does not guarantee uninterrupted availability, complete absence of errors, permanent compatibility with all devices, browsers or systems, or indefinite continuity of all functionalities.\n\nSauf s'il existe un SLA signé, la Plateforme est fournie par des moyens raisonnables et sous réserve de disponibilité, sans engagement de disponibilité, crédits de service ni compensation automatique des interruptions.\n\nWinerim ne sera pas responsable des pannes, interruptions, perte de connectivité, lenteur, indisponibilité ou erreurs causées par les fournisseurs de cloud, Internet, les magasins d'applications, Stripe, les API tierces, les appareils du Client, les réseaux locaux, les configurations incorrectes, la force majeure ou les événements échappant à son contrôle raisonnable."
      ],
      [
        "23. Beta features, pilots and tests",
        "Winerim peut proposer des fonctionnalités bêta, des pilotes, des tests, des modules expérimentaux ou un accès anticipé. Ces fonctionnalités sont proposées sans garantie de continuité, de stabilité, de disponibilité, de résultat ou de permanence.\n\nWinerim peut modifier, limiter ou retirer les fonctionnalités bêta à tout moment sans générer de droit à indemnisation, sauf accord contraire écrit."
      ],
      [
        "24. Prix, facturation internationale, taxes et mode de paiement",
        "Le Client paiera à Winerim LLC les montants indiqués dans le plan, le budget, le formulaire de contrat, la facture, le lien de paiement ou la condition particulière acceptée, normalement en dollars américains (USD), sauf accord écrit contraire.\n\nLes prix ne comprennent pas les taxes, frais, charges, retenues, frais bancaires, commissions de transfert, frais de change, frais d'intermédiaire financier ou frais équivalents applicables dans la juridiction du Client ou dans les opérations de recouvrement internationales.\n\nLorsque la réglementation locale du Client exige des retenues, des paiements ou des déductions sur les paiements à l'étranger, ces frais seront assumés par le Client par le biais d'une majoration, afin que Winerim LLC reçoive la totalité du montant net convenu.\n\nLa facturation peut être mensuelle, annuelle, par pilote, par groupe, par établissement, par module ou selon la modalité contractée. Le paiement peut être effectué par carte, virement, Stripe ou tout autre moyen accepté par Winerim.\n\nIl appartiendra au Client de respecter les obligations fiscales, de change, douanières, d'importation de services, d'enregistrement des paiements à l'étranger, de retenues ou déclarations applicables dans son pays."
      ],
      [
        "25. Mise à jour annuelle des prix",
        "Le Client reconnaît et accepte que Winerim puisse mettre à jour automatiquement ses tarifs chaque année civile.\n\nÀ compter du 1er janvier de chaque année, Winerim peut appliquer une mise à jour annuelle des prix comprise entre cinq pour cent (5%) et dix pour cent (10%) sur les prix en vigueur au cours de l'année précédente.\n\nCette mise à jour répondra, entre autres raisons, à l'augmentation des besoins opérationnels, technologiques, d'infrastructure, de support, de maintenance, de développement de produits, de sécurité, de fournisseurs externes, d'inflation, d'évolution de la Plateforme et de nouvelles fonctionnalités.\n\nLa mise à jour annuelle est réputée acceptée dès la conclusion du contrat car elle fait partie des conditions économiques du contrat et ne nécessitera pas d'acceptation supplémentaire. Winerim pourra le communiquer par email, plateforme, facture, budget, renouvellement, communication commerciale ou tout autre moyen écrit, sans que le manque de communication individualisée n'empêche son application lorsqu'elle se situe dans la fourchette convenue.\n\nSi le Client n'est pas satisfait, il pourra demander l'annulation conformément à la procédure d'annulation prévue dans les présentes Conditions."
      ],
      [
        "26. Modification extraordinaire des prix, forfaits et services",
        "Outre la mise à jour annuelle ordinaire, Winerim pourra modifier les prix, les plans, les modules, les limites d'utilisation, les fonctionnalités ou les conditions économiques pour des raisons techniques, commerciales, opérationnelles, fiscales, réglementaires, de change, de fournisseurs externes, de sécurité ou d'évolution des produits.\n\nLorsque la modification entraîne une augmentation du prix récurrent contracté en dehors de la mise à jour annuelle ordinaire, Winerim en informera le Client au moins quinze (15) jours calendaires avant le prochain paiement ou renouvellement.\n\nSi le Client n'est pas satisfait, il peut demander l'annulation selon la procédure établie. Le non-respect du délai d'annulation ou de continuité d'utilisation vaut acceptation des nouvelles conditions économiques."
      ],
      [
        "27. Annulation et résiliation du service",
        "Le Client peut demander la résiliation de son abonnement exclusivement par communication écrite envoyée par email à cancel@winerim.com.\n\nLa demande de résiliation doit parvenir au moins quinze (15) jours calendaires avant la date de la prochaine période de paiement, de renouvellement ou de facturation.\n\nLa demande doit être envoyée à partir de l'email associé au compte du Client ou à partir d'un email permettant d'identifier raisonnablement le Client, et comporter au minimum la raison sociale, le nom commercial de l'établissement, l'identification fiscale, le pays, le service ou l'abonnement dont l'annulation est demandée et la date d'annulation demandée.\n\nLes demandes formulées par téléphone, WhatsApp, message verbal, réseaux sociaux, messages aux vendeurs, managers, salariés, support opérationnel ou tout autre canal autre que cancel@winerim.com ne seront pas valables à des fins d'annulation contractuelle.\n\nL'annulation sera effective à la fin de la période de facturation en cours si la demande est reçue dans le délai minimum indiqué. En cas de réception moins de quinze (15) jours calendaires, la résiliation prendra effet à l'issue de la période de facturation suivante, laissant le Client obligé de payer ladite période.\n\nL'annulation ne donnera pas droit au remboursement des sommes déjà facturées ou payées, sauf accord exprès écrit de Winerim ou obligation légale. L'annulation ne dispense pas du paiement des sommes en souffrance, des factures en attente, des taxes, des commissions, des services supplémentaires fournis ou des sommes accumulées avant la date effective de l'annulation."
      ],
      [
        "28. Non-paiements, retours et suspension",
        "En cas de non-paiement, de retard, de retour de facture, de rétrofacturation, de défaut de carte, de rejet bancaire ou d'incident de recouvrement, Winerim pourra réclamer le montant impayé, les frais bancaires, les frais de recouvrement raisonnables et les intérêts légaux applicables.\n\nWinerim pourra suspendre totalement ou partiellement l'accès à la Plateforme en cas de défaut de paiement ou après un préavis raisonnable, selon sa gravité, sans que la suspension ne libère le Client de ses obligations de paiement.\n\nSi le non-paiement persiste plus de sept (7) jours calendaires à compter de la suspension ou de l'exigence, Winerim pourra mettre fin à la relation contractuelle, supprimer ou limiter l'accès et réclamer les sommes impayées, dommages, frais et pertes."
      ],
      [
        "29. Durée et renouvellement",
        "La durée initiale sera celle indiquée dans le plan, le formulaire de contrat, le budget, la facture, le bon de prestation ou la condition particulière acceptée. A défaut d’indication expresse, la durée sera renouvelable mensuellement.\n\nSauf annulation valable conformément à la clause de résiliation, l'abonnement sera automatiquement renouvelé pour des périodes équivalentes successives, en appliquant les tarifs en vigueur, les mises à jour annuelles et les conditions économiques applicables.\n\nDans les contrats annuels, les pilotes à prix fixe, les engagements minimaux ou les contrats à permanence, il n'y aura aucun remboursement des périodes déjà commencées sauf accord écrit différent ou exigence légale."
      ],
      [
        "30. Suspension et résolution en cas de non-conformité",
        "Winerim peut suspendre ou résilier le service, avec effet immédiat ou après demande de rectification selon la gravité, en cas de non-paiement, d'utilisation illicite ou abusive, de violation de la propriété intellectuelle, de violation de la confidentialité, d'accès ou de transfert non autorisé, d'utilisation par ou pour des concurrents, d'ingénierie inverse, de scraping, d'extraction de données, de formation non autorisée à l'IA, de monétisation de données ou de toute action mettant en danger les actifs, la sécurité ou la position concurrentielle de Winerim.\n\nDans de tels cas, Winerim peut bloquer l'accès, exiger la cessation immédiate, ordonner le retrait ou la destruction du matériel, révoquer les licences, conserver les preuves techniques, réclamer une indemnisation et intenter une action en justice.\n\nLe Client peut mettre fin à la relation si Winerim subit un manquement grave qui n'a pas été remédié dans un délai raisonnable de trente (30) jours à compter de la demande écrite, à condition que le manquement soit imputable à Winerim et ne provienne pas de tiers, de force majeure, de non-paiement ou du fait du Client."
      ],
      [
        "31. Effets de la résiliation",
        "Une fois la relation terminée, le droit du Client d'utiliser la Plateforme cessera immédiatement et Winerim pourra désactiver l'accès, supprimer les lettres publiques, arrêter les intégrations et limiter les fonctionnalités.\n\nSauf impossibilité technique ou juridique, Winerim permettra au Client de demander, pendant trente (30) jours calendaires à compter de la résiliation, une exportation raisonnable de ses informations opérationnelles hébergées sur la Plateforme, à condition que le Client soit à jour de paiement et que l'exportation n'inclut pas les Données et Actifs de Winerim, les données d'autres clients, les secrets d'affaires, les taxonomies propriétaires, les modèles, les règles, les structures, les ensembles de données enrichis ou les informations non exportables.\n\nWinerim peut conserver les informations nécessaires à la conformité légale, à la facturation, à la sécurité, à la défense des réclamations, aux preuves de non-conformité, aux copies de sauvegarde et aux enregistrements internes, ainsi que des données agrégées, anonymisées ou dissociées.\n\nLes clauses de propriété intellectuelle, interdictions d'utilisation, de non-extraction, de confidentialité, de protection des données, de limitation de responsabilité, d'indemnisation, de paiements en attente, de juridiction et toutes autres qui par leur nature devraient perdurer resteront en vigueur après la résiliation."
      ],
      [
        "32. Confidentialité et secrets d'affaires",
        "Les deux parties s'engagent à maintenir la confidentialité des informations techniques, commerciales, stratégiques, opérationnelles, économiques, financières, juridiques, produits, sécurité, clients, prix, feuille de route, données et savoir-faire auxquelles elles accèdent au cours de la relation.\n\nLe Client reconnaît que les logiciels, l'architecture, les bases de données, les taxonomies, les modèles, les recommandations, les métriques, la documentation, les flux, les interfaces, la logique métier, les données riches et le savoir-faire de Winerim peuvent constituer des secrets commerciaux.\n\nL'obligation de confidentialité subsistera pendant la relation contractuelle et pendant cinq (5) ans après sa résiliation. Les informations qui constituent un secret d'affaires, le savoir-faire, le code, l'architecture, les modèles, les données, la sécurité ou les actifs stratégiques de Winerim seront protégés tant qu'ils le resteront.\n\nLe Client ne peut pas divulguer à des tiers des informations sur le fonctionnement, les fonctionnalités, les détails techniques, la stratégie, la documentation, les propositions, les prix non publics, la feuille de route, les données, les benchmarks ou les matériaux Winerim sans autorisation écrite."
      ],
      [
        "33. Propriété intellectuelle et industrielle et bases de données",
        "Tous les droits de propriété intellectuelle et industrielle sur Winerim, logiciels, codes, architecture, design, interface, marque, logos, documentation, bases de données, taxonomies, modèles, algorithmes, règles, images, descriptions, traductions, matériaux, développements, améliorations et actifs associés appartiennent à Winerim ou à ses concédants de licence.\n\nLe Client n'acquiert aucun droit de propriété ou d'exploitation en contractant, en accédant ou en consultant la Plateforme. Tous les droits non expressément accordés sont réservés à Winerim.\n\nIl est interdit de reproduire, modifier, distribuer, transformer, communiquer publiquement, mettre à disposition, concéder des sous-licences, revendre, créer des œuvres dérivées, cloner, copier, enregistrer, former des modèles, exploiter des ensembles de données ou utiliser les actifs de Winerim en dehors de l'utilisation autorisée.\n\nLes photographies, textes, descriptions, fichiers, traductions, notes de dégustation, accords, étiquettes, taxonomies et contenus fournis ou enrichis par Winerim ne peuvent être utilisés en dehors de la Plateforme sans accord écrit préalable."
      ],
      [
        "34. Utilisation commerciale du nom, du logo et des réussites",
        "Sauf opposition écrite du Client ou accord privé différent, Winerim peut mentionner le Client comme client de Winerim et utiliser son nom commercial et son logo sur le site Internet, les propositions, les présentations, les réseaux sociaux, les supports commerciaux, le portfolio et la communication d'entreprise.\n\nLa publication de mesures individualisées, de résultats économiques, de données de ventes, de stocks, de marges ou de success story identifiables nécessitera l'autorisation préalable du Client, à moins que des données agrégées, anonymisées ou non identifiables ne soient utilisées."
      ],
      [
        "35. Protection des données, confidentialité et cookies",
        "Le traitement des données personnelles sera régi par la politique de confidentialité de Winerim et, le cas échéant, par l'annexe de commande de traitement incluse dans les présentes conditions ou par un DPA spécifique.\n\nChaque partie sera responsable du traitement des données personnelles effectué pour son propre compte. Lorsque Winerim traite des données personnelles pour le compte du Client, elle agira en qualité de sous-traitant conformément à l'Annexe correspondante.\n\nLe Client déclare disposer d'une base juridique suffisante pour intégrer des données personnelles dans la Plateforme et s'engage à ne pas télécharger de données inutiles, illicites, spécialement protégées ou de tiers sans légitimité.\n\nL'utilisation de cookies et technologies similaires est actuellement limitée aux cookies techniques strictement nécessaires au fonctionnement ordinaire de la Plateforme et aux technologies Stripe associées au processus de paiement, à la gestion des abonnements, à la sécurité et à la prévention de la fraude. Si Winerim intègre à l'avenir des cookies non nécessaires, tels que des cookies d'analyse, de publicité, de mesure ou de personnalisation non essentielles, ils informeront l'utilisateur et permettront des mécanismes d'acceptation, de rejet ou de configuration lorsque la loi est applicable."
      ],
      [
        "36. Sécurité, audits et mesures techniques",
        "Winerim appliquera des mesures techniques et organisationnelles raisonnables pour protéger la Plateforme, les données et les actifs, y compris le contrôle d'accès, l'authentification, les rôles, les mesures de confidentialité, les sauvegardes, la surveillance, la sécurité des fournisseurs et la gestion des incidents, le cas échéant.\n\nLe Client ne peut pas effectuer de tests de sécurité, de tests d'intrusion, d'analyses, d'audits techniques, d'analyses de vulnérabilité ou de surveillance non autorisée sur Winerim sans autorisation écrite préalable.\n\nWinerim peut surveiller les journaux, les modèles d'utilisation, les accès, les demandes, les appareils, les adresses IP, les téléchargements, l'utilisation et l'activité des API pour détecter les fraudes, les abus, le scraping, l'ingénierie inverse, l'extraction de données, l'utilisation concurrentielle, les vulnérabilités ou les violations."
      ],
      [
        "37. Limitation de responsabilité",
        "Winerim ne sera responsable que des dommages directs directement prouvés résultant d'une rupture contractuelle imputable à Winerim.\n\nSauf fraude, négligence grave ou responsabilités qui ne peuvent légalement être exclues, la responsabilité totale accumulée de Winerim sera limitée au montant effectivement payé par le Client à Winerim dans les douze (12) mois précédant l'événement donnant lieu à la réclamation.\n\nWinerim ne sera pas responsable des pertes de profits, perte de revenus, perte d'opportunité, perte de réputation, décisions commerciales du Client, perte de données non imputables à Winerim, interruptions de tiers, pannes Internet, erreurs dans le contenu du Client, inexactitudes dans les lettres, disponibilité réelle des produits, respect de la réglementation sur l'alcool ou dommages indirects, accessoires, spéciaux, punitifs ou consécutifs.\n\nLa Plateforme est fournie telle quelle et selon ses disponibilités, sauf garanties expresses convenues par écrit. Winerim ne garantit pas que les recommandations, appariements, traductions, analyses, prévisions ou résultats sont exacts, complets ou appropriés dans tous les cas."
      ],
      [
        "38. Indemnisation du client",
        "Le Client dégagera Winerim de toute responsabilité contre les réclamations, pénalités, dommages, coûts, dépenses, frais, pertes ou responsabilités résultant du contenu contribué par le Client, de la non-conformité légale, de l'utilisation abusive, du non-paiement, de la violation des droits de tiers, de la réglementation sur l'alcool, des licences, de la fiscalité locale, de l'accès non autorisé, de l'extraction de données, de l'ingénierie inverse, de l'utilisation concurrentielle ou de la violation des présentes Conditions.\n\nSi Winerim reçoit une réclamation d'un tiers, d'une autorité ou d'un concurrent résultant des actions du Client, le Client collaborera à la défense, assumera des coûts raisonnables et compensera les dommages et dépenses dans la mesure légalement appropriée."
      ],
      [
        "39. Force majeure",
        "Aucune des parties ne sera responsable des retards ou du non-respect résultant de causes indépendantes de sa volonté, notamment les catastrophes naturelles, les incendies, les inondations, les pandémies, les conflits, les actions gouvernementales, les grèves, les pannes de courant, les pannes généralisées de télécommunications, les attaques d'infrastructures, les cyberattaques, les perturbations des fournisseurs critiques, l'indisponibilité des magasins d'applications ou les changements réglementaires imprévus.\n\nLa partie concernée s'efforcera de communiquer la situation et d'atténuer ses effets lorsque cela est raisonnablement possible. Si un cas de force majeure empêche substantiellement la fourniture pendant plus de trente (30) jours, chacune des parties pourra résilier la prestation concernée sans pénalité, sans préjudice des sommes accumulées."
      ],
      [
        "40. Cession, sous-traitance et opérations corporate",
        "Le Client ne peut céder, transférer ou sous-traiter ses droits ou obligations sans l'accord préalable et écrit de Winerim.\n\nWinerim peut sous-traiter une partie de la fourniture du service avec des fournisseurs techniques, professionnels, cloud, paiements, support, analyses, IA, intégrations ou autres fournisseurs nécessaires, en maintenant la responsabilité contractuelle qui correspond légalement.\n\nWinerim pourra céder les présentes Conditions, la relation contractuelle, les crédits, les droits, les obligations ou les données associées dans le cadre d'une réorganisation d'entreprise, d'une fusion, d'une acquisition, d'une vente d'entreprise, d'un financement, d'un apport de branche d'activité ou d'un transfert d'actifs liés à Winerim, en le notifiant lorsque cela est raisonnable ou légalement requis."
      ],
      [
        "41. Notifications",
        "Pour les notifications ordinaires, Winerim peut utiliser l'e-mail fourni par le Client, les avis sur la Plateforme, la facture, le devis, le panneau, le site Internet ou tout autre moyen écrit raisonnable.\n\nLe Client doit tenir à jour ses coordonnées. Les notifications envoyées à l'e-mail enregistré seront considérées comme valablement effectuées sauf erreur imputable à Winerim.\n\nLes communications d'annulation ne seront valables que si elles sont envoyées à cancel@winerim.com conformément à la clause d'annulation."
      ],
      [
        "42. Conformité réglementaire et sanctions",
        "Le Client déclare qu'il n'est pas soumis à des sanctions, embargos, restrictions commerciales ou interdictions empêchant de contracter avec Winerim ou d'utiliser la Plateforme.\n\nLe Client s'engage à ne pas utiliser Winerim dans des activités illégales, territoires interdits, secteurs restreints, à des fins de fraude, blanchiment d'argent, évasion fiscale, violation de droits, scraping, concurrence déloyale ou non-respect des lois de contrôle des exportations, des sanctions internationales ou des réglementations équivalentes."
      ],
      [
        "43. Modification des présentes Conditions",
        "Winerim peut mettre à jour ces Conditions pour refléter les changements juridiques, techniques, opérationnels, commerciaux, de sécurité, les fournisseurs, les fonctionnalités, la structure de l'entreprise, le modèle commercial ou les risques détectés.\n\nLorsqu'une modification affecte matériellement les droits ou obligations essentiels du Client, Winerim s'efforcera de la communiquer par courrier électronique, avis sur la Plateforme, facture, site Internet ou tout autre moyen raisonnable avant qu'elle n'entre en vigueur.\n\nLa poursuite de l'utilisation de la Plateforme après l'entrée en vigueur vaut acceptation des nouvelles Conditions, sans préjudice du droit du Client de demander l'annulation conformément à la procédure établie."
      ],
      [
        "44. Nullité partielle, interprétation et accord complet",
        "Si une clause est déclarée nulle, invalide ou inapplicable, cela n’affectera pas le reste du contrat, qui restera en vigueur. La clause concernée sera remplacée par une autre clause valable et proche du but économique et juridique poursuivi.\n\nLe défaut d’exercice par Winerim d’un droit ne constituera pas une renonciation. Les titres sont indicatifs et ne limitent pas le contenu des clauses.\n\nLes présentes Conditions, ainsi que la Politique de Confidentialité, la Politique de Cookies, l'Annexe de Commande de Traitement, le formulaire de contrat, le budget, la commande, le plan, la facture ou les conditions particulières acceptées, constituent l'intégralité de l'accord entre les parties et remplacent toute communication ou accord antérieur sur le même sujet."
      ],
      [
        "45. Droit applicable et compétence internationale",
        "Les présentes Conditions seront régies et interprétées conformément aux lois de l'État de Floride, aux États-Unis d'Amérique, sans préjudice des réglementations impératives qui peuvent être applicables dans la juridiction du Client.\n\nPour toute controverse découlant de l'interprétation, du respect, de la violation ou de la résiliation des présentes Conditions, les parties se soumettent à la juridiction exclusive des tribunaux étatiques ou fédéraux situés dans le comté de Miami-Dade, en Floride, aux États-Unis d'Amérique, renonçant à toute autre juridiction qui pourrait s'appliquer à elles, sauf obligation contraire.\n\nLe Client reconnaît que le contrat est B2B et qu'il n'agit pas en tant que consommateur. Si des règles de protection locales obligatoires sont applicables dans une juridiction, elles ne seront appliquées que dans la mesure strictement obligatoire."
      ],
      [
        "46. Contacts",
        "Pour l'assistance, les incidents ordinaires et les communications générales : info@winerim.com.\n\nPour toute demande d'annulation ou d'annulation du service : cancel@winerim.com, seul canal contractuel valable pour les annulations.\n\nPour la confidentialité et la protection des données : info@winerim.com.\n\nANNEXE I. Formulaire de contrat / Commande de services\n\nCette fiche contractuelle peut être complétée pour chaque client ou intégrée à un budget, une commande, une offre, un lien de paiement, une facture pro forma ou un document équivalent. En cas de contradiction, ce qui est spécifiquement convenu sur cette fiche prévaudra uniquement en ce qui concerne la matière spécifique réglementée.\n\nRaison sociale du Client\n\n[CUSTOMER_SOCIAL_NATURE]\n\nNom commercial/établissement\n\n[BUSINESS_NAME]\n\nAdresse de l'établissement\n\n[ESTABLISHMENT_ADDRESS]\n\nNuméro d'identification fiscale\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPersonne à contacter\n\n[CONTACT_NAME]\n\nE-mail opérationnel\n\n[OPERATIONAL_EMAIL]\n\nE-mail de facturation\n\n[BILLING_EMAIL]\n\nPlan contracté\n\n[PLANIFIER]\n\nPériodicité\n\n[MENSUEL / ANNUEL / PILOTE / GROUPE]\n\nPrix\n\n[MONTANT] USD + taxes, retenues et dépenses applicables\n\nDate d'activation\n\n[ACTIVATION_DATE]\n\nSéjour initial\n\n[OUI / NON / DURÉE]\n\nMode de paiement\n\n[CARTE / TRANSFERT / DÉMICILIATION DIRECTE / AUTRE]\n\nAssistance incluse\n\n[HORAIRE / CANAUX / SLA SI EXISTE]\n\nServices supplémentaires inclus\n\n[DESCRIPTION]\n\nPrestations exclues ou à budgétiser\n\n[DESCRIPTION]\n\nAutorisation d'utilisation du logo\n\n[OUI / NON / CONDITIONS]\n\nConditions spécifiques\n\n[CONDITIONS SPÉCIALES]\n\nSignature ou acceptation : le Client accepte les présentes Conditions par signature, acceptation électronique, confirmation écrite, paiement, utilisation effective de la Plateforme ou tout autre acte contractuel sans équivoque.\n\nANNEXE II. Accord de commission de traitement des données\n\nA.1. Objet, durée et finalité\n\nLa présente Annexe réglemente le traitement des données personnelles que Winerim peut effectuer pour le compte du Client lorsque le Client agit en qualité de responsable de traitement et Winerim en tant que sous-traitant, dans le cadre de la fourniture du service SaaS.\n\nLa finalité du traitement est de permettre la fourniture de la Plateforme, notamment l'hébergement, la configuration, la publication de cartes numériques, le panneau de contrôle, le support, la maintenance, la sécurité, les analyses, les intégrations et les services associés.\n\nLa durée coïncidera avec la validité de la relation contractuelle et avec les délais ultérieurs nécessaires à la restitution, à la suppression, au blocage, à la conservation légale, aux copies de sauvegarde, à la défense contre des réclamations ou au respect de la réglementation.\n\nA.2. Catégories de données et personnes concernées\n\nLes données peuvent inclure les données d'identification et de contact des représentants, administrateurs, employés, collaborateurs ou utilisateurs autorisés du Client ; informations d'identification; journaux; données d'utilisation ; données à l'appui ; Informations de facturation; et, lorsque le Client les intègre ou les connecte, des données opérationnelles liées aux ventes, stocks, commandes, réservations, préférences ou interactions.\n\nLes personnes concernées peuvent être des représentants du Client, du personnel de l'établissement, des administrateurs, des collaborateurs, des fournisseurs, des convives ou des utilisateurs finaux, toujours dans la mesure où leurs données sont traitées dans le service.\n\nLe traitement de catégories particulières de données personnelles n'est pas prévu. Le Client ne doit pas incorporer de données sur la santé, l'idéologie, la religion, l'appartenance syndicale, les données biométriques, génétiques, la vie sexuelle, l'orientation sexuelle, les infractions pénales ou d'autres données spécialement protégées, sauf instruction documentée, base juridique suffisante et acceptation expresse de Winerim.\n\nA.3. Instructions aux clients\n\nWinerim traitera les données personnelles au nom du Client uniquement conformément aux présentes Conditions, à la Politique de confidentialité, aux instructions documentées du Client et à la réglementation applicable.\n\nSi Winerim estime qu'une instruction viole la réglementation applicable, elle pourra en informer le Client et suspendre son exécution dans la mesure nécessaire pour éviter des violations de la loi, des risques de sécurité ou des dommages à des tiers.\n\nA.4. Obligations de Winerim en tant que gérant\n\nWinerim s'engage à traiter les données conformément aux instructions documentées ; garantir que les personnes autorisées à les traiter sont soumises au devoir de confidentialité ; appliquer les mesures techniques et organisationnelles appropriées ; aider raisonnablement le Client avec les demandes de droits, les lacunes, les évaluations d'impact ou les consultations préalables, le cas échéant ; et supprimer ou restituer les données à la fin de la prestation sauf obligation de conservation.\n\nLes aides qui dépassent le soutien ordinaire, nécessitent des développements, des audits spécifiques, des exportations complexes ou des tâches extraordinaires peuvent être budgétisées séparément.\n\nA.5. Sous-traitants\n\nLe Client autorise Winerim à utiliser les sous-traitants nécessaires à la fourniture du service, y compris les fournisseurs d'hébergement, de stockage, de sécurité, de surveillance, de paiements, de facturation, de courrier électronique, d'assistance, d'analyse, d'intelligence artificielle, de traduction, d'intégrations, de magasins d'applications et d'autres services techniques.\n\nWinerim exigera de ses sous-traitants qu'ils aient des obligations de protection des données substantiellement équivalentes à celles assumées dans la présente annexe. Winerim peut incorporer ou remplacer des sous-traitants lorsque cela est nécessaire pour la fourniture du service, en informant par des moyens raisonnables lorsque la loi l'exige.\n\nLa liste réelle des sous-traitants ultérieurs doit être tenue à jour dans la documentation interne ou publique de Winerim et fournie au Client sur demande raisonnable.\n\nA.6. Virements internationaux\n\nLorsque le traitement implique des transferts internationaux de données personnelles en dehors de l'Espace économique européen ou des territoires faisant l'objet d'une décision d'adéquation, Winerim adoptera les garanties appropriées conformément au RGPD, y compris des clauses contractuelles types, des décisions d'adéquation, des mesures complémentaires ou d'autres mécanismes juridiquement valables. Winerim LLC étant située aux États-Unis, les parties reconnaissent qu'il peut y avoir un accès ou un traitement depuis les États-Unis et que les garanties applicables doivent être documentées lorsque le traitement est soumis au RGPD ou à d'autres réglementations équivalentes.\n\nA.7. Sécurité et failles\n\nWinerim appliquera des mesures proportionnées de contrôle d'accès, de confidentialité, d'intégrité, de disponibilité, de ségrégation logique, de sauvegardes, de surveillance, de gestion des incidents, de cryptage le cas échéant et de sécurité organisationnelle.\n\nEn cas de violation de la sécurité des données personnelles affectant les données traitées pour le compte du Client, Winerim en informera le Client sans délai indu dès qu'elle aura une connaissance raisonnable de l'incident, en lui fournissant les informations disponibles afin que le Client puisse se conformer à ses obligations légales.\n\nA.8. Droits des parties intéressées et audits\n\nLorsque Winerim reçoit une demande d'accès, de rectification, de suppression, d'opposition, de limitation ou de portabilité relative aux données traitées pour le compte du Client, elle transmettra la demande au Client ou fournira une assistance raisonnable, à moins que Winerim n'agisse en tant que responsable du traitement indépendant à l'égard de ce traitement.\n\nLe client peut demander des informations raisonnables pour vérifier la conformité avec cet addendum. Les audits en personne ou techniques nécessiteront un préavis, la confidentialité, une portée limitée, aucun impact sur la sécurité ou d'autres clients et peuvent être soumis à des coûts lorsqu'ils dépassent l'assistance ordinaire.\n\nA.9. Retour et suppression\n\nA la fin du contrat, Winerim supprimera ou restituera les données personnelles traitées pour le compte du Client conformément aux instructions raisonnables, sauf obligation légale de conservation, blocage, défense de réclamations, copies de sauvegarde ou nécessité technique temporaire.\n\nLa suppression des données n’affectera pas les données agrégées, anonymisées ou dissociées ne permettant pas d’identifier raisonnablement une personne physique."
      ]
    ],
    "links": [
      [
        "Accueil",
        "/fr"
      ],
      [
        "Produit",
        "/fr/logiciel-carte-des-vins"
      ],
      [
        "Démo",
        "/fr/demo"
      ],
      [
        "Contact",
        "/fr/contact"
      ],
      [
        "Confidentialité",
        "/fr/confidentialite"
      ]
    ]
  },
  "/de/datenschutz": {
    "lang": "de",
    "title": "Datenschutzrichtlinie | Winerim",
    "description": "Internationale Datenschutzerklärung für Winerim-Kunden, Administratoren, Besucher, Gäste und Kontakte außerhalb Spaniens.",
    "h1": "Datenschutzrichtlinie",
    "subtitle": "Verarbeitung personenbezogener Daten auf der Winerim-Plattform · Endgültige Betriebsversion – 7. Juli 2026 · Gilt für Kunden außerhalb Spaniens, sofern schriftlich nichts anderes vereinbart ist.",
    "canonical": "/de/datenschutz",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Internationaler Senior Manager",
        "Winerim LLC, Unternehmen aus Florida, Adresse 1210 Washington Ave 213, Miami Beach, FL 33139, USA"
      ],
      [
        "Marke/Plattform",
        "Winerim"
      ],
      [
        "Kontakt Datenschutz",
        "info@winerim.com"
      ],
      [
        "Umfang",
        "Kunden, Verwaltungsbenutzer, Besucher, Gäste und Kontakte außerhalb Spaniens"
      ],
      [
        "Ggf. EU-Vertreter",
        "info@winerim.com als Ansprechpartner; formeller Vertreter in der EU, sofern gesetzlich erforderlich"
      ],
      [
        "Wichtigste Vorschriften",
        "Je nach Gebiet geltende Datenschutzbestimmungen; DSGVO, sofern sie auf im EWR betroffene Personen anwendbar ist"
      ],
      [
        "Vertragliche Rücktritte",
        "Stornierungen des Dienstes werden ausschließlich über cancel@winerim.com verwaltet; Diese Richtlinie ersetzt dieses Verfahren nicht"
      ],
      [
        "1. Verantwortlich für die internationale Behandlung",
        "Der Datenverantwortliche für Kunden und Benutzer außerhalb Spaniens ist Winerim LLC, ein nach den Gesetzen des Staates Florida, Vereinigte Staaten von Amerika, gegründetes Unternehmen mit der Adresse 1210 Washington Ave 213, Miami Beach, FL 33139, USA, es sei denn, in einem Angebot, Vertrag oder einer lokalen Richtlinie wird eine andere verantwortliche Stelle angegeben.\n\nWenn Winerim Daten im Namen eines Kunden verarbeitet, ist der Kunde für die Verarbeitung verantwortlich und Winerim fungiert als Verarbeiter oder Dienstleister gemäß dem Vertrag, dem Anhang zur Verarbeitungsanordnung, den dokumentierten Anweisungen und den geltenden Vorschriften.\n\nWenn diese Richtlinie auf interessierte Parteien aus dem Europäischen Wirtschaftsraum, dem Vereinigten Königreich oder der Schweiz anwendbar ist, wendet Winerim die Rechte, Garantien und Legitimitätsgrundlagen an, die in den geltenden Vorschriften, einschließlich der DSGVO, sofern anwendbar, erforderlich sind. Wenn die Benennung eines formellen Vertreters in der Europäischen Union zwingend erforderlich ist, aktualisiert Winerim diese Richtlinie mit Ihren Daten; In der Zwischenzeit wird info@winerim.com die operative Anlaufstelle für Datenschutzanfragen sein."
      ],
      [
        "2. Für wen gilt diese Richtlinie?",
        "Diese Richtlinie gilt für Vertreter, Administratoren, Mitarbeiter, Mitarbeiter und autorisierte Benutzer professioneller Kunden; Website-Besucher; Anwendungsbenutzer; Gäste oder Endbenutzer, die digitale Speisekarten konsultieren; Geschäftskontakte; Lieferanten; Kandidaten; Personen, die den Support kontaktieren; und jede Person, deren Daten im Rahmen von Winerim verarbeitet werden.\n\nWinerim ist eine B2B-Plattform. Restaurants, Hotels oder professionelle Kunden können für bestimmte Daten verantwortlich sein, die sie auf der Plattform einbinden, verbinden oder veröffentlichen, einschließlich der Daten ihrer Mitarbeiter, Benutzer, Gäste oder Dritter."
      ],
      [
        "3. Personenbezogene Daten, die wir verarbeiten können",
        "Identifikations- und Kontaktdaten: Name, Nachname, Position, Firma, Restaurant, Hotel oder Gruppe, Geschäftsadresse, Telefonnummer, E-Mail, Benutzername, verschlüsseltes Passwort, Kontokennungen, Land und Sprache.\n\nVertrags- und Abrechnungsdaten: Unternehmen, CIF/NIF/VAT/CUIT/Steuer-ID, Steueradresse, vertraglich vereinbarter Plan, Betrag, Währung, Rechnungen, Zahlungen, Inkassostatus, tokenisierte Zahlungsmethode, von Stripe oder anderen Zahlungsanbietern verwaltete Daten, Inkassovorfälle, Rücksendungen und vertragliche Kommunikation.\n\nTechnische Daten und Nutzungsdaten: IP-Adresse, Gerät, Browser, Betriebssystem, Protokolle, Datum und Uhrzeit, Sprache, ungefährer aus IP abgeleiteter Standort, besuchte Seiten, Ereignisse, Klicks, Sitzungen, Fehler, Token, Cookie-IDs, Panel-Aktivität, Sicherheitsspuren und API-Nutzung.\n\nKonto- und Präferenzdaten: Favoriten, angesehene Weine, gespeicherte Auswahlen, Suchen, Spracheinstellungen, Interaktionen mit Empfehlungen, Kontoeinstellungen und Kommunikation.\n\nMenü- und Betriebsdaten: Weinreferenzen, Preise, Jahrgänge, Lagerbestand, Rotation, Verkäufe, Verfügbarkeit, Notizen, Paarungen, Bilder, Kategorien, Filter, Visualisierungen, kommerzielle Leistung, Metriken und Integrationsdaten, wenn der Kunde diese bereitstellt oder verbindet.\n\nSupport- und Kommunikationsdaten: E-Mails, Tickets, Nachrichten, Anhänge, Anrufe, Besprechungen, Vorfälle, Anfragen, Antworten, Supportverlauf und alle Informationen, die der Benutzer freiwillig bereitstellt.\n\nVertragliche Stornierungsdaten: an cancel@winerim.com gesendete Anfragen, Kundenidentifikation, E-Mail-Adresse des Absenders, Datum und Uhrzeit, betroffenes Abonnement, zugehörige Mitteilungen und Nachweise, die zum Nachweis des Empfangs oder des Fehlens eines gültigen Empfangs erforderlich sind.\n\nBesondere Kategorien von Daten erfragen wir nicht. Benutzer und Kunden sollten keine Daten zu Gesundheit, Weltanschauung, Religion, Gewerkschaftszugehörigkeit, Biometrie, Genetik, Sexualleben, sexueller Orientierung, Straftaten oder anderen besonders geschützten Daten bereitstellen, es sei denn, dies ist unbedingt erforderlich, es besteht eine Rechtsgrundlage und Winerim akzeptiert dies ausdrücklich."
      ],
      [
        "4. Herkunft der Daten",
        "Die Daten können direkt vom Benutzer oder Kunden stammen; der vom Kunden autorisierten Administratoren; von Zahlungsanbietern; aus vom Kunden aktivierten Integrationen wie POS, PMS, ERP, CRM oder anderen Tools; von technischen Lieferanten; aus App-Stores; Cookies und ähnliche Technologien; aus öffentlichen Quellen; und Daten, die durch die Nutzung der Plattform generiert werden.\n\nWenn der Kunde Daten Dritter in Winerim einbindet, erklärt er, dass er über eine ausreichende Rechtsgrundlage verfügt und die entsprechenden Datenschutzinformationen bereitgestellt hat."
      ],
      [
        "5. Zwecke der Behandlung",
        "Erstellen und verwalten Sie Konten, authentifizieren Sie Benutzer, verwalten Sie Berechtigungen, gewähren Sie Zugriff auf die Plattform und sorgen Sie für Sicherheit.\n\nBereitstellung der vertraglich vereinbarten Dienstleistung, einschließlich Konfiguration, Hochladen, Veröffentlichung, Visualisierung, Übersetzung, Anreicherung, Pflege, Analyse und Verwaltung digitaler Weinkarten.\n\nVerwalten Sie Registrierungen, Verlängerungen, Stornierungen, Stornierungen, Zahlungen, Abrechnung, Buchhaltung, Steuern, Retouren, Rückbuchungen, Nichtzahlungen und Vertragsbeziehungen.\n\nBieten Sie technischen und funktionalen Support, beantworten Sie Fragen, lösen Sie Vorfälle, kommunizieren Sie Änderungen, führen Sie Wartungsarbeiten durch, senden Sie Sicherheits-, Abrechnungs- oder Servicemitteilungen.\n\nAnalysieren Sie Verkäufe, Lagerbestände, Rotation, Verfügbarkeit, Interaktionen, Präferenzen, Menüleistung, Verwendung von Filtern und Nutzungsmetriken, um Panels, Empfehlungen, Warnungen, Einblicke und Managementverbesserungen anzubieten.\n\nEntwickeln, trainieren, optimieren, testen und verbessern Sie interne Systeme für Analyse, Empfehlung, Klassifizierung, Paarung, Übersetzung, Normalisierung, Fehlererkennung, Sicherheit und andere Funktionen, vorzugsweise mit aggregierten, anonymisierten oder minimierten Daten, wenn möglich.\n\nVerhindern Sie Betrug, Missbrauch, unbefugten Zugriff, Scraping, Crawling, automatisierte Extraktion, Reverse Engineering, Konkurrenznutzung, Vertragsbrüche, Sicherheitsvorfälle und Angriffe.\n\nSenden Sie Ihre eigenen kommerziellen Mitteilungen über Winerim, Neuigkeiten, Funktionalitäten, Veranstaltungen oder ähnliche Dienste, wenn eine Rechtsgrundlage vorliegt und das Recht auf Widerspruch oder Löschung respektiert wird.\n\nErfüllen Sie gesetzliche Verpflichtungen, reagieren Sie auf Behörden, bearbeiten Sie Ansprüche, sichern Sie Beweise, verteidigen Sie Rechte, verwalten Sie Prüfungen und Unternehmensabläufe."
      ],
      [
        "6. Rechtsgrundlagen bzw. Grundlagen der Behandlung",
        "Bei internationalen B2B-Beziehungen verarbeitet Winerim Daten auf der Grundlage der Vertragsabwicklung, vorvertraglicher Maßnahmen, der Einhaltung gesetzlicher Verpflichtungen, berechtigter Geschäftsinteressen, der Einwilligung bei Bedarf oder einer anderen durch geltende Vorschriften zulässigen Grundlage.\n\nWenn die DSGVO auf Interessenten aus dem Europäischen Wirtschaftsraum anwendbar ist, sind die Rechtsgrundlagen die Vertragserfüllung, die Einhaltung gesetzlicher Verpflichtungen, das berechtigte Interesse, die Einwilligung und gegebenenfalls Anweisungen des für die Verarbeitung Verantwortlichen, wenn Winerim als Auftragsverarbeiter auftritt.\n\nZu den berechtigten Interessen gehören Sicherheit, Betrugsprävention, Serviceverbesserung, interne Analyse, Support, Abwehr von Ansprüchen, B2B-Kommunikation, Schutz des geistigen Eigentums, Scraping-Erkennung, Reverse Engineering, Data Mining, API-Missbrauch und unbefugte Wettbewerbsnutzung.\n\nWenn örtliche Vorschriften eine besondere Zustimmung erfordern, wird Winerim diese einholen oder der Kunde muss sie einholen, bevor er Daten in die Plattform einfügt."
      ],
      [
        "7. Öffentliche Anzeige von Weinkarten",
        "Der wesentliche Zweck von Winerim besteht darin, Kunden die Möglichkeit zu geben, ihre Weinkarten im digitalen Format öffentlich anzuzeigen. Daher können Menüdaten wie Referenzen, Preise, Jahrgänge, Bilder, Beschreibungen, Paarungen, Kategorien und Verfügbarkeit für Gäste, Besucher, Suchmaschinen und technische Dritte, die für den Betrieb des Internets erforderlich sind, öffentlich sichtbar sein.\n\nDiese Informationen sind grundsätzlich geschäftlicher oder gewerblicher Natur. Wenn der Kunde in einem Brief personenbezogene Daten angibt, ist er dafür verantwortlich, eine Rechtsgrundlage zu haben und die Veröffentlichung unnötiger oder unbefugter personenbezogener Daten zu vermeiden."
      ],
      [
        "8. Verkaufsdaten, Lagerbestände, Analysen und Benchmarking",
        "Winerim kann Verkaufsdaten, Lagerbestände, Rotation, Verfügbarkeit, Interaktionen, Filter, Visualisierungen, Präferenzen und kommerzielle Leistung verarbeiten, um den Service bereitzustellen, dem Kunden Analysen anzuzeigen, Empfehlungen zu generieren, Funktionen zu verbessern, Fehler zu erkennen und Business Intelligence anzubieten.\n\nWinerim kann aggregierte, anonymisierte oder dissoziierte Daten für Branchenanalysen, Benchmarking, interne oder externe Berichte, Marktinformationen, Modellschulungen, Produktverbesserungen, kommerzielle Studien und die Entwicklung neuer Funktionen verwenden.\n\nWinerim wird keine personenbezogenen Daten verkaufen. Es werden auch keine individuellen Daten zu Verkäufen, Lagerbeständen, Margen oder der wirtschaftlichen Leistung eines Kunden veröffentlicht, die ihn ohne Genehmigung oder gesetzliche Notwendigkeit direkt identifizieren.\n\nDiese Richtlinie gewährt dem Kunden, autorisierten Benutzern oder Dritten kein Recht zum Extrahieren, Kopieren, Verkaufen, Weiterverkaufen, Lizenzieren, Abtreten, Übertragen, Veröffentlichen, Vermarkten, Trainieren von Modellen, Feed-Datenbanken, Scrapen oder Verwerten von Winerim-Daten, Inhalten, Metriken, Empfehlungen, Taxonomien, Datensätzen, Bildern, Beschreibungen oder Vermögenswerten außerhalb der in den Bedingungen erlaubten Nutzung."
      ],
      [
        "9. Künstliche Intelligenz und automatisierte Entscheidungen",
        "Winerim kann automatisierte oder künstliche Intelligenzsysteme verwenden, um Weine zu klassifizieren, Daten anzureichern, Beschreibungen zu erstellen, zu übersetzen, Paarungen zu erstellen, Ergebnisse zu sortieren, Weine zu empfehlen, Anomalien zu erkennen, die Suche zu verbessern und Funktionen zu optimieren.\n\nDiese Funktionalitäten sind unterstützend und können Fehler verursachen. Sie haben keine rechtlichen Entscheidungen oder wesentlich ähnliche Auswirkungen auf natürliche Personen im engeren Sinne der DSGVO, sofern in einer bestimmten Funktionalität nicht ausdrücklich etwas anderes angegeben ist.\n\nWenn personenbezogene Daten in automatisierten Systemen verwendet werden, wird Winerim sich bemühen, soweit möglich und verhältnismäßig, Minimierung, Pseudonymisierung, Anonymisierung oder Aggregation anzuwenden.\n\nDer Kunde darf Winerim-Daten oder -Ausgaben nicht verwenden, um externe Modelle zu trainieren oder konkurrierende Lösungen gemäß den Bedingungen zu entwickeln."
      ],
      [
        "10. Empfänger, Lieferanten und Unterauftragsverarbeiter",
        "Wir können Daten mit Anbietern teilen, die Dienstleistungen für Winerim bereitstellen, einschließlich Cloud-Hosting, Speicherung, Sicherheit, Überwachung, E-Mail, Support, Analysen, Zahlungen, Abrechnung, künstliche Intelligenz, Übersetzung, Integration, interne Tools, professionelle Berater und Anwendungsspeicher.\n\nStripe oder andere Zahlungsanbieter können Daten, die für Zahlungen, Abonnements, Abrechnung, Betrugsprävention, finanzielle Compliance und regulatorische Verpflichtungen erforderlich sind, gemäß ihren eigenen Bedingungen und Richtlinien verarbeiten.\n\nApple, Google oder App-Store-Betreiber können Daten verarbeiten, wenn der Benutzer mobile Anwendungen aus ihren Umgebungen herunterlädt oder nutzt.\n\nWir können Daten auch an Behörden, Gerichte, öffentliche Verwaltungen, Sicherheitskräfte, Berater, potenzielle Käufer oder Dritte übermitteln, wenn eine gesetzliche Verpflichtung, eine berechtigte Anforderung, die Verteidigung von Rechten, der Unternehmensbetrieb oder ein ausreichendes berechtigtes Interesse besteht.\n\nDie spezifische Liste der relevanten Lieferanten und Unterauftragsverarbeiter muss auf dem neuesten Stand gehalten und auf begründete Anfrage oder auf einer bestimmten Winerim-Seite zur Verfügung gestellt werden."
      ],
      [
        "11. Internationale Transfers und Behandlung aus den Vereinigten Staaten",
        "Winerim LLC hat seinen Sitz in den Vereinigten Staaten, sodass die Daten möglicherweise von den Vereinigten Staaten und anderen Ländern, in denen Winerim-Lieferanten tätig sind, verarbeitet, gespeichert oder zugänglich sind.\n\nWenn die Verarbeitung der DSGVO oder anderen Vorschriften unterliegt, die internationale Übermittlungen einschränken, wendet Winerim geeignete Garantien an, wie z. B. Standardvertragsklauseln, Angemessenheitsentscheidungen, ergänzende Maßnahmen, Lieferantenverträge oder rechtsgültige gleichwertige Mechanismen.\n\nDer Kunde erkennt an, dass die Nutzung eines internationalen SaaS-Dienstes grenzüberschreitende Übertragungen, Fernzugriff, Cloud-Anbieter, Zahlungen, Support, Sicherheit, Analysen und künstliche Intelligenz in verschiedenen Gerichtsbarkeiten umfassen kann."
      ],
      [
        "12. Datenaufbewahrung",
        "Die Konto- und Vertragsdaten werden so lange aufbewahrt, wie ein Vertragsverhältnis besteht und anschließend für die Zeiträume, die für Rechts-, Buchhaltungs-, Steuerkonformitäts-, Anspruchsabwehr-, Revisions-, Sicherheits- und Verantwortlichkeitszwecke erforderlich sind.\n\nAbrechnungsdaten werden für die gemäß den geltenden Steuer-, Handels- und Buchhaltungsvorschriften erforderlichen Zeiträume aufbewahrt.\n\nStornierungsanträge, Vertragsmitteilungen und damit verbundene Nachweise werden für den Zeitraum aufbewahrt, der für die Bearbeitung der Stornierung, den Nachweis des Erhalts bzw. Fehlens eines gültigen Empfangs, die Abwehr von Ansprüchen und die Einhaltung gesetzlicher Verpflichtungen erforderlich ist.\n\nDie unterstützenden Daten werden für die zur Bearbeitung der Anfrage oder des Vorfalls erforderliche Zeit und anschließend für einen angemessenen Zeitraum zur Überwachung, Qualität, Sicherheit und Abwehr von Ansprüchen aufbewahrt.\n\nTechnische Daten, Protokolle und Sicherheitsdaten werden für den vorgesehenen Zeitraum zum Zweck der Sicherheit, Diagnose, Betrugsprävention, Erkennung von Scraping, Missbrauch, Reverse Engineering und Serviceverbesserung aufbewahrt.\n\nBrief-, Lager-, Verkaufs- und Betriebsdaten werden aufbewahrt, solange das Konto aktiv ist, und für einen angemessenen Zeitraum danach für den Export, die Wiederherstellung, den Support, Sicherungskopien, die Einhaltung gesetzlicher Vorschriften und die Verteidigung von Rechten.\n\nAggregierte, anonymisierte oder dissoziierte Daten können auf unbestimmte Zeit aufbewahrt werden, da sie keine angemessene Identifizierung einer natürlichen Person ermöglichen."
      ],
      [
        "13. Datenschutzrechte",
        "Interessierte Personen können die Rechte ausüben, die durch die in ihrem Zuständigkeitsbereich geltenden Vorschriften anerkannt werden. Soweit die DSGVO gilt, umfassen diese Rechte Zugriff, Berichtigung, Löschung, Widerspruch, Einschränkung, Übertragbarkeit und Widerruf der Einwilligung.\n\nJe nach Land bzw. Bundesstaat können darüber hinaus Rechte auf Auskunft, Berichtigung, Löschung, Ausschluss des Verkaufs oder der Weitergabe, Einschränkung bestimmter Nutzungen, Berufung oder Beschwerde bei zuständigen Behörden bestehen.\n\nUm Ihre Rechte auszuüben, müssen Sie sich an info@winerim.com wenden und dabei das Recht, das Sie ausüben möchten, das Land Ihres Wohnsitzes und ausreichende Daten zur Identifizierung der Anfrage angeben. Winerim kann zusätzliche Informationen anfordern, um die Identität oder Vertretung zu überprüfen.\n\nWenn sich die Anfrage auf Daten bezieht, die im Auftrag eines Kunden verarbeitet werden, kann Winerim die Anfrage an den Kunden weiterleiten oder gemäß seinen Anweisungen handeln.\n\nInteressenten aus dem Europäischen Wirtschaftsraum können sich hierzu an die zuständige Kontrollbehörde wenden. Wenn es einen offiziell benannten europäischen Vertreter gibt, werden dessen Einzelheiten in dieser Richtlinie angegeben; In der Zwischenzeit wird info@winerim.com die operative Anlaufstelle für Datenschutzanfragen sein."
      ],
      [
        "14. Cookies und ähnliche Technologien",
        "Winerim verwendet derzeit keine eigenen Analyse-, Werbe- oder Marketing-Cookies. Die Plattform kann ihre eigenen technischen Cookies verwenden, die für die Authentifizierung, Sitzung, Sicherheit, Missbrauchsprävention und den normalen Betrieb des Dienstes unbedingt erforderlich sind. Für Zahlungen nutzt Winerim Stripe als Drittanbieter, der möglicherweise Cookies und ähnliche Technologien installiert oder verwendet, die für die Zahlungsabwicklung, die Verwaltung von Abonnements, die Betrugsprävention, die Verbesserung der Sicherheit und die Erfüllung finanzieller oder regulatorischer Verpflichtungen erforderlich sind.\n\nWenn Winerim in Zukunft nicht erforderliche Cookies wie Analyse-, Werbe-, Mess- oder nicht erforderliche Personalisierungscookies einbindet, wird der Benutzer darüber informiert und der Akzeptanz-, Ablehnungs- oder Konfigurationsmechanismus wird aktiviert, sofern dies gesetzlich zulässig ist. Die Ablehnung nicht notwendiger Cookies verhindert nicht die grundlegende Nutzung des Dienstes, wenn solche Cookies nicht unbedingt erforderlich sind."
      ],
      [
        "15. Kommerzielle Kommunikation",
        "Winerim kann Mitteilungen zu Service, Sicherheit, Abrechnung, Vertragsänderungen, Wartung, Vorfällen oder Kontobetrieb senden, soweit dies für die Vertragsbeziehung erforderlich ist.\n\nWinerim kann eigene kommerzielle Mitteilungen über ähnliche Dienste, neue Funktionen, Inhalte, Ereignisse oder Neuigkeiten versenden, sofern eine Rechtsgrundlage vorliegt. Der Empfänger kann mithilfe der in jeder Mitteilung angegebenen Mechanismen Widerspruch einlegen oder sich abmelden.\n\nDie Löschung kommerzieller Kommunikation bedeutet nicht die Kündigung des Dienstes. Eine vertragliche Kündigung ist nur gültig, wenn sie gemäß den Bedingungen per E-Mail an cancel@winerim.com beantragt wird."
      ],
      [
        "16. Sicherheit und Vertraulichkeit",
        "Winerim wird angemessene technische und organisatorische Maßnahmen ergreifen, um personenbezogene Daten vor unbefugtem Zugriff, Änderung, Verlust, Zerstörung, Offenlegung oder Missbrauch zu schützen.\n\nZu diesen Maßnahmen können Zugriffskontrolle, Rollen, Authentifizierung, ggf. Verschlüsselung, Backups, Überwachung, Protokollierung, Vorfallmanagement, vertragliche Vertraulichkeit, Lieferantenüberprüfung und angemessene Kontinuitätsmaßnahmen gehören.\n\nKein System ist vollkommen sicher. Kunden und Benutzer müssen ihre Anmeldedaten schützen, sichere Passwörter verwenden, Berechtigungen einschränken und Vorfälle oder unbefugten Zugriff melden."
      ],
      [
        "17. Minderjährige",
        "Winerim ist ein professioneller B2B-Dienst und richtet sich nicht an Minderjährige. Wir fordern wissentlich keine Daten von Minderjährigen an.\n\nDer Kunde ist für die Einhaltung der geltenden Vorschriften beim Zugang von Gästen oder minderjährigen Endverbrauchern zu öffentlichen Speisekarten verantwortlich, insbesondere in Bezug auf alkoholische Getränke, Werbung, Mindestalter und verantwortungsvollen Konsum."
      ],
      [
        "18. Verantwortung des Kunden für die eingebundenen Daten",
        "Der Kunde ist für die personenbezogenen Daten verantwortlich, die er in Winerim einbinden, verbinden oder veröffentlichen möchte, einschließlich Daten von Mitarbeitern, Mitarbeitern, Lieferanten, Gästen, Bildern, Kommentaren, Notizen oder Informationen von Dritten.\n\nDer Kunde muss gegebenenfalls betroffene Personen informieren, erforderliche Einwilligungen einholen, Rechtsgrundlagen schaffen, auf Rechteanfragen reagieren und die Einbeziehung unnötiger oder besonders geschützter Daten vermeiden.\n\nWinerim kann Daten löschen, sperren oder den Widerruf verlangen, wenn Anhaltspunkte für Rechtswidrigkeit, Überschreitung, Rechtsverletzung, Sicherheitsrisiko oder Vertragsbruch vorliegen."
      ],
      [
        "19. Nichtverkauf personenbezogener Daten und Datennutzungsbeschränkungen",
        "Winerim verkauft keine personenbezogenen Daten im üblichen Sinne der Übertragung identifizierbarer Daten gegen Geld.\n\nWinerim kann nicht personenbezogene Daten, die von der Plattform aggregiert, anonymisiert, dissoziiert oder generiert werden, für Verbesserungen, Analysen, Benchmarking, KI, Produkt-, Sicherheits- und Geschäftszwecke gemäß den Bedingungen und dieser Richtlinie nutzen.\n\nKunden, Benutzer oder Dritte dürfen Winerim-Daten oder -Assets nicht extrahieren, weiterverkaufen, lizenzieren, übertragen, monetarisieren oder für ihre eigenen Produkte, Dritte, externe KI, Beratung, Vergleicher, Kataloge oder konkurrierende Lösungen verwenden."
      ],
      [
        "20. Änderungen dieser Richtlinie",
        "Winerim kann diese Richtlinie aktualisieren, um rechtliche, technische, betriebliche Änderungen, Lieferanten, Funktionalitäten, Behandlungen, Unternehmensstruktur oder Geschäftsmodell widerzuspiegeln.\n\nWenn Änderungen relevant sind, wird Winerim versuchen, diese per E-Mail, Plattform, Website oder auf andere angemessene Weise mitzuteilen. Die weitere Nutzung der Plattform nach dem Update setzt die Kenntnis der aktuellen Version voraus, unbeschadet der gesetzlich geltenden Rechte."
      ],
      [
        "21. Kontakt",
        "Für Privatsphäre und Datenschutz: info@winerim.com.\n\nFür regelmäßigen Support: info@winerim.com.\n\nFür vertragliche Stornierungen des Dienstes: ausschließlich cancel@winerim.com, gemäß den Allgemeinen Geschäftsbedingungen."
      ]
    ],
    "links": [
      [
        "Startseite",
        "/de"
      ],
      [
        "Produkt",
        "/de/weinkarten-software"
      ],
      [
        "Demo",
        "/de/demo"
      ],
      [
        "Kontakt",
        "/de/kontakt"
      ],
      [
        "AGB",
        "/de/agb"
      ]
    ]
  },
  "/de/agb": {
    "lang": "de",
    "title": "Vertrags- und Nutzungsbedingungen SaaS | Winerim",
    "description": "Internationale SaaS-Vertrags- und Nutzungsbedingungen für Winerim-Kunden außerhalb Spaniens.",
    "h1": "Vertrags- und Nutzungsbedingungen SaaS",
    "subtitle": "Integrierter B2B-SaaS-Vertrag für professionelle Winerim-Kunden · Endgültige Betriebsversion – 7. Juli 2026 · Gilt für Kunden außerhalb Spaniens, sofern schriftlich nichts anderes vereinbart ist.",
    "canonical": "/de/agb",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Dokument",
        "Internationale Geschäftsbedingungen / Internationale Geschäftsbedingungen mit integriertem SaaS-Vertrag"
      ],
      [
        "Umfang",
        "Kunden mit Sitz außerhalb Spaniens, sofern nicht schriftlich etwas anderes vereinbart wurde"
      ],
      [
        "Anbieter und Abrechnung",
        "Winerim LLC, ein nach dem Recht des Staates Florida gegründetes Unternehmen mit der Adresse 1210 Washington Ave 213, Miami Beach, FL 33139, USA"
      ],
      [
        "Marke",
        "Winerim"
      ],
      [
        "Natur",
        "B2B-SaaS-Service für Gastgewerbe, Restaurants, Hotels und Berufsgruppen"
      ],
      [
        "Vertragliche Rücktritte",
        "Nur per E-Mail an cancel@winerim.com 15 Kalendertage im Voraus"
      ],
      [
        "Allgemeiner Kontakt",
        "info@winerim.com"
      ],
      [
        "Recht und Gerichtsbarkeit",
        "Gesetze des Staates Florida; Landes- oder Bundesgerichte in Miami-Dade County, Florida, mit Ausnahme der zwingenden Regelung"
      ],
      [
        "1. Angabe des Anbieters und Geltungsbereich der internationalen Anwendbarkeit",
        "Diese internationalen Allgemeinen Geschäftsbedingungen regeln den Vertragsabschluss, den Zugriff und die professionelle Nutzung von Winerim außerhalb Spaniens, einschließlich seiner Web- und Mobilanwendungen, Bedienfelder, digitalen Menüs, Verwaltungsmodule, Integrationen, APIs, Analysefunktionen, künstlichen Intelligenz, Support und zugehörigen Dienste.\n\nFür Kunden mit Sitz außerhalb Spaniens ist Winerim LLC, ein nach den Gesetzen des Bundesstaates Florida, Vereinigte Staaten von Amerika, gegründetes Unternehmen mit Sitz in 1210 Washington Ave 213, Miami Beach, FL 33139, USA, Vertragsanbieter und Rechnungsaussteller, es sei denn, in einem Angebot, einer Bestellung, einer Rechnung oder einem bestimmten Vertrag ist ausdrücklich ein anderer Anbieter angegeben.\n\nDer Kunde ist die natürliche oder juristische Person, die die Dienstleistung als Unternehmer, Freiberufler, Unternehmen, Restaurant, Hotel, Gastgewerbegruppe, touristische Einrichtung, Verein, Händler oder gleichwertige Einrichtung in Anspruch nimmt, im Folgenden „Kunde“ genannt."
      ],
      [
        "2. Professioneller Charakter der Dienstleistung",
        "Winerim ist eine B2B-SaaS-Plattform, die auf die Digitalisierung, Verwaltung, Analyse und kommerzielle Nutzung von Weinkarten, Weingütern, Lagerbeständen, Verkaufsdaten und Serviceerfahrungen im Gastgewerbe abzielt.\n\nDer Kunde erklärt, dass er den Vertrag mit Winerim im Rahmen seiner beruflichen oder geschäftlichen Tätigkeit und nicht als Verbraucher oder Endverbraucher abschließt. Die Plattform ist nicht für den Abschluss von Verträgen durch Verbraucher zu bestimmten Zwecken bestimmt.\n\nGäste, Besucher oder Endnutzer, die eine digitale Speisekarte des Kunden konsultieren, erwerben dadurch nicht den Status eines direkten Vertragskunden von Winerim, es sei denn, sie erstellen ein eigenes Konto, nutzen eigenständige Funktionalitäten oder akzeptieren zusätzliche spezifische Bedingungen."
      ],
      [
        "3. Vertragsgegenstand und Einbindung des SaaS-Vertrages",
        "Diese Bedingungen stellen die geltende SaaS-Vereinbarung zwischen Winerim und dem Kunden dar. Es gibt keinen separaten SaaS-Vertrag, es sei denn, die Parteien unterzeichnen besondere Bedingungen, einen Serviceauftrag, ein Angebot, eine Bestellung, einen Nachtrag oder eine spezifische Vereinbarung.\n\nDer Vertrag gewährt dem Kunden eine beschränkte, bei Nichteinhaltung widerrufbare, nicht ausschließliche, nicht unterlizenzierbare, nicht übertragbare und entgeltpflichtige Lizenz für den Zugang und die Nutzung der Plattform während der Laufzeit des Vertragsverhältnisses und nur für die zulässige Nutzung.\n\nDie Lizenz bedeutet nicht den Verkauf, die Abtretung, die Übertragung oder den Erwerb des Eigentums an Software, Code, Daten, Datenbanken, Dokumentation, Bildern, Taxonomien, Fingerabdrücken, Regeln, Algorithmen, Modellen, Empfehlungen, Erkenntnissen, Schnittstellen, Designs, Know-how oder anderen Winerim-Vermögenswerten."
      ],
      [
        "4. Abnahme und Vertragsunterlagen",
        "Die Annahme dieser Bedingungen kann durch handschriftliche oder elektronische Unterschrift, Annahme im Registrierungsprozess, E-Mail-Bestätigung, Abonnementzahlung, effektive Nutzung der Plattform, Angebotsannahme oder jede andere eindeutige Vertragshandlung erfolgen.\n\nDer Vertragsabschluss setzt die Annahme dieser Bedingungen, der Datenschutzrichtlinie, der Cookies-Richtlinie (falls zutreffend), des Anhangs zur Verarbeitungsanordnung, des Vertragsformulars, des Budgets, des Plans, der Bestellung, der Rechnung oder der akzeptierten besonderen Bedingungen voraus.\n\nIm Falle eines Widerspruchs zwischen diesen Bedingungen und einer bestimmten, von beiden Parteien ausdrücklich unterzeichneten oder akzeptierten Bedingung hat die bestimmte Bedingung nur in Bezug auf den konkret geregelten Punkt Vorrang."
      ],
      [
        "5. Wesentliche Definitionen",
        "Plattform bezeichnet den Satz von Webanwendungen, mobilen Anwendungen, Bedienfeldern, Datenbanken, APIs, Modulen, Diensten, Designs, Dokumentationen, Funktionalitäten und Systemen, die unter der Marke Winerim angeboten werden.\n\nMenüdaten sind alle Informationen im Zusammenhang mit der Weinkarte des Kunden, einschließlich Referenzen, Jahrgänge, Preise, Appellationen, Regionen, Länder, Weingüter, Trauben, Formate, Bilder, Beschreibungen, Verkostungsnotizen, Paarungen, Verfügbarkeit, Kategorien, Etiketten, Sprachen, Empfehlungen, Favoriten, Reihenfolge der Präsentation und alle gleichwertigen Daten.\n\nBetriebsdaten sind Daten zu Lagerbeständen, Verkäufen, Rotation, Verbrauch, Margen, Verfügbarkeit, Geschichte, Weinkellereibewegungen, kommerzieller Leistung, Interaktionen, Verwendung von Filtern, Ansichten, Klicks, Reservierungen oder Bestellungen, sofern vorhanden, Integrationen mit Dritten und alle Informationen im Zusammenhang mit der Verwaltung oder Nutzung der Weinkarte.\n\nUnter Kundeninhalten versteht man vom Kunden bereitgestellte Logos, Marken, Bilder, Texte, Briefe, Preise, Materialien, Geschäftsdaten und Informationen.\n\nWinerim-Inhalte sind Software, Code, Architektur, Design, Schnittstelle, Datenbanken, Wein-Fingerabdrücke, Bilder, Beschreibungen, Übersetzungen, Empfehlungen, Taxonomien, umfangreiche Daten, Modelle, Regeln, Algorithmen, Dokumentation, Texte, Know-how, Metriken, Benchmarks, Erkenntnisse, Schulungsmaterialien und alle von Winerim erstellten, lizenzierten, normalisierten oder integrierten Vermögenswerte.\n\nWinerim-Daten und -Assets bezeichnet zusätzlich zum Winerim-Inhalt alle Datensätze, Datenstrukturen, Taxonomien, Normalisierungen, Klassifizierungen, Anreicherungen, Datenbeziehungen, Modelle, Nutzungsmuster, Rankings, Empfehlungen, Metriken, Berichte, Benchmarks, analytischen Signale oder Kenntnisse, die von Winerim generiert oder verarbeitet werden.\n\nZulässige Nutzung bedeutet die interne, professionelle und gewöhnliche Nutzung der Plattform durch den Kunden zur Verwaltung, Ansicht und Nutzung seiner eigenen Weinkarte innerhalb der Einrichtung, Gruppe oder des Vertragskontos, ohne Extraktion, Übertragung, Weiterverkauf, Wettbewerbsnutzung oder externe Nutzung von Winerim-Vermögenswerten."
      ],
      [
        "6. Allgemeiner Leistungsumfang",
        "Winerim ermöglicht dem Kunden die digitale Erstellung, Verwaltung, Visualisierung, Nutzung und Analyse seiner Weinkarte und der mit seinem Weingut, seinem Lagerbestand und seinem Zimmerservice verbundenen Informationen.\n\nSofern im vertraglich vereinbarten Plan nichts anderes angegeben ist, kann der Service die Registrierung des Kunden, die Erstkonfiguration, das Erstladen des bereitgestellten Menüs, ein personalisiertes digitales Menü, einen Web- oder QR-Link, eine herunterladbare Anwendung, sofern verfügbar, ein Bedienfeld, Anzeigeformate, Filter, Favoriten, Empfehlungen, Auswahl, Mehrsprachigkeit, Aktivierung und Deaktivierung von Weinen, Änderung von Preisen, Trauben, Jahrgängen, Paarungen, Beschreibungen und Verkostungsnotizen, die Anforderung neuer Referenzen, Analysen und gewöhnlichen Support umfassen.\n\nDer vordere Teil der digitalen Speisekarte kann von Gästen ohne zusätzliche direkte Kosten eingesehen werden, unbeschadet der vom Kunden an Winerim gezahlten Preise.\n\nDas Menü kann öffentlich und von überall aus zugänglich sein, ohne dass der Endbenutzer physisch in der Einrichtung sein muss, es sei denn, der Kunde wünscht eine andere Konfiguration und wird von Winerim technisch akzeptiert."
      ],
      [
        "7. Leistungen nicht inbegriffen, sofern nicht ausdrücklich vereinbart",
        "Sofern nicht ausdrücklich schriftlich vereinbart, sind kundenspezifische Entwicklungen, Integrationen mit POS-, PMS-, ERP-, CRM- oder anderen Systemen, komplexe Migrationen, erweiterte Datenbereinigung, professionelle Fotografie, Drucken von QR-Codes oder physischem Material, persönliche Schulungen, strategische Beratung, Lagerprüfung, operative Lagerverwaltung im Namen des Kunden, Support außerhalb der Geschäftszeiten, spezifische SLA, private APIs, personalisierte KI-Modelle, von Menschen überprüfte professionelle Übersetzungen, erweiterte Markenanpassung oder Funktionalitäten, die nicht im vertraglich vereinbarten Plan beschrieben sind, nicht enthalten.\n\nWinerim kann zusätzliche Dienstleistungen durch ein Angebot, eine Bestellung, einen Anhang oder einen spezifischen Vertrag anbieten. Durch Ihren Vertrag werden diese Bedingungen nicht automatisch geändert, es sei denn, dies ist ausdrücklich angegeben."
      ],
      [
        "8. Registrierung, Durchführung und Mitarbeit des Auftraggebers",
        "Der Kunde muss Winerim in einem angemessen verwendbaren Format alle für die Umsetzung erforderlichen Informationen zur Verfügung stellen: Weinkarte, Preise, Jahrgänge, Lagerbestand, Bilder, Logos, Steuerdaten, Kontaktinformationen, Zugang oder jedes andere notwendige Material.\n\nDer Kunde ist für die Richtigkeit, Genauigkeit, Aktualisierung und Rechtmäßigkeit der Inhalte und Daten verantwortlich, die in Winerim geliefert, hochgeladen, geändert oder gepflegt werden.\n\nDie Aktivierungs- bzw. Ladefristen beginnen mit dem vollständigen Eingang der erforderlichen Informationen und ggf. der Anzahlung zu laufen. Bei den Betriebszeiten handelt es sich um angemessene Schätzungen, es sei denn, sie werden ausdrücklich schriftlich garantiert.\n\nWinerim kann Bilder, technische Datenblätter, Weingutdaten, Jahrgänge, Preise oder andere Informationen anfordern, die zur Erstellung, Vervollständigung, Korrektur oder Bereicherung von Referenzen ohne digitalen Fußabdruck oder mit unzureichenden Informationen erforderlich sind."
      ],
      [
        "9. Nutzungslizenz und Beschränkungen",
        "Der Kunde erhält eine beschränkte Lizenz zur Nutzung der Plattform nur während der Laufzeit des Vertragsverhältnisses für seine eigene berufliche Tätigkeit gemäß dem vertraglich vereinbarten Plan und der zulässigen Nutzung.\n\nDie Lizenz wird pro Konto, Einrichtung, Gruppe, Gebiet, Anzahl der Benutzer, Module, Funktionalitäten oder Nutzungsbeschränkungen gewährt, die im Vertragsformular oder im vertraglich vereinbarten Plan angegeben sind.\n\nDer Kunde darf ohne vorherige schriftliche Zustimmung von Winerim keine Unterlizenzen vergeben, abtreten, vermieten, verkaufen, weiterverkaufen, Dritten zur Verfügung stellen, als Dienstleistung verwerten, im Auftrag Dritter tätig werden, auf Winerim basierende Beratungsleistungen erbringen oder unbefugten Dritten Zugriff gewähren."
      ],
      [
        "10. Wesentliche Verbote: Reverse Engineering, Datenextraktion und -ausbeutung",
        "Dem Kunden ist es nicht gestattet, direkt oder indirekt Reverse Engineering, Dekompilierung, Disassemblierung, Codeanalyse, Architekturanalyse, unbefugte technische Prüfung, Scanning, Penetrationstests, Schwachstellenausnutzung, Logikkopie, Flusskopie, Schnittstellenkopie, Datenstrukturkopie oder andere Maßnahmen, die darauf abzielen, Winerim zu verstehen, zu replizieren, zu ersetzen oder mit Winerim zu konkurrieren, direkt oder indirekt durchzuführen, zuzulassen, zu erleichtern, in Auftrag zu geben oder dies zu versuchen.\n\nEs ist untersagt, Daten, Inhalte, Bilder, Dateien, Taxonomien, Strukturen, Etiketten, Klassifizierungen, Fingerabdrücke, Metriken, Erkenntnisse, Empfehlungen oder Dokumentationen von Winerim herunterzuladen, zu extrahieren, zu kopieren, zu indizieren, zu abbauen, zu synchronisieren, systematisch zu fotografieren, massenhaft zu erfassen, zu scrapen, zu crawlen, zu ernten, Daten zu sammeln, API-Missbrauch zu nutzen, automatisierte Abfragen durchzuführen oder sich massiv oder unbefugt zu beschaffen.\n\nEs ist verboten, Winerim-Daten und -Assets, Winerim-Inhalte, angereicherte Daten, Benchmarks, Datensätze, Empfehlungen, Modelle, Regeln, Algorithmen, Know-how, Berichte, Ausgaben oder Ergebnisse, die von der Plattform außerhalb der zulässigen Nutzung generiert werden, zu verkaufen, weiterzuverkaufen, zu lizenzieren, zu vermieten, abzutreten, zu übertragen, zu veröffentlichen, weiterzuverbreiten, zu monetarisieren, zu vermarkten oder in irgendeiner Weise zu verwerten.\n\nEs ist untersagt, Winerim, seinen Inhalt oder seine Daten zu verwenden, um eigene Datenbanken oder Datenbanken Dritter zu speisen, Systeme der künstlichen Intelligenz zu trainieren, anzupassen, zu bewerten oder zu verbessern, Komparatoren, Marktplätze, Suchmaschinen, Kataloge, Empfehlungssysteme, Weinmanagementlösungen, Analysetools, Beratungsdienste, Branchenberichte oder Konkurrenzprodukte zu erstellen.\n\nDer Kunde darf direkten oder indirekten Konkurrenten von Winerim oder Dritten, die konkurrierende Lösungen entwickeln, vermarkten, beraten oder in sie investieren, keinen Zugriff auf die Plattform, Demos, Panels, Dokumentationen, Screenshots, Konfigurationen, Vorschläge, Materialien oder Daten gestatten oder in sie investieren, es sei denn, Winerim hat zuvor eine schriftliche Genehmigung erteilt.\n\nDie technische Möglichkeit, Informationen anzuzeigen, herunterzuladen, zu exportieren, zu kopieren oder darauf zuzugreifen, stellt keine rechtliche Genehmigung für deren Extraktion, Wiederverwendung, Verkauf, Übertragung, KI-Schulung, Monetarisierung oder Nutzung außerhalb der zulässigen Nutzung dar.\n\nDie Nichteinhaltung dieser Klausel gilt als schwerwiegender Verstoß und kann eine sofortige Aussetzung, Vertragskündigung, Sperrung des Zugangs, Entfernung oder Zerstörung von Materialien, Schadensersatz und die Einleitung rechtlicher Schritte rechtfertigen."
      ],
      [
        "11. Daten und Vermögenswerte von Winerim",
        "Winerim behält alle Rechte an Ihren Winerim-Daten und -Assets, einschließlich Datensätzen, Taxonomien, Wein-Fingerprints, Normalisierungsregeln, Klassifizierungen, Modellen, Mustern, Benchmarks, Empfehlungen, Übersetzungen, Beschreibungen, Bildern, Dokumentationen, Schnittstellen, Metriken, Erkenntnissen und allen von Winerim generierten Anreicherungen.\n\nDer Kunde erkennt an, dass die Investition von Winerim in die Erstellung, Normalisierung, Kuratierung, Strukturierung und Nutzung von Daten einen wesentlichen Vermögenswert darstellt, der vertraglich und gesetzlich geschützt ist, einschließlich gegebenenfalls geistiger Eigentumsrechte, Datenbankrechte, Geschäftsgeheimnisse und unlauterem Wettbewerb.\n\nKeine von Winerim generierten Daten, Bildschirme, Berichte, Exporte, Empfehlungen, Einblicke oder Ergebnisse dürfen vom Kunden für andere Zwecke als die interne Verwaltung seines Menüs und der vertraglich vereinbarten Dienstleistung verwendet werden."
      ],
      [
        "12. Kundeninhalte",
        "Der Kunde behält das Eigentum an seinen Marken, Logos, eigenen Bildern, Briefen, Preisen, kommerziellen Daten und anderen Originalinhalten, die er auf der Plattform einbringt, sofern er tatsächlich sein Eigentum ist oder über ausreichende Rechte verfügt.\n\nDer Kunde gewährt Winerim eine weltweite, nicht ausschließliche, kostenlose und an technische Anbieter unterlizenzierbare Lizenz, während der Laufzeit des Dienstes und für die danach zur Einhaltung gesetzlicher Vorschriften, Support, Sicherungskopien und Verteidigung von Rechten erforderliche Zeit diese Inhalte zu hosten, zu reproduzieren, technisch anzupassen, zu übersetzen, zu normalisieren, anzureichern, anzuzeigen, öffentlich zu kommunizieren und zu verarbeiten, soweit dies zur Bereitstellung, Verbesserung und zum Schutz des Dienstes erforderlich ist.\n\nDer Kunde gewährleistet, dass er über ausreichende Rechte an den von ihm bereitgestellten Bildern, Logos, Texten, Daten, Dateien, Preisen und Materialien verfügt. Winerim haftet nicht für Ansprüche Dritter, die sich aus den vom Kunden bereitgestellten Inhalten ergeben."
      ],
      [
        "13. Nutzung und öffentliche Darstellung von Weinkarten",
        "Der Kunde ermächtigt Winerim ausdrücklich, die Weinkarte des Kunden und seine Menüdaten über die mit dem Dienst verbundene Plattform, Website, App, Links, QR-Codes, Widgets, Integrationen und Kanäle anzuzeigen und Endbenutzern zur Verfügung zu stellen.\n\nDiese Genehmigung umfasst Namen von Weinen, Weingütern, Regionen, Appellationen, Trauben, Jahrgängen, Preisen, Formaten, Bildern, Beschreibungen, Verkostungsnotizen, Paarungen, Etiketten, Kategorien, Sprachen, Verfügbarkeit, Empfehlungen und alle Informationen, die Teil der digitalen Speisekarte sind.\n\nDer Kunde erkennt an, dass die öffentliche Anzeige der Speisekarte ein wesentlicher Bestandteil des Dienstes ist und dass die enthaltenen Informationen für Gäste, Suchmaschinen, Browser, Cache-Systeme, Netzwerke oder technische Dritte im Rahmen des Internetbetriebs zugänglich sein können, es sei denn, Winerim akzeptiert eine andere Konfiguration.\n\nDer Kunde ist dafür verantwortlich, dass Preise, Jahrgänge, Verfügbarkeit, Werbeaktionen, Bilder, Rechte Dritter und andere veröffentlichte Informationen korrekt, rechtmäßig und aktuell sind."
      ],
      [
        "14. Verkaufs-, Lager-, Umsatz- und Analysedaten",
        "Der Kunde ermächtigt Winerim, Betriebsdaten in Bezug auf Menü, Verkäufe, Lagerbestände, Rotation, Verbrauch, Margen, Verfügbarkeit, Historie, Lagerbewegungen, Interaktionen, Visualisierungen, Filter, Favoriten, Reservierungen oder Bestellungen zu sammeln, zu speichern, zu verarbeiten, zu analysieren, zu visualisieren, zu kreuzen, anzureichern und zu nutzen, sofern vorhanden.\n\nWinerim kann diese Daten verwenden, um den Service bereitzustellen, Panels, Metriken, Empfehlungen, Warnungen, Berichte, interne Vergleiche, Fehlererkennung, Funktionsverbesserung, Sicherheit, Betrugsprävention, Support, Produktentwicklung und Erstellung von Business Intelligence für den Kunden zu erstellen.\n\nWinerim kann aggregierte, anonymisierte oder dissoziierte Daten für Sektoranalysen, Benchmarking, Statistiken, Berichte, Produktentwicklung, Schulung und Verbesserung von Modellen, kommerzielle Kommunikation, Marktstudien, Empfehlungen und die Schaffung neuer Dienstleistungen verwenden, stets ohne direkte Identifizierung des Kunden, wenn es um sensible Daten zu Verkäufen, Lagerbeständen, Margen oder Wirtschaftsleistung geht, es sei denn, dies wurde ausdrücklich genehmigt.\n\nWinerim wird keine personenbezogenen Daten verkaufen. Die kommerzielle Nutzung nicht personenbezogener, aggregierter, anonymisierter oder generierter Daten durch Winerim gewährt dem Kunden keine Rechte auf Vergütung, Beteiligung oder zusätzliche Kontrolle, sofern nicht schriftlich etwas anderes vereinbart wurde."
      ],
      [
        "15. Alkohol-, Bewirtungsvorschriften und Restaurantverantwortung",
        "Winerim verkauft, serviert, liefert, transportiert, verteilt oder berechnet Endverbrauchern keine alkoholischen Getränke. Die Plattform ist ein technologisches Tool für Management, Visualisierung, Analyse und kommerzielle Unterstützung.\n\nDer Kunde trägt die alleinige Verantwortung für Verkauf, Service, Verfügbarkeit, Preise, Steuern, Lizenzen, gesetzliches Mindestalter, verantwortungsvollen Konsum, Gesundheitsvorschriften, Bewirtungsvorschriften, Vorschriften zur Alkoholwerbung und die für seine Tätigkeit geltenden örtlichen Vorschriften.\n\nDie von Winerim generierten Empfehlungen, Paarungen, Rankings, Beschreibungen oder Vorschläge ersetzen nicht das professionelle Urteil des Kunden oder seine gesetzlichen Verpflichtungen gegenüber Verbrauchern, Behörden oder Dritten."
      ],
      [
        "16. Künstliche Intelligenz, Empfehlungen und automatisierte Inhalte",
        "Winerim kann automatisierte oder künstliche Intelligenzsysteme integrieren, um Weine zu klassifizieren, Daten anzureichern, zu übersetzen, Beschreibungen zu erstellen, Paarungen vorzuschlagen, Ergebnisse zu sortieren, Muster zu erkennen, Referenzen zu empfehlen und das Benutzererlebnis zu verbessern.\n\nBei diesen Funktionalitäten handelt es sich um Support-Tools. Sie können Fehler, Auslassungen, Vorurteile, Ungenauigkeiten oder Ergebnisse enthalten, die für eine bestimmte Situation nicht angemessen sind. Der Kunde muss die relevanten Informationen prüfen, bevor er sie veröffentlicht, kommerziell nutzt oder Kauf-, Verkaufs-, Lager- oder Serviceentscheidungen trifft.\n\nWinerim kann KI-Funktionalitäten jederzeit aus technischen, rechtlichen, kommerziellen, Sicherheits-, Qualitäts- oder Lieferantengründen ändern, einschränken, ersetzen, deaktivieren oder verbessern.\n\nDer Kunde darf von Winerim generierte KI-Ausgaben, Empfehlungen, Einbettungen, Bewertungen, Eingabeaufforderungen, Ergebnisse, Taxonomien, Beschreibungen oder Datensätze nicht verwenden, um externe Modelle zu trainieren, Konkurrenzprodukte zu erstellen, Daten zu verkaufen oder Datenbanken außerhalb der zulässigen Nutzung zu füttern."
      ],
      [
        "17. Integrationen, APIs und Dritte",
        "Winerim kann mit Zahlungsanbietern, POS, PMS, ERP, CRM, Analysetools, E-Mail-Diensten, Cloud-Hosting, Anwendungsspeichern, Anbietern künstlicher Intelligenz und anderen Drittanbietern integriert werden.\n\nIntegrationen hängen von der Verfügbarkeit, den Bedingungen, APIs, technischen Änderungen, Tarifen, Einschränkungen und Entscheidungen dieser Dritten ab. Winerim ist nicht verantwortlich für Ausfälle, Änderungen, Unterbrechungen, Verluste oder Einschränkungen, die auf Dritte zurückzuführen sind, die außerhalb seiner angemessenen Kontrolle liegen.\n\nDer Kunde ermächtigt Winerim, Daten mit den erforderlichen Dritten auszutauschen, wenn eine Integration aktiviert wird oder wenn dies für die Bereitstellung des Dienstes unerlässlich ist, stets im Rahmen des geltenden Vertrags- und Datenschutzrahmens."
      ],
      [
        "18. Pflichten von Winerim",
        "Winerim wird die Dienstleistung mit professioneller Sorgfalt, im Einklang mit den üblichen Nutzungen des SaaS-Bereichs und mit angemessen verfügbaren technischen und personellen Mitteln erbringen.\n\nWinerim führt die Erstverladung des vom Kunden bereitgestellten Briefes gemäß dem vertraglich vereinbarten Plan und den erhaltenen Informationen durch. Die endgültige Richtigkeit von Preisen, Verfügbarkeit, Jahrgängen, Lagerbeständen und Handelsdaten liegt in der Verantwortung des Kunden.\n\nWinerim wird sich bemühen, den Kunden über relevante Vorfälle zu informieren, die sich erheblich auf die Dienstleistung auswirken, wenn Winerim davon Kenntnis hat und dies vernünftigerweise möglich ist."
      ],
      [
        "19. Pflichten des Kunden",
        "Der Kunde muss die vertraglich vereinbarten Gebühren, Steuern, Bankgebühren, Rücksendegebühren und alle ausstehenden Beträge gemäß diesen Bedingungen unverzüglich bezahlen.\n\nDer Kunde muss die Plattform in Übereinstimmung mit dem Gesetz, Treu und Glauben, der Dokumentation, den Winerim-Anweisungen und der zulässigen Nutzung nutzen.\n\nDer Kunde muss sein autorisiertes Personal schulen, seine Anmeldeinformationen kontrollieren, das veröffentlichte Schreiben überprüfen, die Daten auf dem neuesten Stand halten und darf keine illegalen, unnötigen, falschen, geschützten Informationen oder Informationen von Dritten ohne ausreichende Rechte hochladen.\n\nDer Kunde ist für alle Handlungen seiner Administratoren, Mitarbeiter, Mitarbeiter, Lieferanten oder autorisierten Dritten verantwortlich, die selbstständig oder mit ihren Anmeldeinformationen auf die Plattform zugreifen."
      ],
      [
        "20. Kundenkonten, Anmeldeinformationen und Sicherheit",
        "Der Kunde ist für den Schutz von Anmeldeinformationen, administrativen Benutzern, Berechtigungen und Zugriff verantwortlich. Es wird davon ausgegangen, dass jede über ein Kundenkonto ausgeführte Aktion vom Kunden oder einer autorisierten Person ausgeführt wurde, sofern nicht das Gegenteil nachgewiesen wird.\n\nDer Kunde muss Winerim unverzüglich über jeden unbefugten Zugriff, Verlust von Zugangsdaten, Missbrauch, Datenlecks oder Sicherheitsvorfälle informieren, die sich auf sein Konto auswirken.\n\nWinerim kann den Zugriff sperren, aussetzen, wiederherstellen oder einschränken, wenn begründete Hinweise auf Risiken, Missbrauch, unbefugte Nutzung, Scraping, Extraktion, Sicherheitsverletzung oder Vertragsbruch vorliegen."
      ],
      [
        "21. Support, Wartung und Updates",
        "Gewöhnlicher Support wird über die von Winerim bereitgestellten Kanäle, einschließlich Panel, E-Mail oder andere angegebene Mittel, innerhalb der mitgeteilten oder vertraglich vereinbarten Betriebszeiten bereitgestellt.\n\nWinerim ist ein lebendiges und sich ständig weiterentwickelndes Produkt. Winerim kann Updates, Verbesserungen, technische Änderungen, Automatisierungen, Integrationen, Schnittstellenmodifikationen, neue Module, Architekturanpassungen, Sicherheitspatches und funktionale Änderungen einführen.\n\nDie Aktualisierungen können das Erscheinungsbild, die Abläufe, Funktionalitäten, Felder, Filter, Module oder die Art und Weise der Bereitstellung des Dienstes ändern, solange sie den vertraglich vereinbarten Dienst nicht von wesentlichen Inhalten befreien.\n\nWinerim kann geplante oder Notfallwartungen durchführen. In kritischen Sicherheits- oder Drittsituationen kann der Dienst ohne vorherige Ankündigung unterbrochen werden, wobei versucht wird, ihn in kürzester angemessener Zeit wiederherzustellen."
      ],
      [
        "22. Verfügbarkeit und Fehlen einer absoluten Garantie",
        "Winerim wird sich bemühen, die Plattform gemäß angemessenen SaaS-Industriestandards verfügbar zu halten, garantiert jedoch keine ununterbrochene Verfügbarkeit, vollständige Fehlerfreiheit, dauerhafte Kompatibilität mit allen Geräten, Browsern oder Systemen oder unbegrenzte Kontinuität aller Funktionen.\n\nSofern kein unterzeichnetes SLA vorliegt, wird die Plattform mit angemessenen Mitteln und nach Verfügbarkeit bereitgestellt, ohne Verfügbarkeitsverpflichtungen, Servicegutschriften oder automatische Entschädigung für Unterbrechungen.\n\nWinerim ist nicht verantwortlich für Ausfälle, Unterbrechungen, Verbindungsverluste, Langsamkeit, Nichtverfügbarkeit oder Fehler, die durch Cloud-Anbieter, das Internet, Anwendungsspeicher, Stripe, APIs von Drittanbietern, Kundengeräte, lokale Netzwerke, falsche Konfigurationen, höhere Gewalt oder Ereignisse außerhalb seiner angemessenen Kontrolle verursacht werden."
      ],
      [
        "23. Beta-Funktionen, Piloten und Tests",
        "Winerim bietet möglicherweise Beta-Funktionen, Piloten, Tests, experimentelle Module oder frühen Zugriff an. Diese Funktionalitäten werden ohne Gewähr für Kontinuität, Stabilität, Verfügbarkeit, Ergebnisse oder Dauerhaftigkeit angeboten.\n\nWinerim kann Beta-Funktionalitäten jederzeit ändern, einschränken oder zurückziehen, ohne Anspruch auf Schadensersatz zu erheben, sofern nicht schriftlich etwas anderes vereinbart wurde."
      ],
      [
        "24. Preis, internationale Abrechnung, Steuern und Zahlungsmethode",
        "Der Kunde zahlt Winerim LLC die im Plan, im Budget, im Vertragsformular, in der Rechnung, im Zahlungslink oder in der akzeptierten Einzelbedingung angegebenen Beträge, normalerweise in US-Dollar (USD), sofern nicht schriftlich etwas anderes vereinbart wurde.\n\nIn den Preisen sind keine Steuern, Gebühren, Abgaben, Einbehalte, Bankgebühren, Überweisungsprovisionen, Wechselkursgebühren, Gebühren von Finanzvermittlern oder gleichwertige Gebühren enthalten, die in der Gerichtsbarkeit des Kunden oder bei internationalen Inkassogeschäften anfallen.\n\nWenn die örtlichen Vorschriften des Kunden Einbehalte, Zahlungen oder Abzüge bei Zahlungen im Ausland erfordern, werden diese Gebühren vom Kunden durch Bruttoaufrechnung übernommen, sodass Winerim LLC den gesamten vereinbarten Nettobetrag erhält.\n\nDie Abrechnung kann monatlich, jährlich, pro Pilot, pro Gruppe, pro Einrichtung, pro Modul oder entsprechend der vertraglich vereinbarten Modalität erfolgen. Die Zahlung kann per Karte, Überweisung, Stripe oder anderen von Winerim akzeptierten Mitteln erfolgen.\n\nDer Kunde ist für die Einhaltung der in seinem Land geltenden Steuer-, Umtausch- und Zollpflichten, die Einfuhr von Dienstleistungen, die Registrierung von Zahlungen im Ausland, Einbehalte oder Erklärungen verantwortlich."
      ],
      [
        "25. Jährliche Preisaktualisierung",
        "Der Kunde erkennt an und akzeptiert, dass Winerim seine Preise jedes Kalenderjahr automatisch aktualisieren kann.\n\nMit Wirkung zum 1. Januar eines jeden Jahres kann Winerim eine jährliche Preisaktualisierung zwischen fünf Prozent (5 %) und zehn Prozent (10 %) der im Vorjahr geltenden Preise vornehmen.\n\nDieses Update wird unter anderem auf die Zunahme von Betrieb, Technologie, Infrastruktur, Support, Wartung, Produktentwicklung, Sicherheit, externen Lieferanten, Inflation, Weiterentwicklung der Plattform und neuen Funktionalitäten reagieren.\n\nDie jährliche Aktualisierung gilt ab dem Zeitpunkt des Vertragsabschlusses als akzeptiert, da sie Teil der wirtschaftlichen Bedingungen des Vertrags ist und keiner weiteren Zustimmung bedarf. Winerim kann es per E-Mail, Plattform, Rechnung, Budget, Verlängerung, kommerzielle Kommunikation oder auf andere schriftliche Weise mitteilen, ohne dass der Mangel an individueller Kommunikation seine Anwendung verhindert, wenn es innerhalb des vereinbarten Bereichs liegt.\n\nWenn der Kunde nicht zufrieden ist, kann er gemäß dem in diesen Bedingungen vorgesehenen Stornierungsverfahren eine Stornierung beantragen."
      ],
      [
        "26. Außerordentliche Änderung von Preisen, Plänen und Dienstleistungen",
        "Zusätzlich zur gewöhnlichen jährlichen Aktualisierung kann Winerim Preise, Pläne, Module, Nutzungsbeschränkungen, Funktionalitäten oder wirtschaftliche Bedingungen aus technischen, kommerziellen, betrieblichen, steuerlichen, regulatorischen, Währungs-, externen Lieferanten-, Sicherheits- oder Produktentwicklungsgründen ändern.\n\nWenn die Änderung eine Erhöhung des vertraglich vereinbarten wiederkehrenden Preises außerhalb der ordentlichen jährlichen Aktualisierung mit sich bringt, wird Winerim den Kunden mindestens fünfzehn (15) Kalendertage vor der nächsten Zahlung oder Verlängerung benachrichtigen.\n\nWenn der Kunde nicht zufrieden ist, kann er gemäß dem festgelegten Verfahren eine Stornierung beantragen. Das Versäumnis, innerhalb der Frist zu kündigen oder die Nutzung fortzusetzen, gilt als Anerkennung der neuen wirtschaftlichen Bedingungen."
      ],
      [
        "27. Stornierung und Beendigung des Dienstes",
        "Der Kunde kann die Kündigung seines Abonnements ausschließlich durch schriftliche Mitteilung per E-Mail an cancel@winerim.com beantragen.\n\nDer Stornierungsantrag muss mindestens fünfzehn (15) Kalendertage vor dem Datum der nächsten Zahlung, Verlängerung oder des nächsten Abrechnungszeitraums eingehen.\n\nDie Anfrage muss von der E-Mail-Adresse gesendet werden, die mit dem Konto des Kunden verknüpft ist, oder von einer E-Mail-Adresse, die eine angemessene Identifizierung des Kunden ermöglicht, und mindestens den Firmennamen, den Handelsnamen der Niederlassung, die Steueridentifikationsnummer, das Land, die Dienstleistung oder das Abonnement, dessen Kündigung beantragt wird, sowie das gewünschte Kündigungsdatum enthalten.\n\nAnfragen per Telefon, WhatsApp, mündliche Nachrichten, soziale Netzwerke, Nachrichten an Verkäufer, Manager, Mitarbeiter, Betriebsunterstützung oder über einen anderen Kanal als cancel@winerim.com gelten nicht für vertragliche Kündigungszwecke.\n\nDie Kündigung wird zum Ende des aktuellen Abrechnungszeitraums wirksam, wenn der Antrag innerhalb der angegebenen Mindestfrist eingeht. Erfolgt die Stornierung weniger als fünfzehn (15) Kalendertage, wird sie am Ende des folgenden Abrechnungszeitraums wirksam und verpflichtet den Kunden zur Zahlung für diesen Zeitraum.\n\nEine Stornierung berechtigt nicht zu einer Rückerstattung bereits in Rechnung gestellter oder bezahlter Beträge, es sei denn, Winerim stimmt ausdrücklich schriftlich zu oder ist gesetzlich vorgeschrieben. Die Stornierung entbindet nicht von der Zahlung überfälliger Beträge, ausstehender Rechnungen, Steuern, Provisionen, erbrachter Zusatzleistungen oder vor dem Wirksamkeitsdatum der Stornierung aufgelaufener Beträge."
      ],
      [
        "28. Nichtzahlung, Rückgabe und Aussetzung",
        "Im Falle einer Nichtzahlung, Verzögerung, Rücksendung von Quittungen, Rückbuchung, Kartenfehler, Bankablehnung oder Inkassovorfall kann Winerim den ausstehenden Betrag, Bankgebühren, angemessene Inkassokosten und gesetzlich anwendbare Zinsen fordern.\n\nWinerim kann den Zugang zur Plattform bei Nichtzahlung oder nach angemessener Ankündigung je nach Schwere ganz oder teilweise sperren, ohne dass die Aussetzung den Kunden von seinen Zahlungsverpflichtungen entbindet.\n\nBleibt die Zahlung länger als sieben (7) Kalendertage nach der Aussetzung oder Aufforderung bestehen, kann Winerim das Vertragsverhältnis kündigen, den Zugang sperren oder einschränken und ausstehende Beträge, Schäden, Kosten und Verluste geltend machen."
      ],
      [
        "29. Dauer und Verlängerung",
        "Die anfängliche Dauer ist diejenige, die im Plan, Vertragsformular, Budget, Rechnung, Serviceauftrag oder akzeptierten besonderen Bedingungen angegeben ist. Sofern keine ausdrückliche Angabe erfolgt, kann die Laufzeit monatlich verlängert werden.\n\nSofern keine gültige Kündigung gemäß der Kündigungsklausel vorliegt, verlängert sich das Abonnement automatisch um jeweils entsprechende Zeiträume unter Anwendung der aktuellen Tarife, jährlichen Aktualisierungen und geltenden Wirtschaftsbedingungen.\n\nBei Jahresverträgen, Piloten mit Festpreis, Mindestbindungen oder Verträgen mit unbefristeter Laufzeit erfolgt keine Rückerstattung bereits begonnener Zeiträume, es sei denn, es liegt eine abweichende schriftliche Vereinbarung oder gesetzliche Regelung vor."
      ],
      [
        "30. Aussetzung und Lösung bei Nichteinhaltung",
        "Winerim kann den Dienst mit sofortiger Wirkung oder nach einer Aufforderung zur Berichtigung je nach Schweregrad aussetzen oder beenden, wenn es sich um Nichtzahlung, illegale oder missbräuchliche Nutzung, Verletzung des geistigen Eigentums, Verletzung der Vertraulichkeit, unbefugten Zugriff oder Übertragung, Nutzung durch oder für Wettbewerber, Reverse Engineering, Scraping, Datenextraktion, unbefugtes KI-Training, Datenmonetarisierung oder andere Handlungen handelt, die die Vermögenswerte, die Sicherheit oder die Wettbewerbsposition von Winerim gefährden.\n\nIn solchen Fällen kann Winerim den Zugang sperren, die sofortige Einstellung verlangen, die Entfernung oder Vernichtung von Materialien anordnen, Lizenzen widerrufen, technische Beweise sichern, Schadensersatz verlangen und rechtliche Schritte einleiten.\n\nDer Kunde kann die Beziehung kündigen, wenn Winerim einen schwerwiegenden Verstoß erleidet, der nicht innerhalb einer angemessenen Frist von dreißig (30) Tagen ab der schriftlichen Aufforderung behoben wurde, vorausgesetzt, dass der Verstoß Winerim zuzuschreiben ist und nicht auf Dritte, höhere Gewalt, Nichtzahlung oder Handlungen des Kunden zurückzuführen ist."
      ],
      [
        "31. Wirkungen der Kündigung",
        "Sobald die Beziehung endet, erlischt das Recht des Kunden zur Nutzung der Plattform sofort und Winerim kann den Zugriff deaktivieren, öffentliche Briefe entfernen, Integrationen stoppen und Funktionalitäten einschränken.\n\nSofern dies technisch oder rechtlich nicht unmöglich ist, gestattet Winerim dem Kunden, innerhalb von dreißig (30) Kalendertagen nach der Kündigung einen angemessenen Export seiner auf der Plattform gehosteten Betriebsinformationen zu beantragen, vorausgesetzt, der Kunde ist mit der Zahlung auf dem Laufenden und der Export umfasst keine Daten und Vermögenswerte von Winerim, Daten von anderen Kunden, Geschäftsgeheimnisse, proprietäre Taxonomien, Modelle, Regeln, Strukturen, angereicherte Datensätze oder nicht exportierbare Informationen.\n\nWinerim kann Informationen aufbewahren, die für die Einhaltung gesetzlicher Vorschriften, die Abrechnung, die Sicherheit, die Verteidigung von Ansprüchen, den Nachweis von Nichteinhaltung, Sicherungskopien und interne Aufzeichnungen sowie aggregierte, anonymisierte oder dissoziierte Daten erforderlich sind.\n\nDie Klauseln über geistiges Eigentum, Nutzungsverbote, Nichtextraktion, Vertraulichkeit, Datenschutz, Haftungsbeschränkung, Entschädigung, ausstehende Zahlungen, Gerichtsstand und alle anderen, die ihrer Natur nach bestehen bleiben sollten, bleiben nach der Kündigung in Kraft."
      ],
      [
        "32. Vertraulichkeit und Geschäftsgeheimnisse",
        "Beide Parteien verpflichten sich, die Vertraulichkeit der technischen, kommerziellen, strategischen, betrieblichen, wirtschaftlichen, finanziellen, rechtlichen, Produkt-, Sicherheits-, Kunden-, Preis-, Roadmap-, Daten- und Know-how-Informationen zu wahren, auf die sie im Laufe der Beziehung zugreifen.\n\nDer Kunde erkennt an, dass die Software, Architektur, Datenbanken, Taxonomien, Modelle, Empfehlungen, Metriken, Dokumentation, Abläufe, Schnittstellen, Geschäftslogik, Rich Data und das Know-how von Winerim Geschäftsgeheimnisse darstellen können.\n\nDie Verpflichtung zur Verschwiegenheit bleibt während der Dauer des Vertragsverhältnisses und für fünf (5) Jahre nach dessen Beendigung bestehen. Informationen, die ein Geschäftsgeheimnis, Know-how, Code, Architektur, Modelle, Daten, Sicherheit oder strategische Vermögenswerte von Winerim darstellen, werden geschützt, solange sie es bleiben.\n\nDer Kunde darf ohne schriftliche Genehmigung keine Informationen über Betrieb, Funktionalitäten, technische Details, Strategie, Dokumentation, Vorschläge, nicht öffentliche Preise, Roadmap, Daten, Benchmarks oder Winerim-Materialien an Dritte weitergeben."
      ],
      [
        "33. Geistiges und gewerbliches Eigentum und Datenbanken",
        "Alle geistigen und gewerblichen Eigentumsrechte an Winerim, Software, Code, Architektur, Design, Schnittstelle, Marke, Logos, Dokumentation, Datenbanken, Taxonomien, Modellen, Algorithmen, Regeln, Bildern, Beschreibungen, Übersetzungen, Materialien, Entwicklungen, Verbesserungen und zugehörigen Vermögenswerten gehören Winerim oder seinen Lizenzgebern.\n\nDer Kunde erwirbt durch den Vertragsabschluss, den Zugriff auf die Plattform oder die Betrachtung der Plattform keine Eigentums- oder Verwertungsrechte. Alle nicht ausdrücklich gewährten Rechte bleiben Winerim vorbehalten.\n\nEs ist verboten, außerhalb der zulässigen Nutzung zu reproduzieren, zu modifizieren, zu verteilen, umzuwandeln, öffentlich zu kommunizieren, verfügbar zu machen, Unterlizenzen zu vergeben, weiterzuverkaufen, abgeleitete Werke zu erstellen, zu klonen, zu kopieren, zu registrieren, Modelle zu trainieren, Datensätze zu nutzen oder Winerim-Assets zu nutzen.\n\nDie von Winerim bereitgestellten oder angereicherten Fotos, Texte, Beschreibungen, Dateien, Übersetzungen, Verkostungsnotizen, Paarungen, Etiketten, Taxonomien und Inhalte dürfen ohne vorherige schriftliche Zustimmung nicht außerhalb der Plattform verwendet werden."
      ],
      [
        "34. Kommerzielle Nutzung von Namen, Logo und Erfolgsgeschichten",
        "Sofern kein schriftlicher Widerspruch des Kunden oder eine andere private Vereinbarung vorliegt, kann Winerim den Kunden als Kunden von Winerim erwähnen und seinen Handelsnamen und sein Logo auf der Website, in Angeboten, Präsentationen, sozialen Netzwerken, kommerziellen Materialien, im Portfolio und in der Unternehmenskommunikation verwenden.\n\nDie Veröffentlichung individualisierter Kennzahlen, Wirtschaftsergebnisse, Verkaufsdaten, Bestände, Margen oder identifizierbarer Erfolgsgeschichten bedarf der vorherigen Genehmigung des Kunden, es sei denn, es werden aggregierte, anonymisierte oder nicht identifizierbare Daten verwendet."
      ],
      [
        "35. Datenschutz, Privatsphäre und Cookies",
        "Die Verarbeitung personenbezogener Daten unterliegt der Winerim-Datenschutzrichtlinie und gegebenenfalls dem in diesen Bedingungen enthaltenen Anhang zur Verarbeitungsanordnung oder einem spezifischen DPA.\n\nJede Partei ist für die Verarbeitung personenbezogener Daten im eigenen Namen verantwortlich. Wenn Winerim personenbezogene Daten im Auftrag des Kunden verarbeitet, fungiert es als Datenverarbeiter gemäß dem entsprechenden Anhang.\n\nDer Kunde erklärt, dass er über eine ausreichende Rechtsgrundlage für die Einbindung personenbezogener Daten in die Plattform verfügt und verpflichtet sich, keine unnötigen, illegalen, besonders geschützten Daten oder Daten von Dritten ohne Legitimität hochzuladen.\n\nDie Verwendung von Cookies und ähnlichen Technologien ist derzeit auf technische Cookies beschränkt, die für das normale Funktionieren der Plattform und Stripe-Technologien im Zusammenhang mit dem Zahlungsvorgang, der Abonnementverwaltung, der Sicherheit und der Betrugsprävention unbedingt erforderlich sind. Wenn Winerim in Zukunft nicht notwendige Cookies, wie etwa Analyse-, Werbe-, Mess- oder nicht notwendige Personalisierungs-Cookies, einbindet, wird es den Benutzer darüber informieren und Akzeptanz-, Ablehnungs- oder Konfigurationsmechanismen aktivieren, sofern dies gesetzlich zulässig ist."
      ],
      [
        "36. Sicherheit, Audits und technische Maßnahmen",
        "Winerim wird angemessene technische und organisatorische Maßnahmen ergreifen, um die Plattform, Daten und Vermögenswerte zu schützen, einschließlich Zugriffskontrolle, Authentifizierung, Rollen, Vertraulichkeitsmaßnahmen, Backups, Überwachung, Lieferantensicherheit und ggf. Vorfallmanagement.\n\nDer Kunde darf ohne vorherige schriftliche Genehmigung keine Sicherheitstests, Pentests, Scans, technischen Audits, Schwachstellenanalysen oder unbefugte Überwachungen auf Winerim durchführen.\n\nWinerim kann Protokolle, Nutzungsmuster, Zugriffe, Anfragen, Geräte, IPs, Downloads, API-Nutzung und -Aktivitäten überwachen, um Betrug, Missbrauch, Scraping, Reverse Engineering, Datenextraktion, Konkurrenznutzung, Schwachstellen oder Verstöße zu erkennen."
      ],
      [
        "37. Haftungsbeschränkung",
        "Winerim haftet nur für direkt nachgewiesene direkte Schäden, die aus einer von Winerim zu vertretenden Vertragsverletzung resultieren.\n\nMit Ausnahme von Betrug, grober Fahrlässigkeit oder Haftungen, die gesetzlich nicht ausgeschlossen werden können, ist die Gesamthaftung von Winerim auf den Betrag begrenzt, den der Kunde in den zwölf (12) Monaten vor dem anspruchsbegründenden Ereignis tatsächlich an Winerim gezahlt hat.\n\nWinerim haftet nicht für entgangenen Gewinn, Einkommensverluste, entgangene Chancen, Reputationsverluste, Geschäftsentscheidungen des Kunden, Datenverluste, die nicht Winerim zuzuschreiben sind, Unterbrechungen durch Dritte, Internetausfälle, Fehler im Inhalt des Kunden, Ungenauigkeiten in Briefen, tatsächliche Verfügbarkeit von Produkten, Einhaltung von Alkoholvorschriften oder indirekte, zufällige, besondere, Straf- oder Folgeschäden.\n\nDie Plattform wird wie besehen und verfügbar bereitgestellt, mit Ausnahme ausdrücklicher, schriftlich vereinbarter Garantien. Winerim übernimmt keine Gewähr dafür, dass die Empfehlungen, Paarungen, Übersetzungen, Analysen, Prognosen oder Ausgaben korrekt, vollständig oder für alle Fälle angemessen sind."
      ],
      [
        "38. Schadloshaltung des Kunden",
        "Der Kunde stellt Winerim von Ansprüchen, Strafen, Schäden, Kosten, Ausgaben, Gebühren, Verlusten oder Verbindlichkeiten frei, die sich aus vom Kunden beigesteuerten Inhalten, aus Rechtsverstößen, Missbrauch, Nichtzahlung, Verletzung von Rechten Dritter, Alkoholvorschriften, Lizenzen, lokaler Besteuerung, unbefugtem Zugriff, Datenextraktion, Reverse Engineering, Wettbewerbsnutzung oder Verstoß gegen diese Bedingungen ergeben.\n\nSollte Winerim von einem Dritten, einer Behörde oder einem Mitbewerber eine Klage wegen der Handlungen des Kunden erhalten, wird der Kunde bei der Verteidigung mitwirken, angemessene Kosten übernehmen und im rechtlich angemessenen Umfang Schadensersatz und Aufwendungen ersetzen."
      ],
      [
        "39. Höhere Gewalt",
        "Keine Partei haftet für Verzögerungen oder Nichteinhaltung, die auf Ursachen zurückzuführen sind, die außerhalb ihrer angemessenen Kontrolle liegen, einschließlich Naturkatastrophen, Bränden, Überschwemmungen, Pandemien, Konflikten, Regierungsmaßnahmen, Streiks, Stromausfällen, weit verbreiteten Telekommunikationsausfällen, Infrastrukturangriffen, Cyberangriffen, Störungen wichtiger Lieferanten, Nichtverfügbarkeit von App-Stores oder unvorhergesehenen regulatorischen Änderungen.\n\nDie betroffene Partei wird sich bemühen, die Situation zu kommunizieren und ihre Auswirkungen abzumildern, wenn dies vernünftigerweise möglich ist. Wenn höhere Gewalt die Bereitstellung für mehr als dreißig (30) Tage erheblich verhindert, kann jede Partei die betroffene Dienstleistung ohne Vertragsstrafe kündigen, unbeschadet der aufgelaufenen Beträge."
      ],
      [
        "40. Übertragung, Unterauftragsvergabe und Unternehmensbetrieb",
        "Der Kunde darf seine Rechte oder Pflichten ohne vorherige schriftliche Zustimmung von Winerim nicht abtreten, übertragen oder untervergeben.\n\nWinerim kann einen Teil der Bereitstellung des Dienstes mit technischen, professionellen, Cloud-, Zahlungs-, Support-, Analyse-, KI-, Integrations- oder anderen erforderlichen Anbietern untervergeben, wobei die gesetzlich entsprechende vertragliche Verantwortung gewahrt bleibt.\n\nWinerim kann diese Bedingungen, das Vertragsverhältnis, Kredite, Rechte, Pflichten oder damit verbundene Daten im Rahmen einer Unternehmensumstrukturierung, einer Fusion, eines Erwerbs, eines Geschäftsverkaufs, einer Finanzierung, der Einbringung eines Tätigkeitszweigs oder der Übertragung von mit Winerim verbundenen Vermögenswerten abtreten und dies mitteilen, wenn dies angemessen oder gesetzlich erforderlich ist."
      ],
      [
        "41. Benachrichtigungen",
        "Für gewöhnliche Benachrichtigungen kann Winerim die vom Kunden bereitgestellte E-Mail, Mitteilungen auf der Plattform, Rechnungen, Angebote, Panels, Websites oder andere angemessene schriftliche Mittel verwenden.\n\nDer Kunde muss seine Kontaktinformationen auf dem neuesten Stand halten. An die registrierte E-Mail-Adresse gesendete Benachrichtigungen gelten als gültig erfolgt, es sei denn, es liegt ein Fehler vor, der Winerim zuzuschreiben ist.\n\nStornierungsmitteilungen sind nur gültig, wenn sie gemäß der Stornierungsklausel an cancel@winerim.com gesendet werden."
      ],
      [
        "42. Einhaltung gesetzlicher Vorschriften und Sanktionen",
        "Der Kunde erklärt, dass er keinen Sanktionen, Embargos, kommerziellen Beschränkungen oder Verboten unterliegt, die den Abschluss von Verträgen mit Winerim oder die Nutzung der Plattform verhindern.\n\nDer Kunde verpflichtet sich, Winerim nicht für illegale Aktivitäten, verbotene Gebiete, eingeschränkte Sektoren, Betrug, Geldwäsche, Steuerhinterziehung, Rechtsverletzung, Scraping, unlauteren Wettbewerb oder Nichteinhaltung von Exportkontrollgesetzen, internationalen Sanktionen oder gleichwertigen Vorschriften einzusetzen."
      ],
      [
        "43. Änderung dieser Bedingungen",
        "Winerim kann diese Bedingungen aktualisieren, um rechtliche, technische, betriebliche, kommerzielle, Sicherheitsänderungen, Lieferanten, Funktionalitäten, Unternehmensstruktur, Geschäftsmodell oder erkannte Risiken widerzuspiegeln.\n\nWenn sich eine Änderung wesentlich auf die wesentlichen Rechte oder Pflichten des Kunden auswirkt, wird Winerim sich bemühen, dies per E-Mail, Mitteilung auf der Plattform, Rechnung, Website oder auf andere angemessene Weise mitzuteilen, bevor sie in Kraft tritt.\n\nDie fortgesetzte Nutzung der Plattform nach Inkrafttreten gilt als Annahme der neuen Bedingungen, unbeschadet des Rechts des Kunden, gemäß dem festgelegten Verfahren eine Kündigung zu verlangen."
      ],
      [
        "44. Teilnichtigkeit, Auslegung und vollständige Übereinstimmung",
        "Sollte eine Klausel für nichtig, ungültig oder unanwendbar erklärt werden, hat dies keinen Einfluss auf den Rest des Vertrags, der in Kraft bleibt. Die betroffene Klausel wird durch eine andere gültige ersetzt, die dem verfolgten wirtschaftlichen und rechtlichen Zweck am nächsten kommt.\n\nDas Versäumnis von Winerim, ein Recht auszuüben, stellt keinen Verzicht dar. Die Titel sind Richtwerte und schränken den Inhalt der Klauseln nicht ein.\n\nDiese Bedingungen stellen zusammen mit der Datenschutzrichtlinie, der Cookie-Richtlinie, dem Anhang zum Verarbeitungsauftrag, dem Vertragsformular, dem Budget, der Bestellung, dem Plan, der Rechnung oder den akzeptierten besonderen Bedingungen die vollständige Vereinbarung zwischen den Parteien dar und ersetzen alle früheren Mitteilungen oder Vereinbarungen zum gleichen Thema."
      ],
      [
        "45. Anwendbares Recht und internationale Gerichtsbarkeit",
        "Diese Bedingungen unterliegen den Gesetzen des Bundesstaates Florida, Vereinigte Staaten von Amerika, und werden in Übereinstimmung mit diesen ausgelegt, unbeschadet zwingender Vorschriften, die möglicherweise in der Gerichtsbarkeit des Kunden gelten.\n\nFür alle Streitigkeiten, die sich aus der Auslegung, Einhaltung, Verletzung oder Kündigung dieser Bedingungen ergeben, unterwerfen sich die Parteien der ausschließlichen Zuständigkeit der Landes- oder Bundesgerichte in Miami-Dade County, Florida, Vereinigte Staaten von Amerika, und verzichten auf jede andere für sie geltende Zuständigkeit, sofern nichts anderes zwingend vorgeschrieben ist.\n\nDer Kunde erkennt an, dass es sich um einen B2B-Vertrag handelt und er nicht als Verbraucher handelt. Wenn in einer Gerichtsbarkeit zwingende örtliche Schutzbestimmungen gelten, werden diese nur im unbedingt zwingenden Umfang angewendet."
      ],
      [
        "46. Kontakte",
        "Für Support, normale Vorfälle und allgemeine Kommunikation: info@winerim.com.\n\nFür Stornierungen oder Stornierungsanfragen des Dienstes: cancel@winerim.com, der einzig gültige Vertragskanal für Stornierungen.\n\nFür Privatsphäre und Datenschutz: info@winerim.com.\n\nANHANG I. Vertragsformular / Serviceauftrag\n\nDieses Vertragsblatt kann für jeden Kunden ausgefüllt oder in ein Budget, eine Bestellung, ein Angebot, einen Zahlungslink, eine Proforma-Rechnung oder ein gleichwertiges Dokument integriert werden. Im Falle eines Widerspruchs haben die in diesem Blatt konkret vereinbarten Regelungen nur im Hinblick auf den konkret geregelten Sachverhalt Vorrang.\n\nFirmenname des Kunden\n\n[CUSTOMER_SOCIAL_NATURE]\n\nHandelsname/Firmensitz\n\n[UNTERNEHMENSNAME]\n\nAdresse der Einrichtung\n\n[ESTABLISHMENT_ADDRESS]\n\nSteuer-ID\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nAnsprechpartner\n\n[CONTACT_NAME]\n\nBetriebs-E-Mail\n\n[OPERATIONAL_EMAIL]\n\nRechnungs-E-Mail\n\n[BILLING_EMAIL]\n\nVertraglicher Plan\n\n[PLAN]\n\nPeriodizität\n\n[MONATLICH/JÄHRLICH/PILOT/GRUPPE]\n\nPreis\n\n[BETRAG] USD + anfallende Steuern, Einbehaltungen und Kosten\n\nAktivierungsdatum\n\n[ACTIVATION_DATE]\n\nErster Aufenthalt\n\n[JA / NEIN / DAUER]\n\nZahlungsart\n\n[KARTE / ÜBERTRAGUNG / DIREKTE DEMICILIATION / ANDERE]\n\nSupport inklusive\n\n[ZEITPLAN / KANÄLE / SLA, WENN VORHANDEN]\n\nWeitere Inklusivleistungen\n\n[BESCHREIBUNG]\n\nAusgeschlossene oder zu budgetierende Leistungen\n\n[BESCHREIBUNG]\n\nGenehmigung zur Logo-Nutzung\n\n[JA / NEIN / BEDINGUNGEN]\n\nSpezifische Bedingungen\n\n[BESONDERE_BEDINGUNGEN]\n\nUnterschrift oder Annahme: Der Kunde akzeptiert diese Bedingungen durch Unterschrift, elektronische Annahme, schriftliche Bestätigung, Zahlung, wirksame Nutzung der Plattform oder eine andere eindeutige Vertragshandlung.\n\nANHANG II. Vereinbarung zur Datenverarbeitungskommission\n\nA.1. Gegenstand, Dauer und Zweck\n\nDieser Anhang regelt die Verarbeitung personenbezogener Daten, die Winerim im Namen des Kunden durchführen kann, wenn der Kunde als Datenverantwortlicher und Winerim als Auftragsverarbeiter im Rahmen der Bereitstellung des SaaS-Dienstes fungiert.\n\nDer Zweck der Verarbeitung besteht darin, die Bereitstellung der Plattform zu ermöglichen, einschließlich Hosting, Konfiguration, Veröffentlichung digitaler Diagramme, Control Panel, Support, Wartung, Sicherheit, Analyse, Integrationen und damit verbundene Dienste.\n\nDie Dauer richtet sich nach der Gültigkeit des Vertragsverhältnisses und den sich daraus ergebenden Fristen zur Rückgabe, Löschung, Sperrung, rechtlichen Aufbewahrung, zur Sicherung von Kopien, zur Abwehr von Ansprüchen oder zur Einhaltung gesetzlicher Vorschriften.\n\nA.2. Datenkategorien und betroffene Personen\n\nZu den Daten können Identifikations- und Kontaktdaten von Vertretern, Administratoren, Mitarbeitern, Mitarbeitern oder autorisierten Benutzern des Kunden gehören; Zeugnisse; Protokolle; Nutzungsdaten; unterstützende Daten; Abrechnungsdaten; und, wenn der Kunde sie einbezieht oder verbindet, Betriebsdaten im Zusammenhang mit Verkäufen, Lagerbeständen, Bestellungen, Reservierungen, Präferenzen oder Interaktionen.\n\nBei den betroffenen Personen kann es sich um Vertreter des Kunden, Mitarbeiter der Einrichtung, Administratoren, Mitarbeiter, Lieferanten, Gäste oder Endnutzer handeln, jeweils in dem Umfang, in dem ihre Daten im Rahmen des Dienstes verarbeitet werden.\n\nDie Verarbeitung besonderer Kategorien personenbezogener Daten ist nicht vorgesehen. Der Kunde darf keine Daten zu Gesundheit, Weltanschauung, Religion, Gewerkschaftszugehörigkeit, biometrischen, genetischen Daten, Sexualleben, sexueller Orientierung, Straftaten oder anderen besonders geschützten Daten einbeziehen, es sei denn, es liegt eine dokumentierte Anweisung, eine ausreichende Rechtsgrundlage und eine ausdrückliche Zustimmung von Winerim vor.\n\nA.3. Kundenanweisungen\n\nWinerim verarbeitet personenbezogene Daten im Namen des Kunden nur in Übereinstimmung mit diesen Bedingungen, der Datenschutzrichtlinie, den dokumentierten Anweisungen des Kunden und den geltenden Vorschriften.\n\nWenn Winerim der Ansicht ist, dass eine Anweisung gegen geltende Vorschriften verstößt, kann sie den Kunden darüber informieren und ihre Ausführung in dem Umfang aussetzen, der erforderlich ist, um Rechtsverstöße, Sicherheitsrisiken oder Schäden für Dritte zu vermeiden.\n\nA.4. Pflichten von Winerim als Manager\n\nWinerim verpflichtet sich, die Daten gemäß dokumentierter Weisung zu verarbeiten; Gewährleistung, dass die zur Verarbeitung befugten Personen der Schweigepflicht unterliegen; geeignete technische und organisatorische Maßnahmen anwenden; den Kunden angemessen bei Anspruchsanfragen, Lücken, Folgenabschätzungen oder vorherigen Konsultationen unterstützen, sofern angemessen; und die Daten nach Beendigung des Dienstes zu löschen oder zurückzugeben, sofern keine Aufbewahrungspflicht besteht.\n\nHilfeleistungen, die über die normale Unterstützung hinausgehen, Entwicklungen, spezifische Prüfungen, komplexe Exporte oder außergewöhnliche Aufgaben erfordern, können gesondert budgetiert werden.\n\nA.5. Unterauftragsverarbeiter\n\nDer Kunde ermächtigt Winerim, für die Bereitstellung des Dienstes erforderliche Unterauftragsverarbeiter einzusetzen, einschließlich Anbieter von Hosting, Speicherung, Sicherheit, Überwachung, Zahlungen, Abrechnung, E-Mail, Support, Analyse, künstlicher Intelligenz, Übersetzung, Integrationen, Anwendungsspeichern und anderen technischen Diensten.\n\nWinerim wird von seinen Unterauftragsverarbeitern verlangen, dass sie Datenschutzverpflichtungen haben, die im Wesentlichen denen in diesem Anhang entsprechen. Winerim kann Unterauftragsverarbeiter einbeziehen oder ersetzen, wenn dies für die Erbringung der Dienstleistung erforderlich ist, und informiert mit angemessenen Mitteln, wenn dies gesetzlich vorgeschrieben ist.\n\nDie tatsächliche Liste der Unterauftragsverarbeiter muss in der internen oder öffentlichen Dokumentation von Winerim auf dem neuesten Stand gehalten und dem Kunden auf begründete Anfrage zur Verfügung gestellt werden.\n\nA.6. Internationale Überweisungen\n\nWenn die Verarbeitung internationale Übermittlungen personenbezogener Daten außerhalb des Europäischen Wirtschaftsraums oder von Gebieten mit einem Angemessenheitsbeschluss umfasst, wird Winerim geeignete Garantien gemäß der DSGVO ergreifen, einschließlich Standardvertragsklauseln, Angemessenheitsbeschlüssen, ergänzenden Maßnahmen oder anderen rechtsgültigen Mechanismen. Da Winerim LLC seinen Sitz in den Vereinigten Staaten hat, erkennen die Parteien an, dass ein Zugriff oder eine Verarbeitung aus den Vereinigten Staaten erfolgen kann und dass die geltenden Garantien dokumentiert werden müssen, wenn die Verarbeitung der DSGVO oder anderen gleichwertigen Vorschriften unterliegt.\n\nA.7. Sicherheit und Verstöße\n\nWinerim wird angemessene Maßnahmen zur Zugriffskontrolle, Vertraulichkeit, Integrität, Verfügbarkeit, logischen Trennung, Backups, Überwachung, Vorfallmanagement, Verschlüsselung (sofern angemessen) und organisatorische Sicherheit anwenden.\n\nIm Falle einer Verletzung der Sicherheit personenbezogener Daten, die sich auf die im Auftrag des Kunden verarbeiteten Daten auswirkt, wird Winerim den Kunden unverzüglich benachrichtigen, sobald es angemessene Kenntnis von dem Vorfall hat, und ihm die verfügbaren Informationen zur Verfügung stellen, damit der Kunde seinen gesetzlichen Verpflichtungen nachkommen kann.\n\nA.8. Interessentenrechte und Prüfungen\n\nWenn Winerim einen Antrag auf Zugriff, Berichtigung, Löschung, Widerspruch, Einschränkung oder Übertragbarkeit im Zusammenhang mit im Auftrag des Kunden verarbeiteten Daten erhält, wird Winerim den Antrag an den Kunden weiterleiten oder angemessene Unterstützung leisten, es sei denn, Winerim handelt in Bezug auf diese Verarbeitung als unabhängiger Verantwortlicher.\n\nDer Kunde kann angemessene Informationen anfordern, um die Einhaltung dieses Nachtrags zu überprüfen. Persönliche oder technische Audits erfordern eine vorherige Ankündigung, sind vertraulich, haben einen begrenzten Umfang, haben keine Auswirkungen auf die Sicherheit oder andere Kunden und können mit Kosten verbunden sein, wenn sie über die normale Unterstützung hinausgehen.\n\nA.9. Rückgabe und Löschung\n\nNach Vertragsende wird Winerim die im Auftrag des Kunden verarbeiteten personenbezogenen Daten gemäß angemessener Weisung löschen oder zurückgeben, es sei denn, es besteht eine gesetzliche Verpflichtung zur Aufbewahrung, Sperrung, Abwehr von Ansprüchen, zur Erstellung von Sicherungskopien oder vorübergehender technischer Notwendigkeit.\n\nDie Löschung der Daten hat keine Auswirkungen auf aggregierte, anonymisierte oder dissoziierte Daten, die keine vernünftige Identifizierung einer natürlichen Person zulassen."
      ]
    ],
    "links": [
      [
        "Startseite",
        "/de"
      ],
      [
        "Produkt",
        "/de/weinkarten-software"
      ],
      [
        "Demo",
        "/de/demo"
      ],
      [
        "Kontakt",
        "/de/kontakt"
      ],
      [
        "Datenschutz",
        "/de/datenschutz"
      ]
    ]
  },
  "/pt/privacidade": {
    "lang": "pt",
    "title": "Política de Privacidade | Winerim",
    "description": "Política de privacidade internacional para clientes, administradores, visitantes, comensais e contactos Winerim fora de Espanha.",
    "h1": "Política de Privacidade",
    "subtitle": "Tratamento de dados pessoais na plataforma Winerim · Versão operacional final - 7 de julho de 2026 · Aplicável a clientes localizados fora de Espanha, salvo acordo escrito em contrário.",
    "canonical": "/pt/privacidade",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/politica-privacidad",
      "en": "/en/privacy",
      "it": "/it/privacy",
      "fr": "/fr/confidentialite",
      "de": "/de/datenschutz",
      "pt": "/pt/privacidade",
      "x-default": "/politica-privacidad"
    },
    "sections": [
      [
        "Gerente Sênior Internacional",
        "Winerim LLC, empresa da Flórida, endereço 1210 Washington Ave 213, Miami Beach, FL 33139, EUA"
      ],
      [
        "Marca/plataforma",
        "Winerim"
      ],
      [
        "Privacidade de contato",
        "info@winerim.com"
      ],
      [
        "Escopo",
        "Clientes, utilizadores administrativos, visitantes, comensais e contactos localizados fora de Espanha"
      ],
      [
        "Representante da UE, se aplicável",
        "info@winerim.com como ponto de contato; representante formal na UE, se legalmente exigido"
      ],
      [
        "Principais regulamentos",
        "Regulamentos de privacidade aplicáveis por território; GDPR quando aplicável aos titulares de dados do EEE"
      ],
      [
        "Retiradas contratuais",
        "Os cancelamentos do serviço são geridos exclusivamente em cancel@winerim.com; Esta política não substitui esse procedimento"
      ],
      [
        "1. Responsável pelo tratamento internacional",
        "O responsável pelo tratamento dos dados dos clientes e utilizadores localizados fora de Espanha será a Winerim LLC, empresa constituída sob as leis do Estado da Florida, Estados Unidos da América, com sede em 1210 Washington Ave 213, Miami Beach, FL 33139, EUA, salvo se uma oferta, contrato ou política local indicar outra entidade responsável.\n\nQuando a Winerim processa dados em nome de um Cliente, o Cliente será responsável pelo processamento e a Winerim atuará como processador ou prestador de serviços de acordo com o contrato, o Anexo da Ordem de Processamento, as instruções documentadas e os regulamentos aplicáveis.\n\nQuando a presente Política for aplicável a interessados do Espaço Económico Europeu, do Reino Unido ou da Suíça, a Winerim aplicará os direitos, garantias e bases de legitimidade exigidas pela regulamentação aplicável, incluindo o RGPD quando aplicável. Caso seja obrigatória a designação de um representante formal na União Europeia, a Winerim atualizará esta Política com os seus dados; entretanto, info@winerim.com será o ponto de contacto operacional para questões de privacidade."
      ],
      [
        "2. A quem esta Política se aplica",
        "Esta Política se aplica a representantes, administradores, funcionários, colaboradores e usuários autorizados de clientes profissionais; visitantes do site; usuários de aplicativos; comensais ou utilizadores finais que consultam ementas digitais; contatos comerciais; fornecedores; candidatos; pessoas que entram em contato com o suporte; e qualquer pessoa cujos dados sejam tratados no contexto da Winerim.\n\nWinerim é uma plataforma B2B. Os restaurantes, hotéis ou clientes profissionais podem ser responsáveis ​​por determinados dados que incorporam, conectam ou publicam na Plataforma, incluindo dados dos seus funcionários, utilizadores, comensais ou terceiros."
      ],
      [
        "3. Dados pessoais que podemos tratar",
        "Dados de identificação e contacto: nome, apelido, cargo, empresa, restaurante, hotel ou grupo, morada profissional, número de telefone, email, nome de utilizador, palavra-passe encriptada, identificadores de conta, país e idioma.\n\nDados de contratação e faturação: entidade, CIF/NIF/VAT/CUIT/ID fiscal, morada fiscal, plano contratado, montante, moeda, faturas, pagamentos, estado de cobrança, método de pagamento tokenizado, dados geridos pela Stripe ou outros fornecedores de pagamento, incidentes de cobrança, devoluções e comunicações contratuais.\n\nDados técnicos e de uso: endereço IP, dispositivo, navegador, sistema operacional, registros, data e hora, idioma, localização aproximada derivada do IP, páginas visitadas, eventos, cliques, sessões, erros, tokens, identificadores de cookies, atividade do painel, rastreamentos de segurança e uso de API.\n\nDados da conta e preferências: favoritos, vinhos visualizados, seleções guardadas, pesquisas, preferências de idioma, interações com recomendações, configurações da conta e comunicações.\n\nCardápio e dados operacionais: referências de vinhos, preços, safras, estoque, rotação, vendas, disponibilidade, notas, emparelhamentos, imagens, categorias, filtros, visualizações, desempenho comercial, métricas e dados de integração, quando o Cliente os fornece ou conecta.\n\nDados de suporte e comunicações: e-mails, tickets, mensagens, anexos, ligações, reuniões, incidentes, solicitações, respostas, histórico de suporte e qualquer informação que o usuário forneça voluntariamente.\n\nDados de cancelamento contratual: pedidos enviados para cancel@winerim.com, identificação do Cliente, email remetente, data e hora, subscrição afetada, comunicações associadas e elementos de prova necessários para comprovar a receção ou falta de receção válida.\n\nNão solicitamos categorias especiais de dados. Os utilizadores e clientes não devem fornecer dados sobre saúde, ideologia, religião, filiação sindical, biometria, genética, vida sexual, orientação sexual, infracções penais ou outros dados especialmente protegidos, a menos que seja estritamente necessário, exista uma base legal e a Winerim o aceite expressamente."
      ],
      [
        "4. Origem dos dados",
        "Os dados poderão vir diretamente do usuário ou Cliente; de administradores autorizados pelo Cliente; de provedores de pagamento; desde integrações ativadas pelo Cliente, como POS, PMS, ERP, CRM ou outras ferramentas; de fornecedores técnicos; de lojas de aplicativos; cookies e tecnologias similares; de fontes públicas; e dados gerados pelo uso da Plataforma.\n\nQuando o Cliente incorpora dados de terceiros no Winerim, declara ter base legal suficiente e ter fornecido as informações de privacidade correspondentes."
      ],
      [
        "5. Finalidades do tratamento",
        "Criar e gerenciar contas, autenticar usuários, gerenciar permissões, permitir acesso à Plataforma e manter a segurança.\n\nPrestar o serviço contratado, incluindo configuração, upload, publicação, visualização, tradução, enriquecimento, manutenção, análise e gestão de cartas de vinhos digitais.\n\nGerenciar cadastros, renovações, cancelamentos, cancelamentos, pagamentos, faturamento, contabilidade, impostos, devoluções, estornos, inadimplência e relacionamento contratual.\n\nFornecer suporte técnico e funcional, responder dúvidas, resolver incidentes, comunicar alterações, realizar manutenção, enviar avisos de segurança, cobrança ou serviço.\n\nAnalise vendas, estoque, rotação, disponibilidade, interações, preferências, desempenho do cardápio, uso de filtros e métricas de exploração para oferecer painéis, recomendações, alertas, insights e melhoria de gestão.\n\nDesenvolver, treinar, ajustar, testar e melhorar sistemas internos de análise, recomendação, classificação, emparelhamento, tradução, normalização, detecção de erros, segurança e outras funcionalidades, preferencialmente com dados agregados, anonimizados ou minimizados quando viável.\n\nEvite fraudes, abusos, acesso não autorizado, raspagem, rastreamento, extração automatizada, engenharia reversa, uso competitivo, quebras de contrato, incidentes e ataques de segurança.\n\nEnviar as suas próprias comunicações comerciais sobre Winerim, novidades, funcionalidades, eventos ou serviços similares quando exista base legal e respeitando o direito de oposição ou cancelamento.\n\nCumprir obrigações legais, responder às autoridades, tratar de reclamações, preservar provas, defender direitos, gerir auditorias e operações corporativas."
      ],
      [
        "6. Bases legais ou fundamentos do tratamento",
        "Para relações internacionais B2B, a Winerim tratará os dados com base na execução contratual, medidas pré-contratuais, cumprimento de obrigações legais, interesses comerciais legítimos, consentimento quando necessário ou qualquer outra base permitida pela regulamentação aplicável.\n\nQuando o RGPD for aplicável a partes interessadas do Espaço Económico Europeu, as bases de legitimidade serão a execução do contrato, o cumprimento das obrigações legais, o interesse legítimo, o consentimento e, quando apropriado, as instruções do responsável pelo tratamento, caso a Winerim atue como subcontratante.\n\nOs interesses legítimos incluem segurança, prevenção de fraudes, melhoria de serviços, análise interna, suporte, defesa de reclamações, comunicações B2B, proteção de propriedade intelectual, detecção de scraping, engenharia reversa, mineração de dados, abuso de API e uso competitivo não autorizado.\n\nQuando os regulamentos locais exigirem consentimento específico, a Winerim irá solicitá-lo ou o Cliente deverá obtê-lo antes de incorporar os dados na Plataforma."
      ],
      [
        "7. Exibição pública de cartas de vinhos",
        "O objetivo essencial do Winerim é permitir aos Clientes a divulgação pública das suas cartas de vinhos em formato digital. Portanto, os dados do cardápio, como referências, preços, safras, imagens, descrições, combinações, categorias e disponibilidade, poderão ser visíveis publicamente aos comensais, visitantes, mecanismos de busca e terceiros técnicos necessários ao funcionamento da Internet.\n\nEm princípio, esta informação é de natureza empresarial ou comercial. Se o Cliente incluir dados pessoais numa carta, será responsável por ter uma base legal e por evitar a publicação de informações pessoais desnecessárias ou não autorizadas."
      ],
      [
        "8. Dados de vendas, estoque, análises e benchmarking",
        "A Winerim poderá tratar dados de vendas, stock, rotação, disponibilidade, interações, filtros, visualizações, preferências e desempenho comercial para prestar o serviço, mostrar análises ao Cliente, gerar recomendações, melhorar funcionalidades, detetar erros e oferecer business intelligence.\n\nA Winerim poderá utilizar dados agregados, anonimizados ou dissociados para análises setoriais, benchmarking, relatórios internos ou externos, inteligência de mercado, treinamento de modelos, melhoria de produtos, estudos comerciais e desenvolvimento de novas funcionalidades.\n\nWinerim não venderá dados pessoais. Também não publicará dados individualizados sobre vendas, stocks, margens ou desempenho económico de um Cliente identificando-o diretamente sem autorização ou necessidade legal.\n\nEsta Política não concede ao Cliente, usuários autorizados ou terceiros qualquer direito de extrair, copiar, vender, revender, licenciar, atribuir, transferir, publicar, comercializar, treinar modelos, alimentar bancos de dados, extrair ou explorar dados, conteúdo, métricas, recomendações, taxonomias, conjuntos de dados, imagens, descrições ou ativos do Winerim fora do uso permitido nos Termos."
      ],
      [
        "9. Inteligência artificial e decisões automatizadas",
        "A Winerim poderá utilizar sistemas automatizados ou de inteligência artificial para classificar vinhos, enriquecer dados, gerar descrições, traduzir, criar emparelhamentos, ordenar resultados, recomendar vinhos, detectar anomalias, melhorar a pesquisa e optimizar funcionalidades.\n\nEssas funcionalidades são de suporte e podem cometer erros. Não produzem decisões jurídicas ou efeitos significativamente semelhantes sobre pessoas singulares no sentido estrito do RGPD, salvo indicação expressa em contrário numa funcionalidade específica.\n\nQuando os dados pessoais são utilizados em sistemas automatizados, a Winerim esforçar-se-á por aplicar a minimização, pseudonimização, anonimização ou agregação sempre que viável e proporcional.\n\nO Cliente não poderá usar dados ou resultados do Winerim para treinar modelos externos ou desenvolver soluções concorrentes, de acordo com os Termos."
      ],
      [
        "10. Destinatários, fornecedores e subprocessadores",
        "Poderemos compartilhar dados com provedores que prestam serviços à Winerim, incluindo hospedagem em nuvem, armazenamento, segurança, monitoramento, e-mail, suporte, análises, pagamentos, cobrança, inteligência artificial, tradução, integração, ferramentas internas, consultores profissionais e lojas de aplicativos.\n\nA Stripe ou outros provedores de pagamento podem processar dados necessários para pagamentos, assinaturas, cobrança, prevenção de fraudes, conformidade financeira e obrigações regulatórias de acordo com seus próprios termos e políticas.\n\nApple, Google ou operadoras de lojas de aplicativos podem processar dados quando o usuário baixa ou usa aplicativos móveis de seus ambientes.\n\nPoderemos também comunicar dados a autoridades, tribunais, administrações públicas, forças de segurança, consultores, potenciais compradores ou terceiros quando exista uma obrigação legal, um requisito válido, uma defesa de direitos, uma operação corporativa ou um interesse legítimo suficiente.\n\nA lista específica de fornecedores e subprocessadores relevantes deve ser mantida atualizada e disponibilizada mediante solicitação razoável ou em uma página específica do Winerim."
      ],
      [
        "11. Transferências internacionais e tratamento dos Estados Unidos",
        "A Winerim LLC está localizada nos Estados Unidos, portanto os dados podem ser processados, armazenados ou acessíveis a partir dos Estados Unidos e de outros países onde os fornecedores da Winerim operam.\n\nQuando o tratamento estiver sujeito ao RGPD ou a outros regulamentos que restrinjam as transferências internacionais, a Winerim aplicará garantias adequadas, tais como cláusulas contratuais-tipo, decisões de adequação, medidas suplementares, contratos de fornecedores ou mecanismos equivalentes legalmente válidos.\n\nO Cliente reconhece que a utilização de um serviço SaaS internacional pode envolver transferências transfronteiriças, acesso remoto, fornecedores de nuvem, pagamentos, suporte, segurança, análise e inteligência artificial em diferentes jurisdições."
      ],
      [
        "12. Retenção de dados",
        "Os dados da conta e do contrato serão conservados enquanto existir relação contratual e posteriormente pelos períodos necessários ao cumprimento legal, contabilístico, fiscal, defesa de reclamações, auditoria, segurança e responsabilidades.\n\nOs dados de faturação serão conservados durante os períodos exigidos pela regulamentação fiscal, comercial e contabilística aplicável.\n\nOs pedidos de cancelamento, as comunicações contratuais e os comprovativos associados serão conservados pelos prazos necessários ao processamento do cancelamento, comprovação da sua recepção ou falta de recibo válido, defesa de reclamações e cumprimento de obrigações legais.\n\nOs dados de apoio serão conservados durante o tempo necessário para responder à dúvida ou incidente e posteriormente por um período de tempo razoável para monitorização, qualidade, segurança e defesa de reclamações.\n\nOs dados técnicos, logs e segurança serão mantidos pelos períodos previstos para fins de segurança, diagnóstico, prevenção de fraudes, detecção de scraping, abuso, engenharia reversa e melhoria do serviço.\n\nDados de cartas, estoque, vendas e operacionais serão mantidos enquanto a conta estiver ativa e por um período razoável a partir de então para exportação, recuperação, suporte, cópias de segurança, conformidade legal e defesa de direitos.\n\nOs dados agregados, anonimizados ou dissociados podem ser mantidos indefinidamente porque não identificam razoavelmente uma pessoa singular."
      ],
      [
        "13. Direitos de privacidade",
        "As pessoas interessadas poderão exercer os direitos reconhecidos pela regulamentação aplicável na sua jurisdição. Quando o RGPD se aplica, estes direitos incluem acesso, retificação, eliminação, oposição, limitação, portabilidade e retirada de consentimento.\n\nDependendo do país ou estado, também poderão existir direitos de informação, correção, eliminação, exclusão de venda ou partilha, limitação de determinadas utilizações, recurso ou apresentação de reclamação junto das autoridades competentes.\n\nPara exercer direitos deverá contactar info@winerim.com, indicando o direito que pretende exercer, país de residência e dados suficientes para identificar o pedido. Winerim poderá solicitar informações adicionais para verificar identidade ou representação.\n\nCaso o pedido se refira a dados tratados em nome de um Cliente, a Winerim poderá encaminhar o pedido ao Cliente ou agir de acordo com as suas instruções.\n\nNo caso de interessados provenientes do Espaço Económico Europeu, poderão contactar a autoridade de controlo competente. Caso exista um representante europeu formalmente designado, os seus dados serão indicados nesta Política; entretanto, info@winerim.com será o ponto de contacto operacional para questões de privacidade."
      ],
      [
        "14. Cookies e tecnologias semelhantes",
        "A Winerim atualmente não utiliza cookies próprios analíticos, publicitários ou de marketing. A Plataforma poderá utilizar cookies técnicos próprios estritamente necessários para autenticação, sessão, segurança, prevenção de abusos e funcionamento normal do Serviço. Para pagamentos, a Winerim usa a Stripe como fornecedor terceirizado, que pode instalar ou usar cookies e tecnologias semelhantes necessárias para processar pagamentos, gerenciar assinaturas, prevenir fraudes, aumentar a segurança e cumprir obrigações financeiras ou regulatórias.\n\nSe no futuro a Winerim incorporar cookies não necessários, como analíticos, publicitários, de medição ou de personalização não essenciais, o utilizador será informado e o mecanismo de aceitação, rejeição ou configuração será ativado quando legalmente aplicável. A rejeição de cookies desnecessários não impedirá o uso básico do Serviço quando tais cookies não forem essenciais."
      ],
      [
        "15. Comunicações comerciais",
        "A Winerim poderá enviar comunicações relativas ao serviço, segurança, faturação, alterações contratuais, manutenção, incidentes ou funcionamento da conta, na medida em que sejam necessárias à relação contratual.\n\nA Winerim poderá enviar comunicações comerciais próprias sobre serviços similares, novas funcionalidades, conteúdos, eventos ou notícias, quando exista fundamento legal. O destinatário poderá opor-se ou cancelar a subscrição através dos mecanismos indicados em cada comunicação.\n\nO cancelamento das comunicações comerciais não implica o cancelamento do serviço. O cancelamento contratual só será válido se solicitado por email para cancel@winerim.com de acordo com os Termos."
      ],
      [
        "16. Segurança e confidencialidade",
        "A Winerim aplicará medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acesso não autorizado, alteração, perda, destruição, divulgação ou utilização indevida.\n\nEstas medidas podem incluir controlo de acesso, funções, autenticação, encriptação quando apropriado, cópias de segurança, monitorização, registo, gestão de incidentes, confidencialidade contratual, revisão de fornecedores e medidas de continuidade razoáveis.\n\nNenhum sistema é completamente seguro. Clientes e usuários devem proteger credenciais, usar senhas fortes, limitar permissões e relatar incidentes ou acessos não autorizados."
      ],
      [
        "17. Menores",
        "Winerim é um serviço profissional B2B e não é direcionado a menores. Não solicitamos intencionalmente dados de menores.\n\nO Cliente é responsável pelo cumprimento da regulamentação aplicável quando os comensais ou utilizadores finais menores possam aceder a menus públicos, especialmente em relação a bebidas alcoólicas, publicidade, idade legal e consumo responsável."
      ],
      [
        "18. Responsabilidade do Cliente pelos dados incorporados",
        "O Cliente será responsável pelos dados pessoais que decida incorporar, conectar ou publicar no Winerim, incluindo dados de funcionários, colaboradores, fornecedores, clientes, imagens, comentários, notas ou informações de terceiros.\n\nO Cliente deverá informar as pessoas afetadas quando apropriado, obter os consentimentos necessários, estabelecer bases jurídicas, responder às solicitações de direitos e evitar incorporar dados desnecessários ou especialmente protegidos.\n\nA Winerim poderá eliminar, bloquear ou exigir a retirada de dados quando existirem indícios de ilegalidade, excesso, violação de direitos, risco de segurança ou quebra de contrato."
      ],
      [
        "19. Não venda de dados pessoais e limites de utilização de dados",
        "Winerim não vende dados pessoais no sentido comum de transferência de dados identificáveis em troca de dinheiro.\n\nA Winerim poderá explorar dados não pessoais, agregados, anonimizados, dissociados ou gerados pela Plataforma para fins de melhoria, análise, benchmarking, IA, produto, segurança e negócios, de acordo com os Termos e esta Política.\n\nClientes, usuários ou terceiros não podem extrair, revender, licenciar, transferir, monetizar ou usar dados ou ativos do Winerim para seus próprios produtos, terceiros, IA externa, consultoria, comparadores, catálogos ou soluções concorrentes."
      ],
      [
        "20. Alterações nesta Política",
        "A Winerim poderá atualizar esta Política para refletir alterações legais, técnicas, operacionais, fornecedores, funcionalidades, tratamentos, estrutura corporativa ou modelo de negócios.\n\nQuando as alterações forem relevantes, a Winerim tentará comunicá-las por email, plataforma, website ou outros meios razoáveis. A continuação da utilização da Plataforma após a atualização implica o conhecimento da versão atual, sem prejuízo dos direitos legalmente aplicáveis."
      ],
      [
        "21. Contato",
        "Para privacidade e proteção de dados: info@winerim.com.\n\nPara suporte regular: info@winerim.com.\n\nPara cancelamentos contratuais do serviço: exclusivamente cancel@winerim.com, de acordo com os Termos e Condições."
      ]
    ],
    "links": [
      [
        "Início",
        "/pt"
      ],
      [
        "Produto",
        "/pt/software-carta-vinhos"
      ],
      [
        "Demo",
        "/pt/demo"
      ],
      [
        "Contacto",
        "/pt/contacto"
      ],
      [
        "Termos",
        "/pt/termos"
      ]
    ]
  },
  "/pt/termos": {
    "lang": "pt",
    "title": "Termos e Condições de Contrato e Uso de SaaS | Winerim",
    "description": "Termos e condições internacionais de contratação e utilização SaaS para clientes Winerim fora de Espanha.",
    "h1": "Termos e Condições de Contrato e Uso de SaaS",
    "subtitle": "Contrato SaaS B2B integrado para clientes profissionais Winerim · Versão operacional final - 7 de julho de 2026 · Aplicável a clientes localizados fora de Espanha, salvo acordo escrito em contrário.",
    "canonical": "/pt/termos",
    "schemaType": "WebPage",
    "robots": "noindex, follow",
    "alternates": {
      "es": "/terminos-y-condiciones-del-contrato",
      "en": "/en/terms",
      "it": "/it/termini",
      "fr": "/fr/conditions",
      "de": "/de/agb",
      "pt": "/pt/termos",
      "x-default": "/terminos-y-condiciones-del-contrato"
    },
    "sections": [
      [
        "Documento",
        "Termos e Condições Internacionais / Termos e Condições Internacionais com contrato SaaS integrado"
      ],
      [
        "Escopo",
        "Clientes localizados fora de Espanha, salvo acordo em contrário por escrito"
      ],
      [
        "Provedor e faturamento",
        "Winerim LLC, uma empresa constituída sob as leis do Estado da Flórida, endereço 1210 Washington Ave 213, Miami Beach, FL 33139, EUA"
      ],
      [
        "Marca",
        "Winerim"
      ],
      [
        "Natureza",
        "Serviço SaaS B2B para hotelaria, restaurantes, hotéis e grupos profissionais"
      ],
      [
        "Retiradas contratuais",
        "Somente por e-mail para cancel@winerim.com com 15 dias corridos de antecedência"
      ],
      [
        "Contato geral",
        "info@winerim.com"
      ],
      [
        "Lei e jurisdição",
        "Leis do Estado da Flórida; tribunais estaduais ou federais localizados no condado de Miami-Dade, Flórida, exceto regra obrigatória"
      ],
      [
        "1. Identificação do fornecedor e âmbito de aplicação internacional",
        "Estes Termos e Condições internacionais regulam a contratação, acesso e utilização profissional da Winerim fora de Espanha, incluindo as suas aplicações web e móveis, painéis de controlo, menus digitais, módulos de gestão, integrações, APIs, funcionalidades analíticas, inteligência artificial, suporte e serviços associados.\n\nPara clientes localizados fora de Espanha, o fornecedor contratual e entidade emissora da fatura será a Winerim LLC, empresa constituída sob as leis do Estado da Florida, Estados Unidos da América, com sede em 1210 Washington Ave 213, Miami Beach, FL 33139, EUA, salvo se uma oferta, encomenda, fatura ou contrato particular indicar expressamente outra entidade fornecedora.\n\nO cliente será a pessoa singular ou colectiva que contrate o serviço como empresário, profissional, empresa, restaurante, hotel, grupo hoteleiro, estabelecimento turístico, clube, distribuidor ou entidade equivalente, doravante designado por Cliente."
      ],
      [
        "2. Natureza profissional do serviço",
        "Winerim é uma plataforma SaaS B2B destinada à digitalização, gestão, análise e exploração comercial de cartas de vinhos, adegas, stock, dados de vendas e experiência de serviço em hotelaria.\n\nO Cliente declara que contrata a Winerim no âmbito da sua atividade profissional ou empresarial e não como consumidor ou utilizador final. A Plataforma não se destina à contratação pelos consumidores para fins particulares.\n\nOs comensais, visitantes ou utilizadores finais que consultem um menu digital do Cliente não adquirem a qualidade de clientes contratuais diretos da Winerim, salvo se criarem conta própria, utilizarem funcionalidades independentes ou aceitarem condições específicas adicionais."
      ],
      [
        "3. Objeto contratual e integração do contrato SaaS",
        "Estes Termos constituem o acordo SaaS aplicável entre a Winerim e o Cliente. Não existe um contrato SaaS separado, a menos que as partes assinem condições específicas, uma ordem de serviço, cotação, pedido, adendo ou acordo específico.\n\nO contrato concede ao Cliente uma licença limitada, revogável em caso de incumprimento, não exclusiva, não sublicenciável, intransmissível e condicionada a pagamento para aceder e utilizar a Plataforma durante a vigência da relação contratual e apenas para a Utilização Permitida.\n\nA licença não implica venda, cessão, transmissão ou aquisição de propriedade de software, código, dados, bases de dados, documentação, imagens, taxonomias, impressões digitais, regras, algoritmos, modelos, recomendações, insights, interfaces, designs, know-how ou qualquer outro ativo da Winerim."
      ],
      [
        "4. Aceitação e documentos contratuais",
        "A aceitação destes Termos poderá ser feita mediante assinatura manuscrita ou eletrônica, aceitação no processo de cadastro, confirmação por e-mail, pagamento de assinatura, utilização efetiva da Plataforma, aceitação de orçamento ou qualquer outro ato inequívoco de contratação.\n\nA contratação implica a aceitação dos presentes Termos, da Política de Privacidade, da Política de Cookies quando aplicável, do Anexo da Ordem de Processamento, do formulário de contratação, orçamento, plano, encomenda, fatura ou condições particulares aceites.\n\nEm caso de contradição entre estes Termos e uma condição particular expressamente assinada ou aceita por ambas as partes, a condição particular prevalecerá apenas em relação ao ponto específico regulamentado."
      ],
      [
        "5. Definições essenciais",
        "Plataforma significa o conjunto de aplicações web, aplicações móveis, painéis de controle, bancos de dados, APIs, módulos, serviços, designs, documentação, funcionalidades e sistemas oferecidos sob a marca Winerim.\n\nDados do Menu significam todas as informações relacionadas à carta de vinhos do Cliente, incluindo referências, safras, preços, denominações, regiões, países, vinícolas, uvas, formatos, imagens, descrições, notas de degustação, harmonizações, disponibilidade, categorias, rótulos, idiomas, recomendações, favoritos, ordem de apresentação e quaisquer dados equivalentes.\n\nDados Operacionais significam dados de stock, vendas, rotação, consumo, margens, disponibilidade, histórico, movimentos da adega, desempenho comercial, interações, utilização de filtros, visualizações, cliques, reservas ou encomendas quando existam, integrações com terceiros e qualquer informação relacionada com a gestão ou exploração da carta de vinhos.\n\nConteúdo do Cliente significa logotipos, marcas, imagens, textos, cartas, preços, materiais, dados comerciais e informações fornecidas pelo Cliente.\n\nConteúdo Winerim significa software, código, arquitetura, design, interface, bancos de dados, impressões digitais de vinho, imagens, descrições, traduções, recomendações, taxonomias, dados ricos, modelos, regras, algoritmos, documentação, textos, know-how, métricas, benchmarks, insights, materiais de treinamento e quaisquer ativos criados, licenciados, normalizados ou incorporados pela Winerim.\n\nDados e Ativos Winerim significa, além do Conteúdo Winerim, qualquer conjunto de dados, estrutura de dados, taxonomia, normalização, classificação, enriquecimento, relacionamento de dados, modelo, padrão de uso, classificação, recomendação, métrica, relatório, benchmark, sinal analítico ou conhecimento gerado ou processado pela Winerim.\n\nUtilização Permitida significa a utilização interna, profissional e ordinária da Plataforma pelo Cliente para gerir, visualizar e explorar a sua própria carta de vinhos dentro do estabelecimento, grupo ou conta contratada, sem extração, transferência, revenda, utilização competitiva ou exploração externa dos ativos da Winerim."
      ],
      [
        "6. Escopo geral do serviço",
        "Winerim permite ao Cliente criar, gerir, visualizar, explorar e analisar digitalmente a sua carta de vinhos e a informação associada à sua adega, stock e serviço de quarto.\n\nSalvo indicação em contrário no plano contratado, o serviço pode incluir registo do Cliente, configuração inicial, carregamento inicial do menu disponibilizado, menu digital personalizado, link web ou QR, aplicação descarregável quando disponível, painel de controlo, formatos de visualização, filtros, favoritos, recomendados, seleção, multilingue, ativação e desativação de vinhos, modificação de preços, uvas, colheitas, harmonizações, descrições e notas de prova, pedido de novas referências, análises e apoio ordinário.\n\nA parte frontal do menu digital poderá ser consultada pelos comensais sem qualquer custo adicional direto para os mesmos, sem prejuízo das tarifas pagas pelo Cliente à Winerim.\n\nO menu poderá ser público e acessível a partir de qualquer lugar, sem necessidade de o utilizador final estar fisicamente no estabelecimento, salvo configuração diferente solicitada pelo Cliente e tecnicamente aceite pela Winerim."
      ],
      [
        "7. Serviços não incluídos salvo acordo expresso",
        "Salvo contratação expressa por escrito, não estão incluídos desenvolvimentos personalizados, integrações com POS, PMS, ERP, CRM ou outros sistemas, migrações complexas, purificação avançada de dados, fotografia profissional, impressão de códigos QR ou material físico, formação presencial, consultoria estratégica, auditoria de armazém, gestão de stock operacional por conta do Cliente, suporte fora do horário comercial, SLA específico, APIs privadas, modelos de IA personalizados, traduções profissionais revisadas por humanos, personalização avançada de marca ou funcionalidades não descritas no plano contratado.\n\nA Winerim poderá oferecer serviços adicionais através de orçamento, pedido, anexo ou contrato específico. Seu contrato não modificará automaticamente estes Termos, a menos que expressamente indicado."
      ],
      [
        "8. Registo, implementação e colaboração do Cliente",
        "O Cliente deverá fornecer à Winerim, num formato razoavelmente utilizável, toda a informação necessária à implementação: carta de vinhos, preços, colheitas, stock, imagens, logótipos, dados fiscais, dados de contacto, acessos ou qualquer outro material necessário.\n\nO Cliente é responsável pela veracidade, exatidão, atualização e legalidade dos conteúdos e dados que são entregues, carregados, modificados ou mantidos no Winerim.\n\nOs períodos de ativação ou carregamento começarão a contar a partir do recebimento completo das informações necessárias e, se for o caso, do pagamento inicial. Os tempos de operação são estimativas razoáveis, a menos que sejam expressamente garantidos por escrito.\n\nA Winerim poderá solicitar imagens, fichas técnicas, dados de adegas, colheitas, preços ou outras informações necessárias para criar, completar, corrigir ou enriquecer referências sem pegada digital ou com informação insuficiente."
      ],
      [
        "9. Licença de uso e limites",
        "O Cliente recebe uma licença limitada de utilização da Plataforma apenas durante a vigência da relação contratual, para a sua própria atividade profissional, de acordo com o plano contratado e a Utilização Permitida.\n\nA licença é concedida por conta, estabelecimento, grupo, território, número de usuários, módulos, funcionalidades ou limites de utilização indicados na ficha de contrato ou plano contratado.\n\nO Cliente não poderá sublicenciar, ceder, alugar, vender, revender, disponibilizar a terceiros, explorar como serviço, operar em nome de terceiros, prestar serviços de consultoria baseados no Winerim ou permitir o acesso a terceiros não autorizados sem o consentimento prévio por escrito da Winerim."
      ],
      [
        "10. Proibições Essenciais: Engenharia Reversa, Extração e Exploração de Dados",
        "O Cliente não poderá, direta ou indiretamente, realizar, permitir, facilitar, encomendar ou tentar realizar engenharia reversa, descompilação, desmontagem, análise de código, análise de arquitetura, auditoria técnica não autorizada, digitalização, testes de penetração, exploração de vulnerabilidades, cópia lógica, cópia de fluxo, cópia de interface, cópia de estrutura de dados ou qualquer ação destinada a compreender, replicar, substituir ou competir com Winerim.\n\nÉ proibido baixar, extrair, copiar, indexar, minerar, sincronizar, fotografar sistematicamente, capturar em massa, raspar, rastrear, colher, mineração de dados, abuso de API, consultas automatizadas ou qualquer obtenção massiva ou não autorizada de dados, conteúdo, imagens, arquivos, taxonomias, estruturas, rótulos, classificações, impressões digitais, métricas, insights, recomendações ou documentação da Winerim.\n\nÉ proibido vender, revender, licenciar, alugar, ceder, transferir, publicar, redistribuir, monetizar, comercializar ou explorar de qualquer forma Dados e Ativos Winerim, Conteúdo Winerim, dados enriquecidos, benchmarks, conjuntos de dados, recomendações, modelos, regras, algoritmos, know-how, relatórios, saídas ou resultados gerados pela Plataforma fora do Uso Permitido.\n\nÉ proibida a utilização do Winerim, do seu conteúdo ou dos seus dados para alimentar bases de dados próprias ou de terceiros, treinar, ajustar, avaliar ou melhorar sistemas de inteligência artificial, criar comparadores, marketplaces, motores de busca, catálogos, sistemas de recomendação, soluções de gestão de vinhos, ferramentas analíticas, serviços de consultoria, relatórios setoriais ou produtos concorrentes.\n\nO Cliente não poderá permitir o acesso ou visualização da Plataforma, demos, painéis, documentação, screenshots, configurações, propostas, materiais ou dados a concorrentes diretos ou indiretos da Winerim, ou a terceiros que desenvolvam, comercializem, aconselhem ou invistam em soluções concorrentes, salvo autorização prévia por escrito da Winerim.\n\nA possibilidade técnica de visualizar, baixar, exportar, copiar ou acessar informações não implica autorização legal para sua extração, reutilização, venda, transferência, treinamento de IA, monetização ou exploração fora do Uso Permitido.\n\nO descumprimento desta cláusula será considerado violação fundamental e poderá justificar suspensão imediata, rescisão contratual, bloqueio de acesso, remoção ou destruição de materiais, indenização por danos e exercício de ações judiciais."
      ],
      [
        "11. Dados e ativos de Winerim",
        "Winerim retém todos os direitos sobre seus dados e ativos Winerim, incluindo conjuntos de dados, taxonomias, impressões digitais de vinho, regras de normalização, classificações, modelos, padrões, benchmarks, recomendações, traduções, descrições, imagens, documentação, interfaces, métricas, insights e quaisquer enriquecimentos gerados por Winerim.\n\nO Cliente reconhece que o investimento da Winerim na criação, normalização, curadoria, estruturação e exploração de dados constitui um bem essencial, protegido contratual e legalmente, incluindo, quando aplicável, direitos de propriedade intelectual, direitos de base de dados, segredos comerciais e concorrência desleal.\n\nNenhum dado, tela, relatório, exportação, recomendação, insight ou resultado gerado pela Winerim poderá ser utilizado pelo Cliente para fins diversos da gestão interna do seu cardápio e serviço contratado."
      ],
      [
        "12. Conteúdo do cliente",
        "O Cliente retém a propriedade das suas marcas, logótipos, imagens próprias, cartas, preços, dados comerciais e outros conteúdos originais com que contribui para a Plataforma, desde que seja efetivamente sua propriedade ou tenha direitos suficientes.\n\nO Cliente concede à Winerim uma licença mundial, não exclusiva, gratuita, sublicenciável a fornecedores técnicos, durante a vigência do serviço e pelo tempo necessário posteriormente para cumprimento legal, suporte, cópias de segurança e defesa de direitos, para hospedar, reproduzir, adaptar tecnicamente, traduzir, normalizar, enriquecer, exibir, comunicar publicamente e processar o referido conteúdo na medida necessária para fornecer, melhorar e proteger o serviço.\n\nO Cliente garante que detém direitos suficientes sobre imagens, logótipos, textos, dados, ficheiros, preços e materiais que fornece. Winerim não será responsável por reclamações de terceiros decorrentes do conteúdo fornecido pelo Cliente."
      ],
      [
        "13. Utilização e divulgação pública de cartas de vinhos",
        "O Cliente autoriza expressamente a Winerim a exibir e disponibilizar aos utilizadores finais a carta de vinhos do Cliente e os seus Dados de Menu através da Plataforma, site, app, links, códigos QR, widgets, integrações e canais associados ao serviço.\n\nEsta autorização inclui nomes de vinhos, vinícolas, regiões, denominações, uvas, safras, preços, formatos, imagens, descrições, notas de degustação, harmonizações, rótulos, categorias, idiomas, disponibilidade, recomendações e qualquer informação que faça parte do cardápio digital.\n\nO Cliente reconhece que a exibição pública do menu é uma parte essencial do serviço e que a informação incluída pode ser acessível por clientes, motores de busca, navegadores, sistemas de cache, redes ou terceiros técnicos no âmbito do funcionamento da Internet, a menos que uma configuração diferente seja aceite pela Winerim.\n\nO Cliente será responsável por garantir que os preços, colheitas, disponibilidade, promoções, imagens, direitos de terceiros e outras informações publicadas são corretos, legais e atualizados."
      ],
      [
        "14. Dados de vendas, estoque, faturamento e análise",
        "O Cliente autoriza a Winerim a recolher, armazenar, processar, analisar, visualizar, cruzar, enriquecer e utilizar Dados Operacionais relativos a menu, vendas, stock, rotação, consumo, margens, disponibilidade, histórico, movimentos de armazém, interações, visualizações, filtros, favoritos, reservas ou encomendas quando existirem.\n\nA Winerim poderá utilizar esses dados para prestação do serviço, geração de painéis, métricas, recomendações, alertas, relatórios, comparações internas, detecção de erros, melhoria de funcionalidades, segurança, prevenção de fraudes, suporte, desenvolvimento de produtos e criação de business intelligence para o Cliente.\n\nA Winerim poderá utilizar dados agregados, anonimizados ou dissociados para análises setoriais, benchmarking, estatísticas, relatórios, desenvolvimento de produtos, formação e melhoria de modelos, comunicação comercial, estudos de mercado, recomendações e criação de novos serviços, sempre sem identificar diretamente o Cliente quando se tratar de dados sensíveis sobre vendas, stocks, margens ou desempenho económico, salvo autorização expressa.\n\nWinerim não venderá dados pessoais. A exploração comercial de dados não pessoais, agregados, anonimizados ou gerados pela Winerim não confere ao Cliente direitos de compensação, participação ou controlo adicional, salvo acordo em contrário por escrito."
      ],
      [
        "15. Álcool, regulamentos de hospitalidade e responsabilidade do restaurante",
        "A Winerim não vende, serve, fornece, transporta, distribui ou cobra bebidas alcoólicas aos usuários finais. A Plataforma é uma ferramenta tecnológica de gestão, visualização, análise e suporte comercial.\n\nO Cliente é o único responsável pela venda, serviço, disponibilidade, preços, impostos, licenças, idade legal, consumo responsável, regulamentos de saúde, regulamentos de hospitalidade, regulamentos de publicidade de bebidas alcoólicas e conformidade local aplicável à sua atividade.\n\nAs recomendações, emparelhamentos, classificações, descrições ou sugestões geradas pela Winerim não substituem o julgamento profissional do Cliente ou as suas obrigações legais para com consumidores, autoridades ou terceiros."
      ],
      [
        "16. Inteligência artificial, recomendações e conteúdo automatizado",
        "Winerim pode incorporar sistemas automatizados ou de inteligência artificial para classificar vinhos, enriquecer dados, traduzir, gerar descrições, sugerir emparelhamentos, ordenar resultados, detectar padrões, recomendar referências e melhorar a experiência do usuário.\n\nEssas funcionalidades são ferramentas de suporte. Podem conter erros, omissões, preconceitos, imprecisões ou resultados não apropriados para uma situação específica. O Cliente deverá rever a informação relevante antes de a publicar, de a utilizar comercialmente ou de tomar decisões de compra, venda, stock ou serviço.\n\nA Winerim pode modificar, limitar, substituir, desabilitar ou melhorar as funcionalidades de IA a qualquer momento por razões técnicas, legais, comerciais, de segurança, qualidade ou de fornecedor.\n\nO Cliente não pode usar saídas de IA, recomendações, incorporações, pontuações, prompts, resultados, taxonomias, descrições ou conjuntos de dados gerados pela Winerim para treinar modelos externos, criar produtos concorrentes, vender dados ou alimentar bancos de dados fora do Uso Permitido."
      ],
      [
        "17. Integrações, APIs e terceiros",
        "Winerim pode ser integrado com provedores de pagamento, POS, PMS, ERP, CRM, ferramentas analíticas, serviços de e-mail, hospedagem em nuvem, lojas de aplicativos, provedores de inteligência artificial e outros terceiros.\n\nAs integrações dependerão da disponibilidade, condições, APIs, alterações técnicas, taxas, limitações e decisões desses terceiros. A Winerim não será responsável por falhas, alterações, interrupções, perdas ou limitações imputáveis ​​a terceiros fora do seu controlo razoável.\n\nO Cliente autoriza a Winerim a trocar dados com os terceiros necessários ao ativar uma integração ou quando for essencial para a prestação do serviço, sempre dentro do quadro contratual e de privacidade aplicável."
      ],
      [
        "18. Obrigações de Winerim",
        "A Winerim prestará o serviço com diligência profissional, de acordo com os usos habituais do setor SaaS e com meios técnicos e humanos razoavelmente disponíveis.\n\nA Winerim procederá ao carregamento inicial da carta fornecida pelo Cliente de acordo com o plano contratado e a informação recebida. A veracidade final dos preços, disponibilidade, colheitas, stocks e dados comerciais será da responsabilidade do Cliente.\n\nA Winerim esforçar-se-á por informar o Cliente sobre incidentes relevantes que afetem substancialmente o serviço quando tiver conhecimento dos mesmos e for razoavelmente possível."
      ],
      [
        "19. Obrigações do Cliente",
        "O Cliente deverá pagar prontamente as taxas contratadas, impostos, taxas bancárias, encargos de devolução e quaisquer valores pendentes de acordo com estes Termos.\n\nO Cliente deverá utilizar a Plataforma de acordo com a lei, boa fé, documentação, instruções Winerim e Uso Permitido.\n\nO Cliente deve treinar seu pessoal autorizado, controlar credenciais, revisar a carta publicada, manter os dados atualizados e não fazer upload de informações ilegais, desnecessárias, falsas, protegidas ou de terceiros sem direitos suficientes.\n\nO Cliente será responsável por quaisquer ações de seus administradores, funcionários, colaboradores, fornecedores ou terceiros autorizados que acessem a Plataforma por conta própria ou sob suas credenciais."
      ],
      [
        "20. Contas de clientes, credenciais e segurança",
        "O Cliente será responsável por salvaguardar credenciais, usuários administrativos, permissões e acessos. Qualquer ação realizada a partir de uma conta de Cliente será presumida como tendo sido realizada pelo Cliente ou por uma pessoa autorizada, salvo prova em contrário.\n\nO Cliente deverá notificar imediatamente a Winerim sobre qualquer acesso não autorizado, perda de credenciais, uso indevido, vazamento de dados ou incidente de segurança que afete sua conta.\n\nA Winerim pode bloquear, suspender, restaurar ou limitar o acesso quando houver indicações razoáveis de risco, abuso, uso não autorizado, scraping, extração, violação de segurança ou quebra de contrato."
      ],
      [
        "21. Suporte, manutenção e atualizações",
        "O suporte ordinário será prestado através dos canais habilitados pela Winerim, incluindo painel, email ou outro meio indicado, dentro do horário de funcionamento comunicado ou contratado.\n\nWinerim é um produto vivo e em constante evolução. A Winerim poderá introduzir atualizações, melhorias, alterações técnicas, automações, integrações, modificações de interface, novos módulos, ajustes arquitetônicos, patches de segurança e alterações funcionais.\n\nAs atualizações poderão modificar a aparência, fluxos, funcionalidades, campos, filtros, módulos ou forma de prestação do serviço, desde que não esvaziem o serviço contratado de conteúdos essenciais.\n\nWinerim pode realizar manutenções programadas ou emergenciais. Em situações críticas, de segurança ou de terceiros, o serviço poderá ser interrompido sem aviso prévio, tentando restabelecê-lo no menor prazo razoável."
      ],
      [
        "22. Disponibilidade e ausência de garantia absoluta",
        "A Winerim se esforçará para manter a Plataforma disponível de acordo com os padrões razoáveis da indústria SaaS, mas não garante disponibilidade ininterrupta, completa ausência de erros, compatibilidade permanente com todos os dispositivos, navegadores ou sistemas, ou continuidade indefinida de todas as funcionalidades.\n\nA menos que haja um SLA assinado, a Plataforma é fornecida de forma razoável e conforme disponível, sem compromissos de disponibilidade, créditos de serviço ou compensação automática por interrupções.\n\nA Winerim não será responsável por interrupções, interrupções, perda de conectividade, lentidão, indisponibilidade ou erros causados por provedores de nuvem, internet, lojas de aplicativos, Stripe, APIs de terceiros, dispositivos do Cliente, redes locais, configurações incorretas, força maior ou eventos fora de seu controle razoável."
      ],
      [
        "23. Recursos beta, pilotos e testes",
        "Winerim pode oferecer funcionalidades beta, pilotos, testes, módulos experimentais ou acesso antecipado. Estas funcionalidades são oferecidas sem garantia de continuidade, estabilidade, disponibilidade, resultados ou permanência.\n\nWinerim pode modificar, limitar ou retirar funcionalidades beta a qualquer momento sem gerar direito a compensação, salvo acordo em contrário por escrito."
      ],
      [
        "24. Preço, cobrança internacional, impostos e forma de pagamento",
        "O Cliente pagará à Winerim LLC os valores indicados no plano, orçamento, formulário de contrato, fatura, link de pagamento ou condição particular aceita, normalmente em dólares dos Estados Unidos (USD), salvo acordo em contrário por escrito.\n\nOs preços não incluem impostos, taxas, encargos, retenções, encargos bancários, comissões de transferência, encargos cambiais, encargos de intermediários financeiros ou encargos equivalentes aplicáveis ​​na jurisdição do Cliente ou em operações de cobrança internacional.\n\nQuando a regulamentação local do Cliente exigir retenções, pagamentos ou deduções sobre pagamentos no exterior, esses encargos serão assumidos pelo Cliente por meio de gross-up, para que a Winerim LLC receba a totalidade do valor líquido acordado.\n\nA faturação poderá ser mensal, anual, por piloto, por grupo, por estabelecimento, por módulo ou de acordo com a modalidade contratada. O pagamento pode ser feito por cartão, transferência, Stripe ou outro meio aceito pela Winerim.\n\nO Cliente será responsável pelo cumprimento das obrigações fiscais, cambiais, aduaneiras, importação de serviços, registo de pagamentos no estrangeiro, retenções ou declarações que sejam aplicáveis no seu país."
      ],
      [
        "25. Atualização anual de preços",
        "O Cliente reconhece e aceita que a Winerim poderá atualizar automaticamente os seus preços a cada ano civil.\n\nA partir de 1º de janeiro de cada ano, Winerim poderá aplicar uma atualização anual de preços entre cinco por cento (5%) e dez por cento (10%) sobre os preços em vigor durante o ano anterior.\n\nEsta atualização responderá, entre outros motivos, ao aumento operacional, tecnológico, infraestrutura, suporte, manutenção, desenvolvimento de produtos, segurança, fornecedores externos, inflação, evolução da Plataforma e novas funcionalidades.\n\nA atualização anual entende-se aceite a partir do momento da contratação, pois faz parte das condições económicas do contrato e não necessitará de aceitação adicional. A Winerim poderá comunicá-lo por email, plataforma, fatura, orçamento, renovação, comunicação comercial ou qualquer outro meio escrito, sem que a falta de comunicação individualizada impeça a sua aplicação quando estiver dentro do intervalo acordado.\n\nCaso o Cliente não fique satisfeito, poderá solicitar o cancelamento de acordo com o procedimento de cancelamento previsto nestes Termos."
      ],
      [
        "26. Modificação extraordinária de preços, planos e serviços",
        "Além da atualização anual ordinária, a Winerim poderá modificar preços, planos, módulos, limites de utilização, funcionalidades ou condições económicas por motivos técnicos, comerciais, operacionais, fiscais, regulatórios, cambiais, fornecedores externos, segurança ou evolução do produto.\n\nQuando a modificação implicar um aumento do preço recorrente contratado fora da atualização anual ordinária, a Winerim notificará o Cliente pelo menos quinze (15) dias corridos antes do próximo pagamento ou renovação.\n\nCaso o Cliente não fique satisfeito, poderá solicitar o cancelamento de acordo com o procedimento estabelecido. O não cancelamento dentro do prazo ou a continuidade do uso será entendido como aceitação das novas condições econômicas."
      ],
      [
        "27. Cancelamento e rescisão do serviço",
        "O Cliente poderá solicitar o cancelamento da sua subscrição exclusivamente através de comunicação escrita enviada por email para cancel@winerim.com.\n\nA solicitação de cancelamento deverá ser recebida com pelo menos quinze (15) dias corridos de antecedência da data do próximo período de pagamento, renovação ou cobrança.\n\nO pedido deverá ser enviado a partir do e-mail associado à conta do Cliente ou de um e-mail que permita identificar razoavelmente o Cliente, e incluir, pelo menos, a denominação social, razão social do estabelecimento, identificação fiscal, país, serviço ou subscrição cujo cancelamento é solicitado e a data de cancelamento solicitada.\n\nSolicitações realizadas por telefone, WhatsApp, mensagem verbal, redes sociais, mensagens para vendedores, gestores, funcionários, suporte operacional ou qualquer canal que não seja cancel@winerim.com não serão válidas para fins de cancelamento contratual.\n\nO cancelamento entrará em vigor no final do período de faturação em curso se o pedido for recebido com a antecedência mínima indicada. Se recebido menos de quinze (15) dias corridos, o cancelamento entrará em vigor no final do período de cobrança seguinte, ficando o Cliente obrigado ao pagamento desse período.\n\nO cancelamento não dará direito ao reembolso de valores já faturados ou pagos, salvo acordo expresso por escrito da Winerim ou exigência legal. O cancelamento não isenta do pagamento de valores vencidos, faturas pendentes, impostos, comissões, serviços adicionais prestados ou valores acumulados antes da data efetiva do cancelamento."
      ],
      [
        "28. Não pagamentos, devoluções e suspensão",
        "Em caso de não pagamento, atraso, devolução de recibos, estorno, falha do cartão, rejeição bancária ou incidente de cobrança, a Winerim poderá reclamar o valor em dívida, taxas bancárias, custos de cobrança razoáveis e juros legalmente aplicáveis.\n\nA Winerim poderá suspender total ou parcialmente o acesso à Plataforma mediante falta de pagamento ou após aviso prévio razoável, dependendo da gravidade, sem que a suspensão exonere o Cliente das suas obrigações de pagamento.\n\nSe o não pagamento persistir por mais de sete (7) dias corridos a partir da suspensão ou exigência, a Winerim poderá rescindir a relação contratual, eliminar ou limitar o acesso e reclamar valores pendentes, danos, custos e perdas."
      ],
      [
        "29. Duração e renovação",
        "A duração inicial será a indicada no plano, formulário de contratação, orçamento, fatura, ordem de serviço ou condição particular aceita. Na falta de indicação expressa, a duração será renovável mensalmente.\n\nSalvo cancelamento válido de acordo com a cláusula de cancelamento, a assinatura será renovada automaticamente por períodos equivalentes sucessivos, aplicando-se as taxas vigentes, atualizações anuais e condições económicas aplicáveis.\n\nNos contratos anuais, pilotos com preço fixo, compromissos mínimos ou contratos com permanência, não haverá reembolso de períodos já iniciados, salvo acordo escrito diferente ou exigência legal."
      ],
      [
        "30. Suspensão e resolução por descumprimento",
        "A Winerim poderá suspender ou encerrar o serviço, com efeitos imediatos ou após pedido de retificação consoante a gravidade, em casos de não pagamento, utilização ilícita ou abusiva, violação de propriedade intelectual, quebra de confidencialidade, acesso ou transferência não autorizada, utilização por ou para concorrentes, engenharia inversa, scraping, extração de dados, formação não autorizada de IA, monetização de dados ou qualquer ação que coloque em risco os ativos, a segurança ou a posição competitiva da Winerim.\n\nNesses casos, a Winerim poderá bloquear o acesso, exigir a cessação imediata, ordenar a remoção ou destruição de materiais, revogar licenças, preservar provas técnicas, reclamar indemnizações e tomar medidas legais.\n\nO Cliente poderá rescindir a relação se a Winerim incorrer numa violação grave que não tenha sido sanada num prazo razoável de trinta (30) dias a partir do pedido escrito, desde que a violação seja imputável à Winerim e não decorra de terceiros, de força maior, de falta de pagamento ou de ações do Cliente."
      ],
      [
        "31. Efeitos da rescisão",
        "Terminada a relação, cessará imediatamente o direito do Cliente de utilização da Plataforma e a Winerim poderá desativar o acesso, remover cartas públicas, interromper integrações e limitar funcionalidades.\n\nA menos que seja técnica ou legalmente impossível, a Winerim permitirá que o Cliente solicite, durante trinta (30) dias corridos a partir da rescisão, uma exportação razoável de suas informações operacionais hospedadas na Plataforma, desde que o Cliente esteja em dia com o pagamento e a exportação não inclua Dados e Ativos da Winerim, dados de outros clientes, segredos comerciais, taxonomias proprietárias, modelos, regras, estruturas, conjuntos de dados enriquecidos ou informações não exportáveis.\n\nA Winerim poderá reter informação necessária ao cumprimento legal, faturação, segurança, defesa de reclamações, provas de incumprimento, cópias de segurança e registos internos, bem como dados agregados, anonimizados ou dissociados.\n\nAs cláusulas de propriedade intelectual, proibições de uso, não extração, confidencialidade, proteção de dados, limitação de responsabilidade, indenização, pagamentos pendentes, jurisdição e quaisquer outras que por sua natureza devam subsistir permanecerão em vigor após a rescisão."
      ],
      [
        "32. Confidencialidade e segredos comerciais",
        "Ambas as partes comprometem-se a manter a confidencialidade da informação técnica, comercial, estratégica, operacional, económica, financeira, jurídica, de produtos, de segurança, de clientes, de preços, de roadmap, de dados e de know-how a que acedam durante a relação.\n\nO Cliente reconhece que o software, arquitetura, bancos de dados, taxonomias, modelos, recomendações, métricas, documentação, fluxos, interfaces, lógica de negócios, dados ricos e know-how da Winerim podem constituir segredos comerciais.\n\nA obrigação de confidencialidade permanecerá durante a relação contratual e por 5 (cinco) anos após o seu término. As informações que constituam segredo comercial, know-how, código, arquitetura, modelos, dados, segurança ou ativos estratégicos da Winerim serão protegidas enquanto assim permanecerem.\n\nO Cliente não poderá revelar a terceiros informações sobre operação, funcionalidades, detalhes técnicos, estratégia, documentação, propostas, preços não públicos, roadmap, dados, benchmarks ou materiais Winerim sem autorização por escrito."
      ],
      [
        "33. Propriedade intelectual e industrial e bases de dados",
        "Todos os direitos de propriedade intelectual e industrial sobre a Winerim, software, código, arquitetura, design, interface, marca, logótipos, documentação, bases de dados, taxonomias, modelos, algoritmos, regras, imagens, descrições, traduções, materiais, desenvolvimentos, melhorias e ativos associados pertencem à Winerim ou aos seus licenciantes.\n\nO Cliente não adquire direitos de propriedade ou exploração através da contratação, acesso ou visualização da Plataforma. Quaisquer direitos não concedidos expressamente são reservados à Winerim.\n\nÉ proibido reproduzir, modificar, distribuir, transformar, comunicar publicamente, disponibilizar, sublicenciar, revender, criar trabalhos derivados, clonar, copiar, registrar, treinar modelos, explorar conjuntos de dados ou usar ativos do Winerim fora do Uso Permitido.\n\nAs fotografias, textos, descrições, arquivos, traduções, notas de degustação, emparelhamentos, rótulos, taxonomias e conteúdos fornecidos ou enriquecidos pela Winerim não poderão ser utilizados fora da Plataforma sem consentimento prévio por escrito."
      ],
      [
        "34. Uso comercial de nome, logotipo e histórias de sucesso",
        "Salvo oposição escrita do Cliente ou acordo privado diferente, a Winerim poderá mencionar o Cliente como cliente da Winerim e utilizar o seu nome comercial e logotipo no site, propostas, apresentações, redes sociais, materiais comerciais, portfólio e comunicações corporativas.\n\nA publicação de métricas individualizadas, resultados económicos, dados de vendas, stocks, margens ou histórias de sucesso identificáveis necessitará de autorização prévia do Cliente, salvo se forem utilizados dados agregados, anonimizados ou não identificáveis."
      ],
      [
        "35. Proteção de dados, privacidade e cookies",
        "O tratamento de dados pessoais será regido pela Política de Privacidade da Winerim e, quando aplicável, pelo Anexo de Ordem de Tratamento incluído nestes Termos ou por DPA específico.\n\nCada parte será responsável pelo tratamento dos dados pessoais realizado em seu próprio nome. Quando a Winerim tratar dados pessoais em nome do Cliente, atuará como processador de dados de acordo com o Anexo correspondente.\n\nO Cliente declara ter base legal suficiente para incorporar dados pessoais na Plataforma e compromete-se a não carregar dados desnecessários, ilícitos, especialmente protegidos ou de terceiros sem legitimidade.\n\nA utilização de cookies e tecnologias similares está atualmente limitada aos cookies técnicos estritamente necessários ao normal funcionamento da Plataforma e das tecnologias Stripe associadas ao processo de pagamento, gestão de subscrições, segurança e prevenção de fraudes. Se no futuro a Winerim incorporar cookies desnecessários, como analíticos, publicitários, de medição ou de personalização não essenciais, informará o utilizador e permitirá mecanismos de aceitação, rejeição ou configuração quando legalmente aplicável."
      ],
      [
        "36. Segurança, auditorias e medidas técnicas",
        "A Winerim aplicará medidas técnicas e organizacionais razoáveis para proteger a Plataforma, os dados e os ativos, incluindo controle de acesso, autenticação, funções, medidas de confidencialidade, backups, monitoramento, segurança do fornecedor e gerenciamento de incidentes, conforme apropriado.\n\nO Cliente não poderá realizar testes de segurança, pentesting, scans, auditorias técnicas, análises de vulnerabilidades ou monitoramento não autorizado no Winerim sem autorização prévia por escrito.\n\nA Winerim pode monitorar logs, padrões de uso, acessos, solicitações, dispositivos, IPs, downloads, uso e atividade de API para detectar fraude, abuso, scraping, engenharia reversa, extração de dados, uso competitivo, vulnerabilidades ou violações."
      ],
      [
        "37. Limitação de responsabilidade",
        "A Winerim apenas será responsável pelos danos diretos diretamente comprovados resultantes de incumprimento contratual imputáveis à Winerim.\n\nSalvo fraude, negligência grave ou responsabilidades que não possam ser legalmente excluídas, a responsabilidade total acumulada da Winerim será limitada ao valor efetivamente pago pelo Cliente à Winerim nos doze (12) meses anteriores ao evento que deu origem à reclamação.\n\nA Winerim não será responsável por lucros cessantes, perda de receitas, perda de oportunidade, perda de reputação, decisões comerciais do Cliente, perda de dados não atribuíveis à Winerim, interrupções de terceiros, falhas na Internet, erros no conteúdo do Cliente, imprecisões nas cartas, disponibilidade real de produtos, conformidade com regulamentos sobre bebidas alcoólicas, ou danos indiretos, incidentais, especiais, punitivos ou consequenciais.\n\nA Plataforma é fornecida tal como está e conforme disponível, salvo garantias expressas acordadas por escrito. Winerim não garante que as recomendações, emparelhamentos, traduções, análises, previsões ou resultados sejam precisos, completos ou apropriados para todos os casos."
      ],
      [
        "38. Indenização do Cliente",
        "O Cliente isentará a Winerim de reclamações, penalidades, danos, custos, despesas, taxas, perdas ou responsabilidades decorrentes de conteúdo contribuído pelo Cliente, não conformidade legal, uso indevido, não pagamento, violação de direitos de terceiros, regulamentos sobre álcool, licenças, tributação local, acesso não autorizado, extração de dados, engenharia reversa, uso competitivo ou violação destes Termos.\n\nSe a Winerim receber uma reclamação de um terceiro, autoridade ou concorrente decorrente das ações do Cliente, o Cliente colaborará na defesa, assumirá custos razoáveis e compensará os danos e despesas na medida legalmente apropriada."
      ],
      [
        "39. Força maior",
        "Nenhuma das partes será responsável por atrasos ou incumprimentos resultantes de causas fora do seu controlo razoável, incluindo desastres naturais, incêndios, inundações, pandemias, conflitos, ações governamentais, greves, falhas de energia, falhas generalizadas de telecomunicações, ataques a infraestruturas, ataques cibernéticos, interrupções de fornecedores críticos, indisponibilidade de lojas de aplicações ou alterações regulamentares imprevistas.\n\nA parte afetada esforçar-se-á por comunicar a situação e mitigar os seus efeitos quando for razoavelmente possível. Se um motivo de força maior impedir substancialmente a prestação por mais de trinta (30) dias, qualquer uma das partes poderá rescindir o serviço afetado sem penalidade, sem prejuízo dos valores acumulados."
      ],
      [
        "40. Transferência, subcontratação e operações societárias",
        "O Cliente não poderá ceder, transferir ou subcontratar os seus direitos ou obrigações sem o prévio consentimento escrito da Winerim.\n\nA Winerim poderá subcontratar parte da prestação do serviço com fornecedores técnicos, profissionais, de cloud, de pagamentos, de suporte, de analytics, de IA, de integrações ou outros necessários, mantendo a responsabilidade contratual que legalmente lhe corresponda.\n\nA Winerim poderá ceder estes Termos, a relação contratual, créditos, direitos, obrigações ou dados associados no âmbito de reorganização societária, fusão, aquisição, venda de negócio, financiamento, contribuição de ramo de atividade ou transferência de ativos vinculados à Winerim, notificando-o quando for razoável ou legalmente exigido."
      ],
      [
        "41. Notificações",
        "Para notificações ordinárias, a Winerim poderá utilizar o e-mail fornecido pelo Cliente, avisos na Plataforma, fatura, orçamento, painel, site ou qualquer outro meio escrito razoável.\n\nO Cliente deverá manter os seus dados de contacto atualizados. As notificações enviadas para o email registado serão consideradas validamente efetuadas, salvo se houver erro imputável à Winerim.\n\nAs comunicações de cancelamento só serão válidas se forem enviadas para cancel@winerim.com de acordo com a cláusula de cancelamento."
      ],
      [
        "42. Conformidade regulatória e sanções",
        "O Cliente declara não estar sujeito a sanções, embargos, restrições comerciais ou proibições que impeçam a contratação com a Winerim ou a utilização da Plataforma.\n\nO Cliente concorda em não utilizar Winerim em atividades ilegais, territórios proibidos, setores restritos, para fraude, lavagem de dinheiro, evasão fiscal, violação de direitos, scraping, concorrência desleal ou incumprimento de leis de controle de exportação, sanções internacionais ou regulamentos equivalentes."
      ],
      [
        "43. Modificação destes Termos",
        "A Winerim pode atualizar estes Termos para refletir alterações legais, técnicas, operacionais, comerciais, de segurança, fornecedores, funcionalidades, estrutura corporativa, modelo de negócios ou riscos detectados.\n\nQuando uma modificação afetar materialmente os direitos ou obrigações essenciais do Cliente, a Winerim se esforçará para comunicá-la por e-mail, aviso na Plataforma, fatura, site ou outro meio razoável antes de entrar em vigor.\n\nA continuação da utilização da Plataforma após a entrada em vigor será entendida como aceitação dos novos Termos, sem prejuízo do direito do Cliente de solicitar o cancelamento de acordo com o procedimento estabelecido."
      ],
      [
        "44. Nulidade parcial, interpretação e concordância integral",
        "Se alguma cláusula for declarada nula, inválida ou inaplicável, isso não afetará o restante do contrato, que permanecerá em vigor. A cláusula afetada será substituída por outra válida e próxima da finalidade económica e jurídica prosseguida.\n\nA falha de Winerim em exercer um direito não constituirá uma renúncia. Os títulos são indicativos e não limitam o conteúdo das cláusulas.\n\nEstes Termos, juntamente com a Política de Privacidade, Política de Cookies, Anexo de Ordem de Processamento, formulário de contrato, orçamento, pedido, plano, fatura ou condições particulares aceitas, constituem o acordo completo entre as partes e substituem qualquer comunicação ou acordo anterior sobre o mesmo assunto."
      ],
      [
        "45. Lei aplicável e jurisdição internacional",
        "Estes Termos serão regidos e interpretados de acordo com as leis do Estado da Flórida, Estados Unidos da América, sem prejuízo dos regulamentos obrigatórios que possam ser aplicáveis na jurisdição do Cliente.\n\nPara qualquer controvérsia decorrente da interpretação, cumprimento, violação ou rescisão destes Termos, as partes submetem-se à jurisdição exclusiva dos tribunais estaduais ou federais localizados no Condado de Miami-Dade, Flórida, Estados Unidos da América, renunciando a qualquer outra jurisdição que lhes possa ser aplicável, salvo obrigação em contrário.\n\nO Cliente reconhece que o contrato é B2B e que não atua como consumidor. Se regras de proteção locais obrigatórias forem aplicáveis ​​em qualquer jurisdição, estas serão aplicadas apenas na medida estritamente obrigatória."
      ],
      [
        "46. Contatos",
        "Para suporte, incidentes comuns e comunicações gerais: info@winerim.com.\n\nPara cancelamento ou solicitação de cancelamento do serviço: cancel@winerim.com, único canal contratual válido para cancelamentos.\n\nPara privacidade e proteção de dados: info@winerim.com.\n\nANEXO I. Formulário de Contratação/Ordem de Serviço\n\nEsta ficha de contratação pode ser preenchida para cada cliente ou incorporada num orçamento, encomenda, oferta, link de pagamento, fatura pró-forma ou documento equivalente. Em caso de contradição, o que estiver especificamente acordado nesta ficha prevalecerá apenas no que diz respeito à matéria regulamentada específica.\n\nNome da empresa do cliente\n\n[CUSTOMER_SOCIAL_NATURE]\n\nNome comercial/estabelecimento\n\n[BUSINESS_NAME]\n\nEndereço do estabelecimento\n\n[ESTABLISHMENT_ADDRESS]\n\nID fiscal\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPessoa de contato\n\n[CONTACT_NAME]\n\nE-mail operacional\n\n[OPERATIONAL_EMAIL]\n\nE-mail de cobrança\n\n[BILLING_EMAIL]\n\nPlano contratado\n\n[PLANO]\n\nPeriodicidade\n\n[MENSAL / ANUAL / PILOTO / GRUPO]\n\nPreço\n\n[QUANTIA] USD + impostos, retenções e despesas aplicáveis\n\nData de ativação\n\n[ACTIVATION_DATE]\n\nEstadia inicial\n\n[SIM / NÃO / DURAÇÃO]\n\nMétodo de pagamento\n\n[CARTÃO / TRANSFERÊNCIA / DESMICILIAÇÃO DIRETA / OUTRO]\n\nSuporte incluído\n\n[AGENDAMENTO / CANAIS / SLA SE EXISTIR]\n\nServiços adicionais incluídos\n\n[DESCRIÇÃO]\n\nServiços excluídos ou a orçamentar\n\n[DESCRIÇÃO]\n\nAutorização de uso de logotipo\n\n[SIM / NÃO / CONDIÇÕES]\n\nCondições específicas\n\n[CONDIÇÕES_ESPECIAIS]\n\nAssinatura ou aceitação: o Cliente aceita estes Termos mediante assinatura, aceitação eletrónica, confirmação escrita, pagamento, utilização efetiva da Plataforma ou qualquer outro ato inequívoco de contratação.\n\nANEXO II. Acordo da Comissão de Processamento de Dados\n\nA.1. Objeto, duração e propósito\n\nEste Anexo regula o tratamento de dados pessoais que a Winerim pode realizar em nome do Cliente quando o Cliente atua como responsável pelo tratamento dos dados e a Winerim como subcontratante, no âmbito da prestação do serviço SaaS.\n\nA finalidade do tratamento é permitir a disponibilização da Plataforma, incluindo alojamento, configuração, publicação de gráficos digitais, painel de controlo, suporte, manutenção, segurança, análises, integrações e serviços associados.\n\nA duração coincidirá com a vigência da relação contratual e com os períodos subsequentes necessários para devolução, eliminação, bloqueio, conservação legal, cópias de segurança, defesa contra reclamações ou cumprimento regulamentar.\n\nA.2. Categorias de dados e pessoas afetadas\n\nOs dados podem incluir dados de identificação e contacto de representantes, administradores, funcionários, colaboradores ou utilizadores autorizados do Cliente; credenciais; registros; dados de uso; dados de apoio; Informações de pagamento; e, quando o Cliente os incorpora ou conecta, dados operacionais vinculados a vendas, estoque, pedidos, reservas, preferências ou interações.\n\nAs pessoas afetadas poderão ser representantes do Cliente, funcionários do estabelecimento, administradores, colaboradores, fornecedores, comensais ou utilizadores finais, sempre na medida em que os seus dados sejam tratados no serviço.\n\nNão está previsto o tratamento de categorias especiais de dados pessoais. O Cliente não deve incorporar dados sobre saúde, ideologia, religião, filiação sindical, dados biométricos, genéticos, vida sexual, orientação sexual, infracções penais ou outros dados especialmente protegidos, salvo instrução documentada, base legal suficiente e aceitação expressa por parte da Winerim.\n\nA.3. Instruções do cliente\n\nA Winerim processará dados pessoais em nome do Cliente apenas de acordo com estes Termos, a Política de Privacidade, as instruções documentadas do Cliente e os regulamentos aplicáveis.\n\nSe a Winerim considerar que uma instrução viola os regulamentos aplicáveis, poderá informar o Cliente e suspender a sua execução na medida necessária para evitar violações legais, riscos de segurança ou danos a terceiros.\n\nA.4. Obrigações de Winerim como gestor\n\nA Winerim compromete-se a processar os dados de acordo com instruções documentadas; garantir que as pessoas autorizadas a tratá-los estão sujeitas ao dever de confidencialidade; aplicar medidas técnicas e organizacionais adequadas; auxiliar razoavelmente o Cliente com solicitações de direitos, lacunas, avaliações de impacto ou consultas prévias, quando apropriado; e eliminar ou devolver os dados no final do serviço, salvo se houver obrigação de os conservar.\n\nA assistência que excede o apoio normal, requer desenvolvimentos, auditorias específicas, exportações complexas ou tarefas extraordinárias pode ser orçamentada separadamente.\n\nA.5. Subprocessadores\n\nO Cliente autoriza a Winerim a usar subprocessadores necessários para fornecer o serviço, incluindo provedores de hospedagem, armazenamento, segurança, monitoramento, pagamentos, cobrança, e-mail, suporte, análise, inteligência artificial, tradução, integrações, lojas de aplicativos e outros serviços técnicos.\n\nA Winerim exigirá que seus subprocessadores tenham obrigações de proteção de dados substancialmente equivalentes às assumidas neste Anexo. A Winerim poderá incorporar ou substituir subcontratantes quando necessário para a prestação do serviço, informando pelos meios razoáveis ​​quando legalmente exigido.\n\nA lista real de subprocessadores deve ser mantida atualizada na documentação interna ou pública da Winerim e fornecida ao Cliente mediante solicitação razoável.\n\nA.6. Transferências internacionais\n\nQuando o tratamento envolver transferências internacionais de dados pessoais para fora do Espaço Económico Europeu ou territórios com decisão de adequação, a Winerim adotará garantias adequadas de acordo com o RGPD, incluindo cláusulas contratuais-tipo, decisões de adequação, medidas complementares ou outros mecanismos legalmente válidos. Dado que a Winerim LLC está localizada nos Estados Unidos, as partes reconhecem que pode haver acesso ou processamento a partir dos Estados Unidos e que as garantias aplicáveis ​​devem ser documentadas quando o processamento estiver sujeito ao RGPD ou outros regulamentos equivalentes.\n\nA.7. Segurança e violações\n\nWinerim aplicará medidas proporcionais de controle de acesso, confidencialidade, integridade, disponibilidade, segregação lógica, backups, monitoramento, gerenciamento de incidentes, criptografia quando apropriado e segurança organizacional.\n\nCaso se verifique uma violação de segurança dos dados pessoais que afete os dados tratados em nome do Cliente, a Winerim notificará o Cliente sem demora injustificada, logo que tenha conhecimento razoável do incidente, fornecendo a informação disponível para que o Cliente possa cumprir com as suas obrigações legais.\n\nA.8. Direitos das partes interessadas e auditorias\n\nQuando a Winerim receber um pedido de acesso, retificação, eliminação, oposição, limitação ou portabilidade relacionado com dados tratados em nome do Cliente, encaminhará o pedido ao Cliente ou prestará assistência razoável, a menos que a Winerim atue como controlador independente no que diz respeito a tal processamento.\n\nO Cliente poderá solicitar informações razoáveis para verificar a conformidade com este Adendo. As auditorias presenciais ou técnicas exigirão aviso prévio, confidencialidade, escopo limitado, nenhum impacto na segurança ou em outros clientes e poderão estar sujeitas a custos quando excederem a assistência normal.\n\nA.9. Devolução e exclusão\n\nNo final do contrato, a Winerim eliminará ou devolverá os dados pessoais tratados em nome do Cliente de acordo com instruções razoáveis, salvo obrigação legal de conservação, bloqueio, defesa de reclamações, cópias de segurança ou necessidade técnica temporária.\n\nA eliminação de dados não afetará os dados agregados, anonimizados ou dissociados que não permitam identificar razoavelmente uma pessoa singular."
      ]
    ],
    "links": [
      [
        "Início",
        "/pt"
      ],
      [
        "Produto",
        "/pt/software-carta-vinhos"
      ],
      [
        "Demo",
        "/pt/demo"
      ],
      [
        "Contacto",
        "/pt/contacto"
      ],
      [
        "Privacidade",
        "/pt/privacidade"
      ]
    ]
  }
};

const STATIC_WORKER_PRERENDER_PAGES = {
  ...CLOUDRIM_WORKER_PAGES,
  ...SAVIA_WORKER_PAGES,
  ...ONLINE_TOOL_WORKER_PAGES,
  ...LEGACY_TOOL_WORKER_PAGES,
  '/politica-privacidad': {
  "lang": "es",
  "title": "Política de Privacidad · España | Winerim",
  "description": "Política de privacidad de Winerim para clientes, usuarios y visitantes en España.",
  "h1": "Política de Privacidad · España",
  "subtitle": "Baja contractual · cancel@winerim.com · Documento independiente de privacidad para clientes, usuarios y visitantes en España. · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
  "canonical": "/politica-privacidad",
  "schemaType": "WebPage",
  "robots": "noindex, follow",
  "sections": [
    [
      "Documento",
      "Política de Privacidad"
    ],
    [
      "Territorio",
      "España"
    ],
    [
      "Responsable",
      "Basque Highlands S.L. · CIF B01729607"
    ],
    [
      "Domicilio",
      "Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, España"
    ],
    [
      "Contacto privacidad",
      "info@winerim.com"
    ],
    [
      "Marco",
      "RGPD · LOPDGDD · LSSI · Cookies"
    ],
    [
      "Versión",
      "Versión 4.0 · 7 de julio de 2026"
    ],
    [
      "1. Responsable del tratamiento y contacto",
      "El responsable del tratamiento será Basque Highlands S.L., con CIF B01729607, con domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim, respecto de los tratamientos propios descritos en esta Política.\n\nContacto para privacidad y ejercicio de derechos: info@winerim.com. Las solicitudes de baja contractual del servicio no se gestionan por este canal y deberán enviarse exclusivamente a cancel@winerim.com conforme a los Términos y Condiciones.\n\nDelegado de Protección de Datos: [NO DESIGNADO / DATOS_DPO], salvo que Winerim comunique otro dato en su web o documentación contractual."
    ],
    [
      "2. Ámbito de aplicación",
      "Esta Política regula los tratamientos de datos personales realizados por Basque Highlands S.L. en relación con Winerim para clientes ubicados en España, usuarios autorizados, usuarios finales, visitantes web, proveedores, partners y contactos comerciales.\n\nEsta Política se aplica a clientes profesionales, representantes, usuarios administradores, empleados o colaboradores del Cliente, usuarios finales que visualizan o interactúan con cartas digitales, visitantes de la web, leads comerciales, proveedores, partners, candidatos y otras personas que se relacionen con Winerim.\n\nCuando Winerim trate datos personales por cuenta del Cliente dentro de la Plataforma, Winerim actuará como encargado del tratamiento y el Cliente será responsable de determinar la base jurídica, finalidad y contenido de los datos que introduce en el Servicio. En esos casos se aplicará el Acuerdo de Encargo de Tratamiento incluido en los Términos o documento específico."
    ],
    [
      "3. Categorías de datos tratados",
      "• Datos identificativos y de contacto: nombre, apellidos, cargo, empresa, email, teléfono, dirección profesional, país e idioma.\n\n• Datos de cuenta y autenticación: usuarios, roles, permisos, credenciales cifradas o tokens, registros de acceso, cambios de configuración y logs de actividad.\n\n• Datos contractuales y de facturación: razón social, NIF/CIF/VAT/ID fiscal, domicilio, plan, precio, facturas, pagos, método de pago, vencimientos, renovaciones, bajas, impagos y comunicaciones comerciales.\n\n• Datos de carta y negocio: referencias de vino, precios, añadas, stock, ventas, rotación, disponibilidad, imágenes, descripciones, maridajes, filtros, visualizaciones, favoritos, recomendaciones, interacciones y métricas operativas.\n\n• Datos técnicos: IP, identificadores de dispositivo, navegador, sistema operativo, cookies, eventos, logs, errores, rendimiento, seguridad, geolocalización aproximada y datos de uso.\n\n• Datos de soporte: tickets, emails, conversaciones, incidencias, adjuntos, capturas, grabaciones o notas cuando se faciliten o sean necesarias para atender la solicitud.\n\n• Datos comerciales: preferencias, intereses, participación en demos, newsletters, eventos, comunicaciones, campañas y relación con ventas.\n\n• Datos de candidatos, proveedores o partners: currículum, experiencia, datos profesionales, propuestas, contratos, facturas, pagos y comunicaciones."
    ],
    [
      "4. Fuentes de los datos",
      "Los datos pueden proceder directamente del interesado, del Cliente, de usuarios autorizados, de formularios web, procesos de contratación, emails, llamadas, demos, soporte, facturas, integraciones, proveedores de pago, tiendas de aplicaciones, herramientas de analítica, sistemas de seguridad, partners, fuentes públicas profesionales o del uso de la Plataforma."
    ],
    [
      "5. Finalidades del tratamiento",
      "• gestionar altas, cuentas, usuarios, autenticación, permisos y relación contractual;\n\n• prestar, mantener, configurar, personalizar y mejorar la Plataforma Winerim;\n\n• cargar, publicar, visualizar y gestionar cartas de vino digitales, QR, web, app y paneles;\n\n• gestionar pagos, facturación, impuestos, contabilidad, renovaciones, bajas, impagos y contracargos;\n\n• prestar soporte, resolver incidencias, comunicar cambios, enviar avisos de servicio, seguridad o facturación;\n\n• analizar stock, ventas, rotación, disponibilidad, interacciones, preferencias, filtros y rendimiento de la carta para ofrecer paneles, recomendaciones, estadísticas, benchmarking e inteligencia de negocio;\n\n• desarrollar, entrenar, probar y mejorar sistemas internos de análisis, recomendación, clasificación, maridaje, traducción, normalización, búsqueda e IA, preferentemente con datos agregados, anonimizados o disociados cuando sea viable;\n\n• prevenir fraude, abuso, scraping, crawling, ingeniería inversa, extracción automatizada, accesos indebidos, uso competitivo no autorizado, incidentes de seguridad y actividades ilícitas;\n\n• enviar comunicaciones comerciales B2B sobre Winerim, novedades, funcionalidades, contenidos, eventos o servicios similares, cuando exista base legal;\n\n• cumplir obligaciones legales, atender requerimientos de autoridades, conservar evidencias, defender derechos, gestionar auditorías, operaciones corporativas o reclamaciones."
    ],
    [
      "6. Bases jurídicas",
      "Los tratamientos se basan en el RGPD, la LOPDGDD y demás normativa española y europea aplicable. No todos los datos de carta, stock, ventas o bodega son datos personales; cuando sean datos empresariales o agregados podrán tratarse conforme al contrato, interés legítimo o ausencia de identificación personal.\n\n• Ejecución de contrato o medidas precontractuales: alta, acceso al Servicio, soporte, facturación contractual y gestión de la relación con clientes.\n\n• Cumplimiento de obligaciones legales: contabilidad, fiscalidad, facturación, conservación de registros, atención de autoridades y obligaciones regulatorias.\n\n• Interés legítimo: seguridad, prevención de fraude, mejora del Servicio, analítica interna, comunicaciones B2B, defensa de reclamaciones, uso de datos empresariales no personales, estadísticas agregadas, protección de activos, prevención de scraping e ingeniería inversa.\n\n• Consentimiento: cookies no necesarias, newsletters no amparadas por otra base, funcionalidades opcionales y tratamientos voluntarios.\n\n• Instrucciones del Cliente: cuando Winerim actúe como encargado del tratamiento respecto de datos personales tratados por cuenta del Cliente."
    ],
    [
      "7. Visualización pública de cartas de vino",
      "La finalidad esencial de Winerim es permitir que los Clientes muestren públicamente sus cartas de vinos en formato digital. Por ello, datos como referencias, precios, añadas, imágenes, descripciones, maridajes y disponibilidad podrán ser visibles para comensales, visitantes y usuarios finales desde enlaces, códigos QR, apps, webs o páginas asociadas al Servicio.\n\nEn principio, esta información tiene naturaleza empresarial o comercial. Si el Cliente incluye datos personales dentro de la carta o de sus contenidos, será responsable de contar con base legal y de no publicar información innecesaria o no autorizada."
    ],
    [
      "8. Uso de datos de ventas, stock, analítica e IA",
      "Winerim podrá tratar datos de ventas, stock, rotación, disponibilidad, interacciones, filtros, visualizaciones, preferencias y rendimiento comercial para prestar el Servicio, mostrar analítica al Cliente, mejorar recomendaciones, detectar errores, desarrollar funcionalidades y optimizar la experiencia.\n\nWinerim podrá utilizar datos agregados, anonimizados, disociados o no personales para análisis sectorial, benchmarking, informes internos o externos, inteligencia de mercado, entrenamiento o mejora de modelos, estadísticas, comunicaciones comerciales y mejora del producto, sin identificar razonablemente a personas físicas ni publicar datos individualizados sensibles de un Cliente sin autorización o base legal suficiente.\n\nWinerim no vende datos personales. Tampoco publicará datos individualizados de ventas, stock, márgenes o rendimiento económico identificando directamente al Cliente sin autorización o necesidad contractual/legal.\n\nEsta Política no concede al Cliente ni a usuarios autorizados ningún derecho para extraer, copiar, vender, revender, licenciar, ceder, transferir, publicar, comercializar, entrenar modelos de IA, crear datasets, explotar bases de datos, alimentar sistemas externos o aprovechar fuera de Winerim datos, contenidos, estructuras, taxonomías, modelos, recomendaciones, métricas, informes, benchmarks, visualizaciones o activos de Winerim. Estas restricciones se regulan en los Términos y Condiciones."
    ],
    [
      "9. Inteligencia artificial y decisiones automatizadas",
      "Winerim puede utilizar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, generar o sugerir descripciones, traducir, crear maridajes, ordenar resultados, recomendar vinos, detectar patrones, mejorar búsquedas, detectar errores y ofrecer analítica.\n\nEstas funcionalidades son de apoyo y pueden cometer errores. No producen decisiones legales o efectos significativamente similares sobre personas físicas. El Cliente debe revisar información crítica antes de utilizarla comercialmente.\n\nCuando se utilicen datos personales en sistemas automatizados, Winerim procurará aplicar minimización, seudonimización, anonimización o agregación cuando sea viable y proporcionado."
    ],
    [
      "10. Destinatarios, proveedores y subencargados",
      "Winerim podrá compartir datos con proveedores que prestan servicios necesarios, incluyendo hosting cloud, almacenamiento, seguridad, monitorización, email, soporte, analítica, pagos, facturación, inteligencia artificial, traducción, gestión de errores, tiendas de aplicaciones, integraciones, asesoría legal, fiscal, contable, auditoría y otros servicios auxiliares.\n\nStripe u otros proveedores de pago tratarán datos necesarios para pagos, suscripciones, facturación, prevención de fraude, cumplimiento financiero y obligaciones regulatorias conforme a sus propias condiciones y políticas.\n\nApple, Google u operadores de tiendas de aplicaciones podrán tratar datos cuando el usuario descargue o utilice aplicaciones móviles desde sus entornos.\n\nTambién podrán comunicarse datos a autoridades, juzgados, administraciones públicas, fuerzas de seguridad, asesores, auditores, compradores, inversores o terceros en operaciones corporativas cuando exista obligación legal, requerimiento válido, defensa de derechos, prevención de fraude, interés legítimo o base suficiente.\n\nEl listado concreto de proveedores y subencargados relevantes deberá mantenerse actualizado y estar disponible previa solicitud razonable o en una página específica de Winerim. En materia de pagos y cookies vinculadas al cobro, el proveedor identificado actualmente es Stripe."
    ],
    [
      "11. Transferencias internacionales",
      "Basque Highlands S.L. puede utilizar proveedores o entidades ubicadas fuera del Espacio Económico Europeo, incluyendo proveedores cloud, pagos, soporte, analítica o inteligencia artificial. También podrá existir acceso o soporte por Winerim LLC si interviene en la prestación internacional del Servicio.\n\nCuando los datos personales estén sujetos al RGPD y se transfieran fuera del Espacio Económico Europeo a países sin decisión de adecuación, Winerim aplicará garantías adecuadas, como cláusulas contractuales tipo aprobadas por la Comisión Europea, medidas suplementarias, decisiones de adecuación, certificaciones u otros mecanismos válidos."
    ],
    [
      "12. Plazos de conservación",
      "• Datos de cuenta y contrato: mientras exista relación contractual y posteriormente durante los plazos necesarios para obligaciones legales, contables, fiscales y defensa de reclamaciones.\n\n• Datos de facturación: durante los plazos exigidos por normativa fiscal, mercantil y contable aplicable.\n\n• Solicitudes de baja y comunicaciones contractuales: durante el plazo necesario para acreditar su recepción, tramitación, efectos y posibles reclamaciones.\n\n• Datos de soporte: durante el tiempo necesario para atender la consulta o incidencia y posteriormente durante un plazo razonable para seguimiento, calidad, seguridad y defensa.\n\n• Logs técnicos y de seguridad: durante periodos proporcionados a seguridad, diagnóstico, prevención de fraude, abuso, scraping y mejora del Servicio.\n\n• Datos de cartas, stock, ventas y operativa: mientras la cuenta esté activa y durante un periodo posterior razonable para exportación, recuperación, copias de seguridad, cumplimiento legal o reclamaciones.\n\n• Datos agregados, anonimizados o disociados: podrán conservarse indefinidamente porque no permiten identificar razonablemente a una persona física."
    ],
    [
      "13. Derechos de las personas",
      "Las personas interesadas podrán ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad, retirada del consentimiento y derecho a no ser objeto de decisiones automatizadas cuando proceda conforme al RGPD.\n\nLas solicitudes deberán enviarse a info@winerim.com indicando el derecho ejercitado, identidad del solicitante y datos necesarios para tramitar la petición. Winerim podrá solicitar información adicional para verificar la identidad o legitimación del solicitante.\n\nCuando Winerim actúe como encargado del tratamiento, podrá remitir la solicitud al Cliente responsable del tratamiento o asistirle en su respuesta, según proceda."
    ],
    [
      "14. Seguridad",
      "Winerim aplicará medidas técnicas y organizativas razonables para proteger los datos personales y la Plataforma frente a acceso no autorizado, pérdida, alteración, divulgación, uso indebido, scraping, extracción automatizada, ingeniería inversa, abuso de cuentas y otros riesgos proporcionados al contexto del Servicio.\n\nNingún sistema es absolutamente seguro. El Cliente debe custodiar credenciales, configurar permisos, formar a sus usuarios y notificar de inmediato cualquier incidente, pérdida de acceso o sospecha de uso indebido."
    ],
    [
      "15. Cookies y tecnologías similares",
      "Actualmente Winerim no utiliza cookies analíticas, publicitarias o de marketing propias. La Plataforma podrá utilizar cookies técnicas propias estrictamente necesarias para autenticación, sesión, seguridad, prevención de abuso y funcionamiento ordinario del Servicio. En materia de pagos, Winerim utiliza Stripe como proveedor externo, que puede instalar o utilizar cookies y tecnologías similares necesarias para procesar pagos, gestionar suscripciones, prevenir fraude, reforzar la seguridad y cumplir obligaciones financieras o regulatorias.\n\nSi en el futuro Winerim incorporara cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, se informará al usuario y se habilitará el mecanismo de aceptación, rechazo o configuración cuando legalmente corresponda. Rechazar cookies no necesarias no impedirá el uso básico del Servicio cuando dichas cookies no sean imprescindibles."
    ],
    [
      "16. Menores, alcohol y responsabilidad del Cliente",
      "Winerim no está dirigida a menores ni vende bebidas alcohólicas. La Plataforma es una herramienta tecnológica para profesionales de hostelería. El Cliente es responsable de cumplir la normativa aplicable sobre venta, promoción, edad legal, servicio responsable y consumo de alcohol en su jurisdicción."
    ],
    [
      "17. Comunicaciones comerciales",
      "Winerim podrá enviar comunicaciones de servicio, soporte, seguridad, facturación y cambios contractuales. También podrá enviar comunicaciones comerciales B2B sobre productos, servicios, eventos, contenidos o novedades relacionados con Winerim cuando exista base legal. El destinatario podrá oponerse o darse de baja de comunicaciones comerciales cuando proceda, sin que ello afecte a comunicaciones contractuales necesarias."
    ],
    [
      "18. Reclamaciones y autoridad de control",
      "Las personas interesadas tienen derecho a presentar una reclamación ante la Agencia Española de Protección de Datos si consideran que el tratamiento no se ajusta a la normativa aplicable, sin perjuicio de intentar previamente una solución con Winerim."
    ],
    [
      "19. Cambios en esta Política",
      "Winerim podrá actualizar esta Política para reflejar cambios legales, técnicos, operativos, de proveedores, funcionalidades, tratamientos, estructura societaria o modelo de negocio. Cuando los cambios sean relevantes, se comunicarán por medios razonables, como web, Plataforma, email o documentación contractual."
    ],
    [
      "20. Anexo: resumen operativo de tratamientos",
      "Tratamiento\n\nFinalidad\n\nBase\n\nCuenta y contrato\n\nAlta, acceso, soporte, facturación y relación contractual\n\nContrato / interés legítimo / obligación legal\n\nCarta digital\n\nPublicar y gestionar carta de vinos del Cliente\n\nContrato / interés legítimo del Cliente\n\nStock, ventas y analítica\n\nPaneles, recomendaciones, estadísticas, benchmarking y mejora del producto\n\nContrato / interés legítimo / datos agregados\n\nIA y automatización\n\nClasificación, maridajes, descripciones, traducción y mejora de modelos\n\nContrato / interés legítimo / consentimiento si aplica\n\nSeguridad y antifraude\n\nPrevenir scraping, ingeniería inversa, abuso y accesos indebidos\n\nInterés legítimo / obligación legal\n\nCookies técnicas y Stripe\n\nFuncionamiento técnico del Servicio y cookies/tecnologías de Stripe vinculadas al proceso de pago y prevención de fraude\n\nContrato / interés legítimo / obligación legal; consentimiento si en el futuro se activan cookies no necesarias\n\nPagos y facturación\n\nCobros, impuestos, contabilidad y cumplimiento financiero\n\nContrato / obligación legal"
    ]
  ],
  "links": [
    [
      "Inicio",
      "/"
    ],
    [
      "Contacto",
      "/contacto"
    ],
    [
      "Demo",
      "/demo"
    ],
    [
      "Terminos",
      "/terminos-y-condiciones-del-contrato"
    ]
  ]
},
  '/terminos-y-condiciones-del-contrato': {
  "lang": "es",
  "title": "Términos y Condiciones de Contratación y Uso SaaS | Winerim",
  "description": "Términos y condiciones de contratación y uso SaaS de Winerim para clientes en España.",
  "h1": "Términos y Condiciones de Contratación y Uso SaaS",
  "subtitle": "Contrato SaaS B2B integrado para clientes profesionales de Winerim · Versión final operativa - 7 de julio de 2026 · Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.",
  "canonical": "/terminos-y-condiciones-del-contrato",
  "schemaType": "WebPage",
  "robots": "noindex, follow",
  "sections": [
    [
      "Documento",
      "Términos y Condiciones de Contratación y Uso SaaS con contrato SaaS integrado"
    ],
    [
      "Ámbito",
      "Clientes con establecimiento, domicilio fiscal o centro principal de actividad en España"
    ],
    [
      "Prestador y facturación",
      "Basque Highlands S.L., CIF B01729607, Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España"
    ],
    [
      "Marca",
      "Winerim"
    ],
    [
      "Naturaleza",
      "Servicio SaaS B2B para hostelería, restauración, hoteles y grupos profesionales"
    ],
    [
      "Bajas contractuales",
      "Únicamente por email a cancel@winerim.com con 15 días naturales de antelación"
    ],
    [
      "Contacto general",
      "info@winerim.com"
    ],
    [
      "Ley y jurisdicción",
      "Derecho español; Juzgados y Tribunales de Donostia-San Sebastián, salvo norma imperativa"
    ],
    [
      "1. Identificación del prestador y ámbito de aplicación",
      "Estos Términos y Condiciones regulan la contratación, acceso y uso profesional de Winerim, incluyendo sus aplicaciones web y móviles, paneles de control, cartas digitales, módulos de gestión, integraciones, APIs, funcionalidades de analítica, inteligencia artificial, soporte y servicios asociados.\n\nPara clientes con establecimiento, domicilio fiscal o centro principal de actividad en España, el prestador contractual y entidad emisora de facturas será Basque Highlands S.L., con CIF B01729607 y domicilio en Askatasunaren Hiribidea 17, 2º, 20004 Donostia-San Sebastián, Gipuzkoa, España, actuando bajo la marca comercial Winerim.\n\nEl cliente será la persona física o jurídica que contrate el servicio en condición de empresario, profesional, sociedad, restaurante, hotel, grupo hostelero, establecimiento turístico, club, distribuidor o entidad equivalente, en adelante el Cliente."
    ],
    [
      "2. Naturaleza profesional del servicio",
      "Winerim es una plataforma SaaS B2B orientada a la digitalización, gestión, análisis y explotación comercial de cartas de vino, bodegas, stock, datos de venta y experiencia de servicio en hostelería.\n\nEl Cliente declara que contrata Winerim en el marco de su actividad profesional o empresarial y no como consumidor o usuario final. La Plataforma no está destinada a contratación por consumidores para fines particulares.\n\nLos comensales, visitantes o usuarios finales que consulten una carta digital del Cliente no adquieren por ello la condición de clientes contractuales directos de Winerim, salvo que creen una cuenta propia, utilicen funcionalidades independientes o acepten términos específicos adicionales."
    ],
    [
      "3. Objeto contractual e integración del contrato SaaS",
      "Estos Términos constituyen el contrato SaaS aplicable entre Winerim y el Cliente. No existe un contrato SaaS separado salvo que las partes firmen condiciones particulares, una orden de servicio, presupuesto, pedido, anexo o acuerdo específico.\n\nLa contratación otorga al Cliente una licencia limitada, revocable en caso de incumplimiento, no exclusiva, no sublicenciable, no transferible y condicionada al pago para acceder y utilizar la Plataforma durante la vigencia de la relación contractual y únicamente para el Uso Permitido.\n\nLa licencia no implica venta, cesión, transmisión ni adquisición de propiedad sobre software, código, datos, bases de datos, documentación, imágenes, taxonomías, huellas digitales, reglas, algoritmos, modelos, recomendaciones, insights, interfaces, diseños, know-how ni cualquier otro activo de Winerim."
    ],
    [
      "4. Aceptación y documentos contractuales",
      "La aceptación de estos Términos podrá realizarse mediante firma manuscrita o electrónica, aceptación en proceso de alta, confirmación por correo electrónico, pago de la suscripción, uso efectivo de la Plataforma, aceptación de presupuesto o cualquier otro acto inequívoco de contratación.\n\nLa contratación implica la aceptación de estos Términos, la Política de Privacidad, la Política de Cookies cuando proceda, el Anexo de Encargo de Tratamiento, la ficha de contratación, presupuesto, plan, pedido, factura o condiciones particulares aceptadas.\n\nEn caso de contradicción entre estos Términos y una condición particular firmada o aceptada expresamente por ambas partes, prevalecerá la condición particular únicamente respecto del punto concreto regulado."
    ],
    [
      "5. Definiciones esenciales",
      "Plataforma significa el conjunto de aplicaciones web, aplicaciones móviles, paneles de control, bases de datos, APIs, módulos, servicios, diseños, documentación, funcionalidades y sistemas ofrecidos bajo la marca Winerim.\n\nDatos de la Carta significa toda información relacionada con la carta de vinos del Cliente, incluyendo referencias, añadas, precios, denominaciones, regiones, países, bodegas, uvas, formatos, imágenes, descripciones, notas de cata, maridajes, disponibilidad, categorías, etiquetas, idiomas, recomendaciones, favoritos, orden de presentación y cualquier dato equivalente.\n\nDatos Operativos significa datos de stock, ventas, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, rendimiento comercial, interacciones, uso de filtros, visualizaciones, clicks, reservas o pedidos cuando existan, integraciones con terceros y cualquier información relacionada con la gestión o explotación de la carta de vinos.\n\nContenido del Cliente significa logotipos, marcas, imágenes, textos, cartas, precios, materiales, datos comerciales e información aportada por el Cliente.\n\nContenido de Winerim significa software, código, arquitectura, diseño, interfaz, bases de datos, huellas digitales de vinos, imágenes, descripciones, traducciones, recomendaciones, taxonomías, datos enriquecidos, modelos, reglas, algoritmos, documentación, textos, know-how, métricas, benchmarks, insights, materiales formativos y cualquier activo creado, licenciado, normalizado o incorporado por Winerim.\n\nDatos y Activos de Winerim significa, además del Contenido de Winerim, cualquier dataset, estructura de datos, taxonomía, normalización, clasificación, enriquecimiento, relación entre datos, modelo, patrón de uso, ranking, recomendación, métrica, informe, benchmark, señal analítica o conocimiento generado o tratado por Winerim.\n\nUso Permitido significa el uso interno, profesional y ordinario de la Plataforma por el Cliente para gestionar, visualizar y explotar su propia carta de vinos dentro del establecimiento, grupo o cuenta contratada, sin extracción, cesión, reventa, uso competitivo ni explotación externa de activos de Winerim."
    ],
    [
      "6. Alcance general del servicio",
      "Winerim permite al Cliente crear, gestionar, visualizar, explotar y analizar digitalmente su carta de vinos y la información asociada a su bodega, stock y servicio de sala.\n\nSalvo que el plan contratado indique otra cosa, el servicio podrá incluir alta del Cliente, configuración inicial, carga inicial de la carta facilitada, carta digital personalizada, enlace web o QR, aplicación descargable cuando esté disponible, panel de control, formatos de visualización, filtros, favoritos, recomendados, selección, multiidioma, activación y desactivación de vinos, modificación de precios, uvas, añadas, maridajes, descripciones y notas de cata, solicitud de nuevas referencias, analítica y soporte ordinario.\n\nLa parte frontal de la carta digital podrá ser consultada por comensales sin coste directo adicional para ellos, sin perjuicio de las tarifas abonadas por el Cliente a Winerim.\n\nLa carta podrá ser pública y accesible desde cualquier lugar, sin necesidad de que el usuario final esté físicamente en el establecimiento, salvo configuración distinta solicitada por el Cliente y aceptada técnicamente por Winerim."
    ],
    [
      "7. Servicios no incluidos salvo pacto expreso",
      "Salvo contratación expresa por escrito, no se incluyen desarrollos a medida, integraciones con TPV, PMS, ERP, CRM u otros sistemas, migraciones complejas, depuración avanzada de datos, fotografía profesional, impresión de códigos QR o material físico, formación presencial, consultoría estratégica, auditoría de bodega, gestión operativa de stock por cuenta del Cliente, soporte fuera de horario, SLA específico, APIs privadas, modelos de IA personalizados, traducciones profesionales revisadas por humano, personalización avanzada de marca ni funcionalidades no descritas en el plan contratado.\n\nWinerim podrá ofrecer servicios adicionales mediante presupuesto, pedido, anexo o contrato específico. Su contratación no modificará automáticamente estos Términos salvo indicación expresa."
    ],
    [
      "8. Alta, implantación y colaboración del Cliente",
      "El Cliente deberá facilitar a Winerim, en formato razonablemente utilizable, toda la información necesaria para la implantación: carta de vinos, precios, añadas, stock, imágenes, logos, datos fiscales, datos de contacto, accesos o cualquier otro material necesario.\n\nEl Cliente responde de la veracidad, exactitud, actualización y licitud de los contenidos y datos que entregue, cargue, modifique o mantenga en Winerim.\n\nLos plazos de activación o carga comenzarán a contar desde la recepción completa de la información necesaria y, cuando proceda, del pago inicial. Los plazos operativos son estimaciones razonables salvo garantía expresa por escrito.\n\nWinerim podrá solicitar imágenes, fichas técnicas, datos de bodega, añadas, precios u otra información necesaria para crear, completar, corregir o enriquecer referencias sin huella digital o con información insuficiente."
    ],
    [
      "9. Licencia de uso y límites",
      "El Cliente recibe una licencia limitada para usar la Plataforma únicamente durante la vigencia de la relación contractual, para su actividad profesional propia, conforme al plan contratado y al Uso Permitido.\n\nLa licencia se concede por cuenta, establecimiento, grupo, territorio, número de usuarios, módulos, funcionalidades o límites de uso indicados en la ficha de contratación o plan contratado.\n\nEl Cliente no podrá sublicenciar, ceder, alquilar, vender, revender, poner a disposición de terceros, explotar como servicio, operar en nombre de terceros, prestar servicios de consultoría basados en Winerim ni permitir el acceso de terceros no autorizados sin consentimiento previo y escrito de Winerim."
    ],
    [
      "10. Prohibiciones esenciales: ingeniería inversa, extracción y explotación de datos",
      "El Cliente no podrá realizar, permitir, facilitar, encargar o intentar realizar directa o indirectamente ingeniería inversa, descompilación, desensamblado, análisis de código, análisis de arquitectura, auditoría técnica no autorizada, escaneo, test de intrusión, explotación de vulnerabilidades, copia de lógica, copia de flujos, copia de interfaz, copia de estructura de datos o cualquier actuación orientada a comprender, replicar, sustituir o competir con Winerim.\n\nQueda prohibido descargar, extraer, copiar, indexar, minar, sincronizar, fotografiar de forma sistemática, capturar masivamente, hacer scraping, crawling, harvesting, data mining, API abuse, consultas automatizadas o cualquier obtención masiva o no autorizada de datos, contenidos, imágenes, fichas, taxonomías, estructuras, etiquetas, clasificaciones, huellas digitales, métricas, insights, recomendaciones o documentación de Winerim.\n\nQueda prohibido vender, revender, licenciar, alquilar, ceder, transferir, publicar, redistribuir, monetizar, comercializar o explotar de cualquier forma Datos y Activos de Winerim, Contenido de Winerim, datos enriquecidos, benchmarks, datasets, recomendaciones, modelos, reglas, algoritmos, know-how, informes, outputs o resultados generados por la Plataforma fuera del Uso Permitido.\n\nQueda prohibido utilizar Winerim, su contenido o sus datos para alimentar bases de datos propias o de terceros, entrenar, ajustar, evaluar o mejorar sistemas de inteligencia artificial, crear comparadores, marketplaces, buscadores, catálogos, sistemas de recomendación, soluciones de gestión de vino, herramientas de analítica, servicios de consultoría, informes sectoriales o productos competidores.\n\nEl Cliente no podrá permitir acceso o visualización de la Plataforma, demos, paneles, documentación, capturas, configuraciones, propuestas, materiales o datos a competidores directos o indirectos de Winerim, ni a terceros que desarrollen, comercialicen, asesoren o inviertan en soluciones competidoras, salvo autorización previa y escrita de Winerim.\n\nLa posibilidad técnica de visualizar, descargar, exportar, copiar o acceder a información no supone autorización jurídica para su extracción, reutilización, venta, cesión, entrenamiento de IA, monetización o explotación fuera del Uso Permitido.\n\nEl incumplimiento de esta cláusula tendrá la consideración de incumplimiento esencial y podrá justificar suspensión inmediata, resolución contractual, bloqueo de accesos, retirada o destrucción de materiales, indemnización de daños y perjuicios y ejercicio de acciones legales."
    ],
    [
      "11. Datos y Activos de Winerim",
      "Winerim conserva todos los derechos sobre sus Datos y Activos de Winerim, incluyendo datasets, taxonomías, huellas digitales de vinos, reglas de normalización, clasificaciones, modelos, patrones, benchmarks, recomendaciones, traducciones, descripciones, imágenes, documentación, interfaces, métricas, insights y cualquier enriquecimiento generado por Winerim.\n\nEl Cliente reconoce que la inversión de Winerim en creación, normalización, curación, estructuración y explotación de datos constituye un activo esencial, protegido contractual y legalmente, incluyendo, cuando proceda, derechos de propiedad intelectual, derechos sobre bases de datos, secretos empresariales y competencia desleal.\n\nNingún dato, pantalla, informe, exportación, recomendación, insight o resultado generado por Winerim podrá ser usado por el Cliente para fines ajenos a la gestión interna de su carta y servicio contratado."
    ],
    [
      "12. Contenido del Cliente",
      "El Cliente conserva la titularidad de sus marcas, logos, imágenes propias, cartas, precios, datos comerciales y demás contenido original que aporte a la Plataforma, siempre que sea efectivamente de su titularidad o disponga de derechos suficientes.\n\nEl Cliente concede a Winerim una licencia mundial, no exclusiva, gratuita, sublicenciable a proveedores técnicos, durante la vigencia del servicio y por el tiempo necesario posterior para cumplimiento legal, soporte, copias de seguridad y defensa de derechos, para alojar, reproducir, adaptar técnicamente, traducir, normalizar, enriquecer, mostrar, comunicar públicamente y tratar dicho contenido en la medida necesaria para prestar, mejorar y proteger el servicio.\n\nEl Cliente garantiza que cuenta con derechos suficientes sobre imágenes, logotipos, textos, datos, fichas, precios y materiales que aporte. Winerim no será responsable de reclamaciones de terceros derivadas de contenido proporcionado por el Cliente."
    ],
    [
      "13. Uso y exhibición pública de cartas de vino",
      "El Cliente autoriza expresamente a Winerim a mostrar y poner a disposición de usuarios finales la carta de vinos del Cliente y sus Datos de la Carta a través de la Plataforma, web, app, enlaces, códigos QR, widgets, integraciones y canales asociados al servicio.\n\nEsta autorización incluye nombres de vinos, bodegas, regiones, denominaciones, uvas, añadas, precios, formatos, imágenes, descripciones, notas de cata, maridajes, etiquetas, categorías, idiomas, disponibilidad, recomendaciones y cualquier información que forme parte de la carta digital.\n\nEl Cliente reconoce que la visualización pública de la carta forma parte esencial del servicio y que la información incluida podrá ser accesible por comensales, buscadores, navegadores, sistemas de cache, redes o terceros técnicos en la medida propia del funcionamiento de internet, salvo configuración distinta aceptada por Winerim.\n\nEl Cliente será responsable de que precios, añadas, disponibilidad, promociones, imágenes, derechos de terceros y demás información publicada sean correctos, lícitos y estén actualizados."
    ],
    [
      "14. Datos de ventas, stock, rotación y analítica",
      "El Cliente autoriza a Winerim a recoger, almacenar, tratar, analizar, visualizar, cruzar, enriquecer y utilizar Datos Operativos relacionados con carta, ventas, stock, rotación, consumos, márgenes, disponibilidad, histórico, movimientos de bodega, interacciones, visualizaciones, filtros, favoritos, reservas o pedidos cuando existan.\n\nWinerim podrá utilizar estos datos para prestar el servicio, generar paneles, métricas, recomendaciones, alertas, informes, comparativas internas, detección de errores, mejora de funcionalidades, seguridad, prevención de fraude, soporte, desarrollo de producto y creación de inteligencia de negocio para el Cliente.\n\nWinerim podrá usar datos agregados, anonimizados o disociados para análisis sectorial, benchmarking, estadísticas, informes, desarrollo de producto, entrenamiento y mejora de modelos, comunicación comercial, estudios de mercado, recomendaciones y creación de nuevos servicios, siempre sin identificar directamente al Cliente cuando se trate de datos sensibles de ventas, stock, márgenes o rendimiento económico salvo autorización específica.\n\nWinerim no venderá datos personales. La explotación comercial de datos no personales, agregados, anonimizados o generados por Winerim no atribuye al Cliente derechos de compensación, participación o control adicional, salvo pacto escrito distinto."
    ],
    [
      "15. Alcohol, normativa de hostelería y responsabilidad del restaurante",
      "Winerim no vende, sirve, suministra, transporta, distribuye ni cobra bebidas alcohólicas a usuarios finales. La Plataforma es una herramienta tecnológica de gestión, visualización, analítica y apoyo comercial.\n\nEl Cliente es el único responsable de la venta, servicio, disponibilidad, precios, impuestos, licencias, edad legal, consumo responsable, normativa sanitaria, normativa de hostelería, normativa de publicidad de alcohol y cumplimiento local aplicable a su actividad.\n\nLas recomendaciones, maridajes, rankings, descripciones o sugerencias generadas por Winerim no sustituyen el criterio profesional del Cliente ni sus obligaciones legales frente a consumidores, autoridades o terceros."
    ],
    [
      "16. Inteligencia artificial, recomendaciones y contenido automatizado",
      "Winerim puede incorporar sistemas automatizados o de inteligencia artificial para clasificar vinos, enriquecer datos, traducir, generar descripciones, sugerir maridajes, ordenar resultados, detectar patrones, recomendar referencias y mejorar la experiencia de usuario.\n\nEstas funcionalidades son herramientas de apoyo. Pueden contener errores, omisiones, sesgos, inexactitudes o resultados no adecuados a una situación concreta. El Cliente debe revisar la información relevante antes de publicarla, usarla comercialmente o tomar decisiones de compra, venta, stock o servicio.\n\nWinerim podrá modificar, limitar, sustituir, desactivar o mejorar funcionalidades de IA en cualquier momento por razones técnicas, legales, comerciales, de seguridad, de calidad o de proveedores.\n\nEl Cliente no podrá usar outputs de IA, recomendaciones, embeddings, puntuaciones, prompts, resultados, taxonomías, descripciones o datasets generados por Winerim para entrenar modelos externos, crear productos competidores, vender datos o alimentar bases de datos ajenas al Uso Permitido."
    ],
    [
      "17. Integraciones, APIs y terceros",
      "Winerim puede integrarse con proveedores de pago, TPV, PMS, ERP, CRM, herramientas de analítica, servicios de email, alojamiento cloud, tiendas de aplicaciones, proveedores de inteligencia artificial y otros terceros.\n\nLas integraciones dependerán de la disponibilidad, condiciones, APIs, cambios técnicos, tarifas, limitaciones y decisiones de esos terceros. Winerim no será responsable de fallos, cambios, interrupciones, pérdidas o limitaciones imputables a terceros ajenos a su control razonable.\n\nEl Cliente autoriza a Winerim a intercambiar datos con los terceros necesarios cuando active una integración o cuando sea imprescindible para prestar el servicio, siempre dentro del marco contractual y de privacidad aplicable."
    ],
    [
      "18. Obligaciones de Winerim",
      "Winerim prestará el servicio con diligencia profesional, conforme a los usos habituales del sector SaaS y con medios técnicos y humanos razonablemente disponibles.\n\nWinerim realizará la carga inicial de la carta facilitada por el Cliente conforme al plan contratado y a la información recibida. La exactitud final de precios, disponibilidad, añadas, stock y datos comerciales será responsabilidad del Cliente.\n\nWinerim procurará informar al Cliente de incidencias relevantes que afecten sustancialmente al servicio cuando tenga conocimiento de ellas y sea razonablemente posible."
    ],
    [
      "19. Obligaciones del Cliente",
      "El Cliente deberá pagar puntualmente las tarifas contratadas, impuestos, comisiones bancarias, gastos de devolución y cualquier importe pendiente conforme a estos Términos.\n\nEl Cliente deberá utilizar la Plataforma conforme a la ley, buena fe, documentación, instrucciones de Winerim y Uso Permitido.\n\nEl Cliente deberá formar a su personal autorizado, controlar credenciales, revisar la carta publicada, mantener datos actualizados y no cargar información ilícita, innecesaria, falsa, protegida o de terceros sin derechos suficientes.\n\nEl Cliente responderá de cualquier actuación de sus administradores, empleados, colaboradores, proveedores o terceros autorizados que accedan a la Plataforma por su cuenta o bajo sus credenciales."
    ],
    [
      "20. Cuentas, credenciales y seguridad del Cliente",
      "El Cliente será responsable de custodiar credenciales, usuarios administradores, permisos y accesos. Cualquier actuación realizada desde una cuenta del Cliente se presumirá realizada por el Cliente o por persona autorizada, salvo prueba en contrario.\n\nEl Cliente deberá notificar inmediatamente a Winerim cualquier acceso no autorizado, pérdida de credenciales, uso indebido, fuga de datos o incidencia de seguridad que afecte a su cuenta.\n\nWinerim podrá bloquear, suspender, restablecer o limitar accesos cuando existan indicios razonables de riesgo, abuso, uso no autorizado, scraping, extracción, vulneración de seguridad o incumplimiento contractual."
    ],
    [
      "21. Soporte, mantenimiento y actualizaciones",
      "El soporte ordinario se prestará a través de los canales habilitados por Winerim, incluyendo panel, email u otros medios indicados, dentro del horario operativo comunicado o contratado.\n\nWinerim es un producto vivo y en evolución continua. Winerim podrá introducir actualizaciones, mejoras, cambios técnicos, automatizaciones, integraciones, modificaciones de interfaz, nuevos módulos, ajustes de arquitectura, parches de seguridad y cambios funcionales.\n\nLas actualizaciones podrán modificar la apariencia, flujos, funcionalidades, campos, filtros, módulos o forma de prestación del servicio, siempre que no vacíen de contenido esencial el servicio contratado.\n\nWinerim podrá realizar mantenimiento programado o de emergencia. En situaciones críticas, de seguridad o de terceros, el servicio podrá interrumpirse sin aviso previo, procurando restablecerse en el menor tiempo razonable."
    ],
    [
      "22. Disponibilidad y ausencia de garantía absoluta",
      "Winerim procurará mantener la Plataforma disponible con estándares razonables del sector SaaS, pero no garantiza disponibilidad ininterrumpida, ausencia total de errores, compatibilidad permanente con todos los dispositivos, navegadores o sistemas, ni continuidad indefinida de todas las funcionalidades.\n\nSalvo que exista un SLA firmado, la Plataforma se presta en modalidad de medios razonables y según disponibilidad, sin compromisos de disponibilidad, créditos de servicio o indemnizaciones automáticas por interrupciones.\n\nWinerim no será responsable de caídas, interrupciones, pérdida de conectividad, lentitud, indisponibilidad o errores causados por proveedores cloud, internet, tiendas de aplicaciones, Stripe, APIs de terceros, dispositivos del Cliente, redes locales, configuraciones incorrectas, fuerza mayor o hechos fuera de su control razonable."
    ],
    [
      "23. Funcionalidades beta, pilotos y pruebas",
      "Winerim podrá ofrecer funcionalidades beta, pilotos, pruebas, módulos experimentales o accesos anticipados. Dichas funcionalidades se ofrecen sin garantía de continuidad, estabilidad, disponibilidad, resultado o permanencia.\n\nWinerim podrá modificar, limitar o retirar funcionalidades beta en cualquier momento sin que ello genere derecho a compensación, salvo pacto escrito distinto."
    ],
    [
      "24. Precio, facturación y forma de pago",
      "El Cliente abonará a Basque Highlands S.L. las cantidades indicadas en el plan, presupuesto, ficha de contratación, factura, enlace de pago o condición particular aceptada, más los impuestos indirectos que resulten aplicables.\n\nLa facturación podrá ser mensual, anual, por piloto, por grupo, por establecimiento, por módulo o según la modalidad contratada. El cobro podrá realizarse mediante tarjeta, domiciliación, transferencia, Stripe u otro medio aceptado por Winerim.\n\nLas facturas se emitirán en formato electrónico al email facilitado por el Cliente o a través de los medios habilitados por Winerim. El Cliente acepta la facturación electrónica salvo que solicite otro formato cuando legalmente proceda.\n\nEl Cliente será responsable de mantener actualizados sus datos fiscales y de pago. Los cambios no obligarán a modificar facturas ya emitidas correctamente con la información disponible en el momento de emisión."
    ],
    [
      "25. Actualización anual de precios",
      "El Cliente reconoce y acepta que Winerim podrá actualizar automáticamente sus precios cada año natural.\n\nCon efectos desde el 1 de enero de cada año, Winerim podrá aplicar una actualización anual de precios de entre el cinco por ciento (5%) y el diez por ciento (10%) sobre los precios vigentes durante el año anterior.\n\nEsta actualización responderá, entre otros motivos, al incremento de costes operativos, tecnológicos, infraestructura, soporte, mantenimiento, desarrollo de producto, seguridad, proveedores externos, inflación, evolución de la Plataforma y nuevas funcionalidades.\n\nLa actualización anual se entiende aceptada desde la contratación por formar parte de las condiciones económicas del contrato y no requerirá aceptación adicional. Winerim podrá comunicarla mediante email, plataforma, factura, presupuesto, renovación, comunicación comercial o cualquier otro medio escrito, sin que la falta de comunicación individualizada impida su aplicación cuando esté dentro del rango pactado.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento de cancelación previsto en estos Términos."
    ],
    [
      "26. Modificación extraordinaria de precios, planes y servicios",
      "Además de la actualización anual ordinaria, Winerim podrá modificar precios, planes, módulos, límites de uso, funcionalidades o condiciones económicas por razones técnicas, comerciales, operativas, fiscales, regulatorias, de divisa, de proveedores externos, de seguridad o de evolución del producto.\n\nCuando la modificación suponga un incremento del precio recurrente contratado fuera de la actualización anual ordinaria, Winerim lo comunicará al Cliente con una antelación mínima de quince (15) días naturales antes del siguiente cobro o renovación.\n\nSi el Cliente no está conforme, podrá solicitar la baja conforme al procedimiento previsto. La falta de baja en plazo o la continuidad de uso se entenderá como aceptación de las nuevas condiciones económicas."
    ],
    [
      "27. Cancelación y baja del servicio",
      "El Cliente podrá solicitar la cancelación de su suscripción exclusivamente mediante comunicación escrita enviada por correo electrónico a cancel@winerim.com.\n\nLa solicitud de baja deberá recibirse con una antelación mínima de quince (15) días naturales respecto de la fecha del siguiente cobro, renovación o periodo de facturación.\n\nLa solicitud deberá enviarse desde el correo asociado a la cuenta del Cliente o desde un correo que permita identificarlo razonablemente, e incluir como mínimo razón social, nombre comercial del establecimiento, identificación fiscal, país, servicio o suscripción cuya baja se solicita y fecha solicitada de baja.\n\nNo serán válidas a efectos de cancelación contractual las solicitudes realizadas por teléfono, WhatsApp, mensaje verbal, redes sociales, mensajes a comerciales, gestores, empleados, soporte operativo o cualquier canal distinto de cancel@winerim.com.\n\nLa baja será efectiva al finalizar el periodo de facturación en curso si la solicitud se recibe con la antelación mínima indicada. Si se recibe con menos de quince (15) días naturales, la baja producirá efectos al finalizar el periodo de facturación siguiente, quedando el Cliente obligado al pago de dicho periodo.\n\nLa cancelación no dará derecho a devolución de importes ya facturados o abonados, salvo acuerdo expreso por escrito de Winerim o exigencia legal. La baja no exime del pago de cantidades vencidas, facturas pendientes, impuestos, comisiones, servicios adicionales prestados o importes devengados antes de la fecha efectiva de baja."
    ],
    [
      "28. Impagos, devoluciones y suspensión",
      "En caso de impago, retraso, devolución de recibos, contracargo, fallo de tarjeta, rechazo bancario o incidencia de cobro, Winerim podrá reclamar el importe pendiente, comisiones bancarias, costes razonables de recobro e intereses legalmente aplicables.\n\nWinerim podrá suspender total o parcialmente el acceso a la Plataforma desde el incumplimiento de pago o tras aviso razonable, según la gravedad, sin que la suspensión libere al Cliente de sus obligaciones de pago.\n\nSi el impago persiste durante más de siete (7) días naturales desde la suspensión o requerimiento, Winerim podrá resolver la relación contractual, eliminar o limitar accesos y reclamar cantidades pendientes, daños, costes y perjuicios."
    ],
    [
      "29. Duración y renovación",
      "La duración inicial será la indicada en el plan, ficha de contratación, presupuesto, factura, orden de servicio o condición particular aceptada. A falta de indicación expresa, la duración será mensual renovable.\n\nSalvo baja válida conforme a la cláusula de cancelación, la suscripción se renovará automáticamente por periodos sucesivos equivalentes, aplicándose las tarifas vigentes, actualizaciones anuales y condiciones económicas aplicables.\n\nEn contratos anuales, pilotos con precio cerrado, compromisos mínimos o contratos con permanencia, no procederá devolución de periodos ya iniciados salvo pacto escrito distinto o exigencia legal."
    ],
    [
      "30. Suspensión y resolución por incumplimiento",
      "Winerim podrá suspender o resolver el servicio, con efecto inmediato o tras requerimiento de subsanación según la gravedad, en supuestos de impago, uso ilícito o abusivo, vulneración de propiedad intelectual, incumplimiento de confidencialidad, acceso o cesión no autorizada, uso por o para competidores, ingeniería inversa, scraping, extracción de datos, entrenamiento de IA no autorizado, monetización de datos o cualquier actuación que ponga en riesgo activos, seguridad o posición competitiva de Winerim.\n\nEn tales casos, Winerim podrá bloquear accesos, exigir el cese inmediato, ordenar retirada o destrucción de materiales, revocar licencias, conservar evidencias técnicas, reclamar indemnización y ejercitar acciones legales.\n\nEl Cliente podrá resolver la relación si Winerim incurre en incumplimiento grave no subsanado en un plazo razonable de treinta (30) días desde requerimiento escrito, siempre que el incumplimiento sea imputable a Winerim y no derive de terceros, fuerza mayor, impago o actuación del Cliente."
    ],
    [
      "31. Efectos de la terminación",
      "Finalizada la relación, cesará inmediatamente el derecho de uso del Cliente sobre la Plataforma y Winerim podrá desactivar accesos, retirar cartas públicas, detener integraciones y limitar funcionalidades.\n\nSalvo imposibilidad técnica o legal, Winerim permitirá al Cliente solicitar durante treinta (30) días naturales desde la terminación una exportación razonable de su información operativa alojada en la Plataforma, siempre que el Cliente esté al corriente de pago y la exportación no incluya Datos y Activos de Winerim, datos de otros clientes, secretos empresariales, taxonomías propietarias, modelos, reglas, estructuras, datasets enriquecidos o información no exportable.\n\nWinerim podrá conservar información necesaria para cumplimiento legal, facturación, seguridad, defensa de reclamaciones, evidencias de incumplimientos, copias de seguridad y registros internos, así como datos agregados, anonimizados o disociados.\n\nLas cláusulas de propiedad intelectual, prohibiciones de uso, no extracción, confidencialidad, protección de datos, limitación de responsabilidad, indemnidad, pagos pendientes, jurisdicción y cualesquiera otras que por su naturaleza deban subsistir permanecerán vigentes tras la terminación."
    ],
    [
      "32. Confidencialidad y secretos empresariales",
      "Ambas partes se comprometen a mantener la confidencialidad de la información técnica, comercial, estratégica, operativa, económica, financiera, jurídica, de producto, seguridad, clientes, precios, roadmap, datos y know-how a la que accedan con ocasión de la relación.\n\nEl Cliente reconoce que el software, arquitectura, bases de datos, taxonomías, modelos, recomendaciones, métricas, documentación, flujos, interfaces, lógica de negocio, datos enriquecidos y know-how de Winerim pueden constituir secretos empresariales.\n\nLa obligación de confidencialidad permanecerá durante la relación contractual y durante cinco (5) años tras su terminación. La información que constituya secreto empresarial, know-how, código, arquitectura, modelos, datos, seguridad o activos estratégicos de Winerim se protegerá mientras mantenga tal naturaleza.\n\nEl Cliente no podrá revelar a terceros información sobre funcionamiento, funcionalidades, detalles técnicos, estrategia, documentación, propuestas, precios no públicos, roadmap, datos, benchmarks o materiales de Winerim sin autorización escrita."
    ],
    [
      "33. Propiedad intelectual, industrial y bases de datos",
      "Todos los derechos de propiedad intelectual e industrial sobre Winerim, software, código, arquitectura, diseño, interfaz, marca, logotipos, documentación, bases de datos, taxonomías, modelos, algoritmos, reglas, imágenes, descripciones, traducciones, materiales, desarrollos, mejoras y activos asociados pertenecen a Winerim o sus licenciantes.\n\nEl Cliente no adquiere propiedad ni derechos de explotación por contratar, acceder o visualizar la Plataforma. Cualquier derecho no concedido expresamente queda reservado a Winerim.\n\nQueda prohibido reproducir, modificar, distribuir, transformar, comunicar públicamente, poner a disposición, sublicenciar, revender, crear obras derivadas, clonar, copiar, registrar, entrenar modelos, explotar datasets o utilizar activos de Winerim fuera del Uso Permitido.\n\nLas fotografías, textos, descripciones, fichas, traducciones, notas de cata, maridajes, etiquetas, taxonomías y contenidos proporcionados o enriquecidos por Winerim no podrán ser usados fuera de la Plataforma sin consentimiento previo y escrito."
    ],
    [
      "34. Uso comercial de nombre, logo y casos de éxito",
      "Salvo oposición escrita del Cliente o pacto particular distinto, Winerim podrá mencionar al Cliente como cliente de Winerim y utilizar su nombre comercial y logotipo en web, propuestas, presentaciones, redes sociales, materiales comerciales, portfolio y comunicaciones corporativas.\n\nLa publicación de métricas individualizadas, resultados económicos, datos de ventas, stock, márgenes o caso de éxito identificable requerirá autorización previa del Cliente, salvo que se utilicen datos agregados, anonimizados o no identificables."
    ],
    [
      "35. Protección de datos, privacidad y cookies",
      "El tratamiento de datos personales se regirá por la Política de Privacidad de Winerim y, cuando proceda, por el Anexo de Encargo de Tratamiento incluido en estos Términos o por un DPA específico.\n\nCada parte será responsable de los tratamientos de datos personales que realice por cuenta propia. Cuando Winerim trate datos personales por cuenta del Cliente, actuará como encargado del tratamiento conforme al Anexo correspondiente.\n\nEl Cliente declara disponer de base legal suficiente para incorporar datos personales a la Plataforma y se obliga a no cargar datos innecesarios, ilícitos, especialmente protegidos o de terceros sin legitimación.\n\nEl uso de cookies y tecnologías similares se limita, con carácter actual, a cookies técnicas estrictamente necesarias para el funcionamiento ordinario de la Plataforma y a las tecnologías de Stripe asociadas al proceso de pago, gestión de suscripciones, seguridad y prevención del fraude. Si Winerim incorporara en el futuro cookies no necesarias, como analítica, publicidad, medición o personalización no imprescindible, informará al usuario y habilitará los mecanismos de aceptación, rechazo o configuración cuando legalmente corresponda."
    ],
    [
      "36. Seguridad, auditorías y medidas técnicas",
      "Winerim aplicará medidas técnicas y organizativas razonables para proteger la Plataforma, datos y activos, incluyendo control de accesos, autenticación, roles, medidas de confidencialidad, copias de seguridad, monitorización, seguridad de proveedores y gestión de incidencias según corresponda.\n\nEl Cliente no podrá realizar pruebas de seguridad, pentesting, escaneos, auditorías técnicas, análisis de vulnerabilidades o monitorización no autorizada sobre Winerim sin autorización previa y escrita.\n\nWinerim podrá monitorizar logs, patrones de uso, accesos, solicitudes, dispositivos, IPs, descargas, uso de API y actividad para detectar fraude, abuso, scraping, ingeniería inversa, extracción de datos, uso competitivo, vulnerabilidades o incumplimientos."
    ],
    [
      "37. Limitación de responsabilidad",
      "Winerim responderá únicamente por daños directos efectivamente acreditados que deriven de incumplimiento contractual imputable a Winerim.\n\nSalvo dolo, culpa grave o responsabilidades que legalmente no puedan excluirse, la responsabilidad total acumulada de Winerim quedará limitada al importe efectivamente abonado por el Cliente a Winerim en los doce (12) meses anteriores al hecho causante de la reclamación.\n\nWinerim no responderá por lucro cesante, pérdida de ingresos, pérdida de oportunidad, pérdida de reputación, decisiones comerciales del Cliente, pérdida de datos no imputable a Winerim, interrupciones de terceros, fallos de internet, errores de contenido del Cliente, inexactitudes de cartas, disponibilidad real de productos, cumplimiento de normativa de alcohol, ni daños indirectos, incidentales, especiales, punitivos o consecuenciales.\n\nLa Plataforma se presta tal cual y según disponibilidad, salvo garantías expresas pactadas por escrito. Winerim no garantiza que las recomendaciones, maridajes, traducciones, analíticas, previsiones o outputs sean exactos, completos o adecuados para todos los supuestos."
    ],
    [
      "38. Indemnidad del Cliente",
      "El Cliente mantendrá indemne a Winerim frente a reclamaciones, sanciones, daños, costes, gastos, honorarios, pérdidas o responsabilidades derivadas de contenido aportado por el Cliente, incumplimiento legal, uso indebido, impago, vulneración de derechos de terceros, normativa de alcohol, licencias, fiscalidad local, accesos no autorizados, extracción de datos, ingeniería inversa, uso competitivo o incumplimiento de estos Términos.\n\nSi Winerim recibe una reclamación de tercero, autoridad o competidor derivada de actuación del Cliente, el Cliente colaborará en la defensa, asumirá costes razonables y resarcirá daños y gastos en la medida legalmente procedente."
    ],
    [
      "39. Fuerza mayor",
      "Ninguna parte será responsable de retrasos o incumplimientos derivados de causas fuera de su control razonable, incluyendo desastres naturales, incendios, inundaciones, pandemias, conflictos, actos gubernamentales, huelgas, fallos eléctricos, fallos generalizados de telecomunicaciones, ataques a infraestructuras, ciberataques, interrupciones de proveedores críticos, indisponibilidad de tiendas de aplicaciones o cambios normativos imprevistos.\n\nLa parte afectada procurará comunicar la situación y mitigar sus efectos cuando resulte razonablemente posible. Si la fuerza mayor impide sustancialmente la prestación durante más de treinta (30) días, cualquiera de las partes podrá resolver el servicio afectado sin penalización, sin perjuicio de importes devengados."
    ],
    [
      "40. Cesión, subcontratación y operaciones societarias",
      "El Cliente no podrá ceder, transferir ni subcontratar sus derechos u obligaciones sin consentimiento previo y escrito de Winerim.\n\nWinerim podrá subcontratar parte de la prestación del servicio con proveedores técnicos, profesionales, cloud, pagos, soporte, analítica, IA, integraciones u otros necesarios, manteniendo la responsabilidad contractual que legalmente corresponda.\n\nWinerim podrá ceder estos Términos, la relación contractual, créditos, derechos, obligaciones o datos asociados en el marco de reorganización societaria, fusión, adquisición, venta de negocio, financiación, aportación de rama de actividad o transmisión de activos vinculados a Winerim, notificándolo cuando sea razonable o legalmente exigible."
    ],
    [
      "41. Notificaciones",
      "Para notificaciones ordinarias, Winerim podrá utilizar el email facilitado por el Cliente, avisos en la Plataforma, factura, presupuesto, panel, web o cualquier otro medio escrito razonable.\n\nEl Cliente deberá mantener actualizados sus datos de contacto. Las notificaciones enviadas al email registrado se considerarán válidamente realizadas salvo error imputable a Winerim.\n\nLas comunicaciones de baja solo serán válidas si se remiten a cancel@winerim.com conforme a la cláusula de cancelación."
    ],
    [
      "42. Cumplimiento normativo y sanciones",
      "El Cliente declara que no está sujeto a sanciones, embargos, restricciones comerciales o prohibiciones que impidan contratar con Winerim o utilizar la Plataforma.\n\nEl Cliente se compromete a no usar Winerim en actividades ilegales, territorios prohibidos, sectores restringidos, para fraude, blanqueo, evasión fiscal, infracción de derechos, scraping, competencia desleal o incumplimiento de leyes de control de exportaciones, sanciones internacionales o normativa equivalente."
    ],
    [
      "43. Modificación de estos Términos",
      "Winerim podrá actualizar estos Términos para reflejar cambios legales, técnicos, operativos, comerciales, de seguridad, proveedores, funcionalidades, estructura societaria, modelo de negocio o riesgos detectados.\n\nCuando una modificación afecte de forma material a derechos u obligaciones esenciales del Cliente, Winerim procurará comunicarla por email, aviso en Plataforma, factura, web u otro medio razonable antes de su entrada en vigor.\n\nEl uso continuado de la Plataforma tras la entrada en vigor se entenderá como aceptación de los nuevos Términos, sin perjuicio del derecho del Cliente a solicitar la baja conforme al procedimiento previsto."
    ],
    [
      "44. Nulidad parcial, interpretación y acuerdo completo",
      "Si alguna cláusula fuera declarada nula, inválida o inaplicable, ello no afectará al resto del contrato, que permanecerá vigente. La cláusula afectada se sustituirá por otra válida que se aproxime a la finalidad económica y jurídica perseguida.\n\nLa falta de ejercicio por Winerim de un derecho no constituirá renuncia. Los títulos son orientativos y no limitan el contenido de las cláusulas.\n\nEstos Términos, junto con la Política de Privacidad, Política de Cookies, Anexo de Encargo de Tratamiento, ficha de contratación, presupuesto, pedido, plan, factura o condiciones particulares aceptadas, constituyen el acuerdo completo entre las partes y sustituyen cualquier comunicación o acuerdo anterior sobre el mismo objeto."
    ],
    [
      "45. Ley aplicable y jurisdicción",
      "Estos Términos se regirán e interpretarán conforme al derecho español.\n\nPara cualquier controversia derivada de la interpretación, cumplimiento, incumplimiento o terminación de estos Términos, las partes se someten expresamente a los Juzgados y Tribunales de Donostia-San Sebastián, con renuncia a cualquier otro fuero que pudiera corresponderles, salvo norma imperativa en contrario."
    ],
    [
      "46. Contactos",
      "Para soporte, incidencias ordinarias y comunicaciones generales: info@winerim.com.\n\nPara solicitudes de cancelación o baja del servicio: cancel@winerim.com, único canal contractual válido para bajas.\n\nPara privacidad y protección de datos: info@winerim.com.\n\nANEXO I. Ficha de contratación / Orden de Servicio\n\nEsta hoja de contratación puede completarse por cada cliente o incorporarse a presupuesto, pedido, oferta, enlace de pago, factura proforma o documento equivalente. En caso de contradicción, prevalecerá lo específicamente pactado en esta hoja solo respecto de la materia concreta regulada.\n\nRazón social del Cliente\n\n[RAZÓN_SOCIAL_CLIENTE]\n\nNombre comercial / establecimiento\n\n[NOMBRE_COMERCIAL]\n\nDomicilio del establecimiento\n\n[DIRECCIÓN_ESTABLECIMIENTO]\n\nIdentificación fiscal\n\n[CIF_NIF_VAT_CUIT_ID_FISCAL]\n\nPersona de contacto\n\n[NOMBRE_CONTACTO]\n\nEmail operativo\n\n[EMAIL_OPERATIVO]\n\nEmail de facturación\n\n[EMAIL_FACTURACIÓN]\n\nPlan contratado\n\n[PLAN]\n\nPeriodicidad\n\n[MENSUAL / ANUAL / PILOTO / GRUPO]\n\nPrecio\n\n[IMPORTE] EUR + impuestos aplicables\n\nFecha de activación\n\n[FECHA_ACTIVACIÓN]\n\nPermanencia inicial\n\n[SÍ / NO / DURACIÓN]\n\nForma de pago\n\n[TARJETA / TRANSFERENCIA / DOMICILIACIÓN / OTRO]\n\nSoporte incluido\n\n[HORARIO / CANALES / SLA SI EXISTE]\n\nServicios incluidos adicionales\n\n[DESCRIPCIÓN]\n\nServicios excluidos o a presupuestar\n\n[DESCRIPCIÓN]\n\nAutorización de uso de logo\n\n[SÍ / NO / CONDICIONES]\n\nCondiciones particulares\n\n[CONDICIONES_PARTICULARES]\n\nFirma o aceptación: el Cliente acepta estos Términos mediante firma, aceptación electrónica, confirmación escrita, pago, uso efectivo de la Plataforma o cualquier otro acto inequívoco de contratación.\n\nANEXO II. Acuerdo de Encargo de Tratamiento de Datos\n\nA.1. Objeto, duración y finalidad\n\nEste Anexo regula los tratamientos de datos personales que Winerim pueda realizar por cuenta del Cliente cuando el Cliente actúe como responsable del tratamiento y Winerim como encargado, en el marco de la prestación del servicio SaaS.\n\nEl objeto del tratamiento es permitir la prestación de la Plataforma, incluyendo alojamiento, configuración, publicación de cartas digitales, panel de control, soporte, mantenimiento, seguridad, analítica, integraciones y servicios asociados.\n\nLa duración coincidirá con la vigencia de la relación contractual y con los periodos posteriores necesarios para devolución, supresión, bloqueo, conservación legal, copias de seguridad, defensa frente a reclamaciones o cumplimiento normativo.\n\nA.2. Categorías de datos y personas afectadas\n\nLos datos podrán incluir datos identificativos y de contacto de representantes, administradores, empleados, colaboradores o usuarios autorizados del Cliente; credenciales; logs; datos de uso; datos de soporte; datos de facturación; y, cuando el Cliente los incorpore o conecte, datos operativos vinculados a ventas, stock, pedidos, reservas, preferencias o interacciones.\n\nLas personas afectadas podrán ser representantes del Cliente, personal del establecimiento, administradores, colaboradores, proveedores, comensales o usuarios finales, siempre en la medida en que sus datos sean tratados en el servicio.\n\nNo está previsto el tratamiento de categorías especiales de datos personales. El Cliente no deberá incorporar datos de salud, ideología, religión, afiliación sindical, datos biométricos, genéticos, vida sexual, orientación sexual, infracciones penales u otros datos especialmente protegidos salvo instrucción documentada, base legal suficiente y aceptación expresa de Winerim.\n\nA.3. Instrucciones del Cliente\n\nWinerim tratará los datos personales por cuenta del Cliente únicamente conforme a estos Términos, la Política de Privacidad, las instrucciones documentadas del Cliente y la normativa aplicable.\n\nSi Winerim considera que una instrucción infringe la normativa aplicable, podrá informar al Cliente y suspender su ejecución en la medida necesaria para evitar incumplimientos legales, riesgos de seguridad o perjuicios a terceros.\n\nA.4. Obligaciones de Winerim como encargado\n\nWinerim se obliga a tratar los datos conforme a instrucciones documentadas; garantizar que las personas autorizadas a tratarlos estén sujetas a deber de confidencialidad; aplicar medidas técnicas y organizativas apropiadas; asistir razonablemente al Cliente en solicitudes de derechos, brechas, evaluaciones de impacto o consultas previas cuando proceda; y suprimir o devolver los datos al finalizar el servicio salvo obligación de conservación.\n\nLa asistencia que exceda el soporte ordinario, requiera desarrollos, auditorías específicas, exportaciones complejas o tareas extraordinarias podrá presupuestarse aparte.\n\nA.5. Subencargados\n\nEl Cliente autoriza a Winerim a utilizar subencargados necesarios para prestar el servicio, incluyendo proveedores de alojamiento, almacenamiento, seguridad, monitorización, pagos, facturación, email, soporte, analítica, inteligencia artificial, traducción, integraciones, tiendas de aplicaciones y otros servicios técnicos.\n\nWinerim exigirá a sus subencargados obligaciones de protección de datos sustancialmente equivalentes a las asumidas en este Anexo. Winerim podrá incorporar o sustituir subencargados cuando sea necesario para la prestación del servicio, informando por medios razonables cuando sea legalmente exigible.\n\nEl listado real de subencargados deberá mantenerse actualizado en la documentación interna o pública de Winerim y facilitarse al Cliente previa solicitud razonable.\n\nA.6. Transferencias internacionales\n\nCuando el tratamiento implique transferencias internacionales de datos personales fuera del Espacio Económico Europeo o territorios con decisión de adecuación, Winerim adoptará garantías adecuadas conforme al RGPD, incluyendo cláusulas contractuales tipo, decisiones de adecuación, medidas suplementarias u otros mecanismos legalmente válidos.\n\nA.7. Seguridad y brechas\n\nWinerim aplicará medidas proporcionales de control de acceso, confidencialidad, integridad, disponibilidad, segregación lógica, copias de seguridad, monitorización, gestión de incidencias, cifrado cuando proceda y seguridad organizativa.\n\nEn caso de violación de seguridad de datos personales que afecte a datos tratados por cuenta del Cliente, Winerim notificará al Cliente sin dilación indebida desde que tenga conocimiento razonable del incidente, proporcionando la información disponible para que el Cliente pueda cumplir sus obligaciones legales.\n\nA.8. Derechos de los interesados y auditorías\n\nCuando Winerim reciba una solicitud de acceso, rectificación, supresión, oposición, limitación o portabilidad relacionada con datos tratados por cuenta del Cliente, remitirá la solicitud al Cliente o prestará asistencia razonable, salvo que Winerim actúe como responsable independiente respecto de dicho tratamiento.\n\nEl Cliente podrá solicitar información razonable para verificar el cumplimiento de este Anexo. Las auditorías presenciales o técnicas requerirán preaviso, confidencialidad, alcance limitado, no afectación a la seguridad ni a otros clientes y podrán estar sujetas a costes cuando excedan la asistencia ordinaria.\n\nA.9. Devolución y supresión\n\nA la finalización del contrato, Winerim suprimirá o devolverá los datos personales tratados por cuenta del Cliente conforme a instrucciones razonables, salvo obligación legal de conservación, bloqueo, defensa de reclamaciones, copias de seguridad o necesidad técnica temporal.\n\nLa supresión de datos no afectará a datos agregados, anonimizados o disociados que no permitan identificar razonablemente a una persona física."
    ]
  ],
  "links": [
    [
      "Inicio",
      "/"
    ],
    [
      "Contacto",
      "/contacto"
    ],
    [
      "Demo",
      "/demo"
    ],
    [
      "Privacidad",
      "/politica-privacidad"
    ]
  ]
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
      ['Arquitectura operativa', 'CloudRIM recoge documentos, tarifas, ventas y stock; Wine Cellar localiza cada botella; Wine Lockers controla reservas privadas; MarginRIM y StockRIM preparan senales de margen y rotacion; Winerim Supply convierte compras y proveedores en una operacion trazable; SAVia explica la decision antes de ejecutarla.'],
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
  '/precios-modulos-integraciones': {
    lang: 'es',
    title: 'Precios módulos e integraciones Winerim | Core, TPV, Gestión, Márgenes e Intelligence',
    description: 'Precios de Winerim por módulos e integraciones: Core, TPV, Gestión, Márgenes, Intelligence y Full Managed.',
    h1: 'Precios de Winerim por módulos e integraciones',
    subtitle: 'Una estructura clara para activar solo el nivel operativo que necesita tu restaurante.',
    canonical: '/precios-modulos-integraciones',
    schemaType: 'WebPage',
    sections: [
      ['Core', 'Core cuesta 99 €/mes con pago anual y 150 €/mes con pago mensual. Es la base operativa: carta viva, fichas, filtros, QR, panel de edición y soporte humano.'],
      ['TPV', 'TPV cuesta 75 €/mes con pago anual y 99 €/mes con pago mensual. Conecta ventas reales, referencias, rotación, ticket medio y rendimiento por servicio.'],
      ['Gestión', 'Gestión cuesta 179 €/mes con pago anual y 220 €/mes con pago mensual. Incluye CloudRIM, albaranes, facturas, distribuidores, tarifas, stock y costes conectados dentro de Winerim.'],
      ['Márgenes', 'Márgenes cuesta 249 €/mes con pago anual y 299 €/mes con pago mensual. Añade margen por referencia, stock dormido, rotación, precio por copa, fugas de margen y señales RIM.'],
      ['Intelligence', 'Intelligence cuesta 349 €/mes con pago anual y 425 €/mes con pago mensual. Incorpora SAVia, informes, alertas y preparación de decisiones sobre carta, ventas, stock y márgenes.'],
      ['Full / Managed', 'Full / Managed empieza desde 599 €/mes con pago anual y desde 799 €/mes con pago mensual. Está pensado para multi-local, integraciones avanzadas, reporting ejecutivo y acompañamiento operativo continuo.'],
    ],
    links: [['Planes y precios', '/precios'], ['Integraciones', '/integraciones'], ['Funcionalidades', '/funcionalidades'], ['CloudRIM', '/producto/cloudrim'], ['SAVia', '/producto/savia'], ['Solicitar demo', '/demo']],
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
  ...LEGAL_WORKER_PAGES,
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

const WORKER_LEGAL_HUMAN_ROUTES = new Set([
  '/politica-privacidad',
  '/privacidad',
  '/terminos-y-condiciones-del-contrato',
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

const WORKER_STATIC_HUMAN_ROUTES = new Set([
  '/precios-modulos-integraciones',
  ...WORKER_LEGAL_HUMAN_ROUTES,
]);

const WORKER_HUMAN_CONTENT_PATCH_ROUTES = new Set([]);

const WORKER_LEGAL_DOCUMENT_ROUTES = {
  '/politica-privacidad': ['privacy', 'es'],
  '/privacidad': ['privacy', 'es'],
  '/terminos-y-condiciones-del-contrato': ['terms', 'es'],
  '/terminos': ['terms', 'es'],
  '/en/privacy': ['privacy', 'en'],
  '/en/terms': ['terms', 'en'],
  '/it/privacy': ['privacy', 'it'],
  '/it/termini': ['terms', 'it'],
  '/fr/confidentialite': ['privacy', 'fr'],
  '/fr/conditions': ['terms', 'fr'],
  '/de/datenschutz': ['privacy', 'de'],
  '/de/agb': ['terms', 'de'],
  '/pt/privacidade': ['privacy', 'pt'],
  '/pt/termos': ['terms', 'pt'],
};

const WORKER_LEGAL_CANONICAL_ROUTES = {
  privacy: {
    es: '/politica-privacidad',
    en: '/en/privacy',
    it: '/it/privacy',
    fr: '/fr/confidentialite',
    de: '/de/datenschutz',
    pt: '/pt/privacidade',
  },
  terms: {
    es: '/terminos-y-condiciones-del-contrato',
    en: '/en/terms',
    it: '/it/termini',
    fr: '/fr/conditions',
    de: '/de/agb',
    pt: '/pt/termos',
  },
};

const WORKER_LEGAL_SOURCE_COPY = {
  es: {
    label: 'Documento España',
    note: 'Aplicable a clientes con establecimiento, domicilio fiscal o centro principal de actividad en España.',
  },
  en: {
    label: 'International document',
    note: 'Applicable to customers located outside Spain, unless otherwise agreed in writing.',
  },
  it: {
    label: 'Documento internazionale',
    note: 'Applicabile ai clienti situati fuori dalla Spagna, salvo diverso accordo scritto.',
  },
  fr: {
    label: 'Document international',
    note: 'Applicable aux clients situés hors d’Espagne, sauf accord écrit contraire.',
  },
  de: {
    label: 'Internationales Dokument',
    note: 'Gilt für Kunden außerhalb Spaniens, sofern schriftlich nichts anderes vereinbart ist.',
  },
  pt: {
    label: 'Documento internacional',
    note: 'Aplicável a clientes localizados fora de Espanha, salvo acordo escrito em contrário.',
  },
};

const LEGAL_FOOTER_PATCH_SCRIPT = `<script data-winerim-legal-footer-patch>
(() => {
  const legalRoutes = new Set([
    '/politica-privacidad',
    '/privacidad',
    '/terminos-y-condiciones-del-contrato',
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
    '/privacy-policy',
    '/terms-of-service',
    '/condiciones-de-servicio-2'
  ]);
  const normalizedLegalPath = (href) => {
    try {
      const url = new URL(href, window.location.origin);
      return url.origin === window.location.origin ? url.pathname : null;
    } catch (_) {
      return null;
    }
  };
  const applyLegalFooterLinks = () => {
    document.querySelectorAll('footer a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === '/privacidad' || href.endsWith('/privacidad')) {
        link.setAttribute('href', '/politica-privacidad');
      }
      if (href === '/terminos' || href.endsWith('/terminos')) {
        link.setAttribute('href', '/terminos-y-condiciones-del-contrato');
      }
    });
  };
  document.addEventListener('click', (event) => {
    const link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    const legalPath = normalizedLegalPath(link.getAttribute('href') || '');
    if (!legalPath || !legalRoutes.has(legalPath)) return;
    event.preventDefault();
    window.location.assign(legalPath);
  }, true);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLegalFooterLinks, { once: true });
  } else {
    applyLegalFooterLinks();
  }
  const observer = new MutationObserver(applyLegalFooterLinks);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 15000);
})();
</script>`;

const WORKER_HUMAN_CONTENT_PATCH_SCRIPT = `<script data-winerim-human-content-patch>
(() => {
  const path = window.location.pathname;
  const legalRoutes = {
    '/politica-privacidad': ['privacy', 'es'],
    '/privacidad': ['privacy', 'es'],
    '/terminos-y-condiciones-del-contrato': ['terms', 'es'],
    '/terminos': ['terms', 'es'],
    '/en/privacy': ['privacy', 'en'],
    '/en/terms': ['terms', 'en'],
    '/it/privacy': ['privacy', 'it'],
    '/it/termini': ['terms', 'it'],
    '/fr/confidentialite': ['privacy', 'fr'],
    '/fr/conditions': ['terms', 'fr'],
    '/de/datenschutz': ['privacy', 'de'],
    '/de/agb': ['terms', 'de'],
    '/pt/privacidade': ['privacy', 'pt'],
    '/pt/termos': ['terms', 'pt'],
  };
  const staticPages = {
    '/precios-modulos-integraciones': {
      title: 'Precios de Winerim por módulos e integraciones',
      seoTitle: 'Precios módulos e integraciones Winerim | Core, TPV, Gestión, Márgenes e Intelligence',
      sourceLabel: 'Precios Winerim',
      summary: [
        'Una estructura clara para activar solo el nivel operativo que necesita tu restaurante.',
        'Core, TPV, Gestión, Márgenes, Intelligence y Full / Managed.'
      ],
      metaRows: [
        { label: 'Core', value: '99 €/mes anual · 150 €/mes mensual' },
        { label: 'TPV', value: '75 €/mes anual · 99 €/mes mensual' },
        { label: 'Gestión', value: '179 €/mes anual · 220 €/mes mensual' },
        { label: 'Márgenes', value: '249 €/mes anual · 299 €/mes mensual' },
        { label: 'Intelligence', value: '349 €/mes anual · 425 €/mes mensual' },
        { label: 'Full / Managed', value: 'desde 599 €/mes anual · desde 799 €/mes mensual' }
      ],
      sections: [
        { heading: 'Core', blocks: ['Core cuesta 99 €/mes con pago anual y 150 €/mes con pago mensual. Es la base operativa: carta viva, fichas, filtros, QR, panel de edición y soporte humano.'] },
        { heading: 'TPV', blocks: ['TPV cuesta 75 €/mes con pago anual y 99 €/mes con pago mensual. Conecta ventas reales, referencias, rotación, ticket medio y rendimiento por servicio.'] },
        { heading: 'Gestión', blocks: ['Gestión cuesta 179 €/mes con pago anual y 220 €/mes con pago mensual. Incluye CloudRIM, albaranes, facturas, distribuidores, tarifas, stock y costes conectados dentro de Winerim.'] },
        { heading: 'Márgenes', blocks: ['Márgenes cuesta 249 €/mes con pago anual y 299 €/mes con pago mensual. Añade margen por referencia, stock dormido, rotación, precio por copa, fugas de margen y señales RIM.'] },
        { heading: 'Intelligence', blocks: ['Intelligence cuesta 349 €/mes con pago anual y 425 €/mes con pago mensual. Incorpora SAVia, informes, alertas y preparación de decisiones sobre carta, ventas, stock y márgenes.'] },
        { heading: 'Full / Managed', blocks: ['Full / Managed empieza desde 599 €/mes con pago anual y desde 799 €/mes con pago mensual. Está pensado para multi-local, integraciones avanzadas, reporting ejecutivo y acompañamiento operativo continuo.'] }
      ]
    }
  };
  const legalRoute = legalRoutes[path];
  const staticPage = staticPages[path];
  if (!legalRoute && !staticPage) return;

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  };
  const addMeta = (parent, rows) => {
    if (!rows || !rows.length) return;
    const dl = make('dl', 'grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 mb-12');
    rows.forEach((row) => {
      const item = make('div', 'bg-card p-5');
      item.appendChild(make('dt', 'text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2', row.label));
      item.appendChild(make('dd', 'text-sm text-foreground leading-relaxed', row.value));
      dl.appendChild(item);
    });
    parent.appendChild(dl);
  };
  const addSections = (parent, sections) => {
    const wrap = make('div', 'space-y-10');
    (sections || []).forEach((section) => {
      const s = make('section', 'scroll-mt-28');
      s.appendChild(make('h2', 'font-heading text-xl md:text-2xl font-semibold mb-4', section.heading));
      const content = make('div', 'space-y-3 text-sm md:text-base leading-relaxed text-muted-foreground');
      (section.blocks || []).forEach((block) => {
        String(block).split('\\n\\n').filter(Boolean).forEach((part) => {
          if (part.trim().startsWith('•')) {
            const ul = make('ul', 'list-disc pl-5');
            ul.appendChild(make('li', '', part.trim().replace(/^•\\s*/, '')));
            content.appendChild(ul);
          } else {
            const p = make('p', '', part);
            p.style.whiteSpace = 'pre-line';
            content.appendChild(p);
          }
        });
      });
      s.appendChild(content);
      wrap.appendChild(s);
    });
    parent.appendChild(wrap);
  };
  const render = (doc) => {
    const currentMain = document.querySelector('main') || document.querySelector('#root .flex-1');
    document.title = doc.seoTitle || doc.title || document.title;
    if (!currentMain || currentMain.dataset.winerimHumanContentPatched === 'true') return !!currentMain;
    const main = make('main', 'pt-32 pb-24 max-w-5xl mx-auto px-6 md:px-12');
    main.dataset.winerimHumanContentPatched = 'true';
    const head = make('div', 'mb-10');
    head.appendChild(make('p', 'text-xs uppercase tracking-[0.18em] text-wine mb-4', doc.sourceLabel || 'Winerim'));
    head.appendChild(make('h1', 'font-heading text-3xl md:text-5xl font-bold mb-5', doc.title));
    const summary = make('div', 'space-y-2 text-muted-foreground max-w-3xl');
    (doc.summary || []).forEach((line) => summary.appendChild(make('p', '', line)));
    if (doc.sourceNote) summary.appendChild(make('p', 'text-sm text-foreground/80', doc.sourceNote));
    head.appendChild(summary);
    main.appendChild(head);
    addMeta(main, doc.metaRows);
    addSections(main, doc.sections);
    currentMain.replaceWith(main);
    return true;
  };
  let pendingDoc = null;
  const apply = (doc) => {
    if (!doc) return;
    pendingDoc = doc;
    render(doc);
  };
  if (staticPage) {
    apply(staticPage);
  } else {
    fetch('/legal/legalDocuments.json', { credentials: 'same-origin' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('legal documents unavailable')))
      .then((documents) => {
        const [kind, lang] = legalRoute;
        apply((documents[kind] && (documents[kind][lang] || documents[kind].es)) || null);
      })
      .catch(() => {});
  }
  const observer = new MutationObserver(() => {
    if (pendingDoc) apply(pendingDoc);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 15000);
})();
</script>`;

function injectLegalFooterPatch(html) {
  if (!html || html.includes('data-winerim-legal-footer-patch')) return html;
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${LEGAL_FOOTER_PATCH_SCRIPT}</body>`);
  }
  return `${html}${LEGAL_FOOTER_PATCH_SCRIPT}`;
}

function injectWorkerHumanContentPatch(html) {
  if (!html || html.includes('data-winerim-human-content-patch')) return html;
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${WORKER_HUMAN_CONTENT_PATCH_SCRIPT}</body>`);
  }
  return `${html}${WORKER_HUMAN_CONTENT_PATCH_SCRIPT}`;
}

function workerTitleFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map(part => part.length <= 3 ? part.toUpperCase() : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function resolveWorkerWineLibraryShellPath(path) {
  for (const [lang, base] of Object.entries(WINE_LIBRARY_BASES)) {
    if (path === base) return { lang, esPath: '/biblioteca-vino' };
    if (!path.startsWith(`${base}/`)) continue;

    const relative = path.slice(base.length + 1);
    const [localizedSection, ...restParts] = relative.split('/');
    const sections = WINE_LIBRARY_SECTION_MAP[lang] || WINE_LIBRARY_SECTION_MAP.es;
    const esSection = Object.entries(sections).find(([, value]) => value === localizedSection)?.[0] || localizedSection;
    const rest = restParts.length ? `/${restParts.join('/')}` : '';
    return { lang, esPath: `/biblioteca-vino/${esSection}${rest}` };
  }

  return null;
}

function getWorkerWineLibraryShellTermLabel(slug, lang) {
  return WINE_LIBRARY_SHELL_TERM_LABELS[slug]?.[lang] || workerTitleFromSlug(slug);
}

function getWorkerWineLibraryShellMetadata(path, site) {
  const resolved = resolveWorkerWineLibraryShellPath(path);
  if (!resolved) return null;

  const { lang, esPath } = resolved;
  const copy = WINE_LIBRARY_SHELL_COPY[lang] || WINE_LIBRARY_SHELL_COPY.es;
  const parts = esPath.split('/').filter(Boolean);
  const section = parts[1];
  const sectionTitle = copy.sections[section] || copy.home;
  const isSectionHub = esPath === '/biblioteca-vino' || parts.length === 2;
  const subject = isSectionHub ? sectionTitle : getWorkerWineLibraryShellTermLabel(parts[parts.length - 1], lang);
  const type = isSectionHub ? sectionTitle.toLowerCase() : copy.detail[section] || copy.detail.article;

  return {
    lang,
    title: isSectionHub ? `${sectionTitle} | Winerim` : `${subject}: ${type} | Winerim`,
    description: isSectionHub
      ? copy.description(sectionTitle, copy.detail.article)
      : copy.description(subject, type),
    canonical: `${site}${localizeWineLibraryPath(lang, esPath)}`,
    robots: 'index, follow',
  };
}

function getWorkerShellMetadata(path, site) {
  const page = STATIC_WORKER_PRERENDER_PAGES[path];
  if (page) {
    const canonicalPath = page.canonical || path;
    return {
      lang: page.lang || 'es',
      title: page.title,
      description: page.description,
      canonical: canonicalPath.startsWith('http') ? canonicalPath : `${site}${canonicalPath}`,
      robots: page.robots || 'index, follow',
    };
  }

  return getWorkerWineLibraryShellMetadata(path, site);
}

function replaceOrInsertHeadTag(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, () => replacement);
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `  ${replacement}\n</head>`);
  return `${replacement}\n${html}`;
}

function injectWorkerShellMetadataPatch(html, path, site) {
  const meta = getWorkerShellMetadata(path, site);
  if (!html || !meta) return html;

  const locale = ({ es: 'es_ES', en: 'en_GB', it: 'it_IT', fr: 'fr_FR', de: 'de_DE', pt: 'pt_PT' })[meta.lang] || 'es_ES';
  let patched = html.replace(/<html\b[^>]*>/i, `<html lang="${escapeHtml(meta.lang)}" dir="ltr">`);

  patched = replaceOrInsertHeadTag(patched, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, `<meta name="description" content="${escapeHtml(meta.description)}">`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i, `<meta name="robots" content="${escapeHtml(meta.robots)}">`);
  patched = replaceOrInsertHeadTag(patched, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${escapeHtml(meta.canonical)}">`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bproperty=["']og:title["'])[^>]*>/i, `<meta property="og:title" content="${escapeHtml(meta.title)}">`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bproperty=["']og:description["'])[^>]*>/i, `<meta property="og:description" content="${escapeHtml(meta.description)}">`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i, `<meta property="og:url" content="${escapeHtml(meta.canonical)}">`);
  patched = replaceOrInsertHeadTag(patched, /<meta\b(?=[^>]*\bproperty=["']og:locale["'])[^>]*>/i, `<meta property="og:locale" content="${escapeHtml(locale)}">`);

  return patched;
}

function injectWorkerHtmlPatches(html, path, site = 'https://winerim.wine') {
  const patchedHtml = injectWorkerShellMetadataPatch(html, path, site);
  if (!WORKER_HUMAN_CONTENT_PATCH_ROUTES.has(path)) return patchedHtml;
  return injectWorkerHumanContentPatch(patchedHtml);
}

function buildLegalDocumentsPayload(site) {
  const documents = { terms: {}, privacy: {} };
  for (const [kind, routesByLanguage] of Object.entries(WORKER_LEGAL_CANONICAL_ROUTES)) {
    for (const [lang, path] of Object.entries(routesByLanguage)) {
      const page = LEGAL_WORKER_PAGES[path];
      if (!page) continue;
      const firstNumberedSectionIndex = (page.sections || [])
        .findIndex(([heading]) => /^\d+\.\s+/.test(heading));
      const metaSections = firstNumberedSectionIndex > 0
        ? page.sections.slice(0, firstNumberedSectionIndex)
        : [];
      const bodySections = firstNumberedSectionIndex > 0
        ? page.sections.slice(firstNumberedSectionIndex)
        : page.sections || [];
      const sourceCopy = WORKER_LEGAL_SOURCE_COPY[lang] || WORKER_LEGAL_SOURCE_COPY.es;
      const summary = page.subtitle
        ? page.subtitle.split(' · ').filter(part => part && part !== sourceCopy.note)
        : [page.description].filter(Boolean);

      documents[kind][lang] = {
        kind,
        source: lang === 'es' ? 'spain' : 'international',
        brand: 'winerim',
        title: page.h1 || page.title,
        summary,
        metaRows: metaSections.map(([label, value]) => ({ label, value })),
        sections: bodySections.map(([heading, body]) => ({
          heading,
          blocks: String(body || '').split(/\n\n+/).filter(Boolean),
        })),
        lang,
        path,
        canonical: `${site}${page.canonical || path}`,
        seoTitle: page.title,
        seoDescription: page.description,
        sourceLabel: sourceCopy.label,
        sourceNote: sourceCopy.note,
      };
    }
  }
  return documents;
}

function buildLegalDocumentsJsonResponse(site) {
  return JSON.stringify(buildLegalDocumentsPayload(site));
}

function stripProductionNoiseScripts(html) {
  return String(html || '')
    .replace(/<script\b[^>]*\bsrc=["']\/~flock\.js["'][\s\S]*?<\/script>\s*/gi, '')
    .replace(/<script\b[^>]*\bsrc=["']\/__l5e\/events\.js["'][\s\S]*?<\/script>\s*/gi, '');
}

function stripInternalArticleMarkers(html) {
  return String(html || '')
    .replace(/[\t ]*(?:<!--|&lt;!--)\s*winerim-content-expansion-[\s\S]*?(?:-->|--&gt;)[\t ]*(?:\r?\n)?/gi, '')
    .trimStart();
}

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
    .join('');
  const homePath = page.lang === 'es' ? '/' : `/${page.lang}`;
  const isLegalPage = WORKER_LEGAL_HUMAN_ROUTES.has(path);
  const useWebShell = WORKER_STATIC_HUMAN_ROUTES.has(path);
  const legalRouteMap = {
    es: {
      '/': '/',
      '/software-carta-de-vinos': '/software-carta-de-vinos',
      '/soluciones': '/soluciones',
      '/blog': '/blog',
      '/precios': '/precios',
      '/demo': '/demo',
      '/funcionalidades': '/funcionalidades',
      '/guias-y-recursos': '/guias-y-recursos',
      '/analisis-carta': '/analisis-carta',
      '/decision-center': '/decision-center',
      '/contacto': '/contacto',
      '/politica-privacidad': '/politica-privacidad',
      '/terminos-y-condiciones-del-contrato': '/terminos-y-condiciones-del-contrato',
      '/producto/cloudrim': '/producto/cloudrim',
      '/producto/savia': '/producto/savia',
    },
    en: {
      '/': '/en',
      '/software-carta-de-vinos': '/en/wine-list-management-software',
      '/soluciones': '/en/solutions',
      '/blog': '/en/blog',
      '/precios': '/en/pricing',
      '/demo': '/en/demo',
      '/funcionalidades': '/en/features',
      '/guias-y-recursos': '/en/guides',
      '/analisis-carta': '/en/wine-list-analysis',
      '/decision-center': '/en/decision-center',
      '/contacto': '/en/contact',
      '/politica-privacidad': '/en/privacy',
      '/terminos-y-condiciones-del-contrato': '/en/terms',
      '/producto/cloudrim': '/en/product/cloudrim',
      '/producto/savia': '/en/product/savia',
    },
    it: {
      '/': '/it',
      '/software-carta-de-vinos': '/it/software-carta-vini',
      '/soluciones': '/it/soluzioni',
      '/blog': '/it/blog',
      '/precios': '/it/prezzi',
      '/demo': '/it/demo',
      '/funcionalidades': '/it/funzionalita',
      '/guias-y-recursos': '/it/guide',
      '/analisis-carta': '/it/analisi-carta',
      '/decision-center': '/it/decision-center',
      '/contacto': '/it/contatto',
      '/politica-privacidad': '/it/privacy',
      '/terminos-y-condiciones-del-contrato': '/it/termini',
      '/producto/cloudrim': '/it/prodotto/cloudrim',
      '/producto/savia': '/it/prodotto/savia',
    },
    fr: {
      '/': '/fr',
      '/software-carta-de-vinos': '/fr/logiciel-carte-des-vins',
      '/soluciones': '/fr/solutions',
      '/blog': '/fr/blog',
      '/precios': '/fr/tarifs',
      '/demo': '/fr/demo',
      '/funcionalidades': '/fr/fonctionnalites',
      '/guias-y-recursos': '/fr/guides',
      '/analisis-carta': '/fr/analyse-carte',
      '/decision-center': '/fr/decision-center',
      '/contacto': '/fr/contact',
      '/politica-privacidad': '/fr/confidentialite',
      '/terminos-y-condiciones-del-contrato': '/fr/conditions',
      '/producto/cloudrim': '/fr/produit/cloudrim',
      '/producto/savia': '/fr/produit/savia',
    },
    de: {
      '/': '/de',
      '/software-carta-de-vinos': '/de/weinkarten-software',
      '/soluciones': '/de/loesungen',
      '/blog': '/de/blog',
      '/precios': '/de/preise',
      '/demo': '/de/demo',
      '/funcionalidades': '/de/funktionen',
      '/guias-y-recursos': '/de/ratgeber',
      '/analisis-carta': '/de/weinkarten-analyse',
      '/decision-center': '/de/decision-center',
      '/contacto': '/de/kontakt',
      '/politica-privacidad': '/de/datenschutz',
      '/terminos-y-condiciones-del-contrato': '/de/agb',
      '/producto/cloudrim': '/de/produkt/cloudrim',
      '/producto/savia': '/de/produkt/savia',
    },
    pt: {
      '/': '/pt',
      '/software-carta-de-vinos': '/pt/software-carta-vinhos',
      '/soluciones': '/pt/solucoes',
      '/blog': '/pt/blog',
      '/precios': '/pt/precos',
      '/demo': '/pt/demo',
      '/funcionalidades': '/pt/funcionalidades',
      '/guias-y-recursos': '/pt/guias',
      '/analisis-carta': '/pt/analise-carta',
      '/decision-center': '/pt/decision-center',
      '/contacto': '/pt/contacto',
      '/politica-privacidad': '/pt/privacidade',
      '/terminos-y-condiciones-del-contrato': '/pt/termos',
      '/producto/cloudrim': '/pt/produto/cloudrim',
      '/producto/savia': '/pt/produto/savia',
    },
  };
  const legalCopyMap = {
    es: {
      product: 'Producto', solutions: 'Soluciones', resources: 'Recursos', pricing: 'Precios', clientArea: 'Área cliente', demo: 'Solicitar demo',
      footerTitle: 'Convierte tu carta de vinos en una herramienta de venta y gestión.',
      footerSubtitle: 'Winerim conecta carta, stock, ventas, margen e inteligencia para restaurantes.',
      productCol: 'Producto', resourcesCol: 'Recursos', companyCol: 'Empresa',
      software: 'Software carta de vinos', features: 'Funcionalidades', guides: 'Guías y recursos', analyzer: 'Analizar carta', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos',
    },
    en: {
      product: 'Product', solutions: 'Solutions', resources: 'Resources', pricing: 'Pricing', clientArea: 'Client area', demo: 'Request demo',
      footerTitle: 'Turn your wine list into a sales and management tool.',
      footerSubtitle: 'Winerim connects list, stock, sales, margin and intelligence for restaurants.',
      productCol: 'Product', resourcesCol: 'Resources', companyCol: 'Company',
      software: 'Wine list software', features: 'Features', guides: 'Guides', analyzer: 'Analyze wine list', contact: 'Contact', privacy: 'Privacy', terms: 'Terms',
    },
    it: {
      product: 'Prodotto', solutions: 'Soluzioni', resources: 'Risorse', pricing: 'Prezzi', clientArea: 'Area clienti', demo: 'Richiedi demo',
      footerTitle: 'Trasforma la carta vini in uno strumento di vendita e gestione.',
      footerSubtitle: 'Winerim collega carta, stock, vendite, margini e intelligenza per ristoranti.',
      productCol: 'Prodotto', resourcesCol: 'Risorse', companyCol: 'Azienda',
      software: 'Software carta vini', features: 'Funzionalità', guides: 'Guide', analyzer: 'Analizza carta', contact: 'Contatto', privacy: 'Privacy', terms: 'Termini',
    },
    fr: {
      product: 'Produit', solutions: 'Solutions', resources: 'Ressources', pricing: 'Tarifs', clientArea: 'Espace client', demo: 'Demander une démo',
      footerTitle: 'Transformez votre carte des vins en outil de vente et de gestion.',
      footerSubtitle: 'Winerim connecte carte, stock, ventes, marges et intelligence pour restaurants.',
      productCol: 'Produit', resourcesCol: 'Ressources', companyCol: 'Entreprise',
      software: 'Logiciel carte des vins', features: 'Fonctionnalités', guides: 'Guides', analyzer: 'Analyser la carte', contact: 'Contact', privacy: 'Confidentialité', terms: 'Conditions',
    },
    de: {
      product: 'Produkt', solutions: 'Lösungen', resources: 'Ressourcen', pricing: 'Preise', clientArea: 'Kundenbereich', demo: 'Demo anfragen',
      footerTitle: 'Machen Sie Ihre Weinkarte zu einem Verkaufs- und Steuerungswerkzeug.',
      footerSubtitle: 'Winerim verbindet Karte, Bestand, Verkauf, Marge und Intelligenz für Restaurants.',
      productCol: 'Produkt', resourcesCol: 'Ressourcen', companyCol: 'Unternehmen',
      software: 'Weinkarten-Software', features: 'Funktionen', guides: 'Ratgeber', analyzer: 'Weinkarte analysieren', contact: 'Kontakt', privacy: 'Datenschutz', terms: 'AGB',
    },
    pt: {
      product: 'Produto', solutions: 'Soluções', resources: 'Recursos', pricing: 'Preços', clientArea: 'Área cliente', demo: 'Solicitar demo',
      footerTitle: 'Transforme a carta de vinhos numa ferramenta de venda e gestão.',
      footerSubtitle: 'A Winerim liga carta, stock, vendas, margem e inteligência para restaurantes.',
      productCol: 'Produto', resourcesCol: 'Recursos', companyCol: 'Empresa',
      software: 'Software carta de vinhos', features: 'Funcionalidades', guides: 'Guias', analyzer: 'Analisar carta', contact: 'Contacto', privacy: 'Privacidade', terms: 'Termos',
    },
  };
  const legalRoutes = legalRouteMap[page.lang] || legalRouteMap.es;
  const legalRoute = (esPath) => legalRoutes[esPath] || esPath;
  const legalCopy = legalCopyMap[page.lang] || legalCopyMap.es;
  const legalHeaderLinks = [
    [legalCopy.product, '/software-carta-de-vinos'],
    [legalCopy.solutions, '/soluciones'],
    [legalCopy.resources, '/blog'],
    [legalCopy.pricing, '/precios'],
    [legalCopy.clientArea, '/decision-center'],
  ].map(([label, url]) => `<a href="${site}${legalRoute(url)}">${escapeHtml(label)}</a>`).join('');
  const legalFooterColumns = [
    [legalCopy.productCol, [
      [legalCopy.software, '/software-carta-de-vinos'],
      [legalCopy.features, '/funcionalidades'],
      ['CloudRIM', '/producto/cloudrim'],
      ['SAVia', '/producto/savia'],
    ]],
    [legalCopy.resourcesCol, [
      ['Blog', '/blog'],
      [legalCopy.guides, '/guias-y-recursos'],
      [legalCopy.analyzer, '/analisis-carta'],
      ['Decision Center', '/decision-center'],
    ]],
    [legalCopy.companyCol, [
      [legalCopy.contact, '/contacto'],
      [legalCopy.privacy, '/politica-privacidad'],
      [legalCopy.terms, '/terminos-y-condiciones-del-contrato'],
    ]],
  ].map(([heading, items]) => `<div><h4>${escapeHtml(heading)}</h4><ul>${items
    .map(([label, url]) => `<li><a href="${site}${legalRoute(url)}">${escapeHtml(label)}</a></li>`)
    .join('')}</ul></div>`).join('');
  const legalHeaderHtml = `<header class="web-header"><div class="web-nav"><a class="web-brand" href="${site}${legalRoute('/')}">Winerim</a><nav class="web-nav-links" aria-label="Principal">${legalHeaderLinks}</nav><a class="web-nav-cta" href="${site}${legalRoute('/demo')}">${escapeHtml(legalCopy.demo)}</a></div></header>`;
  const legalFooterHtml = `<footer class="web-footer"><div class="web-footer-cta"><div><h3>${escapeHtml(legalCopy.footerTitle)}</h3><p>${escapeHtml(legalCopy.footerSubtitle)}</p></div><a href="${site}${legalRoute('/demo')}">${escapeHtml(legalCopy.demo)}</a></div><div class="web-footer-grid"><div class="web-footer-brand"><a href="${site}${legalRoute('/')}">Winerim</a><p>Winerim. Carta inteligente de vinos para restaurantes.</p></div>${legalFooterColumns}</div><div class="web-footer-bottom"><span>© ${new Date().getUTCFullYear()} Winerim. Todos los derechos reservados.</span></div></footer>`;
  const standardHeaderHtml = `<header class="site-header"><nav class="site-nav"><a class="brand" href="${site}${homePath}">Winerim</a><div class="nav-links">${navLinks}</div></nav></header>`;
  const standardFooterHtml = `<footer><div class="site-footer"><span>Winerim. Carta inteligente de vinos para restaurantes.</span><a href="${site}${homePath === '/' ? '/demo' : legalRoute('/demo')}">Solicitar demo</a></div></footer>`;
  const relatedHtml = isLegalPage ? '' : `<nav class="related" aria-label="Enlaces relacionados">${navLinks}</nav>`;
  const firstNumberedSectionIndex = isLegalPage
    ? page.sections.findIndex(([heading]) => /^\d+\.\s+/.test(heading))
    : -1;
  const metaSections = firstNumberedSectionIndex > 0 ? page.sections.slice(0, firstNumberedSectionIndex) : [];
  const bodySections = firstNumberedSectionIndex > 0 ? page.sections.slice(firstNumberedSectionIndex) : page.sections;
  const metaGrid = metaSections.length ? `<dl class="legal-meta">${metaSections
    .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join('')}</dl>` : '';
  const sections = bodySections.map(([heading, body]) => `<section class="legal-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('\n      ');

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
  <style>
    :root { color-scheme: dark; --bg: #050505; --panel: #0d0d0f; --line: rgba(255,255,255,.12); --text: #f7f3ef; --muted: rgba(247,243,239,.68); --wine: #a72b2f; --wine-soft: rgba(167,43,47,.18); }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.65; }
    a { color: inherit; text-decoration: none; }
    .site-header { position: sticky; top: 0; z-index: 10; border-bottom: 1px solid var(--line); background: rgba(5,5,5,.92); backdrop-filter: blur(18px); }
    .site-nav { max-width: 1180px; margin: 0 auto; min-height: 76px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .brand { font-family: Georgia, "Times New Roman", serif; font-size: 24px; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
    .nav-links { display: flex; align-items: center; justify-content: flex-end; gap: 22px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
    .nav-links a:hover { color: var(--text); }
    main { max-width: 1000px; margin: 0 auto; padding: 72px 24px 96px; }
    .eyebrow { color: #d7a7a9; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; margin: 0 0 18px; }
    h1 { max-width: 860px; margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(36px, 6vw, 64px); line-height: .98; letter-spacing: 0; }
    .subtitle { max-width: 860px; margin: 28px 0 0; color: var(--muted); font-size: 17px; }
    .description { max-width: 760px; margin: 18px 0 0; color: rgba(247,243,239,.82); }
    article { display: grid; gap: 18px; }
    .legal-meta { margin: 42px 0 18px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; overflow: hidden; border: 1px solid var(--line); border-radius: 10px; background: var(--line); }
    .legal-meta div { min-width: 0; background: var(--panel); padding: 20px; }
    .legal-meta dt { margin: 0 0 8px; color: var(--muted); font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
    .legal-meta dd { margin: 0; color: var(--text); font-size: 14px; line-height: 1.55; overflow-wrap: anywhere; }
    .legal-section { border-top: 1px solid var(--line); padding: 26px 0 8px; }
    .legal-section:first-of-type { margin-top: 40px; }
    .legal-section h2 { margin: 0 0 12px; font-size: clamp(18px, 2vw, 25px); line-height: 1.22; font-family: Georgia, "Times New Roman", serif; }
    .legal-section p { margin: 0; color: var(--muted); white-space: pre-line; font-size: 15px; }
    .related { margin-top: 54px; padding: 22px; border: 1px solid var(--line); background: var(--panel); display: flex; gap: 14px 22px; flex-wrap: wrap; color: var(--muted); }
    .related a:hover { color: var(--text); }
    footer { border-top: 1px solid var(--line); color: var(--muted); }
    .site-footer { max-width: 1180px; margin: 0 auto; padding: 28px 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; font-size: 13px; }
    .badge { display: inline-flex; align-items: center; border: 1px solid rgba(167,43,47,.42); background: var(--wine-soft); color: #f0c6c8; padding: 8px 11px; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
    .web-header { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--line); background: rgba(5,5,5,.9); backdrop-filter: blur(18px); }
    .web-nav { max-width: 1280px; min-height: 76px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 22px; }
    .web-brand { font-family: Georgia, "Times New Roman", serif; font-size: 25px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text); }
    .web-nav-links { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
    .web-nav-links a { padding: 9px 12px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; border-radius: 6px; transition: color .18s ease, background .18s ease; }
    .web-nav-links a:hover { color: var(--text); background: rgba(255,255,255,.05); }
    .web-nav-cta { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 18px; border-radius: 4px; background: linear-gradient(135deg, #6f0000, #a72b2f); color: var(--text); font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .web-footer { border-top: 1px solid var(--line); background: var(--bg); color: var(--muted); }
    .web-footer-cta { max-width: 1280px; margin: 0 auto; padding: 40px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); }
    .web-footer-cta h3 { margin: 0; color: var(--text); font-family: Georgia, "Times New Roman", serif; font-size: 22px; line-height: 1.25; }
    .web-footer-cta p { margin: 8px 0 0; max-width: 680px; color: var(--muted); font-size: 14px; }
    .web-footer-cta a { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 22px; border-radius: 4px; background: linear-gradient(135deg, #6f0000, #a72b2f); color: var(--text); font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .web-footer-grid { max-width: 1280px; margin: 0 auto; padding: 48px 24px; display: grid; grid-template-columns: minmax(220px, 1.5fr) repeat(3, minmax(150px, 1fr)); gap: 36px; }
    .web-footer-brand a { display: inline-block; margin: 0 0 12px; color: var(--text); font-family: Georgia, "Times New Roman", serif; font-size: 22px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .web-footer-brand p { margin: 0; max-width: 280px; font-size: 13px; line-height: 1.65; }
    .web-footer h4 { margin: 0 0 14px; color: rgba(247,243,239,.82); font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
    .web-footer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
    .web-footer li { margin: 0; }
    .web-footer a { color: var(--muted); font-size: 13px; }
    .web-footer a:hover { color: var(--text); }
    .web-footer-bottom { max-width: 1280px; margin: 0 auto; padding: 22px 24px; border-top: 1px solid var(--line); font-size: 12px; }
    @media (max-width: 900px) { .web-nav { align-items: flex-start; flex-direction: column; padding-block: 18px; } .web-nav-links { justify-content: flex-start; } .web-nav-cta { width: 100%; } .web-footer-cta { align-items: stretch; flex-direction: column; } .web-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 720px) { .site-nav { align-items: flex-start; flex-direction: column; justify-content: center; padding-block: 18px; } .nav-links { justify-content: flex-start; gap: 14px; } main { padding-top: 46px; } .legal-meta { grid-template-columns: 1fr; } .web-footer-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  ${useWebShell ? legalHeaderHtml : standardHeaderHtml}
  <main>
    <article>
      <p class="eyebrow">${isLegalPage ? 'Winerim legal' : 'Winerim'}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="subtitle"><strong>${escapeHtml(page.subtitle)}</strong></p>
      <p class="description">${escapeHtml(page.description)}</p>
      ${metaGrid}
      ${sections}
    </article>
    ${relatedHtml}
  </main>
  ${useWebShell ? legalFooterHtml : standardFooterHtml}
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
const WORKER_PRICING_MODULES_SITEMAP_LASTMOD = '2026-07-16';

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
  const legacyToolPaths = Object.keys(LEGACY_TOOL_WORKER_PAGES);
  const missingLegacyToolPaths = legacyToolPaths.filter(path => !xml.includes(`${site}${path}`));
  const pricingModulePaths = ['/precios-modulos-integraciones'];
  const missingPricingModulePaths = pricingModulePaths.filter(path => !xml.includes(`${site}${path}`));

  if (
    hasDetailUrls
    && missingPresentationPaths.length === 0
    && missingBarometerPaths.length === 0
    && missingLearnWinePaths.length === 0
    && missingDistributorPaths.length === 0
    && missingCloudRimSaviaPaths.length === 0
    && missingOnlineToolPaths.length === 0
    && missingLegacyToolPaths.length === 0
    && missingPricingModulePaths.length === 0
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
    ...missingLegacyToolPaths.map(path => detailUrlBlock(site, path, WORKER_TOOLS_SITEMAP_LASTMOD, '0.5', LEGACY_TOOL_ALTERNATES_BY_PATH[path])),
    ...missingPricingModulePaths.map(path => detailUrlBlock(site, path, WORKER_PRICING_MODULES_SITEMAP_LASTMOD, '0.7')),
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
  '/en/thank-you',
  '/it/grazie',
  '/fr/merci',
  '/de/danke',
  '/pt/obrigado',
  '/empleo',
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
  '/precios-modulos-integraciones',
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
  ...Object.keys(LEGACY_TOOL_WORKER_PAGES),
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
  '/en/thank-you',
  '/it/grazie',
  '/fr/merci',
  '/de/danke',
  '/pt/obrigado',
  '/empleo',
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
function shouldRedirectUsHomeToEnglish(request, path, ua) {
  return path === '/'
    && request.method === 'GET'
    && !isBot(ua)
    && request.cf?.country === 'US';
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

function hasUppercaseAsciiOutsidePercentEncoding(path) {
  return /[A-Z]/.test(String(path || '').replace(/%[0-9A-Fa-f]{2}/g, ''));
}

function lowercaseAsciiOutsidePercentEncoding(path) {
  return String(path || '').replace(/%[0-9A-Fa-f]{2}|[A-Z]+/g, token => (
    token.startsWith('%') ? token : token.toLowerCase()
  ));
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
  const fetchOptions = { method: request.method, headers };
  if (STATIC_EXT.test(path)) {
    fetchOptions.cf = { cacheEverything: true, cacheTtl: 31536000 };
  }
  const res = await fetch(originUrl, fetchOptions);
  const responseHeaders = new Headers(res.headers);
  const contentType = responseHeaders.get('Content-Type') || '';
  if (contentType.includes('text/html')) {
    const html = injectWorkerHtmlPatches(stripProductionNoiseScripts(await res.text()), path, env.SITE_URL || 'https://winerim.wine');
    responseHeaders.delete('Content-Length');
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');
    for (const [k, v] of Object.entries(extraHeaders)) {
      responseHeaders.set(k, v);
    }
    return new Response(html, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  }

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

    if (shouldRedirectUsHomeToEnglish(request, path, ua)) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `${url.origin}/en`,
          'Cache-Control': 'no-store, max-age=0',
          'X-Worker-Branch': 'us-home-locale-redirect',
        },
      });
    }

    if (path === '/legal/legalDocuments.json' || path === '/legal/legaldocuments.json') {
      return new Response(buildLegalDocumentsJsonResponse(canonicalSite), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
          'X-Worker-Branch': 'legal-documents-json',
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
    if (hasUppercaseAsciiOutsidePercentEncoding(path)) {
      const lowercasePath = lowercaseAsciiOutsidePercentEncoding(path);
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${env.SITE_URL || 'https://winerim.wine'}${lowercasePath}${url.search}`,
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

    // ── 7. Static human fallback for routes not yet present in the published SPA bundle ──
    if (!isBot(ua) && WORKER_STATIC_HUMAN_ROUTES.has(path)) {
      const workerStaticHtml = renderWorkerStaticPrerender(path, env.SITE_URL || 'https://winerim.wine');
      if (workerStaticHtml) {
        const robotsTag = getXRobotsTag(path, hostname);
        const headers = {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
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
          const upstreamUnavailable = res.headers.get('X-Prerender-Article-Unavailable');
          const headers = {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': res.headers.get('Cache-Control') || 'public, max-age=3600, s-maxage=86400',
            'X-Prerendered': 'true',
            'X-Worker-Branch': 'bot-prerender',
          };
          if (upstreamUnavailable) {
            headers['X-Prerender-Article-Unavailable'] = upstreamUnavailable;
            headers['X-Robots-Tag'] = 'noindex, follow';
          } else if (robotsTag) {
            headers['X-Robots-Tag'] = robotsTag;
          }
          return new Response(stripInternalArticleMarkers(html), { status: res.status, statusText: res.statusText, headers });
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
