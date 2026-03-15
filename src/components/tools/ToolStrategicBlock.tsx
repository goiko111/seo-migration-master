import { Link } from "react-router-dom";
import { ArrowRight, Target, ShieldCheck, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface ToolStrategicBlockProps {
  decides: string[];
  avoids: string[];
  impact: string[];
  layer: "core" | "supply";
}

const layerConfig = {
  core: {
    label: "Winerim Core",
    desc: "Esta herramienta replica una de las capacidades analíticas que Winerim Core ejecuta en continuo: con datos reales, conectados y actualizados automáticamente.",
    href: "/producto/winerim-core",
    color: "amber",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/5",
    textClass: "text-amber-400",
    dotClass: "bg-amber-400",
  },
  supply: {
    label: "Winerim Supply",
    desc: "Esta herramienta simula una de las capacidades de inteligencia de compras que Winerim Supply automatiza con datos conectados en tiempo real.",
    href: "/producto/winerim-supply",
    color: "emerald",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    textClass: "text-emerald-400",
    dotClass: "bg-emerald-400",
  },
};

const ToolStrategicBlock = ({ decides, avoids, impact, layer }: ToolStrategicBlockProps) => {
  const cfg = layerConfig[layer];

  return (
    <>
      {/* Strategic context: Decides / Avoids / Impact */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-8">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-border bg-gradient-card">
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} className="text-wine" />
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">Qué decide</p>
              </div>
              <ul className="space-y-2">
                {decides.map((d, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-wine shrink-0 mt-2" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-border bg-gradient-card">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-wine" />
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">Qué evita</p>
              </div>
              <ul className="space-y-2">
                {avoids.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-wine shrink-0 mt-2" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-border bg-gradient-card">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-wine" />
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">Impacto potencial</p>
              </div>
              <ul className="space-y-2">
                {impact.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-wine shrink-0 mt-2" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Product layer reference */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-10">
        <ScrollReveal>
          <div className={`rounded-xl border ${cfg.borderClass} ${cfg.bgClass} p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
            <div className={`w-2 h-2 rounded-full ${cfg.dotClass} shrink-0 hidden sm:block`} />
            <div className="flex-1">
              <p className={`text-xs font-semibold tracking-widest uppercase ${cfg.textClass} mb-1`}>
                Parte de {cfg.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cfg.desc}
              </p>
            </div>
            <Link
              to={cfg.href}
              className={`inline-flex items-center gap-2 text-sm font-semibold ${cfg.textClass} hover:opacity-80 transition-opacity tracking-wider uppercase whitespace-nowrap shrink-0`}
            >
              Ver {cfg.label} <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default ToolStrategicBlock;
