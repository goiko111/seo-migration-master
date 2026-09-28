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

const fieldLabels: Record<keyof Omit<OperationalTimeEntry, "enabled">, string> = {
  currentMinutes: "Ahora",
  winerimMinutes: "Con Winerim",
  occurrencesPerMonth: "Veces al mes",
};

export default function CalculadoraTiempoOperativo() {
  const [answers, setAnswers] = useState<OperationalTimeAnswers>(
    createEmptyOperationalTimeAnswers,
  );
  const [example, setExample] = useState(false);
  const calculation = useMemo(() => calculateOperationalTime(answers), [answers]);
  const priorities = prioritizeOperationalTasks(calculation.taskResults);
  const number = (value: number) =>
    new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);

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
    const lines = OPERATIONAL_TASKS.map((task) => {
      const entry = answers[task.id];
      const result = calculation.taskResults[task.id];
      if (!entry.enabled) return `${task.title}: excluida por el usuario.`;
      return [
        task.title,
        `actual ${entry.currentMinutes || "sin dato"} min`,
        `con Winerim ${entry.winerimMinutes || "sin dato"} min`,
        `${entry.occurrencesPerMonth || "sin dato"} veces/mes`,
        result ? `${number(result.differenceHoursPerMonth)} h/mes de diferencia` : "sin resultado",
      ].join(" · ");
    });

    return [
      "Winerim | Calculadora de tiempo operativo recuperable",
      example ? "EJEMPLO FICTICIO EDITADO O DE DEMOSTRACIÓN" : "Escenario introducido por el usuario",
      `Modelo ${calculation.modelVersion}. Cálculo local en el navegador.`,
      "Fórmula por tarea: (minutos actuales - minutos estimados con Winerim) x frecuencia mensual / 60.",
      `Resultado: ${number(calculation.recoverableHoursPerWeek)} h/semana; ${number(calculation.recoverableHoursPerMonth)} h/mes; ${number(calculation.recoverableHoursPerYear)} h/año.`,
      calculation.additionalHoursPerMonth > 0
        ? `Tiempo adicional estimado en tareas sin reducción: ${number(calculation.additionalHoursPerMonth)} h/mes.`
        : "No se han introducido tareas con tiempo adicional.",
      ...lines,
      "Las cifras son hipótesis editables. Tiempo recuperable no equivale a ahorro salarial, reducción de plantilla ni garantía de implantación.",
    ].join("\n\n");
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "winerim-tiempo-operativo.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="profitability-page operational-time-page">
      <SEOHead
        title="Calculadora de tiempo operativo para restaurantes"
        description="Estima horas recuperables al actualizar la carta, revisar márgenes, procesar documentos, conciliar el TPV y preparar informes."
        url="https://winerim.wine/herramientas/calculadora-tiempo-operativo"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculadora de tiempo operativo recuperable",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        }}
      />
      <a className="profit-skip" href="#calculadora">Ir a la calculadora</a>
      <header className="profit-header">
        <Link to="/" className="profit-brand">
          <Wine aria-hidden="true" size={26} /> Winerim
          <span>Para profesionales del vino</span>
        </Link>
        <Link to="/herramientas">Herramientas <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>

      <main>
        <div className="profit-intro time-intro">
          <p className="profit-eyebrow">Operación diaria</p>
          <h1>Calculadora de tiempo operativo recuperable</h1>
          <p>Compara el tiempo manual actual con tu escenario usando Winerim.<br />Tarea por tarea, sin convertir horas en euros.</p>
          <span className="profit-local">Cálculo local · No enviamos estos datos</span>
        </div>

        <section id="calculadora" className="time-workspace" aria-labelledby="time-title">
          <div className="time-toolbar">
            <div>
              <p className="profit-eyebrow">Tu escenario</p>
              <h2 id="time-title">Introduce tus tiempos y frecuencia</h2>
              <p>La frecuencia es el total mensual del equipo o grupo, no por persona.</p>
            </div>
            <div className="time-toolbar-actions">
              <button type="button" className="profit-icon-button" onClick={loadExample} title="Cargar ejemplo ficticio" aria-label="Cargar ejemplo ficticio"><FlaskConical size={18} /></button>
              <button type="button" className="profit-icon-button" onClick={reset} title="Reiniciar calculadora" aria-label="Reiniciar calculadora"><RotateCcw size={18} /></button>
            </div>
          </div>

          {example && (
            <p className="profit-example" role="status">
              Ejemplo ficticio. No representa resultados de un cliente y puedes cambiar todos los supuestos.
            </p>
          )}

          <div className="time-summary" aria-live="polite">
            <div>
              <span>Por semana</span>
              <strong>{number(calculation.recoverableHoursPerWeek)} h</strong>
            </div>
            <div>
              <span>Por mes</span>
              <strong>{number(calculation.recoverableHoursPerMonth)} h</strong>
            </div>
            <div>
              <span>Por año</span>
              <strong>{number(calculation.recoverableHoursPerYear)} h</strong>
            </div>
            <div className="time-summary-coverage">
              <span>Con datos</span>
              <strong>{calculation.coverage}/{OPERATIONAL_TASKS.length}</strong>
            </div>
          </div>

          <p className="time-formula">
            <strong>Fórmula:</strong> (tiempo manual actual − tiempo estimado con Winerim) × frecuencia mensual. Semana = año ÷ 52.
          </p>

          <div className="time-task-list">
            {OPERATIONAL_TASKS.map((task) => {
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
                    {(Object.keys(fieldLabels) as Array<keyof typeof fieldLabels>).map((field) => {
                      const error = calculation.errors[`${task.id}.${field}`];
                      return (
                        <label key={field}>
                          <span>{fieldLabels[field]}</span>
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
                            <small>{field === "occurrencesPerMonth" ? "veces" : "min"}</small>
                          </span>
                          {error && <small className="profit-error" id={`${task.id}-${field}-error`}>{error}</small>}
                        </label>
                      );
                    })}
                  </div>
                  <div className="time-task-result">
                    <span>Diferencia mensual</span>
                    <strong>{result ? `${number(result.differenceHoursPerMonth)} h` : "Sin datos"}</strong>
                    {result && result.differenceHoursPerMonth < 0 && <small>Este supuesto requiere más tiempo.</small>}
                  </div>
                </article>
              );
            })}
          </div>

          {calculation.additionalHoursPerMonth > 0 && (
            <p className="time-warning">
              Tus supuestos incluyen {number(calculation.additionalHoursPerMonth)} h/mes adicionales en tareas donde el tiempo estimado con Winerim supera al actual. No se han ocultado ni compensado.
            </p>
          )}

          <section className="time-actions" aria-labelledby="time-actions-title">
            <div>
              <p className="profit-eyebrow">Siguiente paso</p>
              <h2 id="time-actions-title">Empieza por las tareas con mayor diferencia</h2>
            </div>
            {priorities.length > 0 ? (
              <ol className="profit-actions">
                {priorities.map((taskId, index) => {
                  const task = OPERATIONAL_TASKS.find(({ id }) => id === taskId)!;
                  const result = calculation.taskResults[taskId]!;
                  return (
                    <li key={taskId}>
                      <span>0{index + 1}</span>
                      <div>
                        <h3>{task.action}</h3>
                        <p>{task.title}: {number(result.recoverableHoursPerMonth)} h/mes en tu escenario.</p>
                      </div>
                      <Link to={task.route} aria-label={`${task.action}: abrir`}><ArrowRight size={18} /></Link>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="time-empty">Completa al menos una tarea para obtener prioridades basadas en tus propios datos.</p>
            )}
            <div className="profit-report-actions">
              <button type="button" className="profit-primary" onClick={download} disabled={calculation.coverage === 0 || Object.keys(calculation.errors).length > 0}>
                <Download size={17} /> Descargar escenario
              </button>
              <Link className="profit-secondary-link" to="/herramientas/diagnostico-rentabilidad-bodega">
                Ver diagnóstico de rentabilidad <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </section>

        <section className="profit-product">
          <div>
            <p className="profit-eyebrow">Del supuesto al dato</p>
            <h2>Contrasta el escenario con tu operación real</h2>
            <p>Winerim conecta carta, documentos, stock, ventas y consultas operativas. Una implantación válida empieza midiendo el proceso actual y revisando después qué tareas cambian de verdad.</p>
            <Link to="/demo">Revisar mi caso con Winerim <ArrowRight size={17} /></Link>
          </div>
          <figure>
            <img src={productImage} alt="Consulta operativa en SAVia sobre stock y pedidos" loading="lazy" />
            <figcaption>Ejemplo de consulta operativa. El alcance depende de los datos e integraciones disponibles.</figcaption>
          </figure>
        </section>
      </main>

      <footer className="profit-footer">
        <span>Modelo 1.0 · Resultado orientativo, no garantía.</span>
        <span><Check size={13} aria-hidden="true" /> Sin formulario obligatorio</span>
      </footer>
    </div>
  );
}
