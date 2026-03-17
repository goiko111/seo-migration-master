import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Monitor, Filter, Utensils, Eye, BarChart3, Sparkles,
  ShoppingCart, TrendingUp, Users, Wine, FileText, Smartphone,
  CheckCircle2, XCircle, MinusCircle, AlertTriangle, Layers,
  RefreshCw, Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import QuickAnswer from "@/components/seo/QuickAnswer";
import NotForSection from "@/components/seo/NotForSection";
import LimitationsBox from "@/components/seo/LimitationsBox";
import dashboardImg from "@/assets/winerim-dashboard-insights.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

/* ── i18n content ── */
interface PageContent {
  metaTitle: string;
  metaDescription: string;
  url: string;
  hreflang: { lang: string; url: string }[];
  breadcrumb: string;
  badge: string;
  h1pre: string;
  h1accent: string;
  heroDesc: string;
  demoCta: string;
  analyzeCta: string;
  demoUrl: string;
  analyzeUrl: string;
  introH2pre: string;
  introH2accent: string;
  introP1: string;
  introP2strong: string;
  introP2rest: string;
  problems: string[];
  whatIsTag: string;
  whatIsH2pre: string;
  whatIsH2accent: string;
  whatIsDesc: string;
  whatIs: { text: string }[];
  featuresTag: string;
  featuresH2pre: string;
  featuresH2accent: string;
  features: { title: string; desc: string }[];
  benefitsTag: string;
  benefitsH2pre: string;
  benefitsH2accent: string;
  benefits: { title: string; desc: string }[];
  resultsTag: string;
  resultsH2pre: string;
  resultsH2accent: string;
  results: { value: string; label: string }[];
  compH2pre: string;
  compH2accent: string;
  compHeaders: { paper: string; pdf: string; smart: string };
  compRows: { feature: string; paper: boolean | string; pdf: boolean | string; smart: boolean | string }[];
  qa1q: string; qa1a: string; qa1details: string[];
  qa1source?: string;
  qa2q: string; qa2a: string; qa2details: string[];
  idealFor: string[];
  notFor: string[];
  limitations: string[];
  faqs: { q: string; a: string }[];
  ctaTag: string;
  ctaH2pre: string;
  ctaH2accent: string;
  ctaDesc: string;
  links: { to: string; label: string; type: "guide" | "tool" | "solution" | "resource" }[];
}

const whatIsIcons = [Layers, Filter, Sparkles, Utensils, Eye, BarChart3];
const featureIcons = [Monitor, Filter, Utensils, Eye, Search, Sparkles];
const benefitIcons = [TrendingUp, RefreshCw, Users, ShoppingCart, Wine];
const resultIcons = [Wine, TrendingUp, BarChart3];

const i18n: Record<SupportedLang, PageContent> = {
  es: {
    metaTitle: "Software para Carta de Vinos en Restaurantes | Winerim",
    metaDescription: "El mejor software para gestionar tu carta de vinos: recomendaciones con IA, maridajes automáticos, analítica y carta digital interactiva para restaurantes.",
    url: "https://winerim.wine/software-carta-de-vinos",
    hreflang: [
      { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
      { lang: "en", url: "https://winerim.wine/en/wine-list-management-software" },
      { lang: "it", url: "https://winerim.wine/it/software-carta-vini" },
      { lang: "fr", url: "https://winerim.wine/fr/logiciel-carte-des-vins" },
    ],
    breadcrumb: "Software carta de vinos",
    badge: "Software para hostelería",
    h1pre: "Software para", h1accent: "carta de vinos",
    heroDesc: "Gestiona tu carta, optimiza tu bodega y aumenta las ventas de vino con una plataforma diseñada para hostelería.",
    demoCta: "Solicitar demo", analyzeCta: "Analizar mi carta de vinos",
    demoUrl: "/demo", analyzeUrl: "/analisis-carta",
    introH2pre: "La carta de vinos en papel", introH2accent: "ya no es suficiente",
    introP1: "Muchos restaurantes siguen utilizando cartas estáticas en papel o PDF que no ayudan a vender vino. Son difíciles de actualizar, no ofrecen información relevante al comensal y no generan ningún dato útil para el negocio.",
    introP2strong: "software especializado para carta de vinos", introP2rest: "resuelve estos problemas y convierte la carta en una herramienta activa de venta.",
    problems: [
      "Cartas difíciles de entender para el comensal",
      "Falta de recomendaciones que guíen la compra",
      "Mala gestión de precios y escalado de gama",
      "Dificultad para actualizar referencias en tiempo real",
      "Ausencia total de analítica sobre ventas de vino",
    ],
    whatIsTag: "Concepto", whatIsH2pre: "Qué es un software de", whatIsH2accent: "carta de vinos",
    whatIsDesc: "Una plataforma inteligente que centraliza la gestión de tu bodega y transforma la experiencia del comensal.",
    whatIs: [
      { text: "Gestionar todas las referencias de tu bodega de forma centralizada" },
      { text: "Organizar la carta por estilos, regiones, precios o maridajes" },
      { text: "Recomendar vinos de forma automática e inteligente" },
      { text: "Mostrar maridajes personalizados con cada plato del menú" },
      { text: "Mejorar la experiencia del cliente con información visual y accesible" },
      { text: "Analizar ventas, rotación y rentabilidad de cada referencia" },
    ],
    featuresTag: "Funcionalidades", featuresH2pre: "Todo lo que necesitas para", featuresH2accent: "vender más vino",
    features: [
      { title: "Carta digital interactiva", desc: "El comensal navega tu carta desde su móvil con una experiencia visual moderna que invita a explorar y comprar." },
      { title: "Filtros inteligentes", desc: "Búsqueda por tipo, región, precio, maridaje o estilo. El cliente encuentra su vino ideal en segundos." },
      { title: "Maridajes automáticos", desc: "El sistema sugiere vinos que combinan con cada plato del menú, impulsando las ventas cruzadas." },
      { title: "Información clara para el cliente", desc: "Notas de cata accesibles, imágenes de calidad y descripciones sin tecnicismos que cualquier persona entiende." },
      { title: "Comparador de vinos", desc: "El comensal compara opciones lado a lado para elegir con confianza y descubrir vinos de mayor valor." },
      { title: "Recomendaciones personalizadas", desc: "La IA aprende del contexto y sugiere vinos según las preferencias del comensal, el plato elegido y la ocasión." },
    ],
    benefitsTag: "Beneficios", benefitsH2pre: "Qué gana tu restaurante con", benefitsH2accent: "Winerim",
    benefits: [
      { title: "Aumentar el ticket medio", desc: "Las recomendaciones inteligentes y el upselling contextual pueden incrementar el gasto medio en vino entre un 15 % y un 25 %, según el tipo de restaurante y la implementación." },
      { title: "Mejorar la rotación de vinos", desc: "La analítica identifica vinos sin rotación y sugiere acciones para dar salida a stock parado." },
      { title: "Ayudar al personal de sala", desc: "El equipo no necesita ser sommelier: la carta digital hace el trabajo de recomendación por ellos." },
      { title: "Facilitar la decisión del cliente", desc: "Una carta clara, visual y con recomendaciones reduce la indecisión y aumenta la satisfacción." },
      { title: "Mejorar la experiencia gastronómica", desc: "El vino deja de ser una decisión estresante y se convierte en parte memorable de la experiencia." },
    ],
    resultsTag: "Resultados", resultsH2pre: "Resultados reales con", resultsH2accent: "Winerim",
    results: [
      { value: "Más vino vendido", label: "Los clientes exploran y piden más referencias con la carta digital" },
      { value: "Mayor ticket", label: "Las recomendaciones inteligentes impulsan ventas de mayor valor" },
      { value: "Mejor rotación", label: "La analítica identifica qué vinos funcionan y cuáles no" },
    ],
    compH2pre: "Carta tradicional vs.", compH2accent: "carta digital inteligente",
    compHeaders: { paper: "Papel", pdf: "PDF", smart: "Inteligente" },
    compRows: [
      { feature: "Actualización en tiempo real", paper: false, pdf: false, smart: true },
      { feature: "Recomendaciones personalizadas", paper: false, pdf: false, smart: true },
      { feature: "Maridajes automáticos", paper: false, pdf: false, smart: true },
      { feature: "Filtros y búsqueda", paper: false, pdf: false, smart: true },
      { feature: "Analítica de ventas", paper: false, pdf: false, smart: true },
      { feature: "Información visual y accesible", paper: false, pdf: "partial", smart: true },
      { feature: "Coste de impresión", paper: true, pdf: false, smart: false },
      { feature: "Necesita conexión", paper: false, pdf: "partial", smart: true },
    ],
    qa1q: "¿Qué es un software de carta de vinos?",
    qa1a: "Es una plataforma digital que permite a restaurantes gestionar, organizar y presentar su carta de vinos de forma interactiva. A diferencia de un PDF o una carta impresa, incluye recomendaciones inteligentes, maridajes automáticos, analítica de ventas y gestión de stock.",
    qa1details: ["Funciona en cualquier dispositivo: tablet, móvil o QR", "No requiere instalación — opera 100 % en la nube", "Complementa (no sustituye) al sommelier o equipo de sala"],
    qa1source: "Winerim opera desde 2024 en restaurantes independientes, grupos de restauración y hoteles en España y Europa.",
    qa2q: "¿Qué diferencia hay entre Winerim y un simple QR con PDF?",
    qa2a: "Un QR con PDF es un archivo estático: no recomienda, no analiza y no se actualiza solo. Winerim es una plataforma activa que sugiere vinos al comensal, muestra maridajes con cada plato, analiza qué se vende y optimiza precios automáticamente.",
    qa2details: ["Un PDF no sabe qué vino recomendar — Winerim sí", "Un PDF no detecta vinos muertos — Winerim alerta sobre ellos", "Un PDF no genera datos — Winerim ofrece analítica en tiempo real"],
    idealFor: ["Restaurantes con 30+ referencias de vino en carta", "Grupos de restauración con múltiples locales", "Hoteles con restaurante y room service", "Wine bars y vinotecas con oferta amplia", "Restaurantes que quieren vender más vino sin un sommelier a tiempo completo"],
    notFor: ["Restaurantes con menos de 15 referencias de vino", "Negocios sin servicio de mesa (fast food, take-away)", "Establecimientos que no venden vino en carta", "Restaurantes que no quieren digitalizar ningún proceso"],
    limitations: ["Winerim no integra directamente con todos los TPV del mercado — consulta las integraciones disponibles", "La calidad de las recomendaciones mejora con el uso; los primeros días trabaja con la información de la carta existente", "No gestiona la logística de compra de vino — sí sugiere qué comprar basándose en datos de venta y rotación", "Los resultados de mejora en ticket medio varían según el tipo de restaurante, la implementación y la formación del equipo"],
    faqs: [
      { q: "¿Qué es un software de carta de vinos?", a: "Es una plataforma digital que permite a restaurantes gestionar, organizar y presentar su carta de vinos de forma interactiva, con funcionalidades como recomendaciones inteligentes, maridajes automáticos y analítica de ventas." },
      { q: "¿Cuánto cuesta implementar un software de carta de vinos?", a: "Depende de la plataforma. Winerim ofrece planes adaptados al tamaño del restaurante, con un análisis gratuito de la carta como punto de partida para evaluar el potencial de mejora." },
      { q: "¿Es difícil de implementar para el restaurante?", a: "No. Winerim se configura en menos de 24 horas. Solo necesitas enviar tu carta de vinos actual y el equipo se encarga de digitalizarla y optimizarla." },
      { q: "¿Funciona en cualquier dispositivo?", a: "Sí. La carta digital es 100 % responsive y funciona en móviles, tablets y ordenadores sin necesidad de instalar ninguna aplicación." },
      { q: "¿Sustituye al sommelier?", a: "No sustituye, complementa. La plataforma ayuda al personal de sala a recomendar con confianza y ofrece recomendaciones automáticas cuando el sommelier no está disponible." },
    ],
    ctaTag: "Empieza hoy", ctaH2pre: "Convierte tu carta de vinos en un sistema que", ctaH2accent: "vende más vino",
    ctaDesc: "Descubre cómo Winerim puede transformar la forma en que tu restaurante vende vino. Sin compromiso.",
    links: [
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica: la capa de IA táctica", type: "solution" },
      { to: "/carta-papel-vs-digital", label: "Carta papel vs digital", type: "guide" },
      { to: "/inteligencia-artificial-restaurantes", label: "IA para restaurantes", type: "guide" },
      { to: "/wine-roi-calculator", label: "Calculadora de ROI", type: "tool" },
      { to: "/casos-exito", label: "Casos de éxito", type: "guide" },
    ],
  },
  en: {
    metaTitle: "Wine List Software for Restaurants | Winerim",
    metaDescription: "The best software to manage your wine list: AI recommendations, automatic pairings, analytics and interactive digital wine list for restaurants.",
    url: "https://winerim.wine/en/wine-list-management-software",
    hreflang: [
      { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
      { lang: "en", url: "https://winerim.wine/en/wine-list-management-software" },
      { lang: "it", url: "https://winerim.wine/it/software-carta-vini" },
      { lang: "fr", url: "https://winerim.wine/fr/logiciel-carte-des-vins" },
    ],
    breadcrumb: "Wine list software",
    badge: "Hospitality software",
    h1pre: "Software for", h1accent: "wine list",
    heroDesc: "Manage your list, optimize your cellar and boost wine sales with a platform built for hospitality.",
    demoCta: "Request demo", analyzeCta: "Analyze my wine list",
    demoUrl: "/en/demo", analyzeUrl: "/en/wine-list-analysis",
    introH2pre: "A paper wine list is", introH2accent: "no longer enough",
    introP1: "Many restaurants still use static paper or PDF lists that don't help sell wine. They're hard to update, offer no relevant information to guests and generate no useful data for the business.",
    introP2strong: "specialized wine list software", introP2rest: "solves these problems and turns the list into an active sales tool.",
    problems: [
      "Lists that are hard for guests to understand",
      "No recommendations to guide purchasing",
      "Poor pricing management and range scaling",
      "Difficulty updating references in real time",
      "Complete absence of wine sales analytics",
    ],
    whatIsTag: "Concept", whatIsH2pre: "What is", whatIsH2accent: "wine list software",
    whatIsDesc: "An intelligent platform that centralizes cellar management and transforms the guest experience.",
    whatIs: [
      { text: "Manage all your cellar references centrally" },
      { text: "Organize the list by styles, regions, prices or pairings" },
      { text: "Recommend wines automatically and intelligently" },
      { text: "Show personalized pairings with each menu dish" },
      { text: "Improve the guest experience with visual, accessible information" },
      { text: "Analyze sales, rotation and profitability per reference" },
    ],
    featuresTag: "Features", featuresH2pre: "Everything you need to", featuresH2accent: "sell more wine",
    features: [
      { title: "Interactive digital list", desc: "Guests browse your list from their phone with a modern visual experience that invites exploration and purchase." },
      { title: "Smart filters", desc: "Search by type, region, price, pairing or style. Guests find their ideal wine in seconds." },
      { title: "Automatic pairings", desc: "The system suggests wines that complement each menu dish, driving cross-sales." },
      { title: "Clear guest information", desc: "Accessible tasting notes, quality images and jargon-free descriptions anyone understands." },
      { title: "Wine comparator", desc: "Guests compare options side by side to choose with confidence and discover higher-value wines." },
      { title: "Personalized recommendations", desc: "AI learns from context and suggests wines based on guest preferences, chosen dish and occasion." },
    ],
    benefitsTag: "Benefits", benefitsH2pre: "What your restaurant gains with", benefitsH2accent: "Winerim",
    benefits: [
      { title: "Increase average ticket", desc: "Smart recommendations and contextual upselling can boost average wine spend by 15-25%, depending on restaurant type and implementation." },
      { title: "Improve wine rotation", desc: "Analytics identify non-rotating wines and suggest actions to move stagnant stock." },
      { title: "Help floor staff", desc: "Your team doesn't need to be sommeliers: the digital list handles recommendations for them." },
      { title: "Facilitate guest decisions", desc: "A clear, visual list with recommendations reduces indecision and increases satisfaction." },
      { title: "Enhance the dining experience", desc: "Wine goes from a stressful decision to a memorable part of the experience." },
    ],
    resultsTag: "Results", resultsH2pre: "Real results with", resultsH2accent: "Winerim",
    results: [
      { value: "More wine sold", label: "Guests explore and order more references with the digital list" },
      { value: "Higher ticket", label: "Smart recommendations drive higher-value sales" },
      { value: "Better rotation", label: "Analytics identify which wines work and which don't" },
    ],
    compH2pre: "Traditional list vs.", compH2accent: "smart digital list",
    compHeaders: { paper: "Paper", pdf: "PDF", smart: "Smart" },
    compRows: [
      { feature: "Real-time updates", paper: false, pdf: false, smart: true },
      { feature: "Personalized recommendations", paper: false, pdf: false, smart: true },
      { feature: "Automatic pairings", paper: false, pdf: false, smart: true },
      { feature: "Filters & search", paper: false, pdf: false, smart: true },
      { feature: "Sales analytics", paper: false, pdf: false, smart: true },
      { feature: "Visual, accessible info", paper: false, pdf: "partial", smart: true },
      { feature: "Printing cost", paper: true, pdf: false, smart: false },
      { feature: "Requires connection", paper: false, pdf: "partial", smart: true },
    ],
    qa1q: "What is wine list software?",
    qa1a: "It's a digital platform that lets restaurants manage, organize and present their wine list interactively. Unlike a PDF or printed list, it includes smart recommendations, automatic pairings, sales analytics and stock management.",
    qa1details: ["Works on any device: tablet, mobile or QR", "No installation required — 100% cloud-based", "Complements (doesn't replace) the sommelier or floor team"],
    qa1source: "Winerim has been operating since 2024 in independent restaurants, restaurant groups and hotels across Spain and Europe.",
    qa2q: "What's the difference between Winerim and a simple QR PDF?",
    qa2a: "A QR PDF is a static file: it doesn't recommend, analyze or update itself. Winerim is an active platform that suggests wines to guests, shows pairings with each dish, analyzes what sells and optimizes prices automatically.",
    qa2details: ["A PDF doesn't know which wine to recommend — Winerim does", "A PDF doesn't detect dead stock — Winerim alerts you", "A PDF generates no data — Winerim offers real-time analytics"],
    idealFor: ["Restaurants with 30+ wine references", "Restaurant groups with multiple locations", "Hotels with restaurant and room service", "Wine bars with a broad offering", "Restaurants wanting to sell more wine without a full-time sommelier"],
    notFor: ["Restaurants with fewer than 15 wine references", "Businesses without table service (fast food, takeaway)", "Establishments that don't sell wine", "Restaurants unwilling to digitize any process"],
    limitations: ["Winerim doesn't integrate directly with every POS system — check available integrations", "Recommendation quality improves with usage; the first days it works with existing list data", "It doesn't manage wine purchasing logistics — it does suggest what to buy based on sales and rotation data", "Average ticket improvement results vary by restaurant type, implementation and team training"],
    faqs: [
      { q: "What is wine list software?", a: "It's a digital platform that lets restaurants manage, organize and present their wine list interactively, with features like smart recommendations, automatic pairings and sales analytics." },
      { q: "How much does wine list software cost?", a: "It depends on the platform. Winerim offers plans adapted to restaurant size, with a free list analysis as a starting point to evaluate improvement potential." },
      { q: "Is it hard to implement?", a: "No. Winerim is configured in under 24 hours. You just need to send your current wine list and the team handles digitization and optimization." },
      { q: "Does it work on any device?", a: "Yes. The digital list is 100% responsive and works on phones, tablets and computers with no app installation required." },
      { q: "Does it replace the sommelier?", a: "It doesn't replace — it complements. The platform helps floor staff recommend with confidence and offers automatic recommendations when the sommelier isn't available." },
    ],
    ctaTag: "Get started today", ctaH2pre: "Turn your wine list into a system that", ctaH2accent: "sells more wine",
    ctaDesc: "Discover how Winerim can transform the way your restaurant sells wine. No commitment.",
    links: [
      { to: "/en/product/dynamic-intelligence", label: "Dynamic intelligence: the tactical AI layer", type: "solution" },
      { to: "/en/paper-vs-digital-wine-list", label: "Paper vs digital wine list", type: "guide" },
      { to: "/en/artificial-intelligence-restaurants", label: "AI for restaurants", type: "guide" },
      { to: "/en/wine-roi-calculator", label: "ROI calculator", type: "tool" },
      { to: "/en/case-studies", label: "Case studies", type: "guide" },
    ],
  },
  it: {
    metaTitle: "Software per Carta dei Vini nei Ristoranti | Winerim",
    metaDescription: "Il miglior software per gestire la tua carta dei vini: raccomandazioni con IA, abbinamenti automatici, analitica e carta digitale interattiva per ristoranti.",
    url: "https://winerim.wine/it/software-carta-vini",
    hreflang: [
      { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
      { lang: "en", url: "https://winerim.wine/en/wine-list-management-software" },
      { lang: "it", url: "https://winerim.wine/it/software-carta-vini" },
      { lang: "fr", url: "https://winerim.wine/fr/logiciel-carte-des-vins" },
    ],
    breadcrumb: "Software carta dei vini",
    badge: "Software per la ristorazione",
    h1pre: "Software per", h1accent: "carta dei vini",
    heroDesc: "Gestisci la tua carta, ottimizza la tua cantina e aumenta le vendite di vino con una piattaforma progettata per la ristorazione.",
    demoCta: "Richiedi demo", analyzeCta: "Analizza la mia carta dei vini",
    demoUrl: "/it/demo", analyzeUrl: "/it/analisi-carta",
    introH2pre: "La carta dei vini su carta", introH2accent: "non basta più",
    introP1: "Molti ristoranti utilizzano ancora carte statiche su carta o PDF che non aiutano a vendere vino. Sono difficili da aggiornare, non offrono informazioni rilevanti al commensale e non generano dati utili per il business.",
    introP2strong: "software specializzato per carta dei vini", introP2rest: "risolve questi problemi e trasforma la carta in uno strumento attivo di vendita.",
    problems: [
      "Carte difficili da capire per il commensale",
      "Mancanza di raccomandazioni che guidino l'acquisto",
      "Cattiva gestione dei prezzi e della scala di gamma",
      "Difficoltà ad aggiornare le referenze in tempo reale",
      "Assenza totale di analitica sulle vendite di vino",
    ],
    whatIsTag: "Concetto", whatIsH2pre: "Cos'è un software per", whatIsH2accent: "carta dei vini",
    whatIsDesc: "Una piattaforma intelligente che centralizza la gestione della tua cantina e trasforma l'esperienza del commensale.",
    whatIs: [
      { text: "Gestire tutte le referenze della tua cantina in modo centralizzato" },
      { text: "Organizzare la carta per stili, regioni, prezzi o abbinamenti" },
      { text: "Raccomandare vini in modo automatico e intelligente" },
      { text: "Mostrare abbinamenti personalizzati con ogni piatto del menu" },
      { text: "Migliorare l'esperienza del cliente con informazioni visive e accessibili" },
      { text: "Analizzare vendite, rotazione e redditività di ogni referenza" },
    ],
    featuresTag: "Funzionalità", featuresH2pre: "Tutto ciò che serve per", featuresH2accent: "vendere più vino",
    features: [
      { title: "Carta digitale interattiva", desc: "Il commensale naviga la tua carta dal cellulare con un'esperienza visiva moderna che invita a esplorare e acquistare." },
      { title: "Filtri intelligenti", desc: "Ricerca per tipo, regione, prezzo, abbinamento o stile. Il cliente trova il suo vino ideale in pochi secondi." },
      { title: "Abbinamenti automatici", desc: "Il sistema suggerisce vini che si abbinano a ogni piatto del menu, potenziando le vendite incrociate." },
      { title: "Informazioni chiare per il cliente", desc: "Note di degustazione accessibili, immagini di qualità e descrizioni senza tecnicismi che chiunque capisce." },
      { title: "Comparatore di vini", desc: "Il commensale confronta le opzioni fianco a fianco per scegliere con sicurezza e scoprire vini di maggior valore." },
      { title: "Raccomandazioni personalizzate", desc: "L'IA impara dal contesto e suggerisce vini in base alle preferenze del commensale, al piatto scelto e all'occasione." },
    ],
    benefitsTag: "Benefici", benefitsH2pre: "Cosa guadagna il tuo ristorante con", benefitsH2accent: "Winerim",
    benefits: [
      { title: "Aumentare lo scontrino medio", desc: "Le raccomandazioni intelligenti e l'upselling contestuale possono incrementare la spesa media in vino tra il 15% e il 25%, a seconda del tipo di ristorante e dell'implementazione." },
      { title: "Migliorare la rotazione dei vini", desc: "L'analitica identifica i vini senza rotazione e suggerisce azioni per movimentare lo stock fermo." },
      { title: "Aiutare il personale di sala", desc: "Il team non deve essere sommelier: la carta digitale fa il lavoro di raccomandazione per loro." },
      { title: "Facilitare la decisione del cliente", desc: "Una carta chiara, visiva e con raccomandazioni riduce l'indecisione e aumenta la soddisfazione." },
      { title: "Migliorare l'esperienza gastronomica", desc: "Il vino smette di essere una decisione stressante e diventa parte memorabile dell'esperienza." },
    ],
    resultsTag: "Risultati", resultsH2pre: "Risultati reali con", resultsH2accent: "Winerim",
    results: [
      { value: "Più vino venduto", label: "I clienti esplorano e ordinano più referenze con la carta digitale" },
      { value: "Scontrino più alto", label: "Le raccomandazioni intelligenti spingono vendite di maggior valore" },
      { value: "Migliore rotazione", label: "L'analitica identifica quali vini funzionano e quali no" },
    ],
    compH2pre: "Carta tradizionale vs.", compH2accent: "carta digitale intelligente",
    compHeaders: { paper: "Carta", pdf: "PDF", smart: "Intelligente" },
    compRows: [
      { feature: "Aggiornamento in tempo reale", paper: false, pdf: false, smart: true },
      { feature: "Raccomandazioni personalizzate", paper: false, pdf: false, smart: true },
      { feature: "Abbinamenti automatici", paper: false, pdf: false, smart: true },
      { feature: "Filtri e ricerca", paper: false, pdf: false, smart: true },
      { feature: "Analitica delle vendite", paper: false, pdf: false, smart: true },
      { feature: "Informazioni visive e accessibili", paper: false, pdf: "partial", smart: true },
      { feature: "Costo di stampa", paper: true, pdf: false, smart: false },
      { feature: "Richiede connessione", paper: false, pdf: "partial", smart: true },
    ],
    qa1q: "Cos'è un software per carta dei vini?",
    qa1a: "È una piattaforma digitale che permette ai ristoranti di gestire, organizzare e presentare la carta dei vini in modo interattivo. A differenza di un PDF o di una carta stampata, include raccomandazioni intelligenti, abbinamenti automatici, analitica delle vendite e gestione dello stock.",
    qa1details: ["Funziona su qualsiasi dispositivo: tablet, cellulare o QR", "Non richiede installazione — opera al 100% nel cloud", "Complementa (non sostituisce) il sommelier o il team di sala"],
    qa1source: "Winerim opera dal 2024 in ristoranti indipendenti, gruppi di ristorazione e hotel in Spagna e in Europa.",
    qa2q: "Qual è la differenza tra Winerim e un semplice QR con PDF?",
    qa2a: "Un QR con PDF è un file statico: non raccomanda, non analizza e non si aggiorna da solo. Winerim è una piattaforma attiva che suggerisce vini al commensale, mostra abbinamenti con ogni piatto, analizza cosa si vende e ottimizza i prezzi automaticamente.",
    qa2details: ["Un PDF non sa quale vino raccomandare — Winerim sì", "Un PDF non rileva lo stock morto — Winerim ti avvisa", "Un PDF non genera dati — Winerim offre analitica in tempo reale"],
    idealFor: ["Ristoranti con 30+ referenze di vino in carta", "Gruppi di ristorazione con più locali", "Hotel con ristorante e room service", "Wine bar ed enoteche con offerta ampia", "Ristoranti che vogliono vendere più vino senza un sommelier a tempo pieno"],
    notFor: ["Ristoranti con meno di 15 referenze di vino", "Attività senza servizio al tavolo (fast food, take-away)", "Locali che non vendono vino in carta", "Ristoranti che non vogliono digitalizzare alcun processo"],
    limitations: ["Winerim non si integra direttamente con tutti i POS del mercato — verifica le integrazioni disponibili", "La qualità delle raccomandazioni migliora con l'uso; i primi giorni lavora con le informazioni della carta esistente", "Non gestisce la logistica di acquisto del vino — suggerisce cosa comprare basandosi su dati di vendita e rotazione", "I risultati di miglioramento dello scontrino medio variano in base al tipo di ristorante, all'implementazione e alla formazione del team"],
    faqs: [
      { q: "Cos'è un software per carta dei vini?", a: "È una piattaforma digitale che permette ai ristoranti di gestire, organizzare e presentare la carta dei vini in modo interattivo, con funzionalità come raccomandazioni intelligenti, abbinamenti automatici e analitica delle vendite." },
      { q: "Quanto costa implementare un software per carta dei vini?", a: "Dipende dalla piattaforma. Winerim offre piani adattati alla dimensione del ristorante, con un'analisi gratuita della carta come punto di partenza per valutare il potenziale di miglioramento." },
      { q: "È difficile da implementare?", a: "No. Winerim si configura in meno di 24 ore. Basta inviare la carta dei vini attuale e il team si occupa di digitalizzarla e ottimizzarla." },
      { q: "Funziona su qualsiasi dispositivo?", a: "Sì. La carta digitale è 100% responsive e funziona su cellulari, tablet e computer senza bisogno di installare alcuna applicazione." },
      { q: "Sostituisce il sommelier?", a: "Non sostituisce, complementa. La piattaforma aiuta il personale di sala a raccomandare con sicurezza e offre raccomandazioni automatiche quando il sommelier non è disponibile." },
    ],
    ctaTag: "Inizia oggi", ctaH2pre: "Trasforma la tua carta dei vini in un sistema che", ctaH2accent: "vende più vino",
    ctaDesc: "Scopri come Winerim può trasformare il modo in cui il tuo ristorante vende vino. Senza impegno.",
    links: [
      { to: "/it/prodotto/intelligenza-dinamica", label: "Intelligenza dinamica: il layer di IA tattico", type: "solution" },
      { to: "/it/carta-cartacea-vs-digitale", label: "Carta cartacea vs digitale", type: "guide" },
      { to: "/it/intelligenza-artificiale-ristoranti", label: "IA per ristoranti", type: "guide" },
      { to: "/it/wine-roi-calculator", label: "Calcolatore ROI", type: "tool" },
      { to: "/it/casi-di-successo", label: "Casi di successo", type: "guide" },
    ],
  },
  fr: {
    metaTitle: "Logiciel de Carte des Vins pour Restaurants | Winerim",
    metaDescription: "Le meilleur logiciel pour gérer votre carte des vins : recommandations IA, accords automatiques, analytique et carte digitale interactive pour restaurants.",
    url: "https://winerim.wine/fr/logiciel-carte-des-vins",
    hreflang: [
      { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
      { lang: "en", url: "https://winerim.wine/en/wine-list-management-software" },
      { lang: "it", url: "https://winerim.wine/it/software-carta-vini" },
      { lang: "fr", url: "https://winerim.wine/fr/logiciel-carte-des-vins" },
    ],
    breadcrumb: "Logiciel carte des vins",
    badge: "Logiciel pour la restauration",
    h1pre: "Logiciel pour", h1accent: "carte des vins",
    heroDesc: "Gérez votre carte, optimisez votre cave et augmentez les ventes de vin avec une plateforme conçue pour la restauration.",
    demoCta: "Demander une démo", analyzeCta: "Analyser ma carte des vins",
    demoUrl: "/fr/demo", analyzeUrl: "/fr/analyse-carte",
    introH2pre: "La carte des vins papier", introH2accent: "ne suffit plus",
    introP1: "De nombreux restaurants utilisent encore des cartes statiques en papier ou PDF qui n'aident pas à vendre du vin. Elles sont difficiles à mettre à jour, n'offrent aucune information pertinente au convive et ne génèrent aucune donnée utile pour l'établissement.",
    introP2strong: "logiciel spécialisé pour carte des vins", introP2rest: "résout ces problèmes et transforme la carte en un outil de vente actif.",
    problems: [
      "Cartes difficiles à comprendre pour le convive",
      "Absence de recommandations guidant l'achat",
      "Mauvaise gestion des prix et de l'échelle de gamme",
      "Difficulté à mettre à jour les références en temps réel",
      "Absence totale d'analytique sur les ventes de vin",
    ],
    whatIsTag: "Concept", whatIsH2pre: "Qu'est-ce qu'un logiciel de", whatIsH2accent: "carte des vins",
    whatIsDesc: "Une plateforme intelligente qui centralise la gestion de votre cave et transforme l'expérience du convive.",
    whatIs: [
      { text: "Gérer toutes les références de votre cave de manière centralisée" },
      { text: "Organiser la carte par styles, régions, prix ou accords" },
      { text: "Recommander des vins de façon automatique et intelligente" },
      { text: "Afficher des accords personnalisés avec chaque plat du menu" },
      { text: "Améliorer l'expérience client avec des informations visuelles et accessibles" },
      { text: "Analyser ventes, rotation et rentabilité de chaque référence" },
    ],
    featuresTag: "Fonctionnalités", featuresH2pre: "Tout ce qu'il faut pour", featuresH2accent: "vendre plus de vin",
    features: [
      { title: "Carte digitale interactive", desc: "Le convive parcourt votre carte depuis son téléphone avec une expérience visuelle moderne qui invite à explorer et acheter." },
      { title: "Filtres intelligents", desc: "Recherche par type, région, prix, accord ou style. Le client trouve son vin idéal en quelques secondes." },
      { title: "Accords automatiques", desc: "Le système suggère des vins qui s'accordent avec chaque plat du menu, stimulant les ventes croisées." },
      { title: "Information claire pour le client", desc: "Notes de dégustation accessibles, images de qualité et descriptions sans jargon que tout le monde comprend." },
      { title: "Comparateur de vins", desc: "Le convive compare les options côte à côte pour choisir avec confiance et découvrir des vins de plus grande valeur." },
      { title: "Recommandations personnalisées", desc: "L'IA apprend du contexte et suggère des vins selon les préférences du convive, le plat choisi et l'occasion." },
    ],
    benefitsTag: "Bénéfices", benefitsH2pre: "Ce que votre restaurant gagne avec", benefitsH2accent: "Winerim",
    benefits: [
      { title: "Augmenter le ticket moyen", desc: "Les recommandations intelligentes et l'upselling contextuel peuvent augmenter la dépense moyenne en vin de 15 à 25%, selon le type de restaurant et l'implémentation." },
      { title: "Améliorer la rotation des vins", desc: "L'analytique identifie les vins sans rotation et suggère des actions pour écouler le stock stagnant." },
      { title: "Aider le personnel de salle", desc: "L'équipe n'a pas besoin d'être sommelier : la carte digitale fait le travail de recommandation pour eux." },
      { title: "Faciliter la décision du client", desc: "Une carte claire, visuelle et avec recommandations réduit l'indécision et augmente la satisfaction." },
      { title: "Améliorer l'expérience gastronomique", desc: "Le vin cesse d'être une décision stressante et devient une partie mémorable de l'expérience." },
    ],
    resultsTag: "Résultats", resultsH2pre: "Résultats réels avec", resultsH2accent: "Winerim",
    results: [
      { value: "Plus de vin vendu", label: "Les clients explorent et commandent plus de références avec la carte digitale" },
      { value: "Ticket plus élevé", label: "Les recommandations intelligentes stimulent les ventes de plus haute valeur" },
      { value: "Meilleure rotation", label: "L'analytique identifie quels vins fonctionnent et lesquels non" },
    ],
    compH2pre: "Carte traditionnelle vs.", compH2accent: "carte digitale intelligente",
    compHeaders: { paper: "Papier", pdf: "PDF", smart: "Intelligente" },
    compRows: [
      { feature: "Mise à jour en temps réel", paper: false, pdf: false, smart: true },
      { feature: "Recommandations personnalisées", paper: false, pdf: false, smart: true },
      { feature: "Accords automatiques", paper: false, pdf: false, smart: true },
      { feature: "Filtres et recherche", paper: false, pdf: false, smart: true },
      { feature: "Analytique des ventes", paper: false, pdf: false, smart: true },
      { feature: "Information visuelle et accessible", paper: false, pdf: "partial", smart: true },
      { feature: "Coût d'impression", paper: true, pdf: false, smart: false },
      { feature: "Nécessite une connexion", paper: false, pdf: "partial", smart: true },
    ],
    qa1q: "Qu'est-ce qu'un logiciel de carte des vins ?",
    qa1a: "C'est une plateforme digitale qui permet aux restaurants de gérer, organiser et présenter leur carte des vins de manière interactive. Contrairement à un PDF ou une carte imprimée, elle inclut des recommandations intelligentes, des accords automatiques, de l'analytique des ventes et de la gestion de stock.",
    qa1details: ["Fonctionne sur tout appareil : tablette, mobile ou QR", "Aucune installation requise — 100% cloud", "Complète (ne remplace pas) le sommelier ou l'équipe de salle"],
    qa1source: "Winerim opère depuis 2024 dans des restaurants indépendants, groupes de restauration et hôtels en Espagne et en Europe.",
    qa2q: "Quelle différence entre Winerim et un simple QR PDF ?",
    qa2a: "Un QR PDF est un fichier statique : il ne recommande pas, n'analyse pas et ne se met pas à jour. Winerim est une plateforme active qui suggère des vins au convive, affiche des accords avec chaque plat, analyse ce qui se vend et optimise les prix automatiquement.",
    qa2details: ["Un PDF ne sait pas quel vin recommander — Winerim si", "Un PDF ne détecte pas le stock mort — Winerim vous alerte", "Un PDF ne génère pas de données — Winerim offre de l'analytique en temps réel"],
    idealFor: ["Restaurants avec 30+ références de vin en carte", "Groupes de restauration avec plusieurs établissements", "Hôtels avec restaurant et room service", "Bars à vin avec offre étendue", "Restaurants souhaitant vendre plus de vin sans sommelier à temps plein"],
    notFor: ["Restaurants avec moins de 15 références de vin", "Établissements sans service en salle (fast food, vente à emporter)", "Établissements qui ne vendent pas de vin en carte", "Restaurants ne souhaitant digitaliser aucun processus"],
    limitations: ["Winerim ne s'intègre pas directement avec tous les TPV du marché — vérifiez les intégrations disponibles", "La qualité des recommandations s'améliore avec l'usage ; les premiers jours le système travaille avec les données existantes de la carte", "Ne gère pas la logistique d'achat du vin — suggère quoi acheter en se basant sur les données de vente et rotation", "Les résultats d'amélioration du ticket moyen varient selon le type de restaurant, l'implémentation et la formation de l'équipe"],
    faqs: [
      { q: "Qu'est-ce qu'un logiciel de carte des vins ?", a: "C'est une plateforme digitale qui permet aux restaurants de gérer, organiser et présenter leur carte des vins de manière interactive, avec des fonctionnalités comme les recommandations intelligentes, les accords automatiques et l'analytique des ventes." },
      { q: "Combien coûte un logiciel de carte des vins ?", a: "Cela dépend de la plateforme. Winerim propose des plans adaptés à la taille du restaurant, avec une analyse gratuite de la carte comme point de départ pour évaluer le potentiel d'amélioration." },
      { q: "Est-ce difficile à implémenter ?", a: "Non. Winerim se configure en moins de 24 heures. Il suffit d'envoyer votre carte des vins actuelle et l'équipe se charge de la digitaliser et de l'optimiser." },
      { q: "Ça fonctionne sur tout appareil ?", a: "Oui. La carte digitale est 100% responsive et fonctionne sur téléphones, tablettes et ordinateurs sans installation d'application." },
      { q: "Ça remplace le sommelier ?", a: "Ça ne remplace pas, ça complète. La plateforme aide le personnel de salle à recommander avec confiance et offre des recommandations automatiques quand le sommelier n'est pas disponible." },
    ],
    ctaTag: "Commencez aujourd'hui", ctaH2pre: "Transformez votre carte des vins en un système qui", ctaH2accent: "vend plus de vin",
    ctaDesc: "Découvrez comment Winerim peut transformer la façon dont votre restaurant vend du vin. Sans engagement.",
    links: [
      { to: "/fr/produit/intelligence-dynamique", label: "Intelligence dynamique : la couche d'IA tactique", type: "solution" },
      { to: "/fr/carte-papier-vs-digitale", label: "Carte papier vs digitale", type: "guide" },
      { to: "/fr/intelligence-artificielle-restaurants", label: "IA pour restaurants", type: "guide" },
      { to: "/fr/wine-roi-calculator", label: "Calculateur de ROI", type: "tool" },
      { to: "/fr/cas-clients", label: "Cas clients", type: "guide" },
    ],
  },
};

const CellIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <CheckCircle2 size={18} className="text-wine mx-auto" />;
  if (value === "partial") return <MinusCircle size={18} className="text-accent mx-auto" />;
  return <XCircle size={18} className="text-muted-foreground/40 mx-auto" />;
};

const SoftwareCartaVinos = () => {
  const { lang } = useLanguage();
  const t = i18n[lang];

  useEffect(() => {
    const faqScript = document.createElement("script");
    faqScript.id = "faq-jsonld-software";
    faqScript.type = "application/ld+json";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqScript);
    return () => { faqScript.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.metaTitle}
        description={t.metaDescription}
        url={t.url}
        hreflang={t.hreflang}
      />
      <Navbar />

      <main>
        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Breadcrumbs items={[{ label: t.breadcrumb }]} />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                  <Monitor size={14} className="text-wine" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
                  {t.h1pre}{" "}
                  <span className="text-gradient-wine italic">{t.h1accent}</span>{" "}
                  {lang === "es" ? "en restaurantes" : lang === "en" ? "in restaurants" : lang === "it" ? "nei ristoranti" : "pour restaurants"}
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  {t.heroDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={t.demoUrl}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
                  >
                    {t.demoCta}
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={t.analyzeUrl}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                  >
                    {t.analyzeCta}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                  <img
                    src={dashboardImg}
                    alt={`Dashboard ${t.breadcrumb} Winerim`}
                    className="relative w-full max-w-2xl mx-auto drop-shadow-2xl rounded-xl"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════ 2. INTRODUCCIÓN ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t.introH2pre}{" "}
                <span className="text-gradient-wine">{t.introH2accent}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.introP1}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Un <strong className="text-foreground">{t.introP2strong}</strong> {t.introP2rest}
              </p>
            </ScrollReveal>

            <div className="grid gap-3">
              {t.problems.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-3 bg-gradient-card rounded-lg border border-border p-4">
                    <AlertTriangle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground/90">{p}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 3. QUÉ ES ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.whatIsTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.whatIsH2pre}{" "}
                <span className="text-gradient-wine italic">{t.whatIsH2accent}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.whatIsDesc}</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.whatIs.map((w, i) => {
                const Icon = whatIsIcons[i];
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{w.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. FUNCIONALIDADES ═══════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featuresTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.featuresH2pre}{" "}
                <span className="text-gradient-wine italic">{t.featuresH2accent}</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                        <Icon size={24} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 5. BENEFICIOS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.benefitsTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.benefitsH2pre}{" "}
                <span className="text-gradient-wine italic">{t.benefitsH2accent}</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-5">
              {t.benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon size={22} className="text-wine" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold mb-1">{b.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 6. RESULTADOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.resultsTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.resultsH2pre}{" "}
                <span className="text-gradient-wine italic">{t.resultsH2accent}</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-6">
              {t.results.map((m, i) => {
                const Icon = resultIcons[i];
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="bg-gradient-card rounded-2xl border border-border p-8 text-center hover:border-wine/20 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-5">
                        <Icon size={28} className="text-wine" />
                      </div>
                      <p className="font-heading text-4xl md:text-5xl font-bold text-gradient-wine mb-2">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 7. COMPARATIVA ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {t.compH2pre}{" "}
                <span className="text-gradient-wine italic">{t.compH2accent}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-3 font-semibold text-foreground">
                        {lang === "es" ? "Característica" : lang === "en" ? "Feature" : lang === "it" ? "Caratteristica" : "Caractéristique"}
                      </th>
                      <th className="text-center py-4 px-3 font-semibold text-muted-foreground">
                        <FileText size={16} className="mx-auto mb-1" />{t.compHeaders.paper}
                      </th>
                      <th className="text-center py-4 px-3 font-semibold text-muted-foreground">
                        <Smartphone size={16} className="mx-auto mb-1" />{t.compHeaders.pdf}
                      </th>
                      <th className="text-center py-4 px-3 font-semibold text-wine">
                        <Sparkles size={16} className="mx-auto mb-1" />{t.compHeaders.smart}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.compRows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-3 text-foreground/90">{row.feature}</td>
                        <td className="py-3.5 px-3"><CellIcon value={row.paper} /></td>
                        <td className="py-3.5 px-3"><CellIcon value={row.pdf} /></td>
                        <td className="py-3.5 px-3"><CellIcon value={row.smart} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ CITABILITY BLOCKS ═══════════ */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-12">
          <QuickAnswer question={t.qa1q} answer={t.qa1a} details={t.qa1details} source={t.qa1source} />
          <QuickAnswer question={t.qa2q} answer={t.qa2a} details={t.qa2details} />
          <NotForSection idealFor={t.idealFor} notFor={t.notFor} />
          <LimitationsBox limitations={t.limitations} />
        </section>

        <FAQSection faqs={t.faqs} schemaId="software-carta" />

        {/* ═══════════ 8. CTA FINAL ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaTag}</p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {t.ctaH2pre}{" "}
                    <span className="text-gradient-wine italic">{t.ctaH2accent}</span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to={t.demoUrl}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                    >
                      {t.demoCta}
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={t.analyzeUrl}
                      className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                    >
                      {t.analyzeCta}
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default SoftwareCartaVinos;
