import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSharedPageContent } from "@/contexts/PageContentContext";

const CTASection = () => {
  const { get } = useSharedPageContent();

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 glow-wine hover:border-wine/30 transition-all duration-500"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
            {get("cta", "tagline", "Únete a Winerim")}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {get("cta", "title", "Sube tu carta de vinos y la analizamos sin compromiso")}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
            {get("cta", "description", "Te diremos cómo Winerim puede ayudarte a optimizar y equilibrar tu carta. Más de 1.000 bodegas de restaurantes ya confían en nosotros.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
            >
              {get("cta", "cta_primary", "Analiza tu carta de vinos")}
            </Link>
            <Link
              to="/contacto"
              className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
            >
              {get("cta", "cta_secondary", "Contactar")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
