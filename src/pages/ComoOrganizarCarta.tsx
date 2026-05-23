import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BookOpen, AlertTriangle, CheckCircle,
  Layers, DollarSign, Search, Utensils, XCircle,
  Sparkles, GlassWater, Globe, BarChart3, Target, List
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

interface OrgMethod { title: string; examples: string; pros: string; cons: string; }
interface TipItem { icon: typeof List; title: string; desc: string; }
interface PricingConcept { title: string; desc: string; }
interface TechBenefit { icon: typeof Search; title: string; desc: string; }
interface ProblemItem { icon: typeof Layers; text: string; }

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumb: string; badge: string;
  h1pre: string; h1accent: string; h1post: string;
  heroSubtitle: string;
  ctaAnalyze: string; ctaDemo: string;
  introTitle: string; introAccent: string; introDesc: string;
  methodsBadge: string; methodsTitle: string; methodsAccent: string;
  clarityBadge: string; clarityTitle: string; clarityAccent: string;
  pricingBadge: string; pricingTitle: string; pricingAccent: string; pricingDesc: string;
  errorsBadge: string; errorsTitle: string; errorsAccent: string;
  techBadge: string; techTitle: string; techAccent: string; techDesc: string;
  techNote: string; techNoteHighlight: string;
  ctaBadge: string; ctaTitle: string; ctaAccent: string; ctaDesc: string; ctaBtn: string;
  problems: ProblemItem[];
  orgMethods: OrgMethod[];
  clarityTips: TipItem[];
  pricingConcepts: PricingConcept[];
  mistakes: string[];
  techBenefits: TechBenefit[];
  links: { to: string; label: string; type: "guide" | "tool" | "resource" }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cómo Organizar una Carta de Vinos en un Restaurante",
    metaDescription: "Guía práctica para estructurar tu carta de vinos: métodos de organización, errores comunes, estructura de precios y cómo la tecnología puede ayudarte.",
    url: "https://winerim.wine/blog/como-organizar-carta-de-vinos",
    breadcrumb: "Cómo organizar carta de vinos", badge: "Guía práctica",
    h1pre: "Cómo organizar una ", h1accent: "carta de vinos", h1post: " en un restaurante",
    heroSubtitle: "Guía práctica para estructurar tu carta de vinos de forma clara, rentable y fácil de entender para el cliente.",
    ctaAnalyze: "Analizar mi carta de vinos", ctaDemo: "Solicitar demo",
    introTitle: "Una carta mal organizada ", introAccent: "cuesta dinero",
    introDesc: "La carta de vinos es una de las herramientas de venta más importantes de un restaurante. Sin embargo, muchas cartas están mal estructuradas, lo que genera confusión en el cliente y reduce las ventas de vino.",
    methodsBadge: "Métodos", methodsTitle: "Formas de organizar una ", methodsAccent: "carta de vinos",
    clarityBadge: "Buenas prácticas", clarityTitle: "Cómo hacer tu carta ", clarityAccent: "fácil de entender",
    pricingBadge: "Estrategia de precios", pricingTitle: "La estructura de precios ", pricingAccent: "importa",
    pricingDesc: "Organizar una carta de vinos no es solo decidir el orden de las referencias. La distribución de precios influye directamente en la decisión del cliente.",
    errorsBadge: "Evita estos errores", errorsTitle: "Errores comunes al organizar una ", errorsAccent: "carta de vinos",
    techBadge: "Tecnología", techTitle: "La carta digital: la mejor forma de ", techAccent: "organizar tus vinos",
    techDesc: "Las cartas digitales eliminan las limitaciones del papel y permiten al cliente explorar los vinos de la forma que prefiera.",
    techNote: " convierte tu carta de vinos en una experiencia interactiva con filtros, maridajes inteligentes, fichas de vino y recomendaciones personalizadas. Tu carta siempre organizada, siempre actualizada.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Análisis gratuito", ctaTitle: "Descubre si tu carta de vinos está ", ctaAccent: "bien organizada",
    ctaDesc: "Analizamos la estructura de tu carta y te damos recomendaciones concretas para mejorarla.", ctaBtn: "Solicitar análisis gratuito",
    problems: [
      { icon: Layers, text: "Demasiadas referencias sin criterio claro de selección" },
      { icon: List, text: "Categorías poco claras que confunden al cliente" },
      { icon: Search, text: "Dificultad para comparar vinos entre sí" },
      { icon: DollarSign, text: "Precios mal distribuidos con saltos bruscos entre opciones" },
    ],
    orgMethods: [
      { title: "Por tipo de vino", examples: "Tinto, blanco, rosado, espumoso, dulce", pros: "Intuitivo para cualquier cliente. Fácil de navegar.", cons: "Puede ser poco diferenciador si hay muchas referencias por tipo." },
      { title: "Por región o denominación de origen", examples: "Rioja, Ribera del Duero, Borgoña, Toscana, Napa Valley", pros: "Ideal para cartas con identidad geográfica. Transmite cultura vinícola.", cons: "Puede confundir a clientes que no conocen las regiones." },
      { title: "Por estilo de vino", examples: "Fresco y ligero, afrutado, estructurado, aromático, intenso", pros: "Muy accesible. Ayuda al cliente a elegir según sus preferencias reales.", cons: "Requiere un buen conocimiento de cada vino para clasificarlo." },
      { title: "Por variedad de uva", examples: "Tempranillo, Garnacha, Chardonnay, Pinot Noir, Albariño", pros: "Claro para clientes con conocimiento básico de vino.", cons: "No funciona bien con vinos de coupage o multivarietal." },
    ],
    clarityTips: [
      { icon: List, title: "Usa categorías claras y consistentes", desc: "Elige un criterio principal de organización y mantenlo en toda la carta. No mezcles regiones con tipos de uva." },
      { icon: Layers, title: "Evita demasiadas subcategorías", desc: "3-5 categorías principales son suficientes. Si necesitas más, es señal de que tienes demasiadas referencias." },
      { icon: BookOpen, title: "Explica los vinos de forma simple", desc: "Notas de cata breves, maridajes sugeridos y una descripción que cualquier cliente pueda entender." },
      { icon: Sparkles, title: "Destaca recomendaciones", desc: "Señala 2-3 vinos por categoría como 'selección del sommelier' o 'recomendado'. Guía la decisión del cliente." },
    ],
    pricingConcepts: [
      { title: "Escalera de precios", desc: "Distribuye los vinos en una progresión de precios natural: entrada, medio, alto. Cada escalón debe tener al menos 2-3 opciones para que el cliente sienta que elige libremente." },
      { title: "Rangos equilibrados", desc: "Evita saltos de precio bruscos (de 18€ a 45€ sin opciones intermedias). Los huecos en la escalera de precios hacen que el cliente se sienta perdido o empujado." },
      { title: "Vinos ancla", desc: "Incluye 1-2 vinos premium que establezcan el techo de la carta. Su función no es venderse, sino hacer que los vinos de rango medio parezcan más accesibles." },
    ],
    mistakes: [
      "Mezclar demasiados criterios de organización (región + uva + estilo) en la misma carta",
      "Cartas demasiado largas con más de 250 referencias sin guía ni sistema de gestión",
      "No ofrecer vinos por copa, perdiendo ventas de mesas pequeñas o primeras citas con el vino",
      "Descripciones excesivamente técnicas que intimidan al cliente medio",
      "No actualizar la carta cuando cambian las añadas o se agotan referencias",
      "Falta de coherencia entre la carta de vinos y la propuesta gastronómica",
    ],
    techBenefits: [
      { icon: Search, title: "Filtrar vinos por cualquier criterio", desc: "El cliente elige cómo explorar: por tipo, precio, región, uva o estilo. Cada uno encuentra su camino." },
      { icon: BarChart3, title: "Comparar referencias fácilmente", desc: "Vista comparativa de vinos similares con precios, notas de cata y maridajes lado a lado." },
      { icon: Globe, title: "Explorar por estilo o región", desc: "Navegación visual con mapas de regiones, perfiles de sabor y filtros interactivos." },
      { icon: Utensils, title: "Descubrir maridajes inteligentes", desc: "Sugerencias automáticas de vino según el plato elegido. El cliente descubre vinos que no habría probado." },
    ],
    links: [
      { to: "/blog/cuantos-vinos-carta-restaurante", label: "Cuántos vinos debe tener una carta", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
      { to: "/wine-list-analyzer", label: "Analizador de carta de vinos", type: "tool" },
      { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", type: "resource" },
    ],
  },
  en: {
    metaTitle: "How to Organize a Wine List at a Restaurant",
    metaDescription: "Practical guide to structuring your wine list: organization methods, common mistakes, price structure and how technology can help.",
    url: "https://winerim.wine/en/how-to-organize-wine-list",
    breadcrumb: "How to organize a wine list", badge: "Practical guide",
    h1pre: "How to organize a ", h1accent: "wine list", h1post: " at a restaurant",
    heroSubtitle: "Practical guide to structuring your wine list in a clear, profitable and guest-friendly way.",
    ctaAnalyze: "Analyze my wine list", ctaDemo: "Request demo",
    introTitle: "A poorly organized list ", introAccent: "costs money",
    introDesc: "The wine list is one of the most important sales tools in a restaurant. Yet many lists are poorly structured, creating guest confusion and reducing wine sales.",
    methodsBadge: "Methods", methodsTitle: "Ways to organize a ", methodsAccent: "wine list",
    clarityBadge: "Best practices", clarityTitle: "How to make your list ", clarityAccent: "easy to understand",
    pricingBadge: "Pricing strategy", pricingTitle: "Price structure ", pricingAccent: "matters",
    pricingDesc: "Organizing a wine list isn't just about the order of references. Price distribution directly influences the guest's decision.",
    errorsBadge: "Avoid these mistakes", errorsTitle: "Common mistakes when organizing a ", errorsAccent: "wine list",
    techBadge: "Technology", techTitle: "The digital list: the best way to ", techAccent: "organize your wines",
    techDesc: "Digital wine lists eliminate the limitations of paper and let guests explore wines the way they prefer.",
    techNote: " transforms your wine list into an interactive experience with filters, smart pairings, wine cards and personalized recommendations. Your list always organized, always up to date.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Free analysis", ctaTitle: "Find out if your wine list is ", ctaAccent: "well organized",
    ctaDesc: "We analyze your list structure and give you specific recommendations to improve it.", ctaBtn: "Request free analysis",
    problems: [
      { icon: Layers, text: "Too many references without clear selection criteria" },
      { icon: List, text: "Unclear categories that confuse guests" },
      { icon: Search, text: "Difficulty comparing wines with each other" },
      { icon: DollarSign, text: "Poorly distributed prices with abrupt jumps between options" },
    ],
    orgMethods: [
      { title: "By wine type", examples: "Red, white, rosé, sparkling, dessert", pros: "Intuitive for any guest. Easy to navigate.", cons: "Can lack differentiation with many references per type." },
      { title: "By region or appellation", examples: "Rioja, Burgundy, Tuscany, Napa Valley, Bordeaux", pros: "Ideal for lists with geographic identity. Conveys wine culture.", cons: "Can confuse guests unfamiliar with regions." },
      { title: "By wine style", examples: "Fresh and light, fruity, structured, aromatic, intense", pros: "Very accessible. Helps guests choose based on real preferences.", cons: "Requires good knowledge of each wine to classify it." },
      { title: "By grape variety", examples: "Tempranillo, Grenache, Chardonnay, Pinot Noir, Albariño", pros: "Clear for guests with basic wine knowledge.", cons: "Doesn't work well with blends or multi-varietal wines." },
    ],
    clarityTips: [
      { icon: List, title: "Use clear and consistent categories", desc: "Choose one main organizing criterion and stick to it throughout. Don't mix regions with grape types." },
      { icon: Layers, title: "Avoid too many subcategories", desc: "3-5 main categories are enough. If you need more, it's a sign you have too many references." },
      { icon: BookOpen, title: "Describe wines simply", desc: "Brief tasting notes, suggested pairings and a description any guest can understand." },
      { icon: Sparkles, title: "Highlight recommendations", desc: "Mark 2-3 wines per category as 'sommelier's pick' or 'recommended'. Guide the guest's decision." },
    ],
    pricingConcepts: [
      { title: "Price ladder", desc: "Distribute wines in a natural price progression: entry, mid, high. Each step should have at least 2-3 options so the guest feels they're choosing freely." },
      { title: "Balanced ranges", desc: "Avoid abrupt price jumps (from €18 to €45 with nothing in between). Gaps in the price ladder make the guest feel lost or pushed." },
      { title: "Anchor wines", desc: "Include 1-2 premium wines that set the ceiling of the list. Their function isn't to sell, but to make mid-range wines seem more accessible." },
    ],
    mistakes: [
      "Mixing too many organizing criteria (region + grape + style) in the same list",
      "Lists that are too long with 250+ references without guidance or management system",
      "Not offering wine by the glass, losing sales from small tables or first-time wine drinkers",
      "Overly technical descriptions that intimidate the average guest",
      "Not updating the list when vintages change or references run out",
      "Lack of coherence between the wine list and the food concept",
    ],
    techBenefits: [
      { icon: Search, title: "Filter wines by any criterion", desc: "The guest chooses how to explore: by type, price, region, grape or style. Everyone finds their path." },
      { icon: BarChart3, title: "Compare references easily", desc: "Side-by-side comparison of similar wines with prices, tasting notes and pairings." },
      { icon: Globe, title: "Explore by style or region", desc: "Visual navigation with region maps, flavor profiles and interactive filters." },
      { icon: Utensils, title: "Discover smart pairings", desc: "Automatic wine suggestions based on the chosen dish. The guest discovers wines they wouldn't have tried." },
    ],
    links: [
      { to: "/en/how-many-wines-restaurant-list", label: "How many wines should a list have", type: "guide" },
      { to: "/en/how-to-design-profitable-wine-list", label: "How to design a profitable list", type: "guide" },
      { to: "/en/wine-list-analysis", label: "Wine list analyzer", type: "tool" },
      { to: "/en/resources/wine-list-template", label: "Wine list template", type: "resource" },
    ],
  },
  it: {
    metaTitle: "Come Organizzare una Carta dei Vini al Ristorante",
    metaDescription: "Guida pratica per strutturare la tua carta dei vini: metodi di organizzazione, errori comuni, struttura dei prezzi e come la tecnologia può aiutarti.",
    url: "https://winerim.wine/it/come-organizzare-carta-vini",
    breadcrumb: "Come organizzare carta dei vini", badge: "Guida pratica",
    h1pre: "Come organizzare una ", h1accent: "carta dei vini", h1post: " al ristorante",
    heroSubtitle: "Guida pratica per strutturare la tua carta dei vini in modo chiaro, redditizio e facile da capire per il cliente.",
    ctaAnalyze: "Analizza la mia carta", ctaDemo: "Richiedi demo",
    introTitle: "Una carta mal organizzata ", introAccent: "costa denaro",
    introDesc: "La carta dei vini è uno degli strumenti di vendita più importanti di un ristorante. Eppure molte carte sono mal strutturate, generando confusione nel cliente e riducendo le vendite di vino.",
    methodsBadge: "Metodi", methodsTitle: "Modi per organizzare una ", methodsAccent: "carta dei vini",
    clarityBadge: "Buone pratiche", clarityTitle: "Come rendere la tua carta ", clarityAccent: "facile da capire",
    pricingBadge: "Strategia prezzi", pricingTitle: "La struttura dei prezzi ", pricingAccent: "conta",
    pricingDesc: "Organizzare una carta dei vini non è solo decidere l'ordine delle referenze. La distribuzione dei prezzi influenza direttamente la decisione del cliente.",
    errorsBadge: "Evita questi errori", errorsTitle: "Errori comuni nell'organizzare una ", errorsAccent: "carta dei vini",
    techBadge: "Tecnologia", techTitle: "La carta digitale: il modo migliore per ", techAccent: "organizzare i tuoi vini",
    techDesc: "Le carte digitali eliminano i limiti della carta cartacea e permettono al cliente di esplorare i vini nel modo che preferisce.",
    techNote: " trasforma la tua carta dei vini in un'esperienza interattiva con filtri, abbinamenti intelligenti, schede vino e raccomandazioni personalizzate. La tua carta sempre organizzata, sempre aggiornata.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Analisi gratuita", ctaTitle: "Scopri se la tua carta dei vini è ", ctaAccent: "ben organizzata",
    ctaDesc: "Analizziamo la struttura della tua carta e ti diamo raccomandazioni concrete per migliorarla.", ctaBtn: "Richiedi analisi gratuita",
    problems: [
      { icon: Layers, text: "Troppe referenze senza criteri di selezione chiari" },
      { icon: List, text: "Categorie poco chiare che confondono il cliente" },
      { icon: Search, text: "Difficoltà nel confrontare i vini tra loro" },
      { icon: DollarSign, text: "Prezzi mal distribuiti con salti bruschi tra le opzioni" },
    ],
    orgMethods: [
      { title: "Per tipo di vino", examples: "Rosso, bianco, rosato, spumante, dolce", pros: "Intuitivo per qualsiasi cliente. Facile da navigare.", cons: "Può essere poco differenziante con molte referenze per tipo." },
      { title: "Per regione o denominazione", examples: "Piemonte, Toscana, Borgogna, Rioja, Napa Valley", pros: "Ideale per carte con identità geografica. Trasmette cultura enologica.", cons: "Può confondere clienti che non conoscono le regioni." },
      { title: "Per stile di vino", examples: "Fresco e leggero, fruttato, strutturato, aromatico, intenso", pros: "Molto accessibile. Aiuta il cliente a scegliere in base alle preferenze reali.", cons: "Richiede buona conoscenza di ogni vino per classificarlo." },
      { title: "Per vitigno", examples: "Sangiovese, Nebbiolo, Chardonnay, Pinot Nero, Vermentino", pros: "Chiaro per clienti con conoscenza base del vino.", cons: "Non funziona bene con blend o vini multivarietali." },
    ],
    clarityTips: [
      { icon: List, title: "Usa categorie chiare e coerenti", desc: "Scegli un criterio principale di organizzazione e mantienilo in tutta la carta. Non mescolare regioni con tipi di uva." },
      { icon: Layers, title: "Evita troppe sottocategorie", desc: "3-5 categorie principali sono sufficienti. Se ne servono di più, è segno che hai troppe referenze." },
      { icon: BookOpen, title: "Descrivi i vini in modo semplice", desc: "Note di degustazione brevi, abbinamenti suggeriti e descrizioni comprensibili a qualsiasi cliente." },
      { icon: Sparkles, title: "Evidenzia le raccomandazioni", desc: "Segnala 2-3 vini per categoria come 'selezione del sommelier' o 'consigliato'. Guida la decisione del cliente." },
    ],
    pricingConcepts: [
      { title: "Scala dei prezzi", desc: "Distribuisci i vini in una progressione di prezzo naturale: ingresso, medio, alto. Ogni gradino deve avere almeno 2-3 opzioni perché il cliente senta di scegliere liberamente." },
      { title: "Fasce equilibrate", desc: "Evita salti di prezzo bruschi (da 18€ a 45€ senza opzioni intermedie). I vuoti nella scala dei prezzi fanno sentire il cliente perso o spinto." },
      { title: "Vini àncora", desc: "Includi 1-2 vini premium che stabiliscano il tetto della carta. La loro funzione non è vendersi, ma far sembrare i vini di fascia media più accessibili." },
    ],
    mistakes: [
      "Mescolare troppi criteri di organizzazione (regione + vitigno + stile) nella stessa carta",
      "Carte troppo lunghe con più di 250 referenze senza guida né sistema di gestione",
      "Non offrire vino al calice, perdendo vendite di tavoli piccoli o primi approcci al vino",
      "Descrizioni eccessivamente tecniche che intimidiscono il cliente medio",
      "Non aggiornare la carta quando cambiano le annate o si esauriscono le referenze",
      "Mancanza di coerenza tra la carta dei vini e la proposta gastronomica",
    ],
    techBenefits: [
      { icon: Search, title: "Filtrare vini per qualsiasi criterio", desc: "Il cliente sceglie come esplorare: per tipo, prezzo, regione, vitigno o stile. Ognuno trova il suo percorso." },
      { icon: BarChart3, title: "Confrontare referenze facilmente", desc: "Vista comparativa di vini simili con prezzi, note di degustazione e abbinamenti fianco a fianco." },
      { icon: Globe, title: "Esplorare per stile o regione", desc: "Navigazione visiva con mappe delle regioni, profili di sapore e filtri interattivi." },
      { icon: Utensils, title: "Scoprire abbinamenti intelligenti", desc: "Suggerimenti automatici di vino in base al piatto scelto. Il cliente scopre vini che non avrebbe provato." },
    ],
    links: [
      { to: "/it/quanti-vini-carta-ristorante", label: "Quanti vini deve avere una carta", type: "guide" },
      { to: "/it/come-progettare-carta-vini-redditizia", label: "Come progettare una carta redditizia", type: "guide" },
      { to: "/it/analisi-carta", label: "Analizzatore carta dei vini", type: "tool" },
      { to: "/it/risorse/modello-carta-vini", label: "Modello carta dei vini", type: "resource" },
    ],
  },
  fr: {
    metaTitle: "Comment Organiser une Carte des Vins au Restaurant",
    metaDescription: "Guide pratique pour structurer votre carte des vins : méthodes d'organisation, erreurs courantes, structure de prix et comment la technologie peut vous aider.",
    url: "https://winerim.wine/fr/comment-organiser-carte-des-vins",
    breadcrumb: "Comment organiser une carte des vins", badge: "Guide pratique",
    h1pre: "Comment organiser une ", h1accent: "carte des vins", h1post: " au restaurant",
    heroSubtitle: "Guide pratique pour structurer votre carte des vins de manière claire, rentable et facile à comprendre pour le client.",
    ctaAnalyze: "Analyser ma carte", ctaDemo: "Demander une démo",
    introTitle: "Une carte mal organisée ", introAccent: "coûte de l'argent",
    introDesc: "La carte des vins est l'un des outils de vente les plus importants d'un restaurant. Pourtant, beaucoup de cartes sont mal structurées, ce qui crée de la confusion chez le client et réduit les ventes de vin.",
    methodsBadge: "Méthodes", methodsTitle: "Façons d'organiser une ", methodsAccent: "carte des vins",
    clarityBadge: "Bonnes pratiques", clarityTitle: "Comment rendre votre carte ", clarityAccent: "facile à comprendre",
    pricingBadge: "Stratégie de prix", pricingTitle: "La structure des prix ", pricingAccent: "compte",
    pricingDesc: "Organiser une carte des vins ne se résume pas à décider l'ordre des références. La distribution des prix influence directement la décision du client.",
    errorsBadge: "Évitez ces erreurs", errorsTitle: "Erreurs courantes dans l'organisation d'une ", errorsAccent: "carte des vins",
    techBadge: "Technologie", techTitle: "La carte digitale : la meilleure façon d'", techAccent: "organiser vos vins",
    techDesc: "Les cartes digitales éliminent les limites du papier et permettent au client d'explorer les vins à sa façon.",
    techNote: " transforme votre carte des vins en une expérience interactive avec filtres, accords mets-vins intelligents, fiches vin et recommandations personnalisées. Votre carte toujours organisée, toujours à jour.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Analyse gratuite", ctaTitle: "Découvrez si votre carte des vins est ", ctaAccent: "bien organisée",
    ctaDesc: "Nous analysons la structure de votre carte et vous donnons des recommandations concrètes pour l'améliorer.", ctaBtn: "Demander une analyse gratuite",
    problems: [
      { icon: Layers, text: "Trop de références sans critères de sélection clairs" },
      { icon: List, text: "Catégories floues qui déroutent le client" },
      { icon: Search, text: "Difficulté à comparer les vins entre eux" },
      { icon: DollarSign, text: "Prix mal répartis avec des sauts brusques entre les options" },
    ],
    orgMethods: [
      { title: "Par type de vin", examples: "Rouge, blanc, rosé, effervescent, liquoreux", pros: "Intuitif pour tout client. Facile à parcourir.", cons: "Peut manquer de différenciation avec beaucoup de références par type." },
      { title: "Par région ou appellation", examples: "Bordeaux, Bourgogne, Rhône, Toscane, Rioja", pros: "Idéal pour les cartes à identité géographique. Transmet la culture viticole.", cons: "Peut dérouter les clients qui ne connaissent pas les régions." },
      { title: "Par style de vin", examples: "Frais et léger, fruité, structuré, aromatique, intense", pros: "Très accessible. Aide le client à choisir selon ses vraies préférences.", cons: "Nécessite une bonne connaissance de chaque vin pour le classer." },
      { title: "Par cépage", examples: "Pinot Noir, Chardonnay, Syrah, Grenache, Sauvignon Blanc", pros: "Clair pour les clients ayant des connaissances de base en vin.", cons: "Ne fonctionne pas bien avec les assemblages ou vins multi-cépages." },
    ],
    clarityTips: [
      { icon: List, title: "Utilisez des catégories claires et cohérentes", desc: "Choisissez un critère principal d'organisation et maintenez-le dans toute la carte. Ne mélangez pas régions et cépages." },
      { icon: Layers, title: "Évitez trop de sous-catégories", desc: "3-5 catégories principales suffisent. Si vous en avez besoin de plus, c'est signe que vous avez trop de références." },
      { icon: BookOpen, title: "Décrivez les vins simplement", desc: "Notes de dégustation brèves, accords suggérés et description compréhensible par tout client." },
      { icon: Sparkles, title: "Mettez en avant les recommandations", desc: "Signalez 2-3 vins par catégorie comme 'sélection du sommelier' ou 'recommandé'. Guidez la décision du client." },
    ],
    pricingConcepts: [
      { title: "Échelle de prix", desc: "Distribuez les vins dans une progression de prix naturelle : entrée, milieu, haut. Chaque échelon doit avoir au moins 2-3 options pour que le client se sente libre de choisir." },
      { title: "Tranches équilibrées", desc: "Évitez les sauts de prix brusques (de 18€ à 45€ sans options intermédiaires). Les trous dans l'échelle de prix perdent ou poussent le client." },
      { title: "Vins d'ancrage", desc: "Incluez 1-2 vins premium qui fixent le plafond de la carte. Leur fonction n'est pas de se vendre, mais de rendre les vins de gamme moyenne plus accessibles." },
    ],
    mistakes: [
      "Mélanger trop de critères d'organisation (région + cépage + style) dans la même carte",
      "Cartes trop longues avec plus de 250 références sans guide ni système de gestion",
      "Ne pas proposer de vin au verre, perdant des ventes de petites tables ou de premières approches du vin",
      "Descriptions trop techniques qui intimident le client moyen",
      "Ne pas mettre à jour la carte quand les millésimes changent ou les références s'épuisent",
      "Manque de cohérence entre la carte des vins et la proposition gastronomique",
    ],
    techBenefits: [
      { icon: Search, title: "Filtrer les vins par tout critère", desc: "Le client choisit comment explorer : par type, prix, région, cépage ou style. Chacun trouve son chemin." },
      { icon: BarChart3, title: "Comparer les références facilement", desc: "Vue comparative de vins similaires avec prix, notes de dégustation et accords côte à côte." },
      { icon: Globe, title: "Explorer par style ou région", desc: "Navigation visuelle avec cartes des régions, profils de saveur et filtres interactifs." },
      { icon: Utensils, title: "Découvrir des accords intelligents", desc: "Suggestions automatiques de vin selon le plat choisi. Le client découvre des vins qu'il n'aurait pas essayés." },
    ],
    links: [
      { to: "/fr/combien-vins-carte-restaurant", label: "Combien de vins sur une carte", type: "guide" },
      { to: "/fr/comment-concevoir-carte-vins-rentable", label: "Comment concevoir une carte rentable", type: "guide" },
      { to: "/fr/analyse-carte", label: "Analyseur de carte des vins", type: "tool" },
      { to: "/fr/ressources/modele-carte-des-vins", label: "Modèle de carte des vins", type: "resource" },
    ],
  },
  de: {
    metaTitle: "Wie man eine Weinkarte im Restaurant organisiert",
    metaDescription: "Praktischer Leitfaden zur Strukturierung Ihrer Weinkarte: Organisationsmethoden, häufige Fehler, Preisstruktur und wie Technologie Ihnen helfen kann.",
    url: "https://winerim.wine/de/wie-weinkarte-organisieren",
    breadcrumb: "Weinkarte organisieren", badge: "Praktischer Leitfaden",
    h1pre: "Wie man eine ", h1accent: "Weinkarte", h1post: " im Restaurant organisiert",
    heroSubtitle: "Praktischer Leitfaden, um Ihre Weinkarte klar, rentabel und für den Gast verständlich zu strukturieren.",
    ctaAnalyze: "Meine Weinkarte analysieren", ctaDemo: "Demo anfordern",
    introTitle: "Eine schlecht organisierte Karte ", introAccent: "kostet Geld",
    introDesc: "Die Weinkarte ist eines der wichtigsten Verkaufsinstrumente in einem Restaurant. Dennoch sind viele Karten schlecht strukturiert, was zu Verwirrung beim Gast und zu geringeren Weinverkäufen führt.",
    methodsBadge: "Methoden", methodsTitle: "Wege, eine ", methodsAccent: "Weinkarte zu organisieren",
    clarityBadge: "Best Practices", clarityTitle: "So machen Sie Ihre Karte ", clarityAccent: "leicht verständlich",
    pricingBadge: "Preisstrategie", pricingTitle: "Die Preisstruktur ", pricingAccent: "zählt",
    pricingDesc: "Eine Weinkarte zu organisieren bedeutet mehr, als nur die Reihenfolge der Referenzen festzulegen. Die Preisverteilung beeinflusst die Entscheidung des Gastes direkt.",
    errorsBadge: "Vermeiden Sie diese Fehler", errorsTitle: "Häufige Fehler beim Organisieren einer ", errorsAccent: "Weinkarte",
    techBadge: "Technologie", techTitle: "Die digitale Karte: der beste Weg, ", techAccent: "Ihre Weine zu organisieren",
    techDesc: "Digitale Weinkarten überwinden die Grenzen des Papiers und lassen die Gäste die Weine so erkunden, wie sie es bevorzugen.",
    techNote: " verwandelt Ihre Weinkarte in ein interaktives Erlebnis mit Filtern, intelligenten Speisenbegleitungen, Weinprofilen und persönlichen Empfehlungen. Ihre Karte immer organisiert, immer aktuell.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Kostenlose Analyse", ctaTitle: "Finden Sie heraus, ob Ihre Weinkarte ", ctaAccent: "gut organisiert ist",
    ctaDesc: "Wir analysieren die Struktur Ihrer Karte und geben Ihnen konkrete Empfehlungen zur Verbesserung.", ctaBtn: "Kostenlose Analyse anfordern",
    problems: [
      { icon: Layers, text: "Zu viele Referenzen ohne klare Auswahlkriterien" },
      { icon: List, text: "Unklare Kategorien, die den Gast verwirren" },
      { icon: Search, text: "Schwierigkeiten, Weine miteinander zu vergleichen" },
      { icon: DollarSign, text: "Schlecht verteilte Preise mit abrupten Sprüngen zwischen den Optionen" },
    ],
    orgMethods: [
      { title: "Nach Weintyp", examples: "Rotwein, Weißwein, Rosé, Schaumwein, Dessertwein", pros: "Intuitiv für jeden Gast. Einfach zu navigieren.", cons: "Kann bei vielen Referenzen pro Typ wenig differenzierend wirken." },
      { title: "Nach Region oder Anbaugebiet", examples: "Rheingau, Mosel, Burgund, Toskana, Rioja", pros: "Ideal für Karten mit geografischer Identität. Vermittelt Weinkultur.", cons: "Kann Gäste verwirren, die die Regionen nicht kennen." },
      { title: "Nach Weinstil", examples: "Frisch und leicht, fruchtig, strukturiert, aromatisch, intensiv", pros: "Sehr zugänglich. Hilft dem Gast, nach echten Vorlieben zu wählen.", cons: "Erfordert gute Kenntnisse jedes Weins zur Einordnung." },
      { title: "Nach Rebsorte", examples: "Riesling, Spätburgunder, Chardonnay, Grauburgunder, Tempranillo", pros: "Klar für Gäste mit Weingrundkenntnissen.", cons: "Funktioniert bei Cuvées oder Multi-Rebsorten-Weinen nicht gut." },
    ],
    clarityTips: [
      { icon: List, title: "Verwenden Sie klare und konsistente Kategorien", desc: "Wählen Sie ein Hauptordnungskriterium und behalten Sie es in der gesamten Karte bei. Vermischen Sie nicht Regionen mit Rebsorten." },
      { icon: Layers, title: "Vermeiden Sie zu viele Unterkategorien", desc: "3-5 Hauptkategorien reichen aus. Wenn Sie mehr benötigen, ist das ein Zeichen für zu viele Referenzen." },
      { icon: BookOpen, title: "Beschreiben Sie die Weine einfach", desc: "Kurze Verkostungsnotizen, vorgeschlagene Speisenbegleitungen und eine Beschreibung, die jeder Gast verstehen kann." },
      { icon: Sparkles, title: "Heben Sie Empfehlungen hervor", desc: "Markieren Sie 2-3 Weine pro Kategorie als \"Sommelier-Auswahl\" oder \"Empfehlung\". Leiten Sie die Entscheidung des Gastes." },
    ],
    pricingConcepts: [
      { title: "Preistreppe", desc: "Verteilen Sie die Weine in einer natürlichen Preisprogression: Einstieg, Mitte, hoch. Jede Stufe sollte mindestens 2-3 Optionen haben, damit der Gast frei wählen kann." },
      { title: "Ausgewogene Preisklassen", desc: "Vermeiden Sie abrupte Preissprünge (von 18 € auf 45 € ohne Zwischenoptionen). Lücken in der Preistreppe verwirren oder drängen den Gast." },
      { title: "Ankerweine", desc: "Schließen Sie 1-2 Premium-Weine ein, die die Obergrenze der Karte definieren. Ihre Funktion ist nicht der Verkauf, sondern mittelpreisige Weine zugänglicher erscheinen zu lassen." },
    ],
    mistakes: [
      "Zu viele Organisationskriterien (Region + Rebsorte + Stil) in derselben Karte vermischen",
      "Zu lange Karten mit mehr als 250 Referenzen ohne Führung oder Management-System",
      "Keinen Glaswein anbieten und so Umsatz bei kleinen Tischen oder Weineinsteigern verlieren",
      "Zu technische Beschreibungen, die den durchschnittlichen Gast einschüchtern",
      "Die Karte nicht aktualisieren, wenn sich Jahrgänge ändern oder Referenzen ausgehen",
      "Mangelnde Kohärenz zwischen Weinkarte und gastronomischem Konzept",
    ],
    techBenefits: [
      { icon: Search, title: "Weine nach beliebigen Kriterien filtern", desc: "Der Gast wählt, wie er erkunden möchte: nach Typ, Preis, Region, Rebsorte oder Stil. Jeder findet seinen Weg." },
      { icon: BarChart3, title: "Referenzen einfach vergleichen", desc: "Vergleichende Ansicht ähnlicher Weine mit Preisen, Verkostungsnotizen und Speisenbegleitungen nebeneinander." },
      { icon: Globe, title: "Nach Stil oder Region erkunden", desc: "Visuelle Navigation mit Regionenkarten, Geschmacksprofilen und interaktiven Filtern." },
      { icon: Utensils, title: "Intelligente Speisenbegleitungen entdecken", desc: "Automatische Weinvorschläge je nach gewähltem Gericht. Der Gast entdeckt Weine, die er sonst nicht probiert hätte." },
    ],
    links: [
      { to: "/de/wie-viele-weine-karte", label: "Wie viele Weine sollte eine Karte haben", type: "guide" },
      { to: "/de/rentable-weinkarte-gestalten", label: "Rentable Weinkarte gestalten", type: "guide" },
      { to: "/de/weinkarten-analyse", label: "Weinkarten-Analyzer", type: "tool" },
      { to: "/de/ressourcen/weinkarten-vorlage", label: "Weinkarten-Vorlage", type: "resource" },
    ],
  },
  pt: {
    metaTitle: "Como Organizar uma Carta de Vinhos num Restaurante",
    metaDescription: "Guia prático para estruturar a sua carta de vinhos: métodos de organização, erros comuns, estrutura de preços e como a tecnologia pode ajudar.",
    url: "https://winerim.wine/pt/como-organizar-carta-de-vinhos",
    breadcrumb: "Como organizar carta de vinhos", badge: "Guia prático",
    h1pre: "Como organizar uma ", h1accent: "carta de vinhos", h1post: " num restaurante",
    heroSubtitle: "Guia prático para estruturar a sua carta de vinhos de forma clara, rentável e fácil de perceber pelo cliente.",
    ctaAnalyze: "Analisar a minha carta", ctaDemo: "Pedir demonstração",
    introTitle: "Uma carta mal organizada ", introAccent: "custa dinheiro",
    introDesc: "A carta de vinhos é uma das ferramentas de venda mais importantes de um restaurante. Contudo, muitas cartas estão mal estruturadas, gerando confusão no cliente e reduzindo as vendas de vinho.",
    methodsBadge: "Métodos", methodsTitle: "Formas de organizar uma ", methodsAccent: "carta de vinhos",
    clarityBadge: "Boas práticas", clarityTitle: "Como tornar a sua carta ", clarityAccent: "fácil de perceber",
    pricingBadge: "Estratégia de preços", pricingTitle: "A estrutura de preços ", pricingAccent: "importa",
    pricingDesc: "Organizar uma carta de vinhos não é apenas decidir a ordem das referências. A distribuição de preços influencia diretamente a decisão do cliente.",
    errorsBadge: "Evite estes erros", errorsTitle: "Erros comuns ao organizar uma ", errorsAccent: "carta de vinhos",
    techBadge: "Tecnologia", techTitle: "A carta digital: a melhor forma de ", techAccent: "organizar os seus vinhos",
    techDesc: "As cartas digitais eliminam as limitações do papel e permitem ao cliente explorar os vinhos da forma que preferir.",
    techNote: " transforma a sua carta de vinhos numa experiência interativa com filtros, harmonizações inteligentes, fichas de vinho e recomendações personalizadas. A sua carta sempre organizada, sempre atualizada.",
    techNoteHighlight: "Winerim",
    ctaBadge: "Análise gratuita", ctaTitle: "Descubra se a sua carta de vinhos está ", ctaAccent: "bem organizada",
    ctaDesc: "Analisamos a estrutura da sua carta e damos-lhe recomendações concretas para a melhorar.", ctaBtn: "Pedir análise gratuita",
    problems: [
      { icon: Layers, text: "Demasiadas referências sem critério claro de seleção" },
      { icon: List, text: "Categorias pouco claras que confundem o cliente" },
      { icon: Search, text: "Dificuldade em comparar vinhos entre si" },
      { icon: DollarSign, text: "Preços mal distribuídos com saltos bruscos entre opções" },
    ],
    orgMethods: [
      { title: "Por tipo de vinho", examples: "Tinto, branco, rosé, espumante, doce", pros: "Intuitivo para qualquer cliente. Fácil de navegar.", cons: "Pode ser pouco diferenciador com muitas referências por tipo." },
      { title: "Por região ou denominação", examples: "Douro, Alentejo, Vinho Verde, Rioja, Borgonha", pros: "Ideal para cartas com identidade geográfica. Transmite cultura vínica.", cons: "Pode confundir clientes que não conhecem as regiões." },
      { title: "Por estilo de vinho", examples: "Fresco e leve, frutado, estruturado, aromático, intenso", pros: "Muito acessível. Ajuda o cliente a escolher pelas suas preferências reais.", cons: "Exige bom conhecimento de cada vinho para o classificar." },
      { title: "Por casta", examples: "Touriga Nacional, Alvarinho, Arinto, Baga, Castelão", pros: "Claro para clientes com conhecimentos básicos de vinho.", cons: "Não funciona bem com lotes ou vinhos multi-casta." },
    ],
    clarityTips: [
      { icon: List, title: "Use categorias claras e consistentes", desc: "Escolha um critério principal de organização e mantenha-o em toda a carta. Não misture regiões com castas." },
      { icon: Layers, title: "Evite demasiadas subcategorias", desc: "3-5 categorias principais são suficientes. Se precisar de mais, é sinal de que tem demasiadas referências." },
      { icon: BookOpen, title: "Descreva os vinhos de forma simples", desc: "Notas de prova breves, harmonizações sugeridas e uma descrição que qualquer cliente consiga perceber." },
      { icon: Sparkles, title: "Destaque as recomendações", desc: "Assinale 2-3 vinhos por categoria como \"seleção do escanção\" ou \"recomendado\". Guie a decisão do cliente." },
    ],
    pricingConcepts: [
      { title: "Escala de preços", desc: "Distribua os vinhos numa progressão de preços natural: entrada, médio, alto. Cada degrau deve ter pelo menos 2-3 opções para que o cliente sinta que escolhe livremente." },
      { title: "Gamas equilibradas", desc: "Evite saltos de preço bruscos (de 18 € para 45 € sem opções intermédias). Os vazios na escala de preços fazem o cliente sentir-se perdido ou empurrado." },
      { title: "Vinhos âncora", desc: "Inclua 1-2 vinhos premium que definam o tecto da carta. A sua função não é venderem-se, mas tornar os vinhos de gama média mais acessíveis." },
    ],
    mistakes: [
      "Misturar demasiados critérios de organização (região + casta + estilo) na mesma carta",
      "Cartas demasiado longas com mais de 250 referências sem guia nem sistema de gestão",
      "Não oferecer vinho a copo, perdendo vendas de mesas pequenas ou de primeiros contactos com o vinho",
      "Descrições demasiado técnicas que intimidam o cliente médio",
      "Não atualizar a carta quando mudam as colheitas ou se esgotam referências",
      "Falta de coerência entre a carta de vinhos e a proposta gastronómica",
    ],
    techBenefits: [
      { icon: Search, title: "Filtrar vinhos por qualquer critério", desc: "O cliente escolhe como explorar: por tipo, preço, região, casta ou estilo. Cada um encontra o seu caminho." },
      { icon: BarChart3, title: "Comparar referências facilmente", desc: "Vista comparativa de vinhos semelhantes com preços, notas de prova e harmonizações lado a lado." },
      { icon: Globe, title: "Explorar por estilo ou região", desc: "Navegação visual com mapas de regiões, perfis de sabor e filtros interativos." },
      { icon: Utensils, title: "Descobrir harmonizações inteligentes", desc: "Sugestões automáticas de vinho consoante o prato escolhido. O cliente descobre vinhos que não teria provado." },
    ],
    links: [
      { to: "/pt/quantos-vinhos-carta-restaurante", label: "Quantos vinhos deve ter uma carta", type: "guide" },
      { to: "/pt/como-criar-carta-vinhos-rentavel", label: "Como criar uma carta rentável", type: "guide" },
      { to: "/pt/analisador-carta-de-vinhos", label: "Analisador de carta de vinhos", type: "tool" },
      { to: "/pt/recursos/modelo-carta-de-vinhos", label: "Modelo de carta de vinhos", type: "resource" },
    ],
  },
};

const ComoOrganizarCarta = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "organizar-carta-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.metaTitle,
      description: t.metaDescription,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: t.url,
      inLanguage: lang,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("organizar-carta-jsonld")?.remove(); };
  }, [t, lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} type="article"
        hreflang={allLangPaths("/blog/como-organizar-carta-de-vinos")} />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: t.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            {t.h1pre}<span className="text-gradient-wine italic">{t.h1accent}</span>{t.h1post}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/wine-list-analyzer" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaAnalyze} <ArrowRight size={16} />
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaDemo}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                {t.introTitle}<span className="text-gradient-wine italic">{t.introAccent}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t.introDesc}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.problems.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-destructive/5 rounded-lg p-4 border border-destructive/10">
                    <AlertTriangle size={16} className="text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FORMAS DE ORGANIZAR */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.methodsBadge}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.methodsTitle}<span className="text-gradient-wine italic">{t.methodsAccent}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {t.orgMethods.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-bold mb-2">{m.title}</h3>
                  <p className="text-xs text-wine font-medium mb-3">{m.examples}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{m.pros}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle size={14} className="text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{m.cons}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÓMO HACER LA CARTA FÁCIL */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.clarityBadge}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.clarityTitle}<span className="text-gradient-wine italic">{t.clarityAccent}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {t.clarityTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. IMPORTANCIA DEL PRECIO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.pricingBadge}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.pricingTitle}<span className="text-gradient-wine italic">{t.pricingAccent}</span>
            </h2>
          </ScrollReveal>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">{t.pricingDesc}</p>
          <div className="space-y-5">
            {t.pricingConcepts.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign size={18} className="text-wine" />
                    <h3 className="font-heading font-bold">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ERRORES COMUNES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.errorsBadge}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.errorsTitle}<span className="text-gradient-wine italic">{t.errorsAccent}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.mistakes.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                  <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{m}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CÓMO AYUDA LA TECNOLOGÍA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.techBadge}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.techTitle}<span className="text-gradient-wine italic">{t.techAccent}</span>
            </h2>
          </ScrollReveal>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">{t.techDesc}</p>
          <div className="grid md:grid-cols-2 gap-5">
            {t.techBenefits.map((tb, i) => {
              const Icon = tb.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{tb.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tb.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-8 bg-wine/5 rounded-xl border border-wine/10 p-6 text-center">
              <Sparkles size={20} className="text-wine mx-auto mb-3" />
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                <strong className="text-foreground">{t.techNoteHighlight}</strong>{t.techNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle}<span className="text-gradient-wine italic">{t.ctaAccent}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link to="/wine-list-analyzer" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaBtn} <ArrowRight size={16} />
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

export default ComoOrganizarCarta;
