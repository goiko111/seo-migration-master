import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { usePageContent } from "@/hooks/usePageContent";

const Hero = () => {
  const { get } = usePageContent("home");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Bodega de vinos"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6"
          >
            {get("hero", "tagline", "Carta de vinos digital")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            {get("hero", "title", "Una nueva forma de")}{" "}
            <span className="text-gradient-wine italic">
              {get("hero", "highlight1", "sentir")}
            </span>{" "}
            {get("hero", "connector", "y")}{" "}
            <span className="text-gradient-wine italic">
              {get("hero", "highlight2", "vivir")}
            </span>{" "}
            {get("hero", "title_end", "el vino")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg"
          >
            {get("hero", "subtitle", "El recomendador inteligente que transforma la experiencia gastronómica de tu restaurante y potencia las ventas de tu bodega.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/demo"
              className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity text-center"
            >
              {get("hero", "cta_primary", "Descubre Winerim")}
            </a>
            <a
              href={get("hero", "video_url", "https://youtu.be/-PleM286zeY")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors"
            >
              <Play size={16} className="text-wine" />
              {get("hero", "cta_secondary", "Winerim en 1 minuto")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
