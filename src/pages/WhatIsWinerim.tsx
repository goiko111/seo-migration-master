import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, Search, Utensils,
  Users, TrendingUp, Sparkles, CheckCircle, HelpCircle,
  Layers, DollarSign, RotateCcw, GlassWater, Globe,
  Building2, Target, Filter, GitCompare, Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import SummaryBox from "@/components/seo/SummaryBox";
import FactsBox from "@/components/seo/FactsBox";
import NotForSection from "@/components/seo/NotForSection";

const useCases = [
  { icon: Wine, title: "Gestionar cartas de vinos", desc: "Crea, organiza y actualiza tu carta de vinos digital en tiempo real. Categorías, descripciones, precios y disponibilidad desde un solo panel." },
  { icon: Sparkles, title: "Recomendar vinos a clientes", desc: "Sugerencias inteligentes basadas en el plato elegido, las preferencias del cliente y el historial de ventas del restaurante." },
  { icon: BarChart3, title: "Analizar ventas de vino", desc: "Datos de venta por referencia, categoría, precio y período. Identifica qué vinos funcionan y cuáles no se mueven." },
  { icon: DollarSign, title: "Optimizar precios", desc: "Compara tus precios con el mercado, detecta oportunidades de margen y ajusta tu escalera de precios para maximizar la rentabilidad." },
  { icon: Users, title: "Mejorar la experiencia del cliente", desc: "Una carta digital interactiva con filtros, descripciones claras y maridajes sugeridos que hace que elegir vino sea fácil y placentero." },
];

const userTypes = [
  { icon: Utensils, title: "Restaurantes", desc: "Desde bistrós con 20 referencias hasta gastronómicos con 200. Winerim se adapta a cualquier formato y volumen de carta." },
  { icon: GlassWater, title: "Wine bars y vinotecas", desc: "Gestión de cartas grandes con alta rotación, amplia oferta por copa y fichas detalladas de cada vino." },
  { icon: Building2, title: "Hoteles", desc: "Cartas para restaurante, room service y eventos. Gestión centralizada con múltiples puntos de venta." },
  { icon: Globe, title: "Grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes. Una plataforma, una estrategia, múltiples locales." },
];

const problems = [
  { problem: "El personal no tiene tiempo para recomendar vino", solution: "Winerim genera recomendaciones automáticas basadas en el plato elegido, las preferencias del cliente y los vinos disponibles." },
  { problem: "Los clientes no entienden la carta", solution: "Carta digital con descripciones simples, filtros por estilo/precio/región y maridajes sugeridos que cualquier cliente puede usar." },
  { problem: "Los vinos no rotan", solution: "Analítica de ventas que identifica vinos estancados, sugiere rotaciones y destaca las referencias con mayor demanda." },
  { problem: "La carta no está optimizada", solution: "Análisis automático de la estructura de precios, el equilibrio por categorías y la distribución de márgenes." },
];

const features = [
  { icon: Wine, title: "Carta digital interactiva", desc: "Carta de vinos digital accesible desde cualquier dispositivo. QR en mesa, tablet o integración con tu web." },
  { icon: Sparkles, title: "Recomendaciones de vino", desc: "Motor de recomendación que sugiere vinos basándose en el plato, las preferencias del cliente y el contexto." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "Sugerencias de maridaje generadas por IA para cada plato de tu menú, actualizadas en tiempo real." },
  { icon: Filter, title: "Filtros inteligentes", desc: "Filtra por tipo, región, uva, estilo, precio o maridaje. El cliente encuentra su vino ideal en segundos." },
  { icon: GitCompare, title: "Comparador de vinos", desc: "Compara referencias lado a lado: precio, notas de cata, región, puntuación y maridajes." },
  { icon: BarChart3, title: "Analítica de ventas", desc: "Dashboard con datos de venta por referencia, categoría y período. KPIs de ticket medio, rotación y margen." },
];

const results = [
  { value: "+30%", label: "Ventas de vino", desc: "Incremento medio en ventas de vino gracias a recomendaciones inteligentes y una carta optimizada." },
  { value: "+20%", label: "Ticket medio", desc: "Aumento del gasto medio por mesa con una estructura de precios estratégica y vinos ancla." },
  { value: "+35%", label: "Rotación", desc: "Más rotación de referencias al identificar y sustituir vinos de baja venta." },
];

const faqs = [
  {
    q: "¿Qué es Winerim?",
    a: "Winerim es una plataforma tecnológica especializada en la gestión y optimización de cartas de vinos para restaurantes. Combina una carta digital interactiva, recomendaciones de vino con inteligencia artificial, maridajes automáticos y analítica de ventas para ayudar a los restaurantes a vender más vino y mejorar la experiencia del cliente.",
  },
  {
    q: "¿Para qué sirve Winerim?",
    a: "Winerim sirve para gestionar la carta de vinos de un restaurante de forma digital, recomendar vinos a los clientes según el plato elegido, analizar las ventas de vino, optimizar los precios y mejorar la rotación de referencias. Es una herramienta diseñada para convertir la carta de vinos en un motor activo de ventas.",
  },
  {
    q: "¿Qué hace un software de carta de vinos?",
    a: "Un software de carta de vinos permite digitalizar, organizar y optimizar la oferta de vinos de un restaurante. Incluye funcionalidades como carta digital accesible por QR, filtros de búsqueda, recomendaciones de maridaje, analítica de ventas y gestión de precios. Winerim es un ejemplo de software de carta de vinos que integra inteligencia artificial.",
  },
  {
    q: "¿Cómo ayuda Winerim a vender más vino?",
    a: "Winerim ayuda a vender más vino de tres formas principales: primero, mediante recomendaciones inteligentes que sugieren el vino ideal para cada plato y cliente; segundo, con una carta digital interactiva que facilita la exploración y elimina la fricción de elegir; tercero, con analítica de ventas que permite optimizar precios, rotación y selección de referencias.",
  },
  {
    q: "¿Cuánto cuesta Winerim?",
    a: "Winerim ofrece planes adaptados a distintos tamaños de restaurante, desde establecimientos individuales hasta grupos de restauración. Puedes consultar los planes y precios actualizados en winerim.wine/precios o solicitar una demo personalizada.",
  },
  {
    q: "¿Winerim funciona en inglés y español?",
    a: "Sí. Winerim es una plataforma multilingüe que funciona en español e inglés. La carta digital se puede presentar al cliente en su idioma preferido, lo que es especialmente útil para restaurantes con clientela internacional.",
  },
];

const WhatIsWinerim = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "what-is-winerim-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Winerim es una plataforma tecnológica de gestión y optimización de cartas de vinos para restaurantes. Combina carta digital interactiva, recomendaciones con IA, maridajes automáticos y analítica de ventas.",
        url: "https://winerim.wine",
        offers: {
          "@type": "Offer",
          url: "https://winerim.wine/precios",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Digital wine list management",
          "AI wine recommendations",
          "Automatic food and wine pairing",
          "Wine sales analytics",
          "Price optimization",
          "Smart wine filters",
          "Wine comparison tool",
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Restaurants, Wine Bars, Hotels, Restaurant Groups",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Winerim",
        url: "https://winerim.wine",
        logo: "https://winerim.wine/og-image.png",
        description: "Wine Intelligence Platform for Restaurants",
        sameAs: [
          "https://www.instagram.com/winerim/",
          "https://www.linkedin.com/company/winerim/",
          "https://www.youtube.com/@Winerim",
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("what-is-winerim-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="What is Winerim? Wine Intelligence Platform for Restaurants"
        description="Winerim is a wine intelligence platform that helps restaurants manage wine lists, recommend wines, analyze sales and optimize pricing using AI technology."
        url="https://winerim.wine/what-is-winerim"
        type="website"
        hreflang={[
          { lang: "en", url: "https://winerim.wine/what-is-winerim" },
          { lang: "es", url: "https://winerim.wine/que-es-winerim" },
        ]}
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "What is Winerim" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Wine Intelligence Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Winerim — Wine Intelligence Platform for Restaurants
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
            Winerim es una plataforma tecnológica diseñada para ayudar a restaurantes a gestionar su carta de vinos, aumentar las ventas y optimizar su bodega mediante inteligencia artificial.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Solicitar demo <ArrowRight size={16} />
            </Link>
            <Link to="/precios" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              Ver precios
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SUMMARY BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-6">
        <ScrollReveal>
          <SummaryBox
            label="¿Qué es Winerim? — Resumen"
            definition="Winerim es un software especializado en la gestión y optimización de cartas de vinos para restaurantes. Combina carta digital interactiva, recomendaciones con IA, maridajes automáticos y analítica de ventas. No es un simple QR a un PDF: es una plataforma completa diseñada para convertir la carta de vinos en un motor activo de ventas."
            bullets={[
              "Carta digital interactiva accesible por QR desde el móvil del comensal",
              "Motor de recomendaciones de vino basado en inteligencia artificial",
              "Maridajes automáticos con cada plato del menú, actualizados en tiempo real",
              "Dashboard de analítica con KPIs de ventas, rotación y margen",
              "Herramientas de optimización de precios y escalado de gama",
              "Gestión centralizada para grupos con múltiples restaurantes",
            ]}
          />
        </ScrollReveal>
      </section>

      {/* FACTS BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-6">
        <ScrollReveal>
          <FactsBox
            title="Datos clave de Winerim"
            facts={[
              { label: "Tipo", value: "Software SaaS para hostelería" },
              { label: "Especialización", value: "Gestión de cartas de vinos" },
              { label: "Tecnología", value: "Inteligencia artificial + carta digital interactiva" },
              { label: "Acceso", value: "Multiplataforma: web, tablet y app nativa" },
              { label: "Idiomas", value: "Español, inglés, italiano, francés" },
              { label: "Público", value: "Restaurantes, wine bars, hoteles, grupos de restauración" },
              { label: "Resultado medio", value: "+30% ventas de vino, +20% ticket medio" },
              { label: "Integraciones", value: "TPV, PMS, sistemas de reservas" },
            ]}
          />
        </ScrollReveal>
      </section>

      {/* NOT FOR SECTION */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <NotForSection
          idealFor={[
            "Restaurantes con 50 o más referencias de vino en carta",
            "Wine bars y vinotecas con alta rotación de referencias",
            "Hoteles con servicio de vino en restaurante, room service y eventos",
            "Grupos de restauración que necesitan gestión centralizada del vino",
            "Establecimientos que quieren aumentar el ticket medio con vino",
          ]}
          notFor={[
            "Bares sin carta de vinos estructurada",
            "Establecimientos con menos de 50 referencias de vino",
            "Negocios que no sirven vino (cervecerías, coctelerías)",
            "Restaurantes que no buscan optimizar sus ventas de vino",
          ]}
        />
      </section>

      {/* 2. DEFINICIÓN CLARA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">¿Qué es Winerim?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground">Winerim es un software especializado en la gestión y optimización de cartas de vinos para restaurantes.</strong> La plataforma está diseñada para convertir la carta de vinos en una herramienta activa de venta, no un simple listado de referencias.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Winerim combina tecnología de carta digital interactiva, un motor de recomendaciones de vino basado en inteligencia artificial, maridajes automáticos con cada plato del menú, analítica detallada de ventas y herramientas de optimización de precios. Todo integrado en una única plataforma pensada para el sector de la hostelería.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Carta digital interactiva",
            "Recomendaciones de vino con IA",
            "Maridajes automáticos",
            "Analítica de ventas",
            "Optimización de precios",
            "Gestión de bodega",
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="flex items-center gap-2 p-4 rounded-xl border border-border bg-gradient-card">
                <CheckCircle size={16} className="text-wine shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. PARA QUÉ SIRVE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Casos de uso</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">¿Para qué sirve Winerim?</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Winerim cubre todas las necesidades de gestión del vino en un restaurante, desde la carta hasta la analítica.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                    <uc.icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUIÉN UTILIZA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Clientes</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">¿Quién utiliza Winerim?</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Winerim está diseñado para cualquier establecimiento hostelero que tenga vino en su oferta.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {userTypes.map((ut, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ut.icon size={20} className="text-wine" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-2">{ut.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ut.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. PROBLEMAS QUE RESUELVE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Problemas y soluciones</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">¿Qué problemas resuelve Winerim?</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Los problemas más comunes en la gestión del vino en restaurantes y cómo Winerim los soluciona.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="grid md:grid-cols-2 gap-4 p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-start gap-3">
                    <Target size={18} className="text-wine shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Problema</p>
                      <p className="font-medium">{p.problem}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-wine shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-1">Solución Winerim</p>
                      <p className="text-sm text-muted-foreground">{p.solution}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FUNCIONALIDADES */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Funcionalidades</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Principales funcionalidades de Winerim</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Una plataforma completa para la gestión integral del vino en hostelería.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-wine" />
                </div>
                <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. RESULTADOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Impacto</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Resultados de utilizar Winerim</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Los restaurantes que utilizan Winerim para gestionar su carta de vinos obtienen mejoras significativas.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center p-8 rounded-xl border border-border bg-background">
                  <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{r.value}</p>
                  <p className="font-semibold text-foreground mb-2">{r.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} schemaId="what-is-winerim" title="Frequently Asked Questions" />

      <InternalLinks links={[
        { to: "/wine-list-management-software", label: "Wine List Software", type: "solution" },
        { to: "/wine-list-analyzer", label: "Wine List Analyzer", type: "tool" },
        { to: "/wine-pairing-generator", label: "Wine Pairing Generator", type: "tool" },
        { to: "/precios", label: "Pricing Plans", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default WhatIsWinerim;
