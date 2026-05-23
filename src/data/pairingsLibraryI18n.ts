import {
  categoryMeta,
  pairingEntries,
  type PairingCategory,
  type PairingEntry,
} from "./pairingsLibrary";
import {
  categoryLabels,
  formatList,
  normalizeWineOverlayLang,
  resolveWineLang,
  seoDescription,
  seoTitle,
  type WineI18nLang,
  type WineI18nOverlay,
  type WineOverlayMap,
  type WineRuntimeLang,
} from "./wineLibraryI18n";

interface PairingI18nOverlay extends WineI18nOverlay {
  name: string;
}

type PairingOverlays = WineOverlayMap<PairingI18nOverlay>;

const pairingNames: Record<WineRuntimeLang, Record<PairingCategory, string>> = {
  es: {
    "carnes-rojas": "Maridaje con carnes rojas",
    "aves-caza": "Maridaje con aves y caza",
    "pescados-mariscos": "Maridaje con pescados y mariscos",
    quesos: "Maridaje con quesos",
    "pasta-arroces-legumbres": "Maridaje con pasta, arroces y legumbres",
    "verduras-vegetariana": "Maridaje con verduras y cocina vegetariana",
    "embutidos-charcuteria": "Maridaje con embutidos y charcutería",
    "postres-chocolate": "Maridaje con postres y chocolate",
    "cocina-asiatica-fusion": "Maridaje con cocina asiática y fusión",
    "tapas-aperitivos": "Maridaje con tapas y aperitivos",
  },
  en: {
    "carnes-rojas": "Pairing with Red Meat",
    "aves-caza": "Pairing with Poultry and Game",
    "pescados-mariscos": "Pairing with Fish and Seafood",
    quesos: "Pairing with Cheese",
    "pasta-arroces-legumbres": "Pairing with Pasta, Rice and Legumes",
    "verduras-vegetariana": "Pairing with Vegetables and Vegetarian Cuisine",
    "embutidos-charcuteria": "Pairing with Cured Meats and Charcuterie",
    "postres-chocolate": "Pairing with Desserts and Chocolate",
    "cocina-asiatica-fusion": "Pairing with Asian and Fusion Cuisine",
    "tapas-aperitivos": "Pairing with Tapas and Aperitifs",
  },
  fr: {
    "carnes-rojas": "Accords avec Viandes Rouges",
    "aves-caza": "Accords avec Volailles et Gibier",
    "pescados-mariscos": "Accords avec Poissons et Fruits de Mer",
    quesos: "Accords avec Fromages",
    "pasta-arroces-legumbres": "Accords avec Pâtes, Riz et Légumineuses",
    "verduras-vegetariana": "Accords avec Légumes et Cuisine Végétarienne",
    "embutidos-charcuteria": "Accords avec Charcuterie",
    "postres-chocolate": "Accords avec Desserts et Chocolat",
    "cocina-asiatica-fusion": "Accords avec Cuisine Asiatique et Fusion",
    "tapas-aperitivos": "Accords avec Tapas et Apéritifs",
  },
  it: {
    "carnes-rojas": "Abbinamento con Carni Rosse",
    "aves-caza": "Abbinamento con Pollame e Selvaggina",
    "pescados-mariscos": "Abbinamento con Pesce e Frutti di Mare",
    quesos: "Abbinamento con Formaggi",
    "pasta-arroces-legumbres": "Abbinamento con Pasta, Riso e Legumi",
    "verduras-vegetariana": "Abbinamento con Verdure e Cucina Vegetariana",
    "embutidos-charcuteria": "Abbinamento con Salumi e Charcuterie",
    "postres-chocolate": "Abbinamento con Dessert e Cioccolato",
    "cocina-asiatica-fusion": "Abbinamento con Cucina Asiatica e Fusion",
    "tapas-aperitivos": "Abbinamento con Tapas e Aperitivi",
  },
  de: {
    "carnes-rojas": "Weinbegleitung zu Rotem Fleisch",
    "aves-caza": "Weinbegleitung zu Geflügel und Wild",
    "pescados-mariscos": "Weinbegleitung zu Fisch und Meeresfrüchten",
    quesos: "Weinbegleitung zu Käse",
    "pasta-arroces-legumbres": "Weinbegleitung zu Pasta, Reis und Hülsenfrüchten",
    "verduras-vegetariana": "Weinbegleitung zu Gemüse und Vegetarischer Küche",
    "embutidos-charcuteria": "Weinbegleitung zu Wurstwaren und Charcuterie",
    "postres-chocolate": "Weinbegleitung zu Desserts und Schokolade",
    "cocina-asiatica-fusion": "Weinbegleitung zu Asiatischer und Fusion-Küche",
    "tapas-aperitivos": "Weinbegleitung zu Tapas und Aperitifs",
  },
  pt: {
    "carnes-rojas": "Harmonização com Carnes Vermelhas",
    "aves-caza": "Harmonização com Aves e Caça",
    "pescados-mariscos": "Harmonização com Peixes e Mariscos",
    quesos: "Harmonização com Queijos",
    "pasta-arroces-legumbres": "Harmonização com Massas, Arroz e Leguminosas",
    "verduras-vegetariana": "Harmonização com Legumes e Cozinha Vegetariana",
    "embutidos-charcuteria": "Harmonização com Enchidos e Charcutaria",
    "postres-chocolate": "Harmonização com Sobremesas e Chocolate",
    "cocina-asiatica-fusion": "Harmonização com Cozinha Asiática e Fusão",
    "tapas-aperitivos": "Harmonização com Tapas e Aperitivos",
  },
};

const buildOverlay = (entry: PairingEntry, lang: WineI18nLang): PairingI18nOverlay => {
  const name = pairingNames[lang][entry.category] || entry.name;
  const category = categoryLabels[lang][entry.category] || entry.category;
  const styles = formatList(entry.recommendedStyles, lang);
  const grapes = formatList(entry.recommendedGrapes, lang);
  const regions = formatList(entry.recommendedRegions, lang);

  const copy: Record<WineI18nLang, PairingI18nOverlay> = {
    en: {
      name,
      description: `${name} helps match ${category.toLowerCase()} with wines that balance intensity, fat, acidity and texture. It gives restaurant teams a clear recommendation path using styles such as ${styles || "versatile wine styles"}.`,
      intro: `For ${category.toLowerCase()}, the strongest recommendations combine dish intensity with the right structure in the glass. Grapes such as ${grapes || "classic varieties"} and regions such as ${regions || "benchmark regions"} give the team reliable starting points.`,
      seo: {
        title: seoTitle(`${name}: wine pairing guide`),
        description: seoDescription(`Wine pairing guide for ${category.toLowerCase()}: principles, safe options and restaurant sales language. Winerim.`),
      },
    },
    fr: {
      name,
      description: `${name} aide à associer ${category.toLowerCase()} avec des vins qui équilibrent intensité, gras, acidité et texture. L'équipe dispose d'un chemin clair de recommandation avec des styles comme ${styles || "des styles polyvalents"}.`,
      intro: `Pour ${category.toLowerCase()}, les meilleures recommandations alignent l'intensité du plat avec la bonne structure dans le verre. Des cépages comme ${grapes || "les cépages classiques"} et des régions comme ${regions || "les régions de référence"} donnent de bons repères.`,
      seo: {
        title: seoTitle(`${name}: guide d'accords mets-vins`),
        description: seoDescription(`Guide d'accords pour ${category.toLowerCase()}: principes, options sûres et langage de vente en restaurant. Winerim.`),
      },
    },
    it: {
      name,
      description: `${name} aiuta ad abbinare ${category.toLowerCase()} con vini capaci di bilanciare intensità, grasso, acidità e texture. La sala ottiene un percorso di raccomandazione chiaro con stili come ${styles || "stili versatili"}.`,
      intro: `Per ${category.toLowerCase()}, le raccomandazioni più efficaci uniscono intensità del piatto e giusta struttura nel bicchiere. Vitigni come ${grapes || "vitigni classici"} e regioni come ${regions || "regioni di riferimento"} sono ottimi punti di partenza.`,
      seo: {
        title: seoTitle(`${name}: guida agli abbinamenti`),
        description: seoDescription(`Guida agli abbinamenti per ${category.toLowerCase()}: principi, opzioni sicure e linguaggio di vendita. Winerim.`),
      },
    },
    de: {
      name,
      description: `${name} verbindet ${category.toLowerCase()} mit Weinen, die Intensität, Fett, Säure und Textur ausbalancieren. Das Serviceteam erhält einen klaren Empfehlungsweg mit Stilen wie ${styles || "vielseitigen Weinstilen"}.`,
      intro: `Bei ${category.toLowerCase()} entstehen starke Empfehlungen aus der Balance von Speiseintensität und Struktur im Glas. Rebsorten wie ${grapes || "klassische Sorten"} und Regionen wie ${regions || "Referenzregionen"} geben sichere Startpunkte.`,
      seo: {
        title: seoTitle(`${name}: Weinbegleitung Guide`),
        description: seoDescription(`Weinbegleitung für ${category.toLowerCase()}: Prinzipien, sichere Optionen und Verkaufssprache im Restaurant. Winerim.`),
      },
    },
    pt: {
      name,
      description: `${name} ajuda a combinar ${category.toLowerCase()} com vinhos que equilibram intensidade, gordura, acidez e textura. A equipa ganha um caminho claro de recomendação com estilos como ${styles || "estilos versáteis"}.`,
      intro: `Para ${category.toLowerCase()}, as melhores recomendações unem intensidade do prato e estrutura certa no copo. Castas como ${grapes || "castas clássicas"} e regiões como ${regions || "regiões de referência"} dão bons pontos de partida.`,
      seo: {
        title: seoTitle(`${name}: guia de harmonização`),
        description: seoDescription(`Guia de harmonização para ${category.toLowerCase()}: princípios, opções seguras e linguagem de venda. Winerim.`),
      },
    },
  };

  return copy[lang];
};

export const pairingOverlays: PairingOverlays = Object.fromEntries(
  pairingEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildOverlay(entry, lang)])
    ),
  ])
) as PairingOverlays;

const applyPairingOverlay = <T extends PairingEntry>(entry: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? pairingOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  return {
    ...entry,
    name: overlay.name,
    description: overlay.description,
    intro: overlay.intro,
    seo: { ...entry.seo, ...overlay.seo },
  };
};

export const getLocalizedPairingEntries = (lang?: string): PairingEntry[] =>
  pairingEntries.map((entry) => applyPairingOverlay(entry, lang));

export const getLocalizedPairingBySlug = (slug: string, lang?: string): PairingEntry | undefined => {
  const entry = pairingEntries.find((pairing) => pairing.slug === slug);
  return entry ? applyPairingOverlay(entry, lang) : undefined;
};

export const getLocalizedCategoryMeta = (category: PairingCategory, lang?: string) => {
  const resolved = resolveWineLang(lang);
  return {
    ...categoryMeta[category],
    label: categoryLabels[resolved][category] || categoryMeta[category].label,
  };
};
