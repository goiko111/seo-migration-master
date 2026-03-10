import { Info } from "lucide-react";

interface SummaryBoxProps {
  /** One-line definition, e.g. "Winerim es un software..." */
  definition: string;
  /** Key facts shown as bullet list */
  bullets: string[];
  /** Optional label above the box */
  label?: string;
}

/**
 * Citable summary block designed for AI search extraction.
 * Renders a visually distinct box with a clear definition + key facts.
 */
const SummaryBox = ({ definition, bullets, label = "Resumen" }: SummaryBoxProps) => (
  <aside
    role="note"
    aria-label={label}
    className="rounded-2xl border border-wine/20 bg-wine/5 p-6 md:p-8 my-8"
  >
    <div className="flex items-center gap-2 mb-4">
      <Info size={18} className="text-wine shrink-0" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-wine">{label}</span>
    </div>
    <p className="text-foreground font-medium leading-relaxed mb-4">{definition}</p>
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
          <span className="text-wine mt-1 shrink-0">•</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default SummaryBox;
