import { type FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FlaskConical,
  Gauge,
  GlassWater,
  Package,
  RotateCcw,
  ShieldCheck,
  Wine,
} from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import productImage from "@/assets/feature-margins-overview.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { ga } from "@/lib/analytics";
import { createLeadSubmissionId, persistLeadAndMeasure } from "@/lib/leadSubmission";
import { notifyLead } from "@/lib/notifyLead";
import { trackFormSubmit, trackToolUse } from "@/hooks/useIntentTracker";
import {
  calculateProfitabilityDiagnosis,
  EMPTY_PROFITABILITY_ANSWERS,
  EXAMPLE_PROFITABILITY_ANSWERS,
  prioritizeProfitabilityAreas,
  PROFITABILITY_AREAS,
  type ProfitabilityArea,
  type ProfitabilityAreaSpec,
  type ProfitabilityCurrency,
} from "@/lib/profitability";
import "./RentabilidadBodega.css";

const icons = { bottle: Wine, glass: GlassWater, capital: Package, scenario: Gauge };

const EN_PROFITABILITY_AREAS: Record<ProfitabilityArea, ProfitabilityAreaSpec> = {
  bottle: {
    title: "Bottle",
    question: "What margin does one bottle generate?",
    basis: "Prices and costs excluding tax. Monthly contribution excludes fixed costs and waste.",
    formula: "Unit margin = net price − cost. Beverage Cost = cost ÷ net price. Monthly contribution = unit margin × bottles sold.",
    fields: [
      { key: "bottleCost", label: "Purchase cost per bottle", unit: "money" },
      { key: "bottlePvp", label: "Net selling price per bottle", unit: "money" },
      { key: "bottleUnitsMonth", label: "Bottles sold per month", unit: "units" },
    ],
    route: "/calculadora-margen-vino",
    action: "Review the reference pricing",
  },
  glass: {
    title: "By the glass",
    question: "What does one bottle sold by the glass generate?",
    basis: "Waste reduces billable glasses. This does not assume every open bottle sells through.",
    formula: "Effective glasses = theoretical glasses × (1 − waste). Beverage Cost = bottle cost ÷ effective bottle revenue.",
    fields: [
      { key: "glassBottleCost", label: "Bottle cost", unit: "money" },
      { key: "glassPvp", label: "Net price per glass", unit: "money" },
      { key: "glassesPerBottle", label: "Theoretical glasses per bottle", unit: "glasses" },
      { key: "glassWastePercent", label: "Estimated waste", unit: "percent" },
    ],
    route: "/calculadora-margen-vino",
    action: "Compare by-the-glass price and waste",
  },
  capital: {
    title: "Slow stock",
    question: "How much capital is tied up in slow-moving references?",
    basis: "Valued at purchase cost. Releasing stock recovers working capital; it is not profit.",
    formula: "Tied-up capital = slow units × average cost. Estimated release = tied-up capital × action percentage.",
    fields: [
      { key: "slowStockUnits", label: "Slow-moving bottles", unit: "units" },
      { key: "averageUnitCost", label: "Average cost per bottle", unit: "money" },
      { key: "releasePercent", label: "Share to act on", unit: "percent" },
    ],
    route: "/herramientas/calculadora-stock-muerto",
    action: "Identify references requiring a decision",
  },
  scenario: {
    title: "Scenario",
    question: "What changes when price, rotation and replenishment change?",
    basis: "You enter the scenario volume. The tool does not predict demand or guarantee that price changes will alter rotation.",
    formula: "Contribution = units × (net price − cost). Reorder point = scenario daily use × lead time + safety stock.",
    fields: [
      { key: "currentUnitsMonth", label: "Current units per month", unit: "units" },
      { key: "scenarioUnitsMonth", label: "Scenario units per month", unit: "units" },
      { key: "currentPvp", label: "Current net price", unit: "money" },
      { key: "scenarioPvp", label: "Scenario net price", unit: "money" },
      { key: "scenarioUnitCost", label: "Unit cost", unit: "money" },
      { key: "stockOnHand", label: "Current stock", unit: "units" },
      { key: "leadTimeDays", label: "Supplier lead time", unit: "days" },
      { key: "safetyStockUnits", label: "Safety stock", unit: "units" },
    ],
    route: "/producto/winerim-core",
    action: "Compare the scenario with actual sales and stock",
  },
};

const ES_COPY = {
  locale: "es-ES",
  title: "Diagnóstico de rentabilidad de la carta de vinos",
  description: "Calcula margen por botella y copa, Beverage Cost, capital inmovilizado y escenarios de precio, rotación y reposición con fórmulas transparentes.",
  skip: "Ir al diagnóstico",
  professional: "Para profesionales del vino",
  tools: "Herramientas",
  eyebrow: "Economía de la carta",
  intro: <>Botella, copa, stock y reposición.<br />Un escenario útil sin promesas ocultas.</>,
  local: "Cálculo local · No enviamos tus cifras",
  diagnosis: "Diagnóstico de rentabilidad",
  yourDiagnosis: "Tu diagnóstico",
  steps: ["Contexto", "Tus cifras", "Resultado"],
  noHidden: "Fórmulas visibles.",
  assumptionsSeparate: "Tus datos, los cálculos y los datos verificados se muestran por separado.",
  loadExample: "Cargar ejemplo ficticio",
  reset: "Reiniciar diagnóstico",
  step: (value: number) => `Paso ${value} de 3`,
  start: "Sitúa el contexto de tu carta",
  resultTitle: "Lectura económica de tu carta",
  exampleInput: "Ejemplo ficticio. Puedes modificar cada supuesto.",
  exampleResult: "Ejemplo ficticio: no corresponde a ningún cliente.",
  businessType: "Tipo de negocio",
  profiles: ["Restaurante", "Wine bar", "Hotel", "Grupo de restauración"],
  locations: "Número de locales",
  references: "Referencias por local",
  referenceOptions: ["No lo sé", "Menos de 50", "50 a 150", "151 a 500", "Más de 500"],
  currency: "Moneda",
  usd: "USD · Dólar estadounidense",
  gbp: "GBP · Libra esterlina",
  objective: "¿Qué quieres revisar primero?",
  beforeContact: "El resultado completo aparece antes de pedir ningún dato de contacto.",
  continue: "Continuar",
  areaLabel: "Área del diagnóstico",
  complete: "Datos completos",
  basis: (profile: string, locations: string, currency: string) => `${profile} · ${locations} local(es) · ${currency} · importes sin impuestos · totales de todos los locales`,
  noData: "Sin dato",
  unknown: "No lo sé",
  formulaSummary: "Ver fórmula y criterio",
  formula: "Fórmula:",
  formulaNote: "Los volúmenes del escenario los defines tú. Un dato vacío no equivale a cero.",
  reviewValues: "Revisa los valores marcados antes de continuar.",
  back: "Volver",
  viewDiagnosis: "Ver diagnóstico",
  coverage: (coverage: number, currency: string, locations: string) => `${coverage} de 4 bloques calculados · ${currency} · ${locations} local(es)`,
  entered: "Introducido por ti",
  calculated: "Calculado con tus datos",
  verified: "Verificado con datos operativos",
  notConnected: "No conectado en este diagnóstico público",
  sourceTitle: "Origen de las cifras",
  sourceNote: "Winerim puede contrastar el escenario con TPV, carta, compras y stock cuando esas fuentes están conectadas y validadas.",
  noResult: "Completa este bloque para obtener su resultado.",
  bottleTitle: "Margen bruto por botella",
  glassTitle: "Beverage Cost por copa",
  capitalTitle: "Capital en stock lento",
  scenarioTitle: "Cambio de contribución del escenario",
  monthlyContribution: "Contribución mensual",
  unitMargin: "Margen por botella",
  beverageCost: "Beverage Cost",
  effectiveGlasses: "Copas efectivas",
  breakEven: "Copas para cubrir coste",
  estimatedRelease: "Capital sobre el que actuar",
  currentScenario: "Actual → escenario",
  volumeChange: "Cambio de unidades definido",
  reorderPoint: "Punto de reposición orientativo",
  coverageDays: "Cobertura de stock",
  units: "uds.",
  days: "días",
  disclaimer: "Los resultados son cálculos aritméticos sobre tus supuestos, no una predicción, garantía de rentabilidad, valoración contable ni recomendación financiera. El capital liberable no es beneficio y el escenario no demuestra causalidad entre precio y demanda.",
  how: "Cómo se calcula",
  review: "Revisar supuestos",
  completeData: "Completar datos",
  contrast: "Contrasta este bloque con datos operativos.",
  gather: "Reúne los datos que faltan.",
  download: "Descargar informe local",
  demo: "Solicitar demo",
  edit: "Editar diagnóstico",
  core: "Ver Winerim Core",
  cloud: "Ver CloudRIM",
  planTitle: "Solicita una revisión ampliada",
  planText: "El resultado ya es tuyo. Si quieres que el equipo revise el siguiente paso, basta con un email. Las cifras del diagnóstico no se envían.",
  email: "Email profesional",
  restaurant: "Empresa o restaurante (opcional)",
  privacy: "Acepto que Winerim use estos datos para responder a esta solicitud, según la política de privacidad.",
  marketing: "También quiero recibir novedades y recursos de Winerim (opcional).",
  sendPlan: "Solicitar revisión",
  sending: "Enviando…",
  sent: "Solicitud recibida. El equipo revisará contigo el siguiente paso.",
  sendError: "No se ha podido enviar. Inténtalo de nuevo.",
  consentError: "Necesitamos tu aceptación para responder a la solicitud.",
  productEyebrow: "Del escenario a la evidencia",
  productTitle: <>Contrasta la hipótesis<br />con la operativa real.</>,
  productText: "Winerim Core conecta pricing, rotación y stock. CloudRIM aporta costes y documentos cuando están disponibles y validados.",
  imageAlt: "Vista de Winerim con salud de carta, ventas y capital inmovilizado",
  imageCaption: "Captura de producto. Sus cifras no pertenecen a este diagnóstico.",
  footer: "Winerim · Decisiones con contexto",
  localFooter: (version: string) => `Modelo ${version} · cálculo local`,
};

const EN_COPY = {
  ...ES_COPY,
  locale: "en-US",
  title: "Wine List Profitability Diagnostic",
  description: "Calculate bottle and by-the-glass margin, Beverage Cost, tied-up capital, and transparent price, rotation and replenishment scenarios.",
  skip: "Skip to the diagnostic",
  professional: "For wine professionals",
  tools: "Tools",
  eyebrow: "Wine-list economics",
  intro: <>Bottle, glass, stock and replenishment.<br />A useful scenario without hidden promises.</>,
  local: "Calculated locally · We do not send your figures",
  diagnosis: "Profitability diagnostic",
  yourDiagnosis: "Your diagnostic",
  steps: ["Context", "Your figures", "Result"],
  noHidden: "Visible formulas.",
  assumptionsSeparate: "Entered, calculated and verified data are kept separate.",
  loadExample: "Load a fictional example",
  reset: "Reset diagnostic",
  step: (value: number) => `Step ${value} of 3`,
  start: "Set the context for your wine list",
  resultTitle: "Economic reading of your wine list",
  exampleInput: "Fictional example. You can edit every assumption.",
  exampleResult: "Fictional example: it does not represent a customer.",
  businessType: "Business type",
  profiles: ["Restaurant", "Wine bar", "Hotel", "Restaurant group"],
  locations: "Number of locations",
  references: "References per location",
  referenceOptions: ["I don't know", "Fewer than 50", "50 to 150", "151 to 500", "More than 500"],
  currency: "Currency",
  usd: "USD · US dollar",
  gbp: "GBP · Pound sterling",
  objective: "What do you want to review first?",
  beforeContact: "The complete result appears before any contact details are requested.",
  continue: "Continue",
  areaLabel: "Diagnostic area",
  complete: "Complete data",
  basis: (profile: string, locations: string, currency: string) => `${profile} · ${locations} location(s) · ${currency} · amounts excluding tax · totals for all locations`,
  noData: "No data",
  unknown: "I don't know",
  formulaSummary: "See formula and criteria",
  formula: "Formula:",
  formulaNote: "You define scenario volumes. A blank field is not zero.",
  reviewValues: "Review the marked values before continuing.",
  back: "Back",
  viewDiagnosis: "View diagnostic",
  coverage: (coverage: number, currency: string, locations: string) => `${coverage} of 4 blocks calculated · ${currency} · ${locations} location(s)`,
  entered: "Entered by you",
  calculated: "Calculated from your data",
  verified: "Verified operational data",
  notConnected: "Not connected in this public diagnostic",
  sourceTitle: "Source of each figure",
  sourceNote: "Winerim can compare the scenario with POS, list, purchasing and stock data when those sources are connected and validated.",
  noResult: "Complete this block to see its result.",
  bottleTitle: "Gross margin per bottle",
  glassTitle: "By-the-glass Beverage Cost",
  capitalTitle: "Capital in slow stock",
  scenarioTitle: "Scenario contribution change",
  monthlyContribution: "Monthly contribution",
  unitMargin: "Margin per bottle",
  beverageCost: "Beverage Cost",
  effectiveGlasses: "Effective glasses",
  breakEven: "Glasses to cover cost",
  estimatedRelease: "Capital to act on",
  currentScenario: "Current → scenario",
  volumeChange: "Defined unit change",
  reorderPoint: "Indicative reorder point",
  coverageDays: "Stock coverage",
  units: "units",
  days: "days",
  disclaimer: "Results are arithmetic calculations based on your assumptions, not a forecast, profitability guarantee, accounting valuation or financial recommendation. Releasable capital is not profit, and the scenario does not prove causality between price and demand.",
  how: "How it is calculated",
  review: "Review assumptions",
  completeData: "Complete data",
  contrast: "Compare this block with operational data.",
  gather: "Collect the missing data.",
  download: "Download local report",
  demo: "Request a demo",
  edit: "Edit diagnostic",
  core: "See Winerim Core",
  cloud: "See CloudRIM",
  planTitle: "Request an expanded review",
  planText: "The result is already yours. If you want the team to review the next step, an email is enough. Your diagnostic figures are not sent.",
  email: "Work email",
  restaurant: "Company or restaurant (optional)",
  privacy: "I agree that Winerim may use these details to respond to this request, under the privacy policy.",
  marketing: "I also want to receive Winerim updates and resources (optional).",
  sendPlan: "Request review",
  sending: "Sending…",
  sent: "Request received. The team will review the next step with you.",
  sendError: "We could not send the request. Please try again.",
  consentError: "We need your consent to respond to the request.",
  productEyebrow: "From scenario to evidence",
  productTitle: <>Compare the hypothesis<br />with real operations.</>,
  productText: "Winerim Core connects pricing, rotation and stock. CloudRIM adds purchasing costs and documents when they are available and validated.",
  imageAlt: "Winerim view showing wine-list health, sales and tied-up capital",
  imageCaption: "Product screenshot. Its figures do not belong to this diagnostic.",
  footer: "Winerim · Decisions with context",
  localFooter: (version: string) => `Model ${version} · local calculation`,
};

const areaKeys = Object.keys(PROFITABILITY_AREAS) as ProfitabilityArea[];

export default function RentabilidadBodega() {
  const { lang, localePath } = useLanguage();
  const isEnglish = lang === "en";
  const t = isEnglish ? EN_COPY : ES_COPY;
  const areaSpecs = isEnglish ? EN_PROFITABILITY_AREAS : PROFITABILITY_AREAS;
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(isEnglish ? "Restaurant" : "Restaurante");
  const [locations, setLocations] = useState("1");
  const [references, setReferences] = useState(isEnglish ? "I don't know" : "No lo sé");
  const [currency, setCurrency] = useState<ProfitabilityCurrency>(isEnglish ? "USD" : "EUR");
  const [objective, setObjective] = useState<ProfitabilityArea>("bottle");
  const [activeArea, setActiveArea] = useState<ProfitabilityArea>("bottle");
  const [answers, setAnswers] = useState({ ...EMPTY_PROFITABILITY_ANSWERS });
  const [example, setExample] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadIdRef = useRef<string | null>(null);

  const diagnosis = calculateProfitabilityDiagnosis(answers, currency);
  const locationValid = /^\d+$/.test(locations) && Number(locations) >= 1 && Number(locations) <= 1000;
  const spec = areaSpecs[activeArea];
  const money = (value: number, digits = 0) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency, maximumFractionDigits: digits }).format(value);
  const number = (value: number, digits = 1) =>
    new Intl.NumberFormat(t.locale, { maximumFractionDigits: digits }).format(value);
  const signedMoney = (value: number) => `${value > 0 ? "+" : ""}${money(value)}`;
  const errorText = (error: string) => {
    if (!isEnglish) return error;
    if (error.includes("porcentaje")) return "The percentage cannot exceed 100%.";
    if (error.includes("inferior")) return "Waste must be below 100%.";
    if (error.includes("mayor")) return "The value must be greater than zero.";
    if (error.includes("límite")) return "The value exceeds this diagnostic's limit.";
    return "Use a positive number or zero, without a thousands separator.";
  };

  const unitLabel = (unit: ProfitabilityAreaSpec["fields"][number]["unit"]) => {
    if (unit === "money") return currency;
    if (unit === "percent") return "%";
    if (unit === "days") return t.days;
    if (unit === "glasses") return isEnglish ? "glasses" : "copas";
    return t.units;
  };

  const go = (next: number) => {
    setStep(next);
    if (next === 2) {
      trackToolUse("diagnostico-rentabilidad-bodega", {
        action: "result_viewed",
        coverage: diagnosis.coverage,
        objective,
        example,
      });
    }
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const reset = () => {
    setAnswers({ ...EMPTY_PROFITABILITY_ANSWERS });
    setExample(false);
    setSubmitted(false);
    setProfile(isEnglish ? "Restaurant" : "Restaurante");
    setLocations("1");
    setReferences(isEnglish ? "I don't know" : "No lo sé");
    setCurrency(isEnglish ? "USD" : "EUR");
    setObjective("bottle");
    setActiveArea("bottle");
    go(0);
  };

  const loadExample = () => {
    setAnswers({ ...EXAMPLE_PROFITABILITY_ANSWERS });
    setExample(true);
    setActiveArea(objective);
    trackToolUse("diagnostico-rentabilidad-bodega", { action: "example_loaded" });
    go(1);
  };

  const report = () => {
    const b = diagnosis.results.bottle;
    const g = diagnosis.results.glass;
    const c = diagnosis.results.capital;
    const s = diagnosis.results.scenario;
    return [
      `Winerim | ${t.title}`,
      example ? t.exampleResult : (isEnglish ? "Scenario entered by the user" : "Escenario introducido por el usuario"),
      t.basis(profile, locations, currency),
      `${t.sourceTitle}: ${t.entered} → ${t.calculated}. ${t.verified}: ${t.notConnected}.`,
      b ? `${t.bottleTitle}: ${number(b.marginPercent)}%. ${t.unitMargin}: ${money(b.grossMarginPerBottle, 2)}. ${t.beverageCost}: ${number(b.beverageCostPercent)}%. ${t.monthlyContribution}: ${money(b.monthlyContribution)}.` : `${t.bottleTitle}: ${t.noResult}`,
      g ? `${t.glassTitle}: ${number(g.beverageCostPercent)}%. ${t.effectiveGlasses}: ${number(g.effectiveGlasses)}. ${t.breakEven}: ${g.breakEvenGlasses}.` : `${t.glassTitle}: ${t.noResult}`,
      c ? `${t.capitalTitle}: ${money(c.tiedCapital)}. ${t.estimatedRelease}: ${money(c.estimatedRelease)}.` : `${t.capitalTitle}: ${t.noResult}`,
      s ? `${t.scenarioTitle}: ${signedMoney(s.contributionDelta)}. ${t.reorderPoint}: ${s.reorderPointUnits} ${t.units}. ${t.coverageDays}: ${s.stockCoverageDays === null ? "—" : `${number(s.stockCoverageDays)} ${t.days}`}.` : `${t.scenarioTitle}: ${t.noResult}`,
      t.disclaimer,
      isEnglish ? `Model ${diagnosis.modelVersion}. Calculated locally in the browser.` : `Modelo ${diagnosis.modelVersion}. Calculado localmente en el navegador.`,
    ].join("\n\n");
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = isEnglish ? "winerim-wine-list-profitability.txt" : "winerim-diagnostico-rentabilidad-carta.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackToolUse("diagnostico-rentabilidad-bodega", { action: "local_report_downloaded", coverage: diagnosis.coverage });
  };

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    if (fd.get("privacy") !== "on") {
      toast.error(t.consentError);
      return;
    }
    setSubmitting(true);
    const email = String(fd.get("email") || "").trim();
    const restaurant = String(fd.get("restaurant") || "").trim() || null;
    const marketing = fd.get("marketing") === "on";
    const leadData = {
      form_type: "profitability_review",
      email,
      restaurant,
      business_type: profile,
      num_locations: locations,
      references_count: references,
      main_challenge: objective,
      message: `privacy_response=yes; marketing_opt_in=${marketing ? "yes" : "no"}; diagnostic_values_shared=no; model=${diagnosis.modelVersion}`,
    };
    const leadId = leadIdRef.current ?? createLeadSubmissionId();
    leadIdRef.current = leadId;
    const result = await persistLeadAndMeasure(leadId, leadData);
    if (!result.ok) {
      toast.error(t.sendError);
      setSubmitting(false);
      return;
    }
    await notifyLead(leadData);
    trackFormSubmit("profitability_review");
    setSubmitted(true);
    setSubmitting(false);
  };

  const renderResult = (area: ProfitabilityArea) => {
    if (area === "bottle") {
      const result = diagnosis.results.bottle;
      return result ? <>
        <strong>{number(result.marginPercent)}%</strong>
        <span>{t.unitMargin}: {money(result.grossMarginPerBottle, 2)}</span>
        <span>{t.beverageCost}: {number(result.beverageCostPercent)}%</span>
        <span>{t.monthlyContribution}: {money(result.monthlyContribution)}</span>
      </> : <strong className="profit-empty-result">{t.noResult}</strong>;
    }
    if (area === "glass") {
      const result = diagnosis.results.glass;
      return result ? <>
        <strong>{number(result.beverageCostPercent)}%</strong>
        <span>{t.effectiveGlasses}: {number(result.effectiveGlasses)}</span>
        <span>{t.breakEven}: {result.breakEvenGlasses}</span>
        <span>{t.monthlyContribution.replace("mensual", "por botella").replace("Monthly", "Bottle")}: {money(result.grossContributionPerBottle, 2)}</span>
      </> : <strong className="profit-empty-result">{t.noResult}</strong>;
    }
    if (area === "capital") {
      const result = diagnosis.results.capital;
      return result ? <>
        <strong>{money(result.tiedCapital)}</strong>
        <span>{t.estimatedRelease}: {money(result.estimatedRelease)}</span>
      </> : <strong className="profit-empty-result">{t.noResult}</strong>;
    }
    const result = diagnosis.results.scenario;
    return result ? <>
      <strong>{signedMoney(result.contributionDelta)}</strong>
      <span>{t.currentScenario}: {money(result.currentMonthlyContribution)} → {money(result.scenarioMonthlyContribution)}</span>
      <span>{t.volumeChange}: {result.volumeChangePercent === null ? "—" : `${result.volumeChangePercent > 0 ? "+" : ""}${number(result.volumeChangePercent)}%`}</span>
      <span>{t.reorderPoint}: {result.reorderPointUnits} {t.units}</span>
      <span>{t.coverageDays}: {result.stockCoverageDays === null ? "—" : `${number(result.stockCoverageDays)} ${t.days}`}</span>
    </> : <strong className="profit-empty-result">{t.noResult}</strong>;
  };

  const resultTitles: Record<ProfitabilityArea, string> = {
    bottle: t.bottleTitle,
    glass: t.glassTitle,
    capital: t.capitalTitle,
    scenario: t.scenarioTitle,
  };

  return (
    <div className="profitability-page">
      <SEOHead
        title={t.title}
        description={t.description}
        url={`https://winerim.wine${isEnglish ? "/en/tools/wine-cellar-profitability-diagnostic" : "/herramientas/diagnostico-rentabilidad-bodega"}`}
        hreflang={[
          { lang: "es", url: "https://winerim.wine/herramientas/diagnostico-rentabilidad-bodega" },
          { lang: "x-default", url: "https://winerim.wine/herramientas/diagnostico-rentabilidad-bodega" },
          { lang: "en", url: "https://winerim.wine/en/tools/wine-cellar-profitability-diagnostic" },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: t.title,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: isEnglish ? "USD" : "EUR" },
        }}
      />
      <a className="profit-skip" href="#diagnostico">{t.skip}</a>
      <header className="profit-header">
        <Link to="/" className="profit-brand"><Wine aria-hidden="true" size={26} /> Winerim<span>{t.professional}</span></Link>
        <Link to={localePath("/herramientas")}>{t.tools} <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>

      <main>
        <div className="profit-intro">
          <p className="profit-eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <span className="profit-local">{t.local}</span>
        </div>

        <section id="diagnostico" className="profit-workspace" aria-label={t.diagnosis}>
          <aside className="profit-sidebar">
            <p className="profit-eyebrow">{t.yourDiagnosis}</p>
            <ol>
              {t.steps.map((label, index) => (
                <li key={label} aria-current={step === index ? "step" : undefined}>
                  <span>{step > index ? <Check size={16} aria-hidden="true" /> : `0${index + 1}`}</span>{label}
                </li>
              ))}
            </ol>
            <div className="profit-sidebar-bottom">
              <p>{t.noHidden}</p><p>{t.assumptionsSeparate}</p>
              <button type="button" className="profit-text-button" onClick={loadExample}><FlaskConical size={15} /> {t.loadExample}</button>
            </div>
          </aside>

          <div className="profit-form">
            <div className="profit-step-heading">
              <span>{t.step(step + 1)}</span>
              <div className="profit-step-tools">
                <button type="button" onClick={loadExample} className="profit-icon-button profit-mobile-sample" title={t.loadExample} aria-label={t.loadExample}><FlaskConical size={18} /></button>
                <button type="button" onClick={reset} className="profit-icon-button" title={t.reset} aria-label={t.reset}><RotateCcw size={18} /></button>
              </div>
            </div>
            <h2 ref={titleRef} tabIndex={-1}>{step === 0 ? t.start : step === 1 ? spec.question : t.resultTitle}</h2>
            {example && <p className="profit-example" role="status">{step === 2 ? t.exampleResult : t.exampleInput}</p>}

            {step === 0 && (
              <form onSubmit={(event) => { event.preventDefault(); if (locationValid) { setActiveArea(objective); go(1); } }}>
                <div className="profit-fields">
                  <label>{t.businessType}<select value={profile} onChange={(event) => setProfile(event.target.value)}>{t.profiles.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label>{t.locations}<input type="number" min="1" max="1000" step="1" value={locations} onChange={(event) => setLocations(event.target.value)} aria-invalid={locationValid ? undefined : true} required /></label>
                  <label>{t.references}<select value={references} onChange={(event) => setReferences(event.target.value)}>{t.referenceOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label>{t.currency}<select value={currency} onChange={(event) => setCurrency(event.target.value as ProfitabilityCurrency)}><option value="EUR">EUR · Euro</option><option value="USD">{t.usd}</option><option value="GBP">{t.gbp}</option></select></label>
                </div>
                <fieldset className="profit-objectives">
                  <legend>{t.objective}</legend>
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return <label key={area}><input type="radio" name="objective" checked={objective === area} onChange={() => setObjective(area)} /><Icon size={18} aria-hidden="true" /><span>{areaSpecs[area].title}</span></label>;
                  })}
                </fieldset>
                <div className="profit-form-footer"><span>{t.beforeContact}</span><button className="profit-primary" type="submit">{t.continue} <ArrowRight size={18} /></button></div>
              </form>
            )}

            {step === 1 && (
              <>
                <div role="group" aria-label={t.areaLabel} className="profit-tabs">
                  {areaKeys.map((area) => <button type="button" key={area} aria-pressed={activeArea === area} onClick={() => setActiveArea(area)}>{areaSpecs[area].title}{diagnosis.results[area] && <Check size={14} aria-label={t.complete} />}</button>)}
                </div>
                <p className="profit-basis">{t.basis(profile, locations, currency)}</p>
                <p className="profit-assumption">{spec.basis}</p>
                <div className="profit-fields">
                  {spec.fields.map((field) => (
                    <div className="profit-field" key={field.key}>
                      <label htmlFor={field.key}>{field.label}</label>
                      <div className="profit-input-wrap">
                        <input id={field.key} inputMode="decimal" value={answers[field.key]} onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={t.noData} aria-invalid={diagnosis.errors[field.key] ? true : undefined} aria-describedby={diagnosis.errors[field.key] ? `${field.key}-error` : undefined} />
                        <span>{unitLabel(field.unit)}</span>
                      </div>
                      <button type="button" className="profit-unknown" onClick={() => setAnswers((current) => ({ ...current, [field.key]: "" }))}>{t.unknown}<span className="sr-only">: {field.label}</span></button>
                      {diagnosis.errors[field.key] && <p className="profit-error" id={`${field.key}-error`}>{errorText(diagnosis.errors[field.key])}</p>}
                    </div>
                  ))}
                </div>
                <details className="profit-formula"><summary>{t.formulaSummary}</summary><p><strong>{t.formula}</strong> {spec.formula}</p><p>{t.formulaNote}</p></details>
                {Object.keys(diagnosis.errors).length > 0 && <p role="alert" className="profit-error">{t.reviewValues}</p>}
                <div className="profit-form-footer"><button type="button" className="profit-text-button" onClick={() => go(0)}><ArrowLeft size={17} /> {t.back}</button><button type="button" className="profit-primary" disabled={Object.keys(diagnosis.errors).length > 0} onClick={() => go(2)}>{t.viewDiagnosis} <ArrowRight size={18} /></button></div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="profit-basis">{t.coverage(diagnosis.coverage, currency, locations)}</p>
                <section className="profit-source-panel" aria-labelledby="profit-source-title">
                  <h3 id="profit-source-title"><ShieldCheck size={18} /> {t.sourceTitle}</h3>
                  <div className="profit-source-list"><span data-source="entered">{t.entered}</span><span data-source="calculated">{t.calculated}</span><span data-source="verified">{t.verified}: {t.notConnected}</span></div>
                  <p>{t.sourceNote}</p>
                </section>
                <div className="profit-results">
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return <article className="profit-result" key={area}><Icon size={20} aria-hidden="true" /><h3>{resultTitles[area]}</h3>{renderResult(area)}<details className="profit-result-formula"><summary>{t.how}</summary><p>{areaSpecs[area].formula}</p></details><button type="button" className="profit-text-button" onClick={() => { setActiveArea(area); go(1); }}>{diagnosis.results[area] ? t.review : t.completeData} <ArrowRight size={14} /></button></article>;
                  })}
                </div>
                <p className="profit-disclaimer">{t.disclaimer}</p>
                <ol className="profit-actions">
                  {prioritizeProfitabilityAreas(objective).map((area, index) => <li key={area}><span>0{index + 1}</span><div><h3>{areaSpecs[area].action}</h3><p>{diagnosis.results[area] ? t.contrast : t.gather}</p></div><Link to={localePath(areaSpecs[area].route)} aria-label={areaSpecs[area].action}><ArrowRight size={22} /></Link></li>)}
                </ol>
                <div className="profit-report-actions">
                  <button type="button" className="profit-primary" onClick={download}><Download size={17} /> {t.download}</button>
                  <Link className="profit-secondary-link" to={localePath("/producto/winerim-core")} onClick={() => ga.ctaClick("profitability_core", localePath("/producto/winerim-core"), "result")}>{t.core} <ArrowRight size={16} /></Link>
                  <Link className="profit-secondary-link" to={localePath("/producto/cloudrim")} onClick={() => ga.ctaClick("profitability_cloudrim", localePath("/producto/cloudrim"), "result")}>{t.cloud} <ArrowRight size={16} /></Link>
                  <Link className="profit-secondary-link" to={localePath("/demo")} onClick={() => ga.ctaClick("profitability_demo", localePath("/demo"), "result")}>{t.demo} <ArrowRight size={16} /></Link>
                </div>

                <section className="profit-review-panel" aria-labelledby="profit-review-title">
                  <h3 id="profit-review-title">{t.planTitle}</h3><p>{t.planText}</p>
                  {submitted ? <p className="profit-success" role="status"><Check size={18} /> {t.sent}</p> : (
                    <form onSubmit={submitReview}>
                      <div className="profit-fields">
                        <label>{t.email}<input name="email" type="email" autoComplete="email" required /></label>
                        <label>{t.restaurant}<input name="restaurant" type="text" autoComplete="organization" /></label>
                      </div>
                      <label className="profit-consent"><input name="privacy" type="checkbox" required /> <span>{t.privacy} <Link to={localePath("/politica-privacidad")}>↗</Link></span></label>
                      <label className="profit-consent"><input name="marketing" type="checkbox" /> <span>{t.marketing}</span></label>
                      <button className="profit-primary" type="submit" disabled={submitting}>{submitting ? t.sending : t.sendPlan} <ArrowRight size={17} /></button>
                    </form>
                  )}
                </section>
                <button type="button" className="profit-text-button profit-back" onClick={() => go(1)}><ArrowLeft size={16} /> {t.edit}</button>
              </>
            )}
          </div>
        </section>

        <section className="profit-product">
          <div><p className="profit-eyebrow">{t.productEyebrow}</p><h2>{t.productTitle}</h2><p>{t.productText}</p><Link to={localePath("/producto/winerim-core")}>{t.core} <ArrowRight size={17} /></Link></div>
          <figure><img src={productImage} alt={t.imageAlt} width="1324" height="928" loading="lazy" /><figcaption>{t.imageCaption}</figcaption></figure>
        </section>
      </main>

      <footer className="profit-footer"><span>{t.footer}</span><span>{t.localFooter(diagnosis.modelVersion)}</span></footer>
    </div>
  );
}
