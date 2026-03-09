import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Sparkles, Utensils, BarChart3, TrendingUp, ArrowRight,
  AlertTriangle, Lightbulb, Wine, Users, LineChart, RotateCcw,
  Zap, Target, ShoppingCart, Eye, Cpu, Bot
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import mockupImg from "@/assets/winerim-mockup.png";

const problems = [
  { icon: Users, title: "Personal sin formación en vinos", desc: "La mayoría de camareros no pueden recomendar con confianza, lo que frena la venta de referencias de mayor valor." },
  { icon: Eye, title: "Cartas confusas para el cliente", desc: "Listados interminables sin contexto ni explicaciones hacen que el comensal elija por precio, no por preferencia." },
  { icon: AlertTriangle, title: "Decisiones sin datos", desc: "La compra de vino y el diseño de la carta se basan en intuición, no en análisis de rendimiento real." },
  { icon: ShoppingCart, title: "Venta por impulso, no por estrategia", desc: "Sin herramientas de recomendación, el vino se vende (o no) de forma aleatoria, perdiendo margen y oportunidades." },
];

const aiApplications = [
  { icon: Sparkles, title: "Recomendaciones inteligentes", desc: "La IA analiza preferencias del comensal, plato elegido y contexto para sugerir el vino perfecto en cada momento." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "Algoritmos que cruzan perfiles organolépticos con la carta gastronómica para proponer combinaciones óptimas." },
  { icon: BarChart3, title: "Análisis de ventas", desc: "Dashboards en tiempo real que muestran qué vinos se venden, cuáles rotan poco y dónde está el margen oculto." },
  { icon: Target, title: "Optimización de la carta", desc: "Detección automática de huecos, duplicidades de estilo y rangos de precio mal estructurados." },
  { icon: RotateCcw, title: "Predicción de rotación", desc: "Modelos predictivos que anticipan qué referencias necesitan impulso y cuáles están en riesgo de caducar." },
];

const winerimFeatures = [
  { title: "Analiza tu carta de vinos", desc: "Detecta desequilibrios de precio, duplicidades de estilo y oportunidades de mejora en minutos." },
  { title: "Recomienda vinos a clientes", desc: "Un sommelier virtual que guía al comensal hacia la mejor elección según sus gustos y el plato." },
  { title: "Optimiza la estructura", desc: "Reorganiza categorías, rangos de precio y referencias para maximizar la conversión." },
  { title: "Mejora la rotación", desc: "Identifica vinos estancados y propone estrategias para mover stock de forma inteligente." },
];

const benefits = [
  { icon: TrendingUp, text: "Aumentar las ventas de vino" },
  { icon: ShoppingCart, text: "Mejorar el ticket medio" },
  { icon: Users, text: "Ayudar al personal de sala" },
  { icon: Wine, text: "Optimizar la bodega" },
  { icon: Sparkles, text: "Mejorar la experiencia del cliente" },
];

const IARestaurantes = () => {
  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "ia-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo puede la inteligencia artificial ayudar a un restaurante a vender más vino?",
          acceptedAnswer: { "@type": "Answer", text: "La IA analiza preferencias del cliente, sugiere maridajes automáticos y optimiza la carta de vinos para maximizar ventas y ticket medio." },
        },
        {
          "@type": "Question",
          name: "¿Qué es un recomendador de vinos con IA?",
          acceptedAnswer: { "@type": "Answer", text: "Es un sistema que utiliza algoritmos de inteligencia artificial para sugerir vinos personalizados según los gustos del comensal, el plato elegido y el contexto de la comida." },
        },
        {
          "@type": "Question",
          name: "¿Qué beneficios tiene la IA para la hostelería?",
          acceptedAnswer: { "@type": "Answer", text: "Permite recomendar de forma personalizada, optimizar precios y cartas, analizar datos de ventas y automatizar procesos que antes dependían exclusivamente del personal." },
        },
      ],
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.getElementById("ia-faq-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Inteligencia Artificial para Restaurantes | IA para Vender Más Vino"
        description="Descubre cómo la inteligencia artificial ayuda a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente. Recomendaciones, maridajes y análisis con IA."
        url="https://winerim.wine/inteligencia-artificial-restaurantes"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Breadcrumbs items={[{ label: "IA para restaurantes" }]} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
              >
                <Brain size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">IA + Hostelería</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8"
              >
                Inteligencia artificial para{" "}
                <span className="text-gradient-wine italic">restaurantes</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
              >
                Cómo la IA está ayudando a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente.
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
                  Descubrir cómo funciona
                </Link>
                <Link
                  to="/analisis-carta"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                >
                  Analizar mi carta de vinos
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                <img
                  src={mockupImg}
                  alt="Interfaz de recomendación de vinos con inteligencia artificial en Winerim"
                  className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La revolución silenciosa</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              La IA ya está transformando la <span className="text-gradient-wine italic">hostelería</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="prose-custom max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                La inteligencia artificial no es ciencia ficción: ya está presente en miles de restaurantes de todo el mundo. Desde sistemas de reservas inteligentes hasta análisis predictivo de demanda, la IA permite tomar mejores decisiones con menos esfuerzo.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Pero hay un ámbito donde el impacto puede ser especialmente grande: <strong className="text-foreground">la venta de vino</strong>. El vino es el producto con mayor margen en hostelería, pero también uno de los más difíciles de vender cuando no existe una estrategia clara. La IA cambia las reglas del juego.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Bot, text: "Recomendaciones personalizadas" },
                  { icon: LineChart, text: "Optimización de precios" },
                  { icon: BarChart3, text: "Análisis de datos de ventas" },
                  { icon: Zap, text: "Automatización de procesos" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                    <item.icon size={20} className="text-wine shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
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
              Por qué los restaurantes <span className="text-gradient-wine italic">pierden ventas</span> de vino
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Sin herramientas inteligentes, la venta de vino depende del azar, no de la estrategia.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

      {/* CÓMO LA IA AYUDA */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Aplicaciones prácticas</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo la IA ayuda a <span className="text-gradient-wine italic">vender más vino</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              La inteligencia artificial transforma cada punto de contacto con el vino en una oportunidad de venta.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiApplications.map((app, i) => {
              const Icon = app.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{app.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUÉ HACE WINERIM */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Winerim</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  IA diseñada para la <span className="text-gradient-wine italic">venta de vino</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Winerim aplica inteligencia artificial específicamente entrenada para el mundo del vino en hostelería. No es un chatbot genérico: es una plataforma que entiende de enología, maridajes, estructuras de carta y comportamiento del comensal.
                </p>
                <div className="space-y-5">
                  {winerimFeatures.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Cpu size={16} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-2xl" />
                <div className="relative bg-gradient-card rounded-2xl border border-border p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain size={20} className="text-wine" />
                    <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Motor de IA Winerim</span>
                  </div>
                  {["Análisis de carta completado", "3 desequilibrios de precio detectados", "12 oportunidades de maridaje", "Rotación optimizable en 8 referencias", "+18% potencial de ticket medio"].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-3 border border-border"
                    >
                      <Sparkles size={14} className="text-wine shrink-0" />
                      <span className="text-sm">{line}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Beneficios</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              ¿Qué consiguen los restaurantes con <span className="text-gradient-wine italic">IA</span>?
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

      {/* FUTURO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Mirando al futuro</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              El futuro de la IA en <span className="text-gradient-wine italic">restaurantes</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Cada vez más restaurantes adoptarán herramientas basadas en inteligencia artificial para tomar decisiones informadas. Desde la selección de proveedores hasta la personalización de la experiencia gastronómica, la IA se convertirá en un aliado imprescindible.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Los restaurantes que integren IA en su operativa diaria no solo venderán más: ofrecerán una experiencia superior, fidelizarán mejor a sus clientes y optimizarán cada euro invertido en su bodega. <strong className="text-foreground">La pregunta no es si adoptarás IA, sino cuándo.</strong>
            </p>
          </ScrollReveal>
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
                Da el primer paso
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre cómo la inteligencia artificial puede{" "}
                <span className="text-gradient-wine italic">mejorar tu carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta y te mostramos el potencial de optimización con IA. Sin compromiso.
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

export default IARestaurantes;
