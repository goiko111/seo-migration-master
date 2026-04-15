import {
  ShoppingCart, ArrowRight, AlertTriangle, Check, X,
  TrendingUp, DollarSign, RefreshCw, Search, BarChart3,
  Layers, Target, Users, Sparkles, type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import VerticalTemplate, { type VerticalContent } from "@/components/templates/VerticalTemplate";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap, I18nMap } from "@/i18n/types";

const ES: VerticalContent = {
  metaTitle: "Inteligencia de Compras para Restaurantes | Winerim",
  metaDescription: "Decide qué vinos reponer, cuáles renegociar y cuáles retirar con datos reales. Winerim convierte tu proceso de compra en una ventaja competitiva.",
  canonicalUrl: "https://winerim.wine/soluciones/inteligencia-de-compras",
  schemaId: "inteligencia-compras",
  badgeLabel: "Inteligencia de compras", badgeIcon: ShoppingCart,
  breadSolutions: "Soluciones", breadLabel: "Inteligencia de compras",
  heroTitle1: "Comprar mejor vino también es una ", heroTitleHighlight: "ventaja competitiva",
  heroDesc: "Winerim ayuda a decidir qué referencias merece la pena seguir comprando, cuáles conviene renegociar y cuáles no deberías volver a reponer.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "La mayoría de restaurantes compran vino por inercia: reponen lo de siempre, aceptan precios sin comparar y mantienen referencias que inmovilizan capital sin rotar. Winerim conecta tus datos de venta, stock y margen con cada decisión de compra para que cada euro invertido trabaje a tu favor.",
  forTitle: "¿Es para ti?", forLabel: "Encaja perfecto si…", notForLabel: "Quizá no sea para ti si…",
  forItems: [
    "Compras vino sin saber exactamente qué referencias generan margen",
    "Repones por inercia o porque el distribuidor te lo sugiere",
    "No comparas precios de compra entre distribuidores",
    "Tienes capital inmovilizado en stock que no rota",
    "Gestionas múltiples locales con proveedores distintos",
  ],
  notForItems: [
    "Tu carta tiene menos de 30 referencias y compras poco volumen",
    "Ya tienes un sistema de compras con analítica integrada",
    "No consideras el vino una categoría relevante de tu negocio",
  ],
  painLabel: "El problema", painTitle1: "Lo que pasa cuando compras vino ", painTitleHighlight: "sin datos",
  pains: [
    { text: "Compras por intuición: repones lo que siempre has tenido sin cuestionar si rota, si genera margen o si hay alternativas mejores." },
    { text: "Capital inmovilizado: referencias paradas en bodega que no se venden, ocupan espacio y atan liquidez." },
    { text: "Distribuidores caros: aceptas precios sin benchmark porque no tienes datos comparativos entre proveedores." },
    { text: "Reposición automática sin criterio: pides más de lo mismo sin evaluar rendimiento ni demanda real." },
    { text: "Surtido ineficiente: demasiadas referencias de un mismo perfil y huecos en franjas donde hay demanda." },
    { text: "Sin visibilidad de tendencias: no sabes qué estilos, regiones o rangos de precio están ganando tracción." },
  ],
  tableLabel: "Comparativa", tableTitle: "Compras con intuición vs. con inteligencia",
  tableHeaders: ["Decisión", "Sin datos", "Con Winerim"],
  tableRows: [
    { area: "Qué reponer", without: "Lo de siempre", with_w: "Lo que rota, genera margen y tiene demanda" },
    { area: "Qué no reponer", without: "Se descubre cuando caduca", with_w: "Alertas de baja rotación antes de recomprar" },
    { area: "A qué precio comprar", without: "El que pone el distribuidor", with_w: "Benchmark de precios entre proveedores" },
    { area: "Qué renegociar", without: "Lo que parece caro", with_w: "Lo que está por encima del precio medio de red" },
    { area: "Qué sustituir", without: "Cuando el distribuidor lo propone", with_w: "Cuando los datos muestran una alternativa mejor" },
    { area: "Cuánto comprar", without: "Intuición y espacio en bodega", with_w: "Proyección por rotación y estacionalidad" },
  ],
  solLabel: "La solución", solTitle1: "Winerim convierte cada compra en una ", solTitleHighlight: "decisión informada",
  advantages: [
    { title: "Comparativa de precios de compra", desc: "Visualiza el precio de cada referencia en cada distribuidor y detecta sobreprecios." },
    { title: "Alertas de sobreprecio", desc: "Notificación automática cuando estás pagando más que el precio medio de la red." },
    { title: "Recomendación de reposición", desc: "Basada en rotación real, stock actual y proyección de demanda." },
    { title: "Oportunidades por distribuidor", desc: "Identifica qué proveedor te ofrece mejor relación calidad-precio por categoría." },
    { title: "Lista de compra inteligente", desc: "Generada automáticamente con las referencias que necesitas reponer y las que debes dejar de comprar." },
    { title: "Detección de capital inmovilizado", desc: "Cuantifica cuánto dinero tienes parado en stock que no rota." },
  ],
  advIcons: [DollarSign, AlertTriangle, RefreshCw, Search, ShoppingCart, Target],
  howLabel: "En la práctica", howTitle: "Cómo funciona la inteligencia de compras",
  useCases: [
    { title: "Revisión mensual de compras", scenario: "El F&B Manager revisa 120 referencias con 4 distribuidores.", result: "Detecta 8 referencias con sobreprecio >15% y renegocia, ahorrando €2.400/año." },
    { title: "Lista de no-reposición", scenario: "30 referencias llevan 90+ días sin venta.", result: "Winerim recomienda no reponer 18 y sugiere 5 sustituciones con mayor demanda." },
    { title: "Consolidación de proveedores", scenario: "Grupo con 4 locales y 7 distribuidores distintos.", result: "Identifica oportunidades de consolidación que reducen costes logísticos un 12%." },
  ],
  ucIcons: [BarChart3, RefreshCw, Layers],
  impactLabel: "Resultados", impactTitle: "Impacto medible en compras",
  impactSubtitle: "Basado en restaurantes que usan Winerim para sus decisiones de compra.",
  impacts: [
    { label: "Coste de compra −8–15%", desc: "Al detectar sobreprecios y renegociar con datos." },
    { label: "Capital liberado +20–35%", desc: "Reducción de stock muerto e inventario ineficiente." },
    { label: "Tiempo de decisión −60%", desc: "Lista de compra inteligente generada automáticamente." },
    { label: "Margen bruto +5–10%", desc: "Mejor precio de compra se traduce directamente en margen." },
    { label: "Menos merma", desc: "Compras ajustadas a rotación real reducen pérdidas." },
    { label: "Mejor relación con distribuidores", desc: "Negociar con datos genera confianza y mejores condiciones." },
  ],
  impactIcons: [DollarSign, Target, Sparkles, TrendingUp, RefreshCw, Users],
  doesLabel: "Lo que Winerim sí hace", doesNotLabel: "Lo que Winerim no hace", doesTitle: "Expectativas claras",
  doesItems: [
    "Analiza el rendimiento de cada referencia que compras",
    "Compara precios entre distribuidores",
    "Genera alertas de sobreprecio y stock inmovilizado",
    "Recomienda qué reponer y qué dejar de comprar",
    "Produce listas de compra inteligentes",
    "Cuantifica el capital inmovilizado en tu bodega",
  ],
  doesNotItems: [
    "No realiza pedidos a distribuidores por ti",
    "No negocia precios automáticamente",
    "No gestiona logística de entregas",
    "No es un marketplace de vinos",
  ],
  faqs: [
    { q: "¿Es lo mismo que Winerim Supply?", a: "Winerim Supply es el módulo técnico que alimenta esta capacidad. Esta página explica cómo la inteligencia de compras se aplica a tu restaurante como solución de negocio." },
    { q: "¿Necesito conectar mis distribuidores?", a: "No es obligatorio. Winerim trabaja con los datos de compra que ya tienes. Si conectas distribuidores, la comparativa es más precisa." },
    { q: "¿Funciona para grupos con múltiples locales?", a: "Sí. Especialmente útil para consolidar compras y detectar diferencias de precio entre locales." },
    { q: "¿Puedo probar antes de contratar?", a: "Sí. Te ofrecemos un análisis gratuito de tu carta y una demo personalizada." },
    { q: "¿Cuánto tarda en dar resultados?", a: "Las primeras alertas de sobreprecio y recomendaciones aparecen en la primera semana." },
    { q: "¿Se integra con mi TPV?", a: "Winerim se integra con los principales TPV del sector para cruzar datos de venta con datos de compra." },
  ],
  ctaLabel: "Da el siguiente paso",
  ctaTitle: "¿Sabes cuánto estás dejando de ganar en cada compra de vino?",
  ctaDesc: "Solicita una demo y te mostramos las oportunidades de ahorro y optimización en tu proceso de compra.",
  ctaPrimary: "Solicitar demo", ctaSecondary: "Calculadora de compra inteligente",
  ctaMicro: "Sin compromiso. Diagnóstico personalizado en menos de 48 horas.",
  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { label: "Calculadora de compra inteligente", to: "/herramientas/calculadora-compra-inteligente", description: "Simula ahorros con datos reales", type: "tool" as const },
    { label: "Winerim Supply", to: "/producto/winerim-supply", description: "El motor de inteligencia de compras", type: "solution" as const },
    { label: "Solicitar demo", to: "/demo", description: "Demo con tu carta real", type: "solution" as const },
  ],
  internalLinks: [
    { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
    { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
    { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
    { to: "/soluciones/grupos-restauracion", label: "Soluciones para grupos", type: "solution" },
    { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
  ],
};

const EN: VerticalContent = {
  ...ES,
  metaTitle: "Purchasing Intelligence for Restaurants | Winerim",
  metaDescription: "Decide which wines to restock, renegotiate or delist with real data. Winerim turns your purchasing process into a competitive advantage.",
  canonicalUrl: "https://winerim.wine/en/solutions/purchasing-intelligence",
  badgeLabel: "Purchasing intelligence",
  breadSolutions: "Solutions", breadLabel: "Purchasing intelligence",
  heroTitle1: "Buying better wine is also a ", heroTitleHighlight: "competitive advantage",
  heroDesc: "Winerim helps you decide which references are worth restocking, which to renegotiate and which you should never reorder.",
  ctaDemo: "Request demo", ctaContact: "Talk to the team",
  heroSummary: "Most restaurants buy wine on autopilot: restocking the same references, accepting prices without comparison, keeping stock that ties up capital. Winerim connects your sales, stock and margin data to every purchasing decision so every euro works for you.",
  forTitle: "Is it for you?", forLabel: "Perfect fit if…", notForLabel: "Maybe not for you if…",
  forItems: [
    "You buy wine without knowing which references generate margin",
    "You restock by habit or because the distributor suggests it",
    "You don't compare purchase prices across distributors",
    "You have capital tied up in non-rotating stock",
    "You manage multiple locations with different suppliers",
  ],
  notForItems: [
    "Your list has fewer than 30 references and low volume",
    "You already have a purchasing system with integrated analytics",
    "You don't consider wine a relevant business category",
  ],
  painLabel: "The problem", painTitle1: "What happens when you buy wine ", painTitleHighlight: "without data",
  pains: [
    { text: "Buying by intuition: restocking what you've always had without questioning rotation, margin or alternatives." },
    { text: "Tied-up capital: references sitting in the cellar unsold, taking space and locking liquidity." },
    { text: "Expensive distributors: accepting prices without benchmarks because you lack comparative data." },
    { text: "Automatic restocking without criteria: ordering more of the same without evaluating performance." },
    { text: "Inefficient assortment: too many references of the same profile and gaps where demand exists." },
    { text: "No visibility on trends: you don't know which styles or price bands are gaining traction." },
  ],
  tableLabel: "Comparison", tableTitle: "Purchasing by intuition vs. with intelligence",
  tableHeaders: ["Decision", "Without data", "With Winerim"],
  tableRows: [
    { area: "What to restock", without: "The usual", with_w: "What rotates, generates margin and has demand" },
    { area: "What not to restock", without: "Discovered when it expires", with_w: "Low-rotation alerts before reordering" },
    { area: "At what price", without: "Whatever the distributor quotes", with_w: "Price benchmark across suppliers" },
    { area: "What to renegotiate", without: "What seems expensive", with_w: "What's above the network average price" },
    { area: "What to substitute", without: "When the distributor proposes", with_w: "When data shows a better alternative" },
    { area: "How much to buy", without: "Gut feel and cellar space", with_w: "Projection by rotation and seasonality" },
  ],
  solLabel: "The solution", solTitle1: "Winerim turns every purchase into an ", solTitleHighlight: "informed decision",
  advantages: [
    { title: "Purchase price comparison", desc: "See each reference's price across distributors and spot overpricing." },
    { title: "Overpricing alerts", desc: "Automatic notification when you're paying above the network average." },
    { title: "Restocking recommendations", desc: "Based on real rotation, current stock and demand projection." },
    { title: "Opportunities by distributor", desc: "Identify which supplier offers the best value per category." },
    { title: "Smart purchase list", desc: "Auto-generated with references to restock and those to stop buying." },
    { title: "Tied-up capital detection", desc: "Quantify how much money is sitting in non-rotating stock." },
  ],
  howLabel: "In practice", howTitle: "How purchasing intelligence works",
  useCases: [
    { title: "Monthly purchasing review", scenario: "The F&B Manager reviews 120 references across 4 distributors.", result: "Detects 8 references overpriced by >15% and renegotiates, saving €2,400/year." },
    { title: "No-restock list", scenario: "30 references with 90+ days without a sale.", result: "Winerim recommends not restocking 18 and suggests 5 higher-demand substitutes." },
    { title: "Supplier consolidation", scenario: "Group with 4 locations and 7 different distributors.", result: "Identifies consolidation opportunities reducing logistics costs by 12%." },
  ],
  impactLabel: "Results", impactTitle: "Measurable purchasing impact",
  impactSubtitle: "Based on restaurants using Winerim for purchasing decisions.",
  impacts: [
    { label: "Purchasing cost −8–15%", desc: "By detecting overpricing and renegotiating with data." },
    { label: "Capital freed +20–35%", desc: "Reducing dead stock and inefficient inventory." },
    { label: "Decision time −60%", desc: "Smart purchase list generated automatically." },
    { label: "Gross margin +5–10%", desc: "Better purchase price translates directly into margin." },
    { label: "Less waste", desc: "Purchases aligned to real rotation reduce losses." },
    { label: "Better distributor relationships", desc: "Negotiating with data builds trust and better terms." },
  ],
  doesLabel: "What Winerim does", doesNotLabel: "What Winerim doesn't do", doesTitle: "Clear expectations",
  doesItems: [
    "Analyses each reference's purchasing performance",
    "Compares prices across distributors",
    "Generates overpricing and tied-up capital alerts",
    "Recommends what to restock and what to stop buying",
    "Produces smart purchase lists",
    "Quantifies tied-up capital in your cellar",
  ],
  doesNotItems: [
    "Doesn't place orders with distributors for you",
    "Doesn't negotiate prices automatically",
    "Doesn't manage delivery logistics",
    "Is not a wine marketplace",
  ],
  faqs: [
    { q: "Is this the same as Winerim Supply?", a: "Winerim Supply is the technical module powering this capability. This page explains how purchasing intelligence applies to your restaurant as a business solution." },
    { q: "Do I need to connect my distributors?", a: "Not mandatory. Winerim works with your existing purchase data. Connecting distributors makes comparisons more precise." },
    { q: "Does it work for multi-unit groups?", a: "Yes. Especially useful for consolidating purchases and detecting price differences across locations." },
    { q: "Can I try before subscribing?", a: "Yes. We offer a free wine list analysis and personalised demo." },
    { q: "How quickly does it deliver results?", a: "First overpricing alerts and recommendations appear within the first week." },
    { q: "Does it integrate with my POS?", a: "Winerim integrates with leading hospitality POS systems to cross-reference sales with purchasing data." },
  ],
  ctaLabel: "Take the next step",
  ctaTitle: "Do you know how much you're leaving on the table with every wine purchase?",
  ctaDesc: "Request a demo and we'll show you saving and optimisation opportunities in your purchasing process.",
  ctaPrimary: "Request demo", ctaSecondary: "Smart purchasing calculator",
  ctaMicro: "No commitment. Personalised diagnostic within 48 hours.",
  nextStepsTitle: "Next steps",
  nextSteps: ES.nextSteps,
  internalLinks: ES.internalLinks,
};

const IT: VerticalContent = {
  ...ES,
  metaTitle: "Intelligenza Acquisti per Ristoranti | Winerim",
  metaDescription: "Decidi quali vini riassortire, rinegoziare o ritirare con dati reali. Winerim trasforma il tuo processo di acquisto in un vantaggio competitivo.",
  canonicalUrl: "https://winerim.wine/it/soluzioni/intelligenza-acquisti",
  badgeLabel: "Intelligenza acquisti",
  breadSolutions: "Soluzioni", breadLabel: "Intelligenza acquisti",
  heroTitle1: "Comprare vino migliore è anche un ", heroTitleHighlight: "vantaggio competitivo",
  heroDesc: "Winerim aiuta a decidere quali referenze vale la pena riassortire, quali rinegoziare e quali non dovresti più riordinare.",
  ctaDemo: "Richiedi demo", ctaContact: "Parla con il team",
  heroSummary: "La maggior parte dei ristoranti compra vino per inerzia: riassortisce sempre le stesse referenze, accetta prezzi senza confrontare e mantiene stock che immobilizza capitale. Winerim collega i tuoi dati di vendita, stock e margine a ogni decisione d'acquisto.",
  forTitle: "Fa per te?", forLabel: "Perfetto se…", notForLabel: "Forse non per te se…",
  forItems: [
    "Acquisti vino senza sapere quali referenze generano margine",
    "Riassortisci per abitudine o perché il distributore lo suggerisce",
    "Non confronti i prezzi d'acquisto tra distributori",
    "Hai capitale immobilizzato in stock che non ruota",
    "Gestisci più locali con fornitori diversi",
  ],
  notForItems: [
    "La tua carta ha meno di 30 referenze e acquisti poco volume",
    "Hai già un sistema acquisti con analisi integrata",
    "Non consideri il vino una categoria rilevante",
  ],
  painLabel: "Il problema", painTitle1: "Cosa succede quando acquisti vino ", painTitleHighlight: "senza dati",
  pains: [
    { text: "Acquisti per intuizione: riassortisci ciò che hai sempre avuto senza valutare rotazione, margine o alternative." },
    { text: "Capitale immobilizzato: referenze ferme in cantina che non si vendono, occupano spazio e bloccano liquidità." },
    { text: "Distributori costosi: accetti prezzi senza benchmark perché non hai dati comparativi." },
    { text: "Riassortimento automatico senza criterio: ordini sempre lo stesso senza valutare le performance." },
    { text: "Assortimento inefficiente: troppe referenze dello stesso profilo e lacune dove c'è domanda." },
    { text: "Nessuna visibilità sui trend: non sai quali stili o fasce di prezzo stanno guadagnando terreno." },
  ],
  tableLabel: "Confronto", tableTitle: "Acquisti per intuizione vs. con intelligenza",
  tableHeaders: ["Decisione", "Senza dati", "Con Winerim"],
  tableRows: [
    { area: "Cosa riassortire", without: "Il solito", with_w: "Ciò che ruota, genera margine e ha domanda" },
    { area: "Cosa non riassortire", without: "Si scopre quando scade", with_w: "Allerte di bassa rotazione prima di riordinare" },
    { area: "A che prezzo comprare", without: "Quello del distributore", with_w: "Benchmark prezzi tra fornitori" },
    { area: "Cosa rinegoziare", without: "Ciò che sembra caro", with_w: "Ciò che è sopra il prezzo medio di rete" },
    { area: "Cosa sostituire", without: "Quando lo propone il distributore", with_w: "Quando i dati mostrano un'alternativa migliore" },
    { area: "Quanto comprare", without: "Intuizione e spazio in cantina", with_w: "Proiezione per rotazione e stagionalità" },
  ],
  solLabel: "La soluzione", solTitle1: "Winerim trasforma ogni acquisto in una ", solTitleHighlight: "decisione informata",
  advantages: [
    { title: "Confronto prezzi d'acquisto", desc: "Visualizza il prezzo di ogni referenza per distributore e rileva sovrapprezzi." },
    { title: "Alert sovrapprezzi", desc: "Notifica automatica quando paghi più della media di rete." },
    { title: "Raccomandazione di riassortimento", desc: "Basata su rotazione reale, stock attuale e proiezione domanda." },
    { title: "Opportunità per distributore", desc: "Identifica quale fornitore offre il miglior rapporto qualità-prezzo per categoria." },
    { title: "Lista acquisti intelligente", desc: "Generata automaticamente con referenze da riassortire e da non ricomprare." },
    { title: "Rilevamento capitale immobilizzato", desc: "Quantifica quanto denaro è fermo in stock che non ruota." },
  ],
  howLabel: "In pratica", howTitle: "Come funziona l'intelligenza acquisti",
  useCases: [
    { title: "Revisione mensile acquisti", scenario: "L'F&B Manager rivede 120 referenze con 4 distributori.", result: "Rileva 8 referenze con sovrapprezzo >15% e rinegozia, risparmiando €2.400/anno." },
    { title: "Lista non-riassortimento", scenario: "30 referenze con 90+ giorni senza vendita.", result: "Winerim raccomanda di non riassortire 18 e suggerisce 5 sostituti con maggiore domanda." },
    { title: "Consolidamento fornitori", scenario: "Gruppo con 4 locali e 7 distributori diversi.", result: "Identifica opportunità di consolidamento che riducono i costi logistici del 12%." },
  ],
  impactLabel: "Risultati", impactTitle: "Impatto misurabile sugli acquisti",
  impactSubtitle: "Basato su ristoranti che usano Winerim per le decisioni d'acquisto.",
  impacts: [
    { label: "Costo acquisti −8–15%", desc: "Rilevando sovrapprezzi e rinegoziando con dati." },
    { label: "Capitale liberato +20–35%", desc: "Riduzione stock morto e inventario inefficiente." },
    { label: "Tempo decisionale −60%", desc: "Lista acquisti intelligente generata automaticamente." },
    { label: "Margine lordo +5–10%", desc: "Miglior prezzo d'acquisto si traduce direttamente in margine." },
    { label: "Meno sprechi", desc: "Acquisti allineati alla rotazione reale riducono le perdite." },
    { label: "Migliore rapporto con distributori", desc: "Negoziare con dati genera fiducia e condizioni migliori." },
  ],
  doesLabel: "Cosa fa Winerim", doesNotLabel: "Cosa non fa Winerim", doesTitle: "Aspettative chiare",
  doesItems: [
    "Analizza le performance di acquisto di ogni referenza",
    "Confronta i prezzi tra distributori",
    "Genera allerte di sovrapprezzo e capitale immobilizzato",
    "Raccomanda cosa riassortire e cosa smettere di comprare",
    "Produce liste acquisti intelligenti",
    "Quantifica il capitale immobilizzato in cantina",
  ],
  doesNotItems: [
    "Non effettua ordini ai distributori per te",
    "Non negozia i prezzi automaticamente",
    "Non gestisce la logistica delle consegne",
    "Non è un marketplace di vini",
  ],
  faqs: [
    { q: "È lo stesso di Winerim Supply?", a: "Winerim Supply è il modulo tecnico che alimenta questa capacità. Questa pagina spiega come l'intelligenza acquisti si applica al tuo ristorante come soluzione di business." },
    { q: "Devo collegare i miei distributori?", a: "Non è obbligatorio. Winerim lavora con i dati d'acquisto che hai già. Collegare i distributori rende i confronti più precisi." },
    { q: "Funziona per gruppi multi-locale?", a: "Sì. Particolarmente utile per consolidare acquisti e rilevare differenze di prezzo tra locali." },
    { q: "Posso provare prima di abbonarmi?", a: "Sì. Offriamo un'analisi gratuita e demo personalizzata." },
    { q: "Quanto tempo ci vuole per ottenere risultati?", a: "Le prime allerte e raccomandazioni appaiono nella prima settimana." },
    { q: "Si integra con il mio POS?", a: "Winerim si integra con i principali POS del settore per incrociare dati di vendita con dati d'acquisto." },
  ],
  ctaLabel: "Fai il prossimo passo",
  ctaTitle: "Sai quanto stai perdendo ad ogni acquisto di vino?",
  ctaDesc: "Richiedi una demo e ti mostreremo le opportunità di risparmio e ottimizzazione nel tuo processo d'acquisto.",
  ctaPrimary: "Richiedi demo", ctaSecondary: "Calcolatrice acquisto intelligente",
  ctaMicro: "Senza impegno. Diagnosi personalizzata entro 48 ore.",
  nextStepsTitle: "Prossimi passi",
  nextSteps: ES.nextSteps,
  internalLinks: ES.internalLinks,
};

const FR: VerticalContent = {
  ...ES,
  metaTitle: "Intelligence d'Achats pour Restaurants | Winerim",
  metaDescription: "Décidez quels vins réapprovisionner, renégocier ou retirer avec des données réelles. Winerim transforme vos achats en avantage concurrentiel.",
  canonicalUrl: "https://winerim.wine/fr/solutions/intelligence-achats",
  badgeLabel: "Intelligence d'achats",
  breadSolutions: "Solutions", breadLabel: "Intelligence d'achats",
  heroTitle1: "Mieux acheter le vin, c'est aussi un ", heroTitleHighlight: "avantage concurrentiel",
  heroDesc: "Winerim vous aide à décider quelles références méritent d'être réapprovisionnées, lesquelles renégocier et lesquelles ne plus commander.",
  ctaDemo: "Demander une démo", ctaContact: "Parler à l'équipe",
  heroSummary: "La plupart des restaurants achètent le vin en pilote automatique : réapprovisionnement des mêmes références, prix acceptés sans comparaison, stock qui immobilise du capital. Winerim connecte vos données de vente, stock et marge à chaque décision d'achat.",
  forTitle: "Est-ce pour vous ?", forLabel: "Parfait si…", notForLabel: "Peut-être pas si…",
  forItems: [
    "Vous achetez du vin sans savoir quelles références génèrent de la marge",
    "Vous réapprovisionnez par habitude ou parce que le distributeur le suggère",
    "Vous ne comparez pas les prix d'achat entre distributeurs",
    "Vous avez du capital immobilisé dans du stock qui ne tourne pas",
    "Vous gérez plusieurs sites avec des fournisseurs différents",
  ],
  notForItems: [
    "Votre carte a moins de 30 références et un faible volume d'achat",
    "Vous avez déjà un système d'achats avec analytique intégrée",
    "Vous ne considérez pas le vin comme une catégorie pertinente",
  ],
  painLabel: "Le problème", painTitle1: "Ce qui se passe quand vous achetez du vin ", painTitleHighlight: "sans données",
  pains: [
    { text: "Achats par intuition : réapprovisionnement de ce que vous avez toujours eu sans questionner la rotation ou la marge." },
    { text: "Capital immobilisé : références en cave qui ne se vendent pas, occupent de l'espace et bloquent la trésorerie." },
    { text: "Distributeurs chers : prix acceptés sans benchmark faute de données comparatives." },
    { text: "Réapprovisionnement automatique sans critère : commander plus de la même chose sans évaluer la performance." },
    { text: "Assortiment inefficace : trop de références du même profil et des lacunes là où il y a de la demande." },
    { text: "Aucune visibilité sur les tendances : vous ne savez pas quels styles gagnent du terrain." },
  ],
  tableLabel: "Comparatif", tableTitle: "Achats par intuition vs. avec intelligence",
  tableHeaders: ["Décision", "Sans données", "Avec Winerim"],
  tableRows: [
    { area: "Quoi réapprovisionner", without: "Le habituel", with_w: "Ce qui tourne, génère de la marge et a de la demande" },
    { area: "Quoi ne pas réapprovisionner", without: "Découvert quand ça expire", with_w: "Alertes de faible rotation avant de recommander" },
    { area: "À quel prix acheter", without: "Celui du distributeur", with_w: "Benchmark des prix entre fournisseurs" },
    { area: "Quoi renégocier", without: "Ce qui semble cher", with_w: "Ce qui est au-dessus du prix moyen du réseau" },
    { area: "Quoi substituer", without: "Quand le distributeur le propose", with_w: "Quand les données montrent une meilleure alternative" },
    { area: "Combien acheter", without: "Intuition et espace en cave", with_w: "Projection par rotation et saisonnalité" },
  ],
  solLabel: "La solution", solTitle1: "Winerim transforme chaque achat en une ", solTitleHighlight: "décision éclairée",
  advantages: [
    { title: "Comparatif des prix d'achat", desc: "Visualisez le prix de chaque référence par distributeur et détectez les surcoûts." },
    { title: "Alertes de surcoût", desc: "Notification automatique quand vous payez au-dessus de la moyenne du réseau." },
    { title: "Recommandation de réapprovisionnement", desc: "Basée sur la rotation réelle, le stock actuel et la projection de demande." },
    { title: "Opportunités par distributeur", desc: "Identifiez quel fournisseur offre le meilleur rapport qualité-prix par catégorie." },
    { title: "Liste d'achats intelligente", desc: "Générée automatiquement avec les références à réapprovisionner et celles à arrêter." },
    { title: "Détection du capital immobilisé", desc: "Quantifiez combien d'argent dort dans du stock qui ne tourne pas." },
  ],
  howLabel: "En pratique", howTitle: "Comment fonctionne l'intelligence d'achats",
  useCases: [
    { title: "Revue mensuelle des achats", scenario: "Le F&B Manager passe en revue 120 références chez 4 distributeurs.", result: "Détecte 8 références surcoûtées de >15% et renégocie, économisant 2 400€/an." },
    { title: "Liste de non-réapprovisionnement", scenario: "30 références avec 90+ jours sans vente.", result: "Winerim recommande de ne pas réapprovisionner 18 et suggère 5 substituts à plus forte demande." },
    { title: "Consolidation fournisseurs", scenario: "Groupe avec 4 sites et 7 distributeurs différents.", result: "Identifie des opportunités de consolidation réduisant les coûts logistiques de 12%." },
  ],
  impactLabel: "Résultats", impactTitle: "Impact mesurable sur les achats",
  impactSubtitle: "Basé sur des restaurants utilisant Winerim pour leurs décisions d'achat.",
  impacts: [
    { label: "Coût d'achat −8–15%", desc: "En détectant les surcoûts et en renégociant avec des données." },
    { label: "Capital libéré +20–35%", desc: "Réduction du stock mort et de l'inventaire inefficace." },
    { label: "Temps de décision −60%", desc: "Liste d'achats intelligente générée automatiquement." },
    { label: "Marge brute +5–10%", desc: "Un meilleur prix d'achat se traduit directement en marge." },
    { label: "Moins de pertes", desc: "Achats alignés sur la rotation réelle réduisent les pertes." },
    { label: "Meilleure relation fournisseurs", desc: "Négocier avec des données crée la confiance et de meilleures conditions." },
  ],
  doesLabel: "Ce que Winerim fait", doesNotLabel: "Ce que Winerim ne fait pas", doesTitle: "Attentes claires",
  doesItems: [
    "Analyse la performance d'achat de chaque référence",
    "Compare les prix entre distributeurs",
    "Génère des alertes de surcoût et capital immobilisé",
    "Recommande quoi réapprovisionner et quoi arrêter",
    "Produit des listes d'achats intelligentes",
    "Quantifie le capital immobilisé en cave",
  ],
  doesNotItems: [
    "Ne passe pas de commandes aux distributeurs pour vous",
    "Ne négocie pas les prix automatiquement",
    "Ne gère pas la logistique de livraison",
    "N'est pas un marketplace de vins",
  ],
  faqs: [
    { q: "Est-ce la même chose que Winerim Supply ?", a: "Winerim Supply est le module technique qui alimente cette capacité. Cette page explique comment l'intelligence d'achats s'applique à votre restaurant." },
    { q: "Dois-je connecter mes distributeurs ?", a: "Pas obligatoire. Winerim travaille avec vos données d'achat existantes. Connecter les distributeurs rend les comparaisons plus précises." },
    { q: "Ça fonctionne pour les groupes multi-sites ?", a: "Oui. Particulièrement utile pour consolider les achats et détecter les écarts de prix entre sites." },
    { q: "Puis-je essayer avant de m'abonner ?", a: "Oui. Nous offrons une analyse gratuite et une démo personnalisée." },
    { q: "En combien de temps les résultats arrivent ?", a: "Les premières alertes et recommandations apparaissent dès la première semaine." },
    { q: "S'intègre-t-il avec mon POS ?", a: "Winerim s'intègre avec les principaux POS du secteur pour croiser données de vente et d'achat." },
  ],
  ctaLabel: "Passez à l'étape suivante",
  ctaTitle: "Savez-vous combien vous perdez à chaque achat de vin ?",
  ctaDesc: "Demandez une démo et nous vous montrerons les opportunités d'économie et d'optimisation dans votre processus d'achat.",
  ctaPrimary: "Demander une démo", ctaSecondary: "Calculateur d'achat intelligent",
  ctaMicro: "Sans engagement. Diagnostic personnalisé sous 48 heures.",
  nextStepsTitle: "Prochaines étapes",
  nextSteps: ES.nextSteps,
  internalLinks: ES.internalLinks,
};

const i18n: I18nMap<VerticalContent> = { es: ES, en: EN, it: IT, fr: FR };

/* ─── Supply connection block i18n ─── */
const supplyBridge: Record<string, { tag: string; title: string; desc: string; cta: string }> = {
  es: {
    tag: "Conexión directa",
    title: "Esta solución se alimenta de Winerim Supply",
    desc: "Todo lo que ves en esta página — comparativas de precio, alertas de sobreprecio, listas de reposición — es posible gracias al motor de inteligencia de compras de Winerim Supply. Conecta tus datos y deja que el sistema trabaje por ti.",
    cta: "Descubre Winerim Supply",
  },
  en: {
    tag: "Direct connection",
    title: "This solution is powered by Winerim Supply",
    desc: "Everything on this page — price comparisons, overpricing alerts, restocking lists — is powered by the purchasing intelligence engine of Winerim Supply. Connect your data and let the system work for you.",
    cta: "Discover Winerim Supply",
  },
  it: {
    tag: "Connessione diretta",
    title: "Questa soluzione è alimentata da Winerim Supply",
    desc: "Tutto ciò che vedi in questa pagina — confronti di prezzo, alert di sovrapprezzi, liste di riassortimento — è reso possibile dal motore di intelligenza acquisti di Winerim Supply. Collega i tuoi dati e lascia che il sistema lavori per te.",
    cta: "Scopri Winerim Supply",
  },
  fr: {
    tag: "Connexion directe",
    title: "Cette solution est alimentée par Winerim Supply",
    desc: "Tout ce que vous voyez sur cette page — comparaisons de prix, alertes de surcoût, listes de réapprovisionnement — est rendu possible par le moteur d'intelligence d'achats de Winerim Supply. Connectez vos données et laissez le système travailler pour vous.",
    cta: "Découvrir Winerim Supply",
  },
};

const InteligenciaCompras = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;
  const sb = supplyBridge[lang] || supplyBridge.es;

  return (
    <VerticalTemplate t={t} hideSupplyBlock>
      {/* ── Visual connection to Winerim Supply ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-card p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,hsl(152_60%_50%/0.08),transparent_60%)]" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-emerald-500/80 mb-3">
                    <ShoppingCart size={14} /> {sb.tag}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">{sb.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sb.desc}</p>
                </div>
                <Link
                  to={localePath("/producto/winerim-supply")}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors shrink-0"
                >
                  {sb.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </VerticalTemplate>
  );
};
export default InteligenciaCompras;
