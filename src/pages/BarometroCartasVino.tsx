import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Database,
  GlassWater,
  Layers,
  LineChart,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Wine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { CANONICAL_DOMAIN, DEFAULT_OG_IMAGE } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";
import type { I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

const ES_PATH = "/barometro-cartas-vino-2026";

type Copy = {
  seoTitle: string;
  seoDesc: string;
  badge: string;
  h1: string;
  subtitle: string;
  proof: string;
  primaryCta: string;
  secondaryCta: string;
  breadResources: string;
  breadLabel: string;
  methodologyTitle: string;
  methodologySubtitle: string;
  methodology: { title: string; body: string }[];
  metricsTitle: string;
  metricsSubtitle: string;
  metrics: { label: string; body: string }[];
  patternsTitle: string;
  patternsSubtitle: string;
  patterns: { title: string; body: string }[];
  segmentsTitle: string;
  segmentsSubtitle: string;
  segments: { name: string; focus: string; output: string }[];
  nextTitle: string;
  nextSubtitle: string;
  nextItems: string[];
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  linksTitle: string;
  linkAnalysis: string;
  linkBenchmark: string;
  linkPlaybooks: string;
  linkComparisons: string;
  schemaMeasurement: string;
};

const i18n: I18nMap<Copy> = {
  es: {
    seoTitle: "Barómetro Winerim 2026 de Cartas de Vino | Winerim",
    seoDesc: "Informe Winerim sobre cómo rinden las cartas de vino en restauración: metodología, variables medidas, patrones de margen y benchmarks por segmento.",
    badge: "Informe vivo 2026",
    h1: "Barómetro Winerim de cartas de vino",
    subtitle: "Una capa pública de datos agregados y anonimizados para entender dónde pierden margen las cartas, qué oportunidades se repiten y cómo comparar tu restaurante con referencias defendibles.",
    proof: "Basado en análisis de cartas reales, sin publicar nombres de clientes ni datos sensibles.",
    primaryCta: "Analizar mi carta",
    secondaryCta: "Ver benchmark",
    breadResources: "Guías y recursos",
    breadLabel: "Barómetro Winerim",
    methodologyTitle: "Metodología antes que titulares",
    methodologySubtitle: "El objetivo es publicar datos útiles sin convertir cifras parciales en promesas absolutas.",
    methodology: [
      { title: "Datos agregados", body: "El análisis trabaja con cartas, referencias, precios, formatos por copa, estilos, regiones y señales de estructura. Los resultados se agrupan por segmento cuando hay muestra suficiente." },
      { title: "Anonimización", body: "No se publican nombres de restaurantes, hoteles, grupos ni clientes. Los cortes por país, ciudad o vertical necesitan umbrales mínimos antes de salir como benchmark." },
      { title: "Separación de niveles", body: "El Barómetro distingue hechos observados, inferencias operativas e hipótesis comerciales para evitar mezclar datos con opinión." },
      { title: "Actualización continua", body: "La página funciona como informe vivo: primero metodología y patrones, después cortes numéricos por país, vertical y tipo de carta cuando los datos estén consolidados." },
    ],
    metricsTitle: "Qué mide Winerim en una carta",
    metricsSubtitle: "Estas variables conectan biblioteca del vino, análisis de carta, margen y decisiones de compra.",
    metrics: [
      { label: "Número de referencias", body: "Tamaño de carta, profundidad por categoría y complejidad operativa para el equipo de sala." },
      { label: "Rangos de precio", body: "Distribución de botella y copa para detectar huecos, sobreconcentración y escalones de ticket mal cubiertos." },
      { label: "Vino por copa", body: "Peso, rotación esperada, margen, merma potencial y coherencia con platos de alta venta." },
      { label: "Regiones y uvas", body: "Diversidad real frente a repetición, sesgos de proveedor y oportunidades de diferenciación." },
      { label: "Estilos y maridajes", body: "Cobertura de blancos, tintos, espumosos, generosos, dulces y maridajes útiles para sala." },
      { label: "Señales de rotación", body: "Cuando existe dato operativo, se cruzan ventas, stock, margen y referencias paradas." },
    ],
    patternsTitle: "Primeros patrones que buscamos en cada carta",
    patternsSubtitle: "Son señales accionables que aparecen antes incluso de entrar en modelos avanzados.",
    patterns: [
      { title: "Margen invisible", body: "Cartas con precios aparentemente ordenados, pero sin lectura clara de coste, merma, copa y elasticidad por rango." },
      { title: "Carta grande sin función", body: "Muchas referencias no equivalen a mejor experiencia si el equipo no puede explicar, recomendar ni rotar cada bloque." },
      { title: "Vino por copa infrautilizado", body: "El vino por copa suele ser una palanca de ticket y prueba, pero también una fuente de pérdida si no se diseña con rotación y margen." },
      { title: "Canibalización interna", body: "Referencias demasiado parecidas compiten entre sí y esconden huecos en estilos, regiones o precios más útiles." },
      { title: "Biblioteca poco conectada", body: "Cuando la carta no explica uvas, regiones, estilos y maridajes, el comensal y la sala compran con menos confianza." },
      { title: "Decisiones sin ciclo mensual", body: "La carta mejora cuando cada mes se revisan ventas, stock, margen, platos y cambios de temporada." },
    ],
    segmentsTitle: "Próximos cortes publicables",
    segmentsSubtitle: "La expansión de nivel máximo debe ir por segmentos donde Winerim pueda aportar datos propios y comparables.",
    segments: [
      { name: "Restaurantes gastronómicos", focus: "Profundidad, añadas, maridaje y ticket alto.", output: "Benchmark de estructura y margen por rango." },
      { name: "Hoteles", focus: "Room service, banquetes, restaurante y bar.", output: "Benchmark por punto de consumo y stock compartido." },
      { name: "Grupos de restauración", focus: "Consistencia entre locales y compras centralizadas.", output: "Benchmark multilocal y desviaciones por sede." },
      { name: "Restaurantes sin sumiller", focus: "Facilidad de recomendación y formación de sala.", output: "Score de claridad, copa y maridajes." },
    ],
    nextTitle: "Qué datos faltan para llevarlo al máximo nivel",
    nextSubtitle: "Para pasar de informe metodológico a barómetro estadístico fuerte, estos son los campos que más valor aportarían.",
    nextItems: [
      "Carta completa con nombre, origen, estilo, formato, precio botella y precio copa.",
      "Tipo de negocio, país, ciudad, ticket medio y número de locales, siempre anonimizados.",
      "Ventas, rotación, stock y margen por referencia cuando el restaurante pueda compartirlos.",
      "Platos principales o categorías de cocina para conectar carta, maridajes y demanda real.",
      "Periodo de análisis y cambios de carta para separar estacionalidad de decisiones puntuales.",
    ],
    ctaTitle: "Convierte tu carta en un dato comparable",
    ctaDesc: "Envía tu carta y Winerim la analiza contra las mismas variables del Barómetro: margen, estructura, copa, estilos, regiones, maridajes y oportunidades de mejora.",
    ctaPrimary: "Enviar carta para análisis",
    ctaSecondary: "Explorar benchmarks",
    faqTitle: "Preguntas frecuentes sobre el Barómetro",
    faqs: [
      { q: "¿El Barómetro publica datos de clientes?", a: "No. La página está diseñada para trabajar con datos agregados y anonimizados. No se publican nombres, cartas completas ni métricas sensibles de clientes concretos." },
      { q: "¿Las cifras actuales son definitivas?", a: "No. La primera versión prioriza metodología, variables y patrones observables. Las cifras segmentadas deben publicarse solo cuando tengan muestra suficiente y reglas claras de anonimato." },
      { q: "¿Cómo se conecta con la biblioteca del vino?", a: "La biblioteca aporta el lenguaje semántico de uvas, regiones, estilos y maridajes. El Barómetro usa esa estructura para explicar qué falta, qué sobra y qué bloque de la carta puede vender mejor." },
      { q: "¿Puedo comparar mi carta con el Barómetro?", a: "Sí. El flujo recomendado es enviar la carta en el análisis gratuito y usar el benchmark como marco para entender tamaño, precios, copa, estilos y oportunidades." },
    ],
    linksTitle: "Recursos para ampliar el análisis",
    linkAnalysis: "Analizar carta de vinos gratis",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmarks y playbooks",
    linkComparisons: "Comparativas Winerim",
    schemaMeasurement: "Análisis agregado y anonimizado de cartas de vino, estructura de precios, estilos, regiones, vino por copa y señales de rotación.",
  },
  en: {
    seoTitle: "Winerim Wine List Barometer 2026 | Winerim",
    seoDesc: "Winerim report on how restaurant wine lists perform: methodology, measured variables, margin patterns and benchmarks by segment.",
    badge: "Living report 2026",
    h1: "Winerim wine list barometer",
    subtitle: "A public layer of aggregated and anonymised data to understand where wine lists lose margin, which opportunities repeat and how to compare your restaurant with defensible references.",
    proof: "Based on real wine-list analysis, without publishing client names or sensitive data.",
    primaryCta: "Analyse my list",
    secondaryCta: "View benchmark",
    breadResources: "Guides and resources",
    breadLabel: "Winerim Barometer",
    methodologyTitle: "Methodology before headlines",
    methodologySubtitle: "The aim is to publish useful data without turning partial figures into absolute promises.",
    methodology: [
      { title: "Aggregated data", body: "The analysis works with lists, references, prices, by-the-glass formats, styles, regions and structural signals. Results are grouped by segment when sample size is sufficient." },
      { title: "Anonymisation", body: "Restaurant, hotel, group and client names are not published. Country, city or vertical cuts require minimum thresholds before becoming public benchmarks." },
      { title: "Clear levels", body: "The Barometer separates observed facts, operational inferences and commercial hypotheses so data and opinion do not blur together." },
      { title: "Continuous updates", body: "The page works as a living report: first methodology and patterns, then numerical cuts by country, vertical and list type when the data is consolidated." },
    ],
    metricsTitle: "What Winerim measures in a wine list",
    metricsSubtitle: "These variables connect the wine library, wine-list analysis, margin and purchasing decisions.",
    metrics: [
      { label: "Number of references", body: "List size, depth by category and operational complexity for the floor team." },
      { label: "Price ranges", body: "Bottle and glass distribution to detect gaps, overconcentration and missing ticket ladders." },
      { label: "Wine by the glass", body: "Weight, expected rotation, margin, potential waste and fit with high-selling dishes." },
      { label: "Regions and grapes", body: "Real diversity versus repetition, supplier bias and differentiation opportunities." },
      { label: "Styles and pairings", body: "Coverage of whites, reds, sparkling, fortified, sweet wines and useful pairings for service." },
      { label: "Rotation signals", body: "When operational data exists, sales, stock, margin and stalled references are connected." },
    ],
    patternsTitle: "First patterns we look for",
    patternsSubtitle: "Actionable signals that appear before advanced models are even needed.",
    patterns: [
      { title: "Invisible margin", body: "Lists that look orderly but do not clearly connect cost, waste, glass pricing and elasticity by range." },
      { title: "Large list without purpose", body: "More references do not mean a better experience if the team cannot explain, recommend and rotate each block." },
      { title: "Underused by-the-glass", body: "Wine by the glass can lift ticket and discovery, but it can also lose money without rotation and margin rules." },
      { title: "Internal cannibalisation", body: "References that are too similar compete with each other and hide more useful gaps in style, region or price." },
      { title: "Disconnected library", body: "When the list does not explain grapes, regions, styles and pairings, guests and staff buy with less confidence." },
      { title: "No monthly cycle", body: "Wine lists improve when sales, stock, margin, dishes and seasonal changes are reviewed every month." },
    ],
    segmentsTitle: "Next publishable cuts",
    segmentsSubtitle: "Maximum-level expansion should move through segments where Winerim can provide own, comparable data.",
    segments: [
      { name: "Fine dining", focus: "Depth, vintages, pairing and high ticket.", output: "Structure and margin benchmark by range." },
      { name: "Hotels", focus: "Room service, banquets, restaurant and bar.", output: "Benchmark by consumption point and shared stock." },
      { name: "Restaurant groups", focus: "Consistency across locations and centralised purchasing.", output: "Multi-location benchmark and deviations by venue." },
      { name: "No-sommelier restaurants", focus: "Recommendation clarity and staff enablement.", output: "Clarity, glass and pairing score." },
    ],
    nextTitle: "Data needed to take it to the highest level",
    nextSubtitle: "To move from methodological report to strong statistical barometer, these are the most valuable fields.",
    nextItems: [
      "Full list with name, origin, style, format, bottle price and glass price.",
      "Business type, country, city, average ticket and number of venues, always anonymised.",
      "Sales, rotation, stock and margin per reference when the restaurant can share them.",
      "Main dishes or cuisine categories to connect the list, pairings and real demand.",
      "Analysis period and list changes to separate seasonality from one-off decisions.",
    ],
    ctaTitle: "Turn your wine list into comparable data",
    ctaDesc: "Send your list and Winerim analyses it against the same Barometer variables: margin, structure, glass offer, styles, regions, pairings and improvement opportunities.",
    ctaPrimary: "Submit list for analysis",
    ctaSecondary: "Explore benchmarks",
    faqTitle: "Barometer FAQ",
    faqs: [
      { q: "Does the Barometer publish client data?", a: "No. The page is designed for aggregated and anonymised data. It does not publish names, full lists or sensitive metrics from specific clients." },
      { q: "Are the current figures definitive?", a: "No. The first version prioritises methodology, variables and observable patterns. Segmented figures should only be published with enough sample size and clear anonymisation rules." },
      { q: "How does this connect with the wine library?", a: "The library provides the semantic language for grapes, regions, styles and pairings. The Barometer uses that structure to explain what is missing, what is excessive and which parts of the list could sell better." },
      { q: "Can I compare my list with the Barometer?", a: "Yes. The recommended flow is to submit your list for the free analysis and use the benchmark as a framework for size, price, glass offer, styles and opportunities." },
    ],
    linksTitle: "Resources to deepen the analysis",
    linkAnalysis: "Free wine-list analysis",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmarks and playbooks",
    linkComparisons: "Winerim comparisons",
    schemaMeasurement: "Aggregated and anonymised analysis of wine lists, price structure, styles, regions, by-the-glass offer and rotation signals.",
  },
  it: {
    seoTitle: "Barometro Winerim 2026 delle Carte dei Vini | Winerim",
    seoDesc: "Report Winerim su come rendono le carte dei vini nella ristorazione: metodologia, variabili misurate, pattern di margine e benchmark per segmento.",
    badge: "Report vivo 2026",
    h1: "Barometro Winerim delle carte dei vini",
    subtitle: "Un livello pubblico di dati aggregati e anonimizzati per capire dove le carte perdono margine, quali opportunita si ripetono e come confrontare il ristorante con riferimenti difendibili.",
    proof: "Basato su analisi di carte reali, senza pubblicare nomi di clienti o dati sensibili.",
    primaryCta: "Analizza la mia carta",
    secondaryCta: "Vedi benchmark",
    breadResources: "Guide e risorse",
    breadLabel: "Barometro Winerim",
    methodologyTitle: "Metodologia prima dei titoli",
    methodologySubtitle: "L'obiettivo e pubblicare dati utili senza trasformare cifre parziali in promesse assolute.",
    methodology: [
      { title: "Dati aggregati", body: "L'analisi lavora con carte, referenze, prezzi, formato al calice, stili, regioni e segnali di struttura. I risultati vengono raggruppati per segmento quando il campione e sufficiente." },
      { title: "Anonimizzazione", body: "Non si pubblicano nomi di ristoranti, hotel, gruppi o clienti. I tagli per paese, citta o verticale richiedono soglie minime prima di diventare benchmark pubblici." },
      { title: "Livelli separati", body: "Il Barometro distingue fatti osservati, inferenze operative e ipotesi commerciali per non confondere dati e opinione." },
      { title: "Aggiornamento continuo", body: "La pagina funziona come report vivo: prima metodologia e pattern, poi tagli numerici per paese, verticale e tipo di carta quando i dati saranno consolidati." },
    ],
    metricsTitle: "Cosa misura Winerim in una carta",
    metricsSubtitle: "Queste variabili collegano biblioteca del vino, analisi della carta, margine e decisioni di acquisto.",
    metrics: [
      { label: "Numero di referenze", body: "Dimensione della carta, profondita per categoria e complessita operativa per il team di sala." },
      { label: "Fasce di prezzo", body: "Distribuzione di bottiglia e calice per rilevare vuoti, concentrazioni e scalini di ticket mancanti." },
      { label: "Vino al calice", body: "Peso, rotazione attesa, margine, potenziale spreco e coerenza con i piatti piu venduti." },
      { label: "Regioni e vitigni", body: "Diversita reale rispetto a ripetizione, bias del fornitore e opportunita di differenziazione." },
      { label: "Stili e abbinamenti", body: "Copertura di bianchi, rossi, spumanti, fortificati, dolci e abbinamenti utili per il servizio." },
      { label: "Segnali di rotazione", body: "Quando esiste dato operativo, si incrociano vendite, stock, margine e referenze ferme." },
    ],
    patternsTitle: "Primi pattern che cerchiamo",
    patternsSubtitle: "Segnali azionabili che emergono prima ancora dei modelli avanzati.",
    patterns: [
      { title: "Margine invisibile", body: "Carte ordinate in apparenza, ma senza collegamento chiaro tra costo, spreco, calice ed elasticita per fascia." },
      { title: "Carta grande senza funzione", body: "Molte referenze non migliorano l'esperienza se il team non riesce a spiegare, consigliare e ruotare ogni blocco." },
      { title: "Calice sottoutilizzato", body: "Il vino al calice puo aumentare ticket e prova, ma perde margine senza regole di rotazione e prezzo." },
      { title: "Cannibalizzazione interna", body: "Referenze troppo simili competono tra loro e nascondono vuoti piu utili per stile, regione o prezzo." },
      { title: "Biblioteca scollegata", body: "Se la carta non spiega vitigni, regioni, stili e abbinamenti, ospiti e sala comprano con meno fiducia." },
      { title: "Nessun ciclo mensile", body: "La carta migliora quando ogni mese si rivedono vendite, stock, margine, piatti e stagionalita." },
    ],
    segmentsTitle: "Prossimi tagli pubblicabili",
    segmentsSubtitle: "L'espansione di massimo livello deve procedere per segmenti dove Winerim puo offrire dati propri e comparabili.",
    segments: [
      { name: "Ristoranti gastronomici", focus: "Profondita, annate, abbinamento e ticket alto.", output: "Benchmark di struttura e margine per fascia." },
      { name: "Hotel", focus: "Room service, banchetti, ristorante e bar.", output: "Benchmark per punto di consumo e stock condiviso." },
      { name: "Gruppi di ristorazione", focus: "Coerenza tra locali e acquisti centralizzati.", output: "Benchmark multilocale e deviazioni per sede." },
      { name: "Ristoranti senza sommelier", focus: "Chiarezza di raccomandazione e formazione sala.", output: "Score di chiarezza, calice e abbinamenti." },
    ],
    nextTitle: "Dati necessari per il massimo livello",
    nextSubtitle: "Per passare da report metodologico a barometro statistico forte, questi sono i campi piu utili.",
    nextItems: [
      "Carta completa con nome, origine, stile, formato, prezzo bottiglia e prezzo calice.",
      "Tipo di business, paese, citta, ticket medio e numero di locali, sempre anonimizzati.",
      "Vendite, rotazione, stock e margine per referenza quando il ristorante puo condividerli.",
      "Piatti principali o categorie di cucina per collegare carta, abbinamenti e domanda reale.",
      "Periodo di analisi e cambi carta per separare stagionalita e decisioni puntuali.",
    ],
    ctaTitle: "Trasforma la tua carta in dati confrontabili",
    ctaDesc: "Invia la carta e Winerim la analizza sulle stesse variabili del Barometro: margine, struttura, calice, stili, regioni, abbinamenti e opportunita.",
    ctaPrimary: "Invia carta per analisi",
    ctaSecondary: "Esplora benchmark",
    faqTitle: "Domande frequenti sul Barometro",
    faqs: [
      { q: "Il Barometro pubblica dati dei clienti?", a: "No. La pagina e progettata per dati aggregati e anonimizzati. Non pubblica nomi, carte complete o metriche sensibili di clienti specifici." },
      { q: "Le cifre attuali sono definitive?", a: "No. La prima versione privilegia metodologia, variabili e pattern osservabili. I dati segmentati vanno pubblicati solo con campione sufficiente e regole chiare di anonimato." },
      { q: "Come si collega alla biblioteca del vino?", a: "La biblioteca fornisce il linguaggio semantico di vitigni, regioni, stili e abbinamenti. Il Barometro usa questa struttura per spiegare cosa manca, cosa e eccessivo e quali blocchi possono vendere meglio." },
      { q: "Posso confrontare la mia carta con il Barometro?", a: "Si. Il flusso consigliato e inviare la carta all'analisi gratuita e usare il benchmark come quadro per dimensione, prezzo, calice, stili e opportunita." },
    ],
    linksTitle: "Risorse per approfondire l'analisi",
    linkAnalysis: "Analisi gratuita carta vini",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmark e playbook",
    linkComparisons: "Confronti Winerim",
    schemaMeasurement: "Analisi aggregata e anonimizzata di carte dei vini, struttura prezzi, stili, regioni, vino al calice e segnali di rotazione.",
  },
  fr: {
    seoTitle: "Baromètre Winerim 2026 des Cartes des Vins | Winerim",
    seoDesc: "Rapport Winerim sur la performance des cartes des vins en restauration : méthodologie, variables mesurées, marge et benchmarks par segment.",
    badge: "Rapport vivant 2026",
    h1: "Baromètre Winerim des cartes des vins",
    subtitle: "Une couche publique de données agrégées et anonymisées pour comprendre où les cartes perdent de la marge, quelles opportunités se répètent et comment comparer votre restaurant à des références défendables.",
    proof: "Basé sur l'analyse de cartes réelles, sans publier de noms clients ni de données sensibles.",
    primaryCta: "Analyser ma carte",
    secondaryCta: "Voir benchmark",
    breadResources: "Guides et ressources",
    breadLabel: "Baromètre Winerim",
    methodologyTitle: "La méthodologie avant les titres",
    methodologySubtitle: "L'objectif est de publier des données utiles sans transformer des chiffres partiels en promesses absolues.",
    methodology: [
      { title: "Données agrégées", body: "L'analyse travaille avec cartes, références, prix, formats au verre, styles, régions et signaux de structure. Les résultats sont regroupés par segment lorsque l'échantillon est suffisant." },
      { title: "Anonymisation", body: "Les noms de restaurants, hôtels, groupes et clients ne sont pas publiés. Les coupes par pays, ville ou vertical exigent des seuils minimums avant publication." },
      { title: "Niveaux séparés", body: "Le Baromètre distingue faits observés, inférences opérationnelles et hypothèses commerciales pour ne pas mélanger données et opinion." },
      { title: "Mise à jour continue", body: "La page fonctionne comme rapport vivant : d'abord méthodologie et tendances, puis chiffres par pays, vertical et type de carte lorsque les données sont consolidées." },
    ],
    metricsTitle: "Ce que Winerim mesure dans une carte",
    metricsSubtitle: "Ces variables relient bibliothèque du vin, analyse de carte, marge et décisions d'achat.",
    metrics: [
      { label: "Nombre de références", body: "Taille de carte, profondeur par catégorie et complexité opérationnelle pour l'équipe de salle." },
      { label: "Gammes de prix", body: "Distribution bouteille et verre pour détecter trous, surconcentration et paliers de ticket mal couverts." },
      { label: "Vin au verre", body: "Poids, rotation attendue, marge, perte potentielle et cohérence avec les plats les plus vendus." },
      { label: "Régions et cépages", body: "Diversité réelle face à la répétition, biais fournisseur et opportunités de différenciation." },
      { label: "Styles et accords", body: "Couverture blancs, rouges, effervescents, fortifiés, doux et accords utiles pour le service." },
      { label: "Signaux de rotation", body: "Quand la donnée opérationnelle existe, ventes, stock, marge et références dormantes sont croisés." },
    ],
    patternsTitle: "Premiers motifs recherchés",
    patternsSubtitle: "Des signaux actionnables qui apparaissent avant même les modèles avancés.",
    patterns: [
      { title: "Marge invisible", body: "Cartes apparemment ordonnées, mais sans lecture claire du coût, de la perte, du verre et de l'élasticité par gamme." },
      { title: "Grande carte sans fonction", body: "Beaucoup de références n'améliorent pas l'expérience si l'équipe ne peut pas expliquer, recommander et faire tourner chaque bloc." },
      { title: "Vin au verre sous-exploité", body: "Le vin au verre peut augmenter ticket et découverte, mais perd de la marge sans règles de rotation et de prix." },
      { title: "Cannibalisation interne", body: "Des références trop proches se concurrencent et masquent des manques plus utiles en style, région ou prix." },
      { title: "Bibliothèque déconnectée", body: "Si la carte n'explique pas cépages, régions, styles et accords, clients et salle achètent avec moins de confiance." },
      { title: "Pas de cycle mensuel", body: "La carte s'améliore lorsque ventes, stock, marge, plats et saisonnalité sont revus chaque mois." },
    ],
    segmentsTitle: "Prochaines coupes publiables",
    segmentsSubtitle: "L'expansion de niveau maximum doit avancer par segments où Winerim apporte des données propres et comparables.",
    segments: [
      { name: "Restaurants gastronomiques", focus: "Profondeur, millésimes, accords et ticket élevé.", output: "Benchmark de structure et marge par gamme." },
      { name: "Hôtels", focus: "Room service, banquets, restaurant et bar.", output: "Benchmark par point de consommation et stock partagé." },
      { name: "Groupes de restauration", focus: "Cohérence entre sites et achats centralisés.", output: "Benchmark multi-sites et écarts par établissement." },
      { name: "Restaurants sans sommelier", focus: "Clarté de recommandation et formation salle.", output: "Score clarté, verre et accords." },
    ],
    nextTitle: "Données nécessaires pour le niveau maximal",
    nextSubtitle: "Pour passer d'un rapport méthodologique à un baromètre statistique fort, voici les champs les plus utiles.",
    nextItems: [
      "Carte complète avec nom, origine, style, format, prix bouteille et prix verre.",
      "Type d'établissement, pays, ville, ticket moyen et nombre de sites, toujours anonymisés.",
      "Ventes, rotation, stock et marge par référence quand le restaurant peut les partager.",
      "Plats principaux ou catégories de cuisine pour relier carte, accords et demande réelle.",
      "Période d'analyse et changements de carte pour séparer saisonnalité et décisions ponctuelles.",
    ],
    ctaTitle: "Transformez votre carte en donnée comparable",
    ctaDesc: "Envoyez votre carte et Winerim l'analyse avec les mêmes variables que le Baromètre : marge, structure, verre, styles, régions, accords et opportunités.",
    ctaPrimary: "Envoyer la carte",
    ctaSecondary: "Explorer les benchmarks",
    faqTitle: "Questions fréquentes sur le Baromètre",
    faqs: [
      { q: "Le Baromètre publie-t-il des données clients ?", a: "Non. La page est conçue pour des données agrégées et anonymisées. Elle ne publie pas de noms, de cartes complètes ni de métriques sensibles de clients précis." },
      { q: "Les chiffres actuels sont-ils définitifs ?", a: "Non. La première version priorise méthodologie, variables et motifs observables. Les chiffres segmentés doivent attendre un échantillon suffisant et des règles d'anonymat claires." },
      { q: "Quel lien avec la bibliothèque du vin ?", a: "La bibliothèque fournit le langage sémantique des cépages, régions, styles et accords. Le Baromètre utilise cette structure pour expliquer ce qui manque, ce qui est excessif et ce qui peut mieux vendre." },
      { q: "Puis-je comparer ma carte au Baromètre ?", a: "Oui. Le parcours recommandé est d'envoyer la carte pour l'analyse gratuite puis d'utiliser le benchmark comme cadre de lecture : taille, prix, verre, styles et opportunités." },
    ],
    linksTitle: "Ressources pour approfondir l'analyse",
    linkAnalysis: "Analyse gratuite de carte",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmarks et playbooks",
    linkComparisons: "Comparatifs Winerim",
    schemaMeasurement: "Analyse agrégée et anonymisée de cartes des vins, structure de prix, styles, régions, vin au verre et signaux de rotation.",
  },
  de: {
    seoTitle: "Winerim Weinkarten-Barometer 2026 | Winerim",
    seoDesc: "Winerim-Bericht zur Performance von Weinkarten in der Gastronomie: Methodik, gemessene Variablen, Margenmuster und Benchmarks nach Segment.",
    badge: "Live-Bericht 2026",
    h1: "Winerim Weinkarten-Barometer",
    subtitle: "Eine öffentliche Ebene aggregierter und anonymisierter Daten, um zu verstehen, wo Weinkarten Marge verlieren, welche Chancen sich wiederholen und wie ein Restaurant mit belastbaren Referenzen verglichen werden kann.",
    proof: "Basierend auf Analysen realer Weinkarten, ohne Kundennamen oder sensible Daten zu veröffentlichen.",
    primaryCta: "Weinkarte analysieren",
    secondaryCta: "Benchmark ansehen",
    breadResources: "Ratgeber und Ressourcen",
    breadLabel: "Winerim Barometer",
    methodologyTitle: "Methodik vor Schlagzeilen",
    methodologySubtitle: "Ziel ist es, nützliche Daten zu veröffentlichen, ohne Teilzahlen als absolute Versprechen darzustellen.",
    methodology: [
      { title: "Aggregierte Daten", body: "Die Analyse arbeitet mit Karten, Referenzen, Preisen, Glasformaten, Stilen, Regionen und Struktursignalen. Ergebnisse werden nach Segment gruppiert, wenn die Stichprobe ausreicht." },
      { title: "Anonymisierung", body: "Namen von Restaurants, Hotels, Gruppen und Kunden werden nicht veröffentlicht. Länder-, Stadt- oder Vertikalschnitte benötigen Mindestschwellen." },
      { title: "Klare Ebenen", body: "Das Barometer trennt beobachtete Fakten, operative Ableitungen und kommerzielle Hypothesen, damit Daten und Meinung nicht vermischt werden." },
      { title: "Laufende Aktualisierung", body: "Die Seite funktioniert als Live-Bericht: zuerst Methodik und Muster, danach numerische Schnitte nach Land, Vertikal und Kartentyp, wenn die Daten konsolidiert sind." },
    ],
    metricsTitle: "Was Winerim in einer Weinkarte misst",
    metricsSubtitle: "Diese Variablen verbinden Weinbibliothek, Kartenanalyse, Marge und Einkaufsentscheidungen.",
    metrics: [
      { label: "Anzahl der Referenzen", body: "Kartengröße, Tiefe je Kategorie und operative Komplexität für das Serviceteam." },
      { label: "Preisbereiche", body: "Verteilung von Flasche und Glas, um Lücken, Überkonzentration und fehlende Ticketstufen zu erkennen." },
      { label: "Wein im Glas", body: "Gewicht, erwartete Rotation, Marge, potenzieller Verlust und Passung zu stark verkauften Gerichten." },
      { label: "Regionen und Rebsorten", body: "Echte Vielfalt gegenüber Wiederholung, Lieferantenbias und Differenzierungschancen." },
      { label: "Stile und Pairings", body: "Abdeckung von Weiß, Rot, Schaumwein, Likörwein, Süßwein und nützlichen Pairings für den Service." },
      { label: "Rotationssignale", body: "Wenn operative Daten vorliegen, werden Verkauf, Bestand, Marge und stehende Referenzen verbunden." },
    ],
    patternsTitle: "Erste Muster, nach denen wir suchen",
    patternsSubtitle: "Handlungsfähige Signale, die schon vor fortgeschrittenen Modellen sichtbar werden.",
    patterns: [
      { title: "Unsichtbare Marge", body: "Karten, die ordentlich wirken, aber Kosten, Verlust, Glaspreis und Elastizität je Bereich nicht klar verbinden." },
      { title: "Große Karte ohne Funktion", body: "Viele Referenzen verbessern die Erfahrung nicht, wenn das Team sie nicht erklären, empfehlen und rotieren kann." },
      { title: "Untergenutzter Glaswein", body: "Wein im Glas kann Ticket und Entdeckung steigern, verliert aber ohne Rotation und Marge schnell Geld." },
      { title: "Interne Kannibalisierung", body: "Zu ähnliche Referenzen konkurrieren miteinander und verdecken nützlichere Lücken bei Stil, Region oder Preis." },
      { title: "Abgekoppelte Bibliothek", body: "Erklärt die Karte Rebsorten, Regionen, Stile und Pairings nicht, kaufen Gäste und Team mit weniger Sicherheit." },
      { title: "Kein Monatszyklus", body: "Weinkarten verbessern sich, wenn Verkauf, Bestand, Marge, Gerichte und Saison jeden Monat geprüft werden." },
    ],
    segmentsTitle: "Nächste veröffentlichbare Schnitte",
    segmentsSubtitle: "Der Ausbau auf höchstem Niveau sollte über Segmente laufen, in denen Winerim eigene und vergleichbare Daten liefern kann.",
    segments: [
      { name: "Fine Dining", focus: "Tiefe, Jahrgänge, Pairing und hohes Ticket.", output: "Struktur- und Margenbenchmark je Bereich." },
      { name: "Hotels", focus: "Roomservice, Bankett, Restaurant und Bar.", output: "Benchmark nach Konsumpunkt und gemeinsamem Bestand." },
      { name: "Restaurantgruppen", focus: "Konsistenz zwischen Standorten und zentraler Einkauf.", output: "Multi-Standort-Benchmark und Abweichungen je Haus." },
      { name: "Restaurants ohne Sommelier", focus: "Empfehlungsklarheit und Teamschulung.", output: "Score für Klarheit, Glaswein und Pairings." },
    ],
    nextTitle: "Welche Daten für das höchste Niveau fehlen",
    nextSubtitle: "Um vom Methodenbericht zum starken Statistik-Barometer zu kommen, sind diese Felder am wertvollsten.",
    nextItems: [
      "Vollständige Karte mit Name, Herkunft, Stil, Format, Flaschenpreis und Glaspreis.",
      "Betriebstyp, Land, Stadt, Durchschnittsbon und Anzahl Standorte, immer anonymisiert.",
      "Verkauf, Rotation, Bestand und Marge je Referenz, sofern das Restaurant sie teilen kann.",
      "Hauptgerichte oder Küchenbereiche, um Karte, Pairings und reale Nachfrage zu verbinden.",
      "Analysezeitraum und Kartenänderungen, um Saison von Einzelentscheidungen zu trennen.",
    ],
    ctaTitle: "Machen Sie Ihre Weinkarte zu vergleichbaren Daten",
    ctaDesc: "Senden Sie Ihre Karte und Winerim analysiert sie mit denselben Barometer-Variablen: Marge, Struktur, Glasangebot, Stile, Regionen, Pairings und Chancen.",
    ctaPrimary: "Karte zur Analyse senden",
    ctaSecondary: "Benchmarks erkunden",
    faqTitle: "Häufige Fragen zum Barometer",
    faqs: [
      { q: "Veröffentlicht das Barometer Kundendaten?", a: "Nein. Die Seite ist für aggregierte und anonymisierte Daten konzipiert. Es werden keine Namen, vollständigen Karten oder sensiblen Kennzahlen einzelner Kunden veröffentlicht." },
      { q: "Sind die aktuellen Zahlen endgültig?", a: "Nein. Die erste Version priorisiert Methodik, Variablen und beobachtbare Muster. Segmentierte Zahlen sollten erst mit ausreichender Stichprobe und klaren Anonymisierungsregeln veröffentlicht werden." },
      { q: "Wie ist die Verbindung zur Weinbibliothek?", a: "Die Bibliothek liefert die semantische Sprache für Rebsorten, Regionen, Stile und Pairings. Das Barometer nutzt diese Struktur, um Lücken, Übergewicht und Verkaufspotenzial zu erklären." },
      { q: "Kann ich meine Karte mit dem Barometer vergleichen?", a: "Ja. Der empfohlene Weg ist die kostenlose Analyse Ihrer Karte und der Benchmark als Rahmen für Größe, Preis, Glasangebot, Stile und Chancen." },
    ],
    linksTitle: "Ressourcen zur Vertiefung",
    linkAnalysis: "Kostenlose Weinkartenanalyse",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmarks und Playbooks",
    linkComparisons: "Winerim Vergleiche",
    schemaMeasurement: "Aggregierte und anonymisierte Analyse von Weinkarten, Preisstruktur, Stilen, Regionen, Glasangebot und Rotationssignalen.",
  },
  pt: {
    seoTitle: "Barómetro Winerim 2026 de Cartas de Vinhos | Winerim",
    seoDesc: "Relatório Winerim sobre o desempenho das cartas de vinhos na restauração: metodologia, variáveis medidas, padrões de margem e benchmarks por segmento.",
    badge: "Relatório vivo 2026",
    h1: "Barómetro Winerim de cartas de vinhos",
    subtitle: "Uma camada pública de dados agregados e anonimizados para perceber onde as cartas perdem margem, que oportunidades se repetem e como comparar o restaurante com referências defensáveis.",
    proof: "Baseado na análise de cartas reais, sem publicar nomes de clientes nem dados sensíveis.",
    primaryCta: "Analisar a minha carta",
    secondaryCta: "Ver benchmark",
    breadResources: "Guias e recursos",
    breadLabel: "Barómetro Winerim",
    methodologyTitle: "Metodologia antes dos títulos",
    methodologySubtitle: "O objetivo é publicar dados úteis sem transformar números parciais em promessas absolutas.",
    methodology: [
      { title: "Dados agregados", body: "A análise trabalha com cartas, referências, preços, formatos a copo, estilos, regiões e sinais de estrutura. Os resultados agrupam-se por segmento quando há amostra suficiente." },
      { title: "Anonimização", body: "Não se publicam nomes de restaurantes, hotéis, grupos ou clientes. Cortes por país, cidade ou vertical exigem limiares mínimos antes de virar benchmark público." },
      { title: "Níveis separados", body: "O Barómetro distingue factos observados, inferências operacionais e hipóteses comerciais para não misturar dados com opinião." },
      { title: "Atualização contínua", body: "A página funciona como relatório vivo: primeiro metodologia e padrões, depois cortes numéricos por país, vertical e tipo de carta quando os dados estiverem consolidados." },
    ],
    metricsTitle: "O que a Winerim mede numa carta",
    metricsSubtitle: "Estas variáveis ligam biblioteca do vinho, análise de carta, margem e decisões de compra.",
    metrics: [
      { label: "Número de referências", body: "Tamanho da carta, profundidade por categoria e complexidade operacional para a equipa de sala." },
      { label: "Intervalos de preço", body: "Distribuição de garrafa e copo para detetar lacunas, concentração excessiva e degraus de ticket mal cobertos." },
      { label: "Vinho a copo", body: "Peso, rotação esperada, margem, potencial desperdício e coerência com pratos de maior venda." },
      { label: "Regiões e castas", body: "Diversidade real face a repetição, viés de fornecedor e oportunidades de diferenciação." },
      { label: "Estilos e harmonizações", body: "Cobertura de brancos, tintos, espumantes, fortificados, doces e harmonizações úteis para o serviço." },
      { label: "Sinais de rotação", body: "Quando há dado operacional, cruzam-se vendas, stock, margem e referências paradas." },
    ],
    patternsTitle: "Primeiros padrões que procuramos",
    patternsSubtitle: "Sinais acionáveis que aparecem antes de modelos avançados.",
    patterns: [
      { title: "Margem invisível", body: "Cartas aparentemente organizadas, mas sem leitura clara de custo, desperdício, copo e elasticidade por intervalo." },
      { title: "Carta grande sem função", body: "Muitas referências não melhoram a experiência se a equipa não consegue explicar, recomendar e rodar cada bloco." },
      { title: "Vinho a copo subutilizado", body: "O vinho a copo pode aumentar ticket e prova, mas também perde margem sem regras de rotação e preço." },
      { title: "Canibalização interna", body: "Referências demasiado parecidas competem entre si e escondem lacunas mais úteis em estilo, região ou preço." },
      { title: "Biblioteca desligada", body: "Quando a carta não explica castas, regiões, estilos e harmonizações, cliente e sala compram com menos confiança." },
      { title: "Sem ciclo mensal", body: "A carta melhora quando vendas, stock, margem, pratos e sazonalidade são revistos todos os meses." },
    ],
    segmentsTitle: "Próximos cortes publicáveis",
    segmentsSubtitle: "A expansão de nível máximo deve avançar por segmentos onde a Winerim consiga oferecer dados próprios e comparáveis.",
    segments: [
      { name: "Restaurantes gastronómicos", focus: "Profundidade, colheitas, harmonização e ticket alto.", output: "Benchmark de estrutura e margem por intervalo." },
      { name: "Hotéis", focus: "Room service, eventos, restaurante e bar.", output: "Benchmark por ponto de consumo e stock partilhado." },
      { name: "Grupos de restauração", focus: "Consistência entre locais e compras centralizadas.", output: "Benchmark multilocal e desvios por unidade." },
      { name: "Restaurantes sem sommelier", focus: "Clareza de recomendação e formação da sala.", output: "Score de clareza, copo e harmonizações." },
    ],
    nextTitle: "Dados necessários para o nível máximo",
    nextSubtitle: "Para passar de relatório metodológico a barómetro estatístico forte, estes são os campos mais valiosos.",
    nextItems: [
      "Carta completa com nome, origem, estilo, formato, preço garrafa e preço copo.",
      "Tipo de negócio, país, cidade, ticket médio e número de locais, sempre anonimizados.",
      "Vendas, rotação, stock e margem por referência quando o restaurante os puder partilhar.",
      "Pratos principais ou categorias de cozinha para ligar carta, harmonizações e procura real.",
      "Período de análise e alterações de carta para separar sazonalidade de decisões pontuais.",
    ],
    ctaTitle: "Transforme a sua carta em dados comparáveis",
    ctaDesc: "Envie a carta e a Winerim analisa-a com as mesmas variáveis do Barómetro: margem, estrutura, copo, estilos, regiões, harmonizações e oportunidades.",
    ctaPrimary: "Enviar carta para análise",
    ctaSecondary: "Explorar benchmarks",
    faqTitle: "Perguntas frequentes sobre o Barómetro",
    faqs: [
      { q: "O Barómetro publica dados de clientes?", a: "Não. A página foi desenhada para dados agregados e anonimizados. Não publica nomes, cartas completas nem métricas sensíveis de clientes específicos." },
      { q: "Os números atuais são definitivos?", a: "Não. A primeira versão prioriza metodologia, variáveis e padrões observáveis. Números segmentados devem ser publicados apenas com amostra suficiente e regras claras de anonimato." },
      { q: "Como se liga à biblioteca do vinho?", a: "A biblioteca fornece a linguagem semântica de castas, regiões, estilos e harmonizações. O Barómetro usa essa estrutura para explicar o que falta, o que sobra e que blocos podem vender melhor." },
      { q: "Posso comparar a minha carta com o Barómetro?", a: "Sim. O fluxo recomendado é enviar a carta para a análise gratuita e usar o benchmark como enquadramento para tamanho, preço, copo, estilos e oportunidades." },
    ],
    linksTitle: "Recursos para aprofundar a análise",
    linkAnalysis: "Análise gratuita de carta",
    linkBenchmark: "Wine List Benchmark",
    linkPlaybooks: "Benchmarks e playbooks",
    linkComparisons: "Comparativos Winerim",
    schemaMeasurement: "Análise agregada e anonimizada de cartas de vinhos, estrutura de preços, estilos, regiões, vinho a copo e sinais de rotação.",
  },
};

const methodologyIcons = [Database, ShieldCheck, ClipboardCheck, TrendingUp];
const metricIcons = [Wine, BarChart3, GlassWater, MapPin, Layers, LineChart];

const BarometroCartasVino = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);
  const canonicalPath = localePath(ES_PATH);
  const canonical = `${CANONICAL_DOMAIN}${canonicalPath}`;
  const datasetLicense = `${CANONICAL_DOMAIN}${localePath("/terminos")}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Report",
      "@id": `${canonical}#report`,
      name: t.h1,
      headline: t.seoTitle,
      description: t.seoDesc,
      url: canonical,
      image: DEFAULT_OG_IMAGE,
      datePublished: "2026-06-10",
      dateModified: "2026-06-10",
      inLanguage: lang,
      publisher: {
        "@type": "Organization",
        name: "Winerim",
        url: CANONICAL_DOMAIN,
        logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
      },
      about: t.metrics.map((metric) => metric.label),
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${canonical}#dataset-framework`,
      name: `${t.h1} dataset framework`,
      description: t.schemaMeasurement,
      creator: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
      license: datasetLicense,
      isAccessibleForFree: true,
      inLanguage: lang,
      measurementTechnique: t.schemaMeasurement,
      variableMeasured: t.metrics.map((metric) => ({
        "@type": "PropertyValue",
        name: metric.label,
        description: metric.body,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${canonical}#measured-variables`,
      name: t.metricsTitle,
      itemListElement: t.metrics.map((metric, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: metric.label,
        description: metric.body,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={canonical}
        type="article"
        publishedAt="2026-06-10"
        modifiedAt="2026-06-10"
        hreflang={allLangPaths(ES_PATH)}
        structuredData={structuredData}
      />
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.10),transparent_58%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 min-w-0">
          <Breadcrumbs items={[{ label: t.breadResources, href: localePath("/guias-y-recursos") }, { label: t.breadLabel }]} />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] max-w-[20rem] sm:max-w-4xl mb-6 break-words"
          >
            {t.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[20rem] sm:max-w-3xl break-words"
          >
            {t.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
            className="mt-5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground/70 max-w-[20rem] sm:max-w-3xl break-words"
          >
            {t.proof}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[20rem] sm:max-w-full"
          >
            <Link
              to={localePath("/analisis-carta")}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 sm:px-7 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
            >
              {t.primaryCta} <ArrowRight size={16} />
            </Link>
            <Link
              to={localePath("/wine-list-benchmark")}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-border bg-card/60 px-6 sm:px-7 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-all"
            >
              {t.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.methodologyTitle}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.methodologySubtitle}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.methodology.map((item, index) => {
              const Icon = methodologyIcons[index] || Database;
              return (
                <ScrollReveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-xl border border-border bg-gradient-card p-5">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <h2 className="font-heading text-lg font-semibold mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.metricsTitle}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold max-w-3xl mx-auto">{t.metricsSubtitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.metrics.map((metric, index) => {
              const Icon = metricIcons[index] || BarChart3;
              return (
                <ScrollReveal key={metric.label} delay={index * 0.04}>
                  <article className="h-full rounded-xl border border-border bg-card/70 p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">{metric.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{metric.body}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="max-w-3xl mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.patternsTitle}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.patternsSubtitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {t.patterns.map((pattern, index) => (
              <ScrollReveal key={pattern.title} delay={index * 0.04}>
                <article className="h-full rounded-xl border border-border bg-gradient-card p-5">
                  <div className="flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wine/10 text-xs font-bold text-wine">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold mb-2">{pattern.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pattern.body}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.segmentsTitle}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold max-w-3xl mx-auto">{t.segmentsSubtitle}</h2>
          </ScrollReveal>
          <div className="overflow-hidden rounded-xl border border-border bg-card/60">
            <div className="grid md:grid-cols-[1.1fr_1fr_1fr] text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground border-b border-border">
              <div className="p-4">Segmento</div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-border">Foco</div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-border">Salida</div>
            </div>
            {t.segments.map((segment) => (
              <div key={segment.name} className="grid md:grid-cols-[1.1fr_1fr_1fr] border-b border-border last:border-b-0">
                <div className="p-4 font-heading font-semibold">{segment.name}</div>
                <div className="p-4 text-sm text-muted-foreground md:border-l border-border">{segment.focus}</div>
                <div className="p-4 text-sm text-muted-foreground md:border-l border-border">{segment.output}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.nextTitle}</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.nextSubtitle}</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {t.nextItems.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.04}>
                <div className="flex gap-3 rounded-xl border border-border bg-gradient-card p-4">
                  <ClipboardCheck size={18} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative rounded-3xl border border-border bg-gradient-card p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-5">{t.ctaTitle}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t.ctaDesc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                    {t.ctaPrimary} <ArrowRight size={16} />
                  </Link>
                  <Link to={localePath("/benchmarks-playbooks")} className="inline-flex items-center justify-center gap-2 border border-border bg-card/70 px-7 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-all">
                    {t.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection faqs={t.faqs} title={t.faqTitle} schemaId="barometro-cartas-vino" />
      <InternalLinks
        title={t.linksTitle}
        links={[
          { to: localePath("/analisis-carta"), label: t.linkAnalysis, type: "tool" },
          { to: localePath("/wine-list-benchmark"), label: t.linkBenchmark, type: "tool" },
          { to: localePath("/benchmarks-playbooks"), label: t.linkPlaybooks, type: "resource" },
          { to: localePath("/comparativas"), label: t.linkComparisons, type: "solution" },
        ]}
      />
      <Footer />
    </div>
  );
};

export default BarometroCartasVino;
