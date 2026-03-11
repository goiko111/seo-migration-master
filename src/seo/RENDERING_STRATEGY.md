# Rendering Strategy — SEO & AI Search Optimization

## Architecture: Dynamic Rendering (Hybrid)

This project uses **Dynamic Rendering** — the Google-approved approach for SPAs:

- **Human visitors** → Normal SPA (React hydration)
- **Search engine bots** → Pre-rendered HTML via edge function
- **AI crawlers** → Pre-rendered HTML with full structured data
- **No-JS crawlers** → `<noscript>` fallback in index.html

## Render Mode per Route

### Tier 1: Full Static Prerender (20+ pages)
Instant HTML response for bots — no DB queries needed.

| Route | Content | Schema | Hreflang |
|-------|---------|--------|----------|
| `/` | Full: H1, sections, FAQs, internal links | SoftwareApplication + Organization + FAQ + Breadcrumb | ✅ ES/EN/IT/FR |
| `/software-carta-de-vinos` | Full product page | SoftwareApplication | ✅ ES/EN/IT/FR |
| `/funcionalidades` | All 7 features | WebPage | ✅ ES/EN/IT/FR |
| `/precios` | Plans + FAQs | WebPage | ✅ ES/EN/IT/FR |
| `/producto/inteligencia-dinamica` | AI features + FAQs | SoftwareApplication | — |
| `/soluciones` | All solution types | WebPage | ✅ ES/EN/IT/FR |
| `/soluciones/grupos-restauracion` | Multi-restaurant | WebPage | — |
| `/soluciones/aumentar-ticket-medio-restaurante` | Ticket strategies | WebPage | — |
| `/herramientas` | All 6 tools listed | WebPage | ✅ ES/EN/IT/FR |
| `/guias-y-recursos` | Hub: guides + templates + checklists | CollectionPage | ✅ ES/EN |
| `/benchmarks-playbooks` | Hub page | CollectionPage | — |
| `/casos-exito` | Case studies | WebPage | ✅ ES/EN/IT/FR |
| `/clientes` | Client list | WebPage | ✅ ES/EN/IT |
| `/integraciones` | Integration info | WebPage | ✅ ES/EN/IT |
| `/blog` | Blog hub | CollectionPage | — |
| `/problemas` | Problem categories | WebPage | ✅ ES/EN/IT/FR |
| `/como-vender-mas-vino-en-un-restaurante` | Full guide | Article | — |
| `/vino-por-copa-restaurante` | Full guide | Article | — |
| `/como-hacer-una-carta-de-vinos` | Full guide | Article | — |
| `/analisis-carta` | Tool landing | WebPage | — |
| `/que-es-winerim` | About page | WebPage | — |
| `/contacto` | Contact page | WebPage | ✅ ES/EN/IT |
| `/demo` | Demo form | WebPage | ✅ ES/EN/IT/FR |

### Tier 2: Dynamic Prerender (DB-powered)
Bot request triggers a Supabase query to generate full HTML.

| Route pattern | Source | Schema |
|---------------|--------|--------|
| `/software-carta-de-vinos-*` | `seo_pages` table | Dynamic per page |
| `/software-vino-*` | `seo_pages` table | Dynamic per page |
| `/wine-list-software-*` | `seo_pages` table | Dynamic per page |
| `/article/:slug` | `articles` table | Article |
| Any unknown slug | Falls back to `seo_pages` lookup | Dynamic |

### Tier 3: Client-side with meta tags
Pages with minimal SEO value or interactive-only content.

| Route | Notes |
|-------|-------|
| `/admin/*` | Always `noindex` |
| `/calculadora-margen-vino` | Tool — client-side meta |
| `/herramientas/calculadora-*` | Tool — client-side meta |
| `/herramientas/diagnostico-*` | Tool — client-side meta |
| `/herramientas/wine-list-score` | Tool — client-side meta |
| `/biblioteca-vino/*` | Client-side meta |
| `/recursos/*` | Client-side meta (gated content) |
| `/guias/*` | Client-side meta |
| `/privacidad`, `/terminos` | Client-side meta |

### Tier 4: index.html baseline
Every page gets these from the static HTML shell:

- ✅ `<title>` (home default)
- ✅ `<meta description>` (home default)
- ✅ `<link rel="canonical">`
- ✅ Hreflang links (ES/EN/IT/FR + x-default)
- ✅ OG tags (title, description, image, url)
- ✅ Twitter Card tags
- ✅ JSON-LD: SoftwareApplication + Organization
- ✅ `<noscript>` fallback with H1, sections, FAQs, internal links

## What Bots See (Prerendered HTML)

Complete HTML document with:
- ✅ `<title>` and `<meta description>`
- ✅ `<link rel="canonical">`
- ✅ `<link rel="alternate" hreflang="...">`
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD: page-specific + Organization + FAQ + Breadcrumb
- ✅ `<h1>` with primary keyword
- ✅ Semantic `<section>/<h2>` structure
- ✅ FAQ in `<dl>/<dt>/<dd>` format
- ✅ Breadcrumb navigation (`<nav aria-label="Breadcrumb">`)
- ✅ Internal navigation links (`<nav aria-label="...">`)
- ✅ Footer with legal links

## Bot Detection

Covers all major search + AI crawlers:
- Google: `googlebot`, `google-extended`
- Bing: `bingbot`
- AI: `chatgpt-user`, `gptbot`, `claudebot`, `perplexitybot`, `cohere-ai`
- Social: `facebot`, `twitterbot`, `linkedinbot`, `whatsapp`
- SEO tools: `semrushbot`, `ahrefsbot`

## Performance

- Static pages: ~5ms (no DB query)
- Dynamic pages: ~50-100ms (edge function + DB query)
- Human visitors: 0ms overhead (prerender not triggered)
- Cache: 1h browser, 24h CDN for bot responses

## Adding New Pages

1. **Static content**: Add entry to `STATIC_PAGES` in `prerender/index.ts` + optionally to `HREFLANG_MAP`
2. **Dynamic content**: Ensure in `seo_pages` table with `published=true`
3. **Article**: Ensure in `articles` table with `published=true`
4. Update sitemap edge function if adding new static routes

## Environment Safety

- Staging/preview domains always get `noindex` via `SEOHead` component
- `index.html` canonical always points to `https://winerim.wine`
- Prerender function only responds to bot UAs
