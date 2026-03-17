import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-implantar-vino-por-copa-sin-perder-margen",
  metaTitle: "Cómo Implantar Vino por Copa sin Perder Margen | Winerim",
  metaDescription: "Guía práctica para lanzar un programa de vino por copa rentable: selección, pricing, control de merma, rotación y formación del equipo de sala.",
  heroTitle: "Cómo implantar vino por copa sin perder margen",
  heroSubtitle: "El vino por copa es la mayor oportunidad de venta en restauración… y la mayor fuente de pérdida si no se gestiona bien. Esta guía te da el framework completo.",
  heroBadge: "Guía operativa — Copa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Winerim optimiza tu programa de copa automáticamente",
  ctaFinalDescription: "Pricing dinámico, control de merma, alertas de rotación y recomendaciones de selección basadas en datos reales.",
  tableOfContents: ["Por qué el vino por copa es una oportunidad enorme", "Los 5 errores que destruyen el margen", "Cómo seleccionar los vinos por copa correctos", "Framework de pricing: la fórmula del equilibrio", "Control de merma: el factor invisible", "Checklist de lanzamiento"],
  sections: [
    { heading: "Por qué el vino por copa es una oportunidad enorme", content: "El vino por copa resuelve el principal freno del cliente: el compromiso. Una copa permite explorar sin riesgo.\n\nPara el restaurante, una oferta de copa bien diseñada puede aumentar el ticket medio un 15-25%.", tips: ["El 35-45% de las mesas que no piden vino lo harían si la oferta por copa fuera más visible.", "Una copa bien posicionada tiene un margen bruto superior al de la botella si la merma está controlada.", "Los restaurantes que mejor venden por copa tienen mejor rotación, no más referencias."], icon: "lightbulb" },
    { heading: "Los 5 errores que destruyen el margen", content: "La mayoría de restaurantes que 'prueban' el vino por copa y lo abandonan cometieron al menos 2 de estos errores.", tips: ["Demasiadas referencias abiertas: empieza con 4-6 referencias", "Pricing por intuición: la copa debe calcularse por separado", "No medir la merma: sin registrar cuántas copas salen por botella", "Selección estática: la rotación frecuente genera curiosidad", "Equipo no formado: si el camarero no explica por qué pedir esa copa, no se vende"], icon: "alert" },
    { heading: "Cómo seleccionar los vinos por copa correctos", content: "La selección de vinos por copa no es un mini-versión de tu carta de botellas.\n\nEstructura recomendada: 1 espumoso, 2 blancos, 2-3 tintos, 1 copa premium rotativa.", tips: ["Prioriza vinos que aguanten 2-3 días abiertos sin deterioro.", "La copa rotativa 'del mes' genera narrativa y urgencia.", "Prueba cada referencia abierta durante 3 días antes de incluirla."], icon: "check" },
    { heading: "Framework de pricing: la fórmula del equilibrio", content: "Fórmula: PVP copa = (Coste botella / copas reales) × multiplicador\n\nMultiplicador: estándar 4x-5x, premium 3,5x-4x, entrada 5x-6x.\n\nRegla: PVP copa entre 25% y 35% del PVP botella.", tips: ["Si una copa cuesta 2€ y la vendes a 8€, tu margen bruto es del 75%. Pero si tiras 1 copa, baja al 60%.", "Revisa el pricing de copas cada mes.", "Winerim calcula el PVP óptimo teniendo en cuenta merma real y rotación."], icon: "list" },
    { heading: "Control de merma: el factor invisible", content: "La merma es la diferencia entre lo que deberías servir y lo que realmente sirves. Es el factor que más impacta en la rentabilidad del programa de copa.", tips: ["Una merma del 15% en lugar del 10% reduce el margen bruto 8-10 puntos.", "El sobreservicio es la causa más común. Forma al equipo con marcas en la copa.", "Registra las copas de cortesía como gasto de marketing."], icon: "alert" },
    { heading: "Checklist de lanzamiento", content: "Un programa de vino por copa rentable se lanza en 3 semanas.", tips: ["Semana 1: Define selección (4-6 refs), calcula pricing, prepara fichas", "Semana 2: Forma al equipo (15 min/día × 5 días)", "Semana 3: Lanzamiento con seguimiento diario", "Mes 1: Revisión completa — qué funciona, merma, ajustes", "Regla de salida: si vende <3 copas/semana, sustitúyela", "Objetivo mes 3: merma <12%, rotación semanal, equipo autónomo"], icon: "list" },
  ],
  faqs: [
    { q: "¿Cuántas copas debo ofrecer para empezar?", a: "Entre 4 y 6 referencias. Suficiente para cubrir perfiles sin merma inmanejable." },
    { q: "¿El vino por copa canibaliza la botella?", a: "No, la complementa. Las mesas que empiezan con copa piden más vino después." },
    { q: "¿Necesito un sistema de preservación?", a: "No es obligatorio, pero muy recomendable para copas premium (+15€)." },
    { q: "¿Cada cuánto rotar los vinos por copa?", a: "Estándar cada 2-4 semanas. Copa premium puede ser semanal." },
  ],
  relatedTools: [{ label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" }, { label: "Diagnóstico de vino por copa", url: "/herramientas/diagnostico-vino-por-copa" }],
  relatedGuides: [{ label: "Estrategia rentable de vino por copa", url: "/guias/como-fijar-estrategia-rentable-vino-por-copa" }, { label: "Detectar canibalización entre vinos", url: "/guias/como-detectar-canibalizacion-vinos-carta" }],
};

const en: GuidePageData = {
  slug: "guides/how-to-implement-wine-by-the-glass-without-losing-margin",
  metaTitle: "How to Implement Wine by the Glass Without Losing Margin | Winerim",
  metaDescription: "Practical guide to launching a profitable by-the-glass programme: selection, pricing, waste control, rotation and floor team training.",
  heroTitle: "How to implement wine by the glass without losing margin",
  heroSubtitle: "Wine by the glass is the biggest sales opportunity in hospitality — and the biggest source of loss if poorly managed. This guide gives you the complete framework.",
  heroBadge: "Operational guide — Glass",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo",
  ctaSecondaryText: "Analyse my list", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Winerim optimises your glass programme automatically",
  ctaFinalDescription: "Dynamic pricing, waste control, rotation alerts and selection recommendations based on your real data.",
  tableOfContents: ["Why wine by the glass is a huge opportunity", "The 5 mistakes that destroy margin", "How to select the right glass wines", "Pricing framework: the balance formula", "Waste control: the invisible factor", "Launch checklist"],
  sections: [
    { heading: "Why wine by the glass is a huge opportunity", content: "Wine by the glass removes the guest's main barrier: commitment. A glass lets them explore without risk.\n\nA well-designed glass offer can increase the average ticket by 15-25%.", tips: ["35-45% of tables that don't order wine would do so if the glass offer were more visible.", "A well-positioned glass has a higher gross margin than the bottle when waste is controlled.", "Restaurants that sell best by the glass have better rotation, not more references."], icon: "lightbulb" },
    { heading: "The 5 mistakes that destroy margin", content: "Most restaurants that 'try' wine by the glass and abandon it made at least 2 of these mistakes.", tips: ["Too many open references: start with 4-6", "Pricing by intuition: the glass price must be calculated separately", "Not measuring waste: without tracking glasses per bottle", "Static selection: frequent rotation generates curiosity", "Untrained team: if the waiter can't explain why to order that glass, it won't sell"], icon: "alert" },
    { heading: "How to select the right glass wines", content: "Glass selection isn't a mini-version of your bottle list.\n\nRecommended structure: 1 sparkling, 2 whites, 2-3 reds, 1 rotating premium glass.", tips: ["Prioritise wines that last 2-3 days open without noticeable deterioration.", "The 'wine of the month' glass generates narrative and urgency.", "Test each reference open for 3 days before adding it to the programme."], icon: "check" },
    { heading: "Pricing framework: the balance formula", content: "Formula: Glass price = (Bottle cost / real glasses) × multiplier\n\nMultiplier: standard 4x-5x, premium 3.5x-4x, entry 5x-6x.\n\nRule: glass price between 25% and 35% of bottle price.", tips: ["If a glass costs €2 and you sell it at €8, your gross margin is 75%. But if you waste 1 glass, it drops to 60%.", "Review glass pricing monthly.", "Winerim calculates the optimal glass price factoring in real waste and rotation."], icon: "list" },
    { heading: "Waste control: the invisible factor", content: "Waste is the difference between what you should serve and what you actually serve. It's the factor that most impacts glass programme profitability.", tips: ["15% waste instead of 10% reduces gross margin by 8-10 points.", "Over-pouring is the most common cause. Train the team with measured pours.", "Record courtesy glasses as a marketing expense."], icon: "alert" },
    { heading: "Launch checklist", content: "A profitable glass programme launches in 3 weeks.", tips: ["Week 1: Define selection (4-6 refs), calculate pricing, prepare product cards", "Week 2: Train the team (15 min/day × 5 days)", "Week 3: Launch with daily tracking", "Month 1: Full review — what works, waste levels, adjustments", "Exit rule: if a reference sells <3 glasses/week, replace it", "Month 3 target: waste <12%, weekly rotation, autonomous team"], icon: "list" },
  ],
  faqs: [
    { q: "How many glasses should I offer to start?", a: "Between 4 and 6 references. Enough to cover profiles without unmanageable waste." },
    { q: "Does wine by the glass cannibalise bottle sales?", a: "No, it complements them. Tables that start with a glass order more wine afterwards." },
    { q: "Do I need a preservation system?", a: "Not mandatory, but highly recommended for premium glasses (+€15)." },
    { q: "How often should I rotate glass wines?", a: "Standard every 2-4 weeks. Premium glass can be weekly." },
  ],
  relatedTools: [{ label: "By-the-glass price calculator", url: "/en/tools/glass-price-calculator" }, { label: "Glass programme diagnostic", url: "/en/tools/glass-diagnostic" }],
  relatedGuides: [{ label: "Profitable glass strategy", url: "/en/guides/profitable-glass-strategy" }, { label: "Detect wine cannibalization", url: "/en/guides/how-to-detect-wine-cannibalization" }],
};

const it: GuidePageData = {
  slug: "guide/come-implementare-vino-al-calice-senza-perdere-margine",
  metaTitle: "Come Implementare il Vino al Calice senza Perdere Margine | Winerim",
  metaDescription: "Guida pratica per lanciare un programma di vino al calice redditizio: selezione, pricing, controllo scarti, rotazione e formazione dello staff.",
  heroTitle: "Come implementare il vino al calice senza perdere margine",
  heroSubtitle: "Il vino al calice è la più grande opportunità di vendita nella ristorazione — e la più grande fonte di perdita se gestito male. Questa guida ti dà il framework completo.",
  heroBadge: "Guida operativa — Calice",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo",
  ctaSecondaryText: "Analizza la mia carta", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Winerim ottimizza il tuo programma al calice automaticamente",
  ctaFinalDescription: "Pricing dinamico, controllo scarti, alert di rotazione e raccomandazioni di selezione basate sui tuoi dati reali.",
  tableOfContents: ["Perché il vino al calice è un'enorme opportunità", "I 5 errori che distruggono il margine", "Come selezionare i vini al calice giusti", "Framework di pricing: la formula dell'equilibrio", "Controllo scarti: il fattore invisibile", "Checklist di lancio"],
  sections: [
    { heading: "Perché il vino al calice è un'enorme opportunità", content: "Il vino al calice rimuove il freno principale del cliente: l'impegno. Un calice permette di esplorare senza rischio.\n\nUn'offerta al calice ben progettata può aumentare lo scontrino medio del 15-25%.", tips: ["Il 35-45% dei tavoli che non ordinano vino lo farebbero se l'offerta al calice fosse più visibile.", "Un calice ben posizionato ha un margine lordo superiore alla bottiglia se gli scarti sono controllati.", "I ristoranti che vendono meglio al calice hanno migliore rotazione, non più referenze."], icon: "lightbulb" },
    { heading: "I 5 errori che distruggono il margine", content: "La maggior parte dei ristoranti che 'provano' il vino al calice e lo abbandonano hanno commesso almeno 2 di questi errori.", tips: ["Troppe referenze aperte: inizia con 4-6", "Pricing intuitivo: il prezzo al calice va calcolato separatamente", "Non misurare gli scarti: senza registrare quanti calici escono per bottiglia", "Selezione statica: la rotazione frequente genera curiosità", "Team non formato: se il cameriere non spiega perché ordinare quel calice, non si vende"], icon: "alert" },
    { heading: "Come selezionare i vini al calice giusti", content: "La selezione al calice non è una mini-versione della carta bottiglie.\n\nStruttura consigliata: 1 spumante, 2 bianchi, 2-3 rossi, 1 calice premium rotativo.", tips: ["Prioritizza vini che resistono 2-3 giorni aperti senza deterioramento.", "Il calice rotativo 'del mese' genera narrativa e urgenza.", "Prova ogni referenza aperta per 3 giorni prima di inserirla."], icon: "check" },
    { heading: "Framework di pricing: la formula dell'equilibrio", content: "Formula: PVP calice = (Costo bottiglia / calici reali) × moltiplicatore\n\nMoltiplicatore: standard 4x-5x, premium 3,5x-4x, ingresso 5x-6x.\n\nRegola: PVP calice tra 25% e 35% del PVP bottiglia.", tips: ["Se un calice costa 2€ e lo vendi a 8€, il margine lordo è del 75%. Ma se scarti 1 calice, scende al 60%.", "Rivedi il pricing al calice ogni mese.", "Winerim calcola il PVP ottimale tenendo conto degli scarti reali e della rotazione."], icon: "list" },
    { heading: "Controllo scarti: il fattore invisibile", content: "Gli scarti sono la differenza tra quello che dovresti servire e quello che realmente servi. È il fattore che più impatta sulla redditività del programma al calice.", tips: ["Scarti del 15% invece del 10% riducono il margine lordo di 8-10 punti.", "Il sovra-servizio è la causa più comune. Forma il team con segni nel calice.", "Registra i calici di cortesia come spesa di marketing."], icon: "alert" },
    { heading: "Checklist di lancio", content: "Un programma al calice redditizio si lancia in 3 settimane.", tips: ["Settimana 1: Definisci selezione (4-6 refs), calcola pricing, prepara schede", "Settimana 2: Forma il team (15 min/giorno × 5 giorni)", "Settimana 3: Lancio con monitoraggio giornaliero", "Mese 1: Revisione completa — cosa funziona, scarti, aggiustamenti", "Regola d'uscita: se vende <3 calici/settimana, sostituiscila", "Obiettivo mese 3: scarti <12%, rotazione settimanale, team autonomo"], icon: "list" },
  ],
  faqs: [
    { q: "Quanti calici devo offrire per iniziare?", a: "Tra 4 e 6 referenze. Sufficiente per coprire i profili senza scarti ingestibili." },
    { q: "Il vino al calice cannibalizza la bottiglia?", a: "No, la complementa. I tavoli che iniziano con un calice ordinano più vino dopo." },
    { q: "Serve un sistema di preservazione?", a: "Non obbligatorio, ma molto consigliato per calici premium (+15€)." },
    { q: "Ogni quanto ruotare i vini al calice?", a: "Standard ogni 2-4 settimane. Calice premium può essere settimanale." },
  ],
  relatedTools: [{ label: "Calcolatore prezzo al calice", url: "/it/strumenti/calcolatore-prezzo-calice" }, { label: "Diagnostica vino al calice", url: "/it/strumenti/diagnostica-calice" }],
  relatedGuides: [{ label: "Strategia redditizia al calice", url: "/it/guide/strategia-redditizia-calice" }, { label: "Rilevare cannibalizzazione tra vini", url: "/it/guide/come-rilevare-cannibalizzazione-vini-carta" }],
};

const fr: GuidePageData = {
  slug: "guides/comment-implementer-vin-au-verre-sans-perdre-marge",
  metaTitle: "Comment Implémenter le Vin au Verre sans Perdre de Marge | Winerim",
  metaDescription: "Guide pratique pour lancer un programme de vin au verre rentable : sélection, pricing, contrôle de la perte, rotation et formation de l'équipe.",
  heroTitle: "Comment implémenter le vin au verre sans perdre de marge",
  heroSubtitle: "Le vin au verre est la plus grande opportunité de vente en restauration — et la plus grande source de perte si mal géré. Ce guide vous donne le framework complet.",
  heroBadge: "Guide opérationnel — Verre",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo",
  ctaSecondaryText: "Analyser ma carte", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Winerim optimise votre programme au verre automatiquement",
  ctaFinalDescription: "Pricing dynamique, contrôle de la perte, alertes de rotation et recommandations de sélection basées sur vos données réelles.",
  tableOfContents: ["Pourquoi le vin au verre est une énorme opportunité", "Les 5 erreurs qui détruisent la marge", "Comment sélectionner les bons vins au verre", "Framework de pricing : la formule de l'équilibre", "Contrôle de la perte : le facteur invisible", "Checklist de lancement"],
  sections: [
    { heading: "Pourquoi le vin au verre est une énorme opportunité", content: "Le vin au verre supprime le frein principal du client : l'engagement. Un verre permet d'explorer sans risque.\n\nUne offre au verre bien conçue peut augmenter le ticket moyen de 15-25%.", tips: ["35-45% des tables qui ne commandent pas de vin le feraient si l'offre au verre était plus visible.", "Un verre bien positionné a une marge brute supérieure à la bouteille si la perte est contrôlée.", "Les restaurants qui vendent le mieux au verre ont une meilleure rotation, pas plus de références."], icon: "lightbulb" },
    { heading: "Les 5 erreurs qui détruisent la marge", content: "La plupart des restaurants qui 'essaient' le vin au verre et l'abandonnent ont commis au moins 2 de ces erreurs.", tips: ["Trop de références ouvertes : commencez avec 4-6", "Pricing intuitif : le prix au verre doit être calculé séparément", "Ne pas mesurer la perte : sans compter les verres par bouteille", "Sélection statique : la rotation fréquente crée de la curiosité", "Équipe non formée : si le serveur ne peut pas expliquer pourquoi commander ce verre, il ne se vend pas"], icon: "alert" },
    { heading: "Comment sélectionner les bons vins au verre", content: "La sélection au verre n'est pas une mini-version de votre carte bouteilles.\n\nStructure recommandée : 1 effervescent, 2 blancs, 2-3 rouges, 1 verre premium rotatif.", tips: ["Privilégiez les vins qui tiennent 2-3 jours ouverts sans détérioration.", "Le verre rotatif 'du mois' génère de la narrative et de l'urgence.", "Testez chaque référence ouverte pendant 3 jours avant de l'intégrer."], icon: "check" },
    { heading: "Framework de pricing : la formule de l'équilibre", content: "Formule : PVP verre = (Coût bouteille / verres réels) × multiplicateur\n\nMultiplicateur : standard 4x-5x, premium 3,5x-4x, entrée 5x-6x.\n\nRègle : PVP verre entre 25% et 35% du PVP bouteille.", tips: ["Si un verre coûte 2€ et vous le vendez 8€, votre marge brute est de 75%. Mais si vous perdez 1 verre, elle tombe à 60%.", "Révisez le pricing au verre chaque mois.", "Winerim calcule le PVP optimal en tenant compte de la perte réelle et de la rotation."], icon: "list" },
    { heading: "Contrôle de la perte : le facteur invisible", content: "La perte est la différence entre ce que vous devriez servir et ce que vous servez réellement. C'est le facteur qui impacte le plus la rentabilité du programme au verre.", tips: ["15% de perte au lieu de 10% réduit la marge brute de 8-10 points.", "Le sur-service est la cause la plus courante. Formez l'équipe avec des doseurs.", "Enregistrez les verres de courtoisie comme dépense marketing."], icon: "alert" },
    { heading: "Checklist de lancement", content: "Un programme au verre rentable se lance en 3 semaines.", tips: ["Semaine 1 : Définir la sélection (4-6 réfs), calculer le pricing, préparer les fiches", "Semaine 2 : Former l'équipe (15 min/jour × 5 jours)", "Semaine 3 : Lancement avec suivi quotidien", "Mois 1 : Révision complète — ce qui fonctionne, perte, ajustements", "Règle de sortie : si une référence vend <3 verres/semaine, remplacez-la", "Objectif mois 3 : perte <12%, rotation hebdomadaire, équipe autonome"], icon: "list" },
  ],
  faqs: [
    { q: "Combien de verres proposer pour commencer ?", a: "Entre 4 et 6 références. Assez pour couvrir les profils sans perte ingérable." },
    { q: "Le vin au verre cannibalise-t-il la bouteille ?", a: "Non, il la complète. Les tables qui commencent par un verre commandent plus de vin ensuite." },
    { q: "Faut-il un système de préservation ?", a: "Pas obligatoire, mais très recommandé pour les verres premium (+15€)." },
    { q: "À quelle fréquence renouveler les vins au verre ?", a: "Standard toutes les 2-4 semaines. Verre premium peut être hebdomadaire." },
  ],
  relatedTools: [{ label: "Calculateur prix au verre", url: "/fr/outils/calculateur-prix-verre" }, { label: "Diagnostic vin au verre", url: "/fr/outils/diagnostic-verre" }],
  relatedGuides: [{ label: "Stratégie rentable au verre", url: "/fr/guides/strategie-rentable-verre" }, { label: "Détecter la cannibalisation entre vins", url: "/fr/guides/comment-detecter-cannibalisation-vins-carte" }],
};

const data: Record<string, GuidePageData> = { es, en, it, fr };

const GuiaVinoPorCopaSinPerderMargen = () => <GuideTemplate data={data} />;
export default GuiaVinoPorCopaSinPerderMargen;
