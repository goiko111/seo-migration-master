import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Globe, Search, ArrowRight, Filter, Wine, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { wineCountries, regionEntries } from "@/data/regionsLibrary";
import { regionCatalog, CATALOG_STATS, getRegionsByCountry, getRegionsByType } from "@/data/regionsCatalog";

const i18n = {
  es: {
    seoTitle: "Regiones Vinícolas del Mundo | Biblioteca del Vino",
    seoDescription: "Guía de regiones vinícolas y denominaciones de origen para hostelería. Más de 3.700 denominaciones de 40+ países con criterio Winerim.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Regiones vinícolas",
    tag: "países con guía · ",
    denominations: "+ denominaciones",
    countries: "Países con guía",
    totalDenominations: "Denominaciones",
    wineries: "Bodegas en BD",
    types: "Tipos",
    title: "Regiones vinícolas del",
    titleSpan: "mundo",
    description: "Denominaciones, indicaciones geográficas y regiones vinícolas de ",
    descriptionEnd: " países.\nCon enfoque Winerim: consulta, interpretación y aplicación comercial para hostelería.",
    searchPlaceholder: "Buscar país, denominación o tipo (DO, AVA…)",
    noResults: "No se encontraron países ni denominaciones que coincidan con",
    explorePorPais: "Explora por país",
    explorePorPaisDesc: "Cada país tiene su propia arquitectura de denominaciones, estilos y regiones. Selecciona uno para explorar su mapa vinícola completo.",
    denominacionesCount: " denominaciones",
    bodegasCount: " bodegas",
    featured: "Regiones destacadas",
    featuredDesc: "Denominaciones icónicas que todo profesional de hostelería debería conocer.",
    catalog: "Catálogo completo de denominaciones",
    catalogDesc: "+ denominaciones del mundo con sus sistemas de clasificación",
    filterByCountry: "Todos los países",
    filterByType: "Todos los tipos",
    clearFilters: "Limpiar filtros",
    showing: "Mostrando",
    of: "de",
    ctaTitle: "Lleva este conocimiento a tu",
    ctaSpan: "carta de vinos",
    ctaDesc: "Winerim integra información de regiones, denominaciones y percepción comercial directamente en tu herramienta de gestión de carta.",
    ctaButton: "Solicitar demo",
    faqQ1: "¿Cuántas regiones vinícolas cubre Winerim?",
    faqA1: "El catálogo de Winerim incluye más de 3.700 denominaciones, regiones e indicaciones geográficas de más de 40 países, con información de más de 95.000 bodegas.",
    faqQ2: "¿Qué diferencia hay entre DO, AOP, AVA y DOC?",
    faqA2: "Son sistemas de clasificación de distintos países: DO (España), AOP (Francia), AVA (EE.UU.) y DOC (Italia/Portugal). Todos definen zonas geográficas con reglas de producción, pero con diferencias en restricciones y requisitos.",
    faqQ3: "¿Por qué importa conocer las regiones para gestionar una carta?",
    faqA3: "La región es uno de los principales factores de decisión del comensal. Entender qué comunica cada región permite diseñar cartas más efectivas, con un equilibrio inteligente entre regiones seguras y diferenciales.",
    faqQ4: "¿Cómo usa Winerim esta información?",
    faqA4: "Winerim integra el conocimiento de regiones directamente en la experiencia de gestión de carta: recomendaciones, benchmarks, pricing inteligente y herramientas de decisión que tienen en cuenta la percepción y el rol comercial de cada denominación.",
  },
  en: {
    seoTitle: "Wine Regions of the World | Wine Library",
    seoDescription: "Guide to wine regions and designations of origin for hospitality. Over 3,700 designations from 40+ countries with Winerim insight.",
    breadcrumb1: "Wine Library",
    breadcrumb2: "Wine regions",
    tag: "countries with guide · ",
    denominations: "+ designations",
    countries: "Countries with guide",
    totalDenominations: "Designations",
    wineries: "Wineries in DB",
    types: "Types",
    title: "Wine regions of the",
    titleSpan: "world",
    description: "Designations, geographic indications and wine regions from ",
    descriptionEnd: " countries.\nWith Winerim approach: consultation, interpretation and commercial application for hospitality.",
    searchPlaceholder: "Search country, designation or type (DO, AVA...)",
    noResults: "No countries or designations found matching",
    explorePorPais: "Explore by country",
    explorePorPaisDesc: "Each country has its own architecture of designations, styles and regions. Select one to explore its complete wine map.",
    denominacionesCount: " designations",
    bodegasCount: " wineries",
    featured: "Featured regions",
    featuredDesc: "Iconic designations that every hospitality professional should know.",
    catalog: "Complete designation catalog",
    catalogDesc: "+ designations from around the world with their classification systems",
    filterByCountry: "All countries",
    filterByType: "All types",
    clearFilters: "Clear filters",
    showing: "Showing",
    of: "of",
    ctaTitle: "Bring this knowledge to your",
    ctaSpan: "wine list",
    ctaDesc: "Winerim integrates region information, designations and commercial perception directly into your chart management tool.",
    ctaButton: "Request demo",
    faqQ1: "How many wine regions does Winerim cover?",
    faqA1: "The Winerim catalog includes over 3,700 designations, regions and geographic indications from over 40 countries, with information from over 95,000 wineries.",
    faqQ2: "What is the difference between DO, AOP, AVA and DOC?",
    faqA2: "These are classification systems of different countries: DO (Spain), AOP (France), AVA (USA) and DOC (Italy/Portugal). All define geographic areas with production rules, but with differences in restrictions and requirements.",
    faqQ3: "Why does it matter to know wine regions for managing a chart?",
    faqA3: "The region is one of the main decision factors for diners. Understanding what each region communicates allows you to design more effective charts with intelligent balance between safe and differential regions.",
    faqQ4: "How does Winerim use this information?",
    faqA4: "Winerim integrates regional knowledge directly into the chart management experience: recommendations, benchmarks, smart pricing and decision tools that take into account the perception and commercial role of each designation.",
  },
  it: {
    seoTitle: "Regioni Vinicole del Mondo | Biblioteca del Vino",
    seoDescription: "Guida alle regioni vinicole e denominazioni di origine per l'ospitalità. Oltre 3.700 denominazioni da 40+ paesi con criterio Winerim.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Regioni vinicole",
    tag: "paesi con guida · ",
    denominations: "+ denominazioni",
    countries: "Paesi con guida",
    totalDenominations: "Denominazioni",
    wineries: "Cantine nel DB",
    types: "Tipi",
    title: "Regioni vinicole del",
    titleSpan: "mondo",
    description: "Denominazioni, indicazioni geografiche e regioni vinicole di ",
    descriptionEnd: " paesi.\nCon approccio Winerim: consultazione, interpretazione e applicazione commerciale per l'ospitalità.",
    searchPlaceholder: "Cerca paese, denominazione o tipo (DOC, AVA...)",
    noResults: "Nessun paese o denominazione trovato corrispondente a",
    explorePorPais: "Esplora per paese",
    explorePorPaisDesc: "Ogni paese ha la propria architettura di denominazioni, stili e regioni. Selezionane uno per esplorare la sua mappa vinicola completa.",
    denominacionesCount: " denominazioni",
    bodegasCount: " cantine",
    featured: "Regioni in evidenza",
    featuredDesc: "Denominazioni iconiche che ogni professionista dell'ospitalità dovrebbe conoscere.",
    catalog: "Catalogo completo delle denominazioni",
    catalogDesc: "+ denominazioni da tutto il mondo con i loro sistemi di classificazione",
    filterByCountry: "Tutti i paesi",
    filterByType: "Tutti i tipi",
    clearFilters: "Cancella filtri",
    showing: "Mostrando",
    of: "di",
    ctaTitle: "Porta questa conoscenza nella tua",
    ctaSpan: "lista dei vini",
    ctaDesc: "Winerim integra le informazioni sulle regioni, le denominazioni e la percezione commerciale direttamente nel tuo strumento di gestione della carta.",
    ctaButton: "Richiedi demo",
    faqQ1: "Quante regioni vinicole copre Winerim?",
    faqA1: "Il catalogo Winerim include oltre 3.700 denominazioni, regioni e indicazioni geografiche di oltre 40 paesi, con informazioni di oltre 95.000 cantine.",
    faqQ2: "Qual è la differenza tra DO, AOP, AVA e DOC?",
    faqA2: "Sono sistemi di classificazione di diversi paesi: DO (Spagna), AOP (Francia), AVA (USA) e DOC (Italia/Portogallo). Tutti definiscono zone geografiche con regole di produzione, ma con differenze in restrizioni e requisiti.",
    faqQ3: "Perché è importante conoscere le regioni vinicole per gestire una carta?",
    faqA3: "La regione è uno dei principali fattori decisionali per i commensali. Comprendere cosa comunica ogni regione consente di progettare carte più efficaci con equilibrio intelligente tra regioni sicure e differenziali.",
    faqQ4: "Come Winerim utilizza queste informazioni?",
    faqA4: "Winerim integra la conoscenza regionale direttamente nell'esperienza di gestione della carta: raccomandazioni, benchmark, pricing intelligente e strumenti decisionali che tengono conto della percezione e del ruolo commerciale di ogni denominazione.",
  },
  fr: {
    seoTitle: "Régions Viticoles du Monde | Bibliothèque du Vin",
    seoDescription: "Guide des régions viticoles et appellations d'origine pour l'hôtellerie. Plus de 3.700 appellations de 40+ pays avec critères Winerim.",
    breadcrumb1: "Bibliothèque du Vin",
    breadcrumb2: "Régions viticoles",
    tag: "pays avec guide · ",
    denominations: "+ appellations",
    countries: "Pays avec guide",
    totalDenominations: "Appellations",
    wineries: "Domaines en BD",
    types: "Types",
    title: "Régions viticoles du",
    titleSpan: "monde",
    description: "Appellations, indications géographiques et régions viticoles de ",
    descriptionEnd: " pays.\nAvec approche Winerim: consultation, interprétation et application commerciale pour l'hôtellerie.",
    searchPlaceholder: "Cherchez pays, appellation ou type (AOC, AVA...)",
    noResults: "Aucun pays ou appellation trouvé correspondant à",
    explorePorPais: "Explorez par pays",
    explorePorPaisDesc: "Chaque pays a sa propre architecture d'appellations, de styles et de régions. Sélectionnez-en une pour explorer sa carte viticole complète.",
    denominacionesCount: " appellations",
    bodegasCount: " domaines",
    featured: "Régions en vedette",
    featuredDesc: "Appellations iconiques que tout professionnel de l'hôtellerie devrait connaître.",
    catalog: "Catalogue complet des appellations",
    catalogDesc: "+ appellations du monde avec leurs systèmes de classification",
    filterByCountry: "Tous les pays",
    filterByType: "Tous les types",
    clearFilters: "Effacer les filtres",
    showing: "Affichage",
    of: "de",
    ctaTitle: "Apportez cette connaissance à votre",
    ctaSpan: "liste des vins",
    ctaDesc: "Winerim intègre les informations régionales, les appellations et la perception commerciale directement dans votre outil de gestion de carte.",
    ctaButton: "Demander une démo",
    faqQ1: "Combien de régions viticoles Winerim couvre-t-il?",
    faqA1: "Le catalogue Winerim comprend plus de 3.700 appellations, régions et indications géographiques de plus de 40 pays, avec des informations de plus de 95.000 domaines.",
    faqQ2: "Quelle est la différence entre DO, AOP, AVA et DOC?",
    faqA2: "Ce sont des systèmes de classification de différents pays: DO (Espagne), AOP (France), AVA (USA) et DOC (Italie/Portugal). Tous définissent des zones géographiques avec des règles de production, mais avec des différences en matière de restrictions et d'exigences.",
    faqQ3: "Pourquoi est-il important de connaître les régions viticoles pour gérer une carte?",
    faqA3: "La région est l'un des principaux facteurs décisionnels pour les convives. Comprendre ce que communique chaque région vous permet de concevoir des cartes plus efficaces avec un équilibre intelligent entre régions sûres et différenciées.",
    faqQ4: "Comment Winerim utilise-t-elle ces informations?",
    faqA4: "Winerim intègre les connaissances régionales directement dans l'expérience de gestion de carte: recommandations, benchmarks, tarification intelligente et outils décisionnels qui tiennent compte de la perception et du rôle commercial de chaque appellation.",
  },
  de: {
    seoTitle: "Weinregionen der Welt | Weinbibliothek",
    seoDescription: "Leitfaden zu Weinregionen und Herkunftsbezeichnungen für Gastronomie. Über 3.700 Herkunftsbezeichnungen aus 40+ Ländern mit Winerim-Kriterium.",
    breadcrumb1: "Weinbibliothek",
    breadcrumb2: "Weinregionen",
    tag: "Länder mit Leitfaden · ",
    denominations: "+ Herkunftsbezeichnungen",
    countries: "Länder mit Leitfaden",
    totalDenominations: "Herkunftsbezeichnungen",
    wineries: "Weingüter in DB",
    types: "Typen",
    title: "Weinregionen der",
    titleSpan: "Welt",
    description: "Herkunftsbezeichnungen, geografische Angaben und Weinregionen aus ",
    descriptionEnd: " Ländern.\nMit Winerim-Ansatz: Beratung, Interpretation und kommerzielle Anwendung für Gastronomie.",
    searchPlaceholder: "Nach Land, Herkunftsbezeichnung oder Typ suchen (DO, AVA...)",
    noResults: "Keine Länder oder Herkunftsbezeichnungen gefunden, die entsprechen",
    explorePorPais: "Nach Land erkunden",
    explorePorPaisDesc: "Jedes Land hat seine eigene Architektur von Herkunftsbezeichnungen, Stilen und Regionen. Wählen Sie eine aus, um ihre vollständige Weinkarte zu erkunden.",
    denominacionesCount: " Herkunftsbezeichnungen",
    bodegasCount: " Weingüter",
    featured: "Ausgewählte Regionen",
    featuredDesc: "Ikonische Herkunftsbezeichnungen, die jeder Gastronomie-Profi kennen sollte.",
    catalog: "Vollständiger Katalog der Herkunftsbezeichnungen",
    catalogDesc: "+ Herkunftsbezeichnungen aus aller Welt mit ihren Klassifizierungssystemen",
    filterByCountry: "Alle Länder",
    filterByType: "Alle Typen",
    clearFilters: "Filter löschen",
    showing: "Anzeigen",
    of: "von",
    ctaTitle: "Bringen Sie dieses Wissen auf Ihre",
    ctaSpan: "Weinkarte",
    ctaDesc: "Winerim integriert Regionalinformationen, Herkunftsbezeichnungen und kommerzielle Wahrnehmung direkt in Ihr Kartenverwaltungs-Tool.",
    ctaButton: "Demo anfordern",
    faqQ1: "Wie viele Weinregionen deckt Winerim ab?",
    faqA1: "Der Winerim-Katalog umfasst über 3.700 Herkunftsbezeichnungen, Regionen und geografische Angaben aus über 40 Ländern mit Informationen von über 95.000 Weingütern.",
    faqQ2: "Was ist der Unterschied zwischen DO, AOP, AVA und DOC?",
    faqA2: "Dies sind Klassifizierungssysteme verschiedener Länder: DO (Spanien), AOP (Frankreich), AVA (USA) und DOC (Italien/Portugal). Alle definieren geografische Gebiete mit Produktionsregeln, unterscheiden sich aber in Einschränkungen und Anforderungen.",
    faqQ3: "Warum ist es wichtig, Weinregionen zur Verwaltung einer Karte zu kennen?",
    faqA3: "Die Region ist einer der wichtigsten Entscheidungsfaktoren für Gäste. Das Verständnis, was jede Region kommuniziert, ermöglicht es Ihnen, effektivere Karten mit intelligentem Gleichgewicht zwischen sicheren und differenziellen Regionen zu gestalten.",
    faqQ4: "Wie nutzt Winerim diese Informationen?",
    faqA4: "Winerim integriert Regionalwissen direkt in die Kartenverwaltungserfahrung: Empfehlungen, Benchmarks, intelligente Preisgestaltung und Entscheidungs-Tools, die die Wahrnehmung und kommerzielle Rolle jeder Herkunftsbezeichnung berücksichtigen.",
  },
  pt: {
    seoTitle: "Regiões Vinícolas do Mundo | Biblioteca do Vinho",
    seoDescription: "Guia de regiões vinícolas e denominações de origem para hotelaria. Mais de 3.700 denominações de 40+ países com critério Winerim.",
    breadcrumb1: "Biblioteca do Vinho",
    breadcrumb2: "Regiões vinícolas",
    tag: "países com guia · ",
    denominations: "+ denominações",
    countries: "Países com guia",
    totalDenominations: "Denominações",
    wineries: "Adegas no BD",
    types: "Tipos",
    title: "Regiões vinícolas do",
    titleSpan: "mundo",
    description: "Denominações, indicações geográficas e regiões vinícolas de ",
    descriptionEnd: " países.\nCom abordagem Winerim: consulta, interpretação e aplicação comercial para hotelaria.",
    searchPlaceholder: "Procure por país, denominação ou tipo (DO, AVA...)",
    noResults: "Nenhum país ou denominação encontrado correspondendo a",
    explorePorPais: "Explore por país",
    explorePorPaisDesc: "Cada país tem sua própria arquitetura de denominações, estilos e regiões. Selecione uma para explorar seu mapa vinícola completo.",
    denominacionesCount: " denominações",
    bodegasCount: " adegas",
    featured: "Regiões em destaque",
    featuredDesc: "Denominações icônicas que todo profissional de hotelaria deveria conhecer.",
    catalog: "Catálogo completo de denominações",
    catalogDesc: "+ denominações do mundo com seus sistemas de classificação",
    filterByCountry: "Todos os países",
    filterByType: "Todos os tipos",
    clearFilters: "Limpar filtros",
    showing: "Mostrando",
    of: "de",
    ctaTitle: "Leve este conhecimento para sua",
    ctaSpan: "lista de vinhos",
    ctaDesc: "Winerim integra informações de regiões, denominações e percepção comercial diretamente em sua ferramenta de gestão de carta.",
    ctaButton: "Solicitar demo",
    faqQ1: "Quantas regiões vinícolas o Winerim cobre?",
    faqA1: "O catálogo Winerim inclui mais de 3.700 denominações, regiões e indicações geográficas de mais de 40 países, com informações de mais de 95.000 adegas.",
    faqQ2: "Qual é a diferença entre DO, AOP, AVA e DOC?",
    faqA2: "Estes são sistemas de classificação de países diferentes: DO (Espanha), AOP (França), AVA (EUA) e DOC (Itália/Portugal). Todos definem áreas geográficas com regras de produção, mas com diferenças em restrições e requisitos.",
    faqQ3: "Por que é importante conhecer as regiões vinícolas para gerenciar uma carta?",
    faqA3: "A região é um dos principais fatores decisionais para os clientes. Compreender o que cada região comunica permite criar cartas mais efetivas com equilíbrio inteligente entre regiões seguras e diferenciais.",
    faqQ4: "Como o Winerim usa essas informações?",
    faqA4: "Winerim integra conhecimento regional diretamente na experiência de gestão de carta: recomendações, benchmarks, precificação inteligente e ferramentas de decisão que levam em consideração a percepção e o papel comercial de cada denominação.",
  },
};

const faqs = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
];

type SearchResult = {
  type: "country" | "denomination";
  name: string;
  flag?: string;
  extra: string;
  to: string;
};

const RegionsHub = () => {
  const { lang, allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  const totalDenominations = wineCountries.reduce((acc, c) => acc + c.denominationsCount, 0);

  // Get unique types from catalog
  const uniqueTypes = Array.from(new Set(regionCatalog.map(r => r.type))).sort();

  // Combined search across countries AND denominations
  const { filteredCountries, searchResults } = useMemo(() => {
    if (!search.trim()) return { filteredCountries: wineCountries, searchResults: [] as SearchResult[] };
    const q = search.toLowerCase();

    const countries = wineCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.denominationTypes.toLowerCase().includes(q)
    );

    // Search within denominations/regions
    const denomResults: SearchResult[] = regionEntries
      .filter((r) =>
        r.name.toLowerCase().includes(q) ||
        (r.altNames && r.altNames.some((a) => a.toLowerCase().includes(q))) ||
        r.denominationType.toLowerCase().includes(q)
      )
      .slice(0, 12)
      .map((r) => {
        const country = wineCountries.find((c) => c.slug === r.country);
        return {
          type: "denomination" as const,
          name: r.name,
          flag: country?.flag,
          extra: `${country?.name || r.country} · ${r.denominationType}`,
          to: `/biblioteca-vino/regiones/${r.country}/${r.slug}`,
        };
      });

    return { filteredCountries: countries, searchResults: denomResults };
  }, [search]);

  // Filter catalog by country and type
  const filteredCatalog = useMemo(() => {
    let result = regionCatalog;
    if (filterCountry) result = result.filter(r => r.country === filterCountry);
    if (filterType) result = result.filter(r => r.type === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.aliases.some(a => a.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filterCountry, filterType, search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={i18n[lang as keyof typeof i18n]?.seoTitle ?? i18n.es.seoTitle}
        description={i18n[lang as keyof typeof i18n]?.seoDescription ?? i18n.es.seoDescription}
        url="https://winerim.wine/biblioteca-vino/regiones"
        hreflang={allLangPaths("/biblioteca-vino/regiones")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: i18n[lang as keyof typeof i18n]?.breadcrumb1 ?? i18n.es.breadcrumb1, href: "/biblioteca-vino" },
            { label: i18n[lang as keyof typeof i18n]?.breadcrumb2 ?? i18n.es.breadcrumb2 },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Globe size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {wineCountries.length} {i18n[lang as keyof typeof i18n]?.tag ?? i18n.es.tag}{totalDenominations.toLocaleString()}{i18n[lang as keyof typeof i18n]?.denominations ?? i18n.es.denominations}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            {i18n[lang as keyof typeof i18n]?.title ?? i18n.es.title} <span className="text-gradient-wine italic">{i18n[lang as keyof typeof i18n]?.titleSpan ?? i18n.es.titleSpan}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            {i18n[lang as keyof typeof i18n]?.description ?? i18n.es.description}{wineCountries.length}{i18n[lang as keyof typeof i18n]?.descriptionEnd ?? i18n.es.descriptionEnd}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: i18n[lang as keyof typeof i18n]?.countries ?? i18n.es.countries, value: String(wineCountries.length) },
              { label: i18n[lang as keyof typeof i18n]?.totalDenominations ?? i18n.es.totalDenominations, value: totalDenominations.toLocaleString() },
              { label: i18n[lang as keyof typeof i18n]?.wineries ?? i18n.es.wineries, value: wineCountries.reduce((a, c) => a + c.bodegasCount, 0).toLocaleString() },
              { label: i18n[lang as keyof typeof i18n]?.types ?? i18n.es.types, value: "DO, AOP, AVA…" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-card rounded-xl border border-border p-4 text-center">
                <p className="font-heading text-2xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md"
          >
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={i18n[lang as keyof typeof i18n]?.searchPlaceholder ?? i18n.es.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gradient-card border-border"
            />

            {/* Denomination search results dropdown */}
            {search.trim() && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">Denominaciones y regiones</p>
                {searchResults.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm">{r.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.extra}</p>
                    </div>
                    <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* COUNTRIES GRID */}
      <section className="section-padding pt-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              {i18n[lang as keyof typeof i18n]?.explorePorPais ?? i18n.es.explorePorPais}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {i18n[lang as keyof typeof i18n]?.explorePorPaisDesc ?? i18n.es.explorePorPaisDesc}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, i) => {
              const countryRegions = regionEntries.filter((r) => r.country === country.slug);
              return (
                <ScrollReveal key={country.slug} delay={i * 0.04}>
                  <Link
                    to={`/biblioteca-vino/regiones/${country.slug}`}
                    className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                            {country.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{country.nameEn}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">
                        {country.denominationsCount}{i18n[lang as keyof typeof i18n]?.denominacionesCount ?? i18n.es.denominacionesCount}
                      </span>
                      <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-md">
                        {country.bodegasCount.toLocaleString()}{i18n[lang as keyof typeof i18n]?.bodegasCount ?? i18n.es.bodegasCount}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {country.denominationTypes}
                    </p>

                    {countryRegions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1.5">
                        {countryRegions.slice(0, 3).map((r) => (
                          <span key={r.slug} className="text-xs bg-secondary/30 px-2 py-0.5 rounded-md text-foreground/70">
                            {r.name}
                          </span>
                        ))}
                        {countryRegions.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{countryRegions.length - 3}</span>
                        )}
                      </div>
                    )}
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filteredCountries.length === 0 && searchResults.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{i18n[lang as keyof typeof i18n]?.noResults ?? i18n.es.noResults} "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED REGIONS */}
      {!search.trim() && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Regiones destacadas
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Denominaciones icónicas que todo profesional de hostelería debería conocer.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionEntries.filter((r) => r.prestige === "icónico").map((region, i) => {
                const country = wineCountries.find((c) => c.slug === region.country);
                return (
                  <ScrollReveal key={region.slug} delay={i * 0.06}>
                    <Link
                      to={`/biblioteca-vino/regiones/${region.country}/${region.slug}`}
                      className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{country?.flag}</span>
                        <span className="text-xs text-muted-foreground">{country?.name}</span>
                        <span className="text-xs bg-wine/10 text-wine px-2 py-0.5 rounded-md ml-auto">
                          {region.denominationType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                          {region.name}
                        </h3>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {region.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.cartaRole.slice(0, 3).map((role) => (
                          <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md capitalize">
                            {role}
                          </span>
                        ))}
                        {region.bodegasCount && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {region.bodegasCount.toLocaleString()} bodegas
                          </span>
                        )}
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FULL CATALOG */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  Catálogo completo de denominaciones
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  {CATALOG_STATS.totalDenominations.toLocaleString()}+ denominaciones del mundo con sus sistemas de clasificación
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar denominación..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-secondary/30 border border-border text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <option value="">Todos los países</option>
                  {Array.from(new Set(regionCatalog.map(r => r.country)))
                    .sort()
                    .map(country => (
                      <option key={country} value={country}>
                        {country.charAt(0).toUpperCase() + country.slice(1)}
                      </option>
                    ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-secondary/30 border border-border text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <option value="">Todos los tipos</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                {(filterCountry || filterType || search.trim()) && (
                  <button
                    onClick={() => {
                      setFilterCountry("");
                      setFilterType("");
                      setSearch("");
                    }}
                    className="px-4 py-2 rounded-lg bg-wine/10 text-wine border border-wine/30 text-sm font-medium hover:bg-wine/20 transition-colors flex items-center gap-2"
                  >
                    <X size={14} />
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Results count */}
          <ScrollReveal className="mb-6">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{filteredCatalog.length.toLocaleString()}</span> de <span className="font-semibold text-foreground">{CATALOG_STATS.totalDenominations.toLocaleString()}</span> denominaciones
            </p>
          </ScrollReveal>

          {/* Catalog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalog.map((region, i) => {
              const country = wineCountries.find((c) => c.slug === region.country);
              return (
                <ScrollReveal key={region.id} delay={Math.min(i * 0.02, 0.3)}>
                  <Link
                    to={`/biblioteca-vino/regiones/${region.country}/${region.slug}`}
                    className="group block bg-gradient-card rounded-lg border border-border p-4 hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 h-full"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm font-semibold group-hover:text-wine transition-colors truncate">
                          {region.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {country?.flag} {region.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {region.type}
                      </Badge>
                      {region.parentRegion && (
                        <span className="text-xs bg-secondary/30 px-2 py-0.5 rounded text-muted-foreground">
                          {region.parentRegion}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {region.bodegas.toLocaleString()} {region.bodegas === 1 ? "bodega" : "bodegas"}
                    </p>

                    {region.aliases.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        Alias: {region.aliases.slice(0, 2).join(", ")}
                        {region.aliases.length > 2 && "..."}
                      </p>
                    )}
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filteredCatalog.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No se encontraron denominaciones con los filtros aplicados</p>
              <button
                onClick={() => {
                  setFilterCountry("");
                  setFilterType("");
                  setSearch("");
                }}
                className="text-wine text-sm font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs.map(f => ({
        q: i18n[lang as keyof typeof i18n]?.[f.q as keyof typeof i18n.es] ?? i18n.es[f.q as keyof typeof i18n.es],
        a: i18n[lang as keyof typeof i18n]?.[f.a as keyof typeof i18n.es] ?? i18n.es[f.a as keyof typeof i18n.es],
      }))} schemaId="regions-hub" />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {i18n[lang as keyof typeof i18n]?.ctaTitle ?? i18n.es.ctaTitle}{" "}
                <span className="text-gradient-wine italic">{i18n[lang as keyof typeof i18n]?.ctaSpan ?? i18n.es.ctaSpan}</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                {i18n[lang as keyof typeof i18n]?.ctaDesc ?? i18n.es.ctaDesc}
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                {i18n[lang as keyof typeof i18n]?.ctaButton ?? i18n.es.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegionsHub;
