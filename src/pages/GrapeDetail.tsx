import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Grape, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, MapPin } from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import RelatedWineLibraryLinks from "@/components/biblioteca/RelatedWineLibraryLinks";
import WineLibraryOperationalDepth from "@/components/biblioteca/WineLibraryOperationalDepth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  hasFullEntry,
  colorLabels,
  type CartaRole,
  type GrapeCatalogEntry,
  type GrapeColor,
  type GrapeEntry,
} from "@/data/grapesLibrary";
import { getLocalizedGrape, getLocalizedGrapeCatalogEntry } from "@/data/grapesLibraryI18n";
import { getGrapeEditorialProfile, type LocalizedGrapeEditorialProfile } from "@/data/wineLibraryEditorial";
import { getStrategicWineLibraryLinks, resolveLibraryLink, type StrategicWineLibraryLinkItem } from "@/data/wineLibraryLinks";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const levelLabelsByLang: Record<string, Record<string, string>> = {
  es: {
    baja: "Baja", media: "Media", alta: "Alta", "muy-alta": "Muy alta",
    ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
    sutil: "Sutil",
    fácil: "Fácil", difícil: "Difícil", "muy-difícil": "Muy difícil",
    internacional: "Internacional", nacional: "Nacional", local: "Local", diferencial: "Diferencial",
  },
  en: {
    baja: "Low", media: "Medium", alta: "High", "muy-alta": "Very high",
    ligero: "Light", medio: "Medium", alto: "Full", "muy-alto": "Very full",
    sutil: "Subtle",
    fácil: "Easy", difícil: "Difficult", "muy-difícil": "Very difficult",
    internacional: "International", nacional: "National", local: "Local", diferencial: "Differential",
  },
  it: {
    baja: "Bassa", media: "Media", alta: "Alta", "muy-alta": "Molto alta",
    ligero: "Leggero", medio: "Medio", alto: "Pieno", "muy-alto": "Molto pieno",
    sutil: "Sottile",
    fácil: "Facile", difícil: "Difficile", "muy-difícil": "Molto difficile",
    internacional: "Internazionale", nacional: "Nazionale", local: "Locale", diferencial: "Differenziale",
  },
  fr: {
    baja: "Faible", media: "Moyenne", alta: "Élevée", "muy-alta": "Très élevée",
    ligero: "Léger", medio: "Moyen", alto: "Corsé", "muy-alto": "Très corsé",
    sutil: "Subtil",
    fácil: "Facile", difícil: "Difficile", "muy-difícil": "Très difficile",
    internacional: "International", nacional: "National", local: "Local", diferencial: "Différenciant",
  },
  de: {
    baja: "Niedrig", media: "Mittel", alta: "Hoch", "muy-alta": "Sehr hoch",
    ligero: "Leicht", medio: "Mittel", alto: "Kräftig", "muy-alto": "Sehr kräftig",
    sutil: "Subtil",
    fácil: "Einfach", difícil: "Schwierig", "muy-difícil": "Sehr schwierig",
    internacional: "International", nacional: "National", local: "Lokal", diferencial: "Differenzierend",
  },
  pt: {
    baja: "Baixa", media: "Média", alta: "Alta", "muy-alta": "Muito alta",
    ligero: "Leve", medio: "Médio", alto: "Encorpado", "muy-alto": "Muito encorpado",
    sutil: "Sutil",
    fácil: "Fácil", difícil: "Difícil", "muy-difícil": "Muito difícil",
    internacional: "Internacional", nacional: "Nacional", local: "Local", diferencial: "Diferencial",
  },
};

const colorLabelsByLang: Record<string, Record<GrapeColor, string>> = {
  es: { tinta: "Tinta", blanca: "Blanca", rosada: "Rosada" },
  en: { tinta: "Red", blanca: "White", rosada: "Rosé" },
  it: { tinta: "Rossa", blanca: "Bianca", rosada: "Rosata" },
  fr: { tinta: "Rouge", blanca: "Blanc", rosada: "Rosé" },
  de: { tinta: "Rot", blanca: "Weiß", rosada: "Rosé" },
  pt: { tinta: "Tinta", blanca: "Branca", rosada: "Rosada" },
};

const cartaRoleLabelsByLang: Record<string, Record<CartaRole, string>> = {
  es: {
    conocida: "Conocida",
    diferencial: "Diferencial",
    premium: "Premium",
    descubrimiento: "Descubrimiento",
    valor: "Valor",
    identitaria: "Identitaria",
  },
  en: {
    conocida: "Recognizable",
    diferencial: "Differentiating",
    premium: "Premium",
    descubrimiento: "Discovery",
    valor: "Value",
    identitaria: "Identity",
  },
  it: {
    conocida: "Riconoscibile",
    diferencial: "Differenziante",
    premium: "Premium",
    descubrimiento: "Scoperta",
    valor: "Valore",
    identitaria: "Identitaria",
  },
  fr: {
    conocida: "Reconnue",
    diferencial: "Différenciante",
    premium: "Premium",
    descubrimiento: "Découverte",
    valor: "Valeur",
    identitaria: "Identitaire",
  },
  de: {
    conocida: "Bekannt",
    diferencial: "Differenzierend",
    premium: "Premium",
    descubrimiento: "Entdeckung",
    valor: "Wert",
    identitaria: "Identität",
  },
  pt: {
    conocida: "Reconhecida",
    diferencial: "Diferencial",
    premium: "Premium",
    descubrimiento: "Descoberta",
    valor: "Valor",
    identitaria: "Identitária",
  },
};

const cartaRoleTooltipsByLang: Record<string, Record<CartaRole, string>> = {
  es: {
    conocida: "Variedad que el comensal identifica sin ayuda. Aporta seguridad a la carta.",
    diferencial: "Variedad que distingue tu carta de la competencia. Genera curiosidad.",
    premium: "Variedad asociada a vinos de alta gama. Eleva la percepción de la carta.",
    descubrimiento: "Variedad poco conocida que sorprende. Ideal para clientes aventureros.",
    valor: "Variedad que ofrece buena relación calidad-precio. Ancla de la carta.",
    identitaria: "Variedad que conecta con un territorio o tradición. Aporta autenticidad.",
  },
  en: {
    conocida: "A grape guests can recognize without help. It brings confidence to the list.",
    diferencial: "A grape that separates the list from competitors and creates curiosity.",
    premium: "A grape associated with high-end wines. It raises perceived list quality.",
    descubrimiento: "A discovery grape for curious guests and hand-selling moments.",
    valor: "A grape that can deliver strong value and anchor a category.",
    identitaria: "A grape tied to territory or tradition. It adds authenticity.",
  },
  it: {
    conocida: "Vitigno che l'ospite riconosce senza aiuto. Porta sicurezza alla carta.",
    diferencial: "Vitigno che differenzia la carta e genera curiosita.",
    premium: "Vitigno associato a vini di fascia alta. Alza la percezione della carta.",
    descubrimiento: "Vitigno di scoperta per ospiti curiosi e vendita guidata.",
    valor: "Vitigno con forte rapporto qualita-prezzo. Ancora una categoria.",
    identitaria: "Vitigno legato a territorio o tradizione. Aggiunge autenticita.",
  },
  fr: {
    conocida: "Cépage que le client reconnait sans aide. Il apporte de la confiance.",
    diferencial: "Cépage qui distingue la carte et suscite la curiosité.",
    premium: "Cépage associé aux vins haut de gamme. Il élève la perception de la carte.",
    descubrimiento: "Cépage de découverte pour clients curieux et vente guidée.",
    valor: "Cépage avec bon rapport qualité-prix. Il ancre une catégorie.",
    identitaria: "Cépage lié à un territoire ou une tradition. Il apporte de l'authenticité.",
  },
  de: {
    conocida: "Rebsorte, die Gäste ohne Hilfe erkennen. Sie gibt der Karte Sicherheit.",
    diferencial: "Rebsorte, die die Karte unterscheidet und Neugier erzeugt.",
    premium: "Rebsorte mit Premium-Wahrnehmung. Sie hebt die Qualität der Karte.",
    descubrimiento: "Entdecker-Rebsorte für neugierige Gäste und aktiven Service.",
    valor: "Rebsorte mit starkem Preis-Leistungs-Signal. Sie trägt eine Kategorie.",
    identitaria: "Rebsorte mit Herkunfts- oder Traditionsbezug. Sie bringt Authentizität.",
  },
  pt: {
    conocida: "Casta que o cliente reconhece sem ajuda. Traz segurança à carta.",
    diferencial: "Casta que diferencia a carta e gera curiosidade.",
    premium: "Casta associada a vinhos de gama alta. Eleva a perceção da carta.",
    descubrimiento: "Casta de descoberta para clientes curiosos e venda assistida.",
    valor: "Casta com boa relação qualidade-preço. Ancora uma categoria.",
    identitaria: "Casta ligada a território ou tradição. Acrescenta autenticidade.",
  },
};

const grapeDetailCopy: Record<string, {
  alsoKnownAs: string;
  acidity: string;
  body: string;
  aromaticIntensity: string;
  commercialDifficulty: string;
  scope: string;
  perceivedOnList: string;
  bestRegionsForSales: string;
  competingDescription: string;
  allVarieties: string;
  muscadetClarifier: string;
  bringToListTitle: (name: string) => string;
}> = {
  es: {
    alsoKnownAs: "También conocida como",
    acidity: "Acidez",
    body: "Cuerpo",
    aromaticIntensity: "Intensidad aromática",
    commercialDifficulty: "Dificultad comercial",
    scope: "Alcance",
    perceivedOnList: "Cómo se percibe en carta",
    bestRegionsForSales: "Regiones donde más vende",
    competingDescription: "Variedades que ocupan un espacio similar en carta o percepción.",
    allVarieties: "Todas las variedades",
    muscadetClarifier: "En esta ficha, Muscadet se trata como la uva Melon de Bourgogne. La región Muscadet se enlaza cuando el contexto es denominación u origen.",
    bringToListTitle: (name) => `Lleva ${name} a tu carta con criterio`,
  },
  en: {
    alsoKnownAs: "Also known as",
    acidity: "Acidity",
    body: "Body",
    aromaticIntensity: "Aromatic intensity",
    commercialDifficulty: "Commercial difficulty",
    scope: "Scope",
    perceivedOnList: "How it is perceived on the list",
    bestRegionsForSales: "Regions where it sells best",
    competingDescription: "Varieties that occupy a similar space on the list or in guest perception.",
    allVarieties: "All varieties",
    muscadetClarifier: "Here, Muscadet is treated as the Melon de Bourgogne grape. The Muscadet region is linked when the context is appellation or origin.",
    bringToListTitle: (name) => `Bring ${name} into your wine list with criteria`,
  },
  it: {
    alsoKnownAs: "Conosciuta anche come",
    acidity: "Acidità",
    body: "Corpo",
    aromaticIntensity: "Intensità aromatica",
    commercialDifficulty: "Difficoltà commerciale",
    scope: "Portata",
    perceivedOnList: "Come viene percepita in carta",
    bestRegionsForSales: "Regioni dove vende di più",
    competingDescription: "Vitigni che occupano uno spazio simile in carta o nella percezione.",
    allVarieties: "Tutti i vitigni",
    muscadetClarifier: "In questa scheda, Muscadet è trattato come il vitigno Melon de Bourgogne. La regione Muscadet viene collegata quando il contesto è denominazione o origine.",
    bringToListTitle: (name) => `Porta ${name} nella tua carta con criterio`,
  },
  fr: {
    alsoKnownAs: "Aussi connu comme",
    acidity: "Acidité",
    body: "Corps",
    aromaticIntensity: "Intensité aromatique",
    commercialDifficulty: "Difficulté commerciale",
    scope: "Portée",
    perceivedOnList: "Comment il est perçu en carte",
    bestRegionsForSales: "Régions où il se vend le mieux",
    competingDescription: "Cépages occupant un espace similaire en carte ou en perception client.",
    allVarieties: "Tous les cépages",
    muscadetClarifier: "Dans cette fiche, Muscadet est traité comme le cépage Melon de Bourgogne. La région Muscadet est liée lorsque le contexte est l'appellation ou l'origine.",
    bringToListTitle: (name) => `Intégrez ${name} à votre carte avec méthode`,
  },
  de: {
    alsoKnownAs: "Auch bekannt als",
    acidity: "Säure",
    body: "Körper",
    aromaticIntensity: "Aromatische Intensität",
    commercialDifficulty: "Kommerzielle Schwierigkeit",
    scope: "Reichweite",
    perceivedOnList: "Wahrnehmung auf der Weinkarte",
    bestRegionsForSales: "Regionen mit der stärksten Verkaufswirkung",
    competingDescription: "Rebsorten, die auf der Karte oder in der Wahrnehmung eine ähnliche Rolle einnehmen.",
    allVarieties: "Alle Rebsorten",
    muscadetClarifier: "Auf dieser Seite wird Muscadet als die Rebsorte Melon de Bourgogne behandelt. Die Region Muscadet wird verlinkt, wenn es um Appellation oder Herkunft geht.",
    bringToListTitle: (name) => `${name} gezielt auf die Weinkarte bringen`,
  },
  pt: {
    alsoKnownAs: "Também conhecida como",
    acidity: "Acidez",
    body: "Corpo",
    aromaticIntensity: "Intensidade aromática",
    commercialDifficulty: "Dificuldade comercial",
    scope: "Alcance",
    perceivedOnList: "Como é percebida na carta",
    bestRegionsForSales: "Regiões onde vende melhor",
    competingDescription: "Castas que ocupam um espaço semelhante na carta ou na perceção do cliente.",
    allVarieties: "Todas as castas",
    muscadetClarifier: "Nesta ficha, Muscadet é tratado como a casta Melon de Bourgogne. A região Muscadet é ligada quando o contexto é denominação ou origem.",
    bringToListTitle: (name) => `Leve ${name} para a sua carta com critério`,
  },
};

type WineLibraryUi = ReturnType<typeof getWineLibraryUi>;
type GrapeSchemaEntry = GrapeEntry | GrapeCatalogEntry;
type SchemaNode = Record<string, unknown>;

const isFullGrapeEntry = (entry: GrapeSchemaEntry): entry is GrapeEntry => "pairings" in entry;

const uniqueStrings = (values: Array<string | undefined>) => (
  Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))))
);

const propertyValue = (name: string, value?: string | string[]) => {
  const normalizedValue = Array.isArray(value) ? uniqueStrings(value).join(", ") : value?.trim();
  if (!normalizedValue) return null;
  return { "@type": "PropertyValue", name, value: normalizedValue };
};

const buildGrapeSchemaMentions = (entry: GrapeSchemaEntry, lang: string): SchemaNode[] => {
  const candidates: StrategicWineLibraryLinkItem[] = [
    ...getStrategicWineLibraryLinks("grape", entry.slug),
    ...entry.keyRegions.map((name) => ({ name, hint: "region" as const })),
  ];

  if (isFullGrapeEntry(entry)) {
    candidates.push(
      ...entry.bestRegionsForSales.map((name) => ({ name, hint: "region" as const })),
      ...entry.competingVarieties.map((name) => ({ name, hint: "grape" as const })),
      ...entry.relatedGrapes.map((name) => ({ name, hint: "grape" as const })),
      ...entry.pairings.map((name) => ({ name, hint: "pairing" as const })),
    );
  }

  const seenUrls = new Set<string>();
  return candidates.reduce<SchemaNode[]>((mentions, item) => {
    const resolved = resolveLibraryLink(item.name, item.hint);
    if (!resolved) return mentions;
    const url = getWineLibraryUrl(lang, resolved.path);
    if (seenUrls.has(url)) return mentions;
    seenUrls.add(url);
    mentions.push({ "@type": "Thing", name: item.name, url });
    return mentions;
  }, []).slice(0, 18);
};

const buildGrapeDetailSchema = ({
  entry,
  lang,
  pageUrl,
  description,
  editorial,
}: {
  entry: GrapeSchemaEntry;
  lang: string;
  pageUrl: string;
  description: string;
  editorial?: LocalizedGrapeEditorialProfile;
}) => {
  const termId = `${pageUrl}#grape-term`;
  const articleId = `${pageUrl}#article`;
  const pageId = `${pageUrl}#webpage`;
  const termSetUrl = getWineLibraryUrl(lang, "/biblioteca-vino/uvas");
  const synonyms = uniqueStrings([
    ...entry.synonyms,
    entry.slug === "muscadet" ? "Muscadet" : undefined,
    entry.slug === "muscadet" ? "Melon de Bourgogne" : undefined,
  ]).filter((synonym) => synonym.toLowerCase() !== entry.name.toLowerCase());
  const regionValues = isFullGrapeEntry(entry)
    ? uniqueStrings([...entry.keyRegions, ...entry.bestRegionsForSales])
    : entry.keyRegions;
  const keywordValues = uniqueStrings([
    entry.name,
    ...entry.synonyms,
    ...entry.countries,
    ...entry.keyRegions,
    ...(isFullGrapeEntry(entry) ? [...entry.pairings, ...entry.relatedGrapes] : []),
  ]);
  const additionalProperties = [
    propertyValue("Color", entry.color),
    propertyValue("Countries", entry.countries),
    propertyValue("Key regions", regionValues),
    isFullGrapeEntry(entry) ? propertyValue("Acidity", entry.acidity) : null,
    isFullGrapeEntry(entry) ? propertyValue("Body", entry.body) : null,
    isFullGrapeEntry(entry) ? propertyValue("Aromatic intensity", entry.aromaticIntensity) : null,
    isFullGrapeEntry(entry) ? propertyValue("Restaurant list roles", entry.cartaRole) : null,
    editorial ? propertyValue("Service profile", editorial.title) : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));
  const mentions = buildGrapeSchemaMentions(entry, lang);
  const aboutTerm = {
    "@id": termId,
    "@type": "DefinedTerm",
    name: entry.name,
    ...(synonyms.length ? { alternateName: synonyms } : {}),
    termCode: entry.slug,
    additionalType: "Wine grape variety",
    description,
    inDefinedTermSet: { "@id": `${termSetUrl}#term-set` },
    ...(additionalProperties.length ? { additionalProperty: additionalProperties } : {}),
    ...(entry.slug === "muscadet"
      ? { disambiguatingDescription: "Muscadet can describe the Loire appellation; this page models the grape entity Melon de Bourgogne." }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": pageId,
        "@type": "WebPage",
        name: entry.name,
        description,
        url: pageUrl,
        inLanguage: lang,
        mainEntity: { "@id": termId },
      },
      {
        "@id": articleId,
        "@type": "Article",
        headline: entry.name,
        description,
        keywords: keywordValues.join(", "),
        author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
        publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
        mainEntityOfPage: { "@id": pageId },
        about: { "@id": termId },
        ...(mentions.length ? { mentions } : {}),
      },
      {
        "@id": `${termSetUrl}#term-set`,
        "@type": "DefinedTermSet",
        name: "Winerim Wine Library Grape Varieties",
        url: termSetUrl,
      },
      aboutTerm,
    ],
  };
};

const GrapeDetail = () => {
  const { grape: grapeSlug } = useParams<{ grape: string }>();
  const { lang } = useLanguage();
  const langKey = String(lang);
  const ui = getWineLibraryUi(lang);
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const fullEntry = grapeSlug ? getLocalizedGrape(grapeSlug, lang) : undefined;
  const catalogEntry = grapeSlug ? getLocalizedGrapeCatalogEntry(grapeSlug, lang) : undefined;

  // JSON-LD
  useEffect(() => {
    const entry = fullEntry || catalogEntry;
    if (!entry) return;
    const pageUrl = getWineLibraryUrl(lang, `/biblioteca-vino/uvas/${entry.slug}`);
    const description = fullEntry?.description || entry.tastingNotes;
    const editorial = getGrapeEditorialProfile(entry.slug, langKey, entry.name);
    const schema = document.createElement("script");
    schema.id = "grape-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify(buildGrapeDetailSchema({ entry, lang, pageUrl, description, editorial }));
    document.head.appendChild(schema);
    return () => { document.getElementById("grape-detail-jsonld")?.remove(); };
  }, [fullEntry, catalogEntry, grapeSlug, lang, langKey]);

  if (!fullEntry && !catalogEntry) {
    return <Navigate to={linkTo("/biblioteca-vino/uvas")} replace />;
  }

  // Render full entry if available, otherwise a simplified catalog view
  const urlFor = (path: string) => getWineLibraryUrl(lang, path);

  if (fullEntry) {
    return (
      <TooltipProvider delayDuration={150}>
        <FullGrapeDetail data={fullEntry} linkTo={linkTo} urlFor={urlFor} ui={ui} langKey={langKey} />
      </TooltipProvider>
    );
  }
  return <CatalogGrapeDetail data={catalogEntry!} linkTo={linkTo} urlFor={urlFor} ui={ui} langKey={langKey} />;
};

/* ═══════════════════════════════════════════════════════════════════════
   FULL DETAIL — Complete Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const FullGrapeDetail = ({ data, linkTo, urlFor, ui, langKey }: { data: NonNullable<ReturnType<typeof getLocalizedGrape>>; linkTo: (path: string) => string; urlFor: (path: string) => string; ui: WineLibraryUi; langKey: string }) => {
  const labels = levelLabelsByLang[langKey] || levelLabelsByLang.en;
  const roleLabels = cartaRoleLabelsByLang[langKey] || cartaRoleLabelsByLang.en;
  const roleTooltips = cartaRoleTooltipsByLang[langKey] || cartaRoleTooltipsByLang.en;
  const colorLabel = colorLabelsByLang[langKey]?.[data.color] || colorLabels[data.color].label;
  const copy = grapeDetailCopy[langKey] || grapeDetailCopy.en;
  const editorial = getGrapeEditorialProfile(data.slug, langKey, data.name);
  const faqs = editorial ? [...data.faqs, ...editorial.faqs] : data.faqs;

  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={data.seo.title}
      description={data.seo.description}
      url={urlFor(`/biblioteca-vino/uvas/${data.slug}`)}
      type="article"
      hreflang={getWineLibraryHreflang(`/biblioteca-vino/uvas/${data.slug}`)}
    />
    <Navbar />

    {/* HERO */}
    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
          { label: ui.sections.grapes, href: linkTo("/biblioteca-vino/uvas") },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabel}</span>
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-wine/10 text-wine px-3 py-1.5 rounded-full capitalize cursor-help">{labels[data.scope] || data.scope}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-xs">
              {data.scope === "internacional" && "Variedad reconocida y cultivada en todo el mundo. Fácil de identificar para cualquier comensal."}
              {data.scope === "nacional" && "Variedad reconocida principalmente en su país de origen. Apela al público local y conocedor."}
              {data.scope === "local" && "Variedad de alcance regional. Ideal para diferenciación y storytelling de territorio."}
              {data.scope === "diferencial" && "Variedad que destaca por su singularidad. Permite posicionar la carta como experta."}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-secondary/50 px-3 py-1.5 rounded-full cursor-help">{ui.detail.recognition}: {labels[data.clientRecognition] || data.clientRecognition}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-xs">
              {data.clientRecognition === "muy-alto" && "La mayoría de comensales la reconocen por nombre. Se vende sola."}
              {data.clientRecognition === "alto" && "Reconocida por el público aficionado. No requiere explicación."}
              {data.clientRecognition === "medio" && "Conocida por quien sabe de vino. Puede necesitar una breve descripción en carta."}
              {data.clientRecognition === "bajo" && "Poco conocida fuera de su zona. Requiere storytelling o recomendación de sala."}
              {data.clientRecognition === "nicho" && "Variedad de culto. Solo la reconocen expertos. Gran potencial diferenciador."}
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mb-4">
            {copy.alsoKnownAs}: <span className="italic">{data.synonyms.join(", ")}</span>
          </motion.p>
        )}

        {data.slug === "muscadet" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-sm text-muted-foreground mb-4 max-w-2xl">
            {copy.muscadetClarifier}
          </motion.p>
        )}

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {data.description}
        </motion.p>
      </div>
    </section>

    {/* INTRO */}
    <section className="section-padding pt-8">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-muted-foreground text-lg leading-relaxed">{data.intro}</p>
        </ScrollReveal>
      </div>
    </section>

    {/* SENSORY PROFILE */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.sensoryProfile}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <FactCard icon={<Wine size={16} />} label={copy.acidity} value={labels[data.acidity]} />
          <FactCard icon={<Target size={16} />} label={copy.body} value={labels[data.body]} />
          <FactCard icon={<Grape size={16} />} label={copy.aromaticIntensity} value={labels[data.aromaticIntensity]} />
          <FactCard icon={<TrendingUp size={16} />} label={ui.detail.recognition} value={labels[data.clientRecognition]} />
          <FactCard icon={<Users size={16} />} label={copy.commercialDifficulty} value={labels[data.commercialDifficulty]} />
          <FactCard icon={<MapPin size={16} />} label={copy.scope} value={labels[data.scope]} />
        </div>

        <ScrollReveal>
          <h3 className="font-heading text-lg font-semibold mb-4">{ui.detail.aromas}</h3>
          <div className="flex flex-wrap gap-2">
            {data.aromas.map((a) => (
              <span key={a} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{a}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* REGIONS & COUNTRIES */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.countries}</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.keyRegions}</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <LinkedTag key={r} name={r} hint="region" />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* WINERIM LAYER */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb size={18} className="text-wine" />
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{ui.detail.cartaVision}</p>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.perceivedOnList}</h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal><WinerimBlock title={ui.detail.cartaPerception} content={data.cartaPerception} /></ScrollReveal>
          <ScrollReveal delay={0.05}><WinerimBlock title={ui.detail.whenItHelps} content={data.whenItHelps} /></ScrollReveal>
          <ScrollReveal delay={0.1}><WinerimBlock title={ui.detail.clientProfile} content={data.clientProfile} /></ScrollReveal>
          <ScrollReveal delay={0.15}><WinerimBlock title={ui.detail.sellByStrategy} content={data.sellByStrategy} /></ScrollReveal>
          <ScrollReveal delay={0.2}><WinerimBlock title={ui.detail.whenToWriteBig} content={data.whenToWriteBig} /></ScrollReveal>
        </div>

        <ScrollReveal delay={0.25} className="mt-8">
          <h3 className="font-heading text-lg font-semibold mb-3">{ui.detail.cartaRole}</h3>
          <div className="flex flex-wrap gap-3">
            {data.cartaRole.map((role) => {
              const label = roleLabels[role] || role;
              return (
                <Tooltip key={role}>
                  <TooltipTrigger asChild>
                    <span className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium cursor-help">{label}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs text-xs">
                    {roleTooltips[role] || label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollReveal>

        {data.bestRegionsForSales.length > 0 && (
          <ScrollReveal delay={0.3} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">{copy.bestRegionsForSales}</h3>
            <div className="flex flex-wrap gap-2">
              {data.bestRegionsForSales.map((r) => (
                <span key={r} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>

    {editorial ? (
      <ServiceIntelligenceSection profile={editorial} />
    ) : (
      <WineLibraryOperationalDepth
        entityName={data.name}
        kind="grape"
        lang={langKey}
        ctaHref={linkTo("/demo")}
        ctaLabel={ui.actions.requestDemo}
      />
    )}

    {/* COMPETING VARIETIES */}
    {data.competingVarieties.length > 0 && (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.competingVarieties}</h2>
            <p className="text-muted-foreground text-sm mt-2">{copy.competingDescription}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {data.competingVarieties.map((v) => {
                const hasFull = hasFullEntry(v);
                return hasFull ? (
                  <Link key={v} to={linkTo(`/biblioteca-vino/uvas/${v}`)}
                    className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm hover:border-wine/30 hover:text-wine transition-all capitalize">
                    {v.replace(/-/g, " ")}
                  </Link>
                ) : (
                  <span key={v} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm capitalize">{v.replace(/-/g, " ")}</span>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    )}

    {/* COMMON MISTAKES */}
    {data.commonMistakes.length > 0 && (
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.commonMistakes}</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {data.commonMistakes.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-wine shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{m}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* PAIRINGS */}
    {data.pairings.length > 0 && (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.suggestedPairings}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.pairings.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-5">
                  <Wine size={16} className="text-wine shrink-0" />
                  <span className="text-sm">{p}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <RelatedWineLibraryLinks
          items={[
            ...getStrategicWineLibraryLinks("grape", data.slug),
            ...data.keyRegions.map((name) => ({ name, hint: "region" as const })),
            ...data.bestRegionsForSales.map((name) => ({ name, hint: "region" as const })),
            ...data.competingVarieties.map((name) => ({ name, hint: "grape" as const })),
            ...data.relatedGrapes.map((name) => ({ name, hint: "grape" as const })),
            ...data.pairings.map((name) => ({ name, hint: "pairing" as const })),
          ]}
        />
      </div>
    </section>

    {/* FAQ */}
    <FAQSection faqs={faqs} schemaId={`grape-${data.slug}`} />

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-8">
          <h2 className="font-heading text-xl font-semibold">{ui.detail.keepExploring}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: linkTo("/biblioteca-vino/uvas"), label: copy.allVarieties },
            { to: linkTo("/biblioteca-vino/regiones"), label: ui.sections.regions },
            { to: linkTo("/biblioteca-vino"), label: ui.libraryName },
            { to: "/producto/winerim-core", label: "Winerim Core" },
            { to: linkTo("/demo"), label: ui.actions.requestDemo },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
              <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              {copy.bringToListTitle(data.name)}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
              {ui.cta.grapesBody}
            </p>
            <Link to={linkTo("/demo")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              {ui.actions.requestDemo} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   CATALOG DETAIL — Simplified view for grapes without full Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const CatalogGrapeDetail = ({ data, linkTo, urlFor, ui, langKey }: { data: NonNullable<ReturnType<typeof getLocalizedGrapeCatalogEntry>>; linkTo: (path: string) => string; urlFor: (path: string) => string; ui: WineLibraryUi; langKey: string }) => {
  const colorLabel = colorLabelsByLang[langKey]?.[data.color] || colorLabels[data.color].label;
  const copy = grapeDetailCopy[langKey] || grapeDetailCopy.en;
  const editorial = getGrapeEditorialProfile(data.slug, langKey, data.name);

  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={data.seo.title}
      description={data.seo.description}
      url={urlFor(`/biblioteca-vino/uvas/${data.slug}`)}
      hreflang={getWineLibraryHreflang(`/biblioteca-vino/uvas/${data.slug}`)}
    />
    <Navbar />

    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
          { label: ui.sections.grapes, href: linkTo("/biblioteca-vino/uvas") },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabel}</span>
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            {copy.alsoKnownAs}: <span className="italic">{data.synonyms.join(", ")}</span>
          </p>
        )}

        {data.slug === "muscadet" && (
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">{copy.muscadetClarifier}</p>
        )}

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{data.tastingNotes}</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.countries}</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.keyRegions}</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <LinkedTag key={r} name={r} hint="region" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {editorial ? (
      <ServiceIntelligenceSection profile={editorial} />
    ) : (
      <WineLibraryOperationalDepth
        entityName={data.name}
        kind="grape"
        lang={langKey}
        ctaHref={linkTo("/demo")}
        ctaLabel={ui.actions.requestDemo}
      />
    )}

    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <RelatedWineLibraryLinks
          items={[
            ...getStrategicWineLibraryLinks("grape", data.slug),
            ...data.keyRegions.map((name) => ({ name, hint: "region" as const })),
          ]}
        />
      </div>
    </section>

    {editorial && <FAQSection faqs={editorial.faqs} schemaId={`grape-${data.slug}-service`} />}

    {/* INTERNAL LINKS */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-xl font-semibold mb-6">{ui.detail.keepExploring}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: linkTo("/biblioteca-vino/uvas"), label: copy.allVarieties },
            { to: linkTo("/biblioteca-vino/regiones"), label: ui.sections.regions },
            { to: linkTo("/biblioteca-vino"), label: ui.libraryName },
            { to: linkTo("/demo"), label: ui.actions.requestDemo },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
              <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────────── */
const FactCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
    <p className="font-heading text-sm font-semibold">{value}</p>
  </div>
);

const WinerimBlock = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-6">
    <h3 className="font-heading text-sm font-semibold text-wine mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
  </div>
);

const ServiceIntelligenceSection = ({ profile }: { profile: LocalizedGrapeEditorialProfile }) => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target size={18} className="text-wine" />
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{profile.eyebrow}</p>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold">{profile.title}</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">{profile.subtitle}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {profile.facts.map((fact) => (
          <FactCard key={fact.label} icon={<Wine size={16} />} label={fact.label} value={fact.value} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {profile.sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.04}>
            <WinerimBlock title={section.title} content={section.body} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-8">
        <h3 className="font-heading text-lg font-semibold mb-4">{profile.menuTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {profile.menuHooks.map((hook) => (
            <div key={hook} className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-4">
              <Wine size={15} className="text-wine shrink-0" />
              <span className="text-sm text-muted-foreground">{hook}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GrapeDetail;
