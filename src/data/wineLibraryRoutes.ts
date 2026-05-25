export type WineI18nLang = "en" | "fr" | "it" | "de" | "pt";
export type WineRuntimeLang = "es" | WineI18nLang;

export const WINE_I18N_LANGS: WineI18nLang[] = ["en", "fr", "it", "de", "pt"];
export const WINE_RUNTIME_LANGS: WineRuntimeLang[] = ["es", ...WINE_I18N_LANGS];

export const resolveWineLang = (lang?: string): WineRuntimeLang => {
  if (lang === "en" || lang === "fr" || lang === "it" || lang === "de" || lang === "pt") return lang;
  return "es";
};

export const normalizeWineOverlayLang = (lang?: string): WineI18nLang | undefined => {
  const resolved = resolveWineLang(lang);
  return resolved === "es" ? undefined : resolved;
};

const WINE_ROUTE_BASES: Record<WineRuntimeLang, string> = {
  es: "/biblioteca-vino",
  en: "/en/wine-library",
  fr: "/fr/bibliotheque-vin",
  it: "/it/biblioteca-vino",
  de: "/de/weinbibliothek",
  pt: "/pt/biblioteca-vinho",
};

const WINE_SECTION_MAP: Record<WineRuntimeLang, Record<string, string>> = {
  es: {
    regiones: "regiones",
    uvas: "uvas",
    estilos: "estilos",
    maridajes: "maridajes",
    "guia-servicio": "guia-servicio",
    glosario: "glosario",
  },
  en: {
    regiones: "regions",
    uvas: "grapes",
    estilos: "styles",
    maridajes: "pairings",
    "guia-servicio": "service-guide",
    glosario: "glossary",
  },
  fr: {
    regiones: "regions",
    uvas: "cepages",
    estilos: "styles-de-vin",
    maridajes: "accords",
    "guia-servicio": "guide-service",
    glosario: "glossaire",
  },
  it: {
    regiones: "regioni",
    uvas: "vitigni",
    estilos: "stili",
    maridajes: "abbinamenti",
    "guia-servicio": "guida-servizio",
    glosario: "glossario",
  },
  de: {
    regiones: "regionen",
    uvas: "rebsorten",
    estilos: "weinstile",
    maridajes: "weinbegleitung",
    "guia-servicio": "service-guide",
    glosario: "glossar",
  },
  pt: {
    regiones: "regioes",
    uvas: "castas",
    estilos: "estilos",
    maridajes: "harmonizacoes",
    "guia-servicio": "guia-servico",
    glosario: "glossario",
  },
};

const normalizePathname = (path: string): string => {
  let pathname = path;
  try {
    pathname = path.startsWith("http") ? new URL(path).pathname : path;
  } catch {
    pathname = path;
  }
  return pathname.replace(/\/+$/, "") || "/";
};

export const getWineLibraryPath = (lang: string | undefined, path: string): string => {
  const resolved = resolveWineLang(lang);
  if (path === "/biblioteca-vino") return WINE_ROUTE_BASES[resolved];

  const match = path.match(/^\/biblioteca-vino\/([^/]+)(.*)$/);
  if (!match) return resolved === "es" ? path : `/${resolved}${path}`;

  const [, section, rest] = match;
  const localizedSection = WINE_SECTION_MAP[resolved][section] || section;
  return `${WINE_ROUTE_BASES[resolved]}/${localizedSection}${rest}`;
};

export const getWineLibraryEsPath = (path: string): string | null => {
  const pathname = normalizePathname(path);

  for (const lang of WINE_RUNTIME_LANGS) {
    const base = WINE_ROUTE_BASES[lang];
    if (pathname === base) return "/biblioteca-vino";
    if (!pathname.startsWith(`${base}/`)) continue;

    const relative = pathname.slice(base.length + 1);
    const [localizedSection, ...restParts] = relative.split("/");
    const sectionEntries = Object.entries(WINE_SECTION_MAP[lang]);
    const esSection = sectionEntries.find(([, localized]) => localized === localizedSection)?.[0] || localizedSection;
    const rest = restParts.length > 0 ? `/${restParts.join("/")}` : "";
    return `/biblioteca-vino/${esSection}${rest}`;
  }

  return null;
};

export const getWineLibraryUrl = (lang: string | undefined, path: string): string =>
  `https://winerim.wine${getWineLibraryPath(lang, path)}`;

export const getWineLibraryHreflang = (path: string): { lang: string; url: string }[] => {
  const entries = WINE_RUNTIME_LANGS.map((lang) => ({
    lang,
    url: getWineLibraryUrl(lang, path),
  }));
  return [...entries, { lang: "x-default", url: getWineLibraryUrl("es", path) }];
};
