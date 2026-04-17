import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Search, ArrowRight, Filter, X, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  styleEntries,
  styleCatalog,
  familyMeta,
  familyOrder,
  type StyleFamily,
  type StyleEntry,
} from "@/data/stylesLibrary";

const i18n = {
  es: {
    seoTitle: "Estilos de Vino: Guía Completa para Hostelería | Winerim",
    seoDescription: "Guía de estilos de vino: tintos, blancos, rosados, espumosos, generosos, dulces, naranjas y naturales. 8 familias y 50+ subtipos para carta.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Estilos de Vino",
    tag: "Estilos",
    families: "8 familias",
    subtypes: "50+ subtipos",
    commercial: "Capa Winerim comercial",
    title: "Estilos de",
    titleSpan: "vino",
    description: "8 grandes familias, más de 50 subtipos. Cada estilo con su elaboración, perfil sensorial, maridajes y lectura comercial para hostelería.",
    searchPlaceholder: "Buscar estilo, uva o región…",
    filterButton: "Filtros",
    familyLabel: "Familia de vino",
    allFamilies: "Todos",
    clear: "Limpiar",
    styles: " estilo",
    stylesPlural: "s",
    subtypesVariants: "Subtipos y variantes",
    ctaTitle: "¿Quieres que tu carta refleje esta",
    ctaSpan: "diversidad",
    ctaDesc: "Winerim organiza tu carta con criterio: estilos, temperaturas, copas y maridajes. Información útil para tu equipo y tus clientes.",
    ctaButton1: "Solicitar demo",
    ctaButton2: "Explorar Biblioteca",
    faqsTitle: "Preguntas frecuentes",
    bodyLigero: "Ligero",
    bodyMedio: "Medio",
    bodyAlto: "Alto",
    bodyMuyAlto: "Muy alto",
    faqQ1: "¿Cuántos estilos de vino existen?",
    faqA1: "Winerim clasifica el mundo del vino en 8 grandes familias (tinto, blanco, rosado, espumoso, generoso, dulce natural, naranja y ecológico/biodinámico/natural) con más de 50 subtipos y variantes.",
    faqQ2: "¿Por qué importa conocer los estilos para gestionar una carta?",
    faqA2: "El estilo determina la experiencia del comensal: temperatura, copa, maridaje y expectativas. Una carta bien organizada por estilos ayuda al cliente a elegir y al restaurante a vender mejor.",
    faqQ3: "¿Qué diferencia hay entre vino generoso y dulce natural?",
    faqA3: "El vino generoso tiene alcohol añadido (fortificado). El dulce natural concentra azúcar por métodos naturales (botrytis, pasificación, congelación) sin añadir alcohol.",
    faqQ4: "¿Qué es un orange wine?",
    faqA4: "Un vino elaborado con uvas blancas pero fermentado con sus hollejos como un tinto. El resultado es un vino de color ámbar/naranja con taninos y complejidad textural.",
  },
  en: {
    seoTitle: "Wine Styles: Complete Hospitality Guide | Winerim",
    seoDescription: "Wine styles guide: reds, whites, rosés, sparkling, fortified, natural sweet, orange and natural wines. 8 families and 50+ subtypes for the menu.",
    breadcrumb1: "Wine Library",
    breadcrumb2: "Wine Styles",
    tag: "Styles",
    families: "8 families",
    subtypes: "50+ subtypes",
    commercial: "Winerim commercial layer",
    title: "Wine",
    titleSpan: "styles",
    description: "8 major families, over 50 subtypes. Each style with its elaboration, sensory profile, pairings and commercial reading for hospitality.",
    searchPlaceholder: "Search style, grape or region...",
    filterButton: "Filters",
    familyLabel: "Wine family",
    allFamilies: "All",
    clear: "Clear",
    styles: " style",
    stylesPlural: "s",
    subtypesVariants: "Subtypes and variants",
    ctaTitle: "Want your menu to reflect this",
    ctaSpan: "diversity",
    ctaDesc: "Winerim organizes your menu with criteria: styles, temperatures, glasses and pairings. Useful information for your team and guests.",
    ctaButton1: "Request demo",
    ctaButton2: "Explore Library",
    faqsTitle: "Frequently asked questions",
    bodyLigero: "Light",
    bodyMedio: "Medium",
    bodyAlto: "Full",
    bodyMuyAlto: "Very full",
    faqQ1: "How many wine styles are there?",
    faqA1: "Winerim classifies the wine world into 8 major families (red, white, rosé, sparkling, fortified, natural sweet, orange and natural/biodynamic/organic) with over 50 subtypes and variants.",
    faqQ2: "Why does it matter to know styles for managing a menu?",
    faqA2: "Style determines the diner's experience: temperature, glass, pairing and expectations. A menu well organized by styles helps the customer choose and the restaurant sell better.",
    faqQ3: "What is the difference between fortified wine and natural sweet wine?",
    faqA3: "Fortified wine has added alcohol (fortified). Natural sweet concentrates sugar through natural methods (botrytis, raisining, freezing) without adding alcohol.",
    faqQ4: "What is an orange wine?",
    faqA4: "A wine made from white grapes but fermented with their skins like a red. The result is an amber/orange colored wine with tannins and textural complexity.",
  },
  it: {
    seoTitle: "Stili del Vino: Guida Completa per l'Ospitalità | Winerim",
    seoDescription: "Guida agli stili del vino: rossi, bianchi, rosati, spumanti, fortificati, dolci naturali, arancioni e naturali. 8 famiglie e 50+ sottotipi per la carta.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Stili del Vino",
    tag: "Stili",
    families: "8 famiglie",
    subtypes: "50+ sottotipi",
    commercial: "Strato Winerim commerciale",
    title: "Stili del",
    titleSpan: "vino",
    description: "8 famiglie principali, oltre 50 sottotipi. Ogni stile con la sua elaborazione, profilo sensoriale, abbinamenti e lettura commerciale per l'ospitalità.",
    searchPlaceholder: "Cerca stile, vitigno o regione...",
    filterButton: "Filtri",
    familyLabel: "Famiglia di vino",
    allFamilies: "Tutti",
    clear: "Cancella",
    styles: " stile",
    stylesPlural: "",
    subtypesVariants: "Sottotipi e varianti",
    ctaTitle: "Vuoi che il tuo menu rispecchi questa",
    ctaSpan: "diversità",
    ctaDesc: "Winerim organizza la tua carta con criterio: stili, temperature, bicchieri e abbinamenti. Informazioni utili per il tuo team e i tuoi ospiti.",
    ctaButton1: "Richiedi demo",
    ctaButton2: "Esplora Biblioteca",
    faqsTitle: "Domande frequenti",
    bodyLigero: "Leggero",
    bodyMedio: "Medio",
    bodyAlto: "Pieno",
    bodyMuyAlto: "Molto pieno",
    faqQ1: "Quanti stili di vino esistono?",
    faqA1: "Winerim classifica il mondo del vino in 8 famiglie principali (rosso, bianco, rosato, spumante, fortificato, dolce naturale, arancione e naturale/biodinamico/biologico) con oltre 50 sottotipi e varianti.",
    faqQ2: "Perché è importante conoscere gli stili per gestire una carta?",
    faqA2: "Lo stile determina l'esperienza del commensale: temperatura, bicchiere, abbinamento e aspettative. Una carta ben organizzata per stili aiuta il cliente a scegliere e il ristorante a vendere meglio.",
    faqQ3: "Qual è la differenza tra vino fortificato e dolce naturale?",
    faqA3: "Il vino fortificato ha alcol aggiunto (fortificato). Il dolce naturale concentra lo zucchero attraverso metodi naturali (botrytis, appassimento, congelamento) senza aggiungere alcol.",
    faqQ4: "Cos'è un vino arancione?",
    faqA4: "Un vino fatto con uve bianche ma fermentato con le sue bucce come un rosso. Il risultato è un vino di colore ambra/arancione con tannini e complessità strutturale.",
  },
  fr: {
    seoTitle: "Styles de Vin: Guide Complet pour l'Hôtellerie | Winerim",
    seoDescription: "Guide des styles de vin: rouges, blancs, rosés, effervescents, fortifiés, doux naturels, oranges et naturels. 8 familles et 50+ sous-types pour la carte.",
    breadcrumb1: "Bibliothèque du Vin",
    breadcrumb2: "Styles du Vin",
    tag: "Styles",
    families: "8 familles",
    subtypes: "50+ sous-types",
    commercial: "Couche Winerim commerciale",
    title: "Styles du",
    titleSpan: "vin",
    description: "8 familles principales, plus de 50 sous-types. Chaque style avec son élaboration, profil sensoriel, accords et lecture commerciale pour l'hôtellerie.",
    searchPlaceholder: "Cherchez style, cépage ou région...",
    filterButton: "Filtres",
    familyLabel: "Famille de vin",
    allFamilies: "Tous",
    clear: "Effacer",
    styles: " style",
    stylesPlural: "",
    subtypesVariants: "Sous-types et variantes",
    ctaTitle: "Voulez-vous que votre menu reflète cette",
    ctaSpan: "diversité",
    ctaDesc: "Winerim organise votre carte avec critère: styles, températures, verres et accords. Informations utiles pour votre équipe et vos clients.",
    ctaButton1: "Demander une démo",
    ctaButton2: "Explorer la Bibliothèque",
    faqsTitle: "Questions fréquemment posées",
    bodyLigero: "Léger",
    bodyMedio: "Moyen",
    bodyAlto: "Complet",
    bodyMuyAlto: "Très complet",
    faqQ1: "Combien de styles de vin existe-t-il?",
    faqA1: "Winerim classe le monde du vin en 8 familles principales (rouge, blanc, rosé, effervescent, fortifié, doux naturel, orange et naturel/biodynamique/biologique) avec plus de 50 sous-types et variantes.",
    faqQ2: "Pourquoi est-il important de connaître les styles pour gérer une carte?",
    faqA2: "Le style détermine l'expérience du dîneur: température, verre, accord et attentes. Une carte bien organisée par styles aide le client à choisir et le restaurant à vendre mieux.",
    faqQ3: "Quelle est la différence entre vin fortifié et doux naturel?",
    faqA3: "Le vin fortifié a de l'alcool ajouté (fortifié). Le doux naturel concentre le sucre par des méthodes naturelles (botrytis, passerillage, congélation) sans ajouter d'alcool.",
    faqQ4: "Qu'est-ce qu'un vin orange?",
    faqA4: "Un vin fait à partir de raisins blancs mais fermenté avec ses peaux comme un rouge. Le résultat est un vin de couleur ambre/orange avec des tanins et une complexité structurelle.",
  },
  de: {
    seoTitle: "Weinstile: Vollständiger Leitfaden für Gastronomie | Winerim",
    seoDescription: "Leitfaden zu Weinstilen: Rotweine, Weißweine, Rosés, Schaumweine, Dessertweine, natürliche Süßweine und natürliche Weine. 8 Familien und 50+ Untertypen.",
    breadcrumb1: "Weinbibliothek",
    breadcrumb2: "Weinstile",
    tag: "Stile",
    families: "8 Familien",
    subtypes: "50+ Untertypen",
    commercial: "Winerim-Geschäftsebene",
    title: "Weinstile",
    titleSpan: "Wein",
    description: "8 große Familien, über 50 Untertypen. Jeder Stil mit seiner Herstellung, sein sensorisches Profil, Speisebegleitungen und kommerzielle Interpretation für Gastronomie.",
    searchPlaceholder: "Nach Stil, Rebsorte oder Region suchen...",
    filterButton: "Filter",
    familyLabel: "Weinfamilie",
    allFamilies: "Alle",
    clear: "Löschen",
    styles: " Stil",
    stylesPlural: "e",
    subtypesVariants: "Untertypen und Varianten",
    ctaTitle: "Möchten Sie, dass Ihre Karte diese",
    ctaSpan: "Vielfalt",
    ctaDesc: "Winerim organisiert Ihre Karte mit Kriterium: Stile, Temperaturen, Gläser und Speisebegleitungen. Nützliche Informationen für Ihr Team und Ihre Gäste.",
    ctaButton1: "Demo anfordern",
    ctaButton2: "Bibliothek erkunden",
    faqsTitle: "Häufig gestellte Fragen",
    bodyLigero: "Leicht",
    bodyMedio: "Mittel",
    bodyAlto: "Voll",
    bodyMuyAlto: "Sehr voll",
    faqQ1: "Wie viele Weinstile gibt es?",
    faqA1: "Winerim klassifiziert die Weinwelt in 8 Hauptfamilien (Rotwein, Weißwein, Rosé, Schaumwein, Dessertwein, natürlicher Süßwein, Naturwein und ökologischer/biodynamischer/natürlicher Wein) mit über 50 Untertypen und Varianten.",
    faqQ2: "Warum ist es wichtig, Weinstile zur Verwaltung einer Karte zu kennen?",
    faqA2: "Der Stil bestimmt das Erlebnis des Gastes: Temperatur, Glas, Speisebegleitung und Erwartungen. Eine gut nach Stilen organisierte Karte hilft dem Kunden zu wählen und dem Restaurant besser zu verkaufen.",
    faqQ3: "Was ist der Unterschied zwischen Dessertwein und natürlichem Süßwein?",
    faqA3: "Dessertwein hat zugesetzten Alkohol (verstärkt). Natürlicher Süßwein konzentriert Zucker durch natürliche Methoden (Botrytis, Rosinierung, Gefrieren) ohne Alkoholverstärkung.",
    faqQ4: "Was ist ein Orange Wine?",
    faqA4: "Ein Wein aus weißen Trauben, aber mit Schalen wie ein Rotwein gären. Das Ergebnis ist ein Wein mit Bernstein-/Orangefarbe mit Tanninen und struktureller Komplexität.",
  },
  pt: {
    seoTitle: "Estilos de Vinho: Guia Completo para Hotelaria | Winerim",
    seoDescription: "Guia de estilos de vinho: tintos, brancos, rosados, espumantes, vinhos de sobremesa, vinhos naturais doces e vinhos laranja. 8 famílias e 50+ subtipos.",
    breadcrumb1: "Biblioteca do Vinho",
    breadcrumb2: "Estilos de Vinho",
    tag: "Estilos",
    families: "8 famílias",
    subtypes: "50+ subtipos",
    commercial: "Camada Winerim comercial",
    title: "Estilos de",
    titleSpan: "vinho",
    description: "8 famílias principais, mais de 50 subtipos. Cada estilo com sua elaboração, perfil sensorial, harmonizações e leitura comercial para hotelaria.",
    searchPlaceholder: "Procure por estilo, casta ou região...",
    filterButton: "Filtros",
    familyLabel: "Família de vinho",
    allFamilies: "Todos",
    clear: "Limpar",
    styles: " estilo",
    stylesPlural: "s",
    subtypesVariants: "Subtipos e variantes",
    ctaTitle: "Quer que sua carta reflita essa",
    ctaSpan: "diversidade",
    ctaDesc: "Winerim organiza sua carta com critério: estilos, temperaturas, taças e harmonizações. Informações úteis para sua equipe e seus clientes.",
    ctaButton1: "Solicitar demo",
    ctaButton2: "Explorar Biblioteca",
    faqsTitle: "Perguntas frequentes",
    bodyLigero: "Leve",
    bodyMedio: "Médio",
    bodyAlto: "Cheio",
    bodyMuyAlto: "Muito cheio",
    faqQ1: "Quantos estilos de vinho existem?",
    faqA1: "Winerim classifica o mundo do vinho em 8 famílias principais (tinto, branco, rosado, espumante, fortificado, doce natural, laranja e vinho natural/biodinâmico/orgânico) com mais de 50 subtipos e variantes.",
    faqQ2: "Por que é importante conhecer os estilos para gerenciar uma carta?",
    faqA2: "O estilo determina a experiência do comensal: temperatura, taça, harmonização e expectativas. Uma carta bem organizada por estilos ajuda o cliente a escolher e o restaurante a vender melhor.",
    faqQ3: "Qual é a diferença entre vinho fortificado e doce natural?",
    faqA3: "O vinho fortificado tem álcool adicionado (reforçado). O doce natural concentra açúcar através de métodos naturais (botrytis, apodrecimento nobre, congelamento) sem adicionar álcool.",
    faqQ4: "O que é um vinho laranja?",
    faqA4: "Um vinho feito de uvas brancas mas fermentado com suas cascas como um tinto. O resultado é um vinho de cor âmbar/laranja com taninos e complexidade estrutural.",
  },
};

const faqs = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
];

const bodyLabels: Record<string, string> = {
  ligero: "bodyLigero",
  medio: "bodyMedio",
  alto: "bodyAlto",
  "muy-alto": "bodyMuyAlto",
};

const familyFilters: { key: StyleFamily | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  ...familyOrder.map(f => ({ key: f, label: familyMeta[f].emoji + " " + familyMeta[f].label })),
];

const StylesHub = () => {
  const { lang, allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<StyleFamily | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = styleEntries;
    if (familyFilter !== "all") results = results.filter(s => s.family === familyFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.mainGrapes.some(g => g.toLowerCase().includes(q)) ||
        s.keyRegions.some(r => r.toLowerCase().includes(q)) ||
        s.subtypes.some(st => st.name.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, familyFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={i18n[lang as keyof typeof i18n]?.seoTitle ?? i18n.es.seoTitle}
        description={i18n[lang as keyof typeof i18n]?.seoDescription ?? i18n.es.seoDescription}
        url="https://winerim.wine/biblioteca-vino/estilos"
        hreflang={allLangPaths("/biblioteca-vino/estilos")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: i18n[lang as keyof typeof i18n]?.breadcrumb1 ?? i18n.es.breadcrumb1, href: "/biblioteca-vino" },
            { label: i18n[lang as keyof typeof i18n]?.breadcrumb2 ?? i18n.es.breadcrumb2 },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Palette size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{i18n[lang as keyof typeof i18n]?.tag ?? i18n.es.tag}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            {i18n[lang as keyof typeof i18n]?.title ?? i18n.es.title} <span className="text-gradient-wine italic">{i18n[lang as keyof typeof i18n]?.titleSpan ?? i18n.es.titleSpan}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            {i18n[lang as keyof typeof i18n]?.description ?? i18n.es.description}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">{i18n[lang as keyof typeof i18n]?.families ?? i18n.es.families}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">{i18n[lang as keyof typeof i18n]?.subtypes ?? i18n.es.subtypes}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">{i18n[lang as keyof typeof i18n]?.commercial ?? i18n.es.commercial}</span>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={i18n[lang as keyof typeof i18n]?.searchPlaceholder ?? i18n.es.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-wine/30 transition-colors"
            >
              <Filter size={14} />
              {i18n[lang as keyof typeof i18n]?.filterButton ?? i18n.es.filterButton}
              {familyFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{familyMeta[familyFilter].label}</Badge>
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">{i18n[lang as keyof typeof i18n]?.familyLabel ?? i18n.es.familyLabel}</p>
                  {familyFilter !== "all" && (
                    <button onClick={() => setFamilyFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> {i18n[lang as keyof typeof i18n]?.clear ?? i18n.es.clear}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {familyFilters.map(f => (
                    <button
                      key={f.key}
                      onClick={() => setFamilyFilter(f.key)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        familyFilter === f.key
                          ? "bg-wine text-primary-foreground border-wine"
                          : "border-border hover:border-wine/30"
                      }`}
                    >
                      {f.key === "all" ? i18n[lang as keyof typeof i18n]?.allFamilies ?? i18n.es.allFamilies : f.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{filtered.length}{i18n[lang as keyof typeof i18n]?.styles ?? i18n.es.styles}{filtered.length !== 1 ? i18n[lang as keyof typeof i18n]?.stylesPlural ?? i18n.es.stylesPlural : ""}</p>
        </div>
      </section>

      {/* FAMILIES */}
      {familyFilter === "all" ? (
        familyOrder.map((fam, fi) => {
          const meta = familyMeta[fam];
          const entries = filtered.filter(s => s.family === fam);
          if (!entries.length) return null;
          return (
            <section key={fam} className={`section-padding ${fi % 2 === 1 ? "bg-gradient-dark" : ""}`}>
              <div className="max-w-7xl mx-auto">
                <ScrollReveal className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{meta.emoji}</span>
                    <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{meta.label}</p>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">{meta.label}</h2>
                  <p className="text-muted-foreground max-w-2xl">{meta.description}</p>
                </ScrollReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.map((entry, i) => (
                    <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} />
                  ))}
                </div>
                {/* Subtypes */}
                {entries.flatMap(e => e.subtypes).length > 0 && (
                  <ScrollReveal className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{i18n[lang as keyof typeof i18n]?.subtypesVariants ?? i18n.es.subtypesVariants}</h3>
                    <div className="flex flex-wrap gap-2">
                      {entries.flatMap(e => e.subtypes).map(sub => (
                        <Link
                          key={sub.slug}
                          to={`/biblioteca-vino/estilos/${sub.slug}`}
                          className="text-xs bg-wine/5 hover:bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </section>
          );
        })
      ) : (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((entry, i) => (
                <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  {i18n[lang as keyof typeof i18n]?.ctaTitle ?? i18n.es.ctaTitle} <span className="text-gradient-wine italic">{i18n[lang as keyof typeof i18n]?.ctaSpan ?? i18n.es.ctaSpan}</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {i18n[lang as keyof typeof i18n]?.ctaDesc ?? i18n.es.ctaDesc}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                    {i18n[lang as keyof typeof i18n]?.ctaButton1 ?? i18n.es.ctaButton1} <ArrowRight size={16} />
                  </Link>
                  <Link to="/biblioteca-vino" className="inline-flex items-center justify-center gap-2 border border-wine/30 text-wine px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-wine/5 transition-all">
                    {i18n[lang as keyof typeof i18n]?.ctaButton2 ?? i18n.es.ctaButton2}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{i18n[lang as keyof typeof i18n]?.faqsTitle ?? i18n.es.faqsTitle}</h2>
          </ScrollReveal>
          <FAQSection faqs={faqs.map(f => ({
            q: i18n[lang as keyof typeof i18n]?.[f.q as keyof typeof i18n.es] ?? i18n.es[f.q as keyof typeof i18n.es],
            a: i18n[lang as keyof typeof i18n]?.[f.a as keyof typeof i18n.es] ?? i18n.es[f.a as keyof typeof i18n.es],
          }))} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Card component ─── */
const StyleCard = ({ entry, delay }: { entry: StyleEntry; delay: number }) => {
  const { lang } = useLanguage();
  return (
  <ScrollReveal delay={delay}>
    <Link
      to={`/biblioteca-vino/estilos/${entry.slug}`}
      className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{familyMeta[entry.family].emoji}</span>
          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">{entry.name}</h3>
        </div>
        <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.servingTemp}</span>
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{i18n[lang as keyof typeof i18n]?.[bodyLabels[entry.body] as keyof typeof i18n.es] ?? i18n.es[bodyLabels[entry.body] as keyof typeof i18n.es]} cuerpo</span>
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.subtypes.length} subtipos</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {entry.mainGrapes.slice(0, 3).map(g => (
          <span key={g} className="text-xs text-muted-foreground">{g}</span>
        ))}
        {entry.mainGrapes.length > 3 && <span className="text-xs text-muted-foreground">+{entry.mainGrapes.length - 3}</span>}
      </div>
    </Link>
  </ScrollReveal>
  );
};

export default StylesHub;
