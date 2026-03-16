import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, TrendingUp, DollarSign, Package, ShoppingCart,
  Target, Layers, RefreshCw, Activity, Eye, Gauge, Brain, Zap,
  Filter, Search, Settings, Cpu, ClipboardList, History,
  PieChart, GitCompare, Scale, Map, FileBarChart, AlertTriangle,
  ChevronRight, Lightbulb
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Module blocks ── */
interface Module { icon: typeof BarChart3; name: string; desc: string }
interface ModuleBlock { title: string; accent: string; borderAccent: string; iconBg: string; iconColor: string; modules: Module[] }

/* ── i18n content ── */
interface CoreContent {
  seo_title: string; seo_desc: string;
  breadcrumb_features: string;
  hero_h1_1: string; hero_h1_highlight: string; hero_h1_2: string;
  hero_sub: string;
  cta_demo: string; cta_explore: string;
  what_label: string; what_title_1: string; what_title_highlight: string;
  what_p1: string; what_p2_pre: string; what_p2_link: string; what_p2_post: string;
  pillars: { label: string; desc: string }[];
  modules_eyebrow: string; modules_title_1: string; modules_title_highlight: string;
  modules_sub: string; modules_suffix: string;
  blocks: { title: string; modules: { name: string; desc: string }[] }[];
  bridge_eyebrow: string; bridge_title_1: string; bridge_title_highlight: string;
  bridge_desc: string; bridge_cta: string;
  final_eyebrow: string; final_title_1: string; final_title_highlight: string; final_title_2: string;
  final_desc: string; final_cta: string;
  faq_title: string;
  faqs: { q: string; a: string }[];
  links: { label: string }[];
}

const i18n: Record<string, CoreContent> = {
  es: {
    seo_title: "Winerim Core | 26 módulos de inteligencia analítica para tu carta de vinos",
    seo_desc: "Winerim Core es el motor analítico que conecta márgenes, pricing, stock, rentabilidad, compras, arquitectura, benchmark y previsión en una sola capa. 26 módulos especializados.",
    breadcrumb_features: "Funcionalidades",
    hero_h1_1: "26 módulos. Un motor de",
    hero_h1_highlight: "inteligencia",
    hero_h1_2: "para tu carta de vinos.",
    hero_sub: "Winerim Core conecta márgenes, pricing, stock, rentabilidad, compras, arquitectura, benchmark y previsión en una sola capa analítica.",
    cta_demo: "Quiero ver Winerim Core en una demo",
    cta_explore: "Explorar los 26 módulos",
    what_label: "Qué es Winerim Core",
    what_title_1: "La capa analítica que",
    what_title_highlight: "piensa",
    what_p1: "Winerim Core es el motor de análisis y diagnóstico que alimenta todas las decisiones sobre tu carta de vinos. No es una carta digital. No es un módulo de IA reactiva. Es la infraestructura analítica que conecta datos de ventas, stock, márgenes, pricing y benchmark para darte una visión completa de cómo rinde tu carta.",
    what_p2_pre: "Mientras la",
    what_p2_link: "Inteligencia Dinámica",
    what_p2_post: "actúa en tiempo real adaptando la carta, Winerim Core analiza, diagnostica y recomienda. Es la base sobre la que se construyen las decisiones tácticas.",
    pillars: [
      { label: "Analiza", desc: "Cruza datos de venta, stock, margen y contexto." },
      { label: "Diagnostica", desc: "Detecta problemas, ineficiencias y oportunidades." },
      { label: "Recomienda", desc: "Propone acciones priorizadas y simulables." },
    ],
    modules_eyebrow: "26 módulos especializados",
    modules_title_1: "Todo lo que tu carta necesita",
    modules_title_highlight: "saber",
    modules_sub: "Organizados en 5 bloques funcionales, cada módulo resuelve un aspecto concreto de la gestión analítica de la carta.",
    modules_suffix: "módulos",
    blocks: [
      { title: "Diagnóstico y arquitectura", modules: [
        { name: "Wine Mapping", desc: "Radiografía completa de tu carta: estructura, distribución por tipo, origen, rango de precio y cobertura." },
        { name: "Arquitectura de carta", desc: "Evalúa el equilibrio entre categorías, profundidad de gama y coherencia con tu posicionamiento." },
        { name: "Análisis de surtido", desc: "Detecta solapamientos, huecos de oferta y oportunidades de diferenciación en tu selección." },
        { name: "Detección de canibalización", desc: "Identifica referencias que compiten entre sí y erosionan ventas dentro de la misma franja." },
        { name: "Auditoría de visibilidad", desc: "Mide qué vinos reciben atención del comensal y cuáles pasan desapercibidos en la carta." },
      ]},
      { title: "Pricing y rentabilidad", modules: [
        { name: "Análisis de márgenes", desc: "Margen bruto, contribución unitaria y margen ponderado por ventas de cada referencia." },
        { name: "Pricing dinámico", desc: "Simulación de escenarios de precio para maximizar rentabilidad sin perder competitividad." },
        { name: "Elasticidad de precio", desc: "Estima cómo reaccionarían las ventas ante cambios de precio en cada referencia." },
        { name: "Contribución por categoría", desc: "Entiende qué bloques de la carta generan más valor y cuáles lastran el resultado global." },
        { name: "Scoring de rentabilidad", desc: "Índice compuesto que cruza margen, rotación y ticket medio para cada vino." },
        { name: "Copa vs. botella", desc: "Análisis comparativo de rentabilidad entre servicio por copa y por botella." },
      ]},
      { title: "Stock, compras y previsión", modules: [
        { name: "Control de stock", desc: "Estado en tiempo real del inventario con alertas de sobrestock y quiebre." },
        { name: "Rotación de referencias", desc: "Velocidad de salida de cada vino y detección automática de stock muerto." },
        { name: "Inteligencia de compras", desc: "Recomendaciones de reposición basadas en velocidad de venta, estacionalidad y margen." },
        { name: "Previsión de demanda", desc: "Proyección de consumo a corto plazo usando patrones históricos y contexto calendario." },
        { name: "Obsolescencia", desc: "Alerta temprana sobre referencias con riesgo de quedarse paradas o fuera de temporada." },
      ]},
      { title: "Estrategia y simulación", modules: [
        { name: "Simulador de carta", desc: "Prueba cambios en la carta antes de publicarlos: añadir, quitar o sustituir referencias y ver el impacto estimado." },
        { name: "Comparador de escenarios", desc: "Enfrentar dos configuraciones de carta y evaluar cuál rinde mejor en margen, ticket y rotación." },
        { name: "Análisis de tendencias", desc: "Evolución temporal de KPIs clave: ticket medio, venta por copa, mix de categorías." },
        { name: "Plan de acción", desc: "Recomendaciones priorizadas y accionables basadas en los diagnósticos de todos los módulos." },
        { name: "Reglas de negocio", desc: "Define objetivos, restricciones y prioridades que condicionan las recomendaciones del sistema." },
      ]},
      { title: "Benchmark y rendimiento", modules: [
        { name: "Benchmark sectorial", desc: "Compara tus métricas con restaurantes de perfil similar: ticket, referencias, margen y mix." },
        { name: "Scorecard mensual", desc: "Informe consolidado de rendimiento de la carta con evolución respecto al mes anterior." },
        { name: "Wine List Score", desc: "Puntuación global de salud de tu carta: equilibrio, rentabilidad, rotación y cobertura." },
        { name: "Diagnóstico multilocal", desc: "Visión comparada entre locales de un mismo grupo: detecta desviaciones y mejores prácticas." },
        { name: "Exportación e informes", desc: "Genera informes descargables para dirección, compras o reuniones de equipo." },
      ]},
    ],
    bridge_eyebrow: "El siguiente nivel",
    bridge_title_1: "Winerim Core analiza.",
    bridge_title_highlight: "La Inteligencia Dinámica actúa.",
    bridge_desc: "Los 26 módulos de Core generan los diagnósticos y las recomendaciones. La capa de Inteligencia Dinámica los convierte en acciones automáticas sobre la carta en tiempo real: reordena, destaca, oculta y adapta referencias según contexto, stock, margen y objetivos.",
    bridge_cta: "Descubrir la Inteligencia Dinámica",
    final_eyebrow: "¿Listo para ver el Core en acción?",
    final_title_1: "Pide una demo y descubre cómo",
    final_title_highlight: "26 módulos",
    final_title_2: "transforman tu carta",
    final_desc: "Te mostramos cómo Winerim Core analiza tu carta real, detecta oportunidades y genera un plan de acción concreto.",
    final_cta: "Solicitar demo de Winerim Core",
    faq_title: "Preguntas frecuentes sobre Winerim Core",
    faqs: [
      { q: "¿Qué diferencia hay entre Winerim Core y la Inteligencia Dinámica?", a: "Winerim Core es la capa de análisis: diagnostica, mide y recomienda. La Inteligencia Dinámica es la capa de acción: aplica esos diagnósticos en tiempo real sobre la carta visible." },
      { q: "¿Wine Mapping es lo mismo que Winerim Core?", a: "No. Wine Mapping es uno de los 26 módulos dentro de Core. Se encarga de radiografiar la estructura de la carta, pero Core abarca mucho más: pricing, stock, benchmark, simulación y más." },
      { q: "¿Necesito todos los módulos desde el inicio?", a: "No. Los módulos se activan progresivamente según tu plan y necesidades. Puedes empezar con diagnóstico y pricing, y ampliar a stock, benchmark o simulación cuando lo necesites." },
      { q: "¿Core funciona sin la Inteligencia Dinámica?", a: "Sí. Core genera valor por sí solo como herramienta de análisis y planificación. La Inteligencia Dinámica es una capa adicional que automatiza las acciones sobre la carta." },
      { q: "¿Puedo usar Winerim Core para varios locales?", a: "Sí. El módulo de diagnóstico multilocal permite comparar el rendimiento entre establecimientos de un mismo grupo y detectar desviaciones." },
    ],
    links: [
      { label: "Inteligencia Dinámica: la capa de IA táctica" },
      { label: "Todas las funcionalidades de Winerim" },
      { label: "Solicitar una demo personalizada" },
      { label: "Planes y precios" },
      { label: "Herramientas gratuitas de análisis" },
      { label: "Compara Winerim con alternativas" },
    ],
  },
  en: {
    seo_title: "Winerim Core | 26 Analytical Intelligence Modules for Your Wine List",
    seo_desc: "Winerim Core is the analytical engine connecting margins, pricing, stock, profitability, purchasing, architecture, benchmarking and forecasting in a single layer. 26 specialized modules.",
    breadcrumb_features: "Features",
    hero_h1_1: "26 modules. An",
    hero_h1_highlight: "intelligence",
    hero_h1_2: "engine for your wine list.",
    hero_sub: "Winerim Core connects margins, pricing, stock, profitability, purchasing, architecture, benchmarking and forecasting in a single analytical layer.",
    cta_demo: "See Winerim Core in a demo",
    cta_explore: "Explore the 26 modules",
    what_label: "What is Winerim Core",
    what_title_1: "The analytical layer that",
    what_title_highlight: "thinks",
    what_p1: "Winerim Core is the analysis and diagnostics engine that powers every decision about your wine list. It's not a digital list. It's not a reactive AI module. It's the analytical infrastructure connecting sales data, stock, margins, pricing and benchmarks to give you a complete view of how your list performs.",
    what_p2_pre: "While",
    what_p2_link: "Dynamic Intelligence",
    what_p2_post: "acts in real time adapting the list, Winerim Core analyses, diagnoses and recommends. It's the foundation on which tactical decisions are built.",
    pillars: [
      { label: "Analyses", desc: "Cross-references sales, stock, margin and context data." },
      { label: "Diagnoses", desc: "Detects problems, inefficiencies and opportunities." },
      { label: "Recommends", desc: "Proposes prioritized, simulable actions." },
    ],
    modules_eyebrow: "26 specialized modules",
    modules_title_1: "Everything your list needs to",
    modules_title_highlight: "know",
    modules_sub: "Organized in 5 functional blocks, each module solves a specific aspect of analytical list management.",
    modules_suffix: "modules",
    blocks: [
      { title: "Diagnostics & architecture", modules: [
        { name: "Wine Mapping", desc: "Complete x-ray of your list: structure, distribution by type, origin, price range and coverage." },
        { name: "List architecture", desc: "Evaluates balance across categories, range depth and alignment with your positioning." },
        { name: "Assortment analysis", desc: "Detects overlaps, offer gaps and differentiation opportunities in your selection." },
        { name: "Cannibalization detection", desc: "Identifies references competing with each other, eroding sales within the same bracket." },
        { name: "Visibility audit", desc: "Measures which wines attract diner attention and which go unnoticed." },
      ]},
      { title: "Pricing & profitability", modules: [
        { name: "Margin analysis", desc: "Gross margin, unit contribution and sales-weighted margin for each reference." },
        { name: "Dynamic pricing", desc: "Price scenario simulation to maximize profitability without losing competitiveness." },
        { name: "Price elasticity", desc: "Estimates how sales would react to price changes for each reference." },
        { name: "Category contribution", desc: "Understand which list sections generate most value and which drag overall results." },
        { name: "Profitability scoring", desc: "Composite index crossing margin, rotation and average ticket per wine." },
        { name: "Glass vs. bottle", desc: "Comparative profitability analysis between by-the-glass and bottle service." },
      ]},
      { title: "Stock, purchasing & forecasting", modules: [
        { name: "Stock control", desc: "Real-time inventory status with overstock and stockout alerts." },
        { name: "Reference rotation", desc: "Exit speed per wine and automatic dead stock detection." },
        { name: "Purchasing intelligence", desc: "Replenishment recommendations based on sales velocity, seasonality and margin." },
        { name: "Demand forecasting", desc: "Short-term consumption projection using historical patterns and calendar context." },
        { name: "Obsolescence", desc: "Early warning on references at risk of stalling or going out of season." },
      ]},
      { title: "Strategy & simulation", modules: [
        { name: "List simulator", desc: "Test changes before publishing: add, remove or substitute references and see the estimated impact." },
        { name: "Scenario comparator", desc: "Compare two list configurations and evaluate which performs better on margin, ticket and rotation." },
        { name: "Trend analysis", desc: "Time evolution of key KPIs: average ticket, by-the-glass sales, category mix." },
        { name: "Action plan", desc: "Prioritized, actionable recommendations based on diagnostics from all modules." },
        { name: "Business rules", desc: "Define goals, constraints and priorities that shape system recommendations." },
      ]},
      { title: "Benchmark & performance", modules: [
        { name: "Industry benchmark", desc: "Compare your metrics with similar-profile restaurants: ticket, references, margin and mix." },
        { name: "Monthly scorecard", desc: "Consolidated list performance report with month-over-month evolution." },
        { name: "Wine List Score", desc: "Overall list health score: balance, profitability, rotation and coverage." },
        { name: "Multi-venue diagnostics", desc: "Comparative view across venues in the same group: detect deviations and best practices." },
        { name: "Export & reports", desc: "Generate downloadable reports for management, purchasing or team meetings." },
      ]},
    ],
    bridge_eyebrow: "The next level",
    bridge_title_1: "Winerim Core analyses.",
    bridge_title_highlight: "Dynamic Intelligence acts.",
    bridge_desc: "Core's 26 modules generate diagnostics and recommendations. The Dynamic Intelligence layer converts them into automatic real-time actions on the list: reorders, highlights, hides and adapts references based on context, stock, margin and goals.",
    bridge_cta: "Discover Dynamic Intelligence",
    final_eyebrow: "Ready to see Core in action?",
    final_title_1: "Request a demo and discover how",
    final_title_highlight: "26 modules",
    final_title_2: "transform your list",
    final_desc: "We'll show you how Winerim Core analyses your actual list, detects opportunities and generates a concrete action plan.",
    final_cta: "Request Winerim Core demo",
    faq_title: "Frequently asked questions about Winerim Core",
    faqs: [
      { q: "What's the difference between Winerim Core and Dynamic Intelligence?", a: "Winerim Core is the analysis layer: it diagnoses, measures and recommends. Dynamic Intelligence is the action layer: it applies those diagnostics in real time on the visible list." },
      { q: "Is Wine Mapping the same as Winerim Core?", a: "No. Wine Mapping is one of the 26 modules within Core. It x-rays the list structure, but Core covers much more: pricing, stock, benchmark, simulation and more." },
      { q: "Do I need all modules from the start?", a: "No. Modules are activated progressively based on your plan and needs. You can start with diagnostics and pricing, then expand to stock, benchmark or simulation." },
      { q: "Does Core work without Dynamic Intelligence?", a: "Yes. Core generates value on its own as an analysis and planning tool. Dynamic Intelligence is an additional layer that automates actions on the list." },
      { q: "Can I use Winerim Core for multiple venues?", a: "Yes. The multi-venue diagnostics module lets you compare performance across establishments in the same group and detect deviations." },
    ],
    links: [
      { label: "Dynamic Intelligence: the tactical AI layer" },
      { label: "All Winerim features" },
      { label: "Request a personalized demo" },
      { label: "Plans and pricing" },
      { label: "Free analysis tools" },
      { label: "Compare Winerim with alternatives" },
    ],
  },
  it: {
    seo_title: "Winerim Core | 26 moduli di intelligenza analitica per la tua carta dei vini",
    seo_desc: "Winerim Core è il motore analitico che collega margini, pricing, stock, redditività, acquisti, architettura, benchmark e previsione in un unico livello. 26 moduli specializzati.",
    breadcrumb_features: "Funzionalità",
    hero_h1_1: "26 moduli. Un motore di",
    hero_h1_highlight: "intelligenza",
    hero_h1_2: "per la tua carta dei vini.",
    hero_sub: "Winerim Core collega margini, pricing, stock, redditività, acquisti, architettura, benchmark e previsione in un unico livello analitico.",
    cta_demo: "Voglio vedere Winerim Core in una demo",
    cta_explore: "Esplora i 26 moduli",
    what_label: "Cos'è Winerim Core",
    what_title_1: "Il livello analitico che",
    what_title_highlight: "pensa",
    what_p1: "Winerim Core è il motore di analisi e diagnosi che alimenta ogni decisione sulla tua carta dei vini. Non è una carta digitale. Non è un modulo di IA reattiva. È l'infrastruttura analitica che collega dati di vendita, stock, margini, pricing e benchmark per darti una visione completa delle prestazioni della tua carta.",
    what_p2_pre: "Mentre l'",
    what_p2_link: "Intelligenza Dinamica",
    what_p2_post: "agisce in tempo reale adattando la carta, Winerim Core analizza, diagnostica e raccomanda. È la base su cui si costruiscono le decisioni tattiche.",
    pillars: [
      { label: "Analizza", desc: "Incrocia dati di vendita, stock, margine e contesto." },
      { label: "Diagnostica", desc: "Rileva problemi, inefficienze e opportunità." },
      { label: "Raccomanda", desc: "Propone azioni prioritarie e simulabili." },
    ],
    modules_eyebrow: "26 moduli specializzati",
    modules_title_1: "Tutto ciò che la tua carta deve",
    modules_title_highlight: "sapere",
    modules_sub: "Organizzati in 5 blocchi funzionali, ogni modulo risolve un aspetto specifico della gestione analitica della carta.",
    modules_suffix: "moduli",
    blocks: [
      { title: "Diagnostica e architettura", modules: [
        { name: "Wine Mapping", desc: "Radiografia completa della carta: struttura, distribuzione per tipo, origine, fascia di prezzo e copertura." },
        { name: "Architettura della carta", desc: "Valuta l'equilibrio tra categorie, profondità di gamma e coerenza con il posizionamento." },
        { name: "Analisi dell'assortimento", desc: "Rileva sovrapposizioni, lacune nell'offerta e opportunità di differenziazione." },
        { name: "Rilevamento cannibalizzazione", desc: "Identifica referenze che competono tra loro erodendo le vendite nella stessa fascia." },
        { name: "Audit di visibilità", desc: "Misura quali vini attirano l'attenzione e quali passano inosservati." },
      ]},
      { title: "Pricing e redditività", modules: [
        { name: "Analisi dei margini", desc: "Margine lordo, contribuzione unitaria e margine ponderato per vendite." },
        { name: "Pricing dinamico", desc: "Simulazione di scenari di prezzo per massimizzare la redditività." },
        { name: "Elasticità del prezzo", desc: "Stima come reagirebbero le vendite ai cambi di prezzo." },
        { name: "Contribuzione per categoria", desc: "Comprendi quali sezioni generano più valore e quali penalizzano il risultato." },
        { name: "Scoring di redditività", desc: "Indice composito che incrocia margine, rotazione e scontrino medio." },
        { name: "Calice vs. bottiglia", desc: "Analisi comparativa della redditività tra servizio al calice e in bottiglia." },
      ]},
      { title: "Stock, acquisti e previsione", modules: [
        { name: "Controllo stock", desc: "Stato dell'inventario in tempo reale con alert di sovrascorta e rottura." },
        { name: "Rotazione referenze", desc: "Velocità di uscita di ogni vino e rilevamento automatico di stock morto." },
        { name: "Intelligenza acquisti", desc: "Raccomandazioni di riordino basate su velocità di vendita, stagionalità e margine." },
        { name: "Previsione della domanda", desc: "Proiezione dei consumi a breve termine usando pattern storici e contesto calendario." },
        { name: "Obsolescenza", desc: "Alert preventivo su referenze a rischio di rimanere ferme o fuori stagione." },
      ]},
      { title: "Strategia e simulazione", modules: [
        { name: "Simulatore di carta", desc: "Prova modifiche prima di pubblicare: aggiungere, rimuovere o sostituire referenze e vederne l'impatto." },
        { name: "Comparatore di scenari", desc: "Confronta due configurazioni di carta e valuta quale rende meglio." },
        { name: "Analisi delle tendenze", desc: "Evoluzione temporale dei KPI chiave: scontrino medio, vendita al calice, mix categorie." },
        { name: "Piano d'azione", desc: "Raccomandazioni prioritarie e attuabili basate sulle diagnosi di tutti i moduli." },
        { name: "Regole di business", desc: "Definisci obiettivi, vincoli e priorità che condizionano le raccomandazioni." },
      ]},
      { title: "Benchmark e performance", modules: [
        { name: "Benchmark settoriale", desc: "Confronta le tue metriche con ristoranti simili: scontrino, referenze, margine e mix." },
        { name: "Scorecard mensile", desc: "Report consolidato di performance con evoluzione mese su mese." },
        { name: "Wine List Score", desc: "Punteggio globale di salute della carta: equilibrio, redditività, rotazione e copertura." },
        { name: "Diagnostica multi-locale", desc: "Vista comparata tra locali dello stesso gruppo: deviazioni e best practice." },
        { name: "Esportazione e report", desc: "Genera report scaricabili per direzione, acquisti o riunioni di team." },
      ]},
    ],
    bridge_eyebrow: "Il livello successivo",
    bridge_title_1: "Winerim Core analizza.",
    bridge_title_highlight: "L'Intelligenza Dinamica agisce.",
    bridge_desc: "I 26 moduli di Core generano diagnosi e raccomandazioni. Il livello di Intelligenza Dinamica li converte in azioni automatiche sulla carta in tempo reale.",
    bridge_cta: "Scopri l'Intelligenza Dinamica",
    final_eyebrow: "Pronto a vedere Core in azione?",
    final_title_1: "Richiedi una demo e scopri come",
    final_title_highlight: "26 moduli",
    final_title_2: "trasformano la tua carta",
    final_desc: "Ti mostriamo come Winerim Core analizza la tua carta reale, rileva opportunità e genera un piano d'azione concreto.",
    final_cta: "Richiedi demo di Winerim Core",
    faq_title: "Domande frequenti su Winerim Core",
    faqs: [
      { q: "Qual è la differenza tra Winerim Core e l'Intelligenza Dinamica?", a: "Winerim Core è il livello di analisi: diagnostica, misura e raccomanda. L'Intelligenza Dinamica è il livello di azione: applica le diagnosi in tempo reale sulla carta visibile." },
      { q: "Wine Mapping è lo stesso di Winerim Core?", a: "No. Wine Mapping è uno dei 26 moduli all'interno di Core. Si occupa di radiografare la struttura della carta, ma Core copre molto di più." },
      { q: "Servono tutti i moduli dall'inizio?", a: "No. I moduli si attivano progressivamente in base al piano e alle esigenze." },
      { q: "Core funziona senza l'Intelligenza Dinamica?", a: "Sì. Core genera valore da solo come strumento di analisi e pianificazione." },
      { q: "Posso usare Winerim Core per più locali?", a: "Sì. Il modulo di diagnostica multi-locale permette di confrontare le performance tra sedi dello stesso gruppo." },
    ],
    links: [
      { label: "Intelligenza Dinamica: il livello di IA tattica" },
      { label: "Tutte le funzionalità di Winerim" },
      { label: "Richiedi una demo personalizzata" },
      { label: "Piani e prezzi" },
      { label: "Strumenti gratuiti di analisi" },
      { label: "Confronta Winerim con le alternative" },
    ],
  },
  fr: {
    seo_title: "Winerim Core | 26 modules d'intelligence analytique pour votre carte des vins",
    seo_desc: "Winerim Core est le moteur analytique reliant marges, pricing, stock, rentabilité, achats, architecture, benchmark et prévision. 26 modules spécialisés.",
    breadcrumb_features: "Fonctionnalités",
    hero_h1_1: "26 modules. Un moteur d'",
    hero_h1_highlight: "intelligence",
    hero_h1_2: "pour votre carte des vins.",
    hero_sub: "Winerim Core relie marges, pricing, stock, rentabilité, achats, architecture, benchmark et prévision en une seule couche analytique.",
    cta_demo: "Voir Winerim Core en démo",
    cta_explore: "Explorer les 26 modules",
    what_label: "Qu'est-ce que Winerim Core",
    what_title_1: "La couche analytique qui",
    what_title_highlight: "pense",
    what_p1: "Winerim Core est le moteur d'analyse et de diagnostic qui alimente chaque décision sur votre carte des vins. Ce n'est pas une carte digitale. Ce n'est pas un module d'IA réactive. C'est l'infrastructure analytique reliant données de ventes, stock, marges, pricing et benchmarks pour une vision complète de la performance de votre carte.",
    what_p2_pre: "Tandis que l'",
    what_p2_link: "Intelligence Dynamique",
    what_p2_post: "agit en temps réel en adaptant la carte, Winerim Core analyse, diagnostique et recommande. C'est le socle des décisions tactiques.",
    pillars: [
      { label: "Analyse", desc: "Croise données de vente, stock, marge et contexte." },
      { label: "Diagnostique", desc: "Détecte problèmes, inefficacités et opportunités." },
      { label: "Recommande", desc: "Propose des actions priorisées et simulables." },
    ],
    modules_eyebrow: "26 modules spécialisés",
    modules_title_1: "Tout ce que votre carte doit",
    modules_title_highlight: "savoir",
    modules_sub: "Organisés en 5 blocs fonctionnels, chaque module résout un aspect concret de la gestion analytique de la carte.",
    modules_suffix: "modules",
    blocks: [
      { title: "Diagnostic et architecture", modules: [
        { name: "Wine Mapping", desc: "Radiographie complète de la carte : structure, distribution par type, origine, gamme de prix et couverture." },
        { name: "Architecture de carte", desc: "Évalue l'équilibre entre catégories, profondeur de gamme et cohérence avec le positionnement." },
        { name: "Analyse de l'assortiment", desc: "Détecte chevauchements, lacunes et opportunités de différenciation." },
        { name: "Détection de cannibalisation", desc: "Identifie les références en concurrence au sein de la même tranche." },
        { name: "Audit de visibilité", desc: "Mesure quels vins attirent l'attention et lesquels passent inaperçus." },
      ]},
      { title: "Pricing et rentabilité", modules: [
        { name: "Analyse des marges", desc: "Marge brute, contribution unitaire et marge pondérée par les ventes." },
        { name: "Pricing dynamique", desc: "Simulation de scénarios de prix pour maximiser la rentabilité." },
        { name: "Élasticité-prix", desc: "Estime la réaction des ventes aux changements de prix." },
        { name: "Contribution par catégorie", desc: "Identifie les sections qui génèrent le plus de valeur et celles qui plombent le résultat." },
        { name: "Scoring de rentabilité", desc: "Indice composite croisant marge, rotation et ticket moyen." },
        { name: "Verre vs. bouteille", desc: "Analyse comparative de rentabilité entre service au verre et en bouteille." },
      ]},
      { title: "Stock, achats et prévision", modules: [
        { name: "Contrôle de stock", desc: "État de l'inventaire en temps réel avec alertes de surstock et rupture." },
        { name: "Rotation des références", desc: "Vitesse de sortie de chaque vin et détection automatique de stock mort." },
        { name: "Intelligence d'achats", desc: "Recommandations de réapprovisionnement basées sur la vitesse de vente, saisonnalité et marge." },
        { name: "Prévision de la demande", desc: "Projection de consommation à court terme à partir de modèles historiques." },
        { name: "Obsolescence", desc: "Alerte précoce sur les références à risque de rester bloquées." },
      ]},
      { title: "Stratégie et simulation", modules: [
        { name: "Simulateur de carte", desc: "Testez des modifications avant publication : ajouter, retirer ou substituer des références." },
        { name: "Comparateur de scénarios", desc: "Confrontez deux configurations de carte et évaluez laquelle performe le mieux." },
        { name: "Analyse des tendances", desc: "Évolution temporelle des KPIs clés : ticket moyen, vente au verre, mix catégories." },
        { name: "Plan d'action", desc: "Recommandations priorisées et actionnables basées sur les diagnostics de tous les modules." },
        { name: "Règles métier", desc: "Définissez objectifs, contraintes et priorités qui conditionnent les recommandations." },
      ]},
      { title: "Benchmark et performance", modules: [
        { name: "Benchmark sectoriel", desc: "Comparez vos métriques avec des restaurants au profil similaire." },
        { name: "Scorecard mensuel", desc: "Rapport consolidé de performance avec évolution mois par mois." },
        { name: "Wine List Score", desc: "Score global de santé de votre carte : équilibre, rentabilité, rotation et couverture." },
        { name: "Diagnostic multi-site", desc: "Vue comparée entre sites d'un même groupe : déviations et bonnes pratiques." },
        { name: "Export et rapports", desc: "Générez des rapports téléchargeables pour la direction, les achats ou les réunions d'équipe." },
      ]},
    ],
    bridge_eyebrow: "Le niveau suivant",
    bridge_title_1: "Winerim Core analyse.",
    bridge_title_highlight: "L'Intelligence Dynamique agit.",
    bridge_desc: "Les 26 modules de Core génèrent les diagnostics et recommandations. La couche d'Intelligence Dynamique les convertit en actions automatiques sur la carte en temps réel.",
    bridge_cta: "Découvrir l'Intelligence Dynamique",
    final_eyebrow: "Prêt à voir Core en action ?",
    final_title_1: "Demandez une démo et découvrez comment",
    final_title_highlight: "26 modules",
    final_title_2: "transforment votre carte",
    final_desc: "Nous vous montrons comment Winerim Core analyse votre carte réelle, détecte les opportunités et génère un plan d'action concret.",
    final_cta: "Demander démo de Winerim Core",
    faq_title: "Questions fréquentes sur Winerim Core",
    faqs: [
      { q: "Quelle est la différence entre Winerim Core et l'Intelligence Dynamique ?", a: "Winerim Core est la couche d'analyse : il diagnostique, mesure et recommande. L'Intelligence Dynamique est la couche d'action : elle applique ces diagnostics en temps réel." },
      { q: "Wine Mapping est-il la même chose que Winerim Core ?", a: "Non. Wine Mapping est l'un des 26 modules de Core. Il radiographie la structure de la carte, mais Core couvre bien plus." },
      { q: "Faut-il tous les modules dès le début ?", a: "Non. Les modules s'activent progressivement selon votre plan et vos besoins." },
      { q: "Core fonctionne-t-il sans l'Intelligence Dynamique ?", a: "Oui. Core génère de la valeur en tant qu'outil d'analyse et de planification autonome." },
      { q: "Puis-je utiliser Winerim Core pour plusieurs sites ?", a: "Oui. Le module diagnostic multi-site permet de comparer les performances entre établissements d'un même groupe." },
    ],
    links: [
      { label: "Intelligence Dynamique : la couche d'IA tactique" },
      { label: "Toutes les fonctionnalités de Winerim" },
      { label: "Demander une démo personnalisée" },
      { label: "Plans et tarifs" },
      { label: "Outils d'analyse gratuits" },
      { label: "Comparez Winerim avec les alternatives" },
    ],
  },
};

const blockIcons = [
  [Map, Layers, Filter, AlertTriangle, Eye],
  [DollarSign, TrendingUp, Scale, PieChart, Gauge, Target],
  [Package, RefreshCw, ShoppingCart, History, AlertTriangle],
  [Lightbulb, GitCompare, Activity, ClipboardList, Settings],
  [BarChart3, FileBarChart, Gauge, Search, Cpu],
];

const blockStyles = [
  { accent: "from-amber-500/20 via-amber-500/5 to-transparent", borderAccent: "border-amber-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
  { accent: "from-emerald-500/20 via-emerald-500/5 to-transparent", borderAccent: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" },
  { accent: "from-blue-500/20 via-blue-500/5 to-transparent", borderAccent: "border-blue-500/20", iconBg: "bg-blue-500/10", iconColor: "text-blue-400" },
  { accent: "from-wine/20 via-wine/5 to-transparent", borderAccent: "border-wine/20", iconBg: "bg-wine/10", iconColor: "text-wine" },
  { accent: "from-violet-500/20 via-violet-500/5 to-transparent", borderAccent: "border-violet-500/20", iconBg: "bg-violet-500/10", iconColor: "text-violet-400" },
];

const WinerimCore = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = i18n[lang] || i18n.es;

  const scrollToModules = () => {
    document.getElementById("modulos")?.scrollIntoView({ behavior: "smooth" });
  };

  const linkDests = [
    "/producto/inteligencia-dinamica",
    "/funcionalidades",
    "/demo",
    "/precios",
    "/herramientas",
    "/comparativas",
  ];
  const linkTypes: ("solution" | "resource" | "tool")[] = ["solution", "resource", "solution", "resource", "tool", "solution"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={c.seo_title}
        description={c.seo_desc}
        url="https://winerim.wine/producto/winerim-core"
        hreflang={allLangPaths("/producto/winerim-core")}
      />

      <Navbar />

      {/* ─── Breadcrumbs ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <Breadcrumbs items={[
          { label: c.breadcrumb_features, href: localePath("/funcionalidades") },
          { label: "Winerim Core" },
        ]} />
      </div>

      {/* ─── Hero ─── */}
      <section className="section-padding pt-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 tracking-[0.25em] uppercase text-xs border-wine/30 text-wine bg-wine/5 px-4 py-1.5">
              Winerim Core
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {c.hero_h1_1}{" "}
              <span className="text-gradient-gold">{c.hero_h1_highlight}</span>{" "}
              {c.hero_h1_2}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              {c.hero_sub}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                {c.cta_demo} <ArrowRight size={16} />
              </Link>
              <button
                onClick={scrollToModules}
                className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all"
              >
                {c.cta_explore} <ChevronRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Qué es Winerim Core ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold mb-4">{c.what_label}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  {c.what_title_1} <span className="text-gradient-gold">{c.what_title_highlight}</span> {lang === "es" ? "por tu carta" : lang === "en" ? "for your list" : lang === "it" ? "per la tua carta" : "pour votre carte"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {c.what_p1.split("infraestructura analítica")[0]}<strong className="text-foreground">{lang === "es" ? "infraestructura analítica" : lang === "en" ? "analytical infrastructure" : lang === "it" ? "infrastruttura analitica" : "infrastructure analytique"}</strong>{c.what_p1.split(lang === "es" ? "infraestructura analítica" : lang === "en" ? "analytical infrastructure" : lang === "it" ? "infrastruttura analitica" : "infrastructure analytique")[1]}
                  </p>
                  <p>
                    {c.what_p2_pre}{" "}
                    <Link to={localePath("/producto/inteligencia-dinamica")} className="text-wine hover:text-wine-light underline underline-offset-4">{c.what_p2_link}</Link>
                    {" "}{c.what_p2_post.split(lang === "es" ? "Winerim Core analiza, diagnostica y recomienda" : lang === "en" ? "Winerim Core analyses, diagnoses and recommends" : lang === "it" ? "Winerim Core analizza, diagnostica e raccomanda" : "Winerim Core analyse, diagnostique et recommande")[0]}
                    <strong className="text-foreground">{lang === "es" ? "Winerim Core analiza, diagnostica y recomienda" : lang === "en" ? "Winerim Core analyses, diagnoses and recommends" : lang === "it" ? "Winerim Core analizza, diagnostica e raccomanda" : "Winerim Core analyse, diagnostique et recommande"}</strong>
                    {c.what_p2_post.split(lang === "es" ? "Winerim Core analiza, diagnostica y recomienda" : lang === "en" ? "Winerim Core analyses, diagnoses and recommends" : lang === "it" ? "Winerim Core analizza, diagnostica e raccomanda" : "Winerim Core analyse, diagnostique et recommande")[1]}
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {c.pillars.map((item, i) => {
                    const icons = [Brain, Search, Lightbulb];
                    const Icon = icons[i];
                    return (
                      <motion.div
                        key={item.label}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-background/40 rounded-xl border border-border/60 p-5 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                          <Icon size={20} className="text-wine" />
                        </div>
                        <p className="font-heading font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Los 26 módulos ─── */}
      <section className="section-padding" id="modulos">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">{c.modules_eyebrow}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold">
              {c.modules_title_1} <span className="text-gradient-gold">{c.modules_title_highlight}</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {c.modules_sub}
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {c.blocks.map((block, bi) => {
              const style = blockStyles[bi];
              const icons = blockIcons[bi];
              return (
                <ScrollReveal key={block.title} delay={bi * 0.05}>
                  <div className={`rounded-2xl border ${style.borderAccent} bg-gradient-card overflow-hidden`}>
                    <div className={`bg-gradient-to-r ${style.accent} px-6 md:px-8 py-5 border-b ${style.borderAccent}`}>
                      <h3 className="font-heading text-lg md:text-xl font-bold flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-background/60 border border-border/60">
                          {bi + 1}
                        </span>
                        {block.title}
                        <span className="text-xs text-muted-foreground font-normal ml-auto">
                          {block.modules.length} {c.modules_suffix}
                        </span>
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                      {block.modules.map((mod, mi) => {
                        const ModIcon = icons[mi] || BarChart3;
                        return (
                          <motion.div
                            key={mod.name}
                            custom={mi}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="bg-card p-5 md:p-6 hover:bg-card/80 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-9 h-9 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                                <ModIcon size={18} className={style.iconColor} />
                              </div>
                              <div>
                                <p className="font-semibold text-sm mb-1">{mod.name}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Puente a Inteligencia Dinámica ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10 text-center">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-4">{c.bridge_eyebrow}</p>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  {c.bridge_title_1}{" "}
                  <span className="text-gradient-gold">{c.bridge_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  {c.bridge_desc}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to={localePath("/producto/inteligencia-dinamica")}
                    className="inline-flex items-center gap-2 border border-wine/40 text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-wine/10 transition-all"
                  >
                    {c.bridge_cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{c.final_eyebrow}</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  {c.final_title_1} <span className="text-gradient-gold">{c.final_title_highlight}</span> {c.final_title_2}
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  {c.final_desc}
                </p>
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  {c.final_cta} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <FAQSection schemaId="winerim-core" title={c.faq_title} faqs={c.faqs} />

      <InternalLinks links={linkDests.map((to, i) => ({
        to: localePath(to),
        label: c.links[i].label,
        type: linkTypes[i],
      }))} />

      <Footer />
    </div>
  );
};

export default WinerimCore;
