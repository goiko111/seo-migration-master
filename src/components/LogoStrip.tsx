import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSharedPageContent } from "@/contexts/PageContentContext";

import logoMiramar from "@/assets/logos/miramar.png";
import logoZortziko from "@/assets/logos/zortziko.png";
import logoTres from "@/assets/logos/tres.png";
import logoSante from "@/assets/logos/sante.png";
import logoSacla from "@/assets/logos/sacla.png";
import logoLaParra from "@/assets/logos/laparra.png";
import logoLaCarboneria from "@/assets/logos/lacarboneria.png";
import logoCocinaDelSol from "@/assets/logos/cocinadelsol.png";
import logoCanabota from "@/assets/logos/canabota.png";
import logoAlejandra from "@/assets/logos/alejandra.png";
import logoMent from "@/assets/logos/ment.png";
import logoBidea from "@/assets/logos/bidea.png";
import logoTribeca from "@/assets/logos/tribeca.png";
import logoTaverna from "@/assets/logos/taverna.png";
import logoSerrano from "@/assets/logos/serrano.png";
import logoRoig from "@/assets/logos/roig.png";
import logoRiosFreixo from "@/assets/logos/riosfreixo.png";
import logoRemigio from "@/assets/logos/remigio.png";
import logoLaFabrica from "@/assets/logos/lafabrica.png";
import logoJauregibarria from "@/assets/logos/jauregibarria.png";
import logoElMotel from "@/assets/logos/elmotel.png";
import logoDamaso from "@/assets/logos/damaso.png";
import logoCasamar from "@/assets/logos/casamar.png";
import logoBocaatti from "@/assets/logos/bocaatti.png";

interface LogoItem {
  name: string;
  logo: string;
}

const michelinLogos: LogoItem[] = [
  { name: "Miramar", logo: logoMiramar },
  { name: "Zortziko", logo: logoZortziko },
  { name: "Tres", logo: logoTres },
  { name: "Santé", logo: logoSante },
  { name: "Sa Clastra", logo: logoSacla },
  { name: "La Parra", logo: logoLaParra },
  { name: "La Carbonería", logo: logoLaCarboneria },
  { name: "Cocina del Sol", logo: logoCocinaDelSol },
  { name: "Cañabota", logo: logoCanabota },
  { name: "Alejandra", logo: logoAlejandra },
  { name: "Ment", logo: logoMent },
];

const repsolLogos: LogoItem[] = [
  { name: "Bidea", logo: logoBidea },
  { name: "Tribeca", logo: logoTribeca },
  { name: "Taverna", logo: logoTaverna },
  { name: "Serrano", logo: logoSerrano },
  { name: "Roig Robí", logo: logoRoig },
  { name: "Ríos do Freixo", logo: logoRiosFreixo },
  { name: "Remigio", logo: logoRemigio },
  { name: "La Fábrica", logo: logoLaFabrica },
  { name: "Jauregibarria", logo: logoJauregibarria },
  { name: "El Motel", logo: logoElMotel },
  { name: "Dámaso", logo: logoDamaso },
  { name: "Casamar", logo: logoCasamar },
  { name: "Bocaatti", logo: logoBocaatti },
];

const hotelGroups = ["Meliá Hotels", "Hyatt", "Marriott"];

const LogoStrip = () => {
  const { get } = useSharedPageContent();

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
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-8 sm:gap-12 items-center">
          {[...michelinLogos, ...michelinLogos].map((item, i) => (
            <div
              key={`${item.name}-michelin-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-20 sm:h-28 md:h-32 px-6 sm:px-10"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-100 contrast-125 brightness-125 saturate-125"
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-accent/80 font-semibold">Estrellas Michelin</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-accent/80 font-semibold">Soles Repsol</p>
      </motion.div>

      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-8 sm:gap-10 items-center" style={{ animationDuration: "20s" }}>
          {[...repsolLogos, ...repsolLogos].map((item, i) => (
            <div
              key={`${item.name}-repsol-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center min-w-40 sm:min-w-48 px-3"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-100 contrast-125 brightness-125 saturate-125"
              />
              <p className="mt-2 text-xs sm:text-sm font-medium text-foreground/85 tracking-wide">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-6 sm:gap-10 mt-8 sm:mt-10 px-6"
      >
        <span className="text-xs text-muted-foreground/60 tracking-widest uppercase whitespace-nowrap">Grupos hoteleros</span>
        <div className="h-px w-8 bg-border/50" />
        {hotelGroups.map((hotel) => (
          <span
            key={hotel}
            className="text-base sm:text-lg md:text-xl font-heading font-semibold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors duration-300 whitespace-nowrap"
          >
            {hotel}
          </span>
        ))}
      </motion.div>

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
