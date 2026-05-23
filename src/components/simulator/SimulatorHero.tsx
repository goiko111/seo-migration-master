import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, Wine, Wallet, MapPin, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const ICONS = [
  { Icon: BarChart3, title: "Estructura ideal", desc: "Nº de referencias óptimo para tu concepto" },
  { Icon: Wine,      title: "Distribución por tipo", desc: "Tinto, blanco, rosado, espumoso, copa" },
  { Icon: Wallet,    title: "Presupuesto estimado", desc: "Inversión primera compra calculada" },
  { Icon: MapPin,    title: "Geografía del vino", desc: "Nacional vs internacional, regiones top" },
  { Icon: TrendingUp, title: "Métricas financieras", desc: "Bev cost, margen, facturación mensual" },
  { Icon: Sparkles,  title: "Recomendaciones IA", desc: "Análisis personalizado por IA" },
];

export default function SimulatorHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="bg-gradient-to-b from-wine/5 to-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Diseña la carta de vinos perfecta para tu restaurante
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Basado en datos de +1.000 restaurantes. Gratis. En 3 minutos.
        </p>
        <Button size="lg" onClick={onStart} className="bg-wine hover:bg-wine-dark text-white">
          Empezar simulación <ArrowRight className="ml-2" />
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-14 text-left">
          {ICONS.map(({ Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-wine/15 bg-card">
              <Icon className="w-7 h-7 text-wine mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-wine/5 border border-wine/20 text-sm">
          <p className="mb-2">
            <strong>¿Ya tienes carta?</strong>{" "}
            <Link to="/analisis-carta" className="text-wine underline">Analízala aquí →</Link>
          </p>
          <p>
            <strong>¿Aún no tienes carta?</strong> Simúlala aquí ↓
          </p>
        </div>
      </div>
    </section>
  );
}