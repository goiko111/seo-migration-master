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

interface LogoItem {
  name: string;
  logo?: string;
}

const logoItems: LogoItem[] = [
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
  { name: "Meliá Hotels" },
  { name: "Hyatt" },
  { name: "Marriott" },
];

const LogoStrip = () => {
  const { get } = useSharedPageContent();
  const doubled = [...logoItems, ...logoItems];

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

        <div className="flex animate-scroll-left gap-6 sm:gap-10 items-center">
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-16 sm:h-20 px-6 sm:px-8 rounded-lg border border-border/50 bg-card/50 hover:border-wine/30 transition-all duration-300"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-10 sm:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <span className="text-muted-foreground text-sm sm:text-base font-heading font-semibold tracking-wider whitespace-nowrap hover:text-foreground transition-colors duration-300">
                  {item.name}
                </span>
              )}
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
