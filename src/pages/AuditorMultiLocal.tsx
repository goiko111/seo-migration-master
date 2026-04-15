import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Wine, DollarSign, BarChart3,
  AlertTriangle, CheckCircle, Sparkles, Info, Plus, Trash2,
  Layers, Target
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

interface LocalData {
  nombre: string;
  referencias: number;
  ticketMedioVino: number;
  ratioVino: number;
  ratioCopa: number;
  precioMedioBottle: number;
  precioMedioCopa: number;
}

const emptyLocal = (): LocalData => ({
  nombre: "",
  referencias: 30,
  ticketMedioVino: 12,
  ratioVino: 35,
  ratioCopa: 30,
  precioMedioBottle: 22,
  precioMedioCopa: 6,
});

const i18n: I18nMap<{
  seo_title: string; seo_desc: string;
  jsonld_name: string; jsonld_desc: string;
  bc_tools: string; bc_page: string; bc_home: string;
  badge: string; h1: string; subtitle: string;
  summary_label: string; summary_def: string; summary_bullets: string[];
  h2_data: string;
  lbl_refs: string; lbl_ticket: string; lbl_wine_ratio: string; lbl_glass_ratio: string; lbl_bottle_price: string; lbl_glass_price: string;
  btn_add: string; btn_audit: string;
  score_label: string;
  score_high: string; score_mid: string; score_low: string;
  dim_assortment: string; dim_pricing_bottle: string; dim_pricing_glass: string; dim_wine_ratio: string; dim_glass_ratio: string; dim_avg_ticket: string;
  th_local: string; th_refs: string; th_ticket: string; th_wine: string; th_glass: string; th_pvp_bottle: string; th_pvp_glass: string;
  group_avg: string;
  alerts_title: string;
  best_ticket: string; worst_ticket: string;
  interpret_title: string; interpret_p1: string; interpret_p2: string;
  cta_demo: string; cta_solutions: string;
  edu_title: string;
  edu_blocks: { icon: typeof Layers; title: string; desc: string }[];
  when_title: string; when_items: string[];
  faqs: { q: string; a: string }[];
  links: { to: string; label: string; type: "solution" | "resource" | "guide" | "tool" }[];
  final_cta_title: string; final_cta_desc: string; final_cta_btn: string;
  // Dynamic issue strings
  issue_refs_low: (name: string, val: number, avg: number) => string;
  issue_refs_high: (name: string, val: number, avg: number) => string;
  issue_price_low: (name: string, val: number, avg: number) => string;
  issue_price_high: (name: string, val: number, avg: number) => string;
  issue_ratio_low: (name: string, val: number, avg: number) => string;
  issue_glass_low: (name: string, val: number) => string;
  issue_glass_price_low: (name: string, val: number, avg: string) => string;
  decides: string[]; avoids: string[]; impact: string[];
}> = {
  es: {
    seo_title: "Auditor de Carta de Vinos para Grupos Multi-Local | Winerim",
    seo_desc: "Compara la carta de vinos de tus locales: surtido, pricing, copa y ticket medio. Detecta inconsistencias y oportunidades de mejora.",
    jsonld_name: "Auditor de Carta de Vinos para Grupos Multi-Local",
    jsonld_desc: "Compara la carta de vinos de múltiples locales: surtido, pricing, ratio de vino, copa y ticket medio.",
    bc_tools: "Herramientas", bc_page: "Auditor multi-local", bc_home: "Inicio",
    badge: "Herramienta para grupos", h1: "Auditor de carta de vinos para grupos multi-local",
    subtitle: "Compara la gestión del vino en tus locales. Detecta inconsistencias de pricing, desequilibrios de surtido y oportunidades de mejora en tu grupo de restauración.",
    summary_label: "Qué evalúa esta herramienta",
    summary_def: "Compara 6 dimensiones de la carta de vinos entre tus locales y genera un diagnóstico de consistencia con alertas específicas por punto de venta.",
    summary_bullets: [
      "Surtido: número de referencias y equilibrio entre locales.",
      "Pricing: coherencia de precios medios de botella y copa.",
      "Ratio de vino: % de mesas que piden vino por local.",
      "Copa: penetración y pricing de la oferta por copa.",
      "Ticket medio: gasto en vino por mesa y desviaciones.",
    ],
    h2_data: "Datos por local",
    lbl_refs: "Nº referencias", lbl_ticket: "Ticket vino/mesa (€)", lbl_wine_ratio: "% mesas con vino",
    lbl_glass_ratio: "% ventas en copa", lbl_bottle_price: "Precio medio botella (€)", lbl_glass_price: "Precio medio copa (€)",
    btn_add: "Añadir local", btn_audit: "Auditar grupo",
    score_label: "Score de consistencia del grupo",
    score_high: "Alta consistencia. Buen control centralizado.",
    score_mid: "Consistencia moderada. Hay oportunidades de estandarización.",
    score_low: "Baja consistencia. Se recomienda implementar un framework de governance.",
    dim_assortment: "Surtido", dim_pricing_bottle: "Pricing botella", dim_pricing_glass: "Pricing copa",
    dim_wine_ratio: "Ratio de vino", dim_glass_ratio: "Ratio de copa", dim_avg_ticket: "Ticket medio",
    th_local: "Local", th_refs: "Refs", th_ticket: "Ticket", th_wine: "% Vino", th_glass: "% Copa", th_pvp_bottle: "PVP bot.", th_pvp_glass: "PVP copa",
    group_avg: "Media grupo",
    alerts_title: "Alertas detectadas",
    best_ticket: "Mejor ticket medio", worst_ticket: "Mayor oportunidad de mejora",
    interpret_title: "Cómo interpretar este diagnóstico",
    interpret_p1: "El score de consistencia mide cuán homogénea es la gestión del vino entre tus locales. Un score alto (≥75) indica que los locales aplican estándares similares. Un score bajo (<50) sugiere que cada local opera de forma autónoma sin framework común.",
    interpret_p2: "Las alertas señalan locales con valores significativamente alejados de la media del grupo. No siempre son problemas: un local premium puede tener pricing superior justificado. El objetivo es detectar desviaciones no intencionadas.",
    cta_demo: "Solicitar demo para grupos", cta_solutions: "Ver soluciones para grupos",
    edu_title: "Qué evaluar en un grupo de restauración",
    edu_blocks: [
      { icon: Layers, title: "Coherencia de surtido", desc: "¿Todos los locales tienen un número de referencias proporcional a su perfil?" },
      { icon: DollarSign, title: "Consistencia de pricing", desc: "¿El mismo vino cuesta lo mismo en todos los locales? Las diferencias no justificadas erosionan la percepción de marca." },
      { icon: BarChart3, title: "Benchmarking de ticket medio", desc: "¿Qué local vende más vino por mesa? El local referente tiene prácticas replicables." },
      { icon: Wine, title: "Penetración de copa", desc: "¿Todos los locales tienen oferta de copa? Un local sin copa pierde el 35-45% de mesas que pedirían vino." },
    ],
    when_title: "Cuándo usar esta herramienta",
    when_items: [
      "Al implementar un sistema de gestión centralizada del vino en tu grupo.",
      "Antes de las reuniones trimestrales de dirección para llevar datos concretos.",
      "Al detectar inconsistencias de precios entre locales.",
      "Cuando un local rinde significativamente peor que los demás en vino.",
      "Al preparar la negociación anual con distribuidores (volumen consolidado).",
      "Al abrir un nuevo local y definir su carta en base a los estándares del grupo.",
    ],
    faqs: [
      { q: "¿A partir de cuántos locales tiene sentido?", a: "Desde 2 locales ya puedes comparar y detectar desviaciones. A partir de 5, se convierte en imprescindible." },
      { q: "¿Puedo comparar locales con perfiles muy distintos?", a: "Sí, pero interpreta los resultados con criterio. El valor está en detectar desviaciones no justificadas." },
      { q: "¿Un score bajo siempre es malo?", a: "No necesariamente. Lo importante es que las desviaciones sean intencionadas." },
      { q: "¿Winerim ofrece este análisis automatizado?", a: "Sí. Winerim centraliza la gestión y genera dashboards comparativos en tiempo real." },
    ],
    links: [
      { to: "/soluciones/grupos-restauracion", label: "Winerim para grupos de restauración", type: "solution" },
      { to: "/recursos/plantilla-control-grupo-restauracion", label: "Plantilla de control para grupos", type: "resource" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guía: gestionar carta en grupos", type: "guide" },
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio", type: "tool" },
      { to: "/demo", label: "Solicitar demo para grupos", type: "solution" },
    ],
    final_cta_title: "Gestiona el vino de todo tu grupo desde un solo panel",
    final_cta_desc: "Winerim centraliza carta, stock y analítica de todos tus locales. Benchmarking automático, alertas de desviación y control de surtido en tiempo real.",
    final_cta_btn: "Solicitar demo para grupos",
    issue_refs_low: (n, v, a) => `Surtido muy inferior a la media del grupo (${v} vs ${Math.round(a)} refs)`,
    issue_refs_high: (n, v, a) => `Surtido muy superior a la media (${v} vs ${Math.round(a)} refs). Posible sobredimensionamiento.`,
    issue_price_low: (n, v, a) => `Precio medio de botella muy inferior (${v}€ vs ${Math.round(a)}€). Revisa pricing.`,
    issue_price_high: (n, v, a) => `Precio medio de botella muy superior (${v}€ vs ${Math.round(a)}€). ¿Justificado por perfil?`,
    issue_ratio_low: (n, v, a) => `Ratio de vino muy bajo (${v}% vs ${Math.round(a)}%). Oportunidad de mejora.`,
    issue_glass_low: (n, v) => `Ratio de copa inferior al 15%. Oportunidad de crecimiento a través de copa.`,
    issue_glass_price_low: (n, v, a) => `Precio medio de copa inferior a la media (${v}€ vs ${a}€).`,
    decides: ["Si hay coherencia en la gestión del vino entre locales", "Qué local necesita más atención en pricing o surtido", "Si el grupo se beneficiaría de un estándar centralizado"],
    avoids: ["Que cada local opere con criterios distintos sin control", "Desviaciones de precio que erosionan la marca", "Perder poder de negociación por falta de visión consolidada"],
    impact: ["Detectar oportunidades de mejora en locales infrarrendidores", "Estandarizar la gestión y reducir ineficiencias", "Preparar negociaciones con distribuidores con datos de grupo"],
  },
  en: {
    seo_title: "Wine List Auditor for Multi-Location Groups | Winerim",
    seo_desc: "Compare wine lists across your locations: assortment, pricing, glass and average ticket. Detect inconsistencies and improvement opportunities.",
    jsonld_name: "Wine List Auditor for Multi-Location Groups",
    jsonld_desc: "Compare wine lists across multiple locations: assortment, pricing, wine ratio, glass and average ticket.",
    bc_tools: "Tools", bc_page: "Multi-location auditor", bc_home: "Home",
    badge: "Tool for groups", h1: "Wine list auditor for multi-location groups",
    subtitle: "Compare wine management across your locations. Detect pricing inconsistencies, assortment imbalances and improvement opportunities.",
    summary_label: "What this tool evaluates",
    summary_def: "Compares 6 wine list dimensions across your locations and generates a consistency diagnostic with location-specific alerts.",
    summary_bullets: [
      "Assortment: number of references and balance between locations.",
      "Pricing: consistency of average bottle and glass prices.",
      "Wine ratio: % of tables ordering wine per location.",
      "Glass: penetration and pricing of the by-the-glass offer.",
      "Average ticket: wine spend per table and deviations.",
    ],
    h2_data: "Data by location",
    lbl_refs: "No. references", lbl_ticket: "Wine ticket/table (€)", lbl_wine_ratio: "% tables with wine",
    lbl_glass_ratio: "% sales by glass", lbl_bottle_price: "Avg bottle price (€)", lbl_glass_price: "Avg glass price (€)",
    btn_add: "Add location", btn_audit: "Audit group",
    score_label: "Group consistency score",
    score_high: "High consistency. Good centralised control.",
    score_mid: "Moderate consistency. There are standardisation opportunities.",
    score_low: "Low consistency. A governance framework is recommended.",
    dim_assortment: "Assortment", dim_pricing_bottle: "Bottle pricing", dim_pricing_glass: "Glass pricing",
    dim_wine_ratio: "Wine ratio", dim_glass_ratio: "Glass ratio", dim_avg_ticket: "Avg ticket",
    th_local: "Location", th_refs: "Refs", th_ticket: "Ticket", th_wine: "% Wine", th_glass: "% Glass", th_pvp_bottle: "Bottle", th_pvp_glass: "Glass",
    group_avg: "Group average",
    alerts_title: "Alerts detected",
    best_ticket: "Best average ticket", worst_ticket: "Greatest improvement opportunity",
    interpret_title: "How to interpret this diagnostic",
    interpret_p1: "The consistency score measures how uniform wine management is across your locations. A high score (≥75) indicates similar standards are applied. A low score (<50) suggests each location operates autonomously.",
    interpret_p2: "Alerts flag locations with values significantly away from the group average. They are not always problems: a premium location may justifiably have higher pricing. The goal is to detect unintended deviations.",
    cta_demo: "Request demo for groups", cta_solutions: "View group solutions",
    edu_title: "What to evaluate in a restaurant group",
    edu_blocks: [
      { icon: Layers, title: "Assortment coherence", desc: "Do all locations have a proportional number of references for their profile?" },
      { icon: DollarSign, title: "Pricing consistency", desc: "Does the same wine cost the same everywhere? Unjustified differences erode brand perception." },
      { icon: BarChart3, title: "Ticket benchmarking", desc: "Which location sells the most wine per table? The benchmark location has replicable practices." },
      { icon: Wine, title: "Glass penetration", desc: "Do all locations offer by-the-glass? A location without glass misses 35-45% of tables that would order wine." },
    ],
    when_title: "When to use this tool",
    when_items: [
      "When implementing centralised wine management in your group.",
      "Before quarterly board meetings to bring concrete data.",
      "When detecting price inconsistencies between locations.",
      "When one location performs significantly worse in wine.",
      "When preparing the annual distributor negotiation (consolidated volume).",
      "When opening a new location and defining its list based on group standards.",
    ],
    faqs: [
      { q: "From how many locations does this make sense?", a: "From 2 locations you can already compare and detect deviations. From 5, it becomes essential." },
      { q: "Can I compare locations with very different profiles?", a: "Yes, but interpret results with judgement. The value lies in detecting unjustified deviations." },
      { q: "Is a low score always bad?", a: "Not necessarily. What matters is that deviations are intentional." },
      { q: "Does Winerim offer this analysis automatically?", a: "Yes. Winerim centralises management and generates real-time comparative dashboards." },
    ],
    links: [
      { to: "/soluciones/grupos-restauracion", label: "Winerim for restaurant groups", type: "solution" },
      { to: "/recursos/plantilla-control-grupo-restauracion", label: "Group control template", type: "resource" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guide: managing wine lists in groups", type: "guide" },
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Average ticket calculator", type: "tool" },
      { to: "/demo", label: "Request demo for groups", type: "solution" },
    ],
    final_cta_title: "Manage wine across your entire group from a single dashboard",
    final_cta_desc: "Winerim centralises list, stock and analytics for all your locations. Automatic benchmarking, deviation alerts and real-time assortment control.",
    final_cta_btn: "Request demo for groups",
    issue_refs_low: (n, v, a) => `Assortment well below group average (${v} vs ${Math.round(a)} refs)`,
    issue_refs_high: (n, v, a) => `Assortment well above average (${v} vs ${Math.round(a)} refs). Possible oversizing.`,
    issue_price_low: (n, v, a) => `Average bottle price well below (€${v} vs €${Math.round(a)}). Review pricing.`,
    issue_price_high: (n, v, a) => `Average bottle price well above (€${v} vs €${Math.round(a)}). Justified by profile?`,
    issue_ratio_low: (n, v, a) => `Wine ratio very low (${v}% vs ${Math.round(a)}%). Improvement opportunity.`,
    issue_glass_low: (n, v) => `Glass ratio below 15%. Growth opportunity through by-the-glass.`,
    issue_glass_price_low: (n, v, a) => `Average glass price below average (€${v} vs €${a}).`,
    decides: ["Whether wine management is consistent across locations", "Which location needs more attention on pricing or assortment", "Whether the group would benefit from centralised standards"],
    avoids: ["Each location operating with different criteria without oversight", "Price deviations that erode the brand", "Losing negotiation power due to lack of consolidated data"],
    impact: ["Detect improvement opportunities in underperforming locations", "Standardise management and reduce inefficiencies", "Prepare supplier negotiations with group-level data"],
  },
  it: {
    seo_title: "Auditor Carta Vini per Gruppi Multi-Locale | Winerim",
    seo_desc: "Confronta la carta vini dei tuoi locali: assortimento, pricing, calice e scontrino medio. Individua incoerenze e opportunità.",
    jsonld_name: "Auditor Carta Vini per Gruppi Multi-Locale",
    jsonld_desc: "Confronta la carta vini di più locali: assortimento, pricing, rapporto vino, calice e scontrino medio.",
    bc_tools: "Strumenti", bc_page: "Auditor multi-locale", bc_home: "Home",
    badge: "Strumento per gruppi", h1: "Auditor carta vini per gruppi multi-locale",
    subtitle: "Confronta la gestione del vino nei tuoi locali. Individua incoerenze di pricing, squilibri di assortimento e opportunità di miglioramento.",
    summary_label: "Cosa valuta questo strumento",
    summary_def: "Confronta 6 dimensioni della carta vini tra i tuoi locali e genera una diagnostica di coerenza con alert specifici per punto vendita.",
    summary_bullets: [
      "Assortimento: numero di referenze e equilibrio tra locali.",
      "Pricing: coerenza dei prezzi medi di bottiglia e calice.",
      "Rapporto vino: % di tavoli che ordinano vino per locale.",
      "Calice: penetrazione e pricing dell'offerta al calice.",
      "Scontrino medio: spesa in vino per tavolo e deviazioni.",
    ],
    h2_data: "Dati per locale",
    lbl_refs: "N. referenze", lbl_ticket: "Scontrino vino/tavolo (€)", lbl_wine_ratio: "% tavoli con vino",
    lbl_glass_ratio: "% vendite al calice", lbl_bottle_price: "Prezzo medio bottiglia (€)", lbl_glass_price: "Prezzo medio calice (€)",
    btn_add: "Aggiungi locale", btn_audit: "Audita il gruppo",
    score_label: "Score di coerenza del gruppo",
    score_high: "Alta coerenza. Buon controllo centralizzato.",
    score_mid: "Coerenza moderata. Ci sono opportunità di standardizzazione.",
    score_low: "Bassa coerenza. Si raccomanda un framework di governance.",
    dim_assortment: "Assortimento", dim_pricing_bottle: "Pricing bottiglia", dim_pricing_glass: "Pricing calice",
    dim_wine_ratio: "Rapporto vino", dim_glass_ratio: "Rapporto calice", dim_avg_ticket: "Scontrino medio",
    th_local: "Locale", th_refs: "Ref", th_ticket: "Scontrino", th_wine: "% Vino", th_glass: "% Calice", th_pvp_bottle: "PVP bott.", th_pvp_glass: "PVP calice",
    group_avg: "Media gruppo",
    alerts_title: "Alert rilevati",
    best_ticket: "Miglior scontrino medio", worst_ticket: "Maggiore opportunità di miglioramento",
    interpret_title: "Come interpretare questa diagnostica",
    interpret_p1: "Lo score di coerenza misura quanto è omogenea la gestione del vino tra i tuoi locali. Uno score alto (≥75) indica standard simili. Uno score basso (<50) suggerisce che ogni locale opera autonomamente.",
    interpret_p2: "Gli alert segnalano locali con valori significativamente lontani dalla media del gruppo. Non sono sempre problemi: un locale premium può avere pricing superiore giustificato.",
    cta_demo: "Richiedi demo per gruppi", cta_solutions: "Vedi soluzioni per gruppi",
    edu_title: "Cosa valutare in un gruppo di ristorazione",
    edu_blocks: [
      { icon: Layers, title: "Coerenza assortimento", desc: "Tutti i locali hanno un numero di referenze proporzionale al profilo?" },
      { icon: DollarSign, title: "Consistenza pricing", desc: "Lo stesso vino costa uguale ovunque? Differenze ingiustificate erodono la percezione del brand." },
      { icon: BarChart3, title: "Benchmarking scontrino", desc: "Quale locale vende più vino per tavolo? Il locale di riferimento ha pratiche replicabili." },
      { icon: Wine, title: "Penetrazione calice", desc: "Tutti i locali offrono il calice? Un locale senza calice perde il 35-45% dei tavoli che ordinerebbero vino." },
    ],
    when_title: "Quando usare questo strumento",
    when_items: [
      "Nell'implementare una gestione centralizzata del vino nel gruppo.",
      "Prima delle riunioni trimestrali per portare dati concreti.",
      "Nel rilevare incoerenze di prezzo tra locali.",
      "Quando un locale rende significativamente peggio nel vino.",
      "Nel preparare la negoziazione annuale con i distributori.",
      "Nell'aprire un nuovo locale per definirne la carta sugli standard del gruppo.",
    ],
    faqs: [
      { q: "Da quanti locali ha senso?", a: "Da 2 locali puoi già confrontare. Da 5, diventa imprescindibile." },
      { q: "Posso confrontare locali con profili molto diversi?", a: "Sì, ma interpreta i risultati con criterio. Il valore sta nel rilevare deviazioni ingiustificate." },
      { q: "Uno score basso è sempre negativo?", a: "Non necessariamente. L'importante è che le deviazioni siano intenzionali." },
      { q: "Winerim offre questa analisi in automatico?", a: "Sì. Winerim centralizza la gestione e genera dashboard comparativi in tempo reale." },
    ],
    links: [
      { to: "/soluciones/grupos-restauracion", label: "Winerim per gruppi di ristorazione", type: "solution" },
      { to: "/recursos/plantilla-control-grupo-restauracion", label: "Template di controllo per gruppi", type: "resource" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guida: gestire la carta nei gruppi", type: "guide" },
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calcolatrice scontrino medio", type: "tool" },
      { to: "/demo", label: "Richiedi demo per gruppi", type: "solution" },
    ],
    final_cta_title: "Gestisci il vino di tutto il gruppo da un unico pannello",
    final_cta_desc: "Winerim centralizza carta, stock e analytics di tutti i tuoi locali. Benchmarking automatico, alert di deviazione e controllo assortimento in tempo reale.",
    final_cta_btn: "Richiedi demo per gruppi",
    issue_refs_low: (n, v, a) => `Assortimento molto inferiore alla media (${v} vs ${Math.round(a)} ref)`,
    issue_refs_high: (n, v, a) => `Assortimento molto superiore alla media (${v} vs ${Math.round(a)} ref). Possibile sovradimensionamento.`,
    issue_price_low: (n, v, a) => `Prezzo medio bottiglia molto inferiore (${v}€ vs ${Math.round(a)}€). Rivedi pricing.`,
    issue_price_high: (n, v, a) => `Prezzo medio bottiglia molto superiore (${v}€ vs ${Math.round(a)}€). Giustificato dal profilo?`,
    issue_ratio_low: (n, v, a) => `Rapporto vino molto basso (${v}% vs ${Math.round(a)}%). Opportunità di miglioramento.`,
    issue_glass_low: (n, v) => `Rapporto calice inferiore al 15%. Opportunità di crescita tramite il calice.`,
    issue_glass_price_low: (n, v, a) => `Prezzo medio calice inferiore alla media (${v}€ vs ${a}€).`,
    decides: ["Se la gestione del vino è coerente tra i locali", "Quale locale necessita più attenzione su pricing o assortimento", "Se il gruppo beneficerebbe di standard centralizzati"],
    avoids: ["Che ogni locale operi con criteri diversi senza controllo", "Deviazioni di prezzo che erodono il brand", "Perdere potere negoziale per mancanza di visione consolidata"],
    impact: ["Individuare opportunità di miglioramento nei locali sottoperformanti", "Standardizzare la gestione e ridurre le inefficienze", "Preparare le negoziazioni con dati di gruppo"],
  },
  fr: {
    seo_title: "Auditeur Carte des Vins pour Groupes Multi-Sites | Winerim",
    seo_desc: "Comparez les cartes des vins de vos établissements : assortiment, pricing, verre et ticket moyen. Détectez les incohérences.",
    jsonld_name: "Auditeur Carte des Vins pour Groupes Multi-Sites",
    jsonld_desc: "Comparez les cartes des vins de plusieurs établissements : assortiment, pricing, ratio vin, verre et ticket moyen.",
    bc_tools: "Outils", bc_page: "Auditeur multi-sites", bc_home: "Accueil",
    badge: "Outil pour groupes", h1: "Auditeur carte des vins pour groupes multi-sites",
    subtitle: "Comparez la gestion du vin dans vos établissements. Détectez les incohérences de pricing et les opportunités d'amélioration.",
    summary_label: "Ce que cet outil évalue",
    summary_def: "Compare 6 dimensions de la carte des vins entre vos établissements et génère un diagnostic de cohérence avec des alertes par site.",
    summary_bullets: [
      "Assortiment : nombre de références et équilibre entre sites.",
      "Pricing : cohérence des prix moyens bouteille et verre.",
      "Ratio vin : % de tables commandant du vin par site.",
      "Verre : pénétration et pricing de l'offre au verre.",
      "Ticket moyen : dépense vin par table et écarts.",
    ],
    h2_data: "Données par site",
    lbl_refs: "Nb références", lbl_ticket: "Ticket vin/table (€)", lbl_wine_ratio: "% tables avec vin",
    lbl_glass_ratio: "% ventes au verre", lbl_bottle_price: "Prix moyen bouteille (€)", lbl_glass_price: "Prix moyen verre (€)",
    btn_add: "Ajouter un site", btn_audit: "Auditer le groupe",
    score_label: "Score de cohérence du groupe",
    score_high: "Haute cohérence. Bon contrôle centralisé.",
    score_mid: "Cohérence modérée. Il existe des opportunités de standardisation.",
    score_low: "Faible cohérence. Un cadre de gouvernance est recommandé.",
    dim_assortment: "Assortiment", dim_pricing_bottle: "Pricing bouteille", dim_pricing_glass: "Pricing verre",
    dim_wine_ratio: "Ratio vin", dim_glass_ratio: "Ratio verre", dim_avg_ticket: "Ticket moyen",
    th_local: "Site", th_refs: "Réf", th_ticket: "Ticket", th_wine: "% Vin", th_glass: "% Verre", th_pvp_bottle: "PVP bout.", th_pvp_glass: "PVP verre",
    group_avg: "Moyenne groupe",
    alerts_title: "Alertes détectées",
    best_ticket: "Meilleur ticket moyen", worst_ticket: "Plus grande opportunité d'amélioration",
    interpret_title: "Comment interpréter ce diagnostic",
    interpret_p1: "Le score de cohérence mesure l'homogénéité de la gestion du vin entre vos sites. Un score élevé (≥75) indique des standards similaires. Un score faible (<50) suggère que chaque site opère de manière autonome.",
    interpret_p2: "Les alertes signalent des sites avec des valeurs significativement éloignées de la moyenne du groupe. Elles ne sont pas toujours des problèmes : un site premium peut avoir un pricing supérieur justifié.",
    cta_demo: "Demander une démo pour groupes", cta_solutions: "Voir les solutions groupes",
    edu_title: "Quoi évaluer dans un groupe de restauration",
    edu_blocks: [
      { icon: Layers, title: "Cohérence d'assortiment", desc: "Tous les sites ont-ils un nombre de références proportionnel à leur profil ?" },
      { icon: DollarSign, title: "Consistance du pricing", desc: "Le même vin coûte-t-il le même prix partout ? Les écarts injustifiés érodent la perception de marque." },
      { icon: BarChart3, title: "Benchmarking du ticket", desc: "Quel site vend le plus de vin par table ? Le site de référence a des pratiques réplicables." },
      { icon: Wine, title: "Pénétration du verre", desc: "Tous les sites proposent-ils le verre ? Un site sans verre perd 35-45% des tables qui commanderaient du vin." },
    ],
    when_title: "Quand utiliser cet outil",
    when_items: [
      "Lors de la mise en place d'une gestion centralisée du vin.",
      "Avant les réunions trimestrielles pour apporter des données concrètes.",
      "En cas d'incohérences de prix entre sites.",
      "Quand un site performe nettement moins bien en vin.",
      "Pour préparer la négociation annuelle avec les distributeurs.",
      "À l'ouverture d'un nouveau site pour définir sa carte selon les standards du groupe.",
    ],
    faqs: [
      { q: "À partir de combien de sites est-ce pertinent ?", a: "Dès 2 sites vous pouvez comparer. À partir de 5, cela devient indispensable." },
      { q: "Puis-je comparer des sites très différents ?", a: "Oui, mais interprétez avec discernement. La valeur est de détecter les écarts non justifiés." },
      { q: "Un score faible est-il toujours mauvais ?", a: "Pas nécessairement. L'important est que les écarts soient intentionnels." },
      { q: "Winerim propose-t-il cette analyse automatiquement ?", a: "Oui. Winerim centralise la gestion et génère des tableaux de bord comparatifs en temps réel." },
    ],
    links: [
      { to: "/soluciones/grupos-restauracion", label: "Winerim pour groupes de restauration", type: "solution" },
      { to: "/recursos/plantilla-control-grupo-restauracion", label: "Template de contrôle pour groupes", type: "resource" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guide : gérer la carte en groupe", type: "guide" },
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculateur de ticket moyen", type: "tool" },
      { to: "/demo", label: "Demander une démo pour groupes", type: "solution" },
    ],
    final_cta_title: "Gérez le vin de tout votre groupe depuis un seul tableau de bord",
    final_cta_desc: "Winerim centralise carte, stock et analytique de tous vos sites. Benchmarking automatique, alertes d'écart et contrôle d'assortiment en temps réel.",
    final_cta_btn: "Demander une démo pour groupes",
    issue_refs_low: (n, v, a) => `Assortiment très inférieur à la moyenne (${v} vs ${Math.round(a)} réf)`,
    issue_refs_high: (n, v, a) => `Assortiment très supérieur à la moyenne (${v} vs ${Math.round(a)} réf). Possible surdimensionnement.`,
    issue_price_low: (n, v, a) => `Prix moyen bouteille très inférieur (${v}€ vs ${Math.round(a)}€). Revoyez le pricing.`,
    issue_price_high: (n, v, a) => `Prix moyen bouteille très supérieur (${v}€ vs ${Math.round(a)}€). Justifié par le profil ?`,
    issue_ratio_low: (n, v, a) => `Ratio vin très faible (${v}% vs ${Math.round(a)}%). Opportunité d'amélioration.`,
    issue_glass_low: (n, v) => `Ratio verre inférieur à 15%. Opportunité de croissance via le verre.`,
    issue_glass_price_low: (n, v, a) => `Prix moyen verre inférieur à la moyenne (${v}€ vs ${a}€).`,
    decides: ["Si la gestion du vin est cohérente entre les sites", "Quel site nécessite plus d'attention sur le pricing ou l'assortiment", "Si le groupe bénéficierait de standards centralisés"],
    avoids: ["Que chaque site opère avec des critères différents sans contrôle", "Des écarts de prix qui érodent la marque", "Perdre du pouvoir de négociation par manque de vision consolidée"],
    impact: ["Détecter les opportunités d'amélioration dans les sites sous-performants", "Standardiser la gestion et réduire les inefficacités", "Préparer les négociations fournisseurs avec des données de groupe"],
  },
};

const AuditorMultiLocal = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const [locales, setLocales] = useState<LocalData[]>([
    { ...emptyLocal(), nombre: "Local 1" },
    { ...emptyLocal(), nombre: "Local 2" },
    { ...emptyLocal(), nombre: "Local 3" },
  ]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "auditor-multi-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t.jsonld_name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.jsonld_desc,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.bc_home, item: CANONICAL_DOMAIN },
          { "@type": "ListItem", position: 2, name: t.bc_tools, item: `${CANONICAL_DOMAIN}/herramientas` },
          { "@type": "ListItem", position: 3, name: t.bc_page, item: `${CANONICAL_DOMAIN}/herramientas/auditor-carta-multilocal` },
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("auditor-multi-jsonld")?.remove(); };
  }, [t]);

  const addLocal = () => setLocales(prev => [...prev, { ...emptyLocal(), nombre: `Local ${prev.length + 1}` }]);
  const removeLocal = (i: number) => { if (locales.length > 2) setLocales(prev => prev.filter((_, idx) => idx !== i)); };
  const updateLocal = (i: number, field: keyof LocalData, value: string | number) => {
    setLocales(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  };

  const analysis = useMemo(() => {
    if (locales.length < 2) return null;
    const valid = locales.filter(l => l.nombre.trim());
    if (valid.length < 2) return null;

    const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
    const stdDev = (arr: number[]) => {
      const m = avg(arr);
      return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
    };

    const refs = valid.map(l => l.referencias);
    const tickets = valid.map(l => l.ticketMedioVino);
    const ratios = valid.map(l => l.ratioVino);
    const copas = valid.map(l => l.ratioCopa);
    const pricesBottle = valid.map(l => l.precioMedioBottle);
    const pricesCopa = valid.map(l => l.precioMedioCopa);

    const refAvg = avg(refs); const refDev = stdDev(refs);
    const ticketAvg = avg(tickets); const ticketDev = stdDev(tickets);
    const ratioAvg = avg(ratios); const ratioDev = stdDev(ratios);
    const copaAvg = avg(copas); const copaDev = stdDev(copas);
    const priceBottleAvg = avg(pricesBottle); const priceBottleDev = stdDev(pricesBottle);
    const priceCopaAvg = avg(pricesCopa); const priceCopaDev = stdDev(pricesCopa);

    const consistency = (dev: number, avg: number) => avg > 0 ? Math.max(0, Math.round(100 - (dev / avg) * 200)) : 50;

    const scores = {
      surtido: consistency(refDev, refAvg),
      pricing: consistency(priceBottleDev, priceBottleAvg),
      pricingCopa: consistency(priceCopaDev, priceCopaAvg),
      ratioVino: consistency(ratioDev, ratioAvg),
      ratioCopa: consistency(copaDev, copaAvg),
      ticketMedio: consistency(ticketDev, ticketAvg),
    };

    const globalScore = Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / Object.keys(scores).length);

    const issues: { local: string; issue: string; severity: "high" | "medium" | "low" }[] = [];

    valid.forEach(l => {
      if (l.referencias < refAvg * 0.6) issues.push({ local: l.nombre, issue: t.issue_refs_low(l.nombre, l.referencias, refAvg), severity: "high" });
      if (l.referencias > refAvg * 1.5) issues.push({ local: l.nombre, issue: t.issue_refs_high(l.nombre, l.referencias, refAvg), severity: "medium" });
      if (l.precioMedioBottle < priceBottleAvg * 0.7) issues.push({ local: l.nombre, issue: t.issue_price_low(l.nombre, l.precioMedioBottle, priceBottleAvg), severity: "high" });
      if (l.precioMedioBottle > priceBottleAvg * 1.3) issues.push({ local: l.nombre, issue: t.issue_price_high(l.nombre, l.precioMedioBottle, priceBottleAvg), severity: "medium" });
      if (l.ratioVino < ratioAvg * 0.6) issues.push({ local: l.nombre, issue: t.issue_ratio_low(l.nombre, l.ratioVino, ratioAvg), severity: "high" });
      if (l.ratioCopa < 15) issues.push({ local: l.nombre, issue: t.issue_glass_low(l.nombre, l.ratioCopa), severity: "medium" });
      if (l.precioMedioCopa < priceCopaAvg * 0.7) issues.push({ local: l.nombre, issue: t.issue_glass_price_low(l.nombre, l.precioMedioCopa, (Math.round(priceCopaAvg * 10) / 10).toString()), severity: "medium" });
    });

    const bestLocal = valid.reduce((best, l) => l.ticketMedioVino > best.ticketMedioVino ? l : best, valid[0]);
    const worstLocal = valid.reduce((worst, l) => l.ticketMedioVino < worst.ticketMedioVino ? l : worst, valid[0]);

    return { valid, scores, globalScore, issues, bestLocal, worstLocal, averages: { refAvg, ticketAvg, ratioAvg, copaAvg, priceBottleAvg, priceCopaAvg } };
  }, [locales, t]);

  const scoreColor = (s: number) => s >= 75 ? "text-green-500" : s >= 50 ? "text-amber-500" : "text-red-500";
  const scoreBg = (s: number) => s >= 75 ? "bg-green-500/10 border-green-500/20" : s >= 50 ? "bg-amber-500/10 border-amber-500/20" : "bg-red-500/10 border-red-500/20";
  const severityColor = (s: string) => s === "high" ? "border-red-500/30 bg-red-500/5" : s === "medium" ? "border-amber-500/30 bg-amber-500/5" : "border-border";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}/herramientas/auditor-carta-multilocal`}
        hreflang={allLangPaths("/herramientas/auditor-carta-multilocal")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: t.bc_tools, href: localePath("/herramientas") }, { label: t.bc_page }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Building2 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.subtitle}</motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* SUMMARY */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <SummaryBox label={t.summary_label} definition={t.summary_def} bullets={t.summary_bullets} />
      </div>

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Building2 size={20} className="text-wine" /> {t.h2_data}
          </h2>

          <div className="space-y-6">
            {locales.map((local, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Input value={local.nombre} onChange={e => updateLocal(i, "nombre", e.target.value)} placeholder={`Local ${i + 1}`} className="font-semibold max-w-xs" />
                  {locales.length > 2 && (
                    <button onClick={() => removeLocal(i)} className="text-muted-foreground hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div><Label className="text-xs mb-1 block">{t.lbl_refs}</Label><Input type="number" value={local.referencias} onChange={e => updateLocal(i, "referencias", Number(e.target.value))} className="text-sm" min={1} /></div>
                  <div><Label className="text-xs mb-1 block">{t.lbl_ticket}</Label><Input type="number" value={local.ticketMedioVino} onChange={e => updateLocal(i, "ticketMedioVino", Number(e.target.value))} className="text-sm" min={0} step={0.5} /></div>
                  <div><Label className="text-xs mb-1 block">{t.lbl_wine_ratio}</Label><Input type="number" value={local.ratioVino} onChange={e => updateLocal(i, "ratioVino", Number(e.target.value))} className="text-sm" min={0} max={100} /></div>
                  <div><Label className="text-xs mb-1 block">{t.lbl_glass_ratio}</Label><Input type="number" value={local.ratioCopa} onChange={e => updateLocal(i, "ratioCopa", Number(e.target.value))} className="text-sm" min={0} max={100} /></div>
                  <div><Label className="text-xs mb-1 block">{t.lbl_bottle_price}</Label><Input type="number" value={local.precioMedioBottle} onChange={e => updateLocal(i, "precioMedioBottle", Number(e.target.value))} className="text-sm" min={0} step={0.5} /></div>
                  <div><Label className="text-xs mb-1 block">{t.lbl_glass_price}</Label><Input type="number" value={local.precioMedioCopa} onChange={e => updateLocal(i, "precioMedioCopa", Number(e.target.value))} className="text-sm" min={0} step={0.5} /></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            {locales.length < 10 && (
              <Button variant="outline" onClick={addLocal} className="gap-2"><Plus size={14} /> {t.btn_add}</Button>
            )}
          </div>

          <Button onClick={() => setCalculated(true)}
            className="w-full mt-6 bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            {t.btn_audit}
          </Button>

          {/* RESULTS */}
          {calculated && analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
              <div className={`p-6 rounded-xl border text-center ${scoreBg(analysis.globalScore)}`}>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">{t.score_label}</p>
                <p className={`font-heading text-5xl font-bold ${scoreColor(analysis.globalScore)}`}>{analysis.globalScore}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {analysis.globalScore >= 75 ? t.score_high : analysis.globalScore >= 50 ? t.score_mid : t.score_low}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: t.dim_assortment, score: analysis.scores.surtido },
                  { label: t.dim_pricing_bottle, score: analysis.scores.pricing },
                  { label: t.dim_pricing_glass, score: analysis.scores.pricingCopa },
                  { label: t.dim_wine_ratio, score: analysis.scores.ratioVino },
                  { label: t.dim_glass_ratio, score: analysis.scores.ratioCopa },
                  { label: t.dim_avg_ticket, score: analysis.scores.ticketMedio },
                ].map((dim, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-background text-center">
                    <p className="text-xs text-muted-foreground mb-1">{dim.label}</p>
                    <p className={`font-heading text-2xl font-bold ${scoreColor(dim.score)}`}>{dim.score}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_local}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_refs}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_ticket}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_wine}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_glass}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_pvp_bottle}</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">{t.th_pvp_glass}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.valid.map((l, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-3 font-medium">{l.nombre}</td>
                        <td className="py-2 px-3 text-right">{l.referencias}</td>
                        <td className="py-2 px-3 text-right">{l.ticketMedioVino}€</td>
                        <td className="py-2 px-3 text-right">{l.ratioVino}%</td>
                        <td className="py-2 px-3 text-right">{l.ratioCopa}%</td>
                        <td className="py-2 px-3 text-right">{l.precioMedioBottle}€</td>
                        <td className="py-2 px-3 text-right">{l.precioMedioCopa}€</td>
                      </tr>
                    ))}
                    <tr className="bg-wine/5 font-semibold">
                      <td className="py-2 px-3 text-wine">{t.group_avg}</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.refAvg)}</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.ticketAvg)}€</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.ratioAvg)}%</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.copaAvg)}%</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.priceBottleAvg)}€</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.priceCopaAvg * 10) / 10}€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {analysis.issues.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" /> {t.alerts_title}
                  </h3>
                  <div className="space-y-2">
                    {analysis.issues.map((issue, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${severityColor(issue.severity)}`}>
                        <AlertTriangle size={14} className={issue.severity === "high" ? "text-red-500 shrink-0 mt-0.5" : "text-amber-500 shrink-0 mt-0.5"} />
                        <div className="text-sm">
                          <span className="font-semibold">{issue.local}:</span>{" "}
                          <span className="text-muted-foreground">{issue.issue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-green-500 mb-2">{t.best_ticket}</p>
                  <p className="font-semibold">{analysis.bestLocal.nombre}</p>
                  <p className="text-sm text-muted-foreground">{analysis.bestLocal.ticketMedioVino}€ · {analysis.bestLocal.ratioVino}%</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-2">{t.worst_ticket}</p>
                  <p className="font-semibold">{analysis.worstLocal.nombre}</p>
                  <p className="text-sm text-muted-foreground">{analysis.worstLocal.ticketMedioVino}€ · {analysis.worstLocal.ratioVino}%</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-wine shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">{t.interpret_title}</p>
                    <p>{t.interpret_p1}</p>
                    <p className="mt-2">{t.interpret_p2}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to={localePath("/demo")}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.cta_demo} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/soluciones/grupos-restauracion")}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.cta_solutions}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATIONAL BLOCK */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">{t.edu_title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t.edu_blocks.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background">
                  <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-wine" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHEN TO USE */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold mb-6">{t.when_title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.when_items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background">
                <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <FAQSection schemaId="auditor-multi-faq" faqs={t.faqs} />

      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <InternalLinks links={t.links} />
      </div>

      {/* CTA FINAL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-10 md:p-14">
            <Sparkles size={28} className="text-wine mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.final_cta_title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm leading-relaxed">{t.final_cta_desc}</p>
            <Link to={localePath("/demo")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.final_cta_btn} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default AuditorMultiLocal;
