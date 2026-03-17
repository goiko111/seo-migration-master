import { useState, useEffect, useMemo, useRef } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Calculator, Wine, TrendingUp, Info,
  BarChart3, ShieldAlert, Sparkles, Target, AlertTriangle, Check,
  Building2, GlassWater,
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
type PriceRange = "entry" | "mid" | "premium" | "icon";

interface CatI18n { id: WineCat; label: string; icon: string }
interface CtxI18n { id: RestCtx; label: string; icon: string }
interface RangeI18n { id: PriceRange; label: string; sublabel: string }

interface LangContent {
  seoTitle: string; seoDesc: string;
  breadTools: string; breadCalc: string;
  demoBadge: string; h1a: string; h1b: string; subtitle: string;
  demoTitle: string; demoDesc: string;
  wineCategories: CatI18n[];
  restaurantContexts: CtxI18n[];
  priceRanges: RangeI18n[];
  decides: string[]; avoids: string[]; impact: string[];
  inputTitle: string; wineCatLabel: string; contextLabel: string; contextHint: string;
  costLabel: string; costUnit: string; costMin: string; costMax: string;
  currentPriceLabel: string; currentPriceOpt: string; currentPricePlaceholder: string;
  glassesLabel: string; glassesUnit: string;
  multLabel: string; autoRange: string; baseMult: string; contextAdj: string;
  resultsTitle: string;
  pvpBottle: string; pvpGlass: string; grossMargin: string; marginPct: string;
  costPerGlass: string; glassesToCover: string; ofTotal: string;
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

/* ─── Multiplier engine ─── */
const BASE_MULTIPLIERS: Record<WineCat, Record<PriceRange, number>> = {
  still:     { entry: 3.5, mid: 2.8, premium: 2.2, icon: 1.8 },
  sparkling: { entry: 3.2, mid: 2.6, premium: 2.0, icon: 1.7 },
  champagne: { entry: 2.8, mid: 2.3, premium: 1.9, icon: 1.5 },
  dessert:   { entry: 3.8, mid: 3.0, premium: 2.4, icon: 2.0 },
  fortified: { entry: 3.6, mid: 2.9, premium: 2.3, icon: 1.9 },
};

const CONTEXT_ADJUSTMENTS: Record<RestCtx, number> = {
  casual: 0,
  gastro: -0.15,
  hotel: +0.20,
  winebar: -0.10,
};

const detectRange = (cost: number): PriceRange => {
  if (cost < 8) return "entry";
  if (cost < 20) return "mid";
  if (cost < 50) return "premium";
  return "icon";
};

const getMultiplier = (cat: WineCat, range: PriceRange, ctx: RestCtx): number => {
  const base = BASE_MULTIPLIERS[cat][range];
  const adj = CONTEXT_ADJUSTMENTS[ctx];
  return Math.round((base + adj) * 10) / 10;
};

/* ─── i18n ─── */
const i18n: Record<string, LangContent> = {
  es: {
    seoTitle: "Calculadora de Margen del Vino para Restaurantes | Demo Winerim Core",
    seoDesc: "Calcula el precio de venta y el margen de cada botella y copa de vino en tu restaurante. Demo del motor de pricing de Winerim Core.",
    breadTools: "Herramientas", breadCalc: "Calculadora de margen",
    demoBadge: "Demo · Winerim Core",
    h1a: "Calculadora de margen del vino para", h1b: "restaurantes",
    subtitle: "Descubre cuánto deberías cobrar por cada botella y copa para mantener un margen rentable — según tipo de vino, gama y contexto del restaurante.",
    demoTitle: "Demo del motor de pricing y rentabilidad de Winerim Core",
    demoDesc: "Esta herramienta aplica multiplicadores diferenciados por tipología de vino, rango de precio y perfil de restaurante — una versión simplificada de cómo Winerim ajusta el pricing con datos reales.",
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
    priceRanges: [
      { id: "entry", label: "Entrada", sublabel: "< 8 €" },
      { id: "mid", label: "Gama media", sublabel: "8–20 €" },
      { id: "premium", label: "Premium", sublabel: "20–50 €" },
      { id: "icon", label: "Icónico", sublabel: "> 50 €" },
    ],
    decides: [
      "Qué multiplicador aplicar según tipo de vino, gama y contexto del restaurante",
      "Si tu pricing actual deja margen suficiente por copa y botella",
      "Qué precio de venta es competitivo sin sacrificar rentabilidad",
    ],
    avoids: [
      "Aplicar el mismo multiplicador a toda la carta sin criterio",
      "Tratar champagne y vino tranquilo con la misma lógica de pricing",
      "Fijar precios que no cubren el coste por copa ni la merma",
    ],
    impact: [
      "Mejora del margen bruto medio entre un 5-15%",
      "Reducción de la percepción de 'caro' con escaleras de precio correctas",
      "Pricing alineado con el posicionamiento real del restaurante",
    ],
    inputTitle: "Datos de tu vino", wineCatLabel: "Tipo de vino", contextLabel: "Contexto del restaurante", contextHint: "Ajusta el multiplicador según tu perfil",
    costLabel: "Precio de compra (€)", costUnit: "€/botella", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Precio actual en carta (€)", currentPriceOpt: "opcional", currentPricePlaceholder: "Deja vacío si no aplica",
    glassesLabel: "Copas por botella", glassesUnit: "copas",
    multLabel: "Multiplicador (×)", autoRange: "Rango detectado", baseMult: "Base", contextAdj: "Ajuste contexto",
    resultsTitle: "Resultados",
    pvpBottle: "PVP recomendado botella", pvpGlass: "PVP recomendado copa",
    grossMargin: "Margen bruto por botella", marginPct: "de margen",
    costPerGlass: "Coste por copa", glassesToCover: "Copas para cubrir coste", ofTotal: "De {n} copas totales",
    compareLabel: "Comparativa con tu precio actual", yourPrice: "Tu precio", recommended: "Recomendado", yourMargin: "Tu margen actual",
    deviationLabel: "Desviación",
    execTitle: "Lectura ejecutiva",
    pricingGuide: "Guía de pricing", pricingTitle: "Cómo calcular el precio del vino en un", pricingTitleHighlight: "restaurante",
    multMethodTitle: "El método del multiplicador",
    multMethodDesc: "El sistema más extendido en hostelería consiste en multiplicar el precio de compra por un factor fijo. Es sencillo, pero aplicarlo sin matices genera desequilibrios en la carta.",
    ranges: [
      { range: "Vinos de entrada", mult: "×3 – ×4", note: "Mayor margen % porque el precio absoluto es bajo" },
      { range: "Vinos de gama media", mult: "×2.5 – ×3", note: "Equilibrio entre margen y percepción de precio" },
      { range: "Vinos premium", mult: "×2 – ×2.5", note: "Menor margen % para mantener precios competitivos" },
    ],
    glassRuleTitle: "La regla de la copa",
    glassRuleDesc: "El precio de una copa de vino debería ser suficiente para que las 2-3 primeras copas vendidas cubran el coste de la botella completa. Así, aunque se pierdan 1-2 copas por merma, la operación sigue siendo rentable.",
    errorsTitle: "Errores comunes de pricing",
    errors: ["Usar el mismo multiplicador para todos los vinos", "No diferenciar entre tranquilo, espumoso y fortificado", "No tener escalera de precios progresiva", "Fijar precios sin considerar el contexto del restaurante"],
    ctaBadge: "Winerim Core", ctaTitle: "Esta calculadora es solo el", ctaTitleHighlight: "principio",
    ctaDesc: "Winerim Core analiza el pricing, los márgenes, la rotación y la arquitectura completa de tu carta — con 26 módulos especializados que trabajan con tus datos reales, no con fórmulas genéricas.",
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
    demoDesc: "This tool applies differentiated multipliers by wine category, price range and restaurant profile — a simplified version of how Winerim adjusts pricing with real data.",
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
    priceRanges: [
      { id: "entry", label: "Entry-level", sublabel: "< €8" },
      { id: "mid", label: "Mid-range", sublabel: "€8–20" },
      { id: "premium", label: "Premium", sublabel: "€20–50" },
      { id: "icon", label: "Iconic", sublabel: "> €50" },
    ],
    decides: [
      "Which multiplier to apply based on wine type, range and restaurant context",
      "Whether your current pricing leaves enough margin per glass and bottle",
      "What selling price is competitive without sacrificing profitability",
    ],
    avoids: [
      "Applying the same multiplier across the entire list",
      "Treating champagne and still wine with the same pricing logic",
      "Setting prices that don't cover the cost per glass or waste",
    ],
    impact: [
      "Average gross margin improvement of 5-15%",
      "Reduced perception of 'expensive' with proper price ladders",
      "Pricing aligned with the restaurant's actual positioning",
    ],
    inputTitle: "Your wine data", wineCatLabel: "Wine type", contextLabel: "Restaurant context", contextHint: "Adjusts the multiplier to your profile",
    costLabel: "Purchase price (€)", costUnit: "€/bottle", costMin: "€1", costMax: "€100",
    currentPriceLabel: "Current list price (€)", currentPriceOpt: "optional", currentPricePlaceholder: "Leave empty if not applicable",
    glassesLabel: "Glasses per bottle", glassesUnit: "glasses",
    multLabel: "Multiplier (×)", autoRange: "Detected range", baseMult: "Base", contextAdj: "Context adjustment",
    resultsTitle: "Results",
    pvpBottle: "Recommended bottle price", pvpGlass: "Recommended glass price",
    grossMargin: "Gross margin per bottle", marginPct: "margin",
    costPerGlass: "Cost per glass", glassesToCover: "Glasses to cover cost", ofTotal: "Of {n} total glasses",
    compareLabel: "Comparison with your current price", yourPrice: "Your price", recommended: "Recommended", yourMargin: "Your current margin",
    deviationLabel: "Deviation",
    execTitle: "Executive reading",
    pricingGuide: "Pricing guide", pricingTitle: "How to calculate wine pricing in a", pricingTitleHighlight: "restaurant",
    multMethodTitle: "The multiplier method",
    multMethodDesc: "The most widespread system in hospitality involves multiplying the purchase price by a fixed factor. It's simple, but applying it without nuance creates imbalances in the list.",
    ranges: [
      { range: "Entry-level wines", mult: "×3 – ×4", note: "Higher margin % because the absolute price is low" },
      { range: "Mid-range wines", mult: "×2.5 – ×3", note: "Balance between margin and price perception" },
      { range: "Premium wines", mult: "×2 – ×2.5", note: "Lower margin % to keep prices competitive" },
    ],
    glassRuleTitle: "The glass rule",
    glassRuleDesc: "The price of a glass of wine should be enough so that the first 2-3 glasses sold cover the cost of the entire bottle. This way, even if 1-2 glasses are lost to waste, the operation remains profitable.",
    errorsTitle: "Common pricing mistakes",
    errors: ["Using the same multiplier for all wines", "Not differentiating between still, sparkling and fortified", "No progressive price ladder", "Setting prices without considering restaurant context"],
    ctaBadge: "Winerim Core", ctaTitle: "This calculator is just the", ctaTitleHighlight: "beginning",
    ctaDesc: "Winerim Core analyses pricing, margins, rotation and the full architecture of your wine list — with 26 specialised modules that work with your real data, not generic formulas.",
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
    demoDesc: "Questo strumento applica moltiplicatori differenziati per tipologia di vino, fascia di prezzo e profilo del ristorante — una versione semplificata di come Winerim regola il pricing con dati reali.",
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
    priceRanges: [
      { id: "entry", label: "Ingresso", sublabel: "< 8 €" },
      { id: "mid", label: "Gamma media", sublabel: "8–20 €" },
      { id: "premium", label: "Premium", sublabel: "20–50 €" },
      { id: "icon", label: "Iconico", sublabel: "> 50 €" },
    ],
    decides: [
      "Quale moltiplicatore applicare in base al tipo di vino, gamma e contesto del ristorante",
      "Se il tuo pricing attuale lascia margine sufficiente per calice e bottiglia",
      "Quale prezzo di vendita è competitivo senza sacrificare la redditività",
    ],
    avoids: [
      "Applicare lo stesso moltiplicatore a tutta la carta",
      "Trattare champagne e vino fermo con la stessa logica di pricing",
      "Fissare prezzi che non coprono il costo per calice né le perdite",
    ],
    impact: [
      "Miglioramento del margine lordo medio tra il 5-15%",
      "Riduzione della percezione di 'caro' con scale di prezzo corrette",
      "Pricing allineato con il posizionamento reale del ristorante",
    ],
    inputTitle: "Dati del tuo vino", wineCatLabel: "Tipo di vino", contextLabel: "Contesto del ristorante", contextHint: "Regola il moltiplicatore secondo il tuo profilo",
    costLabel: "Prezzo d'acquisto (€)", costUnit: "€/bottiglia", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Prezzo attuale in carta (€)", currentPriceOpt: "opzionale", currentPricePlaceholder: "Lascia vuoto se non applicabile",
    glassesLabel: "Calici per bottiglia", glassesUnit: "calici",
    multLabel: "Moltiplicatore (×)", autoRange: "Fascia rilevata", baseMult: "Base", contextAdj: "Regolazione contesto",
    resultsTitle: "Risultati",
    pvpBottle: "Prezzo consigliato bottiglia", pvpGlass: "Prezzo consigliato calice",
    grossMargin: "Margine lordo per bottiglia", marginPct: "di margine",
    costPerGlass: "Costo per calice", glassesToCover: "Calici per coprire il costo", ofTotal: "Di {n} calici totali",
    compareLabel: "Confronto con il tuo prezzo attuale", yourPrice: "Il tuo prezzo", recommended: "Consigliato", yourMargin: "Il tuo margine attuale",
    deviationLabel: "Deviazione",
    execTitle: "Lettura esecutiva",
    pricingGuide: "Guida al pricing", pricingTitle: "Come calcolare il prezzo del vino in un", pricingTitleHighlight: "ristorante",
    multMethodTitle: "Il metodo del moltiplicatore",
    multMethodDesc: "Il sistema più diffuso nella ristorazione consiste nel moltiplicare il prezzo d'acquisto per un fattore fisso. È semplice, ma applicarlo senza sfumature genera squilibri nella carta.",
    ranges: [
      { range: "Vini d'ingresso", mult: "×3 – ×4", note: "Margine % maggiore perché il prezzo assoluto è basso" },
      { range: "Vini di gamma media", mult: "×2.5 – ×3", note: "Equilibrio tra margine e percezione del prezzo" },
      { range: "Vini premium", mult: "×2 – ×2.5", note: "Margine % inferiore per mantenere prezzi competitivi" },
    ],
    glassRuleTitle: "La regola del calice",
    glassRuleDesc: "Il prezzo di un calice di vino dovrebbe essere sufficiente affinché i primi 2-3 calici venduti coprano il costo dell'intera bottiglia.",
    errorsTitle: "Errori comuni di pricing",
    errors: ["Usare lo stesso moltiplicatore per tutti i vini", "Non differenziare tra fermo, spumante e fortificato", "Non avere una scala di prezzi progressiva", "Fissare i prezzi senza considerare il contesto del ristorante"],
    ctaBadge: "Winerim Core", ctaTitle: "Questo calcolatore è solo l'", ctaTitleHighlight: "inizio",
    ctaDesc: "Winerim Core analizza pricing, margini, rotazione e l'architettura completa della tua carta — con 26 moduli specializzati che lavorano con i tuoi dati reali.",
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
    demoDesc: "Cet outil applique des multiplicateurs différenciés par catégorie de vin, gamme de prix et profil de restaurant — une version simplifiée de la façon dont Winerim ajuste le pricing avec des données réelles.",
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
    priceRanges: [
      { id: "entry", label: "Entrée de gamme", sublabel: "< 8 €" },
      { id: "mid", label: "Milieu de gamme", sublabel: "8–20 €" },
      { id: "premium", label: "Premium", sublabel: "20–50 €" },
      { id: "icon", label: "Iconique", sublabel: "> 50 €" },
    ],
    decides: [
      "Quel multiplicateur appliquer selon le type de vin, la gamme et le contexte du restaurant",
      "Si votre pricing actuel laisse assez de marge par verre et bouteille",
      "Quel prix de vente est compétitif sans sacrifier la rentabilité",
    ],
    avoids: [
      "Appliquer le même multiplicateur à toute la carte",
      "Traiter le champagne et le vin tranquille avec la même logique de pricing",
      "Fixer des prix qui ne couvrent pas le coût par verre ni la perte",
    ],
    impact: [
      "Amélioration de la marge brute moyenne de 5 à 15%",
      "Réduction de la perception de 'cher' avec des échelles de prix correctes",
      "Pricing aligné avec le positionnement réel du restaurant",
    ],
    inputTitle: "Données de votre vin", wineCatLabel: "Type de vin", contextLabel: "Contexte du restaurant", contextHint: "Ajuste le multiplicateur selon votre profil",
    costLabel: "Prix d'achat (€)", costUnit: "€/bouteille", costMin: "1 €", costMax: "100 €",
    currentPriceLabel: "Prix actuel en carte (€)", currentPriceOpt: "optionnel", currentPricePlaceholder: "Laissez vide si non applicable",
    glassesLabel: "Verres par bouteille", glassesUnit: "verres",
    multLabel: "Multiplicateur (×)", autoRange: "Gamme détectée", baseMult: "Base", contextAdj: "Ajustement contexte",
    resultsTitle: "Résultats",
    pvpBottle: "Prix de vente recommandé bouteille", pvpGlass: "Prix de vente recommandé verre",
    grossMargin: "Marge brute par bouteille", marginPct: "de marge",
    costPerGlass: "Coût par verre", glassesToCover: "Verres pour couvrir le coût", ofTotal: "Sur {n} verres au total",
    compareLabel: "Comparaison avec votre prix actuel", yourPrice: "Votre prix", recommended: "Recommandé", yourMargin: "Votre marge actuelle",
    deviationLabel: "Écart",
    execTitle: "Lecture exécutive",
    pricingGuide: "Guide de pricing", pricingTitle: "Comment calculer le prix du vin dans un", pricingTitleHighlight: "restaurant",
    multMethodTitle: "La méthode du multiplicateur",
    multMethodDesc: "Le système le plus répandu en restauration consiste à multiplier le prix d'achat par un facteur fixe. C'est simple, mais l'appliquer sans nuance crée des déséquilibres dans la carte.",
    ranges: [
      { range: "Vins d'entrée de gamme", mult: "×3 – ×4", note: "Marge % plus élevée car le prix absolu est bas" },
      { range: "Vins milieu de gamme", mult: "×2.5 – ×3", note: "Équilibre entre marge et perception du prix" },
      { range: "Vins premium", mult: "×2 – ×2.5", note: "Marge % plus faible pour maintenir des prix compétitifs" },
    ],
    glassRuleTitle: "La règle du verre",
    glassRuleDesc: "Le prix d'un verre de vin devrait être suffisant pour que les 2-3 premiers verres vendus couvrent le coût de la bouteille entière.",
    errorsTitle: "Erreurs courantes de pricing",
    errors: ["Utiliser le même multiplicateur pour tous les vins", "Ne pas différencier entre tranquille, effervescent et fortifié", "Pas d'échelle de prix progressive", "Fixer les prix sans considérer le contexte du restaurant"],
    ctaBadge: "Winerim Core", ctaTitle: "Ce calculateur n'est que le", ctaTitleHighlight: "début",
    ctaDesc: "Winerim Core analyse le pricing, les marges, la rotation et l'architecture complète de votre carte — avec 26 modules spécialisés qui travaillent avec vos données réelles.",
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
  yourMargin: string; target: string; aboveTarget: string; belowTarget: string; adjustUp: string; adjustDown: string; healthy: string;
  execHealthy: (cat: string, ctx: string) => string;
  execLow: (cat: string, priceDiff: string) => string;
  execCritical: (cat: string, margin: string) => string;
  execAbove: (diff: string) => string;
}> = {
  es: {
    title: "Diagnóstico Winerim", health: "Salud del margen", deviation: "Desviación vs recomendado", advice: "Recomendación",
    optimal: "Óptimo", low: "Bajo", critical: "Crítico",
    yourMargin: "Tu margen", target: "Objetivo",
    aboveTarget: "Tu precio está por encima del recomendado. Verifica que la percepción del comensal no penalice la rotación.",
    belowTarget: "Tu precio está por debajo del recomendado. Estás dejando margen sobre la mesa.",
    adjustUp: "Sube el precio gradualmente (1-2 €) y mide el impacto en rotación durante 2 semanas.",
    adjustDown: "El margen actual es saludable. Mantén el precio y revisa trimestralmente.",
    healthy: "Margen alineado con el tipo de vino. Sin acción inmediata necesaria.",
    execHealthy: (cat, ctx) => `El pricing de este ${cat} está bien calibrado para un contexto ${ctx}. El margen se encuentra dentro del rango objetivo para esta tipología. Mantén y revisa trimestralmente.`,
    execLow: (cat, priceDiff) => `Este ${cat} está dejando ${priceDiff} € de margen potencial sin capturar. El multiplicador actual es inferior al recomendado para esta tipología y gama. Ajuste recomendado: sube el PVP progresivamente y mide la rotación durante 2-3 semanas.`,
    execCritical: (cat, margin) => `Alerta: el margen de este ${cat} es del ${margin}%, muy por debajo del rango objetivo. A este nivel, la operación no cubre costes operativos. Acción urgente: revisa el PVP o sustituye la referencia por una con mejor ratio coste-percepción.`,
    execAbove: (diff) => `Tu precio actual está ${diff} € por encima del recomendado. Esto puede frenar la rotación y generar percepción de sobreprecio. Si la referencia rota bien, mantén; si no, ajusta a la baja.`,
  },
  en: {
    title: "Winerim Diagnosis", health: "Margin health", deviation: "Deviation vs recommended", advice: "Recommendation",
    optimal: "Optimal", low: "Low", critical: "Critical",
    yourMargin: "Your margin", target: "Target",
    aboveTarget: "Your price is above recommended. Check that guest perception isn't penalising rotation.",
    belowTarget: "Your price is below recommended. You're leaving margin on the table.",
    adjustUp: "Raise price gradually (€1-2) and measure rotation impact over 2 weeks.",
    adjustDown: "Current margin is healthy. Maintain price and review quarterly.",
    healthy: "Margin aligned with wine type. No immediate action needed.",
    execHealthy: (cat, ctx) => `The pricing of this ${cat} is well-calibrated for a ${ctx} context. Margin is within the target range for this category. Maintain and review quarterly.`,
    execLow: (cat, priceDiff) => `This ${cat} is leaving €${priceDiff} of potential margin uncaptured. The current multiplier is below recommended for this category and range. Recommended: raise PVP progressively and measure rotation over 2-3 weeks.`,
    execCritical: (cat, margin) => `Alert: the margin on this ${cat} is ${margin}%, well below the target range. At this level, the operation doesn't cover operating costs. Urgent action: review PVP or replace with a reference with better cost-perception ratio.`,
    execAbove: (diff) => `Your current price is €${diff} above recommended. This may slow rotation and create a perception of overpricing. If rotation is strong, maintain; otherwise, adjust downward.`,
  },
  it: {
    title: "Diagnosi Winerim", health: "Salute del margine", deviation: "Deviazione vs consigliato", advice: "Raccomandazione",
    optimal: "Ottimale", low: "Basso", critical: "Critico",
    yourMargin: "Il tuo margine", target: "Obiettivo",
    aboveTarget: "Il tuo prezzo è sopra il consigliato. Verifica che la percezione del cliente non penalizzi la rotazione.",
    belowTarget: "Il tuo prezzo è sotto il consigliato. Stai lasciando margine sul tavolo.",
    adjustUp: "Alza il prezzo gradualmente (1-2 €) e misura l'impatto sulla rotazione per 2 settimane.",
    adjustDown: "Il margine attuale è sano. Mantieni il prezzo e rivedi trimestralmente.",
    healthy: "Margine allineato al tipo di vino. Nessuna azione immediata necessaria.",
    execHealthy: (cat, ctx) => `Il pricing di questo ${cat} è ben calibrato per un contesto ${ctx}. Il margine è nel range obiettivo. Mantieni e rivedi trimestralmente.`,
    execLow: (cat, priceDiff) => `Questo ${cat} sta lasciando ${priceDiff} € di margine potenziale non catturato. Regolazione raccomandata: alza il PVP progressivamente.`,
    execCritical: (cat, margin) => `Allerta: il margine di questo ${cat} è del ${margin}%, molto sotto il range obiettivo. Azione urgente necessaria.`,
    execAbove: (diff) => `Il tuo prezzo attuale è ${diff} € sopra il consigliato. Verifica l'impatto sulla rotazione.`,
  },
  fr: {
    title: "Diagnostic Winerim", health: "Santé de la marge", deviation: "Écart vs recommandé", advice: "Recommandation",
    optimal: "Optimal", low: "Bas", critical: "Critique",
    yourMargin: "Votre marge", target: "Objectif",
    aboveTarget: "Votre prix est au-dessus du recommandé. Vérifiez que la perception client ne pénalise pas la rotation.",
    belowTarget: "Votre prix est en dessous du recommandé. Vous laissez de la marge sur la table.",
    adjustUp: "Augmentez le prix progressivement (1-2 €) et mesurez l'impact sur la rotation pendant 2 semaines.",
    adjustDown: "La marge actuelle est saine. Maintenez le prix et révisez trimestriellement.",
    healthy: "Marge alignée avec le type de vin. Aucune action immédiate nécessaire.",
    execHealthy: (cat, ctx) => `Le pricing de ce ${cat} est bien calibré pour un contexte ${ctx}. La marge est dans la plage cible. Maintenez et révisez trimestriellement.`,
    execLow: (cat, priceDiff) => `Ce ${cat} laisse ${priceDiff} € de marge potentielle non capturée. Ajustement recommandé : augmentez le PVP progressivement.`,
    execCritical: (cat, margin) => `Alerte : la marge de ce ${cat} est de ${margin}%, bien en dessous de la plage cible. Action urgente nécessaire.`,
    execAbove: (diff) => `Votre prix actuel est ${diff} € au-dessus du recommandé. Vérifiez l'impact sur la rotation.`,
  },
};

/* ─── Component ─── */
const CalculadoraMargen = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;
  const dl = execI18n[lang] || execI18n.es;

  const [wineCat, setWineCat] = useState<WineCat>("still");
  const [restCtx, setRestCtx] = useState<RestCtx>("casual");
  const [costPrice, setCostPrice] = useState(12);
  const [glassesPerBottle, setGlassesPerBottle] = useState(5);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const tracked = useRef(false);

  const autoRange = useMemo(() => detectRange(costPrice), [costPrice]);
  const suggestedMult = useMemo(() => getMultiplier(wineCat, autoRange, restCtx), [wineCat, autoRange, restCtx]);
  const [multiplier, setMultiplier] = useState(suggestedMult);

  // Sync multiplier when inputs change
  useEffect(() => {
    setMultiplier(suggestedMult);
  }, [suggestedMult]);

  const handleInteraction = () => {
    if (!tracked.current) { tracked.current = true; trackAction("tool_use", "tool", "calculadora-margen"); }
  };

  const results = useMemo(() => {
    const bottlePrice = costPrice * multiplier;
    const glassPrice = bottlePrice / glassesPerBottle;
    const grossMargin = bottlePrice - costPrice;
    const marginPercent = costPrice > 0 ? (grossMargin / bottlePrice) * 100 : 0;
    const costPerGlass = costPrice / glassesPerBottle;
    const breakEvenGlasses = glassPrice > 0 ? Math.ceil(costPrice / glassPrice) : 0;

    let currentMargin: number | null = null;
    let currentMarginPct: number | null = null;
    let priceDiff: number | null = null;
    let currentMult: number | null = null;
    if (currentPrice && currentPrice > 0) {
      currentMargin = currentPrice - costPrice;
      currentMarginPct = (currentMargin / currentPrice) * 100;
      priceDiff = bottlePrice - currentPrice;
      currentMult = costPrice > 0 ? currentPrice / costPrice : null;
    }

    return { bottlePrice, glassPrice, grossMargin, marginPercent, costPerGlass, breakEvenGlasses, currentMargin, currentMarginPct, priceDiff, currentMult };
  }, [costPrice, glassesPerBottle, multiplier, currentPrice]);

  // Diagnostic logic
  const targetMargin = autoRange === "entry" ? 72 : autoRange === "mid" ? 65 : autoRange === "premium" ? 55 : 45;
  const marginDelta = results.marginPercent - targetMargin;
  const marginHealth = results.marginPercent >= (targetMargin - 2) ? "optimal" : results.marginPercent >= (targetMargin - 15) ? "low" : "critical";
  const healthColor = marginHealth === "optimal" ? "text-emerald-500" : marginHealth === "low" ? "text-amber-500" : "text-destructive";
  const healthBg = marginHealth === "optimal" ? "bg-emerald-500/10" : marginHealth === "low" ? "bg-amber-500/10" : "bg-destructive/10";
  const healthLabel = marginHealth === "optimal" ? dl.optimal : marginHealth === "low" ? dl.low : dl.critical;

  const catLabel = t.wineCategories.find(c => c.id === wineCat)?.label || "";
  const ctxLabel = t.restaurantContexts.find(c => c.id === restCtx)?.label || "";

  const execReading = useMemo(() => {
    if (marginHealth === "critical") return dl.execCritical(catLabel, results.marginPercent.toFixed(0));
    if (currentPrice && results.priceDiff !== null) {
      if (results.priceDiff > 3) return dl.execAbove(results.priceDiff.toFixed(2));
      if (results.priceDiff < -2) return dl.execLow(catLabel, Math.abs(results.priceDiff).toFixed(2));
    }
    if (marginHealth === "low") return dl.execLow(catLabel, (results.bottlePrice - (currentPrice || results.bottlePrice)).toFixed(2));
    return dl.execHealthy(catLabel, ctxLabel);
  }, [marginHealth, currentPrice, results, catLabel, ctxLabel, dl]);

  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "calc-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Cómo se calcula el precio de venta del vino en un restaurante?", acceptedAnswer: { "@type": "Answer", text: "Se multiplica el precio de compra por un factor diferenciado según tipo de vino, gama y contexto del restaurante." } },
        { "@type": "Question", name: "¿Cuál es el margen habitual del vino en hostelería?", acceptedAnswer: { "@type": "Answer", text: "El margen bruto del vino en restaurantes suele estar entre el 60% y el 75%, variando según la tipología." } },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("calc-jsonld")?.remove(); };
  }, []);

  const rangeLabel = t.priceRanges.find(r => r.id === autoRange);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url="https://winerim.wine/calculadora-margen-vino" />
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
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-wine" /> {t.inputTitle}
              </h2>
              <div className="space-y-6">
                {/* Wine category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.wineCatLabel}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {t.wineCategories.map((w) => (
                      <button key={w.id} onClick={() => { setWineCat(w.id); handleInteraction(); }}
                        className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all ${wineCat === w.id ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        <span className="text-base">{w.icon}</span>
                        <span className="text-xs leading-tight">{w.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restaurant context */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.contextLabel}</label>
                  <p className="text-[10px] text-muted-foreground mb-2">{t.contextHint}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.restaurantContexts.map((c) => (
                      <button key={c.id} onClick={() => { setRestCtx(c.id); handleInteraction(); }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-sm font-semibold transition-all ${restCtx === c.id ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        <span className="text-base">{c.icon}</span>
                        <span className="text-xs leading-tight">{c.label}</span>
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
                  {/* Auto-detected range */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{t.autoRange}:</span>
                    <span className="inline-flex px-2 py-0.5 rounded-md bg-wine/10 text-wine text-[10px] font-semibold">
                      {rangeLabel?.label} ({rangeLabel?.sublabel})
                    </span>
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
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all placeholder:text-muted-foreground/40 placeholder:text-sm placeholder:font-normal" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                  </div>
                </div>

                {/* Glasses */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.glassesLabel}</label>
                  <div className="flex gap-2">
                    {[4, 5, 6].map((n) => (
                      <button key={n} onClick={() => setGlassesPerBottle(n)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${glassesPerBottle === n ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                        {n} {t.glassesUnit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multiplier */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.multLabel}</label>
                  <div className="flex items-center gap-3 mb-2 text-[10px] text-muted-foreground">
                    <span>{t.baseMult}: ×{BASE_MULTIPLIERS[wineCat][autoRange]}</span>
                    <span className={CONTEXT_ADJUSTMENTS[restCtx] !== 0 ? "text-wine" : ""}>
                      {t.contextAdj}: {CONTEXT_ADJUSTMENTS[restCtx] >= 0 ? "+" : ""}{CONTEXT_ADJUSTMENTS[restCtx]}
                    </span>
                  </div>
                  <input type="range" min={1.2} max={5} step={0.1} value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))} className="w-full accent-[hsl(var(--wine))]" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>×1.2</span>
                    <span className="font-semibold text-wine">×{multiplier.toFixed(1)}</span>
                    <span>×5</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-wine" /> {t.resultsTitle}
              </h2>
              <div className="space-y-3">
                {/* Main results grid */}
                <div className="grid grid-cols-2 gap-3">
                  <ResultCard label={t.pvpBottle} value={`${results.bottlePrice.toFixed(2)} €`} highlight />
                  <ResultCard label={t.pvpGlass} value={`${results.glassPrice.toFixed(2)} €`} highlight />
                  <ResultCard label={t.grossMargin} value={`${results.grossMargin.toFixed(2)} €`} sub={`${results.marginPercent.toFixed(0)}% ${t.marginPct}`} />
                  <ResultCard label={t.costPerGlass} value={`${results.costPerGlass.toFixed(2)} €`} sub={`${results.breakEvenGlasses} ${t.glassesToCover.toLowerCase()}`} />
                </div>

                {/* Comparison with current price */}
                {results.priceDiff !== null && currentPrice && (
                  <div className={`rounded-xl border p-4 ${results.priceDiff > 0 ? "bg-emerald-500/5 border-emerald-500/20" : results.priceDiff < 0 ? "bg-amber-500/5 border-amber-500/20" : "bg-secondary/50 border-border"}`}>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">{t.compareLabel}</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.yourPrice}</p>
                        <p className="font-heading font-bold">{currentPrice.toFixed(2)} €</p>
                        <p className="text-[10px] text-muted-foreground">×{results.currentMult?.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.recommended}</p>
                        <p className="font-heading font-bold text-wine">{results.bottlePrice.toFixed(2)} €</p>
                        <p className="text-[10px] text-muted-foreground">×{multiplier.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.deviationLabel}</p>
                        <p className={`font-heading font-bold ${results.priceDiff! > 0 ? "text-emerald-500" : "text-amber-500"}`}>
                          {results.priceDiff! > 0 ? "+" : ""}{results.priceDiff!.toFixed(2)} €
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {t.yourMargin}: {results.currentMarginPct?.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Winerim Diagnostic Panel ── */}
              <div className="mt-5 rounded-xl border border-amber-500/20 bg-gradient-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500">{dl.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{dl.health}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${healthBg} ${healthColor}`}>{healthLabel}</span>
                    <p className="text-xs text-muted-foreground mt-1">{results.marginPercent.toFixed(0)}% — {dl.target}: {targetMargin}%</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{dl.deviation}</p>
                    <p className={`font-heading text-xl font-bold ${marginDelta >= 0 ? "text-emerald-500" : "text-amber-500"}`}>
                      {marginDelta >= 0 ? "+" : ""}{marginDelta.toFixed(0)}pp
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{dl.yourMargin} vs {dl.target.toLowerCase()}</p>
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
                <div className="pt-3 border-t border-border">
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

const ResultCard = ({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-4 ${highlight ? "bg-wine/5 border-wine/20" : "bg-secondary/50 border-border"}`}>
    <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
    <p className={`font-heading text-lg font-bold ${highlight ? "text-wine" : "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-wine mt-0.5">{sub}</p>}
  </div>
);

export default CalculadoraMargen;
