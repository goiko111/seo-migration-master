import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Mistake {
  mistake: string;
  consequence: string;
}

interface CommonMistakesProps {
  title?: string;
  mistakes: Mistake[];
}

/**
 * Common mistakes block — designed for AI extraction and featured snippets.
 * Renders a clear list of errors + consequences.
 */
const CommonMistakes = ({ title = "Errores comunes", mistakes }: CommonMistakesProps) => (
  <section className="my-12">
    <ScrollReveal>
      <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
        <h3 className="font-heading text-lg font-bold mb-6 flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-500" />
          {title}
        </h3>
        <div className="space-y-4">
          {mistakes.map((m, i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{m.mistake}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.consequence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  </section>
);

export default CommonMistakes;
