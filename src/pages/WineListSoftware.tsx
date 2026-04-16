import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, TrendingUp, Target, Search,
  Utensils, Eye, ShoppingCart, Users, RotateCcw, Layers,
  AlertTriangle, FileText, Smartphone, Cpu, CheckCircle, XCircle, Minus
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import mockupImg from "@/assets/winerim-mockup.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n } from "@/i18n/types";

/* ─── i18n ─── */
type WLT = {
  seoTitle: string; seoDesc: string; seoUrl: string;
  badge: string;
  heroTitle1: string; heroHighlight: string;
  heroDesc: string;
  ctaDemo: string; ctaAnalyse: string;
  problemLabel: string;
  problemTitle1: string; problemHighlight: string;
  problemIntro: string;
  problems: string[];
  solutionLabel: string;
  solutionTitle1: string; solutionHighlight: string;
  solutionIntro: string;
  capabilities: string[];
  featuresLabel: string;
  featuresTitle1: string; featuresHighlight: string;
  features: { title: string; desc: string }[];
  benefitsLabel: string;
  benefitsTitle1: string; benefitsHighlight: string;
  benefits: string[];
  resultsLabel: string;
  resultsTitle1: string; resultsHighlight: string;
  resultsIntro: string;
  resultItems: { label: string; desc: string }[];
  resultStats: { value: string; label: string }[];
  compLabel: string;
  compTitle1: string; compHighlight: string;
  compIntro: string;
  compHeaders: [string, string, string, string];
  compRows: { feature: string; paper: boolean | "partial"; pdf: boolean | "partial"; digital: boolean }[];
  ctaLabel: string;
  ctaTitle1: string; ctaHighlight: string;
  ctaDesc: string;
  ctaDemoBtn: string; ctaContactBtn: string;
  faqItems: { q: string; a: string }[];
  hreflang: { lang: string; url: string }[];
};

const featureIcons = [Smartphone, Search, Utensils, Layers, Eye, Target];
const benefitIcons = [TrendingUp, RotateCcw, Users, Wine, ShoppingCart];
const problemIcons = [Eye, AlertTriangle, TrendingUp, FileText, BarChart3];

const es: WLT = {
  seoTitle: "Software de Carta de Vinos para Restaurantes | Winerim",
  seoDesc: "Gestiona tu carta de vinos, optimiza tu bodega y aumenta las ventas con software inteligente diseñado para hostelería.",
  seoUrl: "https://winerim.wine/software-carta-de-vinos",
  badge: "Software de carta de vinos",
  heroTitle1: "Software de Carta de Vinos para ",
  heroHighlight: "Restaurantes",
  heroDesc: "Gestiona tu carta de vinos, optimiza tu bodega y aumenta las ventas con una plataforma inteligente diseñada para hostelería.",
  ctaDemo: "Solicitar demo", ctaAnalyse: "Analizar mi carta",
  problemLabel: "El problema",
  problemTitle1: "Las cartas estáticas te están ", problemHighlight: "costando ventas",
  problemIntro: "La mayoría de restaurantes todavía dependen de cartas en papel o PDF difíciles de navegar, imposibles de personalizar y que no ayudan al comensal a elegir ni a gastar más.",
  problems: [
    "Cartas de vinos difíciles de entender",
    "Falta de recomendaciones para el comensal",
    "Estructura de precios deficiente",
    "Difícil actualizar referencias",
    "Sin analítica ni datos de ventas",
  ],
  solutionLabel: "La solución",
  solutionTitle1: "¿Qué es un software de ",
  solutionHighlight: "gestión de carta de vinos",
  solutionIntro: "Una plataforma especializada que transforma cómo los restaurantes gestionan, presentan y venden vino.",
  capabilities: [
    "Gestiona todas las referencias en un solo lugar",
    "Organiza la carta con categorías claras",
    "Recomienda vinos según preferencias del cliente",
    "Muestra maridajes al instante",
    "Mejora la experiencia en mesa",
    "Analiza datos de venta para optimizar tu bodega",
  ],
  featuresLabel: "Funcionalidades",
  featuresTitle1: "Funcionalidades clave de un software ",
  featuresHighlight: "moderno de carta de vinos",
  features: [
    { title: "Carta digital", desc: "Una carta interactiva accesible desde cualquier dispositivo. Siempre actualizada, fácil de navegar y diseñada para vender." },
    { title: "Filtros inteligentes", desc: "El comensal filtra por uva, región, estilo o precio. Encuentra el vino perfecto en segundos." },
    { title: "Sugerencias de maridaje", desc: "Recomendaciones automáticas que conectan vinos con platos de tu menú." },
    { title: "Comparador de vinos", desc: "Comparación lado a lado con notas de cata, origen y precio." },
    { title: "Descripciones interactivas", desc: "Notas de cata claras, historias de productores y perfiles visuales que hacen accesible cada vino." },
    { title: "Motor de recomendación", desc: "Sugerencias con IA basadas en preferencias, platos seleccionados y contexto para aumentar el gasto medio." },
  ],
  benefitsLabel: "Beneficios",
  benefitsTitle1: "Por qué los restaurantes eligen ",
  benefitsHighlight: "software de carta de vinos",
  benefits: [
    "Aumentar las ventas de vino",
    "Mejorar la rotación de la carta",
    "Ayudar al equipo a recomendar",
    "Mejorar la experiencia del comensal",
    "Hacer el vino más comprensible",
  ],
  resultsLabel: "Resultados",
  resultsTitle1: "Impacto real en los ",
  resultsHighlight: "ingresos por vino",
  resultsIntro: "Los restaurantes que usan plataformas inteligentes de carta de vinos obtienen mejoras medibles.",
  resultItems: [
    { label: "Más ventas de vino", desc: "Recomendaciones guiadas y descripciones claras ayudan al comensal a elegir con confianza." },
    { label: "Mejores márgenes", desc: "Visibilidad estratégica de precios y posicionamiento inteligente conducen al comensal hacia vinos de mayor valor." },
    { label: "Gestión eficiente de bodega", desc: "Datos en tiempo real sobre qué se vende, qué no y dónde están los huecos." },
  ],
  resultStats: [
    { value: "+22%", label: "Aumento de ticket medio" },
    { value: "+35%", label: "Crecimiento pedidos de vino" },
    { value: "3×", label: "Actualización más rápida" },
    { value: "90%", label: "Confianza del equipo" },
  ],
  compLabel: "Comparativa",
  compTitle1: "Por qué las cartas digitales son el ",
  compHighlight: "futuro",
  compIntro: "Descubre cómo el software inteligente se compara con los formatos tradicionales.",
  compHeaders: ["Característica", "Papel", "PDF", "Digital"],
  compRows: [
    { feature: "Fácil de actualizar", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Filtros interactivos", paper: false, pdf: false, digital: true },
    { feature: "Maridajes", paper: false, pdf: false, digital: true },
    { feature: "Recomendaciones", paper: false, pdf: false, digital: true },
    { feature: "Analítica de ventas", paper: false, pdf: false, digital: true },
    { feature: "Diseño amigable", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Siempre actualizada", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Adaptada a móvil", paper: false, pdf: "partial" as const, digital: true },
  ],
  ctaLabel: "Empieza ahora",
  ctaTitle1: "Convierte tu carta de vinos en un sistema que ",
  ctaHighlight: "vende más vino",
  ctaDesc: "Descubre cómo Winerim puede transformar tu programa de vinos. Solicita una demo y conoce el potencial de tu carta.",
  ctaDemoBtn: "Solicitar demo", ctaContactBtn: "Contactar",
  faqItems: [
    { q: "¿Qué es un software de gestión de carta de vinos?", a: "Es una plataforma especializada que ayuda a los restaurantes a digitalizar, organizar y optimizar su carta de vinos. Incluye filtros inteligentes, sugerencias de maridaje y analítica de ventas." },
    { q: "¿Cómo aumenta las ventas un software de carta digital?", a: "Facilita el descubrimiento de vinos con filtros y recomendaciones, sugiere maridajes que motivan pedidos y ofrece descripciones claras que ayudan al comensal a elegir con confianza." },
    { q: "¿Cuáles son las ventajas de una carta digital frente a papel o PDF?", a: "Las cartas digitales están siempre actualizadas, ofrecen funciones interactivas, proporcionan analítica de ventas, funcionan en cualquier dispositivo y venden activamente mediante recomendaciones inteligentes." },
  ],
  hreflang: [
    { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
    { lang: "en", url: "https://winerim.wine/wine-list-management-software" },
    { lang: "it", url: "https://winerim.wine/it/software-carta-vini" },
    { lang: "fr", url: "https://winerim.wine/fr/logiciel-carte-des-vins" },
  ],
};

const en: WLT = {
  seoTitle: "Wine List Management Software for Restaurants | Winerim",
  seoDesc: "Manage your wine list, optimize your cellar and increase wine sales with intelligent software designed for hospitality.",
  seoUrl: "https://winerim.wine/wine-list-management-software",
  badge: "Wine List Software",
  heroTitle1: "Wine List Management Software for ",
  heroHighlight: "Restaurants",
  heroDesc: "Manage your wine list, optimize your cellar and increase wine sales with an intelligent platform designed for hospitality.",
  ctaDemo: "Request a demo", ctaAnalyse: "Analyze my wine list",
  problemLabel: "The problem",
  problemTitle1: "Static wine lists are ", problemHighlight: "costing you sales",
  problemIntro: "Most restaurants still rely on paper or PDF wine lists that are difficult to navigate, impossible to personalize, and do nothing to help guests choose — or spend more.",
  problems: [
    "Wine lists difficult to understand",
    "Lack of recommendations for guests",
    "Poor pricing structure",
    "Hard to update references",
    "No analytics or sales insights",
  ],
  solutionLabel: "The solution",
  solutionTitle1: "What is wine list ",
  solutionHighlight: "management software",
  solutionIntro: "A specialized platform that transforms how restaurants manage, present, and sell wine.",
  capabilities: [
    "Manage all wine references in one place",
    "Organize wine lists with clear categories",
    "Recommend wines based on guest preferences",
    "Show food and wine pairings instantly",
    "Improve the guest experience at the table",
    "Analyze sales data to optimize your cellar",
  ],
  featuresLabel: "Features",
  featuresTitle1: "Key features of modern ",
  featuresHighlight: "wine list software",
  features: [
    { title: "Digital wine list", desc: "A beautiful, interactive wine list accessible on any device. Always up to date, easy to navigate, and designed to sell." },
    { title: "Smart filters", desc: "Let guests filter by grape, region, style, or price. They find the perfect wine in seconds instead of scrolling through pages." },
    { title: "Food pairing suggestions", desc: "Automatic pairing recommendations that match wines to dishes on your menu, helping guests make confident choices." },
    { title: "Wine comparison tools", desc: "Side-by-side wine comparisons with tasting notes, origin, and price so guests can evaluate options clearly." },
    { title: "Interactive descriptions", desc: "Clear tasting notes, producer stories, and visual profiles that make every wine approachable — no sommelier required." },
    { title: "Recommendation engine", desc: "AI-powered suggestions based on guest preferences, selected dishes, and context to increase average spend." },
  ],
  benefitsLabel: "Benefits",
  benefitsTitle1: "Why restaurants choose ",
  benefitsHighlight: "wine list software",
  benefits: [
    "Increase wine sales",
    "Improve wine list rotation",
    "Help staff recommend wines",
    "Enhance guest experience",
    "Make wine easier to understand",
  ],
  resultsLabel: "Results",
  resultsTitle1: "Real impact on ",
  resultsHighlight: "wine revenue",
  resultsIntro: "Restaurants using intelligent wine list platforms consistently report measurable improvements across their wine program.",
  resultItems: [
    { label: "Higher wine sales", desc: "Guided recommendations and clear descriptions help guests choose — and spend — more confidently." },
    { label: "Better margins", desc: "Strategic pricing visibility and smart positioning move guests toward higher-value wines naturally." },
    { label: "Efficient cellar management", desc: "Real-time data on what sells, what doesn't, and where the gaps are helps optimize purchasing decisions." },
  ],
  resultStats: [
    { value: "+22%", label: "Average ticket increase" },
    { value: "+35%", label: "Wine orders growth" },
    { value: "3×", label: "Faster list updates" },
    { value: "90%", label: "Staff confidence" },
  ],
  compLabel: "Comparison",
  compTitle1: "Why digital wine lists are the ",
  compHighlight: "future",
  compIntro: "See how intelligent wine list software compares to traditional formats.",
  compHeaders: ["Feature", "Paper", "PDF", "Digital"],
  compRows: [
    { feature: "Easy to update", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Interactive filters", paper: false, pdf: false, digital: true },
    { feature: "Food pairings", paper: false, pdf: false, digital: true },
    { feature: "Wine recommendations", paper: false, pdf: false, digital: true },
    { feature: "Sales analytics", paper: false, pdf: false, digital: true },
    { feature: "Guest-friendly design", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Always accurate", paper: false, pdf: "partial" as const, digital: true },
    { feature: "Mobile-friendly", paper: false, pdf: "partial" as const, digital: true },
  ],
  ctaLabel: "Get started",
  ctaTitle1: "Turn your wine list into a system that ",
  ctaHighlight: "sells more wine",
  ctaDesc: "See how Winerim can transform your wine program. Request a demo and discover the potential of your wine list.",
  ctaDemoBtn: "Request a demo", ctaContactBtn: "Contact us",
  faqItems: [
    { q: "What is wine list management software?", a: "Wine list management software is a specialized platform that helps restaurants digitize, organize, and optimize their wine lists. It includes features like smart filters, food pairing suggestions, and sales analytics to increase wine revenue." },
    { q: "How does digital wine list software increase wine sales?", a: "Digital wine list software increases sales by making wines easier to discover through filters and recommendations, suggesting food pairings that encourage orders, and providing clear descriptions that help guests choose with confidence." },
    { q: "What are the advantages of a digital wine list over paper or PDF?", a: "Digital wine lists are always up to date, offer interactive features like filters and pairings, provide sales analytics, work on any device, and actively help sell wine through intelligent recommendations — unlike static paper or PDF lists." },
  ],
  hreflang: es.hreflang,
};

const it: WLT = {
  seoTitle: "Software Carta dei Vini per Ristoranti | Winerim",
  seoDesc: "Gestisci la tua carta dei vini, ottimizza la cantina e aumenta le vendite con un software intelligente progettato per la ristorazione.",
  seoUrl: "https://winerim.wine/it/software-carta-vini",
  badge: "Software carta dei vini",
  heroTitle1: "Software Carta dei Vini per ",
  heroHighlight: "Ristoranti",
  heroDesc: "Gestisci la tua carta dei vini, ottimizza la cantina e aumenta le vendite con una piattaforma intelligente progettata per la ristorazione.",
  ctaDemo: "Richiedi demo", ctaAnalyse: "Analizza la mia carta",
  problemLabel: "Il problema",
  problemTitle1: "Le carte statiche ti stanno ", problemHighlight: "facendo perdere vendite",
  problemIntro: "La maggior parte dei ristoranti si affida ancora a carte cartacee o PDF difficili da navigare, impossibili da personalizzare e che non aiutano il cliente a scegliere né a spendere di più.",
  problems: [
    "Carte dei vini difficili da capire",
    "Mancanza di raccomandazioni per il cliente",
    "Struttura dei prezzi inadeguata",
    "Difficoltà nell'aggiornare le referenze",
    "Nessuna analitica né dati di vendita",
  ],
  solutionLabel: "La soluzione",
  solutionTitle1: "Cos'è un software di ",
  solutionHighlight: "gestione della carta dei vini",
  solutionIntro: "Una piattaforma specializzata che trasforma il modo in cui i ristoranti gestiscono, presentano e vendono vino.",
  capabilities: [
    "Gestisci tutte le referenze in un unico posto",
    "Organizza la carta con categorie chiare",
    "Raccomanda vini in base alle preferenze del cliente",
    "Mostra abbinamenti cibo-vino all'istante",
    "Migliora l'esperienza al tavolo",
    "Analizza i dati di vendita per ottimizzare la cantina",
  ],
  featuresLabel: "Funzionalità",
  featuresTitle1: "Funzionalità chiave di un software ",
  featuresHighlight: "moderno per carte dei vini",
  features: [
    { title: "Carta digitale", desc: "Una carta interattiva accessibile da qualsiasi dispositivo. Sempre aggiornata, facile da navigare e progettata per vendere." },
    { title: "Filtri intelligenti", desc: "Il cliente filtra per vitigno, regione, stile o prezzo. Trova il vino perfetto in pochi secondi." },
    { title: "Suggerimenti di abbinamento", desc: "Raccomandazioni automatiche che collegano vini e piatti del tuo menu." },
    { title: "Comparatore di vini", desc: "Confronto fianco a fianco con note di degustazione, origine e prezzo." },
    { title: "Descrizioni interattive", desc: "Note di degustazione chiare, storie dei produttori e profili visivi che rendono ogni vino accessibile." },
    { title: "Motore di raccomandazione", desc: "Suggerimenti basati su IA secondo preferenze, piatti selezionati e contesto per aumentare lo scontrino medio." },
  ],
  benefitsLabel: "Vantaggi",
  benefitsTitle1: "Perché i ristoranti scelgono un ",
  benefitsHighlight: "software per la carta dei vini",
  benefits: [
    "Aumentare le vendite di vino",
    "Migliorare la rotazione della carta",
    "Aiutare lo staff a raccomandare",
    "Migliorare l'esperienza del cliente",
    "Rendere il vino più comprensibile",
  ],
  resultsLabel: "Risultati",
  resultsTitle1: "Impatto reale sui ",
  resultsHighlight: "ricavi del vino",
  resultsIntro: "I ristoranti che usano piattaforme intelligenti per la carta dei vini ottengono miglioramenti misurabili.",
  resultItems: [
    { label: "Più vendite di vino", desc: "Raccomandazioni guidate e descrizioni chiare aiutano il cliente a scegliere con sicurezza." },
    { label: "Margini migliori", desc: "Visibilità strategica dei prezzi e posizionamento intelligente guidano il cliente verso vini di maggior valore." },
    { label: "Gestione efficiente della cantina", desc: "Dati in tempo reale su cosa si vende, cosa no e dove sono le lacune." },
  ],
  resultStats: [
    { value: "+22%", label: "Aumento scontrino medio" },
    { value: "+35%", label: "Crescita ordini vino" },
    { value: "3×", label: "Aggiornamento più rapido" },
    { value: "90%", label: "Fiducia dello staff" },
  ],
  compLabel: "Confronto",
  compTitle1: "Perché le carte digitali sono il ",
  compHighlight: "futuro",
  compIntro: "Scopri come il software intelligente si confronta con i formati tradizionali.",
  compHeaders: ["Caratteristica", "Carta", "PDF", "Digitale"],
  compRows: es.compRows.map((r, i) => ({
    ...r,
    feature: ["Facile da aggiornare", "Filtri interattivi", "Abbinamenti", "Raccomandazioni", "Analitica vendite", "Design intuitivo", "Sempre aggiornata", "Adatta al mobile"][i],
  })),
  ctaLabel: "Inizia ora",
  ctaTitle1: "Trasforma la tua carta in un sistema che ",
  ctaHighlight: "vende più vino",
  ctaDesc: "Scopri come Winerim può trasformare il tuo programma vini. Richiedi una demo e scopri il potenziale della tua carta.",
  ctaDemoBtn: "Richiedi demo", ctaContactBtn: "Contattaci",
  faqItems: [
    { q: "Cos'è un software di gestione della carta dei vini?", a: "È una piattaforma specializzata che aiuta i ristoranti a digitalizzare, organizzare e ottimizzare la carta dei vini. Include filtri intelligenti, suggerimenti di abbinamento e analitica delle vendite." },
    { q: "Come aumenta le vendite un software di carta digitale?", a: "Facilita la scoperta dei vini con filtri e raccomandazioni, suggerisce abbinamenti e offre descrizioni chiare che aiutano il cliente a scegliere con sicurezza." },
    { q: "Quali sono i vantaggi di una carta digitale rispetto a carta o PDF?", a: "Le carte digitali sono sempre aggiornate, offrono funzionalità interattive, forniscono analitica delle vendite, funzionano su qualsiasi dispositivo e vendono attivamente tramite raccomandazioni intelligenti." },
  ],
  hreflang: es.hreflang,
};

const fr: WLT = {
  seoTitle: "Logiciel de Carte des Vins pour Restaurants | Winerim",
  seoDesc: "Gérez votre carte des vins, optimisez votre cave et augmentez les ventes avec un logiciel intelligent conçu pour la restauration.",
  seoUrl: "https://winerim.wine/fr/logiciel-carte-des-vins",
  badge: "Logiciel carte des vins",
  heroTitle1: "Logiciel de Carte des Vins pour ",
  heroHighlight: "Restaurants",
  heroDesc: "Gérez votre carte des vins, optimisez votre cave et augmentez les ventes avec une plateforme intelligente conçue pour la restauration.",
  ctaDemo: "Demander une démo", ctaAnalyse: "Analyser ma carte",
  problemLabel: "Le problème",
  problemTitle1: "Les cartes statiques vous font ", problemHighlight: "perdre des ventes",
  problemIntro: "La plupart des restaurants s'appuient encore sur des cartes papier ou PDF difficiles à naviguer, impossibles à personnaliser et qui n'aident pas le client à choisir ni à dépenser davantage.",
  problems: [
    "Cartes des vins difficiles à comprendre",
    "Absence de recommandations pour le client",
    "Structure de prix inadéquate",
    "Mises à jour des références laborieuses",
    "Aucune analytique ni données de ventes",
  ],
  solutionLabel: "La solution",
  solutionTitle1: "Qu'est-ce qu'un logiciel de ",
  solutionHighlight: "gestion de carte des vins",
  solutionIntro: "Une plateforme spécialisée qui transforme la façon dont les restaurants gèrent, présentent et vendent le vin.",
  capabilities: [
    "Gérez toutes les références en un seul endroit",
    "Organisez la carte avec des catégories claires",
    "Recommandez des vins selon les préférences du client",
    "Affichez les accords mets-vins instantanément",
    "Améliorez l'expérience en salle",
    "Analysez les données de ventes pour optimiser votre cave",
  ],
  featuresLabel: "Fonctionnalités",
  featuresTitle1: "Fonctionnalités clés d'un logiciel ",
  featuresHighlight: "moderne de carte des vins",
  features: [
    { title: "Carte digitale", desc: "Une carte interactive accessible depuis n'importe quel appareil. Toujours à jour, facile à naviguer et conçue pour vendre." },
    { title: "Filtres intelligents", desc: "Le client filtre par cépage, région, style ou prix. Il trouve le vin idéal en quelques secondes." },
    { title: "Suggestions d'accords", desc: "Recommandations automatiques reliant vins et plats de votre menu." },
    { title: "Comparateur de vins", desc: "Comparaison côte à côte avec notes de dégustation, origine et prix." },
    { title: "Descriptions interactives", desc: "Notes de dégustation claires, histoires de producteurs et profils visuels rendant chaque vin accessible." },
    { title: "Moteur de recommandation", desc: "Suggestions basées sur l'IA selon les préférences, les plats choisis et le contexte pour augmenter le ticket moyen." },
  ],
  benefitsLabel: "Avantages",
  benefitsTitle1: "Pourquoi les restaurants choisissent un ",
  benefitsHighlight: "logiciel de carte des vins",
  benefits: [
    "Augmenter les ventes de vin",
    "Améliorer la rotation de la carte",
    "Aider le personnel à recommander",
    "Améliorer l'expérience client",
    "Rendre le vin plus compréhensible",
  ],
  resultsLabel: "Résultats",
  resultsTitle1: "Impact réel sur le ",
  resultsHighlight: "chiffre d'affaires vin",
  resultsIntro: "Les restaurants utilisant des plateformes intelligentes de carte des vins constatent des améliorations mesurables.",
  resultItems: [
    { label: "Plus de ventes de vin", desc: "Recommandations guidées et descriptions claires aident le client à choisir avec confiance." },
    { label: "Meilleurs marges", desc: "Visibilité stratégique des prix et positionnement intelligent orientent le client vers des vins de plus grande valeur." },
    { label: "Gestion efficace de la cave", desc: "Données en temps réel sur ce qui se vend, ce qui ne se vend pas et où sont les manques." },
  ],
  resultStats: [
    { value: "+22%", label: "Augmentation du ticket moyen" },
    { value: "+35%", label: "Croissance des commandes de vin" },
    { value: "3×", label: "Mise à jour plus rapide" },
    { value: "90%", label: "Confiance du personnel" },
  ],
  compLabel: "Comparatif",
  compTitle1: "Pourquoi les cartes digitales sont l'",
  compHighlight: "avenir",
  compIntro: "Découvrez comment le logiciel intelligent se compare aux formats traditionnels.",
  compHeaders: ["Caractéristique", "Papier", "PDF", "Digital"],
  compRows: es.compRows.map((r, i) => ({
    ...r,
    feature: ["Facile à mettre à jour", "Filtres interactifs", "Accords mets-vins", "Recommandations", "Analytique des ventes", "Design convivial", "Toujours à jour", "Adapté au mobile"][i],
  })),
  ctaLabel: "Commencez maintenant",
  ctaTitle1: "Transformez votre carte en un système qui ",
  ctaHighlight: "vend plus de vin",
  ctaDesc: "Découvrez comment Winerim peut transformer votre programme vins. Demandez une démo et explorez le potentiel de votre carte.",
  ctaDemoBtn: "Demander une démo", ctaContactBtn: "Nous contacter",
  faqItems: [
    { q: "Qu'est-ce qu'un logiciel de gestion de carte des vins ?", a: "C'est une plateforme spécialisée qui aide les restaurants à numériser, organiser et optimiser leur carte des vins. Il inclut des filtres intelligents, des suggestions d'accords et des analyses de ventes." },
    { q: "Comment un logiciel de carte digitale augmente-t-il les ventes ?", a: "Il facilite la découverte des vins grâce aux filtres et recommandations, suggère des accords encourageant les commandes et fournit des descriptions claires aidant le client à choisir avec confiance." },
    { q: "Quels sont les avantages d'une carte digitale par rapport au papier ou PDF ?", a: "Les cartes digitales sont toujours à jour, offrent des fonctionnalités interactives, fournissent des analyses de ventes, fonctionnent sur tout appareil et vendent activement grâce à des recommandations intelligentes." },
  ],
  hreflang: es.hreflang,
};

const i18n: Record<string, WLT> = { es, en, it, fr };

const ComparisonIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <CheckCircle size={18} className="text-wine mx-auto" />;
  if (value === "partial") return <Minus size={18} className="text-muted-foreground mx-auto" />;
  return <XCircle size={18} className="text-muted-foreground/40 mx-auto" />;
};

const WineListSoftware = () => {
  const { lang, localePath } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "winelist-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqSchema);

    const breadcrumbSchema = document.createElement("script");
    breadcrumbSchema.id = "winelist-breadcrumb-jsonld";
    breadcrumbSchema.type = "application/ld+json";
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: t.seoTitle.split("|")[0].trim(), item: t.seoUrl },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    return () => {
      document.getElementById("winelist-faq-jsonld")?.remove();
      document.getElementById("winelist-breadcrumb-jsonld")?.remove();
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={t.seoUrl} hreflang={t.hreflang} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Wine size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8">
                {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroHighlight}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                {t.heroDesc}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
                <Link to={localePath("/demo")} className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center">
                  {t.ctaDemo}
                </Link>
                <Link to={localePath("/analisis-carta")} className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300">
                  {t.ctaAnalyse}
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                <img src={mockupImg} alt="Winerim digital wine list software showing analytics dashboard on tablet and mobile" className="relative w-full max-w-lg mx-auto drop-shadow-2xl" loading="eager" fetchPriority="high" width={800} height={600} />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* PROBLEMS */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.problemTitle1}<span className="text-gradient-wine italic">{t.problemHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.problemIntro}</p>
            <div className="space-y-3">
              {t.problems.map((text, i) => {
                const Icon = problemIcons[i];
                return (
                  <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                    <Icon size={18} className="text-destructive shrink-0" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solutionLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.solutionTitle1}<span className="text-gradient-wine italic">{t.solutionHighlight}</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.solutionIntro}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {t.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featuresLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.featuresTitle1}<span className="text-gradient-wine italic">{t.featuresHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.benefitsLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.benefitsTitle1}<span className="text-gradient-wine italic">{t.benefitsHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.benefits.map((text, i) => {
              const Icon = benefitIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.resultsLabel}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.resultsTitle1}<span className="text-gradient-wine italic">{t.resultsHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.resultsIntro}</p>
              <div className="space-y-5">
                {t.resultItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu size={16} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {t.resultStats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="bg-gradient-card rounded-xl border border-border p-6 text-center hover:border-wine/30 transition-all duration-300">
                    <p className="font-heading text-3xl font-bold text-gradient-wine mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.compLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.compTitle1}<span className="text-gradient-wine italic">{t.compHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.compIntro}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {t.compHeaders.map((h, i) => (
                        <th key={i} className={`p-4 font-semibold ${i === 0 ? "text-left" : "text-center"} ${i === 3 ? "text-wine" : i > 0 ? "text-muted-foreground" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.compRows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="p-4">{row.feature}</td>
                        <td className="p-4"><ComparisonIcon value={row.paper} /></td>
                        <td className="p-4"><ComparisonIcon value={row.pdf} /></td>
                        <td className="p-4"><ComparisonIcon value={row.digital} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle1}<span className="text-gradient-wine italic">{t.ctaHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaDemoBtn} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/contacto")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {t.ctaContactBtn}
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

export default WineListSoftware;
