import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, Calculator, BarChart3, TrendingUp,
  Target, RotateCcw, Layers, DollarSign, Wine, Lightbulb, Cpu, ShoppingCart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const priceRanges = [
  { range: "20 – 30 €", label: "Entrada", desc: "Vinos accesibles que invitan a probar. Deben ser atractivos y fáciles de entender.", color: "bg-wine/10" },
  { range: "30 – 50 €", label: "Zona media", desc: "El núcleo de la carta. Aquí se concentra la mayor parte de las ventas y el margen.", color: "bg-wine/15" },
  { range: "50 – 80 €", label: "Premium", desc: "Referencias de mayor valor percibido. Ideales para ocasiones especiales y upselling.", color: "bg-wine/20" },
  { range: "80 €+", label: "Alta gama", desc: "Vinos de prestigio que elevan la percepción de la carta completa.", color: "bg-wine/25" },
];

const rotationProblems = [
  { icon: DollarSign, title: "Mala posición en precio", desc: "Un vino excelente colocado en un rango de precio incorrecto simplemente no se vende. Si está demasiado cerca de opciones más conocidas o demasiado lejos del siguiente escalón, el cliente lo ignora." },
  { icon: Wine, title: "Estilo duplicado", desc: "Tener tres Ribera del Duero en el mismo rango de precio no ofrece variedad: genera confusión. Cada referencia debe tener un papel claro en la carta." },
  { icon: AlertTriangle, title: "Falta de recomendación", desc: "Sin indicaciones claras ni personal formado, los vinos menos conocidos quedan invisibles. El cliente elige lo seguro y las referencias interesantes se estancan." },
];

const techBenefits = [
  { icon: BarChart3, title: "Analizar la estructura de precios", desc: "Visualizar la distribución completa de la carta para detectar desequilibrios y concentraciones excesivas en ciertos rangos." },
  { icon: Target, title: "Detectar huecos estratégicos", desc: "Identificar rangos de precio vacíos donde el cliente no tiene opciones, perdiendo oportunidades de venta." },
  { icon: TrendingUp, title: "Optimizar el posicionamiento", desc: "Ajustar precios individuales para crear una escalera coherente que guíe al cliente hacia referencias de mayor valor." },
  { icon: RotateCcw, title: "Mejorar la rotación", desc: "Identificar vinos estancados y proponer ajustes de precio o visibilidad para mover stock de forma inteligente." },
];

const PrecioVinoRestaurante = () => {
  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "precio-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se calcula el precio del vino en un restaurante?",
          acceptedAnswer: { "@type": "Answer", text: "El precio del vino en un restaurante se calcula combinando el coste de adquisición con un margen variable según el rango de precio. No se recomienda usar un multiplicador fijo, sino una estrategia escalonada que equilibre rentabilidad y rotación." },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el margen habitual del vino en hostelería?",
          acceptedAnswer: { "@type": "Answer", text: "El margen del vino varía entre el 60% y el 75% sobre el precio de venta. Los vinos de entrada suelen tener multiplicadores más altos (x3-x4), mientras que los vinos premium aplican márgenes menores (x1.8-x2.5) para mantener precios competitivos." },
        },
        {
          "@type": "Question",
          name: "¿Qué es el wine mapping o distribución estratégica de precios?",
          acceptedAnswer: { "@type": "Answer", text: "El wine mapping es una técnica que organiza la carta de vinos en rangos de precio equilibrados, con vinos ancla en cada segmento y sin huecos entre escalones. Esto facilita la decisión del cliente y maximiza el ticket medio." },
        },
        {
          "@type": "Question",
          name: "¿Por qué no rotan algunos vinos de mi carta?",
          acceptedAnswer: { "@type": "Answer", text: "Los vinos no rotan por tres razones principales: están mal posicionados en precio respecto a su competencia en carta, su estilo está duplicado con otras referencias más conocidas, o no reciben visibilidad ni recomendación por parte del personal." },
        },
      ],
    });
    document.head.appendChild(faqSchema);

    const breadcrumbSchema = document.createElement("script");
    breadcrumbSchema.id = "precio-breadcrumb-jsonld";
    breadcrumbSchema.type = "application/ld+json";
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: "Cómo fijar el precio del vino en un restaurante", item: "https://winerim.wine/precio-vino-restaurante" },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    return () => {
      document.getElementById("precio-faq-jsonld")?.remove();
      document.getElementById("precio-breadcrumb-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cómo Fijar el Precio del Vino en un Restaurante | Guía de Pricing"
        description="Guía práctica para definir precios de vino rentables en tu restaurante. Aprende a estructurar tu carta, equilibrar márgenes y aumentar el ticket medio con estrategias de pricing profesionales."
        url="https://winerim.wine/precio-vino-restaurante"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
            >
              <Calculator size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Guía de pricing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8"
            >
              Cómo fijar el precio del vino en un{" "}
              <span className="text-gradient-wine italic">restaurante</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Guía práctica para definir precios de vino rentables, equilibrar tu carta y aumentar el ticket medio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/analisis-carta"
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                Analizar mi carta de vinos
              </Link>
              <Link
                to="/demo"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                Solicitar demo
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El reto del pricing</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              El vino: máximo margen, máxima <span className="text-gradient-wine italic">complejidad</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              El vino es uno de los productos con mayor margen en hostelería, pero también uno de los más difíciles de gestionar. Una estrategia de precios incorrecta puede significar la diferencia entre una bodega rentable y un almacén de stock parado.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Los problemas más habituales que encontramos en restaurantes son:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Multiplicadores aplicados sin estrategia",
                "Precios desordenados en la carta",
                "Huecos en la escalera de precios",
                "Vinos demasiado caros o demasiado baratos",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                  <AlertTriangle size={18} className="text-destructive shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ERROR DEL MULTIPLICADOR */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El error más común</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Usar solo un <span className="text-gradient-wine italic">multiplicador fijo</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Muchos restaurantes aplican una fórmula simple: <strong className="text-foreground">precio de compra × 2.5</strong> o <strong className="text-foreground">× 3</strong>. Aunque parece lógico, este enfoque genera graves desequilibrios en la carta.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Calculator size={18} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Los vinos baratos quedan demasiado baratos</h3>
                    <p className="text-sm text-muted-foreground">Un vino que cuesta 3 € se vende a 9 €. El margen absoluto es bajo y el cliente lo percibe como "el vino más barato", reduciendo su valor percibido.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp size={18} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Los vinos caros quedan imposibles de vender</h3>
                    <p className="text-sm text-muted-foreground">Un vino que cuesta 25 € se vende a 75 €. El cliente lo ve desproporcionado frente al mercado y opta por no pedirlo. El stock se estanca.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers size={18} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Falta de equilibrio en la carta</h3>
                    <p className="text-sm text-muted-foreground">Con un multiplicador fijo, la carta no tiene escalones naturales. El cliente no percibe diferencias claras entre rangos y se queda en lo más barato.</p>
                  </div>
                </div>
              </div>

              <div className="bg-wine/5 border border-wine/20 rounded-xl p-6">
                <p className="text-sm font-semibold text-wine mb-2">💡 La alternativa profesional</p>
                <p className="text-sm text-muted-foreground">
                  Aplicar <strong className="text-foreground">multiplicadores decrecientes</strong>: mayor margen porcentual en vinos de entrada (×3-4) y menor en vinos premium (×1.8-2.5). Así la carta es rentable en todos los rangos y el cliente percibe precios justos.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WINE MAPPING */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Estrategia avanzada</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Qué es el <span className="text-gradient-wine italic">wine mapping</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              La distribución estratégica de precios que convierte tu carta en una herramienta de venta.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              El wine mapping consiste en organizar las referencias de la carta en rangos de precio equilibrados, creando una escalera natural que guía al cliente desde opciones accesibles hacia vinos de mayor valor. Cada referencia tiene un papel estratégico.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Layers, title: "Escalera de precios", desc: "Cada rango de precio debe tener opciones claras, sin saltos bruscos que desorienten al cliente." },
              { icon: BarChart3, title: "Rangos equilibrados", desc: "La concentración de referencias debe ser mayor en la zona media, donde se produce el grueso de las ventas." },
              { icon: Target, title: "Vinos ancla", desc: "Colocar referencias estratégicas que sirvan de referencia de valor y guíen la percepción de precio del cliente." },
              { icon: Lightbulb, title: "Referencias estratégicas", desc: "Cada vino debe aportar algo único: un estilo, un origen o un rango de precio que no cubra otra referencia." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISTRIBUCIÓN DE PRECIOS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Ejemplo práctico</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo distribuir los <span className="text-gradient-wine italic">precios</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Una carta bien estructurada no tiene huecos. Cada rango de precio cubre una necesidad del cliente.
            </p>
          </ScrollReveal>

          <div className="space-y-4 max-w-2xl mx-auto">
            {priceRanges.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`${tier.color} rounded-lg px-4 py-2 text-center sm:text-left shrink-0 min-w-[120px]`}>
                    <p className="text-xs uppercase tracking-wider text-wine-light font-semibold">{tier.label}</p>
                    <p className="font-heading text-lg font-bold text-wine">{tier.range}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-8 bg-wine/5 border border-wine/20 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-wine mb-2">⚠️ Importante</p>
              <p className="text-sm text-muted-foreground">
                Si entre 30 € y 50 € no hay opciones en tu carta, estás perdiendo las ventas de la franja más rentable. Los huecos en la escalera de precios son uno de los errores más costosos y más fáciles de corregir.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VINOS QUE NO ROTAN */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Stock estancado</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Por qué algunos vinos <span className="text-gradient-wine italic">no rotan</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rotationProblems.map((problem, i) => {
              const Icon = problem.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-destructive" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La solución</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo la tecnología ayuda a <span className="text-gradient-wine italic">optimizar precios</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Herramientas como Winerim analizan tu carta de vinos y detectan oportunidades de mejora en la estructura de precios.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {techBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Análisis gratuito
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre si tu carta de vinos está bien{" "}
                <span className="text-gradient-wine italic">posicionada</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta y analizamos la estructura de precios, detectamos desequilibrios y te proponemos mejoras concretas. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Solicitar análisis gratuito
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contacto"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrecioVinoRestaurante;
