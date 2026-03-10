import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, RefreshCw, Gauge, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  { icon: TrendingUp, label: "Más margen" },
  { icon: RefreshCw, label: "Más rotación" },
  { icon: Gauge, label: "Más control en horas punta" },
  { icon: BarChart3, label: "Más coherencia comercial" },
];

const DynamicIntelligenceTeaser = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-wine/5 rounded-full blur-[140px]" />
    </div>

    <div className="relative max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="group relative rounded-2xl border border-wine/10 bg-card/70 backdrop-blur-sm p-8 sm:p-10 md:p-14 overflow-hidden hover:border-wine/20 transition-all duration-700">
          {/* Top glow accent */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/30 to-transparent" />
          {/* Hover ambient */}
          <div className="absolute inset-0 bg-gradient-to-br from-wine/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-5">
              <span className="w-1 h-1 rounded-full bg-wine/50" />
              Inteligencia dinámica
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              La carta que se adapta{" "}
              <span className="text-gradient-wine">para vender mejor</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Winerim evoluciona hacia una capa de inteligencia dinámica que prioriza vinos, reordena recomendaciones y activa estrategias según margen, stock, contexto y objetivos del restaurante.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-9">
              {benefits.map((b, i) => (
                <motion.span
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-foreground/60 border border-border/60 bg-card/50 rounded-full px-4 py-1.5"
                >
                  <b.icon size={12} className="text-wine/50" />
                  {b.label}
                </motion.span>
              ))}
            </div>

            <Link
              to="/producto/inteligencia-dinamica"
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-wine/15 hover:-translate-y-0.5"
            >
              Descubrir Inteligencia dinámica
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default DynamicIntelligenceTeaser;
