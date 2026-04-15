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
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";

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

interface Tip {
  icon: typeof Layers;
  title: string;
  points: string[];
}

const i18n: I18nMap<{
  metaTitle: string;
  metaDescription: string;
  url: string;
  breadcrumbParent: string;
  breadcrumbCurrent: string;
  badge: string;
  h1pre: string;
  h1accent: string;
  subtitle: string;
  structureLabel: string;
  tipsTag: string;
  tipsH2pre: string;
  tipsH2accent: string;
  ctaTag: string;
  ctaH2pre: string;
  ctaH2accent: string;
  ctaDesc: string;
  ctaBtn: string;
  examples: CardExample[];
  tips: Tip[];
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
  faqData: { q: string; a: string }[];
}> = {
  es: {
    metaTitle: "Ejemplos de Carta de Vinos para Restaurantes | Modelos y Plantillas",
    metaDescription: "Ejemplos reales de cartas de vinos bien estructuradas para restaurante pequeño, wine bar y restaurante gastronómico.",
    url: "https://winerim.wine/ejemplos-carta-vinos",
    breadcrumbParent: "Guías", breadcrumbCurrent: "Ejemplos de carta de vinos",
    badge: "Plantillas y modelos",
    h1pre: "Ejemplos de carta de vinos para", h1accent: "restaurantes",
    subtitle: "Modelos de cartas bien estructuradas para diferentes tipos de restaurante. Aprende cómo organizar, diseñar y optimizar tu carta de vinos.",
    structureLabel: "Estructura recomendada",
    tipsTag: "Guía práctica",
    tipsH2pre: "Claves para diseñar una carta de vinos", tipsH2accent: "efectiva",
    ctaTag: "Análisis gratuito",
    ctaH2pre: "¿Tu carta está bien", ctaH2accent: "estructurada",
    ctaDesc: "Envíanos tu carta de vinos y te mostramos cómo mejorar su estructura, precios y categorías. Sin compromiso.",
    ctaBtn: "Analizar mi carta de vinos",
    examples: [
      {
        icon: Store, title: "Restaurante pequeño", type: "Bistró / Taberna gastronómica", references: "15 – 25 referencias",
        description: "Una carta compacta y bien curada donde cada vino tiene un propósito claro. Fácil de gestionar, fácil de recomendar y fácil de entender para el cliente.",
        structure: ["Agrupar por tipo (blancos, tintos, rosados)", "Incluir 3-5 vinos por copa", "Destacar 1 recomendación por categoría", "Escalera de precios sin huecos"],
        priceRange: "18 € – 45 €",
        sections: [
          { category: "Blancos", wines: [{ name: "Albariño Pazo Señorans", origin: "Rías Baixas", price: "24 €" }, { name: "Verdejo Menade", origin: "Rueda", price: "20 €" }, { name: "Godello Guímaro", origin: "Valdeorras", price: "28 €" }] },
          { category: "Tintos", wines: [{ name: "Crianza Muga", origin: "Rioja", price: "26 €" }, { name: "Mencía Descendientes de J. Palacios", origin: "Bierzo", price: "32 €" }, { name: "Garnacha Comando G", origin: "Sierra de Gredos", price: "38 €" }] },
        ],
      },
      {
        icon: Wine, title: "Wine bar", type: "Bar de vinos especializado", references: "40 – 60 referencias",
        description: "Carta más amplia organizada por estilo y perfil sensorial, no solo por tipo. Ideal para clientes exploradores que quieren descubrir vinos diferentes.",
        structure: ["Organizar por estilo (frescos, estructurados, dulces)", "Sección dedicada de vinos por copa (8-12)", "Incluir vinos naturales y de autor", "Añadir notas de cata breves"],
        priceRange: "20 € – 70 €",
        sections: [
          { category: "Frescos y ligeros", wines: [{ name: "Txakoli Ameztoi", origin: "Getariako Txakolina", price: "22 €" }, { name: "Muscadet Sèvre et Maine", origin: "Valle del Loira", price: "24 €" }, { name: "Grüner Veltliner Loimer", origin: "Kamptal, Austria", price: "28 €" }] },
          { category: "Con carácter", wines: [{ name: "Nebbiolo Langhe Produttori", origin: "Piamonte", price: "34 €" }, { name: "Syrah Alain Graillot", origin: "Crozes-Hermitage", price: "42 €" }, { name: "Garnacha vieja Alfredo Maestro", origin: "Calatayud", price: "30 €" }] },
          { category: "Espumosos", wines: [{ name: "Cava Recaredo Brut Nature", origin: "Penedès", price: "32 €" }, { name: "Champagne Pierre Gimonnet", origin: "Champagne", price: "52 €" }] },
        ],
      },
      {
        icon: Star, title: "Restaurante gastronómico", type: "Alta cocina / Fine dining", references: "80 – 200+ referencias",
        description: "Carta extensa organizada por regiones y subregiones, con secciones premium y selección del sommelier.",
        structure: ["Organizar por región principal y subapartados", "Sección 'Selección del sommelier' destacada", "Incluir formatos grandes (Magnum)", "Maridajes sugeridos con menú degustación", "Vinos por copa premium (10-15 referencias)"],
        priceRange: "25 € – 300 €+",
        sections: [
          { category: "España – Blancos", wines: [{ name: "Albariño Do Ferreiro Cepas Vellas", origin: "Rías Baixas", price: "48 €" }, { name: "Viura Remelluri Blanco", origin: "Rioja", price: "42 €" }, { name: "Xarel·lo Recaredo Serral del Vell", origin: "Penedès", price: "65 €" }] },
          { category: "Francia – Tintos", wines: [{ name: "Châteauneuf-du-Pape E. Guigal", origin: "Ródano Sur", price: "68 €" }, { name: "Gevrey-Chambertin Dugat-Py", origin: "Borgoña", price: "120 €" }, { name: "Margaux Château Palmer", origin: "Burdeos", price: "195 €" }] },
          { category: "Selección del sommelier", wines: [{ name: "Pingus", origin: "Ribera del Duero", price: "280 €" }, { name: "Vega Sicilia Único", origin: "Ribera del Duero", price: "250 €" }, { name: "Clos Mogador", origin: "Priorat", price: "85 €" }] },
        ],
      },
    ],
    tips: [
      { icon: Layers, title: "Cómo organizar los vinos", points: ["Agrupar por tipo (blanco, tinto, rosado, espumoso) en cartas pequeñas", "Agrupar por región o estilo en cartas amplias y complejas", "Separar la sección de vinos por copa", "Incluir una categoría destacada (recomendaciones, selección del chef)"] },
      { icon: TrendingUp, title: "Cómo distribuir los precios", points: ["Crear una escalera progresiva sin saltos bruscos", "Concentrar el mayor número de referencias en la zona media", "Usar multiplicadores decrecientes (mayor margen en vinos de entrada)", "Evitar huecos de más de 10 € entre referencias consecutivas"] },
      { icon: BarChart3, title: "Cómo estructurar las categorías", points: ["Cada categoría debe tener al menos 3 opciones", "No mezclar criterios (tipo + región) en el mismo nivel", "Colocar los vinos recomendados en posición destacada", "Asegurar variedad de estilos dentro de cada categoría"] },
    ],
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
      { to: "/como-hacer-una-carta-de-vinos", label: "Cómo hacer una carta de vinos", type: "guide" },
      { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", type: "resource" },
      { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
    ],
    faqData: [
      { q: "¿Cuántas referencias debe tener una carta de vinos?", a: "Depende del tipo de restaurante: 15-25 para un bistró, 40-60 para un wine bar y 80-150 para un restaurante gastronómico. Lo importante es que cada referencia tenga un propósito claro." },
      { q: "¿Cómo se organiza una carta de vinos?", a: "Las cartas pequeñas se organizan por tipo (blanco, tinto, rosado). Las cartas amplias y complejas se organizan por región o estilo. Siempre conviene separar los vinos por copa y destacar recomendaciones." },
      { q: "¿Cómo se distribuyen los precios en una carta de vinos?", a: "Con una escalera progresiva sin huecos, concentrando referencias en la zona media de precio y usando multiplicadores decrecientes para que los vinos premium mantengan precios competitivos." },
    ],
  },
  en: {
    metaTitle: "Wine List Examples for Restaurants | Models & Templates",
    metaDescription: "Real examples of well-structured wine lists for small restaurants, wine bars and fine dining.",
    url: "https://winerim.wine/en/wine-list-examples",
    breadcrumbParent: "Guides", breadcrumbCurrent: "Wine list examples",
    badge: "Templates & models",
    h1pre: "Wine list examples for", h1accent: "restaurants",
    subtitle: "Well-structured list models for different restaurant types. Learn how to organize, design and optimize your wine list.",
    structureLabel: "Recommended structure",
    tipsTag: "Practical guide",
    tipsH2pre: "Keys to designing an", tipsH2accent: "effective wine list",
    ctaTag: "Free analysis",
    ctaH2pre: "Is your list well", ctaH2accent: "structured",
    ctaDesc: "Send us your wine list and we'll show you how to improve its structure, pricing and categories. No commitment.",
    ctaBtn: "Analyze my wine list",
    examples: [
      {
        icon: Store, title: "Small restaurant", type: "Bistro / Gastropub", references: "15 – 25 references",
        description: "A compact, well-curated list where every wine has a clear purpose. Easy to manage, easy to recommend and easy for the guest to understand.",
        structure: ["Group by type (whites, reds, rosés)", "Include 3-5 by-the-glass wines", "Highlight 1 recommendation per category", "Price ladder without gaps"],
        priceRange: "€18 – €45",
        sections: [
          { category: "Whites", wines: [{ name: "Albariño Pazo Señorans", origin: "Rías Baixas", price: "€24" }, { name: "Verdejo Menade", origin: "Rueda", price: "€20" }, { name: "Godello Guímaro", origin: "Valdeorras", price: "€28" }] },
          { category: "Reds", wines: [{ name: "Crianza Muga", origin: "Rioja", price: "€26" }, { name: "Mencía Descendientes de J. Palacios", origin: "Bierzo", price: "€32" }, { name: "Garnacha Comando G", origin: "Sierra de Gredos", price: "€38" }] },
        ],
      },
      {
        icon: Wine, title: "Wine bar", type: "Specialist wine bar", references: "40 – 60 references",
        description: "A broader list organized by style and sensory profile, not just by type. Ideal for explorers who want to discover different wines.",
        structure: ["Organize by style (fresh, structured, sweet)", "Dedicated by-the-glass section (8-12)", "Include natural and artisan wines", "Add brief tasting notes"],
        priceRange: "€20 – €70",
        sections: [
          { category: "Fresh & light", wines: [{ name: "Txakoli Ameztoi", origin: "Getariako Txakolina", price: "€22" }, { name: "Muscadet Sèvre et Maine", origin: "Loire Valley", price: "€24" }, { name: "Grüner Veltliner Loimer", origin: "Kamptal, Austria", price: "€28" }] },
          { category: "Full of character", wines: [{ name: "Nebbiolo Langhe Produttori", origin: "Piedmont", price: "€34" }, { name: "Syrah Alain Graillot", origin: "Crozes-Hermitage", price: "€42" }, { name: "Old-vine Garnacha Alfredo Maestro", origin: "Calatayud", price: "€30" }] },
          { category: "Sparkling", wines: [{ name: "Cava Recaredo Brut Nature", origin: "Penedès", price: "€32" }, { name: "Champagne Pierre Gimonnet", origin: "Champagne", price: "€52" }] },
        ],
      },
      {
        icon: Star, title: "Fine dining restaurant", type: "Haute cuisine / Fine dining", references: "80 – 200+ references",
        description: "An extensive list organized by regions and sub-regions, with premium sections and sommelier selection. Designed to offer a complete discovery experience.",
        structure: ["Organize by main region and sub-sections", "Featured 'Sommelier's Selection' section", "Include large formats (Magnum)", "Suggested pairings with tasting menu", "Premium by-the-glass (10-15 references)"],
        priceRange: "€25 – €300+",
        sections: [
          { category: "Spain – Whites", wines: [{ name: "Albariño Do Ferreiro Cepas Vellas", origin: "Rías Baixas", price: "€48" }, { name: "Viura Remelluri Blanco", origin: "Rioja", price: "€42" }, { name: "Xarel·lo Recaredo Serral del Vell", origin: "Penedès", price: "€65" }] },
          { category: "France – Reds", wines: [{ name: "Châteauneuf-du-Pape E. Guigal", origin: "Southern Rhône", price: "€68" }, { name: "Gevrey-Chambertin Dugat-Py", origin: "Burgundy", price: "€120" }, { name: "Margaux Château Palmer", origin: "Bordeaux", price: "€195" }] },
          { category: "Sommelier's selection", wines: [{ name: "Pingus", origin: "Ribera del Duero", price: "€280" }, { name: "Vega Sicilia Único", origin: "Ribera del Duero", price: "€250" }, { name: "Clos Mogador", origin: "Priorat", price: "€85" }] },
        ],
      },
    ],
    tips: [
      { icon: Layers, title: "How to organize wines", points: ["Group by type (white, red, rosé, sparkling) in small lists", "Group by region or style in large, complex lists", "Separate the by-the-glass section", "Include a featured category (recommendations, chef's selection)"] },
      { icon: TrendingUp, title: "How to distribute prices", points: ["Create a progressive ladder without sharp jumps", "Concentrate the most references in the mid-range", "Use decreasing multipliers (higher margin on entry wines)", "Avoid gaps of more than €10 between consecutive references"] },
      { icon: BarChart3, title: "How to structure categories", points: ["Each category should have at least 3 options", "Don't mix criteria (type + region) at the same level", "Place recommended wines in prominent positions", "Ensure style variety within each category"] },
    ],
    links: [
      { to: "/en/how-to-organize-wine-list", label: "How to organize a wine list", type: "guide" },
      { to: "/en/how-to-create-wine-list", label: "How to create a wine list", type: "guide" },
      { to: "/en/resources/wine-list-template", label: "Wine list template", type: "resource" },
      { to: "/en/wine-list-analyzer", label: "Wine list analyzer", type: "tool" },
    ],
    faqData: [
      { q: "How many references should a wine list have?", a: "It depends on the restaurant type: 15-25 for a bistro, 40-60 for a wine bar and 80-150 for a fine dining restaurant. What matters is that each reference has a clear purpose." },
      { q: "How is a wine list organized?", a: "Small lists are organized by type (white, red, rosé). Large, complex lists are organized by region or style. It's always best to separate by-the-glass wines and highlight recommendations." },
      { q: "How are prices distributed on a wine list?", a: "With a progressive ladder without gaps, concentrating references in the mid-price range and using decreasing multipliers so premium wines maintain competitive prices." },
    ],
  },
  it: {
    metaTitle: "Esempi di Carta dei Vini per Ristoranti | Modelli e Template",
    metaDescription: "Esempi reali di carte dei vini ben strutturate per ristorante piccolo, wine bar e ristorante gastronomico.",
    url: "https://winerim.wine/it/esempi-carta-vini",
    breadcrumbParent: "Guide", breadcrumbCurrent: "Esempi di carta dei vini",
    badge: "Modelli e template",
    h1pre: "Esempi di carta dei vini per", h1accent: "ristoranti",
    subtitle: "Modelli di carte ben strutturate per diversi tipi di ristorante. Scopri come organizzare, progettare e ottimizzare la tua carta dei vini.",
    structureLabel: "Struttura raccomandata",
    tipsTag: "Guida pratica",
    tipsH2pre: "Chiavi per progettare una carta dei vini", tipsH2accent: "efficace",
    ctaTag: "Analisi gratuita",
    ctaH2pre: "La tua carta è ben", ctaH2accent: "strutturata",
    ctaDesc: "Inviaci la tua carta dei vini e ti mostriamo come migliorarne struttura, prezzi e categorie. Senza impegno.",
    ctaBtn: "Analizza la mia carta dei vini",
    examples: [
      {
        icon: Store, title: "Ristorante piccolo", type: "Bistrot / Trattoria gastronomica", references: "15 – 25 referenze",
        description: "Una carta compatta e ben curata dove ogni vino ha uno scopo chiaro. Facile da gestire, da raccomandare e da capire per il cliente.",
        structure: ["Raggruppare per tipo (bianchi, rossi, rosati)", "Includere 3-5 vini al calice", "Evidenziare 1 raccomandazione per categoria", "Scala di prezzi senza lacune"],
        priceRange: "18 € – 45 €",
        sections: [
          { category: "Bianchi", wines: [{ name: "Albariño Pazo Señorans", origin: "Rías Baixas", price: "24 €" }, { name: "Verdejo Menade", origin: "Rueda", price: "20 €" }, { name: "Godello Guímaro", origin: "Valdeorras", price: "28 €" }] },
          { category: "Rossi", wines: [{ name: "Crianza Muga", origin: "Rioja", price: "26 €" }, { name: "Mencía Descendientes de J. Palacios", origin: "Bierzo", price: "32 €" }, { name: "Garnacha Comando G", origin: "Sierra de Gredos", price: "38 €" }] },
        ],
      },
      {
        icon: Wine, title: "Wine bar", type: "Enoteca specializzata", references: "40 – 60 referenze",
        description: "Carta più ampia organizzata per stile e profilo sensoriale, non solo per tipo. Ideale per clienti esploratori che vogliono scoprire vini diversi.",
        structure: ["Organizzare per stile (freschi, strutturati, dolci)", "Sezione dedicata vini al calice (8-12)", "Includere vini naturali e d'autore", "Aggiungere brevi note di degustazione"],
        priceRange: "20 € – 70 €",
        sections: [
          { category: "Freschi e leggeri", wines: [{ name: "Txakoli Ameztoi", origin: "Getariako Txakolina", price: "22 €" }, { name: "Muscadet Sèvre et Maine", origin: "Valle della Loira", price: "24 €" }, { name: "Grüner Veltliner Loimer", origin: "Kamptal, Austria", price: "28 €" }] },
          { category: "Di carattere", wines: [{ name: "Nebbiolo Langhe Produttori", origin: "Piemonte", price: "34 €" }, { name: "Syrah Alain Graillot", origin: "Crozes-Hermitage", price: "42 €" }, { name: "Garnacha vecchia Alfredo Maestro", origin: "Calatayud", price: "30 €" }] },
          { category: "Spumanti", wines: [{ name: "Cava Recaredo Brut Nature", origin: "Penedès", price: "32 €" }, { name: "Champagne Pierre Gimonnet", origin: "Champagne", price: "52 €" }] },
        ],
      },
      {
        icon: Star, title: "Ristorante gastronomico", type: "Alta cucina / Fine dining", references: "80 – 200+ referenze",
        description: "Carta ampia organizzata per regioni e sottoregioni, con sezioni premium e selezione del sommelier. Progettata per offrire un'esperienza completa di scoperta.",
        structure: ["Organizzare per regione principale e sottosezioni", "Sezione 'Selezione del sommelier' in evidenza", "Includere formati grandi (Magnum)", "Abbinamenti suggeriti con menu degustazione", "Vini al calice premium (10-15 referenze)"],
        priceRange: "25 € – 300 €+",
        sections: [
          { category: "Spagna – Bianchi", wines: [{ name: "Albariño Do Ferreiro Cepas Vellas", origin: "Rías Baixas", price: "48 €" }, { name: "Viura Remelluri Blanco", origin: "Rioja", price: "42 €" }, { name: "Xarel·lo Recaredo Serral del Vell", origin: "Penedès", price: "65 €" }] },
          { category: "Francia – Rossi", wines: [{ name: "Châteauneuf-du-Pape E. Guigal", origin: "Rodano Sud", price: "68 €" }, { name: "Gevrey-Chambertin Dugat-Py", origin: "Borgogna", price: "120 €" }, { name: "Margaux Château Palmer", origin: "Bordeaux", price: "195 €" }] },
          { category: "Selezione del sommelier", wines: [{ name: "Pingus", origin: "Ribera del Duero", price: "280 €" }, { name: "Vega Sicilia Único", origin: "Ribera del Duero", price: "250 €" }, { name: "Clos Mogador", origin: "Priorat", price: "85 €" }] },
        ],
      },
    ],
    tips: [
      { icon: Layers, title: "Come organizzare i vini", points: ["Raggruppare per tipo (bianco, rosso, rosato, spumante) nelle carte piccole", "Raggruppare per regione o stile nelle carte ampie e complesse", "Separare la sezione vini al calice", "Includere una categoria in evidenza (raccomandazioni, selezione dello chef)"] },
      { icon: TrendingUp, title: "Come distribuire i prezzi", points: ["Creare una scala progressiva senza salti bruschi", "Concentrare il maggior numero di referenze nella fascia media", "Usare moltiplicatori decrescenti (margine maggiore sui vini d'ingresso)", "Evitare lacune di più di 10 € tra referenze consecutive"] },
      { icon: BarChart3, title: "Come strutturare le categorie", points: ["Ogni categoria deve avere almeno 3 opzioni", "Non mescolare criteri (tipo + regione) allo stesso livello", "Posizionare i vini raccomandati in posizione prominente", "Assicurare varietà di stili all'interno di ogni categoria"] },
    ],
    links: [
      { to: "/it/come-organizzare-carta-vini", label: "Come organizzare una carta dei vini", type: "guide" },
      { to: "/it/come-creare-carta-vini", label: "Come creare una carta dei vini", type: "guide" },
      { to: "/it/risorse/modello-carta-vini", label: "Modello carta dei vini", type: "resource" },
      { to: "/it/analizzatore-carta-vini", label: "Analizzatore carta dei vini", type: "tool" },
    ],
    faqData: [
      { q: "Quante referenze deve avere una carta dei vini?", a: "Dipende dal tipo di ristorante: 15-25 per un bistrot, 40-60 per un wine bar e 80-150 per un ristorante gastronomico. L'importante è che ogni referenza abbia uno scopo chiaro." },
      { q: "Come si organizza una carta dei vini?", a: "Le carte piccole si organizzano per tipo (bianco, rosso, rosato). Le carte ampie e complesse si organizzano per regione o stile. È sempre consigliabile separare i vini al calice e evidenziare le raccomandazioni." },
      { q: "Come si distribuiscono i prezzi in una carta dei vini?", a: "Con una scala progressiva senza lacune, concentrando le referenze nella fascia media di prezzo e usando moltiplicatori decrescenti per mantenere competitivi i vini premium." },
    ],
  },
  fr: {
    metaTitle: "Exemples de Carte des Vins pour Restaurants | Modèles et Templates",
    metaDescription: "Exemples réels de cartes des vins bien structurées pour petit restaurant, bar à vins et restaurant gastronomique.",
    url: "https://winerim.wine/fr/exemples-carte-des-vins",
    breadcrumbParent: "Guides", breadcrumbCurrent: "Exemples de carte des vins",
    badge: "Modèles et templates",
    h1pre: "Exemples de carte des vins pour", h1accent: "restaurants",
    subtitle: "Modèles de cartes bien structurées pour différents types de restaurant. Apprenez à organiser, concevoir et optimiser votre carte des vins.",
    structureLabel: "Structure recommandée",
    tipsTag: "Guide pratique",
    tipsH2pre: "Clés pour concevoir une carte des vins", tipsH2accent: "efficace",
    ctaTag: "Analyse gratuite",
    ctaH2pre: "Votre carte est-elle bien", ctaH2accent: "structurée",
    ctaDesc: "Envoyez-nous votre carte des vins et nous vous montrons comment améliorer sa structure, ses prix et ses catégories. Sans engagement.",
    ctaBtn: "Analyser ma carte des vins",
    examples: [
      {
        icon: Store, title: "Petit restaurant", type: "Bistrot / Taverne gastronomique", references: "15 – 25 références",
        description: "Une carte compacte et bien élaborée où chaque vin a un objectif clair. Facile à gérer, facile à recommander et facile à comprendre pour le client.",
        structure: ["Regrouper par type (blancs, rouges, rosés)", "Inclure 3-5 vins au verre", "Mettre en avant 1 recommandation par catégorie", "Échelle de prix sans lacunes"],
        priceRange: "18 € – 45 €",
        sections: [
          { category: "Blancs", wines: [{ name: "Albariño Pazo Señorans", origin: "Rías Baixas", price: "24 €" }, { name: "Verdejo Menade", origin: "Rueda", price: "20 €" }, { name: "Godello Guímaro", origin: "Valdeorras", price: "28 €" }] },
          { category: "Rouges", wines: [{ name: "Crianza Muga", origin: "Rioja", price: "26 €" }, { name: "Mencía Descendientes de J. Palacios", origin: "Bierzo", price: "32 €" }, { name: "Garnacha Comando G", origin: "Sierra de Gredos", price: "38 €" }] },
        ],
      },
      {
        icon: Wine, title: "Bar à vins", type: "Bar à vins spécialisé", references: "40 – 60 références",
        description: "Carte plus large organisée par style et profil sensoriel, pas seulement par type. Idéale pour les clients explorateurs qui veulent découvrir des vins.",
        structure: ["Organiser par style (frais, structurés, doux)", "Section dédiée vins au verre (8-12)", "Inclure des vins nature et d'auteur", "Ajouter de brèves notes de dégustation"],
        priceRange: "20 € – 70 €",
        sections: [
          { category: "Frais et légers", wines: [{ name: "Txakoli Ameztoi", origin: "Getariako Txakolina", price: "22 €" }, { name: "Muscadet Sèvre et Maine", origin: "Vallée de la Loire", price: "24 €" }, { name: "Grüner Veltliner Loimer", origin: "Kamptal, Autriche", price: "28 €" }] },
          { category: "De caractère", wines: [{ name: "Nebbiolo Langhe Produttori", origin: "Piémont", price: "34 €" }, { name: "Syrah Alain Graillot", origin: "Crozes-Hermitage", price: "42 €" }, { name: "Vieille Garnacha Alfredo Maestro", origin: "Calatayud", price: "30 €" }] },
          { category: "Effervescents", wines: [{ name: "Cava Recaredo Brut Nature", origin: "Penedès", price: "32 €" }, { name: "Champagne Pierre Gimonnet", origin: "Champagne", price: "52 €" }] },
        ],
      },
      {
        icon: Star, title: "Restaurant gastronomique", type: "Haute cuisine / Fine dining", references: "80 – 200+ références",
        description: "Carte étendue organisée par régions et sous-régions, avec sections premium et sélection du sommelier.",
        structure: ["Organiser par région principale et sous-sections", "Section 'Sélection du sommelier' mise en avant", "Inclure des grands formats (Magnum)", "Accords suggérés avec le menu dégustation", "Vins au verre premium (10-15 références)"],
        priceRange: "25 € – 300 €+",
        sections: [
          { category: "Espagne – Blancs", wines: [{ name: "Albariño Do Ferreiro Cepas Vellas", origin: "Rías Baixas", price: "48 €" }, { name: "Viura Remelluri Blanco", origin: "Rioja", price: "42 €" }, { name: "Xarel·lo Recaredo Serral del Vell", origin: "Penedès", price: "65 €" }] },
          { category: "France – Rouges", wines: [{ name: "Châteauneuf-du-Pape E. Guigal", origin: "Rhône Sud", price: "68 €" }, { name: "Gevrey-Chambertin Dugat-Py", origin: "Bourgogne", price: "120 €" }, { name: "Margaux Château Palmer", origin: "Bordeaux", price: "195 €" }] },
          { category: "Sélection du sommelier", wines: [{ name: "Pingus", origin: "Ribera del Duero", price: "280 €" }, { name: "Vega Sicilia Único", origin: "Ribera del Duero", price: "250 €" }, { name: "Clos Mogador", origin: "Priorat", price: "85 €" }] },
        ],
      },
    ],
    tips: [
      { icon: Layers, title: "Comment organiser les vins", points: ["Regrouper par type (blanc, rouge, rosé, effervescent) dans les petites cartes", "Regrouper par région ou style dans les cartes larges et complexes", "Séparer la section vins au verre", "Inclure une catégorie mise en avant (recommandations, sélection du chef)"] },
      { icon: TrendingUp, title: "Comment distribuer les prix", points: ["Créer une échelle progressive sans sauts brusques", "Concentrer le plus de références dans la gamme moyenne", "Utiliser des multiplicateurs décroissants (marge plus élevée sur les vins d'entrée)", "Éviter les écarts de plus de 10 € entre références consécutives"] },
      { icon: BarChart3, title: "Comment structurer les catégories", points: ["Chaque catégorie doit avoir au moins 3 options", "Ne pas mélanger les critères (type + région) au même niveau", "Placer les vins recommandés en position proéminente", "Assurer une variété de styles au sein de chaque catégorie"] },
    ],
    links: [
      { to: "/fr/comment-organiser-carte-des-vins", label: "Comment organiser une carte des vins", type: "guide" },
      { to: "/fr/comment-creer-carte-des-vins", label: "Comment créer une carte des vins", type: "guide" },
      { to: "/fr/ressources/modele-carte-des-vins", label: "Modèle de carte des vins", type: "resource" },
      { to: "/fr/analyseur-carte-des-vins", label: "Analyseur de carte des vins", type: "tool" },
    ],
    faqData: [
      { q: "Combien de références doit avoir une carte des vins ?", a: "Cela dépend du type de restaurant : 15-25 pour un bistrot, 40-60 pour un bar à vins et 80-150 pour un restaurant gastronomique. L'important est que chaque référence ait un objectif clair." },
      { q: "Comment organise-t-on une carte des vins ?", a: "Les petites cartes s'organisent par type (blanc, rouge, rosé). Les cartes larges et complexes s'organisent par région ou style. Il est toujours conseillé de séparer les vins au verre et de mettre en avant les recommandations." },
      { q: "Comment distribue-t-on les prix sur une carte des vins ?", a: "Avec une échelle progressive sans lacunes, en concentrant les références dans la gamme moyenne de prix et en utilisant des multiplicateurs décroissants pour que les vins premium restent à des prix compétitifs." },
    ],
  },
};

const EjemplosCarta = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = i18n[lang];

  useEffect(() => {
    const faq = document.createElement("script");
    faq.id = "ejemplos-faq-jsonld";
    faq.type = "application/ld+json";
    faq.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqData.map(f => ({
        "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
        { "@type": "ListItem", position: 2, name: t.breadcrumbCurrent, item: t.url },
      ],
    });
    document.head.appendChild(bc);

    return () => {
      document.getElementById("ejemplos-faq-jsonld")?.remove();
      document.getElementById("ejemplos-breadcrumb-jsonld")?.remove();
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url}
        hreflang={allLangPaths("/ejemplos-carta-vinos")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadcrumbParent, href: "/guias-y-recursos" }, { label: t.breadcrumbCurrent }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1pre}{" "}<span className="text-gradient-wine italic">{t.h1accent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* EXAMPLES */}
      {t.examples.map((ex, idx) => {
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
                <ScrollReveal delay={0.1}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                      <Layers size={16} className="text-wine" />
                      {t.structureLabel}
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
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.tipsTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.tipsH2pre} <span className="text-gradient-wine italic">{t.tipsH2accent}</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {t.tips.map((tip, i) => {
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaTag}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaH2pre} <span className="text-gradient-wine italic">{t.ctaH2accent}</span>?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link
                to="/analisis-carta"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                {t.ctaBtn}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default EjemplosCarta;
