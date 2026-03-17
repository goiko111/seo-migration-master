import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ChevronRight, ShoppingCart, DollarSign, TrendingUp,
  AlertTriangle, Search, Star, ClipboardList, Users, Building2,
  Globe, Shield, BarChart3, Package, RefreshCw, Lightbulb, Brain
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
import DecisionCenterTeaser from "@/components/DecisionCenterTeaser";
import { SupportedLang } from "@/i18n/types";
import { trackAction } from "@/lib/intentTracking";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ══════════════════════════════════════════════════════════
   i18n — Full page translations
   ══════════════════════════════════════════════════════════ */
const i18n: Record<SupportedLang, {
  seo_title: string; seo_desc: string; seo_url: string;
  breadcrumbs: { label: string; href?: string }[];
  hero_badge: string;
  hero_title_1: string; hero_title_highlight: string;
  hero_subtitle: string; hero_journey: string;
  hero_cta_primary: string; hero_cta_secondary: string;
  // Section 2 — What is
  s2_eyebrow: string;
  s2_title_1: string; s2_title_sells: string; s2_title_buys: string;
  s2_paragraphs: string[];
  s2_pillars: { label: string; desc: string }[];
  // Section 3 — Capabilities
  s3_eyebrow: string; s3_title_1: string; s3_title_highlight: string; s3_subtitle: string;
  s3_caps: { title: string; desc: string }[];
  // Section 4 — Network advantage
  s4_eyebrow: string;
  s4_title_1: string; s4_title_highlight: string;
  s4_paragraphs: string[];
  s4_pillars: { label: string; desc: string }[];
  // Section 5 — Groups
  s5_eyebrow: string; s5_title_1: string; s5_title_highlight: string;
  s5_cards: { title: string; desc: string }[];
  s5_link: string;
  // Section 6 — CTA Final
  s6_eyebrow: string; s6_title_1: string; s6_title_highlight: string; s6_subtitle: string;
  s6_cta_primary: string; s6_cta_secondary: string;
  // FAQs
  faq_title: string;
  faqs: { q: string; a: string }[];
  // Internal links
  il: { label: string; to: string; type: string }[];
}> = {
  es: {
    seo_title: "Winerim Supply | Inteligencia de compras para restaurantes",
    seo_desc: "Winerim Supply analiza precios de compra, distribuidores, rotación y oportunidades para ayudarte a decidir qué comprar, qué renegociar y qué no reponer. Compra mejor, vende mejor.",
    seo_url: "https://winerim.wine/producto/winerim-supply",
    breadcrumbs: [{ label: "Inicio", href: "/" }, { label: "Funcionalidades", href: "/funcionalidades" }, { label: "Winerim Supply" }],
    hero_badge: "WINERIM SUPPLY",
    hero_title_1: "La capa que te ayuda a comprar mejor, ",
    hero_title_highlight: "no solo a vender mejor",
    hero_subtitle: "Winerim Supply analiza precios de compra, stock, rotación, oportunidades y distribuidores para ayudarte a decidir qué merece la pena seguir comprando, qué renegociar y qué no reponer.",
    hero_journey: "Comprar mejor → Analizar mejor → Vender mejor",
    hero_cta_primary: "Quiero ver Winerim Supply",
    hero_cta_secondary: "Ver cómo se conecta con Winerim Core",
    s2_eyebrow: "Qué es Winerim Supply",
    s2_title_1: "La capa que conecta lo que ",
    s2_title_sells: "vendes",
    s2_title_buys: "compras",
    s2_paragraphs: [
      "La mayoría de restaurantes gestionan sus compras de vino por inercia: repiten pedidos, mantienen referencias por costumbre y negocian sin datos. <strong>Winerim Supply cambia esa lógica.</strong>",
      "Conectando los datos de venta, margen, rotación y stock que ya genera <link>Winerim Core</link>, Supply añade una capa de inteligencia sobre la cadena de aprovisionamiento: analiza qué te conviene comprar, a qué precio lo estás pagando frente al mercado, y si tus distribuidores te ofrecen las mejores condiciones.",
      "No sustituye tu relación con los proveedores. La enriquece con datos para que cada decisión de compra esté respaldada por una visión completa del negocio.",
    ],
    s2_pillars: [
      { label: "Compra con criterio", desc: "Datos de venta y rotación informan cada pedido." },
      { label: "Negocia con ventaja", desc: "Comparativa de precios frente al mercado." },
      { label: "Repón con lógica", desc: "Automatiza la lista de compra según demanda real." },
    ],
    s3_eyebrow: "Capacidades",
    s3_title_1: "Inteligencia aplicada a cada ",
    s3_title_highlight: "decisión de compra",
    s3_subtitle: "Seis capacidades diseñadas para que cada euro invertido en bodega tenga un retorno medible en la carta.",
    s3_caps: [
      { title: "Comparativa de precios de compra", desc: "Cruza lo que pagas por cada referencia con datos agregados de la red para saber si tu precio es competitivo o si hay margen de renegociación." },
      { title: "Detección de oportunidades", desc: "Identifica referencias que otros restaurantes de perfil similar están comprando con buenos resultados y que tú aún no tienes en carta." },
      { title: "Alertas de sobreprecio", desc: "Notificación automática cuando el precio de compra de una referencia está significativamente por encima de la media para tu perfil y volumen." },
      { title: "Recomendación de compra / no reposición", desc: "Basándose en rotación, margen, stock actual y tendencia de venta, el sistema recomienda qué reponer, qué dejar morir y qué probar." },
      { title: "Scoring de distribuidores", desc: "Evalúa a tus proveedores según precio, fiabilidad de entrega, amplitud de catálogo y condiciones comerciales frente a alternativas." },
      { title: "Lista de compra inteligente", desc: "Genera propuestas de pedido basadas en niveles de stock, velocidad de salida, previsión de demanda y objetivos de carta activos." },
    ],
    s4_eyebrow: "La ventaja de red",
    s4_title_1: "Cuantos más restaurantes usan Winerim, ",
    s4_title_highlight: "mejores datos para todos",
    s4_paragraphs: [
      "Winerim Supply no funciona como un comparador genérico. Se alimenta de datos reales y anonimizados de restaurantes que ya usan la plataforma. Esto significa que las comparativas de precio, las alertas de sobreprecio y las oportunidades de compra se basan en <strong>transacciones reales de negocios con perfiles similares al tuyo</strong>.",
      "A medida que la red crece, la inteligencia de compra mejora. Es un efecto de red donde cada restaurante que se incorpora hace que los datos sean más ricos, las comparativas más fiables y las recomendaciones más precisas.",
    ],
    s4_pillars: [
      { label: "Datos anonimizados", desc: "Ningún restaurante ve los datos individuales de otro." },
      { label: "Perfiles comparables", desc: "Se comparan negocios de volumen y tipo similar." },
      { label: "Efecto de red", desc: "Más restaurantes = mejores benchmarks de compra." },
    ],
    s5_eyebrow: "Grupos y multi-local",
    s5_title_1: "Para grupos, Supply es ",
    s5_title_highlight: "aún más potente",
    s5_cards: [
      { title: "Visión consolidada de compras", desc: "Agrupa los pedidos de todos los locales del grupo para detectar ineficiencias, duplicidades y oportunidades de negociación conjunta con distribuidores." },
      { title: "Benchmark interno de compras", desc: "Compara precios de compra entre locales del mismo grupo. Detecta si un local paga más por la misma referencia y estandariza condiciones." },
      { title: "Unificación de catálogos", desc: "Identifica qué referencias comparten varios locales y cuáles son específicas, facilitando la racionalización del catálogo a nivel grupo." },
      { title: "Recomendaciones centralizadas", desc: "La dirección de compras del grupo recibe recomendaciones consolidadas basadas en el rendimiento real de cada referencia en cada local." },
    ],
    s5_link: "Ver solución completa para grupos de restauración",
    s6_eyebrow: "Compra con inteligencia",
    s6_title_1: "Deja de comprar por inercia. ",
    s6_title_highlight: "Compra con datos.",
    s6_subtitle: "Te mostramos cómo Winerim Supply transforma tus decisiones de compra con datos reales de tu carta, tu stock y el mercado.",
    s6_cta_primary: "Solicitar demo de Supply",
    s6_cta_secondary: "Hablar con el equipo",
    faq_title: "Preguntas frecuentes sobre Winerim Supply",
    faqs: [
      { q: "¿Winerim Supply sustituye a mi distribuidor?", a: "No. Supply no vende ni intermedia. Analiza tus datos de compra y los compara con benchmarks del mercado para que negocies con más información y tomes mejores decisiones de reposición." },
      { q: "¿Cómo se generan las comparativas de precio?", a: "A partir de datos anonimizados y agregados de restaurantes que usan Winerim. Nunca se comparten datos individuales; solo se usan promedios por perfil y volumen similar." },
      { q: "¿Necesito tener Winerim Core para usar Supply?", a: "Supply se alimenta de los datos que genera Core (ventas, márgenes, rotación, stock). Funcionan como capas complementarias dentro de la misma plataforma." },
      { q: "¿Puedo usar Supply para un grupo con varios locales?", a: "Sí. De hecho, la visión consolidada de compras a nivel grupo es una de las funcionalidades más potentes de Supply: detecta desviaciones de precio entre locales y oportunidades de negociación conjunta." },
      { q: "¿Supply está disponible para todos los planes?", a: "Supply se despliega de forma progresiva. Contacta con el equipo para conocer la disponibilidad según tu plan y perfil de negocio." },
    ],
    il: [
      { to: "/producto/winerim-core", label: "Winerim Core: 26 módulos analíticos", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: IA táctica para carta", type: "solution" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
      { to: "/recursos/revision-mensual-margenes-y-compras", label: "Plantilla revisión mensual de márgenes", type: "resource" },
      { to: "/decision-center/compras-reposicion", label: "Decision Center: compras y reposición", type: "decision-center" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center: stock y rotación", type: "decision-center" },
      { to: "/soluciones/grupos-restauracion", label: "Solución para grupos de restauración", type: "solution" },
      { to: "/precios", label: "Planes y precios", type: "solution" },
      { to: "/demo", label: "Solicitar una demo personalizada", type: "solution" },
    ],
  },
  en: {
    seo_title: "Winerim Supply | Purchasing Intelligence for Restaurants",
    seo_desc: "Winerim Supply analyses purchase prices, distributors, rotation and opportunities to help you decide what to buy, renegotiate and stop restocking. Buy better, sell better.",
    seo_url: "https://winerim.wine/en/product/winerim-supply",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Features", href: "/funcionalidades" }, { label: "Winerim Supply" }],
    hero_badge: "WINERIM SUPPLY",
    hero_title_1: "The layer that helps you buy better, ",
    hero_title_highlight: "not just sell better",
    hero_subtitle: "Winerim Supply analyses purchase prices, stock, rotation, opportunities and distributors to help you decide what's worth restocking, renegotiating or dropping.",
    hero_journey: "Buy better → Analyse better → Sell better",
    hero_cta_primary: "I want to see Winerim Supply",
    hero_cta_secondary: "See how it connects with Winerim Core",
    s2_eyebrow: "What is Winerim Supply",
    s2_title_1: "The layer that connects what you ",
    s2_title_sells: "sell",
    s2_title_buys: "buy",
    s2_paragraphs: [
      "Most restaurants manage wine purchasing on autopilot: repeating orders, keeping references out of habit and negotiating without data. <strong>Winerim Supply changes that logic.</strong>",
      "By connecting sales, margin, rotation and stock data already generated by <link>Winerim Core</link>, Supply adds a layer of intelligence to the supply chain: it analyses what's worth buying, what you're paying vs the market, and whether your distributors are offering the best terms.",
      "It doesn't replace your relationship with suppliers. It enriches it with data so every purchasing decision is backed by a complete business view.",
    ],
    s2_pillars: [
      { label: "Buy with criteria", desc: "Sales and rotation data inform every order." },
      { label: "Negotiate with advantage", desc: "Price comparison against the market." },
      { label: "Restock with logic", desc: "Automate purchase lists based on real demand." },
    ],
    s3_eyebrow: "Capabilities",
    s3_title_1: "Intelligence applied to every ",
    s3_title_highlight: "purchasing decision",
    s3_subtitle: "Six capabilities designed so every euro invested in your cellar has a measurable return on the wine list.",
    s3_caps: [
      { title: "Purchase price comparison", desc: "Cross-references what you pay per reference with aggregated network data to see if your price is competitive or if there's room for renegotiation." },
      { title: "Opportunity detection", desc: "Identifies references that similar restaurants are buying with good results and that you don't yet have on your list." },
      { title: "Overprice alerts", desc: "Automatic notification when the purchase price of a reference is significantly above the average for your profile and volume." },
      { title: "Buy / don't restock recommendations", desc: "Based on rotation, margin, current stock and sales trends, the system recommends what to restock, what to let die and what to try." },
      { title: "Distributor scoring", desc: "Evaluates your suppliers on price, delivery reliability, catalogue breadth and commercial terms versus alternatives." },
      { title: "Smart purchase list", desc: "Generates order proposals based on stock levels, sell-through velocity, demand forecasting and active list objectives." },
    ],
    s4_eyebrow: "The network advantage",
    s4_title_1: "The more restaurants use Winerim, ",
    s4_title_highlight: "the better the data for everyone",
    s4_paragraphs: [
      "Winerim Supply doesn't work like a generic comparator. It feeds on real, anonymised data from restaurants already on the platform. This means price comparisons, overprice alerts and buying opportunities are based on <strong>real transactions from businesses with a similar profile to yours</strong>.",
      "As the network grows, purchasing intelligence improves. It's a network effect where every restaurant that joins makes the data richer, comparisons more reliable and recommendations more precise.",
    ],
    s4_pillars: [
      { label: "Anonymised data", desc: "No restaurant sees another's individual data." },
      { label: "Comparable profiles", desc: "Businesses of similar volume and type are compared." },
      { label: "Network effect", desc: "More restaurants = better purchasing benchmarks." },
    ],
    s5_eyebrow: "Groups & multi-venue",
    s5_title_1: "For groups, Supply is ",
    s5_title_highlight: "even more powerful",
    s5_cards: [
      { title: "Consolidated purchasing view", desc: "Aggregates orders from all group venues to detect inefficiencies, duplications and joint negotiation opportunities with distributors." },
      { title: "Internal purchasing benchmark", desc: "Compares purchase prices across venues in the same group. Detects if one venue pays more for the same reference and standardises terms." },
      { title: "Catalogue unification", desc: "Identifies which references are shared across venues and which are unique, facilitating catalogue rationalisation at group level." },
      { title: "Centralised recommendations", desc: "The group's purchasing department receives consolidated recommendations based on the real performance of each reference at each venue." },
    ],
    s5_link: "See full solution for restaurant groups",
    s6_eyebrow: "Buy with intelligence",
    s6_title_1: "Stop buying on autopilot. ",
    s6_title_highlight: "Buy with data.",
    s6_subtitle: "We'll show you how Winerim Supply transforms your purchasing decisions with real data from your wine list, stock and the market.",
    s6_cta_primary: "Request Supply demo",
    s6_cta_secondary: "Talk to the team",
    faq_title: "Frequently asked questions about Winerim Supply",
    faqs: [
      { q: "Does Winerim Supply replace my distributor?", a: "No. Supply doesn't sell or intermediate. It analyses your purchasing data and compares it with market benchmarks so you can negotiate with better information and make smarter restocking decisions." },
      { q: "How are price comparisons generated?", a: "From anonymised, aggregated data from restaurants using Winerim. Individual data is never shared; only averages by profile and similar volume are used." },
      { q: "Do I need Winerim Core to use Supply?", a: "Supply feeds on data generated by Core (sales, margins, rotation, stock). They work as complementary layers within the same platform." },
      { q: "Can I use Supply for a group with multiple venues?", a: "Yes. In fact, the consolidated purchasing view at group level is one of Supply's most powerful features: it detects price deviations between venues and joint negotiation opportunities." },
      { q: "Is Supply available on all plans?", a: "Supply is being rolled out progressively. Contact the team to find out availability for your plan and business profile." },
    ],
    il: [
      { to: "/producto/winerim-core", label: "Winerim Core: 26 analytical modules", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamic Intelligence: tactical AI for your list", type: "solution" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Smart purchasing calculator", type: "tool" },
      { to: "/herramientas/calculadora-stock-muerto", label: "Dead stock calculator", type: "tool" },
      { to: "/decision-center/compras-reposicion", label: "Decision Center: purchasing & restocking", type: "decision-center" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center: stock & rotation", type: "decision-center" },
      { to: "/soluciones/grupos-restauracion", label: "Solution for restaurant groups", type: "solution" },
      { to: "/precios", label: "Plans and pricing", type: "solution" },
      { to: "/demo", label: "Request a personalised demo", type: "solution" },
    ],
  },
  it: {
    seo_title: "Winerim Supply | Intelligenza degli acquisti per ristoranti",
    seo_desc: "Winerim Supply analizza prezzi d'acquisto, distributori, rotazione e opportunità per aiutarti a decidere cosa comprare, cosa rinegoziare e cosa non riordinare. Compra meglio, vendi meglio.",
    seo_url: "https://winerim.wine/it/prodotto/winerim-supply",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Funzionalità", href: "/funcionalidades" }, { label: "Winerim Supply" }],
    hero_badge: "WINERIM SUPPLY",
    hero_title_1: "Il livello che ti aiuta a comprare meglio, ",
    hero_title_highlight: "non solo a vendere meglio",
    hero_subtitle: "Winerim Supply analizza prezzi d'acquisto, stock, rotazione, opportunità e distributori per aiutarti a decidere cosa vale la pena continuare a comprare, cosa rinegoziare e cosa non riordinare.",
    hero_journey: "Comprare meglio → Analizzare meglio → Vendere meglio",
    hero_cta_primary: "Voglio vedere Winerim Supply",
    hero_cta_secondary: "Vedi come si connette con Winerim Core",
    s2_eyebrow: "Cos'è Winerim Supply",
    s2_title_1: "Il livello che collega ciò che ",
    s2_title_sells: "vendi",
    s2_title_buys: "compri",
    s2_paragraphs: [
      "La maggior parte dei ristoranti gestisce gli acquisti di vino per inerzia: ripetono ordini, mantengono referenze per abitudine e negoziano senza dati. <strong>Winerim Supply cambia questa logica.</strong>",
      "Collegando i dati di vendita, margine, rotazione e stock già generati da <link>Winerim Core</link>, Supply aggiunge un livello di intelligenza alla catena di approvvigionamento: analizza cosa conviene comprare, a che prezzo lo stai pagando rispetto al mercato e se i tuoi distributori ti offrono le migliori condizioni.",
      "Non sostituisce il rapporto con i fornitori. Lo arricchisce con dati perché ogni decisione d'acquisto sia supportata da una visione completa del business.",
    ],
    s2_pillars: [
      { label: "Compra con criterio", desc: "Dati di vendita e rotazione informano ogni ordine." },
      { label: "Negozia con vantaggio", desc: "Comparativa di prezzi rispetto al mercato." },
      { label: "Riordina con logica", desc: "Automatizza la lista d'acquisto in base alla domanda reale." },
    ],
    s3_eyebrow: "Capacità",
    s3_title_1: "Intelligenza applicata a ogni ",
    s3_title_highlight: "decisione d'acquisto",
    s3_subtitle: "Sei capacità progettate perché ogni euro investito in cantina abbia un ritorno misurabile nella carta.",
    s3_caps: [
      { title: "Comparativa prezzi d'acquisto", desc: "Incrocia quanto paghi per ogni referenza con dati aggregati della rete per sapere se il tuo prezzo è competitivo o se c'è margine di rinegoziazione." },
      { title: "Rilevamento opportunità", desc: "Identifica referenze che ristoranti con profilo simile stanno acquistando con buoni risultati e che tu non hai ancora in carta." },
      { title: "Avvisi di sovrapprezzo", desc: "Notifica automatica quando il prezzo d'acquisto di una referenza è significativamente superiore alla media per il tuo profilo e volume." },
      { title: "Raccomandazione acquisto / non riordino", desc: "Basandosi su rotazione, margine, stock attuale e tendenza di vendita, il sistema raccomanda cosa riordinare, cosa lasciar morire e cosa provare." },
      { title: "Scoring dei distributori", desc: "Valuta i tuoi fornitori secondo prezzo, affidabilità di consegna, ampiezza del catalogo e condizioni commerciali rispetto alle alternative." },
      { title: "Lista d'acquisto intelligente", desc: "Genera proposte d'ordine basate su livelli di stock, velocità di uscita, previsione della domanda e obiettivi di carta attivi." },
    ],
    s4_eyebrow: "Il vantaggio di rete",
    s4_title_1: "Più ristoranti usano Winerim, ",
    s4_title_highlight: "migliori dati per tutti",
    s4_paragraphs: [
      "Winerim Supply non funziona come un comparatore generico. Si alimenta di dati reali e anonimizzati di ristoranti che già usano la piattaforma. Ciò significa che le comparazioni di prezzo, gli avvisi di sovrapprezzo e le opportunità d'acquisto si basano su <strong>transazioni reali di attività con profili simili al tuo</strong>.",
      "Man mano che la rete cresce, l'intelligenza d'acquisto migliora. È un effetto di rete dove ogni ristorante che si unisce rende i dati più ricchi, le comparazioni più affidabili e le raccomandazioni più precise.",
    ],
    s4_pillars: [
      { label: "Dati anonimizzati", desc: "Nessun ristorante vede i dati individuali di un altro." },
      { label: "Profili comparabili", desc: "Si confrontano attività di volume e tipo simile." },
      { label: "Effetto di rete", desc: "Più ristoranti = migliori benchmark d'acquisto." },
    ],
    s5_eyebrow: "Gruppi e multi-locale",
    s5_title_1: "Per i gruppi, Supply è ",
    s5_title_highlight: "ancora più potente",
    s5_cards: [
      { title: "Visione consolidata degli acquisti", desc: "Raggruppa gli ordini di tutti i locali del gruppo per rilevare inefficienze, duplicazioni e opportunità di negoziazione congiunta con i distributori." },
      { title: "Benchmark interno acquisti", desc: "Confronta i prezzi d'acquisto tra locali dello stesso gruppo. Rileva se un locale paga di più per la stessa referenza e standardizza le condizioni." },
      { title: "Unificazione dei cataloghi", desc: "Identifica quali referenze condividono più locali e quali sono specifiche, facilitando la razionalizzazione del catalogo a livello di gruppo." },
      { title: "Raccomandazioni centralizzate", desc: "La direzione acquisti del gruppo riceve raccomandazioni consolidate basate sulla performance reale di ogni referenza in ogni locale." },
    ],
    s5_link: "Vedi soluzione completa per gruppi di ristorazione",
    s6_eyebrow: "Compra con intelligenza",
    s6_title_1: "Smetti di comprare per inerzia. ",
    s6_title_highlight: "Compra con i dati.",
    s6_subtitle: "Ti mostriamo come Winerim Supply trasforma le tue decisioni d'acquisto con dati reali dalla tua carta, dal tuo stock e dal mercato.",
    s6_cta_primary: "Richiedi demo di Supply",
    s6_cta_secondary: "Parla con il team",
    faq_title: "Domande frequenti su Winerim Supply",
    faqs: [
      { q: "Winerim Supply sostituisce il mio distributore?", a: "No. Supply non vende né fa da intermediario. Analizza i tuoi dati d'acquisto e li confronta con benchmark di mercato per negoziare con più informazioni e prendere decisioni di riordino migliori." },
      { q: "Come vengono generate le comparazioni di prezzo?", a: "A partire da dati anonimizzati e aggregati dei ristoranti che usano Winerim. Non vengono mai condivisi dati individuali; si usano solo medie per profilo e volume simile." },
      { q: "Serve avere Winerim Core per usare Supply?", a: "Supply si alimenta dei dati generati da Core (vendite, margini, rotazione, stock). Funzionano come livelli complementari all'interno della stessa piattaforma." },
      { q: "Posso usare Supply per un gruppo con più locali?", a: "Sì. Di fatto, la visione consolidata degli acquisti a livello di gruppo è una delle funzionalità più potenti di Supply: rileva deviazioni di prezzo tra locali e opportunità di negoziazione congiunta." },
      { q: "Supply è disponibile per tutti i piani?", a: "Supply viene distribuito progressivamente. Contatta il team per conoscere la disponibilità in base al tuo piano e profilo di attività." },
    ],
    il: [
      { to: "/producto/winerim-core", label: "Winerim Core: 26 moduli analitici", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligenza Dinamica: IA tattica per la carta", type: "solution" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calcolatrice acquisto intelligente", type: "tool" },
      { to: "/herramientas/calculadora-stock-muerto", label: "Calcolatrice stock morto", type: "tool" },
      { to: "/decision-center/compras-reposicion", label: "Decision Center: acquisti e rifornimento", type: "decision-center" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center: stock e rotazione", type: "decision-center" },
      { to: "/soluciones/grupos-restauracion", label: "Soluzione per gruppi di ristorazione", type: "solution" },
      { to: "/precios", label: "Piani e prezzi", type: "solution" },
      { to: "/demo", label: "Richiedi una demo personalizzata", type: "solution" },
    ],
  },
  fr: {
    seo_title: "Winerim Supply | Intelligence des achats pour restaurants",
    seo_desc: "Winerim Supply analyse les prix d'achat, les distributeurs, la rotation et les opportunités pour vous aider à décider quoi acheter, renégocier et ne pas réapprovisionner. Achetez mieux, vendez mieux.",
    seo_url: "https://winerim.wine/fr/produit/winerim-supply",
    breadcrumbs: [{ label: "Accueil", href: "/" }, { label: "Fonctionnalités", href: "/funcionalidades" }, { label: "Winerim Supply" }],
    hero_badge: "WINERIM SUPPLY",
    hero_title_1: "La couche qui vous aide à mieux acheter, ",
    hero_title_highlight: "pas seulement à mieux vendre",
    hero_subtitle: "Winerim Supply analyse les prix d'achat, le stock, la rotation, les opportunités et les distributeurs pour vous aider à décider ce qu'il vaut la peine de continuer à acheter, à renégocier et à ne pas réapprovisionner.",
    hero_journey: "Mieux acheter → Mieux analyser → Mieux vendre",
    hero_cta_primary: "Je veux voir Winerim Supply",
    hero_cta_secondary: "Voir la connexion avec Winerim Core",
    s2_eyebrow: "Qu'est-ce que Winerim Supply",
    s2_title_1: "La couche qui relie ce que vous ",
    s2_title_sells: "vendez",
    s2_title_buys: "achetez",
    s2_paragraphs: [
      "La plupart des restaurants gèrent leurs achats de vin par inertie : ils répètent les commandes, gardent des références par habitude et négocient sans données. <strong>Winerim Supply change cette logique.</strong>",
      "En connectant les données de vente, marge, rotation et stock déjà générées par <link>Winerim Core</link>, Supply ajoute une couche d'intelligence à la chaîne d'approvisionnement : il analyse ce qu'il convient d'acheter, à quel prix vous payez par rapport au marché, et si vos distributeurs vous offrent les meilleures conditions.",
      "Il ne remplace pas votre relation avec les fournisseurs. Il l'enrichit avec des données pour que chaque décision d'achat soit soutenue par une vision complète du business.",
    ],
    s2_pillars: [
      { label: "Achetez avec critère", desc: "Les données de vente et de rotation éclairent chaque commande." },
      { label: "Négociez avec avantage", desc: "Comparatif de prix face au marché." },
      { label: "Réapprovisionnez avec logique", desc: "Automatisez la liste d'achat selon la demande réelle." },
    ],
    s3_eyebrow: "Capacités",
    s3_title_1: "Intelligence appliquée à chaque ",
    s3_title_highlight: "décision d'achat",
    s3_subtitle: "Six capacités conçues pour que chaque euro investi en cave ait un retour mesurable sur la carte.",
    s3_caps: [
      { title: "Comparatif des prix d'achat", desc: "Croise ce que vous payez par référence avec les données agrégées du réseau pour savoir si votre prix est compétitif ou s'il y a une marge de renégociation." },
      { title: "Détection d'opportunités", desc: "Identifie des références que des restaurants au profil similaire achètent avec de bons résultats et que vous n'avez pas encore en carte." },
      { title: "Alertes de surcoût", desc: "Notification automatique lorsque le prix d'achat d'une référence est significativement au-dessus de la moyenne pour votre profil et volume." },
      { title: "Recommandation d'achat / non-réapprovisionnement", desc: "En se basant sur la rotation, la marge, le stock actuel et la tendance des ventes, le système recommande quoi réapprovisionner, quoi laisser mourir et quoi essayer." },
      { title: "Scoring des distributeurs", desc: "Évalue vos fournisseurs selon le prix, la fiabilité de livraison, l'étendue du catalogue et les conditions commerciales face aux alternatives." },
      { title: "Liste d'achat intelligente", desc: "Génère des propositions de commande basées sur les niveaux de stock, la vitesse de sortie, la prévision de la demande et les objectifs de carte actifs." },
    ],
    s4_eyebrow: "L'avantage réseau",
    s4_title_1: "Plus de restaurants utilisent Winerim, ",
    s4_title_highlight: "meilleures données pour tous",
    s4_paragraphs: [
      "Winerim Supply ne fonctionne pas comme un comparateur générique. Il se nourrit de données réelles et anonymisées de restaurants qui utilisent déjà la plateforme. Cela signifie que les comparatifs de prix, les alertes de surcoût et les opportunités d'achat se basent sur <strong>des transactions réelles d'établissements avec un profil similaire au vôtre</strong>.",
      "À mesure que le réseau grandit, l'intelligence d'achat s'améliore. C'est un effet de réseau où chaque restaurant qui rejoint enrichit les données, rend les comparaisons plus fiables et les recommandations plus précises.",
    ],
    s4_pillars: [
      { label: "Données anonymisées", desc: "Aucun restaurant ne voit les données individuelles d'un autre." },
      { label: "Profils comparables", desc: "On compare des établissements de volume et type similaires." },
      { label: "Effet de réseau", desc: "Plus de restaurants = meilleurs benchmarks d'achat." },
    ],
    s5_eyebrow: "Groupes et multi-sites",
    s5_title_1: "Pour les groupes, Supply est ",
    s5_title_highlight: "encore plus puissant",
    s5_cards: [
      { title: "Vision consolidée des achats", desc: "Regroupe les commandes de tous les sites du groupe pour détecter les inefficiences, les doublons et les opportunités de négociation conjointe avec les distributeurs." },
      { title: "Benchmark interne des achats", desc: "Compare les prix d'achat entre les sites du même groupe. Détecte si un site paie plus cher pour la même référence et standardise les conditions." },
      { title: "Unification des catalogues", desc: "Identifie quelles références sont partagées entre plusieurs sites et lesquelles sont spécifiques, facilitant la rationalisation du catalogue au niveau groupe." },
      { title: "Recommandations centralisées", desc: "La direction des achats du groupe reçoit des recommandations consolidées basées sur la performance réelle de chaque référence dans chaque site." },
    ],
    s5_link: "Voir la solution complète pour les groupes de restauration",
    s6_eyebrow: "Achetez avec intelligence",
    s6_title_1: "Arrêtez d'acheter par inertie. ",
    s6_title_highlight: "Achetez avec des données.",
    s6_subtitle: "Nous vous montrons comment Winerim Supply transforme vos décisions d'achat avec des données réelles de votre carte, votre stock et le marché.",
    s6_cta_primary: "Demander une démo Supply",
    s6_cta_secondary: "Parler à l'équipe",
    faq_title: "Questions fréquentes sur Winerim Supply",
    faqs: [
      { q: "Winerim Supply remplace-t-il mon distributeur ?", a: "Non. Supply ne vend ni n'intermédie. Il analyse vos données d'achat et les compare avec des benchmarks du marché pour que vous négociez avec plus d'information et preniez de meilleures décisions de réapprovisionnement." },
      { q: "Comment les comparatifs de prix sont-ils générés ?", a: "À partir de données anonymisées et agrégées de restaurants utilisant Winerim. Les données individuelles ne sont jamais partagées ; seules les moyennes par profil et volume similaire sont utilisées." },
      { q: "Faut-il avoir Winerim Core pour utiliser Supply ?", a: "Supply se nourrit des données générées par Core (ventes, marges, rotation, stock). Ils fonctionnent comme des couches complémentaires au sein de la même plateforme." },
      { q: "Puis-je utiliser Supply pour un groupe multi-sites ?", a: "Oui. En fait, la vision consolidée des achats au niveau du groupe est l'une des fonctionnalités les plus puissantes de Supply : elle détecte les écarts de prix entre sites et les opportunités de négociation conjointe." },
      { q: "Supply est-il disponible pour tous les plans ?", a: "Supply est déployé progressivement. Contactez l'équipe pour connaître la disponibilité selon votre plan et profil d'établissement." },
    ],
    il: [
      { to: "/producto/winerim-core", label: "Winerim Core : 26 modules analytiques", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligence Dynamique : IA tactique pour la carte", type: "solution" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculatrice achat intelligent", type: "tool" },
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculatrice stock mort", type: "tool" },
      { to: "/decision-center/compras-reposicion", label: "Decision Center : achats et réapprovisionnement", type: "decision-center" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center : stock et rotation", type: "decision-center" },
      { to: "/soluciones/grupos-restauracion", label: "Solution pour groupes de restauration", type: "solution" },
      { to: "/precios", label: "Plans et tarifs", type: "solution" },
      { to: "/demo", label: "Demander une démo personnalisée", type: "solution" },
    ],
  },
};

/* ── Visual config (icons, colors — no text) ── */
const capVisuals = [
  { icon: BarChart3, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" },
  { icon: Search, iconBg: "bg-blue-500/10", iconColor: "text-blue-400" },
  { icon: AlertTriangle, iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
  { icon: Lightbulb, iconBg: "bg-wine/10", iconColor: "text-wine" },
  { icon: Star, iconBg: "bg-violet-500/10", iconColor: "text-violet-400" },
  { icon: ClipboardList, iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
];

const groupCardVisuals = [
  { icon: Building2, accent: "border-amber-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
  { icon: BarChart3, accent: "border-blue-500/20", iconBg: "bg-blue-500/10", iconColor: "text-blue-400" },
  { icon: Package, accent: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" },
  { icon: Brain, accent: "border-wine/20", iconBg: "bg-wine/10", iconColor: "text-wine" },
];

const pillarIcons = [ShoppingCart, DollarSign, RefreshCw];
const networkPillarIcons = [Shield, Users, TrendingUp];

const WinerimSupply = () => {
  const { lang, localePath } = useLanguage();
  const tx = i18n[lang];

  const renderParagraph = (text: string) => {
    if (text.includes("<link>")) {
      const parts = text.split(/<link>|<\/link>/);
      return (
        <p className="text-muted-foreground leading-relaxed" key={text.slice(0, 30)}>
          {parts.map((part, idx) =>
            idx === 1 ? (
              <Link key={idx} to={localePath("/producto/winerim-core")} className="text-wine hover:text-wine-light underline underline-offset-4">{part}</Link>
            ) : (
              <span key={idx} dangerouslySetInnerHTML={{ __html: part }} />
            )
          )}
        </p>
      );
    }
    return <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} key={text.slice(0, 30)} />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={tx.seo_title} description={tx.seo_desc} url={tx.seo_url} />
      <Navbar />

      {/* ─── Breadcrumbs ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <Breadcrumbs items={tx.breadcrumbs.map(b => ({ label: b.label, href: b.href ? localePath(b.href) : undefined }))} />
      </div>

      {/* ═══ 1. HERO ═══ */}
      <section className="section-padding pt-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 tracking-[0.25em] uppercase text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-4 py-1.5">{tx.hero_badge}</Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {tx.hero_title_1}<span className="text-gradient-gold">{tx.hero_title_highlight}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">{tx.hero_subtitle}</p>
            <p className="font-heading text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-emerald-400/80 mb-10">{tx.hero_journey}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={localePath("/demo")} onClick={() => trackAction("cta_click", "product_supply", "hero_supply_primary")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {tx.hero_cta_primary} <ArrowRight size={16} />
              </Link>
              <Link to={localePath("/producto/winerim-core")} className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all">
                {tx.hero_cta_secondary} <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 2. QUÉ ES ═══ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold mb-4">{tx.s2_eyebrow}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  {tx.s2_title_1}<span className="text-gradient-gold">{tx.s2_title_sells}</span>{" "}
                  {lang === "es" ? "con lo que " : lang === "en" ? "with what you " : lang === "it" ? "con ciò che " : "avec ce que vous "}
                  <span className="text-gradient-gold">{tx.s2_title_buys}</span>
                </h2>
                <div className="space-y-4">
                  {tx.s2_paragraphs.map(renderParagraph)}
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {tx.s2_pillars.map((item, i) => {
                    const Icon = pillarIcons[i];
                    return (
                      <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-background/40 rounded-xl border border-border/60 p-5 text-center">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Icon size={20} className="text-emerald-400" />
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

      {/* ═══ 3. CAPABILITIES ═══ */}
      <section className="section-padding" id="capacidades">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">{tx.s3_eyebrow}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold">
              {tx.s3_title_1}<span className="text-gradient-gold">{tx.s3_title_highlight}</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{tx.s3_subtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {tx.s3_caps.map((cap, i) => {
              const vis = capVisuals[i];
              return (
                <ScrollReveal key={cap.title}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group relative h-full p-7 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-border transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden">
                    <div className="relative flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl ${vis.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                        <vis.icon className={`w-6 h-6 ${vis.iconColor} transition-all duration-500`} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-3">{cap.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{cap.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 4. NETWORK ADVANTAGE ═══ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--wine)/0.06),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center"><Globe size={20} className="text-violet-400" /></div>
                  <p className="text-xs tracking-[0.25em] uppercase text-gradient-gold font-semibold">{tx.s4_eyebrow}</p>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  {tx.s4_title_1}<span className="text-gradient-gold">{tx.s4_title_highlight}</span>
                </h2>
                <div className="space-y-4 mb-8">
                  {tx.s4_paragraphs.map((p) => (
                    <p key={p.slice(0, 30)} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong class="text-foreground">') }} />
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {tx.s4_pillars.map((item, i) => {
                    const Icon = networkPillarIcons[i];
                    return (
                      <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-background/40 rounded-xl border border-border/60 p-5 text-center">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3"><Icon size={20} className="text-violet-400" /></div>
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

      {/* ═══ 5. GROUPS ═══ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">{tx.s5_eyebrow}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {tx.s5_title_1}<span className="text-gradient-gold">{tx.s5_title_highlight}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {tx.s5_cards.map((card, i) => {
                const vis = groupCardVisuals[i];
                return (
                  <motion.div key={card.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`group relative p-7 md:p-8 rounded-2xl border ${vis.accent} bg-card/60 hover:bg-card/80 transition-all duration-500`}>
                    <div className={`w-11 h-11 rounded-xl ${vis.iconBg} flex items-center justify-center mb-5`}>
                      <vis.icon className={`w-5 h-5 ${vis.iconColor}`} />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link to={localePath("/soluciones/grupos-restauracion")} className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-light transition-colors">
                {tx.s5_link} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Decision Center teaser */}
      <DecisionCenterTeaser lang={lang} />

      {/* ═══ 6. CTA FINAL ═══ */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{tx.s6_eyebrow}</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  {tx.s6_title_1}<span className="text-gradient-gold">{tx.s6_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{tx.s6_subtitle}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                    {tx.s6_cta_primary} <ArrowRight size={16} />
                  </Link>
                  <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 hover:text-foreground transition-all">
                    {tx.s6_cta_secondary}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <FAQSection schemaId="winerim-supply" title={tx.faq_title} faqs={tx.faqs} />

      <InternalLinks links={tx.il.map(l => ({ to: localePath(l.to), label: l.label, type: l.type as "solution" | "resource" | "tool" }))} />

      <Footer />
    </div>
  );
};

export default WinerimSupply;
