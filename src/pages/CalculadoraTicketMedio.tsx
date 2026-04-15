import { useState, useMemo, useEffect, useCallback } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Wine, DollarSign, Users,
  Calculator, Sparkles, Info, BarChart3, GlassWater, Zap,
  Sun, Snowflake, Leaf, CloudSun, Pencil, RotateCcw,
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
import { Slider } from "@/components/ui/slider";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

/* ─── Season logic ─── */
type Season = "summer" | "winter" | "spring" | "autumn";
const seasonIcons: Record<Season, typeof Sun> = { summer: Sun, winter: Snowflake, spring: Leaf, autumn: CloudSun };
const seasonMods: Record<Season, { penetration: number; ticketMod: number; glassMod: number }> = {
  summer: { penetration: 4, ticketMod: -0.03, glassMod: 8 },
  winter: { penetration: -2, ticketMod: 0.06, glassMod: -5 },
  spring: { penetration: 2, ticketMod: 0.02, glassMod: 3 },
  autumn: { penetration: 0, ticketMod: 0.04, glassMod: -2 },
};

/* ─── Context logic ─── */
type Context = "casual" | "gastro" | "hotel" | "winebar";
const contextMods: Record<Context, { penetration: number; ticketMod: number; glassMod: number }> = {
  casual: { penetration: -3, ticketMod: -0.05, glassMod: 5 },
  gastro: { penetration: 5, ticketMod: 0.08, glassMod: -3 },
  hotel: { penetration: 2, ticketMod: 0.03, glassMod: 2 },
  winebar: { penetration: 8, ticketMod: 0.05, glassMod: 10 },
};

/* ─── Scenario presets ─── */
interface ScenarioDeltas {
  penetrationDelta: number;
  ticketDelta: number; // percentage
  glassDelta: number; // pp
  bottleTicketDelta: number; // percentage on bottle ticket specifically
  glassTicketDelta: number; // percentage on glass ticket specifically
}

const defaultScenarios: Record<string, ScenarioDeltas> = {
  conservative: { penetrationDelta: 3, ticketDelta: 5, glassDelta: 5, bottleTicketDelta: 3, glassTicketDelta: 5 },
  base: { penetrationDelta: 5, ticketDelta: 10, glassDelta: 10, bottleTicketDelta: 6, glassTicketDelta: 10 },
  optimized: { penetrationDelta: 8, ticketDelta: 18, glassDelta: 15, bottleTicketDelta: 10, glassTicketDelta: 15 },
  aggressive: { penetrationDelta: 12, ticketDelta: 28, glassDelta: 20, bottleTicketDelta: 15, glassTicketDelta: 25 },
};

/* ─── i18n ─── */
const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Calculadora de Impacto en Ticket Medio del Vino | Demo Winerim",
    seo_desc: "Simula el impacto de la penetración del vino, copa vs botella y mix de referencias sobre el ticket medio de tu restaurante. Herramienta gratuita.",
    badge: "Demo · Winerim Core",
    h1: "Calculadora de impacto en ticket medio del vino",
    subtitle: "Simula cómo cambia tu facturación mensual en vino al mejorar la penetración, el mix de referencias y la estrategia de copa.",
    bread_tools: "Herramientas",
    bread_self: "Calculadora ticket medio vino",
    intro_title: "El ticket medio no mejora solo con vender más. Mejora con mejor mix y mejor activación.",
    intro_desc: "Winerim ayuda a simular el impacto de la penetración del vino, la venta por copa, el mix de referencias y la visibilidad de la carta sobre el ticket medio del restaurante.",
    summary_label: "Qué simula esta herramienta",
    summary_def: "Compara escenarios de mejora del ticket medio en vino combinando tres palancas: penetración (% de mesas que piden vino), mix (gasto medio por mesa) y copa (ratio copa vs botella).",
    summary_bullets: [
      "Cuatro escenarios editables: conservador, base, optimizado y agresivo.",
      "Estacionalidad y contexto de restaurante aplican ajustes automáticos.",
      "Copa y botella se desglosan por separado para un análisis más preciso.",
    ],
    input_title: "Introduce tus datos",
    covers_label: "Cubiertos diarios (media)",
    covers_help: "Número medio de comensales por día.",
    days_label: "Días de apertura al mes",
    penetration_label: "Penetración actual del vino (%)",
    penetration_help: "% de mesas que piden al menos un vino.",
    glass_ticket_label: "Ticket medio por copa (€)",
    glass_ticket_help: "Precio medio de una copa vendida.",
    bottle_ticket_label: "Ticket medio por botella (€)",
    bottle_ticket_help: "Precio medio de una botella vendida.",
    glass_ratio_label: "Ratio actual de venta por copa (%)",
    glass_ratio_help: "% de la facturación de vino que corresponde a copa.",
    season_label: "Estación del año",
    context_label: "Perfil del restaurante",
    summer: "Verano", winter: "Invierno", spring: "Primavera", autumn: "Otoño",
    casual: "Casual", gastro: "Gastronómico", hotel: "Hotel", winebar: "Wine bar",
    simulate_btn: "Simular escenarios",
    results_title: "Escenarios de mejora",
    current_label: "Situación actual",
    tables_wine_month: "Mesas con vino / mes",
    glass_revenue: "Facturación copa",
    bottle_revenue: "Facturación botella",
    total_revenue: "Facturación total vino",
    scenario_label: "Escenario",
    penetration: "Penetración",
    ticket_per_table: "Ticket / mesa",
    glass_ratio: "Ratio copa",
    conservative: "Conservador",
    base: "Base",
    optimized: "Optimizado",
    aggressive: "Agresivo",
    conservative_desc: "Ajustes mínimos: copa accesible, pricing sutil.",
    base_desc: "Optimización de carta con datos: mix, escalera y copa.",
    optimized_desc: "Copa premium + maridaje visible + recomendación activa.",
    aggressive_desc: "Transformación completa: carta, copa, formación y activación dinámica.",
    edit_scenario: "Editar",
    reset_scenario: "Resetear",
    delta_penetration: "Δ Penetración (pp)",
    delta_ticket: "Δ Ticket general (%)",
    delta_glass: "Δ Ratio copa (pp)",
    delta_glass_ticket: "Δ Ticket copa (%)",
    delta_bottle_ticket: "Δ Ticket botella (%)",
    impact_month: "Impacto mensual",
    impact_year: "Impacto anual",
    vs_current: "vs actual",
    new_penetration: "Nueva penetración",
    new_glass_ratio: "Nuevo ratio copa",
    new_glass_ticket: "Nuevo ticket copa",
    new_bottle_ticket: "Nuevo ticket botella",
    reading_title: "Lectura por escenario · Winerim",
    reading_conservative: "Con ajustes mínimos ya se genera un impacto medible. Ideal como primer paso antes de comprometer recursos.",
    reading_base: "La optimización basada en datos es el escenario más rentable en relación esfuerzo/impacto. Copa + escalera de precios es la combinación más eficiente.",
    reading_optimized: "Requiere formación del equipo y copa premium. El retorno es alto pero necesita compromiso operativo.",
    reading_aggressive: "Transformación profunda: carta, copa, equipo y activación dinámica. Solo viable con plataforma de datos como Winerim.",
    season_effect: "Efecto estacional",
    season_effect_desc: "La estacionalidad ajusta penetración, ticket y copa. En verano sube el consumo por copa; en invierno, el gasto por mesa.",
    context_effect: "Efecto de contexto",
    glass_split: "Copa",
    bottle_split: "Botella",
    penetration_level: "Nivel de penetración",
    low: "Bajo", moderate: "Moderado", good: "Bueno", high: "Alto",
    primary_lever: "Palanca prioritaria",
    exec_title: "Lectura ejecutiva · Winerim",
    lowAdvice: "Prioridad: activar programa de copa para captar mesas que hoy no piden vino.",
    modAdvice: "Oportunidad: mejorar mix de gama media-alta para subir ticket sin cambiar penetración.",
    goodAdvice: "Foco: optimizar margen por copa y visibilidad de referencias premium.",
    highAdvice: "Excelente penetración. Foco en incrementar ticket medio con copa premium y maridaje visible.",
    interpret_title: "Cómo interpretar estos escenarios",
    interpret_p1: "Los escenarios son acumulativos: cada nivel añade palancas sobre el anterior. <strong>Conservador</strong> es el mínimo viable. <strong>Agresivo</strong> requiere una plataforma de datos conectada.",
    interpret_p2: "Un 15-25% de mejora es un rango realista para restaurantes que optimizan su carta con datos. Resultados superiores al 30% requieren cambios estructurales significativos.",
    edu_title: "Cómo mejorar el ticket medio en vino",
    edu_items: [
      { title: "Copa premium como palanca", desc: "Una copa entre 8-12€ ancla el valor percibido y hace que la copa estándar parezca una buena opción." },
      { title: "Maridaje visible en carta", desc: "Cada plato principal con un vino sugerido reduce la barrera de decisión. Los restaurantes con maridajes visibles venden un 15-25% más de vino." },
      { title: "Recomendación activa del equipo", desc: "'Con este plato va muy bien este Verdejo, ¿te sirvo una copa?' es la acción de venta más rentable en restauración." },
      { title: "Escalera de precios sin huecos", desc: "Si hay un salto entre tu copa a 5€ y tu botella más barata a 22€, pierdes al cliente que gastaría 8-10€." },
    ],
    mistakes_title: "Errores comunes al intentar subir el ticket medio",
    mistakes: [
      { error: "Subir precios sin dato", fix: "Subir precios sin medir elasticidad puede bajar el volumen. Primero mide, luego ajusta." },
      { error: "Eliminar opciones de entrada", fix: "Los vinos de entrada son la puerta de entrada al vino para el 40% de mesas." },
      { error: "Presionar al camarero para que 'venda más'", fix: "Sin formación ni herramientas, la presión genera incomodidad, no ventas." },
      { error: "Ignorar la copa como palanca", fix: "La copa es la forma más segura de aumentar el % de mesas que piden vino." },
    ],
    faqs: [
      { q: "¿Un 20% de mejora es realista?", a: "Sí, para restaurantes que parten de un ratio de vino bajo (< 40% de mesas) y no tienen estrategia de copa ni recomendación activa. Con optimización de carta + formación de equipo, 15-25% es un rango habitual." },
      { q: "¿Cuánto tarda en notarse el impacto?", a: "Las mejoras de pricing y copa se notan en 2-4 semanas. La formación de equipo genera resultados en 1-2 semanas. Winerim permite medir el impacto desde el primer día." },
      { q: "¿Qué tiene más impacto: más mesas que pidan o mayor gasto por mesa?", a: "Depende de tu punto de partida. Si menos del 35% de mesas pide vino, la prioridad es aumentar el ratio. Si el ratio ya es alto, la palanca es subir el ticket." },
      { q: "¿Winerim calcula esto automáticamente?", a: "Sí. Winerim monitoriza el ticket medio en vino por mesa, el ratio de mesas que piden y la evolución mensual. Además, sugiere acciones concretas para mejorar cada palanca." },
    ],
    cta_title: "Winerim conecta análisis y acción en tiempo real",
    cta_desc: "Winerim Core analiza penetración, mix y copa. La Inteligencia Dinámica activa las recomendaciones del equipo en sala para que el impacto se traduzca en facturación real.",
    cta_link_label: "Ver cómo lo conecta Winerim Core con Inteligencia Dinámica",
    cta_core: "Ver Winerim Core",
    cta_id: "Inteligencia Dinámica",
    decides: [
      "Si la palanca prioritaria es más mesas pidiendo vino o mayor gasto por mesa",
      "Qué escenario (conservador, base, optimizado, agresivo) genera más retorno con tu perfil",
      "Cuánto impacto real tiene cada palanca sobre la facturación mensual",
    ],
    avoids: [
      "Subir precios sin dato de elasticidad ni visibilidad de impacto",
      "Invertir en formación sin saber qué palanca mover primero",
      "Tomar decisiones de carta sin una estimación cuantificada de retorno",
    ],
    impact: [
      "Incremento de facturación mensual estimado y accionable por escenario",
      "Priorización de las palancas con mayor impacto para tu tipo de negocio",
      "Base cuantitativa para justificar inversiones en carta, copa o formación",
    ],
    locale: "es-ES",
    currency: "€",
    link_analyzer: "Analizador de carta gratuito",
    link_ticket_article: "Cómo mejorar el ticket medio con datos",
    link_assortment: "Surtido según ticket medio",
    link_margin: "Calculadora de margen de vino",
    link_core: "Winerim Core: analítica completa",
    link_demo: "Solicitar demo de Winerim",
    perMonth: "/mes",
    perYear: "/año",
  },
  en: {
    seo_title: "Wine Average Ticket Impact Calculator | Winerim Demo",
    seo_desc: "Simulate the impact of wine penetration, by-the-glass vs bottle, and reference mix on your restaurant's average ticket. Free tool.",
    badge: "Demo · Winerim Core",
    h1: "Wine average ticket impact calculator",
    subtitle: "Simulate how your monthly wine revenue changes by improving penetration, reference mix and by-the-glass strategy.",
    bread_tools: "Tools",
    bread_self: "Wine ticket calculator",
    intro_title: "Average ticket doesn't improve just by selling more. It improves with a better mix and better activation.",
    intro_desc: "Winerim helps you simulate the impact of wine penetration, by-the-glass sales, reference mix and wine list visibility on the restaurant's average ticket.",
    summary_label: "What this tool simulates",
    summary_def: "Compare average wine ticket improvement scenarios combining three levers: penetration (% of tables ordering wine), mix (average spend per table) and glass (glass vs bottle ratio).",
    summary_bullets: [
      "Four editable scenarios: conservative, base, optimised, aggressive.",
      "Seasonality and restaurant context apply automatic adjustments.",
      "Glass and bottle are broken down separately for more precise analysis.",
    ],
    input_title: "Enter your data",
    covers_label: "Daily covers (average)",
    covers_help: "Average number of diners per day.",
    days_label: "Opening days per month",
    penetration_label: "Current wine penetration (%)",
    penetration_help: "% of tables ordering at least one wine.",
    glass_ticket_label: "Average glass ticket (€)",
    glass_ticket_help: "Average price of a glass sold.",
    bottle_ticket_label: "Average bottle ticket (€)",
    bottle_ticket_help: "Average price of a bottle sold.",
    glass_ratio_label: "Current by-the-glass ratio (%)",
    glass_ratio_help: "% of wine revenue from by-the-glass sales.",
    season_label: "Season",
    context_label: "Restaurant profile",
    summer: "Summer", winter: "Winter", spring: "Spring", autumn: "Autumn",
    casual: "Casual", gastro: "Gastro", hotel: "Hotel", winebar: "Wine bar",
    simulate_btn: "Simulate scenarios",
    results_title: "Improvement scenarios",
    current_label: "Current situation",
    tables_wine_month: "Tables with wine / month",
    glass_revenue: "Glass revenue",
    bottle_revenue: "Bottle revenue",
    total_revenue: "Total wine revenue",
    scenario_label: "Scenario",
    penetration: "Penetration",
    ticket_per_table: "Ticket / table",
    glass_ratio: "Glass ratio",
    conservative: "Conservative",
    base: "Base",
    optimized: "Optimised",
    aggressive: "Aggressive",
    conservative_desc: "Minimal adjustments: accessible glass, subtle pricing.",
    base_desc: "Data-driven list optimisation: mix, ladder and glass.",
    optimized_desc: "Premium glass + visible pairing + active recommendation.",
    aggressive_desc: "Full transformation: list, glass, training and dynamic activation.",
    edit_scenario: "Edit",
    reset_scenario: "Reset",
    delta_penetration: "Δ Penetration (pp)",
    delta_ticket: "Δ General ticket (%)",
    delta_glass: "Δ Glass ratio (pp)",
    delta_glass_ticket: "Δ Glass ticket (%)",
    delta_bottle_ticket: "Δ Bottle ticket (%)",
    impact_month: "Monthly impact",
    impact_year: "Annual impact",
    vs_current: "vs current",
    new_penetration: "New penetration",
    new_glass_ratio: "New glass ratio",
    new_glass_ticket: "New glass ticket",
    new_bottle_ticket: "New bottle ticket",
    reading_title: "Scenario reading · Winerim",
    reading_conservative: "Minimal adjustments already generate measurable impact. Ideal as a first step before committing resources.",
    reading_base: "Data-based optimisation is the most profitable scenario in terms of effort/impact. Glass + price ladder is the most efficient combination.",
    reading_optimized: "Requires team training and premium glass. Return is high but needs operational commitment.",
    reading_aggressive: "Deep transformation: list, glass, team and dynamic activation. Only viable with a data platform like Winerim.",
    season_effect: "Seasonal effect",
    season_effect_desc: "Seasonality adjusts penetration, ticket and glass. In summer, by-the-glass consumption rises; in winter, spend per table increases.",
    context_effect: "Context effect",
    glass_split: "Glass",
    bottle_split: "Bottle",
    penetration_level: "Penetration level",
    low: "Low", moderate: "Moderate", good: "Good", high: "High",
    primary_lever: "Priority lever",
    exec_title: "Executive reading · Winerim",
    lowAdvice: "Priority: activate by-the-glass programme to capture tables not ordering wine.",
    modAdvice: "Opportunity: improve mid-high range mix to raise ticket without changing penetration.",
    goodAdvice: "Focus: optimise margin per glass and premium reference visibility.",
    highAdvice: "Excellent penetration. Focus on increasing average ticket with premium glass and visible pairings.",
    interpret_title: "How to read these scenarios",
    interpret_p1: "Scenarios are cumulative: each level adds levers on top of the previous one. <strong>Conservative</strong> is the minimum viable. <strong>Aggressive</strong> requires a connected data platform.",
    interpret_p2: "A 15-25% improvement is a realistic range for restaurants optimising their list with data. Results above 30% require significant structural changes.",
    edu_title: "How to improve wine average ticket",
    edu_items: [
      { title: "Premium glass as lever", desc: "A glass at €8-12 anchors perceived value and makes the standard glass feel like a great deal." },
      { title: "Visible pairing on the list", desc: "Each main course with a suggested wine lowers decision barriers. Restaurants with visible pairings sell 15-25% more wine." },
      { title: "Active staff recommendation", desc: "'This Verdejo pairs brilliantly—shall I pour you a glass?' is the most profitable upsell in hospitality." },
      { title: "Seamless price ladder", desc: "A gap between a €5 glass and a €22 cheapest bottle loses the guest who'd spend €8-10." },
    ],
    mistakes_title: "Common mistakes when trying to raise average ticket",
    mistakes: [
      { error: "Raising prices without data", fix: "Raising prices without measuring elasticity may lower volume. Measure first, then adjust." },
      { error: "Removing entry-level options", fix: "Entry-level wines are the gateway to wine for 40% of tables." },
      { error: "Pressuring waiters to 'sell more'", fix: "Without training or tools, pressure creates discomfort, not sales." },
      { error: "Ignoring glass as a lever", fix: "By-the-glass is the safest way to increase the % of tables ordering wine." },
    ],
    faqs: [
      { q: "Is a 20% improvement realistic?", a: "Yes, for restaurants starting with a low wine ratio (< 40% of tables) and no by-the-glass strategy or active recommendation. With list optimisation + team training, 15-25% is a common range." },
      { q: "How long before the impact is noticeable?", a: "Pricing and glass improvements show within 2-4 weeks. Team training yields results in 1-2 weeks. Winerim lets you measure impact from day one." },
      { q: "What has more impact: more tables ordering or higher spend per table?", a: "It depends on your starting point. If less than 35% of tables order wine, the priority is increasing the ratio. If the ratio is already high, the lever is raising the ticket." },
      { q: "Does Winerim calculate this automatically?", a: "Yes. Winerim monitors average wine ticket per table, the percentage of tables ordering, and monthly trends. It also suggests specific actions to improve each lever." },
    ],
    cta_title: "Winerim connects analysis and action in real time",
    cta_desc: "Winerim Core analyses penetration, mix and glass. Dynamic Intelligence activates team recommendations on the floor so impact translates into real revenue.",
    cta_link_label: "See how Winerim Core connects with Dynamic Intelligence",
    cta_core: "See Winerim Core",
    cta_id: "Dynamic Intelligence",
    decides: [
      "Whether the priority lever is more tables ordering wine or higher spend per table",
      "Which scenario (conservative, base, optimised, aggressive) delivers the best return for your profile",
      "How much real impact each lever has on monthly revenue",
    ],
    avoids: [
      "Raising prices without elasticity data or visibility of impact",
      "Investing in training without knowing which lever to pull first",
      "Making wine list decisions without a quantified return estimate",
    ],
    impact: [
      "Estimated and actionable monthly revenue increase per scenario",
      "Prioritisation of the levers with the greatest impact for your business type",
      "Quantitative basis to justify investments in list, glass or training",
    ],
    locale: "en-GB",
    currency: "€",
    link_analyzer: "Free wine list analyser",
    link_ticket_article: "How to improve average ticket with data",
    link_assortment: "Assortment by average ticket",
    link_margin: "Wine margin calculator",
    link_core: "Winerim Core: full analytics",
    link_demo: "Request a Winerim demo",
    perMonth: "/mo",
    perYear: "/yr",
  },
  it: {
    seo_title: "Calcolatrice Impatto Ticket Medio Vino | Demo Winerim",
    seo_desc: "Simula l'impatto della penetrazione del vino, calice vs bottiglia e mix di referenze sullo scontrino medio del tuo ristorante. Strumento gratuito.",
    badge: "Demo · Winerim Core",
    h1: "Calcolatrice di impatto sullo scontrino medio del vino",
    subtitle: "Simula come cambia il fatturato mensile in vino migliorando la penetrazione, il mix di referenze e la strategia al calice.",
    bread_tools: "Strumenti",
    bread_self: "Calcolatrice ticket medio vino",
    intro_title: "Lo scontrino medio non migliora solo vendendo di più. Migliora con un mix migliore e un'attivazione migliore.",
    intro_desc: "Winerim aiuta a simulare l'impatto della penetrazione del vino, della vendita al calice, del mix di referenze e della visibilità della carta sullo scontrino medio del ristorante.",
    summary_label: "Cosa simula questo strumento",
    summary_def: "Confronta scenari di miglioramento dello scontrino medio del vino combinando tre leve: penetrazione, mix e calice.",
    summary_bullets: [
      "Quattro scenari editabili: conservativo, base, ottimizzato e aggressivo.",
      "Stagionalità e contesto del ristorante applicano aggiustamenti automatici.",
      "Calice e bottiglia sono analizzati separatamente per una precisione maggiore.",
    ],
    input_title: "Inserisci i tuoi dati",
    covers_label: "Coperti giornalieri (media)",
    covers_help: "Numero medio di coperti al giorno.",
    days_label: "Giorni di apertura al mese",
    penetration_label: "Penetrazione attuale del vino (%)",
    penetration_help: "% di tavoli che ordinano almeno un vino.",
    glass_ticket_label: "Scontrino medio per calice (€)",
    glass_ticket_help: "Prezzo medio di un calice venduto.",
    bottle_ticket_label: "Scontrino medio per bottiglia (€)",
    bottle_ticket_help: "Prezzo medio di una bottiglia venduta.",
    glass_ratio_label: "Rapporto attuale vendita al calice (%)",
    glass_ratio_help: "% del fatturato vino da vendita al calice.",
    season_label: "Stagione dell'anno",
    context_label: "Profilo del ristorante",
    summer: "Estate", winter: "Inverno", spring: "Primavera", autumn: "Autunno",
    casual: "Casual", gastro: "Gastronomico", hotel: "Hotel", winebar: "Wine bar",
    simulate_btn: "Simula scenari",
    results_title: "Scenari di miglioramento",
    current_label: "Situazione attuale",
    tables_wine_month: "Tavoli con vino / mese",
    glass_revenue: "Fatturato calice",
    bottle_revenue: "Fatturato bottiglia",
    total_revenue: "Fatturato vino totale",
    scenario_label: "Scenario",
    penetration: "Penetrazione",
    ticket_per_table: "Ticket / tavolo",
    glass_ratio: "Rapporto calice",
    conservative: "Conservativo",
    base: "Base",
    optimized: "Ottimizzato",
    aggressive: "Aggressivo",
    conservative_desc: "Aggiustamenti minimi: calice accessibile, pricing sottile.",
    base_desc: "Ottimizzazione carta basata sui dati: mix, scala e calice.",
    optimized_desc: "Calice premium + abbinamento visibile + raccomandazione attiva.",
    aggressive_desc: "Trasformazione completa: carta, calice, formazione e attivazione dinamica.",
    edit_scenario: "Modifica",
    reset_scenario: "Reset",
    delta_penetration: "Δ Penetrazione (pp)",
    delta_ticket: "Δ Ticket generale (%)",
    delta_glass: "Δ Rapporto calice (pp)",
    delta_glass_ticket: "Δ Ticket calice (%)",
    delta_bottle_ticket: "Δ Ticket bottiglia (%)",
    impact_month: "Impatto mensile",
    impact_year: "Impatto annuale",
    vs_current: "vs attuale",
    new_penetration: "Nuova penetrazione",
    new_glass_ratio: "Nuovo rapporto calice",
    new_glass_ticket: "Nuovo ticket calice",
    new_bottle_ticket: "Nuovo ticket bottiglia",
    reading_title: "Lettura per scenario · Winerim",
    reading_conservative: "Con aggiustamenti minimi si genera già un impatto misurabile. Ideale come primo passo prima di impegnare risorse.",
    reading_base: "L'ottimizzazione basata sui dati è lo scenario più redditizio in rapporto sforzo/impatto. Calice + scala prezzi è la combinazione più efficiente.",
    reading_optimized: "Richiede formazione del team e calice premium. Il ritorno è alto ma necessita impegno operativo.",
    reading_aggressive: "Trasformazione profonda: carta, calice, team e attivazione dinamica. Viable solo con piattaforma dati come Winerim.",
    season_effect: "Effetto stagionale",
    season_effect_desc: "La stagionalità aggiusta penetrazione, ticket e calice. In estate sale il consumo al calice; in inverno, la spesa per tavolo.",
    context_effect: "Effetto contesto",
    glass_split: "Calice",
    bottle_split: "Bottiglia",
    penetration_level: "Livello di penetrazione",
    low: "Basso", moderate: "Moderato", good: "Buono", high: "Alto",
    primary_lever: "Leva prioritaria",
    exec_title: "Lettura esecutiva · Winerim",
    lowAdvice: "Priorità: attivare programma al calice per catturare tavoli che oggi non ordinano vino.",
    modAdvice: "Opportunità: migliorare il mix di gamma medio-alta per alzare lo scontrino senza cambiare la penetrazione.",
    goodAdvice: "Focus: ottimizzare il margine per calice e la visibilità delle referenze premium.",
    highAdvice: "Eccellente penetrazione. Focus sull'aumento dello scontrino medio con calice premium e abbinamento visibile.",
    interpret_title: "Come leggere questi scenari",
    interpret_p1: "Gli scenari sono cumulativi: ogni livello aggiunge leve su quello precedente. <strong>Conservativo</strong> è il minimo viabile. <strong>Aggressivo</strong> richiede una piattaforma dati connessa.",
    interpret_p2: "Un miglioramento del 15-25% è un range realistico per ristoranti che ottimizzano la carta con i dati.",
    edu_title: "Come migliorare lo scontrino medio in vino",
    edu_items: [
      { title: "Calice premium come leva", desc: "Un calice a 8-12€ ancora il valore percepito e rende il calice standard un'opzione conveniente." },
      { title: "Abbinamento visibile in carta", desc: "Ogni piatto principale con un vino suggerito abbassa la barriera di decisione." },
      { title: "Raccomandazione attiva del team", desc: "'Con questo piatto va benissimo questo Verdejo, le porto un calice?' è l'azione di vendita più redditizia." },
      { title: "Scala prezzi senza salti", desc: "Se c'è un salto tra un calice a 5€ e la bottiglia più economica a 22€, perdi il cliente che spenderebbe 8-10€." },
    ],
    mistakes_title: "Errori comuni nel tentativo di alzare lo scontrino medio",
    mistakes: [
      { error: "Alzare i prezzi senza dati", fix: "Alzare i prezzi senza misurare l'elasticità può far calare il volume." },
      { error: "Eliminare le opzioni entry-level", fix: "I vini entry-level sono la porta d'ingresso al vino per il 40% dei tavoli." },
      { error: "Pressare il cameriere a 'vendere di più'", fix: "Senza formazione, la pressione genera disagio, non vendite." },
      { error: "Ignorare il calice come leva", fix: "Il calice è il modo più sicuro per aumentare la % di tavoli che ordinano vino." },
    ],
    faqs: [
      { q: "Un miglioramento del 20% è realistico?", a: "Sì, per ristoranti che partono da un rapporto vino basso e non hanno strategia al calice. Con ottimizzazione carta + formazione team, il 15-25% è un range abituale." },
      { q: "Quanto tempo prima di vedere l'impatto?", a: "I miglioramenti di pricing e calice si vedono in 2-4 settimane. Winerim permette di misurare l'impatto dal primo giorno." },
      { q: "Cosa ha più impatto: più tavoli o spesa più alta?", a: "Dipende dal punto di partenza. Se meno del 35% dei tavoli ordina vino, la priorità è aumentare il rapporto." },
      { q: "Winerim calcola questo automaticamente?", a: "Sì. Winerim monitora lo scontrino medio in vino per tavolo e suggerisce azioni concrete per migliorare ogni leva." },
    ],
    cta_title: "Winerim collega analisi e azione in tempo reale",
    cta_desc: "Winerim Core analizza penetrazione, mix e calice. L'Intelligenza Dinamica attiva le raccomandazioni del team in sala.",
    cta_link_label: "Vedi come Winerim Core si collega con l'Intelligenza Dinamica",
    cta_core: "Vedi Winerim Core",
    cta_id: "Intelligenza Dinamica",
    decides: [
      "Se la leva prioritaria è più tavoli che ordinano vino o spesa più alta per tavolo",
      "Quale scenario genera più ritorno per il tuo profilo",
      "Quanto impatto reale ha ogni leva sul fatturato mensile",
    ],
    avoids: [
      "Alzare i prezzi senza dati di elasticità",
      "Investire in formazione senza sapere quale leva muovere",
      "Prendere decisioni di carta senza stima quantificata del ritorno",
    ],
    impact: [
      "Incremento di fatturato mensile stimato e azionabile per scenario",
      "Prioritizzazione delle leve con maggior impatto",
      "Base quantitativa per giustificare investimenti in carta, calice o formazione",
    ],
    locale: "it-IT",
    currency: "€",
    link_analyzer: "Analizzatore carta gratuito",
    link_ticket_article: "Come migliorare lo scontrino medio con i dati",
    link_assortment: "Assortimento per scontrino medio",
    link_margin: "Calcolatrice margini vino",
    link_core: "Winerim Core: analitica completa",
    link_demo: "Richiedi demo di Winerim",
    perMonth: "/mese",
    perYear: "/anno",
  },
  fr: {
    seo_title: "Calculateur d'Impact sur le Ticket Moyen Vin | Démo Winerim",
    seo_desc: "Simulez l'impact de la pénétration du vin, verre vs bouteille et mix de références sur le ticket moyen de votre restaurant. Outil gratuit.",
    badge: "Démo · Winerim Core",
    h1: "Calculateur d'impact sur le ticket moyen vin",
    subtitle: "Simulez comment votre chiffre d'affaires mensuel en vin évolue en améliorant la pénétration, le mix de références et la stratégie au verre.",
    bread_tools: "Outils",
    bread_self: "Calculateur ticket moyen vin",
    intro_title: "Le ticket moyen ne s'améliore pas juste en vendant plus. Il s'améliore avec un meilleur mix et une meilleure activation.",
    intro_desc: "Winerim aide à simuler l'impact de la pénétration du vin, de la vente au verre, du mix de références et de la visibilité de la carte.",
    summary_label: "Ce que cet outil simule",
    summary_def: "Compare des scénarios d'amélioration du ticket moyen vin en combinant trois leviers : pénétration, mix et verre.",
    summary_bullets: [
      "Quatre scénarios éditables : conservateur, base, optimisé et agressif.",
      "Saisonnalité et contexte du restaurant appliquent des ajustements automatiques.",
      "Verre et bouteille sont décomposés séparément pour une analyse plus précise.",
    ],
    input_title: "Entrez vos données",
    covers_label: "Couverts journaliers (moyenne)",
    covers_help: "Nombre moyen de couverts par jour.",
    days_label: "Jours d'ouverture par mois",
    penetration_label: "Pénétration actuelle du vin (%)",
    penetration_help: "% de tables commandant au moins un vin.",
    glass_ticket_label: "Ticket moyen par verre (€)",
    glass_ticket_help: "Prix moyen d'un verre vendu.",
    bottle_ticket_label: "Ticket moyen par bouteille (€)",
    bottle_ticket_help: "Prix moyen d'une bouteille vendue.",
    glass_ratio_label: "Ratio actuel de vente au verre (%)",
    glass_ratio_help: "% du CA vin correspondant au verre.",
    season_label: "Saison",
    context_label: "Profil du restaurant",
    summer: "Été", winter: "Hiver", spring: "Printemps", autumn: "Automne",
    casual: "Casual", gastro: "Gastronomique", hotel: "Hôtel", winebar: "Wine bar",
    simulate_btn: "Simuler les scénarios",
    results_title: "Scénarios d'amélioration",
    current_label: "Situation actuelle",
    tables_wine_month: "Tables avec vin / mois",
    glass_revenue: "CA verre",
    bottle_revenue: "CA bouteille",
    total_revenue: "CA vin total",
    scenario_label: "Scénario",
    penetration: "Pénétration",
    ticket_per_table: "Ticket / table",
    glass_ratio: "Ratio verre",
    conservative: "Conservateur",
    base: "Base",
    optimized: "Optimisé",
    aggressive: "Agressif",
    conservative_desc: "Ajustements minimaux : verre accessible, pricing subtil.",
    base_desc: "Optimisation de carte basée sur les données : mix, échelle et verre.",
    optimized_desc: "Verre premium + accord visible + recommandation active.",
    aggressive_desc: "Transformation complète : carte, verre, formation et activation dynamique.",
    edit_scenario: "Modifier",
    reset_scenario: "Réinitialiser",
    delta_penetration: "Δ Pénétration (pp)",
    delta_ticket: "Δ Ticket général (%)",
    delta_glass: "Δ Ratio verre (pp)",
    delta_glass_ticket: "Δ Ticket verre (%)",
    delta_bottle_ticket: "Δ Ticket bouteille (%)",
    impact_month: "Impact mensuel",
    impact_year: "Impact annuel",
    vs_current: "vs actuel",
    new_penetration: "Nouvelle pénétration",
    new_glass_ratio: "Nouveau ratio verre",
    new_glass_ticket: "Nouveau ticket verre",
    new_bottle_ticket: "Nouveau ticket bouteille",
    reading_title: "Lecture par scénario · Winerim",
    reading_conservative: "Des ajustements minimaux génèrent déjà un impact mesurable. Idéal comme première étape.",
    reading_base: "L'optimisation basée sur les données est le scénario le plus rentable en rapport effort/impact.",
    reading_optimized: "Nécessite formation de l'équipe et verre premium. Le retour est élevé mais demande un engagement opérationnel.",
    reading_aggressive: "Transformation profonde : carte, verre, équipe et activation dynamique. Uniquement viable avec une plateforme de données comme Winerim.",
    season_effect: "Effet saisonnier",
    season_effect_desc: "La saisonnalité ajuste pénétration, ticket et verre. En été, la consommation au verre monte ; en hiver, la dépense par table augmente.",
    context_effect: "Effet de contexte",
    glass_split: "Verre",
    bottle_split: "Bouteille",
    penetration_level: "Niveau de pénétration",
    low: "Bas", moderate: "Modéré", good: "Bon", high: "Élevé",
    primary_lever: "Levier prioritaire",
    exec_title: "Lecture exécutive · Winerim",
    lowAdvice: "Priorité : activer le programme au verre pour capter les tables qui ne commandent pas de vin.",
    modAdvice: "Opportunité : améliorer le mix milieu-haut de gamme pour monter le ticket.",
    goodAdvice: "Focus : optimiser la marge par verre et la visibilité des références premium.",
    highAdvice: "Excellente pénétration. Focus sur l'augmentation du ticket moyen avec verre premium et accords visibles.",
    interpret_title: "Comment lire ces scénarios",
    interpret_p1: "Les scénarios sont cumulatifs : chaque niveau ajoute des leviers. <strong>Conservateur</strong> est le minimum viable. <strong>Agressif</strong> requiert une plateforme de données connectée.",
    interpret_p2: "Une amélioration de 15-25% est une fourchette réaliste pour les restaurants qui optimisent leur carte avec des données.",
    edu_title: "Comment améliorer le ticket moyen vin",
    edu_items: [
      { title: "Verre premium comme levier", desc: "Un verre à 8-12€ ancre la valeur perçue et rend le verre standard attractif." },
      { title: "Accord visible sur la carte", desc: "Chaque plat principal avec un vin suggéré réduit la barrière de décision." },
      { title: "Recommandation active de l'équipe", desc: "'Ce Verdejo accompagne parfaitement ce plat, je vous sers un verre ?' est l'action la plus rentable." },
      { title: "Échelle de prix sans trous", desc: "Un saut entre un verre à 5€ et la bouteille la moins chère à 22€ fait perdre le client." },
    ],
    mistakes_title: "Erreurs courantes en essayant de monter le ticket moyen",
    mistakes: [
      { error: "Monter les prix sans données", fix: "Monter les prix sans mesurer l'élasticité peut faire baisser le volume." },
      { error: "Supprimer les options d'entrée de gamme", fix: "Les vins d'entrée sont la porte d'entrée au vin pour 40% des tables." },
      { error: "Presser le serveur pour qu'il 'vende plus'", fix: "Sans formation, la pression crée du malaise, pas des ventes." },
      { error: "Ignorer le verre comme levier", fix: "Le verre est le moyen le plus sûr d'augmenter le % de tables qui commandent du vin." },
    ],
    faqs: [
      { q: "Une amélioration de 20% est-elle réaliste ?", a: "Oui, pour les restaurants partant d'un ratio vin bas et sans stratégie au verre. Avec optimisation + formation, 15-25% est courant." },
      { q: "Combien de temps avant de voir l'impact ?", a: "Les améliorations au verre se voient en 2-4 semaines. Winerim permet de mesurer dès le premier jour." },
      { q: "Plus de tables ou dépense plus élevée ?", a: "Cela dépend du point de départ. Moins de 35% → augmenter le ratio. Déjà élevé → monter le ticket." },
      { q: "Winerim calcule-t-il cela automatiquement ?", a: "Oui. Winerim surveille le ticket moyen vin par table et suggère des actions concrètes." },
    ],
    cta_title: "Winerim relie analyse et action en temps réel",
    cta_desc: "Winerim Core analyse pénétration, mix et verre. L'Intelligence Dynamique active les recommandations en salle.",
    cta_link_label: "Voir comment Winerim Core se connecte avec l'Intelligence Dynamique",
    cta_core: "Voir Winerim Core",
    cta_id: "Intelligence Dynamique",
    decides: [
      "Si le levier prioritaire est plus de tables ou une dépense plus élevée",
      "Quel scénario génère le meilleur retour pour votre profil",
      "Quel impact réel chaque levier a sur le CA mensuel",
    ],
    avoids: [
      "Monter les prix sans données d'élasticité",
      "Investir dans la formation sans savoir quel levier actionner",
      "Prendre des décisions de carte sans estimation chiffrée du retour",
    ],
    impact: [
      "Augmentation estimée et actionnable du CA mensuel par scénario",
      "Priorisation des leviers avec le plus grand impact",
      "Base quantitative pour justifier les investissements en carte, verre ou formation",
    ],
    locale: "fr-FR",
    currency: "€",
    link_analyzer: "Analyseur de carte gratuit",
    link_ticket_article: "Comment améliorer le ticket moyen avec des données",
    link_assortment: "Assortiment par ticket moyen",
    link_margin: "Calculateur de marge vin",
    link_core: "Winerim Core : analytics complète",
    link_demo: "Demander une démo Winerim",
    perMonth: "/mois",
    perYear: "/an",
  },
};

/* ─── Component ─── */
const CalculadoraTicketMedio = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  /* inputs */
  const [cubiertos, setCubiertos] = useState(120);
  const [diasMes, setDiasMes] = useState(26);
  const [ratioVino, setRatioVino] = useState(35);
  const [glassTicket, setGlassTicket] = useState(7);
  const [bottleTicket, setBottleTicket] = useState(24);
  const [ratioCopa, setRatioCopa] = useState(40);
  const [season, setSeason] = useState<Season>("spring");
  const [context, setContext] = useState<Context>("casual");

  /* editable scenarios */
  const [scenarioOverrides, setScenarioOverrides] = useState<Record<string, ScenarioDeltas>>({});
  const [editingScenario, setEditingScenario] = useState<string | null>(null);

  const getScenario = useCallback((id: string): ScenarioDeltas => {
    return scenarioOverrides[id] || defaultScenarios[id];
  }, [scenarioOverrides]);

  const updateScenarioField = useCallback((id: string, field: keyof ScenarioDeltas, value: number) => {
    setScenarioOverrides(prev => ({
      ...prev,
      [id]: { ...(prev[id] || defaultScenarios[id]), [field]: value },
    }));
  }, []);

  const resetScenario = useCallback((id: string) => {
    setScenarioOverrides(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [calculated, setCalculated] = useState(false);

  /* JSON-LD */
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "calc-ticket-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t.h1,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.seo_desc,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.bread_tools, item: `${CANONICAL_DOMAIN}${localePath("/herramientas")}` },
          { "@type": "ListItem", position: 2, name: t.bread_self, item: `${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-ticket-medio-vino")}` },
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("calc-ticket-jsonld")?.remove(); };
  }, [t, localePath]);

  /* calculations */
  const results = useMemo(() => {
    const sm = seasonMods[season];
    const cm = contextMods[context];
    const mesasMes = cubiertos * diasMes;

    // Effective current values with season + context
    const effPenetration = Math.min(Math.max(ratioVino + sm.penetration + cm.penetration, 5), 95);
    const effGlassTicket = glassTicket * (1 + sm.ticketMod + cm.ticketMod);
    const effBottleTicket = bottleTicket * (1 + sm.ticketMod + cm.ticketMod);
    const effGlassRatio = Math.min(Math.max(ratioCopa + sm.glassMod + cm.glassMod, 0), 100);

    const mesasConVino = Math.round(mesasMes * (effPenetration / 100));

    // Weighted ticket per table based on glass/bottle split
    const weightedTicket = (effGlassRatio / 100) * effGlassTicket + ((100 - effGlassRatio) / 100) * effBottleTicket;
    const facturacionActual = mesasConVino * weightedTicket;
    const glassRev = facturacionActual * (effGlassRatio / 100);
    const bottleRev = facturacionActual - glassRev;

    const scenarioKeys = ["conservative", "base", "optimized", "aggressive"] as const;
    const scenarioResults = scenarioKeys.map(id => {
      const sc = getScenario(id);
      const newPen = Math.min(effPenetration + sc.penetrationDelta, 95);
      const newGlassRatio = Math.min(Math.max(effGlassRatio + sc.glassDelta, 0), 100);
      const newGlassT = effGlassTicket * (1 + sc.glassTicketDelta / 100);
      const newBottleT = effBottleTicket * (1 + sc.bottleTicketDelta / 100);
      const newWeighted = (newGlassRatio / 100) * newGlassT + ((100 - newGlassRatio) / 100) * newBottleT;
      const newMesas = Math.round(mesasMes * (newPen / 100));
      const newRev = newMesas * newWeighted;
      const delta = newRev - facturacionActual;
      const deltaPct = facturacionActual > 0 ? (delta / facturacionActual) * 100 : 0;
      return {
        id,
        label: (t as any)[id],
        desc: (t as any)[`${id}_desc`],
        newPen, newGlassRatio, newGlassT, newBottleT, newWeighted,
        newMesas, newRev,
        delta, deltaYear: delta * 12, deltaPct,
        newGlassRev: newRev * (newGlassRatio / 100),
        newBottleRev: newRev * ((100 - newGlassRatio) / 100),
      };
    });

    return {
      mesasMes, mesasConVino, facturacionActual,
      glassRev, bottleRev,
      effPenetration, effGlassTicket, effBottleTicket, effGlassRatio,
      weightedTicket,
      scenarioResults,
    };
  }, [cubiertos, diasMes, ratioVino, glassTicket, bottleTicket, ratioCopa, season, context, getScenario]);

  const fmt = (n: number) => n.toLocaleString(t.locale, { maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString(t.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmtEur = (n: number) => n.toLocaleString(t.locale, { maximumFractionDigits: 0 }) + t.currency;

  const selected = activeScenario ? results.scenarioResults.find(s => s.id === activeScenario) : null;
  const eduIcons = [GlassWater, Wine, Users, DollarSign];

  const scenarioColors: Record<string, string> = {
    conservative: "border-blue-500/30 bg-blue-500/5",
    base: "border-amber-500/30 bg-amber-500/5",
    optimized: "border-emerald-500/30 bg-emerald-500/5",
    aggressive: "border-wine/30 bg-wine/5",
  };
  const scenarioTextColors: Record<string, string> = {
    conservative: "text-blue-500",
    base: "text-amber-500",
    optimized: "text-emerald-500",
    aggressive: "text-wine",
  };
  const readingKeys: Record<string, string> = {
    conservative: "reading_conservative",
    base: "reading_base",
    optimized: "reading_optimized",
    aggressive: "reading_aggressive",
  };

  const penetrationLevel = results.effPenetration < 25 ? "low" : results.effPenetration < 45 ? "moderate" : results.effPenetration < 65 ? "good" : "high";
  const penetrationLabel = (t as any)[penetrationLevel];
  const penetrationColor = penetrationLevel === "low" ? "text-destructive" : penetrationLevel === "moderate" ? "text-amber-500" : "text-emerald-500";
  const penetrationBg = penetrationLevel === "low" ? "bg-destructive/10" : penetrationLevel === "moderate" ? "bg-amber-500/10" : "bg-emerald-500/10";
  const advice = (t as any)[penetrationLevel === "low" ? "lowAdvice" : penetrationLevel === "moderate" ? "modAdvice" : penetrationLevel === "good" ? "goodAdvice" : "highAdvice"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-ticket-medio-vino")}`}
        hreflang={allLangPaths("/herramientas/calculadora-ticket-medio-vino")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <TrendingUp size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">{t.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.subtitle}</motion.p>
        </div>
      </section>

      {/* DEMO INTRO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-wine/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(var(--wine)/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-wine" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">{t.intro_title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.intro_desc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SummaryBox label={t.summary_label} definition={t.summary_def} bullets={t.summary_bullets} />
      </div>

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Calculator size={20} className="text-wine" /> {t.input_title}
          </h2>

          {/* Row 1: covers + days */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.covers_label}</Label>
              <Input type="number" value={cubiertos} onChange={e => setCubiertos(Number(e.target.value))} className="bg-background" min={1} />
              <p className="text-xs text-muted-foreground mt-1">{t.covers_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.days_label}</Label>
              <Input type="number" value={diasMes} onChange={e => setDiasMes(Number(e.target.value))} className="bg-background" min={1} max={31} />
            </div>
          </div>

          {/* Row 2: penetration slider */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-1.5 block">{t.penetration_label}</Label>
            <div className="flex items-center gap-3">
              <Slider min={5} max={90} step={1} value={[ratioVino]} onValueChange={v => setRatioVino(v[0])} className="flex-1" />
              <span className="text-sm font-semibold w-12 text-right">{ratioVino}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t.penetration_help}</p>
          </div>

          {/* Row 3: glass ticket + bottle ticket + glass ratio */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.glass_ticket_label}</Label>
              <Input type="number" value={glassTicket} onChange={e => setGlassTicket(Number(e.target.value))} className="bg-background" min={1} step={0.5} />
              <p className="text-xs text-muted-foreground mt-1">{t.glass_ticket_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.bottle_ticket_label}</Label>
              <Input type="number" value={bottleTicket} onChange={e => setBottleTicket(Number(e.target.value))} className="bg-background" min={1} step={1} />
              <p className="text-xs text-muted-foreground mt-1">{t.bottle_ticket_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.glass_ratio_label}</Label>
              <div className="flex items-center gap-3">
                <Slider min={0} max={100} step={1} value={[ratioCopa]} onValueChange={v => setRatioCopa(v[0])} className="flex-1" />
                <span className="text-sm font-semibold w-12 text-right">{ratioCopa}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.glass_ratio_help}</p>
            </div>
          </div>

          {/* Row 4: season + context */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <Label className="text-sm font-medium mb-2 block">{t.season_label}</Label>
              <div className="grid grid-cols-4 gap-2">
                {(["spring", "summer", "autumn", "winter"] as Season[]).map(s => {
                  const Icon = seasonIcons[s];
                  return (
                    <button key={s} onClick={() => setSeason(s)}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border text-xs font-medium transition-all ${season === s ? "border-wine/50 bg-wine/5 text-wine" : "border-border bg-background text-muted-foreground hover:border-wine/30"}`}>
                      <Icon size={14} />
                      <span>{(t as any)[s]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">{t.context_label}</Label>
              <div className="grid grid-cols-4 gap-2">
                {(["casual", "gastro", "hotel", "winebar"] as Context[]).map(c => (
                  <button key={c} onClick={() => setContext(c)}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${context === c ? "border-wine/50 bg-wine/5 text-wine" : "border-border bg-background text-muted-foreground hover:border-wine/30"}`}>
                    {(t as any)[c]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={() => { setCalculated(true); setActiveScenario("base"); trackAction("tool_use", "tool", "calculadora-ticket-medio"); }}
            className="w-full bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            {t.simulate_btn}
          </Button>

          {/* RESULTS */}
          {calculated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6">
              <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                <BarChart3 size={18} className="text-wine" /> {t.results_title}
              </h3>

              {/* Current situation */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">{t.current_label}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.tables_wine_month}</p>
                    <p className="font-heading text-lg font-bold">{fmt(results.mesasConVino)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.glass_revenue}</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(results.glassRev)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.bottle_revenue}</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(results.bottleRev)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.total_revenue}</p>
                    <p className="font-heading text-xl font-bold text-wine">{fmtEur(results.facturacionActual)}</p>
                  </div>
                </div>
                {/* Glass vs Bottle bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex gap-0.5 h-6 rounded-lg overflow-hidden">
                    <div className="bg-wine/30 flex items-center justify-center" style={{ width: `${Math.max(results.effGlassRatio, 5)}%` }}>
                      <span className="text-[10px] font-bold text-foreground">{Math.round(results.effGlassRatio)}%</span>
                    </div>
                    <div className="bg-amber-500/20 flex items-center justify-center" style={{ width: `${Math.max(100 - results.effGlassRatio, 5)}%` }}>
                      <span className="text-[10px] font-bold text-foreground">{Math.round(100 - results.effGlassRatio)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{t.glass_split} · {fmtDec(results.effGlassTicket)}{t.currency}</span>
                    <span>{t.bottle_split} · {fmtDec(results.effBottleTicket)}{t.currency}</span>
                  </div>
                </div>
              </div>

              {/* Season + Context effect badges */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-xs">
                  {(() => { const SI = seasonIcons[season]; return <SI size={12} className="text-wine" />; })()}
                  <span className="text-muted-foreground">{t.season_effect}:</span>
                  <span className="font-medium text-foreground">
                    {seasonMods[season].penetration >= 0 ? "+" : ""}{seasonMods[season].penetration}pp pen · {seasonMods[season].ticketMod >= 0 ? "+" : ""}{(seasonMods[season].ticketMod * 100).toFixed(0)}% ticket · {seasonMods[season].glassMod >= 0 ? "+" : ""}{seasonMods[season].glassMod}pp copa
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-xs">
                  <span className="text-muted-foreground">{t.context_effect}:</span>
                  <span className="font-medium text-foreground">
                    {contextMods[context].penetration >= 0 ? "+" : ""}{contextMods[context].penetration}pp · {contextMods[context].ticketMod >= 0 ? "+" : ""}{(contextMods[context].ticketMod * 100).toFixed(0)}% · {contextMods[context].glassMod >= 0 ? "+" : ""}{contextMods[context].glassMod}pp
                  </span>
                </div>
              </div>

              {/* Scenario cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.scenarioResults.map(sc => (
                  <button key={sc.id} onClick={() => setActiveScenario(sc.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeScenario === sc.id ? scenarioColors[sc.id] + " shadow-sm" : "border-border bg-background hover:border-wine/30"}`}>
                    <p className={`text-[10px] font-semibold tracking-wide uppercase mb-1 ${activeScenario === sc.id ? scenarioTextColors[sc.id] : "text-muted-foreground"}`}>{sc.label}</p>
                    <p className="font-heading text-xl font-bold text-foreground">
                      {sc.delta > 0 ? "+" : ""}{fmtEur(sc.delta)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{t.perMonth} · +{sc.deltaPct.toFixed(0)}%</p>
                  </button>
                ))}
              </div>

              {/* Selected scenario detail */}
              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className={`p-6 rounded-2xl border space-y-5 ${scenarioColors[selected.id]}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${scenarioTextColors[selected.id]}`}>{t.scenario_label}: {selected.label}</p>
                        <p className="text-sm text-muted-foreground">{selected.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`font-heading text-3xl font-bold ${scenarioTextColors[selected.id]}`}>+{fmtEur(selected.delta)}</p>
                        <p className="text-xs text-muted-foreground">+{fmtEur(selected.deltaYear)}{t.perYear}</p>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border/50">
                      <div className="text-center p-2 rounded-lg bg-background/50">
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.new_penetration}</p>
                        <p className="font-heading text-lg font-bold">{selected.newPen.toFixed(0)}%</p>
                        <p className={`text-[10px] ${scenarioTextColors[selected.id]}`}>+{getScenario(selected.id).penetrationDelta}pp</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background/50">
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.new_glass_ratio}</p>
                        <p className="font-heading text-lg font-bold">{selected.newGlassRatio.toFixed(0)}%</p>
                        <p className={`text-[10px] ${scenarioTextColors[selected.id]}`}>+{getScenario(selected.id).glassDelta}pp</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background/50">
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.new_glass_ticket}</p>
                        <p className="font-heading text-lg font-bold">{fmtDec(selected.newGlassT)}{t.currency}</p>
                        <p className={`text-[10px] ${scenarioTextColors[selected.id]}`}>+{getScenario(selected.id).glassTicketDelta}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background/50">
                        <p className="text-[10px] text-muted-foreground mb-0.5">{t.new_bottle_ticket}</p>
                        <p className="font-heading text-lg font-bold">{fmtDec(selected.newBottleT)}{t.currency}</p>
                        <p className={`text-[10px] ${scenarioTextColors[selected.id]}`}>+{getScenario(selected.id).bottleTicketDelta}%</p>
                      </div>
                    </div>

                    {/* Glass vs bottle in scenario */}
                    <div className="space-y-1">
                      <div className="flex gap-0.5 h-5 rounded-lg overflow-hidden">
                        <div className="bg-wine/25 flex items-center justify-center" style={{ width: `${Math.max(selected.newGlassRatio, 5)}%` }}>
                          <span className="text-[9px] font-bold text-foreground">{selected.newGlassRatio.toFixed(0)}%</span>
                        </div>
                        <div className="bg-amber-500/15 flex items-center justify-center" style={{ width: `${Math.max(100 - selected.newGlassRatio, 5)}%` }}>
                          <span className="text-[9px] font-bold text-foreground">{(100 - selected.newGlassRatio).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{t.glass_split}: {fmtEur(selected.newGlassRev)}</span>
                        <span>{t.bottle_split}: {fmtEur(selected.newBottleRev)}</span>
                      </div>
                    </div>

                    {/* Edit scenario toggle */}
                    <div className="pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => setEditingScenario(editingScenario === selected.id ? null : selected.id)}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${editingScenario === selected.id ? "text-wine" : "text-muted-foreground hover:text-foreground"}`}>
                          <Pencil size={11} /> {t.edit_scenario}
                        </button>
                        {scenarioOverrides[selected.id] && (
                          <button onClick={() => resetScenario(selected.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                            <RotateCcw size={10} /> {t.reset_scenario}
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {editingScenario === selected.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                              {([
                                ["penetrationDelta", t.delta_penetration],
                                ["ticketDelta", t.delta_ticket],
                                ["glassDelta", t.delta_glass],
                                ["glassTicketDelta", t.delta_glass_ticket],
                                ["bottleTicketDelta", t.delta_bottle_ticket],
                              ] as [keyof ScenarioDeltas, string][]).map(([field, label]) => (
                                <div key={field}>
                                  <Label className="text-[10px] text-muted-foreground mb-1 block">{label}</Label>
                                  <Input type="number" value={getScenario(selected.id)[field]}
                                    onChange={e => updateScenarioField(selected.id, field, Number(e.target.value))}
                                    className="bg-background h-8 text-sm" step={1} />
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Scenario reading */}
                    <div className="rounded-xl border border-amber-500/20 bg-gradient-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={13} className="text-amber-500" />
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-amber-500">{t.reading_title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{(t as any)[readingKeys[selected.id]]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interpretation */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-wine shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">{t.interpret_title}</p>
                    <p dangerouslySetInnerHTML={{ __html: t.interpret_p1 }} />
                    <p className="mt-2">{t.interpret_p2}</p>
                  </div>
                </div>
              </div>

              {/* Executive reading */}
              <div className="rounded-xl border border-amber-500/20 bg-gradient-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500">{t.exec_title}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.total_revenue}</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(results.facturacionActual)}</p>
                    <p className="text-[10px] text-muted-foreground">{fmtEur(results.facturacionActual * 12)}{t.perYear}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.penetration_level}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${penetrationBg} ${penetrationColor}`}>{penetrationLabel}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">{results.effPenetration.toFixed(0)}%</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background text-center">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.primary_lever}</p>
                    <p className="text-xs font-bold text-wine">{results.effPenetration < 40 ? t.glass_split : t.bottle_split + " mix"}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">{t.primary_lever}:</span> {advice}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATIONAL */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">{t.edu_title}</h2>
            <div className="space-y-4">
              {t.edu_items.map((item: any, i: number) => {
                const Icon = eduIcons[i];
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold mb-6">{t.mistakes_title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.mistakes.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-background">
                <p className="text-sm font-bold text-foreground mb-1">❌ {item.error}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">✓ {item.fix}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <FAQSection schemaId="calc-ticket-faq" faqs={t.faqs} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <InternalLinks links={[
          { to: localePath("/analisis-carta"), label: t.link_analyzer, type: "tool" },
          { to: localePath("/article/como-mejorar-ticket-medio-vino-con-datos"), label: t.link_ticket_article, type: "guide" },
          { to: localePath("/guias/como-decidir-surtido-segun-ticket-medio-tipo-local"), label: t.link_assortment, type: "guide" },
          { to: localePath("/calculadora-margen-vino"), label: t.link_margin, type: "tool" },
          { to: localePath("/producto/winerim-core"), label: t.link_core, type: "solution" },
          { to: localePath("/decision-center/margenes-pricing"), label: lang === "es" ? "Decision Center: márgenes y pricing" : "Decision Center: margins & pricing", type: "decision-center" as any },
          { to: localePath("/demo"), label: t.link_demo, type: "solution" },
        ]} />
      </div>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-10 md:p-14">
            <Sparkles size={28} className="text-wine mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.cta_title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm leading-relaxed">{t.cta_desc}</p>
            <p className="text-wine font-semibold text-sm mb-8">{t.cta_link_label}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={localePath("/producto/winerim-core")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {t.cta_core} <ArrowRight size={16} />
              </Link>
              <Link to={localePath("/producto/inteligencia-dinamica")}
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                <Zap size={16} /> {t.cta_id}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CalculadoraTicketMedio;
