import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FlaskConical,
  GlassWater,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
  Wine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import productImage from "@/assets/presentation/stock-management.webp";
import { ga } from "@/lib/analytics";
import { trackToolUse } from "@/hooks/useIntentTracker";
import {
  calculateWineWaste,
  EMPTY_WINE_WASTE_ANSWERS,
  EXAMPLE_WINE_WASTE_ANSWERS,
  validateWineWasteAnswers,
  WINE_WASTE_BASELINES,
  type WineWasteAnswers,
  type WineWasteCurrency,
  type WineWasteResult,
  type WineWasteSource,
} from "@/lib/wineWaste";
import "./RentabilidadBodega.css";
import "./CalculadoraMermasVino.css";

const copy = {
  es: {
    title: "Calculadora de mermas de vino para restaurantes | Winerim",
    description: "Calcula cuánto vino pierdes al mes por copeo, botellas abiertas, roturas, invitaciones e inventario. Cálculo local, gratis y sin registro.",
    path: "/herramientas/calculadora-mermas-vino",
    eyebrow: "Control de merma",
    h1: "¿Cuánto vino pierdes cada mes?",
    intro: "Copeo, botellas abiertas, roturas, invitaciones e inventario. Un escenario con fórmulas visibles, sin promesas ocultas.",
    local: "Cálculo local · No enviamos tus cifras",
    steps: ["Contexto", "Tus cifras", "Resultado"],
    step: (n: number) => `Paso ${n} de 3`,
    contextTitle: "Sitúa tu operativa de vino",
    figuresTitle: "Añade las fuentes que quieras medir",
    resultTitle: "Tu escenario de merma",
    profile: "Tipo de negocio",
    profiles: { restaurant: "Restaurante", wineBar: "Wine bar", hotel: "Hotel", group: "Grupo" },
    currency: "Moneda",
    purchases: "Compras de vino al mes",
    purchasesHelp: "Opcional. Permite expresar la merma como porcentaje de compras.",
    bottleCost: "Coste medio de una botella",
    unknown: "No lo sé: usar 9 como punto de partida editable",
    unknownNote: "9 es un punto de partida para editar, no un benchmark del sector.",
    byGlass: "¿Vendes vino por copa?",
    yes: "Sí",
    no: "No",
    noVat: "Todos los importes se introducen sin IVA.",
    continue: "Continuar",
    back: "Volver",
    calculate: "Calcular merma",
    loadExample: "Cargar ejemplo ficticio",
    reset: "Reiniciar",
    glass: "A · Copeo",
    bottles: "B · Botellas enteras perdidas al mes",
    deliveries: "C · Albaranes, opcional",
    opened: "Botellas abiertas para copa al mes",
    glassBottleCost: "Coste medio de la botella de copa",
    glassPrice: "PVP medio de la copa",
    theoretical: "Copas que deberían salir por botella",
    charged: "Copas cobradas al mes",
    estimateCharged: "No conozco las copas cobradas: estimar con rendimiento base del 86 %",
    discarded: "Botellas de copa tiradas por pasarse de plazo",
    remaining: "Copas que quedaban de media en cada botella tirada",
    actualPour: "Ml servidos realmente por copa",
    targetPour: "Ml objetivo por copa",
    broken: "Rotas o con defecto",
    unregistered: "Invitaciones y consumo del personal sin registrar",
    inventory: "Diferencia de inventario sin explicar",
    deliveryError: "% de compras afectado por errores de albarán",
    optional: "Opcional",
    base: "Estimación base Winerim, visible y no garantizada",
    fictional: "Ejemplo ficticio cuando lo cargas",
    entered: "Introducido por ti",
    calculated: "Calculado con tus datos",
    sourceTitle: "Origen de las cifras",
    validation: "Revisa los campos marcados. El coste medio de botella es obligatorio.",
    invalid: "Introduce un número positivo o cero.",
    required: "Este dato debe ser mayor que cero.",
    max100: "El porcentaje no puede superar el 100 %.",
    headline: (monthly: string, annual: string) => `Pierdes ≈ ${monthly} al mes en vino (${annual} al año), a coste`,
    purchaseShare: (share: string) => `Equivale al ${share} de tus compras mensuales de vino.`,
    unbilled: (value: string) => `Además, dejas de facturar ≈ ${value} al mes en copas que salieron y no se cobraron (PVP).`,
    separate: "No se suma al coste perdido: son magnitudes distintas.",
    breakdown: "De dónde viene el coste perdido",
    yield: (charged: string, expected: string, rate: string) => `Cobras ${charged} de ${expected} copas que deberían salir (${rate}).`,
    warning: "Tus copas cobradas superan las esperadas: revisa las copas por botella o las botellas abiertas.",
    actions: "Las 3 acciones con más impacto",
    formulas: "Fórmulas visibles",
    formulaBody: "Copas esperadas = botellas abiertas × copas por botella. Copas perdidas = máximo entre 0 y esperadas − cobradas. Coste de copeo = copas perdidas × coste por copa. Coste de botellas = botellas perdidas × coste medio. Albaranes = compras × porcentaje introducido. Total anual = total mensual × 12.",
    formulaNote: "La venta no cobrada se calcula aparte: (dosis generosa + copas sin explicar) × PVP de copa. La caducidad no se suma como venta no cobrada.",
    download: "Descargar escenario",
    profitability: "Ver mi diagnóstico de rentabilidad",
    demo: "Solicitar demo",
    productEyebrow: "Del escenario al control diario",
    productTitle: "Contrasta la estimación con ventas, stock y servicio.",
    productText: "Winerim conecta la carta, el TPV y el stock para medir copas por botella, bajas con motivo, consumo sin respaldo y documentos de compra.",
    productCaption: "Captura de producto. Sus cifras no pertenecen a este diagnóstico.",
    sources: {
      unexplainedGlasses: "Copas sin explicar",
      expiry: "Caducidad de botellas abiertas",
      generousPour: "Dosis generosa",
      breakage: "Roturas y defectos",
      unregistered: "Invitaciones sin registrar",
      inventory: "Diferencia de inventario",
      deliveryErrors: "Errores de albaranes",
    },
    actionCopy: {
      unexplainedGlasses: ["Registrar todas las copas en el TPV y revisar invitaciones de copa.", "Análisis del servicio: copas por botella reales."],
      expiry: ["Definir un plazo máximo por tipo de vino y revisar las botellas abiertas cada lunes.", "Días máximos de botella abierta por tipo y aviso de botella pasada."],
      generousPour: ["Usar medidor o copa marcada y reforzar la formación.", "Copas por botella reales frente a configuradas."],
      breakage: ["Registrar siempre el motivo de cada baja.", "Baja de stock con motivo: rotura, corcho o devolución."],
      unregistered: ["Registrar invitaciones y consumo del personal como salida con motivo.", "Baja de stock con motivo."],
      inventory: ["Hacer un recuento mensual y revisar primero los vinos de más valor.", "Valoración de stock y consumo sin respaldo."],
      deliveryErrors: ["Revisar cada albarán en 48 horas y recibir contra el pedido.", "Albaranes con OCR y recepción contra pedido."],
    },
    faq: [
      ["¿Qué es una merma de vino?", "El vino que pagas y no cobras: copas que no se cobran, botellas abiertas que se tiran, roturas, invitaciones sin registrar y botellas que faltan en el inventario."],
      ["¿Por qué separas coste perdido y venta no cobrada?", "Porque no se pueden sumar: una es dinero que ya pagaste; la otra, dinero que podías haber ingresado."],
      ["¿Es exacto?", "Es un escenario con tus cifras y estimaciones visibles. Para medirlo de verdad hacen falta las ventas del TPV, el stock y los recuentos."],
      ["¿Envías mis datos a algún sitio?", "No. El cálculo se hace en tu navegador."],
    ],
  },
  en: {
    title: "Wine waste calculator for restaurants | Winerim",
    description: "Calculate monthly wine waste from by-the-glass service, open bottles, breakage, unrecorded comps and inventory. Free, local and transparent.",
    path: "/en/tools/wine-waste-calculator",
    eyebrow: "Wine waste control",
    h1: "How much wine do you lose each month?",
    intro: "By-the-glass service, open bottles, breakage, comps and inventory. A scenario with visible formulas and no hidden promises.",
    local: "Local calculation · We do not send your figures",
    steps: ["Context", "Your figures", "Result"],
    step: (n: number) => `Step ${n} of 3`,
    contextTitle: "Set the context for your wine operation",
    figuresTitle: "Add the sources you want to measure",
    resultTitle: "Your wine waste scenario",
    profile: "Business type",
    profiles: { restaurant: "Restaurant", wineBar: "Wine bar", hotel: "Hotel", group: "Group" },
    currency: "Currency",
    purchases: "Monthly wine purchases",
    purchasesHelp: "Optional. Used to express waste as a percentage of purchases.",
    bottleCost: "Average bottle cost",
    unknown: "I don't know: use 9 as an editable starting point",
    unknownNote: "9 is an editable starting point, not an industry benchmark.",
    byGlass: "Do you sell wine by the glass?",
    yes: "Yes", no: "No", noVat: "Enter all amounts excluding tax.", continue: "Continue", back: "Back", calculate: "Calculate waste",
    loadExample: "Load fictional example", reset: "Reset", glass: "A · By the glass", bottles: "B · Whole bottles lost per month", deliveries: "C · Delivery notes, optional",
    opened: "Bottles opened for by-the-glass service each month", glassBottleCost: "Average cost of a by-the-glass bottle", glassPrice: "Average price per glass",
    theoretical: "Glasses expected from each bottle", charged: "Glasses charged each month", estimateCharged: "I don't know the charged glasses: estimate with the 86% base yield",
    discarded: "Open bottles discarded after their service window", remaining: "Average glasses left in each discarded bottle", actualPour: "Actual ml poured per glass", targetPour: "Target ml per glass",
    broken: "Broken or defective bottles", unregistered: "Unrecorded comps and staff consumption", inventory: "Unexplained inventory difference", deliveryError: "% of purchases affected by delivery-note errors",
    optional: "Optional", base: "Winerim base estimate, visible and not guaranteed", fictional: "Fictional example when loaded", entered: "Entered by you", calculated: "Calculated from your data",
    sourceTitle: "Source of the figures", validation: "Review the highlighted fields. Average bottle cost is required.", invalid: "Enter a positive number or zero.", required: "This value must be greater than zero.", max100: "The percentage cannot exceed 100%.",
    headline: (monthly: string, annual: string) => `You lose ≈ ${monthly} per month in wine (${annual} per year), at cost`, purchaseShare: (share: string) => `That equals ${share} of your monthly wine purchases.`,
    unbilled: (value: string) => `You also leave ≈ ${value} per month unbilled from glasses served but not charged (selling price).`, separate: "This is not added to lost cost: they are different measures.",
    breakdown: "Where the lost cost comes from", yield: (charged: string, expected: string, rate: string) => `You charge ${charged} of ${expected} expected glasses (${rate}).`,
    warning: "Charged glasses exceed expected glasses. Review glasses per bottle or bottles opened.", actions: "The 3 highest-impact actions", formulas: "Visible formulas",
    formulaBody: "Expected glasses = bottles opened × glasses per bottle. Lost glasses = max(0, expected − charged). By-the-glass cost = lost glasses × cost per glass. Bottle cost = bottles lost × average cost. Delivery notes = purchases × entered percentage. Annual total = monthly total × 12.",
    formulaNote: "Unbilled sales are calculated separately: (generous pours + unexplained glasses) × selling price per glass. Expired wine is not counted as an unbilled sale.",
    download: "Download scenario", profitability: "View my profitability diagnosis", demo: "Request a demo", productEyebrow: "From scenario to daily control", productTitle: "Compare the estimate with sales, stock and service.",
    productText: "Winerim connects your wine list, POS and stock to measure real glasses per bottle, reason-coded stock adjustments, unsupported consumption and purchase documents.", productCaption: "Product screenshot. Its figures do not belong to this diagnosis.",
    sources: { unexplainedGlasses: "Unexplained glasses", expiry: "Expired open bottles", generousPour: "Generous pours", breakage: "Breakage and defects", unregistered: "Unrecorded comps", inventory: "Inventory difference", deliveryErrors: "Delivery-note errors" },
    actionCopy: {
      unexplainedGlasses: ["Record every glass in the POS and review by-the-glass comps.", "Service analysis: real glasses per bottle."], expiry: ["Set a maximum service window by wine type and review open bottles every Monday.", "Maximum open-bottle days by type and overdue-bottle alert."],
      generousPour: ["Use a measure or marked glass and reinforce training.", "Actual glasses per bottle versus configured glasses."], breakage: ["Always record the reason for each stock adjustment.", "Reason-coded stock adjustment: breakage, cork or return."],
      unregistered: ["Record comps and staff consumption as reason-coded stock movements.", "Reason-coded stock adjustment."], inventory: ["Count monthly and review the highest-value wines first.", "Stock valuation and unsupported consumption."],
      deliveryErrors: ["Review each delivery note within 48 hours and receive it against the order.", "OCR delivery notes and receipt against order."],
    },
    faq: [["What is wine waste?", "Wine you pay for but do not charge: unbilled glasses, discarded open bottles, breakage, unrecorded comps and missing inventory."], ["Why separate lost cost and unbilled sales?", "Because they cannot be added: one is money already spent; the other is revenue you might have collected."], ["Is it exact?", "It is a scenario based on your figures and visible estimates. Actual measurement requires POS sales, stock and counts."], ["Do you send my data anywhere?", "No. The calculation runs in your browser."]],
  },
} as const;

type Copy = (typeof copy)[keyof typeof copy];

const sourceUnits: Record<WineWasteSource, "glasses" | "bottles" | "percent"> = {
  unexplainedGlasses: "glasses", expiry: "glasses", generousPour: "glasses", breakage: "bottles", unregistered: "bottles", inventory: "bottles", deliveryErrors: "percent",
};

const Field = ({ id, label, value, onChange, unit, hint, error }: { id: keyof WineWasteAnswers; label: string; value: string; onChange: (value: string) => void; unit?: string; hint?: string; error?: string }) => (
  <label htmlFor={`waste-${id}`}>
    {label}
    <span className="profit-input-wrap">
      <input id={`waste-${id}`} inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={hint || error ? `waste-${id}-help` : undefined} />
      {unit && <span>{unit}</span>}
    </span>
    {(hint || error) && <small id={`waste-${id}-help`} className={error ? "profit-error" : "waste-hint"}>{error || hint}</small>}
  </label>
);

export default function CalculadoraMermasVino() {
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en/");
  const t: Copy = isEnglish ? copy.en : copy.es;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WineWasteAnswers>(EMPTY_WINE_WASTE_ANSWERS);
  const [result, setResult] = useState<WineWasteResult | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [isExample, setIsExample] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const validation = useMemo(() => validateWineWasteAnswers(answers), [answers]);
  const currency = useMemo(() => new Intl.NumberFormat(isEnglish ? "en-US" : "es-ES", { style: "currency", currency: answers.currency, maximumFractionDigits: 0 }), [answers.currency, isEnglish]);
  const decimal = useMemo(() => new Intl.NumberFormat(isEnglish ? "en-US" : "es-ES", { maximumFractionDigits: 1 }), [isEnglish]);

  const update = <K extends keyof WineWasteAnswers>(key: K, value: WineWasteAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setResult(null);
    setIsExample(false);
  };
  const errorText = (key: keyof WineWasteAnswers) => {
    if (!showErrors || !validation.errors[key]) return undefined;
    return validation.errors[key] === "required" ? t.required : validation.errors[key] === "max_100" ? t.max100 : t.invalid;
  };
  const go = (next: number) => {
    if (next === 1 && validation.errors.averageBottleCost) { setShowErrors(true); return; }
    setStep(next); setShowErrors(false);
    trackToolUse("wine_waste_calculator", { action: `step_${next + 1}` });
    requestAnimationFrame(() => titleRef.current?.focus());
  };
  const loadExample = () => {
    setAnswers(EXAMPLE_WINE_WASTE_ANSWERS); setIsExample(true); setShowErrors(false); setResult(null);
    trackToolUse("wine_waste_calculator", { action: "load_example" });
  };
  const calculate = () => {
    if (Object.keys(validation.errors).length) { setShowErrors(true); return; }
    const next = calculateWineWaste(answers);
    setResult(next); setStep(2); setShowErrors(false);
    trackToolUse("wine_waste_calculator", { action: "calculate", example: isExample });
    requestAnimationFrame(() => titleRef.current?.focus());
  };
  const reset = () => { setAnswers(EMPTY_WINE_WASTE_ANSWERS); setResult(null); setStep(0); setIsExample(false); setShowErrors(false); trackToolUse("wine_waste_calculator", { action: "reset" }); };
  const download = () => {
    if (!result) return;
    const lines = [t.h1, t.headline(currency.format(result.monthlyCost), currency.format(result.annualCost)), t.unbilled(currency.format(result.unbilledSales)), "", t.breakdown, ...result.breakdown.map((item) => `${t.sources[item.source]}: ${currency.format(item.amount)}`), "", t.formulas, t.formulaBody, t.formulaNote];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = isEnglish ? "winerim-wine-waste-scenario.txt" : "escenario-mermas-vino-winerim.txt"; anchor.click(); URL.revokeObjectURL(url);
    trackToolUse("wine_waste_calculator", { action: "download" });
  };

  const topActions = result?.breakdown.filter((item) => item.amount > 0).slice(0, 3) ?? [];
  const sourceLabel = isExample ? t.fictional : t.entered;
  const faqs = t.faq.map(([q, a]) => ({ q, a }));

  return <div className="profitability-page waste-page">
    <SEOHead title={t.title} description={t.description} url={t.path} hreflang={[{ lang: "es", url: "https://winerim.wine/herramientas/calculadora-mermas-vino" }, { lang: "en", url: "https://winerim.wine/en/tools/wine-waste-calculator" }, { lang: "x-default", url: "https://winerim.wine/herramientas/calculadora-mermas-vino" }]} structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: t.h1, description: t.description, url: `https://winerim.wine${t.path}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0" } }} />
    <a className="profit-skip" href="#waste-calculator">{isEnglish ? "Skip to calculator" : "Ir a la calculadora"}</a>
    <Navbar />
    <main>
      <header className="profit-intro">
        <p className="profit-eyebrow">{t.eyebrow}</p>
        <h1>{t.h1}</h1>
        <p>{t.intro}</p>
        <span className="profit-local"><ShieldCheck size={14} aria-hidden /> {t.local}</span>
      </header>

      <section className="profit-workspace" id="waste-calculator" aria-label={t.h1}>
        <aside className="profit-sidebar">
          <p className="profit-eyebrow">{isEnglish ? "Wine waste" : "Merma de vino"}</p>
          <ol>{t.steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}><span>{step > index ? <Check size={14} /> : `0${index + 1}`}</span>{label}</li>)}</ol>
          <div className="profit-sidebar-bottom"><p>{t.noVat}</p><p>{t.local}</p><button type="button" className="profit-text-button" onClick={loadExample}><FlaskConical size={15} />{t.loadExample}</button></div>
        </aside>

        <div className="profit-form">
          <div className="profit-step-heading"><span>{t.step(step + 1)}</span><div className="profit-step-tools"><button type="button" className="profit-icon-button profit-mobile-sample" onClick={loadExample} title={t.loadExample}><FlaskConical size={16} /></button><button type="button" className="profit-icon-button" onClick={reset} title={t.reset}><RotateCcw size={16} /></button></div></div>

          {step === 0 && <>
            <h2 ref={titleRef} tabIndex={-1}>{t.contextTitle}</h2>
            {isExample && <p className="profit-example">{t.fictional}</p>}
            <div className="profit-fields">
              <label htmlFor="waste-profile">{t.profile}<select id="waste-profile" value={answers.profile} onChange={(event) => update("profile", event.target.value as WineWasteAnswers["profile"])}>{Object.entries(t.profiles).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              <label htmlFor="waste-currency">{t.currency}<select id="waste-currency" value={answers.currency} onChange={(event) => update("currency", event.target.value as WineWasteCurrency)}><option value="EUR">EUR · €</option><option value="USD">USD · $</option><option value="GBP">GBP · £</option></select></label>
              <Field id="monthlyPurchases" label={t.purchases} value={answers.monthlyPurchases} onChange={(value) => update("monthlyPurchases", value)} unit={answers.currency} hint={t.purchasesHelp} error={errorText("monthlyPurchases")} />
              <div><Field id="averageBottleCost" label={t.bottleCost} value={answers.averageBottleCost} onChange={(value) => update("averageBottleCost", value)} unit={answers.currency} error={errorText("averageBottleCost")} /><button type="button" className="profit-unknown" onClick={() => update("averageBottleCost", String(WINE_WASTE_BASELINES.unknownBottleCost))}>{t.unknown}</button><p className="waste-hint">{t.unknownNote}</p></div>
            </div>
            <fieldset className="profit-objectives waste-toggle"><legend>{t.byGlass}</legend><label><input type="radio" name="by-glass" checked={answers.sellsByGlass} onChange={() => update("sellsByGlass", true)} />{t.yes}</label><label><input type="radio" name="by-glass" checked={!answers.sellsByGlass} onChange={() => update("sellsByGlass", false)} />{t.no}</label></fieldset>
            <div className="profit-form-footer"><span>{showErrors && validation.errors.averageBottleCost ? t.validation : t.noVat}</span><button type="button" className="profit-primary" onClick={() => go(1)}>{t.continue}<ArrowRight size={16} /></button></div>
          </>}

          {step === 1 && <>
            <h2 ref={titleRef} tabIndex={-1}>{t.figuresTitle}</h2>
            {isExample && <p className="profit-example">{t.fictional}</p>}
            {answers.sellsByGlass && <section className="waste-input-section"><h3><GlassWater size={18} />{t.glass}</h3><div className="profit-fields">
              <Field id="glassBottlesOpened" label={t.opened} value={answers.glassBottlesOpened} onChange={(value) => update("glassBottlesOpened", value)} error={errorText("glassBottlesOpened")} />
              <Field id="glassBottleCost" label={t.glassBottleCost} value={answers.glassBottleCost} onChange={(value) => update("glassBottleCost", value)} unit={answers.currency} hint={answers.glassBottleCost ? undefined : `${t.base}: ${answers.averageBottleCost || WINE_WASTE_BASELINES.unknownBottleCost} ${answers.currency}`} error={errorText("glassBottleCost")} />
              <Field id="glassPrice" label={t.glassPrice} value={answers.glassPrice} onChange={(value) => update("glassPrice", value)} unit={answers.currency} error={errorText("glassPrice")} />
              <Field id="theoreticalGlassesPerBottle" label={t.theoretical} value={answers.theoreticalGlassesPerBottle} onChange={(value) => update("theoreticalGlassesPerBottle", value)} hint={t.base} error={errorText("theoreticalGlassesPerBottle")} />
              <Field id="chargedGlasses" label={t.charged} value={answers.chargedGlasses} onChange={(value) => update("chargedGlasses", value)} error={errorText("chargedGlasses")} />
              <Field id="discardedGlassBottles" label={t.discarded} value={answers.discardedGlassBottles} onChange={(value) => update("discardedGlassBottles", value)} error={errorText("discardedGlassBottles")} />
              <Field id="remainingGlassesPerDiscardedBottle" label={t.remaining} value={answers.remainingGlassesPerDiscardedBottle} onChange={(value) => update("remainingGlassesPerDiscardedBottle", value)} hint={t.base} error={errorText("remainingGlassesPerDiscardedBottle")} />
              <Field id="actualPourMl" label={t.actualPour} value={answers.actualPourMl} onChange={(value) => update("actualPourMl", value)} unit="ml" hint={t.optional} error={errorText("actualPourMl")} />
              <Field id="targetPourMl" label={t.targetPour} value={answers.targetPourMl} onChange={(value) => update("targetPourMl", value)} unit="ml" hint={t.base} error={errorText("targetPourMl")} />
            </div><label className="waste-check"><input type="checkbox" checked={answers.estimateChargedGlasses} onChange={(event) => update("estimateChargedGlasses", event.target.checked)} />{t.estimateCharged}</label></section>}
            <section className="waste-input-section"><h3><Wine size={18} />{t.bottles}</h3><div className="profit-fields"><Field id="brokenBottles" label={t.broken} value={answers.brokenBottles} onChange={(value) => update("brokenBottles", value)} error={errorText("brokenBottles")} /><Field id="unregisteredBottles" label={t.unregistered} value={answers.unregisteredBottles} onChange={(value) => update("unregisteredBottles", value)} error={errorText("unregisteredBottles")} /><Field id="inventoryDifferenceBottles" label={t.inventory} value={answers.inventoryDifferenceBottles} onChange={(value) => update("inventoryDifferenceBottles", value)} error={errorText("inventoryDifferenceBottles")} /></div></section>
            <section className="waste-input-section"><h3>{t.deliveries}</h3><div className="profit-fields"><Field id="deliveryErrorPercent" label={t.deliveryError} value={answers.deliveryErrorPercent} onChange={(value) => update("deliveryErrorPercent", value)} unit="%" hint={t.optional} error={errorText("deliveryErrorPercent")} /></div></section>
            {showErrors && Object.keys(validation.errors).length > 0 && <p className="profit-error">{t.validation}</p>}
            <div className="profit-form-footer"><button type="button" className="profit-text-button" onClick={() => go(0)}><ArrowLeft size={16} />{t.back}</button><button type="button" className="profit-primary" onClick={calculate}>{t.calculate}<ArrowRight size={16} /></button></div>
          </>}

          {step === 2 && result && <div aria-live="polite">
            <h2 ref={titleRef} tabIndex={-1}>{t.resultTitle}</h2>
            {isExample && <p className="profit-example">{t.fictional}</p>}
            <section className="waste-summary"><strong>{t.headline(currency.format(result.monthlyCost), currency.format(result.annualCost))}</strong>{result.wastePercentOfPurchases !== null && <p>{t.purchaseShare(`${decimal.format(result.wastePercentOfPurchases * 100)} %`)}</p>}<div><span>{t.unbilled(currency.format(result.unbilledSales))}</span><small>{t.separate}</small></div></section>
            {result.warnings.includes("charged_exceeds_expected") && <p className="waste-warning"><TriangleAlert size={17} />{t.warning}</p>}
            <section className="waste-result-section"><h3>{t.breakdown}</h3><div className="waste-bars">{result.breakdown.map((item) => { const max = Math.max(...result.breakdown.map((row) => row.amount), 1); return <div className="waste-bar" key={item.source}><div><span>{t.sources[item.source]}</span><strong>{currency.format(item.amount)}</strong></div><span className="waste-bar-track"><span style={{ width: `${item.amount / max * 100}%` }} /></span><small>{sourceLabel} · {decimal.format(item.units)} {sourceUnits[item.source] === "glasses" ? (isEnglish ? "glasses" : "copas") : sourceUnits[item.source] === "bottles" ? (isEnglish ? "bottles" : "botellas") : "%"}</small></div>; })}</div>
              {answers.sellsByGlass && result.glassYield !== null && <p className="waste-yield">{t.yield(decimal.format(result.chargedGlasses), decimal.format(result.expectedGlasses), `${decimal.format(result.glassYield * 100)} %`)}</p>}
            </section>
            <section className="profit-source-panel"><h3><ShieldCheck size={17} />{t.sourceTitle}</h3><div className="profit-source-list"><span>{t.entered}</span><span data-source="calculated">{t.calculated}</span>{result.usedEstimatedChargedGlasses && <span data-source="verified">{t.base}</span>}{isExample && <span>{t.fictional}</span>}</div></section>
            <section className="waste-result-section"><h3>{t.actions}</h3><ol className="profit-actions">{topActions.map((item, index) => <li key={item.source}><span>0{index + 1}</span><div><h3>{t.sources[item.source]}</h3><p>{t.actionCopy[item.source][0]}</p><p><strong>Winerim:</strong> {t.actionCopy[item.source][1]}</p></div></li>)}</ol></section>
            <details className="profit-formula"><summary>{t.formulas}</summary><p>{t.formulaBody}</p><p>{t.formulaNote}</p></details>
            <div className="profit-report-actions"><button type="button" className="profit-primary" onClick={download}><Download size={16} />{t.download}</button><Link className="profit-secondary-link" to={isEnglish ? "/en/tools/wine-cellar-profitability-diagnostic" : "/herramientas/diagnostico-rentabilidad-bodega"}>{t.profitability}<ArrowRight size={16} /></Link><Link className="profit-secondary-link" to={isEnglish ? "/en/demo" : "/demo"} onClick={() => ga.ctaClick("wine_waste_result_demo", isEnglish ? "/en/demo" : "/demo")}>{t.demo}<ArrowRight size={16} /></Link></div>
            <button type="button" className="profit-text-button profit-back" onClick={() => go(1)}><ArrowLeft size={16} />{t.back}</button>
          </div>}
        </div>
      </section>

      <section className="profit-product"><div><p className="profit-eyebrow">{t.productEyebrow}</p><h2>{t.productTitle}</h2><p>{t.productText}</p><Link to={isEnglish ? "/en/demo" : "/demo"}>{t.demo}<ArrowRight size={16} /></Link></div><figure><img src={productImage} alt={isEnglish ? "Winerim stock management view" : "Vista de gestión de stock en Winerim"} loading="lazy" /><figcaption>{t.productCaption}</figcaption></figure></section>
      <InternalLinks title={isEnglish ? "Related tools" : "Herramientas relacionadas"} links={[{ to: isEnglish ? "/en/tools/wine-cellar-profitability-diagnostic" : "/herramientas/diagnostico-rentabilidad-bodega", label: isEnglish ? "Wine cellar profitability diagnostic" : "Diagnóstico de rentabilidad de bodega", type: "tool" }, { to: "/herramientas/calculadora-stock-muerto", label: isEnglish ? "Dead stock calculator" : "Calculadora de stock muerto", type: "tool" }, { to: "/herramientas/diagnostico-vino-por-copa", label: isEnglish ? "By-the-glass wine diagnostic" : "Diagnóstico de vino por copa", type: "tool" }]} />
      <FAQSection faqs={faqs} schemaId="wine-waste-calculator" />
    </main>
    <Footer />
  </div>;
}
