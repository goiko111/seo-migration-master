import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, Search, Utensils,
  Users, TrendingUp, Sparkles, CheckCircle, HelpCircle,
  Layers, DollarSign, Globe, Building2, Target,
  Filter, GitCompare, GlassWater, Brain, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const capabilities = [
  { icon: Wine, title: "Digital Wine List Management", desc: "Create, organize and update your digital wine list in real time. Categories, descriptions, prices and availability from a single dashboard." },
  { icon: Sparkles, title: "AI Wine Recommendations", desc: "Smart suggestions based on the dish chosen, guest preferences and restaurant sales history. Powered by artificial intelligence." },
  { icon: Utensils, title: "Automatic Food & Wine Pairing", desc: "AI-generated pairing suggestions for every dish on your menu, updated in real time as your menu changes." },
  { icon: Filter, title: "Smart Wine Filters", desc: "Filter by type, region, grape, style, price or pairing. Guests find their ideal wine in seconds." },
  { icon: GitCompare, title: "Wine Comparison Tool", desc: "Compare wines side by side: price, tasting notes, region, score and food pairings." },
  { icon: BarChart3, title: "Wine Sales Analytics", desc: "Dashboard with sales data by reference, category and period. KPIs for average spend, rotation and margin." },
  { icon: DollarSign, title: "Price Optimization", desc: "Compare your prices with the market, detect margin opportunities and adjust your pricing ladder to maximize profitability." },
  { icon: Brain, title: "Wine Intelligence", desc: "Data-driven insights about your wine program: what sells, what doesn't, where the opportunities are." },
];

const useCases = [
  { title: "Restaurants", desc: "From bistros with 20 references to fine dining with 200+. Winerim adapts to any format and wine list size.", icon: Utensils },
  { title: "Wine Bars", desc: "Manage large wine lists with high rotation, extensive by-the-glass offerings and detailed wine profiles.", icon: GlassWater },
  { title: "Hotels", desc: "Wine lists for restaurant, room service and events. Centralized management across multiple outlets.", icon: Building2 },
  { title: "Restaurant Groups", desc: "Centralized wine management for multi-unit operators. One platform, one strategy, multiple locations.", icon: Globe },
];

const benefits = [
  { value: "+18%", label: "Wine Sales", desc: "Average increase in wine revenue through smart recommendations and an optimized wine list." },
  { value: "+22%", label: "Average Spend", desc: "Higher spend per table with strategic pricing, anchor wines and guided recommendations." },
  { value: "x2", label: "Wine Rotation", desc: "Double the average wine rotation by identifying and replacing low-selling references." },
  { value: "70%+", label: "By-the-Glass Margin", desc: "Premium margins on by-the-glass offerings with intelligent selection and pricing." },
];

const faqs = {
  es: [
    {
      q: "Que es Winerim?",
      a: "Winerim es una plataforma de inteligencia del vino disenada para restaurantes. Combina gestion de carta digital, recomendaciones de vino impulsadas por IA, emparejamiento automatico de vino con comida, analitica de ventas y optimizacion de precios en una sola plataforma construida para la industria hotelera.",
    },
    {
      q: "Que hace el software de gestion de cartas de vino?",
      a: "El software de gestion de cartas ayuda a los restaurantes a digitalizar, organizar y optimizar su oferta de vino. Normalmente incluye funciones como cartas digitales accesibles via codigo QR, filtros de busqueda, sugerencias de emparejamiento, analitica de ventas y herramientas de pricing. Winerim es una solucion integral de gestion de cartas que integra inteligencia artificial.",
    },
    {
      q: "Como puede la tecnologia ayudar a los restaurantes a vender mas vino?",
      a: "La tecnologia ayuda a los restaurantes a vender mas vino de tres formas clave: primero, mediante recomendaciones inteligentes que sugieren el vino ideal para cada plato y comensal; segundo, con cartas digitales interactivas que facilitan la exploracion; tercero, con analitica de ventas que permiten decisiones basadas en datos sobre pricing, rotacion y seleccion.",
    },
    {
      q: "Que es una carta digital de vinos?",
      a: "Una carta digital de vinos es una version electronica de la oferta de vino de un restaurante que los comensales pueden acceder desde su telefono, tablet o sitio web. A diferencia de una carta en papel, una carta digital puede incluir filtros, busqueda, notas de degustacion, sugerencias de emparejamiento y disponibilidad en tiempo real. Winerim proporciona una carta digital totalmente interactiva con caracteristicas impulsadas por IA.",
    },
    {
      q: "Como mejora la IA las ventas de vino en restaurantes?",
      a: "La IA mejora las ventas de vino analizando patrones en las preferencias de los comensales, selecciones de platos y datos historicos de ventas para generar recomendaciones de vino personalizadas. Tambien permite emparejamiento automatico de vino con comida, identifica vinos con bajo rendimiento que deben rotarse y sugiere estrategias de pricing optimo basadas en datos de mercado.",
    },
    {
      q: "Winerim esta disponible en multiples idiomas?",
      a: "Si. Winerim es una plataforma multilingue que funciona en espanol, ingles, italiano, frances, aleman y portugues europeo. La carta digital de vinos puede presentarse a los comensales en su idioma preferido, lo que es especialmente util para restaurantes con clientela internacional.",
    },
  ],
  en: [
    {
      q: "What is Winerim?",
      a: "Winerim is a wine intelligence platform designed for restaurants. It combines digital wine list management, AI-powered wine recommendations, automatic food and wine pairing, sales analytics and price optimization in a single platform built for the hospitality industry.",
    },
    {
      q: "What does wine list management software do?",
      a: "Wine list management software helps restaurants digitize, organize and optimize their wine offering. It typically includes features like digital wine lists accessible via QR code, search filters, pairing suggestions, sales analytics and pricing tools. Winerim is a comprehensive wine list management solution that integrates artificial intelligence.",
    },
    {
      q: "How can technology help restaurants sell more wine?",
      a: "Technology helps restaurants sell more wine in three key ways: first, through intelligent recommendations that suggest the ideal wine for each dish and guest; second, with interactive digital wine lists that make exploration easy and remove friction from choosing; third, with sales analytics that enable data-driven decisions on pricing, rotation and selection.",
    },
    {
      q: "What is a digital wine list?",
      a: "A digital wine list is an electronic version of a restaurant's wine offering that guests can access from their phone, a tablet, or the restaurant's website. Unlike a paper list, a digital wine list can include filters, search, tasting notes, food pairing suggestions and real-time availability. Winerim provides a fully interactive digital wine list with AI-powered features.",
    },
    {
      q: "How does AI improve wine sales in restaurants?",
      a: "AI improves wine sales by analyzing patterns in guest preferences, dish selections and historical sales data to generate personalized wine recommendations. It also enables automatic food and wine pairing, identifies underperforming wines that should be rotated, and suggests optimal pricing strategies based on market data.",
    },
    {
      q: "Is Winerim available in multiple languages?",
      a: "Yes. Winerim is a multilingual platform that operates in Spanish, English, Italian, French, German and European Portuguese. The digital wine list can be presented to guests in their preferred language, which is especially useful for restaurants with international clientele.",
    },
  ],
  de: [
    {
      q: "Was ist Winerim?",
      a: "Winerim ist eine Wein-Intelligenzplattform fur Restaurants. Sie verbindet digitale Weinkartenverwaltung, KI-gestutzte Weinempfehlungen, automatische Wein- und Speisenpaarungen, Verkaufsanalysen und Preisoptimierung auf einer einzigen Plattform fur die Gastgewerbeindustrie.",
    },
    {
      q: "Was leistet Software zur Verwaltung von Weinkarten?",
      a: "Software zur Verwaltung von Weinkarten hilft Restaurants, ihre Weinangebote zu digitalisieren, zu organisieren und zu optimieren. Sie umfasst typischerweise Funktionen wie digital verfugbare Weinkarten uber QR-Code, Suchfilter, Paarungsvorschlage, Verkaufsanalysen und Preistools. Winerim ist eine umfassende Losung zur Verwaltung von Weinkarten, die kunstliche Intelligenz integriert.",
    },
    {
      q: "Wie kann Technologie Restaurants helfen, mehr Wein zu verkaufen?",
      a: "Technologie hilft Restaurants auf drei Arten, mehr Wein zu verkaufen: erstens durch intelligente Empfehlungen, die den idealen Wein fur jedes Gericht und jeden Gast vorschlagen; zweitens durch interaktive digitale Weinkarten, die Erkundung erleichtern; drittens durch Verkaufsanalysen, die datengestutzte Entscheidungen zu Pricing, Rotation und Auswahl ermoglichen.",
    },
    {
      q: "Was ist eine digitale Weinkarte?",
      a: "Eine digitale Weinkarte ist eine elektronische Fassung des Weinangebots eines Restaurants, auf die Gaste uber ihr Telefon, Tablet oder die Website des Restaurants zugreifen konnen. Im Gegensatz zu einer Papierkarte kann eine digitale Weinkarte Filter, Suche, Verkostungsnotizen, Speisen-Paarungsvorschlage und Verfugbarkeit in Echtzeit enthalten. Winerim bietet eine vollstandig interaktive digitale Weinkarte mit KI-gestutzen Funktionen.",
    },
    {
      q: "Wie verbessert KI die Weinverkaufe in Restaurants?",
      a: "KI verbessert die Weinverkaufe durch Analyse von Mustern in Gastepraferenzen, Gerichtauswahlen und historischen Verkaufsdaten zur Generierung personalisierter Weinempfehlungen. Sie ermoglicht auch automatische Wein- und Speisenpaarungen, identifiziert unterdurchschnittliche Weine, die rotiert werden sollten, und schlagt optimale Preisstrategien auf Grundlage von Marktdaten vor.",
    },
    {
      q: "Ist Winerim in mehreren Sprachen verfugbar?",
      a: "Ja. Winerim ist eine mehrsprachige Plattform, die auf Deutsch, Spanisch, Englisch, Italienisch, Franzosisch und Europaisch-Portugiesisch funktioniert. Die digitale Weinkarte kann Gasten in ihrer bevorzugten Sprache prasentiert werden, was besonders fur Restaurants mit internationalem Publikum nutzlich ist.",
    },
  ],
  pt: [
    {
      q: "O que e Winerim?",
      a: "Winerim e uma plataforma de inteligencia do vinho concebida para restaurantes. Combina gestao de carta digital, recomendacoes de vinho alimentadas por IA, emparelhamento automatico de comida e vinho, analitica de vendas e otimizacao de precos numa unica plataforma construida para a industria hoteleira.",
    },
    {
      q: "O que faz o software de gestao de cartas de vinho?",
      a: "O software de gestao de cartas ajuda os restaurantes a digitalizar, organizar e otimizar a sua oferta de vinho. Tipicamente inclui recursos como cartas digitais acessiveis via codigo QR, filtros de busca, sugestoes de emparelhamento, analitica de vendas e ferramentas de pricing. Winerim e uma solucao abrangente de gestao de cartas que integra inteligencia artificial.",
    },
    {
      q: "Como pode a tecnologia ajudar os restaurantes a vender mais vinho?",
      a: "A tecnologia ajuda os restaurantes a vender mais vinho de tres formas chave: primeiro, atraves de recomendacoes inteligentes que sugerem o vinho ideal para cada prato e comensal; segundo, com cartas digitais interativas que facilitam a exploracao; terceiro, com analitica de vendas que permitem decisoes baseadas em dados sobre pricing, rotacao e seleccao.",
    },
    {
      q: "O que e uma carta digital de vinho?",
      a: "Uma carta digital de vinho e uma versao eletronica da oferta de vinho de um restaurante que os comensais podem aceder a partir do seu telemovel, tablet ou website do restaurante. Ao contrario de uma carta em papel, uma carta digital pode incluir filtros, busca, notas de prova, sugestoes de emparelhamento e disponibilidade em tempo real. Winerim fornece uma carta digital completamente interativa com recursos alimentados por IA.",
    },
    {
      q: "Como a IA melhora as vendas de vinho nos restaurantes?",
      a: "A IA melhora as vendas de vinho analisando padroes nas preferencias dos comensais, seleccoes de pratos e dados de vendas historicos para gerar recomendacoes de vinho personalizadas. Tambem permite emparelhamento automatico de comida e vinho, identifica vinhos com baixo desempenho que devem ser rotacionados e sugere estrategias de pricing otimas baseadas em dados de mercado.",
    },
    {
      q: "Winerim esta disponivel em multiplos idiomas?",
      a: "Sim. Winerim e uma plataforma multilingue que funciona em Portugues Europeu, Espanhol, Ingles, Italiano, Frances e Aleman. A carta digital de vinho pode ser apresentada aos comensais no seu idioma preferido, o que e especialmente util para restaurantes com clientela internacional.",
    },
  ],
};

const AiWineSoftware = () => {
  const { lang, allLangPaths } = useLanguage();
  const currentFaqs = faqs[lang as keyof typeof faqs] || faqs.es;
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "ai-wine-software-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Wine List Management Software",
        operatingSystem: "Web",
        description: "Winerim is a wine intelligence platform for restaurants that combines digital wine list management, AI wine recommendations, automatic food pairing.",
        url: "https://winerim.wine",
        offers: {
          "@type": "Offer",
          url: "https://winerim.wine/precios",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Digital wine list management",
          "AI-powered wine recommendations",
          "Automatic food and wine pairing",
          "Wine sales analytics dashboard",
          "Wine price optimization",
          "Smart wine search filters",
          "Side-by-side wine comparison",
          "By-the-glass program management",
          "Multi-location wine management",
          "Multilingual wine list",
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Restaurants, Wine Bars, Hotels, Restaurant Groups",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "150",
          bestRating: "5",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: currentFaqs.map(f => ({
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
        description: "Wine Intelligence Platform for Restaurants. AI-powered wine list management, recommendations, pairing and analytics.",
        sameAs: [
          "https://www.instagram.com/winerim/",
          "https://www.linkedin.com/company/winerim/",
          "https://www.youtube.com/@Winerim",
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("ai-wine-software-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Winerim — AI Wine List Software for Restaurants | Digital Wine List Management"
        description="Winerim: AI wine list software for restaurants. Digital menus, smart recommendations, auto pairing, sales analytics and price optimization."
        url="https://winerim.wine/ai-wine-software"
        type="website"
        hreflang={allLangPaths("/ai-wine-software")}
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Brain size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">AI Wine Software</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            AI-Powered Wine List Software for Restaurants
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
            Winerim is a wine intelligence platform that helps restaurants manage their wine list, increase wine sales and optimize their wine program using artificial intelligence.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Request a Demo <ArrowRight size={16} />
            </Link>
            <Link to="/precios" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS WINERIM */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">What is Winerim?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground">Winerim is a specialized wine list management software for restaurants</strong> that uses artificial intelligence to help hospitality businesses optimize their wine program. It combines a fully interactive digital wine list with AI-powered recommendations, automatic food and wine pairing, sales analytics and pricing tools.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Unlike generic restaurant management tools, Winerim is built exclusively for wine. Every feature is designed to help restaurants sell more wine, improve margins and deliver a better guest experience through their wine offering.
          </p>
        </ScrollReveal>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Platform Features</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Key Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              A complete wine intelligence platform built for the hospitality industry.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="p-5 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                    <c.icon size={20} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-2">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO USES WINERIM */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Built For</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Who Uses Winerim?</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                  <uc.icon size={20} className="text-wine" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. RESULTS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Impact</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Proven Results</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="text-center p-6 rounded-xl border border-border bg-background">
                  <p className="font-heading text-3xl md:text-4xl font-bold text-wine mb-2">{b.value}</p>
                  <p className="font-semibold text-foreground text-sm mb-2">{b.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">FAQ</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        </ScrollReveal>

        <div className="space-y-6">
          {currentFaqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle size={18} className="text-wine shrink-0 mt-0.5" />
                  <h3 className="font-heading font-bold">{faq.q}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">{faq.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Wine Program?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Request a personalized demo and discover how Winerim can help your restaurant sell more wine, improve margins and deliver a better guest experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Request a Demo <ArrowRight size={16} />
              </Link>
              <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Free Wine List Analysis
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default AiWineSoftware;
