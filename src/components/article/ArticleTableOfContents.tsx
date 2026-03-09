import ScrollReveal from "@/components/ScrollReveal";

interface ArticleTableOfContentsProps {
  headings: string[];
}

const ArticleTableOfContents = ({ headings }: ArticleTableOfContentsProps) => {
  if (headings.length < 2) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
      <ScrollReveal>
        <div className="p-6 md:p-8 rounded-xl border border-border bg-gradient-card">
          <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-accent mb-5">
            Contenido del artículo
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
