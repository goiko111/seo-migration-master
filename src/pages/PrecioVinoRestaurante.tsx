import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, Calculator, BarChart3, TrendingUp,
  Target, RotateCcw, Layers, DollarSign, Wine, Lightbulb, Cpu, ShoppingCart
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

type IconType = typeof DollarSign;

interface PriceRange { range: string; label: string; desc: string; color: string }
interface RotationProblem { icon: IconType; title: string; desc: string }
interface TechBenefit { icon: IconType; title: string; desc: string }
interface WineMappingItem { icon: IconType; title: string; desc: string }

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumb: string; badge: string;
  h1pre: string; h1accent: string; subtitle: string;
  ctaAnalyze: string; ctaDemo: string;
  introTag: string; introH2pre: string; introH2accent: string;
  introP1: string; introP2: string; introProblems: string[];
  multTag: string; multH2pre: string; multH2accent: string;
  multDesc: string;
  multErr1Title: string; multErr1Desc: string;
  multErr2Title: string; multErr2Desc: string;
  multErr3Title: string; multErr3Desc: string;
  multAltTitle: string; multAltDesc: string;
  wmTag: string; wmH2pre: string; wmH2accent: string; wmSubtitle: string; wmDesc: string;
  wmItems: WineMappingItem[];
  priceTag: string; priceH2pre: string; priceH2accent: string; priceSubtitle: string;
  priceRanges: PriceRange[];
  priceWarningTitle: string; priceWarning: string;
  rotTag: string; rotH2pre: string; rotH2accent: string;
  rotProblems: RotationProblem[];
  techTag: string; techH2pre: string; techH2accent: string; techSubtitle: string;
  techBenefits: TechBenefit[];
  ctaTag: string; ctaH2pre: string; ctaH2accent: string; ctaDesc: string;
  ctaBtn: string; ctaContact: string;
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
  faqData: { q: string; a: string }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cómo Fijar el Precio del Vino en un Restaurante | Guía de Pricing",
    metaDescription: "Guía práctica para definir precios de vino rentables en tu restaurante. Aprende a estructurar tu carta.",
    url: "https://winerim.wine/precio-vino-restaurante",
    breadcrumb: "Precio vino restaurante", badge: "Guía de pricing",
    h1pre: "Cómo fijar el precio del vino en un", h1accent: "restaurante",
    subtitle: "Guía práctica para definir precios de vino rentables, equilibrar tu carta y aumentar el ticket medio.",
    ctaAnalyze: "Analizar mi carta de vinos", ctaDemo: "Solicitar demo",
    introTag: "El reto del pricing",
    introH2pre: "El vino: máximo margen, máxima", introH2accent: "complejidad",
    introP1: "El vino es uno de los productos con mayor margen en hostelería, pero también uno de los más difíciles de gestionar. Una estrategia de precios incorrecta puede significar la diferencia entre una bodega rentable y un almacén de stock parado.",
    introP2: "Los problemas más habituales que encontramos en restaurantes son:",
    introProblems: ["Multiplicadores aplicados sin estrategia", "Precios desordenados en la carta", "Huecos en la escalera de precios", "Vinos demasiado caros o demasiado baratos"],
    multTag: "El error más común", multH2pre: "Usar solo un", multH2accent: "multiplicador fijo",
    multDesc: "Muchos restaurantes aplican una fórmula simple: precio de compra × 2.5 o × 3. Aunque parece lógico, este enfoque genera graves desequilibrios en la carta.",
    multErr1Title: "Los vinos baratos quedan demasiado baratos", multErr1Desc: "Un vino que cuesta 3 € se vende a 9 €. El margen absoluto es bajo y el cliente lo percibe como \"el vino más barato\", reduciendo su valor percibido.",
    multErr2Title: "Los vinos caros quedan imposibles de vender", multErr2Desc: "Un vino que cuesta 25 € se vende a 75 €. El cliente lo ve desproporcionado frente al mercado y opta por no pedirlo. El stock se estanca.",
    multErr3Title: "Falta de equilibrio en la carta", multErr3Desc: "Con un multiplicador fijo, la carta no tiene escalones naturales. El cliente no percibe diferencias claras entre rangos y se queda en lo más barato.",
    multAltTitle: "💡 La alternativa profesional", multAltDesc: "Aplicar multiplicadores decrecientes: mayor margen porcentual en vinos de entrada (×3-4) y menor en vinos premium (×1.8-2.5). Así la carta es rentable en todos los rangos y el cliente percibe precios justos.",
    wmTag: "Estrategia avanzada", wmH2pre: "Qué es el", wmH2accent: "wine mapping",
    wmSubtitle: "La distribución estratégica de precios que convierte tu carta en una herramienta de venta.",
    wmDesc: "El wine mapping consiste en organizar las referencias de la carta en rangos de precio equilibrados, creando una escalera natural que guía al cliente desde opciones accesibles hacia vinos de mayor valor. Cada referencia tiene un papel estratégico.",
    wmItems: [
      { icon: Layers, title: "Escalera de precios", desc: "Cada rango de precio debe tener opciones claras, sin saltos bruscos que desorienten al cliente." },
      { icon: BarChart3, title: "Rangos equilibrados", desc: "La concentración de referencias debe ser mayor en la zona media, donde se produce el grueso de las ventas." },
      { icon: Target, title: "Vinos ancla", desc: "Colocar referencias estratégicas que sirvan de referencia de valor y guíen la percepción de precio del cliente." },
      { icon: Lightbulb, title: "Referencias estratégicas", desc: "Cada vino debe aportar algo único: un estilo, un origen o un rango de precio que no cubra otra referencia." },
    ],
    priceTag: "Ejemplo práctico", priceH2pre: "Cómo distribuir los", priceH2accent: "precios",
    priceSubtitle: "Una carta bien estructurada no tiene huecos. Cada rango de precio cubre una necesidad del cliente.",
    priceRanges: [
      { range: "20 – 30 €", label: "Entrada", desc: "Vinos accesibles que invitan a probar. Deben ser atractivos y fáciles de entender.", color: "bg-wine/10" },
      { range: "30 – 50 €", label: "Zona media", desc: "El núcleo de la carta. Aquí se concentra la mayor parte de las ventas y el margen.", color: "bg-wine/15" },
      { range: "50 – 80 €", label: "Premium", desc: "Referencias de mayor valor percibido. Ideales para ocasiones especiales y upselling.", color: "bg-wine/20" },
      { range: "80 €+", label: "Alta gama", desc: "Vinos de prestigio que elevan la percepción de la carta completa.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Importante", priceWarning: "Si entre 30 € y 50 € no hay opciones en tu carta, estás perdiendo las ventas de la franja más rentable. Los huecos en la escalera de precios son uno de los errores más costosos y más fáciles de corregir.",
    rotTag: "Stock estancado", rotH2pre: "Por qué algunos vinos", rotH2accent: "no rotan",
    rotProblems: [
      { icon: DollarSign, title: "Mala posición en precio", desc: "Un vino excelente colocado en un rango de precio incorrecto simplemente no se vende. Si está demasiado cerca de opciones más conocidas o demasiado lejos del siguiente escalón, el cliente lo ignora." },
      { icon: Wine, title: "Estilo duplicado", desc: "Tener tres Ribera del Duero en el mismo rango de precio no ofrece variedad: genera confusión. Cada referencia debe tener un papel claro en la carta." },
      { icon: AlertTriangle, title: "Falta de recomendación", desc: "Sin indicaciones claras ni personal formado, los vinos menos conocidos quedan invisibles. El cliente elige lo seguro y las referencias interesantes se estancan." },
    ],
    techTag: "La solución", techH2pre: "Cómo la tecnología ayuda a", techH2accent: "optimizar precios",
    techSubtitle: "Herramientas como Winerim analizan tu carta de vinos y detectan oportunidades de mejora en la estructura de precios.",
    techBenefits: [
      { icon: BarChart3, title: "Analizar la estructura de precios", desc: "Visualizar la distribución completa de la carta para detectar desequilibrios y concentraciones excesivas en ciertos rangos." },
      { icon: Target, title: "Detectar huecos estratégicos", desc: "Identificar rangos de precio vacíos donde el cliente no tiene opciones, perdiendo oportunidades de venta." },
      { icon: TrendingUp, title: "Optimizar el posicionamiento", desc: "Ajustar precios individuales para crear una escalera coherente que guíe al cliente hacia referencias de mayor valor." },
      { icon: RotateCcw, title: "Mejorar la rotación", desc: "Identificar vinos estancados y proponer ajustes de precio o visibilidad para mover stock de forma inteligente." },
    ],
    ctaTag: "Análisis gratuito", ctaH2pre: "Descubre si tu carta de vinos está bien", ctaH2accent: "posicionada",
    ctaDesc: "Envíanos tu carta y analizamos la estructura de precios, detectamos desequilibrios y te proponemos mejoras concretas. Sin compromiso.",
    ctaBtn: "Solicitar análisis gratuito", ctaContact: "Contactar",
    links: [
      { to: "/wine-pricing-tool", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" },
      { to: "/demo", label: "Solicitar demo", type: "solution" },
    ],
    faqData: [
      { q: "¿Cómo se calcula el precio del vino en un restaurante?", a: "El precio del vino en un restaurante se calcula combinando el coste de adquisición con un margen variable según el rango de precio. No se recomienda usar un multiplicador fijo, sino una estrategia escalonada que equilibre rentabilidad y rotación." },
      { q: "¿Cuál es el margen habitual del vino en hostelería?", a: "El margen del vino varía entre el 60% y el 75% sobre el precio de venta. Los vinos de entrada suelen tener multiplicadores más altos (x3-x4), mientras que los vinos premium aplican márgenes menores (x1.8-x2.5) para mantener precios competitivos." },
      { q: "¿Qué es el wine mapping o distribución estratégica de precios?", a: "El wine mapping es una técnica que organiza la carta de vinos en rangos de precio equilibrados, con vinos ancla en cada segmento y sin huecos entre escalones. Esto facilita la decisión del cliente y maximiza el ticket medio." },
      { q: "¿Por qué no rotan algunos vinos de mi carta?", a: "Los vinos no rotan por tres razones principales: están mal posicionados en precio respecto a su competencia en carta, su estilo está duplicado con otras referencias más conocidas, o no reciben visibilidad ni recomendación por parte del personal." },
    ],
  },
  en: {
    metaTitle: "How to Price Wine in a Restaurant | Pricing Guide",
    metaDescription: "Practical guide to setting profitable wine prices in your restaurant. Learn to structure your list.",
    url: "https://winerim.wine/en/wine-pricing-restaurant",
    breadcrumb: "Wine pricing", badge: "Pricing guide",
    h1pre: "How to price wine in a", h1accent: "restaurant",
    subtitle: "Practical guide to setting profitable wine prices, balancing your list and increasing average ticket.",
    ctaAnalyze: "Analyze my wine list", ctaDemo: "Request demo",
    introTag: "The pricing challenge",
    introH2pre: "Wine: maximum margin, maximum", introH2accent: "complexity",
    introP1: "Wine is one of the highest-margin products in hospitality, but also one of the hardest to manage. An incorrect pricing strategy can mean the difference between a profitable cellar and a warehouse of stagnant stock.",
    introP2: "The most common problems we find in restaurants are:",
    introProblems: ["Multipliers applied without strategy", "Disorganized prices on the list", "Gaps in the price ladder", "Wines priced too high or too low"],
    multTag: "The most common mistake", multH2pre: "Using only a", multH2accent: "fixed multiplier",
    multDesc: "Many restaurants apply a simple formula: cost price × 2.5 or × 3. While it seems logical, this approach creates serious imbalances in the list.",
    multErr1Title: "Cheap wines end up too cheap", multErr1Desc: "A wine costing €3 sells for €9. The absolute margin is low and the guest perceives it as \"the cheapest wine\", reducing its perceived value.",
    multErr2Title: "Expensive wines become impossible to sell", multErr2Desc: "A wine costing €25 sells for €75. The guest sees it as disproportionate vs the market and opts not to order. Stock stagnates.",
    multErr3Title: "Lack of balance in the list", multErr3Desc: "With a fixed multiplier, the list has no natural price steps. The guest doesn't perceive clear differences between ranges and stays with the cheapest.",
    multAltTitle: "💡 The professional alternative", multAltDesc: "Apply decreasing multipliers: higher percentage margin on entry wines (×3-4) and lower on premium wines (×1.8-2.5). This makes the list profitable at all ranges while guests perceive fair prices.",
    wmTag: "Advanced strategy", wmH2pre: "What is", wmH2accent: "wine mapping",
    wmSubtitle: "The strategic price distribution that turns your list into a sales tool.",
    wmDesc: "Wine mapping organizes list references into balanced price ranges, creating a natural ladder that guides the guest from accessible options to higher-value wines. Every reference plays a strategic role.",
    wmItems: [
      { icon: Layers, title: "Price ladder", desc: "Each price range should have clear options, without sharp jumps that disorient the guest." },
      { icon: BarChart3, title: "Balanced ranges", desc: "Reference concentration should be highest in the mid-range, where the bulk of sales occur." },
      { icon: Target, title: "Anchor wines", desc: "Place strategic references that serve as value benchmarks and guide guest price perception." },
      { icon: Lightbulb, title: "Strategic references", desc: "Each wine should bring something unique: a style, origin or price point not covered by another reference." },
    ],
    priceTag: "Practical example", priceH2pre: "How to distribute", priceH2accent: "prices",
    priceSubtitle: "A well-structured list has no gaps. Each price range covers a guest need.",
    priceRanges: [
      { range: "€20 – €30", label: "Entry", desc: "Accessible wines that invite tasting. Should be attractive and easy to understand.", color: "bg-wine/10" },
      { range: "€30 – €50", label: "Mid-range", desc: "The list's core. Most sales and margin concentrate here.", color: "bg-wine/15" },
      { range: "€50 – €80", label: "Premium", desc: "Higher perceived value references. Ideal for special occasions and upselling.", color: "bg-wine/20" },
      { range: "€80+", label: "High-end", desc: "Prestige wines that elevate the perception of the entire list.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Important", priceWarning: "If there are no options between €30 and €50 on your list, you're losing sales in the most profitable bracket. Price ladder gaps are one of the most costly — and easiest to fix — mistakes.",
    rotTag: "Stagnant stock", rotH2pre: "Why some wines", rotH2accent: "don't rotate",
    rotProblems: [
      { icon: DollarSign, title: "Poor price positioning", desc: "An excellent wine placed in the wrong price range simply doesn't sell. If it's too close to better-known options or too far from the next step, the guest ignores it." },
      { icon: Wine, title: "Duplicated style", desc: "Having three Ribera del Duero in the same price range doesn't offer variety — it creates confusion. Each reference must have a clear role on the list." },
      { icon: AlertTriangle, title: "Lack of recommendation", desc: "Without clear indications or trained staff, lesser-known wines remain invisible. Guests play it safe and interesting references stagnate." },
    ],
    techTag: "The solution", techH2pre: "How technology helps", techH2accent: "optimize pricing",
    techSubtitle: "Tools like Winerim analyze your wine list and detect improvement opportunities in the pricing structure.",
    techBenefits: [
      { icon: BarChart3, title: "Analyze price structure", desc: "Visualize the complete list distribution to detect imbalances and excessive concentrations in certain ranges." },
      { icon: Target, title: "Detect strategic gaps", desc: "Identify empty price ranges where the guest has no options, losing sales opportunities." },
      { icon: TrendingUp, title: "Optimize positioning", desc: "Adjust individual prices to create a coherent ladder that guides guests toward higher-value references." },
      { icon: RotateCcw, title: "Improve rotation", desc: "Identify stagnant wines and propose price or visibility adjustments to move stock intelligently." },
    ],
    ctaTag: "Free analysis", ctaH2pre: "Find out if your wine list is well", ctaH2accent: "positioned",
    ctaDesc: "Send us your list and we'll analyze the pricing structure, detect imbalances and propose concrete improvements. No commitment.",
    ctaBtn: "Request free analysis", ctaContact: "Contact us",
    links: [
      { to: "/en/wine-pricing-tool", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/en/wine-margin-calculator", label: "Margin calculator", type: "tool" },
      { to: "/en/blog/profitable-wine-list", label: "Profitable wine list", type: "guide" },
      { to: "/en/demo", label: "Request demo", type: "solution" },
    ],
    faqData: [
      { q: "How is wine pricing calculated in a restaurant?", a: "Wine pricing combines acquisition cost with a variable margin per price range. A fixed multiplier isn't recommended — instead, use a tiered strategy balancing profitability and rotation." },
      { q: "What is the typical wine margin in hospitality?", a: "Wine margins range between 60% and 75% of the sale price. Entry wines usually have higher multipliers (×3-4), while premium wines apply lower margins (×1.8-2.5) to stay competitive." },
      { q: "What is wine mapping?", a: "Wine mapping organizes wine lists into balanced price ranges with anchor wines in each segment and no gaps between steps. This facilitates guest decisions and maximizes average ticket." },
      { q: "Why don't some wines on my list rotate?", a: "Wines don't rotate for three main reasons: poor price positioning vs competition on the list, duplicated style with better-known references, or lack of visibility and staff recommendation." },
    ],
  },
  it: {
    metaTitle: "Come Fissare il Prezzo del Vino al Ristorante | Guida al Pricing",
    metaDescription: "Guida pratica per definire prezzi del vino redditizi al ristorante. Impara a strutturare la carta, bilanciare i margini e aumentare lo scontrino medio.",
    url: "https://winerim.wine/it/prezzo-vino-ristorante",
    breadcrumb: "Prezzo vino ristorante", badge: "Guida al pricing",
    h1pre: "Come fissare il prezzo del vino al", h1accent: "ristorante",
    subtitle: "Guida pratica per definire prezzi redditizi, bilanciare la carta e aumentare lo scontrino medio.",
    ctaAnalyze: "Analizza la mia carta", ctaDemo: "Richiedi demo",
    introTag: "La sfida del pricing",
    introH2pre: "Il vino: massimo margine, massima", introH2accent: "complessità",
    introP1: "Il vino è uno dei prodotti a più alto margine nella ristorazione, ma anche uno dei più difficili da gestire. Una strategia di prezzi errata può fare la differenza tra una cantina redditizia e un magazzino di stock fermo.",
    introP2: "I problemi più comuni che troviamo nei ristoranti sono:",
    introProblems: ["Moltiplicatori applicati senza strategia", "Prezzi disordinati nella carta", "Lacune nella scala dei prezzi", "Vini troppo cari o troppo economici"],
    multTag: "L'errore più comune", multH2pre: "Usare solo un", multH2accent: "moltiplicatore fisso",
    multDesc: "Molti ristoranti applicano una formula semplice: prezzo d'acquisto × 2,5 o × 3. Anche se sembra logico, questo approccio genera gravi squilibri nella carta.",
    multErr1Title: "I vini economici restano troppo economici", multErr1Desc: "Un vino che costa 3 € si vende a 9 €. Il margine assoluto è basso e il cliente lo percepisce come \"il vino più economico\".",
    multErr2Title: "I vini costosi diventano impossibili da vendere", multErr2Desc: "Un vino che costa 25 € si vende a 75 €. Il cliente lo vede sproporzionato e sceglie di non ordinarlo.",
    multErr3Title: "Mancanza di equilibrio nella carta", multErr3Desc: "Con un moltiplicatore fisso, la carta non ha gradini naturali. Il cliente non percepisce differenze chiare.",
    multAltTitle: "💡 L'alternativa professionale", multAltDesc: "Applicare moltiplicatori decrescenti: margine percentuale maggiore sui vini d'ingresso (×3-4) e minore sui premium (×1,8-2,5).",
    wmTag: "Strategia avanzata", wmH2pre: "Cos'è il", wmH2accent: "wine mapping",
    wmSubtitle: "La distribuzione strategica dei prezzi che trasforma la carta in uno strumento di vendita.",
    wmDesc: "Il wine mapping organizza le referenze in fasce di prezzo equilibrate, creando una scala naturale che guida il cliente dalle opzioni accessibili ai vini di maggior valore.",
    wmItems: [
      { icon: Layers, title: "Scala dei prezzi", desc: "Ogni fascia deve avere opzioni chiare, senza salti bruschi." },
      { icon: BarChart3, title: "Fasce equilibrate", desc: "La concentrazione di referenze deve essere maggiore nella fascia media." },
      { icon: Target, title: "Vini àncora", desc: "Referenze strategiche che guidano la percezione di prezzo del cliente." },
      { icon: Lightbulb, title: "Referenze strategiche", desc: "Ogni vino deve apportare qualcosa di unico: uno stile, un'origine o una fascia non coperta." },
    ],
    priceTag: "Esempio pratico", priceH2pre: "Come distribuire i", priceH2accent: "prezzi",
    priceSubtitle: "Una carta ben strutturata non ha lacune. Ogni fascia copre un'esigenza del cliente.",
    priceRanges: [
      { range: "20 – 30 €", label: "Ingresso", desc: "Vini accessibili che invitano a provare.", color: "bg-wine/10" },
      { range: "30 – 50 €", label: "Fascia media", desc: "Il cuore della carta. Qui si concentrano vendite e margine.", color: "bg-wine/15" },
      { range: "50 – 80 €", label: "Premium", desc: "Referenze di maggior valore percepito. Ideali per upselling.", color: "bg-wine/20" },
      { range: "80 €+", label: "Alta gamma", desc: "Vini di prestigio che elevano la percezione della carta.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Importante", priceWarning: "Se tra 30 € e 50 € non ci sono opzioni, stai perdendo le vendite della fascia più redditizia.",
    rotTag: "Stock fermo", rotH2pre: "Perché alcuni vini", rotH2accent: "non ruotano",
    rotProblems: [
      { icon: DollarSign, title: "Cattivo posizionamento di prezzo", desc: "Un vino eccellente nella fascia sbagliata non si vende." },
      { icon: Wine, title: "Stile duplicato", desc: "Tre Ribera del Duero nella stessa fascia creano confusione, non varietà." },
      { icon: AlertTriangle, title: "Mancanza di raccomandazione", desc: "Senza indicazioni chiare, i vini meno conosciuti restano invisibili." },
    ],
    techTag: "La soluzione", techH2pre: "Come la tecnologia aiuta a", techH2accent: "ottimizzare i prezzi",
    techSubtitle: "Strumenti come Winerim analizzano la carta e rilevano opportunità nella struttura dei prezzi.",
    techBenefits: [
      { icon: BarChart3, title: "Analizzare la struttura dei prezzi", desc: "Visualizzare la distribuzione completa per rilevare squilibri." },
      { icon: Target, title: "Rilevare lacune strategiche", desc: "Identificare fasce vuote dove il cliente non ha opzioni." },
      { icon: TrendingUp, title: "Ottimizzare il posizionamento", desc: "Aggiustare i prezzi per creare una scala coerente." },
      { icon: RotateCcw, title: "Migliorare la rotazione", desc: "Identificare vini fermi e proporre aggiustamenti intelligenti." },
    ],
    ctaTag: "Analisi gratuita", ctaH2pre: "Scopri se la tua carta è ben", ctaH2accent: "posizionata",
    ctaDesc: "Inviaci la tua carta e analizziamo la struttura dei prezzi. Senza impegno.",
    ctaBtn: "Richiedi analisi gratuita", ctaContact: "Contattaci",
    links: [
      { to: "/it/strumenti-pricing-vino", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/it/calcolatore-margine-vino", label: "Calcolatore margini", type: "tool" },
      { to: "/it/blog/carta-vini-redditizia", label: "Carta dei vini redditizia", type: "guide" },
      { to: "/it/demo", label: "Richiedi demo", type: "solution" },
    ],
    faqData: [
      { q: "Come si calcola il prezzo del vino al ristorante?", a: "Si combina il costo di acquisto con un margine variabile per fascia di prezzo. Non si raccomanda un moltiplicatore fisso, bensì una strategia scalata." },
      { q: "Qual è il margine abituale del vino?", a: "Tra il 60% e il 75%. I vini d'ingresso hanno moltiplicatori più alti (×3-4), i premium più bassi (×1,8-2,5)." },
      { q: "Cos'è il wine mapping?", a: "Una tecnica che organizza la carta in fasce di prezzo equilibrate con vini àncora in ogni segmento." },
      { q: "Perché alcuni vini non ruotano?", a: "Cattivo posizionamento di prezzo, stile duplicato o mancanza di visibilità e raccomandazione." },
    ],
  },
  fr: {
    metaTitle: "Comment Fixer le Prix du Vin au Restaurant | Guide Pricing",
    metaDescription: "Guide pratique pour définir des prix de vin rentables dans votre restaurant. Apprenez à structurer votre carte.",
    url: "https://winerim.wine/fr/prix-vin-restaurant",
    breadcrumb: "Prix du vin restaurant", badge: "Guide pricing",
    h1pre: "Comment fixer le prix du vin au", h1accent: "restaurant",
    subtitle: "Guide pratique pour définir des prix rentables, équilibrer votre carte et augmenter le ticket moyen.",
    ctaAnalyze: "Analyser ma carte des vins", ctaDemo: "Demander une démo",
    introTag: "Le défi du pricing",
    introH2pre: "Le vin : marge maximale, complexité", introH2accent: "maximale",
    introP1: "Le vin est l'un des produits à plus forte marge en restauration, mais aussi l'un des plus difficiles à gérer. Une stratégie de prix incorrecte peut faire la différence entre une cave rentable et un entrepôt de stock dormant.",
    introP2: "Les problèmes les plus courants que nous trouvons dans les restaurants sont :",
    introProblems: ["Multiplicateurs appliqués sans stratégie", "Prix désordonnés sur la carte", "Lacunes dans l'échelle des prix", "Vins trop chers ou trop bon marché"],
    multTag: "L'erreur la plus courante", multH2pre: "Utiliser uniquement un", multH2accent: "multiplicateur fixe",
    multDesc: "De nombreux restaurants appliquent une formule simple : prix d'achat × 2,5 ou × 3. Bien que logique en apparence, cette approche crée de graves déséquilibres.",
    multErr1Title: "Les vins bon marché restent trop bon marché", multErr1Desc: "Un vin à 3 € se vend 9 €. La marge absolue est faible et le client le perçoit comme « le vin le moins cher ».",
    multErr2Title: "Les vins chers deviennent impossibles à vendre", multErr2Desc: "Un vin à 25 € se vend 75 €. Le client le juge disproportionné et ne le commande pas.",
    multErr3Title: "Manque d'équilibre dans la carte", multErr3Desc: "Avec un multiplicateur fixe, la carte n'a pas d'escaliers naturels.",
    multAltTitle: "💡 L'alternative professionnelle", multAltDesc: "Appliquer des multiplicateurs décroissants : marge plus élevée sur les vins d'entrée (×3-4) et plus faible sur les premium (×1,8-2,5).",
    wmTag: "Stratégie avancée", wmH2pre: "Qu'est-ce que le", wmH2accent: "wine mapping",
    wmSubtitle: "La distribution stratégique des prix qui transforme votre carte en outil de vente.",
    wmDesc: "Le wine mapping organise les références en gammes de prix équilibrées, créant une échelle naturelle qui guide le client.",
    wmItems: [
      { icon: Layers, title: "Échelle des prix", desc: "Chaque gamme doit avoir des options claires, sans sauts brusques." },
      { icon: BarChart3, title: "Gammes équilibrées", desc: "La concentration de références doit être plus forte dans la gamme moyenne." },
      { icon: Target, title: "Vins ancres", desc: "Références stratégiques qui guident la perception de prix du client." },
      { icon: Lightbulb, title: "Références stratégiques", desc: "Chaque vin doit apporter quelque chose d'unique." },
    ],
    priceTag: "Exemple pratique", priceH2pre: "Comment distribuer les", priceH2accent: "prix",
    priceSubtitle: "Une carte bien structurée n'a pas de lacunes.",
    priceRanges: [
      { range: "20 – 30 €", label: "Entrée", desc: "Vins accessibles qui invitent à la découverte.", color: "bg-wine/10" },
      { range: "30 – 50 €", label: "Gamme moyenne", desc: "Le cœur de la carte. L'essentiel des ventes et de la marge.", color: "bg-wine/15" },
      { range: "50 – 80 €", label: "Premium", desc: "Références à forte valeur perçue. Idéales pour l'upselling.", color: "bg-wine/20" },
      { range: "80 €+", label: "Haut de gamme", desc: "Vins de prestige qui élèvent la perception de la carte.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Important", priceWarning: "S'il n'y a pas d'options entre 30 € et 50 €, vous perdez les ventes de la gamme la plus rentable.",
    rotTag: "Stock dormant", rotH2pre: "Pourquoi certains vins", rotH2accent: "ne tournent pas",
    rotProblems: [
      { icon: DollarSign, title: "Mauvais positionnement prix", desc: "Un excellent vin mal positionné en prix ne se vend pas." },
      { icon: Wine, title: "Style dupliqué", desc: "Trois Ribera del Duero dans la même gamme créent de la confusion." },
      { icon: AlertTriangle, title: "Manque de recommandation", desc: "Sans indications claires, les vins moins connus restent invisibles." },
    ],
    techTag: "La solution", techH2pre: "Comment la technologie aide à", techH2accent: "optimiser les prix",
    techSubtitle: "Des outils comme Winerim analysent votre carte et détectent les opportunités d'amélioration.",
    techBenefits: [
      { icon: BarChart3, title: "Analyser la structure des prix", desc: "Visualiser la distribution complète pour détecter les déséquilibres." },
      { icon: Target, title: "Détecter les lacunes stratégiques", desc: "Identifier les gammes vides où le client n'a pas d'options." },
      { icon: TrendingUp, title: "Optimiser le positionnement", desc: "Ajuster les prix pour créer une échelle cohérente." },
      { icon: RotateCcw, title: "Améliorer la rotation", desc: "Identifier les vins dormants et proposer des ajustements intelligents." },
    ],
    ctaTag: "Analyse gratuite", ctaH2pre: "Votre carte des vins est-elle bien", ctaH2accent: "positionnée",
    ctaDesc: "Envoyez-nous votre carte et nous analysons la structure des prix. Sans engagement.",
    ctaBtn: "Demander une analyse gratuite", ctaContact: "Nous contacter",
    links: [
      { to: "/fr/outil-pricing-vin", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/fr/calculateur-marge-vin", label: "Calculateur de marges", type: "tool" },
      { to: "/fr/blog/carte-des-vins-rentable", label: "Carte des vins rentable", type: "guide" },
      { to: "/fr/demo", label: "Demander une démo", type: "solution" },
    ],
    faqData: [
      { q: "Comment calcule-t-on le prix du vin au restaurant ?", a: "On combine le coût d'acquisition avec une marge variable par gamme de prix. Un multiplicateur fixe n'est pas recommandé." },
      { q: "Quelle est la marge habituelle du vin ?", a: "Entre 60% et 75%. Les vins d'entrée ont des multiplicateurs plus élevés (×3-4), les premium plus bas (×1,8-2,5)." },
      { q: "Qu'est-ce que le wine mapping ?", a: "Une technique qui organise la carte en gammes de prix équilibrées avec des vins ancres dans chaque segment." },
      { q: "Pourquoi certains vins ne tournent-ils pas ?", a: "Mauvais positionnement prix, style dupliqué ou manque de visibilité et recommandation du personnel." },
    ],
  },
  de: {
    metaTitle: "Wie man den Weinpreis im Restaurant festlegt | Pricing-Leitfaden",
    metaDescription: "Praktischer Leitfaden zur Festlegung rentabler Weinpreise in Ihrem Restaurant. Lernen Sie, Ihre Karte zu strukturieren.",
    url: "https://winerim.wine/de/weinpreis-restaurant",
    breadcrumb: "Weinpreis Restaurant", badge: "Pricing-Leitfaden",
    h1pre: "Wie man den Weinpreis im", h1accent: "Restaurant festlegt",
    subtitle: "Praktischer Leitfaden, um rentable Weinpreise zu definieren, Ihre Karte auszubalancieren und den Durchschnittsbon zu steigern.",
    ctaAnalyze: "Meine Weinkarte analysieren", ctaDemo: "Demo anfordern",
    introTag: "Die Pricing-Herausforderung",
    introH2pre: "Wein: maximale Marge, maximale", introH2accent: "Komplexität",
    introP1: "Wein ist eines der Produkte mit der höchsten Marge in der Gastronomie, aber auch eines der am schwierigsten zu verwaltenden. Eine falsche Preisstrategie kann den Unterschied zwischen einem rentablen Weinkeller und einem Lager voller Totbestand ausmachen.",
    introP2: "Die häufigsten Probleme, die wir in Restaurants antreffen, sind:",
    introProblems: ["Multiplikatoren ohne Strategie angewendet", "Ungeordnete Preise auf der Karte", "Lücken in der Preistreppe", "Zu teure oder zu günstige Weine"],
    multTag: "Der häufigste Fehler", multH2pre: "Nur einen", multH2accent: "festen Multiplikator verwenden",
    multDesc: "Viele Restaurants wenden eine einfache Formel an: Einkaufspreis × 2,5 oder × 3. Obwohl das logisch erscheint, erzeugt dieser Ansatz gravierende Ungleichgewichte in der Karte.",
    multErr1Title: "Günstige Weine bleiben zu günstig", multErr1Desc: "Ein Wein für 3 € wird für 9 € verkauft. Die absolute Marge ist niedrig und der Gast nimmt ihn als \"den günstigsten Wein\" wahr, was seinen wahrgenommenen Wert reduziert.",
    multErr2Title: "Teure Weine werden unverkäuflich", multErr2Desc: "Ein Wein für 25 € wird für 75 € verkauft. Der Gast empfindet ihn im Vergleich zum Markt als unverhältnismäßig und bestellt ihn nicht. Der Bestand staut sich.",
    multErr3Title: "Mangelndes Gleichgewicht in der Karte", multErr3Desc: "Mit einem festen Multiplikator hat die Karte keine natürlichen Preisstufen. Der Gast erkennt keine klaren Unterschiede zwischen den Preisklassen und bleibt beim günstigsten.",
    multAltTitle: "💡 Die professionelle Alternative", multAltDesc: "Wenden Sie abnehmende Multiplikatoren an: höhere prozentuale Marge bei Einstiegsweinen (×3-4) und niedrigere bei Premium-Weinen (×1,8-2,5). So ist die Karte in allen Preisklassen rentabel und der Gast nimmt faire Preise wahr.",
    wmTag: "Fortgeschrittene Strategie", wmH2pre: "Was ist", wmH2accent: "Wine Mapping",
    wmSubtitle: "Die strategische Preisverteilung, die Ihre Karte in ein Verkaufsinstrument verwandelt.",
    wmDesc: "Wine Mapping besteht darin, die Referenzen der Karte in ausgewogenen Preisklassen zu organisieren und eine natürliche Treppe zu schaffen, die den Gast von zugänglichen Optionen zu höherwertigen Weinen führt. Jede Referenz hat eine strategische Rolle.",
    wmItems: [
      { icon: Layers, title: "Preistreppe", desc: "Jede Preisklasse sollte klare Optionen haben, ohne abrupte Sprünge, die den Gast verwirren." },
      { icon: BarChart3, title: "Ausgewogene Preisklassen", desc: "Die Konzentration der Referenzen sollte im mittleren Bereich am höchsten sein, wo der Großteil der Verkäufe stattfindet." },
      { icon: Target, title: "Ankerweine", desc: "Platzieren Sie strategische Referenzen, die als Wertmaßstab dienen und die Preiswahrnehmung des Gastes leiten." },
      { icon: Lightbulb, title: "Strategische Referenzen", desc: "Jeder Wein sollte etwas Einzigartiges beitragen: einen Stil, einen Ursprung oder eine Preisklasse, die keine andere Referenz abdeckt." },
    ],
    priceTag: "Praktisches Beispiel", priceH2pre: "Wie man die", priceH2accent: "Preise verteilt",
    priceSubtitle: "Eine gut strukturierte Karte hat keine Lücken. Jede Preisklasse deckt ein Bedürfnis des Gastes ab.",
    priceRanges: [
      { range: "20 – 30 €", label: "Einstieg", desc: "Zugängliche Weine, die zum Probieren einladen. Sollten attraktiv und leicht verständlich sein.", color: "bg-wine/10" },
      { range: "30 – 50 €", label: "Mittlere Klasse", desc: "Das Herzstück der Karte. Hier konzentriert sich der Großteil der Verkäufe und der Marge.", color: "bg-wine/15" },
      { range: "50 – 80 €", label: "Premium", desc: "Referenzen mit höherem wahrgenommenem Wert. Ideal für besondere Anlässe und Upselling.", color: "bg-wine/20" },
      { range: "80 €+", label: "Hochklasse", desc: "Prestige-Weine, die die Wahrnehmung der gesamten Karte aufwerten.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Wichtig", priceWarning: "Wenn zwischen 30 € und 50 € keine Optionen auf Ihrer Karte stehen, verlieren Sie die Verkäufe der rentabelsten Preisklasse. Lücken in der Preistreppe gehören zu den teuersten — und am leichtesten zu behebenden — Fehlern.",
    rotTag: "Stagnierender Bestand", rotH2pre: "Warum einige Weine", rotH2accent: "nicht rotieren",
    rotProblems: [
      { icon: DollarSign, title: "Schlechte Preispositionierung", desc: "Ein hervorragender Wein in der falschen Preisklasse verkauft sich einfach nicht. Wenn er zu nah an bekannteren Optionen oder zu weit von der nächsten Stufe entfernt ist, ignoriert ihn der Gast." },
      { icon: Wine, title: "Duplizierter Stil", desc: "Drei Ribera del Duero in derselben Preisklasse bieten keine Vielfalt: Sie erzeugen Verwirrung. Jede Referenz muss eine klare Rolle in der Karte haben." },
      { icon: AlertTriangle, title: "Fehlende Empfehlung", desc: "Ohne klare Hinweise oder geschultes Personal bleiben weniger bekannte Weine unsichtbar. Der Gast wählt das Sichere und interessante Referenzen stagnieren." },
    ],
    techTag: "Die Lösung", techH2pre: "Wie Technologie hilft,", techH2accent: "Preise zu optimieren",
    techSubtitle: "Tools wie Winerim analysieren Ihre Weinkarte und erkennen Verbesserungsmöglichkeiten in der Preisstruktur.",
    techBenefits: [
      { icon: BarChart3, title: "Preisstruktur analysieren", desc: "Die komplette Verteilung der Karte visualisieren, um Ungleichgewichte und übermäßige Konzentrationen in bestimmten Preisklassen zu erkennen." },
      { icon: Target, title: "Strategische Lücken erkennen", desc: "Leere Preisklassen identifizieren, in denen der Gast keine Optionen hat und Verkaufschancen verloren gehen." },
      { icon: TrendingUp, title: "Positionierung optimieren", desc: "Einzelpreise anpassen, um eine kohärente Treppe zu schaffen, die den Gast zu höherwertigen Referenzen führt." },
      { icon: RotateCcw, title: "Rotation verbessern", desc: "Stagnierende Weine identifizieren und Preis- oder Sichtbarkeitsanpassungen vorschlagen, um Bestand intelligent zu bewegen." },
    ],
    ctaTag: "Kostenlose Analyse", ctaH2pre: "Finden Sie heraus, ob Ihre Weinkarte gut", ctaH2accent: "positioniert ist",
    ctaDesc: "Senden Sie uns Ihre Karte und wir analysieren die Preisstruktur, erkennen Ungleichgewichte und schlagen konkrete Verbesserungen vor. Unverbindlich.",
    ctaBtn: "Kostenlose Analyse anfordern", ctaContact: "Kontaktieren",
    links: [
      { to: "/de/weinpreis-optimierer", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/de/weinmargen-rechner", label: "Margen-Rechner", type: "tool" },
      { to: "/de/blog/rentable-weinkarte-gestalten", label: "Rentable Weinkarte", type: "guide" },
      { to: "/de/demo", label: "Demo anfordern", type: "solution" },
    ],
    faqData: [
      { q: "Wie berechnet man den Weinpreis in einem Restaurant?", a: "Der Weinpreis im Restaurant wird berechnet, indem man die Anschaffungskosten mit einer variablen Marge je nach Preisklasse kombiniert. Ein fester Multiplikator wird nicht empfohlen, sondern eine gestaffelte Strategie, die Rentabilität und Rotation ausbalanciert." },
      { q: "Wie hoch ist die übliche Weinmarge in der Gastronomie?", a: "Die Weinmarge liegt zwischen 60 % und 75 % des Verkaufspreises. Einstiegsweine haben meist höhere Multiplikatoren (×3-4), während Premium-Weine niedrigere Margen anwenden (×1,8-2,5), um wettbewerbsfähige Preise zu halten." },
      { q: "Was ist Wine Mapping oder strategische Preisverteilung?", a: "Wine Mapping ist eine Technik, die die Weinkarte in ausgewogene Preisklassen organisiert, mit Ankerweinen in jedem Segment und ohne Lücken zwischen den Stufen. Das erleichtert die Entscheidung des Gastes und maximiert den Durchschnittsbon." },
      { q: "Warum rotieren einige Weine meiner Karte nicht?", a: "Weine rotieren aus drei Hauptgründen nicht: Sie sind im Preis gegenüber ihrer Konkurrenz auf der Karte falsch positioniert, ihr Stil ist mit anderen bekannteren Referenzen dupliziert, oder sie erhalten keine Sichtbarkeit oder Empfehlung durch das Personal." },
    ],
  },
  pt: {
    metaTitle: "Como Fixar o Preço do Vinho num Restaurante | Guia de Pricing",
    metaDescription: "Guia prático para definir preços de vinho rentáveis no seu restaurante. Aprenda a estruturar a sua carta.",
    url: "https://winerim.wine/pt/preco-vinho-restaurante",
    breadcrumb: "Preço vinho restaurante", badge: "Guia de pricing",
    h1pre: "Como fixar o preço do vinho num", h1accent: "restaurante",
    subtitle: "Guia prático para definir preços de vinho rentáveis, equilibrar a sua carta e aumentar o bilhete médio.",
    ctaAnalyze: "Analisar a minha carta de vinhos", ctaDemo: "Pedir demonstração",
    introTag: "O desafio do pricing",
    introH2pre: "O vinho: margem máxima, complexidade", introH2accent: "máxima",
    introP1: "O vinho é um dos produtos com maior margem na restauração, mas também um dos mais difíceis de gerir. Uma estratégia de preços incorreta pode significar a diferença entre uma garrafeira rentável e um armazém de stock morto.",
    introP2: "Os problemas mais habituais que encontramos nos restaurantes são:",
    introProblems: ["Multiplicadores aplicados sem estratégia", "Preços desordenados na carta", "Lacunas na escala de preços", "Vinhos demasiado caros ou demasiado baratos"],
    multTag: "O erro mais comum", multH2pre: "Usar apenas um", multH2accent: "multiplicador fixo",
    multDesc: "Muitos restaurantes aplicam uma fórmula simples: preço de compra × 2,5 ou × 3. Embora pareça lógico, esta abordagem gera graves desequilíbrios na carta.",
    multErr1Title: "Os vinhos baratos ficam demasiado baratos", multErr1Desc: "Um vinho que custa 3 € vende-se a 9 €. A margem absoluta é baixa e o cliente percebe-o como \"o vinho mais barato\", reduzindo o seu valor percebido.",
    multErr2Title: "Os vinhos caros tornam-se impossíveis de vender", multErr2Desc: "Um vinho que custa 25 € vende-se a 75 €. O cliente vê-o desproporcionado face ao mercado e opta por não o pedir. O stock estagna.",
    multErr3Title: "Falta de equilíbrio na carta", multErr3Desc: "Com um multiplicador fixo, a carta não tem degraus naturais. O cliente não percebe diferenças claras entre gamas e fica-se pelo mais barato.",
    multAltTitle: "💡 A alternativa profissional", multAltDesc: "Aplicar multiplicadores decrescentes: maior margem percentual nos vinhos de entrada (×3-4) e menor nos premium (×1,8-2,5). Assim a carta é rentável em todas as gamas e o cliente percebe preços justos.",
    wmTag: "Estratégia avançada", wmH2pre: "O que é o", wmH2accent: "wine mapping",
    wmSubtitle: "A distribuição estratégica de preços que transforma a sua carta numa ferramenta de venda.",
    wmDesc: "O wine mapping consiste em organizar as referências da carta em gamas de preço equilibradas, criando uma escada natural que guia o cliente desde opções acessíveis até vinhos de maior valor. Cada referência tem um papel estratégico.",
    wmItems: [
      { icon: Layers, title: "Escala de preços", desc: "Cada gama de preço deve ter opções claras, sem saltos bruscos que desorientem o cliente." },
      { icon: BarChart3, title: "Gamas equilibradas", desc: "A concentração de referências deve ser maior na gama média, onde se produz o grosso das vendas." },
      { icon: Target, title: "Vinhos âncora", desc: "Colocar referências estratégicas que sirvam de referência de valor e guiem a perceção de preço do cliente." },
      { icon: Lightbulb, title: "Referências estratégicas", desc: "Cada vinho deve trazer algo único: um estilo, uma origem ou uma gama de preço que não esteja coberta por outra referência." },
    ],
    priceTag: "Exemplo prático", priceH2pre: "Como distribuir os", priceH2accent: "preços",
    priceSubtitle: "Uma carta bem estruturada não tem lacunas. Cada gama de preço cobre uma necessidade do cliente.",
    priceRanges: [
      { range: "20 – 30 €", label: "Entrada", desc: "Vinhos acessíveis que convidam a experimentar. Devem ser atrativos e fáceis de perceber.", color: "bg-wine/10" },
      { range: "30 – 50 €", label: "Gama média", desc: "O núcleo da carta. Aqui concentra-se a maior parte das vendas e da margem.", color: "bg-wine/15" },
      { range: "50 – 80 €", label: "Premium", desc: "Referências de maior valor percebido. Ideais para ocasiões especiais e upselling.", color: "bg-wine/20" },
      { range: "80 €+", label: "Alta gama", desc: "Vinhos de prestígio que elevam a perceção da carta completa.", color: "bg-wine/25" },
    ],
    priceWarningTitle: "⚠️ Importante", priceWarning: "Se entre 30 € e 50 € não existirem opções na sua carta, está a perder as vendas da gama mais rentável. As lacunas na escala de preços são um dos erros mais caros e mais fáceis de corrigir.",
    rotTag: "Stock estagnado", rotH2pre: "Porque é que alguns vinhos", rotH2accent: "não rodam",
    rotProblems: [
      { icon: DollarSign, title: "Má posição de preço", desc: "Um vinho excelente colocado numa gama de preço incorreta simplesmente não se vende. Se está demasiado próximo de opções mais conhecidas ou demasiado longe do próximo degrau, o cliente ignora-o." },
      { icon: Wine, title: "Estilo duplicado", desc: "Ter três Douro na mesma gama de preço não oferece variedade: gera confusão. Cada referência deve ter um papel claro na carta." },
      { icon: AlertTriangle, title: "Falta de recomendação", desc: "Sem indicações claras nem pessoal formado, os vinhos menos conhecidos ficam invisíveis. O cliente escolhe o seguro e as referências interessantes estagnam." },
    ],
    techTag: "A solução", techH2pre: "Como a tecnologia ajuda a", techH2accent: "otimizar preços",
    techSubtitle: "Ferramentas como a Winerim analisam a sua carta de vinhos e detetam oportunidades de melhoria na estrutura de preços.",
    techBenefits: [
      { icon: BarChart3, title: "Analisar a estrutura de preços", desc: "Visualizar a distribuição completa da carta para detetar desequilíbrios e concentrações excessivas em certas gamas." },
      { icon: Target, title: "Detetar lacunas estratégicas", desc: "Identificar gamas de preço vazias onde o cliente não tem opções, perdendo oportunidades de venda." },
      { icon: TrendingUp, title: "Otimizar o posicionamento", desc: "Ajustar preços individuais para criar uma escala coerente que guie o cliente para referências de maior valor." },
      { icon: RotateCcw, title: "Melhorar a rotação", desc: "Identificar vinhos estagnados e propor ajustes de preço ou visibilidade para mover stock de forma inteligente." },
    ],
    ctaTag: "Análise gratuita", ctaH2pre: "Descubra se a sua carta de vinhos está bem", ctaH2accent: "posicionada",
    ctaDesc: "Envie-nos a sua carta e analisamos a estrutura de preços, detetamos desequilíbrios e propomos melhorias concretas. Sem compromisso.",
    ctaBtn: "Pedir análise gratuita", ctaContact: "Contactar",
    links: [
      { to: "/pt/otimizador-preco-vinho", label: "Wine Pricing Optimizer", type: "tool" },
      { to: "/pt/calculadora-margem-vinho", label: "Calculadora de margens", type: "tool" },
      { to: "/pt/blog/carta-vinhos-rentavel", label: "Carta de vinhos rentável", type: "guide" },
      { to: "/pt/demo", label: "Pedir demonstração", type: "solution" },
    ],
    faqData: [
      { q: "Como se calcula o preço do vinho num restaurante?", a: "O preço do vinho num restaurante calcula-se combinando o custo de aquisição com uma margem variável consoante a gama de preço. Não se recomenda um multiplicador fixo, mas sim uma estratégia escalonada que equilibre rentabilidade e rotação." },
      { q: "Qual é a margem habitual do vinho na restauração?", a: "A margem do vinho varia entre 60 % e 75 % sobre o preço de venda. Os vinhos de entrada têm geralmente multiplicadores mais altos (×3-4), enquanto os premium aplicam margens menores (×1,8-2,5) para manter preços competitivos." },
      { q: "O que é o wine mapping ou distribuição estratégica de preços?", a: "O wine mapping é uma técnica que organiza a carta de vinhos em gamas de preço equilibradas, com vinhos âncora em cada segmento e sem lacunas entre degraus. Isto facilita a decisão do cliente e maximiza o bilhete médio." },
      { q: "Porque é que alguns vinhos da minha carta não rodam?", a: "Os vinhos não rodam por três razões principais: estão mal posicionados em preço face à concorrência na carta, o seu estilo está duplicado com outras referências mais conhecidas, ou não recebem visibilidade nem recomendação por parte do pessoal." },
    ],
  },
};

const PrecioVinoRestaurante = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "precio-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqData.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
    document.head.appendChild(faqSchema);
    return () => { document.getElementById("precio-faq-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url}
        hreflang={allLangPaths("/precio-vino-restaurante")} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: t.breadcrumb }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <Calculator size={14} className="text-wine" />
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
              <Link to="/analisis-carta" className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center">
                {t.ctaAnalyze}
              </Link>
              <Link to="/demo" className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300">
                {t.ctaDemo}
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.introTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t.introH2pre} <span className="text-gradient-wine italic">{t.introH2accent}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.introP1}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.introP2}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.introProblems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                  <AlertTriangle size={18} className="text-destructive shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MULTIPLIER ERROR */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.multTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.multH2pre} <span className="text-gradient-wine italic">{t.multH2accent}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.multDesc}</p>
              <div className="space-y-6 mb-8">
                {[
                  { title: t.multErr1Title, desc: t.multErr1Desc, icon: Calculator },
                  { title: t.multErr2Title, desc: t.multErr2Desc, icon: TrendingUp },
                  { title: t.multErr3Title, desc: t.multErr3Desc, icon: Layers },
                ].map((err, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <err.icon size={18} className="text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{err.title}</h3>
                      <p className="text-sm text-muted-foreground">{err.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-wine/5 border border-wine/20 rounded-xl p-6">
                <p className="text-sm font-semibold text-wine mb-2">{t.multAltTitle}</p>
                <p className="text-sm text-muted-foreground">{t.multAltDesc}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WINE MAPPING */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.wmTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.wmH2pre} <span className="text-gradient-wine italic">{t.wmH2accent}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.wmSubtitle}</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl mx-auto">{t.wmDesc}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.wmItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICE DISTRIBUTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.priceTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.priceH2pre} <span className="text-gradient-wine italic">{t.priceH2accent}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.priceSubtitle}</p>
          </ScrollReveal>
          <div className="space-y-4 max-w-2xl mx-auto">
            {t.priceRanges.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`${tier.color} rounded-lg px-4 py-2 text-center sm:text-left shrink-0 min-w-[120px]`}>
                    <p className="text-xs uppercase tracking-wider text-wine-light font-semibold">{tier.label}</p>
                    <p className="font-heading text-lg font-bold text-wine">{tier.range}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="mt-8 bg-wine/5 border border-wine/20 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-wine mb-2">{t.priceWarningTitle}</p>
              <p className="text-sm text-muted-foreground">{t.priceWarning}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ROTATION PROBLEMS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.rotTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.rotH2pre} <span className="text-gradient-wine italic">{t.rotH2accent}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.rotProblems.map((problem, i) => {
              const Icon = problem.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
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

      {/* TECH BENEFITS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.techTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.techH2pre} <span className="text-gradient-wine italic">{t.techH2accent}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.techSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.techBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
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
                <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaBtn} <ArrowRight size={16} />
                </Link>
                <Link to="/contacto" className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                  {t.ctaContact}
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

export default PrecioVinoRestaurante;
