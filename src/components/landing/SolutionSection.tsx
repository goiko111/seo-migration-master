import { Sparkles, Utensils, BarChart3, Eye, ShoppingCart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const benefitsByLang: Record<string, { title: string; desc: string }[]> = {
  es: [
    { title: "Recomendaciones inteligentes", desc: "La IA sugiere vinos según preferencias, plato y contexto." },
    { title: "Maridajes automáticos", desc: "Propuestas de maridaje instantáneas para cada plato del menú." },
    { title: "Comparador de vinos", desc: "El comensal compara opciones con información clara y visual." },
    { title: "Información visual y clara", desc: "Notas de cata accesibles, sin tecnicismos, con imágenes." },
    { title: "Venta guiada", desc: "La carta conduce al cliente hacia mejores decisiones de compra." },
  ],
  en: [
    { title: "Smart recommendations", desc: "AI suggests wines based on preferences, dish, and context." },
    { title: "Automatic pairings", desc: "Instant pairing suggestions for every dish on the menu." },
    { title: "Wine comparator", desc: "Guests compare options with clear, visual information." },
    { title: "Clear visual info", desc: "Accessible tasting notes, no jargon, with images." },
    { title: "Guided selling", desc: "The list guides customers toward better purchasing decisions." },
  ],
  it: [
    { title: "Raccomandazioni intelligenti", desc: "L'IA suggerisce vini in base a preferenze, piatto e contesto." },
    { title: "Abbinamenti automatici", desc: "Proposte di abbinamento istantanee per ogni piatto del menu." },
    { title: "Comparatore vini", desc: "Il commensale confronta opzioni con informazioni chiare e visive." },
    { title: "Informazioni visive e chiare", desc: "Note di degustazione accessibili, senza tecnicismi, con immagini." },
    { title: "Vendita guidata", desc: "La carta guida il cliente verso decisioni d'acquisto migliori." },
  ],
  fr: [
    { title: "Recommandations intelligentes", desc: "L'IA suggère des vins selon les préférences, le plat et le contexte." },
    { title: "Accords automatiques", desc: "Propositions d'accords instantanées pour chaque plat du menu." },
    { title: "Comparateur de vins", desc: "Le client compare les options avec des informations claires et visuelles." },
    { title: "Information visuelle et claire", desc: "Notes de dégustation accessibles, sans jargon, avec images." },
    { title: "Vente guidée", desc: "La carte guide le client vers de meilleures décisions d'achat." },
  ],
};

const subtitleByLang: Record<string, { badge: string; title: string; subtitle: string }> = {
  es: { badge: "La solución", title: "Una carta que <em>vende por ti</em>", subtitle: "Winerim transforma tu carta de vinos en una experiencia interactiva que guía al comensal hacia mejores decisiones." },
  en: { badge: "The solution", title: "A wine list that <em>sells for you</em>", subtitle: "Winerim transforms your wine list into an interactive experience that guides diners toward better decisions." },
  it: { badge: "La soluzione", title: "Una carta che <em>vende per te</em>", subtitle: "Winerim trasforma la tua carta dei vini in un'esperienza interattiva che guida il commensale verso decisioni migliori." },
  fr: { badge: "La solution", title: "Une carte qui <em>vend pour vous</em>", subtitle: "Winerim transforme votre carte des vins en une expérience interactive qui guide les convives vers de meilleurs choix." },
};

const icons = [Sparkles, Utensils, BarChart3, Eye, ShoppingCart];

const SolutionSection = () => {
  const { lang } = useLanguage();
  const benefits = benefitsByLang[lang] || benefitsByLang.es;
  const copy = subtitleByLang[lang] || subtitleByLang.es;

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{copy.badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: copy.title.replace("<em>", '<span class="text-gradient-wine italic">').replace("</em>", "</span>") }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{copy.subtitle}</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 hover:glow-wine h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
