import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-usar-datos-para-decidir-que-vinos-comprar",
  metaTitle: "Cómo Usar Datos para Decidir Qué Vinos Comprar | Guía",
  metaDescription: "Guía para tomar decisiones de compra de vinos basadas en datos: rotación, márgenes, estacionalidad, tendencias y rendimiento por referencia.",
  heroTitle: "Cómo usar datos para decidir qué vinos comprar",
  heroSubtitle: "Comprar vino basándose en la intuición genera acumulación de stock. Comprar con datos genera rotación, margen y una carta que evoluciona.",
  heroBadge: "Guía analítica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo", ctaSecondaryText: "Analizar mi carta", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Compra con inteligencia, no con intuición", ctaFinalDescription: "Winerim analiza tus datos de venta, rotación y margen para recomendarte exactamente qué vinos comprar.",
  tableOfContents: ["Por qué la intuición no basta para comprar vino","Los 5 datos que deberías mirar antes de cada compra","Cómo analizar el rendimiento de tu carta actual","Criterios de entrada para nuevas referencias","Cuánto comprar: la regla del stock óptimo","El ciclo de compra basado en datos"],
  sections: [
    { heading: "1. Por qué la intuición no basta para comprar vino", content: "Las decisiones de compra suelen basarse en ferias, distribuidores e inercia. Ninguna tiene en cuenta qué funciona realmente en tu carta.", tips: ["Las ferias generan compras emocionales.", "El distribuidor prioriza su catálogo, no tu carta.", "La inercia genera complacencia.", "¿Cuántas de las últimas 10 referencias nuevas siguen en carta y rotando?"], icon: "alert" },
    { heading: "2. Los 5 datos que deberías mirar antes de cada compra", content: "Antes de hacer cualquier pedido, consulta estos cinco indicadores.", tips: ["Rotación por referencia: menos de 2 uds/mes probablemente no justifica recompra.", "Margen por referencia: margen absoluto en euros, no solo %.", "Stock actual: no compres más de lo que puedes vender en 60-90 días.", "Tendencia de ventas: ¿va a más o a menos?", "Huecos en la carta: las compras deberían tapar huecos, no duplicar."], icon: "list" },
    { heading: "3. Cómo analizar el rendimiento de tu carta actual", content: "Antes de comprar nuevo, evalúa lo que ya tienes con un análisis BCG aplicado a vinos.", tips: ["Estrellas (alta rotación + alto margen): protégelas.", "Vacas (alta rotación + bajo margen): optimiza pricing.", "Potencial (baja rotación + alto margen): investiga por qué no rotan.", "Lastres (baja rotación + bajo margen): candidatos a retirar."], icon: "lightbulb" },
    { heading: "4. Criterios de entrada para nuevas referencias", content: "Cada referencia nueva debería pasar un filtro mínimo.", tips: ["¿Qué función cumple?", "¿A qué referencia sustituye? Regla 'uno entra, uno sale'.", "¿Qué margen ofrece?", "Máximo 6-12 unidades iniciales.", "¿El equipo lo puede vender?", "¿Encaja con la cocina actual?"], icon: "check" },
    { heading: "5. Cuánto comprar: la regla del stock óptimo", content: "Stock óptimo = Venta mensual × meses de cobertura + stock de seguridad.", tips: ["Referencia nueva: máximo 6-12 unidades.", "Consolidada (8+ uds/mes): stock para 60-90 días.", "Estrella (15+ uds/mes): entregas mensuales automáticas.", "Lenta (< 3 uds/mes): stock máximo para 30 días."], icon: "lightbulb" },
    { heading: "6. El ciclo de compra basado en datos", content: "La compra debería ser un ciclo planificado, no una reacción.", tips: ["Semana 1: revisar scorecard del mes anterior.", "Semana 2: revisar stock y rotación.", "Semana 3: hacer pedidos basándose en datos.", "Semana 4: recibir, ubicar y comunicar al equipo."], icon: "list" },
  ],
  faqs: [
    { q: "¿Qué datos necesito para empezar?", a: "Ventas por referencia, stock actual y precios de compra." },
    { q: "¿Debería dejar de ir a ferias de vino?", a: "No. Separa la cata de la compra: apunta y después aplica los criterios." },
    { q: "¿Cada cuánto debería hacer el análisis?", a: "Trimestralmente como mínimo. Mensualmente con más de 80 referencias." },
  ],
  relatedTools: [{ label: "Calculadora de margen", url: "/calculadora-margen-vino" }, { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" }],
  relatedGuides: [{ label: "Scorecard mensual", url: "/recursos/scorecard-rendimiento-carta" }, { label: "Cómo detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" }],
};

const en: GuidePageData = {
  slug: "en/guides/how-to-use-data-to-decide-which-wines-to-buy",
  metaTitle: "How to Use Data to Decide Which Wines to Buy | Guide",
  metaDescription: "Guide for making data-driven wine purchasing decisions: rotation, margins, seasonality, trends and per-reference performance.",
  heroTitle: "How to use data to decide which wines to buy",
  heroSubtitle: "Buying wine based on intuition creates stock accumulation. Buying with data creates rotation, margin and a list that evolves.",
  heroBadge: "Analytical guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo", ctaSecondaryText: "Analyze my list", ctaSecondaryUrl: "/en/wine-list-analyzer",
  ctaFinalTitle: "Buy with intelligence, not intuition", ctaFinalDescription: "Winerim analyses your sales, rotation and margin data to recommend exactly which wines to buy.",
  tableOfContents: ["Why intuition isn't enough for buying wine","5 data points to check before every purchase","How to analyse your current list's performance","Entry criteria for new references","How much to buy: the optimal stock rule","The data-driven purchasing cycle"],
  sections: [
    { heading: "1. Why intuition isn't enough for buying wine", content: "Purchasing decisions are usually based on fairs, distributors and inertia. None considers what's actually working on your list.", tips: ["Fairs generate emotional purchases.", "The distributor prioritizes their catalogue, not your list.", "Inertia breeds complacency.", "How many of your last 10 new references are still on the list and rotating?"], icon: "alert" },
    { heading: "2. 5 data points to check before every purchase", content: "Before placing any order, check these five indicators.", tips: ["Rotation per reference: fewer than 2 units/month probably doesn't justify reorder.", "Margin per reference: absolute margin in euros, not just %.", "Current stock: don't buy more than you can sell in 60-90 days.", "Sales trend: is it going up or down?", "List gaps: purchases should fill gaps, not duplicate."], icon: "list" },
    { heading: "3. How to analyse your current list's performance", content: "Before buying new, evaluate what you have using a BCG analysis applied to wines.", tips: ["Stars (high rotation + high margin): protect them.", "Cash cows (high rotation + low margin): optimize pricing.", "Potential (low rotation + high margin): investigate why they don't rotate.", "Deadweight (low rotation + low margin): candidates for removal."], icon: "lightbulb" },
    { heading: "4. Entry criteria for new references", content: "Every new reference should pass a minimum filter.", tips: ["What function does it serve?", "Which reference does it replace? 'One in, one out' rule.", "What margin does it offer?", "Maximum 6-12 initial units.", "Can the team sell it?", "Does it pair with the current cuisine?"], icon: "check" },
    { heading: "5. How much to buy: the optimal stock rule", content: "Optimal stock = Monthly sales × coverage months + safety stock.", tips: ["New reference: maximum 6-12 units.", "Established (8+ units/month): stock for 60-90 days.", "Star (15+ units/month): automatic monthly deliveries.", "Slow (< 3 units/month): maximum 30-day stock."], icon: "lightbulb" },
    { heading: "6. The data-driven purchasing cycle", content: "Purchasing should be a planned cycle, not a reaction.", tips: ["Week 1: review previous month's scorecard.", "Week 2: review stock and rotation.", "Week 3: place orders based on data.", "Week 4: receive, shelve and brief the team."], icon: "list" },
  ],
  faqs: [
    { q: "What data do I need to start?", a: "Sales per reference, current stock and purchase prices." },
    { q: "Should I stop going to wine fairs?", a: "No. Separate tasting from buying: note wines and apply criteria later." },
    { q: "How often should I run the analysis?", a: "Quarterly minimum. Monthly with 80+ references." },
  ],
  relatedTools: [{ label: "Margin calculator", url: "/en/wine-margin-calculator" }, { label: "Dead stock calculator", url: "/en/tools/dead-stock-calculator" }],
  relatedGuides: [{ label: "Monthly scorecard", url: "/en/resources/wine-list-performance-scorecard" }, { label: "How to detect dead wines", url: "/en/guides/how-to-detect-dead-wines" }],
};

const it: GuidePageData = {
  slug: "it/guide/come-usare-dati-per-decidere-quali-vini-comprare",
  metaTitle: "Come Usare i Dati per Decidere Quali Vini Comprare | Guida",
  metaDescription: "Guida per prendere decisioni d'acquisto basate sui dati: rotazione, margini, stagionalità e performance per referenza.",
  heroTitle: "Come usare i dati per decidere quali vini comprare",
  heroSubtitle: "Comprare vino basandosi sull'intuizione genera accumulo di stock. Comprare con i dati genera rotazione, margine e una carta che evolve.",
  heroBadge: "Guida analitica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo", ctaSecondaryText: "Analizza la mia carta", ctaSecondaryUrl: "/it/analisi-carta",
  ctaFinalTitle: "Compra con intelligenza, non con intuizione", ctaFinalDescription: "Winerim analizza i tuoi dati di vendita, rotazione e margine per raccomandarti esattamente quali vini comprare.",
  tableOfContents: ["Perché l'intuizione non basta","I 5 dati da guardare prima di ogni acquisto","Come analizzare la performance della carta","Criteri d'ingresso per nuove referenze","Quanto comprare: la regola dello stock ottimale","Il ciclo d'acquisto basato sui dati"],
  sections: [
    { heading: "1. Perché l'intuizione non basta per comprare vino", content: "Le decisioni d'acquisto si basano su fiere, distributori e inerzia. Nessuna considera cosa funziona realmente nella tua carta.", tips: ["Le fiere generano acquisti emotivi.", "Il distributore prioritizza il suo catalogo.", "L'inerzia genera compiacenza.", "Quante delle ultime 10 referenze nuove sono ancora in carta e rotano?"], icon: "alert" },
    { heading: "2. I 5 dati da guardare prima di ogni acquisto", content: "Prima di fare qualsiasi ordine, consulta questi cinque indicatori.", tips: ["Rotazione per referenza: meno di 2 unità/mese probabilmente non giustifica il riordino.", "Margine per referenza: margine assoluto in euro.", "Stock attuale: non comprare più di quanto puoi vendere in 60-90 giorni.", "Tendenza vendite: va a salire o a scendere?", "Buchi nella carta: gli acquisti dovrebbero colmare buchi, non duplicare."], icon: "list" },
    { heading: "3. Come analizzare la performance della carta attuale", content: "Prima di comprare nuovo, valuta quello che hai con un'analisi BCG applicata ai vini.", tips: ["Stelle (alta rotazione + alto margine): proteggile.", "Vacche (alta rotazione + basso margine): ottimizza il pricing.", "Potenziale (bassa rotazione + alto margine): indaga perché non rotano.", "Zavorre (bassa rotazione + basso margine): candidate alla rimozione."], icon: "lightbulb" },
    { heading: "4. Criteri d'ingresso per nuove referenze", content: "Ogni nuova referenza dovrebbe superare un filtro minimo.", tips: ["Che funzione svolge?", "Quale referenza sostituisce? Regola 'una entra, una esce'.", "Che margine offre?", "Massimo 6-12 unità iniziali.", "Il team può venderla?"], icon: "check" },
    { heading: "5. Quanto comprare: la regola dello stock ottimale", content: "Stock ottimale = Vendita mensile × mesi di copertura + stock di sicurezza.", tips: ["Referenza nuova: massimo 6-12 unità.", "Consolidata (8+ uds/mese): stock per 60-90 giorni.", "Stella (15+ uds/mese): consegne mensili automatiche.", "Lenta (< 3 uds/mese): stock massimo per 30 giorni."], icon: "lightbulb" },
    { heading: "6. Il ciclo d'acquisto basato sui dati", content: "L'acquisto dovrebbe essere un ciclo pianificato, non una reazione.", tips: ["Settimana 1: rivedere scorecard del mese precedente.", "Settimana 2: rivedere stock e rotazione.", "Settimana 3: fare ordini basandosi sui dati.", "Settimana 4: ricevere, posizionare e comunicare al team."], icon: "list" },
  ],
  faqs: [
    { q: "Quali dati mi servono per iniziare?", a: "Vendite per referenza, stock attuale e prezzi d'acquisto." },
    { q: "Devo smettere di andare alle fiere?", a: "No. Separa la degustazione dall'acquisto: prendi nota e poi applica i criteri." },
    { q: "Ogni quanto fare l'analisi?", a: "Trimestralmente come minimo. Mensilmente con più di 80 referenze." },
  ],
  relatedTools: [{ label: "Calcolatore margine", url: "/it/calcolatore-margine-vino" }, { label: "Calcolatore stock morto", url: "/it/strumenti/calcolatore-stock-morto" }],
  relatedGuides: [{ label: "Scorecard mensile", url: "/it/risorse/scorecard-rendimento-carta" }, { label: "Come rilevare vini morti", url: "/it/guide/come-rilevare-vini-morti" }],
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-utiliser-donnees-pour-acheter-vins",
  metaTitle: "Comment Utiliser les Données pour Décider Quels Vins Acheter | Guide",
  metaDescription: "Guide pour prendre des décisions d'achat de vins basées sur les données : rotation, marges, saisonnalité et performance par référence.",
  heroTitle: "Comment utiliser les données pour décider quels vins acheter",
  heroSubtitle: "Acheter du vin à l'intuition génère de l'accumulation de stock. Acheter avec des données génère rotation, marge et une carte qui évolue.",
  heroBadge: "Guide analytique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo", ctaSecondaryText: "Analyser ma carte", ctaSecondaryUrl: "/fr/analyse-carte",
  ctaFinalTitle: "Achetez avec intelligence, pas avec intuition", ctaFinalDescription: "Winerim analyse vos données de vente, rotation et marge pour vous recommander exactement quels vins acheter.",
  tableOfContents: ["Pourquoi l'intuition ne suffit pas","Les 5 données à vérifier avant chaque achat","Comment analyser la performance de votre carte","Critères d'entrée pour nouvelles références","Combien acheter : la règle du stock optimal","Le cycle d'achat basé sur les données"],
  sections: [
    { heading: "1. Pourquoi l'intuition ne suffit pas pour acheter du vin", content: "Les décisions d'achat reposent généralement sur les salons, les distributeurs et l'inertie. Aucune ne prend en compte ce qui fonctionne réellement sur votre carte.", tips: ["Les salons génèrent des achats émotionnels.", "Le distributeur priorise son catalogue.", "L'inertie engendre la complaisance.", "Combien de vos 10 dernières nouvelles références sont encore en carte et tournent ?"], icon: "alert" },
    { heading: "2. Les 5 données à vérifier avant chaque achat", content: "Avant de passer commande, consultez ces cinq indicateurs.", tips: ["Rotation par référence : moins de 2 unités/mois ne justifie probablement pas le réapprovisionnement.", "Marge par référence : marge absolue en euros.", "Stock actuel : n'achetez pas plus que ce que vous pouvez vendre en 60-90 jours.", "Tendance des ventes : ça monte ou ça descend ?", "Trous dans la carte : les achats doivent combler des lacunes, pas dupliquer."], icon: "list" },
    { heading: "3. Comment analyser la performance de votre carte actuelle", content: "Avant d'acheter du nouveau, évaluez ce que vous avez avec une analyse BCG appliquée aux vins.", tips: ["Stars (haute rotation + haute marge) : protégez-les.", "Vaches (haute rotation + faible marge) : optimisez le pricing.", "Potentiel (faible rotation + haute marge) : investigez pourquoi ils ne tournent pas.", "Poids morts (faible rotation + faible marge) : candidats au retrait."], icon: "lightbulb" },
    { heading: "4. Critères d'entrée pour nouvelles références", content: "Chaque nouvelle référence devrait passer un filtre minimum.", tips: ["Quelle fonction remplit-elle ?", "Quelle référence remplace-t-elle ? Règle 'une entre, une sort'.", "Quelle marge offre-t-elle ?", "Maximum 6-12 unités initiales.", "L'équipe peut-elle la vendre ?"], icon: "check" },
    { heading: "5. Combien acheter : la règle du stock optimal", content: "Stock optimal = Vente mensuelle × mois de couverture + stock de sécurité.", tips: ["Nouvelle référence : maximum 6-12 unités.", "Établie (8+ unités/mois) : stock pour 60-90 jours.", "Star (15+ unités/mois) : livraisons mensuelles automatiques.", "Lente (< 3 unités/mois) : stock maximum 30 jours."], icon: "lightbulb" },
    { heading: "6. Le cycle d'achat basé sur les données", content: "L'achat devrait être un cycle planifié, pas une réaction.", tips: ["Semaine 1 : revoir le scorecard du mois précédent.", "Semaine 2 : revoir stock et rotation.", "Semaine 3 : passer les commandes basées sur les données.", "Semaine 4 : réceptionner, ranger et briefer l'équipe."], icon: "list" },
  ],
  faqs: [
    { q: "Quelles données faut-il pour commencer ?", a: "Ventes par référence, stock actuel et prix d'achat." },
    { q: "Dois-je arrêter d'aller aux salons ?", a: "Non. Séparez la dégustation de l'achat : notez et appliquez les critères ensuite." },
    { q: "À quelle fréquence faire l'analyse ?", a: "Trimestriellement minimum. Mensuellement avec plus de 80 références." },
  ],
  relatedTools: [{ label: "Calculateur de marge", url: "/fr/calculateur-marge-vin" }, { label: "Calculateur stock mort", url: "/fr/outils/calculateur-stock-mort" }],
  relatedGuides: [{ label: "Scorecard mensuel", url: "/fr/ressources/scorecard-performance-carte" }, { label: "Comment détecter les vins morts", url: "/fr/guides/comment-detecter-vins-morts" }],
};

const de: GuidePageData = {
  slug: "de/ratgeber/daten-nutzen-um-zu-entscheiden-welche-weine-einkaufen",
  metaTitle: "Mit Daten entscheiden, welche Weine Sie einkaufen | Ratgeber",
  metaDescription:
    "Leitfaden für datengestützte Einkaufsentscheidungen bei Wein: Rotation, Margen, Saisonalität, Trends und Performance pro Position.",
  heroTitle: "Mit Daten entscheiden, welche Weine Sie einkaufen",
  heroSubtitle:
    "Aus dem Bauch heraus einzukaufen führt zu Lageraufbau. Datenbasiert einzukaufen erzeugt Rotation, Marge und eine Weinkarte, die sich weiterentwickelt.",
  heroBadge: "Analytischer Ratgeber",
  breadcrumbParent: { label: "Ratgeber", href: "/de/ratgeber" },
  ctaPrimaryText: "Demo anfordern",
  ctaPrimaryUrl: "/de/demo",
  ctaSecondaryText: "Meine Karte analysieren",
  ctaSecondaryUrl: "/de/weinkarten-analyse",
  ctaFinalTitle: "Mit Intelligenz einkaufen, nicht mit Intuition",
  ctaFinalDescription:
    "Winerim wertet Ihre Verkaufs-, Rotations- und Margendaten aus und empfiehlt Ihnen genau, welche Weine Sie einkaufen sollten.",
  tableOfContents: [
    "Warum Intuition beim Weineinkauf nicht reicht",
    "Die 5 Kennzahlen, die Sie vor jedem Einkauf prüfen sollten",
    "Wie Sie die Performance Ihrer aktuellen Karte analysieren",
    "Aufnahmekriterien für neue Positionen",
    "Wie viel kaufen: die Regel für den optimalen Bestand",
    "Der datenbasierte Einkaufszyklus",
  ],
  sections: [
    {
      heading: "1. Warum Intuition beim Weineinkauf nicht reicht",
      content:
        "Einkaufsentscheidungen basieren meist auf Messen, Lieferanten und Trägheit. Keine davon berücksichtigt, was auf Ihrer Karte tatsächlich funktioniert.",
      tips: [
        "Messen führen zu emotionalen Käufen.",
        "Der Lieferant priorisiert seinen Katalog, nicht Ihre Karte.",
        "Trägheit erzeugt Bequemlichkeit.",
        "Wie viele der letzten 10 Neueinlistungen stehen noch auf Ihrer Karte und verkaufen sich?",
      ],
      icon: "alert",
    },
    {
      heading: "2. Die 5 Kennzahlen, die Sie vor jedem Einkauf prüfen sollten",
      content: "Bevor Sie irgendetwas bestellen, prüfen Sie diese fünf Indikatoren.",
      tips: [
        "Rotation pro Position: weniger als 2 Einheiten/Monat rechtfertigen meist keine Nachbestellung.",
        "Marge pro Position: absolute Marge in Euro, nicht nur in %.",
        "Aktueller Bestand: kaufen Sie nicht mehr ein, als Sie in 60-90 Tagen verkaufen können.",
        "Verkaufstrend: geht es nach oben oder nach unten?",
        "Lücken in der Karte: Käufe sollen Lücken füllen, nicht doppeln.",
      ],
      icon: "list",
    },
    {
      heading: "3. Wie Sie die Performance Ihrer aktuellen Karte analysieren",
      content:
        "Bevor Sie Neues einkaufen, bewerten Sie das Bestehende mit einer BCG-Analyse, angewandt auf Weine.",
      tips: [
        "Stars (hohe Rotation + hohe Marge): schützen.",
        "Cash Cows (hohe Rotation + geringe Marge): Preisgestaltung optimieren.",
        "Potenziale (geringe Rotation + hohe Marge): prüfen, warum sie nicht rotieren.",
        "Ballast (geringe Rotation + geringe Marge): Kandidaten zum Auslisten.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "4. Aufnahmekriterien für neue Positionen",
      content: "Jede neue Position muss einen Mindest-Filter bestehen.",
      tips: [
        "Welche Funktion erfüllt sie?",
        "Welche Position ersetzt sie? 'Einer rein, einer raus'-Regel.",
        "Welche Marge bringt sie?",
        "Maximal 6-12 Einheiten zu Beginn.",
        "Kann das Team sie verkaufen?",
        "Passt sie zur aktuellen Küche?",
      ],
      icon: "check",
    },
    {
      heading: "5. Wie viel kaufen: die Regel für den optimalen Bestand",
      content: "Optimaler Bestand = Monatsverkauf × Reichweite in Monaten + Sicherheitsbestand.",
      tips: [
        "Neue Position: maximal 6-12 Einheiten.",
        "Etabliert (8+ Einheiten/Monat): Bestand für 60-90 Tage.",
        "Star (15+ Einheiten/Monat): automatische monatliche Lieferungen.",
        "Langsam (< 3 Einheiten/Monat): maximal 30 Tage Reichweite.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "6. Der datenbasierte Einkaufszyklus",
      content: "Einkauf sollte ein geplanter Zyklus sein, keine Reaktion.",
      tips: [
        "Woche 1: Scorecard des Vormonats durchgehen.",
        "Woche 2: Bestand und Rotation prüfen.",
        "Woche 3: Bestellungen datenbasiert aufgeben.",
        "Woche 4: Annahme, Einlagerung und Teambriefing.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    {
      q: "Welche Daten brauche ich zum Start?",
      a: "Verkäufe pro Position, aktueller Bestand und Einkaufspreise.",
    },
    {
      q: "Sollte ich nicht mehr auf Weinmessen gehen?",
      a: "Doch. Trennen Sie nur Verkostung und Einkauf: notieren Sie die Weine und wenden Sie später Ihre Kriterien an.",
    },
    {
      q: "Wie oft sollte die Analyse laufen?",
      a: "Mindestens quartalsweise. Monatlich bei mehr als 80 Positionen.",
    },
  ],
  relatedTools: [
    { label: "Margen-Rechner", url: "/de/wein-margen-rechner" },
    { label: "Totbestand-Rechner", url: "/de/werkzeuge/totbestand-rechner" },
  ],
  relatedGuides: [
    { label: "Monats-Scorecard", url: "/de/ressourcen/scorecard-weinkarten-performance" },
    { label: "Tote Weine erkennen", url: "/de/ratgeber/tote-weine-erkennen" },
  ],
};

const pt: GuidePageData = {
  slug: "pt/guias/como-usar-dados-para-decidir-que-vinhos-comprar",
  metaTitle: "Como Usar Dados para Decidir Que Vinhos Comprar | Guia",
  metaDescription:
    "Guia para tomar decisões de compra de vinhos baseadas em dados: rotação, margens, sazonalidade, tendências e desempenho por referência.",
  heroTitle: "Como usar dados para decidir que vinhos comprar",
  heroSubtitle:
    "Comprar vinho a partir da intuição gera acumulação de stock. Comprar com dados gera rotação, margem e uma carta que evolui.",
  heroBadge: "Guia analítico",
  breadcrumbParent: { label: "Guias", href: "/pt/guias" },
  ctaPrimaryText: "Pedir demo",
  ctaPrimaryUrl: "/pt/demo",
  ctaSecondaryText: "Analisar a minha carta",
  ctaSecondaryUrl: "/pt/analise-carta",
  ctaFinalTitle: "Comprar com inteligência, não com intuição",
  ctaFinalDescription:
    "A Winerim analisa os seus dados de venda, rotação e margem para lhe recomendar exatamente que vinhos comprar.",
  tableOfContents: [
    "Porque a intuição não chega para comprar vinho",
    "Os 5 dados que deve olhar antes de cada compra",
    "Como analisar o desempenho da sua carta atual",
    "Critérios de entrada para novas referências",
    "Quanto comprar: a regra do stock ótimo",
    "O ciclo de compra baseado em dados",
  ],
  sections: [
    {
      heading: "1. Porque a intuição não chega para comprar vinho",
      content:
        "As decisões de compra costumam basear-se em feiras, distribuidores e inércia. Nenhuma tem em conta o que efetivamente funciona na sua carta.",
      tips: [
        "As feiras geram compras emocionais.",
        "O distribuidor prioriza o seu catálogo, não a sua carta.",
        "A inércia gera complacência.",
        "Quantas das últimas 10 referências novas continuam na carta e a rodar?",
      ],
      icon: "alert",
    },
    {
      heading: "2. Os 5 dados que deve olhar antes de cada compra",
      content: "Antes de qualquer encomenda, consulte estes cinco indicadores.",
      tips: [
        "Rotação por referência: menos de 2 un./mês dificilmente justifica reposição.",
        "Margem por referência: margem absoluta em euros, não só %.",
        "Stock atual: não compre mais do que consegue vender em 60-90 dias.",
        "Tendência de vendas: está a subir ou a descer?",
        "Lacunas na carta: as compras devem tapar buracos, não duplicar.",
      ],
      icon: "list",
    },
    {
      heading: "3. Como analisar o desempenho da sua carta atual",
      content:
        "Antes de comprar novo, avalie o que já tem com uma análise BCG aplicada aos vinhos.",
      tips: [
        "Estrelas (alta rotação + alta margem): proteger.",
        "Vacas (alta rotação + baixa margem): otimizar preços.",
        "Potencial (baixa rotação + alta margem): investigar porque não rodam.",
        "Pesos mortos (baixa rotação + baixa margem): candidatos a retirar.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "4. Critérios de entrada para novas referências",
      content: "Cada referência nova deve passar um filtro mínimo.",
      tips: [
        "Que função cumpre?",
        "Que referência substitui? Regra 'um entra, um sai'.",
        "Que margem oferece?",
        "Máximo 6-12 unidades iniciais.",
        "A equipa consegue vendê-la?",
        "Encaixa na cozinha atual?",
      ],
      icon: "check",
    },
    {
      heading: "5. Quanto comprar: a regra do stock ótimo",
      content: "Stock ótimo = Venda mensal × meses de cobertura + stock de segurança.",
      tips: [
        "Referência nova: máximo 6-12 unidades.",
        "Consolidada (8+ un./mês): stock para 60-90 dias.",
        "Estrela (15+ un./mês): entregas mensais automáticas.",
        "Lenta (< 3 un./mês): stock máximo para 30 dias.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "6. O ciclo de compra baseado em dados",
      content: "A compra deve ser um ciclo planeado, não uma reação.",
      tips: [
        "Semana 1: rever scorecard do mês anterior.",
        "Semana 2: rever stock e rotação.",
        "Semana 3: colocar encomendas com base em dados.",
        "Semana 4: rececionar, arrumar e comunicar à equipa.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "Que dados preciso para começar?", a: "Vendas por referência, stock atual e preços de compra." },
    { q: "Devo deixar de ir a feiras de vinho?", a: "Não. Separe a prova da compra: aponte e aplique depois os critérios." },
    { q: "Com que frequência devo fazer a análise?", a: "Trimestralmente no mínimo. Mensalmente com mais de 80 referências." },
  ],
  relatedTools: [
    { label: "Calculadora de margem", url: "/pt/calculadora-margem-vinho" },
    { label: "Calculadora de stock morto", url: "/pt/ferramentas/calculadora-stock-morto" },
  ],
  relatedGuides: [
    { label: "Scorecard mensal", url: "/pt/recursos/scorecard-desempenho-carta" },
    { label: "Como detetar vinhos mortos", url: "/pt/guias/como-detetar-vinhos-mortos" },
  ],
};

const data: Record<string, GuidePageData> = { es, en, it, fr, de, pt };

const GuiaUsarDatosCompra = () => <GuideTemplate data={data} />;
export default GuiaUsarDatosCompra;
