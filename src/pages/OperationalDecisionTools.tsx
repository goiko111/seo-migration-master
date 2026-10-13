import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  GlassWater,
  PackageCheck,
  Plus,
  RotateCcw,
  Scale,
  ShieldCheck,
  Trash2,
  TrendingDown,
  Wine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import pairingImage from "@/assets/presentation/pairing.webp";
import stockImage from "@/assets/presentation/stock-management.webp";
import saviaImage from "@/assets/feature-savia-rotation-analysis.webp";
import { trackToolUse } from "@/hooks/useIntentTracker";
import {
  calculateOrderPlan,
  calculatePairingProfitability,
  calculateStockoutRisk,
  calculateStockReconciliation,
  ORDER_EXAMPLE,
  PAIRING_EXAMPLE,
  RECONCILIATION_EXAMPLE,
  STOCKOUT_EXAMPLE,
  type DecisionCurrency,
  type OrderPlanResult,
  type OrderPlannerRow,
  type PairingProfitabilityResult,
  type PairingWineRow,
  type StockoutRiskResult,
  type StockoutRiskRow,
  type StockReconciliationResult,
  type StockReconciliationRow,
} from "@/lib/operationalDecisionTools";
import "./RentabilidadBodega.css";
import "./OperationalDecisionTools.css";

type ToolKind = "order" | "pairing" | "reconciliation" | "stockout";
type Locale = "es" | "en";

const TOOL_ROUTES: Record<ToolKind, Record<Locale, string>> = {
  order: { es: "/herramientas/planificador-pedido-semanal-vino", en: "/en/tools/weekly-wine-order-planner" },
  pairing: { es: "/herramientas/calculadora-rentabilidad-menu-maridaje", en: "/en/tools/pairing-menu-profitability-calculator" },
  reconciliation: { es: "/herramientas/conciliador-stock-vino", en: "/en/tools/wine-stock-reconciliation" },
  stockout: { es: "/herramientas/simulador-rotura-stock-vino", en: "/en/tools/wine-stockout-risk-calculator" },
};

const TOOL_COPY = {
  order: {
    es: {
      title: "Planificador de pedido semanal de vino | Winerim",
      description: "Calcula qué vinos pedir, cuántas cajas comprar, el coste del pedido y qué referencias corren riesgo antes de la próxima entrega.",
      eyebrow: "Compras y cobertura", h1: "¿Qué vino deberías pedir esta semana?",
      intro: "Convierte stock, ventas, plazos y eventos en una propuesta de pedido por cajas completas. Sin adivinar y sin pedir más de lo necesario.",
      contextTitle: "Define cómo quieres cubrir el stock", figuresTitle: "Añade las referencias a planificar", resultTitle: "Tu propuesta de pedido semanal",
      productTitle: "Winerim prepara el pedido con ventas y stock reales.",
      productText: "SAVia y Winerim Supply conectan rotación, existencias, distribuidores y eventos para recomendar compras y evitar sobrestock.",
      formula: "Necesidad = venta diaria × (plazo de entrega + seguridad + cobertura objetivo) + demanda de eventos − stock actual. El resultado se redondea a cajas completas.",
      faq: [
        ["¿Es una previsión de demanda?", "Es un escenario operativo basado en el ritmo de venta que introduces. No sustituye una previsión conectada a ventas históricas, reservas y estacionalidad."],
        ["¿Por qué redondea a cajas completas?", "Porque el pedido real suele hacerse por cajas. Así ves el compromiso de caja que asumirías, no una cantidad teórica imposible de comprar."],
        ["¿Qué hace Winerim de forma diferente?", "Winerim usa ventas, stock, distribuidores y contexto operativo conectados para preparar el pedido sin volver a introducir estos datos."],
      ],
    },
    en: {
      title: "Weekly wine order planner | Winerim",
      description: "Calculate which wines to order, how many cases to buy, order cost and which references may run out before the next delivery.",
      eyebrow: "Purchasing and coverage", h1: "What wine should you order this week?",
      intro: "Turn stock, sales, lead times and events into an order proposal rounded to full cases. No guesswork and no unnecessary purchasing.",
      contextTitle: "Set your stock coverage rules", figuresTitle: "Add the references to plan", resultTitle: "Your weekly order proposal",
      productTitle: "Winerim prepares the order from real sales and stock.",
      productText: "SAVia and Winerim Supply connect rotation, inventory, distributors and events to recommend purchases and prevent overstock.",
      formula: "Need = daily sales × (lead time + safety days + target coverage) + event demand − current stock. The result is rounded to full cases.",
      faq: [
        ["Is this a demand forecast?", "It is an operating scenario based on the sales pace you enter. It does not replace a forecast connected to sales history, bookings and seasonality."],
        ["Why does it round to full cases?", "Because real orders are usually placed by case. This shows the cash commitment you would actually make."],
        ["What does Winerim do differently?", "Winerim uses connected sales, stock, distributor and operating data to prepare the order without entering these figures again."],
      ],
    },
  },
  pairing: {
    es: {
      title: "Calculadora de rentabilidad de menú y maridaje | Winerim",
      description: "Calcula coste por comensal, beverage cost, contribución mensual y el impacto de servir 10 ml de más en un menú con maridaje.",
      eyebrow: "Menú y maridaje", h1: "¿Es rentable tu maridaje?",
      intro: "Mide el coste real de cada pase, el margen asignado al vino y cuánto cuesta una pequeña desviación de servicio repetida durante el mes.",
      contextTitle: "Define el servicio y su objetivo", figuresTitle: "Añade los vinos y la dosis de cada pase", resultTitle: "Rentabilidad del maridaje",
      productTitle: "Winerim controla receta, servicio y desviaciones.",
      productText: "Armonías compara el coste teórico con lo realmente servido, registra sustituciones y mantiene visible el margen de cada menú.",
      formula: "Coste por comensal = suma de coste botella × ml servidos / ml botella. Contribución = ingreso atribuido al vino − coste. El impacto de +10 ml se calcula en todos los pases y servicios del mes.",
      faq: [
        ["¿Qué es el ingreso atribuido al vino?", "La parte del precio del menú que decides comparar con el coste del maridaje. No tiene que coincidir con el precio total del menú."],
        ["¿Incluye IVA?", "No. Para comparar margen y coste de forma coherente, introduce importes sin IVA."],
        ["¿Por qué calcula 10 ml de más?", "Porque una desviación pequeña en cada pase puede convertirse en varias botellas y bastante coste cuando se repite durante todo el mes."],
      ],
    },
    en: {
      title: "Pairing menu profitability calculator | Winerim",
      description: "Calculate cost per guest, beverage cost, monthly contribution and the impact of pouring 10 ml extra in a paired menu.",
      eyebrow: "Menu and pairing", h1: "Is your wine pairing profitable?",
      intro: "Measure the real cost of every course, the margin allocated to wine and the monthly cost of a small repeated service deviation.",
      contextTitle: "Set the service and target", figuresTitle: "Add each wine and its pour", resultTitle: "Pairing profitability",
      productTitle: "Winerim controls recipe, service and deviations.",
      productText: "Pairings compares theoretical and actual service cost, records substitutions and keeps every menu's margin visible.",
      formula: "Cost per guest = sum of bottle cost × poured ml / bottle ml. Contribution = wine revenue allocation − cost. The +10 ml impact applies to every course and monthly service.",
      faq: [
        ["What is wine revenue allocation?", "The part of the menu price you choose to compare with pairing cost. It does not need to equal the full menu price."],
        ["Does it include tax?", "No. Enter amounts excluding tax to compare cost and margin consistently."],
        ["Why calculate an extra 10 ml?", "Because a small deviation on every course can become several bottles and meaningful cost when repeated throughout a month."],
      ],
    },
  },
  reconciliation: {
    es: {
      title: "Conciliador de stock de vino teórico y real | Winerim",
      description: "Compara stock inicial, compras, botellas y copas vendidas, bajas y recuento real para detectar descuadres de inventario.",
      eyebrow: "Inventario y trazabilidad", h1: "¿Dónde se descuadra tu stock de vino?",
      intro: "Reconstruye el stock que debería existir y compáralo con el recuento real. Prioriza las diferencias por coste, no solo por número de botellas.",
      contextTitle: "Define cómo conviertes copas en botellas", figuresTitle: "Añade las referencias a conciliar", resultTitle: "Conciliación de stock",
      productTitle: "Winerim mantiene el puente de stock vivo.",
      productText: "La integración TPV conecta entradas, ventas por botella y copa, bajas con motivo y recuentos para explicar cada diferencia.",
      formula: "Stock teórico = inicial + entradas − botellas vendidas − copas vendidas / copas por botella − roturas − invitaciones. Diferencia = stock real − stock teórico.",
      faq: [
        ["¿Qué significa una diferencia negativa?", "Que el recuento real tiene menos vino del que explica el movimiento registrado. Conviene revisar copas, invitaciones, roturas y mapeo TPV."],
        ["¿Y una diferencia positiva?", "Puede indicar entradas no registradas, ventas duplicadas o una referencia de TPV mal vinculada."],
        ["¿Por qué admite decimales?", "Las copas se convierten en fracciones de botella. Una tolerancia de un cuarto de botella evita marcar pequeños restos como incidencia."],
      ],
    },
    en: {
      title: "Wine stock reconciliation tool | Winerim",
      description: "Compare opening stock, purchases, bottle and glass sales, adjustments and actual count to find inventory discrepancies.",
      eyebrow: "Inventory and traceability", h1: "Where does your wine stock diverge?",
      intro: "Rebuild the stock that should exist and compare it with the physical count. Prioritize differences by cost, not only bottle count.",
      contextTitle: "Set how glasses convert into bottles", figuresTitle: "Add the references to reconcile", resultTitle: "Stock reconciliation",
      productTitle: "Winerim keeps the stock bridge live.",
      productText: "POS integration connects receipts, bottle and glass sales, reason-coded adjustments and counts to explain each difference.",
      formula: "Theoretical stock = opening + receipts − bottles sold − glasses sold / glasses per bottle − breakage − comps. Difference = actual stock − theoretical stock.",
      faq: [
        ["What does a negative difference mean?", "The physical count has less wine than recorded movements explain. Review glasses, comps, breakage and POS mapping."],
        ["What does a positive difference mean?", "It may point to unrecorded receipts, duplicate sales or an incorrectly linked POS product."],
        ["Why are decimals allowed?", "Glasses convert into bottle fractions. A quarter-bottle tolerance avoids flagging small remnants as incidents."],
      ],
    },
  },
  stockout: {
    es: {
      title: "Simulador de rotura de stock de vino | Winerim",
      description: "Calcula qué vinos se agotarán antes de la próxima entrega, las unidades y margen en riesgo y la compra mínima de emergencia.",
      eyebrow: "Disponibilidad y venta", h1: "¿Qué te cuesta quedarte sin un vino?",
      intro: "Cruza stock, ritmo de venta, próxima entrega, eventos y capacidad de sustitución para cuantificar el margen realmente expuesto.",
      contextTitle: "Define la próxima entrega y sustitución", figuresTitle: "Añade las referencias que no pueden faltar", resultTitle: "Riesgo de rotura de stock",
      productTitle: "Winerim anticipa la rotura antes del servicio.",
      productText: "SAVia vigila cobertura, rotación, eventos y alternativas de carta para avisar y preparar una reposición accionable.",
      formula: "Faltante = venta diaria × días hasta entrega + demanda de eventos − stock. Unidades perdidas = faltante × (1 − sustitución). Margen en riesgo = unidades perdidas × contribución por botella.",
      faq: [
        ["¿Qué es la capacidad de sustitución?", "El porcentaje de la demanda que podría desplazarse a otro vino sin perder la venta. No elimina el faltante físico; solo reduce el margen expuesto."],
        ["¿Es lo mismo que el planificador de pedido?", "No. Este simulador cuantifica el riesgo hasta una entrega concreta. El planificador construye un pedido de cobertura y lo redondea a cajas."],
        ["¿Qué margen debo introducir?", "La contribución que deja una botella después de su coste, no su precio de venta completo."],
      ],
    },
    en: {
      title: "Wine stockout risk calculator | Winerim",
      description: "Calculate which wines may run out before the next delivery, units and contribution at risk, and minimum emergency quantity.",
      eyebrow: "Availability and sales", h1: "What does running out of a wine cost?",
      intro: "Combine stock, sales pace, next delivery, events and substitution capacity to quantify the contribution truly exposed.",
      contextTitle: "Set the next delivery and substitution", figuresTitle: "Add the references that must stay available", resultTitle: "Stockout risk",
      productTitle: "Winerim anticipates stockouts before service.",
      productText: "SAVia monitors coverage, rotation, events and list alternatives to alert you and prepare an actionable replenishment.",
      formula: "Shortage = daily sales × days to delivery + event demand − stock. Lost units = shortage × (1 − substitution). Contribution at risk = lost units × contribution per bottle.",
      faq: [
        ["What is substitution capacity?", "The percentage of demand that could move to another wine without losing the sale. It does not remove the physical shortage; it only reduces exposed contribution."],
        ["Is this the same as the order planner?", "No. This simulator quantifies risk until one delivery. The planner builds a coverage order and rounds it to cases."],
        ["Which margin should I enter?", "Enter contribution after bottle cost, not the full selling price."],
      ],
    },
  },
} as const;

const common = {
  es: {
    steps: ["Contexto", "Tus cifras", "Resultado"], step: (n: number) => `Paso ${n} de 3`,
    local: "Cálculo local · No enviamos tus cifras", currency: "Moneda", noVat: "Importes sin IVA.",
    continue: "Continuar", back: "Volver", calculate: "Calcular", loadExample: "Cargar ejemplo ficticio", reset: "Reiniciar", download: "Descargar escenario",
    add: "Añadir referencia", remove: "Eliminar referencia", sources: "Origen de las cifras", entered: "Introducido por ti", calculated: "Calculado con tus datos", fictional: "Ejemplo ficticio cuando lo cargas",
    formulas: "Fórmula visible", actions: "Qué haría ahora", productEyebrow: "Del escenario a la operación diaria", productCaption: "Captura de producto. Sus cifras no pertenecen a este cálculo.",
    demo: "Solicitar demo", otherTools: "Herramientas relacionadas", emptyName: "Referencia", required: "Añade al menos una referencia con nombre.",
  },
  en: {
    steps: ["Context", "Your figures", "Result"], step: (n: number) => `Step ${n} of 3`,
    local: "Local calculation · We do not send your figures", currency: "Currency", noVat: "Amounts excluding tax.",
    continue: "Continue", back: "Back", calculate: "Calculate", loadExample: "Load fictional example", reset: "Reset", download: "Download scenario",
    add: "Add reference", remove: "Remove reference", sources: "Source of the figures", entered: "Entered by you", calculated: "Calculated from your data", fictional: "Fictional example when loaded",
    formulas: "Visible formula", actions: "What I would do now", productEyebrow: "From scenario to daily operations", productCaption: "Product screenshot. Its figures do not belong to this calculation.",
    demo: "Request a demo", otherTools: "Related tools", emptyName: "Reference", required: "Add at least one named reference.",
  },
} as const;

const createOrderRow = (id = `order-${Date.now()}`): OrderPlannerRow => ({ id, name: "", currentStock: 0, weeklySales: 0, leadDays: 4, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6, unitCost: 0, eventDemand: 0 });
const createPairingRow = (id = `pair-${Date.now()}`): PairingWineRow => ({ id, name: "", bottleCost: 0, bottleMl: 750, pourMl: 75 });
const createReconRow = (id = `recon-${Date.now()}`): StockReconciliationRow => ({ id, name: "", openingStock: 0, received: 0, bottlesSold: 0, glassesSold: 0, glassesPerBottle: 6, breakage: 0, comps: 0, actualStock: 0, unitCost: 0 });
const createStockoutRow = (id = `stockout-${Date.now()}`): StockoutRiskRow => ({ id, name: "", currentStock: 0, dailySales: 0, daysUntilDelivery: 5, eventDemand: 0, contributionPerBottle: 0, substitutionPct: 25 });

const numberValue = (value: string) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

const NumberField = ({ label, value, onChange, unit, step = "any" }: { label: string; value: number; onChange: (value: number) => void; unit?: string; step?: string }) => (
  <label className="decision-field">
    <span>{label}</span>
    <span className="decision-input-wrap">
      <input type="number" min="0" step={step} inputMode="decimal" value={value} onChange={(event) => onChange(numberValue(event.target.value))} />
      {unit && <b>{unit}</b>}
    </span>
  </label>
);

const NameField = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => (
  <label className="decision-field decision-name-field">
    <span>{placeholder}</span>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
  </label>
);

const Metric = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div className="decision-metric" data-accent={accent}><span>{label}</span><strong>{value}</strong></div>
);

const ToolSteps = ({ active, labels }: { active: number; labels: readonly string[] }) => (
  <ol className="profit-steps">
    {labels.map((label, index) => <li key={label} className={index === active ? "active" : index < active ? "done" : ""}><span>{index < active ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>{label}</li>)}
  </ol>
);

const getKind = (pathname: string): ToolKind => pathname.includes("maridaje") || pathname.includes("pairing-menu")
  ? "pairing"
  : pathname.includes("conciliador") || pathname.includes("reconciliation")
    ? "reconciliation"
    : pathname.includes("rotura") || pathname.includes("stockout")
      ? "stockout"
      : "order";

export default function OperationalDecisionTools() {
  const location = useLocation();
  const kind = getKind(location.pathname);
  const locale: Locale = location.pathname.startsWith("/en/") ? "en" : "es";
  const t = TOOL_COPY[kind][locale];
  const c = common[locale];
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<DecisionCurrency>("EUR");
  const [isExample, setIsExample] = useState(false);
  const [showError, setShowError] = useState(false);
  const [orderRows, setOrderRows] = useState<OrderPlannerRow[]>([createOrderRow("order-1")]);
  const [pairingRows, setPairingRows] = useState<PairingWineRow[]>([createPairingRow("pair-1")]);
  const [reconRows, setReconRows] = useState<StockReconciliationRow[]>([createReconRow("recon-1")]);
  const [stockoutRows, setStockoutRows] = useState<StockoutRiskRow[]>([createStockoutRow("stockout-1")]);
  const [pairingContext, setPairingContext] = useState({ wineRevenuePerGuest: 35, guestsPerService: 30, servicesPerMonth: 8, targetBeverageCostPct: 25 });
  const [orderDefaults, setOrderDefaults] = useState({ leadDays: 4, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6 });
  const [glassesPerBottle, setGlassesPerBottle] = useState(6);
  const [stockoutDefaults, setStockoutDefaults] = useState({ daysUntilDelivery: 5, substitutionPct: 25 });
  const [result, setResult] = useState<OrderPlanResult | PairingProfitabilityResult | StockReconciliationResult | StockoutRiskResult | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const money = useMemo(() => new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", { style: "currency", currency, maximumFractionDigits: 0 }), [currency, locale]);
  const decimal = useMemo(() => new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", { maximumFractionDigits: 1 }), [locale]);
  const activeRows = kind === "order" ? orderRows : kind === "pairing" ? pairingRows : kind === "reconciliation" ? reconRows : stockoutRows;
  const validRows = activeRows.filter((row) => row.name.trim());
  const toolName = `operational_${kind}`;

  const focusTitle = () => requestAnimationFrame(() => titleRef.current?.focus());
  const go = (next: number) => { setStep(next); setShowError(false); trackToolUse(toolName, { action: `step_${next + 1}` }); focusTitle(); };
  const clearResult = () => { setResult(null); setIsExample(false); };

  const loadExample = () => {
    if (kind === "order") setOrderRows(ORDER_EXAMPLE.map((row) => ({ ...row })));
    if (kind === "pairing") {
      setPairingRows(PAIRING_EXAMPLE.wines.map((row) => ({ ...row })));
      setPairingContext({
        wineRevenuePerGuest: PAIRING_EXAMPLE.wineRevenuePerGuest,
        guestsPerService: PAIRING_EXAMPLE.guestsPerService,
        servicesPerMonth: PAIRING_EXAMPLE.servicesPerMonth,
        targetBeverageCostPct: PAIRING_EXAMPLE.targetBeverageCostPct,
      });
    }
    if (kind === "reconciliation") setReconRows(RECONCILIATION_EXAMPLE.map((row) => ({ ...row })));
    if (kind === "stockout") setStockoutRows(STOCKOUT_EXAMPLE.map((row) => ({ ...row })));
    setIsExample(true); setShowError(false); setResult(null); setStep(1);
    trackToolUse(toolName, { action: "load_example" }); focusTitle();
  };

  const calculate = () => {
    if (!validRows.length) { setShowError(true); return; }
    if (kind === "order") setResult(calculateOrderPlan(orderRows.filter((row) => row.name.trim()).map((row) => ({ ...row, ...orderDefaults }))));
    if (kind === "pairing") setResult(calculatePairingProfitability({ ...pairingContext, wines: pairingRows.filter((row) => row.name.trim()) }));
    if (kind === "reconciliation") setResult(calculateStockReconciliation(reconRows.filter((row) => row.name.trim()).map((row) => ({ ...row, glassesPerBottle }))));
    if (kind === "stockout") setResult(calculateStockoutRisk(stockoutRows.filter((row) => row.name.trim()).map((row) => ({ ...row, ...stockoutDefaults }))));
    setStep(2); setShowError(false); trackToolUse(toolName, { action: "calculate", example: isExample }); focusTitle();
  };

  const reset = () => {
    setStep(0); setIsExample(false); setShowError(false); setResult(null); setCurrency("EUR");
    setOrderRows([createOrderRow("order-reset")]); setPairingRows([createPairingRow("pair-reset")]); setReconRows([createReconRow("recon-reset")]); setStockoutRows([createStockoutRow("stockout-reset")]);
    trackToolUse(toolName, { action: "reset" });
  };

  const download = () => {
    if (!result) return;
    const text = document.querySelector(".decision-result")?.textContent?.replace(/\s+/g, " ").trim() || t.resultTitle;
    const url = URL.createObjectURL(new Blob([`${t.h1}\n\n${text}\n\n${t.formula}`], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `winerim-${kind}-${locale}.txt`; anchor.click(); URL.revokeObjectURL(url);
    trackToolUse(toolName, { action: "download" });
  };

  const image = kind === "pairing" ? pairingImage : kind === "order" || kind === "stockout" ? saviaImage : stockImage;
  const faqs = t.faq.map(([q, a]) => ({ q, a }));
  const hreflang = [
    { lang: "es", url: `https://winerim.wine${TOOL_ROUTES[kind].es}` },
    { lang: "en", url: `https://winerim.wine${TOOL_ROUTES[kind].en}` },
    { lang: "x-default", url: `https://winerim.wine${TOOL_ROUTES[kind].es}` },
  ];

  return <div className="profitability-page decision-tool-page">
    <SEOHead title={t.title} description={t.description} url={TOOL_ROUTES[kind][locale]} hreflang={hreflang} structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: t.h1, description: t.description, url: `https://winerim.wine${TOOL_ROUTES[kind][locale]}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0" } }} />
    <a className="profit-skip" href="#decision-calculator">{locale === "es" ? "Ir a la calculadora" : "Skip to calculator"}</a>
    <Navbar />
    <main>
      <header className="profit-intro">
        <p className="profit-eyebrow">{t.eyebrow}</p><h1>{t.h1}</h1><p>{t.intro}</p>
        <span className="profit-local"><ShieldCheck size={14} aria-hidden /> {c.local}</span>
      </header>
      <section className="profit-workspace" id="decision-calculator" aria-label={t.h1}>
        <aside className="profit-sidebar">
          <p className="profit-eyebrow">{t.eyebrow}</p><ToolSteps active={step} labels={c.steps} />
          <div className="profit-sidebar-note"><strong>{c.noVat}</strong><span>{locale === "es" ? "Puedes cargar un ejemplo y sustituir después cualquier cifra." : "Load an example and replace any figure afterwards."}</span></div>
          <button type="button" className="profit-example-link" onClick={loadExample}><Wine size={14} /> {c.loadExample}</button>
        </aside>
        <div className="profit-panel">
          <div className="profit-panel-head">
            <div><span>{c.step(step + 1)}</span><h2 ref={titleRef} tabIndex={-1}>{step === 0 ? t.contextTitle : step === 1 ? t.figuresTitle : t.resultTitle}</h2></div>
            {step > 0 && <button type="button" className="profit-reset" onClick={reset} title={c.reset}><RotateCcw size={15} /><span>{c.reset}</span></button>}
          </div>

          {step === 0 && <ContextStep kind={kind} locale={locale} currency={currency} setCurrency={setCurrency} orderDefaults={orderDefaults} setOrderDefaults={setOrderDefaults} pairingContext={pairingContext} setPairingContext={setPairingContext} glassesPerBottle={glassesPerBottle} setGlassesPerBottle={setGlassesPerBottle} stockoutDefaults={stockoutDefaults} setStockoutDefaults={setStockoutDefaults} />}
          {step === 1 && <RowsStep kind={kind} locale={locale} c={c} orderRows={orderRows} setOrderRows={setOrderRows} pairingRows={pairingRows} setPairingRows={setPairingRows} reconRows={reconRows} setReconRows={setReconRows} stockoutRows={stockoutRows} setStockoutRows={setStockoutRows} onChange={clearResult} />}
          {step === 2 && result && <ResultStep kind={kind} locale={locale} result={result} money={money} decimal={decimal} formula={t.formula} sourceLabel={isExample ? c.fictional : c.entered} />}

          {showError && <p className="decision-error" role="alert"><AlertTriangle size={15} /> {c.required}</p>}
          <div className="profit-actions decision-controls">
            {step === 0 && <><button type="button" className="profit-primary" onClick={() => go(1)}>{c.continue} <ArrowRight size={16} /></button><button type="button" className="profit-secondary" onClick={loadExample}>{c.loadExample}</button></>}
            {step === 1 && <><button type="button" className="profit-secondary" onClick={() => go(0)}><ArrowLeft size={16} /> {c.back}</button><button type="button" className="profit-primary" onClick={calculate}>{c.calculate} <ArrowRight size={16} /></button></>}
            {step === 2 && <><button type="button" className="profit-primary" onClick={download}><Download size={16} /> {c.download}</button><Link className="profit-secondary" to={locale === "es" ? "/demo" : "/en/demo"}>{c.demo} <ArrowRight size={15} /></Link><button type="button" className="profit-back-link" onClick={() => go(1)}><ArrowLeft size={14} /> {c.back}</button></>}
          </div>
        </div>
      </section>

      <section className="profit-product-proof">
        <div><p className="profit-eyebrow">{c.productEyebrow}</p><h2>{t.productTitle}</h2><p>{t.productText}</p><Link to={locale === "es" ? "/demo" : "/en/demo"}>{c.demo} <ArrowRight size={14} /></Link></div>
        <figure><img src={image} alt="" loading="lazy" /><figcaption>{c.productCaption}</figcaption></figure>
      </section>
      <FAQSection faqs={faqs} schemaId={`decision-tool-${kind}`} />
      <InternalLinks title={c.otherTools} links={relatedLinks(kind, locale)} />
    </main>
    <Footer />
  </div>;
}

function ContextStep({ kind, locale, currency, setCurrency, orderDefaults, setOrderDefaults, pairingContext, setPairingContext, glassesPerBottle, setGlassesPerBottle, stockoutDefaults, setStockoutDefaults }: {
  kind: ToolKind; locale: Locale; currency: DecisionCurrency; setCurrency: (value: DecisionCurrency) => void;
  orderDefaults: { leadDays: number; safetyDays: number; targetCoverDays: number; unitsPerCase: number }; setOrderDefaults: React.Dispatch<React.SetStateAction<typeof orderDefaults>>;
  pairingContext: { wineRevenuePerGuest: number; guestsPerService: number; servicesPerMonth: number; targetBeverageCostPct: number }; setPairingContext: React.Dispatch<React.SetStateAction<typeof pairingContext>>;
  glassesPerBottle: number; setGlassesPerBottle: (value: number) => void;
  stockoutDefaults: { daysUntilDelivery: number; substitutionPct: number }; setStockoutDefaults: React.Dispatch<React.SetStateAction<typeof stockoutDefaults>>;
}) {
  const es = locale === "es";
  return <div className="decision-context">
    <label className="decision-field"><span>{es ? "Moneda" : "Currency"}</span><select value={currency} onChange={(event) => setCurrency(event.target.value as DecisionCurrency)}><option value="EUR">EUR · €</option><option value="USD">USD · $</option><option value="GBP">GBP · £</option></select></label>
    {kind === "order" && <div className="decision-context-grid">
      <NumberField label={es ? "Días hasta entrega" : "Lead time in days"} value={orderDefaults.leadDays} onChange={(value) => setOrderDefaults((current) => ({ ...current, leadDays: value }))} unit={es ? "días" : "days"} />
      <NumberField label={es ? "Días de seguridad" : "Safety days"} value={orderDefaults.safetyDays} onChange={(value) => setOrderDefaults((current) => ({ ...current, safetyDays: value }))} unit={es ? "días" : "days"} />
      <NumberField label={es ? "Cobertura objetivo" : "Target coverage"} value={orderDefaults.targetCoverDays} onChange={(value) => setOrderDefaults((current) => ({ ...current, targetCoverDays: value }))} unit={es ? "días" : "days"} />
      <NumberField label={es ? "Botellas por caja" : "Bottles per case"} value={orderDefaults.unitsPerCase} onChange={(value) => setOrderDefaults((current) => ({ ...current, unitsPerCase: Math.max(1, value) }))} />
    </div>}
    {kind === "pairing" && <div className="decision-context-grid">
      <NumberField label={es ? "Ingreso atribuido al vino por comensal" : "Wine revenue per guest"} value={pairingContext.wineRevenuePerGuest} onChange={(value) => setPairingContext((current) => ({ ...current, wineRevenuePerGuest: value }))} unit={currency} />
      <NumberField label={es ? "Comensales por servicio" : "Guests per service"} value={pairingContext.guestsPerService} onChange={(value) => setPairingContext((current) => ({ ...current, guestsPerService: value }))} />
      <NumberField label={es ? "Servicios al mes" : "Services per month"} value={pairingContext.servicesPerMonth} onChange={(value) => setPairingContext((current) => ({ ...current, servicesPerMonth: value }))} />
      <NumberField label={es ? "Beverage cost objetivo" : "Target beverage cost"} value={pairingContext.targetBeverageCostPct} onChange={(value) => setPairingContext((current) => ({ ...current, targetBeverageCostPct: Math.min(100, value) }))} unit="%" />
    </div>}
    {kind === "reconciliation" && <div className="decision-context-grid decision-context-grid-small"><NumberField label={es ? "Copas que salen por botella" : "Glasses per bottle"} value={glassesPerBottle} onChange={(value) => setGlassesPerBottle(Math.max(1, value))} /><p>{es ? "Se usa una tolerancia de 0,25 botellas para no marcar pequeños restos como incidencia." : "A 0.25-bottle tolerance avoids flagging small remnants as incidents."}</p></div>}
    {kind === "stockout" && <div className="decision-context-grid decision-context-grid-small">
      <NumberField label={es ? "Días hasta la próxima entrega" : "Days until next delivery"} value={stockoutDefaults.daysUntilDelivery} onChange={(value) => setStockoutDefaults((current) => ({ ...current, daysUntilDelivery: value }))} unit={es ? "días" : "days"} />
      <NumberField label={es ? "Demanda sustituible" : "Substitutable demand"} value={stockoutDefaults.substitutionPct} onChange={(value) => setStockoutDefaults((current) => ({ ...current, substitutionPct: Math.min(100, value) }))} unit="%" />
    </div>}
    <div className="decision-context-note"><ShieldCheck size={18} /><p>{es ? "Todas las hipótesis son visibles y editables. El resultado es un escenario, no una garantía ni un dato conectado a tu negocio." : "Every assumption is visible and editable. The result is a scenario, not a guarantee or connected business data."}</p></div>
  </div>;
}

function RowsStep(props: {
  kind: ToolKind; locale: Locale; c: typeof common.es | typeof common.en;
  orderRows: OrderPlannerRow[]; setOrderRows: React.Dispatch<React.SetStateAction<OrderPlannerRow[]>>;
  pairingRows: PairingWineRow[]; setPairingRows: React.Dispatch<React.SetStateAction<PairingWineRow[]>>;
  reconRows: StockReconciliationRow[]; setReconRows: React.Dispatch<React.SetStateAction<StockReconciliationRow[]>>;
  stockoutRows: StockoutRiskRow[]; setStockoutRows: React.Dispatch<React.SetStateAction<StockoutRiskRow[]>>;
  onChange: () => void;
}) {
  const { kind, locale, c, onChange } = props; const es = locale === "es";
  const updateRow = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, id: string, patch: Partial<T>) => { setter((rows) => rows.map((row) => row.id === id ? { ...row, ...patch } : row)); onChange(); };
  const removeRow = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, id: string) => setter((rows) => rows.length > 1 ? rows.filter((row) => row.id !== id) : rows);
  const addButton = (add: () => void) => <button type="button" className="decision-add" onClick={add}><Plus size={15} /> {c.add}</button>;
  return <div className="decision-rows">
    {kind === "order" && <>{props.orderRows.map((row, index) => <RowCard key={row.id} index={index} remove={() => removeRow(props.setOrderRows, row.id)} removeLabel={c.remove}>
      <NameField value={row.name} onChange={(value) => updateRow(props.setOrderRows, row.id, { name: value })} placeholder={c.emptyName} />
      <NumberField label={es ? "Stock actual" : "Current stock"} value={row.currentStock} onChange={(value) => updateRow(props.setOrderRows, row.id, { currentStock: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Ventas por semana" : "Weekly sales"} value={row.weeklySales} onChange={(value) => updateRow(props.setOrderRows, row.id, { weeklySales: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Demanda de eventos" : "Event demand"} value={row.eventDemand} onChange={(value) => updateRow(props.setOrderRows, row.id, { eventDemand: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Coste por botella" : "Cost per bottle"} value={row.unitCost} onChange={(value) => updateRow(props.setOrderRows, row.id, { unitCost: value })} />
    </RowCard>)}{addButton(() => props.setOrderRows((rows) => rows.length < 10 ? [...rows, createOrderRow(`order-${Date.now()}`)] : rows))}</>}
    {kind === "pairing" && <>{props.pairingRows.map((row, index) => <RowCard key={row.id} index={index} remove={() => removeRow(props.setPairingRows, row.id)} removeLabel={c.remove}>
      <NameField value={row.name} onChange={(value) => updateRow(props.setPairingRows, row.id, { name: value })} placeholder={es ? "Vino o pase" : "Wine or course"} />
      <NumberField label={es ? "Coste botella" : "Bottle cost"} value={row.bottleCost} onChange={(value) => updateRow(props.setPairingRows, row.id, { bottleCost: value })} />
      <NumberField label={es ? "Volumen botella" : "Bottle volume"} value={row.bottleMl} onChange={(value) => updateRow(props.setPairingRows, row.id, { bottleMl: Math.max(1, value) })} unit="ml" />
      <NumberField label={es ? "Dosis por comensal" : "Pour per guest"} value={row.pourMl} onChange={(value) => updateRow(props.setPairingRows, row.id, { pourMl: value })} unit="ml" />
    </RowCard>)}{addButton(() => props.setPairingRows((rows) => rows.length < 10 ? [...rows, createPairingRow(`pair-${Date.now()}`)] : rows))}</>}
    {kind === "reconciliation" && <>{props.reconRows.map((row, index) => <RowCard key={row.id} index={index} remove={() => removeRow(props.setReconRows, row.id)} removeLabel={c.remove} wide>
      <NameField value={row.name} onChange={(value) => updateRow(props.setReconRows, row.id, { name: value })} placeholder={c.emptyName} />
      <NumberField label={es ? "Stock inicial" : "Opening stock"} value={row.openingStock} onChange={(value) => updateRow(props.setReconRows, row.id, { openingStock: value })} />
      <NumberField label={es ? "Entradas" : "Receipts"} value={row.received} onChange={(value) => updateRow(props.setReconRows, row.id, { received: value })} />
      <NumberField label={es ? "Botellas vendidas" : "Bottles sold"} value={row.bottlesSold} onChange={(value) => updateRow(props.setReconRows, row.id, { bottlesSold: value })} />
      <NumberField label={es ? "Copas vendidas" : "Glasses sold"} value={row.glassesSold} onChange={(value) => updateRow(props.setReconRows, row.id, { glassesSold: value })} />
      <NumberField label={es ? "Roturas" : "Breakage"} value={row.breakage} onChange={(value) => updateRow(props.setReconRows, row.id, { breakage: value })} />
      <NumberField label={es ? "Invitaciones" : "Comps"} value={row.comps} onChange={(value) => updateRow(props.setReconRows, row.id, { comps: value })} />
      <NumberField label={es ? "Stock real" : "Actual stock"} value={row.actualStock} onChange={(value) => updateRow(props.setReconRows, row.id, { actualStock: value })} />
      <NumberField label={es ? "Coste botella" : "Bottle cost"} value={row.unitCost} onChange={(value) => updateRow(props.setReconRows, row.id, { unitCost: value })} />
    </RowCard>)}{addButton(() => props.setReconRows((rows) => rows.length < 10 ? [...rows, createReconRow(`recon-${Date.now()}`)] : rows))}</>}
    {kind === "stockout" && <>{props.stockoutRows.map((row, index) => <RowCard key={row.id} index={index} remove={() => removeRow(props.setStockoutRows, row.id)} removeLabel={c.remove}>
      <NameField value={row.name} onChange={(value) => updateRow(props.setStockoutRows, row.id, { name: value })} placeholder={c.emptyName} />
      <NumberField label={es ? "Stock actual" : "Current stock"} value={row.currentStock} onChange={(value) => updateRow(props.setStockoutRows, row.id, { currentStock: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Venta diaria" : "Daily sales"} value={row.dailySales} onChange={(value) => updateRow(props.setStockoutRows, row.id, { dailySales: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Demanda de eventos" : "Event demand"} value={row.eventDemand} onChange={(value) => updateRow(props.setStockoutRows, row.id, { eventDemand: value })} unit={es ? "bot." : "btl."} />
      <NumberField label={es ? "Contribución por botella" : "Contribution per bottle"} value={row.contributionPerBottle} onChange={(value) => updateRow(props.setStockoutRows, row.id, { contributionPerBottle: value })} />
    </RowCard>)}{addButton(() => props.setStockoutRows((rows) => rows.length < 10 ? [...rows, createStockoutRow(`stockout-${Date.now()}`)] : rows))}</>}
  </div>;
}

const RowCard = ({ index, remove, removeLabel, wide, children }: { index: number; remove: () => void; removeLabel: string; wide?: boolean; children: React.ReactNode }) => <fieldset className="decision-row-card" data-wide={wide}><legend>{String(index + 1).padStart(2, "0")}</legend><button type="button" className="decision-remove" onClick={remove} title={removeLabel} aria-label={removeLabel}><Trash2 size={15} /></button><div className="decision-row-grid">{children}</div></fieldset>;

function ResultStep({ kind, locale, result, money, decimal, formula, sourceLabel }: { kind: ToolKind; locale: Locale; result: OrderPlanResult | PairingProfitabilityResult | StockReconciliationResult | StockoutRiskResult; money: Intl.NumberFormat; decimal: Intl.NumberFormat; formula: string; sourceLabel: string }) {
  const es = locale === "es";
  return <div className="decision-result">
    {kind === "order" && <OrderResult result={result as OrderPlanResult} es={es} money={money} decimal={decimal} />}
    {kind === "pairing" && <PairingResult result={result as PairingProfitabilityResult} es={es} money={money} decimal={decimal} />}
    {kind === "reconciliation" && <ReconciliationResult result={result as StockReconciliationResult} es={es} money={money} decimal={decimal} />}
    {kind === "stockout" && <StockoutResult result={result as StockoutRiskResult} es={es} money={money} decimal={decimal} />}
    <div className="decision-source"><h3>{es ? "Origen de las cifras" : "Source of the figures"}</h3><span>{sourceLabel}</span><span>{es ? "Calculado con tus datos" : "Calculated from your data"}</span></div>
    <details className="decision-formula"><summary><Scale size={15} /> {es ? "Fórmula visible" : "Visible formula"}</summary><p>{formula}</p></details>
  </div>;
}

function OrderResult({ result, es, money, decimal }: { result: OrderPlanResult; es: boolean; money: Intl.NumberFormat; decimal: Intl.NumberFormat }) {
  return <><div className="decision-headline"><PackageCheck size={23} /><div><span>{es ? "Pedido propuesto" : "Proposed order"}</span><strong>{result.totalBottles} {es ? "botellas" : "bottles"} · {result.totalCases} {es ? "cajas" : "cases"} · {money.format(result.totalCost)}</strong><p>{result.urgentCount ? `${result.urgentCount} ${es ? "referencias no llegan a la próxima entrega" : "references may not reach the next delivery"}.` : es ? "Ninguna referencia se agotaría antes de la próxima entrega." : "No reference should run out before the next delivery."}</p></div></div><div className="decision-list">{result.rows.map((row) => <article key={row.id}><div><span className={`decision-status ${row.status}`}>{row.status === "urgent" ? (es ? "Urgente" : "Urgent") : row.status === "order" ? (es ? "Pedir" : "Order") : (es ? "No reponer" : "Hold")}</span><h3>{row.name}</h3><p>{es ? "Cobertura actual" : "Current cover"}: {row.daysCover === null ? "—" : `${decimal.format(row.daysCover)} ${es ? "días" : "days"}`}</p></div><div className="decision-line-metrics"><b>{row.casesToOrder} {es ? "cajas" : "cases"}</b><span>{row.bottlesToOrder} {es ? "botellas" : "bottles"}</span><span>{money.format(row.orderCost)}</span></div></article>)}</div></>;
}

function PairingResult({ result, es, money, decimal }: { result: PairingProfitabilityResult; es: boolean; money: Intl.NumberFormat; decimal: Intl.NumberFormat }) {
  return <><div className="decision-kpis"><Metric label={es ? "Coste por comensal" : "Cost per guest"} value={money.format(result.costPerGuest)} /><Metric label="Beverage cost" value={result.beverageCostPct === null ? "—" : `${decimal.format(result.beverageCostPct)} %`} /><Metric label={es ? "Contribución mensual" : "Monthly contribution"} value={money.format(result.monthlyContribution)} accent /><Metric label={es ? "Impacto de +10 ml" : "+10 ml impact"} value={money.format(result.overpourTenMlMonthlyImpact)} /></div><div className="decision-note"><GlassWater size={18} /><p>{es ? `Para un objetivo de beverage cost, el ingreso atribuido al vino debería ser al menos ${money.format(result.minimumRevenueForTarget)} por comensal.` : `For the target beverage cost, wine revenue allocation should be at least ${money.format(result.minimumRevenueForTarget)} per guest.`}</p></div><div className="decision-list">{result.wines.map((wine) => <article key={wine.id}><div><h3>{wine.name}</h3><p>{money.format(wine.costPerGuest)} {es ? "por comensal" : "per guest"}</p></div><div className="decision-line-metrics"><b>{wine.bottlesPerService} {es ? "botellas/servicio" : "bottles/service"}</b><span>{wine.pourMl} ml</span></div></article>)}</div></>;
}

function ReconciliationResult({ result, es, money, decimal }: { result: StockReconciliationResult; es: boolean; money: Intl.NumberFormat; decimal: Intl.NumberFormat }) {
  return <><div className="decision-kpis"><Metric label={es ? "Referencias con diferencia" : "References with variance"} value={String(result.mismatchCount)} /><Metric label={es ? "Diferencia absoluta" : "Absolute variance"} value={`${decimal.format(result.totalAbsoluteVariance)} ${es ? "bot." : "btl."}`} /><Metric label={es ? "Coste a revisar" : "Cost to review"} value={money.format(result.totalVarianceCost)} accent /></div><div className="decision-list">{result.rows.map((row) => <article key={row.id}><div><span className={`decision-status ${row.status}`}>{row.status === "missing" ? (es ? "Falta stock" : "Missing") : row.status === "surplus" ? (es ? "Sobra stock" : "Surplus") : (es ? "Cuadra" : "Balanced")}</span><h3>{row.name}</h3><p>{es ? "Teórico" : "Theoretical"}: {decimal.format(row.theoreticalStock)} · {es ? "Real" : "Actual"}: {decimal.format(row.actualStock)}</p></div><div className="decision-line-metrics"><b>{row.variance > 0 ? "+" : ""}{decimal.format(row.variance)} {es ? "bot." : "btl."}</b><span>{money.format(row.varianceCost)}</span></div></article>)}</div><div className="decision-note"><Scale size={18} /><p>{es ? "Empieza contando y revisando la referencia con mayor coste de diferencia. Después comprueba copas, invitaciones, roturas y mapeo TPV." : "Start by recounting the reference with the highest variance cost. Then review glasses, comps, breakage and POS mapping."}</p></div></>;
}

function StockoutResult({ result, es, money, decimal }: { result: StockoutRiskResult; es: boolean; money: Intl.NumberFormat; decimal: Intl.NumberFormat }) {
  return <><div className="decision-kpis"><Metric label={es ? "Referencias en riesgo" : "References at risk"} value={String(result.riskCount)} /><Metric label={es ? "Unidades no sustituibles" : "Non-substitutable units"} value={decimal.format(result.totalUnitsAtRisk)} /><Metric label={es ? "Margen en riesgo" : "Contribution at risk"} value={money.format(result.totalContributionAtRisk)} accent /><Metric label={es ? "Compra mínima urgente" : "Minimum emergency buy"} value={`${result.totalEmergencyQuantity} ${es ? "bot." : "btl."}`} /></div><div className="decision-list">{result.rows.map((row) => <article key={row.id}><div><span className={`decision-status ${row.status}`}>{row.status === "risk" ? (es ? "Riesgo" : "Risk") : (es ? "Cubierto" : "Covered")}</span><h3>{row.name}</h3><p>{es ? "Cobertura" : "Coverage"}: {row.daysCover === null ? "—" : `${decimal.format(row.daysCover)} ${es ? "días" : "days"}`}</p></div><div className="decision-line-metrics"><b>{money.format(row.contributionAtRisk)}</b><span>{decimal.format(row.lostUnits)} {es ? "unidades no sustituibles" : "non-substitutable units"}</span><span>{row.emergencyQuantity} {es ? "botellas urgentes" : "urgent bottles"}</span></div></article>)}</div><div className="decision-note"><TrendingDown size={18} /><p>{es ? "La sustitución reduce la venta perdida estimada, pero no corrige el faltante físico. Revisa primero las referencias con mayor margen en riesgo." : "Substitution reduces estimated lost sales but does not fix the physical shortage. Review the highest contribution at risk first."}</p></div></>;
}

const relatedLinks = (kind: ToolKind, locale: Locale) => {
  const es = locale === "es";
  const routes = [
    { to: TOOL_ROUTES.order[locale], label: es ? "Planificador de pedido semanal" : "Weekly order planner", type: "tool" as const },
    { to: TOOL_ROUTES.pairing[locale], label: es ? "Rentabilidad de menú y maridaje" : "Pairing menu profitability", type: "tool" as const },
    { to: TOOL_ROUTES.reconciliation[locale], label: es ? "Conciliador de stock" : "Stock reconciliation", type: "tool" as const },
    { to: TOOL_ROUTES.stockout[locale], label: es ? "Riesgo de rotura de stock" : "Stockout risk", type: "tool" as const },
    { to: es ? "/herramientas/calculadora-mermas-vino" : "/en/tools/wine-waste-calculator", label: es ? "Calculadora de mermas" : "Wine waste calculator", type: "tool" as const },
  ];
  return routes.filter((item) => item.to !== TOOL_ROUTES[kind][locale]).slice(0, 4);
};
