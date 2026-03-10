import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, TrendingUp, BarChart3, Zap, Target, RefreshCw,
  Layers, Eye, ShieldCheck, ArrowRight, Gauge, DollarSign,
  Users, Wine, Activity, Lightbulb, CheckCircle, AlertTriangle,
  Settings, Cpu, MessageSquare, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Section 4: Objetivos (high impact) ── */
const objectiveCards = [
  {
    icon: DollarSign,
    title: "Aumentar facturación",
    desc: "Empuja referencias rentables y mejora la venta guiada en momentos clave.",
    modules: ["FocusRIM™", "BoostRIM™", "SmartRIM™"],
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    icon: TrendingUp,
    title: "Aumentar ticket medio",
    desc: "Prioriza vinos premium, en prime y con mejor capacidad de upselling.",
    modules: ["PrimeRIM™", "UpRIM™", "SmartRIM™"],
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20",
    borderHover: "hover:border-amber-500/30",
  },
  {
    icon: Target,
    title: "Maximizar margen",
    desc: "Reordena y destaca referencias con mayor contribución al negocio.",
    modules: ["MarginRIM™", "FocusRIM™", "PriceRIM™"],
    gradient: "from-wine/20 via-wine/5 to-transparent",
    iconColor: "text-wine",
    iconBg: "bg-wine/10 group-hover:bg-wine/20",
    borderHover: "hover:border-wine/30",
  },
  {
    icon: RefreshCw,
    title: "Aumentar rotación",
    desc: "Da salida a vinos lentos, sobrestock o referencias con riesgo de quedar paradas.",
    modules: ["RotaRIM™", "BoostRIM™", "StockRIM™"],
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
    borderHover: "hover:border-blue-500/30",
  },
  {
    icon: Activity,
    title: "Limpiar bodega",
    desc: "Activa acciones específicas para mover últimas unidades, vinos fuera de foco o stock inmovilizado.",
    modules: ["CleanRIM™", "StockRIM™", "RotaRIM™"],
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 group-hover:bg-rose-500/20",
    borderHover: "hover:border-rose-500/30",
  },
  {
    icon: Zap,
    title: "Carta viva / dinámica",
    desc: "Hace que la carta evolucione con ritmo, equilibrio y sensación de descubrimiento continuo.",
    modules: ["SmartRIM™", "FocusRIM™", "SeasonRIM™"],
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 group-hover:bg-violet-500/20",
    borderHover: "hover:border-violet-500/30",
  },
];

/* ── Section 5: RIMs principales (new) ── */
const rimCards = [
  {
    name: "SmartRIM™",
    desc: "El cerebro que orquesta prioridades, resuelve conflictos y recalcula la mejor combinación de acciones.",
    result: "Decisiones más inteligentes",
    icon: Brain,
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/12",
    iconColor: "text-violet-400",
    borderColor: "group-hover:border-violet-500/30",
  },
  {
    name: "MarginRIM™",
    desc: "Impulsa referencias con mejor contribución económica sin romper la lógica comercial de la carta.",
    result: "Más margen por servicio",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/12",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/30",
  },
  {
    name: "StockRIM™",
    desc: "Detecta sobrestock, lentitud de salida o riesgo de inmovilización y activa estrategias para moverlo.",
    result: "Menos stock muerto",
    icon: Activity,
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/12",
    iconColor: "text-amber-400",
    borderColor: "group-hover:border-amber-500/30",
  },
  {
    name: "FocusRIM™",
    desc: "Simplifica la carta y prioriza referencias más rentables en momentos de alta afluencia o servicio rápido.",
    result: "Menos tiempo de decisión",
    icon: Target,
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/12",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-500/30",
  },
  {
    name: "ClimateRIM™",
    desc: "Adapta la visibilidad de los vinos al clima real para mejorar conversión y adecuación al momento.",
    result: "Mayor conversión contextual",
    icon: Eye,
    color: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/12",
    iconColor: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/30",
  },
  {
    name: "PrimeRIM™",
    desc: "Da protagonismo a vinos en su mejor ventana de consumo y ayuda a aprovechar su momento óptimo.",
    result: "Vinos en su punto ideal",
    icon: Zap,
    color: "from-wine/20 to-wine/5",
    iconBg: "bg-wine/12",
    iconColor: "text-wine",
    borderColor: "group-hover:border-wine/30",
  },
];

/* ── (impacts data removed — now inline) ── */

const InteligenciaDinamica = () => {
  const { t, localePath } = useLanguage();

  return (
    <>
      <SEOHead
        title="Inteligencia dinámica para cartas de vino | Winerim"
        description="La capa de IA táctica de Winerim que adapta la carta de vinos en tiempo real para aumentar facturación, margen, rotación y experiencia del comensal."
        url="/producto/inteligencia-dinamica"
      />
      <Navbar />
      <main className="min-h-screen bg-background overflow-hidden">

        {/* ════════════════════════════════════════════════
            1. HERO
        ════════════════════════════════════════════════ */}
        <section className="relative pt-32 md:pt-44 pb-24 md:pb-40 px-6 overflow-hidden">
          {/* ── Layered background system ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary ambient glow */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-wine/10 rounded-full blur-[150px]" />
            {/* Secondary glow — offset for depth */}
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-wine/6 rounded-full blur-[100px]" />
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/25 to-transparent" />
          </div>

          {/* ── Intelligence Engine Visual ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Orbiting rings */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-wine/[0.06]"
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-wine/[0.08]"
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-wine/[0.10]"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            {/* Floating data nodes on orbits */}
            {[
              { size: "w-2 h-2", orbit: "w-[600px] h-[600px] md:w-[800px] md:h-[800px]", duration: 90, startAngle: 45 },
              { size: "w-1.5 h-1.5", orbit: "w-[600px] h-[600px] md:w-[800px] md:h-[800px]", duration: 90, startAngle: 200 },
              { size: "w-2.5 h-2.5", orbit: "w-[450px] h-[450px] md:w-[600px] md:h-[600px]", duration: 70, startAngle: 120 },
              { size: "w-1.5 h-1.5", orbit: "w-[300px] h-[300px] md:w-[400px] md:h-[400px]", duration: 50, startAngle: 300 },
            ].map((node, i) => (
              <motion.div
                key={i}
                className={`absolute top-1/2 left-1/2 ${node.orbit}`}
                style={{ marginLeft: "-50%", marginTop: "-50%", transformOrigin: "center" }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className={`absolute ${node.size} rounded-full bg-wine/60 shadow-[0_0_8px_hsl(var(--wine)/0.4)]`}
                  style={{
                    top: `${50 + 50 * Math.sin((node.startAngle * Math.PI) / 180)}%`,
                    left: `${50 + 50 * Math.cos((node.startAngle * Math.PI) / 180)}%`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* ── Content ── */}
          <div className="relative max-w-5xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={stagger}>

              {/* Eyebrow */}
              <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-wine/25 bg-wine/8 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-wine animate-pulse" />
                  <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-wine">
                    Nueva capa de IA táctica
                  </span>
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-heading text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-foreground leading-[1.08] mb-8"
              >
                La carta ya no solo informa.
                <br />
                <span className="text-gradient-wine">
                  Ahora decide cómo vender mejor.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-center text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed"
              >
                Inteligencia dinámica es la capa estratégica de Winerim que adapta visibilidad, recomendación, rotación y empuje comercial según margen, stock, contexto, clima, afluencia y objetivo del restaurante.
              </motion.p>

              {/* Highlights strip */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14"
              >
                {[
                  { icon: DollarSign, label: "Más facturación" },
                  { icon: TrendingUp, label: "Más margen" },
                  { icon: RefreshCw, label: "Más rotación" },
                  { icon: Activity, label: "Menos stock muerto" },
                  { icon: Users, label: "Mejor experiencia" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card/60 backdrop-blur-sm text-sm text-foreground/90 font-medium"
                  >
                    <item.icon size={15} className="text-wine shrink-0" />
                    {item.label}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-wine text-primary-foreground px-9 py-4.5 rounded-lg text-sm font-bold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-xl hover:shadow-wine/25"
                >
                  Quiero ver una demo
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-muted/50 transition-all"
                >
                  Ver cómo funciona
                  <ChevronRight size={16} className="opacity-60" />
                </a>
              </motion.div>

              {/* Microcopy */}
              <motion.p
                variants={fadeUp}
                custom={5}
                className="text-center text-xs text-muted-foreground/50 tracking-wide"
              >
                Disponible para pilotos y despliegues progresivos en restaurantes seleccionados.
              </motion.p>

            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            2. CAMBIO DE PARADIGMA — COMPARATIVA
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background pointer-events-none" />
          <div className="relative max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  De una carta digital a un{" "}
                  <span className="text-gradient-wine">sistema de decisión comercial</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* LEFT — Traditional */}
                <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-card/40">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Wine size={16} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                      Carta digital tradicional
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {[
                      "Muestra vinos",
                      "Orden fijo",
                      "Recomendación estática",
                      "No reacciona al contexto",
                      "No prioriza negocio ni rotación",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3.5">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-muted-foreground/25 shrink-0" />
                        <span className="text-muted-foreground/70 text-[15px] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT — Winerim */}
                <div className="relative p-8 md:p-10 rounded-2xl border border-wine/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-wine/6 via-wine/3 to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-lg bg-wine/15 flex items-center justify-center">
                        <Brain size={16} className="text-wine" />
                      </div>
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-wine">
                        Winerim con Inteligencia dinámica
                      </h3>
                    </div>
                    <ul className="space-y-5">
                      {[
                        "Reordena con intención",
                        "Prioriza según objetivo",
                        "Activa estrategias por contexto real",
                        "Empuja referencias clave",
                        "Equilibra margen, stock y experiencia",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3.5">
                          <CheckCircle size={16} className="mt-0.5 text-wine shrink-0" />
                          <span className="text-foreground text-[15px] leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Closing statement */}
            <ScrollReveal>
              <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto">
                <p className="font-heading text-xl md:text-2xl text-foreground/90 leading-snug italic">
                  "Winerim no solo enseña vinos.{" "}
                  <span className="text-gradient-wine not-italic font-semibold">
                    Decide cuándo conviene mostrar, impulsar, simplificar o rotar
                  </span>{" "}
                  cada referencia."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            3. CÓMO FUNCIONA — 4 CAPAS (nuevo diseño)
        ════════════════════════════════════════════════ */}
        <section id="como-funciona" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-3 py-1">
                  Cómo funciona
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  Un sistema de decisión en{" "}
                  <span className="text-gradient-wine">4 capas</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Cada capa puede actuar por separado, pero el verdadero valor aparece cuando trabajan juntas.
                </p>
              </div>
            </ScrollReveal>

            {/* 4 Layer Cards with flow arrows */}
            <div className="relative">
              {[
                {
                  num: "01",
                  title: "Objetivos",
                  desc: "Definen qué quiere conseguir el restaurante: más facturación, más margen, más rotación, carta viva, impulsar vinos locales o mejorar la experiencia premium.",
                  icon: Target,
                  color: "from-amber-500/15 to-amber-600/5",
                  iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20",
                  iconColor: "text-amber-500",
                },
                {
                  num: "02",
                  title: "Perfiles de rotación",
                  desc: "Seleccionan qué vinos son elegibles o prioritarios según margen, stock, velocidad de salida, prime, temporada, precio, localismo y otros criterios configurables.",
                  icon: RefreshCw,
                  color: "from-emerald-500/15 to-emerald-600/5",
                  iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                  iconColor: "text-emerald-500",
                },
                {
                  num: "03",
                  title: "Módulos estructurales",
                  desc: "Determinan dónde se aplican las estrategias dentro de la carta: recomendados, novedades, selección, maridajes, primeras posiciones o resultados tras filtrado.",
                  icon: Layers,
                  color: "from-blue-500/15 to-blue-600/5",
                  iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
                  iconColor: "text-blue-500",
                },
                {
                  num: "04",
                  title: "Módulos RIM™",
                  desc: "Deciden cuándo y por qué actuar según contexto real: hora, clima, calendario, ventas, afluencia, stock, rentabilidad o comportamiento del comensal.",
                  icon: Brain,
                  color: "from-wine/15 to-wine/5",
                  iconBg: "bg-wine/10 group-hover:bg-wine/20",
                  iconColor: "text-wine",
                },
              ].map((layer, i, arr) => (
                <ScrollReveal key={layer.num}>
                  <div className="relative">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                      className="group relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start"
                    >
                      {/* Left: Number + vertical connector */}
                      <div className="hidden md:flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-2xl ${layer.iconBg} flex items-center justify-center transition-colors duration-300 border border-border`}>
                          <layer.icon className={`w-7 h-7 ${layer.iconColor}`} />
                        </div>
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-border to-transparent mt-4" />
                        )}
                      </div>

                      {/* Right: Content card */}
                      <div className={`relative p-7 md:p-9 rounded-2xl border border-border bg-card hover:border-wine/20 transition-all duration-500 ${i < arr.length - 1 ? "mb-6" : ""}`}>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${layer.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                        <div className="relative">
                          {/* Mobile icon */}
                          <div className={`md:hidden w-12 h-12 rounded-xl ${layer.iconBg} flex items-center justify-center mb-5 transition-colors`}>
                            <layer.icon className={`w-6 h-6 ${layer.iconColor}`} />
                          </div>

                          <div className="flex items-baseline gap-4 mb-3">
                            <span className="text-wine/25 font-heading text-4xl font-bold leading-none">{layer.num}</span>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                              {layer.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-[15px] md:max-w-xl">
                            {layer.desc}
                          </p>
                        </div>

                        {/* Flow arrow between cards (desktop) */}
                        {i < arr.length - 1 && (
                          <div className="hidden md:block absolute -bottom-6 left-12 z-10">
                            <ChevronRight size={18} className="text-wine/30 rotate-90" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Closing phrase */}
            <ScrollReveal>
              <div className="mt-14 md:mt-20 text-center">
                <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl border border-wine/15 bg-wine/5 backdrop-blur-sm">
                  <Zap size={20} className="text-wine shrink-0" />
                  <p className="text-foreground font-medium text-[15px] md:text-base leading-relaxed text-left">
                    El resultado es una carta que se adapta sola para vender mejor sin perder coherencia.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            4. OBJETIVOS — HIGH IMPACT
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-wine/6 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
                  Objetivos
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  Elige el objetivo.{" "}
                  <span className="text-gradient-wine">Winerim activa la estrategia.</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  Cada objetivo combina automáticamente módulos RIM™, perfiles de rotación y zonas de la carta para mover el negocio en la dirección correcta.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {objectiveCards.map((obj, i) => (
                <ScrollReveal key={obj.title}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className={`group relative h-full p-7 md:p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm ${obj.borderHover} transition-all duration-500 hover:shadow-lg hover:shadow-black/10`}
                  >
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${obj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl ${obj.iconBg} flex items-center justify-center mb-5 transition-colors duration-300`}>
                        <obj.icon className={`w-6 h-6 ${obj.iconColor}`} />
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                        {obj.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {obj.desc}
                      </p>

                      {/* Activated modules */}
                      <div className="pt-4 border-t border-border/60">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 font-semibold mb-2.5">
                          Activa
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {obj.modules.map((mod) => (
                            <span
                              key={mod}
                              className="inline-flex items-center px-2.5 py-1 rounded-md bg-wine/8 border border-wine/15 text-[11px] font-mono font-medium text-wine/80 tracking-wide"
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            5. MÓDULOS RIM™ PRINCIPALES
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
                  Módulos RIM™
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  Los módulos que hacen que la carta{" "}
                  <span className="text-gradient-wine">reaccione</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  Cada RIM™ responde a una lógica distinta. Juntos convierten la carta en un sistema táctico.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {rimCards.map((rim, i) => (
                <ScrollReveal key={rim.name}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className={`group relative h-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm ${rim.borderColor} transition-all duration-500 hover:shadow-lg hover:shadow-black/10 overflow-hidden`}
                  >
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${rim.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative flex flex-col h-full p-7 md:p-8">
                      {/* Header: icon + name */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-11 h-11 rounded-xl ${rim.iconBg} flex items-center justify-center shrink-0 transition-colors duration-300`}>
                          <rim.icon className={`w-5 h-5 ${rim.iconColor}`} />
                        </div>
                        <h3 className="font-mono text-base font-bold text-foreground tracking-wide">
                          {rim.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                        {rim.desc}
                      </p>

                      {/* Micro-result */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <ArrowRight size={12} className={`${rim.iconColor} shrink-0`} />
                          <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                            {rim.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <p className="text-center text-muted-foreground/50 text-sm mt-10 italic">
                Más módulos en desarrollo: PairingRIM™, TrendRIM™, CompetitorRIM™…
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            6. JERARQUÍA DE MÓDULOS
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
          <div className="relative max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
                  Arquitectura
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  Un sistema jerarquizado,{" "}
                  <span className="text-gradient-wine">no una suma de automatizaciones</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Winerim prioriza según protección del negocio, contexto real y estrategia comercial.
                </p>
              </div>
            </ScrollReveal>

            {/* Pyramid / Stack */}
            <ScrollReveal>
              <div className="space-y-3">
                {[
                  {
                    level: 1,
                    label: "Protección del negocio",
                    modules: ["MarginRIM™", "StockRIM™", "CleanRIM™"],
                    width: "max-w-full",
                    bg: "bg-wine/8 border-wine/20",
                    levelColor: "text-wine",
                    barColor: "bg-wine/60",
                  },
                  {
                    level: 2,
                    label: "Contexto",
                    modules: ["FocusRIM™", "ClimateRIM™", "CalendarRIM™"],
                    width: "max-w-[90%]",
                    bg: "bg-amber-500/6 border-amber-500/15",
                    levelColor: "text-amber-400",
                    barColor: "bg-amber-500/50",
                  },
                  {
                    level: 3,
                    label: "Estrategia de carta",
                    modules: ["PrimeRIM™", "MixRIM™", "LocalRIM™"],
                    width: "max-w-[78%]",
                    bg: "bg-blue-500/6 border-blue-500/15",
                    levelColor: "text-blue-400",
                    barColor: "bg-blue-500/50",
                  },
                  {
                    level: 4,
                    label: "Orquestación",
                    modules: ["SmartRIM™", "ClientRIM™"],
                    width: "max-w-[64%]",
                    bg: "bg-violet-500/6 border-violet-500/15",
                    levelColor: "text-violet-400",
                    barColor: "bg-violet-500/50",
                  },
                ].map((tier) => (
                  <motion.div
                    key={tier.level}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: tier.level * 0.1, duration: 0.5 }}
                    className={`${tier.width} mx-auto`}
                  >
                    <div className={`relative flex items-center gap-5 md:gap-6 px-6 md:px-8 py-5 md:py-6 rounded-xl border ${tier.bg} backdrop-blur-sm overflow-hidden`}>
                      {/* Left accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${tier.barColor} rounded-l-xl`} />

                      {/* Level indicator */}
                      <div className="shrink-0 text-center">
                        <span className={`block text-[10px] uppercase tracking-[0.2em] font-semibold ${tier.levelColor}`}>
                          Nivel
                        </span>
                        <span className={`font-heading text-2xl font-bold ${tier.levelColor}`}>
                          {tier.level}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                          {tier.label}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {tier.modules.map((mod) => (
                            <span
                              key={mod}
                              className="inline-flex items-center px-2 py-0.5 rounded bg-background/60 text-[11px] font-mono font-medium text-muted-foreground tracking-wide"
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Supporting text */}
            <ScrollReveal>
              <p className="text-center text-muted-foreground text-sm md:text-base leading-relaxed mt-12 max-w-2xl mx-auto">
                Cuando varios módulos pueden actuar a la vez, Winerim resuelve prioridades para que la carta siga siendo coherente y útil para el negocio.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            7. EXPLICABILIDAD — POR QUÉ ACTUÓ
        ════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
                  Transparencia
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  Cada acción tiene una{" "}
                  <span className="text-gradient-wine">razón visible</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Winerim no solo actúa. También explica por qué lo ha hecho.
                </p>
              </div>
            </ScrollReveal>

            {/* 3 Log-style explainability cards */}
            <div className="space-y-5">
              {[
                {
                  module: "FocusRIM™",
                  moduleColor: "text-blue-400",
                  moduleBg: "bg-blue-500/10",
                  moduleBorder: "border-blue-500/20",
                  accentBar: "bg-blue-500/60",
                  timestamp: "Hoy · 13:42 · Servicio de mediodía",
                  reasons: [
                    "Ocupación alta detectada (87%)",
                    "Tiempo de decisión elevado (+40% vs media)",
                    "Varias referencias rentables con stock suficiente",
                  ],
                  actions: [
                    "Simplificación de opciones visibles",
                    "Subida de primeras posiciones con mayor margen",
                    "Menor visibilidad de copas con bajo ROI",
                  ],
                },
                {
                  module: "StockRIM™",
                  moduleColor: "text-amber-400",
                  moduleBg: "bg-amber-500/10",
                  moduleBorder: "border-amber-500/20",
                  accentBar: "bg-amber-500/60",
                  timestamp: "Hoy · 09:15 · Revisión de inventario",
                  reasons: [
                    "Exceso de stock en 4 referencias (>30 días sin movimiento)",
                    "Rotación por debajo del umbral esperado en tintos jóvenes",
                  ],
                  actions: [
                    "Entrada en sección Novedades",
                    "Visibilidad adicional en búsquedas por tipo",
                    "Activación de estrategia por copa",
                  ],
                },
                {
                  module: "ClimateRIM™",
                  moduleColor: "text-cyan-400",
                  moduleBg: "bg-cyan-500/10",
                  moduleBorder: "border-cyan-500/20",
                  accentBar: "bg-cyan-500/60",
                  timestamp: "Hoy · 08:00 · Previsión meteorológica",
                  reasons: [
                    "Aumento de temperatura previsto (+8 °C vs ayer)",
                    "Mayor afinidad de estilos frescos con el momento",
                  ],
                  actions: [
                    "Subida de blancos, rosados y espumosos",
                    "Refuerzo de recomendaciones estacionales",
                  ],
                },
              ].map((log, i) => (
                <ScrollReveal key={log.module}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className={`relative rounded-2xl border ${log.moduleBorder} bg-card/60 backdrop-blur-sm overflow-hidden`}
                  >
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${log.accentBar}`} />

                    <div className="p-6 md:p-8 pl-7 md:pl-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md ${log.moduleBg} font-mono text-xs font-bold ${log.moduleColor} tracking-wide`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {log.module}
                        </span>
                        <span className="text-[11px] text-muted-foreground/50 font-mono tracking-wide">
                          {log.timestamp}
                        </span>
                      </div>

                      {/* Two columns: Reasons + Actions */}
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                        {/* Reasons */}
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-semibold mb-3">
                            Detectado
                          </p>
                          <ul className="space-y-2.5">
                            {log.reasons.map((r) => (
                              <li key={r} className="flex items-start gap-2.5">
                                <AlertTriangle size={13} className="mt-0.5 text-muted-foreground/40 shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Actions */}
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-semibold mb-3">
                            Acción aplicada
                          </p>
                          <ul className="space-y-2.5">
                            {log.actions.map((a) => (
                              <li key={a} className="flex items-start gap-2.5">
                                <CheckCircle size={13} className={`mt-0.5 ${log.moduleColor} shrink-0`} />
                                <span className="text-sm text-foreground/90 font-medium leading-relaxed">{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            8. IMPACTO ESTIMADO
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-wine/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">
                  Impacto
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  Una capa pensada para generar{" "}
                  <span className="text-gradient-wine">impacto real</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  Según el objetivo activado, la configuración de la carta y el contexto del restaurante, Winerim puede ayudar a mejorar distintas métricas clave.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {[
                {
                  title: "Facturación vino",
                  desc: "Potencial de mejora en visibilidad, conversión y empuje de referencias estratégicas.",
                  icon: DollarSign,
                  iconColor: "text-emerald-400",
                  iconBg: "bg-emerald-500/10",
                  borderHover: "hover:border-emerald-500/25",
                  gradient: "from-emerald-500/15 to-transparent",
                },
                {
                  title: "Margen medio",
                  desc: "Priorización de vinos con mejor contribución y menor canibalización.",
                  icon: TrendingUp,
                  iconColor: "text-wine",
                  iconBg: "bg-wine/10",
                  borderHover: "hover:border-wine/25",
                  gradient: "from-wine/15 to-transparent",
                },
                {
                  title: "Rotación",
                  desc: "Mejor salida de referencias lentas, sobrestock o vinos con menor visibilidad.",
                  icon: RefreshCw,
                  iconColor: "text-amber-400",
                  iconBg: "bg-amber-500/10",
                  borderHover: "hover:border-amber-500/25",
                  gradient: "from-amber-500/15 to-transparent",
                },
                {
                  title: "Tiempo de decisión",
                  desc: "Carta más enfocada y útil en momentos de alto volumen o servicio rápido.",
                  icon: Gauge,
                  iconColor: "text-blue-400",
                  iconBg: "bg-blue-500/10",
                  borderHover: "hover:border-blue-500/25",
                  gradient: "from-blue-500/15 to-transparent",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className={`group relative h-full p-8 md:p-10 rounded-2xl border border-border bg-card/60 backdrop-blur-sm ${item.borderHover} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>

                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <p className="text-center text-muted-foreground/40 text-xs mt-10 max-w-xl mx-auto leading-relaxed">
                El impacto real depende del tipo de restaurante, la configuración de objetivos, el volumen de la carta y el uso activo de la plataforma. Los resultados se miden dentro de Winerim.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            9. CTA FINAL
        ════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="relative p-12 md:p-16 rounded-2xl overflow-hidden text-center">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-wine opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />

                <div className="relative">
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                    Activa la inteligencia
                    <br />
                    de tu carta de vinos
                  </h2>
                  <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    Descubre cómo la inteligencia dinámica puede transformar la rentabilidad y experiencia de tu carta. Sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to={localePath("/demo")}
                      className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-wine px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-primary-foreground/90 transition-all"
                    >
                      Solicitar demo gratuita
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={localePath("/contacto")}
                      className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-primary-foreground/10 transition-all"
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InteligenciaDinamica;
