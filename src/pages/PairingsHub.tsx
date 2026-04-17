import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Utensils, Search, ArrowRight, Filter, X } from "lucide-react";
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
  pairingEntries,
  categoryMeta,
  categoryOrder,
  type PairingCategory,
  type PairingEntry,
} from "@/data/pairingsLibrary";

const i18n = {
  es: {
    seoTitle: "Maridajes: Guía Completa Vino + Plato para Hostelería | Winerim",
    seoDescription: "Guía de maridaje: 10 categorías, 80+ combinaciones plato+vino. Principios, errores y lectura comercial para restaurantes y equipos de sala.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Maridajes",
    tag: "Maridajes",
    categories: "10 categorías",
    combinations: "80+ combinaciones",
    commercial: "Capa Winerim comercial",
    title: "Guía de",
    titleSpan: "maridajes",
    description: "10 categorías gastronómicas, más de 80 combinaciones plato + vino. Cada maridaje con principios, errores frecuentes y lectura comercial para hostelería.",
    searchPlaceholder: "Buscar plato, uva o región…",
    filterButton: "Filtros",
    categoryLabel: "Categoría gastronómica",
    allCategories: "Todas",
    clear: "Limpiar",
    categoryCount: " categoría",
    categoryCountPlural: "s",
    pairingResults: " de maridaje",
    principles: "Principios universales de maridaje",
    principles1: "Intensidad = Intensidad",
    principlesDesc1: "Un plato intenso pide un vino intenso. Un plato delicado, un vino delicado. El equilibrio es la base.",
    principles2: "La grasa pide acidez",
    principlesDesc2: "La acidez del vino limpia el paladar de grasa. Tintos con buena acidez, blancos frescos o espumosos.",
    principles3: "La salsa manda",
    principlesDesc3: "En muchos platos, la salsa define el maridaje más que el ingrediente principal.",
    principles4: "Dulce ≥ Dulce",
    principlesDesc4: "El vino debe ser siempre al menos tan dulce como el postre. Si no, parecerá ácido.",
    principles5: "Regional = Regional",
    principlesDesc5: "El vino local suele funcionar con la comida local. El terroir compartido crea armonía natural.",
    principles6: "Afinidad o contraste",
    principlesDesc6: "Dos caminos: que vino y plato compartan sabores (afinidad) o que se equilibren por oposición (contraste).",
    ctaTitle: "¿Quieres que tu carta sugiera",
    ctaSpan: "maridajes",
    ctaDesc: "Winerim conecta carta de vinos con platos y maridajes, ayudando a tu equipo a recomendar mejor y a tus clientes a elegir con criterio.",
    ctaButton1: "Solicitar demo",
    ctaButton2: "Explorar Biblioteca",
    faqsTitle: "Preguntas frecuentes",
    intensitySuave: "Suave",
    intensitiaMedia: "Media",
    intensitaIntensa: "Intensa",
    intensitaMuyIntensa: "Muy intensa",
    platosCount: " platos",
    faqQ1: "¿Cuántas categorías de maridaje cubre Winerim?",
    faqA1: "Winerim organiza los maridajes en 10 grandes categorías gastronómicas: carnes rojas, aves y caza, pescados y mariscos, quesos, pasta/arroces/legumbres, verduras, embutidos, postres, cocina asiática y tapas. Cada una con principios, combinaciones y lectura comercial.",
    faqQ2: "¿El maridaje tiene reglas fijas?",
    faqA2: "No hay reglas absolutas, pero sí principios que funcionan. La intensidad del plato debe equilibrarse con la del vino. La grasa pide acidez o taninos. El picante pide dulzura residual. Las salsas suelen importar más que el ingrediente principal.",
    faqQ3: "¿Por qué importa el maridaje para un restaurante?",
    faqA3: "Un buen maridaje mejora la experiencia del comensal, facilita la venta de vino, sube el ticket medio y genera percepción de profesionalidad. Es una de las palancas comerciales más directas.",
    faqQ4: "¿Un rosado sirve para todo?",
    faqA4: "El rosado es uno de los vinos más versátiles para maridaje. Funciona con ensaladas, tapas, cocina mediterránea, asiática y muchos platos ligeros. Es un gran comodín, pero no cubre todo el espectro.",
  },
  en: {
    seoTitle: "Food Pairings: Complete Wine + Dish Guide for Hospitality | Winerim",
    seoDescription: "Pairing guide: 10 categories, 80+ dish+wine combinations. Principles, mistakes and commercial reading for restaurants and service teams.",
    breadcrumb1: "Wine Library",
    breadcrumb2: "Pairings",
    tag: "Pairings",
    categories: "10 categories",
    combinations: "80+ combinations",
    commercial: "Winerim commercial layer",
    title: "Pairing",
    titleSpan: "guide",
    description: "10 gastronomic categories, over 80 dish + wine combinations. Each pairing with principles, common mistakes and commercial reading for hospitality.",
    searchPlaceholder: "Search dish, grape or region...",
    filterButton: "Filters",
    categoryLabel: "Gastronomic category",
    allCategories: "All",
    clear: "Clear",
    categoryCount: " category",
    categoryCountPlural: "",
    pairingResults: " of pairing",
    principles: "Universal pairing principles",
    principles1: "Intensity = Intensity",
    principlesDesc1: "An intense dish requires an intense wine. A delicate dish, a delicate wine. Balance is key.",
    principles2: "Fat asks for acidity",
    principlesDesc2: "The acidity of the wine cleanses the palate of fat. Reds with good acidity, fresh whites or sparkling.",
    principles3: "The sauce rules",
    principlesDesc3: "In many dishes, the sauce defines the pairing more than the main ingredient.",
    principles4: "Sweet ≥ Sweet",
    principlesDesc4: "The wine should always be at least as sweet as the dessert. If not, it will taste acidic.",
    principles5: "Regional = Regional",
    principlesDesc5: "Local wine usually works with local food. Shared terroir creates natural harmony.",
    principles6: "Affinity or contrast",
    principlesDesc6: "Two paths: wine and dish share flavors (affinity) or balance each other through opposition (contrast).",
    ctaTitle: "Want your menu to suggest",
    ctaSpan: "pairings",
    ctaDesc: "Winerim connects wine lists with dishes and pairings, helping your team recommend better and your customers choose with confidence.",
    ctaButton1: "Request demo",
    ctaButton2: "Explore Library",
    faqsTitle: "Frequently asked questions",
    intensitySuave: "Soft",
    intensitiaMedia: "Medium",
    intensitaIntensa: "Intense",
    intensitaMuyIntensa: "Very intense",
    platosCount: " dishes",
    faqQ1: "How many pairing categories does Winerim cover?",
    faqA1: "Winerim organizes pairings into 10 major gastronomic categories: red meats, poultry and game, fish and seafood, cheese, pasta/rice/legumes, vegetables, charcuterie, desserts, Asian cuisine and tapas. Each with principles, combinations and commercial reading.",
    faqQ2: "Are there fixed pairing rules?",
    faqA2: "There are no absolute rules, but there are principles that work. The intensity of the dish must be balanced with that of the wine. Fat asks for acidity or tannins. Spice asks for residual sweetness. Sauces usually matter more than the main ingredient.",
    faqQ3: "Why does pairing matter for a restaurant?",
    faqA3: "Good pairing improves the diner's experience, facilitates wine sales, increases average ticket and generates perception of professionalism. It is one of the most direct commercial levers.",
    faqQ4: "Does rosé work for everything?",
    faqA4: "Rosé is one of the most versatile wines for pairing. It works with salads, tapas, Mediterranean cuisine, Asian and many light dishes. It's a great wild card, but doesn't cover the entire spectrum.",
  },
  it: {
    seoTitle: "Abbinamenti: Guida Completa Vino + Piatto per l'Ospitalità | Winerim",
    seoDescription: "Guida agli abbinamenti: 10 categorie, 80+ combinazioni piatto+vino. Principi, errori e lettura commerciale per ristoranti e team di sala.",
    breadcrumb1: "Biblioteca del Vino",
    breadcrumb2: "Abbinamenti",
    tag: "Abbinamenti",
    categories: "10 categorie",
    combinations: "80+ combinazioni",
    commercial: "Strato Winerim commerciale",
    title: "Guida agli",
    titleSpan: "abbinamenti",
    description: "10 categorie gastronomiche, più di 80 combinazioni piatto + vino. Ogni abbinamento con principi, errori comuni e lettura commerciale per l'ospitalità.",
    searchPlaceholder: "Cerca piatto, vitigno o regione...",
    filterButton: "Filtri",
    categoryLabel: "Categoria gastronomica",
    allCategories: "Tutte",
    clear: "Cancella",
    categoryCount: " categoria",
    categoryCountPlural: "",
    pairingResults: " di abbinamento",
    principles: "Principi universali di abbinamento",
    principles1: "Intensità = Intensità",
    principlesDesc1: "Un piatto intenso richiede un vino intenso. Un piatto delicato, un vino delicato. L'equilibrio è fondamentale.",
    principles2: "Il grasso chiede acidità",
    principlesDesc2: "L'acidità del vino pulisce il palato dal grasso. Rossi con buona acidità, bianchi freschi o spumanti.",
    principles3: "La salsa governa",
    principlesDesc3: "In molti piatti, la salsa definisce l'abbinamento più dell'ingrediente principale.",
    principles4: "Dolce ≥ Dolce",
    principlesDesc4: "Il vino deve essere sempre almeno dolce quanto il dessert. Altrimenti, sembrerà acido.",
    principles5: "Regionale = Regionale",
    principlesDesc5: "Il vino locale di solito funziona con il cibo locale. Il terroir condiviso crea armonia naturale.",
    principles6: "Affinità o contrasto",
    principlesDesc6: "Due percorsi: vino e piatto condividono sapori (affinità) o si equilibrano per opposizione (contrasto).",
    ctaTitle: "Vuoi che il tuo menu suggerisca",
    ctaSpan: "abbinamenti",
    ctaDesc: "Winerim connette liste di vini con piatti e abbinamenti, aiutando il tuo team a consigliare meglio e i tuoi clienti a scegliere con consapevolezza.",
    ctaButton1: "Richiedi demo",
    ctaButton2: "Esplora Biblioteca",
    faqsTitle: "Domande frequenti",
    intensitySuave: "Soft",
    intensitiaMedia: "Medio",
    intensitaIntensa: "Intenso",
    intensitaMuyIntensa: "Molto intenso",
    platosCount: " piatti",
    faqQ1: "Quante categorie di abbinamento copre Winerim?",
    faqA1: "Winerim organizza gli abbinamenti in 10 categorie gastronomiche principali: carni rosse, pollame e selvaggina, pesce e frutti di mare, formaggi, pasta/riso/legumi, verdure, salumi, dolci, cucina asiatica e stuzzichini. Ognuna con principi, combinazioni e lettura commerciale.",
    faqQ2: "Ci sono regole di abbinamento fisse?",
    faqA2: "Non ci sono regole assolute, ma ci sono principi che funzionano. L'intensità del piatto deve essere bilanciata con quella del vino. Il grasso chiede acidità o tannini. Il piccante chiede dolcezza residua. Le salse di solito importano più dell'ingrediente principale.",
    faqQ3: "Perché l'abbinamento è importante per un ristorante?",
    faqA3: "Un buon abbinamento migliora l'esperienza del commensale, facilita la vendita di vino, aumenta lo scontrino medio e genera percezione di professionalità. È una delle leve commerciali più dirette.",
    faqQ4: "Il rosato funziona per tutto?",
    faqA4: "Il rosato è uno dei vini più versatili per l'abbinamento. Funziona con insalate, stuzzichini, cucina mediterranea, asiatica e molti piatti leggeri. È un grande jolly, ma non copre l'intero spettro.",
  },
  fr: {
    seoTitle: "Accords Mets-Vins: Guide Complet pour l'Hôtellerie | Winerim",
    seoDescription: "Guide des accords: 10 catégories, 80+ combinaisons plat+vin. Principes, erreurs et lecture commerciale pour restaurants et équipes de salle.",
    breadcrumb1: "Bibliothèque du Vin",
    breadcrumb2: "Accords mets-vins",
    tag: "Accords",
    categories: "10 catégories",
    combinations: "80+ combinaisons",
    commercial: "Couche Winerim commerciale",
    title: "Guide des",
    titleSpan: "accords",
    description: "10 catégories gastronomiques, plus de 80 combinaisons plat + vin. Chaque accord avec principes, erreurs courantes et lecture commerciale pour l'hôtellerie.",
    searchPlaceholder: "Cherchez plat, cépage ou région...",
    filterButton: "Filtres",
    categoryLabel: "Catégorie gastronomique",
    allCategories: "Tous",
    clear: "Effacer",
    categoryCount: " catégorie",
    categoryCountPlural: "",
    pairingResults: " d'accord",
    principles: "Principes universels d'accord",
    principles1: "Intensité = Intensité",
    principlesDesc1: "Un plat intenso demande un vin intenso. Un plat délicat, un vin délicat. L'équilibre est fondamental.",
    principles2: "La graisse demande de l'acidité",
    principlesDesc2: "L'acidité du vin nettoie le palais de la graisse. Les rouges avec bonne acidité, les blancs frais ou les effervescents.",
    principles3: "La sauce commande",
    principlesDesc3: "Dans de nombreux plats, la sauce définit l'accord plus que l'ingrédient principal.",
    principles4: "Doux ≥ Doux",
    principlesDesc4: "Le vin doit toujours être au moins aussi doux que le dessert. Sinon, il semblera acide.",
    principles5: "Régional = Régional",
    principlesDesc5: "Le vin local fonctionne généralement avec la nourriture locale. Le terroir partagé crée une harmonie naturelle.",
    principles6: "Affinité ou contraste",
    principlesDesc6: "Deux chemins: le vin et le plat partagent les saveurs (affinité) ou s'équilibrent par opposition (contraste).",
    ctaTitle: "Voulez-vous que votre menu suggère des",
    ctaSpan: "accords",
    ctaDesc: "Winerim connecte les listes de vins avec les plats et les accords, aidant votre équipe à recommander mieux et vos clients à choisir en toute confiance.",
    ctaButton1: "Demander une démo",
    ctaButton2: "Explorer la Bibliothèque",
    faqsTitle: "Questions fréquemment posées",
    intensitySuave: "Tendre",
    intensitiaMedia: "Moyen",
    intensitaIntensa: "Intense",
    intensitaMuyIntensa: "Très intense",
    platosCount: " plats",
    faqQ1: "Combien de catégories d'accords Winerim couvre-t-il?",
    faqA1: "Winerim organise les accords en 10 catégories gastronomiques principales: viandes rouges, volailles et gibier, poissons et fruits de mer, fromages, pâtes/riz/légumineuses, légumes, charcuterie, desserts, cuisine asiatique et tapas. Chacun avec principes, combinaisons et lecture commerciale.",
    faqQ2: "Y a-t-il des règles d'accord fixes?",
    faqA2: "Il n'y a pas de règles absolues, mais il y a des principes qui fonctionnent. L'intensité du plat doit être équilibrée avec celle du vin. La graisse demande de l'acidité ou des tanins. L'épicé demande de la douceur résiduelle. Les sauces importent généralement plus que l'ingrédient principal.",
    faqQ3: "Pourquoi l'accord est-il important pour un restaurant?",
    faqA3: "Un bon accord améliore l'expérience du dîneur, facilite la vente de vin, augmente le panier moyen et génère une perception de professionnalisme. C'est l'un des leviers commerciaux les plus directs.",
    faqQ4: "Le rosé fonctionne-t-il pour tout?",
    faqA4: "Le rosé est l'un des vins les plus polyvalents pour l'accord. Il fonctionne avec les salades, les tapas, la cuisine méditerranéenne, asiatique et de nombreux plats légers. C'est un joker fantastique, mais cela ne couvre pas tout le spectre.",
  },
  de: {
    seoTitle: "Speisebegleitungen: Vollständiger Leitfaden für Gastronomie | Winerim",
    seoDescription: "Begleitungsleitfaden: 10 Kategorien, 80+ Gericht+Wein-Kombinationen. Prinzipien, Fehler und kommerzielle Interpretation für Restaurants und Serviceteams.",
    breadcrumb1: "Weinbibliothek",
    breadcrumb2: "Speisebegleitungen",
    tag: "Begleitungen",
    categories: "10 Kategorien",
    combinations: "80+ Kombinationen",
    commercial: "Winerim-Geschäftsebene",
    title: "Leitfaden für",
    titleSpan: "Speisebegleitungen",
    description: "10 gastronomische Kategorien, über 80 Gericht + Wein-Kombinationen. Jede Begleitung mit Prinzipien, häufigen Fehlern und kommerzieller Interpretation für Gastronomie.",
    searchPlaceholder: "Nach Gericht, Rebsorte oder Region suchen...",
    filterButton: "Filter",
    categoryLabel: "Gastronomische Kategorie",
    allCategories: "Alle",
    clear: "Löschen",
    categoryCount: " Kategorie",
    categoryCountPlural: "",
    pairingResults: " Begleitung",
    principles: "Universelle Prinzipien der Speisebegleitung",
    principles1: "Intensität = Intensität",
    principlesDesc1: "Ein intensives Gericht erfordert einen intensiven Wein. Ein zartes Gericht, einen zarten Wein. Gleichgewicht ist entscheidend.",
    principles2: "Fett verlangt nach Säure",
    principlesDesc2: "Die Säure des Weins reinigt den Gaumen von Fett. Rotweine mit guter Säure, frische Weißweine oder Schaumweine.",
    principles3: "Die Sauce herrscht",
    principlesDesc3: "Bei vielen Gerichten definiert die Sauce die Begleitung mehr als die Hauptzutat.",
    principles4: "Süß ≥ Süß",
    principlesDesc4: "Der Wein sollte immer mindestens so süß sein wie das Dessert. Andernfalls schmeckt er sauer.",
    principles5: "Regional = Regional",
    principlesDesc5: "Lokaler Wein passt normalerweise zu lokaler Speise. Gemeinsames Terroir schafft natürliche Harmonie.",
    principles6: "Affinität oder Kontrast",
    principlesDesc6: "Zwei Wege: Wein und Gericht teilen Aromen (Affinität) oder gleichen sich durch Gegensatz aus (Kontrast).",
    ctaTitle: "Möchten Sie, dass Ihr Menü",
    ctaSpan: "Speisebegleitungen",
    ctaDesc: "Winerim verbindet Weinkarten mit Gerichten und Speisebegleitungen und hilft Ihrem Team, besser zu empfehlen und Ihren Gästen, sicher zu wählen.",
    ctaButton1: "Demo anfordern",
    ctaButton2: "Bibliothek erkunden",
    faqsTitle: "Häufig gestellte Fragen",
    intensitySuave: "Mild",
    intensitiaMedia: "Mittel",
    intensitaIntensa: "Intensiv",
    intensitaMuyIntensa: "Sehr intensiv",
    platosCount: " Gerichte",
    faqQ1: "Wie viele Speisebegleitungs-Kategorien deckt Winerim ab?",
    faqA1: "Winerim organisiert Speisebegleitungen in 10 Hauptkategorien: Rotfleisch, Geflügel und Wild, Fisch und Meeresfrüchte, Käse, Pasta/Reis/Hülsenfrüchte, Gemüse, Charcuterie, Desserts, asiatische Küche und Tapas. Jede mit Prinzipien, Kombinationen und kommerzieller Interpretation.",
    faqQ2: "Gibt es feste Begleitungsregeln?",
    faqA2: "Es gibt keine absoluten Regeln, aber es gibt Prinzipien, die funktionieren. Die Intensität des Gerichts muss mit der des Weins ausgeglichen werden. Fett verlangt nach Säure oder Tanninen. Schärfe verlangt nach Restsüße. Saucen spielen normalerweise eine wichtigere Rolle als die Hauptzutat.",
    faqQ3: "Warum ist die Speisebegleitung für ein Restaurant wichtig?",
    faqA3: "Eine gute Begleitung verbessert das Essen-Erlebnis, erleichtert den Weinverkauf, erhöht den durchschnittlichen Bestellwert und erzeugt einen Eindruck von Professionalität. Es ist einer der direktesten Geschäfthebel.",
    faqQ4: "Passt Rosé zu allem?",
    faqA4: "Rosé ist einer der vielseitigsten Weine für Speisebegleitungen. Er passt zu Salaten, Tapas, mediterraner Küche, asiatisch und zu vielen leichten Gerichten. Ein großer Joker, aber nicht für alles.",
  },
  pt: {
    seoTitle: "Harmonizações: Guia Completo Vinho + Prato para Hotelaria | Winerim",
    seoDescription: "Guia de harmonizações: 10 categorias, 80+ combinações prato+vinho. Princípios, erros e leitura comercial para restaurantes e equipes de sala.",
    breadcrumb1: "Biblioteca do Vinho",
    breadcrumb2: "Harmonizações",
    tag: "Harmonizações",
    categories: "10 categorias",
    combinations: "80+ combinações",
    commercial: "Camada Winerim comercial",
    title: "Guia de",
    titleSpan: "harmonizações",
    description: "10 categorias gastronômicas, mais de 80 combinações prato + vinho. Cada harmonização com princípios, erros comuns e leitura comercial para hotelaria.",
    searchPlaceholder: "Procure por prato, casta ou região...",
    filterButton: "Filtros",
    categoryLabel: "Categoria gastronômica",
    allCategories: "Todas",
    clear: "Limpar",
    categoryCount: " categoria",
    categoryCountPlural: "",
    pairingResults: " de harmonização",
    principles: "Princípios universais de harmonização",
    principles1: "Intensidade = Intensidade",
    principlesDesc1: "Um prato intenso pede um vinho intenso. Um prato delicado, um vinho delicado. O equilíbrio é fundamental.",
    principles2: "A gordura pede acidez",
    principlesDesc2: "A acidez do vinho limpa o paladar da gordura. Tintos com boa acidez, brancos frescos ou espumantes.",
    principles3: "O molho governa",
    principlesDesc3: "Em muitos pratos, o molho define a harmonização mais do que o ingrediente principal.",
    principles4: "Doce ≥ Doce",
    principlesDesc4: "O vinho deve ser sempre pelo menos tão doce quanto a sobremesa. Caso contrário, parecerá ácido.",
    principles5: "Regional = Regional",
    principlesDesc5: "O vinho local geralmente funciona bem com a comida local. O terroir compartilhado cria harmonia natural.",
    principles6: "Afinidade ou contraste",
    principlesDesc6: "Dois caminhos: vinho e prato compartilham sabores (afinidade) ou se equilibram por oposição (contraste).",
    ctaTitle: "Quer que seu menu sugira",
    ctaSpan: "harmonizações",
    ctaDesc: "Winerim conecta cartas de vinho com pratos e harmonizações, ajudando sua equipe a recomendar melhor e seus clientes a escolher com confiança.",
    ctaButton1: "Solicitar demo",
    ctaButton2: "Explorar Biblioteca",
    faqsTitle: "Perguntas frequentes",
    intensitySuave: "Suave",
    intensitiaMedia: "Média",
    intensitaIntensa: "Intensa",
    intensitaMuyIntensa: "Muito intensa",
    platosCount: " pratos",
    faqQ1: "Quantas categorias de harmonização o Winerim cobre?",
    faqA1: "Winerim organiza harmonizações em 10 principais categorias gastronômicas: carnes vermelhas, aves e caça, peixes e frutos do mar, queijos, massa/arroz/leguminosas, vegetais, embutidos, sobremesas, culinária asiática e petiscos. Cada um com princípios, combinações e leitura comercial.",
    faqQ2: "Existem regras de harmonização fixas?",
    faqA2: "Não há regras absolutas, mas existem princípios que funcionam. A intensidade do prato deve ser equilibrada com a do vinho. A gordura pede acidez ou taninos. A pimenta pede doçura residual. Os molhos geralmente importam mais do que o ingrediente principal.",
    faqQ3: "Por que a harmonização é importante para um restaurante?",
    faqA3: "Uma boa harmonização melhora a experiência do comensal, facilita a venda de vinho, aumenta o ticket médio e gera percepção de profissionalismo. É uma das alavancas comerciais mais diretas.",
    faqQ4: "O rosé serve para tudo?",
    faqA4: "O rosé é um dos vinhos mais versáteis para harmonização. Funciona com saladas, petiscos, culinária mediterrânea, asiática e muitos pratos leves. É um grande coringa, mas não cobre todo o espectro.",
  },
};

const faqs = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
];

const intensityLabels: Record<string, string> = {
  suave: "intensitySuave",
  media: "intensitiaMedia",
  intensa: "intensitaIntensa",
  "muy-intensa": "intensitaMuyIntensa",
};

const PairingsHub = () => {
  const { lang, allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PairingCategory | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = pairingEntries;
    if (categoryFilter !== "all") results = results.filter(p => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.dishes.some(d => d.dish.toLowerCase().includes(q)) ||
        p.recommendedGrapes.some(g => g.toLowerCase().includes(q)) ||
        p.recommendedRegions.some(r => r.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, categoryFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={i18n[lang as keyof typeof i18n]?.seoTitle ?? i18n.es.seoTitle}
        description={i18n[lang as keyof typeof i18n]?.seoDescription ?? i18n.es.seoDescription}
        url="https://winerim.wine/biblioteca-vino/maridajes"
        hreflang={allLangPaths("/biblioteca-vino/maridajes")}
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
            <Utensils size={14} className="text-wine" />
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
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">{i18n[lang as keyof typeof i18n]?.categories ?? i18n.es.categories}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">{i18n[lang as keyof typeof i18n]?.combinations ?? i18n.es.combinations}</span>
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
              <Input placeholder={i18n[lang as keyof typeof i18n]?.searchPlaceholder ?? i18n.es.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-wine/30 transition-colors"
            >
              <Filter size={14} /> {i18n[lang as keyof typeof i18n]?.filterButton ?? i18n.es.filterButton}
              {categoryFilter !== "all" && <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{categoryMeta[categoryFilter].label}</Badge>}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">{i18n[lang as keyof typeof i18n]?.categoryLabel ?? i18n.es.categoryLabel}</p>
                  {categoryFilter !== "all" && (
                    <button onClick={() => setCategoryFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> {i18n[lang as keyof typeof i18n]?.clear ?? i18n.es.clear}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCategoryFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === "all" ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                  >{i18n[lang as keyof typeof i18n]?.allCategories ?? i18n.es.allCategories}</button>
                  {categoryOrder.map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === cat ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                    >{categoryMeta[cat].emoji} {categoryMeta[cat].label}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{filtered.length}{i18n[lang as keyof typeof i18n]?.categoryCount ?? i18n.es.categoryCount}{filtered.length !== 1 ? i18n[lang as keyof typeof i18n]?.categoryCountPlural ?? i18n.es.categoryCountPlural : ""}{i18n[lang as keyof typeof i18n]?.pairingResults ?? i18n.es.pairingResults}</p>
        </div>
      </section>

      {/* CARDS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entry, i) => (
              <PairingCard key={entry.slug} entry={entry} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES SECTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{i18n[lang as keyof typeof i18n]?.principles ?? i18n.es.principles}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: i18n[lang as keyof typeof i18n]?.principles1 ?? i18n.es.principles1, desc: i18n[lang as keyof typeof i18n]?.principlesDesc1 ?? i18n.es.principlesDesc1 },
              { title: i18n[lang as keyof typeof i18n]?.principles2 ?? i18n.es.principles2, desc: i18n[lang as keyof typeof i18n]?.principlesDesc2 ?? i18n.es.principlesDesc2 },
              { title: i18n[lang as keyof typeof i18n]?.principles3 ?? i18n.es.principles3, desc: i18n[lang as keyof typeof i18n]?.principlesDesc3 ?? i18n.es.principlesDesc3 },
              { title: i18n[lang as keyof typeof i18n]?.principles4 ?? i18n.es.principles4, desc: i18n[lang as keyof typeof i18n]?.principlesDesc4 ?? i18n.es.principlesDesc4 },
              { title: i18n[lang as keyof typeof i18n]?.principles5 ?? i18n.es.principles5, desc: i18n[lang as keyof typeof i18n]?.principlesDesc5 ?? i18n.es.principlesDesc5 },
              { title: i18n[lang as keyof typeof i18n]?.principles6 ?? i18n.es.principles6, desc: i18n[lang as keyof typeof i18n]?.principlesDesc6 ?? i18n.es.principlesDesc6 },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                  <h3 className="font-heading text-base font-semibold mb-2 text-wine">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
          <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{i18n[lang as keyof typeof i18n]?.faqsTitle ?? i18n.es.faqsTitle}</h2></ScrollReveal>
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

const PairingCard = ({ entry, delay }: { entry: PairingEntry; delay: number }) => {
  const { lang } = useLanguage();
  const meta = categoryMeta[entry.category];
  return (
    <ScrollReveal delay={delay}>
      <Link
        to={`/biblioteca-vino/maridajes/${entry.slug}`}
        className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{meta.emoji}</span>
            <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">{entry.name}</h3>
          </div>
          <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.dishes.length}{i18n[lang as keyof typeof i18n]?.platosCount ?? i18n.es.platosCount}</span>
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{i18n[lang as keyof typeof i18n]?.[intensityLabels[entry.intensity] as keyof typeof i18n.es] ?? i18n.es[intensityLabels[entry.intensity] as keyof typeof i18n.es]}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.recommendedGrapes.slice(0, 3).map(g => (
            <span key={g} className="text-xs text-muted-foreground">{g}</span>
          ))}
          {entry.recommendedGrapes.length > 3 && <span className="text-xs text-muted-foreground">+{entry.recommendedGrapes.length - 3}</span>}
        </div>
      </Link>
    </ScrollReveal>
  );
};

export default PairingsHub;
