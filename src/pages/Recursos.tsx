import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download, Wine, Search, DollarSign, BarChart3, Brain,
  FileText, CheckCircle, Layers, Building2, TrendingUp,
  ArrowRight, Package, Sparkles, PieChart, Target, Calendar
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
  },
};

/* ── Resource type config ── */
const typeLabels: Record<string, Record<string, string>> = {
  plantilla: { es: "Plantilla", en: "Template", it: "Template", fr: "Modèle", de: "Vorlage", pt: "Modelo" },
  checklist: { es: "Checklist", en: "Checklist", it: "Checklist", fr: "Checklist", de: "Checkliste", pt: "Checklist" },
  scorecard: { es: "Scorecard", en: "Scorecard", it: "Scorecard", fr: "Scorecard", de: "Scorecard", pt: "Scorecard" },
  revision:  { es: "Revisión", en: "Review", it: "Revisione", fr: "Révision", de: "Überprüfung", pt: "Revisão" },
  control:   { es: "Control", en: "Control", it: "Controllo", fr: "Contrôle", de: "Kontrolle", pt: "Controlo" },
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
  { slug: "checklist-deteccion-vinos-muertos", icon: Search, type: "checklist", tags: ["rotación", "intermedio"] },
  { slug: "plantilla-formacion-equipo-sala", icon: Brain, type: "plantilla", tags: ["equipo", "inicio"] },
  { slug: "plantilla-analisis-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "avanzado"] },
  { slug: "scorecard-rendimiento-carta", icon: BarChart3, type: "scorecard", tags: ["analítica", "avanzado"] },
  { slug: "checklist-carta-que-vende", icon: TrendingUp, type: "checklist", tags: ["rentabilidad", "inicio"] },
  { slug: "plantilla-equilibrio-carta", icon: Layers, type: "plantilla", tags: ["estructura", "intermedio"] },
  { slug: "plantilla-revision-mensual-carta", icon: FileText, type: "revision", tags: ["analítica", "avanzado"] },
  { slug: "revision-mensual-margenes", icon: DollarSign, type: "revision", tags: ["pricing", "rentabilidad", "avanzado"] },
  { slug: "plantilla-control-grupo-restauracion", icon: Building2, type: "control", tags: ["grupo", "avanzado"] },
  { slug: "auditoria-pareto-80-20-carta-vinos", icon: PieChart, type: "revision", tags: ["analítica", "rentabilidad", "avanzado"] },
  { slug: "diagnostico-fuga-margen-carta-vinos", icon: DollarSign, type: "checklist", tags: ["pricing", "rentabilidad", "avanzado"] },
  { slug: "perfil-rim-restaurante", icon: Target, type: "scorecard", tags: ["analítica", "estructura", "inicio"] },
  { slug: "calculadora-valor-pos-vino", icon: BarChart3, type: "scorecard", tags: ["analítica", "rentabilidad", "avanzado"] },
  { slug: "auditoria-distribuidores-catalogo", icon: Building2, type: "revision", tags: ["pricing", "rotación", "avanzado"] },
  { slug: "checklist-albaranes-facturas-coste-vino", icon: FileText, type: "checklist", tags: ["pricing", "analítica", "avanzado"] },
  { slug: "plan-temporada-carta-vinos", icon: Calendar, type: "plantilla", tags: ["estructura", "copa", "intermedio"] },
  { slug: "autoevaluacion-premios-winerim", icon: CheckCircle, type: "scorecard", tags: ["analítica", "estructura", "intermedio"] },
];

const resourceTexts: Record<string, ResourceText[]> = {
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
    { title: "Auditoría Pareto 80/20", desc: "Detecta qué vinos sostienen la facturación, cuáles ocupan espacio y dónde ajustar la carta." },
    { title: "Diagnóstico de fuga de margen", desc: "Encuentra pérdidas por coste, PVP, copa, reposición y compras antes de que se acumulen." },
    { title: "Perfil RIM del restaurante", desc: "Descubre si tu carta es gourmet, estratégica, turística, pasiva o necesita simplificación." },
    { title: "Valor POS para vino", desc: "Calcula qué valor pierdes cuando las ventas del TPV no alimentan carta, stock y margen." },
    { title: "Auditoría de distribuidores", desc: "Evalúa catálogo, precios, albaranes, servicio y encaje real de cada proveedor." },
    { title: "Checklist albaranes y coste", desc: "Controla si facturas, albaranes y tarifas actualizan de verdad el coste de la carta." },
    { title: "Plan de temporada", desc: "Prepara compras, copa, stock, formación y margen antes de temporada alta." },
    { title: "Autoevaluación Premios Winerim", desc: "Puntúa tu carta con criterios de rentabilidad, equilibrio, experiencia, stock y datos." },
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
    { title: "Pareto 80/20 audit", desc: "Find which wines sustain revenue, which support the list, and where stock is not returning value." },
    { title: "Margin leakage diagnosis", desc: "Detect losses from cost, price, by-the-glass, replenishment and purchasing before they accumulate." },
    { title: "Restaurant RIM profile", desc: "Identify whether your list is strategic, gastronomic, touristic, passive or needs simplification." },
    { title: "POS value for wine", desc: "Estimate the value lost when POS sales do not feed wine list, stock, margin and purchasing decisions." },
    { title: "Distributor audit", desc: "Evaluate catalog fit, pricing, delivery notes, service quality and the real value of each supplier." },
    { title: "Delivery notes and cost checklist", desc: "Check whether invoices, delivery notes and supplier tariffs are really updating your wine costs." },
    { title: "Seasonal wine-list plan", desc: "Prepare purchasing, by-the-glass, stock, staff training and margins before peak season." },
    { title: "Winerim Awards self-assessment", desc: "Score your wine list across profitability, balance, guest experience, stock and data maturity." },
  ],
  it: [
    { title: "Template carta dei vini", desc: "Template professionale per progettare e strutturare la tua carta dei vini da zero." },
    { title: "Checklist carta redditizia", desc: "Verifica punto per punto se la tua carta è ottimizzata per vendere." },
    { title: "Guida vino al calice", desc: "Tutto su come progettare e rendere redditizia la tua offerta al calice." },
    { title: "Template wine mapping", desc: "Struttura prezzi e distribuzione dei vini nella tua carta con criterio." },
    { title: "Strategia vini al calice", desc: "Piano operativo completo per progettare, eseguire e controllare il programma al calice." },
    { title: "Rilevamento vini morti", desc: "Identifica referenze senza rotazione e quantifica il capitale immobilizzato." },
    { title: "Formazione rapida per la sala", desc: "Programma di formazione sul vino per il tuo team di sala in meno di 2 settimane." },
    { title: "Analisi dei margini", desc: "Analizza la redditività di ogni referenza: costo, prezzo, moltiplicatore e contribuzione." },
    { title: "Scorecard mensile", desc: "KPI essenziali della tua carta ogni mese: vendite, rotazione, margine e vino al calice." },
    { title: "La tua carta vende davvero?", desc: "30 punti per valutare la capacità di conversione della tua carta dei vini." },
    { title: "Equilibrio della carta", desc: "Analizza l'equilibrio per stili, regioni, prezzi e tipologie." },
    { title: "Revisione mensile della carta", desc: "Processo strutturato per rivedere la tua carta ogni mese con dati reali." },
    { title: "Revisione mensile dei margini", desc: "Un template per verificare ogni mese se la tua carta sta perdendo margine e decidere cosa correggere." },
    { title: "Controllo multi-locale", desc: "Dashboard comparativa, assortimento centralizzato e benchmarking tra locali." },
    { title: "Audit Pareto 80/20", desc: "Individua quali vini sostengono il fatturato, quali fanno da supporto e dove lo stock non rende." },
    { title: "Diagnosi fuga di margine", desc: "Trova perdite da costo, prezzo, calice, riordino e acquisti prima che si accumulino." },
    { title: "Profilo RIM del ristorante", desc: "Scopri se la tua carta è strategica, gastronomica, turistica, passiva o da semplificare." },
    { title: "Valore POS per il vino", desc: "Stima il valore perso quando le vendite POS non alimentano carta, stock, margine e acquisti." },
    { title: "Audit distributori", desc: "Valuta catalogo, prezzi, documenti, servizio e reale coerenza di ogni fornitore." },
    { title: "Checklist documenti e costo", desc: "Controlla se fatture, DDT e tariffe aggiornano davvero il costo della carta." },
    { title: "Piano stagionale", desc: "Prepara acquisti, calice, stock, formazione e margine prima dell'alta stagione." },
    { title: "Autovalutazione Premi Winerim", desc: "Valuta la carta su redditività, equilibrio, esperienza, stock e maturità dei dati." },
  ],
  fr: [
    { title: "Modèle de carte des vins", desc: "Modèle professionnel pour concevoir et structurer votre carte des vins de zéro." },
    { title: "Checklist carte rentable", desc: "Vérifiez point par point si votre carte est optimisée pour vendre." },
    { title: "Guide vin au verre", desc: "Tout pour concevoir et rentabiliser votre offre de vin au verre." },
    { title: "Modèle wine mapping", desc: "Structurez les prix et la distribution des vins dans votre carte avec méthode." },
    { title: "Stratégie vins au verre", desc: "Plan opérationnel complet pour concevoir, exécuter et contrôler votre programme au verre." },
    { title: "Détection des vins morts", desc: "Identifiez les références sans rotation et quantifiez le capital immobilisé." },
    { title: "Formation express pour la salle", desc: "Programme de formation au vin pour votre équipe de salle en moins de 2 semaines." },
    { title: "Analyse des marges", desc: "Analysez la rentabilité de chaque référence : coût, prix, multiplicateur et contribution." },
    { title: "Scorecard mensuel", desc: "KPIs essentiels de votre carte chaque mois : ventes, rotation, marge et vin au verre." },
    { title: "Votre carte vend-elle vraiment ?", desc: "30 points pour évaluer la capacité de conversion de votre carte des vins." },
    { title: "Équilibre de la carte", desc: "Analysez l'équilibre par styles, régions, prix et typologies." },
    { title: "Révision mensuelle de la carte", desc: "Processus structuré pour réviser votre carte chaque mois avec des données réelles." },
    { title: "Révision mensuelle des marges", desc: "Un modèle pour vérifier chaque mois si votre carte perd de la marge et décider quoi corriger." },
    { title: "Contrôle multi-sites", desc: "Dashboard comparatif, assortiment centralisé et benchmarking entre établissements." },
    { title: "Audit Pareto 80/20", desc: "Identifiez les vins qui portent le chiffre d'affaires, ceux qui soutiennent la carte et les stocks sans retour." },
    { title: "Diagnostic fuite de marge", desc: "Détectez les pertes liées au coût, au prix, au verre, au réassort et aux achats avant accumulation." },
    { title: "Profil RIM du restaurant", desc: "Découvrez si votre carte est stratégique, gastronomique, touristique, passive ou à simplifier." },
    { title: "Valeur POS pour le vin", desc: "Estimez la valeur perdue quand les ventes POS n'alimentent pas carte, stock, marge et achats." },
    { title: "Audit distributeurs", desc: "Évaluez catalogue, prix, documents, service et adéquation réelle de chaque fournisseur." },
    { title: "Checklist documents et coût", desc: "Vérifiez si factures, bons de livraison et tarifs mettent vraiment à jour le coût de la carte." },
    { title: "Plan de saison", desc: "Préparez achats, vin au verre, stock, formation et marge avant la haute saison." },
    { title: "Autoévaluation Prix Winerim", desc: "Notez votre carte selon rentabilité, équilibre, expérience, stock et maturité data." },
  ],
  de: [
    { title: "Weinkarten-Vorlage", desc: "Professionelle Vorlage zum Entwerfen und Strukturieren Ihrer Weinkarte von Grund auf." },
    { title: "Checkliste profitable Karte", desc: "Prüfen Sie Punkt für Punkt, ob Ihre Karte zum Verkaufen optimiert ist." },
    { title: "Glaswein-Leitfaden", desc: "Alles über die Gestaltung und Rentabilität Ihres Glaswein-Angebots." },
    { title: "Wine-Mapping-Vorlage", desc: "Strukturieren Sie Preise und Weinverteilung in Ihrer Karte mit klaren Kriterien." },
    { title: "Glaswein-Strategie", desc: "Kompletter operativer Plan zur Gestaltung, Durchführung und Kontrolle Ihres Glaswein-Programms." },
    { title: "Erkennung toter Weine", desc: "Identifizieren Sie Referenzen ohne Rotation und quantifizieren Sie das gebundene Kapital." },
    { title: "Express-Schulung für das Serviceteam", desc: "Weinschulungsprogramm für Ihr Serviceteam in weniger als 2 Wochen." },
    { title: "Margenanalyse", desc: "Analysieren Sie die Rentabilität jeder Referenz: Kosten, Preis, Multiplikator und Beitrag." },
    { title: "Monatliche Scorecard", desc: "Wesentliche KPIs Ihrer Karte jeden Monat: Umsatz, Rotation, Marge und Glaswein." },
    { title: "Verkauft Ihre Karte wirklich?", desc: "30 Punkte zur Bewertung der Verkaufskraft Ihrer Weinkarte." },
    { title: "Kartengleichgewicht", desc: "Analysieren Sie das Gleichgewicht nach Stilen, Regionen, Preisen und Typologien." },
    { title: "Monatliche Kartenüberprüfung", desc: "Strukturierter Prozess zur monatlichen Überprüfung Ihrer Karte mit realen Daten." },
    { title: "Monatliche Margenprüfung", desc: "Eine Vorlage zur monatlichen Prüfung, ob Ihre Karte Marge verliert, und was zu korrigieren ist." },
    { title: "Multi-Standort-Kontrolle", desc: "Vergleichs-Dashboard, zentralisiertes Sortiment und Benchmarking zwischen Standorten." },
    { title: "Pareto-80/20-Audit", desc: "Erkennen Sie, welche Weine den Umsatz tragen, welche nur stützen und wo Bestand keinen Rückfluss bringt." },
    { title: "Margenverlust-Diagnose", desc: "Finden Sie Verluste durch Kosten, Preis, Glasverkauf, Nachbestellung und Einkauf, bevor sie wachsen." },
    { title: "Restaurant-RIM-Profil", desc: "Erkennen Sie, ob Ihre Karte strategisch, gastronomisch, touristisch, passiv oder zu komplex ist." },
    { title: "POS-Wert für Wein", desc: "Schätzen Sie den Wertverlust, wenn POS-Verkäufe nicht in Karte, Bestand, Marge und Einkauf einfließen." },
    { title: "Distributoren-Audit", desc: "Bewerten Sie Sortiment, Preise, Belege, Service und tatsächliche Passung jedes Lieferanten." },
    { title: "Checkliste Belege und Kosten", desc: "Prüfen Sie, ob Rechnungen, Lieferscheine und Tarife die Weinkosten wirklich aktualisieren." },
    { title: "Saisonplan", desc: "Planen Sie Einkauf, Glaswein, Bestand, Schulung und Marge vor der Hochsaison." },
    { title: "Winerim Awards Selbstbewertung", desc: "Bewerten Sie Ihre Karte nach Rentabilität, Balance, Erlebnis, Bestand und Datenreife." },
  ],
  pt: [
    { title: "Modelo de carta de vinhos", desc: "Modelo profissional para desenhar e estruturar a sua carta de vinhos do zero." },
    { title: "Checklist carta rentável", desc: "Verifique ponto a ponto se a sua carta está otimizada para vender." },
    { title: "Guia vinho a copo", desc: "Tudo sobre como desenhar e rentabilizar a sua oferta de vinho a copo." },
    { title: "Modelo wine mapping", desc: "Estruture preços e distribuição de vinhos na sua carta com critério." },
    { title: "Estratégia vinhos a copo", desc: "Plano operacional completo para desenhar, executar e controlar o seu programa a copo." },
    { title: "Deteção de vinhos mortos", desc: "Identifique referências sem rotação e quantifique o capital imobilizado." },
    { title: "Formação rápida para sala", desc: "Programa de formação em vinho para a sua equipa de sala em menos de 2 semanas." },
    { title: "Análise de margens", desc: "Analise a rentabilidade de cada referência: custo, preço, multiplicador e contribuição." },
    { title: "Scorecard mensal", desc: "KPIs essenciais da sua carta cada mês: vendas, rotação, margem e vinho a copo." },
    { title: "A sua carta vende mesmo?", desc: "30 pontos para avaliar a capacidade de conversão da sua carta de vinhos." },
    { title: "Equilíbrio da carta", desc: "Analise o equilíbrio por estilos, regiões, preços e tipologias." },
    { title: "Revisão mensal da carta", desc: "Processo estruturado para rever a sua carta todos os meses com dados reais." },
    { title: "Revisão mensal de margens", desc: "Um modelo para verificar mensalmente se a sua carta está a perder margem e decidir o que corrigir." },
    { title: "Controlo multi-unidade", desc: "Dashboard comparativo, sortido centralizado e benchmarking entre unidades." },
    { title: "Auditoria Pareto 80/20", desc: "Detete que vinhos sustentam a faturação, quais apoiam a carta e onde o stock não retorna valor." },
    { title: "Diagnóstico fuga de margem", desc: "Encontre perdas por custo, PVP, copo, reposição e compras antes de se acumularem." },
    { title: "Perfil RIM do restaurante", desc: "Descubra se a sua carta é estratégica, gastronómica, turística, passiva ou precisa de simplificação." },
    { title: "Valor POS para vinho", desc: "Calcule o valor perdido quando as vendas POS não alimentam carta, stock, margem e compras." },
    { title: "Auditoria de distribuidores", desc: "Avalie catálogo, preços, documentos, serviço e encaixe real de cada fornecedor." },
    { title: "Checklist documentos e custo", desc: "Controle se faturas, guias e tabelas atualizam realmente o custo da carta." },
    { title: "Plano de temporada", desc: "Prepare compras, vinho a copo, stock, formação e margem antes da época alta." },
    { title: "Autoavaliação Prémios Winerim", desc: "Pontue a sua carta por rentabilidade, equilíbrio, experiência, stock e maturidade de dados." },
  ],
};

const taxonomyFilterLabels: Record<string, Record<string, string>> = {
  pricing:       { es: "Pricing y márgenes", en: "Pricing & margins", it: "Pricing e margini", fr: "Prix et marges", de: "Preise & Margen", pt: "Pricing e margens" },
  "rotación":    { es: "Rotación y stock", en: "Rotation & stock", it: "Rotazione e stock", fr: "Rotation et stock", de: "Rotation & Bestand", pt: "Rotação e stock" },
  copa:          { es: "Vino por copa", en: "By the glass", it: "Vino al calice", fr: "Vin au verre", de: "Glaswein", pt: "Vinho a copo" },
  equipo:        { es: "Equipo de sala", en: "Floor team", it: "Team di sala", fr: "Équipe de salle", de: "Serviceteam", pt: "Equipa de sala" },
  estructura:    { es: "Estructura de carta", en: "List structure", it: "Struttura carta", fr: "Structure de la carte", de: "Kartenstruktur", pt: "Estrutura da carta" },
  rentabilidad:  { es: "Rentabilidad", en: "Profitability", it: "Redditività", fr: "Rentabilité", de: "Rentabilität", pt: "Rentabilidade" },
  "analítica":   { es: "Analítica y KPIs", en: "Analytics & KPIs", it: "Analitica e KPI", fr: "Analytique et KPIs", de: "Analytik & KPIs", pt: "Analítica e KPIs" },
  grupo:         { es: "Grupos", en: "Groups", it: "Gruppi", fr: "Groupes", de: "Gruppen", pt: "Grupos" },
};
const taxonomyKeys = ["all", "pricing", "rotación", "copa", "equipo", "estructura", "rentabilidad", "analítica", "grupo"];

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
      <SEOHead title={t.metaTitle} description={t.metaDesc} url={`https://winerim.wine${localePath("/recursos")}`}
        hreflang={allLangPaths("/recursos")} />
      <main>
        {/* ── Hero ── */}
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
                <span className="text-muted-foreground"><strong className="text-foreground">100%</strong> {{ es: "gratis", en: "free", it: "gratis", fr: "gratuit", de: "kostenlos", pt: "grátis" }[lang] || "free"}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
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
              {{ es: "No hay recursos con este filtro.", en: "No resources match this filter.", it: "Nessuna risorsa per questo filtro.", fr: "Aucune ressource pour ce filtre.", de: "Keine Ressourcen für diesen Filter.", pt: "Sem recursos para este filtro." }[lang] || "No resources match this filter."}
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
