import { AlertTriangle, Wine, Users, PackageX, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const problemsByLang: Record<string, { icon: typeof Wine; text: string }[]> = {
  es: [
    { icon: Wine, text: "La carta de vinos no vende, solo informa. El vino está infravendido." },
    { icon: Users, text: "El equipo de sala no tiene tiempo ni conocimiento para recomendar vinos." },
    { icon: PackageX, text: "Hay vinos parados sin rotación y referencias mal posicionadas." },
    { icon: BarChart3, text: "No hay datos claros para tomar decisiones de compra ni pricing." },
  ],
  en: [
    { icon: Wine, text: "The wine list doesn't sell, it only informs. Wine is undersold." },
    { icon: Users, text: "Floor staff lack time and knowledge to recommend wines." },
    { icon: PackageX, text: "Wines sit on the list without rotation, poorly positioned." },
    { icon: BarChart3, text: "No clear data for purchasing or pricing decisions." },
  ],
  it: [
    { icon: Wine, text: "La carta dei vini non vende, informa soltanto. Il vino è sottovalutato." },
    { icon: Users, text: "Il personale di sala non ha tempo né competenze per consigliare vini." },
    { icon: PackageX, text: "Ci sono vini fermi senza rotazione e referenze mal posizionate." },
    { icon: BarChart3, text: "Non ci sono dati chiari per decisioni d'acquisto o pricing." },
  ],
  fr: [
    { icon: Wine, text: "La carte des vins ne vend pas, elle informe seulement. Le vin est sous-vendu." },
    { icon: Users, text: "L'équipe de salle n'a ni le temps ni les connaissances pour recommander." },
    { icon: PackageX, text: "Des vins restent sans rotation, mal positionnés dans la carte." },
    { icon: BarChart3, text: "Aucune donnée claire pour les décisions d'achat ou de tarification." },
  ],
};

const copyByLang: Record<string, { badge: string; title: string; highlight: string; quote: string; quoteHighlight: string }> = {
  es: { badge: "El problema", title: "El vino debería ser tu mayor margen… ", highlight: "pero rara vez lo es.", quote: "Baja venta, mala rotación, falta de conocimiento en sala, ", quoteHighlight: "decisiones sin datos." },
  en: { badge: "The problem", title: "Wine should be your biggest margin… ", highlight: "but it rarely is.", quote: "Low sales, poor rotation, lack of floor knowledge, ", quoteHighlight: "decisions without data." },
  it: { badge: "Il problema", title: "Il vino dovrebbe essere il tuo margine più alto… ", highlight: "ma raramente lo è.", quote: "Vendite basse, rotazione scarsa, poca conoscenza in sala, ", quoteHighlight: "decisioni senza dati." },
  fr: { badge: "Le problème", title: "Le vin devrait être votre plus grande marge… ", highlight: "mais c'est rarement le cas.", quote: "Ventes faibles, mauvaise rotation, manque de connaissances en salle, ", quoteHighlight: "décisions sans données." },
};

const ProblemSection = () => {
  const { lang } = useLanguage();
  const problems = problemsByLang[lang] || problemsByLang.es;
  const copy = copyByLang[lang] || copyByLang.es;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <AlertTriangle size={14} className="text-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">{copy.badge}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {copy.title}
            <span className="text-gradient-wine italic">{copy.highlight}</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-wine" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{problem.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <div className="inline-block bg-gradient-card rounded-2xl border border-wine/20 px-8 py-6 glow-wine">
              <p className="font-heading text-xl md:text-2xl font-semibold text-foreground/90 italic">
                "{copy.quote}<span className="text-gradient-wine">{copy.quoteHighlight}</span>"
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemSection;
