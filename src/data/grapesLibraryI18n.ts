import {
  grapeCatalog,
  grapeEntries,
  type GrapeCatalogEntry,
  type GrapeColor,
  type GrapeEntry,
} from "./grapesLibrary";
import {
  formatList,
  localizeCountryList,
  normalizeWineOverlayLang,
  resolveWineLang,
  seoDescription,
  seoTitle,
  type WineI18nLang,
  type WineI18nOverlay,
  type WineOverlayMap,
  type WineRuntimeLang,
} from "./wineLibraryI18n";

type GrapeI18nOverlay = WineI18nOverlay;

type GrapeOverlays = WineOverlayMap<GrapeI18nOverlay>;

export type LocalizedGrapeCatalogEntry = GrapeCatalogEntry & {
  description: string;
  intro: string;
  seo: {
    title: string;
    description: string;
  };
};

const colorLabelsByLang: Record<WineRuntimeLang, Record<GrapeColor, string>> = {
  es: { tinta: "tinta", blanca: "blanca", rosada: "rosada" },
  en: { tinta: "red", blanca: "white", rosada: "pink" },
  fr: { tinta: "rouge", blanca: "blanc", rosada: "rosé" },
  it: { tinta: "rossa", blanca: "bianca", rosada: "rosata" },
  de: { tinta: "rote", blanca: "weiße", rosada: "roséfarbene" },
  pt: { tinta: "tinta", blanca: "branca", rosada: "rosada" },
};

const buildOverlay = (entry: GrapeCatalogEntry, lang: WineI18nLang): GrapeI18nOverlay => {
  const countries = localizeCountryList(entry.countries, lang);
  const regions = formatList(entry.keyRegions, lang);
  const color = colorLabelsByLang[lang][entry.color];

  const copy: Record<WineI18nLang, GrapeI18nOverlay> = {
    en: {
      description: `${entry.name} is a ${color} wine grape linked to ${countries || "classic wine regions"}. It is especially relevant in ${regions || "benchmark regions"}, where it helps explain style, guest recognition and pairing choices on a restaurant wine list.`,
      intro: `${entry.name} gives the wine team a clear varietal reference for explaining origin, structure and service style. It connects grape, region and guest expectations with concise, confident language.`,
      seo: {
        title: seoTitle(`${entry.name}: grape variety guide`),
        description: seoDescription(`Guide to ${entry.name}: key regions, sensory profile and wine-list role for restaurants. Winerim wine library.`),
      },
    },
    fr: {
      description: `${entry.name} est un cépage ${color} associé à ${countries || "des régions viticoles de référence"}. Il se lit particulièrement bien dans ${regions || "les grandes régions"}, où il éclaire le style, la reconnaissance client et les accords en carte.`,
      intro: `${entry.name} donne à l'équipe de salle un repère variétal clair pour expliquer origine, structure et style de service. Ce profil aide à relier cépage, territoire et attentes du client avec précision.`,
      seo: {
        title: seoTitle(`${entry.name}: guide du cépage`),
        description: seoDescription(`Guide de ${entry.name}: régions clés, profil sensoriel et rôle en carte pour restaurants. Bibliothèque Winerim.`),
      },
    },
    it: {
      description: `${entry.name} è un vitigno ${color} legato a ${countries || "regioni vinicole di riferimento"}. Nei territori come ${regions || "le aree classiche"} aiuta a spiegare stile, riconoscibilità e abbinamenti in carta.`,
      intro: `${entry.name} offre alla sala un riferimento varietale chiaro per spiegare origine, struttura e stile di servizio. Il profilo collega vitigno, territorio e aspettative dell'ospite con un linguaggio preciso.`,
      seo: {
        title: seoTitle(`${entry.name}: guida al vitigno`),
        description: seoDescription(`Guida a ${entry.name}: regioni chiave, profilo sensoriale e ruolo nella carta vini per ristoranti. Biblioteca Winerim.`),
      },
    },
    de: {
      description: `${entry.name} ist eine ${color} Rebsorte mit Bezug zu ${countries || "wichtigen Weinregionen"}. In Regionen wie ${regions || "klassischen Herkunftsgebieten"} erklärt sie Stil, Gästewahrnehmung und passende Speiseempfehlungen auf der Weinkarte.`,
      intro: `${entry.name} bietet dem Serviceteam einen klaren Rebsortenanker, um Herkunft, Struktur und Servicestil zu erklären. Das Profil verbindet Rebsorte, Region und Gästeerwartung in verständlicher Sprache.`,
      seo: {
        title: seoTitle(`${entry.name}: Rebsortenführer`),
        description: seoDescription(`Guide zu ${entry.name}: Schlüsselregionen, sensorisches Profil und Rolle auf der Weinkarte. Winerim Bibliothek.`),
      },
    },
    pt: {
      description: `${entry.name} é uma casta ${color} associada a ${countries || "regiões vinícolas de referência"}. Em regiões como ${regions || "zonas clássicas"} ajuda a explicar estilo, reconhecimento do cliente e harmonizações na carta de vinhos.`,
      intro: `${entry.name} oferece à equipa de sala uma referência varietal clara para explicar origem, estrutura e estilo de serviço. O perfil liga casta, região e expectativas do cliente com linguagem simples e profissional.`,
      seo: {
        title: seoTitle(`${entry.name}: guia da casta`),
        description: seoDescription(`Guia de ${entry.name}: regiões-chave, perfil sensorial e papel na carta de vinhos para restaurantes. Biblioteca Winerim.`),
      },
    },
  };

  return copy[lang];
};

const allGrapesBySlug = new Map<string, GrapeCatalogEntry>();
grapeCatalog.forEach((entry) => allGrapesBySlug.set(entry.slug, entry));
grapeEntries.forEach((entry) => allGrapesBySlug.set(entry.slug, entry));

export const grapeOverlays: GrapeOverlays = Object.fromEntries(
  Array.from(allGrapesBySlug.values()).map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildOverlay(entry, lang)])
    ),
  ])
) as GrapeOverlays;

const applyGrapeOverlay = <T extends GrapeEntry>(entry: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? grapeOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  return {
    ...entry,
    description: overlay.description,
    intro: overlay.intro,
    seo: { ...entry.seo, ...overlay.seo },
  };
};

export const getLocalizedGrape = (slug: string, lang?: string): GrapeEntry | undefined => {
  const entry = grapeEntries.find((grape) => grape.slug === slug);
  return entry ? applyGrapeOverlay(entry, lang) : undefined;
};

export const getLocalizedGrapeEntries = (lang?: string): GrapeEntry[] =>
  grapeEntries.map((entry) => applyGrapeOverlay(entry, lang));

export const getLocalizedGrapeCatalogEntry = (
  slug: string,
  lang?: string
): LocalizedGrapeCatalogEntry | undefined => {
  const entry = grapeCatalog.find((grape) => grape.slug === slug);
  if (!entry) return undefined;
  const resolved = resolveWineLang(lang);
  const overlayLang = normalizeWineOverlayLang(resolved);
  const overlay = overlayLang ? grapeOverlays[entry.slug]?.[overlayLang] : undefined;

  if (!overlay) {
    return {
      ...entry,
      description: entry.tastingNotes,
      intro: entry.tastingNotes,
      seo: {
        title: `${entry.name}: Variedad de uva | Biblioteca Winerim`,
        description: `${entry.name}: ${entry.tastingNotes} Regiones: ${entry.keyRegions.join(", ")}. Guía Winerim.`,
      },
    };
  }

  return {
    ...entry,
    tastingNotes: overlay.description,
    description: overlay.description,
    intro: overlay.intro,
    seo: overlay.seo,
  };
};

export const getLocalizedGrapeCatalog = (lang?: string): LocalizedGrapeCatalogEntry[] =>
  grapeCatalog.map((entry) => getLocalizedGrapeCatalogEntry(entry.slug, lang)!);
