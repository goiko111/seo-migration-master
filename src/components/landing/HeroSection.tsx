import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Play } from "lucide-react";
import mockupImg from "@/assets/winerim-mockup.png";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-wine animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">IA para restaurantes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-8"
            >
              La inteligencia artificial que{" "}
              <span className="text-gradient-wine italic">vende más vino</span>{" "}
              en tu restaurante
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Winerim convierte tu carta de vinos en un vendedor inteligente que recomienda, educa y aumenta tu ticket medio automáticamente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/demo"
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                Solicitar análisis gratuito de mi carta
              </Link>
              <a
                href="https://youtu.be/-PleM286zeY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                <Play size={16} className="text-wine" />
                Ver cómo funciona
              </a>
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ y: mockupY }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
              <img
                src={mockupImg}
                alt="Winerim carta de vinos digital en tablet y móvil"
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
