import { Link } from "react-router-dom";
import { Sparkles, Utensils, Filter, BarChart3, QrCode, Wine, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  { icon: Sparkles, title: "Recomendaciones IA", desc: "Sugerencias inteligentes para cada comensal." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "Propuestas instantáneas para cada plato." },
  { icon: Filter, title: "Filtros sensoriales", desc: "Busca por sabor, cuerpo o intensidad." },
  { icon: BarChart3, title: "Analítica de ventas", desc: "KPIs de tu carta de vinos en tiempo real." },
  { icon: QrCode, title: "Acceso por QR", desc: "Sin descargas, desde el móvil del comensal." },
  { icon: Wine, title: "Gestión de bodega", desc: "Stock, rotación y alertas automáticas." },
];

const FeaturesPreview = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Funcionalidades</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Todo lo que necesitas en <span className="text-gradient-wine italic">una plataforma</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Desde la experiencia del comensal hasta la gestión de tu bodega.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="text-center">
          <Link to="/funcionalidades"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent hover:text-accent/80 transition-colors">
            Ver todas las funcionalidades <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturesPreview;
