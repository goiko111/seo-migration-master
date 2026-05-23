import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, DollarSign, Target, TrendingUp,
  BarChart3, Layers, Users, Utensils, Search,
  Sparkles, CheckCircle, Scale, RotateCcw, Eye,
  ShoppingCart, GlassWater, Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

interface ProfitPrinciple { icon: typeof Scale; title: string; desc: string; }
interface PriceRange { range: string; label: string; pct: string; desc: string; }
interface SelectionFactor { icon: typeof Utensils; title: string; desc: string; }
interface PresentationTip { icon: typeof Eye; title: string; desc: string; }
interface TechBenefit { icon: typeof BarChart3; title: string; desc: string; }
interface ResultItem { value: string; label: string; desc: string; }
interface ProblemItem { icon: typeof DollarSign; text: string; }

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumb: string; badge: string;
  h1: string; heroSubtitle: string;
  ctaAnalyze: string; ctaDemo: string;
  introH2: string; introP1: string; introP2: string;
  principlesBadge: string; principlesH2: string; principlesDesc: string;
  wmBadge: string; wmH2: string; wmDesc: string; wmTip: string;
  selBadge: string; selH2: string; selDesc: string;
  presBadge: string; presH2: string; presDesc: string;
  techBadge: string; techH2: string; techDesc: string;
  resultsBadge: string; resultsH2: string; resultsDesc: string;
  ctaFinalH2: string; ctaFinalDesc: string; ctaFinalBtn: string; ctaFinalDemo: string;
  weightLabel: string;
  commonProblems: ProblemItem[];
  profitPrinciples: ProfitPrinciple[];
  priceRanges: PriceRange[];
  selectionFactors: SelectionFactor[];
  presentationTips: PresentationTip[];
  techBenefits: TechBenefit[];
  results: ResultItem[];
  links: { to: string; label: string; type: "guide" | "tool" | "resource" }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cómo Diseñar una Carta de Vinos Rentable | Guía para Restaurantes",
    metaDescription: "Aprende a diseñar una carta de vinos que maximice ventas y márgenes. Estrategias de pricing, wine mapping.",
    url: "https://winerim.wine/blog/como-disenar-carta-vinos-rentable",
    breadcrumb: "Carta de vinos rentable", badge: "Rentabilidad",
    h1: "Cómo diseñar una carta de vinos rentable",
    heroSubtitle: "Estrategias para estructurar tu carta de vinos de forma que aumente las ventas, mejore el ticket medio y optimice tus márgenes.",
    ctaAnalyze: "Analizar mi carta de vinos", ctaDemo: "Solicitar demo",
    introH2: "El vino: tu mayor oportunidad de rentabilidad",
    introP1: "El vino es uno de los productos con mayor margen en restauración. Sin embargo, muchas cartas de vinos no están diseñadas para maximizar su potencial. Precios sin estrategia, referencias que compiten entre sí, falta de guía para el cliente… son errores que cuestan dinero cada día.",
    introP2: "Diseñar una carta de vinos rentable no significa subir precios. Significa estructurar tu oferta de forma inteligente para que el cliente elija mejor, gaste más y repita.",
    principlesBadge: "Fundamentos", principlesH2: "Principios de una carta de vinos rentable",
    principlesDesc: "Antes de elegir vinos o poner precios, necesitas entender los principios que hacen que una carta funcione económicamente.",
    wmBadge: "Wine mapping", wmH2: "La importancia del wine mapping",
    wmDesc: "El wine mapping consiste en distribuir tus vinos en rangos de precio estratégicos. Cada rango debe tener un propósito, un porcentaje de la carta y un margen objetivo.",
    wmTip: "Evita los huecos de precio. Si pasas de 28€ a 52€ sin opciones intermedias, el cliente se siente empujado. La escalera de precios debe ser fluida, con 2-3 opciones en cada peldaño.",
    selBadge: "Selección", selH2: "Cómo elegir los vinos adecuados",
    selDesc: "Cada vino de tu carta debe cumplir una función. No se trata de poner los vinos que más te gustan, sino los que mejor funcionan para tu negocio.",
    presBadge: "Presentación", presH2: "Cómo presentar los vinos para vender más",
    presDesc: "La forma en que presentas el vino influye directamente en la decisión del cliente. Una buena presentación no solo informa, sino que guía hacia las opciones más rentables.",
    techBadge: "Winerim", techH2: "Cómo la tecnología optimiza tu rentabilidad",
    techDesc: "Herramientas como Winerim te permiten tomar decisiones basadas en datos, no en intuición. Analiza, optimiza y monitoriza tu carta de vinos en tiempo real.",
    resultsBadge: "Impacto", resultsH2: "Resultados de una carta bien diseñada",
    resultsDesc: "Los restaurantes que optimizan su carta de vinos con criterio y datos obtienen mejoras significativas en sus principales indicadores.",
    ctaFinalH2: "Descubre cómo optimizar la rentabilidad de tu carta de vinos",
    ctaFinalDesc: "Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas para maximizar tus ventas y márgenes.",
    ctaFinalBtn: "Solicitar análisis gratuito", ctaFinalDemo: "Solicitar demo",
    weightLabel: "Peso ideal en la carta:",
    commonProblems: [
      { icon: DollarSign, text: "Precios mal estructurados con saltos bruscos que desorientan al cliente" },
      { icon: Layers, text: "Demasiadas referencias similares que compiten entre sí y diluyen las ventas" },
      { icon: Target, text: "Falta de vinos estratégicos que guíen la decisión hacia opciones rentables" },
      { icon: Search, text: "Mala organización que dificulta la exploración y reduce el tiempo de decisión" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Equilibrio entre estilos", desc: "Una carta rentable no repite perfiles. Cada vino debe cubrir un nicho distinto: fresco, estructurado, aromático, potente. Si dos vinos se parecen demasiado, uno sobra." },
      { icon: DollarSign, title: "Variedad de rangos de precio", desc: "Tu carta necesita peldaños: entrada, medio, premium y alta gama. Sin huecos ni saltos. El cliente debe sentir que elige libremente, no que lo empujan." },
      { icon: Award, title: "Vinos ancla", desc: "1-2 vinos premium cuya función no es venderse, sino hacer que los vinos de rango medio parezcan una gran elección. El efecto ancla es una de las herramientas más potentes en pricing." },
      { icon: GlassWater, title: "Oferta clara por copa", desc: "El vino por copa es el motor de rentabilidad. Permite probar, reduce la barrera de entrada y genera márgenes superiores al 70%. Mínimo 6-8 opciones bien seleccionadas." },
    ],
    priceRanges: [
      { range: "20–30 €", label: "Entrada", pct: "30-35%", desc: "Vinos de rotación alta. El cliente que no quiere complicarse. Deben ser buenos, reconocibles y con buen margen." },
      { range: "30–50 €", label: "Zona media", pct: "35-40%", desc: "Aquí se concentra la mayor parte de las ventas. Vinos con personalidad, buena relación calidad-precio y margen óptimo." },
      { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Para ocasiones especiales y clientes que buscan algo diferente. Denominaciones reconocidas y productores de autor." },
      { range: "80 €+", label: "Alta gama", pct: "5-10%", desc: "Vinos ancla y grandes referencias. Baja rotación pero alta percepción de valor. Elevan el posicionamiento de toda la carta." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Tipo de cocina", desc: "Tu carta de vinos debe complementar tu cocina, no competir con ella. Una parrilla necesita tintos con cuerpo; una cocina asiática, blancos aromáticos y vinos con acidez." },
      { icon: Users, title: "Perfil del cliente", desc: "¿Tu cliente es un profesional del vino o alguien que busca disfrutar sin complicaciones? Esto define si necesitas profundidad o accesibilidad en tu selección." },
      { icon: DollarSign, title: "Ticket medio", desc: "Si tu ticket medio es de 40€, tu carta debe concentrar la oferta entre 20-50€ por botella. El vino debería representar un 30-40% del gasto total del comensal." },
      { icon: RotateCcw, title: "Rotación esperada", desc: "Cada referencia debe justificar su espacio en bodega. Si un vino no se vende al menos 2-3 veces al mes, plantéate sustituirlo por una opción más demandada." },
    ],
    presentationTips: [
      { icon: Eye, title: "Descripciones simples y evocadoras", desc: "Nada de jerga enológica. \"Fresco, con notas cítricas, ideal con pescado\" vende más que \"fermentación maloláctica parcial en barrica de roble francés\"." },
      { icon: Layers, title: "Categorías claras e intuitivas", desc: "Elige un criterio de organización y mantenlo. Por estilo funciona mejor que por región para la mayoría de clientes. Máximo 4-5 categorías principales." },
      { icon: Sparkles, title: "Recomendaciones destacadas", desc: "Señala 2-3 vinos por sección como \"selección del sommelier\" o \"mejor relación calidad-precio\". El cliente agradece la guía y tú diriges hacia los vinos más rentables." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Analizar la estructura de la carta", desc: "Visualiza la distribución por tipo, precio y estilo. Detecta desequilibrios, huecos de precio y oportunidades de mejora." },
      { icon: DollarSign, title: "Optimizar precios", desc: "Compara tus precios con el mercado, identifica vinos con margen bajo y ajusta la escalera de precios para maximizar la rentabilidad." },
      { icon: Target, title: "Identificar oportunidades", desc: "Descubre qué estilos o rangos de precio están infrarrepresentados en tu carta y dónde hay demanda sin cubrir." },
      { icon: TrendingUp, title: "Mejorar la rotación", desc: "Seguimiento de ventas por referencia. Identifica los vinos que no se mueven y toma decisiones basadas en datos reales." },
    ],
    results: [
      { value: "+18%", label: "Ticket medio", desc: "Aumento medio del gasto por mesa gracias a una carta mejor estructurada y con recomendaciones claras." },
      { value: "+25%", label: "Margen bruto", desc: "Mejora de márgenes optimizando la selección de vinos y ajustando la escalera de precios." },
      { value: "x2", label: "Rotación", desc: "Duplicación de la rotación media al eliminar referencias de baja venta y potenciar las de alta demanda." },
    ],
    links: [
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
      { to: "/wine-pricing-tool", label: "Herramienta de pricing", type: "tool" },
    ],
  },
  en: {
    metaTitle: "How to Design a Profitable Wine List | Restaurant Guide",
    metaDescription: "Learn how to design a wine list that maximizes sales and margins. Pricing strategies, wine mapping, wine selection and presentation for restaurants.",
    url: "https://winerim.wine/en/how-to-design-profitable-wine-list",
    breadcrumb: "Profitable wine list", badge: "Profitability",
    h1: "How to design a profitable wine list",
    heroSubtitle: "Strategies to structure your wine list in a way that boosts sales, raises the average ticket and optimizes your margins.",
    ctaAnalyze: "Analyze my wine list", ctaDemo: "Request demo",
    introH2: "Wine: your biggest profitability opportunity",
    introP1: "Wine is one of the highest-margin products in hospitality. Yet many wine lists aren't designed to maximize their potential. Unstrategic pricing, competing references, no guest guidance — these are mistakes that cost money every day.",
    introP2: "Designing a profitable wine list doesn't mean raising prices. It means structuring your offer intelligently so guests choose better, spend more and return.",
    principlesBadge: "Fundamentals", principlesH2: "Principles of a profitable wine list",
    principlesDesc: "Before selecting wines or setting prices, you need to understand the principles that make a wine list work economically.",
    wmBadge: "Wine mapping", wmH2: "The importance of wine mapping",
    wmDesc: "Wine mapping means distributing your wines across strategic price ranges. Each range should have a purpose, a percentage of the list and a target margin.",
    wmTip: "Avoid price gaps. If you jump from €28 to €52 with nothing in between, the guest feels pushed. The price ladder should be fluid, with 2-3 options at each step.",
    selBadge: "Selection", selH2: "How to choose the right wines",
    selDesc: "Every wine on your list must serve a function. It's not about listing your favorites, but the ones that work best for your business.",
    presBadge: "Presentation", presH2: "How to present wines to sell more",
    presDesc: "How you present wine directly influences the guest's decision. Good presentation doesn't just inform — it guides toward the most profitable options.",
    techBadge: "Winerim", techH2: "How technology optimizes your profitability",
    techDesc: "Tools like Winerim let you make data-driven decisions, not gut-based ones. Analyze, optimize and monitor your wine list in real time.",
    resultsBadge: "Impact", resultsH2: "Results of a well-designed list",
    resultsDesc: "Restaurants that optimize their wine list with criteria and data see significant improvements in their key metrics.",
    ctaFinalH2: "Discover how to optimize your wine list profitability",
    ctaFinalDesc: "We analyze your wine list for free and give you personalized recommendations to maximize your sales and margins.",
    ctaFinalBtn: "Request free analysis", ctaFinalDemo: "Request demo",
    weightLabel: "Ideal weight in the list:",
    commonProblems: [
      { icon: DollarSign, text: "Poorly structured prices with abrupt jumps that disorient the guest" },
      { icon: Layers, text: "Too many similar references competing with each other and diluting sales" },
      { icon: Target, text: "Lack of strategic wines that guide the decision toward profitable options" },
      { icon: Search, text: "Poor organization that hinders exploration and reduces decision time" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Balance between styles", desc: "A profitable list doesn't repeat profiles. Each wine should cover a distinct niche: fresh, structured, aromatic, powerful. If two wines are too similar, one is redundant." },
      { icon: DollarSign, title: "Price range variety", desc: "Your list needs steps: entry, mid, premium and top. No gaps or jumps. The guest should feel they're choosing freely, not being pushed." },
      { icon: Award, title: "Anchor wines", desc: "1-2 premium wines whose function isn't to sell, but to make mid-range wines look like a great choice. The anchor effect is one of the most powerful pricing tools." },
      { icon: GlassWater, title: "Clear by-the-glass offer", desc: "Wine by the glass is the profitability engine. It lets guests try, lowers the barrier to entry and generates margins above 70%. Minimum 6-8 well-selected options." },
    ],
    priceRanges: [
      { range: "€20–30", label: "Entry", pct: "30-35%", desc: "High-rotation wines. The guest who doesn't want to overthink. Should be good, recognizable and with solid margins." },
      { range: "€30–50", label: "Mid-range", pct: "35-40%", desc: "Where most sales concentrate. Wines with personality, great value and optimal margin." },
      { range: "€50–80", label: "Premium", pct: "15-20%", desc: "For special occasions and guests seeking something different. Recognized appellations and signature producers." },
      { range: "€80+", label: "High-end", pct: "5-10%", desc: "Anchor wines and iconic references. Low rotation but high perceived value. They elevate the positioning of the entire list." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Cuisine type", desc: "Your wine list should complement your cuisine, not compete with it. A steakhouse needs full-bodied reds; Asian cuisine needs aromatic whites and wines with acidity." },
      { icon: Users, title: "Guest profile", desc: "Is your guest a wine professional or someone looking to enjoy without complications? This defines whether you need depth or accessibility in your selection." },
      { icon: DollarSign, title: "Average ticket", desc: "If your average ticket is €40, your list should concentrate between €20-50 per bottle. Wine should represent 30-40% of the diner's total spend." },
      { icon: RotateCcw, title: "Expected rotation", desc: "Each reference must justify its cellar space. If a wine doesn't sell at least 2-3 times per month, consider replacing it with a more in-demand option." },
    ],
    presentationTips: [
      { icon: Eye, title: "Simple, evocative descriptions", desc: "No oenological jargon. 'Fresh, with citrus notes, ideal with fish' sells more than 'partial malolactic fermentation in French oak barrels'." },
      { icon: Layers, title: "Clear, intuitive categories", desc: "Choose one organizing criterion and stick to it. By style works better than by region for most guests. Maximum 4-5 main categories." },
      { icon: Sparkles, title: "Highlighted recommendations", desc: "Mark 2-3 wines per section as 'sommelier's pick' or 'best value'. The guest appreciates the guidance and you steer toward the most profitable wines." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Analyze list structure", desc: "Visualize distribution by type, price and style. Detect imbalances, price gaps and improvement opportunities." },
      { icon: DollarSign, title: "Optimize pricing", desc: "Compare your prices with the market, identify low-margin wines and adjust the price ladder to maximize profitability." },
      { icon: Target, title: "Identify opportunities", desc: "Discover which styles or price ranges are underrepresented in your list and where there's unmet demand." },
      { icon: TrendingUp, title: "Improve rotation", desc: "Track sales by reference. Identify wines that don't move and make decisions based on real data." },
    ],
    results: [
      { value: "+18%", label: "Average ticket", desc: "Average increase in spend per table thanks to a better-structured list with clear recommendations." },
      { value: "+25%", label: "Gross margin", desc: "Margin improvement by optimizing wine selection and adjusting the price ladder." },
      { value: "x2", label: "Rotation", desc: "Doubling average rotation by removing low-selling references and boosting high-demand ones." },
    ],
    links: [
      { to: "/en/wine-pricing-restaurant", label: "How to price wine", type: "guide" },
      { to: "/en/wine-margin-calculator", label: "Margin calculator", type: "tool" },
      { to: "/en/resources/wine-mapping-template", label: "Wine mapping template", type: "resource" },
      { to: "/en/wine-pricing-tool", label: "Pricing tool", type: "tool" },
    ],
  },
  it: {
    metaTitle: "Come Progettare una Carta dei Vini Redditizia | Guida per Ristoranti",
    metaDescription: "Scopri come progettare una carta dei vini che massimizzi vendite e margini. Strategie di pricing, wine mapping.",
    url: "https://winerim.wine/it/come-progettare-carta-vini-redditizia",
    breadcrumb: "Carta dei vini redditizia", badge: "Redditività",
    h1: "Come progettare una carta dei vini redditizia",
    heroSubtitle: "Strategie per strutturare la tua carta dei vini in modo da aumentare le vendite, migliorare lo scontrino medio e ottimizzare i margini.",
    ctaAnalyze: "Analizza la mia carta", ctaDemo: "Richiedi demo",
    introH2: "Il vino: la tua più grande opportunità di redditività",
    introP1: "Il vino è uno dei prodotti con il margine più alto nella ristorazione. Eppure molte carte dei vini non sono progettate per massimizzare il loro potenziale. Prezzi senza strategia, referenze che competono tra loro, mancanza di guida per il cliente… sono errori che costano denaro ogni giorno.",
    introP2: "Progettare una carta dei vini redditizia non significa alzare i prezzi. Significa strutturare la tua offerta in modo intelligente perché il cliente scelga meglio, spenda di più e torni.",
    principlesBadge: "Fondamenti", principlesH2: "Principi di una carta dei vini redditizia",
    principlesDesc: "Prima di scegliere vini o fissare prezzi, devi capire i principi che fanno funzionare una carta economicamente.",
    wmBadge: "Wine mapping", wmH2: "L'importanza del wine mapping",
    wmDesc: "Il wine mapping consiste nel distribuire i vini in fasce di prezzo strategiche. Ogni fascia deve avere uno scopo, una percentuale della carta e un margine obiettivo.",
    wmTip: "Evita i vuoti di prezzo. Se passi da 28€ a 52€ senza opzioni intermedie, il cliente si sente spinto. La scala dei prezzi deve essere fluida, con 2-3 opzioni per ogni gradino.",
    selBadge: "Selezione", selH2: "Come scegliere i vini giusti",
    selDesc: "Ogni vino nella tua carta deve avere una funzione. Non si tratta di inserire i vini che preferisci, ma quelli che funzionano meglio per il tuo business.",
    presBadge: "Presentazione", presH2: "Come presentare i vini per vendere di più",
    presDesc: "Il modo in cui presenti il vino influenza direttamente la decisione del cliente. Una buona presentazione non solo informa, ma guida verso le opzioni più redditizie.",
    techBadge: "Winerim", techH2: "Come la tecnologia ottimizza la tua redditività",
    techDesc: "Strumenti come Winerim ti permettono di prendere decisioni basate sui dati, non sull'intuizione. Analizza, ottimizza e monitora la tua carta dei vini in tempo reale.",
    resultsBadge: "Impatto", resultsH2: "Risultati di una carta ben progettata",
    resultsDesc: "I ristoranti che ottimizzano la carta dei vini con criterio e dati ottengono miglioramenti significativi nei loro indicatori chiave.",
    ctaFinalH2: "Scopri come ottimizzare la redditività della tua carta dei vini",
    ctaFinalDesc: "Analizziamo la tua carta dei vini gratuitamente e ti diamo raccomandazioni personalizzate per massimizzare vendite e margini.",
    ctaFinalBtn: "Richiedi analisi gratuita", ctaFinalDemo: "Richiedi demo",
    weightLabel: "Peso ideale nella carta:",
    commonProblems: [
      { icon: DollarSign, text: "Prezzi mal strutturati con salti bruschi che disorientano il cliente" },
      { icon: Layers, text: "Troppe referenze simili che competono tra loro e diluiscono le vendite" },
      { icon: Target, text: "Mancanza di vini strategici che guidino la decisione verso opzioni redditizie" },
      { icon: Search, text: "Cattiva organizzazione che ostacola l'esplorazione e riduce il tempo di decisione" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Equilibrio tra stili", desc: "Una carta redditizia non ripete profili. Ogni vino deve coprire una nicchia distinta: fresco, strutturato, aromatico, potente. Se due vini si somigliano troppo, uno è di troppo." },
      { icon: DollarSign, title: "Varietà di fasce di prezzo", desc: "La tua carta ha bisogno di gradini: ingresso, medio, premium e alta gamma. Senza vuoti né salti. Il cliente deve sentire di scegliere liberamente." },
      { icon: Award, title: "Vini àncora", desc: "1-2 vini premium la cui funzione non è vendersi, ma far sembrare i vini di fascia media un'ottima scelta. L'effetto àncora è uno degli strumenti più potenti nel pricing." },
      { icon: GlassWater, title: "Offerta chiara al calice", desc: "Il vino al calice è il motore della redditività. Permette di assaggiare, riduce la barriera d'ingresso e genera margini superiori al 70%. Minimo 6-8 opzioni ben selezionate." },
    ],
    priceRanges: [
      { range: "20–30 €", label: "Ingresso", pct: "30-35%", desc: "Vini ad alta rotazione. Il cliente che non vuole complicarsi. Devono essere buoni, riconoscibili e con buon margine." },
      { range: "30–50 €", label: "Fascia media", pct: "35-40%", desc: "Qui si concentra la maggior parte delle vendite. Vini con personalità, buon rapporto qualità-prezzo e margine ottimale." },
      { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Per occasioni speciali e clienti che cercano qualcosa di diverso. Denominazioni riconosciute e produttori d'autore." },
      { range: "80 €+", label: "Alta gamma", pct: "5-10%", desc: "Vini àncora e grandi referenze. Bassa rotazione ma alta percezione di valore. Elevano il posizionamento di tutta la carta." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Tipo di cucina", desc: "La tua carta dei vini deve complementare la cucina, non competere con essa. Una griglia ha bisogno di rossi corposi; una cucina asiatica di bianchi aromatici e vini con acidità." },
      { icon: Users, title: "Profilo del cliente", desc: "Il tuo cliente è un professionista del vino o qualcuno che cerca di godersi senza complicazioni? Questo definisce se hai bisogno di profondità o accessibilità nella selezione." },
      { icon: DollarSign, title: "Scontrino medio", desc: "Se il tuo scontrino medio è di 40€, la tua carta deve concentrare l'offerta tra 20-50€ a bottiglia. Il vino dovrebbe rappresentare il 30-40% della spesa totale del commensale." },
      { icon: RotateCcw, title: "Rotazione attesa", desc: "Ogni referenza deve giustificare il suo spazio in cantina. Se un vino non si vende almeno 2-3 volte al mese, considera di sostituirlo con un'opzione più richiesta." },
    ],
    presentationTips: [
      { icon: Eye, title: "Descrizioni semplici ed evocative", desc: "Niente gergo enologico. 'Fresco, con note agrumate, ideale con il pesce' vende di più di 'fermentazione malolattica parziale in barrique di rovere francese'." },
      { icon: Layers, title: "Categorie chiare e intuitive", desc: "Scegli un criterio di organizzazione e mantienilo. Per stile funziona meglio che per regione per la maggior parte dei clienti. Massimo 4-5 categorie principali." },
      { icon: Sparkles, title: "Raccomandazioni in evidenza", desc: "Segnala 2-3 vini per sezione come 'selezione del sommelier' o 'miglior rapporto qualità-prezzo'. Il cliente apprezza la guida e tu dirigi verso i vini più redditizi." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Analizzare la struttura della carta", desc: "Visualizza la distribuzione per tipo, prezzo e stile. Rileva squilibri, vuoti di prezzo e opportunità di miglioramento." },
      { icon: DollarSign, title: "Ottimizzare i prezzi", desc: "Confronta i tuoi prezzi con il mercato, identifica vini a basso margine e aggiusta la scala dei prezzi per massimizzare la redditività." },
      { icon: Target, title: "Identificare opportunità", desc: "Scopri quali stili o fasce di prezzo sono sottorappresentati nella tua carta e dove c'è domanda non soddisfatta." },
      { icon: TrendingUp, title: "Migliorare la rotazione", desc: "Monitoraggio vendite per referenza. Identifica i vini che non si muovono e prendi decisioni basate su dati reali." },
    ],
    results: [
      { value: "+18%", label: "Scontrino medio", desc: "Aumento medio della spesa per tavolo grazie a una carta meglio strutturata e con raccomandazioni chiare." },
      { value: "+25%", label: "Margine lordo", desc: "Miglioramento dei margini ottimizzando la selezione dei vini e aggiustando la scala dei prezzi." },
      { value: "x2", label: "Rotazione", desc: "Raddoppio della rotazione media eliminando referenze a bassa vendita e potenziando quelle ad alta domanda." },
    ],
    links: [
      { to: "/it/prezzo-vino-ristorante", label: "Come fissare il prezzo del vino", type: "guide" },
      { to: "/it/calcolatrice-margini-vino", label: "Calcolatrice margini", type: "tool" },
      { to: "/it/risorse/modello-wine-mapping", label: "Modello wine mapping", type: "resource" },
      { to: "/it/strumenti/wine-pricing", label: "Strumento di pricing", type: "tool" },
    ],
  },
  fr: {
    metaTitle: "Comment Concevoir une Carte des Vins Rentable | Guide Restaurant",
    metaDescription: "Apprenez à concevoir une carte des vins qui maximise ventes et marges. Stratégies de pricing, wine mapping.",
    url: "https://winerim.wine/fr/comment-concevoir-carte-vins-rentable",
    breadcrumb: "Carte des vins rentable", badge: "Rentabilité",
    h1: "Comment concevoir une carte des vins rentable",
    heroSubtitle: "Stratégies pour structurer votre carte des vins de manière à augmenter les ventes, améliorer le ticket moyen et optimiser vos marges.",
    ctaAnalyze: "Analyser ma carte", ctaDemo: "Demander une démo",
    introH2: "Le vin : votre plus grande opportunité de rentabilité",
    introP1: "Le vin est l'un des produits à plus forte marge en restauration. Pourtant, beaucoup de cartes ne sont pas conçues pour maximiser leur potentiel. Prix sans stratégie, références qui se concurrencent, absence de guide pour le client… autant d'erreurs qui coûtent de l'argent chaque jour.",
    introP2: "Concevoir une carte des vins rentable ne signifie pas augmenter les prix. Cela signifie structurer votre offre intelligemment pour que le client choisisse mieux, dépense plus et revienne.",
    principlesBadge: "Fondamentaux", principlesH2: "Principes d'une carte des vins rentable",
    principlesDesc: "Avant de sélectionner des vins ou de fixer des prix, vous devez comprendre les principes qui font qu'une carte fonctionne économiquement.",
    wmBadge: "Wine mapping", wmH2: "L'importance du wine mapping",
    wmDesc: "Le wine mapping consiste à répartir vos vins en tranches de prix stratégiques. Chaque tranche doit avoir un objectif, un pourcentage de la carte et une marge cible.",
    wmTip: "Évitez les trous de prix. Si vous passez de 28€ à 52€ sans options intermédiaires, le client se sent poussé. L'échelle de prix doit être fluide, avec 2-3 options à chaque échelon.",
    selBadge: "Sélection", selH2: "Comment choisir les bons vins",
    selDesc: "Chaque vin de votre carte doit remplir une fonction. Il ne s'agit pas de mettre vos vins préférés, mais ceux qui fonctionnent le mieux pour votre activité.",
    presBadge: "Présentation", presH2: "Comment présenter les vins pour vendre plus",
    presDesc: "La façon dont vous présentez le vin influence directement la décision du client. Une bonne présentation ne se contente pas d'informer, elle guide vers les options les plus rentables.",
    techBadge: "Winerim", techH2: "Comment la technologie optimise votre rentabilité",
    techDesc: "Des outils comme Winerim vous permettent de prendre des décisions basées sur les données, pas sur l'intuition. Analysez, optimisez et surveillez votre carte en temps réel.",
    resultsBadge: "Impact", resultsH2: "Résultats d'une carte bien conçue",
    resultsDesc: "Les restaurants qui optimisent leur carte des vins avec critère et données obtiennent des améliorations significatives de leurs indicateurs clés.",
    ctaFinalH2: "Découvrez comment optimiser la rentabilité de votre carte des vins",
    ctaFinalDesc: "Nous analysons votre carte des vins gratuitement et vous donnons des recommandations personnalisées pour maximiser vos ventes et marges.",
    ctaFinalBtn: "Demander une analyse gratuite", ctaFinalDemo: "Demander une démo",
    weightLabel: "Poids idéal dans la carte :",
    commonProblems: [
      { icon: DollarSign, text: "Prix mal structurés avec des sauts brusques qui désorientent le client" },
      { icon: Layers, text: "Trop de références similaires qui se concurrencent et diluent les ventes" },
      { icon: Target, text: "Manque de vins stratégiques qui guident la décision vers des options rentables" },
      { icon: Search, text: "Mauvaise organisation qui freine l'exploration et réduit le temps de décision" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Équilibre entre les styles", desc: "Une carte rentable ne répète pas les profils. Chaque vin doit couvrir une niche distincte : frais, structuré, aromatique, puissant. Si deux vins se ressemblent trop, l'un est de trop." },
      { icon: DollarSign, title: "Variété de tranches de prix", desc: "Votre carte a besoin d'échelons : entrée, milieu, premium et haut de gamme. Sans trous ni sauts. Le client doit sentir qu'il choisit librement." },
      { icon: Award, title: "Vins d'ancrage", desc: "1-2 vins premium dont la fonction n'est pas de se vendre, mais de faire paraître les vins de gamme moyenne comme un excellent choix. L'effet d'ancrage est l'un des outils les plus puissants en pricing." },
      { icon: GlassWater, title: "Offre claire au verre", desc: "Le vin au verre est le moteur de rentabilité. Il permet de goûter, réduit la barrière à l'entrée et génère des marges supérieures à 70%. Minimum 6-8 options bien sélectionnées." },
    ],
    priceRanges: [
      { range: "20–30 €", label: "Entrée", pct: "30-35%", desc: "Vins à forte rotation. Le client qui ne veut pas se compliquer. Doivent être bons, reconnaissables et avec une bonne marge." },
      { range: "30–50 €", label: "Milieu de gamme", pct: "35-40%", desc: "C'est là que se concentre la majorité des ventes. Vins avec du caractère, bon rapport qualité-prix et marge optimale." },
      { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Pour les occasions spéciales et les clients en quête de différence. Appellations reconnues et producteurs d'auteur." },
      { range: "80 €+", label: "Haut de gamme", pct: "5-10%", desc: "Vins d'ancrage et grandes références. Faible rotation mais forte perception de valeur. Ils élèvent le positionnement de toute la carte." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Type de cuisine", desc: "Votre carte des vins doit compléter votre cuisine, pas la concurrencer. Un grill a besoin de rouges corsés ; une cuisine asiatique, de blancs aromatiques et de vins avec de l'acidité." },
      { icon: Users, title: "Profil du client", desc: "Votre client est-il un professionnel du vin ou quelqu'un qui cherche à profiter sans se compliquer ? Cela définit si vous avez besoin de profondeur ou d'accessibilité." },
      { icon: DollarSign, title: "Ticket moyen", desc: "Si votre ticket moyen est de 40€, votre carte doit concentrer l'offre entre 20-50€ la bouteille. Le vin devrait représenter 30-40% de la dépense totale du convive." },
      { icon: RotateCcw, title: "Rotation attendue", desc: "Chaque référence doit justifier sa place en cave. Si un vin ne se vend pas au moins 2-3 fois par mois, envisagez de le remplacer par une option plus demandée." },
    ],
    presentationTips: [
      { icon: Eye, title: "Descriptions simples et évocatrices", desc: "Pas de jargon œnologique. 'Frais, notes d'agrumes, idéal avec le poisson' vend plus que 'fermentation malolactique partielle en fût de chêne français'." },
      { icon: Layers, title: "Catégories claires et intuitives", desc: "Choisissez un critère d'organisation et maintenez-le. Par style fonctionne mieux que par région pour la plupart des clients. Maximum 4-5 catégories principales." },
      { icon: Sparkles, title: "Recommandations mises en avant", desc: "Signalez 2-3 vins par section comme 'coup de cœur du sommelier' ou 'meilleur rapport qualité-prix'. Le client apprécie le guide et vous orientez vers les vins les plus rentables." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Analyser la structure de la carte", desc: "Visualisez la répartition par type, prix et style. Détectez les déséquilibres, les trous de prix et les opportunités d'amélioration." },
      { icon: DollarSign, title: "Optimiser les prix", desc: "Comparez vos prix avec le marché, identifiez les vins à faible marge et ajustez l'échelle de prix pour maximiser la rentabilité." },
      { icon: Target, title: "Identifier les opportunités", desc: "Découvrez quels styles ou tranches de prix sont sous-représentés dans votre carte et où la demande n'est pas satisfaite." },
      { icon: TrendingUp, title: "Améliorer la rotation", desc: "Suivi des ventes par référence. Identifiez les vins qui ne bougent pas et prenez des décisions basées sur des données réelles." },
    ],
    results: [
      { value: "+18%", label: "Ticket moyen", desc: "Augmentation moyenne de la dépense par table grâce à une carte mieux structurée et des recommandations claires." },
      { value: "+25%", label: "Marge brute", desc: "Amélioration des marges en optimisant la sélection de vins et en ajustant l'échelle de prix." },
      { value: "x2", label: "Rotation", desc: "Doublement de la rotation moyenne en éliminant les références à faible vente et en renforçant celles à forte demande." },
    ],
    links: [
      { to: "/fr/prix-vin-restaurant", label: "Comment fixer le prix du vin", type: "guide" },
      { to: "/fr/calculateur-marge-vin", label: "Calculateur de marges", type: "tool" },
      { to: "/fr/ressources/modele-wine-mapping", label: "Modèle wine mapping", type: "resource" },
      { to: "/fr/outils/wine-pricing", label: "Outil de pricing", type: "tool" },
    ],
  },
  de: {
    metaTitle: "Wie man eine rentable Weinkarte gestaltet | Leitfaden für Restaurants",
    metaDescription: "Lernen Sie, eine Weinkarte zu gestalten, die Umsatz und Marge maximiert. Preisstrategien, Wine Mapping.",
    url: "https://winerim.wine/de/wie-rentable-weinkarte-gestalten",
    breadcrumb: "Rentable Weinkarte", badge: "Rentabilität",
    h1: "Wie man eine rentable Weinkarte gestaltet",
    heroSubtitle: "Strategien, um Ihre Weinkarte so zu strukturieren, dass Umsatz steigt, der Durchschnittsbon wächst und Ihre Margen optimiert werden.",
    ctaAnalyze: "Meine Karte analysieren", ctaDemo: "Demo anfragen",
    introH2: "Wein: Ihre größte Rentabilitätschance",
    introP1: "Wein ist eines der margenstärksten Produkte in der Gastronomie. Trotzdem sind viele Karten nicht darauf ausgelegt, sein Potenzial zu maximieren. Preise ohne Strategie, Referenzen, die miteinander konkurrieren, keine Orientierung für den Gast — Fehler, die täglich Geld kosten.",
    introP2: "Eine rentable Weinkarte zu gestalten bedeutet nicht, Preise zu erhöhen. Es bedeutet, Ihr Angebot intelligent zu strukturieren, damit der Gast besser wählt, mehr ausgibt und wiederkommt.",
    principlesBadge: "Grundlagen", principlesH2: "Prinzipien einer rentablen Weinkarte",
    principlesDesc: "Bevor Sie Weine auswählen oder Preise festlegen, müssen Sie die Prinzipien verstehen, die eine Karte wirtschaftlich funktionieren lassen.",
    wmBadge: "Wine Mapping", wmH2: "Die Bedeutung des Wine Mapping",
    wmDesc: "Wine Mapping bedeutet, Ihre Weine auf strategische Preisstufen zu verteilen. Jede Stufe braucht ein Ziel, einen Prozentsatz der Karte und eine Zielmarge.",
    wmTip: "Vermeiden Sie Preislücken. Wenn Sie von 28 € auf 52 € springen, ohne Zwischenoptionen, fühlt sich der Gast gedrängt. Die Preisskala muss fließend sein, mit 2-3 Optionen pro Stufe.",
    selBadge: "Auswahl", selH2: "Wie man die richtigen Weine auswählt",
    selDesc: "Jeder Wein auf Ihrer Karte muss eine Funktion erfüllen. Es geht nicht darum, Ihre Lieblingsweine aufzuführen, sondern die, die für Ihr Geschäft am besten funktionieren.",
    presBadge: "Präsentation", presH2: "Wie man Weine präsentiert, um mehr zu verkaufen",
    presDesc: "Die Art, wie Sie Wein präsentieren, beeinflusst direkt die Entscheidung des Gastes. Eine gute Präsentation informiert nicht nur, sie lenkt zu den rentabelsten Optionen.",
    techBadge: "Winerim", techH2: "Wie Technologie Ihre Rentabilität optimiert",
    techDesc: "Tools wie Winerim ermöglichen datenbasierte statt intuitiver Entscheidungen. Analysieren, optimieren und überwachen Sie Ihre Karte in Echtzeit.",
    resultsBadge: "Wirkung", resultsH2: "Ergebnisse einer gut gestalteten Karte",
    resultsDesc: "Restaurants, die ihre Weinkarte mit Kriterium und Daten optimieren, erzielen signifikante Verbesserungen bei Schlüsselkennzahlen.",
    ctaFinalH2: "Entdecken Sie, wie Sie die Rentabilität Ihrer Weinkarte optimieren",
    ctaFinalDesc: "Wir analysieren Ihre Weinkarte kostenlos und geben personalisierte Empfehlungen, um Umsatz und Marge zu maximieren.",
    ctaFinalBtn: "Kostenlose Analyse anfragen", ctaFinalDemo: "Demo anfragen",
    weightLabel: "Idealer Anteil an der Karte:",
    commonProblems: [
      { icon: DollarSign, text: "Schlecht strukturierte Preise mit abrupten Sprüngen, die den Gast verunsichern" },
      { icon: Layers, text: "Zu viele ähnliche Referenzen, die konkurrieren und Verkäufe verwässern" },
      { icon: Target, text: "Fehlen strategischer Weine, die die Entscheidung zu rentablen Optionen lenken" },
      { icon: Search, text: "Schlechte Organisation, die das Erkunden hemmt und die Entscheidungszeit reduziert" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Balance zwischen Stilen", desc: "Eine rentable Karte wiederholt keine Profile. Jeder Wein muss eine eigene Nische abdecken: frisch, strukturiert, aromatisch, kraftvoll. Wenn zwei Weine zu ähnlich sind, ist einer überflüssig." },
      { icon: DollarSign, title: "Vielfalt an Preisstufen", desc: "Ihre Karte braucht Stufen: Einstieg, Mitte, Premium und Top-Segment. Ohne Lücken oder Sprünge. Der Gast muss spüren, dass er frei wählt." },
      { icon: Award, title: "Ankerweine", desc: "1-2 Premium-Weine, deren Funktion nicht der Verkauf ist, sondern Weine der Mittelklasse attraktiver erscheinen zu lassen. Der Ankereffekt ist eines der stärksten Pricing-Werkzeuge." },
      { icon: GlassWater, title: "Klares Angebot im Glas", desc: "Wein im Glas ist der Rentabilitätsmotor. Er ermöglicht Probieren, senkt die Einstiegshürde und erzeugt Margen über 70%. Mindestens 6-8 gut ausgewählte Optionen." },
    ],
    priceRanges: [
      { range: "20–30 €", label: "Einstieg", pct: "30-35%", desc: "Weine mit hoher Rotation. Für Gäste, die es unkompliziert mögen. Müssen gut, wiedererkennbar und mit guter Marge sein." },
      { range: "30–50 €", label: "Mittelklasse", pct: "35-40%", desc: "Hier konzentriert sich der Großteil der Verkäufe. Charakterweine, gutes Preis-Leistungs-Verhältnis und optimale Marge." },
      { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Für besondere Anlässe und Gäste, die etwas Besonderes suchen. Anerkannte Appellationen und Autorenwinzer." },
      { range: "80 €+", label: "Top-Segment", pct: "5-10%", desc: "Ankerweine und große Referenzen. Niedrige Rotation, aber hohe Wertwahrnehmung. Sie heben das Niveau der gesamten Karte." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Küchenstil", desc: "Ihre Weinkarte muss Ihre Küche ergänzen, nicht konkurrieren. Ein Grillhaus braucht kräftige Rotweine; asiatische Küche aromatische Weißweine mit Säure." },
      { icon: Users, title: "Gästeprofil", desc: "Ist Ihr Gast ein Wein-Profi oder jemand, der unkompliziert genießen will? Das entscheidet, ob Sie Tiefe oder Zugänglichkeit brauchen." },
      { icon: DollarSign, title: "Durchschnittsbon", desc: "Beträgt Ihr Durchschnittsbon 40 €, sollte die Karte das Angebot zwischen 20-50 € pro Flasche konzentrieren. Wein sollte 30-40% der Gesamtausgabe ausmachen." },
      { icon: RotateCcw, title: "Erwartete Rotation", desc: "Jede Referenz muss ihren Platz im Keller rechtfertigen. Verkauft sich ein Wein nicht mindestens 2-3 Mal pro Monat, erwägen Sie, ihn durch eine gefragtere Option zu ersetzen." },
    ],
    presentationTips: [
      { icon: Eye, title: "Einfache, evocative Beschreibungen", desc: "Kein önologisches Fachchinesisch. 'Frisch, Zitrusnoten, ideal zu Fisch' verkauft mehr als 'partielle malolaktische Gärung im französischen Eichenfass'." },
      { icon: Layers, title: "Klare, intuitive Kategorien", desc: "Wählen Sie ein Organisationskriterium und halten Sie es bei. Nach Stil funktioniert für die meisten Gäste besser als nach Region. Maximal 4-5 Hauptkategorien." },
      { icon: Sparkles, title: "Hervorgehobene Empfehlungen", desc: "Markieren Sie 2-3 Weine pro Sektion als 'Favorit des Sommeliers' oder 'bestes Preis-Leistungs-Verhältnis'. Der Gast schätzt die Orientierung und Sie lenken zu den rentabelsten Weinen." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Kartenstruktur analysieren", desc: "Visualisieren Sie die Verteilung nach Typ, Preis und Stil. Erkennen Sie Ungleichgewichte, Preislücken und Verbesserungschancen." },
      { icon: DollarSign, title: "Preise optimieren", desc: "Vergleichen Sie Ihre Preise mit dem Markt, identifizieren Sie Weine mit geringer Marge und passen Sie die Preisskala an, um die Rentabilität zu maximieren." },
      { icon: Target, title: "Chancen erkennen", desc: "Finden Sie heraus, welche Stile oder Preisstufen in Ihrer Karte unterrepräsentiert sind und wo die Nachfrage nicht gedeckt wird." },
      { icon: TrendingUp, title: "Rotation verbessern", desc: "Verkaufstracking pro Referenz. Erkennen Sie, welche Weine sich nicht bewegen, und treffen Sie Entscheidungen auf Basis realer Daten." },
    ],
    results: [
      { value: "+18%", label: "Durchschnittsbon", desc: "Durchschnittlicher Anstieg der Ausgabe pro Tisch dank besser strukturierter Karte und klarer Empfehlungen." },
      { value: "+25%", label: "Bruttomarge", desc: "Margenverbesserung durch optimierte Weinauswahl und angepasste Preisskala." },
      { value: "x2", label: "Rotation", desc: "Verdopplung der durchschnittlichen Rotation durch Eliminierung schwach verkaufter Referenzen und Stärkung stark nachgefragter." },
    ],
    links: [
      { to: "/de/wein-preise-restaurant", label: "Wie man Weinpreise festlegt", type: "guide" },
      { to: "/de/margen-rechner-wein", label: "Margen-Rechner", type: "tool" },
      { to: "/de/ressourcen/wine-mapping-vorlage", label: "Wine Mapping Vorlage", type: "resource" },
      { to: "/de/tools/wine-pricing", label: "Pricing-Tool", type: "tool" },
    ],
  },
  pt: {
    metaTitle: "Como Desenhar uma Carta de Vinhos Rentável | Guia para Restaurantes",
    metaDescription: "Aprenda a desenhar uma carta de vinhos que maximize vendas e margens. Estratégias de pricing, wine mapping.",
    url: "https://winerim.wine/pt/como-desenhar-carta-vinhos-rentavel",
    breadcrumb: "Carta de vinhos rentável", badge: "Rentabilidade",
    h1: "Como desenhar uma carta de vinhos rentável",
    heroSubtitle: "Estratégias para estruturar a sua carta de vinhos de forma a aumentar as vendas, melhorar o ticket médio e otimizar as suas margens.",
    ctaAnalyze: "Analisar a minha carta", ctaDemo: "Pedir demo",
    introH2: "O vinho: a sua maior oportunidade de rentabilidade",
    introP1: "O vinho é um dos produtos de maior margem na restauração. No entanto, muitas cartas não estão pensadas para maximizar o seu potencial. Preços sem estratégia, referências que competem entre si, ausência de orientação para o cliente… erros que custam dinheiro todos os dias.",
    introP2: "Desenhar uma carta de vinhos rentável não significa subir preços. Significa estruturar a sua oferta de forma inteligente para que o cliente escolha melhor, gaste mais e regresse.",
    principlesBadge: "Fundamentos", principlesH2: "Princípios de uma carta de vinhos rentável",
    principlesDesc: "Antes de selecionar vinhos ou fixar preços, precisa de perceber os princípios que fazem uma carta funcionar economicamente.",
    wmBadge: "Wine mapping", wmH2: "A importância do wine mapping",
    wmDesc: "O wine mapping consiste em distribuir os seus vinhos por gamas de preço estratégicas. Cada gama deve ter um objetivo, uma percentagem da carta e uma margem-alvo.",
    wmTip: "Evite buracos de preço. Se salta de 28€ para 52€ sem opções intermédias, o cliente sente-se empurrado. A escala de preços deve ser fluida, com 2-3 opções em cada patamar.",
    selBadge: "Seleção", selH2: "Como escolher os vinhos certos",
    selDesc: "Cada vinho da sua carta deve cumprir uma função. Não se trata de pôr os seus vinhos preferidos, mas aqueles que funcionam melhor para o negócio.",
    presBadge: "Apresentação", presH2: "Como apresentar os vinhos para vender mais",
    presDesc: "A forma como apresenta o vinho influencia diretamente a decisão do cliente. Uma boa apresentação não se limita a informar, orienta para as opções mais rentáveis.",
    techBadge: "Winerim", techH2: "Como a tecnologia otimiza a sua rentabilidade",
    techDesc: "Ferramentas como a Winerim permitem tomar decisões baseadas em dados, não em intuição. Analise, otimize e monitorize a sua carta em tempo real.",
    resultsBadge: "Impacto", resultsH2: "Resultados de uma carta bem desenhada",
    resultsDesc: "Os restaurantes que otimizam a sua carta de vinhos com critério e dados obtêm melhorias significativas nos indicadores-chave.",
    ctaFinalH2: "Descubra como otimizar a rentabilidade da sua carta de vinhos",
    ctaFinalDesc: "Analisamos gratuitamente a sua carta de vinhos e damos-lhe recomendações personalizadas para maximizar vendas e margens.",
    ctaFinalBtn: "Pedir análise gratuita", ctaFinalDemo: "Pedir demo",
    weightLabel: "Peso ideal na carta:",
    commonProblems: [
      { icon: DollarSign, text: "Preços mal estruturados com saltos bruscos que desorientam o cliente" },
      { icon: Layers, text: "Demasiadas referências semelhantes que competem e diluem as vendas" },
      { icon: Target, text: "Falta de vinhos estratégicos que orientem a decisão para opções rentáveis" },
      { icon: Search, text: "Má organização que trava a exploração e reduz o tempo de decisão" },
    ],
    profitPrinciples: [
      { icon: Scale, title: "Equilíbrio entre estilos", desc: "Uma carta rentável não repete perfis. Cada vinho deve cobrir um nicho distinto: fresco, estruturado, aromático, potente. Se dois vinhos são demasiado parecidos, um está a mais." },
      { icon: DollarSign, title: "Variedade de gamas de preço", desc: "A sua carta precisa de patamares: entrada, média, premium e topo de gama. Sem buracos nem saltos. O cliente tem de sentir que escolhe livremente." },
      { icon: Award, title: "Vinhos de âncora", desc: "1-2 vinhos premium cuja função não é vender-se, mas fazer com que os vinhos de gama média pareçam uma excelente escolha. O efeito de ancoragem é uma das ferramentas mais potentes em pricing." },
      { icon: GlassWater, title: "Oferta clara a copo", desc: "O vinho a copo é o motor da rentabilidade. Permite provar, reduz a barreira de entrada e gera margens acima de 70%. Mínimo 6-8 opções bem escolhidas." },
    ],
    priceRanges: [
      { range: "20–30 €", label: "Entrada", pct: "30-35%", desc: "Vinhos de elevada rotação. O cliente que não quer complicar. Devem ser bons, reconhecíveis e com boa margem." },
      { range: "30–50 €", label: "Gama média", pct: "35-40%", desc: "É aqui que se concentra a maioria das vendas. Vinhos com caráter, boa relação qualidade-preço e margem ótima." },
      { range: "50–80 €", label: "Premium", pct: "15-20%", desc: "Para ocasiões especiais e clientes que procuram diferenciação. Denominações reconhecidas e produtores de autor." },
      { range: "80 €+", label: "Topo de gama", pct: "5-10%", desc: "Vinhos de âncora e grandes referências. Baixa rotação mas forte perceção de valor. Elevam o posicionamento de toda a carta." },
    ],
    selectionFactors: [
      { icon: Utensils, title: "Tipo de cozinha", desc: "A sua carta de vinhos deve complementar a cozinha, não competir com ela. Um grill precisa de tintos encorpados; cozinha asiática, brancos aromáticos e vinhos com acidez." },
      { icon: Users, title: "Perfil do cliente", desc: "O seu cliente é um profissional do vinho ou alguém que procura desfrutar sem complicações? Isso define se precisa de profundidade ou de acessibilidade." },
      { icon: DollarSign, title: "Ticket médio", desc: "Se o seu ticket médio é de 40€, a carta deve concentrar a oferta entre 20-50€ a garrafa. O vinho deve representar 30-40% do gasto total do cliente." },
      { icon: RotateCcw, title: "Rotação esperada", desc: "Cada referência tem de justificar o seu lugar na garrafeira. Se um vinho não se vende pelo menos 2-3 vezes por mês, considere substituí-lo por uma opção com mais procura." },
    ],
    presentationTips: [
      { icon: Eye, title: "Descrições simples e evocativas", desc: "Sem jargão enológico. 'Fresco, notas cítricas, ideal com peixe' vende mais do que 'fermentação maloláctica parcial em barrica francesa'." },
      { icon: Layers, title: "Categorias claras e intuitivas", desc: "Escolha um critério de organização e mantenha-o. Por estilo funciona melhor do que por região para a maioria dos clientes. Máximo 4-5 categorias principais." },
      { icon: Sparkles, title: "Recomendações destacadas", desc: "Assinale 2-3 vinhos por secção como 'preferido do escanção' ou 'melhor relação qualidade-preço'. O cliente agradece a orientação e orienta-o para os vinhos mais rentáveis." },
    ],
    techBenefits: [
      { icon: BarChart3, title: "Analisar a estrutura da carta", desc: "Visualize a distribuição por tipo, preço e estilo. Detete desequilíbrios, buracos de preço e oportunidades de melhoria." },
      { icon: DollarSign, title: "Otimizar preços", desc: "Compare os seus preços com o mercado, identifique vinhos de margem baixa e ajuste a escala de preços para maximizar a rentabilidade." },
      { icon: Target, title: "Identificar oportunidades", desc: "Descubra que estilos ou gamas de preço estão sub-representados na sua carta e onde a procura não está a ser satisfeita." },
      { icon: TrendingUp, title: "Melhorar a rotação", desc: "Acompanhamento de vendas por referência. Identifique os vinhos que não se mexem e tome decisões baseadas em dados reais." },
    ],
    results: [
      { value: "+18%", label: "Ticket médio", desc: "Aumento médio do gasto por mesa graças a uma carta melhor estruturada e recomendações claras." },
      { value: "+25%", label: "Margem bruta", desc: "Melhoria das margens ao otimizar a seleção de vinhos e ajustar a escala de preços." },
      { value: "x2", label: "Rotação", desc: "Duplicação da rotação média ao eliminar referências de pouca saída e reforçar as de maior procura." },
    ],
    links: [
      { to: "/pt/preco-vinho-restaurante", label: "Como fixar o preço do vinho", type: "guide" },
      { to: "/pt/calculadora-margem-vinho", label: "Calculadora de margens", type: "tool" },
      { to: "/pt/recursos/modelo-wine-mapping", label: "Modelo de wine mapping", type: "resource" },
      { to: "/pt/ferramentas/wine-pricing", label: "Ferramenta de pricing", type: "tool" },
    ],
  },
};

const CartaVinosRentable = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "carta-rentable-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: t.metaTitle, description: t.metaDescription,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: t.url, inLanguage: lang,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("carta-rentable-jsonld")?.remove(); };
  }, [t, lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} type="article"
        hreflang={allLangPaths("/blog/como-disenar-carta-vinos-rentable")} />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: t.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <DollarSign size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">{t.heroSubtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">{t.ctaAnalyze} <ArrowRight size={16} /></Link>
            <Link to="/demo" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">{t.ctaDemo}</Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.introH2}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">{t.introP1}</p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t.introP2}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {t.commonProblems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><p.icon size={20} className="text-wine" /></div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. PRINCIPLES */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.principlesBadge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.principlesH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.principlesDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.profitPrinciples.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><p.icon size={20} className="text-wine" /></div>
                  <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WINE MAPPING */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.wmBadge}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.wmH2}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.wmDesc}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {t.priceRanges.map((pr, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-wine">{pr.range}</span>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">{pr.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pr.desc}</p>
                <p className="text-xs font-semibold text-foreground/70">{t.weightLabel} <span className="text-wine">{pr.pct}</span></p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-8 p-6 rounded-xl border border-wine/20 bg-wine/5">
            <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground">💡</strong> {t.wmTip}</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. SELECTION */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.selBadge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.selH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.selDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.selectionFactors.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-background">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><f.icon size={20} className="text-wine" /></div>
                  <div>
                    <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRESENTATION */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.presBadge}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.presH2}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.presDesc}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {t.presentationTips.map((tip, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><tip.icon size={20} className="text-wine" /></div>
                <h3 className="font-heading font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. TECHNOLOGY */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.techBadge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.techH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.techDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.techBenefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><b.icon size={20} className="text-wine" /></div>
                  <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESULTS */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.resultsBadge}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.resultsH2}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.resultsDesc}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {t.results.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center p-8 rounded-xl border border-border bg-gradient-card">
                <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{r.value}</p>
                <p className="font-semibold text-foreground mb-2">{r.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaFinalH2}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaFinalDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">{t.ctaFinalBtn} <ArrowRight size={16} /></Link>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">{t.ctaFinalDemo}</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default CartaVinosRentable;
