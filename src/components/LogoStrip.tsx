import { motion } from "framer-motion";

const restaurants = [
  "Miramar", "Zortziko", "Tres", "Santé", "Sacla", "La Parra",
  "Ment", "La Carbonería", "Cocina del Sol", "Cañabota", "Alejandra",
  "Bidea", "Tribeca", "Taverna", "Serrano", "Roig Robí",
  "Ríos do Freixo", "Remigio", "La Fábrica", "Jauregibarria",
  "El Motel", "Dámaso", "Casamar", "Bocaatti",
];

const LogoStrip = () => {
  return (
    <section className="section-padding overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-3">
          La revolución de la hostelería
        </p>
        <h2 className="font-heading text-2xl md:text-3xl">
          Winerim, en los mejores restaurantes
        </h2>
      </motion.div>

      {/* Scrolling logos placeholder */}
      <div className="relative">
        <div className="flex animate-scroll-left gap-12 items-center">
          {[...restaurants, ...restaurants].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded border border-border bg-card text-muted-foreground text-sm font-medium tracking-wider whitespace-nowrap"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Más de 1.000 bodegas de restaurantes ya confían en nosotros
      </p>
    </section>
  );
};

export default LogoStrip;
