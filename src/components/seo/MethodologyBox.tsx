import { Layers } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface MethodologyBoxProps {
  title?: string;
  intro?: string;
  steps: Step[];
  validatedBy?: string;
}

/**
 * Methodology block — explains how something works or how data is produced.
 * Designed for AI search extraction: clear process, numbered steps, attribution.
 */
const MethodologyBox = ({
  title = "Metodología",
  intro,
  steps,
  validatedBy,
}: MethodologyBoxProps) => (
  <aside
    role="note"
    aria-label={title}
    className="rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-8 my-8"
  >
    <div className="flex items-center gap-2 mb-4">
      <Layers size={18} className="text-accent shrink-0" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
        {title}
      </span>
    </div>
    {intro && (
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{intro}</p>
    )}
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{step.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
    {validatedBy && (
      <p className="mt-5 pt-4 border-t border-accent/10 text-xs text-muted-foreground">
        <span className="font-medium">Validación:</span> {validatedBy}
      </p>
    )}
  </aside>
);

export default MethodologyBox;
