// Hero section with tablet showcase — optimized for LCP
import { memo } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import heroTabletImg from "@/assets/winerim-tablet-hero.png";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = memo(() => {
  const { t, localePath } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-wine animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.hero_badge}</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-8 animate-fade-in-up">
              {t.hero_title_1}
              <span className="text-gradient-wine italic">{t.hero_title_highlight}</span>
              {t.hero_title_2}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl animate-fade-in-up animation-delay-200">
              {t.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Link
                to={localePath("/demo")}
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                {t.hero_cta_primary}
              </Link>
              <a
                href="https://youtu.be/-PleM286zeY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                <Play size={16} className="text-wine" />
                {t.hero_cta_secondary}
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
              <img
                src={heroTabletImg}
                alt="Winerim smart wine list on tablet"
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
