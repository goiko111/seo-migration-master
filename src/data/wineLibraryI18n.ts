export {
  getWineLibraryEsPath,
  getWineLibraryHreflang,
  getWineLibraryPath,
  getWineLibraryUrl,
  normalizeWineOverlayLang,
  resolveWineLang,
  WINE_I18N_LANGS,
  WINE_RUNTIME_LANGS,
} from "./wineLibraryRoutes";
export type { WineI18nLang, WineRuntimeLang } from "./wineLibraryRoutes";

import {
  resolveWineLang,
  type WineI18nLang,
  type WineRuntimeLang,
} from "./wineLibraryRoutes";

export interface WineSeoOverlay {
  title: string;
  description: string;
}

export interface WineI18nOverlay {
  description: string;
  intro: string;
  seo: WineSeoOverlay;
}

export type WineOverlayMap<T extends WineI18nOverlay = WineI18nOverlay> = Record<
  string,
  Partial<Record<WineI18nLang, T>>
>;

export const normalizeWineSearch = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ß/g, "ss");

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, Math.max(0, maxLength - 1));
  const lastSpace = cut.lastIndexOf(" ");
  const safeCut = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut.trimEnd()}...`;
};

export const seoTitle = (title: string): string => {
  const suffix = " | Winerim";
  return `${truncateText(title, 60 - suffix.length)}${suffix}`;
};

export const seoDescription = (description: string): string =>
  truncateText(description, 158);

export const formatList = (items: string[], lang: WineRuntimeLang, maxItems = 3): string => {
  const visible = items.filter(Boolean).slice(0, maxItems);
  if (visible.length === 0) return "";
  const conjunction: Record<WineRuntimeLang, string> = {
    es: " y ",
    en: " and ",
    fr: " et ",
    it: " e ",
    de: " und ",
    pt: " e ",
  };
  if (visible.length === 1) return visible[0];
  return `${visible.slice(0, -1).join(", ")}${conjunction[lang]}${visible[visible.length - 1]}`;
};

const countryNames: Record<WineI18nLang, Record<string, string>> = {
  en: {
    "España": "Spain",
    "Francia": "France",
    "Italia": "Italy",
    "Portugal": "Portugal",
    "Estados Unidos": "United States",
    "Alemania": "Germany",
    "Argentina": "Argentina",
    "Chile": "Chile",
    "Australia": "Australia",
    "Sudáfrica": "South Africa",
    "Nueva Zelanda": "New Zealand",
    "Austria": "Austria",
    "Grecia": "Greece",
    "Hungría": "Hungary",
    "Georgia": "Georgia",
    "Japón": "Japan",
  },
  fr: {
    "España": "Espagne",
    "Francia": "France",
    "Italia": "Italie",
    "Portugal": "Portugal",
    "Estados Unidos": "Etats-Unis",
    "Alemania": "Allemagne",
    "Argentina": "Argentine",
    "Chile": "Chili",
    "Australia": "Australie",
    "Sudáfrica": "Afrique du Sud",
    "Nueva Zelanda": "Nouvelle-Zélande",
    "Austria": "Autriche",
    "Grecia": "Grèce",
    "Hungría": "Hongrie",
    "Georgia": "Géorgie",
    "Japón": "Japon",
  },
  it: {
    "España": "Spagna",
    "Francia": "Francia",
    "Italia": "Italia",
    "Portugal": "Portogallo",
    "Estados Unidos": "Stati Uniti",
    "Alemania": "Germania",
    "Argentina": "Argentina",
    "Chile": "Cile",
    "Australia": "Australia",
    "Sudáfrica": "Sudafrica",
    "Nueva Zelanda": "Nuova Zelanda",
    "Austria": "Austria",
    "Grecia": "Grecia",
    "Hungría": "Ungheria",
    "Georgia": "Georgia",
    "Japón": "Giappone",
  },
  de: {
    "España": "Spanien",
    "Francia": "Frankreich",
    "Italia": "Italien",
    "Portugal": "Portugal",
    "Estados Unidos": "USA",
    "Alemania": "Deutschland",
    "Argentina": "Argentinien",
    "Chile": "Chile",
    "Australia": "Australien",
    "Sudáfrica": "Südafrika",
    "Nueva Zelanda": "Neuseeland",
    "Austria": "Österreich",
    "Grecia": "Griechenland",
    "Hungría": "Ungarn",
    "Georgia": "Georgien",
    "Japón": "Japan",
  },
  pt: {
    "España": "Espanha",
    "Francia": "França",
    "Italia": "Itália",
    "Portugal": "Portugal",
    "Estados Unidos": "Estados Unidos",
    "Alemania": "Alemanha",
    "Argentina": "Argentina",
    "Chile": "Chile",
    "Australia": "Austrália",
    "Sudáfrica": "África do Sul",
    "Nueva Zelanda": "Nova Zelândia",
    "Austria": "Áustria",
    "Grecia": "Grécia",
    "Hungría": "Hungria",
    "Georgia": "Geórgia",
    "Japón": "Japão",
  },
};

export const localizeCountryName = (name: string, lang: WineRuntimeLang): string => {
  if (lang === "es") return name;
  return countryNames[lang][name] || name;
};

export const localizeCountryList = (countries: string[], lang: WineRuntimeLang, maxItems = 3): string =>
  formatList(countries.map((country) => localizeCountryName(country, lang)), lang, maxItems);

export const wineTypeLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: {
    tinto: "tintos",
    blanco: "blancos",
    rosado: "rosados",
    espumoso: "espumosos",
    dulce: "dulces",
    generoso: "generosos",
    naranja: "naranjas",
  },
  en: {
    tinto: "red wines",
    blanco: "white wines",
    rosado: "rosé wines",
    espumoso: "sparkling wines",
    dulce: "sweet wines",
    generoso: "fortified wines",
    naranja: "orange wines",
  },
  fr: {
    tinto: "vins rouges",
    blanco: "vins blancs",
    rosado: "vins rosés",
    espumoso: "vins effervescents",
    dulce: "vins doux",
    generoso: "vins fortifiés",
    naranja: "vins orange",
  },
  it: {
    tinto: "vini rossi",
    blanco: "vini bianchi",
    rosado: "vini rosati",
    espumoso: "spumanti",
    dulce: "vini dolci",
    generoso: "vini fortificati",
    naranja: "orange wine",
  },
  de: {
    tinto: "Rotweine",
    blanco: "Weißweine",
    rosado: "Roséweine",
    espumoso: "Schaumweine",
    dulce: "Süßweine",
    generoso: "verstärkte Weine",
    naranja: "Orange Wines",
  },
  pt: {
    tinto: "vinhos tintos",
    blanco: "vinhos brancos",
    rosado: "vinhos rosés",
    espumoso: "espumantes",
    dulce: "vinhos doces",
    generoso: "vinhos fortificados",
    naranja: "vinhos laranja",
  },
};

export const familyLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: {
    tinto: "Tintos",
    blanco: "Blancos",
    rosado: "Rosados",
    espumoso: "Espumosos",
    generoso: "Generosos / Fortificados",
    dulce: "Dulces Naturales",
    naranja: "Vinos Naranjas",
    eco: "Ecológicos, Biodinámicos y Naturales",
  },
  en: {
    tinto: "Red wines",
    blanco: "White wines",
    rosado: "Rosé wines",
    espumoso: "Sparkling wines",
    generoso: "Fortified wines",
    dulce: "Natural sweet wines",
    naranja: "Orange wines",
    eco: "Organic, Biodynamic and Natural",
  },
  fr: {
    tinto: "Vins rouges",
    blanco: "Vins blancs",
    rosado: "Vins rosés",
    espumoso: "Vins effervescents",
    generoso: "Vins fortifiés",
    dulce: "Vins doux naturels",
    naranja: "Vins orange",
    eco: "Bio, biodynamiques et naturels",
  },
  it: {
    tinto: "Vini rossi",
    blanco: "Vini bianchi",
    rosado: "Vini rosati",
    espumoso: "Spumanti",
    generoso: "Vini fortificati",
    dulce: "Vini dolci naturali",
    naranja: "Orange wine",
    eco: "Biologici, biodinamici e naturali",
  },
  de: {
    tinto: "Rotweine",
    blanco: "Weißweine",
    rosado: "Roséweine",
    espumoso: "Schaumweine",
    generoso: "Verstärkte Weine",
    dulce: "Natursüße Weine",
    naranja: "Orange Wines",
    eco: "Biologisch, biodynamisch und naturbelassen",
  },
  pt: {
    tinto: "Tintos",
    blanco: "Brancos",
    rosado: "Rosés",
    espumoso: "Espumantes",
    generoso: "Fortificados",
    dulce: "Doces naturais",
    naranja: "Vinhos laranja",
    eco: "Biológicos, biodinâmicos e naturais",
  },
};

export const categoryLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: {
    "carnes-rojas": "Carnes rojas",
    "aves-caza": "Aves y caza",
    "pescados-mariscos": "Pescados y mariscos",
    quesos: "Quesos",
    "pasta-arroces-legumbres": "Pasta, arroces y legumbres",
    "verduras-vegetariana": "Verduras y cocina vegetariana",
    "embutidos-charcuteria": "Embutidos y charcutería",
    "postres-chocolate": "Postres y chocolate",
    "cocina-asiatica-fusion": "Cocina asiática y fusión",
    "tapas-aperitivos": "Tapas y aperitivos",
  },
  en: {
    "carnes-rojas": "Red meat",
    "aves-caza": "Poultry and game",
    "pescados-mariscos": "Fish and seafood",
    quesos: "Cheese",
    "pasta-arroces-legumbres": "Pasta, rice and legumes",
    "verduras-vegetariana": "Vegetables and vegetarian cuisine",
    "embutidos-charcuteria": "Cured meats and charcuterie",
    "postres-chocolate": "Desserts and chocolate",
    "cocina-asiatica-fusion": "Asian and fusion cuisine",
    "tapas-aperitivos": "Tapas and aperitifs",
  },
  fr: {
    "carnes-rojas": "Viandes rouges",
    "aves-caza": "Volailles et gibier",
    "pescados-mariscos": "Poissons et fruits de mer",
    quesos: "Fromages",
    "pasta-arroces-legumbres": "Pâtes, riz et légumineuses",
    "verduras-vegetariana": "Légumes et cuisine végétarienne",
    "embutidos-charcuteria": "Charcuterie",
    "postres-chocolate": "Desserts et chocolat",
    "cocina-asiatica-fusion": "Cuisine asiatique et fusion",
    "tapas-aperitivos": "Tapas et apéritifs",
  },
  it: {
    "carnes-rojas": "Carni rosse",
    "aves-caza": "Pollame e selvaggina",
    "pescados-mariscos": "Pesce e frutti di mare",
    quesos: "Formaggi",
    "pasta-arroces-legumbres": "Pasta, riso e legumi",
    "verduras-vegetariana": "Verdure e cucina vegetariana",
    "embutidos-charcuteria": "Salumi e charcuterie",
    "postres-chocolate": "Dessert e cioccolato",
    "cocina-asiatica-fusion": "Cucina asiatica e fusion",
    "tapas-aperitivos": "Tapas e aperitivi",
  },
  de: {
    "carnes-rojas": "Rotes Fleisch",
    "aves-caza": "Geflügel und Wild",
    "pescados-mariscos": "Fisch und Meeresfrüchte",
    quesos: "Käse",
    "pasta-arroces-legumbres": "Pasta, Reis und Hülsenfrüchte",
    "verduras-vegetariana": "Gemüse und vegetarische Küche",
    "embutidos-charcuteria": "Wurstwaren und Charcuterie",
    "postres-chocolate": "Desserts und Schokolade",
    "cocina-asiatica-fusion": "Asiatische und Fusion-Küche",
    "tapas-aperitivos": "Tapas und Aperitifs",
  },
  pt: {
    "carnes-rojas": "Carnes vermelhas",
    "aves-caza": "Aves e caça",
    "pescados-mariscos": "Peixes e mariscos",
    quesos: "Queijos",
    "pasta-arroces-legumbres": "Massas, arroz e leguminosas",
    "verduras-vegetariana": "Legumes e cozinha vegetariana",
    "embutidos-charcuteria": "Enchidos e charcutaria",
    "postres-chocolate": "Sobremesas e chocolate",
    "cocina-asiatica-fusion": "Cozinha asiática e fusão",
    "tapas-aperitivos": "Tapas e aperitivos",
  },
};

export interface WineLibraryUiCopy {
  libraryName: string;
  knowledgeBadge: string;
  wineWord: string;
  homeTitlePrefix: string;
  homeIntro: string;
  searchPlaceholder: string;
  stats: {
    grapeVarieties: string;
    denominations: string;
    countries: string;
    wineStyles: string;
    pairingGuides: string;
    dishWineCombinations: string;
  };
  sections: {
    styles: string;
    pairings: string;
    grapes: string;
    regions: string;
    tools: string;
    faq: string;
  };
  actions: {
    viewAllStyles: string;
    viewAllPairings: string;
    exploreGrapes: string;
    exploreCountries: string;
    exploreLibrary: string;
    requestDemo: string;
    clear: string;
    filters: string;
  };
  badges: {
    variety: string;
    style: string;
    pairing: string;
    country: string;
    guide: string;
  };
  hubs: {
    grapesTitle: string;
    grapesItalic: string;
    grapesIntro: (tintas: number, blancas: number) => string;
    grapesSearch: string;
    allCountries: string;
    featuredGrapes: string;
    featuredGrapesIntro: string;
    differentialGrapes: string;
    differentialGrapesIntro: string;
    allGrapes: string;
    grapesFound: (count: number) => string;
    noGrapes: string;
    regionsTitle: string;
    regionsItalic: string;
    regionsIntro: (count: number) => string;
    regionsSearch: string;
    exploreByCountry: string;
    exploreByCountryIntro: string;
    featuredRegions: string;
    featuredRegionsIntro: string;
    stylesTitle: string;
    stylesItalic: string;
    stylesIntro: string;
    stylesSearch: string;
    styleFamily: string;
    stylesCount: (count: number) => string;
    subtypes: string;
    pairingsTitle: string;
    pairingsItalic: string;
    pairingsIntro: string;
    pairingsSearch: string;
    pairingCategory: string;
    pairingsCount: (count: number) => string;
    pairingPrinciples: string;
  };
  detail: {
    grapes: string;
    regions: string;
    styles: string;
    pairings: string;
    countries: string;
    keyRegions: string;
    keyGrapes: string;
    usualStyles: string;
    keyFacts: string;
    sensoryProfile: string;
    aromas: string;
    serviceProfile: string;
    elaboration: string;
    suggestedPairings: string;
    commonMistakes: string;
    keepExploring: string;
    relatedStyles: string;
    relatedPairings: string;
    comparableRegions: string;
    competingVarieties: string;
    wineTypes: string;
    country: string;
    type: string;
    prestige: string;
    recognition: string;
    registeredWineries: string;
    cartaVision: string;
    cartaPerception: string;
    whenItHelps: string;
    clientProfile: string;
    sellByStrategy: string;
    whenToWriteBig: string;
    cartaRole: string;
  };
  cta: {
    libraryTitle: string;
    libraryBody: string;
    grapesTitle: string;
    grapesBody: string;
    regionsTitle: string;
    regionsBody: (count?: number, country?: string) => string;
    stylesTitle: string;
    stylesBody: string;
    pairingsTitle: string;
    pairingsBody: string;
  };
  tools: {
    serviceGuide: string;
    serviceGuideDesc: string;
    glossary: string;
    glossaryDesc: string;
    byGlassCalculator: string;
    byGlassCalculatorDesc: string;
  };
}

export const wineLibraryUi: Record<WineRuntimeLang, WineLibraryUiCopy> = {
  es: {
    libraryName: "Biblioteca del Vino",
    knowledgeBadge: "Conocimiento",
    wineWord: "vino",
    homeTitlePrefix: "Biblioteca del",
    homeIntro: "Todo lo que necesitas saber sobre uvas, regiones, estilos y maridajes para ofrecer una experiencia de vino excepcional en tu restaurante.",
    searchPlaceholder: "Busca variedades, regiones, estilos, maridajes...",
    stats: {
      grapeVarieties: "variedades de uva",
      denominations: "denominaciones",
      countries: "países",
      wineStyles: "estilos de vino",
      pairingGuides: "guías de maridaje",
      dishWineCombinations: "combinaciones plato-vino",
    },
    sections: {
      styles: "Estilos de vino",
      pairings: "Maridajes",
      grapes: "Variedades de uva",
      regions: "Regiones vinícolas",
      tools: "Herramientas de consulta",
      faq: "Preguntas frecuentes",
    },
    actions: {
      viewAllStyles: "Ver todos los estilos",
      viewAllPairings: "Ver todas las guías",
      exploreGrapes: "Explorar 85 variedades",
      exploreCountries: "Explorar 41 países",
      exploreLibrary: "Explorar Biblioteca",
      requestDemo: "Solicitar demo",
      clear: "Limpiar",
      filters: "Filtros",
    },
    badges: { variety: "Variedad", style: "Estilo", pairing: "Maridaje", country: "País", guide: "Guía" },
    hubs: {
      grapesTitle: "Variedades de",
      grapesItalic: "uva",
      grapesIntro: (tintas, blancas) => `${tintas} tintas, ${blancas} blancas: cada variedad con su perfil sensorial, su rol comercial en carta y su lectura Winerim para hostelería.`,
      grapesSearch: "Buscar variedad, sinónimo o región...",
      allCountries: "Todos los países",
      featuredGrapes: "Variedades más reconocidas",
      featuredGrapesIntro: "Las variedades que todo profesional de hostelería debería dominar.",
      differentialGrapes: "Variedades diferenciales",
      differentialGrapesIntro: "Variedades que aportan criterio, descubrimiento y sofisticación a una carta.",
      allGrapes: "Todas las variedades",
      grapesFound: (count) => `${count} variedades encontradas`,
      noGrapes: "No se encontraron variedades que coincidan con los filtros.",
      regionsTitle: "Regiones vinícolas del",
      regionsItalic: "mundo",
      regionsIntro: (count) => `Denominaciones, indicaciones geográficas y regiones vinícolas de ${count} países. Con enfoque Winerim: consulta, interpretación y aplicación comercial para hostelería.`,
      regionsSearch: "Buscar país, denominación o tipo (DO, AVA...)",
      exploreByCountry: "Explora por país",
      exploreByCountryIntro: "Cada país tiene su propia arquitectura de denominaciones, estilos y regiones. Selecciona uno para explorar su mapa vinícola completo.",
      featuredRegions: "Regiones destacadas",
      featuredRegionsIntro: "Denominaciones icónicas que todo profesional de hostelería debería conocer.",
      stylesTitle: "Estilos de",
      stylesItalic: "vino",
      stylesIntro: "8 grandes familias, más de 50 subtipos. Cada estilo con su elaboración, perfil sensorial, maridajes y lectura comercial para hostelería.",
      stylesSearch: "Buscar estilo, uva o región...",
      styleFamily: "Familia de vino",
      stylesCount: (count) => `${count} estilo${count !== 1 ? "s" : ""}`,
      subtypes: "Subtipos y variantes",
      pairingsTitle: "Guía de",
      pairingsItalic: "maridajes",
      pairingsIntro: "10 categorías gastronómicas, más de 80 combinaciones plato + vino. Cada maridaje con principios, errores frecuentes y lectura comercial para hostelería.",
      pairingsSearch: "Buscar plato, uva o región...",
      pairingCategory: "Categoría gastronómica",
      pairingsCount: (count) => `${count} categoría${count !== 1 ? "s" : ""} de maridaje`,
      pairingPrinciples: "Principios universales de maridaje",
    },
    detail: {
      grapes: "Variedades",
      regions: "Regiones",
      styles: "Estilos",
      pairings: "Maridajes",
      countries: "Países",
      keyRegions: "Regiones clave",
      keyGrapes: "Uvas principales",
      usualStyles: "Estilos habituales",
      keyFacts: "Datos clave",
      sensoryProfile: "Perfil sensorial",
      aromas: "Aromas característicos",
      serviceProfile: "Servicio y perfil sensorial",
      elaboration: "Elaboración",
      suggestedPairings: "Maridajes sugeridos",
      commonMistakes: "Errores comunes",
      keepExploring: "Sigue explorando",
      relatedStyles: "Estilos relacionados",
      relatedPairings: "Maridajes relacionados",
      comparableRegions: "Regiones comparables",
      competingVarieties: "Variedades que compiten",
      wineTypes: "Tipos de vino",
      country: "País",
      type: "Tipo",
      prestige: "Prestigio",
      recognition: "Reconocimiento",
      registeredWineries: "Bodegas registradas",
      cartaVision: "Visión Winerim",
      cartaPerception: "Percepción en carta",
      whenItHelps: "Cuándo ayuda a vender",
      clientProfile: "Qué tipo de cliente la reconoce",
      sellByStrategy: "Cómo vende mejor",
      whenToWriteBig: "Cuándo escribir la uva en grande",
      cartaRole: "Rol habitual en carta",
    },
    cta: {
      libraryTitle: "¿Quieres que tu carta refleje este conocimiento?",
      libraryBody: "Winerim lleva toda esta información directamente a tu carta digital, ayudando a tus clientes a descubrir y elegir mejor.",
      grapesTitle: "Lleva este conocimiento a tu carta de vinos",
      grapesBody: "Winerim integra información de variedades, percepción comercial y maridajes directamente en tu herramienta de gestión de carta.",
      regionsTitle: "Gestiona tu carta con inteligencia regional",
      regionsBody: (count, country) => country ? `Winerim integra datos de ${count} denominaciones de ${country} para ayudarte a tomar mejores decisiones de carta.` : "Winerim integra información de regiones, denominaciones y percepción comercial directamente en tu herramienta de gestión de carta.",
      stylesTitle: "¿Quieres que tu carta refleje esta diversidad?",
      stylesBody: "Winerim organiza tu carta con criterio: estilos, temperaturas, copas y maridajes. Información útil para tu equipo y tus clientes.",
      pairingsTitle: "¿Quieres que tu carta sugiera maridajes?",
      pairingsBody: "Winerim conecta carta de vinos con platos y maridajes, ayudando a tu equipo a recomendar mejor y a tus clientes a elegir con criterio.",
    },
    tools: {
      serviceGuide: "Guía de servicio",
      serviceGuideDesc: "Temperatura, copa, ml por servicio y copas por botella para cada estilo de vino.",
      glossary: "Glosario del vino",
      glossaryDesc: "Más de 35 términos esenciales explicados con claridad para profesionales de hostelería.",
      byGlassCalculator: "Calculadora por copa",
      byGlassCalculatorDesc: "Calcula el margen y el precio óptimo de cada copa de vino en tu carta.",
    },
  },
  en: {
    libraryName: "Wine Library",
    knowledgeBadge: "Knowledge",
    wineWord: "library",
    homeTitlePrefix: "Wine",
    homeIntro: "Everything you need to understand grapes, regions, styles and pairings, built for restaurants that want a sharper wine experience.",
    searchPlaceholder: "Search grapes, regions, styles, pairings...",
    stats: {
      grapeVarieties: "grape varieties",
      denominations: "denominations",
      countries: "countries",
      wineStyles: "wine styles",
      pairingGuides: "pairing guides",
      dishWineCombinations: "dish-wine matches",
    },
    sections: {
      styles: "Wine styles",
      pairings: "Pairings",
      grapes: "Grape varieties",
      regions: "Wine regions",
      tools: "Reference tools",
      faq: "Frequently asked questions",
    },
    actions: {
      viewAllStyles: "View all styles",
      viewAllPairings: "View all guides",
      exploreGrapes: "Explore 85 varieties",
      exploreCountries: "Explore 41 countries",
      exploreLibrary: "Explore library",
      requestDemo: "Request demo",
      clear: "Clear",
      filters: "Filters",
    },
    badges: { variety: "Variety", style: "Style", pairing: "Pairing", country: "Country", guide: "Guide" },
    hubs: {
      grapesTitle: "Grape",
      grapesItalic: "varieties",
      grapesIntro: (tintas, blancas) => `${tintas} red and ${blancas} white varieties, each with sensory profile, wine-list role and Winerim commercial reading for hospitality.`,
      grapesSearch: "Search variety, synonym or region...",
      allCountries: "All countries",
      featuredGrapes: "Most recognized varieties",
      featuredGrapesIntro: "The grapes every hospitality professional should master.",
      differentialGrapes: "Differentiating varieties",
      differentialGrapesIntro: "Grapes that add expertise, discovery and sophistication to a wine list.",
      allGrapes: "All varieties",
      grapesFound: (count) => `${count} varieties found`,
      noGrapes: "No varieties match the current filters.",
      regionsTitle: "Wine regions of the",
      regionsItalic: "world",
      regionsIntro: (count) => `Denominations, geographical indications and wine regions across ${count} countries, with Winerim's commercial reading for hospitality.`,
      regionsSearch: "Search country, denomination or type (DO, AVA...)",
      exploreByCountry: "Explore by country",
      exploreByCountryIntro: "Each country has its own architecture of denominations, styles and regions. Select one to explore its wine map.",
      featuredRegions: "Featured regions",
      featuredRegionsIntro: "Iconic denominations every hospitality professional should know.",
      stylesTitle: "Wine",
      stylesItalic: "styles",
      stylesIntro: "8 major families and 50+ subtypes, each with production method, sensory profile, pairings and commercial reading.",
      stylesSearch: "Search style, grape or region...",
      styleFamily: "Wine family",
      stylesCount: (count) => `${count} style${count !== 1 ? "s" : ""}`,
      subtypes: "Subtypes and variants",
      pairingsTitle: "Pairing",
      pairingsItalic: "guide",
      pairingsIntro: "10 food categories and 80+ dish-wine matches, with principles, common mistakes and restaurant sales language.",
      pairingsSearch: "Search dish, grape or region...",
      pairingCategory: "Food category",
      pairingsCount: (count) => `${count} pairing categor${count !== 1 ? "ies" : "y"}`,
      pairingPrinciples: "Universal pairing principles",
    },
    detail: {
      grapes: "Grapes",
      regions: "Regions",
      styles: "Styles",
      pairings: "Pairings",
      countries: "Countries",
      keyRegions: "Key regions",
      keyGrapes: "Main grapes",
      usualStyles: "Usual styles",
      keyFacts: "Key facts",
      sensoryProfile: "Sensory profile",
      aromas: "Typical aromas",
      serviceProfile: "Service and sensory profile",
      elaboration: "Winemaking",
      suggestedPairings: "Suggested pairings",
      commonMistakes: "Common mistakes",
      keepExploring: "Keep exploring",
      relatedStyles: "Related styles",
      relatedPairings: "Related pairings",
      comparableRegions: "Comparable regions",
      competingVarieties: "Competing varieties",
      wineTypes: "Wine types",
      country: "Country",
      type: "Type",
      prestige: "Prestige",
      recognition: "Recognition",
      registeredWineries: "Registered wineries",
      cartaVision: "Winerim view",
      cartaPerception: "Wine-list perception",
      whenItHelps: "When it helps sell",
      clientProfile: "Guest profile",
      sellByStrategy: "Best sales angle",
      whenToWriteBig: "When to highlight the grape",
      cartaRole: "Usual role on the list",
    },
    cta: {
      libraryTitle: "Want your wine list to reflect this knowledge?",
      libraryBody: "Winerim brings this intelligence directly into your digital wine list, helping guests discover and choose better.",
      grapesTitle: "Bring grape knowledge into your wine list",
      grapesBody: "Winerim connects varieties, perception and commercial role to your wine-list management workflow.",
      regionsTitle: "Manage your list with regional intelligence",
      regionsBody: (count, country) => country ? `Winerim integrates data from ${count} denominations in ${country} to support better wine-list decisions.` : "Winerim connects regions, denominations and commercial perception directly to your wine-list workflow.",
      stylesTitle: "Want your list to show this diversity?",
      stylesBody: "Winerim organizes styles, temperatures, glassware and pairings so your team and guests can use the list better.",
      pairingsTitle: "Want your wine list to suggest pairings?",
      pairingsBody: "Winerim connects wines, dishes and pairing logic so your team can recommend better and guests can choose with confidence.",
    },
    tools: {
      serviceGuide: "Service guide",
      serviceGuideDesc: "Temperature, glassware, serving size and glasses per bottle for each wine style.",
      glossary: "Wine glossary",
      glossaryDesc: "Essential wine terms explained clearly for hospitality professionals.",
      byGlassCalculator: "By-the-glass calculator",
      byGlassCalculatorDesc: "Calculate margin and the optimal price for each glass on your list.",
    },
  },
  fr: {
    libraryName: "Bibliothèque du Vin",
    knowledgeBadge: "Connaissance",
    wineWord: "vin",
    homeTitlePrefix: "Bibliothèque du",
    homeIntro: "Tout ce qu'il faut savoir sur cépages, régions, styles et accords pour offrir une meilleure expérience vin au restaurant.",
    searchPlaceholder: "Rechercher cépages, régions, styles, accords...",
    stats: {
      grapeVarieties: "cépages",
      denominations: "appellations",
      countries: "pays",
      wineStyles: "styles de vin",
      pairingGuides: "guides d'accords",
      dishWineCombinations: "accords plat-vin",
    },
    sections: {
      styles: "Styles de vin",
      pairings: "Accords mets-vins",
      grapes: "Cépages",
      regions: "Régions viticoles",
      tools: "Outils de référence",
      faq: "Questions fréquentes",
    },
    actions: {
      viewAllStyles: "Voir tous les styles",
      viewAllPairings: "Voir tous les guides",
      exploreGrapes: "Explorer 85 cépages",
      exploreCountries: "Explorer 41 pays",
      exploreLibrary: "Explorer la bibliothèque",
      requestDemo: "Demander une démo",
      clear: "Effacer",
      filters: "Filtres",
    },
    badges: { variety: "Cépage", style: "Style", pairing: "Accord", country: "Pays", guide: "Guide" },
    hubs: {
      grapesTitle: "Cépages",
      grapesItalic: "du vin",
      grapesIntro: (tintas, blancas) => `${tintas} rouges et ${blancas} blancs, chacun avec profil sensoriel, rôle en carte et lecture commerciale Winerim.`,
      grapesSearch: "Rechercher cépage, synonyme ou région...",
      allCountries: "Tous les pays",
      featuredGrapes: "Cépages les plus reconnus",
      featuredGrapesIntro: "Les cépages que tout professionnel de la restauration devrait maîtriser.",
      differentialGrapes: "Cépages différenciants",
      differentialGrapesIntro: "Des cépages qui apportent expertise, découverte et sophistication à la carte.",
      allGrapes: "Tous les cépages",
      grapesFound: (count) => `${count} cépages trouvés`,
      noGrapes: "Aucun cépage ne correspond aux filtres.",
      regionsTitle: "Régions viticoles du",
      regionsItalic: "monde",
      regionsIntro: (count) => `Appellations, indications géographiques et régions viticoles de ${count} pays, avec lecture Winerim pour la restauration.`,
      regionsSearch: "Rechercher pays, appellation ou type (DO, AVA...)",
      exploreByCountry: "Explorer par pays",
      exploreByCountryIntro: "Chaque pays possède sa propre architecture d'appellations, de styles et de régions.",
      featuredRegions: "Régions à connaître",
      featuredRegionsIntro: "Les appellations emblématiques que tout professionnel devrait connaître.",
      stylesTitle: "Styles de",
      stylesItalic: "vin",
      stylesIntro: "8 grandes familles et plus de 50 sous-types, avec élaboration, profil sensoriel, accords et lecture commerciale.",
      stylesSearch: "Rechercher style, cépage ou région...",
      styleFamily: "Famille de vin",
      stylesCount: (count) => `${count} style${count !== 1 ? "s" : ""}`,
      subtypes: "Sous-types et variantes",
      pairingsTitle: "Guide des",
      pairingsItalic: "accords",
      pairingsIntro: "10 catégories gastronomiques et plus de 80 accords plat-vin, avec principes, erreurs fréquentes et langage de salle.",
      pairingsSearch: "Rechercher plat, cépage ou région...",
      pairingCategory: "Catégorie gastronomique",
      pairingsCount: (count) => `${count} catégorie${count !== 1 ? "s" : ""} d'accords`,
      pairingPrinciples: "Principes universels d'accords",
    },
    detail: {} as WineLibraryUiCopy["detail"],
    cta: {} as WineLibraryUiCopy["cta"],
    tools: {} as WineLibraryUiCopy["tools"],
  },
  it: {
    libraryName: "Biblioteca del Vino",
    knowledgeBadge: "Conoscenza",
    wineWord: "vino",
    homeTitlePrefix: "Biblioteca del",
    homeIntro: "Tutto quello che serve sapere su vitigni, regioni, stili e abbinamenti per migliorare l'esperienza vino al ristorante.",
    searchPlaceholder: "Cerca vitigni, regioni, stili, abbinamenti...",
    stats: {
      grapeVarieties: "vitigni",
      denominations: "denominazioni",
      countries: "paesi",
      wineStyles: "stili di vino",
      pairingGuides: "guide agli abbinamenti",
      dishWineCombinations: "abbinamenti piatto-vino",
    },
    sections: {
      styles: "Stili di vino",
      pairings: "Abbinamenti",
      grapes: "Vitigni",
      regions: "Regioni vinicole",
      tools: "Strumenti di consultazione",
      faq: "Domande frequenti",
    },
    actions: {
      viewAllStyles: "Vedi tutti gli stili",
      viewAllPairings: "Vedi tutte le guide",
      exploreGrapes: "Esplora 85 vitigni",
      exploreCountries: "Esplora 41 paesi",
      exploreLibrary: "Esplora la biblioteca",
      requestDemo: "Richiedi demo",
      clear: "Cancella",
      filters: "Filtri",
    },
    badges: { variety: "Vitigno", style: "Stile", pairing: "Abbinamento", country: "Paese", guide: "Guida" },
    hubs: {
      grapesTitle: "Vitigni del",
      grapesItalic: "vino",
      grapesIntro: (tintas, blancas) => `${tintas} rossi e ${blancas} bianchi, ciascuno con profilo sensoriale, ruolo in carta e lettura commerciale Winerim.`,
      grapesSearch: "Cerca vitigno, sinonimo o regione...",
      allCountries: "Tutti i paesi",
      featuredGrapes: "Vitigni più riconosciuti",
      featuredGrapesIntro: "I vitigni che ogni professionista della ristorazione dovrebbe conoscere.",
      differentialGrapes: "Vitigni differenzianti",
      differentialGrapesIntro: "Vitigni che portano competenza, scoperta e sofisticazione alla carta.",
      allGrapes: "Tutti i vitigni",
      grapesFound: (count) => `${count} vitigni trovati`,
      noGrapes: "Nessun vitigno corrisponde ai filtri.",
      regionsTitle: "Regioni vinicole del",
      regionsItalic: "mondo",
      regionsIntro: (count) => `Denominazioni, indicazioni geografiche e regioni vinicole di ${count} paesi, con lettura Winerim per la ristorazione.`,
      regionsSearch: "Cerca paese, denominazione o tipo (DO, AVA...)",
      exploreByCountry: "Esplora per paese",
      exploreByCountryIntro: "Ogni paese ha una propria architettura di denominazioni, stili e regioni.",
      featuredRegions: "Regioni in evidenza",
      featuredRegionsIntro: "Denominazioni iconiche che ogni professionista dovrebbe conoscere.",
      stylesTitle: "Stili di",
      stylesItalic: "vino",
      stylesIntro: "8 grandi famiglie e oltre 50 sottotipi, con elaborazione, profilo sensoriale, abbinamenti e lettura commerciale.",
      stylesSearch: "Cerca stile, vitigno o regione...",
      styleFamily: "Famiglia di vino",
      stylesCount: (count) => `${count} stil${count !== 1 ? "i" : "e"}`,
      subtypes: "Sottotipi e varianti",
      pairingsTitle: "Guida agli",
      pairingsItalic: "abbinamenti",
      pairingsIntro: "10 categorie gastronomiche e oltre 80 combinazioni piatto-vino, con principi, errori frequenti e linguaggio di sala.",
      pairingsSearch: "Cerca piatto, vitigno o regione...",
      pairingCategory: "Categoria gastronomica",
      pairingsCount: (count) => `${count} categorie di abbinamento`,
      pairingPrinciples: "Principi universali di abbinamento",
    },
    detail: {} as WineLibraryUiCopy["detail"],
    cta: {} as WineLibraryUiCopy["cta"],
    tools: {} as WineLibraryUiCopy["tools"],
  },
  de: {} as WineLibraryUiCopy,
  pt: {} as WineLibraryUiCopy,
};

wineLibraryUi.fr.detail = {
  grapes: "Cépages",
  regions: "Régions",
  styles: "Styles",
  pairings: "Accords",
  countries: "Pays",
  keyRegions: "Régions clés",
  keyGrapes: "Cépages principaux",
  usualStyles: "Styles habituels",
  keyFacts: "Données clés",
  sensoryProfile: "Profil sensoriel",
  aromas: "Arômes caractéristiques",
  serviceProfile: "Service et profil sensoriel",
  elaboration: "Élaboration",
  suggestedPairings: "Accords suggérés",
  commonMistakes: "Erreurs fréquentes",
  keepExploring: "Continuer l'exploration",
  relatedStyles: "Styles liés",
  relatedPairings: "Accords liés",
  comparableRegions: "Régions comparables",
  competingVarieties: "Cépages concurrents",
  wineTypes: "Types de vin",
  country: "Pays",
  type: "Type",
  prestige: "Prestige",
  recognition: "Reconnaissance",
  registeredWineries: "Domaines enregistrés",
  cartaVision: "Lecture Winerim",
  cartaPerception: "Perception en carte",
  whenItHelps: "Quand cela aide à vendre",
  clientProfile: "Profil client",
  sellByStrategy: "Meilleur angle de vente",
  whenToWriteBig: "Quand mettre le cépage en avant",
  cartaRole: "Rôle habituel en carte",
};
wineLibraryUi.fr.cta = {
  libraryTitle: "Vous voulez que votre carte reflète ce savoir ?",
  libraryBody: "Winerim apporte cette intelligence directement dans votre carte digitale pour aider les clients à découvrir et mieux choisir.",
  grapesTitle: "Intégrez la connaissance des cépages à votre carte",
  grapesBody: "Winerim relie cépages, perception commerciale et accords à votre outil de gestion de carte.",
  regionsTitle: "Gérez votre carte avec une lecture régionale",
  regionsBody: (count, country) => country ? `Winerim intègre les données de ${count} appellations de ${country} pour mieux décider votre carte.` : "Winerim relie régions, appellations et perception commerciale à votre gestion de carte.",
  stylesTitle: "Vous voulez montrer cette diversité dans votre carte ?",
  stylesBody: "Winerim organise styles, températures, verres et accords pour votre équipe et vos clients.",
  pairingsTitle: "Vous voulez que votre carte suggère des accords ?",
  pairingsBody: "Winerim connecte vins, plats et logique d'accords pour améliorer les recommandations en salle.",
};
wineLibraryUi.fr.tools = {
  serviceGuide: "Guide de service",
  serviceGuideDesc: "Température, verrerie, volume de service et verres par bouteille pour chaque style.",
  glossary: "Glossaire du vin",
  glossaryDesc: "Les termes essentiels du vin expliqués clairement pour les professionnels de la restauration.",
  byGlassCalculator: "Calculateur au verre",
  byGlassCalculatorDesc: "Calculez la marge et le prix optimal de chaque verre de vin.",
};
wineLibraryUi.it.detail = {
  grapes: "Vitigni",
  regions: "Regioni",
  styles: "Stili",
  pairings: "Abbinamenti",
  countries: "Paesi",
  keyRegions: "Regioni chiave",
  keyGrapes: "Vitigni principali",
  usualStyles: "Stili abituali",
  keyFacts: "Dati chiave",
  sensoryProfile: "Profilo sensoriale",
  aromas: "Aromi caratteristici",
  serviceProfile: "Servizio e profilo sensoriale",
  elaboration: "Elaborazione",
  suggestedPairings: "Abbinamenti suggeriti",
  commonMistakes: "Errori frequenti",
  keepExploring: "Continua a esplorare",
  relatedStyles: "Stili correlati",
  relatedPairings: "Abbinamenti correlati",
  comparableRegions: "Regioni comparabili",
  competingVarieties: "Vitigni concorrenti",
  wineTypes: "Tipi di vino",
  country: "Paese",
  type: "Tipo",
  prestige: "Prestigio",
  recognition: "Riconoscimento",
  registeredWineries: "Cantine registrate",
  cartaVision: "Lettura Winerim",
  cartaPerception: "Percezione in carta",
  whenItHelps: "Quando aiuta a vendere",
  clientProfile: "Profilo cliente",
  sellByStrategy: "Miglior angolo di vendita",
  whenToWriteBig: "Quando mettere in evidenza il vitigno",
  cartaRole: "Ruolo abituale in carta",
};
wineLibraryUi.it.cta = {
  libraryTitle: "Vuoi che la tua carta rifletta questa conoscenza?",
  libraryBody: "Winerim porta questa intelligenza direttamente nella tua carta digitale, aiutando i clienti a scoprire e scegliere meglio.",
  grapesTitle: "Porta la conoscenza dei vitigni nella tua carta",
  grapesBody: "Winerim collega vitigni, percezione commerciale e abbinamenti al tuo flusso di gestione della carta.",
  regionsTitle: "Gestisci la carta con intelligenza regionale",
  regionsBody: (count, country) => country ? `Winerim integra dati di ${count} denominazioni di ${country} per supportare decisioni migliori in carta.` : "Winerim collega regioni, denominazioni e percezione commerciale al tuo flusso di gestione della carta.",
  stylesTitle: "Vuoi mostrare questa diversità nella carta?",
  stylesBody: "Winerim organizza stili, temperature, calici e abbinamenti per il team e per i clienti.",
  pairingsTitle: "Vuoi che la tua carta suggerisca abbinamenti?",
  pairingsBody: "Winerim collega vini, piatti e logica di abbinamento per raccomandazioni migliori in sala.",
};
wineLibraryUi.it.tools = {
  serviceGuide: "Guida di servizio",
  serviceGuideDesc: "Temperatura, calice, quantità di servizio e bicchieri per bottiglia per ogni stile.",
  glossary: "Glossario del vino",
  glossaryDesc: "Termini essenziali del vino spiegati con chiarezza per i professionisti della ristorazione.",
  byGlassCalculator: "Calcolatrice al calice",
  byGlassCalculatorDesc: "Calcola margine e prezzo ottimale di ogni calice in carta.",
};
wineLibraryUi.de = {
  ...wineLibraryUi.en,
  libraryName: "Weinbibliothek",
  knowledgeBadge: "Wissen",
  wineWord: "Bibliothek",
  homeTitlePrefix: "Wein",
  homeIntro: "Alles, was Restaurants über Rebsorten, Regionen, Weinstile und Pairings wissen müssen, um eine bessere Weinerfahrung zu bieten.",
  searchPlaceholder: "Rebsorten, Regionen, Stile, Pairings suchen...",
  stats: {
    grapeVarieties: "Rebsorten",
    denominations: "Herkunftsbezeichnungen",
    countries: "Länder",
    wineStyles: "Weinstile",
    pairingGuides: "Pairing-Leitfäden",
    dishWineCombinations: "Gericht-Wein-Kombinationen",
  },
  sections: {
    styles: "Weinstile",
    pairings: "Weinbegleitung",
    grapes: "Rebsorten",
    regions: "Weinregionen",
    tools: "Nachschlagewerkzeuge",
    faq: "Häufige Fragen",
  },
  actions: {
    viewAllStyles: "Alle Stile ansehen",
    viewAllPairings: "Alle Leitfäden ansehen",
    exploreGrapes: "85 Rebsorten entdecken",
    exploreCountries: "41 Länder entdecken",
    exploreLibrary: "Bibliothek erkunden",
    requestDemo: "Demo anfragen",
    clear: "Zurücksetzen",
    filters: "Filter",
  },
  badges: { variety: "Rebsorte", style: "Stil", pairing: "Pairing", country: "Land", guide: "Leitfaden" },
  hubs: {
    grapesTitle: "Wein",
    grapesItalic: "rebsorten",
    grapesIntro: (tintas, blancas) => `${tintas} rote und ${blancas} weiße Sorten, jeweils mit sensorischem Profil, Rolle auf der Karte und kommerzieller Winerim-Lesart.`,
    grapesSearch: "Rebsorte, Synonym oder Region suchen...",
    allCountries: "Alle Länder",
    featuredGrapes: "Bekannteste Rebsorten",
    featuredGrapesIntro: "Rebsorten, die jedes professionelle Serviceteam beherrschen sollte.",
    differentialGrapes: "Differenzierende Rebsorten",
    differentialGrapesIntro: "Sorten, die Fachlichkeit, Entdeckung und Profil in die Weinkarte bringen.",
    allGrapes: "Alle Rebsorten",
    grapesFound: (count) => `${count} Rebsorten gefunden`,
    noGrapes: "Keine Rebsorten entsprechen den aktuellen Filtern.",
    regionsTitle: "Weinregionen der",
    regionsItalic: "Welt",
    regionsIntro: (count) => `Herkunftsbezeichnungen, geografische Angaben und Weinregionen aus ${count} Ländern mit Winerim-Lesart für die Gastronomie.`,
    regionsSearch: "Land, Herkunftsbezeichnung oder Typ suchen (DO, AVA...)",
    exploreByCountry: "Nach Land entdecken",
    exploreByCountryIntro: "Jedes Land hat eine eigene Struktur aus Herkunftsbezeichnungen, Stilen und Regionen. Wähle ein Land, um die Weinlandschaft zu erkunden.",
    featuredRegions: "Ausgewählte Regionen",
    featuredRegionsIntro: "Ikonische Herkunftsbezeichnungen, die jedes professionelle Serviceteam kennen sollte.",
    stylesTitle: "Wein",
    stylesItalic: "stile",
    stylesIntro: "8 große Familien und mehr als 50 Subtypen, jeweils mit Herstellung, Sensorik, Pairings und kommerzieller Lesart.",
    stylesSearch: "Stil, Rebsorte oder Region suchen...",
    styleFamily: "Weinfamilie",
    stylesCount: (count) => `${count} Stil${count !== 1 ? "e" : ""}`,
    subtypes: "Subtypen und Varianten",
    pairingsTitle: "Leitfaden für",
    pairingsItalic: "Weinbegleitung",
    pairingsIntro: "10 gastronomische Kategorien und mehr als 80 Gericht-Wein-Kombinationen mit Prinzipien, häufigen Fehlern und Sprache für den Service.",
    pairingsSearch: "Gericht, Rebsorte oder Region suchen...",
    pairingCategory: "Gastronomische Kategorie",
    pairingsCount: (count) => `${count} Pairing-Kategorie${count !== 1 ? "n" : ""}`,
    pairingPrinciples: "Universelle Pairing-Prinzipien",
  },
  detail: {
    grapes: "Rebsorten",
    regions: "Regionen",
    styles: "Stile",
    pairings: "Pairings",
    countries: "Länder",
    keyRegions: "Schlüsselregionen",
    keyGrapes: "Wichtige Rebsorten",
    usualStyles: "Typische Stile",
    keyFacts: "Kerninformationen",
    sensoryProfile: "Sensorisches Profil",
    aromas: "Typische Aromen",
    serviceProfile: "Service und Sensorik",
    elaboration: "Herstellung",
    suggestedPairings: "Empfohlene Pairings",
    commonMistakes: "Häufige Fehler",
    keepExploring: "Weiter erkunden",
    relatedStyles: "Verwandte Stile",
    relatedPairings: "Verwandte Pairings",
    comparableRegions: "Vergleichbare Regionen",
    competingVarieties: "Konkurrierende Rebsorten",
    wineTypes: "Weintypen",
    country: "Land",
    type: "Typ",
    prestige: "Prestige",
    recognition: "Bekanntheit",
    registeredWineries: "Registrierte Weingüter",
    cartaVision: "Winerim-Lesart",
    cartaPerception: "Wahrnehmung auf der Karte",
    whenItHelps: "Wann es beim Verkauf hilft",
    clientProfile: "Gästetyp",
    sellByStrategy: "Bester Verkaufswinkel",
    whenToWriteBig: "Wann die Rebsorte hervorgehoben werden sollte",
    cartaRole: "Übliche Rolle auf der Karte",
  },
  cta: {
    libraryTitle: "Soll Ihre Weinkarte dieses Wissen sichtbar machen?",
    libraryBody: "Winerim bringt diese Informationen direkt in Ihre digitale Weinkarte und hilft Gästen, besser zu entdecken und zu wählen.",
    grapesTitle: "Rebsortenwissen in die Weinkarte bringen",
    grapesBody: "Winerim verbindet Rebsorten, Wahrnehmung und kommerzielle Rolle mit Ihrem Weinkarten-Workflow.",
    regionsTitle: "Weinkarte mit regionaler Intelligenz steuern",
    regionsBody: (count, country) => country ? `Winerim integriert Daten aus ${count} Herkunftsbezeichnungen in ${country}, um bessere Kartenentscheidungen zu unterstützen.` : "Winerim verbindet Regionen, Herkunftsbezeichnungen und kommerzielle Wahrnehmung direkt mit Ihrem Weinkarten-Workflow.",
    stylesTitle: "Soll Ihre Karte diese Vielfalt zeigen?",
    stylesBody: "Winerim strukturiert Stile, Temperaturen, Gläser und Pairings, damit Team und Gäste die Karte besser nutzen.",
    pairingsTitle: "Soll Ihre Weinkarte passende Pairings vorschlagen?",
    pairingsBody: "Winerim verbindet Weine, Gerichte und Pairing-Logik, damit das Team besser empfiehlt und Gäste sicherer wählen.",
  },
  tools: {
    serviceGuide: "Service-Leitfaden",
    serviceGuideDesc: "Temperatur, Glas, Ausschankmenge und Gläser pro Flasche für jeden Weinstil.",
    glossary: "Weinglossar",
    glossaryDesc: "Wichtige Weinbegriffe klar erklärt für Gastronomieprofis.",
    byGlassCalculator: "Rechner für Wein im Ausschank",
    byGlassCalculatorDesc: "Berechnen Sie Marge und optimalen Preis pro Glas auf Ihrer Karte.",
  },
};
wineLibraryUi.pt = {
  ...wineLibraryUi.en,
  libraryName: "Biblioteca do Vinho",
  knowledgeBadge: "Conhecimento",
  wineWord: "vinho",
  homeTitlePrefix: "Biblioteca do",
  homeIntro: "Tudo o que precisa de saber sobre castas, regiões, estilos e harmonizações para oferecer uma melhor experiência de vinho no restaurante.",
  searchPlaceholder: "Pesquisar castas, regiões, estilos, harmonizações...",
  stats: {
    grapeVarieties: "castas",
    denominations: "denominações",
    countries: "países",
    wineStyles: "estilos de vinho",
    pairingGuides: "guias de harmonização",
    dishWineCombinations: "combinações prato-vinho",
  },
  sections: {
    styles: "Estilos de vinho",
    pairings: "Harmonizações",
    grapes: "Castas",
    regions: "Regiões vitivinícolas",
    tools: "Ferramentas de consulta",
    faq: "Perguntas frequentes",
  },
  actions: {
    viewAllStyles: "Ver todos os estilos",
    viewAllPairings: "Ver todos os guias",
    exploreGrapes: "Explorar 85 castas",
    exploreCountries: "Explorar 41 países",
    exploreLibrary: "Explorar biblioteca",
    requestDemo: "Pedir demo",
    clear: "Limpar",
    filters: "Filtros",
  },
  badges: { variety: "Casta", style: "Estilo", pairing: "Harmonização", country: "País", guide: "Guia" },
  hubs: {
    grapesTitle: "Castas do",
    grapesItalic: "vinho",
    grapesIntro: (tintas, blancas) => `${tintas} tintas e ${blancas} brancas, cada uma com perfil sensorial, papel na carta e leitura comercial Winerim.`,
    grapesSearch: "Pesquisar casta, sinónimo ou região...",
    allCountries: "Todos os países",
    featuredGrapes: "Castas mais reconhecidas",
    featuredGrapesIntro: "As castas que qualquer profissional de restauração deve dominar.",
    differentialGrapes: "Castas diferenciadoras",
    differentialGrapesIntro: "Castas que trazem critério, descoberta e sofisticação à carta.",
    allGrapes: "Todas as castas",
    grapesFound: (count) => `${count} castas encontradas`,
    noGrapes: "Nenhuma casta corresponde aos filtros atuais.",
    regionsTitle: "Regiões vitivinícolas do",
    regionsItalic: "mundo",
    regionsIntro: (count) => `Denominações, indicações geográficas e regiões vitivinícolas de ${count} países, com leitura Winerim para restauração.`,
    regionsSearch: "Pesquisar país, denominação ou tipo (DO, AVA...)",
    exploreByCountry: "Explorar por país",
    exploreByCountryIntro: "Cada país tem a sua própria arquitetura de denominações, estilos e regiões. Selecione um para explorar o mapa vitivinícola.",
    featuredRegions: "Regiões em destaque",
    featuredRegionsIntro: "Denominações icónicas que qualquer profissional de restauração deve conhecer.",
    stylesTitle: "Estilos de",
    stylesItalic: "vinho",
    stylesIntro: "8 grandes famílias e mais de 50 subtipos, com elaboração, perfil sensorial, harmonizações e leitura comercial.",
    stylesSearch: "Pesquisar estilo, casta ou região...",
    styleFamily: "Família de vinho",
    stylesCount: (count) => `${count} estilo${count !== 1 ? "s" : ""}`,
    subtypes: "Subtipos e variantes",
    pairingsTitle: "Guia de",
    pairingsItalic: "harmonizações",
    pairingsIntro: "10 categorias gastronómicas e mais de 80 combinações prato-vinho, com princípios, erros frequentes e linguagem de sala.",
    pairingsSearch: "Pesquisar prato, casta ou região...",
    pairingCategory: "Categoria gastronómica",
    pairingsCount: (count) => `${count} categoria${count !== 1 ? "s" : ""} de harmonização`,
    pairingPrinciples: "Princípios universais de harmonização",
  },
  detail: {
    grapes: "Castas",
    regions: "Regiões",
    styles: "Estilos",
    pairings: "Harmonizações",
    countries: "Países",
    keyRegions: "Regiões-chave",
    keyGrapes: "Castas principais",
    usualStyles: "Estilos habituais",
    keyFacts: "Dados-chave",
    sensoryProfile: "Perfil sensorial",
    aromas: "Aromas característicos",
    serviceProfile: "Serviço e perfil sensorial",
    elaboration: "Elaboração",
    suggestedPairings: "Harmonizações sugeridas",
    commonMistakes: "Erros frequentes",
    keepExploring: "Continuar a explorar",
    relatedStyles: "Estilos relacionados",
    relatedPairings: "Harmonizações relacionadas",
    comparableRegions: "Regiões comparáveis",
    competingVarieties: "Castas concorrentes",
    wineTypes: "Tipos de vinho",
    country: "País",
    type: "Tipo",
    prestige: "Prestígio",
    recognition: "Reconhecimento",
    registeredWineries: "Adegas registadas",
    cartaVision: "Leitura Winerim",
    cartaPerception: "Perceção na carta",
    whenItHelps: "Quando ajuda a vender",
    clientProfile: "Perfil de cliente",
    sellByStrategy: "Melhor ângulo de venda",
    whenToWriteBig: "Quando destacar a casta",
    cartaRole: "Papel habitual na carta",
  },
  cta: {
    libraryTitle: "Quer que a sua carta reflita este conhecimento?",
    libraryBody: "A Winerim leva esta inteligência diretamente para a sua carta digital, ajudando os clientes a descobrir e escolher melhor.",
    grapesTitle: "Leve o conhecimento das castas para a sua carta",
    grapesBody: "A Winerim liga castas, perceção comercial e harmonizações ao fluxo de gestão da sua carta.",
    regionsTitle: "Gerir a carta com inteligência regional",
    regionsBody: (count, country) => country ? `A Winerim integra dados de ${count} denominações em ${country} para apoiar melhores decisões de carta.` : "A Winerim liga regiões, denominações e perceção comercial diretamente ao fluxo de gestão da carta.",
    stylesTitle: "Quer que a sua carta mostre esta diversidade?",
    stylesBody: "A Winerim organiza estilos, temperaturas, copos e harmonizações para a equipa e para os clientes.",
    pairingsTitle: "Quer que a sua carta sugira harmonizações?",
    pairingsBody: "A Winerim liga vinhos, pratos e lógica de harmonização para melhores recomendações em sala.",
  },
  tools: {
    serviceGuide: "Guia de serviço",
    serviceGuideDesc: "Temperatura, copo, volume de serviço e copos por garrafa para cada estilo.",
    glossary: "Glossário do vinho",
    glossaryDesc: "Termos essenciais do vinho explicados com clareza para profissionais de restauração.",
    byGlassCalculator: "Calculadora por copo",
    byGlassCalculatorDesc: "Calcule a margem e o preço ideal de cada copo na carta.",
  },
};

export const getWineLibraryUi = (lang?: string): WineLibraryUiCopy =>
  wineLibraryUi[resolveWineLang(lang)];
