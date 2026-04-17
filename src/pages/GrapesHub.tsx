import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Grape, Search, ArrowRight, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  grapeCatalog,
  grapeEntries,
  hasFullEntry,
  colorLabels,
  type GrapeColor,
  type GrapeCatalogEntry,
} from "@/data/grapesLibrary";

const i18n = {
  es: {
    seoTitle: "Variedades de Uva | Guía Completa para Hostelería",
    seoDescription: "Guía completa de 87 variedades de uva para hostelería. Perfil sensorial, rol en carta, criterio comercial y maridajes. Con enfoque Winerim.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Variedades de uva",
    tag: "variedades · ",
    countries: " países",
    title: "Variedades de",
    titleSpan: "uva",
    description1: " tintas, ",
    description2: " blancas: cada variedad con su perfil sensorial, su rol comercial en carta y su lectura Winerim para hostelería.",
    statVariedades: "Variedades",
    statTintas: "Tintas",
    statBlancas: "Blancas",
    statPaises: "Países",
    searchPlaceholder: "Buscar variedad, sinónimo o región…",
    filterAll: "Todas",
    filterTintas: "🍷 Tintas",
    filterBlancas: "🥂 Blancas",
    allCountries: "Todos los países",
    clear: "Limpiar",
    featured: "Variedades más reconocidas",
    featuredDesc: "Las variedades que todo profesional de hostelería debería dominar.",
    differential: "Variedades diferenciales",
    differentialDesc: "Variedades que aportan criterio, descubrimiento y sofisticación a una carta.",
    allGrapes: "Todas las variedades",
    resultFound: " variedades encontradas",
    notFound: "No se encontraron variedades que coincidan con los filtros.",
    ctaTitle: "Lleva este conocimiento a tu",
    ctaSpan: "carta de vinos",
    ctaDesc: "Winerim integra información de variedades, percepción comercial y maridajes directamente en tu herramienta de gestión de carta.",
    ctaButton: "Solicitar demo",
    faqQ1: "¿Cuántas variedades de uva cubre Winerim?",
    faqA1: "El catálogo de Winerim incluye más de 85 variedades de uva de más de 30 países, con información sobre sinonimias, regiones clave y notas de cata.",
    faqQ2: "¿Por qué importa conocer las uvas para gestionar una carta?",
    faqA2: "La variedad de uva es uno de los principales ejes de decisión del comensal. Entender qué comunica cada uva, cómo se percibe y con qué se marida permite diseñar cartas más efectivas y vender mejor.",
    faqQ3: "¿Qué es una variedad internacional vs. una local?",
    faqA3: "Las variedades internacionales (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) se cultivan globalmente y tienen alto reconocimiento. Las locales (Mencía, Godello, Nerello Mascalese) son exclusivas de zonas concretas y aportan diferenciación.",
    faqQ4: "¿Qué son los sinónimos de una uva?",
    faqA4: "Muchas variedades reciben diferentes nombres según el país o región. Tempranillo es Tinto Fino en Ribera del Duero, Cencibel en La Mancha y Tinta Roriz en Portugal. Son la misma uva.",
  },
  en: {
    seoTitle: "Grape Varieties | Complete Hospitality Guide",
    seoDescription: "Complete guide to 87 grape varieties for hospitality. Sensory profile, chart role, commercial criteria and food pairings. Winerim approach.",
    breadcrumb1: "Wine Library",
    breadcrumb2: "Grape varieties",
    tag: "varieties · ",
    countries: " countries",
    title: "Grape",
    titleSpan: "varieties",
    description1: " red grapes, ",
    description2: " white grapes: each variety with its sensory profile, commercial role on the chart and Winerim reading for hospitality.",
    statVariedades: "Varieties",
    statTintas: "Red",
    statBlancas: "White",
    statPaises: "Countries",
    searchPlaceholder: "Search variety, synonym or region...",
    filterAll: "All",
    filterTintas: "🍷 Red",
    filterBlancas: "🥂 White",
    allCountries: "All countries",
    clear: "Clear",
    featured: "Most recognized varieties",
    featuredDesc: "The varieties every hospitality professional should master.",
    differential: "Differential varieties",
    differentialDesc: "Varieties that bring criteria, discovery and sophistication to a chart.",
    allGrapes: "All varieties",
    resultFound: " varieties found",
    notFound: "No varieties found matching the filters.",
    ctaTitle: "Bring this knowledge to your",
    ctaSpan: "wine list",
    ctaDesc: "Winerim integrates variety information, commercial perception and food pairings directly into your chart management tool.",
    ctaButton: "Request demo",
    faqQ1: "How many grape varieties does Winerim cover?",
    faqA1: "The Winerim catalog includes more than 85 grape varieties from over 30 countries, with information on synonymies, key regions and tasting notes.",
    faqQ2: "Why does it matter to know grapes for managing a chart?",
    faqA2: "Grape variety is one of the main decision axes for diners. Understanding what each grape communicates, how it is perceived and what it pairs with allows for more effective charts and better sales.",
    faqQ3: "What is an international variety vs. a local one?",
    faqA3: "International varieties (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) are grown globally and have high recognition. Local ones (Mencía, Godello, Nerello Mascalese) are exclusive to specific areas and provide differentiation.",
    faqQ4: "What are the synonyms of a grape?",
    faqA4: "Many varieties receive different names depending on the country or region. Tempranillo is Tinto Fino in Ribera del Duero, Cencibel in La Mancha and Tinta Roriz in Portugal. They are the same grape.",
  },
  it: {
    seoTitle: "Vitigni | Guida Completa per l'Ospitalità",
    seoDescription: "Guida completa a 87 vitigni per l'ospitalità. Profilo sensoriale, ruolo in carta, criteri commerciali e abbinamenti. Approccio Winerim.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Vitigni",
    tag: "vitigni · ",
    countries: " paesi",
    title: "Vitigni",
    titleSpan: "del vino",
    description1: " rossi, ",
    description2: " bianchi: ogni vitigno con il suo profilo sensoriale, il suo ruolo commerciale in carta e la lettura Winerim per l'ospitalità.",
    statVariedades: "Vitigni",
    statTintas: "Rossi",
    statBlancas: "Bianchi",
    statPaises: "Paesi",
    searchPlaceholder: "Cerca vitigno, sinonimo o regione...",
    filterAll: "Tutti",
    filterTintas: "🍷 Rossi",
    filterBlancas: "🥂 Bianchi",
    allCountries: "Tutti i paesi",
    clear: "Cancella",
    featured: "Vitigni più riconosciuti",
    featuredDesc: "I vitigni che ogni professionista dell'ospitalità dovrebbe conoscere.",
    differential: "Vitigni differenziali",
    differentialDesc: "Vitigni che portano criterio, scoperta e sofisticazione in una carta.",
    allGrapes: "Tutti i vitigni",
    resultFound: " vitigni trovati",
    notFound: "Nessun vitigno trovato corrispondente ai filtri.",
    ctaTitle: "Porta questa conoscenza nella tua",
    ctaSpan: "lista dei vini",
    ctaDesc: "Winerim integra le informazioni sui vitigni, la percezione commerciale e gli abbinamenti direttamente nello strumento di gestione della carta.",
    ctaButton: "Richiedi demo",
    faqQ1: "Quanti vitigni copre Winerim?",
    faqA1: "Il catalogo Winerim include più di 85 vitigni da oltre 30 paesi, con informazioni su sinonimi, regioni chiave e note di degustazione.",
    faqQ2: "Perché è importante conoscere i vitigni per gestire una carta?",
    faqA2: "Il vitigno è uno dei principali assi decisionali per i commensali. Comprendere cosa comunica ogni vitigno, come viene percepito e con cosa si abbina consente di creare carte più efficaci e vendere meglio.",
    faqQ3: "Qual è la differenza tra un vitigno internazionale e uno locale?",
    faqA3: "I vitigni internazionali (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) sono coltivati globalmente e hanno alto riconoscimento. Quelli locali (Mencía, Godello, Nerello Mascalese) sono esclusivi di aree specifiche e forniscono differenziazione.",
    faqQ4: "Quali sono i sinonimi di un vitigno?",
    faqA4: "Molti vitigni ricevono nomi diversi a seconda del paese o della regione. Tempranillo è Tinto Fino a Ribera del Duero, Cencibel a La Mancha e Tinta Roriz in Portogallo. Sono lo stesso vitigno.",
  },
  fr: {
    seoTitle: "Cépages | Guide Complet pour l'Hôtellerie",
    seoDescription: "Guide complet de 87 cépages pour l'hôtellerie. Profil sensoriel, rôle en carte, critères commerciaux et accords mets-vins. Approche Winerim.",
    breadcrumb1: "Bibliothèque du Vin",
    breadcrumb2: "Cépages",
    tag: "cépages · ",
    countries: " pays",
    title: "Cépages",
    titleSpan: "du vin",
    description1: " rouges, ",
    description2: " blancs : chaque cépage avec son profil sensoriel, son rôle commercial en carte et la lecture Winerim pour l'hôtellerie.",
    statVariedades: "Cépages",
    statTintas: "Rouges",
    statBlancas: "Blancs",
    statPaises: "Pays",
    searchPlaceholder: "Rechercher cépage, synonyme ou région...",
    filterAll: "Tous",
    filterTintas: "🍷 Rouges",
    filterBlancas: "🥂 Blancs",
    allCountries: "Tous les pays",
    clear: "Effacer",
    featured: "Cépages les plus reconnus",
    featuredDesc: "Les cépages que tout professionnel de l'hôtellerie devrait maîtriser.",
    differential: "Cépages différenciés",
    differentialDesc: "Cépages qui apportent du critère, de la découverte et de la sophistication à une carte.",
    allGrapes: "Tous les cépages",
    resultFound: " cépages trouvés",
    notFound: "Aucun cépage trouvé correspondant aux filtres.",
    ctaTitle: "Apportez cette connaissance à votre",
    ctaSpan: "liste des vins",
    ctaDesc: "Winerim intègre les informations sur les cépages, la perception commerciale et les accords directement dans votre outil de gestion de carte.",
    ctaButton: "Demander une démo",
    faqQ1: "Combien de cépages Winerim couvre-t-il?",
    faqA1: "Le catalogue Winerim comprend plus de 85 cépages de plus de 30 pays, avec des informations sur les synonymes, les régions clés et les notes de dégustation.",
    faqQ2: "Pourquoi est-il important de connaître les cépages pour gérer une carte?",
    faqA2: "Le cépage est l'un des principaux axes de décision des convives. Comprendre ce que communique chaque cépage, comment il est perçu et avec quoi il s'accorde permet de concevoir des cartes plus efficaces et de vendre mieux.",
    faqQ3: "Quelle est la différence entre un cépage international et un cépage local?",
    faqA3: "Les cépages internationaux (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) sont cultivés mondialement et jouissent d'une grande reconnaissance. Les locaux (Mencía, Godello, Nerello Mascalese) sont exclusifs à certaines zones et apportent de la différenciation.",
    faqQ4: "Qu'est-ce que les synonymes d'un cépage?",
    faqA4: "De nombreux cépages portent différents noms selon le pays ou la région. Tempranillo est Tinto Fino à Ribera del Duero, Cencibel à La Mancha et Tinta Roriz au Portugal. C'est le même cépage.",
  },
  de: {
    seoTitle: "Rebsorten | Vollständiger Leitfaden für Gastronomie",
    seoDescription: "Vollständiger Leitfaden zu 87 Rebsorten für Gastronomie. Sensorisches Profil, Kartenfunktion, kommerzielle Kriterien und Speisebegleitungen. Winerim-Ansatz.",
    breadcrumb1: "Weinbibliothek",
    breadcrumb2: "Rebsorten",
    tag: "Sorten · ",
    countries: " Länder",
    title: "Rebsorten",
    titleSpan: "Wein",
    description1: " Rotweine, ",
    description2: " Weißweine: jede Sorte mit ihrem sensorischen Profil, ihrer kommerziellen Funktion auf der Karte und der Winerim-Interpretation für Gastronomie.",
    statVariedades: "Rebsorten",
    statTintas: "Rotweile",
    statBlancas: "Weiße",
    statPaises: "Länder",
    searchPlaceholder: "Rebsorte, Synonym oder Region suchen...",
    filterAll: "Alle",
    filterTintas: "🍷 Rotweine",
    filterBlancas: "🥂 Weiße",
    allCountries: "Alle Länder",
    clear: "Löschen",
    featured: "Anerkannteste Rebsorten",
    featuredDesc: "Die Rebsorten, die jeder Gastronomie-Profi beherrschen sollte.",
    differential: "Differenziale Rebsorten",
    differentialDesc: "Rebsorten, die Kriterium, Entdeckung und Raffinesse auf eine Karte bringen.",
    allGrapes: "Alle Rebsorten",
    resultFound: " Rebsorten gefunden",
    notFound: "Keine Rebsorten gefunden, die den Filtern entsprechen.",
    ctaTitle: "Bringen Sie dieses Wissen auf Ihre",
    ctaSpan: "Weinkarte",
    ctaDesc: "Winerim integriert Rebsorten-Informationen, kommerzielle Wahrnehmung und Speisebegleitungen direkt in Ihr Kartenverwaltungs-Tool.",
    ctaButton: "Demo anfordern",
    faqQ1: "Wie viele Rebsorten deckt Winerim ab?",
    faqA1: "Der Winerim-Katalog umfasst mehr als 85 Rebsorten aus über 30 Ländern mit Informationen zu Synonymen, Schlüsselregionen und Verkostungsnotizen.",
    faqQ2: "Warum ist es wichtig, Rebsorten zur Verwaltung einer Karte zu kennen?",
    faqA2: "Die Rebsorte ist eine der Hauptentscheidungsachsen für die Gäste. Das Verständnis, was jede Sorte kommuniziert, wie sie wahrgenommen wird und womit sie kombiniert wird, ermöglicht effektivere Karten und bessere Verkäufe.",
    faqQ3: "Was ist der Unterschied zwischen einer internationalen und einer lokalen Rebsorte?",
    faqA3: "Internationale Sorten (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) werden weltweit angebaut und haben hohe Anerkennung. Lokale (Mencía, Godello, Nerello Mascalese) sind exklusiv für bestimmte Gebiete und bieten Differenzierung.",
    faqQ4: "Was sind Synonyme einer Rebsorte?",
    faqA4: "Viele Sorten tragen je nach Land oder Region unterschiedliche Namen. Tempranillo ist Tinto Fino in Ribera del Duero, Cencibel in La Mancha und Tinta Roriz in Portugal. Sie sind dieselbe Sorte.",
  },
  pt: {
    seoTitle: "Castas de Uva | Guia Completo para Hotelaria",
    seoDescription: "Guia completo de 87 castas para hotelaria. Perfil sensorial, papel em carta, critérios comerciais e harmonizações. Abordagem Winerim.",
    breadcrumb1: "Biblioteca do Vinho",
    breadcrumb2: "Castas de uva",
    tag: "castas · ",
    countries: " países",
    title: "Castas",
    titleSpan: "de uva",
    description1: " tintos, ",
    description2: " brancos: cada casta com seu perfil sensorial, seu papel comercial em carta e a leitura Winerim para hotelaria.",
    statVariedades: "Castas",
    statTintas: "Tintos",
    statBlancas: "Brancos",
    statPaises: "Países",
    searchPlaceholder: "Procure por casta, sinônimo ou região...",
    filterAll: "Todos",
    filterTintas: "🍷 Tintos",
    filterBlancas: "🥂 Brancos",
    allCountries: "Todos os países",
    clear: "Limpar",
    featured: "Castas mais reconhecidas",
    featuredDesc: "As castas que todo profissional de hotelaria deveria dominar.",
    differential: "Castas diferenciais",
    differentialDesc: "Castas que trazem critério, descoberta e sofisticação a uma carta.",
    allGrapes: "Todas as castas",
    resultFound: " castas encontradas",
    notFound: "Nenhuma casta encontrada correspondendo aos filtros.",
    ctaTitle: "Leve este conhecimento para sua",
    ctaSpan: "lista de vinhos",
    ctaDesc: "Winerim integra informações de castas, percepção comercial e harmonizações diretamente em sua ferramenta de gestão de carta.",
    ctaButton: "Solicitar demo",
    faqQ1: "Quantas castas de uva o Winerim cobre?",
    faqA1: "O catálogo Winerim inclui mais de 85 castas de mais de 30 países, com informações sobre sinônimos, regiões-chave e notas de degustação.",
    faqQ2: "Por que é importante conhecer as castas para gerenciar uma carta?",
    faqA2: "A casta é um dos principais eixos de decisão para os clientes. Entender o que cada casta comunica, como é percebida e com o que harmoniza permite projetar cartas mais efetivas e vender melhor.",
    faqQ3: "Qual é a diferença entre uma casta internacional e uma local?",
    faqA3: "As castas internacionais (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) são cultivadas globalmente e têm alto reconhecimento. As locais (Mencía, Godello, Nerello Mascalese) são exclusivas de áreas específicas e proporcionam diferenciação.",
    faqQ4: "O que são sinônimos de uma casta?",
    faqA4: "Muitas castas recebem nomes diferentes conforme o país ou região. Tempranillo é Tinto Fino em Ribera del Duero, Cencibel em La Mancha e Tinta Roriz em Portugal. São a mesma casta.",
  },
};

const faqs = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
];

const colorFilters: { key: GrapeColor | "all"; label: string }[] = [
  { key: "all", label: "filterAll" },
  { key: "tinta", label: "filterTintas" },
  { key: "blanca", label: "filterBlancas" },
];

const countryOptions = [...new Set(grapeCatalog.flatMap((g) => g.countries))].sort();

const GrapesHub = () => {
  const { lang, allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState<GrapeColor | "all">("all");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const filtered = useMemo(() => {
    let results = grapeCatalog;
    if (colorFilter !== "all") {
      results = results.filter((g) => g.color === colorFilter);
    }
    if (countryFilter) {
      results = results.filter((g) => g.countries.includes(countryFilter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.synonyms.some((s) => s.toLowerCase().includes(q)) ||
          g.keyRegions.some((r) => r.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, colorFilter, countryFilter]);

  const tintas = grapeCatalog.filter((g) => g.color === "tinta").length;
  const blancas = grapeCatalog.filter((g) => g.color === "blanca").length;
  const uniqueCountries = [...new Set(grapeCatalog.flatMap((g) => g.countries))].length;

  const featured = grapeEntries.filter((g) => g.clientRecognition === "muy-alto" || g.clientRecognition === "alto");
  const differential = grapeEntries.filter((g) => g.scope === "diferencial" || g.cartaRole.includes("descubrimiento"));

  // Slugs already shown in featured/differential to avoid duplicates
  const shownSlugs = useMemo(() => {
    const slugs = new Set<string>();
    featured.forEach((g) => slugs.add(g.slug));
    differential.forEach((g) => slugs.add(g.slug));
    return slugs;
  }, [featured, differential]);

  const hasActiveFilters = colorFilter !== "all" || !!countryFilter || !!search.trim();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={i18n[lang as keyof typeof i18n]?.seoTitle ?? i18n.es.seoTitle}
        description={i18n[lang as keyof typeof i18n]?.seoDescription ?? i18n.es.seoDescription}
        url="https://winerim.wine/biblioteca-vino/uvas"
        hreflang={allLangPaths("/biblioteca-vino/uvas")}
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
            <Grape size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {grapeCatalog.length} {i18n[lang as keyof typeof i18n]?.tag ?? i18n.es.tag}{uniqueCountries}{i18n[lang as keyof typeof i18n]?.countries ?? i18n.es.countries}
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
            {tintas}{i18n[lang as keyof typeof i18n]?.description1 ?? i18n.es.description1}{blancas}{i18n[lang as keyof typeof i18n]?.description2 ?? i18n.es.description2}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: i18n[lang as keyof typeof i18n]?.statVariedades ?? i18n.es.statVariedades, value: String(grapeCatalog.length) },
              { label: i18n[lang as keyof typeof i18n]?.statTintas ?? i18n.es.statTintas, value: String(tintas) },
              { label: i18n[lang as keyof typeof i18n]?.statBlancas ?? i18n.es.statBlancas, value: String(blancas) },
              { label: i18n[lang as keyof typeof i18n]?.statPaises ?? i18n.es.statPaises, value: String(uniqueCountries) },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-card rounded-xl border border-border p-4 text-center">
                <p className="font-heading text-2xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={i18n[lang as keyof typeof i18n]?.searchPlaceholder ?? i18n.es.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gradient-card border-border"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Filter size={14} className="text-muted-foreground" />
              </div>
              {colorFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setColorFilter(f.key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    colorFilter === f.key
                      ? "bg-wine/10 border-wine/30 text-wine font-medium"
                      : "border-border text-muted-foreground hover:border-wine/20"
                  }`}
                >
                  {i18n[lang as keyof typeof i18n]?.[f.label as keyof typeof i18n.es] ?? i18n.es[f.label as keyof typeof i18n.es]}
                </button>
              ))}

              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-foreground"
              >
                <option value="">{i18n[lang as keyof typeof i18n]?.allCountries ?? i18n.es.allCountries}</option>
                {countryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={() => { setSearch(""); setColorFilter("all"); setCountryFilter(""); }}
                  className="text-xs text-muted-foreground hover:text-wine flex items-center gap-1 transition-colors"
                >
                  <X size={12} /> {i18n[lang as keyof typeof i18n]?.clear ?? i18n.es.clear}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED GRAPES */}
      {!hasActiveFilters && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {i18n[lang as keyof typeof i18n]?.featured ?? i18n.es.featured}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {i18n[lang as keyof typeof i18n]?.featuredDesc ?? i18n.es.featuredDesc}
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((grape, i) => (
                <ScrollReveal key={grape.slug} delay={i * 0.05}>
                  <GrapeCard grape={grape} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIFFERENTIAL GRAPES */}
      {!hasActiveFilters && differential.length > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {i18n[lang as keyof typeof i18n]?.differential ?? i18n.es.differential}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {i18n[lang as keyof typeof i18n]?.differentialDesc ?? i18n.es.differentialDesc}
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {differential.map((grape, i) => (
                <ScrollReveal key={grape.slug} delay={i * 0.05}>
                  <GrapeCard grape={grape} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL GRAPES GRID */}
      <section className={`section-padding ${!hasActiveFilters ? "bg-gradient-dark" : ""}`}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              {hasActiveFilters ? `${filtered.length}${i18n[lang as keyof typeof i18n]?.resultFound ?? i18n.es.resultFound}` : i18n[lang as keyof typeof i18n]?.allGrapes ?? i18n.es.allGrapes}
            </h2>
          </ScrollReveal>

          {/* Group by color when no filters active — exclude already-shown grapes */}
          {!hasActiveFilters ? (
            (["tinta", "blanca"] as GrapeColor[]).map((color) => {
              const grapes = filtered.filter((g) => g.color === color && !shownSlugs.has(g.slug));
              if (grapes.length === 0) return null;
              return (
                <div key={color} className="mb-12 last:mb-0">
                  <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                    <span>{colorLabels[color].emoji}</span> {colorLabels[color].label}
                    <span className="text-sm text-muted-foreground font-normal">({grapes.length})</span>
                  </h3>
                  <CatalogGrid grapes={grapes} />
                </div>
              );
            })
          ) : (
            <CatalogGrid grapes={filtered} />
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{i18n[lang as keyof typeof i18n]?.notFound ?? i18n.es.notFound}</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs.map(f => ({
          q: i18n[lang as keyof typeof i18n]?.[f.q as keyof typeof i18n.es] ?? i18n.es[f.q as keyof typeof i18n.es],
          a: i18n[lang as keyof typeof i18n]?.[f.a as keyof typeof i18n.es] ?? i18n.es[f.a as keyof typeof i18n.es],
        }))}
        schemaId="grapes-hub"
      />

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
                {i18n[lang as keyof typeof i18n]?.ctaButton ?? i18n.es.ctaButton} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────────── */

const GrapeCard = ({ grape }: { grape: { slug: string; name: string; description: string; color: GrapeColor; cartaRole: string[]; countries: string[] } }) => (
  <Link
    to={`/biblioteca-vino/uvas/${grape.slug}`}
    className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm">{colorLabels[grape.color].emoji}</span>
      <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
    </div>
    <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors mb-2">{grape.name}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{grape.description}</p>
    <div className="flex flex-wrap gap-1.5">
      {grape.cartaRole.slice(0, 3).map((role) => (
        <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md capitalize">{role}</span>
      ))}
    </div>
  </Link>
);

const CatalogGrid = ({ grapes }: { grapes: GrapeCatalogEntry[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {grapes.map((grape) => {
      const isFull = hasFullEntry(grape.slug);
      return (
        <Link
          key={grape.slug}
          to={`/biblioteca-vino/uvas/${grape.slug}`}
          className="group flex flex-col bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{colorLabels[grape.color].emoji}</span>
              <h4 className="font-heading text-sm font-semibold group-hover:text-wine transition-colors">{grape.name}</h4>
            </div>
            <ArrowRight size={12} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          {grape.synonyms.length > 0 && (
            <p className="text-xs text-muted-foreground/70 italic mb-2 line-clamp-1">{grape.synonyms.join(", ")}</p>
          )}
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{grape.tastingNotes}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {grape.keyRegions.slice(0, 2).map((r) => (
              <span key={r} className="text-[10px] bg-wine/8 text-wine px-1.5 py-0.5 rounded">{r}</span>
            ))}
            {isFull && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-wine/20 text-wine ml-auto">Guía</Badge>
            )}
          </div>
        </Link>
      );
    })}
  </div>
);

export default GrapesHub;
