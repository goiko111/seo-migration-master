import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, BarChart3, Zap, ShoppingCart,
  CheckCircle, Calendar, Lightbulb, MessageSquare, Share2, GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import SummaryBox from "@/components/seo/SummaryBox";
import FAQSection from "@/components/seo/FAQSection";
import CredibilitySection from "@/components/seo/CredibilitySection";
import { useLanguage } from "@/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";

// ─── Screenshots ───
import tabletHeroImg from "@/assets/winerim-tablet-hero.png";
import tabletDetailImg from "@/assets/winerim-tablet-detail.png";
import tabletComparatorImg from "@/assets/winerim-tablet-comparator.png";
import mobileListImg from "@/assets/winerim-mobile-list.png";
import mobileDetailImg from "@/assets/winerim-mobile-detail.png";
import mobileComparatorImg from "@/assets/winerim-mobile-comparator.png";
import ss14 from "@/assets/screenshots/ss-14.png";
import ss19 from "@/assets/screenshots/ss-19.png";

// ─── i18n (simplified — 3-layer focus) ───
interface LayerContent {
  badge: string; layerLabel: string; title: string; desc: string;
  solves: string[]; tags: string[]; cta: string; href: string;
  color: "amber" | "wine" | "emerald";
  icon: typeof BarChart3;
}

interface LangContent {
  seo_title: string; seo_desc: string; breadcrumb: string; heroBadge: string;
  heroTitle: string; heroSub: string; heroAccent: string;
  archBadge: string; archTitle: string; archSub: string;
  layers: LayerContent[];
  screenshotTitle: string; screenshotMobile: string;
  comingSoonLabel: string;
  comingSoon: { icon: typeof MessageSquare; title: string; desc: string }[];
  changelog_badge: string; changelog_title: string; changelog_sub: string;
  changelog: { date: string; title: string; desc: string; tag: "new" | "improvement" | "fix" }[];
  tag_labels: Record<string, string>;
  roadmap_badge: string; roadmap_title: string; roadmap_sub: string;
  roadmap: { quarter: string; items: string[] }[];
  cta_badge: string; cta_title: string; cta_sub: string; cta_btn: string;
  summaryLabel: string; summaryDef: string; summaryBullets: string[];
  faqTitle: string; faqs: { q: string; a: string }[];
}

const colorMap = {
  amber: { border: "border-amber-500/20", hoverBorder: "hover:border-amber-500/30", bg: "bg-amber-500/5", tagBg: "bg-amber-500/8", tagBorder: "border-amber-500/15", tagText: "text-amber-500/80", iconBg: "bg-amber-500/10", iconText: "text-amber-500", ctaText: "text-amber-500 hover:text-amber-400", accent: "via-amber-500/40", labelText: "text-amber-500/70", gradient: "to-amber-500/5" },
  wine: { border: "border-wine/20", hoverBorder: "hover:border-wine/30", bg: "bg-wine/5", tagBg: "bg-wine/8", tagBorder: "border-wine/15", tagText: "text-wine/80", iconBg: "bg-wine/10", iconText: "text-wine", ctaText: "text-wine hover:text-wine-light", accent: "via-wine/50", labelText: "text-wine/60", gradient: "to-wine/5" },
  emerald: { border: "border-emerald-500/20", hoverBorder: "hover:border-emerald-500/30", bg: "bg-emerald-500/5", tagBg: "bg-emerald-500/8", tagBorder: "border-emerald-500/15", tagText: "text-emerald-500/80", iconBg: "bg-emerald-500/10", iconText: "text-emerald-500", ctaText: "text-emerald-500 hover:text-emerald-400", accent: "via-emerald-500/40", labelText: "text-emerald-500/70", gradient: "to-emerald-500/5" },
};

const i18n: Record<string, LangContent> = {
  es: {
    seo_title: "Funcionalidades de Winerim | Plataforma de Vino para Restaurantes",
    seo_desc: "Winerim es una plataforma de 3 capas para restaurantes: analítica profunda (Core), acción dinámica sobre la carta (Inteligencia Dinámica) e inteligencia de compras (Supply).",
    breadcrumb: "Funcionalidades", heroBadge: "Plataforma",
    heroTitle: "No es una carta digital. Es un <em>sistema de decisión</em>.",
    heroSub: "Winerim combina tres capas especializadas para que cada decisión sobre el vino — desde la compra hasta la venta — esté respaldada por datos.",
    heroAccent: "Comprar mejor → Analizar mejor → Vender mejor",
    archBadge: "Arquitectura de producto",
    archTitle: "Tres capas. <span class=\"text-gradient-wine\">Un sistema integrado.</span>",
    archSub: "Cada capa resuelve una parte del problema. Juntas, transforman la gestión del vino en un sistema de decisión completo.",
    layers: [
      {
        badge: "Capa analítica", layerLabel: "Capa analítica", icon: BarChart3, color: "amber",
        title: "Winerim Core",
        desc: "El motor analítico que diagnostica tu carta, tus márgenes, tu stock y tu rendimiento. 26 módulos organizados en cinco categorías que te dan visibilidad total antes de actuar.",
        solves: [
          "Diagnóstico de arquitectura y equilibrio de carta",
          "Análisis de márgenes, pricing y rentabilidad por referencia",
          "Detección de stock muerto, rotación lenta y obsolescencia",
          "Benchmark frente a restaurantes comparables",
          "Simulación de escenarios antes de implementar cambios",
        ],
        tags: ["Diagnóstico", "Pricing", "Benchmark", "Previsión", "Simulación"],
        cta: "Explorar Winerim Core", href: "/producto/winerim-core",
      },
      {
        badge: "Capa de acción", layerLabel: "Capa de acción", icon: Zap, color: "wine",
        title: "Inteligencia Dinámica",
        desc: "La capa de IA táctica que convierte los diagnósticos de Core en acciones automáticas sobre la carta en tiempo real. Reordena, destaca, oculta y adapta referencias según margen, stock, clima y objetivos.",
        solves: [
          "Reordenación automática de la carta según objetivos comerciales",
          "Destacado de referencias con mejor margen o necesidad de rotación",
          "Ocultación de vinos agotados o en riesgo de obsolescencia",
          "Adaptación contextual por clima, hora del día o afluencia",
          "Activación de recomendaciones para el equipo de sala",
        ],
        tags: ["SmartRIM™", "MarginRIM™", "FocusRIM™", "StockRIM™", "ClimateRIM™"],
        cta: "Descubrir Inteligencia Dinámica", href: "/producto/inteligencia-dinamica",
      },
      {
        badge: "Capa de compras", layerLabel: "Capa de compras", icon: ShoppingCart, color: "emerald",
        title: "Winerim Supply",
        desc: "Inteligencia de compras que conecta lo que vendes con lo que compras. Analiza precios, distribuidores, oportunidades y patrones de reposición para que cada euro invertido en bodega tenga retorno.",
        solves: [
          "Comparativa de precios entre distribuidores para una misma referencia",
          "Detección de sobreprecios y oportunidades de renegociación",
          "Generación de listas de compra inteligentes basadas en rotación y stock",
          "Scoring de distribuidores por calidad de servicio y competitividad",
          "Alertas de reposición y prevención de rotura de stock",
        ],
        tags: ["Comparativa precios", "Scoring distribuidores", "Lista de compra", "Alertas sobreprecio"],
        cta: "Explorar Winerim Supply", href: "/producto/winerim-supply",
      },
    ],
    screenshotTitle: "Así se ve en acción", screenshotMobile: "También en móvil",
    comingSoonLabel: "En desarrollo",
    comingSoon: [
      { icon: MessageSquare, title: "Solicitar al sumiller", desc: "Pide ayuda al sumiller directamente desde la carta." },
      { icon: Share2, title: "Compartir selección", desc: "Comparte tu selección de vinos por QR o link." },
      { icon: GraduationCap, title: "Modo educación", desc: "Tips y curiosidades sobre cada vino mientras exploras." },
    ],
    changelog_badge: "Changelog", changelog_title: "Últimas <em>novedades</em>", changelog_sub: "Winerim evoluciona constantemente.",
    changelog: [
      { date: "Feb 2026", title: "Filtros sensoriales v2", desc: "Nueva interfaz de filtrado por perfil aromático.", tag: "new" },
      { date: "Ene 2026", title: "Comparador mejorado", desc: "Compara hasta 4 vinos con gráficos radar.", tag: "improvement" },
      { date: "Dic 2025", title: "Traducción automática", desc: "Carta traducida a 12 idiomas en tiempo real.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard analítico v3", desc: "Nuevos KPIs de rentabilidad.", tag: "improvement" },
      { date: "Oct 2025", title: "Alta masiva de vinos", desc: "Importa tu bodega desde Excel o CSV.", tag: "new" },
      { date: "Sep 2025", title: "Integración Revo TPV", desc: "Sincronización bidireccional con Revo.", tag: "new" },
    ],
    tag_labels: { new: "Nuevo", improvement: "Mejora", fix: "Corrección" },
    roadmap_badge: "Capacidades en expansión", roadmap_title: "Próximas <em>capacidades</em>",
    roadmap_sub: "Winerim sigue ampliando la experiencia del comensal y del equipo de sala.",
    roadmap: [
      { quarter: "Experiencia comensal", items: ["Solicitar al sumiller desde la carta", "Compartir selección por QR/link", "Recomendaciones por historial"] },
      { quarter: "Formación y sala", items: ["Modo educación con tips de vino", "Guías de servicio para el equipo", "App nativa para comensales"] },
      { quarter: "Tecnología avanzada", items: ["IA predictiva de tendencias", "Carta con realidad aumentada", "API pública v2"] },
    ],
    cta_badge: "Empieza hoy", cta_title: "Descubre Winerim en <em>acción</em>",
    cta_sub: "Prueba todas estas funcionalidades gratis durante 14 días. Sin compromiso.", cta_btn: "Solicitar demo",
    summaryLabel: "¿Qué incluye Winerim?",
    summaryDef: "Winerim es una plataforma de gestión del vino para restaurantes compuesta por tres capas: Core (analítica), Inteligencia Dinámica (acción automática) y Supply (compras). Juntas cubren desde el diagnóstico de carta hasta la decisión de compra.",
    summaryBullets: [
      "Winerim Core: 26 módulos analíticos de diagnóstico, pricing, stock, benchmark y simulación",
      "Inteligencia Dinámica: módulos RIM™ que actúan automáticamente sobre la carta",
      "Winerim Supply: inteligencia de compras, comparativa de precios y scoring de distribuidores",
      "Diseñado para restaurantes, hoteles, wine bars y grupos de restauración",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Winerim funciona con mi TPV actual?", a: "Winerim se integra con los principales TPVs del mercado. Si tu TPV no está en la lista, el equipo técnico evalúa la viabilidad de conexión." },
      { q: "¿Puedo gestionar varios locales desde un solo panel?", a: "Sí. La gestión centralizada multi-local es una funcionalidad clave, especialmente diseñada para grupos de restauración y hoteles." },
      { q: "¿Qué diferencia hay entre Core e Inteligencia Dinámica?", a: "Core diagnostica y analiza. Inteligencia Dinámica actúa sobre la carta en tiempo real usando los datos de Core. Son complementarios: uno sin el otro pierde impacto." },
      { q: "¿Winerim Supply funciona sin Core?", a: "Supply se puede usar de forma independiente para inteligencia de compras, pero su mayor valor está cuando se conecta con Core para cruzar datos de venta, rotación y stock." },
      { q: "¿Qué pasa si un vino se agota?", a: "El sistema actualiza la disponibilidad en tiempo real. Cuando un vino se agota, desaparece automáticamente de la carta visible para el comensal." },
    ],
  },
  en: {
    seo_title: "Winerim Features | Wine Platform for Restaurants",
    seo_desc: "Winerim is a 3-layer platform for restaurants: deep analytics (Core), dynamic list actions (Dynamic Intelligence), and purchasing intelligence (Supply).",
    breadcrumb: "Features", heroBadge: "Platform",
    heroTitle: "Not a digital wine list. A <em>decision system</em>.",
    heroSub: "Winerim combines three specialized layers so every wine decision — from purchase to sale — is backed by data.",
    heroAccent: "Buy better → Analyze better → Sell better",
    archBadge: "Product architecture",
    archTitle: "Three layers. <span class=\"text-gradient-wine\">One integrated system.</span>",
    archSub: "Each layer solves part of the problem. Together, they transform wine management into a complete decision system.",
    layers: [
      {
        badge: "Analytics layer", layerLabel: "Analytics layer", icon: BarChart3, color: "amber",
        title: "Winerim Core",
        desc: "The analytical engine that diagnoses your list, margins, stock and performance. 26 modules organized in five categories giving you full visibility before you act.",
        solves: ["List architecture & balance diagnostics", "Margin, pricing & profitability analysis per reference", "Dead stock, slow rotation & obsolescence detection", "Benchmark vs comparable restaurants", "Scenario simulation before implementing changes"],
        tags: ["Diagnostics", "Pricing", "Benchmark", "Forecasting", "Simulation"],
        cta: "Explore Winerim Core", href: "/producto/winerim-core",
      },
      {
        badge: "Action layer", layerLabel: "Action layer", icon: Zap, color: "wine",
        title: "Dynamic Intelligence",
        desc: "The tactical AI layer that converts Core diagnostics into automatic real-time actions on the list. Reorders, highlights, hides and adapts references based on margin, stock, weather and goals.",
        solves: ["Automatic list reordering by business goals", "Highlighting high-margin or rotation-needing references", "Hiding sold-out or obsolescence-risk wines", "Contextual adaptation by weather, time or footfall", "Activating recommendations for the floor team"],
        tags: ["SmartRIM™", "MarginRIM™", "FocusRIM™", "StockRIM™", "ClimateRIM™"],
        cta: "Discover Dynamic Intelligence", href: "/producto/inteligencia-dinamica",
      },
      {
        badge: "Purchasing layer", layerLabel: "Purchasing layer", icon: ShoppingCart, color: "emerald",
        title: "Winerim Supply",
        desc: "Purchasing intelligence connecting what you sell with what you buy. Analyzes prices, distributors and replenishment patterns so every euro invested in your cellar has measurable return.",
        solves: ["Price comparison across distributors", "Overpricing detection & renegotiation opportunities", "Smart purchase lists based on rotation & stock", "Distributor scoring by service & competitiveness", "Replenishment alerts & stockout prevention"],
        tags: ["Price comparison", "Distributor scoring", "Smart purchase list", "Overprice alerts"],
        cta: "Explore Winerim Supply", href: "/producto/winerim-supply",
      },
    ],
    screenshotTitle: "See it in action", screenshotMobile: "Also on mobile",
    comingSoonLabel: "Coming soon",
    comingSoon: [
      { icon: MessageSquare, title: "Request sommelier", desc: "Ask the sommelier for help from the list." },
      { icon: Share2, title: "Share selection", desc: "Share your wine selection via QR or link." },
      { icon: GraduationCap, title: "Education mode", desc: "Tips and facts about each wine as you explore." },
    ],
    changelog_badge: "Changelog", changelog_title: "Latest <em>updates</em>", changelog_sub: "Winerim is constantly evolving.",
    changelog: [
      { date: "Feb 2026", title: "Sensory filters v2", desc: "New aromatic profile filtering.", tag: "new" },
      { date: "Jan 2026", title: "Improved comparator", desc: "Compare up to 4 wines with radar charts.", tag: "improvement" },
      { date: "Dec 2025", title: "Auto translation", desc: "List in 12 languages in real time.", tag: "new" },
      { date: "Nov 2025", title: "Analytics dashboard v3", desc: "New profitability KPIs.", tag: "improvement" },
      { date: "Oct 2025", title: "Bulk wine import", desc: "Import from Excel or CSV.", tag: "new" },
      { date: "Sep 2025", title: "Revo POS integration", desc: "Bidirectional sync with Revo.", tag: "new" },
    ],
    tag_labels: { new: "New", improvement: "Improvement", fix: "Fix" },
    roadmap_badge: "Expanding capabilities", roadmap_title: "Upcoming <em>capabilities</em>",
    roadmap_sub: "Winerim keeps expanding the diner and floor team experience.",
    roadmap: [
      { quarter: "Guest experience", items: ["Request sommelier from list", "Share selection via QR/link", "History-based recommendations"] },
      { quarter: "Training & floor", items: ["Education mode with wine tips", "Service guides for the team", "Native guest app"] },
      { quarter: "Advanced tech", items: ["Predictive trend AI", "Augmented reality list", "Public API v2"] },
    ],
    cta_badge: "Start today", cta_title: "See Winerim in <em>action</em>",
    cta_sub: "Try all features free for 14 days. No commitment.", cta_btn: "Request demo",
    summaryLabel: "What does Winerim include?",
    summaryDef: "Winerim is a wine management platform for restaurants with three layers: Core (analytics), Dynamic Intelligence (automatic actions), and Supply (purchasing). Together they cover from list diagnostics to purchase decisions.",
    summaryBullets: [
      "Winerim Core: 26 analytical modules for diagnostics, pricing, stock, benchmark & simulation",
      "Dynamic Intelligence: RIM™ modules that act automatically on the wine list",
      "Winerim Supply: purchasing intelligence, price comparison & distributor scoring",
      "Designed for restaurants, hotels, wine bars and restaurant groups",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Does Winerim work with my current POS?", a: "Winerim integrates with major POS systems. If yours isn't listed, the technical team evaluates feasibility." },
      { q: "Can I manage multiple venues?", a: "Yes. Centralized multi-venue management is a key feature, designed for restaurant groups and hotels." },
      { q: "What's the difference between Core and Dynamic Intelligence?", a: "Core diagnoses and analyzes. Dynamic Intelligence acts on the list in real time using Core data. They're complementary." },
      { q: "Does Supply work without Core?", a: "Supply can be used independently for purchasing intelligence, but its greatest value is when connected to Core for cross-referencing sales, rotation and stock data." },
      { q: "What happens when a wine runs out?", a: "The system updates availability in real time. Out-of-stock wines automatically disappear from the guest-facing list." },
    ],
  },
};

// Also support it/fr by falling back to es
const getLang = (lang: string): LangContent => i18n[lang] || i18n.es;

const emToGradient = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

const tagColors: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  improvement: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  fix: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const Funcionalidades = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = getLang(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/funcionalidades" hreflang={allLangPaths("/funcionalidades")} />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.heroBadge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: emToGradient(c.heroTitle) }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">{c.heroSub}</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="text-sm md:text-base text-wine/70 font-medium max-w-2xl italic">{c.heroAccent}</motion.p>
        </div>
      </section>

      {/* ─── 3 Layers — Main content ─── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-wine/6 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
              {c.archBadge}
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
              dangerouslySetInnerHTML={{ __html: c.archTitle }} />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{c.archSub}</p>
          </ScrollReveal>

          <div className="space-y-6">
            {c.layers.map((layer, i) => {
              const cm = colorMap[layer.color];
              const Icon = layer.icon;
              return (
                <ScrollReveal key={i}>
                  <div className={`relative rounded-2xl border ${cm.border} bg-gradient-to-br from-card via-card/95 ${cm.gradient} p-8 md:p-10 overflow-hidden group ${cm.hoverBorder} transition-all duration-500`}>
                    <div className={`absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent ${cm.accent} to-transparent`} />
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${cm.iconBg} flex items-center justify-center`}>
                            <Icon size={20} className={cm.iconText} />
                          </div>
                          <span className={`text-[10px] font-medium tracking-[0.25em] uppercase ${cm.labelText}`}>
                            {layer.layerLabel}
                          </span>
                        </div>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{layer.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{layer.desc}</p>

                        {/* What it solves */}
                        <div className="mb-6">
                          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                            {lang === "es" ? "Qué resuelve" : "What it solves"}
                          </p>
                          <ul className="space-y-2">
                            {layer.solves.map((s, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle size={14} className={`${cm.iconText} shrink-0 mt-0.5`} /> {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {layer.tags.map(tag => (
                            <span key={tag} className={`px-2.5 py-1 rounded-md ${cm.tagBg} border ${cm.tagBorder} text-[11px] font-medium ${cm.tagText}`}>{tag}</span>
                          ))}
                        </div>

                        <Link to={layer.href} className={`inline-flex items-center gap-2 text-sm font-semibold ${cm.ctaText} transition-colors`}>
                          {layer.cta} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Screenshots ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{c.screenshotTitle}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {[
                { img: tabletHeroImg, alt: "Winerim tablet wine list", label: "Carta interactiva" },
                { img: tabletDetailImg, alt: "Winerim wine detail", label: "Ficha del vino" },
                { img: tabletComparatorImg, alt: "Winerim wine comparator", label: "Comparador" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={item.img} alt={item.alt} className="relative w-full rounded-xl border border-border shadow-lg" loading="lazy" />
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { img: ss19, alt: "Winerim performance dashboard", label: "Rendimiento" },
                { img: ss14, alt: "Winerim insights dashboard", label: "Insights" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <img src={item.img} alt={item.alt} className="w-full rounded-xl border border-border shadow-lg" loading="lazy" />
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <p className="text-center text-sm text-muted-foreground mb-6 font-medium tracking-wide uppercase">{c.screenshotMobile}</p>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { img: mobileListImg, alt: "Mobile wine list", label: "Carta" },
                { img: mobileDetailImg, alt: "Mobile wine detail", label: "Ficha" },
                { img: mobileComparatorImg, alt: "Mobile comparator", label: "Comparador" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="relative rounded-2xl border-2 border-border/60 overflow-hidden shadow-xl bg-background/50 group-hover:border-wine/30 transition-colors">
                    <img src={item.img} alt={item.alt} className="w-full" loading="lazy" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Coming soon ─── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <Lightbulb size={14} className="text-accent" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">{c.comingSoonLabel}</span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.comingSoon.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-dashed border-border p-6 h-full opacity-80">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h4 className="font-heading font-semibold mb-1.5 text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Changelog ─── */}
      <section className="section-padding bg-gradient-dark" id="changelog">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.changelog_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.changelog_title) }} />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{c.changelog_sub}</p>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {c.changelog.map((entry, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="relative pl-12 md:pl-16">
                    <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-wine border-2 border-background" />
                    <div className="bg-gradient-card rounded-xl border border-border p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"><Calendar size={12} /> {entry.date}</span>
                        <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${tagColors[entry.tag]}`}>{c.tag_labels[entry.tag]}</span>
                      </div>
                      <h3 className="font-heading font-bold mb-1">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Roadmap ─── */}
      <section className="section-padding" id="roadmap">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">{c.roadmap_badge}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground/80" dangerouslySetInnerHTML={{ __html: emToGradient(c.roadmap_title) }} />
            <p className="text-muted-foreground/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">{c.roadmap_sub}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {c.roadmap.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-xl border border-border/60 bg-card/40 p-6 h-full">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-4 block">{q.quarter}</span>
                  <ul className="space-y-2.5">
                    {q.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground/70 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{c.cta_badge}</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: emToGradient(c.cta_title) }} />
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{c.cta_sub}</p>
                <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {c.cta_btn} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Summary Box */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SummaryBox label={c.summaryLabel} definition={c.summaryDef} bullets={c.summaryBullets} />
          </ScrollReveal>
        </div>
      </section>

      {/* Credibility */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 pb-8">
        <CredibilitySection lang={lang} />
      </section>

      {/* FAQs */}
      <FAQSection schemaId="funcionalidades" title={c.faqTitle} faqs={c.faqs} />

      <InternalLinks links={[
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios de Winerim" : "Winerim pricing", type: "resource" },
        { to: localePath("/integraciones"), label: lang === "es" ? "Integraciones con TPV y sistemas" : "POS integrations", type: "tool" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "solution" },
        { to: "/herramientas", label: lang === "es" ? "Herramientas gratuitas" : "Free tools", type: "tool" },
        { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
        { to: "/producto/inteligencia-dinamica", label: lang === "es" ? "Inteligencia Dinámica" : "Dynamic Intelligence", type: "solution" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default Funcionalidades;
