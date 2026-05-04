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

/* ââ i18n content ââ */
type LangContent = {
  metaTitle: string; metaDesc: string;
  heroLabel: string; heroTitle: string; heroHighlight: string; heroDesc: string;
  filterAll: string; download: string; items: string;
  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
  alsoLabel: string; guidesLink: string; toolsLink: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Recursos descargables para restaurantes | Plantillas, checklists y scorecards | Winerim",
    metaDesc: "Descarga plantillas, checklists y scorecards profesionales para optimizar tu carta de vinos. Recursos accionables listos para aplicar hoy mismo.",
    heroLabel: "Biblioteca de recursos",
    heroTitle: "Herramientas accionables para ",
    heroHighlight: "aplicar hoy mismo",
    heroDesc: "Plantillas, checklists y scorecards profesionales diseÃ±ados para que mejores tu carta de vinos desde el primer dÃ­a. Sin teorÃ­a, solo acciÃ³n.",
    filterAll: "Todos", download: "Descargar recurso", items: "recursos",
    ctaTitle: "Â¿Quieres que todo esto se haga automÃ¡ticamente?",
    ctaDesc: "Todo lo que ofrecen estos recursos â anÃ¡lisis de mÃ¡rgenes, control de rotaciÃ³n, scoring mensual â Winerim lo automatiza para ti.",
    ctaPrimary: "Solicitar demo", ctaSecondary: "Analizar mi carta gratis",
    alsoLabel: "TambiÃ©n te interesa", guidesLink: "GuÃ­as para aprender", toolsLink: "Herramientas interactivas",
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
    ctaDesc: "Everything these resources offer â margin analysis, rotation control, monthly scoring â Winerim automates it for you.",
    ctaPrimary: "Request demo", ctaSecondary: "Analyze my list free",
    alsoLabel: "You may also like", guidesLink: "Guides to learn", toolsLink: "Interactive tools",
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
    ctaDesc: "Tutto quello che offrono queste risorse â analisi margini, controllo rotazione, scoring mensile â Winerim lo automatizza per te.",
    ctaPrimary: "Richiedi demo", ctaSecondary: "Analizza la mia carta gratis",
    alsoLabel: "Potrebbe interessarti anche", guidesLink: "Guide per imparare", toolsLink: "Strumenti interattivi",
  },
  fr: {
    metaTitle: "Ressources tÃ©lÃ©chargeables pour restaurants | ModÃ¨les, checklists et scorecards | Winerim",
    metaDesc: "TÃ©lÃ©chargez des modÃ¨les, checklists et scorecards professionnels pour optimiser votre carte des vins. Ressources actionnables prÃªtes Ã  l'emploi.",
    heroLabel: "BibliothÃ¨que de ressources",
    heroTitle: "Outils actionnables Ã  ",
    heroHighlight: "appliquer aujourd'hui",
    heroDesc: "ModÃ¨les, checklists et scorecards professionnels pour amÃ©liorer votre carte des vins dÃ¨s le premier jour. Pas de thÃ©orie, que de l'action.",
    filterAll: "Tous", download: "TÃ©lÃ©charger", items: "ressources",
    ctaTitle: "Vous voulez que tout cela soit automatique ?",
    ctaDesc: "Tout ce qu'offrent ces ressources â analyse des marges, contrÃ´le de la rotation, scoring mensuel â Winerim l'automatise pour vous.",
    ctaPrimary: "Demander une dÃ©mo", ctaSecondary: "Analyser ma carte gratuitement",
    alsoLabel: "Vous aimerez aussi", guidesLink: "Guides pour apprendre", toolsLink: "Outils interactifs",
  },
  de: {
    metaTitle: "Herunterladbare Ressourcen fÃ¼r Restaurants | Vorlagen, Checklisten & Scorecards | Winerim",
    metaDesc: "Laden Sie professionelle Vorlagen, Checklisten und Scorecards zur Optimierung Ihrer Weinkarte herunter. Sofort anwendbare Ressourcen.",
    heroLabel: "Ressourcenbibliothek",
    heroTitle: "Umsetzbare Werkzeuge zum ",
    heroHighlight: "sofortigen Anwenden",
    heroDesc: "Professionelle Vorlagen, Checklisten und Scorecards, die Ihre Weinkarte vom ersten Tag an verbessern. Keine Theorie, nur Aktion.",
    filterAll: "Alle", download: "Ressource herunterladen", items: "Ressourcen",
    ctaTitle: "MÃ¶chten Sie, dass all dies automatisch geschieht?",
    ctaDesc: "Alles, was diese Ressourcen bieten â Margenanalyse, Rotationskontrolle, monatliches Scoring â Winerim automatisiert es fÃ¼r Sie.",
    ctaPrimary: "Demo anfordern", ctaSecondary: "Meine Karte kostenlos analysieren",
    alsoLabel: "Das kÃ¶nnte Sie auch interessieren", guidesLink: "Ratgeber zum Lernen", toolsLink: "Interaktive Werkzeuge",
  },
  pt: {
    metaTitle: "Recursos descarregÃ¡veis para restaurantes | Modelos, checklists e scorecards | Winerim",
    metaDesc: "Descarregue modelos, checklists e scorecards profissionais para otimizar a sua carta de vinhos. Recursos acionÃ¡veis prontos a aplicar hoje.",
    heroLabel: "Biblioteca de recursos",
    heroTitle: "Ferramentas acionÃ¡veis para ",
    heroHighlight: "aplicar hoje mesmo",
    heroDesc: "Modelos, checklists e scorecards profissionais concebidos para melhorar a sua carta de vinhos desde o primeiro dia. Sem teoria, sÃ³ aÃ§Ã£o.",
    filterAll: "Todos", download: "Descarregar recurso", items: "recursos",
    ctaTitle: "Quer que tudo isto seja feito automaticamente?",
    ctaDesc: "Tudo o que estes recursos oferecem â anÃ¡lise de margens, controlo de rotaÃ§Ã£o, scoring mensal â o Winerim automatiza por si.",
    ctaPrimary: "Pedir demo", ctaSecondary: "Analisar a minha carta grÃ¡tis",
    alsoLabel: "TambÃ©m lhe pode interessar", guidesLink: "Guias para aprender", toolsLink: "Ferramentas interativas",
  },
};

/* ââ Resource type config ââ */
const typeLabels: Record<string, Record<string, string>> = {
  plantilla: { es: "Plantilla", en: "Template", it: "Template", fr: "ModÃ¨le", de: "Vorlage", pt: "Modelo" },
  checklist: { es: "Checklist", en: "Checklist", it: "Checklist", fr: "Checklist", de: "Checkliste", pt: "Checklist" },
  scorecard: { es: "Scorecard", en: "Scorecard", it: "Scorecard", fr: "Scorecard", de: "Scorecard", pt: "Scorecard" },
  revision:  { es: "RevisiÃ³n", en: "Review", it: "Revisione", fr: "RÃ©vision", de: "ÃberprÃ¼fung", pt: "RevisÃ£o" },
  control:   { es: "Control", en: "Control", it: "Controllo", fr: "ContrÃ´le", de: "Kontrolle", pt: "Controlo" },
};
const typeIcons: Record<string, { icon: React.ElementType; className: string }> = {
  plantilla: { icon: FileText, className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  checklist: { icon: CheckCircle, className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  scorecard: { icon: BarChart3, className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  revision:  { icon: Search, className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  control:   { icon: Building2, className: "bg-wine/10 text-wine border-wine/20" },
};

type ResourceItem = {
  slug: string;
  icon: React.ElementType;
  type: string;
  tags: string[];
};

type ResourceText = { title: string; desc: string };

const resourceItems: ResourceItem[] = [
  { slug: "plantilla-carta-de-vinos", icon: FileText, type: "plantilla", tags: ["estructura", "inicio"] },
  { slug: "checklist-carta-de-vinos-rentable", icon: CheckCircle, type: "checklist", tags: ["rentabilidad", "intermedio"] },
  { slug: "guia-vino-por-copa-para-restaurantes", icon: Wine, type: "plantilla", tags: ["copa", "intermedio"] },
  { slug: "plantilla-wine-mapping-restaurante", icon: Layers, type: "plantilla", tags: ["pricing", "intermedio"] },
  { slug: "plantilla-estrategia-vinos-por-copa", icon: Wine, type: "plantilla", tags: ["copa", "avanzado"] },
  { slug: "checklist-deteccion-vinos-muertos", icon: Search, type: "checklist", tags: ["rotaciÃ³n", "intermedio"] },
  { slug: "plantilla-formacion-equipo-sala", icon: Brain, type: "plantilla", tags: ["equipo", "inicio"] },
  { slug: "plantilla-analisis-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "avanzado"] },
  { slug: "scorecard-rendimiento-carta", icon: BarChart3, type: "scorecard", tags: ["analÃ­tica", "avanzado"] },
  { slug: "checklist-carta-que-vende", icon: TrendingUp, type: "checklist", tags: ["rentabilidad", "inicio"] },
  { slug: "plantilla-equilibrio-carta", icon: Layers, type: "plantilla", tags: ["estructura", "intermedio"] },
  { slug: "plantilla-revision-mensual-carta", icon: FileText, type: "revision", tags: ["analÃ­tica", "avanzado"] },
  { slug: "revision-mensual-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "rentabilidad", "avanzado"] },
  { slug: "plantilla-control-grupo-restauracion", icon: Building2, type: "control", tags: ["grupo", "avanzado"] },
];

const resourceTexts: Record<string, ResourceText[]> = {
  es: [
    { title: "Plantilla de carta de vinos", desc: "Plantilla profesional para diseÃ±ar y estructurar tu carta de vinos desde cero." },
    { title: "Checklist carta rentable", desc: "Revisa punto por punto si tu carta estÃ¡ optimizada para vender." },
    { title: "GuÃ­a vino por copa", desc: "Todo sobre cÃ³mo diseÃ±ar y rentabilizar tu oferta de vino por copa." },
    { title: "Plantilla wine mapping", desc: "Estructura precios y distribuciÃ³n de vinos en tu carta con criterio." },
    { title: "Estrategia de vinos por copa", desc: "Plan operativo completo para diseÃ±ar, ejecutar y controlar tu programa de copa." },
    { title: "DetecciÃ³n de vinos muertos", desc: "Identifica referencias sin rotaciÃ³n y cuantifica el capital inmovilizado." },
    { title: "FormaciÃ³n exprÃ©s para sala", desc: "Programa de formaciÃ³n en vino para tu equipo de sala en menos de 2 semanas." },
    { title: "AnÃ¡lisis de mÃ¡rgenes", desc: "Analiza la rentabilidad de cada referencia: coste, PVP, multiplicador y contribuciÃ³n." },
    { title: "Scorecard mensual", desc: "KPIs esenciales de tu carta cada mes: ventas, rotaciÃ³n, margen y vino por copa." },
    { title: "Â¿Tu carta realmente vende?", desc: "30 puntos para evaluar la capacidad de conversiÃ³n de tu carta de vinos." },
    { title: "Equilibrio de carta", desc: "Analiza el equilibrio por estilos, regiones, precios y tipologÃ­as." },
    { title: "RevisiÃ³n mensual de carta", desc: "Proceso estructurado para revisar tu carta cada mes con datos reales." },
    { title: "RevisiÃ³n mensual de mÃ¡rgenes", desc: "Una plantilla para revisar cada mes si tu carta estÃ¡ perdiendo margen y decidir quÃ© corregir antes de que el problema crezca." },
    { title: "Control para grupos", desc: "Dashboard comparativo, surtido centralizado y benchmarking entre locales." },
  ],
  en: [
    { title: "Wine list template", desc: "Professional template to design and structure your wine list from scratch." },
    { title: "Profitable wine list checklist", desc: "Check point by point if your wine list is optimized to sell." },
    { title: "By-the-glass wine guide", desc: "Everything about designing and maximizing your by-the-glass offering." },
    { title: "Wine mapping template", desc: "Structure prices and wine distribution in your list with clear criteria." },
    { title: "By-the-glass strategy", desc: "Complete operational plan to design, execute and control your glass program." },
    { title: "Dead wine detection", desc: "Identify non-rotating references and quantify immobilized capital." },
    { title: "Express staff training", desc: "Wine training program for your floor team in less than 2 weeks." },
    { title: "Margin analysis", desc: "Analyze the profitability of each reference: cost, price, multiplier and contribution." },
    { title: "Monthly scorecard", desc: "Essential KPIs for your wine list each month: sales, rotation, margin and by-the-glass." },
    { title: "Does your list really sell?", desc: "30 points to evaluate the conversion power of your wine list." },
    { title: "Wine list balance", desc: "Analyze balance across styles, regions, price points and typologies." },
    { title: "Monthly wine list review", desc: "Structured process to review your wine list every month with real data." },
    { title: "Monthly margin review", desc: "A template to review each month if your list is losing margin and decide what to fix before the problem grows." },
    { title: "Multi-venue control", desc: "Comparative dashboard, centralized assortment and benchmarking across locations." },
  ],
  it: [
    { title: "Template carta dei vini", desc: "Template professionale per progettare e strutturare la tua carta dei vini da zero." },
    { title: "Checklist carta redditizia", desc: "Verifica punto per punto se la tua carta Ã¨ ottimizzata per vendere." },
    { title: "Guida vino al calice", desc: "Tutto su come progettare e rendere redditizia la tua offerta al calice." },
    { title: "Template wine mapping", desc: "Struttura prezzi e distribuzione dei vini nella tua carta con criterio." },
    { title: "Strategia vini al calice", desc: "Piano operativo completo per progettare, eseguire e controllare il programma al calice." },
    { title: "Rilevamento vini morti", desc: "Identifica referenze senza rotazione e quantifica il capitale immobilizzato." },
    { title: "Formazione rapida per la sala", desc: "Programma di formazione sul vino per il tuo team di sala in meno di 2 settimane." },
    { title: "Analisi dei margini", desc: "Analizza la redditivitÃ  di ogni referenza: costo, prezzo, moltiplicatore e contribuzione." },
    { title: "Scorecard mensile", desc: "KPI essenziali della tua carta ogni mese: vendite, rotazione, margine e vino al calice." },
    { title: "La tua carta vende davvero?", desc: "30 punti per valutare la capacitÃ  di conversione della tua carta dei vini." },
    { title: "Equilibrio della carta", desc: "Analizza l'equilibrio per stili, regioni, prezzi e tipologie." },
    { title: "Revisione mensile della carta", desc: "Processo strutturato per rivedere la tua carta ogni mese con dati reali." },
    { title: "Revisione mensile dei margini", desc: "Un template per verificare ogni mese se la tua carta sta perdendo margine e decidere cosa correggere." },
    { title: "Controllo multi-locale", desc: "Dashboard comparativa, assortimento centralizzato e benchmarking tra locali." },
  ],
  fr: [
    { title: "ModÃ¨le de carte des vins", desc: "ModÃ¨le professionnel pour concevoir et structurer votre carte des vins de zÃ©ro." },
    { title: "Checklist carte rentable", desc: "VÃ©rifiez point par point si votre carte est optimisÃ©e pour vendre." },
    { title: "Guide vin au verre", desc: "Tout pour concevoir et rentabiliser votre offre de vin au verre." },
    { title: "ModÃ¨le wine mapping", desc: "Structurez les prix et la distribution des vins dans votre carte avec mÃ©thode." },
    { title: "StratÃ©gie vins au verre", desc: "Plan opÃ©rationnel complet pour concevoir, exÃ©cuter et contrÃ´ler votre programme au verre." },
    { title: "DÃ©tection des vins morts", desc: "Identifiez les rÃ©fÃ©rences sans rotation et quantifiez le capital immobilisÃ©." },
    { title: "Formation express pour la salle", desc: "Programme de formation au vin pour votre Ã©quipe de salle en moins de 2 semaines." },
    { title: "Analyse des marges", desc: "Analysez la rentabilitÃ© de chaque rÃ©fÃ©rence : coÃ»t, prix, multiplicateur et contribution." },
    { title: "Scorecard mensuel", desc: "KPIs essentiels de votre carte chaque mois : ventes, rotation, marge et vin au verre." },
    { title: "Votre carte vend-elle vraiment ?", desc: "30 points pour Ã©valuer la capacitÃ© de conversion de votre carte des vins." },
    { title: "Ãquilibre de la carte", desc: "Analysez l'Ã©quilibre par styles, rÃ©gions, prix et typologies." },
    { title: "RÃ©vision mensuelle de la carte", desc: "Processus structurÃ© pour rÃ©viser votre carte chaque mois avec des donnÃ©es rÃ©elles." },
    { title: "RÃ©vision mensuelle des marges", desc: "Un modÃ¨le pour vÃ©rifier chaque mois si votre carte perd de la marge et dÃ©cider quoi corriger." },
    { title: "ContrÃ´le multi-sites", desc: "Dashboard comparatif, assortiment centralisÃ© et benchmarking entre Ã©tablissements." },
  ],
  de: [
    { title: "Weinkarten-Vorlage", desc: "Professionelle Vorlage zum Entwerfen und Strukturieren Ihrer Weinkarte von Grund auf." },
    { title: "Checkliste profitable Karte", desc: "PrÃ¼fen Sie Punkt fÃ¼r Punkt, ob Ihre Karte zum Verkaufen optimiert ist." },
    { title: "Glaswein-Leitfaden", desc: "Alles Ã¼ber die Gestaltung und RentabilitÃ¤t Ihres Glaswein-Angebots." },
    { title: "Wine-Mapping-Vorlage", desc: "Strukturieren Sie Preise und Weinverteilung in Ihrer Karte mit klaren Kriterien." },
    { title: "Glaswein-Strategie", desc: "Kompletter operativer Plan zur Gestaltung, DurchfÃ¼hrung und Kontrolle Ihres Glaswein-Programms." },
    { title: "Erkennung toter Weine", desc: "Identifizieren Sie Referenzen ohne Rotation und quantifizieren Sie das gebundene Kapital." },
    { title: "Express-Schulung fÃ¼r das Serviceteam", desc: "Weinschulungsprogramm fÃ¼r Ihr Serviceteam in weniger als 2 Wochen." },
    { title: "Margenanalyse", desc: "Analysieren Sie die RentabilitÃ¤t jeder Referenz: Kosten, Preis, Multiplikator und Beitrag." },
    { title: "Monatliche Scorecard", desc: "Wesentliche KPIs Ihrer Karte jeden Monat: Umsatz, Rotation, Marge und Glaswein." },
    { title: "Verkauft Ihre Karte wirklich?", desc: "30 Punkte zur Bewertung der Verkaufskraft Ihrer Weinkarte." },
    { title: "Kartengleichgewicht", desc: "Analysieren Sie das Gleichgewicht nach Stilen, Regionen, Preisen und Typologien." },
    { title: "Monatliche KartenÃ¼berprÃ¼fung", desc: "Strukturierter Prozess zur monatlichen ÃberprÃ¼fung Ihrer Karte mit realen Daten." },
    { title: "Monatliche MargenprÃ¼fung", desc: "Eine Vorlage zur monatlichen PrÃ¼fung, ob Ihre Karte Marge verliert, und was zu korrigieren ist." },
    { title: "Multi-Standort-Kontrolle", desc: "Vergleichs-Dashboard, zentralisiertes Sortiment und Benchmarking zwischen Standorten." },
  ],
  pt: [
    { title: "Modelo de carta de vinhos", desc: "Modelo profissional para desenhar e estruturar a sua carta de vinhos do zero." },
    { title: "Checklist carta rentÃ¡vel", desc: "Verifique ponto a ponto se a sua carta estÃ¡ otimizada para vender." },
    { title: "Guia vinho a copo", desc: "Tudo sobre como desenhar e rentabilizar a sua oferta de vinho a copo." },
    { title: "Modelo wine mapping", desc: "Estruture preÃ§os e distribuiÃ§Ã£o de vinhos na sua carta com critÃ©rio." },
    { title: "EstratÃ©gia vinhos a copo", desc: "Plano operacional completo para desenhar, executar e controlar o seu programa a copo." },
    { title: "DeteÃ§Ã£o de vinhos mortos", desc: "Identifique referÃªncias sem rotaÃ§Ã£o e quantifique o capital imobilizado." },
    { title: "FormaÃ§Ã£o rÃ¡pida para sala", desc: "Programa de formaÃ§Ã£o em vinho para a sua equipa de sala em menos de 2 semanas." },
    { title: "AnÃ¡lise de margens", desc: "Analise a rentabilidade de cada referÃªncia: custo, preÃ§o, multiplicador e contribuiÃ§Ã£o." },
    { title: "Scorecard mensal", desc: "KPIs essenciais da sua carta cada mÃªs: vendas, rotaÃ§Ã£o, margem e vinho a copo." },
    { title: "A sua carta vende mesmo?", desc: "30 pontos para avaliar a capacidade de conversÃ£o da sua carta de vinhos." },
    { title: "EquilÃ­brio da carta", desc: "Analise o equilÃ­brio por estilos, regiÃµes, preÃ§os e tipologias." },
    { title: "RevisÃ£o mensal da carta", desc: "Processo estruturado para rever a sua carta todos os meses com dados reais." },
    { title: "RevisÃ£o mensal de margens", desc: "Um modelo para verificar mensalmente se a sua carta estÃ¡ a perder margem e decidir o que corrigir." },
    { title: "Controlo multi-unidade", desc: "Dashboard comparativo, sortido centralizado e benchmarking entre unidades." },
  ],
};

const taxonomyFilterLabels: Record<string, Record<string, string>> = {
  pricing:       { es: "Pricing y mÃ¡rgenes", en: "Pricing & margins", it: "Pricing e margini", fr: "Prix et marges", de: "Preise & Margen", pt: "Pricing e margens" },
  "rotaciÃ³n":    { es: "RotaciÃ³n y stock", en: "Rotation & stock", it: "Rotazione e stock", fr: "Rotation et stock", de: "Rotation & Bestand", pt: "RotaÃ§Ã£o e stock" },
  copa:          { es: "Vino por copa", en: "By the glass", it: "Vino al calice", fr: "Vin au verre", de: "Glaswein", pt: "Vinho a copo" },
  equipo:        { es: "Equipo de sala", en: "Floor team", it: "Team di sala", fr: "Ãquipe de salle", de: "Serviceteam", pt: "Equipa de sala" },
  estructura:    { es: "Estructura de carta", en: "List structure", it: "Struttura carta", fr: "Structure de la carte", de: "Kartenstruktur", pt: "Estrutura da carta" },
  rentabilidad:  { es: "Rentabilidad", en: "Profitability", it: "RedditivitÃ ", fr: "RentabilitÃ©", de: "RentabilitÃ¤t", pt: "Rentabilidade" },
  "analÃ­tica":   { es: "AnalÃ­tica y KPIs", en: "Analytics & KPIs", it: "Analitica e KPI", fr: "Analytique et KPIs", de: "Analytik & KPIs", pt: "AnalÃ­tica e KPIs" },
  grupo:         { es: "Grupos", en: "Groups", it: "Gruppi", fr: "Groupes", de: "Gruppen", pt: "Grupos" },
};
const taxonomyKeys = ["all", "pricing", "rotaciÃ³n", "copa", "equipo", "estructura", "rentabilidad", "analÃ­tica", "grupo"];

const Recursos = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = langContent[lang] || langContent.es;
  const texts = resourceTexts[lang] || resourceTexts.es;
  const [filter, setFilter] = useState("all");

  const resources = resourceItems.map((item, i) => ({
    ...item,
    to: localePath(`/recursos/${item.slug}`),
    title: texts[i]?.title ?? (resourceTexts.es[i]?.title ?? ""),
    desc: texts[i]?.desc ?? (resourceTexts.es[i]?.desc ?? ""),
  }));

  const filtered = filter === "all" ? resources : resources.filter(r => r.tags.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/recursos"
        hreflang={allLangPaths("/recursos")} />
      <main>
        {/* ââ Hero ââ */}
        <section className="pt-32 pb-14 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-wine/4 rounded-full blur-[120px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: lang === "es" ? "Recursos" : lang === "en" ? "Resources" : lang === "it" ? "Risorse" : "Ressources" }]} />
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
                <span className="text-muted-foreground"><strong className="text-foreground">{resources.length}</strong> {t.items}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">Excel</strong> + PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">100%</strong> {{ es: "gratis", en: "free", it: "gratis", fr: "gratuit", de: "kostenlos", pt: "grÃ¡tis" }[lang] || "free"}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ââ Filter + Grid ââ */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {taxonomyKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all border ${
                    filter === key
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-transparent text-muted-foreground border-border hover:border-emerald-500/30"
                  }`}
                >
                  {key === "all" ? t.filterAll : (taxonomyFilterLabels[key]?.[lang] || taxonomyFilterLabels[key]?.es || key)}
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
              const tIcon = typeIcons[item.type];
              const TypeIcon = tIcon.icon;
              const tLabel = typeLabels[item.type]?.[lang] || typeLabels[item.type]?.es || item.type;
              return (
                <ScrollReveal key={item.to} delay={i * 0.03}>
                  <Link to={item.to}
                    className="group relative bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-emerald-500/30 transition-all block p-6 h-full hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 duration-300">
                    {/* Type badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${tIcon.className}`}>
                        <TypeIcon size={10} />
                        {tLabel}
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
              {{ es: "No hay recursos con este filtro.", en: "No resources match this filter.", it: "Nessuna risorsa per questo filtro.", fr: "Aucune ressource pour ce filtre.", de: "Keine Ressourcen fÃ¼r diesen Filter.", pt: "Sem recursos para este filtro." }[lang] || "No resources match this filter."}
            </p>
          )}
        </section>

        {/* ââ Cross-links ââ */}
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

        {/* ââ CTA ââ */}
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
