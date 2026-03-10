import { CheckCircle, XCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface NotForSectionProps {
  idealFor: string[];
  notFor: string[];
  titleIdeal?: string;
  titleNot?: string;
}

/**
 * "For whom / Not for whom" block — helps AI search engines understand product fit
 * and increases trust by being transparent about limitations.
 */
const NotForSection = ({
  idealFor,
  notFor,
  titleIdeal = "Winerim es ideal para",
  titleNot = "Winerim no es para",
}: NotForSectionProps) => (
  <section className="my-12">
    <div className="grid md:grid-cols-2 gap-6">
      <ScrollReveal>
        <div className="rounded-xl border border-wine/20 bg-wine/5 p-6 h-full">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-wine" />
            {titleIdeal}
          </h3>
          <ul className="space-y-3">
            {idealFor.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                <CheckCircle size={14} className="text-wine mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="rounded-xl border border-border bg-gradient-card p-6 h-full">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <XCircle size={20} className="text-muted-foreground" />
            {titleNot}
          </h3>
          <ul className="space-y-3">
            {notFor.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <XCircle size={14} className="text-muted-foreground/50 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default NotForSection;
