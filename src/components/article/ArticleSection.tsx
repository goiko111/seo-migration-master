import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScrollReveal from "@/components/ScrollReveal";

interface ArticleSectionProps {
  heading: string;
  content: string;
  index: number;
}

const ArticleSection = ({ heading, content, index }: ArticleSectionProps) => {
  const isAlt = index % 2 === 1;

  return (
    <section className={isAlt ? "bg-gradient-card border-y border-border py-16 md:py-20" : "py-16 md:py-20"}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
            {heading}
          </h2>
          <div className="article-section-body prose prose-lg prose-invert max-w-none
            prose-headings:font-heading prose-headings:text-foreground
            prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:border-l-4 prose-h3:border-l-accent prose-h3:pl-4
            prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-accent
            prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:text-base prose-p:md:text-lg prose-p:mb-6
            prose-strong:text-foreground prose-strong:font-bold
            prose-blockquote:border-l-accent prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:text-foreground/80 prose-blockquote:font-heading prose-blockquote:text-xl prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl
            prose-li:text-muted-foreground prose-li:leading-[1.85] prose-li:mb-3
            prose-ul:my-6 prose-ol:my-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:my-10
            prose-hr:border-border prose-hr:my-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <div className="overflow-x-auto rounded-xl border border-border my-8">
                    <table className="w-full border-collapse text-sm md:text-base">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-wine/10">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-bold text-foreground border-b-2 border-accent/30 whitespace-nowrap">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-muted-foreground border-b border-border">{children}</td>
                ),
                tr: ({ children, ...props }) => {
                  // Check if this is inside thead (the node prop isn't reliable, so we just style all tr)
                  return <tr className="hover:bg-wine/5 even:bg-[hsl(140,2%,12%)]">{children}</tr>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ArticleSection;
