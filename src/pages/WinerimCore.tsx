import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, TrendingUp, DollarSign, Package, ShoppingCart,
  Target, Layers, RefreshCw, Activity, Eye, Gauge, Brain, Zap,
  Filter, Search, Settings, Cpu, ClipboardList, History,
  PieChart, GitCompare, Scale, Map, FileBarChart, AlertTriangle,
  ChevronRight, Lightbulb
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import { Badge } from "@/components/ui/badge";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Module blocks ── */
interface Module { icon: typeof BarChart3; name: string; desc: string }
interface ModuleBlock { title: string; accent: string; borderAccent: string; iconBg: string; iconColor: string; modules: Module[] }

const moduleBlocks: ModuleBlock[] = [
  {
    title: "Diagnóstico y arquitectura",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderAccent: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    modules: [
      { icon: Map, name: "Wine Mapping", desc: "Radiografía completa de tu carta: estructura, distribución por tipo, origen, rango de precio y cobertura." },
      { icon: Layers, name: "Arquitectura de carta", desc: "Evalúa el equilibrio entre categorías, profundidad de gama y coherencia con tu posicionamiento." },
      { icon: Filter, name: "Análisis de surtido", desc: "Detecta solapamientos, huecos de oferta y oportunidades de diferenciación en tu selección." },
      { icon: AlertTriangle, name: "Detección de canibalización", desc: "Identifica referencias que compiten entre sí y erosionan ventas dentro de la misma franja." },
      { icon: Eye, name: "Auditoría de visibilidad", desc: "Mide qué vinos reciben atención del comensal y cuáles pasan desapercibidos en la carta." },
    ],
  },
  {
    title: "Pricing y rentabilidad",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderAccent: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    modules: [
      { icon: DollarSign, name: "Análisis de márgenes", desc: "Margen bruto, contribución unitaria y margen ponderado por ventas de cada referencia." },
      { icon: TrendingUp, name: "Pricing dinámico", desc: "Simulación de escenarios de precio para maximizar rentabilidad sin perder competitividad." },
      { icon: Scale, name: "Elasticidad de precio", desc: "Estima cómo reaccionarían las ventas ante cambios de precio en cada referencia." },
      { icon: PieChart, name: "Contribución por categoría", desc: "Entiende qué bloques de la carta generan más valor y cuáles lastran el resultado global." },
      { icon: Gauge, name: "Scoring de rentabilidad", desc: "Índice compuesto que cruza margen, rotación y ticket medio para cada vino." },
      { icon: Target, name: "Copa vs. botella", desc: "Análisis comparativo de rentabilidad entre servicio por copa y por botella." },
    ],
  },
  {
    title: "Stock, compras y previsión",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderAccent: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    modules: [
      { icon: Package, name: "Control de stock", desc: "Estado en tiempo real del inventario con alertas de sobrestock y quiebre." },
      { icon: RefreshCw, name: "Rotación de referencias", desc: "Velocidad de salida de cada vino y detección automática de stock muerto." },
      { icon: ShoppingCart, name: "Inteligencia de compras", desc: "Recomendaciones de reposición basadas en velocidad de venta, estacionalidad y margen." },
      { icon: History, name: "Previsión de demanda", desc: "Proyección de consumo a corto plazo usando patrones históricos y contexto calendario." },
      { icon: AlertTriangle, name: "Obsolescencia", desc: "Alerta temprana sobre referencias con riesgo de quedarse paradas o fuera de temporada." },
    ],
  },
  {
    title: "Estrategia y simulación",
    accent: "from-wine/20 via-wine/5 to-transparent",
    borderAccent: "border-wine/20",
    iconBg: "bg-wine/10",
    iconColor: "text-wine",
    modules: [
      { icon: Lightbulb, name: "Simulador de carta", desc: "Prueba cambios en la carta antes de publicarlos: añadir, quitar o sustituir referencias y ver el impacto estimado." },
      { icon: GitCompare, name: "Comparador de escenarios", desc: "Enfrentar dos configuraciones de carta y evaluar cuál rinde mejor en margen, ticket y rotación." },
      { icon: Activity, name: "Análisis de tendencias", desc: "Evolución temporal de KPIs clave: ticket medio, venta por copa, mix de categorías." },
      { icon: ClipboardList, name: "Plan de acción", desc: "Recomendaciones priorizadas y accionables basadas en los diagnósticos de todos los módulos." },
      { icon: Settings, name: "Reglas de negocio", desc: "Define objetivos, restricciones y prioridades que condicionan las recomendaciones del sistema." },
    ],
  },
  {
    title: "Benchmark y rendimiento",
    accent: "from-violet-500/20 via-violet-500/5 to-transparent",
    borderAccent: "border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    modules: [
      { icon: BarChart3, name: "Benchmark sectorial", desc: "Compara tus métricas con restaurantes de perfil similar: ticket, referencias, margen y mix." },
      { icon: FileBarChart, name: "Scorecard mensual", desc: "Informe consolidado de rendimiento de la carta con evolución respecto al mes anterior." },
      { icon: Gauge, name: "Wine List Score", desc: "Puntuación global de salud de tu carta: equilibrio, rentabilidad, rotación y cobertura." },
      { icon: Search, name: "Diagnóstico multilocal", desc: "Visión comparada entre locales de un mismo grupo: detecta desviaciones y mejores prácticas." },
      { icon: Cpu, name: "Exportación e informes", desc: "Genera informes descargables para dirección, compras o reuniones de equipo." },
    ],
  },
];

const WinerimCore = () => {
  const scrollToModules = () => {
    document.getElementById("modulos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Winerim Core | 26 módulos de inteligencia analítica para tu carta de vinos"
        description="Winerim Core es el motor analítico que conecta márgenes, pricing, stock, rentabilidad, compras, arquitectura, benchmark y previsión en una sola capa. 26 módulos especializados."
        path="/producto/winerim-core"
      />

      <Navbar />

      {/* ─── Breadcrumbs ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <Breadcrumbs items={[
          { label: "Inicio", to: "/" },
          { label: "Funcionalidades", to: "/funcionalidades" },
          { label: "Winerim Core" },
        ]} />
      </div>

      {/* ─── Hero ─── */}
      <section className="section-padding pt-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 tracking-[0.25em] uppercase text-xs border-wine/30 text-wine bg-wine/5 px-4 py-1.5">
              Winerim Core
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              26 módulos. Un motor de{" "}
              <span className="text-gradient-gold">inteligencia</span>{" "}
              para tu carta de vinos.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              Winerim Core conecta márgenes, pricing, stock, rentabilidad, compras, arquitectura, benchmark y previsión en una sola capa analítica.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Quiero ver Winerim Core en una demo <ArrowRight size={16} />
              </Link>
              <button
                onClick={scrollToModules}
                className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all"
              >
                Explorar los 26 módulos <ChevronRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Qué es Winerim Core ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold mb-4">Qué es Winerim Core</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  La capa analítica que <span className="text-gradient-gold">piensa</span> por tu carta
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Winerim Core es el motor de análisis y diagnóstico que alimenta todas las decisiones sobre tu carta de vinos. No es una carta digital. No es un módulo de IA reactiva. Es la <strong className="text-foreground">infraestructura analítica</strong> que conecta datos de ventas, stock, márgenes, pricing y benchmark para darte una visión completa de cómo rinde tu carta.
                  </p>
                  <p>
                    Mientras la <Link to="/producto/inteligencia-dinamica" className="text-wine hover:text-wine-light underline underline-offset-4">Inteligencia Dinámica</Link> actúa en tiempo real adaptando la carta, <strong className="text-foreground">Winerim Core analiza, diagnostica y recomienda</strong>. Es la base sobre la que se construyen las decisiones tácticas.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Brain, label: "Analiza", desc: "Cruza datos de venta, stock, margen y contexto." },
                    { icon: Search, label: "Diagnostica", desc: "Detecta problemas, ineficiencias y oportunidades." },
                    { icon: Lightbulb, label: "Recomienda", desc: "Propone acciones priorizadas y simulables." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="bg-background/40 rounded-xl border border-border/60 p-5 text-center"
                    >
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                        <item.icon size={20} className="text-wine" />
                      </div>
                      <p className="font-heading font-semibold text-sm mb-1">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Los 26 módulos ─── */}
      <section className="section-padding" id="modulos">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">26 módulos especializados</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold">
              Todo lo que tu carta necesita <span className="text-gradient-gold">saber</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Organizados en 5 bloques funcionales, cada módulo resuelve un aspecto concreto de la gestión analítica de la carta.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {moduleBlocks.map((block, bi) => (
              <ScrollReveal key={block.title} delay={bi * 0.05}>
                <div className={`rounded-2xl border ${block.borderAccent} bg-gradient-card overflow-hidden`}>
                  <div className={`bg-gradient-to-r ${block.accent} px-6 md:px-8 py-5 border-b ${block.borderAccent}`}>
                    <h3 className="font-heading text-lg md:text-xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-background/60 border border-border/60">
                        {bi + 1}
                      </span>
                      {block.title}
                      <span className="text-xs text-muted-foreground font-normal ml-auto">
                        {block.modules.length} módulos
                      </span>
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                    {block.modules.map((mod, mi) => (
                      <motion.div
                        key={mod.name}
                        custom={mi}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-card p-5 md:p-6 hover:bg-card/80 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg ${block.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <mod.icon size={18} className={block.iconColor} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm mb-1">{mod.name}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Puente a Inteligencia Dinámica ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10 text-center">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-4">El siguiente nivel</p>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Winerim Core analiza.{" "}
                  <span className="text-gradient-gold">La Inteligencia Dinámica actúa.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  Los 26 módulos de Core generan los diagnósticos y las recomendaciones. La capa de Inteligencia Dinámica los convierte en acciones automáticas sobre la carta en tiempo real: reordena, destaca, oculta y adapta referencias según contexto, stock, margen y objetivos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/producto/inteligencia-dinamica"
                    className="inline-flex items-center gap-2 border border-wine/40 text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-wine/10 transition-all"
                  >
                    Descubrir la Inteligencia Dinámica <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">¿Listo para ver el Core en acción?</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  Pide una demo y descubre cómo <span className="text-gradient-gold">26 módulos</span> transforman tu carta
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Te mostramos cómo Winerim Core analiza tu carta real, detecta oportunidades y genera un plan de acción concreto.
                </p>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  Solicitar demo de Winerim Core <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <FAQSection
        schemaId="winerim-core"
        title="Preguntas frecuentes sobre Winerim Core"
        faqs={[
          { q: "¿Qué diferencia hay entre Winerim Core y la Inteligencia Dinámica?", a: "Winerim Core es la capa de análisis: diagnostica, mide y recomienda. La Inteligencia Dinámica es la capa de acción: aplica esos diagnósticos en tiempo real sobre la carta visible." },
          { q: "¿Wine Mapping es lo mismo que Winerim Core?", a: "No. Wine Mapping es uno de los 26 módulos dentro de Core. Se encarga de radiografiar la estructura de la carta, pero Core abarca mucho más: pricing, stock, benchmark, simulación y más." },
          { q: "¿Necesito todos los módulos desde el inicio?", a: "No. Los módulos se activan progresivamente según tu plan y necesidades. Puedes empezar con diagnóstico y pricing, y ampliar a stock, benchmark o simulación cuando lo necesites." },
          { q: "¿Core funciona sin la Inteligencia Dinámica?", a: "Sí. Core genera valor por sí solo como herramienta de análisis y planificación. La Inteligencia Dinámica es una capa adicional que automatiza las acciones sobre la carta." },
          { q: "¿Puedo usar Winerim Core para varios locales?", a: "Sí. El módulo de diagnóstico multilocal permite comparar el rendimiento entre establecimientos de un mismo grupo y detectar desviaciones." },
        ]}
      />

      <InternalLinks links={[
        { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: la capa de IA táctica", type: "solution" },
        { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "resource" },
        { to: "/demo", label: "Solicitar una demo personalizada", type: "solution" },
        { to: "/precios", label: "Planes y precios", type: "resource" },
        { to: "/herramientas", label: "Herramientas gratuitas de análisis", type: "tool" },
        { to: "/comparativas", label: "Compara Winerim con alternativas", type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default WinerimCore;
