import ScrollReveal from "@/components/ScrollReveal";
import { type SupportedLang } from "@/i18n/types";

interface ArticleTableOfContentsProps {
  headings: string[];
  lang?: SupportedLang;
}

const labels: Record<SupportedLang, string> = {
  es: "Contenido del artículo",
  en: "Article contents",
  it: "Indice dell'articolo",
  fr: "Sommaire de l'article",
  de: "Inhalt des Artikels",
  pt: "Conteúdo do artigo",
};

const ArticleTableOfContents = ({ headings, lang = "es" }: ArticleTableOfContentsProps) => {
  if (headings.length < 2) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
      <ScrollReveal>
        <div className="p-6 md:p-8 rounded-xl border border-border bg-gradient-card">
          <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-accent mb-5">
            {labels[lang] || labels.es}
          </h2>
          <ol className="space-y-3">
            {headings.map((heading, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-wine font-semibold shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{heading}</span>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArticleTableOfContents;
