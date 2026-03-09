import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />

          <div className="relative z-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
              Empieza hoy
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Descubre cuánto más podrías{" "}
              <span className="text-gradient-wine italic">vender</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
              Envíanos tu carta de vinos y te mostramos cómo Winerim puede transformar tus ventas. Sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                Envíanos tu carta de vinos
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contacto"
                className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
              >
                Contactar
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
