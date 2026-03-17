import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-fijar-estrategia-rentable-vino-por-copa",
  metaTitle: "Cómo Fijar una Estrategia Rentable de Vino por Copa | Guía",
  metaDescription: "Guía completa para diseñar un programa de vino por copa rentable: selección, pricing, control de merma, rotación y formación del equipo.",
  heroTitle: "Cómo fijar una estrategia rentable de vino por copa",
  heroSubtitle: "El vino por copa es una de las palancas de margen más potentes en restauración. Pero sin estrategia clara, se convierte en una fuente de merma.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta", ctaPrimaryUrl: "/analisis-carta", ctaSecondaryText: "Solicitar demo", ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Automatiza tu programa de vino por copa", ctaFinalDescription: "Winerim gestiona automáticamente selección, pricing y rotación de tu oferta por copa.",
  tableOfContents: ["Por qué el vino por copa es una palanca estratégica","Errores que destruyen la rentabilidad","Cómo diseñar la selección de copas","Pricing por copa: la fórmula","Control de merma","Rotación y estacionalidad"],
  sections: [
    { heading: "1. Por qué el vino por copa es una palanca estratégica", content: "La copa permite experimentar sin compromiso. Reduce la barrera de entrada y aumenta el número de mesas que consumen vino. Los restaurantes con buen programa de copa venden 20-40% más de vino.", tips: ["La copa elimina la barrera de la botella.", "El margen por copa es superior al de la botella.", "Ratio copa/botella objetivo: 30-45% en facturación de vino."], icon: "lightbulb" },
    { heading: "2. Errores que destruyen la rentabilidad de la copa", content: "La mayoría cometen al menos dos de estos errores.", tips: ["Selección estancada: las mismas copas durante meses.", "Pricing copiado de la botella: no es estrategia, es renunciar al margen.", "Merma ignorada: puede llegar al 20-30% sin control.", "Demasiadas copas abiertas sin sistema de preservación.", "Solo tintos por copa.", "El equipo no recomienda."], icon: "alert" },
    { heading: "3. Cómo diseñar la selección de copas", content: "La selección debe cubrir variedad, maridaje y rentabilidad. Entre 6 y 10 referencias:", tips: ["1-2 espumosos.", "2-3 blancos.", "1 rosado.", "2-3 tintos.", "0-1 dulce/generoso.", "Cada copa debe cumplir una función distinta."], icon: "check" },
    { heading: "4. Pricing por copa: la fórmula que funciona", content: "PVP copa = (Coste botella / copas de equilibrio) × margen objetivo. Objetivo: cubrir el coste con las primeras 2-3 copas.", tips: ["Multiplicador efectivo ×3.5 a ×5.", "No uses precios redondos exactos.", "Revisa pricing mensualmente."], icon: "lightbulb" },
    { heading: "5. Control de merma: el coste invisible", content: "La merma tiene tres causas: oxidación, servicio excesivo y producto no vendido.", tips: ["Registra cada apertura.", "Protocolo de conservación: blanco 2-3 días, tinto 3-5 días.", "Mide merma semanalmente.", "Estandariza: 150ml por copa.", "Objetivo de merma: < 10%."], icon: "alert" },
    { heading: "6. Rotación y estacionalidad", content: "60-70% referencias fijas + 30-40% rotativas cada 2-4 semanas.", tips: ["En verano más blancos, rosados y espumosos.", "Usa la rotación para probar nuevos vinos.", "Comunica los cambios al equipo.", "Registra rendimiento de cada copa rotativa."], icon: "check" },
  ],
  faqs: [
    { q: "¿Cuántos vinos por copa debería ofrecer?", a: "Entre 6 y 10. Menos de 4 limita; más de 12 genera merma difícil de controlar." },
    { q: "¿Es rentable sin sistema de preservación?", a: "Sí, limitando a 6-8 copas con protocolo estricto." },
    { q: "¿El vino por copa canibaliza la botella?", a: "No. La copa funciona como puerta de entrada." },
  ],
  relatedTools: [{ label: "Calculadora precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" }, { label: "Calculadora de margen", url: "/calculadora-margen-vino" }],
  relatedGuides: [{ label: "Plantilla estrategia por copa", url: "/recursos/plantilla-estrategia-vinos-por-copa" }, { label: "Benchmark: estrategia por copa", url: "/benchmarks-playbooks/benchmark-estrategia-por-copa" }],
};

const en: GuidePageData = {
  slug: "en/guides/how-to-build-profitable-wine-by-glass-strategy",
  metaTitle: "How to Build a Profitable Wine by the Glass Strategy | Guide",
  metaDescription: "Complete guide to designing a profitable wine-by-the-glass program: selection, pricing, waste control, rotation and team training.",
  heroTitle: "How to build a profitable wine by the glass strategy",
  heroSubtitle: "Wine by the glass is one of the most powerful margin levers in hospitality. But without a clear strategy, it becomes a source of waste.",
  heroBadge: "Strategic guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Analyze my list", ctaPrimaryUrl: "/en/wine-list-analyzer", ctaSecondaryText: "Request demo", ctaSecondaryUrl: "/en/demo",
  ctaFinalTitle: "Automate your wine by the glass program", ctaFinalDescription: "Winerim automatically manages selection, pricing and rotation of your by-the-glass offer.",
  tableOfContents: ["Why wine by the glass is a strategic lever","Mistakes that destroy glass profitability","How to design your glass selection","Glass pricing: the formula","Waste control: the hidden cost","Rotation and seasonality"],
  sections: [
    { heading: "1. Why wine by the glass is a strategic lever", content: "The glass lets guests experiment without commitment. Restaurants with a good glass program sell 20-40% more wine.", tips: ["The glass eliminates the bottle barrier.", "Glass margin exceeds bottle margin.", "Glass/bottle ratio target: 30-45% of wine revenue."], icon: "lightbulb" },
    { heading: "2. Mistakes that destroy glass profitability", content: "Most restaurants make at least two of these mistakes.", tips: ["Stagnant selection: same glasses for months.", "Pricing copied from bottle: not a strategy.", "Ignored waste: can reach 20-30% without control.", "Too many open bottles without preservation.", "Only reds by the glass.", "Staff doesn't recommend."], icon: "alert" },
    { heading: "3. How to design your glass selection", content: "Selection should cover variety, pairing and profitability. Between 6 and 10 references:", tips: ["1-2 sparkling.", "2-3 whites.", "1 rosé.", "2-3 reds.", "0-1 sweet/fortified.", "Each glass must serve a distinct function."], icon: "check" },
    { heading: "4. Glass pricing: the formula that works", content: "Glass price = (Bottle cost / break-even glasses) × margin target. Goal: cover cost with the first 2-3 glasses.", tips: ["Effective multiplier ×3.5 to ×5.", "Avoid exact round prices.", "Review pricing monthly."], icon: "lightbulb" },
    { heading: "5. Waste control: the hidden cost", content: "Waste has three causes: oxidation, over-pouring and unsold product.", tips: ["Log every opening.", "Conservation protocol: white 2-3 days, red 3-5 days.", "Measure waste weekly.", "Standardize: 150ml per glass.", "Waste target: < 10%."], icon: "alert" },
    { heading: "6. Rotation and seasonality", content: "60-70% fixed references + 30-40% rotating every 2-4 weeks.", tips: ["More whites, rosés and sparkling in summer.", "Use rotation to test new wines.", "Communicate changes to the team.", "Track performance of each rotating glass."], icon: "check" },
  ],
  faqs: [
    { q: "How many wines by the glass should I offer?", a: "Between 6 and 10. Fewer than 4 limits guests; more than 12 creates hard-to-control waste." },
    { q: "Is it profitable without a preservation system?", a: "Yes, limiting to 6-8 glasses with a strict protocol." },
    { q: "Does wine by the glass cannibalize bottle sales?", a: "No. The glass works as a gateway." },
  ],
  relatedTools: [{ label: "Glass price calculator", url: "/en/tools/wine-glass-price-calculator" }, { label: "Margin calculator", url: "/en/wine-margin-calculator" }],
  relatedGuides: [{ label: "Glass strategy template", url: "/en/resources/wine-by-glass-strategy-template" }, { label: "Benchmark: glass strategy", url: "/en/benchmarks-playbooks/benchmark-glass-strategy" }],
};

const it: GuidePageData = {
  slug: "it/guide/come-costruire-strategia-vino-al-calice-redditizia",
  metaTitle: "Come Costruire una Strategia Redditizia di Vino al Calice | Guida",
  metaDescription: "Guida completa per progettare un programma di vino al calice redditizio: selezione, pricing, controllo dello spreco, rotazione e formazione del team.",
  heroTitle: "Come costruire una strategia redditizia di vino al calice",
  heroSubtitle: "Il vino al calice è una delle leve di margine più potenti nella ristorazione. Ma senza strategia chiara, diventa una fonte di spreco.",
  heroBadge: "Guida strategica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Analizza la mia carta", ctaPrimaryUrl: "/it/analisi-carta", ctaSecondaryText: "Richiedi demo", ctaSecondaryUrl: "/it/demo",
  ctaFinalTitle: "Automatizza il tuo programma di vino al calice", ctaFinalDescription: "Winerim gestisce automaticamente selezione, pricing e rotazione della tua offerta al calice.",
  tableOfContents: ["Perché il vino al calice è una leva strategica","Errori che distruggono la redditività","Come progettare la selezione dei calici","Pricing al calice: la formula","Controllo dello spreco","Rotazione e stagionalità"],
  sections: [
    { heading: "1. Perché il vino al calice è una leva strategica", content: "Il calice permette di sperimentare senza impegno. I ristoranti con un buon programma al calice vendono il 20-40% in più di vino.", tips: ["Il calice elimina la barriera della bottiglia.", "Il margine al calice supera quello della bottiglia.", "Rapporto calice/bottiglia obiettivo: 30-45%."], icon: "lightbulb" },
    { heading: "2. Errori che distruggono la redditività del calice", content: "La maggior parte commette almeno due di questi errori.", tips: ["Selezione stagnante.", "Pricing copiato dalla bottiglia.", "Spreco ignorato: può arrivare al 20-30%.", "Troppe bottiglie aperte senza sistema di conservazione.", "Solo rossi al calice.", "Il team non raccomanda."], icon: "alert" },
    { heading: "3. Come progettare la selezione dei calici", content: "La selezione deve coprire varietà, abbinamento e redditività. Tra 6 e 10 referenze:", tips: ["1-2 spumanti.", "2-3 bianchi.", "1 rosato.", "2-3 rossi.", "0-1 dolce/liquoroso.", "Ogni calice deve avere una funzione distinta."], icon: "check" },
    { heading: "4. Pricing al calice: la formula che funziona", content: "PVP calice = (Costo bottiglia / calici di pareggio) × obiettivo margine.", tips: ["Moltiplicatore effettivo ×3.5 a ×5.", "Evita prezzi tondi.", "Rivedi il pricing mensilmente."], icon: "lightbulb" },
    { heading: "5. Controllo dello spreco: il costo invisibile", content: "Lo spreco ha tre cause: ossidazione, servizio eccessivo e prodotto invenduto.", tips: ["Registra ogni apertura.", "Protocollo conservazione: bianco 2-3 giorni, rosso 3-5.", "Misura lo spreco settimanalmente.", "Standardizza: 150ml per calice.", "Obiettivo spreco: < 10%."], icon: "alert" },
    { heading: "6. Rotazione e stagionalità", content: "60-70% referenze fisse + 30-40% rotative ogni 2-4 settimane.", tips: ["In estate più bianchi, rosati e spumanti.", "Usa la rotazione per testare nuovi vini.", "Comunica i cambiamenti al team.", "Registra la performance di ogni calice rotativo."], icon: "check" },
  ],
  faqs: [
    { q: "Quanti vini al calice dovrei offrire?", a: "Tra 6 e 10. Meno di 4 limita; più di 12 genera spreco difficile da controllare." },
    { q: "È redditizio senza sistema di conservazione?", a: "Sì, limitando a 6-8 calici con protocollo rigoroso." },
    { q: "Il calice cannibalizza la bottiglia?", a: "No. Il calice funziona come porta d'ingresso." },
  ],
  relatedTools: [{ label: "Calcolatore prezzo calice", url: "/it/strumenti/calcolatore-prezzo-vino-calice" }, { label: "Calcolatore margine", url: "/it/calcolatore-margine-vino" }],
  relatedGuides: [{ label: "Template strategia calice", url: "/it/risorse/template-strategia-vino-calice" }, { label: "Benchmark: strategia calice", url: "/it/benchmarks-playbooks/benchmark-strategia-calice" }],
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-construire-strategie-vin-verre-rentable",
  metaTitle: "Comment Construire une Stratégie Rentable de Vin au Verre | Guide",
  metaDescription: "Guide complet pour concevoir un programme de vin au verre rentable : sélection, pricing, contrôle des pertes, rotation et formation de l'équipe.",
  heroTitle: "Comment construire une stratégie rentable de vin au verre",
  heroSubtitle: "Le vin au verre est l'un des leviers de marge les plus puissants en restauration. Mais sans stratégie claire, il devient une source de pertes.",
  heroBadge: "Guide stratégique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Analyser ma carte", ctaPrimaryUrl: "/fr/analyse-carte", ctaSecondaryText: "Demander une démo", ctaSecondaryUrl: "/fr/demo",
  ctaFinalTitle: "Automatisez votre programme de vin au verre", ctaFinalDescription: "Winerim gère automatiquement la sélection, le pricing et la rotation de votre offre au verre.",
  tableOfContents: ["Pourquoi le vin au verre est un levier stratégique","Erreurs qui détruisent la rentabilité","Comment concevoir la sélection de verres","Pricing au verre : la formule","Contrôle des pertes","Rotation et saisonnalité"],
  sections: [
    { heading: "1. Pourquoi le vin au verre est un levier stratégique", content: "Le verre permet d'expérimenter sans engagement. Les restaurants avec un bon programme au verre vendent 20-40% plus de vin.", tips: ["Le verre élimine la barrière de la bouteille.", "La marge au verre dépasse celle de la bouteille.", "Ratio verre/bouteille cible : 30-45%."], icon: "lightbulb" },
    { heading: "2. Erreurs qui détruisent la rentabilité du verre", content: "La plupart commettent au moins deux de ces erreurs.", tips: ["Sélection stagnante.", "Pricing copié de la bouteille.", "Pertes ignorées : peuvent atteindre 20-30%.", "Trop de bouteilles ouvertes sans système de préservation.", "Que des rouges au verre.", "L'équipe ne recommande pas."], icon: "alert" },
    { heading: "3. Comment concevoir la sélection de verres", content: "La sélection doit couvrir variété, accords et rentabilité. Entre 6 et 10 références :", tips: ["1-2 effervescents.", "2-3 blancs.", "1 rosé.", "2-3 rouges.", "0-1 doux/muté.", "Chaque verre doit remplir une fonction distincte."], icon: "check" },
    { heading: "4. Pricing au verre : la formule qui fonctionne", content: "PVC verre = (Coût bouteille / verres d'équilibre) × objectif de marge.", tips: ["Multiplicateur effectif ×3,5 à ×5.", "Évitez les prix ronds.", "Révisez le pricing mensuellement."], icon: "lightbulb" },
    { heading: "5. Contrôle des pertes : le coût invisible", content: "Les pertes ont trois causes : oxydation, service excessif et produit invendu.", tips: ["Enregistrez chaque ouverture.", "Protocole de conservation : blanc 2-3 jours, rouge 3-5.", "Mesurez les pertes chaque semaine.", "Standardisez : 150ml par verre.", "Objectif pertes : < 10%."], icon: "alert" },
    { heading: "6. Rotation et saisonnalité", content: "60-70% références fixes + 30-40% rotatives toutes les 2-4 semaines.", tips: ["En été, plus de blancs, rosés et effervescents.", "Utilisez la rotation pour tester de nouveaux vins.", "Communiquez les changements à l'équipe.", "Suivez la performance de chaque verre rotatif."], icon: "check" },
  ],
  faqs: [
    { q: "Combien de vins au verre proposer ?", a: "Entre 6 et 10. Moins de 4 limite ; plus de 12 crée des pertes difficiles à contrôler." },
    { q: "Est-ce rentable sans système de préservation ?", a: "Oui, en limitant à 6-8 verres avec un protocole strict." },
    { q: "Le vin au verre cannibalise-t-il la bouteille ?", a: "Non. Le verre fonctionne comme porte d'entrée." },
  ],
  relatedTools: [{ label: "Calculateur prix au verre", url: "/fr/outils/calculateur-prix-vin-verre" }, { label: "Calculateur de marge", url: "/fr/calculateur-marge-vin" }],
  relatedGuides: [{ label: "Template stratégie verre", url: "/fr/ressources/template-strategie-vin-verre" }, { label: "Benchmark : stratégie verre", url: "/fr/benchmarks-playbooks/benchmark-strategie-verre" }],
};

const GuiaEstrategiaVinoPorCopa = () => <GuideTemplate data={{ es, en, it, fr }} />;
export default GuiaEstrategiaVinoPorCopa;
