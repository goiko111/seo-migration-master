import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = ["Más margen", "Más rotación", "Más control en horas punta", "Más coherencia comercial"];

const DynamicIntelligenceTeaser = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-wine/6 rounded-full blur-[130px]" />
    </div>

    <div className="relative max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="relative rounded-2xl border border-wine/15 bg-card/80 backdrop-blur-sm p-8 sm:p-10 md:p-14 overflow-hidden">
          {/* Top glow accent */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />

          <div className="relative text-center">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-wine/80 mb-5">
              Nuevo · IA táctica para cartas de vino
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              La carta que se adapta{" "}
              <span className="text-gradient-wine">para vender mejor</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Winerim evoluciona hacia una capa de inteligencia dinámica que prioriza vinos, reordena recomendaciones y activa estrategias según margen, stock, contexto y objetivos del restaurante.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {benefits.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="text-xs font-medium tracking-wide text-wine/70 border border-wine/12 bg-wine/5 rounded-full px-4 py-1.5"
                >
                  {b}
                </motion.span>
              ))}
            </div>

            <Link
              to="/producto/inteligencia-dinamica"
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
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
