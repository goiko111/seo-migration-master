import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  schemaId?: string;
  className?: string;
}

const FAQSection = ({ faqs, title = "Preguntas frecuentes", schemaId = "faq", className = "" }: FAQSectionProps) => {
  useEffect(() => {
    if (!faqs.length) return;
    const script = document.createElement("script");
    script.id = `faq-schema-${schemaId}`;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    const existing = document.getElementById(`faq-schema-${schemaId}`);
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [faqs, schemaId]);

  if (!faqs.length) return null;

  return (
    <section className={`max-w-3xl mx-auto px-6 md:px-12 py-20 ${className}`}>
      <ScrollReveal className="text-center mb-14">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
      </ScrollReveal>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <details className="group bg-gradient-card rounded-xl border border-border hover:border-wine/20 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-semibold">
                <span className="pr-4">{faq.q}</span>
                <span className="text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
