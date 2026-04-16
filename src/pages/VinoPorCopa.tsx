import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, GlassWater, BarChart3, TrendingUp, Target,
  Utensils, Users, ShoppingCart, Calculator, Lightbulb, CheckCircle, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type IconType = typeof Wine;

interface PageContent {
  metaTitle: string; metaDescription: string; url: string;
  breadcrumbLabel: string; badge: string;
  h1pre: string; h1accent: string; subtitle: string;
  ctaAnalyze: string; ctaDemo: string;
  introTag: string; introH2pre: string; introH2accent: string; introP: string;
  introBenefits: { icon: IconType; text: string }[];
  howManyTag: string; howManyH2pre: string; howManyH2accent: string; howManySubtitle: string;
  glassOfferings: { type: string; range: string; desc: string }[];
  pricingTag: string; pricingH2pre: string; pricingH2accent: string;
  pricingP: string; pricingItems: { label: string; value: string; icon: IconType }[];
  pricingRuleTitle: string; pricingRuleP: string; pricingNote: string;
  bestTag: string; bestH2pre: string; bestH2accent: string;
  bestWines: { icon: IconType; title: string; desc: string }[];
  pairingTag: string; pairingH2pre: string; pairingH2accent: string;
  pairingP1: string; pairingP2: string; pairingLabel: string;
  pairingExamples: { dish: string; wine: string }[];
  techTag: string; techH2pre: string; techH2accent: string; techSubtitle: string;
  techFeatures: { title: string; desc: string }[];
  ctaTag: string; ctaH2pre: string; ctaH2accent: string; ctaSubtitle: string;
  ctaPrimary: string; ctaSecondary: string;
  faqs: { q: string; a: string }[];
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
}

const i18n: I18nMap<PageContent> = {
  es: {
    metaTitle: "Cómo Vender Vino por Copa en un Restaurante | Guía Práctica",
    metaDescription: "Guía práctica para diseñar una oferta de vinos por copa rentable en tu restaurante.",
    url: "https://winerim.wine/vino-por-copa-restaurante",
    breadcrumbLabel: "Vino por copa", badge: "Vino por copa",
    h1pre: "Cómo vender vino por copa en un", h1accent: "restaurante",
    subtitle: "Guía práctica para diseñar una oferta de vinos por copa rentable, atractiva para el cliente y fácil de gestionar.",
    ctaAnalyze: "Analizar mi carta de vinos", ctaDemo: "Solicitar demo",
    introTag: "La oportunidad", introH2pre: "El vino por copa es la forma más efectiva de", introH2accent: "vender más vino",
    introP: "Ofrecer vino por copa elimina la barrera más importante de la venta de vino: el compromiso con una botella entera. El cliente puede explorar, probar y disfrutar sin riesgo. Para el restaurante, es una herramienta potente para aumentar el ticket medio y la rotación de bodega.",
    introBenefits: [
      { icon: Users, text: "Reduce el miedo del cliente a elegir mal" },
      { icon: Wine, text: "Permite probar más vinos en una misma comida" },
      { icon: TrendingUp, text: "Aumenta el ticket medio de la mesa" },
      { icon: ShoppingCart, text: "Mejora la rotación de botellas en bodega" },
    ],
    howManyTag: "La cantidad justa", howManyH2pre: "¿Cuántos vinos ofrecer", howManyH2accent: "por copa?",
    howManySubtitle: "Demasiadas opciones confunden. Pocas opciones limitan. La clave está en el equilibrio según el tipo de restaurante.",
    glassOfferings: [
      { type: "Restaurante pequeño", range: "3 – 5 vinos", desc: "Selección esencial: un blanco, un rosado y dos o tres tintos. Suficiente para cubrir todos los perfiles sin complicar la gestión." },
      { type: "Restaurante medio", range: "5 – 8 vinos", desc: "Variedad equilibrada con representación de estilos y regiones. Espacio para incluir un espumoso y un vino dulce o generoso." },
      { type: "Restaurante gastronómico", range: "8 – 12 vinos", desc: "Carta por copa ambiciosa que permite maridajes completos. Incluye opciones premium y rotación frecuente de referencias." },
    ],
    pricingTag: "Estrategia de pricing", pricingH2pre: "Cómo fijar el precio del vino", pricingH2accent: "por copa",
    pricingP: "El método más habitual parte de una regla simple: <strong>cubrir el coste de la botella con las primeras 2-3 copas vendidas</strong>. El resto es beneficio neto. Veamos un ejemplo práctico:",
    pricingItems: [
      { label: "Coste botella", value: "24 €", icon: Wine },
      { label: "Copas por botella", value: "5", icon: GlassWater },
      { label: "Precio por copa", value: "6 – 8 €", icon: Calculator },
    ],
    pricingRuleTitle: "💡 La regla de oro",
    pricingRuleP: "Con 5 copas a 7 € cada una, facturas 35 € por una botella de 24 €. Las <strong>dos primeras copas ya cubren el coste</strong>. Las tres restantes son margen puro. Si se pierden 1-2 copas por merma, la operación sigue siendo rentable.",
    pricingNote: "Para vinos premium, ajusta el multiplicador a la baja (×1.5-2) para mantener precios atractivos. Para vinos de entrada, puedes aplicar márgenes mayores (×2.5-3) porque el precio absoluto sigue siendo bajo.",
    bestTag: "Selección inteligente", bestH2pre: "Qué vinos funcionan mejor", bestH2accent: "por copa",
    bestWines: [
      { icon: Star, title: "Vinos versátiles", desc: "Vinos que funcionan con muchos platos diferentes, facilitando la recomendación del personal y la decisión del cliente." },
      { icon: Utensils, title: "Vinos gastronómicos", desc: "Referencias pensadas para acompañar comida, con buena acidez y estructura. Son los que mejor convierten en mesa." },
      { icon: Users, title: "Vinos conocidos", desc: "Denominaciones y variedades que el cliente reconoce generan confianza. Rioja, Verdejo, Albariño, Malbec funcionan como anclas." },
      { icon: TrendingUp, title: "Buena relación calidad-precio", desc: "El cliente que pide por copa es sensible al precio unitario. Ofrecer calidad percibida alta a precio justo maximiza la repetición." },
    ],
    pairingTag: "Venta cruzada", pairingH2pre: "El maridaje multiplica la venta", pairingH2accent: "por copa",
    pairingP1: "Sugerir un vino por copa junto a cada plato del menú es la técnica de venta más efectiva en hostelería. El cliente percibe la recomendación como un servicio, no como una venta — y pide más.",
    pairingP2: "Cuando un comensal ve <strong>\"Recomendado con este plato\"</strong> junto a un vino por copa, la probabilidad de pedirlo se multiplica. Es la venta más natural que existe.",
    pairingLabel: "Ejemplo de maridaje",
    pairingExamples: [
      { dish: "Ensalada de burrata", wine: "Verdejo — 6,50 €/copa" },
      { dish: "Risotto de setas", wine: "Chardonnay fermentado — 7 €/copa" },
      { dish: "Entrecot a la brasa", wine: "Ribera del Duero Crianza — 8 €/copa" },
      { dish: "Tarta de chocolate", wine: "Pedro Ximénez — 5,50 €/copa" },
    ],
    techTag: "La solución", techH2pre: "Cómo la tecnología potencia la venta", techH2accent: "por copa",
    techSubtitle: "Herramientas como Winerim automatizan las recomendaciones y hacen que cada copa se venda sola.",
    techFeatures: [
      { title: "Sugerir vinos por copa", desc: "El sistema recomienda el vino por copa ideal según el plato elegido y las preferencias del comensal." },
      { title: "Mostrar maridajes", desc: "Cada vino por copa aparece vinculado a los platos del menú, multiplicando las oportunidades de venta cruzada." },
      { title: "Explicar el vino al cliente", desc: "Notas de cata claras, orígenes y perfiles sensoriales que hacen el vino accesible sin necesidad de sommelier." },
      { title: "Mejorar la decisión del comensal", desc: "Filtros, comparaciones y recomendaciones que eliminan la parálisis de elección y aceleran el pedido." },
    ],
    ctaTag: "Análisis gratuito", ctaH2pre: "Descubre si tu oferta de vinos por copa está", ctaH2accent: "optimizada",
    ctaSubtitle: "Envíanos tu carta y analizamos tu selección de vinos por copa, precios, maridajes y oportunidades de mejora. Sin compromiso.",
    ctaPrimary: "Solicitar análisis gratuito", ctaSecondary: "Contactar",
    faqs: [
      { q: "¿Cuántos vinos por copa debería ofrecer un restaurante?", a: "Depende del tipo de restaurante: entre 3-5 para establecimientos pequeños, 5-8 para restaurantes de tamaño medio y 8-12 para restaurantes gastronómicos." },
      { q: "¿Cómo se calcula el precio de un vino por copa?", a: "El método más habitual es dividir el coste de la botella entre el número de copas (normalmente 5) y aplicar un margen. El objetivo es cubrir el coste de la botella con las primeras 2-3 copas vendidas." },
      { q: "¿Qué tipo de vinos funcionan mejor por copa?", a: "Los vinos versátiles que maridan con muchos platos, las denominaciones conocidas, los vinos gastronómicos con buena acidez y los que ofrecen buena relación calidad-precio." },
      { q: "¿Cómo aumentar las ventas de vino por copa?", a: "Sugiriendo maridajes con cada plato, utilizando herramientas digitales, formando al personal en técnicas de venta y manteniendo una oferta rotativa." },
    ],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora precio por copa", type: "tool" },
      { to: "/como-vender-mas-vino-en-un-restaurante", label: "Cómo vender más vino", type: "guide" },
      { to: "/precio-vino-restaurante", label: "Precio vino restaurante", type: "guide" },
    ],
  },
  en: {
    metaTitle: "How to Sell Wine by the Glass in a Restaurant | Practical Guide",
    metaDescription: "Practical guide to designing a profitable wine-by-the-glass programme in your restaurant.",
    url: "https://winerim.wine/en/wine-by-glass-restaurant",
    breadcrumbLabel: "Wine by the glass", badge: "Wine by the glass",
    h1pre: "How to sell wine by the glass in a", h1accent: "restaurant",
    subtitle: "Practical guide to designing a profitable, guest-friendly and manageable wine-by-the-glass programme.",
    ctaAnalyze: "Analyse my wine list", ctaDemo: "Request demo",
    introTag: "The opportunity", introH2pre: "Wine by the glass is the most effective way to", introH2accent: "sell more wine",
    introP: "Offering wine by the glass removes the biggest barrier to wine sales: the commitment to a full bottle. The guest can explore, taste and enjoy risk-free. For the restaurant it's a powerful tool to increase the average ticket and cellar rotation.",
    introBenefits: [
      { icon: Users, text: "Reduces the guest's fear of choosing wrong" },
      { icon: Wine, text: "Allows trying more wines in a single meal" },
      { icon: TrendingUp, text: "Increases the table's average ticket" },
      { icon: ShoppingCart, text: "Improves bottle rotation in the cellar" },
    ],
    howManyTag: "The right number", howManyH2pre: "How many wines to offer", howManyH2accent: "by the glass?",
    howManySubtitle: "Too many options confuse. Too few options limit. The key is balance based on restaurant type.",
    glassOfferings: [
      { type: "Small restaurant", range: "3 – 5 wines", desc: "Essential selection: one white, one rosé and two or three reds. Enough to cover all profiles without complicating operations." },
      { type: "Mid-size restaurant", range: "5 – 8 wines", desc: "Balanced variety with style and region representation. Room for a sparkling wine and a sweet or fortified option." },
      { type: "Fine dining", range: "8 – 12 wines", desc: "Ambitious by-the-glass programme enabling full pairings. Includes premium options and frequent reference rotation." },
    ],
    pricingTag: "Pricing strategy", pricingH2pre: "How to price wine", pricingH2accent: "by the glass",
    pricingP: "The most common method starts with a simple rule: <strong>cover the bottle cost with the first 2-3 glasses sold</strong>. The rest is net profit. Here's a practical example:",
    pricingItems: [
      { label: "Bottle cost", value: "€24", icon: Wine },
      { label: "Glasses per bottle", value: "5", icon: GlassWater },
      { label: "Price per glass", value: "€6 – 8", icon: Calculator },
    ],
    pricingRuleTitle: "💡 The golden rule",
    pricingRuleP: "With 5 glasses at €7 each, you invoice €35 for a €24 bottle. The <strong>first two glasses already cover the cost</strong>. The remaining three are pure margin. If 1-2 glasses are lost to waste, the operation is still profitable.",
    pricingNote: "For premium wines, lower the multiplier (×1.5-2) to keep prices attractive. For entry-level wines, you can apply higher margins (×2.5-3) because the absolute price stays low.",
    bestTag: "Smart selection", bestH2pre: "Which wines work best", bestH2accent: "by the glass",
    bestWines: [
      { icon: Star, title: "Versatile wines", desc: "Wines that pair with many dishes, making it easy for staff to recommend and for guests to decide." },
      { icon: Utensils, title: "Gastronomic wines", desc: "References designed to accompany food, with good acidity and structure. These convert best at the table." },
      { icon: Users, title: "Recognised wines", desc: "Appellations and varieties guests recognise build trust. Rioja, Sauvignon Blanc, Pinot Noir, Malbec work as anchors." },
      { icon: TrendingUp, title: "Great value for money", desc: "By-the-glass drinkers are sensitive to unit price. Offering high perceived quality at a fair price maximises repeat orders." },
    ],
    pairingTag: "Cross-selling", pairingH2pre: "Pairings multiply", pairingH2accent: "by-the-glass sales",
    pairingP1: "Suggesting a wine by the glass alongside each menu dish is the most effective sales technique in hospitality. The guest perceives the recommendation as service, not selling — and orders more.",
    pairingP2: "When a diner sees <strong>\"Recommended with this dish\"</strong> next to a wine by the glass, the probability of ordering it multiplies. It's the most natural sale there is.",
    pairingLabel: "Pairing example",
    pairingExamples: [
      { dish: "Burrata salad", wine: "Sauvignon Blanc — €6.50/glass" },
      { dish: "Mushroom risotto", wine: "Barrel-fermented Chardonnay — €7/glass" },
      { dish: "Grilled ribeye", wine: "Rioja Crianza — €8/glass" },
      { dish: "Chocolate tart", wine: "Pedro Ximénez — €5.50/glass" },
    ],
    techTag: "The solution", techH2pre: "How technology boosts", techH2accent: "by-the-glass sales",
    techSubtitle: "Tools like Winerim automate recommendations and make every glass sell itself.",
    techFeatures: [
      { title: "Suggest wines by the glass", desc: "The system recommends the ideal glass wine based on the chosen dish and the diner's preferences." },
      { title: "Show pairings", desc: "Each by-the-glass wine is linked to menu dishes, multiplying cross-sell opportunities." },
      { title: "Explain wine to the guest", desc: "Clear tasting notes, origins and sensory profiles that make wine accessible without a sommelier." },
      { title: "Improve the guest's decision", desc: "Filters, comparisons and recommendations that eliminate choice paralysis and speed up ordering." },
    ],
    ctaTag: "Free analysis", ctaH2pre: "Find out if your by-the-glass programme is", ctaH2accent: "optimised",
    ctaSubtitle: "Send us your list and we'll analyse your by-the-glass selection, pricing, pairings and improvement opportunities. No commitment.",
    ctaPrimary: "Request free analysis", ctaSecondary: "Contact us",
    faqs: [
      { q: "How many wines by the glass should a restaurant offer?", a: "It depends on the type: 3-5 for small venues, 5-8 for mid-size restaurants and 8-12 for fine dining." },
      { q: "How do you calculate the price of wine by the glass?", a: "The most common method is dividing the bottle cost by the number of glasses (usually 5) and applying a margin. The goal is covering the bottle cost with the first 2-3 glasses sold." },
      { q: "What types of wines work best by the glass?", a: "Versatile wines that pair with many dishes, recognised appellations, gastronomic wines with good acidity, and those offering great value for money." },
      { q: "How can I increase by-the-glass sales?", a: "By suggesting pairings with each dish, using digital tools, training staff in sales techniques and maintaining a rotating offer." },
    ],
    links: [
      { to: "/en/tools/wine-by-glass-price-calculator", label: "By-the-glass price calculator", type: "tool" },
      { to: "/en/how-to-sell-more-wine-in-restaurants", label: "How to sell more wine", type: "guide" },
      { to: "/en/wine-pricing-restaurant", label: "Wine pricing in restaurants", type: "guide" },
    ],
  },
  it: {
    metaTitle: "Come Vendere Vino al Calice al Ristorante | Guida Pratica",
    metaDescription: "Guida pratica per progettare un'offerta di vini al calice redditizia nel tuo ristorante. Scopri quanti vini offrire, come fissare i prezzi, quali referenze funzionano meglio e come aumentare le vendite.",
    url: "https://winerim.wine/it/vino-al-calice-ristorante",
    breadcrumbLabel: "Vino al calice", badge: "Vino al calice",
    h1pre: "Come vendere vino al calice in un", h1accent: "ristorante",
    subtitle: "Guida pratica per progettare un'offerta di vini al calice redditizia, attraente per il cliente e facile da gestire.",
    ctaAnalyze: "Analizza la mia carta dei vini", ctaDemo: "Richiedi demo",
    introTag: "L'opportunità", introH2pre: "Il vino al calice è il modo più efficace per", introH2accent: "vendere più vino",
    introP: "Offrire vino al calice elimina la barriera più importante della vendita di vino: l'impegno con una bottiglia intera. Il cliente può esplorare, assaggiare e gustare senza rischio. Per il ristorante è uno strumento potente per aumentare lo scontrino medio e la rotazione della cantina.",
    introBenefits: [
      { icon: Users, text: "Riduce la paura del cliente di scegliere male" },
      { icon: Wine, text: "Permette di provare più vini nello stesso pasto" },
      { icon: TrendingUp, text: "Aumenta lo scontrino medio del tavolo" },
      { icon: ShoppingCart, text: "Migliora la rotazione delle bottiglie in cantina" },
    ],
    howManyTag: "La quantità giusta", howManyH2pre: "Quanti vini offrire", howManyH2accent: "al calice?",
    howManySubtitle: "Troppe opzioni confondono. Poche opzioni limitano. La chiave è l'equilibrio in base al tipo di ristorante.",
    glassOfferings: [
      { type: "Ristorante piccolo", range: "3 – 5 vini", desc: "Selezione essenziale: un bianco, un rosato e due o tre rossi. Sufficiente per coprire tutti i profili senza complicare la gestione." },
      { type: "Ristorante medio", range: "5 – 8 vini", desc: "Varietà equilibrata con rappresentazione di stili e regioni. Spazio per includere uno spumante e un vino dolce o liquoroso." },
      { type: "Ristorante gourmet", range: "8 – 12 vini", desc: "Carta al calice ambiziosa che permette abbinamenti completi. Include opzioni premium e rotazione frequente delle referenze." },
    ],
    pricingTag: "Strategia di pricing", pricingH2pre: "Come fissare il prezzo del vino", pricingH2accent: "al calice",
    pricingP: "Il metodo più comune parte da una regola semplice: <strong>coprire il costo della bottiglia con i primi 2-3 calici venduti</strong>. Il resto è profitto netto. Vediamo un esempio pratico:",
    pricingItems: [
      { label: "Costo bottiglia", value: "24 €", icon: Wine },
      { label: "Calici per bottiglia", value: "5", icon: GlassWater },
      { label: "Prezzo per calice", value: "6 – 8 €", icon: Calculator },
    ],
    pricingRuleTitle: "💡 La regola d'oro",
    pricingRuleP: "Con 5 calici a 7 € ciascuno, fatturi 35 € per una bottiglia da 24 €. I <strong>primi due calici coprono già il costo</strong>. I tre restanti sono margine puro. Se si perdono 1-2 calici per spreco, l'operazione resta redditizia.",
    pricingNote: "Per i vini premium, abbassa il moltiplicatore (×1.5-2) per mantenere prezzi attraenti. Per i vini d'ingresso, puoi applicare margini maggiori (×2.5-3) perché il prezzo assoluto resta basso.",
    bestTag: "Selezione intelligente", bestH2pre: "Quali vini funzionano meglio", bestH2accent: "al calice",
    bestWines: [
      { icon: Star, title: "Vini versatili", desc: "Vini che funzionano con molti piatti diversi, facilitando la raccomandazione del personale e la decisione del cliente." },
      { icon: Utensils, title: "Vini gastronomici", desc: "Referenze pensate per accompagnare il cibo, con buona acidità e struttura. Sono quelli che convertono meglio al tavolo." },
      { icon: Users, title: "Vini conosciuti", desc: "Denominazioni e vitigni che il cliente riconosce generano fiducia. Chianti, Prosecco, Barolo, Vermentino funzionano come ancore." },
      { icon: TrendingUp, title: "Buon rapporto qualità-prezzo", desc: "Il cliente che ordina al calice è sensibile al prezzo unitario. Offrire alta qualità percepita a prezzo giusto massimizza la ripetizione." },
    ],
    pairingTag: "Vendita incrociata", pairingH2pre: "L'abbinamento moltiplica la vendita", pairingH2accent: "al calice",
    pairingP1: "Suggerire un vino al calice accanto a ogni piatto del menù è la tecnica di vendita più efficace nella ristorazione. Il cliente percepisce la raccomandazione come un servizio, non come una vendita — e ordina di più.",
    pairingP2: "Quando un commensale vede <strong>\"Consigliato con questo piatto\"</strong> accanto a un vino al calice, la probabilità di ordinarlo si moltiplica. È la vendita più naturale che esista.",
    pairingLabel: "Esempio di abbinamento",
    pairingExamples: [
      { dish: "Insalata di burrata", wine: "Vermentino — 6,50 €/calice" },
      { dish: "Risotto ai funghi", wine: "Chardonnay barricato — 7 €/calice" },
      { dish: "Tagliata alla griglia", wine: "Chianti Classico Riserva — 8 €/calice" },
      { dish: "Torta al cioccolato", wine: "Passito — 5,50 €/calice" },
    ],
    techTag: "La soluzione", techH2pre: "Come la tecnologia potenzia la vendita", techH2accent: "al calice",
    techSubtitle: "Strumenti come Winerim automatizzano le raccomandazioni e fanno sì che ogni calice si venda da solo.",
    techFeatures: [
      { title: "Suggerire vini al calice", desc: "Il sistema raccomanda il vino al calice ideale in base al piatto scelto e alle preferenze del commensale." },
      { title: "Mostrare abbinamenti", desc: "Ogni vino al calice appare collegato ai piatti del menù, moltiplicando le opportunità di vendita incrociata." },
      { title: "Spiegare il vino al cliente", desc: "Note di degustazione chiare, origini e profili sensoriali che rendono il vino accessibile senza bisogno di sommelier." },
      { title: "Migliorare la decisione del commensale", desc: "Filtri, confronti e raccomandazioni che eliminano la paralisi della scelta e accelerano l'ordinazione." },
    ],
    ctaTag: "Analisi gratuita", ctaH2pre: "Scopri se la tua offerta di vini al calice è", ctaH2accent: "ottimizzata",
    ctaSubtitle: "Inviaci la tua carta e analizziamo la tua selezione di vini al calice, prezzi, abbinamenti e opportunità di miglioramento. Senza impegno.",
    ctaPrimary: "Richiedi analisi gratuita", ctaSecondary: "Contattaci",
    faqs: [
      { q: "Quanti vini al calice dovrebbe offrire un ristorante?", a: "Dipende dal tipo: tra 3-5 per locali piccoli, 5-8 per ristoranti medi e 8-12 per ristoranti gourmet." },
      { q: "Come si calcola il prezzo di un vino al calice?", a: "Il metodo più comune è dividere il costo della bottiglia per il numero di calici (di solito 5) e applicare un margine. L'obiettivo è coprire il costo della bottiglia con i primi 2-3 calici venduti." },
      { q: "Quali tipi di vini funzionano meglio al calice?", a: "I vini versatili che si abbinano a molti piatti, le denominazioni conosciute, i vini gastronomici con buona acidità e quelli con buon rapporto qualità-prezzo." },
      { q: "Come aumentare le vendite di vino al calice?", a: "Suggerendo abbinamenti con ogni piatto, utilizzando strumenti digitali, formando il personale e mantenendo un'offerta rotativa." },
    ],
    links: [
      { to: "/it/strumenti/calcolatrice-prezzo-vino-al-calice", label: "Calcolatrice prezzo al calice", type: "tool" },
      { to: "/it/come-vendere-piu-vino-ristorante", label: "Come vendere più vino", type: "guide" },
      { to: "/it/prezzo-vino-ristorante", label: "Prezzo vino ristorante", type: "guide" },
    ],
  },
  fr: {
    metaTitle: "Comment Vendre du Vin au Verre au Restaurant | Guide Pratique",
    metaDescription: "Guide pratique pour concevoir une offre de vins au verre rentable dans votre restaurant.",
    url: "https://winerim.wine/fr/vin-au-verre-restaurant",
    breadcrumbLabel: "Vin au verre", badge: "Vin au verre",
    h1pre: "Comment vendre du vin au verre dans un", h1accent: "restaurant",
    subtitle: "Guide pratique pour concevoir une offre de vins au verre rentable, attractive pour le client et facile à gérer.",
    ctaAnalyze: "Analyser ma carte des vins", ctaDemo: "Demander une démo",
    introTag: "L'opportunité", introH2pre: "Le vin au verre est le moyen le plus efficace de", introH2accent: "vendre plus de vin",
    introP: "Proposer du vin au verre supprime la barrière la plus importante à la vente de vin : l'engagement sur une bouteille entière. Le client peut explorer, goûter et apprécier sans risque. Pour le restaurant, c'est un outil puissant pour augmenter le ticket moyen et la rotation de la cave.",
    introBenefits: [
      { icon: Users, text: "Réduit la peur du client de mal choisir" },
      { icon: Wine, text: "Permet de goûter plus de vins au cours du même repas" },
      { icon: TrendingUp, text: "Augmente le ticket moyen de la table" },
      { icon: ShoppingCart, text: "Améliore la rotation des bouteilles en cave" },
    ],
    howManyTag: "Le bon nombre", howManyH2pre: "Combien de vins proposer", howManyH2accent: "au verre ?",
    howManySubtitle: "Trop d'options perdent le client. Trop peu limitent le choix. La clé est l'équilibre selon le type de restaurant.",
    glassOfferings: [
      { type: "Petit restaurant", range: "3 – 5 vins", desc: "Sélection essentielle : un blanc, un rosé et deux ou trois rouges. Suffisant pour couvrir tous les profils sans compliquer la gestion." },
      { type: "Restaurant moyen", range: "5 – 8 vins", desc: "Variété équilibrée avec représentation de styles et régions. Place pour un effervescent et un vin doux ou muté." },
      { type: "Restaurant gastronomique", range: "8 – 12 vins", desc: "Carte au verre ambitieuse permettant des accords complets. Inclut des options premium et une rotation fréquente des références." },
    ],
    pricingTag: "Stratégie de pricing", pricingH2pre: "Comment fixer le prix du vin", pricingH2accent: "au verre",
    pricingP: "La méthode la plus courante part d'une règle simple : <strong>couvrir le coût de la bouteille avec les 2-3 premiers verres vendus</strong>. Le reste est du bénéfice net. Voici un exemple pratique :",
    pricingItems: [
      { label: "Coût bouteille", value: "24 €", icon: Wine },
      { label: "Verres par bouteille", value: "5", icon: GlassWater },
      { label: "Prix par verre", value: "6 – 8 €", icon: Calculator },
    ],
    pricingRuleTitle: "💡 La règle d'or",
    pricingRuleP: "Avec 5 verres à 7 € chacun, vous facturez 35 € pour une bouteille à 24 €. Les <strong>deux premiers verres couvrent déjà le coût</strong>. Les trois restants sont de la marge pure. Si 1-2 verres sont perdus en casse, l'opération reste rentable.",
    pricingNote: "Pour les vins premium, baissez le multiplicateur (×1.5-2) pour garder des prix attractifs. Pour les vins d'entrée de gamme, vous pouvez appliquer des marges plus élevées (×2.5-3) car le prix absolu reste bas.",
    bestTag: "Sélection intelligente", bestH2pre: "Quels vins fonctionnent le mieux", bestH2accent: "au verre",
    bestWines: [
      { icon: Star, title: "Vins polyvalents", desc: "Des vins qui s'accordent avec de nombreux plats, facilitant la recommandation du personnel et la décision du client." },
      { icon: Utensils, title: "Vins gastronomiques", desc: "Des références pensées pour accompagner la cuisine, avec une bonne acidité et une belle structure. Ce sont ceux qui convertissent le mieux à table." },
      { icon: Users, title: "Vins reconnus", desc: "Les appellations et cépages que le client reconnaît génèrent de la confiance. Bordeaux, Bourgogne, Côtes du Rhône fonctionnent comme des ancres." },
      { icon: TrendingUp, title: "Bon rapport qualité-prix", desc: "Le client qui commande au verre est sensible au prix unitaire. Offrir une qualité perçue élevée à un prix juste maximise les commandes répétées." },
    ],
    pairingTag: "Vente croisée", pairingH2pre: "Les accords multiplient les ventes", pairingH2accent: "au verre",
    pairingP1: "Suggérer un vin au verre avec chaque plat du menu est la technique de vente la plus efficace en restauration. Le client perçoit la recommandation comme un service, pas comme une vente — et commande plus.",
    pairingP2: "Quand un convive voit <strong>« Recommandé avec ce plat »</strong> à côté d'un vin au verre, la probabilité de le commander se multiplie. C'est la vente la plus naturelle qui existe.",
    pairingLabel: "Exemple d'accord",
    pairingExamples: [
      { dish: "Salade de burrata", wine: "Sancerre — 6,50 €/verre" },
      { dish: "Risotto aux champignons", wine: "Meursault — 7 €/verre" },
      { dish: "Entrecôte grillée", wine: "Saint-Émilion — 8 €/verre" },
      { dish: "Fondant au chocolat", wine: "Muscat de Rivesaltes — 5,50 €/verre" },
    ],
    techTag: "La solution", techH2pre: "Comment la technologie booste la vente", techH2accent: "au verre",
    techSubtitle: "Des outils comme Winerim automatisent les recommandations et font que chaque verre se vend tout seul.",
    techFeatures: [
      { title: "Suggérer des vins au verre", desc: "Le système recommande le vin au verre idéal selon le plat choisi et les préférences du convive." },
      { title: "Afficher les accords", desc: "Chaque vin au verre apparaît lié aux plats du menu, multipliant les opportunités de vente croisée." },
      { title: "Expliquer le vin au client", desc: "Notes de dégustation claires, origines et profils sensoriels qui rendent le vin accessible sans sommelier." },
      { title: "Améliorer la décision du convive", desc: "Filtres, comparaisons et recommandations qui éliminent la paralysie du choix et accélèrent la commande." },
    ],
    ctaTag: "Analyse gratuite", ctaH2pre: "Découvrez si votre offre de vins au verre est", ctaH2accent: "optimisée",
    ctaSubtitle: "Envoyez-nous votre carte et nous analysons votre sélection de vins au verre, prix, accords et opportunités d'amélioration. Sans engagement.",
    ctaPrimary: "Demander une analyse gratuite", ctaSecondary: "Nous contacter",
    faqs: [
      { q: "Combien de vins au verre un restaurant devrait-il proposer ?", a: "Cela dépend du type : entre 3-5 pour les petits établissements, 5-8 pour les restaurants de taille moyenne et 8-12 pour les restaurants gastronomiques." },
      { q: "Comment calcule-t-on le prix d'un vin au verre ?", a: "La méthode la plus courante consiste à diviser le coût de la bouteille par le nombre de verres (généralement 5) et à appliquer une marge. L'objectif est de couvrir le coût de la bouteille avec les 2-3 premiers verres vendus." },
      { q: "Quels types de vins fonctionnent le mieux au verre ?", a: "Les vins polyvalents qui s'accordent avec de nombreux plats, les appellations reconnues, les vins gastronomiques avec une bonne acidité et ceux offrant un bon rapport qualité-prix." },
      { q: "Comment augmenter les ventes de vin au verre ?", a: "En suggérant des accords avec chaque plat, en utilisant des outils digitaux, en formant le personnel et en maintenant une offre rotative." },
    ],
    links: [
      { to: "/fr/outils/calculateur-prix-vin-au-verre", label: "Calculateur prix au verre", type: "tool" },
      { to: "/fr/comment-vendre-plus-vin-restaurant", label: "Comment vendre plus de vin", type: "guide" },
      { to: "/fr/prix-vin-restaurant", label: "Prix vin restaurant", type: "guide" },
    ],
  },
};

const VinoPorCopa = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang);

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "copa-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: t.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
    document.head.appendChild(faqSchema);
    return () => { document.getElementById("copa-faq-jsonld")?.remove(); };
  }, [t.faqs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url}
        hreflang={allLangPaths("/vino-por-copa-restaurante")} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: lang === "es" ? "Guías" : lang === "it" ? "Guide" : "Guides", href: localePath("/guias-y-recursos") }, { label: t.breadcrumbLabel }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <GlassWater size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8">
              {t.h1pre}{" "}<span className="text-gradient-wine italic">{t.h1accent}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">{t.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
              <Link to={localePath("/analisis-carta")} className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center">{t.ctaAnalyze}</Link>
              <Link to={localePath("/demo")} className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300">{t.ctaDemo}</Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.introTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t.introH2pre}{" "}<span className="text-gradient-wine italic">{t.introH2accent}</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.introP}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.introBenefits.map((item, i) => { const Icon = item.icon; return (
                <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                  <Icon size={18} className="text-wine shrink-0" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ); })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* HOW MANY */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.howManyTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.howManyH2pre} <span className="text-gradient-wine italic">{t.howManyH2accent}</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.howManySubtitle}</p>
          </ScrollReveal>
          <div className="space-y-4 max-w-2xl mx-auto">
            {t.glassOfferings.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="bg-wine/10 rounded-lg px-4 py-3 text-center sm:text-left shrink-0 min-w-[160px]">
                    <p className="text-xs uppercase tracking-wider text-wine-light font-semibold">{tier.type}</p>
                    <p className="font-heading text-lg font-bold text-wine">{tier.range}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.pricingTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.pricingH2pre} <span className="text-gradient-wine italic">{t.pricingH2accent}</span></h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.pricingP }} />
              <div className="grid grid-cols-3 gap-4 mb-8">
                {t.pricingItems.map((item, i) => { const Icon = item.icon; return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-secondary/50 rounded-xl border border-border p-5 text-center">
                    <Icon size={20} className="text-wine mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-heading text-xl font-bold text-wine">{item.value}</p>
                  </motion.div>
                ); })}
              </div>
              <div className="bg-wine/5 border border-wine/20 rounded-xl p-6 mb-6">
                <p className="text-sm font-semibold text-wine mb-2">{t.pricingRuleTitle}</p>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.pricingRuleP }} />
              </div>
              <p className="text-sm text-muted-foreground">{t.pricingNote}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BEST WINES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.bestTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.bestH2pre} <span className="text-gradient-wine italic">{t.bestH2accent}</span></h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.bestWines.map((wine, i) => { const Icon = wine.icon; return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300"><Icon size={24} className="text-wine" /></div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{wine.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{wine.desc}</p>
                </div>
              </ScrollReveal>
            ); })}
          </div>
        </div>
      </section>

      {/* PAIRING */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.pairingTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t.pairingH2pre} <span className="text-gradient-wine italic">{t.pairingH2accent}</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.pairingP1}</p>
              <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.pairingP2 }} />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-card rounded-2xl border border-border p-6 space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils size={18} className="text-wine" />
                  <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">{t.pairingLabel}</span>
                </div>
                {t.pairingExamples.map((pair, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="bg-secondary/50 rounded-lg px-4 py-3 border border-border">
                    <p className="text-sm font-medium mb-1">{pair.dish}</p>
                    <p className="text-xs text-wine flex items-center gap-2"><GlassWater size={12} /> {pair.wine}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.techTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.techH2pre} <span className="text-gradient-wine italic">{t.techH2accent}</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.techSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.techFeatures.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 h-full">
                  <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={16} className="text-wine" /></div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaTag}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t.ctaH2pre}{" "}<span className="text-gradient-wine italic">{t.ctaH2accent}</span></h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">{t.ctaPrimary} <ArrowRight size={16} /></Link>
                <Link to={localePath("/contacto")} className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5">{t.ctaSecondary}</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default VinoPorCopa;
