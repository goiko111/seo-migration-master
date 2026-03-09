import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, Calculator, BarChart3,
  DollarSign, Users, RotateCcw, Layers
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

const INCREMENTS = [10, 20, 30] as const;
const DAYS_PER_MONTH = 26;
const MONTHS_PER_YEAR = 12;

const formatEur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const WineROICalculator = () => {
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
      description: "Calcula cuánto puede ganar tu restaurante optimizando su carta de vinos.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("roi-calc-jsonld")?.remove(); };
  }, []);

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
      name: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][i],
      actual: monthlyRevenue,
      "+10%": projections[0].newMonthly,
      "+20%": projections[1].newMonthly,
      "+30%": projections[2].newMonthly,
    }));

    const barData = [
      { name: "Actual", value: annualRevenue, fill: "hsl(var(--muted-foreground))" },
      { name: "+10%", value: projections[0].newAnnual, fill: "hsl(var(--wine) / 0.5)" },
      { name: "+20%", value: projections[1].newAnnual, fill: "hsl(var(--wine) / 0.75)" },
      { name: "+30%", value: projections[2].newAnnual, fill: "hsl(var(--wine))" },
    ];

    return { dailyRevenue, monthlyRevenue, annualRevenue, projections, monthlyChart, barData };
  }, [tables, rotationPerDay, avgWineTicket, bottlesPerService]);

  const inputs = [
    { label: "Nº de mesas", value: tables, set: setTables, min: 1, max: 200, step: 1, icon: Users, suffix: "mesas" },
    { label: "Rotación diaria", value: rotationPerDay, set: setRotationPerDay, min: 1, max: 5, step: 0.5, icon: RotateCcw, suffix: "servicios/día" },
    { label: "Ticket medio de vino", value: avgWineTicket, set: setAvgWineTicket, min: 5, max: 200, step: 1, icon: DollarSign, suffix: "€/botella" },
    { label: "Botellas por servicio", value: bottlesPerService, set: setBottlesPerService, min: 1, max: 100, step: 1, icon: Wine, suffix: "botellas" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine Sales ROI Calculator – Calcula tu potencial de ventas | Winerim"
        description="Calcula cuánto puede ganar tu restaurante optimizando su carta de vinos. Simulador gratuito con proyecciones de incremento del 10%, 20% y 30%."
        url="https://winerim.wine/wine-roi-calculator"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Simulador gratuito</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Wine Sales ROI{" "}<span className="text-gradient-wine italic">Calculator</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Descubre cuánto dinero puede ganar tu restaurante optimizando su carta de vinos. Introduce tus datos y obtén proyecciones al instante.
          </motion.p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 sticky top-28">
                <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                  <Layers size={18} className="text-wine" />
                  Datos de tu restaurante
                </h2>
                <div className="space-y-6">
                  {inputs.map((inp, i) => {
                    const Icon = inp.icon;
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Icon size={14} className="text-wine" />
                            {inp.label}
                          </label>
                          <span className="text-sm font-semibold text-wine">{inp.value} {inp.suffix}</span>
                        </div>
                        <input
                          type="range"
                          min={inp.min}
                          max={inp.max}
                          step={inp.step}
                          value={inp.value}
                          onChange={(e) => { inp.set(Number(e.target.value)); setCalculated(true); }}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-wine"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{inp.min}</span>
                          <span>{inp.max}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!calculated && (
                  <button
                    onClick={() => setCalculated(true)}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                  >
                    <Calculator size={16} />
                    Calcular ROI
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Results */}
            <div className="space-y-6">
              {/* Current revenue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: calculated ? 1 : 0.4, y: 0 }}
                className="bg-gradient-card rounded-2xl border border-border p-6"
              >
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-1">Ingresos actuales de vino</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Diario</p>
                    <p className="font-heading text-lg font-bold">{formatEur(results.dailyRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Mensual</p>
                    <p className="font-heading text-lg font-bold">{formatEur(results.monthlyRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Anual</p>
                    <p className="font-heading text-lg font-bold text-wine">{formatEur(results.annualRevenue)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Projections */}
              {results.projections.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: calculated ? 1 : 0.3, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-wine" />
                      <span className="font-heading font-bold">+{proj.pct}% incremento</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-wine/10 text-wine font-semibold">
                      +{formatEur(proj.annualUplift)}/año
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">+Diario</p>
                      <p className="text-sm font-semibold">{formatEur(proj.dailyUplift)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Nuevo mensual</p>
                      <p className="text-sm font-semibold">{formatEur(proj.newMonthly)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Nuevo anual</p>
                      <p className="text-sm font-semibold text-wine">{formatEur(proj.newAnnual)}</p>
                    </div>
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Proyección visual</p>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
                Impacto anual en{" "}<span className="text-gradient-wine italic">ingresos</span>
              </h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Bar chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-wine" />
                  Comparativa anual
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={results.barData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      formatter={(value: number) => [formatEur(value), "Ingresos"]}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {results.barData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Line chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-wine" />
                  Proyección mensual
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={results.monthlyChart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      formatter={(value: number) => [formatEur(value), ""]}
                    />
                    <Line type="monotone" dataKey="actual" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} name="Actual" />
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
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Da el siguiente paso</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre cómo aumentar tus{" "}<span className="text-gradient-wine italic">ventas de vino</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Te mostramos cómo Winerim puede convertir estos números en realidad para tu restaurante.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                Solicitar demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WineROICalculator;
