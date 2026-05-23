import { type SupportedLang } from "./types";

export function detectLangFromPath(pathname: string): SupportedLang {
  if (pathname.startsWith("/en/") || pathname === "/en") return "en";
  if (pathname.startsWith("/it/") || pathname === "/it") return "it";
  if (pathname.startsWith("/fr/") || pathname === "/fr") return "fr";
  if (pathname.startsWith("/de/") || pathname === "/de") return "de" as SupportedLang;
  if (pathname.startsWith("/pt/") || pathname === "/pt") return "pt" as SupportedLang;
  return "es";
}
