import {
  getStrategicWineLibraryRouteItems,
  type StrategicWineLibraryHub,
} from "@/components/biblioteca/StrategicWineLibraryRoutes";
import { getWineLibraryUrl, resolveWineLang, type WineRuntimeLang } from "@/data/wineLibraryI18n";

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
