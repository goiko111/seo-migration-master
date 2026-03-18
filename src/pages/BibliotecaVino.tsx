import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wine, MapPin, Palette, Utensils, ArrowRight, Grape } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

const BibliotecaVino = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Biblioteca del Vino | Guía Completa para Hostelería"
        description="Guía completa sobre uvas, regiones vinícolas, estilos de vino y maridajes. Conocimiento esencial para restaurantes que quieren vender más y mejor vino."
        url="https://winerim.wine/biblioteca-vino"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Conocimiento</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl"
          >
            Biblioteca del <span className="text-gradient-wine italic">vino</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Todo lo que necesitas saber sobre uvas, regiones, estilos y maridajes para ofrecer una experiencia de vino excepcional en tu restaurante.
          </motion.p>
        </div>
      </section>

      {/* HUB CARDS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto space-y-6">
          <ScrollReveal>
            <Link
              to="/biblioteca-vino/regiones"
              className="group block bg-gradient-card rounded-xl border border-border p-8 hover:border-wine/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-wine" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-wine transition-colors">
                    Regiones vinícolas del mundo
                  </h2>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Explora más de 3.700 denominaciones de 41 países. Con criterio Winerim: consulta, interpretación y aplicación comercial.
              </p>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              to="/biblioteca-vino/uvas"
              className="group block bg-gradient-card rounded-xl border border-border p-8 hover:border-wine/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Grape size={20} className="text-wine" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-wine transition-colors">
                    Variedades de uva
                  </h2>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-muted-foreground max-w-2xl">
                87 variedades de 30 países. Perfil sensorial, rol en carta y criterio comercial para hostelería.
              </p>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              to="/biblioteca-vino/estilos"
              className="group block bg-gradient-card rounded-xl border border-border p-8 hover:border-wine/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Palette size={20} className="text-wine" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-wine transition-colors">
                    Estilos de vino
                  </h2>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-muted-foreground max-w-2xl">
                8 grandes familias, más de 50 subtipos. Elaboración, servicio, maridajes y criterio comercial para cada estilo.
              </p>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              to="/biblioteca-vino/maridajes"
              className="group block bg-gradient-card rounded-xl border border-border p-8 hover:border-wine/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Utensils size={20} className="text-wine" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-wine transition-colors">
                    Maridajes
                  </h2>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-muted-foreground max-w-2xl">
                10 categorías gastronómicas, 80+ combinaciones plato + vino. Principios, errores y lectura comercial para hostelería.
              </p>
            </Link>
          </ScrollReveal>
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
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                ¿Quieres que tu carta refleje este{" "}
                <span className="text-gradient-wine italic">conocimiento</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Winerim lleva toda esta información directamente a tu carta digital, ayudando a tus clientes a descubrir y elegir mejor.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
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

export default BibliotecaVino;
