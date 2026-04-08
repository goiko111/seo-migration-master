import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";
import {
  Wine, BarChart3, Brain, Users, Shield, Target, TrendingUp,
  Layers, Eye, ShoppingCart, ArrowRight, CheckCircle2, Lightbulb,
  Building2, Hotel, GlassWater, UtensilsCrossed, Store, BookOpen,
  Sparkles, Puzzle, Database, AlertTriangle, Gauge, Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const SobreWinerim = () => {
  const { localePath } = useLanguage();

  const faqs = [
    { q: "¿Qué es Winerim exactamente?", a: "Winerim es una plataforma de gestión inteligente del vino en hostelería. Combina carta digital interactiva, analítica de ventas, control de stock y pricing, recomendaciones con IA, e inteligencia de compras. No es solo una carta digital: es una infraestructura completa para que el vino funcione mejor en el negocio." },
    { q: "¿Winerim sustituye al sumiller?", a: "No. Winerim potencia al sumiller dándole datos, criterio y herramientas para decidir mejor. Y en restaurantes sin sumiller, cubre el hueco con recomendaciones inteligentes y guías para el equipo de sala." },
    { q: "¿Qué tipo de restaurante encaja con Winerim?", a: "Restaurantes gastronómicos, hoteles con F&B, grupos de restauración, wine bars y cualquier negocio donde el vino sea una categoría relevante. Desde cartas de 30 referencias hasta cartas de más de 500." },
    { q: "¿Cómo se generan las recomendaciones?", a: "Se basan en datos reales de la carta, patrones de venta, datos de stock y objetivos comerciales configurados. No son genéricas: se adaptan al contexto de cada restaurante." },
    { q: "¿Winerim funciona sin integración con TPV?", a: "Sí. La carta digital, la gestión de referencias y las recomendaciones funcionan sin TPV. Con TPV integrado se desbloquean las analíticas de venta avanzadas y la medición de impacto." },
    { q: "¿Qué diferencia a Winerim de una carta digital estándar?", a: "Una carta digital muestra vinos. Winerim analiza la carta, detecta desequilibrios, sugiere cambios de pricing, alerta sobre stock muerto, activa recomendaciones por contexto y mide el impacto comercial de cada decisión." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sobre nosotros — Gestión inteligente del vino en hostelería"
        description="Winerim ayuda a restaurantes, hoteles y grupos a vender más vino, decidir mejor y optimizar carta, pricing y stock con datos e inteligencia aplicada."
        url={`${CANONICAL_DOMAIN}/sobre-nosotros`}
      />
      <DynamicSchemaMarkup
        id="sobre-nosotros"
        type="AboutPage"
        title="Sobre nosotros"
        description="Plataforma de gestión inteligente del vino en hostelería: carta, analítica, pricing, stock e inteligencia de compras."
        url={`${CANONICAL_DOMAIN}/sobre-nosotros`}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: "Sobre nosotros", url: `${CANONICAL_DOMAIN}/sobre-nosotros` },
        ]}
      />
      <Navbar />

      <main>
        {/* ═══════════════════════════════════════════════════════════
            1. HERO
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Wine size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Sobre Winerim</span>
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                Winerim no nació para digitalizar cartas.{" "}
                <span className="text-gradient-wine italic">
                  Nació para hacer que el vino funcione mejor en hostelería.
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
                Winerim ayuda a restaurantes, hoteles y grupos a vender mejor, decidir mejor y comprar mejor vino
                mediante una combinación de tecnología, datos e inteligencia aplicada.
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
                  to={localePath("/que-es-winerim")}
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  Ver cómo funciona
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. EL PROBLEMA REAL
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                El problema
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4 max-w-3xl mx-auto">
                El vino se gestiona mal en demasiados negocios
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                No por falta de interés, sino por falta de herramientas que conecten carta, bodega, sala y negocio.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: AlertTriangle, text: "La carta informa, pero no ayuda a vender. No activa la decisión del comensal ni guía al equipo de sala." },
                { icon: ShoppingCart, text: "Se compra por intuición, por costumbre o por presión comercial. Sin datos claros de lo que realmente rota y lo que no." },
                { icon: TrendingUp, text: "Se revisa el margen tarde — o nunca. Los costes suben, los precios se mantienen y la rentabilidad se erosiona." },
                { icon: Users, text: "La sala no siempre sabe defender el vino. Falta formación, confianza y herramientas para recomendar con criterio." },
                { icon: Database, text: "El stock se acumula sin control. Capital dormido en referencias que no se mueven, vinos muertos que nadie detecta." },
                { icon: Gauge, text: "Se desaprovecha potencial de ticket, experiencia y rentabilidad. El vino podría generar mucho más valor del que genera." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <item.icon size={18} className="text-wine" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. POR QUÉ NACE WINERIM
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  Origen
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                  Winerim nace de un{" "}
                  <span className="text-gradient-wine italic">problema real</span>
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    No nace como software genérico adaptado al vino. Nace desde dentro del sector,
                    desde la intersección entre vino, hostelería, negocio y tecnología.
                  </p>
                  <p>
                    Nace de ver cartas que no ayudan a vender. Bodegas sin control real. Equipos de sala
                    sin herramientas. Decisiones de compra basadas en la inercia.
                  </p>
                  <p>
                    Y nace con un propósito claro: convertir la carta de vinos en una{" "}
                    <strong className="text-foreground">capa de inteligencia</strong> que conecte lo que el comensal quiere,
                    lo que el negocio necesita y lo que la bodega tiene.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-8 space-y-6">
                  {[
                    { label: "No es un proyecto de digitalización", desc: "Es un proyecto de inteligencia aplicada al vino en hostelería." },
                    { label: "No sustituye al profesional", desc: "Le da mejores datos, mejor contexto y mejores herramientas para decidir." },
                    { label: "No se queda en la pantalla", desc: "Conecta carta, stock, ventas, pricing y compras en un solo ecosistema." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-wine shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. QUÉ HACE DIFERENTE A WINERIM
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Diferenciación
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Qué hace diferente a Winerim
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No es solo una carta digital. Es una capa completa de inteligencia para la operación del vino.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Eye, title: "Carta digital viva", desc: "Una carta que no solo muestra vinos: recomienda, filtra por contexto, adapta maridajes y activa la decisión del comensal con inteligencia." },
                { icon: BarChart3, title: "Inteligencia analítica", desc: "KPIs específicos del vino: rotación por referencia, margen real, ticket medio, mix de precios, detección de vinos muertos y benchmarks sectoriales." },
                { icon: Brain, title: "Recomendaciones y activación", desc: "Motor de IA que sugiere qué destacar, qué rotar y qué recomendar según datos de carta, venta, stock y objetivos del negocio." },
                { icon: TrendingUp, title: "Pricing y rentabilidad", desc: "Simulador de precios, análisis de márgenes por referencia, alertas de erosión y herramientas de pricing inteligente para proteger la rentabilidad." },
                { icon: ShoppingCart, title: "Inteligencia de compras", desc: "Decisiones de reposición basadas en datos de rotación, alertas de sobrecoste y lógica de compra por cluster en grupos de restauración." },
                { icon: Layers, title: "Lectura global de carta", desc: "Análisis de equilibrio por tipo, región, precio y estilo. Diagnóstico de la salud de la carta como activo comercial, no solo como lista de vinos." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-7 h-full hover:border-wine/20 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <item.icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. SISTEMA, NO FEATURE SUELTA
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.06),transparent_70%)]" />
                <div className="relative z-10">
                  <Puzzle size={32} className="text-wine mx-auto mb-6" />
                  <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    Winerim no es una funcionalidad.{" "}
                    <span className="text-gradient-wine italic">Es una infraestructura.</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                    Una infraestructura para entender, activar y optimizar la operación del vino.
                    Carta, stock, ventas, pricing, compras y equipo de sala — conectados en un solo ecosistema.
                  </p>
                  <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto">
                    No se trata de añadir una herramienta más. Se trata de que el vino deje de gestionarse
                    en silos y empiece a funcionar como un sistema.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. QUÉ TIPO DE NEGOCIO ENCAJA
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Para quién
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                ¿Para qué tipo de negocio es Winerim?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Si el vino es una categoría relevante en tu negocio, Winerim tiene algo para ti.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: UtensilsCrossed, title: "Restaurante gastronómico", desc: "Carta cuidada, equipo de sala formado, ambición de elevar la experiencia del vino. Winerim potencia lo que ya haces bien y detecta lo que puedes mejorar." },
                { icon: Building2, title: "Grupo de restauración", desc: "Múltiples locales, necesidad de coherencia, control de márgenes y benchmarking interno. Winerim funciona como capa de gobierno del vino a escala." },
                { icon: Hotel, title: "Hotel con F&B", desc: "Varios puntos de venta, rotación de personal, cartas diversas. Winerim unifica criterio y da herramientas de gestión transversal." },
                { icon: GlassWater, title: "Wine bar", desc: "Alta rotación de referencias, servicio por copa protagonista. Winerim optimiza la selección, el pricing por copa y la recomendación activa." },
                { icon: Store, title: "Restaurante sin sumiller", desc: "Sin experto dedicado, pero con voluntad de vender bien vino. Winerim cubre el gap con recomendaciones, guías y una carta que se defiende sola." },
                { icon: BookOpen, title: "Carta amplia (+100 refs)", desc: "Gestionar una carta grande sin datos es un riesgo. Winerim da visibilidad sobre rotación, rentabilidad y equilibrio en cartas complejas." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-7 h-full hover:border-wine/20 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <item.icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. QUÉ RESULTADOS BUSCA PROVOCAR
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Impacto
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Qué resultados busca provocar
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                No inventamos cifras. Hablamos de lo que cambia cuando un negocio empieza a gestionar el vino con datos y criterio.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Target, text: "Más claridad para decidir qué incluir, destacar o rotar en carta" },
                { icon: Wine, text: "Mejor venta por copa y botella gracias a recomendaciones contextuales" },
                { icon: Users, text: "Más confianza del equipo de sala para hablar de vino y recomendar" },
                { icon: Layers, text: "Mejor lectura del surtido: equilibrio, diversidad y posicionamiento" },
                { icon: TrendingUp, text: "Menos capital dormido en referencias que no se mueven" },
                { icon: BarChart3, text: "Más coherencia real entre carta, stock, ventas y margen" },
                { icon: ShoppingCart, text: "Decisiones de compra basadas en datos de rotación y rendimiento" },
                { icon: Sparkles, text: "Experiencia de vino más rica para el comensal, sin depender del azar" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.03}>
                  <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/20 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-wine" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. FILOSOFÍA DE PRODUCTO
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Filosofía
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight">
                Cómo pensamos el producto
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Criterio antes que ruido", desc: "Cada dato, cada recomendación, cada alerta tiene un por qué. No mostramos más: mostramos lo que importa." },
                { title: "Elegancia antes que saturación", desc: "La interfaz es limpia, la experiencia del comensal es fluida, las herramientas de gestión son claras. Premium en fondo y forma." },
                { title: "Inteligencia útil antes que dashboards vacíos", desc: "Un KPI sin contexto no sirve. Un dato sin acción es ruido. Cada insight de Winerim lleva asociada una decisión posible." },
                { title: "Tecnología al servicio de la hostelería real", desc: "No construimos para demostrar lo que la tecnología puede hacer. Construimos para resolver lo que la hostelería necesita." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-8 h-full">
                    <Lightbulb size={20} className="text-wine mb-4" />
                    <h3 className="font-heading text-base font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            9. AUTORIDAD
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  Autoridad
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                  Por qué Winerim puede{" "}
                  <span className="text-gradient-wine italic">hablar con criterio</span>
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    Winerim trabaja con datos del vino a escala: +300.000 referencias, +1.000 bodegas gestionadas,
                    presencia en 15 países y una base de conocimiento que crece cada día.
                  </p>
                  <p>
                    Pero los datos solos no bastan. Lo que diferencia a Winerim es la visión transversal:
                    entender cómo se conectan carta, pricing, comportamiento de compra, rotación de stock
                    y percepción del comensal.
                  </p>
                  <p>
                    Es esa conexión entre vino y negocio — entre producto y operación — lo que convierte
                    a Winerim en algo más que un software.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-4">
                  {[
                    { icon: Database, label: "+300.000 referencias de vino en la base de datos" },
                    { icon: Wine, label: "+1.000 bodegas gestionadas en la plataforma" },
                    { icon: Target, label: "15 países con presencia activa" },
                    { icon: Zap, label: "22+ integraciones TPV disponibles" },
                    { icon: Shield, label: "Contenido validado por profesionales de sommellerie y restauración" },
                    { icon: Brain, label: "Motor de IA entrenado con datos específicos del sector" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5">
                      <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-wine" />
                      </div>
                      <p className="text-sm text-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FAQ
            ═══════════════════════════════════════════════════════════ */}
        <FAQSection faqs={faqs} schemaId="sobre-nosotros" />

        {/* ═══════════════════════════════════════════════════════════
            INTERNAL LINKS
            ═══════════════════════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <InternalLinks
            links={[
              { to: localePath("/que-es-winerim"), label: "¿Qué es Winerim?", type: "solution" },
              { to: localePath("/funcionalidades"), label: "Funcionalidades", type: "solution" },
              { to: localePath("/soluciones"), label: "Soluciones", type: "solution" },
              { to: localePath("/producto/winerim-core"), label: "Winerim Core", type: "solution" },
              { to: localePath("/producto/winerim-supply"), label: "Winerim Supply", type: "solution" },
              { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
              { to: "/biblioteca-vino", label: "Biblioteca del Vino", type: "resource" },
              { to: localePath("/herramientas"), label: "Herramientas", type: "tool" },
            ]}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════
            10. CTA FINAL
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                    Si el vino importa en tu negocio,{" "}
                    <span className="text-gradient-wine italic">
                      merece algo más que una carta estática.
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Descubre cómo Winerim puede convertir tu carta en un activo estratégico de venta, rentabilidad y experiencia.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to={localePath("/demo")}
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                    >
                      Solicitar demo <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={localePath("/soluciones")}
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      Ver soluciones
                    </Link>
                    <Link
                      to="/biblioteca-vino"
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      Explorar Biblioteca Vino
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SobreWinerim;
