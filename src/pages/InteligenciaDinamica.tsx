import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, TrendingUp, BarChart3, Zap, Target, RefreshCw,
  Layers, Eye, ShieldCheck, ArrowRight, Gauge, DollarSign,
  Users, Wine, Activity, Lightbulb, CheckCircle, AlertTriangle,
  Settings, Cpu, MessageSquare, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { type SupportedLang, type I18nMap, getI18n} from "@/i18n/types";
import { trackAction } from "@/lib/intentTracking";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ══════════════════════════════════════════════════════════
   i18n — Full page translations
   ══════════════════════════════════════════════════════════ */
const i18n: I18nMap<{
  seo_title: string; seo_desc: string; seo_url: string;
  schema_desc: string; schema_category: string;
  breadcrumb_parent: string; breadcrumb_current: string;
  eyebrow: string;
  hero_title_1: string; hero_title_highlight: string;
  hero_subtitle: string;
  core_bridge: string; core_bridge_cta: string;
  supporting_phrase: string;
  highlights: string[];
  cta_demo: string; cta_how: string;
  microcopy: string;
  // Section 2 — Comparison
  s2_title_1: string; s2_title_highlight: string; s2_subtitle: string;
  s2_left_label: string; s2_left_items: string[];
  s2_right_label: string; s2_right_items: string[];
  s2_closing: string; s2_closing_highlight: string;
  // Section 3 — 4 Layers
  s3_badge: string; s3_title_1: string; s3_title_highlight: string; s3_subtitle: string;
  s3_layers: { num: string; title: string; desc: string }[];
  s3_closing: string;
  // Section 4 — Objectives
  s4_badge: string; s4_title_1: string; s4_title_highlight: string; s4_subtitle: string;
  s4_objectives: { title: string; desc: string }[];
  s4_activates: string;
  // Section 5 — RIMs
  s5_badge: string; s5_title_1: string; s5_title_highlight: string; s5_subtitle: string;
  s5_rims: { desc: string; result: string }[];
  // Section 6 — Priority
  s6_badge: string; s6_title_1: string; s6_title_highlight: string; s6_subtitle: string;
  s6_levels: { label: string }[];
  s6_level_label: string;
  s6_closing: string;
  // Section 7 — Explainability
  s7_badge: string; s7_title_1: string; s7_title_highlight: string; s7_subtitle: string;
  s7_detected: string; s7_action_applied: string;
  s7_logs: { timestamp: string; reasons: string[]; actions: string[] }[];
  // Section 8 — Impact
  s8_badge: string; s8_title_1: string; s8_title_highlight: string; s8_subtitle: string;
  s8_metrics: { title: string; desc: string }[];
  s8_disclaimer: string;
  // Section 9 — Core vs ID comparison
  s9b_title: string; s9b_subtitle: string;
  s9b_core_label: string; s9b_core_items: string[];
  s9b_id_label: string; s9b_id_items: string[];
  s9b_closing: string; s9b_cta: string;
  // Section 10 — CTA Final
  s9_title_1: string; s9_title_2: string; s9_subtitle: string;
  s9_cta_demo: string; s9_cta_contact: string;
  // Section 11 — Closing
  s10_title_1: string; s10_title_2: string; s10_title_highlight: string;
  s10_subtitle: string; s10_cta: string; s10_cta_contact: string; s10_microcopy: string;
  // Internal links
  il_core: string; il_features: string; il_software: string; il_integrations: string; il_groups: string; il_demo: string;
}> = {
  es: {
    seo_title: "Inteligencia Dinámica para Cartas de Vino | IA para Restaurantes | Winerim",
    seo_desc: "Software de inteligencia artificial para restaurantes que optimiza tu carta de vinos en tiempo real.",
    seo_url: "https://winerim.wine/producto/inteligencia-dinamica",
    schema_desc: "Capa de IA táctica para cartas de vino que adapta visibilidad, recomendaciones y prioridades según margen, stock, contexto y objetivos del restaurante.",
    schema_category: "Software para hostelería",
    breadcrumb_parent: "Software carta de vinos",
    breadcrumb_current: "Inteligencia dinámica",
    eyebrow: "Nueva capa de IA táctica",
    hero_title_1: "La carta que se adapta ",
    hero_title_highlight: "para vender mejor.",
    hero_subtitle: "Inteligencia dinámica es la capa estratégica de Winerim que adapta visibilidad, recomendación, rotación y empuje comercial según margen, stock, clima, afluencia y objetivo del restaurante.",
    core_bridge: "Los RIMs no operan en vacío. Se alimentan de la capa analítica de",
    core_bridge_cta: "Ver Winerim Core",
    supporting_phrase: "No solo muestra vinos. Decide qué conviene impulsar en cada momento.",
    highlights: ["Más facturación", "Más margen", "Más rotación", "Menos stock muerto", "Mejor experiencia de elección"],
    cta_demo: "Quiero ver una demo",
    cta_how: "Ver cómo funciona",
    microcopy: "Disponible para despliegues progresivos y pilotos seleccionados.",
    s2_title_1: "De carta digital a ",
    s2_title_highlight: "sistema de decisión comercial",
    s2_subtitle: "Una carta tradicional muestra vinos. Winerim con Inteligencia dinámica decide cómo priorizarlos según el negocio y el contexto.",
    s2_left_label: "Carta digital tradicional",
    s2_left_items: ["Orden fijo", "Recomendación estática", "Sin reacción al contexto", "Misma lógica para cualquier momento", "Sin priorización de margen ni rotación"],
    s2_right_label: "Winerim con Inteligencia dinámica",
    s2_right_items: ["Prioriza con intención", "Reordena según objetivo", "Reacciona al servicio y al contexto", "Activa estrategias automáticamente", "Equilibra experiencia, margen y stock"],
    s2_closing: "\"Winerim no solo enseña vinos. ",
    s2_closing_highlight: "Decide cuándo conviene mostrar, simplificar, impulsar o rotar",
    s3_badge: "Cómo funciona",
    s3_title_1: "Un sistema de decisión en ",
    s3_title_highlight: "4 capas",
    s3_subtitle: "Cada capa puede actuar por separado, pero el verdadero valor aparece cuando trabajan juntas.",
    s3_layers: [
      { num: "01", title: "Objetivos", desc: "Definen qué quiere conseguir el restaurante: más facturación, más margen, más rotación, carta viva o experiencia premium." },
      { num: "02", title: "Perfiles de rotación", desc: "Seleccionan qué vinos deben recibir más atención según margen, stock, velocidad de salida, prime, temporada, localismo o precio." },
      { num: "03", title: "Módulos estructurales", desc: "Determinan dónde se aplican las estrategias dentro de la carta: recomendados, novedades, selección, maridajes, primeras posiciones o resultados tras filtrado." },
      { num: "04", title: "Módulos RIM™", desc: "Deciden cuándo y por qué actuar según clima, afluencia, ventas, stock, calendario o comportamiento real." },
    ],
    s3_closing: "El resultado es una carta que se adapta sola para vender mejor sin perder coherencia.",
    s4_badge: "Objetivos",
    s4_title_1: "Elige el objetivo. ",
    s4_title_highlight: "Winerim activa la estrategia.",
    s4_subtitle: "Cada objetivo combina automáticamente módulos RIM™, perfiles de rotación y zonas de la carta para mover el negocio en la dirección correcta.",
    s4_objectives: [
      { title: "Aumentar facturación", desc: "Empuja referencias rentables y mejora la venta guiada en momentos clave." },
      { title: "Aumentar ticket medio", desc: "Prioriza vinos premium, en prime y con mejor capacidad de upselling." },
      { title: "Maximizar margen", desc: "Reordena y destaca referencias con mayor contribución al negocio." },
      { title: "Aumentar rotación", desc: "Da salida a vinos lentos, sobrestock o referencias con riesgo de quedarse paradas." },
      { title: "Limpiar bodega", desc: "Activa acciones específicas para mover últimas unidades y stock inmovilizado." },
      { title: "Carta viva / dinámica", desc: "Hace que la carta evolucione con ritmo, equilibrio y sensación de descubrimiento continuo." },
    ],
    s4_activates: "Activa",
    s5_badge: "Módulos RIM™",
    s5_title_1: "Los módulos que hacen que ",
    s5_title_highlight: "la carta reaccione",
    s5_subtitle: "Cada RIM™ responde a una lógica distinta. Juntos convierten la carta en un sistema táctico.",
    s5_rims: [
      { desc: "El cerebro que orquesta prioridades, resuelve conflictos y recalcula la mejor combinación de acciones.", result: "Orquestación inteligente" },
      { desc: "Impulsa referencias con mejor contribución económica sin romper la lógica comercial de la carta.", result: "Más margen por servicio" },
      { desc: "Detecta sobrestock, lentitud de salida o riesgo de inmovilización y activa estrategias para moverlo.", result: "Menos stock muerto" },
      { desc: "Simplifica la carta y prioriza referencias más rentables en momentos de alta afluencia o servicio rápido.", result: "Menos tiempo de decisión" },
      { desc: "Adapta la visibilidad de los vinos al clima real para mejorar conversión y adecuación al momento.", result: "Más afinidad contextual" },
      { desc: "Da protagonismo a vinos en su mejor ventana de consumo y ayuda a aprovechar su momento óptimo.", result: "Mejor aprovechamiento del prime" },
    ],
    s6_badge: "Prioridad",
    s6_title_1: "No todos los módulos tienen el ",
    s6_title_highlight: "mismo peso",
    s6_subtitle: "Cuando varios módulos pueden actuar a la vez, Winerim resuelve prioridades para mantener coherencia comercial y utilidad real.",
    s6_levels: [{ label: "Protección del negocio" }, { label: "Contexto" }, { label: "Estrategia de carta" }, { label: "Orquestación" }],
    s6_level_label: "Nivel",
    s6_closing: "Cuando varios módulos pueden actuar a la vez, Winerim resuelve prioridades para que la carta siga siendo coherente y útil para el negocio.",
    s7_badge: "Transparencia",
    s7_title_1: "Cada acción tiene una ",
    s7_title_highlight: "razón visible",
    s7_subtitle: "Winerim no solo actúa. También explica por qué lo ha hecho.",
    s7_detected: "Detectado",
    s7_action_applied: "Acción aplicada",
    s7_logs: [
      { timestamp: "Hoy · 13:42 · Servicio de mediodía", reasons: ["Ocupación alta detectada (87%)", "Tiempo de decisión elevado (+40% vs media)", "Varias referencias rentables con stock suficiente"], actions: ["Simplificación de opciones visibles", "Subida de primeras posiciones con mayor margen", "Menor visibilidad de copas con bajo ROI"] },
      { timestamp: "Hoy · 09:15 · Revisión de inventario", reasons: ["Exceso de stock en 4 referencias (>30 días sin movimiento)", "Rotación por debajo del umbral esperado en tintos jóvenes"], actions: ["Entrada en sección Novedades", "Visibilidad adicional en búsquedas por tipo", "Activación de estrategia por copa"] },
      { timestamp: "Hoy · 08:00 · Previsión meteorológica", reasons: ["Aumento de temperatura previsto (+8 °C vs ayer)", "Mayor afinidad de estilos frescos con el momento"], actions: ["Subida de blancos, rosados y espumosos", "Refuerzo de recomendaciones estacionales"] },
    ],
    s8_badge: "Impacto",
    s8_title_1: "Una capa pensada para generar ",
    s8_title_highlight: "impacto real",
    s8_subtitle: "Según el objetivo activado, la configuración de la carta y el contexto del restaurante, Winerim puede ayudar a mejorar distintas métricas clave.",
    s8_metrics: [
      { title: "Facturación vino", desc: "Potencial de mejora en visibilidad, conversión y empuje de referencias estratégicas." },
      { title: "Margen medio", desc: "Priorización de vinos con mejor contribución y menor canibalización." },
      { title: "Rotación", desc: "Mejor salida de referencias lentas, sobrestock o vinos con menor visibilidad." },
      { title: "Tiempo de decisión", desc: "Carta más enfocada y útil en momentos de alto volumen o servicio rápido." },
    ],
    s8_disclaimer: "El impacto real depende del tipo de restaurante, la configuración de objetivos, el volumen de la carta y el uso activo de la plataforma. Los resultados se miden dentro de Winerim.",
    s9_title_1: "El software para vender más vino",
    s9_title_2: "con inteligencia artificial aplicada",
    s9_subtitle: "Descubre cómo la inteligencia dinámica optimiza el margen en restaurantes y transforma la experiencia de tu carta. Sin compromiso.",
    s9_cta_demo: "Solicitar demo gratuita",
    s9_cta_contact: "Contactar",
    s9b_title: "Core entiende. Inteligencia Dinámica actúa.",
    s9b_subtitle: "Dos capas complementarias que trabajan juntas para que tu carta no solo muestre vinos, sino que venda mejor.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analiza márgenes, stock y rentabilidad", "Diagnostica desequilibrios y oportunidades", "Simula escenarios antes de ejecutar", "Genera recomendaciones priorizadas"],
    s9b_id_label: "Inteligencia Dinámica",
    s9b_id_items: ["Reordena la carta según el objetivo activo", "Reacciona al contexto en tiempo real", "Prioriza referencias con mayor impacto", "Ejecuta la estrategia sin intervención manual"],
    s9b_closing: "Core pone la inteligencia. Inteligencia Dinámica pone la acción.",
    s9b_cta: "Ver Winerim Core",
    s10_title_1: "No necesitas una carta más bonita.",
    s10_title_2: "Necesitas una carta ",
    s10_title_highlight: "más inteligente.",
    s10_subtitle: "Winerim convierte la carta en una capa táctica que ayuda a vender mejor, proteger margen, rotar stock y guiar al comensal con mucha más intención.",
    s10_cta: "Quiero ver Inteligencia dinámica en una demo",
    s10_cta_contact: "Hablar con el equipo",
    s10_microcopy: "Ideal para restaurantes con cartas amplias, grupos hosteleros y proyectos que quieren profesionalizar la venta de vino con IA aplicada al negocio.",
    il_core: "Winerim Core: los 26 módulos analíticos",
    il_features: "Todas las funcionalidades",
    il_software: "Software carta de vinos",
    il_integrations: "Integraciones",
    il_groups: "Soluciones para grupos",
    il_demo: "Solicitar demo gratuita",
  },
  en: {
    seo_title: "Dynamic Intelligence for Wine Lists | AI for Restaurants | Winerim",
    seo_desc: "AI-powered wine list software that optimises your list in real time. Increase margin, improve stock rotation and sell more wine with Winerim's dynamic digital wine list.",
    seo_url: "https://winerim.wine/en/product/dynamic-intelligence",
    schema_desc: "Tactical AI layer for wine lists that adapts visibility, recommendations and priorities based on margin, stock, context and restaurant objectives.",
    schema_category: "Hospitality software",
    breadcrumb_parent: "Wine list software",
    breadcrumb_current: "Dynamic Intelligence",
    eyebrow: "New tactical AI layer",
    hero_title_1: "The wine list that adapts ",
    hero_title_highlight: "to sell better.",
    hero_subtitle: "Dynamic Intelligence is Winerim's strategic layer that adapts visibility, recommendations, rotation and commercial push based on margin, stock, weather, footfall and restaurant objectives.",
    core_bridge: "RIMs don't operate in a vacuum. They feed from the analytical layer of",
    core_bridge_cta: "See Winerim Core",
    supporting_phrase: "It doesn't just display wines. It decides what to push at every moment.",
    highlights: ["More revenue", "Better margin", "More rotation", "Less dead stock", "Better selection experience"],
    cta_demo: "I want to see a demo",
    cta_how: "See how it works",
    microcopy: "Available for progressive roll-outs and selected pilots.",
    s2_title_1: "From digital wine list to ",
    s2_title_highlight: "commercial decision system",
    s2_subtitle: "A traditional list shows wines. Winerim with Dynamic Intelligence decides how to prioritise them based on business and context.",
    s2_left_label: "Traditional digital wine list",
    s2_left_items: ["Fixed order", "Static recommendations", "No context awareness", "Same logic at all times", "No margin or rotation prioritisation"],
    s2_right_label: "Winerim with Dynamic Intelligence",
    s2_right_items: ["Prioritises with intent", "Reorders by objective", "Reacts to service and context", "Activates strategies automatically", "Balances experience, margin and stock"],
    s2_closing: "\"Winerim doesn't just show wines. ",
    s2_closing_highlight: "It decides when to display, simplify, push or rotate",
    s3_badge: "How it works",
    s3_title_1: "A decision system in ",
    s3_title_highlight: "4 layers",
    s3_subtitle: "Each layer can act independently, but the real value comes when they work together.",
    s3_layers: [
      { num: "01", title: "Objectives", desc: "Define what the restaurant wants to achieve: more revenue, better margin, faster rotation, a living list or a premium experience." },
      { num: "02", title: "Rotation profiles", desc: "Select which wines should receive more attention based on margin, stock, velocity, prime window, season, local origin or price." },
      { num: "03", title: "Structural modules", desc: "Determine where strategies are applied within the list: recommended, new arrivals, selection, pairings, top positions or post-filter results." },
      { num: "04", title: "RIM™ modules", desc: "Decide when and why to act based on weather, footfall, sales, stock, calendar or real behaviour." },
    ],
    s3_closing: "The result is a list that adapts on its own to sell better without losing coherence.",
    s4_badge: "Objectives",
    s4_title_1: "Choose the objective. ",
    s4_title_highlight: "Winerim activates the strategy.",
    s4_subtitle: "Each objective automatically combines RIM™ modules, rotation profiles and list zones to steer the business in the right direction.",
    s4_objectives: [
      { title: "Increase revenue", desc: "Pushes profitable references and improves guided selling at key moments." },
      { title: "Raise average ticket", desc: "Prioritises premium wines, prime windows and upselling opportunities." },
      { title: "Maximise margin", desc: "Reorders and highlights references with the highest business contribution." },
      { title: "Boost rotation", desc: "Moves slow sellers, overstock or references at risk of becoming dead stock." },
      { title: "Clear the cellar", desc: "Activates specific actions to move last units and immobilised stock." },
      { title: "Living / dynamic list", desc: "Keeps the list evolving with rhythm, balance and a sense of continuous discovery." },
    ],
    s4_activates: "Activates",
    s5_badge: "RIM™ Modules",
    s5_title_1: "The modules that make ",
    s5_title_highlight: "the list react",
    s5_subtitle: "Each RIM™ follows a different logic. Together they turn the list into a tactical system.",
    s5_rims: [
      { desc: "The brain that orchestrates priorities, resolves conflicts and recalculates the best combination of actions.", result: "Intelligent orchestration" },
      { desc: "Pushes references with the best economic contribution without breaking the list's commercial logic.", result: "More margin per service" },
      { desc: "Detects overstock, slow movement or immobilisation risk and activates strategies to move it.", result: "Less dead stock" },
      { desc: "Simplifies the list and prioritises the most profitable references during peak times or fast service.", result: "Less decision time" },
      { desc: "Adapts wine visibility to real weather conditions to improve conversion and contextual fit.", result: "Better contextual affinity" },
      { desc: "Spotlights wines in their optimal drinking window and helps capitalise on their prime moment.", result: "Better prime utilisation" },
    ],
    s6_badge: "Priority",
    s6_title_1: "Not all modules carry the ",
    s6_title_highlight: "same weight",
    s6_subtitle: "When multiple modules can act simultaneously, Winerim resolves priorities to maintain commercial coherence and real utility.",
    s6_levels: [{ label: "Business protection" }, { label: "Context" }, { label: "List strategy" }, { label: "Orchestration" }],
    s6_level_label: "Level",
    s6_closing: "When multiple modules can act simultaneously, Winerim resolves priorities so the list remains coherent and useful for the business.",
    s7_badge: "Transparency",
    s7_title_1: "Every action has a ",
    s7_title_highlight: "visible reason",
    s7_subtitle: "Winerim doesn't just act. It also explains why.",
    s7_detected: "Detected",
    s7_action_applied: "Action applied",
    s7_logs: [
      { timestamp: "Today · 13:42 · Lunch service", reasons: ["High occupancy detected (87%)", "Decision time above average (+40%)", "Several profitable references with sufficient stock"], actions: ["Visible options simplified", "Top positions boosted for higher-margin wines", "Lower visibility for low-ROI by-the-glass wines"] },
      { timestamp: "Today · 09:15 · Inventory review", reasons: ["Excess stock in 4 references (>30 days without movement)", "Rotation below expected threshold in young reds"], actions: ["Entry into New Arrivals section", "Additional visibility in type-based searches", "By-the-glass strategy activated"] },
      { timestamp: "Today · 08:00 · Weather forecast", reasons: ["Temperature increase forecast (+8 °C vs yesterday)", "Higher affinity for fresh styles at this moment"], actions: ["Whites, rosés and sparkling moved up", "Seasonal recommendations reinforced"] },
    ],
    s8_badge: "Impact",
    s8_title_1: "A layer designed to generate ",
    s8_title_highlight: "real impact",
    s8_subtitle: "Depending on the active objective, list configuration and restaurant context, Winerim can help improve key metrics.",
    s8_metrics: [
      { title: "Wine revenue", desc: "Improvement potential through visibility, conversion and strategic reference pushing." },
      { title: "Average margin", desc: "Prioritisation of wines with the best contribution and least cannibalisation." },
      { title: "Rotation", desc: "Better movement of slow sellers, overstock or low-visibility wines." },
      { title: "Decision time", desc: "A more focused and useful list during high-volume moments or fast service." },
    ],
    s8_disclaimer: "Actual impact depends on restaurant type, objective configuration, list size and active platform usage. Results are measured within Winerim.",
    s9_title_1: "The software to sell more wine",
    s9_title_2: "with applied artificial intelligence",
    s9_subtitle: "Discover how Dynamic Intelligence optimises margin in restaurants and transforms your wine list experience. No commitment.",
    s9_cta_demo: "Request free demo",
    s9_cta_contact: "Contact us",
    s9b_title: "Core understands. Dynamic Intelligence acts.",
    s9b_subtitle: "Two complementary layers that work together so your list doesn't just display wines — it sells better.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analyses margins, stock and profitability", "Diagnoses imbalances and opportunities", "Simulates scenarios before execution", "Generates prioritised recommendations"],
    s9b_id_label: "Dynamic Intelligence",
    s9b_id_items: ["Reorders the list based on the active objective", "Reacts to context in real time", "Prioritises references with the greatest impact", "Executes strategy without manual intervention"],
    s9b_closing: "Core provides the intelligence. Dynamic Intelligence provides the action.",
    s9b_cta: "See Winerim Core",
    s10_title_1: "You don't need a prettier wine list.",
    s10_title_2: "You need a ",
    s10_title_highlight: "smarter one.",
    s10_subtitle: "Winerim turns your list into a tactical layer that helps sell better, protect margin, rotate stock and guide guests with far more intent.",
    s10_cta: "I want to see Dynamic Intelligence in a demo",
    s10_cta_contact: "Talk to the team",
    s10_microcopy: "Ideal for restaurants with large wine lists, hospitality groups and projects looking to professionalise wine sales with AI applied to the business.",
    il_core: "Winerim Core: the 26 analytical modules",
    il_features: "All features",
    il_software: "Wine list software",
    il_integrations: "Integrations",
    il_groups: "Solutions for groups",
    il_demo: "Request free demo",
  },
  it: {
    seo_title: "Intelligenza Dinamica per Carte dei Vini | IA per Ristoranti | Winerim",
    seo_desc: "Software di intelligenza artificiale per ristoranti che ottimizza la carta dei vini in tempo reale.",
    seo_url: "https://winerim.wine/it/prodotto/intelligenza-dinamica",
    schema_desc: "Livello tattico di IA per carte dei vini che adatta visibilità, raccomandazioni e priorità in base a margine, stock, contesto e obiettivi del ristorante.",
    schema_category: "Software per la ristorazione",
    breadcrumb_parent: "Software carta dei vini",
    breadcrumb_current: "Intelligenza dinamica",
    eyebrow: "Nuovo livello tattico di IA",
    hero_title_1: "La carta che si adatta ",
    hero_title_highlight: "per vendere meglio.",
    hero_subtitle: "Intelligenza dinamica è il livello strategico di Winerim che adatta visibilità, raccomandazioni, rotazione e spinta commerciale in base a margine, stock, clima, affluenza e obiettivi del ristorante.",
    core_bridge: "I RIM non operano nel vuoto. Si alimentano dal livello analitico di",
    core_bridge_cta: "Vedi Winerim Core",
    supporting_phrase: "Non mostra solo vini. Decide cosa conviene spingere in ogni momento.",
    highlights: ["Più fatturato", "Più margine", "Più rotazione", "Meno stock morto", "Migliore esperienza di scelta"],
    cta_demo: "Voglio vedere una demo",
    cta_how: "Scopri come funziona",
    microcopy: "Disponibile per roll-out progressivi e progetti pilota selezionati.",
    s2_title_1: "Da carta digitale a ",
    s2_title_highlight: "sistema di decisione commerciale",
    s2_subtitle: "Una carta tradizionale mostra i vini. Winerim con Intelligenza dinamica decide come dare la priorità in base al business e al contesto.",
    s2_left_label: "Carta digitale tradizionale",
    s2_left_items: ["Ordine fisso", "Raccomandazione statica", "Nessuna reazione al contesto", "Stessa logica in ogni momento", "Nessuna priorità per margine o rotazione"],
    s2_right_label: "Winerim con Intelligenza dinamica",
    s2_right_items: ["Dà priorità con intenzione", "Riordina secondo l'obiettivo", "Reagisce al servizio e al contesto", "Attiva strategie automaticamente", "Bilancia esperienza, margine e stock"],
    s2_closing: "\"Winerim non mostra solo vini. ",
    s2_closing_highlight: "Decide quando mostrare, semplificare, spingere o ruotare",
    s3_badge: "Come funziona",
    s3_title_1: "Un sistema di decisione a ",
    s3_title_highlight: "4 livelli",
    s3_subtitle: "Ogni livello può agire autonomamente, ma il vero valore emerge quando lavorano insieme.",
    s3_layers: [
      { num: "01", title: "Obiettivi", desc: "Definiscono cosa vuole ottenere il ristorante: più fatturato, più margine, più rotazione, carta viva o esperienza premium." },
      { num: "02", title: "Profili di rotazione", desc: "Selezionano quali vini devono ricevere più attenzione in base a margine, stock, velocità di uscita, prime, stagionalità, localismo o prezzo." },
      { num: "03", title: "Moduli strutturali", desc: "Determinano dove si applicano le strategie nella carta: consigliati, novità, selezione, abbinamenti, prime posizioni o risultati dopo il filtraggio." },
      { num: "04", title: "Moduli RIM™", desc: "Decidono quando e perché agire in base a clima, affluenza, vendite, stock, calendario o comportamento reale." },
    ],
    s3_closing: "Il risultato è una carta che si adatta da sola per vendere meglio senza perdere coerenza.",
    s4_badge: "Obiettivi",
    s4_title_1: "Scegli l'obiettivo. ",
    s4_title_highlight: "Winerim attiva la strategia.",
    s4_subtitle: "Ogni obiettivo combina automaticamente moduli RIM™, profili di rotazione e zone della carta per portare il business nella direzione giusta.",
    s4_objectives: [
      { title: "Aumentare il fatturato", desc: "Spinge referenze redditizie e migliora la vendita guidata nei momenti chiave." },
      { title: "Alzare lo scontrino medio", desc: "Dà priorità a vini premium, in prime e con maggiore capacità di upselling." },
      { title: "Massimizzare il margine", desc: "Riordina e mette in evidenza referenze con il maggiore contributo al business." },
      { title: "Aumentare la rotazione", desc: "Dà sbocco a vini lenti, sovrastock o referenze a rischio di rimanere ferme." },
      { title: "Pulire la cantina", desc: "Attiva azioni specifiche per movimentare ultime unità e stock immobilizzato." },
      { title: "Carta viva / dinamica", desc: "Fa evolvere la carta con ritmo, equilibrio e sensazione di scoperta continua." },
    ],
    s4_activates: "Attiva",
    s5_badge: "Moduli RIM™",
    s5_title_1: "I moduli che fanno ",
    s5_title_highlight: "reagire la carta",
    s5_subtitle: "Ogni RIM™ risponde a una logica diversa. Insieme trasformano la carta in un sistema tattico.",
    s5_rims: [
      { desc: "Il cervello che orchestra le priorità, risolve i conflitti e ricalcola la migliore combinazione di azioni.", result: "Orchestrazione intelligente" },
      { desc: "Spinge referenze con il miglior contributo economico senza rompere la logica commerciale della carta.", result: "Più margine per servizio" },
      { desc: "Rileva sovrastock, lentezza di uscita o rischio di immobilizzazione e attiva strategie per movimentarlo.", result: "Meno stock morto" },
      { desc: "Semplifica la carta e dà priorità alle referenze più redditizie nei momenti di alta affluenza o servizio rapido.", result: "Meno tempo di decisione" },
      { desc: "Adatta la visibilità dei vini al clima reale per migliorare la conversione e l'adeguatezza al momento.", result: "Più affinità contestuale" },
      { desc: "Dà risalto ai vini nella loro finestra di consumo ottimale e aiuta a sfruttarne il momento migliore.", result: "Migliore sfruttamento del prime" },
    ],
    s6_badge: "Priorità",
    s6_title_1: "Non tutti i moduli hanno lo ",
    s6_title_highlight: "stesso peso",
    s6_subtitle: "Quando più moduli possono agire contemporaneamente, Winerim risolve le priorità per mantenere coerenza commerciale e utilità reale.",
    s6_levels: [{ label: "Protezione del business" }, { label: "Contesto" }, { label: "Strategia di carta" }, { label: "Orchestrazione" }],
    s6_level_label: "Livello",
    s6_closing: "Quando più moduli possono agire contemporaneamente, Winerim risolve le priorità affinché la carta resti coerente e utile per il business.",
    s7_badge: "Trasparenza",
    s7_title_1: "Ogni azione ha una ",
    s7_title_highlight: "ragione visibile",
    s7_subtitle: "Winerim non agisce e basta. Spiega anche perché.",
    s7_detected: "Rilevato",
    s7_action_applied: "Azione applicata",
    s7_logs: [
      { timestamp: "Oggi · 13:42 · Servizio pranzo", reasons: ["Occupazione alta rilevata (87%)", "Tempo di decisione elevato (+40% vs media)", "Diverse referenze redditizie con stock sufficiente"], actions: ["Semplificazione delle opzioni visibili", "Salita delle prime posizioni con margine più alto", "Minore visibilità per calici con basso ROI"] },
      { timestamp: "Oggi · 09:15 · Revisione inventario", reasons: ["Eccesso di stock in 4 referenze (>30 giorni senza movimento)", "Rotazione sotto la soglia attesa per rossi giovani"], actions: ["Ingresso nella sezione Novità", "Visibilità aggiuntiva nelle ricerche per tipo", "Attivazione strategia al calice"] },
      { timestamp: "Oggi · 08:00 · Previsione meteo", reasons: ["Aumento di temperatura previsto (+8 °C vs ieri)", "Maggiore affinità per stili freschi nel momento"], actions: ["Salita di bianchi, rosati e spumanti", "Rinforzo delle raccomandazioni stagionali"] },
    ],
    s8_badge: "Impatto",
    s8_title_1: "Un livello pensato per generare ",
    s8_title_highlight: "impatto reale",
    s8_subtitle: "In base all'obiettivo attivato, alla configurazione della carta e al contesto del ristorante, Winerim può aiutare a migliorare metriche chiave.",
    s8_metrics: [
      { title: "Fatturato vino", desc: "Potenziale di miglioramento in visibilità, conversione e spinta di referenze strategiche." },
      { title: "Margine medio", desc: "Priorità ai vini con miglior contributo e minor cannibalizzazione." },
      { title: "Rotazione", desc: "Migliore uscita di referenze lente, sovrastock o vini con minore visibilità." },
      { title: "Tempo di decisione", desc: "Carta più focalizzata e utile nei momenti di alto volume o servizio rapido." },
    ],
    s8_disclaimer: "L'impatto reale dipende dal tipo di ristorante, dalla configurazione degli obiettivi, dal volume della carta e dall'uso attivo della piattaforma. I risultati si misurano dentro Winerim.",
    s9_title_1: "Il software per vendere più vino",
    s9_title_2: "con intelligenza artificiale applicata",
    s9_subtitle: "Scopri come l'intelligenza dinamica ottimizza il margine nei ristoranti e trasforma l'esperienza della tua carta. Senza impegno.",
    s9_cta_demo: "Richiedi demo gratuita",
    s9_cta_contact: "Contattaci",
    s9b_title: "Core capisce. Intelligenza Dinamica agisce.",
    s9b_subtitle: "Due livelli complementari che lavorano insieme affinché la tua carta non mostri solo vini, ma venda meglio.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analizza margini, stock e redditività", "Diagnostica squilibri e opportunità", "Simula scenari prima dell'esecuzione", "Genera raccomandazioni prioritarie"],
    s9b_id_label: "Intelligenza Dinamica",
    s9b_id_items: ["Riordina la carta secondo l'obiettivo attivo", "Reagisce al contesto in tempo reale", "Dà priorità alle referenze con maggior impatto", "Esegue la strategia senza intervento manuale"],
    s9b_closing: "Core mette l'intelligenza. Intelligenza Dinamica mette l'azione.",
    s9b_cta: "Vedi Winerim Core",
    s10_title_1: "Non serve una carta più bella.",
    s10_title_2: "Serve una carta ",
    s10_title_highlight: "più intelligente.",
    s10_subtitle: "Winerim trasforma la carta in un livello tattico che aiuta a vendere meglio, proteggere il margine, ruotare lo stock e guidare il commensale con molta più intenzione.",
    s10_cta: "Voglio vedere Intelligenza dinamica in una demo",
    s10_cta_contact: "Parla con il team",
    s10_microcopy: "Ideale per ristoranti con carte ampie, gruppi di ristorazione e progetti che vogliono professionalizzare la vendita di vino con IA applicata al business.",
    il_core: "Winerim Core: i 26 moduli analitici",
    il_features: "Tutte le funzionalità",
    il_software: "Software carta dei vini",
    il_integrations: "Integrazioni",
    il_groups: "Soluzioni per gruppi",
    il_demo: "Richiedi demo gratuita",
  },
  fr: {
    seo_title: "Intelligence Dynamique pour Cartes des Vins | IA pour Restaurants | Winerim",
    seo_desc: "Logiciel d'intelligence artificielle pour restaurants qui optimise votre carte des vins en temps réel. Augmentez la marge, améliorez la rotation du stock et vendez plus de vin avec la carte digitale dynamique de Winerim.",
    seo_url: "https://winerim.wine/fr/produit/intelligence-dynamique",
    schema_desc: "Couche d'IA tactique pour cartes des vins qui adapte visibilité, recommandations et priorités en fonction de la marge, du stock, du contexte et des objectifs du restaurant.",
    schema_category: "Logiciel hôtellerie-restauration",
    breadcrumb_parent: "Logiciel carte des vins",
    breadcrumb_current: "Intelligence dynamique",
    eyebrow: "Nouvelle couche d'IA tactique",
    hero_title_1: "La carte qui s'adapte ",
    hero_title_highlight: "pour mieux vendre.",
    hero_subtitle: "L'intelligence dynamique est la couche stratégique de Winerim qui adapte visibilité, recommandations, rotation et impulsion commerciale en fonction de la marge, du stock, de la météo, de l'affluence et des objectifs du restaurant.",
    core_bridge: "Les RIM n'opèrent pas dans le vide. Ils se nourrissent de la couche analytique de",
    core_bridge_cta: "Voir Winerim Core",
    supporting_phrase: "Il ne montre pas seulement des vins. Il décide ce qu'il convient de pousser à chaque instant.",
    highlights: ["Plus de CA", "Plus de marge", "Plus de rotation", "Moins de stock mort", "Meilleure expérience de choix"],
    cta_demo: "Je veux voir une démo",
    cta_how: "Voir comment ça marche",
    microcopy: "Disponible pour les déploiements progressifs et les pilotes sélectionnés.",
    s2_title_1: "De la carte digitale au ",
    s2_title_highlight: "système de décision commerciale",
    s2_subtitle: "Une carte traditionnelle affiche des vins. Winerim avec Intelligence dynamique décide comment les prioriser selon le business et le contexte.",
    s2_left_label: "Carte digitale traditionnelle",
    s2_left_items: ["Ordre fixe", "Recommandation statique", "Aucune réaction au contexte", "Même logique à tout moment", "Pas de priorisation marge ni rotation"],
    s2_right_label: "Winerim avec Intelligence dynamique",
    s2_right_items: ["Priorise avec intention", "Réordonne selon l'objectif", "Réagit au service et au contexte", "Active des stratégies automatiquement", "Équilibre expérience, marge et stock"],
    s2_closing: "\"Winerim ne montre pas seulement des vins. ",
    s2_closing_highlight: "Il décide quand montrer, simplifier, pousser ou faire tourner",
    s3_badge: "Comment ça marche",
    s3_title_1: "Un système de décision en ",
    s3_title_highlight: "4 couches",
    s3_subtitle: "Chaque couche peut agir séparément, mais la vraie valeur apparaît lorsqu'elles travaillent ensemble.",
    s3_layers: [
      { num: "01", title: "Objectifs", desc: "Définissent ce que le restaurant veut atteindre : plus de CA, plus de marge, plus de rotation, une carte vivante ou une expérience premium." },
      { num: "02", title: "Profils de rotation", desc: "Sélectionnent quels vins doivent recevoir plus d'attention selon la marge, le stock, la vitesse de sortie, le prime, la saison, l'origine locale ou le prix." },
      { num: "03", title: "Modules structurels", desc: "Déterminent où les stratégies s'appliquent dans la carte : recommandés, nouveautés, sélection, accords, premières positions ou résultats après filtrage." },
      { num: "04", title: "Modules RIM™", desc: "Décident quand et pourquoi agir selon la météo, l'affluence, les ventes, le stock, le calendrier ou le comportement réel." },
    ],
    s3_closing: "Le résultat est une carte qui s'adapte seule pour mieux vendre sans perdre de cohérence.",
    s4_badge: "Objectifs",
    s4_title_1: "Choisissez l'objectif. ",
    s4_title_highlight: "Winerim active la stratégie.",
    s4_subtitle: "Chaque objectif combine automatiquement modules RIM™, profils de rotation et zones de la carte pour orienter le business dans la bonne direction.",
    s4_objectives: [
      { title: "Augmenter le CA", desc: "Pousse les références rentables et améliore la vente guidée aux moments clés." },
      { title: "Augmenter le ticket moyen", desc: "Priorise les vins premium, en prime et avec un meilleur potentiel d'upselling." },
      { title: "Maximiser la marge", desc: "Réordonne et met en avant les références avec la meilleure contribution au business." },
      { title: "Augmenter la rotation", desc: "Facilite la sortie des vins lents, du surstock ou des références risquant de rester immobiles." },
      { title: "Nettoyer la cave", desc: "Active des actions spécifiques pour écouler les dernières unités et le stock immobilisé." },
      { title: "Carte vivante / dynamique", desc: "Fait évoluer la carte avec rythme, équilibre et une sensation de découverte continue." },
    ],
    s4_activates: "Active",
    s5_badge: "Modules RIM™",
    s5_title_1: "Les modules qui font ",
    s5_title_highlight: "réagir la carte",
    s5_subtitle: "Chaque RIM™ répond à une logique différente. Ensemble, ils transforment la carte en un système tactique.",
    s5_rims: [
      { desc: "Le cerveau qui orchestre les priorités, résout les conflits et recalcule la meilleure combinaison d'actions.", result: "Orchestration intelligente" },
      { desc: "Pousse les références avec la meilleure contribution économique sans rompre la logique commerciale de la carte.", result: "Plus de marge par service" },
      { desc: "Détecte le surstock, la lenteur de sortie ou le risque d'immobilisation et active des stratégies pour l'écouler.", result: "Moins de stock mort" },
      { desc: "Simplifie la carte et priorise les références les plus rentables en période de forte affluence ou de service rapide.", result: "Moins de temps de décision" },
      { desc: "Adapte la visibilité des vins aux conditions météo réelles pour améliorer la conversion et l'adéquation au moment.", result: "Plus d'affinité contextuelle" },
      { desc: "Met en lumière les vins dans leur fenêtre de consommation optimale et aide à capitaliser sur leur moment idéal.", result: "Meilleur exploitation du prime" },
    ],
    s6_badge: "Priorité",
    s6_title_1: "Tous les modules n'ont pas le ",
    s6_title_highlight: "même poids",
    s6_subtitle: "Lorsque plusieurs modules peuvent agir simultanément, Winerim résout les priorités pour maintenir la cohérence commerciale et l'utilité réelle.",
    s6_levels: [{ label: "Protection du business" }, { label: "Contexte" }, { label: "Stratégie de carte" }, { label: "Orchestration" }],
    s6_level_label: "Niveau",
    s6_closing: "Lorsque plusieurs modules peuvent agir simultanément, Winerim résout les priorités pour que la carte reste cohérente et utile pour le business.",
    s7_badge: "Transparence",
    s7_title_1: "Chaque action a une ",
    s7_title_highlight: "raison visible",
    s7_subtitle: "Winerim n'agit pas seulement. Il explique aussi pourquoi.",
    s7_detected: "Détecté",
    s7_action_applied: "Action appliquée",
    s7_logs: [
      { timestamp: "Aujourd'hui · 13:42 · Service du midi", reasons: ["Occupation élevée détectée (87%)", "Temps de décision élevé (+40% vs moyenne)", "Plusieurs références rentables avec stock suffisant"], actions: ["Simplification des options visibles", "Montée des premières positions à marge plus élevée", "Moindre visibilité des verres à faible ROI"] },
      { timestamp: "Aujourd'hui · 09:15 · Revue d'inventaire", reasons: ["Excès de stock sur 4 références (>30 jours sans mouvement)", "Rotation en dessous du seuil attendu pour les rouges jeunes"], actions: ["Entrée dans la section Nouveautés", "Visibilité supplémentaire dans les recherches par type", "Activation de la stratégie au verre"] },
      { timestamp: "Aujourd'hui · 08:00 · Prévisions météo", reasons: ["Hausse de température prévue (+8 °C vs hier)", "Plus grande affinité pour les styles frais en ce moment"], actions: ["Montée des blancs, rosés et effervescents", "Renforcement des recommandations saisonnières"] },
    ],
    s8_badge: "Impact",
    s8_title_1: "Une couche conçue pour générer un ",
    s8_title_highlight: "impact réel",
    s8_subtitle: "Selon l'objectif activé, la configuration de la carte et le contexte du restaurant, Winerim peut aider à améliorer des métriques clés.",
    s8_metrics: [
      { title: "CA vin", desc: "Potentiel d'amélioration en visibilité, conversion et impulsion de références stratégiques." },
      { title: "Marge moyenne", desc: "Priorisation des vins avec la meilleure contribution et la moindre cannibalisation." },
      { title: "Rotation", desc: "Meilleure sortie des références lentes, du surstock ou des vins à faible visibilité." },
      { title: "Temps de décision", desc: "Carte plus ciblée et utile en période de fort volume ou de service rapide." },
    ],
    s8_disclaimer: "L'impact réel dépend du type de restaurant, de la configuration des objectifs, du volume de la carte et de l'utilisation active de la plateforme. Les résultats se mesurent dans Winerim.",
    s9_title_1: "Le logiciel pour vendre plus de vin",
    s9_title_2: "avec l'intelligence artificielle appliquée",
    s9_subtitle: "Découvrez comment l'intelligence dynamique optimise la marge en restaurant et transforme l'expérience de votre carte. Sans engagement.",
    s9_cta_demo: "Demander une démo gratuite",
    s9_cta_contact: "Nous contacter",
    s9b_title: "Core comprend. Intelligence Dynamique agit.",
    s9b_subtitle: "Deux couches complémentaires qui travaillent ensemble pour que votre carte ne se contente pas d'afficher des vins, mais vende mieux.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analyse marges, stock et rentabilité", "Diagnostique déséquilibres et opportunités", "Simule des scénarios avant exécution", "Génère des recommandations priorisées"],
    s9b_id_label: "Intelligence Dynamique",
    s9b_id_items: ["Réordonne la carte selon l'objectif actif", "Réagit au contexte en temps réel", "Priorise les références à plus fort impact", "Exécute la stratégie sans intervention manuelle"],
    s9b_closing: "Core apporte l'intelligence. Intelligence Dynamique apporte l'action.",
    s9b_cta: "Voir Winerim Core",
    s10_title_1: "Vous n'avez pas besoin d'une carte plus belle.",
    s10_title_2: "Vous avez besoin d'une carte ",
    s10_title_highlight: "plus intelligente.",
    s10_subtitle: "Winerim transforme la carte en une couche tactique qui aide à mieux vendre, protéger la marge, faire tourner le stock et guider le convive avec beaucoup plus d'intention.",
    s10_cta: "Je veux voir l'Intelligence dynamique en démo",
    s10_cta_contact: "Parler à l'équipe",
    s10_microcopy: "Idéal pour les restaurants avec de grandes cartes, les groupes hôteliers et les projets qui veulent professionnaliser la vente de vin avec une IA appliquée au business.",
    il_core: "Winerim Core : les 26 modules analytiques",
    il_features: "Toutes les fonctionnalités",
    il_software: "Logiciel carte des vins",
    il_integrations: "Intégrations",
    il_groups: "Solutions pour groupes",
    il_demo: "Demander une démo gratuite",
  },
  de: {
    seo_title: "Dynamische Intelligenz für Weinkarten | KI für Restaurants | Winerim",
    seo_desc: "KI-Software für Restaurants, die Ihre Weinkarte in Echtzeit optimiert. Höhere Marge, bessere Lagerrotation und mehr Weinumsatz mit der dynamischen digitalen Karte von Winerim.",
    seo_url: "https://winerim.wine/de/produkt/dynamische-intelligenz",
    schema_desc: "Taktische KI-Schicht für Weinkarten, die Sichtbarkeit, Empfehlungen und Prioritäten anhand von Marge, Bestand, Kontext und Zielen des Restaurants anpasst.",
    schema_category: "Software für Gastronomie",
    breadcrumb_parent: "Software für Weinkarten",
    breadcrumb_current: "Dynamische Intelligenz",
    eyebrow: "Neue Schicht taktischer KI",
    hero_title_1: "Die Karte, die sich anpasst, ",
    hero_title_highlight: "um besser zu verkaufen.",
    hero_subtitle: "Dynamische Intelligenz ist die strategische Schicht von Winerim, die Sichtbarkeit, Empfehlungen, Rotation und kommerziellen Schub nach Marge, Bestand, Wetter, Gästeaufkommen und den Zielen des Restaurants anpasst.",
    core_bridge: "Die RIMs arbeiten nicht im Leeren. Sie werden von der Analyseschicht gespeist:",
    core_bridge_cta: "Winerim Core ansehen",
    supporting_phrase: "Zeigt nicht nur Weine an. Entscheidet, welcher Wein in welchem Moment gepusht werden soll.",
    highlights: ["Mehr Umsatz", "Mehr Marge", "Mehr Rotation", "Weniger toter Bestand", "Bessere Auswahl­erfahrung"],
    cta_demo: "Demo ansehen",
    cta_how: "So funktioniert es",
    microcopy: "Verfügbar für schrittweise Einführungen und ausgewählte Pilotprojekte.",
    s2_title_1: "Von der digitalen Karte zum ",
    s2_title_highlight: "kommerziellen Entscheidungssystem",
    s2_subtitle: "Eine traditionelle Karte zeigt Weine. Winerim mit Dynamischer Intelligenz entscheidet, wie sie nach Geschäft und Kontext priorisiert werden.",
    s2_left_label: "Traditionelle digitale Karte",
    s2_left_items: ["Feste Reihenfolge", "Statische Empfehlungen", "Keine Reaktion auf Kontext", "Dieselbe Logik zu jedem Zeitpunkt", "Keine Priorisierung nach Marge oder Rotation"],
    s2_right_label: "Winerim mit Dynamischer Intelligenz",
    s2_right_items: ["Priorisiert mit Absicht", "Sortiert nach Ziel neu", "Reagiert auf Service und Kontext", "Aktiviert Strategien automatisch", "Balanciert Erfahrung, Marge und Bestand"],
    s2_closing: "\"Winerim zeigt nicht nur Weine. ",
    s2_closing_highlight: "Es entscheidet, wann gezeigt, vereinfacht, gepusht oder rotiert werden soll",
    s3_badge: "So funktioniert es",
    s3_title_1: "Ein Entscheidungssystem in ",
    s3_title_highlight: "4 Schichten",
    s3_subtitle: "Jede Schicht kann einzeln agieren, aber der wahre Wert entsteht, wenn sie zusammenarbeiten.",
    s3_layers: [
      { num: "01", title: "Ziele", desc: "Definieren, was das Restaurant erreichen will: mehr Umsatz, mehr Marge, mehr Rotation, lebendige Karte oder Premium-Erlebnis." },
      { num: "02", title: "Rotationsprofile", desc: "Wählen aus, welche Weine mehr Aufmerksamkeit erhalten sollen – nach Marge, Bestand, Abverkaufs­geschwindigkeit, Prime, Saison, Regionalität oder Preis." },
      { num: "03", title: "Strukturmodule", desc: "Legen fest, wo die Strategien innerhalb der Karte wirken: Empfehlungen, Neuheiten, Selektion, Speisen­begleitung, erste Plätze oder Ergebnisse nach Filterung." },
      { num: "04", title: "RIM™-Module", desc: "Entscheiden wann und warum zu handeln ist – nach Wetter, Aufkommen, Verkäufen, Bestand, Kalender oder realem Verhalten." },
    ],
    s3_closing: "Das Ergebnis ist eine Karte, die sich selbst anpasst, um besser zu verkaufen, ohne ihre Kohärenz zu verlieren.",
    s4_badge: "Ziele",
    s4_title_1: "Wählen Sie das Ziel. ",
    s4_title_highlight: "Winerim aktiviert die Strategie.",
    s4_subtitle: "Jedes Ziel kombiniert automatisch RIM™-Module, Rotationsprofile und Kartenzonen, um das Geschäft in die richtige Richtung zu lenken.",
    s4_objectives: [
      { title: "Umsatz steigern", desc: "Pusht profitable Referenzen und verbessert den geführten Verkauf in Schlüssel­momenten." },
      { title: "Durchschnitts­bon erhöhen", desc: "Priorisiert Premium-Weine, Prime-Referenzen und solche mit höherem Upselling-Potenzial." },
      { title: "Marge maximieren", desc: "Ordnet und hebt Referenzen mit dem besten Beitrag zum Geschäft hervor." },
      { title: "Rotation steigern", desc: "Erleichtert den Abverkauf langsamer Weine, Überbestände oder stehender Referenzen." },
      { title: "Weinkeller bereinigen", desc: "Aktiviert spezifische Aktionen, um letzte Einheiten und gebundenen Bestand abzuverkaufen." },
      { title: "Lebendige / dynamische Karte", desc: "Entwickelt die Karte mit Rhythmus, Balance und einem Gefühl kontinuierlicher Entdeckung." },
    ],
    s4_activates: "Aktiviert",
    s5_badge: "RIM™-Module",
    s5_title_1: "Die Module, die die ",
    s5_title_highlight: "Karte reagieren lassen",
    s5_subtitle: "Jedes RIM™ folgt einer anderen Logik. Zusammen verwandeln sie die Karte in ein taktisches System.",
    s5_rims: [
      { desc: "Das Gehirn, das Prioritäten orchestriert, Konflikte löst und die beste Kombination von Aktionen neu berechnet.", result: "Intelligente Orchestrierung" },
      { desc: "Pusht Referenzen mit dem besten ökonomischen Beitrag, ohne die kommerzielle Logik der Karte zu brechen.", result: "Mehr Marge pro Service" },
      { desc: "Erkennt Überbestand, langsamen Abverkauf oder Bindungsrisiko und aktiviert Strategien zum Abverkauf.", result: "Weniger toter Bestand" },
      { desc: "Vereinfacht die Karte und priorisiert die rentabelsten Referenzen bei hohem Aufkommen oder schnellem Service.", result: "Weniger Entscheidungs­zeit" },
      { desc: "Passt die Sichtbarkeit der Weine an das reale Wetter an, um Conversion und Moment-Fit zu verbessern.", result: "Mehr kontextuelle Affinität" },
      { desc: "Hebt Weine im optimalen Konsum­fenster hervor und hilft, ihren idealen Moment zu nutzen.", result: "Bessere Prime-Ausnutzung" },
    ],
    s6_badge: "Priorität",
    s6_title_1: "Nicht alle Module haben das ",
    s6_title_highlight: "gleiche Gewicht",
    s6_subtitle: "Wenn mehrere Module gleichzeitig handeln können, löst Winerim die Prioritäten auf, um kommerzielle Kohärenz und realen Nutzen zu wahren.",
    s6_levels: [{ label: "Geschäftsschutz" }, { label: "Kontext" }, { label: "Kartenstrategie" }, { label: "Orchestrierung" }],
    s6_level_label: "Ebene",
    s6_closing: "Wenn mehrere Module gleichzeitig handeln können, löst Winerim die Prioritäten auf, damit die Karte kohärent und für das Geschäft nützlich bleibt.",
    s7_badge: "Transparenz",
    s7_title_1: "Jede Aktion hat einen ",
    s7_title_highlight: "sichtbaren Grund",
    s7_subtitle: "Winerim handelt nicht nur. Es erklärt auch warum.",
    s7_detected: "Erkannt",
    s7_action_applied: "Angewendete Aktion",
    s7_logs: [
      { timestamp: "Heute · 13:42 · Mittagsservice", reasons: ["Hohe Auslastung erkannt (87%)", "Hohe Entscheidungszeit (+40% vs. Durchschnitt)", "Mehrere profitable Referenzen mit ausreichendem Bestand"], actions: ["Vereinfachung sichtbarer Optionen", "Anhebung erster Positionen mit höherer Marge", "Geringere Sichtbarkeit von Gläsern mit niedrigem ROI"] },
      { timestamp: "Heute · 09:15 · Bestandsprüfung", reasons: ["Überbestand bei 4 Referenzen (>30 Tage ohne Bewegung)", "Rotation unter dem erwarteten Schwellenwert für junge Rotweine"], actions: ["Aufnahme in die Rubrik Neuheiten", "Zusätzliche Sichtbarkeit bei Suchen nach Typ", "Aktivierung der Glas-Strategie"] },
      { timestamp: "Heute · 08:00 · Wettervorhersage", reasons: ["Temperatur­anstieg erwartet (+8 °C vs. gestern)", "Größere Affinität zu frischen Stilen in diesem Moment"], actions: ["Anhebung von Weißweinen, Rosés und Schaumweinen", "Verstärkung saisonaler Empfehlungen"] },
    ],
    s8_badge: "Wirkung",
    s8_title_1: "Eine Schicht konzipiert, um ",
    s8_title_highlight: "echte Wirkung zu erzeugen",
    s8_subtitle: "Je nach aktiviertem Ziel, Kartenkonfiguration und Restaurant­kontext kann Winerim helfen, Schlüssel­kennzahlen zu verbessern.",
    s8_metrics: [
      { title: "Weinumsatz", desc: "Verbesserungs­potenzial bei Sichtbarkeit, Conversion und Push strategischer Referenzen." },
      { title: "Durchschnitts­marge", desc: "Priorisierung von Weinen mit dem besten Beitrag und der geringsten Kannibalisierung." },
      { title: "Rotation", desc: "Besserer Abverkauf langsamer Referenzen, Überbestände oder wenig sichtbarer Weine." },
      { title: "Entscheidungs­zeit", desc: "Fokussiertere und nützlichere Karte in Hochvolumen- oder Schnell­service­phasen." },
    ],
    s8_disclaimer: "Die reale Wirkung hängt vom Restauranttyp, der Zielkonfiguration, dem Kartenumfang und der aktiven Nutzung der Plattform ab. Ergebnisse werden in Winerim gemessen.",
    s9_title_1: "Die Software, um mehr Wein zu verkaufen",
    s9_title_2: "mit angewandter künstlicher Intelligenz",
    s9_subtitle: "Entdecken Sie, wie dynamische Intelligenz die Marge im Restaurant optimiert und das Erlebnis Ihrer Karte verwandelt. Unverbindlich.",
    s9_cta_demo: "Kostenlose Demo anfragen",
    s9_cta_contact: "Kontakt aufnehmen",
    s9b_title: "Core versteht. Dynamische Intelligenz handelt.",
    s9b_subtitle: "Zwei sich ergänzende Schichten, die zusammen­arbeiten, damit Ihre Karte nicht nur Weine zeigt, sondern besser verkauft.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analysiert Margen, Bestand und Rentabilität", "Diagnostiziert Ungleichgewichte und Chancen", "Simuliert Szenarien vor der Umsetzung", "Erstellt priorisierte Empfehlungen"],
    s9b_id_label: "Dynamische Intelligenz",
    s9b_id_items: ["Sortiert die Karte nach aktivem Ziel neu", "Reagiert in Echtzeit auf den Kontext", "Priorisiert Referenzen mit höchstem Impact", "Führt die Strategie ohne manuelles Eingreifen aus"],
    s9b_closing: "Core liefert die Intelligenz. Dynamische Intelligenz liefert die Aktion.",
    s9b_cta: "Winerim Core ansehen",
    s10_title_1: "Sie brauchen keine schönere Karte.",
    s10_title_2: "Sie brauchen eine ",
    s10_title_highlight: "intelligentere Karte.",
    s10_subtitle: "Winerim verwandelt die Karte in eine taktische Schicht, die hilft, besser zu verkaufen, die Marge zu schützen, Bestand zu drehen und den Gast mit deutlich mehr Absicht zu führen.",
    s10_cta: "Dynamische Intelligenz in der Demo ansehen",
    s10_cta_contact: "Mit dem Team sprechen",
    s10_microcopy: "Ideal für Restaurants mit großen Karten, Hotelgruppen und Projekte, die den Weinverkauf mit angewandter geschäftlicher KI professionalisieren möchten.",
    il_core: "Winerim Core: die 26 analytischen Module",
    il_features: "Alle Funktionen",
    il_software: "Software für Weinkarten",
    il_integrations: "Integrationen",
    il_groups: "Lösungen für Gruppen",
    il_demo: "Kostenlose Demo anfragen",
  },
  pt: {
    seo_title: "Inteligência Dinâmica para Cartas de Vinhos | IA para Restaurantes | Winerim",
    seo_desc: "Software de inteligência artificial para restaurantes que otimiza a sua carta de vinhos em tempo real. Aumente a margem, melhore a rotação de stock e venda mais vinho com a carta digital dinâmica da Winerim.",
    seo_url: "https://winerim.wine/pt/produto/inteligencia-dinamica",
    schema_desc: "Camada de IA tática para cartas de vinhos que adapta visibilidade, recomendações e prioridades conforme a margem, o stock, o contexto e os objetivos do restaurante.",
    schema_category: "Software para restauração",
    breadcrumb_parent: "Software carta de vinhos",
    breadcrumb_current: "Inteligência dinâmica",
    eyebrow: "Nova camada de IA tática",
    hero_title_1: "A carta que se adapta ",
    hero_title_highlight: "para vender melhor.",
    hero_subtitle: "A inteligência dinâmica é a camada estratégica da Winerim que adapta visibilidade, recomendação, rotação e impulso comercial conforme margem, stock, tempo, afluência e objetivo do restaurante.",
    core_bridge: "Os RIMs não operam no vazio. Alimentam-se da camada analítica de",
    core_bridge_cta: "Ver Winerim Core",
    supporting_phrase: "Não mostra apenas vinhos. Decide qual convém impulsionar em cada momento.",
    highlights: ["Mais faturação", "Mais margem", "Mais rotação", "Menos stock parado", "Melhor experiência de escolha"],
    cta_demo: "Quero ver uma demo",
    cta_how: "Ver como funciona",
    microcopy: "Disponível para implementações progressivas e pilotos selecionados.",
    s2_title_1: "Da carta digital ao ",
    s2_title_highlight: "sistema de decisão comercial",
    s2_subtitle: "Uma carta tradicional mostra vinhos. A Winerim com Inteligência dinâmica decide como priorizá-los conforme o negócio e o contexto.",
    s2_left_label: "Carta digital tradicional",
    s2_left_items: ["Ordem fixa", "Recomendação estática", "Sem reação ao contexto", "Mesma lógica a qualquer momento", "Sem priorização de margem nem rotação"],
    s2_right_label: "Winerim com Inteligência dinâmica",
    s2_right_items: ["Prioriza com intenção", "Reordena conforme o objetivo", "Reage ao serviço e ao contexto", "Ativa estratégias automaticamente", "Equilibra experiência, margem e stock"],
    s2_closing: "\"A Winerim não mostra apenas vinhos. ",
    s2_closing_highlight: "Decide quando convém mostrar, simplificar, impulsionar ou rodar",
    s3_badge: "Como funciona",
    s3_title_1: "Um sistema de decisão em ",
    s3_title_highlight: "4 camadas",
    s3_subtitle: "Cada camada pode atuar em separado, mas o verdadeiro valor surge quando trabalham em conjunto.",
    s3_layers: [
      { num: "01", title: "Objetivos", desc: "Definem o que o restaurante quer alcançar: mais faturação, mais margem, mais rotação, carta viva ou experiência premium." },
      { num: "02", title: "Perfis de rotação", desc: "Selecionam que vinhos devem receber mais atenção conforme margem, stock, velocidade de saída, prime, estação, localismo ou preço." },
      { num: "03", title: "Módulos estruturais", desc: "Determinam onde as estratégias se aplicam dentro da carta: recomendados, novidades, seleção, harmonizações, primeiras posições ou resultados após filtragem." },
      { num: "04", title: "Módulos RIM™", desc: "Decidem quando e porquê atuar conforme o tempo, afluência, vendas, stock, calendário ou comportamento real." },
    ],
    s3_closing: "O resultado é uma carta que se adapta sozinha para vender melhor sem perder coerência.",
    s4_badge: "Objetivos",
    s4_title_1: "Escolha o objetivo. ",
    s4_title_highlight: "A Winerim ativa a estratégia.",
    s4_subtitle: "Cada objetivo combina automaticamente módulos RIM™, perfis de rotação e zonas da carta para orientar o negócio na direção certa.",
    s4_objectives: [
      { title: "Aumentar a faturação", desc: "Impulsiona as referências rentáveis e melhora a venda orientada em momentos-chave." },
      { title: "Aumentar o ticket médio", desc: "Prioriza os vinhos premium, em prime e com maior potencial de upselling." },
      { title: "Maximizar a margem", desc: "Reordena e destaca as referências com melhor contribuição para o negócio." },
      { title: "Aumentar a rotação", desc: "Facilita a saída dos vinhos lentos, sobrestock ou referências em risco de ficarem parados." },
      { title: "Limpar a garrafeira", desc: "Ativa ações específicas para escoar as últimas unidades e o stock imobilizado." },
      { title: "Carta viva / dinâmica", desc: "Faz evoluir a carta com ritmo, equilíbrio e uma sensação de descoberta contínua." },
    ],
    s4_activates: "Ativa",
    s5_badge: "Módulos RIM™",
    s5_title_1: "Os módulos que fazem ",
    s5_title_highlight: "a carta reagir",
    s5_subtitle: "Cada RIM™ responde a uma lógica diferente. Juntos, transformam a carta num sistema tático.",
    s5_rims: [
      { desc: "O cérebro que orquestra prioridades, resolve conflitos e recalcula a melhor combinação de ações.", result: "Orquestração inteligente" },
      { desc: "Impulsiona as referências com melhor contribuição económica sem romper a lógica comercial da carta.", result: "Mais margem por serviço" },
      { desc: "Deteta sobrestock, lentidão de saída ou risco de imobilização e ativa estratégias para escoar.", result: "Menos stock parado" },
      { desc: "Simplifica a carta e prioriza as referências mais rentáveis em alta afluência ou serviço rápido.", result: "Menos tempo de decisão" },
      { desc: "Adapta a visibilidade dos vinhos às condições meteorológicas reais para melhorar conversão e adequação ao momento.", result: "Mais afinidade contextual" },
      { desc: "Destaca os vinhos na sua janela de consumo ótima e ajuda a capitalizar o seu momento ideal.", result: "Melhor aproveitamento do prime" },
    ],
    s6_badge: "Prioridade",
    s6_title_1: "Nem todos os módulos têm o ",
    s6_title_highlight: "mesmo peso",
    s6_subtitle: "Quando vários módulos podem atuar em simultâneo, a Winerim resolve as prioridades para manter a coerência comercial e a utilidade real.",
    s6_levels: [{ label: "Proteção do negócio" }, { label: "Contexto" }, { label: "Estratégia de carta" }, { label: "Orquestração" }],
    s6_level_label: "Nível",
    s6_closing: "Quando vários módulos podem atuar em simultâneo, a Winerim resolve as prioridades para que a carta continue coerente e útil para o negócio.",
    s7_badge: "Transparência",
    s7_title_1: "Cada ação tem uma ",
    s7_title_highlight: "razão visível",
    s7_subtitle: "A Winerim não atua apenas. Também explica porquê.",
    s7_detected: "Detetado",
    s7_action_applied: "Ação aplicada",
    s7_logs: [
      { timestamp: "Hoje · 13:42 · Serviço de almoço", reasons: ["Ocupação elevada detetada (87%)", "Tempo de decisão elevado (+40% vs média)", "Várias referências rentáveis com stock suficiente"], actions: ["Simplificação das opções visíveis", "Subida das primeiras posições com maior margem", "Menor visibilidade dos vinhos a copo com baixo ROI"] },
      { timestamp: "Hoje · 09:15 · Revisão de inventário", reasons: ["Excesso de stock em 4 referências (>30 dias sem movimento)", "Rotação abaixo do limiar esperado para tintos jovens"], actions: ["Entrada na secção Novidades", "Visibilidade adicional nas pesquisas por tipo", "Ativação da estratégia a copo"] },
      { timestamp: "Hoje · 08:00 · Previsão meteorológica", reasons: ["Subida de temperatura prevista (+8 °C vs ontem)", "Maior afinidade com estilos frescos neste momento"], actions: ["Subida de brancos, rosés e espumantes", "Reforço das recomendações sazonais"] },
    ],
    s8_badge: "Impacto",
    s8_title_1: "Uma camada pensada para gerar um ",
    s8_title_highlight: "impacto real",
    s8_subtitle: "Conforme o objetivo ativado, a configuração da carta e o contexto do restaurante, a Winerim pode ajudar a melhorar métricas-chave.",
    s8_metrics: [
      { title: "Faturação de vinho", desc: "Potencial de melhoria em visibilidade, conversão e impulso de referências estratégicas." },
      { title: "Margem média", desc: "Priorização dos vinhos com melhor contribuição e menor canibalização." },
      { title: "Rotação", desc: "Melhor saída de referências lentas, sobrestock ou vinhos com pouca visibilidade." },
      { title: "Tempo de decisão", desc: "Carta mais focada e útil em momentos de grande volume ou serviço rápido." },
    ],
    s8_disclaimer: "O impacto real depende do tipo de restaurante, da configuração dos objetivos, do volume da carta e da utilização ativa da plataforma. Os resultados medem-se na Winerim.",
    s9_title_1: "O software para vender mais vinho",
    s9_title_2: "com inteligência artificial aplicada",
    s9_subtitle: "Descubra como a inteligência dinâmica otimiza a margem em restaurante e transforma a experiência da sua carta. Sem compromisso.",
    s9_cta_demo: "Pedir demo gratuita",
    s9_cta_contact: "Contactar-nos",
    s9b_title: "Core percebe. Inteligência Dinâmica atua.",
    s9b_subtitle: "Duas camadas complementares que trabalham juntas para que a sua carta não se limite a mostrar vinhos, mas venda melhor.",
    s9b_core_label: "Winerim Core",
    s9b_core_items: ["Analisa margens, stock e rentabilidade", "Diagnostica desequilíbrios e oportunidades", "Simula cenários antes da execução", "Gera recomendações priorizadas"],
    s9b_id_label: "Inteligência Dinâmica",
    s9b_id_items: ["Reordena a carta conforme o objetivo ativo", "Reage ao contexto em tempo real", "Prioriza as referências de maior impacto", "Executa a estratégia sem intervenção manual"],
    s9b_closing: "Core traz a inteligência. Inteligência Dinâmica traz a ação.",
    s9b_cta: "Ver Winerim Core",
    s10_title_1: "Não precisa de uma carta mais bonita.",
    s10_title_2: "Precisa de uma carta ",
    s10_title_highlight: "mais inteligente.",
    s10_subtitle: "A Winerim transforma a carta numa camada tática que ajuda a vender melhor, proteger a margem, rodar o stock e orientar o cliente com muito mais intenção.",
    s10_cta: "Quero ver a Inteligência dinâmica em demo",
    s10_cta_contact: "Falar com a equipa",
    s10_microcopy: "Ideal para restaurantes com cartas grandes, grupos hoteleiros e projetos que querem profissionalizar a venda de vinho com IA aplicada ao negócio.",
    il_core: "Winerim Core: os 26 módulos analíticos",
    il_features: "Todas as funcionalidades",
    il_software: "Software carta de vinhos",
    il_integrations: "Integrações",
    il_groups: "Soluções para grupos",
    il_demo: "Pedir demo gratuita",
  },
};

/* ── Static visual config (not translated — brand names & colors) ── */
const objectiveVisuals = [
  { icon: DollarSign, modules: ["FocusRIM™", "MarginRIM™", "SmartRIM™"], gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent", iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20", borderHover: "hover:border-emerald-500/30" },
  { icon: TrendingUp, modules: ["PrimeRIM™", "MarginRIM™", "SmartRIM™"], gradient: "from-amber-500/20 via-amber-500/5 to-transparent", iconColor: "text-amber-400", iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20", borderHover: "hover:border-amber-500/30" },
  { icon: Target, modules: ["MarginRIM™", "FocusRIM™", "SmartRIM™"], gradient: "from-wine/20 via-wine/5 to-transparent", iconColor: "text-wine", iconBg: "bg-wine/10 group-hover:bg-wine/20", borderHover: "hover:border-wine/30" },
  { icon: RefreshCw, modules: ["StockRIM™", "ClimateRIM™", "CleanRIM™"], gradient: "from-blue-500/20 via-blue-500/5 to-transparent", iconColor: "text-blue-400", iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20", borderHover: "hover:border-blue-500/30" },
  { icon: Activity, modules: ["CleanRIM™", "StockRIM™", "SmartRIM™"], gradient: "from-rose-500/20 via-rose-500/5 to-transparent", iconColor: "text-rose-400", iconBg: "bg-rose-500/10 group-hover:bg-rose-500/20", borderHover: "hover:border-rose-500/30" },
  { icon: Zap, modules: ["MixRIM™", "CalendarRIM™", "SmartRIM™"], gradient: "from-violet-500/20 via-violet-500/5 to-transparent", iconColor: "text-violet-400", iconBg: "bg-violet-500/10 group-hover:bg-violet-500/20", borderHover: "hover:border-violet-500/30" },
];

const rimVisuals = [
  { name: "SmartRIM™", icon: Brain, color: "from-violet-500/20 to-violet-500/5", iconBg: "bg-violet-500/12", iconColor: "text-violet-400", borderColor: "group-hover:border-violet-500/30", featured: true },
  { name: "MarginRIM™", icon: TrendingUp, color: "from-emerald-500/20 to-emerald-500/5", iconBg: "bg-emerald-500/12", iconColor: "text-emerald-400", borderColor: "group-hover:border-emerald-500/30", featured: true },
  { name: "StockRIM™", icon: Activity, color: "from-amber-500/20 to-amber-500/5", iconBg: "bg-amber-500/12", iconColor: "text-amber-400", borderColor: "group-hover:border-amber-500/30" },
  { name: "FocusRIM™", icon: Target, color: "from-blue-500/20 to-blue-500/5", iconBg: "bg-blue-500/12", iconColor: "text-blue-400", borderColor: "group-hover:border-blue-500/30", featured: true },
  { name: "ClimateRIM™", icon: Eye, color: "from-cyan-500/20 to-cyan-500/5", iconBg: "bg-cyan-500/12", iconColor: "text-cyan-400", borderColor: "group-hover:border-cyan-500/30" },
  { name: "PrimeRIM™", icon: Zap, color: "from-wine/20 to-wine/5", iconBg: "bg-wine/12", iconColor: "text-wine", borderColor: "group-hover:border-wine/30" },
];

const layerIcons = [Target, RefreshCw, Layers, Brain];
const layerVisuals = [
  { color: "from-amber-500/15 to-amber-600/5", iconBg: "bg-amber-500/10 group-hover:bg-amber-500/20", iconColor: "text-amber-500" },
  { color: "from-emerald-500/15 to-emerald-600/5", iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20", iconColor: "text-emerald-500" },
  { color: "from-blue-500/15 to-blue-600/5", iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20", iconColor: "text-blue-500" },
  { color: "from-wine/15 to-wine/5", iconBg: "bg-wine/10 group-hover:bg-wine/20", iconColor: "text-wine" },
];

const priorityTierVisuals = [
  { modules: ["MarginRIM™", "StockRIM™", "CleanRIM™"], width: "max-w-full", bg: "bg-wine/8 border-wine/20", levelColor: "text-wine", barColor: "bg-wine/60" },
  { modules: ["FocusRIM™", "ClimateRIM™", "CalendarRIM™"], width: "max-w-[90%]", bg: "bg-amber-500/6 border-amber-500/15", levelColor: "text-amber-400", barColor: "bg-amber-500/50" },
  { modules: ["PrimeRIM™", "MixRIM™", "LocalRIM™"], width: "max-w-[78%]", bg: "bg-blue-500/6 border-blue-500/15", levelColor: "text-blue-400", barColor: "bg-blue-500/50" },
  { modules: ["SmartRIM™", "ClientRIM™"], width: "max-w-[64%]", bg: "bg-violet-500/6 border-violet-500/15", levelColor: "text-violet-400", barColor: "bg-violet-500/50" },
];

const logVisuals = [
  { module: "FocusRIM™", moduleColor: "text-blue-400", moduleBg: "bg-blue-500/10", moduleBorder: "border-blue-500/20", accentBar: "bg-blue-500/60" },
  { module: "StockRIM™", moduleColor: "text-amber-400", moduleBg: "bg-amber-500/10", moduleBorder: "border-amber-500/20", accentBar: "bg-amber-500/60" },
  { module: "ClimateRIM™", moduleColor: "text-cyan-400", moduleBg: "bg-cyan-500/10", moduleBorder: "border-cyan-500/20", accentBar: "bg-cyan-500/60" },
];

const impactVisuals = [
  { icon: DollarSign, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10", borderHover: "hover:border-emerald-500/25", gradient: "from-emerald-500/15 to-transparent" },
  { icon: TrendingUp, iconColor: "text-wine", iconBg: "bg-wine/10", borderHover: "hover:border-wine/25", gradient: "from-wine/15 to-transparent" },
  { icon: RefreshCw, iconColor: "text-amber-400", iconBg: "bg-amber-500/10", borderHover: "hover:border-amber-500/25", gradient: "from-amber-500/15 to-transparent" },
  { icon: Gauge, iconColor: "text-blue-400", iconBg: "bg-blue-500/10", borderHover: "hover:border-blue-500/25", gradient: "from-blue-500/15 to-transparent" },
];

const highlightIcons = [DollarSign, TrendingUp, RefreshCw, Activity, Users];

/* ── JSON-LD Schema ── */
const JsonLdSchema = ({ t: tx }: { t: typeof i18n.es }) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Winerim Dynamic Intelligence",
      applicationCategory: "BusinessApplication",
      description: tx.schema_desc,
      operatingSystem: "Web",
      url: tx.seo_url,
      offers: { "@type": "Offer", category: tx.schema_category },
    };
    const id = "jsonld-inteligencia-dinamica";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { el?.remove(); };
  }, [tx]);
  return null;
};

const InteligenciaDinamica = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const tx = getI18n(i18n, lang);

  return (
    <>
      <SEOHead
        title={tx.seo_title}
        description={tx.seo_desc}
        url={tx.seo_url}
        hreflang={allLangPaths("/producto/inteligencia-dinamica")}
      />
      <JsonLdSchema t={tx} />
      <Navbar />
      <main className="min-h-screen bg-background overflow-hidden">

        {/* ════════════════════════════════════════════════
            1. HERO
        ════════════════════════════════════════════════ */}
        <section className="relative pt-32 md:pt-44 pb-24 md:pb-40 px-6 overflow-hidden">
          {/* ── Layered background system ── */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-wine/10 rounded-full blur-[150px]" />
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-wine/6 rounded-full blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/25 to-transparent" />
          </div>

          {/* ── Intelligence Engine Visual ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-wine/[0.06]" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-wine/[0.08]" animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-wine/[0.10]" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />
            {[
              { size: "w-2 h-2", orbit: "w-[600px] h-[600px] md:w-[800px] md:h-[800px]", duration: 90, startAngle: 45 },
              { size: "w-1.5 h-1.5", orbit: "w-[600px] h-[600px] md:w-[800px] md:h-[800px]", duration: 90, startAngle: 200 },
              { size: "w-2.5 h-2.5", orbit: "w-[450px] h-[450px] md:w-[600px] md:h-[600px]", duration: 70, startAngle: 120 },
              { size: "w-1.5 h-1.5", orbit: "w-[300px] h-[300px] md:w-[400px] md:h-[400px]", duration: 50, startAngle: 300 },
            ].map((node, idx) => (
              <motion.div key={idx} className={`absolute top-1/2 left-1/2 ${node.orbit}`} style={{ marginLeft: "-50%", marginTop: "-50%", transformOrigin: "center" }} animate={{ rotate: idx % 2 === 0 ? 360 : -360 }} transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}>
                <div className={`absolute ${node.size} rounded-full bg-wine/60 shadow-[0_0_8px_hsl(var(--wine)/0.4)]`} style={{ top: `${50 + 50 * Math.sin((node.startAngle * Math.PI) / 180)}%`, left: `${50 + 50 * Math.cos((node.startAngle * Math.PI) / 180)}%` }} />
              </motion.div>
            ))}
          </div>

          {/* ── Content ── */}
          <div className="relative max-w-5xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <Breadcrumbs items={[
                  { label: tx.breadcrumb_parent, href: localePath("/software-carta-de-vinos") },
                  { label: tx.breadcrumb_current },
                ]} />
              </motion.div>

              <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-wine/15 bg-wine/5 backdrop-blur-sm">
                  <span className="w-1 h-1 rounded-full bg-wine/80" />
                  <span className="text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase text-wine/70">{tx.eyebrow}</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="font-heading text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-foreground leading-[1.08] mb-8">
                {tx.hero_title_1}<span className="text-gradient-wine">{tx.hero_title_highlight}</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-center text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
                {tx.hero_subtitle}
              </motion.p>

              <motion.div variants={fadeUp} custom={2} className="max-w-3xl mx-auto mb-10">
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center px-6 py-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground text-center sm:text-left leading-relaxed">
                    {tx.core_bridge}{" "}
                    <Link to={localePath("/producto/winerim-core")} className="text-wine hover:text-wine-light font-semibold underline underline-offset-4 transition-colors">Winerim Core</Link>
                    {lang === "es" ? ", donde Winerim analiza márgenes, stock, pricing, previsión y estructura de carta en profundidad." :
                     lang === "en" ? ", where Winerim analyses margins, stock, pricing, forecasting and list structure in depth." :
                     lang === "it" ? ", dove Winerim analizza margini, stock, pricing, previsioni e struttura della carta in profondità." :
                     ", où Winerim analyse marges, stock, pricing, prévisions et structure de carte en profondeur."}
                  </p>
                  <Link to={localePath("/producto/winerim-core")} className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-wine hover:text-wine-light whitespace-nowrap transition-colors shrink-0">
                    {tx.core_bridge_cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} custom={3} className="text-center text-sm md:text-base text-wine/70 font-medium max-w-2xl mx-auto mb-14 italic">
                {tx.supporting_phrase}
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
                {tx.highlights.map((label, idx) => (
                  <span key={label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card/60 backdrop-blur-sm text-sm text-foreground/90 font-medium">
                    {(() => { const Icon = highlightIcons[idx]; return <Icon size={15} className="text-wine shrink-0" />; })()}
                    {label}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link to={localePath("/demo")} onClick={() => trackAction("cta_click", "product_id", "hero_id_primary")} className="inline-flex items-center justify-center gap-2.5 bg-gradient-wine text-primary-foreground px-9 py-4.5 rounded-lg text-sm font-bold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-xl hover:shadow-wine/25">
                  {tx.cta_demo} <ArrowRight size={16} />
                </Link>
                <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-muted/50 transition-all">
                  {tx.cta_how} <ChevronRight size={16} className="opacity-60" />
                </a>
              </motion.div>

              <motion.p variants={fadeUp} custom={5} className="text-center text-xs text-muted-foreground/50 tracking-wide">
                {tx.microcopy}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            2. CAMBIO DE PARADIGMA — COMPARATIVA
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background pointer-events-none" />
          <div className="relative max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {tx.s2_title_1}<span className="text-gradient-wine">{tx.s2_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-5">{tx.s2_subtitle}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-card/40">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Wine size={16} className="text-muted-foreground" /></div>
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{tx.s2_left_label}</h3>
                  </div>
                  <ul className="space-y-5">
                    {tx.s2_left_items.map((item) => (
                      <li key={item} className="flex items-start gap-3.5">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-muted-foreground/25 shrink-0" />
                        <span className="text-muted-foreground/70 text-[15px] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative p-8 md:p-10 rounded-2xl border border-wine/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-wine/6 via-wine/3 to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-lg bg-wine/15 flex items-center justify-center"><Brain size={16} className="text-wine" /></div>
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-wine">{tx.s2_right_label}</h3>
                    </div>
                    <ul className="space-y-5">
                      {tx.s2_right_items.map((item) => (
                        <li key={item} className="flex items-start gap-3.5">
                          <CheckCircle size={16} className="mt-0.5 text-wine shrink-0" />
                          <span className="text-foreground text-[15px] leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto">
                <p className="font-heading text-xl md:text-2xl text-foreground/90 leading-snug italic">
                  {tx.s2_closing}{" "}
                  <span className="text-gradient-wine not-italic font-semibold">{tx.s2_closing_highlight}</span>
                  {" "}{lang === "es" ? "cada referencia.\"" : lang === "en" ? "each reference.\"" : lang === "it" ? "ogni referenza.\"" : "chaque référence.\""}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            3. CÓMO FUNCIONA — 4 CAPAS
        ════════════════════════════════════════════════ */}
        <section id="como-funciona" className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-3 py-1">{tx.s3_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  {tx.s3_title_1}<span className="text-gradient-wine">{tx.s3_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tx.s3_subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="relative">
              {tx.s3_layers.map((layer, i, arr) => {
                const vis = layerVisuals[i];
                const Icon = layerIcons[i];
                return (
                  <ScrollReveal key={layer.num}>
                    <div className="relative">
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                        <div className="hidden md:flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-2xl ${vis.iconBg} flex items-center justify-center transition-colors duration-300 border border-border`}>
                            <Icon className={`w-7 h-7 ${vis.iconColor}`} />
                          </div>
                          {i < arr.length - 1 && <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-border to-transparent mt-4" />}
                        </div>
                        <div className={`relative p-7 md:p-9 rounded-2xl border border-border bg-card hover:border-wine/20 transition-all duration-500 ${i < arr.length - 1 ? "mb-6" : ""}`}>
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vis.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                          <div className="relative">
                            <div className={`md:hidden w-12 h-12 rounded-xl ${vis.iconBg} flex items-center justify-center mb-5 transition-colors`}>
                              <Icon className={`w-6 h-6 ${vis.iconColor}`} />
                            </div>
                            <div className="flex items-baseline gap-4 mb-3">
                              <span className="text-wine/25 font-heading text-4xl font-bold leading-none">{layer.num}</span>
                              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">{layer.title}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-[15px] md:max-w-xl">{layer.desc}</p>
                          </div>
                          {i < arr.length - 1 && <div className="hidden md:block absolute -bottom-6 left-12 z-10"><ChevronRight size={18} className="text-wine/30 rotate-90" /></div>}
                        </div>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal>
              <div className="mt-14 md:mt-20 text-center">
                <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl border border-wine/15 bg-wine/5 backdrop-blur-sm">
                  <Zap size={20} className="text-wine shrink-0" />
                  <p className="text-foreground font-medium text-[15px] md:text-base leading-relaxed text-left">{tx.s3_closing}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            4. OBJETIVOS
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-wine/6 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">{tx.s4_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  {tx.s4_title_1}<span className="text-gradient-wine">{tx.s4_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{tx.s4_subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {tx.s4_objectives.map((obj, i) => {
                const vis = objectiveVisuals[i];
                return (
                  <ScrollReveal key={obj.title}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`group relative h-full p-7 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm ${vis.borderHover} transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden`}>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vis.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                      <div className="relative flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-xl ${vis.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                          <vis.icon className={`w-6 h-6 ${vis.iconColor} transition-all duration-500`} />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3">{obj.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{obj.desc}</p>
                        <div className="pt-4 border-t border-border/40 group-hover:border-border/60 transition-colors duration-500">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/40 font-semibold mb-2.5">{tx.s4_activates}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {vis.modules.map((mod) => (
                              <span key={mod} className="inline-flex items-center px-2.5 py-1 rounded-md bg-wine/6 border border-wine/10 text-[11px] font-mono font-medium text-wine/70 tracking-wide group-hover:bg-wine/10 group-hover:border-wine/20 group-hover:text-wine/90 transition-all duration-500">{mod}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            5. MÓDULOS RIM™
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">{tx.s5_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  {tx.s5_title_1}<span className="text-gradient-wine">{tx.s5_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{tx.s5_subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {rimVisuals.map((rim, i) => {
                const txt = tx.s5_rims[i];
                return (
                  <ScrollReveal key={rim.name}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`group relative h-full p-7 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm ${rim.borderColor} transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden ${rim.featured ? "ring-1 ring-wine/10" : ""}`}>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${rim.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                      <div className="relative flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-xl ${rim.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                          <rim.icon className={`w-6 h-6 ${rim.iconColor}`} />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-heading text-lg font-bold text-foreground font-mono tracking-wide">{rim.name}</h3>
                          {rim.featured && <span className="w-1.5 h-1.5 rounded-full bg-wine/60 animate-pulse" />}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{txt.desc}</p>
                        <div className="pt-4 border-t border-border/40">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                            <CheckCircle size={12} className={rim.iconColor} /> {txt.result}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            6. PRIORIDAD
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background pointer-events-none" />
          <div className="relative max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-4 py-1.5">{tx.s6_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  {tx.s6_title_1}<span className="text-gradient-wine">{tx.s6_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tx.s6_subtitle}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-3">
                {priorityTierVisuals.map((tier, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.1, duration: 0.5 }} className={`${tier.width} mx-auto`}>
                    <div className={`relative flex items-center gap-5 md:gap-6 px-6 md:px-8 py-5 md:py-6 rounded-xl border ${tier.bg} backdrop-blur-sm overflow-hidden`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${tier.barColor} rounded-l-xl`} />
                      <div className="shrink-0 text-center">
                        <span className={`block text-[10px] uppercase tracking-[0.2em] font-semibold ${tier.levelColor}`}>{tx.s6_level_label}</span>
                        <span className={`font-heading text-2xl font-bold ${tier.levelColor}`}>{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">{tx.s6_levels[i].label}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {tier.modules.map((mod) => (
                            <span key={mod} className="inline-flex items-center px-2 py-0.5 rounded bg-background/60 text-[11px] font-mono font-medium text-muted-foreground tracking-wide">{mod}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-center text-muted-foreground text-sm md:text-base leading-relaxed mt-12 max-w-2xl mx-auto">{tx.s6_closing}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            7. EXPLICABILIDAD
        ════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-secondary text-secondary-foreground border-border mb-6 text-xs tracking-widest uppercase px-4 py-1.5">{tx.s7_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
                  {tx.s7_title_1}<span className="text-gradient-wine">{tx.s7_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tx.s7_subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="space-y-5">
              {logVisuals.map((logVis, i) => {
                const logTx = tx.s7_logs[i];
                return (
                  <ScrollReveal key={logVis.module}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`relative rounded-2xl border ${logVis.moduleBorder} bg-card/60 backdrop-blur-sm overflow-hidden`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${logVis.accentBar}`} />
                      <div className="p-6 md:p-8 pl-7 md:pl-10">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md ${logVis.moduleBg} font-mono text-xs font-bold ${logVis.moduleColor} tracking-wide`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />{logVis.module}
                          </span>
                          <span className="text-[11px] text-muted-foreground/50 font-mono tracking-wide">{logTx.timestamp}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-semibold mb-3">{tx.s7_detected}</p>
                            <ul className="space-y-2.5">
                              {logTx.reasons.map((r) => (
                                <li key={r} className="flex items-start gap-2.5">
                                  <AlertTriangle size={13} className="mt-0.5 text-muted-foreground/40 shrink-0" />
                                  <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-semibold mb-3">{tx.s7_action_applied}</p>
                            <ul className="space-y-2.5">
                              {logTx.actions.map((a) => (
                                <li key={a} className="flex items-start gap-2.5">
                                  <CheckCircle size={13} className={`mt-0.5 ${logVis.moduleColor} shrink-0`} />
                                  <span className="text-sm text-foreground/90 font-medium leading-relaxed">{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            8. IMPACTO
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-wine/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>
          <div className="relative max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-4 py-1.5">{tx.s8_badge}</Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  {tx.s8_title_1}<span className="text-gradient-wine">{tx.s8_title_highlight}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{tx.s8_subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {tx.s8_metrics.map((item, i) => {
                const vis = impactVisuals[i];
                return (
                  <ScrollReveal key={item.title}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`group relative h-full p-8 md:p-10 rounded-2xl border border-border bg-card/60 backdrop-blur-sm ${vis.borderHover} transition-all duration-500`}>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vis.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl ${vis.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                          <vis.icon className={`w-6 h-6 ${vis.iconColor}`} />
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal>
              <p className="text-center text-muted-foreground/40 text-xs mt-10 max-w-xl mx-auto leading-relaxed">{tx.s8_disclaimer}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            9b. CORE vs ID — COMPLEMENTARY LAYERS
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
          <div className="relative max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                {tx.s9b_title}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tx.s9b_subtitle}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {/* Core side */}
                <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Gauge size={18} className="text-amber-400" />
                    </div>
                    <h3 className="text-sm font-bold tracking-widest uppercase text-amber-400">{tx.s9b_core_label}</h3>
                  </div>
                  <ul className="space-y-4">
                    {tx.s9b_core_items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Lightbulb size={14} className="mt-0.5 text-amber-400/60 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ID side */}
                <div className="relative p-8 md:p-10 rounded-2xl border border-wine/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-wine/6 via-wine/3 to-transparent pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-wine/15 flex items-center justify-center">
                        <Brain size={18} className="text-wine" />
                      </div>
                      <h3 className="text-sm font-bold tracking-widest uppercase text-wine">{tx.s9b_id_label}</h3>
                    </div>
                    <ul className="space-y-4">
                      {tx.s9b_id_items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Zap size={14} className="mt-0.5 text-wine/60 shrink-0" />
                          <span className="text-sm text-foreground font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-10 text-center">
                <p className="font-heading text-lg md:text-xl text-foreground/80 italic mb-6">{tx.s9b_closing}</p>
                <Link to={localePath("/producto/winerim-core")}
                  className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/40 transition-colors">
                  {tx.s9b_cta} <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            10. CTA FINAL
        ════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="relative p-12 md:p-16 rounded-2xl overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-wine opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="relative">
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                    {tx.s9_title_1}<br />{tx.s9_title_2}
                  </h2>
                  <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{tx.s9_subtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-wine px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-primary-foreground/90 transition-all">
                      {tx.s9_cta_demo} <ArrowRight size={16} />
                    </Link>
                    <Link to={localePath("/contacto")} className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-primary-foreground/10 transition-all">
                      {tx.s9_cta_contact}
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CIERRE — CONVERSIÓN FINAL
        ════════════════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-wine/8 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-wine/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="relative rounded-3xl border border-wine/15 bg-gradient-to-br from-card via-card/95 to-wine/5 p-10 sm:p-14 md:p-20 text-center overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-wine/10 via-transparent to-wine/5 pointer-events-none" />
                <div className="absolute -top-px -left-px -right-px h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
                <div className="relative">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">{tx.s10_title_1}</h2>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                    {tx.s10_title_2}<span className="text-gradient-wine">{tx.s10_title_highlight}</span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{tx.s10_subtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/25 hover:-translate-y-0.5">
                      {tx.s10_cta} <ArrowRight size={16} />
                    </Link>
                    <Link to={localePath("/contacto")} className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                      {tx.s10_cta_contact}
                    </Link>
                  </div>
                  <p className="text-muted-foreground/50 text-xs max-w-lg mx-auto leading-relaxed">{tx.s10_microcopy}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <InternalLinks links={[
        { to: localePath("/producto/winerim-core"), label: tx.il_core, type: "solution" },
        { to: localePath("/producto/winerim-supply"), label: lang === "es" ? "Winerim Supply: inteligencia de compras" : lang === "en" ? "Winerim Supply: purchasing intelligence" : lang === "it" ? "Winerim Supply: intelligenza acquisti" : "Winerim Supply : intelligence achats", type: "solution" },
        { to: localePath("/funcionalidades"), label: tx.il_features, type: "solution" },
        { to: localePath("/herramientas/wine-list-score"), label: lang === "es" ? "Wine List Score: evalúa tu carta" : lang === "en" ? "Wine List Score: evaluate your list" : lang === "it" ? "Wine List Score: valuta la tua carta" : "Wine List Score : évaluez votre carte", type: "tool" },
        { to: localePath("/recursos/checklist-carta-de-vinos-rentable"), label: lang === "es" ? "Checklist carta rentable" : lang === "en" ? "Profitable wine list checklist" : lang === "it" ? "Checklist carta redditizia" : "Checklist carte rentable", type: "resource" },
        { to: localePath("/decision-center/margenes-pricing"), label: lang === "es" ? "Decision Center: márgenes y pricing" : lang === "en" ? "Decision Center: margins & pricing" : lang === "it" ? "Decision Center: margini e pricing" : "Decision Center : marges et pricing", type: "decision-center" },
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios" : lang === "en" ? "Plans & pricing" : lang === "it" ? "Piani e prezzi" : "Plans et tarifs", type: "solution" },
        { to: localePath("/demo"), label: tx.il_demo, type: "solution" },
      ]} />
      <Footer />
    </>
  );
};

export default InteligenciaDinamica;
