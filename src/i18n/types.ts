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
    "/producto/winerim-core": "/en/product/winerim-core",
    "/producto/winerim-supply": "/en/product/winerim-supply",
    "/analisis-carta": "/en/wine-list-analysis",
    "/calculadora-margen-vino": "/en/wine-margin-calculator",
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
    "/producto/winerim-core": "/it/prodotto/winerim-core",
    "/producto/winerim-supply": "/it/prodotto/winerim-supply",
    "/analisis-carta": "/it/analisi-carta",
    "/calculadora-margen-vino": "/it/calcolatrice-margini-vino",
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
    "/producto/winerim-core": "/fr/produit/winerim-core",
    "/producto/winerim-supply": "/fr/produit/winerim-supply",
    "/analisis-carta": "/fr/analyse-carte",
    "/calculadora-margen-vino": "/fr/calculateur-marge-vin",
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
  nav_resources_downloads: string;
  nav_resources_tools: string;
  nav_downloadable_resources: string;
  nav_benchmarks: string;

  // Nav sections
  nav_platform: string;
  nav_results: string;

  // Nav descriptions
  nav_software_desc: string;
  nav_by_business_type: string;

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
  footer_cta_title: string;
  footer_cta_subtitle: string;

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

  // Cookie consent
  cookie_title: string;
  cookie_desc: string;
  cookie_accept: string;
  cookie_reject: string;
  cookie_more_info: string;

  // Breadcrumbs
  breadcrumb_home: string;

  // Forms
  form_restaurant_label: string;
  form_restaurant_placeholder: string;
  form_name_label: string;
  form_name_placeholder: string;
  form_position_label: string;
  form_position_placeholder: string;
  form_phone_label: string;
  form_email_label: string;
  form_email_placeholder: string;
  form_city_label: string;
  form_city_placeholder: string;
  form_references_label: string;
  form_references_placeholder: string;
  form_business_type_label: string;
  form_business_type_placeholder: string;
  form_locations_label: string;
  form_locations_placeholder: string;
  form_challenge_label: string;
  form_challenge_placeholder: string;

  // WhatsApp
  whatsapp_message: string;

  // Close / dismiss
  common_close: string;

  // FAQ
  faq_title_default: string;

  // Locale
  locale: string;
}
