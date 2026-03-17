import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante",
  metaTitle: "Cómo Mejorar la Rotación de Vinos en un Restaurante | Guía",
  metaDescription: "Guía práctica para mejorar la rotación de vinos en tu restaurante: selección, posicionamiento en carta, vino por copa y uso de datos para eliminar stock muerto.",
  heroTitle: "Cómo mejorar la rotación de vinos en un restaurante",
  heroSubtitle: "La rotación de vinos es uno de los indicadores más importantes de rentabilidad. Descubre cómo evitar que tus vinos se queden inmovilizados en bodega.",
  heroBadge: "Guía práctica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta", ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo", ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "No dejes que tu bodega acumule stock muerto",
  ctaFinalDescription: "Winerim te da los datos para saber qué vinos rotan, cuáles sobran y cómo optimizar tu selección para maximizar la rentabilidad.",
  tableOfContents: [
    "Por qué la rotación es clave para la rentabilidad",
    "Problemas comunes que frenan la rotación",
    "Estrategias para mejorar la rotación",
    "Cómo usar datos para tomar decisiones",
    "Cómo ayuda Winerim",
  ],
  sections: [
    { heading: "1. Por qué la rotación de vinos es clave para la rentabilidad", content: "Cada botella en tu bodega es dinero inmovilizado. Si un vino no se vende en 60-90 días, no solo ocupa espacio — está destruyendo valor.\n\nLa rotación de vinos mide cuántas veces se renueva el stock de cada referencia al año. Un restaurante con buena rotación vende y repone sus vinos 8-12 veces al año. Uno con mala rotación, 3-4 veces.\n\nLa diferencia en rentabilidad es enorme. Con la misma inversión en stock, el restaurante que rota bien genera el doble o triple de ingresos en vino.", tips: ["Un vino que no se vende en 90 días debería salir de la carta sin excepción", "El capital inmovilizado en vinos sin rotación podría invertirse en referencias que sí se venden", "Los vinos que se deterioran en bodega generan pérdidas directas, no solo coste de oportunidad", "La rotación media ideal es de 8-12 veces al año para la mayoría de referencias"], icon: "alert" },
    { heading: "2. Demasiadas referencias", content: "El primer enemigo de la rotación es el exceso de referencias. Cuantos más vinos tienes, más difícil es que cada uno se venda regularmente.\n\nUna carta con 180 referencias donde solo 60 se venden mensualmente significa 120 vinos acumulando polvo. Es el patrón más común que vemos en restaurantes con problemas de rotación.", tips: ["Revisa cuántas referencias tienes vs cuántas se venden realmente cada mes", "Aplica la regla del 80/20: el 80% de tus ventas viene del 20% de tus referencias", "Reduce a 50-80 referencias bien seleccionadas en restaurantes medios", "Cada vino debe cumplir una función clara: entrada, volumen, premium o descubrimiento"], icon: "list" },
    { heading: "3. Vinos mal posicionados en la carta", content: "Muchos vinos no se venden porque el cliente no los encuentra o no los entiende. El posicionamiento en la carta es tan importante como la selección.\n\nUn gran vino escondido en la página 3, dentro de una categoría confusa y sin descripción, es un vino invisible. Un vino mediocre en la primera sección, destacado como recomendación del sommelier, se vende mucho más.", tips: ["Los vinos que quieres vender deben estar en las posiciones de mayor visibilidad", "Las primeras y últimas posiciones de cada sección son las más consultadas", "Usa badges de 'Recomendado' o 'Selección del chef' para dirigir la atención", "Incluye notas de cata breves que ayuden al cliente a decidir sin depender del camarero"], icon: "lightbulb" },
    { heading: "4. Falta de recomendación activa", content: "Si el personal de sala no recomienda vino, las referencias menos conocidas simplemente no se venden. Los comensales eligen lo que conocen o lo más barato.\n\nLa recomendación activa es el motor de la rotación. Cuando un camarero sugiere un vino con convicción, la probabilidad de venta se multiplica.", tips: ["Forma al personal para que conozca 3-5 vinos y pueda recomendarlos con una frase clara", "Implementa un 'vino de la semana' que todo el equipo haya probado", "Vincula las recomendaciones a los platos del menú para que la sugerencia sea natural", "Si no puedes formar al equipo, usa herramientas digitales que recomienden por ti"], icon: "check" },
    { heading: "5. Estrategias para mejorar la rotación", content: "Mejorar la rotación requiere actuar en tres frentes simultáneamente: selección, posicionamiento y promoción.\n\nNo basta con quitar vinos que no se venden. Hay que crear las condiciones para que los que están se vendan mejor y más rápido.", tips: ["Selección: elige vinos que encajen con tu cocina, tu público y tu ticket medio", "Posicionamiento: coloca los vinos de alta rotación en posiciones privilegiadas de la carta", "Vino por copa: es la herramienta más potente para rotar referencias. Incluye 6-8 opciones que cambien cada 2-4 semanas", "Estacionalidad: adapta la carta a la temporada. Blancos frescos en verano, tintos potentes en invierno", "Promociones inteligentes: un vino que no rota puede venderse como maridaje recomendado o como copa del día"], icon: "check" },
    { heading: "6. Cómo usar datos para tomar decisiones", content: "La diferencia entre un restaurante que mejora su rotación y uno que no es una: datos.\n\nSin datos, las decisiones se basan en intuición. Con datos, puedes identificar exactamente qué funciona y qué no, y tomar acciones correctivas antes de que el stock se acumule.", tips: ["Mide la rotación de cada referencia mensualmente: unidades vendidas / stock medio", "Identifica los vinos con más de 60 días sin venta y decide si sustituirlos o promocionarlos", "Analiza qué franja de precio tiene mejor rotación y refuerza esa zona", "Compara la rotación entre categorías: si los blancos rotan más que los tintos, quizás tienes demasiados tintos", "Establece alertas automáticas para vinos que lleven 30+ días sin venderse"], icon: "lightbulb" },
    { heading: "7. Cómo ayuda Winerim", content: "Winerim está diseñado para resolver exactamente este problema. La plataforma te da visibilidad completa sobre la rotación de tu carta y herramientas para actuar.\n\nNo se trata de más informes. Se trata de recomendaciones accionables que puedes implementar en minutos.", tips: ["Dashboard de rotación: visualiza qué vinos se venden, cuáles no y desde cuándo", "Alertas de stock muerto: notificaciones automáticas cuando un vino lleva demasiado tiempo sin venderse", "Recomendador inteligente: el sistema recomienda vinos infravendidos a los comensales adecuados", "Maridajes automáticos: vincula vinos con baja rotación a platos del menú para darles visibilidad", "Gestión de vino por copa: optimiza la selección y rotación de tu programa de copas"], icon: "check" },
  ],
  faqs: [
    { q: "¿Cuál es una buena tasa de rotación para el vino en un restaurante?", a: "Para la mayoría de restaurantes, una rotación de 8-12 veces al año es saludable. Esto significa que cada referencia se vende y repone cada 4-6 semanas. Los vinos por copa deberían rotar más rápido: cada 1-2 semanas." },
    { q: "¿Cada cuánto debería revisar mi carta de vinos?", a: "Idealmente cada mes a nivel de datos (qué se vende, qué no) y cada trimestre a nivel de selección (quitar, añadir o sustituir referencias). Los vinos por copa deberían revisarse cada 2-4 semanas." },
    { q: "¿Qué hago con los vinos que no se venden?", a: "Tres opciones: 1) Reposiciónalos en la carta con mejor visibilidad y descripción. 2) Inclúyelos como vino por copa o maridaje recomendado. 3) Si en 30 días más no se venden, retíralos de la carta y liquídalos en eventos o promociones." },
    { q: "¿Tener menos vinos mejora la rotación automáticamente?", a: "Reducir referencias es condición necesaria pero no suficiente. También necesitas buen posicionamiento, recomendaciones activas y pricing adecuado. Pero sí, una carta más reducida concentra la demanda en menos referencias y mejora la rotación media." },
  ],
  relatedTools: [
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
    { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    { label: "Analizador de carta de vinos", url: "/analisis-carta" },
  ],
  relatedGuides: [
    { label: "Cómo hacer una carta de vinos rentable", url: "/como-hacer-una-carta-de-vinos" },
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Vino por copa en restaurante", url: "/vino-por-copa-restaurante" },
    { label: "Tu carta de vinos no vende", url: "/problemas/carta-de-vinos-no-vende" },
  ],
};

const en: GuidePageData = {
  slug: "en/guides/how-to-improve-wine-rotation-in-restaurants",
  metaTitle: "How to Improve Wine Rotation in a Restaurant | Guide",
  metaDescription: "Practical guide to improving wine rotation in your restaurant: selection, list positioning, wine by the glass and data-driven decisions to eliminate dead stock.",
  heroTitle: "How to improve wine rotation in a restaurant",
  heroSubtitle: "Wine rotation is one of the most important profitability indicators. Discover how to prevent wines from sitting idle in your cellar.",
  heroBadge: "Practical guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Analyse my wine list", ctaPrimaryUrl: "/en/wine-list-analysis",
  ctaSecondaryText: "Request demo", ctaSecondaryUrl: "/en/demo",
  ctaFinalTitle: "Don't let your cellar accumulate dead stock",
  ctaFinalDescription: "Winerim gives you the data to know which wines rotate, which are surplus and how to optimise your selection for maximum profitability.",
  tableOfContents: [
    "Why rotation is key to profitability",
    "Common problems that slow rotation",
    "Strategies to improve rotation",
    "How to use data for decisions",
    "How Winerim helps",
  ],
  sections: [
    { heading: "1. Why wine rotation is key to profitability", content: "Every bottle in your cellar is tied-up capital. If a wine doesn't sell within 60-90 days it is not just taking up space — it is destroying value.\n\nWine rotation measures how many times each reference's stock is renewed per year. A restaurant with good rotation sells and replenishes its wines 8-12 times a year. One with poor rotation, 3-4 times.\n\nThe profitability difference is enormous. With the same stock investment, the restaurant that rotates well generates double or triple the wine revenue.", tips: ["A wine unsold for 90 days should leave the list without exception", "Capital tied up in non-rotating wines could be invested in references that do sell", "Wines that deteriorate in the cellar generate direct losses, not just opportunity cost", "The ideal average rotation is 8-12 times per year for most references"], icon: "alert" },
    { heading: "2. Too many references", content: "The first enemy of rotation is excess references. The more wines you have, the harder it is for each one to sell regularly.\n\nA list with 180 references where only 60 sell monthly means 120 wines gathering dust. It is the most common pattern we see in restaurants with rotation problems.", tips: ["Review how many references you have vs how many actually sell each month", "Apply the 80/20 rule: 80% of your sales come from 20% of your references", "Reduce to 50-80 well-selected references for mid-size restaurants", "Each wine must fulfil a clear role: entry-level, volume, premium or discovery"], icon: "list" },
    { heading: "3. Poorly positioned wines on the list", content: "Many wines don't sell because the guest can't find them or doesn't understand them. Positioning on the list is as important as selection.\n\nA great wine hidden on page 3, inside a confusing category with no description, is an invisible wine. A mediocre wine in the first section, highlighted as the sommelier's pick, sells far more.", tips: ["Wines you want to sell should be in the highest-visibility positions", "The first and last positions of each section are the most viewed", "Use 'Recommended' or 'Chef's selection' badges to direct attention", "Include brief tasting notes that help the guest decide without relying on the waiter"], icon: "lightbulb" },
    { heading: "4. Lack of active recommendation", content: "If floor staff don't recommend wine, lesser-known references simply don't sell. Diners choose what they know or the cheapest option.\n\nActive recommendation is the engine of rotation. When a waiter suggests a wine with conviction, the probability of a sale multiplies.", tips: ["Train staff to know 3-5 wines and recommend them with a clear sentence", "Implement a 'wine of the week' the whole team has tasted", "Link recommendations to menu dishes so the suggestion feels natural", "If you can't train the team, use digital tools that recommend for you"], icon: "check" },
    { heading: "5. Strategies to improve rotation", content: "Improving rotation requires action on three fronts simultaneously: selection, positioning and promotion.\n\nIt's not enough to remove wines that don't sell. You need to create the conditions for the remaining wines to sell better and faster.", tips: ["Selection: choose wines that match your cuisine, your audience and your average ticket", "Positioning: place high-rotation wines in privileged list positions", "Wine by the glass: the most powerful tool for rotating references. Include 6-8 options that change every 2-4 weeks", "Seasonality: adapt the list to the season. Fresh whites in summer, powerful reds in winter", "Smart promotions: a wine that doesn't rotate can be sold as a recommended pairing or glass of the day"], icon: "check" },
    { heading: "6. How to use data for decisions", content: "The difference between a restaurant that improves its rotation and one that doesn't is one thing: data.\n\nWithout data, decisions are based on intuition. With data, you can identify exactly what works and what doesn't, and take corrective action before stock accumulates.", tips: ["Measure each reference's rotation monthly: units sold / average stock", "Identify wines with 60+ days without a sale and decide whether to replace or promote them", "Analyse which price band has the best rotation and reinforce that zone", "Compare rotation across categories: if whites rotate more than reds, perhaps you have too many reds", "Set automatic alerts for wines unsold for 30+ days"], icon: "lightbulb" },
    { heading: "7. How Winerim helps", content: "Winerim is designed to solve exactly this problem. The platform gives you complete visibility over your list's rotation and tools to act.\n\nIt's not about more reports. It's about actionable recommendations you can implement in minutes.", tips: ["Rotation dashboard: see which wines sell, which don't and since when", "Dead stock alerts: automatic notifications when a wine has been unsold too long", "Smart recommender: the system recommends under-sold wines to the right diners", "Automatic pairings: link low-rotation wines to menu dishes for visibility", "By-the-glass management: optimise your glass programme's selection and rotation"], icon: "check" },
  ],
  faqs: [
    { q: "What is a good wine rotation rate for a restaurant?", a: "For most restaurants, a rotation of 8-12 times per year is healthy. This means each reference sells and is replenished every 4-6 weeks. Wines by the glass should rotate faster: every 1-2 weeks." },
    { q: "How often should I review my wine list?", a: "Ideally every month at a data level (what sells, what doesn't) and every quarter at a selection level (remove, add or replace references). Wines by the glass should be reviewed every 2-4 weeks." },
    { q: "What do I do with wines that don't sell?", a: "Three options: 1) Reposition them on the list with better visibility and description. 2) Include them as a wine by the glass or recommended pairing. 3) If they still don't sell after 30 more days, remove them and liquidate at events or promotions." },
    { q: "Does having fewer wines automatically improve rotation?", a: "Reducing references is necessary but not sufficient. You also need good positioning, active recommendations and appropriate pricing. But yes, a smaller list concentrates demand on fewer references and improves average rotation." },
  ],
  relatedTools: [
    { label: "Wine margin calculator", url: "/en/wine-margin-calculator" },
    { label: "Wine by glass price calculator", url: "/en/tools/wine-by-glass-price-calculator" },
    { label: "Wine list analyser", url: "/en/wine-list-analysis" },
  ],
  relatedGuides: [
    { label: "How to sell more wine in restaurants", url: "/en/how-to-sell-more-wine-in-restaurants" },
    { label: "Wine by the glass in restaurants", url: "/en/wine-by-glass-restaurant" },
    { label: "How to detect dead stock wines", url: "/en/guides/how-to-detect-dead-stock-wines" },
  ],
};

const it: GuidePageData = {
  slug: "it/guide/come-migliorare-rotazione-vini-ristorante",
  metaTitle: "Come Migliorare la Rotazione dei Vini in un Ristorante | Guida",
  metaDescription: "Guida pratica per migliorare la rotazione dei vini nel tuo ristorante: selezione, posizionamento in carta, vino al calice e uso dei dati per eliminare lo stock morto.",
  heroTitle: "Come migliorare la rotazione dei vini in un ristorante",
  heroSubtitle: "La rotazione dei vini è uno degli indicatori di redditività più importanti. Scopri come evitare che i tuoi vini restino immobilizzati in cantina.",
  heroBadge: "Guida pratica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Analizza la mia carta", ctaPrimaryUrl: "/it/analisi-carta",
  ctaSecondaryText: "Richiedi demo", ctaSecondaryUrl: "/it/demo",
  ctaFinalTitle: "Non lasciare che la tua cantina accumuli stock morto",
  ctaFinalDescription: "Winerim ti fornisce i dati per sapere quali vini ruotano, quali sono in eccesso e come ottimizzare la selezione per massimizzare la redditività.",
  tableOfContents: [
    "Perché la rotazione è fondamentale per la redditività",
    "Problemi comuni che frenano la rotazione",
    "Strategie per migliorare la rotazione",
    "Come usare i dati per decidere",
    "Come aiuta Winerim",
  ],
  sections: [
    { heading: "1. Perché la rotazione dei vini è fondamentale per la redditività", content: "Ogni bottiglia nella tua cantina è capitale immobilizzato. Se un vino non si vende in 60-90 giorni, non solo occupa spazio — sta distruggendo valore.\n\nLa rotazione dei vini misura quante volte lo stock di ogni referenza si rinnova all'anno. Un ristorante con buona rotazione vende e riordina i suoi vini 8-12 volte l'anno. Uno con cattiva rotazione, 3-4 volte.\n\nLa differenza di redditività è enorme. Con lo stesso investimento in stock, il ristorante che ruota bene genera il doppio o il triplo dei ricavi dal vino.", tips: ["Un vino invenduto per 90 giorni dovrebbe uscire dalla carta senza eccezioni", "Il capitale immobilizzato in vini senza rotazione potrebbe essere investito in referenze che si vendono", "I vini che si deteriorano in cantina generano perdite dirette, non solo costo opportunità", "La rotazione media ideale è di 8-12 volte l'anno per la maggior parte delle referenze"], icon: "alert" },
    { heading: "2. Troppe referenze", content: "Il primo nemico della rotazione è l'eccesso di referenze. Più vini hai, più difficile è che ciascuno si venda regolarmente.\n\nUna carta con 180 referenze dove solo 60 si vendono mensilmente significa 120 vini che accumulano polvere. È il pattern più comune che vediamo nei ristoranti con problemi di rotazione.", tips: ["Verifica quante referenze hai rispetto a quante si vendono realmente ogni mese", "Applica la regola 80/20: l'80% delle vendite viene dal 20% delle referenze", "Riduci a 50-80 referenze ben selezionate nei ristoranti medi", "Ogni vino deve avere una funzione chiara: ingresso, volume, premium o scoperta"], icon: "list" },
    { heading: "3. Vini mal posizionati nella carta", content: "Molti vini non si vendono perché il cliente non li trova o non li capisce. Il posizionamento in carta è importante quanto la selezione.\n\nUn grande vino nascosto a pagina 3, in una categoria confusa e senza descrizione, è un vino invisibile. Un vino mediocre nella prima sezione, evidenziato come scelta del sommelier, si vende molto di più.", tips: ["I vini che vuoi vendere devono essere nelle posizioni di maggiore visibilità", "Le prime e ultime posizioni di ogni sezione sono le più consultate", "Usa badge 'Consigliato' o 'Selezione dello chef' per dirigere l'attenzione", "Includi note di degustazione brevi che aiutino il cliente a decidere senza dipendere dal cameriere"], icon: "lightbulb" },
    { heading: "4. Mancanza di raccomandazione attiva", content: "Se il personale di sala non raccomanda vino, le referenze meno conosciute semplicemente non si vendono. I commensali scelgono ciò che conoscono o il più economico.\n\nLa raccomandazione attiva è il motore della rotazione. Quando un cameriere suggerisce un vino con convinzione, la probabilità di vendita si moltiplica.", tips: ["Forma il personale affinché conosca 3-5 vini e possa raccomandarli con una frase chiara", "Implementa un 'vino della settimana' che tutto il team abbia assaggiato", "Collega le raccomandazioni ai piatti del menù perché il suggerimento sia naturale", "Se non puoi formare il team, usa strumenti digitali che raccomandano per te"], icon: "check" },
    { heading: "5. Strategie per migliorare la rotazione", content: "Migliorare la rotazione richiede di agire su tre fronti contemporaneamente: selezione, posizionamento e promozione.\n\nNon basta togliere i vini che non si vendono. Bisogna creare le condizioni perché quelli presenti si vendano meglio e più velocemente.", tips: ["Selezione: scegli vini che si adattino alla tua cucina, al tuo pubblico e al tuo scontrino medio", "Posizionamento: metti i vini ad alta rotazione in posizioni privilegiate della carta", "Vino al calice: lo strumento più potente per far ruotare le referenze. Includi 6-8 opzioni che cambino ogni 2-4 settimane", "Stagionalità: adatta la carta alla stagione. Bianchi freschi d'estate, rossi potenti d'inverno", "Promozioni intelligenti: un vino che non ruota può essere venduto come abbinamento consigliato o calice del giorno"], icon: "check" },
    { heading: "6. Come usare i dati per decidere", content: "La differenza tra un ristorante che migliora la rotazione e uno che non lo fa è una: dati.\n\nSenza dati, le decisioni si basano sull'intuizione. Con i dati, puoi identificare esattamente cosa funziona e cosa no, e intraprendere azioni correttive prima che lo stock si accumuli.", tips: ["Misura la rotazione di ogni referenza mensilmente: unità vendute / stock medio", "Identifica i vini con più di 60 giorni senza vendita e decidi se sostituirli o promuoverli", "Analizza quale fascia di prezzo ha la migliore rotazione e rafforza quella zona", "Confronta la rotazione tra categorie: se i bianchi ruotano più dei rossi, forse hai troppi rossi", "Imposta avvisi automatici per vini invenduti da 30+ giorni"], icon: "lightbulb" },
    { heading: "7. Come aiuta Winerim", content: "Winerim è progettato per risolvere esattamente questo problema. La piattaforma ti dà visibilità completa sulla rotazione della tua carta e strumenti per agire.\n\nNon si tratta di più report. Si tratta di raccomandazioni azionabili che puoi implementare in pochi minuti.", tips: ["Dashboard di rotazione: visualizza quali vini si vendono, quali no e da quando", "Avvisi stock morto: notifiche automatiche quando un vino resta invenduto troppo a lungo", "Raccomandatore intelligente: il sistema suggerisce vini poco venduti ai commensali giusti", "Abbinamenti automatici: collega vini a bassa rotazione ai piatti del menù per dar loro visibilità", "Gestione vino al calice: ottimizza la selezione e la rotazione del tuo programma al calice"], icon: "check" },
  ],
  faqs: [
    { q: "Qual è un buon tasso di rotazione per il vino in un ristorante?", a: "Per la maggior parte dei ristoranti, una rotazione di 8-12 volte l'anno è sana. Significa che ogni referenza si vende e si riordina ogni 4-6 settimane. I vini al calice dovrebbero ruotare più velocemente: ogni 1-2 settimane." },
    { q: "Ogni quanto dovrei rivedere la mia carta dei vini?", a: "Idealmente ogni mese a livello di dati (cosa si vende, cosa no) e ogni trimestre a livello di selezione (togliere, aggiungere o sostituire referenze). I vini al calice dovrebbero essere rivisti ogni 2-4 settimane." },
    { q: "Cosa faccio con i vini che non si vendono?", a: "Tre opzioni: 1) Riposizionali in carta con migliore visibilità e descrizione. 2) Includili come vino al calice o abbinamento consigliato. 3) Se in 30 giorni ancora non si vendono, ritirali e liquidali in eventi o promozioni." },
    { q: "Avere meno vini migliora automaticamente la rotazione?", a: "Ridurre le referenze è condizione necessaria ma non sufficiente. Servono anche buon posizionamento, raccomandazioni attive e pricing adeguato. Ma sì, una carta più ridotta concentra la domanda su meno referenze e migliora la rotazione media." },
  ],
  relatedTools: [
    { label: "Calcolatrice margini vino", url: "/it/calcolatrice-margini-vino" },
    { label: "Calcolatrice prezzo vino al calice", url: "/it/strumenti/calcolatrice-prezzo-vino-al-calice" },
    { label: "Analizzatore carta vini", url: "/it/analisi-carta" },
  ],
  relatedGuides: [
    { label: "Come vendere più vino al ristorante", url: "/it/come-vendere-piu-vino-ristorante" },
    { label: "Vino al calice al ristorante", url: "/it/vino-al-calice-ristorante" },
    { label: "Come rilevare vini morti", url: "/it/guide/come-rilevare-vini-morti" },
  ],
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-ameliorer-rotation-vins-restaurant",
  metaTitle: "Comment Améliorer la Rotation des Vins dans un Restaurant | Guide",
  metaDescription: "Guide pratique pour améliorer la rotation des vins dans votre restaurant : sélection, positionnement en carte, vin au verre et utilisation des données pour éliminer le stock mort.",
  heroTitle: "Comment améliorer la rotation des vins dans un restaurant",
  heroSubtitle: "La rotation des vins est l'un des indicateurs de rentabilité les plus importants. Découvrez comment éviter que vos vins restent immobilisés en cave.",
  heroBadge: "Guide pratique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Analyser ma carte", ctaPrimaryUrl: "/fr/analyse-carte",
  ctaSecondaryText: "Demander une démo", ctaSecondaryUrl: "/fr/demo",
  ctaFinalTitle: "Ne laissez pas votre cave accumuler du stock mort",
  ctaFinalDescription: "Winerim vous donne les données pour savoir quels vins tournent, lesquels sont en surplus et comment optimiser votre sélection pour maximiser la rentabilité.",
  tableOfContents: [
    "Pourquoi la rotation est clé pour la rentabilité",
    "Problèmes courants qui freinent la rotation",
    "Stratégies pour améliorer la rotation",
    "Comment utiliser les données pour décider",
    "Comment Winerim vous aide",
  ],
  sections: [
    { heading: "1. Pourquoi la rotation des vins est clé pour la rentabilité", content: "Chaque bouteille dans votre cave est du capital immobilisé. Si un vin ne se vend pas en 60-90 jours, il ne fait pas qu'occuper de l'espace — il détruit de la valeur.\n\nLa rotation des vins mesure combien de fois le stock de chaque référence se renouvelle par an. Un restaurant avec une bonne rotation vend et réapprovisionne ses vins 8-12 fois par an. Un avec une mauvaise rotation, 3-4 fois.\n\nLa différence de rentabilité est énorme. Avec le même investissement en stock, le restaurant qui tourne bien génère le double ou le triple du chiffre d'affaires vin.", tips: ["Un vin invendu depuis 90 jours devrait quitter la carte sans exception", "Le capital immobilisé dans des vins sans rotation pourrait être investi dans des références qui se vendent", "Les vins qui se détériorent en cave génèrent des pertes directes, pas seulement un coût d'opportunité", "La rotation moyenne idéale est de 8-12 fois par an pour la plupart des références"], icon: "alert" },
    { heading: "2. Trop de références", content: "Le premier ennemi de la rotation est l'excès de références. Plus vous avez de vins, plus il est difficile que chacun se vende régulièrement.\n\nUne carte avec 180 références dont seulement 60 se vendent chaque mois signifie 120 vins qui prennent la poussière. C'est le pattern le plus courant que nous observons dans les restaurants ayant des problèmes de rotation.", tips: ["Vérifiez combien de références vous avez vs combien se vendent réellement chaque mois", "Appliquez la règle 80/20 : 80% de vos ventes viennent de 20% de vos références", "Réduisez à 50-80 références bien sélectionnées pour les restaurants de taille moyenne", "Chaque vin doit remplir un rôle clair : entrée de gamme, volume, premium ou découverte"], icon: "list" },
    { heading: "3. Vins mal positionnés sur la carte", content: "Beaucoup de vins ne se vendent pas parce que le client ne les trouve pas ou ne les comprend pas. Le positionnement sur la carte est aussi important que la sélection.\n\nUn grand vin caché en page 3, dans une catégorie confuse sans description, est un vin invisible. Un vin moyen dans la première section, mis en avant comme choix du sommelier, se vend beaucoup plus.", tips: ["Les vins que vous voulez vendre doivent être dans les positions de plus grande visibilité", "Les premières et dernières positions de chaque section sont les plus consultées", "Utilisez des badges « Recommandé » ou « Sélection du chef » pour diriger l'attention", "Incluez des notes de dégustation brèves qui aident le client à décider sans dépendre du serveur"], icon: "lightbulb" },
    { heading: "4. Manque de recommandation active", content: "Si le personnel de salle ne recommande pas de vin, les références moins connues ne se vendent tout simplement pas. Les convives choisissent ce qu'ils connaissent ou le moins cher.\n\nLa recommandation active est le moteur de la rotation. Quand un serveur suggère un vin avec conviction, la probabilité de vente se multiplie.", tips: ["Formez le personnel pour qu'il connaisse 3-5 vins et puisse les recommander avec une phrase claire", "Instaurez un « vin de la semaine » que toute l'équipe a goûté", "Liez les recommandations aux plats du menu pour que la suggestion soit naturelle", "Si vous ne pouvez pas former l'équipe, utilisez des outils digitaux qui recommandent pour vous"], icon: "check" },
    { heading: "5. Stratégies pour améliorer la rotation", content: "Améliorer la rotation nécessite d'agir sur trois fronts simultanément : sélection, positionnement et promotion.\n\nIl ne suffit pas de retirer les vins qui ne se vendent pas. Il faut créer les conditions pour que ceux qui restent se vendent mieux et plus vite.", tips: ["Sélection : choisissez des vins qui correspondent à votre cuisine, votre clientèle et votre ticket moyen", "Positionnement : placez les vins à haute rotation dans les positions privilégiées de la carte", "Vin au verre : l'outil le plus puissant pour faire tourner les références. Incluez 6-8 options changeant toutes les 2-4 semaines", "Saisonnalité : adaptez la carte à la saison. Blancs frais en été, rouges puissants en hiver", "Promotions intelligentes : un vin qui ne tourne pas peut être vendu comme accord recommandé ou verre du jour"], icon: "check" },
    { heading: "6. Comment utiliser les données pour décider", content: "La différence entre un restaurant qui améliore sa rotation et un qui ne le fait pas se résume à un mot : données.\n\nSans données, les décisions reposent sur l'intuition. Avec des données, vous pouvez identifier exactement ce qui fonctionne et ce qui ne fonctionne pas, et prendre des mesures correctives avant que le stock ne s'accumule.", tips: ["Mesurez la rotation de chaque référence mensuellement : unités vendues / stock moyen", "Identifiez les vins avec 60+ jours sans vente et décidez s'il faut les remplacer ou les promouvoir", "Analysez quelle gamme de prix a la meilleure rotation et renforcez cette zone", "Comparez la rotation entre catégories : si les blancs tournent plus que les rouges, peut-être avez-vous trop de rouges", "Paramétrez des alertes automatiques pour les vins invendus depuis 30+ jours"], icon: "lightbulb" },
    { heading: "7. Comment Winerim vous aide", content: "Winerim est conçu pour résoudre exactement ce problème. La plateforme vous donne une visibilité complète sur la rotation de votre carte et des outils pour agir.\n\nIl ne s'agit pas de plus de rapports. Il s'agit de recommandations actionnables que vous pouvez mettre en œuvre en quelques minutes.", tips: ["Dashboard de rotation : visualisez quels vins se vendent, lesquels non et depuis quand", "Alertes stock mort : notifications automatiques quand un vin est invendu depuis trop longtemps", "Recommandeur intelligent : le système recommande les vins sous-vendus aux bons convives", "Accords automatiques : liez les vins à faible rotation aux plats du menu pour leur donner de la visibilité", "Gestion du vin au verre : optimisez la sélection et la rotation de votre programme au verre"], icon: "check" },
  ],
  faqs: [
    { q: "Quel est un bon taux de rotation pour le vin dans un restaurant ?", a: "Pour la plupart des restaurants, une rotation de 8-12 fois par an est saine. Cela signifie que chaque référence se vend et se réapprovisionne toutes les 4-6 semaines. Les vins au verre devraient tourner plus vite : toutes les 1-2 semaines." },
    { q: "À quelle fréquence devrais-je réviser ma carte des vins ?", a: "Idéalement chaque mois au niveau des données (ce qui se vend, ce qui ne se vend pas) et chaque trimestre au niveau de la sélection (retirer, ajouter ou remplacer des références). Les vins au verre devraient être révisés toutes les 2-4 semaines." },
    { q: "Que faire des vins qui ne se vendent pas ?", a: "Trois options : 1) Repositionnez-les sur la carte avec une meilleure visibilité et description. 2) Incluez-les comme vin au verre ou accord recommandé. 3) S'ils ne se vendent toujours pas après 30 jours supplémentaires, retirez-les et liquidez-les lors d'événements ou promotions." },
    { q: "Avoir moins de vins améliore-t-il automatiquement la rotation ?", a: "Réduire les références est nécessaire mais pas suffisant. Il faut aussi un bon positionnement, des recommandations actives et un pricing adapté. Mais oui, une carte plus réduite concentre la demande sur moins de références et améliore la rotation moyenne." },
  ],
  relatedTools: [
    { label: "Calculateur de marge vin", url: "/fr/calculateur-marge-vin" },
    { label: "Calculateur prix vin au verre", url: "/fr/outils/calculateur-prix-vin-au-verre" },
    { label: "Analyseur de carte des vins", url: "/fr/analyse-carte" },
  ],
  relatedGuides: [
    { label: "Comment vendre plus de vin au restaurant", url: "/fr/comment-vendre-plus-vin-restaurant" },
    { label: "Vin au verre au restaurant", url: "/fr/vin-au-verre-restaurant" },
    { label: "Comment détecter les vins morts", url: "/fr/guides/comment-detecter-vins-morts" },
  ],
};

const data: Record<string, GuidePageData> = { es, en, it, fr };

const RotacionVinos = () => <GuideTemplate data={data} />;

export default RotacionVinos;
