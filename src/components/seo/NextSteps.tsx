import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Download, Lightbulb, BarChart3, Wine } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

type StepType = "guide" | "tool" | "resource" | "solution" | "benchmark" | "article";

export interface NextStep {
  to: string;
  label: string;
  description: string;
  type: StepType;
}

const typeLabels: Record<StepType, Record<string, string>> = {
  guide: { es: "Guía", en: "Guide", it: "Guida", fr: "Guide" },
  tool: { es: "Herramienta", en: "Tool", it: "Strumento", fr: "Outil" },
  resource: { es: "Recurso", en: "Resource", it: "Risorsa", fr: "Ressource" },
  solution: { es: "Solución", en: "Solution", it: "Soluzione", fr: "Solution" },
  benchmark: { es: "Benchmark", en: "Benchmark", it: "Benchmark", fr: "Benchmark" },
  article: { es: "Artículo", en: "Article", it: "Articolo", fr: "Article" },
};

const typeIcons: Record<StepType, typeof Wine> = {
  guide: BookOpen,
  tool: Calculator,
  resource: Download,
  solution: Lightbulb,
  benchmark: BarChart3,
  article: Wine,
};

const badgeClasses: Record<StepType, string> = {
  guide: "text-accent",
  tool: "text-wine",
  resource: "text-emerald-500",
  solution: "text-amber-500",
  benchmark: "text-sky-500",
  article: "text-violet-500",
};

const defaultTitles: Record<string, string> = {
  es: "Siguientes pasos recomendados",
  en: "Recommended next steps",
  it: "Prossimi passi consigliati",
  fr: "Prochaines étapes recommandées",
};

interface NextStepsProps {
  steps: NextStep[];
  title?: string;
  subtitle?: string;
}

const NextSteps = ({ steps, title, subtitle }: NextStepsProps) => {
  const { lang } = useLanguage();
  if (!steps.length) return null;

  const resolvedTitle = title || defaultTitles[lang] || defaultTitles.es;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">{resolvedTitle}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
      </ScrollReveal>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const Icon = typeIcons[step.type];
          const badge = typeLabels[step.type]?.[lang] || typeLabels[step.type]?.es;
          const cls = badgeClasses[step.type];
          return (
            <ScrollReveal key={step.to} delay={i * 0.04}>
              <Link
                to={step.to}
                className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-wine" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${cls}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold group-hover:text-wine transition-colors">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{step.description}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0" />
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default NextSteps;
