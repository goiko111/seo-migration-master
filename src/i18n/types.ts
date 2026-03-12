export type SupportedLang = "es" | "en" | "it" | "fr";

export const SUPPORTED_LANGS: SupportedLang[] = ["es", "en", "it", "fr"];
export const DEFAULT_LANG: SupportedLang = "es";

export const LANG_LABELS: Record<SupportedLang, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
  fr: "Français",
};

export const LANG_FLAGS: Record<SupportedLang, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  it: "🇮🇹",
  fr: "🇫🇷",
};

// Map of ES route slugs to localized route slugs per language
export const ROUTE_MAP: Record<SupportedLang, Record<string, string>> = {
  es: {},
  en: {
    "/": "/en",
    "/blog": "/en/blog",
    "/demo": "/en/demo",
    "/precios": "/en/pricing",
    "/contacto": "/en/contact",
    "/funcionalidades": "/en/features",
    "/clientes": "/en/clients",
    "/integraciones": "/en/integrations",
    "/casos-exito": "/en/case-studies",
    "/herramientas": "/en/tools",
    "/guias-y-recursos": "/en/guides",
    "/soluciones": "/en/solutions",
    "/problemas": "/en/challenges",
    "/sommelier-corner": "/en/sommelier-corner",
    "/afiliate": "/en/affiliate",
    "/software-carta-de-vinos": "/en/wine-list-management-software",
    "/que-es-winerim": "/en/what-is-winerim",
    "/privacidad": "/en/privacy",
    "/terminos": "/en/terms",
    "/soluciones/grupos-restauracion": "/en/solutions/restaurant-groups",
    "/soluciones/aumentar-ticket-medio-restaurante": "/en/solutions/increase-average-ticket",
    "/producto/inteligencia-dinamica": "/en/product/dynamic-intelligence",
  },
  it: {
    "/": "/it",
    "/blog": "/it/blog",
    "/demo": "/it/demo",
    "/precios": "/it/prezzi",
    "/contacto": "/it/contatto",
    "/funcionalidades": "/it/funzionalita",
    "/clientes": "/it/clienti",
    "/integraciones": "/it/integrazioni",
    "/casos-exito": "/it/casi-di-successo",
    "/herramientas": "/it/strumenti",
    "/guias-y-recursos": "/it/guide",
    "/soluciones": "/it/soluzioni",
    "/problemas": "/it/sfide",
    "/sommelier-corner": "/it/sommelier-corner",
    "/afiliate": "/it/affiliati",
    "/software-carta-de-vinos": "/it/software-carta-vini",
    "/que-es-winerim": "/it/cose-winerim",
    "/privacidad": "/it/privacy",
    "/terminos": "/it/termini",
    "/soluciones/grupos-restauracion": "/it/soluzioni/gruppi-ristorazione",
    "/soluciones/aumentar-ticket-medio-restaurante": "/it/soluzioni/aumentare-scontrino-medio",
    "/producto/inteligencia-dinamica": "/it/prodotto/intelligenza-dinamica",
  },
  fr: {
    "/": "/fr",
    "/blog": "/fr/blog",
    "/demo": "/fr/demo",
    "/precios": "/fr/tarifs",
    "/contacto": "/fr/contact",
    "/funcionalidades": "/fr/fonctionnalites",
    "/clientes": "/fr/clients",
    "/integraciones": "/fr/integrations",
    "/casos-exito": "/fr/cas-clients",
    "/herramientas": "/fr/outils",
    "/guias-y-recursos": "/fr/guides",
    "/soluciones": "/fr/solutions",
    "/problemas": "/fr/defis",
    "/sommelier-corner": "/fr/sommelier-corner",
    "/afiliate": "/fr/affilies",
    "/software-carta-de-vinos": "/fr/logiciel-carte-des-vins",
    "/que-es-winerim": "/fr/quest-ce-que-winerim",
    "/privacidad": "/fr/confidentialite",
    "/terminos": "/fr/conditions",
    "/soluciones/grupos-restauracion": "/fr/solutions/groupes-restauration",
    "/soluciones/aumentar-ticket-medio-restaurante": "/fr/solutions/augmenter-ticket-moyen",
    "/producto/inteligencia-dinamica": "/fr/produit/intelligence-dynamique",
  },
};

export interface TranslationDict {
  // Nav
  nav_home: string;
  nav_product: string;
  nav_tools: string;
  nav_blog: string;
  nav_sommelier: string;
  nav_guides: string;
  nav_contact: string;
  nav_cta: string;

  // Nav dropdown - Product
  nav_software: string;
  nav_features: string;
  nav_integrations: string;
  nav_pricing: string;
  nav_case_studies: string;
  nav_clients: string;
  nav_solutions_groups: string;
  nav_dynamic_intelligence?: string;

  // Nav dropdown - Tools
  nav_wine_analyzer: string;
  nav_margin_calc: string;
  nav_glass_price: string;
  nav_pairing_generator: string;
  nav_pricing_tool: string;
  nav_see_all: string;

  // Nav - Solutions vertical
  nav_solutions: string;
  nav_sol_gastronomic: string;
  nav_sol_wine_bars: string;
  nav_sol_hotels: string;
  nav_sol_groups: string;
  nav_sol_no_sommelier: string;
  nav_sol_large_list: string;

  // Nav - Resources mega
  nav_resources: string;
  nav_resources_learn: string;
  nav_resources_tools: string;
  nav_benchmarks: string;

  // Nav sections
  nav_platform: string;
  nav_results: string;

  // Footer
  footer_description: string;
  footer_tagline: string;
  footer_product: string;
  footer_content: string;
  footer_tools: string;
  footer_legal: string;
  footer_free_demo: string;
  footer_common_problems: string;
  footer_privacy: string;
  footer_terms: string;
  footer_copyright: string;
  footer_company: string;
  footer_about: string;
  footer_methodology: string;
  footer_contact_email: string;

  // Hero
  hero_badge: string;
  hero_title_1: string;
  hero_title_highlight: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Problem section
  problem_badge: string;
  problem_title_1: string;
  problem_title_highlight: string;
  problem_1: string;
  problem_2: string;
  problem_3: string;
  problem_4: string;
  problem_quote: string;
  problem_quote_highlight: string;

  // Solution section
  solution_badge: string;
  solution_title_1: string;
  solution_title_highlight: string;
  solution_subtitle: string;

  // Results
  results_badge: string;
  results_title: string;
  results_subtitle: string;

  // How it works
  how_badge: string;
  how_title: string;
  how_subtitle: string;

  // Features preview
  features_badge: string;
  features_title: string;
  features_subtitle: string;
  features_see_all: string;

  // Final CTA
  cta_title_1: string;
  cta_title_highlight: string;
  cta_subtitle: string;
  cta_button: string;

  // Common
  common_request_demo: string;
  common_learn_more: string;
  common_see_more: string;
  common_back: string;

  // SEO - Home
  seo_home_title: string;
  seo_home_description: string;

  // Contact page
  contact_title: string;
  contact_subtitle: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_restaurant: string;
  contact_message: string;
  contact_send: string;

  // Demo page
  demo_title: string;
  demo_subtitle: string;

  // Pricing page
  pricing_title: string;
  pricing_subtitle: string;

  // Locale
  locale: string;
}
