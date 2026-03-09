import { motion } from "framer-motion";
import { AlertTriangle, Users, HelpCircle, TrendingDown, Package } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const problems = [
  { icon: Users, text: "El personal no tiene tiempo ni conocimiento para recomendar vinos." },
  { icon: HelpCircle, text: "Los clientes no entienden la carta." },
  { icon: TrendingDown, text: "La mayoría acaba pidiendo el vino más barato." },
  { icon: Package, text: "Muchos vinos se quedan sin rotación." },
];

const ProblemSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <AlertTriangle size={14} className="text-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">El problema</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            El vino debería ser tu mayor margen…{" "}
            <span className="text-gradient-wine italic">pero rara vez lo es.</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-wine" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{problem.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <div className="inline-block bg-gradient-card rounded-2xl border border-wine/20 px-8 py-6 glow-wine">
              <p className="font-heading text-xl md:text-2xl font-semibold text-foreground/90 italic">
                "La carta informa, pero <span className="text-gradient-wine">no vende.</span>"
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemSection;
