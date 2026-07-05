import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Grape,
  GlassWater,
  MapPin,
  TrendingUp,
  Utensils,
  Wine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { getWineLibraryPath } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";
import { CANONICAL_DOMAIN } from "@/seo/config";

const LEARN_WINE_ROUTES: Record<SupportedLang, string> = {
  es: "/aprender-vino",
  en: "/en/learn-wine",
  it: "/it/imparare-il-vino",
  fr: "/fr/apprendre-le-vin",
  de: "/de/wein-lernen",
  pt: "/pt/aprender-vinho",
};

const getLearnWineHreflang = () => [
  { lang: "x-default", url: `${CANONICAL_DOMAIN}${LEARN_WINE_ROUTES.es}` },
  ...Object.entries(LEARN_WINE_ROUTES).map(([lang, path]) => ({
    lang,
    url: `${CANONICAL_DOMAIN}${path}`,
  })),
];

interface LearningStep {
  title: string;
  description: string;
  outcome: string;
  esPath: string;
  icon: typeof BookOpen;
}

interface LearnWineArticleLink {
  title: string;
  description: string;
  path: string;
  publishedAt?: string;
}

interface LearnWineCopy {
  seoTitle: string;
  seoDescription: string;
  badge: string;
  breadcrumb: string;
  h1: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { value: string; label: string }[];
  sectionTitle: string;
  sectionIntro: string;
  steps: LearningStep[];
  articlesTitle: string;
  articlesIntro: string;
  articleCta: string;
  articleLinks: LearnWineArticleLink[];
  methodTitle: string;
  methodIntro: string;
  method: { title: string; text: string }[];
  nextTitle: string;
  nextText: string;
  analyzeCta: string;
  libraryCta: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

const isPublishedArticleLink = (article: LearnWineArticleLink) =>
  !article.publishedAt || new Date(article.publishedAt).getTime() <= Date.now();

const COPY: Record<SupportedLang, LearnWineCopy> = {
  es: {
    seoTitle: "Aprender vino desde cero para restaurantes",
    seoDescription:
      "Ruta para aprender vino desde cero: botella, cata, uvas, regiones, estilos, maridajes, servicio y decisiones de carta para equipos de sala.",
    badge: "Ruta de aprendizaje",
    breadcrumb: "Aprender vino",
    h1: "Aprender vino desde cero, aplicado a vender mejor en sala",
    subtitle:
      "Una guía ordenada para que un equipo entienda una botella, describa un vino sin jerga, recomiende con seguridad y conecte conocimiento con margen, rotación y experiencia del cliente.",
    primaryCta: "Analizar mi carta",
    secondaryCta: "Explorar la biblioteca",
    stats: [
      { value: "5", label: "bloques de aprendizaje" },
      { value: "80+", label: "uvas y estilos conectados" },
      { value: "1", label: "objetivo: vender mejor" },
    ],
    sectionTitle: "Qué aprender primero",
    sectionIntro:
      "La Biblioteca del vino es el mapa de entidades. Esta página es el camino: qué estudiar, en qué orden y cómo convertirlo en conversación útil con el cliente.",
    steps: [
      {
        title: "Entender la botella",
        description: "Etiqueta, origen, variedad, añada, crianza, estilo y precio sin perderse en detalles irrelevantes.",
        outcome: "Resultado: el equipo sabe explicar por qué un vino está en carta.",
        esPath: "/biblioteca-vino/glosario",
        icon: BookOpen,
      },
      {
        title: "Catar y describir",
        description: "Aroma, acidez, cuerpo, tanino, dulzor, alcohol y final con lenguaje claro para sala.",
        outcome: "Resultado: menos miedo a recomendar y menos frases vacías.",
        esPath: "/biblioteca-vino/estilos",
        icon: GlassWater,
      },
      {
        title: "Dominar uvas y regiones",
        description: "Las variedades y zonas que más aparecen en cartas de restaurante, con su papel comercial.",
        outcome: "Resultado: cada referencia se entiende por función, no solo por nombre.",
        esPath: "/biblioteca-vino/uvas",
        icon: Grape,
      },
      {
        title: "Recomendar por comida",
        description: "Maridajes de base para pescado, carne, arroces, cocina asiática, quesos y postres.",
        outcome: "Resultado: recomendaciones rápidas que elevan ticket y experiencia.",
        esPath: "/biblioteca-vino/maridajes",
        icon: Utensils,
      },
      {
        title: "Servir y decidir mejor",
        description: "Temperatura, copa, medidas, vino por copa, rotación, margen y revisión mensual.",
        outcome: "Resultado: conocimiento que afecta ventas, stock y rentabilidad.",
        esPath: "/biblioteca-vino/guia-servicio",
        icon: ClipboardCheck,
      },
    ],
    articlesTitle: "Primeras guías para empezar",
    articlesIntro:
      "Guías prácticas para pasar de la teoría a conversación real en sala: catar, describir, recomendar, entender tipos, uvas, regiones y estilos.",
    articleCta: "Leer guía",
    articleLinks: [
      {
        title: "Cómo catar vino en cinco pasos",
        description: "Un método repetible para mirar, oler, probar y traducir el vino a una frase útil para el cliente.",
        path: "/article/como-catar-vino-en-cinco-pasos",
      },
      {
        title: "Vocabulario de cata de vino",
        description: "Las palabras esenciales para describir aroma, estructura, textura y final sin sonar vacío.",
        path: "/article/vocabulario-de-cata-de-vino",
      },
      {
        title: "Maridajes básicos para restaurantes",
        description: "Reglas simples para recomendar por pescado, carne, arroces, quesos, cocina asiática y postres.",
        path: "/article/maridajes-basicos-para-restaurantes",
      },
      {
        title: "Tipos de vino para entender una carta",
        description: "Blancos, tintos, rosados, espumosos, dulces y generosos explicados por función de servicio.",
        path: "/article/tipos-de-vino-para-entender-una-carta",
      },
      {
        title: "Uvas que conocer para empezar",
        description: "Variedades ancla para explicar estilo, precio, maridaje y alternativas dentro de la carta.",
        path: "/article/uvas-que-conocer-para-empezar",
      },
      {
        title: "Regiones vinícolas para empezar",
        description: "Una ruta por regiones que ayudan a explicar expectativa, precio y alternativas en sala.",
        path: "/article/regiones-vinicolas-para-empezar-en-restaurante",
      },
      {
        title: "Recomendar vino por estilos",
        description: "Cómo convertir frases de cliente en estilos claros, alternativas útiles y recomendaciones de sala.",
        path: "/article/recomendar-vino-por-estilos-restaurante",
        publishedAt: "2026-07-13T09:00:00+02:00",
      },
    ],
    methodTitle: "Método Winerim para aprender vino en restauración",
    methodIntro:
      "No se trata de memorizar enciclopedias. Se trata de que cada persona de sala pueda responder tres preguntas: qué es, con qué va y por qué merece la pena.",
    method: [
      { title: "De lo simple a lo accionable", text: "Primero se aprende el lenguaje básico; después se conecta con platos, precios y momentos de consumo." },
      { title: "De la ficha al servicio", text: "Cada uva, región o estilo debe terminar en una frase que el cliente entienda." },
      { title: "De conocimiento a margen", text: "Aprender vino debe mejorar recomendación, rotación, copa y decisiones de compra." },
    ],
    nextTitle: "Convierte aprendizaje en una carta que vende",
    nextText:
      "Si tu equipo aprende vino pero la carta sigue siendo un PDF largo, el conocimiento no se activa. Winerim conecta formación, fichas, maridajes y análisis para que cada referencia tenga una función clara.",
    analyzeCta: "Enviar carta para análisis",
    libraryCta: "Ver Biblioteca del vino",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Esto sustituye a la Biblioteca del vino?", a: "No. La Biblioteca es la base de datos de uvas, regiones, estilos, maridajes y glosario. Aprender vino es la ruta guiada para usar esa base en sala." },
      { q: "¿Está pensado para principiantes?", a: "Sí. Está diseñado para equipos que no necesitan hablar como sumilleres, sino recomendar mejor, con precisión y seguridad." },
      { q: "¿Cómo se conecta con Winerim?", a: "Winerim usa este conocimiento para enriquecer fichas, maridajes, recomendaciones y análisis de carta." },
    ],
  },
  en: {
    seoTitle: "Learn wine from scratch for restaurants",
    seoDescription:
      "A practical learning path for restaurant teams: bottle basics, tasting, grapes, regions, styles, pairings, service and wine-list decisions.",
    badge: "Learning path",
    breadcrumb: "Learn wine",
    h1: "Learn wine from scratch and use it to sell better on the floor",
    subtitle:
      "A clear path for teams to understand a bottle, describe wine without jargon, recommend with confidence and connect knowledge with margin, rotation and guest experience.",
    primaryCta: "Analyze my wine list",
    secondaryCta: "Explore the library",
    stats: [
      { value: "5", label: "learning blocks" },
      { value: "80+", label: "grapes and styles connected" },
      { value: "1", label: "goal: sell better" },
    ],
    sectionTitle: "What to learn first",
    sectionIntro:
      "The Wine Library is the entity map. This page is the path: what to study, in which order and how to turn it into useful guest conversations.",
    steps: [
      { title: "Understand the bottle", description: "Label, origin, grape, vintage, ageing, style and price without getting lost in irrelevant detail.", outcome: "Outcome: the team can explain why a wine is on the list.", esPath: "/biblioteca-vino/glosario", icon: BookOpen },
      { title: "Taste and describe", description: "Aroma, acidity, body, tannin, sweetness, alcohol and finish with simple service language.", outcome: "Outcome: less hesitation and fewer empty descriptions.", esPath: "/biblioteca-vino/estilos", icon: GlassWater },
      { title: "Learn grapes and regions", description: "The varieties and regions that appear most often on restaurant wine lists, with their commercial role.", outcome: "Outcome: every reference is understood by function, not just by name.", esPath: "/biblioteca-vino/uvas", icon: Grape },
      { title: "Recommend by food", description: "Core pairings for fish, meat, rice, Asian cuisine, cheese and desserts.", outcome: "Outcome: faster recommendations that lift ticket and experience.", esPath: "/biblioteca-vino/maridajes", icon: Utensils },
      { title: "Serve and decide better", description: "Temperature, glassware, pours, by-the-glass strategy, rotation, margin and monthly review.", outcome: "Outcome: knowledge that affects sales, stock and profitability.", esPath: "/biblioteca-vino/guia-servicio", icon: ClipboardCheck },
    ],
    articlesTitle: "First guides to start with",
    articlesIntro:
      "Practical guides that turn wine learning into floor conversations: tasting, describing, pairing, wine types, grapes, regions and styles.",
    articleCta: "Read guide",
    articleLinks: [
      {
        title: "How to taste wine in five steps",
        description: "A repeatable method for looking, smelling, tasting and turning the wine into guest language.",
        path: "/en/article/how-to-taste-wine-in-five-steps",
      },
      {
        title: "Wine tasting vocabulary",
        description: "The essential words for aroma, structure, texture and finish without empty adjectives.",
        path: "/en/article/wine-tasting-vocabulary",
      },
      {
        title: "Basic food and wine pairing for restaurants",
        description: "Simple rules for recommending by fish, meat, rice, cheese, Asian cuisine and desserts.",
        path: "/en/article/basic-food-and-wine-pairing-for-restaurants",
      },
      {
        title: "Types of wine to understand a list",
        description: "White, red, rose, sparkling, sweet and fortified wines explained by service role.",
        path: "/en/article/types-of-wine-restaurant-wine-list",
      },
      {
        title: "Grapes to know first",
        description: "Anchor grapes for explaining style, price, pairing and alternatives on the list.",
        path: "/en/article/grapes-to-know-when-starting-with-wine",
      },
      {
        title: "Wine regions to know first",
        description: "A route through regions that explain guest expectation, price and service alternatives.",
        path: "/en/article/wine-regions-to-know-for-restaurant-service",
      },
      {
        title: "Recommend wine by style",
        description: "Turn guest language into clear styles, useful alternatives and confident floor recommendations.",
        path: "/en/article/recommend-wine-by-style-restaurant",
        publishedAt: "2026-07-13T09:05:00+02:00",
      },
    ],
    methodTitle: "The Winerim method for wine learning in hospitality",
    methodIntro:
      "This is not about memorising encyclopedias. Every floor team member should answer three questions: what it is, what it pairs with and why it is worth choosing.",
    method: [
      { title: "From simple to actionable", text: "Learn the basic language first, then connect it with dishes, price points and drinking occasions." },
      { title: "From profile to service", text: "Every grape, region or style should end in a sentence the guest understands." },
      { title: "From knowledge to margin", text: "Wine learning should improve recommendation, rotation, by-the-glass sales and purchasing decisions." },
    ],
    nextTitle: "Turn learning into a wine list that sells",
    nextText:
      "If your team learns wine but the list remains a long PDF, the knowledge never activates. Winerim connects training, wine profiles, pairings and analysis so each reference has a clear role.",
    analyzeCta: "Send list for analysis",
    libraryCta: "Open Wine Library",
    faqTitle: "FAQ",
    faqs: [
      { q: "Does this replace the Wine Library?", a: "No. The Library is the database of grapes, regions, styles, pairings and glossary. Learn wine is the guided path for using it on the floor." },
      { q: "Is it for beginners?", a: "Yes. It is built for teams that do not need to sound like sommeliers, but need to recommend with clarity and confidence." },
      { q: "How does it connect with Winerim?", a: "Winerim uses this knowledge to enrich wine profiles, pairings, recommendations and wine-list analysis." },
    ],
  },
  it: {
    seoTitle: "Imparare il vino da zero per ristoranti",
    seoDescription:
      "Percorso pratico per imparare il vino: bottiglia, degustazione, vitigni, regioni, stili, abbinamenti, servizio e decisioni di carta.",
    badge: "Percorso di apprendimento",
    breadcrumb: "Imparare il vino",
    h1: "Imparare il vino da zero e usarlo per vendere meglio in sala",
    subtitle:
      "Un percorso ordinato per capire una bottiglia, descrivere un vino senza gergo, consigliare con sicurezza e collegare conoscenza, margine, rotazione ed esperienza cliente.",
    primaryCta: "Analizzare la carta",
    secondaryCta: "Esplora la biblioteca",
    stats: [
      { value: "5", label: "blocchi di apprendimento" },
      { value: "80+", label: "vitigni e stili collegati" },
      { value: "1", label: "obiettivo: vendere meglio" },
    ],
    sectionTitle: "Cosa imparare prima",
    sectionIntro:
      "La Biblioteca del vino è la mappa delle entità. Questa pagina è il percorso: cosa studiare, in quale ordine e come trasformarlo in conversazione utile con il cliente.",
    steps: [
      { title: "Capire la bottiglia", description: "Etichetta, origine, vitigno, annata, affinamento, stile e prezzo senza perdersi nei dettagli.", outcome: "Risultato: il team sa spiegare perché un vino è in carta.", esPath: "/biblioteca-vino/glosario", icon: BookOpen },
      { title: "Degustare e descrivere", description: "Aroma, acidità, corpo, tannino, dolcezza, alcol e finale con linguaggio semplice da sala.", outcome: "Risultato: meno paura di consigliare e meno frasi vuote.", esPath: "/biblioteca-vino/estilos", icon: GlassWater },
      { title: "Vitigni e regioni", description: "Le varietà e zone più presenti nelle carte dei ristoranti, con il loro ruolo commerciale.", outcome: "Risultato: ogni referenza si capisce per funzione, non solo per nome.", esPath: "/biblioteca-vino/uvas", icon: Grape },
      { title: "Consigliare col cibo", description: "Abbinamenti base per pesce, carne, riso, cucina asiatica, formaggi e dessert.", outcome: "Risultato: raccomandazioni rapide che migliorano ticket ed esperienza.", esPath: "/biblioteca-vino/maridajes", icon: Utensils },
      { title: "Servire e decidere meglio", description: "Temperatura, calice, dosi, vino al calice, rotazione, margine e revisione mensile.", outcome: "Risultato: conoscenza che impatta vendite, stock e redditività.", esPath: "/biblioteca-vino/guia-servicio", icon: ClipboardCheck },
    ],
    articlesTitle: "Prime guide per iniziare",
    articlesIntro:
      "Guide pratiche per portare l'apprendimento nella conversazione in sala: degustare, descrivere, abbinare, leggere tipi, vitigni, regioni e stili.",
    articleCta: "Leggi la guida",
    articleLinks: [
      {
        title: "Come degustare il vino in cinque passaggi",
        description: "Un metodo ripetibile per osservare, annusare, assaggiare e tradurre il vino per il cliente.",
        path: "/it/article/come-degustare-il-vino-in-cinque-passaggi",
      },
      {
        title: "Vocabolario di degustazione del vino",
        description: "Le parole essenziali per aroma, struttura, texture e finale senza frasi vuote.",
        path: "/it/article/vocabolario-degustazione-vino",
      },
      {
        title: "Abbinamenti base cibo-vino per ristoranti",
        description: "Regole semplici per consigliare con pesce, carne, riso, formaggi, cucina asiatica e dessert.",
        path: "/it/article/abbinamenti-base-cibo-vino-per-ristoranti",
      },
      {
        title: "Tipi di vino per capire una carta",
        description: "Bianchi, rossi, rosati, spumanti, dolci e fortificati letti per funzione di servizio.",
        path: "/it/article/tipi-di-vino-per-capire-una-carta",
      },
      {
        title: "Vitigni da conoscere per iniziare",
        description: "Vitigni ancora per spiegare stile, prezzo, abbinamento e alternative in carta.",
        path: "/it/article/vitigni-da-conoscere-per-iniziare",
      },
      {
        title: "Regioni vinicole da conoscere",
        description: "Un percorso tra regioni che spiegano aspettativa, prezzo e alternative in sala.",
        path: "/it/article/regioni-vinicole-da-conoscere-in-ristorante",
      },
      {
        title: "Consigliare il vino per stile",
        description: "Trasforma le frasi del cliente in stili chiari, alternative utili e raccomandazioni sicure.",
        path: "/it/article/raccomandare-vino-per-stile-ristorante",
        publishedAt: "2026-07-13T09:10:00+02:00",
      },
    ],
    methodTitle: "Il metodo Winerim per imparare il vino nella ristorazione",
    methodIntro:
      "Non si tratta di memorizzare enciclopedie. Ogni persona di sala deve rispondere a tre domande: cos'è, con cosa si abbina e perché vale la pena sceglierlo.",
    method: [
      { title: "Dal semplice all'azione", text: "Prima il linguaggio base, poi il collegamento con piatti, prezzi e momenti di consumo." },
      { title: "Dalla scheda al servizio", text: "Ogni vitigno, regione o stile deve diventare una frase comprensibile per il cliente." },
      { title: "Dalla conoscenza al margine", text: "Imparare il vino deve migliorare raccomandazioni, rotazione, calice e acquisti." },
    ],
    nextTitle: "Trasforma l'apprendimento in una carta che vende",
    nextText:
      "Se il team impara il vino ma la carta resta un PDF lungo, la conoscenza non si attiva. Winerim collega formazione, schede, abbinamenti e analisi.",
    analyzeCta: "Invia la carta per analisi",
    libraryCta: "Vedi Biblioteca del vino",
    faqTitle: "Domande frequenti",
    faqs: [
      { q: "Sostituisce la Biblioteca del vino?", a: "No. La Biblioteca è la base dati di vitigni, regioni, stili, abbinamenti e glossario. Imparare il vino è il percorso guidato per usarla in sala." },
      { q: "È pensato per principianti?", a: "Sì. È pensato per team che non devono parlare come sommelier, ma consigliare meglio e con sicurezza." },
      { q: "Come si collega a Winerim?", a: "Winerim usa questa conoscenza per arricchire schede vino, abbinamenti, raccomandazioni e analisi della carta." },
    ],
  },
  fr: {
    seoTitle: "Apprendre le vin depuis zéro pour restaurants",
    seoDescription:
      "Parcours pratique pour apprendre le vin : bouteille, dégustation, cépages, régions, styles, accords, service et décisions de carte.",
    badge: "Parcours d'apprentissage",
    breadcrumb: "Apprendre le vin",
    h1: "Apprendre le vin depuis zéro et mieux vendre en salle",
    subtitle:
      "Un parcours clair pour comprendre une bouteille, décrire un vin sans jargon, recommander avec confiance et relier connaissance, marge, rotation et expérience client.",
    primaryCta: "Analyser ma carte",
    secondaryCta: "Explorer la bibliothèque",
    stats: [
      { value: "5", label: "blocs d'apprentissage" },
      { value: "80+", label: "cépages et styles reliés" },
      { value: "1", label: "objectif : mieux vendre" },
    ],
    sectionTitle: "Quoi apprendre en premier",
    sectionIntro:
      "La Bibliothèque du vin est la carte des entités. Cette page est le chemin : quoi étudier, dans quel ordre et comment l'utiliser avec le client.",
    steps: [
      { title: "Comprendre la bouteille", description: "Étiquette, origine, cépage, millésime, élevage, style et prix sans se perdre.", outcome: "Résultat : l'équipe sait expliquer pourquoi le vin est à la carte.", esPath: "/biblioteca-vino/glosario", icon: BookOpen },
      { title: "Déguster et décrire", description: "Arômes, acidité, corps, tanin, sucrosité, alcool et finale avec un langage simple.", outcome: "Résultat : moins d'hésitation et moins de phrases vagues.", esPath: "/biblioteca-vino/estilos", icon: GlassWater },
      { title: "Cépages et régions", description: "Les variétés et régions les plus présentes en restauration, avec leur rôle commercial.", outcome: "Résultat : chaque référence se comprend par sa fonction.", esPath: "/biblioteca-vino/uvas", icon: Grape },
      { title: "Recommander avec les plats", description: "Accords de base pour poisson, viande, riz, cuisine asiatique, fromages et desserts.", outcome: "Résultat : recommandations rapides qui améliorent ticket et expérience.", esPath: "/biblioteca-vino/maridajes", icon: Utensils },
      { title: "Servir et mieux décider", description: "Température, verre, doses, vin au verre, rotation, marge et revue mensuelle.", outcome: "Résultat : une connaissance qui touche ventes, stock et rentabilité.", esPath: "/biblioteca-vino/guia-servicio", icon: ClipboardCheck },
    ],
    articlesTitle: "Premiers guides pour commencer",
    articlesIntro:
      "Guides pratiques pour passer de l'apprentissage à la conversation en salle : déguster, décrire, accorder, lire types, cépages, régions et styles.",
    articleCta: "Lire le guide",
    articleLinks: [
      {
        title: "Comment déguster le vin en cinq étapes",
        description: "Une méthode répétable pour observer, sentir, goûter et traduire le vin pour le client.",
        path: "/fr/article/comment-deguster-le-vin-en-cinq-etapes",
      },
      {
        title: "Vocabulaire de dégustation du vin",
        description: "Les mots essentiels pour parler d'arômes, structure, texture et finale clairement.",
        path: "/fr/article/vocabulaire-de-degustation-du-vin",
      },
      {
        title: "Accords mets-vins de base pour restaurants",
        description: "Des règles simples pour recommander avec poisson, viande, riz, fromages, cuisine asiatique et desserts.",
        path: "/fr/article/accords-mets-vins-de-base-pour-restaurants",
      },
      {
        title: "Types de vin pour comprendre une carte",
        description: "Blancs, rouges, rosés, effervescents, doux et fortifiés par rôle de service.",
        path: "/fr/article/types-de-vin-pour-comprendre-une-carte",
      },
      {
        title: "Cépages à connaître pour commencer",
        description: "Cépages repères pour expliquer style, prix, accord et alternatives en carte.",
        path: "/fr/article/cepages-a-connaitre-pour-commencer",
      },
      {
        title: "Régions viticoles à connaître",
        description: "Un parcours parmi les régions qui expliquent attente, prix et alternatives en salle.",
        path: "/fr/article/regions-viticoles-a-connaitre-en-restauration",
      },
      {
        title: "Recommander le vin par style",
        description: "Transformer les mots du client en styles clairs, alternatives utiles et recommandations sûres.",
        path: "/fr/article/recommander-vin-par-style-restaurant",
        publishedAt: "2026-07-13T09:15:00+02:00",
      },
    ],
    methodTitle: "La méthode Winerim pour apprendre le vin en restauration",
    methodIntro:
      "Il ne s'agit pas de mémoriser une encyclopédie. Chaque membre de l'équipe doit répondre à trois questions : ce que c'est, avec quoi cela va et pourquoi le choisir.",
    method: [
      { title: "Du simple à l'actionnable", text: "On apprend d'abord le langage de base, puis le lien avec plats, prix et moments de consommation." },
      { title: "De la fiche au service", text: "Chaque cépage, région ou style doit devenir une phrase compréhensible pour le client." },
      { title: "De la connaissance à la marge", text: "Apprendre le vin doit améliorer recommandation, rotation, vin au verre et achats." },
    ],
    nextTitle: "Transformer l'apprentissage en carte qui vend",
    nextText:
      "Si l'équipe apprend le vin mais que la carte reste un long PDF, la connaissance ne s'active pas. Winerim relie formation, fiches, accords et analyse.",
    analyzeCta: "Envoyer la carte pour analyse",
    libraryCta: "Voir la Bibliothèque du vin",
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Est-ce que cela remplace la Bibliothèque du vin ?", a: "Non. La Bibliothèque est la base de données des cépages, régions, styles, accords et glossaire. Apprendre le vin est le parcours guidé pour l'utiliser en salle." },
      { q: "Est-ce pensé pour débutants ?", a: "Oui. C'est conçu pour des équipes qui doivent recommander clairement, sans parler comme des sommeliers." },
      { q: "Comment cela se connecte à Winerim ?", a: "Winerim utilise cette connaissance pour enrichir fiches, accords, recommandations et analyse de carte." },
    ],
  },
  de: {
    seoTitle: "Wein lernen von Grund auf für Restaurants",
    seoDescription:
      "Praktischer Lernpfad für Restaurantteams: Flasche, Verkostung, Rebsorten, Regionen, Stile, Pairings, Service und Weinkartenentscheidungen.",
    badge: "Lernpfad",
    breadcrumb: "Wein lernen",
    h1: "Wein von Grund auf lernen und im Service besser verkaufen",
    subtitle:
      "Ein klarer Pfad, damit Teams eine Flasche verstehen, Wein ohne Fachjargon beschreiben, sicher empfehlen und Wissen mit Marge, Rotation und Gästeerlebnis verbinden.",
    primaryCta: "Weinkarte analysieren",
    secondaryCta: "Bibliothek erkunden",
    stats: [
      { value: "5", label: "Lernblöcke" },
      { value: "80+", label: "Rebsorten und Stile verbunden" },
      { value: "1", label: "Ziel: besser verkaufen" },
    ],
    sectionTitle: "Was zuerst lernen",
    sectionIntro:
      "Die Weinbibliothek ist die Entitätskarte. Diese Seite ist der Weg: was lernen, in welcher Reihenfolge und wie es im Gespräch mit Gästen nutzbar wird.",
    steps: [
      { title: "Die Flasche verstehen", description: "Etikett, Herkunft, Rebsorte, Jahrgang, Ausbau, Stil und Preis ohne unnötige Details.", outcome: "Ergebnis: das Team kann erklären, warum ein Wein auf der Karte steht.", esPath: "/biblioteca-vino/glosario", icon: BookOpen },
      { title: "Verkosten und beschreiben", description: "Aroma, Säure, Körper, Tannin, Süße, Alkohol und Abgang mit einfacher Servicesprache.", outcome: "Ergebnis: weniger Unsicherheit und weniger leere Beschreibungen.", esPath: "/biblioteca-vino/estilos", icon: GlassWater },
      { title: "Rebsorten und Regionen", description: "Die wichtigsten Sorten und Regionen auf Restaurantkarten mit ihrer kommerziellen Rolle.", outcome: "Ergebnis: jede Referenz wird über ihre Funktion verstanden.", esPath: "/biblioteca-vino/uvas", icon: Grape },
      { title: "Zum Essen empfehlen", description: "Basis-Pairings für Fisch, Fleisch, Reisgerichte, asiatische Küche, Käse und Desserts.", outcome: "Ergebnis: schnellere Empfehlungen für mehr Ticket und Erlebnis.", esPath: "/biblioteca-vino/maridajes", icon: Utensils },
      { title: "Besser servieren und entscheiden", description: "Temperatur, Glas, Ausschankmenge, Glaswein, Rotation, Marge und Monatsreview.", outcome: "Ergebnis: Wissen, das Verkauf, Bestand und Profitabilität beeinflusst.", esPath: "/biblioteca-vino/guia-servicio", icon: ClipboardCheck },
    ],
    articlesTitle: "Erste Leitfäden für den Einstieg",
    articlesIntro:
      "Praktische Inhalte, die Weinwissen in Servicegespräche übersetzen: verkosten, beschreiben, pairen, Weinarten, Rebsorten, Regionen und Stile lesen.",
    articleCta: "Leitfaden lesen",
    articleLinks: [
      {
        title: "Wein in fünf Schritten verkosten",
        description: "Eine wiederholbare Methode, um Wein zu sehen, zu riechen, zu schmecken und verständlich zu erklären.",
        path: "/de/article/wein-verkosten-in-fuenf-schritten",
      },
      {
        title: "Weinverkostungs-Vokabular",
        description: "Die wichtigsten Wörter für Aroma, Struktur, Textur und Abgang ohne leere Floskeln.",
        path: "/de/article/weinverkostung-vokabular",
      },
      {
        title: "Einfache Food-Wine-Pairings für Restaurants",
        description: "Einfache Regeln für Empfehlungen zu Fisch, Fleisch, Reisgerichten, Käse, asiatischer Küche und Desserts.",
        path: "/de/article/einfache-food-wine-pairings-fuer-restaurants",
      },
      {
        title: "Weinarten verstehen",
        description: "Weisswein, Rotwein, Rose, Schaumwein, Suesswein und fortifizierte Weine nach Servicefunktion.",
        path: "/de/article/weinarten-weinkarte-verstehen",
      },
      {
        title: "Rebsorten fuer den Einstieg",
        description: "Anker-Rebsorten, um Stil, Preis, Pairing und Alternativen auf der Karte zu erklaeren.",
        path: "/de/article/rebsorten-die-man-zum-einstieg-kennen-sollte",
      },
      {
        title: "Weinregionen fuer den Service",
        description: "Regionen, die Gaesteerwartung, Preis und Alternativen im Service erklaeren.",
        path: "/de/article/weinregionen-fuer-den-service-kennen",
      },
      {
        title: "Wein nach Stil empfehlen",
        description: "Gaestesprache in klare Stile, sinnvolle Alternativen und sichere Empfehlungen uebersetzen.",
        path: "/de/article/wein-nach-stil-empfehlen-restaurant",
        publishedAt: "2026-07-13T09:20:00+02:00",
      },
    ],
    methodTitle: "Die Winerim-Methode für Weinlernen in der Gastronomie",
    methodIntro:
      "Es geht nicht darum, Lexika auswendig zu lernen. Jede Person im Service soll drei Fragen beantworten: was ist es, wozu passt es und warum lohnt es sich.",
    method: [
      { title: "Von einfach zu anwendbar", text: "Zuerst die Grundsprache, dann Verbindung mit Gerichten, Preisen und Konsummomenten." },
      { title: "Vom Profil zum Service", text: "Jede Rebsorte, Region oder Stilrichtung muss in einem verständlichen Satz enden." },
      { title: "Von Wissen zu Marge", text: "Weinlernen soll Empfehlung, Rotation, Glasweinverkauf und Einkauf verbessern." },
    ],
    nextTitle: "Aus Lernen eine Weinkarte machen, die verkauft",
    nextText:
      "Wenn das Team Wein lernt, die Karte aber ein langes PDF bleibt, wird das Wissen nicht aktiviert. Winerim verbindet Training, Profile, Pairings und Analyse.",
    analyzeCta: "Karte zur Analyse senden",
    libraryCta: "Weinbibliothek öffnen",
    faqTitle: "FAQ",
    faqs: [
      { q: "Ersetzt das die Weinbibliothek?", a: "Nein. Die Bibliothek ist die Datenbasis für Rebsorten, Regionen, Stile, Pairings und Glossar. Wein lernen ist der geführte Pfad für den Service." },
      { q: "Ist es für Anfänger gedacht?", a: "Ja. Es ist für Teams gedacht, die nicht wie Sommeliers klingen müssen, sondern klar und sicher empfehlen sollen." },
      { q: "Wie hängt es mit Winerim zusammen?", a: "Winerim nutzt dieses Wissen für Weinprofile, Pairings, Empfehlungen und Weinkartenanalyse." },
    ],
  },
  pt: {
    seoTitle: "Aprender vinho do zero para restaurantes",
    seoDescription:
      "Percurso prático para aprender vinho: garrafa, prova, castas, regiões, estilos, harmonizações, serviço e decisões de carta.",
    badge: "Percurso de aprendizagem",
    breadcrumb: "Aprender vinho",
    h1: "Aprender vinho do zero e vender melhor na sala",
    subtitle:
      "Um percurso claro para a equipa entender uma garrafa, descrever vinho sem jargão, recomendar com segurança e ligar conhecimento a margem, rotação e experiência do cliente.",
    primaryCta: "Analisar a minha carta",
    secondaryCta: "Explorar a biblioteca",
    stats: [
      { value: "5", label: "blocos de aprendizagem" },
      { value: "80+", label: "castas e estilos ligados" },
      { value: "1", label: "objetivo: vender melhor" },
    ],
    sectionTitle: "O que aprender primeiro",
    sectionIntro:
      "A Biblioteca do vinho é o mapa de entidades. Esta página é o caminho: o que estudar, em que ordem e como transformar isso numa conversa útil com o cliente.",
    steps: [
      { title: "Entender a garrafa", description: "Rótulo, origem, casta, ano, estágio, estilo e preço sem se perder em detalhes.", outcome: "Resultado: a equipa sabe explicar porque um vinho está na carta.", esPath: "/biblioteca-vino/glosario", icon: BookOpen },
      { title: "Provar e descrever", description: "Aroma, acidez, corpo, tanino, doçura, álcool e final com linguagem simples de sala.", outcome: "Resultado: menos receio de recomendar e menos frases vazias.", esPath: "/biblioteca-vino/estilos", icon: GlassWater },
      { title: "Castas e regiões", description: "As variedades e regiões mais presentes nas cartas de restaurante, com o seu papel comercial.", outcome: "Resultado: cada referência é entendida pela sua função.", esPath: "/biblioteca-vino/uvas", icon: Grape },
      { title: "Recomendar por comida", description: "Harmonizações base para peixe, carne, arroz, cozinha asiática, queijos e sobremesas.", outcome: "Resultado: recomendações rápidas que elevam ticket e experiência.", esPath: "/biblioteca-vino/maridajes", icon: Utensils },
      { title: "Servir e decidir melhor", description: "Temperatura, copo, doses, vinho a copo, rotação, margem e revisão mensal.", outcome: "Resultado: conhecimento que afeta vendas, stock e rentabilidade.", esPath: "/biblioteca-vino/guia-servicio", icon: ClipboardCheck },
    ],
    articlesTitle: "Primeiros guias para começar",
    articlesIntro:
      "Guias práticos para transformar aprendizagem em conversa de sala: provar, descrever, harmonizar, ler tipos, castas, regiões e estilos.",
    articleCta: "Ler guia",
    articleLinks: [
      {
        title: "Como provar vinho em cinco passos",
        description: "Um método repetível para observar, cheirar, provar e traduzir o vinho para o cliente.",
        path: "/pt/article/como-provar-vinho-em-cinco-passos",
      },
      {
        title: "Vocabulário de prova de vinho",
        description: "As palavras essenciais para aroma, estrutura, textura e final sem frases vazias.",
        path: "/pt/article/vocabulario-de-prova-de-vinho",
      },
      {
        title: "Harmonizações básicas para restaurantes",
        description: "Regras simples para recomendar com peixe, carne, arroz, queijo, cozinha asiática e sobremesas.",
        path: "/pt/article/harmonizacoes-basicas-para-restaurantes",
      },
      {
        title: "Tipos de vinho para entender uma carta",
        description: "Brancos, tintos, rosados, espumantes, doces e fortificados pela função em sala.",
        path: "/pt/article/tipos-de-vinho-para-entender-uma-carta",
      },
      {
        title: "Castas para conhecer ao começar",
        description: "Castas de referência para explicar estilo, preço, harmonização e alternativas na carta.",
        path: "/pt/article/castas-para-conhecer-ao-comecar",
      },
      {
        title: "Regiões vinícolas para conhecer",
        description: "Uma rota por regiões que explicam expectativa, preço e alternativas em sala.",
        path: "/pt/article/regioes-vinicolas-para-conhecer-em-restaurante",
      },
      {
        title: "Recomendar vinho por estilos",
        description: "Transformar frases do cliente em estilos claros, alternativas úteis e recomendações seguras.",
        path: "/pt/article/recomendar-vinho-por-estilos-restaurante",
        publishedAt: "2026-07-13T09:25:00+02:00",
      },
    ],
    methodTitle: "O método Winerim para aprender vinho na restauração",
    methodIntro:
      "Não se trata de memorizar enciclopédias. Cada pessoa de sala deve responder a três perguntas: o que é, com que combina e porque vale a pena.",
    method: [
      { title: "Do simples ao acionável", text: "Primeiro aprende-se a linguagem base; depois liga-se a pratos, preços e momentos de consumo." },
      { title: "Da ficha ao serviço", text: "Cada casta, região ou estilo deve terminar numa frase que o cliente entende." },
      { title: "Do conhecimento à margem", text: "Aprender vinho deve melhorar recomendação, rotação, vinho a copo e compras." },
    ],
    nextTitle: "Transformar aprendizagem numa carta que vende",
    nextText:
      "Se a equipa aprende vinho mas a carta continua a ser um PDF longo, o conhecimento não se ativa. A Winerim liga formação, fichas, harmonizações e análise.",
    analyzeCta: "Enviar carta para análise",
    libraryCta: "Ver Biblioteca do vinho",
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Isto substitui a Biblioteca do vinho?", a: "Não. A Biblioteca é a base de dados de castas, regiões, estilos, harmonizações e glossário. Aprender vinho é o percurso guiado para usar essa base na sala." },
      { q: "É pensado para principiantes?", a: "Sim. É pensado para equipas que não precisam de falar como sommeliers, mas sim recomendar melhor e com segurança." },
      { q: "Como se liga à Winerim?", a: "A Winerim usa este conhecimento para enriquecer fichas, harmonizações, recomendações e análise de carta." },
    ],
  },
};

const AprenderVino = () => {
  const { lang, localePath } = useLanguage();
  const copy = COPY[lang] || COPY.es;
  const visibleArticleLinks = copy.articleLinks.filter(isPublishedArticleLink);
  const canonicalPath = LEARN_WINE_ROUTES[lang] || LEARN_WINE_ROUTES.es;
  const canonicalUrl = `${CANONICAL_DOMAIN}${canonicalPath}`;
  const libraryUrl = getWineLibraryPath(lang, "/biblioteca-vino");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: copy.h1,
        description: copy.seoDescription,
        url: canonicalUrl,
        inLanguage: lang,
        provider: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
        educationalLevel: "Beginner",
        teaches: copy.steps.map((step) => step.title),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Winerim", item: CANONICAL_DOMAIN },
          { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: canonicalUrl },
        ],
      },
      {
        "@type": "ItemList",
        name: copy.sectionTitle,
        itemListElement: copy.steps.map((step, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: step.title,
          url: `${CANONICAL_DOMAIN}${getWineLibraryPath(lang, step.esPath)}`,
        })),
      },
      {
        "@type": "ItemList",
        name: copy.articlesTitle,
        itemListElement: visibleArticleLinks.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.title,
          url: `${CANONICAL_DOMAIN}${article.path}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        url={canonicalUrl}
        hreflang={getLearnWineHreflang()}
        structuredData={structuredData}
      />
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: copy.breadcrumb }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Compass size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{copy.badge}</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
              >
                {copy.h1}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8"
              >
                {copy.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to={localePath("/analisis-carta")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  {copy.primaryCta} <ArrowRight size={16} />
                </Link>
                <Link
                  to={libraryUrl}
                  className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all"
                >
                  {copy.secondaryCta}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid gap-4"
            >
              {copy.stats.map((stat) => (
                <div key={stat.label} className="border border-border bg-gradient-card rounded-xl p-6">
                  <p className="font-heading text-4xl font-bold text-wine">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-border bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Wine size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.sectionTitle}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{copy.sectionIntro}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
            {copy.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={index * 0.05}>
                  <Link
                    to={getWineLibraryPath(lang, step.esPath)}
                    className="group block h-full border border-border bg-background/65 rounded-xl p-5 hover:border-wine/40 hover:bg-wine/5 transition-all"
                  >
                    <div className="w-11 h-11 rounded-lg bg-wine/10 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <p className="text-xs font-semibold text-wine mb-2">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="font-heading text-lg font-semibold mb-3 group-hover:text-wine transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{step.outcome}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.articlesTitle}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{copy.articlesIntro}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {visibleArticleLinks.map((article, index) => (
              <ScrollReveal key={article.path} delay={index * 0.06}>
                <Link
                  to={article.path}
                  className="group block h-full border border-border bg-gradient-card rounded-xl p-6 hover:border-wine/40 hover:bg-wine/5 transition-all"
                >
                  <p className="text-xs font-semibold text-wine mb-3">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-wine transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{article.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-wine">
                    {copy.articleCta} <ArrowRight size={15} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <div className="sticky top-28">
                <div className="inline-flex items-center gap-2 text-wine mb-4">
                  <TrendingUp size={18} />
                  <span className="text-xs font-semibold tracking-widest uppercase">{copy.badge}</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{copy.methodTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">{copy.methodIntro}</p>
              </div>
            </ScrollReveal>

            <div className="grid gap-5">
              {copy.method.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.06}>
                  <div className="border border-border rounded-xl p-6 bg-gradient-card">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 size={20} className="text-wine mt-1 shrink-0" />
                      <div>
                        <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="border border-wine/20 bg-wine/5 rounded-2xl p-8 md:p-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-5">
                <MapPin size={22} className="text-wine" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{copy.nextTitle}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-7">{copy.nextText}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={localePath("/analisis-carta")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  {copy.analyzeCta} <ArrowRight size={16} />
                </Link>
                <Link
                  to={libraryUrl}
                  className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all"
                >
                  {copy.libraryCta}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.faqTitle}</h2>
          </ScrollReveal>
          <div className="grid gap-4">
            {copy.faqs.map((faq, index) => (
              <ScrollReveal key={faq.q} delay={index * 0.05}>
                <div className="border border-border rounded-xl p-6 bg-gradient-card">
                  <h3 className="font-heading text-base font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AprenderVino;
