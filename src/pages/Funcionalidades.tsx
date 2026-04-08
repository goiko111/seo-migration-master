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
import { CANONICAL_DOMAIN } from "@/seo/config";

// ─── Screenshots ───
import tabletHeroImg from "@/assets/winerim-tablet-hero.png";
import tabletDetailImg from "@/assets/winerim-tablet-detail.png";
import tabletComparatorImg from "@/assets/winerim-tablet-comparator.png";
import tabletPairingImg from "@/assets/winerim-tablet-pairing.png";
import mgmtStock from "@/assets/mgmt-stock.png";
import mgmtRendimiento from "@/assets/mgmt-rendimiento.png";
import mgmtInsights from "@/assets/mgmt-insights.png";
import mgmtRecomendados from "@/assets/mgmt-recomendados.png";
import mgmtAutomatizaciones from "@/assets/mgmt-automatizaciones.png";
import mgmtRotacion from "@/assets/mgmt-rotacion.png";
import mgmtObsolescencia from "@/assets/mgmt-obsolescencia.png";
import dashboardInsightsImg from "@/assets/winerim-dashboard-insights.png";
import ss08 from "@/assets/screenshots/ss-08.png";
import ss10 from "@/assets/screenshots/ss-10.png";
import ss14 from "@/assets/screenshots/ss-14.png";
import ss19 from "@/assets/screenshots/ss-19.png";

/* ─────────────────────────────────────────────
   Feature definitions with screenshots
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

const features: Feature[] = [
  {
    icon: QrCode,
    title: "Carta digital interactiva",
    desc: "Una carta que no solo muestra vinos: filtra por tipo, precio, maridaje y estilo. Comparador integrado, fichas enriquecidas con IA, traducción automática a 12 idiomas y acceso instantáneo por QR. Diseñada para que el comensal explore con autonomía y el equipo de sala recomiende con criterio.",
    benefits: [
      "Acceso por QR desde cualquier dispositivo, sin app ni descarga",
      "Filtros avanzados por tipo, región, precio, maridaje y perfil sensorial",
      "Comparador de hasta 4 vinos con gráficos radar",
      "Traducción automática a 12 idiomas en tiempo real",
    ],
    linkLabel: "Ver cómo funciona la carta",
    linkHref: "/que-es-winerim",
    screenshots: [
      { img: tabletHeroImg, alt: "Carta interactiva de vinos en tablet", label: "Carta" },
      { img: tabletComparatorImg, alt: "Comparador de vinos", label: "Comparador" },
    ],
  },
  {
    icon: Brain,
    title: "Recomendaciones con IA y maridajes automáticos",
    desc: "Motor de inteligencia artificial que genera recomendaciones personalizadas según el plato, el contexto del comensal y los objetivos comerciales del restaurante. Maridajes automáticos basados en la carta real, no en bases de datos genéricas.",
    benefits: [
      "Maridajes automáticos basados en tu carta y tu menú real",
      "Recomendaciones priorizadas por margen, stock y rotación",
      "Fichas de vino generadas con IA: descriptores, notas de cata y contexto",
      "Sugerencias adaptadas al perfil del comensal y la ocasión",
    ],
    linkLabel: "Explorar la IA de Winerim",
    linkHref: "/inteligencia-artificial-restaurantes",
    screenshots: [
      { img: tabletPairingImg, alt: "Maridaje automático de vinos", label: "Maridaje" },
      { img: ss10, alt: "Configuración de IA y maridaje", label: "Config IA" },
    ],
  },
  {
    icon: Package,
    title: "Gestión de stock e inventario",
    desc: "Control de inventario en tiempo real conectado con ventas y carta. Detección automática de stock muerto, alertas de rotación lenta, prevención de rotura de stock y visibilidad total sobre el capital inmovilizado en bodega.",
    benefits: [
      "Actualización automática de disponibilidad en la carta",
      "Detección de stock muerto y vinos con rotación lenta",
      "Alertas de reposición antes de la rotura de stock",
      "Visibilidad del capital inmovilizado por referencia y categoría",
    ],
    linkLabel: "Herramienta de stock muerto",
    linkHref: "/herramientas/calculadora-stock-muerto",
    screenshots: [
      { img: mgmtStock, alt: "Control de stock de vinos", label: "Stock" },
      { img: mgmtObsolescencia, alt: "Detección de obsolescencia", label: "Obsolescencia" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Pricing y análisis de márgenes",
    desc: "Simulador de precios, análisis de márgenes por referencia, detección de erosión y herramientas de pricing inteligente. Compara tu estructura de precios con benchmarks del sector y optimiza sin perder competitividad ni percepción de valor.",
    benefits: [
      "Análisis de margen real por referencia, categoría y rango de precio",
      "Simulación de escenarios de pricing antes de implementar cambios",
      "Detección de erosión de márgenes y sobreprecios en compras",
      "Benchmark de pricing frente a restaurantes comparables",
    ],
    linkLabel: "Calculadora de margen",
    linkHref: "/calculadora-margen-vino",
    screenshots: [
      { img: mgmtRendimiento, alt: "Análisis de rendimiento y márgenes", label: "Rendimiento" },
      { img: mgmtRotacion, alt: "Rotación de vinos", label: "Rotación" },
    ],
  },
  {
    icon: BarChart3,
    title: "Analítica avanzada y KPIs",
    desc: "Dashboard con KPIs específicos del vino en hostelería: ticket medio, rotación por referencia, mix de precios, probabilidad de venta, rendimiento por copa vs botella y evolución temporal. Datos que no encontrarás en tu TPV ni en una hoja de cálculo.",
    benefits: [
      "KPIs de vino que tu TPV no mide: rotación, mix, Beverage Cost",
      "Comparativa de rendimiento entre locales para grupos",
      "Evolución temporal de ventas, márgenes y rotación",
      "Alertas automáticas cuando un indicador se desvía",
    ],
    linkLabel: "Explorar Winerim Core",
    linkHref: "/producto/winerim-core",
    screenshots: [
      { img: ss14, alt: "Dashboard de insights y KPIs", label: "Insights" },
      { img: ss19, alt: "Rendimiento global de carta", label: "Rendimiento" },
    ],
  },
  {
    icon: Sparkles,
    title: "IA aplicada al vino",
    desc: "Fichas de vino generadas automáticamente con descriptores sensoriales, notas de cata, sugerencias de maridaje y contexto de servicio. La IA de Winerim no sustituye al sumiller: le ahorra horas de trabajo operativo y le da una base sólida sobre la que construir.",
    benefits: [
      "Generación automática de fichas con descriptores y notas de cata",
      "Sugerencias de temperatura, copa y decantación por referencia",
      "Contenido adaptado al perfil del restaurante y su público",
      "Actualización continua con datos del sector y tendencias",
    ],
    linkLabel: "IA para restaurantes",
    linkHref: "/inteligencia-artificial-restaurantes",
    screenshots: [
      { img: tabletDetailImg, alt: "Ficha de vino detallada", label: "Ficha IA" },
      { img: ss08, alt: "Motor de recomendación RIM", label: "Motor RIM" },
    ],
  },
  {
    icon: Zap,
    title: "Inteligencia dinámica",
    desc: "La capa de acción automática que actúa sobre la carta en tiempo real. Reordena, destaca, oculta y adapta referencias según margen, stock, clima, hora y objetivos del negocio. No necesitas intervenir: la carta se optimiza sola basándose en los datos de Core.",
    benefits: [
      "Reordenación automática de la carta según objetivos comerciales",
      "Destacado de vinos con mejor margen o necesidad de rotación",
      "Ocultación automática de referencias agotadas o en riesgo",
      "Adaptación contextual por clima, hora del día o afluencia",
    ],
    linkLabel: "Descubrir Inteligencia Dinámica",
    linkHref: "/producto/inteligencia-dinamica",
    screenshots: [
      { img: mgmtRecomendados, alt: "Recomendaciones dinámicas", label: "Recomendados" },
      { img: mgmtAutomatizaciones, alt: "Automatizaciones", label: "Automatización" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Formación del equipo de sala",
    desc: "Guías de vino, fichas simplificadas y recomendaciones contextuales para que el equipo de sala pueda hablar de vino con confianza, tenga o no formación previa. El objetivo no es convertirlos en sumilleres, sino en vendedores informados.",
    benefits: [
      "Fichas simplificadas de cada vino accesibles desde cualquier dispositivo",
      "Recomendaciones contextuales que el equipo puede usar en sala",
      "Guías de servicio: temperatura, copa, decantación, maridaje sugerido",
      "Formación continua sin necesidad de sesiones presenciales",
    ],
    linkLabel: "Guía para restaurantes sin sumiller",
    linkHref: "/guias/como-usar-winerim-sin-sumiller",
    screenshots: [
      { img: mgmtInsights, alt: "Insights para el equipo", label: "Insights" },
      { img: dashboardInsightsImg, alt: "Dashboard de insights", label: "Dashboard" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Comparison table
   ───────────────────────────────────────────── */
interface CompRow {
  feature: string;
  winerim: string;
  cartaQR: string;
  digitalBasica: string;
  tradicional: string;
}

const comparisonRows: CompRow[] = [
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
];

/* ─────────────────────────────────────────────
   FAQs
   ───────────────────────────────────────────── */
const faqs = [
  { q: "¿Winerim funciona con mi TPV actual?", a: "Sí. Winerim se integra con los principales TPVs del mercado (Revo, Lightspeed, Oracle, etc.). Si tu TPV no está en la lista, el equipo técnico evalúa la viabilidad de conexión sin coste adicional." },
  { q: "¿Puedo gestionar varios locales desde un solo panel?", a: "Sí. La gestión centralizada multi-local es una funcionalidad clave de Winerim, diseñada para grupos de restauración y hoteles con múltiples puntos de venta." },
  { q: "¿Las recomendaciones de IA se basan en datos genéricos?", a: "No. Las recomendaciones se generan a partir de datos reales de tu carta, tus patrones de venta, tu stock y tus objetivos comerciales. Son específicas para tu negocio, no genéricas." },
  { q: "¿Qué pasa si un vino se agota?", a: "El sistema actualiza la disponibilidad en tiempo real. Los vinos agotados desaparecen automáticamente de la carta visible para el comensal, sin intervención manual." },
  { q: "¿Necesito a un sumiller para usar Winerim?", a: "No. Winerim está diseñado para funcionar con o sin sumiller. En restaurantes sin experto dedicado, la plataforma cubre el gap con recomendaciones inteligentes, fichas guiadas y herramientas de formación para el equipo de sala." },
];

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
const Funcionalidades = () => {
  const { localePath, allLangPaths } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Funcionalidades de Winerim | Software de Carta de Vinos con IA"
        description="Descubre las funcionalidades de Winerim: carta digital, IA, maridajes, stock, pricing, analítica y formación. Todo para vender más vino."
        url={`${CANONICAL_DOMAIN}/funcionalidades`}
        hreflang={allLangPaths("/funcionalidades")}
      />
      <DynamicSchemaMarkup
        id="funcionalidades"
        type="SoftwareApplication"
        title="Funcionalidades de Winerim"
        description="Carta digital, IA, maridajes automáticos, gestión de stock, pricing, analítica e inteligencia dinámica para restaurantes y hoteles."
        url={`${CANONICAL_DOMAIN}/funcionalidades`}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: "Funcionalidades", url: `${CANONICAL_DOMAIN}/funcionalidades` },
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
          <Breadcrumbs items={[{ label: "Funcionalidades" }]} />
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <Layers size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Plataforma completa</span>
            </span>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
              Funcionalidades de Winerim —{" "}
              <span className="text-gradient-wine italic">
                Todo lo que necesitas para vender más vino
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
              Winerim es la plataforma de gestión inteligente del vino para restaurantes, hoteles y grupos de restauración.
              Combina carta digital interactiva, recomendaciones con IA, control de stock, pricing, analítica avanzada
              e inteligencia de compras en un solo ecosistema. Diseñado para que cada decisión sobre el vino
              esté basada en datos, no en intuición.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-4">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Solicitar demo <ArrowRight size={16} />
              </Link>
              <Link
                to={localePath("/precios")}
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
              >
                Ver precios
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. FEATURE BLOCKS WITH SCREENSHOTS
          ═══════════════════════════════════════════════════════════ */}
      {features.map((feat, i) => {
        const Icon = feat.icon;
        const isAlt = i % 2 !== 0;
        const reversed = i % 2 !== 0; // alternate image side
        return (
          <section
            key={i}
            id={`feat-${i}`}
            className={`section-padding ${isAlt ? "bg-gradient-dark" : ""}`}
          >
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className={`grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-center ${reversed ? "lg:grid-cols-[380px_1fr]" : ""}`}>
                  {/* Content — always first on mobile */}
                  <div className={reversed ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center">
                        <Icon size={24} className="text-wine" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-wine/60">
                        Funcionalidad {String.fromCharCode(97 + i)})
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

                  {/* Screenshots */}
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
              Comparativa
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Winerim vs alternativas del mercado
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No todas las soluciones de carta digital son iguales. Esta es la diferencia entre una carta QR,
              una carta digital básica, la gestión tradicional y una plataforma de inteligencia como Winerim.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wine/10 border-b border-border">
                    <th className="text-left px-5 py-4 font-heading font-bold text-foreground min-w-[200px]">Funcionalidad</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-wine min-w-[120px]">Winerim</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[120px]">Carta QR</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[140px]">Digital básica</th>
                    <th className="text-center px-4 py-4 font-heading font-bold text-muted-foreground min-w-[120px]">Tradicional</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
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
                  ¿Quieres verlo en acción?{" "}
                  <span className="text-gradient-wine italic">
                    Solicita una demo gratuita
                  </span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  Te mostramos cómo Winerim puede transformar la gestión del vino en tu restaurante, hotel o grupo.
                  Sin compromiso, con datos reales adaptados a tu negocio.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to={localePath("/demo")}
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                  >
                    Solicitar demo gratuita <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={localePath("/precios")}
                    className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                  >
                    Ver precios
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
      <FAQSection schemaId="funcionalidades" faqs={faqs} />

      {/* ═══════════════════════════════════════════════════════════
          6. INTERNAL LINKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <InternalLinks
          links={[
            { to: localePath("/precios"), label: "Planes y precios", type: "resource" },
            { to: localePath("/producto/winerim-core"), label: "Winerim Core", type: "solution" },
            { to: localePath("/producto/inteligencia-dinamica"), label: "Inteligencia Dinámica", type: "solution" },
            { to: localePath("/producto/winerim-supply"), label: "Winerim Supply", type: "solution" },
            { to: localePath("/integraciones"), label: "Integraciones TPV", type: "tool" },
            { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
            { to: "/herramientas", label: "Herramientas gratuitas", type: "tool" },
            { to: localePath("/sobre-nosotros"), label: "Sobre nosotros", type: "solution" },
          ]}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Funcionalidades;
