import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface RelatedPage {
  slug: string;
  title: string;
  cluster: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
}

const clusterLabels: Record<string, string> = {
  city: "Ciudad",
  restaurant_type: "Tipo de restaurante",
  country: "País",
  grape: "Uva",
  region: "Región",
  style: "Estilo",
  pairing: "Maridaje",
  guide: "Guía",
  problem: "Problema",
  comparison: "Comparativa",
  resource: "Recurso",
};

const RelatedPages = ({ pages, title = "También te puede interesar" }: RelatedPagesProps) => {
  if (!pages.length) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-8">{title}</h2>
      </ScrollReveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page, i) => (
          <ScrollReveal key={page.slug} delay={i * 0.04}>
            <Link
              to={`/${page.slug}`}
              className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/50 transition-all"
            >
              <div className="flex-1">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-accent block mb-1">
                  {clusterLabels[page.cluster] || page.cluster}
                </span>
                <p className="text-sm font-medium group-hover:text-wine transition-colors">{page.title}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0 mt-1" />
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default RelatedPages;
