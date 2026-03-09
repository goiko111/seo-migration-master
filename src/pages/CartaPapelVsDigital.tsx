import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, RefreshCw, Users, Brain, BarChart3,
  TrendingUp, X, Check, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

interface ComparisonRow {
  category: string;
  icon: typeof RefreshCw;
  paper: string;
  digital: string;
  winerim: string;
}

const comparisons: ComparisonRow[] = [
  {
    category: "Actualización",
    icon: RefreshCw,
    paper: "Reimprimir cada vez que cambia un vino, un precio o una añada. Coste y tiempo perdido.",
    digital: "Cambios al instante desde cualquier dispositivo. Sin impresión, sin esperas.",
    winerim: "Edición en tiempo real con control de stock integrado. Cuando un vino se agota, desaparece automáticamente de la carta.",
  },
  {
    category: "Experiencia del cliente",
    icon: Users,
    paper: "Carta estática, sin contexto. El cliente no sabe qué elegir y depende del camarero.",
    digital: "Notas de cata, maridajes sugeridos y filtros por estilo. El cliente explora con confianza.",
    winerim: "Fichas enriquecidas con aromas, temperatura de servicio y maridajes adaptados al menú del restaurante.",
  },
  {
    category: "Recomendación",
    icon: Brain,
    paper: "Depende exclusivamente del conocimiento del equipo de sala. Inconsistente entre turnos.",
    digital: "Sugerencias automáticas basadas en el plato elegido o las preferencias del cliente.",
    winerim: "Motor de recomendación inteligente que cruza carta de comida, stock disponible y perfil de cliente.",
  },
  {
    category: "Analítica",
    icon: BarChart3,
    paper: "Cero datos. No sabes qué vinos miran, cuáles ignoran ni qué influye en la decisión.",
    digital: "Métricas de visualización, clics y conversiones por referencia.",
    winerim: "Dashboard con rotación de bodega, márgenes por vino, tendencias de venta y alertas de stock bajo.",
  },
  {
    category: "Venta de vino",
    icon: TrendingUp,
    paper: "El cliente elige por precio o familiaridad. Ticket medio bajo, bodega infrautilizada.",
    digital: "Venta guiada que eleva el ticket medio un 15-25 % de media.",
    winerim: "Estrategias de up-selling integradas: destacados del sommelier, vino por copa y escalera de precios optimizada.",
  },
];

const CartaPapelVsDigital = () => {
  useEffect(() => {
    const jsonLd = document.createElement("script");
    jsonLd.id = "papel-vs-digital-jsonld";
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Carta de vinos en papel vs carta digital: comparativa completa",
      description: "Descubre por qué las cartas de vinos digitales superan a las cartas en papel en actualización, experiencia, recomendación, analítica y ventas.",
      author: { "@type": "Organization", name: "Winerim" },
    });
    document.head.appendChild(jsonLd);
    return () => { document.getElementById("papel-vs-digital-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Carta de Vinos en Papel vs Carta Digital | Comparativa | Winerim"
        description="Comparativa entre carta de vinos en papel y carta digital. Descubre cómo una carta digital mejora la actualización, experiencia del cliente, recomendación, analítica y ventas de vino."
        url="https://winerim.wine/carta-papel-vs-digital"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Comparativa</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Carta de vinos en papel vs carta{" "}<span className="text-gradient-wine italic">digital</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            La carta en papel fue el estándar durante décadas. Hoy, los restaurantes que más vino venden ya han dado el salto. Descubre por qué.
          </motion.p>
        </div>
      </section>

      {/* COMPARISON TABLE – desktop */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto hidden lg:block">
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {/* Header */}
              <div className="bg-background p-6" />
              <div className="bg-background p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <X size={16} className="text-destructive" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider">Carta en papel</h3>
                </div>
              </div>
              <div className="bg-background p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Check size={16} className="text-emerald-500" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider">Carta digital</h3>
                </div>
              </div>
              <div className="bg-wine/5 p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap size={16} className="text-wine" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-wine">Winerim</h3>
                </div>
              </div>

              {comparisons.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="contents">
                    <div className="bg-background p-6 flex items-start gap-3 border-t border-border">
                      <Icon size={18} className="text-wine shrink-0 mt-0.5" />
                      <span className="font-heading font-semibold text-sm">{row.category}</span>
                    </div>
                    <div className="bg-background p-6 text-sm text-muted-foreground border-t border-border">{row.paper}</div>
                    <div className="bg-background p-6 text-sm text-muted-foreground border-t border-border">{row.digital}</div>
                    <div className="bg-wine/5 p-6 text-sm font-medium border-t border-border">{row.winerim}</div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* COMPARISON CARDS – mobile */}
        <div className="max-w-2xl mx-auto lg:hidden space-y-8">
          {comparisons.map((row, i) => {
            const Icon = row.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className="text-wine" />
                    <h3 className="font-heading font-semibold">{row.category}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-destructive shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-muted-foreground">Papel:</span> {row.paper}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-muted-foreground">Digital:</span> {row.digital}</div>
                    </div>
                    <div className="flex items-start gap-2 bg-wine/5 -mx-2 px-2 py-2 rounded-lg">
                      <Zap size={14} className="text-wine shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-wine">Winerim:</span> {row.winerim}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Da el salto</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Pasa de papel a <span className="text-gradient-wine italic">resultados</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Descubre cómo Winerim transforma la carta de vinos de tu restaurante en una herramienta de venta inteligente.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                Solicitar demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartaPapelVsDigital;
