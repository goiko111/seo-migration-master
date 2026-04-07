/**
 * Cloudflare Worker v3 — winerim.wine hybrid router
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
};

// ─── NOINDEX routes (served but with noindex header) ───
const NOINDEX_ROUTES = new Set([
  '/gracias',
  '/unsubscribe',
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
  // Problemas
  '/problemas/carta-de-vinos-no-vende',
  // Biblioteca sub-hubs
  '/biblioteca-vino/regiones',
  '/biblioteca-vino/uvas',
  '/biblioteca-vino/estilos',
  '/biblioteca-vino/maridajes',
  '/biblioteca-vino/guia-servicio',
  '/biblioteca-vino/glosario',
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
  '/it/prodotto/intelligenza-dinamica',
  '/it/prodotto/winerim-core',
  '/it/prodotto/winerim-supply',
  '/it/privacy',
  '/it/termini',
  '/it/benchmarks-playbooks',
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
  '/fr/produit/intelligence-dynamique',
  '/fr/produit/winerim-core',
  '/fr/produit/winerim-supply',
  '/fr/confidentialite',
  '/fr/conditions',
  '/fr/benchmarks-playbooks',
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
];

// ─── SEO WILDCARD prefixes (programmatic SEO pages) ───
const SEO_WILDCARD_PREFIXES = [
  '/software-carta-de-vinos-',
  '/software-vino-',
  '/wine-list-software-',
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
        return new Response(await res.text(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Robots-Tag': 'index, follow',
            'X-Worker-Branch': 'sitemap',
          },
        });
      } catch (e) {
        return new Response('Sitemap error', { status: 502, headers: { 'X-Worker-Branch': 'sitemap-error' } });
      }
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

    // ── 4. Legacy WordPress URLs → redirects function ──
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
        if (ct.includes('text/html')) {
          const html = await res.text();
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
        await res.text(); // consume
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
