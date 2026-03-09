import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        setDisplay(target);
      } else {
        setDisplay(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>+{display}{suffix}</span>;
};

const metrics = [
  { value: 20, suffix: "%", label: "Incremento medio en ventas de vino", color: "from-wine to-wine-light" },
  { value: 15, suffix: "%", label: "Aumento del ticket medio", color: "from-accent to-gold-light" },
  { value: 30, suffix: "%", label: "Más rotación de referencias", color: "from-wine-light to-accent" },
];

const ResultsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Resultados</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Resultados reales en restaurantes
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative bg-gradient-card rounded-2xl border border-border p-8 text-center hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                {/* Subtle gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <p className="font-heading text-5xl md:text-6xl font-bold text-gradient-wine mb-4">
                  <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{metric.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
