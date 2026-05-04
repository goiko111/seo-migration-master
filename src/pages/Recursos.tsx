import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download, Wine, Search, DollarSign, BarChart3, Brain,
  FileText, CheckCircle, Layers, Building2, TrendingUp,
  ArrowRight, Package, Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── i18n content ── */
type LangContent = {
  metaTitle: string; metaDesc: string;
  heroLabel: string; heroTitle: string; heroHighlight: string; heroDesc: string;
  filterAll: string; download: string; items: string;
  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
  alsoLabel: string; guidesLink: string; toolsLink: string;
  freeLabel: string; emptyFilter: string; breadcrumb: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Recursos descargables para restaurantes | Plantillas, checklists y scorecards | Winerim",
    metaDesc: "Descarga plantillas, checklists y scorecards profesionales para optimizar tu carta de vinos. Recursos accionables listos para aplicar hoy mismo.",
    heroLabel: "Biblioteca de recursos",
    heroTitle: "Herramientas accionables para ",
    heroHighlight: "aplicar hoy mismo",
    heroDesc: "Plantillas, checklists y scorecards profesionales diseñados para que mejores tu carta de vinos desde el primer día. Sin teoría, solo acción.",
    filterAll: "Todos", download: "Descargar recurso", items: "recursos",
    ctaTitle: "¿Quieres que todo esto se haga automáticamente?",
    ctaDesc: "Todo lo que ofrecen estos recursos — análisis de márgenes, control de rotación, scoring mensual — Winerim lo automatiza para ti.",
    ctaPrimary: "Solicitar demo", ctaSecondary: "Analizar mi carta gratis",
    alsoLabel: "También te interesa", guidesLink: "Guías para aprender", toolsLink: "Herramientas interactivas",
    freeLabel: "gratis", emptyFilter: "No hay recursos con este filtro.", breadcrumb: "Recursos",
  },
  en: {
    metaTitle: "Downloadable Resources for Restaurants | Templates, Checklists & Scorecards | Winerim",
    metaDesc: "Download professional templates, checklists and scorecards to optimize your wine list. Actionable resources ready to apply today.",
    heroLabel: "Resource library",
    heroTitle: "Actionable tools to ",
    heroHighlight: "apply today",
    heroDesc: "Professional templates, checklists and scorecards designed to improve your wine list from day one. No theory, just action.",
    filterAll: "All", download: "Download resource", items: "resources",
    ctaTitle: "Want all of this done automatically?",
    ctaDesc: "Everything these resources offer — margin analysis, rotation control, monthly scoring — Winerim automates it for you.",
    ctaPrimary: "Request demo", ctaSecondary: "Analyze my list free",
    alsoLabel: "You may also like", guidesLink: "Guides to learn", toolsLink: "Interactive tools",
    freeLabel: "free", emptyFilter: "No resources match this filter.", breadcrumb: "Resources",
  },
  it: {
    metaTitle: "Risorse scaricabili per ristoranti | Template, checklist e scorecard | Winerim",
    metaDesc: "Scarica template, checklist e scorecard professionali per ottimizzare la tua carta dei vini. Risorse azionabili pronte da applicare oggi.",
    heroLabel: "Libreria risorse",
    heroTitle: "Strumenti azionabili da ",
    heroHighlight: "applicare subito",
    heroDesc: "Template, checklist e scorecard professionali per migliorare la tua carta dei vini dal primo giorno. Niente teoria, solo azione.",
    filterAll: "Tutti", download: "Scarica risorsa", items: "risorse",
    ctaTitle: "Vuoi che tutto questo sia automatico?",
    ctaDesc: "Tutto quello che offrono queste risorse — analisi margini, controllo rotazione, scoring mensile — Winerim lo automatizza per te.",
    ctaPrimary: "Richiedi demo", ctaSecondary: "Analizza la mia carta gratis",
    alsoLabel: "Potrebbe interessarti anche", guidesLink: "Guide per imparare", toolsLink: "Strumenti interattivi",
    freeLabel: "gratis", emptyFilter: "Nessuna risorsa per questo filtro.", breadcrumb: "Risorse",
  },
  fr: {
    metaTitle: "Ressources téléchargeables pour restaurants | Modèles, checklists et scorecards | Winerim",
    metaDesc: "Téléchargez des modèles, checklists et scorecards professionnels pour optimiser votre carte des vins. Ressources actionnables prêtes à l'emploi.",
    heroLabel: "Bibliothèque de ressources",
    heroTitle: "Outils actionnables à ",
    heroHighlight: "appliquer aujourd'hui",
    heroDesc: "Modèles, checklists et scorecards professionnels pour améliorer votre carte des vins dès le premier jour. Pas de théorie, que de l'action.",
    filterAll: "Tous", download: "Télécharger", items: "ressources",
    ctaTitle: "Vous voulez que tout cela soit automatique ?",
    ctaDesc: "Tout ce qu'offrent ces ressources — analyse des marges, contrôle de la rotation, scoring mensuel — Winerim l'automatise pour vous.",
    ctaPrimary: "Demander une démo", ctaSecondary: "Analyser ma carte gratuitement",
    alsoLabel: "Vous aimerez aussi", guidesLink: "Guides pour apprendre", toolsLink: "Outils interactifs",
    freeLabel: "gratuit", emptyFilter: "Aucune ressource ne correspond à ce filtre.", breadcrumb: "Ressources",
  },
  de: {
    metaTitle: "Herunterladbare Ressourcen für Restaurants | Vorlagen, Checklisten & Scorecards | Winerim",
    metaDesc: "Laden Sie professionelle Vorlagen, Checklisten und Scorecards zur Optimierung Ihrer Weinkarte herunter. Sofort anwendbare Ressourcen.",
    heroLabel: "Ressourcenbibliothek",
    heroTitle: "Umsetzbare Werkzeuge zum ",
    heroHighlight: "sofortigen Anwenden",
    heroDesc: "Professionelle Vorlagen, Checklisten und Scorecards, die Ihre Weinkarte vom ersten Tag an verbessern. Keine Theorie, nur Aktion.",
    filterAll: "Alle", download: "Ressource herunterladen", items: "Ressourcen",
    ctaTitle: "Möchten Sie, dass all dies automatisch geschieht?",
    ctaDesc: "Alles, was diese Ressourcen bieten — Margenanalyse, Rotationskontrolle, monatliches Scoring — Winerim automatisiert es für Sie.",
    ctaPrimary: "Demo anfordern", ctaSecondary: "Meine Karte kostenlos analysieren",
    alsoLabel: "Das könnte Sie auch interessieren", guidesLink: "Ratgeber zum Lernen", toolsLink: "Interaktive Werkzeuge",
    freeLabel: "kostenlos", emptyFilter: "Keine Ressourcen für diesen Filter.", breadcrumb: "Ressourcen",
  },
  pt: {
    metaTitle: "Recursos descarregáveis para restaurantes | Modelos, checklists e scorecards | Winerim",
    metaDesc: "Descarregue modelos, checklists e scorecards profissionais para otimizar a sua carta de vinhos. Recursos acionáveis prontos a aplicar hoje.",
    heroLabel: "Biblioteca de recursos",
    heroTitle: "Ferramentas acionáveis para ",
    heroHighlight: "aplicar hoje mesmo",
    heroDesc: "Modelos, checklists e scorecards profissionais concebidos para melhorar a sua carta de vinhos desde o primeiro dia. Sem teoria, só ação.",
    filterAll: "Todos", download: "Descarregar recurso", items: "recursos",
    ctaTitle: "Quer que tudo isto seja feito automaticamente?",
    ctaDesc: "Tudo o que estes recursos oferecem — análise de margens, controlo de rotação, scoring mensal — o Winerim automatiza por si.",
    ctaPrimary: "Pedir demo", ctaSecondary: "Analisar a minha carta grátis",
    alsoLabel: "Também lhe pode interessar", guidesLink: "Guias para aprender", toolsLink: "Ferramentas interativas",
    freeLabel: "grátis", emptyFilter: "Não há recursos com este filtro.", breadcrumb: "Recursos",
  },
};

/* ── Resource type config ── */
type ResourceType = "plantilla" | "checklist" | "scorecard" | "revision" | "control";

const typeIcons: Record<ResourceType, { icon: React.ElementType; className: string }> = {
  plantilla: { icon: FileText, className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  checklist: { icon: CheckCircle, className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  scorecard: { icon: BarChart3, className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  revision: { icon: Search, className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  control: { icon: Building2, className: "bg-wine/10 text-wine border-wine/20" },
};

const typeLabels: Record<string, Record<ResourceType, string>> = {
  es: { plantilla: "Plantilla", checklist: "Checklist", scorecard: "Scorecard", revision: "Revisión", control: "Control" },
  en: { plantilla: "Template", checklist: "Checklist", scorecard: "Scorecard", revision: "Review", control: "Control" },
  it: { plantilla: "Template", checklist: "Checklist", scorecard: "Scorecard", revision: "Revisione", control: "Controllo" },
  fr: { plantilla: "Modèle", checklist: "Checklist", scorecard: "Scorecard", revision: "Révision", control: "Contrôle" },
  de: { plantilla: "Vorlage", checklist: "Checkliste", scorecard: "Scorecard", revision: "Prüfung", control: "Kontrolle" },
  pt: { plantilla: "Modelo", checklist: "Checklist", scorecard: "Scorecard", revision: "Revisão", control: "Controlo" },
};

type ResourceItem = {
  slug: string;
  icon: React.ElementType;
  type: ResourceType;
  tags: string[];
};

const resourceItems: ResourceItem[] = [
  { slug: "plantilla-carta-de-vinos", icon: FileText, type: "plantilla", tags: ["estructura", "inicio"] },
  { slug: "checklist-carta-de-vinos-rentable", icon: CheckCircle, type: "checklist", tags: ["rentabilidad", "intermedio"] },
  { slug: "guia-vino-por-copa-para-restaurantes", icon: Wine, type: "plantilla", tags: ["copa", "intermedio"] },
  { slug: "plantilla-wine-mapping-restaurante", icon: Layers, type: "plantilla", tags: ["pricing", "intermedio"] },
  { slug: "plantilla-estrategia-vinos-por-copa", icon: Wine, type: "plantilla", tags: ["copa", "avanzado"] },
  { slug: "checklist-deteccion-vinos-muertos", icon: Search, type: "checklist", tags: ["rotación", "intermedio"] },
  { slug: "plantilla-formacion-equipo-sala", icon: Brain, type: "plantilla", tags: ["equipo", "inicio"] },
  { slug: "plantilla-analisis-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "avanzado"] },
  { slug: "scorecard-rendimiento-carta", icon: BarChart3, type: "scorecard", tags: ["analítica", "avanzado"] },
  { slug: "checklist-carta-que-vende", icon: TrendingUp, type: "checklist", tags: ["rentabilidad", "inicio"] },
  { slug: "plantilla-equilibrio-carta", icon: Layers, type: "plantilla", tags: ["estructura", "intermedio"] },
  { slug: "plantilla-revision-mensual-carta", icon: FileText, type: "revision", tags: ["analítica", "avanzado"] },
  { slug: "revision-mensual-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "rentabilidad", "avanzado"] },
  { slug: "plantilla-control-grupo-restauracion", icon: Building2, type: "control", tags: ["grupo", "avanzado"] },
];

const resourceTexts: Record<string, { title: string; desc: string }[]> = {
  es: [
    { title: "Plantilla de carta de vinos", desc: "Plantilla profesional para diseñar y estructurar tu carta de vinos desde cero." },
    { title: "Checklist carta rentable", desc: "Revisa punto por punto si tu carta está optimizada para vender." },
    { title: "Guía vino por copa", desc: "Todo sobre cómo diseñar y rentabilizar tu oferta de vino por copa." },
    { title: "Plantilla wine mapping", desc: "Estructura precios y distribución de vinos en tu carta con criterio." },
    { title: "Estrategia de vinos por copa", desc: "Plan operativo completo para diseñar, ejecutar y controlar tu programa de copa." },
    { title: "Detección de vinos muertos", desc: "Identifica referencias sin rotación y cuantifica el capital inmovilizado." },
    { title: "Formación exprés para sala", desc: "Programa de formación en vino para tu equipo de sala en menos de 2 semanas." },
    { title: "Análisis de márgenes", desc: "Analiza la rentabilidad de cada referencia: coste, PVP, multiplicador y contribución." },
    { title: "Scorecard mensual", desc: "KPIs esenciales de tu carta cada mes: ventas, rotación, margen y vino por copa." },
    { title: "¿Tu carta realmente vende?", desc: "30 puntos para evaluar la capacidad de conversión de tu carta de vinos." },
    { title: "Equilibrio de carta", desc: "Analiza el equilibrio por estilos, regiones, precios y tipologías." },
    { title: "Revisión mensual de carta", desc: "Proceso estructurado para revisar tu carta cada mes con datos reales." },
    { title: "Revisión mensual de márgenes", desc: "Una plantilla para revisar cada mes si tu carta está perdiendo margen y decidir qué corregir antes de que el problema crezca." },
    { title: "Control para grupos", desc: "Dashboard comparativo, surtido centralizado y benchmarking entre locales." },
  ],
  en: [
    { title: "Wine list template", desc: "Professional template to design and structure your wine list from scratch." },
    { title: "Profitable wine list checklist", desc: "Point-by-point review of whether your list is optimized to sell." },
    { title: "Wine by the glass guide", desc: "Everything about designing and monetizing your by-the-glass offer." },
    { title: "Wine mapping template", desc: "Structure prices and wine distribution across your list with method." },
    { title: "By-the-glass strategy", desc: "Full operating plan to design, execute and control your by-the-glass program." },
    { title: "Dead wines detection", desc: "Spot non-rotating SKUs and quantify the capital locked in stock." },
    { title: "Express training for service", desc: "Wine training program for your floor team in under 2 weeks." },
    { title: "Margin analysis", desc: "Analyze profitability of every reference: cost, price, multiplier and contribution." },
    { title: "Monthly scorecard", desc: "Essential KPIs of your list each month: sales, rotation, margin and by-the-glass." },
    { title: "Does your list really sell?", desc: "30 points to evaluate the conversion power of your wine list." },
    { title: "Wine list balance", desc: "Analyze balance by style, region, price and type." },
    { title: "Monthly list review", desc: "A structured process to review your list every month with real data." },
    { title: "Monthly margin review", desc: "A template to check every month whether your list is losing margin and decide what to fix before the problem grows." },
    { title: "Group control dashboard", desc: "Comparative dashboard, centralized assortment and benchmarking across locations." },
  ],
  it: [
    { title: "Template carta dei vini", desc: "Template professionale per progettare e strutturare la tua carta dei vini da zero." },
    { title: "Checklist carta redditizia", desc: "Verifica punto per punto se la tua carta è ottimizzata per vendere." },
    { title: "Guida vino al calice", desc: "Tutto su come progettare e rendere redditizia la tua offerta al calice." },
    { title: "Template wine mapping", desc: "Struttura prezzi e distribuzione dei vini nella tua carta con metodo." },
    { title: "Strategia vini al calice", desc: "Piano operativo completo per progettare, eseguire e controllare il tuo programma al calice." },
    { title: "Rilevamento vini fermi", desc: "Identifica referenze senza rotazione e quantifica il capitale immobilizzato." },
    { title: "Formazione express per la sala", desc: "Programma di formazione sul vino per la tua sala in meno di 2 settimane." },
    { title: "Analisi dei margini", desc: "Analizza la redditività di ogni referenza: costo, prezzo, moltiplicatore e contributo." },
    { title: "Scorecard mensile", desc: "KPI essenziali della tua carta ogni mese: vendite, rotazione, margine e calice." },
    { title: "La tua carta vende davvero?", desc: "30 punti per valutare la capacità di conversione della tua carta." },
    { title: "Equilibrio della carta", desc: "Analizza l'equilibrio per stile, regione, prezzo e tipologia." },
    { title: "Revisione mensile della carta", desc: "Processo strutturato per rivedere la tua carta ogni mese con dati reali." },
    { title: "Revisione mensile dei margini", desc: "Un template per controllare ogni mese se la carta sta perdendo margine e decidere cosa correggere prima che il problema cresca." },
    { title: "Controllo per gruppi", desc: "Dashboard comparativa, assortimento centralizzato e benchmarking tra locali." },
  ],
  fr: [
    { title: "Modèle de carte des vins", desc: "Modèle professionnel pour concevoir et structurer votre carte des vins de zéro." },
    { title: "Checklist carte rentable", desc: "Vérifiez point par point si votre carte est optimisée pour vendre." },
    { title: "Guide vin au verre", desc: "Tout pour concevoir et rentabiliser votre offre au verre." },
    { title: "Modèle wine mapping", desc: "Structurez prix et distribution des vins sur votre carte avec méthode." },
    { title: "Stratégie de vins au verre", desc: "Plan opérationnel complet pour concevoir, exécuter et piloter votre programme au verre." },
    { title: "Détection des vins morts", desc: "Identifiez les références sans rotation et chiffrez le capital immobilisé." },
    { title: "Formation express pour la salle", desc: "Programme de formation vin pour votre équipe de salle en moins de 2 semaines." },
    { title: "Analyse des marges", desc: "Analysez la rentabilité de chaque référence : coût, prix, multiplicateur et contribution." },
    { title: "Scorecard mensuelle", desc: "KPI essentiels de votre carte chaque mois : ventes, rotation, marge et vin au verre." },
    { title: "Votre carte vend-elle vraiment ?", desc: "30 points pour évaluer la capacité de conversion de votre carte des vins." },
    { title: "Équilibre de la carte", desc: "Analysez l'équilibre par styles, régions, prix et typologies." },
    { title: "Revue mensuelle de la carte", desc: "Processus structuré pour réviser votre carte chaque mois avec des données réelles." },
    { title: "Revue mensuelle des marges", desc: "Un modèle pour vérifier chaque mois si votre carte perd en marge et décider quoi corriger avant que le problème ne s'aggrave." },
    { title: "Contrôle pour groupes", desc: "Tableau comparatif, assortiment centralisé et benchmarking entre établissements." },
  ],
  de: [
    { title: "Vorlage Weinkarte", desc: "Professionelle Vorlage, um Ihre Weinkarte von Grund auf zu gestalten und zu strukturieren." },
    { title: "Checkliste rentable Weinkarte", desc: "Prüfen Sie Punkt für Punkt, ob Ihre Karte verkaufsoptimiert ist." },
    { title: "Leitfaden Wein im Glas", desc: "Alles über die Gestaltung und Rentabilisierung Ihres offenen Weinangebots." },
    { title: "Vorlage Wine Mapping", desc: "Strukturieren Sie Preise und Weinverteilung Ihrer Karte mit Methode." },
    { title: "Strategie Wein im Glas", desc: "Vollständiger Operationsplan zur Gestaltung, Umsetzung und Steuerung Ihres Glasprogramms." },
    { title: "Erkennung 'toter' Weine", desc: "Identifizieren Sie umsatzlose Referenzen und beziffern Sie das gebundene Kapital." },
    { title: "Express-Schulung für den Service", desc: "Weinschulungsprogramm für Ihr Serviceteam in weniger als 2 Wochen." },
    { title: "Margenanalyse", desc: "Analysieren Sie die Rentabilität jeder Referenz: Kosten, VK, Multiplikator und Beitrag." },
    { title: "Monatliche Scorecard", desc: "Wesentliche KPIs Ihrer Karte jeden Monat: Umsatz, Rotation, Marge und Glasausschank." },
    { title: "Verkauft Ihre Karte wirklich?", desc: "30 Punkte, um die Verkaufskraft Ihrer Weinkarte zu bewerten." },
    { title: "Balance der Weinkarte", desc: "Analysieren Sie die Balance nach Stilen, Regionen, Preisen und Typologien." },
    { title: "Monatliche Karten-Review", desc: "Strukturierter Prozess, um Ihre Karte jeden Monat mit echten Daten zu überprüfen." },
    { title: "Monatliche Margen-Review", desc: "Eine Vorlage, um jeden Monat zu prüfen, ob Ihre Karte an Marge verliert, und zu entscheiden, was zu korrigieren ist, bevor das Problem wächst." },
    { title: "Kontrolle für Gruppen", desc: "Vergleichs-Dashboard, zentrales Sortiment und Benchmarking zwischen Standorten." },
  ],
  pt: [
    { title: "Modelo de carta de vinhos", desc: "Modelo profissional para desenhar e estruturar a sua carta de vinhos de raiz." },
    { title: "Checklist carta rentável", desc: "Verifique ponto a ponto se a sua carta está otimizada para vender." },
    { title: "Guia vinho a copo", desc: "Tudo sobre como desenhar e rentabilizar a sua oferta a copo." },
    { title: "Modelo wine mapping", desc: "Estruture preços e distribuição de vinhos na sua carta com método." },
    { title: "Estratégia de vinhos a copo", desc: "Plano operacional completo para desenhar, executar e controlar o seu programa a copo." },
    { title: "Deteção de vinhos mortos", desc: "Identifique referências sem rotação e quantifique o capital imobilizado." },
    { title: "Formação express para a sala", desc: "Programa de formação em vinho para a sua equipa de sala em menos de 2 semanas." },
    { title: "Análise de margens", desc: "Analise a rentabilidade de cada referência: custo, PVP, multiplicador e contribuição." },
    { title: "Scorecard mensal", desc: "KPIs essenciais da sua carta todos os meses: vendas, rotação, margem e copo." },
    { title: "A sua carta vende mesmo?", desc: "30 pontos para avaliar a capacidade de conversão da sua carta de vinhos." },
    { title: "Equilíbrio da carta", desc: "Analise o equilíbrio por estilos, regiões, preços e tipologias." },
    { title: "Revisão mensal da carta", desc: "Processo estruturado para rever a sua carta todos os meses com dados reais." },
    { title: "Revisão mensal de margens", desc: "Um modelo para verificar todos os meses se a sua carta está a perder margem e decidir o que corrigir antes que o problema cresça." },
    { title: "Controlo para grupos", desc: "Dashboard comparativo, sortido centralizado e benchmarking entre locais." },
  ],
};

const taxonomyFilters: { key: string; labels: Record<string, string> }[] = [
  { key: "all",          labels: { es: "Todos",              en: "All",                 it: "Tutti",              fr: "Tous",                 de: "Alle",                  pt: "Todos" } },
  { key: "pricing",      labels: { es: "Pricing y márgenes", en: "Pricing & margins",   it: "Pricing e margini",  fr: "Pricing et marges",    de: "Pricing & Margen",      pt: "Pricing e margens" } },
  { key: "rotación",     labels: { es: "Rotación y stock",   en: "Rotation & stock",    it: "Rotazione e stock",  fr: "Rotation et stock",    de: "Rotation & Bestand",    pt: "Rotação e stock" } },
  { key: "copa",         labels: { es: "Vino por copa",      en: "Wine by the glass",   it: "Vino al calice",     fr: "Vin au verre",         de: "Wein im Glas",          pt: "Vinho a copo" } },
  { key: "equipo",       labels: { es: "Equipo de sala",     en: "Floor team",          it: "Team di sala",       fr: "Équipe de salle",      de: "Service-Team",          pt: "Equipa de sala" } },
  { key: "estructura",   labels: { es: "Estructura de carta",en: "List structure",      it: "Struttura carta",    fr: "Structure de carte",   de: "Kartenstruktur",        pt: "Estrutura de carta" } },
  { key: "rentabilidad", labels: { es: "Rentabilidad",       en: "Profitability",       it: "Redditività",        fr: "Rentabilité",          de: "Rentabilität",          pt: "Rentabilidade" } },
  { key: "analítica",    labels: { es: "Analítica y KPIs",   en: "Analytics & KPIs",    it: "Analytics e KPI",    fr: "Analytique et KPI",    de: "Analytik & KPIs",       pt: "Analítica e KPIs" } },
  { key: "grupo",        labels: { es: "Grupos",             en: "Groups",              it: "Gruppi",             fr: "Groupes",              de: "Gruppen",               pt: "Grupos" } },
];

const Recursos = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = langContent[lang] || langContent.es;
  const [filter, setFilter] = useState("all");
  const tLabels = typeLabels[lang] || typeLabels.es;
  const texts = resourceTexts[lang] || resourceTexts.es;

  const decorated = resourceItems.map((r, idx) => ({
    ...r,
    title: texts[idx]?.title ?? "",
    desc: texts[idx]?.desc ?? "",
  }));
  const filtered = filter === "all" ? decorated : decorated.filter(r => r.tags.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/recursos"
        hreflang={allLangPaths("/recursos")} />
      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-14 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-wine/4 rounded-full blur-[120px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.breadcrumb }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6">
              <Package size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">{t.heroLabel}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
              <span className="text-gradient-wine">{t.heroHighlight}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {t.heroDesc}
            </motion.p>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">{resourceItems.length}</strong> {t.items}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">Excel</strong> + PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">100%</strong> {t.freeLabel}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {taxonomyFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all border ${
                    filter === f.key
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-transparent text-muted-foreground border-border hover:border-emerald-500/30"
                  }`}
                >
                  {f.key === "all" ? t.filterAll : (f.labels[lang] || f.labels.es)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Counter */}
          <p className="text-xs text-muted-foreground mb-6 font-medium tracking-wider uppercase">
            {filtered.length} {t.items}
          </p>

          {/* Resource cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const Icon = item.icon;
              const typeCfg = typeIcons[item.type];
              const TypeIcon = typeCfg.icon;
              return (
                <ScrollReveal key={item.slug} delay={i * 0.03}>
                  <Link to={localePath("/recursos/" + item.slug)}
                    className="group relative bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-emerald-500/30 transition-all block p-6 h-full hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 duration-300">
                    {/* Type badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${typeCfg.className}`}>
                        <TypeIcon size={10} />
                        {tLabels[item.type]}
                      </span>
                      <Download size={14} className="text-muted-foreground/40 group-hover:text-emerald-400 transition-colors" />
                    </div>

                    {/* Icon + content */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/15 transition-colors">
                        <Icon size={18} className="text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-bold mb-1 group-hover:text-emerald-400 transition-colors duration-300 leading-snug">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                      {t.download} <ArrowRight size={10} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-16">
              {t.emptyFilter}
            </p>
          )}
        </section>

        {/* ── Cross-links ── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-4">{t.alsoLabel}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={localePath("/guias-y-recursos")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 hover:border-blue-500/30 transition-all text-sm group">
                <Sparkles size={14} className="text-blue-400" />
                <span className="font-medium group-hover:text-blue-400 transition-colors">{t.guidesLink}</span>
              </Link>
              <Link to={localePath("/herramientas")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 hover:border-amber-500/30 transition-all text-sm group">
                <Sparkles size={14} className="text-amber-400" />
                <span className="font-medium group-hover:text-amber-400 transition-colors">{t.toolsLink}</span>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/analisis-carta")} className="border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recursos;
