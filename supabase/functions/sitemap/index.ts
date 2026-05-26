const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SITE = 'https://winerim.wine';

// ─────────────────────────────────────────────
// ROUTE MAP: ES path → localized paths per language
// Must mirror src/i18n/types.ts ROUTE_MAP
// ─────────────────────────────────────────────
const ROUTE_MAP: Record<string, Record<string, string>> = {
  en: {
    '/': '/en',
    '/blog': '/en/blog',
    '/demo': '/en/demo',
    '/precios': '/en/pricing',
    '/contacto': '/en/contact',
    '/funcionalidades': '/en/features',
    '/clientes': '/en/clients',
    '/integraciones': '/en/integrations',
    '/casos-exito': '/en/case-studies',
    '/herramientas': '/en/tools',
    '/guias-y-recursos': '/en/guides',
    '/soluciones': '/en/solutions',
    '/problemas': '/en/challenges',
    '/sommelier-corner': '/en/sommelier-corner',
    '/afiliate': '/en/affiliate',
    '/software-carta-de-vinos': '/en/wine-list-management-software',
    '/que-es-winerim': '/en/what-is-winerim',
    '/privacidad': '/en/privacy',
    '/terminos': '/en/terms',
    '/soluciones/grupos-restauracion': '/en/solutions/restaurant-groups',
    '/soluciones/aumentar-ticket-medio-restaurante': '/en/solutions/increase-average-ticket',
    '/producto/inteligencia-dinamica': '/en/product/dynamic-intelligence',
    '/producto/winerim-core': '/en/product/winerim-core',
    '/producto/winerim-supply': '/en/product/winerim-supply',
    '/analisis-carta': '/en/wine-list-analysis',
    '/calculadora-margen-vino': '/en/wine-margin-calculator',
    '/biblioteca-vino': '/en/wine-library',
    '/biblioteca-vino/regiones': '/en/wine-library/regions',
    '/biblioteca-vino/uvas': '/en/wine-library/grapes',
    '/biblioteca-vino/estilos': '/en/wine-library/styles',
    '/biblioteca-vino/maridajes': '/en/wine-library/pairings',
    '/biblioteca-vino/guia-servicio': '/en/wine-library/service-guide',
    '/biblioteca-vino/glosario': '/en/wine-library/glossary',
  },
  it: {
    '/': '/it',
    '/blog': '/it/blog',
    '/demo': '/it/demo',
    '/precios': '/it/prezzi',
    '/contacto': '/it/contatto',
    '/funcionalidades': '/it/funzionalita',
    '/clientes': '/it/clienti',
    '/integraciones': '/it/integrazioni',
    '/casos-exito': '/it/casi-di-successo',
    '/herramientas': '/it/strumenti',
    '/guias-y-recursos': '/it/guide',
    '/soluciones': '/it/soluzioni',
    '/problemas': '/it/sfide',
    '/sommelier-corner': '/it/sommelier-corner',
    '/afiliate': '/it/affiliati',
    '/software-carta-de-vinos': '/it/software-carta-vini',
    '/que-es-winerim': '/it/cose-winerim',
    '/privacidad': '/it/privacy',
    '/terminos': '/it/termini',
    '/soluciones/grupos-restauracion': '/it/soluzioni/gruppi-ristorazione',
    '/soluciones/aumentar-ticket-medio-restaurante': '/it/soluzioni/aumentare-scontrino-medio',
    '/producto/inteligencia-dinamica': '/it/prodotto/intelligenza-dinamica',
    '/producto/winerim-core': '/it/prodotto/winerim-core',
    '/producto/winerim-supply': '/it/prodotto/winerim-supply',
    '/analisis-carta': '/it/analisi-carta',
    '/calculadora-margen-vino': '/it/calcolatrice-margini-vino',
    '/biblioteca-vino': '/it/biblioteca-vino',
    '/biblioteca-vino/regiones': '/it/biblioteca-vino/regioni',
    '/biblioteca-vino/uvas': '/it/biblioteca-vino/vitigni',
    '/biblioteca-vino/estilos': '/it/biblioteca-vino/stili',
    '/biblioteca-vino/maridajes': '/it/biblioteca-vino/abbinamenti',
    '/biblioteca-vino/guia-servicio': '/it/biblioteca-vino/guida-servizio',
    '/biblioteca-vino/glosario': '/it/biblioteca-vino/glossario',
  },
  fr: {
    '/': '/fr',
    '/blog': '/fr/blog',
    '/demo': '/fr/demo',
    '/precios': '/fr/tarifs',
    '/contacto': '/fr/contact',
    '/funcionalidades': '/fr/fonctionnalites',
    '/clientes': '/fr/clients',
    '/integraciones': '/fr/integrations',
    '/casos-exito': '/fr/cas-clients',
    '/herramientas': '/fr/outils',
    '/guias-y-recursos': '/fr/guides',
    '/soluciones': '/fr/solutions',
    '/problemas': '/fr/defis',
    '/sommelier-corner': '/fr/sommelier-corner',
    '/afiliate': '/fr/affilies',
    '/software-carta-de-vinos': '/fr/logiciel-carte-des-vins',
    '/que-es-winerim': '/fr/quest-ce-que-winerim',
    '/privacidad': '/fr/confidentialite',
    '/terminos': '/fr/conditions',
    '/soluciones/grupos-restauracion': '/fr/solutions/groupes-restauration',
    '/soluciones/aumentar-ticket-medio-restaurante': '/fr/solutions/augmenter-ticket-moyen',
    '/producto/inteligencia-dinamica': '/fr/produit/intelligence-dynamique',
    '/producto/winerim-core': '/fr/produit/winerim-core',
    '/producto/winerim-supply': '/fr/produit/winerim-supply',
    '/analisis-carta': '/fr/analyse-carte',
    '/calculadora-margen-vino': '/fr/calculateur-marge-vin',
    '/biblioteca-vino': '/fr/bibliotheque-vin',
    '/biblioteca-vino/regiones': '/fr/bibliotheque-vin/regions',
    '/biblioteca-vino/uvas': '/fr/bibliotheque-vin/cepages',
    '/biblioteca-vino/estilos': '/fr/bibliotheque-vin/styles-de-vin',
    '/biblioteca-vino/maridajes': '/fr/bibliotheque-vin/accords',
    '/biblioteca-vino/guia-servicio': '/fr/bibliotheque-vin/guide-service',
    '/biblioteca-vino/glosario': '/fr/bibliotheque-vin/glossaire',
  },
  de: {
    '/': '/de',
    '/blog': '/de/blog',
    '/demo': '/de/demo',
    '/precios': '/de/preise',
    '/contacto': '/de/kontakt',
    '/funcionalidades': '/de/funktionen',
    '/clientes': '/de/kunden',
    '/integraciones': '/de/integrationen',
    '/casos-exito': '/de/erfolgsgeschichten',
    '/herramientas': '/de/tools',
    '/guias-y-recursos': '/de/ratgeber',
    '/soluciones': '/de/loesungen',
    '/problemas': '/de/herausforderungen',
    '/sommelier-corner': '/de/sommelier-corner',
    '/afiliate': '/de/partner',
    '/software-carta-de-vinos': '/de/weinkarten-software',
    '/que-es-winerim': '/de/was-ist-winerim',
    '/privacidad': '/de/datenschutz',
    '/terminos': '/de/agb',
    '/soluciones/grupos-restauracion': '/de/loesungen/restaurant-gruppen',
    '/soluciones/aumentar-ticket-medio-restaurante': '/de/loesungen/durchschnittsbon-erhoehen',
    '/producto/inteligencia-dinamica': '/de/produkt/dynamische-intelligenz',
    '/producto/winerim-core': '/de/produkt/winerim-core',
    '/producto/winerim-supply': '/de/produkt/winerim-supply',
    '/analisis-carta': '/de/weinkarten-analyse',
    '/calculadora-margen-vino': '/de/wein-margen-rechner',
    '/biblioteca-vino': '/de/weinbibliothek',
    '/biblioteca-vino/regiones': '/de/weinbibliothek/regionen',
    '/biblioteca-vino/uvas': '/de/weinbibliothek/rebsorten',
    '/biblioteca-vino/estilos': '/de/weinbibliothek/weinstile',
    '/biblioteca-vino/maridajes': '/de/weinbibliothek/weinbegleitung',
    '/biblioteca-vino/guia-servicio': '/de/weinbibliothek/service-guide',
    '/biblioteca-vino/glosario': '/de/weinbibliothek/glossar',
  },
  pt: {
    '/': '/pt',
    '/blog': '/pt/blog',
    '/demo': '/pt/demo',
    '/precios': '/pt/precos',
    '/contacto': '/pt/contacto',
    '/funcionalidades': '/pt/funcionalidades',
    '/clientes': '/pt/clientes',
    '/integraciones': '/pt/integracoes',
    '/casos-exito': '/pt/casos-de-sucesso',
    '/herramientas': '/pt/ferramentas',
    '/guias-y-recursos': '/pt/guias',
    '/soluciones': '/pt/solucoes',
    '/problemas': '/pt/desafios',
    '/sommelier-corner': '/pt/sommelier-corner',
    '/afiliate': '/pt/afiliados',
    '/software-carta-de-vinos': '/pt/software-carta-vinhos',
    '/que-es-winerim': '/pt/o-que-e-winerim',
    '/privacidad': '/pt/privacidade',
    '/terminos': '/pt/termos',
    '/soluciones/grupos-restauracion': '/pt/solucoes/grupos-restauracao',
    '/soluciones/aumentar-ticket-medio-restaurante': '/pt/solucoes/aumentar-ticket-medio',
    '/producto/inteligencia-dinamica': '/pt/produto/inteligencia-dinamica',
    '/producto/winerim-core': '/pt/produto/winerim-core',
    '/producto/winerim-supply': '/pt/produto/winerim-supply',
    '/analisis-carta': '/pt/analise-carta',
    '/calculadora-margen-vino': '/pt/calculadora-margem-vinho',
    '/biblioteca-vino': '/pt/biblioteca-vinho',
    '/biblioteca-vino/regiones': '/pt/biblioteca-vinho/regioes',
    '/biblioteca-vino/uvas': '/pt/biblioteca-vinho/castas',
    '/biblioteca-vino/estilos': '/pt/biblioteca-vinho/estilos',
    '/biblioteca-vino/maridajes': '/pt/biblioteca-vinho/harmonizacoes',
    '/biblioteca-vino/guia-servicio': '/pt/biblioteca-vinho/guia-servico',
    '/biblioteca-vino/glosario': '/pt/biblioteca-vinho/glossario',
  },
};

const WINE_LIBRARY_BASE: Record<string, string> = {
  en: '/en/wine-library',
  it: '/it/biblioteca-vino',
  fr: '/fr/bibliotheque-vin',
  de: '/de/weinbibliothek',
  pt: '/pt/biblioteca-vinho',
};

const WINE_LIBRARY_SECTIONS: Record<string, Record<string, string>> = {
  en: {
    regiones: 'regions',
    uvas: 'grapes',
    estilos: 'styles',
    maridajes: 'pairings',
    'guia-servicio': 'service-guide',
    glosario: 'glossary',
  },
  it: {
    regiones: 'regioni',
    uvas: 'vitigni',
    estilos: 'stili',
    maridajes: 'abbinamenti',
    'guia-servicio': 'guida-servizio',
    glosario: 'glossario',
  },
  fr: {
    regiones: 'regions',
    uvas: 'cepages',
    estilos: 'styles-de-vin',
    maridajes: 'accords',
    'guia-servicio': 'guide-service',
    glosario: 'glossaire',
  },
  de: {
    regiones: 'regionen',
    uvas: 'rebsorten',
    estilos: 'weinstile',
    maridajes: 'weinbegleitung',
    'guia-servicio': 'service-guide',
    glosario: 'glossar',
  },
  pt: {
    regiones: 'regioes',
    uvas: 'castas',
    estilos: 'estilos',
    maridajes: 'harmonizacoes',
    'guia-servicio': 'guia-servico',
    glosario: 'glossario',
  },
};

function localizedPath(lang: string, esPath: string): string | undefined {
  if (lang === 'es') return esPath;
  if (esPath === '/biblioteca-vino') return WINE_LIBRARY_BASE[lang];

  const wineMatch = esPath.match(/^\/biblioteca-vino\/([^/]+)(.*)$/);
  if (wineMatch && WINE_LIBRARY_BASE[lang]) {
    const [, section, rest] = wineMatch;
    return `${WINE_LIBRARY_BASE[lang]}/${WINE_LIBRARY_SECTIONS[lang]?.[section] || section}${rest}`;
  }

  return ROUTE_MAP[lang]?.[esPath];
}

/** Generate hreflang alternate XML links for a given ES path */
function hreflangBlock(esPath: string): string {
  const langs = ['es', 'en', 'it', 'fr', 'de', 'pt'];
  const esUrl = `${SITE}${esPath}`;
  let xml = '';
  // x-default → ES
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n`;
  for (const lang of langs) {
    const path = localizedPath(lang, esPath);
    if (path) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}${path}"/>\n`;
    }
  }
  return xml;
}

// ─────────────────────────────────────────────
// STATIC ROUTES (ES only — localized versions derived from ROUTE_MAP)
// ─────────────────────────────────────────────
interface StaticRoute {
  esPath: string;
  priority: string;
  changefreq: string;
  /** If true, this page has localized versions via ROUTE_MAP */
  multilang: boolean;
}

const STATIC_ROUTES: StaticRoute[] = [
  // Core
  { esPath: '/', priority: '1.0', changefreq: 'weekly', multilang: true },
  { esPath: '/blog', priority: '0.8', changefreq: 'weekly', multilang: true },
  { esPath: '/sommelier-corner', priority: '0.7', changefreq: 'weekly', multilang: true },
  { esPath: '/demo', priority: '0.9', changefreq: 'monthly', multilang: true },
  { esPath: '/precios', priority: '0.8', changefreq: 'monthly', multilang: true },
  { esPath: '/contacto', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/afiliate', priority: '0.6', changefreq: 'monthly', multilang: true },
  { esPath: '/guias-y-recursos', priority: '0.7', changefreq: 'weekly', multilang: true },
  { esPath: '/herramientas', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/casos-exito', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/integraciones', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/soluciones', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/problemas', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/clientes', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/funcionalidades', priority: '0.8', changefreq: 'monthly', multilang: true },
  { esPath: '/privacidad', priority: '0.2', changefreq: 'yearly', multilang: true },
  { esPath: '/terminos', priority: '0.2', changefreq: 'yearly', multilang: true },

  // Product
  { esPath: '/software-carta-de-vinos', priority: '0.8', changefreq: 'monthly', multilang: true },
  { esPath: '/que-es-winerim', priority: '0.6', changefreq: 'monthly', multilang: true },
  { esPath: '/producto/inteligencia-dinamica', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/producto/winerim-core', priority: '0.8', changefreq: 'monthly', multilang: true },
  { esPath: '/producto/winerim-supply', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/analisis-carta', priority: '0.8', changefreq: 'monthly', multilang: true },
  { esPath: '/calculadora-margen-vino', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/inteligencia-artificial-restaurantes', priority: '0.8', changefreq: 'monthly', multilang: false },

  // Solutions
  { esPath: '/soluciones/grupos-restauracion', priority: '0.7', changefreq: 'monthly', multilang: true },
  { esPath: '/soluciones/aumentar-ticket-medio-restaurante', priority: '0.7', changefreq: 'monthly', multilang: true },

  // Guides (ES-only)
  { esPath: '/como-vender-mas-vino-en-un-restaurante', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/precio-vino-restaurante', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/vino-por-copa-restaurante', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/carta-papel-vs-digital', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/como-hacer-una-carta-de-vinos', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/ejemplos-carta-vinos', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/blog/como-organizar-carta-de-vinos', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/blog/cuantos-vinos-carta-restaurante', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/blog/como-disenar-carta-vinos-rentable', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-estructurar-carta-vinos-grupo-restauracion', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-fijar-estrategia-rentable-vino-por-copa', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-formar-equipo-sala-para-vender-vino', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-usar-datos-para-decidir-que-vinos-comprar', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-conectar-carta-stock-ventas-margen', priority: '0.7', changefreq: 'monthly', multilang: false },

  // Tools (ES-only)
  { esPath: '/herramientas/calculadora-precio-vino-por-copa', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/herramientas/diagnostico-vino-por-copa', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/herramientas/wine-list-score', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/herramientas/calculadora-stock-muerto', priority: '0.7', changefreq: 'monthly', multilang: false },

  // Resources (ES-only)
  { esPath: '/recursos/plantilla-carta-de-vinos', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/checklist-carta-de-vinos-rentable', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/guia-vino-por-copa-para-restaurantes', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/plantilla-wine-mapping-restaurante', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/plantilla-estrategia-vinos-por-copa', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/checklist-deteccion-vinos-muertos', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/plantilla-formacion-equipo-sala', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/plantilla-analisis-margenes', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/scorecard-rendimiento-carta', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/checklist-carta-que-vende', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/plantilla-equilibrio-carta', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/recursos/revision-mensual-margenes', priority: '0.6', changefreq: 'monthly', multilang: false },

  // Benchmarks & Playbooks
  { esPath: '/benchmarks-playbooks', priority: '0.7', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-referencias-por-tipo-restaurante', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-distribucion-rangos-precio', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-estrategia-por-copa', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-equilibrio-regiones-estilos', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-peso-vino-ticket-medio', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/benchmark-margen-por-tipo-referencia', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-vender-mas-vino', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-mejorar-rotacion', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-carta-rentable', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-optimizar-vino-copa', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-formar-personal', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/benchmarks-playbooks/playbook-decidir-compras-datos', priority: '0.6', changefreq: 'monthly', multilang: false },

  // Library
  { esPath: '/biblioteca-vino', priority: '0.6', changefreq: 'weekly', multilang: true },
  { esPath: '/biblioteca-vino/regiones', priority: '0.5', changefreq: 'weekly', multilang: true },
  { esPath: '/biblioteca-vino/uvas', priority: '0.5', changefreq: 'weekly', multilang: true },
  { esPath: '/biblioteca-vino/estilos', priority: '0.5', changefreq: 'weekly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes', priority: '0.5', changefreq: 'weekly', multilang: true },
  { esPath: '/biblioteca-vino/guia-servicio', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/glosario', priority: '0.4', changefreq: 'monthly', multilang: true },

  // Problems
  { esPath: '/problemas/carta-de-vinos-no-vende', priority: '0.6', changefreq: 'monthly', multilang: false },

  // Missing strategic pages
  { esPath: '/sobre-winerim', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/implantacion', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/comparativas', priority: '0.5', changefreq: 'monthly', multilang: false },

  // Missing guides
  { esPath: '/guias/como-gestionar-carta-vinos-grupos-restauracion', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-implantar-vino-por-copa-sin-perder-margen', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-usar-winerim-sin-sumiller', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-decidir-surtido-segun-ticket-medio-tipo-local', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-detectar-canibalizacion-vinos-carta', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/guias/como-revisar-carta-vinos-cada-mes', priority: '0.6', changefreq: 'monthly', multilang: false },

  // Missing tools
  { esPath: '/herramientas/calculadora-ticket-medio-vino', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/herramientas/auditor-carta-multilocal', priority: '0.6', changefreq: 'monthly', multilang: false },
  { esPath: '/herramientas/calculadora-compra-inteligente', priority: '0.6', changefreq: 'monthly', multilang: false },
];

const TEMPORARILY_EXCLUDED_STATIC_SITEMAP_PATHS = new Set([
  // Legal pages are available to users and bots, but should not be submitted as organic landing pages.
  '/privacidad',
  '/terminos',

  // Resource and benchmark detail pages currently resolve to generic prerendered HTML for bots.
  // Keep them out of the submitted sitemap until they have dedicated prerender content.
  '/recursos/plantilla-carta-de-vinos',
  '/recursos/checklist-carta-de-vinos-rentable',
  '/recursos/guia-vino-por-copa-para-restaurantes',
  '/recursos/plantilla-wine-mapping-restaurante',
  '/recursos/plantilla-estrategia-vinos-por-copa',
  '/recursos/checklist-deteccion-vinos-muertos',
  '/recursos/plantilla-formacion-equipo-sala',
  '/recursos/plantilla-analisis-margenes',
  '/recursos/scorecard-rendimiento-carta',
  '/recursos/checklist-carta-que-vende',
  '/recursos/plantilla-equilibrio-carta',
  '/recursos/revision-mensual-margenes',
  '/benchmarks-playbooks/benchmark-referencias-por-tipo-restaurante',
  '/benchmarks-playbooks/benchmark-distribucion-rangos-precio',
  '/benchmarks-playbooks/benchmark-estrategia-por-copa',
  '/benchmarks-playbooks/benchmark-equilibrio-regiones-estilos',
  '/benchmarks-playbooks/benchmark-peso-vino-ticket-medio',
  '/benchmarks-playbooks/benchmark-margen-por-tipo-referencia',
  '/benchmarks-playbooks/playbook-vender-mas-vino',
  '/benchmarks-playbooks/playbook-mejorar-rotacion',
  '/benchmarks-playbooks/playbook-carta-rentable',
  '/benchmarks-playbooks/playbook-optimizar-vino-copa',
  '/benchmarks-playbooks/playbook-formar-personal',
  '/benchmarks-playbooks/playbook-decidir-compras-datos',
]);

const UNSUPPORTED_SEO_PAGE_SLUG_RE = /^(?:grape|uva|vitigno|rebsorte|cepage|casta|curso-vino|curso-vinho|wine-course|corso-vino|cours-vin|weinkurs|region-vinicola|wine-region|regione-vinicola|regiao-vinicola|weinregion|software-carta-de-vinos|software-vino|wine-list-software|software-carta-dei-vini|logiciel-carte-des-vins|weinkarten-software|software-carta-vinhos|software-carta-de-vinhos)-/;

function shouldIncludeSeoPageSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && slug.length > 0 && !UNSUPPORTED_SEO_PAGE_SLUG_RE.test(slug);
}


// Generated from src/data/*Library.ts to expose entity detail pages in the sitemap.
const WINE_LIBRARY_DYNAMIC_ROUTES: StaticRoute[] = [
  { esPath: '/biblioteca-vino/borgona', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/cabernet-sauvignon', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/chardonnay', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/amontillado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/biodinamico', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco-crianza-lias', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco-fermentado-barrica', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco-joven', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco-mineral', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/blanco-semidulce', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/cava', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/champagne', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/clarete', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/cremant', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/dulce-natural', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/ecologico-biodinamico-natural', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/ecologico-certificado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/eiswein', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/espumante', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/espumoso', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/fino-manzanilla', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/franciacorta', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/generoso', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/madeira', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/marsala', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/moscatel-de-setubal', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/moscatel-dulce', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/oloroso', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/oporto-ruby', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/oporto-tawny', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/oporto-vintage', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/orange-maceracion-corta', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/orange-maceracion-larga', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/orange-wine', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/palo-cortado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/passito', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/pedro-ximenez', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/pet-nat', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/prosecco', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/qvevri-wine', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/rosado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/rosado-cuerpo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/rosado-provenzal', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/rosado-semidulce', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/sauternes-botrytizados', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/sekt', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-crianza', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-cuerpo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-joven', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-ligero', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-maceracion-carbonica', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tinto-reserva', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/tokaji-aszu', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/vdn', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/vendimia-tardia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/vino-anfora', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/vino-natural', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/estilos/vino-tinaja', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/garnacha', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridaje-carne', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridaje-pescado', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridaje-queso', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/aves-y-caza', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/atun-rojo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/carnes-rojas', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/chocolate-negro', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/cordero-asado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/embutidos-y-charcuteria', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/ostras', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/pato-confitado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/pulpo-gallego', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/postres-y-chocolate', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/quesos', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/risotto-setas', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/maridajes/verduras-y-cocina-vegetariana', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/napa-valley', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/priorat', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/alemania', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/alemania/mosel', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/argentina', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/argentina/mendoza', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/australia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/australia/barossa-valley', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/austria', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/chile', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/bierzo', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/calatayud', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/jerez', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/jumilla', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/montsant', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/navarra', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/penedes', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/priorat', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/rias-baixas', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/ribera-del-duero', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/rioja', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/rueda', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/somontano', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/toro', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/espana/txakoli', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/estados-unidos', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/estados-unidos/napa-valley', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/estados-unidos/willamette-valley', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/alsacia', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/beaujolais', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/bordeaux', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/bourgogne', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/chablis', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/champagne', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/jura', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/languedoc-roussillon', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/medoc', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/pomerol', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/provence', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/saint-emilion', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/sancerre', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/val-de-loire', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/francia/vallee-du-rhone', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/georgia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/grecia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/hungria', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/abruzzo', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/barolo', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/campania', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/friuli', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/marche', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/piemonte', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/puglia', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/sardegna', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/sicilia', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/toscana', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/trentino-alto-adige', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/umbria', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/italia/veneto', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/nueva-zelanda', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/nueva-zelanda/marlborough', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/portugal', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/portugal/douro', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/sudafrica', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/regiones/uruguay', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/rioja', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/sauvignon-blanc', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/tempranillo', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/aglianico', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/airen', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/albarino', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/antao-vaz', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/arinto', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/arneis', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/assyrtiko', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/baga', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/barbera', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/blaufrankisch', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/bobal', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/bonarda', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/cabernet-franc', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/cabernet-sauvignon', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/carignan', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/carmenere', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/castelao', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/chardonnay', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/chenin-blanc', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/cinsault', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/cortese', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/corvina', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/dolcetto', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/encruzado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/fiano', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/furmint', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/gamay', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/garganega', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/garnacha', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/garnacha-tintorera', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/gewurztraminer', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/glera', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/godello', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/graciano', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/greco', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/gruner-veltliner', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/hondarrabi-zuri', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/kadarka', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/koshu', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/lagrein', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/listan-negro', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/loureiro', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/malbec', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/marsanne', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/mazuelo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/mencia', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/merlot', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/monastrell', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/montepulciano', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/moscatel-rosado', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/muller-thurgau', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/muscadet', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/muscat', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/nebbiolo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/nerello-mascalese', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/nero-d-avola', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pais', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/palomino', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/parellada', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pedro-ximenez', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/petit-verdot', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pinot-grigio', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pinot-meunier', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pinot-noir', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/pinotage', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/plavac-mali', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/prieto-picudo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/primitivo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/riesling', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/rkatsiteli', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/roussanne', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/sangiovese', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/saperavi', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/sauvignon-blanc', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/semillon', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/silvaner', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/st-laurent', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/syrah', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/tannat', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/tempranillo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/torrontes', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/touriga-franca', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/touriga-nacional', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/trebbiano', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/treixadura', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/trollinger', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/verdejo', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/vermentino', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/viognier', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/viura', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/welschriesling', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/xarello', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/xinomavro', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/uvas/zweigelt', priority: '0.5', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/vino-blanco', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/vino-espumoso', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/vino-rosado', priority: '0.4', changefreq: 'monthly', multilang: true },
  { esPath: '/biblioteca-vino/vino-tinto', priority: '0.4', changefreq: 'monthly', multilang: true },
];

const WINE_LIBRARY_LEGACY_SHORTCUT_ES_PATHS = new Set([
  '/biblioteca-vino/tempranillo',
  '/biblioteca-vino/chardonnay',
  '/biblioteca-vino/garnacha',
  '/biblioteca-vino/sauvignon-blanc',
  '/biblioteca-vino/cabernet-sauvignon',
  '/biblioteca-vino/rioja',
  '/biblioteca-vino/borgona',
  '/biblioteca-vino/priorat',
  '/biblioteca-vino/napa-valley',
  '/biblioteca-vino/vino-tinto',
  '/biblioteca-vino/vino-blanco',
  '/biblioteca-vino/vino-rosado',
  '/biblioteca-vino/vino-espumoso',
  '/biblioteca-vino/maridaje-carne',
  '/biblioteca-vino/maridaje-pescado',
  '/biblioteca-vino/maridaje-queso',
]);

/** Build a <url> block with optional hreflang alternates */
function urlBlock(loc: string, lastmod: string, changefreq: string, priority: string, hreflang?: string): string {
  let xml = `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n`;
  if (hreflang) xml += hreflang;
  xml += `  </url>\n`;
  return xml;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const now = new Date().toISOString().split('T')[0];

    const [articlesRes, seoPagesRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/articles?published=eq.true&select=slug,updated_at&order=updated_at.desc`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
      }),
      fetch(`${supabaseUrl}/rest/v1/seo_pages?published=eq.true&select=slug,updated_at,lang&order=updated_at.desc`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
      }),
    ]);

    const articles = await articlesRes.json();
    const seoPages = await seoPagesRes.json();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    // ── Static routes (ES + hreflang alternates) ──
    for (const route of STATIC_ROUTES) {
      if (TEMPORARILY_EXCLUDED_STATIC_SITEMAP_PATHS.has(route.esPath)) continue;

      const alternates = route.multilang ? hreflangBlock(route.esPath) : '';

      // ES version
      xml += urlBlock(route.esPath, now, route.changefreq, route.priority, alternates);

      // Localized versions (only if multilang)
      if (route.multilang) {
        for (const lang of ['en', 'it', 'fr', 'de', 'pt']) {
          const path = localizedPath(lang, route.esPath);
          if (path) {
            // Localized pages get same hreflang set, slightly lower priority
            const localPriority = Math.max(0.3, parseFloat(route.priority) - 0.1).toFixed(1);
            xml += urlBlock(path, now, route.changefreq, localPriority, alternates);
          }
        }
      }
    }

    // ── Wine library entities (ES + localized equivalents) ──
    for (const route of WINE_LIBRARY_DYNAMIC_ROUTES) {
      if (WINE_LIBRARY_LEGACY_SHORTCUT_ES_PATHS.has(route.esPath)) continue;

      const alternates = hreflangBlock(route.esPath);
      xml += urlBlock(route.esPath, now, route.changefreq, route.priority, alternates);

      for (const lang of ['en', 'it', 'fr', 'de', 'pt']) {
        const path = localizedPath(lang, route.esPath);
        if (path) {
          const localPriority = Math.max(0.3, parseFloat(route.priority) - 0.1).toFixed(1);
          xml += urlBlock(path, now, route.changefreq, localPriority, alternates);
        }
      }
    }

    // ── Dynamic: blog articles ──
    if (Array.isArray(articles)) {
      for (const article of articles) {
        const lastmod = article.updated_at ? article.updated_at.split('T')[0] : now;
        xml += urlBlock(`/article/${article.slug}`, lastmod, 'monthly', '0.6');
      }
    }

    // ── Dynamic: programmatic SEO pages ──
    if (Array.isArray(seoPages)) {
      for (const page of seoPages) {
        if (!shouldIncludeSeoPageSlug(page.slug)) continue;
        const lastmod = page.updated_at ? page.updated_at.split('T')[0] : now;
        xml += urlBlock(`/${page.slug}`, lastmod, 'monthly', '0.5');
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', {
      status: 500,
      headers: corsHeaders,
    });
  }
});
