import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, Globe, TrendingUp,
  GlassWater, Layers, MapPin
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const stats = [
  { label: "Referencias medias", value: "42", sub: "por restaurante", icon: Wine },
  { label: "Precio medio botella", value: "32 €", sub: "en carta", icon: TrendingUp },
  { label: "Precio medio copa", value: "7,50 €", sub: "vino por copa", icon: GlassWater },
  { label: "% vino por copa", value: "18%", sub: "de las referencias", icon: Layers },
];

const priceByCountry = [
  { country: "España", price: 28, fill: "hsl(var(--wine))" },
  { country: "Francia", price: 42, fill: "hsl(var(--wine) / 0.85)" },
  { country: "Italia", price: 35, fill: "hsl(var(--wine) / 0.7)" },
  { country: "Portugal", price: 24, fill: "hsl(var(--wine) / 0.55)" },
  { country: "Argentina", price: 26, fill: "hsl(var(--wine) / 0.45)" },
  { country: "Chile", price: 22, fill: "hsl(var(--wine) / 0.35)" },
];

const styleDistribution = [
  { name: "Tinto", value: 45, fill: "hsl(var(--wine))" },
  { name: "Blanco", value: 28, fill: "hsl(var(--wine) / 0.6)" },
  { name: "Espumoso", value: 12, fill: "hsl(var(--wine) / 0.4)" },
  { name: "Rosado", value: 8, fill: "hsl(var(--wine) / 0.25)" },
  { name: "Dulce/Generoso", value: 7, fill: "hsl(var(--muted-foreground) / 0.5)" },
];

const priceRanges = [
  { range: "< 20 €", pct: 15 },
  { range: "20–30 €", pct: 28 },
  { range: "30–45 €", pct: 30 },
  { range: "45–60 €", pct: 15 },
  { range: "60–90 €", pct: 8 },
  { range: "> 90 €", pct: 4 },
];

const monthlyTrend = [
  { month: "Ene", refs: 38, price: 30 },
  { month: "Feb", refs: 39, price: 30.5 },
  { month: "Mar", refs: 40, price: 31 },
  { month: "Abr", refs: 41, price: 31.2 },
  { month: "May", refs: 41, price: 31.5 },
  { month: "Jun", refs: 42, price: 32 },
  { month: "Jul", refs: 43, price: 32.5 },
  { month: "Ago", refs: 42, price: 32.2 },
  { month: "Sep", refs: 43, price: 32.8 },
  { month: "Oct", refs: 44, price: 33 },
  { month: "Nov", refs: 43, price: 32.5 },
  { month: "Dic", refs: 42, price: 32 },
];

const formatEur = (n: number) => `${n} €`;

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.07 ? (
    <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {name}
    </text>
  ) : null;
};

const WineListBenchmark = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "benchmark-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Wine List Benchmark – Estadísticas del mercado de cartas de vinos",
      description: "Datos agregados del mercado: referencias medias, precios, distribución de estilos y tendencias en cartas de vinos de restaurantes.",
      author: { "@type": "Organization", name: "Winerim" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("benchmark-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine List Benchmark – Estadísticas de cartas de vinos | Winerim"
        description="Estadísticas agregadas del mercado de cartas de vinos: referencias medias, precios por botella y copa, distribución de estilos y precios por país."
        url="https://winerim.wine/wine-list-benchmark"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Wine List Benchmark" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Datos de mercado</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Wine List{" "}<span className="text-gradient-wine italic">Benchmark</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Estadísticas agregadas de cartas de vinos en restaurantes. Compara tu carta con el mercado y detecta oportunidades.
          </motion.p>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-wine" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-wine mb-1">{s.value}</p>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CHARTS ROW 1 */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Análisis detallado</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Datos del mercado de{" "}<span className="text-gradient-wine italic">cartas de vinos</span>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Price by country */}
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-wine" /> Precio medio por país de origen
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={priceByCountry} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                    <YAxis type="category" dataKey="country" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [formatEur(v), "Precio medio"]} />
                    <Bar dataKey="price" radius={[0, 6, 6, 0]}>
                      {priceByCountry.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollReveal>

            {/* Style distribution */}
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <Wine size={16} className="text-wine" /> Distribución por estilo
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={styleDistribution} cx="50%" cy="50%" outerRadius={110} innerRadius={50} dataKey="value" labelLine={false} label={renderCustomLabel}>
                      {styleDistribution.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Porcentaje"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {styleDistribution.map((s, i) => (
                    <span key={i} className="text-xs flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
                      {s.name} ({s.value}%)
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CHARTS ROW 2 */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Price ranges */}
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-6">
              <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-wine" /> Distribución por rango de precio
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={priceRanges} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Porcentaje"]} />
                  <Bar dataKey="pct" fill="hsl(var(--wine))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          {/* Trend */}
          <ScrollReveal delay={0.08}>
            <div className="bg-gradient-card rounded-2xl border border-border p-6">
              <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-wine" /> Tendencia anual
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line yAxisId="left" type="monotone" dataKey="refs" stroke="hsl(var(--wine))" strokeWidth={2} dot={false} name="Referencias" />
                  <Line yAxisId="right" type="monotone" dataKey="price" stroke="hsl(var(--wine) / 0.5)" strokeWidth={2} dot={false} name="Precio medio (€)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Compara tu carta</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Analiza tu carta frente al{" "}<span className="text-gradient-wine italic">mercado</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Sube tu carta de vinos y compárala con las estadísticas del sector. Descubre dónde estás por encima o por debajo de la media.
              </p>
              <Link to="/wine-list-analyzer" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Analizar mi carta <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/blog/cuantos-vinos-carta-restaurante", label: "Cuántos vinos en carta", type: "guide" },
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta", type: "guide" },
        { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
        { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
      ]} />
      <Footer />
    </div>
  );
};

export default WineListBenchmark;
