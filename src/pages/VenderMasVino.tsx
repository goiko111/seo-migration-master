import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight, AlertTriangle, XCircle, Lightbulb, Cpu, TrendingUp, Wine,
  BookOpen, Users, DollarSign, BarChart3, Layers, MessageSquare,
  GraduationCap, Eye, Utensils, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type IconType = typeof Wine;

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumbLabel: string; badge: string;
  h1pre: string; h1accent: string; subtitle: string; ctaHero: string;
  introH2pre: string; introH2accent: string; introP1: string; introP2: string;
  introProblems: string[]; introClose: string;
  errorsTag: string; errorsH2pre: string; errorsH2accent: string;
  errors: { icon: IconType; title: string; text: string }[];
  stratTag: string; stratH2pre: string; stratH2accent: string; stratSubtitle: string;
  strategies: { title: string; text: string }[];
  techTag: string; techH2pre: string; techH2accent: string; techSubtitle: string;
  techBenefits: { icon: IconType; text: string }[];
  techCta: string; techCtaBtn: string;
  resultsTag: string; resultsH2pre: string; resultsH2accent: string;
  metrics: { value: string; label: string; icon: IconType }[];
  ctaTag: string; ctaH2pre: string; ctaH2accent: string; ctaH2post: string; ctaSubtitle: string;
  ctaPrimary: string; ctaSecondary: string;
  faqs: { q: string; a: string }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cómo Vender Más Vino en un Restaurante | Guía Completa 2025",
    metaDescription: "Descubre las estrategias más efectivas para aumentar las ventas de vino en tu restaurante: carta optimizada, maridajes.",
    url: "https://winerim.wine/como-vender-mas-vino-en-un-restaurante",
    breadcrumbLabel: "Vender más vino", badge: "Guía para hostelería",
    h1pre: "Cómo vender más vino", h1accent: "en un restaurante",
    subtitle: "Estrategias reales para aumentar las ventas de vino, mejorar el ticket medio y rotar mejor la bodega.",
    ctaHero: "Analiza tu carta de vinos gratis",
    introH2pre: "El vino: tu producto con", introH2accent: "mayor margen… y el peor vendido",
    introP1: "En la mayoría de los restaurantes, el vino representa el producto con mayor margen bruto de toda la carta. Sin embargo, es también uno de los peor vendidos cuando no existe una estrategia clara de venta.",
    introP2: "Los problemas son conocidos y se repiten en casi todos los establecimientos:",
    introProblems: ["El cliente no entiende la carta de vinos", "El personal no recomienda porque no se siente seguro", "Hay demasiadas referencias sin una organización clara", "No se ofrecen maridajes con los platos del menú", "La estructura de precios no invita a subir de gama"],
    introClose: "La buena noticia es que la mayoría de estos problemas tienen solución. En esta guía te mostramos los errores más frecuentes y las estrategias que funcionan para <strong>vender más vino en tu restaurante</strong>.",
    errorsTag: "Errores comunes", errorsH2pre: "Los 7 errores que hacen que", errorsH2accent: "no se venda vino",
    errors: [
      { icon: BookOpen, title: "1. Carta de vinos difícil de entender", text: "Cuando la carta está organizada por regiones o bodegas sin contexto, el comensal se pierde. Una carta efectiva agrupa por estilos, ocasiones o maridajes, facilitando que cualquier persona elija con confianza." },
      { icon: MessageSquare, title: "2. Falta de recomendaciones", text: "Si nadie sugiere un vino, el cliente recurre al más barato o al que ya conoce. Las recomendaciones —del personal o automatizadas— son el mayor acelerador de ventas de vino." },
      { icon: Wine, title: "3. No ofrecer vino por copa", text: "Muchos comensales quieren probar sin comprometer una botella. Ofrecer una selección atractiva por copa reduce la barrera de entrada y abre la puerta a descubrir vinos de mayor valor." },
      { icon: DollarSign, title: "4. Precios mal escalonados", text: "Cuando hay un salto brusco entre el vino más barato y el siguiente, el cliente siempre elige el más económico. Escalonar precios de forma gradual invita a subir de gama de manera natural." },
      { icon: Layers, title: "5. Demasiadas referencias", text: "Una carta con 200 vinos parece impresionante, pero genera parálisis de elección. Reducir a 30-50 referencias bien seleccionadas mejora la rotación, reduce merma y aumenta la satisfacción del cliente." },
      { icon: Eye, title: "6. Falta de storytelling", text: "Un vino no es solo uva y añada: es una historia, un territorio, una persona. Contar la historia detrás de cada referencia genera conexión emocional y justifica un precio superior." },
      { icon: GraduationCap, title: "7. Personal sin formación", text: "No hace falta ser sommelier, pero sí conocer lo básico. Cuando el equipo de sala puede explicar un vino con seguridad, la confianza del comensal —y el ticket medio— se dispara." },
    ],
    stratTag: "Estrategias", stratH2pre: "7 estrategias para", stratH2accent: "vender más vino",
    stratSubtitle: "Acciones concretas que puedes implementar en tu restaurante para mejorar las ventas de vino.",
    strategies: [
      { title: "Simplificar la carta", text: "Menos referencias, mejor explicadas. Organiza por estilos o momentos de consumo en lugar de regiones." },
      { title: "Crear categorías claras", text: "Usa etiquetas como «Frescos y ligeros», «Para compartir» o «Selección del chef» que hablan el idioma del comensal." },
      { title: "Ofrecer maridajes con platos", text: "Asocia cada plato estrella con uno o dos vinos recomendados. El maridaje sugerido es la forma más natural de upselling." },
      { title: "Mostrar vinos recomendados", text: "Destaca 3-5 vinos como «Recomendación de la casa». Los vinos destacados se venden hasta un 40 % más." },
      { title: "Mejorar el diseño de la carta", text: "Tipografía legible, descripciones cortas, imágenes de calidad. El diseño afecta directamente a la percepción de valor." },
      { title: "Explicar el vino de forma simple", text: "Notas de cata accesibles, sin tecnicismos. Frases como «Fresco, con notas de fruta roja, perfecto para ensaladas» funcionan mejor que «taninos sedosos con final largo»." },
      { title: "Guiar la decisión del cliente", text: "Preguntas como «¿Prefieres tinto o blanco?» seguidas de una recomendación personalizada. La venta guiada convierte más que la carta estática." },
    ],
    techTag: "Tecnología", techH2pre: "Cómo la tecnología ayuda a", techH2accent: "vender más vino",
    techSubtitle: "Las cartas digitales inteligentes están transformando la forma en que los restaurantes venden vino. En lugar de una carta estática, el comensal accede a una experiencia interactiva que le guía hacia mejores decisiones.",
    techBenefits: [
      { icon: Sparkles, text: "Recomendar vinos automáticamente según las preferencias del comensal" },
      { icon: BookOpen, text: "Explicar el vino al cliente con fichas visuales y notas de cata accesibles" },
      { icon: Utensils, text: "Mostrar maridajes inteligentes con cada plato del menú" },
      { icon: TrendingUp, text: "Aumentar el ticket medio mediante upselling contextual" },
      { icon: BarChart3, text: "Mejorar la rotación de bodega con analítica de ventas en tiempo real" },
    ],
    techCta: "Winerim es la plataforma que convierte tu carta de vinos en un vendedor inteligente. Con inteligencia artificial, recomienda, educa y aumenta tu ticket medio automáticamente.",
    techCtaBtn: "Descubre Winerim",
    resultsTag: "Resultados", resultsH2pre: "Resultados reales en", resultsH2accent: "restaurantes",
    metrics: [
      { value: "+30 %", label: "Incremento medio en ventas de vino", icon: Wine },
      { value: "+20 %", label: "Aumento del ticket medio", icon: TrendingUp },
      { value: "+35 %", label: "Mayor rotación de referencias", icon: BarChart3 },
    ],
    ctaTag: "Da el primer paso", ctaH2pre: "Descubre cuánto más podrías", ctaH2accent: "vender", ctaH2post: "con tu carta de vinos",
    ctaSubtitle: "Envíanos tu carta y te mostramos cómo optimizarla para vender más vino. Sin compromiso.",
    ctaPrimary: "Solicitar análisis gratuito", ctaSecondary: "Contactar",
    faqs: [
      { q: "¿Cuánto se puede aumentar la venta de vino en un restaurante?", a: "Con una estrategia bien ejecutada —carta clara, recomendaciones y maridajes— es habitual conseguir incrementos del 15 % al 30 % en ventas de vino y un aumento del ticket medio de entre un 10 % y un 20 %." },
      { q: "¿Cómo recomendar vino en un restaurante sin ser sommelier?", a: "Basta con ofrecer una carta bien organizada por estilos o maridajes, usar fichas de cata sencillas y apoyarse en herramientas digitales que generan recomendaciones automáticas basadas en los platos del menú." },
      { q: "¿Es mejor tener muchos vinos o pocos en la carta?", a: "Menos es más. Una selección curada de 30-50 referencias bien explicadas vende más que una carta de 200 vinos que abruma al cliente. La clave es rotación y margen, no volumen." },
      { q: "¿Qué es una carta de vinos digital inteligente?", a: "Es una plataforma que sustituye la carta impresa por una experiencia interactiva donde el comensal recibe recomendaciones personalizadas, ve maridajes con su plato y accede a información visual del vino, todo desde su móvil." },
      { q: "¿Cómo vender vino por copa para aumentar el ticket medio?", a: "Ofrece 6-8 vinos por copa con rotación semanal, colócalos de forma visible en la carta y acompáñalos de un maridaje sugerido. Las cartas digitales permiten destacar estas opciones y explicar por qué probarlas." },
    ],
  },
  en: {
    metaTitle: "How to Sell More Wine in a Restaurant | Complete Guide 2025",
    metaDescription: "Discover the most effective strategies to increase wine sales in your restaurant: optimised list, pairings, smart recommendations and technology.",
    url: "https://winerim.wine/en/how-to-sell-more-wine-in-restaurants",
    breadcrumbLabel: "Sell more wine", badge: "Hospitality guide",
    h1pre: "How to sell more wine", h1accent: "in a restaurant",
    subtitle: "Real strategies to boost wine sales, increase the average ticket and improve cellar rotation.",
    ctaHero: "Analyse your wine list for free",
    introH2pre: "Wine: your highest-margin product", introH2accent: "… and the worst sold",
    introP1: "In most restaurants, wine is the product with the highest gross margin on the entire menu. Yet it is also one of the worst sold when there is no clear sales strategy.",
    introP2: "The problems are well known and repeat across almost every establishment:",
    introProblems: ["Guests don't understand the wine list", "Staff don't recommend because they lack confidence", "Too many references with no clear organisation", "No pairings offered with menu dishes", "The price structure doesn't encourage trading up"],
    introClose: "The good news is that most of these problems have solutions. In this guide we show you the most common mistakes and the strategies that work to <strong>sell more wine in your restaurant</strong>.",
    errorsTag: "Common mistakes", errorsH2pre: "The 7 mistakes that stop", errorsH2accent: "wine from selling",
    errors: [
      { icon: BookOpen, title: "1. A wine list that's hard to understand", text: "When the list is organised by regions or wineries without context, the diner gets lost. An effective list groups by styles, occasions or pairings, making it easy for anyone to choose with confidence." },
      { icon: MessageSquare, title: "2. No recommendations", text: "If no one suggests a wine, the guest defaults to the cheapest or the one they already know. Recommendations — from staff or automated — are the biggest wine sales accelerator." },
      { icon: Wine, title: "3. Not offering wine by the glass", text: "Many diners want to try without committing to a whole bottle. An attractive by-the-glass selection lowers the barrier and opens the door to discovering higher-value wines." },
      { icon: DollarSign, title: "4. Poorly staggered prices", text: "When there's a sharp jump between the cheapest wine and the next, the guest always picks the cheapest. Gradually staggering prices invites natural trading up." },
      { icon: Layers, title: "5. Too many references", text: "A list with 200 wines looks impressive but creates choice paralysis. Reducing to 30-50 well-selected references improves rotation, cuts waste and increases guest satisfaction." },
      { icon: Eye, title: "6. No storytelling", text: "A wine isn't just a grape and a vintage — it's a story, a territory, a person. Telling the story behind each reference creates emotional connection and justifies a higher price." },
      { icon: GraduationCap, title: "7. Untrained staff", text: "You don't need to be a sommelier, but you do need the basics. When the floor team can explain a wine confidently, guest trust — and the average ticket — skyrockets." },
    ],
    stratTag: "Strategies", stratH2pre: "7 strategies to", stratH2accent: "sell more wine",
    stratSubtitle: "Concrete actions you can implement in your restaurant to improve wine sales.",
    strategies: [
      { title: "Simplify the list", text: "Fewer references, better explained. Organise by styles or consumption moments instead of regions." },
      { title: "Create clear categories", text: "Use labels like 'Fresh & light', 'To share' or 'Chef's selection' that speak the diner's language." },
      { title: "Offer pairings with dishes", text: "Link each star dish to one or two recommended wines. Suggested pairings are the most natural form of upselling." },
      { title: "Highlight recommended wines", text: "Feature 3-5 wines as 'House recommendation'. Featured wines sell up to 40% more." },
      { title: "Improve list design", text: "Readable typography, short descriptions, quality images. Design directly affects perceived value." },
      { title: "Explain wine simply", text: "Accessible tasting notes, no jargon. Phrases like 'Fresh, with red fruit notes, perfect for salads' work better than 'silky tannins with a long finish'." },
      { title: "Guide the guest's decision", text: "Questions like 'Do you prefer red or white?' followed by a personalised recommendation. Guided selling converts better than a static list." },
    ],
    techTag: "Technology", techH2pre: "How technology helps", techH2accent: "sell more wine",
    techSubtitle: "Smart digital wine lists are transforming how restaurants sell wine. Instead of a static list, the diner gets an interactive experience guiding them to better decisions.",
    techBenefits: [
      { icon: Sparkles, text: "Automatically recommend wines based on the diner's preferences" },
      { icon: BookOpen, text: "Explain wine to the guest with visual cards and accessible tasting notes" },
      { icon: Utensils, text: "Show smart pairings with every menu dish" },
      { icon: TrendingUp, text: "Increase the average ticket through contextual upselling" },
      { icon: BarChart3, text: "Improve cellar rotation with real-time sales analytics" },
    ],
    techCta: "Winerim is the platform that turns your wine list into a smart salesperson. With AI, it recommends, educates and increases your average ticket automatically.",
    techCtaBtn: "Discover Winerim",
    resultsTag: "Results", resultsH2pre: "Real results in", resultsH2accent: "restaurants",
    metrics: [
      { value: "+30%", label: "Average increase in wine sales", icon: Wine },
      { value: "+20%", label: "Average ticket increase", icon: TrendingUp },
      { value: "+35%", label: "Higher reference rotation", icon: BarChart3 },
    ],
    ctaTag: "Take the first step", ctaH2pre: "Find out how much more you could", ctaH2accent: "sell", ctaH2post: "with your wine list",
    ctaSubtitle: "Send us your list and we'll show you how to optimise it to sell more wine. No commitment.",
    ctaPrimary: "Request free analysis", ctaSecondary: "Contact us",
    faqs: [
      { q: "How much can wine sales increase in a restaurant?", a: "With a well-executed strategy — clear list, recommendations and pairings — it's common to achieve 15-30% increases in wine sales and a 10-20% rise in the average ticket." },
      { q: "How can I recommend wine without being a sommelier?", a: "A well-organised list by styles or pairings, simple tasting cards and digital tools that generate automatic recommendations based on menu dishes are all you need." },
      { q: "Is it better to have many or few wines on the list?", a: "Less is more. A curated selection of 30-50 well-described references sells more than a 200-wine list that overwhelms the guest. The key is rotation and margin, not volume." },
      { q: "What is a smart digital wine list?", a: "A platform that replaces the printed list with an interactive experience where the diner receives personalised recommendations, sees pairings with their dish and accesses visual wine information — all from their phone." },
      { q: "How can wine by the glass increase the average ticket?", a: "Offer 6-8 wines by the glass with weekly rotation, place them visibly on the list and pair them with a suggested dish. Digital lists let you highlight these options and explain why to try them." },
    ],
  },
  it: {
    metaTitle: "Come Vendere Più Vino al Ristorante | Guida Completa 2025",
    metaDescription: "Scopri le strategie più efficaci per aumentare le vendite di vino nel tuo ristorante: carta ottimizzata, abbinamenti.",
    url: "https://winerim.wine/it/come-vendere-piu-vino-ristorante",
    breadcrumbLabel: "Vendere più vino", badge: "Guida per la ristorazione",
    h1pre: "Come vendere più vino", h1accent: "al ristorante",
    subtitle: "Strategie concrete per aumentare le vendite di vino, alzare lo scontrino medio e migliorare la rotazione della cantina.",
    ctaHero: "Analizza la tua carta dei vini gratis",
    introH2pre: "Il vino: il prodotto con il", introH2accent: "margine più alto… e il peggio venduto",
    introP1: "Nella maggior parte dei ristoranti, il vino rappresenta il prodotto con il margine lordo più alto di tutto il menù. Eppure è anche uno dei peggio venduti quando non esiste una strategia chiara di vendita.",
    introP2: "I problemi sono noti e si ripetono in quasi tutti i locali:",
    introProblems: ["Il cliente non capisce la carta dei vini", "Il personale non raccomanda perché non si sente sicuro", "Troppe referenze senza un'organizzazione chiara", "Non vengono proposti abbinamenti con i piatti del menù", "La struttura dei prezzi non invita a salire di gamma"],
    introClose: "La buona notizia è che la maggior parte di questi problemi ha soluzione. In questa guida ti mostriamo gli errori più frequenti e le strategie che funzionano per <strong>vendere più vino nel tuo ristorante</strong>.",
    errorsTag: "Errori comuni", errorsH2pre: "I 7 errori che impediscono di", errorsH2accent: "vendere vino",
    errors: [
      { icon: BookOpen, title: "1. Carta dei vini difficile da capire", text: "Quando la carta è organizzata per regioni o cantine senza contesto, il commensale si perde. Una carta efficace raggruppa per stili, occasioni o abbinamenti, facilitando la scelta con fiducia." },
      { icon: MessageSquare, title: "2. Mancanza di raccomandazioni", text: "Se nessuno suggerisce un vino, il cliente opta per il più economico o quello che già conosce. Le raccomandazioni — dal personale o automatizzate — sono il maggiore acceleratore di vendite." },
      { icon: Wine, title: "3. Non offrire vino al calice", text: "Molti commensali vogliono provare senza impegnarsi con una bottiglia intera. Una selezione attraente al calice abbassa la barriera d'ingresso e apre la porta a scoprire vini di maggior valore." },
      { icon: DollarSign, title: "4. Prezzi mal scaglionati", text: "Quando c'è un salto brusco tra il vino più economico e il successivo, il cliente sceglie sempre il più economico. Scaglionare i prezzi gradualmente invita a salire di gamma in modo naturale." },
      { icon: Layers, title: "5. Troppe referenze", text: "Una carta con 200 vini sembra impressionante, ma genera paralisi della scelta. Ridurre a 30-50 referenze ben selezionate migliora la rotazione, riduce gli sprechi e aumenta la soddisfazione del cliente." },
      { icon: Eye, title: "6. Mancanza di storytelling", text: "Un vino non è solo uva e annata: è una storia, un territorio, una persona. Raccontare la storia dietro ogni referenza crea connessione emotiva e giustifica un prezzo superiore." },
      { icon: GraduationCap, title: "7. Personale senza formazione", text: "Non serve essere sommelier, ma bisogna conoscere le basi. Quando il team di sala può spiegare un vino con sicurezza, la fiducia del commensale — e lo scontrino medio — decollano." },
    ],
    stratTag: "Strategie", stratH2pre: "7 strategie per", stratH2accent: "vendere più vino",
    stratSubtitle: "Azioni concrete che puoi implementare nel tuo ristorante per migliorare le vendite di vino.",
    strategies: [
      { title: "Semplificare la carta", text: "Meno referenze, meglio spiegate. Organizza per stili o momenti di consumo anziché per regioni." },
      { title: "Creare categorie chiare", text: "Usa etichette come «Freschi e leggeri», «Da condividere» o «Selezione dello chef» che parlano la lingua del commensale." },
      { title: "Proporre abbinamenti con i piatti", text: "Associa ogni piatto forte a uno o due vini consigliati. L'abbinamento suggerito è la forma più naturale di upselling." },
      { title: "Evidenziare i vini consigliati", text: "Metti in risalto 3-5 vini come «Consiglio della casa». I vini evidenziati si vendono fino al 40% in più." },
      { title: "Migliorare il design della carta", text: "Tipografia leggibile, descrizioni brevi, immagini di qualità. Il design influisce direttamente sulla percezione del valore." },
      { title: "Spiegare il vino in modo semplice", text: "Note di degustazione accessibili, senza tecnicismi. Frasi come «Fresco, con note di frutta rossa, perfetto per le insalate» funzionano meglio di «tannini setosi con finale lungo»." },
      { title: "Guidare la decisione del cliente", text: "Domande come «Preferisce rosso o bianco?» seguite da una raccomandazione personalizzata. La vendita guidata converte più della carta statica." },
    ],
    techTag: "Tecnologia", techH2pre: "Come la tecnologia aiuta a", techH2accent: "vendere più vino",
    techSubtitle: "Le carte digitali intelligenti stanno trasformando il modo in cui i ristoranti vendono vino. Invece di una carta statica, il commensale accede a un'esperienza interattiva che lo guida verso scelte migliori.",
    techBenefits: [
      { icon: Sparkles, text: "Raccomandare vini automaticamente in base alle preferenze del commensale" },
      { icon: BookOpen, text: "Spiegare il vino al cliente con schede visive e note di degustazione accessibili" },
      { icon: Utensils, text: "Mostrare abbinamenti intelligenti con ogni piatto del menù" },
      { icon: TrendingUp, text: "Aumentare lo scontrino medio attraverso upselling contestuale" },
      { icon: BarChart3, text: "Migliorare la rotazione della cantina con analisi delle vendite in tempo reale" },
    ],
    techCta: "Winerim è la piattaforma che trasforma la tua carta dei vini in un venditore intelligente. Con l'intelligenza artificiale, raccomanda, educa e aumenta lo scontrino medio automaticamente.",
    techCtaBtn: "Scopri Winerim",
    resultsTag: "Risultati", resultsH2pre: "Risultati reali nei", resultsH2accent: "ristoranti",
    metrics: [
      { value: "+30%", label: "Incremento medio nelle vendite di vino", icon: Wine },
      { value: "+20%", label: "Aumento dello scontrino medio", icon: TrendingUp },
      { value: "+35%", label: "Maggiore rotazione delle referenze", icon: BarChart3 },
    ],
    ctaTag: "Fai il primo passo", ctaH2pre: "Scopri quanto potresti", ctaH2accent: "vendere", ctaH2post: "in più con la tua carta dei vini",
    ctaSubtitle: "Inviaci la tua carta e ti mostriamo come ottimizzarla per vendere più vino. Senza impegno.",
    ctaPrimary: "Richiedi analisi gratuita", ctaSecondary: "Contattaci",
    faqs: [
      { q: "Quanto si possono aumentare le vendite di vino in un ristorante?", a: "Con una strategia ben eseguita — carta chiara, raccomandazioni e abbinamenti — è comune ottenere incrementi del 15-30% nelle vendite di vino e un aumento dello scontrino medio del 10-20%." },
      { q: "Come raccomandare vino senza essere sommelier?", a: "Basta offrire una carta ben organizzata per stili o abbinamenti, usare schede di degustazione semplici e affidarsi a strumenti digitali che generano raccomandazioni automatiche basate sui piatti del menù." },
      { q: "È meglio avere molti o pochi vini in carta?", a: "Meno è meglio. Una selezione curata di 30-50 referenze ben spiegate vende più di una carta da 200 vini che travolge il cliente. La chiave è rotazione e margine, non volume." },
      { q: "Cos'è una carta dei vini digitale intelligente?", a: "Una piattaforma che sostituisce la carta stampata con un'esperienza interattiva dove il commensale riceve raccomandazioni personalizzate, vede abbinamenti con il piatto e accede a informazioni visive sul vino, tutto dal suo smartphone." },
      { q: "Come il vino al calice può aumentare lo scontrino medio?", a: "Offri 6-8 vini al calice con rotazione settimanale, posizionali in modo visibile nella carta e accompagnali con un abbinamento suggerito. Le carte digitali permettono di evidenziare queste opzioni e spiegare perché provarle." },
    ],
  },
  fr: {
    metaTitle: "Comment Vendre Plus de Vin au Restaurant | Guide Complet 2025",
    metaDescription: "Découvrez les stratégies les plus efficaces pour augmenter les ventes de vin dans votre restaurant : carte optimisée, accords mets-vins.",
    url: "https://winerim.wine/fr/comment-vendre-plus-vin-restaurant",
    breadcrumbLabel: "Vendre plus de vin", badge: "Guide restauration",
    h1pre: "Comment vendre plus de vin", h1accent: "au restaurant",
    subtitle: "Stratégies concrètes pour augmenter les ventes de vin, améliorer le ticket moyen et optimiser la rotation de votre cave.",
    ctaHero: "Analysez votre carte des vins gratuitement",
    introH2pre: "Le vin : votre produit à la", introH2accent: "marge la plus élevée… et le moins bien vendu",
    introP1: "Dans la plupart des restaurants, le vin représente le produit avec la marge brute la plus élevée de toute la carte. Pourtant, c'est aussi l'un des moins bien vendus quand il n'y a pas de stratégie de vente claire.",
    introP2: "Les problèmes sont connus et se répètent dans presque tous les établissements :",
    introProblems: ["Le client ne comprend pas la carte des vins", "Le personnel ne recommande pas parce qu'il manque de confiance", "Trop de références sans organisation claire", "Pas d'accords proposés avec les plats du menu", "La structure de prix n'incite pas à monter en gamme"],
    introClose: "La bonne nouvelle, c'est que la plupart de ces problèmes ont des solutions. Dans ce guide, nous vous montrons les erreurs les plus fréquentes et les stratégies qui fonctionnent pour <strong>vendre plus de vin dans votre restaurant</strong>.",
    errorsTag: "Erreurs courantes", errorsH2pre: "Les 7 erreurs qui empêchent de", errorsH2accent: "vendre du vin",
    errors: [
      { icon: BookOpen, title: "1. Une carte des vins difficile à comprendre", text: "Quand la carte est organisée par régions ou domaines sans contexte, le convive se perd. Une carte efficace regroupe par styles, occasions ou accords, permettant à chacun de choisir en confiance." },
      { icon: MessageSquare, title: "2. Pas de recommandations", text: "Si personne ne suggère de vin, le client opte pour le moins cher ou celui qu'il connaît déjà. Les recommandations — du personnel ou automatisées — sont le plus grand accélérateur de ventes de vin." },
      { icon: Wine, title: "3. Ne pas proposer de vin au verre", text: "Beaucoup de convives veulent goûter sans s'engager sur une bouteille entière. Une sélection attractive au verre abaisse la barrière d'entrée et ouvre la porte à la découverte de vins de plus grande valeur." },
      { icon: DollarSign, title: "4. Des prix mal échelonnés", text: "Quand il y a un saut brusque entre le vin le moins cher et le suivant, le client choisit toujours le moins cher. Échelonner les prix progressivement invite à monter en gamme naturellement." },
      { icon: Layers, title: "5. Trop de références", text: "Une carte de 200 vins semble impressionnante mais génère une paralysie du choix. Réduire à 30-50 références bien sélectionnées améliore la rotation, réduit le gaspillage et augmente la satisfaction client." },
      { icon: Eye, title: "6. Pas de storytelling", text: "Un vin n'est pas qu'un cépage et un millésime : c'est une histoire, un terroir, une personne. Raconter l'histoire derrière chaque référence crée une connexion émotionnelle et justifie un prix supérieur." },
      { icon: GraduationCap, title: "7. Personnel non formé", text: "Pas besoin d'être sommelier, mais il faut connaître les bases. Quand l'équipe de salle peut expliquer un vin avec assurance, la confiance du convive — et le ticket moyen — s'envolent." },
    ],
    stratTag: "Stratégies", stratH2pre: "7 stratégies pour", stratH2accent: "vendre plus de vin",
    stratSubtitle: "Actions concrètes que vous pouvez mettre en place dans votre restaurant pour améliorer les ventes de vin.",
    strategies: [
      { title: "Simplifier la carte", text: "Moins de références, mieux expliquées. Organisez par styles ou moments de consommation plutôt que par régions." },
      { title: "Créer des catégories claires", text: "Utilisez des étiquettes comme « Frais et légers », « À partager » ou « Sélection du chef » qui parlent la langue du convive." },
      { title: "Proposer des accords avec les plats", text: "Associez chaque plat phare à un ou deux vins recommandés. L'accord suggéré est la forme la plus naturelle d'upselling." },
      { title: "Mettre en avant les vins recommandés", text: "Mettez en avant 3-5 vins comme « Recommandation de la maison ». Les vins mis en avant se vendent jusqu'à 40% de plus." },
      { title: "Améliorer le design de la carte", text: "Typographie lisible, descriptions courtes, images de qualité. Le design affecte directement la perception de valeur." },
      { title: "Expliquer le vin simplement", text: "Notes de dégustation accessibles, sans jargon. Des phrases comme « Frais, avec des notes de fruits rouges, parfait pour les salades » fonctionnent mieux que « tanins soyeux avec une finale longue »." },
      { title: "Guider la décision du client", text: "Des questions comme « Vous préférez rouge ou blanc ? » suivies d'une recommandation personnalisée. La vente guidée convertit mieux qu'une carte statique." },
    ],
    techTag: "Technologie", techH2pre: "Comment la technologie aide à", techH2accent: "vendre plus de vin",
    techSubtitle: "Les cartes des vins digitales intelligentes transforment la façon dont les restaurants vendent du vin. Au lieu d'une carte statique, le convive accède à une expérience interactive qui le guide vers de meilleurs choix.",
    techBenefits: [
      { icon: Sparkles, text: "Recommander automatiquement des vins selon les préférences du convive" },
      { icon: BookOpen, text: "Expliquer le vin au client avec des fiches visuelles et des notes de dégustation accessibles" },
      { icon: Utensils, text: "Afficher des accords intelligents avec chaque plat du menu" },
      { icon: TrendingUp, text: "Augmenter le ticket moyen grâce à l'upselling contextuel" },
      { icon: BarChart3, text: "Améliorer la rotation de la cave avec des analyses de ventes en temps réel" },
    ],
    techCta: "Winerim est la plateforme qui transforme votre carte des vins en un vendeur intelligent. Avec l'IA, elle recommande, éduque et augmente votre ticket moyen automatiquement.",
    techCtaBtn: "Découvrir Winerim",
    resultsTag: "Résultats", resultsH2pre: "Résultats réels dans les", resultsH2accent: "restaurants",
    metrics: [
      { value: "+30%", label: "Augmentation moyenne des ventes de vin", icon: Wine },
      { value: "+20%", label: "Augmentation du ticket moyen", icon: TrendingUp },
      { value: "+35%", label: "Meilleure rotation des références", icon: BarChart3 },
    ],
    ctaTag: "Faites le premier pas", ctaH2pre: "Découvrez combien vous pourriez", ctaH2accent: "vendre", ctaH2post: "de plus avec votre carte des vins",
    ctaSubtitle: "Envoyez-nous votre carte et nous vous montrons comment l'optimiser pour vendre plus de vin. Sans engagement.",
    ctaPrimary: "Demander une analyse gratuite", ctaSecondary: "Nous contacter",
    faqs: [
      { q: "De combien peut-on augmenter les ventes de vin dans un restaurant ?", a: "Avec une stratégie bien exécutée — carte claire, recommandations et accords — il est courant d'atteindre des augmentations de 15 à 30% des ventes de vin et une hausse du ticket moyen de 10 à 20%." },
      { q: "Comment recommander du vin sans être sommelier ?", a: "Il suffit d'offrir une carte bien organisée par styles ou accords, d'utiliser des fiches de dégustation simples et de s'appuyer sur des outils digitaux qui génèrent des recommandations automatiques basées sur les plats du menu." },
      { q: "Vaut-il mieux avoir beaucoup ou peu de vins sur la carte ?", a: "Moins c'est mieux. Une sélection soignée de 30-50 références bien décrites vend plus qu'une carte de 200 vins qui submerge le client. La clé est la rotation et la marge, pas le volume." },
      { q: "Qu'est-ce qu'une carte des vins digitale intelligente ?", a: "Une plateforme qui remplace la carte imprimée par une expérience interactive où le convive reçoit des recommandations personnalisées, voit les accords avec son plat et accède à des informations visuelles sur le vin — le tout depuis son téléphone." },
      { q: "Comment le vin au verre peut-il augmenter le ticket moyen ?", a: "Proposez 6-8 vins au verre avec une rotation hebdomadaire, placez-les visiblement sur la carte et accompagnez-les d'un accord suggéré. Les cartes digitales permettent de mettre en avant ces options et d'expliquer pourquoi les essayer." },
    ],
  },
  de: {
    metaTitle: "Wie man im Restaurant mehr Wein verkauft | Leitfaden 2025",
    metaDescription: "Entdecken Sie die wirkungsvollsten Strategien, um den Weinverkauf in Ihrem Restaurant zu steigern: optimierte Karte, Speisenbegleitung und Technologie.",
    url: "https://winerim.wine/de/wie-mehr-wein-verkaufen-restaurant",
    breadcrumbLabel: "Mehr Wein verkaufen", badge: "Leitfaden für die Gastronomie",
    h1pre: "Wie man mehr Wein", h1accent: "im Restaurant verkauft",
    subtitle: "Praxiserprobte Strategien zur Steigerung des Weinumsatzes, Erhöhung des Durchschnittsbons und besseren Rotation des Weinkellers.",
    ctaHero: "Weinkarte kostenlos analysieren",
    introH2pre: "Wein: Ihr Produkt mit der", introH2accent: "höchsten Marge – und dem schlechtesten Absatz",
    introP1: "In den meisten Restaurants ist Wein das Produkt mit der höchsten Bruttomarge der gesamten Karte. Gleichzeitig gehört er ohne klare Verkaufsstrategie zu den am schlechtesten verkauften Positionen.",
    introP2: "Die Probleme sind bekannt und wiederholen sich in nahezu jedem Betrieb:",
    introProblems: ["Der Gast versteht die Weinkarte nicht", "Das Personal empfiehlt nichts, weil es sich unsicher fühlt", "Zu viele Referenzen ohne klare Struktur", "Keine Empfehlungen zur Speisenbegleitung", "Die Preisstruktur verleitet nicht zum Upgrade"],
    introClose: "Die gute Nachricht: Die meisten dieser Probleme sind lösbar. In diesem Leitfaden zeigen wir Ihnen die häufigsten Fehler und die Strategien, die wirklich funktionieren, um <strong>im Restaurant mehr Wein zu verkaufen</strong>.",
    errorsTag: "Häufige Fehler", errorsH2pre: "Die 7 Fehler, die dazu führen, dass", errorsH2accent: "kein Wein verkauft wird",
    errors: [
      { icon: BookOpen, title: "1. Schwer verständliche Weinkarte", text: "Wenn die Karte nach Regionen oder Weingütern ohne Kontext geordnet ist, verliert sich der Gast. Eine wirkungsvolle Karte gruppiert nach Stilen, Anlässen oder Speisenbegleitung und erleichtert jedem die selbstbewusste Wahl." },
      { icon: MessageSquare, title: "2. Fehlende Empfehlungen", text: "Wenn niemand einen Wein vorschlägt, greift der Gast zum günstigsten oder bekanntesten. Empfehlungen – ob durch Personal oder automatisiert – sind der stärkste Beschleuniger für den Weinverkauf." },
      { icon: Wine, title: "3. Kein offener Ausschank", text: "Viele Gäste möchten probieren, ohne sich auf eine ganze Flasche festzulegen. Eine attraktive Auswahl im Glas senkt die Einstiegshürde und öffnet die Tür zu hochwertigeren Weinen." },
      { icon: DollarSign, title: "4. Schlecht abgestufte Preise", text: "Gibt es einen harten Sprung zwischen dem günstigsten Wein und dem nächsten, wählt der Gast immer den billigsten. Eine gleichmäßige Preistreppe lädt auf natürliche Weise zum Hochstufen ein." },
      { icon: Layers, title: "5. Zu viele Referenzen", text: "Eine Karte mit 200 Weinen wirkt beeindruckend, erzeugt aber Entscheidungsparalyse. Eine Reduktion auf 30–50 gut ausgewählte Positionen verbessert die Rotation, reduziert Schwund und erhöht die Gästezufriedenheit." },
      { icon: Eye, title: "6. Kein Storytelling", text: "Ein Wein ist nicht nur Rebsorte und Jahrgang: Er ist Geschichte, Terroir, Mensch. Die Geschichte hinter jeder Referenz zu erzählen, schafft emotionale Verbindung und rechtfertigt einen höheren Preis." },
      { icon: GraduationCap, title: "7. Ungeschultes Personal", text: "Sie müssen kein Sommelier sein, aber die Basics sollten sitzen. Wenn das Serviceteam einen Wein sicher erklären kann, steigen Gästevertrauen und Durchschnittsbon sprunghaft." },
    ],
    stratTag: "Strategien", stratH2pre: "7 Strategien, um", stratH2accent: "mehr Wein zu verkaufen",
    stratSubtitle: "Konkrete Maßnahmen, die Sie in Ihrem Restaurant umsetzen können, um den Weinverkauf zu verbessern.",
    strategies: [
      { title: "Karte verschlanken", text: "Weniger Referenzen, dafür besser erklärt. Sortieren Sie nach Stilen oder Konsumanlässen statt nach Regionen." },
      { title: "Klare Kategorien schaffen", text: "Nutzen Sie Labels wie \"Frisch und leicht\", \"Zum Teilen\" oder \"Auswahl des Küchenchefs\", die die Sprache des Gastes sprechen." },
      { title: "Speisenbegleitung anbieten", text: "Verbinden Sie jedes Aushängegericht mit ein bis zwei empfohlenen Weinen. Die vorgeschlagene Speisenbegleitung ist die natürlichste Form des Upsellings." },
      { title: "Empfohlene Weine zeigen", text: "Heben Sie 3–5 Weine als \"Empfehlung des Hauses\" hervor. Hervorgehobene Weine verkaufen sich bis zu 40 % häufiger." },
      { title: "Kartengestaltung verbessern", text: "Lesbare Typografie, kurze Beschreibungen, hochwertige Bilder. Das Design beeinflusst direkt die Wertwahrnehmung." },
      { title: "Wein einfach erklären", text: "Zugängliche Verkostungsnotizen ohne Fachjargon. Sätze wie \"Frisch, mit Noten roter Früchte, ideal zu Salaten\" wirken besser als \"seidige Tannine mit langem Abgang\"." },
      { title: "Entscheidung des Gastes führen", text: "Fragen wie \"Lieber Rot oder Weiß?\" gefolgt von einer personalisierten Empfehlung. Geführter Verkauf konvertiert besser als eine statische Karte." },
    ],
    techTag: "Technologie", techH2pre: "Wie Technologie hilft,", techH2accent: "mehr Wein zu verkaufen",
    techSubtitle: "Intelligente digitale Weinkarten verändern die Art und Weise, wie Restaurants Wein verkaufen. Statt einer statischen Karte erleben Gäste eine interaktive Experience, die sie zu besseren Entscheidungen führt.",
    techBenefits: [
      { icon: Sparkles, text: "Weine automatisch nach den Vorlieben des Gastes empfehlen" },
      { icon: BookOpen, text: "Wein mit visuellen Karten und verständlichen Verkostungsnotizen erklären" },
      { icon: Utensils, text: "Intelligente Speisenbegleitung zu jedem Gericht der Karte anzeigen" },
      { icon: TrendingUp, text: "Durchschnittsbon über kontextbezogenes Upselling steigern" },
      { icon: BarChart3, text: "Kellerrotation durch Verkaufsanalysen in Echtzeit verbessern" },
    ],
    techCta: "Winerim ist die Plattform, die Ihre Weinkarte in einen intelligenten Verkäufer verwandelt. Mit KI empfiehlt, erklärt und steigert sie automatisch Ihren Durchschnittsbon.",
    techCtaBtn: "Winerim entdecken",
    resultsTag: "Ergebnisse", resultsH2pre: "Echte Ergebnisse in", resultsH2accent: "Restaurants",
    metrics: [
      { value: "+30 %", label: "Durchschnittliche Steigerung des Weinumsatzes", icon: Wine },
      { value: "+20 %", label: "Höherer Durchschnittsbon", icon: TrendingUp },
      { value: "+35 %", label: "Bessere Referenzrotation", icon: BarChart3 },
    ],
    ctaTag: "Machen Sie den ersten Schritt", ctaH2pre: "Entdecken Sie, wie viel mehr Sie", ctaH2accent: "verkaufen", ctaH2post: "könnten mit Ihrer Weinkarte",
    ctaSubtitle: "Schicken Sie uns Ihre Weinkarte und wir zeigen Ihnen, wie Sie sie optimieren, um mehr Wein zu verkaufen. Unverbindlich.",
    ctaPrimary: "Kostenlose Analyse anfordern", ctaSecondary: "Kontakt",
    faqs: [
      { q: "Um wie viel lässt sich der Weinverkauf im Restaurant steigern?", a: "Mit einer gut umgesetzten Strategie – klare Karte, Empfehlungen, Speisenbegleitung – sind Steigerungen von 15–30 % beim Weinumsatz und 10–20 % beim Durchschnittsbon üblich." },
      { q: "Wie empfehle ich Wein ohne Sommelier-Ausbildung?", a: "Es genügt, eine nach Stilen oder Speisenbegleitung gut strukturierte Karte, einfache Verkostungsnotizen und digitale Tools zu nutzen, die automatisch Empfehlungen auf Basis der Gerichte generieren." },
      { q: "Sind viele oder wenige Weine auf der Karte besser?", a: "Weniger ist mehr. Eine kuratierte Auswahl von 30–50 gut erklärten Referenzen verkauft sich besser als 200 Weine, die den Gast überfordern. Entscheidend sind Rotation und Marge, nicht die Menge." },
      { q: "Was ist eine intelligente digitale Weinkarte?", a: "Eine Plattform, die die gedruckte Karte durch eine interaktive Experience ersetzt: Der Gast erhält personalisierte Empfehlungen, sieht die Speisenbegleitung zu seinem Gericht und visuelle Weininformationen – alles vom Smartphone aus." },
      { q: "Wie erhöht offener Ausschank den Durchschnittsbon?", a: "Bieten Sie 6–8 offene Weine mit wöchentlicher Rotation an, platzieren Sie sie sichtbar auf der Karte und ergänzen Sie eine vorgeschlagene Speisenbegleitung. Digitale Karten heben diese Optionen hervor und erklären, warum sie einen Versuch wert sind." },
    ],
  },
  pt: {
    metaTitle: "Como Vender Mais Vinho num Restaurante | Guia Completo 2025",
    metaDescription: "Descubra as estratégias mais eficazes para aumentar as vendas de vinho no seu restaurante: carta otimizada, harmonizações e tecnologia.",
    url: "https://winerim.wine/pt/como-vender-mais-vinho-restaurante",
    breadcrumbLabel: "Vender mais vinho", badge: "Guia para restauração",
    h1pre: "Como vender mais vinho", h1accent: "num restaurante",
    subtitle: "Estratégias reais para aumentar as vendas de vinho, melhorar o ticket médio e rodar melhor a garrafeira.",
    ctaHero: "Analise a sua carta de vinhos grátis",
    introH2pre: "O vinho: o seu produto com", introH2accent: "maior margem… e o pior vendido",
    introP1: "Na maioria dos restaurantes, o vinho representa o produto com maior margem bruta de toda a carta. Contudo, é também um dos pior vendidos quando não existe uma estratégia clara de venda.",
    introP2: "Os problemas são conhecidos e repetem-se em quase todos os estabelecimentos:",
    introProblems: ["O cliente não percebe a carta de vinhos", "A equipa não recomenda porque não se sente segura", "Há demasiadas referências sem organização clara", "Não se propõem harmonizações com os pratos do menu", "A estrutura de preços não convida a subir de gama"],
    introClose: "A boa notícia é que a maioria destes problemas tem solução. Neste guia mostramos-lhe os erros mais frequentes e as estratégias que funcionam para <strong>vender mais vinho no seu restaurante</strong>.",
    errorsTag: "Erros comuns", errorsH2pre: "Os 7 erros que impedem de", errorsH2accent: "vender vinho",
    errors: [
      { icon: BookOpen, title: "1. Carta de vinhos difícil de compreender", text: "Quando a carta está organizada por regiões ou produtores sem contexto, o cliente perde-se. Uma carta eficaz agrupa por estilos, ocasiões ou harmonizações, facilitando a escolha com confiança." },
      { icon: MessageSquare, title: "2. Falta de recomendações", text: "Se ninguém sugere um vinho, o cliente recorre ao mais barato ou ao que já conhece. As recomendações — da equipa ou automatizadas — são o maior acelerador de vendas de vinho." },
      { icon: Wine, title: "3. Não oferecer vinho a copo", text: "Muitos clientes querem provar sem se comprometerem com uma garrafa. Oferecer uma seleção atrativa a copo reduz a barreira de entrada e abre a porta a descobrir vinhos de maior valor." },
      { icon: DollarSign, title: "4. Preços mal escalonados", text: "Quando há um salto brusco entre o vinho mais barato e o seguinte, o cliente escolhe sempre o mais económico. Escalonar os preços de forma gradual convida a subir de gama de modo natural." },
      { icon: Layers, title: "5. Demasiadas referências", text: "Uma carta com 200 vinhos parece impressionante, mas gera paralisia de escolha. Reduzir para 30-50 referências bem selecionadas melhora a rotação, reduz perdas e aumenta a satisfação do cliente." },
      { icon: Eye, title: "6. Falta de storytelling", text: "Um vinho não é só casta e colheita: é uma história, um território, uma pessoa. Contar a história por trás de cada referência cria ligação emocional e justifica um preço superior." },
      { icon: GraduationCap, title: "7. Equipa sem formação", text: "Não é preciso ser escanção, mas conhecer o básico. Quando a equipa de sala consegue explicar um vinho com segurança, a confiança do cliente — e o ticket médio — disparam." },
    ],
    stratTag: "Estratégias", stratH2pre: "7 estratégias para", stratH2accent: "vender mais vinho",
    stratSubtitle: "Ações concretas que pode implementar no seu restaurante para melhorar as vendas de vinho.",
    strategies: [
      { title: "Simplificar a carta", text: "Menos referências, melhor explicadas. Organize por estilos ou momentos de consumo em vez de regiões." },
      { title: "Criar categorias claras", text: "Use etiquetas como «Frescos e leves», «Para partilhar» ou «Seleção do chef» que falam a linguagem do cliente." },
      { title: "Oferecer harmonizações com pratos", text: "Associe cada prato de assinatura a um ou dois vinhos recomendados. A harmonização sugerida é a forma mais natural de upselling." },
      { title: "Destacar vinhos recomendados", text: "Destaque 3-5 vinhos como «Recomendação da casa». Os vinhos em destaque vendem até 40 % mais." },
      { title: "Melhorar o design da carta", text: "Tipografia legível, descrições curtas, imagens de qualidade. O design afeta diretamente a perceção de valor." },
      { title: "Explicar o vinho de forma simples", text: "Notas de prova acessíveis, sem tecnicismos. Frases como «Fresco, com notas de fruta vermelha, perfeito para saladas» funcionam melhor do que «taninos sedosos com final longo»." },
      { title: "Guiar a decisão do cliente", text: "Perguntas como «Prefere tinto ou branco?» seguidas de uma recomendação personalizada. A venda guiada converte mais do que a carta estática." },
    ],
    techTag: "Tecnologia", techH2pre: "Como a tecnologia ajuda a", techH2accent: "vender mais vinho",
    techSubtitle: "As cartas digitais inteligentes estão a transformar a forma como os restaurantes vendem vinho. Em vez de uma carta estática, o cliente acede a uma experiência interativa que o guia para melhores decisões.",
    techBenefits: [
      { icon: Sparkles, text: "Recomendar vinhos automaticamente consoante as preferências do cliente" },
      { icon: BookOpen, text: "Explicar o vinho ao cliente com fichas visuais e notas de prova acessíveis" },
      { icon: Utensils, text: "Mostrar harmonizações inteligentes com cada prato do menu" },
      { icon: TrendingUp, text: "Aumentar o ticket médio através de upselling contextual" },
      { icon: BarChart3, text: "Melhorar a rotação da garrafeira com análise de vendas em tempo real" },
    ],
    techCta: "A Winerim é a plataforma que transforma a sua carta de vinhos num vendedor inteligente. Com IA, recomenda, educa e aumenta o seu ticket médio automaticamente.",
    techCtaBtn: "Descobrir a Winerim",
    resultsTag: "Resultados", resultsH2pre: "Resultados reais em", resultsH2accent: "restaurantes",
    metrics: [
      { value: "+30 %", label: "Incremento médio nas vendas de vinho", icon: Wine },
      { value: "+20 %", label: "Aumento do ticket médio", icon: TrendingUp },
      { value: "+35 %", label: "Maior rotação de referências", icon: BarChart3 },
    ],
    ctaTag: "Dê o primeiro passo", ctaH2pre: "Descubra quanto mais podia", ctaH2accent: "vender", ctaH2post: "com a sua carta de vinhos",
    ctaSubtitle: "Envie-nos a sua carta e mostramos-lhe como otimizá-la para vender mais vinho. Sem compromisso.",
    ctaPrimary: "Pedir análise gratuita", ctaSecondary: "Contactar",
    faqs: [
      { q: "Quanto se pode aumentar a venda de vinho num restaurante?", a: "Com uma estratégia bem executada — carta clara, recomendações e harmonizações — é frequente conseguir incrementos de 15 % a 30 % nas vendas de vinho e um aumento do ticket médio entre 10 % e 20 %." },
      { q: "Como recomendar vinho num restaurante sem ser escanção?", a: "Basta oferecer uma carta bem organizada por estilos ou harmonizações, usar fichas de prova simples e apoiar-se em ferramentas digitais que geram recomendações automáticas com base nos pratos do menu." },
      { q: "É melhor ter muitos ou poucos vinhos na carta?", a: "Menos é mais. Uma seleção curada de 30-50 referências bem explicadas vende mais do que uma carta de 200 vinhos que satura o cliente. A chave é rotação e margem, não volume." },
      { q: "O que é uma carta de vinhos digital inteligente?", a: "É uma plataforma que substitui a carta impressa por uma experiência interativa onde o cliente recebe recomendações personalizadas, vê harmonizações com o prato e acede a informação visual do vinho, tudo a partir do telemóvel." },
      { q: "Como vender vinho a copo para aumentar o ticket médio?", a: "Ofereça 6-8 vinhos a copo com rotação semanal, coloque-os de forma visível na carta e acompanhe-os de uma harmonização sugerida. As cartas digitais permitem destacar estas opções e explicar porque vale a pena experimentá-las." },
    ],
  },
};

const VenderMasVino = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "faq-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [t.faqs]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} type="article" author="Winerim"
        hreflang={allLangPaths("/como-vender-mas-vino-en-un-restaurante")} />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
            <Breadcrumbs items={[{ label: lang === "es" ? "Guías" : lang === "it" ? "Guide" : "Guides", href: localePath("/guias-y-recursos") }, { label: t.breadcrumbLabel }]} />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {t.h1pre}{" "}<span className="text-gradient-wine italic">{t.h1accent}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">{t.subtitle}</p>
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300">
              {t.ctaHero} <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* INTRO */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="prose-custom">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">{t.introH2pre} <span className="text-gradient-wine">{t.introH2accent}</span></h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.introP1}</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t.introP2}</p>
              </div>
            </ScrollReveal>
            <div className="grid gap-3 mb-8">
              {t.introProblems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-3 bg-gradient-card rounded-lg border border-border p-4">
                    <AlertTriangle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.introClose }} />
            </ScrollReveal>
          </div>
        </section>

        {/* ERRORS */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/20 bg-destructive/5 mb-6">
                <XCircle size={14} className="text-destructive" />
                <span className="text-xs font-semibold tracking-widest uppercase text-destructive">{t.errorsTag}</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.errorsH2pre}{" "}<span className="text-gradient-wine italic">{t.errorsH2accent}</span>
              </h2>
            </ScrollReveal>
            <div className="space-y-6">
              {t.errors.map((err, i) => {
                const Icon = err.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-1"><Icon size={20} className="text-wine" /></div>
                        <div>
                          <h3 className="font-heading text-xl font-semibold mb-2">{err.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{err.text}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* STRATEGIES */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <Lightbulb size={14} className="text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">{t.stratTag}</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.stratH2pre}{" "}<span className="text-gradient-wine italic">{t.stratH2accent}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.stratSubtitle}</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-5">
              {t.strategies.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all h-full">
                    <span className="inline-block text-xs font-bold text-wine bg-wine/10 px-3 py-1 rounded-full mb-4">{i + 1}</span>
                    <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
                <Cpu size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.techTag}</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.techH2pre}{" "}<span className="text-gradient-wine italic">{t.techH2accent}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.techSubtitle}</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {t.techBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={20} className="text-wine" /></div>
                      <p className="text-foreground/90 leading-relaxed">{b.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="bg-gradient-card rounded-2xl border border-wine/20 p-8 md:p-10 glow-wine text-center">
                <p className="text-lg text-muted-foreground mb-4"><strong className="text-foreground">Winerim</strong> {t.techCta.replace("Winerim ", "")}</p>
                <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.techCtaBtn} <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.resultsTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.resultsH2pre}{" "}<span className="text-gradient-wine italic">{t.resultsH2accent}</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {t.metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="bg-gradient-card rounded-2xl border border-border p-8 text-center hover:border-wine/20 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-5"><Icon size={28} className="text-wine" /></div>
                      <p className="font-heading text-4xl md:text-5xl font-bold text-gradient-wine mb-2">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <FAQSection faqs={t.faqs} schemaId="vender-mas-vino" />

        {/* CTA */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaTag}</p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {t.ctaH2pre}{" "}<span className="text-gradient-wine italic">{t.ctaH2accent}</span>{" "}{t.ctaH2post}
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaSubtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                      {t.ctaPrimary} <ArrowRight size={16} />
                    </Link>
                    <Link to={localePath("/contacto")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">
                      {t.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VenderMasVino;
