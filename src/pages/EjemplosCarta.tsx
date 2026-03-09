import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Layers, TrendingUp, Store, Utensils,
  Star, BarChart3, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

interface WineExample {
  category: string;
  wines: { name: string; origin: string; price: string }[];
}

interface CardExample {
  icon: typeof Store;
  title: string;
  type: string;
  references: string;
  description: string;
  structure: string[];
  priceRange: string;
  sections: WineExample[];
}

const examples: CardExample[] = [
  {
    icon: Store,
    title: "Restaurante pequeño",
    type: "Bistró / Taberna gastronómica",
    references: "15 – 25 referencias",
    description: "Una carta compacta y bien curada donde cada vino tiene un propósito claro. Fácil de gestionar, fácil de recomendar y fácil de entender para el cliente.",
    structure: [
      "Agrupar por tipo (blancos, tintos, rosados)",
      "Incluir 3-5 vinos por copa",
      "Destacar 1 recomendación por categoría",
      "Escalera de precios sin huecos",
    ],
    priceRange: "18 € – 45 €",
    sections: [
      {
        category: "Blancos",
        wines: [
          { name: "Albariño Pazo Señorans", origin: "Rías Baixas", price: "24 €" },
          { name: "Verdejo Menade", origin: "Rueda", price: "20 €" },
          { name: "Godello Guímaro", origin: "Valdeorras", price: "28 €" },
        ],
      },
      {
        category: "Tintos",
        wines: [
          { name: "Crianza Muga", origin: "Rioja", price: "26 €" },
          { name: "Mencía Descendientes de J. Palacios", origin: "Bierzo", price: "32 €" },
          { name: "Garnacha Comando G", origin: "Sierra de Gredos", price: "38 €" },
        ],
      },
    ],
  },
  {
    icon: Wine,
    title: "Wine bar",
    type: "Bar de vinos especializado",
    references: "40 – 60 referencias",
    description: "Carta más amplia organizada por estilo y perfil sensorial, no solo por tipo. Ideal para clientes exploradores que quieren descubrir vinos diferentes.",
    structure: [
      "Organizar por estilo (frescos, estructurados, dulces)",
      "Sección dedicada de vinos por copa (8-12)",
      "Incluir vinos naturales y de autor",
      "Añadir notas de cata breves",
    ],
    priceRange: "20 € – 70 €",
    sections: [
      {
        category: "Frescos y ligeros",
        wines: [
          { name: "Txakoli Ameztoi", origin: "Getariako Txakolina", price: "22 €" },
          { name: "Muscadet Sèvre et Maine", origin: "Valle del Loira", price: "24 €" },
          { name: "Grüner Veltliner Loimer", origin: "Kamptal, Austria", price: "28 €" },
        ],
      },
      {
        category: "Con carácter",
        wines: [
          { name: "Nebbiolo Langhe Produttori", origin: "Piamonte", price: "34 €" },
          { name: "Syrah Alain Graillot", origin: "Crozes-Hermitage", price: "42 €" },
          { name: "Garnacha vieja Alfredo Maestro", origin: "Calatayud", price: "30 €" },
        ],
      },
      {
        category: "Espumosos",
        wines: [
          { name: "Cava Recaredo Brut Nature", origin: "Penedès", price: "32 €" },
          { name: "Champagne Pierre Gimonnet", origin: "Champagne", price: "52 €" },
        ],
      },
    ],
  },
  {
    icon: Star,
    title: "Restaurante gastronómico",
    type: "Alta cocina / Fine dining",
    references: "80 – 150 referencias",
    description: "Carta extensa organizada por regiones y subregiones, con secciones premium y selección del sommelier. Diseñada para ofrecer una experiencia completa de descubrimiento.",
    structure: [
      "Organizar por región principal y subapartados",
      "Sección 'Selección del sommelier' destacada",
      "Incluir formatos grandes (Magnum)",
      "Maridajes sugeridos con menú degustación",
      "Vinos por copa premium (10-15 referencias)",
    ],
    priceRange: "25 € – 300 €+",
    sections: [
      {
        category: "España – Blancos",
        wines: [
          { name: "Albariño Do Ferreiro Cepas Vellas", origin: "Rías Baixas", price: "48 €" },
          { name: "Viura Remelluri Blanco", origin: "Rioja", price: "42 €" },
          { name: "Xarel·lo Recaredo Serral del Vell", origin: "Penedès", price: "65 €" },
        ],
      },
      {
        category: "Francia – Tintos",
        wines: [
          { name: "Châteauneuf-du-Pape E. Guigal", origin: "Ródano Sur", price: "68 €" },
          { name: "Gevrey-Chambertin Dugat-Py", origin: "Borgoña", price: "120 €" },
          { name: "Margaux Château Palmer", origin: "Burdeos", price: "195 €" },
        ],
      },
      {
        category: "Selección del sommelier",
        wines: [
          { name: "Pingus", origin: "Ribera del Duero", price: "280 €" },
          { name: "Vega Sicilia Único", origin: "Ribera del Duero", price: "250 €" },
          { name: "Clos Mogador", origin: "Priorat", price: "85 €" },
        ],
      },
    ],
  },
];

const tips = [
  {
    icon: Layers,
    title: "Cómo organizar los vinos",
    points: [
      "Agrupar por tipo (blanco, tinto, rosado, espumoso) en cartas pequeñas",
      "Agrupar por región o estilo en cartas grandes",
      "Separar la sección de vinos por copa",
      "Incluir una categoría destacada (recomendaciones, selección del chef)",
    ],
  },
  {
    icon: TrendingUp,
    title: "Cómo distribuir los precios",
    points: [
      "Crear una escalera progresiva sin saltos bruscos",
      "Concentrar el mayor número de referencias en la zona media",
      "Usar multiplicadores decrecientes (mayor margen en vinos de entrada)",
      "Evitar huecos de más de 10 € entre referencias consecutivas",
    ],
  },
  {
    icon: BarChart3,
    title: "Cómo estructurar las categorías",
    points: [
      "Cada categoría debe tener al menos 3 opciones",
      "No mezclar criterios (tipo + región) en el mismo nivel",
      "Colocar los vinos recomendados en posición destacada",
      "Asegurar variedad de estilos dentro de cada categoría",
    ],
  },
];

const EjemplosCarta = () => {
  useEffect(() => {
    const faq = document.createElement("script");
    faq.id = "ejemplos-faq-jsonld";
    faq.type = "application/ld+json";
    faq.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Cuántas referencias debe tener una carta de vinos?", acceptedAnswer: { "@type": "Answer", text: "Depende del tipo de restaurante: 15-25 para un bistró, 40-60 para un wine bar y 80-150 para un restaurante gastronómico. Lo importante es que cada referencia tenga un propósito claro." } },
        { "@type": "Question", name: "¿Cómo se organiza una carta de vinos?", acceptedAnswer: { "@type": "Answer", text: "Las cartas pequeñas se organizan por tipo (blanco, tinto, rosado). Las cartas grandes se organizan por región o estilo. Siempre conviene separar los vinos por copa y destacar recomendaciones." } },
        { "@type": "Question", name: "¿Cómo se distribuyen los precios en una carta de vinos?", acceptedAnswer: { "@type": "Answer", text: "Con una escalera progresiva sin huecos, concentrando referencias en la zona media de precio y usando multiplicadores decrecientes para que los vinos premium mantengan precios competitivos." } },
      ],
    });
    document.head.appendChild(faq);

    const bc = document.createElement("script");
    bc.id = "ejemplos-breadcrumb-jsonld";
    bc.type = "application/ld+json";
    bc.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: "Ejemplos de carta de vinos", item: "https://winerim.wine/ejemplos-carta-vinos" },
      ],
    });
    document.head.appendChild(bc);

    return () => {
      document.getElementById("ejemplos-faq-jsonld")?.remove();
      document.getElementById("ejemplos-breadcrumb-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Ejemplos de Carta de Vinos para Restaurantes | Modelos y Plantillas"
        description="Ejemplos reales de cartas de vinos bien estructuradas para restaurante pequeño, wine bar y restaurante gastronómico. Aprende a organizar vinos, distribuir precios y diseñar categorías."
        url="https://winerim.wine/ejemplos-carta-vinos"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Guías", href: "/guias-y-recursos" }, { label: "Ejemplos de carta de vinos" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Plantillas y modelos</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Ejemplos de carta de vinos para{" "}<span className="text-gradient-wine italic">restaurantes</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Modelos de cartas bien estructuradas para diferentes tipos de restaurante. Aprende cómo organizar, diseñar y optimizar tu carta de vinos.
          </motion.p>
        </div>
      </section>

      {/* EXAMPLES */}
      {examples.map((ex, idx) => {
        const Icon = ex.icon;
        return (
          <section key={idx} className={`section-padding ${idx % 2 === 0 ? "" : "bg-gradient-dark"}`}>
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon size={20} className="text-wine" />
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{ex.type}</p>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{ex.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><Wine size={14} className="text-wine" />{ex.references}</span>
                  <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-wine" />{ex.priceRange}</span>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{ex.description}</p>
              </ScrollReveal>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Structure tips */}
                <ScrollReveal delay={0.1}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                      <Layers size={16} className="text-wine" />
                      Estructura recomendada
                    </h3>
                    <ul className="space-y-3">
                      {ex.structure.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Wine sections */}
                <ScrollReveal delay={0.15}>
                  <div className="space-y-4">
                    {ex.sections.map((section, si) => (
                      <div key={si} className="bg-gradient-card rounded-xl border border-border p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3">{section.category}</h4>
                        <div className="space-y-2">
                          {section.wines.map((w, wi) => (
                            <div key={wi} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                              <div>
                                <p className="text-sm font-medium">{w.name}</p>
                                <p className="text-xs text-muted-foreground">{w.origin}</p>
                              </div>
                              <span className="text-sm font-semibold text-wine shrink-0 ml-4">{w.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* TIPS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Guía práctica</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Claves para diseñar una carta de vinos <span className="text-gradient-wine italic">efectiva</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, i) => {
              const TIcon = tip.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <TIcon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-4">{tip.title}</h3>
                    <ul className="space-y-2">
                      {tip.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={12} className="text-wine shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Análisis gratuito</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                ¿Tu carta está bien <span className="text-gradient-wine italic">estructurada</span>?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta de vinos y te mostramos cómo mejorar su estructura, precios y categorías. Sin compromiso.
              </p>
              <Link
                to="/analisis-carta"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                Analizar mi carta de vinos
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
        { to: "/como-hacer-una-carta-de-vinos", label: "Cómo hacer una carta de vinos", type: "guide" },
        { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", type: "resource" },
        { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
      ]} />
      <Footer />
    </div>
  );
};

export default EjemplosCarta;
