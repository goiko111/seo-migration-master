import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSharedPageContent } from "@/contexts/PageContentContext";

const defaultRestaurants = [
  "Miramar", "Zortziko", "Tres", "Santé", "Sacla", "La Parra",
  "Ment", "La Carbonería", "Cocina del Sol", "Cañabota", "Alejandra",
  "Bidea", "Tribeca", "Taverna", "Serrano", "Roig Robí",
  "Ríos do Freixo", "Remigio", "La Fábrica", "Jauregibarria",
  "El Motel", "Dámaso", "Casamar", "Bocaatti",
];

const LogoStrip = () => {
  const { get, getJson } = useSharedPageContent();
  const restaurants = getJson<string[]>("logostrip", "restaurants", defaultRestaurants);

  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12 px-6"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-3">
          {get("logostrip", "label", "La revolución de la hostelería")}
        </p>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl">
          {get("logostrip", "title", "Winerim, en los mejores restaurantes")}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-4 sm:gap-6 md:gap-8 items-center">
          {[...restaurants, ...restaurants].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded border border-border bg-card text-muted-foreground text-xs sm:text-sm font-medium tracking-wider whitespace-nowrap hover:border-wine/30 hover:text-foreground transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 sm:mt-8 px-6">
        <p className="text-muted-foreground text-xs sm:text-sm mb-3">
          {get("logostrip", "footer", "Más de 1.000 bodegas de restaurantes ya confían en nosotros")}
        </p>
        <Link to="/clientes" className="text-xs font-semibold tracking-widest uppercase text-accent hover:text-accent/80 transition-colors">
          Ver todos los clientes →
        </Link>
      </div>
    </section>
  );
};

export default LogoStrip;
