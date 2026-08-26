import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, Wine, Wallet, MapPin, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { simulatorText } from "./simulatorText";

const ICONS = [BarChart3, Wine, Wallet, MapPin, TrendingUp, Sparkles];

export default function SimulatorHero({ onStart }: { onStart: () => void }) {
  const { lang, localePath } = useLanguage();
  const copy = simulatorText(lang);

  return (
    <section className="bg-gradient-to-b from-wine/5 to-background pt-20 pb-12 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-5xl text-center min-w-0">
        <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-full break-words">
          {copy.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto break-words">
          {copy.heroSubtitle}
        </p>
        <Button size="lg" onClick={onStart} className="bg-wine hover:bg-wine-dark text-white">
          {copy.heroCta} <ArrowRight className="ml-2" />
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 text-left">
          {copy.features.map((f, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <div key={f.title} className="p-5 rounded-xl border border-wine/15 bg-card min-w-0">
                <Icon className="w-7 h-7 text-wine mb-3" />
                <h3 className="font-semibold mb-1 break-words">{f.title}</h3>
                <p className="text-sm text-muted-foreground break-words">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-wine/5 border border-wine/20 text-sm">
          <p className="mb-2">
            <strong>{copy.hasListQ}</strong>{" "}
            <Link to={localePath("/analisis-carta")} className="text-wine underline">
              {copy.hasListLink}
            </Link>
          </p>
          <p>{copy.noListQ}</p>
        </div>
      </div>
    </section>
  );
}
