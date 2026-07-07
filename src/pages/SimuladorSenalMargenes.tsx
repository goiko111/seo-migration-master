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
type Profile = "lastre" | "sin actividad" | "estrella" | "volumen" | "rentable" | "estable";
type Confidence = "media" | "baja";

const euroFormatters = {
  es: new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  de: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  pt: new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
};

const percentFormatters = {
  es: new Intl.NumberFormat("es-ES", { style: "percent", maximumFractionDigits: 1 }),
  de: new Intl.NumberFormat("de-DE", { style: "percent", maximumFractionDigits: 1 }),
  pt: new Intl.NumberFormat("pt-PT", { style: "percent", maximumFractionDigits: 1 }),
};

const decisionTone: Record<Decision, string> = {
  ok: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  noreponer: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  liquidar: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  critico: "bg-red-500/10 text-red-700 border-red-500/30",
};

const decisionCopy: Record<string, Record<Decision, { label: string; action: string; reason: string }>> = {
  es: {
  ok: {
    label: "OK",
    action: "Mantener y seguir monitorizando",
    reason: "La cobertura, la velocidad y el margen no muestran una señal urgente.",
  },
  noreponer: {
    label: "No reponer",
    action: "Agotar stock antes de volver a comprar",
    reason: "Hay indicios de cobertura alta, margen ajustado o rotación insuficiente.",
  },
  liquidar: {
    label: "Liquidar",
    action: "Mover por copa, menú, recomendación o promoción controlada",
    reason: "El vino acumula stock o tiempo sin venta y empieza a bloquear capital.",
  },
  critico: {
    label: "Crítico",
    action: "Revisar de inmediato: retirar, sustituir o liquidar",
    reason: "La combinación de baja velocidad, stock y días sin venta apunta a riesgo alto.",
  },
  },
  de: {
    ok: {
      label: "OK",
      action: "Beibehalten und weiter beobachten",
      reason: "Reichweite, Verkaufsgeschwindigkeit und Marge zeigen kein dringendes Warnsignal.",
    },
    noreponer: {
      label: "Nicht nachbestellen",
      action: "Bestand abverkaufen, bevor neu eingekauft wird",
      reason: "Es gibt Hinweise auf hohe Reichweite, knappe Marge oder zu geringe Rotation.",
    },
    liquidar: {
      label: "Liquidieren",
      action: "Über Glasverkauf, Menü, Empfehlung oder kontrollierte Aktion bewegen",
      reason: "Der Wein sammelt Bestand oder Zeit ohne Verkauf an und beginnt Kapital zu binden.",
    },
    critico: {
      label: "Kritisch",
      action: "Sofort prüfen: auslisten, ersetzen oder liquidieren",
      reason: "Die Kombination aus niedriger Geschwindigkeit, Bestand und Tagen ohne Verkauf deutet auf hohes Risiko hin.",
    },
  },
  pt: {
    ok: {
      label: "OK",
      action: "Manter e continuar a monitorizar",
      reason: "A cobertura, a velocidade e a margem não mostram um sinal urgente.",
    },
    noreponer: {
      label: "Não repor",
      action: "Esgotar o stock antes de voltar a comprar",
      reason: "Há indícios de cobertura elevada, margem apertada ou rotação insuficiente.",
    },
    liquidar: {
      label: "Liquidar",
      action: "Mover por copo, menu, recomendação ou promoção controlada",
      reason: "O vinho acumula stock ou tempo sem venda e começa a bloquear capital.",
    },
    critico: {
      label: "Crítico",
      action: "Rever de imediato: retirar, substituir ou liquidar",
      reason: "A combinação de baixa velocidade, stock e dias sem venda aponta para risco elevado.",
    },
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

const classifyProfile = (decision: Decision, marginPct: number, velocityMonthly: number): Profile => {
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
    tools: "Werkzeuge",
    breadcrumb: "Margensignal-Simulator",
  },
  pt: {
    title: "Simulador de sinal de margens para vinho",
    description: "Calcule um sinal simplificado de Margens Winerim: ok, não repor, liquidar ou crítico conforme stock, vendas, PVP, custo e dias sem venda.",
    tools: "Ferramentas",
    breadcrumb: "Simulador de sinal de margens",
  },
};

const uiCopy: Record<string, {
  heroEyebrow: string;
  heroDescription: string;
  formTitle: string;
  formSubtitle: string;
  wineLabel: string;
  pvpLabel: string;
  costLabel: string;
  stockLabel: string;
  salesLabel: string;
  daysLabel: string;
  protectedTitle: string;
  protectedDescription: string;
  calculate: string;
  resultFor: string;
  unnamedReference: string;
  metrics: {
    grossMargin: string;
    coverage: string;
    velocity: string;
    capital: string;
    months: string;
    stockSalesMonth: string;
    recentSales: string;
    units: string;
    bottlesInStock: (stock: number) => string;
  };
  recommendedAction: string;
  abcProfile: string;
  demoConfidence: string;
  daysWithoutSale: string;
  profiles: Record<Profile, string>;
  confidence: Record<Confidence, string>;
  cards: { title: string; text: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  demoButton: string;
  diagnosticButton: string;
  faqs: { q: string; a: string }[];
  internalLinksTitle: string;
  internalLinks: { label: string }[];
}> = {
  es: {
    heroEyebrow: "Demo · Winerim Márgenes",
    heroDescription: "Introduce PVP, coste, stock, ventas mensuales y días sin venta. La herramienta devuelve una señal simplificada: mantener, no reponer, liquidar o revisar como crítico.",
    formTitle: "Datos de la referencia",
    formSubtitle: "Todo se calcula en tu navegador.",
    wineLabel: "Nombre o familia del vino",
    pvpLabel: "PVP carta (€)",
    costLabel: "Coste compra (€)",
    stockLabel: "Stock actual",
    salesLabel: "Ventas mensuales",
    daysLabel: "Días desde última venta",
    protectedTitle: "Vino protegido o estratégico",
    protectedDescription: "Úsalo para referencias de imagen, maridaje o profundidad que no deben evaluarse solo por rotación.",
    calculate: "Calcular señal",
    resultFor: "Resultado para",
    unnamedReference: "Referencia sin nombre",
    metrics: {
      grossMargin: "Margen bruto unitario",
      coverage: "Cobertura estimada",
      velocity: "Velocidad mensual",
      capital: "Capital inmovilizado",
      months: "meses",
      stockSalesMonth: "stock / ventas mes",
      recentSales: "ventas recientes",
      units: "uds",
      bottlesInStock: (stock) => `${stock.toFixed(0)} botellas en stock`,
    },
    recommendedAction: "Acción recomendada",
    abcProfile: "ABC perfil",
    demoConfidence: "Confianza demo",
    daysWithoutSale: "Días sin venta",
    profiles: {
      lastre: "lastre",
      "sin actividad": "sin actividad",
      estrella: "estrella",
      volumen: "volumen",
      rentable: "rentable",
      estable: "estable",
    },
    confidence: {
      media: "media",
      baja: "baja",
    },
    cards: [
      { title: "Qué simula", text: "Una versión simplificada de las señales de Márgenes: decision, cobertura, capital, velocidad, días sin venta y confianza." },
      { title: "Qué no promete", text: "No sustituye el motor real de Winerim, que cruza carta, stock, TPV, coste, histórico y reglas de protección." },
      { title: "Qué descubre", text: "Si una referencia debería protegerse, moverse, no reponerse o revisarse antes de volver a comprar." },
    ],
    ctaEyebrow: "Winerim Márgenes",
    ctaTitle: "En Winerim esto no se calcula vino a vino: aparece como alerta.",
    ctaText: "La sección de Márgenes detecta referencias ok, no reponer, liquidar o críticas, con cobertura de meses, capital inmovilizado, velocidad mensual, razón y confianza.",
    demoButton: "Ver Winerim en una demo",
    diagnosticButton: "Descargar diagnóstico de margen",
    faqs: [
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
    ],
    internalLinksTitle: "Sigue analizando tu carta",
    internalLinks: [
      { label: "Calculadora de stock muerto" },
      { label: "Calculadora de compra inteligente" },
      { label: "Auditoría Pareto 80/20" },
      { label: "Winerim Core" },
    ],
  },
  de: {
    heroEyebrow: "Demo · Winerim Margen",
    heroDescription: "Geben Sie Kartenpreis, Einkaufskosten, Bestand, monatliche Verkäufe und Tage seit dem letzten Verkauf ein. Das Tool liefert ein vereinfachtes Signal: behalten, nicht nachbestellen, liquidieren oder kritisch prüfen.",
    formTitle: "Referenzdaten",
    formSubtitle: "Alles wird in Ihrem Browser berechnet.",
    wineLabel: "Name oder Weinfamilie",
    pvpLabel: "Kartenpreis (€)",
    costLabel: "Einkaufskosten (€)",
    stockLabel: "Aktueller Bestand",
    salesLabel: "Monatliche Verkäufe",
    daysLabel: "Tage seit letztem Verkauf",
    protectedTitle: "Geschützter oder strategischer Wein",
    protectedDescription: "Nutzen Sie dies für Image-, Pairing- oder Sortimentstiefe-Referenzen, die nicht nur nach Rotation bewertet werden sollten.",
    calculate: "Signal berechnen",
    resultFor: "Ergebnis für",
    unnamedReference: "Referenz ohne Namen",
    metrics: {
      grossMargin: "Bruttomarge pro Einheit",
      coverage: "Geschätzte Reichweite",
      velocity: "Monatliche Geschwindigkeit",
      capital: "Gebundenes Kapital",
      months: "Monate",
      stockSalesMonth: "Bestand / Verkäufe pro Monat",
      recentSales: "aktuelle Verkäufe",
      units: "Stk.",
      bottlesInStock: (stock) => `${stock.toFixed(0)} Flaschen auf Lager`,
    },
    recommendedAction: "Empfohlene Aktion",
    abcProfile: "ABC-Profil",
    demoConfidence: "Demo-Sicherheit",
    daysWithoutSale: "Tage ohne Verkauf",
    profiles: {
      lastre: "Belastung",
      "sin actividad": "keine Aktivität",
      estrella: "Star",
      volumen: "Volumen",
      rentable: "rentabel",
      estable: "stabil",
    },
    confidence: {
      media: "mittel",
      baja: "niedrig",
    },
    cards: [
      { title: "Was simuliert wird", text: "Eine vereinfachte Version der Margensignale: Entscheidung, Reichweite, Kapital, Absatztempo, Tage ohne Verkauf und Sicherheit." },
      { title: "Was es nicht verspricht", text: "Es ersetzt nicht den echten Winerim-Motor, der Karte, Bestand, Kassendaten, Kosten, Historie und Schutzregeln zusammenführt." },
      { title: "Was es aufdeckt", text: "Ob eine Referenz geschützt, bewegt, nicht nachbestellt oder vor dem nächsten Einkauf geprüft werden sollte." },
    ],
    ctaEyebrow: "Winerim Margen",
    ctaTitle: "In Winerim wird das nicht Wein für Wein berechnet: Es erscheint als Warnsignal.",
    ctaText: "Der Bereich Margen erkennt OK-, Nicht-nachbestellen-, Liquidieren- und kritische Referenzen, mit Reichweite in Monaten, gebundenem Kapital, monatlichem Absatztempo, Begründung und Sicherheit.",
    demoButton: "Winerim in einer Demo ansehen",
    diagnosticButton: "Margendiagnose herunterladen",
    faqs: [
      {
        q: "Ist dieses Signal identisch mit dem Signal von Winerim im Produktivbetrieb?",
        a: "Nein. Es ist eine vereinfachte Demo, um die Logik zu verstehen. Der echte Winerim-Motor nutzt mehr Kontext, Historie, Schutzregeln und verbundene Daten.",
      },
      {
        q: "Was bedeutet nicht nachbestellen?",
        a: "Es bedeutet, den aktuellen Bestand abzuverkaufen, bevor neu eingekauft wird, es sei denn, der Wein erfüllt eine klare strategische Funktion auf der Karte.",
      },
      {
        q: "Warum ist die Reichweite in Monaten wichtig?",
        a: "Sie zeigt, wie lange es dauern würde, den aktuellen Bestand beim jüngsten Verkaufstempo zu verkaufen. Sehr hohe Reichweiten deuten oft auf gebundenes Kapital hin.",
      },
    ],
    internalLinksTitle: "Analysieren Sie Ihre Weinkarte weiter",
    internalLinks: [
      { label: "Rechner für toten Bestand" },
      { label: "Rechner für intelligenten Einkauf" },
      { label: "Pareto-Audit 80/20" },
      { label: "Winerim Core" },
    ],
  },
  pt: {
    heroEyebrow: "Demo · Winerim Margens",
    heroDescription: "Introduza o PVP, custo, stock, vendas mensais e dias sem venda. A ferramenta devolve um sinal simplificado: manter, não repor, liquidar ou rever como crítico.",
    formTitle: "Dados da referência",
    formSubtitle: "Tudo é calculado no seu navegador.",
    wineLabel: "Nome ou família do vinho",
    pvpLabel: "PVP da carta (€)",
    costLabel: "Custo de compra (€)",
    stockLabel: "Stock atual",
    salesLabel: "Vendas mensais",
    daysLabel: "Dias desde a última venda",
    protectedTitle: "Vinho protegido ou estratégico",
    protectedDescription: "Use isto para referências de imagem, harmonização ou profundidade que não devem ser avaliadas apenas pela rotação.",
    calculate: "Calcular sinal",
    resultFor: "Resultado para",
    unnamedReference: "Referência sem nome",
    metrics: {
      grossMargin: "Margem bruta unitária",
      coverage: "Cobertura estimada",
      velocity: "Velocidade mensal",
      capital: "Capital imobilizado",
      months: "meses",
      stockSalesMonth: "stock / vendas por mês",
      recentSales: "vendas recentes",
      units: "un.",
      bottlesInStock: (stock) => `${stock.toFixed(0)} garrafas em stock`,
    },
    recommendedAction: "Ação recomendada",
    abcProfile: "Perfil ABC",
    demoConfidence: "Confiança da demo",
    daysWithoutSale: "Dias sem venda",
    profiles: {
      lastre: "lastro",
      "sin actividad": "sem atividade",
      estrella: "estrela",
      volumen: "volume",
      rentable: "rentável",
      estable: "estável",
    },
    confidence: {
      media: "média",
      baja: "baixa",
    },
    cards: [
      { title: "O que simula", text: "Uma versão simplificada dos sinais de Margens: decisão, cobertura, capital, velocidade, dias sem venda e confiança." },
      { title: "O que não promete", text: "Não substitui o motor real da Winerim, que cruza carta, stock, POS, custo, histórico e regras de proteção." },
      { title: "O que revela", text: "Se uma referência deve ser protegida, movida, não reposta ou revista antes de voltar a comprar." },
    ],
    ctaEyebrow: "Winerim Margens",
    ctaTitle: "Na Winerim isto não é calculado vinho a vinho: aparece como alerta.",
    ctaText: "A secção de Margens deteta referências ok, não repor, liquidar ou críticas, com cobertura em meses, capital imobilizado, velocidade mensal, razão e confiança.",
    demoButton: "Ver a Winerim numa demo",
    diagnosticButton: "Descarregar diagnóstico de margem",
    faqs: [
      {
        q: "Este sinal é igual ao da Winerim em produção?",
        a: "Não. É uma demo simplificada para compreender a lógica. O motor real da Winerim usa mais contexto, histórico, regras de proteção e dados ligados.",
      },
      {
        q: "O que significa não repor?",
        a: "Significa esgotar o stock atual antes de voltar a comprar, salvo se o vinho tiver uma função estratégica clara na carta.",
      },
      {
        q: "Porque é que a cobertura em meses importa?",
        a: "Porque mostra quanto tempo demoraria a vender o stock atual ao ritmo de vendas recente. Coberturas muito altas costumam indicar capital imobilizado.",
      },
    ],
    internalLinksTitle: "Continue a analisar a sua carta",
    internalLinks: [
      { label: "Calculadora de stock morto" },
      { label: "Calculadora de compra inteligente" },
      { label: "Auditoria Pareto 80/20" },
      { label: "Winerim Core" },
    ],
  },
};

const initialFormByLang = {
  es: {
    wine: "Ribera premium",
    pvp: "64",
    cost: "24",
    stock: "14",
    monthlySales: "2",
    daysSinceLastSale: "128",
    protectedWine: false,
  },
  de: {
    wine: "Spätburgunder Reserve",
    pvp: "64",
    cost: "24",
    stock: "14",
    monthlySales: "2",
    daysSinceLastSale: "128",
    protectedWine: false,
  },
  pt: {
    wine: "Douro reserva",
    pvp: "64",
    cost: "24",
    stock: "14",
    monthlySales: "2",
    daysSinceLastSale: "128",
    protectedWine: false,
  },
};

const SimuladorSenalMargenes = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const activeLang = lang === "de" || lang === "pt" ? lang : "es";
  const s = seoCopy[lang] || seoCopy.es;
  const ui = uiCopy[activeLang];
  const euro = euroFormatters[activeLang];
  const percent = percentFormatters[activeLang];
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/simulador-senal-margenes")}`;
  const [form, setForm] = useState(() => initialFormByLang[activeLang]);

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
    const confidence: Confidence = monthlySales > 0 ? "media" : "baja";

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

  const decision = decisionCopy[activeLang][result.decision];

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
              {ui.heroEyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {ui.heroDescription}
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
                  <h2 className="font-heading text-2xl font-semibold">{ui.formTitle}</h2>
                  <p className="text-sm text-muted-foreground">{ui.formSubtitle}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="wine">{ui.wineLabel}</Label>
                  <Input id="wine" value={form.wine} onChange={(e) => update("wine", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pvp">{ui.pvpLabel}</Label>
                  <Input id="pvp" inputMode="decimal" value={form.pvp} onChange={(e) => update("pvp", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">{ui.costLabel}</Label>
                  <Input id="cost" inputMode="decimal" value={form.cost} onChange={(e) => update("cost", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{ui.stockLabel}</Label>
                  <Input id="stock" inputMode="numeric" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">{ui.salesLabel}</Label>
                  <Input id="sales" inputMode="decimal" value={form.monthlySales} onChange={(e) => update("monthlySales", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">{ui.daysLabel}</Label>
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
                    <span className="block text-sm font-semibold">{ui.protectedTitle}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{ui.protectedDescription}</span>
                  </span>
                </label>
              </div>

              <Button onClick={run} className="mt-6 w-full bg-wine hover:bg-wine/90">
                {ui.calculate}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{ui.resultFor}</p>
                  <h2 className="font-heading text-2xl font-semibold">{form.wine || ui.unnamedReference}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${decisionTone[result.decision]}`}>
                  {result.decision === "ok" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {decision.label}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: DollarSign, label: ui.metrics.grossMargin, value: euro.format(result.grossMarginUnit), helper: percent.format(result.marginPct) },
                  { icon: BarChart3, label: ui.metrics.coverage, value: result.coverageMonths >= 99 ? `+99 ${ui.metrics.months}` : `${result.coverageMonths.toFixed(1)} ${ui.metrics.months}`, helper: ui.metrics.stockSalesMonth },
                  { icon: TrendingUp, label: ui.metrics.velocity, value: `${result.monthlySales.toFixed(1)} ${ui.metrics.units}`, helper: ui.metrics.recentSales },
                  { icon: Shield, label: ui.metrics.capital, value: euro.format(result.capitalTied), helper: ui.metrics.bottlesInStock(result.stock) },
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
                <h3 className="font-heading text-xl font-semibold mb-2">{ui.recommendedAction}</h3>
                <p className="text-foreground font-medium">{decision.action}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{decision.reason}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{ui.abcProfile}</p>
                  <p className="text-lg font-semibold mt-1">{ui.profiles[result.profile]}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{ui.demoConfidence}</p>
                  <p className="text-lg font-semibold mt-1">{ui.confidence[result.confidence]}</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{ui.daysWithoutSale}</p>
                  <p className="text-lg font-semibold mt-1">{result.daysSinceLastSale.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Info, ...ui.cards[0] },
              { icon: AlertTriangle, ...ui.cards[1] },
              { icon: BarChart3, ...ui.cards[2] },
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
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{ui.ctaEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{ui.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {ui.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/demo")}>{ui.demoButton}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/recursos/diagnostico-fuga-margen-carta-vinos")}>{ui.diagnosticButton}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="simulador-senal-margenes"
          faqs={ui.faqs}
        />

        <InternalLinks
          title={ui.internalLinksTitle}
          links={[
            { to: "/herramientas/calculadora-stock-muerto", label: ui.internalLinks[0].label, type: "tool" },
            { to: "/herramientas/calculadora-compra-inteligente", label: ui.internalLinks[1].label, type: "tool" },
            { to: "/recursos/auditoria-pareto-80-20-carta-vinos", label: ui.internalLinks[2].label, type: "resource" },
            { to: "/producto/winerim-core", label: ui.internalLinks[3].label, type: "solution" },
          ].map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorSenalMargenes;
