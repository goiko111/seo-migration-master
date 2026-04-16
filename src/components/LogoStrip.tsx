import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSharedPageContent } from "@/contexts/PageContentContext";
import { useLanguage } from "@/i18n/LanguageContext";

import logoMiramar from "@/assets/logos/miramar.webp";
import logoZortziko from "@/assets/logos/zortziko.webp";
import logoTres from "@/assets/logos/tres.webp";
import logoSante from "@/assets/logos/sante.webp";
import logoSacla from "@/assets/logos/sacla.webp";
import logoLaParra from "@/assets/logos/laparra.webp";
import logoLaCarboneria from "@/assets/logos/lacarboneria.webp";
import logoCocinaDelSol from "@/assets/logos/cocinadelsol.webp";
import logoCanabota from "@/assets/logos/canabota.webp";
import logoAlejandra from "@/assets/logos/alejandra.webp";
import logoMent from "@/assets/logos/ment.webp";
import logoBidea from "@/assets/logos/bidea.webp";
import logoTribeca from "@/assets/logos/tribeca.webp";
import logoTaverna from "@/assets/logos/taverna.webp";
import logoSerrano from "@/assets/logos/serrano.webp";
import logoRoig from "@/assets/logos/roig.webp";
import logoRiosFreixo from "@/assets/logos/riosfreixo.webp";
import logoRemigio from "@/assets/logos/remigio.webp";
import logoLaFabrica from "@/assets/logos/lafabrica.webp";
import logoJauregibarria from "@/assets/logos/jauregibarria.webp";
import logoElMotel from "@/assets/logos/elmotel.webp";
import logoDamaso from "@/assets/logos/damaso.webp";
import logoCasamar from "@/assets/logos/casamar.webp";
import logoBocaatti from "@/assets/logos/bocaatti.webp";
import logoMelia from "@/assets/logos/melia.webp";
import logoHyatt from "@/assets/logos/hyatt.webp";
import logoMarriott from "@/assets/logos/marriott.webp";
import logoWyndham from "@/assets/logos/wyndham.webp";
import logoMyr from "@/assets/logos/myr.webp";
import logoFourSeasons from "@/assets/logos/fourseasons.webp";
import logoPalladium from "@/assets/logos/palladium.webp";
import logoEm from "@/assets/logos/em.webp";

interface LogoItem {
  name: string;
  logo: string;
  isWhite?: boolean;
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

const hotelLogos: LogoItem[] = [
  { name: "Hyatt", logo: logoHyatt },
  { name: "Marriott", logo: logoMarriott },
  { name: "Wyndham Hotel Group", logo: logoWyndham },
  { name: "Meliá Hotels International", logo: logoMelia },
  { name: "MYR Hotels", logo: logoMyr },
  { name: "Four Seasons", logo: logoFourSeasons },
  { name: "Palladium Hotel Group", logo: logoPalladium },
  { name: "EM Hotels", logo: logoEm, isWhite: true },
];


const LogoStrip = () => {
  const { get } = useSharedPageContent();
  const { t, localePath } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12 px-6"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-3">
          {get("logostrip", "label", t.logostrip_label)}
        </p>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl">
          {get("logostrip", "title", t.logostrip_title)}
        </h2>
      </motion.div>

      <p className="text-xs tracking-[0.25em] uppercase text-accent/80 font-semibold text-center mb-4">{t.logostrip_michelin}</p>

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
                loading="lazy"
                decoding="async"
                width={120}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs tracking-[0.25em] uppercase text-accent/80 font-semibold text-center mt-10 mb-4">{t.logostrip_repsol}</p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-8 sm:gap-10 items-center" style={{ animationDuration: "20s" }}>
          {[...repsolLogos, ...repsolLogos].map((item, i) => (
            <div
              key={`${item.name}-repsol-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-20 sm:h-28 md:h-32 px-6 sm:px-10"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-100 contrast-125 brightness-125 saturate-125"
                loading="lazy"
                decoding="async"
                width={120}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 sm:mt-10 px-6"
      >
        <span className="block text-xs tracking-[0.25em] uppercase text-accent/80 font-semibold text-center mb-8">{t.logostrip_hotels}</span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-16">
          {hotelLogos.map((item) => (
            <div key={item.name} className="flex items-center justify-center h-12 sm:h-16 md:h-20 px-1">
              <img
                src={item.logo}
                alt={item.name}
                className={`h-8 sm:h-14 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 ${
                  item.isWhite ? '' : 'invert mix-blend-screen'
                }`}
                loading="lazy"
                decoding="async"
                width={140}
                height={64}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="text-center mt-6 sm:mt-8 px-6">
        <p className="text-muted-foreground text-xs sm:text-sm mb-3">
          {get("logostrip", "footer", t.logostrip_footer)}
        </p>
        <Link to={localePath("/clientes")} className="text-xs font-semibold tracking-widest uppercase text-accent hover:text-accent/80 transition-colors">
          {t.logostrip_see_all}
        </Link>
      </div>
    </section>
  );
};

export default LogoStrip;
