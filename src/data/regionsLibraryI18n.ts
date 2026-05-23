import {
  regionEntries,
  wineCountries,
  type RegionEntry,
  type WineCountry,
} from "./regionsLibrary";
import {
  formatList,
  localizeCountryName,
  normalizeWineOverlayLang,
  resolveWineLang,
  seoDescription,
  seoTitle,
  wineTypeLabels,
  type WineI18nLang,
  type WineI18nOverlay,
  type WineOverlayMap,
  type WineRuntimeLang,
} from "./wineLibraryI18n";

type RegionI18nOverlay = WineI18nOverlay;

interface CountryI18nOverlay {
  name: string;
  intro: string;
  classificationExplainer: string;
  howToReadInCarta: string;
  seo: {
    title: string;
    description: string;
  };
}

type RegionOverlays = WineOverlayMap<RegionI18nOverlay>;
type CountryOverlays = Record<string, Partial<Record<WineI18nLang, CountryI18nOverlay>>>;

const prestigeLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: { "icónico": "icónico", premium: "premium", reconocido: "reconocido", emergente: "emergente", local: "local" },
  en: { "icónico": "iconic", premium: "premium", reconocido: "recognized", emergente: "emerging", local: "local" },
  fr: { "icónico": "emblématique", premium: "premium", reconocido: "reconnu", emergente: "émergent", local: "local" },
  it: { "icónico": "iconico", premium: "premium", reconocido: "riconosciuto", emergente: "emergente", local: "locale" },
  de: { "icónico": "ikonisch", premium: "Premium", reconocido: "anerkannt", emergente: "aufstrebend", local: "lokal" },
  pt: { "icónico": "icónico", premium: "premium", reconocido: "reconhecido", emergente: "emergente", local: "local" },
};

const recognitionLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: { "muy-alto": "muy alto", alto: "alto", medio: "medio", bajo: "bajo", nicho: "de nicho" },
  en: { "muy-alto": "very high", alto: "high", medio: "medium", bajo: "low", nicho: "niche" },
  fr: { "muy-alto": "très forte", alto: "forte", medio: "moyenne", bajo: "faible", nicho: "de niche" },
  it: { "muy-alto": "molto alto", alto: "alto", medio: "medio", bajo: "basso", nicho: "di nicchia" },
  de: { "muy-alto": "sehr hoch", alto: "hoch", medio: "mittel", bajo: "niedrig", nicho: "Nische" },
  pt: { "muy-alto": "muito alto", alto: "alto", medio: "médio", bajo: "baixo", nicho: "de nicho" },
};

const getCountry = (slug: string) => wineCountries.find((country) => country.slug === slug);

const localizeWineTypes = (types: string[], lang: WineRuntimeLang): string => {
  const labels = wineTypeLabels[lang];
  return formatList(types.map((type) => labels[type] || type), lang);
};

const buildRegionOverlay = (entry: RegionEntry, lang: WineI18nLang): RegionI18nOverlay => {
  const country = getCountry(entry.country);
  const countryName = country ? localizeCountryName(country.name, lang) : entry.country;
  const grapes = formatList(entry.mainGrapes, lang);
  const styles = localizeWineTypes(entry.wineTypes, lang);
  const prestige = prestigeLabels[lang][entry.prestige] || entry.prestige;
  const recognition = recognitionLabels[lang][entry.clientRecognition] || entry.clientRecognition;

  const copy: Record<WineI18nLang, RegionI18nOverlay> = {
    en: {
      description: `${entry.name} is a ${entry.denominationType} in ${countryName}, known for ${styles || "distinctive wines"} based on ${grapes || "local grapes"}. It works as a ${prestige} regional signal with ${recognition} guest recognition on the wine list.`,
      intro: `${entry.name} helps a restaurant wine list explain origin, style and commercial role in one clear reference. It is useful for positioning the region, training the floor team and guiding pairings.`,
      seo: {
        title: seoTitle(`${entry.name}: wine region guide`),
        description: seoDescription(`Guide to ${entry.name}: grapes, styles, recognition and wine-list role for restaurants. Winerim wine library.`),
      },
    },
    fr: {
      description: `${entry.name} est une ${entry.denominationType} de ${countryName}, reconnue pour ses ${styles || "vins de caractère"} issus de ${grapes || "cépages locaux"}. Elle agit comme un repère ${prestige} avec une reconnaissance client ${recognition} en carte.`,
      intro: `${entry.name} aide une carte des vins à expliquer origine, style et rôle commercial en un repère clair. C'est utile pour positionner la région, former la salle et guider les accords.`,
      seo: {
        title: seoTitle(`${entry.name}: guide de région viticole`),
        description: seoDescription(`Guide de ${entry.name}: cépages, styles, reconnaissance et rôle en carte pour restaurants. Bibliothèque Winerim.`),
      },
    },
    it: {
      description: `${entry.name} è una ${entry.denominationType} in ${countryName}, nota per ${styles || "vini di carattere"} da ${grapes || "vitigni locali"}. In carta funziona come segnale regionale ${prestige} con riconoscibilità ${recognition}.`,
      intro: `${entry.name} aiuta la carta vini a spiegare origine, stile e ruolo commerciale con un riferimento chiaro. È utile per posizionare la regione, formare la sala e guidare gli abbinamenti.`,
      seo: {
        title: seoTitle(`${entry.name}: guida alla regione vinicola`),
        description: seoDescription(`Guida a ${entry.name}: vitigni, stili, riconoscibilità e ruolo nella carta vini. Biblioteca Winerim.`),
      },
    },
    de: {
      description: `${entry.name} ist eine ${entry.denominationType} in ${countryName}, bekannt für ${styles || "eigenständige Weine"} aus ${grapes || "lokalen Rebsorten"}. Auf der Weinkarte ist sie ein ${prestige} Herkunftssignal mit ${recognition} Gästeerkennung.`,
      intro: `${entry.name} hilft, Herkunft, Stil und kommerzielle Rolle einer Region klar auf der Weinkarte zu erklären. Das unterstützt Positionierung, Teamschulung und passende Empfehlungen.`,
      seo: {
        title: seoTitle(`${entry.name}: Weinregion Guide`),
        description: seoDescription(`Guide zu ${entry.name}: Rebsorten, Stile, Bekanntheit und Rolle auf der Weinkarte. Winerim Bibliothek.`),
      },
    },
    pt: {
      description: `${entry.name} é uma ${entry.denominationType} em ${countryName}, reconhecida por ${styles || "vinhos de carácter"} de ${grapes || "castas locais"}. Na carta funciona como sinal regional ${prestige} com reconhecimento ${recognition} do cliente.`,
      intro: `${entry.name} ajuda a carta de vinhos a explicar origem, estilo e papel comercial num só ponto de referência. É útil para posicionar a região, formar a equipa e orientar harmonizações.`,
      seo: {
        title: seoTitle(`${entry.name}: guia da região vinícola`),
        description: seoDescription(`Guia de ${entry.name}: castas, estilos, reconhecimento e papel na carta de vinhos. Biblioteca Winerim.`),
      },
    },
  };

  return copy[lang];
};

const buildCountryOverlay = (country: WineCountry, lang: WineI18nLang): CountryI18nOverlay => {
  const name = localizeCountryName(country.name, lang);
  const topRegions = formatList(country.topRegions.map((slug) => slug.replace(/-/g, " ")), lang);
  const differentialRegions = formatList(country.differentialRegions.map((slug) => slug.replace(/-/g, " ")), lang);

  const copy: Record<WineI18nLang, CountryI18nOverlay> = {
    en: {
      name,
      intro: `${name} brings together ${country.denominationsCount.toLocaleString()} denominations and ${country.bodegasCount.toLocaleString()} wineries in the Winerim library. Its strongest signals on a restaurant wine list include ${topRegions || "benchmark regions"}, while ${differentialRegions || "emerging regions"} add discovery and range.`,
      classificationExplainer: `${name} is organized through ${country.denominationTypes}. Use these categories to explain origin, quality level and the amount of flexibility producers have in each wine style.`,
      howToReadInCarta: `${name} should be read by balancing familiar regions with discovery areas. The strongest regions create trust, while differential areas help the wine list show expertise and better value.`,
      seo: {
        title: seoTitle(`${name}: wine regions and denominations`),
        description: seoDescription(`Guide to ${name} wine regions: denominations, main zones, commercial role and wine-list strategy for restaurants.`),
      },
    },
    fr: {
      name,
      intro: `${name} réunit ${country.denominationsCount.toLocaleString()} appellations et ${country.bodegasCount.toLocaleString()} domaines dans la bibliothèque Winerim. Ses repères les plus forts en carte incluent ${topRegions || "les régions de référence"}, tandis que ${differentialRegions || "les régions émergentes"} ajoutent découverte et profondeur.`,
      classificationExplainer: `${name} s'organise autour de ${country.denominationTypes}. Ces catégories aident à expliquer l'origine, le niveau de qualité et la liberté dont dispose le producteur selon le style.`,
      howToReadInCarta: `${name} se lit en équilibrant régions connues et zones de découverte. Les références créent la confiance, les régions différenciantes montrent expertise et valeur.`,
      seo: {
        title: seoTitle(`${name}: régions et appellations`),
        description: seoDescription(`Guide des régions viticoles de ${name}: appellations, zones clés, rôle commercial et stratégie de carte.`),
      },
    },
    it: {
      name,
      intro: `${name} riunisce ${country.denominationsCount.toLocaleString()} denominazioni e ${country.bodegasCount.toLocaleString()} cantine nella biblioteca Winerim. I segnali più forti in carta includono ${topRegions || "le regioni di riferimento"}, mentre ${differentialRegions || "le aree emergenti"} aggiungono scoperta e profondità.`,
      classificationExplainer: `${name} si organizza attraverso ${country.denominationTypes}. Queste categorie aiutano a spiegare origine, livello qualitativo e libertà produttiva nei diversi stili.`,
      howToReadInCarta: `${name} va letto bilanciando regioni note e aree di scoperta. Le denominazioni forti creano fiducia, quelle differenziali mostrano competenza e valore.`,
      seo: {
        title: seoTitle(`${name}: regioni e denominazioni`),
        description: seoDescription(`Guida alle regioni vinicole di ${name}: denominazioni, zone chiave, ruolo commerciale e strategia in carta.`),
      },
    },
    de: {
      name,
      intro: `${name} umfasst in der Winerim Bibliothek ${country.denominationsCount.toLocaleString()} Herkunftsbezeichnungen und ${country.bodegasCount.toLocaleString()} Weingüter. Starke Signale auf der Weinkarte sind ${topRegions || "wichtige Regionen"}, während ${differentialRegions || "aufstrebende Gebiete"} Entdeckung und Tiefe bieten.`,
      classificationExplainer: `${name} ist über ${country.denominationTypes} strukturiert. Diese Kategorien erklären Herkunft, Qualitätsniveau und den Spielraum der Erzeuger je nach Weinstil.`,
      howToReadInCarta: `${name} funktioniert auf der Weinkarte durch die Balance aus bekannten Regionen und Entdeckungsgebieten. Bekannte Namen schaffen Vertrauen, differenzierende Gebiete zeigen Fachwissen und Wert.`,
      seo: {
        title: seoTitle(`${name}: Weinregionen und Herkunft`),
        description: seoDescription(`Guide zu Weinregionen in ${name}: Herkunft, wichtige Zonen, kommerzielle Rolle und Weinkartenstrategie.`),
      },
    },
    pt: {
      name,
      intro: `${name} reúne ${country.denominationsCount.toLocaleString()} denominações e ${country.bodegasCount.toLocaleString()} adegas na biblioteca Winerim. Os sinais mais fortes na carta incluem ${topRegions || "regiões de referência"}, enquanto ${differentialRegions || "regiões emergentes"} acrescentam descoberta e profundidade.`,
      classificationExplainer: `${name} organiza-se através de ${country.denominationTypes}. Estas categorias ajudam a explicar origem, nível de qualidade e margem de trabalho dos produtores em cada estilo.`,
      howToReadInCarta: `${name} deve ser lido equilibrando regiões conhecidas e zonas de descoberta. As regiões fortes criam confiança, enquanto as diferenciais mostram critério e valor.`,
      seo: {
        title: seoTitle(`${name}: regiões e denominações`),
        description: seoDescription(`Guia das regiões vinícolas de ${name}: denominações, zonas principais, papel comercial e estratégia de carta.`),
      },
    },
  };

  return copy[lang];
};

export const regionOverlays: RegionOverlays = Object.fromEntries(
  regionEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildRegionOverlay(entry, lang)])
    ),
  ])
) as RegionOverlays;

export const countryOverlays: CountryOverlays = Object.fromEntries(
  wineCountries.map((country) => [
    country.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildCountryOverlay(country, lang)])
    ),
  ])
) as CountryOverlays;

const applyRegionOverlay = <T extends RegionEntry>(entry: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? regionOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  return {
    ...entry,
    description: overlay.description,
    intro: overlay.intro,
    seo: { ...entry.seo, ...overlay.seo },
  };
};

const applyCountryOverlay = <T extends WineCountry>(country: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? countryOverlays[country.slug]?.[overlayLang] : undefined;
  if (!overlay) return country;
  return {
    ...country,
    name: overlay.name,
    intro: overlay.intro,
    classificationExplainer: overlay.classificationExplainer,
    howToReadInCarta: overlay.howToReadInCarta,
    seo: { ...country.seo, ...overlay.seo },
  };
};

export const getLocalizedCountries = (lang?: string): WineCountry[] =>
  wineCountries.map((country) => applyCountryOverlay(country, lang));

export const getLocalizedCountryBySlug = (slug: string, lang?: string): WineCountry | undefined => {
  const country = wineCountries.find((entry) => entry.slug === slug);
  return country ? applyCountryOverlay(country, lang) : undefined;
};

export const getLocalizedRegions = (lang?: string): RegionEntry[] =>
  regionEntries.map((entry) => applyRegionOverlay(entry, lang));

export const getLocalizedRegionBySlug = (slug: string, lang?: string): RegionEntry | undefined => {
  const entry = regionEntries.find((region) => region.slug === slug);
  return entry ? applyRegionOverlay(entry, lang) : undefined;
};

export const getLocalizedRegionsByCountry = (countrySlug: string, lang?: string): RegionEntry[] =>
  regionEntries.filter((region) => region.country === countrySlug).map((entry) => applyRegionOverlay(entry, lang));

export const getResolvedWineLang = resolveWineLang;
