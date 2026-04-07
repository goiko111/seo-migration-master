import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, RefreshCw, Gauge, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const data: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  benefits: string[];
  cta: string;
}> = {
  es: {
    badge: "Inteligencia dinámica",
    title: "La carta que se adapta ",
    titleHighlight: "para vender mejor",
    subtitle: "Winerim evoluciona hacia una capa de inteligencia dinámica que prioriza vinos, reordena recomendaciones y activa estrategias según margen, stock, contexto y objetivos del restaurante.",
    benefits: ["Más margen", "Más rotación", "Más control en horas punta", "Más coherencia comercial"],
    cta: "Descubrir Inteligencia dinámica",
  },
  en: {
    badge: "Dynamic intelligence",
    title: "The wine list that adapts ",
    titleHighlight: "to sell better",
    subtitle: "Winerim evolves into a dynamic intelligence layer that prioritises wines, reorders recommendations and activates strategies based on margin, stock, context and restaurant goals.",
    benefits: ["Higher margins", "Better rotation", "More control at peak hours", "Greater commercial consistency"],
    cta: "Discover Dynamic Intelligence",
  },
  it: {
    badge: "Intelligenza dinamica",
    title: "La carta che si adatta ",
    titleHighlight: "per vendere meglio",
    subtitle: "Winerim evolve in un livello di intelligenza dinamica che prioritizza i vini, riordina le raccomandazioni e attiva strategie in base a margine, stock, contesto e obiettivi del ristorante.",
    benefits: ["Più margine", "Più rotazione", "Più controllo nelle ore di punta", "Più coerenza commerciale"],
    cta: "Scopri l'Intelligenza Dinamica",
  },
  fr: {
    badge: "Intelligence dynamique",
    title: "La carte qui s'adapte ",
    titleHighlight: "pour mieux vendre",
    subtitle: "Winerim évolue vers une couche d'intelligence dynamique qui priorise les vins, réordonne les recommandations et active des stratégies selon la marge, le stock, le contexte et les objectifs du restaurant.",
    benefits: ["Plus de marge", "Plus de rotation", "Plus de contrôle aux heures de pointe", "Plus de cohérence commerciale"],
    cta: "Découvrir l'Intelligence Dynamique",
  },
};

const icons = [TrendingUp, RefreshCw, Gauge, BarChart3];

const DynamicIntelligenceTeaser = () => {
  const { lang } = useLanguage();
  const d = data[lang] || data.es;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-wine/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="group relative rounded-2xl border border-wine/10 bg-card/70 backdrop-blur-sm p-8 sm:p-10 md:p-14 overflow-hidden hover:border-wine/20 transition-all duration-700">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-wine/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

            <div className="relative text-center">
              <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-5">
                <span className="w-1 h-1 rounded-full bg-wine/50" />
                {d.badge}
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {d.title}
                <span className="text-gradient-wine">{d.titleHighlight}</span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                {d.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-9">
                {d.benefits.map((label, i) => {
                  const Icon = icons[i];
                  return (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-foreground/60 border border-border/60 bg-card/50 rounded-full px-4 py-1.5"
                    >
                      <Icon size={12} className="text-wine/50" />
                      {label}
                    </motion.span>
                  );
                })}
              </div>

              <Link
                to="/producto/inteligencia-dinamica"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-wine/15 hover:-translate-y-0.5"
              >
                {d.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DynamicIntelligenceTeaser;
