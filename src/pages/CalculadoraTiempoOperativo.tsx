import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Download,
  FileText,
  FlaskConical,
  ListChecks,
  MessagesSquare,
  PackageSearch,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import productImage from "@/assets/feature-savia-prompt.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  calculateOperationalTime,
  createEmptyOperationalTimeAnswers,
  EXAMPLE_OPERATIONAL_TIME_ANSWERS,
  OPERATIONAL_TASKS,
  OPERATIONAL_WEEKS_PER_MONTH,
  prioritizeOperationalTasks,
  type OperationalTaskId,
  type OperationalTimeAnswers,
  type OperationalTimeEntry,
} from "@/lib/operationalTime";
import "./RentabilidadBodega.css";
import "./CalculadoraTiempoOperativo.css";

type Currency = "EUR" | "USD" | "GBP";

const taskIcons = {
  posItems: ListChecks,
  deliveryNotes: FileText,
  bottleCount: PackageSearch,
  stockReconciliation: RefreshCcw,
  orderPreparation: ShoppingCart,
  buyingDecision: BarChart3,
  distributorCommunication: MessagesSquare,
};

const FIELD_KEYS = [
  "currentMinutes",
  "scenarioMinutes",
  "occurrencesPerWeek",
  "hourlyCost",
] as const;

const EN_TASKS: Record<OperationalTaskId, Pick<(typeof OPERATIONAL_TASKS)[number], "title" | "description" | "boundary" | "action">> = {
  posItems: {
    title: "Create and update POS items",
    description: "Create or correct wines, formats, prices and references in the POS.",
    boundary: "POS catalog maintenance only; excludes delivery-note intake and sales analysis.",
    action: "Review POS catalog and integration",
  },
  deliveryNotes: {
    title: "Receive delivery notes",
    description: "Read incoming documents and transfer quantities, costs and supplier details.",
    boundary: "Document and goods intake only; excludes deciding what to buy.",
    action: "Review the CloudRIM document flow",
  },
  bottleCount: {
    title: "Count bottles",
    description: "Perform a physical count across cellar, storage and service points.",
    boundary: "Physical count only; theoretical-versus-actual differences are measured separately.",
    action: "Structure physical stock control",
  },
  stockReconciliation: {
    title: "Compare theoretical and actual stock",
    description: "Compare counts with sales, receipts, glasses, waste and expected stock.",
    boundary: "Includes finding and reviewing variances; it does not repeat the physical count.",
    action: "Compare sales, stock and POS data",
  },
  orderPreparation: {
    title: "Prepare orders",
    description: "Turn approved needs into quantities and orders by supplier.",
    boundary: "Order preparation only; purchase analysis is measured separately.",
    action: "Review replenishment and purchasing",
  },
  buyingDecision: {
    title: "Decide what to buy",
    description: "Review rotation, stock, cost, margin and coverage before replenishing.",
    boundary: "Analysis and decision only; excludes preparing orders and supplier conversations.",
    action: "Query the decision with SAVia",
  },
  distributorCommunication: {
    title: "Speak with distributors",
    description: "Check availability, alternatives, prices, issues and follow-up.",
    boundary: "Communication only; it does not duplicate purchase analysis or order preparation.",
    action: "Compare distributors using the same criteria",
  },
};

const ES_COPY = {
  locale: "es-ES",
  title: "Calculadora del coste operativo de gestionar el vino",
  description: "Calcula horas y valor del tiempo dedicado cada semana a TPV, albaranes, inventario, conciliación, pedidos, compras y distribuidores.",
  appName: "¿Cuánto te cuesta gestionar el vino?",
  skip: "Ir a la calculadora",
  professional: "Para profesionales del vino",
  tools: "Herramientas",
  eyebrow: "Tiempo y datos operativos",
  intro: "Mide siete tareas semanales sin mezclar recuento, conciliación, análisis y pedidos. Compara tu situación actual con un escenario que defines tú.",
  local: "Cálculo local · No enviamos estos datos",
  scenario: "Tu operación",
  formTitle: "Tiempo, frecuencia y persona responsable",
  frequency: "Indica cuánto tardas hoy cada vez que haces la tarea y cuánto estimas que tardarías con Winerim o con el proceso mejorado. Añade también cuántas veces la realizas por semana. Puedes desactivar una tarea que no realizas.",
  currency: "Moneda para valorar el tiempo",
  loadExample: "Cargar ejemplo ficticio",
  reset: "Reiniciar calculadora",
  example: "Ejemplo ficticio. No representa resultados de un cliente y puedes cambiar todos los supuestos.",
  current: "Situación actual",
  scenarioLabel: "Escenario posterior",
  recoverable: "Tiempo recuperable",
  additional: "Tiempo adicional",
  net: "Neto",
  value: "Valor del tiempo",
  week: "Semana",
  month: "Mes medio",
  year: "Año",
  coverage: "Tareas calculadas",
  costCoverage: "Tareas con coste/hora",
  conversion: `Mes medio = semana × 52 ÷ 12 = semana × ${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(OPERATIONAL_WEEKS_PER_MONTH)}. Año = semana × 52.`,
  formula: "Horas por tarea = minutos por vez × veces por semana ÷ 60. Neto = situación actual − escenario posterior. El neto puede ser negativo.",
  fields: {
    role: "Persona o rol",
    currentMinutes: "Minutos por vez (hoy)",
    scenarioMinutes: "Minutos por vez (escenario futuro)",
    occurrencesPerWeek: "Veces por semana",
    hourlyCost: "Coste aproximado por hora",
  },
  rolePlaceholder: "Ej. responsable de compras",
  times: "veces",
  perHour: "/h",
  weeklyDifference: "Neto semanal",
  noData: "Sin datos",
  costMissing: "Añade coste/hora para valorar el tiempo",
  moreTime: "Este escenario añade tiempo.",
  warning: (hours: string) => `Hay ${hours} h/semana adicionales en algunas tareas. Se muestran por separado y sí reducen el neto.`,
  partialCost: (covered: number, total: number) => `El valor económico usa ${covered} de ${total} tareas calculadas. Las tareas sin coste/hora no se convierten en dinero.`,
  sourceTitle: "Origen de las cifras",
  entered: "Introducido por ti",
  calculated: "Calculado con tus datos",
  fictional: "Ejemplo ficticio cuando lo cargas",
  verified: "Datos operativos verificados",
  notConnected: "No conectados en esta calculadora pública",
  sourceNote: "El tiempo y el coste son un escenario. Ventas, margen y mejora comercial son datos distintos y no se suman aquí.",
  currentTimeCost: "Valor del tiempo actual",
  scenarioTimeCost: "Valor del tiempo en el escenario",
  opportunityValue: "Valor del tiempo liberado",
  cashNote: "El valor del tiempo liberado es coste de oportunidad. No implica ahorro de caja, reducción de plantilla, ventas adicionales ni ROI garantizado.",
  next: "Siguiente paso",
  priorities: "Tus tres tareas con mayor tiempo recuperable",
  priorityResult: (title: string, hours: string) => `${title}: ${hours} h/semana netas en tu escenario.`,
  open: "abrir",
  empty: "Completa al menos una tarea para obtener un resultado y prioridades basadas en tus propios datos.",
  noPositive: "Tus datos no muestran tareas con tiempo recuperable positivo. Revisa los supuestos o contrasta el proceso real.",
  download: "Descargar escenario",
  secondary: "Ver mi diagnóstico de rentabilidad",
  proofEyebrow: "Del supuesto al dato",
  proofTitle: "El TPV aporta tiempo y datos, pero cada beneficio se mide por separado",
  proofText: "Winerim puede contrastar carta, documentos, stock, ventas y compras cuando las fuentes están conectadas y validadas. Esta calculadora solo mide tiempo y su valor; no atribuye ventas ni margen.",
  demo: "Revisar mi caso con Winerim",
  imageAlt: "Consulta operativa en SAVia sobre stock y pedidos",
  imageCaption: "Ejemplo de consulta operativa. El alcance depende de los datos e integraciones disponibles.",
  footerModel: "Modelo 2.0 · Resultado orientativo, no garantía.",
  footerForm: "Resultado completo sin formulario",
  reportScenario: "Escenario introducido por el usuario",
  reportExample: "EJEMPLO FICTICIO EDITADO O DE DEMOSTRACIÓN",
  reportModel: "Cálculo local en el navegador.",
  reportExcluded: "no realizada / excluida",
  reportMissing: "sin dato",
  reportCurrent: "actuales",
  reportScenarioHours: "en el escenario",
  reportNet: "netas",
  reportTimeValue: "valor neto del tiempo",
  reportCurrentValue: "valor actual del tiempo",
  reportScenarioValue: "valor del tiempo en el escenario",
  reportReleasedValue: "valor neto del tiempo liberado",
  disclaimer: "Las cifras son hipótesis editables. El valor del tiempo liberado es coste de oportunidad: no equivale a ahorro salarial, reducción de plantilla, ventas adicionales, ROI ni garantía de implantación.",
};

const EN_COPY = {
  ...ES_COPY,
  locale: "en-US",
  title: "Wine operations cost calculator",
  description: "Calculate the hours and time value spent each week on POS items, deliveries, inventory, reconciliation, orders, purchasing and distributors.",
  appName: "What does it cost to manage your wine operation?",
  skip: "Skip to the calculator",
  professional: "For wine professionals",
  tools: "Tools",
  eyebrow: "Operational time and data",
  intro: "Measure seven weekly tasks without mixing counts, reconciliation, analysis and orders. Compare today with a scenario you define.",
  local: "Calculated locally · We do not send this data",
  scenario: "Your operation",
  formTitle: "Time, frequency and responsible role",
  frequency: "Enter how long each task takes today and how long you estimate it would take with Winerim or the improved process. Then add how many times you perform it per week. Disable tasks you do not perform.",
  currency: "Currency used to value time",
  loadExample: "Load a fictional example",
  reset: "Reset calculator",
  example: "Fictional example. It does not represent customer results and every assumption can be edited.",
  current: "Current operation",
  scenarioLabel: "Your future scenario",
  recoverable: "Recoverable time",
  additional: "Additional time",
  net: "Net",
  value: "Time value",
  week: "Week",
  month: "Average month",
  year: "Year",
  coverage: "Calculated tasks",
  costCoverage: "Tasks with hourly cost",
  conversion: `Average month = week × 52 ÷ 12 = week × ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(OPERATIONAL_WEEKS_PER_MONTH)}. Year = week × 52.`,
  formula: "Hours by task = minutes per occurrence × occurrences per week ÷ 60. Net = current operation − future scenario. Net may be negative.",
  fields: {
    role: "Person or role",
    currentMinutes: "Minutes per task (today)",
    scenarioMinutes: "Minutes per task (future scenario)",
    occurrencesPerWeek: "Times per week",
    hourlyCost: "Approximate hourly cost",
  },
  rolePlaceholder: "E.g. purchasing manager",
  times: "times",
  perHour: "/h",
  weeklyDifference: "Weekly net",
  noData: "No data",
  costMissing: "Add hourly cost to value this time",
  moreTime: "This scenario adds time.",
  warning: (hours: string) => `Some tasks add ${hours} hours per week. They are shown separately and reduce the net result.`,
  partialCost: (covered: number, total: number) => `Time value uses ${covered} of ${total} calculated tasks. Tasks without hourly cost are not converted into money.`,
  sourceTitle: "Source of each figure",
  entered: "Entered by you",
  calculated: "Calculated from your data",
  fictional: "Fictional example when loaded",
  verified: "Verified operational data",
  notConnected: "Not connected in this public calculator",
  sourceNote: "Time and cost are one scenario. Sales, margin and commercial improvement are separate data and are not added here.",
  currentTimeCost: "Current time value",
  scenarioTimeCost: "Scenario time value",
  opportunityValue: "Value of time released",
  cashNote: "The value of time released is an opportunity cost. It does not imply cash savings, headcount reduction, added sales or guaranteed ROI.",
  next: "Next step",
  priorities: "Your three tasks with the most recoverable time",
  priorityResult: (title: string, hours: string) => `${title}: ${hours} net hours per week in your scenario.`,
  open: "open",
  empty: "Complete at least one task to get a result and priorities based on your own data.",
  noPositive: "Your data does not show any task with positive recoverable time. Review the assumptions or compare them with the real process.",
  download: "Download scenario",
  secondary: "See my profitability diagnostic",
  proofEyebrow: "From assumption to evidence",
  proofTitle: "POS data can create time and information, but each benefit needs its own measure",
  proofText: "Winerim can compare list, document, stock, sales and purchasing data when sources are connected and validated. This calculator only measures time and its value; it does not attribute sales or margin.",
  demo: "Review my operation with Winerim",
  imageAlt: "SAVia operational query about stock and orders",
  imageCaption: "Example operational query. Scope depends on available data and integrations.",
  footerModel: "Model 2.0 · Indicative result, not a guarantee.",
  footerForm: "Complete result without a form",
  reportScenario: "Scenario entered by the user",
  reportExample: "EDITED OR DEMONSTRATION FICTIONAL EXAMPLE",
  reportModel: "Calculated locally in the browser.",
  reportExcluded: "not performed / excluded",
  reportMissing: "no data",
  reportCurrent: "current",
  reportScenarioHours: "in the scenario",
  reportNet: "net",
  reportTimeValue: "net time value",
  reportCurrentValue: "current time value",
  reportScenarioValue: "scenario time value",
  reportReleasedValue: "net value of time released",
  disclaimer: "Figures are editable assumptions. The value of released time is an opportunity cost; it is not salary savings, headcount reduction, added sales, ROI or an implementation guarantee.",
};

export default function CalculadoraTiempoOperativo() {
  const { lang, localePath } = useLanguage();
  const isEnglish = lang === "en";
  const t = isEnglish ? EN_COPY : ES_COPY;
  const tasks = useMemo(
    () => OPERATIONAL_TASKS.map((task) => isEnglish ? { ...task, ...EN_TASKS[task.id] } : task),
    [isEnglish],
  );
  const [answers, setAnswers] = useState<OperationalTimeAnswers>(createEmptyOperationalTimeAnswers);
  const [currency, setCurrency] = useState<Currency>(isEnglish ? "USD" : "EUR");
  const [example, setExample] = useState(false);
  const calculation = useMemo(() => calculateOperationalTime(answers), [answers]);
  const priorities = prioritizeOperationalTasks(calculation.taskResults);
  const number = (value: number) => new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(value);
  const money = (value: number) => new Intl.NumberFormat(t.locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  const signed = (value: number, suffix = " h") => `${value > 0 ? "+" : ""}${number(value)}${suffix}`;
  const signedMoney = (value: number) => `${value > 0 ? "+" : ""}${money(value)}`;
  const errorText = (error: string) => {
    if (!isEnglish) return error;
    if (error.includes("límite")) return "The value exceeds this calculator's limit.";
    return "Use a positive number or zero, without a thousands separator.";
  };

  const updateEntry = (taskId: OperationalTaskId, patch: Partial<OperationalTimeEntry>) => {
    setAnswers((current) => ({ ...current, [taskId]: { ...current[taskId], ...patch } }));
    setExample(false);
  };

  const reset = () => {
    setAnswers(createEmptyOperationalTimeAnswers());
    setCurrency(isEnglish ? "USD" : "EUR");
    setExample(false);
  };

  const loadExample = () => {
    setAnswers(structuredClone(EXAMPLE_OPERATIONAL_TIME_ANSWERS));
    setExample(true);
  };

  const periodRows = [
    {
      label: t.week,
      currentHours: calculation.currentHoursPerWeek,
      scenarioHours: calculation.scenarioHoursPerWeek,
      netHours: calculation.netHoursPerWeek,
      currentValue: calculation.currentTimeValuePerWeek,
      scenarioValue: calculation.scenarioTimeValuePerWeek,
      netValue: calculation.netTimeValuePerWeek,
    },
    {
      label: t.month,
      currentHours: calculation.currentHoursPerMonth,
      scenarioHours: calculation.scenarioHoursPerMonth,
      netHours: calculation.netHoursPerMonth,
      currentValue: calculation.currentTimeValuePerMonth,
      scenarioValue: calculation.scenarioTimeValuePerMonth,
      netValue: calculation.netTimeValuePerMonth,
    },
    {
      label: t.year,
      currentHours: calculation.currentHoursPerYear,
      scenarioHours: calculation.scenarioHoursPerYear,
      netHours: calculation.netHoursPerYear,
      currentValue: calculation.currentTimeValuePerYear,
      scenarioValue: calculation.scenarioTimeValuePerYear,
      netValue: calculation.netTimeValuePerYear,
    },
  ];

  const report = () => {
    const taskLines = tasks.map((task) => {
      const entry = answers[task.id];
      const result = calculation.taskResults[task.id];
      if (!entry.enabled) return `${task.title}: ${t.reportExcluded}.`;
      if (!result) return `${task.title}: ${t.reportMissing}.`;
      return [
        task.title,
        entry.role || t.reportMissing,
        `${number(result.currentHoursPerWeek)} h/${t.week.toLowerCase()} ${t.reportCurrent}`,
        `${number(result.scenarioHoursPerWeek)} h/${t.week.toLowerCase()} ${t.reportScenarioHours}`,
        `${signed(result.netHoursPerWeek)} h/${t.week.toLowerCase()} ${t.reportNet}`,
        result.hourlyCost === null ? t.costMissing : `${money(result.hourlyCost)}/h; ${signedMoney(result.netTimeValuePerWeek!)} ${t.reportTimeValue}/${t.week.toLowerCase()}`,
      ].join(" · ");
    });
    return [
      `Winerim | ${t.appName}`,
      example ? t.reportExample : t.reportScenario,
      `${isEnglish ? "Model" : "Modelo"} ${calculation.modelVersion}. ${t.reportModel}`,
      t.formula,
      t.conversion,
      ...periodRows.map((row) => `${row.label}: ${number(row.currentHours)} h ${t.reportCurrent} · ${number(row.scenarioHours)} h ${t.reportScenarioHours} · ${signed(row.netHours)} h ${t.reportNet} · ${money(row.currentValue)} ${t.reportCurrentValue} · ${money(row.scenarioValue)} ${t.reportScenarioValue} · ${signedMoney(row.netValue)} ${t.reportReleasedValue}.`),
      calculation.costCoverage < calculation.coverage ? t.partialCost(calculation.costCoverage, calculation.coverage) : "",
      ...taskLines,
      t.disclaimer,
    ].filter(Boolean).join("\n\n");
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = isEnglish ? "winerim-operational-cost.txt" : "winerim-coste-operativo.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <SEOHead
        title={t.title}
        description={t.description}
        url={`https://winerim.wine${isEnglish ? "/en/tools/operational-time-calculator" : "/herramientas/calculadora-tiempo-operativo"}`}
        hreflang={[
          { lang: "es", url: "https://winerim.wine/herramientas/calculadora-tiempo-operativo" },
          { lang: "x-default", url: "https://winerim.wine/herramientas/calculadora-tiempo-operativo" },
          { lang: "en", url: "https://winerim.wine/en/tools/operational-time-calculator" },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: t.appName,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: currency },
        }}
      />
      <Navbar solid />
      <div className="profitability-page operational-time-page">
        <a className="profit-skip" href="#calculadora">{t.skip}</a>
        <main>
        <div className="profit-intro time-intro">
          <p className="profit-eyebrow">{t.eyebrow}</p>
          <h1>{t.appName}</h1>
          <p>{t.intro}</p>
          <span className="profit-local">{t.local}</span>
        </div>

        <section id="calculadora" className="time-workspace" aria-labelledby="time-title">
          <div className="time-toolbar">
            <div>
              <p className="profit-eyebrow">{t.scenario}</p>
              <h2 id="time-title">{t.formTitle}</h2>
              <p>{t.frequency}</p>
            </div>
            <div className="time-toolbar-actions">
              <label className="time-currency">{t.currency}
                <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>
                  <option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option>
                </select>
              </label>
              <button type="button" className="profit-icon-button" onClick={loadExample} title={t.loadExample} aria-label={t.loadExample}><FlaskConical size={18} /></button>
              <button type="button" className="profit-icon-button" onClick={reset} title={t.reset} aria-label={t.reset}><RotateCcw size={18} /></button>
            </div>
          </div>

          {example && <p className="profit-example" role="status">{t.example}</p>}

          <div className="time-summary" aria-live="polite">
            <div><span>{t.current}</span><strong>{number(calculation.currentHoursPerWeek)} h</strong><small>{t.week.toLowerCase()}</small></div>
            <div><span>{t.scenarioLabel}</span><strong>{number(calculation.scenarioHoursPerWeek)} h</strong><small>{t.week.toLowerCase()}</small></div>
            <div><span>{t.recoverable}</span><strong>{number(calculation.recoverableHoursPerWeek)} h</strong><small>{t.week.toLowerCase()}</small></div>
            <div><span>{t.additional}</span><strong>{number(calculation.additionalHoursPerWeek)} h</strong><small>{t.week.toLowerCase()}</small></div>
            <div className="time-summary-net"><span>{t.net}</span><strong>{signed(calculation.netHoursPerWeek)}</strong><small>{t.week.toLowerCase()}</small></div>
          </div>

          <div className="time-method">
            <p><strong>{isEnglish ? "Formula:" : "Fórmula:"}</strong> {t.formula}</p>
            <p><strong>{isEnglish ? "Calendar:" : "Calendario:"}</strong> {t.conversion}</p>
          </div>

          <section className="profit-source-panel time-source" aria-labelledby="time-source-title">
            <h3 id="time-source-title"><ShieldCheck size={18} /> {t.sourceTitle}</h3>
            <div className="profit-source-list">
              <span data-source="entered">{t.entered}</span>
              <span data-source="calculated">{t.calculated}</span>
              <span data-source="fictional">{t.fictional}</span>
              <span data-source="verified">{t.verified}: {t.notConnected}</span>
            </div>
            <p>{t.sourceNote}</p>
          </section>

          <div className="time-task-list">
            {tasks.map((task) => {
              const Icon = taskIcons[task.id];
              const entry = answers[task.id];
              const result = calculation.taskResults[task.id];
              return (
                <article className="time-task" key={task.id} data-disabled={!entry.enabled || undefined}>
                  <label className="time-task-toggle">
                    <input type="checkbox" checked={entry.enabled} onChange={(event) => updateEntry(task.id, { enabled: event.target.checked })} />
                    <Icon size={19} aria-hidden="true" />
                    <span><strong>{task.title}</strong><small>{task.description}</small><small className="time-boundary">{task.boundary}</small></span>
                  </label>
                  <div className="time-task-fields">
                    <label htmlFor={`${task.id}-role`}>
                      <span>{t.fields.role}</span>
                      <input id={`${task.id}-role`} value={entry.role} disabled={!entry.enabled} onChange={(event) => updateEntry(task.id, { role: event.target.value })} placeholder={t.rolePlaceholder} />
                    </label>
                    {FIELD_KEYS.map((field) => {
                      const error = calculation.errors[`${task.id}.${field}`];
                      const inputId = `${task.id}-${field}`;
                      return (
                        <label key={field} htmlFor={inputId}>
                          <span>{t.fields[field]}</span>
                          <span className="time-input-wrap">
                            <input id={inputId} inputMode="decimal" value={entry[field]} disabled={!entry.enabled} onChange={(event) => updateEntry(task.id, { [field]: event.target.value })} aria-invalid={error ? true : undefined} aria-describedby={error ? `${inputId}-error` : undefined} placeholder="—" />
                            <small>{field === "occurrencesPerWeek" ? t.times : field === "hourlyCost" ? `${currency}${t.perHour}` : "min"}</small>
                          </span>
                          {error && <small className="profit-error" id={`${inputId}-error`}>{errorText(error)}</small>}
                        </label>
                      );
                    })}
                  </div>
                  <div className="time-task-result">
                    <span>{t.weeklyDifference}</span>
                    <strong>{result ? signed(result.netHoursPerWeek) : t.noData}</strong>
                    {result?.netTimeValuePerWeek !== null && result?.netTimeValuePerWeek !== undefined
                      ? <small>{signedMoney(result.netTimeValuePerWeek)} · {t.value.toLowerCase()}</small>
                      : result ? <small>{t.costMissing}</small> : null}
                    {result && result.netHoursPerWeek < 0 && <small className="profit-error">{t.moreTime}</small>}
                  </div>
                </article>
              );
            })}
          </div>

          {calculation.additionalHoursPerWeek > 0 && <p className="time-warning">{t.warning(number(calculation.additionalHoursPerWeek))}</p>}

          {calculation.coverage > 0 && (
            <section className="time-results" aria-labelledby="time-results-title">
              <div className="time-results-heading">
                <div><p className="profit-eyebrow">{t.value}</p><h2 id="time-results-title">{t.currentTimeCost}, {t.scenarioTimeCost.toLowerCase()} y {t.net.toLowerCase()}</h2></div>
                <div><span>{t.coverage}: {calculation.coverage}/{OPERATIONAL_TASKS.length}</span><span>{t.costCoverage}: {calculation.costCoverage}/{calculation.coverage}</span></div>
              </div>
              <div className="time-period-table" role="table" aria-label={t.value}>
                <div className="time-period-row time-period-head" role="row">
                  <span role="columnheader">{isEnglish ? "Period" : "Periodo"}</span>
                  <span role="columnheader">{t.current}</span>
                  <span role="columnheader">{t.scenarioLabel}</span>
                  <span role="columnheader">{t.net}</span>
                </div>
                {periodRows.map((row) => (
                  <div className="time-period-row" role="row" key={row.label}>
                    <strong role="cell">{row.label}</strong>
                    <span role="cell">{number(row.currentHours)} h<small>{money(row.currentValue)}</small></span>
                    <span role="cell">{number(row.scenarioHours)} h<small>{money(row.scenarioValue)}</small></span>
                    <span role="cell" data-negative={row.netHours < 0 || undefined}>{signed(row.netHours)}<small>{signedMoney(row.netValue)}</small></span>
                  </div>
                ))}
              </div>
              {calculation.costCoverage < calculation.coverage && <p className="time-cost-coverage">{t.partialCost(calculation.costCoverage, calculation.coverage)}</p>}
              <p className="time-cash-note"><strong>{t.opportunityValue}:</strong> {t.cashNote}</p>
            </section>
          )}

          <section className="time-actions" aria-labelledby="time-actions-title">
            <div><p className="profit-eyebrow">{t.next}</p><h2 id="time-actions-title">{t.priorities}</h2></div>
            {priorities.length > 0 ? (
              <ol className="profit-actions">
                {priorities.map((taskId, index) => {
                  const task = tasks.find(({ id }) => id === taskId)!;
                  const result = calculation.taskResults[taskId]!;
                  return <li key={taskId}><span>0{index + 1}</span><div><h3>{task.action}</h3><p>{t.priorityResult(task.title, number(result.netHoursPerWeek))}</p></div><Link to={localePath(task.route)} aria-label={`${task.action}: ${t.open}`}><ArrowRight size={18} /></Link></li>;
                })}
              </ol>
            ) : <p className="time-empty">{calculation.coverage > 0 ? t.noPositive : t.empty}</p>}
            <div className="profit-report-actions">
              <button type="button" className="profit-primary" onClick={download} disabled={calculation.coverage === 0 || Object.keys(calculation.errors).length > 0}><Download size={17} /> {t.download}</button>
              <Link className="profit-secondary-link" to={localePath("/herramientas/diagnostico-rentabilidad-bodega")}>{t.secondary} <ArrowRight size={16} /></Link>
            </div>
          </section>
        </section>

        <section className="profit-product">
          <div><p className="profit-eyebrow">{t.proofEyebrow}</p><h2>{t.proofTitle}</h2><p>{t.proofText}</p><Link to={localePath("/demo")}>{t.demo} <ArrowRight size={17} /></Link></div>
          <figure><img src={productImage} alt={t.imageAlt} loading="lazy" /><figcaption>{t.imageCaption}</figcaption></figure>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
