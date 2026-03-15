import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const layers = [
  {
    name: "Winerim Core",
    verb: "Analiza",
    description: "Margen, rotación, rentabilidad y rendimiento de cada referencia.",
    icon: BarChart3,
    href: "/producto/winerim-core",
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    name: "Inteligencia Dinámica",
    verb: "Actúa",
    description: "Prioriza, reordena y activa estrategias según contexto y objetivos.",
    icon: Zap,
    href: "/producto/inteligencia-dinamica",
    accent: "text-wine",
    bg: "bg-wine/10",
    border: "border-wine/20",
  },
  {
    name: "Winerim Supply",
    verb: "Compra mejor",
    description: "Detecta sobrecostes, capital inmovilizado y oportunidades de compra.",
    icon: ShoppingCart,
    href: "/producto/winerim-supply",
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const ProductArchitectureSection = () => (
  <section className="section-padding relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-wine/4 rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-4">
            <span className="w-1 h-1 rounded-full bg-wine/50" />
            Arquitectura de producto
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            Tres capas. Un mismo objetivo:{" "}
            <span className="text-gradient-wine">gestionar mejor todo el negocio del vino.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Winerim combina una capa analítica profunda, una capa de acción dinámica y una nueva capa de inteligencia de compras.
          </p>
        </div>
      </ScrollReveal>

      {/* 3 capsules */}
      <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-10">
        {layers.map((layer, i) => (
          <ScrollReveal key={layer.name} delay={i * 0.08}>
            <Link
              to={layer.href}
              className={`group relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border ${layer.border} bg-card/70 backdrop-blur-sm hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
            >
              <div className={`w-10 h-10 rounded-lg ${layer.bg} flex items-center justify-center mb-4`}>
                <layer.icon size={18} className={layer.accent} />
              </div>
              <h3 className="font-heading text-sm font-bold tracking-wide uppercase text-foreground mb-1">
                {layer.name}
              </h3>
              <span className={`text-xs font-semibold tracking-widest uppercase ${layer.accent} mb-2`}>
                {layer.verb}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {layer.description}
              </p>
              <ArrowRight size={14} className="mt-3 text-muted-foreground group-hover:text-wine transition-colors" />
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom phrase */}
      <ScrollReveal delay={0.3}>
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-emerald-500"
          >
            Comprar mejor
          </motion.span>
          <span className="text-border">→</span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="text-amber-500"
          >
            Analizar mejor
          </motion.span>
          <span className="text-border">→</span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="text-wine"
          >
            Vender mejor
          </motion.span>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProductArchitectureSection;
