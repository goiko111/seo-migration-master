import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, Zap, ShoppingCart,
  CheckCircle2, GraduationCap, QrCode, Brain, Wine,
  Layers, TrendingUp, Package, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n } from "@/i18n/types";
import type { I18nMap } from "@/i18n/types";
import { CANONICAL_DOMAIN } from "@/seo/config";

// ─── Screenshots ───
import tabletHeroImg from "@/assets/winerim-tablet-hero.webp";
import tabletDetailImg from "@/assets/winerim-tablet-detail.webp";
import tabletComparatorImg from "@/assets/winerim-tablet-comparator.webp";
import tabletPairingImg from "@/assets/winerim-tablet-pairing.webp";
import mgmtStock from "@/assets/mgmt-stock.webp";
import mgmtRendimiento from "@/assets/mgmt-rendimiento.webp";
import mgmtInsights from "@/assets/mgmt-insights.webp";
import mgmtRecomendados from "@/assets/mgmt-recomendados.webp";
import mgmtAutomatizaciones from "@/assets/mgmt-automatizaciones.webp";
import mgmtRotacion from "@/assets/mgmt-rotacion.webp";
import mgmtObsolescencia from "@/assets/mgmt-obsolescencia.webp";
import dashboardInsightsImg from "@/assets/winerim-dashboard-insights.webp";
import ss08 from "@/assets/screenshots/ss-08.webp";
import ss10 from "@/assets/screenshots/ss-10.webp";
import ss14 from "@/assets/screenshots/ss-14.webp";
import ss19 from "@/assets/screenshots/ss-19.webp";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface Feature {
  icon: typeof Wine;
  title: string;
  desc: string;
  benefits: string[];
  linkLabel: string;
  linkHref: string;
  screenshots: { img: string; alt: string; label: string }[];
}

interface CompRow {
  feature: string;
  winerim: string;
  cartaQR: string;
  digitalBasica: string;
  tradicional: string;
}

interface PageContent {
  seoTitle: string;
  seoDesc: string;
  schemaTitle: string;
  schemaDesc: string;
  breadcrumb: string;
  badge: string;
  heroTitle: string;
  heroTitleItalic: string;
  heroDesc: string;
  ctaDemo: string;
  ctaPricing: string;
  featureLabel: string;
  compBadge: string;
  compTitle: string;
  compDesc: string;
  compColWinerim: string;
  compColQR: string;
  compColBasic: string;
  compColTraditional: string;
  ctaFinalTitle: string;
  ctaFinalItalic: string;
  ctaFinalDesc: string;
  ctaFinalDemo: string;
  ctaFinalPricing: string;
  features: Feature[];
  comparisonRows: CompRow[];
  faqs: { q: string; a: string }[];
  internalLinks: { to: string; label: string; type: string }[];
}

/* ─────────────────────────────────────────────
   Screenshots (shared across languages)
   ───────────────────────────────────────────── */
const SHOTS = {
  carta: [
    { img: tabletHeroImg, label: "Carta" },
    { img: tabletComparatorImg, label: "Comparador" },
  ],
  ai: [
    { img: tabletPairingImg, label: "Maridaje" },
    { img: ss10, label: "Config IA" },
  ],
  stock: [
    { img: mgmtStock, label: "Stock" },
    { img: mgmtObsolescencia, label: "Obsolescencia" },
  ],
  pricing: [
    { img: mgmtRendimiento, label: "Rendimiento" },
    { img: mgmtRotacion, label: "Rotación" },
  ],
  analytics: [
    { img: ss14, label: "Insights" },
    { img: ss19, label: "Rendimiento" },
  ],
  iaApplied: [
    { img: tabletDetailImg, label: "Ficha IA" },
    { img: ss08, label: "Motor RIM" },
  ],
  dynamic: [
    { img: mgmtRecomendados, label: "Recomendados" },
    { img: mgmtAutomatizaciones, label: "Automatización" },
  ],
  training: [
    { img: mgmtInsights, label: "Insights" },
    { img: dashboardInsightsImg, label: "Dashboard" },
  ],
};

/* ─────────────────────────────────────────────
   i18n content
   ───────────────────────────────────────────── */
const content: I18nMap<PageContent> = {
  es: {
    seoTitle: "Funcionalidades de Winerim | Software de Carta de Vinos con IA",
    seoDesc: "Descubre las funcionalidades de Winerim: carta digital, IA, maridajes, stock, pricing, analítica y formación. Todo para vender más vino.",
    schemaTitle: "Funcionalidades de Winerim",
    schemaDesc: "Carta digital, IA, maridajes automáticos, gestión de stock, pricing, analítica e inteligencia dinámica para restaurantes y hoteles.",
    breadcrumb: "Funcionalidades",
    badge: "Plataforma completa",
    heroTitle: "Funcionalidades de Winerim — ",
    heroTitleItalic: "Todo lo que necesitas para vender más vino",
    heroDesc: "Winerim es la plataforma de gestión inteligente del vino para restaurantes, hoteles y grupos de restauración. Combina carta digital interactiva, recomendaciones con IA, control de stock, pricing, analítica avanzada e inteligencia de compras en un solo ecosistema. Diseñado para que cada decisión sobre el vino esté basada en datos, no en intuición.",
    ctaDemo: "Solicitar demo",
    ctaPricing: "Ver precios",
    featureLabel: "Funcionalidad",
    compBadge: "Comparativa",
    compTitle: "Winerim vs alternativas del mercado",
    compDesc: "No todas las soluciones de carta digital son iguales. Esta es la diferencia entre una carta QR, una carta digital básica, la gestión tradicional y una plataforma de inteligencia como Winerim.",
    compColWinerim: "Winerim",
    compColQR: "Carta QR",
    compColBasic: "Digital básica",
    compColTraditional: "Tradicional",
    ctaFinalTitle: "¿Quieres verlo en acción? ",
    ctaFinalItalic: "Solicita una demo gratuita",
    ctaFinalDesc: "Te mostramos cómo Winerim puede transformar la gestión del vino en tu restaurante, hotel o grupo. Sin compromiso, con datos reales adaptados a tu negocio.",
    ctaFinalDemo: "Solicitar demo gratuita",
    ctaFinalPricing: "Ver precios",
    features: [
      {
        icon: QrCode, title: "Carta digital interactiva",
        desc: "Una carta que no solo muestra vinos: filtra por tipo, precio, maridaje y estilo. Comparador integrado, fichas enriquecidas con IA, traducción automática a 12 idiomas y acceso instantáneo por QR. Diseñada para que el comensal explore con autonomía y el equipo de sala recomiende con criterio.",
        benefits: ["Acceso por QR desde cualquier dispositivo, sin app ni descarga", "Filtros avanzados por tipo, región, precio, maridaje y perfil sensorial", "Comparador de hasta 4 vinos con gráficos radar", "Traducción automática a 12 idiomas en tiempo real"],
        linkLabel: "Ver cómo funciona la carta", linkHref: "/que-es-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Carta interactiva de vinos en tablet" : "Comparador de vinos" })),
      },
      {
        icon: Brain, title: "Recomendaciones con IA y maridajes automáticos",
        desc: "Motor de inteligencia artificial que genera recomendaciones personalizadas según el plato, el contexto del comensal y los objetivos comerciales del restaurante. Maridajes automáticos basados en la carta real, no en bases de datos genéricas.",
        benefits: ["Maridajes automáticos basados en tu carta y tu menú real", "Recomendaciones priorizadas por margen, stock y rotación", "Fichas de vino generadas con IA: descriptores, notas de cata y contexto", "Sugerencias adaptadas al perfil del comensal y la ocasión"],
        linkLabel: "Explorar la IA de Winerim", linkHref: "/inteligencia-artificial-restaurantes",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Maridaje automático de vinos" : "Configuración de IA y maridaje" })),
      },
      {
        icon: Package, title: "Gestión de stock e inventario",
        desc: "Control de inventario en tiempo real conectado con ventas y carta. Detección automática de stock muerto, alertas de rotación lenta, prevención de rotura de stock y visibilidad total sobre el capital inmovilizado en bodega.",
        benefits: ["Actualización automática de disponibilidad en la carta", "Detección de stock muerto y vinos con rotación lenta", "Alertas de reposición antes de la rotura de stock", "Visibilidad del capital inmovilizado por referencia y categoría"],
        linkLabel: "Herramienta de stock muerto", linkHref: "/herramientas/calculadora-stock-muerto",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Control de stock de vinos" : "Detección de obsolescencia" })),
      },
      {
        icon: TrendingUp, title: "Pricing y análisis de márgenes",
        desc: "Simulador de precios, análisis de márgenes por referencia, detección de erosión y herramientas de pricing inteligente. Compara tu estructura de precios con benchmarks del sector y optimiza sin perder competitividad ni percepción de valor.",
        benefits: ["Análisis de margen real por referencia, categoría y rango de precio", "Simulación de escenarios de pricing antes de implementar cambios", "Detección de erosión de márgenes y sobreprecios en compras", "Benchmark de pricing frente a restaurantes comparables"],
        linkLabel: "Calculadora de margen", linkHref: "/calculadora-margen-vino",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Análisis de rendimiento y márgenes" : "Rotación de vinos" })),
      },
      {
        icon: BarChart3, title: "Analítica avanzada y KPIs",
        desc: "Dashboard con KPIs específicos del vino en hostelería: ticket medio, rotación por referencia, mix de precios, probabilidad de venta, rendimiento por copa vs botella y evolución temporal. Datos que no encontrarás en tu TPV ni en una hoja de cálculo.",
        benefits: ["KPIs de vino que tu TPV no mide: rotación, mix, Beverage Cost", "Comparativa de rendimiento entre locales para grupos", "Evolución temporal de ventas, márgenes y rotación", "Alertas automáticas cuando un indicador se desvía"],
        linkLabel: "Explorar Winerim Core", linkHref: "/producto/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Dashboard de insights y KPIs" : "Rendimiento global de carta" })),
      },
      {
        icon: Sparkles, title: "IA aplicada al vino",
        desc: "Fichas de vino generadas automáticamente con descriptores sensoriales, notas de cata, sugerencias de maridaje y contexto de servicio. La IA de Winerim no sustituye al sumiller: le ahorra horas de trabajo operativo y le da una base sólida sobre la que construir.",
        benefits: ["Generación automática de fichas con descriptores y notas de cata", "Sugerencias de temperatura, copa y decantación por referencia", "Contenido adaptado al perfil del restaurante y su público", "Actualización continua con datos del sector y tendencias"],
        linkLabel: "IA para restaurantes", linkHref: "/inteligencia-artificial-restaurantes",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Ficha de vino detallada" : "Motor de recomendación RIM" })),
      },
      {
        icon: Zap, title: "Inteligencia dinámica",
        desc: "La capa de acción automática que actúa sobre la carta en tiempo real. Reordena, destaca, oculta y adapta referencias según margen, stock, clima, hora y objetivos del negocio. No necesitas intervenir: la carta se optimiza sola basándose en los datos de Core.",
        benefits: ["Reordenación automática de la carta según objetivos comerciales", "Destacado de vinos con mejor margen o necesidad de rotación", "Ocultación automática de referencias agotadas o en riesgo", "Adaptación contextual por clima, hora del día o afluencia"],
        linkLabel: "Descubrir Inteligencia Dinámica", linkHref: "/producto/inteligencia-dinamica",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Recomendaciones dinámicas" : "Automatizaciones" })),
      },
      {
        icon: GraduationCap, title: "Formación del equipo de sala",
        desc: "Guías de vino, fichas simplificadas y recomendaciones contextuales para que el equipo de sala pueda hablar de vino con confianza, tenga o no formación previa. El objetivo no es convertirlos en sumilleres, sino en vendedores informados.",
        benefits: ["Fichas simplificadas de cada vino accesibles desde cualquier dispositivo", "Recomendaciones contextuales que el equipo puede usar en sala", "Guías de servicio: temperatura, copa, decantación, maridaje sugerido", "Formación continua sin necesidad de sesiones presenciales"],
        linkLabel: "Guía para restaurantes sin sumiller", linkHref: "/guias/como-usar-winerim-sin-sumiller",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Insights para el equipo" : "Dashboard de insights" })),
      },
    ],
    comparisonRows: [
      { feature: "Carta accesible por QR", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filtros y comparador de vinos", winerim: "✅", cartaQR: "❌", digitalBasica: "Parcial", tradicional: "❌" },
      { feature: "Fichas de vino con IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Maridajes automáticos", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "Recomendaciones con IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Control de stock en tiempo real", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "Detección de stock muerto", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Análisis de márgenes por referencia", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Simulación de pricing", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "KPIs específicos del vino", winerim: "✅", cartaQR: "❌", digitalBasica: "Básico", tradicional: "❌" },
      { feature: "Benchmark vs sector", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Inteligencia de compras", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Acción dinámica sobre la carta", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Formación del equipo de sala", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Multiidioma automático", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manual", tradicional: "❌" },
      { feature: "Gestión multi-local", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "¿Winerim funciona con mi TPV actual?", a: "Sí. Winerim se integra con los principales TPVs del mercado (Revo, Lightspeed, Oracle, etc.). Si tu TPV no está en la lista, el equipo técnico evalúa la viabilidad de conexión sin coste adicional." },
      { q: "¿Puedo gestionar varios locales desde un solo panel?", a: "Sí. La gestión centralizada multi-local es una funcionalidad clave de Winerim, diseñada para grupos de restauración y hoteles con múltiples puntos de venta." },
      { q: "¿Las recomendaciones de IA se basan en datos genéricos?", a: "No. Las recomendaciones se generan a partir de datos reales de tu carta, tus patrones de venta, tu stock y tus objetivos comerciales. Son específicas para tu negocio, no genéricas." },
      { q: "¿Qué pasa si un vino se agota?", a: "El sistema actualiza la disponibilidad en tiempo real. Los vinos agotados desaparecen automáticamente de la carta visible para el comensal, sin intervención manual." },
      { q: "¿Necesito a un sumiller para usar Winerim?", a: "No. Winerim está diseñado para funcionar con o sin sumiller. En restaurantes sin experto dedicado, la plataforma cubre el gap con recomendaciones inteligentes, fichas guiadas y herramientas de formación para el equipo de sala." },
    ],
    internalLinks: [
      { to: "/precios", label: "Planes y precios", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/integraciones", label: "Integraciones TPV", type: "tool" },
      { to: "/casos-exito", label: "Casos de éxito", type: "solution" },
    ],
  },
  en: {
    seoTitle: "Winerim Features | AI Wine List Management Software",
    seoDesc: "Discover Winerim features: digital wine list, AI, pairings, stock, pricing, analytics and training. Everything to sell more wine.",
    schemaTitle: "Winerim Features",
    schemaDesc: "Digital wine list, AI, automatic pairings, stock management, pricing, analytics and dynamic intelligence for restaurants and hotels.",
    breadcrumb: "Features",
    badge: "Complete platform",
    heroTitle: "Winerim Features — ",
    heroTitleItalic: "Everything you need to sell more wine",
    heroDesc: "Winerim is the intelligent wine management platform for restaurants, hotels and hospitality groups. It combines an interactive digital wine list, AI recommendations, stock control, pricing, advanced analytics and purchasing intelligence in a single ecosystem. Designed so every wine decision is data-driven, not intuition-based.",
    ctaDemo: "Request demo",
    ctaPricing: "See pricing",
    featureLabel: "Feature",
    compBadge: "Comparison",
    compTitle: "Winerim vs market alternatives",
    compDesc: "Not all digital wine list solutions are created equal. This is the difference between a QR menu, a basic digital list, traditional management and an intelligence platform like Winerim.",
    compColWinerim: "Winerim",
    compColQR: "QR Menu",
    compColBasic: "Basic digital",
    compColTraditional: "Traditional",
    ctaFinalTitle: "Want to see it in action? ",
    ctaFinalItalic: "Request a free demo",
    ctaFinalDesc: "We'll show you how Winerim can transform wine management in your restaurant, hotel or group. No commitment, with real data tailored to your business.",
    ctaFinalDemo: "Request free demo",
    ctaFinalPricing: "See pricing",
    features: [
      {
        icon: QrCode, title: "Interactive digital wine list",
        desc: "A wine list that does more than display wines: it filters by type, price, pairing and style. Built-in comparator, AI-enriched tasting sheets, automatic translation into 12 languages and instant QR access. Designed for diners to explore independently and floor staff to recommend with confidence.",
        benefits: ["QR access from any device, no app or download needed", "Advanced filters by type, region, price, pairing and sensory profile", "Compare up to 4 wines with radar charts", "Automatic translation into 12 languages in real time"],
        linkLabel: "See how the wine list works", linkHref: "/en/what-is-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Interactive wine list on tablet" : "Wine comparator" })),
      },
      {
        icon: Brain, title: "AI recommendations & automatic pairings",
        desc: "An AI engine that generates personalised recommendations based on the dish, diner context and the restaurant's commercial goals. Automatic pairings based on your actual wine list, not generic databases.",
        benefits: ["Automatic pairings based on your real menu and wine list", "Recommendations prioritised by margin, stock and rotation", "AI-generated wine sheets: descriptors, tasting notes and context", "Suggestions adapted to the diner's profile and occasion"],
        linkLabel: "Explore Winerim's AI", linkHref: "/en/artificial-intelligence-restaurants",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Automatic wine pairing" : "AI pairing configuration" })),
      },
      {
        icon: Package, title: "Stock & inventory management",
        desc: "Real-time inventory control connected to sales and wine list. Automatic dead stock detection, slow-rotation alerts, stockout prevention and full visibility of capital tied up in the cellar.",
        benefits: ["Automatic availability updates on the wine list", "Dead stock and slow-rotation wine detection", "Replenishment alerts before stockouts", "Visibility of tied-up capital by SKU and category"],
        linkLabel: "Dead stock tool", linkHref: "/en/tools/dead-stock-calculator",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Wine stock control" : "Obsolescence detection" })),
      },
      {
        icon: TrendingUp, title: "Pricing & margin analysis",
        desc: "Price simulator, per-SKU margin analysis, erosion detection and intelligent pricing tools. Compare your price structure against industry benchmarks and optimise without losing competitiveness or perceived value.",
        benefits: ["Real margin analysis by SKU, category and price range", "Pricing scenario simulation before implementation", "Margin erosion and purchase overprice detection", "Pricing benchmark against comparable restaurants"],
        linkLabel: "Margin calculator", linkHref: "/en/wine-margin-calculator",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Performance and margin analysis" : "Wine rotation" })),
      },
      {
        icon: BarChart3, title: "Advanced analytics & KPIs",
        desc: "Dashboard with wine-specific hospitality KPIs: average ticket, rotation by SKU, price mix, sale probability, by-the-glass vs bottle performance and time trends. Data you won't find in your POS or a spreadsheet.",
        benefits: ["Wine KPIs your POS doesn't track: rotation, mix, Beverage Cost", "Multi-site performance comparison for groups", "Time-series trends for sales, margins and rotation", "Automatic alerts when an indicator deviates"],
        linkLabel: "Explore Winerim Core", linkHref: "/en/product/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Insights and KPIs dashboard" : "Overall wine list performance" })),
      },
      {
        icon: Sparkles, title: "AI applied to wine",
        desc: "Wine sheets generated automatically with sensory descriptors, tasting notes, pairing suggestions and service context. Winerim's AI doesn't replace the sommelier — it saves hours of operational work and provides a solid foundation to build on.",
        benefits: ["Automatic sheet generation with descriptors and tasting notes", "Temperature, glass and decanting suggestions per SKU", "Content adapted to the restaurant's profile and audience", "Continuous updates with industry data and trends"],
        linkLabel: "AI for restaurants", linkHref: "/en/artificial-intelligence-restaurants",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Detailed wine sheet" : "RIM recommendation engine" })),
      },
      {
        icon: Zap, title: "Dynamic intelligence",
        desc: "The automatic action layer that acts on the wine list in real time. It reorders, highlights, hides and adapts SKUs based on margin, stock, weather, time and business goals. No intervention needed: the list optimises itself based on Core data.",
        benefits: ["Automatic wine list reordering based on commercial goals", "Highlighting wines with the best margin or rotation need", "Automatic hiding of out-of-stock or at-risk SKUs", "Contextual adaptation by weather, time of day or footfall"],
        linkLabel: "Discover Dynamic Intelligence", linkHref: "/en/product/dynamic-intelligence",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Dynamic recommendations" : "Automations" })),
      },
      {
        icon: GraduationCap, title: "Floor staff training",
        desc: "Wine guides, simplified sheets and contextual recommendations so floor staff can talk about wine with confidence, with or without prior training. The goal isn't to turn them into sommeliers, but into informed sellers.",
        benefits: ["Simplified sheets for every wine accessible from any device", "Contextual recommendations the team can use on the floor", "Service guides: temperature, glass, decanting, suggested pairing", "Continuous training without in-person sessions"],
        linkLabel: "Guide for restaurants without a sommelier", linkHref: "/en/guides/how-to-use-winerim-without-sommelier",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Team insights" : "Insights dashboard" })),
      },
    ],
    comparisonRows: [
      { feature: "QR-accessible wine list", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filters & wine comparator", winerim: "✅", cartaQR: "❌", digitalBasica: "Partial", tradicional: "❌" },
      { feature: "AI wine sheets", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Automatic pairings", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "AI recommendations", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Real-time stock control", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "Dead stock detection", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Per-SKU margin analysis", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Pricing simulation", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Wine-specific KPIs", winerim: "✅", cartaQR: "❌", digitalBasica: "Basic", tradicional: "❌" },
      { feature: "Sector benchmark", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Purchasing intelligence", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Dynamic list actions", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Floor staff training", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Auto multi-language", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manual", tradicional: "❌" },
      { feature: "Multi-site management", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "Does Winerim work with my current POS?", a: "Yes. Winerim integrates with major POS systems (Revo, Lightspeed, Oracle, etc.). If yours isn't listed, the technical team will assess connection feasibility at no extra cost." },
      { q: "Can I manage multiple venues from one panel?", a: "Yes. Centralised multi-site management is a key Winerim feature, designed for hospitality groups and hotels with multiple outlets." },
      { q: "Are AI recommendations based on generic data?", a: "No. Recommendations are generated from your actual wine list, sales patterns, stock levels and commercial goals. They're specific to your business, not generic." },
      { q: "What happens when a wine runs out?", a: "The system updates availability in real time. Out-of-stock wines automatically disappear from the diner-facing list without manual intervention." },
      { q: "Do I need a sommelier to use Winerim?", a: "No. Winerim is designed to work with or without a sommelier. In venues without a dedicated expert, the platform bridges the gap with smart recommendations, guided sheets and training tools for floor staff." },
    ],
    internalLinks: [
      { to: "/en/pricing", label: "Plans & pricing", type: "resource" },
      { to: "/en/product/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/en/product/dynamic-intelligence", label: "Dynamic Intelligence", type: "solution" },
      { to: "/en/product/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/en/integrations", label: "POS integrations", type: "tool" },
      { to: "/en/case-studies", label: "Case studies", type: "solution" },
    ],
  },
  it: {
    seoTitle: "Funzionalità di Winerim | Software per Carta dei Vini con IA",
    seoDesc: "Scopri le funzionalità di Winerim: carta digitale, IA, abbinamenti, stock, pricing, analisi e formazione. Tutto per vendere più vino.",
    schemaTitle: "Funzionalità di Winerim",
    schemaDesc: "Carta digitale, IA, abbinamenti automatici, gestione stock, pricing, analitica e intelligenza dinamica per ristoranti e hotel.",
    breadcrumb: "Funzionalità",
    badge: "Piattaforma completa",
    heroTitle: "Funzionalità di Winerim — ",
    heroTitleItalic: "Tutto ciò che serve per vendere più vino",
    heroDesc: "Winerim è la piattaforma di gestione intelligente del vino per ristoranti, hotel e gruppi di ristorazione. Unisce carta digitale interattiva, raccomandazioni con IA, controllo stock, pricing, analitica avanzata e intelligence sugli acquisti in un unico ecosistema. Progettato perché ogni decisione sul vino sia basata sui dati, non sull'intuizione.",
    ctaDemo: "Richiedi demo",
    ctaPricing: "Vedi prezzi",
    featureLabel: "Funzionalità",
    compBadge: "Confronto",
    compTitle: "Winerim vs alternative di mercato",
    compDesc: "Non tutte le soluzioni di carta digitale sono uguali. Questa è la differenza tra un menu QR, una carta digitale di base, la gestione tradizionale e una piattaforma di intelligenza come Winerim.",
    compColWinerim: "Winerim",
    compColQR: "Menu QR",
    compColBasic: "Digitale base",
    compColTraditional: "Tradizionale",
    ctaFinalTitle: "Vuoi vederlo in azione? ",
    ctaFinalItalic: "Richiedi una demo gratuita",
    ctaFinalDesc: "Ti mostriamo come Winerim può trasformare la gestione del vino nel tuo ristorante, hotel o gruppo. Senza impegno, con dati reali adattati al tuo business.",
    ctaFinalDemo: "Richiedi demo gratuita",
    ctaFinalPricing: "Vedi prezzi",
    features: [
      {
        icon: QrCode, title: "Carta digitale interattiva",
        desc: "Una carta che non si limita a mostrare i vini: filtra per tipo, prezzo, abbinamento e stile. Comparatore integrato, schede arricchite con IA, traduzione automatica in 12 lingue e accesso istantaneo tramite QR. Progettata perché il commensale esplori in autonomia e il personale di sala raccomandi con criterio.",
        benefits: ["Accesso QR da qualsiasi dispositivo, senza app né download", "Filtri avanzati per tipo, regione, prezzo, abbinamento e profilo sensoriale", "Comparatore fino a 4 vini con grafici radar", "Traduzione automatica in 12 lingue in tempo reale"],
        linkLabel: "Scopri come funziona la carta", linkHref: "/it/cose-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Carta interattiva dei vini su tablet" : "Comparatore di vini" })),
      },
      {
        icon: Brain, title: "Raccomandazioni IA e abbinamenti automatici",
        desc: "Motore di intelligenza artificiale che genera raccomandazioni personalizzate in base al piatto, al contesto del commensale e agli obiettivi commerciali del ristorante. Abbinamenti automatici basati sulla carta reale, non su database generici.",
        benefits: ["Abbinamenti automatici basati sulla tua carta e il tuo menù reale", "Raccomandazioni prioritizzate per margine, stock e rotazione", "Schede vino generate con IA: descrittori, note di degustazione e contesto", "Suggerimenti adattati al profilo del commensale e all'occasione"],
        linkLabel: "Esplora l'IA di Winerim", linkHref: "/it/intelligenza-artificiale-ristoranti",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Abbinamento automatico dei vini" : "Configurazione IA e abbinamento" })),
      },
      {
        icon: Package, title: "Gestione stock e inventario",
        desc: "Controllo dell'inventario in tempo reale collegato a vendite e carta. Rilevamento automatico di stock morto, avvisi di rotazione lenta, prevenzione di rottura di stock e visibilità totale sul capitale immobilizzato in cantina.",
        benefits: ["Aggiornamento automatico della disponibilità sulla carta", "Rilevamento di stock morto e vini a rotazione lenta", "Avvisi di riordino prima della rottura di stock", "Visibilità del capitale immobilizzato per referenza e categoria"],
        linkLabel: "Strumento stock morto", linkHref: "/it/strumenti/calcolatore-stock-morto",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Controllo stock vini" : "Rilevamento obsolescenza" })),
      },
      {
        icon: TrendingUp, title: "Pricing e analisi dei margini",
        desc: "Simulatore di prezzi, analisi dei margini per referenza, rilevamento dell'erosione e strumenti di pricing intelligente. Confronta la tua struttura di prezzi con benchmark del settore e ottimizza senza perdere competitività né percezione di valore.",
        benefits: ["Analisi del margine reale per referenza, categoria e fascia di prezzo", "Simulazione di scenari di pricing prima dell'implementazione", "Rilevamento di erosione dei margini e sovrapprezzo negli acquisti", "Benchmark di pricing rispetto a ristoranti comparabili"],
        linkLabel: "Calcolatore di margine", linkHref: "/it/calcolatore-margine-vino",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Analisi rendimento e margini" : "Rotazione vini" })),
      },
      {
        icon: BarChart3, title: "Analitica avanzata e KPI",
        desc: "Dashboard con KPI specifici del vino nella ristorazione: scontrino medio, rotazione per referenza, mix di prezzo, probabilità di vendita, rendimento calice vs bottiglia ed evoluzione temporale. Dati che non troverai nel tuo POS né in un foglio di calcolo.",
        benefits: ["KPI del vino che il tuo POS non misura: rotazione, mix, Beverage Cost", "Confronto prestazioni tra locali per gruppi", "Evoluzione temporale di vendite, margini e rotazione", "Avvisi automatici quando un indicatore devia"],
        linkLabel: "Esplora Winerim Core", linkHref: "/it/prodotto/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Dashboard insights e KPI" : "Rendimento globale carta" })),
      },
      {
        icon: Sparkles, title: "IA applicata al vino",
        desc: "Schede vino generate automaticamente con descrittori sensoriali, note di degustazione, suggerimenti di abbinamento e contesto di servizio. L'IA di Winerim non sostituisce il sommelier: gli risparmia ore di lavoro operativo e gli offre una base solida su cui costruire.",
        benefits: ["Generazione automatica di schede con descrittori e note di degustazione", "Suggerimenti di temperatura, calice e decantazione per referenza", "Contenuto adattato al profilo del ristorante e al suo pubblico", "Aggiornamento continuo con dati del settore e tendenze"],
        linkLabel: "IA per ristoranti", linkHref: "/it/intelligenza-artificiale-ristoranti",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Scheda vino dettagliata" : "Motore di raccomandazione RIM" })),
      },
      {
        icon: Zap, title: "Intelligenza dinamica",
        desc: "Il livello di azione automatica che agisce sulla carta in tempo reale. Riordina, evidenzia, nasconde e adatta referenze in base a margine, stock, clima, orario e obiettivi del business. Non devi intervenire: la carta si ottimizza da sola basandosi sui dati di Core.",
        benefits: ["Riordinamento automatico della carta in base agli obiettivi commerciali", "Evidenziazione di vini con miglior margine o necessità di rotazione", "Nascondimento automatico di referenze esaurite o a rischio", "Adattamento contestuale per clima, ora del giorno o affluenza"],
        linkLabel: "Scopri l'Intelligenza Dinamica", linkHref: "/it/prodotto/intelligenza-dinamica",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Raccomandazioni dinamiche" : "Automatizzazioni" })),
      },
      {
        icon: GraduationCap, title: "Formazione del personale di sala",
        desc: "Guide al vino, schede semplificate e raccomandazioni contestuali affinché il personale di sala possa parlare di vino con sicurezza, con o senza formazione precedente. L'obiettivo non è trasformarli in sommelier, ma in venditori informati.",
        benefits: ["Schede semplificate di ogni vino accessibili da qualsiasi dispositivo", "Raccomandazioni contestuali che il team può usare in sala", "Guide di servizio: temperatura, calice, decantazione, abbinamento suggerito", "Formazione continua senza sessioni in presenza"],
        linkLabel: "Guida per ristoranti senza sommelier", linkHref: "/it/guide/come-usare-winerim-senza-sommelier",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Insights per il team" : "Dashboard insights" })),
      },
    ],
    comparisonRows: [
      { feature: "Carta accessibile via QR", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filtri e comparatore vini", winerim: "✅", cartaQR: "❌", digitalBasica: "Parziale", tradicional: "❌" },
      { feature: "Schede vino con IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Abbinamenti automatici", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuale" },
      { feature: "Raccomandazioni IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Controllo stock in tempo reale", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuale" },
      { feature: "Rilevamento stock morto", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Analisi margini per referenza", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Simulazione pricing", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "KPI specifici del vino", winerim: "✅", cartaQR: "❌", digitalBasica: "Base", tradicional: "❌" },
      { feature: "Benchmark vs settore", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Intelligenza di acquisto", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Azione dinamica sulla carta", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Formazione personale di sala", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Multilingua automatico", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manuale", tradicional: "❌" },
      { feature: "Gestione multi-locale", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "Winerim funziona con il mio POS attuale?", a: "Sì. Winerim si integra con i principali POS del mercato (Revo, Lightspeed, Oracle, ecc.). Se il tuo POS non è nella lista, il team tecnico valuta la fattibilità della connessione senza costi aggiuntivi." },
      { q: "Posso gestire più locali da un unico pannello?", a: "Sì. La gestione centralizzata multi-locale è una funzionalità chiave di Winerim, progettata per gruppi di ristorazione e hotel con più punti vendita." },
      { q: "Le raccomandazioni dell'IA si basano su dati generici?", a: "No. Le raccomandazioni vengono generate dai dati reali della tua carta, dai tuoi pattern di vendita, dal tuo stock e dai tuoi obiettivi commerciali. Sono specifiche per il tuo business, non generiche." },
      { q: "Cosa succede quando un vino si esaurisce?", a: "Il sistema aggiorna la disponibilità in tempo reale. I vini esauriti scompaiono automaticamente dalla carta visibile al commensale, senza intervento manuale." },
      { q: "Ho bisogno di un sommelier per usare Winerim?", a: "No. Winerim è progettato per funzionare con o senza sommelier. Nei ristoranti senza esperto dedicato, la piattaforma colma il gap con raccomandazioni intelligenti, schede guidate e strumenti di formazione per il personale di sala." },
    ],
    internalLinks: [
      { to: "/it/prezzi", label: "Piani e prezzi", type: "resource" },
      { to: "/it/prodotto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/it/prodotto/intelligenza-dinamica", label: "Intelligenza Dinamica", type: "solution" },
      { to: "/it/prodotto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/it/integrazioni", label: "Integrazioni POS", type: "tool" },
      { to: "/it/casi-di-successo", label: "Casi di successo", type: "solution" },
    ],
  },
  fr: {
    seoTitle: "Fonctionnalités de Winerim | Logiciel de Carte des Vins avec IA",
    seoDesc: "Découvrez les fonctionnalités de Winerim : carte digitale, IA, accords, stock, pricing, analytique et formation. Tout pour vendre plus de vin.",
    schemaTitle: "Fonctionnalités de Winerim",
    schemaDesc: "Carte digitale, IA, accords automatiques, gestion de stock, pricing, analytique et intelligence dynamique pour restaurants et hôtels.",
    breadcrumb: "Fonctionnalités",
    badge: "Plateforme complète",
    heroTitle: "Fonctionnalités de Winerim — ",
    heroTitleItalic: "Tout ce qu'il faut pour vendre plus de vin",
    heroDesc: "Winerim est la plateforme de gestion intelligente du vin pour restaurants, hôtels et groupes de restauration. Elle combine carte digitale interactive, recommandations IA, contrôle de stock, pricing, analytique avancée et intelligence d'achat en un seul écosystème. Conçue pour que chaque décision sur le vin soit basée sur les données, pas sur l'intuition.",
    ctaDemo: "Demander une démo",
    ctaPricing: "Voir les tarifs",
    featureLabel: "Fonctionnalité",
    compBadge: "Comparatif",
    compTitle: "Winerim vs alternatives du marché",
    compDesc: "Toutes les solutions de carte digitale ne se valent pas. Voici la différence entre un menu QR, une carte digitale basique, la gestion traditionnelle et une plateforme d'intelligence comme Winerim.",
    compColWinerim: "Winerim",
    compColQR: "Menu QR",
    compColBasic: "Digitale basique",
    compColTraditional: "Traditionnelle",
    ctaFinalTitle: "Envie de le voir en action ? ",
    ctaFinalItalic: "Demandez une démo gratuite",
    ctaFinalDesc: "Nous vous montrons comment Winerim peut transformer la gestion du vin dans votre restaurant, hôtel ou groupe. Sans engagement, avec des données réelles adaptées à votre activité.",
    ctaFinalDemo: "Demander une démo gratuite",
    ctaFinalPricing: "Voir les tarifs",
    features: [
      {
        icon: QrCode, title: "Carte digitale interactive",
        desc: "Une carte qui ne se contente pas d'afficher les vins : elle filtre par type, prix, accord et style. Comparateur intégré, fiches enrichies par IA, traduction automatique en 12 langues et accès instantané par QR. Conçue pour que le convive explore en autonomie et que l'équipe de salle recommande avec pertinence.",
        benefits: ["Accès QR depuis n'importe quel appareil, sans appli ni téléchargement", "Filtres avancés par type, région, prix, accord et profil sensoriel", "Comparateur jusqu'à 4 vins avec graphiques radar", "Traduction automatique en 12 langues en temps réel"],
        linkLabel: "Voir comment fonctionne la carte", linkHref: "/fr/quest-ce-que-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Carte interactive des vins sur tablette" : "Comparateur de vins" })),
      },
      {
        icon: Brain, title: "Recommandations IA et accords automatiques",
        desc: "Un moteur d'intelligence artificielle qui génère des recommandations personnalisées selon le plat, le contexte du convive et les objectifs commerciaux du restaurant. Accords automatiques basés sur votre carte réelle, pas sur des bases de données génériques.",
        benefits: ["Accords automatiques basés sur votre carte et votre menu réels", "Recommandations priorisées par marge, stock et rotation", "Fiches de vin générées par IA : descripteurs, notes de dégustation et contexte", "Suggestions adaptées au profil du convive et à l'occasion"],
        linkLabel: "Explorer l'IA de Winerim", linkHref: "/fr/intelligence-artificielle-restaurants",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Accord automatique des vins" : "Configuration IA et accord" })),
      },
      {
        icon: Package, title: "Gestion de stock et inventaire",
        desc: "Contrôle d'inventaire en temps réel connecté aux ventes et à la carte. Détection automatique de stock mort, alertes de rotation lente, prévention de rupture de stock et visibilité totale sur le capital immobilisé en cave.",
        benefits: ["Mise à jour automatique de la disponibilité sur la carte", "Détection de stock mort et vins à rotation lente", "Alertes de réapprovisionnement avant la rupture de stock", "Visibilité du capital immobilisé par référence et catégorie"],
        linkLabel: "Outil de stock mort", linkHref: "/fr/outils/calculateur-stock-mort",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Contrôle du stock de vins" : "Détection d'obsolescence" })),
      },
      {
        icon: TrendingUp, title: "Pricing et analyse des marges",
        desc: "Simulateur de prix, analyse des marges par référence, détection d'érosion et outils de pricing intelligent. Comparez votre structure de prix aux benchmarks du secteur et optimisez sans perdre en compétitivité ni en perception de valeur.",
        benefits: ["Analyse de marge réelle par référence, catégorie et tranche de prix", "Simulation de scénarios de pricing avant mise en œuvre", "Détection d'érosion de marges et de surprix d'achat", "Benchmark de pricing face à des restaurants comparables"],
        linkLabel: "Calculateur de marge", linkHref: "/fr/calculateur-marge-vin",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Analyse de rendement et marges" : "Rotation des vins" })),
      },
      {
        icon: BarChart3, title: "Analytique avancée et KPIs",
        desc: "Dashboard avec KPIs spécifiques du vin en restauration : ticket moyen, rotation par référence, mix de prix, probabilité de vente, rendement au verre vs bouteille et évolution temporelle. Des données introuvables dans votre caisse ni dans un tableur.",
        benefits: ["KPIs vin que votre caisse ne mesure pas : rotation, mix, Beverage Cost", "Comparaison de performance entre établissements pour les groupes", "Évolution temporelle des ventes, marges et rotation", "Alertes automatiques quand un indicateur dévie"],
        linkLabel: "Explorer Winerim Core", linkHref: "/fr/produit/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Dashboard insights et KPIs" : "Performance globale de la carte" })),
      },
      {
        icon: Sparkles, title: "IA appliquée au vin",
        desc: "Fiches de vin générées automatiquement avec descripteurs sensoriels, notes de dégustation, suggestions d'accord et contexte de service. L'IA de Winerim ne remplace pas le sommelier : elle lui économise des heures de travail opérationnel et lui offre une base solide pour construire.",
        benefits: ["Génération automatique de fiches avec descripteurs et notes de dégustation", "Suggestions de température, verre et décantation par référence", "Contenu adapté au profil du restaurant et de son public", "Mise à jour continue avec données du secteur et tendances"],
        linkLabel: "IA pour restaurants", linkHref: "/fr/intelligence-artificielle-restaurants",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Fiche de vin détaillée" : "Moteur de recommandation RIM" })),
      },
      {
        icon: Zap, title: "Intelligence dynamique",
        desc: "La couche d'action automatique qui agit sur la carte en temps réel. Elle réordonne, met en avant, masque et adapte les références selon la marge, le stock, la météo, l'heure et les objectifs du business. Pas besoin d'intervenir : la carte s'optimise toute seule en se basant sur les données de Core.",
        benefits: ["Réorganisation automatique de la carte selon les objectifs commerciaux", "Mise en avant des vins à meilleure marge ou besoin de rotation", "Masquage automatique des références épuisées ou à risque", "Adaptation contextuelle selon météo, heure du jour ou affluence"],
        linkLabel: "Découvrir l'Intelligence Dynamique", linkHref: "/fr/produit/intelligence-dynamique",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Recommandations dynamiques" : "Automatisations" })),
      },
      {
        icon: GraduationCap, title: "Formation de l'équipe de salle",
        desc: "Guides du vin, fiches simplifiées et recommandations contextuelles pour que l'équipe de salle puisse parler du vin avec assurance, avec ou sans formation préalable. L'objectif n'est pas d'en faire des sommeliers, mais des vendeurs informés.",
        benefits: ["Fiches simplifiées de chaque vin accessibles depuis n'importe quel appareil", "Recommandations contextuelles utilisables en salle", "Guides de service : température, verre, décantation, accord suggéré", "Formation continue sans sessions en présentiel"],
        linkLabel: "Guide pour restaurants sans sommelier", linkHref: "/fr/guides/comment-utiliser-winerim-sans-sommelier",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Insights pour l'équipe" : "Dashboard insights" })),
      },
    ],
    comparisonRows: [
      { feature: "Carte accessible par QR", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filtres et comparateur de vins", winerim: "✅", cartaQR: "❌", digitalBasica: "Partiel", tradicional: "❌" },
      { feature: "Fiches de vin avec IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Accords automatiques", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuel" },
      { feature: "Recommandations IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Contrôle de stock en temps réel", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuel" },
      { feature: "Détection de stock mort", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Analyse de marges par référence", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Simulation de pricing", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "KPIs spécifiques du vin", winerim: "✅", cartaQR: "❌", digitalBasica: "Basique", tradicional: "❌" },
      { feature: "Benchmark vs secteur", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Intelligence d'achat", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Action dynamique sur la carte", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Formation de l'équipe de salle", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Multilingue automatique", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manuel", tradicional: "❌" },
      { feature: "Gestion multi-établissement", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "Winerim fonctionne-t-il avec ma caisse actuelle ?", a: "Oui. Winerim s'intègre aux principales caisses du marché (Revo, Lightspeed, Oracle, etc.). Si la vôtre n'est pas dans la liste, l'équipe technique évalue la faisabilité de la connexion sans frais supplémentaires." },
      { q: "Puis-je gérer plusieurs établissements depuis un seul tableau de bord ?", a: "Oui. La gestion centralisée multi-établissement est une fonctionnalité clé de Winerim, conçue pour les groupes de restauration et hôtels avec plusieurs points de vente." },
      { q: "Les recommandations de l'IA reposent-elles sur des données génériques ?", a: "Non. Les recommandations sont générées à partir des données réelles de votre carte, de vos schémas de vente, de votre stock et de vos objectifs commerciaux. Elles sont spécifiques à votre activité, pas génériques." },
      { q: "Que se passe-t-il quand un vin est épuisé ?", a: "Le système met à jour la disponibilité en temps réel. Les vins épuisés disparaissent automatiquement de la carte visible par le convive, sans intervention manuelle." },
      { q: "Ai-je besoin d'un sommelier pour utiliser Winerim ?", a: "Non. Winerim est conçu pour fonctionner avec ou sans sommelier. Dans les établissements sans expert dédié, la plateforme comble le gap avec des recommandations intelligentes, des fiches guidées et des outils de formation pour l'équipe de salle." },
    ],
    internalLinks: [
      { to: "/fr/tarifs", label: "Plans et tarifs", type: "resource" },
      { to: "/fr/produit/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/fr/produit/intelligence-dynamique", label: "Intelligence Dynamique", type: "solution" },
      { to: "/fr/produit/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/fr/integrations", label: "Intégrations caisse", type: "tool" },
      { to: "/fr/cas-clients", label: "Cas clients", type: "solution" },
    ],
  },
  de: {
    seoTitle: "Funktionen von Winerim | KI-Software für die Weinkarte",
    seoDesc: "Entdecken Sie die Funktionen von Winerim: digitale Weinkarte, KI, Speisenbegleitung, Bestand, Pricing, Analytik und Schulung. Alles, um mehr Wein zu verkaufen.",
    schemaTitle: "Funktionen von Winerim",
    schemaDesc: "Digitale Weinkarte, KI, automatische Speisenbegleitung, Bestandsverwaltung, Pricing, Analytik und dynamische Intelligenz für Restaurants und Hotels.",
    breadcrumb: "Funktionen",
    badge: "Komplettplattform",
    heroTitle: "Funktionen von Winerim — ",
    heroTitleItalic: "Alles, was Sie brauchen, um mehr Wein zu verkaufen",
    heroDesc: "Winerim ist die intelligente Weinmanagement-Plattform für Restaurants, Hotels und Gastronomiegruppen. Sie vereint interaktive digitale Weinkarte, KI-Empfehlungen, Bestandskontrolle, Pricing, erweiterte Analytik und Einkaufsintelligenz in einem einzigen Ökosystem. Konzipiert, damit jede Weinentscheidung auf Daten basiert — nicht auf Intuition.",
    ctaDemo: "Demo anfordern",
    ctaPricing: "Preise ansehen",
    featureLabel: "Funktion",
    compBadge: "Vergleich",
    compTitle: "Winerim vs Alternativen am Markt",
    compDesc: "Nicht alle digitalen Weinkarten-Lösungen sind gleich. Das ist der Unterschied zwischen einem QR-Menü, einer einfachen digitalen Karte, traditioneller Verwaltung und einer Intelligenzplattform wie Winerim.",
    compColWinerim: "Winerim",
    compColQR: "QR-Menü",
    compColBasic: "Digital einfach",
    compColTraditional: "Traditionell",
    ctaFinalTitle: "Möchten Sie es in Aktion sehen? ",
    ctaFinalItalic: "Fordern Sie eine kostenlose Demo an",
    ctaFinalDesc: "Wir zeigen Ihnen, wie Winerim das Weinmanagement in Ihrem Restaurant, Hotel oder Ihrer Gruppe transformieren kann. Unverbindlich, mit echten Daten, die auf Ihr Geschäft zugeschnitten sind.",
    ctaFinalDemo: "Kostenlose Demo anfordern",
    ctaFinalPricing: "Preise ansehen",
    features: [
      {
        icon: QrCode, title: "Interaktive digitale Weinkarte",
        desc: "Eine Weinkarte, die mehr kann als Weine anzeigen: Sie filtert nach Typ, Preis, Speisenbegleitung und Stil. Integrierter Vergleich, KI-angereicherte Datenblätter, automatische Übersetzung in 12 Sprachen und sofortiger QR-Zugang. Konzipiert, damit der Gast eigenständig entdeckt und das Servicepersonal fundiert empfiehlt.",
        benefits: ["QR-Zugang von jedem Gerät, ohne App oder Download", "Erweiterte Filter nach Typ, Region, Preis, Speisenbegleitung und Sensorikprofil", "Vergleich von bis zu 4 Weinen mit Radar-Diagrammen", "Automatische Übersetzung in 12 Sprachen in Echtzeit"],
        linkLabel: "So funktioniert die Weinkarte", linkHref: "/de/was-ist-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Interaktive Weinkarte auf Tablet" : "Weinvergleich" })),
      },
      {
        icon: Brain, title: "KI-Empfehlungen & automatische Speisenbegleitung",
        desc: "KI-Engine, die personalisierte Empfehlungen basierend auf dem Gericht, dem Gästekontext und den kommerziellen Zielen des Restaurants generiert. Automatische Speisenbegleitung basierend auf Ihrer tatsächlichen Weinkarte — nicht auf generischen Datenbanken.",
        benefits: ["Automatische Speisenbegleitung basierend auf Ihrer echten Speisekarte und Weinkarte", "Empfehlungen priorisiert nach Marge, Bestand und Rotation", "KI-generierte Weindatenblätter: Deskriptoren, Verkostungsnotizen und Kontext", "Vorschläge angepasst an das Gästeprofil und den Anlass"],
        linkLabel: "Winerims KI entdecken", linkHref: "/de/kuenstliche-intelligenz-restaurants",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Automatische Weinbegleitung" : "KI-Konfiguration" })),
      },
      {
        icon: Package, title: "Bestands- und Lagerverwaltung",
        desc: "Echtzeit-Bestandskontrolle verknüpft mit Verkäufen und Weinkarte. Automatische Erkennung von Totbestand, Warnungen bei langsamer Rotation, Vermeidung von Fehlbeständen und vollständige Transparenz über das in der Kellerlagerung gebundene Kapital.",
        benefits: ["Automatische Verfügbarkeitsaktualisierung auf der Weinkarte", "Erkennung von Totbestand und Weinen mit langsamer Rotation", "Nachbestellwarnungen vor Lagerausfall", "Transparenz über gebundenes Kapital nach Referenz und Kategorie"],
        linkLabel: "Totbestand-Werkzeug", linkHref: "/de/werkzeuge/totbestand-rechner",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Weinbestandskontrolle" : "Obsoleszenz-Erkennung" })),
      },
      {
        icon: TrendingUp, title: "Pricing & Margenanalyse",
        desc: "Preissimulator, Margenanalyse pro Referenz, Erosionserkennung und intelligente Pricing-Werkzeuge. Vergleichen Sie Ihre Preisstruktur mit Branchen-Benchmarks und optimieren Sie, ohne Wettbewerbsfähigkeit oder Wertwahrnehmung zu verlieren.",
        benefits: ["Echte Margenanalyse nach Referenz, Kategorie und Preissegment", "Pricing-Szenario-Simulation vor der Umsetzung", "Erkennung von Margenerosion und Überbezahlung im Einkauf", "Pricing-Benchmark gegenüber vergleichbaren Restaurants"],
        linkLabel: "Margenrechner", linkHref: "/de/weinmargen-rechner",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Leistungs- und Margenanalyse" : "Weinrotation" })),
      },
      {
        icon: BarChart3, title: "Erweiterte Analytik & KPIs",
        desc: "Dashboard mit weinspezifischen Gastronomie-KPIs: Durchschnittsbon, Rotation pro Referenz, Preismix, Verkaufswahrscheinlichkeit, Glaswein- vs. Flaschenleistung und Zeitverläufe. Daten, die Sie weder in Ihrem Kassensystem noch in einer Tabellenkalkulation finden.",
        benefits: ["Wein-KPIs, die Ihr Kassensystem nicht misst: Rotation, Mix, Beverage Cost", "Leistungsvergleich zwischen Standorten für Gruppen", "Zeitliche Entwicklung von Umsatz, Margen und Rotation", "Automatische Warnungen bei Abweichung eines Indikators"],
        linkLabel: "Winerim Core entdecken", linkHref: "/de/produkt/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Insights- und KPI-Dashboard" : "Gesamtleistung der Weinkarte" })),
      },
      {
        icon: Sparkles, title: "KI angewandt auf Wein",
        desc: "Automatisch generierte Weindatenblätter mit Sensorik-Deskriptoren, Verkostungsnotizen, Begleitungsvorschlägen und Servicekontext. Winerims KI ersetzt nicht den Sommelier — sie spart Stunden operativer Arbeit und bietet eine solide Grundlage zum Aufbauen.",
        benefits: ["Automatische Erstellung von Datenblättern mit Deskriptoren und Verkostungsnotizen", "Temperatur-, Glas- und Dekantiervorschläge pro Referenz", "Inhalte angepasst an das Profil des Restaurants und sein Publikum", "Laufende Aktualisierung mit Branchendaten und Trends"],
        linkLabel: "KI für Restaurants", linkHref: "/de/kuenstliche-intelligenz-restaurants",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Detailliertes Weindatenblatt" : "RIM-Empfehlungsmotor" })),
      },
      {
        icon: Zap, title: "Dynamische Intelligenz",
        desc: "Die automatische Aktionsschicht, die die Weinkarte in Echtzeit steuert. Sie ordnet um, hebt hervor, blendet aus und passt Referenzen nach Marge, Bestand, Wetter, Uhrzeit und Geschäftszielen an. Kein Eingreifen nötig: Die Karte optimiert sich selbst auf Basis der Core-Daten.",
        benefits: ["Automatische Neuordnung der Karte nach kommerziellen Zielen", "Hervorhebung von Weinen mit bester Marge oder Rotationsbedarf", "Automatisches Ausblenden ausverkaufter oder gefährdeter Referenzen", "Kontextuelle Anpassung nach Wetter, Tageszeit oder Gästeaufkommen"],
        linkLabel: "Dynamische Intelligenz entdecken", linkHref: "/de/produkt/dynamische-intelligenz",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Dynamische Empfehlungen" : "Automatisierungen" })),
      },
      {
        icon: GraduationCap, title: "Schulung des Servicepersonals",
        desc: "Weinleitfäden, vereinfachte Datenblätter und kontextuelle Empfehlungen, damit das Servicepersonal selbstbewusst über Wein sprechen kann — mit oder ohne Vorbildung. Das Ziel ist nicht, sie zu Sommeliers zu machen, sondern zu informierten Verkäufern.",
        benefits: ["Vereinfachte Datenblätter für jeden Wein, von jedem Gerät abrufbar", "Kontextuelle Empfehlungen, die das Team im Service nutzen kann", "Service-Leitfäden: Temperatur, Glas, Dekantierung, empfohlene Begleitung", "Fortlaufende Schulung ohne Präsenzveranstaltungen"],
        linkLabel: "Leitfaden für Restaurants ohne Sommelier", linkHref: "/de/ratgeber/winerim-ohne-sommelier-nutzen",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Insights für das Team" : "Insights-Dashboard" })),
      },
    ],
    comparisonRows: [
      { feature: "Per QR zugängliche Weinkarte", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filter & Weinvergleich", winerim: "✅", cartaQR: "❌", digitalBasica: "Teilweise", tradicional: "❌" },
      { feature: "KI-Weindatenblätter", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Automatische Speisenbegleitung", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuell" },
      { feature: "KI-Empfehlungen", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Echtzeit-Bestandskontrolle", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manuell" },
      { feature: "Totbestand-Erkennung", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Margenanalyse pro Referenz", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Pricing-Simulation", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Weinspezifische KPIs", winerim: "✅", cartaQR: "❌", digitalBasica: "Einfach", tradicional: "❌" },
      { feature: "Branchen-Benchmark", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Einkaufsintelligenz", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Dynamische Kartensteuerung", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Schulung des Servicepersonals", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Automatische Mehrsprachigkeit", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manuell", tradicional: "❌" },
      { feature: "Multi-Standort-Verwaltung", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "Funktioniert Winerim mit meinem aktuellen Kassensystem?", a: "Ja. Winerim integriert sich mit den führenden Kassensystemen am Markt (Revo, Lightspeed, Oracle usw.). Wenn Ihres nicht in der Liste steht, prüft das Technikteam die Anschlussmöglichkeit ohne Zusatzkosten." },
      { q: "Kann ich mehrere Standorte über ein Panel verwalten?", a: "Ja. Die zentralisierte Multi-Standort-Verwaltung ist eine Kernfunktion von Winerim, konzipiert für Gastronomiegruppen und Hotels mit mehreren Verkaufspunkten." },
      { q: "Basieren die KI-Empfehlungen auf generischen Daten?", a: "Nein. Die Empfehlungen werden aus den echten Daten Ihrer Weinkarte, Ihren Verkaufsmustern, Ihrem Bestand und Ihren Geschäftszielen generiert. Sie sind spezifisch für Ihr Geschäft, nicht generisch." },
      { q: "Was passiert, wenn ein Wein ausverkauft ist?", a: "Das System aktualisiert die Verfügbarkeit in Echtzeit. Ausverkaufte Weine verschwinden automatisch von der für den Gast sichtbaren Karte — ohne manuellen Eingriff." },
      { q: "Benötige ich einen Sommelier, um Winerim zu nutzen?", a: "Nein. Winerim ist für den Betrieb mit und ohne Sommelier konzipiert. In Restaurants ohne dedizierten Experten überbrückt die Plattform die Lücke mit intelligenten Empfehlungen, geführten Datenblättern und Schulungswerkzeugen für das Servicepersonal." },
    ],
    internalLinks: [
      { to: "/de/preise", label: "Pläne & Preise", type: "resource" },
      { to: "/de/produkt/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/de/produkt/dynamische-intelligenz", label: "Dynamische Intelligenz", type: "solution" },
      { to: "/de/produkt/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/de/integrationen", label: "Kassenintegrationen", type: "tool" },
      { to: "/de/erfolgsgeschichten", label: "Erfolgsgeschichten", type: "solution" },
    ],
  },
  pt: {
    seoTitle: "Funcionalidades do Winerim | Software de Carta de Vinhos com IA",
    seoDesc: "Descubra as funcionalidades do Winerim: carta digital, IA, harmonizações, stock, pricing, analítica e formação. Tudo para vender mais vinho.",
    schemaTitle: "Funcionalidades do Winerim",
    schemaDesc: "Carta digital, IA, harmonizações automáticas, gestão de stock, pricing, analítica e inteligência dinâmica para restaurantes e hotéis.",
    breadcrumb: "Funcionalidades",
    badge: "Plataforma completa",
    heroTitle: "Funcionalidades do Winerim — ",
    heroTitleItalic: "Tudo o que precisa para vender mais vinho",
    heroDesc: "O Winerim é a plataforma de gestão inteligente do vinho para restaurantes, hotéis e grupos de restauração. Combina carta digital interativa, recomendações com IA, controlo de stock, pricing, analítica avançada e inteligência de compras num único ecossistema. Concebido para que cada decisão sobre o vinho seja baseada em dados, não em intuição.",
    ctaDemo: "Pedir demo",
    ctaPricing: "Ver preços",
    featureLabel: "Funcionalidade",
    compBadge: "Comparação",
    compTitle: "Winerim vs alternativas do mercado",
    compDesc: "Nem todas as soluções de carta digital são iguais. Esta é a diferença entre um menu QR, uma carta digital básica, a gestão tradicional e uma plataforma de inteligência como o Winerim.",
    compColWinerim: "Winerim",
    compColQR: "Menu QR",
    compColBasic: "Digital básica",
    compColTraditional: "Tradicional",
    ctaFinalTitle: "Quer vê-lo em ação? ",
    ctaFinalItalic: "Peça uma demo gratuita",
    ctaFinalDesc: "Mostramos-lhe como o Winerim pode transformar a gestão do vinho no seu restaurante, hotel ou grupo. Sem compromisso, com dados reais adaptados ao seu negócio.",
    ctaFinalDemo: "Pedir demo gratuita",
    ctaFinalPricing: "Ver preços",
    features: [
      {
        icon: QrCode, title: "Carta digital interativa",
        desc: "Uma carta que não se limita a mostrar vinhos: filtra por tipo, preço, harmonização e estilo. Comparador integrado, fichas enriquecidas com IA, tradução automática para 12 idiomas e acesso instantâneo por QR. Concebida para que o cliente explore com autonomia e a equipa de sala recomende com critério.",
        benefits: ["Acesso por QR a partir de qualquer dispositivo, sem app nem download", "Filtros avançados por tipo, região, preço, harmonização e perfil sensorial", "Comparador de até 4 vinhos com gráficos radar", "Tradução automática para 12 idiomas em tempo real"],
        linkLabel: "Ver como funciona a carta", linkHref: "/pt/o-que-e-winerim",
        screenshots: SHOTS.carta.map((s, j) => ({ ...s, alt: j === 0 ? "Carta interativa de vinhos em tablet" : "Comparador de vinhos" })),
      },
      {
        icon: Brain, title: "Recomendações com IA e harmonizações automáticas",
        desc: "Motor de inteligência artificial que gera recomendações personalizadas consoante o prato, o contexto do cliente e os objetivos comerciais do restaurante. Harmonizações automáticas baseadas na carta real, não em bases de dados genéricas.",
        benefits: ["Harmonizações automáticas baseadas na sua carta e ementa reais", "Recomendações priorizadas por margem, stock e rotação", "Fichas de vinho geradas com IA: descritores, notas de prova e contexto", "Sugestões adaptadas ao perfil do cliente e à ocasião"],
        linkLabel: "Explorar a IA do Winerim", linkHref: "/pt/inteligencia-artificial-restaurantes",
        screenshots: SHOTS.ai.map((s, j) => ({ ...s, alt: j === 0 ? "Harmonização automática de vinhos" : "Configuração de IA e harmonização" })),
      },
      {
        icon: Package, title: "Gestão de stock e inventário",
        desc: "Controlo de inventário em tempo real ligado a vendas e carta. Deteção automática de stock morto, alertas de rotação lenta, prevenção de rutura de stock e visibilidade total sobre o capital imobilizado na garrafeira.",
        benefits: ["Atualização automática da disponibilidade na carta", "Deteção de stock morto e vinhos com rotação lenta", "Alertas de reposição antes da rutura de stock", "Visibilidade do capital imobilizado por referência e categoria"],
        linkLabel: "Ferramenta de stock morto", linkHref: "/pt/ferramentas/calculadora-stock-morto",
        screenshots: SHOTS.stock.map((s, j) => ({ ...s, alt: j === 0 ? "Controlo de stock de vinhos" : "Deteção de obsolescência" })),
      },
      {
        icon: TrendingUp, title: "Pricing e análise de margens",
        desc: "Simulador de preços, análise de margens por referência, deteção de erosão e ferramentas de pricing inteligente. Compare a sua estrutura de preços com benchmarks do setor e otimize sem perder competitividade nem perceção de valor.",
        benefits: ["Análise de margem real por referência, categoria e gama de preço", "Simulação de cenários de pricing antes de implementar alterações", "Deteção de erosão de margens e sobrepreço nas compras", "Benchmark de pricing face a restaurantes comparáveis"],
        linkLabel: "Calculadora de margem", linkHref: "/pt/calculadora-margem-vinho",
        screenshots: SHOTS.pricing.map((s, j) => ({ ...s, alt: j === 0 ? "Análise de rendimento e margens" : "Rotação de vinhos" })),
      },
      {
        icon: BarChart3, title: "Analítica avançada e KPIs",
        desc: "Dashboard com KPIs específicos do vinho na restauração: bilhete médio, rotação por referência, mix de preços, probabilidade de venda, rendimento a copo vs garrafa e evolução temporal. Dados que não encontrará no seu POS nem numa folha de cálculo.",
        benefits: ["KPIs de vinho que o seu POS não mede: rotação, mix, Beverage Cost", "Comparação de rendimento entre locais para grupos", "Evolução temporal de vendas, margens e rotação", "Alertas automáticos quando um indicador se desvia"],
        linkLabel: "Explorar Winerim Core", linkHref: "/pt/produto/winerim-core",
        screenshots: SHOTS.analytics.map((s, j) => ({ ...s, alt: j === 0 ? "Dashboard de insights e KPIs" : "Rendimento global da carta" })),
      },
      {
        icon: Sparkles, title: "IA aplicada ao vinho",
        desc: "Fichas de vinho geradas automaticamente com descritores sensoriais, notas de prova, sugestões de harmonização e contexto de serviço. A IA do Winerim não substitui o escanção: poupa-lhe horas de trabalho operacional e oferece uma base sólida para construir.",
        benefits: ["Geração automática de fichas com descritores e notas de prova", "Sugestões de temperatura, copo e decantação por referência", "Conteúdo adaptado ao perfil do restaurante e ao seu público", "Atualização contínua com dados do setor e tendências"],
        linkLabel: "IA para restaurantes", linkHref: "/pt/inteligencia-artificial-restaurantes",
        screenshots: SHOTS.iaApplied.map((s, j) => ({ ...s, alt: j === 0 ? "Ficha de vinho detalhada" : "Motor de recomendação RIM" })),
      },
      {
        icon: Zap, title: "Inteligência dinâmica",
        desc: "A camada de ação automática que atua sobre a carta em tempo real. Reordena, destaca, oculta e adapta referências consoante margem, stock, clima, hora e objetivos do negócio. Não precisa de intervir: a carta otimiza-se sozinha com base nos dados do Core.",
        benefits: ["Reordenação automática da carta segundo objetivos comerciais", "Destaque de vinhos com melhor margem ou necessidade de rotação", "Ocultação automática de referências esgotadas ou em risco", "Adaptação contextual por clima, hora do dia ou afluência"],
        linkLabel: "Descobrir Inteligência Dinâmica", linkHref: "/pt/produto/inteligencia-dinamica",
        screenshots: SHOTS.dynamic.map((s, j) => ({ ...s, alt: j === 0 ? "Recomendações dinâmicas" : "Automatizações" })),
      },
      {
        icon: GraduationCap, title: "Formação da equipa de sala",
        desc: "Guias de vinho, fichas simplificadas e recomendações contextuais para que a equipa de sala possa falar de vinho com confiança, com ou sem formação prévia. O objetivo não é transformá-los em escanções, mas em vendedores informados.",
        benefits: ["Fichas simplificadas de cada vinho acessíveis a partir de qualquer dispositivo", "Recomendações contextuais que a equipa pode usar em sala", "Guias de serviço: temperatura, copo, decantação, harmonização sugerida", "Formação contínua sem necessidade de sessões presenciais"],
        linkLabel: "Guia para restaurantes sem escanção", linkHref: "/pt/guias/como-usar-winerim-sem-escancao",
        screenshots: SHOTS.training.map((s, j) => ({ ...s, alt: j === 0 ? "Insights para a equipa" : "Dashboard de insights" })),
      },
    ],
    comparisonRows: [
      { feature: "Carta acessível por QR", winerim: "✅", cartaQR: "✅", digitalBasica: "✅", tradicional: "❌" },
      { feature: "Filtros e comparador de vinhos", winerim: "✅", cartaQR: "❌", digitalBasica: "Parcial", tradicional: "❌" },
      { feature: "Fichas de vinho com IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Harmonizações automáticas", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "Recomendações com IA", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Controlo de stock em tempo real", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Manual" },
      { feature: "Deteção de stock morto", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Análise de margens por referência", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "Excel" },
      { feature: "Simulação de pricing", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "KPIs específicos do vinho", winerim: "✅", cartaQR: "❌", digitalBasica: "Básico", tradicional: "❌" },
      { feature: "Benchmark vs setor", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Inteligência de compras", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Ação dinâmica sobre a carta", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Formação da equipa de sala", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
      { feature: "Multilingue automático", winerim: "✅ (12)", cartaQR: "❌", digitalBasica: "Manual", tradicional: "❌" },
      { feature: "Gestão multi-local", winerim: "✅", cartaQR: "❌", digitalBasica: "❌", tradicional: "❌" },
    ],
    faqs: [
      { q: "O Winerim funciona com o meu POS atual?", a: "Sim. O Winerim integra-se com os principais POS do mercado (Revo, Lightspeed, Oracle, etc.). Se o seu não estiver na lista, a equipa técnica avalia a viabilidade da ligação sem custo adicional." },
      { q: "Posso gerir vários locais a partir de um único painel?", a: "Sim. A gestão centralizada multi-local é uma funcionalidade-chave do Winerim, concebida para grupos de restauração e hotéis com múltiplos pontos de venda." },
      { q: "As recomendações da IA baseiam-se em dados genéricos?", a: "Não. As recomendações são geradas a partir dos dados reais da sua carta, dos seus padrões de venda, do seu stock e dos seus objetivos comerciais. São específicas para o seu negócio, não genéricas." },
      { q: "O que acontece quando um vinho esgota?", a: "O sistema atualiza a disponibilidade em tempo real. Os vinhos esgotados desaparecem automaticamente da carta visível para o cliente, sem intervenção manual." },
      { q: "Preciso de um escanção para usar o Winerim?", a: "Não. O Winerim foi concebido para funcionar com ou sem escanção. Em restaurantes sem especialista dedicado, a plataforma colmata a lacuna com recomendações inteligentes, fichas orientadas e ferramentas de formação para a equipa de sala." },
    ],
    internalLinks: [
      { to: "/pt/precos", label: "Planos e preços", type: "resource" },
      { to: "/pt/produto/winerim-core", label: "Winerim Core", type: "solution" },
      { to: "/pt/produto/inteligencia-dinamica", label: "Inteligência Dinâmica", type: "solution" },
      { to: "/pt/produto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/pt/integracoes", label: "Integrações POS", type: "tool" },
      { to: "/pt/casos-de-sucesso", label: "Casos de sucesso", type: "solution" },
    ],
  },
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
const Funcionalidades = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = getI18n(content, lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDesc}
        url={`${CANONICAL_DOMAIN}${localePath("/funcionalidades")}`}
        hreflang={allLangPaths("/funcionalidades")}
      />
      <DynamicSchemaMarkup
        id="funcionalidades"
        type="SoftwareApplication"
        title={c.schemaTitle}
        description={c.schemaDesc}
        url={`${CANONICAL_DOMAIN}${localePath("/funcionalidades")}`}
        faqs={c.faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: c.breadcrumb, url: `${CANONICAL_DOMAIN}${localePath("/funcionalidades")}` },
        ]}
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <Layers size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.badge}</span>
            </span>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
              {c.heroTitle}
              <span className="text-gradient-wine italic">{c.heroTitleItalic}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
              {c.heroDesc}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-4">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                {c.ctaDemo} <ArrowRight size={16} />
              </Link>
              <Link
                to={localePath("/precios")}
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
              >
                {c.ctaPricing}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. FEATURE BLOCKS WITH SCREENSHOTS
          ═══════════════════════════════════════════════════════════ */}
      {c.features.map((feat, i) => {
        const Icon = feat.icon;
        const isAlt = i % 2 !== 0;
        const reversed = i % 2 !== 0;
        return (
          <section
            key={i}
            id={`feat-${i}`}
            className={`section-padding ${isAlt ? "bg-gradient-dark" : ""}`}
          >
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className={`grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-center ${reversed ? "lg:grid-cols-[380px_1fr]" : ""}`}>
                  <div className={reversed ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center">
                        <Icon size={24} className="text-wine" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-wine/60">
                        {c.featureLabel} {String.fromCharCode(97 + i)})
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                      {feat.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-base md:text-lg">
                      {feat.desc}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {feat.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-wine shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={localePath(feat.linkHref)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-light transition-colors"
                    >
                      {feat.linkLabel} <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className={`${reversed ? "lg:order-1" : ""}`}>
                    <div className="grid grid-cols-1 gap-4">
                      {feat.screenshots.map((shot, j) => (
                        <div key={j} className="relative group">
                          <div className="absolute -inset-2 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.08),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <img
                            src={shot.img}
                            alt={shot.alt}
                            className="relative w-full rounded-xl border border-border shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            loading="lazy"
                          />
                          <p className="text-[10px] text-muted-foreground/60 text-center mt-2 font-medium">{shot.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════
          3. COMPARISON TABLE
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
              {c.compBadge}
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
              {c.compTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {c.compDesc}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wine/10 border-b border-border">
                    <th className="text-left px-5 py-4 font-heading font-bold text-foreground min-w-[200px]">{c.featureLabel}</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-wine min-w-[120px]">{c.compColWinerim}</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[120px]">{c.compColQR}</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[140px]">{c.compColBasic}</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[120px]">{c.compColTraditional}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-card/50" : "bg-card/30"}`}>
                      <td className="px-5 py-3.5 text-foreground font-medium">{row.feature}</td>
                      <td className="px-4 py-3.5 text-center font-semibold">{row.winerim}</td>
                      <td className="px-4 py-3.5 text-center text-muted-foreground">{row.cartaQR}</td>
                      <td className="px-4 py-3.5 text-center text-muted-foreground">{row.digitalBasica}</td>
                      <td className="px-4 py-3.5 text-center text-muted-foreground">{row.tradicional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. CTA FINAL
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                  {c.ctaFinalTitle}
                  <span className="text-gradient-wine italic">{c.ctaFinalItalic}</span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  {c.ctaFinalDesc}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to={localePath("/demo")}
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                  >
                    {c.ctaFinalDemo} <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={localePath("/precios")}
                    className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                  >
                    {c.ctaFinalPricing}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. FAQ
          ═══════════════════════════════════════════════════════════ */}
      <FAQSection schemaId="funcionalidades" faqs={c.faqs} />

      {/* ═══════════════════════════════════════════════════════════
          6. INTERNAL LINKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <InternalLinks
          links={[
            ...c.internalLinks.map(l => ({ to: l.to, label: l.label, type: l.type })),
            { to: "/herramientas", label: lang === "de" ? "Kostenlose Werkzeuge" : lang === "pt" ? "Ferramentas gratuitas" : lang === "en" ? "Free tools" : lang === "it" ? "Strumenti gratuiti" : lang === "fr" ? "Outils gratuits" : "Herramientas gratuitas", type: "tool" },
          ]}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Funcionalidades;
