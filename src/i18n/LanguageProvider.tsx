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

const splitPathSuffix = (path: string): { basePath: string; suffix: string } => {
  const idx = path.search(/[?#]/);
  if (idx === -1) return { basePath: path, suffix: "" };
  return { basePath: path.slice(0, idx), suffix: path.slice(idx) };
};

const localizeEsPath = (esPath: string, targetLang: SupportedLang): string => {
  const { basePath, suffix } = splitPathSuffix(esPath);
  if (targetLang === "es") return `${basePath}${suffix}`;
  const mapped = ROUTE_MAP[targetLang][basePath] || `/${targetLang}${basePath}`;
  return `${mapped}${suffix}`;
};

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
    localePath: (esPath: string) => localizeEsPath(esPath, lang),
    allLangPaths: (esPath: string) => {
      const SITE = "https://winerim.wine";
      const { basePath, suffix } = splitPathSuffix(esPath);
      return [
        { lang: "es", url: `${SITE}${basePath}${suffix}` },
        { lang: "x-default", url: `${SITE}${basePath}${suffix}` },
        { lang: "en", url: `${SITE}${localizeEsPath(esPath, "en")}` },
        { lang: "it", url: `${SITE}${localizeEsPath(esPath, "it")}` },
        { lang: "fr", url: `${SITE}${localizeEsPath(esPath, "fr")}` },
        { lang: "de", url: `${SITE}${localizeEsPath(esPath, "de")}` },
        { lang: "pt", url: `${SITE}${localizeEsPath(esPath, "pt")}` },
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
