import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import {
  ArrowRight,
  BarChart3,
  Cable,
  Check,
  Crown,
  FileStack,
  Info,
  Sparkles,
  Wine,
} from "lucide-react";
import { Link } from "react-router-dom";

const MODULES = [
  {
    name: "Core",
    annual: "99 €/mes",
    monthly: "150 €/mes",
    icon: Wine,
    accent: "text-wine",
    bg: "bg-wine/[0.04]",
    border: "border-wine/25",
    label: "Base operativa",
    badge: "Punto de partida",
    description: "Convierte la carta en una herramienta viva para el cliente y en una base de trabajo ordenada para el equipo.",
    features: [
      "Carta digital por QR, siempre actualizada",
      "Panel para editar vinos, precios, formatos y disponibilidad",
      "Fichas de vino enriquecidas y buscador avanzado",
      "Filtros por tipo, región, precio, estilo y maridaje",
      "Recomendaciones y navegación pensadas para vender mejor",
      "Base operativa para conectar el resto de módulos",
    ],
    bestFor: "Restaurantes que quieren dejar atrás el PDF y gestionar su carta desde un único lugar.",
    link: "/producto/winerim-core",
    linkLabel: "Ver Winerim Core",
  },
  {
    name: "TPV",
    annual: "75 €/mes",
    monthly: "99 €/mes",
    icon: Cable,
    accent: "text-sky-400",
    bg: "bg-sky-500/[0.045]",
    border: "border-sky-500/25",
    label: "Integración de ventas",
    description: "Conecta lo que se vende en sala con la carta para medir rendimiento real, sin reconstruir datos a mano.",
    features: [
      "Conexión y mapeo de referencias con el TPV",
      "Importación automática de ventas por vino",
      "Lectura de unidades, ingresos y ticket medio",
      "Análisis de rotación por periodo y servicio",
      "Cruce de ventas con carta, formatos y precios",
      "Validación inicial del flujo y calidad de los datos",
    ],
    bestFor: "Negocios que quieren saber qué vinos se venden de verdad y mantener ventas y carta conectadas.",
    link: "/integraciones",
    linkLabel: "Ver integraciones TPV",
  },
  {
    name: "Gestión",
    annual: "179 €/mes",
    monthly: "220 €/mes",
    icon: FileStack,
    accent: "text-amber-400",
    bg: "bg-amber-500/[0.045]",
    border: "border-amber-500/25",
    label: "Stock, compras y documentos",
    description: "Ordena la operativa de bodega y convierte documentos dispersos en stock, costes y compras utilizables.",
    features: [
      "CloudRIM para recibir información por portal, email, carpeta, FTP/SFTP o API",
      "Lectura y clasificación de albaranes y facturas",
      "Tarifas, distribuidores y precios de compra por referencia",
      "Control de inventario, entradas, salidas y ajustes",
      "Ubicación y organización operativa de la bodega",
      "Seguimiento de compras, reposición y costes",
    ],
    bestFor: "Equipos que gestionan stock, compras y documentos con Excel, correo o procesos manuales.",
    link: "/producto/cloudrim",
    linkLabel: "Ver CloudRIM",
  },
  {
    name: "Márgenes",
    annual: "249 €/mes",
    monthly: "299 €/mes",
    icon: BarChart3,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/[0.04]",
    border: "border-emerald-500/30",
    label: "Rentabilidad",
    description: "Explica dónde se gana, dónde se pierde y qué referencias necesitan una decisión antes de inmovilizar más dinero.",
    features: [
      "Coste y margen real por referencia y formato",
      "Detección de stock dormido y capital inmovilizado",
      "Rotación, cobertura y velocidad de salida",
      "Análisis de precio por botella y por copa",
      "Alertas de fugas de margen por cambios de coste",
      "Simulaciones de precio, surtido y rentabilidad",
    ],
    bestFor: "Dirección, F&B y responsables de vino que necesitan decidir con margen, rotación y stock en la misma vista.",
    link: "/producto/winerim-core",
    linkLabel: "Ver análisis de márgenes",
  },
  {
    name: "Intelligence",
    annual: "349 €/mes",
    monthly: "425 €/mes",
    icon: Sparkles,
    accent: "text-wine-light",
    bg: "bg-wine/[0.055]",
    border: "border-wine/35",
    label: "SAVia y decisión",
    badge: "Incluye RIMs™",
    description: "Permite preguntar a los datos del negocio, entender oportunidades y preparar decisiones con contexto.",
    features: [
      "Inteligencia Dinámica (RIMs™) que convierte señales en propuestas",
      "SAVia, agente conversacional especializado en Winerim",
      "Preguntas sobre carta, ventas, stock, costes y márgenes",
      "Detección de anomalías, riesgos y oportunidades",
      "Explicación del impacto antes de aplicar cambios",
      "Aprobación humana para acciones críticas",
    ],
    bestFor: "Equipos que ya tienen datos y quieren convertirlos en decisiones claras, rápidas y trazables.",
    link: "/producto/savia",
    linkLabel: "Ver SAVia",
  },
  {
    name: "Full / Managed",
    annual: "desde 599 €/mes",
    monthly: "desde 799 €/mes",
    icon: Crown,
    accent: "text-gold",
    bg: "bg-gold/[0.045]",
    border: "border-gold/30",
    label: "Suite gestionada",
    badge: "RIMs™ completos",
    description: "Reúne la plataforma, las integraciones y el acompañamiento necesario para operar Winerim con mayor alcance.",
    features: [
      "Alcance acordado de Core, TPV, Gestión, Márgenes e Intelligence con RIMs™",
      "Configuración multi-local y visión consolidada",
      "Integraciones y flujos de datos avanzados",
      "Onboarding, mapeo y puesta en marcha asistida",
      "Reporting ejecutivo y seguimiento periódico",
      "Acompañamiento operativo adaptado al proyecto",
    ],
    bestFor: "Grupos, hoteles y operaciones complejas que necesitan una implantación coordinada y seguimiento continuo.",
    link: "/demo",
    linkLabel: "Diseñar mi implantación",
  },
];

const MODULE_EXPLANATIONS = [
  {
    name: "Core",
    role: "Base del sistema",
    summary: "Crea la fuente de verdad sobre la carta y la operativa del vino.",
    input: "Carta actual, catálogo, precios, formatos, disponibilidad y estructura de bodega.",
    action: "Ordena y enriquece las referencias, conecta la carta con el stock y mantiene la información operativa en un único entorno.",
    output: "Una carta digital viva y una base común para que el resto de módulos trabaje con datos consistentes.",
    capabilities: "Carta digital · fichas y maridajes · stock · Wine Cellar · Wine Lockers",
  },
  {
    name: "TPV",
    role: "Ventas reales",
    summary: "Conecta lo que ocurre durante el servicio con cada referencia de la carta.",
    input: "Artículos, tickets, unidades e ingresos procedentes del sistema de punto de venta.",
    action: "Mapea las referencias del TPV con los vinos de Winerim e importa las ventas con validación de calidad.",
    output: "Rotación, ticket medio y rendimiento real por vino, formato, periodo y punto de servicio.",
    capabilities: "Conectores TPV · mapeo de referencias · sincronización de ventas · validación",
  },
  {
    name: "Gestión",
    role: "Operativa y documentos",
    summary: "Convierte documentos y movimientos de bodega en información utilizable.",
    input: "Albaranes, facturas, tarifas, pedidos, distribuidores y reportes de stock.",
    action: "CloudRIM recibe y clasifica la información; Gestión la conecta con compras, costes, inventario y reposición.",
    output: "Stock, costes de compra, proveedores y necesidades de reposición con trazabilidad.",
    capabilities: "CloudRIM · inventario · compras · documentos · distribuidores · reposición",
  },
  {
    name: "Márgenes",
    role: "Rentabilidad",
    summary: "Traduce ventas, costes y stock en decisiones económicas por referencia.",
    input: "Coste real, PVP, ventas, formatos, existencias y velocidad de salida.",
    action: "Calcula margen y rotación, detecta fugas, sobrestock, stock dormido y desajustes de precio.",
    output: "Criterio para mantener, revalorizar, mover a copa, retirar, activar o no reponer un vino.",
    capabilities: "Pricing · margen real · stock dormido · vino por copa · simulación · benchmark",
  },
  {
    name: "Intelligence",
    role: "RIMs™ y SAVia",
    summary: "Convierte las señales de todos los módulos en propuestas y explicaciones accionables.",
    input: "Diagnósticos procedentes de Core, TPV, Gestión y Márgenes.",
    action: "Los RIMs™ preparan propuestas; SAVia explica el razonamiento, el impacto y las alternativas.",
    output: "Decisiones priorizadas y trazables, con aprobación humana antes de cualquier acción crítica.",
    capabilities: "Inteligencia Dinámica · RIMs™ · SAVia · alertas · informes · previews",
  },
  {
    name: "Full / Managed",
    role: "Gobierno y acompañamiento",
    summary: "Reúne la plataforma completa para operaciones multi-local o de mayor complejidad.",
    input: "Datos de varios locales, integraciones avanzadas, necesidades de compra y objetivos de dirección.",
    action: "Consolida Core Full, Intelligence, Winerim Supply, flujos de datos y acompañamiento operativo.",
    output: "Gobierno centralizado, reporting ejecutivo, despliegue coordinado y seguimiento continuo.",
    capabilities: "Core Full · RIMs™ · SAVia · Winerim Supply · multi-local · API · reporting",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Precios por módulos e integraciones de Winerim",
  url: "https://winerim.wine/precios-modulos-integraciones",
  itemListElement: MODULES.map((module, index) => ({
    "@type": "Offer",
    position: index + 1,
    name: module.name,
    category: "SaaS",
    priceCurrency: "EUR",
    description: `${module.name}: ${module.annual} con pago anual; ${module.monthly} con pago mensual. Incluye ${module.features.join(", ")}.`,
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Winerim",
      url: "https://winerim.wine",
    },
  })),
};

const PreciosModulosIntegraciones = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Precios módulos e integraciones"
      description="Precios de Winerim por módulos e integraciones: Core, TPV, Gestión, Márgenes, Intelligence y Full Managed."
      url="https://winerim.wine/precios-modulos-integraciones"
      hreflang={[
        { lang: "es", url: "https://winerim.wine/precios-modulos-integraciones" },
        { lang: "x-default", url: "https://winerim.wine/precios-modulos-integraciones" },
      ]}
      structuredData={STRUCTURED_DATA}
    />
    <Navbar />

    <main>
      <section className="relative overflow-hidden border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "Precios módulos e integraciones" }]} />
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded border border-wine/25 bg-wine/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-wine-light">
              <Sparkles size={14} aria-hidden="true" />
              Precios por módulos
            </div>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight md:text-6xl">
              Precios de Winerim por módulos e integraciones
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Activa el nivel operativo que necesita tu restaurante: carta viva, TPV,
              gestión documental, márgenes, SAVia o acompañamiento completo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wine-light">
              Alcance de cada módulo
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
              Qué incluye cada nivel de Winerim
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Compara capacidades, no solo precios. Cada módulo resuelve una parte concreta
              de la operativa del vino y puede ampliarse a medida que el negocio necesita
              más datos, automatización o acompañamiento.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-gradient-card">
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <article
                  key={module.name}
                  className={`border-b border-border last:border-b-0 ${module.bg}`}
                >
                  <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
                    <div>
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${module.border} bg-background/60`}>
                          <Icon size={20} className={module.accent} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-heading text-2xl font-bold md:text-3xl">
                              {module.name}
                            </h3>
                            {module.badge && (
                              <span className="rounded border border-wine/25 bg-wine/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-wine-light">
                                {module.badge}
                              </span>
                            )}
                          </div>
                          <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${module.accent}`}>
                            {module.label}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                        {module.description}
                      </p>

                      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                        Incluye
                      </p>
                      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {module.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                            <Check
                              size={16}
                              className={`mt-0.5 shrink-0 ${module.accent}`}
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 border-l-2 border-border pl-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Recomendado para
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                          {module.bestFor}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Pago anual
                      </p>
                      <p className="mt-2 font-heading text-3xl font-bold">{module.annual}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Equivalente mensual con contratación anual
                      </p>

                      <div className="my-6 border-t border-border" />

                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Pago mensual
                      </p>
                      <p className="mt-2 font-heading text-3xl font-bold">{module.monthly}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Contratación mes a mes
                      </p>

                      <Link
                        to={module.link}
                        className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${module.accent} transition-opacity hover:opacity-75`}
                      >
                        {module.linkLabel}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-border bg-card/40 px-5 py-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">Alcance final:</strong>{" "}
              las dependencias entre módulos, integraciones disponibles, número de locales
              y necesidades de implantación se confirman durante la demo.
            </p>
          </div>

          <section className="mt-14 py-12">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wine-light">
                Arquitectura de producto
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
                Cómo funciona cada módulo dentro de Winerim
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Los módulos no son piezas aisladas. Cada uno recibe una parte de la
                operativa, la transforma y entrega una señal útil al siguiente nivel.
                Este es el recorrido completo desde la carta y la bodega hasta la decisión.
              </p>
            </div>

            <div className="mt-10 border-y border-border">
              {MODULE_EXPLANATIONS.map((module, index) => (
                <ModuleExplanation
                  key={module.name}
                  number={String(index + 1).padStart(2, "0")}
                  {...module}
                />
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Los nombres anteriores describen la arquitectura funcional. El alcance
              contractual de cada cuenta se confirma según módulos, integraciones,
              locales y nivel de acompañamiento.
            </p>
          </section>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <PriceNote icon={Info} title="Anual vs mensual">
              La columna anual muestra el precio equivalente al mes cuando se contrata con pago anual.
            </PriceNote>
            <PriceNote icon={Cable} title="Integraciones" iconClassName="text-sky-400">
              TPV y Full / Managed pueden requerir alcance técnico, mapeo de referencias y validación de datos.
            </PriceNote>
            <PriceNote icon={Crown} title="Full / Managed" iconClassName="text-gold">
              Se presupuesta desde el precio indicado según locales, volumen de carta e integraciones.
            </PriceNote>
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-xl border border-wine/25 bg-wine/[0.04] p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold">¿Qué módulos encajan con tu carta?</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                En una demo revisamos tu carta, tu TPV, tu operativa de compras y el nivel de automatización que merece la pena activar.
              </p>
            </div>
            <Link
              to="/demo"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-gradient-wine px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
            >
              Solicitar demo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <InternalLinks
            title="También te puede interesar"
            links={[
              { to: "/precios", label: "Planes y precios", type: "solution" },
              { to: "/integraciones", label: "Integraciones TPV y API", type: "solution" },
              { to: "/funcionalidades", label: "Funcionalidades", type: "solution" },
              { to: "/producto/cloudrim", label: "CloudRIM", type: "solution" },
              { to: "/producto/savia", label: "SAVia", type: "solution" },
              { to: "/analisis-carta", label: "Analizar mi carta", type: "conversion" },
            ]}
          />
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

const PriceNote = ({
  icon: Icon,
  title,
  iconClassName = "text-wine",
  children,
}: {
  icon: typeof Info;
  title: string;
  iconClassName?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-card/50 p-5">
    <Icon size={18} className={iconClassName} aria-hidden="true" />
    <h3 className="mt-3 font-heading text-lg font-bold">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
  </div>
);

const ModuleExplanation = ({
  number,
  name,
  role,
  summary,
  input,
  action,
  output,
  capabilities,
}: {
  number: string;
  name: string;
  role: string;
  summary: string;
  input: string;
  action: string;
  output: string;
  capabilities: string;
}) => (
  <article className="grid gap-6 border-b border-border py-8 last:border-b-0 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
    <div>
      <p className="font-heading text-2xl font-bold text-wine-light">{number}</p>
      <h3 className="mt-3 font-heading text-2xl font-bold">{name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground/90">{summary}</p>
    </div>

    <div>
      <div className="grid gap-6 md:grid-cols-3">
        <ArchitecturePoint label="Qué recibe" text={input} />
        <ArchitecturePoint label="Qué hace" text={action} />
        <ArchitecturePoint label="Qué entrega" text={output} />
      </div>
      <div className="mt-6 border-l-2 border-wine/35 pl-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-wine-light">
          Capacidades conectadas
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {capabilities}
        </p>
      </div>
    </div>
  </article>
);

const ArchitecturePoint = ({
  label,
  text,
}: {
  label: string;
  text: string;
}) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{text}</p>
  </div>
);

export default PreciosModulosIntegraciones;
