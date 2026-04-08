import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad",
  metaTitle: "Cómo Detectar Vinos Muertos y Referencias que Frenan tu Rentabilidad | Guía",
  metaDescription: "Guía para identificar vinos sin rotación en tu carta. Aprende a detectar stock muerto.",
  heroTitle: "Cómo detectar vinos muertos y referencias que frenan tu rentabilidad",
  heroSubtitle: "Cada referencia sin rotación es capital inmovilizado, espacio desperdiciado y una señal de que algo no funciona en tu selección, pricing o posicionamiento.",
  heroBadge: "Guía diagnóstica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta", ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo", ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Detecta vinos muertos antes de que acumulen meses",
  ctaFinalDescription: "Winerim monitoriza automáticamente la rotación de cada referencia y te alerta cuando un vino deja de venderse.",
  tableOfContents: ["Qué es un vino muerto y por qué importa", "Causas habituales del stock sin rotación", "Cómo hacer una auditoría de rotación", "Criterios de decisión: mantener, mover o retirar", "Cómo prevenir la acumulación futura", "El sistema de alertas que necesitas"],
  sections: [
    { heading: "1. Qué es un vino muerto y por qué importa", content: "Un vino muerto es una referencia que lleva más de 90 días sin venderse. No es un vino malo — puede ser un gran vino que simplemente no encaja con tu carta, tu público o tu pricing.\n\nEl coste es triple: capital inmovilizado, espacio en bodega y riesgo de deterioro.", tips: ["Un restaurante con 250 referencias y un 20% de vinos muertos puede tener entre 15.000€ y 50.000€ de capital inmovilizado", "Los vinos jóvenes sin crianza pierden frescura con el tiempo", "Sin un sistema de detección, los vinos muertos se acumulan por inercia"], icon: "alert" },
    { heading: "2. Causas habituales del stock sin rotación", content: "Los vinos no mueren solos. Hay patrones claros que explican por qué ciertas referencias dejan de venderse.", tips: ["Precio fuera de rango: un vino demasiado caro para su categoría", "Competencia interna: dos o tres vinos similares en la misma sección", "Mal posicionamiento en carta", "Cambio de menú sin ajustar la carta de vinos", "Compras emocionales: el sumiller prueba un vino en una feria y compra 3 cajas", "Falta de recomendación: el equipo no conoce el vino y no lo recomienda"], icon: "lightbulb" },
    { heading: "3. Cómo hacer una auditoría de rotación", content: "La auditoría de rotación es un proceso estructurado para identificar todas las referencias con problemas.", tips: ["Paso 1 — Listar todas las referencias con la fecha de última venta", "Paso 2 — Clasificar: activa (<30 días), lenta (30-90 días), muerta (>90 días)", "Paso 3 — Calcular el capital inmovilizado de cada categoría", "Paso 4 — Identificar patrones: ¿comparten características?", "Paso 5 — Comparar con la carta: ¿están bien posicionados?", "Paso 6 — Tomar decisiones usando la matriz de decisión"], icon: "list" },
    { heading: "4. Criterios de decisión: mantener, mover o retirar", content: "No todos los vinos sin rotación deben retirarse. Algunos pueden recuperarse con acciones concretas.", tips: ["Mantener si: tiene margen alto y puede reactivarse con mejor posicionamiento", "Mover a copa si: podría funcionar en formato copa", "Promocionar si: incluirlo en menú degustación o evento temático", "Negociar devolución si: el proveedor acepta devoluciones", "Retirar si: no encaja, no tiene margen y no hay forma viable de rotarlo", "Regla de oro: si no se ha vendido en 180 días y no tiene plan de reactivación, debería salir"], icon: "check" },
    { heading: "5. Cómo prevenir la acumulación futura", content: "La prevención es más eficiente que la detección.", tips: ["Regla de entrada: cada nueva referencia necesita justificación", "Límite de stock: no comprar más de 6-12 unidades de una referencia nueva", "Periodo de prueba: 60-90 días con soporte activo", "Protocolo 'uno entra, uno sale'", "Revisión mensual de rotación: 30 minutos al mes"], icon: "check" },
    { heading: "6. El sistema de alertas que necesitas", content: "Lo ideal es tener un sistema que te alerte en tiempo real cuando una referencia empieza a perder velocidad.", tips: ["Alerta temprana (30 días sin venta): la referencia necesita atención", "Alerta urgente (90 días sin venta): decisión obligatoria", "Alerta de stock excesivo: cuando el stock supera los 90 días de venta estimada", "Dashboard mensual: resumen con referencias en alerta y capital inmovilizado", "Sin este sistema, los vinos muertos se detectan demasiado tarde"], icon: "alert" },
  ],
  faqs: [
    { q: "¿A partir de cuántos días se considera un vino muerto?", a: "El estándar del sector es 90 días sin ninguna venta. Entre 30 y 90 días se considera rotación lenta." },
    { q: "¿Qué porcentaje de la carta suele ser stock muerto?", a: "En restaurantes sin control activo, entre el 15% y el 30%. Con monitorización, debería ser inferior al 5%." },
    { q: "¿Debería retirar todos los vinos sin venta?", a: "No automáticamente. Algunos pueden recuperarse con mejor posicionamiento o formato copa." },
    { q: "¿Cómo evito comprar más de lo que puedo vender?", a: "Establece un límite de stock inicial de 6-12 unidades y no amplíes hasta validar rotación en 60-90 días." },
  ],
  relatedTools: [
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
    { label: "Wine List Score", url: "/herramientas/wine-list-score" },
    { label: "Analizador de carta de vinos", url: "/wine-list-analyzer" },
  ],
  relatedGuides: [
    { label: "Checklist de detección de vinos muertos", url: "/recursos/checklist-deteccion-vinos-muertos" },
    { label: "Cómo mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  ],
};

const en: GuidePageData = {
  slug: "guides/how-to-detect-dead-wines",
  metaTitle: "How to Detect Dead Wines and References Hurting Your Profitability | Guide",
  metaDescription: "Guide to identifying wines with no rotation on your list. Learn to detect dead stock, quantify the impact and make decisions to recover profitability.",
  heroTitle: "How to detect dead wines and references hurting your profitability",
  heroSubtitle: "Every reference without rotation is tied-up capital, wasted space and a sign that something isn't working in your selection, pricing or positioning.",
  heroBadge: "Diagnostic guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Analyse my list", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Request demo", ctaSecondaryUrl: "/en/demo",
  ctaFinalTitle: "Detect dead wines before they accumulate for months",
  ctaFinalDescription: "Winerim automatically monitors the rotation of every reference and alerts you when a wine stops selling.",
  tableOfContents: ["What is a dead wine and why it matters", "Common causes of non-rotating stock", "How to run a rotation audit", "Decision criteria: keep, move or remove", "How to prevent future accumulation", "The alert system you need"],
  sections: [
    { heading: "1. What is a dead wine and why it matters", content: "A dead wine is a reference that hasn't sold in over 90 days. It's not necessarily a bad wine — it may simply not fit your list, your clientele or your pricing.\n\nThe cost is threefold: tied-up capital, wasted cellar space and risk of deterioration.", tips: ["A restaurant with 250 references and 20% dead wines may have €15,000-€50,000 in tied-up capital", "Young wines without ageing lose freshness over time", "Without a detection system, dead wines accumulate through inertia"], icon: "alert" },
    { heading: "2. Common causes of non-rotating stock", content: "Wines don't die on their own. There are clear patterns explaining why certain references stop selling.", tips: ["Price out of range: a wine too expensive for its category", "Internal competition: two or three similar wines in the same section", "Poor positioning on the list", "Menu changes without adjusting the wine list", "Emotional purchases: the sommelier tastes a wine at a fair and buys 3 cases", "Lack of recommendation: the team doesn't know the wine and doesn't recommend it"], icon: "lightbulb" },
    { heading: "3. How to run a rotation audit", content: "A rotation audit is a structured process to identify all references with issues.", tips: ["Step 1 — List all references with the last sale date", "Step 2 — Classify: active (<30 days), slow (30-90 days), dead (>90 days)", "Step 3 — Calculate the tied-up capital for each category", "Step 4 — Identify patterns: do they share characteristics?", "Step 5 — Compare with the list: are they well positioned?", "Step 6 — Make decisions using the decision matrix"], icon: "list" },
    { heading: "4. Decision criteria: keep, move or remove", content: "Not all non-rotating wines should be removed. Some can be recovered with specific actions.", tips: ["Keep if: high margin and can be reactivated with better positioning", "Move to glass if: could work in by-the-glass format", "Promote if: include in tasting menu or themed event", "Negotiate return if: the supplier accepts returns", "Remove if: doesn't fit, no margin and no viable way to rotate it", "Golden rule: if it hasn't sold in 180 days with no reactivation plan, it should go"], icon: "check" },
    { heading: "5. How to prevent future accumulation", content: "Prevention is more efficient than detection.", tips: ["Entry rule: every new reference needs justification", "Stock limit: don't buy more than 6-12 units of a new reference", "Trial period: 60-90 days with active support", "'One in, one out' protocol", "Monthly rotation review: 30 minutes per month"], icon: "check" },
    { heading: "6. The alert system you need", content: "Ideally you have a system that alerts you in real time when a reference starts losing speed.", tips: ["Early warning (30 days without sale): the reference needs attention", "Urgent alert (90 days without sale): mandatory decision", "Excess stock alert: when stock exceeds 90 days of estimated sales", "Monthly dashboard: summary with references on alert and tied-up capital", "Without this system, dead wines are detected too late"], icon: "alert" },
  ],
  faqs: [
    { q: "After how many days is a wine considered dead?", a: "The industry standard is 90 days without a sale. Between 30 and 90 days is considered slow rotation." },
    { q: "What percentage of a list is typically dead stock?", a: "In restaurants without active control, between 15% and 30%. With monitoring, it should be below 5%." },
    { q: "Should I remove all wines without sales?", a: "Not automatically. Some can be recovered with better positioning or by-the-glass format." },
    { q: "How do I avoid buying more than I can sell?", a: "Set an initial stock limit of 6-12 units and don't expand until you've validated rotation in 60-90 days." },
  ],
  relatedTools: [
    { label: "Dead stock calculator", url: "/en/tools/dead-stock-calculator" },
    { label: "Wine List Score", url: "/en/tools/wine-list-score" },
    { label: "Wine list analyser", url: "/wine-list-analyzer" },
  ],
  relatedGuides: [
    { label: "Dead wine detection checklist", url: "/en/resources/dead-wine-checklist" },
    { label: "How to improve wine rotation", url: "/en/guides/how-to-improve-wine-rotation" },
  ],
};

const it: GuidePageData = {
  slug: "guide/come-rilevare-vini-morti",
  metaTitle: "Come Rilevare i Vini Morti e le Referenze che Frenano la Redditività | Guida",
  metaDescription: "Guida per identificare i vini senza rotazione nella tua carta. Impara a rilevare lo stock morto, quantificare l'impatto e prendere decisioni per recuperare redditività.",
  heroTitle: "Come rilevare i vini morti e le referenze che frenano la redditività",
  heroSubtitle: "Ogni referenza senza rotazione è capitale immobilizzato, spazio sprecato e un segnale che qualcosa non funziona nella selezione, nel pricing o nel posizionamento.",
  heroBadge: "Guida diagnostica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Analizza la mia carta", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Richiedi demo", ctaSecondaryUrl: "/it/demo",
  ctaFinalTitle: "Rileva i vini morti prima che accumulino mesi",
  ctaFinalDescription: "Winerim monitora automaticamente la rotazione di ogni referenza e ti avvisa quando un vino smette di vendere.",
  tableOfContents: ["Cos'è un vino morto e perché conta", "Cause comuni dello stock senza rotazione", "Come fare un audit di rotazione", "Criteri di decisione: mantenere, spostare o ritirare", "Come prevenire l'accumulo futuro", "Il sistema di alert di cui hai bisogno"],
  sections: [
    { heading: "1. Cos'è un vino morto e perché conta", content: "Un vino morto è una referenza che non si vende da più di 90 giorni. Non è necessariamente un vino cattivo — potrebbe semplicemente non adattarsi alla tua carta, al tuo pubblico o al tuo pricing.\n\nIl costo è triplice: capitale immobilizzato, spazio in cantina e rischio di deterioramento.", tips: ["Un ristorante con 250 referenze e il 20% di vini morti può avere tra 15.000€ e 50.000€ di capitale immobilizzato", "I vini giovani senza invecchiamento perdono freschezza col tempo", "Senza un sistema di rilevamento, i vini morti si accumulano per inerzia"], icon: "alert" },
    { heading: "2. Cause comuni dello stock senza rotazione", content: "I vini non muoiono da soli. Ci sono pattern chiari che spiegano perché certe referenze smettono di vendere.", tips: ["Prezzo fuori fascia: un vino troppo caro per la sua categoria", "Concorrenza interna: due o tre vini simili nella stessa sezione", "Posizionamento inadeguato in carta", "Cambio del menu senza aggiornare la carta dei vini", "Acquisti emotivi: il sommelier assaggia un vino in fiera e compra 3 cartoni", "Mancanza di raccomandazione: il team non conosce il vino"], icon: "lightbulb" },
    { heading: "3. Come fare un audit di rotazione", content: "L'audit di rotazione è un processo strutturato per identificare tutte le referenze problematiche.", tips: ["Passo 1 — Elencare tutte le referenze con la data dell'ultima vendita", "Passo 2 — Classificare: attiva (<30 giorni), lenta (30-90 giorni), morta (>90 giorni)", "Passo 3 — Calcolare il capitale immobilizzato per categoria", "Passo 4 — Identificare pattern: condividono caratteristiche?", "Passo 5 — Confrontare con la carta: sono ben posizionati?", "Passo 6 — Prendere decisioni usando la matrice decisionale"], icon: "list" },
    { heading: "4. Criteri di decisione: mantenere, spostare o ritirare", content: "Non tutti i vini senza rotazione devono essere ritirati. Alcuni possono recuperarsi con azioni specifiche.", tips: ["Mantenere se: ha margine alto e può essere riattivato con migliore posizionamento", "Spostare al calice se: potrebbe funzionare in formato calice", "Promuovere se: includerlo in menu degustazione o evento tematico", "Negoziare reso se: il fornitore accetta resi", "Ritirare se: non si adatta, non ha margine e non c'è modo praticabile di ruotarlo", "Regola d'oro: se non si è venduto in 180 giorni senza piano di riattivazione, dovrebbe uscire"], icon: "check" },
    { heading: "5. Come prevenire l'accumulo futuro", content: "La prevenzione è più efficiente del rilevamento.", tips: ["Regola d'ingresso: ogni nuova referenza necessita giustificazione", "Limite di stock: non comprare più di 6-12 unità di una nuova referenza", "Periodo di prova: 60-90 giorni con supporto attivo", "Protocollo 'uno entra, uno esce'", "Revisione mensile della rotazione: 30 minuti al mese"], icon: "check" },
    { heading: "6. Il sistema di alert di cui hai bisogno", content: "Idealmente hai un sistema che ti avvisa in tempo reale quando una referenza inizia a perdere velocità.", tips: ["Alert precoce (30 giorni senza vendita): la referenza necessita attenzione", "Alert urgente (90 giorni senza vendita): decisione obbligatoria", "Alert stock eccessivo: quando lo stock supera i 90 giorni di vendita stimata", "Dashboard mensile: riepilogo con referenze in alert e capitale immobilizzato", "Senza questo sistema, i vini morti si rilevano troppo tardi"], icon: "alert" },
  ],
  faqs: [
    { q: "Dopo quanti giorni un vino è considerato morto?", a: "Lo standard di settore è 90 giorni senza vendita. Tra 30 e 90 giorni si considera rotazione lenta." },
    { q: "Quale percentuale della carta è tipicamente stock morto?", a: "Nei ristoranti senza controllo attivo, tra il 15% e il 30%. Con monitoraggio, dovrebbe essere inferiore al 5%." },
    { q: "Devo ritirare tutti i vini senza vendite?", a: "Non automaticamente. Alcuni possono recuperarsi con migliore posizionamento o formato calice." },
    { q: "Come evito di comprare più di quanto posso vendere?", a: "Stabilisci un limite iniziale di 6-12 unità e non ampliare fino a validare la rotazione in 60-90 giorni." },
  ],
  relatedTools: [
    { label: "Calcolatore stock morto", url: "/it/strumenti/calcolatore-stock-morto" },
    { label: "Wine List Score", url: "/it/strumenti/wine-list-score" },
    { label: "Analizzatore carta", url: "/wine-list-analyzer" },
  ],
  relatedGuides: [
    { label: "Checklist rilevamento vini morti", url: "/it/risorse/checklist-vini-morti" },
    { label: "Come migliorare la rotazione dei vini", url: "/it/guide/come-migliorare-rotazione-vini" },
  ],
};

const fr: GuidePageData = {
  slug: "guides/comment-detecter-vins-morts",
  metaTitle: "Comment Détecter les Vins Morts et Références qui Freinent la Rentabilité | Guide",
  metaDescription: "Guide pour identifier les vins sans rotation dans votre carte. Apprenez à détecter le stock mort, quantifier l'impact et prendre des décisions pour récupérer la rentabilité.",
  heroTitle: "Comment détecter les vins morts et références qui freinent votre rentabilité",
  heroSubtitle: "Chaque référence sans rotation est du capital immobilisé, de l'espace perdu et un signal que quelque chose ne fonctionne pas dans votre sélection, pricing ou positionnement.",
  heroBadge: "Guide diagnostique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Analyser ma carte", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Demander une démo", ctaSecondaryUrl: "/fr/demo",
  ctaFinalTitle: "Détectez les vins morts avant qu'ils n'accumulent des mois",
  ctaFinalDescription: "Winerim surveille automatiquement la rotation de chaque référence et vous alerte quand un vin cesse de se vendre.",
  tableOfContents: ["Qu'est-ce qu'un vin mort et pourquoi c'est important", "Causes habituelles du stock sans rotation", "Comment réaliser un audit de rotation", "Critères de décision : garder, déplacer ou retirer", "Comment prévenir l'accumulation future", "Le système d'alertes dont vous avez besoin"],
  sections: [
    { heading: "1. Qu'est-ce qu'un vin mort et pourquoi c'est important", content: "Un vin mort est une référence qui ne s'est pas vendue depuis plus de 90 jours. Ce n'est pas forcément un mauvais vin — il peut simplement ne pas convenir à votre carte, votre clientèle ou votre pricing.\n\nLe coût est triple : capital immobilisé, espace en cave et risque de détérioration.", tips: ["Un restaurant avec 250 références et 20% de vins morts peut avoir entre 15 000€ et 50 000€ de capital immobilisé", "Les vins jeunes sans élevage perdent leur fraîcheur avec le temps", "Sans système de détection, les vins morts s'accumulent par inertie"], icon: "alert" },
    { heading: "2. Causes habituelles du stock sans rotation", content: "Les vins ne meurent pas seuls. Il existe des patterns clairs expliquant pourquoi certaines références cessent de se vendre.", tips: ["Prix hors gamme : un vin trop cher pour sa catégorie", "Concurrence interne : deux ou trois vins similaires dans la même section", "Mauvais positionnement en carte", "Changement de menu sans ajuster la carte des vins", "Achats émotionnels : le sommelier goûte un vin en salon et achète 3 cartons", "Manque de recommandation : l'équipe ne connaît pas le vin"], icon: "lightbulb" },
    { heading: "3. Comment réaliser un audit de rotation", content: "L'audit de rotation est un processus structuré pour identifier toutes les références problématiques.", tips: ["Étape 1 — Lister toutes les références avec la date de dernière vente", "Étape 2 — Classifier : active (<30 jours), lente (30-90 jours), morte (>90 jours)", "Étape 3 — Calculer le capital immobilisé par catégorie", "Étape 4 — Identifier les patterns : partagent-elles des caractéristiques ?", "Étape 5 — Comparer avec la carte : sont-elles bien positionnées ?", "Étape 6 — Prendre des décisions avec la matrice décisionnelle"], icon: "list" },
    { heading: "4. Critères de décision : garder, déplacer ou retirer", content: "Tous les vins sans rotation ne doivent pas être retirés. Certains peuvent être récupérés avec des actions spécifiques.", tips: ["Garder si : marge élevée et peut être réactivé avec meilleur positionnement", "Déplacer au verre si : pourrait fonctionner en format verre", "Promouvoir si : l'inclure dans un menu dégustation ou événement thématique", "Négocier le retour si : le fournisseur accepte les retours", "Retirer si : ne convient pas, pas de marge et aucun moyen viable de le faire tourner", "Règle d'or : s'il ne s'est pas vendu en 180 jours sans plan de réactivation, il doit sortir"], icon: "check" },
    { heading: "5. Comment prévenir l'accumulation future", content: "La prévention est plus efficace que la détection.", tips: ["Règle d'entrée : chaque nouvelle référence nécessite une justification", "Limite de stock : ne pas acheter plus de 6-12 unités d'une nouvelle référence", "Période d'essai : 60-90 jours avec support actif", "Protocole 'un entre, un sort'", "Révision mensuelle de la rotation : 30 minutes par mois"], icon: "check" },
    { heading: "6. Le système d'alertes dont vous avez besoin", content: "Idéalement, vous disposez d'un système qui vous alerte en temps réel quand une référence commence à perdre de la vitesse.", tips: ["Alerte précoce (30 jours sans vente) : la référence nécessite attention", "Alerte urgente (90 jours sans vente) : décision obligatoire", "Alerte stock excessif : quand le stock dépasse 90 jours de vente estimée", "Dashboard mensuel : résumé avec références en alerte et capital immobilisé", "Sans ce système, les vins morts sont détectés trop tard"], icon: "alert" },
  ],
  faqs: [
    { q: "Au bout de combien de jours un vin est-il considéré mort ?", a: "Le standard du secteur est 90 jours sans vente. Entre 30 et 90 jours, on considère une rotation lente." },
    { q: "Quel pourcentage de la carte est typiquement du stock mort ?", a: "Dans les restaurants sans contrôle actif, entre 15% et 30%. Avec suivi, cela devrait être inférieur à 5%." },
    { q: "Dois-je retirer tous les vins sans vente ?", a: "Pas automatiquement. Certains peuvent être récupérés avec meilleur positionnement ou format verre." },
    { q: "Comment éviter d'acheter plus que ce que je peux vendre ?", a: "Fixez une limite initiale de 6-12 unités et n'élargissez pas avant d'avoir validé la rotation en 60-90 jours." },
  ],
  relatedTools: [
    { label: "Calculateur de stock mort", url: "/fr/outils/calculateur-stock-mort" },
    { label: "Wine List Score", url: "/fr/outils/wine-list-score" },
    { label: "Analyseur de carte", url: "/wine-list-analyzer" },
  ],
  relatedGuides: [
    { label: "Checklist détection vins morts", url: "/fr/ressources/checklist-vins-morts" },
    { label: "Comment améliorer la rotation des vins", url: "/fr/guides/comment-ameliorer-rotation-vins" },
  ],
};

const data: Record<string, GuidePageData> = { es, en, it, fr };

const GuiaDetectarVinosMuertos = () => <GuideTemplate data={data} />;
export default GuiaDetectarVinosMuertos;
