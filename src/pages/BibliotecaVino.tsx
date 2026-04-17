import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wine, MapPin, Palette, Utensils, ArrowRight, Grape, Search, BookOpen, GlassWater } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { grapeCatalog } from "@/data/grapesLibrary";
import { wineCountries } from "@/data/regionsLibrary";
import { familyMeta, familyOrder, getAllStyles } from "@/data/stylesLibrary";
import { categoryMeta, categoryOrder, pairingEntries } from "@/data/pairingsLibrary";
import { regionCatalog, CATALOG_STATS } from "@/data/regionsCatalog";

// ── i18n ──
const i18n = {
  es: {
    seoTitle: "Biblioteca del Vino | Guía Completa para Hostelería",
    seoDescription: "Guía completa sobre uvas, regiones vinícolas, estilos de vino y maridajes. Conocimiento esencial para restaurantes que quieren vender más y mejor vino.",
    knowledge: "Conocimiento",
    title: "Biblioteca del",
    titleSpan: "vino",
    description: "Todo lo que necesitas saber sobre uvas, regiones, estilos y maridajes para ofrecer una experiencia de vino excepcional en tu restaurante.",
    searchPlaceholder: "Busca variedades, regiones, estilos, maridajes...",
    denominaciones: "denominaciones",
    paises: "países",
    variedades: "variedades de uva",
    estilos: "estilos de vino",
    maridajes: "guías de maridaje",
    paisesProductores: "países productores",
    regionesTitle: "Regiones vinícolas",
    regionesDesc: "denominaciones de ",
    denominacionesWithColon: ": DOs, DOCs, DOCGs, AOPs, AVAs, Premier Crus, Grand Crus y más.",
    variedadesTitle: "Variedades de uva",
    variedadesDesc: "Perfil sensorial, reconocimiento comercial, estrategia de venta y maridajes de las ",
    variedadesVar: " variedades más relevantes del mundo.",
    estilosTitle: "Estilos de vino",
    estilosDesc: "Desde tintos jóvenes hasta Champagne, generosos de Jerez, vinos naranjas y dulces nobres. 8 familias, 50+ subtipos.",
    maridajesTitle: "Maridajes",
    maridajesDesc: "Guías de maridaje por categoría y plato individual. Desde solomillo hasta sushi, con recomendaciones de uva, región y estilo.",
    herramientas: "Herramientas de consulta",
    servicioTitle: "Guía de servicio",
    servicioDesc: "Temperatura, copa, ml por servicio y copas por botella para cada estilo de vino.",
    glosarioTitle: "Glosario del vino",
    glosarioDesc: "Más de 35 términos esenciales explicados con claridad para profesionales de hostelería.",
    calculadoraTitle: "Calculadora por copa",
    calculadoraDesc: "Calcula el margen y el precio óptimo de cada copa de vino en tu carta.",
    ctaTitle: "¿Quieres que tu carta refleje este",
    ctaSpan: "conocimiento",
    ctaDesc: "Winerim lleva toda esta información directamente a tu carta digital, ayudando a tus clientes a descubrir y elegir mejor.",
    ctaButton: "Solicitar demo",
    exploreDenominations: "Explorar ",
    explorarVar: " variedades",
    verTodos: "Ver todos los estilos",
    verGuias: "Ver todas las guías",
  },
  en: {
    seoTitle: "Wine Library | Complete Hospitality Guide",
    seoDescription: "Complete guide to grapes, wine regions, wine styles and food pairings. Essential knowledge for restaurants that want to sell more and better wine.",
    knowledge: "Knowledge",
    title: "Wine",
    titleSpan: "Library",
    description: "Everything you need to know about grapes, regions, styles and pairings to offer an exceptional wine experience in your restaurant.",
    searchPlaceholder: "Search varieties, regions, styles, pairings...",
    denominaciones: "designations",
    paises: "countries",
    variedades: "grape varieties",
    estilos: "wine styles",
    maridajes: "pairing guides",
    paisesProductores: "producing countries",
    regionesTitle: "Wine regions",
    regionesDesc: "designations from ",
    denominacionesWithColon: ": DOs, DOCs, DOCGs, AOPs, AVAs, Premier Crus, Grand Crus and more.",
    variedadesTitle: "Grape varieties",
    variedadesDesc: "Sensory profile, commercial recognition, sales strategy and pairings from the ",
    variedadesVar: " most relevant grape varieties in the world.",
    estilosTitle: "Wine styles",
    estilosDesc: "From young reds to Champagne, Sherry wines, orange wines and noble sweet wines. 8 families, 50+ subtypes.",
    maridajesTitle: "Pairings",
    maridajesDesc: "Pairing guides by category and individual dish. From sirloin to sushi, with recommendations for grape, region and style.",
    herramientas: "Reference tools",
    servicioTitle: "Serving guide",
    servicioDesc: "Temperature, glass, ml per serving and glasses per bottle for each wine style.",
    glosarioTitle: "Wine glossary",
    glosarioDesc: "Over 35 essential terms explained clearly for hospitality professionals.",
    calculadoraTitle: "Glass price calculator",
    calculadoraDesc: "Calculate the margin and optimal price for each glass of wine on your menu.",
    ctaTitle: "Want your menu to reflect this",
    ctaSpan: "knowledge",
    ctaDesc: "Winerim brings all this information directly to your digital menu, helping your customers discover and choose better.",
    ctaButton: "Request demo",
    exploreDenominations: "Explore ",
    explorarVar: " varieties",
    verTodos: "See all styles",
    verGuias: "See all guides",
  },
  it: {
    seoTitle: "Biblioteca del Vino | Guida Completa per l'Ospitalità",
    seoDescription: "Guida completa su vitigni, regioni vinicole, stili di vino e abbinamenti. Conoscenze essenziali per ristoranti che vogliono vendere più e meglio.",
    knowledge: "Conoscenza",
    title: "Biblioteca del",
    titleSpan: "vino",
    description: "Tutto quello che devi sapere su vitigni, regioni, stili e abbinamenti per offrire un'esperienza vino eccezionale nel tuo ristorante.",
    searchPlaceholder: "Cerca vitigni, regioni, stili, abbinamenti...",
    denominazioni: "denominazioni",
    paises: "paesi",
    variedades: "vitigni",
    estilos: "stili di vino",
    maridajes: "guide di abbinamento",
    paisesProductores: "paesi produttori",
    regionesTitle: "Regioni vinicole",
    regionesDesc: "denominazioni da ",
    denominacionesWithColon: ": DO, DOC, DOCG, AOP, AVA, Premier Cru, Grand Cru e altro.",
    variedadesTitle: "Vitigni",
    variedadesDesc: "Profilo sensoriale, riconoscimento commerciale, strategia di vendita e abbinamenti da ",
    variedadesVar: " vitigni più rilevanti del mondo.",
    estilosTitle: "Stili di vino",
    estilosDesc: "Da rossi giovani a Champagne, vini di Jerez, vini arancioni e dolci nobili. 8 famiglie, 50+ sottotipi.",
    maridajesTitle: "Abbinamenti",
    maridajesDesc: "Guide di abbinamento per categoria e singolo piatto. Da bistecca a sushi, con consigli su vitigno, regione e stile.",
    herramientas: "Strumenti di consultazione",
    servicioTitle: "Guida al servizio",
    servicioDesc: "Temperatura, bicchiere, ml per servizio e bicchieri per bottiglia per ogni stile di vino.",
    glosarioTitle: "Glossario del vino",
    glosarioDesc: "Oltre 35 termini essenziali spiegati chiaramente per professionisti dell'ospitalità.",
    calculadoraTitle: "Calcolatore prezzo per bicchiere",
    calculadoraDesc: "Calcola il margine e il prezzo ottimale per ogni bicchiere di vino della tua carta.",
    ctaTitle: "Vuoi che la tua carta rispecchi questa",
    ctaSpan: "conoscenza",
    ctaDesc: "Winerim porta tutte queste informazioni direttamente nella tua carta digitale, aiutando i tuoi clienti a scoprire e scegliere meglio.",
    ctaButton: "Richiedi demo",
    exploreDenominations: "Esplora ",
    explorarVar: " vitigni",
    verTodos: "Vedi tutti gli stili",
    verGuias: "Vedi tutte le guide",
  },
  fr: {
    seoTitle: "Bibliothèque du Vin | Guide Complet pour l'Hôtellerie",
    seoDescription: "Guide complet sur les cépages, régions viticoles, styles de vin et accords mets-vins. Connaissances essentielles pour les restaurants qui veulent vendre plus et mieux.",
    knowledge: "Connaissance",
    title: "Bibliothèque du",
    titleSpan: "vin",
    description: "Tout ce que tu as besoin de savoir sur les cépages, régions, styles et accords pour offrir une expérience vinicole exceptionnelle dans ton restaurant.",
    searchPlaceholder: "Cherche cépages, régions, styles, accords...",
    denominazioni: "appellations",
    paises: "pays",
    variedades: "cépages",
    estilos: "styles de vin",
    maridajes: "guides d'accords",
    paisesProductores: "pays producteurs",
    regionesTitle: "Régions viticoles",
    regionesDesc: "appellations de ",
    denominacionesWithColon: ": DO, DOC, DOCG, AOP, AVA, Premier Cru, Grand Cru et plus.",
    variedadesTitle: "Cépages",
    variedadesDesc: "Profil sensoriel, reconnaissance commerciale, stratégie de vente et accords des ",
    variedadesVar: " cépages les plus pertinents du monde.",
    estilosTitle: "Styles de vin",
    estilosDesc: "Des jeunes rouges à Champagne, vins de Xérès, vins oranges et doux nobles. 8 familles, 50+ sous-types.",
    maridajesTitle: "Accords",
    maridajesDesc: "Guides d'accords par catégorie et plat individuel. Du filet au sushi, avec recommandations de cépage, région et style.",
    herramientas: "Outils de consultation",
    servicioTitle: "Guide de service",
    servicioDesc: "Température, verre, ml par service et verres par bouteille pour chaque style de vin.",
    glosarioTitle: "Glossaire du vin",
    glosarioDesc: "Plus de 35 termes essentiels expliqués clairement pour les professionnels de l'hôtellerie.",
    calculadoraTitle: "Calculatrice prix par verre",
    calculadoraDesc: "Calcule la marge et le prix optimal pour chaque verre de vin de ta carte.",
    ctaTitle: "Veux-tu que ta carte reflète cette",
    ctaSpan: "connaissance",
    ctaDesc: "Winerim apporte toutes ces informations directement à ta carte numérique, aidant tes clients à découvrir et choisir mieux.",
    ctaButton: "Demander une démo",
    exploreDenominations: "Explore ",
    explorarVar: " cépages",
    verTodos: "Voir tous les styles",
    verGuias: "Voir tous les guides",
  },
  de: {
    seoTitle: "Weinbibliothek | Vollständiger Leitfaden für Gastronomie",
    seoDescription: "Vollständiger Leitfaden zu Rebsorten, Weinregionen, Weinstilen und Speisebegleitungen. Wesentliches Wissen für Restaurants, die mehr und besser verkaufen wollen.",
    knowledge: "Wissen",
    title: "Weinbibliothek",
    titleSpan: "Wein",
    description: "Alles, was Sie über Rebsorten, Regionen, Stile und Speisebegleitungen wissen müssen, um Ihren Gästen ein außergewöhnliches Weinerlebnis zu bieten.",
    searchPlaceholder: "Suchen Sie nach Rebsorten, Regionen, Stilen, Speisebegleitungen...",
    denominazioni: "Herkunftsbezeichnungen",
    paises: "Länder",
    variedades: "Rebsorten",
    estilos: "Weinstile",
    maridajes: "Speisebegleitungsleitfäden",
    paisesProductores: "Produzentenländer",
    regionesTitle: "Weinregionen",
    regionesDesc: "Herkunftsbezeichnungen aus ",
    denominacionesWithColon: ": DO, DOC, DOCG, AOP, AVA, Premier Cru, Grand Cru und mehr.",
    variedadesTitle: "Rebsorten",
    variedadesDesc: "Sensorisches Profil, kommerzielle Anerkennung, Verkaufsstrategie und Speisebegleitungen der ",
    variedadesVar: " wichtigsten Rebsorten der Welt.",
    estilosTitle: "Weinstile",
    estilosDesc: "Von jungen Rotweinen bis Champagner, Jerez-Weine, Naturweine und edle Süßweine. 8 Familien, 50+ Untertypen.",
    maridajesTitle: "Speisebegleitungen",
    maridajesDesc: "Speisebegleitungsleitfäden nach Kategorie und einzelnem Gericht. Von Filet bis Sushi mit Empfehlungen für Rebsorte, Region und Stil.",
    herramientas: "Konsultationswerkzeuge",
    servicioTitle: "Serviceleitfaden",
    servicioDesc: "Temperatur, Glas, ml pro Serviette und Gläser pro Flasche für jeden Weinstil.",
    glosarioTitle: "Weinglexikon",
    glosarioDesc: "Über 35 wesentliche Begriffe klar erklärt für Gastronomie-Profis.",
    calculadoraTitle: "Glaspreisrechner",
    calculadoraDesc: "Berechnen Sie die Marge und den optimalen Preis für jedes Glas Wein auf Ihrer Karte.",
    ctaTitle: "Möchten Sie, dass Ihre Karte dieses",
    ctaSpan: "Wissen",
    ctaDesc: "Winerim bringt alle diese Informationen direkt in Ihre digitale Karte und hilft Ihren Gästen, besser zu entdecken und zu wählen.",
    ctaButton: "Demo anfordern",
    exploreDenominations: "Erkunden Sie ",
    explorarVar: " Rebsorten",
    verTodos: "Alle Stile anzeigen",
    verGuias: "Alle Leitfäden anzeigen",
  },
  pt: {
    seoTitle: "Biblioteca do Vinho | Guia Completo para Hotelaria",
    seoDescription: "Guia completo sobre castas, regiões vinícolas, estilos de vinho e harmonizações. Conhecimento essencial para restaurantes que querem vender mais e melhor.",
    knowledge: "Conhecimento",
    title: "Biblioteca do",
    titleSpan: "vinho",
    description: "Tudo que você precisa saber sobre castas, regiões, estilos e harmonizações para oferecer uma experiência de vinho excepcional em seu restaurante.",
    searchPlaceholder: "Procure por castas, regiões, estilos, harmonizações...",
    denominazioni: "denominações",
    paises: "países",
    variedades: "castas de uva",
    estilos: "estilos de vinho",
    maridajes: "guias de harmonização",
    paisesProductores: "países produtores",
    regionesTitle: "Regiões vinícolas",
    regionesDesc: "denominações de ",
    denominacionesWithColon: ": DO, DOC, DOCG, AOP, AVA, Premier Cru, Grand Cru e mais.",
    variedadesTitle: "Castas de uva",
    variedadesDesc: "Perfil sensorial, reconhecimento comercial, estratégia de venda e harmonizações das ",
    variedadesVar: " castas mais relevantes do mundo.",
    estilosTitle: "Estilos de vinho",
    estilosDesc: "De tintos jovens a Champagne, vinhos do Porto, vinhos laranja e doces nobres. 8 famílias, 50+ subtipos.",
    maridajesTitle: "Harmonizações",
    maridajesDesc: "Guias de harmonização por categoria e prato individual. De bife a sushi, com recomendações de casta, região e estilo.",
    herramientas: "Ferramentas de consulta",
    servicioTitle: "Guia de serviço",
    servicioDesc: "Temperatura, taça, ml por serviço e taças por garrafa para cada estilo de vinho.",
    glosarioTitle: "Glossário do vinho",
    glosarioDesc: "Mais de 35 termos essenciais explicados com clareza para profissionais de hotelaria.",
    calculadoraTitle: "Calculadora de preço por taça",
    calculadoraDesc: "Calcule a margem e o preço ideal para cada taça de vinho em sua carta.",
    ctaTitle: "Quer que sua carta reflita este",
    ctaSpan: "conhecimento",
    ctaDesc: "Winerim traz todas essas informações diretamente para sua carta digital, ajudando seus clientes a descobrir e escolher melhor.",
    ctaButton: "Solicitar demo",
    exploreDenominations: "Explore ",
    explorarVar: " castas",
    verTodos: "Ver todos os estilos",
    verGuias: "Ver todos os guias",
  },
};

// ── Search index ──
type SearchResult = { name: string; category: string; badge: string; path: string; emoji?: string };

const buildSearchIndex = (): SearchResult[] => {
  const results: SearchResult[] = [];
  // Grapes
  grapeCatalog.forEach((g) => results.push({ name: g.name, category: "uva", badge: "Variedad", path: `/biblioteca-vino/uvas/${g.slug}`, emoji: "🍇" }));
  // Styles
  getAllStyles().forEach((s) => results.push({ name: s.name, category: "estilo", badge: "Estilo", path: `/biblioteca-vino/estilos/${s.slug}`, emoji: familyMeta[s.family]?.emoji }));
  // Pairings
  pairingEntries.forEach((p) => results.push({ name: p.name, category: "maridaje", badge: "Maridaje", path: `/biblioteca-vino/maridajes/${p.slug}`, emoji: categoryMeta[p.category]?.emoji }));
  // Countries
  wineCountries.forEach((c) => results.push({ name: c.name, category: "region", badge: "País", path: `/biblioteca-vino/regiones/${c.slug}`, emoji: c.flag }));
  // Catalog regions/denominations
  regionCatalog.slice(0, 100).forEach((r) => results.push({ name: r.name, category: "denominacion", badge: "Denominación", path: `/biblioteca-vino/regiones/${r.country}/${r.slug}`, emoji: "🍷" }));
  return results;
};

// ── Animated Counter ──
const Counter = ({ end, label, duration = 1.5 }: { end: number; label: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-3xl md:text-4xl font-bold text-wine">{count.toLocaleString()}+</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

// Top grapes for preview
const topGrapes = ["tempranillo", "garnacha", "cabernet-sauvignon", "pinot-noir", "chardonnay", "sauvignon-blanc"];
const topCountries = ["espana", "francia", "italia", "portugal", "estados-unidos", "alemania"];

const BibliotecaVino = () => {
  const { lang, allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const q = search.toLowerCase();
    setSearchResults(searchIndex.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 8));
  }, [search, searchIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={i18n[lang as keyof typeof i18n]?.seoTitle ?? i18n.es.seoTitle}
        description={i18n[lang as keyof typeof i18n]?.seoDescription ?? i18n.es.seoDescription}
        url="https://winerim.wine/biblioteca-vino"
        hreflang={allLangPaths("/biblioteca-vino")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{i18n[lang as keyof typeof i18n]?.knowledge ?? i18n.es.knowledge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            {i18n[lang as keyof typeof i18n]?.title ?? i18n.es.title} <span className="text-gradient-wine italic">{i18n[lang as keyof typeof i18n]?.titleSpan ?? i18n.es.titleSpan}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {i18n[lang as keyof typeof i18n]?.description ?? i18n.es.description}
          </motion.p>

          {/* GLOBAL SEARCH */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="relative max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Busca variedades, regiones, estilos, maridajes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base bg-secondary/30 border-border rounded-xl"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute z-50 top-full mt-2 w-full bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {searchResults.map((r) => (
                  <Link key={r.path} to={r.path} onClick={() => setSearch("")}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-wine/5 transition-colors border-b border-border/50 last:border-0">
                    <span className="text-lg">{r.emoji}</span>
                    <span className="text-sm font-medium flex-1">{r.name}</span>
                    <Badge variant="secondary" className="text-xs">{r.badge}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-border bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <Counter end={CATALOG_STATS.totalDenominations} label="denominaciones" />
            <Counter end={CATALOG_STATS.totalCountries} label="países" />
            <Counter end={grapeCatalog.length} label="variedades de uva" />
            <Counter end={getAllStyles().length} label="estilos de vino" />
            <Counter end={pairingEntries.length} label="guías de maridaje" />
            <Counter end={wineCountries.length} label="países productores" />
          </div>
        </div>
      </section>

      {/* 1. REGIONES — La sección más grande, va primero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Regiones vinícolas</h2>
              </div>
              <Link to="/biblioteca-vino/regiones" className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                Explorar {CATALOG_STATS.totalDenominations.toLocaleString()}+ denominaciones <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              {CATALOG_STATS.totalDenominations.toLocaleString()} denominaciones de {CATALOG_STATS.totalCountries} países: DOs, DOCs, DOCGs, AOPs, AVAs, Premier Crus, Grand Crus y más.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCountries.map((slug, i) => {
              const country = wineCountries.find((c) => c.slug === slug);
              if (!country) return null;
              return (
                <ScrollReveal key={slug} delay={i * 0.05}>
                  <Link to={`/biblioteca-vino/regiones/${slug}`}
                    className="group block bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all h-full text-center">
                    <span className="text-3xl block mb-2">{country.flag}</span>
                    <p className="font-heading text-sm font-semibold group-hover:text-wine transition-colors">{country.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{country.denominationsCount.toLocaleString()} denominaciones</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. VARIEDADES DE UVA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Grape size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Variedades de uva</h2>
              </div>
              <Link to="/biblioteca-vino/uvas" className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                Explorar {grapeCatalog.length} variedades <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Perfil sensorial, reconocimiento comercial, estrategia de venta y maridajes de las {grapeCatalog.length} variedades más relevantes del mundo.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topGrapes.map((slug, i) => {
              const grape = grapeCatalog.find((g) => g.slug === slug);
              if (!grape) return null;
              return (
                <ScrollReveal key={slug} delay={i * 0.05}>
                  <Link to={`/biblioteca-vino/uvas/${slug}`}
                    className="group block bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all h-full">
                    <p className="font-heading text-sm font-semibold group-hover:text-wine transition-colors mb-1">{grape.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{grape.tastingNotes}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ESTILOS DE VINO */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Palette size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Estilos de vino</h2>
              </div>
              <Link to="/biblioteca-vino/estilos" className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                Ver todos los estilos <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Desde tintos jóvenes hasta Champagne, generosos de Jerez, vinos naranjas y dulces nobres. 8 familias, 50+ subtipos.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {familyOrder.map((family, i) => {
              const meta = familyMeta[family];
              const styles = getAllStyles().filter(s => s.family === family);
              const firstSlug = styles[0]?.slug;
              return (
                <ScrollReveal key={family} delay={i * 0.04}>
                  <Link
                    to={firstSlug ? `/biblioteca-vino/estilos/${firstSlug}` : "/biblioteca-vino/estilos"}
                    className="group block bg-gradient-card rounded-xl border border-border p-4 text-center hover:border-wine/30 transition-all h-full"
                  >
                    <span className="text-2xl block mb-2">{meta.emoji}</span>
                    <span className="text-xs font-semibold group-hover:text-wine transition-colors">{meta.label}</span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MARIDAJES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Utensils size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Maridajes</h2>
              </div>
              <Link to="/biblioteca-vino/maridajes" className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                Ver todas las guías <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Guías de maridaje por categoría y plato individual. Desde solomillo hasta sushi, con recomendaciones de uva, región y estilo.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {categoryOrder.map((cat, i) => {
              const meta = categoryMeta[cat];
              const entry = pairingEntries.find(e => e.category === cat);
              return (
                <ScrollReveal key={cat} delay={i * 0.04}>
                  <Link
                    to={entry ? `/biblioteca-vino/maridajes/${entry.slug}` : "/biblioteca-vino/maridajes"}
                    className="group block bg-gradient-card rounded-xl border border-border p-4 text-center hover:border-wine/30 transition-all h-full"
                  >
                    <span className="text-2xl block mb-2">{meta.emoji}</span>
                    <span className="text-xs font-semibold group-hover:text-wine transition-colors leading-tight block">{meta.label}</span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Herramientas de consulta</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <Link to="/biblioteca-vino/guia-servicio"
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <GlassWater size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">Guía de servicio</h3>
                <p className="text-sm text-muted-foreground">Temperatura, copa, ml por servicio y copas por botella para cada estilo de vino.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <Link to="/biblioteca-vino/glosario"
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <BookOpen size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">Glosario del vino</h3>
                <p className="text-sm text-muted-foreground">Más de 35 términos esenciales explicados con claridad para profesionales de hostelería.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <Link to="/herramientas/calculadora-precio-vino-por-copa"
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <Wine size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">Calculadora por copa</h3>
                <p className="text-sm text-muted-foreground">Calcula el margen y el precio óptimo de cada copa de vino en tu carta.</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                ¿Quieres que tu carta refleje este{" "}
                <span className="text-gradient-wine italic">conocimiento</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Winerim lleva toda esta información directamente a tu carta digital, ayudando a tus clientes a descubrir y elegir mejor.
              </p>
              <Link to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BibliotecaVino;
