import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, TrendingUp, Building2, Globe, Laptop, Wine, BarChart3, Utensils, Calculator, Brain, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const guides = [
  {
    to: "/blog/como-organizar-carta-de-vinos",
    icon: BookOpen,
    title: "Cómo organizar una carta de vinos",
    desc: "Guía práctica para estructurar tu carta de forma clara, rentable y fácil de entender para tus clientes.",
    tag: "Guía",
  },
  {
    to: "/blog/cuantos-vinos-carta-restaurante",
    icon: Wine,
    title: "Cuántos vinos debe tener una carta",
    desc: "Define el número ideal de referencias según tu tipo de restaurante, cocina y perfil de cliente.",
    tag: "Guía",
  },
  {
    to: "/blog/como-disenar-carta-vinos-rentable",
    icon: DollarSign,
    title: "Cómo diseñar una carta de vinos rentable",
    desc: "Estrategias de pricing, wine mapping y selección para maximizar ventas y márgenes.",
    tag: "Guía",
  },
  {
    to: "/como-vender-mas-vino-en-un-restaurante",
    icon: TrendingUp,
    title: "Cómo vender más vino en un restaurante",
    desc: "Estrategias probadas para aumentar las ventas de vino y mejorar la experiencia del cliente.",
    tag: "Guía",
  },
  {
    to: "/soluciones/aumentar-ticket-medio-restaurante",
    icon: BarChart3,
    title: "Cómo aumentar el ticket medio",
    desc: "Estrategias para aumentar el gasto medio por cliente usando el vino como palanca de rentabilidad.",
    tag: "Solución",
  },
  {
    to: "/vino-por-copa-restaurante",
    icon: Wine,
    title: "Vino por copa en restaurantes",
    desc: "Todo lo que necesitas saber para implementar y optimizar un programa de vino por copa.",
    tag: "Guía",
  },
  {
    to: "/precio-vino-restaurante",
    icon: Calculator,
    title: "Cómo poner precio al vino en un restaurante",
    desc: "Guía sobre márgenes, multiplicadores y estrategias de pricing para maximizar la rentabilidad.",
    tag: "Guía",
  },
  {
    to: "/carta-papel-vs-digital",
    icon: Utensils,
    title: "Carta de vinos en papel vs digital",
    desc: "Comparativa completa entre la carta tradicional y la carta digital. Ventajas y desventajas.",
    tag: "Comparativa",
  },
  {
    to: "/ejemplos-carta-vinos",
    icon: BookOpen,
    title: "Ejemplos de cartas de vinos",
    desc: "Ejemplos reales de cartas de vinos bien estructuradas para inspirarte.",
    tag: "Recurso",
  },
  {
    to: "/soluciones/grupos-restauracion",
    icon: Building2,
    title: "Winerim para grupos de restauración",
    desc: "Gestión centralizada del vino para grupos con múltiples restaurantes y hoteles.",
    tag: "Solución",
  },
  {
    to: "/inteligencia-artificial-restaurantes",
    icon: Brain,
    title: "IA aplicada a restaurantes",
    desc: "Cómo la inteligencia artificial está transformando la gestión del vino en hostelería.",
    tag: "Tendencia",
  },
  {
    to: "/integraciones",
    icon: Laptop,
    title: "Integraciones de Winerim",
    desc: "Conecta Winerim con tu POS, ERP y sistemas de gestión existentes.",
    tag: "Producto",
  },
  {
    to: "/en/digital-wine-list",
    icon: Globe,
    title: "What is a digital wine list?",
    desc: "Learn how digital wine lists are transforming the way restaurants sell wine.",
    tag: "English",
  },
];

const tools = [
  { to: "/wine-list-analyzer", title: "Analizador de carta de vinos", desc: "Analiza tu carta y recibe recomendaciones de mejora." },
  { to: "/calculadora-margen-vino", title: "Calculadora de márgenes", desc: "Calcula el margen óptimo para cada referencia." },
  { to: "/wine-pricing-tool", title: "Herramienta de pricing", desc: "Optimiza la estructura de precios de tu carta." },
  { to: "/wine-pairing-generator", title: "Generador de maridajes", desc: "Genera sugerencias de maridaje con IA." },
  { to: "/wine-roi-calculator", title: "Calculadora de ROI", desc: "Calcula el retorno de inversión de digitalizar tu carta." },
  { to: "/wine-list-benchmark", title: "Benchmark de cartas", desc: "Compara tu carta con los estándares del sector." },
];

const GuiasRecursos = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <SEOHead
      title="Guías y recursos para restaurantes | Winerim"
      description="Guías prácticas, herramientas gratuitas y recursos para optimizar tu carta de vinos, aumentar ventas y mejorar la experiencia de tus clientes."
      url="https://winerim.wine/guias-y-recursos"
    />
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 section-padding text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
          Centro de conocimiento
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-6xl font-bold mb-6">
          Guías y recursos
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Todo lo que necesitas para organizar, optimizar y rentabilizar la carta de vinos de tu restaurante.
        </motion.p>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Guías y artículos</h2>
          <p className="text-muted-foreground mt-2">Contenido educativo para profesionales de la hostelería.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <motion.div key={guide.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <Link to={guide.to}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">{guide.tag}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                  <span className="mt-4 text-xs font-semibold tracking-widest uppercase text-accent block">Leer más →</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Herramientas gratuitas</h2>
          <p className="text-muted-foreground mt-2">Utilidades online para analizar, calcular y mejorar tu carta.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div key={tool.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Link to={tool.to}
                className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5">
                <h3 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                <span className="mt-4 text-xs font-semibold tracking-widest uppercase text-accent block">Usar herramienta →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-card rounded-2xl border border-border p-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">¿Quieres optimizar tu carta de vinos?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Descubre cómo Winerim puede ayudarte a organizar, digitalizar y rentabilizar tu oferta de vinos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analisis-carta"
              className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              Analizar mi carta gratis
            </Link>
            <Link to="/demo"
              className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              Solicitar demo
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
    <Footer />
  </div>
);

export default GuiasRecursos;
