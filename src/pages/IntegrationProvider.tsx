import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  RefreshCw,
  Settings2,
  ShieldCheck,
  TriangleAlert,
  Wine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";
import { integrationProviderHreflang, integrationProviderPath, type IntegrationProviderSlug } from "@/lib/integrationRoutes";

type Provider = "agora" | "revo";

type Copy = {
  integrations: string;
  status: string;
  title: string;
  subtitle: string;
  summary: string;
  scopeTitle: string;
  scopeIntro: string;
  capabilities: { title: string; description: string }[];
  processTitle: string;
  processIntro: string;
  steps: { title: string; description: string }[];
  limitsTitle: string;
  limits: string[];
  evidenceTitle: string;
  evidenceText: string;
  traceCaption: string;
  analysisCaption: string;
  primaryCta: string;
  secondaryCta: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  related: { to: string; label: string; type: "solution" | "guide" | "tool" }[];
};

const shared = {
  es: {
    integrations: "Integraciones",
    scopeTitle: "Qué conecta Winerim",
    processTitle: "Activación con controles verificables",
    processIntro: "La integración se habilita por establecimiento o conexión. Cada fase deja una comprobación concreta antes de pasar a la siguiente.",
    limitsTitle: "Qué no damos por supuesto",
    evidenceTitle: "Del dato del TPV a una decisión de bodega",
    traceCaption: "Trazabilidad por referencia entre catálogo, formato, precio y lectura del TPV.",
    analysisCaption: "Análisis del servicio a partir de ventas recibidas y correctamente asociadas.",
    primaryCta: "Revisar mi integración",
    secondaryCta: "Ver todas las integraciones",
    faqTitle: "Preguntas sobre la integración",
  },
  en: {
    integrations: "Integrations",
    scopeTitle: "What Winerim connects",
    processTitle: "Activation with verifiable controls",
    processIntro: "The integration is enabled per venue or connection. Each phase leaves a concrete check before moving to the next one.",
    limitsTitle: "What we do not assume",
    evidenceTitle: "From POS data to a cellar decision",
    traceCaption: "Reference-level traceability across catalog, format, price and POS reads.",
    analysisCaption: "Service analysis based on received and correctly mapped sales.",
    primaryCta: "Review my integration",
    secondaryCta: "See all integrations",
    faqTitle: "Integration questions",
  },
  it: {
    integrations: "Integrazioni",
    scopeTitle: "Cosa collega Winerim",
    processTitle: "Attivazione con controlli verificabili",
    processIntro: "L'integrazione viene attivata per locale o connessione. Ogni fase lascia una verifica concreta prima di procedere.",
    limitsTitle: "Cosa non diamo per scontato",
    evidenceTitle: "Dal dato POS a una decisione di cantina",
    traceCaption: "Tracciabilità per referenza tra catalogo, formato, prezzo e lettura POS.",
    analysisCaption: "Analisi del servizio basata su vendite ricevute e correttamente associate.",
    primaryCta: "Verificare la mia integrazione",
    secondaryCta: "Vedere tutte le integrazioni",
    faqTitle: "Domande sull'integrazione",
  },
  fr: {
    integrations: "Intégrations",
    scopeTitle: "Ce que Winerim connecte",
    processTitle: "Activation avec contrôles vérifiables",
    processIntro: "L'intégration est activée par établissement ou connexion. Chaque phase laisse un contrôle concret avant de passer à la suivante.",
    limitsTitle: "Ce que nous ne supposons pas",
    evidenceTitle: "De la donnée caisse à la décision de cave",
    traceCaption: "Traçabilité par référence entre catalogue, format, prix et lecture de caisse.",
    analysisCaption: "Analyse du service à partir de ventes reçues et correctement associées.",
    primaryCta: "Vérifier mon intégration",
    secondaryCta: "Voir toutes les intégrations",
    faqTitle: "Questions sur l'intégration",
  },
  de: {
    integrations: "Integrationen",
    scopeTitle: "Was Winerim verbindet",
    processTitle: "Aktivierung mit prüfbaren Kontrollen",
    processIntro: "Die Integration wird je Betrieb oder Verbindung aktiviert. Jede Phase endet mit einer konkreten Prüfung.",
    limitsTitle: "Was wir nicht voraussetzen",
    evidenceTitle: "Von POS-Daten zur Kellerentscheidung",
    traceCaption: "Nachvollziehbarkeit je Referenz über Katalog, Format, Preis und POS-Lesung.",
    analysisCaption: "Service-Analyse auf Basis empfangener und korrekt zugeordneter Verkäufe.",
    primaryCta: "Integration prüfen",
    secondaryCta: "Alle Integrationen ansehen",
    faqTitle: "Fragen zur Integration",
  },
  pt: {
    integrations: "Integrações",
    scopeTitle: "O que a Winerim liga",
    processTitle: "Ativação com controlos verificáveis",
    processIntro: "A integração é ativada por estabelecimento ou ligação. Cada fase deixa uma verificação concreta antes de avançar.",
    limitsTitle: "O que não assumimos",
    evidenceTitle: "Do dado do POS à decisão de garrafeira",
    traceCaption: "Rastreabilidade por referência entre catálogo, formato, preço e leitura do POS.",
    analysisCaption: "Análise do serviço a partir de vendas recebidas e corretamente associadas.",
    primaryCta: "Verificar a minha integração",
    secondaryCta: "Ver todas as integrações",
    faqTitle: "Perguntas sobre a integração",
  },
} as const;

const agoraProvider: I18nMap<Omit<Copy, keyof (typeof shared)["es"]>> = {
  es: {
    status: "Flujo técnico verificado; activación por conexión",
    title: "Integración Winerim con Ágora",
    subtitle: "Conecta catálogo y ventas de vino con Winerim mediante un despliegue controlado, trazable y validado para cada establecimiento.",
    summary: "La integración con Ágora ya dispone de un flujo técnico verificable. Eso no significa que cualquier instalación quede conectada de forma automática: accesos, familias, referencias, formatos, frecuencia y efectos de stock se validan por conexión.",
    scopeIntro: "El alcance final se documenta antes de activar la conexión.",
    capabilities: [
      { title: "Catálogo y formatos", description: "Relaciona referencias de Winerim con productos, familias y formatos del TPV." },
      { title: "Ventas asociadas", description: "Recibe ventas por botella o copa y evita duplicarlas mediante identificadores de origen." },
      { title: "Precios y lectura de vuelta", description: "Comprueba que los datos publicados o leídos coinciden con el alcance acordado." },
      { title: "Stock según conexión", description: "Aplica o interpreta efectos de stock solo cuando el mapeo y el flujo han sido validados." },
    ],
    steps: [
      { title: "Preflight", description: "Confirmamos acceso, versión, permisos, centros y familias de producto." },
      { title: "Mapeo", description: "Vinculamos vinos, variantes, formatos y referencias de stock sin mezclar familias ajenas." },
      { title: "Piloto y readback", description: "Probamos una muestra controlada y comprobamos catálogo, precios y una venta realmente asociada." },
      { title: "Operación monitorizada", description: "Definimos frecuencia, responsable, alertas, excepciones y procedimiento de recuperación." },
    ],
    limits: [
      "No prometemos tiempo real continuo si la fuente o los permisos no lo permiten.",
      "La impresión física, el enrutado a impresoras y otras funciones propias del TPV requieren validación específica.",
      "Una conexión técnica no se considera certificada hasta completar readback y una venta real correctamente mapeada.",
    ],
    evidenceText: "Winerim puede mostrar la trazabilidad entre vino, formato, precio y lectura del TPV, y convertir las ventas validadas en análisis de rotación, margen y servicio. Las capturas ilustran el flujo de producto; el alcance exacto depende de cada conexión Ágora.",
    faqs: [
      { q: "¿Ágora se conecta automáticamente?", a: "No. Existe un flujo técnico disponible, pero cada instalación necesita acceso, mapeo, piloto y readback antes de activarse." },
      { q: "¿La integración incluye catálogo, ventas y stock?", a: "Catálogo y ventas forman parte del flujo verificable. El tratamiento de stock depende del mapeo, permisos y alcance acordado para cada conexión." },
      { q: "¿Hay que cambiar la operativa del restaurante?", a: "El objetivo es conservar la operativa del TPV. Solo se documentan las familias, formatos y excepciones necesarias para que los datos sean fiables." },
    ],
    related: [
      { to: "/integraciones/revo-xef", label: "Integración REVO XEF", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Conectar carta, stock, ventas y margen", type: "guide" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
  en: {
    status: "Verified technical flow; activation per connection",
    title: "Winerim integration with Ágora",
    subtitle: "Connect wine catalog and sales data to Winerim through a controlled, traceable deployment validated for each venue.",
    summary: "The Ágora integration has a verifiable technical flow. This does not mean every installation is connected automatically: access, families, references, formats, frequency and stock effects are validated per connection.",
    scopeIntro: "The final scope is documented before the connection is enabled.",
    capabilities: [
      { title: "Catalog and formats", description: "Maps Winerim references to POS products, families and sale formats." },
      { title: "Mapped sales", description: "Receives bottle or glass sales and avoids duplicates using source identifiers." },
      { title: "Prices and readback", description: "Checks that published or received data matches the agreed scope." },
      { title: "Stock by connection", description: "Applies or interprets stock effects only after mapping and flow validation." },
    ],
    steps: [
      { title: "Preflight", description: "We confirm access, version, permissions, locations and product families." },
      { title: "Mapping", description: "We link wines, variants, formats and stock references without mixing unrelated families." },
      { title: "Pilot and readback", description: "We test a controlled sample and verify catalog, prices and one correctly mapped real sale." },
      { title: "Monitored operation", description: "We define frequency, ownership, alerts, exceptions and recovery procedure." },
    ],
    limits: [
      "We do not promise continuous real time when the source or permissions do not support it.",
      "Physical printing, printer routing and other POS-native functions require specific validation.",
      "A technical connection is not considered certified until readback and a correctly mapped real sale are complete.",
    ],
    evidenceText: "Winerim can show traceability between wine, format, price and POS reads, then turn validated sales into rotation, margin and service analysis. The screenshots illustrate the product flow; exact scope depends on each Ágora connection.",
    faqs: [
      { q: "Is Ágora connected automatically?", a: "No. A technical flow is available, but every installation needs access, mapping, a pilot and readback before activation." },
      { q: "Does the integration include catalog, sales and stock?", a: "Catalog and sales are part of the verifiable flow. Stock handling depends on mapping, permissions and the scope agreed for each connection." },
      { q: "Does the restaurant need to change its workflow?", a: "The goal is to preserve the POS workflow. We only document the families, formats and exceptions required for reliable data." },
    ],
    related: [
      { to: "/integraciones/revo-xef", label: "REVO XEF integration", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Connect list, stock, sales and margin", type: "guide" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
    ],
  },
};

const revoProvider: I18nMap<Omit<Copy, keyof (typeof shared)["es"]>> = {
  es: {
    status: "Disponibilidad y alcance sujetos a preflight",
    title: "Integración Winerim con REVO XEF",
    subtitle: "Evalúa y conecta los datos de REVO XEF con Winerim después de validar permisos, versión, mapeo y una lectura piloto.",
    summary: "REVO XEF no se presenta como una conexión universal ni activada por defecto. Winerim confirma primero qué datos están disponibles para cada cliente y solo después define catálogo, ventas, precios, formatos, frecuencia y posible tratamiento de stock.",
    scopeIntro: "Estas capacidades son objetivos de integración, no una promesa previa al preflight.",
    capabilities: [
      { title: "Catálogo", description: "Evaluación de productos, familias y referencias que pueden relacionarse con Winerim." },
      { title: "Ventas", description: "Lectura de eventos de venta cuando el acceso, el identificador y el formato son compatibles." },
      { title: "Precios y variantes", description: "Revisión de precios y formatos de servicio disponibles en la instalación del cliente." },
      { title: "Operación multiunidad", description: "Definición de centros, responsables y frecuencia cuando existen varias unidades." },
    ],
    steps: [
      { title: "Preflight", description: "Revisamos versión, API o exportación disponible, permisos, centros y límites del proveedor." },
      { title: "Muestra de datos", description: "Comprobamos identificadores, familias, variantes, precios y estructura de ventas." },
      { title: "Piloto de lectura", description: "Validamos una muestra real sin asumir escritura ni sincronización continua." },
      { title: "Propuesta de alcance", description: "Documentamos qué se conecta, con qué frecuencia, controles y soporte operativo." },
    ],
    limits: [
      "No confirmamos bidireccionalidad, escritura o tiempo real antes del piloto.",
      "Las capacidades pueden variar por versión de REVO, permisos del cliente y configuración del establecimiento.",
      "El despliegue no se da por terminado hasta verificar lectura, mapeo y ausencia de duplicados.",
    ],
    evidenceText: "La misma trazabilidad de Winerim se aplica cuando REVO aporta datos correctamente identificados y asociados. Las capturas muestran el resultado operativo en Winerim; no certifican por sí solas una instalación REVO concreta.",
    faqs: [
      { q: "¿Winerim ya se integra con cualquier REVO XEF?", a: "No lo damos por supuesto. Primero se revisan versión, permisos y datos disponibles, y después se confirma el alcance por escrito." },
      { q: "¿Puede leer ventas por vino y formato?", a: "Puede plantearse cuando REVO entrega identificadores y formatos compatibles. Se valida con una muestra y un piloto antes de activarlo." },
      { q: "¿Cuándo se considera lista la integración?", a: "Cuando una lectura real queda correctamente mapeada, sin duplicados, y se han documentado frecuencia, excepciones y soporte." },
    ],
    related: [
      { to: "/integraciones/agora", label: "Integración Ágora", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Conectar carta, stock, ventas y margen", type: "guide" },
      { to: "/soluciones/grupos-restauracion", label: "Gestión para grupos", type: "solution" },
    ],
  },
  en: {
    status: "Availability and scope subject to preflight",
    title: "Winerim integration with REVO XEF",
    subtitle: "Assess and connect REVO XEF data to Winerim after validating permissions, version, mapping and a read pilot.",
    summary: "REVO XEF is not presented as a universal or default-enabled connection. Winerim first confirms which data is available for each customer, then defines catalog, sales, prices, formats, frequency and any stock handling.",
    scopeIntro: "These capabilities are integration targets, not a promise made before preflight.",
    capabilities: [
      { title: "Catalog", description: "Assessment of products, families and references that can be mapped to Winerim." },
      { title: "Sales", description: "Reading sales events when access, identifiers and formats are compatible." },
      { title: "Prices and variants", description: "Reviewing prices and service formats available in the customer's installation." },
      { title: "Multi-unit operation", description: "Defining locations, ownership and frequency when several units are involved." },
    ],
    steps: [
      { title: "Preflight", description: "We review version, available API or export, permissions, locations and provider limits." },
      { title: "Data sample", description: "We check identifiers, families, variants, prices and sales structure." },
      { title: "Read pilot", description: "We validate a real sample without assuming writing or continuous sync." },
      { title: "Scope proposal", description: "We document what connects, at what frequency, with which controls and support." },
    ],
    limits: [
      "We do not confirm bidirectionality, writing or real time before the pilot.",
      "Capabilities may vary by REVO version, customer permissions and venue configuration.",
      "Deployment is not complete until reading, mapping and duplicate prevention are verified.",
    ],
    evidenceText: "The same Winerim traceability applies when REVO supplies correctly identified and mapped data. The screenshots show the operational result in Winerim; they do not certify a specific REVO installation by themselves.",
    faqs: [
      { q: "Does Winerim integrate with every REVO XEF installation?", a: "We do not assume that. Version, permissions and available data are reviewed first, then scope is confirmed in writing." },
      { q: "Can it read sales by wine and format?", a: "It can be considered when REVO provides compatible identifiers and formats. A sample and pilot are validated before activation." },
      { q: "When is the integration considered ready?", a: "When a real read is correctly mapped without duplicates and frequency, exceptions and support are documented." },
    ],
    related: [
      { to: "/integraciones/agora", label: "Ágora integration", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Connect list, stock, sales and margin", type: "guide" },
      { to: "/soluciones/grupos-restauracion", label: "Restaurant group management", type: "solution" },
    ],
  },
};

const fallbackProvider = (source: typeof agoraProvider, lang: "it" | "fr" | "de" | "pt"): Copy => {
  const english = source.en;
  const common = shared[lang];
  return { ...common, ...english } as Copy;
};

const providerCopy = (provider: Provider): I18nMap<Copy> => {
  const source = provider === "agora" ? agoraProvider : revoProvider;
  return {
    es: { ...shared.es, ...source.es },
    en: { ...shared.en, ...source.en },
    it: fallbackProvider(source, "it"),
    fr: fallbackProvider(source, "fr"),
    de: fallbackProvider(source, "de"),
    pt: fallbackProvider(source, "pt"),
  };
};

const capabilityIcons = [Database, BarChart3, RefreshCw, Settings2];

const IntegrationProvider = () => {
  const { pathname } = useLocation();
  const { lang, localePath } = useLanguage();
  const provider: Provider = pathname.includes("revo-xef") ? "revo" : "agora";
  const providerSlug: IntegrationProviderSlug = provider === "agora" ? "agora" : "revo-xef";
  const t = useMemo(() => getI18n(providerCopy(provider), lang), [provider, lang]);
  const providerName = provider === "agora" ? "Ágora" : "REVO XEF";
  const canonicalPath = integrationProviderPath(providerSlug, lang);
  const seoSuffix = lang === "es" ? "TPV y datos operativos" : "POS and operational data";
  const localizeRelatedPath = (path: string) => {
    if (path === "/integraciones/agora") return integrationProviderPath("agora", lang);
    if (path === "/integraciones/revo-xef") return integrationProviderPath("revo-xef", lang);
    return localePath(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${t.title} | ${seoSuffix}`}
        description={t.subtitle}
        url={`https://winerim.wine${canonicalPath}`}
        hreflang={integrationProviderHreflang(providerSlug)}
        noindex={lang !== "es" && lang !== "en"}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: `Winerim + ${providerName}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: t.summary,
        }}
      />
      <Navbar />

      <main>
        <section className="border-b border-border pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.integrations, href: localePath("/integraciones") }, { label: providerName }]} />
            <div className="mt-8 max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-wine/25 bg-wine/5 px-3 py-2 text-xs font-semibold uppercase text-wine-light">
                <ShieldCheck size={15} aria-hidden="true" />
                {t.status}
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">{t.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t.subtitle}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={localePath("/demo")} className="inline-flex min-h-12 items-center justify-center gap-2 bg-wine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine/90">
                  {t.primaryCta} <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link to={localePath("/integraciones")} className="inline-flex min-h-12 items-center justify-center border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-wine/40 hover:bg-wine/5">
                  {t.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/20 py-10">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{t.summary}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <ScrollReveal>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase text-wine">{providerName}</p>
                <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">{t.scopeTitle}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{t.scopeIntro}</p>
              </div>
            </ScrollReveal>
            <div className="mt-10 grid border-y border-border md:grid-cols-2">
              {t.capabilities.map((item, index) => {
                const Icon = capabilityIcons[index] || Wine;
                return (
                  <ScrollReveal key={item.title} delay={index * 0.05}>
                    <div className="flex h-full gap-4 border-b border-border p-6 md:border-r md:p-8">
                      <Icon className="mt-1 shrink-0 text-wine" size={21} aria-hidden="true" />
                      <div>
                        <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-gradient-dark py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">{t.processTitle}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{t.processIntro}</p>
            </ScrollReveal>
            <ol className="mt-12 grid gap-px bg-border lg:grid-cols-4">
              {t.steps.map((step, index) => (
                <li key={step.title} className="bg-background p-6 md:p-8">
                  <span className="text-sm font-semibold text-wine">0{index + 1}</span>
                  <h3 className="mt-5 font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr]">
            <ScrollReveal>
              <TriangleAlert className="text-amber-400" size={26} aria-hidden="true" />
              <h2 className="mt-5 font-heading text-3xl font-bold">{t.limitsTitle}</h2>
            </ScrollReveal>
            <div className="divide-y divide-border border-y border-border">
              {t.limits.map((limit) => (
                <div key={limit} className="flex gap-3 py-5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-wine" size={18} aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{limit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">{t.evidenceTitle}</h2>
              <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">{t.evidenceText}</p>
            </ScrollReveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <figure className="border border-border bg-background">
                <a href="/commercial-assets/product-proof/07-trazabilidad-vino-tpv.png" target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine">
                  <img src="/commercial-assets/product-proof/07-trazabilidad-vino-tpv.png" alt={t.traceCaption} loading="lazy" className="aspect-[16/7] w-full object-cover object-top" />
                </a>
                <figcaption className="p-4 text-sm text-muted-foreground">{t.traceCaption}</figcaption>
              </figure>
              <figure className="border border-border bg-background">
                <a href="/commercial-assets/product-proof/02-analisis-ventas.png" target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine">
                  <img src="/commercial-assets/product-proof/02-analisis-ventas.png" alt={t.analysisCaption} loading="lazy" className="aspect-[16/7] w-full object-cover object-top" />
                </a>
                <figcaption className="p-4 text-sm text-muted-foreground">{t.analysisCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <FAQSection faqs={t.faqs} schemaId={`integration-${provider}`} title={t.faqTitle} />
        <InternalLinks links={t.related.map((link) => ({ ...link, to: localizeRelatedPath(link.to) }))} />
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationProvider;
