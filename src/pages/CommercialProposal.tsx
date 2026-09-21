import { useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  COMMERCIAL_AGORA_SCOPE,
  COMMERCIAL_CAPACITY_INTRO,
  COMMERCIAL_DOCUMENT_EXAMPLES,
  COMMERCIAL_EXPANSION_MESSAGE,
  COMMERCIAL_EXPANSION_RULES,
  COMMERCIAL_FEATURES,
  COMMERCIAL_INCLUDED_CAPACITY,
  COMMERCIAL_IMPLEMENTATION,
  COMMERCIAL_OFFER,
  COMMERCIAL_PAYMENT_LINKS,
  COMMERCIAL_PRICING,
  COMMERCIAL_REVO_PRICING,
  COMMERCIAL_REVO_SCOPE,
  COMMERCIAL_REVO_SELECTION,
  COMMERCIAL_SELECTION,
  COMMERCIAL_SAVIA_USAGE,
  COMMERCIAL_SPEND_CONTROLS,
  COMMERCIAL_TERMS,
  COMMERCIAL_TOP_UPS,
  COMMERCIAL_USAGE_EQUIVALENCE,
  COMMERCIAL_RECONCILIATION_USAGE,
  GENERIC_PROPOSAL_ROUTE,
  REVO_PROPOSAL_ROUTE,
} from "@/data/commercialProposal";
import PresentationLegacy from "./PresentationLegacy";
import "./CommercialProposal.css";

const COMMERCIAL_TOTAL_SLIDES = 34;
const COMMERCIAL_MEDIA_ROOT = "/commercial-assets/product-proof";

type ProposalAudience = {
  canonicalPath: string;
  clientLabel: string;
};

type IntegrationProposal = "agora" | "revo";

type IntegrationConfig = {
  name: string;
  canonicalPath: string;
  documentTitle: string;
  pdfFilename: string;
  scope: ReadonlyArray<readonly string[]>;
  pricing: ReadonlyArray<readonly string[]>;
  pricingExplanation: string;
  selectionRule: React.ReactNode;
  showProviderMonitor: boolean;
};

const INTEGRATION_CONFIG: Record<IntegrationProposal, IntegrationConfig> = {
  agora: {
    name: "Ágora",
    canonicalPath: GENERIC_PROPOSAL_ROUTE,
    documentTitle: "Propuesta comercial",
    pdfFilename: "winerim-propuesta-comercial",
    scope: COMMERCIAL_AGORA_SCOPE,
    pricing: COMMERCIAL_PRICING,
    pricingExplanation: "Doce mensualidades suman 2.100 € por servicio frente a 1.500 € anuales. Para ambos, 4.200 € frente a 3.000 €. Los importes se incrementarán con el IVA aplicable.",
    selectionRule: <><strong>Una única periodicidad:</strong> si se contratan ambos servicios, los dos deben seleccionarse en la misma modalidad, ambos mensuales o ambos anuales anticipados.</>,
    showProviderMonitor: true,
  },
  revo: {
    name: "REVO",
    canonicalPath: REVO_PROPOSAL_ROUTE,
    documentTitle: "Propuesta comercial REVO",
    pdfFilename: "winerim-propuesta-comercial-revo",
    scope: COMMERCIAL_REVO_SCOPE,
    pricing: COMMERCIAL_REVO_PRICING,
    pricingExplanation: "Doce mensualidades suman 2.100 € por servicio frente a 1.500 € anuales. Para ambos, 4.200 € frente a 3.000 €. Los importes se incrementarán con el IVA aplicable.",
    selectionRule: <><strong>Una única periodicidad:</strong> si se contratan ambos servicios, los dos deben seleccionarse en la misma modalidad, ambos mensuales o ambos anuales anticipados.</>,
    showProviderMonitor: false,
  },
};

const ProposalHeader = ({
  page,
  section,
  audience,
}: {
  page: number;
  section: string;
  audience: ProposalAudience;
}) => (
  <div
    className="commercial-proposal-header"
    aria-label={`${audience.clientLabel}, página ${page} de ${COMMERCIAL_TOTAL_SLIDES}`}
  >
    <span>{section}</span>
    <span>{page} / {COMMERCIAL_TOTAL_SLIDES}</span>
  </div>
);

const DataTable = ({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: readonly string[];
  rows: ReadonlyArray<readonly string[]>;
}) => (
  <div className="commercial-table-wrap">
    <table className="commercial-table">
      <caption>{caption}</caption>
      <thead>
        <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${row[0]}-${rowIndex}`}>
            {row.map((cell, cellIndex) => cellIndex === 0
              ? <th scope="row" data-label={headers[cellIndex]} key={cellIndex}>{cell}</th>
              : <td data-label={headers[cellIndex]} key={cellIndex}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="commercial-title">{children}</h2>
);

const CommercialHeader = ({ page, audience }: { page: number; audience: ProposalAudience }) => (
  <div
    className="commercial-commercial-header"
    aria-label={`Presentación comercial, página ${page} de ${COMMERCIAL_TOTAL_SLIDES}`}
  >
    <span>Winerim · Presentación comercial</span>
    <span>{page} / {COMMERCIAL_TOTAL_SLIDES}</span>
  </div>
);

const ProductShot = ({
  file,
  alt,
  caption,
  fit = "crop",
  priority = false,
}: {
  file: string;
  alt: string;
  caption: string;
  fit?: "crop" | "contain" | "wide";
  priority?: boolean;
}) => {
  const src = `${COMMERCIAL_MEDIA_ROOT}/${file}`;
  return (
    <figure className={`commercial-product-shot commercial-product-shot-${fit}`}>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Ampliar captura: ${caption}`}>
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

type ServiceChoice = "none" | "monthly" | "annual" | "";

const ServiceSelectionTable = ({ selection }: { selection: ReadonlyArray<readonly string[]> }) => {
  const [choices, setChoices] = useState<ServiceChoice[]>(["", ""]);

  const select = (serviceIndex: number, choice: ServiceChoice) => {
    setChoices((current) => {
      const next = [...current];
      const otherIndex = serviceIndex === 0 ? 1 : 0;
      next[serviceIndex] = choice;
      if (
        (choice === "monthly" || choice === "annual")
        && (current[otherIndex] === "monthly" || current[otherIndex] === "annual")
      ) {
        next[otherIndex] = choice;
      }
      return next;
    });
  };

  const [winerimChoice, integrationChoice] = choices;
  const selectionComplete = Boolean(winerimChoice && integrationChoice);
  const payment = (() => {
    if (!selectionComplete || (winerimChoice === "none" && integrationChoice === "none")) return null;
    if (winerimChoice === "monthly" && integrationChoice === "monthly") return COMMERCIAL_PAYMENT_LINKS.monthly.both;
    if (winerimChoice === "annual" && integrationChoice === "annual") return COMMERCIAL_PAYMENT_LINKS.annual.both;
    if (winerimChoice === "monthly" && integrationChoice === "none") return COMMERCIAL_PAYMENT_LINKS.monthly.winerim;
    if (winerimChoice === "annual" && integrationChoice === "none") return COMMERCIAL_PAYMENT_LINKS.annual.winerim;
    if (winerimChoice === "none" && integrationChoice === "monthly") return COMMERCIAL_PAYMENT_LINKS.monthly.integration;
    if (winerimChoice === "none" && integrationChoice === "annual") return COMMERCIAL_PAYMENT_LINKS.annual.integration;
    return null;
  })();

  return (
    <div className="commercial-table-wrap">
      <table className="commercial-table commercial-selection-table">
        <caption>Selección contractual</caption>
        <thead>
          <tr><th scope="col">Servicio</th><th scope="col">No contratar</th><th scope="col">Mensual</th><th scope="col">Anual anticipado</th></tr>
        </thead>
        <tbody>
          {selection.map(([service, monthly, annual], serviceIndex) => {
            const group = `proposal-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <tr key={service}>
                <th scope="row" data-label="Servicio">{service}</th>
                <td data-label="No contratar">
                  <label><input data-pdf-field type="radio" name={group} value="none" checked={choices[serviceIndex] === "none"} onChange={() => select(serviceIndex, "none")} /> No contratar</label>
                </td>
                <td data-label="Mensual">
                  <label><input data-pdf-field type="radio" name={group} value="monthly" checked={choices[serviceIndex] === "monthly"} onChange={() => select(serviceIndex, "monthly")} /> {monthly}</label>
                </td>
                <td data-label="Anual anticipado">
                  <label><input data-pdf-field type="radio" name={group} value="annual" checked={choices[serviceIndex] === "annual"} onChange={() => select(serviceIndex, "annual")} /> {annual}</label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className={`commercial-payment-result${payment ? " is-ready" : ""}`} aria-live="polite">
        <h3>Pago correspondiente</h3>
        {!selectionComplete && <p>Completa las dos filas para mostrar el enlace de pago correcto.</p>}
        {selectionComplete && !payment && <p>No se ha seleccionado ningún servicio.</p>}
        {payment && (
          <a href={payment.href} target="_blank" rel="noreferrer" data-pdf-link>
            <span>{payment.label}</span>
            <ExternalLink aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
        )}
      </section>
      <section className="commercial-pdf-payment-links" aria-label="Enlaces de pago incluidos en el PDF">
        <h3>Enlaces de pago</h3>
        <p>Después de marcar la modalidad, utiliza el enlace que corresponda a la selección.</p>
        <div>
          {Object.values(COMMERCIAL_PAYMENT_LINKS).flatMap((period) => Object.values(period)).map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" data-pdf-link>{item.label}</a>
          ))}
        </div>
      </section>
    </div>
  );
};

const buildCommercialSections = (audience: ProposalAudience, config: IntegrationConfig) => [
  {
    label: "Integración TPV y trazabilidad",
    bg: "dark" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-dark">
        <CommercialHeader page={14} audience={audience} />
        <div className="commercial-commercial-copy">
          <p className="commercial-commercial-kicker">Integración con {config.name}</p>
          <h2>Conexión controlada y trazabilidad verificable</h2>
          <p>Winerim permite revisar el estado de la conexión y comprobar cómo se vinculan catálogo, formatos, precios y referencias. La frecuencia y el alcance dependen de los accesos, el piloto y el readback validados.</p>
        </div>
        {!config.showProviderMonitor ? (
          <div className="commercial-product-single">
            <ProductShot
              file="07-trazabilidad-vino-tpv.png"
              alt="Auditoría de catálogo que compara referencias, formatos y precios entre Winerim y el TPV"
              caption="Trazabilidad por referencia preparada para el piloto con REVO XEF."
              fit="wide"
              priority
            />
          </div>
        ) : (
          <div className="commercial-product-stack">
            <ProductShot
              file="08-monitor-tpv-anonimizado.png"
              alt="Monitor anonimizado de conexiones TPV con última sincronización, colas y alertas"
              caption="Monitor de sincronización anonimizado: conexiones, colas e incidencias visibles."
              fit="contain"
              priority
            />
            <ProductShot
              file="07-trazabilidad-vino-tpv.png"
              alt="Auditoría de catálogo que compara referencias, formatos y precios entre Winerim y el TPV"
              caption="Trazabilidad por referencia entre Winerim y Ágora."
              fit="wide"
            />
          </div>
        )}
      </article>
    ),
  },
  {
    label: "Ventas y análisis del servicio",
    bg: "dark" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-dark">
        <CommercialHeader page={17} audience={audience} />
        <div className="commercial-commercial-copy">
          <p className="commercial-commercial-kicker">Ventas conectadas</p>
          <h2>Cada venta alimenta la siguiente decisión</h2>
          <p>Las ventas por botella y por copa quedan vinculadas a la referencia correcta. El equipo puede revisar el servicio, localizar una operación concreta y exportar el histórico.</p>
        </div>
        <div className="commercial-product-stage">
          <ProductShot
            file="02-analisis-ventas.png"
            alt="Análisis del servicio con botellas, copas, facturación, ritmo y franjas horarias"
            caption="Análisis del servicio: botellas, copas, facturación y ritmo de venta."
            priority
          />
          <div className="commercial-product-rail">
            <ProductShot
              file="01-ventas-dashboard.png"
              alt="Historial de ventas con filtros, indicadores y detalle por referencia"
              caption="Historial operativo y filtros de venta."
              fit="wide"
            />
            <ProductShot
              file="06-detalle-venta-winerim.png"
              alt="Detalle de una venta por copa con fechas, unidades e importe"
              caption="Detalle de una venta por copa trazada."
              fit="contain"
            />
          </div>
        </div>
      </article>
    ),
  },
  {
    label: "Stock, margen y capital",
    bg: "dark" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-dark">
        <CommercialHeader page={18} audience={audience} />
        <div className="commercial-commercial-copy">
          <p className="commercial-commercial-kicker">Rentabilidad de bodega</p>
          <h2>Del stock registrado al margen y al capital inmovilizado</h2>
          <p>Una misma lectura reúne valoración, margen, rotación y referencias sin movimiento. Los resultados dependen de costes, ventas y existencias correctamente mantenidos.</p>
        </div>
        <div className="commercial-product-stage">
          <ProductShot
            file="05-dashboard-margenes.png"
            alt="Dashboard de salud de la carta con indicadores de margen, rotación, pricing y stock"
            caption="Dashboard de márgenes y alertas de salud de la carta."
            priority
          />
          <div className="commercial-product-rail">
            <ProductShot
              file="03-valoracion-stock.png"
              alt="Valoración de inventario con capital, valor en carta, margen y detalle por referencia"
              caption="Valoración de stock por referencia."
              fit="wide"
            />
            <ProductShot
              file="04-capital-dormido.png"
              alt="Análisis de capital dormido con referencias de baja rotación y valor inmovilizado"
              caption="Capital inmovilizado y referencias sin movimiento."
              fit="wide"
            />
          </div>
        </div>
      </article>
    ),
  },
  {
    label: "SAVia prepara la acción",
    bg: "wine" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-wine">
        <CommercialHeader page={20} audience={audience} />
        <div className="commercial-commercial-copy commercial-commercial-copy-inline">
          <div>
            <p className="commercial-commercial-kicker">SAVia</p>
            <h2>Una propuesta semanal razonada para que el equipo decida</h2>
          </div>
          <p>SAVia cruza carta, ventas, stock, rotación y disponibilidad para preparar una recomendación de pedido. Funciona en solo lectura: no aplica cambios ni envía pedidos sin revisión y aprobación humana.</p>
        </div>
        <div className="commercial-product-single">
          <ProductShot
            file="15-savia-pedido-semanal.png"
            alt="SAVia mostrando una propuesta de pedido semanal organizada por tipos de vino y basada en stock y rotación"
            caption="Ejemplo operativo anonimizado: propuesta de pedido preparada para revisión."
            fit="contain"
            priority
          />
        </div>
      </article>
    ),
  },
  {
    label: "Control de mermas",
    bg: "dark" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-dark">
        <CommercialHeader page={21} audience={audience} />
        <div className="commercial-commercial-copy">
          <p className="commercial-commercial-kicker">Prototipo funcional</p>
          <h2>Menos conteos generales y más control donde hay riesgo</h2>
          <p>El prototipo cruza ventas, consumo teórico, stock y eventos declarados para señalar excepciones y orientar el recuento. El inventario físico sigue siendo necesario para cerrar diferencias.</p>
        </div>
        <div className="commercial-product-stage commercial-product-stage-portrait">
          <ProductShot
            file="13-mermas-inventario-dirigido.png"
            alt="Prototipo funcional de inventario dirigido con puente de stock por referencia"
            caption="Inventario dirigido a referencias con riesgo o discrepancia."
            fit="contain"
            priority
          />
          <div className="commercial-product-rail">
            <ProductShot
              file="12-mermas-hoy-sala.png"
              alt="Prototipo funcional de control diario de botellas abiertas y mermas"
              caption="Excepciones para revisar hoy en sala."
              fit="contain"
            />
            <ProductShot
              file="14-mermas-cierre-turno.png"
              alt="Prototipo funcional de cierre de turno con comprobaciones por referencia"
              caption="Cierre guiado y registro de diferencias."
              fit="contain"
            />
          </div>
        </div>
      </article>
    ),
  },
  {
    label: "Armonías y servicio",
    bg: "dark" as const,
    content: (
      <article className="commercial-commercial-slide commercial-commercial-slide-dark">
        <CommercialHeader page={9} audience={audience} />
        <div className="commercial-commercial-copy">
          <p className="commercial-commercial-kicker">Armonías de vino</p>
          <h2>De la configuración económica al seguimiento del servicio</h2>
          <p>Winerim permite definir composición, precio, coste y margen, y registrar desviaciones durante el servicio. Las configuraciones mostradas permanecen inactivas hasta completar la prueba controlada, el PLU y el readback.</p>
        </div>
        <div className="commercial-product-stage">
          <ProductShot
            file="09-armonias-listado.png"
            alt="Listado de armonías de vino con ganancia, coste e indicación de estado inactivo"
            caption="Armonías preparadas con lectura económica y estado visible."
            priority
          />
          <div className="commercial-product-rail">
            <ProductShot
              file="10-armonia-editor.png"
              alt="Editor de armonía con tipo de venta, modelo de precio y tipo de receta"
              caption="Configuración de precio, receta y composición."
              fit="wide"
            />
            <ProductShot
              file="11-armonia-servicio.png"
              alt="Vista de servicio de una armonía con margen, coste y vinos de la receta"
              caption="Seguimiento operativo del servicio."
              fit="wide"
            />
          </div>
        </div>
      </article>
    ),
  },
];

const buildProposalSections = (audience: ProposalAudience, config: IntegrationConfig) => [
  {
    label: "Propuesta comercial Winerim",
    content: (
      <article className="commercial-proposal commercial-cover">
        <ProposalHeader page={25} section="Propuesta comercial y condiciones" audience={audience} />
        <p className="commercial-kicker">Winerim</p>
        <Title>Carta de vinos, inteligencia operativa e integración con {config.name}</Title>
        <p className="commercial-lead">La propuesta convierte el relato anterior en un alcance concreto para un establecimiento, con precios y límites expresos. El cliente puede contratar Winerim, la integración con {config.name} o ambos.</p>
        <div className="commercial-provider">
          <h3>Proveedor</h3>
          <p><strong>{COMMERCIAL_OFFER.provider} · CIF {COMMERCIAL_OFFER.providerCif}</strong></p>
          <p>{COMMERCIAL_OFFER.providerAddress}</p>
        </div>
        <p className="commercial-date">{COMMERCIAL_OFFER.date}</p>
      </article>
    ),
  },
  {
    label: "Propuesta comercial · Alcance",
    content: (
      <article className="commercial-proposal commercial-dense commercial-scope-page">
        <ProposalHeader page={26} section="Alcance de la propuesta" audience={audience} />
        <Title>Alcance de la propuesta</Title>
        <p className="commercial-lead">La licencia y los precios se refieren a un establecimiento. Winerim aporta herramientas y contexto para que el equipo decida con mejores datos, sin garantizar resultados económicos concretos.</p>
        <div className="commercial-scope-feature-list" aria-label="Funcionalidades incluidas en el alcance">
          {COMMERCIAL_FEATURES.map(([title, body]) => (
            <section key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </section>
          ))}
        </div>
        <p className="commercial-note">Carta Architect y el panel de grupos son capacidades productivas. Su activación y la profundidad analítica dependen del alcance contratado, los datos, los permisos y las conexiones validadas. No se incluye desarrollo a medida salvo acuerdo escrito.</p>
      </article>
    ),
  },
  {
    label: "Capacidad incluida",
    content: (
      <article className="commercial-proposal commercial-capacity-page">
        <ProposalHeader page={27} section="Capacidad incluida para la operativa diaria" audience={audience} />
        <Title>Capacidad incluida para la operativa diaria</Title>
        <p className="commercial-capacity-intro">{COMMERCIAL_CAPACITY_INTRO}</p>
        <div className="commercial-capacity-grid">
          {COMMERCIAL_INCLUDED_CAPACITY.map(([title, amount, body]) => (
            <section key={title}>
              <p className="commercial-capacity-amount">{amount}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </section>
          ))}
        </div>
        <section className="commercial-usage-equivalence">
          <h3>Equivalencia orientativa de uso</h3>
          <p>{COMMERCIAL_USAGE_EQUIVALENCE}</p>
          <small>La equivalencia no constituye una garantía rígida: los documentos extensos y los análisis complejos pueden consumir más de una unidad.</small>
        </section>
        <p className="commercial-note">Las bolsas se renuevan cada mes natural, también en contratos anuales, y no se acumulan. Procesamiento y almacenamiento son conceptos diferentes.</p>
      </article>
    ),
  },
  {
    label: "Control del gasto y ampliaciones",
    content: (
      <article className="commercial-proposal commercial-dense commercial-assurance-expansion-page">
        <ProposalHeader page={28} section="Control del gasto y ampliaciones opcionales" audience={audience} />
        <p className="commercial-assurance-kicker">Sin sorpresas en la factura</p>
        <Title>El consumo adicional siempre requiere una decisión</Title>
        <p className="commercial-assurance-statement">Winerim avisa antes de alcanzar los límites y nunca activa ni factura una ampliación sin aceptación previa.</p>
        <div className="commercial-spend-grid commercial-spend-grid-compact">
          {COMMERCIAL_SPEND_CONTROLS.map(([title, body]) => (
            <section key={title}><h3>{title}</h3><p>{body}</p></section>
          ))}
        </div>
        <section className="commercial-top-up-secondary" aria-label="Ampliaciones opcionales">
          <h3>Ampliaciones para picos puntuales</h3>
          <p>{COMMERCIAL_EXPANSION_MESSAGE}</p>
          <DataTable caption="Precios por establecimiento" headers={["Ampliación", "Capacidad", "Precio"]} rows={COMMERCIAL_TOP_UPS} />
          <p className="commercial-pack-saving"><strong>Pack completo:</strong> ahorro de 18 € frente a las tres ampliaciones por separado.</p>
          <div className="commercial-expansion-rules" aria-label="Facturación de ampliaciones">
            {COMMERCIAL_EXPANSION_RULES.map(([title, body]) => (
              <section key={title}><h4>{title}</h4><p>{body}</p></section>
            ))}
          </div>
        </section>
      </article>
    ),
  },
  {
    label: "Reglas de consumo",
    content: (
      <article className="commercial-proposal commercial-dense commercial-fine-print-page">
        <ProposalHeader page={29} section="Reglas de consumo" audience={audience} />
        <Title>Cómo se computa el uso</Title>
        <p className="commercial-fine-print-intro">Detalle operativo aplicable a las bolsas incluidas y a las ampliaciones.</p>
        <div className="commercial-usage-detail-grid">
          <section className="commercial-document-usage">
            <h3>CloudRIM y documentos</h3>
            <div className="commercial-formula" aria-label="Fórmula de créditos documentales">
              <span>Créditos consumidos</span>
              <strong>máximo entre ⌈páginas ÷ 5⌉ y ⌈líneas ÷ 250⌉</strong>
            </div>
            <DataTable caption="Ejemplos" headers={["Documento", "Tamaño", "Consumo"]} rows={COMMERCIAL_DOCUMENT_EXAMPLES} />
            <p><strong>100 créditos</strong> pueden equivaler a 100 documentos pequeños, 50 documentos de 6 a 10 páginas o una combinación equivalente.</p>
          </section>
          <section>
            <DataTable caption="Consumo de SAVia" headers={["Operación", "Consumo"]} rows={COMMERCIAL_SAVIA_USAGE} />
            <p>Antes de ejecutar una consulta superior a un crédito, SAVia muestra el consumo estimado. Errores técnicos, negativas de seguridad y preguntas aclaratorias no consumen.</p>
          </section>
          <section>
            <DataTable caption="Consumo de conciliaciones" headers={["Regla", "Aplicación"]} rows={COMMERCIAL_RECONCILIATION_USAGE} />
            <p>Repeticiones sin cambios y reintentos de Winerim no consumen otra unidad. La conciliación prepara diferencias; no sustituye la revisión contable.</p>
          </section>
        </div>
        <p className="commercial-fine-print-note"><strong>Sin doble consumo.</strong> La conciliación no vuelve a consumir créditos documentales y SAVia no vuelve a cobrar el procesamiento ni la conciliación. Tampoco consumen los duplicados exactos detectados antes del procesamiento, los reintentos de Winerim ni los fallos sin resultado utilizable. Solo se procesa documentación operativa relacionada con el vino. Los documentos ilegibles o manuscritos, la revisión humana excepcional y los trabajos especiales quedan fuera del alcance ordinario.</p>
      </article>
    ),
  },
  {
    label: `Integración ${config.name}`,
    content: (
      <article className="commercial-proposal commercial-dense">
        <ProposalHeader page={30} section={`Integración ${config.name}`} audience={audience} />
        <Title>Perímetro técnico y puesta en marcha</Title>
        <DataTable caption="Perímetro de la integración" headers={["Bloque", "Condición"]} rows={config.scope} />
        <div className="commercial-steps" aria-label="Secuencia de puesta en marcha">
          {COMMERCIAL_IMPLEMENTATION.map(([number, text]) => (
            <div key={number}><span>{number}</span><strong>{text}</strong></div>
          ))}
        </div>
      </article>
    ),
  },
  {
    label: "Inversión",
    content: (
      <article className="commercial-proposal">
        <ProposalHeader page={31} section="Inversión" audience={audience} />
        <Title>Opciones económicas por establecimiento</Title>
        <DataTable caption="Precios por establecimiento" headers={["Servicio", "Mensual", "Anual anticipado", "Equivalente anual", "Ahorro anual"]} rows={config.pricing} />
        <section className="commercial-emphasis">
          <h3>Cálculo del ahorro</h3>
          <p>{config.pricingExplanation}</p>
        </section>
        <p className="commercial-note">No se incluye ningún coste adicional salvo que ambas partes lo acuerden por escrito.</p>
      </article>
    ),
  },
  {
    label: "Condiciones",
    content: (
      <article className="commercial-proposal commercial-dense">
        <ProposalHeader page={32} section="Condiciones" audience={audience} />
        <Title>Condiciones esenciales y validez</Title>
        <DataTable caption="Condiciones esenciales" headers={["Bloque", "Condición"]} rows={COMMERCIAL_TERMS} />
        <div className="commercial-conditions-footer">
          <p><strong>Validez y aceptación.</strong> Oferta válida hasta: ____ / ____ / ______. La aceptación requiere completar los datos del cliente, seleccionar la modalidad de cada servicio y firmar la propuesta.</p>
          <p>Las capacidades beta o early access mantendrán los límites y salvaguardas descritos en esta propuesta.</p>
        </div>
      </article>
    ),
  },
  {
    label: "Selección contractual",
    content: (
      <article className="commercial-proposal commercial-dense commercial-signature-page">
        <ProposalHeader page={33} section="Selección contractual" audience={audience} />
        <Title>Selecciona la modalidad de cada servicio</Title>
        <p className="commercial-lead">Marca una opción para Winerim y otra para la integración con {config.name}.</p>
        <p className="commercial-selection-rule">{config.selectionRule}</p>
        <ServiceSelectionTable selection={config.name === "REVO" ? COMMERCIAL_REVO_SELECTION : COMMERCIAL_SELECTION} />
        <p className="commercial-note">No se contrata ninguna ampliación al inicio. Si más adelante existe un pico puntual, el cliente podrá solicitarla y aceptarla expresamente.</p>
      </article>
    ),
  },
  {
    label: "Datos del cliente",
    content: (
      <article className="commercial-proposal commercial-dense commercial-signature-page">
        <ProposalHeader page={34} section="Datos del cliente" audience={audience} />
        <Title>Datos del cliente y aceptación</Title>
        <section className="commercial-client-fields">
          <h3>Datos del cliente</h3>
          <p>Razón social: ____________________________________ &nbsp; CIF: ____________________</p>
          <p>Domicilio: ____________________________________________________________________</p>
          <p>Representante: ___________________________________ &nbsp; Cargo: ____________________</p>
          <p>Fecha: __________________________________________ &nbsp; Firma: ____________________</p>
        </section>
        <section className="commercial-provider-reference">
          <h3>Proveedor</h3>
          <p><strong>{COMMERCIAL_OFFER.provider} · Winerim · CIF {COMMERCIAL_OFFER.providerCif}</strong></p>
          <p>{COMMERCIAL_OFFER.providerAddress}</p>
        </section>
        <p className="commercial-pending">La firma acepta únicamente los servicios, modalidad e importes marcados en la página anterior, junto con las condiciones de esta propuesta.</p>
      </article>
    ),
  },
];

export function CommercialProposalPresentation({ integration = "agora" }: { integration?: IntegrationProposal }) {
  const config = INTEGRATION_CONFIG[integration];
  const audience: ProposalAudience = {
    canonicalPath: config.canonicalPath,
    clientLabel: `Propuesta comercial ${config.name}`,
  };
  const commercialSections = buildCommercialSections(audience, config);
  const commercialOverrides = {
    experience: commercialSections[5],
    connectedFlow: commercialSections[0],
    marginsOverview: commercialSections[1],
    marginsOutcomes: commercialSections[2],
    savia: commercialSections[3],
    supply: commercialSections[4],
  };
  const proposalSections = buildProposalSections(audience, config);

  return (
    <PresentationLegacy
      variant="current"
      canonicalPath={audience.canonicalPath}
      documentTitle={config.documentTitle}
      pdfFilename={config.pdfFilename}
      noindex
      suppressTracking
      slideOverrides={commercialOverrides}
      slideLabelOverrides={{
        9: "Armonías y servicio",
        14: "Integración TPV y trazabilidad",
        17: "Ventas y análisis del servicio",
        18: "Stock, margen y capital",
        20: "SAVia prepara la acción",
        21: "Control de mermas",
      }}
      appendices={proposalSections}
    />
  );
}

export default function CommercialProposal() {
  return <CommercialProposalPresentation />;
}
