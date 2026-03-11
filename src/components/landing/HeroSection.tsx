// Hero section — optimized for conversion, SEO, and AI citability
import { memo } from "react";
import { Link } from "react-router-dom";
import { Play, Wine, TrendingUp, BarChart3, Users } from "lucide-react";
import heroTabletImg from "@/assets/winerim-tablet-hero.png";
import { useLanguage } from "@/i18n/LanguageContext";

const heroData: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  titleEnd: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
  proofLine: string;
}> = {
  es: {
    badge: "Software de IA para restaurantes",
    title: "Convierte tu carta de vinos en ",
    titleHighlight: "ventas, margen y control",
    titleEnd: "",
    subtitle: "Winerim es el software que ayuda a restaurantes a vender más vino, mejorar el ticket medio, optimizar márgenes y controlar la bodega — con inteligencia artificial, sin depender del sommelier.",
    ctaPrimary: "Solicitar demo gratuita",
    ctaSecondary: "Ver cómo funciona",
    stats: [
      { value: "+1.000", label: "Bodegas gestionadas" },
      { value: "15", label: "Países" },
      { value: "22+", label: "Integraciones TPV" },
      { value: "4", label: "Idiomas" },
    ],
    proofLine: "Restaurantes, hoteles y grupos de restauración en toda Europa",
  },
  en: {
    badge: "AI software for restaurants",
    title: "Turn your wine list into ",
    titleHighlight: "sales, margin & control",
    titleEnd: "",
    subtitle: "Winerim helps restaurants sell more wine, increase average ticket, optimize margins and manage the cellar — with AI, without relying on a full-time sommelier.",
    ctaPrimary: "Request free demo",
    ctaSecondary: "See how it works",
    stats: [
      { value: "+1,000", label: "Cellars managed" },
      { value: "15", label: "Countries" },
      { value: "22+", label: "POS integrations" },
      { value: "4", label: "Languages" },
    ],
    proofLine: "Restaurants, hotels and restaurant groups across Europe",
  },
  it: {
    badge: "Software IA per ristoranti",
    title: "Trasforma la tua carta dei vini in ",
    titleHighlight: "vendite, margine e controllo",
    titleEnd: "",
    subtitle: "Winerim aiuta i ristoranti a vendere più vino, aumentare lo scontrino medio, ottimizzare i margini e gestire la cantina — con IA, senza dipendere dal sommelier.",
    ctaPrimary: "Richiedi demo gratuita",
    ctaSecondary: "Scopri come funziona",
    stats: [
      { value: "+1.000", label: "Cantine gestite" },
      { value: "15", label: "Paesi" },
      { value: "22+", label: "Integrazioni POS" },
      { value: "4", label: "Lingue" },
    ],
    proofLine: "Ristoranti, hotel e gruppi di ristorazione in tutta Europa",
  },
  fr: {
    badge: "Logiciel IA pour restaurants",
    title: "Transformez votre carte des vins en ",
    titleHighlight: "ventes, marge et contrôle",
    titleEnd: "",
    subtitle: "Winerim aide les restaurants à vendre plus de vin, augmenter le ticket moyen, optimiser les marges et gérer la cave — avec l'IA, sans dépendre du sommelier.",
    ctaPrimary: "Demander une démo gratuite",
    ctaSecondary: "Voir comment ça marche",
    stats: [
      { value: "+1 000", label: "Caves gérées" },
      { value: "15", label: "Pays" },
      { value: "22+", label: "Intégrations POS" },
      { value: "4", label: "Langues" },
    ],
    proofLine: "Restaurants, hôtels et groupes de restauration à travers l'Europe",
  },
};

const valueProps: Record<string, { icon: typeof Wine; text: string }[]> = {
  es: [
    { icon: Wine, text: "Vende más vino" },
    { icon: TrendingUp, text: "Sube el ticket medio" },
    { icon: BarChart3, text: "Controla margen y stock" },
    { icon: Users, text: "Ayuda al equipo de sala" },
  ],
  en: [
    { icon: Wine, text: "Sell more wine" },
    { icon: TrendingUp, text: "Increase avg. ticket" },
    { icon: BarChart3, text: "Control margin & stock" },
    { icon: Users, text: "Empower floor staff" },
  ],
  it: [
    { icon: Wine, text: "Vendi più vino" },
    { icon: TrendingUp, text: "Aumenta lo scontrino" },
    { icon: BarChart3, text: "Controlla margini e stock" },
    { icon: Users, text: "Aiuta il personale" },
  ],
  fr: [
    { icon: Wine, text: "Vendez plus de vin" },
    { icon: TrendingUp, text: "Augmentez le ticket" },
    { icon: BarChart3, text: "Contrôlez marges et stock" },
    { icon: Users, text: "Aidez l'équipe de salle" },
  ],
};

const HeroSection = memo(() => {
  const { lang, localePath } = useLanguage();
  const h = heroData[lang] || heroData.es;
  const vp = valueProps[lang] || valueProps.es;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-wine animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{h.badge}</span>
            </div>

            {/* H1 — keyword-rich, conversion-focused */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-6 animate-fade-in-up">
              {h.title}
              <span className="text-gradient-wine italic">{h.titleHighlight}</span>
              {h.titleEnd}
            </h1>

            {/* Subtitle — business value, not feature list */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl animate-fade-in-up animation-delay-200">
              {h.subtitle}
            </p>

            {/* Value prop pills */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up animation-delay-200">
              {vp.map((v, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-wine/5 border border-wine/10 text-xs font-medium text-foreground/80"
                >
                  <v.icon size={12} className="text-wine" />
                  {v.text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up animation-delay-400">
              <Link
                to={localePath("/demo")}
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                {h.ctaPrimary}
              </Link>
              <a
                href="https://youtu.be/-PleM286zeY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                <Play size={16} className="text-wine" />
                {h.ctaSecondary}
              </a>
            </div>

            {/* Social proof stats */}
            <div className="animate-fade-in-up animation-delay-400">
              <div className="grid grid-cols-4 gap-4 border-t border-border pt-6">
                {h.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-heading text-lg md:text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-tight mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 text-center mt-3">{h.proofLine}</p>
            </div>
          </div>

          {/* Tablet mockup */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
              <img
                src={heroTabletImg}
                alt="Winerim — carta de vinos inteligente en tablet para restaurantes"
                className="relative w-full max-w-2xl mx-auto drop-shadow-2xl rounded-2xl animate-fade-in-up animation-delay-400"
                loading="eager"
                fetchPriority="high"
                width={800}
                height={600}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
