/**
 * Server-side 301 Redirect Edge Function
 *
 * Handles:
 * 1. Legacy WordPress URL → new URL mappings
 * 2. Trailing slash normalization
 * 3. Lowercase normalization
 * 4. Old WordPress infrastructure URLs (410 Gone)
 * 5. Old sitemap URLs → new sitemap
 *
 * Deploy: Automatic via Lovable Cloud.
 * Usage: Call from your CDN/proxy layer, or configure as a catch-all.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─────────────────────────────────────────────
// EXACT REDIRECTS: old path → new path
// ─────────────────────────────────────────────
const EXACT_REDIRECTS: Record<string, string> = {
  // Old WordPress blog posts → closest new content
  "/un-comensal-cada-vez-mas-exigente-el-vertigo-con-las-extensas-cartas-de-vinos":
    "/blog/cuantos-vinos-carta-restaurante",
  "/el-peso-del-vino-en-la-facturacion-de-los-restaurantes":
    "/como-vender-mas-vino-en-un-restaurante",
  "/el-sommelier-digital-el-nuevo-aliado-del-sommelier": "/que-es-winerim",
  "/los-beneficios-de-una-carta-de-vinos-digital": "/carta-papel-vs-digital",
  "/elegir-el-vino-una-tarea-complicada-para-muchos-comensales":
    "/software-carta-de-vinos",
  "/wine-aging-differences-between-crianza-reserva-and-gran-reserva":
    "/biblioteca-vino",
  "/when-the-food-goes-with-the-wine-the-best-restaurants":
    "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion",

  // Old infrastructure
  "/feed": "/blog",

  // Old sitemaps → new sitemap
  "/sitemap_index.xml": "/sitemap.xml",
  "/post-sitemap.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/clientes-sitemap.xml": "/sitemap.xml",
  "/estadisticas-sitemap.xml": "/sitemap.xml",
  "/eazy_flickity_slider-sitemap.xml": "/sitemap.xml",

  // EN pages at root → /en/ prefix (language signal fix)
  "/wine-list-management-software": "/en/wine-list-management-software",
  "/what-is-winerim": "/en/what-is-winerim",
  "/ai-wine-software": "/en/ai-wine-software",
  "/wine-list-analyzer": "/en/wine-list-analyzer",
  "/wine-roi-calculator": "/en/wine-roi-calculator",
  "/wine-pairing-generator": "/en/wine-pairing-generator",
  "/wine-pricing-tool": "/en/wine-pricing-tool",
  "/wine-list-benchmark": "/en/wine-list-benchmark",

  // Cannibalization fix: consolidate EN product pages
  "/en/digital-wine-list": "/en/wine-list-management-software",
};

// ─────────────────────────────────────────────
// 410 GONE patterns (old content with no equivalent)
// ─────────────────────────────────────────────
const GONE_EXACT = new Set([
  "/our-picks-for-memorable-wines",
  "/meet-our-winemaker-john-duo",
  "/the-best-wines-for-summer",
  "/10-reasons-to-enjoy-wine",
  "/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world",
  "/wp-login.php",
]);

const GONE_PREFIXES = [
  "/wp-content/",
  "/wp-admin/",
  "/wp-includes/",
  "/author/",
  "/category/",
  "/tag/",
];

const SITE = Deno.env.get("SITE_URL") || "https://winerim.wine";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const requestedPath = url.searchParams.get("path") || "/";

    // Normalize: strip trailing slash (except root), lowercase
    let normalizedPath = requestedPath.toLowerCase();
    if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.replace(/\/+$/, "");
    }

    // Check 410 Gone (exact)
    if (GONE_EXACT.has(normalizedPath)) {
      return new Response(
        JSON.stringify({ status: 410, message: "Gone" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check 410 Gone (prefix)
    for (const prefix of GONE_PREFIXES) {
      if (normalizedPath.startsWith(prefix)) {
        return new Response(
          JSON.stringify({ status: 410, message: "Gone" }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Check exact redirects
    const destination = EXACT_REDIRECTS[normalizedPath];
    if (destination) {
      return new Response(
        JSON.stringify({
          status: 301,
          location: `${SITE}${destination}`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Trailing slash redirect (if original had trailing slash but normalized doesn't match)
    if (requestedPath !== normalizedPath) {
      return new Response(
        JSON.stringify({
          status: 301,
          location: `${SITE}${normalizedPath}`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // No redirect needed
    return new Response(
      JSON.stringify({ status: 200, message: "No redirect" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Redirect lookup error:", error);
    return new Response(
      JSON.stringify({ status: 500, message: "Error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
