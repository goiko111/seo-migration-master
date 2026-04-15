import { useState, useMemo, useEffect } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, Calculator, BarChart3,
  DollarSign, Users, RotateCcw, Layers
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap, I18nMap } from "@/i18n/types";

const INCREMENTS = [10, 20, 30] as const;
const DAYS_PER_MONTH = 26;
const MONTHS_PER_YEAR = 12;

const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Wine Sales ROI Calculator – Calcula tu potencial de ventas | Winerim",
    seo_desc: "Calcula cuánto puede ganar tu restaurante optimizando su carta de vinos. Simulador gratuito con proyecciones de incremento del 10%, 20% y 30%.",
    badge: "Simulador gratuito",
    h1_1: "Wine Sales ROI", h1_2: "Calculator",
    subtitle: "Descubre cuánto dinero puede ganar tu restaurante optimizando su carta de vinos. Introduce tus datos y obtén proyecciones al instante.",
    bread_tools: "Herramientas", bread_self: "Wine ROI Calculator",
    data_title: "Datos de tu restaurante",
    inputs: [
      { label: "Nº de mesas", suffix: "mesas" },
      { label: "Rotación diaria", suffix: "servicios/día" },
      { label: "Ticket medio de vino", suffix: "€/botella" },
      { label: "Botellas por servicio", suffix: "botellas" },
    ],
    calc_btn: "Calcular ROI",
    current_label: "Ingresos actuales de vino",
    daily: "Diario", monthly: "Mensual", annual: "Anual",
    increment: "incremento",
    daily_plus: "+Diario", new_monthly: "Nuevo mensual", new_annual: "Nuevo anual",
    chart_badge: "Proyección visual",
    chart_title_1: "Impacto anual en", chart_title_2: "ingresos",
    bar_title: "Comparativa anual", line_title: "Proyección mensual",
    actual: "Actual", revenue: "Ingresos",
    cta_badge: "Da el siguiente paso",
    cta_title_1: "Descubre cómo aumentar tus", cta_title_2: "ventas de vino",
    cta_desc: "Te mostramos cómo Winerim puede convertir estos números en realidad para tu restaurante.",
    cta_btn: "Solicitar demo",
    link_software: "Software de carta de vinos",
    link_ticket: "Aumentar el ticket medio",
    link_cases: "Casos de éxito",
    link_demo: "Solicitar demo",
    months_short: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    locale: "es-ES", yr: "/año",
    decides: ["Si invertir en optimizar la carta de vinos es rentable", "Qué incremento de facturación es realista para tu restaurante", "Dónde está el mayor potencial de mejora: volumen, precio o penetración"],
    avoids: ["Tomar decisiones sin cuantificar el impacto real", "Subestimar el potencial de mejora de la carta", "Invertir en acciones sin proyección de retorno"],
    impact: ["Cuantificar el ROI potencial de optimizar la carta", "Justificar la inversión en herramientas de gestión de vino", "Establecer objetivos de facturación alcanzables"],
  },
  en: {
    seo_title: "Wine Sales ROI Calculator – Calculate Your Sales Potential | Winerim",
    seo_desc: "Calculate how much your restaurant can earn by optimising its wine list. Free simulator with 10%, 20% and 30% increment projections.",
    badge: "Free simulator",
    h1_1: "Wine Sales ROI", h1_2: "Calculator",
    subtitle: "Discover how much revenue your restaurant can gain by optimising its wine list. Enter your data and get instant projections.",
    bread_tools: "Tools", bread_self: "Wine ROI Calculator",
    data_title: "Your restaurant data",
    inputs: [
      { label: "Number of tables", suffix: "tables" },
      { label: "Daily rotation", suffix: "services/day" },
      { label: "Average wine ticket", suffix: "€/bottle" },
      { label: "Bottles per service", suffix: "bottles" },
    ],
    calc_btn: "Calculate ROI",
    current_label: "Current wine revenue",
    daily: "Daily", monthly: "Monthly", annual: "Annual",
    increment: "increment",
    daily_plus: "+Daily", new_monthly: "New monthly", new_annual: "New annual",
    chart_badge: "Visual projection",
    chart_title_1: "Annual impact on", chart_title_2: "revenue",
    bar_title: "Annual comparison", line_title: "Monthly projection",
    actual: "Current", revenue: "Revenue",
    cta_badge: "Take the next step",
    cta_title_1: "Discover how to increase your", cta_title_2: "wine sales",
    cta_desc: "We'll show you how Winerim can turn these numbers into reality for your restaurant.",
    cta_btn: "Request demo",
    link_software: "Wine list software",
    link_ticket: "Increase average ticket",
    link_cases: "Case studies",
    link_demo: "Request demo",
    months_short: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    locale: "en-GB", yr: "/yr",
    decides: ["Whether investing in wine list optimisation is profitable", "What revenue increase is realistic for your restaurant", "Where the biggest improvement potential lies: volume, price or penetration"],
    avoids: ["Making decisions without quantifying real impact", "Underestimating the wine list's improvement potential", "Investing in actions without a return projection"],
    impact: ["Quantify the potential ROI of optimising the list", "Justify investment in wine management tools", "Set achievable revenue targets"],
  },
  it: {
    seo_title: "Wine Sales ROI Calculator – Calcola il Potenziale di Vendita | Winerim",
    seo_desc: "Calcola quanto può guadagnare il tuo ristorante ottimizzando la carta dei vini. Simulatore gratuito con proiezioni di incremento del 10%, 20% e 30%.",
    badge: "Simulatore gratuito",
    h1_1: "Wine Sales ROI", h1_2: "Calculator",
    subtitle: "Scopri quanto fatturato può generare il tuo ristorante ottimizzando la carta dei vini. Inserisci i tuoi dati e ottieni proiezioni immediate.",
    bread_tools: "Strumenti", bread_self: "Wine ROI Calculator",
    data_title: "Dati del tuo ristorante",
    inputs: [
      { label: "N. di tavoli", suffix: "tavoli" },
      { label: "Rotazione giornaliera", suffix: "servizi/giorno" },
      { label: "Scontrino medio vino", suffix: "€/bottiglia" },
      { label: "Bottiglie per servizio", suffix: "bottiglie" },
    ],
    calc_btn: "Calcola ROI",
    current_label: "Fatturato attuale del vino",
    daily: "Giornaliero", monthly: "Mensile", annual: "Annuale",
    increment: "incremento",
    daily_plus: "+Giornaliero", new_monthly: "Nuovo mensile", new_annual: "Nuovo annuale",
    chart_badge: "Proiezione visiva",
    chart_title_1: "Impatto annuale sul", chart_title_2: "fatturato",
    bar_title: "Confronto annuale", line_title: "Proiezione mensile",
    actual: "Attuale", revenue: "Fatturato",
    cta_badge: "Fai il prossimo passo",
    cta_title_1: "Scopri come aumentare le tue", cta_title_2: "vendite di vino",
    cta_desc: "Ti mostriamo come Winerim può trasformare questi numeri in realtà per il tuo ristorante.",
    cta_btn: "Richiedi demo",
    link_software: "Software carta dei vini",
    link_ticket: "Aumentare lo scontrino medio",
    link_cases: "Casi di successo",
    link_demo: "Richiedi demo",
    months_short: ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
    locale: "it-IT", yr: "/anno",
    decides: ["Se investire nell'ottimizzazione della carta è redditizio", "Quale incremento di fatturato è realistico", "Dove sta il maggior potenziale: volume, prezzo o penetrazione"],
    avoids: ["Prendere decisioni senza quantificare l'impatto reale", "Sottovalutare il potenziale di miglioramento della carta", "Investire senza proiezione di ritorno"],
    impact: ["Quantificare il ROI potenziale dell'ottimizzazione", "Giustificare l'investimento in strumenti di gestione", "Stabilire obiettivi di fatturato raggiungibili"],
  },
  fr: {
    seo_title: "Wine Sales ROI Calculator – Calculez Votre Potentiel de Ventes | Winerim",
    seo_desc: "Calculez combien votre restaurant peut gagner en optimisant sa carte des vins. Simulateur gratuit avec projections d'augmentation de 10%, 20% et 30%.",
    badge: "Simulateur gratuit",
    h1_1: "Wine Sales ROI", h1_2: "Calculator",
    subtitle: "Découvrez combien de revenus votre restaurant peut générer en optimisant sa carte des vins. Entrez vos données et obtenez des projections instantanées.",
    bread_tools: "Outils", bread_self: "Wine ROI Calculator",
    data_title: "Données de votre restaurant",
    inputs: [
      { label: "Nombre de tables", suffix: "tables" },
      { label: "Rotation journalière", suffix: "services/jour" },
      { label: "Ticket moyen vin", suffix: "€/bouteille" },
      { label: "Bouteilles par service", suffix: "bouteilles" },
    ],
    calc_btn: "Calculer le ROI",
    current_label: "CA vin actuel",
    daily: "Journalier", monthly: "Mensuel", annual: "Annuel",
    increment: "augmentation",
    daily_plus: "+Journalier", new_monthly: "Nouveau mensuel", new_annual: "Nouvel annuel",
    chart_badge: "Projection visuelle",
    chart_title_1: "Impact annuel sur le", chart_title_2: "chiffre d'affaires",
    bar_title: "Comparaison annuelle", line_title: "Projection mensuelle",
    actual: "Actuel", revenue: "CA",
    cta_badge: "Passez à l'étape suivante",
    cta_title_1: "Découvrez comment augmenter vos", cta_title_2: "ventes de vin",
    cta_desc: "Nous vous montrons comment Winerim peut transformer ces chiffres en réalité pour votre restaurant.",
    cta_btn: "Demander une démo",
    link_software: "Logiciel carte des vins",
    link_ticket: "Augmenter le ticket moyen",
    link_cases: "Cas clients",
    link_demo: "Demander une démo",
    months_short: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    locale: "fr-FR", yr: "/an",
    decides: ["Si investir dans l'optimisation de la carte est rentable", "Quelle augmentation de CA est réaliste", "Où se trouve le plus grand potentiel : volume, prix ou pénétration"],
    avoids: ["Prendre des décisions sans quantifier l'impact réel", "Sous-estimer le potentiel d'amélioration de la carte", "Investir sans projection de retour"],
    impact: ["Quantifier le ROI potentiel de l'optimisation", "Justifier l'investissement en outils de gestion du vin", "Établir des objectifs de CA atteignables"],
  },
};

const WineROICalculator = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const formatEur = (n: number) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const [tables, setTables] = useState(20);
  const [rotationPerDay, setRotationPerDay] = useState(2);
  const [avgWineTicket, setAvgWineTicket] = useState(25);
  const [bottlesPerService, setBottlesPerService] = useState(15);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "roi-calc-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Wine Sales ROI Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.seo_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("roi-calc-jsonld")?.remove(); };
  }, [t]);

  const results = useMemo(() => {
    const dailyRevenue = bottlesPerService * avgWineTicket * rotationPerDay;
    const monthlyRevenue = dailyRevenue * DAYS_PER_MONTH;
    const annualRevenue = monthlyRevenue * MONTHS_PER_YEAR;

    const projections = INCREMENTS.map((pct) => {
      const uplift = dailyRevenue * (pct / 100);
      return {
        pct,
        dailyUplift: uplift,
        monthlyUplift: uplift * DAYS_PER_MONTH,
        annualUplift: uplift * DAYS_PER_MONTH * MONTHS_PER_YEAR,
        newMonthly: monthlyRevenue + uplift * DAYS_PER_MONTH,
        newAnnual: annualRevenue + uplift * DAYS_PER_MONTH * MONTHS_PER_YEAR,
      };
    });

    const monthlyChart = Array.from({ length: 12 }, (_, i) => ({
      name: t.months_short[i],
      actual: monthlyRevenue,
      "+10%": projections[0].newMonthly,
      "+20%": projections[1].newMonthly,
      "+30%": projections[2].newMonthly,
    }));

    const barData = [
      { name: t.actual, value: annualRevenue, fill: "hsl(var(--muted-foreground))" },
      { name: "+10%", value: projections[0].newAnnual, fill: "hsl(var(--wine) / 0.5)" },
      { name: "+20%", value: projections[1].newAnnual, fill: "hsl(var(--wine) / 0.75)" },
      { name: "+30%", value: projections[2].newAnnual, fill: "hsl(var(--wine))" },
    ];

    return { dailyRevenue, monthlyRevenue, annualRevenue, projections, monthlyChart, barData };
  }, [tables, rotationPerDay, avgWineTicket, bottlesPerService, t]);

  const inputDefs = [
    { value: tables, set: setTables, min: 1, max: 200, step: 1, icon: Users },
    { value: rotationPerDay, set: setRotationPerDay, min: 1, max: 5, step: 0.5, icon: RotateCcw },
    { value: avgWineTicket, set: setAvgWineTicket, min: 5, max: 200, step: 1, icon: DollarSign },
    { value: bottlesPerService, set: setBottlesPerService, min: 1, max: 100, step: 1, icon: Wine },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`https://winerim.wine${localePath("/wine-roi-calculator")}`} hreflang={allLangPaths("/wine-roi-calculator")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1_1}{" "}<span className="text-gradient-wine italic">{t.h1_2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* CALCULATOR */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 sticky top-28">
                <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                  <Layers size={18} className="text-wine" /> {t.data_title}
                </h2>
                <div className="space-y-6">
                  {inputDefs.map((inp, i) => {
                    const Icon = inp.icon;
                    const meta = t.inputs[i];
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Icon size={14} className="text-wine" /> {meta.label}
                          </label>
                          <span className="text-sm font-semibold text-wine">{inp.value} {meta.suffix}</span>
                        </div>
                        <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                          onChange={(e) => { inp.set(Number(e.target.value)); setCalculated(true); }}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-wine" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{inp.min}</span><span>{inp.max}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {!calculated && (
                  <button onClick={() => { setCalculated(true); trackAction("tool_use", "tool", "wine-roi-calculator"); }}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                    <Calculator size={16} /> {t.calc_btn}
                  </button>
                )}
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: calculated ? 1 : 0.4, y: 0 }}
                className="bg-gradient-card rounded-2xl border border-border p-6">
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-1">{t.current_label}</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div><p className="text-xs text-muted-foreground mb-1">{t.daily}</p><p className="font-heading text-lg font-bold">{formatEur(results.dailyRevenue)}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">{t.monthly}</p><p className="font-heading text-lg font-bold">{formatEur(results.monthlyRevenue)}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">{t.annual}</p><p className="font-heading text-lg font-bold text-wine">{formatEur(results.annualRevenue)}</p></div>
                </div>
              </motion.div>

              {results.projections.map((proj, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: calculated ? 1 : 0.3, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-gradient-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-wine" />
                      <span className="font-heading font-bold">+{proj.pct}% {t.increment}</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-wine/10 text-wine font-semibold">
                      +{formatEur(proj.annualUplift)}{t.yr}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-xs text-muted-foreground mb-1">{t.daily_plus}</p><p className="text-sm font-semibold">{formatEur(proj.dailyUplift)}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">{t.new_monthly}</p><p className="text-sm font-semibold">{formatEur(proj.newMonthly)}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">{t.new_annual}</p><p className="text-sm font-semibold text-wine">{formatEur(proj.newAnnual)}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHARTS */}
      {calculated && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.chart_badge}</p>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
                {t.chart_title_1}{" "}<span className="text-gradient-wine italic">{t.chart_title_2}</span>
              </h2>
            </ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-wine" /> {t.bar_title}</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={results.barData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [formatEur(value), t.revenue]} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {results.barData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-wine" /> {t.line_title}</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={results.monthlyChart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [formatEur(value), ""]} />
                    <Line type="monotone" dataKey="actual" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} name={t.actual} />
                    <Line type="monotone" dataKey="+10%" stroke="hsl(var(--wine) / 0.5)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="+20%" stroke="hsl(var(--wine) / 0.75)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="+30%" stroke="hsl(var(--wine))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.cta_badge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.cta_title_1}{" "}<span className="text-gradient-wine italic">{t.cta_title_2}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.cta_desc}</p>
              <Link to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.cta_btn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: t.link_software, type: "solution" },
        { to: localePath("/soluciones/aumentar-ticket-medio-restaurante"), label: t.link_ticket, type: "solution" },
        { to: localePath("/casos-exito"), label: t.link_cases, type: "guide" },
        { to: localePath("/demo"), label: t.link_demo, type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WineROICalculator;
