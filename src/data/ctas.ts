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
export const CTA_ANALYZE = { text: "Analiza tu carta gratis", url: "/analisis-carta" };
export const CTA_CALCULATOR = { text: "Calcular margen", url: "/calculadora-margen-vino" };
export const CTA_FREE_TRIAL = { text: "Prueba gratis", url: "/demo" };
export const CTA_CONTACT = { text: "Contactar", url: "/contacto" };
export const CTA_PRICING = { text: "Ver planes", url: "/precios" };
export const CTA_HOW_IT_WORKS = { text: "Ver cómo funciona", url: "/funcionalidades" };

/* ─── Funnel-stage CTA sets ─── */
export const CTA_SETS: Record<FunnelStage, CTASet> = {
  tofu: {
    primary: { text: "Descubre cómo funciona", url: "/demo", micro: "Sin compromiso. Te mostramos Winerim en 15 minutos." },
    secondary: { text: "Ver funcionalidades", url: "/funcionalidades" },
    midTitle: "¿Quieres ver Winerim en acción?",
    midDesc: "Descubre cómo restaurantes reales usan Winerim para vender más vino sin complicar la operativa.",
    finalTitle: "Descubre lo que Winerim puede hacer por tu restaurante",
    finalDesc: "Una demo personalizada de 15 minutos. Sin compromiso, sin presión.",
    stickyText: "Ver cómo funciona →",
  },
  mofu: {
    primary: { text: "Analiza tu carta gratis", url: "/analisis-carta", micro: "Te mostramos cómo mejorar tu carta de vinos sin compromiso." },
    secondary: { text: "Solicitar demo", url: "/demo" },
    midTitle: "¿Tu carta de vinos está optimizada?",
    midDesc: "Analizamos tu carta y te mostramos oportunidades de mejora en margen, rotación y venta.",
    finalTitle: "Analiza tu carta de vinos sin compromiso",
    finalDesc: "Envía tu carta y te devolvemos un diagnóstico con oportunidades reales de mejora.",
    stickyText: "Analiza tu carta gratis →",
  },
  bofu: {
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te mostramos Winerim aplicado a tu caso concreto." },
    secondary: { text: "Ver planes y precios", url: "/precios" },
    midTitle: "¿Listo para optimizar tu carta de vinos?",
    midDesc: "Solicita una demo personalizada y te mostramos cómo Winerim se adapta a tu restaurante.",
    finalTitle: "Da el siguiente paso",
    finalDesc: "Solicita tu demo personalizada. Te mostramos cómo Winerim se integra con tu operativa.",
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
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te ayudamos a elegir el plan adecuado." },
    secondary: { text: "Hablar con ventas", url: "/contacto" },
    midTitle: "¿No estás seguro de qué plan necesitas?",
    midDesc: "Te ayudamos a elegir. Solicita una demo y analizamos tu caso.",
    stickyText: "Solicitar demo →",
  },
  tool: {
    primary: { text: "Analiza tu carta gratis", url: "/analisis-carta", micro: "Sube tu carta y te devolvemos un diagnóstico completo." },
    secondary: { text: "Ver todas las herramientas", url: "/herramientas" },
    midTitle: "¿Quieres un análisis completo de tu carta?",
    midDesc: "Esta herramienta te da una visión parcial. El análisis completo te muestra todo el potencial.",
    stickyText: "Análisis completo gratis →",
  },
  comparison: {
    primary: { text: "Prueba Winerim gratis", url: "/demo", micro: "Compruébalo tú mismo. Demo personalizada sin compromiso." },
    secondary: { text: "Analiza tu carta", url: "/analisis-carta" },
    midTitle: "¿Quieres ver la diferencia en tu propio restaurante?",
    midDesc: "Solicita una demo y te mostramos cómo Winerim se compara con tu solución actual.",
    stickyText: "Prueba Winerim →",
  },
  cases: {
    primary: { text: "Consigue resultados similares", url: "/demo", micro: "Te mostramos cómo aplicar estas estrategias en tu restaurante." },
    secondary: { text: "Ver planes", url: "/precios" },
    stickyText: "Solicitar demo →",
  },
  hotel: {
    primary: { text: "Solicitar propuesta para tu hotel", url: "/demo", micro: "Demo adaptada a hospitality y F&B." },
    secondary: { text: "Consultar integración PMS", url: "/contacto" },
    stickyText: "Propuesta para hoteles →",
  },
  group: {
    primary: { text: "Solicitar propuesta para tu grupo", url: "/demo", micro: "Demo adaptada a grupos multi-local." },
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
