import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Download,
  FlaskConical,
  Package,
  RotateCcw,
  TrendingUp,
  Wallet,
  Wine,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import productImage from "@/assets/feature-margins-overview.webp";
import {
  calculateProfitabilityDiagnosis,
  EMPTY_PROFITABILITY_ANSWERS,
  EXAMPLE_PROFITABILITY_ANSWERS,
  prioritizeProfitabilityAreas,
  PROFITABILITY_AREAS,
  type ProfitabilityArea,
  type ProfitabilityCurrency,
} from "@/lib/profitability";
import "./RentabilidadBodega.css";

const icons = { cost: Wallet, margin: TrendingUp, time: Clock3, capital: Package };
const resultLabels = {
  cost: "Ahorro de costes potencial",
  margin: "Margen bruto de contribución adicional",
  time: "Capacidad operativa recuperable",
  capital: "Capital circulante potencialmente liberable",
};

const areaKeys = Object.keys(PROFITABILITY_AREAS) as ProfitabilityArea[];

export default function RentabilidadBodega() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState("Restaurante");
  const [locations, setLocations] = useState("1");
  const [references, setReferences] = useState("No lo sé");
  const [currency, setCurrency] = useState<ProfitabilityCurrency>("EUR");
  const [objective, setObjective] = useState<ProfitabilityArea>("cost");
  const [activeArea, setActiveArea] = useState<ProfitabilityArea>("cost");
  const [answers, setAnswers] = useState({ ...EMPTY_PROFITABILITY_ANSWERS });
  const [example, setExample] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const diagnosis = calculateProfitabilityDiagnosis(answers, currency);
  const locationValid = /^\d+$/.test(locations) && Number(locations) >= 1 && Number(locations) <= 1000;
  const spec = PROFITABILITY_AREAS[activeArea];
  const money = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  const number = (value: number) =>
    new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);

  const range = (area: ProfitabilityArea) => {
    const value = diagnosis.results[area];
    if (!value) return "Datos insuficientes";
    const format = area === "time" ? number : money;
    return value.low === value.high ? format(value.low) : `${format(value.low)} – ${format(value.high)}`;
  };

  const go = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const reset = () => {
    setAnswers({ ...EMPTY_PROFITABILITY_ANSWERS });
    setExample(false);
    setProfile("Restaurante");
    setLocations("1");
    setReferences("No lo sé");
    setCurrency("EUR");
    setObjective("cost");
    setActiveArea("cost");
    go(0);
  };

  const loadExample = () => {
    setAnswers({ ...EXAMPLE_PROFITABILITY_ANSWERS });
    setExample(true);
    setActiveArea(objective);
    go(1);
  };

  const report = () => [
    "Winerim | Diagnóstico de rentabilidad de bodega",
    example ? "EJEMPLO FICTICIO EDITADO O DE DEMOSTRACIÓN" : "Escenario introducido por el usuario",
    `${profile}; ${locations} local(es); ${references} referencias; ${currency}; importes sin IVA; totales de todos los locales.`,
    `Modelo: ${diagnosis.modelVersion}. No es una garantía, un ROI neto ni una valoración contable.`,
    ...areaKeys.map((area) =>
      `${resultLabels[area]}: ${range(area)} ${area === "capital" ? "(capital puntual, no mensual)" : area === "time" ? "horas/mes" : "/mes"}. Fórmula: ${PROFITABILITY_AREAS[area].formula} Base: ${PROFITABILITY_AREAS[area].basis}`,
    ),
    "Supuestos introducidos:",
    ...Object.entries(answers).map(([key, value]) => `${key}: ${value || "desconocido"}`),
    "Las cuatro magnitudes no se suman. Son escenarios editables, no intervalos estadísticos. El cálculo se realizó localmente en el navegador.",
  ].join("\n\n");

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "winerim-diagnostico-rentabilidad.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="profitability-page">
      <SEOHead
        title="Diagnóstico de rentabilidad de bodega"
        description="Calcula escenarios de ahorro en compras, margen adicional, horas recuperables y capital inmovilizado sin mezclar las magnitudes."
        url="https://winerim.wine/herramientas/diagnostico-rentabilidad-bodega"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Diagnóstico de rentabilidad de bodega",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        }}
      />
      <a className="profit-skip" href="#diagnostico">Ir al diagnóstico</a>
      <header className="profit-header">
        <Link to="/" className="profit-brand">
          <Wine aria-hidden="true" size={26} /> Winerim
          <span>Para profesionales del vino</span>
        </Link>
        <Link to="/herramientas">Herramientas <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>

      <main>
        <div className="profit-intro">
          <p className="profit-eyebrow">Decisiones de bodega</p>
          <h1>Diagnóstico de rentabilidad de bodega</h1>
          <p>Compras, margen, tiempo y stock.<br />Una lectura clara de dónde actuar primero.</p>
          <span className="profit-local">Cálculo local en tu navegador · No enviamos estas cifras</span>
        </div>

        <section id="diagnostico" className="profit-workspace" aria-label="Diagnóstico de rentabilidad">
          <aside className="profit-sidebar">
            <p className="profit-eyebrow">Tu diagnóstico</p>
            <ol>
              {["Tu negocio", "Tus cifras", "Tu siguiente paso"].map((label, index) => (
                <li key={label} aria-current={step === index ? "step" : undefined}>
                  <span>{step > index ? <Check size={16} aria-hidden="true" /> : `0${index + 1}`}</span>
                  {label}
                </li>
              ))}
            </ol>
            <div className="profit-sidebar-bottom">
              <p>Sin estimaciones ocultas.</p>
              <p>Los supuestos son tuyos. Las cuatro magnitudes se mantienen separadas.</p>
              <button type="button" className="profit-text-button" onClick={loadExample}>
                <FlaskConical size={15} /> Cargar ejemplo ficticio
              </button>
            </div>
          </aside>

          <div className="profit-form">
            <div className="profit-step-heading">
              <span>Paso {step + 1} de 3</span>
              <div className="profit-step-tools">
                <button type="button" onClick={loadExample} className="profit-icon-button profit-mobile-sample" title="Cargar ejemplo ficticio" aria-label="Cargar ejemplo ficticio"><FlaskConical size={18} /></button>
                <button type="button" onClick={reset} className="profit-icon-button" title="Reiniciar diagnóstico" aria-label="Reiniciar diagnóstico"><RotateCcw size={18} /></button>
              </div>
            </div>
            <h2 ref={titleRef} tabIndex={-1}>
              {step === 0 ? "Empecemos por tu negocio" : step === 1 ? spec.question : "Tres decisiones para avanzar"}
            </h2>
            {example && (
              <p className="profit-example" role="status">
                Ejemplo ficticio{step === 2 ? ": resultados de demostración, no de un cliente." : ". Puedes modificar todos sus supuestos."}
              </p>
            )}

            {step === 0 && (
              <form onSubmit={(event) => { event.preventDefault(); if (locationValid) { setActiveArea(objective); go(1); } }}>
                <div className="profit-fields">
                  <label>Tipo de negocio
                    <select value={profile} onChange={(event) => setProfile(event.target.value)}>
                      {["Restaurante", "Wine bar", "Hotel", "Grupo de restauración"].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>Número de locales
                    <input type="number" min="1" max="1000" step="1" value={locations} onChange={(event) => setLocations(event.target.value)} aria-invalid={locationValid ? undefined : true} required />
                  </label>
                  <label>Referencias de vino por local
                    <select value={references} onChange={(event) => setReferences(event.target.value)}>
                      {["No lo sé", "Menos de 50", "50 a 150", "151 a 500", "Más de 500"].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>Moneda
                    <select value={currency} onChange={(event) => setCurrency(event.target.value as ProfitabilityCurrency)}>
                      <option value="EUR">EUR · Euro</option>
                      <option value="USD">USD · Dólar estadounidense</option>
                      <option value="GBP">GBP · Libra esterlina</option>
                    </select>
                  </label>
                </div>
                <fieldset className="profit-objectives">
                  <legend>¿Qué quieres revisar primero?</legend>
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return (
                      <label key={area}>
                        <input type="radio" name="objective" checked={objective === area} onChange={() => setObjective(area)} />
                        <Icon size={18} aria-hidden="true" />
                        <span>{PROFITABILITY_AREAS[area].title}</span>
                      </label>
                    );
                  })}
                </fieldset>
                <div className="profit-form-footer">
                  <span>Obtén el resultado antes de decidir si quieres hablar con Winerim.</span>
                  <button className="profit-primary" type="submit">Continuar <ArrowRight size={18} /></button>
                </div>
              </form>
            )}

            {step === 1 && (
              <>
                <div role="group" aria-label="Área del diagnóstico" className="profit-tabs">
                  {areaKeys.map((area) => (
                    <button type="button" key={area} aria-pressed={activeArea === area} onClick={() => setActiveArea(area)}>
                      {PROFITABILITY_AREAS[area].title}
                      {diagnosis.results[area] && <Check size={14} aria-label="Datos completos" />}
                    </button>
                  ))}
                </div>
                <p className="profit-basis">{profile} · {locations} local(es). Importes en {currency}, sin IVA. Totales de todos los locales, no por local. No hay conversión de divisas.</p>
                <p className="profit-assumption">{spec.basis}</p>
                <div className="profit-fields">
                  {spec.fields.map((field) => (
                    <div className="profit-field" key={field.key}>
                      <label htmlFor={field.key}>{field.label}</label>
                      <div className="profit-input-wrap">
                        <input
                          id={field.key}
                          inputMode="decimal"
                          value={answers[field.key]}
                          onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
                          placeholder="Sin dato"
                          aria-invalid={diagnosis.errors[field.key] ? true : undefined}
                          aria-describedby={diagnosis.errors[field.key] ? `${field.key}-error` : undefined}
                        />
                        <span>{field.unit === "money" ? currency : field.unit === "percent" ? "%" : field.unit === "hours" ? "h/mes" : "bot./mes"}</span>
                      </div>
                      <button type="button" className="profit-unknown" onClick={() => setAnswers((current) => ({ ...current, [field.key]: "" }))}>
                        No lo sé<span className="sr-only">: {field.label}</span>
                      </button>
                      {diagnosis.errors[field.key] && <p className="profit-error" id={`${field.key}-error`}>{diagnosis.errors[field.key]}</p>}
                    </div>
                  ))}
                </div>
                <details className="profit-formula">
                  <summary>Ver fórmula y criterio</summary>
                  <p><strong>Fórmula:</strong> {spec.formula}</p>
                  <p>Los mínimos y máximos son escenarios que tú defines. Dejar un dato vacío no equivale a cero.</p>
                </details>
                {Object.keys(diagnosis.errors).length > 0 && <p role="alert" className="profit-error">Revisa los valores marcados antes de continuar.</p>}
                <div className="profit-form-footer">
                  <button type="button" className="profit-text-button" onClick={() => go(0)}><ArrowLeft size={17} /> Volver</button>
                  <button type="button" className="profit-primary" disabled={Object.keys(diagnosis.errors).length > 0} onClick={() => go(2)}>Ver diagnóstico <ArrowRight size={18} /></button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="profit-basis">{diagnosis.coverage} de 4 áreas con datos · {currency} · Sin IVA · {locations} local(es)</p>
                <div className="profit-results">
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return (
                      <article className="profit-result" key={area}>
                        <Icon size={20} aria-hidden="true" />
                        <h3>{resultLabels[area]}</h3>
                        <strong>{range(area)}</strong>
                        <span>{area === "capital" ? "Capital puntual, no beneficio mensual" : area === "time" ? "Horas al mes, no ahorro salarial" : "Al mes, no beneficio neto"}</span>
                        {area === "margin" && diagnosis.results.margin && diagnosis.results.margin.low < 0 && <p className="profit-error">A este coste, vender más reduce la contribución.</p>}
                        <details className="profit-result-formula">
                          <summary>Cómo se calcula</summary>
                          <p>{PROFITABILITY_AREAS[area].formula}</p>
                        </details>
                        <button type="button" className="profit-text-button" onClick={() => { setActiveArea(area); go(1); }}>
                          {diagnosis.results[area] ? "Revisar supuestos" : "Completar datos"} <ArrowRight size={14} />
                        </button>
                      </article>
                    );
                  })}
                </div>
                <p className="profit-disclaimer">Estas cifras no se suman. Son rangos de escenario, no garantías ni un cálculo de ROI. El capital no es ingreso y el tiempo no se convierte automáticamente en ahorro.</p>
                <ol className="profit-actions">
                  {prioritizeProfitabilityAreas(objective).map((area, index) => (
                    <li key={area}>
                      <span>0{index + 1}</span>
                      <div>
                        <h3>{PROFITABILITY_AREAS[area].action}</h3>
                        <p>{diagnosis.results[area] ? "Contrasta este escenario con tus datos operativos." : "Empieza por reunir los datos que faltan."}</p>
                      </div>
                      <Link to={PROFITABILITY_AREAS[area].route} aria-label={PROFITABILITY_AREAS[area].action}><ArrowRight size={22} /></Link>
                    </li>
                  ))}
                </ol>
                <div className="profit-report-actions">
                  <button type="button" className="profit-primary" onClick={download}><Download size={17} /> Descargar informe</button>
                  <Link className="profit-secondary-link" to="/demo">Solicitar una demo <ArrowRight size={16} /></Link>
                </div>
                <button type="button" className="profit-text-button profit-back" onClick={() => go(1)}><ArrowLeft size={16} /> Editar diagnóstico</button>
              </>
            )}
          </div>
        </section>

        <section className="profit-product">
          <div>
            <p className="profit-eyebrow">De la estimación a la operativa</p>
            <h2>La decisión empieza<br />con tus datos reales.</h2>
            <p>Carta, compras, ventas y stock aportan contexto a cada cifra. El diagnóstico plantea un escenario; el trabajo diario exige contrastarlo.</p>
            <Link to="/funcionalidades">Explorar Winerim <ArrowRight size={17} /></Link>
          </div>
          <figure>
            <img src={productImage} alt="Vista de producto Winerim con salud de la carta, ventas y capital inmovilizado" width="1324" height="928" loading="lazy" />
            <figcaption>Captura del producto. Sus cifras no corresponden a este diagnóstico.</figcaption>
          </figure>
        </section>
      </main>

      <footer className="profit-footer">
        <span>Winerim · Decisiones con contexto</span>
        <span>Modelo {diagnosis.modelVersion} · Cálculo local en tu navegador</span>
      </footer>
    </div>
  );
}
