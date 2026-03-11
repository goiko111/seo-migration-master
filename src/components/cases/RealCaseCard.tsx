/**
 * Reusable card for REAL case studies — based on verified testimonials
 * with structured before/after narrative and validated quote.
 */
import { Quote, MapPin, Utensils, Wine, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export interface RealCase {
  name: string;
  role: string;
  restaurant: string;
  initials: string;
  city?: string;
  cuisine?: string;
  references?: number;
  situation: string;
  problem: string;
  implementation: string;
  impact: string;
  quote: string;
  highlight: string;
}

interface RealCaseCardProps {
  data: RealCase;
  index: number;
  labels: {
    situation: string;
    problem: string;
    implementation: string;
    impact: string;
    refs: string;
  };
}

const RealCaseCard = ({ data, index, labels }: RealCaseCardProps) => (
  <ScrollReveal delay={index * 0.08}>
    <article
      className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 hover:border-wine/30 transition-all duration-300 overflow-hidden relative"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-40" />

      {/* Header: restaurant + meta */}
      <div className="mb-5">
        <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-wine bg-wine/10 border border-wine/20 rounded-full px-3 py-1 mb-3">
          {data.highlight}
        </span>
        <h3 className="font-heading text-xl md:text-2xl font-bold" itemProp="name">
          {data.restaurant}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
          {data.city && (
            <span className="flex items-center gap-1"><MapPin size={13} className="text-wine" />{data.city}</span>
          )}
          {data.cuisine && (
            <span className="flex items-center gap-1"><Utensils size={13} className="text-wine" />{data.cuisine}</span>
          )}
          {data.references && (
            <span className="flex items-center gap-1"><Wine size={13} className="text-wine" />{data.references} {labels.refs}</span>
          )}
        </div>
      </div>

      {/* Structured narrative: situation → problem → implementation → impact */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-border p-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
            <AlertTriangle size={12} className="text-destructive" /> {labels.situation}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.situation}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
            <AlertTriangle size={12} className="text-destructive" /> {labels.problem}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.problem}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5 mb-2">
            <Lightbulb size={12} className="text-wine" /> {labels.implementation}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.implementation}</p>
        </div>
        <div className="rounded-xl border border-wine/20 bg-wine/5 p-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-wine flex items-center gap-1.5 mb-2">
            <CheckCircle size={12} /> {labels.impact}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.impact}</p>
        </div>
      </div>

      {/* Validated quote */}
      <blockquote className="border-l-2 border-wine/30 pl-4 mb-5" itemProp="reviewBody">
        <Quote size={16} className="text-wine/30 mb-1" />
        <p className="text-sm italic text-muted-foreground leading-relaxed">{data.quote}</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border" itemProp="author" itemScope itemType="https://schema.org/Person">
        <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center text-xs font-bold text-white shrink-0">
          {data.initials}
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight" itemProp="name">{data.name}</p>
          <p className="text-xs text-muted-foreground" itemProp="jobTitle">{data.role}</p>
          <p className="text-xs text-wine font-medium">{data.restaurant}</p>
        </div>
      </div>
    </article>
  </ScrollReveal>
);

export default RealCaseCard;
