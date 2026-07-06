import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Hotel, AlertTriangle, CheckCircle, BarChart3,
  Wine, Users, Globe, Sparkles, X, Check,
  GraduationCap, Target, DollarSign, TrendingUp, Star,
  GlassWater, ConciergeBell, Building2, Layers, RefreshCw,
  ClipboardList
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WinerimSupplyBlock from "@/components/WinerimSupplyBlock";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps, { type NextStep } from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";

/* ─── types ─── */
type PainRow = { area: string; without: string; with_w: string };
type Metric = { label: string; desc: string };
type Decision = { title: string; desc: string };
type InternalLinkItem = { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" };

type Content = {
  metaTitle: string; metaDescription: string;
  badgeLabel: string; breadSolutions: string; breadLabel: string;
  heroTitle1: string; heroTitleHighlight: string;
  heroDesc: string; ctaDemo: string; ctaContact: string;
  heroSummary: string;
  /* For / not for */
  forTitle: string; forLabel: string; notForLabel: string;
  forItems: string[]; notForItems: string[];
  /* Pains */
  painLabel: string; painTitle1: string; painTitleHighlight: string;
  pains: { text: string }[];
  /* Table */
  tableLabel: string; tableTitle: string;
  tableHeaders: [string, string, string];
  tableRows: PainRow[];
  /* Solution */
  solLabel: string; solTitle1: string; solTitleHighlight: string;
  advantages: { title: string; desc: string }[];
  /* Touchpoints */
  tpLabel: string; tpTitle: string;
  touchpoints: { title: string; desc: string }[];
  /* Training */
  trainLabel: string; trainTitle: string; trainDesc: string;
  trainItems: string[];
  /* Metrics */
  mLabel: string; mTitle: string; mSubtitle: string;
  metrics: Metric[];
  /* Decisions */
  dLabel: string; dTitle: string;
  decisions: Decision[];
  /* Premium */
  premLabel: string; premTitle: string; premDesc: string;
  premItems: string[];
  /* Capabilities */
  doesLabel: string; doesTitle: string;
  doesItems: string[]; doesNotLabel: string; doesNotItems: string[];
  /* CTA */
  ctaLabel: string; ctaTitle: string; ctaDesc: string;
  ctaPrimary: string; ctaSecondary: string; ctaMicro: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
  /* SEO links */
  nextStepsTitle: string; nextSteps: NextStep[];
  internalLinks: InternalLinkItem[];
};

/* ═══════════════════════════════════════════════════════════ */
/*  SPANISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  metaTitle: "Winerim para Hoteles | Carta de Vinos Inteligente para F&B Hotelero",
  metaDescription: "Optimiza la oferta de vino en restaurantes, bares, lounges y room service de tu hotel. Carta digital multiidioma con IA, analítica y formación de sala.",
  badgeLabel: "Hospitality premium", breadSolutions: "Soluciones", breadLabel: "Hoteles",
  heroTitle1: "El vino en tu hotel, gestionado como una ", heroTitleHighlight: "categoría premium",
  heroDesc: "Winerim ayuda a hoteles a profesionalizar la oferta de vino en todos los puntos de venta: restaurante, bar, lounge y room service. Carta digital multiidioma, recomendaciones con IA y analítica para dirección de F&B.",
  ctaDemo: "Solicitar demo para mi hotel", ctaContact: "Hablar con un especialista",
  heroSummary: "Winerim para hoteles es una solución de gestión, recomendación y analítica del vino diseñada para operadores hoteleros. Permite centralizar la carta de vinos, estandarizar la experiencia del huésped, formar al equipo de sala y obtener datos de rendimiento reales en cada punto de servicio del hotel.",

  forTitle: "¿Es Winerim para tu hotel?", forLabel: "Es para ti si...", notForLabel: "Probablemente no es para ti si...",
  forItems: [
    "Tienes restaurante, bar o lounge con carta de vinos",
    "Recibes huéspedes internacionales que necesitan la carta en su idioma",
    "Quieres elevar la experiencia de vino sin depender de un sumiller 24/7",
    "Necesitas coherencia de oferta y pricing entre puntos de venta",
    "Tu dirección de F&B necesita datos de rendimiento del vino",
    "Buscas diferenciarte con una experiencia premium digitalizada",
  ],
  notForItems: [
    "Tu hotel no tiene servicio de restauración ni bar con vinos",
    "No necesitas carta digital ni analítica de la categoría vino",
    "Solo buscas un listado PDF sin funcionalidades de gestión",
  ],

  painLabel: "El reto", painTitle1: "El vino en hospitality: alto potencial, ", painTitleHighlight: "baja gestión",
  pains: [
    { text: "El vino es la categoría con más margen potencial en F&B, pero la que menos herramientas de gestión tiene en la mayoría de hoteles." },
    { text: "Huéspedes internacionales no entienden la carta de vinos si no está en su idioma, y piden 'lo más seguro' o directamente no piden vino." },
    { text: "Cada punto de venta (restaurante, bar, rooftop, room service) opera con criterios distintos: pricing, surtido y presentación inconsistentes." },
    { text: "El equipo de sala rota frecuentemente y no tiene formación ni herramientas para recomendar vino con confianza." },
    { text: "No hay datos consolidados del rendimiento del vino: qué se vende, qué se estanca, qué margen genera cada referencia." },
    { text: "La experiencia del vino no está a la altura del posicionamiento del hotel: cartas desactualizadas, presentación genérica, sin personalización." },
  ],

  tableLabel: "Comparativa", tableTitle: "Gestión tradicional vs Winerim en hoteles",
  tableHeaders: ["Área", "Sin Winerim", "Con Winerim"],
  tableRows: [
    { area: "Carta de vinos", without: "PDF o cartilla impresa, desactualizada", with_w: "Carta digital interactiva, actualizada en tiempo real" },
    { area: "Idiomas", without: "Carta solo en 1-2 idiomas o mal traducida", with_w: "Multiidioma automático en el idioma del huésped" },
    { area: "Recomendaciones", without: "Dependen del conocimiento del camarero", with_w: "IA que sugiere por plato, perfil o momento" },
    { area: "Consistencia entre outlets", without: "Cada punto de venta opera por su cuenta", with_w: "Surtido y pricing gobernados desde un panel central" },
    { area: "Formación de sala", without: "Depende del talento individual, sin soporte", with_w: "Fichas, maridajes y puntos clave accesibles al equipo" },
    { area: "Analítica de vino", without: "Sin datos o informes manuales tardíos", with_w: "KPIs en tiempo real por punto de venta y referencia" },
    { area: "Room service", without: "Carta limitada, sin contexto ni maridaje", with_w: "Experiencia digital con recomendaciones personalizadas" },
    { area: "Experiencia premium", without: "Genérica, no diferenciadora", with_w: "Personalizada, multiidioma, alineada con el posicionamiento" },
  ],

  solLabel: "La solución", solTitle1: "Una capa de inteligencia para el vino en ", solTitleHighlight: "cada punto de servicio",
  advantages: [
    { title: "Carta digital premium multiidioma", desc: "El huésped ve la carta en su idioma con fichas enriquecidas, notas de cata, maridajes y recomendaciones. Experiencia a la altura del hotel." },
    { title: "Consistencia entre outlets", desc: "Gestiona surtido, pricing y presentación desde un panel central para restaurante, bar, lounge y room service." },
    { title: "Recomendaciones inteligentes", desc: "IA que sugiere vinos por plato, perfil del huésped o momento del día. Más ventas, mejor experiencia." },
    { title: "Analítica para dirección de F&B", desc: "Datos reales de rendimiento por punto de venta, referencia, categoría y periodo. Reporting ejecutivo automatizado." },
    { title: "Formación integrada para el equipo", desc: "El personal recomienda vino con confianza gracias a fichas, maridajes y puntos clave de venta accesibles desde cualquier dispositivo." },
  ],

  tpLabel: "Puntos de servicio", tpTitle: "Winerim en cada touchpoint del hotel",
  touchpoints: [
    { title: "Restaurante del hotel", desc: "Carta digital completa con maridajes por plato, fichas de vino y recomendaciones inteligentes. Eleva ticket medio y experiencia." },
    { title: "Bar y lounge", desc: "Selección curada de vinos por copa con descripciones accesibles. Ideal para huéspedes que quieren explorar sin comprometerse con una botella." },
    { title: "Rooftop y terraza", desc: "Carta adaptada al contexto: vinos frescos, espumosos y selección estacional con presentación visual premium." },
    { title: "Room service", desc: "Experiencia digital que permite al huésped elegir vino con información completa desde la habitación. Maridajes con el menú de room service." },
    { title: "Eventos y salones", desc: "Propuestas de vino por evento, presupuesto o estilo. Gestión de la oferta para banquetes, cócteles y cenas privadas." },
    { title: "Wine bar o enoteca", desc: "Gestión avanzada del programa de vino por copa: rotación, merma, pricing y análisis de rendimiento por servicio." },
  ],

  trainLabel: "Formación de sala", trainTitle: "Tu equipo recomienda vino con confianza, sin formación previa en enología",
  trainDesc: "En hospitality, la rotación de personal es alta y no siempre hay un sumiller disponible. Winerim equipa al equipo de sala con las herramientas para recomendar vino de forma profesional en cada turno.",
  trainItems: [
    "Fichas de vino con notas de cata, origen y estilo en lenguaje claro",
    "Maridajes automáticos por plato del menú del hotel",
    "Recomendaciones paso a paso que cualquier camarero puede seguir",
    "Descripción en el idioma del huésped para servicio internacional",
    "Puntos clave de venta por referencia: qué decir, cómo presentarlo",
    "Sin necesidad de formación previa en vino",
  ],

  mLabel: "Qué puedes medir", mTitle: "KPIs de vino para dirección de F&B", mSubtitle: "Datos accionables para tomar mejores decisiones sobre la categoría vino en tu hotel.",
  metrics: [
    { label: "Ticket medio en vino por outlet", desc: "Compara el gasto medio en vino por punto de servicio." },
    { label: "Margen por categoría y referencia", desc: "Identifica qué estilos o rangos de precio generan más margen." },
    { label: "Ratio de mesas que piden vino", desc: "Mide qué porcentaje de huéspedes consume vino en cada outlet." },
    { label: "Rotación por referencia", desc: "Detecta vinos estancados y referencias con alta demanda." },
    { label: "Rendimiento del programa de copa", desc: "Ventas, merma y margen del vino por copa en cada punto." },
    { label: "Coherencia de pricing entre outlets", desc: "Detecta desviaciones de precio para el mismo vino entre outlets." },
    { label: "Coste de stock inmovilizado", desc: "Calcula el capital parado en vinos sin rotación." },
    { label: "Evolución mensual de la categoría", desc: "Tendencias de ventas, margen y surtido mes a mes." },
  ],

  dLabel: "Qué decisiones facilita", dTitle: "Decisiones que Winerim pone sobre la mesa",
  decisions: [
    { title: "¿Qué vinos mantener o retirar en cada outlet?", desc: "Basado en rotación, margen y rendimiento real, no en intuición." },
    { title: "¿El programa de copa es rentable?", desc: "Analiza merma, rotación y margen para optimizar la selección de copa." },
    { title: "¿Hay oportunidades de margen?", desc: "Detecta rangos de precio infraexplotados o categorías con potencial." },
    { title: "¿Está el pricing alineado entre outlets?", desc: "Compara multiplicadores y márgenes entre restaurante, bar y room service." },
    { title: "¿Qué outlet necesita atención?", desc: "Identifica puntos de venta con bajo rendimiento en vino." },
    { title: "¿Qué referencia escalar a más outlets?", desc: "Pilota un vino en un outlet, mide y decide si expandirlo." },
  ],

  premLabel: "Hospitality premium", premTitle: "Por qué Winerim encaja especialmente bien en hoteles",
  premDesc: "El vino es una de las pocas categorías en F&B donde la experiencia del cliente y el margen del negocio crecen juntos. Winerim está diseñado para ese punto exacto.",
  premItems: [
    "Multiidioma nativo: el huésped ve la carta en su idioma sin esfuerzo",
    "Experiencia digital premium alineada con el posicionamiento del hotel",
    "Recomendaciones que elevan el ticket sin presión comercial",
    "Formación de sala que reduce dependencia de talento individual",
    "Consistencia de experiencia entre restaurante, bar, lounge y room service",
    "Analítica que permite a F&B gobernar la categoría vino con datos reales",
    "Sin necesidad de un sumiller permanente en cada punto de servicio",
    "Implantación progresiva sin disrupciones operativas",
  ],

  doesLabel: "Qué hace / Qué no hace", doesTitle: "Winerim en hoteles: transparencia total",
  doesItems: [
    "Gestiona y optimiza la carta de vinos en todos los outlets del hotel",
    "Ofrece recomendaciones inteligentes al huésped por plato, estilo o momento",
    "Traduce automáticamente la carta al idioma del huésped",
    "Proporciona fichas, maridajes y puntos clave de venta al equipo de sala",
    "Genera analítica real por outlet, referencia y periodo",
    "Se integra con PMS y POS hoteleros vía API",
  ],
  doesNotLabel: "Qué no hace",
  doesNotItems: [
    "No sustituye la estrategia de F&B ni la toma de decisiones humana",
    "No gestiona inventario de cocina, solo la categoría vino",
    "No es un POS ni un PMS: se integra con los sistemas existentes",
  ],

  ctaLabel: "Para hoteles",
  ctaTitle: "¿Quieres profesionalizar el vino en tu hotel?",
  ctaDesc: "Podemos analizar tu oferta actual de vino y mostrarte dónde hay oportunidades de margen, experiencia y eficiencia operativa.",
  ctaPrimary: "Quiero una demo para mi hotel", ctaSecondary: "Analizar mi carta de vinos",
  ctaMicro: "Especialmente útil para hoteles 4★ y 5★, resorts, boutique hotels y cadenas hoteleras con F&B activo.",

  faqs: [
    { q: "¿Winerim funciona para hoteles con varios restaurantes y bares?", a: "Sí. Puedes gestionar cada outlet de forma independiente o centralizada desde un solo panel: restaurante, bar, lounge, rooftop y room service." },
    { q: "¿Hace falta un sumiller en cada punto de servicio?", a: "No. Winerim incluye fichas enriquecidas, maridajes automáticos y recomendaciones que permiten al personal de sala recomendar vino con confianza, sin formación previa en enología." },
    { q: "¿La carta se muestra en el idioma del huésped?", a: "Sí. La carta se presenta automáticamente en el idioma del huésped. Actualmente soporta español, inglés, italiano y francés, con más idiomas en desarrollo." },
    { q: "¿Se integra con nuestro PMS o POS hotelero?", a: "Sí. En el plan Enterprise, Winerim se integra con los principales PMS y POS hoteleros vía API. Si tu sistema no está en la lista, lo evaluamos contigo." },
    { q: "¿Cuánto tarda la implantación?", a: "El piloto se activa en menos de una semana. El despliegue a más outlets se hace de forma gradual, sin disrupciones operativas." },
    { q: "¿Puedo gestionar room service con Winerim?", a: "Sí. El huésped puede explorar la carta de vinos desde un dispositivo en la habitación con recomendaciones personalizadas y maridajes con el menú de room service." },
    { q: "¿Qué datos puedo ver como director de F&B?", a: "Ticket medio en vino por outlet, margen por categoría, rotación por referencia, ratio de mesas con vino, rendimiento del programa de copa, coherencia de pricing y evolución mensual." },
    { q: "¿Hay permanencia?", a: "No. Sin permanencia ni penalizaciones. Puedes escalar o reducir outlets según tus necesidades." },
  ],

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { to: "/analisis-carta", label: "Analiza tu carta de vinos", description: "Diagnóstico gratuito con recomendaciones accionables.", type: "tool" },
    { to: "/precios", label: "Planes y precios", description: "Plan Enterprise con integraciones PMS/POS y soporte dedicado.", type: "solution" },
    { to: "/soluciones/grupos-restauracion", label: "Solución para grupos", description: "Si gestionas múltiples hoteles o marcas.", type: "solution" },
    { to: "/funcionalidades", label: "Todas las funcionalidades", description: "Carta, IA, stock, analítica, integraciones.", type: "solution" },
  ],
  internalLinks: [
    { to: "/soluciones/grupos-restauracion", label: "Solución para grupos de restauración", type: "solution" },
    { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica: IA táctica", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
    { to: "/integraciones", label: "Integraciones POS y PMS", type: "solution" },
    { to: "/vino-por-copa", label: "Estrategia de vino por copa", type: "guide" },
    { to: "/casos-exito", label: "Casos de éxito", type: "solution" },
    { to: "/comparativas", label: "Compara Winerim con alternativas", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guía: formar al equipo de sala", type: "guide" },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
/*  ENGLISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const EN: Content = {
  metaTitle: "Winerim for Hotels | Smart Wine List for Hotel F&B",
  metaDescription: "Optimize wine across your hotel's restaurants, bars, lounges and room service. Multi-language digital wine list with AI recommendations and F&B analytics.",
  badgeLabel: "Premium hospitality", breadSolutions: "Solutions", breadLabel: "Hotels",
  heroTitle1: "Wine in your hotel, managed as a ", heroTitleHighlight: "premium category",
  heroDesc: "Winerim helps hotels professionalize wine across every touchpoint: restaurant, bar, lounge and room service. Multi-language digital list, AI recommendations and F&B analytics.",
  ctaDemo: "Request hotel demo", ctaContact: "Talk to a specialist",
  heroSummary: "Winerim for hotels is a wine management, recommendation and analytics solution designed for hotel operators. Centralize wine lists, standardize guest experience, train floor staff and get real performance data at every service point.",

  forTitle: "Is Winerim right for your hotel?", forLabel: "It's for you if...", notForLabel: "Probably not for you if...",
  forItems: [
    "You have a restaurant, bar or lounge with a wine list",
    "You serve international guests who need the list in their language",
    "You want to elevate wine experience without a sommelier 24/7",
    "You need consistent offer and pricing across outlets",
    "Your F&B management needs wine performance data",
    "You want to differentiate with a premium digital experience",
  ],
  notForItems: [
    "Your hotel has no F&B service or wine program",
    "You don't need a digital list or wine analytics",
    "You only need a static PDF list without management features",
  ],

  painLabel: "The challenge", painTitle1: "Wine in hospitality: high potential, ", painTitleHighlight: "low management",
  pains: [
    { text: "Wine is the highest-margin F&B category, yet the least managed with proper tools in most hotels." },
    { text: "International guests can't understand the wine list if not in their language, defaulting to 'the safe choice' or skipping wine altogether." },
    { text: "Each outlet (restaurant, bar, rooftop, room service) operates with different criteria: inconsistent pricing, assortment and presentation." },
    { text: "Floor staff rotates frequently and lacks training or tools to recommend wine confidently." },
    { text: "No consolidated data on wine performance: what sells, what stagnates, what margin each reference generates." },
    { text: "The wine experience doesn't match the hotel's positioning: outdated lists, generic presentation, no personalization." },
  ],

  tableLabel: "Comparison", tableTitle: "Traditional management vs Winerim in hotels",
  tableHeaders: ["Area", "Without Winerim", "With Winerim"],
  tableRows: [
    { area: "Wine list", without: "Printed PDF, outdated", with_w: "Interactive digital list, real-time updates" },
    { area: "Languages", without: "1-2 languages or poor translations", with_w: "Automatic multi-language in guest's language" },
    { area: "Recommendations", without: "Depend on waiter's knowledge", with_w: "AI suggestions by dish, profile or moment" },
    { area: "Outlet consistency", without: "Each outlet operates independently", with_w: "Assortment and pricing governed from a central panel" },
    { area: "Floor training", without: "Depends on individual talent", with_w: "Profiles, pairings and selling points for the team" },
    { area: "Wine analytics", without: "No data or late manual reports", with_w: "Real-time KPIs by outlet and reference" },
    { area: "Room service", without: "Limited list, no context", with_w: "Digital experience with personalized recommendations" },
    { area: "Premium experience", without: "Generic, undifferentiated", with_w: "Personalized, multi-language, aligned with positioning" },
  ],

  solLabel: "The solution", solTitle1: "An intelligence layer for wine at ", solTitleHighlight: "every service point",
  advantages: [
    { title: "Premium multi-language digital list", desc: "Guests see the list in their language with enriched profiles, tasting notes, pairings and recommendations." },
    { title: "Outlet consistency", desc: "Manage assortment, pricing and presentation from a central panel across all service points." },
    { title: "Smart recommendations", desc: "AI suggestions by dish, guest profile or time of day. More sales, better experience." },
    { title: "F&B management analytics", desc: "Real performance data by outlet, reference, category and period. Automated executive reporting." },
    { title: "Integrated team training", desc: "Staff recommends wine confidently with profiles, pairings and selling points accessible from any device." },
  ],

  tpLabel: "Service points", tpTitle: "Winerim at every hotel touchpoint",
  touchpoints: [
    { title: "Hotel restaurant", desc: "Complete digital list with dish pairings, wine profiles and smart recommendations." },
    { title: "Bar and lounge", desc: "Curated by-the-glass selection with accessible descriptions for exploring guests." },
    { title: "Rooftop and terrace", desc: "Context-adapted list: fresh wines, sparkling and seasonal selection with premium presentation." },
    { title: "Room service", desc: "Digital experience for choosing wine with full information from the room." },
    { title: "Events and banquets", desc: "Wine proposals by event, budget or style for private dinners and cocktails." },
    { title: "Wine bar or enoteca", desc: "Advanced by-the-glass management: rotation, waste, pricing and service performance." },
  ],

  trainLabel: "Floor training", trainTitle: "Your team recommends wine confidently, without prior wine training",
  trainDesc: "In hospitality, staff turnover is high and a sommelier isn't always available. Winerim equips your floor team with the tools to recommend wine professionally on every shift.",
  trainItems: [
    "Wine profiles with tasting notes, origin and style in clear language",
    "Automatic pairings with the hotel's menu",
    "Step-by-step recommendations any waiter can follow",
    "Descriptions in the guest's language for international service",
    "Key selling points per reference: what to say, how to present",
    "No prior wine training required",
  ],

  mLabel: "What you can measure", mTitle: "Wine KPIs for F&B management", mSubtitle: "Actionable data for better wine category decisions at your hotel.",
  metrics: [
    { label: "Average wine ticket per outlet", desc: "Compare average wine spend per service point." },
    { label: "Margin by category and reference", desc: "Identify which styles or price ranges generate the most margin." },
    { label: "Ratio of tables ordering wine", desc: "Measure what percentage of guests order wine at each outlet." },
    { label: "Rotation per reference", desc: "Detect stagnant wines and high-demand references." },
    { label: "By-the-glass program performance", desc: "Sales, waste and margin per glass at each point." },
    { label: "Pricing consistency across outlets", desc: "Detect price deviations for the same wine between outlets." },
    { label: "Immobilized stock cost", desc: "Calculate capital tied up in non-rotating wines." },
    { label: "Monthly category evolution", desc: "Sales, margin and assortment trends month over month." },
  ],

  dLabel: "What decisions it enables", dTitle: "Decisions Winerim puts on the table",
  decisions: [
    { title: "Which wines to keep or retire at each outlet?", desc: "Based on rotation, margin and real performance." },
    { title: "Is the glass program profitable?", desc: "Analyze waste, rotation and margin to optimize the selection." },
    { title: "Where are margin opportunities?", desc: "Detect underexploited price ranges or high-potential categories." },
    { title: "Is pricing aligned across outlets?", desc: "Compare multipliers and margins between restaurant, bar and room service." },
    { title: "Which outlet needs attention?", desc: "Identify service points with low wine performance." },
    { title: "Scale a reference to more outlets?", desc: "Pilot a wine at one outlet, measure and decide whether to expand." },
  ],

  premLabel: "Premium hospitality", premTitle: "Why Winerim fits hotels especially well",
  premDesc: "Wine is one of the few F&B categories where guest experience and business margin grow together. Winerim is designed for that exact point.",
  premItems: [
    "Native multi-language: guests see the list in their language effortlessly",
    "Premium digital experience aligned with the hotel's positioning",
    "Recommendations that elevate ticket without commercial pressure",
    "Floor training that reduces dependence on individual talent",
    "Consistent experience across restaurant, bar, lounge and room service",
    "Analytics that let F&B govern the wine category with real data",
    "No permanent sommelier needed at every service point",
    "Progressive implementation without operational disruptions",
  ],

  doesLabel: "What it does / doesn't", doesTitle: "Winerim in hotels: full transparency",
  doesItems: [
    "Manages and optimizes the wine list across all hotel outlets",
    "Offers smart recommendations to guests by dish, style or moment",
    "Automatically translates the list to the guest's language",
    "Provides profiles, pairings and selling points to floor staff",
    "Generates real analytics by outlet, reference and period",
    "Integrates with hotel PMS and POS via API",
  ],
  doesNotLabel: "What it doesn't do",
  doesNotItems: [
    "Does not replace F&B strategy or human decision-making",
    "Does not manage kitchen inventory, only the wine category",
    "Is not a POS or PMS: it integrates with existing systems",
  ],

  ctaLabel: "For hotels", ctaTitle: "Want to professionalize wine at your hotel?",
  ctaDesc: "We can analyze your current wine offer and show you where opportunities lie in margin, experience and operational efficiency.",
  ctaPrimary: "I want a demo for my hotel", ctaSecondary: "Analyze my wine list",
  ctaMicro: "Especially useful for 4★ and 5★ hotels, resorts, boutique hotels and hotel chains with active F&B.",

  faqs: [
    { q: "Does Winerim work for hotels with multiple restaurants and bars?", a: "Yes. You can manage each outlet independently or centrally from a single panel." },
    { q: "Do I need a sommelier at each service point?", a: "No. Winerim includes enriched profiles, automatic pairings and smart recommendations for confident service without prior wine training." },
    { q: "Is the list shown in the guest's language?", a: "Yes. Automatically in Spanish, English, Italian and French, with more languages in development." },
    { q: "Does it integrate with our PMS or POS?", a: "Yes. Enterprise integrates with major hotel PMS and POS systems via API." },
    { q: "How long does implementation take?", a: "Pilot activates in under a week. Gradual rollout to more outlets without disruptions." },
    { q: "Can I manage room service with Winerim?", a: "Yes. Guests explore the wine list digitally from their room with personalized recommendations." },
    { q: "What data can I see as F&B director?", a: "Wine ticket per outlet, margin by category, rotation, tables ordering wine, glass performance, pricing consistency and monthly trends." },
    { q: "Is there a lock-in?", a: "No. No lock-in or penalties. Scale outlets up or down as needed." },
  ],

  nextStepsTitle: "Next steps",
  nextSteps: [
    { to: "/analisis-carta", label: "Analyze your wine list", description: "Free diagnosis with actionable recommendations.", type: "tool" },
    { to: "/precios", label: "Plans and pricing", description: "Enterprise plan with PMS/POS integrations and dedicated support.", type: "solution" },
    { to: "/soluciones/grupos-restauracion", label: "Solution for groups", description: "If you manage multiple hotels or brands.", type: "solution" },
    { to: "/funcionalidades", label: "All features", description: "List, AI, stock, analytics, integrations.", type: "solution" },
  ],
  internalLinks: [
    { to: "/soluciones/grupos-restauracion", label: "Solution for restaurant groups", type: "solution" },
    { to: "/producto/inteligencia-dinamica", label: "Dynamic intelligence", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Wine list software", type: "solution" },
    { to: "/integraciones", label: "POS & PMS integrations", type: "solution" },
    { to: "/vino-por-copa", label: "By-the-glass strategy", type: "guide" },
    { to: "/casos-exito", label: "Case studies", type: "solution" },
    { to: "/comparativas", label: "Compare Winerim", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guide: train floor staff", type: "guide" },
  ],
};

const IT: Content = { ...EN,
  metaTitle: "Winerim per Hotel | Carta dei Vini Intelligente per F&B Alberghiero",
  metaDescription: "Ottimizza il vino in ristoranti, bar, lounge e room service del tuo hotel. Carta digitale multilingue con IA e analytics.",
  badgeLabel: "Hospitality premium", breadSolutions: "Soluzioni", breadLabel: "Hotel",
  heroTitle1: "Il vino nel tuo hotel, gestito come ", heroTitleHighlight: "categoria premium",
  heroDesc: "Winerim aiuta gli hotel a professionalizzare l'offerta di vino in ogni punto di servizio.",
  ctaDemo: "Richiedi demo", ctaContact: "Parla con uno specialista",
  ctaPrimary: "Voglio una demo per il mio hotel", ctaSecondary: "Analizzare la mia carta",
};

const FR: Content = { ...EN,
  metaTitle: "Winerim pour Hôtels | Carte des Vins Intelligente pour F&B Hôtelier",
  metaDescription: "Optimisez le vin dans les restaurants, bars, lounges et room service de votre hôtel. Carte digitale multilingue avec IA et analytique.",
  badgeLabel: "Hospitality premium", breadSolutions: "Solutions", breadLabel: "Hôtels",
  heroTitle1: "Le vin dans votre hôtel, géré comme une ", heroTitleHighlight: "catégorie premium",
  heroDesc: "Winerim aide les hôtels à professionnaliser l'offre de vin à chaque point de service.",
  ctaDemo: "Demander une démo", ctaContact: "Parler à un spécialiste",
  ctaPrimary: "Je veux une démo pour mon hôtel", ctaSecondary: "Analyser ma carte",
};

const DE: Content = { ...EN,
  metaTitle: "Winerim für Hotels | Intelligente Weinkarte für Gastronomie",
  metaDescription: "Optimieren Sie Wein in Restaurants, Bars, Lounges und Zimmerservice Ihres Hotels. Mehrsprachige digitale Karte mit KI und Analytik.",
  badgeLabel: "Premium-Hospitality", breadSolutions: "Lösungen", breadLabel: "Hotels",
  heroTitle1: "Wein in Ihrem Hotel verwaltet als ", heroTitleHighlight: "Premium-Kategorie",
  heroDesc: "Winerim hilft Hotels, das Weinangebot an allen Servicepunkten zu professionalisieren: Restaurant, Bar, Lounge und Zimmerservice. Mehrsprachige digitale Karte, KI-Empfehlungen und Analytics für die F&B-Leitung.",
  ctaDemo: "Demo anfragen", ctaContact: "Mit Spezialisten sprechen",
  heroSummary: "Winerim für Hotels ist eine Lösung für Weinmanagement, Empfehlungen und Analytics, entwickelt für Hotelbetreiber. Sie zentralisiert Weinkarten, standardisiert das Gästeerlebnis, schult Serviceteams und liefert echte Performance-Daten an jedem Servicepunkt des Hotels.",

  forTitle: "Ist Winerim das Richtige für Ihr Hotel?", forLabel: "Geeignet für Sie, wenn...", notForLabel: "Wahrscheinlich nicht geeignet, wenn...",
  forItems: [
    "Sie ein Restaurant, eine Bar oder Lounge mit Weinkarte betreiben",
    "Sie internationale Gäste empfangen, die die Karte in ihrer Sprache brauchen",
    "Sie das Weinerlebnis ohne 24/7-Sommelier aufwerten möchten",
    "Sie Angebot und Preise über mehrere Outlets konsistent halten müssen",
    "Ihre F&B-Leitung echte Performance-Daten zur Weinkategorie braucht",
    "Sie sich mit einem hochwertigen digitalen Erlebnis differenzieren möchten",
  ],
  notForItems: [
    "Ihr Hotel hat keinen Gastronomie- oder Barservice mit Weinangebot",
    "Sie brauchen keine digitale Karte und keine Analytics zur Weinkategorie",
    "Sie suchen nur eine statische PDF-Liste ohne Managementfunktionen",
  ],

  painLabel: "Die Herausforderung", painTitle1: "Wein in der Hospitality: hohes Potenzial, ", painTitleHighlight: "wenig Management",
  pains: [
    { text: "Wein ist eine F&B-Kategorie mit hohem Margenpotenzial, wird in vielen Hotels aber mit zu wenigen Management-Tools gesteuert." },
    { text: "Internationale Gäste verstehen die Weinkarte nicht, wenn sie nicht in ihrer Sprache verfügbar ist, und wählen dann das Sichere oder bestellen gar keinen Wein." },
    { text: "Jeder Servicepunkt - Restaurant, Bar, Rooftop oder Zimmerservice - arbeitet mit eigenen Kriterien: Preise, Sortiment und Präsentation werden inkonsistent." },
    { text: "Serviceteams wechseln häufig und haben oft weder Schulung noch Hilfsmittel, um Wein sicher zu empfehlen." },
    { text: "Es fehlen konsolidierte Daten zur Wein-Performance: was verkauft sich, was bleibt stehen und welche Marge bringt jede Referenz." },
    { text: "Das Weinerlebnis passt nicht immer zum Positioning des Hotels: veraltete Karten, generische Präsentation und wenig Personalisierung." },
  ],

  tableLabel: "Vergleich", tableTitle: "Traditionelles Management vs. Winerim in Hotels",
  tableHeaders: ["Bereich", "Ohne Winerim", "Mit Winerim"],
  tableRows: [
    { area: "Weinkarte", without: "PDF oder gedruckte Karte, schnell veraltet", with_w: "Interaktive digitale Karte mit Aktualisierung in Echtzeit" },
    { area: "Sprachen", without: "Nur 1-2 Sprachen oder ungenaue Übersetzungen", with_w: "Automatisch mehrsprachig in der Sprache des Gastes" },
    { area: "Empfehlungen", without: "Abhängig vom Wissen einzelner Mitarbeitender", with_w: "KI-Empfehlungen nach Gericht, Profil oder Anlass" },
    { area: "Konsistenz zwischen Outlets", without: "Jeder Servicepunkt arbeitet eigenständig", with_w: "Sortiment und Pricing werden zentral gesteuert" },
    { area: "Serviceschulung", without: "Abhängig vom individuellen Talent, ohne Unterstützung", with_w: "Profile, Pairings und Verkaufspunkte für das Team" },
    { area: "Wein-Analytics", without: "Keine Daten oder verspätete manuelle Reports", with_w: "KPIs in Echtzeit nach Outlet und Referenz" },
    { area: "Zimmerservice", without: "Begrenzte Liste ohne Kontext oder Pairing", with_w: "Digitales Erlebnis mit personalisierten Empfehlungen" },
    { area: "Premium-Erlebnis", without: "Generisch und wenig differenzierend", with_w: "Personalisiert, mehrsprachig und passend zum Positioning" },
  ],

  solLabel: "Die Lösung", solTitle1: "Eine Intelligenzschicht für Wein an ", solTitleHighlight: "jedem Servicepunkt",
  advantages: [
    { title: "Premium-Weinkarte, digital und mehrsprachig", desc: "Gäste sehen die Karte in ihrer Sprache mit erweiterten Profilen, Verkostungsnotizen, Pairings und Empfehlungen." },
    { title: "Konsistenz zwischen Outlets", desc: "Steuern Sie Sortiment, Preise und Präsentation zentral für Restaurant, Bar, Lounge und Zimmerservice." },
    { title: "Intelligente Empfehlungen", desc: "KI schlägt Weine nach Gericht, Gästetyp oder Tagesmoment vor. Mehr Umsatz und ein besseres Erlebnis." },
    { title: "Analytics für die F&B-Leitung", desc: "Echte Performance-Daten nach Outlet, Referenz, Kategorie und Zeitraum. Automatisiertes Reporting für das Management." },
    { title: "Integrierte Schulung für das Team", desc: "Das Personal empfiehlt Wein sicher mit Profilen, Pairings und Verkaufspunkten, abrufbar auf jedem Gerät." },
  ],

  tpLabel: "Servicepunkte", tpTitle: "Winerim an jedem Touchpoint des Hotels",
  touchpoints: [
    { title: "Hotelrestaurant", desc: "Vollständige digitale Karte mit Pairings nach Gericht, Weinprofilen und intelligenten Empfehlungen." },
    { title: "Bar und Lounge", desc: "Kuratierte Auswahl an Glasweinen mit leicht verständlichen Beschreibungen für Gäste, die entdecken möchten." },
    { title: "Rooftop und Terrasse", desc: "Kontextgerechte Karte: frische Weine, Schaumweine und saisonale Auswahl mit hochwertiger Präsentation." },
    { title: "Zimmerservice", desc: "Digitales Erlebnis, mit dem Gäste Wein direkt vom Zimmer aus mit vollständigen Informationen auswählen." },
    { title: "Events und Bankette", desc: "Weinvorschläge nach Event, Budget oder Stil für Bankette, Cocktails und private Dinner." },
    { title: "Wine Bar oder Vinothek", desc: "Fortgeschrittenes Management des Glasweinprogramms: Rotation, Schwund, Pricing und Performance nach Service." },
  ],

  trainLabel: "Serviceschulung", trainTitle: "Ihr Team empfiehlt Wein sicher, auch ohne vorherige Weinausbildung",
  trainDesc: "In der Hotellerie ist die Fluktuation hoch und ein Sommelier ist nicht immer verfügbar. Winerim gibt dem Serviceteam die Werkzeuge, um Wein in jeder Schicht professionell zu empfehlen.",
  trainItems: [
    "Weinprofile mit Verkostungsnotizen, Herkunft und Stil in klarer Sprache",
    "Automatische Pairings zum Hotelmenü",
    "Schrittweise Empfehlungen, denen jede Servicekraft folgen kann",
    "Beschreibung in der Sprache des Gastes für internationalen Service",
    "Wichtige Verkaufspunkte pro Referenz: was sagen, wie präsentieren",
    "Keine vorherige Weinausbildung erforderlich",
  ],

  mLabel: "Was Sie messen können", mTitle: "Wein-KPIs für die F&B-Leitung", mSubtitle: "Handlungsrelevante Daten für bessere Entscheidungen zur Weinkategorie in Ihrem Hotel.",
  metrics: [
    { label: "Durchschnittlicher Weinbon pro Outlet", desc: "Vergleichen Sie den durchschnittlichen Weinausgaben je Servicepunkt." },
    { label: "Marge nach Kategorie und Referenz", desc: "Erkennen Sie, welche Stile oder Preisbereiche die höchste Marge liefern." },
    { label: "Anteil der Tische mit Weinbestellung", desc: "Messen Sie, welcher Anteil der Gäste in jedem Outlet Wein bestellt." },
    { label: "Rotation pro Referenz", desc: "Erkennen Sie stagnierende Weine und Referenzen mit hoher Nachfrage." },
    { label: "Performance des Glasweinprogramms", desc: "Umsatz, Schwund und Marge pro Glas an jedem Servicepunkt." },
    { label: "Preiskonsistenz zwischen Outlets", desc: "Erkennen Sie Preisabweichungen desselben Weins zwischen Outlets." },
    { label: "Kosten gebundenen Bestands", desc: "Berechnen Sie Kapital, das in Weinen ohne Rotation gebunden ist." },
    { label: "Monatliche Entwicklung der Kategorie", desc: "Trends bei Umsatz, Marge und Sortiment von Monat zu Monat." },
  ],

  dLabel: "Welche Entscheidungen es erleichtert", dTitle: "Entscheidungen, die Winerim auf den Tisch bringt",
  decisions: [
    { title: "Welche Weine in jedem Outlet behalten oder entfernen?", desc: "Basierend auf Rotation, Marge und realer Performance statt auf Bauchgefühl." },
    { title: "Ist das Glasweinprogramm rentabel?", desc: "Analysieren Sie Schwund, Rotation und Marge, um die Auswahl zu optimieren." },
    { title: "Wo liegen Margenchancen?", desc: "Erkennen Sie untergenutzte Preisbereiche oder Kategorien mit Potenzial." },
    { title: "Ist das Pricing zwischen Outlets abgestimmt?", desc: "Vergleichen Sie Multiplikatoren und Margen zwischen Restaurant, Bar und Zimmerservice." },
    { title: "Welcher Servicepunkt braucht Aufmerksamkeit?", desc: "Identifizieren Sie Outlets mit schwacher Wein-Performance." },
    { title: "Welche Referenz auf weitere Outlets ausrollen?", desc: "Testen Sie einen Wein in einem Outlet, messen Sie Ergebnisse und entscheiden Sie über die Skalierung." },
  ],

  premLabel: "Premium-Hospitality", premTitle: "Warum Winerim besonders gut zu Hotels passt",
  premDesc: "Wein ist eine der wenigen F&B-Kategorien, in denen Gästeerlebnis und Geschäftsmarge gemeinsam wachsen. Winerim ist genau für diesen Punkt entwickelt.",
  premItems: [
    "Nativ mehrsprachig: Gäste sehen die Karte mühelos in ihrer Sprache",
    "Hochwertiges digitales Erlebnis passend zum Positioning des Hotels",
    "Empfehlungen, die den Bon erhöhen, ohne Verkaufsdruck zu erzeugen",
    "Serviceschulung, die Abhängigkeit von individuellem Talent reduziert",
    "Konsistentes Erlebnis in Restaurant, Bar, Lounge und Zimmerservice",
    "Analytics, mit denen F&B die Weinkategorie datenbasiert steuert",
    "Kein permanenter Sommelier an jedem Servicepunkt erforderlich",
    "Schrittweise Einführung ohne operative Störung",
  ],

  doesLabel: "Was es macht / Was es nicht macht", doesTitle: "Winerim in Hotels: vollständige Transparenz",
  doesItems: [
    "Verwaltet und optimiert die Weinkarte in allen Hotel-Outlets",
    "Bietet Gästen intelligente Empfehlungen nach Gericht, Stil oder Moment",
    "Übersetzt die Karte automatisch in die Sprache des Gastes",
    "Stellt dem Serviceteam Profile, Pairings und Verkaufspunkte bereit",
    "Erzeugt echte Analytics nach Outlet, Referenz und Zeitraum",
    "Integriert sich per API mit Hotel-PMS und POS-Systemen",
  ],
  doesNotLabel: "Was es nicht macht",
  doesNotItems: [
    "Es ersetzt keine F&B-Strategie und keine menschlichen Entscheidungen",
    "Es verwaltet kein Kücheninventar, sondern die Weinkategorie",
    "Es ist kein POS und kein PMS: Es integriert sich in bestehende Systeme",
  ],

  ctaLabel: "Für Hotels",
  ctaTitle: "Möchten Sie Wein in Ihrem Hotel professionalisieren?",
  ctaDesc: "Wir können Ihr aktuelles Weinangebot analysieren und zeigen, wo Chancen bei Marge, Erlebnis und operativer Effizienz liegen.",
  ctaPrimary: "Ich möchte eine Demo für mein Hotel", ctaSecondary: "Meine Weinkarte analysieren",
  ctaMicro: "Besonders nützlich für 4- und 5-Sterne-Hotels, Resorts, Boutique-Hotels und Hotelketten mit aktivem F&B.",

  faqs: [
    { q: "Funktioniert Winerim für Hotels mit mehreren Restaurants und Bars?", a: "Ja. Sie können jedes Outlet unabhängig oder zentral über ein einziges Panel steuern: Restaurant, Bar, Lounge, Rooftop und Zimmerservice." },
    { q: "Braucht es an jedem Servicepunkt einen Sommelier?", a: "Nein. Winerim enthält erweiterte Profile, automatische Pairings und Empfehlungen, damit das Serviceteam Wein sicher empfehlen kann, auch ohne vorherige Weinausbildung." },
    { q: "Wird die Karte in der Sprache des Gastes angezeigt?", a: "Ja. Die Karte kann automatisch in der Sprache des Gastes dargestellt werden, abhängig von den aktivierten Sprachen Ihres Projekts." },
    { q: "Integriert sich Winerim mit unserem Hotel-PMS oder POS?", a: "Ja. Im Enterprise-Plan integriert sich Winerim per API mit führenden Hotel-PMS und POS-Systemen. Wenn Ihr System nicht auf der Liste steht, prüfen wir es gemeinsam." },
    { q: "Wie lange dauert die Einführung?", a: "Ein Pilot kann in weniger als einer Woche aktiviert werden. Der Rollout auf weitere Outlets erfolgt schrittweise, ohne operative Störung." },
    { q: "Kann ich Zimmerservice mit Winerim verwalten?", a: "Ja. Gäste können die Weinkarte im Zimmer digital erkunden, mit personalisierten Empfehlungen und Pairings zum Room-Service-Menü." },
    { q: "Welche Daten sehe ich als F&B-Direktor?", a: "Weinbon pro Outlet, Marge nach Kategorie, Rotation pro Referenz, Anteil der Tische mit Wein, Performance des Glasweinprogramms, Preiskonsistenz und monatliche Entwicklung." },
    { q: "Gibt es eine Mindestlaufzeit?", a: "Nein. Keine Bindung und keine Strafgebühren. Sie können Outlets je nach Bedarf erweitern oder reduzieren." },
  ],

  nextStepsTitle: "Nächste Schritte",
  nextSteps: [
    { to: "/analisis-carta", label: "Weinkarte analysieren", description: "Kostenlose Diagnose mit konkreten Empfehlungen.", type: "tool" },
    { to: "/precios", label: "Pakete und Preise", description: "Enterprise-Plan mit PMS/POS-Integrationen und dediziertem Support.", type: "solution" },
    { to: "/soluciones/grupos-restauracion", label: "Lösung für Gruppen", description: "Wenn Sie mehrere Hotels oder Marken steuern.", type: "solution" },
    { to: "/funcionalidades", label: "Alle Funktionen", description: "Karte, KI, Bestand, Analytics und Integrationen.", type: "solution" },
  ],
  internalLinks: [
    { to: "/soluciones/grupos-restauracion", label: "Lösung für Restaurantgruppen", type: "solution" },
    { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz: taktische KI", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Weinkarten-Software", type: "solution" },
    { to: "/integraciones", label: "POS- und PMS-Integrationen", type: "solution" },
    { to: "/vino-por-copa", label: "Glaswein-Strategie", type: "guide" },
    { to: "/casos-exito", label: "Erfolgsgeschichten", type: "solution" },
    { to: "/comparativas", label: "Winerim mit Alternativen vergleichen", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Ratgeber: Serviceteam schulen", type: "guide" },
  ],
};

const PT: Content = { ...EN,
  metaTitle: "Winerim para Hotéis | Carta de Vinhos Inteligente para F&B",
  metaDescription: "Otimize o vinho em restaurantes, bares, lounges e room service do seu hotel. Carta digital multiidioma com IA e análise.",
  badgeLabel: "Hospitalidade premium", breadSolutions: "Soluções", breadLabel: "Hotéis",
  heroTitle1: "Vinho no seu hotel, gerido como uma ", heroTitleHighlight: "categoria premium",
  heroDesc: "Winerim ajuda hotéis a profissionalizar a oferta de vinho em todos os pontos de serviço: restaurante, bar, lounge e room service. Carta digital multiidioma, recomendações com IA e analytics para direção de F&B.",
  ctaDemo: "Solicitar demonstração", ctaContact: "Falar com um especialista",
  heroSummary: "Winerim para hotéis é uma solução de gestão, recomendação e analytics de vinho desenhada para operadores hoteleiros. Permite centralizar a carta de vinhos, normalizar a experiência do hóspede, formar a equipa de sala e obter dados reais de desempenho em cada ponto de serviço do hotel.",

  forTitle: "O Winerim é para o seu hotel?", forLabel: "É para si se...", notForLabel: "Provavelmente não é para si se...",
  forItems: [
    "Tem restaurante, bar ou lounge com carta de vinhos",
    "Recebe hóspedes internacionais que precisam da carta no seu idioma",
    "Quer elevar a experiência de vinho sem depender de um sommelier 24/7",
    "Precisa de coerência de oferta e preços entre pontos de venda",
    "A sua direção de F&B precisa de dados de desempenho do vinho",
    "Procura diferenciar-se com uma experiência digital premium",
  ],
  notForItems: [
    "O seu hotel não tem serviço de restauração nem bar com vinhos",
    "Não precisa de carta digital nem de analytics da categoria vinho",
    "Procura apenas uma lista em PDF sem funcionalidades de gestão",
  ],

  painLabel: "O desafio", painTitle1: "O vinho na hotelaria: alto potencial, ", painTitleHighlight: "pouca gestão",
  pains: [
    { text: "O vinho é uma das categorias de F&B com maior potencial de margem, mas uma das menos geridas com ferramentas adequadas na maioria dos hotéis." },
    { text: "Hóspedes internacionais não compreendem a carta de vinhos se esta não estiver no seu idioma, e acabam por escolher o mais seguro ou não pedir vinho." },
    { text: "Cada ponto de venda - restaurante, bar, rooftop, room service - opera com critérios diferentes: preços, sortido e apresentação inconsistentes." },
    { text: "A equipa de sala muda com frequência e nem sempre tem formação ou ferramentas para recomendar vinho com confiança." },
    { text: "Não existem dados consolidados sobre o desempenho do vinho: o que vende, o que fica parado e que margem gera cada referência." },
    { text: "A experiência do vinho nem sempre acompanha o posicionamento do hotel: cartas desatualizadas, apresentação genérica e pouca personalização." },
  ],

  tableLabel: "Comparação", tableTitle: "Gestão tradicional vs Winerim em hotéis",
  tableHeaders: ["Área", "Sem Winerim", "Com Winerim"],
  tableRows: [
    { area: "Carta de vinhos", without: "PDF ou carta impressa, desatualizada", with_w: "Carta digital interativa, atualizada em tempo real" },
    { area: "Idiomas", without: "Carta em 1-2 idiomas ou mal traduzida", with_w: "Multiidioma automático no idioma do hóspede" },
    { area: "Recomendações", without: "Dependem do conhecimento do empregado", with_w: "IA que sugere por prato, perfil ou momento" },
    { area: "Consistência entre outlets", without: "Cada ponto de venda opera por sua conta", with_w: "Sortido e preços governados a partir de um painel central" },
    { area: "Formação de sala", without: "Depende do talento individual, sem suporte", with_w: "Fichas, harmonizações e pontos de venda acessíveis à equipa" },
    { area: "Analytics de vinho", without: "Sem dados ou relatórios manuais tardios", with_w: "KPIs em tempo real por ponto de venda e referência" },
    { area: "Room service", without: "Carta limitada, sem contexto nem harmonização", with_w: "Experiência digital com recomendações personalizadas" },
    { area: "Experiência premium", without: "Genérica, pouco diferenciadora", with_w: "Personalizada, multiidioma e alinhada com o posicionamento" },
  ],

  solLabel: "A solução", solTitle1: "Uma camada de inteligência para o vinho em ", solTitleHighlight: "cada ponto de serviço",
  advantages: [
    { title: "Carta digital premium multiidioma", desc: "O hóspede vê a carta no seu idioma com fichas enriquecidas, notas de prova, harmonizações e recomendações." },
    { title: "Consistência entre outlets", desc: "Gira sortido, preços e apresentação a partir de um painel central para restaurante, bar, lounge e room service." },
    { title: "Recomendações inteligentes", desc: "IA que sugere vinhos por prato, perfil do hóspede ou momento do dia. Mais vendas e melhor experiência." },
    { title: "Analytics para direção de F&B", desc: "Dados reais de desempenho por ponto de venda, referência, categoria e período. Reporting executivo automatizado." },
    { title: "Formação integrada para a equipa", desc: "A equipa recomenda vinho com confiança graças a fichas, harmonizações e pontos-chave de venda acessíveis em qualquer dispositivo." },
  ],

  tpLabel: "Pontos de serviço", tpTitle: "Winerim em cada touchpoint do hotel",
  touchpoints: [
    { title: "Restaurante do hotel", desc: "Carta digital completa com harmonizações por prato, fichas de vinho e recomendações inteligentes." },
    { title: "Bar e lounge", desc: "Seleção curada de vinhos a copo com descrições acessíveis para hóspedes que querem explorar." },
    { title: "Rooftop e esplanada", desc: "Carta adaptada ao contexto: vinhos frescos, espumantes e seleção sazonal com apresentação premium." },
    { title: "Room service", desc: "Experiência digital que permite ao hóspede escolher vinho com informação completa a partir do quarto." },
    { title: "Eventos e salas", desc: "Propostas de vinho por evento, orçamento ou estilo para banquetes, cocktails e jantares privados." },
    { title: "Wine bar ou garrafeira", desc: "Gestão avançada do programa de vinho a copo: rotação, desperdício, preços e desempenho por serviço." },
  ],

  trainLabel: "Formação de sala", trainTitle: "A sua equipa recomenda vinho com confiança, mesmo sem formação prévia em enologia",
  trainDesc: "Na hotelaria, a rotação de pessoal é elevada e nem sempre há um sommelier disponível. Winerim equipa a equipa de sala com ferramentas para recomendar vinho de forma profissional em cada turno.",
  trainItems: [
    "Fichas de vinho com notas de prova, origem e estilo em linguagem clara",
    "Harmonizações automáticas por prato do menu do hotel",
    "Recomendações passo a passo que qualquer empregado pode seguir",
    "Descrição no idioma do hóspede para serviço internacional",
    "Pontos-chave de venda por referência: o que dizer e como apresentar",
    "Sem necessidade de formação prévia em vinho",
  ],

  mLabel: "O que pode medir", mTitle: "KPIs de vinho para direção de F&B", mSubtitle: "Dados acionáveis para tomar melhores decisões sobre a categoria vinho no seu hotel.",
  metrics: [
    { label: "Bilhete médio em vinho por outlet", desc: "Compare o gasto médio em vinho por ponto de serviço." },
    { label: "Margem por categoria e referência", desc: "Identifique que estilos ou intervalos de preço geram mais margem." },
    { label: "Rácio de mesas que pedem vinho", desc: "Meça que percentagem de hóspedes consome vinho em cada outlet." },
    { label: "Rotação por referência", desc: "Detete vinhos parados e referências com alta procura." },
    { label: "Desempenho do programa a copo", desc: "Vendas, desperdício e margem do vinho a copo em cada ponto." },
    { label: "Coerência de preços entre outlets", desc: "Detete desvios de preço para o mesmo vinho entre outlets." },
    { label: "Custo de stock imobilizado", desc: "Calcule o capital parado em vinhos sem rotação." },
    { label: "Evolução mensal da categoria", desc: "Tendências de vendas, margem e sortido mês a mês." },
  ],

  dLabel: "Que decisões facilita", dTitle: "Decisões que o Winerim coloca em cima da mesa",
  decisions: [
    { title: "Que vinhos manter ou retirar em cada outlet?", desc: "Com base em rotação, margem e desempenho real, não em intuição." },
    { title: "O programa a copo é rentável?", desc: "Analise desperdício, rotação e margem para otimizar a seleção a copo." },
    { title: "Onde existem oportunidades de margem?", desc: "Detete intervalos de preço pouco explorados ou categorias com potencial." },
    { title: "Os preços estão alinhados entre outlets?", desc: "Compare multiplicadores e margens entre restaurante, bar e room service." },
    { title: "Que outlet precisa de atenção?", desc: "Identifique pontos de venda com baixo desempenho em vinho." },
    { title: "Que referência escalar para mais outlets?", desc: "Teste um vinho num outlet, meça e decida se deve expandir." },
  ],

  premLabel: "Hospitalidade premium", premTitle: "Porque o Winerim encaixa especialmente bem em hotéis",
  premDesc: "O vinho é uma das poucas categorias de F&B onde a experiência do cliente e a margem do negócio crescem em conjunto. Winerim foi desenhado para esse ponto exato.",
  premItems: [
    "Multiidioma nativo: o hóspede vê a carta no seu idioma sem esforço",
    "Experiência digital premium alinhada com o posicionamento do hotel",
    "Recomendações que elevam o bilhete sem pressão comercial",
    "Formação de sala que reduz dependência do talento individual",
    "Consistência de experiência entre restaurante, bar, lounge e room service",
    "Analytics que permitem à direção de F&B governar a categoria vinho com dados reais",
    "Sem necessidade de um sommelier permanente em cada ponto de serviço",
    "Implementação progressiva sem disrupção operacional",
  ],

  doesLabel: "O que faz / O que não faz", doesTitle: "Winerim em hotéis: transparência total",
  doesItems: [
    "Gere e otimiza a carta de vinhos em todos os outlets do hotel",
    "Oferece recomendações inteligentes ao hóspede por prato, estilo ou momento",
    "Traduz automaticamente a carta para o idioma do hóspede",
    "Disponibiliza fichas, harmonizações e pontos-chave de venda à equipa de sala",
    "Gera analytics reais por outlet, referência e período",
    "Integra-se com PMS e POS hoteleiros via API",
  ],
  doesNotLabel: "O que não faz",
  doesNotItems: [
    "Não substitui a estratégia de F&B nem a tomada de decisão humana",
    "Não gere inventário de cozinha, apenas a categoria vinho",
    "Não é um POS nem um PMS: integra-se com os sistemas existentes",
  ],

  ctaLabel: "Para hotéis",
  ctaTitle: "Quer profissionalizar o vinho no seu hotel?",
  ctaDesc: "Podemos analisar a sua oferta atual de vinho e mostrar onde existem oportunidades de margem, experiência e eficiência operacional.",
  ctaPrimary: "Quero uma demonstração para o meu hotel", ctaSecondary: "Analisar a minha carta de vinhos",
  ctaMicro: "Especialmente útil para hotéis 4 e 5 estrelas, resorts, boutique hotels e cadeias hoteleiras com F&B ativo.",

  faqs: [
    { q: "O Winerim funciona para hotéis com vários restaurantes e bares?", a: "Sim. Pode gerir cada outlet de forma independente ou centralizada a partir de um único painel: restaurante, bar, lounge, rooftop e room service." },
    { q: "É preciso um sommelier em cada ponto de serviço?", a: "Não. Winerim inclui fichas enriquecidas, harmonizações automáticas e recomendações que permitem à equipa de sala recomendar vinho com confiança, sem formação prévia em enologia." },
    { q: "A carta aparece no idioma do hóspede?", a: "Sim. A carta pode ser apresentada automaticamente no idioma do hóspede, de acordo com os idiomas ativados no seu projeto." },
    { q: "Integra-se com o nosso PMS ou POS hoteleiro?", a: "Sim. No plano Enterprise, Winerim integra-se com os principais PMS e POS hoteleiros via API. Se o seu sistema não estiver na lista, avaliamos consigo." },
    { q: "Quanto tempo demora a implementação?", a: "O piloto pode ser ativado em menos de uma semana. A expansão para mais outlets é feita gradualmente, sem disrupções operacionais." },
    { q: "Posso gerir room service com o Winerim?", a: "Sim. O hóspede pode explorar a carta de vinhos a partir de um dispositivo no quarto, com recomendações personalizadas e harmonizações com o menu de room service." },
    { q: "Que dados posso ver como diretor de F&B?", a: "Bilhete médio em vinho por outlet, margem por categoria, rotação por referência, rácio de mesas com vinho, desempenho do programa a copo, coerência de preços e evolução mensal." },
    { q: "Existe fidelização?", a: "Não. Sem fidelização nem penalizações. Pode escalar ou reduzir outlets conforme as suas necessidades." },
  ],

  nextStepsTitle: "Próximos passos",
  nextSteps: [
    { to: "/analisis-carta", label: "Analise a sua carta de vinhos", description: "Diagnóstico gratuito com recomendações acionáveis.", type: "tool" },
    { to: "/precios", label: "Planos e preços", description: "Plano Enterprise com integrações PMS/POS e suporte dedicado.", type: "solution" },
    { to: "/soluciones/grupos-restauracion", label: "Solução para grupos", description: "Se gere vários hotéis ou marcas.", type: "solution" },
    { to: "/funcionalidades", label: "Todas as funcionalidades", description: "Carta, IA, stock, analytics e integrações.", type: "solution" },
  ],
  internalLinks: [
    { to: "/soluciones/grupos-restauracion", label: "Solução para grupos de restauração", type: "solution" },
    { to: "/producto/inteligencia-dinamica", label: "Inteligência dinâmica: IA tática", type: "solution" },
    { to: "/software-carta-de-vinos", label: "Software de carta de vinhos", type: "solution" },
    { to: "/integraciones", label: "Integrações POS e PMS", type: "solution" },
    { to: "/vino-por-copa", label: "Estratégia de vinho a copo", type: "guide" },
    { to: "/casos-exito", label: "Casos de sucesso", type: "solution" },
    { to: "/comparativas", label: "Comparar Winerim com alternativas", type: "solution" },
    { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Guia: formar a equipa de sala", type: "guide" },
  ],
};

const content: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR, de: DE, pt: PT };

/* ─── icon maps ─── */
const advIcons = [Globe, Layers, Sparkles, BarChart3, GraduationCap];
const tpIcons = [ConciergeBell, GlassWater, Star, Hotel, Building2, Wine];
const metricIcons = [BarChart3, DollarSign, Users, RefreshCw, GlassWater, DollarSign, ClipboardList, TrendingUp];
const decIcons = [Target, GlassWater, DollarSign, DollarSign, AlertTriangle, RefreshCw];

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════ */

const Hoteles = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;
  const localizedNextSteps = t.nextSteps.map((step) => ({ ...step, to: localePath(step.to) }));
  const localizedInternalLinks = t.internalLinks.map((link) => ({ ...link, to: localePath(link.to) }));

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "hoteles-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.metaTitle,
      description: t.metaDescription,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim for Hotels",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.heroDesc,
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("hoteles-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={`${CANONICAL_DOMAIN}${localePath("/soluciones/hoteles")}`}
        hreflang={allLangPaths("/soluciones/hoteles")} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadSolutions, href: localePath("/soluciones") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Hotel size={14} className="text-wine" />
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

      {/* ── SUMMARY ── */}
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
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.forLabel}</p>
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

      {/* ── PAINS ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.painLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.painTitle1}<span className="text-gradient-wine italic">{t.painTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.pains.map((p, i) => (
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

      {/* ── TABLE: without vs with ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.tableLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.tableTitle}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left p-4 font-medium text-muted-foreground w-[22%]">{t.tableHeaders[0]}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground/60 w-[39%]">{t.tableHeaders[1]}</th>
                    <th className="text-left p-4 font-medium text-wine w-[39%]">{t.tableHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-3 pl-4 font-medium text-foreground/80">{row.area}</td>
                      <td className="p-3 text-muted-foreground/60">{row.without}</td>
                      <td className="p-3 text-foreground/90">{row.with_w}</td>
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
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.solTitle1}<span className="text-gradient-wine italic">{t.solTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.advantages.map((adv, i) => {
              const Icon = advIcons[i] || Hotel;
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

      {/* ── TOUCHPOINTS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.tpLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.tpTitle}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.touchpoints.map((tp, i) => {
              const Icon = tpIcons[i] || Hotel;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{tp.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tp.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRAINING ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.trainLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.trainTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.trainDesc}</p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {t.trainItems.map((item, i) => (
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

      {/* ── METRICS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.mLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.mTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.mSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.metrics.map((m, i) => {
              const Icon = metricIcons[i] || BarChart3;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4 h-full">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DECISIONS ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.dLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.dTitle}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.decisions.map((d, i) => {
              const Icon = decIcons[i] || Target;
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

      {/* ── PREMIUM FIT ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.premLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.premTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.premDesc}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <ul className="grid sm:grid-cols-2 gap-3">
                {t.premItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Star size={14} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ── WINERIM SUPPLY ── */}
      <WinerimSupplyBlock />

      {/* ── DOES / DOESN'T ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.doesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.doesLabel.split("/")[0].trim()}</p>
                <ul className="space-y-3">
                  {t.doesItems.map((item, i) => (
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
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.doesNotLabel}</p>
                <ul className="space-y-3">
                  {t.doesNotItems.map((item, i) => (
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

      {/* ── FAQs ── */}
      <FAQSection faqs={t.faqs} schemaId="hoteles" />

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

export default Hoteles;
