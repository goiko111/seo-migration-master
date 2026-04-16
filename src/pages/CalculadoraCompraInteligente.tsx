import { useState, useMemo, useEffect } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Package, TrendingUp, AlertTriangle,
  DollarSign, RotateCcw, Sparkles, CheckCircle, ShoppingCart, Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import SummaryBox from "@/components/seo/SummaryBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type Suggestion = "mantener" | "renegociar" | "no-reponer" | "buscar-alternativa";

const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Calculadora de Compra Inteligente | Demo Winerim Supply",
    seo_desc: "Analiza si una referencia de vino merece la pena: rentabilidad, reposición, sobreprecio y oportunidad de mejora. Demo de Winerim Supply.",
    badge: "Demo · Winerim Supply",
    h1: "Calculadora de Compra Inteligente",
    subtitle: "Una demo simplificada para ayudarte a decidir si una referencia merece la pena reponerse, renegociarse o sustituirse.",
    bread_tools: "Herramientas", bread_self: "Calculadora de compra inteligente",
    intro_title: "Comprar bien es la primera decisión de rentabilidad",
    intro_desc: "Winerim Supply analiza cada referencia cruzando coste de compra, rotación, stock, margen objetivo y alternativas de mercado para decidir si mantener, renegociar, no reponer o buscar sustituto.",
    ref_title: "Datos de la referencia",
    ref_label: "Referencia", ref_placeholder: "Ej: Ribera del Duero Crianza",
    cost_label: "Coste actual (€/ud)", pvp_label: "PVP actual (€)",
    sales_label: "Ventas mensuales (uds)", stock_label: "Stock actual (uds)",
    days_label: "Días desde última venta", days_help: "Cuántos días lleva sin venderse una unidad.",
    alt_cost_label: "Coste alternativo estimado (€/ud)", alt_cost_help: "Coste de una referencia equivalente de otro proveedor.",
    margin_label: "Margen deseado (%)", margin_help: "Margen sobre PVP que consideras objetivo para esta categoría.",
    analyze_btn: "Analizar referencia",
    suggestion_for: "Sugerencia para",
    suggestions: {
      mantener: { label: "Mantener", desc: "Referencia rentable con buena rotación y coste competitivo." },
      renegociar: { label: "Renegociar", desc: "Rotación aceptable pero coste mejorable. Contacta al proveedor con datos." },
      "no-reponer": { label: "No reponer", desc: "Stock excesivo o rotación insuficiente. Agota stock actual sin reponer." },
      "buscar-alternativa": { label: "Buscar alternativa", desc: "Coste demasiado alto y/o margen por debajo del objetivo. Busca una referencia equivalente." },
    },
    profitability: "Rentabilidad actual", tied_capital: "Capital inmovilizado",
    repo_signal: "Señal de reposición", overprice_signal: "Señal de sobreprecio",
    repo: { ok: "Bajo control", revisar: "Revisar", urgente: "Exceso de stock" },
    sobre: { ok: "Competitivo", revisar: "Margen de mejora", alto: "Sobreprecio probable" },
    opportunity: "Oportunidad de mejora",
    saving_unit: "Ahorro por unidad", saving_month: "Ahorro mensual", saving_year: "Ahorro anual estimado",
    alt_margin_text: (costAlt: string, from: string, to: string) => `Con la alternativa a ${costAlt}/ud, el margen sube de ${from}% a ${to}% manteniendo el mismo PVP.`,
    summary_title: "Resumen operativo mensual",
    monthly_rev: "Facturación mensual", monthly_profit: "Beneficio bruto mensual",
    margin_vs_target: "Margen actual vs objetivo", days_since: "Días desde última venta",
    months: "meses", days_short: "d sin venta", competitive: "Coste competitivo",
    vs_alt: "/ud vs alt.",
    insights: {
      mantener: "Esta referencia tiene buena rotación, coste competitivo y margen dentro del objetivo. Mantén las condiciones actuales y revisa periódicamente.",
      renegociar: "La referencia tiene potencial pero el coste o el margen no están alineados con tu objetivo. Usa estos datos como argumento para renegociar condiciones con tu proveedor.",
      "no-reponer": "La rotación es demasiado lenta o el stock acumulado es excesivo. Agota el stock actual (considera copa o promoción) y no repongas hasta que los datos mejoren.",
      "buscar-alternativa": "El coste de compra es significativamente alto y/o el margen está muy por debajo del objetivo. Busca una referencia equivalente que te permita mantener el PVP con mejor rentabilidad.",
    },
    cta_badge: "Demo simplificada",
    cta_title: "Esta herramienta es una demo simplificada de Winerim Supply",
    cta_desc: "La plataforma completa analiza todas tus referencias en paralelo, cruza datos de venta, stock y distribuidores, y te genera recomendaciones automáticas de compra, renegociación y retirada.",
    cta_btn: "Ver Winerim Supply",
    faqs: [
      { q: "¿Qué diferencia hay entre esta calculadora y la de stock muerto?", a: "La calculadora de stock muerto evalúa el capital inmovilizado en referencias sin rotación. Esta herramienta va un paso más allá: analiza si una referencia concreta merece seguir comprándose, comparando su rentabilidad, rotación y coste frente a alternativas." },
      { q: "¿Qué es el 'coste alternativo estimado'?", a: "Es el precio al que podrías conseguir una referencia equivalente (misma categoría, estilo y calidad percibida) de otro proveedor o de otra añada. Sirve para detectar si estás pagando más de lo necesario." },
      { q: "¿Cuándo debería renegociar con mi proveedor?", a: "Cuando la señal de sobreprecio indica 'Margen de mejora' o 'Sobreprecio probable'. También cuando el margen actual está por debajo de tu objetivo y la rotación no justifica el coste." },
      { q: "¿Winerim Supply hace esto automáticamente?", a: "Sí. Winerim Supply analiza todas tus referencias en paralelo, cruza datos de compra con ventas y rotación, y genera alertas y recomendaciones automáticas. Esta calculadora es una demo simplificada de esa capacidad." },
    ],
    decides: ["Si una referencia justifica su coste de compra actual", "Si conviene reponer, renegociar o sustituir por alternativa", "Cuánto capital tienes bloqueado y si cumples tu margen objetivo"],
    avoids: ["Reponer referencias que no rotan lo suficiente", "Pagar más que el mercado por una misma referencia", "Inmovilizar capital en stock sin retorno claro"],
    impact_items: ["Reducción del coste medio de compra por referencia", "Liberación de capital bloqueado en stock sin salida", "Decisiones de compra basadas en dato, no en inercia"],
    link_dead_stock: "Calculadora de stock muerto", link_margin: "Calculadora de márgenes",
    link_supply: "Winerim Supply: inteligencia de compras", link_core: "Winerim Core: analítica completa",
    locale: "es-ES", currency: "EUR",
  },
  en: {
    seo_title: "Smart Purchasing Calculator | Winerim Supply Demo",
    seo_desc: "Analyse whether a wine reference is worth it: profitability, replenishment signal, overpricing and improvement opportunity. Simplified Winerim Supply demo.",
    badge: "Demo · Winerim Supply",
    h1: "Smart Purchasing Calculator",
    subtitle: "A simplified demo to help you decide whether a reference is worth replenishing, renegotiating or replacing.",
    bread_tools: "Tools", bread_self: "Smart purchasing calculator",
    intro_title: "Buying well is the first profitability decision",
    intro_desc: "Winerim Supply analyses each reference by cross-referencing purchase cost, rotation, stock, target margin and market alternatives to decide whether to keep, renegotiate, stop replenishing or find a substitute.",
    ref_title: "Reference data",
    ref_label: "Reference", ref_placeholder: "E.g. Ribera del Duero Crianza",
    cost_label: "Current cost (€/unit)", pvp_label: "Current selling price (€)",
    sales_label: "Monthly sales (units)", stock_label: "Current stock (units)",
    days_label: "Days since last sale", days_help: "How many days since the last unit was sold.",
    alt_cost_label: "Estimated alternative cost (€/unit)", alt_cost_help: "Cost of an equivalent reference from another supplier.",
    margin_label: "Target margin (%)", margin_help: "Margin over selling price you consider the target for this category.",
    analyze_btn: "Analyse reference",
    suggestion_for: "Suggestion for",
    suggestions: {
      mantener: { label: "Keep", desc: "Profitable reference with good rotation and competitive cost." },
      renegociar: { label: "Renegotiate", desc: "Acceptable rotation but cost could be improved. Contact your supplier with data." },
      "no-reponer": { label: "Stop replenishing", desc: "Excess stock or insufficient rotation. Sell through current stock without reordering." },
      "buscar-alternativa": { label: "Find alternative", desc: "Cost too high and/or margin below target. Look for an equivalent reference." },
    },
    profitability: "Current profitability", tied_capital: "Tied-up capital",
    repo_signal: "Replenishment signal", overprice_signal: "Overpricing signal",
    repo: { ok: "Under control", revisar: "Review", urgente: "Excess stock" },
    sobre: { ok: "Competitive", revisar: "Room for improvement", alto: "Likely overpriced" },
    opportunity: "Improvement opportunity",
    saving_unit: "Saving per unit", saving_month: "Monthly saving", saving_year: "Estimated annual saving",
    alt_margin_text: (costAlt: string, from: string, to: string) => `With the alternative at ${costAlt}/unit, margin rises from ${from}% to ${to}% keeping the same selling price.`,
    summary_title: "Monthly operational summary",
    monthly_rev: "Monthly revenue", monthly_profit: "Monthly gross profit",
    margin_vs_target: "Current margin vs target", days_since: "Days since last sale",
    months: "months", days_short: "d without sale", competitive: "Competitive cost",
    vs_alt: "/unit vs alt.",
    insights: {
      mantener: "This reference has good rotation, competitive cost and margin within target. Maintain current conditions and review periodically.",
      renegociar: "The reference has potential but cost or margin aren't aligned with your target. Use these data points to renegotiate conditions with your supplier.",
      "no-reponer": "Rotation is too slow or accumulated stock is excessive. Sell through current stock (consider by-the-glass or promotion) and don't reorder until data improves.",
      "buscar-alternativa": "Purchase cost is significantly high and/or margin is well below target. Find an equivalent reference that lets you keep the selling price with better profitability.",
    },
    cta_badge: "Simplified demo",
    cta_title: "This tool is a simplified demo of Winerim Supply",
    cta_desc: "The full platform analyses all your references in parallel, cross-references sales, stock and distributor data, and generates automatic purchasing, renegotiation and withdrawal recommendations.",
    cta_btn: "See Winerim Supply",
    faqs: [
      { q: "What's the difference between this calculator and the dead stock one?", a: "The dead stock calculator evaluates capital tied up in non-rotating references. This tool goes further: it analyses whether a specific reference is worth continuing to purchase, comparing profitability, rotation and cost against alternatives." },
      { q: "What is 'estimated alternative cost'?", a: "The price at which you could get an equivalent reference (same category, style and perceived quality) from another supplier or vintage. It helps detect if you're overpaying." },
      { q: "When should I renegotiate with my supplier?", a: "When the overpricing signal shows 'Room for improvement' or 'Likely overpriced'. Also when current margin is below your target and rotation doesn't justify the cost." },
      { q: "Does Winerim Supply do this automatically?", a: "Yes. Winerim Supply analyses all your references in parallel, cross-references purchase data with sales and rotation, and generates automatic alerts and recommendations. This calculator is a simplified demo of that capability." },
    ],
    decides: ["Whether a reference justifies its current purchase cost", "Whether to replenish, renegotiate or replace with an alternative", "How much capital is tied up and whether you meet your margin target"],
    avoids: ["Replenishing references that don't rotate enough", "Paying above market for the same reference", "Tying up capital in stock with no clear return"],
    impact_items: ["Reduction in average purchase cost per reference", "Release of capital blocked in dead stock", "Purchasing decisions based on data, not inertia"],
    link_dead_stock: "Dead stock calculator", link_margin: "Margin calculator",
    link_supply: "Winerim Supply: purchasing intelligence", link_core: "Winerim Core: full analytics",
    locale: "en-GB", currency: "EUR",
  },
  it: {
    seo_title: "Calcolatrice di Acquisto Intelligente | Demo Winerim Supply",
    seo_desc: "Analizza se una referenza di vino vale la pena: redditività, riordino, sovrapprezzo e opportunità di miglioramento. Demo Winerim Supply.",
    badge: "Demo · Winerim Supply",
    h1: "Calcolatrice di Acquisto Intelligente",
    subtitle: "Una demo semplificata per aiutarti a decidere se una referenza vale la pena riordinare, rinegoziare o sostituire.",
    bread_tools: "Strumenti", bread_self: "Calcolatrice acquisto intelligente",
    intro_title: "Comprare bene è la prima decisione di redditività",
    intro_desc: "Winerim Supply analizza ogni referenza incrociando costo d'acquisto, rotazione, stock, margine obiettivo e alternative di mercato per decidere se mantenere, rinegoziare, non riordinare o cercare un sostituto.",
    ref_title: "Dati della referenza",
    ref_label: "Referenza", ref_placeholder: "Es: Ribera del Duero Crianza",
    cost_label: "Costo attuale (€/ud)", pvp_label: "PVP attuale (€)",
    sales_label: "Vendite mensili (unità)", stock_label: "Stock attuale (unità)",
    days_label: "Giorni dall'ultima vendita", days_help: "Quanti giorni senza vendere un'unità.",
    alt_cost_label: "Costo alternativo stimato (€/ud)", alt_cost_help: "Costo di una referenza equivalente da un altro fornitore.",
    margin_label: "Margine desiderato (%)", margin_help: "Margine su PVP che consideri obiettivo per questa categoria.",
    analyze_btn: "Analizza referenza",
    suggestion_for: "Suggerimento per",
    suggestions: {
      mantener: { label: "Mantenere", desc: "Referenza redditizia con buona rotazione e costo competitivo." },
      renegociar: { label: "Rinegoziare", desc: "Rotazione accettabile ma costo migliorabile. Contatta il fornitore con i dati." },
      "no-reponer": { label: "Non riordinare", desc: "Stock eccessivo o rotazione insufficiente. Esaurisci lo stock attuale senza riordinare." },
      "buscar-alternativa": { label: "Cercare alternativa", desc: "Costo troppo alto e/o margine sotto l'obiettivo. Cerca una referenza equivalente." },
    },
    profitability: "Redditività attuale", tied_capital: "Capitale immobilizzato",
    repo_signal: "Segnale di riordino", overprice_signal: "Segnale di sovrapprezzo",
    repo: { ok: "Sotto controllo", revisar: "Da rivedere", urgente: "Eccesso di stock" },
    sobre: { ok: "Competitivo", revisar: "Margine di miglioramento", alto: "Probabile sovrapprezzo" },
    opportunity: "Opportunità di miglioramento",
    saving_unit: "Risparmio per unità", saving_month: "Risparmio mensile", saving_year: "Risparmio annuale stimato",
    alt_margin_text: (costAlt: string, from: string, to: string) => `Con l'alternativa a ${costAlt}/ud, il margine sale dal ${from}% al ${to}% mantenendo lo stesso PVP.`,
    summary_title: "Riepilogo operativo mensile",
    monthly_rev: "Fatturato mensile", monthly_profit: "Utile lordo mensile",
    margin_vs_target: "Margine attuale vs obiettivo", days_since: "Giorni dall'ultima vendita",
    months: "mesi", days_short: "g senza vendita", competitive: "Costo competitivo",
    vs_alt: "/ud vs alt.",
    insights: {
      mantener: "Questa referenza ha buona rotazione, costo competitivo e margine nell'obiettivo. Mantieni le condizioni attuali e rivedi periodicamente.",
      renegociar: "La referenza ha potenziale ma il costo o il margine non sono allineati all'obiettivo. Usa questi dati per rinegoziare con il fornitore.",
      "no-reponer": "La rotazione è troppo lenta o lo stock accumulato è eccessivo. Esaurisci lo stock attuale (considera calice o promozione) e non riordinare finché i dati non migliorano.",
      "buscar-alternativa": "Il costo d'acquisto è significativamente alto e/o il margine è molto sotto l'obiettivo. Cerca una referenza equivalente che ti permetta di mantenere il PVP con migliore redditività.",
    },
    cta_badge: "Demo semplificata",
    cta_title: "Questo strumento è una demo semplificata di Winerim Supply",
    cta_desc: "La piattaforma completa analizza tutte le referenze in parallelo, incrocia dati di vendita, stock e distributori, e genera raccomandazioni automatiche di acquisto, rinegoziazione e ritiro.",
    cta_btn: "Vedi Winerim Supply",
    faqs: [
      { q: "Che differenza c'è tra questa calcolatrice e quella dello stock morto?", a: "La calcolatrice dello stock morto valuta il capitale immobilizzato in referenze senza rotazione. Questo strumento va oltre: analizza se una referenza specifica vale la pena continuare ad acquistare, confrontando redditività, rotazione e costo con le alternative." },
      { q: "Cos'è il 'costo alternativo stimato'?", a: "È il prezzo a cui potresti ottenere una referenza equivalente (stessa categoria, stile e qualità percepita) da un altro fornitore o annata. Serve a rilevare se stai pagando più del necessario." },
      { q: "Quando dovrei rinegoziare con il fornitore?", a: "Quando il segnale di sovrapprezzo indica 'Margine di miglioramento' o 'Probabile sovrapprezzo'. Anche quando il margine attuale è sotto l'obiettivo e la rotazione non giustifica il costo." },
      { q: "Winerim Supply fa tutto automaticamente?", a: "Sì. Winerim Supply analizza tutte le referenze in parallelo, incrocia dati d'acquisto con vendite e rotazione, e genera avvisi e raccomandazioni automatiche. Questa calcolatrice è una demo semplificata di quella capacità." },
    ],
    decides: ["Se una referenza giustifica il costo d'acquisto attuale", "Se conviene riordinare, rinegoziare o sostituire con alternativa", "Quanto capitale hai bloccato e se raggiungi il margine obiettivo"],
    avoids: ["Riordinare referenze che non ruotano abbastanza", "Pagare più del mercato per la stessa referenza", "Immobilizzare capitale in stock senza ritorno chiaro"],
    impact_items: ["Riduzione del costo medio d'acquisto per referenza", "Liberazione di capitale bloccato in stock senza uscita", "Decisioni d'acquisto basate sui dati, non sull'inerzia"],
    link_dead_stock: "Calcolatrice stock morto", link_margin: "Calcolatrice margini",
    link_supply: "Winerim Supply: intelligenza acquisti", link_core: "Winerim Core: analitica completa",
    locale: "it-IT", currency: "EUR",
  },
  fr: {
    seo_title: "Calculateur d'Achat Intelligent | Démo Winerim Supply",
    seo_desc: "Analysez si une référence de vin en vaut la peine : rentabilité, réapprovisionnement, surcoût et opportunité d'amélioration. Démo Winerim Supply.",
    badge: "Démo · Winerim Supply",
    h1: "Calculateur d'Achat Intelligent",
    subtitle: "Une démo simplifiée pour vous aider à décider si une référence mérite d'être réapprovisionnée, renégociée ou remplacée.",
    bread_tools: "Outils", bread_self: "Calculateur achat intelligent",
    intro_title: "Bien acheter est la première décision de rentabilité",
    intro_desc: "Winerim Supply analyse chaque référence en croisant coût d'achat, rotation, stock, marge cible et alternatives de marché pour décider de conserver, renégocier, ne pas réapprovisionner ou chercher un substitut.",
    ref_title: "Données de la référence",
    ref_label: "Référence", ref_placeholder: "Ex : Ribera del Duero Crianza",
    cost_label: "Coût actuel (€/unité)", pvp_label: "Prix de vente actuel (€)",
    sales_label: "Ventes mensuelles (unités)", stock_label: "Stock actuel (unités)",
    days_label: "Jours depuis la dernière vente", days_help: "Nombre de jours sans vendre une unité.",
    alt_cost_label: "Coût alternatif estimé (€/unité)", alt_cost_help: "Coût d'une référence équivalente chez un autre fournisseur.",
    margin_label: "Marge souhaitée (%)", margin_help: "Marge sur prix de vente cible pour cette catégorie.",
    analyze_btn: "Analyser la référence",
    suggestion_for: "Suggestion pour",
    suggestions: {
      mantener: { label: "Conserver", desc: "Référence rentable avec bonne rotation et coût compétitif." },
      renegociar: { label: "Renégocier", desc: "Rotation acceptable mais coût améliorable. Contactez votre fournisseur avec les données." },
      "no-reponer": { label: "Ne pas réapprovisionner", desc: "Stock excessif ou rotation insuffisante. Écoulez le stock actuel sans commander." },
      "buscar-alternativa": { label: "Chercher alternative", desc: "Coût trop élevé et/ou marge en dessous de l'objectif. Cherchez une référence équivalente." },
    },
    profitability: "Rentabilité actuelle", tied_capital: "Capital immobilisé",
    repo_signal: "Signal de réapprovisionnement", overprice_signal: "Signal de surcoût",
    repo: { ok: "Sous contrôle", revisar: "À revoir", urgente: "Stock excédentaire" },
    sobre: { ok: "Compétitif", revisar: "Marge d'amélioration", alto: "Surcoût probable" },
    opportunity: "Opportunité d'amélioration",
    saving_unit: "Économie par unité", saving_month: "Économie mensuelle", saving_year: "Économie annuelle estimée",
    alt_margin_text: (costAlt: string, from: string, to: string) => `Avec l'alternative à ${costAlt}/unité, la marge passe de ${from}% à ${to}% en gardant le même prix de vente.`,
    summary_title: "Résumé opérationnel mensuel",
    monthly_rev: "CA mensuel", monthly_profit: "Bénéfice brut mensuel",
    margin_vs_target: "Marge actuelle vs objectif", days_since: "Jours depuis dernière vente",
    months: "mois", days_short: "j sans vente", competitive: "Coût compétitif",
    vs_alt: "/unité vs alt.",
    insights: {
      mantener: "Cette référence a une bonne rotation, un coût compétitif et une marge dans l'objectif. Maintenez les conditions actuelles et révisez périodiquement.",
      renegociar: "La référence a du potentiel mais le coût ou la marge ne sont pas alignés avec votre objectif. Utilisez ces données pour renégocier avec votre fournisseur.",
      "no-reponer": "La rotation est trop lente ou le stock accumulé est excessif. Écoulez le stock actuel (envisagez le verre ou une promotion) et ne recommandez pas tant que les données ne s'améliorent pas.",
      "buscar-alternativa": "Le coût d'achat est significativement élevé et/ou la marge est bien en dessous de l'objectif. Cherchez une référence équivalente pour maintenir le prix de vente avec une meilleure rentabilité.",
    },
    cta_badge: "Démo simplifiée",
    cta_title: "Cet outil est une démo simplifiée de Winerim Supply",
    cta_desc: "La plateforme complète analyse toutes vos références en parallèle, croise les données de vente, stock et distributeurs, et génère des recommandations automatiques d'achat, de renégociation et de retrait.",
    cta_btn: "Voir Winerim Supply",
    faqs: [
      { q: "Quelle différence avec le calculateur de stock mort ?", a: "Le calculateur de stock mort évalue le capital immobilisé dans les références sans rotation. Cet outil va plus loin : il analyse si une référence spécifique mérite de continuer à être achetée, en comparant rentabilité, rotation et coût face aux alternatives." },
      { q: "Qu'est-ce que le 'coût alternatif estimé' ?", a: "Le prix auquel vous pourriez obtenir une référence équivalente (même catégorie, style et qualité perçue) chez un autre fournisseur ou millésime. Il permet de détecter si vous payez plus que nécessaire." },
      { q: "Quand dois-je renégocier avec mon fournisseur ?", a: "Quand le signal de surcoût indique 'Marge d'amélioration' ou 'Surcoût probable'. Aussi quand la marge actuelle est en dessous de votre objectif et la rotation ne justifie pas le coût." },
      { q: "Winerim Supply fait-il cela automatiquement ?", a: "Oui. Winerim Supply analyse toutes vos références en parallèle, croise les données d'achat avec les ventes et la rotation, et génère des alertes et recommandations automatiques. Ce calculateur est une démo simplifiée de cette capacité." },
    ],
    decides: ["Si une référence justifie son coût d'achat actuel", "S'il convient de réapprovisionner, renégocier ou remplacer par une alternative", "Combien de capital est bloqué et si vous atteignez votre marge cible"],
    avoids: ["Réapprovisionner des références qui ne tournent pas assez", "Payer au-dessus du marché pour la même référence", "Immobiliser du capital dans du stock sans retour clair"],
    impact_items: ["Réduction du coût moyen d'achat par référence", "Libération du capital bloqué dans du stock sans sortie", "Décisions d'achat basées sur les données, pas sur l'inertie"],
    link_dead_stock: "Calculateur de stock mort", link_margin: "Calculateur de marges",
    link_supply: "Winerim Supply : intelligence achats", link_core: "Winerim Core : analytics complète",
    locale: "fr-FR", currency: "EUR",
  },
};

const CalculadoraCompraInteligente = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  const fmtEur = (n: number) =>
    n.toLocaleString(t.locale, { style: "currency", currency: t.currency, maximumFractionDigits: 0 });

  const [nombre, setNombre] = useState(t.ref_placeholder.replace(/^(Ej|E\.g|Es|Ex)\s*[:.]?\s*/, ""));
  const [coste, setCoste] = useState(8);
  const [pvp, setPvp] = useState(28);
  const [ventasMes, setVentasMes] = useState(6);
  const [stock, setStock] = useState(12);
  const [diasSinVenta, setDiasSinVenta] = useState(14);
  const [costeAlt, setCosteAlt] = useState(6);
  const [margenDeseado, setMargenDeseado] = useState(70);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "calc-compra-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: t.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.seo_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("calc-compra-jsonld")?.remove(); };
  }, [t]);

  const results = useMemo(() => {
    const margenBruto = pvp - coste;
    const margenPct = pvp > 0 ? (margenBruto / pvp) * 100 : 0;
    const capitalInmovilizado = stock * coste;
    const mesesStock = ventasMes > 0 ? stock / ventasMes : Infinity;
    const facturacionMes = ventasMes * pvp;
    const beneficioMes = ventasMes * margenBruto;

    let senalRepo: "ok" | "revisar" | "urgente" = "ok";
    if (mesesStock > 3 || diasSinVenta > 90) senalRepo = "urgente";
    else if (mesesStock > 1.5 || diasSinVenta > 45) senalRepo = "revisar";

    const ahorroPorUnidad = coste - costeAlt;
    const ahorroMes = ahorroPorUnidad * ventasMes;
    const ahorroAnual = ahorroMes * 12;
    let senalSobreprecio: "ok" | "revisar" | "alto" = "ok";
    if (costeAlt > 0 && ahorroPorUnidad > coste * 0.15) senalSobreprecio = "alto";
    else if (costeAlt > 0 && ahorroPorUnidad > coste * 0.05) senalSobreprecio = "revisar";

    const margenAlt = pvp - costeAlt;
    const margenAltPct = pvp > 0 ? (margenAlt / pvp) * 100 : 0;
    const margenGap = margenDeseado - margenPct;
    const cumpleMargen = margenPct >= margenDeseado;

    let suggestion: Suggestion = "mantener";
    if (senalRepo === "urgente" && senalSobreprecio !== "ok") suggestion = "buscar-alternativa";
    else if (senalRepo === "urgente") suggestion = "no-reponer";
    else if (senalSobreprecio === "alto" || (!cumpleMargen && margenGap > 15)) suggestion = "buscar-alternativa";
    else if (senalSobreprecio === "revisar" || !cumpleMargen) suggestion = "renegociar";

    return {
      margenBruto, margenPct, capitalInmovilizado, mesesStock,
      facturacionMes, beneficioMes, senalRepo, senalSobreprecio,
      ahorroPorUnidad, ahorroMes, ahorroAnual, margenAlt, margenAltPct,
      margenGap, cumpleMargen, suggestion,
    };
  }, [coste, pvp, ventasMes, stock, diasSinVenta, costeAlt, margenDeseado]);

  const repoColor = { ok: "text-emerald-500", revisar: "text-amber-500", urgente: "text-destructive" };
  const repoBg = { ok: "bg-emerald-500/10", revisar: "bg-amber-500/10", urgente: "bg-destructive/10" };
  const sobreColor = { ok: "text-emerald-500", revisar: "text-amber-500", alto: "text-destructive" };
  const sobreBg = { ok: "bg-emerald-500/10", revisar: "bg-amber-500/10", alto: "bg-destructive/10" };

  const sgMeta: Record<Suggestion, { color: string; bg: string }> = {
    mantener: { color: "text-emerald-500", bg: "bg-emerald-500/10" },
    renegociar: { color: "text-amber-500", bg: "bg-amber-500/10" },
    "no-reponer": { color: "text-destructive", bg: "bg-destructive/10" },
    "buscar-alternativa": { color: "text-destructive", bg: "bg-destructive/10" },
  };

  const sg = t.suggestions[results.suggestion];
  const sgStyle = sgMeta[results.suggestion];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-compra-inteligente")}`}
        hreflang={allLangPaths("/herramientas/calculadora-compra-inteligente")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(150_40%_30%/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6">
            <ShoppingCart size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-500">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.subtitle}</motion.p>
        </div>
      </section>

      {/* DEMO INTRO */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-emerald-500/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(150_40%_30%/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">{t.intro_title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.intro_desc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock layer="supply" decides={t.decides} avoids={t.avoids} impact={t.impact_items} />

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Package size={20} className="text-emerald-500" /> {t.ref_title}
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-1.5 block">{t.ref_label}</Label>
              <Input value={nombre} onChange={e => setNombre(e.target.value)} className="bg-background" placeholder={t.ref_placeholder} />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.cost_label}</Label>
              <Input type="number" min={0} step={0.5} value={coste} onChange={e => setCoste(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.pvp_label}</Label>
              <Input type="number" min={0} step={0.5} value={pvp} onChange={e => setPvp(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.sales_label}</Label>
              <Input type="number" min={0} value={ventasMes} onChange={e => setVentasMes(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.stock_label}</Label>
              <Input type="number" min={0} value={stock} onChange={e => setStock(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.days_label}</Label>
              <Input type="number" min={0} value={diasSinVenta} onChange={e => setDiasSinVenta(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
              <p className="text-xs text-muted-foreground mt-1">{t.days_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.alt_cost_label}</Label>
              <Input type="number" min={0} step={0.5} value={costeAlt} onChange={e => setCosteAlt(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
              <p className="text-xs text-muted-foreground mt-1">{t.alt_cost_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.margin_label}</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={40} max={85} value={margenDeseado} onChange={e => setMargenDeseado(Number(e.target.value))} className="flex-1 accent-emerald-500 h-2" />
                <span className="text-sm font-semibold w-12 text-right">{margenDeseado}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.margin_help}</p>
            </div>
          </div>

          <Button onClick={() => { setCalculated(true); trackAction("tool_use", "tool", "calculadora-compra-inteligente"); }}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            {t.analyze_btn}
          </Button>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-6 rounded-2xl border ${sgStyle.bg} text-center`}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-2">{t.suggestion_for} «{nombre || "—"}»</p>
              <p className={`font-heading text-3xl md:text-4xl font-bold ${sgStyle.color}`}>{sg.label}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">{sg.desc}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{t.profitability}</p>
                <p className="font-heading text-2xl font-bold text-wine">{results.margenPct.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">{fmtEur(results.margenBruto)} / bot.</p>
                {!results.cumpleMargen && <p className="text-[11px] text-destructive mt-1">-{results.margenGap.toFixed(0)}pp vs obj.</p>}
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <DollarSign size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{t.tied_capital}</p>
                <p className="font-heading text-2xl font-bold">{fmtEur(results.capitalInmovilizado)}</p>
                <p className="text-xs text-muted-foreground">{stock} uds × {fmtEur(coste)}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <RotateCcw size={18} className={`mx-auto mb-2 ${repoColor[results.senalRepo]}`} />
                <p className="text-xs text-muted-foreground mb-1">{t.repo_signal}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${repoBg[results.senalRepo]} ${repoColor[results.senalRepo]}`}>
                  {t.repo[results.senalRepo]}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{results.mesesStock === Infinity ? "∞" : results.mesesStock.toFixed(1)} {t.months} · {diasSinVenta}{t.days_short}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <AlertTriangle size={18} className={`mx-auto mb-2 ${sobreColor[results.senalSobreprecio]}`} />
                <p className="text-xs text-muted-foreground mb-1">{t.overprice_signal}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${sobreBg[results.senalSobreprecio]} ${sobreColor[results.senalSobreprecio]}`}>
                  {t.sobre[results.senalSobreprecio]}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{results.ahorroPorUnidad > 0 ? `+${fmtEur(results.ahorroPorUnidad)}${t.vs_alt}` : t.competitive}</p>
              </div>
            </div>

            {results.ahorroPorUnidad > 0 && (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-heading font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-500" /> {t.opportunity}
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t.saving_unit}</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroPorUnidad)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t.saving_month}</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroMes)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t.saving_year}</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroAnual)}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {t.alt_margin_text(fmtEur(costeAlt), results.margenPct.toFixed(0), results.margenAltPct.toFixed(0))}
                </p>
              </div>
            )}

            <div className="p-6 rounded-xl border border-border bg-gradient-card">
              <h3 className="font-heading font-bold mb-4">{t.summary_title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{t.monthly_rev}</span><span className="font-semibold">{fmtEur(results.facturacionMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.monthly_profit}</span><span className="font-semibold text-wine">{fmtEur(results.beneficioMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.margin_vs_target}</span>
                  <span className={`font-semibold ${results.cumpleMargen ? "text-emerald-500" : "text-destructive"}`}>
                    {results.margenPct.toFixed(0)}% / {margenDeseado}% {results.cumpleMargen ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t.days_since}</span><span className="font-semibold">{diasSinVenta}d</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-background">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {t.insights[results.suggestion]}
              </p>
            </div>

            {/* ── Winerim Action Plan ── */}
            {(() => {
              const al: Record<string, { title: string; timeline: string; action: string; when: string; week1: string; week2: string; month1: string; month2: string; capitalProjection: string; ifNoAction: string; ifAction: string; inMonths: (n: number) => string; saved: string }> = {
                es: { title: "Plan de acción · Winerim", timeline: "Línea temporal", action: "Acción", when: "Cuándo", week1: "Semana 1", week2: "Semana 2", month1: "Mes 1", month2: "Mes 2", capitalProjection: "Proyección de capital", ifNoAction: "Sin actuar", ifAction: "Con acción", inMonths: (n) => `En ${n} meses`, saved: "Ahorro potencial" },
                en: { title: "Action plan · Winerim", timeline: "Timeline", action: "Action", when: "When", week1: "Week 1", week2: "Week 2", month1: "Month 1", month2: "Month 2", capitalProjection: "Capital projection", ifNoAction: "No action", ifAction: "With action", inMonths: (n) => `In ${n} months`, saved: "Potential saving" },
                it: { title: "Piano d'azione · Winerim", timeline: "Linea temporale", action: "Azione", when: "Quando", week1: "Settimana 1", week2: "Settimana 2", month1: "Mese 1", month2: "Mese 2", capitalProjection: "Proiezione del capitale", ifNoAction: "Senza agire", ifAction: "Con azione", inMonths: (n) => `In ${n} mesi`, saved: "Risparmio potenziale" },
                fr: { title: "Plan d'action · Winerim", timeline: "Chronologie", action: "Action", when: "Quand", week1: "Semaine 1", week2: "Semaine 2", month1: "Mois 1", month2: "Mois 2", capitalProjection: "Projection du capital", ifNoAction: "Sans agir", ifAction: "Avec action", inMonths: (n) => `Dans ${n} mois`, saved: "Économie potentielle" },
              };
              const a = al[lang] || al.es;
              const sg = results.suggestion;
              const capitalInmo = results.capitalInmovilizado;
              const oppCost6 = capitalInmo * 0.08 * 0.5;
              const savedIfAction = sg === "mantener" ? 0 : sg === "renegociar" ? results.ahorroAnual * 0.5 : capitalInmo * 0.4;

              const actionSteps: { when: string; action: string }[] = 
                sg === "mantener" ? [
                  { when: a.month1, action: lang === "es" ? "Mantener condiciones. Revisar en 90 días." : lang === "en" ? "Maintain conditions. Review in 90 days." : lang === "it" ? "Mantenere condizioni. Rivedere in 90 giorni." : "Maintenir les conditions. Réviser dans 90 jours." },
                ] : sg === "renegociar" ? [
                  { when: a.week1, action: lang === "es" ? "Pedir presupuesto a 2 proveedores alternativos" : lang === "en" ? "Request quotes from 2 alternative suppliers" : lang === "it" ? "Richiedere preventivo a 2 fornitori alternativi" : "Demander un devis à 2 fournisseurs alternatifs" },
                  { when: a.week2, action: lang === "es" ? "Llamar al proveedor actual con los presupuestos y negociar mejora" : lang === "en" ? "Call current supplier with quotes and negotiate improvement" : lang === "it" ? "Chiamare il fornitore attuale con i preventivi e negoziare miglioramento" : "Appeler le fournisseur actuel avec les devis et négocier une amélioration" },
                  { when: a.month1, action: lang === "es" ? "Si no iguala, reasignar volumen al proveedor con mejor precio" : lang === "en" ? "If not matched, reassign volume to supplier with best price" : lang === "it" ? "Se non eguaglia, riassegnare il volume al fornitore con prezzo migliore" : "Si non égalé, réassigner le volume au fournisseur le mieux-disant" },
                ] : sg === "no-reponer" ? [
                  { when: a.week1, action: lang === "es" ? "Sacar las unidades restantes por copa o menú degustación" : lang === "en" ? "Offer remaining units by the glass or tasting menu" : lang === "it" ? "Offrire le unità rimanenti al calice o in menu degustazione" : "Proposer les unités restantes au verre ou en menu dégustation" },
                  { when: a.month1, action: lang === "es" ? "No incluir en el próximo pedido. Bloquear reposición automática" : lang === "en" ? "Do not include in next order. Block automatic replenishment" : lang === "it" ? "Non includere nel prossimo ordine. Bloccare il riassortimento automatico" : "Ne pas inclure dans la prochaine commande. Bloquer le réapprovisionnement automatique" },
                  { when: a.month2, action: lang === "es" ? "Reasignar presupuesto a referencias con mejor rotación/margen" : lang === "en" ? "Reallocate budget to references with better rotation/margin" : lang === "it" ? "Riallocare il budget a referenze con migliore rotazione/margine" : "Réalloquer le budget aux références avec meilleure rotation/marge" },
                ] : [
                  { when: a.week1, action: lang === "es" ? "Buscar alternativa equivalente en catálogos de 2-3 distribuidores" : lang === "en" ? "Search for equivalent alternative in 2-3 distributor catalogues" : lang === "it" ? "Cercare alternativa equivalente nei cataloghi di 2-3 distributori" : "Rechercher une alternative équivalente dans les catalogues de 2-3 distributeurs" },
                  { when: a.week2, action: lang === "es" ? "Probar la alternativa internamente. Comparar calidad/precio percibido" : lang === "en" ? "Test alternative internally. Compare quality/perceived price" : lang === "it" ? "Testare l'alternativa internamente. Confrontare qualità/prezzo percepito" : "Tester l'alternative en interne. Comparer qualité/prix perçu" },
                  { when: a.month1, action: lang === "es" ? "Sustituir en carta y medir rotación/margen durante 30 días" : lang === "en" ? "Replace on list and measure rotation/margin for 30 days" : lang === "it" ? "Sostituire in carta e misurare rotazione/margine per 30 giorni" : "Remplacer sur la carte et mesurer rotation/marge pendant 30 jours" },
                ];

              return (
                <div className="rounded-xl border border-emerald-500/20 bg-gradient-card p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-emerald-500" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500">{a.title}</p>
                  </div>

                  <div className="space-y-2">
                    {actionSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold tracking-widest uppercase text-emerald-500">{step.when}</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {savedIfAction > 0 && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                      <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5 text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{a.ifNoAction} ({a.inMonths(6)})</p>
                        <p className="font-heading text-lg font-bold text-destructive">{fmtEur(capitalInmo + oppCost6)}</p>
                        <p className="text-[10px] text-muted-foreground">{a.capitalProjection}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{a.saved} ({a.inMonths(6)})</p>
                        <p className="font-heading text-lg font-bold text-emerald-500">{fmtEur(savedIfAction)}</p>
                        <p className="text-[10px] text-muted-foreground">{a.ifAction}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </section>
      )}

      {/* SUPPLY CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="relative text-center bg-gradient-card rounded-2xl border border-emerald-500/20 p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(150_40%_30%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <ShoppingCart size={28} className="text-emerald-500 mx-auto mb-4" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-500 mb-4">{t.cta_badge}</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.cta_title}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">{t.cta_desc}</p>
              <Link to={localePath("/producto/winerim-supply")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                {t.cta_btn} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQSection schemaId="compra-inteligente" faqs={t.faqs} />

      <InternalLinks links={[
        { to: localePath("/herramientas/calculadora-stock-muerto"), label: t.link_dead_stock, type: "tool" },
        { to: localePath("/calculadora-margen-vino"), label: t.link_margin, type: "tool" },
        { to: localePath("/producto/winerim-supply"), label: t.link_supply, type: "solution" },
        { to: localePath("/producto/winerim-core"), label: t.link_core, type: "solution" },
        { to: localePath("/decision-center/compras-reposicion"), label: lang === "es" ? "Decision Center: compras y reposición" : lang === "en" ? "Decision Center: purchasing & restocking" : lang === "it" ? "Decision Center: acquisti e rifornimento" : "Decision Center : achats et réapprovisionnement", type: "decision-center" as any },
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios" : lang === "en" ? "Plans & pricing" : lang === "it" ? "Piani e prezzi" : "Plans et tarifs", type: "solution" },
        { to: localePath("/demo"), label: lang === "es" ? "Solicitar demo gratuita" : lang === "en" ? "Request free demo" : lang === "it" ? "Richiedi demo gratuita" : "Demander démo gratuite", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default CalculadoraCompraInteligente;
