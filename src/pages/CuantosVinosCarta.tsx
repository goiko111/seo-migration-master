import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, AlertTriangle, CheckCircle, XCircle,
  BarChart3, Target, Utensils, TrendingDown, TrendingUp,
  Scale, Users, DollarSign, Layers, Search, Sparkles,
  ShoppingCart, Warehouse, HelpCircle, RotateCcw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const commonProblems = [
  { icon: Layers, text: "Cartas demasiado largas que abruman al cliente y dificultan la elección" },
  { icon: XCircle, text: "Cartas demasiado cortas que limitan la experiencia y el maridaje" },
  { icon: Scale, text: "Falta de equilibrio entre estilos, regiones y rangos de precio" },
  { icon: RotateCcw, text: "Duplicidad de vinos con perfiles similares que no aportan variedad real" },
];

const restaurantTypes = [
  {
    type: "Restaurante pequeño o bistró",
    range: "20–40 referencias",
    desc: "Una carta compacta y bien curada es la mejor opción. Cada vino debe tener un propósito claro: cubrir los estilos básicos, ofrecer al menos 3 rangos de precio y complementar la cocina. El cliente agradece poder elegir sin sentirse perdido.",
    tips: ["5-8 tintos, 4-6 blancos, 2-3 rosados/espumosos", "Al menos 4-6 vinos por copa", "Rotación frecuente para mantener el interés"],
  },
  {
    type: "Restaurante medio",
    range: "40–80 referencias",
    desc: "Aquí ya hay espacio para profundizar en regiones, estilos y rangos de precio. La carta debe estar bien estructurada con categorías claras para que el volumen no genere confusión. Es el punto donde la organización marca la diferencia.",
    tips: ["Dividir en secciones claras (tipo, región o estilo)", "8-12 vinos por copa como mínimo", "Incluir vinos de descubrimiento junto a clásicos"],
  },
  {
    type: "Restaurante gastronómico",
    range: "80–200 referencias",
    desc: "La carta es parte de la experiencia. El cliente espera profundidad, grandes añadas y una selección que refleje la filosofía del restaurante. Aquí el sommelier es clave para guiar, y la organización debe permitir tanto la exploración como la decisión rápida.",
    tips: ["Organización por región o estilo, no solo por tipo", "Sección de grandes formatos y añadas especiales", "Maridajes sugeridos con el menú degustación"],
  },
  {
    type: "Wine bar o vinoteca",
    range: "100–300 referencias",
    desc: "El vino es el protagonista absoluto. La carta debe invitar a explorar, descubrir y probar. La rotación es alta, y la oferta por copa debe ser generosa. Es donde más sentido tiene una carta digital interactiva.",
    tips: ["20-30 vinos por copa como mínimo", "Rotación semanal de destacados", "Fichas detalladas con notas de cata y origen"],
  },
];

const tooManyProblems = [
  { icon: HelpCircle, title: "Confusión del cliente", desc: "Cuando hay demasiadas opciones, el cliente se bloquea. La paradoja de la elección hace que termine pidiendo 'el de la casa' o lo más barato, justo lo contrario de lo que buscamos." },
  { icon: TrendingDown, title: "Dificultad para elegir", desc: "Sin una guía clara, el cliente dedica demasiado tiempo a la carta y menos a disfrutar. La experiencia se resiente y la mesa se ralentiza." },
  { icon: RotateCcw, title: "Baja rotación de referencias", desc: "Con muchas referencias, algunas nunca se venden. Ocupan espacio en bodega, inmovilizan capital y pueden deteriorarse antes de servirse." },
  { icon: Warehouse, title: "Mayor inmovilizado en bodega", desc: "Cada referencia implica stock mínimo. 200 referencias con 3 botellas de media son 600 botellas en bodega. ¿Justifica tu volumen de ventas esa inversión?" },
];

const tooFewProblems = [
  { icon: Wine, title: "Poca variedad", desc: "El cliente habitual se cansa rápido si siempre ve las mismas opciones. La falta de variedad reduce la repetición de visitas y las ganas de explorar." },
  { icon: DollarSign, title: "Falta de opciones de precio", desc: "Sin un rango amplio de precios, pierdes ventas tanto del cliente que busca algo especial como del que quiere algo accesible. La escalera de precios necesita peldaños." },
  { icon: Utensils, title: "Limitación de maridajes", desc: "Con pocos vinos, no puedes ofrecer el maridaje ideal para cada plato. La cocina y el vino deben ir de la mano, y eso requiere un mínimo de opciones." },
];

const balanceFactors = [
  { icon: Utensils, title: "Tipo de cocina", desc: "Una cocina japonesa pide vinos distintos que una parrilla argentina. Tu carta debe reflejar y complementar tu propuesta gastronómica, no competir con ella." },
  { icon: DollarSign, title: "Ticket medio", desc: "Si tu ticket medio es de 35€, no tiene sentido que el 50% de tu carta supere los 40€ por botella. Alinea tu carta con lo que tu cliente está dispuesto a gastar." },
  { icon: Users, title: "Perfil de cliente", desc: "¿Tu cliente es experto en vino o está descubriendo? Esto determina si necesitas profundidad (grandes añadas, productores de autor) o accesibilidad (descripciones claras, recomendaciones)." },
  { icon: RotateCcw, title: "Rotación de vinos", desc: "Analiza qué vinos se venden y cuáles no. Una buena carta no es la más larga, sino la que tiene la mejor rotación. Cada referencia debe ganarse su puesto." },
];

const techBenefits = [
  { icon: BarChart3, title: "Analizar la estructura de la carta", desc: "Visualiza la distribución por tipo, precio, región y estilo. Detecta desequilibrios y oportunidades de mejora de un vistazo." },
  { icon: Search, title: "Identificar duplicidades", desc: "Descubre vinos con perfiles similares que compiten entre sí. Elimina redundancias y haz que cada referencia aporte valor único." },
  { icon: Target, title: "Optimizar el número de referencias", desc: "Datos reales de venta para decidir qué vinos mantener, cuáles rotar y dónde hay huecos por cubrir en tu oferta." },
  { icon: TrendingUp, title: "Mejorar la rotación", desc: "Seguimiento de ventas por referencia para identificar los vinos que no se mueven y tomar decisiones basadas en datos, no en intuición." },
];

const CuantosVinosCarta = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "cuantos-vinos-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cuántos vinos debe tener una carta de vinos",
      description: "Guía práctica para definir el tamaño ideal de la carta de vinos según el tipo de restaurante.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/blog/cuantos-vinos-carta-restaurante",
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://winerim.wine/blog" },
          { "@type": "ListItem", position: 3, name: "Cuántos vinos debe tener una carta", item: "https://winerim.wine/blog/cuantos-vinos-carta-restaurante" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("cuantos-vinos-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cuántos Vinos Debe Tener una Carta de Vinos | Guía por Tipo de Restaurante"
        description="Descubre cuántas referencias debe tener tu carta de vinos según el tipo de restaurante. Guía práctica con recomendaciones, errores comunes y cómo optimizar el tamaño de tu carta."
        url="https://winerim.wine/blog/cuantos-vinos-carta-restaurante"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cuántos vinos en carta" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Guía para restaurantes</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Cuántos vinos debe tener una carta de vinos
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Guía práctica para definir el tamaño ideal de la carta de vinos según el tipo de restaurante.
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">¿Por qué importa el número de vinos en tu carta?</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Una de las decisiones más importantes al diseñar una carta de vinos es definir cuántas referencias incluir. No se trata solo de cantidad: el número de vinos afecta directamente a la experiencia del cliente, la rentabilidad del negocio y la operativa de bodega. Una carta con demasiados vinos genera confusión; una con muy pocos, limita las ventas. El equilibrio es la clave.
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

      {/* 3. CUÁNTOS VINOS SEGÚN TIPO DE RESTAURANTE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Recomendaciones por formato</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cuántos vinos según el tipo de restaurante</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              No existe una regla universal. El número ideal depende del formato, la cocina, el público y la operativa. Estas son orientaciones basadas en la experiencia del sector.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {restaurantTypes.map((rt, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg font-bold">{rt.type}</h3>
                    <span className="text-sm font-bold text-wine bg-wine/10 px-3 py-1 rounded-full whitespace-nowrap">{rt.range}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{rt.desc}</p>
                  <ul className="space-y-2">
                    {rt.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RIESGO DE DEMASIADOS VINOS */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Problemas de cartas largas</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">El riesgo de tener demasiados vinos</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Más no siempre es mejor. Una carta excesivamente larga puede perjudicar tanto la experiencia del cliente como la rentabilidad del negocio.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {tooManyProblems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                  <p.icon size={20} className="text-wine" />
                </div>
                <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. RIESGO DE MUY POCOS VINOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Problemas de cartas cortas</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">El riesgo de tener muy pocos vinos</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Una carta minimalista puede ser atractiva, pero si es demasiado corta limita la experiencia y reduce oportunidades de venta.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {tooFewProblems.map((p, i) => (
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

      {/* 6. CÓMO ENCONTRAR EL EQUILIBRIO */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">El tamaño ideal</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cómo encontrar el equilibrio</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            No hay un número mágico. La clave está en analizar tu contexto y tomar decisiones basadas en datos, no en intuición. Estos son los factores que debes evaluar.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {balanceFactors.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-gradient-card">
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
      </section>

      {/* 7. CÓMO LA TECNOLOGÍA AYUDA */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Winerim</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Cómo la tecnología te ayuda a decidir</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Herramientas como Winerim analizan tu carta en tiempo real y te dan datos objetivos para decidir qué vinos mantener, cuáles rotar y dónde hay oportunidades de mejora.
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

      {/* 8. CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              Descubre si tu carta de vinos tiene el tamaño adecuado
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas sobre el número ideal de referencias para tu restaurante.
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

export default CuantosVinosCarta;
