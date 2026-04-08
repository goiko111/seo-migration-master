import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-formar-equipo-sala-para-vender-vino",
  metaTitle: "Cómo Formar al Equipo de Sala para Vender Vino sin Ser Sumiller | Guía",
  metaDescription: "Guía práctica para formar a tu equipo de sala en vino sin necesidad de ser sumiller.",
  heroTitle: "Cómo formar al equipo de sala para vender vino sin ser sumiller",
  heroSubtitle: "Tu equipo no necesita ser experto en vino. Necesita saber lo suficiente para recomendar con confianza, resolver dudas del cliente y convertir cada mesa en una oportunidad de venta.",
  heroBadge: "Guía formativa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Equipa a tu equipo con Winerim",
  ctaFinalDescription: "Winerim genera fichas de vino, guías de maridaje y recomendaciones automáticas para tu equipo de sala.",
  tableOfContents: ["Por qué la formación en vino impacta en ventas", "Qué necesita saber tu equipo (y qué no)", "Las 5 técnicas de recomendación", "Cómo crear fichas de vino que se memorizan", "Plan de formación en 2 semanas", "Mantener la formación con alta rotación de personal"],
  sections: [
    { heading: "1. Por qué la formación en vino impacta directamente en ventas", content: "La ecuación es simple: cuando el equipo sabe recomendar vino, más mesas piden vino.\n\nRestaurantes que invierten en formación básica reportan incrementos del 15-30% en ventas de vino.", tips: ["El 60-70% de las decisiones de vino están influidas por la recomendación del equipo", "No necesitas sumilleres — necesitas camareros que sepan 3-5 vinos de confianza", "La formación no es un evento puntual — es un proceso continuo", "El retorno es inmediato: el primer servicio después de una sesión ya genera más recomendaciones"], icon: "lightbulb" },
    { heading: "2. Qué necesita saber tu equipo (y qué no)", content: "El error más común es intentar convertir a los camareros en sumilleres.", tips: ["SÍ: Conocer 3-5 vinos de confianza y describirlos en 2 frases", "SÍ: Saber con qué platos va bien cada vino", "SÍ: Tener frases preparadas para ofrecer vino de forma natural", "SÍ: Saber responder a objeciones habituales", "NO: Conocer denominaciones de origen ni regiones vinícolas del mundo", "NO: Explicar técnicas de vinificación ni perfiles aromáticos complejos", "La regla de oro: si no puede explicar un vino en 10 segundos, necesita una ficha más simple"], icon: "check" },
    { heading: "3. Las 5 técnicas de recomendación que funcionan", content: "Recomendar vino no es vender — es guiar la elección del cliente.", tips: ["Técnica 1 — La copa como puerta de entrada: '¿Les apetece una copa de nuestro Verdejo?'", "Técnica 2 — El maridaje directo: 'Con el chuletón, les recomiendo el Crianza de Ribera'", "Técnica 3 — La recomendación del chef: 'El chef lo ha probado con este vino'", "Técnica 4 — La pregunta abierta: '¿Prefieren algo más fresco o algo con más cuerpo?'", "Técnica 5 — El upgrade sutil: 'Si les ha gustado la copa, tienen la botella que sale muy bien'"], icon: "lightbulb" },
    { heading: "4. Cómo crear fichas de vino que se memorizan", content: "La ficha para sala es un documento de 30 segundos de lectura con lo esencial para recomendar.", tips: ["Nombre del vino tal como aparece en la carta", "En 3 palabras: 'fresco, afrutado, fácil'", "Va perfecto con: 2-3 platos concretos del menú", "La frase de venta: 'Es nuestro blanco más refrescante, ideal para empezar'", "Precio: copa y botella, bien visible", "Formato visual: tarjeta de bolsillo, máximo 6-8 fichas activas"], icon: "list" },
    { heading: "5. Plan de formación en 2 semanas", content: "Sesiones de 30 minutos antes del servicio, 2 veces por semana.", tips: ["Sesión 1 — Los 5 vinos de confianza: probar, describir en 3 palabras, practicar la frase de venta", "Sesión 2 — Maridaje práctico: 3 combinaciones vino+plato", "Sesión 3 — Técnicas de recomendación: role-play con escenarios reales", "Sesión 4 — Simulación de servicio: recomendar vino al menos una vez por mesa", "Después: sesiones de refresco de 10 min cada vez que cambie la carta", "Medición: comparar ventas de vino antes y después"], icon: "check" },
    { heading: "6. Cómo mantener la formación con alta rotación de personal", content: "Necesitas un sistema que funcione independientemente de quién esté en el equipo.", tips: ["Material autoformativo en el office", "Formación de onboarding de 45 minutos", "Buddy system para los primeros 2 semanas", "Reuniones pre-servicio de 5 minutos", "Winerim genera fichas actualizadas automáticamente", "No depender de la memoria: poder consultar las fichas en cualquier momento"], icon: "lightbulb" },
  ],
  faqs: [
    { q: "¿Cuánto tiempo lleva formar a un equipo en vino?", a: "Con un programa estructurado, 2 semanas (4 sesiones de 30 min). La formación continua se mantiene con sesiones de 5-10 min." },
    { q: "¿Qué pasa si mi equipo no tiene interés en el vino?", a: "No necesitan tener interés — necesitan herramientas. Un guión de recomendación bien hecho permite vender vino sin ser apasionado." },
    { q: "¿Es mejor contratar un sumiller o formar al equipo?", a: "Para la mayoría de restaurantes, formar al equipo es más efectivo y sostenible." },
    { q: "¿Cómo mido si la formación funciona?", a: "Compara el ticket medio en vino, el ratio de mesas que piden vino y el ratio copa/botella." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/herramientas/wine-list-score" }, { label: "Generador de maridajes", url: "/wine-pairing-generator" }],
  relatedGuides: [{ label: "Plantilla de formación exprés", url: "/recursos/plantilla-formacion-equipo-sala" }, { label: "Playbook: vender más vino en sala", url: "/benchmarks-playbooks/playbook-vender-mas-vino" }],
};

const en: GuidePageData = {
  slug: "guides/how-to-train-floor-staff-to-sell-wine",
  metaTitle: "How to Train Floor Staff to Sell Wine Without Being a Sommelier | Guide",
  metaDescription: "Practical guide to train your floor team in wine without needing a sommelier. Recommendation techniques, simplified wine cards and a 2-week training plan.",
  heroTitle: "How to train floor staff to sell wine without being a sommelier",
  heroSubtitle: "Your team doesn't need to be wine experts. They need to know enough to recommend with confidence, answer guest questions and turn every table into a sales opportunity.",
  heroBadge: "Training guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo",
  ctaSecondaryText: "Analyse my list", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Equip your team with Winerim",
  ctaFinalDescription: "Winerim generates wine cards, pairing guides and automatic recommendations for your floor team.",
  tableOfContents: ["Why wine training directly impacts sales", "What your team needs to know (and what not)", "The 5 recommendation techniques that work", "How to create wine cards that stick", "2-week training plan", "Maintaining training with high staff turnover"],
  sections: [
    { heading: "1. Why wine training directly impacts sales", content: "The equation is simple: when the team knows how to recommend wine, more tables order wine.\n\nRestaurants investing in basic wine training report 15-30% increases in wine sales.", tips: ["60-70% of wine decisions are influenced by staff recommendations", "You don't need sommeliers — you need waiters who know 3-5 go-to wines", "Training isn't a one-off event — it's an ongoing process", "ROI is immediate: the first service after a session already generates more recommendations"], icon: "lightbulb" },
    { heading: "2. What your team needs to know (and what not)", content: "The most common mistake is trying to turn waiters into sommeliers.", tips: ["YES: Know 3-5 go-to wines and describe them in 2 sentences", "YES: Know which dishes each wine pairs with", "YES: Have prepared phrases to offer wine naturally", "YES: Know how to handle common objections", "NO: Know the difference between appellations or world wine regions", "NO: Explain vinification techniques or complex aroma profiles", "Golden rule: if they can't explain a wine in 10 seconds, they need a simpler card"], icon: "check" },
    { heading: "3. The 5 recommendation techniques that work", content: "Recommending wine isn't selling — it's guiding the guest's choice.", tips: ["Technique 1 — Glass as a gateway: 'While you look at the menu, fancy a glass of our Sauvignon Blanc?'", "Technique 2 — Direct pairing: 'With the ribeye, I'd recommend our oak-aged red — they go perfectly together'", "Technique 3 — Chef's recommendation: 'The chef tried this with our Malbec and says it's the perfect match'", "Technique 4 — Open question: 'Do you prefer something lighter or something with more body?'", "Technique 5 — Subtle upgrade: 'If you enjoyed the glass, the bottle is excellent value for the table'"], icon: "lightbulb" },
    { heading: "4. How to create wine cards that stick", content: "A floor wine card is a 30-second read with exactly what the waiter needs to recommend.", tips: ["Wine name as it appears on the list", "In 3 words: 'fresh, fruity, easy'", "Perfect with: 2-3 specific dishes from the menu", "The sales phrase: 'It's our most refreshing white, ideal to start'", "Price: glass and bottle, clearly visible", "Format: pocket card, max 6-8 active cards"], icon: "list" },
    { heading: "5. 2-week training plan", content: "30-minute sessions before service, twice a week.", tips: ["Session 1 — The 5 go-to wines: taste, describe in 3 words, practise the sales phrase", "Session 2 — Practical pairing: 3 wine+dish combinations", "Session 3 — Recommendation techniques: role-play with real scenarios", "Session 4 — Service simulation: recommend wine at least once per table", "After: 10-min refresh sessions whenever the list changes", "Measurement: compare wine sales before and after"], icon: "check" },
    { heading: "6. Maintaining training with high staff turnover", content: "You need a system that works regardless of who's on the team.", tips: ["Self-service training materials in the back office", "45-minute onboarding session for new starters", "Buddy system for the first 2 weeks", "5-minute pre-service briefings", "Winerim generates updated cards automatically", "Don't rely on memory: staff should be able to check cards any time"], icon: "lightbulb" },
  ],
  faqs: [
    { q: "How long does it take to train a team in wine?", a: "With a structured programme, 2 weeks (4 × 30-min sessions). Ongoing training is maintained with 5-10 min sessions." },
    { q: "What if my team isn't interested in wine?", a: "They don't need interest — they need tools. A well-crafted recommendation script lets them sell wine without being passionate about it." },
    { q: "Is it better to hire a sommelier or train the team?", a: "For most restaurants, training the team is more effective and sustainable." },
    { q: "How do I measure if training works?", a: "Compare the average wine ticket, the ratio of tables ordering wine and the glass/bottle ratio." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/en/tools/wine-list-score" }, { label: "Pairing generator", url: "/wine-pairing-generator" }],
  relatedGuides: [{ label: "Express staff training template", url: "/en/resources/staff-training-template" }, { label: "Playbook: sell more wine on the floor", url: "/en/benchmarks-playbooks/sell-more-wine" }],
};

const it: GuidePageData = {
  slug: "guide/come-formare-staff-sala-vendere-vino",
  metaTitle: "Come Formare lo Staff di Sala per Vendere Vino senza Essere Sommelier | Guida",
  metaDescription: "Guida pratica per formare il tuo staff di sala sul vino senza essere sommelier. Tecniche di raccomandazione.",
  heroTitle: "Come formare lo staff di sala per vendere vino senza essere sommelier",
  heroSubtitle: "Il tuo team non ha bisogno di essere esperto di vino. Ha bisogno di sapere abbastanza per raccomandare con fiducia e trasformare ogni tavolo in un'opportunità di vendita.",
  heroBadge: "Guida formativa",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo",
  ctaSecondaryText: "Analizza la mia carta", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Equipaggia il tuo team con Winerim",
  ctaFinalDescription: "Winerim genera schede vino, guide agli abbinamenti e raccomandazioni automatiche per il tuo staff di sala.",
  tableOfContents: ["Perché la formazione sul vino impatta sulle vendite", "Cosa deve sapere il tuo team (e cosa no)", "Le 5 tecniche di raccomandazione", "Come creare schede vino memorizzabili", "Piano di formazione in 2 settimane", "Mantenere la formazione con alta rotazione del personale"],
  sections: [
    { heading: "1. Perché la formazione sul vino impatta direttamente sulle vendite", content: "L'equazione è semplice: quando il team sa raccomandare vino, più tavoli ordinano vino.\n\nI ristoranti che investono in formazione base riportano incrementi del 15-30% nelle vendite di vino.", tips: ["Il 60-70% delle decisioni sul vino è influenzato dalla raccomandazione dello staff", "Non servono sommelier — servono camerieri che conoscano 3-5 vini di fiducia", "La formazione non è un evento singolo — è un processo continuo", "Il ritorno è immediato: il primo servizio dopo una sessione genera già più raccomandazioni"], icon: "lightbulb" },
    { heading: "2. Cosa deve sapere il tuo team (e cosa no)", content: "L'errore più comune è cercare di trasformare i camerieri in sommelier.", tips: ["SÌ: Conoscere 3-5 vini di fiducia e descriverli in 2 frasi", "SÌ: Sapere con quali piatti va bene ogni vino", "SÌ: Avere frasi pronte per offrire vino in modo naturale", "SÌ: Sapere rispondere alle obiezioni comuni", "NO: Conoscere le differenze tra denominazioni o regioni vinicole", "NO: Spiegare tecniche di vinificazione o profili aromatici complessi", "Regola d'oro: se non riesce a spiegare un vino in 10 secondi, serve una scheda più semplice"], icon: "check" },
    { heading: "3. Le 5 tecniche di raccomandazione che funzionano", content: "Raccomandare vino non è vendere — è guidare la scelta del cliente.", tips: ["Tecnica 1 — Il calice come porta d'ingresso: 'Mentre guardate il menu, vi va un calice del nostro Vermentino?'", "Tecnica 2 — L'abbinamento diretto: 'Con la bistecca, vi consiglio il nostro Chianti Riserva'", "Tecnica 3 — La raccomandazione dello chef: 'Lo chef l'ha provato con questo vino'", "Tecnica 4 — La domanda aperta: 'Preferite qualcosa di più fresco o qualcosa con più corpo?'", "Tecnica 5 — L'upgrade sottile: 'Se vi è piaciuto il calice, la bottiglia è un ottimo rapporto per il tavolo'"], icon: "lightbulb" },
    { heading: "4. Come creare schede vino memorizzabili", content: "La scheda per la sala è un documento di 30 secondi con l'essenziale per raccomandare.", tips: ["Nome del vino come appare in carta", "In 3 parole: 'fresco, fruttato, facile'", "Perfetto con: 2-3 piatti specifici del menu", "La frase di vendita: 'È il nostro bianco più rinfrescante, ideale per iniziare'", "Prezzo: calice e bottiglia, ben visibile", "Formato: scheda tascabile, massimo 6-8 schede attive"], icon: "list" },
    { heading: "5. Piano di formazione in 2 settimane", content: "Sessioni di 30 minuti prima del servizio, 2 volte a settimana.", tips: ["Sessione 1 — I 5 vini di fiducia: assaggiare, descrivere in 3 parole, praticare la frase di vendita", "Sessione 2 — Abbinamento pratico: 3 combinazioni vino+piatto", "Sessione 3 — Tecniche di raccomandazione: role-play con scenari reali", "Sessione 4 — Simulazione di servizio: raccomandare vino almeno una volta per tavolo", "Dopo: sessioni di ripasso da 10 min ogni cambio carta", "Misurazione: confrontare vendite vino prima e dopo"], icon: "check" },
    { heading: "6. Mantenere la formazione con alta rotazione del personale", content: "Serve un sistema che funzioni indipendentemente da chi è nel team.", tips: ["Materiale auto-formativo nell'office", "Sessione di onboarding di 45 minuti", "Buddy system per le prime 2 settimane", "Briefing pre-servizio di 5 minuti", "Winerim genera schede aggiornate automaticamente", "Non dipendere dalla memoria: poter consultare le schede in ogni momento"], icon: "lightbulb" },
  ],
  faqs: [
    { q: "Quanto tempo serve per formare un team sul vino?", a: "Con un programma strutturato, 2 settimane (4 sessioni da 30 min). La formazione continua si mantiene con sessioni da 5-10 min." },
    { q: "E se il mio team non è interessato al vino?", a: "Non serve interesse — servono strumenti. Uno script di raccomandazione ben fatto permette di vendere vino senza passione." },
    { q: "Meglio assumere un sommelier o formare il team?", a: "Per la maggior parte dei ristoranti, formare il team è più efficace e sostenibile." },
    { q: "Come misuro se la formazione funziona?", a: "Confronta lo scontrino medio in vino, il rapporto di tavoli che ordinano vino e il rapporto calice/bottiglia." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/it/strumenti/wine-list-score" }, { label: "Generatore abbinamenti", url: "/wine-pairing-generator" }],
  relatedGuides: [{ label: "Modello formazione express", url: "/it/risorse/modello-formazione-sala" }, { label: "Playbook: vendere più vino in sala", url: "/it/benchmarks-playbooks/vendere-piu-vino" }],
};

const fr: GuidePageData = {
  slug: "guides/comment-former-equipe-salle-vendre-vin",
  metaTitle: "Comment Former l'Équipe de Salle pour Vendre du Vin sans Être Sommelier | Guide",
  metaDescription: "Guide pratique pour former votre équipe de salle au vin sans être sommelier. Techniques de recommandation.",
  heroTitle: "Comment former l'équipe de salle pour vendre du vin sans être sommelier",
  heroSubtitle: "Votre équipe n'a pas besoin d'être experte en vin. Elle a besoin d'en savoir assez pour recommander avec confiance et transformer chaque table en opportunité de vente.",
  heroBadge: "Guide formation",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo",
  ctaSecondaryText: "Analyser ma carte", ctaSecondaryUrl: "/wine-list-analyzer",
  ctaFinalTitle: "Équipez votre équipe avec Winerim",
  ctaFinalDescription: "Winerim génère des fiches vin, des guides d'accords et des recommandations automatiques pour votre équipe de salle.",
  tableOfContents: ["Pourquoi la formation en vin impacte les ventes", "Ce que votre équipe doit savoir (et ce qu'elle ne doit pas)", "Les 5 techniques de recommandation", "Comment créer des fiches vin mémorisables", "Plan de formation en 2 semaines", "Maintenir la formation avec une forte rotation du personnel"],
  sections: [
    { heading: "1. Pourquoi la formation en vin impacte directement les ventes", content: "L'équation est simple : quand l'équipe sait recommander du vin, plus de tables en commandent.\n\nLes restaurants qui investissent dans la formation de base rapportent des augmentations de 15-30% des ventes de vin.", tips: ["60-70% des décisions de vin sont influencées par la recommandation du personnel", "Pas besoin de sommeliers — des serveurs qui connaissent 3-5 vins de confiance suffisent", "La formation n'est pas un événement ponctuel — c'est un processus continu", "Le retour est immédiat : le premier service après une session génère déjà plus de recommandations"], icon: "lightbulb" },
    { heading: "2. Ce que votre équipe doit savoir (et ce qu'elle ne doit pas)", content: "L'erreur la plus courante est d'essayer de transformer les serveurs en sommeliers.", tips: ["OUI : Connaître 3-5 vins de confiance et les décrire en 2 phrases", "OUI : Savoir avec quels plats chaque vin s'accorde", "OUI : Avoir des phrases préparées pour proposer du vin naturellement", "OUI : Savoir répondre aux objections courantes", "NON : Connaître les différences entre appellations ou régions viticoles", "NON : Expliquer les techniques de vinification ou les profils aromatiques complexes", "Règle d'or : s'ils ne peuvent pas expliquer un vin en 10 secondes, il leur faut une fiche plus simple"], icon: "check" },
    { heading: "3. Les 5 techniques de recommandation qui fonctionnent", content: "Recommander du vin, ce n'est pas vendre — c'est guider le choix du client.", tips: ["Technique 1 — Le verre comme porte d'entrée : 'En attendant de choisir, un verre de notre Sancerre ?'", "Technique 2 — L'accord direct : 'Avec l'entrecôte, je vous recommande notre Côtes du Rhône'", "Technique 3 — La recommandation du chef : 'Le chef l'a essayé avec ce vin et dit que c'est l'accord parfait'", "Technique 4 — La question ouverte : 'Vous préférez quelque chose de plus frais ou quelque chose de plus corsé ?'", "Technique 5 — L'upgrade subtil : 'Si le verre vous a plu, la bouteille est un excellent rapport pour la table'"], icon: "lightbulb" },
    { heading: "4. Comment créer des fiches vin mémorisables", content: "La fiche de salle est un document de 30 secondes avec l'essentiel pour recommander.", tips: ["Nom du vin tel qu'il apparaît sur la carte", "En 3 mots : 'frais, fruité, facile'", "Parfait avec : 2-3 plats précis du menu", "La phrase de vente : 'C'est notre blanc le plus rafraîchissant, idéal pour commencer'", "Prix : verre et bouteille, bien visible", "Format : fiche de poche, maximum 6-8 fiches actives"], icon: "list" },
    { heading: "5. Plan de formation en 2 semaines", content: "Sessions de 30 minutes avant le service, 2 fois par semaine.", tips: ["Session 1 — Les 5 vins de confiance : déguster, décrire en 3 mots, pratiquer la phrase de vente", "Session 2 — Accord pratique : 3 combinaisons vin+plat", "Session 3 — Techniques de recommandation : jeu de rôle avec scénarios réels", "Session 4 — Simulation de service : recommander du vin au moins une fois par table", "Ensuite : sessions de rappel de 10 min à chaque changement de carte", "Mesure : comparer les ventes de vin avant et après"], icon: "check" },
    { heading: "6. Maintenir la formation avec une forte rotation du personnel", content: "Il faut un système qui fonctionne quel que soit qui est dans l'équipe.", tips: ["Matériel d'auto-formation en office", "Session d'intégration de 45 minutes", "Système de parrainage pour les 2 premières semaines", "Briefing pré-service de 5 minutes", "Winerim génère des fiches mises à jour automatiquement", "Ne pas dépendre de la mémoire : pouvoir consulter les fiches à tout moment"], icon: "lightbulb" },
  ],
  faqs: [
    { q: "Combien de temps faut-il pour former une équipe au vin ?", a: "Avec un programme structuré, 2 semaines (4 sessions de 30 min). La formation continue se maintient avec des sessions de 5-10 min." },
    { q: "Et si mon équipe n'est pas intéressée par le vin ?", a: "Pas besoin d'intérêt — des outils suffisent. Un script de recommandation bien conçu permet de vendre du vin sans passion." },
    { q: "Vaut-il mieux embaucher un sommelier ou former l'équipe ?", a: "Pour la plupart des restaurants, former l'équipe est plus efficace et pérenne." },
    { q: "Comment mesurer si la formation fonctionne ?", a: "Comparez le ticket moyen en vin, le ratio de tables commandant du vin et le ratio verre/bouteille." },
  ],
  relatedTools: [{ label: "Wine List Score", url: "/fr/outils/wine-list-score" }, { label: "Générateur d'accords", url: "/wine-pairing-generator" }],
  relatedGuides: [{ label: "Modèle formation express", url: "/fr/ressources/modele-formation-salle" }, { label: "Playbook : vendre plus de vin en salle", url: "/fr/benchmarks-playbooks/vendre-plus-vin" }],
};

const data: Record<string, GuidePageData> = { es, en, it, fr };

const GuiaFormarEquipoSala = () => <GuideTemplate data={data} />;
export default GuiaFormarEquipoSala;
