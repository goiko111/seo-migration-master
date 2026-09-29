import type { SupportedLang } from "@/i18n/types";

export type IntegrationProviderSlug = "agora" | "revo-xef";

const BASES: Record<SupportedLang, string> = {
  es: "/integraciones",
  en: "/en/integrations",
  it: "/it/integrazioni",
  fr: "/fr/integrations",
  de: "/de/integrationen",
  pt: "/pt/integracoes",
};

export const integrationProviderPath = (provider: IntegrationProviderSlug, lang: SupportedLang) =>
  `${BASES[lang]}/${provider}`;

export const integrationProviderHreflang = (provider: IntegrationProviderSlug) => {
  const site = "https://winerim.wine";
  return [
    { lang: "es", url: `${site}${integrationProviderPath(provider, "es")}` },
    { lang: "x-default", url: `${site}${integrationProviderPath(provider, "es")}` },
    { lang: "en", url: `${site}${integrationProviderPath(provider, "en")}` },
  ];
};
