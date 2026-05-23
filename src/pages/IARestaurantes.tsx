import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Sparkles, Utensils, BarChart3, TrendingUp, ArrowRight,
  AlertTriangle, Lightbulb, Wine, Users, LineChart, RotateCcw,
  Zap, Target, ShoppingCart, Eye, Cpu, Bot
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import mockupImg from "@/assets/winerim-dashboard-insights.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type IconType = typeof Brain;

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumb: string; badge: string;
  h1pre: string; h1accent: string; subtitle: string;
  ctaDiscover: string; ctaAnalyze: string;
  introTag: string; introH2pre: string; introH2accent: string;
  introP1: string; introP2: string;
  introItems: { icon: IconType; text: string }[];
  problemTag: string; problemH2pre: string; problemH2accent: string; problemSubtitle: string;
  problems: { icon: IconType; title: string; desc: string }[];
  aiTag: string; aiH2pre: string; aiH2accent: string; aiSubtitle: string;
  aiApps: { icon: IconType; title: string; desc: string }[];
  winerimTag: string; winerimH2pre: string; winerimH2accent: string; winerimDesc: string;
  winerimFeatures: { title: string; desc: string }[];
  aiEngineLabel: string;
  aiEngineLines: string[];
  benefitsTag: string; benefitsH2pre: string; benefitsH2accent: string;
  benefits: { icon: IconType; text: string }[];
  futureTag: string; futureH2pre: string; futureH2accent: string;
  futureP1: string; futureP2: string;
  ctaTag: string; ctaH2pre: string; ctaH2accent: string; ctaDesc: string;
  ctaBtn: string; ctaSecondary: string;
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
  faqData: { q: string; a: string }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Inteligencia Artificial para Restaurantes | IA para Vender Más Vino",
    metaDescription: "Descubre cómo la inteligencia artificial ayuda a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente.",
    url: "https://winerim.wine/inteligencia-artificial-restaurantes",
    breadcrumb: "IA para restaurantes", badge: "IA + Hostelería",
    h1pre: "Inteligencia artificial para", h1accent: "restaurantes",
    subtitle: "Cómo la IA está ayudando a los restaurantes a vender más vino, optimizar su bodega y mejorar la experiencia del cliente.",
    ctaDiscover: "Descubrir cómo funciona", ctaAnalyze: "Analizar mi carta de vinos",
    introTag: "La revolución silenciosa",
    introH2pre: "La IA ya está transformando la", introH2accent: "hostelería",
    introP1: "La inteligencia artificial no es ciencia ficción: ya está presente en miles de restaurantes de todo el mundo. Desde sistemas de reservas inteligentes hasta análisis predictivo de demanda, la IA permite tomar mejores decisiones con menos esfuerzo.",
    introP2: "Pero hay un ámbito donde el impacto puede ser especialmente grande: la venta de vino. El vino es el producto con mayor margen en hostelería, pero también uno de los más difíciles de vender cuando no existe una estrategia clara. La IA cambia las reglas del juego.",
    introItems: [
      { icon: Bot, text: "Recomendaciones personalizadas" },
      { icon: LineChart, text: "Optimización de precios" },
      { icon: BarChart3, text: "Análisis de datos de ventas" },
      { icon: Zap, text: "Automatización de procesos" },
    ],
    problemTag: "El problema",
    problemH2pre: "Por qué los restaurantes", problemH2accent: "pierden ventas de vino",
    problemSubtitle: "Sin herramientas inteligentes, la venta de vino depende del azar, no de la estrategia.",
    problems: [
      { icon: Users, title: "Personal sin formación en vinos", desc: "La mayoría de camareros no pueden recomendar con confianza, lo que frena la venta de referencias de mayor valor." },
      { icon: Eye, title: "Cartas confusas para el cliente", desc: "Listados interminables sin contexto ni explicaciones hacen que el comensal elija por precio, no por preferencia." },
      { icon: AlertTriangle, title: "Decisiones sin datos", desc: "La compra de vino y el diseño de la carta se basan en intuición, no en análisis de rendimiento real." },
      { icon: ShoppingCart, title: "Venta por impulso, no por estrategia", desc: "Sin herramientas de recomendación, el vino se vende (o no) de forma aleatoria, perdiendo margen y oportunidades." },
    ],
    aiTag: "Aplicaciones prácticas",
    aiH2pre: "Cómo la IA ayuda a", aiH2accent: "vender más vino",
    aiSubtitle: "La inteligencia artificial transforma cada punto de contacto con el vino en una oportunidad de venta.",
    aiApps: [
      { icon: Sparkles, title: "Recomendaciones inteligentes", desc: "La IA analiza preferencias del comensal, plato elegido y contexto para sugerir el vino perfecto en cada momento." },
      { icon: Utensils, title: "Maridajes automáticos", desc: "Algoritmos que cruzan perfiles organolépticos con la carta gastronómica para proponer combinaciones óptimas." },
      { icon: BarChart3, title: "Análisis de ventas", desc: "Dashboards en tiempo real que muestran qué vinos se venden, cuáles rotan poco y dónde está el margen oculto." },
      { icon: Target, title: "Optimización de la carta", desc: "Detección automática de huecos, duplicidades de estilo y rangos de precio mal estructurados." },
      { icon: RotateCcw, title: "Predicción de rotación", desc: "Modelos predictivos que anticipan qué referencias necesitan impulso y cuáles están en riesgo de caducar." },
    ],
    winerimTag: "Winerim", winerimH2pre: "IA diseñada para la", winerimH2accent: "venta de vino",
    winerimDesc: "Winerim aplica inteligencia artificial específicamente entrenada para el mundo del vino en hostelería. No es un chatbot genérico: es una plataforma que entiende de enología, maridajes, estructuras de carta y comportamiento del comensal.",
    winerimFeatures: [
      { title: "Analiza tu carta de vinos", desc: "Detecta desequilibrios de precio, duplicidades de estilo y oportunidades de mejora en minutos." },
      { title: "Recomienda vinos a clientes", desc: "Un sommelier virtual que guía al comensal hacia la mejor elección según sus gustos y el plato." },
      { title: "Optimiza la estructura", desc: "Reorganiza categorías, rangos de precio y referencias para maximizar la conversión." },
      { title: "Mejora la rotación", desc: "Identifica vinos estancados y propone estrategias para mover stock de forma inteligente." },
    ],
    aiEngineLabel: "Motor de IA Winerim",
    aiEngineLines: ["Análisis de carta completado", "3 desequilibrios de precio detectados", "12 oportunidades de maridaje", "Rotación optimizable en 8 referencias", "+18% potencial de ticket medio"],
    benefitsTag: "Beneficios", benefitsH2pre: "¿Qué consiguen los restaurantes con", benefitsH2accent: "IA",
    benefits: [
      { icon: TrendingUp, text: "Aumentar las ventas de vino" },
      { icon: ShoppingCart, text: "Mejorar el ticket medio" },
      { icon: Users, text: "Ayudar al personal de sala" },
      { icon: Wine, text: "Optimizar la bodega" },
      { icon: Sparkles, text: "Mejorar la experiencia del cliente" },
    ],
    futureTag: "Mirando al futuro", futureH2pre: "El futuro de la IA en", futureH2accent: "restaurantes",
    futureP1: "Cada vez más restaurantes adoptarán herramientas basadas en inteligencia artificial para tomar decisiones informadas. Desde la selección de proveedores hasta la personalización de la experiencia gastronómica, la IA se convertirá en un aliado imprescindible.",
    futureP2: "Los restaurantes que integren IA en su operativa diaria no solo venderán más: ofrecerán una experiencia superior, fidelizarán mejor a sus clientes y optimizarán cada euro invertido en su bodega. La pregunta no es si adoptarás IA, sino cuándo.",
    ctaTag: "Da el primer paso", ctaH2pre: "Descubre cómo la inteligencia artificial puede", ctaH2accent: "mejorar tu carta de vinos",
    ctaDesc: "Envíanos tu carta y te mostramos el potencial de optimización con IA. Sin compromiso.",
    ctaBtn: "Solicitar demo", ctaSecondary: "Analizar mi carta",
    links: [
      { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
      { to: "/wine-pairing-generator", label: "Generador de maridajes con IA", type: "tool" },
      { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
      { to: "/soluciones/grupos-restauracion", label: "Winerim para grupos", type: "solution" },
    ],
    faqData: [
      { q: "¿Cómo puede la inteligencia artificial ayudar a un restaurante a vender más vino?", a: "La IA analiza preferencias del cliente, sugiere maridajes automáticos y optimiza la carta de vinos para maximizar ventas y ticket medio." },
      { q: "¿Qué es un recomendador de vinos con IA?", a: "Es un sistema que utiliza algoritmos de inteligencia artificial para sugerir vinos personalizados según los gustos del comensal, el plato elegido y el contexto de la comida." },
      { q: "¿Qué beneficios tiene la IA para la hostelería?", a: "Permite recomendar de forma personalizada, optimizar precios y cartas, analizar datos de ventas y automatizar procesos que antes dependían exclusivamente del personal." },
    ],
  },
  en: {
    metaTitle: "Artificial Intelligence for Restaurants | AI to Sell More Wine",
    metaDescription: "Discover how AI helps restaurants sell more wine, optimize their cellar and improve the guest experience.",
    url: "https://winerim.wine/en/ai-for-restaurants",
    breadcrumb: "AI for restaurants", badge: "AI + Hospitality",
    h1pre: "Artificial intelligence for", h1accent: "restaurants",
    subtitle: "How AI is helping restaurants sell more wine, optimize their cellar and improve the guest experience.",
    ctaDiscover: "Discover how it works", ctaAnalyze: "Analyze my wine list",
    introTag: "The silent revolution",
    introH2pre: "AI is already transforming", introH2accent: "hospitality",
    introP1: "Artificial intelligence isn't science fiction: it's already present in thousands of restaurants worldwide. From smart booking systems to predictive demand analysis, AI enables better decisions with less effort.",
    introP2: "But there's one area where the impact can be especially large: wine sales. Wine is the highest-margin product in hospitality, but also one of the hardest to sell without a clear strategy. AI changes the game.",
    introItems: [
      { icon: Bot, text: "Personalized recommendations" },
      { icon: LineChart, text: "Price optimization" },
      { icon: BarChart3, text: "Sales data analysis" },
      { icon: Zap, text: "Process automation" },
    ],
    problemTag: "The problem",
    problemH2pre: "Why restaurants", problemH2accent: "lose wine sales",
    problemSubtitle: "Without smart tools, wine sales depend on chance, not strategy.",
    problems: [
      { icon: Users, title: "Untrained staff", desc: "Most waiters can't recommend with confidence, holding back sales of higher-value references." },
      { icon: Eye, title: "Confusing lists for guests", desc: "Endless listings without context make guests choose by price, not preference." },
      { icon: AlertTriangle, title: "Decisions without data", desc: "Wine buying and list design are based on intuition, not real performance analysis." },
      { icon: ShoppingCart, title: "Impulse selling, not strategy", desc: "Without recommendation tools, wine is sold (or not) randomly, losing margin and opportunities." },
    ],
    aiTag: "Practical applications",
    aiH2pre: "How AI helps", aiH2accent: "sell more wine",
    aiSubtitle: "AI transforms every wine touchpoint into a sales opportunity.",
    aiApps: [
      { icon: Sparkles, title: "Smart recommendations", desc: "AI analyzes guest preferences, chosen dish and context to suggest the perfect wine every time." },
      { icon: Utensils, title: "Automatic pairings", desc: "Algorithms cross-reference organoleptic profiles with the food menu to propose optimal combinations." },
      { icon: BarChart3, title: "Sales analysis", desc: "Real-time dashboards showing which wines sell, which rotate poorly and where hidden margin lies." },
      { icon: Target, title: "List optimization", desc: "Automatic detection of gaps, style duplications and poorly structured price ranges." },
      { icon: RotateCcw, title: "Rotation prediction", desc: "Predictive models that anticipate which references need a push and which risk expiring." },
    ],
    winerimTag: "Winerim", winerimH2pre: "AI designed for", winerimH2accent: "wine sales",
    winerimDesc: "Winerim applies AI specifically trained for the wine hospitality world. It's not a generic chatbot: it's a platform that understands oenology, pairings, list structures and guest behavior.",
    winerimFeatures: [
      { title: "Analyzes your wine list", desc: "Detects price imbalances, style duplications and improvement opportunities in minutes." },
      { title: "Recommends wines to guests", desc: "A virtual sommelier that guides guests to the best choice based on their tastes and dish." },
      { title: "Optimizes structure", desc: "Reorganizes categories, price ranges and references to maximize conversion." },
      { title: "Improves rotation", desc: "Identifies stagnant wines and proposes strategies to move stock intelligently." },
    ],
    aiEngineLabel: "Winerim AI Engine",
    aiEngineLines: ["Wine list analysis completed", "3 price imbalances detected", "12 pairing opportunities", "Rotation optimizable for 8 references", "+18% average ticket potential"],
    benefitsTag: "Benefits", benefitsH2pre: "What do restaurants achieve with", benefitsH2accent: "AI",
    benefits: [
      { icon: TrendingUp, text: "Increase wine sales" },
      { icon: ShoppingCart, text: "Improve average ticket" },
      { icon: Users, text: "Help floor staff" },
      { icon: Wine, text: "Optimize the cellar" },
      { icon: Sparkles, text: "Improve guest experience" },
    ],
    futureTag: "Looking ahead", futureH2pre: "The future of AI in", futureH2accent: "restaurants",
    futureP1: "More restaurants will adopt AI-powered tools to make informed decisions. From supplier selection to personalizing the dining experience, AI will become an essential ally.",
    futureP2: "Restaurants that integrate AI into their daily operations won't just sell more: they'll offer a superior experience, build better loyalty and optimize every euro invested in their cellar. The question isn't if you'll adopt AI, but when.",
    ctaTag: "Take the first step", ctaH2pre: "Discover how AI can", ctaH2accent: "improve your wine list",
    ctaDesc: "Send us your list and we'll show you the AI optimization potential. No commitment.",
    ctaBtn: "Request demo", ctaSecondary: "Analyze my list",
    links: [
      { to: "/en/wine-list-software", label: "Wine list software", type: "solution" },
      { to: "/en/wine-pairing-generator", label: "AI pairing generator", type: "tool" },
      { to: "/en/wine-list-analyzer", label: "Wine list analyzer", type: "tool" },
      { to: "/en/solutions/restaurant-groups", label: "Winerim for groups", type: "solution" },
    ],
    faqData: [
      { q: "How can AI help a restaurant sell more wine?", a: "AI analyzes guest preferences, suggests automatic pairings and optimizes the wine list to maximize sales and average ticket." },
      { q: "What is an AI wine recommender?", a: "A system that uses AI algorithms to suggest personalized wines based on guest tastes, chosen dish and dining context." },
      { q: "What benefits does AI bring to hospitality?", a: "It enables personalized recommendations, price and list optimization, sales data analysis and automation of processes that previously depended solely on staff." },
    ],
  },
  it: {
    metaTitle: "Intelligenza Artificiale per Ristoranti | IA per Vendere Più Vino",
    metaDescription: "Scopri come l'intelligenza artificiale aiuta i ristoranti a vendere più vino, ottimizzare la cantina e migliorare l'esperienza del cliente.",
    url: "https://winerim.wine/it/intelligenza-artificiale-ristoranti",
    breadcrumb: "IA per ristoranti", badge: "IA + Ristorazione",
    h1pre: "Intelligenza artificiale per", h1accent: "ristoranti",
    subtitle: "Come l'IA sta aiutando i ristoranti a vendere più vino, ottimizzare la cantina e migliorare l'esperienza del cliente.",
    ctaDiscover: "Scopri come funziona", ctaAnalyze: "Analizza la mia carta",
    introTag: "La rivoluzione silenziosa",
    introH2pre: "L'IA sta già trasformando la", introH2accent: "ristorazione",
    introP1: "L'intelligenza artificiale non è fantascienza: è già presente in migliaia di ristoranti in tutto il mondo.",
    introP2: "Ma c'è un ambito dove l'impatto può essere particolarmente grande: la vendita di vino. Il vino è il prodotto a più alto margine nella ristorazione, ma anche uno dei più difficili da vendere senza una strategia chiara.",
    introItems: [
      { icon: Bot, text: "Raccomandazioni personalizzate" },
      { icon: LineChart, text: "Ottimizzazione dei prezzi" },
      { icon: BarChart3, text: "Analisi dei dati di vendita" },
      { icon: Zap, text: "Automazione dei processi" },
    ],
    problemTag: "Il problema",
    problemH2pre: "Perché i ristoranti", problemH2accent: "perdono vendite di vino",
    problemSubtitle: "Senza strumenti intelligenti, la vendita di vino dipende dal caso, non dalla strategia.",
    problems: [
      { icon: Users, title: "Personale non formato sui vini", desc: "La maggior parte dei camerieri non può raccomandare con sicurezza." },
      { icon: Eye, title: "Carte confuse per il cliente", desc: "Elenchi interminabili senza contesto portano il cliente a scegliere per prezzo." },
      { icon: AlertTriangle, title: "Decisioni senza dati", desc: "L'acquisto di vino e il design della carta si basano sull'intuizione." },
      { icon: ShoppingCart, title: "Vendita d'impulso, non strategica", desc: "Senza strumenti di raccomandazione, il vino si vende in modo casuale." },
    ],
    aiTag: "Applicazioni pratiche",
    aiH2pre: "Come l'IA aiuta a", aiH2accent: "vendere più vino",
    aiSubtitle: "L'IA trasforma ogni punto di contatto con il vino in un'opportunità di vendita.",
    aiApps: [
      { icon: Sparkles, title: "Raccomandazioni intelligenti", desc: "L'IA analizza preferenze, piatto scelto e contesto per suggerire il vino perfetto." },
      { icon: Utensils, title: "Abbinamenti automatici", desc: "Algoritmi che incrociano profili organolettici con il menu gastronomico." },
      { icon: BarChart3, title: "Analisi delle vendite", desc: "Dashboard in tempo reale con vendite, rotazione e margine nascosto." },
      { icon: Target, title: "Ottimizzazione della carta", desc: "Rilevamento automatico di lacune, duplicati e fasce di prezzo mal strutturate." },
      { icon: RotateCcw, title: "Previsione della rotazione", desc: "Modelli predittivi che anticipano quali referenze necessitano di impulso." },
    ],
    winerimTag: "Winerim", winerimH2pre: "IA progettata per la", winerimH2accent: "vendita di vino",
    winerimDesc: "Winerim applica intelligenza artificiale specificamente addestrata per il mondo del vino nella ristorazione. Non è un chatbot generico: è una piattaforma che capisce di enologia, abbinamenti e comportamento del commensale.",
    winerimFeatures: [
      { title: "Analizza la tua carta", desc: "Rileva squilibri di prezzo, duplicati di stile e opportunità di miglioramento." },
      { title: "Raccomanda vini ai clienti", desc: "Un sommelier virtuale che guida il commensale verso la scelta migliore." },
      { title: "Ottimizza la struttura", desc: "Riorganizza categorie, fasce di prezzo e referenze per massimizzare la conversione." },
      { title: "Migliora la rotazione", desc: "Identifica vini fermi e propone strategie per movimentare lo stock." },
    ],
    aiEngineLabel: "Motore IA Winerim",
    aiEngineLines: ["Analisi carta completata", "3 squilibri di prezzo rilevati", "12 opportunità di abbinamento", "Rotazione ottimizzabile per 8 referenze", "+18% potenziale scontrino medio"],
    benefitsTag: "Benefici", benefitsH2pre: "Cosa ottengono i ristoranti con", benefitsH2accent: "l'IA",
    benefits: [
      { icon: TrendingUp, text: "Aumentare le vendite di vino" },
      { icon: ShoppingCart, text: "Migliorare lo scontrino medio" },
      { icon: Users, text: "Aiutare il personale di sala" },
      { icon: Wine, text: "Ottimizzare la cantina" },
      { icon: Sparkles, text: "Migliorare l'esperienza del cliente" },
    ],
    futureTag: "Guardando al futuro", futureH2pre: "Il futuro dell'IA nei", futureH2accent: "ristoranti",
    futureP1: "Sempre più ristoranti adotteranno strumenti basati sull'IA per prendere decisioni informate.",
    futureP2: "I ristoranti che integreranno l'IA nella loro operatività quotidiana non solo venderanno di più: offriranno un'esperienza superiore. La domanda non è se adotterai l'IA, ma quando.",
    ctaTag: "Fai il primo passo", ctaH2pre: "Scopri come l'IA può", ctaH2accent: "migliorare la tua carta dei vini",
    ctaDesc: "Inviaci la tua carta e ti mostriamo il potenziale di ottimizzazione con IA. Senza impegno.",
    ctaBtn: "Richiedi demo", ctaSecondary: "Analizza la mia carta",
    links: [
      { to: "/it/software-carta-vini", label: "Software carta dei vini", type: "solution" },
      { to: "/it/generatore-abbinamenti", label: "Generatore di abbinamenti IA", type: "tool" },
      { to: "/it/analizzatore-carta-vini", label: "Analizzatore carta", type: "tool" },
      { to: "/it/soluzioni/gruppi-ristorazione", label: "Winerim per gruppi", type: "solution" },
    ],
    faqData: [
      { q: "Come può l'IA aiutare un ristorante a vendere più vino?", a: "L'IA analizza le preferenze del cliente, suggerisce abbinamenti automatici e ottimizza la carta per massimizzare vendite e scontrino medio." },
      { q: "Cos'è un raccomandatore di vini con IA?", a: "Un sistema che usa algoritmi per suggerire vini personalizzati in base ai gusti del commensale e al piatto scelto." },
      { q: "Quali benefici porta l'IA alla ristorazione?", a: "Raccomandazioni personalizzate, ottimizzazione di prezzi e carte, analisi dei dati e automazione dei processi." },
    ],
  },
  fr: {
    metaTitle: "Intelligence Artificielle pour Restaurants | IA pour Vendre Plus de Vin",
    metaDescription: "Découvrez comment l'IA aide les restaurants à vendre plus de vin, optimiser leur cave et améliorer l'expérience client.",
    url: "https://winerim.wine/fr/intelligence-artificielle-restaurants",
    breadcrumb: "IA pour restaurants", badge: "IA + Restauration",
    h1pre: "Intelligence artificielle pour", h1accent: "restaurants",
    subtitle: "Comment l'IA aide les restaurants à vendre plus de vin, optimiser leur cave et améliorer l'expérience client.",
    ctaDiscover: "Découvrir comment ça marche", ctaAnalyze: "Analyser ma carte des vins",
    introTag: "La révolution silencieuse",
    introH2pre: "L'IA transforme déjà la", introH2accent: "restauration",
    introP1: "L'intelligence artificielle n'est pas de la science-fiction : elle est déjà présente dans des milliers de restaurants dans le monde.",
    introP2: "Mais il y a un domaine où l'impact peut être particulièrement important : la vente de vin. Le vin est le produit à plus forte marge en restauration, mais aussi l'un des plus difficiles à vendre sans stratégie claire.",
    introItems: [
      { icon: Bot, text: "Recommandations personnalisées" },
      { icon: LineChart, text: "Optimisation des prix" },
      { icon: BarChart3, text: "Analyse des données de vente" },
      { icon: Zap, text: "Automatisation des processus" },
    ],
    problemTag: "Le problème",
    problemH2pre: "Pourquoi les restaurants", problemH2accent: "perdent des ventes de vin",
    problemSubtitle: "Sans outils intelligents, la vente de vin dépend du hasard, pas de la stratégie.",
    problems: [
      { icon: Users, title: "Personnel non formé aux vins", desc: "La plupart des serveurs ne peuvent pas recommander avec confiance." },
      { icon: Eye, title: "Cartes confuses pour le client", desc: "Des listes interminables sans contexte poussent le client à choisir par prix." },
      { icon: AlertTriangle, title: "Décisions sans données", desc: "L'achat de vin et la conception de la carte reposent sur l'intuition." },
      { icon: ShoppingCart, title: "Vente impulsive, pas stratégique", desc: "Sans outils de recommandation, le vin se vend de manière aléatoire." },
    ],
    aiTag: "Applications pratiques",
    aiH2pre: "Comment l'IA aide à", aiH2accent: "vendre plus de vin",
    aiSubtitle: "L'IA transforme chaque point de contact avec le vin en opportunité de vente.",
    aiApps: [
      { icon: Sparkles, title: "Recommandations intelligentes", desc: "L'IA analyse préférences, plat choisi et contexte pour suggérer le vin parfait." },
      { icon: Utensils, title: "Accords automatiques", desc: "Algorithmes croisant profils organoleptiques et carte gastronomique." },
      { icon: BarChart3, title: "Analyse des ventes", desc: "Tableaux de bord en temps réel avec ventes, rotation et marge cachée." },
      { icon: Target, title: "Optimisation de la carte", desc: "Détection automatique des lacunes, doublons et gammes de prix mal structurées." },
      { icon: RotateCcw, title: "Prédiction de rotation", desc: "Modèles prédictifs anticipant les références nécessitant un coup de pouce." },
    ],
    winerimTag: "Winerim", winerimH2pre: "IA conçue pour la", winerimH2accent: "vente de vin",
    winerimDesc: "Winerim applique une IA spécifiquement entraînée pour le monde du vin en restauration. Ce n'est pas un chatbot générique : c'est une plateforme qui comprend l'œnologie, les accords et le comportement du convive.",
    winerimFeatures: [
      { title: "Analyse votre carte", desc: "Détecte les déséquilibres de prix, doublons de style et opportunités d'amélioration." },
      { title: "Recommande des vins aux clients", desc: "Un sommelier virtuel qui guide le convive vers le meilleur choix." },
      { title: "Optimise la structure", desc: "Réorganise catégories, gammes de prix et références pour maximiser la conversion." },
      { title: "Améliore la rotation", desc: "Identifie les vins dormants et propose des stratégies pour mouvoir le stock." },
    ],
    aiEngineLabel: "Moteur IA Winerim",
    aiEngineLines: ["Analyse de la carte terminée", "3 déséquilibres de prix détectés", "12 opportunités d'accords", "Rotation optimisable pour 8 références", "+18% de potentiel ticket moyen"],
    benefitsTag: "Bénéfices", benefitsH2pre: "Que gagnent les restaurants avec", benefitsH2accent: "l'IA",
    benefits: [
      { icon: TrendingUp, text: "Augmenter les ventes de vin" },
      { icon: ShoppingCart, text: "Améliorer le ticket moyen" },
      { icon: Users, text: "Aider le personnel de salle" },
      { icon: Wine, text: "Optimiser la cave" },
      { icon: Sparkles, text: "Améliorer l'expérience client" },
    ],
    futureTag: "Regard vers l'avenir", futureH2pre: "L'avenir de l'IA dans les", futureH2accent: "restaurants",
    futureP1: "De plus en plus de restaurants adopteront des outils d'IA pour prendre des décisions éclairées.",
    futureP2: "Les restaurants qui intégreront l'IA dans leur quotidien ne vendront pas seulement plus : ils offriront une expérience supérieure. La question n'est pas si vous adopterez l'IA, mais quand.",
    ctaTag: "Franchissez le pas", ctaH2pre: "Découvrez comment l'IA peut", ctaH2accent: "améliorer votre carte des vins",
    ctaDesc: "Envoyez-nous votre carte et nous vous montrons le potentiel d'optimisation avec l'IA. Sans engagement.",
    ctaBtn: "Demander une démo", ctaSecondary: "Analyser ma carte",
    links: [
      { to: "/fr/logiciel-carte-des-vins", label: "Logiciel carte des vins", type: "solution" },
      { to: "/fr/generateur-accords-mets-vins", label: "Générateur d'accords IA", type: "tool" },
      { to: "/fr/analyseur-carte-des-vins", label: "Analyseur de carte", type: "tool" },
      { to: "/fr/solutions/groupes-restauration", label: "Winerim pour groupes", type: "solution" },
    ],
    faqData: [
      { q: "Comment l'IA peut-elle aider un restaurant à vendre plus de vin ?", a: "L'IA analyse les préférences du client, suggère des accords automatiques et optimise la carte pour maximiser ventes et ticket moyen." },
      { q: "Qu'est-ce qu'un recommandeur de vins avec IA ?", a: "Un système utilisant des algorithmes pour suggérer des vins personnalisés selon les goûts du convive et le plat choisi." },
      { q: "Quels bénéfices l'IA apporte-t-elle à la restauration ?", a: "Recommandations personnalisées, optimisation des prix et cartes, analyse des données et automatisation des processus." },
    ],
  },
  de: {
    metaTitle: "Künstliche Intelligenz für Restaurants | KI, um mehr Wein zu verkaufen",
    metaDescription: "Erfahren Sie, wie KI Restaurants hilft, mehr Wein zu verkaufen, den Keller zu optimieren und das Gästeerlebnis zu verbessern.",
    url: "https://winerim.wine/de/kuenstliche-intelligenz-restaurants",
    breadcrumb: "KI für Restaurants", badge: "KI + Gastronomie",
    h1pre: "Künstliche Intelligenz für", h1accent: "Restaurants",
    subtitle: "Wie KI Restaurants dabei hilft, mehr Wein zu verkaufen, ihren Keller zu optimieren und das Gästeerlebnis zu verbessern.",
    ctaDiscover: "Entdecken, wie es funktioniert", ctaAnalyze: "Meine Weinkarte analysieren",
    introTag: "Die stille Revolution",
    introH2pre: "Die KI verändert bereits die", introH2accent: "Gastronomie",
    introP1: "Künstliche Intelligenz ist keine Science-Fiction: Sie ist bereits in Tausenden Restaurants weltweit im Einsatz. Von intelligenten Reservierungssystemen bis zur prädiktiven Nachfrageanalyse ermöglicht KI bessere Entscheidungen mit weniger Aufwand.",
    introP2: "Es gibt jedoch einen Bereich, in dem der Einfluss besonders groß sein kann: den Weinverkauf. Wein ist das margenstärkste Produkt der Gastronomie, zugleich aber eines der schwierigsten ohne klare Strategie. KI verändert die Spielregeln.",
    introItems: [
      { icon: Bot, text: "Personalisierte Empfehlungen" },
      { icon: LineChart, text: "Preisoptimierung" },
      { icon: BarChart3, text: "Analyse der Verkaufsdaten" },
      { icon: Zap, text: "Prozessautomatisierung" },
    ],
    problemTag: "Das Problem",
    problemH2pre: "Warum Restaurants", problemH2accent: "Weinverkäufe verlieren",
    problemSubtitle: "Ohne intelligente Werkzeuge hängt der Weinverkauf vom Zufall ab, nicht von der Strategie.",
    problems: [
      { icon: Users, title: "Nicht geschultes Personal", desc: "Die meisten Servicekräfte können nicht mit Sicherheit empfehlen, was den Verkauf höherwertiger Referenzen bremst." },
      { icon: Eye, title: "Verwirrende Karten für den Gast", desc: "Endlose Listen ohne Kontext führen dazu, dass der Gast nach Preis statt nach Vorliebe wählt." },
      { icon: AlertTriangle, title: "Entscheidungen ohne Daten", desc: "Weineinkauf und Kartengestaltung beruhen auf Intuition, nicht auf realer Leistungsauswertung." },
      { icon: ShoppingCart, title: "Impulsverkauf statt Strategie", desc: "Ohne Empfehlungswerkzeuge wird Wein zufällig verkauft — Marge und Chancen gehen verloren." },
    ],
    aiTag: "Praktische Anwendungen",
    aiH2pre: "Wie KI hilft,", aiH2accent: "mehr Wein zu verkaufen",
    aiSubtitle: "KI verwandelt jeden Berührungspunkt mit dem Wein in eine Verkaufschance.",
    aiApps: [
      { icon: Sparkles, title: "Intelligente Empfehlungen", desc: "KI analysiert Vorlieben, gewähltes Gericht und Kontext, um jederzeit den perfekten Wein vorzuschlagen." },
      { icon: Utensils, title: "Automatische Speisenbegleitung", desc: "Algorithmen verknüpfen sensorische Profile mit der Speisekarte, um optimale Kombinationen vorzuschlagen." },
      { icon: BarChart3, title: "Verkaufsanalyse", desc: "Echtzeit-Dashboards zeigen, welche Weine sich verkaufen, welche schlecht rotieren und wo versteckte Marge liegt." },
      { icon: Target, title: "Karten-Optimierung", desc: "Automatische Erkennung von Lücken, Stil-Duplikaten und schlecht strukturierten Preisspannen." },
      { icon: RotateCcw, title: "Rotationsprognose", desc: "Prognosemodelle zeigen frühzeitig, welche Referenzen einen Schub brauchen und welche zu verderben drohen." },
    ],
    winerimTag: "Winerim", winerimH2pre: "KI speziell für den", winerimH2accent: "Weinverkauf",
    winerimDesc: "Winerim setzt auf KI, die gezielt für die Weinwelt in der Gastronomie trainiert wurde. Es ist kein generischer Chatbot, sondern eine Plattform, die Önologie, Speisenbegleitungen, Kartenstrukturen und Gästeverhalten versteht.",
    winerimFeatures: [
      { title: "Analysiert Ihre Weinkarte", desc: "Erkennt Preisungleichgewichte, Stil-Duplikate und Verbesserungschancen in Minuten." },
      { title: "Empfiehlt Gästen Weine", desc: "Ein virtueller Sommelier, der den Gast nach Geschmack und Gericht zur besten Wahl führt." },
      { title: "Optimiert die Struktur", desc: "Reorganisiert Kategorien, Preisspannen und Referenzen, um die Konversion zu maximieren." },
      { title: "Verbessert die Rotation", desc: "Erkennt stagnierende Weine und schlägt intelligente Strategien vor, um Bestände zu bewegen." },
    ],
    aiEngineLabel: "Winerim KI-Engine",
    aiEngineLines: ["Weinkartenanalyse abgeschlossen", "3 Preisungleichgewichte erkannt", "12 Chancen zur Speisenbegleitung", "Rotation bei 8 Referenzen optimierbar", "+18% Durchschnittsbon-Potenzial"],
    benefitsTag: "Vorteile", benefitsH2pre: "Was erreichen Restaurants mit", benefitsH2accent: "KI",
    benefits: [
      { icon: TrendingUp, text: "Weinverkäufe steigern" },
      { icon: ShoppingCart, text: "Durchschnittsbon verbessern" },
      { icon: Users, text: "Servicepersonal unterstützen" },
      { icon: Wine, text: "Weinkeller optimieren" },
      { icon: Sparkles, text: "Gästeerlebnis verbessern" },
    ],
    futureTag: "Blick nach vorn", futureH2pre: "Die Zukunft der KI in", futureH2accent: "Restaurants",
    futureP1: "Immer mehr Restaurants setzen auf KI-basierte Werkzeuge, um fundierte Entscheidungen zu treffen. Von der Lieferantenauswahl bis zur Personalisierung des gastronomischen Erlebnisses wird KI zum unverzichtbaren Verbündeten.",
    futureP2: "Restaurants, die KI in den täglichen Betrieb integrieren, verkaufen nicht nur mehr: Sie bieten ein besseres Erlebnis, binden Gäste stärker und optimieren jeden investierten Euro im Keller. Die Frage ist nicht, ob Sie KI einsetzen, sondern wann.",
    ctaTag: "Machen Sie den ersten Schritt", ctaH2pre: "Entdecken Sie, wie KI", ctaH2accent: "Ihre Weinkarte verbessern kann",
    ctaDesc: "Senden Sie uns Ihre Karte und wir zeigen Ihnen das Optimierungspotenzial mit KI. Unverbindlich.",
    ctaBtn: "Demo anfordern", ctaSecondary: "Meine Karte analysieren",
    links: [
      { to: "/de/weinkarten-software", label: "Weinkarten-Software", type: "solution" },
      { to: "/de/speisen-wein-generator", label: "KI-Speisenbegleitungs-Generator", type: "tool" },
      { to: "/de/weinkarten-analyzer", label: "Weinkarten-Analyzer", type: "tool" },
      { to: "/de/loesungen/restaurantgruppen", label: "Winerim für Gruppen", type: "solution" },
    ],
    faqData: [
      { q: "Wie kann KI einem Restaurant helfen, mehr Wein zu verkaufen?", a: "KI analysiert die Vorlieben des Gastes, schlägt automatisch Speisenbegleitungen vor und optimiert die Weinkarte, um Verkäufe und Durchschnittsbon zu maximieren." },
      { q: "Was ist ein KI-Weinempfehler?", a: "Ein System, das mit KI-Algorithmen personalisierte Weine basierend auf Geschmack, Gericht und Kontext vorschlägt." },
      { q: "Welche Vorteile bietet KI für die Gastronomie?", a: "Sie ermöglicht personalisierte Empfehlungen, Preis- und Kartenoptimierung, Analyse der Verkaufsdaten und Automatisierung von Prozessen, die zuvor ausschließlich vom Personal abhingen." },
    ],
  },
  pt: {
    metaTitle: "Inteligência Artificial para Restaurantes | IA para Vender Mais Vinho",
    metaDescription: "Descubra como a IA ajuda os restaurantes a vender mais vinho, otimizar a garrafeira e melhorar a experiência do cliente.",
    url: "https://winerim.wine/pt/inteligencia-artificial-restaurantes",
    breadcrumb: "IA para restaurantes", badge: "IA + Restauração",
    h1pre: "Inteligência artificial para", h1accent: "restaurantes",
    subtitle: "Como a IA está a ajudar os restaurantes a vender mais vinho, otimizar a garrafeira e melhorar a experiência do cliente.",
    ctaDiscover: "Descobrir como funciona", ctaAnalyze: "Analisar a minha carta de vinhos",
    introTag: "A revolução silenciosa",
    introH2pre: "A IA já está a transformar a", introH2accent: "restauração",
    introP1: "A inteligência artificial não é ficção científica: já está presente em milhares de restaurantes em todo o mundo. De sistemas inteligentes de reservas à análise preditiva de procura, a IA permite tomar melhores decisões com menos esforço.",
    introP2: "Mas há uma área em que o impacto pode ser especialmente grande: a venda de vinho. O vinho é o produto com maior margem na restauração, mas também um dos mais difíceis de vender sem uma estratégia clara. A IA muda as regras do jogo.",
    introItems: [
      { icon: Bot, text: "Recomendações personalizadas" },
      { icon: LineChart, text: "Otimização de preços" },
      { icon: BarChart3, text: "Análise de dados de vendas" },
      { icon: Zap, text: "Automatização de processos" },
    ],
    problemTag: "O problema",
    problemH2pre: "Porque é que os restaurantes", problemH2accent: "perdem vendas de vinho",
    problemSubtitle: "Sem ferramentas inteligentes, a venda de vinho depende do acaso, não da estratégia.",
    problems: [
      { icon: Users, title: "Pessoal sem formação em vinhos", desc: "A maioria dos empregados não consegue recomendar com confiança, travando a venda de referências de maior valor." },
      { icon: Eye, title: "Cartas confusas para o cliente", desc: "Listagens intermináveis sem contexto levam o cliente a escolher pelo preço, não pela preferência." },
      { icon: AlertTriangle, title: "Decisões sem dados", desc: "A compra de vinho e o desenho da carta baseiam-se na intuição, não em análise real de desempenho." },
      { icon: ShoppingCart, title: "Venda por impulso, não por estratégia", desc: "Sem ferramentas de recomendação, o vinho vende-se (ou não) de forma aleatória, perdendo margem e oportunidades." },
    ],
    aiTag: "Aplicações práticas",
    aiH2pre: "Como a IA ajuda a", aiH2accent: "vender mais vinho",
    aiSubtitle: "A IA transforma cada ponto de contacto com o vinho numa oportunidade de venda.",
    aiApps: [
      { icon: Sparkles, title: "Recomendações inteligentes", desc: "A IA analisa preferências do cliente, prato escolhido e contexto para sugerir o vinho perfeito em cada momento." },
      { icon: Utensils, title: "Harmonizações automáticas", desc: "Algoritmos que cruzam perfis organolépticos com a ementa para propor combinações ótimas." },
      { icon: BarChart3, title: "Análise de vendas", desc: "Dashboards em tempo real que mostram que vinhos se vendem, quais rodam pouco e onde está a margem escondida." },
      { icon: Target, title: "Otimização da carta", desc: "Deteção automática de lacunas, duplicações de estilo e gamas de preço mal estruturadas." },
      { icon: RotateCcw, title: "Previsão de rotação", desc: "Modelos preditivos que antecipam que referências precisam de impulso e quais estão em risco de caducar." },
    ],
    winerimTag: "Winerim", winerimH2pre: "IA desenhada para a", winerimH2accent: "venda de vinho",
    winerimDesc: "A Winerim aplica inteligência artificial especificamente treinada para o mundo do vinho na restauração. Não é um chatbot genérico: é uma plataforma que percebe de enologia, harmonizações, estruturas de carta e comportamento do comensal.",
    winerimFeatures: [
      { title: "Analisa a sua carta de vinhos", desc: "Deteta desequilíbrios de preço, duplicações de estilo e oportunidades de melhoria em minutos." },
      { title: "Recomenda vinhos aos clientes", desc: "Um escanção virtual que guia o cliente para a melhor escolha consoante o gosto e o prato." },
      { title: "Otimiza a estrutura", desc: "Reorganiza categorias, gamas de preço e referências para maximizar a conversão." },
      { title: "Melhora a rotação", desc: "Identifica vinhos parados e propõe estratégias para movimentar stock de forma inteligente." },
    ],
    aiEngineLabel: "Motor de IA Winerim",
    aiEngineLines: ["Análise da carta concluída", "3 desequilíbrios de preço detetados", "12 oportunidades de harmonização", "Rotação otimizável em 8 referências", "+18% de potencial de bilhete médio"],
    benefitsTag: "Benefícios", benefitsH2pre: "O que conseguem os restaurantes com", benefitsH2accent: "IA",
    benefits: [
      { icon: TrendingUp, text: "Aumentar as vendas de vinho" },
      { icon: ShoppingCart, text: "Melhorar o bilhete médio" },
      { icon: Users, text: "Apoiar o pessoal de sala" },
      { icon: Wine, text: "Otimizar a garrafeira" },
      { icon: Sparkles, text: "Melhorar a experiência do cliente" },
    ],
    futureTag: "A olhar para o futuro", futureH2pre: "O futuro da IA nos", futureH2accent: "restaurantes",
    futureP1: "Cada vez mais restaurantes vão adotar ferramentas baseadas em IA para tomar decisões informadas. Da seleção de fornecedores à personalização da experiência gastronómica, a IA vai tornar-se um aliado indispensável.",
    futureP2: "Os restaurantes que integrem IA na operação diária não vão apenas vender mais: vão oferecer uma experiência superior, fidelizar melhor os clientes e otimizar cada euro investido na garrafeira. A pergunta não é se vai adotar IA, mas quando.",
    ctaTag: "Dê o primeiro passo", ctaH2pre: "Descubra como a IA pode", ctaH2accent: "melhorar a sua carta de vinhos",
    ctaDesc: "Envie-nos a sua carta e mostramos-lhe o potencial de otimização com IA. Sem compromisso.",
    ctaBtn: "Pedir demo", ctaSecondary: "Analisar a minha carta",
    links: [
      { to: "/pt/software-carta-de-vinhos", label: "Software de carta de vinhos", type: "solution" },
      { to: "/pt/gerador-harmonizacoes-vinho", label: "Gerador de harmonizações com IA", type: "tool" },
      { to: "/pt/analisador-carta-de-vinhos", label: "Analisador de carta", type: "tool" },
      { to: "/pt/solucoes/grupos-restauracao", label: "Winerim para grupos", type: "solution" },
    ],
    faqData: [
      { q: "Como pode a IA ajudar um restaurante a vender mais vinho?", a: "A IA analisa as preferências do cliente, sugere harmonizações automáticas e otimiza a carta de vinhos para maximizar vendas e bilhete médio." },
      { q: "O que é um recomendador de vinhos com IA?", a: "É um sistema que utiliza algoritmos de inteligência artificial para sugerir vinhos personalizados consoante os gostos do comensal, o prato escolhido e o contexto da refeição." },
      { q: "Que benefícios tem a IA para a restauração?", a: "Permite recomendar de forma personalizada, otimizar preços e cartas, analisar dados de vendas e automatizar processos que antes dependiam exclusivamente do pessoal." },
    ],
  },
};

const IARestaurantes = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "ia-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqData.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
    document.head.appendChild(faqSchema);
    return () => { document.getElementById("ia-faq-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url}
        hreflang={allLangPaths("/inteligencia-artificial-restaurantes")} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Breadcrumbs items={[{ label: t.breadcrumb }]} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Brain size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8">
                {t.h1pre}{" "}<span className="text-gradient-wine italic">{t.h1accent}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">{t.subtitle}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link to="/demo" className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center">
                  {t.ctaDiscover}
                </Link>
                <Link to="/analisis-carta" className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300">
                  {t.ctaAnalyze}
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                <img src={mockupImg} alt="Winerim AI wine recommendation interface showing personalized suggestions on tablet" className="relative w-full max-w-lg mx-auto drop-shadow-2xl" loading="eager" fetchPriority="high" width={800} height={600} />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.introTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.introH2pre} <span className="text-gradient-wine italic">{t.introH2accent}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="prose-custom max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.introP1}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.introP2}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.introItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                    <item.icon size={20} className="text-wine shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.problemH2pre} <span className="text-gradient-wine italic">{t.problemH2accent}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.problemSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-destructive" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI APPLICATIONS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.aiTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.aiH2pre} <span className="text-gradient-wine italic">{t.aiH2accent}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.aiSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.aiApps.map((app, i) => {
              const Icon = app.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{app.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WINERIM */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.winerimTag}</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  {t.winerimH2pre} <span className="text-gradient-wine italic">{t.winerimH2accent}</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.winerimDesc}</p>
                <div className="space-y-5">
                  {t.winerimFeatures.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Cpu size={16} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-2xl" />
                <div className="relative bg-gradient-card rounded-2xl border border-border p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain size={20} className="text-wine" />
                    <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">{t.aiEngineLabel}</span>
                  </div>
                  {t.aiEngineLines.map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-3 border border-border">
                      <Sparkles size={14} className="text-wine shrink-0" />
                      <span className="text-sm">{line}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.benefitsTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.benefitsH2pre} <span className="text-gradient-wine italic">{t.benefitsH2accent}</span>?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{benefit.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.futureTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.futureH2pre} <span className="text-gradient-wine italic">{t.futureH2accent}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.futureP1}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.futureP2}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaTag}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaH2pre}{" "}<span className="text-gradient-wine italic">{t.ctaH2accent}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaBtn} <ArrowRight size={16} />
                </Link>
                <Link to="/analisis-carta" className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default IARestaurantes;
