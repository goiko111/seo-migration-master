import { Link } from "react-router-dom";
import { ArrowRight, Target, ShieldCheck, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface ToolStrategicBlockProps {
  decides: string[];
  avoids: string[];
  impact: string[];
  layer: "core" | "supply";
}

const labels: Record<string, { decides: string; avoids: string; impact: string; partOf: string; see: string }> = {
  es: { decides: "Qué decide", avoids: "Qué evita", impact: "Impacto potencial", partOf: "Parte de", see: "Ver" },
  en: { decides: "What it decides", avoids: "What it prevents", impact: "Potential impact", partOf: "Part of", see: "See" },
  it: { decides: "Cosa decide", avoids: "Cosa evita", impact: "Impatto potenziale", partOf: "Parte di", see: "Vedi" },
  fr: { decides: "Ce qu'il décide", avoids: "Ce qu'il évite", impact: "Impact potentiel", partOf: "Fait partie de", see: "Voir" },
};

const layerConfig: Record<string, Record<string, { label: string; desc: string }>> = {
  es: {
    core: { label: "Winerim Core", desc: "Esta herramienta replica una de las capacidades analíticas que Winerim Core ejecuta en continuo: con datos reales, conectados y actualizados automáticamente." },
    supply: { label: "Winerim Supply", desc: "Esta herramienta simula una de las capacidades de inteligencia de compras que Winerim Supply automatiza con datos conectados en tiempo real." },
  },
  en: {
    core: { label: "Winerim Core", desc: "This tool replicates one of the analytical capabilities that Winerim Core runs continuously: with real, connected data updated automatically." },
    supply: { label: "Winerim Supply", desc: "This tool simulates one of the purchasing intelligence capabilities that Winerim Supply automates with real-time connected data." },
  },
  it: {
    core: { label: "Winerim Core", desc: "Questo strumento replica una delle capacità analitiche che Winerim Core esegue in continuo: con dati reali, connessi e aggiornati automaticamente." },
    supply: { label: "Winerim Supply", desc: "Questo strumento simula una delle capacità di intelligence degli acquisti che Winerim Supply automatizza con dati connessi in tempo reale." },
  },
  fr: {
    core: { label: "Winerim Core", desc: "Cet outil reproduit l'une des capacités analytiques que Winerim Core exécute en continu : avec des données réelles, connectées et mises à jour automatiquement." },
    supply: { label: "Winerim Supply", desc: "Cet outil simule l'une des capacités d'intelligence d'achat que Winerim Supply automatise avec des données connectées en temps réel." },
  },
};

const styleConfig = {
  core: {
    href: "/producto/winerim-core",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/5",
    textClass: "text-amber-400",
    dotClass: "bg-amber-400",
  },
  supply: {
    href: "/producto/winerim-supply",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    textClass: "text-emerald-400",
    dotClass: "bg-emerald-400",
  },
};

const ToolStrategicBlock = ({ decides, avoids, impact, layer }: ToolStrategicBlockProps) => {
  const { lang, localePath } = useLanguage();
  const l = labels[lang] || labels.es;
  const cfg = styleConfig[layer];
  const layerL = (layerConfig[lang] || layerConfig.es)[layer];

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-8">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-border bg-gradient-card">
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} className="text-wine" />
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">{l.decides}</p>
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
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">{l.avoids}</p>
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
                <p className="text-xs font-semibold tracking-widest uppercase text-wine">{l.impact}</p>
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

      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-10">
        <ScrollReveal>
          <div className={`rounded-xl border ${cfg.borderClass} ${cfg.bgClass} p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
            <div className={`w-2 h-2 rounded-full ${cfg.dotClass} shrink-0 hidden sm:block`} />
            <div className="flex-1">
              <p className={`text-xs font-semibold tracking-widest uppercase ${cfg.textClass} mb-1`}>
                {l.partOf} {layerL.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {layerL.desc}
              </p>
            </div>
            <Link
              to={localePath(cfg.href)}
              className={`inline-flex items-center gap-2 text-sm font-semibold ${cfg.textClass} hover:opacity-80 transition-opacity tracking-wider uppercase whitespace-nowrap shrink-0`}
            >
              {l.see} {layerL.label} <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default ToolStrategicBlock;
