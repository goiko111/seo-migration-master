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
import { useLanguage } from "@/i18n/LanguageContext";
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

const icons = { cost: Wallet, margin: TrendingUp, time: Clock3, capital: Package };
const ES_RESULT_LABELS = {
  cost: "Ahorro de costes potencial",
  margin: "Margen bruto de contribución adicional",
  time: "Capacidad operativa recuperable",
  capital: "Capital circulante potencialmente liberable",
};

const EN_RESULT_LABELS: Record<ProfitabilityArea, string> = {
  cost: "Potential purchasing cost reduction",
  margin: "Additional gross contribution margin",
  time: "Recoverable operational capacity",
  capital: "Working capital potentially released",
};

const EN_PROFITABILITY_AREAS: Record<ProfitabilityArea, ProfitabilityAreaSpec> = {
  cost: {
    title: "Purchasing",
    question: "Which purchasing conditions could you improve?",
    basis: "Same volume and product. Excludes waste, clearance discounts and changes in sales.",
    formula: "Current monthly wine purchases × cost reduction percentage.",
    fields: [
      { key: "purchases", label: "Monthly wine purchases", unit: "money" },
      { key: "purchaseLow", label: "Minimum cost reduction", unit: "percent" },
      { key: "purchaseHigh", label: "Maximum cost reduction", unit: "percent" },
    ],
    route: "/herramientas/calculadora-compra-inteligente",
    action: "Compare your purchasing conditions",
  },
  margin: {
    title: "Margin",
    question: "What would additional bottle sales contribute?",
    basis: "Additional units only, at constant price and cost. Excludes current sales and purchasing savings.",
    formula: "Additional bottles × (net selling price − variable cost per bottle).",
    fields: [
      { key: "unitPrice", label: "Selling price per bottle", unit: "money" },
      { key: "unitCost", label: "Total variable cost per bottle", unit: "money" },
      { key: "unitsLow", label: "Minimum additional bottles per month", unit: "units" },
      { key: "unitsHigh", label: "Maximum additional bottles per month", unit: "units" },
    ],
    route: "/calculadora-margen-vino",
    action: "Review price and margin by reference",
  },
  time: {
    title: "Time",
    question: "How much time does the team spend managing wine?",
    basis: "Total team hours. Time available for other work, not salary savings or headcount reduction.",
    formula: "Current monthly hours × time reduction percentage.",
    fields: [
      { key: "hours", label: "Monthly management hours", unit: "hours" },
      { key: "timeLow", label: "Minimum time reduction", unit: "percent" },
      { key: "timeHigh", label: "Maximum time reduction", unit: "percent" },
    ],
    route: "/herramientas/simulador-pareto-carta-vinos",
    action: "Prioritize the references to review",
  },
  capital: {
    title: "Stock",
    question: "How much capital is tied up in slow-moving wine?",
    basis: "Acquisition cost value. Capital no longer tied up, not revenue or monthly profit.",
    formula: "Slow-moving stock at cost × percentage of stock expected to be released.",
    fields: [
      { key: "stockCost", label: "Slow-moving stock valued at cost", unit: "money" },
      { key: "capitalLow", label: "Minimum share to release", unit: "percent" },
      { key: "capitalHigh", label: "Maximum share to release", unit: "percent" },
    ],
    route: "/herramientas/calculadora-stock-muerto",
    action: "Identify stock that needs a decision",
  },
};

const ES_COPY = {
  locale: "es-ES", title: "Diagnóstico de rentabilidad de bodega", description: "Calcula escenarios de ahorro en compras, margen adicional, horas recuperables y capital inmovilizado sin mezclar las magnitudes.",
  skip: "Ir al diagnóstico", professional: "Para profesionales del vino", tools: "Herramientas", eyebrow: "Decisiones de bodega",
  intro: <>Compras, margen, tiempo y stock.<br />Una lectura clara de dónde actuar primero.</>, local: "Cálculo local en tu navegador · No enviamos estas cifras",
  diagnosis: "Diagnóstico de rentabilidad", yourDiagnosis: "Tu diagnóstico", steps: ["Tu negocio", "Tus cifras", "Tu siguiente paso"],
  noHidden: "Sin estimaciones ocultas.", assumptionsSeparate: "Los supuestos son tuyos. Las cuatro magnitudes se mantienen separadas.", loadExample: "Cargar ejemplo ficticio",
  reset: "Reiniciar diagnóstico", step: (value: number) => `Paso ${value} de 3`, start: "Empecemos por tu negocio", decisions: "Tres decisiones para avanzar",
  exampleInput: "Ejemplo ficticio. Puedes modificar todos sus supuestos.", exampleResult: "Ejemplo ficticio: resultados de demostración, no de un cliente.",
  businessType: "Tipo de negocio", profiles: ["Restaurante", "Wine bar", "Hotel", "Grupo de restauración"], locations: "Número de locales",
  references: "Referencias de vino por local", referenceOptions: ["No lo sé", "Menos de 50", "50 a 150", "151 a 500", "Más de 500"], unknownReference: "No lo sé",
  currency: "Moneda", usd: "USD · Dólar estadounidense", gbp: "GBP · Libra esterlina", objective: "¿Qué quieres revisar primero?",
  beforeContact: "Obtén el resultado antes de decidir si quieres hablar con Winerim.", continue: "Continuar", areaLabel: "Área del diagnóstico", complete: "Datos completos",
  basis: (profile: string, locations: string, currency: string) => `${profile} · ${locations} local(es). Importes en ${currency}, sin IVA. Totales de todos los locales, no por local. No hay conversión de divisas.`,
  noData: "Sin dato", unknown: "No lo sé", hoursUnit: "h/mes", unitsUnit: "bot./mes", formulaSummary: "Ver fórmula y criterio", formula: "Fórmula:",
  formulaNote: "Los mínimos y máximos son escenarios que tú defines. Dejar un dato vacío no equivale a cero.", reviewValues: "Revisa los valores marcados antes de continuar.",
  back: "Volver", viewDiagnosis: "Ver diagnóstico", coverage: (coverage: number, currency: string, locations: string) => `${coverage} de 4 áreas con datos · ${currency} · Sin IVA · ${locations} local(es)`,
  resultSuffix: (area: ProfitabilityArea) => area === "capital" ? "Capital puntual, no beneficio mensual" : area === "time" ? "Horas al mes, no ahorro salarial" : "Al mes, no beneficio neto",
  negative: "A este coste, vender más reduce la contribución.", how: "Cómo se calcula", review: "Revisar supuestos", completeData: "Completar datos",
  disclaimer: "Estas cifras no se suman. Son rangos de escenario, no garantías ni un cálculo de ROI. El capital no es ingreso y el tiempo no se convierte automáticamente en ahorro.",
  contrast: "Contrasta este escenario con tus datos operativos.", gather: "Empieza por reunir los datos que faltan.", download: "Descargar informe", demo: "Solicitar una demo", edit: "Editar diagnóstico",
  productEyebrow: "De la estimación a la operativa", productTitle: <>La decisión empieza<br />con tus datos reales.</>, productText: "Carta, compras, ventas y stock aportan contexto a cada cifra. El diagnóstico plantea un escenario; el trabajo diario exige contrastarlo.",
  explore: "Explorar Winerim", imageAlt: "Vista de producto Winerim con salud de la carta, ventas y capital inmovilizado", imageCaption: "Captura del producto. Sus cifras no corresponden a este diagnóstico.",
  footer: "Winerim · Decisiones con contexto", localFooter: (version: string) => `Modelo ${version} · Cálculo local en tu navegador`, insufficient: "Datos insuficientes",
};

const EN_COPY = {
  ...ES_COPY,
  locale: "en-US", title: "Wine Cellar Profitability Diagnostic", description: "Model purchasing savings, additional contribution margin, recoverable hours and tied-up capital without combining unlike measures.",
  skip: "Skip to the diagnostic", professional: "For wine professionals", tools: "Tools", eyebrow: "Wine cellar decisions",
  intro: <>Purchasing, margin, time and stock.<br />A clear view of where to act first.</>, local: "Calculated locally in your browser · We do not send these figures",
  diagnosis: "Profitability diagnostic", yourDiagnosis: "Your diagnostic", steps: ["Your business", "Your figures", "Your next step"],
  noHidden: "No hidden estimates.", assumptionsSeparate: "The assumptions are yours. The four measures remain separate.", loadExample: "Load a fictional example",
  reset: "Reset diagnostic", step: (value: number) => `Step ${value} of 3`, start: "Start with your business", decisions: "Three decisions to move forward",
  exampleInput: "Fictional example. You can edit every assumption.", exampleResult: "Fictional example: demonstration results, not customer results.",
  businessType: "Business type", profiles: ["Restaurant", "Wine bar", "Hotel", "Restaurant group"], locations: "Number of locations",
  references: "Wine references per location", referenceOptions: ["I don't know", "Fewer than 50", "50 to 150", "151 to 500", "More than 500"], unknownReference: "I don't know",
  currency: "Currency", usd: "USD · US dollar", gbp: "GBP · Pound sterling", objective: "What do you want to review first?",
  beforeContact: "Get the result before deciding whether to speak with Winerim.", continue: "Continue", areaLabel: "Diagnostic area", complete: "Complete data",
  basis: (profile: string, locations: string, currency: string) => `${profile} · ${locations} location(s). Amounts in ${currency}, excluding tax. Totals for all locations, not per location. No currency conversion.`,
  noData: "No data", unknown: "I don't know", hoursUnit: "h/month", unitsUnit: "bottles/month", formulaSummary: "See formula and criteria", formula: "Formula:",
  formulaNote: "Minimum and maximum values are scenarios you define. Leaving a field blank is not the same as zero.", reviewValues: "Review the marked values before continuing.",
  back: "Back", viewDiagnosis: "View diagnostic", coverage: (coverage: number, currency: string, locations: string) => `${coverage} of 4 areas with data · ${currency} · Excluding tax · ${locations} location(s)`,
  resultSuffix: (area: ProfitabilityArea) => area === "capital" ? "One-time capital, not monthly profit" : area === "time" ? "Hours per month, not salary savings" : "Per month, not net profit",
  negative: "At this cost, selling more reduces contribution.", how: "How it is calculated", review: "Review assumptions", completeData: "Complete data",
  disclaimer: "These figures are not added together. They are scenario ranges, not guarantees or a net ROI calculation. Capital is not revenue and time does not automatically become savings.",
  contrast: "Compare this scenario with your operational data.", gather: "Start by collecting the missing data.", download: "Download report", demo: "Request a demo", edit: "Edit diagnostic",
  productEyebrow: "From estimate to operation", productTitle: <>The decision starts<br />with your real data.</>, productText: "Wine list, purchasing, sales and stock add context to every figure. The diagnostic models a scenario; daily work requires evidence.",
  explore: "Explore Winerim", imageAlt: "Winerim product view showing wine-list health, sales and tied-up capital", imageCaption: "Product screenshot. Its figures do not belong to this diagnostic.",
  footer: "Winerim · Decisions with context", localFooter: (version: string) => `Model ${version} · Calculated locally in your browser`, insufficient: "Insufficient data",
};

const areaKeys = Object.keys(PROFITABILITY_AREAS) as ProfitabilityArea[];

export default function RentabilidadBodega() {
  const { lang, localePath } = useLanguage();
  const isEnglish = lang === "en";
  const t = isEnglish ? EN_COPY : ES_COPY;
  const areaSpecs = isEnglish ? EN_PROFITABILITY_AREAS : PROFITABILITY_AREAS;
  const resultLabels = isEnglish ? EN_RESULT_LABELS : ES_RESULT_LABELS;
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(isEnglish ? "Restaurant" : "Restaurante");
  const [locations, setLocations] = useState("1");
  const [references, setReferences] = useState(isEnglish ? "I don't know" : "No lo sé");
  const [currency, setCurrency] = useState<ProfitabilityCurrency>(isEnglish ? "USD" : "EUR");
  const [objective, setObjective] = useState<ProfitabilityArea>("cost");
  const [activeArea, setActiveArea] = useState<ProfitabilityArea>("cost");
  const [answers, setAnswers] = useState({ ...EMPTY_PROFITABILITY_ANSWERS });
  const [example, setExample] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const diagnosis = calculateProfitabilityDiagnosis(answers, currency);
  const locationValid = /^\d+$/.test(locations) && Number(locations) >= 1 && Number(locations) <= 1000;
  const spec = areaSpecs[activeArea];
  const money = (value: number) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  const number = (value: number) =>
    new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(value);
  const errorText = (error: string) => {
    if (!isEnglish) return error;
    if (error.includes("porcentaje")) return "The percentage cannot exceed 100%.";
    if (error.includes("límite")) return "The value exceeds this diagnostic's limit.";
    return "Use a positive number or zero, without a thousands separator.";
  };

  const range = (area: ProfitabilityArea) => {
    const value = diagnosis.results[area];
    if (!value) return t.insufficient;
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
    setProfile(isEnglish ? "Restaurant" : "Restaurante");
    setLocations("1");
    setReferences(isEnglish ? "I don't know" : "No lo sé");
    setCurrency(isEnglish ? "USD" : "EUR");
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
    `Winerim | ${t.title}`,
    example ? (isEnglish ? "EDITED OR DEMONSTRATION FICTIONAL EXAMPLE" : "EJEMPLO FICTICIO EDITADO O DE DEMOSTRACIÓN") : (isEnglish ? "Scenario entered by the user" : "Escenario introducido por el usuario"),
    isEnglish
      ? `${profile}; ${locations} location(s); ${references} references; ${currency}; amounts excluding tax; totals for all locations.`
      : `${profile}; ${locations} local(es); ${references} referencias; ${currency}; importes sin IVA; totales de todos los locales.`,
    isEnglish
      ? `Model: ${diagnosis.modelVersion}. This is not a guarantee, net ROI or accounting valuation.`
      : `Modelo: ${diagnosis.modelVersion}. No es una garantía, un ROI neto ni una valoración contable.`,
    ...areaKeys.map((area) =>
      `${resultLabels[area]}: ${range(area)} ${area === "capital" ? (isEnglish ? "(one-time capital, not monthly)" : "(capital puntual, no mensual)") : area === "time" ? (isEnglish ? "hours/month" : "horas/mes") : (isEnglish ? "/month" : "/mes")}. ${isEnglish ? "Formula" : "Fórmula"}: ${areaSpecs[area].formula} ${isEnglish ? "Basis" : "Base"}: ${areaSpecs[area].basis}`,
    ),
    isEnglish ? "Entered assumptions:" : "Supuestos introducidos:",
    ...Object.entries(answers).map(([key, value]) => `${key}: ${value || (isEnglish ? "unknown" : "desconocido")}`),
    isEnglish
      ? "The four measures are not added together. They are editable scenarios, not statistical intervals. The calculation was performed locally in the browser."
      : "Las cuatro magnitudes no se suman. Son escenarios editables, no intervalos estadísticos. El cálculo se realizó localmente en el navegador.",
  ].join("\n\n");

  const download = () => {
    const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = isEnglish ? "winerim-profitability-diagnostic.txt" : "winerim-diagnostico-rentabilidad.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
        <Link to="/" className="profit-brand">
          <Wine aria-hidden="true" size={26} /> Winerim
          <span>{t.professional}</span>
        </Link>
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
                  <span>{step > index ? <Check size={16} aria-hidden="true" /> : `0${index + 1}`}</span>
                  {label}
                </li>
              ))}
            </ol>
            <div className="profit-sidebar-bottom">
              <p>{t.noHidden}</p>
              <p>{t.assumptionsSeparate}</p>
              <button type="button" className="profit-text-button" onClick={loadExample}>
                <FlaskConical size={15} /> {t.loadExample}
              </button>
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
            <h2 ref={titleRef} tabIndex={-1}>
              {step === 0 ? t.start : step === 1 ? spec.question : t.decisions}
            </h2>
            {example && (
              <p className="profit-example" role="status">
                {step === 2 ? t.exampleResult : t.exampleInput}
              </p>
            )}

            {step === 0 && (
              <form onSubmit={(event) => { event.preventDefault(); if (locationValid) { setActiveArea(objective); go(1); } }}>
                <div className="profit-fields">
                  <label>{t.businessType}
                    <select value={profile} onChange={(event) => setProfile(event.target.value)}>
                      {t.profiles.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>{t.locations}
                    <input type="number" min="1" max="1000" step="1" value={locations} onChange={(event) => setLocations(event.target.value)} aria-invalid={locationValid ? undefined : true} required />
                  </label>
                  <label>{t.references}
                    <select value={references} onChange={(event) => setReferences(event.target.value)}>
                      {t.referenceOptions.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>{t.currency}
                    <select value={currency} onChange={(event) => setCurrency(event.target.value as ProfitabilityCurrency)}>
                      <option value="EUR">EUR · Euro</option>
                      <option value="USD">{t.usd}</option>
                      <option value="GBP">{t.gbp}</option>
                    </select>
                  </label>
                </div>
                <fieldset className="profit-objectives">
                  <legend>{t.objective}</legend>
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return (
                      <label key={area}>
                        <input type="radio" name="objective" checked={objective === area} onChange={() => setObjective(area)} />
                        <Icon size={18} aria-hidden="true" />
                        <span>{areaSpecs[area].title}</span>
                      </label>
                    );
                  })}
                </fieldset>
                <div className="profit-form-footer">
                  <span>{t.beforeContact}</span>
                  <button className="profit-primary" type="submit">{t.continue} <ArrowRight size={18} /></button>
                </div>
              </form>
            )}

            {step === 1 && (
              <>
                <div role="group" aria-label={t.areaLabel} className="profit-tabs">
                  {areaKeys.map((area) => (
                    <button type="button" key={area} aria-pressed={activeArea === area} onClick={() => setActiveArea(area)}>
                      {areaSpecs[area].title}
                      {diagnosis.results[area] && <Check size={14} aria-label={t.complete} />}
                    </button>
                  ))}
                </div>
                <p className="profit-basis">{t.basis(profile, locations, currency)}</p>
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
                          placeholder={t.noData}
                          aria-invalid={diagnosis.errors[field.key] ? true : undefined}
                          aria-describedby={diagnosis.errors[field.key] ? `${field.key}-error` : undefined}
                        />
                        <span>{field.unit === "money" ? currency : field.unit === "percent" ? "%" : field.unit === "hours" ? t.hoursUnit : t.unitsUnit}</span>
                      </div>
                      <button type="button" className="profit-unknown" onClick={() => setAnswers((current) => ({ ...current, [field.key]: "" }))}>
                        {t.unknown}<span className="sr-only">: {field.label}</span>
                      </button>
                      {diagnosis.errors[field.key] && <p className="profit-error" id={`${field.key}-error`}>{errorText(diagnosis.errors[field.key])}</p>}
                    </div>
                  ))}
                </div>
                <details className="profit-formula">
                  <summary>{t.formulaSummary}</summary>
                  <p><strong>{t.formula}</strong> {spec.formula}</p>
                  <p>{t.formulaNote}</p>
                </details>
                {Object.keys(diagnosis.errors).length > 0 && <p role="alert" className="profit-error">{t.reviewValues}</p>}
                <div className="profit-form-footer">
                  <button type="button" className="profit-text-button" onClick={() => go(0)}><ArrowLeft size={17} /> {t.back}</button>
                  <button type="button" className="profit-primary" disabled={Object.keys(diagnosis.errors).length > 0} onClick={() => go(2)}>{t.viewDiagnosis} <ArrowRight size={18} /></button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="profit-basis">{t.coverage(diagnosis.coverage, currency, locations)}</p>
                <div className="profit-results">
                  {areaKeys.map((area) => {
                    const Icon = icons[area];
                    return (
                      <article className="profit-result" key={area}>
                        <Icon size={20} aria-hidden="true" />
                        <h3>{resultLabels[area]}</h3>
                        <strong>{range(area)}</strong>
                        <span>{t.resultSuffix(area)}</span>
                        {area === "margin" && diagnosis.results.margin && diagnosis.results.margin.low < 0 && <p className="profit-error">{t.negative}</p>}
                        <details className="profit-result-formula">
                          <summary>{t.how}</summary>
                          <p>{areaSpecs[area].formula}</p>
                        </details>
                        <button type="button" className="profit-text-button" onClick={() => { setActiveArea(area); go(1); }}>
                          {diagnosis.results[area] ? t.review : t.completeData} <ArrowRight size={14} />
                        </button>
                      </article>
                    );
                  })}
                </div>
                <p className="profit-disclaimer">{t.disclaimer}</p>
                <ol className="profit-actions">
                  {prioritizeProfitabilityAreas(objective).map((area, index) => (
                    <li key={area}>
                      <span>0{index + 1}</span>
                      <div>
                        <h3>{areaSpecs[area].action}</h3>
                        <p>{diagnosis.results[area] ? t.contrast : t.gather}</p>
                      </div>
                      <Link to={localePath(areaSpecs[area].route)} aria-label={areaSpecs[area].action}><ArrowRight size={22} /></Link>
                    </li>
                  ))}
                </ol>
                <div className="profit-report-actions">
                  <button type="button" className="profit-primary" onClick={download}><Download size={17} /> {t.download}</button>
                  <Link className="profit-secondary-link" to={localePath("/demo")}>{t.demo} <ArrowRight size={16} /></Link>
                </div>
                <button type="button" className="profit-text-button profit-back" onClick={() => go(1)}><ArrowLeft size={16} /> {t.edit}</button>
              </>
            )}
          </div>
        </section>

        <section className="profit-product">
          <div>
            <p className="profit-eyebrow">{t.productEyebrow}</p>
            <h2>{t.productTitle}</h2>
            <p>{t.productText}</p>
            <Link to={localePath("/funcionalidades")}>{t.explore} <ArrowRight size={17} /></Link>
          </div>
          <figure>
            <img src={productImage} alt={t.imageAlt} width="1324" height="928" loading="lazy" />
            <figcaption>{t.imageCaption}</figcaption>
          </figure>
        </section>
      </main>

      <footer className="profit-footer">
        <span>{t.footer}</span>
        <span>{t.localFooter(diagnosis.modelVersion)}</span>
      </footer>
    </div>
  );
}
