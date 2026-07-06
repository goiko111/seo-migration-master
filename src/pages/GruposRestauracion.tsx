import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, AlertTriangle, CheckCircle, BarChart3,
  Layers, RefreshCw, DollarSign, TrendingUp, Users, Wine,
  Warehouse, Globe, Sparkles, Store, X, Check,
  GraduationCap, ClipboardList, Brain, Target, Shield
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps, { type NextStep } from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { CapabilitiesBlock, BenchmarkingBlock, IntelBlock, PilotBlock } from "@/components/groups/GroupStrategyBlocks";
import WinerimSupplyBlock from "@/components/WinerimSupplyBlock";
import { useLanguage } from "@/i18n/LanguageContext";
import DecisionCenterTeaser from "@/components/DecisionCenterTeaser";
import { CANONICAL_DOMAIN } from "@/seo/config";

/* ─── types ─── */
type IntelCard = { title: string; desc: string };
type CapCard = { title: string; desc: string };
type PainRow = { pain: string; manual: string; winerim: string };
type DecisionItem = { title: string; desc: string };
type KpiItem = { label: string; desc: string };
type InternalLinkItem = { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" };

type Content = {
  metaTitle: string; metaDescription: string;
  badgeLabel: string; breadSolutions: string; breadLabel: string;
  heroTitle1: string; heroTitleHighlight: string;
  heroDesc: string; ctaDemo: string; ctaContact: string;
  heroSummary: string;
  /* Who for / not for */
  forLabel: string; forTitle: string;
  forItems: string[]; notForItems: string[];
  forLabel2: string; notForLabel: string;
  /* Problems */
  problemLabel: string; problemTitle1: string; problemTitleHighlight: string;
  problems: { text: string }[];
  /* Pain vs solution table */
  painTableLabel: string; painTableTitle: string;
  painTableHeaders: [string, string, string];
  painRows: PainRow[];
  /* Solution */
  solutionLabel: string; solutionTitle1: string; solutionTitleHighlight: string;
  advantages: { title: string; desc: string }[];
  /* Capabilities, Benchmarking (from GroupStrategyBlocks) */
  capLabel: string; capTitle: string; capSubtitle: string; capCards: CapCard[];
  benchLabel: string; benchTitle: string; benchSubtitle: string; benchMetrics: string[]; benchClosing: string;
  /* Features */
  featLabel: string; featTitle1: string; featTitleHighlight: string;
  features: { title: string; desc: string }[];
  /* Training */
  trainingLabel: string; trainingTitle: string; trainingDesc: string;
  trainingItems: string[];
  /* What you can measure */
  measureLabel: string; measureTitle: string; measureSubtitle: string;
  measureKpis: KpiItem[];
  /* What decisions it enables */
  decisionsLabel: string; decisionsTitle: string;
  decisions: DecisionItem[];
  /* Results */
  impactLabel: string; impactTitle1: string; impactTitleHighlight: string;
  results: { value: string; desc: string }[];
  /* Use cases */
  scaleLabel: string; scaleTitle1: string; scaleTitleHighlight: string;
  useCases: { size: string; scenario: string; howLabel: string; how: string; result: string }[];
  /* Intel, Pilot */
  intelLabel: string; intelTitle1: string; intelTitleHighlight: string; intelSubtitle: string; intelCards: IntelCard[];
  pilotTitle: string; pilotSubtitle: string; pilotSteps: { title: string; desc: string }[]; pilotClosing: string;
  /* Platform layers */
  platformLabel: string; platformTitle1: string; platformTitleHighlight: string; platformDesc: string;
  coreLabel: string; coreTitle1: string; coreTitleHighlight: string; coreDesc: string; coreBullets: string[]; coreCta: string;
  supplyLabel: string; supplyTitle1: string; supplyTitleHighlight: string; supplyDesc: string; supplyBullets: string[]; supplyCta: string;
  /* Positioning */
  posTitle: string; posSubtitle: string; posBullets: string[]; posCta: string;
  /* CTA */
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string; ctaMicro: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
  /* SEO links */
  nextStepsTitle: string; nextSteps: NextStep[];
  internalLinks: InternalLinkItem[];
};

/* ═══════════════════════════════════════════════════════════ */
/* ═══ SPANISH CONTENT ══════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  metaTitle: "Winerim para Grupos de Restauración y Hoteleros | Control Multiunidad del Vino",
  metaDescription: "Gobierno del surtido, benchmarking interno y decisiones de compra basadas en rendimiento real. Winerim para operadores multiunidad.",
  badgeLabel: "Operadores multiunidad", breadSolutions: "Soluciones", breadLabel: "Grupos de restauración",
  heroTitle1: "Control, visibilidad y decisión sobre el vino en ", heroTitleHighlight: "todas tus unidades",
  heroDesc: "Winerim da a grupos de restauración y hoteleros una capa de gobierno sobre el surtido, el margen, la rotación y la coherencia comercial del vino a escala.",
  ctaDemo: "Solicitar demo para mi grupo", ctaContact: "Hablar con el equipo",
  heroSummary: "Winerim para grupos es una plataforma de gestión, analítica y optimización del vino diseñada para operadores con múltiples locales, marcas o conceptos. Centraliza el control de cartas, pricing, stock y rendimiento del vino en todas las unidades desde un solo panel.",

  /* For / Not for */
  forLabel: "¿Para quién es esta solución?", forTitle: "¿Es Winerim para tu grupo?",
  forLabel2: "Es para ti si...", notForLabel: "Probablemente no es para ti si...",
  forItems: [
    "Gestionas 3 o más locales con carta de vinos",
    "Necesitas coherencia de pricing y surtido entre unidades",
    "Quieres datos comparativos reales entre locales",
    "Buscas reducir la dependencia del criterio individual",
    "Quieres escalar estrategias probadas a más unidades",
    "Tu dirección necesita reporting de la categoría vino",
  ],
  notForItems: [
    "Tienes un solo restaurante con una carta contenida (menos de 80 referencias)",
    "No necesitas comparar ni estandarizar entre locales",
    "Buscas solo un diseño de carta, sin analítica ni control",
  ],

  problemLabel: "El reto", problemTitle1: "Gestionar el vino como categoría estratégica en ", problemTitleHighlight: "estructuras complejas",
  problems: [
    { text: "No hay visibilidad centralizada sobre qué vinos funcionan, cuáles se estancan o dónde se pierde margen entre unidades." },
    { text: "El surtido depende del criterio individual de cada local: sin estandarización, sin benchmarking, sin escalado con criterio." },
    { text: "Decisiones de compra basadas en intuición o relaciones, no en rendimiento real ni en datos comparables entre locales." },
    { text: "Cartas que no reflejan la estrategia del grupo: incoherencia de precios, duplicidades y huecos de oferta sin detectar." },
    { text: "El vino es la categoría con más margen potencial, pero la que menos se gestiona con herramientas de negocio serias." },
    { text: "El equipo de sala no tiene formación ni herramientas para recomendar vino con criterio en cada punto de venta." },
  ],

  /* Pain vs Solution table */
  painTableLabel: "Comparativa", painTableTitle: "Gestión manual vs Winerim para grupos",
  painTableHeaders: ["Área", "Gestión manual / hojas de cálculo", "Con Winerim"],
  painRows: [
    { pain: "Visibilidad multi-local", manual: "Datos dispersos, Excel por local, sin consolidar", winerim: "Panel único con vista comparativa en tiempo real" },
    { pain: "Coherencia de pricing", manual: "Cada director o sumiller aplica su criterio", winerim: "Reglas de pricing por tipología, alertas de desviación" },
    { pain: "Control de surtido", manual: "Listas manuales, sin benchmarking entre cartas", winerim: "Comparativa de surtido, gaps, canibalización y escalado" },
    { pain: "Rotación y stock", manual: "Sin alertas, stock muerto invisible hasta inventario", winerim: "Alertas automáticas, redistribución entre locales" },
    { pain: "Formación de sala", manual: "Depende del talento individual, sin herramientas", winerim: "Fichas, maridajes y recomendaciones integradas para el equipo" },
    { pain: "Reporting para dirección", manual: "Informes manuales, parciales y tardíos", winerim: "Reporting ejecutivo automatizado con KPIs por unidad" },
    { pain: "Escalado de estrategias", manual: "Se escala por intuición, sin validación previa", winerim: "Pilotaje, medición y escalado basado en datos reales" },
    { pain: "Implantación", manual: "N/A", winerim: "Progresiva: piloto en 2-3 locales, escalado gradual" },
  ],

  solutionLabel: "La solución", solutionTitle1: "De gestionar cartas a ", solutionTitleHighlight: "gobernar la categoría vino",
  advantages: [
    { title: "Gobierno centralizado del surtido", desc: "Una plataforma para gestionar, comparar y optimizar la oferta de vino en todas las unidades. Control real, no solo visibilidad." },
    { title: "Coherencia comercial entre unidades", desc: "Define estrategias de pricing, posicionamiento y surtido que se aplican con coherencia sin perder la adaptación local." },
    { title: "Benchmarking interno continuo", desc: "Compara rendimiento, rotación, margen y ticket medio entre locales. Detecta qué funciona, dónde y por qué." },
    { title: "Decisiones de surtido basadas en datos", desc: "Identifica referencias infraexplotadas, canibalización, huecos de oferta y oportunidades de escalado con criterio." },
    { title: "Experiencia profesionalizada para el comensal", desc: "Cartas digitales con recomendaciones, maridajes y fichas enriquecidas en todos los puntos de venta del grupo." },
  ],

  capLabel: "Capacidades para grupos", capTitle: "Qué puede hacer Winerim por un grupo",
  capSubtitle: "Una capa de inteligencia para gobernar el vino a escala, no como locales aislados.",
  capCards: [
    { title: "Comparar unidades", desc: "Comparar rendimiento, rotación, márgenes y comportamiento del vino entre locales." },
    { title: "Detectar oportunidades invisibles", desc: "Encontrar referencias infraexplotadas, huecos de pricing, canibalización y stock inmovilizado." },
    { title: "Decidir qué replicar", desc: "Identificar qué vinos, formatos o estrategias merece la pena escalar al resto del grupo." },
    { title: "Adaptar por tipología de local", desc: "No aplicar la misma lógica a fine dining, casual premium, hotel urbano o destino turístico." },
    { title: "Profesionalizar la categoría", desc: "Reducir dependencia del criterio individual de cada director o sumiller." },
    { title: "Activar reglas por marca o unidad", desc: "Definir prioridades distintas según objetivo de negocio, marca, ciudad o tipo de cliente." },
  ],

  benchLabel: "Benchmarking", benchTitle: "Benchmarking interno entre unidades",
  benchSubtitle: "Detecta qué locales están vendiendo mejor vino, qué estrategias convierten más y dónde existen oportunidades de mejora o escalado.",
  benchMetrics: ["Ticket medio en vino por unidad", "Margen medio por categoría", "Referencias con mejor salida", "Vinos con alta visibilidad y baja conversión", "Unidades con stock más sano", "Diferencias entre cartas comparables", "Formatos o rangos de precio con mejor rendimiento"],
  benchClosing: "No se trata solo de ver datos. Se trata de decidir mejor qué replicar, qué corregir y qué proteger a escala grupo.",

  featLabel: "Plataforma", featTitle1: "Diseñado para ", featTitleHighlight: "operar a escala",
  features: [
    { title: "Panel multiunidad", desc: "Dashboard central con vista comparativa de todas las unidades. Filtra por marca, ciudad, cluster o concepto." },
    { title: "Actualización centralizada", desc: "Modifica precios, activa referencias o retira vinos en todas las unidades con un clic. Sin depender de cada local." },
    { title: "Analítica comparativa", desc: "Rankings de rendimiento, margen y rotación entre unidades. Detecta best practices y escálalas con criterio." },
    { title: "Control de pricing por estructura", desc: "Multiplicadores por tipología de local, alertas de desviación y sugerencias de optimización basadas en rendimiento." },
    { title: "Gestión de bodega multilocal", desc: "Stock centralizado o descentralizado. Alertas de sobrestock, rotación lenta y oportunidades de redistribución." },
  ],

  /* Training */
  trainingLabel: "Formación de sala", trainingTitle: "Tu equipo recomienda vino con confianza, sin necesitar un sumiller en cada local",
  trainingDesc: "Winerim integra herramientas que permiten al personal de sala recomendar vino de forma profesional, reduciendo la dependencia del talento individual y mejorando la experiencia del comensal en todos los puntos de venta.",
  trainingItems: [
    "Fichas de vino enriquecidas accesibles desde cualquier dispositivo",
    "Maridajes automáticos por plato, estilo o perfil de comensal",
    "Recomendaciones inteligentes que el equipo puede seguir paso a paso",
    "Descripción de cada vino en el idioma del comensal",
    "Puntos clave de venta por referencia: qué decir, qué destacar",
    "Sin necesidad de formación previa en enología",
  ],

  /* What you can measure */
  measureLabel: "Qué puedes medir", measureTitle: "KPIs que Winerim pone a tu alcance",
  measureSubtitle: "Datos accionables para dirección de operaciones, F&B y dirección general.",
  measureKpis: [
    { label: "Ticket medio en vino por unidad", desc: "Compara el gasto medio en vino por mesa en cada local." },
    { label: "Margen medio por categoría de vino", desc: "Identifica qué estilos, regiones o rangos de precio generan más margen." },
    { label: "Ratio de mesas que piden vino", desc: "Mide qué porcentaje de mesas compra vino y cómo varía entre locales." },
    { label: "Rotación por referencia y unidad", desc: "Detecta vinos estancados y referencias con alta demanda." },
    { label: "Coste de stock inmovilizado", desc: "Calcula el capital parado en vinos sin rotación por local." },
    { label: "Coherencia de pricing entre unidades", desc: "Detecta desviaciones de precio para el mismo vino entre locales." },
    { label: "Rendimiento de la oferta por copa", desc: "Analiza ventas, merma y margen del programa de vino por copa." },
    { label: "Evolución mensual de la categoría", desc: "Tendencias de ventas, margen y surtido mes a mes." },
  ],

  /* What decisions it enables */
  decisionsLabel: "Qué decisiones facilita", decisionsTitle: "Decisiones de negocio que puedes tomar con Winerim",
  decisions: [
    { title: "¿Qué vinos mantener, retirar o escalar?", desc: "Basado en rotación, margen y rendimiento real por local, no en intuición." },
    { title: "¿Dónde hay oportunidades de margen?", desc: "Detecta rangos de precio infraexplotados o categorías con potencial." },
    { title: "¿Qué locales necesitan atención?", desc: "Identifica unidades con bajo rendimiento en vino vs el benchmark del grupo." },
    { title: "¿Merece la pena expandir una referencia?", desc: "Pilota en 2-3 locales, mide resultados y decide con datos antes de escalar." },
    { title: "¿Está mi pricing alineado con la estrategia?", desc: "Compara multiplicadores, márgenes y posicionamiento entre locales similares." },
    { title: "¿Qué estrategia de copa implantar?", desc: "Analiza estilos, precios, merma y rotación para diseñar un programa rentable." },
  ],

  impactLabel: "Impacto", impactTitle1: "Lo que cambia con ", impactTitleHighlight: "Winerim",
  results: [
    { value: "Gobierno real", desc: "Sobre surtido, margen y coherencia comercial en todas las unidades" },
    { value: "Decisiones con dato", desc: "Benchmarking interno y rendimiento real como base de cada decisión" },
    { value: "Escalado con criterio", desc: "Pilotar, medir y expandir estrategias con validación antes de escalar" },
    { value: "Operación global", desc: "Multi-idioma, multi-marca, multi-concepto desde un solo panel" },
  ],

  scaleLabel: "Escalabilidad", scaleTitle1: "Winerim se adapta a ", scaleTitleHighlight: "tu estructura",
  useCases: [
    { size: "3–5 unidades", scenario: "Grupo con conceptos diferenciados: gastronómico, casual y wine bar.", howLabel: "Cómo opera", how: "Cada unidad tiene su carta adaptada pero gobernada desde un mismo panel. Pricing y surtido alineados con el posicionamiento de cada concepto.", result: "Coherencia de marca sin perder identidad por local." },
    { size: "10–30 unidades", scenario: "Cadena de restauración organizada con locales en varias ciudades.", howLabel: "Cómo opera", how: "Cartas base por cluster con variaciones locales. Benchmarking interno para identificar rendimiento y replicar estrategias ganadoras.", result: "Menos tiempo de gestión, más control sobre margen y rotación." },
    { size: "50+ unidades", scenario: "Gran grupo de restauración u operador hotelero con múltiples marcas.", howLabel: "Cómo opera", how: "Integración con ERP y POS. Gestión por clusters, marcas o regiones. Reporting automatizado para dirección de operaciones y F&B.", result: "Gobierno completo de la categoría vino a escala organización." },
  ],

  intelLabel: "Inteligencia de surtido",
  intelTitle1: "Decisiones de surtido y compra basadas en ", intelTitleHighlight: "rendimiento real",
  intelSubtitle: "Winerim ayuda a grupos de restauración y hoteleros a decidir qué referencias mantener, replicar, impulsar, retirar o testear según margen, rotación, ticket medio, tipo de unidad y comportamiento real de la carta.",
  intelCards: [
    { title: "Inteligencia de surtido", desc: "Detecta qué estilos, rangos de precio, formatos y referencias funcionan mejor según el tipo de unidad, perfil de cliente y contexto operativo." },
    { title: "Benchmarking entre unidades", desc: "Compara locales, identifica diferencias de rendimiento y detecta qué cartas, vinos o estrategias están funcionando mejor y dónde." },
    { title: "Estandarización inteligente", desc: "Permite definir referencias core, referencias por cluster y vinos específicos por local sin caer en una uniformidad rígida." },
    { title: "Oportunidades de compra y escalado", desc: "Ayuda a decidir qué vinos merece la pena expandir a más unidades, cuáles retirar, cuáles testear en piloto y dónde hay oportunidades de margen o rotación." },
  ],

  pilotTitle: "Testea en pocas unidades. Escala con más criterio.",
  pilotSubtitle: "Antes de extender una referencia, una estrategia de copeo o una lógica de carta a todo el grupo, Winerim ayuda a validar qué está funcionando y dónde tiene sentido replicarlo.",
  pilotSteps: [
    { title: "Pilotar", desc: "Testar referencias o estrategias en un conjunto limitado de locales." },
    { title: "Medir", desc: "Analizar margen, rotación, ticket y conversión real." },
    { title: "Escalar o corregir", desc: "Expandir a más unidades o ajustar antes de tomar una decisión de compra más grande." },
  ],
  pilotClosing: "Menos decisiones basadas en intuición. Más despliegues con validación real.",

  platformLabel: "Plataforma completa",
  platformTitle1: "Core + Supply + Dinámica: ", platformTitleHighlight: "la combinación que tiene sentido a escala",
  platformDesc: "Un grupo necesita analizar rendimiento (Core), decidir compras con dato (Supply) y activar la carta en tiempo real (Inteligencia Dinámica). Las tres capas trabajan juntas para que el vino se gestione como una categoría de negocio gobernable.",
  coreLabel: "Capa analítica",
  coreTitle1: "Winerim Core para ", coreTitleHighlight: "grupos",
  coreDesc: "Permite comparar unidades, detectar diferencias de rendimiento, ajustar pricing, prever consumo y decidir qué referencias merece la pena mantener, replicar o retirar.",
  coreBullets: [
    "Benchmark interno entre unidades del grupo",
    "Detección de desviaciones de pricing y margen por local",
    "Scoring de rendimiento por referencia y categoría",
    "Previsión de demanda agregada por cluster de locales",
    "Simulación de cambios de carta antes de desplegar",
  ],
  coreCta: "Ver Winerim Core",
  supplyLabel: "Inteligencia de compras",
  supplyTitle1: "Winerim Supply para ", supplyTitleHighlight: "grupos",
  supplyDesc: "Ayuda a comparar compras por unidad, detectar sobreprecios, revisar capital inmovilizado y construir lógica de compra por cluster o tipo de local.",
  supplyBullets: [
    "Comparar compras por unidad y detectar ineficiencias",
    "Detectar sobreprecios por proveedor frente a la red",
    "Revisar qué referencias inmovilizan capital sin retorno",
    "Decidir qué expandir a más locales y qué retirar",
    "Construir lógica de compra por cluster o tipo de local",
  ],
  supplyCta: "Ver Winerim Supply",

  posTitle: "Convierte el vino en una unidad de negocio gobernable a escala.",
  posSubtitle: "Lo que hoy suele depender de intuición, hojas de cálculo o criterio desigual entre locales, Winerim lo transforma en una estrategia de grupo más medible, accionable y escalable.",
  posBullets: ["Más control multiunidad", "Más coherencia comercial", "Más visibilidad sobre margen y rotación", "Mejor toma de decisiones de surtido", "Menos dependencia del talento individual"],
  posCta: "Quiero ver cómo funciona para grupos",

  ctaLabel: "Para grupos",
  ctaTitle: "¿Quieres ver qué oportunidades tiene tu grupo en vino?",
  ctaDesc: "Podemos analizar varias cartas o unidades y mostrarte dónde hay oportunidades de margen, rotación, escalado, estandarización o mejora comercial.",
  ctaPrimary: "Quiero una demo para mi grupo",
  ctaSecondary: "Analizar varias unidades",
  ctaMicro: "Especialmente útil para grupos de restauración, hoteleros y operadores con múltiples cartas, marcas o ubicaciones.",

  faqs: [
    { q: "¿Cuántos locales necesito para usar Winerim para grupos?", a: "A partir de 3 locales con carta de vinos ya tiene sentido. El valor crece exponencialmente con cada unidad adicional porque el benchmarking y la estandarización se vuelven más potentes." },
    { q: "¿Cada local puede tener una carta diferente?", a: "Sí. Winerim permite definir cartas base por cluster y variaciones locales. Puedes tener un surtido core común y adaptaciones por concepto, ciudad o tipo de cliente." },
    { q: "¿Hace falta un sumiller en cada local?", a: "No. Winerim incluye fichas enriquecidas, maridajes automáticos y recomendaciones inteligentes que permiten al personal de sala recomendar vino con confianza, sin formación previa en enología." },
    { q: "¿Se integra con mi POS o PMS?", a: "Sí. En el plan Enterprise, Winerim se integra con los principales sistemas de punto de venta y gestión hotelera vía API. Si tu sistema no está en la lista, lo evaluamos contigo." },
    { q: "¿Cuánto tarda la implementación en un grupo?", a: "La implantación es progresiva. El piloto en 2-3 locales se activa en menos de una semana. El despliegue al resto del grupo se hace de forma gradual, sin disrupciones." },
    { q: "¿Puedo ver reporting consolidado para dirección?", a: "Sí. El plan Enterprise incluye reporting ejecutivo automatizado con KPIs por unidad, cluster y grupo. Perfecto para dirección de operaciones y F&B." },
    { q: "¿Qué datos puedo comparar entre locales?", a: "Ticket medio en vino, margen por categoría, rotación por referencia, ratio de mesas que piden vino, coherencia de pricing, rendimiento del programa de copa y evolución mensual." },
    { q: "¿Hay permanencia?", a: "No. Sin permanencia ni penalizaciones. Puedes escalar o reducir locales según tus necesidades." },
  ],

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { to: "/herramientas/auditor-carta-multilocal", label: "Auditor de carta multi-local", description: "Compara consistencia entre locales: surtido, pricing, copa y ticket.", type: "tool" },
    { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio", description: "Estima el impacto de mejorar el ratio de mesas y ticket.", type: "tool" },
    { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guía: gestionar carta en grupos", description: "Governance, benchmarking y control centralizado.", type: "guide" },
    { to: "/precios", label: "Plan Enterprise de Winerim", description: "Multi-local, integraciones POS, SLA y account manager.", type: "solution" },
  ],
  internalLinks: [
    { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica: IA táctica para carta", type: "solution" },
    { to: "/producto/winerim-supply", label: "Winerim Supply: inteligencia de compras para grupos", type: "solution" },
    { to: "/producto/winerim-core", label: "Winerim Core: 26 módulos analíticos", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Software de carta de vinos inteligente", type: "solution" },
    { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Aumentar ticket medio con datos", type: "guide" },
    { to: "/wine-list-benchmark", label: "Wine List Benchmark", type: "tool" },
    { to: "/casos-exito", label: "Casos de éxito de restaurantes reales", type: "solution" },
    { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guía: formar al equipo de sala", type: "guide" },
    { to: "/comparativas", label: "Compara Winerim con alternativas", type: "solution" },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
/* ═══ EN CONTENT (abbreviated — keeps existing + new) ═════ */
/* ═══════════════════════════════════════════════════════════ */

const EN: Content = {
  metaTitle: "Winerim for Restaurant Groups | Centralized Wine Management",
  metaDescription: "Centralize wine list management, optimize pricing, and increase sales across all your restaurants. Solution for restaurant groups.",
  badgeLabel: "Restaurant groups", breadSolutions: "Solutions", breadLabel: "Restaurant groups",
  heroTitle1: "Smart wine management for ", heroTitleHighlight: "restaurant groups",
  heroDesc: "Centralize wine list management, optimize pricing, and boost sales across all your restaurants.",
  ctaDemo: "Request demo", ctaContact: "Talk to a specialist",
  heroSummary: "Winerim for groups is a wine management, analytics and optimization platform designed for operators with multiple locations, brands or concepts. Centralize wine list control, pricing, stock and performance across all units from a single panel.",
  forLabel: "Who is this for?", forTitle: "Is Winerim right for your group?",
  forLabel2: "It's for you if...", notForLabel: "Probably not for you if...",
  forItems: [
    "You manage 3+ locations with wine lists",
    "You need pricing and assortment consistency across units",
    "You want real comparative data between locations",
    "You want to reduce dependence on individual judgment",
    "You want to scale proven strategies to more units",
    "Your management needs wine category reporting",
  ],
  notForItems: [
    "You have a single restaurant with fewer than 30 references",
    "You don't need to compare or standardize across locations",
    "You only want a list design, no analytics or control",
  ],
  problemLabel: "The challenge", problemTitle1: "Managing wine as a strategic category in ", problemTitleHighlight: "complex structures",
  problems: [
    { text: "No centralized visibility on which wines work, which stagnate, or where margin is lost between units." },
    { text: "Assortment depends on individual judgment at each venue: no standardization, no benchmarking, no scaled criteria." },
    { text: "Purchase decisions based on intuition or relationships, not on real performance or comparable data." },
    { text: "Lists that don't reflect the group's strategy: price inconsistency, duplications, and undetected offer gaps." },
    { text: "Wine is the highest-margin category, but the least managed with serious business tools." },
    { text: "The floor team lacks training and tools to recommend wine confidently at every point of sale." },
  ],
  painTableLabel: "Comparison", painTableTitle: "Manual management vs Winerim for groups",
  painTableHeaders: ["Area", "Manual / spreadsheets", "With Winerim"],
  painRows: [
    { pain: "Multi-location visibility", manual: "Scattered data, Excel per venue", winerim: "Single panel with real-time comparative view" },
    { pain: "Pricing consistency", manual: "Each director applies their own criteria", winerim: "Pricing rules by type, deviation alerts" },
    { pain: "Assortment control", manual: "Manual lists, no cross-list benchmarking", winerim: "Assortment comparison, gaps, cannibalization" },
    { pain: "Rotation & stock", manual: "No alerts, dead stock invisible until inventory", winerim: "Automatic alerts, cross-location redistribution" },
    { pain: "Floor training", manual: "Depends on individual talent, no tools", winerim: "Profiles, pairings and recommendations for the team" },
    { pain: "Management reporting", manual: "Manual, partial, late reports", winerim: "Automated executive reporting with KPIs by unit" },
    { pain: "Strategy scaling", manual: "Scaled by intuition, no validation", winerim: "Pilot, measure and scale based on real data" },
    { pain: "Implementation", manual: "N/A", winerim: "Progressive: pilot in 2-3 locations, gradual rollout" },
  ],
  solutionLabel: "The solution", solutionTitle1: "From managing lists to ", solutionTitleHighlight: "governing the wine category",
  advantages: [
    { title: "Centralized assortment governance", desc: "One platform to manage, compare and optimize wine across all units." },
    { title: "Commercial consistency across units", desc: "Define pricing, positioning and assortment strategies applied consistently." },
    { title: "Continuous internal benchmarking", desc: "Compare performance, rotation, margin and average ticket across locations." },
    { title: "Data-driven assortment decisions", desc: "Identify underexploited references, cannibalization and scaling opportunities." },
    { title: "Professional customer experience", desc: "Digital lists with recommendations, pairings and enriched profiles everywhere." },
  ],
  capLabel: "Capabilities", capTitle: "What Winerim can do for a group",
  capSubtitle: "An intelligence layer to govern wine at scale.",
  capCards: [
    { title: "Compare units", desc: "Compare performance, rotation, margins across venues." },
    { title: "Detect invisible opportunities", desc: "Find underexploited references, pricing gaps, cannibalization." },
    { title: "Decide what to replicate", desc: "Identify which wines or strategies to scale." },
    { title: "Adapt by venue type", desc: "Different logic for fine dining, casual, hotel or tourist." },
    { title: "Professionalize the category", desc: "Reduce dependence on individual judgment." },
    { title: "Activate rules by brand", desc: "Define priorities by business objective, brand or city." },
  ],
  benchLabel: "Benchmarking", benchTitle: "Internal benchmarking across units",
  benchSubtitle: "Detect which venues sell wine better and where opportunities exist.",
  benchMetrics: ["Average wine ticket per unit", "Average margin by category", "Best-performing references", "High visibility / low conversion wines", "Units with healthiest stock", "Differences between comparable lists", "Best-performing formats or price ranges"],
  benchClosing: "It's not about seeing data. It's about deciding better what to replicate, fix, or protect at group scale.",
  featLabel: "Platform", featTitle1: "Designed to ", featTitleHighlight: "operate at scale",
  features: [
    { title: "Multi-unit panel", desc: "Central dashboard with comparative view. Filter by brand, city, cluster or concept." },
    { title: "Centralized updates", desc: "Modify prices, activate or retire wines across all units with one click." },
    { title: "Comparative analytics", desc: "Performance rankings between units. Detect and scale best practices." },
    { title: "Structured pricing control", desc: "Multipliers by venue type, deviation alerts, optimization suggestions." },
    { title: "Multi-location cellar", desc: "Centralized or decentralized stock. Alerts and redistribution opportunities." },
  ],
  trainingLabel: "Floor training", trainingTitle: "Your team recommends wine confidently, without a sommelier at every location",
  trainingDesc: "Winerim integrates tools that let floor staff recommend wine professionally, reducing dependence on individual talent.",
  trainingItems: [
    "Enriched wine profiles accessible from any device",
    "Automatic pairings by dish, style or diner profile",
    "Smart recommendations the team can follow step by step",
    "Wine descriptions in the diner's language",
    "Key selling points per reference: what to say, what to highlight",
    "No prior wine training required",
  ],
  measureLabel: "What you can measure", measureTitle: "KPIs Winerim puts at your fingertips",
  measureSubtitle: "Actionable data for operations, F&B and general management.",
  measureKpis: [
    { label: "Average wine ticket per unit", desc: "Compare average wine spend per table across locations." },
    { label: "Average margin by wine category", desc: "Identify which styles or price ranges generate the most margin." },
    { label: "Ratio of tables ordering wine", desc: "Measure what percentage of tables order wine per venue." },
    { label: "Rotation per reference and unit", desc: "Detect stagnant wines and high-demand references." },
    { label: "Immobilized stock cost", desc: "Calculate capital tied up in non-rotating wines per location." },
    { label: "Pricing consistency across units", desc: "Detect price deviations for the same wine between venues." },
    { label: "By-the-glass program performance", desc: "Analyze sales, waste and margin of glass programs." },
    { label: "Monthly category evolution", desc: "Sales, margin and assortment trends month over month." },
  ],
  decisionsLabel: "What decisions it enables", decisionsTitle: "Business decisions you can make with Winerim",
  decisions: [
    { title: "Which wines to keep, retire or scale?", desc: "Based on rotation, margin and real performance, not intuition." },
    { title: "Where are margin opportunities?", desc: "Detect underexploited price ranges or high-potential categories." },
    { title: "Which locations need attention?", desc: "Identify units with low wine performance vs group benchmark." },
    { title: "Worth expanding a reference?", desc: "Pilot in 2-3 venues, measure results, decide with data." },
    { title: "Is pricing aligned with strategy?", desc: "Compare multipliers and margins between similar venues." },
    { title: "What glass strategy to implement?", desc: "Analyze styles, prices, waste and rotation for a profitable program." },
  ],
  impactLabel: "Impact", impactTitle1: "Results with ", impactTitleHighlight: "Winerim",
  results: [
    { value: "Full governance", desc: "Over assortment, margin and commercial consistency across all units" },
    { value: "Data-driven decisions", desc: "Internal benchmarking and real performance as the basis for every decision" },
    { value: "Criteria-based scaling", desc: "Pilot, measure and expand strategies with validation before scaling" },
    { value: "Global operation", desc: "Multi-language, multi-brand, multi-concept from a single panel" },
  ],
  scaleLabel: "Scalability", scaleTitle1: "Winerim adapts to ", scaleTitleHighlight: "your structure",
  useCases: [
    { size: "3–5 units", scenario: "Group with differentiated concepts: fine dining, casual and wine bar.", howLabel: "How it operates", how: "Each unit has its adapted list governed from a single panel. Pricing aligned with each concept's positioning.", result: "Brand consistency without losing each venue's identity." },
    { size: "10–30 units", scenario: "Organized chain with venues in multiple cities.", howLabel: "How it operates", how: "Base lists per cluster with local variations. Internal benchmarking to identify and replicate winning strategies.", result: "Less management time, more control over margin and rotation." },
    { size: "50+ units", scenario: "Large group or hotel operator with multiple brands.", howLabel: "How it operates", how: "ERP and POS integration. Management by clusters, brands or regions. Automated reporting for operations and F&B.", result: "Complete governance of the wine category at organization scale." },
  ],
  intelLabel: "Assortment intelligence",
  intelTitle1: "Assortment decisions based on ", intelTitleHighlight: "real performance",
  intelSubtitle: "Winerim helps groups decide which references to keep, replicate, push, retire or test based on real data.",
  intelCards: [
    { title: "Assortment intelligence", desc: "Detects what works best by unit type, customer profile and context." },
    { title: "Cross-unit benchmarking", desc: "Compare venues and detect which strategies work best where." },
    { title: "Smart standardization", desc: "Core references, cluster selections and venue-specific wines." },
    { title: "Purchase & scaling opportunities", desc: "Decide what to expand, retire, pilot-test or optimize." },
  ],
  pilotTitle: "Test in a few units. Scale with better criteria.",
  pilotSubtitle: "Before extending a strategy across the group, validate what's working.",
  pilotSteps: [
    { title: "Pilot", desc: "Test in a limited set of venues." },
    { title: "Measure", desc: "Analyze margin, rotation, ticket and conversion." },
    { title: "Scale or adjust", desc: "Expand or refine before bigger decisions." },
  ],
  pilotClosing: "Fewer decisions based on intuition. More rollouts with real validation.",

  platformLabel: "Complete platform",
  platformTitle1: "Core + Supply + Dynamic: ", platformTitleHighlight: "the combination that makes sense at scale",
  platformDesc: "A group needs to analyze performance (Core), make data-driven purchase decisions (Supply), and activate the list in real time (Dynamic Intelligence). The three layers work together so wine is managed as a governable business category.",
  coreLabel: "Analytics layer",
  coreTitle1: "Winerim Core for ", coreTitleHighlight: "groups",
  coreDesc: "Compare units, detect performance differences, adjust pricing, forecast consumption, and decide which references to keep, replicate or retire.",
  coreBullets: [
    "Internal benchmarking across group units",
    "Pricing and margin deviation detection per venue",
    "Performance scoring per reference and category",
    "Aggregated demand forecasting per venue cluster",
    "Wine list change simulation before deployment",
  ],
  coreCta: "See Winerim Core",
  supplyLabel: "Purchasing intelligence",
  supplyTitle1: "Winerim Supply for ", supplyTitleHighlight: "groups",
  supplyDesc: "Compare purchases per unit, detect overpricing, review tied-up capital, and build purchasing logic per cluster or venue type.",
  supplyBullets: [
    "Compare purchases per unit and detect inefficiencies",
    "Detect supplier overpricing against the network",
    "Review which references tie up capital without return",
    "Decide what to expand to more venues and what to retire",
    "Build purchasing logic per cluster or venue type",
  ],
  supplyCta: "See Winerim Supply",

  posTitle: "Turn wine into a governable business unit at scale.",
  posSubtitle: "What today depends on intuition and spreadsheets, Winerim transforms into a measurable, actionable strategy.",
  posBullets: ["More multi-unit control", "More commercial consistency", "More margin visibility", "Better assortment decisions", "Less dependence on individual talent"],
  posCta: "See how it works for groups",
  ctaLabel: "For groups", ctaTitle: "Want to see what opportunities your group has in wine?",
  ctaDesc: "We can analyze multiple lists and show you where opportunities lie.",
  ctaPrimary: "I want a demo for my group", ctaSecondary: "Analyze multiple units",
  ctaMicro: "Especially useful for restaurant groups, hotel operators and multi-unit businesses.",
  faqs: [
    { q: "How many locations do I need?", a: "From 3 locations with wine lists. Value grows exponentially with each additional unit." },
    { q: "Can each location have a different list?", a: "Yes. Define base lists per cluster with local variations. Common core with concept adaptations." },
    { q: "Do I need a sommelier at each location?", a: "No. Winerim includes enriched profiles, automatic pairings and smart recommendations." },
    { q: "Does it integrate with my POS/PMS?", a: "Yes. Enterprise integrates with major POS and hotel management systems via API." },
    { q: "How long does implementation take?", a: "Progressive. Pilot in 2-3 venues in under a week. Gradual rollout to the rest." },
    { q: "Can I see consolidated reporting?", a: "Yes. Enterprise includes automated executive reporting with KPIs by unit and cluster." },
    { q: "What data can I compare?", a: "Wine ticket, margin by category, rotation, tables ordering wine, pricing consistency, glass performance, monthly trends." },
    { q: "Is there a lock-in?", a: "No. No lock-in or penalties. Scale up or down as needed." },
  ],

  nextStepsTitle: "Next steps",
  nextSteps: [
    { to: "/herramientas/auditor-carta-multilocal", label: "Multi-location list auditor", description: "Compare consistency across venues.", type: "tool" },
    { to: "/herramientas/calculadora-ticket-medio-vino", label: "Average ticket calculator", description: "Estimate the impact of improving table ratio and ticket.", type: "tool" },
    { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guide: managing lists in groups", description: "Governance, benchmarking and centralized control.", type: "guide" },
    { to: "/precios", label: "Winerim Enterprise plan", description: "Multi-location, POS integrations, SLA and account manager.", type: "solution" },
  ],
  internalLinks: [
    { to: "/producto/inteligencia-dinamica", label: "Dynamic intelligence", type: "solution" },
    { to: "/producto/winerim-supply", label: "Winerim Supply: purchasing intelligence", type: "solution" },
    { to: "/producto/winerim-core", label: "Winerim Core: 26 analytical modules", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Wine list software", type: "solution" },
    { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Increase average ticket", type: "guide" },
    { to: "/wine-list-benchmark", label: "Wine List Benchmark", type: "tool" },
    { to: "/casos-exito", label: "Real case studies", type: "solution" },
    { to: "/funcionalidades", label: "All features", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guide: train floor staff", type: "guide" },
    { to: "/comparativas", label: "Compare Winerim", type: "solution" },
  ],
};

/* IT and FR inherit EN structure with minimal overrides */
const IT: Content = { ...EN,
  metaTitle: "Winerim per Gruppi di Ristorazione | Gestione Centralizzata del Vino",
  metaDescription: "Centralizza la gestione delle carte dei vini, ottimizza i prezzi e aumenta le vendite.",
  badgeLabel: "Gruppi di ristorazione", breadSolutions: "Soluzioni", breadLabel: "Gruppi di ristorazione",
  heroTitle1: "Gestione intelligente del vino per ", heroTitleHighlight: "gruppi di ristorazione",
  heroDesc: "Centralizza carte, prezzi e performance del vino in tutti i tuoi locali.",
  ctaDemo: "Richiedi demo", ctaContact: "Parla con uno specialista",
  ctaPrimary: "Voglio una demo per il mio gruppo", ctaSecondary: "Analizzare più unità",
};

const FR: Content = { ...EN,
  metaTitle: "Winerim pour Groupes de Restauration | Gestion Centralisée du Vin",
  metaDescription: "Centralisez la gestion des cartes des vins, optimisez les prix et augmentez les ventes.",
  badgeLabel: "Groupes de restauration", breadSolutions: "Solutions", breadLabel: "Groupes de restauration",
  heroTitle1: "Gestion intelligente du vin pour les ", heroTitleHighlight: "groupes de restauration",
  heroDesc: "Centralisez cartes, prix et performance du vin dans tous vos établissements.",
  ctaDemo: "Demander une démo", ctaContact: "Parler à un spécialiste",
  ctaPrimary: "Je veux une démo pour mon groupe", ctaSecondary: "Analyser plusieurs unités",
};

const DE: Content = { ...EN,
  metaTitle: "Winerim für Restaurantgruppen | Zentralisierte Weinkartenverwaltung",
  metaDescription: "Zentralisieren Sie die Weinkartenverwaltung, optimieren Sie Preise und steigern Sie Umsätze in allen Ihren Locations.",
  badgeLabel: "Restaurantgruppen", breadSolutions: "Lösungen", breadLabel: "Restaurantgruppen",
  heroTitle1: "Intelligente Weinkartenverwaltung für ", heroTitleHighlight: "Restaurantgruppen",
  heroDesc: "Zentralisieren Sie Weinkarten, Preisgestaltung und Wein-Performance über alle Ihre Standorte hinweg. Winerim gibt Restaurant- und Hotelgruppen eine Steuerungsschicht für Sortiment, Marge, Rotation und kommerzielle Konsistenz.",
  ctaDemo: "Demo anfragen", ctaContact: "Mit Spezialisten sprechen",
  heroSummary: "Winerim für Gruppen ist eine Plattform für Weinmanagement, Analytik und Optimierung, entwickelt für Betreiber mit mehreren Standorten, Marken oder Konzepten. Sie zentralisiert Kontrolle über Weinkarten, Preise, Bestand und Performance aller Einheiten in einem einzigen Panel.",

  forLabel: "Für wen ist diese Lösung?", forTitle: "Ist Winerim das Richtige für Ihre Gruppe?",
  forLabel2: "Geeignet für Sie, wenn...", notForLabel: "Wahrscheinlich nicht geeignet, wenn...",
  forItems: [
    "Sie 3 oder mehr Standorte mit Weinkarte betreiben",
    "Sie konsistente Preise und Sortimente zwischen Einheiten brauchen",
    "Sie echte Vergleichsdaten zwischen Standorten wollen",
    "Sie Abhängigkeit von individuellem Urteil reduzieren möchten",
    "Sie bewährte Strategien auf weitere Einheiten ausrollen wollen",
    "Ihre Leitung Reporting zur Weinkategorie braucht",
  ],
  notForItems: [
    "Sie haben ein einzelnes Restaurant mit kleiner Karte unter 80 Referenzen",
    "Sie müssen Standorte weder vergleichen noch standardisieren",
    "Sie suchen nur Kartendesign ohne Analytik oder Kontrolle",
  ],

  problemLabel: "Die Herausforderung", problemTitle1: "Wein als strategische Kategorie in ", problemTitleHighlight: "komplexen Strukturen steuern",
  problems: [
    { text: "Es fehlt zentrale Transparenz darüber, welche Weine funktionieren, welche stagnieren und wo zwischen Einheiten Marge verloren geht." },
    { text: "Das Sortiment hängt vom individuellen Urteil jedes Standorts ab: keine Standardisierung, kein Benchmarking, kein skalierbares Kriterium." },
    { text: "Einkaufsentscheidungen beruhen oft auf Intuition oder Beziehungen, nicht auf realer Performance und vergleichbaren Daten." },
    { text: "Karten spiegeln die Gruppenstrategie nicht sauber wider: Preisinkonsistenz, Dopplungen und Angebotslücken bleiben unentdeckt." },
    { text: "Wein hat hohes Margenpotenzial, wird aber selten mit ernsthaften Business-Werkzeugen gesteuert." },
    { text: "Das Serviceteam hat nicht überall Schulung und Werkzeuge, um Wein in jedem Verkaufspunkt sicher zu empfehlen." },
  ],

  painTableLabel: "Vergleich", painTableTitle: "Manuelle Steuerung vs. Winerim für Gruppen",
  painTableHeaders: ["Bereich", "Manuell / Tabellen", "Mit Winerim"],
  painRows: [
    { pain: "Multi-Standort-Transparenz", manual: "Verstreute Daten, Excel je Standort, nicht konsolidiert", winerim: "Ein Panel mit vergleichender Echtzeitansicht" },
    { pain: "Preiskonsistenz", manual: "Jeder Direktor oder Sommelier setzt eigene Kriterien", winerim: "Preisregeln nach Typologie und Abweichungswarnungen" },
    { pain: "Sortimentskontrolle", manual: "Manuelle Listen ohne Vergleich zwischen Karten", winerim: "Sortimentsvergleich, Lücken, Kannibalisierung und Skalierung" },
    { pain: "Rotation und Bestand", manual: "Keine Warnungen, toter Bestand erst bei Inventur sichtbar", winerim: "Automatische Warnungen und Umverteilung zwischen Standorten" },
    { pain: "Serviceschulung", manual: "Abhängig vom individuellen Talent, ohne Werkzeuge", winerim: "Profile, Pairings und Empfehlungen direkt für das Team" },
    { pain: "Reporting für die Leitung", manual: "Manuelle, teilweise und verspätete Reports", winerim: "Automatisiertes Management-Reporting mit KPIs je Einheit" },
    { pain: "Skalierung von Strategien", manual: "Wird nach Intuition ausgerollt, ohne Validierung", winerim: "Testen, messen und auf Basis realer Daten skalieren" },
    { pain: "Einführung", manual: "Nicht anwendbar", winerim: "Schrittweise: Pilot in 2-3 Standorten, danach gradueller Rollout" },
  ],

  solutionLabel: "Die Lösung", solutionTitle1: "Von der Kartenverwaltung zur ", solutionTitleHighlight: "Steuerung der Weinkategorie",
  advantages: [
    { title: "Zentrale Sortimentssteuerung", desc: "Eine Plattform, um das Weinangebot über alle Einheiten hinweg zu verwalten, zu vergleichen und zu optimieren. Echte Kontrolle, nicht nur Sichtbarkeit." },
    { title: "Kommerzielle Konsistenz zwischen Einheiten", desc: "Definieren Sie Preis-, Positionierungs- und Sortimentsstrategien, die konsistent angewendet werden und lokale Anpassung zulassen." },
    { title: "Kontinuierliches internes Benchmarking", desc: "Vergleichen Sie Performance, Rotation, Marge und Durchschnittsbon zwischen Standorten. Erkennen Sie, was wo funktioniert." },
    { title: "Sortimentsentscheidungen mit Daten", desc: "Erkennen Sie untergenutzte Referenzen, Kannibalisierung, Angebotslücken und Chancen zur Skalierung." },
    { title: "Professionelles Gästeerlebnis", desc: "Digitale Karten mit Empfehlungen, Pairings und erweiterten Profilen in allen Verkaufspunkten der Gruppe." },
  ],

  capLabel: "Fähigkeiten für Gruppen", capTitle: "Was Winerim für eine Gruppe leisten kann",
  capSubtitle: "Eine Intelligenzschicht, um Wein in der Skalierung zu steuern, statt jeden Standort isoliert zu betrachten.",
  capCards: [
    { title: "Einheiten vergleichen", desc: "Performance, Rotation, Margen und Weinverhalten zwischen Standorten vergleichen." },
    { title: "Unsichtbare Chancen erkennen", desc: "Untergenutzte Referenzen, Preislücken, Kannibalisierung und gebundenen Bestand finden." },
    { title: "Entscheiden, was repliziert wird", desc: "Erkennen, welche Weine, Formate oder Strategien auf den Rest der Gruppe skaliert werden sollten." },
    { title: "Nach Standorttyp anpassen", desc: "Nicht dieselbe Logik auf Fine Dining, Casual Premium, Stadthotel oder touristisches Ziel anwenden." },
    { title: "Kategorie professionalisieren", desc: "Abhängigkeit vom individuellen Urteil einzelner Direktoren oder Sommeliers reduzieren." },
    { title: "Regeln nach Marke oder Einheit aktivieren", desc: "Unterschiedliche Prioritäten nach Geschäftsziel, Marke, Stadt oder Kundentyp definieren." },
  ],

  benchLabel: "Benchmarking", benchTitle: "Internes Benchmarking zwischen Einheiten",
  benchSubtitle: "Erkennen Sie, welche Standorte Wein besser verkaufen, welche Strategien stärker konvertieren und wo Verbesserungs- oder Skalierungschancen liegen.",
  benchMetrics: ["Durchschnittlicher Weinbon je Einheit", "Durchschnittsmarge nach Kategorie", "Referenzen mit bester Rotation", "Weine mit hoher Sichtbarkeit und niedriger Konversion", "Einheiten mit gesünderem Bestand", "Unterschiede zwischen vergleichbaren Karten", "Formate oder Preisbereiche mit bester Performance"],
  benchClosing: "Es geht nicht nur darum, Daten zu sehen. Es geht darum, besser zu entscheiden, was repliziert, korrigiert und auf Gruppenebene geschützt werden soll.",

  featLabel: "Plattform", featTitle1: "Entwickelt, um ", featTitleHighlight: "in der Skalierung zu arbeiten",
  features: [
    { title: "Multi-Einheiten-Panel", desc: "Zentrales Dashboard mit Vergleichsansicht aller Einheiten. Filtern nach Marke, Stadt, Cluster oder Konzept." },
    { title: "Zentrale Aktualisierung", desc: "Preise ändern, Referenzen aktivieren oder Weine in allen Einheiten mit einem Klick entfernen." },
    { title: "Vergleichende Analytik", desc: "Rankings zu Performance, Marge und Rotation zwischen Einheiten. Bewährte Ansätze erkennen und mit Kriterium ausrollen." },
    { title: "Preissteuerung nach Struktur", desc: "Multiplikatoren nach Standorttyp, Abweichungswarnungen und Optimierungsvorschläge auf Basis der Performance." },
    { title: "Multi-Standort-Bestandsmanagement", desc: "Zentraler oder dezentraler Bestand. Warnungen zu Überbestand, langsamer Rotation und Umverteilungschancen." },
  ],

  trainingLabel: "Serviceschulung", trainingTitle: "Ihr Team empfiehlt Wein sicher, ohne Sommelier an jedem Standort",
  trainingDesc: "Winerim integriert Werkzeuge, mit denen das Serviceteam Wein professionell empfehlen kann. Das reduziert Abhängigkeit von individuellem Talent und verbessert das Gästeerlebnis in allen Verkaufspunkten.",
  trainingItems: [
    "Erweiterte Weinprofile, abrufbar auf jedem Gerät",
    "Automatische Pairings nach Gericht, Stil oder Gastprofil",
    "Intelligente Empfehlungen, denen das Team Schritt für Schritt folgen kann",
    "Beschreibung jedes Weins in der Sprache des Gastes",
    "Wichtige Verkaufspunkte pro Referenz: was sagen und was hervorheben",
    "Keine vorherige Weinausbildung erforderlich",
  ],

  measureLabel: "Was Sie messen können", measureTitle: "KPIs, die Winerim verfügbar macht",
  measureSubtitle: "Handlungsrelevante Daten für Operations, F&B und Geschäftsführung.",
  measureKpis: [
    { label: "Durchschnittlicher Weinbon je Einheit", desc: "Vergleichen Sie die durchschnittlichen Weinausgaben pro Tisch an jedem Standort." },
    { label: "Durchschnittsmarge nach Weinkategorie", desc: "Erkennen Sie, welche Stile, Regionen oder Preisbereiche die höchste Marge bringen." },
    { label: "Anteil der Tische mit Weinbestellung", desc: "Messen Sie, welcher Anteil der Tische Wein bestellt und wie sich das zwischen Standorten unterscheidet." },
    { label: "Rotation pro Referenz und Einheit", desc: "Erkennen Sie stagnierende Weine und Referenzen mit hoher Nachfrage." },
    { label: "Kosten gebundenen Bestands", desc: "Berechnen Sie Kapital, das pro Standort in Weinen ohne Rotation gebunden ist." },
    { label: "Preiskonsistenz zwischen Einheiten", desc: "Erkennen Sie Preisabweichungen desselben Weins zwischen Standorten." },
    { label: "Performance des Glasweinangebots", desc: "Analysieren Sie Umsatz, Schwund und Marge des Glasweinprogramms." },
    { label: "Monatliche Entwicklung der Kategorie", desc: "Trends bei Umsatz, Marge und Sortiment von Monat zu Monat." },
  ],

  decisionsLabel: "Welche Entscheidungen es erleichtert", decisionsTitle: "Geschäftsentscheidungen, die Sie mit Winerim treffen können",
  decisions: [
    { title: "Welche Weine behalten, entfernen oder skalieren?", desc: "Basierend auf Rotation, Marge und realer Performance je Standort, nicht auf Intuition." },
    { title: "Wo gibt es Margenchancen?", desc: "Erkennen Sie untergenutzte Preisbereiche oder Kategorien mit Potenzial." },
    { title: "Welche Standorte brauchen Aufmerksamkeit?", desc: "Identifizieren Sie Einheiten mit schwacher Wein-Performance im Vergleich zum Gruppenbenchmark." },
    { title: "Lohnt es sich, eine Referenz auszurollen?", desc: "Testen Sie in 2-3 Standorten, messen Sie Ergebnisse und entscheiden Sie datenbasiert." },
    { title: "Ist mein Pricing mit der Strategie abgestimmt?", desc: "Vergleichen Sie Multiplikatoren, Margen und Positionierung zwischen ähnlichen Standorten." },
    { title: "Welche Glasweinstrategie einführen?", desc: "Analysieren Sie Stile, Preise, Schwund und Rotation, um ein rentables Programm zu gestalten." },
  ],

  impactLabel: "Wirkung", impactTitle1: "Was sich mit ", impactTitleHighlight: "Winerim verändert",
  results: [
    { value: "Echte Steuerung", desc: "Über Sortiment, Marge und kommerzielle Konsistenz in allen Einheiten" },
    { value: "Entscheidungen mit Daten", desc: "Internes Benchmarking und reale Performance als Grundlage jeder Entscheidung" },
    { value: "Skalierung mit Kriterium", desc: "Strategien testen, messen und erst nach Validierung ausrollen" },
    { value: "Globale Operation", desc: "Mehrsprachig, multi-brand und multi-konzept aus einem einzigen Panel" },
  ],

  scaleLabel: "Skalierbarkeit", scaleTitle1: "Winerim passt sich ", scaleTitleHighlight: "Ihrer Struktur an",
  useCases: [
    { size: "3-5 Einheiten", scenario: "Gruppe mit unterschiedlichen Konzepten: gehobene Küche, Casual und Wine Bar.", howLabel: "Wie es funktioniert", how: "Jede Einheit hat eine angepasste Karte, wird aber aus demselben Panel gesteuert. Preise und Sortiment bleiben mit dem Positioning jedes Konzepts abgestimmt.", result: "Markenkonsistenz, ohne lokale Identität zu verlieren." },
    { size: "10-30 Einheiten", scenario: "Organisierte Restaurantkette mit Standorten in mehreren Städten.", howLabel: "Wie es funktioniert", how: "Basiskarten pro Cluster mit lokalen Varianten. Internes Benchmarking zeigt Performance und repliziert erfolgreiche Strategien.", result: "Weniger Managementzeit, mehr Kontrolle über Marge und Rotation." },
    { size: "50+ Einheiten", scenario: "Große Restaurantgruppe oder Hotelbetreiber mit mehreren Marken.", howLabel: "Wie es funktioniert", how: "Integration mit ERP und POS. Steuerung nach Clustern, Marken oder Regionen. Automatisiertes Reporting für Operations und F&B.", result: "Vollständige Steuerung der Weinkategorie auf Organisationsebene." },
  ],

  intelLabel: "Sortimentsintelligenz",
  intelTitle1: "Sortiments- und Einkaufsentscheidungen auf Basis ", intelTitleHighlight: "realer Performance",
  intelSubtitle: "Winerim hilft Restaurant- und Hotelgruppen zu entscheiden, welche Referenzen behalten, repliziert, aktiviert, entfernt oder getestet werden sollen - nach Marge, Rotation, Durchschnittsbon, Einheitstyp und realem Kartenverhalten.",
  intelCards: [
    { title: "Sortimentsintelligenz", desc: "Erkennt, welche Stile, Preisbereiche, Formate und Referenzen je Einheitstyp, Kundenprofil und operativem Kontext am besten funktionieren." },
    { title: "Benchmarking zwischen Einheiten", desc: "Vergleicht Standorte, erkennt Performance-Unterschiede und zeigt, welche Karten, Weine oder Strategien wo besser funktionieren." },
    { title: "Intelligente Standardisierung", desc: "Ermöglicht Core-Referenzen, Cluster-Auswahlen und standortspezifische Weine, ohne in starre Einheitlichkeit zu fallen." },
    { title: "Einkaufs- und Skalierungschancen", desc: "Hilft zu entscheiden, welche Weine auf mehr Einheiten ausgeweitet, entfernt, getestet oder margenseitig optimiert werden sollten." },
  ],

  pilotTitle: "In wenigen Einheiten testen. Mit besserem Kriterium skalieren.",
  pilotSubtitle: "Bevor eine Referenz, eine Glasweinstrategie oder eine Kartenlogik auf die ganze Gruppe ausgerollt wird, hilft Winerim zu validieren, was funktioniert und wo Replikation sinnvoll ist.",
  pilotSteps: [
    { title: "Testen", desc: "Referenzen oder Strategien in einer begrenzten Anzahl von Standorten prüfen." },
    { title: "Messen", desc: "Marge, Rotation, Bon und echte Konversion analysieren." },
    { title: "Skalieren oder korrigieren", desc: "Auf weitere Einheiten ausrollen oder anpassen, bevor eine größere Einkaufsentscheidung fällt." },
  ],
  pilotClosing: "Weniger Entscheidungen aus Intuition. Mehr Rollouts mit echter Validierung.",

  platformLabel: "Vollständige Plattform",
  platformTitle1: "Core + Supply + Dynamik: ", platformTitleHighlight: "die Kombination, die in der Skalierung Sinn ergibt",
  platformDesc: "Eine Gruppe muss Performance analysieren (Core), Einkaufsentscheidungen mit Daten treffen (Supply) und die Karte in Echtzeit aktivieren (Dynamische Intelligenz). Die drei Schichten arbeiten zusammen, damit Wein als steuerbare Geschäftskategorie geführt wird.",
  coreLabel: "Analytik-Schicht",
  coreTitle1: "Winerim Core für ", coreTitleHighlight: "Gruppen",
  coreDesc: "Vergleichen Sie Einheiten, erkennen Sie Performance-Unterschiede, passen Sie Preise an, prognostizieren Sie Verbrauch und entscheiden Sie, welche Referenzen behalten, repliziert oder entfernt werden sollten.",
  coreBullets: [
    "Internes Benchmarking zwischen Einheiten der Gruppe",
    "Erkennung von Preis- und Margenabweichungen pro Standort",
    "Performance-Scoring nach Referenz und Kategorie",
    "Aggregierte Nachfrageprognose nach Standort-Cluster",
    "Simulation von Kartenänderungen vor dem Rollout",
  ],
  coreCta: "Winerim Core ansehen",
  supplyLabel: "Einkaufsintelligenz",
  supplyTitle1: "Winerim Supply für ", supplyTitleHighlight: "Gruppen",
  supplyDesc: "Hilft, Einkäufe je Einheit zu vergleichen, überhöhte Preise zu erkennen, gebundenes Kapital zu prüfen und Einkaufslogik nach Cluster oder Standorttyp aufzubauen.",
  supplyBullets: [
    "Einkäufe je Einheit vergleichen und Ineffizienzen erkennen",
    "Überhöhte Lieferantenpreise gegenüber dem Netzwerk erkennen",
    "Prüfen, welche Referenzen Kapital ohne Rendite binden",
    "Entscheiden, was auf mehr Standorte ausgeweitet und was entfernt wird",
    "Einkaufslogik nach Cluster oder Standorttyp aufbauen",
  ],
  supplyCta: "Winerim Supply ansehen",

  posTitle: "Machen Sie Wein zu einer steuerbaren Geschäftseinheit auf Gruppenebene.",
  posSubtitle: "Was heute oft von Intuition, Tabellen oder ungleichem Urteil zwischen Standorten abhängt, verwandelt Winerim in eine messbare, umsetzbare und skalierbare Gruppenstrategie.",
  posBullets: ["Mehr Multi-Einheiten-Kontrolle", "Mehr kommerzielle Konsistenz", "Mehr Sichtbarkeit über Marge und Rotation", "Bessere Sortimentsentscheidungen", "Weniger Abhängigkeit von individuellem Talent"],
  posCta: "Sehen, wie es für Gruppen funktioniert",

  ctaLabel: "Für Gruppen",
  ctaTitle: "Möchten Sie sehen, welche Weinchancen Ihre Gruppe hat?",
  ctaDesc: "Wir können mehrere Karten oder Einheiten analysieren und zeigen, wo Chancen bei Marge, Rotation, Skalierung, Standardisierung oder kommerzieller Verbesserung liegen.",
  ctaPrimary: "Ich möchte eine Demo für meine Gruppe",
  ctaSecondary: "Mehrere Einheiten analysieren",
  ctaMicro: "Besonders nützlich für Restaurantgruppen, Hotelgruppen und Betreiber mit mehreren Karten, Marken oder Standorten.",

  faqs: [
    { q: "Wie viele Standorte brauche ich für Winerim für Gruppen?", a: "Ab 3 Standorten mit Weinkarte ist der Nutzen klar. Mit jeder zusätzlichen Einheit steigt der Wert, weil Benchmarking und Standardisierung stärker werden." },
    { q: "Kann jeder Standort eine andere Karte haben?", a: "Ja. Winerim erlaubt Basiskarten nach Cluster und lokale Varianten. Sie können ein gemeinsames Core-Sortiment und Anpassungen nach Konzept, Stadt oder Kundentyp kombinieren." },
    { q: "Braucht es an jedem Standort einen Sommelier?", a: "Nein. Winerim enthält erweiterte Profile, automatische Pairings und intelligente Empfehlungen, damit das Serviceteam Wein sicher empfehlen kann." },
    { q: "Integriert sich Winerim mit meinem POS oder PMS?", a: "Ja. Im Enterprise-Plan integriert sich Winerim per API mit führenden POS- und Hotelmanagement-Systemen. Wenn Ihr System nicht auf der Liste steht, prüfen wir es gemeinsam." },
    { q: "Wie lange dauert die Einführung in einer Gruppe?", a: "Die Einführung erfolgt schrittweise. Ein Pilot in 2-3 Standorten kann in weniger als einer Woche aktiviert werden. Der Rollout auf den Rest der Gruppe erfolgt graduell." },
    { q: "Kann ich konsolidiertes Reporting für die Leitung sehen?", a: "Ja. Der Enterprise-Plan umfasst automatisiertes Management-Reporting mit KPIs nach Einheit, Cluster und Gruppe." },
    { q: "Welche Daten kann ich zwischen Standorten vergleichen?", a: "Weinbon, Marge nach Kategorie, Rotation pro Referenz, Anteil der Tische mit Weinbestellung, Preiskonsistenz, Glaswein-Performance und monatliche Entwicklung." },
    { q: "Gibt es eine Mindestlaufzeit?", a: "Nein. Keine Bindung und keine Strafgebühren. Sie können Standorte je nach Bedarf erweitern oder reduzieren." },
  ],

  nextStepsTitle: "Nächste Schritte",
  nextSteps: [
    { to: "/herramientas/auditor-carta-multilocal", label: "Multi-Standort-Karten-Auditor", description: "Vergleichen Sie Konsistenz zwischen Standorten: Sortiment, Preise, Glaswein und Bon.", type: "tool" },
    { to: "/herramientas/calculadora-ticket-medio-vino", label: "Durchschnittsbon-Rechner", description: "Schätzen Sie den Effekt eines besseren Tischanteils und Weinbons.", type: "tool" },
    { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Ratgeber: Weinkarten in Gruppen verwalten", description: "Governance, Benchmarking und zentrale Kontrolle.", type: "guide" },
    { to: "/precios", label: "Winerim Enterprise-Plan", description: "Multi-Standort, POS-Integrationen, SLA und Account Manager.", type: "solution" },
  ],
  internalLinks: [
    { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz: taktische KI für Karten", type: "solution" },
    { to: "/producto/winerim-supply", label: "Winerim Supply: Einkaufsintelligenz für Gruppen", type: "solution" },
    { to: "/producto/winerim-core", label: "Winerim Core: 26 analytische Module", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Intelligente Weinkarten-Software", type: "solution" },
    { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Durchschnittsbon mit Daten steigern", type: "guide" },
    { to: "/wine-list-benchmark", label: "Weinkarten-Benchmark", type: "tool" },
    { to: "/casos-exito", label: "Erfolgsgeschichten realer Restaurants", type: "solution" },
    { to: "/funcionalidades", label: "Alle Winerim-Funktionen", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Ratgeber: Serviceteam schulen", type: "guide" },
    { to: "/comparativas", label: "Winerim mit Alternativen vergleichen", type: "solution" },
  ],
};

const PT: Content = { ...EN,
  metaTitle: "Winerim para Grupos de Restauração | Gestão Centralizada de Vinhos",
  metaDescription: "Centralize a gestão das cartas de vinho, otimize preços e aumente vendas em todos os seus estabelecimentos.",
  badgeLabel: "Grupos de restauração", breadSolutions: "Soluções", breadLabel: "Grupos de restauração",
  heroTitle1: "Gestão inteligente de vinho para ", heroTitleHighlight: "grupos de restauração",
  heroDesc: "Centralize cartas, preços e desempenho de vinho em todos os seus estabelecimentos. Winerim dá a grupos de restauração e hoteleiros uma camada de governo sobre sortido, margem, rotação e coerência comercial.",
  ctaDemo: "Solicitar demonstração", ctaContact: "Falar com um especialista",
  heroSummary: "Winerim para grupos é uma plataforma de gestão, analytics e otimização de vinho desenhada para operadores com vários locais, marcas ou conceitos. Centraliza o controlo de cartas, preços, stock e desempenho do vinho em todas as unidades a partir de um único painel.",

  forLabel: "Para quem é esta solução?", forTitle: "O Winerim é para o seu grupo?",
  forLabel2: "É para si se...", notForLabel: "Provavelmente não é para si se...",
  forItems: [
    "Gere 3 ou mais locais com carta de vinhos",
    "Precisa de coerência de preços e sortido entre unidades",
    "Quer dados comparativos reais entre locais",
    "Procura reduzir a dependência do critério individual",
    "Quer escalar estratégias comprovadas para mais unidades",
    "A sua direção precisa de reporting da categoria vinho",
  ],
  notForItems: [
    "Tem um único restaurante com uma carta contida, com menos de 80 referências",
    "Não precisa de comparar nem normalizar entre locais",
    "Procura apenas um design de carta, sem analytics nem controlo",
  ],

  problemLabel: "O desafio", problemTitle1: "Gerir o vinho como categoria estratégica em ", problemTitleHighlight: "estruturas complexas",
  problems: [
    { text: "Não há visibilidade centralizada sobre que vinhos funcionam, quais ficam parados ou onde se perde margem entre unidades." },
    { text: "O sortido depende do critério individual de cada local: sem normalização, sem benchmarking e sem escalado com critério." },
    { text: "Decisões de compra baseadas em intuição ou relações, não em desempenho real nem em dados comparáveis entre locais." },
    { text: "Cartas que não refletem a estratégia do grupo: incoerência de preços, duplicações e lacunas de oferta por detetar." },
    { text: "O vinho é uma categoria com elevado potencial de margem, mas uma das menos geridas com ferramentas de negócio sérias." },
    { text: "A equipa de sala não tem formação nem ferramentas para recomendar vinho com critério em cada ponto de venda." },
  ],

  painTableLabel: "Comparação", painTableTitle: "Gestão manual vs Winerim para grupos",
  painTableHeaders: ["Área", "Gestão manual / folhas de cálculo", "Com Winerim"],
  painRows: [
    { pain: "Visibilidade multilocal", manual: "Dados dispersos, Excel por local, sem consolidação", winerim: "Painel único com vista comparativa em tempo real" },
    { pain: "Coerência de preços", manual: "Cada diretor ou sommelier aplica o seu critério", winerim: "Regras de preço por tipologia e alertas de desvio" },
    { pain: "Controlo de sortido", manual: "Listas manuais, sem benchmarking entre cartas", winerim: "Comparação de sortido, lacunas, canibalização e escalado" },
    { pain: "Rotação e stock", manual: "Sem alertas, stock morto invisível até ao inventário", winerim: "Alertas automáticos e redistribuição entre locais" },
    { pain: "Formação de sala", manual: "Depende do talento individual, sem ferramentas", winerim: "Fichas, harmonizações e recomendações integradas para a equipa" },
    { pain: "Reporting para direção", manual: "Relatórios manuais, parciais e tardios", winerim: "Reporting executivo automatizado com KPIs por unidade" },
    { pain: "Escalado de estratégias", manual: "Escala-se por intuição, sem validação prévia", winerim: "Piloto, medição e escalado com base em dados reais" },
    { pain: "Implementação", manual: "Não aplicável", winerim: "Progressiva: piloto em 2-3 locais e expansão gradual" },
  ],

  solutionLabel: "A solução", solutionTitle1: "De gerir cartas a ", solutionTitleHighlight: "governar a categoria vinho",
  advantages: [
    { title: "Governo centralizado do sortido", desc: "Uma plataforma para gerir, comparar e otimizar a oferta de vinho em todas as unidades. Controlo real, não apenas visibilidade." },
    { title: "Coerência comercial entre unidades", desc: "Defina estratégias de preços, posicionamento e sortido aplicadas com coerência, sem perder adaptação local." },
    { title: "Benchmarking interno contínuo", desc: "Compare desempenho, rotação, margem e bilhete médio entre locais. Detete o que funciona, onde e porquê." },
    { title: "Decisões de sortido baseadas em dados", desc: "Identifique referências subexploradas, canibalização, lacunas de oferta e oportunidades de escalado com critério." },
    { title: "Experiência profissionalizada para o cliente", desc: "Cartas digitais com recomendações, harmonizações e fichas enriquecidas em todos os pontos de venda do grupo." },
  ],

  capLabel: "Capacidades para grupos", capTitle: "O que o Winerim pode fazer por um grupo",
  capSubtitle: "Uma camada de inteligência para governar o vinho à escala, não como locais isolados.",
  capCards: [
    { title: "Comparar unidades", desc: "Comparar desempenho, rotação, margens e comportamento do vinho entre locais." },
    { title: "Detetar oportunidades invisíveis", desc: "Encontrar referências subexploradas, lacunas de preço, canibalização e stock imobilizado." },
    { title: "Decidir o que replicar", desc: "Identificar que vinhos, formatos ou estratégias vale a pena escalar para o resto do grupo." },
    { title: "Adaptar por tipologia de local", desc: "Não aplicar a mesma lógica a fine dining, casual premium, hotel urbano ou destino turístico." },
    { title: "Profissionalizar a categoria", desc: "Reduzir a dependência do critério individual de cada diretor ou sommelier." },
    { title: "Ativar regras por marca ou unidade", desc: "Definir prioridades diferentes conforme objetivo de negócio, marca, cidade ou tipo de cliente." },
  ],

  benchLabel: "Benchmarking", benchTitle: "Benchmarking interno entre unidades",
  benchSubtitle: "Detete que locais vendem melhor vinho, que estratégias convertem mais e onde existem oportunidades de melhoria ou escalado.",
  benchMetrics: ["Bilhete médio em vinho por unidade", "Margem média por categoria", "Referências com melhor saída", "Vinhos com alta visibilidade e baixa conversão", "Unidades com stock mais saudável", "Diferenças entre cartas comparáveis", "Formatos ou intervalos de preço com melhor desempenho"],
  benchClosing: "Não se trata apenas de ver dados. Trata-se de decidir melhor o que replicar, corrigir e proteger à escala do grupo.",

  featLabel: "Plataforma", featTitle1: "Desenhado para ", featTitleHighlight: "operar à escala",
  features: [
    { title: "Painel multiunidade", desc: "Dashboard central com vista comparativa de todas as unidades. Filtre por marca, cidade, cluster ou conceito." },
    { title: "Atualização centralizada", desc: "Altere preços, ative referências ou retire vinhos em todas as unidades com um clique. Sem depender de cada local." },
    { title: "Analytics comparativos", desc: "Rankings de desempenho, margem e rotação entre unidades. Detete boas práticas e escale-as com critério." },
    { title: "Controlo de preços por estrutura", desc: "Multiplicadores por tipologia de local, alertas de desvio e sugestões de otimização com base no desempenho." },
    { title: "Gestão de garrafeira multilocal", desc: "Stock centralizado ou descentralizado. Alertas de sobrestock, rotação lenta e oportunidades de redistribuição." },
  ],

  trainingLabel: "Formação de sala", trainingTitle: "A sua equipa recomenda vinho com confiança, sem precisar de um sommelier em cada local",
  trainingDesc: "Winerim integra ferramentas que permitem à equipa de sala recomendar vinho de forma profissional, reduzindo a dependência do talento individual e melhorando a experiência do cliente em todos os pontos de venda.",
  trainingItems: [
    "Fichas de vinho enriquecidas acessíveis a partir de qualquer dispositivo",
    "Harmonizações automáticas por prato, estilo ou perfil de cliente",
    "Recomendações inteligentes que a equipa pode seguir passo a passo",
    "Descrição de cada vinho no idioma do cliente",
    "Pontos-chave de venda por referência: o que dizer e o que destacar",
    "Sem necessidade de formação prévia em enologia",
  ],

  measureLabel: "O que pode medir", measureTitle: "KPIs que o Winerim coloca ao seu alcance",
  measureSubtitle: "Dados acionáveis para operações, F&B e direção geral.",
  measureKpis: [
    { label: "Bilhete médio em vinho por unidade", desc: "Compare o gasto médio em vinho por mesa em cada local." },
    { label: "Margem média por categoria de vinho", desc: "Identifique que estilos, regiões ou intervalos de preço geram mais margem." },
    { label: "Rácio de mesas que pedem vinho", desc: "Meça que percentagem de mesas compra vinho e como varia entre locais." },
    { label: "Rotação por referência e unidade", desc: "Detete vinhos parados e referências com alta procura." },
    { label: "Custo de stock imobilizado", desc: "Calcule o capital parado em vinhos sem rotação por local." },
    { label: "Coerência de preços entre unidades", desc: "Detete desvios de preço para o mesmo vinho entre locais." },
    { label: "Desempenho da oferta a copo", desc: "Analise vendas, desperdício e margem do programa de vinho a copo." },
    { label: "Evolução mensal da categoria", desc: "Tendências de vendas, margem e sortido mês a mês." },
  ],

  decisionsLabel: "Que decisões facilita", decisionsTitle: "Decisões de negócio que pode tomar com o Winerim",
  decisions: [
    { title: "Que vinhos manter, retirar ou escalar?", desc: "Com base em rotação, margem e desempenho real por local, não em intuição." },
    { title: "Onde há oportunidades de margem?", desc: "Detete intervalos de preço subexplorados ou categorias com potencial." },
    { title: "Que locais precisam de atenção?", desc: "Identifique unidades com baixo desempenho em vinho face ao benchmark do grupo." },
    { title: "Vale a pena expandir uma referência?", desc: "Faça piloto em 2-3 locais, meça resultados e decida com dados antes de escalar." },
    { title: "Os meus preços estão alinhados com a estratégia?", desc: "Compare multiplicadores, margens e posicionamento entre locais semelhantes." },
    { title: "Que estratégia de vinho a copo implementar?", desc: "Analise estilos, preços, desperdício e rotação para desenhar um programa rentável." },
  ],

  impactLabel: "Impacto", impactTitle1: "O que muda com ", impactTitleHighlight: "Winerim",
  results: [
    { value: "Governo real", desc: "Sobre sortido, margem e coerência comercial em todas as unidades" },
    { value: "Decisões com dados", desc: "Benchmarking interno e desempenho real como base de cada decisão" },
    { value: "Escalado com critério", desc: "Pilotar, medir e expandir estratégias com validação antes de escalar" },
    { value: "Operação global", desc: "Multiidioma, multimarca e multiconceito a partir de um único painel" },
  ],

  scaleLabel: "Escalabilidade", scaleTitle1: "Winerim adapta-se à ", scaleTitleHighlight: "sua estrutura",
  useCases: [
    { size: "3-5 unidades", scenario: "Grupo com conceitos diferenciados: gastronómico, casual e wine bar.", howLabel: "Como opera", how: "Cada unidade tem a sua carta adaptada, mas governada a partir do mesmo painel. Preços e sortido alinhados com o posicionamento de cada conceito.", result: "Coerência de marca sem perder identidade por local." },
    { size: "10-30 unidades", scenario: "Cadeia de restauração organizada com locais em várias cidades.", howLabel: "Como opera", how: "Cartas base por cluster com variações locais. Benchmarking interno para identificar desempenho e replicar estratégias vencedoras.", result: "Menos tempo de gestão, mais controlo sobre margem e rotação." },
    { size: "50+ unidades", scenario: "Grande grupo de restauração ou operador hoteleiro com várias marcas.", howLabel: "Como opera", how: "Integração com ERP e POS. Gestão por clusters, marcas ou regiões. Reporting automatizado para operações e F&B.", result: "Governo completo da categoria vinho à escala da organização." },
  ],

  intelLabel: "Inteligência de sortido",
  intelTitle1: "Decisões de sortido e compra baseadas em ", intelTitleHighlight: "desempenho real",
  intelSubtitle: "Winerim ajuda grupos de restauração e hoteleiros a decidir que referências manter, replicar, impulsionar, retirar ou testar segundo margem, rotação, bilhete médio, tipo de unidade e comportamento real da carta.",
  intelCards: [
    { title: "Inteligência de sortido", desc: "Deteta que estilos, intervalos de preço, formatos e referências funcionam melhor conforme o tipo de unidade, perfil de cliente e contexto operativo." },
    { title: "Benchmarking entre unidades", desc: "Compara locais, identifica diferenças de desempenho e deteta que cartas, vinhos ou estratégias estão a funcionar melhor e onde." },
    { title: "Normalização inteligente", desc: "Permite definir referências core, referências por cluster e vinhos específicos por local sem cair numa uniformidade rígida." },
    { title: "Oportunidades de compra e escalado", desc: "Ajuda a decidir que vinhos vale a pena expandir para mais unidades, quais retirar, quais testar em piloto e onde há oportunidades de margem ou rotação." },
  ],

  pilotTitle: "Teste em poucas unidades. Escale com mais critério.",
  pilotSubtitle: "Antes de estender uma referência, uma estratégia de vinho a copo ou uma lógica de carta a todo o grupo, Winerim ajuda a validar o que está a funcionar e onde faz sentido replicar.",
  pilotSteps: [
    { title: "Pilotar", desc: "Testar referências ou estratégias num conjunto limitado de locais." },
    { title: "Medir", desc: "Analisar margem, rotação, bilhete e conversão real." },
    { title: "Escalar ou corrigir", desc: "Expandir para mais unidades ou ajustar antes de tomar uma decisão de compra maior." },
  ],
  pilotClosing: "Menos decisões baseadas em intuição. Mais implementações com validação real.",

  platformLabel: "Plataforma completa",
  platformTitle1: "Core + Supply + Dinâmica: ", platformTitleHighlight: "a combinação que faz sentido à escala",
  platformDesc: "Um grupo precisa de analisar desempenho (Core), decidir compras com dados (Supply) e ativar a carta em tempo real (Inteligência Dinâmica). As três camadas trabalham juntas para que o vinho seja gerido como uma categoria de negócio governável.",
  coreLabel: "Camada analítica",
  coreTitle1: "Winerim Core para ", coreTitleHighlight: "grupos",
  coreDesc: "Permite comparar unidades, detetar diferenças de desempenho, ajustar preços, prever consumo e decidir que referências vale a pena manter, replicar ou retirar.",
  coreBullets: [
    "Benchmark interno entre unidades do grupo",
    "Deteção de desvios de preço e margem por local",
    "Scoring de desempenho por referência e categoria",
    "Previsão de procura agregada por cluster de locais",
    "Simulação de alterações de carta antes de implementar",
  ],
  coreCta: "Ver Winerim Core",
  supplyLabel: "Inteligência de compras",
  supplyTitle1: "Winerim Supply para ", supplyTitleHighlight: "grupos",
  supplyDesc: "Ajuda a comparar compras por unidade, detetar sobrepreços, rever capital imobilizado e construir lógica de compra por cluster ou tipo de local.",
  supplyBullets: [
    "Comparar compras por unidade e detetar ineficiências",
    "Detetar sobrepreços por fornecedor face à rede",
    "Rever que referências imobilizam capital sem retorno",
    "Decidir o que expandir para mais locais e o que retirar",
    "Construir lógica de compra por cluster ou tipo de local",
  ],
  supplyCta: "Ver Winerim Supply",

  posTitle: "Transforme o vinho numa unidade de negócio governável à escala.",
  posSubtitle: "O que hoje costuma depender de intuição, folhas de cálculo ou critérios desiguais entre locais, o Winerim transforma numa estratégia de grupo mais mensurável, acionável e escalável.",
  posBullets: ["Mais controlo multiunidade", "Mais coerência comercial", "Mais visibilidade sobre margem e rotação", "Melhor tomada de decisão de sortido", "Menos dependência do talento individual"],
  posCta: "Quero ver como funciona para grupos",

  ctaLabel: "Para grupos",
  ctaTitle: "Quer ver que oportunidades o seu grupo tem em vinho?",
  ctaDesc: "Podemos analisar várias cartas ou unidades e mostrar onde existem oportunidades de margem, rotação, escalado, normalização ou melhoria comercial.",
  ctaPrimary: "Quero uma demonstração para o meu grupo",
  ctaSecondary: "Analisar várias unidades",
  ctaMicro: "Especialmente útil para grupos de restauração, hoteleiros e operadores com várias cartas, marcas ou localizações.",

  faqs: [
    { q: "Quantos locais preciso para usar o Winerim para grupos?", a: "A partir de 3 locais com carta de vinhos já faz sentido. O valor cresce com cada unidade adicional porque o benchmarking e a normalização tornam-se mais fortes." },
    { q: "Cada local pode ter uma carta diferente?", a: "Sim. Winerim permite definir cartas base por cluster e variações locais. Pode ter um sortido core comum e adaptações por conceito, cidade ou tipo de cliente." },
    { q: "É preciso um sommelier em cada local?", a: "Não. Winerim inclui fichas enriquecidas, harmonizações automáticas e recomendações inteligentes que permitem à equipa de sala recomendar vinho com confiança." },
    { q: "Integra-se com o meu POS ou PMS?", a: "Sim. No plano Enterprise, Winerim integra-se via API com os principais sistemas de ponto de venda e gestão hoteleira. Se o seu sistema não estiver na lista, avaliamos consigo." },
    { q: "Quanto tempo demora a implementação num grupo?", a: "A implementação é progressiva. O piloto em 2-3 locais pode ser ativado em menos de uma semana. A expansão para o resto do grupo é feita gradualmente." },
    { q: "Posso ver reporting consolidado para direção?", a: "Sim. O plano Enterprise inclui reporting executivo automatizado com KPIs por unidade, cluster e grupo." },
    { q: "Que dados posso comparar entre locais?", a: "Bilhete médio em vinho, margem por categoria, rotação por referência, rácio de mesas que pedem vinho, coerência de preços, desempenho do programa a copo e evolução mensal." },
    { q: "Existe fidelização?", a: "Não. Sem fidelização nem penalizações. Pode escalar ou reduzir locais conforme as suas necessidades." },
  ],

  nextStepsTitle: "Próximos passos",
  nextSteps: [
    { to: "/herramientas/auditor-carta-multilocal", label: "Auditor de carta multilocal", description: "Compare consistência entre locais: sortido, preços, copo e bilhete.", type: "tool" },
    { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de bilhete médio", description: "Estime o impacto de melhorar o rácio de mesas e o bilhete.", type: "tool" },
    { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guia: gerir carta em grupos", description: "Governo, benchmarking e controlo centralizado.", type: "guide" },
    { to: "/precios", label: "Plano Enterprise da Winerim", description: "Multilocal, integrações POS, SLA e account manager.", type: "solution" },
  ],
  internalLinks: [
    { to: "/producto/inteligencia-dinamica", label: "Inteligência dinâmica: IA tática para carta", type: "solution" },
    { to: "/producto/winerim-supply", label: "Winerim Supply: inteligência de compras para grupos", type: "solution" },
    { to: "/producto/winerim-core", label: "Winerim Core: 26 módulos analíticos", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Software de carta de vinhos inteligente", type: "solution" },
    { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Aumentar bilhete médio com dados", type: "guide" },
    { to: "/wine-list-benchmark", label: "Benchmark da carta de vinhos", type: "tool" },
    { to: "/casos-exito", label: "Casos de sucesso de restaurantes reais", type: "solution" },
    { to: "/funcionalidades", label: "Todas as funcionalidades do Winerim", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guia: formar a equipa de sala", type: "guide" },
    { to: "/comparativas", label: "Comparar Winerim com alternativas", type: "solution" },
  ],
};

const content: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR, de: DE, pt: PT };

/* ─── icon maps ─── */
const advantageIcons = [Building2, DollarSign, BarChart3, Wine, Users];
const featureIcons = [Globe, RefreshCw, BarChart3, DollarSign, Warehouse];
const resultIcons = [Layers, TrendingUp, BarChart3, CheckCircle];
const useCaseIcons = [Store, Building2, Globe];
const decisionIcons = [Target, DollarSign, AlertTriangle, Brain, DollarSign, Wine];
const kpiIcons = [BarChart3, DollarSign, Users, RefreshCw, Warehouse, DollarSign, Wine, TrendingUp];

/* ═══════════════════════════════════════════════════════════ */
/* ═══ COMPONENT ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════ */

const GruposRestauracion = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;
  const localizedNextSteps = t.nextSteps.map((step) => ({ ...step, to: localePath(step.to) }));
  const localizedInternalLinks = t.internalLinks.map((link) => ({ ...link, to: localePath(link.to) }));

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "grupos-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.metaTitle,
      description: t.metaDescription,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim Enterprise",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.heroDesc,
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("grupos-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={`${CANONICAL_DOMAIN}${localePath("/soluciones/grupos-restauracion")}`}
        hreflang={allLangPaths("/soluciones/grupos-restauracion")} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadSolutions, href: localePath("/soluciones") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Building2 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badgeLabel}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaDemo} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SUMMARY / DEFINITION ── */}
      <section className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-wine/15 p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">{t.heroSummary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOR / NOT FOR ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.forTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.forLabel2}</p>
                <ul className="space-y-3">
                  {t.forItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.notForLabel}</p>
                <ul className="space-y-3">
                  {t.notForItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.problemTitle1}<span className="text-gradient-wine italic">{t.problemTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN vs SOLUTION TABLE ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.painTableLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.painTableTitle}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left p-4 font-medium text-muted-foreground w-[22%]">{t.painTableHeaders[0]}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground/60 w-[39%]">{t.painTableHeaders[1]}</th>
                    <th className="text-left p-4 font-medium text-wine w-[39%]">{t.painTableHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.painRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-3 pl-4 font-medium text-foreground/80">{row.pain}</td>
                      <td className="p-3 text-muted-foreground/60">{row.manual}</td>
                      <td className="p-3 text-foreground/90">{row.winerim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solutionLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.solutionTitle1}<span className="text-gradient-wine italic">{t.solutionTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.advantages.map((adv, i) => {
              const Icon = advantageIcons[i] || Building2;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CapabilitiesBlock t={t} />
      <BenchmarkingBlock t={t} />

      {/* ── FEATURES ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.featTitle1}<span className="text-gradient-wine italic">{t.featTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {t.features.map((feat, i) => {
              const Icon = featureIcons[i] || Globe;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{feat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRAINING ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.trainingLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.trainingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.trainingDesc}</p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {t.trainingItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <GraduationCap size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN MEASURE ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.measureLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.measureTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.measureSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.measureKpis.map((kpi, i) => {
              const Icon = kpiIcons[i] || BarChart3;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4 h-full">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5">{kpi.label}</p>
                      <p className="text-xs text-muted-foreground">{kpi.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT DECISIONS IT ENABLES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.decisionsLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.decisionsTitle}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.decisions.map((d, i) => {
              const Icon = decisionIcons[i] || Target;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{d.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.impactLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.impactTitle1}<span className="text-gradient-wine italic">{t.impactTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.results.map((r, i) => {
              const Icon = resultIcons[i] || Layers;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <p className="font-heading text-2xl font-bold text-wine mb-1">{r.value}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.scaleLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.scaleTitle1}<span className="text-gradient-wine italic">{t.scaleTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => {
              const Icon = useCaseIcons[i] || Store;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading font-bold">{uc.size}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="bg-wine/5 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-wine mb-1">{uc.howLabel}</p>
                      <p className="text-xs text-muted-foreground">{uc.how}</p>
                    </div>
                    <div className="mt-auto flex items-start gap-2">
                      <Sparkles size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <IntelBlock t={t} />
      <PilotBlock t={t} localePath={localePath} />

      {/* ── 3 CAPAS PARA GRUPOS — INTRO ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
              {t.platformLabel}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.platformTitle1}<span className="text-gradient-wine">{t.platformTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.platformDesc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WINERIM CORE PARA GRUPOS ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-card via-card/95 to-amber-500/5 p-8 md:p-12 overflow-hidden">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <BarChart3 size={20} className="text-amber-500" />
                  </div>
                  <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-amber-500/70">
                    {t.coreLabel}
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  {t.coreTitle1}<span className="text-gradient-wine">{t.coreTitleHighlight}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {t.coreDesc}
                </p>
                <ul className="space-y-3 mb-8">
                  {t.coreBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to={localePath("/producto/winerim-core")} className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors tracking-wider uppercase">
                  {t.coreCta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WINERIM SUPPLY PARA GRUPOS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-card via-card/95 to-emerald-500/5 p-8 md:p-12 overflow-hidden">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Warehouse size={20} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-emerald-500/70">
                    {t.supplyLabel}
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  {t.supplyTitle1}<span className="text-gradient-wine">{t.supplyTitleHighlight}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {t.supplyDesc}
                </p>
                <ul className="space-y-3 mb-8">
                  {t.supplyBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to={localePath("/producto/winerim-supply")} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors tracking-wider uppercase">
                  {t.supplyCta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── POSITIONING ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,hsl(var(--wine)/0.10),transparent_70%)]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl border border-wine/15 bg-gradient-to-br from-card/80 via-card/60 to-wine/[0.03] backdrop-blur-sm p-8 sm:p-12 md:p-16 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">{t.posTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 text-sm sm:text-base">{t.posSubtitle}</p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {t.posBullets.map((b, i) => (
                  <div key={i} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/60 bg-background/40 text-sm font-medium text-foreground/90">
                    <CheckCircle size={14} className="text-wine shrink-0" />{b}
                  </div>
                ))}
              </div>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.posCta} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ── WINERIM SUPPLY ── */}
      <WinerimSupplyBlock />

      {/* ── FAQs ── */}
      <FAQSection faqs={t.faqs} schemaId="grupos-restauracion" />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/contacto")} className="inline-flex items-center justify-center gap-2 border border-border hover:border-wine/30 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:-translate-y-0.5 text-muted-foreground hover:text-foreground">
                  {t.ctaSecondary}
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60 max-w-lg mx-auto">{t.ctaMicro}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decision Center teaser */}
      <DecisionCenterTeaser lang={lang} />

      {/* ── Next Steps ── */}
      <NextSteps
        title={t.nextStepsTitle}
        steps={localizedNextSteps}
      />

      <InternalLinks links={localizedInternalLinks} />

      <Footer />
    </div>
  );
};

export default GruposRestauracion;
