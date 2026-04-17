import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Search, BookOpen, Utensils, Smartphone,
  TrendingUp, DollarSign, RefreshCw, Users, Sparkles,
  GlassWater, Eye, Layers, Globe, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";
import ScrollReveal from "@/components/ScrollReveal";

interface I18nData {
  metaTitle: string;
  metaDescription: string;
  url: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCta1: string;
  heroCta2: string;
  problemsHeading: string;
  problemsDesc: string;
  problem1: string;
  problem2: string;
  problem3: string;
  problem4: string;
  problemsConclusion: string;
  defLabel: string;
  defHeading: string;
  defText1: string;
  defText2: string;
  defQuote: string;
  featuresLabel: string;
  featuresHeading: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
  restaurantLabel: string;
  restaurantHeading: string;
  restaurantBenefit1Title: string;
  restaurantBenefit1Desc: string;
  restaurantBenefit2Title: string;
  restaurantBenefit2Desc: string;
  restaurantBenefit3Title: string;
  restaurantBenefit3Desc: string;
  restaurantBenefit4Title: string;
  restaurantBenefit4Desc: string;
  restaurantBenefit5Title: string;
  restaurantBenefit5Desc: string;
  guestLabel: string;
  guestHeading: string;
  guestBenefit1Title: string;
  guestBenefit1Desc: string;
  guestBenefit2Title: string;
  guestBenefit2Desc: string;
  guestBenefit3Title: string;
  guestBenefit3Desc: string;
  guestBenefit4Title: string;
  guestBenefit4Desc: string;
  futureLabel: string;
  futureHeading: string;
  futureText1: string;
  futureText2: string;
  futureText3: string;
  futureTag1: string;
  futureTag2: string;
  futureTag3: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaDesc: string;
  ctaBtn: string;
}

const i18n: I18nMap<I18nData> = {
  es: {
    metaTitle: "Carta de vinos digital | Menú interactivo para restaurantes",
    metaDescription: "Descubre qué es una carta de vinos digital y cómo los menús interactivos ayudan a restaurantes a vender más vino y mejorar experiencia.",
    url: "https://winerim.wine/carta-digital",
    heroBadge: "Menú de vinos digital",
    heroTitle1: "¿Qué es una ",
    heroTitle2: "carta de vinos digital",
    heroSubtitle: "Descubre cómo la digitalización transforma la forma en que los restaurantes presentan y venden vino.",
    heroCta1: "Solicitar demo",
    heroCta2: "Analizar mi carta",
    problemsHeading: "El problema con las ",
    problemsDesc: "La mayoría de restaurantes aún presentan sus vinos en menús impresos en papel o PDF estáticos. Estos formatos crean fricción para los clientes y dolores de cabeza operativos.",
    problem1: "Impresos en papel — costosos de actualizar y fáciles de dañar",
    problem2: "PDF estáticos — sin interactividad, pobre experiencia móvil",
    problem3: "Difíciles de actualizar — cada cambio requiere reimprimir",
    problem4: "Difíciles de navegar — los clientes desplazan páginas interminables",
    problemsConclusion: "Una carta de vinos digital resuelve todos estos problemas — haciendo el vino más fácil de explorar, vender y gestionar.",
    defLabel: "Definición",
    defHeading: "¿Qué es exactamente una ",
    defText1: "Una carta de vinos digital es un menú de vinos interactivo que los clientes exploran en su teléfono, tablet o cualquier dispositivo con navegador. En lugar de hojeador páginas, los clientes buscan, filtran y descubren vinos a través de una interfaz visual e intuitiva.",
    defText2: "Permite a los restaurantes presentar vinos de forma más clara y atractiva — con descripciones detalladas, sugerencias de maridaje e inteligencia que ayuda a los clientes a encontrar la botella perfecta.",
    defQuote: "Piénsalo como un sommelier en el bolsillo de cada cliente — disponible 24/7, siempre actualizado y nunca intimidante.",
    featuresLabel: "Características",
    featuresHeading: "Qué hace que una buena ",
    feature1Title: "Búsqueda y filtros",
    feature1Desc: "Los clientes pueden filtrar vinos por uva, región, precio, estilo o color. Encontrar la botella correcta toma segundos en lugar de minutos.",
    feature2Title: "Descripciones detalladas",
    feature2Desc: "Cada vino incluye notas de cata, origen, productor y calificaciones. Los clientes se sienten informados y seguros en su elección.",
    feature3Title: "Sugerencias de maridaje",
    feature3Desc: "Recomendaciones inteligentes que emparejan vinos con platos de tu menú, aumentando venta de vino y satisfacción.",
    feature4Title: "Información visual",
    feature4Desc: "Etiquetas, imágenes de botellas y perfiles de cata visuales que hacen el vino accesible, no solo para expertos.",
    feature5Title: "Navegación interactiva",
    feature5Desc: "Interfaz intuitiva optimizada para teléfono y tablet. Los clientes exploran tu lista como una colección curada.",
    restaurantLabel: "Para restaurantes",
    restaurantHeading: "Por qué restaurantes eligen ",
    restaurantBenefit1Title: "Aumentar venta de vino",
    restaurantBenefit1Desc: "Recomendaciones guiadas y sugerencias inteligentes impulsan mayor gasto promedio por mesa.",
    restaurantBenefit2Title: "Mejorar experiencia",
    restaurantBenefit2Desc: "Una carta atractiva y fácil de usar hace que cada cliente se sienta con sommelier personal.",
    restaurantBenefit3Title: "Actualizar al instante",
    restaurantBenefit3Desc: "Añade nuevas añadas, quita botellas agotadas, o ajusta precios en tiempo real — sin reimprimir.",
    restaurantBenefit4Title: "Reducir costes",
    restaurantBenefit4Desc: "Elimina costes de impresión. Cada actualización es instantánea y gratis.",
    restaurantBenefit5Title: "Simplificar el vino",
    restaurantBenefit5Desc: "Perfiles visuales y descripciones accesibles ayudan clientes descubrir vinos que amarán.",
    guestLabel: "Para clientes",
    guestHeading: "Una mejor experiencia para ",
    guestBenefit1Title: "Explorar más fácil",
    guestBenefit1Desc: "Filtros, categorías y búsqueda hacen sencillo navegar cientos de vinos sin sentirse abrumado.",
    guestBenefit2Title: "Aprender sobre vino",
    guestBenefit2Desc: "Notas de cata, mapas y descripciones convierten cada copa en experiencia de aprendizaje.",
    guestBenefit3Title: "Descubrir botellas",
    guestBenefit3Desc: "Recomendaciones inteligentes presentan vinos que el cliente no habría encontrado.",
    guestBenefit4Title: "Maridar con comida",
    guestBenefit4Desc: "Sugerencias instantáneas de maridaje eliminan la incertidumbre al elegir vino perfecto.",
    futureLabel: "El futuro es digital",
    futureHeading: "Por qué cartas de vinos digitales son el ",
    futureText1: "Restaurantes en todo el mundo adoptan herramientas digitales para simplificar operaciones y mejorar experiencia. La carta de vinos — a menudo la parte más compleja — no es excepción.",
    futureText2: "Las cartas digitales no son solo una tendencia. Se convierten en el estándar para la hospitalidad moderna. Los clientes esperan la misma experiencia intuitiva que en otros servicios — también en la mesa.",
    futureText3: "Plataformas como Winerim van más allá. Con recomendaciones impulsadas por IA, analítica en tiempo real e inteligencia, Winerim convierte tu carta en una herramienta de venta activa.",
    futureTag1: "Experiencia interactiva",
    futureTag2: "Recomendaciones con IA",
    futureTag3: "Analítica en tiempo real",
    ctaLabel: "Empieza",
    ctaHeading: "Convierte tu carta de vinos en una experiencia ",
    ctaDesc: "Descubre cómo Winerim transforma el programa de vino de tu restaurante. Solicita demo personalizada con nuestro equipo.",
    ctaBtn: "Solicitar demo",
  },
  en: {
    metaTitle: "What is a Digital Wine List? | Interactive Wine Menu for Restaurants",
    metaDescription: "Discover what a digital wine list is and how interactive wine menus help restaurants increase wine sales, improve guest experience, and reduce costs.",
    url: "https://winerim.wine/en/digital-wine-list",
    heroBadge: "Digital wine menu",
    heroTitle1: "What is a ",
    heroTitle2: "digital wine list",
    heroSubtitle: "Discover how digital wine lists are transforming the way restaurants present and sell wine.",
    heroCta1: "Request a demo",
    heroCta2: "Analyze my wine list",
    problemsHeading: "The problem with ",
    problemsDesc: "Most restaurants still present their wines on printed paper menus or static PDFs. These formats create friction for guests and operational headaches for staff.",
    problem1: "Printed on paper — expensive to update and easy to damage",
    problem2: "Static PDFs — no interactivity, poor mobile experience",
    problem3: "Difficult to update — every change means reprinting",
    problem4: "Hard to navigate — guests scroll through endless pages",
    problemsConclusion: "A digital wine list solves all of these problems — making wine easier to explore, easier to sell, and easier to manage.",
    defLabel: "Definition",
    defHeading: "What exactly is a ",
    defText1: "A digital wine list is an interactive wine menu that guests can explore on their phone, tablet, or any device with a browser. Instead of flipping through pages of text, guests search, filter, and discover wines through a visual, intuitive interface.",
    defText2: "It allows restaurants to present wines in a clearer, more engaging way — with detailed descriptions, food pairing suggestions, and smart recommendations that help guests find the perfect bottle.",
    defQuote: "Think of it as a sommelier in every guest's pocket — available 24/7, always up to date, and never intimidating.",
    featuresLabel: "Features",
    featuresHeading: "What makes a great ",
    feature1Title: "Search and filters",
    feature1Desc: "Guests can filter wines by grape, region, price, style, or color. Finding the right bottle takes seconds instead of minutes.",
    feature2Title: "Detailed wine descriptions",
    feature2Desc: "Each wine includes tasting notes, origin, producer, and ratings. Guests feel informed and confident in their choice.",
    feature3Title: "Food pairing suggestions",
    feature3Desc: "Smart pairing recommendations that match wines with dishes on your menu, increasing both wine sales and guest satisfaction.",
    feature4Title: "Visual wine information",
    feature4Desc: "Labels, bottle images, and visual tasting profiles that make wine approachable for every guest, not just experts.",
    feature5Title: "Interactive navigation",
    feature5Desc: "Intuitive interface optimized for phones and tablets. Guests explore your wine list like browsing a curated collection.",
    restaurantLabel: "For restaurants",
    restaurantHeading: "Why restaurants choose ",
    restaurantBenefit1Title: "Increase wine sales",
    restaurantBenefit1Desc: "Guided recommendations and smart suggestions drive higher average spend per table.",
    restaurantBenefit2Title: "Improve guest experience",
    restaurantBenefit2Desc: "An engaging, easy-to-use wine list makes every guest feel like they have a personal sommelier.",
    restaurantBenefit3Title: "Update wines instantly",
    restaurantBenefit3Desc: "Add new vintages, remove sold-out bottles, or adjust prices in real time — no reprinting.",
    restaurantBenefit4Title: "Reduce printing costs",
    restaurantBenefit4Desc: "Eliminate recurring printing expenses. Every update is instant and free.",
    restaurantBenefit5Title: "Make wine easier to understand",
    restaurantBenefit5Desc: "Visual profiles and plain-language descriptions help guests discover wines they'll love.",
    guestLabel: "For guests",
    guestHeading: "A better wine experience for ",
    guestBenefit1Title: "Easier to explore wines",
    guestBenefit1Desc: "Filters, categories, and search make it simple to browse hundreds of wines without feeling overwhelmed.",
    guestBenefit2Title: "Learn about wine",
    guestBenefit2Desc: "Tasting notes, region maps, and grape descriptions turn every glass into a learning experience.",
    guestBenefit3Title: "Discover new bottles",
    guestBenefit3Desc: "Smart recommendations introduce guests to wines they wouldn't have found on a traditional list.",
    guestBenefit4Title: "Pair wine with food",
    guestBenefit4Desc: "Instant pairing suggestions remove the guesswork from choosing the perfect wine for every course.",
    futureLabel: "The future is digital",
    futureHeading: "Why digital wine lists are the ",
    futureText1: "Restaurants worldwide are adopting digital tools to streamline operations and enhance the guest experience. The wine list — often the most complex and profitable part of the menu — is no exception.",
    futureText2: "Digital wine lists aren't just a trend. They're becoming the standard for modern hospitality. Guests expect the same intuitive, visual experience they get from every other digital service — and they expect it at the table.",
    futureText3: "Platforms like Winerim go beyond a simple digital menu. With AI-powered recommendations, real-time analytics, and intelligent wine mapping, Winerim turns your wine list into an active sales tool that increases revenue automatically.",
    futureTag1: "Interactive experience",
    futureTag2: "AI-powered recommendations",
    futureTag3: "Real-time analytics",
    ctaLabel: "Get started",
    ctaHeading: "Turn your wine list into an ",
    ctaDesc: "See how Winerim can transform your restaurant's wine program. Book a personalized demo with our team.",
    ctaBtn: "Request a demo",
  },
  it: {
    metaTitle: "Che cos'è una Carta dei Vini Digitale? | Menù di Vini Interattivo per Ristoranti",
    metaDescription: "Scopri cos'è una carta dei vini digitale e come i menù interattivi aiutano i ristoranti a vendere più vino e migliorare l'esperienza.",
    url: "https://winerim.wine/it/carta-vini-digitale",
    heroBadge: "Menù di vini digitale",
    heroTitle1: "Che cos'è una ",
    heroTitle2: "carta dei vini digitale",
    heroSubtitle: "Scopri come le carte dei vini digitali stanno trasformando il modo in cui i ristoranti presentano e vendono vino.",
    heroCta1: "Richiedi demo",
    heroCta2: "Analizza la mia carta",
    problemsHeading: "Il problema con le ",
    problemsDesc: "La maggior parte dei ristoranti presenta ancora i vini su menù stampati o PDF statici. Questi formati creano attrito per gli ospiti e mal di testa operativi.",
    problem1: "Stampati su carta — costosi da aggiornare e facili da danneggiare",
    problem2: "PDF statici — nessuna interattività, scarsa esperienza mobile",
    problem3: "Difficili da aggiornare — ogni cambio richiede ristampa",
    problem4: "Difficili da navigare — gli ospiti scorrono pagine infinite",
    problemsConclusion: "Una carta dei vini digitale risolve tutti questi problemi — rendendo il vino più facile da esplorare, vendere e gestire.",
    defLabel: "Definizione",
    defHeading: "Che cos'è esattamente una ",
    defText1: "Una carta dei vini digitale è un menù di vini interattivo che gli ospiti possono esplorare sul loro telefono, tablet o qualsiasi dispositivo con browser. Invece di sfogliare pagine, gli ospiti cercano, filtrano e scoprono vini attraverso un'interfaccia visiva e intuitiva.",
    defText2: "Consente ai ristoranti di presentare vini in modo più chiaro e coinvolgente — con descrizioni dettagliate, suggerimenti di abbinamento e raccomandazioni intelligenti che aiutano gli ospiti a trovare la bottiglia perfetta.",
    defQuote: "Pensala come un sommelier in tasca di ogni ospite — disponibile 24/7, sempre aggiornato e mai intimidatorio.",
    featuresLabel: "Caratteristiche",
    featuresHeading: "Cosa rende una grande ",
    feature1Title: "Ricerca e filtri",
    feature1Desc: "Gli ospiti possono filtrare vini per uva, regione, prezzo, stile o colore. Trovare la bottiglia giusta prende secondi invece di minuti.",
    feature2Title: "Descrizioni dettagliate",
    feature2Desc: "Ogni vino include note di degustazione, origine, produttore e valutazioni. Gli ospiti si sentono informati e sicuri nella loro scelta.",
    feature3Title: "Suggerimenti di abbinamento",
    feature3Desc: "Raccomandazioni intelligenti che abbinano vini ai piatti del menu, aumentando vendite e soddisfazione.",
    feature4Title: "Informazioni visive",
    feature4Desc: "Etichette, immagini di bottiglie e profili di degustazione visivi che rendono il vino accessibile a tutti.",
    feature5Title: "Navigazione interattiva",
    feature5Desc: "Interfaccia intuitiva ottimizzata per telefoni e tablet. Gli ospiti esplorano la tua lista come una collezione curata.",
    restaurantLabel: "Per ristoranti",
    restaurantHeading: "Perché i ristoranti scelgono ",
    restaurantBenefit1Title: "Aumentare vendite di vino",
    restaurantBenefit1Desc: "Raccomandazioni guidate e suggerimenti intelligenti aumentano la spesa media per tavolo.",
    restaurantBenefit2Title: "Migliorare esperienza ospiti",
    restaurantBenefit2Desc: "Una carta coinvolgente e facile da usare fa sentire ogni ospite come avesse un sommelier personale.",
    restaurantBenefit3Title: "Aggiornare istantaneamente",
    restaurantBenefit3Desc: "Aggiungi nuove annate, rimuovi bottiglie esaurite o adatta prezzi in tempo reale — senza ristampa.",
    restaurantBenefit4Title: "Ridurre costi",
    restaurantBenefit4Desc: "Elimina costi di stampa ricorrenti. Ogni aggiornamento è istantaneo e gratuito.",
    restaurantBenefit5Title: "Rendere il vino più comprensibile",
    restaurantBenefit5Desc: "Profili visivi e descrizioni semplici aiutano gli ospiti scoprire vini che ameranno.",
    guestLabel: "Per gli ospiti",
    guestHeading: "Un'esperienza migliore per ",
    guestBenefit1Title: "Più facile esplorare",
    guestBenefit1Desc: "Filtri, categorie e ricerca rendono semplice navigare centinaia di vini senza sentirsi sopraffatti.",
    guestBenefit2Title: "Imparare sul vino",
    guestBenefit2Desc: "Note di degustazione, mappe e descrizioni trasformano ogni bicchiere in esperienza di apprendimento.",
    guestBenefit3Title: "Scoprire nuove bottiglie",
    guestBenefit3Desc: "Raccomandazioni intelligenti introducono gli ospiti a vini che non avrebbero trovato.",
    guestBenefit4Title: "Abbinare con il cibo",
    guestBenefit4Desc: "Suggerimenti istantanei eliminano l'incertezza nel scegliere il vino perfetto.",
    futureLabel: "Il futuro è digitale",
    futureHeading: "Perché le carte dei vini digitali sono il ",
    futureText1: "I ristoranti in tutto il mondo stanno adottando strumenti digitali per semplificare le operazioni e migliorare l'esperienza. La carta dei vini — spesso la parte più complessa — non fa eccezione.",
    futureText2: "Le carte dei vini digitali non sono solo una tendenza. Stanno diventando lo standard per l'ospitalità moderna. Gli ospiti si aspettano la stessa esperienza intuitiva da ogni servizio digitale — e la si aspettano al tavolo.",
    futureText3: "Piattaforme come Winerim vanno oltre un semplice menù digitale. Con raccomandazioni basate su IA, analisi in tempo reale e mappatura intelligente, Winerim trasforma la tua carta in uno strumento di vendita attivo.",
    futureTag1: "Esperienza interattiva",
    futureTag2: "Raccomandazioni con IA",
    futureTag3: "Analisi in tempo reale",
    ctaLabel: "Inizia",
    ctaHeading: "Trasforma la tua carta dei vini in un'esperienza ",
    ctaDesc: "Scopri come Winerim può trasformare il programma di vini del tuo ristorante. Prenota una demo personalizzata con il nostro team.",
    ctaBtn: "Richiedi demo",
  },
  fr: {
    metaTitle: "Qu'est-ce qu'une Carte des Vins Numérique ? | Menu Interactif pour Restaurants",
    metaDescription: "Découvrez ce qu'est une carte des vins numérique et comment les menus interactifs aident les restaurants à vendre plus de vin et améliorer l'expérience.",
    url: "https://winerim.wine/fr/carte-vins-numerique",
    heroBadge: "Menu de vins numérique",
    heroTitle1: "Qu'est-ce qu'une ",
    heroTitle2: "carte des vins numérique",
    heroSubtitle: "Découvrez comment les cartes des vins numériques transforment la façon dont les restaurants présentent et vendent du vin.",
    heroCta1: "Demander une démo",
    heroCta2: "Analyser ma carte",
    problemsHeading: "Le problème avec les ",
    problemsDesc: "La plupart des restaurants présentent encore leurs vins sur des menus imprimés ou des PDF statiques. Ces formats créent de la friction pour les clients et des problèmes opérationnels.",
    problem1: "Imprimés sur papier — coûteux à mettre à jour et faciles à endommager",
    problem2: "PDF statiques — pas d'interactivité, mauvaise expérience mobile",
    problem3: "Difficiles à mettre à jour — chaque changement nécessite une réimpression",
    problem4: "Difficiles à naviguer — les clients font défiler des pages infinies",
    problemsConclusion: "Une carte des vins numérique résout tous ces problèmes — rendant le vin plus facile à explorer, vendre et gérer.",
    defLabel: "Définition",
    defHeading: "Qu'est-ce qu'une carte des vins ",
    defText1: "Une carte des vins numérique est un menu de vins interactif que les clients peuvent explorer sur leur téléphone, tablette ou n'importe quel appareil avec navigateur. Au lieu de feuilleter des pages, les clients recherchent, filtrent et découvrent des vins via une interface visuelle et intuitive.",
    defText2: "Elle permet aux restaurants de présenter les vins de manière plus claire et engageante — avec des descriptions détaillées, des suggestions d'accords et des recommandations intelligentes qui aident les clients à trouver la bouteille parfaite.",
    defQuote: "Pensez-y comme un sommelier dans la poche de chaque client — disponible 24/7, toujours à jour et jamais intimidant.",
    featuresLabel: "Caractéristiques",
    featuresHeading: "Ce qui rend une excellente ",
    feature1Title: "Recherche et filtres",
    feature1Desc: "Les clients peuvent filtrer les vins par cépage, région, prix, style ou couleur. Trouver la bonne bouteille prend des secondes au lieu de minutes.",
    feature2Title: "Descriptions détaillées",
    feature2Desc: "Chaque vin comprend des notes de dégustation, l'origine, le producteur et les évaluations. Les clients se sentent informés et confiants.",
    feature3Title: "Suggestions d'accords",
    feature3Desc: "Des recommandations intelligentes qui associent les vins aux plats de votre menu, augmentant ventes et satisfaction.",
    feature4Title: "Informations visuelles",
    feature4Desc: "Étiquettes, images de bouteilles et profils de dégustation visuels qui rendent le vin accessible à tous.",
    feature5Title: "Navigation interactive",
    feature5Desc: "Interface intuitive optimisée pour téléphones et tablettes. Les clients explorent votre liste comme une collection organisée.",
    restaurantLabel: "Pour restaurants",
    restaurantHeading: "Pourquoi les restaurants choisissent ",
    restaurantBenefit1Title: "Augmenter les ventes de vin",
    restaurantBenefit1Desc: "Les recommandations guidées et suggestions intelligentes augmentent la dépense moyenne par table.",
    restaurantBenefit2Title: "Améliorer l'expérience",
    restaurantBenefit2Desc: "Une carte engageante et facile d'utilisation fait sentir à chaque client qu'il a un sommelier personnel.",
    restaurantBenefit3Title: "Mettre à jour instantanément",
    restaurantBenefit3Desc: "Ajoutez de nouveaux millésimes, supprimez les bouteilles vendues ou ajustez les prix en temps réel — sans réimpression.",
    restaurantBenefit4Title: "Réduire les coûts",
    restaurantBenefit4Desc: "Éliminez les frais d'impression récurrents. Chaque mise à jour est instantanée et gratuite.",
    restaurantBenefit5Title: "Simplifier le vin",
    restaurantBenefit5Desc: "Les profils visuels et descriptions simples aident les clients découvrir des vins qu'ils aimeront.",
    guestLabel: "Pour les clients",
    guestHeading: "Une meilleure expérience pour ",
    guestBenefit1Title: "Plus facile à explorer",
    guestBenefit1Desc: "Filtres, catégories et recherche rendent simple de naviguer des centaines de vins sans se sentir submergé.",
    guestBenefit2Title: "En savoir plus sur le vin",
    guestBenefit2Desc: "Les notes de dégustation, cartes et descriptions transforment chaque verre en expérience d'apprentissage.",
    guestBenefit3Title: "Découvrir de nouvelles bouteilles",
    guestBenefit3Desc: "Les recommandations intelligentes présentent des vins que les clients n'auraient pas trouvés.",
    guestBenefit4Title: "Accorder vin et nourriture",
    guestBenefit4Desc: "Les suggestions instantanées d'accords éliminent l'hésitation en choisissant le vin parfait.",
    futureLabel: "L'avenir est numérique",
    futureHeading: "Pourquoi les cartes des vins numériques sont l'",
    futureText1: "Les restaurants du monde entier adoptent des outils numériques pour rationaliser les opérations et améliorer l'expérience. La carte des vins — souvent la partie la plus complexe — ne fait pas exception.",
    futureText2: "Les cartes des vins numériques ne sont pas qu'une tendance. Elles deviennent la norme pour l'hospitalité moderne. Les clients s'attendent à la même expérience intuitive que d'autres services numériques — et l'attendent à table.",
    futureText3: "Des plateformes comme Winerim vont au-delà. Avec des recommandations basées sur l'IA, l'analytique en temps réel et le mapping intelligent, Winerim transforme votre carte en outil de vente actif.",
    futureTag1: "Expérience interactive",
    futureTag2: "Recommandations basées sur l'IA",
    futureTag3: "Analytique en temps réel",
    ctaLabel: "Commencer",
    ctaHeading: "Transformez votre carte des vins en une expérience ",
    ctaDesc: "Voyez comment Winerim peut transformer le programme de vins de votre restaurant. Réservez une démo personnalisée avec notre équipe.",
    ctaBtn: "Demander une démo",
  },
  de: {
    metaTitle: "Was ist eine digitale Weinkarte? | Interaktives Weinmenü für Restaurants",
    metaDescription: "Entdecken Sie, was eine digitale Weinkarte ist und wie interaktive Weinmenüs Restaurants helfen, mehr Wein zu verkaufen und die Gasterfahrung zu verbessern.",
    url: "https://winerim.wine/de/digitale-weinkarte",
    heroBadge: "Digitales Weinmenü",
    heroTitle1: "Was ist eine ",
    heroTitle2: "digitale Weinkarte",
    heroSubtitle: "Entdecken Sie, wie digitale Weinkarten die Art, wie Restaurants Wein präsentieren und verkaufen, verändern.",
    heroCta1: "Demo anfordern",
    heroCta2: "Meine Karte analysieren",
    problemsHeading: "Das Problem mit ",
    problemsDesc: "Die meisten Restaurants präsentieren ihre Weine immer noch auf gedruckten Papierkarten oder statischen PDFs. Diese Formate schaffen Reibung für Gäste und betriebliche Kopfschmerzen.",
    problem1: "Auf Papier gedruckt — teuer zu aktualisieren und leicht zu beschädigen",
    problem2: "Statische PDFs — keine Interaktivität, schlechte Mobilererfahrung",
    problem3: "Schwierig zu aktualisieren — jede Änderung erfordert Neudruckk",
    problem4: "Schwer zu navigieren — Gäste scrollen durch endlose Seiten",
    problemsConclusion: "Eine digitale Weinkarte löst alle diese Probleme — macht Wein leichter zu erkunden, zu verkaufen und zu verwalten.",
    defLabel: "Definition",
    defHeading: "Was ist eine digitale ",
    defText1: "Eine digitale Weinkarte ist ein interaktives Weinmenü, das Gäste auf ihrem Telefon, Tablet oder einem beliebigen Gerät mit Browser erkunden können. Anstatt durch Seiten zu blättern, suchen, filtern und entdecken Gäste Weine über eine visuelle, intuitive Oberfläche.",
    defText2: "Sie ermöglicht es Restaurants, Weine auf klarere und ansprechendere Weise zu präsentieren — mit ausführlichen Beschreibungen, Speisenbegleitungsvorschlägen und intelligenten Empfehlungen, die Gästen helfen, die perfekte Flasche zu finden.",
    defQuote: "Stellen Sie es sich wie einen Sommelier in der Tasche jeden Gastes vor — 24/7 verfügbar, immer aktuell und nie einschüchternd.",
    featuresLabel: "Funktionen",
    featuresHeading: "Was macht eine großartige ",
    feature1Title: "Suche und Filter",
    feature1Desc: "Gäste können Weine nach Rebsorte, Region, Preis, Stil oder Farbe filtern. Die richtige Flasche zu finden dauert Sekunden statt Minuten.",
    feature2Title: "Detaillierte Beschreibungen",
    feature2Desc: "Jeder Wein enthält Verkostungsnotizen, Herkunft, Erzeuger und Bewertungen. Gäste fühlen sich informiert und sicher.",
    feature3Title: "Speisenbegleitungsvorschläge",
    feature3Desc: "Intelligente Empfehlungen, die Weine mit Gerichten auf Ihrer Speisekarte kombinieren, um Weinverkauf und Zufriedenheit zu erhöhen.",
    feature4Title: "Visuelle Weininformationen",
    feature4Desc: "Etiketten, Flaschenbilder und visuelle Verkostungsprofile, die Wein für jeden zugänglich machen.",
    feature5Title: "Interaktive Navigation",
    feature5Desc: "Intuitive, für Telefone und Tablets optimierte Oberfläche. Gäste erkunden Ihre Liste wie eine kuratierte Sammlung.",
    restaurantLabel: "Für Restaurants",
    restaurantHeading: "Warum Restaurants wählen ",
    restaurantBenefit1Title: "Weinverkauf erhöhen",
    restaurantBenefit1Desc: "Geführte Empfehlungen und intelligente Vorschläge führen zu höherem Durchschnittsumsatz pro Tisch.",
    restaurantBenefit2Title: "Gasterfahrung verbessern",
    restaurantBenefit2Desc: "Eine ansprechende, einfach zu bedienende Weinkarte lässt jeden Gast fühlen, dass er einen persönlichen Sommelier hat.",
    restaurantBenefit3Title: "Sofort aktualisieren",
    restaurantBenefit3Desc: "Fügen Sie neue Jahrgänge hinzu, entfernen Sie ausverkaufte Flaschen oder passen Sie Preise in Echtzeit an — ohne Neudruck.",
    restaurantBenefit4Title: "Druckkosten senken",
    restaurantBenefit4Desc: "Eliminieren Sie wiederkehrende Druckkosten. Jede Aktualisierung ist sofort und kostenlos.",
    restaurantBenefit5Title: "Wein verständlicher machen",
    restaurantBenefit5Desc: "Visuelle Profile und einfache Beschreibungen helfen Gästen, Weine zu entdecken, die sie lieben.",
    guestLabel: "Für Gäste",
    guestHeading: "Ein besseres Weinerlebnis für ",
    guestBenefit1Title: "Leichter zu erkunden",
    guestBenefit1Desc: "Filter, Kategorien und Suche machen es einfach, hunderte Weine zu durchsuchen ohne sich überwältigt zu fühlen.",
    guestBenefit2Title: "Über Wein lernen",
    guestBenefit2Desc: "Verkostungsnotizen, Karten und Beschreibungen verwandeln jedes Glas in ein Lerneerlebnis.",
    guestBenefit3Title: "Neue Flaschen entdecken",
    guestBenefit3Desc: "Intelligente Empfehlungen stellen Gäste Weine vor, die sie nicht gefunden hätten.",
    guestBenefit4Title: "Wein mit Essen kombinieren",
    guestBenefit4Desc: "Sofortige Speisenbegleitungsvorschläge beseitigen Unsicherheit beim Auswählen des perfekten Weins.",
    futureLabel: "Die Zukunft ist digital",
    futureHeading: "Warum digitale Weinkarten die ",
    futureText1: "Restaurants weltweit nutzen digitale Tools, um Betriebsabläufe zu rationalisieren und die Gasterfahrung zu verbessern. Die Weinkarte — oft der komplexeste Teil — ist keine Ausnahme.",
    futureText2: "Digitale Weinkarten sind nicht nur ein Trend. Sie werden zum Standard in moderner Gastlichkeit. Gäste erwarten die gleiche intuitive, visuelle Erfahrung wie bei anderen digitalen Diensten — und erwarten sie auch am Tisch.",
    futureText3: "Plattformen wie Winerim gehen darüber hinaus. Mit KI-gesteuerten Empfehlungen, Echtzeit-Analytik und intelligenter Weinkartierung verwandelt Winerim Ihre Karte in ein aktives Verkaufsinstrument.",
    futureTag1: "Interaktive Erfahrung",
    futureTag2: "KI-gesteuerte Empfehlungen",
    futureTag3: "Echtzeit-Analytik",
    ctaLabel: "Beginnen Sie",
    ctaHeading: "Verwandeln Sie Ihre Weinkarte in eine ",
    ctaDesc: "Sehen Sie, wie Winerim das Weinprogramm Ihres Restaurants transformieren kann. Buchen Sie eine persönliche Demo mit unserem Team.",
    ctaBtn: "Demo anfordern",
  },
  pt: {
    metaTitle: "O que é uma Carta de Vinhos Digital? | Menu Interativo para Restaurantes",
    metaDescription: "Descubra o que é uma carta de vinhos digital e como menus interativos ajudam restaurantes a vender mais vinho e melhorar a experiência.",
    url: "https://winerim.wine/pt/carta-de-vinhos-digital",
    heroBadge: "Menu de vinho digital",
    heroTitle1: "O que é uma ",
    heroTitle2: "carta de vinho digital",
    heroSubtitle: "Descubra como as cartas de vinhos digitais estão transformando a forma como os restaurantes apresentam e vendem vinho.",
    heroCta1: "Pedir demo",
    heroCta2: "Analisar a minha carta",
    problemsHeading: "O problema com as ",
    problemsDesc: "A maioria dos restaurantes ainda apresenta seus vinhos em menus impressos em papel ou PDFs estáticos. Estes formatos criam atrito para os clientes e dores operacionais.",
    problem1: "Impressos em papel — caros de atualizar e fáceis de danificar",
    problem2: "PDFs estáticos — sem interatividade, má experiência móvel",
    problem3: "Difíceis de atualizar — cada mudança requer reimpressão",
    problem4: "Difíceis de navegar — clientes rolam páginas infinitas",
    problemsConclusion: "Uma carta de vinho digital resolve todos estes problemas — tornando o vinho mais fácil de explorar, vender e gerir.",
    defLabel: "Definição",
    defHeading: "O que exatamente é uma ",
    defText1: "Uma carta de vinho digital é um menu de vinho interativo que os clientes podem explorar no seu telefone, tablet ou qualquer dispositivo com navegador. Em vez de folhear páginas, os clientes pesquisam, filtram e descobrem vinhos através de uma interface visual e intuitiva.",
    defText2: "Permite aos restaurantes apresentar vinhos de forma mais clara e envolvente — com descrições detalhadas, sugestões de harmonizações e recomendações inteligentes que ajudam os clientes a encontrar a garrafa perfeita.",
    defQuote: "Pense nela como um escanção no bolso de cada cliente — disponível 24/7, sempre atualizado e nunca intimidante.",
    featuresLabel: "Características",
    featuresHeading: "O que torna uma grande ",
    feature1Title: "Pesquisa e filtros",
    feature1Desc: "Os clientes podem filtrar vinhos por casta, região, preço, estilo ou cor. Encontrar a garrafa certa leva segundos em vez de minutos.",
    feature2Title: "Descrições detalhadas",
    feature2Desc: "Cada vinho inclui notas de prova, origem, produtor e classificações. Os clientes sentem-se informados e confiantes.",
    feature3Title: "Sugestões de harmonização",
    feature3Desc: "Recomendações inteligentes que combinam vinhos com pratos do seu menu, aumentando vendas e satisfação.",
    feature4Title: "Informações visuais",
    feature4Desc: "Rótulos, imagens de garrafas e perfis de prova visuais que tornam o vinho acessível a todos.",
    feature5Title: "Navegação interativa",
    feature5Desc: "Interface intuitiva otimizada para telefones e tablets. Os clientes exploram a sua lista como uma coleção curada.",
    restaurantLabel: "Para restaurantes",
    restaurantHeading: "Porque restaurantes escolhem ",
    restaurantBenefit1Title: "Aumentar vendas de vinho",
    restaurantBenefit1Desc: "Recomendações guiadas e sugestões inteligentes aumentam o gasto médio por mesa.",
    restaurantBenefit2Title: "Melhorar experiência",
    restaurantBenefit2Desc: "Uma carta envolvente e fácil de usar faz cada cliente sentir que tem um escanção pessoal.",
    restaurantBenefit3Title: "Atualizar instantaneamente",
    restaurantBenefit3Desc: "Adicione novas colheitas, remova garrafas esgotadas ou ajuste preços em tempo real — sem reimpressão.",
    restaurantBenefit4Title: "Reduzir custos",
    restaurantBenefit4Desc: "Elimine despesas de impressão recorrentes. Cada atualização é instantânea e gratuita.",
    restaurantBenefit5Title: "Tornar o vinho mais compreensível",
    restaurantBenefit5Desc: "Perfis visuais e descrições simples ajudam clientes descobrir vinhos que amarão.",
    guestLabel: "Para clientes",
    guestHeading: "Uma experiência melhor para ",
    guestBenefit1Title: "Mais fácil de explorar",
    guestBenefit1Desc: "Filtros, categorias e pesquisa tornam simples navegar centenas de vinhos sem se sentir sobrecarregado.",
    guestBenefit2Title: "Aprender sobre vinho",
    guestBenefit2Desc: "Notas de prova, mapas e descrições transformam cada copo numa experiência de aprendizagem.",
    guestBenefit3Title: "Descobrir novas garrafas",
    guestBenefit3Desc: "Recomendações inteligentes apresentam vinhos que os clientes não teriam encontrado.",
    guestBenefit4Title: "Harmonizar vinho com comida",
    guestBenefit4Desc: "Sugestões instantâneas de harmonização removem a incerteza ao escolher o vinho perfeito.",
    futureLabel: "O futuro é digital",
    futureHeading: "Porque as cartas de vinhos digitais são o ",
    futureText1: "Restaurantes em todo o mundo estão a adotar ferramentas digitais para simplificar operações e melhorar a experiência. A carta de vinhos — frequentemente a parte mais complexa — não é exceção.",
    futureText2: "As cartas de vinhos digitais não são apenas uma tendência. Estão a tornar-se o padrão para a hospitalidade moderna. Os clientes esperam a mesma experiência intuitiva que de outros serviços digitais — e esperam-na à mesa.",
    futureText3: "Plataformas como a Winerim vão além. Com recomendações alimentadas por IA, analítica em tempo real e mapeamento inteligente, a Winerim transforma a sua carta numa ferramenta de venda ativa.",
    futureTag1: "Experiência interativa",
    futureTag2: "Recomendações com IA",
    futureTag3: "Analítica em tempo real",
    ctaLabel: "Começar",
    ctaHeading: "Transforme a sua carta de vinhos numa experiência ",
    ctaDesc: "Veja como a Winerim pode transformar o programa de vinhos do seu restaurante. Marque uma demo personalizada com a nossa equipa.",
    ctaBtn: "Pedir demo",
  },
};

const traditionalProblems = [
  { icon: BookOpen, text: "Printed on paper — expensive to update and easy to damage" },
  { icon: Layers, text: "Static PDFs — no interactivity, poor mobile experience" },
  { icon: RefreshCw, text: "Difficult to update — every change means reprinting" },
  { icon: Search, text: "Hard to navigate — guests scroll through endless pages" },
];

const features = [
  { icon: Search, title: "Search and filters", desc: "Guests can filter wines by grape, region, price, style, or color. Finding the right bottle takes seconds instead of minutes." },
  { icon: BookOpen, title: "Detailed wine descriptions", desc: "Each wine includes tasting notes, origin, producer, and ratings. Guests feel informed and confident in their choice." },
  { icon: Utensils, title: "Food pairing suggestions", desc: "Smart pairing recommendations that match wines with dishes on your menu, increasing both wine sales and guest satisfaction." },
  { icon: Eye, title: "Visual wine information", desc: "Labels, bottle images, and visual tasting profiles that make wine approachable for every guest, not just experts." },
  { icon: Smartphone, title: "Interactive navigation", desc: "Intuitive interface optimized for phones and tablets. Guests explore your wine list like browsing a curated collection." },
];

const restaurantBenefits = [
  { icon: TrendingUp, title: "Increase wine sales", desc: "Guided recommendations and smart suggestions drive higher average spend per table." },
  { icon: Users, title: "Improve guest experience", desc: "An engaging, easy-to-use wine list makes every guest feel like they have a personal sommelier." },
  { icon: RefreshCw, title: "Update wines instantly", desc: "Add new vintages, remove sold-out bottles, or adjust prices in real time — no reprinting." },
  { icon: DollarSign, title: "Reduce printing costs", desc: "Eliminate recurring printing expenses. Every update is instant and free." },
  { icon: Sparkles, title: "Make wine easier to understand", desc: "Visual profiles and plain-language descriptions help guests discover wines they'll love." },
];

const guestBenefits = [
  { icon: Search, title: "Easier to explore wines", desc: "Filters, categories, and search make it simple to browse hundreds of wines without feeling overwhelmed." },
  { icon: BookOpen, title: "Learn about wine", desc: "Tasting notes, region maps, and grape descriptions turn every glass into a learning experience." },
  { icon: GlassWater, title: "Discover new bottles", desc: "Smart recommendations introduce guests to wines they wouldn't have found on a traditional list." },
  { icon: Utensils, title: "Pair wine with food", desc: "Instant pairing suggestions remove the guesswork from choosing the perfect wine for every course." },
];

const DigitalWineList = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "digital-wine-list-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.metaTitle,
      description: t.metaDescription,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: t.url,
      inLanguage: lang,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: t.heroTitle2, item: t.url },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("digital-wine-list-jsonld")?.remove(); };
  }, [t, lang]);

  const getHref = (path: string) => {
    if (lang === "en") return path;
    return `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t.metaTitle}
        description={t.metaDescription}
        url={t.url}
        type="article"
        hreflang={allLangPaths("/digital-wine-list")}
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.heroBadge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroTitle2}</span>?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to={getHref("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.heroCta1} <ArrowRight size={16} />
            </Link>
            <Link to={getHref("/wine-list-analyzer")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.heroCta2}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION — Traditional problems */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                {t.problemsHeading}<span className="text-gradient-wine italic">traditional wine lists</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.problemsDesc}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, text: t.problem1 },
                  { icon: Layers, text: t.problem2 },
                  { icon: RefreshCw, text: t.problem3 },
                  { icon: Search, text: t.problem4 },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 bg-destructive/5 rounded-lg p-4 border border-destructive/10">
                      <Icon size={16} className="text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                A <strong className="text-foreground">digital wine list</strong> {t.problemsConclusion}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. WHAT IS A DIGITAL WINE LIST */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.defLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              {t.defHeading}<span className="text-gradient-wine italic">{t.heroTitle2}</span>?
            </h2>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10 text-left max-w-3xl mx-auto">
              <p className="text-muted-foreground leading-relaxed mb-4">
                A <strong className="text-foreground">digital wine list</strong> {t.defText1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.defText2}
              </p>
              <div className="flex items-start gap-3 bg-wine/5 rounded-lg p-4 border border-wine/10 mt-4">
                <Sparkles size={16} className="text-wine shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-foreground">{t.defQuote}</strong>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.featuresLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.featuresHeading}<span className="text-gradient-wine italic">interactive wine list</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {[
              { icon: Search, title: t.feature1Title, desc: t.feature1Desc },
              { icon: BookOpen, title: t.feature2Title, desc: t.feature2Desc },
              { icon: Utensils, title: t.feature3Title, desc: t.feature3Desc },
              { icon: Eye, title: t.feature4Title, desc: t.feature4Desc },
              { icon: Smartphone, title: t.feature5Title, desc: t.feature5Desc },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS FOR RESTAURANTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.restaurantLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.restaurantHeading}<span className="text-gradient-wine italic">digital wine menus</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: t.restaurantBenefit1Title, desc: t.restaurantBenefit1Desc },
              { icon: Users, title: t.restaurantBenefit2Title, desc: t.restaurantBenefit2Desc },
              { icon: RefreshCw, title: t.restaurantBenefit3Title, desc: t.restaurantBenefit3Desc },
              { icon: DollarSign, title: t.restaurantBenefit4Title, desc: t.restaurantBenefit4Desc },
              { icon: Sparkles, title: t.restaurantBenefit5Title, desc: t.restaurantBenefit5Desc },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BENEFITS FOR GUESTS */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.guestLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.guestHeading}<span className="text-gradient-wine italic">every guest</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Search, title: t.guestBenefit1Title, desc: t.guestBenefit1Desc },
              { icon: BookOpen, title: t.guestBenefit2Title, desc: t.guestBenefit2Desc },
              { icon: GlassWater, title: t.guestBenefit3Title, desc: t.guestBenefit3Desc },
              { icon: Utensils, title: t.guestBenefit4Title, desc: t.guestBenefit4Desc },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY DIGITAL IS THE FUTURE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center">
                  <Globe size={22} className="text-wine" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">
                  {t.futureHeading}<span className="text-gradient-wine italic">future</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  {t.futureText1}
                </p>
                <p>
                  {t.futureText2}
                </p>
                <p>
                  Platforms like <strong className="text-foreground">Winerim</strong> {t.futureText3}
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {[
                  { label: t.futureTag1, icon: Smartphone },
                  { label: t.futureTag2, icon: Sparkles },
                  { label: t.futureTag3, icon: TrendingUp },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-wine/5 rounded-lg p-3 border border-wine/10">
                    <item.icon size={14} className="text-wine shrink-0" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaHeading}<span className="text-gradient-wine italic">interactive experience</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                {t.ctaDesc}
              </p>
              <Link to={getHref("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaBtn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalWineList;
