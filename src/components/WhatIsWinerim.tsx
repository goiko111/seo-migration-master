import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

const WhatIsWinerim = () => {
  const { get } = usePageContent("home");

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
              {get("what", "tagline", "Nuestra solución")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {get("what", "title", "¿Qué es Winerim?")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {get("what", "description1", "Winerim es más que una carta digital de vinos. Es un recomendador que permite a los comensales seleccionar el vino con el que van a acompañar su experiencia gastronómica. Es la unión perfecta entre cliente y bodega.")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {get("what", "description2", "Facilita la gestión total de la bodega del restaurante, así como el consumo de vinos de precio más elevado, lo que reporta numerosas ventajas económicas para el negocio.")}
            </p>
            <a
              href="/demo"
              className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              {get("what", "cta", "Solicita una demo")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-card rounded-2xl border border-border p-8 glow-wine">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: get("stats", "stat1_num", "1000+"), label: get("stats", "stat1_label", "Bodegas") },
                  { num: get("stats", "stat2_num", "30+"), label: get("stats", "stat2_label", "Regiones") },
                  { num: get("stats", "stat3_num", "48+"), label: get("stats", "stat3_label", "Bodegas asociadas") },
                  { num: get("stats", "stat4_num", "4"), label: get("stats", "stat4_label", "Países") },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-wine mb-2">
                      {stat.num}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsWinerim;
