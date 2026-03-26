/**
 * Cloudflare Worker — winerim.wine production proxy
 *
 * Routes:
 *   Bot traffic → prerender edge function (full HTML)
 *   Legacy WordPress URLs → redirects edge function (301/410)
 *   Human traffic → SPA origin
 *
 * Environment variables (set in Cloudflare dashboard → Worker Settings → Variables):
 *   ORIGIN            = https://seo-migration-magic.lovable.app  (or your Lovable preview URL)
 *   PRERENDER_URL     = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/prerender
 *   REDIRECTS_URL     = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/redirects
 *   SUPABASE_ANON_KEY = (set in Cloudflare secrets, not in code)
 */

const BOT_REGEX = /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexitybot|cohere-ai|bytespider|google-extended|ccbot|petalbot|sogou|exabot/i;

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

// EN pages that should redirect to /en/ prefix
const EN_ROOT_PAGES = new Set([
  '/wine-list-management-software', '/what-is-winerim', '/ai-wine-software',
  '/wine-list-analyzer', '/wine-roi-calculator', '/wine-pairing-generator',
  '/wine-pricing-tool', '/wine-list-benchmark',
]);

function isLegacyUrl(path) {
  if (LEGACY_EXACT.has(path)) return true;
  return LEGACY_PREFIXES.some(p => path.startsWith(p));
}

function isBot(ua = '') {
  return BOT_REGEX.test(ua);
}

function needsRedirect(path) {
  // EN pages at root
  if (EN_ROOT_PAGES.has(path)) return true;
  // /en/digital-wine-list → consolidation
  if (path === '/en/digital-wine-list') return true;
  // Trailing slash (not root)
  if (path.length > 1 && path.endsWith('/')) return true;
  // Uppercase
  if (path !== path.toLowerCase()) return true;
  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const ua = request.headers.get('User-Agent') || '';

    let debugInfo = {
      branch: null,
      botDetected: false,
      prerenderStatus: null,
    };

    // ── 0. Sitemap.xml — serve always, regardless of UA ──
    if (path === '/sitemap.xml') {
      try {
        const sitemapUrl = `${env.PRERENDER_URL.replace('/prerender', '/sitemap')}`;
        const res = await fetch(sitemapUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
          },
        });
        const xml = await res.text();
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Robots-Tag': 'index, follow',
            'X-Worker-Branch': 'sitemap',
          },
        });
      } catch (e) {
        console.error('Sitemap error:', e);
        // Fallback: serve 502 if prerender fails
        return new Response(null, {
          status: 502,
          headers: {
            'X-Worker-Branch': 'sitemap',
            'X-Worker-Prerender-Status': 'error',
          },
        });
      }
    }

    // ── 1. Legacy WordPress URLs → redirects function ──
    if (isLegacyUrl(path)) {
      try {
        const redirectsUrl = `${env.REDIRECTS_URL}?path=${encodeURIComponent(path)}`;
        const res = await fetch(redirectsUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
            'User-Agent': ua,
          },
        });
        const data = await res.json();

        if (data.status === 301 && data.location) {
          return new Response(null, {
            status: 301,
            headers: {
              'Location': data.location,
              'Cache-Control': 'public, max-age=31536000',
              'X-Worker-Branch': 'redirect',
              'X-Worker-Redirect-Status': '301',
            },
          });
        }
        if (data.status === 410) {
          return new Response('Gone', {
            status: 410,
            headers: {
              'Content-Type': 'text/plain',
              'Cache-Control': 'public, max-age=86400',
              'X-Worker-Branch': 'redirect',
              'X-Worker-Redirect-Status': '410',
            },
          });
        }
      } catch (e) {
        console.error('Redirects function error:', e);
      }
      // Fallback: let it through to origin
    }

    // ── 2. URL normalization redirects (trailing slash, case, EN root) ──
    if (needsRedirect(path)) {
      try {
        const redirectsUrl = `${env.REDIRECTS_URL}?path=${encodeURIComponent(path)}`;
        const res = await fetch(redirectsUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
            'User-Agent': ua,
          },
        });
        const data = await res.json();

        if (data.status === 301 && data.location) {
          return new Response(null, {
            status: 301,
            headers: {
              'Location': data.location,
              'Cache-Control': 'public, max-age=31536000',
              'X-Worker-Branch': 'redirect',
              'X-Worker-Redirect-Status': '301-normalization',
            },
          });
        }
      } catch (e) {
        console.error('Redirect normalization error:', e);
      }
    }

    // ── 3. Bot traffic → prerender function ──
    if (isBot(ua)) {
      debugInfo.botDetected = true;
      // Prerender HTML for bots
      try {
        const prerenderUrl = `${env.PRERENDER_URL}?path=${encodeURIComponent(path)}`;
        const res = await fetch(prerenderUrl, {
          headers: {
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'apikey': env.SUPABASE_ANON_KEY,
            'User-Agent': ua,
          },
        });

        const contentType = res.headers.get('Content-Type') || '';

        // If prerender returned HTML, serve it
        if (contentType.includes('text/html')) {
          const html = await res.text();
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=3600, s-maxage=86400',
              'X-Prerendered': 'true',
              'X-Robots-Tag': 'index, follow',
              'X-Worker-Branch': 'bot',
              'X-Worker-Bot-Detected': 'true',
              'X-Worker-Prerender-Status': '200-html',
            },
          });
        }

        // Prerender didn't have content — mark as fallback and fall through to origin
        await res.text(); // consume body
        debugInfo.prerenderStatus = 'fallback-no-content';
      } catch (e) {
        console.error('Prerender error:', e);
        debugInfo.prerenderStatus = 'fallback-error';
      }

      // Fallback to origin for bots when prerender fails/returns no content
      // This ensures we serve something rather than 204 or error
    }

    // ── 4. Human traffic (or bot fallback) → proxy to SPA origin ──
    const originUrl = new URL(path + url.search, env.ORIGIN);
    // Strip the original Host header so Lovable origin accepts the request
    const originHeaders = new Headers(request.headers);
    originHeaders.set('Host', new URL(env.ORIGIN).host);
    const originRes = await fetch(originUrl, {
      method: request.method,
      headers: originHeaders,
    });

    // Clone response and add security headers
    const response = new Response(originRes.body, originRes);
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Set appropriate branch and debug headers
    if (debugInfo.botDetected && debugInfo.prerenderStatus) {
      // Bot fallback to origin
      response.headers.set('X-Worker-Branch', 'bot-fallback-origin');
      response.headers.set('X-Worker-Bot-Detected', 'true');
      response.headers.set('X-Worker-Prerender-Status', debugInfo.prerenderStatus);
    } else {
      // Regular human traffic
      response.headers.set('X-Worker-Branch', 'origin');
      response.headers.set('X-Worker-Bot-Detected', 'false');
    }

    return response;
  },
};
