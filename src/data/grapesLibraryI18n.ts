import { grapeCatalog, grapeEntries, getCatalogEntry } from "./grapesLibrary";
import type { GrapeEntry, GrapeCatalogEntry } from "./grapesLibrary";

// ============================================================
// Grape Library i18n Overlays
// Auto-generated from Supabase SEO pages - 2026-05-21
// 37 grapes × 5 languages (EN, FR, IT, DE, PT)
// Spanish is the base language in grapesLibrary.ts
// ============================================================

export type GrapeI18nOverlay = {
  tastingNotes?: string;
  description?: string;
  intro?: string;
  cartaPerception?: string;
  whenItHelps?: string;
  clientProfile?: string;
  sellByStrategy?: string;
  whenToWriteBig?: string;
  aromas?: string[];
  commonMistakes?: string[];
  pairings?: string[];
  faqs?: { q: string; a: string }[];
  seo?: { title?: string; description?: string };
};

export type GrapeCatalogI18nOverlay = {
  tastingNotes?: string;
};

type LangOverlays = Record<string, GrapeI18nOverlay>;
type CatalogLangOverlays = Record<string, GrapeCatalogI18nOverlay>;

export const grapeOverlays: Record<string, LangOverlays> = {
  "aglianico": {
    en: {
      tastingNotes: "Everything you need to know to include Aglianico on your wine list",
      description: "Discover everything about the Aglianico grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["black plum", "leather", "tobacco", "spices"],
      pairings: ["lamb", "ragù", "aged cheeses"],
      seo: { title: "Aglianico | Grape guide — Winerim", description: "Discover everything about the Aglianico grape: aromas, food pairings, regions and tips for restaurants. Complete Aglianico guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Aglianico dans votre carte des vins",
      description: "Découvrez tout sur le cépage Aglianico : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["prune noire", "cuir", "tabac", "épices"],
      pairings: ["agneau", "ragù", "fromages affinés"],
      seo: { title: "Aglianico | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Aglianico : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Aglianico nella tua carta dei vini",
      description: "Scopri tutto sull'uva Aglianico: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["prugna nera", "cuoio", "tabacco", "spezie"],
      pairings: ["agnello", "ragù", "formaggi stagionati"],
      seo: { title: "Aglianico | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Aglianico: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Aglianico auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Aglianico: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["schwarze Pflaume", "Leder", "Tabak", "Gewürze"],
      pairings: ["Lamm", "Ragù", "gereifter Käse"],
      seo: { title: "Aglianico | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Aglianico: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Aglianico na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Aglianico: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["ameixa preta", "couro", "tabaco", "especiarias"],
      pairings: ["borrego", "ragù", "queijos curados"],
      seo: { title: "Aglianico | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Aglianico: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "albarino": {
    en: {
      tastingNotes: "Everything you need to know to include Albariño on your wine list",
      description: "Discover everything about the Albariño grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["peach", "citrus", "white flowers", "salinity"],
      pairings: ["seafood", "octopus", "ceviche", "sushi"],
      seo: { title: "Albariño | Grape guide — Winerim", description: "Discover everything about the Albariño grape: aromas, food pairings, regions and tips for restaurants. Complete Albariño guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Albariño dans votre carte des vins",
      description: "Découvrez tout sur le cépage Albariño : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["pêche", "agrumes", "fleurs blanches", "salinité"],
      pairings: ["fruits de mer", "poulpe", "ceviche", "sushi"],
      seo: { title: "Albariño | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Albariño : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Albariño nella tua carta dei vini",
      description: "Scopri tutto sull'uva Albariño: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["pesca", "agrumi", "fiori bianchi", "sapidità"],
      pairings: ["frutti di mare", "polpo", "ceviche", "sushi"],
      seo: { title: "Albariño | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Albariño: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Albariño auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Albariño: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Pfirsich", "Zitrus", "weiße Blüten", "Salzigkeit"],
      pairings: ["Meeresfrüchte", "Oktopus", "Ceviche", "Sushi"],
      seo: { title: "Albariño | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Albariño: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Albariño na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Albariño: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["pêssego", "citrinos", "flores brancas", "salinidade"],
      pairings: ["marisco", "polvo", "ceviche", "sushi"],
      seo: { title: "Albariño | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Albariño: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "barbera": {
    en: {
      tastingNotes: "Everything you need to know to include Barbera on your wine list",
      description: "Discover everything about the Barbera grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["cherry", "plum", "violet", "spice"],
      pairings: ["pasta", "pizza", "grilled meats", "truffle"],
      seo: { title: "Barbera | Grape guide — Winerim", description: "Discover everything about the Barbera grape: aromas, food pairings, regions and tips for restaurants. Complete Barbera guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Barbera dans votre carte des vins",
      description: "Découvrez tout sur le cépage Barbera : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["cerise", "prune", "violette", "épice"],
      pairings: ["pâtes", "pizza", "viandes grillées", "truffe"],
      seo: { title: "Barbera | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Barbera : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Barbera nella tua carta dei vini",
      description: "Scopri tutto sull'uva Barbera: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["ciliegia", "prugna", "violetta", "spezia"],
      pairings: ["pasta", "pizza", "carne alla griglia", "tartufo"],
      seo: { title: "Barbera | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Barbera: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Barbera auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Barbera: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Kirsche", "Pflaume", "Veilchen", "Gewürz"],
      pairings: ["Pasta", "Pizza", "Grillgerichte", "Trüffel"],
      seo: { title: "Barbera | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Barbera: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Barbera na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Barbera: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["cereja", "ameixa", "violeta", "especiaria"],
      pairings: ["massa", "pizza", "carnes grelhadas", "trufa"],
      seo: { title: "Barbera | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Barbera: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "cabernet-franc": {
    en: {
      tastingNotes: "Everything you need to know to include Cabernet Franc on your wine list",
      description: "Discover everything about the Cabernet Franc grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["raspberry", "green pepper", "violet", "graphite"],
      pairings: ["poultry", "goat cheese", "grilled vegetables"],
      seo: { title: "Cabernet Franc | Grape guide — Winerim", description: "Discover everything about the Cabernet Franc grape: aromas, food pairings, regions and tips for restaurants. Complete Cabernet Franc guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Cabernet Franc dans votre carte des vins",
      description: "Découvrez tout sur le cépage Cabernet Franc : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["framboise", "poivron vert", "violette", "graphite"],
      pairings: ["volaille", "fromage de chèvre", "légumes grillés"],
      seo: { title: "Cabernet Franc | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Cabernet Franc : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Cabernet Franc nella tua carta dei vini",
      description: "Scopri tutto sull'uva Cabernet Franc: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["lampone", "peperone verde", "violetta", "grafite"],
      pairings: ["pollame", "formaggio di capra", "verdure grigliate"],
      seo: { title: "Cabernet Franc | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Cabernet Franc: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Cabernet Franc auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Cabernet Franc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Himbeere", "grüner Pfeffer", "Veilchen", "Graphit"],
      pairings: ["Geflügel", "Ziegenkäse", "gegrilltes Gemüse"],
      seo: { title: "Cabernet Franc | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Cabernet Franc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Cabernet Franc na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Cabernet Franc: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["framboesa", "pimento verde", "violeta", "grafite"],
      pairings: ["aves", "queijo de cabra", "legumes grelhados"],
      seo: { title: "Cabernet Franc | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Cabernet Franc: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "cabernet-sauvignon": {
    en: {
      tastingNotes: "Everything you need to know to include Cabernet Sauvignon on your wine list",
      description: "Discover everything about the Cabernet Sauvignon grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["blackcurrant", "cedar", "tobacco", "graphite"],
      pairings: ["red meats", "lamb", "aged cheeses", "stews"],
      seo: { title: "Cabernet Sauvignon | Grape guide — Winerim", description: "Discover everything about the Cabernet Sauvignon grape: aromas, food pairings, regions and tips for restaurants. Complete Cabernet Sauvignon guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Cabernet Sauvignon dans votre carte des vins",
      description: "Découvrez tout sur le cépage Cabernet Sauvignon : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["cassis", "cèdre", "tabac", "graphite"],
      pairings: ["viandes rouges", "agneau", "fromages affinés", "ragoûts"],
      seo: { title: "Cabernet Sauvignon | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Cabernet Sauvignon : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Cabernet Sauvignon nella tua carta dei vini",
      description: "Scopri tutto sull'uva Cabernet Sauvignon: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["ribes nero", "cedro", "tabacco", "grafite"],
      pairings: ["carni rosse", "agnello", "formaggi stagionati", "stufati"],
      seo: { title: "Cabernet Sauvignon | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Cabernet Sauvignon: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Cabernet Sauvignon auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Cabernet Sauvignon: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["schwarze Johannisbeere", "Zeder", "Tabak", "Graphit"],
      pairings: ["rotes Fleisch", "Lamm", "gereifter Käse", "Eintöpfe"],
      seo: { title: "Cabernet Sauvignon | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Cabernet Sauvignon: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Cabernet Sauvignon na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Cabernet Sauvignon: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["groselha preta", "cedro", "tabaco", "grafite"],
      pairings: ["carnes vermelhas", "borrego", "queijos curados", "ensopados"],
      seo: { title: "Cabernet Sauvignon | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Cabernet Sauvignon: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "carmenere": {
    en: {
      tastingNotes: "Everything you need to know to include Carménère on your wine list",
      description: "Discover everything about the Carménère grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["red pepper", "dark berries", "chocolate", "spice"],
      pairings: ["grilled meats", "empanadas", "spicy dishes"],
      seo: { title: "Carménère | Grape guide — Winerim", description: "Discover everything about the Carménère grape: aromas, food pairings, regions and tips for restaurants. Complete Carménère guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Carménère dans votre carte des vins",
      description: "Découvrez tout sur le cépage Carménère : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["poivron rouge", "baies noires", "chocolat", "épice"],
      pairings: ["viandes grillées", "empanadas", "plats épicés"],
      seo: { title: "Carménère | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Carménère : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Carménère nella tua carta dei vini",
      description: "Scopri tutto sull'uva Carménère: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["peperone rosso", "frutti di bosco scuri", "cioccolato", "spezia"],
      pairings: ["carne alla griglia", "empanadas", "piatti speziati"],
      seo: { title: "Carménère | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Carménère: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Carménère auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Carménère: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["roter Pfeffer", "dunkle Beeren", "Schokolade", "Gewürz"],
      pairings: ["Grillgerichte", "Empanadas", "würzige Gerichte"],
      seo: { title: "Carménère | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Carménère: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Carménère na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Carménère: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["pimento vermelho", "frutos escuros", "chocolate", "especiaria"],
      pairings: ["carnes grelhadas", "empanadas", "pratos picantes"],
      seo: { title: "Carménère | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Carménère: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "chardonnay": {
    en: {
      tastingNotes: "Everything you need to know to include Chardonnay on your wine list",
      description: "Discover everything about the Chardonnay grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["apple", "butter", "vanilla", "citrus"],
      pairings: ["lobster", "roasted chicken", "creamy pasta", "soft cheeses"],
      seo: { title: "Chardonnay | Grape guide — Winerim", description: "Discover everything about the Chardonnay grape: aromas, food pairings, regions and tips for restaurants. Complete Chardonnay guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Chardonnay dans votre carte des vins",
      description: "Découvrez tout sur le cépage Chardonnay : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["pomme", "beurre", "vanille", "agrumes"],
      pairings: ["homard", "poulet rôti", "pâtes à la crème", "fromages à pâte molle"],
      seo: { title: "Chardonnay | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Chardonnay : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Chardonnay nella tua carta dei vini",
      description: "Scopri tutto sull'uva Chardonnay: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mela", "burro", "vaniglia", "agrumi"],
      pairings: ["astice", "pollo arrosto", "pasta alla panna", "formaggi molli"],
      seo: { title: "Chardonnay | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Chardonnay: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Chardonnay auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Chardonnay: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Apfel", "Butter", "Vanille", "Zitrus"],
      pairings: ["Hummer", "Brathähnchen", "cremige Pasta", "Weichkäse"],
      seo: { title: "Chardonnay | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Chardonnay: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Chardonnay na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Chardonnay: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["maçã", "manteiga", "baunilha", "citrinos"],
      pairings: ["lagosta", "frango assado", "massa cremosa", "queijos frescos"],
      seo: { title: "Chardonnay | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Chardonnay: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "chenin-blanc": {
    en: {
      tastingNotes: "Everything you need to know to include Chenin Blanc on your wine list",
      description: "Discover everything about the Chenin Blanc grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["quince", "honey", "acacia", "green apple"],
      pairings: ["foie gras", "Asian cuisine", "goat cheese", "fruit desserts"],
      seo: { title: "Chenin Blanc | Grape guide — Winerim", description: "Discover everything about the Chenin Blanc grape: aromas, food pairings, regions and tips for restaurants. Complete Chenin Blanc guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Chenin Blanc dans votre carte des vins",
      description: "Découvrez tout sur le cépage Chenin Blanc : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["coing", "miel", "acacia", "pomme verte"],
      pairings: ["foie gras", "cuisine asiatique", "fromage de chèvre", "desserts aux fruits"],
      seo: { title: "Chenin Blanc | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Chenin Blanc : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Chenin Blanc nella tua carta dei vini",
      description: "Scopri tutto sull'uva Chenin Blanc: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mela cotogna", "miele", "acacia", "mela verde"],
      pairings: ["foie gras", "cucina asiatica", "formaggio di capra", "dolci alla frutta"],
      seo: { title: "Chenin Blanc | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Chenin Blanc: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Chenin Blanc auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Chenin Blanc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Quitte", "Honig", "Akazie", "grüner Apfel"],
      pairings: ["Foie gras", "asiatische Küche", "Ziegenkäse", "Fruchtdesserts"],
      seo: { title: "Chenin Blanc | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Chenin Blanc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Chenin Blanc na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Chenin Blanc: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["marmelo", "mel", "acácia", "maçã verde"],
      pairings: ["foie gras", "cozinha asiática", "queijo de cabra", "sobremesas de fruta"],
      seo: { title: "Chenin Blanc | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Chenin Blanc: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "gamay": {
    en: {
      tastingNotes: "Everything you need to know to include Gamay on your wine list",
      description: "Discover everything about the Gamay grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["raspberry", "cherry", "banana", "violet"],
      pairings: ["charcuterie", "salmon", "light pasta", "aperitif"],
      seo: { title: "Gamay | Grape guide — Winerim", description: "Discover everything about the Gamay grape: aromas, food pairings, regions and tips for restaurants. Complete Gamay guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Gamay dans votre carte des vins",
      description: "Découvrez tout sur le cépage Gamay : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["framboise", "cerise", "banane", "violette"],
      pairings: ["charcuterie", "saumon", "pâtes légères", "apéritif"],
      seo: { title: "Gamay | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Gamay : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Gamay nella tua carta dei vini",
      description: "Scopri tutto sull'uva Gamay: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["lampone", "ciliegia", "banana", "violetta"],
      pairings: ["salumi", "salmone", "pasta leggera", "aperitivo"],
      seo: { title: "Gamay | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Gamay: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Gamay auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Gamay: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Himbeere", "Kirsche", "Banane", "Veilchen"],
      pairings: ["Charcuterie", "Lachs", "leichte Pasta", "Aperitif"],
      seo: { title: "Gamay | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Gamay: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Gamay na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Gamay: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["framboesa", "cereja", "banana", "violeta"],
      pairings: ["charcutaria", "salmão", "massa leve", "aperitivo"],
      seo: { title: "Gamay | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Gamay: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "garganega": {
    en: {
      tastingNotes: "Everything you need to know to include Garganega on your wine list",
      description: "Discover everything about the Garganega grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["almond", "citrus", "white flowers", "stone fruit"],
      pairings: ["risotto", "light fish", "appetizers", "shellfish"],
      seo: { title: "Garganega | Grape guide — Winerim", description: "Discover everything about the Garganega grape: aromas, food pairings, regions and tips for restaurants. Complete Garganega guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Garganega dans votre carte des vins",
      description: "Découvrez tout sur le cépage Garganega : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["amande", "agrumes", "fleurs blanches", "fruits à noyau"],
      pairings: ["risotto", "poissons légers", "entrées", "coquillages"],
      seo: { title: "Garganega | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Garganega : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Garganega nella tua carta dei vini",
      description: "Scopri tutto sull'uva Garganega: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mandorla", "agrumi", "fiori bianchi", "frutta a nocciolo"],
      pairings: ["risotto", "pesce leggero", "antipasti", "crostacei"],
      seo: { title: "Garganega | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Garganega: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Garganega auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Garganega: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Mandel", "Zitrus", "weiße Blüten", "Steinobst"],
      pairings: ["Risotto", "leichter Fisch", "Vorspeisen", "Schalentiere"],
      seo: { title: "Garganega | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Garganega: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Garganega na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Garganega: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["amêndoa", "citrinos", "flores brancas", "fruta de caroço"],
      pairings: ["risotto", "peixe leve", "entradas", "mariscos"],
      seo: { title: "Garganega | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Garganega: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "garnacha": {
    en: {
      tastingNotes: "Everything you need to know to include Garnacha/Grenache on your wine list",
      description: "Discover everything about the Garnacha/Grenache grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["raspberry", "strawberry", "white pepper", "garrigue"],
      pairings: ["Mediterranean cuisine", "grilled lamb", "tapas", "stews"],
      seo: { title: "Garnacha/Grenache | Grape guide — Winerim", description: "Discover everything about the Garnacha/Grenache grape: aromas, food pairings, regions and tips for restaurants. Complete Garnacha/Grenache guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Garnacha/Grenache dans votre carte des vins",
      description: "Découvrez tout sur le cépage Garnacha/Grenache : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["framboise", "fraise", "poivre blanc", "garrigue"],
      pairings: ["cuisine méditerranéenne", "agneau grillé", "tapas", "ragoûts"],
      seo: { title: "Garnacha/Grenache | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Garnacha/Grenache : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Garnacha/Grenache nella tua carta dei vini",
      description: "Scopri tutto sull'uva Garnacha/Grenache: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["lampone", "fragola", "pepe bianco", "macchia mediterranea"],
      pairings: ["cucina mediterranea", "agnello alla griglia", "tapas", "stufati"],
      seo: { title: "Garnacha/Grenache | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Garnacha/Grenache: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Garnacha/Grenache auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Garnacha/Grenache: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Himbeere", "Erdbeere", "weißer Pfeffer", "Garrigue"],
      pairings: ["mediterrane Küche", "Lammkoteletts", "Tapas", "Eintöpfe"],
      seo: { title: "Garnacha/Grenache | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Garnacha/Grenache: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Garnacha/Grenache na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Garnacha/Grenache: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["framboesa", "morango", "pimenta branca", "garrigue"],
      pairings: ["cozinha mediterrânica", "borrego grelhado", "tapas", "ensopados"],
      seo: { title: "Garnacha/Grenache | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Garnacha/Grenache: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "gewurztraminer": {
    en: {
      tastingNotes: "Everything you need to know to include Gewürztraminer on your wine list",
      description: "Discover everything about the Gewürztraminer grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["lychee", "rose", "ginger", "tropical fruit"],
      pairings: ["Asian cuisine", "foie gras", "spicy dishes", "strong cheeses"],
      seo: { title: "Gewürztraminer | Grape guide — Winerim", description: "Discover everything about the Gewürztraminer grape: aromas, food pairings, regions and tips for restaurants. Complete Gewürztraminer guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Gewürztraminer dans votre carte des vins",
      description: "Découvrez tout sur le cépage Gewürztraminer : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["litchi", "rose", "gingembre", "fruits tropicaux"],
      pairings: ["cuisine asiatique", "foie gras", "plats épicés", "fromages forts"],
      seo: { title: "Gewürztraminer | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Gewürztraminer : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Gewürztraminer nella tua carta dei vini",
      description: "Scopri tutto sull'uva Gewürztraminer: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["litchi", "rosa", "zenzero", "frutta tropicale"],
      pairings: ["cucina asiatica", "foie gras", "piatti speziati", "formaggi forti"],
      seo: { title: "Gewürztraminer | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Gewürztraminer: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Gewürztraminer auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Gewürztraminer: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Litschi", "Rose", "Ingwer", "tropische Früchte"],
      pairings: ["asiatische Küche", "Foie gras", "würzige Gerichte", "kräftiger Käse"],
      seo: { title: "Gewürztraminer | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Gewürztraminer: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Gewürztraminer na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Gewürztraminer: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["líchia", "rosa", "gengibre", "fruta tropical"],
      pairings: ["cozinha asiática", "foie gras", "pratos picantes", "queijos fortes"],
      seo: { title: "Gewürztraminer | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Gewürztraminer: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "gruner-veltliner": {
    en: {
      tastingNotes: "Everything you need to know to include Grüner Veltliner on your wine list",
      description: "Discover everything about the Grüner Veltliner grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["green apple", "white pepper", "citrus", "herbs"],
      pairings: ["Wiener Schnitzel", "asparagus", "sushi", "salads"],
      seo: { title: "Grüner Veltliner | Grape guide — Winerim", description: "Discover everything about the Grüner Veltliner grape: aromas, food pairings, regions and tips for restaurants. Complete Grüner Veltliner guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Grüner Veltliner dans votre carte des vins",
      description: "Découvrez tout sur le cépage Grüner Veltliner : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["pomme verte", "poivre blanc", "agrumes", "herbes"],
      pairings: ["Wiener Schnitzel", "asperges", "sushi", "salades"],
      seo: { title: "Grüner Veltliner | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Grüner Veltliner : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Grüner Veltliner nella tua carta dei vini",
      description: "Scopri tutto sull'uva Grüner Veltliner: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mela verde", "pepe bianco", "agrumi", "erbe aromatiche"],
      pairings: ["Wiener Schnitzel", "asparagi", "sushi", "insalate"],
      seo: { title: "Grüner Veltliner | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Grüner Veltliner: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Grüner Veltliner auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Grüner Veltliner: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["grüner Apfel", "weißer Pfeffer", "Zitrus", "Kräuter"],
      pairings: ["Wiener Schnitzel", "Spargel", "Sushi", "Salate"],
      seo: { title: "Grüner Veltliner | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Grüner Veltliner: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Grüner Veltliner na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Grüner Veltliner: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["maçã verde", "pimenta branca", "citrinos", "ervas aromáticas"],
      pairings: ["Wiener Schnitzel", "espargos", "sushi", "saladas"],
      seo: { title: "Grüner Veltliner | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Grüner Veltliner: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "malbec": {
    en: {
      tastingNotes: "Everything you need to know to include Malbec on your wine list",
      description: "Discover everything about the Malbec grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["blackberry", "plum", "chocolate", "violet"],
      pairings: ["steak", "BBQ", "empanadas", "dark chocolate"],
      seo: { title: "Malbec | Grape guide — Winerim", description: "Discover everything about the Malbec grape: aromas, food pairings, regions and tips for restaurants. Complete Malbec guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Malbec dans votre carte des vins",
      description: "Découvrez tout sur le cépage Malbec : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["mûre", "prune", "chocolat", "violette"],
      pairings: ["steak", "barbecue", "empanadas", "chocolat noir"],
      seo: { title: "Malbec | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Malbec : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Malbec nella tua carta dei vini",
      description: "Scopri tutto sull'uva Malbec: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mora", "prugna", "cioccolato", "violetta"],
      pairings: ["bistecca", "barbecue", "empanadas", "cioccolato fondente"],
      seo: { title: "Malbec | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Malbec: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Malbec auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Malbec: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Brombeere", "Pflaume", "Schokolade", "Veilchen"],
      pairings: ["Steak", "Grillen", "Empanadas", "dunkle Schokolade"],
      seo: { title: "Malbec | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Malbec: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Malbec na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Malbec: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["amora", "ameixa", "chocolate", "violeta"],
      pairings: ["bife", "churrasco", "empanadas", "chocolate negro"],
      seo: { title: "Malbec | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Malbec: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "mencia": {
    en: {
      tastingNotes: "Everything you need to know to include Mencía on your wine list",
      description: "Discover everything about the Mencía grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["red berries", "violet", "mineral", "balsamic"],
      pairings: ["octopus", "roasted pork", "mushrooms", "Galician cuisine"],
      seo: { title: "Mencía | Grape guide — Winerim", description: "Discover everything about the Mencía grape: aromas, food pairings, regions and tips for restaurants. Complete Mencía guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Mencía dans votre carte des vins",
      description: "Découvrez tout sur le cépage Mencía : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["fruits rouges", "violette", "minéral", "balsamique"],
      pairings: ["poulpe", "porc rôti", "champignons", "cuisine galicienne"],
      seo: { title: "Mencía | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Mencía : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Mencía nella tua carta dei vini",
      description: "Scopri tutto sull'uva Mencía: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["frutti rossi", "violetta", "minerale", "balsamico"],
      pairings: ["polpo", "maiale arrosto", "funghi", "cucina galiziana"],
      seo: { title: "Mencía | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Mencía: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Mencía auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Mencía: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["rote Beeren", "Veilchen", "Mineralisch", "balsamisch"],
      pairings: ["Oktopus", "Schweinebraten", "Pilze", "galizische Küche"],
      seo: { title: "Mencía | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Mencía: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Mencía na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Mencía: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["frutos vermelhos", "violeta", "mineral", "balsâmico"],
      pairings: ["polvo", "porco assado", "cogumelos", "cozinha galega"],
      seo: { title: "Mencía | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Mencía: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "merlot": {
    en: {
      tastingNotes: "Everything you need to know to include Merlot on your wine list",
      description: "Discover everything about the Merlot grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["plum", "cherry", "chocolate", "herbs"],
      pairings: ["roasted meats", "pasta with sauce", "medium cheeses", "duck"],
      seo: { title: "Merlot | Grape guide — Winerim", description: "Discover everything about the Merlot grape: aromas, food pairings, regions and tips for restaurants. Complete Merlot guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Merlot dans votre carte des vins",
      description: "Découvrez tout sur le cépage Merlot : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["prune", "cerise", "chocolat", "herbes"],
      pairings: ["viandes rôties", "pâtes en sauce", "fromages à pâte pressée", "canard"],
      seo: { title: "Merlot | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Merlot : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Merlot nella tua carta dei vini",
      description: "Scopri tutto sull'uva Merlot: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["prugna", "ciliegia", "cioccolato", "erbe aromatiche"],
      pairings: ["arrosti", "pasta al sugo", "formaggi semi-stagionati", "anatra"],
      seo: { title: "Merlot | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Merlot: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Merlot auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Merlot: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Pflaume", "Kirsche", "Schokolade", "Kräuter"],
      pairings: ["Braten", "Pasta mit Sauce", "mittlerer Käse", "Ente"],
      seo: { title: "Merlot | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Merlot: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Merlot na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Merlot: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["ameixa", "cereja", "chocolate", "ervas aromáticas"],
      pairings: ["assados", "massa com molho", "queijos semi-curados", "pato"],
      seo: { title: "Merlot | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Merlot: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "muscat": {
    en: {
      tastingNotes: "Everything you need to know to include Moscato/Muscat on your wine list",
      description: "Discover everything about the Moscato/Muscat grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["orange blossom", "grape", "peach", "honey"],
      pairings: ["fruit desserts", "pastries", "aperitif", "spicy Asian food"],
      seo: { title: "Moscato/Muscat | Grape guide — Winerim", description: "Discover everything about the Moscato/Muscat grape: aromas, food pairings, regions and tips for restaurants. Complete Moscato/Muscat guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Moscato/Muscat dans votre carte des vins",
      description: "Découvrez tout sur le cépage Moscato/Muscat : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["fleur d'oranger", "raisin", "pêche", "miel"],
      pairings: ["desserts aux fruits", "pâtisseries", "apéritif", "cuisine asiatique épicée"],
      seo: { title: "Moscato/Muscat | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Moscato/Muscat : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Moscato/Muscat nella tua carta dei vini",
      description: "Scopri tutto sull'uva Moscato/Muscat: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["fiori d'arancio", "uva", "pesca", "miele"],
      pairings: ["dolci alla frutta", "dolci", "aperitivo", "cucina asiatica speziata"],
      seo: { title: "Moscato/Muscat | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Moscato/Muscat: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Moscato/Muscat auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Moscato/Muscat: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Orangenblüte", "Traube", "Pfirsich", "Honig"],
      pairings: ["Fruchtdesserts", "Gebäck", "Aperitif", "würzige asiatische Küche"],
      seo: { title: "Moscato/Muscat | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Moscato/Muscat: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Moscato/Muscat na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Moscato/Muscat: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["flor de laranjeira", "uva", "pêssego", "mel"],
      pairings: ["sobremesas de fruta", "pastelaria", "aperitivo", "cozinha asiática picante"],
      seo: { title: "Moscato/Muscat | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Moscato/Muscat: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "monastrell": {
    en: {
      tastingNotes: "Everything you need to know to include Mourvèdre/Monastrell on your wine list",
      description: "Discover everything about the Mourvèdre/Monastrell grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["blackberry", "leather", "game", "herbs"],
      pairings: ["game", "braised meats", "strong cheeses", "stews"],
      seo: { title: "Mourvèdre/Monastrell | Grape guide — Winerim", description: "Discover everything about the Mourvèdre/Monastrell grape: aromas, food pairings, regions and tips for restaurants. Complete Mourvèdre/Monastrell guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Mourvèdre/Monastrell dans votre carte des vins",
      description: "Découvrez tout sur le cépage Mourvèdre/Monastrell : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["mûre", "cuir", "gibier", "herbes"],
      pairings: ["gibier", "viandes braisées", "fromages forts", "ragoûts"],
      seo: { title: "Mourvèdre/Monastrell | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Mourvèdre/Monastrell : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Mourvèdre/Monastrell nella tua carta dei vini",
      description: "Scopri tutto sull'uva Mourvèdre/Monastrell: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mora", "cuoio", "selvaggina", "erbe aromatiche"],
      pairings: ["selvaggina", "brasati", "formaggi forti", "stufati"],
      seo: { title: "Mourvèdre/Monastrell | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Mourvèdre/Monastrell: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Mourvèdre/Monastrell auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Mourvèdre/Monastrell: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Brombeere", "Leder", "Wild", "Kräuter"],
      pairings: ["Wild", "Schmorgerichte", "kräftiger Käse", "Eintöpfe"],
      seo: { title: "Mourvèdre/Monastrell | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Mourvèdre/Monastrell: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Mourvèdre/Monastrell na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Mourvèdre/Monastrell: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["amora", "couro", "caça", "ervas aromáticas"],
      pairings: ["caça", "estufados", "queijos fortes", "ensopados"],
      seo: { title: "Mourvèdre/Monastrell | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Mourvèdre/Monastrell: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "nebbiolo": {
    en: {
      tastingNotes: "Everything you need to know to include Nebbiolo on your wine list",
      description: "Discover everything about the Nebbiolo grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["rose", "tar", "cherry", "truffle"],
      pairings: ["truffle pasta", "braised meats", "aged cheeses", "risotto"],
      seo: { title: "Nebbiolo | Grape guide — Winerim", description: "Discover everything about the Nebbiolo grape: aromas, food pairings, regions and tips for restaurants. Complete Nebbiolo guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Nebbiolo dans votre carte des vins",
      description: "Découvrez tout sur le cépage Nebbiolo : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["rose", "goudron", "cerise", "truffe"],
      pairings: ["pâtes à la truffe", "viandes braisées", "fromages affinés", "risotto"],
      seo: { title: "Nebbiolo | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Nebbiolo : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Nebbiolo nella tua carta dei vini",
      description: "Scopri tutto sull'uva Nebbiolo: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["rosa", "catrame", "ciliegia", "tartufo"],
      pairings: ["pasta al tartufo", "brasati", "formaggi stagionati", "risotto"],
      seo: { title: "Nebbiolo | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Nebbiolo: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Nebbiolo auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Nebbiolo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Rose", "Teer", "Kirsche", "Trüffel"],
      pairings: ["Trüffelpasta", "Schmorgerichte", "gereifter Käse", "Risotto"],
      seo: { title: "Nebbiolo | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Nebbiolo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Nebbiolo na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Nebbiolo: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["rosa", "alcatrão", "cereja", "trufa"],
      pairings: ["massa com trufa", "estufados", "queijos curados", "risotto"],
      seo: { title: "Nebbiolo | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Nebbiolo: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "nero-d-avola": {
    en: {
      tastingNotes: "Everything you need to know to include Nero d'Avola on your wine list",
      description: "Discover everything about the Nero d'Avola grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["black cherry", "plum", "spice", "chocolate"],
      pairings: ["Sicilian cuisine", "grilled meats", "aubergine dishes", "aged cheeses"],
      seo: { title: "Nero d'Avola | Grape guide — Winerim", description: "Discover everything about the Nero d'Avola grape: aromas, food pairings, regions and tips for restaurants. Complete Nero d'Avola guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Nero d'Avola dans votre carte des vins",
      description: "Découvrez tout sur le cépage Nero d'Avola : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["cerise noire", "prune", "épice", "chocolat"],
      pairings: ["cuisine sicilienne", "viandes grillées", "plats d'aubergine", "fromages affinés"],
      seo: { title: "Nero d'Avola | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Nero d'Avola : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Nero d'Avola nella tua carta dei vini",
      description: "Scopri tutto sull'uva Nero d'Avola: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["amarena", "prugna", "spezia", "cioccolato"],
      pairings: ["cucina siciliana", "carne alla griglia", "piatti di melanzane", "formaggi stagionati"],
      seo: { title: "Nero d'Avola | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Nero d'Avola: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Nero d'Avola auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Nero d'Avola: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Schwarzkirsche", "Pflaume", "Gewürz", "Schokolade"],
      pairings: ["sizilianische Küche", "Grillgerichte", "Auberginengerichte", "gereifter Käse"],
      seo: { title: "Nero d'Avola | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Nero d'Avola: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Nero d'Avola na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Nero d'Avola: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["cereja preta", "ameixa", "especiaria", "chocolate"],
      pairings: ["cozinha siciliana", "carnes grelhadas", "pratos de beringela", "queijos curados"],
      seo: { title: "Nero d'Avola | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Nero d'Avola: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "petit-verdot": {
    en: {
      tastingNotes: "Everything you need to know to include Petit Verdot on your wine list",
      description: "Discover everything about the Petit Verdot grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["violet", "blueberry", "dark chocolate", "spice"],
      pairings: ["red meats", "game", "strong cheeses", "stews"],
      seo: { title: "Petit Verdot | Grape guide — Winerim", description: "Discover everything about the Petit Verdot grape: aromas, food pairings, regions and tips for restaurants. Complete Petit Verdot guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Petit Verdot dans votre carte des vins",
      description: "Découvrez tout sur le cépage Petit Verdot : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["violette", "myrtille", "chocolat noir", "épice"],
      pairings: ["viandes rouges", "gibier", "fromages forts", "ragoûts"],
      seo: { title: "Petit Verdot | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Petit Verdot : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Petit Verdot nella tua carta dei vini",
      description: "Scopri tutto sull'uva Petit Verdot: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["violetta", "mirtillo", "cioccolato fondente", "spezia"],
      pairings: ["carni rosse", "selvaggina", "formaggi forti", "stufati"],
      seo: { title: "Petit Verdot | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Petit Verdot: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Petit Verdot auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Petit Verdot: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Veilchen", "Blaubeere", "dunkle Schokolade", "Gewürz"],
      pairings: ["rotes Fleisch", "Wild", "kräftiger Käse", "Eintöpfe"],
      seo: { title: "Petit Verdot | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Petit Verdot: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Petit Verdot na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Petit Verdot: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["violeta", "mirtilo", "chocolate negro", "especiaria"],
      pairings: ["carnes vermelhas", "caça", "queijos fortes", "ensopados"],
      seo: { title: "Petit Verdot | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Petit Verdot: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "pinot-grigio": {
    en: {
      tastingNotes: "Everything you need to know to include Pinot Grigio/Gris on your wine list",
      description: "Discover everything about the Pinot Grigio/Gris grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["pear", "apple", "almond", "citrus"],
      pairings: ["salads", "light fish", "appetizers", "light pasta"],
      seo: { title: "Pinot Grigio/Gris | Grape guide — Winerim", description: "Discover everything about the Pinot Grigio/Gris grape: aromas, food pairings, regions and tips for restaurants. Complete Pinot Grigio/Gris guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Pinot Grigio/Gris dans votre carte des vins",
      description: "Découvrez tout sur le cépage Pinot Grigio/Gris : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["poire", "pomme", "amande", "agrumes"],
      pairings: ["salades", "poissons légers", "entrées", "pâtes légères"],
      seo: { title: "Pinot Grigio/Gris | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Pinot Grigio/Gris : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Pinot Grigio/Gris nella tua carta dei vini",
      description: "Scopri tutto sull'uva Pinot Grigio/Gris: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["pera", "mela", "mandorla", "agrumi"],
      pairings: ["insalate", "pesce leggero", "antipasti", "pasta leggera"],
      seo: { title: "Pinot Grigio/Gris | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Pinot Grigio/Gris: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Pinot Grigio/Gris auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Pinot Grigio/Gris: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Birne", "Apfel", "Mandel", "Zitrus"],
      pairings: ["Salate", "leichter Fisch", "Vorspeisen", "leichte Pasta"],
      seo: { title: "Pinot Grigio/Gris | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Pinot Grigio/Gris: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Pinot Grigio/Gris na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Pinot Grigio/Gris: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["pera", "maçã", "amêndoa", "citrinos"],
      pairings: ["saladas", "peixe leve", "entradas", "massa leve"],
      seo: { title: "Pinot Grigio/Gris | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Pinot Grigio/Gris: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "pinot-noir": {
    en: {
      tastingNotes: "Everything you need to know to include Pinot Noir on your wine list",
      description: "Discover everything about the Pinot Noir grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["cherry", "raspberry", "earth", "mushroom"],
      pairings: ["salmon", "duck", "mushroom dishes", "soft cheeses"],
      seo: { title: "Pinot Noir | Grape guide — Winerim", description: "Discover everything about the Pinot Noir grape: aromas, food pairings, regions and tips for restaurants. Complete Pinot Noir guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Pinot Noir dans votre carte des vins",
      description: "Découvrez tout sur le cépage Pinot Noir : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["cerise", "framboise", "terre", "champignon"],
      pairings: ["saumon", "canard", "plats aux champignons", "fromages à pâte molle"],
      seo: { title: "Pinot Noir | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Pinot Noir : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Pinot Noir nella tua carta dei vini",
      description: "Scopri tutto sull'uva Pinot Noir: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["ciliegia", "lampone", "terra", "fungo"],
      pairings: ["salmone", "anatra", "piatti ai funghi", "formaggi molli"],
      seo: { title: "Pinot Noir | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Pinot Noir: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Pinot Noir auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Pinot Noir: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Kirsche", "Himbeere", "Erde", "Pilz"],
      pairings: ["Lachs", "Ente", "Pilzgerichte", "Weichkäse"],
      seo: { title: "Pinot Noir | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Pinot Noir: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Pinot Noir na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Pinot Noir: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["cereja", "framboesa", "terra", "cogumelo"],
      pairings: ["salmão", "pato", "pratos de cogumelos", "queijos frescos"],
      seo: { title: "Pinot Noir | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Pinot Noir: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "pinotage": {
    en: {
      tastingNotes: "Everything you need to know to include Pinotage on your wine list",
      description: "Discover everything about the Pinotage grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["plum", "smoke", "banana", "coffee"],
      pairings: ["BBQ", "game", "smoked meats", "strong cheeses"],
      seo: { title: "Pinotage | Grape guide — Winerim", description: "Discover everything about the Pinotage grape: aromas, food pairings, regions and tips for restaurants. Complete Pinotage guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Pinotage dans votre carte des vins",
      description: "Découvrez tout sur le cépage Pinotage : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["prune", "fumée", "banane", "café"],
      pairings: ["barbecue", "gibier", "viandes fumées", "fromages forts"],
      seo: { title: "Pinotage | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Pinotage : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Pinotage nella tua carta dei vini",
      description: "Scopri tutto sull'uva Pinotage: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["prugna", "fumo", "banana", "caffè"],
      pairings: ["barbecue", "selvaggina", "affumicati", "formaggi forti"],
      seo: { title: "Pinotage | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Pinotage: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Pinotage auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Pinotage: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Pflaume", "Rauch", "Banane", "Kaffee"],
      pairings: ["Grillen", "Wild", "Räucherfleisch", "kräftiger Käse"],
      seo: { title: "Pinotage | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Pinotage: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Pinotage na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Pinotage: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["ameixa", "fumo", "banana", "café"],
      pairings: ["churrasco", "caça", "carnes fumadas", "queijos fortes"],
      seo: { title: "Pinotage | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Pinotage: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "riesling": {
    en: {
      tastingNotes: "Everything you need to know to include Riesling on your wine list",
      description: "Discover everything about the Riesling grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["lime", "peach", "petrol", "honey"],
      pairings: ["Asian cuisine", "shellfish", "spicy food", "foie gras"],
      seo: { title: "Riesling | Grape guide — Winerim", description: "Discover everything about the Riesling grape: aromas, food pairings, regions and tips for restaurants. Complete Riesling guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Riesling dans votre carte des vins",
      description: "Découvrez tout sur le cépage Riesling : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["citron vert", "pêche", "pétrole", "miel"],
      pairings: ["cuisine asiatique", "coquillages", "plats épicés", "foie gras"],
      seo: { title: "Riesling | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Riesling : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Riesling nella tua carta dei vini",
      description: "Scopri tutto sull'uva Riesling: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["lime", "pesca", "idrocarburi", "miele"],
      pairings: ["cucina asiatica", "crostacei", "piatti speziati", "foie gras"],
      seo: { title: "Riesling | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Riesling: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Riesling auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Riesling: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Limette", "Pfirsich", "Petroleum", "Honig"],
      pairings: ["asiatische Küche", "Schalentiere", "würzige Speisen", "Foie gras"],
      seo: { title: "Riesling | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Riesling: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Riesling na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Riesling: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["lima", "pêssego", "petróleo", "mel"],
      pairings: ["cozinha asiática", "mariscos", "pratos picantes", "foie gras"],
      seo: { title: "Riesling | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Riesling: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "sangiovese": {
    en: {
      tastingNotes: "Everything you need to know to include Sangiovese on your wine list",
      description: "Discover everything about the Sangiovese grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["cherry", "tomato leaf", "leather", "herbs"],
      pairings: ["pasta", "pizza", "grilled meats", "Tuscan cuisine"],
      seo: { title: "Sangiovese | Grape guide — Winerim", description: "Discover everything about the Sangiovese grape: aromas, food pairings, regions and tips for restaurants. Complete Sangiovese guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Sangiovese dans votre carte des vins",
      description: "Découvrez tout sur le cépage Sangiovese : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["cerise", "feuille de tomate", "cuir", "herbes"],
      pairings: ["pâtes", "pizza", "viandes grillées", "cuisine toscane"],
      seo: { title: "Sangiovese | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Sangiovese : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Sangiovese nella tua carta dei vini",
      description: "Scopri tutto sull'uva Sangiovese: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["ciliegia", "foglia di pomodoro", "cuoio", "erbe aromatiche"],
      pairings: ["pasta", "pizza", "carne alla griglia", "cucina toscana"],
      seo: { title: "Sangiovese | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Sangiovese: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Sangiovese auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Sangiovese: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Kirsche", "Tomatenblatt", "Leder", "Kräuter"],
      pairings: ["Pasta", "Pizza", "Grillgerichte", "toskanische Küche"],
      seo: { title: "Sangiovese | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Sangiovese: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Sangiovese na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Sangiovese: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["cereja", "folha de tomate", "couro", "ervas aromáticas"],
      pairings: ["massa", "pizza", "carnes grelhadas", "cozinha toscana"],
      seo: { title: "Sangiovese | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Sangiovese: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "sauvignon-blanc": {
    en: {
      tastingNotes: "Everything you need to know to include Sauvignon Blanc on your wine list",
      description: "Discover everything about the Sauvignon Blanc grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["grapefruit", "grass", "gooseberry", "herbs"],
      pairings: ["goat cheese", "seafood", "salads", "asparagus"],
      seo: { title: "Sauvignon Blanc | Grape guide — Winerim", description: "Discover everything about the Sauvignon Blanc grape: aromas, food pairings, regions and tips for restaurants. Complete Sauvignon Blanc guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Sauvignon Blanc dans votre carte des vins",
      description: "Découvrez tout sur le cépage Sauvignon Blanc : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["pamplemousse", "herbe", "groseille", "herbes"],
      pairings: ["fromage de chèvre", "fruits de mer", "salades", "asperges"],
      seo: { title: "Sauvignon Blanc | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Sauvignon Blanc : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Sauvignon Blanc nella tua carta dei vini",
      description: "Scopri tutto sull'uva Sauvignon Blanc: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["pompelmo", "erba", "uva spina", "erbe aromatiche"],
      pairings: ["formaggio di capra", "frutti di mare", "insalate", "asparagi"],
      seo: { title: "Sauvignon Blanc | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Sauvignon Blanc: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Sauvignon Blanc auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Sauvignon Blanc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Grapefruit", "Gras", "Stachelbeere", "Kräuter"],
      pairings: ["Ziegenkäse", "Meeresfrüchte", "Salate", "Spargel"],
      seo: { title: "Sauvignon Blanc | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Sauvignon Blanc: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Sauvignon Blanc na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Sauvignon Blanc: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["toranja", "erva", "groselha", "ervas aromáticas"],
      pairings: ["queijo de cabra", "marisco", "saladas", "espargos"],
      seo: { title: "Sauvignon Blanc | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Sauvignon Blanc: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "semillon": {
    en: {
      tastingNotes: "Everything you need to know to include Sémillon on your wine list",
      description: "Discover everything about the Sémillon grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["lemon", "honey", "lanolin", "fig"],
      pairings: ["foie gras", "roasted fish", "creamy sauces", "blue cheese"],
      seo: { title: "Sémillon | Grape guide — Winerim", description: "Discover everything about the Sémillon grape: aromas, food pairings, regions and tips for restaurants. Complete Sémillon guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Sémillon dans votre carte des vins",
      description: "Découvrez tout sur le cépage Sémillon : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["citron", "miel", "lanoline", "figue"],
      pairings: ["foie gras", "poisson rôti", "sauces crémeuses", "fromage bleu"],
      seo: { title: "Sémillon | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Sémillon : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Sémillon nella tua carta dei vini",
      description: "Scopri tutto sull'uva Sémillon: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["limone", "miele", "lanolina", "fico"],
      pairings: ["foie gras", "pesce al forno", "salse cremose", "gorgonzola"],
      seo: { title: "Sémillon | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Sémillon: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Sémillon auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Sémillon: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Zitrone", "Honig", "Lanolin", "Feige"],
      pairings: ["Foie gras", "gebratener Fisch", "cremige Saucen", "Blauschimmelkäse"],
      seo: { title: "Sémillon | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Sémillon: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Sémillon na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Sémillon: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["limão", "mel", "lanolina", "figo"],
      pairings: ["foie gras", "peixe assado", "molhos cremosos", "queijo azul"],
      seo: { title: "Sémillon | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Sémillon: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "syrah": {
    en: {
      tastingNotes: "Everything you need to know to include Syrah/Shiraz on your wine list",
      description: "Discover everything about the Syrah/Shiraz grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["black pepper", "blueberry", "olive", "smoke"],
      pairings: ["game", "BBQ", "spiced dishes", "strong cheeses"],
      seo: { title: "Syrah/Shiraz | Grape guide — Winerim", description: "Discover everything about the Syrah/Shiraz grape: aromas, food pairings, regions and tips for restaurants. Complete Syrah/Shiraz guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Syrah/Shiraz dans votre carte des vins",
      description: "Découvrez tout sur le cépage Syrah/Shiraz : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["poivre noir", "myrtille", "olive", "fumée"],
      pairings: ["gibier", "barbecue", "plats épicés", "fromages forts"],
      seo: { title: "Syrah/Shiraz | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Syrah/Shiraz : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Syrah/Shiraz nella tua carta dei vini",
      description: "Scopri tutto sull'uva Syrah/Shiraz: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["pepe nero", "mirtillo", "oliva", "fumo"],
      pairings: ["selvaggina", "barbecue", "piatti speziati", "formaggi forti"],
      seo: { title: "Syrah/Shiraz | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Syrah/Shiraz: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Syrah/Shiraz auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Syrah/Shiraz: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["schwarzer Pfeffer", "Blaubeere", "Olive", "Rauch"],
      pairings: ["Wild", "Grillen", "gewürzte Gerichte", "kräftiger Käse"],
      seo: { title: "Syrah/Shiraz | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Syrah/Shiraz: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Syrah/Shiraz na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Syrah/Shiraz: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["pimenta preta", "mirtilo", "azeitona", "fumo"],
      pairings: ["caça", "churrasco", "pratos condimentados", "queijos fortes"],
      seo: { title: "Syrah/Shiraz | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Syrah/Shiraz: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "tannat": {
    en: {
      tastingNotes: "Everything you need to know to include Tannat on your wine list",
      description: "Discover everything about the Tannat grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["blackberry", "plum", "dark chocolate", "leather"],
      pairings: ["grilled meats", "stews", "strong cheeses", "BBQ"],
      seo: { title: "Tannat | Grape guide — Winerim", description: "Discover everything about the Tannat grape: aromas, food pairings, regions and tips for restaurants. Complete Tannat guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Tannat dans votre carte des vins",
      description: "Découvrez tout sur le cépage Tannat : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["mûre", "prune", "chocolat noir", "cuir"],
      pairings: ["viandes grillées", "ragoûts", "fromages forts", "barbecue"],
      seo: { title: "Tannat | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Tannat : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Tannat nella tua carta dei vini",
      description: "Scopri tutto sull'uva Tannat: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["mora", "prugna", "cioccolato fondente", "cuoio"],
      pairings: ["carne alla griglia", "stufati", "formaggi forti", "barbecue"],
      seo: { title: "Tannat | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Tannat: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Tannat auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Tannat: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Brombeere", "Pflaume", "dunkle Schokolade", "Leder"],
      pairings: ["Grillgerichte", "Eintöpfe", "kräftiger Käse", "Grillen"],
      seo: { title: "Tannat | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Tannat: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Tannat na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Tannat: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["amora", "ameixa", "chocolate negro", "couro"],
      pairings: ["carnes grelhadas", "ensopados", "queijos fortes", "churrasco"],
      seo: { title: "Tannat | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Tannat: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "tempranillo": {
    en: {
      tastingNotes: "Everything you need to know to include Tempranillo on your wine list",
      description: "Discover everything about the Tempranillo grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["red fruit", "leather", "vanilla", "tobacco"],
      pairings: ["roasted lamb", "Iberian ham", "aged cheeses", "stews"],
      seo: { title: "Tempranillo | Grape guide — Winerim", description: "Discover everything about the Tempranillo grape: aromas, food pairings, regions and tips for restaurants. Complete Tempranillo guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Tempranillo dans votre carte des vins",
      description: "Découvrez tout sur le cépage Tempranillo : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["fruits rouges", "cuir", "vanille", "tabac"],
      pairings: ["roasted lamb", "jambon ibérique", "fromages affinés", "ragoûts"],
      seo: { title: "Tempranillo | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Tempranillo : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Tempranillo nella tua carta dei vini",
      description: "Scopri tutto sull'uva Tempranillo: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["frutti rossi", "cuoio", "vaniglia", "tabacco"],
      pairings: ["roasted lamb", "prosciutto ibérico", "formaggi stagionati", "stufati"],
      seo: { title: "Tempranillo | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Tempranillo: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Tempranillo auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Tempranillo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["rote Früchte", "Leder", "Vanille", "Tabak"],
      pairings: ["roasted lamb", "iberischer Schinken", "gereifter Käse", "Eintöpfe"],
      seo: { title: "Tempranillo | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Tempranillo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Tempranillo na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Tempranillo: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["frutos vermelhos", "couro", "baunilha", "tabaco"],
      pairings: ["roasted lamb", "presunto ibérico", "queijos curados", "ensopados"],
      seo: { title: "Tempranillo | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Tempranillo: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "torrontes": {
    en: {
      tastingNotes: "Everything you need to know to include Torrontés on your wine list",
      description: "Discover everything about the Torrontés grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["rose", "lychee", "citrus", "peach"],
      pairings: ["spicy food", "Asian cuisine", "fresh salads", "appetizers"],
      seo: { title: "Torrontés | Grape guide — Winerim", description: "Discover everything about the Torrontés grape: aromas, food pairings, regions and tips for restaurants. Complete Torrontés guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Torrontés dans votre carte des vins",
      description: "Découvrez tout sur le cépage Torrontés : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["rose", "litchi", "agrumes", "pêche"],
      pairings: ["plats épicés", "cuisine asiatique", "salades fraîches", "entrées"],
      seo: { title: "Torrontés | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Torrontés : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Torrontés nella tua carta dei vini",
      description: "Scopri tutto sull'uva Torrontés: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["rosa", "litchi", "agrumi", "pesca"],
      pairings: ["piatti speziati", "cucina asiatica", "insalate fresche", "antipasti"],
      seo: { title: "Torrontés | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Torrontés: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Torrontés auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Torrontés: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Rose", "Litschi", "Zitrus", "Pfirsich"],
      pairings: ["würzige Speisen", "asiatische Küche", "frische Salate", "Vorspeisen"],
      seo: { title: "Torrontés | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Torrontés: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Torrontés na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Torrontés: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["rosa", "líchia", "citrinos", "pêssego"],
      pairings: ["pratos picantes", "cozinha asiática", "saladas frescas", "entradas"],
      seo: { title: "Torrontés | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Torrontés: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "touriga-nacional": {
    en: {
      tastingNotes: "Everything you need to know to include Touriga Nacional on your wine list",
      description: "Discover everything about the Touriga Nacional grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["violet", "dark berries", "rock rose", "herbs"],
      pairings: ["Portuguese cuisine", "grilled meats", "strong cheeses", "stews"],
      seo: { title: "Touriga Nacional | Grape guide — Winerim", description: "Discover everything about the Touriga Nacional grape: aromas, food pairings, regions and tips for restaurants. Complete Touriga Nacional guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Touriga Nacional dans votre carte des vins",
      description: "Découvrez tout sur le cépage Touriga Nacional : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["violette", "baies noires", "ciste", "herbes"],
      pairings: ["cuisine portugaise", "viandes grillées", "fromages forts", "ragoûts"],
      seo: { title: "Touriga Nacional | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Touriga Nacional : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Touriga Nacional nella tua carta dei vini",
      description: "Scopri tutto sull'uva Touriga Nacional: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["violetta", "frutti di bosco scuri", "cisto", "erbe aromatiche"],
      pairings: ["cucina portoghese", "carne alla griglia", "formaggi forti", "stufati"],
      seo: { title: "Touriga Nacional | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Touriga Nacional: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Touriga Nacional auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Touriga Nacional: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Veilchen", "dunkle Beeren", "Zistrose", "Kräuter"],
      pairings: ["portugiesische Küche", "Grillgerichte", "kräftiger Käse", "Eintöpfe"],
      seo: { title: "Touriga Nacional | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Touriga Nacional: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Touriga Nacional na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Touriga Nacional: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["violeta", "frutos escuros", "esteva", "ervas aromáticas"],
      pairings: ["cozinha portuguesa", "carnes grelhadas", "queijos fortes", "ensopados"],
      seo: { title: "Touriga Nacional | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Touriga Nacional: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "verdejo": {
    en: {
      tastingNotes: "Everything you need to know to include Verdejo on your wine list",
      description: "Discover everything about the Verdejo grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["fennel", "tropical fruit", "grass", "bitter almond"],
      pairings: ["tapas", "shellfish", "salads", "light rice dishes"],
      seo: { title: "Verdejo | Grape guide — Winerim", description: "Discover everything about the Verdejo grape: aromas, food pairings, regions and tips for restaurants. Complete Verdejo guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Verdejo dans votre carte des vins",
      description: "Découvrez tout sur le cépage Verdejo : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["fenouil", "fruits tropicaux", "herbe", "amande amère"],
      pairings: ["tapas", "coquillages", "salades", "plats de riz légers"],
      seo: { title: "Verdejo | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Verdejo : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Verdejo nella tua carta dei vini",
      description: "Scopri tutto sull'uva Verdejo: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["finocchio", "frutta tropicale", "erba", "mandorla amara"],
      pairings: ["tapas", "crostacei", "insalate", "risotti leggeri"],
      seo: { title: "Verdejo | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Verdejo: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Verdejo auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Verdejo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Fenchel", "tropische Früchte", "Gras", "Bittermandel"],
      pairings: ["Tapas", "Schalentiere", "Salate", "leichte Reisgerichte"],
      seo: { title: "Verdejo | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Verdejo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Verdejo na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Verdejo: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["funcho", "fruta tropical", "erva", "amêndoa amarga"],
      pairings: ["tapas", "mariscos", "saladas", "pratos de arroz leves"],
      seo: { title: "Verdejo | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Verdejo: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "vermentino": {
    en: {
      tastingNotes: "Everything you need to know to include Vermentino on your wine list",
      description: "Discover everything about the Vermentino grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["citrus", "almond", "white flowers", "herbs"],
      pairings: ["grilled fish", "seafood salads", "pesto pasta", "appetizers"],
      seo: { title: "Vermentino | Grape guide — Winerim", description: "Discover everything about the Vermentino grape: aromas, food pairings, regions and tips for restaurants. Complete Vermentino guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Vermentino dans votre carte des vins",
      description: "Découvrez tout sur le cépage Vermentino : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["agrumes", "amande", "fleurs blanches", "herbes"],
      pairings: ["poisson grillé", "salades de fruits de mer", "pâtes au pesto", "entrées"],
      seo: { title: "Vermentino | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Vermentino : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Vermentino nella tua carta dei vini",
      description: "Scopri tutto sull'uva Vermentino: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["agrumi", "mandorla", "fiori bianchi", "erbe aromatiche"],
      pairings: ["pesce alla griglia", "insalate di mare", "pasta al pesto", "antipasti"],
      seo: { title: "Vermentino | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Vermentino: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Vermentino auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Vermentino: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Zitrus", "Mandel", "weiße Blüten", "Kräuter"],
      pairings: ["gegrillter Fisch", "Meeresfrüchtesalat", "Pestopasta", "Vorspeisen"],
      seo: { title: "Vermentino | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Vermentino: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Vermentino na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Vermentino: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["citrinos", "amêndoa", "flores brancas", "ervas aromáticas"],
      pairings: ["peixe grelhado", "saladas de marisco", "massa com pesto", "entradas"],
      seo: { title: "Vermentino | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Vermentino: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "viognier": {
    en: {
      tastingNotes: "Everything you need to know to include Viognier on your wine list",
      description: "Discover everything about the Viognier grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["apricot", "peach", "violet", "orange blossom"],
      pairings: ["lobster", "Thai cuisine", "foie gras", "creamy sauces"],
      seo: { title: "Viognier | Grape guide — Winerim", description: "Discover everything about the Viognier grape: aromas, food pairings, regions and tips for restaurants. Complete Viognier guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Viognier dans votre carte des vins",
      description: "Découvrez tout sur le cépage Viognier : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["abricot", "pêche", "violette", "fleur d'oranger"],
      pairings: ["homard", "cuisine thaïlandaise", "foie gras", "sauces crémeuses"],
      seo: { title: "Viognier | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Viognier : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Viognier nella tua carta dei vini",
      description: "Scopri tutto sull'uva Viognier: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["albicocca", "pesca", "violetta", "fiori d'arancio"],
      pairings: ["astice", "cucina thailandese", "foie gras", "salse cremose"],
      seo: { title: "Viognier | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Viognier: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Viognier auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Viognier: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Aprikose", "Pfirsich", "Veilchen", "Orangenblüte"],
      pairings: ["Hummer", "thailändische Küche", "Foie gras", "cremige Saucen"],
      seo: { title: "Viognier | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Viognier: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Viognier na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Viognier: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["alperce", "pêssego", "violeta", "flor de laranjeira"],
      pairings: ["lagosta", "cozinha tailandesa", "foie gras", "molhos cremosos"],
      seo: { title: "Viognier | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Viognier: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
  "primitivo": {
    en: {
      tastingNotes: "Everything you need to know to include Zinfandel/Primitivo on your wine list",
      description: "Discover everything about the Zinfandel/Primitivo grape: aromas, food pairings, regions and tips for restaurants.",
      aromas: ["raspberry", "blackberry", "pepper", "jam"],
      pairings: ["BBQ", "pizza", "spicy sausage", "chocolate desserts"],
      seo: { title: "Zinfandel/Primitivo | Grape guide — Winerim", description: "Discover everything about the Zinfandel/Primitivo grape: aromas, food pairings, regions and tips for restaurants. Complete Zinfandel/Primitivo guide for hospitality professionals." },
    },
    fr: {
      tastingNotes: "Tout ce qu'il faut savoir pour inclure Zinfandel/Primitivo dans votre carte des vins",
      description: "Découvrez tout sur le cépage Zinfandel/Primitivo : arômes, accords mets-vins, régions et conseils pour restaurants.",
      aromas: ["framboise", "mûre", "poivre", "confiture"],
      pairings: ["barbecue", "pizza", "saucisse épicée", "desserts au chocolat"],
      seo: { title: "Zinfandel/Primitivo | Guide du cépage — Winerim", description: "Découvrez tout sur le cépage Zinfandel/Primitivo : arômes, accords mets-vins, régions et conseils pour restaurants. Guide complet pour les professionnels de la restauration." },
    },
    it: {
      tastingNotes: "Tutto ciò che devi sapere per includere Zinfandel/Primitivo nella tua carta dei vini",
      description: "Scopri tutto sull'uva Zinfandel/Primitivo: aromi, abbinamenti, regioni e consigli per ristoranti.",
      aromas: ["lampone", "mora", "pepe", "confettura"],
      pairings: ["barbecue", "pizza", "salsiccia piccante", "dolci al cioccolato"],
      seo: { title: "Zinfandel/Primitivo | Guida al vitigno — Winerim", description: "Scopri tutto sull'uva Zinfandel/Primitivo: aromi, abbinamenti, regioni e consigli per ristoranti. Guida completa per professionisti della ristorazione." },
    },
    de: {
      tastingNotes: "Alles, was Sie wissen müssen, um Zinfandel/Primitivo auf Ihre Weinkarte zu setzen",
      description: "Entdecken Sie alles über die Rebsorte Zinfandel/Primitivo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants.",
      aromas: ["Himbeere", "Brombeere", "Pfeffer", "Marmelade"],
      pairings: ["Grillen", "Pizza", "scharfe Wurst", "Schokoladendesserts"],
      seo: { title: "Zinfandel/Primitivo | Rebsortenführer — Winerim", description: "Entdecken Sie alles über die Rebsorte Zinfandel/Primitivo: Aromen, Speisebegleitung, Regionen und Tipps für Restaurants. Kompletter Leitfaden für Gastronomieprofis." },
    },
    pt: {
      tastingNotes: "Tudo o que precisa saber para incluir Zinfandel/Primitivo na sua carta de vinhos",
      description: "Descubra tudo sobre a casta Zinfandel/Primitivo: aromas, harmonizações, regiões e dicas para restaurantes.",
      aromas: ["framboesa", "amora", "pimenta", "compota"],
      pairings: ["churrasco", "pizza", "chouriço picante", "sobremesas de chocolate"],
      seo: { title: "Zinfandel/Primitivo | Guia da casta — Winerim", description: "Descubra tudo sobre a casta Zinfandel/Primitivo: aromas, harmonizações, regiões e dicas para restaurantes. Guia completo para profissionais de restauração." },
    },
  },
};

// ============================================================
// Catalog overlays (compact: only tastingNotes for listing cards)
// ============================================================

export const grapeCatalogOverlays: Record<string, CatalogLangOverlays> = {};
// Auto-populated from grapeOverlays
for (const [grapeId, langs] of Object.entries(grapeOverlays)) {
  grapeCatalogOverlays[grapeId] = {};
  for (const [lang, overlay] of Object.entries(langs)) {
    if (overlay.tastingNotes) {
      grapeCatalogOverlays[grapeId][lang] = { tastingNotes: overlay.tastingNotes };
    }
  }
}

// ============================================================
// Helper functions
// ============================================================

export function getLocalizedGrape(
  grape: GrapeEntry,
  lang: string
): GrapeEntry {
  if (lang === "es") return grape;
  const overlay = grapeOverlays[grape.slug]?.[lang];
  if (!overlay) return grape;
  return {
    ...grape,
    tastingNotes: overlay.tastingNotes ?? grape.tastingNotes,
    description: overlay.description ?? grape.description,
    intro: overlay.intro ?? grape.intro,
    cartaPerception: overlay.cartaPerception ?? grape.cartaPerception,
    whenItHelps: overlay.whenItHelps ?? grape.whenItHelps,
    clientProfile: overlay.clientProfile ?? grape.clientProfile,
    sellByStrategy: overlay.sellByStrategy ?? grape.sellByStrategy,
    whenToWriteBig: overlay.whenToWriteBig ?? grape.whenToWriteBig,
    aromas: overlay.aromas ?? grape.aromas,
    commonMistakes: overlay.commonMistakes ?? grape.commonMistakes,
    pairings: overlay.pairings ?? grape.pairings,
    faqs: overlay.faqs ?? grape.faqs,
    seo: {
      title: overlay.seo?.title ?? grape.seo.title,
      description: overlay.seo?.description ?? grape.seo.description,
    },
  };
}

export function getLocalizedCatalogEntry<T extends GrapeCatalogEntry | GrapeEntry>(
  entry: T,
  lang: string,
): T {
  if (lang === "es") return entry;
  const fullOverlay = grapeOverlays[entry.slug]?.[lang];
  const catalogOverlay = grapeCatalogOverlays[entry.slug]?.[lang];
  const tastingNotes = fullOverlay?.tastingNotes ?? catalogOverlay?.tastingNotes;
  if (!tastingNotes) return entry;
  return { ...entry, tastingNotes };
}

export type LocalizedGrapeCatalogEntry = GrapeCatalogEntry & {
  description?: string;
  intro?: string;
  seo?: {
    title?: string;
    description?: string;
  };
};

export function getLocalizedGrapeCatalogEntry(
  slug: string,
  lang: string,
): LocalizedGrapeCatalogEntry | undefined {
  const entry = getCatalogEntry(slug);
  if (!entry) return undefined;
  const overlay = grapeOverlays[entry.slug]?.[lang];
  return {
    ...getLocalizedCatalogEntry(entry, lang),
    description: overlay?.description,
    intro: overlay?.intro,
    seo: overlay?.seo,
  };
}

export function getLocalizedGrapeCatalog(lang: string): LocalizedGrapeCatalogEntry[] {
  return grapeCatalog.map((entry) => {
    const overlay = grapeOverlays[entry.slug]?.[lang];
    return {
      ...getLocalizedCatalogEntry(entry, lang),
      description: overlay?.description,
      intro: overlay?.intro,
      seo: overlay?.seo,
    };
  });
}

export function getLocalizedGrapeEntries(lang: string): GrapeEntry[] {
  return grapeEntries.map((entry) => getLocalizedGrape(entry, lang));
}
