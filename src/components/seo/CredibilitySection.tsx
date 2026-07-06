import { Wine, BarChart3, Brain, Globe, Shield, Award } from "lucide-react";

interface CredibilitySectionProps {
  lang?: string;
}

/**
 * CredibilitySection — reusable trust/authority block.
 * Designed to be placed on commercial pages to reinforce expertise signals.
 */
const CredibilitySection = ({ lang = "es" }: CredibilitySectionProps) => {
  const copy: Record<string, {
    badge: string;
    stats: { value: string; label: string }[];
    areas: { icon: typeof Wine; label: string }[];
    note: string;
  }> = {
    es: {
    badge: "Por qué confiar en Winerim",
    stats: [
      { value: "+1.000", label: "Bodegas gestionadas" },
      { value: "+300.000", label: "Referencias de vino" },
      { value: "15", label: "Países" },
      { value: "22+", label: "Integraciones TPV" },
    ],
    areas: [
      { icon: Wine, label: "Gestión de carta" },
      { icon: BarChart3, label: "Analítica de ventas" },
      { icon: Brain, label: "IA para restaurantes" },
      { icon: Globe, label: "Pricing y márgenes" },
      { icon: Shield, label: "Control de stock" },
      { icon: Award, label: "Maridaje inteligente" },
    ],
    note: "Datos verificados a marzo 2025. Las cifras de mejora son potenciales estimados que varían según el contexto del restaurante.",
  },
  en: {
    badge: "Why trust Winerim",
    stats: [
      { value: "+1,000", label: "Cellars managed" },
      { value: "+300,000", label: "Wine references" },
      { value: "15", label: "Countries" },
      { value: "22+", label: "POS integrations" },
    ],
    areas: [
      { icon: Wine, label: "Wine list management" },
      { icon: BarChart3, label: "Sales analytics" },
      { icon: Brain, label: "AI for restaurants" },
      { icon: Globe, label: "Pricing & margins" },
      { icon: Shield, label: "Stock control" },
      { icon: Award, label: "Smart pairing" },
    ],
    note: "Verified data as of March 2025. Improvement figures are estimated potentials that vary by restaurant context.",
  },
  it: {
    badge: "Perché fidarsi di Winerim",
    stats: [
      { value: "+1.000", label: "Cantine gestite" },
      { value: "+300.000", label: "Referenze di vino" },
      { value: "15", label: "Paesi" },
      { value: "22+", label: "Integrazioni POS" },
    ],
    areas: [
      { icon: Wine, label: "Gestione carta vini" },
      { icon: BarChart3, label: "Analytics vendite" },
      { icon: Brain, label: "IA per ristoranti" },
      { icon: Globe, label: "Pricing e margini" },
      { icon: Shield, label: "Controllo stock" },
      { icon: Award, label: "Abbinamento intelligente" },
    ],
    note: "Dati verificati a marzo 2025. Le cifre di miglioramento sono potenziali stimati che variano in base al contesto del ristorante.",
  },
  fr: {
    badge: "Pourquoi faire confiance à Winerim",
    stats: [
      { value: "+1 000", label: "Caves gérées" },
      { value: "+300 000", label: "Références de vin" },
      { value: "15", label: "Pays" },
      { value: "22+", label: "Intégrations POS" },
    ],
    areas: [
      { icon: Wine, label: "Gestion carte des vins" },
      { icon: BarChart3, label: "Analytique ventes" },
      { icon: Brain, label: "IA pour restaurants" },
      { icon: Globe, label: "Pricing et marges" },
      { icon: Shield, label: "Contrôle stock" },
      { icon: Award, label: "Accord intelligent" },
    ],
    note: "Données vérifiées en mars 2025. Les chiffres d'amélioration sont des potentiels estimés qui varient selon le contexte du restaurant.",
  },
  de: {
    badge: "Warum Restaurants Winerim vertrauen",
    stats: [
      { value: "+1.000", label: "Verwaltete Weinkeller" },
      { value: "+300.000", label: "Weinreferenzen" },
      { value: "15", label: "Länder" },
      { value: "22+", label: "POS-Integrationen" },
    ],
    areas: [
      { icon: Wine, label: "Weinkarten-Management" },
      { icon: BarChart3, label: "Verkaufsanalyse" },
      { icon: Brain, label: "KI für Restaurants" },
      { icon: Globe, label: "Preise und Margen" },
      { icon: Shield, label: "Bestandskontrolle" },
      { icon: Award, label: "Intelligentes Pairing" },
    ],
    note: "Datenstand März 2025. Verbesserungszahlen sind geschätzte Potenziale und hängen vom jeweiligen Restaurantkontext ab.",
  },
  pt: {
    badge: "Porque confiar na Winerim",
    stats: [
      { value: "+1.000", label: "Garrafeiras geridas" },
      { value: "+300.000", label: "Referências de vinho" },
      { value: "15", label: "Países" },
      { value: "22+", label: "Integrações POS" },
    ],
    areas: [
      { icon: Wine, label: "Gestão da carta" },
      { icon: BarChart3, label: "Análise de vendas" },
      { icon: Brain, label: "IA para restaurantes" },
      { icon: Globe, label: "Preços e margens" },
      { icon: Shield, label: "Controlo de stock" },
      { icon: Award, label: "Harmonização inteligente" },
    ],
    note: "Dados verificados em março de 2025. Os números de melhoria são potenciais estimados e variam conforme o contexto do restaurante.",
  },
  };
  const t = copy[lang] || copy.es;

  return (
    <aside
      role="note"
      aria-label={t.badge}
      className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8 my-8"
    >
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-wine mb-6 block">
        {t.badge}
      </span>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {t.stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Expertise pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {t.areas.map((area, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-wine/5 text-xs font-medium text-foreground/80"
          >
            <area.icon size={12} className="text-wine" />
            {area.label}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4 mt-2">
        {t.note}
      </p>
    </aside>
  );
};

export default CredibilitySection;
