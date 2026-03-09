import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, TrendingUp, Wine, BarChart3, Utensils, Calculator,
  Brain, DollarSign, Download, Search, FileText, CheckCircle,
  Layers, Building2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useEffect } from "react";

/* ── Guides ── */
const guides = [
  {
    to: "/blog/como-organizar-carta-de-vinos",
    icon: BookOpen,
    title: "Cómo organizar una carta de vinos",
    desc: "Guía práctica para estructurar tu carta de forma clara, rentable y fácil de entender para tus clientes.",
  },
  {
    to: "/blog/cuantos-vinos-carta-restaurante",
    icon: Wine,
    title: "Cuántos vinos debe tener una carta",
    desc: "Define el número ideal de referencias según tu tipo de restaurante, cocina y perfil de cliente.",
  },
  {
    to: "/blog/como-disenar-carta-vinos-rentable",
    icon: DollarSign,
    title: "Cómo diseñar una carta de vinos rentable",
    desc: "Estrategias de pricing, wine mapping y selección para maximizar ventas y márgenes.",
  },
  {
    to: "/como-vender-mas-vino-en-un-restaurante",
    icon: TrendingUp,
    title: "Cómo vender más vino en un restaurante",
    desc: "Estrategias probadas para aumentar las ventas de vino y mejorar la experiencia del cliente.",
  },
  {
    to: "/vino-por-copa-restaurante",
    icon: Wine,
    title: "Vino por copa en restaurantes",
    desc: "Todo lo que necesitas saber para implementar y optimizar un programa de vino por copa.",
  },
  {
    to: "/precio-vino-restaurante",
    icon: Calculator,
    title: "Cómo poner precio al vino",
    desc: "Guía sobre márgenes, multiplicadores y estrategias de pricing para maximizar la rentabilidad.",
  },
  {
    to: "/como-hacer-una-carta-de-vinos",
    icon: FileText,
    title: "Cómo hacer una carta de vinos",
    desc: "Guía paso a paso para crear una carta de vinos profesional desde cero.",
  },
  {
    to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante",
    icon: Layers,
    title: "Cómo mejorar la rotación de vinos",
    desc: "Estrategias para eliminar stock muerto y mantener una bodega rentable.",
  },
  {
    to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion",
    icon: Utensils,
    title: "Estrategia de maridaje en restauración",
    desc: "Diseña maridajes que aumenten ventas de vino y mejoren la experiencia del cliente.",
  },
];

/* ── Downloadable Resources ── */
const resources = [
  {
    to: "/recursos/plantilla-carta-de-vinos",
    icon: Download,
    title: "Plantilla de carta de vinos",
    desc: "Descarga una plantilla profesional para diseñar tu carta de vinos.",
  },
  {
    to: "/recursos/checklist-carta-de-vinos-rentable",
    icon: CheckCircle,
    title: "Checklist carta rentable",
    desc: "Revisa punto a punto si tu carta de vinos está optimizada para vender.",
  },
  {
    to: "/recursos/guia-vino-por-copa-para-restaurantes",
    icon: Wine,
    title: "Guía vino por copa",
    desc: "Todo sobre cómo diseñar y rentabilizar tu oferta de vino por copa.",
  },
  {
    to: "/recursos/plantilla-wine-mapping-restaurante",
    icon: Layers,
    title: "Plantilla wine mapping",
    desc: "Plantilla para estructurar precios y distribución de vinos en tu carta.",
  },
];

/* ── Tools ── */
const tools = [
  { to: "/wine-list-analyzer", icon: Search, title: "Analizador de carta", desc: "Analiza tu carta y recibe recomendaciones de mejora." },
  { to: "/calculadora-margen-vino", icon: Calculator, title: "Calculadora de márgenes", desc: "Calcula el margen óptimo para cada referencia." },
  { to: "/herramientas/calculadora-precio-vino-por-copa", icon: Wine, title: "Calculadora precio por copa", desc: "Calcula el precio ideal de venta por copa." },
  { to: "/wine-pricing-tool", icon: DollarSign, title: "Herramienta de pricing", desc: "Optimiza la estructura de precios de tu carta." },
  { to: "/wine-pairing-generator", icon: Utensils, title: "Generador de maridajes", desc: "Genera sugerencias de maridaje con IA." },
  { to: "/wine-roi-calculator", icon: TrendingUp, title: "Calculadora de ROI", desc: "Calcula el retorno de inversión de digitalizar tu carta." },
  { to: "/wine-list-benchmark", icon: BarChart3, title: "Benchmark de cartas", desc: "Compara tu carta con los estándares del sector." },
];

/* ── Solutions ── */
const solutions = [
  { to: "/soluciones/grupos-restauracion", icon: Building2, title: "Winerim para grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes." },
  { to: "/soluciones/aumentar-ticket-medio-restaurante", icon: BarChart3, title: "Aumentar el ticket medio", desc: "Estrategias para aumentar el gasto medio por cliente usando el vino." },
  { to: "/problemas/carta-de-vinos-no-vende", icon: TrendingUp, title: "Mi carta de vinos no vende", desc: "Diagnóstico y solución cuando tu carta de vinos no genera ventas." },
];

type SectionItem = {
  to: string;
  icon: React.ElementType;
  title: string;
  desc: string;
};

const CardGrid = ({ items, cta }: { items: SectionItem[]; cta?: string }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    {items.map((item, i) => {
      const Icon = item.icon;
      return (
        <ScrollReveal key={item.to} delay={i * 0.03}>
          <Link
            to={item.to}
            className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-5 h-full hover:shadow-lg hover:shadow-wine/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-wine" />
              </div>
            </div>
            <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            <span className="mt-3 text-[10px] font-semibold tracking-widest uppercase text-accent block">
              {cta || "Leer más →"}
            </span>
          </Link>
        </ScrollReveal>
      );
    })}
  </div>
);

const GuiasRecursos = () => {
  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "guias-collection-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Guías y recursos para restaurantes",
      description: "Guías prácticas, herramientas gratuitas y recursos descargables para optimizar tu carta de vinos.",
      url: "https://winerim.wine/guias-y-recursos",
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
    });
    document.head.appendChild(schema);
    return () => { schema.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title="Guías y recursos para restaurantes | Winerim"
        description="Guías prácticas, herramientas gratuitas y recursos descargables para optimizar tu carta de vinos, aumentar ventas y mejorar la experiencia de tus clientes."
        url="https://winerim.wine/guias-y-recursos"
      />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Guías y recursos" }]} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
            >
              Centro de conocimiento
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Guías y recursos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              Todo lo que necesitas para organizar, optimizar y rentabilizar la carta de vinos de tu restaurante.
            </motion.p>
          </div>
        </section>

        {/* Guides */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Guías y artículos</h2>
            <p className="text-muted-foreground mt-1 text-sm">Contenido educativo para profesionales de la hostelería.</p>
          </ScrollReveal>
          <CardGrid items={guides} />
        </section>

        {/* Resources */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Recursos descargables</h2>
            <p className="text-muted-foreground mt-1 text-sm">Plantillas y checklists para aplicar en tu restaurante.</p>
          </ScrollReveal>
          <CardGrid items={resources} cta="Descargar →" />
        </section>

        {/* Tools */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Herramientas gratuitas</h2>
              <p className="text-muted-foreground mt-1 text-sm">Utilidades online para analizar, calcular y mejorar tu carta.</p>
            </div>
            <Link to="/herramientas" className="hidden md:block text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors">
              Ver todas →
            </Link>
          </ScrollReveal>
          <CardGrid items={tools} cta="Usar herramienta →" />
        </section>

        {/* Solutions & Problems */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Soluciones por caso de uso</h2>
            <p className="text-muted-foreground mt-1 text-sm">Contenido específico según tu situación o tipo de negocio.</p>
          </ScrollReveal>
          <CardGrid items={solutions} cta="Ver solución →" />
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                ¿Quieres optimizar tu carta de vinos?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Descubre cómo Winerim puede ayudarte a organizar, digitalizar y rentabilizar tu oferta de vinos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Analizar mi carta gratis
                </Link>
                <Link
                  to="/demo"
                  className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors"
                >
                  Solicitar demo
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuiasRecursos;
