import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SupportedLang, DEFAULT_LANG, SUPPORTED_LANGS, ROUTE_MAP, TranslationDict } from "./types";
import es from "./translations/es";
import en from "./translations/en";
import it from "./translations/it";
import fr from "./translations/fr";
import de from "./translations/de";
import pt from "./translations/pt";

const TRANSLATIONS: Record<SupportedLang, TranslationDict> = { es, en, it, fr, de, pt };

interface LanguageContextValue {
  lang: SupportedLang;
  t: TranslationDict;
  /** Get localized path for a given ES route */
  localePath: (esPath: string) => string;
  /** Get the ES equivalent of the current path (for hreflang) */
  allLangPaths: (esPath: string) => { lang: string; url: string }[];
  /** Override the detected language (used by SeoPage when DB lang differs from URL) */
  setLangOverride: (lang: SupportedLang | null) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  t: es,
  localePath: (p) => p,
  allLangPaths: () => [],
  setLangOverride: () => {},
});

export function detectLangFromPath(pathname: string): SupportedLang {
  if (pathname.startsWith("/en/") || pathname === "/en") return "en";
  if (pathname.startsWith("/it/") || pathname === "/it") return "it";
  if (pathname.startsWith("/fr/") || pathname === "/fr") return "fr";
  if (pathname.startsWith("/de/") || pathname === "/de") return "de";
  if (pathname.startsWith("/pt/") || pathname === "/pt") return "pt";
  return "es";
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [langOverride, setLangOverrideState] = useState<SupportedLang | null>(null);

  const detectedLang = detectLangFromPath(pathname);
  const lang = langOverride || detectedLang;
  const t = TRANSLATIONS[lang];

  // Reset override when pathname changes (navigating away from SEO page)
  useEffect(() => {
    setLangOverrideState(null);
  }, [pathname]);

  // Update <html lang> attribute whenever the effective language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLangOverride = useCallback((newLang: SupportedLang | null) => {
    if (newLang && SUPPORTED_LANGS.includes(newLang)) {
      setLangOverrideState(newLang);
    } else {
      setLangOverrideState(null);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    t,
    localePath: (esPath: string) => {
      if (lang === "es") return esPath;
      return ROUTE_MAP[lang][esPath] || `/${lang}${esPath}`;
    },
    allLangPaths: (esPath: string) => {
      const SITE = "https://winerim.wine";
      return [
        { lang: "es", url: `${SITE}${esPath}` },
        { lang: "x-default", url: `${SITE}${esPath}` },
        { lang: "en", url: `${SITE}${ROUTE_MAP.en[esPath] || `/en${esPath}`}` },
        { lang: "it", url: `${SITE}${ROUTE_MAP.it[esPath] || `/it${esPath}`}` },
        { lang: "fr", url: `${SITE}${ROUTE_MAP.fr[esPath] || `/fr${esPath}`}` },
        { lang: "de", url: `${SITE}${ROUTE_MAP.de[esPath] || `/de${esPath}`}` },
        { lang: "pt", url: `${SITE}${ROUTE_MAP.pt[esPath] || `/pt${esPath}`}` },
      ];
    },
    setLangOverride,
  }), [lang, t, setLangOverride]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
