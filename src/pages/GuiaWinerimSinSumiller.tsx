import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-usar-winerim-sin-sumiller",
  metaTitle: "Cómo Usar Winerim Cuando No Hay Sumiller en Sala | Winerim",
  metaDescription: "Guía para restaurantes sin sumiller: cómo Winerim suple la falta de expertise en vino con recomendaciones automáticas, formación integrada y carta inteligente.",
  heroTitle: "Cómo usar Winerim cuando no hay sumiller en sala",
  heroSubtitle: "El 85% de los restaurantes en España no tienen sumiller. Pero eso no significa que no puedan vender vino con criterio. Winerim actúa como tu sumiller digital.",
  heroBadge: "Guía de producto",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: ["El problema real: no es el vino, es la recomendación","Qué tareas de sumiller cubre Winerim","Cómo funciona la recomendación automática","Formación integrada para el equipo de sala","De la carta pasiva a la carta activa","Checklist: lo que necesitas para empezar"],
  sections: [
    { heading: "El problema real: no es el vino, es la recomendación", content: "La mayoría de restaurantes sin sumiller no tienen un problema de producto. El problema es que nadie sabe recomendar esos vinos.\n\nSin recomendación activa, el comensal elige por precio, por familiaridad o por inercia. El resultado: ventas concentradas en 3-4 referencias y ticket medio bajo.", tips: ["En restaurantes sin sumiller, el 60-70% de las ventas se concentran en menos del 20% de las referencias.", "El camarero medio conoce 3-5 vinos de su carta.", "El problema no es formación, sino un sistema que asista en tiempo real."], icon: "lightbulb" },
    { heading: "Qué tareas de sumiller cubre Winerim", content: "Winerim no sustituye al sumiller como figura de sala. Sustituye las tareas operativas y analíticas.\n\nTareas que Winerim automatiza:\n• Selección de carta\n• Recomendación contextual\n• Pricing\n• Formación\n• Análisis\n\nTareas que siguen siendo humanas:\n• La interacción personal\n• La lectura de la mesa\n• El momento de descorchar y servir", tips: ["El equipo no necesita saber de vino. Necesita saber contar una historia de 15 segundos.", "Las fichas incluyen descripción, maridaje ideal y frase de venta recomendada.", "Un camarero nuevo puede recomendar vino con criterio desde su primera semana."], icon: "check" },
    { heading: "Cómo funciona la recomendación automática", content: "Winerim utiliza inteligencia artificial para generar recomendaciones contextuales. Cada sugerencia tiene en cuenta el plato, el perfil del restaurante, las preferencias del comensal y el stock disponible.\n\nFlujo:\n1. El comensal elige un plato.\n2. Winerim sugiere 2-3 vinos.\n3. El camarero presenta la recomendación.\n4. La ficha digital tiene toda la información.", tips: ["Las recomendaciones priorizan vinos con buen margen Y buen stock.", "El algoritmo aprende del comportamiento real de tu restaurante.", "Los restaurantes con recomendación activa venden un 20-30% más de vino por mesa."], icon: "lightbulb" },
    { heading: "Formación integrada para el equipo de sala", content: "Winerim incluye formación continua diseñada para equipos sin background en vino.\n\n• Ficha de producto para cada referencia\n• Quiz rápidos semanales\n• Alertas de 'vino de la semana'\n• Historial de recomendaciones por miembro del equipo", tips: ["15 minutos al día durante 5 días es suficiente para sentirse cómodo.", "La frase de venta recomendada es el recurso más valorado.", "Gamifica: premia al que más copas venda de la referencia destacada."], icon: "check" },
    { heading: "De la carta pasiva a la carta activa", content: "Una carta tradicional es pasiva: el comensal la lee y elige lo seguro. Una carta inteligente es activa: guía, sugiere, educa y convierte.\n\nCarta pasiva: lista de vinos ordenados por tipo/región.\nCarta activa (Winerim): filtros por estilo, maridaje sugerido, descripciones accesibles, etiquetas de 'recomendado', fotos de etiquetas.", tips: ["Los restaurantes que migran de carta pasiva a activa ven un aumento del 18% en ventas de vino.", "La etiqueta 'recomendado por el chef' multiplica por 3 la probabilidad de venta.", "Filtros por precio eliminan la vergüenza de preguntar 'qué hay barato'."], icon: "lightbulb" },
    { heading: "Checklist: lo que necesitas para empezar", content: "Si no tienes sumiller y quieres empezar a vender más vino con Winerim:", tips: ["Paso 1: Sube tu carta actual a Winerim.", "Paso 2: Activa la carta digital y comparte el enlace/QR.", "Paso 3: Comparte las fichas de producto con tu equipo.", "Paso 4: Designa una 'copa de la semana'.", "Paso 5: Revisa el dashboard semanal.", "Paso 6: Ajusta. Cada semana, toma una decisión basada en datos."], icon: "list" },
  ],
  faqs: [
    { q: "¿Winerim sustituye la figura del sumiller?", a: "No sustituye la interacción humana, pero sí automatiza las tareas analíticas y operativas." },
    { q: "¿Mi equipo necesita saber de vino?", a: "No. Las fichas y frases de venta permiten recomendar con confianza desde el primer día." },
    { q: "¿Funciona para restaurantes con pocas referencias?", a: "Sí. Los restaurantes con 15-30 referencias son los que más se benefician." },
    { q: "¿Cuánto cuesta Winerim comparado con un sumiller?", a: "Una fracción de un salario de sumiller. Consulta nuestros planes en la página de precios." },
  ],
  relatedTools: [{ label: "Analizador de carta", url: "/analisis-carta" }, { label: "Generador de maridajes", url: "/wine-pairing-generator" }],
  relatedGuides: [{ label: "Formar al equipo de sala en vino", url: "/guias/como-formar-equipo-sala-para-vender-vino" }, { label: "Vino por copa sin perder margen", url: "/guias/como-implantar-vino-por-copa-sin-perder-margen" }],
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo", ctaSecondaryText: "Analizar mi carta gratis", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Vende más vino sin sumiller. Empieza con Winerim.", ctaFinalDescription: "Recomendaciones automáticas, formación integrada y analítica en tiempo real.",
};

const en: GuidePageData = {
  slug: "en/guides/how-to-use-winerim-without-sommelier",
  metaTitle: "How to Use Winerim When You Don't Have a Sommelier | Winerim",
  metaDescription: "Guide for restaurants without a sommelier: how Winerim fills the expertise gap with automatic recommendations, integrated training and an intelligent wine list.",
  heroTitle: "How to use Winerim when you don't have a sommelier",
  heroSubtitle: "85% of restaurants don't have a sommelier. That doesn't mean they can't sell wine with criteria. Winerim acts as your digital sommelier.",
  heroBadge: "Product guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  tableOfContents: ["The real problem: it's not the wine, it's the recommendation","Which sommelier tasks Winerim covers","How automatic recommendations work","Integrated training for the floor team","From passive list to active list","Checklist: what you need to start"],
  sections: [
    { heading: "The real problem: it's not the wine, it's the recommendation", content: "Most restaurants without a sommelier don't have a product problem. The problem is nobody knows how to recommend those wines.\n\nWithout active recommendation, guests choose by price, familiarity or inertia. The result: sales concentrated in 3-4 references and a low average ticket.", tips: ["In restaurants without a sommelier, 60-70% of sales concentrate in less than 20% of references.", "The average waiter knows 3-5 wines from their list.", "The problem isn't training — it's a system that assists in real time."], icon: "lightbulb" },
    { heading: "Which sommelier tasks Winerim covers", content: "Winerim doesn't replace the sommelier as a dining room figure. It replaces the operational and analytical tasks.\n\nAutomated tasks:\n• List curation\n• Contextual recommendation\n• Pricing\n• Training\n• Analytics\n\nTasks that remain human:\n• Personal guest interaction\n• Reading the table\n• The moment of uncorking and serving", tips: ["The team doesn't need wine knowledge. They need a 15-second story about each glass.", "Product cards include description, ideal pairing and recommended selling phrase.", "A new waiter can recommend wine with criteria from their first week."], icon: "check" },
    { heading: "How automatic recommendations work", content: "Winerim uses AI to generate contextual wine recommendations. Each suggestion considers the dish, restaurant profile, guest preferences and available stock.\n\nFlow:\n1. Guest chooses a dish.\n2. Winerim suggests 2-3 wines.\n3. The waiter presents the recommendation.\n4. The digital card has all the details.", tips: ["Recommendations prioritize wines with good margin AND good stock.", "The algorithm learns from your restaurant's actual behavior.", "Restaurants with active recommendation sell 20-30% more wine per table."], icon: "lightbulb" },
    { heading: "Integrated training for the floor team", content: "Winerim includes continuous training designed for teams without wine background.\n\n• Product card for each reference\n• Weekly quick quizzes\n• 'Wine of the week' alerts\n• Recommendation history by team member", tips: ["15 minutes a day for 5 days is enough to feel confident.", "The recommended selling phrase is the most valued resource.", "Gamify: reward the team member who sells the most glasses of the featured wine."], icon: "check" },
    { heading: "From passive list to active list", content: "A traditional list is passive: the guest reads it and plays safe. A smart list is active: it guides, suggests, educates and converts.\n\nPassive list: wines ordered by type/region.\nActive list (Winerim): style filters, suggested pairings, accessible descriptions, 'recommended' tags, label photos.", tips: ["Restaurants migrating from passive to active see an 18% increase in wine sales.", "The 'chef's recommendation' tag triples the probability of a wine being ordered.", "Price filters eliminate the embarrassment of asking 'what's affordable'."], icon: "lightbulb" },
    { heading: "Checklist: what you need to start", content: "If you don't have a sommelier and want to sell more wine with Winerim:", tips: ["Step 1: Upload your current list to Winerim.", "Step 2: Activate the digital list and share the link/QR.", "Step 3: Share product cards with your team.", "Step 4: Designate a 'glass of the week'.", "Step 5: Review the weekly dashboard.", "Step 6: Adjust. Each week, make one data-driven decision."], icon: "list" },
  ],
  faqs: [
    { q: "Does Winerim replace the sommelier?", a: "It doesn't replace human interaction, but it automates the analytical and operational tasks." },
    { q: "Does my team need wine knowledge?", a: "No. Product cards and selling phrases allow confident recommendations from day one." },
    { q: "Does it work for restaurants with few references?", a: "Yes. Restaurants with 15-30 references benefit the most." },
    { q: "How much does Winerim cost compared to a sommelier?", a: "A fraction of a sommelier's salary. Check our plans on the pricing page." },
  ],
  relatedTools: [{ label: "Wine list analyzer", url: "/en/wine-list-analyzer" }, { label: "Pairing generator", url: "/en/wine-pairing-generator" }],
  relatedGuides: [{ label: "Train your floor team on wine", url: "/en/guides/how-to-train-floor-staff-to-sell-wine" }, { label: "Wine by the glass without losing margin", url: "/en/guides/how-to-implement-wine-by-glass-without-losing-margin" }],
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo", ctaSecondaryText: "Analyze my list for free", ctaSecondaryUrl: "/en/wine-list-analyzer",
  ctaFinalTitle: "Sell more wine without a sommelier. Start with Winerim.", ctaFinalDescription: "Automatic recommendations, integrated training and real-time analytics.",
};

const it: GuidePageData = {
  slug: "it/guide/come-usare-winerim-senza-sommelier",
  metaTitle: "Come Usare Winerim Quando Non Hai un Sommelier | Winerim",
  metaDescription: "Guida per ristoranti senza sommelier: come Winerim supplisce la mancanza di expertise con raccomandazioni automatiche, formazione integrata e carta intelligente.",
  heroTitle: "Come usare Winerim quando non hai un sommelier in sala",
  heroSubtitle: "L'85% dei ristoranti non ha un sommelier. Ma questo non significa che non possano vendere vino con criterio. Winerim agisce come il tuo sommelier digitale.",
  heroBadge: "Guida prodotto",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  tableOfContents: ["Il vero problema: non è il vino, è la raccomandazione","Quali compiti del sommelier copre Winerim","Come funziona la raccomandazione automatica","Formazione integrata per il team di sala","Dalla carta passiva alla carta attiva","Checklist: cosa ti serve per iniziare"],
  sections: [
    { heading: "Il vero problema: non è il vino, è la raccomandazione", content: "La maggior parte dei ristoranti senza sommelier non ha un problema di prodotto. Il problema è che nessuno sa raccomandare quei vini.\n\nSenza raccomandazione attiva, il commensale sceglie per prezzo, familiarità o inerzia.", tips: ["Nei ristoranti senza sommelier, il 60-70% delle vendite si concentra in meno del 20% delle referenze.", "Il cameriere medio conosce 3-5 vini della carta.", "Il problema non è la formazione, ma un sistema che assista in tempo reale."], icon: "lightbulb" },
    { heading: "Quali compiti del sommelier copre Winerim", content: "Winerim non sostituisce il sommelier come figura di sala. Sostituisce i compiti operativi e analitici.\n\nCompiti automatizzati:\n• Selezione della carta\n• Raccomandazione contestuale\n• Pricing\n• Formazione\n• Analytics", tips: ["Il team non deve sapere di vino. Deve saper raccontare una storia di 15 secondi.", "Le schede includono descrizione, abbinamento ideale e frase di vendita.", "Un cameriere nuovo può raccomandare vino con criterio dalla prima settimana."], icon: "check" },
    { heading: "Come funziona la raccomandazione automatica", content: "Winerim usa IA per generare raccomandazioni contestuali. Ogni suggerimento considera il piatto, il profilo del ristorante, le preferenze del commensale e lo stock disponibile.", tips: ["Le raccomandazioni prioritizzano vini con buon margine E buon stock.", "L'algoritmo impara dal comportamento reale del tuo ristorante.", "I ristoranti con raccomandazione attiva vendono il 20-30% in più di vino per tavolo."], icon: "lightbulb" },
    { heading: "Formazione integrata per il team di sala", content: "Winerim include formazione continua per team senza background enologico.\n\n• Scheda prodotto per ogni referenza\n• Quiz rapidi settimanali\n• Alert 'vino della settimana'\n• Storico raccomandazioni per membro del team", tips: ["15 minuti al giorno per 5 giorni bastano per sentirsi sicuri.", "La frase di vendita consigliata è la risorsa più apprezzata.", "Gamifica: premia chi vende più calici della referenza evidenziata."], icon: "check" },
    { heading: "Dalla carta passiva alla carta attiva", content: "Una carta tradizionale è passiva. Una carta intelligente è attiva: guida, suggerisce, educa e converte.\n\nCarta passiva: lista vini per tipo/regione.\nCarta attiva (Winerim): filtri per stile, abbinamenti suggeriti, descrizioni accessibili, etichette 'consigliato'.", tips: ["I ristoranti che migrano da carta passiva ad attiva vedono un aumento del 18% nelle vendite.", "L'etichetta 'consigliato dallo chef' triplica la probabilità di ordine.", "I filtri per prezzo eliminano l'imbarazzo di chiedere 'cosa c'è di economico'."], icon: "lightbulb" },
    { heading: "Checklist: cosa ti serve per iniziare", content: "Se non hai sommelier e vuoi vendere più vino con Winerim:", tips: ["Passo 1: Carica la tua carta attuale su Winerim.", "Passo 2: Attiva la carta digitale e condividi il link/QR.", "Passo 3: Condividi le schede prodotto col team.", "Passo 4: Designa un 'calice della settimana'.", "Passo 5: Controlla la dashboard settimanale.", "Passo 6: Aggiusta. Ogni settimana, prendi una decisione basata sui dati."], icon: "list" },
  ],
  faqs: [
    { q: "Winerim sostituisce il sommelier?", a: "Non sostituisce l'interazione umana, ma automatizza i compiti analitici e operativi." },
    { q: "Il mio team deve sapere di vino?", a: "No. Le schede e le frasi di vendita permettono di raccomandare con sicurezza dal primo giorno." },
    { q: "Funziona per ristoranti con poche referenze?", a: "Sì. I ristoranti con 15-30 referenze sono quelli che ne beneficiano di più." },
    { q: "Quanto costa Winerim rispetto a un sommelier?", a: "Una frazione dello stipendio di un sommelier. Consulta i nostri piani nella pagina prezzi." },
  ],
  relatedTools: [{ label: "Analizzatore carta", url: "/it/analisi-carta" }, { label: "Generatore abbinamenti", url: "/it/generatore-abbinamenti-vino" }],
  relatedGuides: [{ label: "Formare il team di sala sul vino", url: "/it/guide/come-formare-team-sala-vendere-vino" }, { label: "Vino al calice senza perdere margine", url: "/it/guide/come-implementare-vino-calice-senza-perdere-margine" }],
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo", ctaSecondaryText: "Analizza la mia carta gratis", ctaSecondaryUrl: "/it/analisi-carta",
  ctaFinalTitle: "Vendi più vino senza sommelier. Inizia con Winerim.", ctaFinalDescription: "Raccomandazioni automatiche, formazione integrata e analytics in tempo reale.",
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-utiliser-winerim-sans-sommelier",
  metaTitle: "Comment Utiliser Winerim Quand Vous N'avez Pas de Sommelier | Winerim",
  metaDescription: "Guide pour les restaurants sans sommelier : comment Winerim comble le manque d'expertise avec des recommandations automatiques, une formation intégrée et une carte intelligente.",
  heroTitle: "Comment utiliser Winerim quand vous n'avez pas de sommelier",
  heroSubtitle: "85% des restaurants n'ont pas de sommelier. Mais cela ne signifie pas qu'ils ne peuvent pas vendre du vin avec discernement. Winerim agit comme votre sommelier digital.",
  heroBadge: "Guide produit",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  tableOfContents: ["Le vrai problème : ce n'est pas le vin, c'est la recommandation","Quelles tâches de sommelier Winerim couvre","Comment fonctionne la recommandation automatique","Formation intégrée pour l'équipe de salle","De la carte passive à la carte active","Checklist : ce dont vous avez besoin pour commencer"],
  sections: [
    { heading: "Le vrai problème : ce n'est pas le vin, c'est la recommandation", content: "La plupart des restaurants sans sommelier n'ont pas un problème de produit. Le problème est que personne ne sait recommander ces vins.\n\nSans recommandation active, le convive choisit par prix, habitude ou inertie.", tips: ["Dans les restaurants sans sommelier, 60-70% des ventes se concentrent sur moins de 20% des références.", "Le serveur moyen connaît 3-5 vins de sa carte.", "Le problème n'est pas la formation, mais un système qui assiste en temps réel."], icon: "lightbulb" },
    { heading: "Quelles tâches de sommelier Winerim couvre", content: "Winerim ne remplace pas le sommelier en salle. Il remplace les tâches opérationnelles et analytiques.\n\nTâches automatisées :\n• Curation de la carte\n• Recommandation contextuelle\n• Pricing\n• Formation\n• Analytics", tips: ["L'équipe n'a pas besoin de connaissances en vin. Elle a besoin d'une histoire de 15 secondes.", "Les fiches incluent description, accord idéal et phrase de vente recommandée.", "Un nouveau serveur peut recommander du vin avec discernement dès sa première semaine."], icon: "check" },
    { heading: "Comment fonctionne la recommandation automatique", content: "Winerim utilise l'IA pour générer des recommandations contextuelles. Chaque suggestion considère le plat, le profil du restaurant, les préférences du convive et le stock disponible.", tips: ["Les recommandations priorisent les vins avec bonne marge ET bon stock.", "L'algorithme apprend du comportement réel de votre restaurant.", "Les restaurants avec recommandation active vendent 20-30% plus de vin par table."], icon: "lightbulb" },
    { heading: "Formation intégrée pour l'équipe de salle", content: "Winerim inclut une formation continue conçue pour les équipes sans background vin.\n\n• Fiche produit pour chaque référence\n• Quiz rapides hebdomadaires\n• Alertes 'vin de la semaine'\n• Historique des recommandations par membre", tips: ["15 minutes par jour pendant 5 jours suffisent.", "La phrase de vente recommandée est la ressource la plus appréciée.", "Gamifiez : récompensez celui qui vend le plus de verres de la référence mise en avant."], icon: "check" },
    { heading: "De la carte passive à la carte active", content: "Une carte traditionnelle est passive. Une carte intelligente est active : elle guide, suggère, éduque et convertit.\n\nCarte passive : liste de vins par type/région.\nCarte active (Winerim) : filtres par style, accords suggérés, descriptions accessibles, étiquettes 'recommandé'.", tips: ["Les restaurants qui migrent de carte passive à active voient une augmentation de 18% des ventes.", "L'étiquette 'recommandé par le chef' triple la probabilité de commande.", "Les filtres par prix éliminent la gêne de demander 'qu'avez-vous d'abordable'."], icon: "lightbulb" },
    { heading: "Checklist : ce dont vous avez besoin pour commencer", content: "Si vous n'avez pas de sommelier et souhaitez vendre plus de vin avec Winerim :", tips: ["Étape 1 : Téléchargez votre carte actuelle sur Winerim.", "Étape 2 : Activez la carte digitale et partagez le lien/QR.", "Étape 3 : Partagez les fiches produit avec votre équipe.", "Étape 4 : Désignez un 'verre de la semaine'.", "Étape 5 : Consultez le tableau de bord hebdomadaire.", "Étape 6 : Ajustez. Chaque semaine, prenez une décision basée sur les données."], icon: "list" },
  ],
  faqs: [
    { q: "Winerim remplace-t-il le sommelier ?", a: "Il ne remplace pas l'interaction humaine, mais automatise les tâches analytiques et opérationnelles." },
    { q: "Mon équipe doit-elle connaître le vin ?", a: "Non. Les fiches et phrases de vente permettent de recommander avec confiance dès le premier jour." },
    { q: "Fonctionne-t-il pour les restaurants avec peu de références ?", a: "Oui. Les restaurants avec 15-30 références en bénéficient le plus." },
    { q: "Combien coûte Winerim par rapport à un sommelier ?", a: "Une fraction du salaire d'un sommelier. Consultez nos forfaits sur la page tarifs." },
  ],
  relatedTools: [{ label: "Analyseur de carte", url: "/fr/analyse-carte" }, { label: "Générateur d'accords", url: "/fr/generateur-accords-vins" }],
  relatedGuides: [{ label: "Former l'équipe de salle au vin", url: "/fr/guides/comment-former-equipe-salle-vendre-vin" }, { label: "Vin au verre sans perdre de marge", url: "/fr/guides/comment-implementer-vin-verre-sans-perdre-marge" }],
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo", ctaSecondaryText: "Analyser ma carte gratuitement", ctaSecondaryUrl: "/fr/analyse-carte",
  ctaFinalTitle: "Vendez plus de vin sans sommelier. Commencez avec Winerim.", ctaFinalDescription: "Recommandations automatiques, formation intégrée et analytique en temps réel.",
};

const GuiaWinerimSinSumiller = () => <GuideTemplate data={{ es, en, it, fr }} />;
export default GuiaWinerimSinSumiller;
