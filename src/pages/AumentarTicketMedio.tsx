import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, BarChart3, AlertTriangle,
  Lightbulb, Utensils, GlassWater, BookOpen, Users,
  Sparkles, CheckCircle, XCircle, Cpu, Target, DollarSign
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

type T = {
  metaTitle: string; metaDesc: string; badge: string; breadLabel: string;
  heroTitle1: string; heroHighlight: string; heroTitle2: string; heroDesc: string;
  ctaAnalyze: string; ctaDemo: string;
  introTitle1: string; introHighlight: string; introP1: string; introP2: string; introP3: string;
  introFactors: string[];
  whyLabel: string; whyTitle1: string; whyHighlight: string;
  wineAdvantages: { title: string; desc: string }[];
  stratLabel: string; stratTitle1: string; stratHighlight: string;
  strategies: { title: string; desc: string }[];
  errLabel: string; errTitle1: string; errHighlight: string;
  mistakes: string[];
  techLabel: string; techTitle1: string; techHighlight: string;
  techBenefits: { title: string; desc: string }[];
  impactLabel: string; impactTitle1: string; impactHighlight: string;
  metrics: { value: string; label: string }[];
  ctaFinalLabel: string; ctaFinalTitle1: string; ctaFinalHighlight: string; ctaFinalDesc: string; ctaFinalButton: string;
  links: { label: string }[];
};

const translations: Record<string, T> = {
  es: {
    metaTitle: "Cómo Aumentar el Ticket Medio en un Restaurante | Winerim",
    metaDesc: "Estrategias prácticas para aumentar el gasto medio por cliente en tu restaurante. Descubre cómo el vino puede ser tu herramienta más efectiva.",
    badge: "Rentabilidad", breadLabel: "Aumentar ticket medio",
    heroTitle1: "Cómo aumentar el ", heroHighlight: "ticket medio", heroTitle2: " en un restaurante",
    heroDesc: "Estrategias prácticas para aumentar el gasto medio por cliente sin afectar la experiencia gastronómica.",
    ctaAnalyze: "Analizar mi carta de vinos", ctaDemo: "Solicitar demo",
    introTitle1: "El ticket medio: la métrica que define la ", introHighlight: "rentabilidad",
    introP1: "Aumentar el ticket medio es uno de los objetivos más importantes en restauración. No se trata de subir precios, sino de mejorar la experiencia de compra para que cada cliente gaste más de forma natural.",
    introP2: "Los factores que más influyen en el ticket medio son:",
    introP3: "De todos estos factores, el vino es la herramienta más efectiva para aumentar el ticket medio: alto margen, fácil de recomendar y presente durante toda la comida.",
    introFactors: ["Venta de bebidas, especialmente vino", "Recomendación activa del personal", "Estructura y diseño de la carta", "Experiencia global del cliente"],
    whyLabel: "El vino como palanca", whyTitle1: "Por qué el vino ", whyHighlight: "aumenta el ticket medio",
    wineAdvantages: [
      { title: "Mayor margen que otros productos", desc: "El vino ofrece márgenes del 65-75%, superiores a la mayoría de productos de la carta. Cada copa vendida mejora directamente la rentabilidad." },
      { title: "Fácil de compartir", desc: "Una botella se comparte entre toda la mesa, facilitando la venta. No necesitas convencer a cada comensal individualmente." },
      { title: "Acompaña toda la comida", desc: "A diferencia de otros productos, el vino puede estar presente desde el aperitivo hasta el postre, multiplicando las oportunidades de venta." },
      { title: "Múltiples opciones de precio", desc: "Desde copas a 5€ hasta botellas premium, el vino permite adaptarse al presupuesto de cada mesa y maximizar el gasto." },
    ],
    stratLabel: "Estrategias", stratTitle1: "5 formas de ", stratHighlight: "aumentar el ticket medio",
    strategies: [
      { title: "Ofrecer vinos por copa", desc: "La venta por copas reduce la barrera de entrada. Un cliente que no pediría una botella sí probará una copa. Ofrece al menos 6-8 referencias por copa." },
      { title: "Crear maridajes con platos", desc: "Sugiere un vino específico para cada plato destacado. Los maridajes aumentan la percepción de valor y facilitan la decisión del cliente." },
      { title: "Recomendar vinos desde la carta", desc: "Una carta bien estructurada con descripciones claras y recomendaciones destacadas guía al cliente hacia vinos de mayor valor." },
      { title: "Explicar el vino al cliente", desc: "Cuando el cliente entiende lo que bebe, está dispuesto a pagar más. Fichas de vino con notas de cata, origen y maridajes marcan la diferencia." },
      { title: "Mejorar la estructura de la carta", desc: "Organiza por estilos, no solo por regiones. Destaca 2-3 vinos por categoría. Posiciona los vinos con mejor margen en zonas de alta visibilidad." },
    ],
    errLabel: "Evita estos errores", errTitle1: "Errores que ", errHighlight: "reducen",
    mistakes: [
      "Cartas de vinos difíciles de entender con terminología excesivamente técnica",
      "Demasiadas referencias que paralizan la decisión del cliente",
      "Precios mal distribuidos con saltos grandes entre opciones",
      "Falta de recomendaciones que dejan al cliente sin orientación",
      "No ofrecer vino por copa, perdiendo ventas de mesas pequeñas",
      "Personal sin formación para recomendar vino con confianza",
    ],
    techLabel: "Tecnología", techTitle1: "Cómo Winerim te ayuda a ", techHighlight: "vender más",
    techBenefits: [
      { title: "Recomendar vinos automáticamente", desc: "Algoritmos que sugieren el vino ideal según el plato elegido, las preferencias del cliente y el momento del día." },
      { title: "Explicar el vino al cliente", desc: "Fichas digitales con notas de cata, maridajes, origen y puntuaciones. El cliente se siente informado y seguro al elegir." },
      { title: "Guiar la decisión de compra", desc: "Filtros interactivos, comparador de vinos y recomendaciones destacadas que simplifican la elección y aumentan el ticket." },
      { title: "Optimizar la carta con datos", desc: "Analítica de ventas que muestra qué vinos funcionan, cuáles rotan poco y dónde están las oportunidades de mejora." },
    ],
    impactLabel: "Impacto", impactTitle1: "Resultados ", impactHighlight: "reales",
    metrics: [{ value: "+15%", label: "Ticket medio" }, { value: "+20%", label: "Ventas de vino" }, { value: "+30%", label: "Rotación de referencias" }],
    ctaFinalLabel: "Da el siguiente paso", ctaFinalTitle1: "Descubre cuánto más podrías ", ctaFinalHighlight: "vender", ctaFinalDesc: "Analizamos tu carta de vinos y te mostramos oportunidades concretas para aumentar tu ticket medio.", ctaFinalButton: "Solicitar análisis de carta",
    links: [{ label: "Cómo vender más vino" }, { label: "Vino por copa en restaurantes" }, { label: "Calculadora ROI vino" }, { label: "Software carta de vinos" }],
  },
  en: {
    metaTitle: "How to Increase Average Ticket in a Restaurant | Winerim",
    metaDesc: "Practical strategies to increase average spend per customer in your restaurant. Discover how wine can be your most effective tool.",
    badge: "Profitability", breadLabel: "Increase average ticket",
    heroTitle1: "How to increase the ", heroHighlight: "average ticket", heroTitle2: " in a restaurant",
    heroDesc: "Practical strategies to increase average spend per customer without affecting the dining experience.",
    ctaAnalyze: "Analyze my wine list", ctaDemo: "Request demo",
    introTitle1: "Average ticket: the metric that defines ", introHighlight: "profitability",
    introP1: "Increasing the average ticket is one of the most important goals in hospitality. It's not about raising prices, but about improving the purchase experience so each customer spends more naturally.",
    introP2: "The factors that most influence the average ticket are:",
    introP3: "Of all these factors, wine is the most effective tool to increase the average ticket: high margin, easy to recommend, and present throughout the entire meal.",
    introFactors: ["Beverage sales, especially wine", "Active staff recommendations", "Menu structure and design", "Overall customer experience"],
    whyLabel: "Wine as a lever", whyTitle1: "Why wine ", whyHighlight: "increases the average ticket",
    wineAdvantages: [
      { title: "Higher margin than other products", desc: "Wine offers 65-75% margins, higher than most items on the menu. Every glass sold directly improves profitability." },
      { title: "Easy to share", desc: "A bottle is shared across the whole table, facilitating the sale. You don't need to convince each diner individually." },
      { title: "Accompanies the entire meal", desc: "Unlike other products, wine can be present from aperitif to dessert, multiplying sales opportunities." },
      { title: "Multiple price options", desc: "From glasses at €5 to premium bottles, wine adapts to each table's budget and maximizes spend." },
    ],
    stratLabel: "Strategies", stratTitle1: "5 ways to ", stratHighlight: "increase the average ticket",
    strategies: [
      { title: "Offer wines by the glass", desc: "By-the-glass sales lower the entry barrier. A customer who wouldn't order a bottle will try a glass. Offer at least 6-8 by-the-glass references." },
      { title: "Create food pairings", desc: "Suggest a specific wine for each featured dish. Pairings increase perceived value and ease customer decision-making." },
      { title: "Recommend wines from the list", desc: "A well-structured list with clear descriptions and highlighted recommendations guides customers toward higher-value wines." },
      { title: "Explain wine to the customer", desc: "When customers understand what they're drinking, they're willing to pay more. Wine cards with tasting notes, origin, and pairings make the difference." },
      { title: "Improve list structure", desc: "Organize by styles, not just regions. Highlight 2-3 wines per category. Position highest-margin wines in high-visibility areas." },
    ],
    errLabel: "Avoid these mistakes", errTitle1: "Mistakes that ", errHighlight: "reduce",
    mistakes: [
      "Wine lists that are hard to understand with overly technical terminology",
      "Too many references that paralyze customer decision-making",
      "Poorly distributed prices with large gaps between options",
      "Lack of recommendations that leave customers without guidance",
      "Not offering wine by the glass, losing sales from small tables",
      "Staff without training to recommend wine with confidence",
    ],
    techLabel: "Technology", techTitle1: "How Winerim helps you ", techHighlight: "sell more",
    techBenefits: [
      { title: "Recommend wines automatically", desc: "Algorithms that suggest the ideal wine based on the chosen dish, customer preferences, and time of day." },
      { title: "Explain wine to customers", desc: "Digital cards with tasting notes, pairings, origin, and scores. Customers feel informed and confident when choosing." },
      { title: "Guide purchase decisions", desc: "Interactive filters, wine comparator, and highlighted recommendations that simplify choices and increase the ticket." },
      { title: "Optimize the list with data", desc: "Sales analytics showing which wines work, which have low rotation, and where improvement opportunities lie." },
    ],
    impactLabel: "Impact", impactTitle1: "Real ", impactHighlight: "results",
    metrics: [{ value: "+15%", label: "Average ticket" }, { value: "+20%", label: "Wine sales" }, { value: "+30%", label: "Reference rotation" }],
    ctaFinalLabel: "Take the next step", ctaFinalTitle1: "Discover how much more you could ", ctaFinalHighlight: "sell", ctaFinalDesc: "We analyze your wine list and show you concrete opportunities to increase your average ticket.", ctaFinalButton: "Request list analysis",
    links: [{ label: "How to sell more wine" }, { label: "Wine by the glass" }, { label: "Wine ROI calculator" }, { label: "Wine list software" }],
  },
  it: {
    metaTitle: "Come Aumentare lo Scontrino Medio in un Ristorante | Winerim",
    metaDesc: "Strategie pratiche per aumentare la spesa media per cliente nel tuo ristorante. Scopri come il vino può essere il tuo strumento più efficace.",
    badge: "Redditività", breadLabel: "Aumentare lo scontrino medio",
    heroTitle1: "Come aumentare lo ", heroHighlight: "scontrino medio", heroTitle2: " in un ristorante",
    heroDesc: "Strategie pratiche per aumentare la spesa media per cliente senza influire sull'esperienza gastronomica.",
    ctaAnalyze: "Analizza la mia carta dei vini", ctaDemo: "Richiedi demo",
    introTitle1: "Lo scontrino medio: la metrica che definisce la ", introHighlight: "redditività",
    introP1: "Aumentare lo scontrino medio è uno degli obiettivi più importanti nella ristorazione. Non si tratta di alzare i prezzi, ma di migliorare l'esperienza d'acquisto perché ogni cliente spenda di più in modo naturale.",
    introP2: "I fattori che influenzano di più lo scontrino medio sono:",
    introP3: "Di tutti questi fattori, il vino è lo strumento più efficace per aumentare lo scontrino medio: alto margine, facile da raccomandare e presente durante tutto il pasto.",
    introFactors: ["Vendita di bevande, specialmente vino", "Raccomandazione attiva del personale", "Struttura e design del menù", "Esperienza complessiva del cliente"],
    whyLabel: "Il vino come leva", whyTitle1: "Perché il vino ", whyHighlight: "aumenta lo scontrino medio",
    wineAdvantages: [
      { title: "Margine più alto di altri prodotti", desc: "Il vino offre margini del 65-75%, superiori alla maggior parte dei prodotti del menù. Ogni calice venduto migliora direttamente la redditività." },
      { title: "Facile da condividere", desc: "Una bottiglia si condivide tra tutto il tavolo, facilitando la vendita. Non devi convincere ogni commensale individualmente." },
      { title: "Accompagna tutto il pasto", desc: "A differenza di altri prodotti, il vino può essere presente dall'aperitivo al dessert, moltiplicando le opportunità di vendita." },
      { title: "Molteplici opzioni di prezzo", desc: "Dai calici a 5€ alle bottiglie premium, il vino permette di adattarsi al budget di ogni tavolo e massimizzare la spesa." },
    ],
    stratLabel: "Strategie", stratTitle1: "5 modi per ", stratHighlight: "aumentare lo scontrino medio",
    strategies: [
      { title: "Offrire vini al calice", desc: "La vendita al calice riduce la barriera d'ingresso. Un cliente che non ordinerebbe una bottiglia proverà un calice. Offri almeno 6-8 referenze al calice." },
      { title: "Creare abbinamenti con i piatti", desc: "Suggerisci un vino specifico per ogni piatto in evidenza. Gli abbinamenti aumentano la percezione di valore e facilitano la decisione del cliente." },
      { title: "Raccomandare vini dalla carta", desc: "Una carta ben strutturata con descrizioni chiare e raccomandazioni in evidenza guida il cliente verso vini di maggior valore." },
      { title: "Spiegare il vino al cliente", desc: "Quando il cliente capisce cosa beve, è disposto a pagare di più. Schede vino con note di degustazione, origine e abbinamenti fanno la differenza." },
      { title: "Migliorare la struttura della carta", desc: "Organizza per stili, non solo per regioni. Evidenzia 2-3 vini per categoria. Posiziona i vini con il miglior margine nelle zone di alta visibilità." },
    ],
    errLabel: "Evita questi errori", errTitle1: "Errori che ", errHighlight: "riducono",
    mistakes: [
      "Carte dei vini difficili da capire con terminologia eccessivamente tecnica",
      "Troppe referenze che paralizzano la decisione del cliente",
      "Prezzi mal distribuiti con grandi salti tra le opzioni",
      "Mancanza di raccomandazioni che lasciano il cliente senza orientamento",
      "Non offrire vino al calice, perdendo vendite da tavoli piccoli",
      "Personale senza formazione per raccomandare vino con sicurezza",
    ],
    techLabel: "Tecnologia", techTitle1: "Come Winerim ti aiuta a ", techHighlight: "vendere di più",
    techBenefits: [
      { title: "Raccomandare vini automaticamente", desc: "Algoritmi che suggeriscono il vino ideale in base al piatto scelto, alle preferenze del cliente e al momento della giornata." },
      { title: "Spiegare il vino al cliente", desc: "Schede digitali con note di degustazione, abbinamenti, origine e punteggi. Il cliente si sente informato e sicuro nella scelta." },
      { title: "Guidare la decisione d'acquisto", desc: "Filtri interattivi, comparatore di vini e raccomandazioni in evidenza che semplificano la scelta e aumentano lo scontrino." },
      { title: "Ottimizzare la carta con i dati", desc: "Analisi delle vendite che mostra quali vini funzionano, quali hanno poca rotazione e dove sono le opportunità di miglioramento." },
    ],
    impactLabel: "Impatto", impactTitle1: "Risultati ", impactHighlight: "reali",
    metrics: [{ value: "+15%", label: "Scontrino medio" }, { value: "+20%", label: "Vendite di vino" }, { value: "+30%", label: "Rotazione referenze" }],
    ctaFinalLabel: "Fai il prossimo passo", ctaFinalTitle1: "Scopri quanto di più potresti ", ctaFinalHighlight: "vendere", ctaFinalDesc: "Analizziamo la tua carta dei vini e ti mostriamo opportunità concrete per aumentare il tuo scontrino medio.", ctaFinalButton: "Richiedi analisi della carta",
    links: [{ label: "Come vendere più vino" }, { label: "Vino al calice nei ristoranti" }, { label: "Calcolatore ROI vino" }, { label: "Software carta dei vini" }],
  },
  fr: {
    metaTitle: "Comment Augmenter le Ticket Moyen dans un Restaurant | Winerim",
    metaDesc: "Stratégies pratiques pour augmenter le panier moyen par client dans votre restaurant. Découvrez comment le vin peut être votre outil le plus efficace.",
    badge: "Rentabilité", breadLabel: "Augmenter le ticket moyen",
    heroTitle1: "Comment augmenter le ", heroHighlight: "ticket moyen", heroTitle2: " dans un restaurant",
    heroDesc: "Stratégies pratiques pour augmenter le panier moyen par client sans affecter l'expérience gastronomique.",
    ctaAnalyze: "Analyser ma carte des vins", ctaDemo: "Demander une démo",
    introTitle1: "Le ticket moyen : la métrique qui définit la ", introHighlight: "rentabilité",
    introP1: "Augmenter le ticket moyen est l'un des objectifs les plus importants en restauration. Il ne s'agit pas d'augmenter les prix, mais d'améliorer l'expérience d'achat pour que chaque client dépense plus naturellement.",
    introP2: "Les facteurs qui influencent le plus le ticket moyen sont :",
    introP3: "De tous ces facteurs, le vin est l'outil le plus efficace pour augmenter le ticket moyen : marge élevée, facile à recommander et présent tout au long du repas.",
    introFactors: ["Vente de boissons, surtout le vin", "Recommandation active du personnel", "Structure et design de la carte", "Expérience globale du client"],
    whyLabel: "Le vin comme levier", whyTitle1: "Pourquoi le vin ", whyHighlight: "augmente le ticket moyen",
    wineAdvantages: [
      { title: "Marge plus élevée que les autres produits", desc: "Le vin offre des marges de 65-75%, supérieures à la plupart des produits de la carte. Chaque verre vendu améliore directement la rentabilité." },
      { title: "Facile à partager", desc: "Une bouteille se partage à toute la table, facilitant la vente. Pas besoin de convaincre chaque convive individuellement." },
      { title: "Accompagne tout le repas", desc: "Contrairement à d'autres produits, le vin peut être présent de l'apéritif au dessert, multipliant les opportunités de vente." },
      { title: "Multiples options de prix", desc: "Des verres à 5€ aux bouteilles premium, le vin s'adapte au budget de chaque table et maximise les dépenses." },
    ],
    stratLabel: "Stratégies", stratTitle1: "5 façons d'", stratHighlight: "augmenter le ticket moyen",
    strategies: [
      { title: "Proposer des vins au verre", desc: "La vente au verre réduit la barrière d'entrée. Un client qui ne commanderait pas une bouteille essaiera un verre. Proposez au moins 6-8 références au verre." },
      { title: "Créer des accords mets-vins", desc: "Suggérez un vin spécifique pour chaque plat vedette. Les accords augmentent la perception de valeur et facilitent la décision du client." },
      { title: "Recommander des vins depuis la carte", desc: "Une carte bien structurée avec des descriptions claires et des recommandations mises en avant guide le client vers des vins de plus grande valeur." },
      { title: "Expliquer le vin au client", desc: "Quand le client comprend ce qu'il boit, il est prêt à payer plus. Des fiches vin avec notes de dégustation, origine et accords font la différence." },
      { title: "Améliorer la structure de la carte", desc: "Organisez par styles, pas seulement par régions. Mettez en avant 2-3 vins par catégorie. Positionnez les vins à meilleure marge dans les zones de haute visibilité." },
    ],
    errLabel: "Évitez ces erreurs", errTitle1: "Erreurs qui ", errHighlight: "réduisent",
    mistakes: [
      "Cartes des vins difficiles à comprendre avec une terminologie trop technique",
      "Trop de références qui paralysent la décision du client",
      "Prix mal répartis avec de grands écarts entre les options",
      "Manque de recommandations qui laissent le client sans orientation",
      "Ne pas proposer de vin au verre, perdant les ventes des petites tables",
      "Personnel non formé pour recommander du vin avec confiance",
    ],
    techLabel: "Technologie", techTitle1: "Comment Winerim vous aide à ", techHighlight: "vendre plus",
    techBenefits: [
      { title: "Recommander des vins automatiquement", desc: "Des algorithmes qui suggèrent le vin idéal en fonction du plat choisi, des préférences du client et du moment de la journée." },
      { title: "Expliquer le vin au client", desc: "Fiches digitales avec notes de dégustation, accords, origine et notations. Le client se sent informé et confiant dans son choix." },
      { title: "Guider la décision d'achat", desc: "Filtres interactifs, comparateur de vins et recommandations mises en avant qui simplifient le choix et augmentent le ticket." },
      { title: "Optimiser la carte avec les données", desc: "Analytique des ventes montrant quels vins fonctionnent, lesquels ont une faible rotation et où se trouvent les opportunités d'amélioration." },
    ],
    impactLabel: "Impact", impactTitle1: "Résultats ", impactHighlight: "réels",
    metrics: [{ value: "+15%", label: "Ticket moyen" }, { value: "+20%", label: "Ventes de vin" }, { value: "+30%", label: "Rotation des références" }],
    ctaFinalLabel: "Passez à l'étape suivante", ctaFinalTitle1: "Découvrez combien de plus vous pourriez ", ctaFinalHighlight: "vendre", ctaFinalDesc: "Nous analysons votre carte des vins et vous montrons des opportunités concrètes pour augmenter votre ticket moyen.", ctaFinalButton: "Demander l'analyse de la carte",
    links: [{ label: "Comment vendre plus de vin" }, { label: "Vin au verre" }, { label: "Calculateur ROI vin" }, { label: "Logiciel carte des vins" }],
  },
};


const wineAdvIcons = [DollarSign, Users, Utensils, Target];
const stratIcons = [GlassWater, Utensils, BookOpen, Users, Target];
const techIcons = [Sparkles, BookOpen, Target, BarChart3];
const metricIcons = [TrendingUp, Wine, BarChart3];

const AumentarTicketMedio = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = translations[lang] || translations.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "ticket-medio-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: t.metaTitle,
      description: t.metaDesc,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("ticket-medio-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/soluciones/aumentar-ticket-medio-restaurante" type="article"
        hreflang={allLangPaths("/soluciones/aumentar-ticket-medio-restaurante")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Soluciones" }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <TrendingUp size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroHighlight}</span>{t.heroTitle2}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/wine-list-analyzer")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaAnalyze} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaDemo}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                {t.introTitle1}<span className="text-gradient-wine italic">{t.introHighlight}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>{t.introP1}</p>
                <p>{t.introP2}</p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[Wine, Users, BookOpen, Sparkles].map((Icon, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon size={16} className="text-wine shrink-0 mt-1" />
                      <span>{t.introFactors[i]}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{t.introP3}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY WINE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.whyLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.whyTitle1}<span className="text-gradient-wine italic">{t.whyHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {t.wineAdvantages.map((adv, i) => {
              const Icon = wineAdvIcons[i] || DollarSign;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
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
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.stratLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.stratTitle1}<span className="text-gradient-wine italic">{t.stratHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {t.strategies.map((s, i) => {
              const Icon = stratIcons[i] || GlassWater;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{`${i + 1}. ${s.title}`}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.errLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.errTitle1}<span className="text-gradient-wine italic">{t.errHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.mistakes.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                  <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{m}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.techLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.techTitle1}<span className="text-gradient-wine italic">{t.techHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {t.techBenefits.map((tb, i) => {
              const Icon = techIcons[i] || Sparkles;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{tb.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tb.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.impactLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.impactTitle1}<span className="text-gradient-wine italic">{t.impactHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.metrics.map((m, i) => {
              const Icon = metricIcons[i] || TrendingUp;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-wine mb-2">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaFinalLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaFinalTitle1}<span className="text-gradient-wine italic">{t.ctaFinalHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaFinalDesc}</p>
              <Link to={localePath("/wine-list-analyzer")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaFinalButton} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/como-vender-mas-vino-en-un-restaurante"), label: t.links[0].label, type: "guide" },
        { to: localePath("/vino-por-copa-restaurante"), label: t.links[1].label, type: "guide" },
        { to: localePath("/wine-roi-calculator"), label: t.links[2].label, type: "tool" },
        { to: localePath("/software-carta-de-vinos"), label: t.links[3].label, type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default AumentarTicketMedio;
