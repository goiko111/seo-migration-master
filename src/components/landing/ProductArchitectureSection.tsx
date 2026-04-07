import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const data: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  layers: { name: string; verb: string; description: string; href: string }[];
  flow: [string, string, string];
}> = {
  es: {
    badge: "Arquitectura de producto",
    title: "Tres capas. Un mismo objetivo: ",
    titleHighlight: "gestionar mejor todo el negocio del vino.",
    subtitle: "Winerim combina una capa analítica profunda, una capa de acción dinámica y una nueva capa de inteligencia de compras.",
    layers: [
      { name: "Winerim Core", verb: "Analiza", description: "Margen, rotación, rentabilidad y rendimiento de cada referencia.", href: "/producto/winerim-core" },
      { name: "Inteligencia Dinámica", verb: "Actúa", description: "Prioriza, reordena y activa estrategias según contexto y objetivos.", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Compra mejor", description: "Detecta sobrecostes, capital inmovilizado y oportunidades de compra.", href: "/producto/winerim-supply" },
    ],
    flow: ["Comprar mejor", "Analizar mejor", "Vender mejor"],
  },
  en: {
    badge: "Product architecture",
    title: "Three layers. One goal: ",
    titleHighlight: "better management of the entire wine business.",
    subtitle: "Winerim combines a deep analytics layer, a dynamic action layer, and a new purchasing intelligence layer.",
    layers: [
      { name: "Winerim Core", verb: "Analyses", description: "Margin, rotation, profitability and performance of every reference.", href: "/producto/winerim-core" },
      { name: "Dynamic Intelligence", verb: "Acts", description: "Prioritises, reorders and activates strategies based on context and goals.", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Buys smarter", description: "Detects overspend, tied-up capital and purchasing opportunities.", href: "/producto/winerim-supply" },
    ],
    flow: ["Buy smarter", "Analyse better", "Sell better"],
  },
  it: {
    badge: "Architettura di prodotto",
    title: "Tre livelli. Un unico obiettivo: ",
    titleHighlight: "gestire meglio tutto il business del vino.",
    subtitle: "Winerim combina un livello analitico profondo, un livello d'azione dinamica e un nuovo livello di intelligenza d'acquisto.",
    layers: [
      { name: "Winerim Core", verb: "Analizza", description: "Margine, rotazione, redditività e rendimento di ogni referenza.", href: "/producto/winerim-core" },
      { name: "Intelligenza Dinamica", verb: "Agisce", description: "Prioritizza, riordina e attiva strategie in base al contesto e agli obiettivi.", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Acquista meglio", description: "Rileva sovracosti, capitale immobilizzato e opportunità d'acquisto.", href: "/producto/winerim-supply" },
    ],
    flow: ["Comprare meglio", "Analizzare meglio", "Vendere meglio"],
  },
  fr: {
    badge: "Architecture produit",
    title: "Trois couches. Un seul objectif : ",
    titleHighlight: "mieux gérer tout le business du vin.",
    subtitle: "Winerim combine une couche analytique profonde, une couche d'action dynamique et une nouvelle couche d'intelligence d'achat.",
    layers: [
      { name: "Winerim Core", verb: "Analyse", description: "Marge, rotation, rentabilité et performance de chaque référence.", href: "/producto/winerim-core" },
      { name: "Intelligence Dynamique", verb: "Agit", description: "Priorise, réordonne et active des stratégies selon le contexte et les objectifs.", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Achète mieux", description: "Détecte les surcoûts, le capital immobilisé et les opportunités d'achat.", href: "/producto/winerim-supply" },
    ],
    flow: ["Mieux acheter", "Mieux analyser", "Mieux vendre"],
  },
};

const layerStyles = [
  { accent: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: BarChart3 },
  { accent: "text-wine", bg: "bg-wine/10", border: "border-wine/20", icon: Zap },
  { accent: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: ShoppingCart },
];

const ProductArchitectureSection = () => {
  const { lang } = useLanguage();
  const d = data[lang] || data.es;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-wine/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-4">
              <span className="w-1 h-1 rounded-full bg-wine/50" />
              {d.badge}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              {d.title}
              <span className="text-gradient-wine">{d.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {d.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-10">
          {d.layers.map((layer, i) => {
            const style = layerStyles[i];
            return (
              <ScrollReveal key={layer.name} delay={i * 0.08}>
                <Link
                  to={layer.href}
                  className={`group relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border ${style.border} bg-card/70 backdrop-blur-sm hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
                >
                  <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center mb-4`}>
                    <style.icon size={18} className={style.accent} />
                  </div>
                  <h3 className="font-heading text-sm font-bold tracking-wide uppercase text-foreground mb-1">
                    {layer.name}
                  </h3>
                  <span className={`text-xs font-semibold tracking-widest uppercase ${style.accent} mb-2`}>
                    {layer.verb}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                  <ArrowRight size={14} className="mt-3 text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground">
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-emerald-500"
            >
              {d.flow[0]}
            </motion.span>
            <span className="text-border">→</span>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="text-amber-500"
            >
              {d.flow[1]}
            </motion.span>
            <span className="text-border">→</span>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-wine"
            >
              {d.flow[2]}
            </motion.span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductArchitectureSection;
