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
import NextSteps from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { CapabilitiesBlock, BenchmarkingBlock, IntelBlock, PilotBlock } from "@/components/groups/GroupStrategyBlocks";
import WinerimSupplyBlock from "@/components/WinerimSupplyBlock";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── types ─── */
type IntelCard = { title: string; desc: string };
type CapCard = { title: string; desc: string };
type PainRow = { pain: string; manual: string; winerim: string };
type DecisionItem = { title: string; desc: string };
type KpiItem = { label: string; desc: string };

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
  /* Positioning */
  posTitle: string; posSubtitle: string; posBullets: string[]; posCta: string;
  /* CTA */
  ctaLabel: string; ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string; ctaMicro: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
};

/* ═══════════════════════════════════════════════════════════ */
/* ═══ SPANISH CONTENT ══════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  metaTitle: "Winerim para Grupos de Restauración y Hoteleros | Control Multiunidad del Vino",
  metaDescription: "Gobierno del surtido, benchmarking interno, estandarización inteligente y decisiones de compra basadas en rendimiento real. Winerim para operadores multiunidad.",
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
    "Tienes un solo restaurante con menos de 30 referencias",
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

const content: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR };

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
  const { lang, localePath } = useLanguage();
  const t = content[lang] || content.es;

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
      <SEOHead title={t.metaTitle} description={t.metaDescription} url="https://winerim.wine/soluciones/grupos-restauracion" />
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
              {lang === "es" ? "Plataforma completa" : "Complete platform"}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {lang === "es"
                ? <>Core + Supply + Dinámica: <span className="text-gradient-wine">la combinación que tiene sentido a escala</span></>
                : <>Core + Supply + Dynamic: <span className="text-gradient-wine">the combination that makes sense at scale</span></>}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lang === "es"
                ? "Un grupo necesita analizar rendimiento (Core), decidir compras con dato (Supply) y activar la carta en tiempo real (Inteligencia Dinámica). Las tres capas trabajan juntas para que el vino se gestione como una categoría de negocio gobernable."
                : "A group needs to analyze performance (Core), make data-driven purchase decisions (Supply), and activate the list in real time (Dynamic Intelligence). The three layers work together so wine is managed as a governable business category."}
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
                    {lang === "es" ? "Capa analítica" : "Analytics layer"}
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  {lang === "es" ? <>Winerim Core para <span className="text-gradient-wine">grupos</span></> : <>Winerim Core for <span className="text-gradient-wine">groups</span></>}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {lang === "es"
                    ? "Permite comparar unidades, detectar diferencias de rendimiento, ajustar pricing, prever consumo y decidir qué referencias merece la pena mantener, replicar o retirar."
                    : "Compare units, detect performance differences, adjust pricing, forecast consumption, and decide which references to keep, replicate or retire."}
                </p>
                <ul className="space-y-3 mb-8">
                  {(lang === "es" ? [
                    "Benchmark interno entre unidades del grupo",
                    "Detección de desviaciones de pricing y margen por local",
                    "Scoring de rendimiento por referencia y categoría",
                    "Previsión de demanda agregada por cluster de locales",
                    "Simulación de cambios de carta antes de desplegar",
                  ] : [
                    "Internal benchmarking across group units",
                    "Pricing and margin deviation detection per venue",
                    "Performance scoring per reference and category",
                    "Aggregated demand forecasting per venue cluster",
                    "Wine list change simulation before deployment",
                  ]).map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/producto/winerim-core" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors tracking-wider uppercase">
                  {lang === "es" ? "Ver Winerim Core" : "See Winerim Core"} <ArrowRight size={14} />
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
                    {lang === "es" ? "Inteligencia de compras" : "Purchasing intelligence"}
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  {lang === "es" ? <>Winerim Supply para <span className="text-gradient-wine">grupos</span></> : <>Winerim Supply for <span className="text-gradient-wine">groups</span></>}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {lang === "es"
                    ? "Ayuda a comparar compras por unidad, detectar sobreprecios, revisar capital inmovilizado y construir lógica de compra por cluster o tipo de local."
                    : "Compare purchases per unit, detect overpricing, review tied-up capital, and build purchasing logic per cluster or venue type."}
                </p>
                <ul className="space-y-3 mb-8">
                  {(lang === "es" ? [
                    "Comparar compras por unidad y detectar ineficiencias",
                    "Detectar sobreprecios por proveedor frente a la red",
                    "Revisar qué referencias inmovilizan capital sin retorno",
                    "Decidir qué expandir a más locales y qué retirar",
                    "Construir lógica de compra por cluster o tipo de local",
                  ] : [
                    "Compare purchases per unit and detect inefficiencies",
                    "Detect supplier overpricing against the network",
                    "Review which references tie up capital without return",
                    "Decide what to expand to more venues and what to retire",
                    "Build purchasing logic per cluster or venue type",
                  ]).map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/producto/winerim-supply" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors tracking-wider uppercase">
                  {lang === "es" ? "Ver Winerim Supply" : "See Winerim Supply"} <ArrowRight size={14} />
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
        title={lang === "es" ? "Siguientes pasos" : "Next steps"}
        steps={[
          { to: "/herramientas/auditor-carta-multilocal", label: lang === "es" ? "Auditor de carta multi-local" : "Multi-location list auditor", description: lang === "es" ? "Compara consistencia entre locales: surtido, pricing, copa y ticket." : "Compare consistency across venues.", type: "tool" },
          { to: "/herramientas/calculadora-ticket-medio-vino", label: lang === "es" ? "Calculadora de ticket medio" : "Average ticket calculator", description: lang === "es" ? "Estima el impacto de mejorar el ratio de mesas y ticket." : "Estimate the impact of improving table ratio and ticket.", type: "tool" },
          { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: lang === "es" ? "Guía: gestionar carta en grupos" : "Guide: managing lists in groups", description: lang === "es" ? "Governance, benchmarking y control centralizado." : "Governance, benchmarking and centralized control.", type: "guide" },
          { to: "/precios", label: lang === "es" ? "Plan Enterprise de Winerim" : "Winerim Enterprise plan", description: lang === "es" ? "Multi-local, integraciones POS, SLA y account manager." : "Multi-location, POS integrations, SLA and account manager.", type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/producto/inteligencia-dinamica"), label: lang === "es" ? "Inteligencia dinámica: IA táctica para carta" : "Dynamic intelligence", type: "solution" },
        { to: "/producto/winerim-supply", label: lang === "es" ? "Winerim Supply: inteligencia de compras para grupos" : "Winerim Supply: purchasing intelligence", type: "solution" },
        { to: "/producto/winerim-core", label: lang === "es" ? "Winerim Core: 26 módulos analíticos" : "Winerim Core: 26 analytical modules", type: "solution" },
        { to: localePath("/software-carta-de-vinos"), label: lang === "es" ? "Software de carta de vinos inteligente" : "Wine list software", type: "solution" },
        { to: localePath("/soluciones/aumentar-ticket-medio-restaurante"), label: lang === "es" ? "Aumentar ticket medio con datos" : "Increase average ticket", type: "guide" },
        { to: localePath("/wine-list-benchmark"), label: "Wine List Benchmark", type: "tool" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito de restaurantes reales" : "Real case studies", type: "solution" },
        { to: localePath("/funcionalidades"), label: lang === "es" ? "Todas las funcionalidades de Winerim" : "All features", type: "solution" },
        { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: lang === "es" ? "Guía: formar al equipo de sala" : "Guide: train floor staff", type: "guide" },
        { to: "/comparativas", label: lang === "es" ? "Compara Winerim con alternativas" : "Compare Winerim", type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default GruposRestauracion;
