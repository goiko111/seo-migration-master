import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Smartphone, BarChart3, TrendingUp, Target,
  Utensils, Users, ShoppingCart, Search, Eye, Layers, Upload,
  Cpu, RotateCcw, Building2, Hotel, Store, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

type QT = {
  metaTitle: string; metaDesc: string; breadLabel: string; badge: string;
  heroTitle1: string; heroHighlight: string; heroDesc: string;
  ctaDemo: string; ctaAnalyze: string;
  defLabel: string; defTitle1: string; defHighlight: string; defDesc: string;
  defItems: string[];
  problemLabel: string; problemTitle1: string; problemHighlight: string; problemDesc: string;
  problems: { title: string; desc: string }[];
  processLabel: string; processTitle1: string; processHighlight: string;
  steps: { title: string; desc: string }[];
  featLabel: string; featTitle1: string; featHighlight: string;
  features: { title: string; desc: string }[];
  benefitLabel: string; benefitTitle1: string; benefitHighlight: string;
  benefits: string[];
  audienceLabel: string; audienceTitle1: string; audienceHighlight: string;
  audiences: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaFLabel: string; ctaFTitle1: string; ctaFHighlight: string; ctaFDesc: string; ctaFDemo: string; ctaFAnalyze: string;
  links: { label: string }[];
};

const qt: Record<string, QT> = {
  es: {
    metaTitle: "Qué es Winerim | Software Inteligente de Carta de Vinos",
    metaDesc: "Winerim es una plataforma inteligente que ayuda a restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente con carta digital, IA y analítica.",
    breadLabel: "Qué es Winerim", badge: "La plataforma",
    heroTitle1: "Qué es ", heroHighlight: "Winerim",
    heroDesc: "Winerim es una plataforma inteligente diseñada para ayudar a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente.",
    ctaDemo: "Solicitar demo", ctaAnalyze: "Analizar mi carta de vinos",
    defLabel: "Definición", defTitle1: "Un software que convierte tu carta en una herramienta de ", defHighlight: "venta",
    defDesc: "Winerim es un software especializado en la gestión y optimización de cartas de vino en restaurantes. Combina tecnología avanzada con conocimiento enológico para transformar la forma en que los restaurantes presentan, recomiendan y venden vino.",
    defItems: ["Carta digital interactiva", "Recomendaciones inteligentes con IA", "Analítica de ventas en tiempo real", "Gestión integral de bodega", "Optimización de precios", "Maridajes automáticos con platos"],
    problemLabel: "El problema", problemTitle1: "Qué problema ", problemHighlight: "resuelve",
    problemDesc: "El vino es el producto con mayor margen en hostelería, pero la mayoría de restaurantes no aprovechan su potencial.",
    problems: [
      { title: "Cartas difíciles de entender", desc: "Listados largos sin contexto ni estructura que abruman al comensal y le empujan a elegir lo más barato o lo más conocido." },
      { title: "Clientes inseguros al elegir vino", desc: "Sin recomendaciones claras, el cliente siente que puede equivocarse. El resultado: no pide vino o pide el de siempre." },
      { title: "Personal sin tiempo para recomendar", desc: "En servicio, el equipo de sala no siempre puede dedicar tiempo a explicar la carta de vinos a cada mesa." },
      { title: "Vinos que no rotan", desc: "Referencias que se estancan en bodega por estar mal posicionadas en precio, estilo duplicado o falta de visibilidad." },
      { title: "Decisiones basadas en intuición", desc: "Compras, precios y estructura de carta se deciden sin datos reales de rendimiento ni análisis de ventas." },
    ],
    processLabel: "El proceso", processTitle1: "Cómo ", processHighlight: "funciona",
    steps: [
      { title: "Carga tu carta de vinos", desc: "Sube tu carta actual en cualquier formato. Winerim importa y estructura toda la información automáticamente." },
      { title: "Winerim organiza y optimiza", desc: "El sistema analiza precios, categorías, estilos y detecta oportunidades de mejora en la estructura de la carta." },
      { title: "Los clientes interactúan", desc: "Los comensales acceden a una carta digital inteligente con filtros, maridajes y recomendaciones personalizadas." },
      { title: "Obtén datos y recomendaciones", desc: "El restaurante recibe analítica de ventas, métricas de rendimiento y sugerencias de optimización continua." },
    ],
    featLabel: "Funcionalidades", featTitle1: "Todo lo que necesitas para ", featHighlight: "vender más vino",
    features: [
      { title: "Carta digital interactiva", desc: "Una carta de vinos visual, navegable y siempre actualizada que funciona en cualquier dispositivo." },
      { title: "Recomendaciones de vino", desc: "IA que sugiere el vino ideal según las preferencias del comensal, el plato elegido y el contexto." },
      { title: "Maridajes con platos", desc: "Propuestas de maridaje automáticas que vinculan cada vino con los platos del menú." },
      { title: "Filtros y comparador", desc: "El cliente filtra por tipo, región, precio o estilo y compara vinos lado a lado con información clara." },
      { title: "Analítica de ventas", desc: "Dashboards con datos reales sobre qué se vende, qué rota, qué margen genera y dónde están las oportunidades." },
      { title: "Optimización de precios", desc: "Análisis de estructura de precios para detectar huecos, desequilibrios y oportunidades de upselling." },
    ],
    benefitLabel: "Beneficios", benefitTitle1: "Qué consiguen los restaurantes con ", benefitHighlight: "Winerim",
    benefits: ["Aumentar las ventas de vino", "Mejorar el ticket medio", "Optimizar la rotación de vinos", "Ayudar al personal de sala", "Mejorar la experiencia del cliente"],
    audienceLabel: "Público objetivo", audienceTitle1: "Para quién es ", audienceHighlight: "Winerim",
    audiences: [
      { title: "Restaurantes independientes", desc: "Desde bistrós hasta restaurantes gastronómicos que quieren profesionalizar su oferta de vinos y vender más." },
      { title: "Wine bars y vinotecas", desc: "Espacios especializados que necesitan gestionar cartas amplias y ofrecer una experiencia de descubrimiento." },
      { title: "Hoteles", desc: "Establecimientos con múltiples puntos de venta que requieren coherencia y gestión centralizada de su oferta de vinos." },
      { title: "Grupos de restauración", desc: "Cadenas y grupos que necesitan estandarizar, analizar y optimizar las cartas de vinos en múltiples locales." },
    ],
    faqs: [
      { q: "¿Qué es Winerim?", a: "Winerim es una plataforma inteligente de gestión de cartas de vino para restaurantes. Combina carta digital interactiva, recomendaciones con IA, analítica de ventas y herramientas de optimización de precios para ayudar a los restaurantes a vender más vino." },
      { q: "¿Qué problema resuelve Winerim?", a: "Winerim resuelve los problemas más comunes en la venta de vino en restaurantes: cartas difíciles de entender, falta de recomendaciones, vinos que no rotan, y decisiones de compra basadas en intuición en lugar de datos." },
      { q: "¿Cómo funciona Winerim?", a: "El restaurante carga su carta de vinos, Winerim organiza y optimiza la información, los clientes interactúan con una carta digital inteligente con filtros y recomendaciones, y el restaurante obtiene analítica y sugerencias de mejora continua." },
      { q: "¿Para quién está pensado Winerim?", a: "Winerim está diseñado para restaurantes independientes, wine bars, hoteles y grupos de restauración que quieran profesionalizar su oferta de vinos, aumentar ventas y optimizar su bodega." },
    ],
    ctaFLabel: "Empieza hoy", ctaFTitle1: "Convierte tu carta de vinos en una herramienta de ", ctaFHighlight: "venta",
    ctaFDesc: "Descubre cómo Winerim puede transformar la forma en que tu restaurante vende vino. Sin compromiso.",
    ctaFDemo: "Solicitar demo", ctaFAnalyze: "Analizar mi carta",
    links: [{ label: "Software carta de vinos" }, { label: "Cómo vender más vino" }, { label: "Analizador de carta" }, { label: "Planes y precios" }],
  },
  en: {
    metaTitle: "What is Winerim | Intelligent Wine List Software",
    metaDesc: "Winerim is an intelligent platform that helps restaurants sell more wine, optimize their cellar, and improve customer experience with digital lists, AI, and analytics.",
    breadLabel: "What is Winerim", badge: "The platform",
    heroTitle1: "What is ", heroHighlight: "Winerim",
    heroDesc: "Winerim is an intelligent platform designed to help restaurants sell more wine, optimize their cellar, and improve the customer experience.",
    ctaDemo: "Request demo", ctaAnalyze: "Analyze my wine list",
    defLabel: "Definition", defTitle1: "Software that turns your list into a ", defHighlight: "sales tool",
    defDesc: "Winerim is specialized software for managing and optimizing wine lists in restaurants. It combines advanced technology with oenological knowledge to transform how restaurants present, recommend, and sell wine.",
    defItems: ["Interactive digital wine list", "AI-powered smart recommendations", "Real-time sales analytics", "Full cellar management", "Price optimization", "Automatic food pairings"],
    problemLabel: "The problem", problemTitle1: "What problem Winerim ", problemHighlight: "solves",
    problemDesc: "Wine is the highest-margin product in hospitality, but most restaurants don't leverage its potential.",
    problems: [
      { title: "Hard-to-understand lists", desc: "Long listings without context or structure that overwhelm diners and push them to choose the cheapest or most familiar." },
      { title: "Insecure customers when choosing wine", desc: "Without clear recommendations, customers feel they might make a mistake. Result: they don't order wine or stick to the usual." },
      { title: "Staff without time to recommend", desc: "During service, the front-of-house team can't always dedicate time to explain the wine list to each table." },
      { title: "Wines that don't rotate", desc: "References that stagnate in the cellar due to poor price positioning, duplicate styles, or lack of visibility." },
      { title: "Decisions based on intuition", desc: "Purchasing, pricing, and list structure are decided without real performance data or sales analysis." },
    ],
    processLabel: "The process", processTitle1: "How Winerim ", processHighlight: "works",
    steps: [
      { title: "Upload your wine list", desc: "Upload your current list in any format. Winerim imports and structures all information automatically." },
      { title: "Winerim organizes and optimizes", desc: "The system analyzes prices, categories, styles, and detects improvement opportunities in the list structure." },
      { title: "Customers interact", desc: "Diners access a smart digital list with filters, pairings, and personalized recommendations." },
      { title: "Get data and recommendations", desc: "The restaurant receives sales analytics, performance metrics, and continuous optimization suggestions." },
    ],
    featLabel: "Features", featTitle1: "Everything you need to ", featHighlight: "sell more wine",
    features: [
      { title: "Interactive digital list", desc: "A visual, navigable wine list that's always updated and works on any device." },
      { title: "Wine recommendations", desc: "AI that suggests the ideal wine based on the diner's preferences, chosen dish, and context." },
      { title: "Food pairings", desc: "Automatic pairing suggestions that link each wine with menu dishes." },
      { title: "Filters and comparator", desc: "Customers filter by type, region, price, or style and compare wines side by side with clear information." },
      { title: "Sales analytics", desc: "Dashboards with real data on what sells, what rotates, what margin it generates, and where opportunities lie." },
      { title: "Price optimization", desc: "Price structure analysis to detect gaps, imbalances, and upselling opportunities." },
    ],
    benefitLabel: "Benefits", benefitTitle1: "What restaurants achieve with ", benefitHighlight: "Winerim",
    benefits: ["Increase wine sales", "Improve average ticket", "Optimize wine rotation", "Help front-of-house staff", "Improve customer experience"],
    audienceLabel: "Target audience", audienceTitle1: "Who is Winerim ", audienceHighlight: "for",
    audiences: [
      { title: "Independent restaurants", desc: "From bistros to fine dining restaurants looking to professionalize their wine offer and sell more." },
      { title: "Wine bars", desc: "Specialized spaces that need to manage extensive lists and offer a discovery experience." },
      { title: "Hotels", desc: "Establishments with multiple outlets requiring consistency and centralized wine offer management." },
      { title: "Restaurant groups", desc: "Chains and groups needing to standardize, analyze, and optimize wine lists across multiple venues." },
    ],
    faqs: [
      { q: "What is Winerim?", a: "Winerim is an intelligent wine list management platform for restaurants. It combines an interactive digital list, AI recommendations, sales analytics, and pricing optimization tools to help restaurants sell more wine." },
      { q: "What problem does Winerim solve?", a: "Winerim solves the most common problems in restaurant wine sales: hard-to-understand lists, lack of recommendations, wines that don't rotate, and purchasing decisions based on intuition rather than data." },
      { q: "How does Winerim work?", a: "The restaurant uploads its wine list, Winerim organizes and optimizes the information, customers interact with a smart digital list with filters and recommendations, and the restaurant gets analytics and continuous improvement suggestions." },
      { q: "Who is Winerim designed for?", a: "Winerim is designed for independent restaurants, wine bars, hotels, and restaurant groups looking to professionalize their wine offer, increase sales, and optimize their cellar." },
    ],
    ctaFLabel: "Start today", ctaFTitle1: "Turn your wine list into a ", ctaFHighlight: "sales tool",
    ctaFDesc: "Discover how Winerim can transform the way your restaurant sells wine. No commitment.",
    ctaFDemo: "Request demo", ctaFAnalyze: "Analyze my list",
    links: [{ label: "Wine list software" }, { label: "How to sell more wine" }, { label: "Wine list analyzer" }, { label: "Plans & pricing" }],
  },
  it: {
    metaTitle: "Cos'è Winerim | Software Intelligente per Carte dei Vini",
    metaDesc: "Winerim è una piattaforma intelligente che aiuta i ristoranti a vendere più vino, ottimizzare la cantina e migliorare l'esperienza del cliente.",
    breadLabel: "Cos'è Winerim", badge: "La piattaforma",
    heroTitle1: "Cos'è ", heroHighlight: "Winerim",
    heroDesc: "Winerim è una piattaforma intelligente progettata per aiutare i ristoranti a vendere più vino, ottimizzare la cantina e migliorare l'esperienza del cliente.",
    ctaDemo: "Richiedi demo", ctaAnalyze: "Analizza la mia carta dei vini",
    defLabel: "Definizione", defTitle1: "Un software che trasforma la tua carta in uno strumento di ", defHighlight: "vendita",
    defDesc: "Winerim è un software specializzato nella gestione e ottimizzazione delle carte dei vini nei ristoranti. Combina tecnologia avanzata con conoscenza enologica per trasformare il modo in cui i ristoranti presentano, raccomandano e vendono vino.",
    defItems: ["Carta digitale interattiva", "Raccomandazioni intelligenti con IA", "Analisi vendite in tempo reale", "Gestione integrale della cantina", "Ottimizzazione dei prezzi", "Abbinamenti automatici con i piatti"],
    problemLabel: "Il problema", problemTitle1: "Quale problema ", problemHighlight: "risolve",
    problemDesc: "Il vino è il prodotto con il margine più alto nella ristorazione, ma la maggior parte dei ristoranti non ne sfrutta il potenziale.",
    problems: [
      { title: "Carte difficili da capire", desc: "Elenchi lunghi senza contesto né struttura che sopraffanno il commensale e lo spingono a scegliere il più economico o il più noto." },
      { title: "Clienti insicuri nella scelta", desc: "Senza raccomandazioni chiare, il cliente sente di poter sbagliare. Risultato: non ordina vino o ordina sempre lo stesso." },
      { title: "Personale senza tempo per consigliare", desc: "Durante il servizio, il team di sala non può sempre dedicare tempo a spiegare la carta dei vini a ogni tavolo." },
      { title: "Vini che non ruotano", desc: "Referenze che ristagnano in cantina per posizionamento di prezzo errato, stile duplicato o mancanza di visibilità." },
      { title: "Decisioni basate sull'intuizione", desc: "Acquisti, prezzi e struttura della carta vengono decisi senza dati reali di performance né analisi delle vendite." },
    ],
    processLabel: "Il processo", processTitle1: "Come ", processHighlight: "funziona",
    steps: [
      { title: "Carica la tua carta dei vini", desc: "Carica la tua carta attuale in qualsiasi formato. Winerim importa e struttura tutte le informazioni automaticamente." },
      { title: "Winerim organizza e ottimizza", desc: "Il sistema analizza prezzi, categorie, stili e individua opportunità di miglioramento nella struttura della carta." },
      { title: "I clienti interagiscono", desc: "I commensali accedono a una carta digitale intelligente con filtri, abbinamenti e raccomandazioni personalizzate." },
      { title: "Ottieni dati e raccomandazioni", desc: "Il ristorante riceve analisi delle vendite, metriche di performance e suggerimenti di ottimizzazione continua." },
    ],
    featLabel: "Funzionalità", featTitle1: "Tutto ciò di cui hai bisogno per ", featHighlight: "vendere più vino",
    features: [
      { title: "Carta digitale interattiva", desc: "Una carta dei vini visiva, navigabile e sempre aggiornata che funziona su qualsiasi dispositivo." },
      { title: "Raccomandazioni di vino", desc: "IA che suggerisce il vino ideale in base alle preferenze del commensale, al piatto scelto e al contesto." },
      { title: "Abbinamenti con i piatti", desc: "Proposte di abbinamento automatiche che collegano ogni vino ai piatti del menù." },
      { title: "Filtri e comparatore", desc: "Il cliente filtra per tipo, regione, prezzo o stile e confronta i vini fianco a fianco con informazioni chiare." },
      { title: "Analisi delle vendite", desc: "Dashboard con dati reali su cosa si vende, cosa ruota, che margine genera e dove sono le opportunità." },
      { title: "Ottimizzazione dei prezzi", desc: "Analisi della struttura dei prezzi per individuare lacune, squilibri e opportunità di upselling." },
    ],
    benefitLabel: "Benefici", benefitTitle1: "Cosa ottengono i ristoranti con ", benefitHighlight: "Winerim",
    benefits: ["Aumentare le vendite di vino", "Migliorare lo scontrino medio", "Ottimizzare la rotazione dei vini", "Aiutare il personale di sala", "Migliorare l'esperienza del cliente"],
    audienceLabel: "Pubblico target", audienceTitle1: "Per chi è ", audienceHighlight: "Winerim",
    audiences: [
      { title: "Ristoranti indipendenti", desc: "Dai bistrot ai ristoranti gastronomici che vogliono professionalizzare la loro offerta di vini e vendere di più." },
      { title: "Wine bar ed enoteche", desc: "Spazi specializzati che devono gestire carte ampie e offrire un'esperienza di scoperta." },
      { title: "Hotel", desc: "Strutture con più punti vendita che richiedono coerenza e gestione centralizzata dell'offerta di vini." },
      { title: "Gruppi di ristorazione", desc: "Catene e gruppi che devono standardizzare, analizzare e ottimizzare le carte dei vini in più sedi." },
    ],
    faqs: [
      { q: "Cos'è Winerim?", a: "Winerim è una piattaforma intelligente di gestione delle carte dei vini per ristoranti. Combina carta digitale interattiva, raccomandazioni con IA, analisi delle vendite e strumenti di ottimizzazione dei prezzi." },
      { q: "Quale problema risolve Winerim?", a: "Winerim risolve i problemi più comuni nella vendita di vino nei ristoranti: carte difficili da capire, mancanza di raccomandazioni, vini che non ruotano e decisioni d'acquisto basate sull'intuizione." },
      { q: "Come funziona Winerim?", a: "Il ristorante carica la sua carta dei vini, Winerim organizza e ottimizza le informazioni, i clienti interagiscono con una carta digitale intelligente e il ristorante ottiene analisi e suggerimenti di miglioramento continuo." },
      { q: "Per chi è pensato Winerim?", a: "Winerim è progettato per ristoranti indipendenti, wine bar, hotel e gruppi di ristorazione che vogliono professionalizzare la loro offerta di vini." },
    ],
    ctaFLabel: "Inizia oggi", ctaFTitle1: "Trasforma la tua carta dei vini in uno strumento di ", ctaFHighlight: "vendita",
    ctaFDesc: "Scopri come Winerim può trasformare il modo in cui il tuo ristorante vende vino. Senza impegno.",
    ctaFDemo: "Richiedi demo", ctaFAnalyze: "Analizza la mia carta",
    links: [{ label: "Software carta dei vini" }, { label: "Come vendere più vino" }, { label: "Analizzatore di carta" }, { label: "Piani e prezzi" }],
  },
  fr: {
    metaTitle: "Qu'est-ce que Winerim | Logiciel Intelligent de Carte des Vins",
    metaDesc: "Winerim est une plateforme intelligente qui aide les restaurants à vendre plus de vin, optimiser leur cave et améliorer l'expérience client.",
    breadLabel: "Qu'est-ce que Winerim", badge: "La plateforme",
    heroTitle1: "Qu'est-ce que ", heroHighlight: "Winerim",
    heroDesc: "Winerim est une plateforme intelligente conçue pour aider les restaurants à vendre plus de vin, optimiser leur cave et améliorer l'expérience client.",
    ctaDemo: "Demander une démo", ctaAnalyze: "Analyser ma carte des vins",
    defLabel: "Définition", defTitle1: "Un logiciel qui transforme votre carte en outil de ", defHighlight: "vente",
    defDesc: "Winerim est un logiciel spécialisé dans la gestion et l'optimisation des cartes des vins en restauration. Il combine technologie avancée et expertise œnologique pour transformer la façon dont les restaurants présentent, recommandent et vendent du vin.",
    defItems: ["Carte digitale interactive", "Recommandations intelligentes par IA", "Analytique des ventes en temps réel", "Gestion intégrale de la cave", "Optimisation des prix", "Accords mets-vins automatiques"],
    problemLabel: "Le problème", problemTitle1: "Quel problème Winerim ", problemHighlight: "résout",
    problemDesc: "Le vin est le produit à la plus forte marge en restauration, mais la plupart des restaurants n'en exploitent pas le potentiel.",
    problems: [
      { title: "Cartes difficiles à comprendre", desc: "De longues listes sans contexte ni structure qui submergent le convive et le poussent à choisir le moins cher ou le plus connu." },
      { title: "Clients hésitants face au choix", desc: "Sans recommandations claires, le client craint de se tromper. Résultat : il ne commande pas de vin ou choisit toujours le même." },
      { title: "Personnel sans temps pour conseiller", desc: "En service, l'équipe de salle ne peut pas toujours consacrer du temps à expliquer la carte des vins à chaque table." },
      { title: "Vins qui ne tournent pas", desc: "Des références qui stagnent en cave en raison d'un mauvais positionnement prix, d'un style en doublon ou d'un manque de visibilité." },
      { title: "Décisions basées sur l'intuition", desc: "Achats, prix et structure de carte sont décidés sans données réelles de performance ni analyse des ventes." },
    ],
    processLabel: "Le processus", processTitle1: "Comment Winerim ", processHighlight: "fonctionne",
    steps: [
      { title: "Chargez votre carte des vins", desc: "Téléchargez votre carte actuelle dans n'importe quel format. Winerim importe et structure toutes les informations automatiquement." },
      { title: "Winerim organise et optimise", desc: "Le système analyse les prix, catégories, styles et détecte les opportunités d'amélioration dans la structure de la carte." },
      { title: "Les clients interagissent", desc: "Les convives accèdent à une carte digitale intelligente avec filtres, accords et recommandations personnalisées." },
      { title: "Obtenez données et recommandations", desc: "Le restaurant reçoit l'analytique des ventes, des métriques de performance et des suggestions d'optimisation continue." },
    ],
    featLabel: "Fonctionnalités", featTitle1: "Tout ce dont vous avez besoin pour ", featHighlight: "vendre plus de vin",
    features: [
      { title: "Carte digitale interactive", desc: "Une carte des vins visuelle, navigable et toujours à jour qui fonctionne sur tout appareil." },
      { title: "Recommandations de vin", desc: "IA qui suggère le vin idéal selon les préférences du convive, le plat choisi et le contexte." },
      { title: "Accords mets-vins", desc: "Suggestions d'accords automatiques qui lient chaque vin aux plats du menu." },
      { title: "Filtres et comparateur", desc: "Le client filtre par type, région, prix ou style et compare les vins côte à côte avec des informations claires." },
      { title: "Analytique des ventes", desc: "Tableaux de bord avec des données réelles sur ce qui se vend, ce qui tourne, quelle marge est générée et où se trouvent les opportunités." },
      { title: "Optimisation des prix", desc: "Analyse de la structure tarifaire pour détecter les lacunes, déséquilibres et opportunités d'upselling." },
    ],
    benefitLabel: "Avantages", benefitTitle1: "Ce que les restaurants obtiennent avec ", benefitHighlight: "Winerim",
    benefits: ["Augmenter les ventes de vin", "Améliorer le ticket moyen", "Optimiser la rotation des vins", "Aider le personnel de salle", "Améliorer l'expérience client"],
    audienceLabel: "Public cible", audienceTitle1: "À qui s'adresse ", audienceHighlight: "Winerim",
    audiences: [
      { title: "Restaurants indépendants", desc: "Des bistrots aux restaurants gastronomiques souhaitant professionnaliser leur offre de vins et vendre plus." },
      { title: "Bars à vins", desc: "Espaces spécialisés devant gérer des cartes étendues et offrir une expérience de découverte." },
      { title: "Hôtels", desc: "Établissements avec plusieurs points de vente nécessitant cohérence et gestion centralisée de l'offre de vins." },
      { title: "Groupes de restauration", desc: "Chaînes et groupes devant standardiser, analyser et optimiser les cartes des vins sur plusieurs sites." },
    ],
    faqs: [
      { q: "Qu'est-ce que Winerim ?", a: "Winerim est une plateforme intelligente de gestion des cartes des vins pour restaurants. Elle combine carte digitale interactive, recommandations par IA, analytique des ventes et outils d'optimisation des prix." },
      { q: "Quel problème Winerim résout-il ?", a: "Winerim résout les problèmes les plus courants dans la vente de vin en restauration : cartes difficiles à comprendre, manque de recommandations, vins qui ne tournent pas et décisions d'achat basées sur l'intuition." },
      { q: "Comment fonctionne Winerim ?", a: "Le restaurant charge sa carte des vins, Winerim organise et optimise les informations, les clients interagissent avec une carte digitale intelligente et le restaurant obtient des analyses et suggestions d'amélioration continue." },
      { q: "À qui Winerim est-il destiné ?", a: "Winerim est conçu pour les restaurants indépendants, bars à vins, hôtels et groupes de restauration souhaitant professionnaliser leur offre de vins." },
    ],
    ctaFLabel: "Commencez aujourd'hui", ctaFTitle1: "Transformez votre carte des vins en un outil de ", ctaFHighlight: "vente",
    ctaFDesc: "Découvrez comment Winerim peut transformer la façon dont votre restaurant vend du vin. Sans engagement.",
    ctaFDemo: "Demander une démo", ctaFAnalyze: "Analyser ma carte",
    links: [{ label: "Logiciel carte des vins" }, { label: "Comment vendre plus de vin" }, { label: "Analyseur de carte" }, { label: "Plans et tarifs" }],
  },
};

const problemIcons = [Eye, Users, ShoppingCart, RotateCcw, BarChart3];
const stepIcons = [Upload, Cpu, Smartphone, BarChart3];
const featureIcons = [Smartphone, Target, Utensils, Search, BarChart3, TrendingUp];
const benefitIcons = [TrendingUp, ShoppingCart, RotateCcw, Users, Wine];
const audienceIcons = [Store, Wine, Hotel, Building2];

const QueEsWinerim = () => {
  const { lang, localePath } = useLanguage();
  const t = qt[lang] || qt.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/que-es-winerim" />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: t.breadLabel }]} />
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
                {t.ctaAnalyze}
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* DEFINITION */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.defLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.defTitle1}<span className="text-gradient-wine italic">{t.defHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.defDesc}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.defItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                  <CheckCircle size={18} className="text-wine shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.problemTitle1}<span className="text-gradient-wine italic">{t.problemHighlight}</span> Winerim
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.problemDesc}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.problems.map((problem, i) => {
              const Icon = problemIcons[i] || Eye;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
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

      {/* PROCESS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.processLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.processTitle1}<span className="text-gradient-wine italic">{t.processHighlight}</span> Winerim
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {t.steps.map((step, i) => {
              const Icon = stepIcons[i] || Upload;
              const num = String(i + 1).padStart(2, "0");
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 items-start bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/30 transition-all duration-300">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center">
                        <span className="font-heading text-lg font-bold text-wine">{num}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={18} className="text-wine" />
                        <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.featTitle1}<span className="text-gradient-wine italic">{t.featHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, i) => {
              const Icon = featureIcons[i] || Smartphone;
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
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.benefitLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.benefitTitle1}<span className="text-gradient-wine italic">{t.benefitHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i] || TrendingUp;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{benefit}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.audienceLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.audienceTitle1}<span className="text-gradient-wine italic">{t.audienceHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.audiences.map((audience, i) => {
              const Icon = audienceIcons[i] || Store;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{audience.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection faqs={t.faqs} schemaId="que-es-winerim" />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaFLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaFTitle1}<span className="text-gradient-wine italic">{t.ctaFHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaFDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaFDemo} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/analisis-carta")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {t.ctaFAnalyze}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: t.links[0].label, type: "solution" },
        { to: localePath("/como-vender-mas-vino-en-un-restaurante"), label: t.links[1].label, type: "guide" },
        { to: localePath("/wine-list-analyzer"), label: t.links[2].label, type: "tool" },
        { to: localePath("/precios"), label: t.links[3].label, type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default QueEsWinerim;
