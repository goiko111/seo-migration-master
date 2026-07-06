import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, DollarSign, ShieldAlert, TrendingUp, Wine } from "lucide-react";
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

const euroFormatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("es-ES", { style: "percent", maximumFractionDigits: 1 });

const valueOf = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const seoCopy = {
  es: {
    title: "Calculadora de fuga de margen en vinos",
    description: "Detecta cuánto margen puedes estar perdiendo por coste, PVP, copa, stock y objetivo de margen en una referencia de vino.",
    tools: "Herramientas",
    breadcrumb: "Calculadora de fuga de margen",
  },
  en: {
    title: "Wine margin leakage calculator",
    description: "Detect how much margin you may be losing through cost, price, by-the-glass, stock and margin targets for a wine reference.",
    tools: "Tools",
    breadcrumb: "Margin leakage calculator",
  },
  it: {
    title: "Calcolatrice fuga di margine vino",
    description: "Rileva quanto margine puoi perdere per costo, prezzo, calice, stock e obiettivo di margine su una referenza vino.",
    tools: "Strumenti",
    breadcrumb: "Calcolatrice fuga di margine",
  },
  fr: {
    title: "Calculateur de fuite de marge vin",
    description: "Détectez la marge perdue par coût, prix, verre, stock et objectif de marge sur une référence vin.",
    tools: "Outils",
    breadcrumb: "Calculateur de fuite de marge",
  },
  de: {
    title: "Margenverlust-Rechner für Wein",
    description: "Ermitteln Sie, wie viel Marge durch Kosten, Preis, Glasverkauf, Bestand und Margenziel bei einer Weinreferenz verloren geht.",
    tools: "Tools",
    breadcrumb: "Margenverlust-Rechner",
  },
  pt: {
    title: "Calculadora de fuga de margem em vinhos",
    description: "Detete quanta margem pode estar a perder por custo, PVP, copo, stock e objetivo de margem numa referência de vinho.",
    tools: "Ferramentas",
    breadcrumb: "Calculadora de fuga de margem",
  },
};

const uiCopy = {
  es: {
    eyebrow: "Demo · Margen y coste",
    intro: "Calcula cuánto margen se escapa cuando el coste sube, el PVP no se actualiza, el vino por copa no recupera suficiente o el stock inmoviliza capital.",
    marginDataTitle: "Datos de margen",
    marginDataText: "Puedes usar una referencia real o un caso aproximado.",
    fields: {
      wine: "Referencia",
      cost: "Coste compra (€)",
      pvp: "PVP carta (€)",
      target: "Margen objetivo (%)",
      sales: "Botellas vendidas/mes",
      stock: "Stock actual",
      glass: "Precio por copa (€)",
      glasses: "Copas por botella",
    },
    calculate: "Calcular fuga",
    resultFor: "Resultado para",
    unnamedReference: "Referencia sin nombre",
    leakLabel: "Fuga",
    severity: {
      alta: "alta",
      media: "media",
      baja: "baja",
    },
    metrics: {
      annualLeak: "Fuga anual estimada",
      recommendedPvp: "PVP recomendado",
      currentMargin: "Margen actual",
      glassMargin: "Margen por copa",
      monthly: (value: string) => `${value} al mes`,
      target: (value: string) => `${value} objetivo`,
      perBottle: (value: string) => `${value} por botella`,
      perServedBottle: (value: string) => `${value} por botella servida`,
    },
    recommendedAction: "Acción recomendada",
    recommendations: {
      alta: "Revisar PVP y compra antes de reponer",
      media: "Ajustar PVP, copa o negociación con distribuidor",
      baja: "Mantener y monitorizar coste",
    },
    capitalText: (value: string) => `Capital inmovilizado estimado: ${value}. Si el coste real ha cambiado y el PVP no, la fuga se acumula cada mes.`,
    miniStats: {
      unitLeak: "Fuga unidad",
      cost: "Coste",
      bottlesMonth: "Botellas/mes",
    },
    cards: [
      { icon: DollarSign, title: "Coste real", text: "Si el coste cambia por albarán o factura y el PVP no se actualiza, el margen se erosiona sin avisar." },
      { icon: Wine, title: "Copa", text: "El vino por copa puede vender mucho y aun así perder rentabilidad si no recupera botella, merma y servicio." },
      { icon: ShieldAlert, title: "Stock", text: "Una referencia con margen correcto puede ser mala compra si acumula stock y baja velocidad." },
    ],
    cta: {
      eyebrow: "Margen siempre vivo",
      title: "Winerim detecta fugas antes de que se conviertan en compras malas.",
      text: "Al conectar carta, costes, TPV, stock y distribuidores, Winerim puede señalar qué referencias revisar, no reponer o mover por copa.",
      diagnostic: "Descargar diagnóstico de fuga",
      simulator: "Probar señal de Márgenes",
    },
    faqs: [
      {
        q: "¿Qué es una fuga de margen?",
        a: "Es margen que se pierde porque el coste, el PVP, la copa o la compra no están alineados con el objetivo económico de la carta.",
      },
      {
        q: "¿Subir el PVP es siempre la solución?",
        a: "No. A veces conviene renegociar con el distribuidor, cambiar formato, mover por copa, proteger el vino o dejar de reponerlo.",
      },
      {
        q: "¿La calculadora sustituye a un análisis real?",
        a: "No. Es una demo rápida. Winerim usa datos conectados y señales continuas para detectar fugas con más precisión.",
      },
    ],
    internalLinksTitle: "Herramientas relacionadas",
    internalLinks: {
      marginSignal: "Simulador de señal de Márgenes",
      pareto: "Simulador Pareto 80/20",
      checklist: "Checklist albaranes y facturas",
      supply: "Winerim Supply",
    },
  },
  de: {
    eyebrow: "Demo · Marge und Kosten",
    intro: "Berechnen Sie, wie viel Marge verloren geht, wenn Einkaufskosten steigen, der Kartenpreis nicht angepasst wird, der Ausschank glasweise zu wenig einspielt oder Bestand Kapital bindet.",
    marginDataTitle: "Margendaten",
    marginDataText: "Sie können eine echte Weinreferenz oder einen groben Beispielwert verwenden.",
    fields: {
      wine: "Weinreferenz",
      cost: "Einkaufskosten (€)",
      pvp: "Kartenpreis (€)",
      target: "Zielmarge (%)",
      sales: "Verkaufte Flaschen/Monat",
      stock: "Aktueller Bestand",
      glass: "Preis pro Glas (€)",
      glasses: "Gläser pro Flasche",
    },
    calculate: "Margenverlust berechnen",
    resultFor: "Ergebnis für",
    unnamedReference: "Unbenannte Referenz",
    leakLabel: "Verlust",
    severity: {
      alta: "hoch",
      media: "mittel",
      baja: "niedrig",
    },
    metrics: {
      annualLeak: "Geschätzter Jahresverlust",
      recommendedPvp: "Empfohlener Kartenpreis",
      currentMargin: "Aktuelle Marge",
      glassMargin: "Marge pro Glas",
      monthly: (value: string) => `${value} pro Monat`,
      target: (value: string) => `${value} Ziel`,
      perBottle: (value: string) => `${value} pro Flasche`,
      perServedBottle: (value: string) => `${value} pro ausgeschenkter Flasche`,
    },
    recommendedAction: "Empfohlene Maßnahme",
    recommendations: {
      alta: "Kartenpreis und Einkauf vor der nächsten Bestellung prüfen",
      media: "Kartenpreis, Glasangebot oder Konditionen mit dem Vertrieb anpassen",
      baja: "Beibehalten und Kosten weiter beobachten",
    },
    capitalText: (value: string) => `Geschätztes gebundenes Kapital: ${value}. Wenn sich die realen Kosten geändert haben und der Kartenpreis gleich bleibt, summiert sich der Verlust jeden Monat.`,
    miniStats: {
      unitLeak: "Verlust je Einheit",
      cost: "Kosten",
      bottlesMonth: "Flaschen/Monat",
    },
    cards: [
      { icon: DollarSign, title: "Reale Kosten", text: "Wenn sich Kosten durch Lieferschein oder Rechnung ändern und der Kartenpreis nicht angepasst wird, wird die Marge unbemerkt aufgezehrt." },
      { icon: Wine, title: "Glasverkauf", text: "Ein Wein im offenen Ausschank kann stark laufen und trotzdem Rentabilität verlieren, wenn Flasche, Schwund und Service nicht gedeckt sind." },
      { icon: ShieldAlert, title: "Bestand", text: "Eine Referenz mit korrekter Marge kann ein schlechter Einkauf sein, wenn sie Bestand aufbaut und sich zu langsam dreht." },
    ],
    cta: {
      eyebrow: "Marge bleibt in Bewegung",
      title: "Winerim erkennt Verluste, bevor sie zu schlechten Einkäufen werden.",
      text: "Wenn Karte, Kosten, Kassendaten, Bestand und Lieferanten verbunden sind, kann Winerim zeigen, welche Referenzen geprüft, nicht nachbestellt oder glasweise bewegt werden sollten.",
      diagnostic: "Verlustdiagnose herunterladen",
      simulator: "Margen-Signal testen",
    },
    faqs: [
      {
        q: "Was ist ein Margenverlust?",
        a: "Das ist Marge, die verloren geht, weil Kosten, Kartenpreis, Glasangebot oder Einkauf nicht mit dem wirtschaftlichen Ziel der Weinkarte übereinstimmen.",
      },
      {
        q: "Ist ein höherer Kartenpreis immer die Lösung?",
        a: "Nein. Manchmal ist es sinnvoller, mit dem Vertrieb neu zu verhandeln, das Format zu ändern, den Wein glasweise zu verkaufen, ihn zu schützen oder ihn nicht nachzubestellen.",
      },
      {
        q: "Ersetzt der Rechner eine echte Analyse?",
        a: "Nein. Er ist eine schnelle Demo. Winerim nutzt verbundene Daten und laufende Signale, um Margenverluste genauer zu erkennen.",
      },
    ],
    internalLinksTitle: "Verwandte Tools",
    internalLinks: {
      marginSignal: "Margen-Signal-Simulator",
      pareto: "Pareto-80/20-Simulator",
      checklist: "Checkliste für Lieferscheine und Rechnungen",
      supply: "Winerim Supply",
    },
  },
  pt: {
    eyebrow: "Demo · Margem e custo",
    intro: "Calcule quanta margem se perde quando o custo sobe, o PVP não é atualizado, o vinho a copo não recupera o suficiente ou o stock imobiliza capital.",
    marginDataTitle: "Dados de margem",
    marginDataText: "Pode usar uma referência real ou um caso aproximado.",
    fields: {
      wine: "Referência",
      cost: "Custo de compra (€)",
      pvp: "PVP da carta (€)",
      target: "Margem objetivo (%)",
      sales: "Garrafas vendidas/mês",
      stock: "Stock atual",
      glass: "Preço por copo (€)",
      glasses: "Copos por garrafa",
    },
    calculate: "Calcular fuga",
    resultFor: "Resultado para",
    unnamedReference: "Referência sem nome",
    leakLabel: "Fuga",
    severity: {
      alta: "alta",
      media: "média",
      baja: "baixa",
    },
    metrics: {
      annualLeak: "Fuga anual estimada",
      recommendedPvp: "PVP recomendado",
      currentMargin: "Margem atual",
      glassMargin: "Margem por copo",
      monthly: (value: string) => `${value} por mês`,
      target: (value: string) => `${value} objetivo`,
      perBottle: (value: string) => `${value} por garrafa`,
      perServedBottle: (value: string) => `${value} por garrafa servida`,
    },
    recommendedAction: "Ação recomendada",
    recommendations: {
      alta: "Rever PVP e compra antes de repor",
      media: "Ajustar PVP, copo ou negociação com o distribuidor",
      baja: "Manter e monitorizar o custo",
    },
    capitalText: (value: string) => `Capital imobilizado estimado: ${value}. Se o custo real mudou e o PVP não, a fuga acumula-se todos os meses.`,
    miniStats: {
      unitLeak: "Fuga por unidade",
      cost: "Custo",
      bottlesMonth: "Garrafas/mês",
    },
    cards: [
      { icon: DollarSign, title: "Custo real", text: "Se o custo muda por guia de remessa ou fatura e o PVP não é atualizado, a margem é corroída sem aviso." },
      { icon: Wine, title: "Copo", text: "O vinho a copo pode vender muito e, ainda assim, perder rentabilidade se não recuperar garrafa, quebras e serviço." },
      { icon: ShieldAlert, title: "Stock", text: "Uma referência com margem correta pode ser uma má compra se acumular stock e rodar devagar." },
    ],
    cta: {
      eyebrow: "Margem sempre viva",
      title: "A Winerim deteta fugas antes de se tornarem más compras.",
      text: "Ao ligar carta, custos, POS, stock e distribuidores, a Winerim pode indicar que referências rever, não repor ou mover a copo.",
      diagnostic: "Descarregar diagnóstico de fuga",
      simulator: "Experimentar sinal de Margens",
    },
    faqs: [
      {
        q: "O que é uma fuga de margem?",
        a: "É margem que se perde porque o custo, o PVP, o copo ou a compra não estão alinhados com o objetivo económico da carta.",
      },
      {
        q: "Subir o PVP é sempre a solução?",
        a: "Não. Por vezes convém renegociar com o distribuidor, mudar o formato, vender a copo, proteger o vinho ou deixar de o repor.",
      },
      {
        q: "A calculadora substitui uma análise real?",
        a: "Não. É uma demo rápida. A Winerim usa dados ligados e sinais contínuos para detetar fugas com mais precisão.",
      },
    ],
    internalLinksTitle: "Ferramentas relacionadas",
    internalLinks: {
      marginSignal: "Simulador de sinal de Margens",
      pareto: "Simulador Pareto 80/20",
      checklist: "Checklist de guias de remessa e faturas",
      supply: "Winerim Supply",
    },
  },
};

const CalculadoraFugaMargen = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const s = seoCopy[lang] || seoCopy.es;
  const t = lang === "de" ? uiCopy.de : lang === "pt" ? uiCopy.pt : uiCopy.es;
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-fuga-margen")}`;
  const [form, setForm] = useState({
    wine: "Godello premium",
    cost: "13.50",
    pvp: "38",
    targetMargin: "62",
    monthlySales: "18",
    stock: "24",
    glassPrice: "8",
    glassesPerBottle: "5",
  });

  const result = useMemo(() => {
    const cost = valueOf(form.cost);
    const pvp = valueOf(form.pvp);
    const targetMargin = valueOf(form.targetMargin) / 100;
    const monthlySales = valueOf(form.monthlySales);
    const stock = valueOf(form.stock);
    const glassPrice = valueOf(form.glassPrice);
    const glassesPerBottle = valueOf(form.glassesPerBottle);

    const currentMargin = pvp > 0 ? (pvp - cost) / pvp : 0;
    const targetPvp = targetMargin < 1 ? cost / (1 - targetMargin) : pvp;
    const unitLeak = Math.max(0, targetPvp - pvp);
    const monthlyLeak = unitLeak * monthlySales;
    const annualLeak = monthlyLeak * 12;
    const glassRevenue = glassPrice * glassesPerBottle;
    const glassMargin = glassRevenue > 0 ? (glassRevenue - cost) / glassRevenue : 0;
    const capitalTied = cost * stock;
    const severity = annualLeak > 2500 || currentMargin < 0.45 ? "alta" : annualLeak > 900 || currentMargin < 0.55 ? "media" : "baja";
    return {
      cost,
      pvp,
      targetPvp,
      currentMargin,
      targetMargin,
      monthlySales,
      stock,
      glassRevenue,
      glassMargin,
      capitalTied,
      unitLeak,
      monthlyLeak,
      annualLeak,
      severity,
    };
  }, [form]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={s.title}
        description={s.description}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/calculadora-fuga-margen")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: s.tools, href: localePath("/herramientas") }, { label: s.breadcrumb }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.eyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.intro}
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <ShieldAlert size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{t.marginDataTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.marginDataText}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="wine">{t.fields.wine}</Label>
                  <Input id="wine" value={form.wine} onChange={(e) => update("wine", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">{t.fields.cost}</Label>
                  <Input id="cost" inputMode="decimal" value={form.cost} onChange={(e) => update("cost", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pvp">{t.fields.pvp}</Label>
                  <Input id="pvp" inputMode="decimal" value={form.pvp} onChange={(e) => update("pvp", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">{t.fields.target}</Label>
                  <Input id="target" inputMode="decimal" value={form.targetMargin} onChange={(e) => update("targetMargin", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">{t.fields.sales}</Label>
                  <Input id="sales" inputMode="decimal" value={form.monthlySales} onChange={(e) => update("monthlySales", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{t.fields.stock}</Label>
                  <Input id="stock" inputMode="decimal" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glass">{t.fields.glass}</Label>
                  <Input id="glass" inputMode="decimal" value={form.glassPrice} onChange={(e) => update("glassPrice", e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="glasses">{t.fields.glasses}</Label>
                  <Input id="glasses" inputMode="decimal" value={form.glassesPerBottle} onChange={(e) => update("glassesPerBottle", e.target.value)} />
                </div>
              </div>

              <Button
                className="mt-6 w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "calculadora-fuga-margen")}
              >
                {t.calculate}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{t.resultFor}</p>
                  <h2 className="font-heading text-2xl font-semibold">{form.wine || t.unnamedReference}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                  result.severity === "alta"
                    ? "border-red-500/30 bg-red-500/10 text-red-700"
                    : result.severity === "media"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-700"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                }`}>
                  {result.severity === "baja" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {t.leakLabel} {t.severity[result.severity]}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: DollarSign, label: t.metrics.annualLeak, value: euroFormatter.format(result.annualLeak), helper: t.metrics.monthly(euroFormatter.format(result.monthlyLeak)) },
                  { icon: TrendingUp, label: t.metrics.recommendedPvp, value: euroFormatter.format(result.targetPvp), helper: t.metrics.target(percentFormatter.format(result.targetMargin)) },
                  { icon: BarChart3, label: t.metrics.currentMargin, value: percentFormatter.format(result.currentMargin), helper: t.metrics.perBottle(euroFormatter.format(result.pvp - result.cost)) },
                  { icon: Wine, label: t.metrics.glassMargin, value: percentFormatter.format(result.glassMargin), helper: t.metrics.perServedBottle(euroFormatter.format(result.glassRevenue)) },
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
                <h3 className="font-heading text-xl font-semibold mb-2">{t.recommendedAction}</h3>
                <p className="text-foreground font-medium">{t.recommendations[result.severity]}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {t.capitalText(euroFormatter.format(result.capitalTied))}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.miniStats.unitLeak}</p>
                  <p className="text-lg font-semibold mt-1">{euroFormatter.format(result.unitLeak)}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.miniStats.cost}</p>
                  <p className="text-lg font-semibold mt-1">{euroFormatter.format(result.cost)}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.miniStats.bottlesMonth}</p>
                  <p className="text-lg font-semibold mt-1">{result.monthlySales.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {t.cards.map((item) => {
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
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{t.cta.eyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {t.cta.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/diagnostico-fuga-margen-carta-vinos")}>{t.cta.diagnostic}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/herramientas/simulador-senal-margenes")}>{t.cta.simulator}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="calculadora-fuga-margen"
          faqs={t.faqs}
        />

        <InternalLinks
          title={t.internalLinksTitle}
          links={[
            { to: "/herramientas/simulador-senal-margenes", label: t.internalLinks.marginSignal, type: "tool" },
            { to: "/herramientas/simulador-pareto-carta-vinos", label: t.internalLinks.pareto, type: "tool" },
            { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: t.internalLinks.checklist, type: "resource" },
            { to: "/producto/winerim-supply", label: t.internalLinks.supply, type: "solution" },
          ].map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CalculadoraFugaMargen;
