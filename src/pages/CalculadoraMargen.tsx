import { useState, useEffect, useMemo, useRef } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Calculator, Wine, TrendingUp, Info,
  BarChart3, ShieldAlert, Sparkles, Target, AlertTriangle, Check,
  Building2, GlassWater, Gauge, DollarSign, Percent, ArrowUpDown,
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Types ─── */
type LinkType = "guide" | "resource" | "solution" | "tool" | "decision-center";
type WineCat = "still" | "sparkling" | "champagne" | "dessert" | "fortified";
type RestCtx = "casual" | "gastro" | "hotel" | "winebar";

interface CatI18n { id: WineCat; label: string; icon: string }
interface CtxI18n { id: RestCtx; label: string; icon: string }

interface LangContent {
  seoTitle: string; seoDesc: string;
  breadTools: string; breadCalc: string;
  demoBadge: string; h1a: string; h1b: string; subtitle: string;
  demoTitle: string; demoDesc: string;
  wineCategories: CatI18n[];
  restaurantContexts: CtxI18n[];
  decides: string[]; avoids: string[]; impact: string[];
  inputTitle: string; wineCatLabel: string; contextLabel: string; contextHint: string;
  costLabel: string; costUnit: string; costMin: string; costMax: string;
  currentPriceLabel: string; currentPriceOpt: string; currentPricePlaceholder: string;
  glassesLabel: string; glassesUnit: string;
  ticketLabel: string; ticketHint: string; ticketUnit: string;
  multLabel: string; baseMult: string; contextAdj: string; ticketAdj: string; finalMult: string;
  resultsTitle: string; resultsSummary: string;
  metricCost: string; metricPvpCurrent: string; metricPvpRec: string; metricDeviation: string;
  metricMarginAbs: string; metricMarginPct: string; metricBcPct: string;
  metricGlassPrice: string; metricCostPerGlass: string; metricBreakeven: string;
  bcLabel: string; bcGood: string; bcWarning: string; bcDanger: string;
  compareLabel: string; yourPrice: string; recommended: string; yourMargin: string;
  deviationLabel: string;
  execTitle: string;
  pricingGuide: string; pricingTitle: string; pricingTitleHighlight: string;
  multMethodTitle: string; multMethodDesc: string;
  ranges: { range: string; mult: string; note: string }[];
  glassRuleTitle: string; glassRuleDesc: string;
  errorsTitle: string; errors: string[];
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string;
  ctaPrimary: string; ctaSecondary: string;
  internalLinks: { to: string; label: string; type: LinkType }[];
}

/* ─── Interpolation-based multiplier engine ─── */

// Breakpoints: [cost, multiplier] — use midpoints of conceptual ranges for smooth curves
const BREAKPOINTS: Record<WineCat, [number, number][]> = {
  still:     [[2, 3.8], [5, 3.5], [10, 3.0], [14, 2.8], [25, 2.3], [35, 2.2], [60, 1.8], [100, 1.6]],
  sparkling: [[2, 3.5], [5, 3.2], [10, 2.8], [14, 2.6], [25, 2.1], [35, 2.0], [60, 1.7], [100, 1.5]],
  champagne: [[2, 3.0], [5, 2.8], [10, 2.5], [14, 2.3], [25, 2.0], [35, 1.9], [60, 1.5], [100, 1.3]],
  dessert:   [[2, 4.2], [5, 3.8], [10, 3.2], [14, 3.0], [25, 2.5], [35, 2.4], [60, 2.0], [100, 1.8]],
  fortified: [[2, 4.0], [5, 3.6], [10, 3.1], [14, 2.9], [25, 2.4], [35, 2.3], [60, 1.9], [100, 1.7]],
};

/** Piecewise linear interpolation — zero jumps */
const interpolateMultiplier = (cat: WineCat, cost: number): number => {
  const pts = BREAKPOINTS[cat];
  if (cost <= pts[0][0]) return pts[0][1];
  if (cost >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (cost >= x0 && cost <= x1) {
      const t = (cost - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return pts[pts.length - 1][1];
};

/** Context adjustment (CADJ) */
const CONTEXT_ADJ: Record<RestCtx, number> = {
  casual: 0,
  gastro: -0.15,
  hotel: +0.20,
  winebar: -0.10,
};

/** Ticket-Adjusted modifier (TADJ): higher avg ticket → softer multiplier on expensive wines */
const ticketAdjust = (cost: number, avgTicket: number): number => {
  // Only kicks in for mid-premium+ wines in high-ticket contexts
  if (avgTicket <= 40 || cost < 10) return 0;
  // Scale: at ticket=80 and cost=50, adj = -0.20; at ticket=120 and cost=80, adj = -0.35
  const ticketFactor = Math.min((avgTicket - 40) / 80, 1); // 0..1
  const costFactor = Math.min((cost - 10) / 60, 1);         // 0..1
  return -(ticketFactor * costFactor * 0.35);
};

/** Full engine: interpolation + CADJ + TADJ */
const computeMultiplier = (cat: WineCat, cost: number, ctx: RestCtx, avgTicket: number) => {
  const base = interpolateMultiplier(cat, cost);
  const cadj = CONTEXT_ADJ[ctx];
  const tadj = ticketAdjust(cost, avgTicket);
  const final = Math.max(1.2, base + cadj + tadj);
  return { base: Math.round(base * 100) / 100, cadj, tadj: Math.round(tadj * 100) / 100, final: Math.round(final * 100) / 100 };
};

/** Detect conceptual range for display */
const detectRangeLabel = (cost: number): string => {
  if (cost < 8) return "entry";
  if (cost < 20) return "mid";
  if (cost < 50) return "premium";
  return "icon";
};

/* ─── BC% thresholds ─── */
const bcHealth = (bc: number): "good" | "warning" | "danger" => {
  if (bc <= 28) return "good";
  if (bc <= 35) return "warning";
  return "danger";
};

/* ─── i18n (ES base — others follow same structure) ─── */
const i18n: Record<string, LangContent> = {
  es: {
    seoTitle: "Calculadora de Margen del Vino para Restaurantes | Demo Winerim Core",
    seoDesc: "Calcula el precio de venta y el margen de cada botella y copa de vino en tu restaurante. Demo del motor de pricing de Winerim Core.",
    breadTools: "Herramientas", breadCalc: "Calculadora de margen",
    demoBadge: "Demo · Winerim Core",
    h1a: "Calculadora de margen del vino para", h1b: "restaurantes",
    subtitle: "Descubre cuánto deberías cobrar por cada botella y copa para mantener un margen rentable — según tipo de vino, gama y contexto del restaurante.",
    demoTitle: "Demo del motor de pricing y rentabilidad de Winerim Core",
    demoDesc: "Esta herramienta aplica interpolación continua entre rangos de precio, ajuste por contexto de restaurante (CADJ) y ajuste por ticket medio (TADJ) — una versión simplificada de cómo Winerim calibra el pricing con datos reales.",
    wineCategories: [
      { id: "still", label: "Tranquilo", icon: "🍷" },
      { id: "sparkling", label: "Espumoso", icon: "🥂" },
      { id: "champagne", label: "Champagne", icon: "🍾" },
      { id: "dessert", label: "Postre / Dulce", icon: "🍯" },
      { id: "fortified", label: "Fortificado", icon: "🏺" },
    ],
    restaurantContexts: [
      { id: "casual", label: "Casual", icon: "🍴" },
      { id: "gastro", label: "Gastronómico", icon: "⭐" },
      { id: "hotel", label: "Hotel", icon: "🏨" },
      { id: "winebar", label: "Wine bar", icon: "🍷" },
    ],
    decides: [
      "Qué multiplicador aplicar según tipo de vino, precio de coste y contexto del restaurante",
      "Si tu pricing actual deja margen suficiente por copa y botella",
      "Cómo influye el ticket medio en la estrategia de precios de vino",
    ],
    avoids: [
      "Aplicar el mismo multiplicador a toda la carta sin criterio",
      "Saltos artificiales en el pricing al cruzar umbrales de precio",
      "Fijar precios que no cubren el coste por copa ni la merma",
    ],
    impact: [
      "Mejora del margen bruto medio entre un 5-15%",
      "Beverage Cost % controlado y visible para cada referencia",
      "Pricing alineado con el posicionamiento real del restaurante",
    ],
    inputTitle: "Datos de tu vino", wineCatLabel: "Tipo de vino", contextLabel: "Contexto del restaurante", contextHint: "Ajusta el multiplicador según tu perfil",
    costLabel: "Precio de compra (€)", costUnit: "€/botella", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Precio actual en carta (€)", currentPriceOpt: "opcional", currentPricePlaceholder: "Deja vacío si no aplica",
    glassesLabel: "Copas por botella", glassesUnit: "copas",
    ticketLabel: "Ticket medio del restaurante (€)", ticketHint: "Ajusta el multiplicador en vinos de gama alta para contextos de alto ticket", ticketUnit: "€/comensal",
    multLabel: "Multiplicador final", baseMult: "Base interpolada", contextAdj: "CADJ", ticketAdj: "TADJ", finalMult: "Final",
    resultsTitle: "Análisis completo", resultsSummary: "Panel de resultados",
    metricCost: "Coste de compra", metricPvpCurrent: "PVP actual", metricPvpRec: "PVP recomendado", metricDeviation: "Desviación",
    metricMarginAbs: "Margen bruto", metricMarginPct: "Margen %", metricBcPct: "Beverage Cost %",
    metricGlassPrice: "PVP copa", metricCostPerGlass: "Coste copa", metricBreakeven: "Copas para cubrir coste",
    bcLabel: "Beverage Cost", bcGood: "Óptimo", bcWarning: "En riesgo", bcDanger: "Crítico",
    compareLabel: "Comparativa con tu precio actual", yourPrice: "Tu precio", recommended: "Recomendado", yourMargin: "Tu margen actual",
    deviationLabel: "Desviación",
    execTitle: "Lectura ejecutiva",
    pricingGuide: "Guía de pricing", pricingTitle: "Cómo calcular el precio del vino en un", pricingTitleHighlight: "restaurante",
    multMethodTitle: "El método del multiplicador con interpolación",
    multMethodDesc: "En lugar de aplicar un factor fijo por rango, Winerim utiliza interpolación continua: el multiplicador se ajusta de forma progresiva según el precio de coste, evitando saltos artificiales cerca de los límites de cada gama.",
    ranges: [
      { range: "Vinos de entrada", mult: "×3.5 – ×3.8", note: "Mayor margen % porque el precio absoluto es bajo" },
      { range: "Vinos de gama media", mult: "×2.6 – ×3.0", note: "Equilibrio entre margen y percepción de precio" },
      { range: "Vinos premium+", mult: "×1.8 – ×2.3", note: "Menor margen % para mantener precios competitivos" },
    ],
    glassRuleTitle: "La regla de la copa",
    glassRuleDesc: "El precio de una copa de vino debería ser suficiente para que las 2-3 primeras copas vendidas cubran el coste de la botella completa. Así, aunque se pierdan 1-2 copas por merma, la operación sigue siendo rentable.",
    errorsTitle: "Errores comunes de pricing",
    errors: ["Usar el mismo multiplicador para todos los vinos", "No diferenciar entre tranquilo, espumoso y fortificado", "No tener escalera de precios progresiva", "Ignorar el ticket medio del restaurante al fijar pricing"],
    ctaBadge: "Winerim Core", ctaTitle: "Esta calculadora es solo el", ctaTitleHighlight: "principio",
    ctaDesc: "Winerim Core analiza el pricing, los márgenes, la rotación y la arquitectura completa de tu carta — con una capa analítica profunda que trabaja con tus datos reales, no con fórmulas genéricas.",
    ctaPrimary: "Ver cómo lo resuelve Winerim Core", ctaSecondary: "Analizar mi carta gratis",
    internalLinks: [
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino", type: "guide" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: optimiza costes de compra", type: "solution" },
      { to: "/decision-center/margenes-pricing", label: "Decision Center: márgenes y pricing", type: "decision-center" },
      { to: "/precios", label: "Planes y precios", type: "solution" },
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
    ],
  },
  en: {
    seoTitle: "Wine Margin Calculator for Restaurants | Winerim Core Demo",
    seoDesc: "Calculate the selling price and margin for every bottle and glass of wine in your restaurant. Demo of Winerim Core's pricing engine.",
    breadTools: "Tools", breadCalc: "Margin calculator",
    demoBadge: "Demo · Winerim Core",
    h1a: "Wine margin calculator for", h1b: "restaurants",
    subtitle: "Discover how much you should charge per bottle and glass to maintain a profitable margin — by wine type, range and restaurant context.",
    demoTitle: "Demo of Winerim Core's pricing & profitability engine",
    demoDesc: "This tool applies continuous interpolation across price ranges, context adjustment (CADJ) and average ticket adjustment (TADJ) — a simplified version of how Winerim calibrates pricing with real data.",
    wineCategories: [
      { id: "still", label: "Still", icon: "🍷" },
      { id: "sparkling", label: "Sparkling", icon: "🥂" },
      { id: "champagne", label: "Champagne", icon: "🍾" },
      { id: "dessert", label: "Dessert / Sweet", icon: "🍯" },
      { id: "fortified", label: "Fortified", icon: "🏺" },
    ],
    restaurantContexts: [
      { id: "casual", label: "Casual", icon: "🍴" },
      { id: "gastro", label: "Fine dining", icon: "⭐" },
      { id: "hotel", label: "Hotel", icon: "🏨" },
      { id: "winebar", label: "Wine bar", icon: "🍷" },
    ],
    decides: [
      "Which multiplier to apply based on wine type, cost price and restaurant context",
      "Whether your current pricing leaves enough margin per glass and bottle",
      "How average ticket influences wine pricing strategy",
    ],
    avoids: [
      "Applying the same multiplier across the entire list",
      "Artificial pricing jumps when crossing price thresholds",
      "Setting prices that don't cover the cost per glass or waste",
    ],
    impact: [
      "Average gross margin improvement of 5-15%",
      "Beverage Cost % controlled and visible for every reference",
      "Pricing aligned with the restaurant's actual positioning",
    ],
    inputTitle: "Your wine data", wineCatLabel: "Wine type", contextLabel: "Restaurant context", contextHint: "Adjusts the multiplier to your profile",
    costLabel: "Purchase price (€)", costUnit: "€/bottle", costMin: "€1", costMax: "€100",
    currentPriceLabel: "Current list price (€)", currentPriceOpt: "optional", currentPricePlaceholder: "Leave empty if not applicable",
    glassesLabel: "Glasses per bottle", glassesUnit: "glasses",
    ticketLabel: "Average restaurant ticket (€)", ticketHint: "Adjusts multiplier for high-end wines in high-ticket contexts", ticketUnit: "€/guest",
    multLabel: "Final multiplier", baseMult: "Interpolated base", contextAdj: "CADJ", ticketAdj: "TADJ", finalMult: "Final",
    resultsTitle: "Full analysis", resultsSummary: "Results panel",
    metricCost: "Purchase cost", metricPvpCurrent: "Current PVP", metricPvpRec: "Recommended PVP", metricDeviation: "Deviation",
    metricMarginAbs: "Gross margin", metricMarginPct: "Margin %", metricBcPct: "Beverage Cost %",
    metricGlassPrice: "Glass PVP", metricCostPerGlass: "Glass cost", metricBreakeven: "Glasses to cover cost",
    bcLabel: "Beverage Cost", bcGood: "Optimal", bcWarning: "At risk", bcDanger: "Critical",
    compareLabel: "Comparison with your current price", yourPrice: "Your price", recommended: "Recommended", yourMargin: "Your current margin",
    deviationLabel: "Deviation",
    execTitle: "Executive reading",
    pricingGuide: "Pricing guide", pricingTitle: "How to calculate wine pricing in a", pricingTitleHighlight: "restaurant",
    multMethodTitle: "The interpolated multiplier method",
    multMethodDesc: "Instead of applying a fixed factor per range, Winerim uses continuous interpolation: the multiplier adjusts progressively based on cost price, avoiding artificial jumps near range boundaries.",
    ranges: [
      { range: "Entry-level wines", mult: "×3.5 – ×3.8", note: "Higher margin % because the absolute price is low" },
      { range: "Mid-range wines", mult: "×2.6 – ×3.0", note: "Balance between margin and price perception" },
      { range: "Premium+ wines", mult: "×1.8 – ×2.3", note: "Lower margin % to keep prices competitive" },
    ],
    glassRuleTitle: "The glass rule",
    glassRuleDesc: "The price of a glass of wine should be enough so that the first 2-3 glasses sold cover the cost of the entire bottle. This way, even if 1-2 glasses are lost to waste, the operation remains profitable.",
    errorsTitle: "Common pricing mistakes",
    errors: ["Using the same multiplier for all wines", "Not differentiating between still, sparkling and fortified", "No progressive price ladder", "Ignoring average ticket when setting wine pricing"],
    ctaBadge: "Winerim Core", ctaTitle: "This calculator is just the", ctaTitleHighlight: "beginning",
    ctaDesc: "Winerim Core analyses pricing, margins, rotation and the full architecture of your wine list — with a deep analytical layer that works with your real data, not generic formulas.",
    ctaPrimary: "See how Winerim Core solves it", ctaSecondary: "Analyse my list for free",
    internalLinks: [
      { to: "/precio-vino-restaurante", label: "How to price wine", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "How to design a profitable list", type: "guide" },
      { to: "/wine-pricing-tool", label: "Pricing tool", type: "tool" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Wine mapping template", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core: full analytics", type: "solution" },
    ],
  },
  it: {
    seoTitle: "Calcolatore di Margine del Vino per Ristoranti | Demo Winerim Core",
    seoDesc: "Calcola il prezzo di vendita e il margine di ogni bottiglia e calice di vino nel tuo ristorante. Demo del motore di pricing di Winerim Core.",
    breadTools: "Strumenti", breadCalc: "Calcolatore di margine",
    demoBadge: "Demo · Winerim Core",
    h1a: "Calcolatore di margine del vino per", h1b: "ristoranti",
    subtitle: "Scopri quanto dovresti far pagare per ogni bottiglia e calice per mantenere un margine redditizio — per tipo di vino, gamma e contesto del ristorante.",
    demoTitle: "Demo del motore di pricing e redditività di Winerim Core",
    demoDesc: "Questo strumento applica interpolazione continua tra fasce di prezzo, regolazione per contesto (CADJ) e regolazione per ticket medio (TADJ) — una versione semplificata di come Winerim calibra il pricing con dati reali.",
    wineCategories: [
      { id: "still", label: "Fermo", icon: "🍷" },
      { id: "sparkling", label: "Spumante", icon: "🥂" },
      { id: "champagne", label: "Champagne", icon: "🍾" },
      { id: "dessert", label: "Dessert / Dolce", icon: "🍯" },
      { id: "fortified", label: "Fortificato", icon: "🏺" },
    ],
    restaurantContexts: [
      { id: "casual", label: "Casual", icon: "🍴" },
      { id: "gastro", label: "Gastronomico", icon: "⭐" },
      { id: "hotel", label: "Hotel", icon: "🏨" },
      { id: "winebar", label: "Wine bar", icon: "🍷" },
    ],
    decides: [
      "Quale moltiplicatore applicare in base al tipo di vino, prezzo di costo e contesto del ristorante",
      "Se il tuo pricing attuale lascia margine sufficiente per calice e bottiglia",
      "Come il ticket medio influenza la strategia di pricing del vino",
    ],
    avoids: [
      "Applicare lo stesso moltiplicatore a tutta la carta",
      "Salti artificiali nel pricing al superamento delle soglie di prezzo",
      "Fissare prezzi che non coprono il costo per calice né le perdite",
    ],
    impact: [
      "Miglioramento del margine lordo medio tra il 5-15%",
      "Beverage Cost % controllato e visibile per ogni referenza",
      "Pricing allineato con il posizionamento reale del ristorante",
    ],
    inputTitle: "Dati del tuo vino", wineCatLabel: "Tipo di vino", contextLabel: "Contesto del ristorante", contextHint: "Regola il moltiplicatore secondo il tuo profilo",
    costLabel: "Prezzo d'acquisto (€)", costUnit: "€/bottiglia", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Prezzo attuale in carta (€)", currentPriceOpt: "opzionale", currentPricePlaceholder: "Lascia vuoto se non applicabile",
    glassesLabel: "Calici per bottiglia", glassesUnit: "calici",
    ticketLabel: "Ticket medio del ristorante (€)", ticketHint: "Regola il moltiplicatore per vini di alta gamma in contesti di alto ticket", ticketUnit: "€/ospite",
    multLabel: "Moltiplicatore finale", baseMult: "Base interpolata", contextAdj: "CADJ", ticketAdj: "TADJ", finalMult: "Finale",
    resultsTitle: "Analisi completa", resultsSummary: "Pannello risultati",
    metricCost: "Costo d'acquisto", metricPvpCurrent: "PVP attuale", metricPvpRec: "PVP consigliato", metricDeviation: "Deviazione",
    metricMarginAbs: "Margine lordo", metricMarginPct: "Margine %", metricBcPct: "Beverage Cost %",
    metricGlassPrice: "PVP calice", metricCostPerGlass: "Costo calice", metricBreakeven: "Calici per coprire il costo",
    bcLabel: "Beverage Cost", bcGood: "Ottimale", bcWarning: "A rischio", bcDanger: "Critico",
    compareLabel: "Confronto con il tuo prezzo attuale", yourPrice: "Il tuo prezzo", recommended: "Consigliato", yourMargin: "Il tuo margine attuale",
    deviationLabel: "Deviazione",
    execTitle: "Lettura esecutiva",
    pricingGuide: "Guida al pricing", pricingTitle: "Come calcolare il prezzo del vino in un", pricingTitleHighlight: "ristorante",
    multMethodTitle: "Il metodo del moltiplicatore interpolato",
    multMethodDesc: "Invece di applicare un fattore fisso per fascia, Winerim utilizza l'interpolazione continua: il moltiplicatore si regola progressivamente in base al prezzo di costo, evitando salti artificiali ai limiti di ogni gamma.",
    ranges: [
      { range: "Vini d'ingresso", mult: "×3.5 – ×3.8", note: "Margine % maggiore perché il prezzo assoluto è basso" },
      { range: "Vini di gamma media", mult: "×2.6 – ×3.0", note: "Equilibrio tra margine e percezione del prezzo" },
      { range: "Vini premium+", mult: "×1.8 – ×2.3", note: "Margine % inferiore per mantenere prezzi competitivi" },
    ],
    glassRuleTitle: "La regola del calice",
    glassRuleDesc: "Il prezzo di un calice di vino dovrebbe essere sufficiente affinché i primi 2-3 calici venduti coprano il costo dell'intera bottiglia.",
    errorsTitle: "Errori comuni di pricing",
    errors: ["Usare lo stesso moltiplicatore per tutti i vini", "Non differenziare tra fermo, spumante e fortificato", "Non avere una scala di prezzi progressiva", "Ignorare il ticket medio quando si fissa il pricing del vino"],
    ctaBadge: "Winerim Core", ctaTitle: "Questo calcolatore è solo l'", ctaTitleHighlight: "inizio",
    ctaDesc: "Winerim Core analizza pricing, margini, rotazione e l'architettura completa della tua carta — con uno strato analitico profondo che lavora con i tuoi dati reali.",
    ctaPrimary: "Scopri come lo risolve Winerim Core", ctaSecondary: "Analizza la mia carta gratis",
    internalLinks: [
      { to: "/precio-vino-restaurante", label: "Come fissare il prezzo del vino", type: "guide" },
      { to: "/producto/winerim-core", label: "Winerim Core: analisi completa", type: "solution" },
    ],
  },
  fr: {
    seoTitle: "Calculateur de Marge du Vin pour Restaurants | Démo Winerim Core",
    seoDesc: "Calculez le prix de vente et la marge de chaque bouteille et verre de vin dans votre restaurant. Démo du moteur de pricing de Winerim Core.",
    breadTools: "Outils", breadCalc: "Calculateur de marge",
    demoBadge: "Démo · Winerim Core",
    h1a: "Calculateur de marge du vin pour", h1b: "restaurants",
    subtitle: "Découvrez combien vous devriez facturer par bouteille et par verre pour maintenir une marge rentable — par type de vin, gamme et contexte du restaurant.",
    demoTitle: "Démo du moteur de pricing et de rentabilité de Winerim Core",
    demoDesc: "Cet outil applique une interpolation continue entre gammes de prix, un ajustement par contexte (CADJ) et un ajustement par ticket moyen (TADJ) — une version simplifiée de la façon dont Winerim calibre le pricing avec des données réelles.",
    wineCategories: [
      { id: "still", label: "Tranquille", icon: "🍷" },
      { id: "sparkling", label: "Effervescent", icon: "🥂" },
      { id: "champagne", label: "Champagne", icon: "🍾" },
      { id: "dessert", label: "Dessert / Moelleux", icon: "🍯" },
      { id: "fortified", label: "Fortifié", icon: "🏺" },
    ],
    restaurantContexts: [
      { id: "casual", label: "Casual", icon: "🍴" },
      { id: "gastro", label: "Gastronomique", icon: "⭐" },
      { id: "hotel", label: "Hôtel", icon: "🏨" },
      { id: "winebar", label: "Bar à vins", icon: "🍷" },
    ],
    decides: [
      "Quel multiplicateur appliquer selon le type de vin, le prix de revient et le contexte du restaurant",
      "Si votre pricing actuel laisse assez de marge par verre et bouteille",
      "Comment le ticket moyen influence la stratégie de pricing du vin",
    ],
    avoids: [
      "Appliquer le même multiplicateur à toute la carte",
      "Des sauts artificiels dans le pricing au franchissement des seuils de prix",
      "Fixer des prix qui ne couvrent pas le coût par verre ni la perte",
    ],
    impact: [
      "Amélioration de la marge brute moyenne de 5 à 15%",
      "Beverage Cost % contrôlé et visible pour chaque référence",
      "Pricing aligné avec le positionnement réel du restaurant",
    ],
    inputTitle: "Données de votre vin", wineCatLabel: "Type de vin", contextLabel: "Contexte du restaurant", contextHint: "Ajuste le multiplicateur selon votre profil",
    costLabel: "Prix d'achat (€)", costUnit: "€/bouteille", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Prix actuel en carte (€)", currentPriceOpt: "optionnel", currentPricePlaceholder: "Laissez vide si non applicable",
    glassesLabel: "Verres par bouteille", glassesUnit: "verres",
    ticketLabel: "Ticket moyen du restaurant (€)", ticketHint: "Ajuste le multiplicateur pour les vins haut de gamme dans les contextes de ticket élevé", ticketUnit: "€/convive",
    multLabel: "Multiplicateur final", baseMult: "Base interpolée", contextAdj: "CADJ", ticketAdj: "TADJ", finalMult: "Final",
    resultsTitle: "Analyse complète", resultsSummary: "Panel de résultats",
    metricCost: "Coût d'achat", metricPvpCurrent: "PVP actuel", metricPvpRec: "PVP recommandé", metricDeviation: "Écart",
    metricMarginAbs: "Marge brute", metricMarginPct: "Marge %", metricBcPct: "Beverage Cost %",
    metricGlassPrice: "PVP verre", metricCostPerGlass: "Coût verre", metricBreakeven: "Verres pour couvrir le coût",
    bcLabel: "Beverage Cost", bcGood: "Optimal", bcWarning: "À risque", bcDanger: "Critique",
    compareLabel: "Comparaison avec votre prix actuel", yourPrice: "Votre prix", recommended: "Recommandé", yourMargin: "Votre marge actuelle",
    deviationLabel: "Écart",
    execTitle: "Lecture exécutive",
    pricingGuide: "Guide de pricing", pricingTitle: "Comment calculer le prix du vin dans un", pricingTitleHighlight: "restaurant",
    multMethodTitle: "La méthode du multiplicateur interpolé",
    multMethodDesc: "Au lieu d'appliquer un facteur fixe par gamme, Winerim utilise l'interpolation continue : le multiplicateur s'ajuste progressivement selon le prix de revient, évitant les sauts artificiels aux limites de chaque gamme.",
    ranges: [
      { range: "Vins d'entrée de gamme", mult: "×3.5 – ×3.8", note: "Marge % plus élevée car le prix absolu est bas" },
      { range: "Vins milieu de gamme", mult: "×2.6 – ×3.0", note: "Équilibre entre marge et perception du prix" },
      { range: "Vins premium+", mult: "×1.8 – ×2.3", note: "Marge % plus faible pour maintenir des prix compétitifs" },
    ],
    glassRuleTitle: "La règle du verre",
    glassRuleDesc: "Le prix d'un verre de vin devrait être suffisant pour que les 2-3 premiers verres vendus couvrent le coût de la bouteille entière.",
    errorsTitle: "Erreurs courantes de pricing",
    errors: ["Utiliser le même multiplicateur pour tous les vins", "Ne pas différencier entre tranquille, effervescent et fortifié", "Pas d'échelle de prix progressive", "Ignorer le ticket moyen pour fixer le pricing du vin"],
    ctaBadge: "Winerim Core", ctaTitle: "Ce calculateur n'est que le", ctaTitleHighlight: "début",
    ctaDesc: "Winerim Core analyse le pricing, les marges, la rotation et l'architecture complète de votre carte — avec une couche analytique profonde qui travaille avec vos données réelles.",
    ctaPrimary: "Voir comment Winerim Core le résout", ctaSecondary: "Analyser ma carte gratuitement",
    internalLinks: [
      { to: "/precio-vino-restaurante", label: "Comment fixer le prix du vin", type: "guide" },
      { to: "/producto/winerim-core", label: "Winerim Core : analyse complète", type: "solution" },
    ],
  },
};

/* ─── Executive reading i18n ─── */
const execI18n: Record<string, {
  title: string; health: string; deviation: string; advice: string; optimal: string; low: string; critical: string;
  yourMargin: string; target: string;
  execHealthy: (cat: string, ctx: string) => string;
  execLow: (cat: string, priceDiff: string) => string;
  execCritical: (cat: string, margin: string) => string;
  execAbove: (diff: string) => string;
  execBcWarn: (bc: string) => string;
}> = {
  es: {
    title: "Diagnóstico Winerim", health: "Salud del margen", deviation: "Desviación vs objetivo", advice: "Recomendación",
    optimal: "Óptimo", low: "Bajo", critical: "Crítico",
    yourMargin: "Tu margen", target: "Objetivo",
    execHealthy: (cat, ctx) => `El pricing de este ${cat} está bien calibrado para un contexto ${ctx}. El margen y el Beverage Cost se encuentran dentro del rango objetivo. Mantén y revisa trimestralmente.`,
    execLow: (cat, priceDiff) => `Este ${cat} está dejando ${priceDiff} € de margen potencial sin capturar. El multiplicador actual es inferior al recomendado. Sube el PVP progresivamente y mide la rotación durante 2-3 semanas.`,
    execCritical: (cat, margin) => `Alerta: el margen de este ${cat} es del ${margin}%, muy por debajo del rango objetivo. A este nivel, la operación no cubre costes operativos. Revisa el PVP o sustituye la referencia.`,
    execAbove: (diff) => `Tu precio actual está ${diff} € por encima del recomendado. Esto puede frenar la rotación. Si la referencia rota bien, mantén; si no, ajusta a la baja.`,
    execBcWarn: (bc) => ` El Beverage Cost (${bc}%) está por encima del umbral recomendado del 28%. Considera reducir el coste de compra o ajustar el PVP.`,
  },
  en: {
    title: "Winerim Diagnosis", health: "Margin health", deviation: "Deviation vs target", advice: "Recommendation",
    optimal: "Optimal", low: "Low", critical: "Critical",
    yourMargin: "Your margin", target: "Target",
    execHealthy: (cat, ctx) => `The pricing of this ${cat} is well-calibrated for a ${ctx} context. Margin and Beverage Cost are within target range. Maintain and review quarterly.`,
    execLow: (cat, priceDiff) => `This ${cat} is leaving €${priceDiff} of potential margin uncaptured. The current multiplier is below recommended. Raise PVP progressively and measure rotation over 2-3 weeks.`,
    execCritical: (cat, margin) => `Alert: the margin on this ${cat} is ${margin}%, well below the target range. At this level, the operation doesn't cover operating costs. Review PVP or replace the reference.`,
    execAbove: (diff) => `Your current price is €${diff} above recommended. This may slow rotation. If rotation is strong, maintain; otherwise, adjust downward.`,
    execBcWarn: (bc) => ` Beverage Cost (${bc}%) is above the recommended 28% threshold. Consider reducing purchase cost or adjusting PVP.`,
  },
  it: {
    title: "Diagnosi Winerim", health: "Salute del margine", deviation: "Deviazione vs obiettivo", advice: "Raccomandazione",
    optimal: "Ottimale", low: "Basso", critical: "Critico",
    yourMargin: "Il tuo margine", target: "Obiettivo",
    execHealthy: (cat, ctx) => `Il pricing di questo ${cat} è ben calibrato per un contesto ${ctx}. Margine e Beverage Cost sono nel range obiettivo. Mantieni e rivedi trimestralmente.`,
    execLow: (cat, priceDiff) => `Questo ${cat} sta lasciando ${priceDiff} € di margine potenziale non catturato. Alza il PVP progressivamente.`,
    execCritical: (cat, margin) => `Allerta: il margine di questo ${cat} è del ${margin}%, molto sotto il range obiettivo. Azione urgente necessaria.`,
    execAbove: (diff) => `Il tuo prezzo attuale è ${diff} € sopra il consigliato. Verifica l'impatto sulla rotazione.`,
    execBcWarn: (bc) => ` Il Beverage Cost (${bc}%) supera la soglia raccomandata del 28%.`,
  },
  fr: {
    title: "Diagnostic Winerim", health: "Santé de la marge", deviation: "Écart vs objectif", advice: "Recommandation",
    optimal: "Optimal", low: "Bas", critical: "Critique",
    yourMargin: "Votre marge", target: "Objectif",
    execHealthy: (cat, ctx) => `Le pricing de ce ${cat} est bien calibré pour un contexte ${ctx}. La marge et le Beverage Cost sont dans la plage cible. Maintenez et révisez trimestriellement.`,
    execLow: (cat, priceDiff) => `Ce ${cat} laisse ${priceDiff} € de marge potentielle non capturée. Augmentez le PVP progressivement.`,
    execCritical: (cat, margin) => `Alerte : la marge de ce ${cat} est de ${margin}%, bien en dessous de la plage cible. Action urgente nécessaire.`,
    execAbove: (diff) => `Votre prix actuel est ${diff} € au-dessus du recommandé. Vérifiez l'impact sur la rotation.`,
    execBcWarn: (bc) => ` Le Beverage Cost (${bc}%) dépasse le seuil recommandé de 28%.`,
  },
};

/* ─── Component ─── */
const CalculadoraMargen = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;
  const dl = execI18n[lang] || execI18n.es;

  const [wineCat, setWineCat] = useState<WineCat>("still");
  const [restCtx, setRestCtx] = useState<RestCtx>("casual");
  const [costPrice, setCostPrice] = useState(12);
  const [glassesPerBottle, setGlassesPerBottle] = useState(5);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [avgTicket, setAvgTicket] = useState(45);

  const tracked = useRef(false);

  const engine = useMemo(() => computeMultiplier(wineCat, costPrice, restCtx, avgTicket), [wineCat, costPrice, restCtx, avgTicket]);
  const [multiplier, setMultiplier] = useState(engine.final);

  useEffect(() => { setMultiplier(engine.final); }, [engine.final]);

  const handleInteraction = () => {
    if (!tracked.current) { tracked.current = true; trackAction("tool_use", "tool", "calculadora-margen"); }
  };

  const results = useMemo(() => {
    const bottlePrice = costPrice * multiplier;
    const glassPrice = bottlePrice / glassesPerBottle;
    const grossMargin = bottlePrice - costPrice;
    const marginPercent = costPrice > 0 ? (grossMargin / bottlePrice) * 100 : 0;
    const beverageCost = costPrice > 0 && bottlePrice > 0 ? (costPrice / bottlePrice) * 100 : 0;
    const costPerGlass = costPrice / glassesPerBottle;
    const breakEvenGlasses = glassPrice > 0 ? Math.ceil(costPrice / glassPrice) : 0;

    let currentMarginAbs: number | null = null;
    let currentMarginPct: number | null = null;
    let currentBc: number | null = null;
    let priceDiff: number | null = null;
    let currentMult: number | null = null;
    if (currentPrice && currentPrice > 0) {
      currentMarginAbs = currentPrice - costPrice;
      currentMarginPct = (currentMarginAbs / currentPrice) * 100;
      currentBc = (costPrice / currentPrice) * 100;
      priceDiff = bottlePrice - currentPrice;
      currentMult = costPrice > 0 ? currentPrice / costPrice : null;
    }

    return { bottlePrice, glassPrice, grossMargin, marginPercent, beverageCost, costPerGlass, breakEvenGlasses, currentMarginAbs, currentMarginPct, currentBc, priceDiff, currentMult };
  }, [costPrice, glassesPerBottle, multiplier, currentPrice]);

  // Diagnostic
  const rangeKey = detectRangeLabel(costPrice);
  const targetMargin = rangeKey === "entry" ? 72 : rangeKey === "mid" ? 65 : rangeKey === "premium" ? 55 : 45;
  const marginDelta = results.marginPercent - targetMargin;
  const marginHealth = results.marginPercent >= (targetMargin - 2) ? "optimal" : results.marginPercent >= (targetMargin - 15) ? "low" : "critical";
  const healthColor = marginHealth === "optimal" ? "text-emerald-500" : marginHealth === "low" ? "text-amber-500" : "text-destructive";
  const healthBg = marginHealth === "optimal" ? "bg-emerald-500/10" : marginHealth === "low" ? "bg-amber-500/10" : "bg-destructive/10";
  const healthLabel = marginHealth === "optimal" ? dl.optimal : marginHealth === "low" ? dl.low : dl.critical;

  const bcStatus = bcHealth(results.beverageCost);
  const bcColor = bcStatus === "good" ? "text-emerald-500" : bcStatus === "warning" ? "text-amber-500" : "text-destructive";
  const bcBg = bcStatus === "good" ? "bg-emerald-500/10" : bcStatus === "warning" ? "bg-amber-500/10" : "bg-destructive/10";
  const bcLabel = bcStatus === "good" ? t.bcGood : bcStatus === "warning" ? t.bcWarning : t.bcDanger;

  const catLabel = t.wineCategories.find(c => c.id === wineCat)?.label || "";
  const ctxLabel = t.restaurantContexts.find(c => c.id === restCtx)?.label || "";

  const execReading = useMemo(() => {
    let reading = "";
    if (marginHealth === "critical") reading = dl.execCritical(catLabel, results.marginPercent.toFixed(0));
    else if (currentPrice && results.priceDiff !== null) {
      if (results.priceDiff > 3) reading = dl.execAbove(results.priceDiff.toFixed(2));
      else if (results.priceDiff < -2) reading = dl.execLow(catLabel, Math.abs(results.priceDiff).toFixed(2));
      else reading = dl.execHealthy(catLabel, ctxLabel);
    } else if (marginHealth === "low") {
      reading = dl.execLow(catLabel, (results.bottlePrice - (currentPrice || results.bottlePrice)).toFixed(2));
    } else {
      reading = dl.execHealthy(catLabel, ctxLabel);
    }
    if (bcStatus !== "good") reading += dl.execBcWarn(results.beverageCost.toFixed(1));
    return reading;
  }, [marginHealth, currentPrice, results, catLabel, ctxLabel, dl, bcStatus]);

  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "calc-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Cómo se calcula el precio de venta del vino en un restaurante?", acceptedAnswer: { "@type": "Answer", text: "Se multiplica el precio de compra por un factor diferenciado según tipo de vino, gama y contexto del restaurante, usando interpolación continua para evitar saltos artificiales." } },
        { "@type": "Question", name: "¿Qué es el Beverage Cost y cuál es el objetivo?", acceptedAnswer: { "@type": "Answer", text: "El Beverage Cost es el porcentaje que el coste del vino supone sobre su precio de venta. El objetivo estándar es mantenerlo por debajo del 28-30%." } },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("calc-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url="https://winerim.wine/calculadora-margen-vino"
        hreflang={allLangPaths("/calculadora-margen-vino")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: t.breadTools, href: localePath("/herramientas") }, { label: t.breadCalc }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6">
            <BarChart3 size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">{t.demoBadge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] mb-6">
            {t.h1a}{" "}<span className="text-gradient-wine italic">{t.h1b}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* DEMO INTRO */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(38_90%_55%/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-amber-500" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">{t.demoTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.demoDesc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* CALCULATOR */}
      <section className="section-padding pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* ── INPUTS (2 cols) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="lg:col-span-2 bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-wine" /> {t.inputTitle}
              </h2>
              <div className="space-y-5">
                {/* Wine category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.wineCatLabel}</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {t.wineCategories.map((w) => (
                      <button key={w.id} onClick={() => { setWineCat(w.id); handleInteraction(); }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all ${wineCat === w.id ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        <span className="text-sm">{w.icon}</span>
                        <span className="text-xs font-semibold leading-tight">{w.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restaurant context */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.contextLabel}</label>
                  <p className="text-[10px] text-muted-foreground mb-2">{t.contextHint}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {t.restaurantContexts.map((c) => (
                      <button key={c.id} onClick={() => { setRestCtx(c.id); handleInteraction(); }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all ${restCtx === c.id ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        <span className="text-sm">{c.icon}</span>
                        <span className="text-xs font-semibold leading-tight">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.costLabel}</label>
                  <div className="relative">
                    <input type="number" min={0} step={0.5} value={costPrice}
                      onChange={(e) => { setCostPrice(Math.max(0, parseFloat(e.target.value) || 0)); handleInteraction(); }}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{t.costUnit}</span>
                  </div>
                  <input type="range" min={1} max={100} step={0.5} value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value))} className="w-full mt-3 accent-[hsl(var(--wine))]" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{t.costMin}</span><span>{t.costMax}</span>
                  </div>
                </div>

                {/* Average ticket */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.ticketLabel}</label>
                  <p className="text-[10px] text-muted-foreground mb-2">{t.ticketHint}</p>
                  <div className="relative">
                    <input type="number" min={15} max={200} step={5} value={avgTicket}
                      onChange={(e) => { setAvgTicket(Math.max(15, parseFloat(e.target.value) || 15)); handleInteraction(); }}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{t.ticketUnit}</span>
                  </div>
                  <input type="range" min={15} max={200} step={5} value={avgTicket}
                    onChange={(e) => setAvgTicket(parseFloat(e.target.value))} className="w-full mt-2 accent-[hsl(var(--wine))]" />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>15 €</span><span>200 €</span>
                  </div>
                </div>

                {/* Current price */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.currentPriceLabel} <span className="text-muted-foreground font-normal text-xs">— {t.currentPriceOpt}</span>
                  </label>
                  <div className="relative">
                    <input type="number" min={0} step={0.5} value={currentPrice ?? ""} placeholder={t.currentPricePlaceholder}
                      onChange={(e) => { const v = parseFloat(e.target.value); setCurrentPrice(isNaN(v) || v === 0 ? null : v); }}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all placeholder:text-muted-foreground/40 placeholder:text-sm placeholder:font-normal" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                  </div>
                </div>

                {/* Glasses */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.glassesLabel}</label>
                  <div className="flex gap-2">
                    {[4, 5, 6].map((n) => (
                      <button key={n} onClick={() => setGlassesPerBottle(n)}
                        className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${glassesPerBottle === n ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        {n} {t.glassesUnit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multiplier breakdown */}
                <div className="rounded-xl border border-border bg-background/50 p-4 space-y-3">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.multLabel}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">{t.baseMult}</p>
                      <p className="font-heading text-sm font-bold text-foreground">×{engine.base.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">{t.contextAdj}</p>
                      <p className={`font-heading text-sm font-bold ${engine.cadj !== 0 ? "text-wine" : "text-muted-foreground"}`}>
                        {engine.cadj >= 0 ? "+" : ""}{engine.cadj.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">{t.ticketAdj}</p>
                      <p className={`font-heading text-sm font-bold ${engine.tadj !== 0 ? "text-amber-500" : "text-muted-foreground"}`}>
                        {engine.tadj >= 0 ? "+" : ""}{engine.tadj.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-2 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">{t.finalMult}</p>
                    <p className="font-heading text-xl font-bold text-wine">×{multiplier.toFixed(2)}</p>
                  </div>
                  <input type="range" min={1.2} max={5} step={0.05} value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))} className="w-full accent-[hsl(var(--wine))]" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>×1.2</span><span>×5.0</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RESULTS (3 cols) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="lg:col-span-3 space-y-6">

              {/* Main metrics grid */}
              <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-wine" /> {t.resultsTitle}
                </h2>

                {/* Primary row: Cost → PVP Rec → Margin */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard icon={<DollarSign size={14} />} label={t.metricCost} value={`${costPrice.toFixed(2)} €`} />
                  <MetricCard icon={<Target size={14} />} label={t.metricPvpRec} value={`${results.bottlePrice.toFixed(2)} €`} highlight />
                  <MetricCard icon={<TrendingUp size={14} />} label={t.metricMarginAbs} value={`${results.grossMargin.toFixed(2)} €`} sub={`${results.marginPercent.toFixed(1)}%`} />
                </div>

                {/* Secondary row: Glass PVP, Glass Cost, Breakeven */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard icon={<GlassWater size={14} />} label={t.metricGlassPrice} value={`${results.glassPrice.toFixed(2)} €`} />
                  <MetricCard label={t.metricCostPerGlass} value={`${results.costPerGlass.toFixed(2)} €`} />
                  <MetricCard label={t.metricBreakeven} value={`${results.breakEvenGlasses}`} sub={`/ ${glassesPerBottle}`} />
                </div>

                {/* BC% with semaphore */}
                <div className={`rounded-xl border p-4 flex items-center justify-between ${bcBg} ${bcStatus === "good" ? "border-emerald-500/20" : bcStatus === "warning" ? "border-amber-500/20" : "border-destructive/20"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${bcStatus === "good" ? "bg-emerald-500" : bcStatus === "warning" ? "bg-amber-500" : "bg-destructive"}`} />
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.bcLabel}</p>
                      <p className="text-[10px] text-muted-foreground">{t.metricBcPct}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-heading text-2xl font-bold ${bcColor}`}>{results.beverageCost.toFixed(1)}%</p>
                    <p className={`text-xs font-semibold ${bcColor}`}>{bcLabel}</p>
                  </div>
                </div>

                {/* Current price comparison */}
                {results.priceDiff !== null && currentPrice && (
                  <div className={`rounded-xl border p-4 mt-4 ${results.priceDiff > 0 ? "bg-emerald-500/5 border-emerald-500/20" : results.priceDiff < 0 ? "bg-amber-500/5 border-amber-500/20" : "bg-secondary/50 border-border"}`}>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">{t.compareLabel}</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.yourPrice}</p>
                        <p className="font-heading font-bold">{currentPrice.toFixed(2)} €</p>
                        <p className="text-[10px] text-muted-foreground">×{results.currentMult?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.recommended}</p>
                        <p className="font-heading font-bold text-wine">{results.bottlePrice.toFixed(2)} €</p>
                        <p className="text-[10px] text-muted-foreground">×{multiplier.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.deviationLabel}</p>
                        <p className={`font-heading font-bold ${results.priceDiff! > 0 ? "text-emerald-500" : "text-amber-500"}`}>
                          {results.priceDiff! > 0 ? "+" : ""}{results.priceDiff!.toFixed(2)} €
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.metricBcPct}</p>
                        <p className={`font-heading font-bold ${bcHealth(results.currentBc!) === "good" ? "text-emerald-500" : bcHealth(results.currentBc!) === "warning" ? "text-amber-500" : "text-destructive"}`}>
                          {results.currentBc?.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Winerim Diagnostic Panel ── */}
              <div className="rounded-2xl border border-amber-500/20 bg-gradient-card p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500">{dl.title}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Margin health */}
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{dl.health}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${healthBg} ${healthColor}`}>{healthLabel}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">{results.marginPercent.toFixed(0)}% — {dl.target}: {targetMargin}%</p>
                  </div>
                  {/* Deviation */}
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{dl.deviation}</p>
                    <p className={`font-heading text-xl font-bold ${marginDelta >= 0 ? "text-emerald-500" : "text-amber-500"}`}>
                      {marginDelta >= 0 ? "+" : ""}{marginDelta.toFixed(0)}pp
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">{dl.yourMargin} vs {dl.target.toLowerCase()}</p>
                  </div>
                  {/* BC semaphore */}
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.bcLabel}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${bcBg} ${bcColor}`}>{bcLabel}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">BC: {results.beverageCost.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Margin bar */}
                <div className="space-y-1">
                  <div className="h-3 rounded-full bg-muted/30 overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-destructive via-amber-500 to-emerald-500" style={{ width: `${Math.min(results.marginPercent, 100)}%` }} />
                    <div className="absolute inset-y-0 w-0.5 bg-foreground/30" style={{ left: `${targetMargin}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0%</span><span>{dl.target}: {targetMargin}%</span><span>100%</span>
                  </div>
                </div>

                {/* Executive reading */}
                <div className="pt-4 border-t border-border">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Target size={12} className="text-wine" />
                    {t.execTitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{execReading}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPLANATION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.pricingGuide}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.pricingTitle}{" "}<span className="text-gradient-wine italic">{t.pricingTitleHighlight}</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">{t.multMethodTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.multMethodDesc}</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {t.ranges.map((item, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4 border border-border">
                      <p className="text-xs uppercase tracking-wider text-wine-light font-semibold mb-1">{item.range}</p>
                      <p className="font-heading text-lg font-bold text-wine mb-1">{item.mult}</p>
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">{t.glassRuleTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.glassRuleDesc}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">{t.errorsTitle}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.errors.map((error, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Wine size={14} className="text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-amber-500/20 p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_90%_55%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-amber-500/70 mb-4">
                <span className="w-1 h-1 rounded-full bg-amber-500/50" /> {t.ctaBadge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
                {t.ctaTitle}{" "}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/producto/winerim-core")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/analisis-carta")}
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.internalLinks} />
      <Footer />
    </div>
  );
};

/* ─── Metric Card ─── */
const MetricCard = ({ icon, label, value, sub, highlight }: { icon?: React.ReactNode; label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-3 ${highlight ? "bg-wine/5 border-wine/20" : "bg-secondary/30 border-border"}`}>
    <div className="flex items-center gap-1.5 mb-1">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
    </div>
    <p className={`font-heading text-base font-bold ${highlight ? "text-wine" : "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-wine mt-0.5">{sub}</p>}
  </div>
);

export default CalculadoraMargen;
