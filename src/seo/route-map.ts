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

import { CANONICAL_DOMAIN } from "./config";
const BASE = CANONICAL_DOMAIN;

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
  { path: "/herramientas/diagnostico-vino-por-copa", canonical: `${BASE}/herramientas/diagnostico-vino-por-copa`, lang: "es", type: "tool", intent: "diagnóstico vino por copa restaurante" },
  { path: "/herramientas/wine-list-score", canonical: `${BASE}/herramientas/wine-list-score`, lang: "es", type: "tool", intent: "wine list score auditoría carta vinos" },
  { path: "/herramientas/calculadora-stock-muerto", canonical: `${BASE}/herramientas/calculadora-stock-muerto`, lang: "es", type: "tool", intent: "calculadora stock muerto vinos rotación" },

  // ─────────────────────────────────────────────
  // BLOG (ES)
  // ─────────────────────────────────────────────
  { path: "/blog", canonical: `${BASE}/blog`, lang: "es", type: "hub", intent: "blog vino restauración" },
  { path: "/sommelier-corner", canonical: `${BASE}/sommelier-corner`, lang: "es", type: "blog", intent: "entrevistas sommelier" },
  { path: "/blog/como-organizar-carta-de-vinos", canonical: `${BASE}/blog/como-organizar-carta-de-vinos`, lang: "es", type: "blog", intent: "cómo organizar carta de vinos" },
  { path: "/blog/cuantos-vinos-carta-restaurante", canonical: `${BASE}/blog/cuantos-vinos-carta-restaurante`, lang: "es", type: "blog", intent: "cuántos vinos carta restaurante" },
  { path: "/blog/como-disenar-carta-vinos-rentable", canonical: `${BASE}/blog/como-disenar-carta-vinos-rentable`, lang: "es", type: "blog", intent: "cómo diseñar carta vinos rentable" },
  // New BOFU articles
  { path: "/article/software-carta-vinos-restaurante", canonical: `${BASE}/article/software-carta-vinos-restaurante`, lang: "es", type: "blog", intent: "software carta vinos restaurante" },
  { path: "/article/alternativa-carta-pdf-vinos", canonical: `${BASE}/article/alternativa-carta-pdf-vinos`, lang: "es", type: "blog", intent: "alternativa carta PDF vinos restaurante" },
  { path: "/article/software-vino-por-copa-restaurantes", canonical: `${BASE}/article/software-vino-por-copa-restaurantes`, lang: "es", type: "blog", intent: "software vino por copa restaurantes" },
  { path: "/article/como-vender-mas-vino-en-sala-con-datos", canonical: `${BASE}/article/como-vender-mas-vino-en-sala-con-datos`, lang: "es", type: "blog", intent: "vender más vino sala datos" },
  { path: "/article/como-mejorar-ticket-medio-vino-sin-ampliar-carta", canonical: `${BASE}/article/como-mejorar-ticket-medio-vino-sin-ampliar-carta`, lang: "es", type: "blog", intent: "mejorar ticket medio vino restaurante" },
  // New MOFU articles
  { path: "/article/errores-fijar-precios-vino-restaurante", canonical: `${BASE}/article/errores-fijar-precios-vino-restaurante`, lang: "es", type: "blog", intent: "errores precios vino restaurante" },
  { path: "/article/como-saber-si-carta-vinos-descompensada", canonical: `${BASE}/article/como-saber-si-carta-vinos-descompensada`, lang: "es", type: "blog", intent: "carta vinos descompensada diagnóstico" },
  { path: "/article/que-vinos-ofrecer-por-copa-segun-tipo-local", canonical: `${BASE}/article/que-vinos-ofrecer-por-copa-segun-tipo-local`, lang: "es", type: "blog", intent: "vinos por copa según tipo restaurante" },
  { path: "/article/cuando-carta-vinos-demasiado-larga", canonical: `${BASE}/article/cuando-carta-vinos-demasiado-larga`, lang: "es", type: "blog", intent: "carta vinos demasiado larga referencias" },
  { path: "/article/como-usar-ia-restaurantes-vender-vino", canonical: `${BASE}/article/como-usar-ia-restaurantes-vender-vino`, lang: "es", type: "blog", intent: "IA restaurantes vender vino inteligencia artificial" },

  // ─────────────────────────────────────────────
  // RESOURCES (ES)
  // ─────────────────────────────────────────────
  { path: "/guias-y-recursos", canonical: `${BASE}/guias-y-recursos`, lang: "es", type: "hub", intent: "guías recursos carta vinos" },
  { path: "/recursos/plantilla-carta-de-vinos", canonical: `${BASE}/recursos/plantilla-carta-de-vinos`, lang: "es", type: "resource", intent: "plantilla carta de vinos gratis" },
  { path: "/recursos/checklist-carta-de-vinos-rentable", canonical: `${BASE}/recursos/checklist-carta-de-vinos-rentable`, lang: "es", type: "resource", intent: "checklist carta vinos rentable" },
  { path: "/recursos/guia-vino-por-copa-para-restaurantes", canonical: `${BASE}/recursos/guia-vino-por-copa-para-restaurantes`, lang: "es", type: "resource", intent: "guía vino por copa restaurantes" },
  { path: "/recursos/plantilla-wine-mapping-restaurante", canonical: `${BASE}/recursos/plantilla-wine-mapping-restaurante`, lang: "es", type: "resource", intent: "plantilla wine mapping restaurante" },
  { path: "/recursos/plantilla-estrategia-vinos-por-copa", canonical: `${BASE}/recursos/plantilla-estrategia-vinos-por-copa`, lang: "es", type: "resource", intent: "plantilla estrategia vino por copa restaurante" },
  { path: "/recursos/checklist-deteccion-vinos-muertos", canonical: `${BASE}/recursos/checklist-deteccion-vinos-muertos`, lang: "es", type: "resource", intent: "checklist detección vinos muertos baja rotación" },
  { path: "/recursos/plantilla-formacion-equipo-sala", canonical: `${BASE}/recursos/plantilla-formacion-equipo-sala`, lang: "es", type: "resource", intent: "plantilla formación vino equipo sala" },
  { path: "/recursos/plantilla-analisis-margenes", canonical: `${BASE}/recursos/plantilla-analisis-margenes`, lang: "es", type: "resource", intent: "plantilla análisis márgenes vino restaurante" },
  { path: "/recursos/scorecard-rendimiento-carta", canonical: `${BASE}/recursos/scorecard-rendimiento-carta`, lang: "es", type: "resource", intent: "scorecard rendimiento carta vinos mensual" },
  { path: "/recursos/checklist-carta-que-vende", canonical: `${BASE}/recursos/checklist-carta-que-vende`, lang: "es", type: "resource", intent: "checklist carta vinos que vende conversión" },
  { path: "/recursos/plantilla-equilibrio-carta", canonical: `${BASE}/recursos/plantilla-equilibrio-carta`, lang: "es", type: "resource", intent: "plantilla equilibrio carta vinos estilos precios" },

  // ─────────────────────────────────────────────
  // SOLUTIONS (ES)
  // ─────────────────────────────────────────────
  { path: "/soluciones", canonical: `${BASE}/soluciones`, lang: "es", type: "hub", intent: "soluciones carta vinos restaurante" },
  { path: "/soluciones/grupos-restauracion", canonical: `${BASE}/soluciones/grupos-restauracion`, lang: "es", type: "solution", intent: "carta vinos grupos restauración" },
  { path: "/soluciones/aumentar-ticket-medio-restaurante", canonical: `${BASE}/soluciones/aumentar-ticket-medio-restaurante`, lang: "es", type: "solution", intent: "aumentar ticket medio restaurante vino" },
  // FUTURE: Standalone page for group assortment intelligence
  // { path: "/soluciones/inteligencia-surtido-grupos", canonical: `${BASE}/soluciones/inteligencia-surtido-grupos`, lang: "es", type: "solution", intent: "inteligencia surtido vino grupos restauración hoteleros" },
  { path: "/problemas", canonical: `${BASE}/problemas`, lang: "es", type: "hub", intent: "problemas carta vinos restaurante" },
  { path: "/problemas/carta-de-vinos-no-vende", canonical: `${BASE}/problemas/carta-de-vinos-no-vende`, lang: "es", type: "guide", intent: "carta vinos no vende solución" },

  // ─────────────────────────────────────────────
  // GUIDES UNDER /guias/ (ES)
  // ─────────────────────────────────────────────
  { path: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", canonical: `${BASE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante`, lang: "es", type: "guide", intent: "mejorar rotación vinos restaurante" },
  { path: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", canonical: `${BASE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion`, lang: "es", type: "guide", intent: "estrategia maridaje restauración" },
  { path: "/guias/como-estructurar-carta-vinos-grupo-restauracion", canonical: `${BASE}/guias/como-estructurar-carta-vinos-grupo-restauracion`, lang: "es", type: "guide", intent: "carta vinos grupo restauración múltiples locales" },
  { path: "/guias/como-fijar-estrategia-rentable-vino-por-copa", canonical: `${BASE}/guias/como-fijar-estrategia-rentable-vino-por-copa`, lang: "es", type: "guide", intent: "estrategia rentable vino por copa restaurante" },
  { path: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", canonical: `${BASE}/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad`, lang: "es", type: "guide", intent: "detectar vinos muertos stock sin rotación" },
  { path: "/guias/como-formar-equipo-sala-para-vender-vino", canonical: `${BASE}/guias/como-formar-equipo-sala-para-vender-vino`, lang: "es", type: "guide", intent: "formar equipo sala vender vino sin sumiller" },
  { path: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", canonical: `${BASE}/guias/como-usar-datos-para-decidir-que-vinos-comprar`, lang: "es", type: "guide", intent: "datos decidir comprar vinos restaurante" },
  { path: "/guias/como-conectar-carta-stock-ventas-margen", canonical: `${BASE}/guias/como-conectar-carta-stock-ventas-margen`, lang: "es", type: "guide", intent: "conectar carta stock ventas margen restaurante" },

  // ─────────────────────────────────────────────
  // BENCHMARKS & PLAYBOOKS (ES)
  // ─────────────────────────────────────────────
  { path: "/benchmarks-playbooks", canonical: `${BASE}/benchmarks-playbooks`, lang: "es", type: "hub", intent: "benchmarks playbooks carta vinos restaurante" },
  { path: "/benchmarks-playbooks/benchmark-referencias-por-tipo-restaurante", canonical: `${BASE}/benchmarks-playbooks/benchmark-referencias-por-tipo-restaurante`, lang: "es", type: "guide", intent: "número referencias carta vinos tipo restaurante" },
  { path: "/benchmarks-playbooks/benchmark-distribucion-rangos-precio", canonical: `${BASE}/benchmarks-playbooks/benchmark-distribucion-rangos-precio`, lang: "es", type: "guide", intent: "distribución precios carta vinos restaurante" },
  { path: "/benchmarks-playbooks/benchmark-estrategia-por-copa", canonical: `${BASE}/benchmarks-playbooks/benchmark-estrategia-por-copa`, lang: "es", type: "guide", intent: "estrategia vino por copa restaurante" },
  { path: "/benchmarks-playbooks/benchmark-equilibrio-regiones-estilos", canonical: `${BASE}/benchmarks-playbooks/benchmark-equilibrio-regiones-estilos`, lang: "es", type: "guide", intent: "equilibrio regiones estilos carta vinos" },
  { path: "/benchmarks-playbooks/benchmark-peso-vino-ticket-medio", canonical: `${BASE}/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`, lang: "es", type: "guide", intent: "peso vino ticket medio restaurante" },
  { path: "/benchmarks-playbooks/benchmark-margen-por-tipo-referencia", canonical: `${BASE}/benchmarks-playbooks/benchmark-margen-por-tipo-referencia`, lang: "es", type: "guide", intent: "margen vino tipo referencia restaurante" },
  { path: "/benchmarks-playbooks/playbook-vender-mas-vino", canonical: `${BASE}/benchmarks-playbooks/playbook-vender-mas-vino`, lang: "es", type: "guide", intent: "cómo vender más vino restaurante playbook" },
  { path: "/benchmarks-playbooks/playbook-mejorar-rotacion", canonical: `${BASE}/benchmarks-playbooks/playbook-mejorar-rotacion`, lang: "es", type: "guide", intent: "mejorar rotación vinos restaurante playbook" },
  { path: "/benchmarks-playbooks/playbook-carta-rentable", canonical: `${BASE}/benchmarks-playbooks/playbook-carta-rentable`, lang: "es", type: "guide", intent: "carta vinos rentable playbook" },
  { path: "/benchmarks-playbooks/playbook-optimizar-vino-copa", canonical: `${BASE}/benchmarks-playbooks/playbook-optimizar-vino-copa`, lang: "es", type: "guide", intent: "optimizar vino por copa playbook" },
  { path: "/benchmarks-playbooks/playbook-formar-personal", canonical: `${BASE}/benchmarks-playbooks/playbook-formar-personal`, lang: "es", type: "guide", intent: "formar personal vino restaurante" },
  { path: "/benchmarks-playbooks/playbook-decidir-compras-datos", canonical: `${BASE}/benchmarks-playbooks/playbook-decidir-compras-datos`, lang: "es", type: "guide", intent: "decidir compras vino datos restaurante" },

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
