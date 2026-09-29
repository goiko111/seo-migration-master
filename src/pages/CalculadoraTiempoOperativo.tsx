import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Clock3,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  ListChecks,
  Percent,
  RefreshCcw,
  RotateCcw,
  Truck,
  Wine,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import productImage from "@/assets/feature-savia-prompt.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  calculateOperationalTime,
  createEmptyOperationalTimeAnswers,
  EXAMPLE_OPERATIONAL_TIME_ANSWERS,
  OPERATIONAL_TASKS,
  prioritizeOperationalTasks,
  type OperationalTaskId,
  type OperationalTimeAnswers,
  type OperationalTimeEntry,
} from "@/lib/operationalTime";
import "./RentabilidadBodega.css";
import "./CalculadoraTiempoOperativo.css";

const taskIcons = {
  list: ListChecks,
  margins: Percent,
  documents: FileText,
  reconciliation: RefreshCcw,
  suppliers: Truck,
  reports: BarChart3,
  groups: Building2,
  training: GraduationCap,
};

const FIELD_KEYS = [
  "currentMinutes",
  "winerimMinutes",
  "occurrencesPerMonth",
] as const;

const EN_TASKS: Record<OperationalTaskId, Pick<(typeof OPERATIONAL_TASKS)[number], "title" | "description" | "action">> = {
  list: {
    title: "Update the wine list and prices",
    description: "New listings, removals, vintages, formats, prices and list changes.",
    action: "Centralize your list, catalog and prices",
  },
  margins: {
    title: "Review margins",
    description: "Compare cost, selling price, by-the-glass service and margin targets.",
    action: "Check prices and margins",
  },
  documents: {
    title: "Process documents and invoices",
    description: "Read, classify and transfer delivery notes, invoices and price lists.",
    action: "Review the CloudRIM document flow",
  },
  reconciliation: {
    title: "Reconcile sales, stock and POS",
    description: "Find differences across tickets, references and inventory.",
    action: "Review your integrations",
  },
  suppliers: {
    title: "Compare distributors",
    description: "Review prices, availability, service and alternative references.",
    action: "Compare distributors using the same criteria",
  },
  reports: {
    title: "Prepare reports",
    description: "Bring together sales, rotation, margin, stock and pending decisions.",
    action: "Query operational data with SAVia",
  },
  groups: {
    title: "Consolidate multiple venues",
    description: "Unify catalogs, prices, metrics and exceptions across locations.",
    action: "Structure restaurant group management",
  },
  training: {
    title: "Answer questions and train the team",
    description: "Handle recurring questions about the list, service and product.",
    action: "Structure team learning",
  },
};

const ES_COPY = {
  locale: "es-ES",
  title: "Calculadora de tiempo operativo para restaurantes",
  description: "Estima horas recuperables al actualizar la carta, revisar márgenes, procesar documentos, conciliar el TPV y preparar informes.",
  appName: "Calculadora de tiempo operativo recuperable",
  skip: "Ir a la calculadora",
  professional: "Para profesionales del vino",
  tools: "Herramientas",
  eyebrow: "Operación diaria",
  intro: "Compara el tiempo manual actual con tu escenario usando Winerim. Tarea por tarea, sin convertir horas en euros.",
  local: "Cálculo local · No enviamos estos datos",
  scenario: "Tu escenario",
  formTitle: "Introduce tus tiempos y frecuencia",
  frequency: "La frecuencia es el total mensual del equipo o grupo, no por persona.",
  loadExample: "Cargar ejemplo ficticio",
  reset: "Reiniciar calculadora",
  example: "Ejemplo ficticio. No representa resultados de un cliente y puedes cambiar todos los supuestos.",
  week: "Por semana",
  month: "Por mes",
  year: "Por año",
  coverage: "Con datos",
  formula: "(tiempo manual actual − tiempo estimado con Winerim) × frecuencia mensual. Semana = año ÷ 52.",
  fields: { currentMinutes: "Ahora", winerimMinutes: "Con Winerim", occurrencesPerMonth: "Veces al mes" },
  times: "veces",
  monthlyDifference: "Diferencia mensual",
  noData: "Sin datos",
  moreTime: "Este supuesto requiere más tiempo.",
  additional: (hours: string) => `Tus supuestos incluyen ${hours} h/mes adicionales en tareas donde el tiempo estimado con Winerim supera al actual. No se han ocultado ni compensado.`,
  next: "Siguiente paso",
  priorities: "Empieza por las tareas con mayor diferencia",
  priorityResult: (title: string, hours: string) => `${title}: ${hours} h/mes en tu escenario.`,
  open: "abrir",
  empty: "Completa al menos una tarea para obtener prioridades basadas en tus propios datos.",
  download: "Descargar escenario",
  secondary: "Ver diagnóstico de rentabilidad",
  secondaryPath: "/herramientas/diagnostico-rentabilidad-bodega",
  proofEyebrow: "Del supuesto al dato",
  proofTitle: "Contrasta el escenario con tu operación real",
  proofText: "Winerim conecta carta, documentos, stock, ventas y consultas operativas. Una implantación válida empieza midiendo el proceso actual y revisando después qué tareas cambian de verdad.",
  demo: "Revisar mi caso con Winerim",
  imageAlt: "Consulta operativa en SAVia sobre stock y pedidos",
  imageCaption: "Ejemplo de consulta operativa. El alcance depende de los datos e integraciones disponibles.",
  footerModel: "Modelo 1.0 · Resultado orientativo, no garantía.",
  footerForm: "Sin formulario obligatorio",
  reportScenario: "Escenario introducido por el usuario",
  reportExample: "EJEMPLO FICTICIO EDITADO O DE DEMOSTRACIÓN",
  reportModel: "Cálculo local en el navegador.",
  reportFormula: "Fórmula por tarea: (minutos actuales - minutos estimados con Winerim) x frecuencia mensual / 60.",
  reportResult: (week: string, month: string, year: string) => `Resultado: ${week} h/semana; ${month} h/mes; ${year} h/año.`,
  reportAdditional: (hours: string) => `Tiempo adicional estimado en tareas sin reducción: ${hours} h/mes.`,
  reportNoAdditional: "No se han introducido tareas con tiempo adicional.",
  reportExcluded: "excluida por el usuario",
  reportCurrent: "actual",
  reportWith: "con Winerim",
  reportFrequency: "veces/mes",
  reportDifference: "h/mes de diferencia",
  reportMissing: "sin dato",
  reportNoResult: "sin resultado",
  disclaimer: "Las cifras son hipótesis editables. Tiempo recuperable no equivale a ahorro salarial, reducción de plantilla ni garantía de implantación.",
};

const EN_COPY = {
  ...ES_COPY,
  locale: "en-US",
  title: "Restaurant operational time calculator",
  description: "Estimate recoverable hours when updating wine lists, reviewing margins, processing documents, reconciling POS data and preparing reports.",
  appName: "Recoverable operational time calculator",
  skip: "Skip to the calculator",
  professional: "For wine professionals",
  tools: "Tools",
  eyebrow: "Daily operations",
  intro: "Compare your current manual time with your own Winerim scenario, task by task, without turning hours into a salary-saving claim.",
  local: "Calculated locally · We do not send this data",
  scenario: "Your scenario",
  formTitle: "Enter your time and frequency",
  frequency: "Frequency is the monthly total for the team or group, not per person.",
  loadExample: "Load a fictional example",
  reset: "Reset calculator",
  example: "Fictional example. It does not represent customer results and every assumption can be edited.",
  week: "Per week",
  month: "Per month",
  year: "Per year",
  coverage: "With data",
  formula: "(current manual time − estimated time with Winerim) × monthly frequency. Week = year ÷ 52.",
  fields: { currentMinutes: "Current", winerimMinutes: "With Winerim", occurrencesPerMonth: "Times per month" },
  times: "times",
  monthlyDifference: "Monthly difference",
  noData: "No data",
  moreTime: "This assumption requires more time.",
  additional: (hours: string) => `Your assumptions include ${hours} additional hours per month where estimated time with Winerim is higher than current time. They are shown separately and have not been offset.`,
  next: "Next step",
  priorities: "Start with the tasks that show the largest difference",
  priorityResult: (title: string, hours: string) => `${title}: ${hours} hours per month in your scenario.`,
  open: "open",
  empty: "Complete at least one task to get priorities based on your own data.",
  download: "Download scenario",
  secondary: "See all tools",
  secondaryPath: "/en/tools",
  proofEyebrow: "From assumption to evidence",
  proofTitle: "Compare the scenario with your real operation",
  proofText: "Winerim connects lists, documents, stock, sales and operational questions. A sound implementation starts by measuring the current process, then checking which tasks actually change.",
  demo: "Review my operation with Winerim",
  imageAlt: "SAVia operational query about stock and orders",
  imageCaption: "Example operational query. Scope depends on the data and integrations available.",
  footerModel: "Model 1.0 · Indicative result, not a guarantee.",
  footerForm: "No mandatory form",
  reportScenario: "Scenario entered by the user",
  reportExample: "EDITED OR DEMONSTRATION FICTIONAL EXAMPLE",
  reportModel: "Calculated locally in the browser.",
  reportFormula: "Formula by task: (current minutes - estimated minutes with Winerim) x monthly frequency / 60.",
  reportResult: (week: string, month: string, year: string) => `Result: ${week} h/week; ${month} h/month; ${year} h/year.`,
  reportAdditional: (hours: string) => `Estimated additional time in tasks without a reduction: ${hours} h/month.`,
  reportNoAdditional: "No tasks with additional time have been entered.",
  reportExcluded: "excluded by the user",
  reportCurrent: "current",
  reportWith: "with Winerim",
  reportFrequency: "times/month",
  reportDifference: "h/month difference",
  reportMissing: "no data",
  reportNoResult: "no result",
  disclaimer: "Figures are editable assumptions. Recoverable time does not equal salary savings, headcount reduction or an implementation guarantee.",
};

export default function CalculadoraTiempoOperativo() {
  const { lang, localePath } = useLanguage();
  const isEnglish = lang === "en";
  const t = isEnglish ? EN_COPY : ES_COPY;
  const tasks = useMemo(
    () => OPERATIONAL_TASKS.map((task) => isEnglish ? { ...task, ...EN_TASKS[task.id] } : task),
    [isEnglish],
  );
  const [answers, setAnswers] = useState<OperationalTimeAnswers>(
    createEmptyOperationalTimeAnswers,
  );
  const [example, setExample] = useState(false);
  const calculation = useMemo(() => calculateOperationalTime(answers), [answers]);
  const priorities = prioritizeOperationalTasks(calculation.taskResults);
  const number = (value: number) =>
    new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(value);
  const errorText = (error: string) => {
    if (!isEnglish) return error;
    if (error.includes("límite")) return "The value exceeds this calculator's limit.";
    return "Use a positive number or zero, without a thousands separator.";
  };

  const updateEntry = (
    taskId: OperationalTaskId,
    patch: Partial<OperationalTimeEntry>,
  ) => {
    setAnswers((current) => ({
      ...current,
      [taskId]: { ...current[taskId], ...patch },
    }));
    setExample(false);
  };

  const reset = () => {
    setAnswers(createEmptyOperationalTimeAnswers());
    setExample(false);
  };

  const loadExample = () => {
    setAnswers(structuredClone(EXAMPLE_OPERATIONAL_TIME_ANSWERS));
    setExample(true);
  };

  const report = () => {
    const lines = tasks.map((task) => {
      const entry = answers[task.id];
      const result = calculation.taskResults[task.id];
      if (!entry.enabled) return `${task.title}: ${t.reportExcluded}.`;
      return [
        task.title,
        `${t.reportCurrent} ${entry.currentMinutes || t.reportMissing} min`,
        `${t.reportWith} ${entry.winerimMinutes || t.reportMissing} min`,
        `${entry.occurrencesPerMonth || t.reportMissing} ${t.reportFrequency}`,
        result ? `${number(result.differenceHoursPerMonth)} ${t.reportDifference}` : t.reportNoResult,
      ].join(" · ");
    });

    return [
      `Winerim | ${t.appName}`,
      example ? t.reportExample : t.reportScenario,
      `${isEnglish ? "Model" : "Modelo"} ${calculation.modelVersion}. ${t.reportModel}`,
      t.reportFormula,
      t.reportResult(number(calculation.recoverableHoursPerWeek), number(calculation.recoverableHoursPerMonth), number(calculation.recoverableHoursPerYear)),
      calculation.additionalHoursPerMonth > 0
        ? t.reportAdditional(number(calculation.additionalHoursPerMonth))
        : t.reportNoAdditional,
      ...lines,
      t.disclaimer,
    ].join("\n\n");
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = isEnglish ? "winerim-operational-time.txt" : "winerim-tiempo-operativo.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="profitability-page operational-time-page">
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
          offers: { "@type": "Offer", price: "0", priceCurrency: isEnglish ? "USD" : "EUR" },
        }}
      />
      <a className="profit-skip" href="#calculadora">{t.skip}</a>
      <header className="profit-header">
        <Link to="/" className="profit-brand">
          <Wine aria-hidden="true" size={26} /> Winerim
          <span>{t.professional}</span>
        </Link>
        <Link to={localePath("/herramientas")}>{t.tools} <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>

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
              <button type="button" className="profit-icon-button" onClick={loadExample} title={t.loadExample} aria-label={t.loadExample}><FlaskConical size={18} /></button>
              <button type="button" className="profit-icon-button" onClick={reset} title={t.reset} aria-label={t.reset}><RotateCcw size={18} /></button>
            </div>
          </div>

          {example && (
            <p className="profit-example" role="status">
              {t.example}
            </p>
          )}

          <div className="time-summary" aria-live="polite">
            <div>
              <span>{t.week}</span>
              <strong>{number(calculation.recoverableHoursPerWeek)} h</strong>
            </div>
            <div>
              <span>{t.month}</span>
              <strong>{number(calculation.recoverableHoursPerMonth)} h</strong>
            </div>
            <div>
              <span>{t.year}</span>
              <strong>{number(calculation.recoverableHoursPerYear)} h</strong>
            </div>
            <div className="time-summary-coverage">
              <span>{t.coverage}</span>
              <strong>{calculation.coverage}/{OPERATIONAL_TASKS.length}</strong>
            </div>
          </div>

          <p className="time-formula">
            <strong>{isEnglish ? "Formula:" : "Fórmula:"}</strong> {t.formula}
          </p>

          <div className="time-task-list">
            {tasks.map((task) => {
              const Icon = taskIcons[task.id];
              const entry = answers[task.id];
              const result = calculation.taskResults[task.id];
              return (
                <article className="time-task" key={task.id} data-disabled={!entry.enabled || undefined}>
                  <label className="time-task-toggle">
                    <input
                      type="checkbox"
                      checked={entry.enabled}
                      onChange={(event) => updateEntry(task.id, { enabled: event.target.checked })}
                    />
                    <Icon size={19} aria-hidden="true" />
                    <span><strong>{task.title}</strong><small>{task.description}</small></span>
                  </label>
                  <div className="time-task-fields">
                    {FIELD_KEYS.map((field) => {
                      const error = calculation.errors[`${task.id}.${field}`];
                      return (
                        <label key={field}>
                          <span>{t.fields[field]}</span>
                          <span className="time-input-wrap">
                            <input
                              inputMode="decimal"
                              value={entry[field]}
                              disabled={!entry.enabled}
                              onChange={(event) => updateEntry(task.id, { [field]: event.target.value })}
                              aria-invalid={error ? true : undefined}
                              aria-describedby={error ? `${task.id}-${field}-error` : undefined}
                              placeholder="—"
                            />
                            <small>{field === "occurrencesPerMonth" ? t.times : "min"}</small>
                          </span>
                          {error && <small className="profit-error" id={`${task.id}-${field}-error`}>{errorText(error)}</small>}
                        </label>
                      );
                    })}
                  </div>
                  <div className="time-task-result">
                    <span>{t.monthlyDifference}</span>
                    <strong>{result ? `${number(result.differenceHoursPerMonth)} h` : t.noData}</strong>
                    {result && result.differenceHoursPerMonth < 0 && <small>{t.moreTime}</small>}
                  </div>
                </article>
              );
            })}
          </div>

          {calculation.additionalHoursPerMonth > 0 && (
            <p className="time-warning">
              {t.additional(number(calculation.additionalHoursPerMonth))}
            </p>
          )}

          <section className="time-actions" aria-labelledby="time-actions-title">
            <div>
              <p className="profit-eyebrow">{t.next}</p>
              <h2 id="time-actions-title">{t.priorities}</h2>
            </div>
            {priorities.length > 0 ? (
              <ol className="profit-actions">
                {priorities.map((taskId, index) => {
                  const task = tasks.find(({ id }) => id === taskId)!;
                  const result = calculation.taskResults[taskId]!;
                  return (
                    <li key={taskId}>
                      <span>0{index + 1}</span>
                      <div>
                        <h3>{task.action}</h3>
                        <p>{t.priorityResult(task.title, number(result.recoverableHoursPerMonth))}</p>
                      </div>
                      <Link to={localePath(task.route)} aria-label={`${task.action}: ${t.open}`}><ArrowRight size={18} /></Link>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="time-empty">{t.empty}</p>
            )}
            <div className="profit-report-actions">
              <button type="button" className="profit-primary" onClick={download} disabled={calculation.coverage === 0 || Object.keys(calculation.errors).length > 0}>
                <Download size={17} /> {t.download}
              </button>
              <Link className="profit-secondary-link" to={t.secondaryPath}>
                {t.secondary} <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </section>

        <section className="profit-product">
          <div>
            <p className="profit-eyebrow">{t.proofEyebrow}</p>
            <h2>{t.proofTitle}</h2>
            <p>{t.proofText}</p>
            <Link to={localePath("/demo")}>{t.demo} <ArrowRight size={17} /></Link>
          </div>
          <figure>
            <img src={productImage} alt={t.imageAlt} loading="lazy" />
            <figcaption>{t.imageCaption}</figcaption>
          </figure>
        </section>
      </main>

      <footer className="profit-footer">
        <span>{t.footerModel}</span>
        <span><Check size={13} aria-hidden="true" /> {t.footerForm}</span>
      </footer>
    </div>
  );
}
