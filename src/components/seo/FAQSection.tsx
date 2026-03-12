import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <ScrollReveal className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
      </ScrollReveal>
      <Accordion type="multiple" className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${schemaId}-${i}`}
            className="rounded-xl border border-border bg-gradient-card px-6 data-[state=open]:border-wine/20 transition-colors"
          >
            <AccordionTrigger className="text-left font-heading font-semibold text-sm hover:no-underline py-5 gap-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
