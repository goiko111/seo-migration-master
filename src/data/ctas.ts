/* ═══════════════════════════════════════════════════════════
   CTA STRATEGY — Funnel-aware CTA system (i18n)
   ═══════════════════════════════════════════════════════════ */

import { SupportedLang } from "@/i18n/types";

export type FunnelStage = "tofu" | "mofu" | "bofu";

export interface CTAConfig {
  text: string;
  url: string;
  micro?: string;
}

export interface CTASet {
  primary: CTAConfig;
  secondary: CTAConfig;
  badge: string;
  midTitle: string;
  midDesc: string;
  finalTitle: string;
  finalDesc: string;
  stickyText: string;
}

/* ─── Individual CTAs (backwards compat — ES default) ─── */
export const CTA_DEMO = { text: "Solicitar demo", url: "/demo" };
export const CTA_ANALYZE = { text: "Analizar mi carta gratis", url: "/analisis-carta" };
export const CTA_CALCULATOR = { text: "Calcular mi margen", url: "/calculadora-margen-vino" };
export const CTA_FREE_TRIAL = { text: "Ver demo", url: "/demo" };
export const CTA_CONTACT = { text: "Hablar con el equipo", url: "/contacto" };
export const CTA_PRICING = { text: "Ver planes y precios", url: "/precios" };
export const CTA_HOW_IT_WORKS = { text: "Cómo funciona Winerim", url: "/funcionalidades" };

/* ─── Funnel-stage CTA sets per language ─── */
const CTA_SETS_I18N: Record<SupportedLang, Record<FunnelStage, CTASet>> = {
  es: {
    tofu: {
      primary: { text: "Ver Winerim en acción", url: "/demo", micro: "Demo personalizada de 15 min. Sin compromiso." },
      secondary: { text: "Explorar funcionalidades", url: "/funcionalidades" },
      badge: "Descubre Winerim",
      midTitle: "¿Quieres ver cómo funciona en tu tipo de negocio?",
      midDesc: "Te mostramos Winerim aplicado a restaurantes como el tuyo. 15 minutos, sin compromiso.",
      finalTitle: "Descubre qué puede hacer Winerim por tu carta",
      finalDesc: "Demo personalizada de 15 min. Te mostramos el impacto en tu tipo de negocio.",
      stickyText: "Ver cómo funciona →",
    },
    mofu: {
      primary: { text: "Analizar mi carta gratis", url: "/analisis-carta", micro: "Diagnóstico con oportunidades reales de mejora. Sin coste." },
      secondary: { text: "Solicitar demo", url: "/demo" },
      badge: "¿Tu carta rinde lo que debería?",
      midTitle: "¿Tu carta de vinos rinde lo que debería?",
      midDesc: "Analizamos tu carta y te mostramos oportunidades concretas de mejora en margen, rotación y ticket medio.",
      finalTitle: "Análisis gratuito de tu carta de vinos",
      finalDesc: "Envía tu carta y te devolvemos un diagnóstico con datos reales y propuestas de acción.",
      stickyText: "Analizar mi carta gratis →",
    },
    bofu: {
      primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te mostramos Winerim aplicado a tu caso concreto." },
      secondary: { text: "Ver planes y precios", url: "/precios" },
      badge: "Da el siguiente paso",
      midTitle: "¿Listo para optimizar tu carta de vinos?",
      midDesc: "Solicita una demo y te mostramos cómo Winerim se adapta a tu operativa.",
      finalTitle: "Tu carta de vinos puede rendir más",
      finalDesc: "Demo personalizada en 15 min. Te mostramos cómo se integra con tu día a día.",
      stickyText: "Solicitar demo →",
    },
  },
  en: {
    tofu: {
      primary: { text: "See Winerim in action", url: "/demo", micro: "15-min personalised demo. No commitment." },
      secondary: { text: "Explore features", url: "/funcionalidades" },
      badge: "Discover Winerim",
      midTitle: "Want to see how it works for your type of business?",
      midDesc: "We'll show you Winerim applied to restaurants like yours. 15 minutes, no commitment.",
      finalTitle: "Discover what Winerim can do for your wine list",
      finalDesc: "15-min personalised demo. We'll show you the impact for your type of business.",
      stickyText: "See how it works →",
    },
    mofu: {
      primary: { text: "Analyse my list for free", url: "/analisis-carta", micro: "Diagnosis with real improvement opportunities. No cost." },
      secondary: { text: "Request demo", url: "/demo" },
      badge: "Is your wine list delivering?",
      midTitle: "Is your wine list performing as it should?",
      midDesc: "We'll analyse your list and show you concrete improvement opportunities in margin, rotation and average ticket.",
      finalTitle: "Free wine list analysis",
      finalDesc: "Send your list and we'll return a diagnosis with real data and action proposals.",
      stickyText: "Analyse my list for free →",
    },
    bofu: {
      primary: { text: "Request personalised demo", url: "/demo", micro: "We'll show you Winerim applied to your specific case." },
      secondary: { text: "See plans and pricing", url: "/precios" },
      badge: "Take the next step",
      midTitle: "Ready to optimise your wine list?",
      midDesc: "Request a demo and we'll show you how Winerim adapts to your operations.",
      finalTitle: "Your wine list can perform better",
      finalDesc: "15-min personalised demo. We'll show you how it integrates with your day-to-day.",
      stickyText: "Request demo →",
    },
  },
  it: {
    tofu: {
      primary: { text: "Vedi Winerim in azione", url: "/demo", micro: "Demo personalizzata di 15 min. Senza impegno." },
      secondary: { text: "Esplora le funzionalità", url: "/funcionalidades" },
      badge: "Scopri Winerim",
      midTitle: "Vuoi vedere come funziona per il tuo tipo di attività?",
      midDesc: "Ti mostriamo Winerim applicato a ristoranti come il tuo. 15 minuti, senza impegno.",
      finalTitle: "Scopri cosa può fare Winerim per la tua carta",
      finalDesc: "Demo personalizzata di 15 min. Ti mostriamo l'impatto per il tuo tipo di attività.",
      stickyText: "Scopri come funziona →",
    },
    mofu: {
      primary: { text: "Analizza la mia carta gratis", url: "/analisis-carta", micro: "Diagnosi con opportunità reali di miglioramento. Senza costi." },
      secondary: { text: "Richiedi demo", url: "/demo" },
      badge: "La tua carta rende quanto dovrebbe?",
      midTitle: "La tua carta dei vini rende quanto dovrebbe?",
      midDesc: "Analizziamo la tua carta e ti mostriamo opportunità concrete di miglioramento in margine, rotazione e scontrino medio.",
      finalTitle: "Analisi gratuita della tua carta dei vini",
      finalDesc: "Invia la tua carta e ti restituiamo una diagnosi con dati reali e proposte d'azione.",
      stickyText: "Analizza la mia carta gratis →",
    },
    bofu: {
      primary: { text: "Richiedi demo personalizzata", url: "/demo", micro: "Ti mostriamo Winerim applicato al tuo caso specifico." },
      secondary: { text: "Vedi piani e prezzi", url: "/precios" },
      badge: "Fai il prossimo passo",
      midTitle: "Pronto a ottimizzare la tua carta dei vini?",
      midDesc: "Richiedi una demo e ti mostriamo come Winerim si adatta alla tua operatività.",
      finalTitle: "La tua carta dei vini può rendere di più",
      finalDesc: "Demo personalizzata di 15 min. Ti mostriamo come si integra con il tuo quotidiano.",
      stickyText: "Richiedi demo →",
    },
  },
  fr: {
    tofu: {
      primary: { text: "Voir Winerim en action", url: "/demo", micro: "Démo personnalisée de 15 min. Sans engagement." },
      secondary: { text: "Explorer les fonctionnalités", url: "/funcionalidades" },
      badge: "Découvrez Winerim",
      midTitle: "Vous voulez voir comment ça fonctionne pour votre type d'établissement ?",
      midDesc: "Nous vous montrons Winerim appliqué à des restaurants comme le vôtre. 15 minutes, sans engagement.",
      finalTitle: "Découvrez ce que Winerim peut faire pour votre carte",
      finalDesc: "Démo personnalisée de 15 min. Nous vous montrons l'impact pour votre type d'établissement.",
      stickyText: "Voir comment ça marche →",
    },
    mofu: {
      primary: { text: "Analyser ma carte gratuitement", url: "/analisis-carta", micro: "Diagnostic avec de vraies opportunités d'amélioration. Sans frais." },
      secondary: { text: "Demander une démo", url: "/demo" },
      badge: "Votre carte performe-t-elle ?",
      midTitle: "Votre carte des vins performe-t-elle comme elle le devrait ?",
      midDesc: "Nous analysons votre carte et vous montrons des opportunités concrètes d'amélioration en marge, rotation et ticket moyen.",
      finalTitle: "Analyse gratuite de votre carte des vins",
      finalDesc: "Envoyez votre carte et nous vous renverrons un diagnostic avec des données réelles et des propositions d'action.",
      stickyText: "Analyser ma carte gratuitement →",
    },
    bofu: {
      primary: { text: "Demander une démo personnalisée", url: "/demo", micro: "Nous vous montrons Winerim appliqué à votre cas concret." },
      secondary: { text: "Voir les plans et tarifs", url: "/precios" },
      badge: "Passez à l'étape suivante",
      midTitle: "Prêt à optimiser votre carte des vins ?",
      midDesc: "Demandez une démo et nous vous montrons comment Winerim s'adapte à votre fonctionnement.",
      finalTitle: "Votre carte des vins peut mieux performer",
      finalDesc: "Démo personnalisée de 15 min. Nous vous montrons comment elle s'intègre à votre quotidien.",
      stickyText: "Demander une démo →",
    },
  },
};

/* ─── Backward-compatible default (ES) ─── */
export const CTA_SETS = CTA_SETS_I18N.es;

/* ─── Get CTA sets by language ─── */
export const getCTASetsForLang = (lang: SupportedLang): Record<FunnelStage, CTASet> => CTA_SETS_I18N[lang];

/* ─── Contextual CTA sets by page type ─── */
export type PageType =
  | "home" | "pricing" | "features" | "solutions" | "solution_detail"
  | "hotel" | "group" | "implementation"
  | "guide" | "blog" | "article" | "resource"
  | "tool" | "calculator" | "analyzer"
  | "comparison" | "cases" | "benchmark"
  | "library" | "about" | "contact"
  | "integrations" | "vertical_gastronomic" | "vertical_winebar"
  | "vertical_hotel" | "vertical_no_sommelier" | "vertical_large_list";

export const PAGE_FUNNEL_MAP: Record<PageType, FunnelStage> = {
  home: "tofu",
  about: "tofu",
  features: "tofu",
  library: "tofu",
  integrations: "tofu",
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
  vertical_gastronomic: "bofu",
  vertical_winebar: "bofu",
  vertical_hotel: "bofu",
  vertical_no_sommelier: "bofu",
  vertical_large_list: "bofu",
};

/** Get the CTA set for a given page type (default ES) */
export const getCTASet = (pageType: PageType): CTASet => {
  const stage = PAGE_FUNNEL_MAP[pageType];
  return CTA_SETS[stage];
};

/** Get the CTA set for a given page type and language */
export const getCTASetForLang = (pageType: PageType, lang: SupportedLang): CTASet => {
  const stage = PAGE_FUNNEL_MAP[pageType];
  return CTA_SETS_I18N[lang][stage];
};

/* ─── Page-specific CTA overrides (ES only for backward compat) ─── */
export const PAGE_CTA_OVERRIDES: Partial<Record<PageType, Partial<CTASet>>> = {
  home: {
    badge: "Empieza hoy",
    finalTitle: "¿Tu carta de vinos rinde lo que debería?",
    finalDesc: "Te analizamos la carta sin coste y te mostramos dónde están las oportunidades.",
    primary: { text: "Solicitar análisis gratuito", url: "/analisis-carta", micro: "Sin compromiso. Diagnóstico en 48 h." },
    secondary: { text: "Ver cómo funciona", url: "/demo" },
    stickyText: "Ver cómo funciona →",
  },
  features: {
    badge: "¿Encaja con tu negocio?",
    finalTitle: "Compruébalo con tu propia carta",
    finalDesc: "Analizamos tu carta gratis y te mostramos qué funcionalidades tendrían más impacto en tu caso.",
    primary: { text: "Analizar mi carta gratis", url: "/analisis-carta", micro: "Diagnóstico personalizado. Sin coste." },
    secondary: { text: "Solicitar demo", url: "/demo" },
    stickyText: "Analizar mi carta →",
  },
  integrations: {
    badge: "¿Compatible con tu sistema?",
    midTitle: "¿Quieres saber si Winerim se integra con tu POS o PMS?",
    midDesc: "Cuéntanos qué sistema usas y te confirmamos la compatibilidad.",
    finalTitle: "Integración sin fricción con tu operativa",
    finalDesc: "Conectamos con tu POS, PMS o ERP. Te mostramos cómo en una demo de 15 min.",
    primary: { text: "Consultar integración", url: "/contacto", micro: "Te respondemos en menos de 24 h." },
    secondary: { text: "Solicitar demo", url: "/demo" },
    stickyText: "Consultar integración →",
  },
  pricing: {
    badge: "Encuentra tu plan",
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te ayudamos a elegir el plan adecuado para tu negocio." },
    secondary: { text: "Hablar con el equipo comercial", url: "/contacto" },
    midTitle: "¿No sabes qué plan necesitas?",
    midDesc: "Cada negocio es distinto. Cuéntanos tu caso y te recomendamos la opción más rentable.",
    finalTitle: "El plan adecuado para tu tipo de negocio",
    finalDesc: "Desde restaurantes independientes hasta grandes grupos. Te ayudamos a elegir.",
    stickyText: "Solicitar demo →",
  },
  tool: {
    badge: "Lleva el análisis más lejos",
    primary: { text: "Análisis completo de mi carta", url: "/analisis-carta", micro: "Diagnóstico completo de tu carta. Sin coste, sin compromiso." },
    secondary: { text: "Todas las herramientas", url: "/herramientas" },
    midTitle: "¿Quieres un diagnóstico completo de tu carta?",
    midDesc: "Esta herramienta te da una visión parcial. El análisis completo detecta las oportunidades reales.",
    finalTitle: "Tu carta tiene más potencial del que crees",
    finalDesc: "El análisis gratuito detecta oportunidades que una calculadora no puede ver.",
    stickyText: "Diagnóstico completo gratis →",
  },
  calculator: {
    badge: "Más allá de los números",
    primary: { text: "Análisis completo de mi carta", url: "/analisis-carta", micro: "Va más allá de un cálculo: analiza margen, rotación y surtido." },
    secondary: { text: "Ver más herramientas", url: "/herramientas" },
    midTitle: "¿Los números no cuadran?",
    midDesc: "El margen real depende de más factores que el precio. Un análisis completo te lo muestra.",
    finalTitle: "Del cálculo a la acción",
    finalDesc: "Te analizamos la carta completa y te mostramos cómo mejorar tus márgenes de forma concreta.",
    stickyText: "Análisis completo →",
  },
  comparison: {
    badge: "Compruébalo tú mismo",
    primary: { text: "Probar Winerim en mi restaurante", url: "/demo", micro: "Demo personalizada. Compruébalo con tus propios datos." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
    midTitle: "¿Quieres ver la diferencia en tu propio restaurante?",
    midDesc: "Solicita una demo y te mostramos cómo Winerim se compara con tu solución actual.",
    finalTitle: "La mejor comparativa es probarlo",
    finalDesc: "Demo de 15 min con tus propios datos. Sin compromiso.",
    stickyText: "Probar Winerim →",
  },
  cases: {
    badge: "Consigue resultados similares",
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te mostramos cómo aplicar estas estrategias en tu negocio." },
    secondary: { text: "Ver planes", url: "/precios" },
    finalTitle: "Estos resultados son alcanzables",
    finalDesc: "Te mostramos cómo aplicar las mismas estrategias en tu restaurante.",
    stickyText: "Solicitar demo →",
  },
  guide: {
    badge: "Pon esto en práctica",
    midTitle: "¿Quieres aplicar esto en tu carta?",
    midDesc: "Analizamos tu carta sin coste y te mostramos cómo implementar estas recomendaciones.",
    finalTitle: "De la teoría a tu carta",
    finalDesc: "Te analizamos la carta gratis y te mostramos cómo aplicar lo que has aprendido.",
    stickyText: "Analizar mi carta gratis →",
  },
  article: {
    badge: "Llévalo a la práctica",
    midTitle: "¿Tu carta de vinos tiene estos problemas?",
    midDesc: "Compruébalo con un análisis gratuito. Te mostramos las oportunidades de mejora.",
  },
  blog: {
    badge: "¿Tu carta tiene este problema?",
    midTitle: "¿Reconoces estos problemas en tu carta?",
    midDesc: "Analizamos tu carta gratis y te mostramos las oportunidades que estás perdiendo.",
    finalTitle: "Análisis gratuito de tu carta de vinos",
    finalDesc: "Envía tu carta y recibe un diagnóstico con datos reales y propuestas de acción.",
  },
  benchmark: {
    badge: "Aplica este benchmark",
    primary: { text: "Solicitar demo personalizada", url: "/demo", micro: "Te mostramos cómo estos datos se aplican a tu restaurante." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
    finalTitle: "Compara tus datos con el sector",
    finalDesc: "Solicita una demo y te mostramos cómo se posiciona tu carta frente a estos benchmarks.",
    stickyText: "Aplicar benchmark →",
  },
  resource: {
    badge: "Descarga y aplica",
    primary: { text: "Descargar recurso", url: "/guias-y-recursos", micro: "Plantillas y herramientas listas para usar." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
  },
  hotel: {
    badge: "Propuesta para hoteles",
    primary: { text: "Solicitar propuesta para tu hotel", url: "/demo", micro: "Demo adaptada a hospitality y F&B multi-punto." },
    secondary: { text: "Consultar integración PMS", url: "/contacto" },
    midTitle: "¿Gestionas la carta de vinos de un hotel?",
    midDesc: "Te mostramos cómo Winerim estandariza y optimiza el F&B de hoteles y resorts.",
    finalTitle: "El F&B de tu hotel, con datos y control",
    finalDesc: "Demo adaptada a hospitality. Consistencia entre puntos de venta sin perder personalización.",
    stickyText: "Propuesta para hoteles →",
  },
  group: {
    badge: "Propuesta para grupos",
    primary: { text: "Solicitar propuesta para tu grupo", url: "/demo", micro: "Demo adaptada a gestión multi-local centralizada." },
    secondary: { text: "Ver caso de grupo", url: "/casos-exito" },
    midTitle: "¿Gestionas la carta de varios locales?",
    midDesc: "Te mostramos cómo Winerim centraliza la gestión sin perder la identidad de cada punto de venta.",
    finalTitle: "Control centralizado, identidad local",
    finalDesc: "Demo adaptada a grupos. Te mostramos la gestión multi-local en 15 min.",
    stickyText: "Propuesta para grupos →",
  },
  vertical_gastronomic: {
    badge: "Para restaurantes gastronómicos",
    primary: { text: "Solicitar demo para gastronómico", url: "/demo", micro: "Te mostramos Winerim con fichas técnicas premium y maridajes." },
    secondary: { text: "Ver casos de éxito", url: "/casos-exito" },
    midTitle: "¿Tu carta gastronómica rinde a la altura de tu cocina?",
    midDesc: "Te mostramos cómo potenciar la experiencia enológica sin depender solo del sumiller.",
    finalTitle: "Una carta a la altura de tu propuesta gastronómica",
    finalDesc: "Demo personalizada de 15 min. Fichas premium, maridajes y análisis de rotación.",
    stickyText: "Demo para gastronómicos →",
  },
  vertical_winebar: {
    badge: "Para wine bars",
    primary: { text: "Solicitar demo para wine bar", url: "/demo", micro: "Te mostramos la gestión de copas, mermas y pricing dinámico." },
    secondary: { text: "Calcular precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    midTitle: "¿Controlas realmente el margen de tus copas?",
    midDesc: "Te mostramos cómo Winerim optimiza el vino por copa: pricing, mermas y rotación.",
    finalTitle: "Cada copa cuenta. Literalmente.",
    finalDesc: "Demo de 15 min centrada en gestión por copa, pricing dinámico y control de merma.",
    stickyText: "Demo para wine bars →",
  },
  vertical_hotel: {
    badge: "Para hoteles y resorts",
    primary: { text: "Solicitar propuesta para tu hotel", url: "/demo", micro: "Demo adaptada a F&B multi-punto en hospitality." },
    secondary: { text: "Consultar integración PMS", url: "/contacto" },
    finalTitle: "Consistencia de F&B en todos tus puntos de venta",
    finalDesc: "Te mostramos cómo centralizar la gestión sin perder la identidad de cada restaurante.",
    stickyText: "Propuesta para hoteles →",
  },
  vertical_no_sommelier: {
    badge: "Para restaurantes sin sumiller",
    primary: { text: "Ver cómo funciona sin sumiller", url: "/demo", micro: "Tu equipo recomienda con confianza desde el primer día." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
    midTitle: "¿Tu equipo no sabe recomendar vinos?",
    midDesc: "Winerim guía al equipo de sala paso a paso. No necesitas un sumiller para vender bien.",
    finalTitle: "Vende vino con confianza, sin sumiller",
    finalDesc: "Demo de 15 min. Te mostramos cómo tu equipo recomienda desde el primer día.",
    stickyText: "Demo sin sumiller →",
  },
  vertical_large_list: {
    badge: "Para cartas con +250 referencias",
    primary: { text: "Solicitar demo para carta amplia", url: "/demo", micro: "Te mostramos cómo detectar stock muerto y canibalización." },
    secondary: { text: "Analizar mi carta", url: "/analisis-carta" },
    midTitle: "¿Tienes referencias que nadie pide?",
    midDesc: "Winerim detecta stock muerto, canibalización y oportunidades de simplificación.",
    finalTitle: "Menos referencias muertas, más margen activo",
    finalDesc: "Demo de 15 min centrada en optimización de surtido y detección de ineficiencias.",
    stickyText: "Demo para carta amplia →",
  },
};

/** Get resolved CTA set with overrides applied (ES default) */
export const getResolvedCTASet = (pageType: PageType): CTASet => {
  const base = getCTASet(pageType);
  const overrides = PAGE_CTA_OVERRIDES[pageType];
  if (!overrides) return base;
  return {
    ...base,
    ...overrides,
    primary: { ...base.primary, ...overrides.primary },
    secondary: { ...base.secondary, ...overrides.secondary },
  };
};

/** Get resolved CTA set for a specific language */
export const getResolvedCTASetForLang = (pageType: PageType, lang: SupportedLang): CTASet => {
  const base = getCTASetForLang(pageType, lang);
  // Overrides only apply to ES for now; other langs use base funnel sets
  if (lang !== "es") return base;
  const overrides = PAGE_CTA_OVERRIDES[pageType];
  if (!overrides) return base;
  return {
    ...base,
    ...overrides,
    primary: { ...base.primary, ...overrides.primary },
    secondary: { ...base.secondary, ...overrides.secondary },
  };
};
