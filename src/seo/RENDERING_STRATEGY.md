# Rendering Strategy — SEO & AI Search Optimization

## Architecture: Dynamic Rendering (Hybrid)

This project uses **Dynamic Rendering** — the Google-approved approach for SPAs:

- **Human visitors** → Normal SPA (React hydration)
- **Search engine bots** → Pre-rendered HTML via edge function
- **AI crawlers** → Pre-rendered HTML with full structured data

## Why Dynamic Rendering?

| Approach | Pros | Cons | Our stack? |
|----------|------|------|-----------|
| **SSR (Next.js)** | Best for SEO | Requires framework migration | ❌ Not Vite+React |
| **SSG** | Fast, great SEO | Build-time only, no dynamic content | ❌ 100+ dynamic pages |
| **Prerender at build** | Works with Vite | Needs headless browser at build | ❌ No Puppeteer in CI |
| **Dynamic Rendering** | Works with any SPA, bot-specific | Two versions to maintain | ✅ Our approach |
| **Client-side only** | Simple | Poor for AI crawlers, social | ❌ Current limitation |

## Route Rendering Map

| Route | Render mode | Priority | Notes |
|-------|------------|----------|-------|
| `/` | **Prerender (static)** | P0 | Full HTML with all meta, schema, content |
| `/software-carta-de-vinos` | **Prerender (static)** | P0 | Core product page |
| `/funcionalidades` | **Prerender (static)** | P0 | Features page |
| `/precios` | **Prerender (static)** | P0 | Pricing page |
| `/blog` | Client-side + meta | P1 | List page, dynamic content |
| `/article/:slug` | **Prerender (dynamic)** | P0 | Full article HTML from DB |
| `/software-carta-de-vinos-*` | **Prerender (dynamic)** | P1 | Programmatic SEO from DB |
| `/software-vino-*` | **Prerender (dynamic)** | P1 | Programmatic SEO from DB |
| `/wine-list-software-*` | **Prerender (dynamic)** | P1 | Programmatic SEO from DB |
| `/casos-exito` | Client-side + meta | P2 | Mostly static content |
| `/guias-y-recursos` | Client-side + meta | P2 | Hub page |
| `/herramientas` | Client-side + meta | P2 | Hub page |
| `/demo` | Client-side | P3 | Form page, no SEO value in body |
| `/admin/*` | Client-side + noindex | P4 | Never prerender |

## How It Works

### Edge Function: `prerender`

1. Receives request with `?path=/some-route`
2. Checks `User-Agent` against known bot patterns
3. For bots:
   - **Static pages** (/, /precios, etc.) → returns hardcoded HTML with full SEO
   - **Dynamic pages** (articles, SEO pages) → fetches from Supabase and generates HTML
4. For humans → returns `{ prerender: false }`, SPA loads normally

### Bot Detection

Covers all major search + AI crawlers:
- Google: `googlebot`, `google-extended`
- Bing: `bingbot`
- AI: `chatgpt-user`, `gptbot`, `claudebot`, `perplexitybot`, `cohere-ai`
- Social: `facebot`, `twitterbot`, `linkedinbot`, `whatsapp`
- SEO tools: `semrushbot`, `ahrefsbot`

### What Bots See

Complete HTML document with:
- ✅ `<title>` and `<meta description>`
- ✅ `<link rel="canonical">`
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (SoftwareApplication, Article, FAQPage, BreadcrumbList, Organization)
- ✅ `<h1>` with primary keyword
- ✅ Semantic sections with `<h2>` headings
- ✅ FAQ content in `<dl>/<dt>/<dd>` format
- ✅ Internal navigation links
- ✅ Breadcrumb navigation
- ✅ Footer with legal links

## Deployment

The prerender edge function deploys automatically. To use it as a proxy:

1. **Option A (Recommended)**: Configure your CDN/reverse proxy to route bot traffic to the edge function
2. **Option B**: Use the edge function URL directly for testing: `GET /functions/v1/prerender?path=/software-carta-de-vinos`

## Adding New Pages

When adding a new SEO-critical page:

1. If **static content**: Add entry to `STATIC_PAGES` in `prerender/index.ts`
2. If **dynamic content**: Ensure it's in `seo_pages` table with `published=true`
3. If **article**: Ensure it's in `articles` table with `published=true`
4. Update the sitemap edge function if adding new static routes

## Performance Impact

- Bot requests: ~50-100ms (edge function + optional DB query)
- Human requests: 0ms overhead (prerender not triggered)
- Cache: 1h browser, 24h CDN for bot responses
