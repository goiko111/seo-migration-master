import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface LeapBlock {
  label: string;
  them: string;
  us: string;
}

const data: Record<string, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  blocks: LeapBlock[];
  flowLabel: string;
  cta: string;
  capsules: { name: string; verb: string; href: string }[];
}> = {
  es: {
    badge: "Una categoría distinta",
    title: "Winerim no es solo una ",
    titleHighlight: "carta digital",
    subtitle: "Mientras otras soluciones solo muestran vinos, Winerim ayuda a vender mejor, comprar con más criterio y gobernar toda la categoría vino.",
    blocks: [
      { label: "Carta QR o PDF", them: "Muestra vinos", us: "Winerim guía la elección y mejora la experiencia del comensal" },
      { label: "Carta digital básica", them: "Digitaliza la carta", us: "Winerim analiza margen, rotación, pricing y salud de la carta" },
      { label: "Herramientas sueltas", them: "Resuelven una parte del problema", us: "Winerim conecta análisis, ejecución táctica e inteligencia de compras" },
      { label: "Gestión tradicional", them: "Depende de intuición y hojas de cálculo", us: "Winerim convierte el vino en una categoría gobernable con datos reales" },
    ],
    flowLabel: "Comprar mejor → Analizar mejor → Vender mejor",
    cta: "Ver cómo funciona Winerim",
    capsules: [
      { name: "Winerim Core", verb: "Analiza", href: "/producto/winerim-core" },
      { name: "Inteligencia Dinámica", verb: "Actúa", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Compra mejor", href: "/producto/winerim-supply" },
    ],
  },
  en: {
    badge: "A different category",
    title: "Winerim is not just a ",
    titleHighlight: "digital wine list",
    subtitle: "While other solutions only display wines, Winerim helps you sell better, buy smarter and govern the entire wine category.",
    blocks: [
      { label: "QR or PDF list", them: "Displays wines", us: "Winerim guides the choice and enhances the guest experience" },
      { label: "Basic digital list", them: "Digitises the list", us: "Winerim analyses margin, rotation, pricing and list health" },
      { label: "Standalone tools", them: "Solve part of the problem", us: "Winerim connects analytics, tactical execution and purchasing intelligence" },
      { label: "Traditional management", them: "Relies on intuition and spreadsheets", us: "Winerim turns wine into a governable category with real data" },
    ],
    flowLabel: "Buy better → Analyse better → Sell better",
    cta: "See how Winerim works",
    capsules: [
      { name: "Winerim Core", verb: "Analyses", href: "/producto/winerim-core" },
      { name: "Dynamic Intelligence", verb: "Acts", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Buys smarter", href: "/producto/winerim-supply" },
    ],
  },
  it: {
    badge: "Una categoria diversa",
    title: "Winerim non è solo una ",
    titleHighlight: "carta digitale",
    subtitle: "Mentre altre soluzioni mostrano solo vini, Winerim aiuta a vendere meglio, acquistare con più criterio e governare l'intera categoria vino.",
    blocks: [
      { label: "Carta QR o PDF", them: "Mostra i vini", us: "Winerim guida la scelta e migliora l'esperienza dell'ospite" },
      { label: "Carta digitale base", them: "Digitalizza la carta", us: "Winerim analizza margine, rotazione, pricing e salute della carta" },
      { label: "Strumenti separati", them: "Risolvono parte del problema", us: "Winerim collega analisi, esecuzione tattica e intelligenza d'acquisto" },
      { label: "Gestione tradizionale", them: "Si basa su intuizione e fogli di calcolo", us: "Winerim trasforma il vino in una categoria governabile con dati reali" },
    ],
    flowLabel: "Comprare meglio → Analizzare meglio → Vendere meglio",
    cta: "Scopri come funziona Winerim",
    capsules: [
      { name: "Winerim Core", verb: "Analizza", href: "/producto/winerim-core" },
      { name: "Intelligenza Dinamica", verb: "Agisce", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Acquista meglio", href: "/producto/winerim-supply" },
    ],
  },
  fr: {
    badge: "Une catégorie différente",
    title: "Winerim n'est pas qu'une ",
    titleHighlight: "carte digitale",
    subtitle: "Alors que d'autres solutions se contentent d'afficher des vins, Winerim aide à mieux vendre, mieux acheter et piloter toute la catégorie vin.",
    blocks: [
      { label: "Carte QR ou PDF", them: "Affiche les vins", us: "Winerim guide le choix et améliore l'expérience du convive" },
      { label: "Carte digitale basique", them: "Digitalise la carte", us: "Winerim analyse marge, rotation, pricing et santé de la carte" },
      { label: "Outils isolés", them: "Résolvent une partie du problème", us: "Winerim relie analyse, exécution tactique et intelligence d'achat" },
      { label: "Gestion traditionnelle", them: "Repose sur l'intuition et les tableurs", us: "Winerim transforme le vin en catégorie pilotable avec des données réelles" },
    ],
    flowLabel: "Mieux acheter → Mieux analyser → Mieux vendre",
    cta: "Découvrir comment fonctionne Winerim",
    capsules: [
      { name: "Winerim Core", verb: "Analyse", href: "/producto/winerim-core" },
      { name: "Intelligence Dynamique", verb: "Agit", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Achète mieux", href: "/producto/winerim-supply" },
    ],
  },
  de: {
    badge: "Eine andere Kategorie",
    title: "Winerim ist nicht nur eine ",
    titleHighlight: "digitale Weinkarte",
    subtitle: "Während andere Lösungen nur Weine anzeigen, hilft Winerim dabei, besser zu verkaufen, klüger einzukaufen und die ganze Weinkategorie zu steuern.",
    blocks: [
      { label: "QR- oder PDF-Karte", them: "Zeigt Weine an", us: "Winerim führt die Wahl und verbessert die Gästeerfahrung" },
      { label: "Einfache digitale Karte", them: "Digitalisiert die Karte", us: "Winerim analysiert Marge, Rotation, Preise und Kartengesundheit" },
      { label: "Einzelne Werkzeuge", them: "Lösen einen Teil des Problems", us: "Winerim verbindet Analyse, taktische Umsetzung und Einkaufsintelligenz" },
      { label: "Traditionelles Management", them: "Beruht auf Intuition und Tabellen", us: "Winerim macht Wein mit echten Daten steuerbar" },
    ],
    flowLabel: "Besser einkaufen → Besser analysieren → Besser verkaufen",
    cta: "Sehen, wie Winerim funktioniert",
    capsules: [
      { name: "Winerim Core", verb: "Analysiert", href: "/producto/winerim-core" },
      { name: "Dynamische Intelligenz", verb: "Handelt", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Kauft besser", href: "/producto/winerim-supply" },
    ],
  },
  pt: {
    badge: "Uma categoria diferente",
    title: "A Winerim não é apenas uma ",
    titleHighlight: "carta digital",
    subtitle: "Enquanto outras soluções apenas mostram vinhos, a Winerim ajuda a vender melhor, comprar com mais critério e gerir toda a categoria vinho.",
    blocks: [
      { label: "Carta QR ou PDF", them: "Mostra vinhos", us: "A Winerim guia a escolha e melhora a experiência do cliente" },
      { label: "Carta digital básica", them: "Digitaliza a carta", us: "A Winerim analisa margem, rotação, pricing e saúde da carta" },
      { label: "Ferramentas soltas", them: "Resolvem uma parte do problema", us: "A Winerim liga análise, execução tática e inteligência de compras" },
      { label: "Gestão tradicional", them: "Depende de intuição e folhas de cálculo", us: "A Winerim transforma o vinho numa categoria gerível com dados reais" },
    ],
    flowLabel: "Comprar melhor → Analisar melhor → Vender melhor",
    cta: "Ver como funciona a Winerim",
    capsules: [
      { name: "Winerim Core", verb: "Analisa", href: "/producto/winerim-core" },
      { name: "Inteligência Dinâmica", verb: "Atua", href: "/producto/inteligencia-dinamica" },
      { name: "Winerim Supply", verb: "Compra melhor", href: "/producto/winerim-supply" },
    ],
  },
};

const capsuleStyles = [
  { accent: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: BarChart3 },
  { accent: "text-wine", bg: "bg-wine/10", border: "border-wine/20", icon: Zap },
  { accent: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: ShoppingCart },
];

const comparisonTableCopy: Record<string, {
  aria: string;
  caption: string;
  columns: string[];
  rows: string[][];
}> = {
  es: {
    aria: "Comparativa Winerim vs alternativas",
    caption: "Comparativa de soluciones de carta de vinos para restaurantes",
    columns: ["Característica", "Carta QR / PDF", "Carta digital básica", "Herramientas sueltas", "Gestión tradicional", "Winerim"],
    rows: [
      ["Recomendaciones con IA", "No", "No", "Parcial", "No", "Sí"],
      ["Maridajes automáticos", "No", "No", "No", "No", "Sí"],
      ["Analítica de ventas", "No", "Básica", "Parcial", "Manual", "Avanzada"],
      ["Control de stock", "No", "No", "Parcial", "Manual", "Automático"],
      ["Optimización de precios", "No", "No", "No", "Manual", "Con datos"],
      ["Multiidioma", "No", "Algunos", "No", "No", "6 idiomas"],
      ["Formación equipo", "No", "No", "No", "No", "Integrada"],
    ],
  },
  en: {
    aria: "Winerim vs alternatives comparison",
    caption: "Comparison of wine list solutions for restaurants",
    columns: ["Feature", "QR / PDF list", "Basic digital list", "Standalone tools", "Traditional management", "Winerim"],
    rows: [
      ["AI recommendations", "No", "No", "Partial", "No", "Yes"],
      ["Automatic pairings", "No", "No", "No", "No", "Yes"],
      ["Sales analytics", "No", "Basic", "Partial", "Manual", "Advanced"],
      ["Stock control", "No", "No", "Partial", "Manual", "Automatic"],
      ["Price optimization", "No", "No", "No", "Manual", "Data-driven"],
      ["Multilingual", "No", "Some", "No", "No", "6 languages"],
      ["Team training", "No", "No", "No", "No", "Integrated"],
    ],
  },
  it: {
    aria: "Confronto Winerim vs alternative",
    caption: "Confronto tra soluzioni per carta dei vini nei ristoranti",
    columns: ["Funzionalità", "Carta QR / PDF", "Carta digitale base", "Strumenti separati", "Gestione tradizionale", "Winerim"],
    rows: [
      ["Raccomandazioni IA", "No", "No", "Parziale", "No", "Sì"],
      ["Abbinamenti automatici", "No", "No", "No", "No", "Sì"],
      ["Analisi vendite", "No", "Base", "Parziale", "Manuale", "Avanzata"],
      ["Controllo stock", "No", "No", "Parziale", "Manuale", "Automatico"],
      ["Ottimizzazione prezzi", "No", "No", "No", "Manuale", "Con dati"],
      ["Multilingua", "No", "Alcuni", "No", "No", "6 lingue"],
      ["Formazione team", "No", "No", "No", "No", "Integrata"],
    ],
  },
  fr: {
    aria: "Comparaison Winerim vs alternatives",
    caption: "Comparaison des solutions de carte des vins pour restaurants",
    columns: ["Fonctionnalité", "Carte QR / PDF", "Carte digitale basique", "Outils isolés", "Gestion traditionnelle", "Winerim"],
    rows: [
      ["Recommandations IA", "Non", "Non", "Partiel", "Non", "Oui"],
      ["Accords automatiques", "Non", "Non", "Non", "Non", "Oui"],
      ["Analytique des ventes", "Non", "Basique", "Partiel", "Manuel", "Avancée"],
      ["Contrôle du stock", "Non", "Non", "Partiel", "Manuel", "Automatique"],
      ["Optimisation des prix", "Non", "Non", "Non", "Manuel", "Avec données"],
      ["Multilingue", "Non", "Certains", "Non", "Non", "6 langues"],
      ["Formation équipe", "Non", "Non", "Non", "Non", "Intégrée"],
    ],
  },
  de: {
    aria: "Vergleich Winerim vs Alternativen",
    caption: "Vergleich von Weinkarten-Lösungen für Restaurants",
    columns: ["Funktion", "QR- / PDF-Karte", "Einfache digitale Karte", "Einzelne Tools", "Traditionelles Management", "Winerim"],
    rows: [
      ["KI-Empfehlungen", "Nein", "Nein", "Teilweise", "Nein", "Ja"],
      ["Automatische Pairings", "Nein", "Nein", "Nein", "Nein", "Ja"],
      ["Verkaufsanalyse", "Nein", "Basis", "Teilweise", "Manuell", "Fortgeschritten"],
      ["Bestandskontrolle", "Nein", "Nein", "Teilweise", "Manuell", "Automatisch"],
      ["Preisoptimierung", "Nein", "Nein", "Nein", "Manuell", "Datenbasiert"],
      ["Mehrsprachigkeit", "Nein", "Einige", "Nein", "Nein", "6 Sprachen"],
      ["Teamschulung", "Nein", "Nein", "Nein", "Nein", "Integriert"],
    ],
  },
  pt: {
    aria: "Comparação Winerim vs alternativas",
    caption: "Comparação de soluções de carta de vinhos para restaurantes",
    columns: ["Funcionalidade", "Carta QR / PDF", "Carta digital básica", "Ferramentas soltas", "Gestão tradicional", "Winerim"],
    rows: [
      ["Recomendações com IA", "Não", "Não", "Parcial", "Não", "Sim"],
      ["Harmonizações automáticas", "Não", "Não", "Não", "Não", "Sim"],
      ["Análise de vendas", "Não", "Básica", "Parcial", "Manual", "Avançada"],
      ["Controlo de stock", "Não", "Não", "Parcial", "Manual", "Automático"],
      ["Otimização de preços", "Não", "Não", "Não", "Manual", "Com dados"],
      ["Multi-idioma", "Não", "Alguns", "Não", "Não", "6 idiomas"],
      ["Formação da equipa", "Não", "Não", "Não", "Não", "Integrada"],
    ],
  },
};

const CategoryLeapSection = () => {
  const { lang, localePath } = useLanguage();
  const d = data[lang] || data.es;
  const table = comparisonTableCopy[lang] || comparisonTableCopy.es;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-4">
              <span className="w-1 h-1 rounded-full bg-wine/50" />
              {d.badge}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {d.title}
              <span className="text-gradient-wine">{d.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {d.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 comparison blocks */}
        <div className="space-y-4 md:space-y-5 mb-14">
          {d.blocks.map((block, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="relative rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden group hover:border-wine/20 transition-all duration-300">
                {/* Label badge */}
                <div className="px-5 pt-4 pb-2 md:px-7 md:pt-5 md:pb-2">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60">
                    {block.label}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* Left: "them" */}
                  <div className="px-5 py-4 md:px-7 md:py-5 flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-muted flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{block.them}</p>
                  </div>

                  {/* Right: "us" */}
                  <div className="px-5 py-4 md:px-7 md:py-5 flex items-start gap-3 bg-wine/[0.03]">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-wine/15 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-wine" />
                    </span>
                    <p className="text-sm text-foreground leading-relaxed font-medium">{block.us}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Semantic comparison table for screen readers and bots */}
        <table className="sr-only" aria-label={table.aria}>
          <caption>{table.caption}</caption>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Flow phrase */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-10">
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-emerald-500"
            >
              {d.capsules[2].verb}
            </motion.span>
            <span className="text-border">→</span>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="text-amber-500"
            >
              {d.capsules[0].verb}
            </motion.span>
            <span className="text-border">→</span>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-wine"
            >
              {lang === "es" ? "Vender mejor" : lang === "en" ? "Sell better" : lang === "it" ? "Vendere meglio" : lang === "de" ? "Besser verkaufen" : lang === "pt" ? "Vender melhor" : "Mieux vendre"}
            </motion.span>
          </div>
        </ScrollReveal>

        {/* 3 capsules */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-10">
          {d.capsules.map((cap, i) => {
            const style = capsuleStyles[i];
            return (
              <ScrollReveal key={cap.name} delay={0.35 + i * 0.08}>
                <Link
                  to={localePath(cap.href)}
                  className={`group relative flex flex-col items-center text-center p-5 md:p-6 rounded-xl border ${style.border} bg-card/70 backdrop-blur-sm hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
                >
                  <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center mb-3`}>
                    <style.icon size={16} className={style.accent} />
                  </div>
                  <h3 className="font-heading text-xs font-bold tracking-wide uppercase text-foreground mb-0.5">
                    {cap.name}
                  </h3>
                  <span className={`text-[10px] font-semibold tracking-widest uppercase ${style.accent}`}>
                    {cap.verb}
                  </span>
                  <ArrowRight size={12} className="mt-2 text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center">
            <Link
              to={localePath("/demo")}
              className="inline-flex items-center gap-2 text-sm font-medium text-wine hover:text-wine-light transition-colors group"
            >
              {d.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CategoryLeapSection;
