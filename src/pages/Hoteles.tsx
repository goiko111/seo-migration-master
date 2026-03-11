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
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── types ─── */
type PainRow = { area: string; without: string; with_w: string };
type Metric = { label: string; desc: string };
type Decision = { title: string; desc: string };

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

const content: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR };

/* ─── icon maps ─── */
const advIcons = [Globe, Layers, Sparkles, BarChart3, GraduationCap];
const tpIcons = [ConciergeBell, GlassWater, Star, Hotel, Building2, Wine];
const metricIcons = [BarChart3, DollarSign, Users, RefreshCw, GlassWater, DollarSign, ClipboardList, TrendingUp];
const decIcons = [Target, GlassWater, DollarSign, DollarSign, AlertTriangle, RefreshCw];

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════ */

const Hoteles = () => {
  const { lang, localePath } = useLanguage();
  const t = content[lang] || content.es;

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
      <SEOHead title={t.metaTitle} description={t.metaDescription} url="https://winerim.wine/soluciones/hoteles" />
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
        title={lang === "es" ? "Siguientes pasos" : "Next steps"}
        steps={[
          { to: "/analisis-carta", label: lang === "es" ? "Analiza tu carta de vinos" : "Analyze your wine list", description: lang === "es" ? "Diagnóstico gratuito con recomendaciones accionables." : "Free diagnosis with actionable recommendations.", type: "tool" },
          { to: "/precios", label: lang === "es" ? "Planes y precios" : "Plans and pricing", description: lang === "es" ? "Plan Enterprise con integraciones PMS/POS y soporte dedicado." : "Enterprise plan with PMS/POS integrations and dedicated support.", type: "solution" },
          { to: "/soluciones/grupos-restauracion", label: lang === "es" ? "Solución para grupos" : "Solution for groups", description: lang === "es" ? "Si gestionas múltiples hoteles o marcas." : "If you manage multiple hotels or brands.", type: "solution" },
          { to: "/funcionalidades", label: lang === "es" ? "Todas las funcionalidades" : "All features", description: lang === "es" ? "Carta, IA, stock, analítica, integraciones." : "List, AI, stock, analytics, integrations.", type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/soluciones/grupos-restauracion"), label: lang === "es" ? "Solución para grupos de restauración" : "Solution for restaurant groups", type: "solution" },
        { to: localePath("/producto/inteligencia-dinamica"), label: lang === "es" ? "Inteligencia dinámica: IA táctica" : "Dynamic intelligence", type: "solution" },
        { to: localePath("/software-carta-de-vinos"), label: lang === "es" ? "Software de carta de vinos" : "Wine list software", type: "solution" },
        { to: localePath("/integraciones"), label: lang === "es" ? "Integraciones POS y PMS" : "POS & PMS integrations", type: "solution" },
        { to: localePath("/vino-por-copa"), label: lang === "es" ? "Estrategia de vino por copa" : "By-the-glass strategy", type: "guide" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "solution" },
        { to: localePath("/comparativas"), label: lang === "es" ? "Compara Winerim con alternativas" : "Compare Winerim", type: "solution" },
        { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: lang === "es" ? "Guía: formar al equipo de sala" : "Guide: train floor staff", type: "guide" },
      ]} />

      <Footer />
    </div>
  );
};

export default Hoteles;
