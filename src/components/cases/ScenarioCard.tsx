/**
 * Reusable card for SCENARIO PROFILES — typical patterns, not real case studies.
 * Transparent labeling to avoid credibility issues.
 */
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Utensils, Wine, AlertTriangle, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export interface Scenario {
  profile: string;
  cuisine: string;
  references: number;
  pain: string;
  howWinerimHelps: string;
  indicators: string[];
  ctaUrl: string;
  ctaLabel: string;
}

interface ScenarioCardProps {
  data: Scenario;
  index: number;
  labels: {
    scenarioBadge: string;
    painLabel: string;
    helpLabel: string;
    indicatorsLabel: string;
    refs: string;
  };
}

const ScenarioCard = ({ data, index, labels }: ScenarioCardProps) => (
  <ScrollReveal delay={index * 0.08}>
    <article className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 hover:border-accent/30 transition-all duration-300 h-full flex flex-col overflow-hidden relative">
      {/* Top accent — amber to differentiate from real cases */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-amber-400/60 opacity-40" />

      {/* Badge + profile */}
      <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3 self-start">
        {labels.scenarioBadge}
      </span>
      <h3 className="font-heading text-lg md:text-xl font-bold mb-2">{data.profile}</h3>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
        <span className="flex items-center gap-1"><Utensils size={13} className="text-accent" />{data.cuisine}</span>
        <span className="flex items-center gap-1"><Wine size={13} className="text-accent" />{data.references} {labels.refs}</span>
      </div>

      {/* Pain */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5 mb-1.5">
          <AlertTriangle size={12} className="text-destructive" /> {labels.painLabel}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.pain}</p>
      </div>

      {/* How Winerim helps */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5 mb-1.5">
          <TrendingUp size={12} className="text-wine" /> {labels.helpLabel}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.howWinerimHelps}</p>
      </div>

      {/* Indicators */}
      <div className="mb-6 flex-1">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
          {labels.indicatorsLabel}
        </h4>
        <ul className="space-y-1.5">
          {data.indicators.map((ind, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-accent mt-0.5">•</span> {ind}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        to={data.ctaUrl}
        className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-light transition-colors group mt-auto"
      >
        {data.ctaLabel}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  </ScrollReveal>
);

export default ScenarioCard;
