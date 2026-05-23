// build trigger v6
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Download, Lightbulb, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface InternalLink {
  to: string;
  label: string;
  type: "guide" | "tool" | "resource" | "solution" | "decision-center";
}

const typeLabels: Record<string, Record<string, string>> = {
  guide: { es: "Guía", en: "Guide", it: "Guida", fr: "Guide", de: "Ratgeber", pt: "Guia" },
  tool: { es: "Herramienta", en: "Tool", it: "Strumento", fr: "Outil", de: "Werkzeug", pt: "Ferramenta" },
  resource: { es: "Recurso", en: "Resource", it: "Risorsa", fr: "Ressource", de: "Ressource", pt: "Recurso" },
  solution: { es: "Solución", en: "Solution", it: "Soluzione", fr: "Solution", de: "Lösung", pt: "Solução" },
  "decision-center": { es: "Decision Center", en: "Decision Center", it: "Decision Center", fr: "Decision Center", de: "Decision Center", pt: "Decision Center" },
  product: { es: "Producto", en: "Product", it: "Prodotto", fr: "Produit", de: "Produkt", pt: "Produto" },
  case_study: { es: "Caso de éxito", en: "Case Study", it: "Caso studio", fr: "Étude de cas", de: "Fallstudie", pt: "Caso de estudo" },
};

const defaultTitles: Record<string, string> = {
  es: "Contenido relacionado",
  en: "Related content",
  it: "Contenuti correlati",
  fr: "Contenu associé",
  de: "Verwandte Inhalte",
  pt: "Conteúdo relacionado",
};

const typeIcons: Record<string, typeof BookOpen> = {
  guide: BookOpen,
  tool: Calculator,
  resource: Download,
  solution: Lightbulb,
  "decision-center": Lightbulb,
  product: Sparkles,
  case_study: BookOpen,
};

const badgeClasses: Record<string, string> = {
  guide: "text-accent",
  tool: "text-wine",
  resource: "text-emerald-500",
  solution: "text-amber-500",
  "decision-center": "text-purple-500",
  product: "text-wine",
  case_study: "text-blue-500",
};

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
}

const InternalLinks = ({ links, title }: InternalLinksProps) => {
  const { lang } = useLanguage();
  if (!links.length) return null;

  const resolvedTitle = title || defaultTitles[lang] || defaultTitles.es;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">{resolvedTitle}</h2>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link, i) => {
          const Icon = typeIcons[link.type] || Lightbulb;
          const badge = typeLabels[link.type]?.[lang] || typeLabels[link.type]?.es || link.type;
          const cls = badgeClasses[link.type] || "text-wine";
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
                  <span className={`text-[10px] font-semibold tracking-widest uppercase ${cls} block mb-0.5`}>
                    {badge}
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
