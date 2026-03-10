/**
 * Dynamic Rendering Edge Function
 * 
 * Serves pre-rendered HTML to search engine bots and AI crawlers.
 * Human visitors get the normal SPA (index.html).
 * 
 * Google-approved approach: https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering
 * 
 * HOW IT WORKS:
 * 1. Checks User-Agent for known bot patterns
 * 2. For bots: fetches page data from Supabase and generates complete HTML
 * 3. For humans: returns null (upstream serves the SPA)
 * 
 * DEPLOY: This function is called by the redirects edge function
 * when a bot UA is detected on an SEO-critical route.
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

// ── Page data types ──
interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  lang: string;
  type: string; // article, website
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

// ── Static page definitions ──
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
        { heading: 'El problema', content: 'La mayoría de restaurantes pierden ventas de vino por cartas desactualizadas, falta de recomendaciones y márgenes mal calculados.' },
        { heading: 'La solución', content: 'Winerim automatiza la gestión de tu carta de vinos con IA: recomendaciones personalizadas, precios óptimos y análisis en tiempo real.' },
        { heading: 'Resultados', content: 'Restaurantes que usan Winerim aumentan su ticket medio en vino un 23%, reducen el stock muerto un 40% y ahorran más de 10 horas semanales en gestión.' },
      ],
      faqs: [
        { q: '¿Qué es Winerim?', a: 'Winerim es una carta inteligente de vinos con recomendador IA para restaurantes, hoteles y vinotecas.' },
        { q: '¿Cómo funciona el recomendador?', a: 'Analiza las preferencias del comensal, el plato elegido y el contexto para sugerir el vino ideal de tu carta.' },
      ],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo gratuita', url: '/demo' },
        { label: 'Blog', url: '/blog' },
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
      sections: [],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Precios', url: `${SITE}/precios` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
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
        { heading: 'Carta inteligente interactiva', content: 'Tu carta de vinos disponible en tablet, móvil o QR. Actualizable en tiempo real, con fichas detalladas y maridajes inteligentes.' },
        { heading: 'Recomendador inteligente', content: 'Winerim sugiere el vino perfecto según el plato, las preferencias del comensal y tu stock disponible.' },
        { heading: 'Gestión de bodega', content: 'Control de stock, alertas de rotación, análisis de rendimiento por referencia y optimización automática de precios.' },
      ],
      faqs: [
        { q: '¿Necesito instalar algo?', a: 'No. Winerim funciona 100% en la nube. Solo necesitas un dispositivo con navegador.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que veas cómo funciona con tu carta.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Software carta de vinos', url: `${SITE}/software-carta-de-vinos` },
      ],
      internalLinks: [
        { label: 'Funcionalidades completas', url: '/funcionalidades' },
        { label: 'Precios y planes', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
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
        { heading: 'Carta inteligente interactiva', content: 'Carta de vinos accesible desde tablet, móvil o QR con fichas completas, notas de cata y maridajes.' },
        { heading: 'Recomendador inteligente', content: 'IA que sugiere vinos según el plato, presupuesto y preferencias del comensal.' },
        { heading: 'Analytics y rendimiento', content: 'Dashboards en tiempo real: ventas por referencia, márgenes, rotación y tendencias.' },
        { heading: 'Gestión de stock', content: 'Control automático de inventario con alertas de reposición y detección de vinos muertos.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Funcionalidades', url: `${SITE}/funcionalidades` },
      ],
      internalLinks: [
        { label: 'Precios', url: '/precios' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
};

// ── HTML Generator ──
function generateHTML(meta: PageMeta, content: PageContent): string {
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
    sameAs: [
      'https://www.instagram.com/winerim/',
      'https://www.youtube.com/@Winerim',
      'https://www.linkedin.com/company/winerim/',
    ],
  });

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

  return `<!DOCTYPE html>
<html lang="${meta.lang}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeAttr(meta.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${meta.canonical}">
  
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
    <nav>
      <a href="${SITE}/">Winerim</a> |
      <a href="${SITE}/software-carta-de-vinos">Producto</a> |
      <a href="${SITE}/funcionalidades">Funcionalidades</a> |
      <a href="${SITE}/precios">Precios</a> |
      <a href="${SITE}/blog">Blog</a> |
      <a href="${SITE}/demo">Demo</a> |
      <a href="${SITE}/contacto">Contacto</a>
    </nav>
  </header>
  
  <main>
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
    <nav>
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

  // Build sections from body
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

  // Extract sections from markdown
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
      sections: sections.slice(0, 10), // Limit for sanity
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: article.title, url: canonical },
      ],
      internalLinks: [
        { label: 'Blog', url: '/blog' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
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

    // 1. Check static pages
    if (STATIC_PAGES[path]) {
      const { meta, content } = STATIC_PAGES[path];
      html = generateHTML(meta, content);
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
