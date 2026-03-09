import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Smartphone, BarChart3, TrendingUp, Target,
  Utensils, Users, ShoppingCart, Search, Eye, Layers, Upload,
  Cpu, RotateCcw, Building2, Hotel, Store, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const problems = [
  { icon: Eye, title: "Cartas difíciles de entender", desc: "Listados largos sin contexto ni estructura que abruman al comensal y le empujan a elegir lo más barato o lo más conocido." },
  { icon: Users, title: "Clientes inseguros al elegir vino", desc: "Sin recomendaciones claras, el cliente siente que puede equivocarse. El resultado: no pide vino o pide el de siempre." },
  { icon: ShoppingCart, title: "Personal sin tiempo para recomendar", desc: "En servicio, el equipo de sala no siempre puede dedicar tiempo a explicar la carta de vinos a cada mesa." },
  { icon: RotateCcw, title: "Vinos que no rotan", desc: "Referencias que se estancan en bodega por estar mal posicionadas en precio, estilo duplicado o falta de visibilidad." },
  { icon: BarChart3, title: "Decisiones basadas en intuición", desc: "Compras, precios y estructura de carta se deciden sin datos reales de rendimiento ni análisis de ventas." },
];

const steps = [
  { number: "01", title: "Carga tu carta de vinos", desc: "Sube tu carta actual en cualquier formato. Winerim importa y estructura toda la información automáticamente.", icon: Upload },
  { number: "02", title: "Winerim organiza y optimiza", desc: "El sistema analiza precios, categorías, estilos y detecta oportunidades de mejora en la estructura de la carta.", icon: Cpu },
  { number: "03", title: "Los clientes interactúan", desc: "Los comensales acceden a una carta digital inteligente con filtros, maridajes y recomendaciones personalizadas.", icon: Smartphone },
  { number: "04", title: "Obtén datos y recomendaciones", desc: "El restaurante recibe analítica de ventas, métricas de rendimiento y sugerencias de optimización continua.", icon: BarChart3 },
];

const features = [
  { icon: Smartphone, title: "Carta digital interactiva", desc: "Una carta de vinos visual, navegable y siempre actualizada que funciona en cualquier dispositivo." },
  { icon: Target, title: "Recomendaciones de vino", desc: "IA que sugiere el vino ideal según las preferencias del comensal, el plato elegido y el contexto." },
  { icon: Utensils, title: "Maridajes con platos", desc: "Propuestas de maridaje automáticas que vinculan cada vino con los platos del menú." },
  { icon: Search, title: "Filtros y comparador", desc: "El cliente filtra por tipo, región, precio o estilo y compara vinos lado a lado con información clara." },
  { icon: BarChart3, title: "Analítica de ventas", desc: "Dashboards con datos reales sobre qué se vende, qué rota, qué margen genera y dónde están las oportunidades." },
  { icon: TrendingUp, title: "Optimización de precios", desc: "Análisis de estructura de precios para detectar huecos, desequilibrios y oportunidades de upselling." },
];

const benefits = [
  { icon: TrendingUp, text: "Aumentar las ventas de vino" },
  { icon: ShoppingCart, text: "Mejorar el ticket medio" },
  { icon: RotateCcw, text: "Optimizar la rotación de vinos" },
  { icon: Users, text: "Ayudar al personal de sala" },
  { icon: Wine, text: "Mejorar la experiencia del cliente" },
];

const audiences = [
  { icon: Store, title: "Restaurantes independientes", desc: "Desde bistrós hasta restaurantes gastronómicos que quieren profesionalizar su oferta de vinos y vender más." },
  { icon: Wine, title: "Wine bars y vinotecas", desc: "Espacios especializados que necesitan gestionar cartas amplias y ofrecer una experiencia de descubrimiento." },
  { icon: Hotel, title: "Hoteles", desc: "Establecimientos con múltiples puntos de venta que requieren coherencia y gestión centralizada de su oferta de vinos." },
  { icon: Building2, title: "Grupos de restauración", desc: "Cadenas y grupos que necesitan estandarizar, analizar y optimizar las cartas de vinos en múltiples locales." },
];

const QueEsWinerim = () => {
  const faqs = [
    { q: "¿Qué es Winerim?", a: "Winerim es una plataforma inteligente de gestión de cartas de vino para restaurantes. Combina carta digital interactiva, recomendaciones con IA, analítica de ventas y herramientas de optimización de precios para ayudar a los restaurantes a vender más vino." },
    { q: "¿Qué problema resuelve Winerim?", a: "Winerim resuelve los problemas más comunes en la venta de vino en restaurantes: cartas difíciles de entender, falta de recomendaciones, vinos que no rotan, y decisiones de compra basadas en intuición en lugar de datos." },
    { q: "¿Cómo funciona Winerim?", a: "El restaurante carga su carta de vinos, Winerim organiza y optimiza la información, los clientes interactúan con una carta digital inteligente con filtros y recomendaciones, y el restaurante obtiene analítica y sugerencias de mejora continua." },
    { q: "¿Para quién está pensado Winerim?", a: "Winerim está diseñado para restaurantes independientes, wine bars, hoteles y grupos de restauración que quieran profesionalizar su oferta de vinos, aumentar ventas y optimizar su bodega." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Qué es Winerim | Software Inteligente de Carta de Vinos"
        description="Winerim es una plataforma inteligente que ayuda a restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente con carta digital, IA y analítica."
        url="https://winerim.wine/que-es-winerim"
        hreflang={[
          { lang: "es", url: "https://winerim.wine/que-es-winerim" },
          { lang: "en", url: "https://winerim.wine/what-is-winerim" },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
            >
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">La plataforma</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8"
            >
              Qué es <span className="text-gradient-wine italic">Winerim</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Winerim es una plataforma inteligente diseñada para ayudar a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/demo"
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                Solicitar demo
              </Link>
              <Link
                to="/analisis-carta"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                Analizar mi carta de vinos
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* DEFINICIÓN */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Definición</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Un software que convierte tu carta en una herramienta de{" "}
              <span className="text-gradient-wine italic">venta</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Winerim es un software especializado en la gestión y optimización de cartas de vino en restaurantes. Combina tecnología avanzada con conocimiento enológico para transformar la forma en que los restaurantes presentan, recomiendan y venden vino.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Carta digital interactiva",
                "Recomendaciones inteligentes con IA",
                "Analítica de ventas en tiempo real",
                "Gestión integral de bodega",
                "Optimización de precios",
                "Maridajes automáticos con platos",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                  <CheckCircle size={18} className="text-wine shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El problema</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Qué problema <span className="text-gradient-wine italic">resuelve</span> Winerim
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              El vino es el producto con mayor margen en hostelería, pero la mayoría de restaurantes no aprovechan su potencial.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {problems.map((problem, i) => {
              const Icon = problem.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-destructive" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El proceso</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo <span className="text-gradient-wine italic">funciona</span> Winerim
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 items-start bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/30 transition-all duration-300">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center">
                        <span className="font-heading text-lg font-bold text-wine">{step.number}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={18} className="text-wine" />
                        <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Funcionalidades</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Todo lo que necesitas para <span className="text-gradient-wine italic">vender más vino</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Beneficios</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Qué consiguen los restaurantes con <span className="text-gradient-wine italic">Winerim</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{benefit.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Público objetivo</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Para quién es <span className="text-gradient-wine italic">Winerim</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {audiences.map((audience, i) => {
              const Icon = audience.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{audience.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Empieza hoy
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Convierte tu carta de vinos en una herramienta de{" "}
                <span className="text-gradient-wine italic">venta</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Descubre cómo Winerim puede transformar la forma en que tu restaurante vende vino. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Solicitar demo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/analisis-carta"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Analizar mi carta
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QueEsWinerim;
