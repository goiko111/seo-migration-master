import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-conectar-carta-stock-ventas-margen",
  metaTitle: "Cómo Conectar Carta, Stock, Ventas y Margen en un Restaurante | Guía",
  metaDescription: "Guía para integrar la gestión de carta de vinos, stock, ventas y márgenes en un sistema coherente.",
  heroTitle: "Cómo conectar carta, stock, ventas y margen en un restaurante",
  heroSubtitle: "La carta, el stock, las ventas y el margen son cuatro piezas del mismo puzzle. Cuando se conectan, las decisiones se toman con claridad.",
  heroBadge: "Guía de gestión",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo", ctaSecondaryText: "Analizar mi carta", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Conecta todo con Winerim", ctaFinalDescription: "Winerim integra carta, stock, ventas y margen en un único panel.",
  tableOfContents: ["El problema de los silos","Las 4 piezas y cómo se conectan","Carta → Stock","Stock → Ventas","Ventas → Margen","El ciclo completo"],
  sections: [
    { heading: "1. El problema de los silos de información", content: "La carta en un documento, el stock en una hoja, las ventas en el TPV y el margen en el informe del controller. Sin cruzar datos, las decisiones son parciales.", tips: ["La carta se diseña sin datos de venta.", "El stock se gestiona sin datos de rotación.", "Las ventas se miran sin datos de margen.", "El coste de esta desconexión: 5-15% de la facturación de vino."], icon: "alert" },
    { heading: "2. Las 4 piezas y cómo se conectan", content: "La carta define qué vendes. El stock soporta la carta. Las ventas son el resultado. El margen es la consecuencia.", tips: ["Carta → Stock: diseña considerando lo que puedes tener en stock.", "Stock → Carta: si no puedes reponer, no destaque.", "Ventas → Carta: los datos dicen qué funciona.", "Margen → Compras: guía qué comprar y cuánto."], icon: "lightbulb" },
    { heading: "3. Carta → Stock: el flujo de compras", content: "Cada referencia en carta implica una decisión de compra y un compromiso financiero.", tips: ["Cada referencia es un compromiso de stock.", "Calcula stock mínimo para 60-90 días.", "Calcula el capital total necesario en bodega.", "Prioriza proveedores fiables con entregas frecuentes."], icon: "list" },
    { heading: "4. Stock → Ventas: la rotación como puente", content: "El stock es un recurso financiero que debe generar retorno. La rotación conecta stock con ventas.", tips: ["Tasa de rotación objetivo: 8-12 al año.", "Rotación < 4: evaluar si debe seguir en carta.", "Los vinos con más stock en posiciones visibles.", "El inventario debería revisarse junto con datos de venta."], icon: "check" },
    { heading: "5. Ventas → Margen: la rentabilidad real", content: "Facturar mucho no garantiza rentabilidad. Lo que importa es el margen real.", tips: ["Calcula margen real mensualmente.", "Compara con margen teórico: diferencia > 5% = investigar.", "Analiza margen por referencia, no solo global.", "La contribución al margen: margen unitario × unidades vendidas."], icon: "lightbulb" },
    { heading: "6. El ciclo completo: gestión integrada", content: "Cuando las cuatro piezas se conectan, la gestión pasa de reactiva a proactiva.", tips: ["Paso 1: Revisar scorecard mensual.", "Paso 2: Identificar anomalías.", "Paso 3: Decidir acciones.", "Paso 4: Ejecutar cambios.", "Paso 5: Medir el impacto en el siguiente scorecard."], icon: "check" },
  ],
  faqs: [
    { q: "¿Necesito software para conectar estos datos?", a: "No es imprescindible, pero sí recomendable. Winerim lo automatiza completamente." },
    { q: "¿Esto es solo para restaurantes grandes?", a: "No. Los restaurantes pequeños se benefician igual." },
    { q: "¿Cuál es el primer paso?", a: "Empieza por el scorecard mensual: ventas, rotación y margen." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/herramientas/wine-list-score" }, { label: "Calculadora de margen", url: "/calculadora-margen-vino" }],
  relatedGuides: [{ label: "Scorecard mensual", url: "/recursos/scorecard-rendimiento-carta" }, { label: "Cómo usar datos para comprar", url: "/guias/como-usar-datos-para-decidir-que-vinos-comprar" }],
};

const en: GuidePageData = {
  slug: "en/guides/how-to-connect-wine-list-stock-sales-margin",
  metaTitle: "How to Connect Wine List, Stock, Sales and Margin | Guide",
  metaDescription: "Guide to integrating wine list management, stock, sales and margins into a coherent system.",
  heroTitle: "How to connect wine list, stock, sales and margin",
  heroSubtitle: "List, stock, sales and margin are four pieces of the same puzzle. When connected, decisions become clear.",
  heroBadge: "Management guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo", ctaSecondaryText: "Analyze my list", ctaSecondaryUrl: "/en/wine-list-analyzer",
  ctaFinalTitle: "Connect everything with Winerim", ctaFinalDescription: "Winerim integrates list, stock, sales and margin in a single panel.",
  tableOfContents: ["The silo problem","The 4 pieces and how they connect","List → Stock","Stock → Sales","Sales → Margin","The complete cycle"],
  sections: [
    { heading: "1. The silo problem", content: "The list in a design doc, stock in a spreadsheet, sales in the POS and margin in the controller's report. Without crossing data, decisions are partial.", tips: ["The list is designed without sales data.", "Stock is managed without rotation data.", "Sales are viewed without margin data.", "Cost of this disconnection: 5-15% of wine revenue."], icon: "alert" },
    { heading: "2. The 4 pieces and how they connect", content: "The list defines what you sell. Stock supports the list. Sales are the result. Margin is the consequence.", tips: ["List → Stock: design considering what you can stock.", "Stock → List: if you can't replenish, don't feature it.", "Sales → List: data tells you what works.", "Margin → Purchasing: guides what to buy and how much."], icon: "lightbulb" },
    { heading: "3. List → Stock: the purchasing flow", content: "Every reference on the list implies a purchasing decision and financial commitment.", tips: ["Every reference is a stock commitment.", "Calculate minimum stock for 60-90 days.", "Calculate total cellar capital needed.", "Prioritize reliable suppliers with frequent deliveries."], icon: "list" },
    { heading: "4. Stock → Sales: rotation as the bridge", content: "Stock is a financial resource that must generate return. Rotation connects stock to sales.", tips: ["Rotation target: 8-12 per year.", "Rotation < 4: evaluate whether it should stay.", "Wines with most stock should be in visible positions.", "Inventory should be reviewed alongside sales data."], icon: "check" },
    { heading: "5. Sales → Margin: real profitability", content: "High revenue doesn't guarantee profitability. What matters is real margin.", tips: ["Calculate real margin monthly.", "Compare with theoretical margin: > 5% gap = investigate.", "Analyse margin by reference, not just overall.", "Margin contribution: unit margin × units sold."], icon: "lightbulb" },
    { heading: "6. The complete cycle: integrated management", content: "When the four pieces connect, management shifts from reactive to proactive.", tips: ["Step 1: Review monthly scorecard.", "Step 2: Identify anomalies.", "Step 3: Decide actions.", "Step 4: Execute changes.", "Step 5: Measure impact in next scorecard."], icon: "check" },
  ],
  faqs: [
    { q: "Do I need software to connect this data?", a: "Not essential, but highly recommended. Winerim automates it completely." },
    { q: "Is this only for large restaurants?", a: "No. Small restaurants benefit equally." },
    { q: "What's the first step?", a: "Start with a monthly scorecard: sales, rotation and margin." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/en/tools/wine-list-score" }, { label: "Margin calculator", url: "/en/wine-margin-calculator" }],
  relatedGuides: [{ label: "Monthly scorecard", url: "/en/resources/wine-list-performance-scorecard" }, { label: "How to use data for purchasing", url: "/en/guides/how-to-use-data-to-decide-which-wines-to-buy" }],
};

const it: GuidePageData = {
  slug: "it/guide/come-collegare-carta-stock-vendite-margine",
  metaTitle: "Come Collegare Carta, Stock, Vendite e Margine | Guida",
  metaDescription: "Guida per integrare gestione carta dei vini, stock, vendite e margini in un sistema coerente.",
  heroTitle: "Come collegare carta, stock, vendite e margine",
  heroSubtitle: "Carta, stock, vendite e margine sono quattro pezzi dello stesso puzzle. Quando si collegano, le decisioni diventano chiare.",
  heroBadge: "Guida gestionale",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo", ctaSecondaryText: "Analizza la mia carta", ctaSecondaryUrl: "/it/analisi-carta",
  ctaFinalTitle: "Collega tutto con Winerim", ctaFinalDescription: "Winerim integra carta, stock, vendite e margine in un unico pannello.",
  tableOfContents: ["Il problema dei silos","I 4 pezzi e come si collegano","Carta → Stock","Stock → Vendite","Vendite → Margine","Il ciclo completo"],
  sections: [
    { heading: "1. Il problema dei silos di informazione", content: "La carta in un documento, lo stock in un foglio, le vendite nel POS e il margine nel report del controller.", tips: ["La carta si progetta senza dati di vendita.", "Lo stock si gestisce senza dati di rotazione.", "Le vendite si guardano senza dati di margine.", "Costo di questa disconnessione: 5-15% del fatturato vino."], icon: "alert" },
    { heading: "2. I 4 pezzi e come si collegano", content: "La carta definisce cosa vendi. Lo stock supporta la carta. Le vendite sono il risultato. Il margine è la conseguenza.", tips: ["Carta → Stock: progetta considerando cosa puoi tenere in stock.", "Stock → Carta: se non puoi riassortire, non evidenziarlo.", "Vendite → Carta: i dati dicono cosa funziona.", "Margine → Acquisti: guida cosa comprare e quanto."], icon: "lightbulb" },
    { heading: "3. Carta → Stock: il flusso degli acquisti", content: "Ogni referenza in carta implica una decisione d'acquisto e un impegno finanziario.", tips: ["Ogni referenza è un impegno di stock.", "Calcola stock minimo per 60-90 giorni.", "Calcola il capitale totale necessario in cantina.", "Prioritizza fornitori affidabili con consegne frequenti."], icon: "list" },
    { heading: "4. Stock → Vendite: la rotazione come ponte", content: "Lo stock è una risorsa finanziaria che deve generare ritorno. La rotazione collega stock e vendite.", tips: ["Obiettivo rotazione: 8-12 all'anno.", "Rotazione < 4: valutare se deve restare.", "I vini con più stock in posizioni visibili.", "L'inventario va revisionato insieme ai dati di vendita."], icon: "check" },
    { heading: "5. Vendite → Margine: la redditività reale", content: "Fatturare molto non garantisce redditività. Conta il margine reale.", tips: ["Calcola il margine reale mensilmente.", "Confronta con margine teorico: differenza > 5% = indagare.", "Analizza margine per referenza, non solo globale.", "Contribuzione al margine: margine unitario × unità vendute."], icon: "lightbulb" },
    { heading: "6. Il ciclo completo: gestione integrata", content: "Quando i quattro pezzi si collegano, la gestione passa da reattiva a proattiva.", tips: ["Passo 1: Rivedere scorecard mensile.", "Passo 2: Identificare anomalie.", "Passo 3: Decidere azioni.", "Passo 4: Eseguire cambiamenti.", "Passo 5: Misurare l'impatto nel prossimo scorecard."], icon: "check" },
  ],
  faqs: [
    { q: "Serve un software per collegare questi dati?", a: "Non è indispensabile, ma molto consigliato. Winerim lo automatizza completamente." },
    { q: "È solo per ristoranti grandi?", a: "No. I ristoranti piccoli ne beneficiano ugualmente." },
    { q: "Qual è il primo passo?", a: "Inizia con lo scorecard mensile: vendite, rotazione e margine." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/it/strumenti/wine-list-score" }, { label: "Calcolatore margine", url: "/it/calcolatore-margine-vino" }],
  relatedGuides: [{ label: "Scorecard mensile", url: "/it/risorse/scorecard-rendimento-carta" }, { label: "Come usare dati per comprare", url: "/it/guide/come-usare-dati-per-decidere-quali-vini-comprare" }],
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-connecter-carte-stock-ventes-marge",
  metaTitle: "Comment Connecter Carte, Stock, Ventes et Marge | Guide",
  metaDescription: "Guide pour intégrer gestion de carte des vins, stock, ventes et marges dans un système cohérent.",
  heroTitle: "Comment connecter carte, stock, ventes et marge",
  heroSubtitle: "Carte, stock, ventes et marge sont quatre pièces du même puzzle. Connectées, les décisions deviennent claires.",
  heroBadge: "Guide de gestion",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo", ctaSecondaryText: "Analyser ma carte", ctaSecondaryUrl: "/fr/analyse-carte",
  ctaFinalTitle: "Connectez tout avec Winerim", ctaFinalDescription: "Winerim intègre carte, stock, ventes et marge dans un seul panneau.",
  tableOfContents: ["Le problème des silos","Les 4 pièces et comment elles se connectent","Carte → Stock","Stock → Ventes","Ventes → Marge","Le cycle complet"],
  sections: [
    { heading: "1. Le problème des silos d'information", content: "La carte dans un document, le stock dans un tableur, les ventes dans le POS et la marge dans le rapport du contrôleur.", tips: ["La carte est conçue sans données de vente.", "Le stock est géré sans données de rotation.", "Les ventes sont consultées sans données de marge.", "Coût de cette déconnexion : 5-15% du CA vin."], icon: "alert" },
    { heading: "2. Les 4 pièces et comment elles se connectent", content: "La carte définit ce que vous vendez. Le stock supporte la carte. Les ventes sont le résultat. La marge est la conséquence.", tips: ["Carte → Stock : concevez en tenant compte de ce que vous pouvez stocker.", "Stock → Carte : si vous ne pouvez pas réapprovisionner, ne mettez pas en avant.", "Ventes → Carte : les données disent ce qui fonctionne.", "Marge → Achats : guide quoi acheter et combien."], icon: "lightbulb" },
    { heading: "3. Carte → Stock : le flux d'achats", content: "Chaque référence en carte implique une décision d'achat et un engagement financier.", tips: ["Chaque référence est un engagement de stock.", "Calculez le stock minimum pour 60-90 jours.", "Calculez le capital total nécessaire en cave.", "Priorisez les fournisseurs fiables avec livraisons fréquentes."], icon: "list" },
    { heading: "4. Stock → Ventes : la rotation comme pont", content: "Le stock est une ressource financière qui doit générer du retour. La rotation connecte stock et ventes.", tips: ["Objectif rotation : 8-12 par an.", "Rotation < 4 : évaluer si la référence doit rester.", "Les vins avec le plus de stock en positions visibles.", "L'inventaire doit être revu avec les données de vente."], icon: "check" },
    { heading: "5. Ventes → Marge : la rentabilité réelle", content: "Un CA élevé ne garantit pas la rentabilité. Ce qui compte, c'est la marge réelle.", tips: ["Calculez la marge réelle mensuellement.", "Comparez avec la marge théorique : écart > 5% = investiguer.", "Analysez la marge par référence, pas seulement globalement.", "Contribution à la marge : marge unitaire × unités vendues."], icon: "lightbulb" },
    { heading: "6. Le cycle complet : gestion intégrée", content: "Quand les quatre pièces se connectent, la gestion passe de réactive à proactive.", tips: ["Étape 1 : Revoir le scorecard mensuel.", "Étape 2 : Identifier les anomalies.", "Étape 3 : Décider des actions.", "Étape 4 : Exécuter les changements.", "Étape 5 : Mesurer l'impact dans le prochain scorecard."], icon: "check" },
  ],
  faqs: [
    { q: "Faut-il un logiciel pour connecter ces données ?", a: "Pas indispensable, mais fortement recommandé. Winerim l'automatise entièrement." },
    { q: "C'est uniquement pour les grands restaurants ?", a: "Non. Les petits restaurants en bénéficient tout autant." },
    { q: "Quel est le premier pas ?", a: "Commencez par le scorecard mensuel : ventes, rotation et marge." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/fr/outils/wine-list-score" }, { label: "Calculateur de marge", url: "/fr/calculateur-marge-vin" }],
  relatedGuides: [{ label: "Scorecard mensuel", url: "/fr/ressources/scorecard-performance-carte" }, { label: "Comment utiliser les données pour acheter", url: "/fr/guides/comment-utiliser-donnees-pour-acheter-vins" }],
};

const GuiaConectarCartaStockVentasMargen = () => <GuideTemplate data={{ es, en, it, fr }} />;
export default GuiaConectarCartaStockVentasMargen;
