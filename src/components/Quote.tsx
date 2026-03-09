import { useSharedPageContent } from "@/contexts/PageContentContext";
import ScrollReveal from "./ScrollReveal";

const Quote = () => {
  const { get } = useSharedPageContent();

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-wine to-transparent mx-auto mb-10" />
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl italic text-foreground/90 leading-relaxed mb-8">
            "{get("quote", "text", "Quien sabe degustar, no bebe jamás el vino, sino que degusta sus secretos")}"
          </blockquote>
          <div className="w-12 h-px bg-gold mx-auto mb-4" />
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
            {get("quote", "author", "Salvador Dalí")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Quote;
