import { useState, useMemo, useEffect } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, RotateCcw, DollarSign, AlertTriangle, TrendingUp,
  Sparkles, CheckCircle, Layers, Wine, BarChart3, Plus, Trash2,
  ShoppingCart, Info,
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import SummaryBox from "@/components/seo/SummaryBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Types ─── */
type LinkType = "guide" | "resource" | "solution" | "tool" | "decision-center";
type Categoria = "entrada" | "media" | "premium" | "alta";
interface StockItem { nombre: string; unidades: number; costeUnidad: number; diasSinVenta: number; categoria: Categoria }

const emptyItem = (): StockItem => ({ nombre: "", unidades: 1, costeUnidad: 10, diasSinVenta: 90, categoria: "media" });
const OPPORTUNITY_RATE = 0.08;

/* Depreciation rates per category (annual %) — young wines lose freshness faster */
const DEPRECIATION_RATES: Record<Categoria, number> = {
  entrada: 0.15,  // 15%/year — young wines lose freshness quickly
  media: 0.10,    // 10%/year
  premium: 0.05,  // 5%/year — structured wines hold better
  alta: 0.02,     // 2%/year — can appreciate, minimal depreciation
};

/* ─── i18n ─── */
interface LangContent {
  seoTitle: string; seoDesc: string;
  breadTools: string; breadCalc: string; demoBadge: string;
  h1: string; subtitle: string;
  demoTitle: string; demoDesc: string;
  decides: string[]; avoids: string[]; impact: string[];
  catLabels: Record<string, string>;
  refsTitle: string; wineName: string; wineNamePlaceholder: string;
  units: string; costUnit: string; daysSince: string; category: string;
  addRef: string; calculate: string;
  capitalLabel: string; opportunityCost: string; annualized: string;
  sleepingPct: string; generalPriority: string; signalAction: string;
  deadStock: string; deadStockLabel: string;
  slowRotation: string; slowRotationLabel: string;
  alertLabel: string; alertLabelFull: string;
  refs: string; ref: string;
  breakdownCat: string; detailRef: string;
  thWine: string; thUnits: string; thCapital: string; thDays: string; thPriority: string; thRecommendation: string; thDepreciation: string; thCurrentValue: string;
  deprecLabels: { fresh: string; aging: string; declining: string; critical: string };
  priorityLabels: { critical: string; high: string; medium: string; low: string };
  recLabels: { remove: string; glass: string; noRestock: string; boost: string };
  insightHigh: (pct: string, capital: string) => string;
  insightMed: (pct: string, capital: string) => string;
  insightLow: string;
  actionsTitle: string;
  actionDead: (count: number, capital: string) => string;
  actionSlow: (count: number) => string;
  actionCapital: (capital: string) => string;
  actionPreventive: string;
  summaryLabel: string; summaryDef: string; summaryBullets: string[];
  whenTitle: string; whenPoints: string[];
  errorsTitle: string; errorsPoints: string[];
  faqs: { q: string; a: string }[];
  coreCtaLabel: string; coreCtaTitle: string; coreCtaDesc: string; coreCtaSee: string;
  supplyCtaLabel: string; supplyCtaTitle: string; supplyCtaDesc: string; supplyCtaSee: string;
  criticalLabel: string; highLabel: string; controlLabel: string;
  internalLinks: { to: string; label: string; type: LinkType }[];
  interpretTitle: string;
}

const i18n: Record<string, LangContent> = {
  es: {
    seoTitle: "Calculadora de Stock Muerto de Vinos | Demo Winerim Core + Supply",
    seoDesc: "Calcula cuánto capital tienes inmovilizado en vinos sin rotación. Demo del motor de detección de obsolescencia de Winerim Core y Winerim Supply.",
    breadTools: "Herramientas", breadCalc: "Calculadora de stock muerto", demoBadge: "Demo · Winerim Core + Supply",
    h1: "Calculadora de stock muerto", subtitle: "Estima cuánto capital tienes inmovilizado en vinos sin rotación. Identifica qué referencias necesitan acción inmediata.",
    demoTitle: "Detectar stock muerto es solo el principio",
    demoDesc: "Winerim ayuda a cuantificar capital inmovilizado, riesgo de obsolescencia y coste de oportunidad para tomar mejores decisiones de rotación y compra.",
    decides: ["Qué referencias sacar de carta por falta de rotación", "Cuánto capital real tienes inmovilizado y su coste de oportunidad", "Qué vinos impulsar, sacar por copa, retirar o no reponer"],
    avoids: ["Seguir comprando referencias que no se venden", "Inmovilizar capital sin visibilidad del coste real", "Tomar decisiones de compra sin dato de rotación ni prioridad"],
    impact: ["Liberación de capital bloqueado en stock sin rotación", "Reducción del porcentaje de stock dormido por debajo del 15%", "Criterio objetivo para renegociar, retirar o reconvertir referencias"],
    catLabels: { entrada: "Entrada", media: "Gama media", premium: "Premium", alta: "Alta gama" },
    refsTitle: "Referencias con baja o nula rotación", wineName: "Nombre del vino", wineNamePlaceholder: "Ej: Ribera del Duero...",
    units: "Unidades", costUnit: "Coste/ud (€)", daysSince: "Días sin venta", category: "Categoría",
    addRef: "Añadir referencia", calculate: "Calcular impacto",
    capitalLabel: "Capital inmovilizado", opportunityCost: "Coste de oportunidad", annualized: "estimado anualizado (8%)",
    sleepingPct: "% Stock dormido", generalPriority: "Prioridad general", signalAction: "señal de acción",
    deadStock: "Stock muerto", deadStockLabel: "Stock muerto (> 6 meses)", slowRotation: "Rotación lenta", slowRotationLabel: "Rotación lenta (3-6 meses)",
    alertLabel: "En alerta", alertLabelFull: "En alerta (< 3 meses)",
    refs: "referencia(s)", ref: "refs",
    breakdownCat: "Desglose por categoría", detailRef: "Detalle por referencia",
    thWine: "Vino", thUnits: "Uds", thCapital: "Capital", thDays: "Días", thPriority: "Prioridad", thRecommendation: "Recomendación", thDepreciation: "Depreciación", thCurrentValue: "Valor actual est.",
    deprecLabels: { fresh: "Fresco", aging: "Envejeciendo", declining: "En declive", critical: "Deterioro" },
    priorityLabels: { critical: "Crítica", high: "Alta", medium: "Media", low: "Baja" },
    recLabels: { remove: "Retirar de carta", glass: "Sacar por copa", noRestock: "No reponer", boost: "Impulsar venta" },
    insightHigh: (pct, capital) => `Más del 30% de tus referencias analizadas están dormidas. Esto sugiere un problema de compra o de arquitectura de carta. Winerim Core detecta estas situaciones automáticamente y Winerim Supply ayuda a decidir qué no reponer.`,
    insightMed: (pct, capital) => `Tienes un ${pct}% de stock dormido. Es un nivel habitual pero mejorable. Una revisión de las referencias marcadas como "No reponer" puede liberar ${capital} de capital.`,
    insightLow: "Tu stock dormido está por debajo del 15%. Buen nivel de rotación. Mantén la revisión periódica para que no se acumule.",
    actionsTitle: "Acciones recomendadas",
    actionDead: (count, capital) => `${count} referencia(s) con más de 6 meses sin venderse (${capital} inmovilizados). Acción: ofrecerlas por copa, en menú degustación o negociar devolución.`,
    actionSlow: (count) => `${count} referencia(s) con rotación lenta (3-6 meses). Considéralas para promociones o reubicación como recomendación del chef.`,
    actionCapital: (capital) => `Tienes ${capital} en stock de baja rotación. Revisa los criterios de compra y establece límites de stock máximo por referencia.`,
    actionPreventive: "Implementa una revisión trimestral de rotación para detectar vinos muertos antes de que acumulen meses sin movimiento.",
    summaryLabel: "Qué es el stock muerto", summaryDef: "El stock muerto son las botellas de vino que llevan más de 90 días sin venderse. Representan capital inmovilizado que no genera retorno, ocupa espacio en bodega y puede deteriorarse con el tiempo.",
    summaryBullets: [
      "Alerta (30-90 días): la referencia necesita atención pero aún puede recuperarse",
      "Rotación lenta (90-180 días): considerar promociones, copa o reubicación",
      "Stock muerto (> 180 días): acción urgente: liquidar, devolver o eliminar",
      "Riesgo de deterioro: los vinos jóvenes sin crianza pierden frescura con el tiempo",
    ],
    whenTitle: "Cuándo usar esta calculadora", whenPoints: ["Antes de hacer un pedido al distribuidor", "En la revisión trimestral de bodega", "Cuando la inversión en stock crezca sin que crezcan las ventas", "Al preparar el cierre fiscal"],
    errorsTitle: "Errores comunes", errorsPoints: ["No contabilizar el stock muerto como coste real", "Comprar más sin haber movido lo acumulado", "Esperar a que un vino se venda solo", "No establecer límites de stock por referencia"],
    faqs: [
      { q: "¿A partir de cuántos días se considera stock muerto?", a: "El criterio habitual es 90 días sin venta para rotación lenta y 180 días para stock muerto." },
      { q: "¿Qué puedo hacer con los vinos muertos?", a: "Ofrecerlos por copa a precio especial, incluirlos en menús degustación, negociar devolución con el proveedor, venderlos en eventos de liquidación o donarlos." },
      { q: "¿Cuánto stock debería tener un restaurante?", a: "El stock debería poder rotarse completamente en 60-90 días." },
      { q: "¿Los datos se envían a algún servidor?", a: "No. Todo el cálculo se realiza en tu navegador." },
    ],
    coreCtaLabel: "Winerim Core", coreCtaTitle: "Detección automática de obsolescencia",
    coreCtaDesc: "Winerim Core monitoriza la rotación de cada referencia, detecta stock muerto automáticamente y genera alertas antes de que el capital se inmovilice.",
    coreCtaSee: "Ver Winerim Core",
    supplyCtaLabel: "Winerim Supply", supplyCtaTitle: "Decisiones de compra con criterio",
    supplyCtaDesc: "Winerim Supply ayuda a decidir qué no reponer, qué renegociar con el distribuidor y qué referencias sustituir para liberar capital y mejorar la rotación.",
    supplyCtaSee: "Ver Winerim Supply",
    criticalLabel: "Crítica", highLabel: "Alta", controlLabel: "Bajo control",
    interpretTitle: "Cómo interpretar los resultados",
    internalLinks: [
      { to: "/recursos/checklist-deteccion-vinos-muertos", label: "Checklist de detección de vinos muertos", type: "resource" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: inteligencia de compras", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core: detección de obsolescencia", type: "solution" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center: stock y rotación", type: "decision-center" },
      { to: "/precios", label: "Planes y precios", type: "solution" },
      { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
    ],
  },
  en: {
    seoTitle: "Dead Stock Wine Calculator | Winerim Core + Supply Demo",
    seoDesc: "Calculate how much capital you have tied up in non-rotating wines. Demo of Winerim Core's obsolescence detection engine and Winerim Supply.",
    breadTools: "Tools", breadCalc: "Dead stock calculator", demoBadge: "Demo · Winerim Core + Supply",
    h1: "Dead stock calculator", subtitle: "Estimate how much capital you have tied up in non-rotating wines. Identify which references need immediate action.",
    demoTitle: "Detecting dead stock is just the beginning",
    demoDesc: "Winerim helps quantify tied-up capital, obsolescence risk and opportunity cost to make better rotation and purchasing decisions.",
    decides: ["Which references to remove from the list due to lack of rotation", "How much real capital you have tied up and its opportunity cost", "Which wines to boost, serve by the glass, remove or stop restocking"],
    avoids: ["Continuing to buy references that don't sell", "Tying up capital without visibility of the real cost", "Making purchasing decisions without rotation data or priority"],
    impact: ["Release of capital blocked in non-rotating stock", "Reduction of sleeping stock percentage below 15%", "Objective criteria for renegotiating, removing or converting references"],
    catLabels: { entrada: "Entry-level", media: "Mid-range", premium: "Premium", alta: "High-end" },
    refsTitle: "References with low or no rotation", wineName: "Wine name", wineNamePlaceholder: "E.g.: Brunello di Montalcino...",
    units: "Units", costUnit: "Cost/unit (€)", daysSince: "Days without sale", category: "Category",
    addRef: "Add reference", calculate: "Calculate impact",
    capitalLabel: "Tied-up capital", opportunityCost: "Opportunity cost", annualized: "annualised estimate (8%)",
    sleepingPct: "% Sleeping stock", generalPriority: "Overall priority", signalAction: "action signal",
    deadStock: "Dead stock", deadStockLabel: "Dead stock (> 6 months)", slowRotation: "Slow rotation", slowRotationLabel: "Slow rotation (3-6 months)",
    alertLabel: "Alert", alertLabelFull: "Alert (< 3 months)",
    refs: "reference(s)", ref: "refs",
    breakdownCat: "Breakdown by category", detailRef: "Detail by reference",
    thWine: "Wine", thUnits: "Units", thCapital: "Capital", thDays: "Days", thPriority: "Priority", thRecommendation: "Recommendation",
    priorityLabels: { critical: "Critical", high: "High", medium: "Medium", low: "Low" },
    recLabels: { remove: "Remove from list", glass: "Serve by the glass", noRestock: "Do not restock", boost: "Boost sales" },
    insightHigh: () => `Over 30% of your analysed references are sleeping. This suggests a purchasing or list architecture problem. Winerim Core detects these situations automatically and Winerim Supply helps decide what not to restock.`,
    insightMed: (pct, capital) => `You have ${pct}% sleeping stock. This is a common but improvable level. Reviewing references marked "Do not restock" could free up ${capital} in capital.`,
    insightLow: "Your sleeping stock is below 15%. Good rotation level. Maintain periodic reviews to prevent accumulation.",
    actionsTitle: "Recommended actions",
    actionDead: (count, capital) => `${count} reference(s) unsold for over 6 months (${capital} tied up). Action: offer by the glass, in tasting menus or negotiate returns.`,
    actionSlow: (count) => `${count} reference(s) with slow rotation (3-6 months). Consider promotions or repositioning as chef's recommendation.`,
    actionCapital: (capital) => `You have ${capital} in low-rotation stock. Review purchasing criteria and set maximum stock limits per reference.`,
    actionPreventive: "Implement a quarterly rotation review to detect dead wines before they accumulate months without movement.",
    summaryLabel: "What is dead stock", summaryDef: "Dead stock refers to wine bottles unsold for over 90 days. They represent tied-up capital that generates no return, takes up cellar space and may deteriorate over time.",
    summaryBullets: [
      "Alert (30-90 days): reference needs attention but can still recover",
      "Slow rotation (90-180 days): consider promotions, by-the-glass or repositioning",
      "Dead stock (> 180 days): urgent action: liquidate, return or remove",
      "Deterioration risk: young wines without ageing potential lose freshness over time",
    ],
    whenTitle: "When to use this calculator", whenPoints: ["Before placing a distributor order", "During quarterly cellar review", "When stock investment grows without sales growth", "When preparing year-end accounts"],
    errorsTitle: "Common mistakes", errorsPoints: ["Not accounting for dead stock as a real cost", "Buying more without moving accumulated stock", "Waiting for a wine to sell itself", "Not setting stock limits per reference"],
    faqs: [
      { q: "After how many days is wine considered dead stock?", a: "The usual criteria is 90 days without sale for slow rotation and 180 days for dead stock." },
      { q: "What can I do with dead stock wines?", a: "Offer them by the glass at a special price, include them in tasting menus, negotiate returns with the supplier, sell at clearance events or donate." },
      { q: "How much stock should a restaurant hold?", a: "Stock should be able to rotate completely within 60-90 days." },
      { q: "Is any data sent to a server?", a: "No. All calculations are performed in your browser." },
    ],
    coreCtaLabel: "Winerim Core", coreCtaTitle: "Automatic obsolescence detection",
    coreCtaDesc: "Winerim Core monitors the rotation of every reference, automatically detects dead stock and generates alerts before capital is tied up.",
    coreCtaSee: "See Winerim Core",
    supplyCtaLabel: "Winerim Supply", supplyCtaTitle: "Data-driven purchasing decisions",
    supplyCtaDesc: "Winerim Supply helps decide what not to restock, what to renegotiate with distributors and which references to replace to free capital and improve rotation.",
    supplyCtaSee: "See Winerim Supply",
    criticalLabel: "Critical", highLabel: "High", controlLabel: "Under control",
    interpretTitle: "How to interpret the results",
    internalLinks: [
      { to: "/recursos/checklist-deteccion-vinos-muertos", label: "Dead wine detection checklist", type: "resource" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Smart purchasing calculator", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: purchasing intelligence", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core: obsolescence detection", type: "solution" },
      { to: "/precios", label: "Plans & pricing", type: "solution" },
      { to: "/demo", label: "Request free demo", type: "solution" },
    ],
  },
  it: {
    seoTitle: "Calcolatore Stock Morto Vini | Demo Winerim Core + Supply",
    seoDesc: "Calcola quanto capitale hai immobilizzato in vini senza rotazione. Demo del motore di rilevamento obsolescenza di Winerim Core e Winerim Supply.",
    breadTools: "Strumenti", breadCalc: "Calcolatore stock morto", demoBadge: "Demo · Winerim Core + Supply",
    h1: "Calcolatore di stock morto", subtitle: "Stima quanto capitale hai immobilizzato in vini senza rotazione. Identifica quali referenze necessitano azione immediata.",
    demoTitle: "Rilevare lo stock morto è solo l'inizio",
    demoDesc: "Winerim aiuta a quantificare il capitale immobilizzato, il rischio di obsolescenza e il costo opportunità per prendere decisioni migliori su rotazione e acquisti.",
    decides: ["Quali referenze togliere dalla carta per mancanza di rotazione", "Quanto capitale reale hai immobilizzato e il suo costo opportunità", "Quali vini incentivare, servire al calice, ritirare o non riassortire"],
    avoids: ["Continuare a comprare referenze che non si vendono", "Immobilizzare capitale senza visibilità del costo reale", "Prendere decisioni d'acquisto senza dati di rotazione né priorità"],
    impact: ["Liberazione di capitale bloccato in stock senza rotazione", "Riduzione della percentuale di stock dormiente sotto il 15%", "Criteri oggettivi per rinegoziare, ritirare o riconvertire referenze"],
    catLabels: { entrada: "Ingresso", media: "Gamma media", premium: "Premium", alta: "Alta gamma" },
    refsTitle: "Referenze con bassa o nulla rotazione", wineName: "Nome del vino", wineNamePlaceholder: "Es.: Barolo Riserva...",
    units: "Unità", costUnit: "Costo/ud (€)", daysSince: "Giorni senza vendita", category: "Categoria",
    addRef: "Aggiungi referenza", calculate: "Calcola impatto",
    capitalLabel: "Capitale immobilizzato", opportunityCost: "Costo opportunità", annualized: "stima annualizzata (8%)",
    sleepingPct: "% Stock dormiente", generalPriority: "Priorità generale", signalAction: "segnale d'azione",
    deadStock: "Stock morto", deadStockLabel: "Stock morto (> 6 mesi)", slowRotation: "Rotazione lenta", slowRotationLabel: "Rotazione lenta (3-6 mesi)",
    alertLabel: "In allerta", alertLabelFull: "In allerta (< 3 mesi)",
    refs: "referenza/e", ref: "refs",
    breakdownCat: "Ripartizione per categoria", detailRef: "Dettaglio per referenza",
    thWine: "Vino", thUnits: "Ud", thCapital: "Capitale", thDays: "Giorni", thPriority: "Priorità", thRecommendation: "Raccomandazione",
    priorityLabels: { critical: "Critica", high: "Alta", medium: "Media", low: "Bassa" },
    recLabels: { remove: "Ritirare dalla carta", glass: "Servire al calice", noRestock: "Non riassortire", boost: "Incentivare vendita" },
    insightHigh: () => `Oltre il 30% delle referenze analizzate è dormiente. Questo suggerisce un problema di acquisti o architettura della carta.`,
    insightMed: (pct, capital) => `Hai il ${pct}% di stock dormiente. È un livello comune ma migliorabile. Rivedere le referenze "Non riassortire" può liberare ${capital} di capitale.`,
    insightLow: "Il tuo stock dormiente è sotto il 15%. Buon livello di rotazione. Mantieni la revisione periodica.",
    actionsTitle: "Azioni raccomandate",
    actionDead: (count, capital) => `${count} referenza/e invenduta/e da più di 6 mesi (${capital} immobilizzati). Azione: offrire al calice, in menu degustazione o negoziare reso.`,
    actionSlow: (count) => `${count} referenza/e con rotazione lenta (3-6 mesi). Considerale per promozioni o riposizionamento.`,
    actionCapital: (capital) => `Hai ${capital} in stock a bassa rotazione. Rivedi i criteri d'acquisto e fissa limiti di stock massimo per referenza.`,
    actionPreventive: "Implementa una revisione trimestrale della rotazione per rilevare vini morti prima che accumulino mesi senza movimento.",
    summaryLabel: "Cos'è lo stock morto", summaryDef: "Lo stock morto sono le bottiglie di vino invendute da più di 90 giorni. Rappresentano capitale immobilizzato che non genera rendimento.",
    summaryBullets: ["Allerta (30-90 giorni): la referenza necessita attenzione ma può ancora recuperare", "Rotazione lenta (90-180 giorni): considerare promozioni, calice o riposizionamento", "Stock morto (> 180 giorni): azione urgente: liquidare, rendere o eliminare", "Rischio deterioramento: i vini giovani perdono freschezza nel tempo"],
    whenTitle: "Quando usare questo calcolatore", whenPoints: ["Prima di fare un ordine al distributore", "Nella revisione trimestrale della cantina", "Quando l'investimento in stock cresce senza crescita delle vendite", "Nella preparazione del bilancio fiscale"],
    errorsTitle: "Errori comuni", errorsPoints: ["Non contabilizzare lo stock morto come costo reale", "Comprare di più senza aver movimentato l'accumulo", "Aspettare che un vino si venda da solo", "Non stabilire limiti di stock per referenza"],
    faqs: [
      { q: "Dopo quanti giorni si considera stock morto?", a: "Il criterio abituale è 90 giorni senza vendita per rotazione lenta e 180 giorni per stock morto." },
      { q: "Cosa posso fare con i vini morti?", a: "Offrirli al calice a prezzo speciale, includerli in menu degustazione, negoziare il reso con il fornitore." },
      { q: "Quanto stock dovrebbe avere un ristorante?", a: "Lo stock dovrebbe poter ruotare completamente in 60-90 giorni." },
      { q: "I dati vengono inviati a un server?", a: "No. Tutti i calcoli vengono eseguiti nel tuo browser." },
    ],
    coreCtaLabel: "Winerim Core", coreCtaTitle: "Rilevamento automatico dell'obsolescenza",
    coreCtaDesc: "Winerim Core monitora la rotazione di ogni referenza, rileva automaticamente lo stock morto e genera avvisi prima che il capitale si immobilizzi.",
    coreCtaSee: "Vedi Winerim Core",
    supplyCtaLabel: "Winerim Supply", supplyCtaTitle: "Decisioni d'acquisto con criterio",
    supplyCtaDesc: "Winerim Supply aiuta a decidere cosa non riassortire, cosa rinegoziare con il distributore e quali referenze sostituire.",
    supplyCtaSee: "Vedi Winerim Supply",
    criticalLabel: "Critica", highLabel: "Alta", controlLabel: "Sotto controllo",
    interpretTitle: "Come interpretare i risultati",
    internalLinks: [
      { to: "/recursos/checklist-deteccion-vinos-muertos", label: "Checklist rilevamento vini morti", type: "resource" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calcolatrice acquisto intelligente", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: intelligenza acquisti", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core: rilevamento obsolescenza", type: "solution" },
      { to: "/precios", label: "Piani e prezzi", type: "solution" },
      { to: "/demo", label: "Richiedi demo gratuita", type: "solution" },
    ],
  },
  fr: {
    seoTitle: "Calculateur de Stock Mort de Vins | Démo Winerim Core + Supply",
    seoDesc: "Calculez combien de capital vous avez immobilisé dans des vins sans rotation. Démo du moteur de détection d'obsolescence de Winerim Core et Winerim Supply.",
    breadTools: "Outils", breadCalc: "Calculateur de stock mort", demoBadge: "Démo · Winerim Core + Supply",
    h1: "Calculateur de stock mort", subtitle: "Estimez combien de capital vous avez immobilisé dans des vins sans rotation. Identifiez les références nécessitant une action immédiate.",
    demoTitle: "Détecter le stock mort n'est que le début",
    demoDesc: "Winerim aide à quantifier le capital immobilisé, le risque d'obsolescence et le coût d'opportunité pour prendre de meilleures décisions de rotation et d'achat.",
    decides: ["Quelles références retirer de la carte par manque de rotation", "Combien de capital réel vous avez immobilisé et son coût d'opportunité", "Quels vins pousser, servir au verre, retirer ou ne pas réapprovisionner"],
    avoids: ["Continuer à acheter des références qui ne se vendent pas", "Immobiliser du capital sans visibilité sur le coût réel", "Prendre des décisions d'achat sans données de rotation ni priorité"],
    impact: ["Libération du capital bloqué dans le stock sans rotation", "Réduction du pourcentage de stock dormant en dessous de 15%", "Critères objectifs pour renégocier, retirer ou reconvertir des références"],
    catLabels: { entrada: "Entrée de gamme", media: "Milieu de gamme", premium: "Premium", alta: "Haut de gamme" },
    refsTitle: "Références avec faible ou aucune rotation", wineName: "Nom du vin", wineNamePlaceholder: "Ex. : Châteauneuf-du-Pape...",
    units: "Unités", costUnit: "Coût/unité (€)", daysSince: "Jours sans vente", category: "Catégorie",
    addRef: "Ajouter une référence", calculate: "Calculer l'impact",
    capitalLabel: "Capital immobilisé", opportunityCost: "Coût d'opportunité", annualized: "estimation annualisée (8%)",
    sleepingPct: "% Stock dormant", generalPriority: "Priorité générale", signalAction: "signal d'action",
    deadStock: "Stock mort", deadStockLabel: "Stock mort (> 6 mois)", slowRotation: "Rotation lente", slowRotationLabel: "Rotation lente (3-6 mois)",
    alertLabel: "En alerte", alertLabelFull: "En alerte (< 3 mois)",
    refs: "référence(s)", ref: "réfs",
    breakdownCat: "Répartition par catégorie", detailRef: "Détail par référence",
    thWine: "Vin", thUnits: "Unités", thCapital: "Capital", thDays: "Jours", thPriority: "Priorité", thRecommendation: "Recommandation",
    priorityLabels: { critical: "Critique", high: "Haute", medium: "Moyenne", low: "Basse" },
    recLabels: { remove: "Retirer de la carte", glass: "Servir au verre", noRestock: "Ne pas réapprovisionner", boost: "Pousser la vente" },
    insightHigh: () => `Plus de 30% de vos références analysées sont dormantes. Cela suggère un problème d'achat ou d'architecture de carte.`,
    insightMed: (pct, capital) => `Vous avez ${pct}% de stock dormant. C'est un niveau courant mais améliorable. Revoir les références "Ne pas réapprovisionner" pourrait libérer ${capital} de capital.`,
    insightLow: "Votre stock dormant est en dessous de 15%. Bon niveau de rotation. Maintenez les révisions périodiques.",
    actionsTitle: "Actions recommandées",
    actionDead: (count, capital) => `${count} référence(s) invendue(s) depuis plus de 6 mois (${capital} immobilisés). Action : proposer au verre, en menu dégustation ou négocier le retour.`,
    actionSlow: (count) => `${count} référence(s) à rotation lente (3-6 mois). À considérer pour des promotions ou un repositionnement.`,
    actionCapital: (capital) => `Vous avez ${capital} en stock à faible rotation. Révisez les critères d'achat et fixez des limites de stock maximum par référence.`,
    actionPreventive: "Mettez en place une revue trimestrielle de la rotation pour détecter les vins morts avant qu'ils n'accumulent des mois sans mouvement.",
    summaryLabel: "Qu'est-ce que le stock mort", summaryDef: "Le stock mort désigne les bouteilles de vin invendues depuis plus de 90 jours. Elles représentent du capital immobilisé qui ne génère aucun retour.",
    summaryBullets: ["Alerte (30-90 jours) : la référence nécessite une attention mais peut encore se rétablir", "Rotation lente (90-180 jours) : envisager des promotions, le service au verre ou un repositionnement", "Stock mort (> 180 jours) : action urgente : liquider, retourner ou éliminer", "Risque de détérioration : les vins jeunes perdent leur fraîcheur avec le temps"],
    whenTitle: "Quand utiliser ce calculateur", whenPoints: ["Avant de passer une commande au distributeur", "Lors de la revue trimestrielle de cave", "Quand l'investissement en stock croît sans croissance des ventes", "Lors de la préparation de la clôture fiscale"],
    errorsTitle: "Erreurs courantes", errorsPoints: ["Ne pas comptabiliser le stock mort comme un coût réel", "Acheter davantage sans avoir écoulé l'accumulation", "Attendre qu'un vin se vende tout seul", "Ne pas fixer de limites de stock par référence"],
    faqs: [
      { q: "À partir de combien de jours considère-t-on un stock mort ?", a: "Le critère habituel est 90 jours sans vente pour rotation lente et 180 jours pour stock mort." },
      { q: "Que faire des vins morts ?", a: "Les proposer au verre à prix spécial, les inclure dans des menus dégustation, négocier le retour avec le fournisseur." },
      { q: "Quel niveau de stock un restaurant devrait-il avoir ?", a: "Le stock devrait pouvoir tourner entièrement en 60-90 jours." },
      { q: "Les données sont-elles envoyées à un serveur ?", a: "Non. Tous les calculs sont effectués dans votre navigateur." },
    ],
    coreCtaLabel: "Winerim Core", coreCtaTitle: "Détection automatique de l'obsolescence",
    coreCtaDesc: "Winerim Core surveille la rotation de chaque référence, détecte automatiquement le stock mort et génère des alertes avant que le capital ne s'immobilise.",
    coreCtaSee: "Voir Winerim Core",
    supplyCtaLabel: "Winerim Supply", supplyCtaTitle: "Décisions d'achat éclairées",
    supplyCtaDesc: "Winerim Supply aide à décider quoi ne pas réapprovisionner, quoi renégocier avec le distributeur et quelles références remplacer.",
    supplyCtaSee: "Voir Winerim Supply",
    criticalLabel: "Critique", highLabel: "Haute", controlLabel: "Sous contrôle",
    interpretTitle: "Comment interpréter les résultats",
    internalLinks: [
      { to: "/recursos/checklist-deteccion-vinos-muertos", label: "Checklist détection vins morts", type: "resource" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculatrice achat intelligent", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply : intelligence achats", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core : détection obsolescence", type: "solution" },
      { to: "/precios", label: "Plans et tarifs", type: "solution" },
      { to: "/demo", label: "Demander démo gratuite", type: "solution" },
    ],
  },
};

/* ─── Recommendation/Priority logic (language-aware) ─── */
type Recommendation = "impulsar" | "copa" | "retirar" | "no-reponer";
const getRecommendation = (item: StockItem, t: LangContent): { rec: Recommendation; label: string; color: string } => {
  if (item.diasSinVenta > 365) return { rec: "retirar", label: t.recLabels.remove, color: "text-destructive" };
  if (item.diasSinVenta > 180 && item.categoria === "alta") return { rec: "copa", label: t.recLabels.glass, color: "text-amber-500" };
  if (item.diasSinVenta > 180) return { rec: "no-reponer", label: t.recLabels.noRestock, color: "text-destructive" };
  if (item.diasSinVenta > 120) return { rec: "copa", label: t.recLabels.glass, color: "text-amber-500" };
  return { rec: "impulsar", label: t.recLabels.boost, color: "text-wine" };
};

const getPriority = (dias: number, t: LangContent): { label: string; color: string; bg: string } => {
  if (dias > 365) return { label: t.priorityLabels.critical, color: "text-destructive", bg: "bg-destructive/10" };
  if (dias > 180) return { label: t.priorityLabels.high, color: "text-destructive", bg: "bg-destructive/10" };
  if (dias > 90) return { label: t.priorityLabels.medium, color: "text-amber-500", bg: "bg-amber-500/10" };
  return { label: t.priorityLabels.low, color: "text-wine", bg: "bg-wine/10" };
};

const formatEur = (n: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const CalculadoraStockMuerto = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const [items, setItems] = useState<StockItem[]>([emptyItem(), emptyItem(), emptyItem()]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "stock-muerto-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "WebApplication",
      name: t.seoTitle, applicationCategory: "BusinessApplication", operatingSystem: "Web",
      description: t.seoDesc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("stock-muerto-jsonld")?.remove(); };
  }, [t]);

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof StockItem, value: string | number) => {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it));
  };

  const validItems = items.filter(it => it.nombre.trim() && it.unidades > 0 && it.costeUnidad > 0);

  const analysis = useMemo(() => {
    if (validItems.length === 0) return null;
    const classified = validItems.map(it => {
      const capital = it.unidades * it.costeUnidad;
      const estado: "muerto" | "lento" | "alerta" = it.diasSinVenta > 180 ? "muerto" : it.diasSinVenta > 90 ? "lento" : "alerta";
      const opportunityCost = capital * OPPORTUNITY_RATE * (it.diasSinVenta / 365);
      const recommendation = getRecommendation(it, t);
      const priority = getPriority(it.diasSinVenta, t);
      return { ...it, capital, estado, opportunityCost, recommendation, priority };
    });
    const totalCapital = classified.reduce((s, it) => s + it.capital, 0);
    const totalOpportunityCost = classified.reduce((s, it) => s + it.opportunityCost, 0);
    const totalUnidades = classified.reduce((s, it) => s + it.unidades, 0);
    const muertos = classified.filter(it => it.estado === "muerto");
    const lentos = classified.filter(it => it.estado === "lento");
    const alerta = classified.filter(it => it.estado === "alerta");
    const pctDormido = ((muertos.length + lentos.length) / validItems.length * 100);
    const capitalMuerto = muertos.reduce((s, it) => s + it.capital, 0);
    const capitalLento = lentos.reduce((s, it) => s + it.capital, 0);
    const porCategoria = Object.entries(t.catLabels).map(([key, label]) => {
      const refs = classified.filter(it => it.categoria === key);
      return { key, label, count: refs.length, capital: refs.reduce((s, it) => s + it.capital, 0) };
    }).filter(c => c.count > 0);

    const acciones: { icono: React.ElementType; texto: string; tipo: "urgente" | "recomendado" | "preventivo" }[] = [];
    if (muertos.length > 0) acciones.push({ icono: AlertTriangle, tipo: "urgente", texto: t.actionDead(muertos.length, formatEur(capitalMuerto)) });
    if (lentos.length > 0) acciones.push({ icono: RotateCcw, tipo: "recomendado", texto: t.actionSlow(lentos.length) });
    if (totalCapital > 5000) acciones.push({ icono: DollarSign, tipo: "recomendado", texto: t.actionCapital(formatEur(totalCapital)) });
    acciones.push({ icono: CheckCircle, tipo: "preventivo", texto: t.actionPreventive });

    return { classified, totalCapital, totalOpportunityCost, totalUnidades, muertos, lentos, alerta, capitalMuerto, capitalLento, porCategoria, acciones, pctDormido };
  }, [validItems, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`${CANONICAL_DOMAIN}/herramientas/calculadora-stock-muerto`} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadTools, href: localePath("/herramientas") }, { label: t.breadCalc }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6">
            <BarChart3 size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">{t.demoBadge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.subtitle}</motion.p>
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

      <ToolStrategicBlock layer="supply" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Wine size={20} className="text-wine" /> {t.refsTitle}
          </h2>
          <div className="space-y-4 mb-6">
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-end p-4 rounded-xl border border-border bg-background">
                <div className="col-span-12 sm:col-span-3">
                  <Label className="text-xs mb-1 block">{t.wineName}</Label>
                  <Input placeholder={t.wineNamePlaceholder} value={item.nombre}
                    onChange={e => updateItem(i, "nombre", e.target.value)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.units}</Label>
                  <Input type="number" min={1} value={item.unidades || ""}
                    onChange={e => updateItem(i, "unidades", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.costUnit}</Label>
                  <Input type="number" min={0} step={0.5} value={item.costeUnidad || ""}
                    onChange={e => updateItem(i, "costeUnidad", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.daysSince}</Label>
                  <Input type="number" min={0} value={item.diasSinVenta || ""}
                    onChange={e => updateItem(i, "diasSinVenta", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-8 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.category}</Label>
                  <select value={item.categoria} onChange={e => updateItem(i, "categoria", e.target.value as Categoria)}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm">
                    {Object.entries(t.catLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="col-span-4 sm:col-span-1 flex justify-end">
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={addItem} className="text-sm"><Plus size={16} className="mr-1" /> {t.addRef}</Button>
            <Button onClick={() => { setCalculated(true); trackAction("tool_use", "tool", "calculadora-stock-muerto"); }} disabled={validItems.length === 0}
              className="bg-gradient-wine text-primary-foreground text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              {t.calculate}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && analysis && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-6 rounded-2xl border border-border bg-gradient-card">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.capitalLabel}</p>
                <p className="text-3xl md:text-4xl font-heading font-bold text-destructive">{formatEur(analysis.totalCapital)}</p>
                <p className="text-xs text-muted-foreground mt-1">{analysis.totalUnidades} uds · {validItems.length} {t.ref}</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-border bg-gradient-card">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.opportunityCost}</p>
                <p className="text-3xl md:text-4xl font-heading font-bold text-amber-500">{formatEur(analysis.totalOpportunityCost)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.annualized}</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-border bg-gradient-card">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.sleepingPct}</p>
                <p className={`text-3xl md:text-4xl font-heading font-bold ${analysis.pctDormido > 30 ? "text-destructive" : analysis.pctDormido > 15 ? "text-amber-500" : "text-wine"}`}>
                  {analysis.pctDormido.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">{analysis.muertos.length + analysis.lentos.length} / {validItems.length} {t.ref}</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-border bg-gradient-card">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.generalPriority}</p>
                {(() => {
                  const p = analysis.pctDormido > 30 ? { label: t.criticalLabel, color: "text-destructive" }
                    : analysis.pctDormido > 15 ? { label: t.highLabel, color: "text-amber-500" }
                    : { label: t.controlLabel, color: "text-emerald-500" };
                  return <p className={`text-3xl md:text-4xl font-heading font-bold ${p.color}`}>{p.label}</p>;
                })()}
                <p className="text-xs text-muted-foreground mt-1">{t.signalAction}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: t.deadStockLabel, value: formatEur(analysis.capitalMuerto), count: analysis.muertos.length, color: "text-destructive" },
                { label: t.slowRotationLabel, value: formatEur(analysis.capitalLento), count: analysis.lentos.length, color: "text-amber-500" },
                { label: t.alertLabelFull, value: formatEur(analysis.alerta.reduce((s, it) => s + it.unidades * it.costeUnidad, 0)), count: analysis.alerta.length, color: "text-wine" },
              ].map((seg, i) => (
                <div key={i} className="rounded-xl border border-border bg-gradient-card p-5 text-center">
                  <p className={`text-2xl font-heading font-bold ${seg.color}`}>{seg.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{seg.label}</p>
                  <p className="text-xs text-muted-foreground">{seg.count} {t.refs}</p>
                </div>
              ))}
            </div>

            {analysis.porCategoria.length > 1 && (
              <div className="rounded-2xl border border-border bg-gradient-card p-6">
                <h3 className="font-heading font-bold mb-4">{t.breakdownCat}</h3>
                <div className="space-y-3">
                  {analysis.porCategoria.map(cat => (
                    <div key={cat.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm font-medium">{cat.label}</span>
                      <span className="text-sm"><span className="font-bold">{formatEur(cat.capital)}</span> <span className="text-muted-foreground">({cat.count} {t.ref})</span></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-gradient-card p-6 overflow-x-auto">
              <h3 className="font-heading font-bold mb-4">{t.detailRef}</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium">{t.thWine}</th>
                    <th className="pb-3 font-medium text-right">{t.thUnits}</th>
                    <th className="pb-3 font-medium text-right">{t.thCapital}</th>
                    <th className="pb-3 font-medium text-right">{t.thDays}</th>
                    <th className="pb-3 font-medium text-center">{t.thPriority}</th>
                    <th className="pb-3 font-medium text-center">{t.thRecommendation}</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.classified.sort((a, b) => b.diasSinVenta - a.diasSinVenta).map((it, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3">{it.nombre}</td>
                      <td className="py-3 text-right">{it.unidades}</td>
                      <td className="py-3 text-right font-medium">{formatEur(it.capital)}</td>
                      <td className="py-3 text-right">{it.diasSinVenta}d</td>
                      <td className="py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${it.priority.bg} ${it.priority.color}`}>{it.priority.label}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-xs font-semibold ${it.recommendation.color}`}>{it.recommendation.label}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-wine/5 border border-wine/20 rounded-xl p-4">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info size={14} className="text-wine shrink-0 mt-0.5" />
                {analysis.pctDormido > 30
                  ? t.insightHigh(analysis.pctDormido.toFixed(0), formatEur(analysis.capitalMuerto))
                  : analysis.pctDormido > 15
                  ? t.insightMed(analysis.pctDormido.toFixed(0), formatEur(analysis.capitalMuerto))
                  : t.insightLow}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">{t.actionsTitle}</h3>
              <div className="space-y-3">
                {analysis.acciones.map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${a.tipo === "urgente" ? "border-destructive/20 bg-destructive/5" : a.tipo === "recomendado" ? "border-amber-500/20 bg-amber-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}>
                    <a.icono size={16} className={`shrink-0 mt-0.5 ${a.tipo === "urgente" ? "text-destructive" : a.tipo === "recomendado" ? "text-amber-500" : "text-emerald-500"}`} />
                    <p className="text-sm leading-relaxed">{a.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Winerim Inaction Projection ── */}
            {(() => {
              const pl: Record<string, { title: string; subtitle: string; month3: string; month6: string; month12: string; capital: string; opportunity: string; total: string; liquidation: string; liqStep1: string; liqStep2: string; liqStep3: string; liqStep4: string; recoverable: string; ofCapital: string }> = {
                es: { title: "Proyección de inacción · Winerim", subtitle: "Qué pasa si no actúas sobre este stock", month3: "En 3 meses", month6: "En 6 meses", month12: "En 12 meses", capital: "Capital inmovilizado", opportunity: "Coste oportunidad acumulado", total: "Coste total de inacción", liquidation: "Plan de liquidación recomendado", liqStep1: "Semana 1-2: Sacar las referencias de stock muerto por copa a precio especial", liqStep2: "Semana 3-4: Incluir en menú degustación o maridaje con descuento", liqStep3: "Mes 2: Contactar proveedor para devolución o canje de las que no se muevan", liqStep4: "Mes 3: Retirar de carta y no reponer. Reasignar presupuesto a top 5 por rotación", recoverable: "Recuperable estimado", ofCapital: "del capital" },
                en: { title: "Inaction projection · Winerim", subtitle: "What happens if you don't act on this stock", month3: "In 3 months", month6: "In 6 months", month12: "In 12 months", capital: "Tied-up capital", opportunity: "Accumulated opportunity cost", total: "Total cost of inaction", liquidation: "Recommended liquidation plan", liqStep1: "Week 1-2: Offer dead stock references by the glass at a special price", liqStep2: "Week 3-4: Include in tasting menu or discounted pairing", liqStep3: "Month 2: Contact supplier for returns or exchanges for unsold items", liqStep4: "Month 3: Remove from list and don't restock. Reallocate budget to top 5 by rotation", recoverable: "Estimated recoverable", ofCapital: "of capital" },
                it: { title: "Proiezione di inazione · Winerim", subtitle: "Cosa succede se non agisci su questo stock", month3: "In 3 mesi", month6: "In 6 mesi", month12: "In 12 mesi", capital: "Capitale immobilizzato", opportunity: "Costo opportunità accumulato", total: "Costo totale dell'inazione", liquidation: "Piano di liquidazione consigliato", liqStep1: "Settimana 1-2: Offrire le referenze morte al calice a prezzo speciale", liqStep2: "Settimana 3-4: Includere in menu degustazione o abbinamento scontato", liqStep3: "Mese 2: Contattare il fornitore per resi o cambi per gli invenduti", liqStep4: "Mese 3: Ritirare dalla carta e non riassortire. Riallocare il budget alle top 5 per rotazione", recoverable: "Recuperabile stimato", ofCapital: "del capitale" },
                fr: { title: "Projection d'inaction · Winerim", subtitle: "Ce qui se passe si vous n'agissez pas sur ce stock", month3: "Dans 3 mois", month6: "Dans 6 mois", month12: "Dans 12 mois", capital: "Capital immobilisé", opportunity: "Coût d'opportunité accumulé", total: "Coût total de l'inaction", liquidation: "Plan de liquidation recommandé", liqStep1: "Semaine 1-2 : Proposer les références mortes au verre à prix spécial", liqStep2: "Semaine 3-4 : Inclure dans un menu dégustation ou accord avec remise", liqStep3: "Mois 2 : Contacter le fournisseur pour retours ou échanges des invendus", liqStep4: "Mois 3 : Retirer de la carte et ne pas réapprovisionner. Réalloquer le budget aux top 5 par rotation", recoverable: "Récupérable estimé", ofCapital: "du capital" },
              };
              const p = pl[lang] || pl.es;

              const opp3 = analysis.totalCapital * OPPORTUNITY_RATE * 0.25;
              const opp6 = analysis.totalCapital * OPPORTUNITY_RATE * 0.5;
              const opp12 = analysis.totalCapital * OPPORTUNITY_RATE;
              const total12 = analysis.totalCapital + opp12;
              const recoverable = analysis.totalCapital * 0.4;

              return (
                <div className="rounded-2xl border border-amber-500/20 bg-gradient-card p-6 md:p-8 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={14} className="text-amber-500" />
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500">{p.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: p.month3, opp: opp3, color: "text-amber-500" },
                      { label: p.month6, opp: opp6, color: "text-amber-500" },
                      { label: p.month12, opp: opp12, color: "text-destructive" },
                    ].map((period, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border bg-background text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">{period.label}</p>
                        <p className={`font-heading text-lg font-bold ${period.color}`}>{formatEur(analysis.totalCapital + period.opp)}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{p.opportunity}: {formatEur(period.opp)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-destructive mb-1">{p.total} (12m)</p>
                    <p className="font-heading text-2xl font-bold text-destructive">{formatEur(total12)}</p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-xs font-semibold tracking-widest uppercase text-foreground">{p.liquidation}</p>
                    {[p.liqStep1, p.liqStep2, p.liqStep3, p.liqStep4].map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-wine/10 text-wine text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                      </div>
                    ))}
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-center">
                      <p className="text-xs text-muted-foreground">{p.recoverable}</p>
                      <p className="font-heading text-lg font-bold text-emerald-500">{formatEur(recoverable)} <span className="text-xs font-normal text-muted-foreground">(~40% {p.ofCapital})</span></p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </section>
      )}

      {/* EDUCATIONAL */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.interpretTitle}</h2>
          </ScrollReveal>
          <SummaryBox label={t.summaryLabel} definition={t.summaryDef} bullets={t.summaryBullets} />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[{ title: t.whenTitle, points: t.whenPoints }, { title: t.errorsTitle, points: t.errorsPoints }].map((block, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <h3 className="font-heading font-bold mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={t.faqs} schemaId="stock-muerto" />

      {/* DUAL CTA */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-2xl border border-amber-500/20 p-8 overflow-hidden h-full flex flex-col">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(38_90%_55%/0.05),transparent_60%)]" />
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <BarChart3 size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-amber-500/70 block">{t.coreCtaLabel}</span>
                      <h3 className="font-heading text-sm font-bold text-foreground">{t.coreCtaTitle}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{t.coreCtaDesc}</p>
                  <Link to={localePath("/producto/winerim-core")}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-500 hover:text-amber-400 transition-colors">
                    {t.coreCtaSee} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="relative bg-gradient-card rounded-2xl border border-emerald-500/20 p-8 overflow-hidden h-full flex flex-col">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,hsl(152_60%_50%/0.05),transparent_60%)]" />
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <ShoppingCart size={18} className="text-emerald-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-emerald-500/70 block">{t.supplyCtaLabel}</span>
                      <h3 className="font-heading text-sm font-bold text-foreground">{t.supplyCtaTitle}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{t.supplyCtaDesc}</p>
                  <Link to={localePath("/producto/winerim-supply")}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-500 hover:text-emerald-400 transition-colors">
                    {t.supplyCtaSee} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <InternalLinks links={t.internalLinks} />
      <Footer />
    </div>
  );
};

export default CalculadoraStockMuerto;
