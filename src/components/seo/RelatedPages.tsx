import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface RelatedPage {
  slug: string;
  title: string;
  cluster: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
}

const clusterLabels: Record<string, Record<string, string>> = {
  city: { es: "Ciudad", en: "City", it: "Città", fr: "Ville", de: "Stadt", pt: "Cidade" },
  restaurant_type: { es: "Tipo de restaurante", en: "Restaurant type", it: "Tipo di ristorante", fr: "Type de restaurant", de: "Restauranttyp", pt: "Tipo de restaurante" },
  country: { es: "País", en: "Country", it: "Paese", fr: "Pays", de: "Land", pt: "País" },
  grape: { es: "Uva", en: "Grape", it: "Uva", fr: "Cépage", de: "Rebsorte", pt: "Uva" },
  region: { es: "Región", en: "Region", it: "Regione", fr: "Région", de: "Region", pt: "Região" },
  style: { es: "Estilo", en: "Style", it: "Stile", fr: "Style", de: "Stil", pt: "Estilo" },
  pairing: { es: "Maridaje", en: "Pairing", it: "Abbinamento", fr: "Accord", de: "Paarung", pt: "Harmonização" },
  guide: { es: "Guía", en: "Guide", it: "Guida", fr: "Guide", de: "Ratgeber", pt: "Guia" },
  problem: { es: "Problema", en: "Problem", it: "Problema", fr: "Problème", de: "Problem", pt: "Problema" },
  comparison: { es: "Comparativa", en: "Comparison", it: "Confronto", fr: "Comparatif", de: "Vergleich", pt: "Comparação" },
  resource: { es: "Recurso", en: "Resource", it: "Risorsa", fr: "Ressource", de: "Ressource", pt: "Recurso" },
};

const defaultTitles: Record<string, string> = {
  es: "También te puede interesar",
  en: "You may also be interested in",
  it: "Potrebbe interessarti anche",
  fr: "Cela pourrait aussi vous intéresser",
  de: "Das könnte Sie auch interessieren",
  pt: "Também pode interessar-lhe",
};

const RelatedPages = ({ pages, title }: RelatedPagesProps) => {
  const { lang } = useLanguage();
  if (!pages.length) return null;

  const resolvedTitle = title || defaultTitles[lang] || defaultTitles.es;

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <ScrollReveal>
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-8">{resolvedTitle}</h2>
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
                  {clusterLabels[page.cluster]?.[lang] || clusterLabels[page.cluster]?.es || page.cluster}
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
