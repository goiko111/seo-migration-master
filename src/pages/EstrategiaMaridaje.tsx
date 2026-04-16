import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

const i18n: I18nMap<GuidePageData> = {
  es: {
    slug: "guias/como-crear-una-estrategia-de-maridaje-en-restauracion",
    metaTitle: "Cómo Crear una Estrategia de Maridaje en Restauración | Guía",
    metaDescription: "Guía práctica para diseñar maridajes que aumenten ventas de vino: selección por plato, presentación en carta, maridaje por copa e impacto en ticket medio.",
    heroTitle: "Cómo crear una estrategia de maridaje en restauración",
    heroSubtitle: "El maridaje bien ejecutado es una de las herramientas más efectivas para vender más vino. Aprende a diseñar una estrategia que conecte tu menú con tu carta de vinos.",
    heroBadge: "Guía estratégica",
    breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
    ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo",
    ctaSecondaryText: "Analiza tu carta", ctaSecondaryUrl: "/analisis-carta",
    ctaFinalTitle: "Descubre cómo Winerim crea maridajes automáticamente",
    ctaFinalDescription: "Winerim analiza tu menú y tu carta de vinos para generar maridajes inteligentes que aumentan las ventas sin depender de un sommelier en cada mesa.",
    tableOfContents: ["Qué es el maridaje estratégico", "Cómo elegir vinos para cada plato", "Cómo presentar los maridajes en la carta", "Maridaje por copa: la gran oportunidad", "Impacto real en el ticket medio", "Cómo lo automatiza Winerim"],
    sections: [
      { heading: "1. Qué es el maridaje estratégico", content: "El maridaje tradicional se enfoca en la armonía gastronómica: qué vino sabe mejor con qué plato. Eso está bien, pero es solo la mitad de la ecuación.\n\nEl maridaje estratégico añade una capa comercial: no solo busca el mejor vino para cada plato, sino el que mejor equilibrio ofrece entre experiencia del cliente y rentabilidad para el restaurante.\n\nNo se trata de recomendar el vino más caro. Se trata de recomendar el vino que el comensal va a disfrutar más y que, al mismo tiempo, genera un margen saludable.", tips: ["Un maridaje bien pensado convierte la carta de vinos en una extensión del menú, no en un documento separado", "El objetivo no es que el comensal sepa de maridaje — es que elija vino con confianza", "El maridaje elimina la parálisis de decisión: el cliente ya sabe qué pedir", "Los restaurantes con maridajes integrados venden entre un 25% y un 40% más de vino"], icon: "lightbulb" },
      { heading: "2. Cómo elegir vinos para cada plato", content: "Elegir el vino adecuado para cada plato no requiere ser sommelier. Requiere entender tres principios básicos: intensidad, textura y complemento.\n\nIntensidad: el vino debe tener la misma fuerza que el plato. Un blanco ligero con un estofado potente se pierde. Un tinto robusto con un ceviche lo aplasta.\n\nTextura: platos cremosos piden vinos con cuerpo. Platos crujientes o frescos piden vinos con acidez.\n\nComplemento o contraste: puedes buscar que el vino refuerce los sabores del plato (complemento) o que los equilibre (contraste). Ambas estrategias funcionan.", tips: ["Platos con grasa o queso → vinos con acidez alta que limpien el paladar", "Pescados y mariscos → blancos con mineralidad, no necesariamente siempre Albariño", "Carnes rojas a la brasa → tintos con estructura y taninos moderados a altos", "Postres → vinos dulces o espumosos semisecos, nunca un tinto seco", "Cocina especiada (asiática, mexicana) → blancos aromáticos o tintos ligeros con fruta", "Ensaladas y verduras → blancos frescos, rosados o incluso espumosos"], icon: "list" },
      { heading: "3. Cómo presentar los maridajes en la carta", content: "El mejor maridaje del mundo no sirve de nada si el cliente no lo ve. La presentación es tan importante como la selección.\n\nHay tres niveles de integración del maridaje en la experiencia del restaurante, de menor a mayor impacto.", tips: ["Nivel 1 — Sugerencia en la carta de vinos: cada sección indica qué tipo de platos acompaña. Ej: 'Blancos frescos — ideales con pescados, mariscos y ensaladas'", "Nivel 2 — Sugerencia en el menú: cada plato principal tiene 1-2 vinos sugeridos con nombre y precio. El cliente ve el maridaje mientras elige la comida", "Nivel 3 — Menú de maridaje: ofrecer un menú degustación con opción de maridaje por copas como upgrade. Esto puede aumentar el ticket entre 15€ y 30€ por comensal", "La clave es que el maridaje esté visible sin que el cliente tenga que buscarlo ni pedirlo", "Usa frases simples: 'Va perfecto con...' funciona mejor que explicaciones enológicas"], icon: "check" },
      { heading: "4. Maridaje por copa: la gran oportunidad", content: "El maridaje por copa es donde convergen dos de las tendencias más potentes en restauración: el vino por copa y la personalización de la experiencia.\n\nPermite al comensal probar un vino diferente con cada plato sin comprometerse con una botella completa. Esto es especialmente valioso en menús degustación, mesas de dos personas o comensales que quieren explorar.", tips: ["Ofrece un 'recorrido de copas' alineado con tu menú degustación: 3-4 copas que acompañan cada plato", "El precio del recorrido de copas debería estar entre 20€ y 40€ según el nivel del restaurante", "Incluye al menos un vino sorprendente en el recorrido: una copa que el comensal no habría pedido solo", "El maridaje por copa permite usar vinos premium que el cliente no compraría en botella", "Rota el recorrido de copas cada 3-4 semanas para mantener la novedad", "Forma al personal para sugerir el maridaje por copas como upgrade natural al presentar el menú"], icon: "lightbulb" },
      { heading: "5. Impacto real en el ticket medio", content: "Los números hablan por sí solos. El maridaje bien ejecutado tiene un impacto directo y medible en la facturación.\n\nUn restaurante con ticket medio de 45€ por comensal donde solo el 30% de las mesas pide vino está dejando dinero en la mesa. Con una estrategia de maridaje, ese porcentaje puede subir al 50-60%.", tips: ["Restaurantes con maridajes integrados en menú: +25-40% en ventas de vino", "Menú degustación con opción de maridaje por copas: +15-30€ de ticket por comensal", "Sugerencias de maridaje en la carta: +15-20% en valor medio del vino pedido", "El comensal que recibe una sugerencia de maridaje pide vinos de mayor valor que el que elige solo", "El maridaje reduce la tasa de mesas que no piden vino: de 50-70% a 30-40%"], icon: "check" },
      { heading: "6. Cómo lo automatiza Winerim", content: "Diseñar maridajes manualmente es posible, pero no escala. Cada vez que cambia un plato del menú o una referencia de la carta, los maridajes deben actualizarse.\n\nWinerim automatiza este proceso analizando los perfiles de tus platos y tus vinos para generar maridajes inteligentes en tiempo real.", tips: ["Maridajes automáticos: el sistema cruza el perfil sensorial de cada plato con cada vino de tu carta", "Actualización en tiempo real: si cambia el menú o la carta, los maridajes se recalculan", "Personalización por comensal: el recomendador sugiere maridajes basándose en las preferencias del cliente", "Visibilidad en carta digital: los maridajes aparecen automáticamente junto a cada plato", "Sin dependencia del sommelier: el sistema funciona 24/7 en cada mesa"], icon: "check" },
    ],
    faqs: [
      { q: "¿Necesito un sommelier para diseñar maridajes?", a: "No necesariamente. Con los principios básicos de intensidad, textura y complemento puedes crear maridajes efectivos. Herramientas como Winerim automatizan el proceso cruzando perfiles de platos y vinos sin necesidad de conocimiento enológico avanzado." },
      { q: "¿Cuántos maridajes debería ofrecer por plato?", a: "Lo ideal es 1-2 sugerencias por plato principal. Más de 2 genera confusión. Si ofreces un menú degustación, diseña un recorrido de copas completo con 3-5 vinos." },
      { q: "¿El maridaje funciona en restaurantes casuales?", a: "Absolutamente. No necesitas un restaurante fine dining para integrar maridajes. Una simple sugerencia en el menú ('Este plato va genial con nuestro Verdejo por copa') ya marca diferencia en las ventas." },
      { q: "¿Cuánto puede aumentar el ticket medio con maridajes?", a: "Depende del tipo de restaurante, pero los datos que vemos son consistentes: entre un 15% y un 30% de aumento en el ticket medio en vino cuando se implementan maridajes de forma visible y proactiva." },
    ],
    relatedTools: [
      { label: "Generador de maridajes", url: "/wine-pairing-generator" },
      { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
      { label: "Analizador de carta de vinos", url: "/analisis-carta" },
    ],
    relatedGuides: [
      { label: "Cómo hacer una carta de vinos", url: "/como-hacer-una-carta-de-vinos" },
      { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
      { label: "Vino por copa en restaurante", url: "/vino-por-copa-restaurante" },
      { label: "Cómo mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
    ],
  },
  en: {
    slug: "en/guides/wine-pairing-strategy-restaurants",
    metaTitle: "How to Create a Wine Pairing Strategy for Restaurants | Guide",
    metaDescription: "Practical guide to designing pairings that boost wine sales: selection by dish, menu presentation, by-the-glass pairing and impact on average ticket.",
    heroTitle: "How to create a wine pairing strategy for restaurants",
    heroSubtitle: "Well-executed pairing is one of the most effective tools for selling more wine. Learn to design a strategy that connects your menu with your wine list.",
    heroBadge: "Strategic guide",
    breadcrumbParent: { label: "Guides", href: "/en/guides" },
    ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo",
    ctaSecondaryText: "Analyze your list", ctaSecondaryUrl: "/en/wine-list-analyzer",
    ctaFinalTitle: "Discover how Winerim creates pairings automatically",
    ctaFinalDescription: "Winerim analyzes your menu and wine list to generate smart pairings that boost sales without relying on a sommelier at every table.",
    tableOfContents: ["What is strategic pairing", "How to choose wines for each dish", "How to present pairings on the menu", "By-the-glass pairing: the big opportunity", "Real impact on average ticket", "How Winerim automates it"],
    sections: [
      { heading: "1. What is strategic pairing", content: "Traditional pairing focuses on gastronomic harmony: which wine tastes best with which dish. That's fine, but it's only half the equation.\n\nStrategic pairing adds a commercial layer: it doesn't just seek the best wine for each dish, but the one that offers the best balance between guest experience and restaurant profitability.\n\nIt's not about recommending the most expensive wine. It's about recommending the wine the guest will enjoy most that also generates a healthy margin.", tips: ["A well-thought-out pairing turns the wine list into an extension of the menu, not a separate document", "The goal isn't for the guest to know about pairing — it's for them to choose wine with confidence", "Pairing eliminates decision paralysis: the guest already knows what to order", "Restaurants with integrated pairings sell 25%-40% more wine"], icon: "lightbulb" },
      { heading: "2. How to choose wines for each dish", content: "Choosing the right wine for each dish doesn't require being a sommelier. It requires understanding three basic principles: intensity, texture and complement.\n\nIntensity: the wine should match the strength of the dish. A light white with a powerful stew gets lost. A robust red with ceviche crushes it.\n\nTexture: creamy dishes call for full-bodied wines. Crunchy or fresh dishes call for wines with acidity.\n\nComplement or contrast: you can seek to reinforce the dish's flavors (complement) or balance them (contrast). Both strategies work.", tips: ["Fatty or cheesy dishes → wines with high acidity to cleanse the palate", "Fish and seafood → whites with minerality, not necessarily always Albariño", "Grilled red meats → reds with structure and moderate to high tannins", "Desserts → sweet wines or semi-dry sparkling, never a dry red", "Spicy cuisine (Asian, Mexican) → aromatic whites or light fruity reds", "Salads and vegetables → fresh whites, rosés or even sparkling"], icon: "list" },
      { heading: "3. How to present pairings on the menu", content: "The best pairing in the world is useless if the guest doesn't see it. Presentation is as important as selection.\n\nThere are three levels of pairing integration in the restaurant experience, from lowest to highest impact.", tips: ["Level 1 — Suggestion on the wine list: each section indicates which types of dishes it accompanies", "Level 2 — Suggestion on the menu: each main dish has 1-2 suggested wines with name and price", "Level 3 — Pairing menu: offer a tasting menu with a wine pairing upgrade option. This can increase the ticket by €15-30 per guest", "The key is that the pairing is visible without the guest having to search or ask for it", "Use simple phrases: 'Goes perfectly with...' works better than oenological explanations"], icon: "check" },
      { heading: "4. By-the-glass pairing: the big opportunity", content: "By-the-glass pairing is where two of the most powerful trends in hospitality converge: wine by the glass and experience personalization.\n\nIt lets the guest try a different wine with each course without committing to a full bottle. This is especially valuable for tasting menus, tables of two or exploratory guests.", tips: ["Offer a 'glass journey' aligned with your tasting menu: 3-4 glasses accompanying each course", "The glass journey price should be between €20-40 depending on the restaurant level", "Include at least one surprising wine: a glass the guest wouldn't have ordered alone", "By-the-glass pairing lets you use premium wines guests wouldn't buy by the bottle", "Rotate the glass journey every 3-4 weeks to maintain novelty", "Train staff to suggest the glass pairing as a natural upgrade when presenting the menu"], icon: "lightbulb" },
      { heading: "5. Real impact on average ticket", content: "The numbers speak for themselves. Well-executed pairing has a direct, measurable impact on revenue.\n\nA restaurant with a €45 average ticket where only 30% of tables order wine is leaving money on the table. With a pairing strategy, that percentage can rise to 50-60%.", tips: ["Restaurants with menu-integrated pairings: +25-40% in wine sales", "Tasting menu with glass pairing option: +€15-30 ticket per guest", "Pairing suggestions on the menu: +15-20% in average wine value ordered", "Guests who receive a pairing suggestion order higher-value wines", "Pairing reduces the rate of tables not ordering wine: from 50-70% to 30-40%"], icon: "check" },
      { heading: "6. How Winerim automates it", content: "Designing pairings manually is possible, but it doesn't scale. Every time a menu dish or wine list reference changes, pairings need updating.\n\nWinerim automates this process by analyzing your dish and wine profiles to generate smart pairings in real time.", tips: ["Automatic pairings: the system cross-references each dish's sensory profile with each wine on your list", "Real-time updates: if the menu or list changes, pairings are recalculated", "Guest personalization: the recommender suggests pairings based on guest preferences", "Digital list visibility: pairings appear automatically alongside each dish", "No sommelier dependency: the system works 24/7 at every table"], icon: "check" },
    ],
    faqs: [
      { q: "Do I need a sommelier to design pairings?", a: "Not necessarily. With the basic principles of intensity, texture and complement you can create effective pairings. Tools like Winerim automate the process by cross-referencing dish and wine profiles without advanced oenological knowledge." },
      { q: "How many pairings should I offer per dish?", a: "Ideally 1-2 suggestions per main course. More than 2 creates confusion. If you offer a tasting menu, design a complete glass journey with 3-5 wines." },
      { q: "Does pairing work in casual restaurants?", a: "Absolutely. You don't need a fine dining restaurant to integrate pairings. A simple suggestion on the menu ('This dish goes great with our Verdejo by the glass') already makes a difference in sales." },
      { q: "How much can pairings increase average ticket?", a: "It depends on the restaurant type, but the data we see is consistent: 15-30% increase in average wine ticket when pairings are implemented visibly and proactively." },
    ],
    relatedTools: [
      { label: "Pairing generator", url: "/en/wine-pairing-generator" },
      { label: "By-the-glass price calculator", url: "/en/tools/glass-price-calculator" },
      { label: "Wine list analyzer", url: "/en/wine-list-analyzer" },
    ],
    relatedGuides: [
      { label: "How to create a wine list", url: "/en/how-to-create-wine-list" },
      { label: "How to sell more wine", url: "/en/sell-more-wine-restaurant" },
      { label: "Wine by the glass", url: "/en/wine-by-the-glass" },
      { label: "How to improve wine rotation", url: "/en/guides/improve-wine-rotation" },
    ],
  },
  it: {
    slug: "it/guide/strategia-abbinamento-vino-ristorante",
    metaTitle: "Come Creare una Strategia di Abbinamento nei Ristoranti | Guida",
    metaDescription: "Guida pratica per progettare abbinamenti che aumentino le vendite di vino: selezione per piatto, presentazione nel menu.",
    heroTitle: "Come creare una strategia di abbinamento al ristorante",
    heroSubtitle: "L'abbinamento ben eseguito è uno degli strumenti più efficaci per vendere più vino. Impara a progettare una strategia che colleghi il tuo menu alla tua carta dei vini.",
    heroBadge: "Guida strategica",
    breadcrumbParent: { label: "Guide", href: "/it/guide" },
    ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo",
    ctaSecondaryText: "Analizza la tua carta", ctaSecondaryUrl: "/it/analizzatore-carta-vini",
    ctaFinalTitle: "Scopri come Winerim crea abbinamenti automaticamente",
    ctaFinalDescription: "Winerim analizza il tuo menu e la tua carta dei vini per generare abbinamenti intelligenti che aumentano le vendite senza dipendere da un sommelier ad ogni tavolo.",
    tableOfContents: ["Cos'è l'abbinamento strategico", "Come scegliere i vini per ogni piatto", "Come presentare gli abbinamenti nel menu", "Abbinamento al calice: la grande opportunità", "Impatto reale sullo scontrino medio", "Come lo automatizza Winerim"],
    sections: [
      { heading: "1. Cos'è l'abbinamento strategico", content: "L'abbinamento tradizionale si concentra sull'armonia gastronomica: quale vino si abbina meglio a quale piatto. Giusto, ma è solo metà dell'equazione.\n\nL'abbinamento strategico aggiunge una dimensione commerciale: non cerca solo il miglior vino per ogni piatto, ma quello che offre il miglior equilibrio tra esperienza del cliente e redditività per il ristorante.", tips: ["Un abbinamento ben pensato trasforma la carta dei vini in un'estensione del menu", "L'obiettivo non è che il commensale sappia di abbinamento — è che scelga il vino con fiducia", "L'abbinamento elimina la paralisi decisionale: il cliente sa già cosa ordinare", "I ristoranti con abbinamenti integrati vendono il 25-40% in più di vino"], icon: "lightbulb" },
      { heading: "2. Come scegliere i vini per ogni piatto", content: "Scegliere il vino giusto per ogni piatto non richiede di essere sommelier. Richiede di comprendere tre principi base: intensità, consistenza e complemento.\n\nIntensità: il vino deve avere la stessa forza del piatto.\n\nConsistenza: piatti cremosi richiedono vini strutturati. Piatti croccanti o freschi richiedono vini con acidità.\n\nComplemento o contrasto: puoi cercare che il vino rafforzi i sapori del piatto o li bilanci.", tips: ["Piatti grassi o con formaggio → vini con acidità alta", "Pesce e frutti di mare → bianchi con mineralità", "Carni rosse alla griglia → rossi strutturati con tannini", "Dessert → vini dolci o spumanti semisecchi", "Cucina speziata → bianchi aromatici o rossi leggeri fruttati", "Insalate e verdure → bianchi freschi, rosati o spumanti"], icon: "list" },
      { heading: "3. Come presentare gli abbinamenti nel menu", content: "Il miglior abbinamento del mondo non serve a nulla se il cliente non lo vede.\n\nCi sono tre livelli di integrazione dell'abbinamento nell'esperienza del ristorante.", tips: ["Livello 1 — Suggerimento nella carta dei vini: ogni sezione indica quali piatti accompagna", "Livello 2 — Suggerimento nel menu: ogni piatto ha 1-2 vini suggeriti con nome e prezzo", "Livello 3 — Menu degustazione con abbinamento al calice come upgrade (+15-30€ per commensale)", "La chiave è che l'abbinamento sia visibile senza che il cliente debba cercarlo", "Usa frasi semplici: 'Si abbina perfettamente con...' funziona meglio delle spiegazioni enologiche"], icon: "check" },
      { heading: "4. Abbinamento al calice: la grande opportunità", content: "L'abbinamento al calice è dove convergono due delle tendenze più potenti nella ristorazione: il vino al calice e la personalizzazione dell'esperienza.\n\nPermette al commensale di provare un vino diverso con ogni piatto senza impegnarsi con una bottiglia intera.", tips: ["Offri un 'percorso di calici' allineato al menu degustazione: 3-4 calici che accompagnano ogni piatto", "Il prezzo del percorso dovrebbe essere tra 20€ e 40€", "Includi almeno un vino sorprendente nel percorso", "L'abbinamento al calice permette di usare vini premium", "Ruota il percorso ogni 3-4 settimane", "Forma il personale per suggerire l'abbinamento al calice come upgrade naturale"], icon: "lightbulb" },
      { heading: "5. Impatto reale sullo scontrino medio", content: "I numeri parlano da soli. L'abbinamento ben eseguito ha un impatto diretto e misurabile sulla fatturazione.\n\nUn ristorante con scontrino medio di 45€ dove solo il 30% dei tavoli ordina vino sta lasciando soldi sul tavolo.", tips: ["Ristoranti con abbinamenti integrati: +25-40% nelle vendite di vino", "Menu degustazione con abbinamento al calice: +15-30€ per commensale", "Suggerimenti nel menu: +15-20% nel valore medio del vino ordinato", "Il commensale che riceve un suggerimento ordina vini di maggior valore", "L'abbinamento riduce il tasso di tavoli senza vino: dal 50-70% al 30-40%"], icon: "check" },
      { heading: "6. Come lo automatizza Winerim", content: "Progettare abbinamenti manualmente è possibile, ma non scala. Ogni volta che cambia un piatto o una referenza, gli abbinamenti devono essere aggiornati.\n\nWinerim automatizza questo processo analizzando i profili dei tuoi piatti e vini per generare abbinamenti intelligenti in tempo reale.", tips: ["Abbinamenti automatici: il sistema incrocia il profilo sensoriale di ogni piatto con ogni vino della carta", "Aggiornamento in tempo reale: se cambia il menu o la carta, gli abbinamenti si ricalcolano", "Personalizzazione per commensale: il raccomandatore suggerisce in base alle preferenze", "Visibilità nella carta digitale: gli abbinamenti appaiono automaticamente accanto a ogni piatto", "Senza dipendenza dal sommelier: il sistema funziona 24/7"], icon: "check" },
    ],
    faqs: [
      { q: "Ho bisogno di un sommelier per progettare abbinamenti?", a: "Non necessariamente. Con i principi base di intensità, consistenza e complemento puoi creare abbinamenti efficaci. Strumenti come Winerim automatizzano il processo." },
      { q: "Quanti abbinamenti dovrei offrire per piatto?", a: "L'ideale è 1-2 suggerimenti per piatto principale. Più di 2 crea confusione. Per un menu degustazione, progetta un percorso di 3-5 calici." },
      { q: "L'abbinamento funziona nei ristoranti casual?", a: "Assolutamente. Un semplice suggerimento nel menu fa già la differenza nelle vendite." },
      { q: "Quanto può aumentare lo scontrino medio?", a: "Tra il 15% e il 30% di aumento nello scontrino medio del vino quando gli abbinamenti sono implementati in modo visibile e proattivo." },
    ],
    relatedTools: [
      { label: "Generatore di abbinamenti", url: "/it/generatore-abbinamenti" },
      { label: "Calcolatore prezzo al calice", url: "/it/strumenti/calcolatore-prezzo-calice" },
      { label: "Analizzatore carta dei vini", url: "/it/analizzatore-carta-vini" },
    ],
    relatedGuides: [
      { label: "Come creare una carta dei vini", url: "/it/come-creare-carta-vini" },
      { label: "Come vendere più vino", url: "/it/vendere-piu-vino-ristorante" },
      { label: "Vino al calice al ristorante", url: "/it/vino-al-calice" },
      { label: "Come migliorare la rotazione dei vini", url: "/it/guide/migliorare-rotazione-vini" },
    ],
  },
  fr: {
    slug: "fr/guides/strategie-accords-mets-vins-restaurant",
    metaTitle: "Comment Créer une Stratégie d'Accords Mets-Vins en Restaurant | Guide",
    metaDescription: "Guide pratique pour concevoir des accords mets-vins qui augmentent les ventes : sélection par plat, présentation sur le menu.",
    heroTitle: "Comment créer une stratégie d'accords mets-vins en restaurant",
    heroSubtitle: "L'accord bien exécuté est l'un des outils les plus efficaces pour vendre plus de vin. Apprenez à concevoir une stratégie qui relie votre menu à votre carte des vins.",
    heroBadge: "Guide stratégique",
    breadcrumbParent: { label: "Guides", href: "/fr/guides" },
    ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo",
    ctaSecondaryText: "Analysez votre carte", ctaSecondaryUrl: "/fr/analyseur-carte-des-vins",
    ctaFinalTitle: "Découvrez comment Winerim crée des accords automatiquement",
    ctaFinalDescription: "Winerim analyse votre menu et votre carte des vins pour générer des accords intelligents qui augmentent les ventes sans dépendre d'un sommelier à chaque table.",
    tableOfContents: ["Qu'est-ce que l'accord stratégique", "Comment choisir les vins pour chaque plat", "Comment présenter les accords sur le menu", "Accord au verre : la grande opportunité", "Impact réel sur le ticket moyen", "Comment Winerim l'automatise"],
    sections: [
      { heading: "1. Qu'est-ce que l'accord stratégique", content: "L'accord traditionnel se concentre sur l'harmonie gastronomique : quel vin s'accorde le mieux avec quel plat. C'est bien, mais ce n'est que la moitié de l'équation.\n\nL'accord stratégique ajoute une dimension commerciale : il ne cherche pas seulement le meilleur vin pour chaque plat, mais celui qui offre le meilleur équilibre entre expérience client et rentabilité.", tips: ["Un accord bien pensé transforme la carte des vins en extension du menu", "L'objectif n'est pas que le convive connaisse les accords — c'est qu'il choisisse le vin en confiance", "L'accord élimine la paralysie décisionnelle", "Les restaurants avec accords intégrés vendent 25-40% de vin en plus"], icon: "lightbulb" },
      { heading: "2. Comment choisir les vins pour chaque plat", content: "Choisir le bon vin pour chaque plat ne nécessite pas d'être sommelier. Il faut comprendre trois principes de base : intensité, texture et complémentarité.\n\nIntensité : le vin doit avoir la même puissance que le plat.\n\nTexture : les plats crémeux demandent des vins corsés. Les plats croquants demandent des vins avec de l'acidité.\n\nComplément ou contraste : vous pouvez chercher à renforcer ou équilibrer les saveurs.", tips: ["Plats gras ou fromagers → vins à acidité élevée", "Poissons et fruits de mer → blancs minéraux", "Viandes rouges grillées → rouges structurés avec tannins", "Desserts → vins doux ou effervescents demi-secs", "Cuisine épicée → blancs aromatiques ou rouges légers fruités", "Salades et légumes → blancs frais, rosés ou effervescents"], icon: "list" },
      { heading: "3. Comment présenter les accords sur le menu", content: "Le meilleur accord du monde ne sert à rien si le client ne le voit pas.\n\nIl existe trois niveaux d'intégration des accords dans l'expérience restaurant.", tips: ["Niveau 1 — Suggestion sur la carte des vins : chaque section indique quels plats elle accompagne", "Niveau 2 — Suggestion sur le menu : chaque plat a 1-2 vins suggérés avec nom et prix", "Niveau 3 — Menu dégustation avec option accord au verre (+15-30€ par convive)", "La clé est que l'accord soit visible sans que le client ait à le chercher", "Utilisez des phrases simples : « S'accorde parfaitement avec... »"], icon: "check" },
      { heading: "4. Accord au verre : la grande opportunité", content: "L'accord au verre est le point de convergence de deux tendances puissantes : le vin au verre et la personnalisation de l'expérience.\n\nIl permet au convive de goûter un vin différent avec chaque plat sans s'engager sur une bouteille entière.", tips: ["Proposez un 'parcours de verres' aligné sur votre menu dégustation : 3-4 verres", "Le prix du parcours devrait être entre 20€ et 40€", "Incluez au moins un vin surprenant dans le parcours", "L'accord au verre permet d'utiliser des vins premium", "Renouvelez le parcours toutes les 3-4 semaines", "Formez le personnel pour suggérer l'accord au verre comme upgrade naturel"], icon: "lightbulb" },
      { heading: "5. Impact réel sur le ticket moyen", content: "Les chiffres parlent d'eux-mêmes. L'accord bien exécuté a un impact direct et mesurable sur le chiffre d'affaires.\n\nUn restaurant avec un ticket moyen de 45€ où seulement 30% des tables commandent du vin laisse de l'argent sur la table.", tips: ["Restaurants avec accords intégrés : +25-40% de ventes de vin", "Menu dégustation avec accord au verre : +15-30€ par convive", "Suggestions sur le menu : +15-20% sur la valeur moyenne du vin commandé", "Le convive qui reçoit une suggestion commande des vins de plus grande valeur", "L'accord réduit le taux de tables sans vin : de 50-70% à 30-40%"], icon: "check" },
      { heading: "6. Comment Winerim l'automatise", content: "Concevoir des accords manuellement est possible mais ne passe pas à l'échelle. À chaque changement de plat ou de référence, les accords doivent être mis à jour.\n\nWinerim automatise ce processus en analysant les profils de vos plats et vins pour générer des accords intelligents en temps réel.", tips: ["Accords automatiques : le système croise le profil sensoriel de chaque plat avec chaque vin", "Mise à jour en temps réel : si le menu ou la carte change, les accords se recalculent", "Personnalisation par convive : le recommandeur s'adapte aux préférences", "Visibilité dans la carte digitale : les accords apparaissent automatiquement", "Sans dépendance au sommelier : le système fonctionne 24h/24"], icon: "check" },
    ],
    faqs: [
      { q: "Ai-je besoin d'un sommelier pour concevoir des accords ?", a: "Pas nécessairement. Avec les principes de base d'intensité, texture et complémentarité, vous pouvez créer des accords efficaces. Des outils comme Winerim automatisent le processus." },
      { q: "Combien d'accords proposer par plat ?", a: "Idéalement 1-2 suggestions par plat principal. Plus de 2 crée de la confusion. Pour un menu dégustation, concevez un parcours de 3-5 verres." },
      { q: "Les accords fonctionnent-ils en restauration casual ?", a: "Absolument. Une simple suggestion sur le menu fait déjà la différence dans les ventes." },
      { q: "De combien les accords augmentent-ils le ticket moyen ?", a: "Entre 15% et 30% d'augmentation du ticket moyen vin quand les accords sont implémentés de manière visible et proactive." },
    ],
    relatedTools: [
      { label: "Générateur d'accords", url: "/fr/generateur-accords-mets-vins" },
      { label: "Calculateur prix au verre", url: "/fr/outils/calculateur-prix-verre" },
      { label: "Analyseur de carte des vins", url: "/fr/analyseur-carte-des-vins" },
    ],
    relatedGuides: [
      { label: "Comment créer une carte des vins", url: "/fr/comment-creer-carte-des-vins" },
      { label: "Comment vendre plus de vin", url: "/fr/vendre-plus-vin-restaurant" },
      { label: "Vin au verre au restaurant", url: "/fr/vin-au-verre" },
      { label: "Comment améliorer la rotation des vins", url: "/fr/guides/ameliorer-rotation-vins" },
    ],
  },
};

const EstrategiaMaridaje = () => {
  const { lang } = useLanguage();
  return <GuideTemplate data={getI18n(i18n, lang)} />;
};

export default EstrategiaMaridaje;
