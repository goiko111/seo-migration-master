import { memo } from "react";
import { Brain, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { SupportedLang } from "@/i18n/types";

/* ── i18n ── */
const i18n: I18nMap<{
  eyebrow: string;
  title_1: string;
  title_highlight: string;
  subtitle: string;
  pillars: { icon: "brain" | "chart" | "lightbulb"; label: string; desc: string }[];
  badge: string;
  badge_desc: string;
}> = {
  es: {
    eyebrow: "Incluido para clientes",
    title_1: "No solo ves datos. ",
    title_highlight: "Entiendes qué hacer con ellos.",
    subtitle: "Decision Center es una capa exclusiva del producto que ayuda a clientes de Winerim a interpretar insights, priorizar acciones y tomar decisiones más claras sobre carta, pricing, stock y compras.",
    pillars: [
      { icon: "brain", label: "Interpretación contextual", desc: "Cada métrica viene acompañada de contexto: qué significa, por qué importa y qué hacer." },
      { icon: "chart", label: "Priorización inteligente", desc: "Clasifica alertas por urgencia para que actúes primero donde más impacto hay." },
      { icon: "lightbulb", label: "Decisiones accionables", desc: "Pasos concretos para cada situación: no solo diagnóstico, también acción." },
    ],
    badge: "Solo para clientes",
    badge_desc: "Disponible dentro de la plataforma para usuarios activos de Winerim.",
  },
  en: {
    eyebrow: "Included for clients",
    title_1: "You don't just see data. ",
    title_highlight: "You understand what to do with it.",
    subtitle: "Decision Center is an exclusive product layer that helps Winerim clients interpret insights, prioritize actions and make clearer decisions about their wine list, pricing, stock and purchasing.",
    pillars: [
      { icon: "brain", label: "Contextual interpretation", desc: "Every metric comes with context: what it means, why it matters and what to do." },
      { icon: "chart", label: "Smart prioritization", desc: "Alerts classified by urgency so you act first where impact is greatest." },
      { icon: "lightbulb", label: "Actionable decisions", desc: "Concrete steps for every situation: not just diagnosis, but action." },
    ],
    badge: "Clients only",
    badge_desc: "Available within the platform for active Winerim users.",
  },
  it: {
    eyebrow: "Incluso per i clienti",
    title_1: "Non vedi solo dati. ",
    title_highlight: "Capisci cosa fare.",
    subtitle: "Decision Center è un livello esclusivo del prodotto che aiuta i clienti Winerim a interpretare gli insight, dare priorità alle azioni e prendere decisioni più chiare su carta dei vini, pricing, stock e acquisti.",
    pillars: [
      { icon: "brain", label: "Interpretazione contestuale", desc: "Ogni metrica è accompagnata dal contesto: cosa significa, perché è importante e cosa fare." },
      { icon: "chart", label: "Priorità intelligente", desc: "Avvisi classificati per urgenza per agire prima dove l'impatto è maggiore." },
      { icon: "lightbulb", label: "Decisioni azionabili", desc: "Passi concreti per ogni situazione: non solo diagnosi, ma azione." },
    ],
    badge: "Solo per clienti",
    badge_desc: "Disponibile nella piattaforma per gli utenti attivi di Winerim.",
  },
  fr: {
    eyebrow: "Inclus pour les clients",
    title_1: "Vous ne voyez pas que des données. ",
    title_highlight: "Vous comprenez quoi en faire.",
    subtitle: "Decision Center est une couche exclusive du produit qui aide les clients Winerim à interpréter les insights, prioriser les actions et prendre des décisions plus claires sur la carte, le pricing, le stock et les achats.",
    pillars: [
      { icon: "brain", label: "Interprétation contextuelle", desc: "Chaque métrique est accompagnée de contexte : ce que ça signifie, pourquoi c'est important et quoi faire." },
      { icon: "chart", label: "Priorisation intelligente", desc: "Alertes classées par urgence pour agir d'abord là où l'impact est le plus fort." },
      { icon: "lightbulb", label: "Décisions actionnables", desc: "Étapes concrètes pour chaque situation : pas seulement un diagnostic, mais de l'action." },
    ],
    badge: "Clients uniquement",
    badge_desc: "Disponible dans la plateforme pour les utilisateurs actifs de Winerim.",
  },
};

const iconMap = {
  brain: Brain,
  chart: BarChart3,
  lightbulb: Lightbulb,
};

interface Props {
  lang: SupportedLang;
  /** Compact mode for embedding inside other sections */
  compact?: boolean;
}

const DecisionCenterTeaser = memo(({ lang, compact = false }: Props) => {
  const t = i18n[lang] || i18n.es;

  if (compact) {
    return (
      <div className="relative bg-gradient-card rounded-2xl border border-border p-6 sm:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_70%)]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
            <Brain size={20} className="text-wine" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-wine/70 mb-1">{t.eyebrow}</p>
            <h3 className="font-heading text-lg font-bold mb-2">
              {t.title_1}<span className="text-gradient-wine italic">{t.title_highlight}</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t.subtitle}</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-wine/60">
              {t.badge} <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10 md:mb-14">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-wine/70 mb-4">
                  <Brain size={14} />
                  {t.eyebrow}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                  {t.title_1}
                  <span className="text-gradient-wine italic">{t.title_highlight}</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </div>

              {/* Pillars */}
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-10">
                {t.pillars.map((p, i) => {
                  const Icon = iconMap[p.icon];
                  return (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={22} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-sm font-bold tracking-wide uppercase mb-2">{p.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Client-only badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-wine/5 border border-wine/15 rounded-full px-5 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-wine/50 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-wine/70">{t.badge}</span>
                  <span className="text-xs text-muted-foreground">— {t.badge_desc}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

DecisionCenterTeaser.displayName = "DecisionCenterTeaser";

export default DecisionCenterTeaser;
