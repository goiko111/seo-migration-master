// Hero section — above-the-fold, conversion-optimized
import { memo } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import heroTabletImg from "@/assets/winerim-tablet-hero.png";
import { useLanguage } from "@/i18n/LanguageContext";

const heroData: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  forWhom: string;
  ctaPrimary: string;
  ctaPrimaryMicro: string;
  ctaSecondary: string;
  proof: string;
}> = {
  es: {
    badge: "Software de gestión de carta de vinos",
    title: "Vende más vino. Mejora márgenes. Controla tu bodega.",
    titleHighlight: "",
    subtitle: "Winerim es el software que convierte tu carta de vinos en una herramienta de venta, análisis y gestión — con IA, sin depender del sommelier.",
    forWhom: "Para restaurantes, hoteles y grupos de restauración",
    ctaPrimary: "Solicitar demo gratuita",
    ctaPrimaryMicro: "15 min · Sin compromiso · Adaptada a tu negocio",
    ctaSecondary: "Ver cómo funciona",
    proof: "+1.000 bodegas gestionadas en 15 países",
  },
  en: {
    badge: "Wine list management software",
    title: "Sell more wine. Improve margins. Control your cellar.",
    titleHighlight: "",
    subtitle: "Winerim is the software that turns your wine list into a sales, analytics, and management tool — with AI, without relying on a sommelier.",
    forWhom: "For restaurants, hotels and restaurant groups",
    ctaPrimary: "Request free demo",
    ctaPrimaryMicro: "15 min · No commitment · Tailored to your business",
    ctaSecondary: "See how it works",
    proof: "+1,000 cellars managed across 15 countries",
  },
  it: {
    badge: "Software gestione carta dei vini",
    title: "Vendi più vino. Migliora i margini. Controlla la cantina.",
    titleHighlight: "",
    subtitle: "Winerim è il software che trasforma la tua carta dei vini in uno strumento di vendita, analisi e gestione — con IA, senza dipendere dal sommelier.",
    forWhom: "Per ristoranti, hotel e gruppi di ristorazione",
    ctaPrimary: "Richiedi demo gratuita",
    ctaPrimaryMicro: "15 min · Senza impegno · Adattata al tuo business",
    ctaSecondary: "Scopri come funziona",
    proof: "+1.000 cantine gestite in 15 paesi",
  },
  fr: {
    badge: "Logiciel de gestion de carte des vins",
    title: "Vendez plus de vin. Améliorez vos marges. Contrôlez votre cave.",
    titleHighlight: "",
    subtitle: "Winerim est le logiciel qui transforme votre carte des vins en un outil de vente, d'analyse et de gestion — avec l'IA, sans dépendre du sommelier.",
    forWhom: "Pour restaurants, hôtels et groupes de restauration",
    ctaPrimary: "Demander une démo gratuite",
    ctaPrimaryMicro: "15 min · Sans engagement · Adaptée à votre activité",
    ctaSecondary: "Voir comment ça marche",
    proof: "+1 000 caves gérées dans 15 pays",
  },
};

const HeroSection = memo(() => {
  const { lang, localePath } = useLanguage();
  const h = heroData[lang] || heroData.es;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-wine animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{h.badge}</span>
            </div>

            {/* H1 — 3 clear outcomes */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.1] mb-5 animate-fade-in-up">
              {h.title.split('. ').map((part, i, arr) => (
                <span key={i}>
                  {i === 0 ? <span className="text-gradient-wine">{part}.</span> : <>{" "}{part}{i < arr.length - 1 ? '.' : ''}</>}
                  {i < arr.length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            {/* Subtitle — what it is + how */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl animate-fade-in-up animation-delay-200">
              {h.subtitle}
            </p>

            {/* For whom */}
            <p className="text-xs font-medium tracking-wide text-foreground/50 uppercase mb-8 animate-fade-in-up animation-delay-200">
              {h.forWhom}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 animate-fade-in-up animation-delay-400">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.02] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
              >
                {h.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://youtu.be/-PleM286zeY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                <Play size={14} className="text-wine" />
                {h.ctaSecondary}
              </a>
            </div>

            {/* Micro-copy under CTA */}
            <p className="text-[11px] text-muted-foreground/50 mb-10 animate-fade-in-up animation-delay-400">
              {h.ctaPrimaryMicro}
            </p>

            {/* Inline social proof */}
            <div className="flex items-center gap-3 animate-fade-in-up animation-delay-400">
              <div className="flex -space-x-1.5">
                {["ÁP", "NO", "JT", "MR"].map((initials) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full bg-wine/80 border-2 border-background flex items-center justify-center text-[9px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{h.proof}</p>
            </div>
          </div>

          {/* Right — Tablet mockup */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.12),transparent_70%)] blur-2xl" />
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
