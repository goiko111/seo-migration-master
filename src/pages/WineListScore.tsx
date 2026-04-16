import { useState, useMemo, useEffect } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, CheckCircle, AlertTriangle,
  Wine, DollarSign, Layers, Users, GlassWater, TrendingUp,
  Sparkles, RotateCcw, Info
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import SummaryBox from "@/components/seo/SummaryBox";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

interface Block {
  id: string;
  title: string;
  icon: React.ElementType;
  questions: { text: string; options: { label: string; score: number }[] }[];
}

const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Wine List Score: Audita tu Carta de Vinos (0-100) | Winerim",
    seo_desc: "Evalúa tu carta de vinos con un score de 0 a 100. Diagnóstico gratuito: estructura, equilibrio, pricing, copa, rotación y potencial comercial.",
    badge: "Herramienta gratuita",
    h1: "Wine List Score",
    subtitle: (n: number) => `Responde a ${n} preguntas y obtén un score global de 0 a 100 con diagnóstico por bloques. Descubre en qué destaca tu carta y dónde pierde potencial.`,
    bread_tools: "Herramientas", bread_self: "Wine List Score",
    answered_of: (a: number, t: number) => `${a} de ${t} preguntas respondidas`,
    calc_btn: "Calcular Wine List Score",
    score_label: "Tu Wine List Score",
    score_80: "Tu carta está muy bien optimizada. Hay margen para la excelencia.",
    score_60: "Buen punto de partida con oportunidades claras de mejora.",
    score_40: "Tu carta tiene áreas importantes que necesitan atención.",
    score_low: "Tu carta necesita una revisión profunda para alcanzar su potencial.",
    diagnosis: "Resumen del diagnóstico",
    strengths: "Puntos fuertes",
    weaknesses: "Áreas de mejora prioritarias",
    cta_title: "¿Quieres un análisis profesional de tu carta?",
    cta_desc: "Envíanos tu carta y nuestro equipo te entregará un informe completo con recomendaciones concretas de mejora.",
    cta_analyze: "Analizar mi carta",
    cta_demo: "Solicitar demo",
    methodology_title: "Qué mide el Wine List Score",
    methodology_label: "Metodología",
    methodology_def: "El Wine List Score evalúa tu carta de vinos en 6 dimensiones: estructura y organización, equilibrio y diversidad, pricing y márgenes, oferta por copa, rotación y gestión, y potencial comercial. Cada bloque contribuye al score global de 0 a 100.",
    methodology_bullets: [
      "Estructura: ¿la carta es navegable, clara y tiene descripciones útiles?",
      "Equilibrio: ¿hay variedad de tipologías, regiones y perfiles?",
      "Pricing: ¿los márgenes son diferenciados y la escalera de precios progresiva?",
      "Copa: ¿la oferta por copa es suficiente y controlada?",
      "Rotación: ¿la carta se actualiza y todas las referencias se venden?",
      "Comercial: ¿hay recomendaciones, maridajes y el equipo está formado?",
    ],
    faqs: [
      { q: "¿Qué score es bueno para una carta de vinos?", a: "Por encima de 70 se considera una carta bien optimizada. Entre 50 y 70 hay oportunidades claras. Por debajo de 50, la carta necesita mejoras estructurales." },
      { q: "¿Este auditor sustituye un análisis profesional?", a: "No. Es una autoevaluación rápida que identifica áreas de mejora. Un análisis profesional examina cada referencia en detalle con datos de mercado y benchmarks del sector." },
      { q: "¿Cada cuánto debería hacer esta auditoría?", a: "Trimestralmente como mínimo, o cada vez que hagas cambios relevantes en la carta." },
      { q: "¿Los datos que introduzco se guardan?", a: "No. Todo el cálculo se realiza en tu navegador. No se envían ni almacenan datos." },
    ],
    link_analyzer: "Analizador de carta de vinos con IA",
    link_checklist: "Checklist: ¿tu carta realmente vende?",
    link_playbook: "Playbook: construir una carta rentable",
    link_software: "Software de carta de vinos",
    decides: ["En qué áreas tu carta necesita mejora inmediata", "Si la estructura, pricing y equilibrio están alineados", "Qué bloque priorizar: copa, rotación o potencial comercial"],
    avoids: ["Mantener puntos ciegos en la carta sin diagnosticar", "Invertir tiempo en áreas que ya funcionan bien", "Tomar decisiones de carta sin un marco de evaluación"],
    impact: ["Obtener una visión 360° de la salud de tu carta", "Priorizar las mejoras con mayor impacto en ventas", "Establecer una línea base para medir progreso"],
    blocks: [
      { id: "estructura", title: "Estructura y organización", questions: [
        { text: "¿Cuántas referencias tiene tu carta?", options: [{ label: "< 20", score: 5 }, { label: "20-60", score: 10 }, { label: "60-120", score: 8 }, { label: "> 120", score: 4 }] },
        { text: "¿Está organizada por categorías claras?", options: [{ label: "Sí, intuitivas", score: 10 }, { label: "Sí, técnicas", score: 6 }, { label: "No está clara", score: 2 }] },
        { text: "¿Incluye descripciones de los vinos?", options: [{ label: "Sí, sensoriales", score: 10 }, { label: "Solo denominación", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "equilibrio", title: "Equilibrio y diversidad", questions: [
        { text: "¿Hay blancos, tintos, rosados y espumosos?", options: [{ label: "Todas las tipologías", score: 10 }, { label: "Faltan 1-2", score: 6 }, { label: "Solo tintos/blancos", score: 2 }] },
        { text: "¿Hay variedad de regiones?", options: [{ label: "Nacional + internacional", score: 10 }, { label: "Solo nacional", score: 6 }, { label: "Concentrada en 1-2 regiones", score: 3 }] },
        { text: "¿Hay vinos para diferentes perfiles de cliente?", options: [{ label: "Sí, variado", score: 10 }, { label: "Más bien homogéneo", score: 4 }, { label: "No lo he pensado", score: 1 }] },
      ]},
      { id: "pricing", title: "Pricing y márgenes", questions: [
        { text: "¿Usas multiplicadores diferenciados por tramo de precio?", options: [{ label: "Sí, escalonados", score: 10 }, { label: "Multiplicador fijo", score: 4 }, { label: "No tengo sistema", score: 1 }] },
        { text: "¿Hay escalera de precios sin saltos bruscos?", options: [{ label: "Sí, progresiva", score: 10 }, { label: "Hay algunos huecos", score: 5 }, { label: "No lo he revisado", score: 2 }] },
        { text: "¿Conoces el margen de cada referencia?", options: [{ label: "Sí, por referencia", score: 10 }, { label: "Solo el global", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "copa", title: "Vino por copa", questions: [
        { text: "¿Ofreces vino por copa?", options: [{ label: "Sí, 6+ referencias", score: 10 }, { label: "Sí, 2-5", score: 6 }, { label: "No", score: 0 }] },
        { text: "¿Controlas la merma de copa?", options: [{ label: "Sí, la mido", score: 10 }, { label: "Más o menos", score: 4 }, { label: "No", score: 1 }] },
      ]},
      { id: "rotacion", title: "Rotación y gestión", questions: [
        { text: "¿Cada cuánto actualizas la carta?", options: [{ label: "Mensual o trimestral", score: 10 }, { label: "Semestral", score: 5 }, { label: "Casi nunca", score: 1 }] },
        { text: "¿Tienes referencias que llevan meses sin venderse?", options: [{ label: "No, todas rotan", score: 10 }, { label: "Algunas", score: 5 }, { label: "Varias", score: 1 }] },
      ]},
      { id: "comercial", title: "Potencial comercial", questions: [
        { text: "¿Hay recomendaciones destacadas en la carta?", options: [{ label: "Sí, visibles", score: 10 }, { label: "El equipo las sabe", score: 5 }, { label: "No", score: 1 }] },
        { text: "¿El equipo sabe recomendar vino?", options: [{ label: "Sí, formado", score: 10 }, { label: "Algunos", score: 5 }, { label: "No", score: 1 }] },
        { text: "¿Sugerís maridajes con los platos?", options: [{ label: "Sí, en carta o verbal", score: 10 }, { label: "A veces", score: 5 }, { label: "No", score: 1 }] },
      ]},
    ],
  },
  en: {
    seo_title: "Wine List Score: Audit Your Wine List (0-100) | Winerim",
    seo_desc: "Evaluate your wine list with a score from 0 to 100. Free diagnostic: structure, balance, pricing, by-the-glass, rotation and commercial potential.",
    badge: "Free tool",
    h1: "Wine List Score",
    subtitle: (n: number) => `Answer ${n} questions and get a global score from 0 to 100 with block-by-block diagnosis. Discover where your list excels and where it's losing potential.`,
    bread_tools: "Tools", bread_self: "Wine List Score",
    answered_of: (a: number, t: number) => `${a} of ${t} questions answered`,
    calc_btn: "Calculate Wine List Score",
    score_label: "Your Wine List Score",
    score_80: "Your wine list is very well optimised. There's room for excellence.",
    score_60: "Good starting point with clear improvement opportunities.",
    score_40: "Your list has important areas that need attention.",
    score_low: "Your list needs a deep review to reach its potential.",
    diagnosis: "Diagnostic summary",
    strengths: "Strengths",
    weaknesses: "Priority improvement areas",
    cta_title: "Want a professional analysis of your wine list?",
    cta_desc: "Send us your list and our team will deliver a full report with concrete improvement recommendations.",
    cta_analyze: "Analyse my list",
    cta_demo: "Request demo",
    methodology_title: "What the Wine List Score measures",
    methodology_label: "Methodology",
    methodology_def: "The Wine List Score evaluates your wine list across 6 dimensions: structure & organisation, balance & diversity, pricing & margins, by-the-glass offering, rotation & management, and commercial potential. Each block contributes to the global 0-100 score.",
    methodology_bullets: [
      "Structure: Is the list navigable, clear and with useful descriptions?",
      "Balance: Is there variety of typologies, regions and profiles?",
      "Pricing: Are margins differentiated and the price ladder progressive?",
      "Glass: Is the by-the-glass offering sufficient and controlled?",
      "Rotation: Is the list updated and do all references sell?",
      "Commercial: Are there recommendations, pairings and is the team trained?",
    ],
    faqs: [
      { q: "What is a good wine list score?", a: "Above 70 is considered a well-optimised list. Between 50 and 70 there are clear opportunities. Below 50, the list needs structural improvements." },
      { q: "Does this auditor replace a professional analysis?", a: "No. It's a quick self-assessment that identifies improvement areas. A professional analysis examines each reference in detail with market data and industry benchmarks." },
      { q: "How often should I do this audit?", a: "Quarterly at minimum, or whenever you make significant changes to the list." },
      { q: "Is my data stored?", a: "No. All calculations are done in your browser. No data is sent or stored." },
    ],
    link_analyzer: "AI wine list analyser",
    link_checklist: "Checklist: does your list really sell?",
    link_playbook: "Playbook: building a profitable wine list",
    link_software: "Wine list software",
    decides: ["Which areas of your list need immediate improvement", "Whether structure, pricing and balance are aligned", "Which block to prioritise: glass, rotation or commercial potential"],
    avoids: ["Keeping blind spots in the list undiagnosed", "Spending time on areas already working well", "Making list decisions without an evaluation framework"],
    impact: ["Get a 360° view of your list's health", "Prioritise improvements with the greatest sales impact", "Establish a baseline to measure progress"],
    blocks: [
      { id: "estructura", title: "Structure & organisation", questions: [
        { text: "How many references does your list have?", options: [{ label: "< 20", score: 5 }, { label: "20-60", score: 10 }, { label: "60-120", score: 8 }, { label: "> 120", score: 4 }] },
        { text: "Is it organised into clear categories?", options: [{ label: "Yes, intuitive", score: 10 }, { label: "Yes, technical", score: 6 }, { label: "Not clear", score: 2 }] },
        { text: "Does it include wine descriptions?", options: [{ label: "Yes, sensory", score: 10 }, { label: "Only appellation", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "equilibrio", title: "Balance & diversity", questions: [
        { text: "Are there whites, reds, rosés and sparkling?", options: [{ label: "All typologies", score: 10 }, { label: "Missing 1-2", score: 6 }, { label: "Only reds/whites", score: 2 }] },
        { text: "Is there regional variety?", options: [{ label: "National + international", score: 10 }, { label: "National only", score: 6 }, { label: "1-2 regions only", score: 3 }] },
        { text: "Are there wines for different client profiles?", options: [{ label: "Yes, varied", score: 10 }, { label: "Fairly homogeneous", score: 4 }, { label: "Haven't considered it", score: 1 }] },
      ]},
      { id: "pricing", title: "Pricing & margins", questions: [
        { text: "Do you use differentiated multipliers by price tier?", options: [{ label: "Yes, tiered", score: 10 }, { label: "Fixed multiplier", score: 4 }, { label: "No system", score: 1 }] },
        { text: "Is there a seamless price ladder?", options: [{ label: "Yes, progressive", score: 10 }, { label: "Some gaps", score: 5 }, { label: "Haven't checked", score: 2 }] },
        { text: "Do you know the margin per reference?", options: [{ label: "Yes, per reference", score: 10 }, { label: "Only overall", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "copa", title: "By-the-glass", questions: [
        { text: "Do you offer wine by the glass?", options: [{ label: "Yes, 6+ references", score: 10 }, { label: "Yes, 2-5", score: 6 }, { label: "No", score: 0 }] },
        { text: "Do you track glass wastage?", options: [{ label: "Yes, I measure it", score: 10 }, { label: "Roughly", score: 4 }, { label: "No", score: 1 }] },
      ]},
      { id: "rotacion", title: "Rotation & management", questions: [
        { text: "How often do you update the list?", options: [{ label: "Monthly or quarterly", score: 10 }, { label: "Biannually", score: 5 }, { label: "Almost never", score: 1 }] },
        { text: "Do you have references that haven't sold for months?", options: [{ label: "No, all rotate", score: 10 }, { label: "Some", score: 5 }, { label: "Several", score: 1 }] },
      ]},
      { id: "comercial", title: "Commercial potential", questions: [
        { text: "Are there featured recommendations on the list?", options: [{ label: "Yes, visible", score: 10 }, { label: "Team knows them", score: 5 }, { label: "No", score: 1 }] },
        { text: "Can the team recommend wine?", options: [{ label: "Yes, trained", score: 10 }, { label: "Some can", score: 5 }, { label: "No", score: 1 }] },
        { text: "Do you suggest food & wine pairings?", options: [{ label: "Yes, on list or verbally", score: 10 }, { label: "Sometimes", score: 5 }, { label: "No", score: 1 }] },
      ]},
    ],
  },
  it: {
    seo_title: "Wine List Score: Audita la Tua Carta dei Vini (0-100) | Winerim",
    seo_desc: "Valuta la tua carta dei vini con un punteggio da 0 a 100. Diagnosi gratuita: struttura, equilibrio, pricing, calice, rotazione e potenziale.",
    badge: "Strumento gratuito",
    h1: "Wine List Score",
    subtitle: (n: number) => `Rispondi a ${n} domande e ottieni un punteggio globale da 0 a 100 con diagnosi per blocchi. Scopri dove la tua carta eccelle e dove perde potenziale.`,
    bread_tools: "Strumenti", bread_self: "Wine List Score",
    answered_of: (a: number, t: number) => `${a} di ${t} domande risposte`,
    calc_btn: "Calcola Wine List Score",
    score_label: "Il tuo Wine List Score",
    score_80: "La tua carta è molto ben ottimizzata. C'è margine per l'eccellenza.",
    score_60: "Buon punto di partenza con chiare opportunità di miglioramento.",
    score_40: "La tua carta ha aree importanti che richiedono attenzione.",
    score_low: "La tua carta necessita di una revisione profonda per raggiungere il suo potenziale.",
    diagnosis: "Riepilogo della diagnosi",
    strengths: "Punti di forza",
    weaknesses: "Aree di miglioramento prioritarie",
    cta_title: "Vuoi un'analisi professionale della tua carta?",
    cta_desc: "Inviaci la tua carta e il nostro team ti consegnerà un report completo con raccomandazioni concrete di miglioramento.",
    cta_analyze: "Analizza la mia carta",
    cta_demo: "Richiedi demo",
    methodology_title: "Cosa misura il Wine List Score",
    methodology_label: "Metodologia",
    methodology_def: "Il Wine List Score valuta la tua carta dei vini in 6 dimensioni: struttura e organizzazione, equilibrio e diversità, pricing e margini, offerta al calice, rotazione e gestione, e potenziale commerciale. Ogni blocco contribuisce al punteggio globale da 0 a 100.",
    methodology_bullets: [
      "Struttura: la carta è navigabile, chiara e con descrizioni utili?",
      "Equilibrio: c'è varietà di tipologie, regioni e profili?",
      "Pricing: i margini sono differenziati e la scala prezzi progressiva?",
      "Calice: l'offerta al calice è sufficiente e controllata?",
      "Rotazione: la carta si aggiorna e tutte le referenze si vendono?",
      "Commerciale: ci sono raccomandazioni, abbinamenti e il team è formato?",
    ],
    faqs: [
      { q: "Che punteggio è buono per una carta dei vini?", a: "Sopra 70 è considerata una carta ben ottimizzata. Tra 50 e 70 ci sono chiare opportunità. Sotto 50, la carta necessita di miglioramenti strutturali." },
      { q: "Questo auditor sostituisce un'analisi professionale?", a: "No. È un'autovalutazione rapida che identifica aree di miglioramento. Un'analisi professionale esamina ogni referenza in dettaglio con dati di mercato e benchmark di settore." },
      { q: "Ogni quanto dovrei fare questa auditoría?", a: "Trimestralmente come minimo, o ogni volta che apporti cambiamenti significativi alla carta." },
      { q: "I dati che inserisco vengono salvati?", a: "No. Tutti i calcoli vengono effettuati nel tuo browser. Nessun dato viene inviato o memorizzato." },
    ],
    link_analyzer: "Analizzatore carta dei vini con IA",
    link_checklist: "Checklist: la tua carta vende davvero?",
    link_playbook: "Playbook: costruire una carta redditizia",
    link_software: "Software carta dei vini",
    decides: ["Quali aree della carta necessitano miglioramento immediato", "Se struttura, pricing ed equilibrio sono allineati", "Quale blocco prioritizzare: calice, rotazione o potenziale commerciale"],
    avoids: ["Mantenere punti ciechi nella carta senza diagnosi", "Investire tempo su aree che già funzionano", "Decidere sulla carta senza un framework di valutazione"],
    impact: ["Ottenere una visione 360° della salute della carta", "Prioritizzare i miglioramenti con maggiore impatto sulle vendite", "Stabilire una linea base per misurare i progressi"],
    blocks: [
      { id: "estructura", title: "Struttura e organizzazione", questions: [
        { text: "Quante referenze ha la tua carta?", options: [{ label: "< 20", score: 5 }, { label: "20-60", score: 10 }, { label: "60-120", score: 8 }, { label: "> 120", score: 4 }] },
        { text: "È organizzata per categorie chiare?", options: [{ label: "Sì, intuitive", score: 10 }, { label: "Sì, tecniche", score: 6 }, { label: "Non è chiara", score: 2 }] },
        { text: "Include descrizioni dei vini?", options: [{ label: "Sì, sensoriali", score: 10 }, { label: "Solo denominazione", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "equilibrio", title: "Equilibrio e diversità", questions: [
        { text: "Ci sono bianchi, rossi, rosati e spumanti?", options: [{ label: "Tutte le tipologie", score: 10 }, { label: "Ne mancano 1-2", score: 6 }, { label: "Solo rossi/bianchi", score: 2 }] },
        { text: "C'è varietà di regioni?", options: [{ label: "Nazionale + internazionale", score: 10 }, { label: "Solo nazionale", score: 6 }, { label: "Concentrata in 1-2 regioni", score: 3 }] },
        { text: "Ci sono vini per diversi profili di cliente?", options: [{ label: "Sì, vario", score: 10 }, { label: "Piuttosto omogeneo", score: 4 }, { label: "Non ci ho pensato", score: 1 }] },
      ]},
      { id: "pricing", title: "Pricing e margini", questions: [
        { text: "Usi moltiplicatori differenziati per fascia di prezzo?", options: [{ label: "Sì, scalati", score: 10 }, { label: "Moltiplicatore fisso", score: 4 }, { label: "Nessun sistema", score: 1 }] },
        { text: "C'è una scala prezzi senza salti bruschi?", options: [{ label: "Sì, progressiva", score: 10 }, { label: "Ci sono dei buchi", score: 5 }, { label: "Non l'ho verificato", score: 2 }] },
        { text: "Conosci il margine di ogni referenza?", options: [{ label: "Sì, per referenza", score: 10 }, { label: "Solo il globale", score: 5 }, { label: "No", score: 1 }] },
      ]},
      { id: "copa", title: "Vino al calice", questions: [
        { text: "Offri vino al calice?", options: [{ label: "Sì, 6+ referenze", score: 10 }, { label: "Sì, 2-5", score: 6 }, { label: "No", score: 0 }] },
        { text: "Controlli la merma al calice?", options: [{ label: "Sì, la misuro", score: 10 }, { label: "Più o meno", score: 4 }, { label: "No", score: 1 }] },
      ]},
      { id: "rotacion", title: "Rotazione e gestione", questions: [
        { text: "Ogni quanto aggiorni la carta?", options: [{ label: "Mensile o trimestrale", score: 10 }, { label: "Semestrale", score: 5 }, { label: "Quasi mai", score: 1 }] },
        { text: "Hai referenze che non si vendono da mesi?", options: [{ label: "No, tutte ruotano", score: 10 }, { label: "Alcune", score: 5 }, { label: "Diverse", score: 1 }] },
      ]},
      { id: "comercial", title: "Potenziale commerciale", questions: [
        { text: "Ci sono raccomandazioni evidenziate nella carta?", options: [{ label: "Sì, visibili", score: 10 }, { label: "Il team le sa", score: 5 }, { label: "No", score: 1 }] },
        { text: "Il team sa raccomandare vino?", options: [{ label: "Sì, formato", score: 10 }, { label: "Alcuni", score: 5 }, { label: "No", score: 1 }] },
        { text: "Suggerite abbinamenti con i piatti?", options: [{ label: "Sì, in carta o verbalmente", score: 10 }, { label: "A volte", score: 5 }, { label: "No", score: 1 }] },
      ]},
    ],
  },
  fr: {
    seo_title: "Wine List Score : Auditez Votre Carte des Vins (0-100) | Winerim",
    seo_desc: "Évaluez votre carte des vins avec un score de 0 à 100. Diagnostic gratuit : structure, équilibre, pricing, verre, rotation et potentiel.",
    badge: "Outil gratuit",
    h1: "Wine List Score",
    subtitle: (n: number) => `Répondez à ${n} questions et obtenez un score global de 0 à 100 avec diagnostic par blocs. Découvrez où votre carte excelle et où elle perd du potentiel.`,
    bread_tools: "Outils", bread_self: "Wine List Score",
    answered_of: (a: number, t: number) => `${a} sur ${t} questions répondues`,
    calc_btn: "Calculer le Wine List Score",
    score_label: "Votre Wine List Score",
    score_80: "Votre carte est très bien optimisée. Il reste de la marge pour l'excellence.",
    score_60: "Bon point de départ avec des opportunités claires d'amélioration.",
    score_40: "Votre carte a des domaines importants qui nécessitent de l'attention.",
    score_low: "Votre carte a besoin d'une révision approfondie pour atteindre son potentiel.",
    diagnosis: "Résumé du diagnostic",
    strengths: "Points forts",
    weaknesses: "Domaines d'amélioration prioritaires",
    cta_title: "Vous voulez une analyse professionnelle de votre carte ?",
    cta_desc: "Envoyez-nous votre carte et notre équipe vous livrera un rapport complet avec des recommandations concrètes d'amélioration.",
    cta_analyze: "Analyser ma carte",
    cta_demo: "Demander une démo",
    methodology_title: "Ce que mesure le Wine List Score",
    methodology_label: "Méthodologie",
    methodology_def: "Le Wine List Score évalue votre carte des vins sur 6 dimensions : structure & organisation, équilibre & diversité, pricing & marges, offre au verre, rotation & gestion, et potentiel commercial. Chaque bloc contribue au score global de 0 à 100.",
    methodology_bullets: [
      "Structure : la carte est-elle navigable, claire et avec des descriptions utiles ?",
      "Équilibre : y a-t-il une variété de typologies, régions et profils ?",
      "Pricing : les marges sont-elles différenciées et l'échelle de prix progressive ?",
      "Verre : l'offre au verre est-elle suffisante et contrôlée ?",
      "Rotation : la carte est-elle mise à jour et toutes les références se vendent-elles ?",
      "Commercial : y a-t-il des recommandations, des accords et l'équipe est-elle formée ?",
    ],
    faqs: [
      { q: "Quel score est bon pour une carte des vins ?", a: "Au-dessus de 70, c'est une carte bien optimisée. Entre 50 et 70, il y a des opportunités claires. En dessous de 50, la carte a besoin d'améliorations structurelles." },
      { q: "Cet auditeur remplace-t-il une analyse professionnelle ?", a: "Non. C'est une auto-évaluation rapide qui identifie les domaines d'amélioration. Une analyse professionnelle examine chaque référence en détail avec des données de marché et des benchmarks du secteur." },
      { q: "À quelle fréquence dois-je faire cet audit ?", a: "Trimestriellement au minimum, ou à chaque changement significatif de la carte." },
      { q: "Mes données sont-elles enregistrées ?", a: "Non. Tous les calculs sont effectués dans votre navigateur. Aucune donnée n'est envoyée ni stockée." },
    ],
    link_analyzer: "Analyseur de carte des vins avec IA",
    link_checklist: "Checklist : votre carte vend-elle vraiment ?",
    link_playbook: "Playbook : construire une carte rentable",
    link_software: "Logiciel carte des vins",
    decides: ["Quels domaines de votre carte nécessitent une amélioration immédiate", "Si structure, pricing et équilibre sont alignés", "Quel bloc prioriser : verre, rotation ou potentiel commercial"],
    avoids: ["Garder des angles morts dans la carte sans diagnostic", "Investir du temps sur des domaines qui fonctionnent déjà", "Décider de la carte sans cadre d'évaluation"],
    impact: ["Obtenir une vision 360° de la santé de votre carte", "Prioriser les améliorations avec le plus grand impact sur les ventes", "Établir une ligne de base pour mesurer les progrès"],
    blocks: [
      { id: "estructura", title: "Structure et organisation", questions: [
        { text: "Combien de références a votre carte ?", options: [{ label: "< 20", score: 5 }, { label: "20-60", score: 10 }, { label: "60-120", score: 8 }, { label: "> 120", score: 4 }] },
        { text: "Est-elle organisée en catégories claires ?", options: [{ label: "Oui, intuitives", score: 10 }, { label: "Oui, techniques", score: 6 }, { label: "Pas claire", score: 2 }] },
        { text: "Inclut-elle des descriptions des vins ?", options: [{ label: "Oui, sensorielles", score: 10 }, { label: "Appellation seulement", score: 5 }, { label: "Non", score: 1 }] },
      ]},
      { id: "equilibrio", title: "Équilibre et diversité", questions: [
        { text: "Y a-t-il des blancs, rouges, rosés et effervescents ?", options: [{ label: "Toutes les typologies", score: 10 }, { label: "Il en manque 1-2", score: 6 }, { label: "Rouges/blancs uniquement", score: 2 }] },
        { text: "Y a-t-il une variété de régions ?", options: [{ label: "National + international", score: 10 }, { label: "National uniquement", score: 6 }, { label: "1-2 régions seulement", score: 3 }] },
        { text: "Y a-t-il des vins pour différents profils de clients ?", options: [{ label: "Oui, varié", score: 10 }, { label: "Plutôt homogène", score: 4 }, { label: "Je n'y ai pas pensé", score: 1 }] },
      ]},
      { id: "pricing", title: "Pricing et marges", questions: [
        { text: "Utilisez-vous des multiplicateurs différenciés par tranche de prix ?", options: [{ label: "Oui, échelonnés", score: 10 }, { label: "Multiplicateur fixe", score: 4 }, { label: "Pas de système", score: 1 }] },
        { text: "Y a-t-il une échelle de prix sans sauts brusques ?", options: [{ label: "Oui, progressive", score: 10 }, { label: "Quelques trous", score: 5 }, { label: "Pas vérifié", score: 2 }] },
        { text: "Connaissez-vous la marge par référence ?", options: [{ label: "Oui, par référence", score: 10 }, { label: "Seulement global", score: 5 }, { label: "Non", score: 1 }] },
      ]},
      { id: "copa", title: "Vin au verre", questions: [
        { text: "Proposez-vous du vin au verre ?", options: [{ label: "Oui, 6+ références", score: 10 }, { label: "Oui, 2-5", score: 6 }, { label: "Non", score: 0 }] },
        { text: "Contrôlez-vous la perte au verre ?", options: [{ label: "Oui, je la mesure", score: 10 }, { label: "À peu près", score: 4 }, { label: "Non", score: 1 }] },
      ]},
      { id: "rotacion", title: "Rotation et gestion", questions: [
        { text: "À quelle fréquence mettez-vous à jour la carte ?", options: [{ label: "Mensuelle ou trimestrielle", score: 10 }, { label: "Semestrielle", score: 5 }, { label: "Presque jamais", score: 1 }] },
        { text: "Avez-vous des références invendues depuis des mois ?", options: [{ label: "Non, tout tourne", score: 10 }, { label: "Quelques-unes", score: 5 }, { label: "Plusieurs", score: 1 }] },
      ]},
      { id: "comercial", title: "Potentiel commercial", questions: [
        { text: "Y a-t-il des recommandations mises en avant sur la carte ?", options: [{ label: "Oui, visibles", score: 10 }, { label: "L'équipe les connaît", score: 5 }, { label: "Non", score: 1 }] },
        { text: "L'équipe sait-elle recommander du vin ?", options: [{ label: "Oui, formée", score: 10 }, { label: "Certains", score: 5 }, { label: "Non", score: 1 }] },
        { text: "Suggérez-vous des accords mets & vins ?", options: [{ label: "Oui, sur la carte ou verbal", score: 10 }, { label: "Parfois", score: 5 }, { label: "Non", score: 1 }] },
      ]},
    ],
  },
};

const BLOCK_ICONS = [Layers, Wine, DollarSign, GlassWater, RotateCcw, TrendingUp];

const WineListScore = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;
  const blocks: Block[] = t.blocks.map((b: any, i: number) => ({ ...b, icon: BLOCK_ICONS[i] }));

  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "wls-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `Wine List Score – ${t.bread_self}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.seo_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("wls-jsonld")?.remove(); };
  }, [t]);

  const setAnswer = (blockId: string, qIdx: number, score: number) => {
    setAnswers(prev => {
      const block = [...(prev[blockId] || [])];
      block[qIdx] = score;
      return { ...prev, [blockId]: block };
    });
  };

  const totalQuestions = blocks.reduce((s, b) => s + b.questions.length, 0);
  const answeredQuestions = Object.values(answers).reduce((s, a) => s + a.filter(v => v !== undefined).length, 0);
  const allAnswered = answeredQuestions === totalQuestions;

  const results = useMemo(() => {
    if (!allAnswered) return null;
    const blockScores = blocks.map(block => {
      const blockAnswers = answers[block.id] || [];
      const maxPossible = block.questions.length * 10;
      const actual = blockAnswers.reduce((s, v) => s + (v || 0), 0);
      const pct = Math.round((actual / maxPossible) * 100);
      return { id: block.id, title: block.title, icon: block.icon, pct };
    });
    const globalScore = Math.round(blockScores.reduce((s, b) => s + b.pct, 0) / blockScores.length);
    return { globalScore, blockScores, weakBlocks: blockScores.filter(b => b.pct < 50), strongBlocks: blockScores.filter(b => b.pct >= 75) };
  }, [answers, allAnswered, blocks]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}${localePath("/herramientas/wine-list-score")}`}
        hreflang={allLangPaths("/herramientas/wine-list-score")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.subtitle(totalQuestions)}</motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* QUESTIONNAIRE */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <div className="space-y-8">
          {blocks.map((block) => (
            <motion.div key={block.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <block.icon size={20} className="text-wine" />
                </div>
                <h2 className="font-heading text-lg font-bold">{block.title}</h2>
              </div>
              <div className="space-y-6">
                {block.questions.map((q, qi) => (
                  <div key={qi}>
                    <p className="text-sm font-medium mb-3">{q.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, oi) => {
                        const selected = (answers[block.id] || [])[qi] === opt.score;
                        return (
                          <button key={oi} onClick={() => setAnswer(block.id, qi, opt.score)}
                            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                              selected ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"
                            }`}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">{t.answered_of(answeredQuestions, totalQuestions)}</p>
          <Button onClick={() => { setCalculated(true); trackAction("tool_use", "tool", "wine-list-score"); }} disabled={!allAnswered}
            className="bg-gradient-wine text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
            {t.calc_btn}
          </Button>
        </div>
      </section>

      {/* RESULTS */}
      {calculated && results && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center p-10 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">{t.score_label}</p>
              <div className={`text-7xl font-heading font-bold ${
                results.globalScore >= 75 ? "text-green-500" : results.globalScore >= 50 ? "text-yellow-500" : "text-destructive"
              }`}>
                {results.globalScore}<span className="text-3xl text-muted-foreground">/100</span>
              </div>
              <p className="text-muted-foreground mt-3">
                {results.globalScore >= 80 ? t.score_80 : results.globalScore >= 60 ? t.score_60 : results.globalScore >= 40 ? t.score_40 : t.score_low}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.blockScores.map((block) => (
                <div key={block.id} className="rounded-xl border border-border bg-gradient-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <block.icon size={16} className="text-wine" />
                    <span className="text-sm font-medium">{block.title}</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className={`text-2xl font-heading font-bold ${
                      block.pct >= 75 ? "text-green-500" : block.pct >= 50 ? "text-yellow-500" : "text-destructive"
                    }`}>{block.pct}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${
                      block.pct >= 75 ? "bg-green-500" : block.pct >= 50 ? "bg-yellow-500" : "bg-destructive"
                    }`} style={{ width: `${block.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">{t.diagnosis}</h3>
              {results.strongBlocks.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-green-500 mb-2">{t.strengths}</p>
                  {results.strongBlocks.map(b => (
                    <div key={b.id} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <CheckCircle size={14} className="text-green-500" /> {b.title} ({b.pct}%)
                    </div>
                  ))}
                </div>
              )}
              {results.weakBlocks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-destructive mb-2">{t.weaknesses}</p>
                  {results.weakBlocks.map(b => (
                    <div key={b.id} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <AlertTriangle size={14} className="text-destructive" /> {b.title} ({b.pct}%)
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center p-8 rounded-2xl border border-wine/20 bg-wine/5">
              <Sparkles size={24} className="text-wine mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2">{t.cta_title}</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">{t.cta_desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={localePath("/analisis-carta")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.cta_analyze} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.cta_demo}
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* EDUCATIONAL */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.methodology_title}</h2>
          </ScrollReveal>
          <SummaryBox label={t.methodology_label} definition={t.methodology_def} bullets={t.methodology_bullets} />
        </div>
      </section>

      <FAQSection faqs={t.faqs} schemaId="wls" />

      <InternalLinks links={[
        { to: localePath("/wine-list-analyzer"), label: t.link_analyzer, type: "tool" },
        { to: localePath("/recursos/checklist-carta-que-vende"), label: t.link_checklist, type: "resource" },
        { to: localePath("/benchmarks-playbooks/playbook-carta-rentable"), label: t.link_playbook, type: "guide" },
        { to: localePath("/software-carta-de-vinos"), label: t.link_software, type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WineListScore;
