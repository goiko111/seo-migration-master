import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleDollarSign,
  Database,
  Download,
  MapPinned,
  Network,
  Plus,
  RefreshCw,
  RotateCcw,
  Scale,
  ServerCog,
  ShieldCheck,
  Trash2,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { trackToolUse } from "@/hooks/useIntentTracker";
import {
  calculateTpvIntegrationImpact,
  TPV_IMPACT_EXAMPLE,
  type DecisionCurrency,
  type TpvImpactTaskRow,
  type TpvImpactTaskType,
  type TpvIntegrationImpactResult,
} from "@/lib/operationalDecisionTools";
import "./RentabilidadBodega.css";
import "./OperationalDecisionTools.css";
import "./TpvIntegrationImpact.css";

type Locale = "es" | "en";

const ROUTES: Record<Locale, string> = {
  es: "/herramientas/simulador-impacto-integracion-tpv",
  en: "/en/tools/pos-integration-impact-calculator",
};

const copy = {
  es: {
    title: "Simulador de impacto de integración TPV y multiestablecimiento | Winerim",
    description: "Estima horas recuperables, coste operativo, incidencias y plazo de recuperación al conectar uno o varios centros con el TPV.",
    eyebrow: "TPV y multiestablecimiento",
    h1: "¿Qué cambia al conectar todos tus centros con el TPV?",
    intro: "Convierte el trabajo manual de cada centro en un escenario comparable: altas, precios, conciliación, consolidación e incidencias. Las hipótesis son visibles, editables y nunca se presentan como garantía.",
    steps: ["Operación", "Carga manual", "Impacto"],
    contextTitle: "Define el alcance de la integración",
    figuresTitle: "Cuantifica la carga manual por centro",
    resultTitle: "Impacto estimado de la integración",
    local: "Cálculo local · No enviamos tus cifras",
    continue: "Continuar",
    back: "Volver",
    calculate: "Calcular impacto",
    example: "Cargar ejemplo ficticio",
    reset: "Reiniciar",
    download: "Descargar escenario",
    demo: "Solicitar demo",
    add: "Añadir proceso",
    remove: "Eliminar proceso",
    required: "Añade al menos un proceso con volumen y tiempo manual mayores que cero.",
    productEyebrow: "Del escenario a la operación conectada",
    productTitle: "Winerim no solo importa ventas: mantiene trazabilidad por centro.",
    productText: "La integración conecta catálogo, formatos, precios, ventas y efectos de stock. El monitor permite revisar estado, última sincronización e incidencias sin consolidar hojas manualmente.",
    productCaption: "Captura de producto anonimizada. Sus cifras no pertenecen a este cálculo.",
    formula: "Horas manuales = centros × acciones por centro y mes × minutos por acción / 60. Horas con integración = horas manuales × (1 − automatización estimada). El impacto neto solo se calcula cuando introduces costes comerciales.",
  },
  en: {
    title: "POS and multi-location integration impact calculator | Winerim",
    description: "Estimate recoverable hours, operating value, incidents and payback when connecting one or several locations to the POS.",
    eyebrow: "POS and multi-location",
    h1: "What changes when every location is connected to the POS?",
    intro: "Turn each location's manual workload into a comparable scenario: products, prices, reconciliation, consolidation and incidents. Every assumption is visible, editable and never presented as a guarantee.",
    steps: ["Operation", "Manual load", "Impact"],
    contextTitle: "Set the integration scope",
    figuresTitle: "Quantify manual workload per location",
    resultTitle: "Estimated integration impact",
    local: "Local calculation · We do not send your figures",
    continue: "Continue",
    back: "Back",
    calculate: "Calculate impact",
    example: "Load fictional example",
    reset: "Reset",
    download: "Download scenario",
    demo: "Request a demo",
    add: "Add process",
    remove: "Remove process",
    required: "Add at least one process with volume and manual time above zero.",
    productEyebrow: "From scenario to connected operations",
    productTitle: "Winerim does more than import sales: it keeps traceability by location.",
    productText: "The integration connects catalog, formats, prices, sales and stock effects. The monitor exposes status, last synchronization and incidents without consolidating spreadsheets manually.",
    productCaption: "Anonymized product screenshot. Its figures do not belong to this calculation.",
    formula: "Manual hours = locations × actions per location per month × minutes per action / 60. Integrated hours = manual hours × (1 − estimated automation). Net impact is only calculated when you enter commercial costs.",
  },
} as const;

const defaultTasks = (): TpvImpactTaskRow[] => TPV_IMPACT_EXAMPLE.tasks.map((task) => ({
  ...task,
  monthlyOccurrencesPerCenter: 0,
}));

const createTask = (id = `tpv-${Date.now()}`): TpvImpactTaskRow => ({
  id,
  name: "",
  type: "operation",
  monthlyOccurrencesPerCenter: 0,
  manualMinutesPerOccurrence: 15,
  automationPct: 70,
});

const safeNumber = (value: string) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

function NumberField({ label, value, onChange, unit, max }: { label: string; value: number; onChange: (value: number) => void; unit?: string; max?: number }) {
  return <label className="decision-field"><span>{label}</span><span className="decision-input-wrap"><input type="number" min="0" max={max} step="any" inputMode="decimal" value={value} onChange={(event) => onChange(safeNumber(event.target.value))} />{unit && <b>{unit}</b>}</span></label>;
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="decision-metric" data-accent={accent}><span>{label}</span><strong>{value}</strong></div>;
}

function Steps({ active, labels }: { active: number; labels: readonly string[] }) {
  return <ol className="profit-steps">{labels.map((label, index) => <li key={label} className={index === active ? "active" : index < active ? "done" : ""}><span>{index < active ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>{label}</li>)}</ol>;
}

export default function TpvIntegrationImpact() {
  const location = useLocation();
  const locale: Locale = location.pathname.startsWith("/en/") ? "en" : "es";
  const es = locale === "es";
  const t = copy[locale];
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<DecisionCurrency>(locale === "en" ? "USD" : "EUR");
  const [context, setContext] = useState({ centers: 1, hourlyCost: 22, monthlyIntegrationCostPerCenter: 0, setupCostPerCenter: 0 });
  const [tasks, setTasks] = useState<TpvImpactTaskRow[]>(defaultTasks);
  const [result, setResult] = useState<TpvIntegrationImpactResult | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [showError, setShowError] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const money = useMemo(() => new Intl.NumberFormat(es ? "es-ES" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }), [currency, es]);
  const decimal = useMemo(() => new Intl.NumberFormat(es ? "es-ES" : "en-US", { maximumFractionDigits: 1 }), [es]);
  const validTasks = tasks.filter((task) => task.name.trim() && task.monthlyOccurrencesPerCenter > 0 && task.manualMinutesPerOccurrence > 0);

  const focusTitle = () => requestAnimationFrame(() => titleRef.current?.focus());
  const go = (next: number) => { setStep(next); setShowError(false); trackToolUse("tpv_integration_impact", { action: `step_${next + 1}` }); focusTitle(); };
  const updateContext = (patch: Partial<typeof context>) => { setContext((current) => ({ ...current, ...patch })); setResult(null); setIsExample(false); };
  const updateTask = (id: string, patch: Partial<TpvImpactTaskRow>) => { setTasks((current) => current.map((task) => task.id === id ? { ...task, ...patch } : task)); setResult(null); setIsExample(false); };

  const loadExample = () => {
    setContext({
      centers: TPV_IMPACT_EXAMPLE.centers,
      hourlyCost: TPV_IMPACT_EXAMPLE.hourlyCost,
      monthlyIntegrationCostPerCenter: TPV_IMPACT_EXAMPLE.monthlyIntegrationCostPerCenter,
      setupCostPerCenter: TPV_IMPACT_EXAMPLE.setupCostPerCenter,
    });
    setTasks(TPV_IMPACT_EXAMPLE.tasks.map((task) => ({ ...task })));
    setResult(null); setIsExample(true); setShowError(false); setStep(1);
    trackToolUse("tpv_integration_impact", { action: "load_example" }); focusTitle();
  };

  const calculate = () => {
    if (!validTasks.length) { setShowError(true); return; }
    setResult(calculateTpvIntegrationImpact({ ...context, tasks: validTasks }));
    setStep(2); setShowError(false);
    trackToolUse("tpv_integration_impact", { action: "calculate", example: isExample }); focusTitle();
  };

  const reset = () => {
    setStep(0); setCurrency(locale === "en" ? "USD" : "EUR");
    setContext({ centers: 1, hourlyCost: 22, monthlyIntegrationCostPerCenter: 0, setupCostPerCenter: 0 });
    setTasks(defaultTasks()); setResult(null); setIsExample(false); setShowError(false);
    trackToolUse("tpv_integration_impact", { action: "reset" });
  };

  const download = () => {
    if (!result) return;
    const row = (values: Array<string | number>) => values.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",");
    const lines = [
      row([es ? "Centros" : "Locations", result.centers]),
      row([es ? "Horas manuales/mes" : "Manual hours/month", result.manualHoursMonthly]),
      row([es ? "Horas conectadas/mes" : "Integrated hours/month", result.integratedHoursMonthly]),
      row([es ? "Horas recuperables/mes" : "Recoverable hours/month", result.hoursRecoveredMonthly]),
      "",
      row([es ? "Proceso" : "Process", es ? "Tipo" : "Type", es ? "Horas manuales" : "Manual hours", es ? "Horas conectadas" : "Integrated hours", es ? "Horas recuperables" : "Recoverable hours", es ? "Automatización estimada" : "Estimated automation"]),
      ...result.tasks.map((task) => row([task.name, task.type, task.manualHoursMonthly, task.integratedHoursMonthly, task.hoursRecoveredMonthly, task.automationPct])),
    ];
    const url = URL.createObjectURL(new Blob([`\uFEFF${lines.join("\n")}`], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `winerim-tpv-impact-${locale}.csv`; anchor.click(); URL.revokeObjectURL(url);
    trackToolUse("tpv_integration_impact", { action: "download" });
  };

  const hreflang = [
    { lang: "es", url: `https://winerim.wine${ROUTES.es}` },
    { lang: "en", url: `https://winerim.wine${ROUTES.en}` },
    { lang: "x-default", url: `https://winerim.wine${ROUTES.es}` },
  ];
  const faqs = es ? [
    { q: "¿Los porcentajes son resultados reales de clientes?", a: "No. Son hipótesis iniciales de producto, visibles y editables. El resultado depende del volumen y los tiempos que introduzcas." },
    { q: "¿El coste introducido es una tarifa de Winerim?", a: "No. Es un campo opcional para comparar tu escenario. Una propuesta comercial real depende del TPV, número de centros y alcance técnico." },
    { q: "¿La integración elimina el recuento físico?", a: "No. Sin un inventario o punto de partida fiable, el stock teórico no sustituye un recuento. Esta herramienta mide sincronización y conciliación, no elimina controles físicos." },
    { q: "¿Qué debe verificarse antes de conectar todos los centros?", a: "Catálogo, formatos, listas de precios, centros de venta, trazabilidad, readback e idempotencia. Después conviene activar por fases y medir incidencias reales." },
  ] : [
    { q: "Are the percentages measured customer results?", a: "No. They are visible, editable product assumptions. The result depends on the volumes and times you enter." },
    { q: "Is the entered cost a Winerim price?", a: "No. It is an optional field for comparing your scenario. A real commercial quote depends on the POS, number of locations and technical scope." },
    { q: "Does integration eliminate physical counts?", a: "No. Without a reliable inventory baseline, theoretical stock does not replace counting. This tool measures synchronization and reconciliation." },
    { q: "What should be verified before connecting every location?", a: "Catalog, formats, price lists, sales centers, traceability, readback and idempotency. Activation should then be phased and measured." },
  ];

  return <div className="profitability-page decision-tool-page tpv-impact-page">
    <SEOHead title={t.title} description={t.description} url={ROUTES[locale]} hreflang={hreflang} structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: t.h1, description: t.description, url: `https://winerim.wine${ROUTES[locale]}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0" } }} />
    <a className="profit-skip" href="#tpv-impact-calculator">{es ? "Ir al simulador" : "Skip to simulator"}</a>
    <Navbar />
    <main>
      <header className="profit-intro"><p className="profit-eyebrow">{t.eyebrow}</p><h1>{t.h1}</h1><p>{t.intro}</p><span className="profit-local"><ShieldCheck size={14} aria-hidden /> {t.local}</span></header>
      <section className="profit-workspace" id="tpv-impact-calculator" aria-label={t.h1}>
        <aside className="profit-sidebar">
          <p className="profit-eyebrow">{t.eyebrow}</p><Steps active={step} labels={t.steps} />
          <div className="profit-sidebar-note"><strong>{es ? "Sin tarifas inventadas." : "No invented pricing."}</strong><span>{es ? "Deja los costes en cero si solo quieres medir carga operativa." : "Leave costs at zero if you only want to measure workload."}</span></div>
          <button type="button" className="profit-example-link" onClick={loadExample}><Network size={14} /> {t.example}</button>
        </aside>
        <div className="profit-panel">
          <div className="profit-panel-head"><div><span>{es ? `Paso ${step + 1} de 3` : `Step ${step + 1} of 3`}</span><h2 ref={titleRef} tabIndex={-1}>{step === 0 ? t.contextTitle : step === 1 ? t.figuresTitle : t.resultTitle}</h2></div>{step > 0 && <button type="button" className="profit-reset" onClick={reset} title={t.reset}><RotateCcw size={15} /><span>{t.reset}</span></button>}</div>

          {step === 0 && <div className="decision-context">
            <section className="tpv-topology" aria-label={es ? "Topología de centros" : "Location topology"}>
              <header><div><MapPinned size={18} /><strong>{es ? "Topología a conectar" : "Topology to connect"}</strong></div><span>{context.centers} {es ? "centros" : "locations"}</span></header>
              <div className="tpv-topology-map"><div className="tpv-central-node"><ServerCog size={18} /><span>Winerim</span></div><div className="tpv-center-grid">{Array.from({ length: Math.min(12, context.centers) }, (_, index) => <span key={index}><b>{String(index + 1).padStart(2, "0")}</b>{es ? "Centro" : "Location"}</span>)}{context.centers > 12 && <span><b>+{context.centers - 12}</b>{es ? "centros" : "locations"}</span>}</div></div>
              <p>{es ? "El cálculo multiplica la carga repetida por centro; no presupone que todos tengan el mismo catálogo o volumen." : "The calculation multiplies repeated work by location; it does not assume identical catalogs or volumes."}</p>
            </section>
            <div className="decision-context-grid">
              <label className="decision-field"><span>{es ? "Moneda" : "Currency"}</span><select value={currency} onChange={(event) => setCurrency(event.target.value as DecisionCurrency)}><option value="EUR">EUR · €</option><option value="USD">USD · $</option><option value="GBP">GBP · £</option></select></label>
              <NumberField label={es ? "Centros a integrar" : "Locations to integrate"} value={context.centers} onChange={(value) => updateContext({ centers: Math.min(100, Math.max(1, Math.round(value))) })} unit={es ? "centros" : "locations"} max={100} />
              <NumberField label={es ? "Coste hora del equipo" : "Team hourly cost"} value={context.hourlyCost} onChange={(value) => updateContext({ hourlyCost: value })} unit={currency} />
              <NumberField label={es ? "Coste mensual integración por centro (opcional)" : "Monthly integration cost per location (optional)"} value={context.monthlyIntegrationCostPerCenter} onChange={(value) => updateContext({ monthlyIntegrationCostPerCenter: value })} unit={currency} />
              <NumberField label={es ? "Puesta en marcha por centro (opcional)" : "Setup cost per location (optional)"} value={context.setupCostPerCenter} onChange={(value) => updateContext({ setupCostPerCenter: value })} unit={currency} />
            </div>
            <div className="decision-context-note"><CircleDollarSign size={18} /><p>{es ? "Los costes son los que tú introduzcas y no representan una tarifa pública. Sin costes, calcularemos tiempo y valor operativo, pero no ROI ni plazo de recuperación." : "Costs are whatever you enter and do not represent public pricing. Without costs, we calculate time and operating value, but not ROI or payback."}</p></div>
          </div>}

          {step === 1 && <div className="decision-rows tpv-process-matrix"><div className="tpv-process-guide"><Workflow size={18} /><div><strong>{es ? "Mapa de procesos repetidos" : "Repeated process map"}</strong><p>{es ? "Separa operación e incidencias. El porcentaje sigue siendo una hipótesis editable." : "Separate operations from incidents. The percentage remains an editable assumption."}</p></div></div>{tasks.map((task, index) => <fieldset className="decision-row-card tpv-process-row" data-type={task.type} key={task.id}><legend>{String(index + 1).padStart(2, "0")}</legend><button type="button" className="decision-remove" onClick={() => setTasks((current) => current.length > 1 ? current.filter((item) => item.id !== task.id) : current)} title={t.remove} aria-label={t.remove}><Trash2 size={15} /></button><div className="decision-row-grid tpv-task-grid">
            <label className="decision-field decision-name-field"><span>{es ? "Proceso" : "Process"}</span><input value={task.name} onChange={(event) => updateTask(task.id, { name: event.target.value })} placeholder={es ? "Nombre del proceso" : "Process name"} /></label>
            <label className="decision-field"><span>{es ? "Tipo" : "Type"}</span><select value={task.type} onChange={(event) => updateTask(task.id, { type: event.target.value as TpvImpactTaskType })}><option value="operation">{es ? "Operación" : "Operation"}</option><option value="incident">{es ? "Incidencia" : "Incident"}</option></select></label>
            <NumberField label={es ? "Acciones por centro y mes" : "Actions per location/month"} value={task.monthlyOccurrencesPerCenter} onChange={(value) => updateTask(task.id, { monthlyOccurrencesPerCenter: value })} />
            <NumberField label={es ? "Minutos manuales por acción" : "Manual minutes per action"} value={task.manualMinutesPerOccurrence} onChange={(value) => updateTask(task.id, { manualMinutesPerOccurrence: value })} unit="min" />
            <NumberField label={es ? "Automatización estimada" : "Estimated automation"} value={task.automationPct} onChange={(value) => updateTask(task.id, { automationPct: Math.min(100, value) })} unit="%" max={100} />
          </div></fieldset>)}<button type="button" className="decision-add" onClick={() => setTasks((current) => current.length < 10 ? [...current, createTask()] : current)}><Plus size={15} /> {t.add}</button></div>}

          {step === 2 && result && <Result result={result} es={es} money={money} decimal={decimal} formula={t.formula} isExample={isExample} />}
          {showError && <p className="decision-error" role="alert">{t.required}</p>}
          <div className="profit-actions decision-controls">
            {step === 0 && <><button type="button" className="profit-primary" onClick={() => go(1)}>{t.continue} <ArrowRight size={16} /></button><button type="button" className="profit-secondary" onClick={loadExample}>{t.example}</button></>}
            {step === 1 && <><button type="button" className="profit-secondary" onClick={() => go(0)}><ArrowLeft size={16} /> {t.back}</button><button type="button" className="profit-primary" onClick={calculate}>{t.calculate} <ArrowRight size={16} /></button></>}
            {step === 2 && <><button type="button" className="profit-primary" onClick={download}><Download size={16} /> {t.download}</button><Link className="profit-secondary" to={es ? "/demo" : "/en/demo"}>{t.demo} <ArrowRight size={15} /></Link><button type="button" className="profit-back-link" onClick={() => go(1)}><ArrowLeft size={14} /> {t.back}</button></>}
          </div>
        </div>
      </section>

      <section className="profit-product-proof"><div><p className="profit-eyebrow">{t.productEyebrow}</p><h2>{t.productTitle}</h2><p>{t.productText}</p><Link to={es ? "/integraciones" : "/en/integrations"}>{es ? "Ver integraciones" : "View integrations"} <ArrowRight size={14} /></Link></div><figure><img src="/commercial-assets/product-proof/08-monitor-tpv-anonimizado.png" alt="" loading="lazy" /><figcaption>{t.productCaption}</figcaption></figure></section>
      <FAQSection faqs={faqs} schemaId="tpv-integration-impact" />
      <InternalLinks title={es ? "Siguiente análisis recomendado" : "Recommended next analysis"} links={[
        { to: es ? "/herramientas/calculadora-tiempo-operativo" : "/en/tools/operational-time-calculator", label: es ? "Tiempo operativo recuperable" : "Recoverable operational time", type: "tool" },
        { to: es ? "/herramientas/conciliador-stock-vino" : "/en/tools/wine-stock-reconciliation", label: es ? "Conciliador de stock" : "Stock reconciliation", type: "tool" },
        { to: es ? "/integraciones" : "/en/integrations", label: es ? "Integraciones verificables" : "Verifiable integrations", type: "solution" },
        { to: es ? "/soluciones/grupos-restauracion" : "/en/solutions/restaurant-groups", label: es ? "Gestión para grupos" : "Restaurant group management", type: "solution" },
      ]} />
    </main><Footer />
  </div>;
}

function Result({ result, es, money, decimal, formula, isExample }: { result: TpvIntegrationImpactResult; es: boolean; money: Intl.NumberFormat; decimal: Intl.NumberFormat; formula: string; isExample: boolean }) {
  return <div className="decision-result">
    <div className="decision-headline"><Building2 size={23} /><div><span>{es ? "Tiempo recuperable en toda la operación" : "Recoverable time across the operation"}</span><strong>{decimal.format(result.hoursRecoveredMonthly)} h/{es ? "mes" : "month"} · {result.centers} {es ? "centros" : "locations"}</strong><p>{es ? `La carga manual baja de ${decimal.format(result.manualHoursMonthly)} h a ${decimal.format(result.integratedHoursMonthly)} h al mes en este escenario.` : `Manual workload falls from ${decimal.format(result.manualHoursMonthly)} h to ${decimal.format(result.integratedHoursMonthly)} h per month in this scenario.`}</p></div></div>
    <section className="tpv-before-after" aria-label={es ? "Proceso manual frente a conectado" : "Manual versus connected process"}>
      <div className="tpv-state manual"><span>{es ? "Antes" : "Before"}</span><strong>{decimal.format(result.manualHoursMonthly)} h/{es ? "mes" : "month"}</strong><small>{es ? "hojas, altas y comprobaciones repetidas" : "repeated sheets, updates and checks"}</small></div>
      <div className="tpv-connection-layer"><Database size={17} /><i /><Network size={19} /><i /><RefreshCw size={17} /><b>{result.centers} {es ? "centros conectados" : "connected locations"}</b></div>
      <div className="tpv-state connected"><span>{es ? "Escenario conectado" : "Connected scenario"}</span><strong>{decimal.format(result.integratedHoursMonthly)} h/{es ? "mes" : "month"}</strong><small>{es ? "supervisión, excepciones y validación" : "supervision, exceptions and validation"}</small></div>
    </section>
    <div className="decision-kpis"><Metric label={es ? "Valor del tiempo recuperado" : "Value of recovered time"} value={money.format(result.laborValueMonthly)} accent /><Metric label={es ? "Incidencias evitables/mes" : "Avoidable incidents/month"} value={decimal.format(result.incidentsAvoidedMonthly)} /><Metric label={es ? "Coste mensual introducido" : "Entered monthly cost"} value={result.hasCommercialCost ? money.format(result.recurringIntegrationCostMonthly) : "—"} /><Metric label={es ? "Impacto neto mensual" : "Monthly net impact"} value={result.netOperationalImpactMonthly === null ? "—" : money.format(result.netOperationalImpactMonthly)} /></div>
    {result.hasCommercialCost ? <div className="tpv-commercial-result"><div><span>{es ? "Impacto neto primer año" : "First-year net impact"}</span><strong>{money.format(result.firstYearNetImpact || 0)}</strong></div><div><span>{es ? "Puesta en marcha total" : "Total setup"}</span><strong>{money.format(result.setupCostTotal)}</strong></div><div><span>{es ? "Recuperación estimada" : "Estimated payback"}</span><strong>{result.paybackMonths === null ? (es ? "No calculable" : "Not calculable") : `${decimal.format(result.paybackMonths)} ${es ? "meses" : "months"}`}</strong></div></div> : <div className="decision-note"><CircleDollarSign size={18} /><p>{es ? "No has introducido costes comerciales. Por eso mostramos tiempo y valor operativo, pero no inventamos impacto neto ni plazo de recuperación." : "You did not enter commercial costs, so we show time and operating value without inventing net impact or payback."}</p></div>}
    <section className="tpv-process-impact" aria-label={es ? "Impacto por proceso" : "Impact by process"}>
      <header><div><Workflow size={17} /><strong>{es ? "Impacto por proceso" : "Impact by process"}</strong></div><span>{es ? "Horas mensuales en todos los centros" : "Monthly hours across all locations"}</span></header>
      {result.tasks.map((task) => {
        const integratedPct = task.manualHoursMonthly > 0 ? Math.max(2, (task.integratedHoursMonthly / task.manualHoursMonthly) * 100) : 0;
        return <article key={task.id} data-type={task.type}>
          <div className="tpv-process-name"><span>{task.type === "incident" ? (es ? "Incidencia" : "Incident") : (es ? "Operación" : "Operation")}</span><strong>{task.name}</strong></div>
          <div className="tpv-process-bars"><div><i style={{ width: "100%" }} /><span>{decimal.format(task.manualHoursMonthly)} h</span></div><div><i style={{ width: `${integratedPct}%` }} /><span>{decimal.format(task.integratedHoursMonthly)} h</span></div></div>
          <div className="tpv-process-saving"><strong>−{decimal.format(task.hoursRecoveredMonthly)} h</strong><span>{task.automationPct}% {es ? "hipótesis" : "assumption"}</span></div>
        </article>;
      })}
      <footer><span><i />{es ? "Carga manual" : "Manual load"}</span><span><i />{es ? "Carga conectada" : "Connected load"}</span></footer>
    </section>
    <div className="tpv-next-actions"><h3>{es ? "Qué validaría antes de decidir" : "What to validate before deciding"}</h3><ol><li>{es ? "Volumen real y minutos del proceso con mayor impacto." : "Actual volume and minutes for the highest-impact process."}</li><li>{es ? "Cobertura técnica del TPV: catálogo, precios, centros, ventas, stock y readback." : "POS technical coverage: catalog, prices, locations, sales, stock and readback."}</li><li>{es ? "Piloto por fases y medición durante 30 días antes de extenderlo al resto de centros." : "Phased pilot and 30-day measurement before extending to every location."}</li></ol></div>
    <section className="tpv-rollout"><h3>{es ? "Ruta de implantación verificable" : "Verifiable rollout path"}</h3><ol><li><b>01</b><span>{es ? "Mapa" : "Map"}<small>{es ? "Catálogo, formatos, precios y centros" : "Catalog, formats, prices and locations"}</small></span></li><li><b>02</b><span>{es ? "Piloto" : "Pilot"}<small>{es ? "Un centro, readback e idempotencia" : "One location, readback and idempotency"}</small></span></li><li><b>03</b><span>{es ? "Medición" : "Measure"}<small>{es ? "30 días de tiempos e incidencias" : "30 days of time and incidents"}</small></span></li><li><b>04</b><span>{es ? "Escalado" : "Scale"}<small>{es ? "Resto de centros con gate explícito" : "Remaining locations with an explicit gate"}</small></span></li></ol></section>
    <div className="decision-source"><h3>{es ? "Origen de las cifras" : "Source of the figures"}</h3><span>{es ? "Introducido por ti" : "Entered by you"}</span><span>{es ? "Calculado con tus datos" : "Calculated from your data"}</span><span>{es ? "Hipótesis base Winerim, editable y no garantizada" : "Editable, non-guaranteed Winerim baseline"}</span>{isExample && <span>{es ? "Ejemplo ficticio cargado" : "Fictional example loaded"}</span>}</div>
    <details className="decision-formula"><summary><Scale size={15} /> {es ? "Fórmula visible" : "Visible formula"}</summary><p>{formula}</p></details>
  </div>;
}
