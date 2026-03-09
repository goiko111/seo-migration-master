import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Utensils, BarChart3, Eye, ShoppingCart,
  QrCode, Smartphone, Globe, Palette, Wine, Filter, Search,
  RefreshCw, Bell, TrendingUp, FileText, Languages, Zap,
  Clock, Rocket, CheckCircle, Calendar, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const coreFeatures = [
  { icon: Sparkles, title: "Recomendaciones IA", desc: "La inteligencia artificial sugiere vinos según las preferencias del comensal, el plato elegido y el contexto." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "Propuestas de maridaje instantáneas para cada plato del menú, generadas por IA." },
  { icon: BarChart3, title: "Comparador de vinos", desc: "El comensal compara opciones con información clara, visual y detallada." },
  { icon: Eye, title: "Información visual", desc: "Notas de cata accesibles, sin tecnicismos, con imágenes y fichas claras." },
  { icon: ShoppingCart, title: "Venta guiada", desc: "La carta conduce al cliente hacia mejores decisiones de compra de forma natural." },
  { icon: QrCode, title: "Acceso por QR", desc: "El comensal accede a la carta escaneando un QR desde su móvil, sin descargas." },
  { icon: Filter, title: "Filtros sensoriales", desc: "Busca vinos por sabor, cuerpo, intensidad o estilo en vez de por región o uva." },
  { icon: Search, title: "Buscador inteligente", desc: "Encuentra cualquier referencia en segundos con búsqueda por nombre, bodega o DO." },
  { icon: Wine, title: "Gestión de bodega", desc: "Control total de tu stock con alertas de agotamiento y rotación de referencias." },
  { icon: FileText, title: "Notas de cata IA", desc: "Generación automática de descripciones atractivas para cada vino." },
  { icon: Languages, title: "Multiidioma", desc: "Carta traducida automáticamente para comensales internacionales." },
  { icon: Palette, title: "Personalización total", desc: "Adapta colores, logo, tipografía y estructura a la identidad de tu restaurante." },
];

const managementFeatures = [
  { icon: RefreshCw, title: "Rotación automática", desc: "Destaca vinos diferentes cada semana para fomentar la exploración." },
  { icon: Bell, title: "Alertas de stock", desc: "Notificaciones cuando un vino está por agotarse." },
  { icon: TrendingUp, title: "Analítica de ventas", desc: "Dashboard con datos de venta por vino, categoría y periodo." },
  { icon: Globe, title: "Multirestaurante", desc: "Gestiona la carta de varios locales desde un solo panel." },
  { icon: Smartphone, title: "App de gestión", desc: "Actualiza la carta desde cualquier dispositivo en segundos." },
  { icon: Zap, title: "Alta instantánea", desc: "Añade vinos en segundos con nuestra base de datos de +500.000 referencias." },
];

interface ChangelogEntry {
  date: string;
  title: string;
  desc: string;
  tag: "new" | "improvement" | "fix";
}

const changelog: ChangelogEntry[] = [
  { date: "Feb 2026", title: "Filtros sensoriales v2", desc: "Nueva interfaz de filtrado por perfil aromático y textura.", tag: "new" },
  { date: "Ene 2026", title: "Comparador mejorado", desc: "Ahora compara hasta 4 vinos simultáneamente con gráficos radar.", tag: "improvement" },
  { date: "Dic 2025", title: "Traducción automática", desc: "Carta traducida a 12 idiomas en tiempo real.", tag: "new" },
  { date: "Nov 2025", title: "Dashboard analítico v3", desc: "Nuevos KPIs de rentabilidad por copa y rotación semanal.", tag: "improvement" },
  { date: "Oct 2025", title: "Alta masiva de vinos", desc: "Importa tu bodega completa desde Excel o CSV en un clic.", tag: "new" },
  { date: "Sep 2025", title: "Integración Revo TPV", desc: "Sincronización bidireccional con Revo para ventas y stock.", tag: "new" },
];

interface RoadmapEntry {
  quarter: string;
  items: string[];
}

const roadmap: RoadmapEntry[] = [
  { quarter: "Q2 2026", items: ["Recomendaciones por historial del comensal", "Integración con plataformas de reservas", "Widget embebido para web del restaurante"] },
  { quarter: "Q3 2026", items: ["App nativa para comensales", "Programa de fidelización de vinos", "Marketplace de bodegas"] },
  { quarter: "Q4 2026", items: ["IA predictiva de tendencias de consumo", "Carta de vinos con realidad aumentada", "API pública v2"] },
];

const tagColors: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  improvement: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  fix: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const tagLabels: Record<string, string> = {
  new: "Nuevo",
  improvement: "Mejora",
  fix: "Corrección",
};

const Funcionalidades = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Funcionalidades de Winerim | Carta de Vinos Inteligente"
        description="Descubre todas las funcionalidades de Winerim: recomendaciones IA, maridajes automáticos, filtros sensoriales, analítica, gestión de bodega y mucho más."
        url="https://winerim.wine/funcionalidades"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "Funcionalidades" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Todo en uno</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Todo lo que <span className="text-gradient-wine italic">Winerim</span> puede hacer por ti
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Una plataforma completa para transformar tu carta de vinos en una herramienta de venta inteligente.
          </motion.p>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Para el comensal</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Experiencia del <span className="text-gradient-wine italic">cliente</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Para el restaurante</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Gestión y <span className="text-gradient-wine italic">analítica</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 transition-all duration-300">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="section-padding" id="changelog">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Changelog</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Últimas <span className="text-gradient-wine italic">novedades</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Winerim evoluciona constantemente. Estas son las últimas funcionalidades lanzadas.
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {changelog.map((entry, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="relative pl-12 md:pl-16">
                    {/* Dot */}
                    <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-wine border-2 border-background" />
                    <div className="bg-gradient-card rounded-xl border border-border p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                          <Calendar size={12} /> {entry.date}
                        </span>
                        <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${tagColors[entry.tag]}`}>
                          {tagLabels[entry.tag]}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold mb-1">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section-padding bg-gradient-dark" id="roadmap">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Roadmap</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Lo que viene en <span className="text-gradient-wine italic">Winerim</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Nuestro plan de desarrollo para los próximos meses.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-7 h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5 mb-5">
                    <Rocket size={12} className="text-wine" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{q.quarter}</span>
                  </div>
                  <ul className="space-y-3">
                    {q.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle size={16} className="text-wine/50 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Empieza hoy</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  Descubre Winerim en <span className="text-gradient-wine italic">acción</span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Prueba todas estas funcionalidades gratis durante 14 días. Sin compromiso.
                </p>
                <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  Prueba Gratis <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <InternalLinks currentPath="/funcionalidades" />
      <Footer />
    </div>
  );
};

export default Funcionalidades;
