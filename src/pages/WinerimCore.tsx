import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, DollarSign, Package, ShoppingCart,
  BarChart3, Layers, Activity, Gauge,
  TrendingUp, RotateCcw, Sparkles, Zap, ChevronRight,
  Calculator, GlassWater, Target, Brain
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

/* ── Animation ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Capability type ── */
interface Capability {
  icon: typeof DollarSign;
  title: string;
  desc: string;
  accent: string;
  iconBg: string;
}

/* ── i18n ── */
interface CoreI18n {
  seo_title: string; seo_desc: string;
  bc_product: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  support_text: string;
  cta_primary: string; cta_secondary: string;
  // Section 1: What is
  what_eyebrow: string; what_title: string; what_title_hl: string;
  what_p1: string; what_p2: string;
  what_pillars: { label: string; desc: string }[];
  // Section 2: Capabilities
  cap_eyebrow: string; cap_title: string; cap_title_hl: string;
  cap_subtitle: string;
  capabilities: { title: string; desc: string }[];
  // Section 2b: Depth proof
  depth_title: string; depth_text: string; depth_text2: string; depth_micro: string;
  // Section 3: Public tools bridge
  tools_eyebrow: string; tools_title: string; tools_title_hl: string;
  tools_desc: string;
  tools_examples: { tool: string; core_module: string }[];
  tools_cta: string;
  // Section 4: ID bridge
  bridge_eyebrow: string; bridge_title: string; bridge_title_hl: string;
  bridge_desc: string;
  bridge_flow: string[];
  bridge_cta: string;
  // Section 5: Final CTA
  final_eyebrow: string; final_title: string; final_title_hl: string;
  final_desc: string; final_cta: string;
  // FAQ
  faq_title: string;
  faqs: { q: string; a: string }[];
  // Links
  links: { to: string; label: string; type: "solution" | "guide" | "tool" | "resource" }[];
}

const capabilityMeta: Pick<Capability, "icon" | "accent" | "iconBg">[] = [
  { icon: DollarSign, accent: "border-emerald-500/20", iconBg: "bg-emerald-500/10" },
  { icon: Package, accent: "border-blue-500/20", iconBg: "bg-blue-500/10" },
  { icon: ShoppingCart, accent: "border-amber-500/20", iconBg: "bg-amber-500/10" },
  { icon: BarChart3, accent: "border-violet-500/20", iconBg: "bg-violet-500/10" },
  { icon: Activity, accent: "border-wine/20", iconBg: "bg-wine/10" },
  { icon: Layers, accent: "border-cyan-500/20", iconBg: "bg-cyan-500/10" },
];

const capabilityIconColors = [
  "text-emerald-400", "text-blue-400", "text-amber-400",
  "text-violet-400", "text-wine", "text-cyan-400",
];

const i18n: Record<SupportedLang, CoreI18n> = {
  es: {
    seo_title: "Winerim Core — Motor analítico para cartas de vinos | Winerim",
    seo_desc: "Winerim Core conecta pricing, margen, stock, rentabilidad, compras, benchmark y arquitectura de carta en una sola capa analítica. El cerebro de tu carta de vinos.",
    bc_product: "Producto",
    eyebrow: "WINERIM CORE",
    h1: "El motor analítico que convierte tu carta en un sistema de decisión",
    subtitle: "Winerim Core conecta pricing, margen, stock, rentabilidad, compras, benchmark y arquitectura de carta en una sola capa analítica.",
    support_text: "No es una colección de herramientas sueltas. Es la lógica que permite entender qué está pasando, qué no funciona y qué conviene hacer.",
    cta_primary: "Quiero ver Winerim Core",
    cta_secondary: "Ver cómo se conecta con Inteligencia Dinámica",

    what_eyebrow: "Qué es Winerim Core",
    what_title: "La infraestructura analítica que ",
    what_title_hl: "piensa por ti",
    what_p1: "Winerim Core es el motor de análisis y diagnóstico que alimenta todas las decisiones sobre tu carta de vinos. No es una carta digital. No es un dashboard de métricas. Es una capa analítica profunda compuesta por múltiples módulos interconectados que cruzan datos de ventas, stock, márgenes, pricing, benchmark y contexto operativo para darte una visión completa — y accionable — de cómo rinde tu negocio de vino.",
    what_p2: "Mientras la Inteligencia Dinámica actúa en tiempo real adaptando la carta al contexto, Winerim Core es quien analiza, diagnostica y recomienda. Es la base sobre la que se construyen las decisiones tácticas.",
    what_pillars: [
      { label: "Analiza", desc: "Cruza datos de venta, stock, margen y contexto operativo en una vista unificada." },
      { label: "Diagnostica", desc: "Detecta ineficiencias, oportunidades perdidas y desequilibrios antes de que se noten en caja." },
      { label: "Recomienda", desc: "Propone acciones priorizadas, simulables y orientadas a resultado." },
    ],

    cap_eyebrow: "Capacidades de negocio",
    cap_title: "Una capa analítica profunda para ",
    cap_title_hl: "decidir mejor",
    cap_subtitle: "Winerim Core agrupa la inteligencia del producto en capacidades que ayudan a gestionar mejor todo el negocio del vino.",
    capabilities: [
      { title: "Pricing y rentabilidad", desc: "Calcula, compara y ajusta precios con más criterio para proteger margen y coherencia económica." },
      { title: "Stock y rotación", desc: "Detecta referencias lentas, capital inmovilizado, sobrestock y oportunidades de activación o retirada." },
      { title: "Compras y reposición", desc: "Conecta consumo, rentabilidad y evolución de stock para decidir mejor qué reponer y qué no." },
      { title: "Benchmark y comparativa", desc: "Permite comparar mix, precios, márgenes y salud de carta frente a otros restaurantes o entre unidades." },
      { title: "Simulación y decisión", desc: "Ayuda a probar escenarios antes de ejecutar cambios en pricing, surtido o estructura de carta." },
      { title: "Salud y arquitectura de carta", desc: "Evalúa equilibrio, escalera de precios, profundidad de oferta y claridad comercial de la carta." },
    ],

    depth_title: "Una capa compuesta por decenas de módulos analíticos",
    depth_text: "Winerim Core integra 26 módulos analíticos interconectados que trabajan sobre pricing, margen, stock, rentabilidad, compras, simulación, arquitectura y benchmark.",
    depth_text2: "No necesitas verlos como herramientas aisladas. Lo importante es que juntos permiten analizar mejor la carta y tomar decisiones más sólidas.",
    depth_micro: "Algunas herramientas públicas de Winerim son demos simplificadas de esta capa analítica.",

    tools_eyebrow: "Las herramientas públicas son solo la superficie",
    tools_title: "Cada herramienta gratuita es una demo simplificada de lo que ",
    tools_title_hl: "Core hace a fondo",
    tools_desc: "Las calculadoras y analizadores que ofrecemos gratis resuelven un problema puntual. Winerim Core los integra todos, los conecta entre sí y los ejecuta de forma continua y automatizada sobre tus datos reales.",
    tools_examples: [
      { tool: "Calculadora de margen", core_module: "Motor de pricing y rentabilidad completo" },
      { tool: "Calculadora de precio por copa", core_module: "Análisis copa vs. botella con elasticidad" },
      { tool: "Wine List Score", core_module: "Scorecard mensual con benchmark sectorial" },
      { tool: "Analizador de carta", core_module: "Wine Mapping + arquitectura + surtido integrados" },
      { tool: "Calculadora de stock muerto", core_module: "Rotación, obsolescencia y previsión de demanda" },
    ],
    tools_cta: "Explorar herramientas gratuitas",

    bridge_eyebrow: "Core + Inteligencia Dinámica",
    bridge_title: "Core analiza. La Inteligencia Dinámica ",
    bridge_title_hl: "actúa.",
    bridge_desc: "Winerim Core genera los diagnósticos y las recomendaciones. La capa de Inteligencia Dinámica los convierte en acciones automáticas sobre la carta en tiempo real: reordena, destaca, oculta y adapta referencias según contexto, stock, margen y objetivos de negocio.",
    bridge_flow: [
      "Core detecta que una referencia lleva 3 semanas sin venderse",
      "Inteligencia Dinámica la baja de posición o sugiere una alternativa al comensal",
      "Core identifica que el margen medio por copa es bajo",
      "Inteligencia Dinámica prioriza las copas con mejor contribución",
    ],
    bridge_cta: "Descubrir la Inteligencia Dinámica",

    final_eyebrow: "¿Listo para tomar decisiones con datos?",
    final_title: "Pide una demo y descubre qué puede hacer Winerim Core ",
    final_title_hl: "por tu carta",
    final_desc: "Te mostramos cómo Winerim Core analiza tu carta real, detecta lo que no funciona y genera un plan de acción concreto orientado a resultados.",
    final_cta: "Solicitar demo de Winerim Core",

    faq_title: "Preguntas frecuentes sobre Winerim Core",
    faqs: [
      { q: "¿Qué diferencia hay entre Winerim Core y la Inteligencia Dinámica?", a: "Core es la capa de análisis: diagnostica, mide y recomienda. La Inteligencia Dinámica es la capa de acción: aplica esos diagnósticos en tiempo real sobre la carta visible al comensal." },
      { q: "¿Core es una carta digital?", a: "No. Winerim Core es un motor analítico. La carta digital es el soporte que el comensal ve, pero detrás hay un sistema de decisión que optimiza lo que se muestra, cómo se ordena y a qué precio." },
      { q: "¿Necesito activar todas las capacidades desde el inicio?", a: "No. Las capacidades se activan progresivamente según tu plan y necesidades. Puedes empezar con pricing y diagnóstico, y ampliar a stock, benchmark o simulación cuando lo necesites." },
      { q: "¿Core funciona sin la Inteligencia Dinámica?", a: "Sí. Core genera valor por sí solo como herramienta de análisis y planificación. La Inteligencia Dinámica es una capa adicional que automatiza acciones, pero Core es autónomo." },
      { q: "¿Puedo usar Winerim Core para varios locales?", a: "Sí. Incluye diagnóstico multi-local que permite comparar rendimiento entre establecimientos de un mismo grupo y detectar desviaciones o mejores prácticas replicables." },
    ],
    links: [
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: la capa de IA táctica", type: "solution" },
      { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "resource" },
      { to: "/demo", label: "Solicitar demo personalizada", type: "solution" },
      { to: "/herramientas", label: "Herramientas gratuitas de análisis", type: "tool" },
    ],
  },
  en: {
    seo_title: "Winerim Core — Analytical Engine for Wine Lists | Winerim",
    seo_desc: "Winerim Core connects pricing, margin, stock, profitability, purchasing, benchmarking and list architecture in a single analytical layer. The brain behind your wine list.",
    bc_product: "Product",
    eyebrow: "WINERIM CORE",
    h1: "The analytical engine that turns your wine list into a decision system",
    subtitle: "Winerim Core connects pricing, margin, stock, profitability, purchasing, benchmarking and list architecture in a single analytical layer.",
    support_text: "It's not a collection of standalone tools. It's the logic that lets you understand what's happening, what's not working and what to do about it.",
    cta_primary: "See Winerim Core",
    cta_secondary: "See how it connects with Dynamic Intelligence",

    what_eyebrow: "What is Winerim Core",
    what_title: "The analytical infrastructure that ",
    what_title_hl: "thinks for you",
    what_p1: "Winerim Core is the analysis and diagnostics engine behind every wine list decision. It's not a digital menu. It's not a metrics dashboard. It's a deep analytical layer composed of multiple interconnected modules that cross-reference sales, stock, margins, pricing, benchmarks and operational context to give you a complete — and actionable — view of how your wine business performs.",
    what_p2: "While Dynamic Intelligence acts in real time adapting the list to context, Winerim Core is the one that analyses, diagnoses and recommends. It's the foundation on which tactical decisions are built.",
    what_pillars: [
      { label: "Analyses", desc: "Cross-references sales, stock, margin and operational context in a unified view." },
      { label: "Diagnoses", desc: "Detects inefficiencies, missed opportunities and imbalances before they hit revenue." },
      { label: "Recommends", desc: "Proposes prioritised, simulable, outcome-oriented actions." },
    ],

    cap_eyebrow: "Business capabilities",
    cap_title: "A deep analytical layer for ",
    cap_title_hl: "better decisions",
    cap_subtitle: "Winerim Core groups product intelligence into capabilities that help you manage the entire wine business more effectively.",
    capabilities: [
      { title: "Pricing & profitability", desc: "Calculate, compare and adjust prices with better criteria to protect margins and economic consistency." },
      { title: "Stock & rotation", desc: "Detect slow-moving references, tied-up capital, overstock and opportunities for activation or withdrawal." },
      { title: "Purchasing & replenishment", desc: "Connect consumption, profitability and stock evolution to make better decisions on what to reorder and what not to." },
      { title: "Benchmark & comparison", desc: "Compare mix, prices, margins and list health against other restaurants or across your own venues." },
      { title: "Simulation & decision", desc: "Test scenarios before executing changes in pricing, assortment or list structure." },
      { title: "List health & architecture", desc: "Evaluate balance, price ladder, offer depth and commercial clarity of the list." },
    ],

    depth_title: "A layer composed of dozens of analytical modules",
    depth_text: "Winerim Core integrates 26 interconnected analytical modules that work across pricing, margin, stock, profitability, purchasing, simulation, architecture and benchmarking.",
    depth_text2: "You don't need to see them as isolated tools. What matters is that together they enable better list analysis and more solid decisions.",
    depth_micro: "Some of Winerim's public tools are simplified demos of this analytical layer.",

    tools_eyebrow: "Public tools are just the surface",
    tools_title: "Every free tool is a simplified demo of what ",
    tools_title_hl: "Core does in depth",
    tools_desc: "The calculators and analysers we offer for free solve a one-off problem. Winerim Core integrates them all, connects them together and runs them continuously and automatically on your real data.",
    tools_examples: [
      { tool: "Margin calculator", core_module: "Full pricing & profitability engine" },
      { tool: "By-the-glass price calculator", core_module: "Glass vs. bottle analysis with elasticity" },
      { tool: "Wine List Score", core_module: "Monthly scorecard with industry benchmark" },
      { tool: "Wine list analyser", core_module: "Wine Mapping + architecture + assortment integrated" },
      { tool: "Dead stock calculator", core_module: "Rotation, obsolescence & demand forecasting" },
    ],
    tools_cta: "Explore free tools",

    bridge_eyebrow: "Core + Dynamic Intelligence",
    bridge_title: "Core analyses. Dynamic Intelligence ",
    bridge_title_hl: "acts.",
    bridge_desc: "Winerim Core generates diagnostics and recommendations. The Dynamic Intelligence layer converts them into automatic real-time actions on the list: reorders, highlights, hides and adapts references based on context, stock, margin and business goals.",
    bridge_flow: [
      "Core detects a reference hasn't sold in 3 weeks",
      "Dynamic Intelligence moves it down or suggests an alternative to the guest",
      "Core identifies that average glass margin is low",
      "Dynamic Intelligence prioritises glasses with better contribution",
    ],
    bridge_cta: "Discover Dynamic Intelligence",

    final_eyebrow: "Ready to make data-driven decisions?",
    final_title: "Request a demo and discover what Winerim Core can do ",
    final_title_hl: "for your list",
    final_desc: "We'll show you how Winerim Core analyses your actual list, detects what's not working and generates a concrete action plan focused on results.",
    final_cta: "Request Winerim Core demo",

    faq_title: "Frequently asked questions about Winerim Core",
    faqs: [
      { q: "What's the difference between Winerim Core and Dynamic Intelligence?", a: "Core is the analysis layer: it diagnoses, measures and recommends. Dynamic Intelligence is the action layer: it applies those diagnostics in real time on the guest-facing list." },
      { q: "Is Core a digital wine list?", a: "No. Winerim Core is an analytical engine. The digital list is what the guest sees, but behind it sits a decision system that optimises what's shown, how it's ordered and at what price." },
      { q: "Do I need to activate all capabilities from day one?", a: "No. Capabilities are activated progressively based on your plan and needs. Start with pricing and diagnostics, then expand to stock, benchmark or simulation." },
      { q: "Does Core work without Dynamic Intelligence?", a: "Yes. Core generates value on its own as an analysis and planning tool. Dynamic Intelligence is an additional layer that automates actions, but Core is autonomous." },
      { q: "Can I use Winerim Core for multiple venues?", a: "Yes. It includes multi-venue diagnostics to compare performance across locations and detect deviations or replicable best practices." },
    ],
    links: [
      { to: "/producto/inteligencia-dinamica", label: "Dynamic Intelligence: the tactical AI layer", type: "solution" },
      { to: "/funcionalidades", label: "All Winerim features", type: "resource" },
      { to: "/demo", label: "Request personalised demo", type: "solution" },
      { to: "/herramientas", label: "Free analysis tools", type: "tool" },
    ],
  },
  it: {
    seo_title: "Winerim Core — Motore analitico per carte dei vini | Winerim",
    seo_desc: "Winerim Core collega pricing, margine, stock, redditività, acquisti, benchmark e architettura della carta in un unico livello analitico.",
    bc_product: "Prodotto",
    eyebrow: "WINERIM CORE",
    h1: "Il motore analitico che trasforma la carta in un sistema di decisione",
    subtitle: "Winerim Core collega pricing, margine, stock, redditività, acquisti, benchmark e architettura della carta in un unico livello analitico.",
    support_text: "Non è una collezione di strumenti separati. È la logica che ti permette di capire cosa sta succedendo, cosa non funziona e cosa conviene fare.",
    cta_primary: "Voglio vedere Winerim Core",
    cta_secondary: "Vedi come si connette con l'Intelligenza Dinamica",

    what_eyebrow: "Cos'è Winerim Core",
    what_title: "L'infrastruttura analitica che ",
    what_title_hl: "pensa per te",
    what_p1: "Winerim Core è il motore di analisi e diagnosi che alimenta ogni decisione sulla carta dei vini. Non è un menu digitale. Non è una dashboard di metriche. È un livello analitico profondo composto da moduli interconnessi che incrociano vendite, stock, margini, pricing, benchmark e contesto operativo per darti una visione completa — e azionabile — delle performance del tuo business vinicolo.",
    what_p2: "Mentre l'Intelligenza Dinamica agisce in tempo reale adattando la carta al contesto, Winerim Core analizza, diagnostica e raccomanda. È la base su cui si costruiscono le decisioni tattiche.",
    what_pillars: [
      { label: "Analizza", desc: "Incrocia dati di vendita, stock, margine e contesto operativo in una vista unificata." },
      { label: "Diagnostica", desc: "Rileva inefficienze, opportunità mancate e squilibri prima che impattino il fatturato." },
      { label: "Raccomanda", desc: "Propone azioni prioritarie, simulabili e orientate al risultato." },
    ],

    cap_eyebrow: "Capacità di business",
    cap_title: "Un livello analitico profondo per ",
    cap_title_hl: "decidere meglio",
    cap_subtitle: "Winerim Core raggruppa l'intelligenza del prodotto in capacità che aiutano a gestire meglio l'intero business del vino.",
    capabilities: [
      { title: "Pricing e redditività", desc: "Calcola, confronta e adegua i prezzi con più criterio per proteggere margine e coerenza economica." },
      { title: "Stock e rotazione", desc: "Rileva referenze lente, capitale immobilizzato, sovrascorta e opportunità di attivazione o ritiro." },
      { title: "Acquisti e riordino", desc: "Connette consumo, redditività ed evoluzione dello stock per decidere meglio cosa riordinare e cosa no." },
      { title: "Benchmark e comparativa", desc: "Permette di confrontare mix, prezzi, margini e salute della carta rispetto ad altri ristoranti o tra unità." },
      { title: "Simulazione e decisione", desc: "Aiuta a testare scenari prima di eseguire cambiamenti in pricing, assortimento o struttura della carta." },
      { title: "Salute e architettura carta", desc: "Valuta equilibrio, scala prezzi, profondità dell'offerta e chiarezza commerciale della carta." },
    ],

    depth_title: "Un livello composto da decine di moduli analitici",
    depth_text: "Winerim Core integra 26 moduli analitici interconnessi che lavorano su pricing, margine, stock, redditività, acquisti, simulazione, architettura e benchmark.",
    depth_text2: "Non serve vederli come strumenti isolati. L'importante è che insieme permettono di analizzare meglio la carta e prendere decisioni più solide.",
    depth_micro: "Alcuni strumenti pubblici di Winerim sono demo semplificate di questo livello analitico.",

    tools_eyebrow: "Gli strumenti pubblici sono solo la superficie",
    tools_title: "Ogni strumento gratuito è una demo semplificata di ciò che ",
    tools_title_hl: "Core fa in profondità",
    tools_desc: "I calcolatori e analizzatori che offriamo gratis risolvono un problema puntuale. Winerim Core li integra tutti, li connette e li esegue in modo continuo e automatizzato sui tuoi dati reali.",
    tools_examples: [
      { tool: "Calcolatrice margine", core_module: "Motore completo di pricing e redditività" },
      { tool: "Calcolatrice prezzo al calice", core_module: "Analisi calice vs. bottiglia con elasticità" },
      { tool: "Wine List Score", core_module: "Scorecard mensile con benchmark settoriale" },
      { tool: "Analizzatore carta", core_module: "Wine Mapping + architettura + assortimento integrati" },
      { tool: "Calcolatrice stock morto", core_module: "Rotazione, obsolescenza e previsione domanda" },
    ],
    tools_cta: "Esplora strumenti gratuiti",

    bridge_eyebrow: "Core + Intelligenza Dinamica",
    bridge_title: "Core analizza. L'Intelligenza Dinamica ",
    bridge_title_hl: "agisce.",
    bridge_desc: "Winerim Core genera diagnosi e raccomandazioni. Il livello di Intelligenza Dinamica li converte in azioni automatiche sulla carta in tempo reale: riordina, evidenzia, nasconde e adatta le referenze in base a contesto, stock, margine e obiettivi.",
    bridge_flow: [
      "Core rileva che una referenza non si vende da 3 settimane",
      "L'Intelligenza Dinamica la sposta in basso o suggerisce un'alternativa al cliente",
      "Core identifica che il margine medio al calice è basso",
      "L'Intelligenza Dinamica prioritizza i calici con miglior contribuzione",
    ],
    bridge_cta: "Scopri l'Intelligenza Dinamica",

    final_eyebrow: "Pronto a decidere con i dati?",
    final_title: "Richiedi una demo e scopri cosa può fare Winerim Core ",
    final_title_hl: "per la tua carta",
    final_desc: "Ti mostriamo come Winerim Core analizza la tua carta reale, rileva cosa non funziona e genera un piano d'azione concreto orientato ai risultati.",
    final_cta: "Richiedi demo di Winerim Core",

    faq_title: "Domande frequenti su Winerim Core",
    faqs: [
      { q: "Qual è la differenza tra Winerim Core e l'Intelligenza Dinamica?", a: "Core è il livello di analisi: diagnostica, misura e raccomanda. L'Intelligenza Dinamica è il livello di azione: applica le diagnosi in tempo reale sulla carta visibile." },
      { q: "Core è una carta digitale?", a: "No. Winerim Core è un motore analitico. La carta digitale è il supporto che vede il cliente, ma dietro c'è un sistema di decisione che ottimizza cosa si mostra e come." },
      { q: "Devo attivare tutte le capacità dall'inizio?", a: "No. Le capacità si attivano progressivamente in base al piano e alle esigenze. Puoi iniziare con pricing e diagnostica." },
      { q: "Core funziona senza l'Intelligenza Dinamica?", a: "Sì. Core genera valore da solo come strumento di analisi e pianificazione." },
      { q: "Posso usare Winerim Core per più locali?", a: "Sì. Include diagnostica multi-locale per confrontare performance tra sedi e rilevare deviazioni o best practice replicabili." },
    ],
    links: [
      { to: "/producto/inteligencia-dinamica", label: "Intelligenza Dinamica: il livello di IA tattica", type: "solution" },
      { to: "/funcionalidades", label: "Tutte le funzionalità Winerim", type: "resource" },
      { to: "/demo", label: "Richiedi demo personalizzata", type: "solution" },
      { to: "/herramientas", label: "Strumenti gratuiti di analisi", type: "tool" },
    ],
  },
  fr: {
    seo_title: "Winerim Core — Moteur analytique pour cartes des vins | Winerim",
    seo_desc: "Winerim Core relie pricing, marge, stock, rentabilité, achats, benchmark et architecture de carte dans une seule couche analytique.",
    bc_product: "Produit",
    eyebrow: "WINERIM CORE",
    h1: "Le moteur analytique qui transforme votre carte en système de décision",
    subtitle: "Winerim Core relie pricing, marge, stock, rentabilité, achats, benchmark et architecture de carte dans une seule couche analytique.",
    support_text: "Ce n'est pas une collection d'outils séparés. C'est la logique qui permet de comprendre ce qui se passe, ce qui ne fonctionne pas et ce qu'il convient de faire.",
    cta_primary: "Voir Winerim Core",
    cta_secondary: "Voir le lien avec l'Intelligence Dynamique",

    what_eyebrow: "Qu'est-ce que Winerim Core",
    what_title: "L'infrastructure analytique qui ",
    what_title_hl: "pense pour vous",
    what_p1: "Winerim Core est le moteur d'analyse et de diagnostic qui alimente chaque décision sur votre carte des vins. Ce n'est pas un menu digital. Ce n'est pas un tableau de bord de métriques. C'est une couche analytique profonde composée de modules interconnectés qui croisent ventes, stock, marges, pricing, benchmarks et contexte opérationnel pour vous donner une vision complète — et actionnable — de la performance de votre activité vin.",
    what_p2: "Tandis que l'Intelligence Dynamique agit en temps réel en adaptant la carte au contexte, Winerim Core est celui qui analyse, diagnostique et recommande. C'est le socle sur lequel se construisent les décisions tactiques.",
    what_pillars: [
      { label: "Analyse", desc: "Croise données de vente, stock, marge et contexte opérationnel dans une vue unifiée." },
      { label: "Diagnostique", desc: "Détecte inefficacités, opportunités manquées et déséquilibres avant qu'ils n'impactent le chiffre d'affaires." },
      { label: "Recommande", desc: "Propose des actions priorisées, simulables et orientées résultat." },
    ],

    cap_eyebrow: "Capacités métier",
    cap_title: "Une couche analytique profonde pour ",
    cap_title_hl: "mieux décider",
    cap_subtitle: "Winerim Core regroupe l'intelligence produit en capacités qui aident à mieux gérer l'ensemble du business vinicole.",
    capabilities: [
      { title: "Pricing et rentabilité", desc: "Calculez, comparez et ajustez les prix avec plus de critères pour protéger la marge et la cohérence économique." },
      { title: "Stock et rotation", desc: "Détectez les références lentes, le capital immobilisé, le surstock et les opportunités d'activation ou de retrait." },
      { title: "Achats et réapprovisionnement", desc: "Connectez consommation, rentabilité et évolution du stock pour mieux décider quoi réapprovisionner et quoi non." },
      { title: "Benchmark et comparaison", desc: "Comparez mix, prix, marges et santé de carte face à d'autres restaurants ou entre vos propres unités." },
      { title: "Simulation et décision", desc: "Testez des scénarios avant d'exécuter des changements de pricing, d'assortiment ou de structure de carte." },
      { title: "Santé et architecture de carte", desc: "Évaluez l'équilibre, l'escalier de prix, la profondeur de l'offre et la clarté commerciale de la carte." },
    ],

    depth_title: "Une couche composée de dizaines de modules analytiques",
    depth_text: "Winerim Core intègre 26 modules analytiques interconnectés qui travaillent sur le pricing, la marge, le stock, la rentabilité, les achats, la simulation, l'architecture et le benchmark.",
    depth_text2: "Pas besoin de les voir comme des outils isolés. L'essentiel est qu'ensemble, ils permettent de mieux analyser la carte et de prendre des décisions plus solides.",
    depth_micro: "Certains outils publics de Winerim sont des démos simplifiées de cette couche analytique.",

    tools_eyebrow: "Les outils publics ne sont que la surface",
    tools_title: "Chaque outil gratuit est une démo simplifiée de ce que ",
    tools_title_hl: "Core fait en profondeur",
    tools_desc: "Les calculateurs et analyseurs gratuits résolvent un problème ponctuel. Winerim Core les intègre tous, les connecte entre eux et les exécute en continu sur vos données réelles.",
    tools_examples: [
      { tool: "Calculateur de marge", core_module: "Moteur complet de pricing et rentabilité" },
      { tool: "Calculateur de prix au verre", core_module: "Analyse verre vs. bouteille avec élasticité" },
      { tool: "Wine List Score", core_module: "Scorecard mensuel avec benchmark sectoriel" },
      { tool: "Analyseur de carte", core_module: "Wine Mapping + architecture + assortiment intégrés" },
      { tool: "Calculateur de stock mort", core_module: "Rotation, obsolescence et prévision de la demande" },
    ],
    tools_cta: "Explorer les outils gratuits",

    bridge_eyebrow: "Core + Intelligence Dynamique",
    bridge_title: "Core analyse. L'Intelligence Dynamique ",
    bridge_title_hl: "agit.",
    bridge_desc: "Winerim Core génère les diagnostics et recommandations. La couche d'Intelligence Dynamique les convertit en actions automatiques sur la carte en temps réel : réordonne, met en avant, masque et adapte les références selon le contexte, le stock, la marge et les objectifs.",
    bridge_flow: [
      "Core détecte qu'une référence ne s'est pas vendue depuis 3 semaines",
      "L'Intelligence Dynamique la rétrograde ou suggère une alternative au client",
      "Core identifie que la marge moyenne au verre est faible",
      "L'Intelligence Dynamique priorise les verres à meilleure contribution",
    ],
    bridge_cta: "Découvrir l'Intelligence Dynamique",

    final_eyebrow: "Prêt à décider avec les données ?",
    final_title: "Demandez une démo et découvrez ce que Winerim Core peut faire ",
    final_title_hl: "pour votre carte",
    final_desc: "Nous vous montrons comment Winerim Core analyse votre carte réelle, détecte ce qui ne fonctionne pas et génère un plan d'action concret orienté résultats.",
    final_cta: "Demander démo de Winerim Core",

    faq_title: "Questions fréquentes sur Winerim Core",
    faqs: [
      { q: "Quelle différence entre Winerim Core et l'Intelligence Dynamique ?", a: "Core est la couche d'analyse : diagnostique, mesure et recommande. L'Intelligence Dynamique est la couche d'action : applique les diagnostics en temps réel sur la carte visible." },
      { q: "Core est-il une carte digitale ?", a: "Non. Winerim Core est un moteur analytique. La carte digitale est le support vu par le client, mais derrière il y a un système de décision qui optimise l'affichage." },
      { q: "Faut-il activer toutes les capacités dès le départ ?", a: "Non. Les capacités s'activent progressivement selon votre plan et vos besoins." },
      { q: "Core fonctionne-t-il sans l'Intelligence Dynamique ?", a: "Oui. Core génère de la valeur en tant qu'outil d'analyse et de planification autonome." },
      { q: "Puis-je utiliser Core pour plusieurs sites ?", a: "Oui. Il inclut un diagnostic multi-site pour comparer les performances entre établissements et détecter les écarts." },
    ],
    links: [
      { to: "/producto/inteligencia-dinamica", label: "Intelligence Dynamique : la couche d'IA tactique", type: "solution" },
      { to: "/funcionalidades", label: "Toutes les fonctionnalités Winerim", type: "resource" },
      { to: "/demo", label: "Demander démo personnalisée", type: "solution" },
      { to: "/herramientas", label: "Outils gratuits d'analyse", type: "tool" },
    ],
  },
};

/* ── Component ── */
const WinerimCore = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t.seo_title}
        description={t.seo_desc}
        url="https://winerim.wine/producto/winerim-core"
        hreflang={allLangPaths("/producto/winerim-core")}
      />
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-wine-dark/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(var(--wine)/0.04),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: t.bc_product, href: localePath("/funcionalidades") }, { label: "Winerim Core" }]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-wine/30 bg-wine/5 mb-8">
            <Gauge size={14} className="text-wine" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-wine">{t.eyebrow}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-8 max-w-4xl">
            {t.h1}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-4">
            {t.subtitle}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="text-sm text-muted-foreground/70 max-w-2xl mb-10 italic">
            {t.support_text}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.cta_primary} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/producto/inteligencia-dinamica")}
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 transition-colors">
              {t.cta_secondary} <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── 1. QUÉ ES WINERIM CORE ─── */}
      <section className="relative py-20 md:py-28 border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-4 block">{t.what_eyebrow}</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-8 max-w-3xl">
              {t.what_title}<span className="text-gradient-wine italic">{t.what_title_hl}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">{t.what_p1}</p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">{t.what_p2}</p>
          </ScrollReveal>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            {t.what_pillars.map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="relative p-6 rounded-xl border border-border bg-gradient-card overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-wine/60 via-wine/20 to-transparent" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center">
                      {i === 0 && <Brain size={16} className="text-wine" />}
                      {i === 1 && <Target size={16} className="text-wine" />}
                      {i === 2 && <Zap size={16} className="text-wine" />}
                    </div>
                    <h3 className="font-heading font-bold text-lg">{pillar.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. SIX CAPABILITIES ─── */}
      <section className="py-20 md:py-28 bg-gradient-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-4 block">{t.cap_eyebrow}</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-4">
              {t.cap_title}<span className="text-gradient-wine italic">{t.cap_title_hl}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.cap_subtitle}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {t.capabilities.map((cap, i) => {
              const meta = capabilityMeta[i];
              const Icon = meta.icon;
              const iconColor = capabilityIconColors[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <motion.div
                    className={`relative h-full p-7 md:p-8 rounded-2xl border ${meta.accent} bg-background overflow-hidden group hover:border-wine/30 transition-all duration-500`}
                    whileHover={{ y: -3 }}
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-wine/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className={`w-12 h-12 rounded-xl ${meta.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={22} className={iconColor} />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 2b. DEPTH PROOF ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-border bg-gradient-card overflow-hidden p-8 md:p-10">
              {/* Subtle left accent */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-wine/40 via-wine/15 to-transparent" />

              <h2 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-5 pl-4">
                {t.depth_title}
              </h2>
              <div className="pl-4 space-y-4">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {t.depth_text}
                </p>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {t.depth_text2}
                </p>
                <p className="text-xs text-muted-foreground/60 italic pt-2 border-t border-border/50">
                  {t.depth_micro}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 3. TOOLS = SIMPLIFIED DEMOS ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-4 block">{t.tools_eyebrow}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-4 max-w-3xl">
              {t.tools_title}<span className="text-gradient-wine italic">{t.tools_title_hl}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">{t.tools_desc}</p>
          </ScrollReveal>

          <div className="space-y-3">
            {t.tools_examples.map((ex, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border border-border bg-gradient-card group hover:border-wine/20 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Calculator size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{ex.tool}</p>
                  </div>
                  <ArrowRight size={14} className="text-wine/40 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{ex.core_module}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Link to={localePath("/herramientas")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-light transition-colors">
                {t.tools_cta} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 4. BRIDGE TO ID ─── */}
      <section className="py-20 md:py-28 bg-gradient-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--wine)/0.06),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-4 block">{t.bridge_eyebrow}</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl">
              {t.bridge_title}<span className="text-gradient-wine italic">{t.bridge_title_hl}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.bridge_desc}</p>
          </ScrollReveal>

          {/* Flow examples */}
          <div className="space-y-4 mb-12">
            {Array.from({ length: Math.floor(t.bridge_flow.length / 2) }, (_, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background">
                    <div className="w-7 h-7 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Gauge size={14} className="text-wine" />
                    </div>
                    <p className="text-sm text-muted-foreground">{t.bridge_flow[i * 2]}</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-wine/20 bg-wine/5">
                    <div className="w-7 h-7 rounded-lg bg-wine/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={14} className="text-wine" />
                    </div>
                    <p className="text-sm">{t.bridge_flow[i * 2 + 1]}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <Link to={localePath("/producto/inteligencia-dinamica")}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.bridge_cta} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 5. FINAL CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-4 block">{t.final_eyebrow}</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-4">
              {t.final_title}<span className="text-gradient-wine italic">{t.final_title_hl}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">{t.final_desc}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Link to={localePath("/demo")}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.final_cta} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <FAQSection title={t.faq_title} faqs={t.faqs} schemaId="winerim-core" />

      {/* ─── Internal links ─── */}
      <InternalLinks links={t.links} />

      <Footer />
    </div>
  );
};

export default WinerimCore;
