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
  },
};

/** Generate hreflang alternate XML links for a given ES path */
function hreflangBlock(esPath: string): string {
  const langs = ['en', 'it', 'fr'];
  const esUrl = `${SITE}${esPath}`;
  let xml = '';
  // x-default → ES
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n`;
  for (const lang of langs) {
    const localizedPath = ROUTE_MAP[lang]?.[esPath];
    if (localizedPath) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}${localizedPath}"/>\n`;
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
  { esPath: '/analisis-carta', priority: '0.8', changefreq: 'monthly', multilang: false },
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
  { esPath: '/calculadora-margen-vino', priority: '0.7', changefreq: 'monthly', multilang: false },
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
  { esPath: '/biblioteca-vino', priority: '0.6', changefreq: 'weekly', multilang: false },

  // Problems
  { esPath: '/problemas/carta-de-vinos-no-vende', priority: '0.6', changefreq: 'monthly', multilang: false },
];

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
      const alternates = route.multilang ? hreflangBlock(route.esPath) : '';

      // ES version
      xml += urlBlock(route.esPath, now, route.changefreq, route.priority, alternates);

      // Localized versions (only if multilang)
      if (route.multilang) {
        for (const lang of ['en', 'it', 'fr']) {
          const localizedPath = ROUTE_MAP[lang]?.[route.esPath];
          if (localizedPath) {
            // Localized pages get same hreflang set, slightly lower priority
            const localPriority = Math.max(0.3, parseFloat(route.priority) - 0.1).toFixed(1);
            xml += urlBlock(localizedPath, now, route.changefreq, localPriority, alternates);
          }
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
