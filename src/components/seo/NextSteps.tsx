import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Download, Lightbulb, BarChart3, Wine } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type StepType = "guide" | "tool" | "resource" | "solution" | "benchmark" | "article";

export interface NextStep {
  to: string;
  label: string;
  description: string;
  type: StepType;
}

const typeConfig: Record<StepType, { icon: typeof Wine; badge: string; badgeClass: string }> = {
  guide: { icon: BookOpen, badge: "Guía", badgeClass: "text-accent" },
  tool: { icon: Calculator, badge: "Herramienta", badgeClass: "text-wine" },
  resource: { icon: Download, badge: "Recurso", badgeClass: "text-emerald-500" },
  solution: { icon: Lightbulb, badge: "Solución", badgeClass: "text-amber-500" },
  benchmark: { icon: BarChart3, badge: "Benchmark", badgeClass: "text-sky-500" },
  article: { icon: Wine, badge: "Artículo", badgeClass: "text-violet-500" },
};

interface NextStepsProps {
  steps: NextStep[];
  title?: string;
  subtitle?: string;
}

const NextSteps = ({ steps, title = "Siguientes pasos recomendados", subtitle }: NextStepsProps) => {
  if (!steps.length) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
      </ScrollReveal>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const config = typeConfig[step.type];
          const Icon = config.icon;
          return (
            <ScrollReveal key={step.to} delay={i * 0.04}>
              <Link
                to={step.to}
                className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-wine" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${config.badgeClass}`}>
                      {config.badge}
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
