/* ═══════════════════════════════════════════════════════════
   CTA STRATEGY — Funnel-aware CTA system
   ═══════════════════════════════════════════════════════════
   
   BOFU (Bottom of Funnel) — Pricing, Comparativas, Soluciones, Herramientas, Casos
     → Primary: Demo / Análisis de carta
     → Secondary: Contacto / Consulta específica
   
   MOFU (Middle of Funnel) — Guías, Blog, Recursos, Biblioteca
     → Primary: Herramienta gratuita / Recurso descargable
     → Secondary: Demo suave / Análisis sin compromiso
   
   TOFU (Top of Funnel) — Home, Qué es Winerim, About
     → Primary: Ver cómo funciona / Demo
     → Secondary: Video / Explorar funcionalidades
   ═══════════════════════════════════════════════════════════ */

export type FunnelStage = "tofu" | "mofu" | "bofu";

export interface CTAConfig {
  text: string;
  url: string;
  /** Optional subtitle shown below the button */
  micro?: string;
}

export interface CTASet {
  primary: CTAConfig;
  secondary: CTAConfig;
  /** Mid-content CTA copy */
  midTitle: string;
  midDesc: string;
  /** Final section CTA copy */
  finalTitle: string;
  finalDesc: string;
  /** Sticky bar CTA copy */
  stickyText: string;
}

/* ─── Individual CTAs (backwards compatible) ─── */
export const CTA_DEMO = { text: "Solicitar demo", url: "/demo" };
export const CTA_ANALYZE = { text: "Analizar mi carta gratis", url: "/analisis-carta" };
export const CTA_CALCULATOR = { text: "Calcular mi margen", url: "/calculadora-margen-vino" };
export const CTA_FREE_TRIAL = { text: "Ver demo", url: "/demo" };
export const CTA_CONTACT = { text: "Hablar con el equipo", url: "/contacto" };
export const CTA_PRICING = { text: "Ver planes y precios", url: "/precios" };
export const CTA_HOW_IT_WORKS = { text: "Cómo funciona Winerim", url: "/funcionalidades" };

/* ─── Funnel-stage CTA sets ─── */
export const CTA_SETS: Record<FunnelStage, CTASet> = {
  tofu: {
    primary: { text: "Ver Winerim en acción", url: "/demo", micro: "Demo personalizada de 15 min. Sin compromiso." },
    secondary: { text: "Explorar funcionalidades", url: "/funcionalidades" },
    midTitle: "¿Quieres ver cómo funciona en tu tipo de negocio?",
    midDesc: "Te mostramos Winerim aplicado a restaurantes como el tuyo. 15 minutos, sin compromiso.",
    finalTitle: "Descubre qué puede hacer Winerim por tu carta",
    finalDesc: "Demo personalizada de 15 min. Te mostramos el impacto en tu tipo de negocio.",
    stickyText: "Ver cómo funciona →",
  },
  mofu: {
    primary: { text: "Analizar mi carta gratis", url: "/analisis-carta", micro: "Diagnóstico con oportunidades reales de mejora. Sin coste." },
    secondary: { text: "Solicitar demo", url: "/demo" },
    midTitle: "¿Tu carta de vinos rinde lo que debería?",
    midDesc: "Analizamos tu carta y te mostramos oportunidades concretas de mejora en margen, rotación y ticket medio.",
    finalTitle: "Análisis gratuito de tu carta de vinos",
    finalDesc: "Envía tu carta y te devolvemos un diagnóstico con datos reales y propuestas de acción.",
    stickyText: "Analizar mi carta gratis →",
  },
  bofu: {
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te mostramos Winerim aplicado a tu caso concreto." },
    secondary: { text: "Ver planes y precios", url: "/precios" },
    midTitle: "¿Listo para optimizar tu carta de vinos?",
    midDesc: "Solicita una demo y te mostramos cómo Winerim se adapta a tu operativa.",
    finalTitle: "Da el siguiente paso",
    finalDesc: "Demo personalizada en 15 min. Te mostramos cómo se integra con tu día a día.",
    stickyText: "Solicitar demo →",
  },
};

/* ─── Contextual CTA sets by page type ─── */
export type PageType =
  | "home" | "pricing" | "features" | "solutions" | "solution_detail"
  | "hotel" | "group" | "implementation"
  | "guide" | "blog" | "article" | "resource"
  | "tool" | "calculator" | "analyzer"
  | "comparison" | "cases" | "benchmark"
  | "library" | "about" | "contact";

export const PAGE_FUNNEL_MAP: Record<PageType, FunnelStage> = {
  home: "tofu",
  about: "tofu",
  features: "tofu",
  library: "tofu",
  guide: "mofu",
  blog: "mofu",
  article: "mofu",
  resource: "mofu",
  tool: "mofu",
  calculator: "mofu",
  analyzer: "mofu",
  pricing: "bofu",
  solutions: "bofu",
  solution_detail: "bofu",
  hotel: "bofu",
  group: "bofu",
  implementation: "bofu",
  comparison: "bofu",
  cases: "bofu",
  benchmark: "bofu",
  contact: "bofu",
};

/** Get the CTA set for a given page type */
export const getCTASet = (pageType: PageType): CTASet => {
  const stage = PAGE_FUNNEL_MAP[pageType];
  return CTA_SETS[stage];
};

/* ─── Page-specific CTA overrides (for maximum relevance) ─── */
export const PAGE_CTA_OVERRIDES: Partial<Record<PageType, Partial<CTASet>>> = {
  pricing: {
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te ayudamos a elegir el plan adecuado para tu negocio." },
    secondary: { text: "Hablar con el equipo comercial", url: "/contacto" },
    midTitle: "¿No sabes qué plan necesitas?",
    midDesc: "Cada negocio es distinto. Cuéntanos tu caso y te recomendamos la opción más rentable.",
    stickyText: "Solicitar demo →",
  },
  tool: {
    primary: { text: "Analizar mi carta completa", url: "/analisis-carta", micro: "Diagnóstico completo de tu carta. Sin coste, sin compromiso." },
    secondary: { text: "Todas las herramientas", url: "/herramientas" },
    midTitle: "¿Quieres un diagnóstico completo de tu carta?",
    midDesc: "Esta herramienta te da una visión parcial. El análisis completo detecta las oportunidades reales.",
    stickyText: "Diagnóstico completo gratis →",
  },
  comparison: {
    primary: { text: "Probar Winerim en mi restaurante", url: "/demo", micro: "Demo personalizada. Compruébalo con tus propios datos." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
    midTitle: "¿Quieres ver la diferencia en tu propio restaurante?",
    midDesc: "Solicita una demo y te mostramos cómo Winerim se compara con tu solución actual.",
    stickyText: "Probar Winerim →",
  },
  cases: {
    primary: { text: "Conseguir resultados similares", url: "/demo", micro: "Te mostramos cómo aplicar estas estrategias en tu negocio." },
    secondary: { text: "Ver planes", url: "/precios" },
    stickyText: "Solicitar demo →",
  },
  hotel: {
    primary: { text: "Solicitar propuesta para tu hotel", url: "/demo", micro: "Demo adaptada a hospitality y F&B." },
    secondary: { text: "Consultar integración PMS", url: "/contacto" },
    stickyText: "Propuesta para hoteles →",
  },
  group: {
    primary: { text: "Solicitar propuesta para tu grupo", url: "/demo", micro: "Demo adaptada a gestión multi-local." },
    secondary: { text: "Ver caso de grupo", url: "/casos-exito" },
    stickyText: "Propuesta para grupos →",
  },
};

/** Get resolved CTA set with overrides applied */
export const getResolvedCTASet = (pageType: PageType): CTASet => {
  const base = getCTASet(pageType);
  const overrides = PAGE_CTA_OVERRIDES[pageType];
  if (!overrides) return base;
  return { ...base, ...overrides, primary: { ...base.primary, ...overrides.primary }, secondary: { ...base.secondary, ...overrides.secondary } };
};
