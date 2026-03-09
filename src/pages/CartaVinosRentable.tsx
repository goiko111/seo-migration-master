import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, DollarSign, Target, TrendingUp,
  BarChart3, Layers, Users, Utensils, Search,
  Sparkles, CheckCircle, Scale, RotateCcw, Eye,
  ShoppingCart, GlassWater, Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const commonProblems = [
  { icon: DollarSign, text: "Precios mal estructurados con saltos bruscos que desorientan al cliente" },
  { icon: Layers, text: "Demasiadas referencias similares que compiten entre sí y diluyen las ventas" },
  { icon: Target, text: "Falta de vinos estratégicos que guíen la decisión hacia opciones rentables" },
  { icon: Search, text: "Mala organización que dificulta la exploración y reduce el tiempo de decisión" },
];

const profitPrinciples = [
  {
    icon: Scale,
    title: "Equilibrio entre estilos",
    desc: "Una carta rentable no repite perfiles. Cada vino debe cubrir un nicho distinto: fresco, estructurado, aromático, potente. Si dos vinos se parecen demasiado, uno sobra.",
  },
  {
    icon: DollarSign,
    title: "Variedad de rangos de precio",
    desc: "Tu carta necesita peldaños: entrada, medio, premium y alta gama. Sin huecos ni saltos. El cliente debe sentir que elige libremente, no que lo empujan.",
  },
  {
    icon: Award,
    title: "Vinos ancla",
    desc: "1-2 vinos premium cuya función no es venderse, sino hacer que los vinos de rango medio parezcan una gran elección. El efecto ancla es una de las herramientas más potentes en pricing.",
  },
  {
    icon: GlassWater,
    title: "Oferta clara por copa",
    desc: "El vino por copa es el motor de rentabilidad. Permite probar, reduce la barrera de entrada y genera márgenes superiores al 70%. Mínimo 6-8 opciones bien seleccionadas.",
  },
];

const priceRanges = [
  { range: "20–30 €", label: "Entrada", pct: "30-35%", desc: "Vinos de rotación alta. El cliente que no quiere complicarse. Deben ser buenos, reconocibles y con buen margen." },
  { range: "30–50 €", label: "Zona media", pct: "35-40%", desc: "Aquí se concentra la mayor parte de las ventas. Vinos con personalidad, buena relación calidad-precio y margen óptimo." },
  { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Para ocasiones especiales y clientes que buscan algo diferente. Denominaciones reconocidas y productores de autor." },
  { range: "80 €+", label: "Alta gama", pct: "5-10%", desc: "Vinos ancla y grandes referencias. Baja rotación pero alta percepción de valor. Elevan el posicionamiento de toda la carta." },
];

const selectionFactors = [
  { icon: Utensils, title: "Tipo de cocina", desc: "Tu carta de vinos debe complementar tu cocina, no competir con ella. Una parrilla necesita tintos con cuerpo; una cocina asiática, blancos aromáticos y vinos con acidez." },
  { icon: Users, title: "Perfil del cliente", desc: "¿Tu cliente es un profesional del vino o alguien que busca disfrutar sin complicaciones? Esto define si necesitas profundidad o accesibilidad en tu selección." },
  { icon: DollarSign, title: "Ticket medio", desc: "Si tu ticket medio es de 40€, tu carta debe concentrar la oferta entre 20-50€ por botella. El vino debería representar un 30-40% del gasto total del comensal." },
  { icon: RotateCcw, title: "Rotación esperada", desc: "Cada referencia debe justificar su espacio en bodega. Si un vino no se vende al menos 2-3 veces al mes, plantéate sustituirlo por una opción más demandada." },
];

const presentationTips = [
  { icon: Eye, title: "Descripciones simples y evocadoras", desc: "Nada de jerga enológica. \"Fresco, con notas cítricas, ideal con pescado\" vende más que \"fermentación maloláctica parcial en barrica de roble francés\"." },
  { icon: Layers, title: "Categorías claras e intuitivas", desc: "Elige un criterio de organización y mantenlo. Por estilo funciona mejor que por región para la mayoría de clientes. Máximo 4-5 categorías principales." },
  { icon: Sparkles, title: "Recomendaciones destacadas", desc: "Señala 2-3 vinos por sección como \"selección del sommelier\" o \"mejor relación calidad-precio\". El cliente agradece la guía y tú diriges hacia los vinos más rentables." },
];

const techBenefits = [
  { icon: BarChart3, title: "Analizar la estructura de la carta", desc: "Visualiza la distribución por tipo, precio y estilo. Detecta desequilibrios, huecos de precio y oportunidades de mejora." },
  { icon: DollarSign, title: "Optimizar precios", desc: "Compara tus precios con el mercado, identifica vinos con margen bajo y ajusta la escalera de precios para maximizar la rentabilidad." },
  { icon: Target, title: "Identificar oportunidades", desc: "Descubre qué estilos o rangos de precio están infrarrepresentados en tu carta y dónde hay demanda sin cubrir." },
  { icon: TrendingUp, title: "Mejorar la rotación", desc: "Seguimiento de ventas por referencia. Identifica los vinos que no se mueven y toma decisiones basadas en datos reales." },
];

const results = [
  { value: "+18%", label: "Ticket medio", desc: "Aumento medio del gasto por mesa gracias a una carta mejor estructurada y con recomendaciones claras." },
  { value: "+25%", label: "Margen bruto", desc: "Mejora de márgenes optimizando la selección de vinos y ajustando la escalera de precios." },
  { value: "x2", label: "Rotación", desc: "Duplicación de la rotación media al eliminar referencias de baja venta y potenciar las de alta demanda." },
];

const CartaVinosRentable = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "carta-rentable-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cómo diseñar una carta de vinos rentable",
      description: "Estrategias para estructurar tu carta de vinos de forma que aumente las ventas, mejore el ticket medio y optimice tus márgenes.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/blog/como-disenar-carta-vinos-rentable",
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://winerim.wine/blog" },
          { "@type": "ListItem", position: 3, name: "Carta de vinos rentable", item: "https://winerim.wine/blog/como-disenar-carta-vinos-rentable" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("carta-rentable-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cómo Diseñar una Carta de Vinos Rentable | Guía para Restaurantes"
        description="Aprende a diseñar una carta de vinos que maximice ventas y márgenes. Estrategias de pricing, wine mapping, selección de vinos y presentación para restaurantes."
        url="https://winerim.wine/blog/como-disenar-carta-vinos-rentable"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <DollarSign size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Rentabilidad</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Cómo diseñar una carta de vinos rentable
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Estrategias para estructurar tu carta de vinos de forma que aumente las ventas, mejore el ticket medio y optimice tus márgenes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Analizar mi carta de vinos <ArrowRight size={16} />
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              Solicitar demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">El vino: tu mayor oportunidad de rentabilidad</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            El vino es uno de los productos con mayor margen en restauración. Sin embargo, muchas cartas de vinos no están diseñadas para maximizar su potencial. Precios sin estrategia, referencias que compiten entre sí, falta de guía para el cliente… son errores que cuestan dinero cada día.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Diseñar una carta de vinos rentable no significa subir precios. Significa estructurar tu oferta de forma inteligente para que el cliente elija mejor, gaste más y repita.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {commonProblems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                  <p.icon size={20} className="text-wine" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. PRINCIPIOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Fundamentos</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Principios de una carta de vinos rentable</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Antes de elegir vinos o poner precios, necesitas entender los principios que hacen que una carta funcione económicamente.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {profitPrinciples.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                    <p.icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WINE MAPPING */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Wine mapping</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">La importancia del wine mapping</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            El wine mapping consiste en distribuir tus vinos en rangos de precio estratégicos. Cada rango debe tener un propósito, un porcentaje de la carta y un margen objetivo.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {priceRanges.map((pr, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-wine">{pr.range}</span>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">{pr.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pr.desc}</p>
                <p className="text-xs font-semibold text-foreground/70">Peso ideal en la carta: <span className="text-wine">{pr.pct}</span></p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 p-6 rounded-xl border border-wine/20 bg-wine/5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Consejo:</strong> Evita los huecos de precio. Si pasas de 28€ a 52€ sin opciones intermedias, el cliente se siente empujado. La escalera de precios debe ser fluida, con 2-3 opciones en cada peldaño.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. ELEGIR LOS VINOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Selección</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cómo elegir los vinos adecuados</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Cada vino de tu carta debe cumplir una función. No se trata de poner los vinos que más te gustan, sino los que mejor funcionan para tu negocio.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {selectionFactors.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-background">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={20} className="text-wine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRESENTACIÓN */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Presentación</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cómo presentar los vinos para vender más</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            La forma en que presentas el vino influye directamente en la decisión del cliente. Una buena presentación no solo informa, sino que guía hacia las opciones más rentables.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {presentationTips.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                  <t.icon size={20} className="text-wine" />
                </div>
                <h3 className="font-heading font-bold mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. TECNOLOGÍA */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Winerim</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cómo la tecnología optimiza tu rentabilidad</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Herramientas como Winerim te permiten tomar decisiones basadas en datos, no en intuición. Analiza, optimiza y monitoriza tu carta de vinos en tiempo real.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {techBenefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                    <b.icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESULTADOS */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Impacto</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Resultados de una carta bien diseñada</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Los restaurantes que optimizan su carta de vinos con criterio y datos obtienen mejoras significativas en sus principales indicadores.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center p-8 rounded-xl border border-border bg-gradient-card">
                <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{r.value}</p>
                <p className="font-semibold text-foreground mb-2">{r.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              Descubre cómo optimizar la rentabilidad de tu carta de vinos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas para maximizar tus ventas y márgenes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Solicitar análisis gratuito <ArrowRight size={16} />
              </Link>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Solicitar demo
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CartaVinosRentable;
