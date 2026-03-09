import { Link } from "react-router-dom";
import { Sparkles, Utensils, Filter, BarChart3, QrCode, Wine, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const FeaturesPreview = () => {
  const { t, lang, localePath } = useLanguage();

  const features = [
    { icon: Sparkles, title: lang === "es" ? "Recomendaciones IA" : lang === "en" ? "AI Recommendations" : lang === "it" ? "Raccomandazioni IA" : "Recommandations IA", desc: lang === "es" ? "Sugerencias inteligentes para cada comensal." : lang === "en" ? "Smart suggestions for every diner." : lang === "it" ? "Suggerimenti intelligenti per ogni commensale." : "Suggestions intelligentes pour chaque convive." },
    { icon: Utensils, title: lang === "es" ? "Maridajes automáticos" : lang === "en" ? "Auto pairings" : lang === "it" ? "Abbinamenti automatici" : "Accords automatiques", desc: lang === "es" ? "Propuestas instantáneas para cada plato." : lang === "en" ? "Instant pairing suggestions for every dish." : lang === "it" ? "Proposte istantanee per ogni piatto." : "Propositions instantanées pour chaque plat." },
    { icon: Filter, title: lang === "es" ? "Filtros sensoriales" : lang === "en" ? "Sensory filters" : lang === "it" ? "Filtri sensoriali" : "Filtres sensoriels", desc: lang === "es" ? "Busca por sabor, cuerpo o intensidad." : lang === "en" ? "Search by taste, body, or intensity." : lang === "it" ? "Cerca per gusto, corpo o intensità." : "Recherche par goût, corps ou intensité." },
    { icon: BarChart3, title: lang === "es" ? "Analítica de ventas" : lang === "en" ? "Sales analytics" : lang === "it" ? "Analisi vendite" : "Analytique des ventes", desc: lang === "es" ? "KPIs de tu carta de vinos en tiempo real." : lang === "en" ? "Real-time KPIs for your wine list." : lang === "it" ? "KPI della tua carta in tempo reale." : "KPIs de votre carte en temps réel." },
    { icon: QrCode, title: lang === "es" ? "Acceso por QR" : lang === "en" ? "QR access" : lang === "it" ? "Accesso QR" : "Accès QR", desc: lang === "es" ? "Sin descargas, desde el móvil del comensal." : lang === "en" ? "No downloads, from the diner's phone." : lang === "it" ? "Senza download, dal telefono del cliente." : "Sans téléchargement, depuis le téléphone du client." },
    { icon: Wine, title: lang === "es" ? "Gestión de bodega" : lang === "en" ? "Cellar management" : lang === "it" ? "Gestione cantina" : "Gestion de cave", desc: lang === "es" ? "Stock, rotación y alertas automáticas." : lang === "en" ? "Stock, rotation, and automatic alerts." : lang === "it" ? "Stock, rotazione e avvisi automatici." : "Stock, rotation et alertes automatiques." },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.features_badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.features_title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.features_subtitle}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="text-center">
          <Link to={localePath("/funcionalidades")}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent hover:text-accent/80 transition-colors">
            {t.features_see_all} <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturesPreview;
