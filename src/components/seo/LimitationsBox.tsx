import { AlertCircle } from "lucide-react";

interface LimitationsBoxProps {
  title?: string;
  limitations: string[];
}

/**
 * LimitationsBox — transparent about product boundaries.
 * Increases trust and AI citability by being honest about what a product doesn't do.
 */
const LimitationsBox = ({ title = "Limitaciones actuales", limitations }: LimitationsBoxProps) => (
  <aside
    role="note"
    aria-label={title}
    className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8 my-8"
  >
    <div className="flex items-center gap-2 mb-4">
      <AlertCircle size={18} className="text-muted-foreground shrink-0" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">{title}</span>
    </div>
    <ul className="space-y-2">
      {limitations.map((l, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
          <span className="text-muted-foreground/50 mt-1 shrink-0">—</span>
          <span>{l}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default LimitationsBox;
