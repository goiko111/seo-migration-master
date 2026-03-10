/**
 * SEO Migration Map — Old winerim.wine (WordPress) → New winerim.wine (Lovable)
 *
 * This file documents every known URL from the old WordPress site and its
 * destination in the new site. Used by the redirect edge function.
 *
 * REDIRECT TYPES:
 * - 301: Permanent redirect (passes ~90% link equity)
 * - 410: Gone — content removed intentionally, no equivalent
 *
 * PRIORITY:
 * - critical: Top-ranking pages, significant organic traffic
 * - high: Indexed pages with some backlinks
 * - medium: Indexed but low traffic
 * - low: Thin content, no traffic
 */

export interface MigrationEntry {
  /** URL path on old WordPress site */
  oldPath: string;
  /** URL path on new site (null = 410 Gone) */
  newPath: string | null;
  /** HTTP status code */
  type: 301 | 410;
  /** Canonical URL on new site */
  canonical: string;
  /** Migration priority */
  priority: "critical" | "high" | "medium" | "low";
  /** Reasoning */
  reason: string;
}

const BASE = "https://winerim.wine";

export const migrationMap: MigrationEntry[] = [
  // ═══════════════════════════════════════════════
  // PAGES — Old WordPress pages
  // ═══════════════════════════════════════════════
  {
    oldPath: "/",
    newPath: "/",
    type: 301,
    canonical: `${BASE}/`,
    priority: "critical",
    reason: "Homepage → Homepage. Direct mapping.",
  },

  // ═══════════════════════════════════════════════
  // BLOG POSTS — Old WordPress posts (trailing slash style)
  // Mapped to closest new content by intent
  // ═══════════════════════════════════════════════
  {
    oldPath: "/un-comensal-cada-vez-mas-exigente-el-vertigo-con-las-extensas-cartas-de-vinos/",
    newPath: "/blog/cuantos-vinos-carta-restaurante",
    type: 301,
    canonical: `${BASE}/blog/cuantos-vinos-carta-restaurante`,
    priority: "medium",
    reason: "Intent: overwhelm from large wine lists → how many wines should a list have.",
  },
  {
    oldPath: "/el-peso-del-vino-en-la-facturacion-de-los-restaurantes/",
    newPath: "/como-vender-mas-vino-en-un-restaurante",
    type: 301,
    canonical: `${BASE}/como-vender-mas-vino-en-un-restaurante`,
    priority: "medium",
    reason: "Intent: wine's impact on restaurant revenue → selling more wine.",
  },
  {
    oldPath: "/el-sommelier-digital-el-nuevo-aliado-del-sommelier/",
    newPath: "/que-es-winerim",
    type: 301,
    canonical: `${BASE}/que-es-winerim`,
    priority: "medium",
    reason: "Intent: digital sommelier concept → what is Winerim (digital sommelier).",
  },
  {
    oldPath: "/los-beneficios-de-una-carta-de-vinos-digital/",
    newPath: "/carta-papel-vs-digital",
    type: 301,
    canonical: `${BASE}/carta-papel-vs-digital`,
    priority: "high",
    reason: "Intent: benefits of digital wine list → paper vs digital comparison.",
  },
  {
    oldPath: "/elegir-el-vino-una-tarea-complicada-para-muchos-comensales/",
    newPath: "/software-carta-de-vinos",
    type: 301,
    canonical: `${BASE}/software-carta-de-vinos`,
    priority: "medium",
    reason: "Intent: difficulty choosing wine → software that helps customers choose.",
  },
  {
    oldPath: "/our-picks-for-memorable-wines/",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "Generic wine picks post. No equivalent, no SEO value. 410 Gone.",
  },
  {
    oldPath: "/meet-our-winemaker-john-duo/",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "Old team profile. No equivalent, no SEO value. 410 Gone.",
  },
  {
    oldPath: "/the-best-wines-for-summer/",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "Seasonal generic content. No equivalent. 410 Gone.",
  },
  {
    oldPath: "/10-reasons-to-enjoy-wine/",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "Generic lifestyle content. No business value. 410 Gone.",
  },
  {
    oldPath: "/wine-aging-differences-between-crianza-reserva-and-gran-reserva/",
    newPath: "/biblioteca-vino",
    type: 301,
    canonical: `${BASE}/biblioteca-vino`,
    priority: "medium",
    reason: "Intent: wine education → wine library hub.",
  },
  {
    oldPath: "/when-the-food-goes-with-the-wine-the-best-restaurants/",
    newPath: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion",
    type: 301,
    canonical: `${BASE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion`,
    priority: "medium",
    reason: "Intent: food + wine pairing → pairing strategy guide.",
  },
  {
    oldPath: "/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world/",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "News about a specific wine award. No equivalent. 410 Gone.",
  },

  // ═══════════════════════════════════════════════
  // WORDPRESS INFRASTRUCTURE — Catch-all patterns
  // These should return 410 or redirect to homepage
  // ═══════════════════════════════════════════════
  {
    oldPath: "/wp-content/*",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "WordPress media/uploads. No equivalent. Block crawling.",
  },
  {
    oldPath: "/wp-admin/*",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "WordPress admin. No equivalent.",
  },
  {
    oldPath: "/wp-login.php",
    newPath: null,
    type: 410,
    canonical: "",
    priority: "low",
    reason: "WordPress login. No equivalent.",
  },
  {
    oldPath: "/feed/",
    newPath: "/blog",
    type: 301,
    canonical: `${BASE}/blog`,
    priority: "medium",
    reason: "RSS feed → blog hub.",
  },
  {
    oldPath: "/author/*",
    newPath: "/blog",
    type: 301,
    canonical: `${BASE}/blog`,
    priority: "low",
    reason: "Author archives → blog hub.",
  },
  {
    oldPath: "/category/*",
    newPath: "/blog",
    type: 301,
    canonical: `${BASE}/blog`,
    priority: "low",
    reason: "Category archives → blog hub.",
  },
  {
    oldPath: "/tag/*",
    newPath: "/blog",
    type: 301,
    canonical: `${BASE}/blog`,
    priority: "low",
    reason: "Tag archives → blog hub.",
  },

  // ═══════════════════════════════════════════════
  // TRAILING SLASH NORMALIZATION
  // All old WordPress URLs had trailing slashes
  // New site does not use trailing slashes
  // Handled globally in the redirect edge function
  // ═══════════════════════════════════════════════
];

/**
 * Cannibalization risks detected:
 *
 * 1. "software-carta-vinos" group:
 *    - /software-carta-de-vinos (ES product page)
 *    - /wine-list-management-software (EN at root — should 301 → /en/)
 *    - /en/digital-wine-list (EN product variant)
 *    ACTION: Consolidate EN pages under /en/, canonical to primary.
 *
 * 2. "analisis-carta" group:
 *    - /analisis-carta (ES tool)
 *    - /wine-list-analyzer (EN at root — should 301 → /en/)
 *    ACTION: Move EN to /en/wine-list-analyzer.
 *
 * 3. "calculadora-margen" group:
 *    - /calculadora-margen-vino (ES tool)
 *    - /wine-pricing-tool (EN at root — should 301 → /en/)
 *    - /precio-vino-restaurante (ES guide)
 *    ACTION: Ensure guide and tool target different intents (educational vs transactional).
 *
 * 4. "what-is-winerim" group:
 *    - /que-es-winerim (ES)
 *    - /what-is-winerim (EN at root — should 301 → /en/)
 *    ACTION: Move EN to /en/what-is-winerim.
 */

/**
 * Pre-launch risks:
 *
 * 1. TRAILING SLASH MISMATCH: Old site uses trailing slashes, new site doesn't.
 *    MITIGATION: Global trailing-slash stripping in redirect edge function.
 *
 * 2. WP MEDIA URLS: Old site has /wp-content/uploads/ image URLs that may be
 *    linked from external sites. These will 404 unless we serve 410.
 *    MITIGATION: Catch-all 410 for /wp-content/*.
 *
 * 3. OLD SITEMAP URLS: Old sitemaps at /post-sitemap.xml, /page-sitemap.xml etc.
 *    MITIGATION: 301 to new /sitemap.xml.
 *
 * 4. GOOGLE SEARCH CONSOLE: After migration, submit new sitemap and request
 *    re-crawl. Monitor coverage report for 404s for 30 days.
 *
 * 5. BACKLINKS: Check Ahrefs/GSC for top backlinked pages on old site.
 *    Ensure they all have 301 mappings.
 */
