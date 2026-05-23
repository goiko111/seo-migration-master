import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-detectar-canibalizacion-vinos-carta",
  metaTitle: "Cómo Detectar Canibalización entre Vinos de la Carta | Winerim",
  metaDescription: "Guía para identificar y resolver la canibalización entre referencias de tu carta de vinos: diagnóstico, metodología.",
  heroTitle: "Cómo detectar canibalización entre vinos de la carta",
  heroSubtitle: "Si tienes 3 Ribera del Duero crianza en el mismo rango de precio, no están compitiendo con la competencia. Están compitiendo entre sí. La canibalización es el problema invisible que más cartas tienen y menos restaurantes diagnostican.",
  heroBadge: "Guía analítica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Qué es la canibalización y por qué importa",
    "Señales de que tu carta tiene canibalización",
    "Metodología de diagnóstico paso a paso",
    "Cómo decidir qué referencia queda y cuál sale",
    "Casos típicos de canibalización",
    "Checklist anti-canibalización",
  ],
  sections: [
    { heading: "Qué es la canibalización y por qué importa", content: "La canibalización ocurre cuando dos o más vinos de tu carta compiten por el mismo cliente, en el mismo momento, sin ofrecer una diferenciación clara. El resultado: las ventas se reparten entre referencias similares en lugar de concentrarse, ninguna rota lo suficiente, y el stock se multiplica innecesariamente.\n\nLa canibalización no es tener vinos parecidos. Es tener vinos parecidos sin una razón estratégica para ello.\n\nImpacto directo:\n• Stock inmovilizado en referencias redundantes.\n• Menor rotación media de cada referencia afectada.\n• Mayor riesgo de vinos muertos.\n• El equipo de sala no sabe cuál recomendar (si son tan parecidos, ¿cuál es mejor?).\n• El comensal se paraliza ante opciones que no puede diferenciar.", tips: ["Dos Verdejo Rueda a 16€ y 18€ no es diversidad: es confusión. El cliente elegirá el de 16€ casi siempre.", "La canibalización cuesta dinero real: capital inmovilizado en stock redundante y oportunidades de venta perdidas en vinos que podrían ocupar ese hueco.", "Un restaurante medio tiene entre un 15% y un 25% de redundancia en su carta sin saberlo."], icon: "alert" },
    { heading: "Señales de que tu carta tiene canibalización", content: "Antes de hacer un análisis formal, busca estas señales rápidas que indican canibalización probable.", tips: ["Dos o más vinos del mismo estilo, región y rango de precio (±20% de PVP). Es la señal más clara.", "Una referencia vende mucho y otra similar apenas se mueve. La primera está 'robando' ventas a la segunda.", "El equipo de sala siempre recomienda el mismo vino cuando hay 2-3 opciones similares. Las otras son invisibles.", "Tienes stock acumulado de un vino que 'debería venderse' dado su perfil y precio. Probablemente otro vino similar lo está canibalizando.", "Al preguntar al equipo la diferencia entre dos vinos, no saben explicarla. Si ellos no la ven, el cliente tampoco."], icon: "alert" },
    { heading: "Metodología de diagnóstico paso a paso", content: "Para detectar canibalización de forma sistemática, sigue estos 4 pasos.", tips: ["Paso 1 — Agrupa por perfil: clasifica todos tus vinos por tipo (blanco, tinto, rosado), estilo (joven, crianza, reserva), región y tramo de precio. Usa una hoja de cálculo o Winerim.", "Paso 2 — Busca clusters: identifica grupos donde haya 2+ vinos con el mismo tipo + estilo + rango de precio (±20%). Esos son tus clusters de riesgo.", "Paso 3 — Compara rendimiento dentro del cluster: para cada cluster, mira cuál vende más, cuál tiene mejor margen y cuál rota peor. El vino con peor rendimiento es candidato a salir.", "Paso 4 — Valida con el equipo: pregunta al equipo de sala si pueden explicar la diferencia entre los vinos del cluster. Si no pueden, la canibalización está confirmada."], icon: "list" },
    { heading: "Cómo decidir qué referencia queda y cuál sale", content: "Cuando confirmas canibalización, necesitas decidir qué vino mantener. No es solo cuestión de ventas. Usa estos 5 criterios ponderados.\n\n1. Rendimiento comercial (30%): ventas en unidades y en euros.\n2. Margen bruto (25%): el que genera más beneficio absoluto por botella.\n3. Diferenciación (20%): el que aporta algo que ningún otro vino de tu carta ofrece.\n4. Disponibilidad (15%): el que puedes reponer con facilidad.\n5. Narrativa (10%): el que tiene mejor historia para contar en sala.", tips: ["No elimines siempre el que vende menos. A veces el que vende menos tiene mejor margen o más potencial con recomendación activa.", "Si dos vinos puntúan igual, quédate con el que tiene mejor historia para sala. La narrativa vende.", "Al sacar un vino de carta, no lo tires. Liquídalo en eventos, menús degustación o como copa especial."], icon: "check" },
    { heading: "Casos típicos de canibalización", content: "Estos son los patrones de canibalización que más vemos en restaurantes reales.", tips: ["Ribera vs Ribera: 3 Ribera del Duero crianza entre 22€ y 28€. Solución: deja 1 Ribera en ese rango e introduce un Toro o Bierzo como alternativa.", "Verdejo vs Verdejo: 2 Rueda Verdejo entre 14€ y 17€. Solución: mantén 1 y añade un Godello o Albariño para diversificar.", "Copa vs copa: 2 tintos jóvenes por copa a 4€ y 4,50€. Solución: deja 1 tinto joven y convierte el otro hueco en una copa de perfil diferente.", "Entrada vs entrada: 3 vinos entre 12€ y 15€ que compiten como 'el barato'. Solución: deja 2 máximo y sube el tercero de rango o sustitúyelo."], icon: "lightbulb" },
    { heading: "Checklist anti-canibalización", content: "Antes de cerrar tu carta (o al revisarla cada mes), pasa este checklist.", tips: ["✓ No hay más de 2 vinos del mismo tipo + estilo + región en el mismo tramo de precio (±20%).", "✓ El equipo de sala puede explicar la diferencia entre cada par de vinos similares en 15 segundos.", "✓ Cada referencia tiene una 'razón de carta': por qué está ahí y qué aporta que no aporte otra.", "✓ Ningún cluster de riesgo tiene una referencia con menos de 3 ventas mensuales.", "✓ Al incorporar una referencia nueva, verificas que no canibaliza una existente.", "✓ Cada tramo de precio tiene diversidad de estilos, no repetición del mismo perfil."], icon: "list" },
  ],
  faqs: [
    { q: "¿Tener 2 vinos parecidos siempre es malo?", a: "No siempre. Si tu restaurante es fine dining con clientela experta, puede tener sentido ofrecer 2 Ribera de productores distintos. Pero en restaurantes con carta de 20-40 referencias, la redundancia suele ser un problema." },
    { q: "¿Cómo detecto canibalización entre copa y botella?", a: "Si el mismo vino está disponible en copa y botella, no es canibalización (es complementario). El problema es cuando tienes 2 tintos jóvenes por copa que se reparten las ventas." },
    { q: "¿Cada cuánto debo revisar la canibalización?", a: "En cada revisión mensual de carta. Es un check rápido: mira tus clusters de riesgo y verifica que no hay referencias redundantes sin rendimiento." },
    { q: "¿Winerim detecta la canibalización automáticamente?", a: "Sí. Winerim identifica clusters de vinos similares en tu carta y te alerta cuando detecta patrones de canibalización basados en rendimiento real." },
  ],
  relatedTools: [
    { label: "Analizador de carta", url: "/analisis-carta" },
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
  ],
  relatedGuides: [
    { label: "Detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" },
    { label: "Decidir surtido según ticket medio", url: "/guias/como-decidir-surtido-segun-ticket-medio-tipo-local" },
    { label: "Mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  ],
  ctaPrimaryText: "Analizar mi carta", ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo", ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Winerim detecta canibalización antes de que te cueste dinero",
  ctaFinalDescription: "Análisis automático de clusters, alertas de redundancia y recomendaciones de sustitución basadas en rendimiento real.",
};

const en: GuidePageData = {
  slug: "guides/how-to-detect-wine-cannibalization",
  metaTitle: "How to Detect Cannibalization Between Wines on Your List | Winerim",
  metaDescription: "Guide to identifying and resolving cannibalization between references on your wine list: diagnosis, methodology, decisions and optimization framework.",
  heroTitle: "How to detect cannibalization between wines on your list",
  heroSubtitle: "If you have 3 Ribera del Duero crianza in the same price range, they're not competing with the competition. They're competing with each other. Cannibalization is the invisible problem most wine lists have and fewest restaurants diagnose.",
  heroBadge: "Analytical guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  tableOfContents: [
    "What is cannibalization and why it matters",
    "Signs your list has cannibalization",
    "Step-by-step diagnostic methodology",
    "How to decide which reference stays and which goes",
    "Typical cannibalization cases",
    "Anti-cannibalization checklist",
  ],
  sections: [
    { heading: "What is cannibalization and why it matters", content: "Cannibalization occurs when two or more wines on your list compete for the same guest, at the same moment, without offering clear differentiation. The result: sales split between similar references instead of concentrating, none rotates enough, and stock multiplies unnecessarily.\n\nCannibalization isn't having similar wines. It's having similar wines without a strategic reason.\n\nDirect impact:\n• Capital tied up in redundant references.\n• Lower average rotation for each affected reference.\n• Higher risk of dead stock.\n• Floor staff don't know which to recommend.\n• Guests freeze when they can't differentiate options.", tips: ["Two Verdejo Rueda at €16 and €18 isn't diversity — it's confusion. The guest will almost always choose the €16 one.", "Cannibalization costs real money: capital tied up in redundant stock and lost sales opportunities.", "An average restaurant has 15-25% redundancy on its list without knowing it."], icon: "alert" },
    { heading: "Signs your list has cannibalization", content: "Before doing a formal analysis, look for these quick signals indicating probable cannibalization.", tips: ["Two or more wines of the same style, region and price range (±20%). The clearest signal.", "One reference sells well and a similar one barely moves. The first is 'stealing' sales from the second.", "Floor staff always recommend the same wine when 2-3 similar options exist. The others are invisible.", "You have accumulated stock of a wine that 'should sell' given its profile and price. Another similar wine is probably cannibalizing it.", "When you ask the team the difference between two wines, they can't explain it. If they can't see it, neither can the guest."], icon: "alert" },
    { heading: "Step-by-step diagnostic methodology", content: "To detect cannibalization systematically, follow these 4 steps.", tips: ["Step 1 — Group by profile: classify all wines by type (white, red, rosé), style (young, oak-aged, reserve), region and price tier.", "Step 2 — Find clusters: identify groups with 2+ wines sharing type + style + price range (±20%). These are your risk clusters.", "Step 3 — Compare performance within the cluster: for each cluster, check which sells most, which has better margin and which rotates worst. The worst performer is a candidate for removal.", "Step 4 — Validate with the team: ask floor staff if they can explain the difference between wines in the cluster. If they can't, cannibalization is confirmed."], icon: "list" },
    { heading: "How to decide which reference stays and which goes", content: "When you confirm cannibalization, you need to decide which wine to keep. It's not just about sales. Use these 5 weighted criteria.\n\n1. Commercial performance (30%): sales in units and revenue.\n2. Gross margin (25%): the one generating the most absolute profit per bottle.\n3. Differentiation (20%): the one offering something no other wine on your list does.\n4. Availability (15%): the one you can replenish easily and consistently.\n5. Narrative (10%): the one with the best story for the floor.", tips: ["Don't always remove the lowest seller. Sometimes it has better margin or more potential with active recommendation.", "If two wines score equally, keep the one with the better story. Narrative sells.", "When removing a wine from the list, don't discard it. Liquidate it at events, tasting menus or as a special glass."], icon: "check" },
    { heading: "Typical cannibalization cases", content: "These are the most common cannibalization patterns we see in real restaurants.", tips: ["Ribera vs Ribera: 3 Ribera del Duero crianza between €22 and €28. Solution: keep 1 in that range and introduce a Toro or Bierzo as an alternative.", "Verdejo vs Verdejo: 2 Rueda Verdejo between €14 and €17. Solution: keep 1 and add a Godello or Albariño to diversify.", "Glass vs glass: 2 young reds by the glass at €4 and €4.50. Solution: keep 1 young red and replace the other with a different profile.", "Entry vs entry: 3 wines between €12 and €15 competing as 'the cheap option'. Solution: keep 2 max and move the third up or replace it."], icon: "lightbulb" },
    { heading: "Anti-cannibalization checklist", content: "Before finalising your list (or at each monthly review), run this checklist.", tips: ["✓ No more than 2 wines of the same type + style + region in the same price tier (±20%).", "✓ Floor staff can explain the difference between each pair of similar wines in 15 seconds.", "✓ Every reference has a 'list reason': why it's there and what it contributes that no other does.", "✓ No risk cluster has a reference with fewer than 3 monthly sales.", "✓ When adding a new reference, you verify it doesn't cannibalize an existing one.", "✓ Each price tier has style diversity, not repetition of the same profile."], icon: "list" },
  ],
  faqs: [
    { q: "Is having 2 similar wines always bad?", a: "Not always. In fine dining with expert clientele, offering 2 Ribera from different producers can make sense. But in restaurants with 20-40 references, redundancy is usually a problem." },
    { q: "How do I detect cannibalization between glass and bottle?", a: "If the same wine is available by the glass and bottle, that's not cannibalization (it's complementary). The problem is when you have 2 young reds by the glass splitting sales." },
    { q: "How often should I review for cannibalization?", a: "At every monthly list review. It's a quick check: look at your risk clusters and verify there are no redundant references without performance." },
    { q: "Does Winerim detect cannibalization automatically?", a: "Yes. Winerim identifies clusters of similar wines on your list and alerts you when it detects cannibalization patterns based on real performance." },
  ],
  relatedTools: [
    { label: "Wine list analyser", url: "/wine-list-analyzer" },
    { label: "Dead stock calculator", url: "/en/tools/dead-stock-calculator" },
  ],
  relatedGuides: [
    { label: "Detect dead wines", url: "/en/guides/how-to-detect-dead-wines" },
    { label: "Decide assortment by average ticket", url: "/en/guides/how-to-decide-assortment-by-ticket" },
    { label: "Improve wine rotation", url: "/en/guides/how-to-improve-wine-rotation" },
  ],
  ctaPrimaryText: "Analyse my list", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Request demo", ctaSecondaryUrl: "/en/demo",
  ctaFinalTitle: "Winerim detects cannibalization before it costs you money",
  ctaFinalDescription: "Automatic cluster analysis, redundancy alerts and substitution recommendations based on real performance.",
};

const it: GuidePageData = {
  slug: "guide/come-rilevare-cannibalizzazione-vini-carta",
  metaTitle: "Come Rilevare la Cannibalizzazione tra Vini della Carta | Winerim",
  metaDescription: "Guida per identificare e risolvere la cannibalizzazione tra referenze della carta dei vini: diagnosi, metodologia, decisioni e framework di ottimizzazione.",
  heroTitle: "Come rilevare la cannibalizzazione tra vini della carta",
  heroSubtitle: "Se hai 3 Chianti Classico Riserva nella stessa fascia di prezzo, non stanno competendo con la concorrenza. Stanno competendo tra loro. La cannibalizzazione è il problema invisibile che la maggior parte delle carte ha e pochi ristoranti diagnosticano.",
  heroBadge: "Guida analitica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  tableOfContents: [
    "Cos'è la cannibalizzazione e perché conta",
    "Segnali che la tua carta ha cannibalizzazione",
    "Metodologia di diagnosi passo dopo passo",
    "Come decidere quale referenza resta e quale esce",
    "Casi tipici di cannibalizzazione",
    "Checklist anti-cannibalizzazione",
  ],
  sections: [
    { heading: "Cos'è la cannibalizzazione e perché conta", content: "La cannibalizzazione si verifica quando due o più vini della tua carta competono per lo stesso cliente, nello stesso momento, senza offrire una differenziazione chiara. Il risultato: le vendite si dividono tra referenze simili anziché concentrarsi, nessuna ruota abbastanza e lo stock si moltiplica inutilmente.\n\nLa cannibalizzazione non è avere vini simili. È avere vini simili senza una ragione strategica.\n\nImpatto diretto:\n• Capitale immobilizzato in referenze ridondanti.\n• Rotazione media inferiore per ogni referenza coinvolta.\n• Maggior rischio di stock morto.\n• Lo staff di sala non sa quale raccomandare.\n• Il cliente si blocca davanti a opzioni che non riesce a differenziare.", tips: ["Due Verdicchio a 16€ e 18€ non è diversità — è confusione. Il cliente sceglierà quasi sempre quello da 16€.", "La cannibalizzazione costa denaro reale: capitale immobilizzato in stock ridondante e opportunità di vendita perse.", "Un ristorante medio ha tra il 15% e il 25% di ridondanza nella carta senza saperlo."], icon: "alert" },
    { heading: "Segnali che la tua carta ha cannibalizzazione", content: "Prima di fare un'analisi formale, cerca questi segnali rapidi.", tips: ["Due o più vini dello stesso stile, regione e fascia di prezzo (±20%). Il segnale più chiaro.", "Una referenza vende molto e un'altra simile si muove appena. La prima sta 'rubando' vendite alla seconda.", "Lo staff di sala raccomanda sempre lo stesso vino quando ci sono 2-3 opzioni simili.", "Hai stock accumulato di un vino che 'dovrebbe vendersi'. Probabilmente un vino simile lo sta cannibalizzando.", "Quando chiedi al team la differenza tra due vini, non sanno spiegarla."], icon: "alert" },
    { heading: "Metodologia di diagnosi passo dopo passo", content: "Per rilevare la cannibalizzazione in modo sistematico, segui questi 4 passi.", tips: ["Passo 1 — Raggruppa per profilo: classifica tutti i vini per tipo, stile, regione e fascia di prezzo.", "Passo 2 — Cerca i cluster: identifica gruppi con 2+ vini dello stesso tipo + stile + fascia di prezzo (±20%).", "Passo 3 — Confronta le performance nel cluster: per ogni cluster, verifica quale vende di più, quale ha margine migliore e quale ruota peggio.", "Passo 4 — Valida con il team: chiedi allo staff di sala se possono spiegare la differenza tra i vini del cluster."], icon: "list" },
    { heading: "Come decidere quale referenza resta e quale esce", content: "Quando confermi la cannibalizzazione, devi decidere quale vino tenere. Non è solo questione di vendite. Usa questi 5 criteri ponderati.\n\n1. Performance commerciale (30%).\n2. Margine lordo (25%).\n3. Differenziazione (20%).\n4. Disponibilità (15%).\n5. Narrativa (10%).", tips: ["Non eliminare sempre quello che vende meno. A volte ha margine migliore o più potenziale con raccomandazione attiva.", "Se due vini hanno lo stesso punteggio, tieni quello con la storia migliore.", "Quando togli un vino dalla carta, liquidalo in eventi, menu degustazione o come calice speciale."], icon: "check" },
    { heading: "Casi tipici di cannibalizzazione", content: "Questi sono i pattern di cannibalizzazione più comuni nei ristoranti reali.", tips: ["Chianti vs Chianti: 3 Chianti Classico tra 22€ e 28€. Soluzione: tieni 1 e introduci un Brunello o Morellino come alternativa.", "Verdicchio vs Verdicchio: 2 Verdicchio tra 14€ e 17€. Soluzione: tieni 1 e aggiungi un Fiano o Falanghina.", "Calice vs calice: 2 rossi giovani al calice a 4€ e 4,50€. Soluzione: tieni 1 e sostituisci l'altro con un profilo diverso.", "Ingresso vs ingresso: 3 vini tra 12€ e 15€ che competono come 'l'economico'. Soluzione: tieni max 2 e sposta il terzo."], icon: "lightbulb" },
    { heading: "Checklist anti-cannibalizzazione", content: "Prima di chiudere la carta (o a ogni revisione mensile), segui questa checklist.", tips: ["✓ Non più di 2 vini dello stesso tipo + stile + regione nella stessa fascia di prezzo (±20%).", "✓ Lo staff di sala può spiegare la differenza tra ogni coppia di vini simili in 15 secondi.", "✓ Ogni referenza ha una 'ragione di carta': perché è lì e cosa apporta di unico.", "✓ Nessun cluster di rischio ha una referenza con meno di 3 vendite mensili.", "✓ Quando aggiungi una nuova referenza, verifichi che non cannibalizzi una esistente.", "✓ Ogni fascia di prezzo ha diversità di stili."], icon: "list" },
  ],
  faqs: [
    { q: "Avere 2 vini simili è sempre un problema?", a: "Non sempre. Nel fine dining con clientela esperta, può avere senso offrire 2 Chianti di produttori diversi. Ma nei ristoranti con 20-40 referenze, la ridondanza è solitamente un problema." },
    { q: "Come rilevo la cannibalizzazione tra calice e bottiglia?", a: "Se lo stesso vino è disponibile al calice e in bottiglia, non è cannibalizzazione. Il problema è quando hai 2 rossi giovani al calice che si dividono le vendite." },
    { q: "Ogni quanto devo verificare la cannibalizzazione?", a: "Ad ogni revisione mensile della carta. È un controllo rapido: guarda i cluster di rischio e verifica che non ci siano referenze ridondanti." },
    { q: "Winerim rileva la cannibalizzazione automaticamente?", a: "Sì. Winerim identifica cluster di vini simili e ti avvisa quando rileva pattern di cannibalizzazione basati su performance reali." },
  ],
  relatedTools: [
    { label: "Analizzatore carta", url: "/wine-list-analyzer" },
    { label: "Calcolatore stock morto", url: "/it/strumenti/calcolatore-stock-morto" },
  ],
  relatedGuides: [
    { label: "Rilevare vini morti", url: "/it/guide/come-rilevare-vini-morti" },
    { label: "Decidere assortimento per scontrino", url: "/it/guide/come-decidere-assortimento-per-scontrino" },
    { label: "Migliorare la rotazione dei vini", url: "/it/guide/come-migliorare-rotazione-vini" },
  ],
  ctaPrimaryText: "Analizza la mia carta", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Richiedi demo", ctaSecondaryUrl: "/it/demo",
  ctaFinalTitle: "Winerim rileva la cannibalizzazione prima che ti costi denaro",
  ctaFinalDescription: "Analisi automatica dei cluster, avvisi di ridondanza e raccomandazioni di sostituzione basate su performance reali.",
};

const fr: GuidePageData = {
  slug: "guides/comment-detecter-cannibalisation-vins-carte",
  metaTitle: "Comment Détecter la Cannibalisation entre Vins de la Carte | Winerim",
  metaDescription: "Guide pour identifier et résoudre la cannibalisation entre références de votre carte des vins : diagnostic, méthodologie, décisions et framework d'optimisation.",
  heroTitle: "Comment détecter la cannibalisation entre vins de la carte",
  heroSubtitle: "Si vous avez 3 Bordeaux Supérieur dans la même gamme de prix, ils ne sont pas en concurrence avec la compétition. Ils sont en concurrence entre eux. La cannibalisation est le problème invisible que la plupart des cartes ont et que peu de restaurants diagnostiquent.",
  heroBadge: "Guide analytique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  tableOfContents: [
    "Qu'est-ce que la cannibalisation et pourquoi c'est important",
    "Signaux que votre carte a de la cannibalisation",
    "Méthodologie de diagnostic étape par étape",
    "Comment décider quelle référence reste et laquelle sort",
    "Cas typiques de cannibalisation",
    "Checklist anti-cannibalisation",
  ],
  sections: [
    { heading: "Qu'est-ce que la cannibalisation et pourquoi c'est important", content: "La cannibalisation se produit quand deux ou plusieurs vins de votre carte entrent en concurrence pour le même client, au même moment, sans offrir de différenciation claire. Résultat : les ventes se répartissent entre références similaires au lieu de se concentrer, aucune ne tourne suffisamment et le stock se multiplie inutilement.\n\nLa cannibalisation, ce n'est pas avoir des vins similaires. C'est avoir des vins similaires sans raison stratégique.\n\nImpact direct :\n• Capital immobilisé dans des références redondantes.\n• Rotation moyenne inférieure pour chaque référence concernée.\n• Risque accru de stock mort.\n• Le personnel de salle ne sait pas lequel recommander.\n• Le client se fige devant des options qu'il ne peut pas différencier.", tips: ["Deux Muscadet à 16€ et 18€, ce n'est pas de la diversité — c'est de la confusion. Le client choisira presque toujours celui à 16€.", "La cannibalisation coûte de l'argent réel : capital immobilisé et opportunités de vente perdues.", "Un restaurant moyen a entre 15% et 25% de redondance dans sa carte sans le savoir."], icon: "alert" },
    { heading: "Signaux que votre carte a de la cannibalisation", content: "Avant une analyse formelle, cherchez ces signaux rapides.", tips: ["Deux vins ou plus du même style, région et gamme de prix (±20%). Le signal le plus clair.", "Une référence vend beaucoup et une similaire bouge à peine. La première 'vole' des ventes à la seconde.", "Le personnel recommande toujours le même vin quand il y a 2-3 options similaires.", "Vous avez du stock accumulé d'un vin qui 'devrait se vendre'. Un autre vin similaire le cannibalise probablement.", "Quand vous demandez au team la différence entre deux vins, ils ne savent pas l'expliquer."], icon: "alert" },
    { heading: "Méthodologie de diagnostic étape par étape", content: "Pour détecter la cannibalisation de façon systématique, suivez ces 4 étapes.", tips: ["Étape 1 — Regroupez par profil : classez tous vos vins par type, style, région et gamme de prix.", "Étape 2 — Cherchez les clusters : identifiez les groupes avec 2+ vins du même type + style + gamme de prix (±20%).", "Étape 3 — Comparez la performance au sein du cluster : pour chaque cluster, vérifiez lequel vend le plus, lequel a la meilleure marge et lequel tourne le moins.", "Étape 4 — Validez avec l'équipe : demandez au personnel s'il peut expliquer la différence entre les vins du cluster."], icon: "list" },
    { heading: "Comment décider quelle référence reste et laquelle sort", content: "Quand vous confirmez la cannibalisation, vous devez décider quel vin garder. Ce n'est pas qu'une question de ventes. Utilisez ces 5 critères pondérés.\n\n1. Performance commerciale (30%).\n2. Marge brute (25%).\n3. Différenciation (20%).\n4. Disponibilité (15%).\n5. Narrative (10%).", tips: ["N'éliminez pas toujours celui qui vend le moins. Parfois il a une meilleure marge ou plus de potentiel.", "Si deux vins ont le même score, gardez celui avec la meilleure histoire.", "Quand vous retirez un vin, liquidez-le en événements, menus dégustation ou comme verre spécial."], icon: "check" },
    { heading: "Cas typiques de cannibalisation", content: "Voici les patterns de cannibalisation les plus courants dans les restaurants réels.", tips: ["Bordeaux vs Bordeaux : 3 Bordeaux Supérieur entre 22€ et 28€. Solution : gardez-en 1 et introduisez un Cahors ou Madiran comme alternative.", "Muscadet vs Muscadet : 2 Muscadet entre 14€ et 17€. Solution : gardez-en 1 et ajoutez un Chablis ou Sancerre.", "Verre vs verre : 2 rouges jeunes au verre à 4€ et 4,50€. Solution : gardez 1 rouge jeune et remplacez l'autre par un profil différent.", "Entrée vs entrée : 3 vins entre 12€ et 15€ en concurrence comme 'le moins cher'. Solution : gardez-en 2 max."], icon: "lightbulb" },
    { heading: "Checklist anti-cannibalisation", content: "Avant de finaliser votre carte (ou à chaque révision mensuelle), passez cette checklist.", tips: ["✓ Pas plus de 2 vins du même type + style + région dans la même gamme de prix (±20%).", "✓ Le personnel peut expliquer la différence entre chaque paire de vins similaires en 15 secondes.", "✓ Chaque référence a une 'raison de carte' : pourquoi elle est là et ce qu'elle apporte d'unique.", "✓ Aucun cluster de risque n'a de référence avec moins de 3 ventes mensuelles.", "✓ À l'ajout d'une nouvelle référence, vous vérifiez qu'elle ne cannibalise pas une existante.", "✓ Chaque gamme de prix a de la diversité de styles."], icon: "list" },
  ],
  faqs: [
    { q: "Avoir 2 vins similaires est-il toujours problématique ?", a: "Pas toujours. En gastronomie avec une clientèle experte, proposer 2 Bordeaux de producteurs différents peut avoir du sens. Mais dans les restaurants avec 20-40 références, la redondance est généralement un problème." },
    { q: "Comment détecter la cannibalisation entre verre et bouteille ?", a: "Si le même vin est disponible au verre et en bouteille, ce n'est pas de la cannibalisation. Le problème survient quand vous avez 2 rouges jeunes au verre qui se partagent les ventes." },
    { q: "À quelle fréquence vérifier la cannibalisation ?", a: "À chaque révision mensuelle. C'est un contrôle rapide : examinez vos clusters de risque et vérifiez qu'il n'y a pas de références redondantes." },
    { q: "Winerim détecte-t-il la cannibalisation automatiquement ?", a: "Oui. Winerim identifie les clusters de vins similaires et vous alerte quand il détecte des patterns de cannibalisation basés sur la performance réelle." },
  ],
  relatedTools: [
    { label: "Analyseur de carte", url: "/wine-list-analyzer" },
    { label: "Calculateur de stock mort", url: "/fr/outils/calculateur-stock-mort" },
  ],
  relatedGuides: [
    { label: "Détecter les vins morts", url: "/fr/guides/comment-detecter-vins-morts" },
    { label: "Décider l'assortiment selon le ticket moyen", url: "/fr/guides/comment-decider-assortiment-ticket-moyen" },
    { label: "Améliorer la rotation des vins", url: "/fr/guides/comment-ameliorer-rotation-vins" },
  ],
  ctaPrimaryText: "Analyser ma carte", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Demander une démo", ctaSecondaryUrl: "/fr/demo",
  ctaFinalTitle: "Winerim détecte la cannibalisation avant qu'elle ne vous coûte de l'argent",
  ctaFinalDescription: "Analyse automatique des clusters, alertes de redondance et recommandations de substitution basées sur la performance réelle.",
};

const de: GuidePageData = {
  slug: "de/ratgeber/wein-kannibalisierung-auf-der-karte-erkennen",
  metaTitle: "Wie Sie Kannibalisierung zwischen Weinen Ihrer Karte erkennen | Winerim",
  metaDescription: "Ratgeber zum Identifizieren und Lösen von Kannibalisierung zwischen Referenzen Ihrer Weinkarte: Diagnose, Methodik, Entscheidungen und Optimierungs-Framework.",
  heroTitle: "Wie Sie Kannibalisierung zwischen Weinen Ihrer Karte erkennen",
  heroSubtitle: "Wenn Sie 3 Spätburgunder im selben Preissegment haben, konkurrieren sie nicht mit dem Wettbewerb. Sie konkurrieren untereinander. Kannibalisierung ist das unsichtbare Problem, das die meisten Weinkarten haben und das am wenigsten Restaurants diagnostizieren.",
  heroBadge: "Analytischer Ratgeber",
  breadcrumbParent: { label: "Ratgeber", href: "/de/ratgeber" },
  tableOfContents: [
    "Was ist Kannibalisierung und warum ist sie wichtig",
    "Anzeichen, dass Ihre Karte Kannibalisierung aufweist",
    "Schritt-für-Schritt-Diagnosemethodik",
    "Wie Sie entscheiden, welche Referenz bleibt und welche geht",
    "Typische Kannibalisierungsfälle",
    "Checkliste gegen Kannibalisierung",
  ],
  sections: [
    { heading: "Was ist Kannibalisierung und warum ist sie wichtig", content: "Kannibalisierung tritt auf, wenn zwei oder mehr Weine Ihrer Karte um denselben Gast, im selben Moment, ohne klare Differenzierung konkurrieren. Das Ergebnis: Die Verkäufe verteilen sich auf ähnliche Referenzen statt sich zu konzentrieren, keine rotiert ausreichend und der Bestand vervielfacht sich unnötig.\n\nKannibalisierung bedeutet nicht, ähnliche Weine zu haben. Sie bedeutet, ähnliche Weine ohne strategischen Grund zu haben.\n\nDirekte Auswirkungen:\n• Kapital gebunden in redundanten Referenzen.\n• Geringere durchschnittliche Rotation jeder betroffenen Referenz.\n• Höheres Risiko von Totbestand.\n• Das Serviceteam weiß nicht, welchen zu empfehlen.\n• Der Gast erstarrt vor Optionen, die er nicht unterscheiden kann.", tips: ["Zwei Riesling Kabinett zu 16 € und 18 € sind keine Vielfalt — das ist Verwirrung. Der Gast wählt fast immer den zu 16 €.", "Kannibalisierung kostet echtes Geld: gebundenes Kapital in redundantem Bestand und verlorene Verkaufsgelegenheiten.", "Ein durchschnittliches Restaurant hat zwischen 15 % und 25 % Redundanz auf der Karte, ohne es zu wissen."], icon: "alert" },
    { heading: "Anzeichen, dass Ihre Karte Kannibalisierung aufweist", content: "Bevor Sie eine formale Analyse durchführen, achten Sie auf diese schnellen Signale.", tips: ["Zwei oder mehr Weine desselben Stils, derselben Region und Preisklasse (±20 %). Das klarste Signal.", "Eine Referenz verkauft sich gut und eine ähnliche bewegt sich kaum. Die erste 'stiehlt' Verkäufe der zweiten.", "Das Serviceteam empfiehlt immer denselben Wein, wenn 2–3 ähnliche Optionen bestehen. Die anderen sind unsichtbar.", "Sie haben angesammelten Bestand eines Weins, der sich 'eigentlich verkaufen sollte'. Ein anderer ähnlicher Wein kannibalisiert ihn wahrscheinlich.", "Wenn Sie das Team nach dem Unterschied zwischen zwei Weinen fragen, können sie ihn nicht erklären. Wenn sie ihn nicht sehen, sieht ihn auch der Gast nicht."], icon: "alert" },
    { heading: "Schritt-für-Schritt-Diagnosemethodik", content: "Um Kannibalisierung systematisch zu erkennen, folgen Sie diesen 4 Schritten.", tips: ["Schritt 1 — Nach Profil gruppieren: klassifizieren Sie alle Weine nach Typ (Weißwein, Rotwein, Roséwein), Stil (jung, im Holzfass ausgebaut, Reserve), Region und Preisklasse.", "Schritt 2 — Cluster suchen: identifizieren Sie Gruppen mit 2+ Weinen desselben Typs + Stils + Preisklasse (±20 %). Das sind Ihre Risikocluster.", "Schritt 3 — Leistung innerhalb des Clusters vergleichen: für jedes Cluster prüfen Sie, welcher sich am meisten verkauft, welcher die bessere Marge hat und welcher am schlechtesten rotiert.", "Schritt 4 — Mit dem Team validieren: fragen Sie das Serviceteam, ob es den Unterschied zwischen den Weinen des Clusters erklären kann. Wenn nicht, ist die Kannibalisierung bestätigt."], icon: "list" },
    { heading: "Wie Sie entscheiden, welche Referenz bleibt und welche geht", content: "Wenn Sie Kannibalisierung bestätigen, müssen Sie entscheiden, welchen Wein Sie behalten. Es geht nicht nur um Verkäufe. Verwenden Sie diese 5 gewichteten Kriterien.\n\n1. Verkaufsleistung (30 %).\n2. Bruttomarge (25 %).\n3. Differenzierung (20 %).\n4. Verfügbarkeit (15 %).\n5. Narrativ (10 %).", tips: ["Eliminieren Sie nicht immer den mit den geringsten Verkäufen. Manchmal hat er die bessere Marge oder mehr Potenzial mit aktiver Empfehlung.", "Wenn zwei Weine gleich abschneiden, behalten Sie den mit der besseren Geschichte. Narrativ verkauft.", "Wenn Sie einen Wein von der Karte nehmen, werfen Sie ihn nicht weg. Verkaufen Sie ihn bei Events, Degustationsmenüs oder als Sonderglas."], icon: "check" },
    { heading: "Typische Kannibalisierungsfälle", content: "Dies sind die häufigsten Kannibalisierungsmuster in realen Restaurants.", tips: ["Spätburgunder vs Spätburgunder: 3 Spätburgunder zwischen 22 € und 28 €. Lösung: behalten Sie 1 in diesem Bereich und führen Sie einen Lemberger oder Dornfelder als Alternative ein.", "Riesling vs Riesling: 2 Riesling zwischen 14 € und 17 €. Lösung: behalten Sie 1 und fügen Sie einen Grauburgunder oder Silvaner zur Diversifizierung hinzu.", "Glas vs Glas: 2 junge Rotweine im Offenausschank zu 4 € und 4,50 €. Lösung: behalten Sie 1 jungen Rotwein und ersetzen Sie den anderen durch ein anderes Profil.", "Einstieg vs Einstieg: 3 Weine zwischen 12 € und 15 €, die als 'die günstige Option' konkurrieren. Lösung: behalten Sie maximal 2 und stufen Sie den dritten hoch oder ersetzen Sie ihn."], icon: "lightbulb" },
    { heading: "Checkliste gegen Kannibalisierung", content: "Bevor Sie Ihre Karte finalisieren (oder bei jeder monatlichen Überprüfung), arbeiten Sie diese Checkliste durch.", tips: ["✓ Nicht mehr als 2 Weine desselben Typs + Stils + Region in derselben Preisklasse (±20 %).", "✓ Das Serviceteam kann den Unterschied zwischen jedem Paar ähnlicher Weine in 15 Sekunden erklären.", "✓ Jede Referenz hat einen 'Grund auf der Karte': warum sie da ist und was sie Einzigartiges beiträgt.", "✓ Kein Risikocluster hat eine Referenz mit weniger als 3 monatlichen Verkäufen.", "✓ Beim Hinzufügen einer neuen Referenz überprüfen Sie, dass sie keine bestehende kannibalisiert.", "✓ Jede Preisklasse hat Stilvielfalt, nicht Wiederholung desselben Profils."], icon: "list" },
  ],
  faqs: [
    { q: "Sind 2 ähnliche Weine immer ein Problem?", a: "Nicht immer. In der gehobenen Gastronomie mit erfahrener Klientel kann es sinnvoll sein, 2 Spätburgunder verschiedener Erzeuger anzubieten. Aber in Restaurants mit 20–40 Referenzen ist Redundanz meist ein Problem." },
    { q: "Wie erkenne ich Kannibalisierung zwischen Glas und Flasche?", a: "Wenn derselbe Wein als Glas und Flasche verfügbar ist, ist das keine Kannibalisierung (es ist komplementär). Das Problem entsteht, wenn Sie 2 junge Rotweine im Offenausschank haben, die sich die Verkäufe teilen." },
    { q: "Wie oft sollte ich auf Kannibalisierung prüfen?", a: "Bei jeder monatlichen Kartenüberprüfung. Es ist eine schnelle Prüfung: schauen Sie sich Ihre Risikocluster an und verifizieren Sie, dass es keine redundanten Referenzen ohne Leistung gibt." },
    { q: "Erkennt Winerim Kannibalisierung automatisch?", a: "Ja. Winerim identifiziert Cluster ähnlicher Weine auf Ihrer Karte und alarmiert Sie, wenn es Kannibalisierungsmuster auf Basis realer Leistung erkennt." },
  ],
  relatedTools: [
    { label: "Weinkartenanalyse", url: "/wine-list-analyzer" },
    { label: "Rechner für Totbestand", url: "/de/tools/rechner-totbestand" },
  ],
  relatedGuides: [
    { label: "Tote Weine erkennen", url: "/de/ratgeber/tote-weine-erkennen" },
    { label: "Sortiment nach Durchschnittsbon entscheiden", url: "/de/ratgeber/sortiment-nach-durchschnittsbon-entscheiden" },
    { label: "Weinrotation verbessern", url: "/de/ratgeber/weinrotation-verbessern" },
  ],
  ctaPrimaryText: "Meine Karte analysieren", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Demo anfragen", ctaSecondaryUrl: "/de/demo",
  ctaFinalTitle: "Winerim erkennt Kannibalisierung, bevor sie Sie Geld kostet",
  ctaFinalDescription: "Automatische Clusteranalyse, Redundanzwarnungen und Ersatzempfehlungen auf Basis realer Leistung.",
};

const pt: GuidePageData = {
  slug: "pt/guias/como-detetar-canibalizacao-vinhos-carta",
  metaTitle: "Como Detetar Canibalização entre Vinhos da Carta | Winerim",
  metaDescription: "Guia para identificar e resolver a canibalização entre referências da sua carta de vinhos: diagnóstico, metodologia, decisões e framework de otimização.",
  heroTitle: "Como detetar canibalização entre vinhos da carta",
  heroSubtitle: "Se tem 3 Douro tinto de reserva na mesma gama de preço, não estão a competir com a concorrência. Estão a competir entre si. A canibalização é o problema invisível que a maioria das cartas tem e que poucos restaurantes diagnosticam.",
  heroBadge: "Guia analítico",
  breadcrumbParent: { label: "Guias", href: "/pt/guias" },
  tableOfContents: [
    "O que é a canibalização e porque importa",
    "Sinais de que a sua carta tem canibalização",
    "Metodologia de diagnóstico passo a passo",
    "Como decidir qual referência fica e qual sai",
    "Casos típicos de canibalização",
    "Checklist anti-canibalização",
  ],
  sections: [
    { heading: "O que é a canibalização e porque importa", content: "A canibalização ocorre quando dois ou mais vinhos da sua carta competem pelo mesmo cliente, no mesmo momento, sem oferecer uma diferenciação clara. O resultado: as vendas dividem-se entre referências semelhantes em vez de se concentrarem, nenhuma roda o suficiente e o stock multiplica-se desnecessariamente.\n\nA canibalização não é ter vinhos parecidos. É ter vinhos parecidos sem uma razão estratégica.\n\nImpacto direto:\n• Capital imobilizado em referências redundantes.\n• Menor rotação média de cada referência afetada.\n• Maior risco de stock morto.\n• A equipa de sala não sabe qual recomendar.\n• O comensal paralisa perante opções que não consegue diferenciar.", tips: ["Dois Vinho Verde a 16 € e 18 € não é diversidade — é confusão. O cliente escolherá quase sempre o de 16 €.", "A canibalização custa dinheiro real: capital imobilizado em stock redundante e oportunidades de venda perdidas.", "Um restaurante médio tem entre 15 % e 25 % de redundância na carta sem o saber."], icon: "alert" },
    { heading: "Sinais de que a sua carta tem canibalização", content: "Antes de fazer uma análise formal, procure estes sinais rápidos.", tips: ["Dois ou mais vinhos do mesmo estilo, região e gama de preço (±20 %). O sinal mais claro.", "Uma referência vende muito e outra semelhante mal se mexe. A primeira está a 'roubar' vendas à segunda.", "A equipa de sala recomenda sempre o mesmo vinho quando existem 2–3 opções semelhantes. As outras são invisíveis.", "Tem stock acumulado de um vinho que 'deveria vender-se' dado o seu perfil e preço. Outro vinho semelhante está provavelmente a canibalizá-lo.", "Ao perguntar à equipa a diferença entre dois vinhos, não a conseguem explicar. Se eles não a veem, o cliente também não."], icon: "alert" },
    { heading: "Metodologia de diagnóstico passo a passo", content: "Para detetar canibalização de forma sistemática, siga estes 4 passos.", tips: ["Passo 1 — Agrupe por perfil: classifique todos os vinhos por tipo (branco, tinto, rosado), estilo (jovem, estagiado em madeira, reserva), região e gama de preço.", "Passo 2 — Procure clusters: identifique grupos com 2+ vinhos do mesmo tipo + estilo + gama de preço (±20 %). Esses são os seus clusters de risco.", "Passo 3 — Compare o desempenho dentro do cluster: para cada cluster, veja qual vende mais, qual tem melhor margem e qual roda pior.", "Passo 4 — Valide com a equipa: pergunte à equipa de sala se conseguem explicar a diferença entre os vinhos do cluster. Se não conseguirem, a canibalização está confirmada."], icon: "list" },
    { heading: "Como decidir qual referência fica e qual sai", content: "Quando confirma a canibalização, precisa de decidir qual vinho manter. Não é só questão de vendas. Use estes 5 critérios ponderados.\n\n1. Desempenho comercial (30 %).\n2. Margem bruta (25 %).\n3. Diferenciação (20 %).\n4. Disponibilidade (15 %).\n5. Narrativa (10 %).", tips: ["Não elimine sempre o que vende menos. Às vezes tem melhor margem ou mais potencial com recomendação ativa.", "Se dois vinhos pontuam igual, fique com o que tem melhor história para sala. A narrativa vende.", "Ao retirar um vinho da carta, não o deite fora. Liquide-o em eventos, menus de degustação ou como copo especial."], icon: "check" },
    { heading: "Casos típicos de canibalização", content: "Estes são os padrões de canibalização mais comuns em restaurantes reais.", tips: ["Douro vs Douro: 3 Douro tinto reserva entre 22 € e 28 €. Solução: deixe 1 nesta gama e introduza um Alentejo ou Dão como alternativa.", "Vinho Verde vs Vinho Verde: 2 Vinho Verde entre 14 € e 17 €. Solução: mantenha 1 e adicione um Alvarinho monocasta ou um Encruzado para diversificar.", "Copo vs copo: 2 tintos jovens a copo a 4 € e 4,50 €. Solução: deixe 1 tinto jovem e substitua o outro por um perfil diferente.", "Entrada vs entrada: 3 vinhos entre 12 € e 15 € a competir como 'o barato'. Solução: deixe no máximo 2 e suba o terceiro de gama ou substitua-o."], icon: "lightbulb" },
    { heading: "Checklist anti-canibalização", content: "Antes de fechar a carta (ou em cada revisão mensal), passe esta checklist.", tips: ["✓ Não há mais de 2 vinhos do mesmo tipo + estilo + região na mesma gama de preço (±20 %).", "✓ A equipa de sala consegue explicar a diferença entre cada par de vinhos semelhantes em 15 segundos.", "✓ Cada referência tem uma 'razão de carta': porque está lá e o que acrescenta que mais nenhuma acrescenta.", "✓ Nenhum cluster de risco tem referência com menos de 3 vendas mensais.", "✓ Ao incorporar uma referência nova, verifica que não canibaliza uma existente.", "✓ Cada gama de preço tem diversidade de estilos, não repetição do mesmo perfil."], icon: "list" },
  ],
  faqs: [
    { q: "Ter 2 vinhos parecidos é sempre mau?", a: "Nem sempre. No fine dining com clientela experiente, pode fazer sentido oferecer 2 Douro de produtores diferentes. Mas em restaurantes com 20-40 referências, a redundância é habitualmente um problema." },
    { q: "Como deteto canibalização entre copo e garrafa?", a: "Se o mesmo vinho está disponível a copo e garrafa, não é canibalização (é complementar). O problema é quando tem 2 tintos jovens a copo que dividem as vendas." },
    { q: "Com que frequência devo rever a canibalização?", a: "Em cada revisão mensal da carta. É uma verificação rápida: olhe para os seus clusters de risco e confirme que não há referências redundantes sem desempenho." },
    { q: "O Winerim deteta a canibalização automaticamente?", a: "Sim. O Winerim identifica clusters de vinhos semelhantes na sua carta e alerta-o quando deteta padrões de canibalização com base no desempenho real." },
  ],
  relatedTools: [
    { label: "Analisador de carta", url: "/wine-list-analyzer" },
    { label: "Calculadora de stock morto", url: "/pt/ferramentas/calculadora-stock-morto" },
  ],
  relatedGuides: [
    { label: "Detetar vinhos mortos", url: "/pt/guias/como-detetar-vinhos-mortos" },
    { label: "Decidir sortido pelo bilhete médio", url: "/pt/guias/como-decidir-sortido-pelo-bilhete-medio" },
    { label: "Melhorar a rotação de vinhos", url: "/pt/guias/como-melhorar-rotacao-vinhos" },
  ],
  ctaPrimaryText: "Analisar a minha carta", ctaPrimaryUrl: "/wine-list-analyzer",
  ctaSecondaryText: "Solicitar demo", ctaSecondaryUrl: "/pt/demo",
  ctaFinalTitle: "O Winerim deteta canibalização antes que lhe custe dinheiro",
  ctaFinalDescription: "Análise automática de clusters, alertas de redundância e recomendações de substituição com base no desempenho real.",
};

const data: Record<string, GuidePageData> = { es, en, it, fr, de, pt };

const GuiaCanibalizacionVinos = () => <GuideTemplate data={data} />;
export default GuiaCanibalizacionVinos;
