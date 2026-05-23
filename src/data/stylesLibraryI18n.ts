import {
  familyMeta,
  styleCatalog,
  styleEntries,
  type StyleCatalogEntry,
  type StyleEntry,
  type StyleFamily,
  type StyleSubtype,
} from "./stylesLibrary";
import {
  familyLabels,
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

interface StyleI18nOverlay extends WineI18nOverlay {
  name: string;
}

type StyleOverlays = WineOverlayMap<StyleI18nOverlay>;

const styleNames: Record<WineRuntimeLang, Record<string, string>> = {
  es: {},
  en: {
    tinto: "Red Wine",
    blanco: "White Wine",
    rosado: "Rosé Wine",
    espumoso: "Sparkling Wine",
    generoso: "Fortified Wine",
    dulce: "Natural Sweet Wine",
    naranja: "Orange Wine",
    eco: "Organic, Biodynamic and Natural Wine",
  },
  fr: {
    tinto: "Vin Rouge",
    blanco: "Vin Blanc",
    rosado: "Vin Rosé",
    espumoso: "Vin Effervescent",
    generoso: "Vin Fortifié",
    dulce: "Vin Doux Naturel",
    naranja: "Vin Orange",
    eco: "Vin Bio, Biodynamique et Naturel",
  },
  it: {
    tinto: "Vino Rosso",
    blanco: "Vino Bianco",
    rosado: "Vino Rosato",
    espumoso: "Spumante",
    generoso: "Vino Fortificato",
    dulce: "Vino Dolce Naturale",
    naranja: "Orange Wine",
    eco: "Vino Biologico, Biodinamico e Naturale",
  },
  de: {
    tinto: "Rotwein",
    blanco: "Weißwein",
    rosado: "Roséwein",
    espumoso: "Schaumwein",
    generoso: "Verstärkter Wein",
    dulce: "Natursüßer Wein",
    naranja: "Orange Wine",
    eco: "Biologischer, Biodynamischer und Naturbelassener Wein",
  },
  pt: {
    tinto: "Vinho Tinto",
    blanco: "Vinho Branco",
    rosado: "Vinho Rosé",
    espumoso: "Espumante",
    generoso: "Vinho Fortificado",
    dulce: "Vinho Doce Natural",
    naranja: "Vinho Laranja",
    eco: "Vinho Biológico, Biodinâmico e Natural",
  },
};

const familyDescriptions: Record<WineRuntimeLang, Record<StyleFamily, string>> = {
  es: Object.fromEntries(
    Object.entries(familyMeta).map(([family, meta]) => [family, meta.description])
  ) as Record<StyleFamily, string>,
  en: {
    tinto: "The broadest style family for structure, tannin and gastronomic depth.",
    blanco: "Freshness, acidity, texture and aromatic precision for the wine list.",
    rosado: "The bridge between white freshness and red-wine structure.",
    espumoso: "Bubbles, celebration and versatile pairing power.",
    generoso: "Oxidative depth, fortification and historic service rituals.",
    dulce: "Concentration, balance and memorable dessert or cheese pairings.",
    naranja: "Skin-contact whites with texture, tannin and contemporary appeal.",
    eco: "Sustainable farming, low intervention and terroir-driven storytelling.",
  },
  fr: {
    tinto: "La famille la plus large pour structure, tanins et profondeur gastronomique.",
    blanco: "Fraîcheur, acidité, texture et précision aromatique pour la carte.",
    rosado: "Le pont entre la fraîcheur du blanc et la structure du rouge.",
    espumoso: "Bulles, célébration et grande polyvalence à table.",
    generoso: "Profondeur oxydative, fortification et rituels de service historiques.",
    dulce: "Concentration, équilibre et accords mémorables avec desserts ou fromages.",
    naranja: "Blancs de macération avec texture, tanins et attrait contemporain.",
    eco: "Viticulture durable, faible intervention et récit de terroir.",
  },
  it: {
    tinto: "La famiglia più ampia per struttura, tannino e profondità gastronomica.",
    blanco: "Freschezza, acidità, texture e precisione aromatica per la carta.",
    rosado: "Il ponte tra la freschezza del bianco e la struttura del rosso.",
    espumoso: "Bollicine, celebrazione e grande versatilità negli abbinamenti.",
    generoso: "Profondità ossidativa, fortificazione e rituali storici di servizio.",
    dulce: "Concentrazione, equilibrio e abbinamenti memorabili con dessert o formaggi.",
    naranja: "Bianchi macerati con texture, tannino e appeal contemporaneo.",
    eco: "Viticoltura sostenibile, bassa interventistica e racconto del terroir.",
  },
  de: {
    tinto: "Die breiteste Stilfamilie für Struktur, Tannin und gastronomische Tiefe.",
    blanco: "Frische, Säure, Textur und aromatische Präzision für die Weinkarte.",
    rosado: "Die Brücke zwischen Weißweinfrische und Rotweinstruktur.",
    espumoso: "Perlage, Anlass und vielseitige Speisenbegleitung.",
    generoso: "Oxidative Tiefe, Aufspritung und historische Servicerituale.",
    dulce: "Konzentration, Balance und starke Kombinationen mit Dessert oder Käse.",
    naranja: "Maischevergorene Weißweine mit Textur, Tannin und moderner Relevanz.",
    eco: "Nachhaltiger Anbau, geringe Intervention und Terroir-Erzählung.",
  },
  pt: {
    tinto: "A família mais ampla para estrutura, tanino e profundidade gastronómica.",
    blanco: "Frescura, acidez, textura e precisão aromática para a carta.",
    rosado: "A ponte entre a frescura do branco e a estrutura do tinto.",
    espumoso: "Bolhas, celebração e grande versatilidade à mesa.",
    generoso: "Profundidade oxidativa, fortificação e rituais históricos de serviço.",
    dulce: "Concentração, equilíbrio e harmonizações memoráveis com sobremesas ou queijos.",
    naranja: "Brancos de maceração com textura, tanino e apelo contemporâneo.",
    eco: "Viticultura sustentável, baixa intervenção e narrativa de terroir.",
  },
};

const getStyleName = (entry: StyleEntry, lang: WineRuntimeLang) =>
  styleNames[lang][entry.slug] || entry.name;

const localizeSubtype = (subtype: StyleSubtype, parent: StyleEntry, lang: WineRuntimeLang): StyleSubtype => {
  if (lang === "es") return subtype;
  const parentName = getStyleName(parent, lang);
  const descriptions: Record<WineI18nLang, string> = {
    en: `${subtype.name} is a subtype within ${parentName}. It gives the wine list a more precise service cue around temperature, texture and pairing expectations.`,
    fr: `${subtype.name} est un sous-style de ${parentName}. Il donne à la carte un repère plus précis sur température, texture et attentes d'accord.`,
    it: `${subtype.name} è un sottostile di ${parentName}. Offre alla carta un'indicazione più precisa su temperatura, texture e aspettative di abbinamento.`,
    de: `${subtype.name} ist ein Unterstil von ${parentName}. Er präzisiert Temperatur, Textur und Pairing-Erwartung auf der Weinkarte.`,
    pt: `${subtype.name} é um subtipo de ${parentName}. Dá à carta uma indicação mais precisa de temperatura, textura e expectativa de harmonização.`,
  };
  return { ...subtype, description: descriptions[lang] };
};

const buildOverlay = (entry: StyleEntry, lang: WineI18nLang): StyleI18nOverlay => {
  const name = getStyleName(entry, lang);
  const grapes = formatList(entry.mainGrapes, lang);
  const regions = formatList(entry.keyRegions, lang);
  const family = familyLabels[lang][entry.family] || entry.family;

  const copy: Record<WineI18nLang, StyleI18nOverlay> = {
    en: {
      name,
      description: `${name} is a ${family.toLowerCase()} style where service, structure and pairing expectations shape the guest experience. It is especially useful with grapes such as ${grapes || "classic varieties"} and regions such as ${regions || "benchmark regions"}.`,
      intro: `${name} helps restaurants organize the wine list by experience, not only by origin. It clarifies temperature, glassware, body, acidity and the occasions where the style can sell better.`,
      seo: {
        title: seoTitle(`${name}: wine style guide`),
        description: seoDescription(`Guide to ${name}: service, sensory profile, grapes, regions and pairings for restaurant wine lists.`),
      },
    },
    fr: {
      name,
      description: `${name} est un style de ${family.toLowerCase()} où service, structure et attentes d'accord façonnent l'expérience client. Il fonctionne particulièrement avec ${grapes || "des cépages classiques"} et des régions comme ${regions || "les références du style"}.`,
      intro: `${name} aide les restaurants à organiser la carte par expérience, pas seulement par origine. Il clarifie température, verrerie, corps, acidité et occasions de vente.`,
      seo: {
        title: seoTitle(`${name}: guide du style de vin`),
        description: seoDescription(`Guide de ${name}: service, profil sensoriel, cépages, régions et accords pour cartes de restaurant.`),
      },
    },
    it: {
      name,
      description: `${name} è uno stile di ${family.toLowerCase()} in cui servizio, struttura e aspettative di abbinamento definiscono l'esperienza dell'ospite. Funziona bene con ${grapes || "vitigni classici"} e regioni come ${regions || "riferimenti dello stile"}.`,
      intro: `${name} aiuta i ristoranti a organizzare la carta per esperienza, non solo per origine. Chiarisce temperatura, calice, corpo, acidità e momenti in cui lo stile vende meglio.`,
      seo: {
        title: seoTitle(`${name}: guida allo stile di vino`),
        description: seoDescription(`Guida a ${name}: servizio, profilo sensoriale, vitigni, regioni e abbinamenti per carte vini.`),
      },
    },
    de: {
      name,
      description: `${name} ist ein Stil innerhalb von ${family}, bei dem Service, Struktur und Pairing-Erwartung das Gästeerlebnis prägen. Besonders relevant ist er mit ${grapes || "klassischen Rebsorten"} und Regionen wie ${regions || "stilprägenden Herkünften"}.`,
      intro: `${name} hilft Restaurants, die Weinkarte nach Erlebnis statt nur nach Herkunft zu strukturieren. Der Stil klärt Temperatur, Glas, Körper, Säure und passende Verkaufsmomente.`,
      seo: {
        title: seoTitle(`${name}: Weinstil Guide`),
        description: seoDescription(`Guide zu ${name}: Service, sensorisches Profil, Rebsorten, Regionen und Pairings für Weinkarten.`),
      },
    },
    pt: {
      name,
      description: `${name} é um estilo de ${family.toLowerCase()} em que serviço, estrutura e expectativa de harmonização moldam a experiência do cliente. É especialmente útil com ${grapes || "castas clássicas"} e regiões como ${regions || "referências do estilo"}.`,
      intro: `${name} ajuda restaurantes a organizar a carta por experiência, não apenas por origem. Clarifica temperatura, copo, corpo, acidez e momentos em que o estilo vende melhor.`,
      seo: {
        title: seoTitle(`${name}: guia do estilo de vinho`),
        description: seoDescription(`Guia de ${name}: serviço, perfil sensorial, castas, regiões e harmonizações para cartas de restaurante.`),
      },
    },
  };

  return copy[lang];
};

export const styleOverlays: StyleOverlays = Object.fromEntries(
  styleEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildOverlay(entry, lang)])
    ),
  ])
) as StyleOverlays;

const applyStyleOverlay = <T extends StyleEntry>(entry: T, lang?: string): T => {
  const resolved = resolveWineLang(lang);
  const overlayLang = normalizeWineOverlayLang(resolved);
  const overlay = overlayLang ? styleOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  return {
    ...entry,
    name: overlay.name,
    description: overlay.description,
    intro: overlay.intro,
    subtypes: entry.subtypes.map((subtype) => localizeSubtype(subtype, entry, resolved)),
    seo: { ...entry.seo, ...overlay.seo },
  };
};

export const getLocalizedStyleEntries = (lang?: string): StyleEntry[] =>
  styleEntries.map((entry) => applyStyleOverlay(entry, lang));

export const getLocalizedStyleBySlug = (slug: string, lang?: string): StyleEntry | undefined => {
  const entry = styleEntries.find((style) => style.slug === slug);
  return entry ? applyStyleOverlay(entry, lang) : undefined;
};

export const getLocalizedStyleCatalog = (lang?: string): StyleCatalogEntry[] => {
  const resolved = resolveWineLang(lang);
  if (resolved === "es") return styleCatalog;
  return getLocalizedStyleEntries(resolved).flatMap((entry) =>
    entry.subtypes.map((subtype) => ({
      slug: subtype.slug,
      name: subtype.name,
      family: entry.family,
      description: subtype.description,
      servingTemp: entry.servingTemp,
      mainGrapes: entry.mainGrapes.slice(0, 5),
      keyRegions: entry.keyRegions.slice(0, 5),
    }))
  );
};

export const getLocalizedStyleCatalogEntry = (
  slug: string,
  lang?: string
): StyleCatalogEntry | undefined =>
  getLocalizedStyleCatalog(lang).find((entry) => entry.slug === slug);

export const getAllLocalizedStyles = (lang?: string): (StyleEntry | StyleCatalogEntry)[] => {
  const entries = getLocalizedStyleEntries(lang);
  const catalog = getLocalizedStyleCatalog(lang);
  const fullSlugs = new Set(entries.map((entry) => entry.slug));
  return [...entries, ...catalog.filter((entry) => !fullSlugs.has(entry.slug))];
};

export const getLocalizedFamilyMeta = (family: StyleFamily, lang?: string) => {
  const resolved = resolveWineLang(lang);
  return {
    ...familyMeta[family],
    label: familyLabels[resolved][family] || familyMeta[family].label,
    description: familyDescriptions[resolved][family] || familyMeta[family].description,
  };
};
