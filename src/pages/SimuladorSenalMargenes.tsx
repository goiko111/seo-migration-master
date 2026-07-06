import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  DollarSign,
  Info,
  Shield,
  TrendingUp,
  Wine,
} from "lucide-react";
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

type Decision = "ok" | "noreponer" | "liquidar" | "critico";

const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("es-ES", { style: "percent", maximumFractionDigits: 1 });

const decisionCopy: Record<Decision, { label: string; tone: string; action: string; reason: string }> = {
  ok: {
    label: "OK",
    tone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    action: "Mantener y seguir monitorizando",
    reason: "La cobertura, la velocidad y el margen no muestran una señal urgente.",
  },
  noreponer: {
    label: "No reponer",
    tone: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    action: "Agotar stock antes de volver a comprar",
    reason: "Hay indicios de cobertura alta, margen ajustado o rotación insuficiente.",
  },
  liquidar: {
    label: "Liquidar",
    tone: "bg-orange-500/10 text-orange-700 border-orange-500/30",
    action: "Mover por copa, menú, recomendación o promoción controlada",
    reason: "El vino acumula stock o tiempo sin venta y empieza a bloquear capital.",
  },
  critico: {
    label: "Crítico",
    tone: "bg-red-500/10 text-red-700 border-red-500/30",
    action: "Revisar de inmediato: retirar, sustituir o liquidar",
    reason: "La combinación de baja velocidad, stock y días sin venta apunta a riesgo alto.",
  },
};

const getNumber = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const classifyDecision = (
  marginPct: number,
  stock: number,
  velocityMonthly: number,
  coverageMonths: number,
  daysSinceLastSale: number,
  isProtected: boolean,
): Decision => {
  if (isProtected && marginPct >= 0.45 && daysSinceLastSale < 180) return "ok";
  if (stock > 0 && velocityMonthly === 0 && daysSinceLastSale >= 180) return "critico";
  if (coverageMonths >= 18 || (daysSinceLastSale >= 150 && stock >= 6)) return "critico";
  if (coverageMonths >= 10 || daysSinceLastSale >= 120) return "liquidar";
  if (coverageMonths >= 6 || daysSinceLastSale >= 75 || marginPct < 0.5) return "noreponer";
  return "ok";
};

const classifyProfile = (decision: Decision, marginPct: number, velocityMonthly: number) => {
  if (decision === "critico" || decision === "liquidar") return "lastre";
  if (velocityMonthly === 0) return "sin actividad";
  if (velocityMonthly >= 12 && marginPct >= 0.6) return "estrella";
  if (velocityMonthly >= 12) return "volumen";
  if (marginPct >= 0.65 && velocityMonthly >= 4) return "rentable";
  return "estable";
};

const seoCopy = {
  es: {
    title: "Simulador de señal de Márgenes para vino",
    description: "Calcula una señal simplificada de Márgenes Winerim: ok, no reponer, liquidar o crítico según stock, ventas, PVP, coste y días sin venta.",
    tools: "Herramientas",
    breadcrumb: "Simulador de señal de Márgenes",
  },
  en: {
    title: "Wine margin signal simulator",
    description: "Calculate a simplified Winerim margin signal: ok, do not reorder, liquidate or critical based on stock, sales, price, cost and days without sale.",
    tools: "Tools",
    breadcrumb: "Margin signal simulator",
  },
  it: {
    title: "Simulatore segnale margini vino",
    description: "Calcola un segnale semplificato di margini Winerim: ok, non riordinare, liquidare o critico in base a stock, vendite, prezzo, costo e giorni senza vendita.",
    tools: "Strumenti",
    breadcrumb: "Simulatore segnale margini",
  },
  fr: {
    title: "Simulateur de signal de marges vin",
    description: "Calculez un signal simplifié de marges Winerim : ok, ne pas recommander, liquider ou critique selon stock, ventes, prix, coût et jours sans vente.",
    tools: "Outils",
    breadcrumb: "Simulateur signal de marges",
  },
  de: {
    title: "Margensignal-Simulator für Wein",
    description: "Berechnen Sie ein vereinfachtes Winerim-Margensignal: ok, nicht nachbestellen, liquidieren oder kritisch anhand von Bestand, Verkäufen, Preis, Kosten und Tagen ohne Verkauf.",
    tools: "Tools",
    breadcrumb: "Margensignal-Simulator",
  },
  pt: {
    title: "Simulador de sinal de margens para vinho",
    description: "Calcule um sinal simplificado de Margens Winerim: ok, não repor, liquidar ou crítico conforme stock, vendas, PVP, custo e dias sem venda.",
    tools: "Ferramentas",
    breadcrumb: "Simulador de sinal de margens",
  },
};

const SimuladorSenalMargenes = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const s = seoCopy[lang] || seoCopy.es;
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/simulador-senal-margenes")}`;
  const [form, setForm] = useState({
    wine: "Ribera premium",
    pvp: "64",
    cost: "24",
    stock: "14",
    monthlySales: "2",
    daysSinceLastSale: "128",
    protectedWine: false,
  });

  const result = useMemo(() => {
    const pvp = getNumber(form.pvp);
    const cost = getNumber(form.cost);
    const stock = getNumber(form.stock);
    const monthlySales = getNumber(form.monthlySales);
    const daysSinceLastSale = getNumber(form.daysSinceLastSale);
    const marginPct = pvp > 0 ? Math.max(0, (pvp - cost) / pvp) : 0;
    const grossMarginUnit = Math.max(0, pvp - cost);
    const capitalTied = stock * cost;
    const coverageMonths = monthlySales > 0 ? stock / monthlySales : stock > 0 ? 99 : 0;
    const decision = classifyDecision(marginPct, stock, monthlySales, coverageMonths, daysSinceLastSale, form.protectedWine);
    const profile = classifyProfile(decision, marginPct, monthlySales);
    const confidence = monthlySales > 0 ? "media" : "baja";

    return {
      pvp,
      cost,
      stock,
      monthlySales,
      daysSinceLastSale,
      marginPct,
      grossMarginUnit,
      capitalTied,
      coverageMonths,
      decision,
      profile,
      confidence,
    };
  }, [form]);

  const decision = decisionCopy[result.decision];

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const run = () => {
    trackAction("tool_use", "tool", "simulador-senal-margenes");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={s.title}
        description={s.description}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/simulador-senal-margenes")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: s.tools, href: localePath("/herramientas") }, { label: s.breadcrumb }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              Demo · Winerim Márgenes
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Introduce PVP, coste, stock, ventas mensuales y días sin venta. La herramienta devuelve una señal simplificada: mantener, no reponer, liquidar o revisar como crítico.
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[0.92fr_1.08fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Wine size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">Datos de la referencia</h2>
                  <p className="text-sm text-muted-foreground">Todo se calcula en tu navegador.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="wine">Nombre o familia del vino</Label>
                  <Input id="wine" value={form.wine} onChange={(e) => update("wine", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pvp">PVP carta (€)</Label>
                  <Input id="pvp" inputMode="decimal" value={form.pvp} onChange={(e) => update("pvp", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Coste compra (€)</Label>
                  <Input id="cost" inputMode="decimal" value={form.cost} onChange={(e) => update("cost", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock actual</Label>
                  <Input id="stock" inputMode="numeric" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">Ventas mensuales</Label>
                  <Input id="sales" inputMode="decimal" value={form.monthlySales} onChange={(e) => update("monthlySales", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Días desde última venta</Label>
                  <Input id="days" inputMode="numeric" value={form.daysSinceLastSale} onChange={(e) => update("daysSinceLastSale", e.target.value)} />
                </div>
                <label className="rounded-lg border border-border p-4 flex items-start gap-3 cursor-pointer hover:border-wine/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.protectedWine}
                    onChange={(e) => update("protectedWine", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-wine"
                  />
                  <span>
                    <span className="block text-sm font-semibold">Vino protegido o estratégico</span>
                    <span className="block text-xs text-muted-foreground mt-1">Úsalo para referencias de imagen, maridaje o profundidad que no deben evaluarse solo por rotación.</span>
                  </span>
                </label>
              </div>

              <Button onClick={run} className="mt-6 w-full bg-wine hover:bg-wine/90">
                Calcular señal
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Resultado para</p>
                  <h2 className="font-heading text-2xl font-semibold">{form.wine || "Referencia sin nombre"}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${decision.tone}`}>
                  {result.decision === "ok" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {decision.label}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: DollarSign, label: "Margen bruto unitario", value: euro.format(result.grossMarginUnit), helper: percent.format(result.marginPct) },
                  { icon: BarChart3, label: "Cobertura estimada", value: result.coverageMonths >= 99 ? "+99 meses" : `${result.coverageMonths.toFixed(1)} meses`, helper: "stock / ventas mes" },
                  { icon: TrendingUp, label: "Velocidad mensual", value: `${result.monthlySales.toFixed(1)} uds`, helper: "ventas recientes" },
                  { icon: Shield, label: "Capital inmovilizado", value: euro.format(result.capitalTied), helper: `${result.stock.toFixed(0)} botellas en stock` },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="rounded-lg border border-border bg-background/70 p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                        <Icon size={15} />
                        {metric.label}
                      </div>
                      <p className="text-2xl font-semibold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.helper}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-lg border border-border bg-background/70 p-5 mb-6">
                <h3 className="font-heading text-xl font-semibold mb-2">Acción recomendada</h3>
                <p className="text-foreground font-medium">{decision.action}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{decision.reason}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ABC perfil</p>
                  <p className="text-lg font-semibold mt-1">{result.profile}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Confianza demo</p>
                  <p className="text-lg font-semibold mt-1">{result.confidence}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Días sin venta</p>
                  <p className="text-lg font-semibold mt-1">{result.daysSinceLastSale.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Info, title: "Qué simula", text: "Una versión simplificada de las señales de Márgenes: decision, cobertura, capital, velocidad, días sin venta y confianza." },
              { icon: AlertTriangle, title: "Qué no promete", text: "No sustituye el motor real de Winerim, que cruza carta, stock, TPV, coste, histórico y reglas de protección." },
              { icon: BarChart3, title: "Qué descubre", text: "Si una referencia debería protegerse, moverse, no reponerse o revisarse antes de volver a comprar." },
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
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">Winerim Márgenes</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">En Winerim esto no se calcula vino a vino: aparece como alerta.</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              La sección de Márgenes detecta referencias ok, no reponer, liquidar o críticas, con cobertura de meses, capital inmovilizado, velocidad mensual, razón y confianza.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/demo")}>Ver Winerim en una demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/recursos/diagnostico-fuga-margen-carta-vinos")}>Descargar diagnóstico de margen</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="simulador-senal-margenes"
          faqs={[
            {
              q: "¿Esta señal es igual que la de Winerim en producción?",
              a: "No. Es una demo simplificada para entender la lógica. El motor real de Winerim usa más contexto, histórico, reglas de protección y datos conectados.",
            },
            {
              q: "¿Qué significa no reponer?",
              a: "Significa agotar el stock actual antes de volver a comprar, salvo que el vino tenga una función estratégica clara en la carta.",
            },
            {
              q: "¿Por qué importa la cobertura en meses?",
              a: "Porque muestra cuánto tiempo tardarías en vender el stock actual al ritmo de ventas reciente. Coberturas muy altas suelen indicar capital inmovilizado.",
            },
          ]}
        />

        <InternalLinks
          title="Sigue analizando tu carta"
          links={[
            { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
            { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
            { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: "Auditoría Pareto 80/20", type: "resource" },
            { to: "/producto/winerim-core", label: "Winerim Core", type: "solution" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorSenalMargenes;
