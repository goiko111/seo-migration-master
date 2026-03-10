import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        setDisplay(target);
      } else {
        setDisplay(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>+{display}{suffix}</span>;
};

const metricsByLang: Record<string, { label: string; desc: string; color: string }[]> = {
  es: [
    { label: "Más vino vendido", desc: "Los clientes exploran más referencias y piden con confianza", color: "from-wine to-wine-light" },
    { label: "Mayor ticket medio", desc: "Las recomendaciones inteligentes guían hacia vinos de mayor valor", color: "from-accent to-gold-light" },
    { label: "Mejor rotación de bodega", desc: "La analítica identifica qué vinos funcionan y cuáles no", color: "from-wine-light to-accent" },
  ],
  en: [
    { label: "More wine sold", desc: "Guests explore more references and order with confidence", color: "from-wine to-wine-light" },
    { label: "Higher average ticket", desc: "Smart recommendations guide toward higher-value wines", color: "from-accent to-gold-light" },
    { label: "Better cellar rotation", desc: "Analytics identify which wines perform and which don't", color: "from-wine-light to-accent" },
  ],
  it: [
    { label: "Più vino venduto", desc: "I clienti esplorano più referenze e ordinano con fiducia", color: "from-wine to-wine-light" },
    { label: "Scontrino medio più alto", desc: "Le raccomandazioni guidano verso vini di maggior valore", color: "from-accent to-gold-light" },
    { label: "Migliore rotazione cantina", desc: "L'analisi identifica quali vini funzionano e quali no", color: "from-wine-light to-accent" },
  ],
  fr: [
    { label: "Plus de vin vendu", desc: "Les clients explorent plus de références et commandent avec confiance", color: "from-wine to-wine-light" },
    { label: "Ticket moyen plus élevé", desc: "Les recommandations guident vers des vins de plus grande valeur", color: "from-accent to-gold-light" },
    { label: "Meilleure rotation de cave", desc: "L'analytique identifie quels vins fonctionnent et lesquels non", color: "from-wine-light to-accent" },
  ],
};

const ResultsSection = () => {
  const { t, lang } = useLanguage();
  const metrics = metricsByLang[lang] || metricsByLang.es;

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.results_badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {t.results_title}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative bg-gradient-card rounded-2xl border border-border p-8 text-center hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <p className="font-heading text-2xl md:text-3xl font-bold text-gradient-wine mb-3">
                  {metric.label}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{metric.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
