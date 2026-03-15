import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ChevronRight, ShoppingCart, DollarSign, TrendingUp,
  AlertTriangle, Search, Star, ClipboardList, Users, Building2,
  Globe, Shield, BarChart3, Package, RefreshCw, Lightbulb, Brain
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

/* ── Capabilities data ── */
const capabilities = [
  {
    icon: BarChart3,
    title: "Comparativa de precios de compra",
    desc: "Cruza lo que pagas por cada referencia con datos agregados de la red para saber si tu precio es competitivo o si hay margen de renegociación.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Search,
    title: "Detección de oportunidades",
    desc: "Identifica referencias que otros restaurantes de perfil similar están comprando con buenos resultados y que tú aún no tienes en carta.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: AlertTriangle,
    title: "Alertas de sobreprecio",
    desc: "Notificación automática cuando el precio de compra de una referencia está significativamente por encima de la media para tu perfil y volumen.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Lightbulb,
    title: "Recomendación de compra / no reposición",
    desc: "Basándose en rotación, margen, stock actual y tendencia de venta, el sistema recomienda qué reponer, qué dejar morir y qué probar.",
    iconBg: "bg-wine/10",
    iconColor: "text-wine",
  },
  {
    icon: Star,
    title: "Scoring de distribuidores",
    desc: "Evalúa a tus proveedores según precio, fiabilidad de entrega, amplitud de catálogo y condiciones comerciales frente a alternativas.",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: ClipboardList,
    title: "Lista de compra inteligente",
    desc: "Genera propuestas de pedido basadas en niveles de stock, velocidad de salida, previsión de demanda y objetivos de carta activos.",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
];

const WinerimSupply = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Winerim Supply | Inteligencia de compras para restaurantes"
        description="Winerim Supply analiza precios de compra, distribuidores, rotación y oportunidades para ayudarte a decidir qué comprar, qué renegociar y qué no reponer. Compra mejor, vende mejor."
        url="https://winerim.wine/producto/winerim-supply"
      />

      <Navbar />

      {/* ─── Breadcrumbs ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <Breadcrumbs items={[
          { label: "Inicio", href: "/" },
          { label: "Funcionalidades", href: "/funcionalidades" },
          { label: "Winerim Supply" },
        ]} />
      </div>

      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="section-padding pt-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 tracking-[0.25em] uppercase text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-4 py-1.5">
              Inteligencia de compras
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              No solo te ayudamos a vender mejor.{" "}
              <span className="text-gradient-gold">También a comprar mejor.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              Winerim analiza precios de compra, stock, rotación, oportunidades y distribuidores para ayudarte a decidir qué merece la pena seguir comprando, qué renegociar y qué no reponer.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Quiero ver Winerim Supply <ArrowRight size={16} />
              </Link>
              <Link
                to="/producto/winerim-core"
                className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all"
              >
                Ver cómo se conecta con Core <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. QUÉ ES WINERIM SUPPLY
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold mb-4">Qué es Winerim Supply</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  La capa que conecta lo que <span className="text-gradient-gold">vendes</span> con lo que <span className="text-gradient-gold">compras</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    La mayoría de restaurantes gestionan sus compras de vino por inercia: repiten pedidos, mantienen referencias por costumbre y negocian sin datos. <strong className="text-foreground">Winerim Supply cambia esa lógica.</strong>
                  </p>
                  <p>
                    Conectando los datos de venta, margen, rotación y stock que ya genera{" "}
                    <Link to="/producto/winerim-core" className="text-wine hover:text-wine-light underline underline-offset-4">Winerim Core</Link>,
                    Supply añade una capa de inteligencia sobre la cadena de aprovisionamiento: analiza qué te conviene comprar, a qué precio lo estás pagando frente al mercado, y si tus distribuidores te ofrecen las mejores condiciones.
                  </p>
                  <p>
                    No sustituye tu relación con los proveedores. La enriquece con datos para que cada decisión de compra esté respaldada por una visión completa del negocio.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: ShoppingCart, label: "Compra con criterio", desc: "Datos de venta y rotación informan cada pedido." },
                    { icon: DollarSign, label: "Negocia con ventaja", desc: "Comparativa de precios frente al mercado." },
                    { icon: RefreshCw, label: "Repón con lógica", desc: "Automatiza la lista de compra según demanda real." },
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
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                        <item.icon size={20} className="text-emerald-400" />
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

      {/* ═══════════════════════════════════════
          3. CAPACIDADES CLAVE
      ═══════════════════════════════════════ */}
      <section className="section-padding" id="capacidades">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">Capacidades</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold">
              Inteligencia aplicada a cada <span className="text-gradient-gold">decisión de compra</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Seis capacidades diseñadas para que cada euro invertido en bodega tenga un retorno medible en la carta.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="group relative h-full p-7 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-border transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl ${cap.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                      <cap.icon className={`w-6 h-6 ${cap.iconColor} transition-all duration-500`} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{cap.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{cap.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. LA VENTAJA DE RED
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Globe size={20} className="text-violet-400" />
                  </div>
                  <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold">La ventaja de red</p>
                </div>

                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  Cuantos más restaurantes usan Winerim,{" "}
                  <span className="text-gradient-gold">mejores datos para todos</span>
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Winerim Supply no funciona como un comparador genérico. Se alimenta de datos reales y anonimizados de restaurantes que ya usan la plataforma. Esto significa que las comparativas de precio, las alertas de sobreprecio y las oportunidades de compra se basan en <strong className="text-foreground">transacciones reales de negocios con perfiles similares al tuyo</strong>.
                  </p>
                  <p>
                    A medida que la red crece, la inteligencia de compra mejora. Es un efecto de red donde cada restaurante que se incorpora hace que los datos sean más ricos, las comparativas más fiables y las recomendaciones más precisas.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: "Datos anonimizados", desc: "Ningún restaurante ve los datos individuales de otro." },
                    { icon: Users, label: "Perfiles comparables", desc: "Se comparan negocios de volumen y tipo similar." },
                    { icon: TrendingUp, label: "Efecto de red", desc: "Más restaurantes = mejores benchmarks de compra." },
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
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                        <item.icon size={20} className="text-violet-400" />
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

      {/* ═══════════════════════════════════════
          5. CONEXIÓN CON GRUPOS
      ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">Grupos y multi-local</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Para grupos, Supply es{" "}
              <span className="text-gradient-gold">aún más potente</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Building2,
                  title: "Visión consolidada de compras",
                  desc: "Agrupa los pedidos de todos los locales del grupo para detectar ineficiencias, duplicidades y oportunidades de negociación conjunta con distribuidores.",
                  accent: "border-amber-500/20",
                  iconBg: "bg-amber-500/10",
                  iconColor: "text-amber-400",
                },
                {
                  icon: BarChart3,
                  title: "Benchmark interno de compras",
                  desc: "Compara precios de compra entre locales del mismo grupo. Detecta si un local paga más por la misma referencia y estandariza condiciones.",
                  accent: "border-blue-500/20",
                  iconBg: "bg-blue-500/10",
                  iconColor: "text-blue-400",
                },
                {
                  icon: Package,
                  title: "Unificación de catálogos",
                  desc: "Identifica qué referencias comparten varios locales y cuáles son específicas, facilitando la racionalización del catálogo a nivel grupo.",
                  accent: "border-emerald-500/20",
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-400",
                },
                {
                  icon: Brain,
                  title: "Recomendaciones centralizadas",
                  desc: "La dirección de compras del grupo recibe recomendaciones consolidadas basadas en el rendimiento real de cada referencia en cada local.",
                  accent: "border-wine/20",
                  iconBg: "bg-wine/10",
                  iconColor: "text-wine",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`group relative p-7 md:p-8 rounded-2xl border ${card.accent} bg-card/60 hover:bg-card/80 transition-all duration-500`}
                >
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link
                to="/soluciones/grupos-restauracion"
                className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-light transition-colors"
              >
                Ver solución completa para grupos de restauración <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CTA FINAL
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Compra con inteligencia</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  Deja de comprar por inercia.{" "}
                  <span className="text-gradient-gold">Compra con datos.</span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Te mostramos cómo Winerim Supply transforma tus decisiones de compra con datos reales de tu carta, tu stock y el mercado.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/demo"
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                  >
                    Solicitar demo de Supply <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all"
                  >
                    Hablar con el equipo
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <FAQSection
        schemaId="winerim-supply"
        title="Preguntas frecuentes sobre Winerim Supply"
        faqs={[
          { q: "¿Winerim Supply sustituye a mi distribuidor?", a: "No. Supply no vende ni intermedia. Analiza tus datos de compra y los compara con benchmarks del mercado para que negocies con más información y tomes mejores decisiones de reposición." },
          { q: "¿Cómo se generan las comparativas de precio?", a: "A partir de datos anonimizados y agregados de restaurantes que usan Winerim. Nunca se comparten datos individuales; solo se usan promedios por perfil y volumen similar." },
          { q: "¿Necesito tener Winerim Core para usar Supply?", a: "Supply se alimenta de los datos que genera Core (ventas, márgenes, rotación, stock). Funcionan como capas complementarias dentro de la misma plataforma." },
          { q: "¿Puedo usar Supply para un grupo con varios locales?", a: "Sí. De hecho, la visión consolidada de compras a nivel grupo es una de las funcionalidades más potentes de Supply: detecta desviaciones de precio entre locales y oportunidades de negociación conjunta." },
          { q: "¿Supply está disponible para todos los planes?", a: "Supply se despliega de forma progresiva. Contacta con el equipo para conocer la disponibilidad según tu plan y perfil de negocio." },
        ]}
      />

      <InternalLinks links={[
        { to: "/producto/winerim-core", label: "Winerim Core: 26 módulos analíticos", type: "solution" },
        { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: IA táctica para carta", type: "solution" },
        { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "resource" },
        { to: "/soluciones/grupos-restauracion", label: "Solución para grupos de restauración", type: "solution" },
        { to: "/demo", label: "Solicitar una demo personalizada", type: "resource" },
        { to: "/precios", label: "Planes y precios", type: "resource" },
      ]} />

      <Footer />
    </div>
  );
};

export default WinerimSupply;
