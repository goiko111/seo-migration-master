import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext";
import { ROUTE_MAP, SUPPORTED_LANGS, type SupportedLang, type TranslationDict } from "./types";
import { detectLangFromPath } from "./languageDetection";
import es from "./translations/es";
import en from "./translations/en";
import it from "./translations/it";
import fr from "./translations/fr";
import de from "./translations/de";
import pt from "./translations/pt";

const TRANSLATIONS: Record<string, TranslationDict> = { es, en, it, fr, de, pt };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [langOverride, setLangOverrideState] = useState<SupportedLang | null>(null);
  const detectedLang = detectLangFromPath(pathname);
  const lang = langOverride || detectedLang;
  const t = TRANSLATIONS[lang] || es;

  useEffect(() => {
    setLangOverrideState(null);
  }, [pathname]);

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
