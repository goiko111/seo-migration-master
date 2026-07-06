import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Compass, Target, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";

type AnswerKey = "listSize" | "stock" | "pos" | "margin" | "team" | "goal";
type ProfileKey = "estrategico" | "gourmet" | "coleccionista" | "turistico" | "pasivo" | "superviviente";
type InternalLinkType = "guide" | "tool" | "resource" | "solution" | "decision-center";

type Option = {
  value: string;
  label: string;
  helper: string;
  score: number;
};

type LocalizedOption = {
  value: string;
  label: string;
  helper: string;
};

type LocalizedQuestion = {
  key: AnswerKey;
  title: string;
  options: LocalizedOption[];
};

type Question = {
  key: AnswerKey;
  title: string;
  options: Option[];
};

type ProfileCopy = {
  label: string;
  summary: string;
  priority: string;
  actions: string[];
};

type TestPerfilRimCopy = {
  seoTitle: string;
  seoDesc: string;
  breadcrumbTools: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  h1: string;
  intro: string;
  diagnosticTitle: string;
  diagnosticSubtitle: string;
  resultLabel: string;
  priorityTitle: string;
  metrics: {
    maturity: string;
    operational: string;
  };
  primaryCta: string;
  cards: { title: string; text: string }[];
  finalKicker: string;
  finalTitle: string;
  finalText: string;
  downloadCta: string;
  productCta: string;
  faqs: { q: string; a: string }[];
  internalLinksTitle: string;
  internalLinks: { to: string; label: string; type: InternalLinkType }[];
  questions: LocalizedQuestion[];
  profileData: Record<ProfileKey, ProfileCopy>;
};

const questionScoring: { key: AnswerKey; options: { value: string; score: number }[] }[] = [
  {
    key: "listSize",
    options: [
      { value: "short", score: 1 },
      { value: "medium", score: 2 },
      { value: "large", score: 3 },
    ],
  },
  {
    key: "stock",
    options: [
      { value: "manual", score: 0 },
      { value: "partial", score: 1 },
      { value: "connected", score: 3 },
    ],
  },
  {
    key: "pos",
    options: [
      { value: "none", score: 0 },
      { value: "periodic", score: 1 },
      { value: "live", score: 3 },
    ],
  },
  {
    key: "margin",
    options: [
      { value: "rare", score: 0 },
      { value: "some", score: 2 },
      { value: "active", score: 3 },
    ],
  },
  {
    key: "team",
    options: [
      { value: "low", score: 0 },
      { value: "medium", score: 1 },
      { value: "high", score: 3 },
    ],
  },
  {
    key: "goal",
    options: [
      { value: "survive", score: 0 },
      { value: "sell", score: 2 },
      { value: "identity", score: 3 },
    ],
  },
];

const initialAnswers: Record<AnswerKey, string> = {
  listSize: "medium",
  stock: "partial",
  pos: "periodic",
  margin: "some",
  team: "medium",
  goal: "sell",
};

const profileTones: Record<ProfileKey, string> = {
  estrategico: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  gourmet: "bg-wine/10 text-wine border-wine/30",
  coleccionista: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  turistico: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  pasivo: "bg-slate-500/10 text-slate-700 border-slate-500/30",
  superviviente: "bg-red-500/10 text-red-700 border-red-500/30",
};

const makeQuestions = (localizedQuestions: LocalizedQuestion[]): Question[] =>
  questionScoring.map((scoredQuestion) => {
    const localizedQuestion = localizedQuestions.find((question) => question.key === scoredQuestion.key);
    return {
      key: scoredQuestion.key,
      title: localizedQuestion?.title ?? scoredQuestion.key,
      options: scoredQuestion.options.map((scoredOption) => {
        const localizedOption = localizedQuestion?.options.find((option) => option.value === scoredOption.value);
        return {
          value: scoredOption.value,
          score: scoredOption.score,
          label: localizedOption?.label ?? scoredOption.value,
          helper: localizedOption?.helper ?? "",
        };
      }),
    };
  });

const copy: I18nMap<TestPerfilRimCopy> = {
  es: {
    seoTitle: "Test Perfil RIM para restaurantes",
    seoDesc: "Descubre qué perfil RIM tiene tu restaurante: estratégico, gastronómico, coleccionista, turístico, pasivo o superviviente.",
    breadcrumbTools: "Herramientas",
    breadcrumbCurrent: "Test Perfil RIM",
    eyebrow: "Demo · Perfil RIM",
    h1: "Test Perfil RIM de tu restaurante",
    intro: "Responde seis preguntas y detecta si tu carta de vinos está funcionando como palanca comercial, como carta de identidad o como una fuente silenciosa de coste.",
    diagnosticTitle: "Diagnóstico rápido",
    diagnosticSubtitle: "Pensado para restaurantes, hoteles y wine bars.",
    resultLabel: "Resultado",
    priorityTitle: "Prioridad ahora",
    metrics: { maturity: "Madurez RIM", operational: "Control operativo" },
    primaryCta: "Ver cómo lo automatiza Winerim",
    cards: [
      { title: "Carta", text: "Evalúa si la carta tiene una función comercial clara o solo acumula referencias." },
      { title: "Datos", text: "Relaciona stock, TPV, coste, margen y equipo para encontrar el primer cuello de botella." },
      { title: "Ruta", text: "Convierte el perfil en una lista corta de acciones para empezar esta semana." },
    ],
    finalKicker: "Diagnóstico completo",
    finalTitle: "El test te da el perfil. Winerim te da las señales vivas.",
    finalText: "Con Winerim puedes cruzar carta, ventas, stock, costes, distribuidores y equipo para saber qué comprar, qué no reponer y qué empujar en sala.",
    downloadCta: "Descargar plantilla Perfil RIM",
    productCta: "Ver Winerim Core",
    faqs: [
      {
        q: "¿Qué significa RIM en este contexto?",
        a: "Lo usamos como marco de madurez para entender cómo un restaurante gestiona carta, stock, ventas, margen, compras y equipo alrededor del vino.",
      },
      {
        q: "¿El perfil es definitivo?",
        a: "No. Es un diagnóstico rápido. El perfil real cambia cuando se conectan datos de carta, stock, TPV, costes y distribuidores.",
      },
      {
        q: "¿Para qué sirve saber el perfil?",
        a: "Sirve para priorizar. Un restaurante superviviente necesita control; uno coleccionista necesita limpieza de stock; uno gastronómico necesita proteger identidad sin perder margen.",
      },
    ],
    internalLinksTitle: "Herramientas relacionadas",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Plantilla Perfil RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Tamaño y profundidad de carta",
        options: [
          { value: "short", label: "Menos de 60 referencias", helper: "Carta compacta o todavía en construcción." },
          { value: "medium", label: "60 a 180 referencias", helper: "Surtido con margen para ordenar mejor." },
          { value: "large", label: "Más de 180 referencias", helper: "Carta amplia con riesgo de capital inmovilizado." },
        ],
      },
      {
        key: "stock",
        title: "Control de stock y bodega",
        options: [
          { value: "manual", label: "Manual o irregular", helper: "El stock se revisa cuando aparece un problema." },
          { value: "partial", label: "Hoja o revisión semanal", helper: "Hay control, pero no siempre conectado a ventas." },
          { value: "connected", label: "Conectado a carta y ventas", helper: "El equipo ve rotación, cobertura y stock real." },
        ],
      },
      {
        key: "pos",
        title: "Ventas y TPV",
        options: [
          { value: "none", label: "No cruzamos ventas de vino", helper: "Se decide por intuición o memoria del equipo." },
          { value: "periodic", label: "Miramos informes puntuales", helper: "Se revisa el TPV, pero no con la carta viva." },
          { value: "live", label: "TPV conectado o analítica continua", helper: "Las decisiones salen de datos reales." },
        ],
      },
      {
        key: "margin",
        title: "Márgenes, PVP y coste",
        options: [
          { value: "rare", label: "Solo al crear la carta", helper: "Después apenas se revisa el coste real." },
          { value: "some", label: "Revisión mensual o trimestral", helper: "Se detectan fugas, pero tarde." },
          { value: "active", label: "Alertas y señales por referencia", helper: "No reponer, liquidar, crítico y capital inmovilizado." },
        ],
      },
      {
        key: "team",
        title: "Equipo de sala",
        options: [
          { value: "low", label: "Depende de una persona", helper: "Si falta el sumiller, la carta pierde fuerza." },
          { value: "medium", label: "Equipo con guías básicas", helper: "Hay discurso, pero no siempre consistente." },
          { value: "high", label: "Equipo guiado por carta digital", helper: "Maridajes, estilos y venta asistida en servicio." },
        ],
      },
      {
        key: "goal",
        title: "Objetivo principal de la carta",
        options: [
          { value: "survive", label: "Ordenar el caos operativo", helper: "Stock, compras, costes y referencias duplicadas." },
          { value: "sell", label: "Vender más y subir ticket", helper: "Rotación, copa, recomendación y margen." },
          { value: "identity", label: "Crear identidad gastronómica", helper: "Profundidad, relato, premios y experiencia." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Perfil RIM estratégico",
        summary: "Tu carta ya puede funcionar como sistema de decisión: ventas, stock, margen y equipo empiezan a hablar el mismo idioma.",
        priority: "Convertir los datos en rutinas: revisión semanal de compras, alertas de margen y ruta de recomendación para sala.",
        actions: ["Activar alertas por referencia crítica", "Comparar PVP frente a categorías equivalentes", "Crear un cuadro mensual de rotación, margen y ticket"],
      },
      gourmet: {
        label: "Perfil RIM gastronómico",
        summary: "La carta tiene potencial de identidad, profundidad y relato. El riesgo es que el valor gastronómico no siempre se traduzca en venta medible.",
        priority: "Separar vinos de imagen, vinos de rotación y vinos lastre sin empobrecer la experiencia.",
        actions: ["Marcar vinos protegidos por identidad", "Medir cobertura de cada familia gastronómica", "Formar sala con maridajes y alternativas por ticket"],
      },
      coleccionista: {
        label: "Perfil RIM coleccionista",
        summary: "Hay profundidad y ambición, pero probablemente también capital inmovilizado y referencias que nadie empuja.",
        priority: "Detectar stock muerto, duplicidades por estilo y referencias que ocupan carta sin aportar venta ni margen.",
        actions: ["Aplicar Pareto 80/20 por facturación y margen", "Etiquetar no reponer y liquidar", "Reducir solapes de DO, añada y precio"],
      },
      turistico: {
        label: "Perfil RIM turístico",
        summary: "La carta debe vender rápido, explicar bien y evitar decisiones complejas en servicio. La oportunidad está en ticket medio y vinos por copa.",
        priority: "Simplificar elección, reforzar estilos comprensibles y controlar el margen en referencias de alta salida.",
        actions: ["Crear rutas de recomendación por idioma y ticket", "Revisar copa, espumosos y blancos de rotación", "Medir ticket vino por mesa y mix turístico/local"],
      },
      pasivo: {
        label: "Perfil RIM pasivo",
        summary: "La carta existe, pero no trabaja todavía como palanca comercial. Falta ritmo de revisión y conexión con datos.",
        priority: "Empezar por cuatro señales: PVP, coste, stock y ventas por referencia.",
        actions: ["Conectar carta con stock básico", "Revisar 20 referencias de mayor impacto", "Crear una rutina mensual de compras y no reponer"],
      },
      superviviente: {
        label: "Perfil RIM superviviente",
        summary: "La gestión de vino está absorbiendo tiempo y probablemente escondiendo fugas de margen, stock y compras.",
        priority: "Recuperar control operativo antes de ampliar carta: inventario, costes reales, PVP y distribuidores.",
        actions: ["Auditar albaranes y facturas", "Cerrar un inventario inicial", "Eliminar referencias duplicadas o sin función clara"],
      },
    },
  },
  en: {
    seoTitle: "RIM Profile Test for restaurants",
    seoDesc: "Discover your restaurant's RIM profile: strategic, gastronomic, collector, tourist, passive or survival.",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "RIM Profile Test",
    eyebrow: "Demo · RIM Profile",
    h1: "RIM Profile Test for your restaurant",
    intro: "Answer six questions and see whether your wine list works as a commercial lever, an identity asset or a quiet source of cost.",
    diagnosticTitle: "Quick diagnosis",
    diagnosticSubtitle: "Designed for restaurants, hotels and wine bars.",
    resultLabel: "Result",
    priorityTitle: "Priority now",
    metrics: { maturity: "RIM maturity", operational: "Operational control" },
    primaryCta: "See how Winerim automates it",
    cards: [
      { title: "List", text: "Assess whether the list has a clear commercial role or simply accumulates references." },
      { title: "Data", text: "Connect stock, POS, cost, margin and team behaviour to find the first bottleneck." },
      { title: "Route", text: "Turn the profile into a short action list you can start this week." },
    ],
    finalKicker: "Full diagnosis",
    finalTitle: "The test gives you the profile. Winerim gives you live signals.",
    finalText: "With Winerim you can connect list, sales, stock, costs, distributors and team activity to know what to buy, what not to reorder and what to push on the floor.",
    downloadCta: "Download the RIM Profile template",
    productCta: "See Winerim Core",
    faqs: [
      {
        q: "What does RIM mean in this context?",
        a: "We use it as a maturity framework to understand how a restaurant manages list, stock, sales, margin, purchasing and team activity around wine.",
      },
      {
        q: "Is the profile definitive?",
        a: "No. It is a quick diagnosis. The real profile changes when list, stock, POS, cost and distributor data are connected.",
      },
      {
        q: "Why is the profile useful?",
        a: "It helps you prioritize. A survival restaurant needs control; a collector list needs stock cleanup; a gastronomic list needs to protect identity without losing margin.",
      },
    ],
    internalLinksTitle: "Related tools",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Pareto 80/20 Simulator", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Margin Signal Simulator", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "RIM Profile template", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamic intelligence", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Wine list size and depth",
        options: [
          { value: "short", label: "Fewer than 60 references", helper: "Compact list or still under construction." },
          { value: "medium", label: "60 to 180 references", helper: "Assortment with room for better structure." },
          { value: "large", label: "More than 180 references", helper: "Broad list with risk of tied-up capital." },
        ],
      },
      {
        key: "stock",
        title: "Stock and cellar control",
        options: [
          { value: "manual", label: "Manual or irregular", helper: "Stock is reviewed when a problem appears." },
          { value: "partial", label: "Spreadsheet or weekly review", helper: "There is control, but it is not always connected to sales." },
          { value: "connected", label: "Connected to list and sales", helper: "The team sees rotation, coverage and real stock." },
        ],
      },
      {
        key: "pos",
        title: "Sales and POS",
        options: [
          { value: "none", label: "We do not cross wine sales", helper: "Decisions rely on intuition or team memory." },
          { value: "periodic", label: "We review occasional reports", helper: "The POS is checked, but not against a living list." },
          { value: "live", label: "Connected POS or continuous analytics", helper: "Decisions come from real data." },
        ],
      },
      {
        key: "margin",
        title: "Margins, price and cost",
        options: [
          { value: "rare", label: "Only when creating the list", helper: "After that, real cost is barely reviewed." },
          { value: "some", label: "Monthly or quarterly review", helper: "Leaks are detected, but late." },
          { value: "active", label: "Alerts and signals by reference", helper: "Do not reorder, liquidate, critical and tied-up capital." },
        ],
      },
      {
        key: "team",
        title: "Floor team",
        options: [
          { value: "low", label: "Depends on one person", helper: "If the sommelier is absent, the list loses strength." },
          { value: "medium", label: "Team with basic guides", helper: "There is a script, but it is not always consistent." },
          { value: "high", label: "Team guided by a digital list", helper: "Pairings, styles and assisted selling during service." },
        ],
      },
      {
        key: "goal",
        title: "Main goal of the list",
        options: [
          { value: "survive", label: "Organize operational chaos", helper: "Stock, purchases, costs and duplicate references." },
          { value: "sell", label: "Sell more and raise ticket", helper: "Rotation, by-the-glass, recommendation and margin." },
          { value: "identity", label: "Build gastronomic identity", helper: "Depth, storytelling, awards and experience." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Strategic RIM profile",
        summary: "Your list can already work as a decision system: sales, stock, margin and team activity are starting to speak the same language.",
        priority: "Turn data into routines: weekly purchasing review, margin alerts and a recommendation route for the floor team.",
        actions: ["Activate alerts by critical reference", "Compare retail price against equivalent categories", "Create a monthly rotation, margin and ticket dashboard"],
      },
      gourmet: {
        label: "Gastronomic RIM profile",
        summary: "The list has identity, depth and storytelling potential. The risk is that gastronomic value does not always become measurable sales.",
        priority: "Separate image wines, rotation wines and ballast wines without weakening the experience.",
        actions: ["Mark identity-protected wines", "Measure coverage of each gastronomic family", "Train the team with pairings and ticket alternatives"],
      },
      coleccionista: {
        label: "Collector RIM profile",
        summary: "There is depth and ambition, but probably also tied-up capital and references nobody is pushing.",
        priority: "Detect dead stock, overlaps by style and references that occupy the list without adding sales or margin.",
        actions: ["Apply Pareto 80/20 by revenue and margin", "Tag do not reorder and liquidate", "Reduce overlaps in appellation, vintage and price"],
      },
      turistico: {
        label: "Tourist RIM profile",
        summary: "The list needs to sell fast, explain clearly and avoid complex service decisions. The opportunity is average ticket and by-the-glass wine.",
        priority: "Simplify choice, reinforce understandable styles and control margin on high-output references.",
        actions: ["Create recommendation routes by language and ticket", "Review by-the-glass, sparkling and rotating whites", "Measure wine ticket per table and tourist/local mix"],
      },
      pasivo: {
        label: "Passive RIM profile",
        summary: "The list exists, but it is not yet working as a commercial lever. Review rhythm and data connection are missing.",
        priority: "Start with four signals: retail price, cost, stock and sales by reference.",
        actions: ["Connect the list with basic stock", "Review the 20 highest-impact references", "Create a monthly purchasing and do-not-reorder routine"],
      },
      superviviente: {
        label: "Survival RIM profile",
        summary: "Wine management is absorbing time and probably hiding margin, stock and purchasing leaks.",
        priority: "Regain operational control before expanding the list: inventory, real costs, retail prices and distributors.",
        actions: ["Audit delivery notes and invoices", "Close an initial inventory", "Remove duplicated references or wines without a clear role"],
      },
    },
  },
  it: {
    seoTitle: "Test Profilo RIM per ristoranti",
    seoDesc: "Scopri il profilo RIM del tuo ristorante: strategico, gastronomico, collezionista, turistico, passivo o di sopravvivenza.",
    breadcrumbTools: "Strumenti",
    breadcrumbCurrent: "Test Profilo RIM",
    eyebrow: "Demo · Profilo RIM",
    h1: "Test Profilo RIM del tuo ristorante",
    intro: "Rispondi a sei domande e capisci se la carta vini funziona come leva commerciale, come identità o come fonte silenziosa di costo.",
    diagnosticTitle: "Diagnosi rapida",
    diagnosticSubtitle: "Pensata per ristoranti, hotel e wine bar.",
    resultLabel: "Risultato",
    priorityTitle: "Priorità ora",
    metrics: { maturity: "Maturità RIM", operational: "Controllo operativo" },
    primaryCta: "Vedi come Winerim lo automatizza",
    cards: [
      { title: "Carta", text: "Valuta se la carta ha una funzione commerciale chiara o accumula solo referenze." },
      { title: "Dati", text: "Collega stock, POS, costo, margine e team per trovare il primo collo di bottiglia." },
      { title: "Percorso", text: "Trasforma il profilo in una lista breve di azioni da iniziare questa settimana." },
    ],
    finalKicker: "Diagnosi completa",
    finalTitle: "Il test ti dà il profilo. Winerim ti dà segnali vivi.",
    finalText: "Con Winerim puoi incrociare carta, vendite, stock, costi, distributori e team per sapere cosa comprare, cosa non riordinare e cosa spingere in sala.",
    downloadCta: "Scarica il template Profilo RIM",
    productCta: "Vedi Winerim Core",
    faqs: [
      {
        q: "Cosa significa RIM in questo contesto?",
        a: "Lo usiamo come framework di maturità per capire come un ristorante gestisce carta, stock, vendite, margine, acquisti e team attorno al vino.",
      },
      {
        q: "Il profilo è definitivo?",
        a: "No. È una diagnosi rapida. Il profilo reale cambia quando si collegano dati di carta, stock, POS, costi e distributori.",
      },
      {
        q: "A cosa serve conoscere il profilo?",
        a: "Serve a dare priorità. Un ristorante in sopravvivenza ha bisogno di controllo; un profilo collezionista di pulizia dello stock; uno gastronomico di proteggere l'identità senza perdere margine.",
      },
    ],
    internalLinksTitle: "Strumenti correlati",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulatore Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulatore segnale margini", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Template Profilo RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligenza dinamica", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Dimensione e profondità della carta",
        options: [
          { value: "short", label: "Meno di 60 referenze", helper: "Carta compatta o ancora in costruzione." },
          { value: "medium", label: "Da 60 a 180 referenze", helper: "Assortimento con margine per essere ordinato meglio." },
          { value: "large", label: "Più di 180 referenze", helper: "Carta ampia con rischio di capitale immobilizzato." },
        ],
      },
      {
        key: "stock",
        title: "Controllo stock e cantina",
        options: [
          { value: "manual", label: "Manuale o irregolare", helper: "Lo stock viene rivisto quando compare un problema." },
          { value: "partial", label: "Foglio o revisione settimanale", helper: "C'è controllo, ma non sempre collegato alle vendite." },
          { value: "connected", label: "Collegato a carta e vendite", helper: "Il team vede rotazione, copertura e stock reale." },
        ],
      },
      {
        key: "pos",
        title: "Vendite e POS",
        options: [
          { value: "none", label: "Non incrociamo le vendite vino", helper: "Si decide per intuizione o memoria del team." },
          { value: "periodic", label: "Guardiamo report puntuali", helper: "Il POS viene rivisto, ma non con la carta viva." },
          { value: "live", label: "POS collegato o analisi continua", helper: "Le decisioni nascono da dati reali." },
        ],
      },
      {
        key: "margin",
        title: "Margini, prezzo e costo",
        options: [
          { value: "rare", label: "Solo quando creiamo la carta", helper: "Dopo, il costo reale si rivede appena." },
          { value: "some", label: "Revisione mensile o trimestrale", helper: "Le fughe si rilevano, ma tardi." },
          { value: "active", label: "Alert e segnali per referenza", helper: "Non riordinare, liquidare, critico e capitale immobilizzato." },
        ],
      },
      {
        key: "team",
        title: "Team di sala",
        options: [
          { value: "low", label: "Dipende da una persona", helper: "Se manca il sommelier, la carta perde forza." },
          { value: "medium", label: "Team con guide di base", helper: "C'è un discorso, ma non sempre coerente." },
          { value: "high", label: "Team guidato da carta digitale", helper: "Abbinamenti, stili e vendita assistita durante il servizio." },
        ],
      },
      {
        key: "goal",
        title: "Obiettivo principale della carta",
        options: [
          { value: "survive", label: "Mettere ordine nel caos operativo", helper: "Stock, acquisti, costi e referenze duplicate." },
          { value: "sell", label: "Vendere di più e alzare lo scontrino", helper: "Rotazione, calice, raccomandazione e margine." },
          { value: "identity", label: "Creare identità gastronomica", helper: "Profondità, racconto, premi ed esperienza." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Profilo RIM strategico",
        summary: "La tua carta può già funzionare come sistema decisionale: vendite, stock, margine e team iniziano a parlare la stessa lingua.",
        priority: "Trasformare i dati in routine: revisione settimanale degli acquisti, alert di margine e percorso di raccomandazione per la sala.",
        actions: ["Attivare alert per referenza critica", "Confrontare il prezzo con categorie equivalenti", "Creare un quadro mensile di rotazione, margine e scontrino"],
      },
      gourmet: {
        label: "Profilo RIM gastronomico",
        summary: "La carta ha potenziale di identità, profondità e racconto. Il rischio è che il valore gastronomico non diventi sempre vendita misurabile.",
        priority: "Separare vini d'immagine, vini di rotazione e vini zavorra senza impoverire l'esperienza.",
        actions: ["Marcare vini protetti per identità", "Misurare la copertura di ogni famiglia gastronomica", "Formare la sala con abbinamenti e alternative per scontrino"],
      },
      coleccionista: {
        label: "Profilo RIM collezionista",
        summary: "Ci sono profondità e ambizione, ma probabilmente anche capitale immobilizzato e referenze che nessuno spinge.",
        priority: "Rilevare stock morto, duplicazioni per stile e referenze che occupano carta senza portare vendita né margine.",
        actions: ["Applicare Pareto 80/20 per fatturato e margine", "Etichettare non riordinare e liquidare", "Ridurre sovrapposizioni di denominazione, annata e prezzo"],
      },
      turistico: {
        label: "Profilo RIM turistico",
        summary: "La carta deve vendere rapidamente, spiegare bene ed evitare decisioni complesse in servizio. L'opportunità è nello scontrino medio e nel vino al calice.",
        priority: "Semplificare la scelta, rafforzare stili comprensibili e controllare il margine sulle referenze ad alta uscita.",
        actions: ["Creare percorsi di raccomandazione per lingua e scontrino", "Rivedere calice, spumanti e bianchi di rotazione", "Misurare ticket vino per tavolo e mix turisti/locali"],
      },
      pasivo: {
        label: "Profilo RIM passivo",
        summary: "La carta esiste, ma non lavora ancora come leva commerciale. Mancano ritmo di revisione e connessione con i dati.",
        priority: "Iniziare da quattro segnali: prezzo, costo, stock e vendite per referenza.",
        actions: ["Collegare la carta con stock di base", "Rivedere le 20 referenze a maggiore impatto", "Creare una routine mensile di acquisti e non riordino"],
      },
      superviviente: {
        label: "Profilo RIM sopravvivenza",
        summary: "La gestione del vino sta assorbendo tempo e probabilmente nasconde fughe di margine, stock e acquisti.",
        priority: "Recuperare controllo operativo prima di ampliare la carta: inventario, costi reali, prezzi e distributori.",
        actions: ["Auditare documenti di consegna e fatture", "Chiudere un inventario iniziale", "Eliminare referenze duplicate o senza funzione chiara"],
      },
    },
  },
  fr: {
    seoTitle: "Test Profil RIM pour restaurants",
    seoDesc: "Découvrez le profil RIM de votre restaurant : stratégique, gastronomique, collectionneur, touristique, passif ou survie.",
    breadcrumbTools: "Outils",
    breadcrumbCurrent: "Test Profil RIM",
    eyebrow: "Démo · Profil RIM",
    h1: "Test Profil RIM de votre restaurant",
    intro: "Répondez à six questions et voyez si votre carte des vins fonctionne comme levier commercial, comme carte d'identité ou comme source silencieuse de coût.",
    diagnosticTitle: "Diagnostic rapide",
    diagnosticSubtitle: "Pensé pour les restaurants, hôtels et bars à vin.",
    resultLabel: "Résultat",
    priorityTitle: "Priorité maintenant",
    metrics: { maturity: "Maturité RIM", operational: "Contrôle opérationnel" },
    primaryCta: "Voir comment Winerim l'automatise",
    cards: [
      { title: "Carte", text: "Évalue si la carte a une fonction commerciale claire ou accumule seulement des références." },
      { title: "Données", text: "Relie stock, caisse, coût, marge et équipe pour trouver le premier goulot d'étranglement." },
      { title: "Feuille de route", text: "Transforme le profil en courte liste d'actions à lancer cette semaine." },
    ],
    finalKicker: "Diagnostic complet",
    finalTitle: "Le test donne le profil. Winerim donne les signaux vivants.",
    finalText: "Avec Winerim, vous pouvez croiser carte, ventes, stock, coûts, distributeurs et équipe pour savoir quoi acheter, quoi ne pas recommander et quoi pousser en salle.",
    downloadCta: "Télécharger le modèle Profil RIM",
    productCta: "Voir Winerim Core",
    faqs: [
      {
        q: "Que signifie RIM dans ce contexte ?",
        a: "Nous l'utilisons comme cadre de maturité pour comprendre comment un restaurant gère carte, stock, ventes, marge, achats et équipe autour du vin.",
      },
      {
        q: "Le profil est-il définitif ?",
        a: "Non. C'est un diagnostic rapide. Le profil réel change lorsque les données de carte, stock, caisse, coûts et distributeurs sont connectées.",
      },
      {
        q: "À quoi sert de connaître le profil ?",
        a: "À prioriser. Un restaurant en survie a besoin de contrôle ; une carte collectionneur a besoin de nettoyer le stock ; une carte gastronomique doit protéger l'identité sans perdre de marge.",
      },
    ],
    internalLinksTitle: "Outils associés",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulateur Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulateur signal de marges", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Modèle Profil RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Intelligence dynamique", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Taille et profondeur de carte",
        options: [
          { value: "short", label: "Moins de 60 références", helper: "Carte compacte ou encore en construction." },
          { value: "medium", label: "60 à 180 références", helper: "Assortiment avec une marge pour mieux l'organiser." },
          { value: "large", label: "Plus de 180 références", helper: "Carte large avec risque de capital immobilisé." },
        ],
      },
      {
        key: "stock",
        title: "Contrôle du stock et de la cave",
        options: [
          { value: "manual", label: "Manuel ou irrégulier", helper: "Le stock est revu quand un problème apparaît." },
          { value: "partial", label: "Tableur ou revue hebdomadaire", helper: "Il y a du contrôle, mais pas toujours connecté aux ventes." },
          { value: "connected", label: "Connecté à la carte et aux ventes", helper: "L'équipe voit rotation, couverture et stock réel." },
        ],
      },
      {
        key: "pos",
        title: "Ventes et caisse",
        options: [
          { value: "none", label: "Nous ne croisons pas les ventes vin", helper: "Les décisions reposent sur l'intuition ou la mémoire de l'équipe." },
          { value: "periodic", label: "Nous regardons des rapports ponctuels", helper: "La caisse est revue, mais pas avec une carte vivante." },
          { value: "live", label: "Caisse connectée ou analyse continue", helper: "Les décisions viennent de données réelles." },
        ],
      },
      {
        key: "margin",
        title: "Marges, prix et coût",
        options: [
          { value: "rare", label: "Seulement à la création de la carte", helper: "Ensuite, le coût réel est peu revu." },
          { value: "some", label: "Revue mensuelle ou trimestrielle", helper: "Les fuites sont détectées, mais tard." },
          { value: "active", label: "Alertes et signaux par référence", helper: "Ne pas recommander, liquider, critique et capital immobilisé." },
        ],
      },
      {
        key: "team",
        title: "Équipe de salle",
        options: [
          { value: "low", label: "Dépend d'une personne", helper: "Si le sommelier manque, la carte perd de sa force." },
          { value: "medium", label: "Équipe avec guides de base", helper: "Il y a un discours, mais pas toujours cohérent." },
          { value: "high", label: "Équipe guidée par carte digitale", helper: "Accords, styles et vente assistée pendant le service." },
        ],
      },
      {
        key: "goal",
        title: "Objectif principal de la carte",
        options: [
          { value: "survive", label: "Ordonner le chaos opérationnel", helper: "Stock, achats, coûts et références dupliquées." },
          { value: "sell", label: "Vendre plus et augmenter le ticket", helper: "Rotation, verre, recommandation et marge." },
          { value: "identity", label: "Créer une identité gastronomique", helper: "Profondeur, récit, prix et expérience." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Profil RIM stratégique",
        summary: "Votre carte peut déjà fonctionner comme système de décision : ventes, stock, marge et équipe commencent à parler le même langage.",
        priority: "Transformer les données en routines : revue hebdomadaire des achats, alertes de marge et parcours de recommandation pour la salle.",
        actions: ["Activer des alertes par référence critique", "Comparer le prix aux catégories équivalentes", "Créer un tableau mensuel de rotation, marge et ticket"],
      },
      gourmet: {
        label: "Profil RIM gastronomique",
        summary: "La carte a du potentiel d'identité, de profondeur et de récit. Le risque est que la valeur gastronomique ne se transforme pas toujours en vente mesurable.",
        priority: "Séparer vins d'image, vins de rotation et vins lest sans appauvrir l'expérience.",
        actions: ["Marquer les vins protégés par identité", "Mesurer la couverture de chaque famille gastronomique", "Former la salle avec accords et alternatives par ticket"],
      },
      coleccionista: {
        label: "Profil RIM collectionneur",
        summary: "Il y a de la profondeur et de l'ambition, mais probablement aussi du capital immobilisé et des références que personne ne pousse.",
        priority: "Détecter stock mort, doublons par style et références qui occupent la carte sans apporter vente ni marge.",
        actions: ["Appliquer Pareto 80/20 par chiffre d'affaires et marge", "Étiqueter ne pas recommander et liquider", "Réduire les chevauchements d'appellation, millésime et prix"],
      },
      turistico: {
        label: "Profil RIM touristique",
        summary: "La carte doit vendre vite, expliquer clairement et éviter les décisions complexes en service. L'opportunité se trouve dans le ticket moyen et le vin au verre.",
        priority: "Simplifier le choix, renforcer les styles compréhensibles et contrôler la marge sur les références à forte sortie.",
        actions: ["Créer des parcours de recommandation par langue et ticket", "Revoir verre, effervescents et blancs de rotation", "Mesurer ticket vin par table et mix touristique/local"],
      },
      pasivo: {
        label: "Profil RIM passif",
        summary: "La carte existe, mais elle ne travaille pas encore comme levier commercial. Il manque un rythme de revue et une connexion aux données.",
        priority: "Commencer par quatre signaux : prix, coût, stock et ventes par référence.",
        actions: ["Connecter la carte avec un stock de base", "Revoir les 20 références à plus fort impact", "Créer une routine mensuelle d'achats et de non-réassort"],
      },
      superviviente: {
        label: "Profil RIM survie",
        summary: "La gestion du vin absorbe du temps et cache probablement des fuites de marge, de stock et d'achats.",
        priority: "Récupérer le contrôle opérationnel avant d'élargir la carte : inventaire, coûts réels, prix et distributeurs.",
        actions: ["Auditer bons de livraison et factures", "Clore un inventaire initial", "Éliminer les références dupliquées ou sans fonction claire"],
      },
    },
  },
  de: {
    seoTitle: "RIM-Profiltest für Restaurants",
    seoDesc: "Erkennen Sie das RIM-Profil Ihres Restaurants: strategisch, gastronomisch, sammlerisch, touristisch, passiv oder Überlebensmodus.",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "RIM-Profiltest",
    eyebrow: "Demo · RIM-Profil",
    h1: "RIM-Profiltest für Ihr Restaurant",
    intro: "Beantworten Sie sechs Fragen und erkennen Sie, ob Ihre Weinkarte als kommerzieller Hebel, als Identitätskarte oder als stille Kostenquelle arbeitet.",
    diagnosticTitle: "Schnelldiagnose",
    diagnosticSubtitle: "Für Restaurants, Hotels und Weinbars gedacht.",
    resultLabel: "Ergebnis",
    priorityTitle: "Priorität jetzt",
    metrics: { maturity: "RIM-Reife", operational: "Operative Kontrolle" },
    primaryCta: "Sehen, wie Winerim es automatisiert",
    cards: [
      { title: "Karte", text: "Bewertet, ob die Karte eine klare kommerzielle Funktion hat oder nur Referenzen sammelt." },
      { title: "Daten", text: "Verbindet Bestand, POS, Kosten, Marge und Team, um den ersten Engpass zu finden." },
      { title: "Route", text: "Macht aus dem Profil eine kurze Aktionsliste für diese Woche." },
    ],
    finalKicker: "Vollständige Diagnose",
    finalTitle: "Der Test gibt Ihnen das Profil. Winerim gibt Ihnen Live-Signale.",
    finalText: "Mit Winerim verbinden Sie Karte, Verkäufe, Bestand, Kosten, Händler und Team, um zu wissen, was gekauft, nicht nachbestellt und im Service empfohlen werden sollte.",
    downloadCta: "RIM-Profil-Vorlage herunterladen",
    productCta: "Winerim Core ansehen",
    faqs: [
      {
        q: "Was bedeutet RIM in diesem Kontext?",
        a: "Wir nutzen es als Reiferahmen, um zu verstehen, wie ein Restaurant Karte, Bestand, Verkäufe, Marge, Einkauf und Team rund um Wein steuert.",
      },
      {
        q: "Ist das Profil endgültig?",
        a: "Nein. Es ist eine schnelle Diagnose. Das reale Profil verändert sich, wenn Daten aus Karte, Bestand, POS, Kosten und Händlern verbunden werden.",
      },
      {
        q: "Wozu ist das Profil nützlich?",
        a: "Es hilft beim Priorisieren. Ein Restaurant im Überlebensmodus braucht Kontrolle; ein Sammlerprofil braucht Bestandsbereinigung; ein gastronomisches Profil muss Identität schützen, ohne Marge zu verlieren.",
      },
    ],
    internalLinksTitle: "Verwandte Tools",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Pareto-80/20-Simulator", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Margensignal-Simulator", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "RIM-Profil-Vorlage", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Größe und Tiefe der Weinkarte",
        options: [
          { value: "short", label: "Weniger als 60 Referenzen", helper: "Kompakte Karte oder noch im Aufbau." },
          { value: "medium", label: "60 bis 180 Referenzen", helper: "Sortiment mit Raum für bessere Struktur." },
          { value: "large", label: "Mehr als 180 Referenzen", helper: "Große Karte mit Risiko gebundenen Kapitals." },
        ],
      },
      {
        key: "stock",
        title: "Bestands- und Kellerkontrolle",
        options: [
          { value: "manual", label: "Manuell oder unregelmäßig", helper: "Der Bestand wird geprüft, wenn ein Problem auftaucht." },
          { value: "partial", label: "Tabelle oder Wochenprüfung", helper: "Es gibt Kontrolle, aber nicht immer verbunden mit Verkäufen." },
          { value: "connected", label: "Mit Karte und Verkäufen verbunden", helper: "Das Team sieht Rotation, Reichweite und realen Bestand." },
        ],
      },
      {
        key: "pos",
        title: "Verkäufe und POS",
        options: [
          { value: "none", label: "Wir kreuzen Weinverkäufe nicht", helper: "Entscheidungen beruhen auf Intuition oder Teamgedächtnis." },
          { value: "periodic", label: "Wir prüfen einzelne Berichte", helper: "Der POS wird geprüft, aber nicht gegen eine lebendige Karte." },
          { value: "live", label: "POS verbunden oder laufende Analytik", helper: "Entscheidungen kommen aus realen Daten." },
        ],
      },
      {
        key: "margin",
        title: "Margen, Preis und Kosten",
        options: [
          { value: "rare", label: "Nur beim Erstellen der Karte", helper: "Danach werden reale Kosten kaum geprüft." },
          { value: "some", label: "Monatliche oder quartalsweise Prüfung", helper: "Lecks werden erkannt, aber spät." },
          { value: "active", label: "Warnungen und Signale pro Referenz", helper: "Nicht nachbestellen, liquidieren, kritisch und gebundenes Kapital." },
        ],
      },
      {
        key: "team",
        title: "Serviceteam",
        options: [
          { value: "low", label: "Hängt von einer Person ab", helper: "Fehlt der Sommelier, verliert die Karte an Kraft." },
          { value: "medium", label: "Team mit Basisleitfäden", helper: "Es gibt eine Linie, aber nicht immer konsistent." },
          { value: "high", label: "Team durch digitale Karte geführt", helper: "Pairings, Stile und assistierter Verkauf im Service." },
        ],
      },
      {
        key: "goal",
        title: "Hauptziel der Karte",
        options: [
          { value: "survive", label: "Operatives Chaos ordnen", helper: "Bestand, Einkäufe, Kosten und doppelte Referenzen." },
          { value: "sell", label: "Mehr verkaufen und Bon erhöhen", helper: "Rotation, Glaswein, Empfehlung und Marge." },
          { value: "identity", label: "Gastronomische Identität schaffen", helper: "Tiefe, Erzählung, Auszeichnungen und Erlebnis." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Strategisches RIM-Profil",
        summary: "Ihre Karte kann bereits als Entscheidungssystem funktionieren: Verkäufe, Bestand, Marge und Team beginnen dieselbe Sprache zu sprechen.",
        priority: "Daten in Routinen verwandeln: wöchentliche Einkaufsprüfung, Margenwarnungen und Empfehlungsroute für den Service.",
        actions: ["Warnungen für kritische Referenzen aktivieren", "Preis mit vergleichbaren Kategorien vergleichen", "Ein monatliches Dashboard für Rotation, Marge und Bon erstellen"],
      },
      gourmet: {
        label: "Gastronomisches RIM-Profil",
        summary: "Die Karte hat Potenzial für Identität, Tiefe und Erzählung. Das Risiko ist, dass gastronomischer Wert nicht immer messbarer Verkauf wird.",
        priority: "Imageweine, Rotationsweine und Ballastweine trennen, ohne das Erlebnis zu schwächen.",
        actions: ["Durch Identität geschützte Weine markieren", "Abdeckung jeder gastronomischen Familie messen", "Service mit Pairings und Bon-Alternativen schulen"],
      },
      coleccionista: {
        label: "Sammler-RIM-Profil",
        summary: "Es gibt Tiefe und Ambition, aber wahrscheinlich auch gebundenes Kapital und Referenzen, die niemand aktiv verkauft.",
        priority: "Totbestand, Stilüberschneidungen und Referenzen erkennen, die Platz auf der Karte einnehmen, ohne Verkauf oder Marge zu bringen.",
        actions: ["Pareto 80/20 nach Umsatz und Marge anwenden", "Nicht nachbestellen und liquidieren markieren", "Überschneidungen bei Herkunft, Jahrgang und Preis reduzieren"],
      },
      turistico: {
        label: "Touristisches RIM-Profil",
        summary: "Die Karte muss schnell verkaufen, klar erklären und komplexe Serviceentscheidungen vermeiden. Die Chance liegt im Durchschnittsbon und im Glaswein.",
        priority: "Auswahl vereinfachen, verständliche Stile stärken und Marge bei schnell laufenden Referenzen kontrollieren.",
        actions: ["Empfehlungsrouten nach Sprache und Bon erstellen", "Glaswein, Schaumweine und rotierende Weißweine prüfen", "Weinticket pro Tisch und Tourist/Lokal-Mix messen"],
      },
      pasivo: {
        label: "Passives RIM-Profil",
        summary: "Die Karte existiert, arbeitet aber noch nicht als kommerzieller Hebel. Es fehlen Prüfrhythmus und Datenverbindung.",
        priority: "Mit vier Signalen beginnen: Preis, Kosten, Bestand und Verkäufe pro Referenz.",
        actions: ["Karte mit Basisbestand verbinden", "Die 20 wirkungsstärksten Referenzen prüfen", "Eine monatliche Einkaufs- und Nicht-nachbestellen-Routine schaffen"],
      },
      superviviente: {
        label: "Überlebens-RIM-Profil",
        summary: "Weinmanagement bindet Zeit und versteckt wahrscheinlich Lecks bei Marge, Bestand und Einkauf.",
        priority: "Operative Kontrolle zurückgewinnen, bevor die Karte erweitert wird: Inventur, reale Kosten, Preise und Händler.",
        actions: ["Lieferscheine und Rechnungen prüfen", "Eine Startinventur abschließen", "Doppelte Referenzen oder Weine ohne klare Funktion entfernen"],
      },
    },
  },
  pt: {
    seoTitle: "Teste Perfil RIM para restaurantes",
    seoDesc: "Descubra o perfil RIM do seu restaurante: estratégico, gastronómico, colecionador, turístico, passivo ou de sobrevivência.",
    breadcrumbTools: "Ferramentas",
    breadcrumbCurrent: "Teste Perfil RIM",
    eyebrow: "Demo · Perfil RIM",
    h1: "Teste Perfil RIM do seu restaurante",
    intro: "Responda a seis perguntas e perceba se a sua carta de vinhos funciona como alavanca comercial, como carta de identidade ou como fonte silenciosa de custo.",
    diagnosticTitle: "Diagnóstico rápido",
    diagnosticSubtitle: "Pensado para restaurantes, hotéis e wine bars.",
    resultLabel: "Resultado",
    priorityTitle: "Prioridade agora",
    metrics: { maturity: "Maturidade RIM", operational: "Controlo operativo" },
    primaryCta: "Ver como a Winerim automatiza isto",
    cards: [
      { title: "Carta", text: "Avalia se a carta tem uma função comercial clara ou apenas acumula referências." },
      { title: "Dados", text: "Relaciona stock, POS, custo, margem e equipa para encontrar o primeiro bloqueio." },
      { title: "Rota", text: "Converte o perfil numa lista curta de ações para começar esta semana." },
    ],
    finalKicker: "Diagnóstico completo",
    finalTitle: "O teste dá-lhe o perfil. A Winerim dá-lhe sinais vivos.",
    finalText: "Com a Winerim pode cruzar carta, vendas, stock, custos, distribuidores e equipa para saber o que comprar, o que não repor e o que recomendar em sala.",
    downloadCta: "Descarregar template Perfil RIM",
    productCta: "Ver Winerim Core",
    faqs: [
      {
        q: "O que significa RIM neste contexto?",
        a: "Usamo-lo como quadro de maturidade para entender como um restaurante gere carta, stock, vendas, margem, compras e equipa em torno do vinho.",
      },
      {
        q: "O perfil é definitivo?",
        a: "Não. É um diagnóstico rápido. O perfil real muda quando se ligam dados de carta, stock, POS, custos e distribuidores.",
      },
      {
        q: "Para que serve saber o perfil?",
        a: "Serve para priorizar. Um restaurante de sobrevivência precisa de controlo; um colecionador precisa de limpeza de stock; um gastronómico precisa de proteger identidade sem perder margem.",
      },
    ],
    internalLinksTitle: "Ferramentas relacionadas",
    internalLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de sinal de margens", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Template Perfil RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligência dinâmica", type: "solution" },
    ],
    questions: [
      {
        key: "listSize",
        title: "Tamanho e profundidade da carta",
        options: [
          { value: "short", label: "Menos de 60 referências", helper: "Carta compacta ou ainda em construção." },
          { value: "medium", label: "60 a 180 referências", helper: "Sortido com margem para organizar melhor." },
          { value: "large", label: "Mais de 180 referências", helper: "Carta ampla com risco de capital imobilizado." },
        ],
      },
      {
        key: "stock",
        title: "Controlo de stock e cave",
        options: [
          { value: "manual", label: "Manual ou irregular", helper: "O stock é revisto quando aparece um problema." },
          { value: "partial", label: "Folha ou revisão semanal", helper: "Há controlo, mas nem sempre ligado às vendas." },
          { value: "connected", label: "Ligado à carta e vendas", helper: "A equipa vê rotação, cobertura e stock real." },
        ],
      },
      {
        key: "pos",
        title: "Vendas e POS",
        options: [
          { value: "none", label: "Não cruzamos vendas de vinho", helper: "Decide-se por intuição ou memória da equipa." },
          { value: "periodic", label: "Vemos relatórios pontuais", helper: "O POS é revisto, mas não com a carta viva." },
          { value: "live", label: "POS ligado ou analítica contínua", helper: "As decisões vêm de dados reais." },
        ],
      },
      {
        key: "margin",
        title: "Margens, preço e custo",
        options: [
          { value: "rare", label: "Só ao criar a carta", helper: "Depois quase não se revê o custo real." },
          { value: "some", label: "Revisão mensal ou trimestral", helper: "As fugas são detetadas, mas tarde." },
          { value: "active", label: "Alertas e sinais por referência", helper: "Não repor, liquidar, crítico e capital imobilizado." },
        ],
      },
      {
        key: "team",
        title: "Equipa de sala",
        options: [
          { value: "low", label: "Depende de uma pessoa", helper: "Se falta o sommelier, a carta perde força." },
          { value: "medium", label: "Equipa com guias básicos", helper: "Há discurso, mas nem sempre consistente." },
          { value: "high", label: "Equipa guiada por carta digital", helper: "Harmonizações, estilos e venda assistida no serviço." },
        ],
      },
      {
        key: "goal",
        title: "Objetivo principal da carta",
        options: [
          { value: "survive", label: "Organizar o caos operativo", helper: "Stock, compras, custos e referências duplicadas." },
          { value: "sell", label: "Vender mais e subir ticket", helper: "Rotação, copo, recomendação e margem." },
          { value: "identity", label: "Criar identidade gastronómica", helper: "Profundidade, narrativa, prémios e experiência." },
        ],
      },
    ],
    profileData: {
      estrategico: {
        label: "Perfil RIM estratégico",
        summary: "A sua carta já pode funcionar como sistema de decisão: vendas, stock, margem e equipa começam a falar a mesma língua.",
        priority: "Converter dados em rotinas: revisão semanal de compras, alertas de margem e rota de recomendação para sala.",
        actions: ["Ativar alertas por referência crítica", "Comparar preço com categorias equivalentes", "Criar um quadro mensal de rotação, margem e ticket"],
      },
      gourmet: {
        label: "Perfil RIM gastronómico",
        summary: "A carta tem potencial de identidade, profundidade e narrativa. O risco é que o valor gastronómico nem sempre se traduza em venda mensurável.",
        priority: "Separar vinhos de imagem, vinhos de rotação e vinhos lastro sem empobrecer a experiência.",
        actions: ["Marcar vinhos protegidos por identidade", "Medir cobertura de cada família gastronómica", "Formar sala com harmonizações e alternativas por ticket"],
      },
      coleccionista: {
        label: "Perfil RIM colecionador",
        summary: "Há profundidade e ambição, mas provavelmente também capital imobilizado e referências que ninguém recomenda.",
        priority: "Detetar stock morto, duplicidades por estilo e referências que ocupam carta sem trazer venda nem margem.",
        actions: ["Aplicar Pareto 80/20 por faturação e margem", "Etiquetar não repor e liquidar", "Reduzir sobreposições de DO, colheita e preço"],
      },
      turistico: {
        label: "Perfil RIM turístico",
        summary: "A carta deve vender rápido, explicar bem e evitar decisões complexas no serviço. A oportunidade está no ticket médio e no vinho a copo.",
        priority: "Simplificar a escolha, reforçar estilos compreensíveis e controlar a margem em referências de alta saída.",
        actions: ["Criar rotas de recomendação por idioma e ticket", "Rever copo, espumantes e brancos de rotação", "Medir ticket de vinho por mesa e mix turístico/local"],
      },
      pasivo: {
        label: "Perfil RIM passivo",
        summary: "A carta existe, mas ainda não trabalha como alavanca comercial. Falta ritmo de revisão e ligação com dados.",
        priority: "Começar por quatro sinais: preço, custo, stock e vendas por referência.",
        actions: ["Ligar carta com stock básico", "Rever 20 referências de maior impacto", "Criar uma rotina mensal de compras e não reposição"],
      },
      superviviente: {
        label: "Perfil RIM sobrevivência",
        summary: "A gestão de vinho está a absorver tempo e provavelmente esconde fugas de margem, stock e compras.",
        priority: "Recuperar controlo operativo antes de ampliar a carta: inventário, custos reais, preços e distribuidores.",
        actions: ["Auditar guias de remessa e faturas", "Fechar um inventário inicial", "Eliminar referências duplicadas ou sem função clara"],
      },
    },
  },
};

const cardIcons = [Wine, BarChart3, ClipboardList];

const TestPerfilRim = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(copy, lang);
  const questions = useMemo(() => makeQuestions(t.questions), [t.questions]);
  const relatedLinks = useMemo(() => t.internalLinks.map((link) => ({ ...link, to: localePath(link.to) })), [localePath, t.internalLinks]);
  const canonical = `${CANONICAL_DOMAIN}${localePath("/herramientas/test-perfil-rim")}`;
  const [answers, setAnswers] = useState(initialAnswers);

  const result = useMemo(() => {
    const answerScore = (key: AnswerKey) => questions.find((q) => q.key === key)?.options.find((o) => o.value === answers[key])?.score ?? 0;
    const operational = answerScore("stock") + answerScore("pos") + answerScore("margin") + answerScore("team");
    const listSize = answers.listSize;
    const goal = answers.goal;

    let profile: ProfileKey = "pasivo";
    if (operational <= 2 || goal === "survive") profile = "superviviente";
    else if (goal === "identity" && operational >= 8) profile = "gourmet";
    else if (listSize === "large" && operational <= 8) profile = "coleccionista";
    else if (goal === "sell" && operational >= 9) profile = "estrategico";
    else if (listSize === "short" && goal === "sell") profile = "turistico";

    const maturity = Math.round(((operational + answerScore("listSize") + answerScore("goal")) / 18) * 100);
    return { profile, maturity: Math.min(100, Math.max(0, maturity)), operational };
  }, [answers, questions]);

  const data = t.profileData[result.profile];
  const tone = profileTones[result.profile];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={canonical}
        hreflang={allLangPaths("/herramientas/test-perfil-rim")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.breadcrumbTools, href: localePath("/herramientas") }, { label: t.breadcrumbCurrent }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.eyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {t.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.intro}
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Compass size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{t.diagnosticTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.diagnosticSubtitle}</p>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.key}>
                    <h3 className="font-semibold mb-3">{question.title}</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {question.options.map((option) => {
                        const selected = answers[question.key] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setAnswers((current) => ({ ...current, [question.key]: option.value }))}
                            className={`text-left rounded-lg border p-4 min-h-28 transition-all active:scale-[0.98] ${
                              selected ? "border-wine bg-wine/10" : "border-border bg-background/60 hover:border-wine/40"
                            }`}
                          >
                            <span className="block text-sm font-semibold">{option.label}</span>
                            <span className="block text-xs text-muted-foreground mt-2 leading-relaxed">{option.helper}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{t.resultLabel}</p>
                  <h2 className="font-heading text-2xl font-semibold">{data.label}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${tone}`}>
                  <CheckCircle size={14} />
                  {result.maturity}/100
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{data.summary}</p>

              <div className="rounded-lg border border-border bg-background/70 p-5 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-wine" />
                  <h3 className="font-heading text-xl font-semibold">{t.priorityTitle}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.priority}</p>
              </div>

              <div className="space-y-3 mb-6">
                {data.actions.map((action) => (
                  <div key={action} className="flex gap-3 rounded-lg bg-background/70 p-3">
                    <CheckCircle size={16} className="text-wine mt-0.5 shrink-0" />
                    <p className="text-sm">{action}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.metrics.maturity}</p>
                  <p className="text-2xl font-semibold mt-1">{result.maturity}%</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.metrics.operational}</p>
                  <p className="text-2xl font-semibold mt-1">{result.operational}/12</p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "test-perfil-rim")}
              >
                <Link to={localePath("/demo")}>
                  {t.primaryCta}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {t.cards.map((item, index) => {
              const Icon = cardIcons[index] || Wine;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{t.finalKicker}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.finalTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {t.finalText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/perfil-rim-restaurante")}>{t.downloadCta}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/producto/winerim-core")}>{t.productCta}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="test-perfil-rim"
          faqs={t.faqs}
        />

        <InternalLinks
          title={t.internalLinksTitle}
          links={relatedLinks}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TestPerfilRim;
