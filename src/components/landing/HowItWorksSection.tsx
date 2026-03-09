import { Upload, Sparkles, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Importamos tu carta de vinos",
    desc: "Nos envías tu carta actual en cualquier formato. Nosotros nos encargamos de digitalizar y estructurar toda la información.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Winerim la convierte en experiencia digital",
    desc: "Nuestra IA genera descripciones, maridajes, filtros y recomendaciones inteligentes para cada referencia de tu bodega.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Empiezas a vender más vino",
    desc: "Tus clientes descubren, comparan y eligen con confianza. Tu ticket medio sube de forma natural desde el primer día.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Cómo funciona</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            3 pasos para vender más vino
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative text-center group">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-border/0" />
                  )}

                  <div className="relative inline-flex mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-card border border-border flex items-center justify-center group-hover:border-wine/30 group-hover:glow-wine transition-all duration-300">
                      <Icon size={36} className="text-wine" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-wine text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
