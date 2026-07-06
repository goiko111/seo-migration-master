import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, PieChart, RotateCcw, Target, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";
import type { I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type WineRow = {
  name: string;
  revenue: string;
  margin: string;
  stock: string;
  days: string;
};

type Segment = "core" | "drag" | "exploration" | "support";

type ParetoCopy = {
  locale: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumbTools: string;
  breadcrumbSelf: string;
  badge: string;
  h1: string;
  subtitle: string;
  inputTitle: string;
  inputSubtitle: string;
  referenceLabel: string;
  revenueLabel: string;
  marginLabel: string;
  stockLabel: string;
  daysLabel: string;
  calculateButton: string;
  resetButton: string;
  readingLabel: string;
  coreHeadline: (count: number) => string;
  revenueMetric: string;
  weightedMarginMetric: string;
  reviewMetric: string;
  unnamedReference: string;
  marginLine: (share: number, cumulative: number) => string;
  segments: Record<Segment, { label: string; action: string }>;
  cards: Record<"core" | "exploration" | "drag", { title: string; text: string }>;
  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaAuditButton: string;
  ctaDemoButton: string;
  faqs: { q: string; a: string }[];
  internalLinksTitle: string;
  internalLinks: {
    marginLeakage: string;
    marginSignal: string;
    deadWinesGuide: string;
    dynamicIntelligence: string;
  };
};

const PARETO_INITIAL_ROWS: I18nMap<WineRow[]> = {
  es: [
    { name: "Rioja crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Ribera premium", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Verdejo joven", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
  en: [
    { name: "Rioja Crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Premium Ribera", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Young Verdejo", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
  it: [
    { name: "Rioja Crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Ribera premium", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Verdejo giovane", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
  fr: [
    { name: "Rioja Crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Ribera premium", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Verdejo jeune", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
  de: [
    { name: "Rioja Crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Premium Ribera", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Junger Verdejo", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
  pt: [
    { name: "Rioja Crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
    { name: "Ribera premium", revenue: "1200", margin: "58", stock: "9", days: "28" },
    { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
    { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
    { name: "Verdejo jovem", revenue: "420", margin: "48", stock: "30", days: "70" },
    { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
  ],
};

const PARETO_COPY: I18nMap<ParetoCopy> = {
  es: {
    locale: "es-ES",
    seoTitle: "Simulador Pareto 80/20 para carta de vinos",
    seoDescription: "Descubre qué vinos sostienen la facturación y margen de tu carta, cuáles son soporte y cuáles pueden estar frenando rentabilidad.",
    breadcrumbTools: "Herramientas",
    breadcrumbSelf: "Simulador Pareto 80/20",
    badge: "Demo · Pareto de carta",
    h1: "Simulador Pareto 80/20 de tu carta de vinos",
    subtitle: "Identifica qué referencias sostienen el margen, cuáles solo acompañan y cuáles podrían estar ocupando carta, stock y atención sin aportar suficiente retorno.",
    inputTitle: "Introduce referencias clave",
    inputSubtitle: "Usa facturación y margen estimados del último mes.",
    referenceLabel: "Referencia",
    revenueLabel: "Ventas €",
    marginLabel: "Margen %",
    stockLabel: "Stock",
    daysLabel: "Días sin venta",
    calculateButton: "Calcular Pareto",
    resetButton: "Restaurar ejemplo",
    readingLabel: "Lectura Pareto",
    coreHeadline: (count) => `${count} referencias sostienen el núcleo`,
    revenueMetric: "Facturación",
    weightedMarginMetric: "Margen ponderado",
    reviewMetric: "Refs. a revisar",
    unnamedReference: "Referencia sin nombre",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% del margen simulado · acumulado ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Núcleo", action: "Proteger disponibilidad y discurso de venta" },
      drag: { label: "Lastre", action: "No reponer y mover por recomendación controlada" },
      exploration: { label: "Exploración", action: "Probar con maridaje, copa o carta destacada" },
      support: { label: "Soporte", action: "Mantener si cubre una función clara" },
    },
    cards: {
      core: { title: "Núcleo", text: "Vinos que sostienen el margen. Hay que proteger disponibilidad, discurso y PVP." },
      exploration: { title: "Exploración", text: "Referencias con sentido de carta pero todavía sin tracción suficiente. Necesitan una hipótesis." },
      drag: { title: "Lastre", text: "Vinos con stock, días sin venta o baja contribución. No siempre sobran, pero hay que justificarlos." },
    },
    ctaBadge: "Pareto automático",
    ctaTitle: "Winerim encuentra el 20% que sostiene tu carta sin hojas manuales.",
    ctaDescription: "La plataforma cruza ventas, stock, PVP, coste, rotación y señales de Márgenes para saber qué proteger, qué empujar y qué dejar de comprar.",
    ctaAuditButton: "Descargar auditoría Pareto 80/20",
    ctaDemoButton: "Solicitar demo",
    faqs: [
      {
        q: "¿Qué es el Pareto 80/20 aplicado a una carta de vinos?",
        a: "Es una lectura para detectar qué pocas referencias concentran gran parte de la facturación o margen, y cuáles consumen espacio y stock con poco retorno.",
      },
      {
        q: "¿Un vino fuera del núcleo debería eliminarse?",
        a: "No necesariamente. Puede tener función gastronómica, de imagen o de maridaje. Lo importante es que su función esté clara.",
      },
      {
        q: "¿Cómo se calcula en Winerim?",
        a: "Con datos conectados de carta, ventas, stock, coste, PVP, rotación y señales de Márgenes, no con estimaciones manuales.",
      },
    ],
    internalLinksTitle: "Sigue analizando rentabilidad",
    internalLinks: {
      marginLeakage: "Calculadora de fuga de margen",
      marginSignal: "Simulador de señal de Márgenes",
      deadWinesGuide: "Guía para detectar vinos muertos",
      dynamicIntelligence: "Inteligencia dinámica",
    },
  },
  en: {
    locale: "en-GB",
    seoTitle: "Pareto 80/20 Wine List Simulator",
    seoDescription: "See which wines sustain revenue and margin, which are support references, and which may be slowing wine-list profitability.",
    breadcrumbTools: "Tools",
    breadcrumbSelf: "Pareto 80/20 simulator",
    badge: "Demo · Wine list Pareto",
    h1: "Pareto 80/20 simulator for your wine list",
    subtitle: "Identify which references sustain margin, which merely support the list, and which may be using list space, stock and attention without enough return.",
    inputTitle: "Enter key references",
    inputSubtitle: "Use estimated revenue and margin from the last month.",
    referenceLabel: "Reference",
    revenueLabel: "Sales €",
    marginLabel: "Margin %",
    stockLabel: "Stock",
    daysLabel: "Days without sale",
    calculateButton: "Calculate Pareto",
    resetButton: "Restore example",
    readingLabel: "Pareto reading",
    coreHeadline: (count) => `${count} references sustain the core`,
    revenueMetric: "Revenue",
    weightedMarginMetric: "Weighted margin",
    reviewMetric: "Refs. to review",
    unnamedReference: "Unnamed reference",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% of simulated margin · accumulated ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Core", action: "Protect availability and sales narrative" },
      drag: { label: "Drag", action: "Stop replenishing and move through controlled recommendations" },
      exploration: { label: "Exploration", action: "Test with pairing, by-the-glass or featured list placement" },
      support: { label: "Support", action: "Keep only if it covers a clear role" },
    },
    cards: {
      core: { title: "Core", text: "Wines that sustain margin. Protect availability, sales narrative and list price." },
      exploration: { title: "Exploration", text: "References that make sense on the list but do not yet have enough traction. They need a hypothesis." },
      drag: { title: "Drag", text: "Wines with stock, days without sales or low contribution. They do not always need removing, but they need justification." },
    },
    ctaBadge: "Automatic Pareto",
    ctaTitle: "Winerim finds the 20% that sustains your list without manual spreadsheets.",
    ctaDescription: "The platform cross-references sales, stock, list price, cost, rotation and Margins signals to know what to protect, what to push and what to stop buying.",
    ctaAuditButton: "Download Pareto 80/20 audit",
    ctaDemoButton: "Request demo",
    faqs: [
      {
        q: "What is Pareto 80/20 applied to a wine list?",
        a: "It is a reading that detects which few references concentrate much of the revenue or margin, and which consume list space and stock with little return.",
      },
      {
        q: "Should a wine outside the core be removed?",
        a: "Not necessarily. It may have a gastronomic, image or pairing role. What matters is that its role is clear.",
      },
      {
        q: "How is it calculated in Winerim?",
        a: "With connected data from list, sales, stock, cost, list price, rotation and Margins signals, not with manual estimates.",
      },
    ],
    internalLinksTitle: "Keep analysing profitability",
    internalLinks: {
      marginLeakage: "Margin leakage calculator",
      marginSignal: "Margins signal simulator",
      deadWinesGuide: "Guide to detecting dead wines",
      dynamicIntelligence: "Dynamic intelligence",
    },
  },
  it: {
    locale: "it-IT",
    seoTitle: "Simulatore Pareto 80/20 per carta vini",
    seoDescription: "Scopri quali vini sostengono fatturato e margine, quali fanno supporto e quali possono frenare la redditività della carta.",
    breadcrumbTools: "Strumenti",
    breadcrumbSelf: "Simulatore Pareto 80/20",
    badge: "Demo · Pareto carta",
    h1: "Simulatore Pareto 80/20 della tua carta vini",
    subtitle: "Identifica quali referenze sostengono il margine, quali accompagnano soltanto e quali potrebbero occupare carta, stock e attenzione senza ritorno sufficiente.",
    inputTitle: "Inserisci referenze chiave",
    inputSubtitle: "Usa fatturato e margine stimati dell'ultimo mese.",
    referenceLabel: "Referenza",
    revenueLabel: "Vendite €",
    marginLabel: "Margine %",
    stockLabel: "Stock",
    daysLabel: "Giorni senza vendita",
    calculateButton: "Calcola Pareto",
    resetButton: "Ripristina esempio",
    readingLabel: "Lettura Pareto",
    coreHeadline: (count) => `${count} referenze sostengono il nucleo`,
    revenueMetric: "Fatturato",
    weightedMarginMetric: "Margine ponderato",
    reviewMetric: "Ref. da rivedere",
    unnamedReference: "Referenza senza nome",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% del margine simulato · cumulato ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Nucleo", action: "Proteggere disponibilità e racconto di vendita" },
      drag: { label: "Zavorra", action: "Non riordinare e smuovere con raccomandazione controllata" },
      exploration: { label: "Esplorazione", action: "Testare con abbinamento, calice o evidenza in carta" },
      support: { label: "Supporto", action: "Mantenere se copre una funzione chiara" },
    },
    cards: {
      core: { title: "Nucleo", text: "Vini che sostengono il margine. Bisogna proteggere disponibilità, racconto e prezzo in carta." },
      exploration: { title: "Esplorazione", text: "Referenze con senso in carta ma ancora senza trazione sufficiente. Hanno bisogno di un'ipotesi." },
      drag: { title: "Zavorra", text: "Vini con stock, giorni senza vendita o bassa contribuzione. Non sempre vanno tolti, ma vanno giustificati." },
    },
    ctaBadge: "Pareto automatico",
    ctaTitle: "Winerim trova il 20% che sostiene la tua carta senza fogli manuali.",
    ctaDescription: "La piattaforma incrocia vendite, stock, prezzo in carta, costo, rotazione e segnali di Margini per sapere cosa proteggere, cosa spingere e cosa smettere di comprare.",
    ctaAuditButton: "Scarica audit Pareto 80/20",
    ctaDemoButton: "Richiedi demo",
    faqs: [
      {
        q: "Cos'è il Pareto 80/20 applicato a una carta vini?",
        a: "È una lettura per rilevare quali poche referenze concentrano gran parte del fatturato o del margine, e quali consumano spazio e stock con poco ritorno.",
      },
      {
        q: "Un vino fuori dal nucleo dovrebbe essere eliminato?",
        a: "Non necessariamente. Può avere una funzione gastronomica, d'immagine o di abbinamento. L'importante è che la funzione sia chiara.",
      },
      {
        q: "Come si calcola in Winerim?",
        a: "Con dati connessi di carta, vendite, stock, costo, prezzo in carta, rotazione e segnali di Margini, non con stime manuali.",
      },
    ],
    internalLinksTitle: "Continua ad analizzare la redditività",
    internalLinks: {
      marginLeakage: "Calcolatrice fuga margine",
      marginSignal: "Simulatore segnale Margini",
      deadWinesGuide: "Guida per rilevare vini morti",
      dynamicIntelligence: "Intelligenza dinamica",
    },
  },
  fr: {
    locale: "fr-FR",
    seoTitle: "Simulateur Pareto 80/20 pour carte des vins",
    seoDescription: "Découvrez quels vins soutiennent le chiffre d'affaires et la marge, lesquels servent de support et lesquels peuvent freiner la rentabilité.",
    breadcrumbTools: "Outils",
    breadcrumbSelf: "Simulateur Pareto 80/20",
    badge: "Démo · Pareto de carte",
    h1: "Simulateur Pareto 80/20 de votre carte des vins",
    subtitle: "Identifiez quelles références soutiennent la marge, lesquelles accompagnent seulement et lesquelles occupent carte, stock et attention sans retour suffisant.",
    inputTitle: "Saisissez les références clés",
    inputSubtitle: "Utilisez le chiffre d'affaires et la marge estimés du dernier mois.",
    referenceLabel: "Référence",
    revenueLabel: "Ventes €",
    marginLabel: "Marge %",
    stockLabel: "Stock",
    daysLabel: "Jours sans vente",
    calculateButton: "Calculer Pareto",
    resetButton: "Restaurer l'exemple",
    readingLabel: "Lecture Pareto",
    coreHeadline: (count) => `${count} références soutiennent le noyau`,
    revenueMetric: "Chiffre d'affaires",
    weightedMarginMetric: "Marge pondérée",
    reviewMetric: "Réf. à revoir",
    unnamedReference: "Référence sans nom",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% de la marge simulée · cumulé ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Noyau", action: "Protéger la disponibilité et le discours de vente" },
      drag: { label: "Frein", action: "Ne pas réapprovisionner et écouler par recommandation contrôlée" },
      exploration: { label: "Exploration", action: "Tester avec accord, verre ou mise en avant sur la carte" },
      support: { label: "Soutien", action: "Conserver si elle couvre une fonction claire" },
    },
    cards: {
      core: { title: "Noyau", text: "Vins qui soutiennent la marge. Il faut protéger disponibilité, discours et prix carte." },
      exploration: { title: "Exploration", text: "Références pertinentes dans la carte mais pas encore assez tractées. Elles ont besoin d'une hypothèse." },
      drag: { title: "Frein", text: "Vins avec stock, jours sans vente ou faible contribution. Ils ne sont pas toujours à supprimer, mais ils doivent être justifiés." },
    },
    ctaBadge: "Pareto automatique",
    ctaTitle: "Winerim trouve les 20% qui soutiennent votre carte sans tableurs manuels.",
    ctaDescription: "La plateforme croise ventes, stock, prix carte, coût, rotation et signaux de Marges pour savoir quoi protéger, quoi pousser et quoi arrêter d'acheter.",
    ctaAuditButton: "Télécharger l'audit Pareto 80/20",
    ctaDemoButton: "Demander une démo",
    faqs: [
      {
        q: "Qu'est-ce que le Pareto 80/20 appliqué à une carte des vins ?",
        a: "C'est une lecture qui détecte quelles quelques références concentrent une grande partie du chiffre d'affaires ou de la marge, et lesquelles consomment espace et stock avec peu de retour.",
      },
      {
        q: "Un vin hors du noyau doit-il être supprimé ?",
        a: "Pas nécessairement. Il peut avoir une fonction gastronomique, d'image ou d'accord. L'important est que sa fonction soit claire.",
      },
      {
        q: "Comment Winerim le calcule-t-il ?",
        a: "Avec des données connectées de carte, ventes, stock, coût, prix carte, rotation et signaux de Marges, pas avec des estimations manuelles.",
      },
    ],
    internalLinksTitle: "Continuez à analyser la rentabilité",
    internalLinks: {
      marginLeakage: "Calculateur de fuite de marge",
      marginSignal: "Simulateur de signal Marges",
      deadWinesGuide: "Guide pour détecter les vins morts",
      dynamicIntelligence: "Intelligence dynamique",
    },
  },
  de: {
    locale: "de-DE",
    seoTitle: "Pareto-80/20-Simulator für Weinkarten",
    seoDescription: "Erkennen Sie, welche Weine Umsatz und Marge tragen, welche stützen und welche die Rentabilität der Weinkarte bremsen können.",
    breadcrumbTools: "Werkzeuge",
    breadcrumbSelf: "Pareto-80/20-Simulator",
    badge: "Demo · Weinkarten-Pareto",
    h1: "Pareto-80/20-Simulator für Ihre Weinkarte",
    subtitle: "Erkennen Sie, welche Referenzen die Marge tragen, welche nur begleiten und welche Kartenplatz, Bestand und Aufmerksamkeit ohne ausreichende Rendite binden.",
    inputTitle: "Wichtige Referenzen eingeben",
    inputSubtitle: "Nutzen Sie geschätzten Umsatz und Marge des letzten Monats.",
    referenceLabel: "Referenz",
    revenueLabel: "Verkäufe €",
    marginLabel: "Marge %",
    stockLabel: "Bestand",
    daysLabel: "Tage ohne Verkauf",
    calculateButton: "Pareto berechnen",
    resetButton: "Beispiel wiederherstellen",
    readingLabel: "Pareto-Lesart",
    coreHeadline: (count) => `${count} Referenzen tragen den Kern`,
    revenueMetric: "Umsatz",
    weightedMarginMetric: "Gewichtete Marge",
    reviewMetric: "Zu prüfende Ref.",
    unnamedReference: "Unbenannte Referenz",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% der simulierten Marge · kumuliert ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Kern", action: "Verfügbarkeit und Verkaufsargumentation schützen" },
      drag: { label: "Ballast", action: "Nicht nachbestellen und gezielt über Empfehlung abverkaufen" },
      exploration: { label: "Erkundung", action: "Mit Pairing, Glaswein oder Hervorhebung auf der Karte testen" },
      support: { label: "Stütze", action: "Behalten, wenn eine klare Funktion abgedeckt wird" },
    },
    cards: {
      core: { title: "Kern", text: "Weine, die die Marge tragen. Verfügbarkeit, Verkaufsargumentation und Kartenpreis müssen geschützt werden." },
      exploration: { title: "Erkundung", text: "Referenzen mit Sinn in der Karte, aber noch ohne genug Zugkraft. Sie brauchen eine Hypothese." },
      drag: { title: "Ballast", text: "Weine mit Bestand, Tagen ohne Verkauf oder niedriger Beitragsleistung. Sie müssen nicht immer raus, aber sie brauchen eine Begründung." },
    },
    ctaBadge: "Automatisches Pareto",
    ctaTitle: "Winerim findet die 20%, die Ihre Karte tragen, ohne manuelle Tabellen.",
    ctaDescription: "Die Plattform verknüpft Verkäufe, Bestand, Kartenpreis, Kosten, Rotation und Margen-Signale, um zu wissen, was geschützt, gepusht und nicht mehr gekauft werden sollte.",
    ctaAuditButton: "Pareto-80/20-Audit herunterladen",
    ctaDemoButton: "Demo anfragen",
    faqs: [
      {
        q: "Was bedeutet Pareto 80/20 bei einer Weinkarte?",
        a: "Es ist eine Lesart, die zeigt, welche wenigen Referenzen einen großen Teil von Umsatz oder Marge bündeln und welche Platz und Bestand mit wenig Rendite verbrauchen.",
      },
      {
        q: "Sollte ein Wein außerhalb des Kerns entfernt werden?",
        a: "Nicht unbedingt. Er kann eine gastronomische, imagebildende oder Pairing-Funktion haben. Wichtig ist, dass diese Funktion klar ist.",
      },
      {
        q: "Wie berechnet Winerim das?",
        a: "Mit verbundenen Daten aus Karte, Verkäufen, Bestand, Kosten, Kartenpreis, Rotation und Margen-Signalen, nicht mit manuellen Schätzungen.",
      },
    ],
    internalLinksTitle: "Rentabilität weiter analysieren",
    internalLinks: {
      marginLeakage: "Margenverlust-Rechner",
      marginSignal: "Margensignal-Simulator",
      deadWinesGuide: "Ratgeber zum Erkennen von Totbestand",
      dynamicIntelligence: "Dynamische Intelligenz",
    },
  },
  pt: {
    locale: "pt-PT",
    seoTitle: "Simulador Pareto 80/20 para carta de vinhos",
    seoDescription: "Descubra que vinhos sustentam faturação e margem, quais são suporte e quais podem estar a travar a rentabilidade da carta.",
    breadcrumbTools: "Ferramentas",
    breadcrumbSelf: "Simulador Pareto 80/20",
    badge: "Demo · Pareto da carta",
    h1: "Simulador Pareto 80/20 da sua carta de vinhos",
    subtitle: "Identifique que referências sustentam a margem, quais apenas acompanham e quais podem estar a ocupar carta, stock e atenção sem retorno suficiente.",
    inputTitle: "Introduza referências-chave",
    inputSubtitle: "Use faturação e margem estimadas do último mês.",
    referenceLabel: "Referência",
    revenueLabel: "Vendas €",
    marginLabel: "Margem %",
    stockLabel: "Stock",
    daysLabel: "Dias sem venda",
    calculateButton: "Calcular Pareto",
    resetButton: "Restaurar exemplo",
    readingLabel: "Leitura Pareto",
    coreHeadline: (count) => `${count} referências sustentam o núcleo`,
    revenueMetric: "Faturação",
    weightedMarginMetric: "Margem ponderada",
    reviewMetric: "Refs. a rever",
    unnamedReference: "Referência sem nome",
    marginLine: (share, cumulative) => `${Math.round(share * 100)}% da margem simulada · acumulado ${Math.round(cumulative * 100)}%`,
    segments: {
      core: { label: "Núcleo", action: "Proteger disponibilidade e discurso de venda" },
      drag: { label: "Lastro", action: "Não repor e escoar com recomendação controlada" },
      exploration: { label: "Exploração", action: "Testar com harmonização, copo ou destaque na carta" },
      support: { label: "Suporte", action: "Manter se cobre uma função clara" },
    },
    cards: {
      core: { title: "Núcleo", text: "Vinhos que sustentam a margem. É preciso proteger disponibilidade, discurso e PVP." },
      exploration: { title: "Exploração", text: "Referências com sentido na carta, mas ainda sem tração suficiente. Precisam de uma hipótese." },
      drag: { title: "Lastro", text: "Vinhos com stock, dias sem venda ou baixa contribuição. Nem sempre sobram, mas têm de ser justificados." },
    },
    ctaBadge: "Pareto automático",
    ctaTitle: "A Winerim encontra os 20% que sustentam a sua carta sem folhas manuais.",
    ctaDescription: "A plataforma cruza vendas, stock, PVP, custo, rotação e sinais de Margens para saber o que proteger, o que impulsionar e o que deixar de comprar.",
    ctaAuditButton: "Descarregar auditoria Pareto 80/20",
    ctaDemoButton: "Solicitar demo",
    faqs: [
      {
        q: "O que é o Pareto 80/20 aplicado a uma carta de vinhos?",
        a: "É uma leitura para detetar que poucas referências concentram grande parte da faturação ou margem, e quais consomem espaço e stock com pouco retorno.",
      },
      {
        q: "Um vinho fora do núcleo deveria ser eliminado?",
        a: "Não necessariamente. Pode ter função gastronómica, de imagem ou de harmonização. O importante é que essa função esteja clara.",
      },
      {
        q: "Como se calcula na Winerim?",
        a: "Com dados conectados de carta, vendas, stock, custo, PVP, rotação e sinais de Margens, não com estimativas manuais.",
      },
    ],
    internalLinksTitle: "Continue a analisar rentabilidade",
    internalLinks: {
      marginLeakage: "Calculadora de fuga de margem",
      marginSignal: "Simulador de sinal de Margens",
      deadWinesGuide: "Guia para detetar vinhos mortos",
      dynamicIntelligence: "Inteligência dinâmica",
    },
  },
};

const parseNumber = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const segmentCards: { key: "core" | "exploration" | "drag"; icon: typeof Target }[] = [
  { key: "core", icon: Target },
  { key: "exploration", icon: Wine },
  { key: "drag", icon: CheckCircle },
];

const SimuladorParetoCarta = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(PARETO_COPY, lang);
  const exampleRows = useMemo(() => getI18n(PARETO_INITIAL_ROWS, lang), [lang]);
  const currency = useMemo(
    () => new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
    [t.locale],
  );
  const [rows, setRows] = useState<WineRow[]>(exampleRows);

  useEffect(() => {
    setRows(exampleRows);
  }, [exampleRows]);

  const result = useMemo(() => {
    const enriched = rows
      .map((row) => {
        const revenue = parseNumber(row.revenue);
        const margin = parseNumber(row.margin);
        const stock = parseNumber(row.stock);
        const days = parseNumber(row.days);
        const contribution = revenue * (margin / 100);
        return { ...row, revenue, margin, stock, days, contribution };
      })
      .sort((a, b) => b.contribution - a.contribution);

    const totalRevenue = enriched.reduce((sum, row) => sum + row.revenue, 0);
    const totalContribution = enriched.reduce((sum, row) => sum + row.contribution, 0);
    let cumulative = 0;
    const classified = enriched.map((row, index) => {
      cumulative += row.contribution;
      const share = totalContribution > 0 ? row.contribution / totalContribution : 0;
      const cumulativeShare = totalContribution > 0 ? cumulative / totalContribution : 0;
      const segment: Segment =
        cumulativeShare <= 0.8
          ? "core"
          : row.stock >= 10 && row.days >= 90
            ? "drag"
            : row.margin >= 60 && row.revenue < totalRevenue * 0.08
              ? "exploration"
              : "support";
      return { ...row, index, share, cumulativeShare, segment };
    });

    const topCount = classified.filter((row) => row.segment === "core").length;
    return { classified, totalRevenue, totalContribution, topCount };
  }, [rows]);

  const updateRow = (index: number, key: keyof WineRow, value: string) => {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const localizedPath = localePath("/herramientas/simulador-pareto-carta-vinos");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        url={`${CANONICAL_DOMAIN}${localizedPath}`}
        hreflang={allLangPaths("/herramientas/simulador-pareto-carta-vinos")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.breadcrumbTools, href: localePath("/herramientas") }, { label: t.breadcrumbSelf }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.badge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {t.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid xl:grid-cols-[1.15fr_0.85fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <PieChart size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{t.inputTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.inputSubtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div key={index} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="grid md:grid-cols-[1.2fr_repeat(4,minmax(0,0.8fr))] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`wine-${index}`}>{t.referenceLabel}</Label>
                        <Input id={`wine-${index}`} value={row.name} onChange={(e) => updateRow(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`revenue-${index}`}>{t.revenueLabel}</Label>
                        <Input id={`revenue-${index}`} inputMode="decimal" value={row.revenue} onChange={(e) => updateRow(index, "revenue", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`margin-${index}`}>{t.marginLabel}</Label>
                        <Input id={`margin-${index}`} inputMode="decimal" value={row.margin} onChange={(e) => updateRow(index, "margin", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`stock-${index}`}>{t.stockLabel}</Label>
                        <Input id={`stock-${index}`} inputMode="decimal" value={row.stock} onChange={(e) => updateRow(index, "stock", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`days-${index}`}>{t.daysLabel}</Label>
                        <Input id={`days-${index}`} inputMode="decimal" value={row.days} onChange={(e) => updateRow(index, "days", e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  className="flex-1 bg-wine hover:bg-wine/90"
                  onClick={() => trackAction("tool_use", "tool", "simulador-pareto-carta-vinos")}
                >
                  {t.calculateButton}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setRows(exampleRows)}>
                  <RotateCcw size={16} className="mr-2" />
                  {t.resetButton}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{t.readingLabel}</p>
                  <h2 className="font-heading text-2xl font-semibold">{t.coreHeadline(result.topCount)}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-wine/30 bg-wine/10 px-3 py-1.5 text-xs font-semibold text-wine">
                  <BarChart3 size={14} />
                  {currency.format(result.totalContribution)}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-6">
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.revenueMetric}</p>
                  <p className="text-2xl font-semibold mt-1">{currency.format(result.totalRevenue)}</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.weightedMarginMetric}</p>
                  <p className="text-2xl font-semibold mt-1">{result.totalRevenue > 0 ? Math.round((result.totalContribution / result.totalRevenue) * 100) : 0}%</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.reviewMetric}</p>
                  <p className="text-2xl font-semibold mt-1">{result.classified.filter((row) => row.segment === "drag").length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {result.classified.map((row) => {
                  const segment = t.segments[row.segment];
                  return (
                    <div key={`${row.index}-${row.name}`} className="rounded-lg border border-border bg-background/70 p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-semibold">{row.name || t.unnamedReference}</p>
                          <p className="text-xs text-muted-foreground">{segment.action}</p>
                        </div>
                        <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine">{segment.label}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-wine" style={{ width: `${Math.round(row.cumulativeShare * 100)}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{t.marginLine(row.share, row.cumulativeShare)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {segmentCards.map((item) => {
              const Icon = item.icon;
              const card = t.cards[item.key];
              return (
                <ScrollReveal key={item.key}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{t.ctaBadge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {t.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/auditoria-pareto-80-20-carta-vinos")}>{t.ctaAuditButton}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/demo")}>{t.ctaDemoButton}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection schemaId="simulador-pareto-carta-vinos" faqs={t.faqs} />

        <InternalLinks
          title={t.internalLinksTitle}
          links={[
            { to: localePath("/herramientas/calculadora-fuga-margen"), label: t.internalLinks.marginLeakage, type: "tool" },
            { to: localePath("/herramientas/simulador-senal-margenes"), label: t.internalLinks.marginSignal, type: "tool" },
            { to: localePath("/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad"), label: t.internalLinks.deadWinesGuide, type: "guide" },
            { to: localePath("/producto/inteligencia-dinamica"), label: t.internalLinks.dynamicIntelligence, type: "solution" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorParetoCarta;
