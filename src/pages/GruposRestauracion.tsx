import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, AlertTriangle, CheckCircle, BarChart3,
  Layers, RefreshCw, DollarSign, TrendingUp, Users, Wine,
  Warehouse, Globe, Sparkles, Store
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const problems = [
  { icon: Layers, text: "Cada restaurante gestiona el vino de forma diferente: cartas distintas, criterios distintos, calidades distintas." },
  { icon: DollarSign, text: "Falta de control sobre los precios: multiplicadores inconsistentes, márgenes desiguales entre locales." },
  { icon: RefreshCw, text: "Dificultad para mantener las cartas actualizadas: cambios de añada, nuevas referencias, descatalogados." },
  { icon: BarChart3, text: "Falta de datos centralizados: no sabes qué vinos se venden, cuáles se estancan ni dónde están los márgenes." },
  { icon: TrendingUp, text: "Poca visibilidad sobre las ventas de vino: el vino es el producto más rentable pero el menos medido." },
];

const advantages = [
  { icon: Building2, title: "Gestión centralizada de cartas", desc: "Una plataforma para gestionar todas las cartas de vino de todos tus locales. Cambios que se aplican al instante." },
  { icon: DollarSign, title: "Control de precios unificado", desc: "Define estrategias de pricing por local, por tipo de vino o por segmento. Consistencia sin rigidez." },
  { icon: BarChart3, title: "Analítica de ventas por local", desc: "Compara el rendimiento de cada restaurante: qué vinos venden más, márgenes, rotación y ticket medio." },
  { icon: Wine, title: "Optimización de la oferta", desc: "Identifica duplicados, huecos y oportunidades en cada carta. Adapta la selección al perfil de cada local." },
  { icon: Users, title: "Experiencia del cliente mejorada", desc: "Cartas digitales con maridajes, fichas de vino y recomendaciones inteligentes en todos tus restaurantes." },
];

const features = [
  { icon: Globe, title: "Gestión multi-local", desc: "Dashboard central con vista de todos los restaurantes. Filtra, compara y actúa desde un solo panel." },
  { icon: RefreshCw, title: "Actualización centralizada", desc: "Modifica precios, añade referencias o retira vinos en todos los locales con un clic." },
  { icon: BarChart3, title: "Analítica comparativa", desc: "Rankings de ventas, márgenes y rotación entre restaurantes. Detecta best practices y réplicalas." },
  { icon: DollarSign, title: "Control de precios", desc: "Multiplicadores por local, alertas de desviación y sugerencias de optimización automáticas." },
  { icon: Warehouse, title: "Optimización de bodega", desc: "Stock centralizado o descentralizado. Alertas de reposición y análisis de rotación por local." },
];

const useCases = [
  {
    size: "3 restaurantes",
    icon: Store,
    scenario: "Un grupo con un gastronómico, un casual y un wine bar.",
    how: "Cada local tiene su carta adaptada pero gestionada desde un mismo panel. Los precios se ajustan según el posicionamiento de cada restaurante.",
    result: "Consistencia de marca sin perder la personalidad de cada local.",
  },
  {
    size: "10 restaurantes",
    icon: Building2,
    scenario: "Cadena de restauración con locales en varias ciudades.",
    how: "Cartas base compartidas con variaciones locales. Analítica centralizada para identificar los vinos más rentables y replicar el éxito.",
    result: "Reducción del 40% en tiempo de gestión de cartas. +18% en ventas de vino.",
  },
  {
    size: "50+ restaurantes",
    icon: Globe,
    scenario: "Gran grupo de restauración con múltiples marcas y conceptos.",
    how: "API integrada con ERP y POS. Gestión por clusters de locales. Reporting automatizado para dirección. Account manager dedicado.",
    result: "Control total sobre la estrategia de vino en toda la organización.",
  },
];

const results = [
  { value: "Control total", desc: "Sobre la oferta de vino en todos los locales", icon: Layers },
  { value: "+22%", desc: "Mejora media de márgenes en vino", icon: TrendingUp },
  { value: "+18%", desc: "Aumento medio de ventas de vino", icon: BarChart3 },
  { value: "100%", desc: "Cartas estandarizadas y siempre actualizadas", icon: CheckCircle },
];

const GruposRestauracion = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "grupos-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Winerim para Grupos de Restauración",
      description: "Gestión centralizada del vino para grupos de restauración. Controla cartas, precios, analítica y ventas en todos tus restaurantes.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Soluciones", item: "https://winerim.wine/soluciones" },
          { "@type": "ListItem", position: 3, name: "Grupos de restauración", item: "https://winerim.wine/soluciones/grupos-restauracion" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("grupos-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Winerim para Grupos de Restauración | Gestión Centralizada del Vino"
        description="Centraliza la gestión de cartas de vino, optimiza precios y aumenta ventas en todos tus restaurantes. Solución para grupos de restauración."
        url="https://winerim.wine/soluciones/grupos-restauracion"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Soluciones" }, { label: "Grupos de restauración" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Building2 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Grupos de restauración</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Gestión inteligente del vino para{" "}<span className="text-gradient-wine italic">grupos de restauración</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Centraliza la gestión de tus cartas de vino, optimiza precios y aumenta las ventas en todos tus restaurantes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/solicitar-demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              Solicitar demo <ArrowRight size={16} />
            </Link>
            <Link to="/contacto" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              Hablar con un especialista
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEMAS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El problema</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Los retos de gestionar el vino en{" "}<span className="text-gradient-wine italic">múltiples locales</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <AlertTriangle size={16} className="text-destructive" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CÓMO AYUDA WINERIM */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La solución</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Cómo Winerim ayuda a los{" "}<span className="text-gradient-wine italic">grupos</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
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

      {/* 4. FUNCIONALIDADES CLAVE */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Funcionalidades</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Diseñado para{" "}<span className="text-gradient-wine italic">escalar</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{feat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. RESULTADOS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Impacto</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Resultados para{" "}<span className="text-gradient-wine italic">grupos</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {results.map((r, i) => {
              const Icon = r.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <p className="font-heading text-2xl font-bold text-wine mb-1">{r.value}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CASOS DE USO */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Escalabilidad</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Winerim crece <span className="text-gradient-wine italic">contigo</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading font-bold">{uc.size}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="bg-wine/5 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-wine mb-1">Cómo funciona</p>
                      <p className="text-xs text-muted-foreground">{uc.how}</p>
                    </div>
                    <div className="mt-auto flex items-start gap-2">
                      <Sparkles size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="section-padding bg-gradient-dark">
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Para grupos</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Optimiza la gestión del vino en{" "}<span className="text-gradient-wine italic">todos tus restaurantes</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Te mostramos cómo Winerim se adapta a la estructura de tu grupo. Demo personalizada con tu equipo.
              </p>
              <Link to="/solicitar-demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GruposRestauracion;
