import { ShoppingCart, Sparkles, Settings, BarChart3, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const benefitsByLang: Record<string, { title: string; desc: string }[]> = {
  es: [
    { title: "Herramienta de venta", desc: "La carta guía al comensal hacia mejores decisiones y convierte más." },
    { title: "Herramienta de recomendación", desc: "IA + maridajes automáticos que aciertan con cada plato y perfil." },
    { title: "Herramienta de gestión", desc: "Stock, pricing, rotación y disponibilidad desde un solo panel." },
    { title: "Herramienta de análisis", desc: "Datos de comportamiento del comensal, KPIs y Big Data de tu carta." },
    { title: "Herramienta de formación", desc: "El equipo de sala aprende mientras trabaja, sin depender del sumiller." },
  ],
  en: [
    { title: "Sales tool", desc: "The wine list guides diners toward better decisions and converts more." },
    { title: "Recommendation tool", desc: "AI + auto pairings that match every dish and diner profile." },
    { title: "Management tool", desc: "Stock, pricing, rotation, and availability from a single panel." },
    { title: "Analytics tool", desc: "Diner behavior data, KPIs, and Big Data insights for your list." },
    { title: "Training tool", desc: "Floor staff learn as they work, without depending on the sommelier." },
  ],
  it: [
    { title: "Strumento di vendita", desc: "La carta guida il commensale verso decisioni migliori e converte di più." },
    { title: "Strumento di raccomandazione", desc: "IA + abbinamenti automatici che azzeccano ogni piatto e profilo." },
    { title: "Strumento di gestione", desc: "Stock, pricing, rotazione e disponibilità da un unico pannello." },
    { title: "Strumento di analisi", desc: "Dati sul comportamento del cliente, KPI e Big Data della tua carta." },
    { title: "Strumento di formazione", desc: "Il personale impara lavorando, senza dipendere dal sommelier." },
  ],
  fr: [
    { title: "Outil de vente", desc: "La carte guide le client vers de meilleurs choix et convertit davantage." },
    { title: "Outil de recommandation", desc: "IA + accords automatiques adaptés à chaque plat et profil." },
    { title: "Outil de gestion", desc: "Stock, pricing, rotation et disponibilité depuis un seul panneau." },
    { title: "Outil d'analyse", desc: "Données comportement client, KPIs et Big Data de votre carte." },
    { title: "Outil de formation", desc: "L'équipe de salle apprend en travaillant, sans dépendre du sommelier." },
  ],
};

const subtitleByLang: Record<string, { badge: string; title: string; subtitle: string }> = {
  es: { badge: "La solución", title: "Tu carta de vinos se convierte en <em>5 herramientas</em>", subtitle: "Winerim transforma tu carta en una herramienta de venta, recomendación, gestión, análisis y formación." },
  en: { badge: "The solution", title: "Your wine list becomes <em>5 tools in one</em>", subtitle: "Winerim transforms your wine list into a sales, recommendation, management, analytics, and training tool." },
  it: { badge: "La soluzione", title: "La tua carta dei vini diventa <em>5 strumenti in uno</em>", subtitle: "Winerim trasforma la tua carta in uno strumento di vendita, raccomandazione, gestione, analisi e formazione." },
  fr: { badge: "La solution", title: "Votre carte des vins devient <em>5 outils en un</em>", subtitle: "Winerim transforme votre carte en outil de vente, recommandation, gestion, analyse et formation." },
};

const icons = [ShoppingCart, Sparkles, Settings, BarChart3, GraduationCap];

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
