import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Download, Lightbulb } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface InternalLink {
  to: string;
  label: string;
  type: "guide" | "tool" | "resource" | "solution";
}

const typeConfig = {
  guide: { icon: BookOpen, badge: "Guía", badgeClass: "text-accent" },
  tool: { icon: Calculator, badge: "Herramienta", badgeClass: "text-wine" },
  resource: { icon: Download, badge: "Recurso", badgeClass: "text-emerald-500" },
  solution: { icon: Lightbulb, badge: "Solución", badgeClass: "text-amber-500" },
};

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
}

const InternalLinks = ({ links, title = "Contenido relacionado" }: InternalLinksProps) => {
  if (!links.length) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">{title}</h2>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link, i) => {
          const config = typeConfig[link.type];
          const Icon = config.icon;
          return (
            <ScrollReveal key={link.to} delay={i * 0.04}>
              <Link
                to={link.to}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-wine" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-semibold tracking-widest uppercase ${config.badgeClass} block mb-0.5`}>
                    {config.badge}
                  </span>
                  <p className="text-sm font-medium group-hover:text-wine transition-colors truncate">
                    {link.label}
                  </p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0" />
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default InternalLinks;
