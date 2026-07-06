import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, PieChart, RotateCcw, Target, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";

type WineRow = {
  name: string;
  revenue: string;
  margin: string;
  stock: string;
  days: string;
};

type SegmentKey = "core" | "ballast" | "exploration" | "support";

const initialRows: WineRow[] = [
  { name: "Rioja crianza", revenue: "1800", margin: "62", stock: "18", days: "12" },
  { name: "Ribera premium", revenue: "1200", margin: "58", stock: "9", days: "28" },
  { name: "Albariño", revenue: "950", margin: "66", stock: "12", days: "6" },
  { name: "Champagne", revenue: "460", margin: "54", stock: "14", days: "95" },
  { name: "Verdejo joven", revenue: "420", margin: "48", stock: "30", days: "70" },
  { name: "Priorat", revenue: "180", margin: "64", stock: "11", days: "160" },
];

const parseNumber = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const euroFormatters = {
  es: new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  de: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  pt: new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
};

const pageCopy = {
  es: {
    eyebrow: "Demo · Pareto de carta",
    intro: "Identifica qué referencias sostienen el margen, cuáles solo acompañan y cuáles podrían estar ocupando carta, stock y atención sin aportar suficiente retorno.",
    inputTitle: "Introduce referencias clave",
    inputSubtitle: "Usa facturación y margen estimados del último mes.",
    fields: {
      reference: "Referencia",
      revenue: "Ventas €",
      margin: "Margen %",
      stock: "Stock",
      days: "Días sin venta",
    },
    calculate: "Calcular Pareto",
    reset: "Restaurar ejemplo",
    reading: "Lectura Pareto",
    coreCount: (count: number) => `${count} referencias sostienen el núcleo`,
    revenue: "Facturación",
    weightedMargin: "Margen ponderado",
    refsToReview: "Refs. a revisar",
    marginShare: (share: number, cumulative: number) => `${share}% del margen simulado · acumulado ${cumulative}%`,
    segments: {
      core: { label: "Núcleo", action: "Proteger disponibilidad y discurso de venta" },
      ballast: { label: "Lastre", action: "No reponer y mover por recomendación controlada" },
      exploration: { label: "Exploración", action: "Probar con maridaje, copa o carta destacada" },
      support: { label: "Soporte", action: "Mantener si cubre una función clara" },
    } as Record<SegmentKey, { label: string; action: string }>,
    cards: [
      { icon: Target, title: "Núcleo", text: "Vinos que sostienen el margen. Hay que proteger disponibilidad, discurso y PVP." },
      { icon: Wine, title: "Exploración", text: "Referencias con sentido de carta pero todavía sin tracción suficiente. Necesitan una hipótesis." },
      { icon: CheckCircle, title: "Lastre", text: "Vinos con stock, días sin venta o baja contribución. No siempre sobran, pero hay que justificarlos." },
    ],
    ctaEyebrow: "Pareto automático",
    ctaTitle: "Winerim encuentra el 20% que sostiene tu carta sin hojas manuales.",
    ctaText: "La plataforma cruza ventas, stock, PVP, coste, rotación y señales de Márgenes para saber qué proteger, qué empujar y qué dejar de comprar.",
    ctaPrimary: "Descargar auditoría Pareto 80/20",
    ctaSecondary: "Solicitar demo",
    faqs: [
      { q: "¿Qué es el Pareto 80/20 aplicado a una carta de vinos?", a: "Es una lectura para detectar qué pocas referencias concentran gran parte de la facturación o margen, y cuáles consumen espacio y stock con poco retorno." },
      { q: "¿Un vino fuera del núcleo debería eliminarse?", a: "No necesariamente. Puede tener función gastronómica, de imagen o de maridaje. Lo importante es que su función esté clara." },
      { q: "¿Cómo se calcula en Winerim?", a: "Con datos conectados de carta, ventas, stock, coste, PVP, rotación y señales de Márgenes, no con estimaciones manuales." },
    ],
    relatedTitle: "Sigue analizando rentabilidad",
    relatedLinks: [
      { to: "/herramientas/calculadora-fuga-margen", label: "Calculadora de fuga de margen", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
      { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Guía para detectar vinos muertos", type: "guide" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
    ],
  },
  de: {
    eyebrow: "Demo · Pareto der Weinkarte",
    intro: "Erkennen Sie, welche Referenzen die Marge tragen, welche nur begleiten und welche Karte, Bestand und Aufmerksamkeit belegen, ohne genug Rendite zu liefern.",
    inputTitle: "Schlüsselreferenzen eingeben",
    inputSubtitle: "Nutzen Sie geschätzten Umsatz und Marge des letzten Monats.",
    fields: {
      reference: "Referenz",
      revenue: "Verkäufe €",
      margin: "Marge %",
      stock: "Bestand",
      days: "Tage ohne Verkauf",
    },
    calculate: "Pareto berechnen",
    reset: "Beispiel zurücksetzen",
    reading: "Pareto-Auswertung",
    coreCount: (count: number) => `${count} Referenzen tragen den Kern`,
    revenue: "Umsatz",
    weightedMargin: "Gewichtete Marge",
    refsToReview: "Zu prüfende Ref.",
    marginShare: (share: number, cumulative: number) => `${share}% der simulierten Marge · kumuliert ${cumulative}%`,
    segments: {
      core: { label: "Kern", action: "Verfügbarkeit und Verkaufsargumentation schützen" },
      ballast: { label: "Ballast", action: "Nicht nachkaufen und gezielt über Empfehlungen bewegen" },
      exploration: { label: "Erkundung", action: "Mit Pairing, Glaswein oder hervorgehobener Karte testen" },
      support: { label: "Stütze", action: "Behalten, wenn eine klare Funktion erfüllt wird" },
    } as Record<SegmentKey, { label: string; action: string }>,
    cards: [
      { icon: Target, title: "Kern", text: "Weine, die die Marge tragen. Verfügbarkeit, Verkaufssprache und Verkaufspreis müssen geschützt werden." },
      { icon: Wine, title: "Erkundung", text: "Referenzen mit Sinn für die Karte, aber noch ohne ausreichende Traktion. Sie brauchen eine Hypothese." },
      { icon: CheckCircle, title: "Ballast", text: "Weine mit Bestand, Tagen ohne Verkauf oder niedrigem Beitrag. Sie sind nicht immer überflüssig, müssen aber begründet werden." },
    ],
    ctaEyebrow: "Automatischer Pareto",
    ctaTitle: "Winerim findet die 20%, die Ihre Karte tragen, ohne manuelle Tabellen.",
    ctaText: "Die Plattform verbindet Verkäufe, Bestand, Verkaufspreis, Kosten, Rotation und Margensignale, damit Sie wissen, was geschützt, aktiv verkauft und nicht mehr gekauft werden sollte.",
    ctaPrimary: "Pareto-80/20-Audit herunterladen",
    ctaSecondary: "Demo anfragen",
    faqs: [
      { q: "Was bedeutet Pareto 80/20 bei einer Weinkarte?", a: "Es ist eine Auswertung, die zeigt, welche wenigen Referenzen einen großen Teil von Umsatz oder Marge konzentrieren und welche Platz und Bestand mit wenig Rendite verbrauchen." },
      { q: "Sollte ein Wein außerhalb des Kerns entfernt werden?", a: "Nicht unbedingt. Er kann eine gastronomische, imagebildende oder Pairing-Funktion haben. Wichtig ist, dass diese Funktion klar ist." },
      { q: "Wie wird das in Winerim berechnet?", a: "Mit verbundenen Daten aus Karte, Verkäufen, Bestand, Kosten, Verkaufspreis, Rotation und Margensignalen, nicht mit manuellen Schätzungen." },
    ],
    relatedTitle: "Rentabilität weiter analysieren",
    relatedLinks: [
      { to: "/herramientas/calculadora-fuga-margen", label: "Margenverlust-Rechner", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Margensignal-Simulator", type: "tool" },
      { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Leitfaden zum Erkennen toter Weine", type: "guide" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz", type: "solution" },
    ],
  },
  pt: {
    eyebrow: "Demo · Pareto da carta",
    intro: "Identifique que referências sustentam a margem, quais apenas acompanham e quais podem estar a ocupar carta, stock e atenção sem retorno suficiente.",
    inputTitle: "Introduza referências-chave",
    inputSubtitle: "Use faturação e margem estimadas do último mês.",
    fields: {
      reference: "Referência",
      revenue: "Vendas €",
      margin: "Margem %",
      stock: "Stock",
      days: "Dias sem venda",
    },
    calculate: "Calcular Pareto",
    reset: "Restaurar exemplo",
    reading: "Leitura Pareto",
    coreCount: (count: number) => `${count} referências sustentam o núcleo`,
    revenue: "Faturação",
    weightedMargin: "Margem ponderada",
    refsToReview: "Refs. a rever",
    marginShare: (share: number, cumulative: number) => `${share}% da margem simulada · acumulado ${cumulative}%`,
    segments: {
      core: { label: "Núcleo", action: "Proteger disponibilidade e discurso de venda" },
      ballast: { label: "Lastro", action: "Não repor e mover por recomendação controlada" },
      exploration: { label: "Exploração", action: "Testar com harmonização, copo ou destaque na carta" },
      support: { label: "Suporte", action: "Manter se cumprir uma função clara" },
    } as Record<SegmentKey, { label: string; action: string }>,
    cards: [
      { icon: Target, title: "Núcleo", text: "Vinhos que sustentam a margem. É preciso proteger disponibilidade, discurso e PVP." },
      { icon: Wine, title: "Exploração", text: "Referências com sentido de carta, mas ainda sem tração suficiente. Precisam de uma hipótese." },
      { icon: CheckCircle, title: "Lastro", text: "Vinhos com stock, dias sem venda ou baixa contribuição. Nem sempre sobram, mas é preciso justificá-los." },
    ],
    ctaEyebrow: "Pareto automático",
    ctaTitle: "A Winerim encontra os 20% que sustentam a sua carta sem folhas manuais.",
    ctaText: "A plataforma cruza vendas, stock, PVP, custo, rotação e sinais de Margens para saber o que proteger, o que impulsionar e o que deixar de comprar.",
    ctaPrimary: "Descarregar auditoria Pareto 80/20",
    ctaSecondary: "Solicitar demo",
    faqs: [
      { q: "O que é o Pareto 80/20 aplicado a uma carta de vinhos?", a: "É uma leitura para detetar que poucas referências concentram grande parte da faturação ou margem, e quais consomem espaço e stock com pouco retorno." },
      { q: "Um vinho fora do núcleo deve ser eliminado?", a: "Não necessariamente. Pode ter função gastronómica, de imagem ou de harmonização. O importante é que a sua função esteja clara." },
      { q: "Como é calculado na Winerim?", a: "Com dados ligados de carta, vendas, stock, custo, PVP, rotação e sinais de Margens, não com estimativas manuais." },
    ],
    relatedTitle: "Continue a analisar rentabilidade",
    relatedLinks: [
      { to: "/herramientas/calculadora-fuga-margen", label: "Calculadora de fuga de margem", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de sinal de Margens", type: "tool" },
      { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Guia para detetar vinhos mortos", type: "guide" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligência dinâmica", type: "solution" },
    ],
  },
};

const seoCopy = {
  es: {
    title: "Simulador Pareto 80/20 para carta de vinos",
    description: "Descubre qué vinos sostienen la facturación y margen de tu carta, cuáles son soporte y cuáles pueden estar frenando rentabilidad.",
    tools: "Herramientas",
    breadcrumb: "Simulador Pareto 80/20",
  },
  en: {
    title: "Pareto 80/20 simulator for wine lists",
    description: "Discover which wines sustain revenue and margin in your list, which support the offer and which may be slowing profitability.",
    tools: "Tools",
    breadcrumb: "Pareto 80/20 simulator",
  },
  it: {
    title: "Simulatore Pareto 80/20 per carta dei vini",
    description: "Scopri quali vini sostengono fatturato e margine della tua carta, quali fanno da supporto e quali possono frenare la redditività.",
    tools: "Strumenti",
    breadcrumb: "Simulatore Pareto 80/20",
  },
  fr: {
    title: "Simulateur Pareto 80/20 pour carte des vins",
    description: "Découvrez quels vins soutiennent le chiffre d'affaires et la marge de votre carte, lesquels jouent un rôle de support et lesquels peuvent freiner la rentabilité.",
    tools: "Outils",
    breadcrumb: "Simulateur Pareto 80/20",
  },
  de: {
    title: "Pareto-80/20-Simulator für Weinkarten",
    description: "Erkennen Sie, welche Weine Umsatz und Marge Ihrer Karte tragen, welche die Auswahl stützen und welche Rentabilität bremsen können.",
    tools: "Tools",
    breadcrumb: "Pareto-80/20-Simulator",
  },
  pt: {
    title: "Simulador Pareto 80/20 para cartas de vinho",
    description: "Descubra que vinhos sustentam faturação e margem da carta, quais servem de suporte e quais podem travar a rentabilidade.",
    tools: "Ferramentas",
    breadcrumb: "Simulador Pareto 80/20",
  },
};

const SimuladorParetoCarta = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const s = seoCopy[lang] || seoCopy.es;
  const copy = pageCopy[lang] || pageCopy.es;
  const euro = euroFormatters[lang as keyof typeof euroFormatters] || euroFormatters.es;
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/simulador-pareto-carta-vinos")}`;
  const [rows, setRows] = useState(initialRows);

  const result = useMemo(() => {
    const enriched = rows
      .map((row) => {
        const revenue = parseNumber(row.revenue);
        const margin = parseNumber(row.margin);
        const stock = parseNumber(row.stock);
        const days = parseNumber(row.days);
        const contribution = revenue * (margin / 100);
        return { ...row, revenue, margin, stock, days, contribution };
      })
      .sort((a, b) => b.contribution - a.contribution);

    const totalRevenue = enriched.reduce((sum, row) => sum + row.revenue, 0);
    const totalContribution = enriched.reduce((sum, row) => sum + row.contribution, 0);
    let cumulative = 0;
    const classified = enriched.map((row, index) => {
      cumulative += row.contribution;
      const share = totalContribution > 0 ? row.contribution / totalContribution : 0;
      const cumulativeShare = totalContribution > 0 ? cumulative / totalContribution : 0;
      const segmentKey: SegmentKey =
        cumulativeShare <= 0.8
          ? "core"
          : row.stock >= 10 && row.days >= 90
            ? "ballast"
            : row.margin >= 60 && row.revenue < totalRevenue * 0.08
              ? "exploration"
              : "support";
      return { ...row, index, share, cumulativeShare, segmentKey };
    });

    const topCount = classified.filter((row) => row.segmentKey === "core").length;
    return { classified, totalRevenue, totalContribution, topCount };
  }, [rows]);

  const updateRow = (index: number, key: keyof WineRow, value: string) => {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={s.title}
        description={s.description}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/simulador-pareto-carta-vinos")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: s.tools, href: localePath("/herramientas") }, { label: s.breadcrumb }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {copy.eyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {copy.intro}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid xl:grid-cols-[1.15fr_0.85fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <PieChart size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{copy.inputTitle}</h2>
                  <p className="text-sm text-muted-foreground">{copy.inputSubtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div key={index} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="grid md:grid-cols-[1.2fr_repeat(4,minmax(0,0.8fr))] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`wine-${index}`}>{copy.fields.reference}</Label>
                        <Input id={`wine-${index}`} value={row.name} onChange={(e) => updateRow(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`revenue-${index}`}>{copy.fields.revenue}</Label>
                        <Input id={`revenue-${index}`} inputMode="decimal" value={row.revenue} onChange={(e) => updateRow(index, "revenue", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`margin-${index}`}>{copy.fields.margin}</Label>
                        <Input id={`margin-${index}`} inputMode="decimal" value={row.margin} onChange={(e) => updateRow(index, "margin", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`stock-${index}`}>{copy.fields.stock}</Label>
                        <Input id={`stock-${index}`} inputMode="decimal" value={row.stock} onChange={(e) => updateRow(index, "stock", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`days-${index}`}>{copy.fields.days}</Label>
                        <Input id={`days-${index}`} inputMode="decimal" value={row.days} onChange={(e) => updateRow(index, "days", e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  className="flex-1 bg-wine hover:bg-wine/90"
                  onClick={() => trackAction("tool_use", "tool", "simulador-pareto-carta-vinos")}
                >
                  {copy.calculate}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setRows(initialRows)}>
                  <RotateCcw size={16} className="mr-2" />
                  {copy.reset}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{copy.reading}</p>
                  <h2 className="font-heading text-2xl font-semibold">{copy.coreCount(result.topCount)}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-wine/30 bg-wine/10 px-3 py-1.5 text-xs font-semibold text-wine">
                  <BarChart3 size={14} />
                  {euro.format(result.totalContribution)}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-6">
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.revenue}</p>
                  <p className="text-2xl font-semibold mt-1">{euro.format(result.totalRevenue)}</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.weightedMargin}</p>
                  <p className="text-2xl font-semibold mt-1">{result.totalRevenue > 0 ? Math.round((result.totalContribution / result.totalRevenue) * 100) : 0}%</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.refsToReview}</p>
                  <p className="text-2xl font-semibold mt-1">{result.classified.filter((row) => row.segmentKey === "ballast").length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {result.classified.map((row) => (
                  <div key={row.name} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold">{row.name}</p>
                        <p className="text-xs text-muted-foreground">{copy.segments[row.segmentKey].action}</p>
                      </div>
                      <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine">{copy.segments[row.segmentKey].label}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-wine" style={{ width: `${Math.round(row.cumulativeShare * 100)}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{copy.marginShare(Math.round(row.share * 100), Math.round(row.cumulativeShare * 100))}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {copy.cards.map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{copy.ctaEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{copy.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {copy.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/auditoria-pareto-80-20-carta-vinos")}>{copy.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/demo")}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="simulador-pareto-carta-vinos"
          faqs={copy.faqs}
        />

        <InternalLinks
          title={copy.relatedTitle}
          links={copy.relatedLinks.map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorParetoCarta;
