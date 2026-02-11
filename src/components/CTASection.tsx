import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-card rounded-3xl border border-border p-12 md:p-16 glow-wine"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
            Únete a Winerim
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Sube tu carta de vinos y la analizamos sin compromiso
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Te diremos cómo Winerim puede ayudarte a optimizar y equilibrar tu
            carta. Más de 1.000 bodegas de restaurantes ya confían en nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Analiza tu carta de vinos
            </a>
            <a
              href="/contacto"
              className="px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors"
            >
              Contactar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
