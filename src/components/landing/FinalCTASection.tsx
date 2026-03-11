import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const FinalCTASection = () => {
  const { t, localePath } = useLanguage();

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden glow-wine hover:border-wine/30 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />

          <div className="relative z-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
              {t.cta_title_1}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.cta_title_1}{" "}
              <span className="text-gradient-wine italic">{t.cta_title_highlight}</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
              {t.cta_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                {t.cta_button}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={localePath("/analisis-carta")}
                className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all hover:-translate-y-0.5"
              >
                {t.hero_cta_primary.length > 40 ? "Analiza tu carta" : t.hero_cta_primary}
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-6 max-w-md mx-auto">
              Sin compromiso. Te mostramos Winerim en 15 minutos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
