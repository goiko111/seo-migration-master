import { Link } from "react-router-dom";
import { QrCode, Utensils, Package, DollarSign, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const featuresByLang: Record<string, { icon: typeof QrCode; title: string; desc: string }[]> = {
  es: [
    { icon: QrCode, title: "Carta digital interactiva", desc: "Acceso por QR/link, filtros dinámicos, comparador y navegación multiidioma." },
    { icon: Utensils, title: "Maridajes automáticos con IA", desc: "Recomendaciones inteligentes vino-plato para cada comensal y contexto." },
    { icon: Package, title: "Stock e inventario", desc: "Control de botellas, disponibilidad, rotación y alertas automáticas." },
    { icon: DollarSign, title: "Pricing y márgenes", desc: "Análisis de precios, márgenes por botella/copa y detección de referencias poco rentables." },
    { icon: BarChart3, title: "Analítica avanzada", desc: "Informes de comportamiento, KPIs de venta, métricas para dirección y compras." },
    { icon: Sparkles, title: "IA aplicada al vino", desc: "Generación de fichas, descriptores sensoriales, recomendaciones comerciales y acciones dinámicas." },
  ],
  en: [
    { icon: QrCode, title: "Interactive digital wine list", desc: "QR/link access, dynamic filters, comparator, and multi-language navigation." },
    { icon: Utensils, title: "AI-powered auto pairings", desc: "Smart wine-dish recommendations for every diner and context." },
    { icon: Package, title: "Stock & inventory", desc: "Bottle control, availability, rotation, and automatic alerts." },
    { icon: DollarSign, title: "Pricing & margins", desc: "Price analysis, per-bottle/glass margins, and detection of underperforming references." },
    { icon: BarChart3, title: "Advanced analytics", desc: "Behavior reports, sales KPIs, metrics for management and purchasing." },
    { icon: Sparkles, title: "AI for wine", desc: "Wine sheet generation, sensory descriptors, commercial recommendations, and dynamic actions." },
  ],
  it: [
    { icon: QrCode, title: "Carta digitale interattiva", desc: "Accesso QR/link, filtri dinamici, comparatore e navigazione multilingua." },
    { icon: Utensils, title: "Abbinamenti automatici con IA", desc: "Raccomandazioni intelligenti vino-piatto per ogni commensale e contesto." },
    { icon: Package, title: "Stock e inventario", desc: "Controllo bottiglie, disponibilità, rotazione e avvisi automatici." },
    { icon: DollarSign, title: "Pricing e margini", desc: "Analisi prezzi, margini per bottiglia/calice e rilevamento referenze poco redditizie." },
    { icon: BarChart3, title: "Analisi avanzata", desc: "Report comportamento, KPI vendite, metriche per direzione e acquisti." },
    { icon: Sparkles, title: "IA applicata al vino", desc: "Generazione schede, descrittori sensoriali, raccomandazioni commerciali e azioni dinamiche." },
  ],
  fr: [
    { icon: QrCode, title: "Carte digitale interactive", desc: "Accès QR/lien, filtres dynamiques, comparateur et navigation multilingue." },
    { icon: Utensils, title: "Accords automatiques par IA", desc: "Recommandations intelligentes vin-plat pour chaque convive et contexte." },
    { icon: Package, title: "Stock & inventaire", desc: "Contrôle des bouteilles, disponibilité, rotation et alertes automatiques." },
    { icon: DollarSign, title: "Pricing & marges", desc: "Analyse des prix, marges par bouteille/verre et détection des références peu rentables." },
    { icon: BarChart3, title: "Analytique avancée", desc: "Rapports comportement, KPIs vente, métriques pour direction et achats." },
    { icon: Sparkles, title: "IA appliquée au vin", desc: "Génération de fiches, descripteurs sensoriels, recommandations commerciales et actions dynamiques." },
  ],
};

const FeaturesPreview = () => {
  const { t, lang, localePath } = useLanguage();
  const features = featuresByLang[lang] || featuresByLang.es;

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
