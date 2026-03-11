import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, AlertTriangle, CheckCircle, BarChart3,
  Layers, RefreshCw, DollarSign, TrendingUp, Users, Wine,
  Warehouse, Globe, Sparkles, Store, Search, GitCompare, Box, Expand,
  ScanSearch, Copy, Sliders, ShieldCheck, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

type IntelCard = { title: string; desc: string };
type CapCard = { title: string; desc: string };
type Content = {
  metaTitle: string; metaDescription: string;
  badgeLabel: string; breadSolutions: string; breadLabel: string;
  heroTitle1: string; heroTitleHighlight: string;
  heroDesc: string; ctaDemo: string; ctaContact: string;
  problemLabel: string; problemTitle1: string; problemTitleHighlight: string;
  problems: { text: string }[];
  solutionLabel: string; solutionTitle1: string; solutionTitleHighlight: string;
  advantages: { title: string; desc: string }[];
  capLabel: string; capTitle: string; capSubtitle: string;
  capCards: CapCard[];
  benchLabel: string; benchTitle: string; benchSubtitle: string; benchMetrics: string[]; benchClosing: string;
  featLabel: string; featTitle1: string; featTitleHighlight: string;
  features: { title: string; desc: string }[];
  impactLabel: string; impactTitle1: string; impactTitleHighlight: string;
  results: { value: string; desc: string }[];
  scaleLabel: string; scaleTitle1: string; scaleTitleHighlight: string;
  useCases: { size: string; scenario: string; howLabel: string; how: string; result: string }[];
  intelLabel: string; intelTitle1: string; intelTitleHighlight: string; intelSubtitle: string;
  intelCards: IntelCard[];
  posTitle: string; posSubtitle: string; posBullets: string[]; posCta: string;
  ctaLabel: string; ctaTitle1: string; ctaTitleHighlight: string; ctaDesc: string; ctaButton: string;
  links: { label: string }[];
};

const content: Record<string, Content> = {
  es: {
    metaTitle: "Winerim para Grupos de Restauración | Gestión Centralizada del Vino",
    metaDescription: "Centraliza la gestión de cartas de vino, optimiza precios y aumenta ventas en todos tus restaurantes. Solución para grupos de restauración.",
    badgeLabel: "Grupos de restauración", breadSolutions: "Soluciones", breadLabel: "Grupos de restauración",
    heroTitle1: "Gestión inteligente del vino para ", heroTitleHighlight: "grupos de restauración",
    heroDesc: "Centraliza la gestión de tus cartas de vino, optimiza precios y aumenta las ventas en todos tus restaurantes.",
    ctaDemo: "Solicitar demo", ctaContact: "Hablar con un especialista",
    problemLabel: "El problema", problemTitle1: "Los retos de gestionar el vino en ", problemTitleHighlight: "múltiples locales",
    problems: [
      { text: "Cada restaurante gestiona el vino de forma diferente: cartas distintas, criterios distintos, calidades distintas." },
      { text: "Falta de control sobre los precios: multiplicadores inconsistentes, márgenes desiguales entre locales." },
      { text: "Dificultad para mantener las cartas actualizadas: cambios de añada, nuevas referencias, descatalogados." },
      { text: "Falta de datos centralizados: no sabes qué vinos se venden, cuáles se estancan ni dónde están los márgenes." },
      { text: "Poca visibilidad sobre las ventas de vino: el vino es el producto más rentable pero el menos medido." },
    ],
    solutionLabel: "La solución", solutionTitle1: "Cómo Winerim ayuda a los ", solutionTitleHighlight: "grupos",
    advantages: [
      { title: "Gestión centralizada de cartas", desc: "Una plataforma para gestionar todas las cartas de vino de todos tus locales. Cambios que se aplican al instante." },
      { title: "Control de precios unificado", desc: "Define estrategias de pricing por local, por tipo de vino o por segmento. Consistencia sin rigidez." },
      { title: "Analítica de ventas por local", desc: "Compara el rendimiento de cada restaurante: qué vinos venden más, márgenes, rotación y ticket medio." },
      { title: "Optimización de la oferta", desc: "Identifica duplicados, huecos y oportunidades en cada carta. Adapta la selección al perfil de cada local." },
      { title: "Experiencia del cliente mejorada", desc: "Cartas digitales con maridajes, fichas de vino y recomendaciones inteligentes en todos tus restaurantes." },
    ],
    capLabel: "Capacidades para grupos",
    capTitle: "Qué puede hacer Winerim por un grupo",
    capSubtitle: "Una capa de inteligencia para gobernar el vino a escala, no como locales aislados.",
    capCards: [
      { title: "Comparar unidades", desc: "Comparar rendimiento, rotación, márgenes y comportamiento del vino entre locales." },
      { title: "Detectar oportunidades invisibles", desc: "Encontrar referencias infraexplotadas, huecos de pricing, canibalización y stock inmovilizado." },
      { title: "Decidir qué replicar", desc: "Identificar qué vinos, formatos o estrategias merece la pena escalar al resto del grupo." },
      { title: "Adaptar por tipología de local", desc: "No aplicar la misma lógica a fine dining, casual premium, hotel urbano o destino turístico." },
      { title: "Profesionalizar la categoría", desc: "Reducir dependencia del criterio individual de cada director o sumiller." },
      { title: "Activar reglas por marca o unidad", desc: "Definir prioridades distintas según objetivo de negocio, marca, ciudad o tipo de cliente." },
    ],
    featLabel: "Funcionalidades", featTitle1: "Diseñado para ", featTitleHighlight: "escalar",
    features: [
      { title: "Gestión multi-local", desc: "Dashboard central con vista de todos los restaurantes. Filtra, compara y actúa desde un solo panel." },
      { title: "Actualización centralizada", desc: "Modifica precios, añade referencias o retira vinos en todos los locales con un clic." },
      { title: "Analítica comparativa", desc: "Rankings de ventas, márgenes y rotación entre restaurantes. Detecta best practices y réplicalas." },
      { title: "Control de precios", desc: "Multiplicadores por local, alertas de desviación y sugerencias de optimización automáticas." },
      { title: "Optimización de bodega", desc: "Stock centralizado o descentralizado. Alertas de reposición y análisis de rotación por local." },
    ],
    impactLabel: "Impacto", impactTitle1: "Resultados para ", impactTitleHighlight: "grupos",
    results: [
      { value: "Control total", desc: "Sobre la oferta de vino en todos los locales" },
      { value: "Centralizado", desc: "Gestión de cartas, precios y stock desde un único panel" },
      { value: "En tiempo real", desc: "Cambios aplicados al instante en todos los restaurantes" },
      { value: "Multi-idioma", desc: "Cartas traducidas automáticamente para clientes internacionales" },
    ],
    scaleLabel: "Escalabilidad", scaleTitle1: "Winerim crece ", scaleTitleHighlight: "contigo",
    useCases: [
      { size: "3 restaurantes", scenario: "Un grupo con un gastronómico, un casual y un wine bar.", howLabel: "Cómo funciona", how: "Cada local tiene su carta adaptada pero gestionada desde un mismo panel. Los precios se ajustan según el posicionamiento de cada restaurante.", result: "Consistencia de marca sin perder la personalidad de cada local." },
      { size: "10 restaurantes", scenario: "Cadena de restauración con locales en varias ciudades.", howLabel: "Cómo funciona", how: "Cartas base compartidas con variaciones locales. Analítica centralizada para identificar los vinos más rentables y replicar el éxito.", result: "Reducción del 40% en tiempo de gestión de cartas. +18% en ventas de vino." },
      { size: "50+ restaurantes", scenario: "Gran grupo de restauración con múltiples marcas y conceptos.", howLabel: "Cómo funciona", how: "API integrada con ERP y POS. Gestión por clusters de locales. Reporting automatizado para dirección. Account manager dedicado.", result: "Control total sobre la estrategia de vino en toda la organización." },
    ],
    intelLabel: "Inteligencia de surtido",
    intelTitle1: "Decisiones de surtido y compra basadas en ",
    intelTitleHighlight: "rendimiento real",
    intelSubtitle: "Winerim ayuda a grupos de restauración y hoteleros a decidir qué referencias mantener, replicar, impulsar, retirar o testear según margen, rotación, ticket medio, tipo de unidad y comportamiento real de la carta.",
    intelCards: [
      { title: "Inteligencia de surtido", desc: "Detecta qué estilos, rangos de precio, formatos y referencias funcionan mejor según el tipo de unidad, perfil de cliente y contexto operativo." },
      { title: "Benchmarking entre unidades", desc: "Compara locales, identifica diferencias de rendimiento y detecta qué cartas, vinos o estrategias están funcionando mejor y dónde." },
      { title: "Estandarización inteligente", desc: "Permite definir referencias core, referencias por cluster y vinos específicos por local sin caer en una uniformidad rígida." },
      { title: "Oportunidades de compra y escalado", desc: "Ayuda a decidir qué vinos merece la pena expandir a más unidades, cuáles retirar, cuáles testear en piloto y dónde hay oportunidades de margen o rotación." },
    ],
    posTitle: "Convierte el vino en una unidad de negocio gobernable a escala.",
    posSubtitle: "Lo que hoy suele depender de intuición, hojas de cálculo o criterio desigual entre locales, Winerim lo transforma en una estrategia de grupo más medible, accionable y escalable.",
    posBullets: ["Más control multiunidad", "Más coherencia comercial", "Más visibilidad sobre margen y rotación", "Mejor toma de decisiones de surtido", "Menos dependencia del talento individual"],
    posCta: "Quiero ver cómo funciona para grupos",
    ctaLabel: "Para grupos", ctaTitle1: "Optimiza la gestión del vino en ", ctaTitleHighlight: "todos tus restaurantes",
    ctaDesc: "Te mostramos cómo Winerim se adapta a la estructura de tu grupo. Demo personalizada con tu equipo.",
    ctaButton: "Solicitar demo",
    links: [{ label: "Software carta de vinos" }, { label: "Aumentar ticket medio" }, { label: "Wine List Benchmark" }, { label: "Planes y precios" }],
  },
  en: {
    metaTitle: "Winerim for Restaurant Groups | Centralized Wine Management",
    metaDescription: "Centralize wine list management, optimize pricing, and increase sales across all your restaurants. Solution for restaurant groups.",
    badgeLabel: "Restaurant groups", breadSolutions: "Solutions", breadLabel: "Restaurant groups",
    heroTitle1: "Smart wine management for ", heroTitleHighlight: "restaurant groups",
    heroDesc: "Centralize wine list management, optimize pricing, and boost sales across all your restaurants.",
    ctaDemo: "Request demo", ctaContact: "Talk to a specialist",
    problemLabel: "The problem", problemTitle1: "The challenges of managing wine across ", problemTitleHighlight: "multiple venues",
    problems: [
      { text: "Each restaurant manages wine differently: different lists, different criteria, different quality levels." },
      { text: "Lack of price control: inconsistent multipliers, uneven margins between venues." },
      { text: "Difficulty keeping lists updated: vintage changes, new references, discontinued items." },
      { text: "Lack of centralized data: you don't know which wines sell, which stagnate, or where the margins are." },
      { text: "Poor visibility on wine sales: wine is the most profitable product but the least measured." },
    ],
    solutionLabel: "The solution", solutionTitle1: "How Winerim helps ", solutionTitleHighlight: "groups",
    advantages: [
      { title: "Centralized list management", desc: "One platform to manage all wine lists across all venues. Changes applied instantly." },
      { title: "Unified price control", desc: "Set pricing strategies by venue, wine type, or segment. Consistency without rigidity." },
      { title: "Sales analytics by venue", desc: "Compare each restaurant's performance: top-selling wines, margins, rotation, and average ticket." },
      { title: "Offer optimization", desc: "Identify duplicates, gaps, and opportunities in each list. Adapt selection to each venue's profile." },
      { title: "Enhanced customer experience", desc: "Digital lists with pairings, wine cards, and smart recommendations across all your restaurants." },
    ],
    capLabel: "Capabilities for groups",
    capTitle: "What Winerim can do for a group",
    capSubtitle: "An intelligence layer to govern wine at scale, not as isolated venues.",
    capCards: [
      { title: "Compare units", desc: "Compare performance, rotation, margins, and wine behavior across venues." },
      { title: "Detect invisible opportunities", desc: "Find underexploited references, pricing gaps, cannibalization, and immobilized stock." },
      { title: "Decide what to replicate", desc: "Identify which wines, formats, or strategies are worth scaling across the group." },
      { title: "Adapt by venue type", desc: "Don't apply the same logic to fine dining, casual premium, urban hotel, or tourist destination." },
      { title: "Professionalize the category", desc: "Reduce dependence on individual judgment of each director or sommelier." },
      { title: "Activate rules by brand or unit", desc: "Define different priorities based on business objective, brand, city, or customer type." },
    ],
    featLabel: "Features", featTitle1: "Designed to ", featTitleHighlight: "scale",
    features: [
      { title: "Multi-venue management", desc: "Central dashboard with a view of all restaurants. Filter, compare, and act from one panel." },
      { title: "Centralized updates", desc: "Modify prices, add references, or remove wines across all venues with one click." },
      { title: "Comparative analytics", desc: "Sales rankings, margins, and rotation across restaurants. Detect best practices and replicate them." },
      { title: "Price control", desc: "Multipliers per venue, deviation alerts, and automatic optimization suggestions." },
      { title: "Cellar optimization", desc: "Centralized or decentralized stock. Replenishment alerts and rotation analysis by venue." },
    ],
    impactLabel: "Impact", impactTitle1: "Results for ", impactTitleHighlight: "groups",
    results: [
      { value: "Full control", desc: "Over the wine offer across all venues" },
      { value: "Centralized", desc: "Manage lists, pricing, and stock from a single panel" },
      { value: "Real-time", desc: "Changes applied instantly across all restaurants" },
      { value: "Multi-language", desc: "Lists automatically translated for international guests" },
    ],
    scaleLabel: "Scalability", scaleTitle1: "Winerim grows ", scaleTitleHighlight: "with you",
    useCases: [
      { size: "3 restaurants", scenario: "A group with a fine dining, a casual, and a wine bar.", howLabel: "How it works", how: "Each venue has its own adapted list managed from a single panel. Prices adjust based on each restaurant's positioning.", result: "Brand consistency without losing each venue's personality." },
      { size: "10 restaurants", scenario: "Restaurant chain with venues in multiple cities.", howLabel: "How it works", how: "Shared base lists with local variations. Centralized analytics to identify the most profitable wines and replicate success.", result: "40% reduction in list management time. +18% in wine sales." },
      { size: "50+ restaurants", scenario: "Large restaurant group with multiple brands and concepts.", howLabel: "How it works", how: "API integrated with ERP and POS. Cluster-based venue management. Automated reporting for management. Dedicated account manager.", result: "Total control over the wine strategy across the organization." },
    ],
    intelLabel: "Assortment intelligence",
    intelTitle1: "Assortment and purchasing decisions based on ",
    intelTitleHighlight: "real performance",
    intelSubtitle: "Winerim helps restaurant groups and hotel operators decide which references to keep, replicate, push, retire, or test based on margin, rotation, average ticket, unit type, and actual wine list behavior.",
    intelCards: [
      { title: "Assortment intelligence", desc: "Detects which styles, price ranges, formats, and references perform best by unit type, customer profile, and operational context." },
      { title: "Cross-unit benchmarking", desc: "Compare venues, identify performance gaps, and detect which lists, wines, or strategies are working best and where." },
      { title: "Smart standardization", desc: "Define core references, cluster-based selections, and venue-specific wines without falling into rigid uniformity." },
      { title: "Purchase & scaling opportunities", desc: "Decide which wines to expand to more units, which to retire, which to pilot-test, and where margin or rotation opportunities lie." },
    ],
    posTitle: "Turn wine into a governable business unit at scale.",
    posSubtitle: "What today often depends on intuition, spreadsheets, or uneven judgment between venues, Winerim transforms into a more measurable, actionable, and scalable group strategy.",
    posBullets: ["More multi-unit control", "More commercial consistency", "More visibility on margin and rotation", "Better assortment decisions", "Less dependence on individual talent"],
    posCta: "See how it works for groups",
    ctaLabel: "For groups", ctaTitle1: "Optimize wine management across ", ctaTitleHighlight: "all your restaurants",
    ctaDesc: "We'll show you how Winerim adapts to your group's structure. Personalized demo with your team.",
    ctaButton: "Request demo",
    links: [{ label: "Wine list software" }, { label: "Increase average ticket" }, { label: "Wine List Benchmark" }, { label: "Plans & pricing" }],
  },
  it: {
    metaTitle: "Winerim per Gruppi di Ristorazione | Gestione Centralizzata del Vino",
    metaDescription: "Centralizza la gestione delle carte dei vini, ottimizza i prezzi e aumenta le vendite in tutti i tuoi ristoranti.",
    badgeLabel: "Gruppi di ristorazione", breadSolutions: "Soluzioni", breadLabel: "Gruppi di ristorazione",
    heroTitle1: "Gestione intelligente del vino per ", heroTitleHighlight: "gruppi di ristorazione",
    heroDesc: "Centralizza la gestione delle carte dei vini, ottimizza i prezzi e aumenta le vendite in tutti i tuoi ristoranti.",
    ctaDemo: "Richiedi demo", ctaContact: "Parla con uno specialista",
    problemLabel: "Il problema", problemTitle1: "Le sfide della gestione del vino in ", problemTitleHighlight: "più locali",
    problems: [
      { text: "Ogni ristorante gestisce il vino in modo diverso: carte diverse, criteri diversi, qualità diverse." },
      { text: "Mancanza di controllo sui prezzi: moltiplicatori incoerenti, margini disomogenei tra i locali." },
      { text: "Difficoltà a mantenere le carte aggiornate: cambi di annata, nuovi riferimenti, prodotti fuori catalogo." },
      { text: "Mancanza di dati centralizzati: non sai quali vini si vendono, quali ristagnano né dove sono i margini." },
      { text: "Scarsa visibilità sulle vendite di vino: il vino è il prodotto più redditizio ma il meno misurato." },
    ],
    solutionLabel: "La soluzione", solutionTitle1: "Come Winerim aiuta i ", solutionTitleHighlight: "gruppi",
    advantages: [
      { title: "Gestione centralizzata delle carte", desc: "Una piattaforma per gestire tutte le carte dei vini di tutti i tuoi locali. Modifiche applicate istantaneamente." },
      { title: "Controllo prezzi unificato", desc: "Definisci strategie di pricing per locale, tipo di vino o segmento. Coerenza senza rigidità." },
      { title: "Analisi vendite per locale", desc: "Confronta le prestazioni di ogni ristorante: vini più venduti, margini, rotazione e scontrino medio." },
      { title: "Ottimizzazione dell'offerta", desc: "Identifica duplicati, lacune e opportunità in ogni carta. Adatta la selezione al profilo di ogni locale." },
      { title: "Esperienza cliente migliorata", desc: "Carte digitali con abbinamenti, schede vino e raccomandazioni intelligenti in tutti i tuoi ristoranti." },
    ],
    capLabel: "Capacità per gruppi",
    capTitle: "Cosa può fare Winerim per un gruppo",
    capSubtitle: "Un livello di intelligenza per governare il vino su larga scala, non come locali isolati.",
    capCards: [
      { title: "Confrontare le unità", desc: "Confrontare performance, rotazione, margini e comportamento del vino tra i locali." },
      { title: "Rilevare opportunità invisibili", desc: "Trovare referenze sottoutilizzate, lacune di pricing, cannibalizzazione e stock immobilizzato." },
      { title: "Decidere cosa replicare", desc: "Identificare quali vini, formati o strategie vale la pena scalare nel resto del gruppo." },
      { title: "Adattare per tipologia di locale", desc: "Non applicare la stessa logica a fine dining, casual premium, hotel urbano o destinazione turistica." },
      { title: "Professionalizzare la categoria", desc: "Ridurre la dipendenza dal criterio individuale di ogni direttore o sommelier." },
      { title: "Attivare regole per brand o unità", desc: "Definire priorità diverse in base a obiettivo di business, marchio, città o tipo di cliente." },
    ],
    featLabel: "Funzionalità", featTitle1: "Progettato per ", featTitleHighlight: "scalare",
    features: [
      { title: "Gestione multi-locale", desc: "Dashboard centrale con vista su tutti i ristoranti. Filtra, confronta e agisci da un unico pannello." },
      { title: "Aggiornamento centralizzato", desc: "Modifica prezzi, aggiungi riferimenti o rimuovi vini in tutti i locali con un clic." },
      { title: "Analisi comparativa", desc: "Classifiche di vendite, margini e rotazione tra ristoranti. Individua le best practice e replicale." },
      { title: "Controllo prezzi", desc: "Moltiplicatori per locale, avvisi di deviazione e suggerimenti di ottimizzazione automatici." },
      { title: "Ottimizzazione cantina", desc: "Stock centralizzato o decentralizzato. Avvisi di riordino e analisi della rotazione per locale." },
    ],
    impactLabel: "Impatto", impactTitle1: "Risultati per i ", impactTitleHighlight: "gruppi",
    results: [
      { value: "Controllo totale", desc: "Sull'offerta di vino in tutti i locali" },
      { value: "Centralizzato", desc: "Gestione carte, prezzi e stock da un unico pannello" },
      { value: "In tempo reale", desc: "Modifiche applicate istantaneamente in tutti i ristoranti" },
      { value: "Multilingua", desc: "Carte tradotte automaticamente per ospiti internazionali" },
    ],
    scaleLabel: "Scalabilità", scaleTitle1: "Winerim cresce ", scaleTitleHighlight: "con te",
    useCases: [
      { size: "3 ristoranti", scenario: "Un gruppo con un gastronomico, un casual e un wine bar.", howLabel: "Come funziona", how: "Ogni locale ha la sua carta adattata ma gestita da un unico pannello. I prezzi si adeguano al posizionamento di ogni ristorante.", result: "Coerenza del brand senza perdere la personalità di ogni locale." },
      { size: "10 ristoranti", scenario: "Catena di ristorazione con locali in diverse città.", howLabel: "Come funziona", how: "Carte base condivise con variazioni locali. Analisi centralizzata per identificare i vini più redditizi e replicare il successo.", result: "Riduzione del 40% nel tempo di gestione delle carte. +18% nelle vendite di vino." },
      { size: "50+ ristoranti", scenario: "Grande gruppo di ristorazione con più marchi e concept.", howLabel: "Come funziona", how: "API integrata con ERP e POS. Gestione per cluster di locali. Reporting automatizzato per la direzione. Account manager dedicato.", result: "Controllo totale sulla strategia del vino in tutta l'organizzazione." },
    ],
    intelLabel: "Intelligenza di assortimento",
    intelTitle1: "Decisioni di assortimento e acquisto basate su ",
    intelTitleHighlight: "performance reale",
    intelSubtitle: "Winerim aiuta gruppi di ristorazione e operatori alberghieri a decidere quali referenze mantenere, replicare, spingere, ritirare o testare in base a margine, rotazione, scontrino medio, tipo di locale e comportamento reale della carta.",
    intelCards: [
      { title: "Intelligenza di assortimento", desc: "Rileva quali stili, fasce di prezzo, formati e referenze funzionano meglio per tipo di locale, profilo cliente e contesto operativo." },
      { title: "Benchmarking tra unità", desc: "Confronta i locali, identifica differenze di performance e rileva quali carte, vini o strategie funzionano meglio e dove." },
      { title: "Standardizzazione intelligente", desc: "Permette di definire referenze core, referenze per cluster e vini specifici per locale senza cadere in un'uniformità rigida." },
      { title: "Opportunità di acquisto e scaling", desc: "Aiuta a decidere quali vini espandere ad altri locali, quali ritirare, quali testare in pilota e dove ci sono opportunità di margine o rotazione." },
    ],
    posTitle: "Trasforma il vino in un'unità di business governabile su scala.",
    posSubtitle: "Ciò che oggi spesso dipende dall'intuizione, fogli di calcolo o criteri disomogenei tra i locali, Winerim lo trasforma in una strategia di gruppo più misurabile, azionabile e scalabile.",
    posBullets: ["Più controllo multi-unità", "Più coerenza commerciale", "Più visibilità su margine e rotazione", "Migliori decisioni di assortimento", "Meno dipendenza dal talento individuale"],
    posCta: "Scopri come funziona per i gruppi",
    ctaLabel: "Per i gruppi", ctaTitle1: "Ottimizza la gestione del vino in ", ctaTitleHighlight: "tutti i tuoi ristoranti",
    ctaDesc: "Ti mostriamo come Winerim si adatta alla struttura del tuo gruppo. Demo personalizzata con il tuo team.",
    ctaButton: "Richiedi demo",
    links: [{ label: "Software carta dei vini" }, { label: "Aumentare lo scontrino medio" }, { label: "Wine List Benchmark" }, { label: "Piani e prezzi" }],
  },
  fr: {
    metaTitle: "Winerim pour Groupes de Restauration | Gestion Centralisée du Vin",
    metaDescription: "Centralisez la gestion des cartes des vins, optimisez les prix et augmentez les ventes dans tous vos restaurants.",
    badgeLabel: "Groupes de restauration", breadSolutions: "Solutions", breadLabel: "Groupes de restauration",
    heroTitle1: "Gestion intelligente du vin pour les ", heroTitleHighlight: "groupes de restauration",
    heroDesc: "Centralisez la gestion de vos cartes des vins, optimisez les prix et augmentez les ventes dans tous vos restaurants.",
    ctaDemo: "Demander une démo", ctaContact: "Parler à un spécialiste",
    problemLabel: "Le problème", problemTitle1: "Les défis de la gestion du vin dans ", problemTitleHighlight: "plusieurs établissements",
    problems: [
      { text: "Chaque restaurant gère le vin différemment : cartes différentes, critères différents, qualités différentes." },
      { text: "Manque de contrôle sur les prix : multiplicateurs incohérents, marges inégales entre les établissements." },
      { text: "Difficulté à maintenir les cartes à jour : changements de millésime, nouvelles références, produits déréférencés." },
      { text: "Manque de données centralisées : vous ne savez pas quels vins se vendent, lesquels stagnent ni où sont les marges." },
      { text: "Faible visibilité sur les ventes de vin : le vin est le produit le plus rentable mais le moins mesuré." },
    ],
    solutionLabel: "La solution", solutionTitle1: "Comment Winerim aide les ", solutionTitleHighlight: "groupes",
    advantages: [
      { title: "Gestion centralisée des cartes", desc: "Une plateforme pour gérer toutes les cartes des vins de tous vos établissements. Modifications appliquées instantanément." },
      { title: "Contrôle tarifaire unifié", desc: "Définissez des stratégies de pricing par établissement, type de vin ou segment. Cohérence sans rigidité." },
      { title: "Analytique des ventes par établissement", desc: "Comparez les performances de chaque restaurant : vins les plus vendus, marges, rotation et ticket moyen." },
      { title: "Optimisation de l'offre", desc: "Identifiez les doublons, les lacunes et les opportunités dans chaque carte. Adaptez la sélection au profil de chaque établissement." },
      { title: "Expérience client améliorée", desc: "Cartes digitales avec accords, fiches vins et recommandations intelligentes dans tous vos restaurants." },
    ],
    capLabel: "Capacités pour les groupes",
    capTitle: "Ce que Winerim peut faire pour un groupe",
    capSubtitle: "Une couche d'intelligence pour gouverner le vin à l'échelle, pas comme des établissements isolés.",
    capCards: [
      { title: "Comparer les unités", desc: "Comparer la performance, la rotation, les marges et le comportement du vin entre les établissements." },
      { title: "Détecter les opportunités invisibles", desc: "Trouver des références sous-exploitées, des lacunes de pricing, la cannibalisation et le stock immobilisé." },
      { title: "Décider quoi répliquer", desc: "Identifier quels vins, formats ou stratégies méritent d'être déployés dans le reste du groupe." },
      { title: "Adapter par type d'établissement", desc: "Ne pas appliquer la même logique au fine dining, casual premium, hôtel urbain ou destination touristique." },
      { title: "Professionnaliser la catégorie", desc: "Réduire la dépendance au jugement individuel de chaque directeur ou sommelier." },
      { title: "Activer des règles par marque ou unité", desc: "Définir des priorités différentes selon l'objectif business, la marque, la ville ou le type de client." },
    ],
    featLabel: "Fonctionnalités", featTitle1: "Conçu pour ", featTitleHighlight: "passer à l'échelle",
    features: [
      { title: "Gestion multi-sites", desc: "Tableau de bord central avec vue sur tous les restaurants. Filtrez, comparez et agissez depuis un seul panneau." },
      { title: "Mise à jour centralisée", desc: "Modifiez les prix, ajoutez des références ou retirez des vins dans tous les établissements en un clic." },
      { title: "Analytique comparative", desc: "Classements des ventes, marges et rotations entre restaurants. Détectez les meilleures pratiques et reproduisez-les." },
      { title: "Contrôle des prix", desc: "Multiplicateurs par établissement, alertes de déviation et suggestions d'optimisation automatiques." },
      { title: "Optimisation de la cave", desc: "Stock centralisé ou décentralisé. Alertes de réapprovisionnement et analyse de la rotation par établissement." },
    ],
    impactLabel: "Impact", impactTitle1: "Résultats pour les ", impactTitleHighlight: "groupes",
    results: [
      { value: "Contrôle total", desc: "Sur l'offre de vin dans tous les établissements" },
      { value: "Centralisé", desc: "Gestion des cartes, prix et stocks depuis un seul panneau" },
      { value: "En temps réel", desc: "Modifications appliquées instantanément dans tous les restaurants" },
      { value: "Multilingue", desc: "Cartes traduites automatiquement pour les clients internationaux" },
    ],
    scaleLabel: "Évolutivité", scaleTitle1: "Winerim grandit ", scaleTitleHighlight: "avec vous",
    useCases: [
      { size: "3 restaurants", scenario: "Un groupe avec un gastronomique, un casual et un bar à vins.", howLabel: "Comment ça marche", how: "Chaque établissement a sa carte adaptée mais gérée depuis un seul panneau. Les prix s'ajustent au positionnement de chaque restaurant.", result: "Cohérence de marque sans perdre la personnalité de chaque établissement." },
      { size: "10 restaurants", scenario: "Chaîne de restauration avec des établissements dans plusieurs villes.", howLabel: "Comment ça marche", how: "Cartes de base partagées avec variations locales. Analytique centralisée pour identifier les vins les plus rentables et reproduire le succès.", result: "Réduction de 40% du temps de gestion des cartes. +18% des ventes de vin." },
      { size: "50+ restaurants", scenario: "Grand groupe de restauration avec plusieurs marques et concepts.", howLabel: "Comment ça marche", how: "API intégrée avec ERP et POS. Gestion par clusters d'établissements. Reporting automatisé pour la direction. Account manager dédié.", result: "Contrôle total sur la stratégie vin dans toute l'organisation." },
    ],
    intelLabel: "Intelligence d'assortiment",
    intelTitle1: "Décisions d'assortiment et d'achat basées sur la ",
    intelTitleHighlight: "performance réelle",
    intelSubtitle: "Winerim aide les groupes de restauration et les opérateurs hôteliers à décider quelles références garder, reproduire, pousser, retirer ou tester en fonction de la marge, de la rotation, du ticket moyen, du type d'établissement et du comportement réel de la carte.",
    intelCards: [
      { title: "Intelligence d'assortiment", desc: "Détecte quels styles, gammes de prix, formats et références fonctionnent le mieux selon le type d'établissement, le profil client et le contexte opérationnel." },
      { title: "Benchmarking inter-établissements", desc: "Compare les établissements, identifie les écarts de performance et détecte quelles cartes, vins ou stratégies fonctionnent le mieux et où." },
      { title: "Standardisation intelligente", desc: "Permet de définir des références core, des références par cluster et des vins spécifiques par établissement sans tomber dans une uniformité rigide." },
      { title: "Opportunités d'achat et de scaling", desc: "Aide à décider quels vins étendre à d'autres établissements, lesquels retirer, lesquels tester en pilote et où se trouvent les opportunités de marge ou de rotation." },
    ],
    posTitle: "Faites du vin une unité de gestion gouvernable à l'échelle.",
    posSubtitle: "Ce qui repose aujourd'hui souvent sur l'intuition, des tableurs ou un jugement inégal entre établissements, Winerim le transforme en une stratégie de groupe plus mesurable, actionnable et évolutive.",
    posBullets: ["Plus de contrôle multi-sites", "Plus de cohérence commerciale", "Plus de visibilité sur la marge et la rotation", "De meilleures décisions d'assortiment", "Moins de dépendance au talent individuel"],
    posCta: "Voir comment ça marche pour les groupes",
    ctaLabel: "Pour les groupes", ctaTitle1: "Optimisez la gestion du vin dans ", ctaTitleHighlight: "tous vos restaurants",
    ctaDesc: "Nous vous montrons comment Winerim s'adapte à la structure de votre groupe. Démo personnalisée avec votre équipe.",
    ctaButton: "Demander une démo",
    links: [{ label: "Logiciel carte des vins" }, { label: "Augmenter le ticket moyen" }, { label: "Wine List Benchmark" }, { label: "Plans et tarifs" }],
  },
};

const advantageIcons = [Building2, DollarSign, BarChart3, Wine, Users];
const featureIcons = [Globe, RefreshCw, BarChart3, DollarSign, Warehouse];
const resultIcons = [Layers, TrendingUp, BarChart3, CheckCircle];
const useCaseIcons = [Store, Building2, Globe];

const GruposRestauracion = () => {
  const { lang, localePath } = useLanguage();
  const t = content[lang] || content.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "grupos-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.metaTitle,
      description: t.metaDescription,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("grupos-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url="https://winerim.wine/soluciones/grupos-restauracion" />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadSolutions }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Building2 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badgeLabel}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaDemo} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.problemTitle1}<span className="text-gradient-wine italic">{t.problemTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solutionLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.solutionTitle1}<span className="text-gradient-wine italic">{t.solutionTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.advantages.map((adv, i) => {
              const Icon = advantageIcons[i] || Building2;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITIES FOR GROUPS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
              <Layers size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.capLabel}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {t.capTitle}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              {t.capSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.capCards.map((card, i) => {
              const icons = [GitCompare, ScanSearch, Copy, Sliders, ShieldCheck, Zap];
              const Icon = icons[i] || Layers;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-wine/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-wine/5 p-6 md:p-7">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.featTitle1}<span className="text-gradient-wine italic">{t.featTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {t.features.map((feat, i) => {
              const Icon = featureIcons[i] || Globe;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{feat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.impactLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.impactTitle1}<span className="text-gradient-wine italic">{t.impactTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.results.map((r, i) => {
              const Icon = resultIcons[i] || Layers;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <p className="font-heading text-2xl font-bold text-wine mb-1">{r.value}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.scaleLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.scaleTitle1}<span className="text-gradient-wine italic">{t.scaleTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => {
              const Icon = useCaseIcons[i] || Store;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading font-bold">{uc.size}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="bg-wine/5 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-wine mb-1">{uc.howLabel}</p>
                      <p className="text-xs text-muted-foreground">{uc.how}</p>
                    </div>
                    <div className="mt-auto flex items-start gap-2">
                      <Sparkles size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ASSORTMENT INTELLIGENCE */}
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-wine/6 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
              <Search size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.intelLabel}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {t.intelTitle1}<span className="text-gradient-wine italic">{t.intelTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground mt-5 max-w-3xl mx-auto leading-relaxed">
              {t.intelSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {t.intelCards.map((card, i) => {
              const icons = [Search, GitCompare, Box, Expand];
              const colors = [
                { gradient: "from-wine/15 to-wine/5", iconBg: "bg-wine/10", iconColor: "text-wine", border: "hover:border-wine/30" },
                { gradient: "from-blue-500/15 to-blue-500/5", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", border: "hover:border-blue-500/30" },
                { gradient: "from-amber-500/15 to-amber-500/5", iconBg: "bg-amber-500/10", iconColor: "text-amber-400", border: "hover:border-amber-500/30" },
                { gradient: "from-emerald-500/15 to-emerald-500/5", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", border: "hover:border-emerald-500/30" },
              ];
              const Icon = icons[i] || Search;
              const c = colors[i] || colors[0];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`group relative h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm ${c.border} transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden`}>
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                    <div className="relative p-7 md:p-8 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                        <Icon className={`w-6 h-6 ${c.iconColor}`} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,hsl(var(--wine)/0.10),transparent_70%)]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl border border-wine/15 bg-gradient-to-br from-card/80 via-card/60 to-wine/[0.03] backdrop-blur-sm p-8 sm:p-12 md:p-16 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-6">
                {t.posTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 text-sm sm:text-base">
                {t.posSubtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {t.posBullets.map((b, i) => (
                  <div key={i} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/60 bg-background/40 text-sm font-medium text-foreground/90">
                    <CheckCircle size={14} className="text-wine shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.posCta} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle1}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaButton} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/producto/inteligencia-dinamica"), label: "Inteligencia dinámica", type: "solution" },
        { to: localePath("/software-carta-de-vinos"), label: t.links[0].label, type: "solution" },
        { to: localePath("/soluciones/aumentar-ticket-medio-restaurante"), label: t.links[1].label, type: "guide" },
        { to: localePath("/wine-list-benchmark"), label: t.links[2].label, type: "tool" },
        { to: localePath("/precios"), label: t.links[3].label, type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default GruposRestauracion;
