import { Upload, Sparkles, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const stepsByLang: Record<string, { title: string; desc: string }[]> = {
  es: [
    { title: "Importamos tu carta de vinos", desc: "Nos envías tu carta actual en cualquier formato. Nosotros nos encargamos de digitalizar y estructurar toda la información." },
    { title: "Winerim la convierte en experiencia digital", desc: "Nuestra IA genera descripciones, maridajes, filtros y recomendaciones inteligentes para cada referencia de tu bodega." },
    { title: "Empiezas a vender más vino", desc: "Tus clientes descubren, comparan y eligen con confianza. Tu ticket medio sube de forma natural desde el primer día." },
  ],
  en: [
    { title: "We import your wine list", desc: "Send us your current wine list in any format. We handle the digitization and structuring of all the information." },
    { title: "Winerim turns it into a digital experience", desc: "Our AI generates descriptions, pairings, filters, and smart recommendations for every reference in your cellar." },
    { title: "You start selling more wine", desc: "Your guests discover, compare, and choose with confidence. Your average ticket rises naturally from day one." },
  ],
  it: [
    { title: "Importiamo la tua carta dei vini", desc: "Ci invii la tua carta attuale in qualsiasi formato. Ci occupiamo noi di digitalizzare e strutturare tutte le informazioni." },
    { title: "Winerim la trasforma in esperienza digitale", desc: "La nostra IA genera descrizioni, abbinamenti, filtri e raccomandazioni intelligenti per ogni referenza della tua cantina." },
    { title: "Inizi a vendere più vino", desc: "I tuoi clienti scoprono, confrontano e scelgono con fiducia. Il tuo scontrino medio sale naturalmente dal primo giorno." },
  ],
  fr: [
    { title: "Nous importons votre carte des vins", desc: "Envoyez-nous votre carte actuelle dans n'importe quel format. Nous nous chargeons de la digitalisation et de la structuration." },
    { title: "Winerim la transforme en expérience digitale", desc: "Notre IA génère descriptions, accords, filtres et recommandations intelligentes pour chaque référence de votre cave." },
    { title: "Vous commencez à vendre plus de vin", desc: "Vos clients découvrent, comparent et choisissent en confiance. Votre ticket moyen augmente naturellement dès le premier jour." },
  ],
};

const icons = [Upload, Sparkles, TrendingUp];
const numbers = ["01", "02", "03"];

const HowItWorksSection = () => {
  const { t, lang } = useLanguage();
  const steps = stepsByLang[lang] || stepsByLang.es;

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.how_badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {t.how_title}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative text-center group">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-border/0" />
                  )}
                  <div className="relative inline-flex mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-card border border-border flex items-center justify-center group-hover:border-wine/30 group-hover:glow-wine transition-all duration-300">
                      <Icon size={36} className="text-wine" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-wine text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {numbers[i]}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
