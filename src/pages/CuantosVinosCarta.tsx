import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, AlertTriangle, CheckCircle, XCircle,
  BarChart3, Target, Utensils, TrendingDown, TrendingUp,
  Scale, Users, DollarSign, Layers, Search, Sparkles,
  ShoppingCart, Warehouse, HelpCircle, RotateCcw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

interface RestType { type: string; range: string; desc: string; tips: string[] }
interface Problem { icon: typeof Wine; title: string; desc: string }
interface Factor { icon: typeof Wine; title: string; desc: string }
interface TechBenefit { icon: typeof Wine; title: string; desc: string }

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumbParent: string; breadcrumbCurrent: string;
  badge: string; h1: string; subtitle: string;
  introH2: string; introP: string;
  commonProblems: { icon: typeof Wine; text: string }[];
  recTag: string; recH2: string; recP: string;
  restaurantTypes: RestType[];
  tooManyTag: string; tooManyH2: string; tooManyP: string;
  tooManyProblems: Problem[];
  tooFewTag: string; tooFewH2: string; tooFewP: string;
  tooFewProblems: Problem[];
  balanceTag: string; balanceH2: string; balanceP: string;
  balanceFactors: Factor[];
  techTag: string; techH2: string; techP: string;
  techBenefits: TechBenefit[];
  ctaH2: string; ctaP: string; ctaBtn: string; ctaDemoBtn: string;
  analyzeUrl: string; demoUrl: string;
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cuántos Vinos Debe Tener una Carta de Vinos | Guía por Tipo de Restaurante",
    metaDescription: "Descubre cuántas referencias debe tener tu carta de vinos según el tipo de restaurante.",
    url: "https://winerim.wine/blog/cuantos-vinos-carta-restaurante",
    breadcrumbParent: "Blog", breadcrumbCurrent: "Cuántos vinos en carta",
    badge: "Guía para restaurantes",
    h1: "Cuántos vinos debe tener una carta de vinos",
    subtitle: "Guía práctica para definir el tamaño ideal de la carta de vinos según el tipo de restaurante.",
    introH2: "¿Por qué importa el número de vinos en tu carta?",
    introP: "Una de las decisiones más importantes al diseñar una carta de vinos es definir cuántas referencias incluir. No se trata solo de cantidad: el número de vinos afecta directamente a la experiencia del cliente, la rentabilidad del negocio y la operativa de bodega. Una carta con demasiados vinos genera confusión; una con muy pocos, limita las ventas. El equilibrio es la clave.",
    commonProblems: [
      { icon: Layers, text: "Cartas demasiado largas que abruman al cliente y dificultan la elección" },
      { icon: XCircle, text: "Cartas demasiado cortas que limitan la experiencia y el maridaje" },
      { icon: Scale, text: "Falta de equilibrio entre estilos, regiones y rangos de precio" },
      { icon: RotateCcw, text: "Duplicidad de vinos con perfiles similares que no aportan variedad real" },
    ],
    recTag: "Recomendaciones por formato", recH2: "Cuántos vinos según el tipo de restaurante",
    recP: "No existe una regla universal. El número ideal depende del formato, la cocina, el público y la operativa. Estas son orientaciones basadas en la experiencia del sector.",
    restaurantTypes: [
      { type: "Restaurante pequeño o bistró", range: "20–40 referencias", desc: "Una carta compacta y bien curada es la mejor opción. Cada vino debe tener un propósito claro: cubrir los estilos básicos, ofrecer al menos 3 rangos de precio y complementar la cocina. El cliente agradece poder elegir sin sentirse perdido.", tips: ["5-8 tintos, 4-6 blancos, 2-3 rosados/espumosos", "Al menos 4-6 vinos por copa", "Rotación frecuente para mantener el interés"] },
      { type: "Restaurante medio", range: "40–80 referencias", desc: "Aquí ya hay espacio para profundizar en regiones, estilos y rangos de precio. La carta debe estar bien estructurada con categorías claras para que el volumen no genere confusión. Es el punto donde la organización marca la diferencia.", tips: ["Dividir en secciones claras (tipo, región o estilo)", "8-12 vinos por copa como mínimo", "Incluir vinos de descubrimiento junto a clásicos"] },
      { type: "Restaurante gastronómico", range: "80–200 referencias", desc: "La carta es parte de la experiencia. El cliente espera profundidad, grandes añadas y una selección que refleje la filosofía del restaurante. Aquí el sommelier es clave para guiar, y la organización debe permitir tanto la exploración como la decisión rápida.", tips: ["Organización por región o estilo, no solo por tipo", "Sección de grandes formatos y añadas especiales", "Maridajes sugeridos con el menú degustación"] },
      { type: "Wine bar o vinoteca", range: "100–300 referencias", desc: "El vino es el protagonista absoluto. La carta debe invitar a explorar, descubrir y probar. La rotación es alta, y la oferta por copa debe ser generosa. Es donde más sentido tiene una carta digital interactiva.", tips: ["20-30 vinos por copa como mínimo", "Rotación semanal de destacados", "Fichas detalladas con notas de cata y origen"] },
    ],
    tooManyTag: "Problemas de cartas largas", tooManyH2: "El riesgo de tener demasiados vinos",
    tooManyP: "Más no siempre es mejor. Una carta excesivamente larga puede perjudicar tanto la experiencia del cliente como la rentabilidad del negocio.",
    tooManyProblems: [
      { icon: HelpCircle, title: "Confusión del cliente", desc: "Cuando hay demasiadas opciones, el cliente se bloquea. La paradoja de la elección hace que termine pidiendo 'el de la casa' o lo más barato, justo lo contrario de lo que buscamos." },
      { icon: TrendingDown, title: "Dificultad para elegir", desc: "Sin una guía clara, el cliente dedica demasiado tiempo a la carta y menos a disfrutar. La experiencia se resiente y la mesa se ralentiza." },
      { icon: RotateCcw, title: "Baja rotación de referencias", desc: "Con muchas referencias, algunas nunca se venden. Ocupan espacio en bodega, inmovilizan capital y pueden deteriorarse antes de servirse." },
      { icon: Warehouse, title: "Mayor inmovilizado en bodega", desc: "Cada referencia implica stock mínimo. 200 referencias con 3 botellas de media son 600 botellas en bodega. ¿Justifica tu volumen de ventas esa inversión?" },
    ],
    tooFewTag: "Problemas de cartas cortas", tooFewH2: "El riesgo de tener muy pocos vinos",
    tooFewP: "Una carta minimalista puede ser atractiva, pero si es demasiado corta limita la experiencia y reduce oportunidades de venta.",
    tooFewProblems: [
      { icon: Wine, title: "Poca variedad", desc: "El cliente habitual se cansa rápido si siempre ve las mismas opciones. La falta de variedad reduce la repetición de visitas y las ganas de explorar." },
      { icon: DollarSign, title: "Falta de opciones de precio", desc: "Sin un rango amplio de precios, pierdes ventas tanto del cliente que busca algo especial como del que quiere algo accesible. La escalera de precios necesita peldaños." },
      { icon: Utensils, title: "Limitación de maridajes", desc: "Con pocos vinos, no puedes ofrecer el maridaje ideal para cada plato. La cocina y el vino deben ir de la mano, y eso requiere un mínimo de opciones." },
    ],
    balanceTag: "El tamaño ideal", balanceH2: "Cómo encontrar el equilibrio",
    balanceP: "No hay un número mágico. La clave está en analizar tu contexto y tomar decisiones basadas en datos, no en intuición. Estos son los factores que debes evaluar.",
    balanceFactors: [
      { icon: Utensils, title: "Tipo de cocina", desc: "Una cocina japonesa pide vinos distintos que una parrilla argentina. Tu carta debe reflejar y complementar tu propuesta gastronómica, no competir con ella." },
      { icon: DollarSign, title: "Ticket medio", desc: "Si tu ticket medio es de 35€, no tiene sentido que el 50% de tu carta supere los 40€ por botella. Alinea tu carta con lo que tu cliente está dispuesto a gastar." },
      { icon: Users, title: "Perfil de cliente", desc: "¿Tu cliente es experto en vino o está descubriendo? Esto determina si necesitas profundidad (grandes añadas, productores de autor) o accesibilidad (descripciones claras, recomendaciones)." },
      { icon: RotateCcw, title: "Rotación de vinos", desc: "Analiza qué vinos se venden y cuáles no. Una buena carta no es la más larga, sino la que tiene la mejor rotación. Cada referencia debe ganarse su puesto." },
    ],
    techTag: "Winerim", techH2: "Cómo la tecnología te ayuda a decidir",
    techP: "Herramientas como Winerim analizan tu carta en tiempo real y te dan datos objetivos para decidir qué vinos mantener, cuáles rotar y dónde hay oportunidades de mejora.",
    techBenefits: [
      { icon: BarChart3, title: "Analizar la estructura de la carta", desc: "Visualiza la distribución por tipo, precio, región y estilo. Detecta desequilibrios y oportunidades de mejora de un vistazo." },
      { icon: Search, title: "Identificar duplicidades", desc: "Descubre vinos con perfiles similares que compiten entre sí. Elimina redundancias y haz que cada referencia aporte valor único." },
      { icon: Target, title: "Optimizar el número de referencias", desc: "Datos reales de venta para decidir qué vinos mantener, cuáles rotar y dónde hay huecos por cubrir en tu oferta." },
      { icon: TrendingUp, title: "Mejorar la rotación", desc: "Seguimiento de ventas por referencia para identificar los vinos que no se mueven y tomar decisiones basadas en datos, no en intuición." },
    ],
    ctaH2: "Descubre si tu carta de vinos tiene el tamaño adecuado",
    ctaP: "Analizamos tu carta de vinos de forma gratuita y te damos recomendaciones personalizadas sobre el número ideal de referencias para tu restaurante.",
    ctaBtn: "Solicitar análisis gratuito", ctaDemoBtn: "Solicitar demo",
    analyzeUrl: "/analisis-carta", demoUrl: "/demo",
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
      { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", label: "Cómo mejorar la rotación de vinos", type: "guide" },
    ],
  },
  en: {
    metaTitle: "How Many Wines Should a Wine List Have | Guide by Restaurant Type",
    metaDescription: "Discover how many references your wine list should have based on restaurant type. Practical guide with recommendations.",
    url: "https://winerim.wine/en/how-many-wines-restaurant-list",
    breadcrumbParent: "Blog", breadcrumbCurrent: "How many wines on a list",
    badge: "Restaurant guide",
    h1: "How many wines should a wine list have",
    subtitle: "Practical guide to defining the ideal wine list size based on restaurant type.",
    introH2: "Why does the number of wines on your list matter?",
    introP: "One of the most important decisions when designing a wine list is defining how many references to include. It's not just about quantity: the number of wines directly affects guest experience, business profitability and cellar operations. A list with too many wines creates confusion; one with too few limits sales. Balance is key.",
    commonProblems: [
      { icon: Layers, text: "Lists that are too long overwhelm the guest and make choosing difficult" },
      { icon: XCircle, text: "Lists that are too short limit the experience and pairing options" },
      { icon: Scale, text: "Lack of balance between styles, regions and price ranges" },
      { icon: RotateCcw, text: "Duplicate wines with similar profiles that don't add real variety" },
    ],
    recTag: "Recommendations by format", recH2: "How many wines by restaurant type",
    recP: "There's no universal rule. The ideal number depends on the format, cuisine, audience and operations. These are guidelines based on industry experience.",
    restaurantTypes: [
      { type: "Small restaurant or bistro", range: "20–40 references", desc: "A compact, well-curated list is the best option. Each wine should have a clear purpose: cover basic styles, offer at least 3 price ranges and complement the cuisine. Guests appreciate being able to choose without feeling lost.", tips: ["5-8 reds, 4-6 whites, 2-3 rosés/sparkling", "At least 4-6 by-the-glass wines", "Frequent rotation to maintain interest"] },
      { type: "Mid-size restaurant", range: "40–80 references", desc: "There's room here to explore regions, styles and price ranges in depth. The list needs clear structure with well-defined categories so volume doesn't create confusion. This is where organization makes the difference.", tips: ["Divide into clear sections (type, region or style)", "8-12 by-the-glass wines minimum", "Include discovery wines alongside classics"] },
      { type: "Fine dining restaurant", range: "80–200 references", desc: "The list is part of the experience. Guests expect depth, great vintages and a selection that reflects the restaurant's philosophy. The sommelier is key to guiding, and organization must allow both exploration and quick decisions.", tips: ["Organize by region or style, not just by type", "Section for large formats and special vintages", "Suggested pairings with tasting menu"] },
      { type: "Wine bar or enoteca", range: "100–300 references", desc: "Wine is the absolute protagonist. The list should invite exploration, discovery and tasting. Rotation is high, and the by-the-glass offer should be generous. This is where an interactive digital list makes the most sense.", tips: ["20-30 by-the-glass wines minimum", "Weekly rotation of featured wines", "Detailed cards with tasting notes and origin"] },
    ],
    tooManyTag: "Long list problems", tooManyH2: "The risk of having too many wines",
    tooManyP: "More isn't always better. An excessively long list can harm both guest experience and business profitability.",
    tooManyProblems: [
      { icon: HelpCircle, title: "Guest confusion", desc: "When there are too many options, the guest freezes. The paradox of choice leads them to order 'the house wine' or the cheapest — the opposite of what we want." },
      { icon: TrendingDown, title: "Difficulty choosing", desc: "Without clear guidance, the guest spends too much time on the list and less time enjoying. The experience suffers and the table slows down." },
      { icon: RotateCcw, title: "Low reference rotation", desc: "With many references, some never sell. They occupy cellar space, tie up capital and may deteriorate before being served." },
      { icon: Warehouse, title: "Higher cellar stock", desc: "Each reference requires minimum stock. 200 references at 3 bottles average means 600 bottles in the cellar. Does your sales volume justify that investment?" },
    ],
    tooFewTag: "Short list problems", tooFewH2: "The risk of having too few wines",
    tooFewP: "A minimalist list can be attractive, but if it's too short it limits the experience and reduces sales opportunities.",
    tooFewProblems: [
      { icon: Wine, title: "Little variety", desc: "Regular guests tire quickly if they always see the same options. Lack of variety reduces repeat visits and the desire to explore." },
      { icon: DollarSign, title: "Lack of price options", desc: "Without a wide price range, you lose sales from guests seeking something special and those wanting something affordable. The price ladder needs steps." },
      { icon: Utensils, title: "Limited pairings", desc: "With few wines, you can't offer the ideal pairing for each dish. Cuisine and wine should go hand in hand, and that requires a minimum of options." },
    ],
    balanceTag: "The ideal size", balanceH2: "How to find the balance",
    balanceP: "There's no magic number. The key is to analyze your context and make data-driven decisions, not intuition-based. These are the factors to evaluate.",
    balanceFactors: [
      { icon: Utensils, title: "Cuisine type", desc: "Japanese cuisine calls for different wines than an Argentine steakhouse. Your list should reflect and complement your culinary offering, not compete with it." },
      { icon: DollarSign, title: "Average ticket", desc: "If your average ticket is €35, it doesn't make sense for 50% of your list to exceed €40 per bottle. Align your list with what your guest is willing to spend." },
      { icon: Users, title: "Guest profile", desc: "Is your guest a wine expert or discovering? This determines whether you need depth (great vintages, artisan producers) or accessibility (clear descriptions, recommendations)." },
      { icon: RotateCcw, title: "Wine rotation", desc: "Analyze which wines sell and which don't. A good list isn't the longest — it's the one with the best rotation. Each reference must earn its place." },
    ],
    techTag: "Winerim", techH2: "How technology helps you decide",
    techP: "Tools like Winerim analyze your list in real time and provide objective data to decide which wines to keep, which to rotate and where there are opportunities for improvement.",
    techBenefits: [
      { icon: BarChart3, title: "Analyze list structure", desc: "Visualize the distribution by type, price, region and style. Spot imbalances and improvement opportunities at a glance." },
      { icon: Search, title: "Identify duplicates", desc: "Discover wines with similar profiles competing with each other. Eliminate redundancies and make each reference add unique value." },
      { icon: Target, title: "Optimize reference count", desc: "Real sales data to decide which wines to keep, which to rotate and where there are gaps to fill in your offering." },
      { icon: TrendingUp, title: "Improve rotation", desc: "Per-reference sales tracking to identify wines that aren't moving and make data-driven decisions, not intuition-based ones." },
    ],
    ctaH2: "Discover if your wine list has the right size",
    ctaP: "We analyze your wine list for free and give you personalized recommendations on the ideal number of references for your restaurant.",
    ctaBtn: "Request free analysis", ctaDemoBtn: "Request demo",
    analyzeUrl: "/en/wine-list-analysis", demoUrl: "/en/demo",
    links: [
      { to: "/en/how-to-organize-wine-list", label: "How to organize a wine list", type: "guide" },
      { to: "/en/how-to-design-profitable-wine-list", label: "How to design a profitable wine list", type: "guide" },
      { to: "/en/wine-margin-calculator", label: "Margin calculator", type: "tool" },
      { to: "/en/guides/how-to-improve-wine-rotation-in-restaurants", label: "How to improve wine rotation", type: "guide" },
    ],
  },
  it: {
    metaTitle: "Quanti Vini Deve Avere una Carta dei Vini | Guida per Tipo di Ristorante",
    metaDescription: "Scopri quante referenze dovrebbe avere la tua carta dei vini in base al tipo di ristorante.",
    url: "https://winerim.wine/it/quanti-vini-carta-ristorante",
    breadcrumbParent: "Blog", breadcrumbCurrent: "Quanti vini in carta",
    badge: "Guida per ristoranti",
    h1: "Quanti vini deve avere una carta dei vini",
    subtitle: "Guida pratica per definire la dimensione ideale della carta dei vini in base al tipo di ristorante.",
    introH2: "Perché il numero di vini nella tua carta è importante?",
    introP: "Una delle decisioni più importanti nella progettazione di una carta dei vini è definire quante referenze includere. Non si tratta solo di quantità: il numero di vini influisce direttamente sull'esperienza del cliente, sulla redditività dell'attività e sulla gestione della cantina. Una carta con troppi vini genera confusione; una con troppo pochi limita le vendite. L'equilibrio è la chiave.",
    commonProblems: [
      { icon: Layers, text: "Carte troppo lunghe che travolgono il cliente e rendono difficile la scelta" },
      { icon: XCircle, text: "Carte troppo corte che limitano l'esperienza e gli abbinamenti" },
      { icon: Scale, text: "Mancanza di equilibrio tra stili, regioni e fasce di prezzo" },
      { icon: RotateCcw, text: "Duplicazione di vini con profili simili che non aggiungono vera varietà" },
    ],
    recTag: "Raccomandazioni per formato", recH2: "Quanti vini per tipo di ristorante",
    recP: "Non esiste una regola universale. Il numero ideale dipende dal formato, dalla cucina, dal pubblico e dall'operatività. Queste sono linee guida basate sull'esperienza del settore.",
    restaurantTypes: [
      { type: "Ristorante piccolo o bistrot", range: "20–40 referenze", desc: "Una carta compatta e ben curata è la scelta migliore. Ogni vino deve avere uno scopo chiaro: coprire gli stili di base, offrire almeno 3 fasce di prezzo e complementare la cucina. Il cliente apprezza poter scegliere senza sentirsi perso.", tips: ["5-8 rossi, 4-6 bianchi, 2-3 rosati/bollicine", "Almeno 4-6 vini al calice", "Rotazione frequente per mantenere l'interesse"] },
      { type: "Ristorante medio", range: "40–80 referenze", desc: "Qui c'è spazio per approfondire regioni, stili e fasce di prezzo. La carta deve essere ben strutturata con categorie chiare perché il volume non generi confusione. È il punto in cui l'organizzazione fa la differenza.", tips: ["Dividere in sezioni chiare (tipo, regione o stile)", "8-12 vini al calice come minimo", "Includere vini di scoperta accanto ai classici"] },
      { type: "Ristorante gastronomico", range: "80–200 referenze", desc: "La carta è parte dell'esperienza. Il cliente si aspetta profondità, grandi annate e una selezione che rifletta la filosofia del ristorante. Qui il sommelier è fondamentale per guidare, e l'organizzazione deve permettere sia l'esplorazione che la decisione rapida.", tips: ["Organizzazione per regione o stile, non solo per tipo", "Sezione grandi formati e annate speciali", "Abbinamenti suggeriti con il menu degustazione"] },
      { type: "Wine bar o enoteca", range: "100–300 referenze", desc: "Il vino è il protagonista assoluto. La carta deve invitare a esplorare, scoprire e assaggiare. La rotazione è alta e l'offerta al calice deve essere generosa. È dove ha più senso una carta digitale interattiva.", tips: ["20-30 vini al calice come minimo", "Rotazione settimanale dei vini in evidenza", "Schede dettagliate con note di degustazione e origine"] },
    ],
    tooManyTag: "Problemi delle carte lunghe", tooManyH2: "Il rischio di avere troppi vini",
    tooManyP: "Di più non è sempre meglio. Una carta eccessivamente lunga può danneggiare sia l'esperienza del cliente che la redditività dell'attività.",
    tooManyProblems: [
      { icon: HelpCircle, title: "Confusione del cliente", desc: "Quando ci sono troppe opzioni, il cliente si blocca. Il paradosso della scelta lo porta a ordinare 'il vino della casa' o il più economico — esattamente il contrario di quello che vogliamo." },
      { icon: TrendingDown, title: "Difficoltà nella scelta", desc: "Senza una guida chiara, il cliente dedica troppo tempo alla carta e meno a godersi l'esperienza. Il tavolo rallenta." },
      { icon: RotateCcw, title: "Bassa rotazione delle referenze", desc: "Con molte referenze, alcune non si vendono mai. Occupano spazio in cantina, immobilizzano capitale e possono deteriorarsi prima di essere servite." },
      { icon: Warehouse, title: "Maggiore immobilizzo in cantina", desc: "Ogni referenza richiede uno stock minimo. 200 referenze con una media di 3 bottiglie sono 600 bottiglie in cantina. Il tuo volume di vendite giustifica quell'investimento?" },
    ],
    tooFewTag: "Problemi delle carte corte", tooFewH2: "Il rischio di avere troppo pochi vini",
    tooFewP: "Una carta minimalista può essere attraente, ma se è troppo corta limita l'esperienza e riduce le opportunità di vendita.",
    tooFewProblems: [
      { icon: Wine, title: "Poca varietà", desc: "Il cliente abituale si stanca rapidamente se vede sempre le stesse opzioni. La mancanza di varietà riduce le visite ripetute e la voglia di esplorare." },
      { icon: DollarSign, title: "Mancanza di opzioni di prezzo", desc: "Senza un'ampia gamma di prezzi, perdi vendite sia dal cliente che cerca qualcosa di speciale sia da quello che vuole qualcosa di accessibile. La scala dei prezzi ha bisogno di gradini." },
      { icon: Utensils, title: "Limitazione degli abbinamenti", desc: "Con pochi vini, non puoi offrire l'abbinamento ideale per ogni piatto. Cucina e vino devono andare di pari passo, e questo richiede un minimo di opzioni." },
    ],
    balanceTag: "La dimensione ideale", balanceH2: "Come trovare l'equilibrio",
    balanceP: "Non c'è un numero magico. La chiave è analizzare il tuo contesto e prendere decisioni basate sui dati, non sull'intuizione. Questi sono i fattori da valutare.",
    balanceFactors: [
      { icon: Utensils, title: "Tipo di cucina", desc: "Una cucina giapponese richiede vini diversi da una steakhouse argentina. La tua carta deve riflettere e complementare la tua proposta gastronomica, non competere con essa." },
      { icon: DollarSign, title: "Scontrino medio", desc: "Se il tuo scontrino medio è di 35€, non ha senso che il 50% della tua carta superi i 40€ a bottiglia. Allinea la tua carta con quello che il tuo cliente è disposto a spendere." },
      { icon: Users, title: "Profilo del cliente", desc: "Il tuo cliente è un esperto di vino o sta scoprendo? Questo determina se hai bisogno di profondità (grandi annate, produttori d'autore) o accessibilità (descrizioni chiare, raccomandazioni)." },
      { icon: RotateCcw, title: "Rotazione dei vini", desc: "Analizza quali vini si vendono e quali no. Una buona carta non è la più lunga, ma quella con la migliore rotazione. Ogni referenza deve guadagnarsi il suo posto." },
    ],
    techTag: "Winerim", techH2: "Come la tecnologia ti aiuta a decidere",
    techP: "Strumenti come Winerim analizzano la tua carta in tempo reale e ti forniscono dati oggettivi per decidere quali vini mantenere, quali ruotare e dove ci sono opportunità di miglioramento.",
    techBenefits: [
      { icon: BarChart3, title: "Analizzare la struttura della carta", desc: "Visualizza la distribuzione per tipo, prezzo, regione e stile. Individua squilibri e opportunità di miglioramento a colpo d'occhio." },
      { icon: Search, title: "Identificare duplicati", desc: "Scopri vini con profili simili che competono tra loro. Elimina le ridondanze e fai sì che ogni referenza aggiunga valore unico." },
      { icon: Target, title: "Ottimizzare il numero di referenze", desc: "Dati di vendita reali per decidere quali vini mantenere, quali ruotare e dove ci sono lacune da colmare nella tua offerta." },
      { icon: TrendingUp, title: "Migliorare la rotazione", desc: "Monitoraggio delle vendite per referenza per identificare i vini che non si muovono e prendere decisioni basate sui dati, non sull'intuizione." },
    ],
    ctaH2: "Scopri se la tua carta dei vini ha la dimensione giusta",
    ctaP: "Analizziamo gratuitamente la tua carta dei vini e ti forniamo raccomandazioni personalizzate sul numero ideale di referenze per il tuo ristorante.",
    ctaBtn: "Richiedi analisi gratuita", ctaDemoBtn: "Richiedi demo",
    analyzeUrl: "/it/analisi-carta", demoUrl: "/it/demo",
    links: [
      { to: "/it/come-organizzare-carta-vini", label: "Come organizzare una carta dei vini", type: "guide" },
      { to: "/it/come-progettare-carta-vini-redditizia", label: "Come progettare una carta redditizia", type: "guide" },
      { to: "/it/calcolatrice-margini-vino", label: "Calcolatrice margini", type: "tool" },
      { to: "/it/guide/come-migliorare-rotazione-vini-ristorante", label: "Come migliorare la rotazione dei vini", type: "guide" },
    ],
  },
  fr: {
    metaTitle: "Combien de Vins Doit Contenir une Carte des Vins | Guide par Type de Restaurant",
    metaDescription: "Découvrez combien de références votre carte des vins devrait contenir selon le type de restaurant.",
    url: "https://winerim.wine/fr/combien-de-vins-carte-restaurant",
    breadcrumbParent: "Blog", breadcrumbCurrent: "Combien de vins en carte",
    badge: "Guide pour restaurants",
    h1: "Combien de vins doit contenir une carte des vins",
    subtitle: "Guide pratique pour définir la taille idéale de la carte des vins selon le type de restaurant.",
    introH2: "Pourquoi le nombre de vins sur votre carte est-il important ?",
    introP: "L'une des décisions les plus importantes lors de la conception d'une carte des vins est de définir combien de références inclure. Il ne s'agit pas seulement de quantité : le nombre de vins affecte directement l'expérience client, la rentabilité de l'établissement et la gestion de la cave. Une carte avec trop de vins crée de la confusion ; une carte avec trop peu limite les ventes. L'équilibre est la clé.",
    commonProblems: [
      { icon: Layers, text: "Des cartes trop longues qui submergent le client et rendent le choix difficile" },
      { icon: XCircle, text: "Des cartes trop courtes qui limitent l'expérience et les accords" },
      { icon: Scale, text: "Manque d'équilibre entre les styles, régions et gammes de prix" },
      { icon: RotateCcw, text: "Duplication de vins aux profils similaires qui n'apportent pas de réelle variété" },
    ],
    recTag: "Recommandations par format", recH2: "Combien de vins selon le type de restaurant",
    recP: "Il n'existe pas de règle universelle. Le nombre idéal dépend du format, de la cuisine, de la clientèle et de l'exploitation. Voici des orientations basées sur l'expérience du secteur.",
    restaurantTypes: [
      { type: "Petit restaurant ou bistrot", range: "20–40 références", desc: "Une carte compacte et bien pensée est la meilleure option. Chaque vin doit avoir un objectif clair : couvrir les styles de base, offrir au moins 3 gammes de prix et compléter la cuisine. Le client apprécie de pouvoir choisir sans se sentir perdu.", tips: ["5-8 rouges, 4-6 blancs, 2-3 rosés/effervescents", "Au moins 4-6 vins au verre", "Rotation fréquente pour maintenir l'intérêt"] },
      { type: "Restaurant moyen", range: "40–80 références", desc: "Il y a ici de la place pour approfondir les régions, les styles et les gammes de prix. La carte doit être bien structurée avec des catégories claires pour que le volume ne crée pas de confusion. C'est le point où l'organisation fait la différence.", tips: ["Diviser en sections claires (type, région ou style)", "8-12 vins au verre minimum", "Inclure des vins de découverte aux côtés des classiques"] },
      { type: "Restaurant gastronomique", range: "80–200 références", desc: "La carte fait partie de l'expérience. Le client s'attend à de la profondeur, de grands millésimes et une sélection qui reflète la philosophie du restaurant. Le sommelier est essentiel pour guider, et l'organisation doit permettre à la fois l'exploration et la décision rapide.", tips: ["Organisation par région ou style, pas seulement par type", "Section grands formats et millésimes spéciaux", "Accords suggérés avec le menu dégustation"] },
      { type: "Bar à vins ou œnothèque", range: "100–300 références", desc: "Le vin est le protagoniste absolu. La carte doit inviter à explorer, découvrir et déguster. La rotation est élevée et l'offre au verre doit être généreuse. C'est là qu'une carte digitale interactive a le plus de sens.", tips: ["20-30 vins au verre minimum", "Rotation hebdomadaire des vins en vedette", "Fiches détaillées avec notes de dégustation et origine"] },
    ],
    tooManyTag: "Problèmes des cartes longues", tooManyH2: "Le risque d'avoir trop de vins",
    tooManyP: "Plus n'est pas toujours mieux. Une carte excessivement longue peut nuire à la fois à l'expérience client et à la rentabilité de l'établissement.",
    tooManyProblems: [
      { icon: HelpCircle, title: "Confusion du client", desc: "Quand il y a trop d'options, le client se bloque. Le paradoxe du choix le conduit à commander 'le vin de la maison' ou le moins cher — exactement le contraire de ce que nous recherchons." },
      { icon: TrendingDown, title: "Difficulté de choix", desc: "Sans guide clair, le client passe trop de temps sur la carte et moins à profiter. L'expérience en pâtit et la table ralentit." },
      { icon: RotateCcw, title: "Faible rotation des références", desc: "Avec de nombreuses références, certaines ne se vendent jamais. Elles occupent de l'espace en cave, immobilisent du capital et peuvent se détériorer avant d'être servies." },
      { icon: Warehouse, title: "Stock plus élevé en cave", desc: "Chaque référence nécessite un stock minimum. 200 références à 3 bouteilles en moyenne, c'est 600 bouteilles en cave. Votre volume de ventes justifie-t-il cet investissement ?" },
    ],
    tooFewTag: "Problèmes des cartes courtes", tooFewH2: "Le risque d'avoir trop peu de vins",
    tooFewP: "Une carte minimaliste peut être séduisante, mais si elle est trop courte, elle limite l'expérience et réduit les opportunités de vente.",
    tooFewProblems: [
      { icon: Wine, title: "Peu de variété", desc: "Le client régulier se lasse rapidement s'il voit toujours les mêmes options. Le manque de variété réduit les visites répétées et l'envie d'explorer." },
      { icon: DollarSign, title: "Manque d'options de prix", desc: "Sans une large gamme de prix, vous perdez des ventes tant du client qui cherche quelque chose de spécial que de celui qui veut quelque chose d'accessible. L'échelle des prix a besoin de marches." },
      { icon: Utensils, title: "Limitation des accords", desc: "Avec peu de vins, vous ne pouvez pas offrir l'accord idéal pour chaque plat. La cuisine et le vin doivent aller de pair, et cela nécessite un minimum d'options." },
    ],
    balanceTag: "La taille idéale", balanceH2: "Comment trouver l'équilibre",
    balanceP: "Il n'y a pas de chiffre magique. La clé est d'analyser votre contexte et de prendre des décisions basées sur les données, pas sur l'intuition. Voici les facteurs à évaluer.",
    balanceFactors: [
      { icon: Utensils, title: "Type de cuisine", desc: "Une cuisine japonaise appelle des vins différents d'un steakhouse argentin. Votre carte doit refléter et compléter votre offre gastronomique, pas la concurrencer." },
      { icon: DollarSign, title: "Ticket moyen", desc: "Si votre ticket moyen est de 35€, il n'est pas logique que 50% de votre carte dépasse 40€ la bouteille. Alignez votre carte avec ce que votre client est prêt à dépenser." },
      { icon: Users, title: "Profil du client", desc: "Votre client est-il expert en vin ou en phase de découverte ? Cela détermine si vous avez besoin de profondeur (grands millésimes, producteurs d'auteur) ou d'accessibilité (descriptions claires, recommandations)." },
      { icon: RotateCcw, title: "Rotation des vins", desc: "Analysez quels vins se vendent et lesquels ne se vendent pas. Une bonne carte n'est pas la plus longue, mais celle qui a la meilleure rotation. Chaque référence doit mériter sa place." },
    ],
    techTag: "Winerim", techH2: "Comment la technologie vous aide à décider",
    techP: "Des outils comme Winerim analysent votre carte en temps réel et vous fournissent des données objectives pour décider quels vins conserver, lesquels faire tourner et où se trouvent les opportunités d'amélioration.",
    techBenefits: [
      { icon: BarChart3, title: "Analyser la structure de la carte", desc: "Visualisez la répartition par type, prix, région et style. Repérez les déséquilibres et les opportunités d'amélioration d'un coup d'œil." },
      { icon: Search, title: "Identifier les doublons", desc: "Découvrez les vins aux profils similaires qui se font concurrence. Éliminez les redondances et faites en sorte que chaque référence apporte une valeur unique." },
      { icon: Target, title: "Optimiser le nombre de références", desc: "Des données de vente réelles pour décider quels vins conserver, lesquels faire tourner et où il y a des lacunes à combler dans votre offre." },
      { icon: TrendingUp, title: "Améliorer la rotation", desc: "Suivi des ventes par référence pour identifier les vins qui ne bougent pas et prendre des décisions basées sur les données, pas sur l'intuition." },
    ],
    ctaH2: "Découvrez si votre carte des vins a la bonne taille",
    ctaP: "Nous analysons gratuitement votre carte des vins et vous fournissons des recommandations personnalisées sur le nombre idéal de références pour votre restaurant.",
    ctaBtn: "Demander une analyse gratuite", ctaDemoBtn: "Demander une démo",
    analyzeUrl: "/fr/analyse-carte", demoUrl: "/fr/demo",
    links: [
      { to: "/fr/comment-organiser-carte-des-vins", label: "Comment organiser une carte des vins", type: "guide" },
      { to: "/fr/comment-concevoir-carte-vins-rentable", label: "Comment concevoir une carte rentable", type: "guide" },
      { to: "/fr/calculateur-marge-vin", label: "Calculateur de marges", type: "tool" },
      { to: "/fr/guides/comment-ameliorer-rotation-vins-restaurant", label: "Comment améliorer la rotation des vins", type: "guide" },
    ],
  },
};

const CuantosVinosCarta = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "cuantos-vinos-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.h1,
      description: t.metaDescription,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: t.url,
      inLanguage: lang,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("cuantos-vinos-jsonld")?.remove(); };
  }, [lang, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} type="article"
        hreflang={allLangPaths("/blog/cuantos-vinos-carta-restaurante")} />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadcrumbParent, href: "/blog" }, { label: t.breadcrumbCurrent }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">{t.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to={t.analyzeUrl} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">{t.ctaBtn} <ArrowRight size={16} /></Link>
            <Link to={t.demoUrl} className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">{t.ctaDemoBtn}</Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.introH2}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t.introP}</p>
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

      {/* 3. BY RESTAURANT TYPE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.recTag}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.recH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.recP}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {t.restaurantTypes.map((rt, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg font-bold">{rt.type}</h3>
                    <span className="text-sm font-bold text-wine bg-wine/10 px-3 py-1 rounded-full whitespace-nowrap">{rt.range}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{rt.desc}</p>
                  <ul className="space-y-2">
                    {rt.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm"><CheckCircle size={14} className="text-wine shrink-0 mt-0.5" /><span className="text-muted-foreground">{tip}</span></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TOO MANY */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.tooManyTag}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.tooManyH2}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.tooManyP}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {t.tooManyProblems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><p.icon size={20} className="text-wine" /></div>
                <h3 className="font-heading font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. TOO FEW */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.tooFewTag}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.tooFewH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.tooFewP}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.tooFewProblems.map((p, i) => (
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

      {/* 6. BALANCE */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.balanceTag}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.balanceH2}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.balanceP}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {t.balanceFactors.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><f.icon size={20} className="text-wine" /></div>
                <div>
                  <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. TECH */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.techTag}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.techH2}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.techP}</p>
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

      {/* 8. CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaH2}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaP}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={t.analyzeUrl} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">{t.ctaBtn} <ArrowRight size={16} /></Link>
              <Link to={t.demoUrl} className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">{t.ctaDemoBtn}</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default CuantosVinosCarta;
