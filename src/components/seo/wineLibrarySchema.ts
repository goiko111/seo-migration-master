import {
  getStrategicWineLibraryRouteItems,
  type StrategicWineLibraryHub,
} from "@/components/biblioteca/StrategicWineLibraryRoutes";
import { getWineLibraryUrl, resolveWineLang, type WineRuntimeLang } from "@/data/wineLibraryI18n";
import { resolveLibraryLink, type StrategicWineLibraryLinkItem } from "@/data/wineLibraryLinks";

const SITE = "https://winerim.wine";

const homeLabels: Record<WineRuntimeLang, string> = {
  es: "Inicio",
  en: "Home",
  it: "Home",
  fr: "Accueil",
  de: "Startseite",
  pt: "Início",
};

const termSetNames: Record<WineRuntimeLang, string> = {
  es: "Biblioteca del Vino Winerim",
  en: "Winerim Wine Library",
  it: "Biblioteca del Vino Winerim",
  fr: "Bibliothèque du Vin Winerim",
  de: "Winerim Weinbibliothek",
  pt: "Biblioteca do Vinho Winerim",
};

const routeTypeNames: Record<WineRuntimeLang, Record<string, string>> = {
  es: { grape: "Uva", region: "Región", style: "Estilo", pairing: "Maridaje" },
  en: { grape: "Grape", region: "Region", style: "Style", pairing: "Pairing" },
  it: { grape: "Vitigno", region: "Regione", style: "Stile", pairing: "Abbinamento" },
  fr: { grape: "Cépage", region: "Région", style: "Style", pairing: "Accord" },
  de: { grape: "Rebsorte", region: "Region", style: "Stil", pairing: "Pairing" },
  pt: { grape: "Casta", region: "Região", style: "Estilo", pairing: "Harmonização" },
};

interface WineLibraryCollectionSchemaInput {
  lang: string;
  hub: StrategicWineLibraryHub;
  title: string;
  description: string;
  path: string;
  libraryName: string;
}

export type WineLibrarySchemaNode = Record<string, unknown>;

export const uniqueWineLibrarySchemaStrings = (values: Array<string | undefined>) => (
  Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))))
);

export const wineLibrarySchemaPropertyValue = (name: string, value?: string | string[]) => {
  const normalizedValue = Array.isArray(value) ? uniqueWineLibrarySchemaStrings(value).join(", ") : value?.trim();
  if (!normalizedValue) return null;
  return { "@type": "PropertyValue", name, value: normalizedValue };
};

export const buildWineLibrarySchemaMentions = (
  items: StrategicWineLibraryLinkItem[],
  lang: string,
  limit = 18,
): WineLibrarySchemaNode[] => {
  const seenUrls = new Set<string>();
  return items.reduce<WineLibrarySchemaNode[]>((mentions, item) => {
    const resolved = resolveLibraryLink(item.name, item.hint);
    if (!resolved) return mentions;
    const url = getWineLibraryUrl(lang, resolved.path);
    if (seenUrls.has(url)) return mentions;
    seenUrls.add(url);
    mentions.push({ "@type": "Thing", name: item.name, url });
    return mentions;
  }, []).slice(0, limit);
};

interface WineLibraryDetailSchemaInput {
  pageUrl: string;
  lang: string;
  name: string;
  description: string;
  termAnchor: string;
  termSetPath: string;
  termSetName: string;
  termCode: string;
  additionalType: string;
  keywords?: string[];
  alternateName?: string[];
  additionalProperties?: Array<Record<string, unknown>>;
  mentions?: WineLibrarySchemaNode[];
  disambiguatingDescription?: string;
}

export const buildWineLibraryDetailSchema = ({
  pageUrl,
  lang,
  name,
  description,
  termAnchor,
  termSetPath,
  termSetName,
  termCode,
  additionalType,
  keywords = [],
  alternateName = [],
  additionalProperties = [],
  mentions = [],
  disambiguatingDescription,
}: WineLibraryDetailSchemaInput): WineLibrarySchemaNode => {
  const termId = `${pageUrl}#${termAnchor}`;
  const pageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const termSetUrl = getWineLibraryUrl(lang, termSetPath);
  const normalizedKeywords = uniqueWineLibrarySchemaStrings([name, ...keywords]);
  const normalizedAlternateNames = uniqueWineLibrarySchemaStrings(alternateName)
    .filter((item) => item.toLowerCase() !== name.toLowerCase());

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": pageId,
        "@type": "WebPage",
        name,
        description,
        url: pageUrl,
        inLanguage: lang,
        mainEntity: { "@id": termId },
      },
      {
        "@id": articleId,
        "@type": "Article",
        headline: name,
        description,
        ...(normalizedKeywords.length ? { keywords: normalizedKeywords.join(", ") } : {}),
        author: { "@type": "Organization", name: "Winerim", url: SITE },
        publisher: { "@type": "Organization", name: "Winerim", url: SITE },
        mainEntityOfPage: { "@id": pageId },
        about: { "@id": termId },
        ...(mentions.length ? { mentions } : {}),
      },
      {
        "@id": `${termSetUrl}#term-set`,
        "@type": "DefinedTermSet",
        name: termSetName,
        url: termSetUrl,
        inLanguage: lang,
      },
      {
        "@id": termId,
        "@type": "DefinedTerm",
        name,
        ...(normalizedAlternateNames.length ? { alternateName: normalizedAlternateNames } : {}),
        termCode,
        additionalType,
        description,
        inDefinedTermSet: { "@id": `${termSetUrl}#term-set` },
        ...(additionalProperties.length ? { additionalProperty: additionalProperties } : {}),
        ...(disambiguatingDescription ? { disambiguatingDescription } : {}),
      },
    ],
  };
};

export const buildWineLibraryCollectionSchema = ({
  lang,
  hub,
  title,
  description,
  path,
  libraryName,
}: WineLibraryCollectionSchemaInput): Record<string, unknown> => {
  const resolvedLang = resolveWineLang(lang);
  const canonical = getWineLibraryUrl(resolvedLang, path);
  const libraryUrl = getWineLibraryUrl(resolvedLang, "/biblioteca-vino");
  const homeUrl = `${SITE}${resolvedLang === "es" ? "/" : `/${resolvedLang}`}`;
  const termSetId = `${libraryUrl}#term-set`;
  const itemListId = `${canonical}#itemlist`;
  const items = getStrategicWineLibraryRouteItems(hub, resolvedLang);
  const breadcrumbs = [
    { name: homeLabels[resolvedLang], item: homeUrl },
    ...(hub === "library" ? [] : [{ name: libraryName, item: libraryUrl }]),
    { name: title, item: canonical },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${canonical}#webpage`,
        "@type": "CollectionPage",
        name: title,
        headline: title,
        description,
        url: canonical,
        inLanguage: resolvedLang,
        isPartOf: { "@id": `${SITE}#website` },
        about: { "@id": termSetId },
        mainEntity: { "@id": itemListId },
        publisher: { "@id": `${SITE}#organization` },
      },
      {
        "@id": termSetId,
        "@type": "DefinedTermSet",
        name: termSetNames[resolvedLang],
        url: libraryUrl,
        inLanguage: resolvedLang,
      },
      {
        "@id": itemListId,
        "@type": "ItemList",
        name: title,
        description,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `${SITE}${item.path}`,
          item: {
            "@type": "DefinedTerm",
            name: item.label,
            url: `${SITE}${item.path}`,
            termCode: item.type,
            additionalType: routeTypeNames[resolvedLang][item.type],
            description: item.groupDescription,
            inDefinedTermSet: { "@id": termSetId },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.item,
        })),
      },
    ],
  };
};
