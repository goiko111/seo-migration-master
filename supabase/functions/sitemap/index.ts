const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://winerim.wine';

// All static routes organized by type
const STATIC_ROUTES = [
  // Core pages
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/sommelier-corner', priority: '0.7', changefreq: 'weekly' },
  { loc: '/demo', priority: '0.9', changefreq: 'monthly' },
  { loc: '/precios', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contacto', priority: '0.7', changefreq: 'monthly' },
  { loc: '/afiliate', priority: '0.6', changefreq: 'monthly' },
  { loc: '/guias-y-recursos', priority: '0.7', changefreq: 'weekly' },
  { loc: '/herramientas', priority: '0.7', changefreq: 'monthly' },
  { loc: '/casos-exito', priority: '0.7', changefreq: 'monthly' },
  { loc: '/integraciones', priority: '0.7', changefreq: 'monthly' },
  { loc: '/soluciones', priority: '0.7', changefreq: 'monthly' },
  { loc: '/problemas', priority: '0.7', changefreq: 'monthly' },

  // Commercial / Product pages (ES)
  { loc: '/software-carta-de-vinos', priority: '0.8', changefreq: 'monthly' },
  { loc: '/analisis-carta', priority: '0.8', changefreq: 'monthly' },
  { loc: '/inteligencia-artificial-restaurantes', priority: '0.8', changefreq: 'monthly' },
  { loc: '/que-es-winerim', priority: '0.6', changefreq: 'monthly' },

  // Commercial / Product pages (EN)
  { loc: '/wine-list-management-software', priority: '0.7', changefreq: 'monthly' },
  { loc: '/ai-wine-software', priority: '0.7', changefreq: 'monthly' },
  { loc: '/what-is-winerim', priority: '0.5', changefreq: 'monthly' },
  { loc: '/en/digital-wine-list', priority: '0.6', changefreq: 'monthly' },

  // Guides (ES)
  { loc: '/como-vender-mas-vino-en-un-restaurante', priority: '0.7', changefreq: 'monthly' },
  { loc: '/precio-vino-restaurante', priority: '0.7', changefreq: 'monthly' },
  { loc: '/vino-por-copa-restaurante', priority: '0.7', changefreq: 'monthly' },
  { loc: '/carta-papel-vs-digital', priority: '0.7', changefreq: 'monthly' },
  { loc: '/como-hacer-una-carta-de-vinos', priority: '0.7', changefreq: 'monthly' },
  { loc: '/ejemplos-carta-vinos', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/como-organizar-carta-de-vinos', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/cuantos-vinos-carta-restaurante', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/como-disenar-carta-vinos-rentable', priority: '0.7', changefreq: 'monthly' },
  { loc: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante', priority: '0.7', changefreq: 'monthly' },
  { loc: '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion', priority: '0.7', changefreq: 'monthly' },

  // Tools
  { loc: '/calculadora-margen-vino', priority: '0.7', changefreq: 'monthly' },
  { loc: '/herramientas/calculadora-precio-vino-por-copa', priority: '0.7', changefreq: 'monthly' },
  { loc: '/wine-list-analyzer', priority: '0.7', changefreq: 'monthly' },
  { loc: '/wine-roi-calculator', priority: '0.7', changefreq: 'monthly' },
  { loc: '/wine-pairing-generator', priority: '0.7', changefreq: 'monthly' },
  { loc: '/wine-pricing-tool', priority: '0.7', changefreq: 'monthly' },
  { loc: '/wine-list-benchmark', priority: '0.7', changefreq: 'monthly' },

  // Resources
  { loc: '/recursos/plantilla-carta-de-vinos', priority: '0.6', changefreq: 'monthly' },
  { loc: '/recursos/checklist-carta-de-vinos-rentable', priority: '0.6', changefreq: 'monthly' },
  { loc: '/recursos/guia-vino-por-copa-para-restaurantes', priority: '0.6', changefreq: 'monthly' },
  { loc: '/recursos/plantilla-wine-mapping-restaurante', priority: '0.6', changefreq: 'monthly' },

  // Solutions
  { loc: '/soluciones/grupos-restauracion', priority: '0.7', changefreq: 'monthly' },
  { loc: '/soluciones/aumentar-ticket-medio-restaurante', priority: '0.7', changefreq: 'monthly' },

  // Problems
  { loc: '/problemas/carta-de-vinos-no-vende', priority: '0.6', changefreq: 'monthly' },

  // Legal
  { loc: '/privacidad', priority: '0.2', changefreq: 'yearly' },
  { loc: '/terminos', priority: '0.2', changefreq: 'yearly' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const now = new Date().toISOString().split('T')[0];

    // Fetch published articles and seo_pages in parallel
    const [articlesRes, seoPagesRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/articles?published=eq.true&select=slug,updated_at&order=updated_at.desc`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
      }),
      fetch(`${supabaseUrl}/rest/v1/seo_pages?published=eq.true&select=slug,updated_at&order=updated_at.desc`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
      }),
    ]);

    const articles = await articlesRes.json();
    const seoPages = await seoPagesRes.json();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Static routes
    for (const route of STATIC_ROUTES) {
      xml += `  <url>
    <loc>${SITE_URL}${route.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    }

    // Dynamic article routes
    if (Array.isArray(articles)) {
      for (const article of articles) {
        const lastmod = article.updated_at ? article.updated_at.split('T')[0] : now;
        xml += `  <url>
    <loc>${SITE_URL}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      }
    }

    // Dynamic SEO programmatic pages
    if (Array.isArray(seoPages)) {
      for (const page of seoPages) {
        const lastmod = page.updated_at ? page.updated_at.split('T')[0] : now;
        xml += `  <url>
    <loc>${SITE_URL}/${page.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
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
      headers: corsHeaders 
    });
  }
});
