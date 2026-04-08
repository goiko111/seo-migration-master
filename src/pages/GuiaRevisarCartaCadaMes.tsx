import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-revisar-carta-vinos-cada-mes",
  metaTitle: "Cómo Revisar tu Carta de Vinos Cada Mes Sin Perder el Control | Winerim",
  metaDescription: "Guía con proceso estructurado para revisar tu carta de vinos mensualmente: qué medir, qué decidir.",
  heroTitle: "Cómo revisar una carta de vinos cada mes sin perder el control",
  heroSubtitle: "Las mejores cartas de vino no son las que tienen los mejores vinos. Son las que se revisan con disciplina. Un proceso mensual de 90 minutos puede transformar tu rentabilidad.",
  heroBadge: "Guía operativa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: ["Por qué la revisión mensual es imprescindible","Los 5 bloques de una revisión mensual completa","Bloque 1: Rendimiento — qué ha pasado este mes","Bloque 2: Pricing — qué ajustar","Bloque 3: Rotación — qué entra, qué sale","Bloque 4: Equipo — qué comunicar","Bloque 5: Objetivos — qué esperar el mes que viene","Plantilla de la reunión de 90 minutos"],
  sections: [
    { heading: "Por qué la revisión mensual es imprescindible", content: "Una carta de vinos no revisada es una carta que se degrada. Cada mes sin revisión es un mes donde:\n\n• Los vinos muertos acumulan capital inmovilizado.\n• Los precios de compra cambian sin que el PVP se ajuste.\n• Las oportunidades estacionales se pierden.\n• El equipo repite las mismas recomendaciones sin saber qué funciona.\n\nLa revisión mensual convierte tu carta en un activo dinámico que mejora cada mes.", tips: ["Un restaurante que revisa la carta cada mes genera un 12-18% más de margen bruto en vino.", "El primer lunes de cada mes. Marca la reunión en el calendario. 90 minutos.", "Si no tienes datos, empieza registrando manualmente qué vinos se venden cada semana."], icon: "lightbulb" },
    { heading: "Los 5 bloques de una revisión mensual completa", content: "Una revisión eficaz cubre 5 áreas en orden:\n\n1. Rendimiento: qué ha pasado con los números.\n2. Pricing: qué precios necesitan ajuste.\n3. Rotación: qué referencias deben entrar o salir.\n4. Equipo: qué debe saber el personal de sala.\n5. Objetivos: qué esperar del mes siguiente.\n\nTiempo estimado: 15-20 min por bloque.", tips: ["Sigue siempre el mismo orden.", "Toma decisiones durante la reunión, no después.", "Documenta las decisiones en una plantilla estándar."], icon: "list" },
    { heading: "Bloque 1: Rendimiento — qué ha pasado este mes", content: "Dedica los primeros 20 minutos a entender qué ha pasado. No a opinar, a medir.", tips: ["Top 5 y bottom 5 referencias por ventas.", "Ticket medio en vino por mesa.", "% de mesas que piden vino.", "Ratio copa vs botella.", "Referencias sin venta en los últimos 30 días.", "Comparación con el mes anterior."], icon: "check" },
    { heading: "Bloque 2: Pricing — qué ajustar", content: "El pricing es el factor que más impacta en el margen y el menos revisado.", tips: ["Verifica si algún coste de compra ha cambiado.", "Calcula el margen real de tus top 10 referencias.", "Revisa la coherencia de la escalera de precios.", "Identifica oportunidades de subir 1-2€ sin afectar la demanda.", "Copas: recalcula el PVP considerando la merma real."], icon: "lightbulb" },
    { heading: "Bloque 3: Rotación — qué entra, qué sale", content: "La carta es un organismo vivo. Cada mes debería tener al menos un cambio.", tips: ["Candidatos a salir: menos de 3 ventas en 30 días Y margen inferior al objetivo.", "Candidatos a entrar: ¿hay un hueco en la escalera de precios?", "Estacionalidad: ¿el próximo mes requiere ajustes?", "Antes de añadir: verifica que no canibaliza una existente.", "Máximo 2-3 cambios por mes."], icon: "alert" },
    { heading: "Bloque 4: Equipo — qué comunicar", content: "Las mejores decisiones de carta no sirven si el equipo no las conoce.", tips: ["Qué vinos son nuevos y cómo describirlos en 15 segundos.", "Cuál es la copa de la semana.", "Qué vinos han salido de carta y por qué.", "Un dato motivador.", "Formato: briefing de 5 minutos antes del servicio del lunes."], icon: "check" },
    { heading: "Bloque 5: Objetivos — qué esperar el mes que viene", content: "Termina la revisión con 3-5 objetivos concretos para el mes siguiente.", tips: ["Objetivo de ticket medio en vino.", "Objetivo de rotación.", "Objetivo de copa.", "Objetivo de equipo.", "Máximo 5 objetivos. Menos es más."], icon: "list" },
    { heading: "Plantilla de la reunión de 90 minutos", content: "Usa esta estructura:\n\n0:00-0:05 — Repaso de objetivos del mes anterior\n0:05-0:25 — Bloque 1: Rendimiento\n0:25-0:40 — Bloque 2: Pricing\n0:40-0:55 — Bloque 3: Rotación\n0:55-1:05 — Bloque 4: Equipo\n1:05-1:15 — Bloque 5: Objetivos\n1:15-1:20 — Resumen de acciones\n1:20-1:30 — Margen para imprevistos", tips: ["Lleva los datos preparados antes de la reunión.", "Documenta todo en una plantilla estándar.", "Si no puedes hacer 90 minutos, haz 45: bloque 1 + bloque 3 + bloque 5."], icon: "list" },
  ],
  faqs: [
    { q: "¿Qué pasa si no tengo datos de ventas por referencia?", a: "Empieza con un registro manual. En un mes tendrás datos suficientes." },
    { q: "¿Quién debe liderar la revisión?", a: "La persona que gestiona la carta. Si no hay nadie, el propietario con los datos de Winerim." },
    { q: "¿Y si mi carta es pequeña (15-20 referencias)?", a: "Mejor. La revisión será más rápida (45 min) y cada decisión tiene más impacto." },
    { q: "¿Winerim automatiza esta revisión?", a: "Sí. Winerim genera un informe mensual con los 5 bloques prepoblados." },
  ],
  relatedTools: [{ label: "Scorecard mensual", url: "/recursos/scorecard-rendimiento-carta" }, { label: "Plantilla de revisión mensual", url: "/recursos/plantilla-revision-mensual-carta" }],
  relatedGuides: [{ label: "Conectar carta, stock, ventas y margen", url: "/guias/como-conectar-carta-stock-ventas-margen" }, { label: "Detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" }],
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo", ctaSecondaryText: "Descargar plantilla de revisión", ctaSecondaryUrl: "/recursos/plantilla-revision-mensual-carta",
  ctaFinalTitle: "Con Winerim, la revisión mensual se prepara sola", ctaFinalDescription: "Rendimiento, pricing, rotación, formación y objetivos. Winerim genera el informe mensual automáticamente.",
};

const en: GuidePageData = {
  slug: "en/guides/how-to-review-wine-list-monthly",
  metaTitle: "How to Review Your Wine List Every Month Without Losing Control | Winerim",
  metaDescription: "Structured process for monthly wine list reviews: what to measure, what to decide, what to communicate to your team — all in under 90 minutes.",
  heroTitle: "How to review your wine list every month without losing control",
  heroSubtitle: "The best wine lists don't have the best wines. They're the ones reviewed with discipline. A 90-minute monthly process can transform your profitability.",
  heroBadge: "Operational guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  tableOfContents: ["Why monthly reviews are essential","The 5 blocks of a complete monthly review","Block 1: Performance — what happened this month","Block 2: Pricing — what to adjust","Block 3: Rotation — what comes in, what goes out","Block 4: Team — what to communicate","Block 5: Goals — what to expect next month","The 90-minute meeting template"],
  sections: [
    { heading: "Why monthly reviews are essential", content: "An unreviewed wine list is a degrading wine list. Every month without review means:\n\n• Dead wines accumulate tied-up capital.\n• Purchase costs change without retail price adjustments.\n• Seasonal opportunities are missed.\n• The team repeats the same recommendations without knowing what works.\n\nMonthly reviews turn your list into a dynamic asset that improves every month.", tips: ["Restaurants that review monthly generate 12-18% more gross margin on wine.", "First Monday of each month. Block 90 minutes in your calendar.", "If you lack data, start manually tracking which wines sell each week."], icon: "lightbulb" },
    { heading: "The 5 blocks of a complete monthly review", content: "An effective review covers 5 areas in order:\n\n1. Performance: what happened with the numbers.\n2. Pricing: which prices need adjusting.\n3. Rotation: which references should enter or exit.\n4. Team: what the floor staff needs to know.\n5. Goals: what to expect next month.\n\nEstimated time: 15-20 min per block.", tips: ["Always follow the same order.", "Make decisions during the meeting, not after.", "Document decisions in a standard template."], icon: "list" },
    { heading: "Block 1: Performance — what happened this month", content: "Spend the first 20 minutes understanding what happened. Not opinions — measurements.", tips: ["Top 5 and bottom 5 references by sales.", "Average wine spend per table.", "% of tables ordering wine.", "Glass vs bottle ratio.", "References with no sale in 30 days.", "Month-over-month comparison."], icon: "check" },
    { heading: "Block 2: Pricing — what to adjust", content: "Pricing is the factor with the biggest margin impact and the least reviewed.", tips: ["Check if any purchase costs have changed.", "Calculate the real margin on your top 10 references.", "Review price-ladder coherence.", "Identify opportunities to raise €1-2 without affecting demand.", "Glasses: recalculate retail price considering actual waste."], icon: "lightbulb" },
    { heading: "Block 3: Rotation — what comes in, what goes out", content: "The list is a living organism. Each month should have at least one change.", tips: ["Exit candidates: fewer than 3 sales in 30 days AND margin below target.", "Entry candidates: is there a gap in the price ladder?", "Seasonality: does next month require adjustments?", "Before adding: verify it doesn't cannibalize an existing reference.", "Maximum 2-3 changes per month."], icon: "alert" },
    { heading: "Block 4: Team — what to communicate", content: "The best list decisions are useless if the team doesn't know about them.", tips: ["Which wines are new and how to describe them in 15 seconds.", "What's the glass of the week.", "Which wines left the list and why.", "A motivating data point.", "Format: 5-minute briefing before Monday service."], icon: "check" },
    { heading: "Block 5: Goals — what to expect next month", content: "End the review with 3-5 concrete goals for the following month.", tips: ["Average wine spend target.", "Rotation target.", "Glass ratio target.", "Team target.", "Maximum 5 goals. Less is more."], icon: "list" },
    { heading: "The 90-minute meeting template", content: "Use this structure:\n\n0:00-0:05 — Review previous month's goals\n0:05-0:25 — Block 1: Performance\n0:25-0:40 — Block 2: Pricing\n0:40-0:55 — Block 3: Rotation\n0:55-1:05 — Block 4: Team\n1:05-1:15 — Block 5: Goals\n1:15-1:20 — Action summary\n1:20-1:30 — Buffer", tips: ["Come with data prepared before the meeting.", "Document everything in a standard template.", "If you can't do 90 minutes, do 45: block 1 + block 3 + block 5."], icon: "list" },
  ],
  faqs: [
    { q: "What if I don't have per-reference sales data?", a: "Start with a manual log. In one month you'll have enough data." },
    { q: "Who should lead the review?", a: "The person managing the list. If nobody, the owner with Winerim data." },
    { q: "What if my list is small (15-20 references)?", a: "Even better. The review will be faster (45 min) and each decision has more impact." },
    { q: "Does Winerim automate this review?", a: "Yes. Winerim generates a monthly report with all 5 blocks pre-populated." },
  ],
  relatedTools: [{ label: "Monthly scorecard", url: "/en/resources/wine-list-performance-scorecard" }, { label: "Monthly review template", url: "/en/resources/monthly-review-template" }],
  relatedGuides: [{ label: "Connect list, stock, sales and margin", url: "/en/guides/how-to-connect-wine-list-stock-sales-margin" }, { label: "Detect dead wines", url: "/en/guides/how-to-detect-dead-wines" }],
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo", ctaSecondaryText: "Download review template", ctaSecondaryUrl: "/en/resources/monthly-review-template",
  ctaFinalTitle: "With Winerim, the monthly review prepares itself", ctaFinalDescription: "Performance, pricing, rotation, training and goals. Winerim generates the monthly report automatically.",
};

const it: GuidePageData = {
  slug: "it/guide/come-rivedere-carta-vini-ogni-mese",
  metaTitle: "Come Rivedere la Carta dei Vini Ogni Mese Senza Perdere il Controllo | Winerim",
  metaDescription: "Processo strutturato per la revisione mensile della carta dei vini: cosa misurare, cosa decidere, cosa comunicare al team — tutto in meno di 90 minuti.",
  heroTitle: "Come rivedere la carta dei vini ogni mese senza perdere il controllo",
  heroSubtitle: "Le migliori carte dei vini non hanno i migliori vini. Sono quelle riviste con disciplina. Un processo mensile di 90 minuti può trasformare la tua redditività.",
  heroBadge: "Guida operativa",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  tableOfContents: ["Perché la revisione mensile è imprescindibile","I 5 blocchi di una revisione mensile completa","Blocco 1: Performance","Blocco 2: Pricing","Blocco 3: Rotazione","Blocco 4: Team","Blocco 5: Obiettivi","Template della riunione di 90 minuti"],
  sections: [
    { heading: "Perché la revisione mensile è imprescindibile", content: "Una carta dei vini non revisionata è una carta che si degrada. Ogni mese senza revisione significa:\n\n• I vini morti accumulano capitale immobilizzato.\n• I costi di acquisto cambiano senza che il PVP si adegui.\n• Le opportunità stagionali si perdono.\n\nLa revisione mensile trasforma la carta in un asset dinamico che migliora ogni mese.", tips: ["Un ristorante che rivede la carta ogni mese genera il 12-18% in più di margine lordo.", "Il primo lunedì di ogni mese. Blocca 90 minuti in calendario.", "Se non hai dati, inizia registrando manualmente quali vini vendi ogni settimana."], icon: "lightbulb" },
    { heading: "I 5 blocchi di una revisione mensile completa", content: "Una revisione efficace copre 5 aree in ordine:\n\n1. Performance: cosa è successo con i numeri.\n2. Pricing: quali prezzi necessitano di aggiustamento.\n3. Rotazione: quali referenze devono entrare o uscire.\n4. Team: cosa deve sapere il personale di sala.\n5. Obiettivi: cosa aspettarsi il mese prossimo.", tips: ["Segui sempre lo stesso ordine.", "Prendi decisioni durante la riunione, non dopo.", "Documenta le decisioni in un template standard."], icon: "list" },
    { heading: "Blocco 1: Performance — cosa è successo questo mese", content: "Dedica i primi 20 minuti a capire cosa è successo. Non opinioni, misurazioni.", tips: ["Top 5 e bottom 5 referenze per vendite.", "Scontrino medio vino per tavolo.", "% di tavoli che ordinano vino.", "Rapporto calice vs bottiglia.", "Referenze senza vendita negli ultimi 30 giorni."], icon: "check" },
    { heading: "Blocco 2: Pricing — cosa aggiustare", content: "Il pricing è il fattore con maggior impatto sul margine e il meno revisionato.", tips: ["Verifica se qualche costo di acquisto è cambiato.", "Calcola il margine reale delle tue top 10 referenze.", "Rivedi la coerenza della scala dei prezzi.", "Identifica opportunità di alzare 1-2€ senza impattare la domanda."], icon: "lightbulb" },
    { heading: "Blocco 3: Rotazione — cosa entra, cosa esce", content: "La carta è un organismo vivo. Ogni mese dovrebbe avere almeno un cambiamento.", tips: ["Candidati all'uscita: meno di 3 vendite in 30 giorni E margine inferiore all'obiettivo.", "Candidati all'ingresso: c'è un buco nella scala dei prezzi?", "Stagionalità: il mese prossimo richiede aggiustamenti?", "Massimo 2-3 cambiamenti al mese."], icon: "alert" },
    { heading: "Blocco 4: Team — cosa comunicare", content: "Le migliori decisioni sulla carta non servono se il team non le conosce.", tips: ["Quali vini sono nuovi e come descriverli in 15 secondi.", "Qual è il calice della settimana.", "Quali vini sono usciti dalla carta e perché.", "Formato: briefing di 5 minuti prima del servizio del lunedì."], icon: "check" },
    { heading: "Blocco 5: Obiettivi — cosa aspettarsi il mese prossimo", content: "Termina la revisione con 3-5 obiettivi concreti per il mese successivo.", tips: ["Obiettivo di scontrino medio vino.", "Obiettivo di rotazione.", "Obiettivo calice.", "Obiettivo team.", "Massimo 5 obiettivi."], icon: "list" },
    { heading: "Template della riunione di 90 minuti", content: "Usa questa struttura:\n\n0:00-0:05 — Riepilogo obiettivi mese precedente\n0:05-0:25 — Blocco 1: Performance\n0:25-0:40 — Blocco 2: Pricing\n0:40-0:55 — Blocco 3: Rotazione\n0:55-1:05 — Blocco 4: Team\n1:05-1:15 — Blocco 5: Obiettivi\n1:15-1:30 — Riepilogo azioni", tips: ["Porta i dati preparati prima della riunione.", "Documenta tutto in un template standard.", "Se non puoi fare 90 minuti, fanne 45: blocco 1 + blocco 3 + blocco 5."], icon: "list" },
  ],
  faqs: [
    { q: "E se non ho dati di vendita per referenza?", a: "Inizia con un registro manuale. In un mese avrai dati sufficienti." },
    { q: "Chi deve guidare la revisione?", a: "Chi gestisce la carta. Se nessuno, il titolare con i dati di Winerim." },
    { q: "E se la mia carta è piccola (15-20 referenze)?", a: "Meglio. La revisione sarà più rapida (45 min) e ogni decisione ha più impatto." },
    { q: "Winerim automatizza questa revisione?", a: "Sì. Winerim genera un report mensile con tutti i 5 blocchi precompilati." },
  ],
  relatedTools: [{ label: "Scorecard mensile", url: "/it/risorse/scorecard-rendimento-carta" }, { label: "Template revisione mensile", url: "/it/risorse/template-revisione-mensile-carta" }],
  relatedGuides: [{ label: "Collegare carta, stock, vendite e margine", url: "/it/guide/come-collegare-carta-stock-vendite-margine" }, { label: "Rilevare vini morti", url: "/it/guide/come-rilevare-vini-morti" }],
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo", ctaSecondaryText: "Scarica template revisione", ctaSecondaryUrl: "/it/risorse/template-revisione-mensile-carta",
  ctaFinalTitle: "Con Winerim, la revisione mensile si prepara da sola", ctaFinalDescription: "Performance, pricing, rotazione, formazione e obiettivi. Winerim genera il report mensile automaticamente.",
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-reviser-carte-vins-chaque-mois",
  metaTitle: "Comment Réviser Votre Carte des Vins Chaque Mois Sans Perdre le Contrôle | Winerim",
  metaDescription: "Processus structuré pour réviser votre carte des vins mensuellement : quoi mesurer, quoi décider, quoi communiquer à l'équipe — en moins de 90 minutes.",
  heroTitle: "Comment réviser votre carte des vins chaque mois sans perdre le contrôle",
  heroSubtitle: "Les meilleures cartes des vins n'ont pas les meilleurs vins. Ce sont celles révisées avec discipline. Un processus mensuel de 90 minutes peut transformer votre rentabilité.",
  heroBadge: "Guide opérationnel",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  tableOfContents: ["Pourquoi la révision mensuelle est indispensable","Les 5 blocs d'une révision mensuelle complète","Bloc 1 : Performance","Bloc 2 : Pricing","Bloc 3 : Rotation","Bloc 4 : Équipe","Bloc 5 : Objectifs","Template de la réunion de 90 minutes"],
  sections: [
    { heading: "Pourquoi la révision mensuelle est indispensable", content: "Une carte des vins non révisée est une carte qui se dégrade. Chaque mois sans révision signifie :\n\n• Les vins morts accumulent du capital immobilisé.\n• Les coûts d'achat changent sans ajustement du PVC.\n• Les opportunités saisonnières sont manquées.\n\nLa révision mensuelle transforme votre carte en un actif dynamique qui s'améliore chaque mois.", tips: ["Un restaurant qui révise sa carte chaque mois génère 12-18% de marge brute supplémentaire.", "Le premier lundi de chaque mois. Bloquez 90 minutes dans l'agenda.", "Si vous n'avez pas de données, commencez par noter manuellement quels vins se vendent chaque semaine."], icon: "lightbulb" },
    { heading: "Les 5 blocs d'une révision mensuelle complète", content: "Une révision efficace couvre 5 domaines dans l'ordre :\n\n1. Performance : ce qui s'est passé avec les chiffres.\n2. Pricing : quels prix ajuster.\n3. Rotation : quelles références entrent ou sortent.\n4. Équipe : ce que le personnel de salle doit savoir.\n5. Objectifs : quoi attendre du mois prochain.", tips: ["Suivez toujours le même ordre.", "Prenez les décisions pendant la réunion, pas après.", "Documentez les décisions dans un template standard."], icon: "list" },
    { heading: "Bloc 1 : Performance — ce qui s'est passé ce mois", content: "Consacrez les 20 premières minutes à comprendre ce qui s'est passé. Pas des opinions — des mesures.", tips: ["Top 5 et bottom 5 références par ventes.", "Ticket moyen vin par table.", "% de tables commandant du vin.", "Ratio verre vs bouteille.", "Références sans vente depuis 30 jours."], icon: "check" },
    { heading: "Bloc 2 : Pricing — quoi ajuster", content: "Le pricing est le facteur qui impacte le plus la marge et le moins révisé.", tips: ["Vérifiez si des coûts d'achat ont changé.", "Calculez la marge réelle de vos 10 premières références.", "Révisez la cohérence de l'échelle de prix.", "Identifiez des opportunités d'augmenter de 1-2€ sans affecter la demande."], icon: "lightbulb" },
    { heading: "Bloc 3 : Rotation — ce qui entre, ce qui sort", content: "La carte est un organisme vivant. Chaque mois devrait comporter au moins un changement.", tips: ["Candidats à la sortie : moins de 3 ventes en 30 jours ET marge inférieure à l'objectif.", "Candidats à l'entrée : y a-t-il un trou dans l'échelle de prix ?", "Saisonnalité : le mois prochain nécessite-t-il des ajustements ?", "Maximum 2-3 changements par mois."], icon: "alert" },
    { heading: "Bloc 4 : Équipe — quoi communiquer", content: "Les meilleures décisions de carte ne servent à rien si l'équipe ne les connaît pas.", tips: ["Quels vins sont nouveaux et comment les décrire en 15 secondes.", "Quel est le verre de la semaine.", "Quels vins sont sortis de carte et pourquoi.", "Format : briefing de 5 minutes avant le service du lundi."], icon: "check" },
    { heading: "Bloc 5 : Objectifs — quoi attendre du mois prochain", content: "Terminez la révision avec 3-5 objectifs concrets pour le mois suivant.", tips: ["Objectif de ticket moyen vin.", "Objectif de rotation.", "Objectif verre.", "Objectif équipe.", "Maximum 5 objectifs."], icon: "list" },
    { heading: "Template de la réunion de 90 minutes", content: "Utilisez cette structure :\n\n0:00-0:05 — Revue des objectifs du mois précédent\n0:05-0:25 — Bloc 1 : Performance\n0:25-0:40 — Bloc 2 : Pricing\n0:40-0:55 — Bloc 3 : Rotation\n0:55-1:05 — Bloc 4 : Équipe\n1:05-1:15 — Bloc 5 : Objectifs\n1:15-1:30 — Résumé des actions", tips: ["Venez avec les données préparées.", "Documentez tout dans un template standard.", "Si vous ne pouvez pas faire 90 minutes, faites 45 : bloc 1 + bloc 3 + bloc 5."], icon: "list" },
  ],
  faqs: [
    { q: "Et si je n'ai pas de données de vente par référence ?", a: "Commencez par un registre manuel. En un mois vous aurez assez de données." },
    { q: "Qui doit mener la révision ?", a: "La personne qui gère la carte. Si personne, le propriétaire avec les données Winerim." },
    { q: "Et si ma carte est petite (15-20 références) ?", a: "Encore mieux. La révision sera plus rapide (45 min) et chaque décision a plus d'impact." },
    { q: "Winerim automatise-t-il cette révision ?", a: "Oui. Winerim génère un rapport mensuel avec les 5 blocs pré-remplis." },
  ],
  relatedTools: [{ label: "Scorecard mensuel", url: "/fr/ressources/scorecard-performance-carte" }, { label: "Template de révision mensuelle", url: "/fr/ressources/template-revision-mensuelle-carte" }],
  relatedGuides: [{ label: "Connecter carte, stock, ventes et marge", url: "/fr/guides/comment-connecter-carte-stock-ventes-marge" }, { label: "Détecter les vins morts", url: "/fr/guides/comment-detecter-vins-morts" }],
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo", ctaSecondaryText: "Télécharger le template de révision", ctaSecondaryUrl: "/fr/ressources/template-revision-mensuelle-carte",
  ctaFinalTitle: "Avec Winerim, la révision mensuelle se prépare toute seule", ctaFinalDescription: "Performance, pricing, rotation, formation et objectifs. Winerim génère le rapport mensuel automatiquement.",
};

const GuiaRevisarCartaCadaMes = () => <GuideTemplate data={{ es, en, it, fr }} />;
export default GuiaRevisarCartaCadaMes;
