import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Upload, Link2, BarChart3, DollarSign, Layers,
  Utensils, Wine, TrendingUp, FileText, Target, Zap,
  CheckCircle2, AlertTriangle, ChevronRight, Users, Clock,
  ShieldCheck, Eye, Lightbulb, XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import InternalLinks from "@/components/seo/InternalLinks";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SummaryBox from "@/components/seo/SummaryBox";
import ComparisonTable from "@/components/seo/ComparisonTable";
import QuickAnswer from "@/components/seo/QuickAnswer";
import FAQSection from "@/components/seo/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import { referencesOptions, businessTypeOptions } from "@/components/ContactFormFields";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import { useLanguage, type SupportedLang } from "@/i18n/LanguageContext";

type L = SupportedLang;

/* ── i18n helpers ── */
const i = <T,>(r: Record<L, T>): Record<L, T> => r;

const seo = i({
  es: { title: "Análisis Gratuito de tu Carta de Vinos | Winerim", desc: "Envía tu carta de vinos y recibe un análisis profesional gratuito con recomendaciones para mejorar márgenes, rotación y ventas. Sin compromiso.", url: "https://winerim.wine/analisis-carta" },
  en: { title: "Free Wine List Analysis | Winerim", desc: "Submit your wine list and receive a free professional analysis with actionable recommendations to improve margins, rotation and sales. No commitment.", url: "https://winerim.wine/en/wine-list-analysis" },
  it: { title: "Analisi Gratuita della Carta dei Vini | Winerim", desc: "Invia la tua carta dei vini e ricevi un'analisi professionale gratuita con raccomandazioni per migliorare margini, rotazione e vendite. Senza impegno.", url: "https://winerim.wine/it/analisi-carta-vini" },
  fr: { title: "Analyse Gratuite de votre Carte des Vins | Winerim", desc: "Envoyez votre carte des vins et recevez une analyse professionnelle gratuite avec des recommandations pour améliorer marges, rotation et ventes. Sans engagement.", url: "https://winerim.wine/fr/analyse-carte-des-vins" },
});

const hero = i({
  es: { badge: "100 % gratuito · Sin compromiso", breadcrumb: "Herramientas", breadcrumb2: "Análisis de carta", h1_1: "Descubre cuánto más podrías ", h1_hl: "vender", h1_2: " con tu carta de vinos", sub: "Analizamos tu carta de vinos y te mostramos oportunidades concretas para mejorar márgenes, rotación y ventas. Gratis. En 48 h.", cta1: "Enviar mi carta para análisis", cta2: "Pegar enlace de mi carta", tag1: "Informe en 48 h", tag2: "Sin compromiso", tag3: "100 % gratuito" },
  en: { badge: "100% free · No commitment", breadcrumb: "Tools", breadcrumb2: "Wine list analysis", h1_1: "Discover how much more you could ", h1_hl: "sell", h1_2: " with your wine list", sub: "We analyse your wine list and show you concrete opportunities to improve margins, rotation and sales. Free. In 48 h.", cta1: "Submit my wine list for analysis", cta2: "Paste my wine list link", tag1: "Report in 48 h", tag2: "No commitment", tag3: "100% free" },
  it: { badge: "100% gratuito · Senza impegno", breadcrumb: "Strumenti", breadcrumb2: "Analisi carta", h1_1: "Scopri quanto di più potresti ", h1_hl: "vendere", h1_2: " con la tua carta dei vini", sub: "Analizziamo la tua carta dei vini e ti mostriamo opportunità concrete per migliorare margini, rotazione e vendite. Gratis. In 48 h.", cta1: "Invia la mia carta per l'analisi", cta2: "Incolla il link della mia carta", tag1: "Report in 48 h", tag2: "Senza impegno", tag3: "100% gratuito" },
  fr: { badge: "100% gratuit · Sans engagement", breadcrumb: "Outils", breadcrumb2: "Analyse de carte", h1_1: "Découvrez combien vous pourriez ", h1_hl: "vendre", h1_2: " de plus avec votre carte des vins", sub: "Nous analysons votre carte des vins et vous montrons des opportunités concrètes pour améliorer marges, rotation et ventes. Gratuit. En 48 h.", cta1: "Envoyer ma carte pour analyse", cta2: "Coller le lien de ma carte", tag1: "Rapport en 48 h", tag2: "Sans engagement", tag3: "100% gratuit" },
});

const visualCard = i({
  es: { title: "Informe de análisis", sub: "Carta de vinos · Restaurante ejemplo", bars: ["Estructura", "Precios", "Equilibrio", "Rotación", "Maridajes"], potential: "Potencial de mejora estimado", result: "+23 % ventas de vino" },
  en: { title: "Analysis report", sub: "Wine list · Example restaurant", bars: ["Structure", "Pricing", "Balance", "Rotation", "Pairings"], potential: "Estimated improvement potential", result: "+23% wine sales" },
  it: { title: "Rapporto di analisi", sub: "Carta dei vini · Ristorante esempio", bars: ["Struttura", "Prezzi", "Equilibrio", "Rotazione", "Abbinamenti"], potential: "Potenziale di miglioramento stimato", result: "+23% vendite di vino" },
  fr: { title: "Rapport d'analyse", sub: "Carte des vins · Restaurant exemple", bars: ["Structure", "Prix", "Équilibre", "Rotation", "Accords"], potential: "Potentiel d'amélioration estimé", result: "+23% ventes de vin" },
});

const summaryI = i({
  es: { label: "Resumen", def: "El análisis de carta de Winerim es un diagnóstico profesional y gratuito que evalúa la estructura, los precios, el equilibrio y las oportunidades de mejora de tu carta de vinos para aumentar márgenes, rotación y ventas.", bullets: ["Gratuito y sin compromiso. No hay costes ocultos.", "Informe entregado en menos de 48 horas.", "Combina análisis algorítmico con revisión experta.", "Recomendaciones accionables que puedes aplicar por tu cuenta.", "Diseñado para restaurantes con 50+ referencias en carta."] },
  en: { label: "Summary", def: "Winerim's wine list analysis is a free professional diagnostic that evaluates the structure, pricing, balance and improvement opportunities of your wine list to increase margins, rotation and sales.", bullets: ["Free and no commitment. No hidden costs.", "Report delivered within 48 hours.", "Combines algorithmic analysis with expert review.", "Actionable recommendations you can implement on your own.", "Designed for restaurants with 50+ wine references."] },
  it: { label: "Riepilogo", def: "L'analisi della carta di Winerim è una diagnosi professionale e gratuita che valuta struttura, prezzi, equilibrio e opportunità di miglioramento della tua carta dei vini per aumentare margini, rotazione e vendite.", bullets: ["Gratuita e senza impegno. Nessun costo nascosto.", "Report consegnato in meno di 48 ore.", "Combina analisi algoritmica con revisione esperta.", "Raccomandazioni attuabili che puoi implementare autonomamente.", "Progettata per ristoranti con 50+ referenze."] },
  fr: { label: "Résumé", def: "L'analyse de carte de Winerim est un diagnostic professionnel et gratuit qui évalue la structure, les prix, l'équilibre et les opportunités d'amélioration de votre carte des vins pour augmenter marges, rotation et ventes.", bullets: ["Gratuit et sans engagement. Aucun coût caché.", "Rapport livré en moins de 48 heures.", "Combine analyse algorithmique et expertise humaine.", "Recommandations actionnables que vous pouvez appliquer seul.", "Conçu pour les restaurants avec 50+ références."] },
});

const painsI = i({
  es: [
    { icon: AlertTriangle, text: "No sabes cuántos vinos de tu carta llevan meses sin venderse." },
    { icon: DollarSign, text: "Tus precios no están alineados con lo que el comensal está dispuesto a pagar." },
    { icon: Layers, text: "La carta no refleja la identidad de tu restaurante ni tu oferta gastronómica." },
    { icon: Eye, text: "El comensal se pierde, no entiende la carta y acaba pidiendo el más barato." },
    { icon: Target, text: "Tienes vinos que se canibalizan entre sí sin aportar variedad real." },
    { icon: TrendingUp, text: "No aprovechas oportunidades de venta por copa que multiplicarían tu ticket." },
  ],
  en: [
    { icon: AlertTriangle, text: "You don't know how many wines on your list haven't sold in months." },
    { icon: DollarSign, text: "Your prices aren't aligned with what guests are willing to pay." },
    { icon: Layers, text: "The list doesn't reflect your restaurant's identity or gastronomic offer." },
    { icon: Eye, text: "Guests get lost, don't understand the list and default to the cheapest option." },
    { icon: Target, text: "You have wines cannibalising each other without adding real variety." },
    { icon: TrendingUp, text: "You're missing by-the-glass opportunities that could multiply your ticket." },
  ],
  it: [
    { icon: AlertTriangle, text: "Non sai quanti vini nella tua carta non si vendono da mesi." },
    { icon: DollarSign, text: "I tuoi prezzi non sono allineati con ciò che il cliente è disposto a pagare." },
    { icon: Layers, text: "La carta non riflette l'identità del tuo ristorante né la tua offerta gastronomica." },
    { icon: Eye, text: "Il cliente si perde, non capisce la carta e finisce per scegliere il più economico." },
    { icon: Target, text: "Hai vini che si cannibalizzano tra loro senza aggiungere varietà reale." },
    { icon: TrendingUp, text: "Non sfrutti opportunità di vendita al calice che moltiplicherebbero il tuo scontrino." },
  ],
  fr: [
    { icon: AlertTriangle, text: "Vous ne savez pas combien de vins de votre carte ne se vendent plus depuis des mois." },
    { icon: DollarSign, text: "Vos prix ne sont pas alignés avec ce que le client est prêt à payer." },
    { icon: Layers, text: "La carte ne reflète pas l'identité de votre restaurant ni votre offre gastronomique." },
    { icon: Eye, text: "Le client se perd, ne comprend pas la carte et choisit le moins cher." },
    { icon: Target, text: "Vous avez des vins qui se cannibalisent sans apporter de variété réelle." },
    { icon: TrendingUp, text: "Vous ne profitez pas des opportunités de vente au verre qui multiplieraient votre ticket." },
  ],
});

const painsSectionI = i({
  es: { badge: "¿Te suena?", title1: "Los problemas que la mayoría de cartas ", titleHl: "no detectan", sub: "Estos problemas son muy comunes y, sin un análisis riguroso, pasan desapercibidos durante meses o años." },
  en: { badge: "Sound familiar?", title1: "Problems most wine lists ", titleHl: "fail to detect", sub: "These issues are very common and, without rigorous analysis, go unnoticed for months or years." },
  it: { badge: "Ti suona familiare?", title1: "I problemi che la maggior parte delle carte ", titleHl: "non rileva", sub: "Questi problemi sono molto comuni e, senza un'analisi rigorosa, passano inosservati per mesi o anni." },
  fr: { badge: "Ça vous parle ?", title1: "Les problèmes que la plupart des cartes ", titleHl: "ne détectent pas", sub: "Ces problèmes sont très courants et, sans une analyse rigoureuse, passent inaperçus pendant des mois ou des années." },
});

const quickAnswerI = i({
  es: { q: "¿Por qué analizar la carta antes de modificarla?", a: "Cambiar una carta de vinos sin datos es como operar sin diagnóstico. El análisis previo permite tomar decisiones basadas en evidencia: qué eliminar, qué añadir, qué destacar y a qué precio. Sin él, los cambios son intuitivos y los resultados, impredecibles.", details: ["Evitas eliminar un vino que vende bien o añadir uno que canibaliza otra referencia.", "Descubres si el problema es el surtido, el precio, la estructura o la falta de comunicación.", "Priorizas las acciones de mayor impacto con menor esfuerzo operativo.", "Construyes una base de datos para medir el resultado del cambio."], source: "Metodología de optimización de cartas de Winerim, basada en el análisis de más de 500 cartas de vinos." },
  en: { q: "Why analyse the list before changing it?", a: "Changing a wine list without data is like operating without a diagnosis. Prior analysis enables evidence-based decisions: what to remove, add, highlight and at what price. Without it, changes are intuitive and results unpredictable.", details: ["You avoid removing a wine that sells well or adding one that cannibalises another.", "You discover whether the issue is assortment, price, structure or communication.", "You prioritise highest-impact actions with least operational effort.", "You build a dataset to measure the outcome of changes."], source: "Winerim wine list optimisation methodology, based on the analysis of 500+ wine lists." },
  it: { q: "Perché analizzare la carta prima di modificarla?", a: "Cambiare una carta dei vini senza dati è come operare senza diagnosi. L'analisi preventiva permette decisioni basate su evidenze: cosa eliminare, aggiungere, evidenziare e a quale prezzo. Senza, i cambiamenti sono intuitivi e i risultati imprevedibili.", details: ["Eviti di eliminare un vino che vende bene o aggiungerne uno che cannibalizza un altro.", "Scopri se il problema è l'assortimento, il prezzo, la struttura o la comunicazione.", "Dai priorità alle azioni a maggiore impatto con minore sforzo operativo.", "Costruisci una base dati per misurare il risultato del cambiamento."], source: "Metodologia di ottimizzazione delle carte di Winerim, basata sull'analisi di oltre 500 carte dei vini." },
  fr: { q: "Pourquoi analyser la carte avant de la modifier ?", a: "Modifier une carte des vins sans données, c'est comme opérer sans diagnostic. L'analyse préalable permet de prendre des décisions fondées sur des preuves : quoi supprimer, ajouter, mettre en avant et à quel prix. Sans elle, les changements sont intuitifs et les résultats imprévisibles.", details: ["Vous évitez de supprimer un vin qui se vend bien ou d'en ajouter un qui cannibalise un autre.", "Vous découvrez si le problème vient de l'assortiment, du prix, de la structure ou de la communication.", "Vous priorisez les actions à plus fort impact avec le moindre effort opérationnel.", "Vous construisez une base de données pour mesurer le résultat du changement."], source: "Méthodologie d'optimisation de carte Winerim, basée sur l'analyse de plus de 500 cartes des vins." },
});

const comparisonI = i({
  es: { title: "Intuición vs. análisis con datos", sub: "La diferencia entre cambiar la carta y optimizarla.", cols: ["Intuición", "Análisis con datos"], rows: [{ feature: "Detectar vinos sin rotación", options: ["partial", true] }, { feature: "Identificar canibalización de referencias", options: [false, true] }, { feature: "Optimizar distribución de precios", options: ["partial", true] }, { feature: "Medir impacto de los cambios", options: [false, true] }, { feature: "Priorizar acciones por impacto económico", options: [false, true] }, { feature: "Detectar oportunidades de venta por copa", options: ["partial", true] }, { feature: "Alinear carta con perfil gastronómico", options: ["partial", true] }, { feature: "Replicable y escalable a varios locales", options: [false, true] }] },
  en: { title: "Intuition vs. data-driven analysis", sub: "The difference between changing your list and optimising it.", cols: ["Intuition", "Data analysis"], rows: [{ feature: "Detect non-rotating wines", options: ["partial", true] }, { feature: "Identify reference cannibalisation", options: [false, true] }, { feature: "Optimise price distribution", options: ["partial", true] }, { feature: "Measure impact of changes", options: [false, true] }, { feature: "Prioritise actions by economic impact", options: [false, true] }, { feature: "Detect by-the-glass opportunities", options: ["partial", true] }, { feature: "Align list with gastronomic profile", options: ["partial", true] }, { feature: "Replicable and scalable across locations", options: [false, true] }] },
  it: { title: "Intuizione vs. analisi con dati", sub: "La differenza tra cambiare la carta e ottimizzarla.", cols: ["Intuizione", "Analisi con dati"], rows: [{ feature: "Rilevare vini senza rotazione", options: ["partial", true] }, { feature: "Identificare cannibalizzazione di referenze", options: [false, true] }, { feature: "Ottimizzare distribuzione dei prezzi", options: ["partial", true] }, { feature: "Misurare l'impatto dei cambiamenti", options: [false, true] }, { feature: "Prioritizzare azioni per impatto economico", options: [false, true] }, { feature: "Rilevare opportunità di vendita al calice", options: ["partial", true] }, { feature: "Allineare carta con profilo gastronomico", options: ["partial", true] }, { feature: "Replicabile e scalabile su più locali", options: [false, true] }] },
  fr: { title: "Intuition vs. analyse par les données", sub: "La différence entre changer la carte et l'optimiser.", cols: ["Intuition", "Analyse par données"], rows: [{ feature: "Détecter les vins sans rotation", options: ["partial", true] }, { feature: "Identifier la cannibalisation de références", options: [false, true] }, { feature: "Optimiser la distribution des prix", options: ["partial", true] }, { feature: "Mesurer l'impact des changements", options: [false, true] }, { feature: "Prioriser les actions par impact économique", options: [false, true] }, { feature: "Détecter les opportunités de vente au verre", options: ["partial", true] }, { feature: "Aligner la carte avec le profil gastronomique", options: ["partial", true] }, { feature: "Réplicable et évolutif sur plusieurs établissements", options: [false, true] }] },
});

const analysisPointsI = i({
  es: { badge: "Qué analizamos", title1: "8 dimensiones de ", titleHl: "tu carta", sub: "Cada carta se analiza desde múltiples ángulos para detectar todas las oportunidades de mejora.", items: [
    { icon: DollarSign, title: "Distribución de precios", desc: "Analizamos cómo se reparten los rangos de precio y si hay saltos que frenan la venta." },
    { icon: Layers, title: "Equilibrio de la carta", desc: "Evaluamos la proporción entre tintos, blancos, rosados y espumosos frente a tu perfil gastronómico." },
    { icon: Wine, title: "Oportunidades de venta por copa", desc: "Identificamos vinos ideales para servir por copa y aumentar el ticket medio." },
    { icon: BarChart3, title: "Rotación potencial", desc: "Detectamos referencias con baja probabilidad de rotación basándonos en precio, tipo y posicionamiento." },
    { icon: Target, title: "Vinos duplicados o canibalizados", desc: "Encontramos referencias que compiten entre sí y no aportan variedad real al comensal." },
    { icon: Utensils, title: "Oportunidades de maridaje", desc: "Sugerimos combinaciones con tu carta de comida para impulsar ventas cruzadas." },
    { icon: TrendingUp, title: "Posicionamiento estratégico", desc: "Evaluamos qué vinos deberían destacarse para maximizar margen sin sacrificar experiencia." },
    { icon: FileText, title: "Estructura y usabilidad", desc: "Revisamos cómo está organizada la carta y si facilita la decisión del comensal." },
  ] },
  en: { badge: "What we analyse", title1: "8 dimensions of ", titleHl: "your wine list", sub: "Every list is analysed from multiple angles to uncover all improvement opportunities.", items: [
    { icon: DollarSign, title: "Price distribution", desc: "We analyse how price ranges are distributed and whether gaps are hindering sales." },
    { icon: Layers, title: "List balance", desc: "We evaluate the proportion of reds, whites, rosés and sparkling wines against your gastronomic profile." },
    { icon: Wine, title: "By-the-glass opportunities", desc: "We identify wines ideal for by-the-glass service to increase average spend." },
    { icon: BarChart3, title: "Rotation potential", desc: "We detect references with low rotation probability based on price, type and positioning." },
    { icon: Target, title: "Duplicated or cannibalised wines", desc: "We find references competing with each other without adding real variety." },
    { icon: Utensils, title: "Pairing opportunities", desc: "We suggest combinations with your food menu to drive cross-selling." },
    { icon: TrendingUp, title: "Strategic positioning", desc: "We evaluate which wines should be highlighted to maximise margin without sacrificing experience." },
    { icon: FileText, title: "Structure and usability", desc: "We review how the list is organised and whether it facilitates guest decisions." },
  ] },
  it: { badge: "Cosa analizziamo", title1: "8 dimensioni della ", titleHl: "tua carta", sub: "Ogni carta viene analizzata da molteplici angolazioni per individuare tutte le opportunità di miglioramento.", items: [
    { icon: DollarSign, title: "Distribuzione dei prezzi", desc: "Analizziamo come sono distribuiti i range di prezzo e se ci sono salti che frenano la vendita." },
    { icon: Layers, title: "Equilibrio della carta", desc: "Valutiamo la proporzione tra rossi, bianchi, rosati e spumanti rispetto al tuo profilo gastronomico." },
    { icon: Wine, title: "Opportunità di vendita al calice", desc: "Identifichiamo i vini ideali per il servizio al calice per aumentare lo scontrino medio." },
    { icon: BarChart3, title: "Potenziale di rotazione", desc: "Rileviamo referenze con bassa probabilità di rotazione basandoci su prezzo, tipo e posizionamento." },
    { icon: Target, title: "Vini duplicati o cannibalizzati", desc: "Troviamo referenze che competono tra loro senza aggiungere varietà reale." },
    { icon: Utensils, title: "Opportunità di abbinamento", desc: "Suggeriamo combinazioni con il tuo menu per promuovere vendite incrociate." },
    { icon: TrendingUp, title: "Posizionamento strategico", desc: "Valutiamo quali vini dovrebbero essere evidenziati per massimizzare il margine." },
    { icon: FileText, title: "Struttura e usabilità", desc: "Rivediamo come è organizzata la carta e se facilita la decisione del cliente." },
  ] },
  fr: { badge: "Ce que nous analysons", title1: "8 dimensions de ", titleHl: "votre carte", sub: "Chaque carte est analysée sous de multiples angles pour détecter toutes les opportunités d'amélioration.", items: [
    { icon: DollarSign, title: "Distribution des prix", desc: "Nous analysons la répartition des gammes de prix et les écarts qui freinent les ventes." },
    { icon: Layers, title: "Équilibre de la carte", desc: "Nous évaluons la proportion de rouges, blancs, rosés et effervescents par rapport à votre profil gastronomique." },
    { icon: Wine, title: "Opportunités de vente au verre", desc: "Nous identifions les vins idéaux pour le service au verre afin d'augmenter le ticket moyen." },
    { icon: BarChart3, title: "Potentiel de rotation", desc: "Nous détectons les références à faible probabilité de rotation selon le prix, le type et le positionnement." },
    { icon: Target, title: "Vins dupliqués ou cannibalisés", desc: "Nous trouvons les références qui se font concurrence sans apporter de variété réelle." },
    { icon: Utensils, title: "Opportunités d'accord", desc: "Nous suggérons des combinaisons avec votre carte pour stimuler les ventes croisées." },
    { icon: TrendingUp, title: "Positionnement stratégique", desc: "Nous évaluons quels vins devraient être mis en avant pour maximiser la marge." },
    { icon: FileText, title: "Structure et ergonomie", desc: "Nous examinons comment la carte est organisée et si elle facilite le choix du client." },
  ] },
});

const reportI = i({
  es: { badge: "Tu informe", title1: "Qué incluye ", titleHl: "tu informe", items: [
    { icon: FileText, title: "Análisis de estructura", desc: "Organización, categorías y jerarquía de la carta." },
    { icon: DollarSign, title: "Evaluación de rangos de precio", desc: "Posicionamiento de precios, escalado y efecto ancla." },
    { icon: Layers, title: "Optimización de surtido", desc: "Recomendaciones de referencias a añadir, eliminar o destacar." },
    { icon: Zap, title: "Recomendaciones concretas", desc: "Acciones específicas para mejorar margen, rotación y experiencia." },
    { icon: TrendingUp, title: "Potencial de ventas", desc: "Estimación del incremento posible en ventas de vino." },
    { icon: BarChart3, title: "Impacto económico estimado", desc: "Proyección del impacto en ticket medio y facturación mensual." },
  ] },
  en: { badge: "Your report", title1: "What's included in ", titleHl: "your report", items: [
    { icon: FileText, title: "Structure analysis", desc: "Organisation, categories and hierarchy of the wine list." },
    { icon: DollarSign, title: "Price range evaluation", desc: "Price positioning, scaling and anchor effect." },
    { icon: Layers, title: "Assortment optimisation", desc: "Recommendations on references to add, remove or highlight." },
    { icon: Zap, title: "Concrete recommendations", desc: "Specific actions to improve margin, rotation and experience." },
    { icon: TrendingUp, title: "Sales potential", desc: "Estimated increase in wine sales." },
    { icon: BarChart3, title: "Estimated economic impact", desc: "Projected impact on average ticket and monthly revenue." },
  ] },
  it: { badge: "Il tuo report", title1: "Cosa include ", titleHl: "il tuo report", items: [
    { icon: FileText, title: "Analisi della struttura", desc: "Organizzazione, categorie e gerarchia della carta." },
    { icon: DollarSign, title: "Valutazione fasce di prezzo", desc: "Posizionamento dei prezzi, scalabilità ed effetto ancoraggio." },
    { icon: Layers, title: "Ottimizzazione dell'assortimento", desc: "Raccomandazioni su referenze da aggiungere, eliminare o evidenziare." },
    { icon: Zap, title: "Raccomandazioni concrete", desc: "Azioni specifiche per migliorare margine, rotazione ed esperienza." },
    { icon: TrendingUp, title: "Potenziale di vendita", desc: "Stima dell'incremento possibile nelle vendite di vino." },
    { icon: BarChart3, title: "Impatto economico stimato", desc: "Proiezione dell'impatto sullo scontrino medio e fatturato mensile." },
  ] },
  fr: { badge: "Votre rapport", title1: "Ce que comprend ", titleHl: "votre rapport", items: [
    { icon: FileText, title: "Analyse de la structure", desc: "Organisation, catégories et hiérarchie de la carte." },
    { icon: DollarSign, title: "Évaluation des gammes de prix", desc: "Positionnement des prix, progressivité et effet d'ancrage." },
    { icon: Layers, title: "Optimisation de l'assortiment", desc: "Recommandations de références à ajouter, supprimer ou mettre en avant." },
    { icon: Zap, title: "Recommandations concrètes", desc: "Actions spécifiques pour améliorer marge, rotation et expérience." },
    { icon: TrendingUp, title: "Potentiel de ventes", desc: "Estimation de l'augmentation possible des ventes de vin." },
    { icon: BarChart3, title: "Impact économique estimé", desc: "Projection de l'impact sur le ticket moyen et le chiffre d'affaires mensuel." },
  ] },
});

const stepsI = i({
  es: { title1: "Así de ", titleHl: "fácil", items: [
    { num: "1", title: "Sube tu carta o enlace", desc: "Adjunta el PDF de tu carta de vinos o pega la URL si es digital. Cualquier formato." },
    { num: "2", title: "Nuestro equipo la analiza", desc: "Revisamos estructura, precios, equilibrio, rotación y oportunidades de mejora con datos." },
    { num: "3", title: "Recibes tu informe", desc: "En menos de 48 h recibirás un informe detallado con recomendaciones accionables." },
  ] },
  en: { title1: "It's that ", titleHl: "simple", items: [
    { num: "1", title: "Upload your list or link", desc: "Attach your wine list PDF or paste the URL if it's digital. Any format." },
    { num: "2", title: "Our team analyses it", desc: "We review structure, pricing, balance, rotation and improvement opportunities with data." },
    { num: "3", title: "You receive your report", desc: "Within 48 h you'll receive a detailed report with actionable recommendations." },
  ] },
  it: { title1: "È così ", titleHl: "semplice", items: [
    { num: "1", title: "Carica la tua carta o link", desc: "Allega il PDF della tua carta dei vini o incolla l'URL se è digitale. Qualsiasi formato." },
    { num: "2", title: "Il nostro team la analizza", desc: "Rivediamo struttura, prezzi, equilibrio, rotazione e opportunità di miglioramento con dati." },
    { num: "3", title: "Ricevi il tuo report", desc: "In meno di 48 h riceverai un report dettagliato con raccomandazioni attuabili." },
  ] },
  fr: { title1: "C'est aussi ", titleHl: "simple", items: [
    { num: "1", title: "Envoyez votre carte ou lien", desc: "Joignez le PDF de votre carte des vins ou collez l'URL si elle est digitale. Tout format." },
    { num: "2", title: "Notre équipe l'analyse", desc: "Nous examinons structure, prix, équilibre, rotation et opportunités d'amélioration avec des données." },
    { num: "3", title: "Vous recevez votre rapport", desc: "En moins de 48 h vous recevrez un rapport détaillé avec des recommandations actionnables." },
  ] },
});

const discoveriesI = i({
  es: { badge: "Hallazgos reales", title1: "Lo que nuestros análisis ", titleHl: "descubren", sub: "Estos son hallazgos reales detectados en cartas de restaurantes como el tuyo.", items: ["Un 35 % de las referencias en una misma franja de precio, generando canibalización y confusión.", "Vinos con precio de compra alto y margen por debajo de la media del mercado.", "Huecos evidentes en la oferta: sin espumosos accesibles, sin blancos por copa, sin opciones locales.", "Oportunidades de venta por copa no aprovechadas que podrían incrementar el ticket medio un 15-25 %.", "Maridajes naturales con la carta gastronómica que no están comunicados ni sugeridos.", "Referencias que llevan más de 6 meses sin rotación ocupando espacio en la carta y en la bodega."] },
  en: { badge: "Real findings", title1: "What our analyses ", titleHl: "uncover", sub: "These are real findings detected in wine lists from restaurants like yours.", items: ["35% of references in the same price bracket, causing cannibalisation and confusion.", "Wines with high purchase price and margins below the market average.", "Obvious gaps in the offer: no accessible sparkling wines, no whites by the glass, no local options.", "Untapped by-the-glass opportunities that could increase the average ticket by 15-25%.", "Natural pairings with the food menu that are neither communicated nor suggested.", "References that haven't rotated in over 6 months, taking up space on the list and in the cellar."] },
  it: { badge: "Scoperte reali", title1: "Cosa scoprono le nostre ", titleHl: "analisi", sub: "Queste sono scoperte reali rilevate in carte di ristoranti come il tuo.", items: ["Il 35% delle referenze nella stessa fascia di prezzo, generando cannibalizzazione e confusione.", "Vini con prezzo d'acquisto alto e margine sotto la media di mercato.", "Lacune evidenti nell'offerta: nessuno spumante accessibile, nessun bianco al calice, nessuna opzione locale.", "Opportunità di vendita al calice non sfruttate che potrebbero aumentare lo scontrino medio del 15-25%.", "Abbinamenti naturali con il menu gastronomico non comunicati né suggeriti.", "Referenze che non ruotano da oltre 6 mesi, occupando spazio in carta e in cantina."] },
  fr: { badge: "Découvertes réelles", title1: "Ce que nos analyses ", titleHl: "révèlent", sub: "Voici des découvertes réelles détectées dans des cartes de restaurants comme le vôtre.", items: ["35% des références dans la même tranche de prix, générant cannibalisation et confusion.", "Des vins avec un prix d'achat élevé et une marge inférieure à la moyenne du marché.", "Des lacunes évidentes dans l'offre : pas d'effervescents accessibles, pas de blancs au verre, pas d'options locales.", "Des opportunités de vente au verre inexploitées qui pourraient augmenter le ticket moyen de 15-25%.", "Des accords naturels avec la carte gastronomique ni communiqués ni suggérés.", "Des références sans rotation depuis plus de 6 mois, occupant de l'espace en carte et en cave."] },
});

const whoFitsI = i({
  es: { badge: "Para quién", title1: "¿Para qué perfiles ", titleHl: "encaja mejor?", items: [
    { profile: "Restaurantes con 50+ referencias", desc: "Cuanta más carta, más oportunidades de optimización." },
    { profile: "Grupos de restauración", desc: "Análisis de coherencia entre locales y oportunidades de centralización." },
    { profile: "Hoteles con F&B", desc: "Múltiples puntos de venta con cartas que necesitan alinearse." },
    { profile: "Restaurantes que quieren vender más vino", desc: "Si sientes que tu carta 'informa' pero no 'vende', esto es para ti." },
  ], note: "si tu carta tiene menos de 20 referencias de vino, el análisis será menos revelador. Aun así, puede darte ideas útiles sobre estructura y pricing." },
  en: { badge: "Who it's for", title1: "Which profiles ", titleHl: "benefit most?", items: [
    { profile: "Restaurants with 50+ references", desc: "The larger the list, the more optimisation opportunities." },
    { profile: "Restaurant groups", desc: "Coherence analysis across locations and centralisation opportunities." },
    { profile: "Hotels with F&B", desc: "Multiple outlets with wine lists that need alignment." },
    { profile: "Restaurants that want to sell more wine", desc: "If your list 'informs' but doesn't 'sell', this is for you." },
  ], note: "if your list has fewer than 20 wine references, the analysis will be less revealing. It can still give you useful ideas on structure and pricing." },
  it: { badge: "Per chi è", title1: "Per quali profili ", titleHl: "è più adatto?", items: [
    { profile: "Ristoranti con 50+ referenze", desc: "Più è ampia la carta, più opportunità di ottimizzazione." },
    { profile: "Gruppi di ristorazione", desc: "Analisi di coerenza tra locali e opportunità di centralizzazione." },
    { profile: "Hotel con F&B", desc: "Più punti vendita con carte che necessitano di allineamento." },
    { profile: "Ristoranti che vogliono vendere più vino", desc: "Se senti che la tua carta 'informa' ma non 'vende', questo fa per te." },
  ], note: "se la tua carta ha meno di 20 referenze, l'analisi sarà meno rivelatrice. Può comunque darti idee utili su struttura e pricing." },
  fr: { badge: "Pour qui", title1: "Quels profils en ", titleHl: "bénéficient le plus ?", items: [
    { profile: "Restaurants avec 50+ références", desc: "Plus la carte est grande, plus il y a d'opportunités d'optimisation." },
    { profile: "Groupes de restauration", desc: "Analyse de cohérence entre établissements et opportunités de centralisation." },
    { profile: "Hôtels avec F&B", desc: "Plusieurs points de vente avec des cartes à aligner." },
    { profile: "Restaurants qui veulent vendre plus de vin", desc: "Si votre carte 'informe' mais ne 'vend' pas, c'est pour vous." },
  ], note: "si votre carte a moins de 20 références, l'analyse sera moins révélatrice. Elle peut néanmoins vous donner des idées utiles sur la structure et le pricing." },
});

const afterI = i({
  es: { badge: "Después del análisis", title1: "Qué pasa ", titleHl: "después", items: [
    { title: "Recibes el informe", desc: "Un documento claro con diagnóstico, oportunidades y recomendaciones priorizadas." },
    { title: "Revisamos juntos los hallazgos", desc: "Si quieres, agendamos una llamada de 20 min para explicarte los puntos clave." },
    { title: "Decides sin presión", desc: "El análisis es tuyo. Puedes aplicarlo por tu cuenta o con nuestra ayuda." },
    { title: "Si encaja, te proponemos Winerim", desc: "Te mostramos cómo Winerim automatiza las mejoras que detectamos, adaptado a tu caso." },
  ] },
  en: { badge: "After the analysis", title1: "What happens ", titleHl: "next", items: [
    { title: "You receive the report", desc: "A clear document with diagnosis, opportunities and prioritised recommendations." },
    { title: "We review findings together", desc: "If you wish, we schedule a 20-min call to explain the key points." },
    { title: "You decide with no pressure", desc: "The analysis is yours. You can apply it on your own or with our help." },
    { title: "If it fits, we propose Winerim", desc: "We show you how Winerim automates the improvements we detected, tailored to your case." },
  ] },
  it: { badge: "Dopo l'analisi", title1: "Cosa succede ", titleHl: "dopo", items: [
    { title: "Ricevi il report", desc: "Un documento chiaro con diagnosi, opportunità e raccomandazioni prioritizzate." },
    { title: "Rivediamo insieme i risultati", desc: "Se vuoi, fissiamo una call di 20 min per spiegarti i punti chiave." },
    { title: "Decidi senza pressione", desc: "L'analisi è tua. Puoi applicarla autonomamente o con il nostro aiuto." },
    { title: "Se è adatto, ti proponiamo Winerim", desc: "Ti mostriamo come Winerim automatizza i miglioramenti rilevati, adattato al tuo caso." },
  ] },
  fr: { badge: "Après l'analyse", title1: "Que se passe-t-il ", titleHl: "ensuite", items: [
    { title: "Vous recevez le rapport", desc: "Un document clair avec diagnostic, opportunités et recommandations priorisées." },
    { title: "Nous passons en revue les résultats", desc: "Si vous le souhaitez, nous planifions un appel de 20 min pour vous expliquer les points clés." },
    { title: "Vous décidez sans pression", desc: "L'analyse est à vous. Vous pouvez l'appliquer seul ou avec notre aide." },
    { title: "Si ça correspond, nous vous proposons Winerim", desc: "Nous vous montrons comment Winerim automatise les améliorations détectées, adapté à votre cas." },
  ] },
});

const formI = i({
  es: { badge: "Envía tu carta", title1: "Analiza tu carta de vinos ", titleHl: "ahora", sub: "Completa el formulario y recibirás tu informe en menos de 48 horas. Gratis.", restaurantLabel: "Nombre del restaurante", restaurantPh: "Ej. Restaurante La Viña", emailLabel: "Email", cityLabel: "Ciudad", cityPh: "Ej. Madrid", refsLabel: "Nº de referencias", refsPh: "Selecciona un rango", bizLabel: "Tipo de negocio", bizPh: "Selecciona tipo de negocio", uploadBtn: "Subir archivo", linkBtn: "Pegar enlace", dropText: "Haz clic o arrastra tu carta de vinos", dropSub: "PDF, JPG, PNG · Máx 10 MB", linkLabel: "URL de tu carta", linkPh: "https://tu-restaurante.com/carta-de-vinos", submit: "Enviar carta para análisis gratuito", submitting: "Enviando…", disclaimer: "Sin compromiso. Informe en menos de 48 h.", errRequired: "Por favor completa los campos obligatorios.", errFormat: "Formato no soportado. Sube un PDF o imagen (JPG, PNG, WebP).", errSize: "El archivo es demasiado grande. Máximo 10 MB.", errUpload: "Error al subir el archivo. Inténtalo de nuevo.", errSubmit: "Error al enviar. Inténtalo de nuevo.", success: "¡Carta recibida! Te enviaremos el análisis en menos de 48 h." },
  en: { badge: "Submit your list", title1: "Analyse your wine list ", titleHl: "now", sub: "Complete the form and you'll receive your report within 48 hours. Free.", restaurantLabel: "Restaurant name", restaurantPh: "E.g. The Wine House", emailLabel: "Email", cityLabel: "City", cityPh: "E.g. London", refsLabel: "No. of references", refsPh: "Select a range", bizLabel: "Business type", bizPh: "Select business type", uploadBtn: "Upload file", linkBtn: "Paste link", dropText: "Click or drag your wine list", dropSub: "PDF, JPG, PNG · Max 10 MB", linkLabel: "Wine list URL", linkPh: "https://your-restaurant.com/wine-list", submit: "Submit wine list for free analysis", submitting: "Submitting…", disclaimer: "No commitment. Report within 48 h.", errRequired: "Please complete the required fields.", errFormat: "Unsupported format. Upload a PDF or image (JPG, PNG, WebP).", errSize: "File is too large. Maximum 10 MB.", errUpload: "Error uploading file. Please try again.", errSubmit: "Error submitting. Please try again.", success: "Wine list received! We'll send you the analysis within 48 h." },
  it: { badge: "Invia la tua carta", title1: "Analizza la tua carta dei vini ", titleHl: "adesso", sub: "Compila il modulo e riceverai il tuo report in meno di 48 ore. Gratis.", restaurantLabel: "Nome del ristorante", restaurantPh: "Es. Ristorante La Vigna", emailLabel: "Email", cityLabel: "Città", cityPh: "Es. Milano", refsLabel: "N° di referenze", refsPh: "Seleziona un range", bizLabel: "Tipo di attività", bizPh: "Seleziona tipo di attività", uploadBtn: "Carica file", linkBtn: "Incolla link", dropText: "Clicca o trascina la tua carta dei vini", dropSub: "PDF, JPG, PNG · Max 10 MB", linkLabel: "URL della tua carta", linkPh: "https://il-tuo-ristorante.com/carta-vini", submit: "Invia carta per analisi gratuita", submitting: "Invio in corso…", disclaimer: "Senza impegno. Report in meno di 48 h.", errRequired: "Compila i campi obbligatori.", errFormat: "Formato non supportato. Carica un PDF o immagine (JPG, PNG, WebP).", errSize: "Il file è troppo grande. Massimo 10 MB.", errUpload: "Errore durante il caricamento. Riprova.", errSubmit: "Errore durante l'invio. Riprova.", success: "Carta ricevuta! Ti invieremo l'analisi in meno di 48 h." },
  fr: { badge: "Envoyez votre carte", title1: "Analysez votre carte des vins ", titleHl: "maintenant", sub: "Remplissez le formulaire et vous recevrez votre rapport en moins de 48 heures. Gratuit.", restaurantLabel: "Nom du restaurant", restaurantPh: "Ex. Restaurant La Vigne", emailLabel: "Email", cityLabel: "Ville", cityPh: "Ex. Paris", refsLabel: "Nb de références", refsPh: "Sélectionnez une tranche", bizLabel: "Type d'établissement", bizPh: "Sélectionnez le type", uploadBtn: "Télécharger fichier", linkBtn: "Coller le lien", dropText: "Cliquez ou glissez votre carte des vins", dropSub: "PDF, JPG, PNG · Max 10 Mo", linkLabel: "URL de votre carte", linkPh: "https://votre-restaurant.com/carte-des-vins", submit: "Envoyer la carte pour analyse gratuite", submitting: "Envoi en cours…", disclaimer: "Sans engagement. Rapport en moins de 48 h.", errRequired: "Veuillez compléter les champs obligatoires.", errFormat: "Format non supporté. Envoyez un PDF ou une image (JPG, PNG, WebP).", errSize: "Le fichier est trop volumineux. Maximum 10 Mo.", errUpload: "Erreur lors de l'envoi du fichier. Réessayez.", errSubmit: "Erreur lors de l'envoi. Réessayez.", success: "Carte reçue ! Nous vous enverrons l'analyse en moins de 48 h." },
});

const faqsI = i({
  es: { title: "Preguntas frecuentes sobre el análisis", items: [
    { q: "¿Cuánto cuesta el análisis de carta?", a: "Es completamente gratuito. No hay costes ocultos ni compromiso." },
    { q: "¿Qué formatos aceptáis?", a: "PDF, imagen (JPG, PNG, WebP) o enlace a tu carta digital. Cualquier formato." },
    { q: "¿Cuánto tarda el informe?", a: "Menos de 48 horas laborables desde que recibimos tu carta." },
    { q: "¿Qué información necesitáis de mi parte?", a: "Solo tu carta de vinos, el nombre del restaurante y tu email. El resto es opcional pero nos ayuda a personalizar el análisis." },
    { q: "¿Vais a intentar venderme algo?", a: "No. El informe es tuyo y puedes aplicarlo por tu cuenta. Si encaja, te explicaremos cómo Winerim puede automatizar las mejoras, pero sin presión." },
    { q: "¿Qué tipo de restaurantes se benefician más?", a: "Restaurantes con 50 o más referencias en carta, grupos de restauración y hoteles con servicio de F&B. Si tienes menos de 50 referencias, el análisis sigue siendo útil pero el impacto será menor." },
    { q: "¿Es un análisis automático o lo hace una persona?", a: "Combinamos análisis algorítmico con revisión experta. El resultado es un informe profesional, no un output genérico de IA." },
    { q: "¿Puedo aplicar las recomendaciones sin contratar Winerim?", a: "Sí, al 100 %. El informe incluye recomendaciones accionables que puedes implementar de forma independiente." },
    { q: "¿Mis datos están seguros?", a: "Sí. Solo usamos tu carta para el análisis. No compartimos datos con terceros. Consulta nuestra política de privacidad." },
    { q: "¿Puedo analizar varias cartas si tengo varios locales?", a: "Sí. Puedes enviar tantas cartas como quieras. Analizamos cada una de forma independiente." },
  ] },
  en: { title: "Frequently asked questions about the analysis", items: [
    { q: "How much does the wine list analysis cost?", a: "It's completely free. No hidden costs or commitment." },
    { q: "What formats do you accept?", a: "PDF, image (JPG, PNG, WebP) or a link to your digital wine list. Any format." },
    { q: "How long does the report take?", a: "Less than 48 business hours from when we receive your list." },
    { q: "What information do you need from me?", a: "Just your wine list, restaurant name and email. The rest is optional but helps us personalise the analysis." },
    { q: "Are you going to try to sell me something?", a: "No. The report is yours and you can implement it on your own. If it fits, we'll explain how Winerim can automate the improvements — no pressure." },
    { q: "What type of restaurants benefit most?", a: "Restaurants with 50+ references, restaurant groups and hotels with F&B. If you have fewer than 50 references, the analysis is still useful but the impact will be smaller." },
    { q: "Is it an automated analysis or done by a person?", a: "We combine algorithmic analysis with expert review. The result is a professional report, not a generic AI output." },
    { q: "Can I apply the recommendations without hiring Winerim?", a: "Yes, 100%. The report includes actionable recommendations you can implement independently." },
    { q: "Is my data secure?", a: "Yes. We only use your list for the analysis. We don't share data with third parties. See our privacy policy." },
    { q: "Can I analyse multiple wine lists if I have several locations?", a: "Yes. You can submit as many lists as you want. We analyse each one independently." },
  ] },
  it: { title: "Domande frequenti sull'analisi", items: [
    { q: "Quanto costa l'analisi della carta?", a: "È completamente gratuita. Nessun costo nascosto né impegno." },
    { q: "Quali formati accettate?", a: "PDF, immagine (JPG, PNG, WebP) o link alla tua carta digitale. Qualsiasi formato." },
    { q: "Quanto tempo ci vuole per il report?", a: "Meno di 48 ore lavorative dal ricevimento della tua carta." },
    { q: "Quali informazioni vi servono?", a: "Solo la tua carta dei vini, il nome del ristorante e la tua email. Il resto è opzionale ma ci aiuta a personalizzare l'analisi." },
    { q: "Cercherete di vendermi qualcosa?", a: "No. Il report è tuo e puoi applicarlo autonomamente. Se è adatto, ti spiegheremo come Winerim può automatizzare i miglioramenti — senza pressione." },
    { q: "Quali ristoranti ne traggono più vantaggio?", a: "Ristoranti con 50+ referenze, gruppi di ristorazione e hotel con F&B. Con meno di 50 referenze, l'analisi è comunque utile ma l'impatto sarà minore." },
    { q: "È un'analisi automatica o fatta da una persona?", a: "Combiniamo analisi algoritmica con revisione esperta. Il risultato è un report professionale, non un output generico di IA." },
    { q: "Posso applicare le raccomandazioni senza assumere Winerim?", a: "Sì, al 100%. Il report include raccomandazioni attuabili che puoi implementare in modo indipendente." },
    { q: "I miei dati sono al sicuro?", a: "Sì. Usiamo la tua carta solo per l'analisi. Non condividiamo dati con terzi. Consulta la nostra privacy policy." },
    { q: "Posso analizzare più carte se ho più locali?", a: "Sì. Puoi inviare quante carte vuoi. Analizziamo ciascuna in modo indipendente." },
  ] },
  fr: { title: "Questions fréquentes sur l'analyse", items: [
    { q: "Combien coûte l'analyse de carte ?", a: "C'est entièrement gratuit. Aucun coût caché ni engagement." },
    { q: "Quels formats acceptez-vous ?", a: "PDF, image (JPG, PNG, WebP) ou lien vers votre carte digitale. Tout format." },
    { q: "Combien de temps pour le rapport ?", a: "Moins de 48 heures ouvrables après réception de votre carte." },
    { q: "Quelles informations avez-vous besoin ?", a: "Juste votre carte des vins, le nom du restaurant et votre email. Le reste est optionnel mais nous aide à personnaliser l'analyse." },
    { q: "Allez-vous essayer de me vendre quelque chose ?", a: "Non. Le rapport est à vous et vous pouvez l'appliquer seul. Si ça correspond, nous vous expliquerons comment Winerim peut automatiser les améliorations — sans pression." },
    { q: "Quels restaurants en bénéficient le plus ?", a: "Les restaurants avec 50+ références, les groupes de restauration et les hôtels avec F&B. Avec moins de 50 références, l'analyse reste utile mais l'impact sera moindre." },
    { q: "C'est une analyse automatique ou faite par une personne ?", a: "Nous combinons analyse algorithmique et expertise humaine. Le résultat est un rapport professionnel, pas un output IA générique." },
    { q: "Puis-je appliquer les recommandations sans engager Winerim ?", a: "Oui, à 100%. Le rapport inclut des recommandations actionnables que vous pouvez mettre en œuvre indépendamment." },
    { q: "Mes données sont-elles en sécurité ?", a: "Oui. Nous utilisons votre carte uniquement pour l'analyse. Nous ne partageons pas de données avec des tiers. Consultez notre politique de confidentialité." },
    { q: "Puis-je analyser plusieurs cartes si j'ai plusieurs établissements ?", a: "Oui. Vous pouvez envoyer autant de cartes que vous voulez. Nous analysons chacune indépendamment." },
  ] },
});

const ctaFinalI = i({
  es: { badge: "Gratuito y sin compromiso", title1: "Tu carta tiene potencial oculto. ", titleHl: "Descúbrelo.", sub: "Envíanos tu carta de vinos y te mostramos qué mejorar, cuánto puedes ganar y por dónde empezar. Sin coste. Sin compromiso.", cta1: "Enviar carta para análisis", cta2: "Solicitar demo", micro: "Más de 500 cartas analizadas. Informe en 48 h." },
  en: { badge: "Free and no commitment", title1: "Your wine list has hidden potential. ", titleHl: "Discover it.", sub: "Send us your wine list and we'll show you what to improve, how much you can gain and where to start. No cost. No commitment.", cta1: "Submit wine list for analysis", cta2: "Request demo", micro: "500+ wine lists analysed. Report in 48 h." },
  it: { badge: "Gratuito e senza impegno", title1: "La tua carta ha un potenziale nascosto. ", titleHl: "Scoprilo.", sub: "Inviaci la tua carta dei vini e ti mostriamo cosa migliorare, quanto puoi guadagnare e da dove iniziare. Senza costi. Senza impegno.", cta1: "Invia carta per analisi", cta2: "Richiedi demo", micro: "Oltre 500 carte analizzate. Report in 48 h." },
  fr: { badge: "Gratuit et sans engagement", title1: "Votre carte a un potentiel caché. ", titleHl: "Découvrez-le.", sub: "Envoyez-nous votre carte des vins et nous vous montrons quoi améliorer, combien vous pouvez gagner et par où commencer. Sans coût. Sans engagement.", cta1: "Envoyer la carte pour analyse", cta2: "Demander une démo", micro: "Plus de 500 cartes analysées. Rapport en 48 h." },
});

const linksI = i({
  es: [
    { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" as const },
    { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" as const },
    { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" as const },
    { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" as const },
    { to: "/herramientas", label: "Todas las herramientas", type: "tool" as const },
  ],
  en: [
    { to: "/en/blog/how-to-organise-wine-list", label: "How to organise a wine list", type: "guide" as const },
    { to: "/en/blog/profitable-wine-list", label: "Profitable wine list", type: "guide" as const },
    { to: "/en/resources/profitable-wine-list-checklist", label: "Profitable list checklist", type: "resource" as const },
    { to: "/wine-list-management-software", label: "Wine list software", type: "solution" as const },
    { to: "/en/tools", label: "All tools", type: "tool" as const },
  ],
  it: [
    { to: "/it/blog/come-organizzare-carta-vini", label: "Come organizzare una carta dei vini", type: "guide" as const },
    { to: "/it/blog/carta-vini-redditizia", label: "Carta dei vini redditizia", type: "guide" as const },
    { to: "/it/risorse/checklist-carta-vini-redditizia", label: "Checklist carta redditizia", type: "resource" as const },
    { to: "/it/software-carta-vini", label: "Software carta dei vini", type: "solution" as const },
    { to: "/it/strumenti", label: "Tutti gli strumenti", type: "tool" as const },
  ],
  fr: [
    { to: "/fr/blog/comment-organiser-carte-des-vins", label: "Comment organiser une carte des vins", type: "guide" as const },
    { to: "/fr/blog/carte-des-vins-rentable", label: "Carte des vins rentable", type: "guide" as const },
    { to: "/fr/ressources/checklist-carte-rentable", label: "Checklist carte rentable", type: "resource" as const },
    { to: "/fr/logiciel-carte-des-vins", label: "Logiciel carte des vins", type: "solution" as const },
    { to: "/fr/outils", label: "Tous les outils", type: "tool" as const },
  ],
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

const AnalizaCarta = () => {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "link">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setFileName(null); return; }
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Formato no soportado. Sube un PDF o imagen (JPG, PNG, WebP).");
      e.target.value = "";
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo es demasiado grande. Máximo 10 MB.");
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const restaurant = (fd.get("restaurant") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const city = (fd.get("city") as string)?.trim();
    const refsCount = (fd.get("references_count") as string)?.trim();
    const menuLink = (fd.get("menu_link") as string)?.trim();

    if (!restaurant || !email) {
      toast.error("Por favor completa los campos obligatorios.");
      setSubmitting(false);
      return;
    }

    let uploadedUrl: string | null = null;
    const file = fileRef.current?.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop();
      const path = `analisis/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("admin-uploads")
        .upload(path, file);
      if (uploadError) {
        toast.error("Error al subir el archivo. Inténtalo de nuevo.");
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("admin-uploads").getPublicUrl(path);
      uploadedUrl = urlData.publicUrl;
    }

    const finalLink = uploadedUrl || menuLink || null;
    const leadData: Record<string, string | null> = {
      form_type: "analisis-carta",
      restaurant: restaurant || null,
      email: email || null,
      city: city || null,
      references_count: refsCount || null,
      menu_link: finalLink,
      business_type: (fd.get("business_type") as string)?.trim() || null,
    };
    const { error } = await supabase.from("contact_leads").insert(leadData);

    if (error) {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } else {
      toast.success("¡Carta recibida! Te enviaremos el análisis en menos de 48 h.");
      (e.target as HTMLFormElement).reset();
      setFileName(null);
      notifyLead(leadData);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Análisis Gratuito de tu Carta de Vinos | Winerim"
        description="Envía tu carta de vinos y recibe un análisis profesional gratuito con recomendaciones para mejorar márgenes, rotación y ventas. Sin compromiso."
        url="https://winerim.wine/analisis-carta"
      />
      <Navbar />

      <main>
        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.1),transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Análisis de carta" }]} />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8">
                  <Zap size={14} className="text-accent" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent">100 % gratuito · Sin compromiso</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
                  Descubre cuánto más podrías{" "}
                  <span className="text-gradient-wine italic">vender</span>{" "}
                  con tu carta de vinos
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  Analizamos tu carta de vinos y te mostramos oportunidades concretas para mejorar márgenes, rotación y ventas. Gratis. En 48 h.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
                  >
                    <Upload size={16} />
                    Enviar mi carta para análisis
                  </a>
                  <a
                    href="#formulario"
                    onClick={() => setMode("link")}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                  >
                    <Link2 size={16} className="text-wine" />
                    Pegar enlace de mi carta
                  </a>
                </div>

                <div className="flex items-center gap-6 mt-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> Informe en 48 h</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Sin compromiso</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> 100 % gratuito</span>
                </div>
              </motion.div>

              {/* Visual card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="hidden lg:block"
              >
                <div className="relative bg-gradient-card rounded-xl border border-border p-8 glow-wine">
                  <div className="absolute -inset-4 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl" />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
                        <BarChart3 size={20} className="text-wine" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm">Informe de análisis</p>
                        <p className="text-xs text-muted-foreground">Carta de vinos · Restaurante ejemplo</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Estructura", pct: 72 },
                        { label: "Precios", pct: 45 },
                        { label: "Equilibrio", pct: 88 },
                        { label: "Rotación", pct: 34 },
                        { label: "Maridajes", pct: 60 },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{bar.label}</span>
                            <span className="text-foreground font-semibold">{bar.pct}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-wine"
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.pct}%` }}
                              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">Potencial de mejora estimado</p>
                      <p className="font-heading text-2xl font-bold text-gradient-wine">+23 % ventas de vino</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════ 2. RESUMEN EJECUTIVO ═══════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <SummaryBox
            label="Resumen"
            definition="El análisis de carta de Winerim es un diagnóstico profesional y gratuito que evalúa la estructura, los precios, el equilibrio y las oportunidades de mejora de tu carta de vinos para aumentar márgenes, rotación y ventas."
            bullets={[
              "Gratuito y sin compromiso. No hay costes ocultos.",
              "Informe entregado en menos de 48 horas.",
              "Combina análisis algorítmico con revisión experta.",
              "Recomendaciones accionables que puedes aplicar por tu cuenta.",
              "Diseñado para restaurantes con 50+ referencias en carta.",
            ]}
          />
        </section>

        {/* ═══════════ 3. PAINS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">¿Te suena?</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Los problemas que la mayoría de cartas{" "}
                <span className="text-gradient-wine italic">no detectan</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Estos problemas son muy comunes y, sin un análisis riguroso, pasan desapercibidos durante meses o años.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pains.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/20 transition-colors h-full">
                      <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-destructive" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. POR QUÉ ANTES DE TOCAR LA CARTA ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <QuickAnswer
                question="¿Por qué analizar la carta antes de modificarla?"
                answer="Cambiar una carta de vinos sin datos es como operar sin diagnóstico. El análisis previo permite tomar decisiones basadas en evidencia: qué eliminar, qué añadir, qué destacar y a qué precio. Sin él, los cambios son intuitivos y los resultados, impredecibles."
                details={[
                  "Evitas eliminar un vino que vende bien o añadir uno que canibaliza otra referencia.",
                  "Descubres si el problema es el surtido, el precio, la estructura o la falta de comunicación.",
                  "Priorizas las acciones de mayor impacto con menor esfuerzo operativo.",
                  "Construyes una base de datos para medir el resultado del cambio.",
                ]}
                source="Metodología de optimización de cartas de Winerim, basada en el análisis de más de 500 cartas de vinos."
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 5. INTUICIÓN VS DATOS ═══════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <ComparisonTable
            title="Intuición vs. análisis con datos"
            subtitle="La diferencia entre cambiar la carta y optimizarla."
            columns={["Intuición", "Análisis con datos"]}
            rows={[
              { feature: "Detectar vinos sin rotación", options: ["partial", true] },
              { feature: "Identificar canibalización de referencias", options: [false, true] },
              { feature: "Optimizar distribución de precios", options: ["partial", true] },
              { feature: "Medir impacto de los cambios", options: [false, true] },
              { feature: "Priorizar acciones por impacto económico", options: [false, true] },
              { feature: "Detectar oportunidades de venta por copa", options: ["partial", true] },
              { feature: "Alinear carta con perfil gastronómico", options: ["partial", true] },
              { feature: "Replicable y escalable a varios locales", options: [false, true] },
            ]}
            highlightColumn={1}
          />
        </section>

        {/* ═══════════ 6. QUÉ ANALIZAMOS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Qué analizamos</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                8 dimensiones de{" "}
                <span className="text-gradient-wine italic">tu carta</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Cada carta se analiza desde múltiples ángulos para detectar todas las oportunidades de mejora.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {analysisPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <div className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 transition-colors">
                        <Icon size={22} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-base font-semibold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 7. QUÉ RECIBIRÁS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Tu informe</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Qué incluye{" "}
                <span className="text-gradient-wine italic">tu informe</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reportCards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <h3 className="font-heading font-semibold">{c.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 8. CÓMO FUNCIONA ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Así de{" "}
                <span className="text-gradient-wine italic">fácil</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-wine text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold font-heading">
                      {s.num}
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    {i < steps.length - 1 && (
                      <ChevronRight size={20} className="hidden md:block absolute top-7 -right-4 text-muted-foreground/30" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 9. EJEMPLO DE HALLAZGOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <Lightbulb size={14} className="text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">Hallazgos reales</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Lo que nuestros análisis{" "}
                <span className="text-gradient-wine italic">descubren</span>
              </h2>
              <p className="text-muted-foreground">
                Estos son hallazgos reales detectados en cartas de restaurantes como el tuyo.
              </p>
            </ScrollReveal>

            <div className="space-y-3">
              {discoveries.map((d, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/20 transition-colors">
                    <CheckCircle2 size={20} className="text-wine flex-shrink-0 mt-0.5" />
                    <p className="text-foreground/90 leading-relaxed">{d}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 10. PARA QUIÉN ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Para quién</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                ¿Para qué perfiles{" "}
                <span className="text-gradient-wine italic">encaja mejor?</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {whoFits.map((w, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="p-6 rounded-xl border border-border bg-gradient-card hover:border-wine/20 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Users size={18} className="text-wine" />
                      <h3 className="font-heading font-bold">{w.profile}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 p-5 rounded-xl border border-border bg-background flex items-start gap-3">
                <XCircle size={18} className="text-muted-foreground/50 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Nota:</strong> si tu carta tiene menos de 20 referencias de vino, el análisis será menos revelador. Aun así, puede darte ideas útiles sobre estructura y pricing.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 11. QUÉ PASA DESPUÉS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Después del análisis</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Qué pasa{" "}
                <span className="text-gradient-wine italic">después</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {whatHappensAfter.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-5 p-6 rounded-xl border border-border bg-gradient-card">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10 text-wine font-bold shrink-0 font-heading">{i + 1}</span>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 12. FORMULARIO ═══════════ */}
        <section id="formulario" className="section-padding bg-gradient-dark scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Envía tu carta</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Analiza tu carta de vinos{" "}
                <span className="text-gradient-wine italic">ahora</span>
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y recibirás tu informe en menos de 48 horas. Gratis.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10 glow-wine">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Restaurant */}
                  <div>
                    <Label htmlFor="restaurant" className="text-sm font-medium">
                      Nombre del restaurante <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="restaurant"
                      name="restaurant"
                      placeholder="Ej. Restaurante La Viña"
                      required
                      maxLength={100}
                      className="bg-background border-border mt-1.5"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@restaurante.com"
                      required
                      maxLength={255}
                      className="bg-background border-border mt-1.5"
                    />
                  </div>

                  {/* City + References (optional but helpful) */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">Ciudad</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Ej. Madrid"
                        maxLength={80}
                        className="bg-background border-border mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="references_count" className="text-sm font-medium">Nº de referencias</Label>
                      <select
                        id="references_count"
                        name="references_count"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona un rango</option>
                        {referencesOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Business type (optional qualifier) */}
                  <div>
                    <Label htmlFor="business_type" className="text-sm font-medium">Tipo de negocio</Label>
                    <select
                      id="business_type"
                      name="business_type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona tipo de negocio</option>
                      {businessTypeOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Upload / Link toggle */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("upload")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                        mode === "upload"
                          ? "border-wine/40 bg-wine/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-wine/20"
                      }`}
                    >
                      <Upload size={16} />
                      Subir archivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("link")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                        mode === "link"
                          ? "border-wine/40 bg-wine/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-wine/20"
                      }`}
                    >
                      <Link2 size={16} />
                      Pegar enlace
                    </button>
                  </div>

                  {mode === "upload" ? (
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="relative cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-wine/30 bg-background p-8 text-center transition-colors"
                    >
                      <Upload size={28} className="mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        {fileName ? (
                          <span className="text-foreground font-medium">{fileName}</span>
                        ) : (
                          <>Haz clic o arrastra tu carta de vinos <br /><span className="text-xs">PDF, JPG, PNG · Máx 10 MB</span></>
                        )}
                      </p>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="menu_link" className="text-sm font-medium">URL de tu carta</Label>
                      <Input
                        id="menu_link"
                        name="menu_link"
                        type="url"
                        placeholder="https://tu-restaurante.com/carta-de-vinos"
                        maxLength={500}
                        className="bg-background border-border mt-1.5"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-wine text-primary-foreground py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {submitting ? "Enviando…" : "Enviar carta para análisis gratuito"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso. Informe en menos de 48 h.{" "}
                    <Link to="/privacidad" className="underline hover:text-foreground">Política de privacidad</Link>.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 13. FAQs ═══════════ */}
        <FAQSection faqs={faqs} title="Preguntas frecuentes sobre el análisis" />

        {/* ═══════════ 14. CTA FINAL ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                    Gratuito y sin compromiso
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Tu carta tiene potencial oculto.{" "}
                    <span className="text-gradient-wine italic">Descúbrelo.</span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                    Envíanos tu carta de vinos y te mostramos qué mejorar, cuánto puedes ganar y por dónde empezar. Sin coste. Sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#formulario"
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                    >
                      Enviar carta para análisis
                      <ArrowRight size={16} />
                    </a>
                    <Link
                      to="/demo"
                      className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all hover:-translate-y-0.5"
                    >
                      Solicitar demo
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-6">
                    Más de 500 cartas analizadas. Informe en 48 h.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <InternalLinks links={[
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" },
        { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" },
        { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
        { to: "/herramientas", label: "Todas las herramientas", type: "tool" },
      ]} />

      {/* Sticky CTA — excluded on this page via StickyCTA logic, so we skip it */}
      <Footer />
    </div>
  );
};

export default AnalizaCarta;
