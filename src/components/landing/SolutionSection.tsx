import { Sparkles, Utensils, BarChart3, Eye, ShoppingCart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  { icon: Sparkles, title: "Recomendaciones inteligentes", desc: "La IA sugiere vinos según preferencias, plato y contexto." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "Propuestas de maridaje instantáneas para cada plato del menú." },
  { icon: BarChart3, title: "Comparador de vinos", desc: "El comensal compara opciones con información clara y visual." },
  { icon: Eye, title: "Información visual y clara", desc: "Notas de cata accesibles, sin tecnicismos, con imágenes." },
  { icon: ShoppingCart, title: "Venta guiada", desc: "La carta conduce al cliente hacia mejores decisiones de compra." },
];

const SolutionSection = () => {
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La solución</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Una carta que <span className="text-gradient-wine italic">vende por ti</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Winerim transforma tu carta de vinos en una experiencia interactiva que guía al comensal hacia mejores decisiones.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 hover:glow-wine h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
