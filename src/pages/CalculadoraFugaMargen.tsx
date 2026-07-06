import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, DollarSign, ShieldAlert, TrendingUp, Wine } from "lucide-react";
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
import type { SupportedLang } from "@/i18n/types";

type Severity = "alta" | "media" | "baja";
type InternalLinkType = "guide" | "tool" | "resource" | "solution" | "decision-center";

interface MarginLeakCopy {
  locale: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumbTools: string;
  breadcrumbPage: string;
  heroEyebrow: string;
  h1: string;
  subtitle: string;
  defaultWine: string;
  formTitle: string;
  formDescription: string;
  labels: {
    wine: string;
    cost: string;
    pvp: string;
    target: string;
    sales: string;
    stock: string;
    glass: string;
    glasses: string;
  };
  calculateButton: string;
  resultFor: string;
  unnamedReference: string;
  severityBadge: Record<Severity, string>;
  resultMetrics: {
    annualLeak: { label: string; helperSuffix: string };
    targetPvp: { label: string; helperSuffix: string };
    currentMargin: { label: string; helperSuffix: string };
    glassMargin: { label: string; helperSuffix: string };
  };
  actionTitle: string;
  recommendations: Record<Severity, string>;
  capitalTiedPrefix: string;
  capitalTiedSuffix: string;
  summaryLabels: {
    unitLeak: string;
    cost: string;
    monthlySales: string;
  };
  insightCards: { title: string; text: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  internalLinksTitle: string;
  internalLinks: { to: string; label: string; type: InternalLinkType }[];
}

const PAGE_COPY: Record<SupportedLang, MarginLeakCopy> = {
  es: {
    locale: "es-ES",
    seoTitle: "Calculadora de fuga de margen en vinos",
    seoDescription: "Detecta cuánto margen puedes estar perdiendo por coste, PVP, copa, stock y objetivo de margen en una referencia de vino.",
    breadcrumbTools: "Herramientas",
    breadcrumbPage: "Calculadora de fuga de margen",
    heroEyebrow: "Demo · Margen y coste",
    h1: "Calculadora de fuga de margen",
    subtitle: "Calcula cuánto margen se escapa cuando el coste sube, el PVP no se actualiza, el vino por copa no recupera suficiente o el stock inmoviliza capital.",
    defaultWine: "Godello premium",
    formTitle: "Datos de margen",
    formDescription: "Puedes usar una referencia real o un caso aproximado.",
    labels: {
      wine: "Referencia",
      cost: "Coste compra (€)",
      pvp: "PVP carta (€)",
      target: "Margen objetivo (%)",
      sales: "Botellas vendidas/mes",
      stock: "Stock actual",
      glass: "Precio por copa (€)",
      glasses: "Copas por botella",
    },
    calculateButton: "Calcular fuga",
    resultFor: "Resultado para",
    unnamedReference: "Referencia sin nombre",
    severityBadge: {
      alta: "Fuga alta",
      media: "Fuga media",
      baja: "Fuga baja",
    },
    resultMetrics: {
      annualLeak: { label: "Fuga anual estimada", helperSuffix: "al mes" },
      targetPvp: { label: "PVP recomendado", helperSuffix: "objetivo" },
      currentMargin: { label: "Margen actual", helperSuffix: "por botella" },
      glassMargin: { label: "Margen por copa", helperSuffix: "por botella servida" },
    },
    actionTitle: "Acción recomendada",
    recommendations: {
      alta: "Revisar PVP y compra antes de reponer",
      media: "Ajustar PVP, copa o negociación con distribuidor",
      baja: "Mantener y monitorizar coste",
    },
    capitalTiedPrefix: "Capital inmovilizado estimado:",
    capitalTiedSuffix: "Si el coste real ha cambiado y el PVP no, la fuga se acumula cada mes.",
    summaryLabels: {
      unitLeak: "Fuga unidad",
      cost: "Coste",
      monthlySales: "Botellas/mes",
    },
    insightCards: [
      { title: "Coste real", text: "Si el coste cambia por albarán o factura y el PVP no se actualiza, el margen se erosiona sin avisar." },
      { title: "Copa", text: "El vino por copa puede vender mucho y aun así perder rentabilidad si no recupera botella, merma y servicio." },
      { title: "Stock", text: "Una referencia con margen correcto puede ser mala compra si acumula stock y baja velocidad." },
    ],
    ctaEyebrow: "Margen siempre vivo",
    ctaTitle: "Winerim detecta fugas antes de que se conviertan en compras malas.",
    ctaDescription: "Al conectar carta, costes, TPV, stock y distribuidores, Winerim puede señalar qué referencias revisar, no reponer o mover por copa.",
    ctaPrimary: "Descargar diagnóstico de fuga",
    ctaSecondary: "Probar señal de Márgenes",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué es una fuga de margen?",
        a: "Es margen que se pierde porque el coste, el PVP, la copa o la compra no están alineados con el objetivo económico de la carta.",
      },
      {
        q: "¿Subir el PVP es siempre la solución?",
        a: "No. A veces conviene renegociar con el distribuidor, cambiar formato, mover por copa, proteger el vino o dejar de reponerlo.",
      },
      {
        q: "¿La calculadora sustituye a un análisis real?",
        a: "No. Es una demo rápida. Winerim usa datos conectados y señales continuas para detectar fugas con más precisión.",
      },
    ],
    internalLinksTitle: "Herramientas relacionadas",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist albaranes y facturas", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
  en: {
    locale: "en-GB",
    seoTitle: "Wine margin leakage calculator",
    seoDescription: "Detect how much margin you may be losing through cost, menu price, by-the-glass service, stock and target margin on a wine reference.",
    breadcrumbTools: "Tools",
    breadcrumbPage: "Margin leakage calculator",
    heroEyebrow: "Demo · Margin and cost",
    h1: "Margin leakage calculator",
    subtitle: "Calculate how much margin slips away when cost rises, the menu price is not updated, wine by the glass does not recover enough, or stock ties up capital.",
    defaultWine: "Premium Godello",
    formTitle: "Margin data",
    formDescription: "Use a real reference or an approximate case.",
    labels: {
      wine: "Wine reference",
      cost: "Purchase cost (€)",
      pvp: "Menu price (€)",
      target: "Target margin (%)",
      sales: "Bottles sold/month",
      stock: "Current stock",
      glass: "Price per glass (€)",
      glasses: "Glasses per bottle",
    },
    calculateButton: "Calculate leakage",
    resultFor: "Result for",
    unnamedReference: "Unnamed reference",
    severityBadge: {
      alta: "High leakage",
      media: "Medium leakage",
      baja: "Low leakage",
    },
    resultMetrics: {
      annualLeak: { label: "Estimated annual leakage", helperSuffix: "per month" },
      targetPvp: { label: "Recommended menu price", helperSuffix: "target" },
      currentMargin: { label: "Current margin", helperSuffix: "per bottle" },
      glassMargin: { label: "By-the-glass margin", helperSuffix: "per served bottle" },
    },
    actionTitle: "Recommended action",
    recommendations: {
      alta: "Review menu price and purchasing before replenishing",
      media: "Adjust price, by-the-glass strategy, or distributor terms",
      baja: "Keep it and monitor cost",
    },
    capitalTiedPrefix: "Estimated capital tied up:",
    capitalTiedSuffix: "If real cost has changed and the menu price has not, leakage compounds every month.",
    summaryLabels: {
      unitLeak: "Unit leakage",
      cost: "Cost",
      monthlySales: "Bottles/month",
    },
    insightCards: [
      { title: "Real cost", text: "If cost changes through delivery notes or invoices and the menu price is not updated, margin erodes quietly." },
      { title: "By the glass", text: "Wine by the glass can sell strongly and still lose profitability if it does not recover bottle cost, waste and service." },
      { title: "Stock", text: "A reference with the right margin can still be a poor buy if it builds up stock and moves too slowly." },
    ],
    ctaEyebrow: "Always-live margin",
    ctaTitle: "Winerim detects leaks before they become bad purchases.",
    ctaDescription: "By connecting wine list, costs, POS, stock and distributors, Winerim can flag which references to review, stop replenishing or move by the glass.",
    ctaPrimary: "Download leakage diagnostic",
    ctaSecondary: "Try Margin signal",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "What is margin leakage?",
        a: "It is margin lost because cost, menu price, by-the-glass service or purchasing are not aligned with the wine list's economic target.",
      },
      {
        q: "Is raising the menu price always the answer?",
        a: "No. Sometimes it is better to renegotiate with the distributor, change format, move the wine by the glass, protect it or stop replenishing it.",
      },
      {
        q: "Does this calculator replace a real analysis?",
        a: "No. It is a quick demo. Winerim uses connected data and continuous signals to detect leakage more accurately.",
      },
    ],
    internalLinksTitle: "Related tools",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Margin signal simulator", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Pareto 80/20 simulator", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Delivery note and invoice checklist", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
  it: {
    locale: "it-IT",
    seoTitle: "Calcolatrice della fuga di margine sui vini",
    seoDescription: "Individua quanto margine puoi perdere per costo, prezzo in carta, vino al calice, stock e obiettivo di margine su una referenza vino.",
    breadcrumbTools: "Strumenti",
    breadcrumbPage: "Calcolatrice fuga di margine",
    heroEyebrow: "Demo · Margine e costo",
    h1: "Calcolatrice della fuga di margine",
    subtitle: "Calcola quanto margine sfugge quando il costo aumenta, il prezzo in carta non viene aggiornato, il vino al calice non recupera abbastanza o lo stock immobilizza capitale.",
    defaultWine: "Godello premium",
    formTitle: "Dati di margine",
    formDescription: "Puoi usare una referenza reale o un caso approssimativo.",
    labels: {
      wine: "Referenza",
      cost: "Costo di acquisto (€)",
      pvp: "Prezzo in carta (€)",
      target: "Margine obiettivo (%)",
      sales: "Bottiglie vendute/mese",
      stock: "Stock attuale",
      glass: "Prezzo al calice (€)",
      glasses: "Calici per bottiglia",
    },
    calculateButton: "Calcola la fuga",
    resultFor: "Risultato per",
    unnamedReference: "Referenza senza nome",
    severityBadge: {
      alta: "Fuga alta",
      media: "Fuga media",
      baja: "Fuga bassa",
    },
    resultMetrics: {
      annualLeak: { label: "Fuga annua stimata", helperSuffix: "al mese" },
      targetPvp: { label: "Prezzo consigliato", helperSuffix: "obiettivo" },
      currentMargin: { label: "Margine attuale", helperSuffix: "per bottiglia" },
      glassMargin: { label: "Margine al calice", helperSuffix: "per bottiglia servita" },
    },
    actionTitle: "Azione consigliata",
    recommendations: {
      alta: "Rivedere prezzo in carta e acquisto prima del riordino",
      media: "Adeguare prezzo, calice o negoziazione con il distributore",
      baja: "Mantenere e monitorare il costo",
    },
    capitalTiedPrefix: "Capitale immobilizzato stimato:",
    capitalTiedSuffix: "Se il costo reale è cambiato e il prezzo in carta no, la fuga si accumula ogni mese.",
    summaryLabels: {
      unitLeak: "Fuga unitaria",
      cost: "Costo",
      monthlySales: "Bottiglie/mese",
    },
    insightCards: [
      { title: "Costo reale", text: "Se il costo cambia in bolla o fattura e il prezzo in carta non viene aggiornato, il margine si erode senza avvisi." },
      { title: "Calice", text: "Il vino al calice può vendere molto e comunque perdere redditività se non recupera bottiglia, sprechi e servizio." },
      { title: "Stock", text: "Una referenza con margine corretto può essere un cattivo acquisto se accumula stock e ruota lentamente." },
    ],
    ctaEyebrow: "Margine sempre vivo",
    ctaTitle: "Winerim rileva le fughe prima che diventino cattivi acquisti.",
    ctaDescription: "Collegando carta, costi, POS, stock e distributori, Winerim può indicare quali referenze rivedere, non riordinare o spostare al calice.",
    ctaPrimary: "Scarica la diagnosi fuga",
    ctaSecondary: "Prova il segnale Margini",
    faqTitle: "Domande frequenti",
    faqs: [
      {
        q: "Che cos'è una fuga di margine?",
        a: "È il margine che si perde perché costo, prezzo in carta, calice o acquisto non sono allineati all'obiettivo economico della carta.",
      },
      {
        q: "Aumentare il prezzo è sempre la soluzione?",
        a: "No. A volte conviene rinegoziare con il distributore, cambiare formato, spostare al calice, proteggere il vino o smettere di riordinarlo.",
      },
      {
        q: "La calcolatrice sostituisce un'analisi reale?",
        a: "No. È una demo rapida. Winerim usa dati collegati e segnali continui per rilevare le fughe con maggiore precisione.",
      },
    ],
    internalLinksTitle: "Strumenti correlati",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Simulatore segnale Margini", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulatore Pareto 80/20", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist bolle e fatture", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
  fr: {
    locale: "fr-FR",
    seoTitle: "Calculateur de fuite de marge sur les vins",
    seoDescription: "Détectez la marge que vous pouvez perdre à cause du coût, du prix carte, du verre, du stock et de l'objectif de marge d'une référence vin.",
    breadcrumbTools: "Outils",
    breadcrumbPage: "Calculateur de fuite de marge",
    heroEyebrow: "Démo · Marge et coût",
    h1: "Calculateur de fuite de marge",
    subtitle: "Calculez la marge qui s'échappe quand le coût augmente, que le prix carte n'est pas mis à jour, que le vin au verre ne récupère pas assez ou que le stock immobilise du capital.",
    defaultWine: "Godello premium",
    formTitle: "Données de marge",
    formDescription: "Vous pouvez utiliser une référence réelle ou un cas approximatif.",
    labels: {
      wine: "Référence",
      cost: "Coût d'achat (€)",
      pvp: "Prix carte (€)",
      target: "Marge cible (%)",
      sales: "Bouteilles vendues/mois",
      stock: "Stock actuel",
      glass: "Prix au verre (€)",
      glasses: "Verres par bouteille",
    },
    calculateButton: "Calculer la fuite",
    resultFor: "Résultat pour",
    unnamedReference: "Référence sans nom",
    severityBadge: {
      alta: "Fuite élevée",
      media: "Fuite modérée",
      baja: "Fuite faible",
    },
    resultMetrics: {
      annualLeak: { label: "Fuite annuelle estimée", helperSuffix: "par mois" },
      targetPvp: { label: "Prix conseillé", helperSuffix: "cible" },
      currentMargin: { label: "Marge actuelle", helperSuffix: "par bouteille" },
      glassMargin: { label: "Marge au verre", helperSuffix: "par bouteille servie" },
    },
    actionTitle: "Action recommandée",
    recommendations: {
      alta: "Revoir le prix carte et l'achat avant de réapprovisionner",
      media: "Ajuster le prix, le verre ou la négociation avec le distributeur",
      baja: "Maintenir et surveiller le coût",
    },
    capitalTiedPrefix: "Capital immobilisé estimé :",
    capitalTiedSuffix: "Si le coût réel a changé et pas le prix carte, la fuite s'accumule chaque mois.",
    summaryLabels: {
      unitLeak: "Fuite unitaire",
      cost: "Coût",
      monthlySales: "Bouteilles/mois",
    },
    insightCards: [
      { title: "Coût réel", text: "Si le coût change via bon de livraison ou facture et que le prix carte n'est pas actualisé, la marge s'érode sans alerte." },
      { title: "Verre", text: "Le vin au verre peut beaucoup se vendre et perdre malgré tout en rentabilité s'il ne couvre pas bouteille, pertes et service." },
      { title: "Stock", text: "Une référence avec une marge correcte peut être un mauvais achat si elle accumule du stock et tourne lentement." },
    ],
    ctaEyebrow: "Marge toujours vivante",
    ctaTitle: "Winerim détecte les fuites avant qu'elles ne deviennent de mauvais achats.",
    ctaDescription: "En connectant carte, coûts, caisse, stock et distributeurs, Winerim peut signaler les références à revoir, à ne plus réapprovisionner ou à passer au verre.",
    ctaPrimary: "Télécharger le diagnostic de fuite",
    ctaSecondary: "Tester le signal Marges",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Qu'est-ce qu'une fuite de marge ?",
        a: "C'est la marge perdue parce que le coût, le prix carte, le verre ou l'achat ne sont pas alignés avec l'objectif économique de la carte.",
      },
      {
        q: "Augmenter le prix carte est-il toujours la solution ?",
        a: "Non. Il peut être préférable de renégocier avec le distributeur, changer de format, passer au verre, protéger le vin ou arrêter de le réapprovisionner.",
      },
      {
        q: "Le calculateur remplace-t-il une analyse réelle ?",
        a: "Non. C'est une démo rapide. Winerim utilise des données connectées et des signaux continus pour détecter les fuites avec plus de précision.",
      },
    ],
    internalLinksTitle: "Outils associés",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Simulateur de signal Marges", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulateur Pareto 80/20", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist bons de livraison et factures", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
  de: {
    locale: "de-DE",
    seoTitle: "Rechner für Margenverluste bei Wein",
    seoDescription: "Erkennen Sie, wie viel Marge durch Einkaufskosten, Kartenpreis, offenen Ausschank, Bestand und Zielmarge einer Weinreferenz verloren gehen kann.",
    breadcrumbTools: "Werkzeuge",
    breadcrumbPage: "Rechner für Margenverluste",
    heroEyebrow: "Demo · Marge und Kosten",
    h1: "Rechner für Margenverluste",
    subtitle: "Berechnen Sie, wie viel Marge verloren geht, wenn Kosten steigen, der Kartenpreis nicht aktualisiert wird, Wein im offenen Ausschank zu wenig deckt oder Bestand Kapital bindet.",
    defaultWine: "Premium-Godello",
    formTitle: "Margendaten",
    formDescription: "Sie können eine echte Referenz oder einen groben Fall verwenden.",
    labels: {
      wine: "Referenz",
      cost: "Einkaufskosten (€)",
      pvp: "Kartenpreis (€)",
      target: "Zielmarge (%)",
      sales: "Verkaufte Flaschen/Monat",
      stock: "Aktueller Bestand",
      glass: "Preis pro Glas (€)",
      glasses: "Gläser pro Flasche",
    },
    calculateButton: "Verlust berechnen",
    resultFor: "Ergebnis für",
    unnamedReference: "Unbenannte Referenz",
    severityBadge: {
      alta: "Hoher Margenverlust",
      media: "Mittlerer Margenverlust",
      baja: "Niedriger Margenverlust",
    },
    resultMetrics: {
      annualLeak: { label: "Geschätzter Jahresverlust", helperSuffix: "pro Monat" },
      targetPvp: { label: "Empfohlener Kartenpreis", helperSuffix: "Ziel" },
      currentMargin: { label: "Aktuelle Marge", helperSuffix: "pro Flasche" },
      glassMargin: { label: "Marge pro Glas", helperSuffix: "pro ausgeschenkter Flasche" },
    },
    actionTitle: "Empfohlene Aktion",
    recommendations: {
      alta: "Kartenpreis und Einkauf vor dem Nachbestellen prüfen",
      media: "Preis, Glasstrategie oder Konditionen mit dem Distributor anpassen",
      baja: "Beibehalten und Kosten überwachen",
    },
    capitalTiedPrefix: "Geschätztes gebundenes Kapital:",
    capitalTiedSuffix: "Wenn sich die realen Kosten geändert haben und der Kartenpreis nicht, wächst der Verlust jeden Monat.",
    summaryLabels: {
      unitLeak: "Verlust pro Einheit",
      cost: "Kosten",
      monthlySales: "Flaschen/Monat",
    },
    insightCards: [
      { title: "Reale Kosten", text: "Wenn sich Kosten über Lieferschein oder Rechnung ändern und der Kartenpreis nicht aktualisiert wird, erodiert die Marge unbemerkt." },
      { title: "Offener Ausschank", text: "Wein im offenen Ausschank kann sich gut verkaufen und dennoch Rendite verlieren, wenn Flasche, Schwund und Service nicht gedeckt sind." },
      { title: "Bestand", text: "Eine Referenz mit korrekter Marge kann ein schlechter Einkauf sein, wenn sie Bestand aufbaut und sich langsam dreht." },
    ],
    ctaEyebrow: "Marge in Echtzeit",
    ctaTitle: "Winerim erkennt Verluste, bevor daraus schlechte Einkäufe werden.",
    ctaDescription: "Durch die Verbindung von Weinkarte, Kosten, POS, Bestand und Distributoren kann Winerim zeigen, welche Referenzen geprüft, nicht nachbestellt oder ins Glasprogramm verschoben werden sollten.",
    ctaPrimary: "Verlustdiagnose herunterladen",
    ctaSecondary: "Margensignal testen",
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Was ist ein Margenverlust?",
        a: "Das ist Marge, die verloren geht, weil Kosten, Kartenpreis, offener Ausschank oder Einkauf nicht zum wirtschaftlichen Ziel der Weinkarte passen.",
      },
      {
        q: "Ist ein höherer Kartenpreis immer die Lösung?",
        a: "Nein. Manchmal ist es besser, mit dem Distributor neu zu verhandeln, das Format zu ändern, den Wein glasweise anzubieten, ihn zu schützen oder nicht mehr nachzubestellen.",
      },
      {
        q: "Ersetzt der Rechner eine echte Analyse?",
        a: "Nein. Er ist eine schnelle Demo. Winerim nutzt verbundene Daten und kontinuierliche Signale, um Verluste genauer zu erkennen.",
      },
    ],
    internalLinksTitle: "Verwandte Werkzeuge",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Simulator für Margensignale", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Pareto-80/20-Simulator", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checkliste für Lieferscheine und Rechnungen", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
  pt: {
    locale: "pt-PT",
    seoTitle: "Calculadora de fuga de margem em vinhos",
    seoDescription: "Detete quanta margem pode estar a perder por custo, preço de carta, vinho a copo, stock e objetivo de margem numa referência de vinho.",
    breadcrumbTools: "Ferramentas",
    breadcrumbPage: "Calculadora de fuga de margem",
    heroEyebrow: "Demo · Margem e custo",
    h1: "Calculadora de fuga de margem",
    subtitle: "Calcule quanta margem se perde quando o custo sobe, o preço de carta não é atualizado, o vinho a copo não recupera o suficiente ou o stock imobiliza capital.",
    defaultWine: "Godello premium",
    formTitle: "Dados de margem",
    formDescription: "Pode usar uma referência real ou um caso aproximado.",
    labels: {
      wine: "Referência",
      cost: "Custo de compra (€)",
      pvp: "Preço de carta (€)",
      target: "Margem objetivo (%)",
      sales: "Garrafas vendidas/mês",
      stock: "Stock atual",
      glass: "Preço por copo (€)",
      glasses: "Copos por garrafa",
    },
    calculateButton: "Calcular fuga",
    resultFor: "Resultado para",
    unnamedReference: "Referência sem nome",
    severityBadge: {
      alta: "Fuga alta",
      media: "Fuga média",
      baja: "Fuga baixa",
    },
    resultMetrics: {
      annualLeak: { label: "Fuga anual estimada", helperSuffix: "por mês" },
      targetPvp: { label: "Preço recomendado", helperSuffix: "objetivo" },
      currentMargin: { label: "Margem atual", helperSuffix: "por garrafa" },
      glassMargin: { label: "Margem por copo", helperSuffix: "por garrafa servida" },
    },
    actionTitle: "Ação recomendada",
    recommendations: {
      alta: "Rever preço de carta e compra antes de repor",
      media: "Ajustar preço, copo ou negociação com o distribuidor",
      baja: "Manter e monitorizar o custo",
    },
    capitalTiedPrefix: "Capital imobilizado estimado:",
    capitalTiedSuffix: "Se o custo real mudou e o preço de carta não, a fuga acumula-se todos os meses.",
    summaryLabels: {
      unitLeak: "Fuga unitária",
      cost: "Custo",
      monthlySales: "Garrafas/mês",
    },
    insightCards: [
      { title: "Custo real", text: "Se o custo muda por guia ou fatura e o preço de carta não é atualizado, a margem corrói-se sem aviso." },
      { title: "Copo", text: "O vinho a copo pode vender muito e ainda assim perder rentabilidade se não recuperar garrafa, quebra e serviço." },
      { title: "Stock", text: "Uma referência com margem correta pode ser uma má compra se acumular stock e tiver baixa rotação." },
    ],
    ctaEyebrow: "Margem sempre viva",
    ctaTitle: "Winerim deteta fugas antes de se tornarem más compras.",
    ctaDescription: "Ao ligar carta, custos, POS, stock e distribuidores, Winerim pode assinalar que referências rever, não repor ou mover para vinho a copo.",
    ctaPrimary: "Descarregar diagnóstico de fuga",
    ctaSecondary: "Testar sinal de Margens",
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "O que é uma fuga de margem?",
        a: "É margem perdida porque custo, preço de carta, copo ou compra não estão alinhados com o objetivo económico da carta.",
      },
      {
        q: "Aumentar o preço de carta é sempre a solução?",
        a: "Não. Por vezes convém renegociar com o distribuidor, mudar formato, mover para copo, proteger o vinho ou deixar de o repor.",
      },
      {
        q: "A calculadora substitui uma análise real?",
        a: "Não. É uma demo rápida. Winerim usa dados ligados e sinais contínuos para detetar fugas com mais precisão.",
      },
    ],
    internalLinksTitle: "Ferramentas relacionadas",
    internalLinks: [
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de sinal de Margens", type: "tool" },
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist de guias e faturas", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    ],
  },
};

const DEFAULT_WINE_NAMES = Object.values(PAGE_COPY).map((copy) => copy.defaultWine);

const valueOf = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const CalculadoraFugaMargen = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const copy = PAGE_COPY[lang] || PAGE_COPY.es;
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-fuga-margen")}`;

  const euroFormatter = useMemo(
    () => new Intl.NumberFormat(copy.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
    [copy.locale]
  );
  const percentFormatter = useMemo(
    () => new Intl.NumberFormat(copy.locale, { style: "percent", maximumFractionDigits: 1 }),
    [copy.locale]
  );

  const [form, setForm] = useState({
    wine: copy.defaultWine,
    cost: "13.50",
    pvp: "38",
    targetMargin: "62",
    monthlySales: "18",
    stock: "24",
    glassPrice: "8",
    glassesPerBottle: "5",
  });

  useEffect(() => {
    setForm((current) => {
      if (current.wine === copy.defaultWine || !DEFAULT_WINE_NAMES.includes(current.wine)) return current;
      return { ...current, wine: copy.defaultWine };
    });
  }, [copy.defaultWine]);

  const result = useMemo(() => {
    const cost = valueOf(form.cost);
    const pvp = valueOf(form.pvp);
    const targetMargin = valueOf(form.targetMargin) / 100;
    const monthlySales = valueOf(form.monthlySales);
    const stock = valueOf(form.stock);
    const glassPrice = valueOf(form.glassPrice);
    const glassesPerBottle = valueOf(form.glassesPerBottle);

    const currentMargin = pvp > 0 ? (pvp - cost) / pvp : 0;
    const targetPvp = targetMargin < 1 ? cost / (1 - targetMargin) : pvp;
    const unitLeak = Math.max(0, targetPvp - pvp);
    const monthlyLeak = unitLeak * monthlySales;
    const annualLeak = monthlyLeak * 12;
    const glassRevenue = glassPrice * glassesPerBottle;
    const glassMargin = glassRevenue > 0 ? (glassRevenue - cost) / glassRevenue : 0;
    const capitalTied = cost * stock;
    const severity: Severity = annualLeak > 2500 || currentMargin < 0.45 ? "alta" : annualLeak > 900 || currentMargin < 0.55 ? "media" : "baja";

    return {
      cost,
      pvp,
      targetPvp,
      currentMargin,
      targetMargin,
      monthlySales,
      stock,
      glassRevenue,
      glassMargin,
      capitalTied,
      unitLeak,
      monthlyLeak,
      annualLeak,
      severity,
    };
  }, [form]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const metrics = [
    {
      icon: DollarSign,
      label: copy.resultMetrics.annualLeak.label,
      value: euroFormatter.format(result.annualLeak),
      helper: `${euroFormatter.format(result.monthlyLeak)} ${copy.resultMetrics.annualLeak.helperSuffix}`,
    },
    {
      icon: TrendingUp,
      label: copy.resultMetrics.targetPvp.label,
      value: euroFormatter.format(result.targetPvp),
      helper: `${percentFormatter.format(result.targetMargin)} ${copy.resultMetrics.targetPvp.helperSuffix}`,
    },
    {
      icon: BarChart3,
      label: copy.resultMetrics.currentMargin.label,
      value: percentFormatter.format(result.currentMargin),
      helper: `${euroFormatter.format(result.pvp - result.cost)} ${copy.resultMetrics.currentMargin.helperSuffix}`,
    },
    {
      icon: Wine,
      label: copy.resultMetrics.glassMargin.label,
      value: percentFormatter.format(result.glassMargin),
      helper: `${euroFormatter.format(result.glassRevenue)} ${copy.resultMetrics.glassMargin.helperSuffix}`,
    },
  ];
  const cardIcons = [DollarSign, Wine, ShieldAlert];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/calculadora-fuga-margen")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: copy.breadcrumbTools, href: localePath("/herramientas") }, { label: copy.breadcrumbPage }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {copy.heroEyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {copy.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {copy.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <ShieldAlert size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{copy.formTitle}</h2>
                  <p className="text-sm text-muted-foreground">{copy.formDescription}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="wine">{copy.labels.wine}</Label>
                  <Input id="wine" value={form.wine} onChange={(e) => update("wine", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">{copy.labels.cost}</Label>
                  <Input id="cost" inputMode="decimal" value={form.cost} onChange={(e) => update("cost", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pvp">{copy.labels.pvp}</Label>
                  <Input id="pvp" inputMode="decimal" value={form.pvp} onChange={(e) => update("pvp", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">{copy.labels.target}</Label>
                  <Input id="target" inputMode="decimal" value={form.targetMargin} onChange={(e) => update("targetMargin", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">{copy.labels.sales}</Label>
                  <Input id="sales" inputMode="decimal" value={form.monthlySales} onChange={(e) => update("monthlySales", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{copy.labels.stock}</Label>
                  <Input id="stock" inputMode="decimal" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glass">{copy.labels.glass}</Label>
                  <Input id="glass" inputMode="decimal" value={form.glassPrice} onChange={(e) => update("glassPrice", e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="glasses">{copy.labels.glasses}</Label>
                  <Input id="glasses" inputMode="decimal" value={form.glassesPerBottle} onChange={(e) => update("glassesPerBottle", e.target.value)} />
                </div>
              </div>

              <Button
                className="mt-6 w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "calculadora-fuga-margen")}
              >
                {copy.calculateButton}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{copy.resultFor}</p>
                  <h2 className="font-heading text-2xl font-semibold">{form.wine || copy.unnamedReference}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                  result.severity === "alta"
                    ? "border-red-500/30 bg-red-500/10 text-red-700"
                    : result.severity === "media"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-700"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                }`}>
                  {result.severity === "baja" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {copy.severityBadge[result.severity]}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {metrics.map((metric) => {
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
                <h3 className="font-heading text-xl font-semibold mb-2">{copy.actionTitle}</h3>
                <p className="text-foreground font-medium">{copy.recommendations[result.severity]}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {copy.capitalTiedPrefix} {euroFormatter.format(result.capitalTied)}. {copy.capitalTiedSuffix}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.summaryLabels.unitLeak}</p>
                  <p className="text-lg font-semibold mt-1">{euroFormatter.format(result.unitLeak)}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.summaryLabels.cost}</p>
                  <p className="text-lg font-semibold mt-1">{euroFormatter.format(result.cost)}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.summaryLabels.monthlySales}</p>
                  <p className="text-lg font-semibold mt-1">{result.monthlySales.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {copy.insightCards.map((item, index) => {
              const Icon = cardIcons[index] || ShieldAlert;
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
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{copy.ctaEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{copy.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/diagnostico-fuga-margen-carta-vinos")}>{copy.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/herramientas/simulador-senal-margenes")}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="calculadora-fuga-margen"
          title={copy.faqTitle}
          faqs={copy.faqs}
        />

        <InternalLinks
          title={copy.internalLinksTitle}
          links={copy.internalLinks.map((link) => ({
            ...link,
            to: localePath(link.to),
          }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CalculadoraFugaMargen;
