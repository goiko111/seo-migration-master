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

const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

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
      const segment =
        cumulativeShare <= 0.8
          ? "Núcleo"
          : row.stock >= 10 && row.days >= 90
            ? "Lastre"
            : row.margin >= 60 && row.revenue < totalRevenue * 0.08
              ? "Exploración"
              : "Soporte";
      const action =
        segment === "Núcleo"
          ? "Proteger disponibilidad y discurso de venta"
          : segment === "Lastre"
            ? "No reponer y mover por recomendación controlada"
            : segment === "Exploración"
              ? "Probar con maridaje, copa o carta destacada"
              : "Mantener si cubre una función clara";
      return { ...row, index, share, cumulativeShare, segment, action };
    });

    const topCount = classified.filter((row) => row.segment === "Núcleo").length;
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
              Demo · Pareto de carta
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Identifica qué referencias sostienen el margen, cuáles solo acompañan y cuáles podrían estar ocupando carta, stock y atención sin aportar suficiente retorno.
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
                  <h2 className="font-heading text-2xl font-semibold">Introduce referencias clave</h2>
                  <p className="text-sm text-muted-foreground">Usa facturación y margen estimados del último mes.</p>
                </div>
              </div>

              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div key={index} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="grid md:grid-cols-[1.2fr_repeat(4,minmax(0,0.8fr))] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`wine-${index}`}>Referencia</Label>
                        <Input id={`wine-${index}`} value={row.name} onChange={(e) => updateRow(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`revenue-${index}`}>Ventas €</Label>
                        <Input id={`revenue-${index}`} inputMode="decimal" value={row.revenue} onChange={(e) => updateRow(index, "revenue", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`margin-${index}`}>Margen %</Label>
                        <Input id={`margin-${index}`} inputMode="decimal" value={row.margin} onChange={(e) => updateRow(index, "margin", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`stock-${index}`}>Stock</Label>
                        <Input id={`stock-${index}`} inputMode="decimal" value={row.stock} onChange={(e) => updateRow(index, "stock", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`days-${index}`}>Días sin venta</Label>
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
                  Calcular Pareto
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setRows(initialRows)}>
                  <RotateCcw size={16} className="mr-2" />
                  Restaurar ejemplo
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Lectura Pareto</p>
                  <h2 className="font-heading text-2xl font-semibold">{result.topCount} referencias sostienen el núcleo</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-wine/30 bg-wine/10 px-3 py-1.5 text-xs font-semibold text-wine">
                  <BarChart3 size={14} />
                  {euro.format(result.totalContribution)}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-6">
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Facturación</p>
                  <p className="text-2xl font-semibold mt-1">{euro.format(result.totalRevenue)}</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Margen ponderado</p>
                  <p className="text-2xl font-semibold mt-1">{result.totalRevenue > 0 ? Math.round((result.totalContribution / result.totalRevenue) * 100) : 0}%</p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Refs. a revisar</p>
                  <p className="text-2xl font-semibold mt-1">{result.classified.filter((row) => row.segment === "Lastre").length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {result.classified.map((row) => (
                  <div key={row.name} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold">{row.name}</p>
                        <p className="text-xs text-muted-foreground">{row.action}</p>
                      </div>
                      <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine">{row.segment}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-wine" style={{ width: `${Math.round(row.cumulativeShare * 100)}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{Math.round(row.share * 100)}% del margen simulado · acumulado {Math.round(row.cumulativeShare * 100)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Target, title: "Núcleo", text: "Vinos que sostienen el margen. Hay que proteger disponibilidad, discurso y PVP." },
              { icon: Wine, title: "Exploración", text: "Referencias con sentido de carta pero todavía sin tracción suficiente. Necesitan una hipótesis." },
              { icon: CheckCircle, title: "Lastre", text: "Vinos con stock, días sin venta o baja contribución. No siempre sobran, pero hay que justificarlos." },
            ].map((item) => {
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
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">Pareto automático</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Winerim encuentra el 20% que sostiene tu carta sin hojas manuales.</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              La plataforma cruza ventas, stock, PVP, coste, rotación y señales de Márgenes para saber qué proteger, qué empujar y qué dejar de comprar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/auditoria-pareto-80-20-carta-vinos")}>Descargar auditoría Pareto 80/20</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/demo")}>Solicitar demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="simulador-pareto-carta-vinos"
          faqs={[
            {
              q: "¿Qué es el Pareto 80/20 aplicado a una carta de vinos?",
              a: "Es una lectura para detectar qué pocas referencias concentran gran parte de la facturación o margen, y cuáles consumen espacio y stock con poco retorno.",
            },
            {
              q: "¿Un vino fuera del núcleo debería eliminarse?",
              a: "No necesariamente. Puede tener función gastronómica, de imagen o de maridaje. Lo importante es que su función esté clara.",
            },
            {
              q: "¿Cómo se calcula en Winerim?",
              a: "Con datos conectados de carta, ventas, stock, coste, PVP, rotación y señales de Márgenes, no con estimaciones manuales.",
            },
          ]}
        />

        <InternalLinks
          title="Sigue analizando rentabilidad"
          links={[
            { to: "/herramientas/calculadora-fuga-margen", label: "Calculadora de fuga de margen", type: "tool" },
            { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
            { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Guía para detectar vinos muertos", type: "guide" },
            { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorParetoCarta;
