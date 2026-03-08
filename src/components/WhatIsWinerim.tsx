import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useSharedPageContent } from "@/contexts/PageContentContext";

const AnimatedNumber = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = target.replace(/[^0-9]/g, "");
    const num = parseInt(numericPart, 10);
    if (isNaN(num)) { setDisplay(target); return; }

    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const increment = num / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        clearInterval(timer);
        setDisplay(target);
      } else {
        setDisplay(Math.floor(current).toString() + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, suffix]);

  return <span ref={ref}>{display}</span>;
};

const WhatIsWinerim = () => {
  const { get } = useSharedPageContent();

  const stats = [
    { num: get("stats", "stat1_num", "1000+"), label: get("stats", "stat1_label", "Bodegas") },
    { num: get("stats", "stat2_num", "30+"), label: get("stats", "stat2_label", "Regiones") },
    { num: get("stats", "stat3_num", "48+"), label: get("stats", "stat3_label", "Bodegas asociadas") },
    { num: get("stats", "stat4_num", "4"), label: get("stats", "stat4_label", "Países") },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            <Link
              to="/demo"
              className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity hover:shadow-lg hover:shadow-wine/20"
            >
              {get("what", "cta", "Solicita una demo")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-card rounded-2xl border border-border p-6 sm:p-8 glow-wine hover:border-wine/30 transition-all duration-500">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center p-3 sm:p-4 rounded-xl hover:bg-wine/5 transition-colors"
                  >
                    <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-wine mb-2">
                      <AnimatedNumber target={stat.num} suffix={stat.num.includes("+") ? "+" : ""} />
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
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
