/**
 * SEO Route Map — Single source of truth for all routes.
 *
 * PURPOSE:
 * - Canonical assignment
 * - Redirect planning (legacy → new)
 * - Language consistency
 * - Cannibalization detection
 *
 * FIELDS:
 * - path: current route in the codebase
 * - canonical: the authoritative URL for this content
 * - lang: primary language of the page
 * - type: page category
 * - intent: search intent this page targets
 * - legacy: old URLs that should 301-redirect here
 * - notes: migration notes
 * - cannibalizationGroup: pages competing for same intent (see SEO_AUDIT.md)
 */

export interface SeoRouteEntry {
  path: string;
  canonical: string;
  lang: "es" | "en" | "it" | "fr";
  type: "home" | "product" | "guide" | "tool" | "resource" | "blog" | "legal" | "admin" | "seo-programmatic" | "hub" | "solution" | "library";
  intent: string;
  legacy?: string[];
  notes?: string;
  cannibalizationGroup?: string;
  noindex?: boolean;
}

const BASE = "https://winerim.wine";

export const seoRouteMap: SeoRouteEntry[] = [
  // ─────────────────────────────────────────────
  // CORE PAGES (ES)
  // ─────────────────────────────────────────────
  { path: "/", canonical: `${BASE}/`, lang: "es", type: "home", intent: "carta de vinos digital restaurante" },
  { path: "/precios", canonical: `${BASE}/precios`, lang: "es", type: "product", intent: "precio software carta vinos" },
  { path: "/funcionalidades", canonical: `${BASE}/funcionalidades`, lang: "es", type: "product", intent: "funcionalidades carta vinos digital" },
  { path: "/integraciones", canonical: `${BASE}/integraciones`, lang: "es", type: "product", intent: "integraciones software restaurante" },
  { path: "/clientes", canonical: `${BASE}/clientes`, lang: "es", type: "product", intent: "restaurantes que usan winerim" },
  { path: "/casos-exito", canonical: `${BASE}/casos-exito`, lang: "es", type: "product", intent: "casos éxito carta vinos digital" },
  { path: "/contacto", canonical: `${BASE}/contacto`, lang: "es", type: "product", intent: "contacto winerim" },
  { path: "/demo", canonical: `${BASE}/demo`, lang: "es", type: "product", intent: "demo carta vinos digital" },
  { path: "/afiliate", canonical: `${BASE}/afiliate`, lang: "es", type: "product", intent: "programa afiliados winerim" },
  { path: "/que-es-winerim", canonical: `${BASE}/que-es-winerim`, lang: "es", type: "product", intent: "qué es winerim", cannibalizationGroup: "what-is-winerim" },

  // ─────────────────────────────────────────────
  // ENGLISH PAGES AT ROOT (⚠️ should migrate to /en/)
  // ─────────────────────────────────────────────
  {
    path: "/wine-list-management-software",
    canonical: `${BASE}/en/wine-list-management-software`,
    lang: "en", type: "product",
    intent: "wine list management software",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-list-management-software",
    cannibalizationGroup: "software-carta-vinos",
  },
  {
    path: "/what-is-winerim",
    canonical: `${BASE}/en/what-is-winerim`,
    lang: "en", type: "product",
    intent: "what is winerim",
    notes: "⚠️ EN page at root. Should 301→ /en/what-is-winerim",
    cannibalizationGroup: "what-is-winerim",
  },
  {
    path: "/ai-wine-software",
    canonical: `${BASE}/en/ai-wine-software`,
    lang: "en", type: "product",
    intent: "ai wine software restaurants",
    notes: "⚠️ EN page at root. Should 301→ /en/ai-wine-software",
  },
  {
    path: "/wine-list-analyzer",
    canonical: `${BASE}/en/wine-list-analyzer`,
    lang: "en", type: "tool",
    intent: "wine list analyzer tool",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-list-analyzer",
    cannibalizationGroup: "analisis-carta",
  },
  {
    path: "/wine-roi-calculator",
    canonical: `${BASE}/en/wine-roi-calculator`,
    lang: "en", type: "tool",
    intent: "wine roi calculator",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-roi-calculator",
  },
  {
    path: "/wine-pairing-generator",
    canonical: `${BASE}/en/wine-pairing-generator`,
    lang: "en", type: "tool",
    intent: "wine pairing generator AI",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-pairing-generator",
  },
  {
    path: "/wine-pricing-tool",
    canonical: `${BASE}/en/wine-pricing-tool`,
    lang: "en", type: "tool",
    intent: "wine pricing tool restaurant",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-pricing-tool",
    cannibalizationGroup: "calculadora-margen",
  },
  {
    path: "/wine-list-benchmark",
    canonical: `${BASE}/en/wine-list-benchmark`,
    lang: "en", type: "tool",
    intent: "wine list benchmark compare",
    notes: "⚠️ EN page at root. Should 301→ /en/wine-list-benchmark",
  },
  {
    path: "/en/digital-wine-list",
    canonical: `${BASE}/en/digital-wine-list`,
    lang: "en", type: "product",
    intent: "digital wine list restaurants",
    notes: "✅ Correctly placed under /en/",
    cannibalizationGroup: "software-carta-vinos",
  },

  // ─────────────────────────────────────────────
  // GUIDES & CONTENT (ES)
  // ─────────────────────────────────────────────
  { path: "/como-vender-mas-vino-en-un-restaurante", canonical: `${BASE}/como-vender-mas-vino-en-un-restaurante`, lang: "es", type: "guide", intent: "cómo vender más vino restaurante" },
  { path: "/software-carta-de-vinos", canonical: `${BASE}/software-carta-de-vinos`, lang: "es", type: "product", intent: "software carta vinos", cannibalizationGroup: "software-carta-vinos" },
  { path: "/inteligencia-artificial-restaurantes", canonical: `${BASE}/inteligencia-artificial-restaurantes`, lang: "es", type: "guide", intent: "inteligencia artificial restaurantes" },
  { path: "/precio-vino-restaurante", canonical: `${BASE}/precio-vino-restaurante`, lang: "es", type: "guide", intent: "precio vino restaurante margen", cannibalizationGroup: "calculadora-margen" },
  { path: "/vino-por-copa-restaurante", canonical: `${BASE}/vino-por-copa-restaurante`, lang: "es", type: "guide", intent: "vino por copa restaurante" },
  { path: "/carta-papel-vs-digital", canonical: `${BASE}/carta-papel-vs-digital`, lang: "es", type: "guide", intent: "carta vinos papel vs digital" },
  { path: "/como-hacer-una-carta-de-vinos", canonical: `${BASE}/como-hacer-una-carta-de-vinos`, lang: "es", type: "guide", intent: "cómo hacer carta de vinos" },
  { path: "/ejemplos-carta-vinos", canonical: `${BASE}/ejemplos-carta-vinos`, lang: "es", type: "guide", intent: "ejemplos carta vinos restaurante" },

  // ─────────────────────────────────────────────
  // TOOLS (ES)
  // ─────────────────────────────────────────────
  { path: "/analisis-carta", canonical: `${BASE}/analisis-carta`, lang: "es", type: "tool", intent: "analizar carta vinos restaurante", cannibalizationGroup: "analisis-carta" },
  { path: "/calculadora-margen-vino", canonical: `${BASE}/calculadora-margen-vino`, lang: "es", type: "tool", intent: "calculadora margen vino restaurante", cannibalizationGroup: "calculadora-margen" },
  { path: "/herramientas/calculadora-precio-vino-por-copa", canonical: `${BASE}/herramientas/calculadora-precio-vino-por-copa`, lang: "es", type: "tool", intent: "calculadora precio vino por copa" },
  { path: "/herramientas", canonical: `${BASE}/herramientas`, lang: "es", type: "hub", intent: "herramientas vino restaurante" },

  // ─────────────────────────────────────────────
  // BLOG (ES)
  // ─────────────────────────────────────────────
  { path: "/blog", canonical: `${BASE}/blog`, lang: "es", type: "hub", intent: "blog vino restauración" },
  { path: "/sommelier-corner", canonical: `${BASE}/sommelier-corner`, lang: "es", type: "blog", intent: "entrevistas sommelier" },
  { path: "/blog/como-organizar-carta-de-vinos", canonical: `${BASE}/blog/como-organizar-carta-de-vinos`, lang: "es", type: "blog", intent: "cómo organizar carta de vinos" },
  { path: "/blog/cuantos-vinos-carta-restaurante", canonical: `${BASE}/blog/cuantos-vinos-carta-restaurante`, lang: "es", type: "blog", intent: "cuántos vinos carta restaurante" },
  { path: "/blog/como-disenar-carta-vinos-rentable", canonical: `${BASE}/blog/como-disenar-carta-vinos-rentable`, lang: "es", type: "blog", intent: "cómo diseñar carta vinos rentable" },

  // ─────────────────────────────────────────────
  // RESOURCES (ES)
  // ─────────────────────────────────────────────
  { path: "/guias-y-recursos", canonical: `${BASE}/guias-y-recursos`, lang: "es", type: "hub", intent: "guías recursos carta vinos" },
  { path: "/recursos/plantilla-carta-de-vinos", canonical: `${BASE}/recursos/plantilla-carta-de-vinos`, lang: "es", type: "resource", intent: "plantilla carta de vinos gratis" },
  { path: "/recursos/checklist-carta-de-vinos-rentable", canonical: `${BASE}/recursos/checklist-carta-de-vinos-rentable`, lang: "es", type: "resource", intent: "checklist carta vinos rentable" },
  { path: "/recursos/guia-vino-por-copa-para-restaurantes", canonical: `${BASE}/recursos/guia-vino-por-copa-para-restaurantes`, lang: "es", type: "resource", intent: "guía vino por copa restaurantes" },
  { path: "/recursos/plantilla-wine-mapping-restaurante", canonical: `${BASE}/recursos/plantilla-wine-mapping-restaurante`, lang: "es", type: "resource", intent: "plantilla wine mapping restaurante" },

  // ─────────────────────────────────────────────
  // SOLUTIONS (ES)
  // ─────────────────────────────────────────────
  { path: "/soluciones", canonical: `${BASE}/soluciones`, lang: "es", type: "hub", intent: "soluciones carta vinos restaurante" },
  { path: "/soluciones/grupos-restauracion", canonical: `${BASE}/soluciones/grupos-restauracion`, lang: "es", type: "solution", intent: "carta vinos grupos restauración" },
  { path: "/soluciones/aumentar-ticket-medio-restaurante", canonical: `${BASE}/soluciones/aumentar-ticket-medio-restaurante`, lang: "es", type: "solution", intent: "aumentar ticket medio restaurante vino" },
  { path: "/problemas", canonical: `${BASE}/problemas`, lang: "es", type: "hub", intent: "problemas carta vinos restaurante" },
  { path: "/problemas/carta-de-vinos-no-vende", canonical: `${BASE}/problemas/carta-de-vinos-no-vende`, lang: "es", type: "guide", intent: "carta vinos no vende solución" },

  // ─────────────────────────────────────────────
  // GUIDES UNDER /guias/ (ES)
  // ─────────────────────────────────────────────
  { path: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", canonical: `${BASE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante`, lang: "es", type: "guide", intent: "mejorar rotación vinos restaurante" },
  { path: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", canonical: `${BASE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion`, lang: "es", type: "guide", intent: "estrategia maridaje restauración" },

  // ─────────────────────────────────────────────
  // LIBRARY (ES)
  // ─────────────────────────────────────────────
  { path: "/biblioteca-vino", canonical: `${BASE}/biblioteca-vino`, lang: "es", type: "hub", intent: "biblioteca vinos uvas regiones" },
  { path: "/biblioteca-vino/:slug", canonical: `${BASE}/biblioteca-vino/:slug`, lang: "es", type: "library", intent: "ficha vino detalle" },

  // ─────────────────────────────────────────────
  // LEGAL (ES)
  // ─────────────────────────────────────────────
  { path: "/privacidad", canonical: `${BASE}/privacidad`, lang: "es", type: "legal", intent: "política privacidad winerim" },
  { path: "/terminos", canonical: `${BASE}/terminos`, lang: "es", type: "legal", intent: "términos y condiciones winerim" },

  // ─────────────────────────────────────────────
  // ADMIN (noindex)
  // ─────────────────────────────────────────────
  { path: "/admin", canonical: `${BASE}/admin`, lang: "es", type: "admin", intent: "admin panel", noindex: true },
  { path: "/admin/login", canonical: `${BASE}/admin/login`, lang: "es", type: "admin", intent: "admin login", noindex: true },

  // ─────────────────────────────────────────────
  // PROGRAMMATIC SEO (dynamic)
  // ─────────────────────────────────────────────
  { path: "/software-carta-de-vinos-*", canonical: "dynamic", lang: "es", type: "seo-programmatic", intent: "carta vinos digital {ciudad/tipo}" },
  { path: "/software-vino-*", canonical: "dynamic", lang: "es", type: "seo-programmatic", intent: "software vino {variante}" },
  { path: "/wine-list-software-*", canonical: "dynamic", lang: "en", type: "seo-programmatic", intent: "wine list software {variant}" },
];

/**
 * Utility: find all routes in a cannibalization group
 */
export function getCannibalizationGroup(group: string): SeoRouteEntry[] {
  return seoRouteMap.filter(r => r.cannibalizationGroup === group);
}

/**
 * Utility: find a route entry by path
 */
export function findRoute(path: string): SeoRouteEntry | undefined {
  return seoRouteMap.find(r => r.path === path);
}

/**
 * Utility: get all English pages at root (migration candidates)
 */
export function getEnglishPagesAtRoot(): SeoRouteEntry[] {
  return seoRouteMap.filter(r => r.lang === "en" && !r.path.startsWith("/en/"));
}
