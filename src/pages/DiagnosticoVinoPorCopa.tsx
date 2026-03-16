import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, GlassWater, Wine, TrendingUp, AlertTriangle,
  CheckCircle, DollarSign, Layers, RotateCcw, Sparkles, Info
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

interface CopaDef {
  nombre: string;
  estilo: "espumoso" | "blanco" | "rosado" | "tinto" | "dulce";
  pvp: number;
  coste: number;
  ventasSemana: number;
}

const ESTILOS_RECOMENDADOS = ["espumoso", "blanco", "rosado", "tinto"] as const;

const i18n: Record<SupportedLang, {
  seo_title: string; seo_desc: string;
  jsonld_name: string; jsonld_desc: string;
  breadcrumb_tools: string; breadcrumb_page: string;
  badge: string; h1: string; subtitle: string;
  h2_wines: string;
  style_labels: Record<string, string>;
  lbl_name: string; lbl_style: string; lbl_pvp: string; lbl_cost: string; lbl_sales: string;
  btn_add: string; btn_diagnose: string;
  score_label: string;
  score_80: string; score_60: string; score_40: string; score_low: string;
  kpi_coverage: string; kpi_margin: string; kpi_range: string; kpi_sales: string; kpi_glasses: string;
  h3_detail: string;
  diag_coverage_ok: string; diag_coverage_warn: (missing: string) => string;
  diag_range_ok: (min: string, max: string) => string; diag_range_warn: (min: string, max: string) => string;
  diag_margin_ok: (m: string) => string; diag_margin_warn: (m: string) => string; diag_margin_bad: (m: string) => string;
  diag_low_margin: (n: number, names: string) => string;
  diag_no_sales: (n: number, names: string) => string;
  diag_few: string; diag_many: string;
  cta_title: string; cta_desc: string; cta_analyze: string; cta_demo: string;
  edu_title: string;
  summary_label: string; summary_def: string; summary_bullets: string[];
  blocks: { title: string; points: string[] }[];
  faqs: { q: string; a: string }[];
  links: { to: string; label: string; type: "tool" | "resource" | "guide" }[];
  decides: string[]; avoids: string[]; impact: string[];
}> = {
  es: {
    seo_title: "Diagnóstico de Vino por Copa para Restaurantes | Winerim",
    seo_desc: "Evalúa gratis si tu oferta de vino por copa está bien planteada: cobertura de estilos, equilibrio de precios, márgenes y rotación.",
    jsonld_name: "Diagnóstico de Vino por Copa", jsonld_desc: "Evalúa si tu oferta de vino por copa está equilibrada en estilos, precios y rentabilidad.",
    breadcrumb_tools: "Herramientas", breadcrumb_page: "Diagnóstico vino por copa",
    badge: "Herramienta gratuita", h1: "Diagnóstico de vino por copa",
    subtitle: "Evalúa si tu oferta por copa está equilibrada en estilos, precios y rentabilidad. Recibe feedback accionable para mejorarla.",
    h2_wines: "Tus vinos por copa",
    style_labels: { espumoso: "Espumoso", blanco: "Blanco", rosado: "Rosado", tinto: "Tinto", dulce: "Dulce/Generoso" },
    lbl_name: "Nombre", lbl_style: "Estilo", lbl_pvp: "PVP copa (€)", lbl_cost: "Coste copa (€)", lbl_sales: "Ventas/sem",
    btn_add: "+ Añadir referencia", btn_diagnose: "Diagnosticar oferta",
    score_label: "Puntuación de tu oferta por copa",
    score_80: "Tu oferta por copa está bien planteada.", score_60: "Hay oportunidades claras de mejora.",
    score_40: "Tu oferta necesita ajustes importantes.", score_low: "Tu programa de copa requiere una revisión profunda.",
    kpi_coverage: "Cobertura estilos", kpi_margin: "Margen medio", kpi_range: "Rango precios", kpi_sales: "Ventas/semana", kpi_glasses: "copas",
    h3_detail: "Diagnóstico detallado",
    diag_coverage_ok: "Buena cobertura de estilos. Cubres las tipologías principales.",
    diag_coverage_warn: (m) => `Faltan estilos: ${m}. Esto limita las opciones del cliente.`,
    diag_range_ok: (min, max) => `Rango de precios adecuado: ${min}€ – ${max}€. Hay escalera de precios.`,
    diag_range_warn: (min, max) => `Rango de precios estrecho (${min}€ – ${max}€). Amplía para cubrir más perfiles de cliente.`,
    diag_margin_ok: (m) => `Margen medio del ${m}%. Está en buen rango para copa.`,
    diag_margin_warn: (m) => `Margen medio del ${m}%. Podrías mejorar el pricing de las referencias de mayor coste.`,
    diag_margin_bad: (m) => `Margen medio del ${m}%. Demasiado bajo. Revisa el pricing o el coste de compra.`,
    diag_low_margin: (n, names) => `${n} referencia(s) con margen < 60%: ${names}.`,
    diag_no_sales: (n, names) => `${n} referencia(s) sin ventas esta semana: ${names}. Valora rotar.`,
    diag_few: "Oferta limitada. Con menos de 4 copas, el cliente tiene pocas opciones para explorar.",
    diag_many: "Más de 12 copas puede generar complejidad operativa y merma. Evalúa si todas rotan.",
    cta_title: "¿Quieres automatizar la gestión de tu oferta por copa?",
    cta_desc: "Winerim monitoriza automáticamente el rendimiento de cada copa, sugiere rotaciones y optimiza el pricing en tiempo real.",
    cta_analyze: "Analizar mi carta", cta_demo: "Solicitar demo",
    edu_title: "Cómo interpretar el diagnóstico",
    summary_label: "En resumen",
    summary_def: "El diagnóstico de vino por copa evalúa cuatro dimensiones clave: cobertura de estilos, equilibrio de precios, margen operativo y rotación.",
    summary_bullets: [
      "Cobertura de estilos: al menos espumoso, blanco, rosado y tinto",
      "Rango de precios: la copa más cara debería doblar en precio a la más barata",
      "Margen por copa: objetivo mínimo del 65% sobre PVP",
      "Rotación: todas las copas deberían venderse al menos una vez por semana",
    ],
    blocks: [
      { title: "Cuándo usarlo", points: ["Al lanzar o renovar tu programa de copa", "Cuando la merma supere el 15%", "Si no sabes si tu selección es equilibrada", "Antes de reunirte con el distribuidor"] },
      { title: "Errores comunes", points: ["Ofrecer solo tintos por copa", "Precio único para todas las copas", "No rotar referencias en semanas", "Ignorar la merma como variable de coste"] },
    ],
    faqs: [
      { q: "¿Cuántos vinos por copa debería ofrecer?", a: "Entre 6 y 12 es el rango recomendado para la mayoría de restaurantes." },
      { q: "¿Qué margen debería tener un vino por copa?", a: "El objetivo es un margen bruto superior al 65% sobre el PVP." },
      { q: "¿Con qué frecuencia debería rotar las copas?", a: "Idealmente, rota al menos 2-3 referencias cada 2-4 semanas." },
      { q: "¿Es necesario incluir espumoso por copa?", a: "Muy recomendable. El espumoso por copa tiene alta demanda y buen margen." },
    ],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa", type: "tool" },
      { to: "/recursos/plantilla-estrategia-vinos-por-copa", label: "Plantilla de estrategia por copa", type: "resource" },
      { to: "/benchmarks-playbooks/benchmark-estrategia-por-copa", label: "Benchmark: estrategia por copa", type: "guide" },
      { to: "/benchmarks-playbooks/playbook-optimizar-vino-copa", label: "Playbook: optimizar vino por copa", type: "guide" },
    ],
    decides: ["Si tu programa de copa es equilibrado en estilos y precios", "Qué vinos por copa tienen mejor margen real", "Si la rotación justifica mantener cada referencia"],
    avoids: ["Ofrecer solo tintos por copa sin diversidad", "Precio único para todos los vinos por copa", "Ignorar la merma como variable de coste"],
    impact: ["Optimizar la rentabilidad del programa de copa", "Equilibrar la oferta para captar más mesas", "Reducir la merma con rotación controlada"],
  },
  en: {
    seo_title: "By-the-Glass Wine Diagnostic for Restaurants | Winerim",
    seo_desc: "Free tool to evaluate your by-the-glass programme: style coverage, price balance, margins and rotation. Actionable feedback.",
    jsonld_name: "By-the-Glass Wine Diagnostic", jsonld_desc: "Evaluate whether your by-the-glass offer is balanced in styles, prices and profitability.",
    breadcrumb_tools: "Tools", breadcrumb_page: "By-the-glass diagnostic",
    badge: "Free tool", h1: "By-the-glass wine diagnostic",
    subtitle: "Evaluate whether your by-the-glass programme is balanced in styles, prices and profitability. Get actionable feedback to improve it.",
    h2_wines: "Your by-the-glass wines",
    style_labels: { espumoso: "Sparkling", blanco: "White", rosado: "Rosé", tinto: "Red", dulce: "Sweet/Fortified" },
    lbl_name: "Name", lbl_style: "Style", lbl_pvp: "Glass price (€)", lbl_cost: "Glass cost (€)", lbl_sales: "Sales/wk",
    btn_add: "+ Add reference", btn_diagnose: "Run diagnostic",
    score_label: "Your by-the-glass programme score",
    score_80: "Your by-the-glass offer is well designed.", score_60: "There are clear improvement opportunities.",
    score_40: "Your offer needs significant adjustments.", score_low: "Your glass programme requires a thorough review.",
    kpi_coverage: "Style coverage", kpi_margin: "Avg margin", kpi_range: "Price range", kpi_sales: "Sales/week", kpi_glasses: "glasses",
    h3_detail: "Detailed diagnostic",
    diag_coverage_ok: "Good style coverage. You cover the main categories.",
    diag_coverage_warn: (m) => `Missing styles: ${m}. This limits guest choices.`,
    diag_range_ok: (min, max) => `Adequate price range: €${min} – €${max}. Good price ladder.`,
    diag_range_warn: (min, max) => `Narrow price range (€${min} – €${max}). Expand to cater to more guest profiles.`,
    diag_margin_ok: (m) => `Average margin of ${m}%. Good range for by-the-glass.`,
    diag_margin_warn: (m) => `Average margin of ${m}%. Consider improving pricing on higher-cost references.`,
    diag_margin_bad: (m) => `Average margin of ${m}%. Too low. Review pricing or purchase cost.`,
    diag_low_margin: (n, names) => `${n} reference(s) with margin < 60%: ${names}.`,
    diag_no_sales: (n, names) => `${n} reference(s) with zero sales this week: ${names}. Consider rotating.`,
    diag_few: "Limited offer. Fewer than 4 glasses give guests too few options.",
    diag_many: "More than 12 glasses can create operational complexity and waste. Check if all rotate.",
    cta_title: "Want to automate your by-the-glass management?",
    cta_desc: "Winerim automatically monitors each glass's performance, suggests rotations and optimises pricing in real time.",
    cta_analyze: "Analyse my wine list", cta_demo: "Request demo",
    edu_title: "How to interpret the diagnostic",
    summary_label: "In summary",
    summary_def: "The by-the-glass diagnostic evaluates four key dimensions: style coverage, price balance, operating margin and rotation.",
    summary_bullets: [
      "Style coverage: at least sparkling, white, rosé and red",
      "Price range: the most expensive glass should be at least double the cheapest",
      "Margin per glass: minimum target of 65% on selling price",
      "Rotation: every glass should sell at least once a week",
    ],
    blocks: [
      { title: "When to use it", points: ["When launching or refreshing your glass programme", "When waste exceeds 15%", "If you're unsure whether your selection is balanced", "Before meeting your distributor"] },
      { title: "Common mistakes", points: ["Offering only reds by the glass", "Same price for every glass", "Not rotating references for weeks", "Ignoring waste as a cost variable"] },
    ],
    faqs: [
      { q: "How many wines by the glass should I offer?", a: "Between 6 and 12 is the recommended range for most restaurants." },
      { q: "What margin should a by-the-glass wine have?", a: "The target is a gross margin above 65% on the selling price." },
      { q: "How often should I rotate glasses?", a: "Ideally, rotate at least 2-3 references every 2-4 weeks." },
      { q: "Should I include sparkling by the glass?", a: "Highly recommended. Sparkling by the glass has high demand and good margins." },
    ],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "By-the-glass price calculator", type: "tool" },
      { to: "/recursos/plantilla-estrategia-vinos-por-copa", label: "Glass programme strategy template", type: "resource" },
      { to: "/benchmarks-playbooks/benchmark-estrategia-por-copa", label: "Benchmark: glass strategy", type: "guide" },
      { to: "/benchmarks-playbooks/playbook-optimizar-vino-copa", label: "Playbook: optimise by-the-glass", type: "guide" },
    ],
    decides: ["Whether your glass programme is balanced in styles and prices", "Which by-the-glass wines have the best real margin", "Whether rotation justifies keeping each reference"],
    avoids: ["Offering only reds by the glass without diversity", "Same price for all by-the-glass wines", "Ignoring waste as a cost variable"],
    impact: ["Optimise glass programme profitability", "Balance the offer to capture more tables", "Reduce waste with controlled rotation"],
  },
    seo_title: "Diagnostica Vino al Calice per Ristoranti | Winerim",
    seo_desc: "Valuta gratis se la tua offerta al calice è ben impostata: copertura stili, equilibrio prezzi, margini e rotazione.",
    jsonld_name: "Diagnostica Vino al Calice", jsonld_desc: "Valuta se la tua offerta al calice è equilibrata per stili, prezzi e redditività.",
    breadcrumb_tools: "Strumenti", breadcrumb_page: "Diagnostica vino al calice",
    badge: "Strumento gratuito", h1: "Diagnostica vino al calice",
    subtitle: "Valuta se la tua offerta al calice è equilibrata per stili, prezzi e redditività. Ricevi feedback azionabile.",
    h2_wines: "I tuoi vini al calice",
    style_labels: { espumoso: "Spumante", blanco: "Bianco", rosado: "Rosato", tinto: "Rosso", dulce: "Dolce/Liquoroso" },
    lbl_name: "Nome", lbl_style: "Stile", lbl_pvp: "Prezzo calice (€)", lbl_cost: "Costo calice (€)", lbl_sales: "Vendite/sett",
    btn_add: "+ Aggiungi referenza", btn_diagnose: "Diagnostica offerta",
    score_label: "Punteggio della tua offerta al calice",
    score_80: "La tua offerta al calice è ben impostata.", score_60: "Ci sono chiare opportunità di miglioramento.",
    score_40: "La tua offerta necessita di aggiustamenti importanti.", score_low: "Il tuo programma al calice richiede una revisione profonda.",
    kpi_coverage: "Copertura stili", kpi_margin: "Margine medio", kpi_range: "Range prezzi", kpi_sales: "Vendite/settimana", kpi_glasses: "calici",
    h3_detail: "Diagnostica dettagliata",
    diag_coverage_ok: "Buona copertura di stili. Copri le tipologie principali.",
    diag_coverage_warn: (m) => `Stili mancanti: ${m}. Questo limita le opzioni del cliente.`,
    diag_range_ok: (min, max) => `Range prezzi adeguato: ${min}€ – ${max}€. Buona scala prezzi.`,
    diag_range_warn: (min, max) => `Range prezzi stretto (${min}€ – ${max}€). Amplia per coprire più profili.`,
    diag_margin_ok: (m) => `Margine medio del ${m}%. Buon range per il calice.`,
    diag_margin_warn: (m) => `Margine medio del ${m}%. Migliora il pricing delle referenze più costose.`,
    diag_margin_bad: (m) => `Margine medio del ${m}%. Troppo basso. Rivedi pricing o costi di acquisto.`,
    diag_low_margin: (n, names) => `${n} referenza/e con margine < 60%: ${names}.`,
    diag_no_sales: (n, names) => `${n} referenza/e senza vendite questa settimana: ${names}. Valuta la rotazione.`,
    diag_few: "Offerta limitata. Con meno di 4 calici il cliente ha poche opzioni.",
    diag_many: "Più di 12 calici può generare complessità operativa e spreco. Verifica che tutti ruotino.",
    cta_title: "Vuoi automatizzare la gestione della tua offerta al calice?",
    cta_desc: "Winerim monitora automaticamente le performance di ogni calice, suggerisce rotazioni e ottimizza il pricing in tempo reale.",
    cta_analyze: "Analizza la mia carta", cta_demo: "Richiedi demo",
    edu_title: "Come interpretare la diagnostica",
    summary_label: "In sintesi",
    summary_def: "La diagnostica al calice valuta quattro dimensioni chiave: copertura stili, equilibrio prezzi, margine operativo e rotazione.",
    summary_bullets: [
      "Copertura stili: almeno spumante, bianco, rosato e rosso",
      "Range prezzi: il calice più caro dovrebbe costare almeno il doppio del più economico",
      "Margine per calice: obiettivo minimo del 65% sul prezzo di vendita",
      "Rotazione: ogni calice dovrebbe vendersi almeno una volta a settimana",
    ],
    blocks: [
      { title: "Quando usarlo", points: ["Al lancio o rinnovo del programma al calice", "Quando lo spreco supera il 15%", "Se non sai se la selezione è equilibrata", "Prima dell'incontro con il distributore"] },
      { title: "Errori comuni", points: ["Offrire solo rossi al calice", "Prezzo unico per tutti i calici", "Non ruotare le referenze per settimane", "Ignorare lo spreco come variabile di costo"] },
    ],
    faqs: [
      { q: "Quanti vini al calice dovrei offrire?", a: "Tra 6 e 12 è il range consigliato per la maggior parte dei ristoranti." },
      { q: "Che margine dovrebbe avere un vino al calice?", a: "L'obiettivo è un margine lordo superiore al 65% sul prezzo di vendita." },
      { q: "Con che frequenza dovrei ruotare i calici?", a: "Idealmente, ruota almeno 2-3 referenze ogni 2-4 settimane." },
      { q: "È necessario includere spumante al calice?", a: "Altamente consigliato. Lo spumante al calice ha alta domanda e buoni margini." },
    ],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calcolatrice prezzo al calice", type: "tool" },
      { to: "/recursos/plantilla-estrategia-vinos-por-copa", label: "Template strategia al calice", type: "resource" },
      { to: "/benchmarks-playbooks/benchmark-estrategia-por-copa", label: "Benchmark: strategia al calice", type: "guide" },
      { to: "/benchmarks-playbooks/playbook-optimizar-vino-copa", label: "Playbook: ottimizzare il calice", type: "guide" },
    ],
    decides: ["Se il programma al calice è equilibrato in stili e prezzi", "Quali calici hanno il miglior margine reale", "Se la rotazione giustifica mantenere ogni referenza"],
    avoids: ["Offrire solo rossi al calice senza diversità", "Prezzo unico per tutti i calici", "Ignorare lo scarto come variabile di costo"],
    impact: ["Ottimizzare la redditività del programma al calice", "Equilibrare l'offerta per catturare più tavoli", "Ridurre lo scarto con rotazione controllata"],
  },
  fr: {
    seo_title: "Diagnostic Vin au Verre pour Restaurants | Winerim",
    seo_desc: "Évaluez gratuitement votre offre au verre : couverture des styles, équilibre des prix, marges et rotation. Feedback actionnable.",
    jsonld_name: "Diagnostic Vin au Verre", jsonld_desc: "Évaluez si votre offre au verre est équilibrée en styles, prix et rentabilité.",
    breadcrumb_tools: "Outils", breadcrumb_page: "Diagnostic vin au verre",
    badge: "Outil gratuit", h1: "Diagnostic vin au verre",
    subtitle: "Évaluez si votre offre au verre est équilibrée en styles, prix et rentabilité. Recevez un feedback actionnable.",
    h2_wines: "Vos vins au verre",
    style_labels: { espumoso: "Effervescent", blanco: "Blanc", rosado: "Rosé", tinto: "Rouge", dulce: "Moelleux/Muté" },
    lbl_name: "Nom", lbl_style: "Style", lbl_pvp: "Prix verre (€)", lbl_cost: "Coût verre (€)", lbl_sales: "Ventes/sem",
    btn_add: "+ Ajouter référence", btn_diagnose: "Lancer le diagnostic",
    score_label: "Score de votre offre au verre",
    score_80: "Votre offre au verre est bien conçue.", score_60: "Il y a des opportunités claires d'amélioration.",
    score_40: "Votre offre nécessite des ajustements importants.", score_low: "Votre programme au verre nécessite une révision approfondie.",
    kpi_coverage: "Couverture styles", kpi_margin: "Marge moyenne", kpi_range: "Fourchette prix", kpi_sales: "Ventes/semaine", kpi_glasses: "verres",
    h3_detail: "Diagnostic détaillé",
    diag_coverage_ok: "Bonne couverture des styles. Vous couvrez les typologies principales.",
    diag_coverage_warn: (m) => `Styles manquants : ${m}. Cela limite les options du client.`,
    diag_range_ok: (min, max) => `Fourchette de prix adaptée : ${min}€ – ${max}€. Bonne échelle de prix.`,
    diag_range_warn: (min, max) => `Fourchette de prix étroite (${min}€ – ${max}€). Élargissez pour toucher plus de profils.`,
    diag_margin_ok: (m) => `Marge moyenne de ${m}%. Bon niveau pour le verre.`,
    diag_margin_warn: (m) => `Marge moyenne de ${m}%. Améliorez le pricing des références les plus coûteuses.`,
    diag_margin_bad: (m) => `Marge moyenne de ${m}%. Trop faible. Revoyez le pricing ou le coût d'achat.`,
    diag_low_margin: (n, names) => `${n} référence(s) avec marge < 60% : ${names}.`,
    diag_no_sales: (n, names) => `${n} référence(s) sans ventes cette semaine : ${names}. Envisagez de tourner.`,
    diag_few: "Offre limitée. Moins de 4 verres laisse trop peu d'options au client.",
    diag_many: "Plus de 12 verres peut créer une complexité opérationnelle et du gaspillage. Vérifiez que tous tournent.",
    cta_title: "Vous souhaitez automatiser la gestion de votre offre au verre ?",
    cta_desc: "Winerim surveille automatiquement la performance de chaque verre, suggère des rotations et optimise le pricing en temps réel.",
    cta_analyze: "Analyser ma carte", cta_demo: "Demander une démo",
    edu_title: "Comment interpréter le diagnostic",
    summary_label: "En résumé",
    summary_def: "Le diagnostic au verre évalue quatre dimensions clés : couverture des styles, équilibre des prix, marge opérationnelle et rotation.",
    summary_bullets: [
      "Couverture des styles : au moins effervescent, blanc, rosé et rouge",
      "Fourchette de prix : le verre le plus cher devrait coûter au moins le double du moins cher",
      "Marge par verre : objectif minimum de 65% sur le prix de vente",
      "Rotation : chaque verre devrait se vendre au moins une fois par semaine",
    ],
    blocks: [
      { title: "Quand l'utiliser", points: ["Au lancement ou au renouvellement de votre programme au verre", "Quand le gaspillage dépasse 15%", "Si vous ne savez pas si votre sélection est équilibrée", "Avant de rencontrer votre distributeur"] },
      { title: "Erreurs courantes", points: ["Ne proposer que des rouges au verre", "Prix unique pour tous les verres", "Ne pas tourner les références pendant des semaines", "Ignorer le gaspillage comme variable de coût"] },
    ],
    faqs: [
      { q: "Combien de vins au verre devrais-je proposer ?", a: "Entre 6 et 12 est la fourchette recommandée pour la plupart des restaurants." },
      { q: "Quelle marge pour un vin au verre ?", a: "L'objectif est une marge brute supérieure à 65% sur le prix de vente." },
      { q: "À quelle fréquence tourner les verres ?", a: "Idéalement, tournez au moins 2-3 références toutes les 2-4 semaines." },
      { q: "Faut-il inclure un effervescent au verre ?", a: "Fortement recommandé. L'effervescent au verre a une forte demande et de bonnes marges." },
    ],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculateur de prix au verre", type: "tool" },
      { to: "/recursos/plantilla-estrategia-vinos-por-copa", label: "Template stratégie au verre", type: "resource" },
      { to: "/benchmarks-playbooks/benchmark-estrategia-por-copa", label: "Benchmark : stratégie au verre", type: "guide" },
      { to: "/benchmarks-playbooks/playbook-optimizar-vino-copa", label: "Playbook : optimiser le verre", type: "guide" },
    ],
    decides: ["Si votre programme au verre est équilibré en styles et prix", "Quels vins au verre ont la meilleure marge réelle", "Si la rotation justifie de garder chaque référence"],
    avoids: ["Ne proposer que des rouges au verre sans diversité", "Prix unique pour tous les vins au verre", "Ignorer la perte comme variable de coût"],
    impact: ["Optimiser la rentabilité du programme au verre", "Équilibrer l'offre pour capter plus de tables", "Réduire la perte avec une rotation contrôlée"],
  },
};

const emptyWine = (): CopaDef => ({ nombre: "", estilo: "blanco", pvp: 0, coste: 0, ventasSemana: 0 });

const DiagnosticoVinoPorCopa = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const [copas, setCopas] = useState<CopaDef[]>([emptyWine(), emptyWine(), emptyWine(), emptyWine()]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "diag-copa-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: t.jsonld_name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.jsonld_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("diag-copa-jsonld")?.remove(); };
  }, [t]);

  const addCopa = () => setCopas(prev => [...prev, emptyWine()]);
  const removeCopa = (i: number) => setCopas(prev => prev.filter((_, idx) => idx !== i));
  const updateCopa = (i: number, field: keyof CopaDef, value: string | number) => {
    setCopas(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  const validCopas = copas.filter(c => c.nombre.trim() && c.pvp > 0 && c.coste > 0);

  const analysis = useMemo(() => {
    if (validCopas.length < 2) return null;

    const estilosPresentes = new Set(validCopas.map(c => c.estilo));
    const estilosFaltantes = ESTILOS_RECOMENDADOS.filter(e => !estilosPresentes.has(e));
    const cobertura = Math.round((estilosPresentes.size / ESTILOS_RECOMENDADOS.length) * 100);

    const precios = validCopas.map(c => c.pvp).sort((a, b) => a - b);
    const precioMin = precios[0];
    const precioMax = precios[precios.length - 1];
    const rangoOk = precioMax >= precioMin * 2;

    const margenes = validCopas.map(c => ({ nombre: c.nombre, margen: c.pvp > 0 ? ((c.pvp - c.coste) / c.pvp) * 100 : 0, margenEur: c.pvp - c.coste }));
    const margenMedio = margenes.reduce((s, m) => s + m.margen, 0) / margenes.length;
    const bajoMargen = margenes.filter(m => m.margen < 60);

    const ventasTotales = validCopas.reduce((s, c) => s + c.ventasSemana, 0);
    const sinVentas = validCopas.filter(c => c.ventasSemana === 0);

    let score = 50;
    score += cobertura >= 75 ? 15 : cobertura >= 50 ? 8 : 0;
    score += rangoOk ? 10 : 0;
    score += margenMedio >= 65 ? 15 : margenMedio >= 55 ? 8 : -5;
    score += sinVentas.length === 0 ? 10 : -5;
    score += validCopas.length >= 6 ? 5 : validCopas.length >= 4 ? 2 : -5;
    score = Math.max(0, Math.min(100, score));

    const diagnosticos: { icon: React.ElementType; tipo: "ok" | "warn" | "error"; texto: string }[] = [];

    if (cobertura >= 75) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: t.diag_coverage_ok });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: t.diag_coverage_warn(estilosFaltantes.map(e => t.style_labels[e]).join(", ")) });

    if (rangoOk) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: t.diag_range_ok(precioMin.toFixed(0), precioMax.toFixed(0)) });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: t.diag_range_warn(precioMin.toFixed(0), precioMax.toFixed(0)) });

    if (margenMedio >= 65) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: t.diag_margin_ok(margenMedio.toFixed(0)) });
    else if (margenMedio >= 55) diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: t.diag_margin_warn(margenMedio.toFixed(0)) });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "error", texto: t.diag_margin_bad(margenMedio.toFixed(0)) });

    if (bajoMargen.length > 0) diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: t.diag_low_margin(bajoMargen.length, bajoMargen.map(m => m.nombre).join(", ")) });

    if (sinVentas.length > 0) diagnosticos.push({ icon: AlertTriangle, tipo: "error", texto: t.diag_no_sales(sinVentas.length, sinVentas.map(c => c.nombre).join(", ")) });

    if (validCopas.length < 4) diagnosticos.push({ icon: Info, tipo: "warn", texto: t.diag_few });
    else if (validCopas.length > 12) diagnosticos.push({ icon: Info, tipo: "warn", texto: t.diag_many });

    return { score, cobertura, estilosFaltantes, precioMin, precioMax, margenMedio, bajoMargen, sinVentas, ventasTotales, diagnosticos, validCount: validCopas.length };
  }, [validCopas, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}/herramientas/diagnostico-vino-por-copa`} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadcrumb_tools, href: localePath("/herramientas") }, { label: t.breadcrumb_page }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <GlassWater size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.subtitle}</motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Wine size={20} className="text-wine" /> {t.h2_wines}
          </h2>

          <div className="space-y-4 mb-6">
            {copas.map((copa, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-end p-4 rounded-xl border border-border bg-background">
                <div className="col-span-12 sm:col-span-3">
                  <Label className="text-xs mb-1 block">{t.lbl_name}</Label>
                  <Input placeholder="Ej: Albariño Pazo..." value={copa.nombre}
                    onChange={e => updateCopa(i, "nombre", e.target.value)} className="bg-secondary/50" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.lbl_style}</Label>
                  <select value={copa.estilo} onChange={e => updateCopa(i, "estilo", e.target.value as CopaDef["estilo"])}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm">
                    {Object.entries(t.style_labels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.lbl_pvp}</Label>
                  <Input type="number" min={0} step={0.5} value={copa.pvp || ""}
                    onChange={e => updateCopa(i, "pvp", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.lbl_cost}</Label>
                  <Input type="number" min={0} step={0.1} value={copa.coste || ""}
                    onChange={e => updateCopa(i, "coste", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">{t.lbl_sales}</Label>
                  <Input type="number" min={0} value={copa.ventasSemana || ""}
                    onChange={e => updateCopa(i, "ventasSemana", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  {copas.length > 2 && (
                    <button onClick={() => removeCopa(i)} className="text-xs text-muted-foreground hover:text-destructive transition-colors p-2">✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={addCopa} className="text-sm">{t.btn_add}</Button>
            <Button onClick={() => setCalculated(true)} disabled={validCopas.length < 2}
              className="bg-gradient-wine text-primary-foreground text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              {t.btn_diagnose}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && analysis && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center p-8 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-2">{t.score_label}</p>
              <div className={`text-6xl font-heading font-bold ${analysis.score >= 70 ? "text-green-500" : analysis.score >= 50 ? "text-yellow-500" : "text-destructive"}`}>
                {analysis.score}<span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {analysis.score >= 80 ? t.score_80 : analysis.score >= 60 ? t.score_60 : analysis.score >= 40 ? t.score_40 : t.score_low}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: t.kpi_coverage, value: `${analysis.cobertura}%`, icon: Layers },
                { label: t.kpi_margin, value: `${analysis.margenMedio.toFixed(0)}%`, icon: DollarSign },
                { label: t.kpi_range, value: `${analysis.precioMin.toFixed(0)}–${analysis.precioMax.toFixed(0)}€`, icon: TrendingUp },
                { label: t.kpi_sales, value: `${analysis.ventasTotales} ${t.kpi_glasses}`, icon: RotateCcw },
              ].map((kpi, i) => (
                <div key={i} className="rounded-xl border border-border bg-gradient-card p-5 text-center">
                  <kpi.icon size={20} className="text-wine mx-auto mb-2" />
                  <p className="font-heading text-xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">{t.h3_detail}</h3>
              <div className="space-y-3">
                {analysis.diagnosticos.map((d, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                    d.tipo === "ok" ? "border-green-500/20 bg-green-500/5" :
                    d.tipo === "warn" ? "border-yellow-500/20 bg-yellow-500/5" :
                    "border-destructive/20 bg-destructive/5"
                  }`}>
                    <d.icon size={16} className={`shrink-0 mt-0.5 ${
                      d.tipo === "ok" ? "text-green-500" : d.tipo === "warn" ? "text-yellow-500" : "text-destructive"
                    }`} />
                    <p className="text-sm leading-relaxed">{d.texto}</p>
                  </div>
                ))}
              </div>
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.edu_title}</h2>
          </ScrollReveal>

          <SummaryBox label={t.summary_label} definition={t.summary_def} bullets={t.summary_bullets} />

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {t.blocks.map((block, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <h3 className="font-heading font-bold mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={t.faqs} schemaId="diag-copa" />
      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default DiagnosticoVinoPorCopa;
