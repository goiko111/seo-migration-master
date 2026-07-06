import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  DollarSign,
  Info,
  Shield,
  TrendingUp,
  Wine,
} from "lucide-react";
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
import { getI18n } from "@/i18n/types";

type Decision = "ok" | "noreponer" | "liquidar" | "critico";
type Profile = "lastre" | "sin actividad" | "estrella" | "volumen" | "rentable" | "estable";
type Confidence = "media" | "baja";
type LinkType = "guide" | "tool" | "resource" | "solution" | "decision-center";

interface SimuladorContent {
  locale: string;
  seoTitle: string;
  seoDescription: string;
  breadTools: string;
  breadSelf: string;
  badge: string;
  h1: string;
  subtitle: string;
  defaultWine: string;
  inputTitle: string;
  inputHelper: string;
  wineLabel: string;
  pvpLabel: string;
  costLabel: string;
  stockLabel: string;
  monthlySalesLabel: string;
  daysLabel: string;
  protectedLabel: string;
  protectedHelper: string;
  calculate: string;
  resultFor: string;
  unnamedWine: string;
  decisionCopy: Record<Decision, { label: string; action: string; reason: string }>;
  metrics: {
    grossMarginUnit: string;
    coverageEstimated: string;
    coverageHelper: string;
    monthlyVelocity: string;
    monthlyVelocityHelper: string;
    capitalTied: string;
    bottlesInStock: (stock: string) => string;
  };
  recommendedAction: string;
  abcProfile: string;
  demoConfidence: string;
  daysWithoutSale: string;
  profileLabels: Record<Profile, string>;
  confidenceLabels: Record<Confidence, string>;
  moreThan99Months: string;
  monthsValue: (months: string) => string;
  unitsValue: (units: string) => string;
  infoCards: { title: string; text: string }[];
  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaDemo: string;
  ctaDiagnostic: string;
  faqs: { q: string; a: string }[];
  internalLinksTitle: string;
  internalLinks: { to: string; label: string; type: LinkType }[];
}

const i18n: Record<string, SimuladorContent> = {
  es: {
    locale: "es-ES",
    seoTitle: "Simulador de señal de Márgenes para vino",
    seoDescription: "Calcula una señal simplificada de Márgenes Winerim: ok, no reponer, liquidar o crítico según stock, ventas, PVP, coste y días sin venta.",
    breadTools: "Herramientas",
    breadSelf: "Simulador de señal de Márgenes",
    badge: "Demo · Winerim Márgenes",
    h1: "Simulador de señal de Márgenes",
    subtitle: "Introduce PVP, coste, stock, ventas mensuales y días sin venta. La herramienta devuelve una señal simplificada: mantener, no reponer, liquidar o revisar como crítico.",
    defaultWine: "Ribera premium",
    inputTitle: "Datos de la referencia",
    inputHelper: "Todo se calcula en tu navegador.",
    wineLabel: "Nombre o familia del vino",
    pvpLabel: "PVP carta (€)",
    costLabel: "Coste compra (€)",
    stockLabel: "Stock actual",
    monthlySalesLabel: "Ventas mensuales",
    daysLabel: "Días desde última venta",
    protectedLabel: "Vino protegido o estratégico",
    protectedHelper: "Úsalo para referencias de imagen, maridaje o profundidad que no deben evaluarse solo por rotación.",
    calculate: "Calcular señal",
    resultFor: "Resultado para",
    unnamedWine: "Referencia sin nombre",
    decisionCopy: {
      ok: { label: "OK", action: "Mantener y seguir monitorizando", reason: "La cobertura, la velocidad y el margen no muestran una señal urgente." },
      noreponer: { label: "No reponer", action: "Agotar stock antes de volver a comprar", reason: "Hay indicios de cobertura alta, margen ajustado o rotación insuficiente." },
      liquidar: { label: "Liquidar", action: "Mover por copa, menú, recomendación o promoción controlada", reason: "El vino acumula stock o tiempo sin venta y empieza a bloquear capital." },
      critico: { label: "Crítico", action: "Revisar de inmediato: retirar, sustituir o liquidar", reason: "La combinación de baja velocidad, stock y días sin venta apunta a riesgo alto." },
    },
    metrics: {
      grossMarginUnit: "Margen bruto unitario",
      coverageEstimated: "Cobertura estimada",
      coverageHelper: "stock / ventas mes",
      monthlyVelocity: "Velocidad mensual",
      monthlyVelocityHelper: "ventas recientes",
      capitalTied: "Capital inmovilizado",
      bottlesInStock: (stock) => `${stock} botellas en stock`,
    },
    recommendedAction: "Acción recomendada",
    abcProfile: "ABC perfil",
    demoConfidence: "Confianza demo",
    daysWithoutSale: "Días sin venta",
    profileLabels: { lastre: "lastre", "sin actividad": "sin actividad", estrella: "estrella", volumen: "volumen", rentable: "rentable", estable: "estable" },
    confidenceLabels: { media: "media", baja: "baja" },
    moreThan99Months: "+99 meses",
    monthsValue: (months) => `${months} meses`,
    unitsValue: (units) => `${units} uds`,
    infoCards: [
      { title: "Qué simula", text: "Una versión simplificada de las señales de Márgenes: decisión, cobertura, capital, velocidad, días sin venta y confianza." },
      { title: "Qué no promete", text: "No sustituye el motor real de Winerim, que cruza carta, stock, TPV, coste, histórico y reglas de protección." },
      { title: "Qué descubre", text: "Si una referencia debería protegerse, moverse, no reponerse o revisarse antes de volver a comprar." },
    ],
    ctaBadge: "Winerim Márgenes",
    ctaTitle: "En Winerim esto no se calcula vino a vino: aparece como alerta.",
    ctaDescription: "La sección de Márgenes detecta referencias ok, no reponer, liquidar o críticas, con cobertura de meses, capital inmovilizado, velocidad mensual, razón y confianza.",
    ctaDemo: "Ver Winerim en una demo",
    ctaDiagnostic: "Descargar diagnóstico de margen",
    faqs: [
      { q: "¿Esta señal es igual que la de Winerim en producción?", a: "No. Es una demo simplificada para entender la lógica. El motor real de Winerim usa más contexto, histórico, reglas de protección y datos conectados." },
      { q: "¿Qué significa no reponer?", a: "Significa agotar el stock actual antes de volver a comprar, salvo que el vino tenga una función estratégica clara en la carta." },
      { q: "¿Por qué importa la cobertura en meses?", a: "Porque muestra cuánto tiempo tardarías en vender el stock actual al ritmo de ventas reciente. Coberturas muy altas suelen indicar capital inmovilizado." },
    ],
    internalLinksTitle: "Sigue analizando tu carta",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Auditoría Pareto 80/20", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  en: {
    locale: "en-GB",
    seoTitle: "Wine margin signal simulator",
    seoDescription: "Calculate a simplified Winerim Margins signal: OK, stop restocking, liquidate or critical based on stock, sales, selling price, cost and days without sale.",
    breadTools: "Tools",
    breadSelf: "Margin signal simulator",
    badge: "Demo · Winerim Margins",
    h1: "Margin signal simulator",
    subtitle: "Enter selling price, cost, stock, monthly sales and days without sale. The tool returns a simplified signal: keep, stop restocking, liquidate or review as critical.",
    defaultWine: "Premium Ribera",
    inputTitle: "Reference data",
    inputHelper: "Everything is calculated in your browser.",
    wineLabel: "Wine name or family",
    pvpLabel: "List selling price (€)",
    costLabel: "Purchase cost (€)",
    stockLabel: "Current stock",
    monthlySalesLabel: "Monthly sales",
    daysLabel: "Days since last sale",
    protectedLabel: "Protected or strategic wine",
    protectedHelper: "Use this for image, pairing or depth references that should not be judged only by rotation.",
    calculate: "Calculate signal",
    resultFor: "Result for",
    unnamedWine: "Unnamed reference",
    decisionCopy: {
      ok: { label: "OK", action: "Keep and keep monitoring", reason: "Coverage, velocity and margin do not show an urgent signal." },
      noreponer: { label: "Stop restocking", action: "Sell through current stock before buying again", reason: "There are signs of high coverage, tight margin or insufficient rotation." },
      liquidar: { label: "Liquidate", action: "Move it by the glass, menu, recommendation or controlled promotion", reason: "The wine is accumulating stock or time without sale and is starting to block capital." },
      critico: { label: "Critical", action: "Review immediately: remove, replace or liquidate", reason: "The mix of low velocity, stock and days without sale points to high risk." },
    },
    metrics: {
      grossMarginUnit: "Gross margin per unit",
      coverageEstimated: "Estimated coverage",
      coverageHelper: "stock / monthly sales",
      monthlyVelocity: "Monthly velocity",
      monthlyVelocityHelper: "recent sales",
      capitalTied: "Tied-up capital",
      bottlesInStock: (stock) => `${stock} bottles in stock`,
    },
    recommendedAction: "Recommended action",
    abcProfile: "ABC profile",
    demoConfidence: "Demo confidence",
    daysWithoutSale: "Days without sale",
    profileLabels: { lastre: "drag", "sin actividad": "inactive", estrella: "star", volumen: "volume", rentable: "profitable", estable: "stable" },
    confidenceLabels: { media: "medium", baja: "low" },
    moreThan99Months: "+99 months",
    monthsValue: (months) => `${months} months`,
    unitsValue: (units) => `${units} units`,
    infoCards: [
      { title: "What it simulates", text: "A simplified version of the Margins signals: decision, coverage, capital, velocity, days without sale and confidence." },
      { title: "What it does not promise", text: "It does not replace Winerim's real engine, which combines list, stock, POS, cost, history and protection rules." },
      { title: "What it reveals", text: "Whether a reference should be protected, moved, stopped from restocking or reviewed before buying again." },
    ],
    ctaBadge: "Winerim Margins",
    ctaTitle: "In Winerim this is not calculated wine by wine: it appears as an alert.",
    ctaDescription: "The Margins section detects OK, stop-restocking, liquidation or critical references, with month coverage, tied-up capital, monthly velocity, reason and confidence.",
    ctaDemo: "See Winerim in a demo",
    ctaDiagnostic: "Download margin diagnosis",
    faqs: [
      { q: "Is this signal the same as Winerim in production?", a: "No. It is a simplified demo to understand the logic. Winerim's real engine uses more context, history, protection rules and connected data." },
      { q: "What does stop restocking mean?", a: "It means selling through current stock before buying again, unless the wine has a clear strategic role on the list." },
      { q: "Why does coverage in months matter?", a: "Because it shows how long it would take to sell current stock at the recent sales pace. Very high coverage often means tied-up capital." },
    ],
    internalLinksTitle: "Keep analysing your wine list",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Dead stock calculator", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Smart purchasing calculator", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Pareto 80/20 audit", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  it: {
    locale: "it-IT",
    seoTitle: "Simulatore del segnale margini per il vino",
    seoDescription: "Calcola un segnale semplificato dei Margini Winerim: OK, non riordinare, liquidare o critico in base a stock, vendite, prezzo, costo e giorni senza vendita.",
    breadTools: "Strumenti",
    breadSelf: "Simulatore segnale margini",
    badge: "Demo · Margini Winerim",
    h1: "Simulatore del segnale margini",
    subtitle: "Inserisci prezzo in carta, costo, stock, vendite mensili e giorni senza vendita. Lo strumento restituisce un segnale semplificato: mantenere, non riordinare, liquidare o rivedere come critico.",
    defaultWine: "Ribera premium",
    inputTitle: "Dati della referenza",
    inputHelper: "Tutto viene calcolato nel tuo browser.",
    wineLabel: "Nome o famiglia del vino",
    pvpLabel: "Prezzo in carta (€)",
    costLabel: "Costo d'acquisto (€)",
    stockLabel: "Stock attuale",
    monthlySalesLabel: "Vendite mensili",
    daysLabel: "Giorni dall'ultima vendita",
    protectedLabel: "Vino protetto o strategico",
    protectedHelper: "Usalo per referenze d'immagine, abbinamento o profondità che non devono essere valutate solo per rotazione.",
    calculate: "Calcola segnale",
    resultFor: "Risultato per",
    unnamedWine: "Referenza senza nome",
    decisionCopy: {
      ok: { label: "OK", action: "Mantenere e continuare a monitorare", reason: "Copertura, velocità e margine non mostrano un segnale urgente." },
      noreponer: { label: "Non riordinare", action: "Esaurire lo stock prima di acquistare di nuovo", reason: "Ci sono segnali di copertura alta, margine stretto o rotazione insufficiente." },
      liquidar: { label: "Liquidare", action: "Muovere al calice, in menu, con raccomandazione o promozione controllata", reason: "Il vino accumula stock o tempo senza vendita e inizia a bloccare capitale." },
      critico: { label: "Critico", action: "Rivedere subito: ritirare, sostituire o liquidare", reason: "La combinazione di bassa velocità, stock e giorni senza vendita indica un rischio alto." },
    },
    metrics: {
      grossMarginUnit: "Margine lordo unitario",
      coverageEstimated: "Copertura stimata",
      coverageHelper: "stock / vendite mese",
      monthlyVelocity: "Velocità mensile",
      monthlyVelocityHelper: "vendite recenti",
      capitalTied: "Capitale immobilizzato",
      bottlesInStock: (stock) => `${stock} bottiglie in stock`,
    },
    recommendedAction: "Azione raccomandata",
    abcProfile: "Profilo ABC",
    demoConfidence: "Confidenza demo",
    daysWithoutSale: "Giorni senza vendita",
    profileLabels: { lastre: "zavorra", "sin actividad": "senza attività", estrella: "star", volumen: "volume", rentable: "redditizia", estable: "stabile" },
    confidenceLabels: { media: "media", baja: "bassa" },
    moreThan99Months: "+99 mesi",
    monthsValue: (months) => `${months} mesi`,
    unitsValue: (units) => `${units} unità`,
    infoCards: [
      { title: "Cosa simula", text: "Una versione semplificata dei segnali Margini: decisione, copertura, capitale, velocità, giorni senza vendita e confidenza." },
      { title: "Cosa non promette", text: "Non sostituisce il motore reale di Winerim, che incrocia carta, stock, POS, costo, storico e regole di protezione." },
      { title: "Cosa scopre", text: "Se una referenza dovrebbe essere protetta, spinta, non riordinata o rivista prima di acquistare di nuovo." },
    ],
    ctaBadge: "Margini Winerim",
    ctaTitle: "In Winerim questo non si calcola vino per vino: appare come avviso.",
    ctaDescription: "La sezione Margini rileva referenze OK, da non riordinare, da liquidare o critiche, con copertura in mesi, capitale immobilizzato, velocità mensile, motivo e confidenza.",
    ctaDemo: "Vedi Winerim in demo",
    ctaDiagnostic: "Scarica diagnosi margine",
    faqs: [
      { q: "Questo segnale è uguale a quello di Winerim in produzione?", a: "No. È una demo semplificata per capire la logica. Il motore reale di Winerim usa più contesto, storico, regole di protezione e dati collegati." },
      { q: "Cosa significa non riordinare?", a: "Significa esaurire lo stock attuale prima di acquistare di nuovo, salvo che il vino abbia una funzione strategica chiara nella carta." },
      { q: "Perché conta la copertura in mesi?", a: "Perché mostra quanto tempo servirebbe per vendere lo stock attuale al ritmo recente. Coperture molto alte spesso indicano capitale immobilizzato." },
    ],
    internalLinksTitle: "Continua ad analizzare la tua carta",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calcolatrice stock morto", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calcolatrice acquisto intelligente", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Audit Pareto 80/20", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  fr: {
    locale: "fr-FR",
    seoTitle: "Simulateur de signal de marges pour le vin",
    seoDescription: "Calculez un signal simplifié des Marges Winerim : OK, ne pas réapprovisionner, liquider ou critique selon le stock, les ventes, le prix, le coût et les jours sans vente.",
    breadTools: "Outils",
    breadSelf: "Simulateur de signal de marges",
    badge: "Démo · Marges Winerim",
    h1: "Simulateur de signal de marges",
    subtitle: "Saisissez prix de vente, coût, stock, ventes mensuelles et jours sans vente. L'outil retourne un signal simplifié : conserver, ne pas réapprovisionner, liquider ou revoir comme critique.",
    defaultWine: "Ribera premium",
    inputTitle: "Données de la référence",
    inputHelper: "Tout est calculé dans votre navigateur.",
    wineLabel: "Nom ou famille du vin",
    pvpLabel: "Prix carte (€)",
    costLabel: "Coût d'achat (€)",
    stockLabel: "Stock actuel",
    monthlySalesLabel: "Ventes mensuelles",
    daysLabel: "Jours depuis la dernière vente",
    protectedLabel: "Vin protégé ou stratégique",
    protectedHelper: "À utiliser pour les références d'image, d'accords ou de profondeur qui ne doivent pas être évaluées uniquement par la rotation.",
    calculate: "Calculer le signal",
    resultFor: "Résultat pour",
    unnamedWine: "Référence sans nom",
    decisionCopy: {
      ok: { label: "OK", action: "Conserver et continuer à surveiller", reason: "La couverture, la vitesse et la marge ne montrent pas de signal urgent." },
      noreponer: { label: "Ne pas réapprovisionner", action: "Écouler le stock avant de racheter", reason: "Des signes de couverture élevée, de marge serrée ou de rotation insuffisante apparaissent." },
      liquidar: { label: "Liquider", action: "Le pousser au verre, en menu, en recommandation ou promotion contrôlée", reason: "Le vin accumule du stock ou du temps sans vente et commence à bloquer du capital." },
      critico: { label: "Critique", action: "Revoir immédiatement : retirer, remplacer ou liquider", reason: "La combinaison faible vitesse, stock et jours sans vente indique un risque élevé." },
    },
    metrics: {
      grossMarginUnit: "Marge brute unitaire",
      coverageEstimated: "Couverture estimée",
      coverageHelper: "stock / ventes mois",
      monthlyVelocity: "Vitesse mensuelle",
      monthlyVelocityHelper: "ventes récentes",
      capitalTied: "Capital immobilisé",
      bottlesInStock: (stock) => `${stock} bouteilles en stock`,
    },
    recommendedAction: "Action recommandée",
    abcProfile: "Profil ABC",
    demoConfidence: "Confiance démo",
    daysWithoutSale: "Jours sans vente",
    profileLabels: { lastre: "poids mort", "sin actividad": "sans activité", estrella: "vedette", volumen: "volume", rentable: "rentable", estable: "stable" },
    confidenceLabels: { media: "moyenne", baja: "faible" },
    moreThan99Months: "+99 mois",
    monthsValue: (months) => `${months} mois`,
    unitsValue: (units) => `${units} unités`,
    infoCards: [
      { title: "Ce que cela simule", text: "Une version simplifiée des signaux Marges : décision, couverture, capital, vitesse, jours sans vente et confiance." },
      { title: "Ce que cela ne promet pas", text: "Cela ne remplace pas le moteur réel de Winerim, qui croise carte, stock, caisse, coût, historique et règles de protection." },
      { title: "Ce que cela révèle", text: "Si une référence doit être protégée, poussée, non réapprovisionnée ou revue avant de racheter." },
    ],
    ctaBadge: "Marges Winerim",
    ctaTitle: "Dans Winerim, cela ne se calcule pas vin par vin : cela apparaît comme une alerte.",
    ctaDescription: "La section Marges détecte les références OK, à ne pas réapprovisionner, à liquider ou critiques, avec couverture en mois, capital immobilisé, vitesse mensuelle, raison et confiance.",
    ctaDemo: "Voir Winerim en démo",
    ctaDiagnostic: "Télécharger le diagnostic de marge",
    faqs: [
      { q: "Ce signal est-il identique à celui de Winerim en production ?", a: "Non. C'est une démo simplifiée pour comprendre la logique. Le moteur réel de Winerim utilise plus de contexte, d'historique, de règles de protection et de données connectées." },
      { q: "Que signifie ne pas réapprovisionner ?", a: "Cela signifie écouler le stock actuel avant de racheter, sauf si le vin a une fonction stratégique claire dans la carte." },
      { q: "Pourquoi la couverture en mois est-elle importante ?", a: "Parce qu'elle montre le temps nécessaire pour vendre le stock actuel au rythme de vente récent. Une couverture très élevée indique souvent du capital immobilisé." },
    ],
    internalLinksTitle: "Continuez à analyser votre carte",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculateur de stock mort", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculateur d'achat intelligent", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Audit Pareto 80/20", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  de: {
    locale: "de-DE",
    seoTitle: "Margensignal-Simulator für Wein",
    seoDescription: "Berechnen Sie ein vereinfachtes Winerim-Margensignal: OK, nicht nachbestellen, abverkaufen oder kritisch anhand von Bestand, Verkäufen, Verkaufspreis, Kosten und Tagen ohne Verkauf.",
    breadTools: "Werkzeuge",
    breadSelf: "Margensignal-Simulator",
    badge: "Demo · Winerim Margen",
    h1: "Margensignal-Simulator",
    subtitle: "Geben Sie Verkaufspreis, Kosten, Bestand, Monatsverkäufe und Tage ohne Verkauf ein. Das Werkzeug liefert ein vereinfachtes Signal: behalten, nicht nachbestellen, abverkaufen oder kritisch prüfen.",
    defaultWine: "Premium Ribera",
    inputTitle: "Referenzdaten",
    inputHelper: "Alles wird in Ihrem Browser berechnet.",
    wineLabel: "Weinname oder Weinfamilie",
    pvpLabel: "Kartenpreis (€)",
    costLabel: "Einkaufskosten (€)",
    stockLabel: "Aktueller Bestand",
    monthlySalesLabel: "Monatliche Verkäufe",
    daysLabel: "Tage seit letztem Verkauf",
    protectedLabel: "Geschützter oder strategischer Wein",
    protectedHelper: "Für Image-, Pairing- oder Tiefenreferenzen, die nicht nur nach Rotation bewertet werden sollten.",
    calculate: "Signal berechnen",
    resultFor: "Ergebnis für",
    unnamedWine: "Unbenannte Referenz",
    decisionCopy: {
      ok: { label: "OK", action: "Behalten und weiter überwachen", reason: "Abdeckung, Geschwindigkeit und Marge zeigen kein dringendes Signal." },
      noreponer: { label: "Nicht nachbestellen", action: "Aktuellen Bestand abverkaufen, bevor erneut gekauft wird", reason: "Es gibt Hinweise auf hohe Abdeckung, knappe Marge oder unzureichende Rotation." },
      liquidar: { label: "Abverkaufen", action: "Über Glaswein, Menü, Empfehlung oder kontrollierte Aktion bewegen", reason: "Der Wein sammelt Bestand oder Zeit ohne Verkauf an und bindet Kapital." },
      critico: { label: "Kritisch", action: "Sofort prüfen: entfernen, ersetzen oder abverkaufen", reason: "Die Kombination aus niedriger Geschwindigkeit, Bestand und Tagen ohne Verkauf weist auf hohes Risiko hin." },
    },
    metrics: {
      grossMarginUnit: "Bruttomarge pro Einheit",
      coverageEstimated: "Geschätzte Abdeckung",
      coverageHelper: "Bestand / Monatsverkäufe",
      monthlyVelocity: "Monatliche Geschwindigkeit",
      monthlyVelocityHelper: "aktuelle Verkäufe",
      capitalTied: "Gebundenes Kapital",
      bottlesInStock: (stock) => `${stock} Flaschen auf Lager`,
    },
    recommendedAction: "Empfohlene Aktion",
    abcProfile: "ABC-Profil",
    demoConfidence: "Demo-Konfidenz",
    daysWithoutSale: "Tage ohne Verkauf",
    profileLabels: { lastre: "Ballast", "sin actividad": "ohne Aktivität", estrella: "Star", volumen: "Volumen", rentable: "rentabel", estable: "stabil" },
    confidenceLabels: { media: "mittel", baja: "niedrig" },
    moreThan99Months: "+99 Monate",
    monthsValue: (months) => `${months} Monate`,
    unitsValue: (units) => `${units} Einh.`,
    infoCards: [
      { title: "Was es simuliert", text: "Eine vereinfachte Version der Margensignale: Entscheidung, Abdeckung, Kapital, Geschwindigkeit, Tage ohne Verkauf und Konfidenz." },
      { title: "Was es nicht verspricht", text: "Es ersetzt nicht den realen Winerim-Motor, der Karte, Bestand, POS, Kosten, Historie und Schutzregeln verknüpft." },
      { title: "Was es sichtbar macht", text: "Ob eine Referenz geschützt, bewegt, nicht nachbestellt oder vor dem nächsten Einkauf geprüft werden sollte." },
    ],
    ctaBadge: "Winerim Margen",
    ctaTitle: "In Winerim wird das nicht Wein für Wein berechnet: Es erscheint als Warnung.",
    ctaDescription: "Der Bereich Margen erkennt OK-, Nicht-nachbestellen-, Abverkaufs- oder kritische Referenzen mit Monatsabdeckung, gebundenem Kapital, monatlicher Geschwindigkeit, Grund und Konfidenz.",
    ctaDemo: "Winerim in einer Demo sehen",
    ctaDiagnostic: "Margendiagnose herunterladen",
    faqs: [
      { q: "Ist dieses Signal identisch mit Winerim in Produktion?", a: "Nein. Es ist eine vereinfachte Demo, um die Logik zu verstehen. Der reale Winerim-Motor nutzt mehr Kontext, Historie, Schutzregeln und verbundene Daten." },
      { q: "Was bedeutet nicht nachbestellen?", a: "Es bedeutet, den aktuellen Bestand abzuverkaufen, bevor erneut gekauft wird, außer der Wein hat eine klare strategische Funktion auf der Karte." },
      { q: "Warum ist die Abdeckung in Monaten wichtig?", a: "Sie zeigt, wie lange es dauern würde, den aktuellen Bestand beim jüngsten Verkaufstempo zu verkaufen. Sehr hohe Abdeckung bedeutet oft gebundenes Kapital." },
    ],
    internalLinksTitle: "Analysieren Sie Ihre Weinkarte weiter",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Totbestand-Rechner", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Rechner für intelligenten Einkauf", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Pareto-80/20-Audit", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  pt: {
    locale: "pt-PT",
    seoTitle: "Simulador de sinal de margens para vinho",
    seoDescription: "Calcule um sinal simplificado de Margens Winerim: OK, não repor, liquidar ou crítico segundo stock, vendas, PVP, custo e dias sem venda.",
    breadTools: "Ferramentas",
    breadSelf: "Simulador de sinal de margens",
    badge: "Demo · Margens Winerim",
    h1: "Simulador de sinal de margens",
    subtitle: "Introduza PVP, custo, stock, vendas mensais e dias sem venda. A ferramenta devolve um sinal simplificado: manter, não repor, liquidar ou rever como crítico.",
    defaultWine: "Ribera premium",
    inputTitle: "Dados da referência",
    inputHelper: "Tudo é calculado no seu navegador.",
    wineLabel: "Nome ou família do vinho",
    pvpLabel: "PVP na carta (€)",
    costLabel: "Custo de compra (€)",
    stockLabel: "Stock atual",
    monthlySalesLabel: "Vendas mensais",
    daysLabel: "Dias desde a última venda",
    protectedLabel: "Vinho protegido ou estratégico",
    protectedHelper: "Use para referências de imagem, harmonização ou profundidade que não devem ser avaliadas apenas pela rotação.",
    calculate: "Calcular sinal",
    resultFor: "Resultado para",
    unnamedWine: "Referência sem nome",
    decisionCopy: {
      ok: { label: "OK", action: "Manter e continuar a monitorizar", reason: "A cobertura, a velocidade e a margem não mostram um sinal urgente." },
      noreponer: { label: "Não repor", action: "Esgotar stock antes de voltar a comprar", reason: "Há sinais de cobertura alta, margem apertada ou rotação insuficiente." },
      liquidar: { label: "Liquidar", action: "Mover a copo, menu, recomendação ou promoção controlada", reason: "O vinho acumula stock ou tempo sem venda e começa a bloquear capital." },
      critico: { label: "Crítico", action: "Rever de imediato: retirar, substituir ou liquidar", reason: "A combinação de baixa velocidade, stock e dias sem venda aponta para risco elevado." },
    },
    metrics: {
      grossMarginUnit: "Margem bruta unitária",
      coverageEstimated: "Cobertura estimada",
      coverageHelper: "stock / vendas mês",
      monthlyVelocity: "Velocidade mensal",
      monthlyVelocityHelper: "vendas recentes",
      capitalTied: "Capital imobilizado",
      bottlesInStock: (stock) => `${stock} garrafas em stock`,
    },
    recommendedAction: "Ação recomendada",
    abcProfile: "Perfil ABC",
    demoConfidence: "Confiança demo",
    daysWithoutSale: "Dias sem venda",
    profileLabels: { lastre: "lastro", "sin actividad": "sem atividade", estrella: "estrela", volumen: "volume", rentable: "rentável", estable: "estável" },
    confidenceLabels: { media: "média", baja: "baixa" },
    moreThan99Months: "+99 meses",
    monthsValue: (months) => `${months} meses`,
    unitsValue: (units) => `${units} un.`,
    infoCards: [
      { title: "O que simula", text: "Uma versão simplificada dos sinais de Margens: decisão, cobertura, capital, velocidade, dias sem venda e confiança." },
      { title: "O que não promete", text: "Não substitui o motor real da Winerim, que cruza carta, stock, POS, custo, histórico e regras de proteção." },
      { title: "O que descobre", text: "Se uma referência deve ser protegida, movida, não reposta ou revista antes de voltar a comprar." },
    ],
    ctaBadge: "Margens Winerim",
    ctaTitle: "Na Winerim isto não se calcula vinho a vinho: aparece como alerta.",
    ctaDescription: "A secção Margens deteta referências OK, não repor, liquidar ou críticas, com cobertura em meses, capital imobilizado, velocidade mensal, razão e confiança.",
    ctaDemo: "Ver Winerim numa demo",
    ctaDiagnostic: "Descarregar diagnóstico de margem",
    faqs: [
      { q: "Este sinal é igual ao da Winerim em produção?", a: "Não. É uma demo simplificada para entender a lógica. O motor real da Winerim usa mais contexto, histórico, regras de proteção e dados ligados." },
      { q: "O que significa não repor?", a: "Significa esgotar o stock atual antes de voltar a comprar, salvo se o vinho tiver uma função estratégica clara na carta." },
      { q: "Porque importa a cobertura em meses?", a: "Porque mostra quanto tempo demoraria a vender o stock atual ao ritmo de vendas recente. Coberturas muito altas costumam indicar capital imobilizado." },
    ],
    internalLinksTitle: "Continue a analisar a sua carta",
    internalLinks: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock morto", type: "tool" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Auditoria Pareto 80/20", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
};

const decisionTones: Record<Decision, string> = {
  ok: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  noreponer: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  liquidar: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  critico: "bg-red-500/10 text-red-700 border-red-500/30",
};

const getNumber = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const classifyDecision = (
  marginPct: number,
  stock: number,
  velocityMonthly: number,
  coverageMonths: number,
  daysSinceLastSale: number,
  isProtected: boolean,
): Decision => {
  if (isProtected && marginPct >= 0.45 && daysSinceLastSale < 180) return "ok";
  if (stock > 0 && velocityMonthly === 0 && daysSinceLastSale >= 180) return "critico";
  if (coverageMonths >= 18 || (daysSinceLastSale >= 150 && stock >= 6)) return "critico";
  if (coverageMonths >= 10 || daysSinceLastSale >= 120) return "liquidar";
  if (coverageMonths >= 6 || daysSinceLastSale >= 75 || marginPct < 0.5) return "noreponer";
  return "ok";
};

const classifyProfile = (decision: Decision, marginPct: number, velocityMonthly: number): Profile => {
  if (decision === "critico" || decision === "liquidar") return "lastre";
  if (velocityMonthly === 0) return "sin actividad";
  if (velocityMonthly >= 12 && marginPct >= 0.6) return "estrella";
  if (velocityMonthly >= 12) return "volumen";
  if (marginPct >= 0.65 && velocityMonthly >= 4) return "rentable";
  return "estable";
};

const SimuladorSenalMargenes = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;
  const [form, setForm] = useState({
    wine: t.defaultWine,
    pvp: "64",
    cost: "24",
    stock: "14",
    monthlySales: "2",
    daysSinceLastSale: "128",
    protectedWine: false,
  });

  const currency = useMemo(() => new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }), [t.locale]);
  const percent = useMemo(() => new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: 1 }), [t.locale]);
  const decimal = useMemo(() => new Intl.NumberFormat(t.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }), [t.locale]);
  const integer = useMemo(() => new Intl.NumberFormat(t.locale, { maximumFractionDigits: 0 }), [t.locale]);

  const result = useMemo(() => {
    const pvp = getNumber(form.pvp);
    const cost = getNumber(form.cost);
    const stock = getNumber(form.stock);
    const monthlySales = getNumber(form.monthlySales);
    const daysSinceLastSale = getNumber(form.daysSinceLastSale);
    const marginPct = pvp > 0 ? Math.max(0, (pvp - cost) / pvp) : 0;
    const grossMarginUnit = Math.max(0, pvp - cost);
    const capitalTied = stock * cost;
    const coverageMonths = monthlySales > 0 ? stock / monthlySales : stock > 0 ? 99 : 0;
    const decision = classifyDecision(marginPct, stock, monthlySales, coverageMonths, daysSinceLastSale, form.protectedWine);
    const profile = classifyProfile(decision, marginPct, monthlySales);
    const confidence: Confidence = monthlySales > 0 ? "media" : "baja";

    return { pvp, cost, stock, monthlySales, daysSinceLastSale, marginPct, grossMarginUnit, capitalTied, coverageMonths, decision, profile, confidence };
  }, [form]);

  const decision = t.decisionCopy[result.decision];
  const localizedLinkPath = (path: string) => {
    if (path.startsWith("/recursos/")) return `${localePath("/recursos")}/${path.replace("/recursos/", "")}`;
    if (path.startsWith("/decision-center/")) return `${localePath("/decision-center")}/${path.replace("/decision-center/", "")}`;
    return localePath(path);
  };

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const run = () => {
    trackAction("tool_use", "tool", "simulador-senal-margenes");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        url={`${CANONICAL_DOMAIN}${localePath("/herramientas/simulador-senal-margenes")}`}
        hreflang={allLangPaths("/herramientas/simulador-senal-margenes")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.breadTools, href: localePath("/herramientas") }, { label: t.breadSelf }]} />
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

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[0.92fr_1.08fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Wine size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{t.inputTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.inputHelper}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="wine">{t.wineLabel}</Label>
                  <Input id="wine" value={form.wine} onChange={(e) => update("wine", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pvp">{t.pvpLabel}</Label>
                  <Input id="pvp" inputMode="decimal" value={form.pvp} onChange={(e) => update("pvp", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">{t.costLabel}</Label>
                  <Input id="cost" inputMode="decimal" value={form.cost} onChange={(e) => update("cost", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{t.stockLabel}</Label>
                  <Input id="stock" inputMode="numeric" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">{t.monthlySalesLabel}</Label>
                  <Input id="sales" inputMode="decimal" value={form.monthlySales} onChange={(e) => update("monthlySales", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">{t.daysLabel}</Label>
                  <Input id="days" inputMode="numeric" value={form.daysSinceLastSale} onChange={(e) => update("daysSinceLastSale", e.target.value)} />
                </div>
                <label className="rounded-lg border border-border p-4 flex items-start gap-3 cursor-pointer hover:border-wine/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.protectedWine}
                    onChange={(e) => update("protectedWine", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-wine"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{t.protectedLabel}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{t.protectedHelper}</span>
                  </span>
                </label>
              </div>

              <Button onClick={run} className="mt-6 w-full bg-wine hover:bg-wine/90">
                {t.calculate}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{t.resultFor}</p>
                  <h2 className="font-heading text-2xl font-semibold">{form.wine || t.unnamedWine}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${decisionTones[result.decision]}`}>
                  {result.decision === "ok" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {decision.label}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: DollarSign, label: t.metrics.grossMarginUnit, value: currency.format(result.grossMarginUnit), helper: percent.format(result.marginPct) },
                  {
                    icon: BarChart3,
                    label: t.metrics.coverageEstimated,
                    value: result.coverageMonths >= 99 ? t.moreThan99Months : t.monthsValue(decimal.format(result.coverageMonths)),
                    helper: t.metrics.coverageHelper,
                  },
                  { icon: TrendingUp, label: t.metrics.monthlyVelocity, value: t.unitsValue(decimal.format(result.monthlySales)), helper: t.metrics.monthlyVelocityHelper },
                  { icon: Shield, label: t.metrics.capitalTied, value: currency.format(result.capitalTied), helper: t.metrics.bottlesInStock(integer.format(result.stock)) },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="rounded-lg border border-border bg-background/70 p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                        <Icon size={15} />
                        {metric.label}
                      </div>
                      <p className="text-2xl font-semibold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.helper}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-lg border border-border bg-background/70 p-5 mb-6">
                <h3 className="font-heading text-xl font-semibold mb-2">{t.recommendedAction}</h3>
                <p className="text-foreground font-medium">{decision.action}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{decision.reason}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.abcProfile}</p>
                  <p className="text-lg font-semibold mt-1">{t.profileLabels[result.profile]}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.demoConfidence}</p>
                  <p className="text-lg font-semibold mt-1">{t.confidenceLabels[result.confidence]}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.daysWithoutSale}</p>
                  <p className="text-lg font-semibold mt-1">{integer.format(result.daysSinceLastSale)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Info, ...t.infoCards[0] },
              { icon: AlertTriangle, ...t.infoCards[1] },
              { icon: BarChart3, ...t.infoCards[2] },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
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
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">{t.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/demo")}>{t.ctaDemo}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={`${localePath("/recursos")}/diagnostico-fuga-margen-carta-vinos`}>{t.ctaDiagnostic}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection schemaId="simulador-senal-margenes" faqs={t.faqs} />

        <InternalLinks
          title={t.internalLinksTitle}
          links={t.internalLinks.map((link) => ({ ...link, to: localizedLinkPath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorSenalMargenes;
