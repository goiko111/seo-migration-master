import { MessageSquare } from "lucide-react";

interface QuickAnswerProps {
  /** The question this block answers — used as aria-label and visible heading */
  question: string;
  /** Direct, concise answer (1-3 sentences) */
  answer: string;
  /** Optional supporting details */
  details?: string[];
  /** Optional source/context note */
  source?: string;
}

/**
 * QuickAnswer — designed for AI search answer extraction.
 * Provides a clear question→answer pattern that AI models can cite directly.
 * Uses <dl> semantics for structured Q&A.
 */
const QuickAnswer = ({ question, answer, details, source }: QuickAnswerProps) => (
  <aside
    role="note"
    aria-label={question}
    className="rounded-2xl border border-wine/20 bg-wine/5 p-6 md:p-8 my-8"
  >
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
        <MessageSquare size={16} className="text-wine" />
      </div>
      <dl className="flex-1">
        <dt className="font-heading text-base md:text-lg font-bold text-foreground mb-2">{question}</dt>
        <dd className="text-foreground/90 leading-relaxed mb-3">{answer}</dd>
        {details && details.length > 0 && (
          <dd>
            <ul className="space-y-1.5">
              {details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-wine mt-1 shrink-0">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </dd>
        )}
        {source && (
          <dd className="mt-3 pt-3 border-t border-wine/10 text-xs text-muted-foreground">
            <span className="font-medium">Contexto:</span> {source}
          </dd>
        )}
      </dl>
    </div>
  </aside>
);

export default QuickAnswer;
