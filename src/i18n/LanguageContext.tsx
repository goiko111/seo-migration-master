import { createContext, useContext } from "react";
import { SupportedLang, DEFAULT_LANG, TranslationDict } from "./types";
import es from "./translations/es";

export interface LanguageContextValue {
  lang: SupportedLang;
  t: TranslationDict;
  /** Get localized path for a given ES route */
  localePath: (esPath: string) => string;
  /** Get the ES equivalent of the current path (for hreflang) */
  allLangPaths: (esPath: string) => { lang: string; url: string }[];
  /** Override detected language for DB-backed pages whose lang differs from the URL */
  setLangOverride: (lang: SupportedLang | null) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  t: es,
  localePath: (p) => p,
  allLangPaths: () => [],
  setLangOverride: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
