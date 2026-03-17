import { useState, useMemo, useEffect } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Wine, DollarSign, Users,
  Calculator, Sparkles, Info, BarChart3, GlassWater, Zap,
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

/* ─── i18n ─── */
const i18n: Record<SupportedLang, Record<string, any>> = {
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
      "Cada escenario representa una estrategia distinta: más copa, mejor mix o acción combinada.",
      "Usa tus datos reales de cubiertos, días de apertura y precios.",
      "El resultado es una estimación orientativa. El impacto real depende de la implementación.",
    ],
    input_title: "Introduce tus datos",
    covers_label: "Cubiertos diarios (media)",
    covers_help: "Número medio de comensales por día.",
    days_label: "Días de apertura al mes",
    penetration_label: "Penetración actual del vino (%)",
    penetration_help: "% de mesas que piden al menos un vino (copa o botella).",
    ticket_label: "Ticket medio en vino por mesa (€)",
    ticket_help: "Gasto medio en vino por mesa que sí pide (copas + botellas).",
    glass_ratio_label: "Ratio actual de venta por copa (%)",
    glass_ratio_help: "% de la facturación de vino que corresponde a venta por copa.",
    simulate_btn: "Simular escenarios",
    results_title: "Escenarios de mejora",
    current_label: "Situación actual",
    tables_wine_month: "Mesas con vino / mes",
    ticket_table: "Ticket vino / mesa",
    revenue_month: "Facturación vino / mes",
    scenario_label: "Escenario",
    penetration: "Penetración",
    ticket_per_table: "Ticket / mesa",
    glass_ratio: "Ratio copa",
    interpret_title: "Cómo interpretar estos escenarios",
    interpret_p1: "<strong>Más copa</strong> aumenta la penetración: más mesas acceden al vino a través de la copa. <strong>Mejor mix</strong> sube el ticket medio por mesa optimizando la escalera de precios y la visibilidad de gama media-alta. <strong>Copa + mix + sala</strong> combina ambas palancas con recomendación activa del equipo.",
    interpret_p2: "Un 15-25% de mejora es un rango realista para restaurantes que optimizan su carta con datos. Resultados superiores al 30% requieren cambios estructurales significativos.",
    edu_title: "Cómo mejorar el ticket medio en vino",
    edu_items: [
      { title: "Copa premium como palanca", desc: "Una copa entre 8-12€ ancla el valor percibido y hace que la copa estándar parezca una buena opción. No necesita venderse mucho para cumplir su función." },
      { title: "Maridaje visible en carta", desc: "Cada plato principal con un vino sugerido reduce la barrera de decisión. Los restaurantes con maridajes visibles venden un 15-25% más de vino." },
      { title: "Recomendación activa del equipo", desc: "'Con este plato va muy bien este Verdejo, ¿te sirvo una copa?' es la acción de venta más rentable en restauración." },
      { title: "Escalera de precios sin huecos", desc: "Si hay un salto entre tu copa a 5€ y tu botella más barata a 22€, pierdes al cliente que gastaría 8-10€." },
    ],
    mistakes_title: "Errores comunes al intentar subir el ticket medio",
    mistakes: [
      { error: "Subir precios sin dato", fix: "Subir precios sin medir elasticidad puede bajar el volumen. Primero mide, luego ajusta." },
      { error: "Eliminar opciones de entrada", fix: "Los vinos de entrada no son un problema: son la puerta de entrada al vino para el 40% de mesas." },
      { error: "Presionar al camarero para que 'venda más'", fix: "Sin formación ni herramientas, la presión genera incomodidad, no ventas." },
      { error: "Ignorar la copa como palanca", fix: "La copa es la forma más segura de aumentar el % de mesas que piden vino." },
    ],
    faqs: [
      { q: "¿Un 20% de mejora es realista?", a: "Sí, para restaurantes que parten de un ratio de vino bajo (< 40% de mesas) y no tienen estrategia de copa ni recomendación activa. Con optimización de carta + formación de equipo, 15-25% es un rango habitual." },
      { q: "¿Cuánto tarda en notarse el impacto?", a: "Las mejoras de pricing y copa se notan en 2-4 semanas. La formación de equipo genera resultados en 1-2 semanas. Winerim permite medir el impacto desde el primer día." },
      { q: "¿Qué tiene más impacto: más mesas que pidan o mayor gasto por mesa?", a: "Depende de tu punto de partida. Si menos del 35% de mesas pide vino, la prioridad es aumentar el ratio (a través de copa y accesibilidad). Si el ratio ya es alto, la palanca es subir el ticket (copa premium, maridajes, recomendación)." },
      { q: "¿Winerim calcula esto automáticamente?", a: "Sí. Winerim monitoriza el ticket medio en vino por mesa, el ratio de mesas que piden y la evolución mensual. Además, sugiere acciones concretas para mejorar cada palanca." },
    ],
    cta_title: "Winerim conecta análisis y acción en tiempo real",
    cta_desc: "Winerim Core analiza penetración, mix y copa. La Inteligencia Dinámica activa las recomendaciones del equipo en sala para que el impacto se traduzca en facturación real.",
    cta_core: "Ver Winerim Core",
    cta_id: "Inteligencia Dinámica",
    decides: [
      "Si la palanca prioritaria es más mesas pidiendo vino o mayor gasto por mesa",
      "Qué escenario (copa, mix o combinado) genera más retorno con tu perfil",
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
    sc_none: "Sin cambios",
    sc_glass: "Más copa",
    sc_mix: "Mejor mix",
    sc_full: "Copa + mix + sala",
    sc_none_desc: "Situación actual sin intervención.",
    sc_glass_desc: "Ampliar oferta de copa para captar mesas que no pedían vino.",
    sc_mix_desc: "Mejorar la escalera de precios y visibilidad de gama media-alta.",
    sc_full_desc: "Combinación de copa, mix y recomendación activa del equipo.",
    locale: "es-ES",
    currency: "€",
    link_analyzer: "Analizador de carta gratuito",
    link_ticket_article: "Cómo mejorar el ticket medio con datos",
    link_assortment: "Surtido según ticket medio",
    link_margin: "Calculadora de margen de vino",
    link_core: "Winerim Core: analítica completa",
    link_demo: "Solicitar demo de Winerim",
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
      "Each scenario represents a different strategy: more glass, better mix or combined action.",
      "Use your real data for covers, opening days and prices.",
      "Results are indicative estimates. Actual impact depends on implementation.",
    ],
    input_title: "Enter your data",
    covers_label: "Daily covers (average)",
    covers_help: "Average number of diners per day.",
    days_label: "Opening days per month",
    penetration_label: "Current wine penetration (%)",
    penetration_help: "% of tables ordering at least one wine (glass or bottle).",
    ticket_label: "Average wine ticket per table (€)",
    ticket_help: "Average wine spend per table that does order (glasses + bottles).",
    glass_ratio_label: "Current by-the-glass ratio (%)",
    glass_ratio_help: "% of wine revenue from by-the-glass sales.",
    simulate_btn: "Simulate scenarios",
    results_title: "Improvement scenarios",
    current_label: "Current situation",
    tables_wine_month: "Tables with wine / month",
    ticket_table: "Wine ticket / table",
    revenue_month: "Wine revenue / month",
    scenario_label: "Scenario",
    penetration: "Penetration",
    ticket_per_table: "Ticket / table",
    glass_ratio: "Glass ratio",
    interpret_title: "How to read these scenarios",
    interpret_p1: "<strong>More glass</strong> increases penetration: more tables access wine through by-the-glass. <strong>Better mix</strong> raises ticket per table by optimising the price ladder and mid-high range visibility. <strong>Glass + mix + staff</strong> combines both levers with active team recommendations.",
    interpret_p2: "A 15-25% improvement is a realistic range for restaurants that optimise their list with data. Results above 30% require significant structural changes.",
    edu_title: "How to improve wine average ticket",
    edu_items: [
      { title: "Premium glass as lever", desc: "A glass at €8-12 anchors perceived value and makes the standard glass feel like a great deal. It doesn't need to sell much to work." },
      { title: "Visible pairing on the list", desc: "Each main course with a suggested wine lowers decision barriers. Restaurants with visible pairings sell 15-25% more wine." },
      { title: "Active staff recommendation", desc: "'This Verdejo pairs brilliantly with this dish—shall I pour you a glass?' is the most profitable upsell in hospitality." },
      { title: "Seamless price ladder", desc: "A gap between a €5 glass and a €22 cheapest bottle loses the guest who'd spend €8-10." },
    ],
    mistakes_title: "Common mistakes when trying to raise average ticket",
    mistakes: [
      { error: "Raising prices without data", fix: "Raising prices without measuring elasticity may lower volume. Measure first, then adjust." },
      { error: "Removing entry-level options", fix: "Entry-level wines aren't a problem—they're the gateway to wine for 40% of tables." },
      { error: "Pressuring waiters to 'sell more'", fix: "Without training or tools, pressure creates discomfort, not sales." },
      { error: "Ignoring glass as a lever", fix: "By-the-glass is the safest way to increase the % of tables ordering wine." },
    ],
    faqs: [
      { q: "Is a 20% improvement realistic?", a: "Yes, for restaurants starting with a low wine ratio (< 40% of tables) and no by-the-glass strategy or active recommendation. With list optimisation + team training, 15-25% is a common range." },
      { q: "How long before the impact is noticeable?", a: "Pricing and glass improvements show within 2-4 weeks. Team training yields results in 1-2 weeks. Winerim lets you measure impact from day one." },
      { q: "What has more impact: more tables ordering or higher spend per table?", a: "It depends on your starting point. If less than 35% of tables order wine, the priority is increasing the ratio (through glass and accessibility). If the ratio is already high, the lever is raising the ticket (premium glass, pairings, recommendation)." },
      { q: "Does Winerim calculate this automatically?", a: "Yes. Winerim monitors average wine ticket per table, the percentage of tables ordering, and monthly trends. It also suggests specific actions to improve each lever." },
    ],
    cta_title: "Winerim connects analysis and action in real time",
    cta_desc: "Winerim Core analyses penetration, mix and glass. Dynamic Intelligence activates team recommendations on the floor so impact translates into real revenue.",
    cta_core: "See Winerim Core",
    cta_id: "Dynamic Intelligence",
    decides: [
      "Whether the priority lever is more tables ordering wine or higher spend per table",
      "Which scenario (glass, mix or combined) delivers the best return for your profile",
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
    sc_none: "No changes",
    sc_glass: "More glass",
    sc_mix: "Better mix",
    sc_full: "Glass + mix + staff",
    sc_none_desc: "Current situation with no intervention.",
    sc_glass_desc: "Expand by-the-glass offering to capture tables that weren't ordering wine.",
    sc_mix_desc: "Improve the price ladder and mid-high range visibility.",
    sc_full_desc: "Combination of glass, mix and active staff recommendation.",
    locale: "en-GB",
    currency: "€",
    link_analyzer: "Free wine list analyser",
    link_ticket_article: "How to improve average ticket with data",
    link_assortment: "Assortment by average ticket",
    link_margin: "Wine margin calculator",
    link_core: "Winerim Core: full analytics",
    link_demo: "Request a Winerim demo",
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
    summary_def: "Confronta scenari di miglioramento dello scontrino medio del vino combinando tre leve: penetrazione (% di tavoli che ordinano vino), mix (spesa media per tavolo) e calice (rapporto calice vs bottiglia).",
    summary_bullets: [
      "Ogni scenario rappresenta una strategia diversa: più calice, mix migliore o azione combinata.",
      "Usa i tuoi dati reali di coperti, giorni di apertura e prezzi.",
      "Il risultato è una stima orientativa. L'impatto reale dipende dall'implementazione.",
    ],
    input_title: "Inserisci i tuoi dati",
    covers_label: "Coperti giornalieri (media)",
    covers_help: "Numero medio di coperti al giorno.",
    days_label: "Giorni di apertura al mese",
    penetration_label: "Penetrazione attuale del vino (%)",
    penetration_help: "% di tavoli che ordinano almeno un vino (calice o bottiglia).",
    ticket_label: "Scontrino medio vino per tavolo (€)",
    ticket_help: "Spesa media in vino per tavolo che ordina (calici + bottiglie).",
    glass_ratio_label: "Rapporto attuale vendita al calice (%)",
    glass_ratio_help: "% del fatturato vino da vendita al calice.",
    simulate_btn: "Simula scenari",
    results_title: "Scenari di miglioramento",
    current_label: "Situazione attuale",
    tables_wine_month: "Tavoli con vino / mese",
    ticket_table: "Ticket vino / tavolo",
    revenue_month: "Fatturato vino / mese",
    scenario_label: "Scenario",
    penetration: "Penetrazione",
    ticket_per_table: "Ticket / tavolo",
    glass_ratio: "Rapporto calice",
    interpret_title: "Come leggere questi scenari",
    interpret_p1: "<strong>Più calice</strong> aumenta la penetrazione: più tavoli accedono al vino attraverso il calice. <strong>Mix migliore</strong> alza lo scontrino per tavolo ottimizzando la scala prezzi e la visibilità della gamma media-alta. <strong>Calice + mix + sala</strong> combina entrambe le leve con la raccomandazione attiva del team.",
    interpret_p2: "Un miglioramento del 15-25% è un range realistico per ristoranti che ottimizzano la carta con i dati. Risultati superiori al 30% richiedono cambiamenti strutturali significativi.",
    edu_title: "Come migliorare lo scontrino medio in vino",
    edu_items: [
      { title: "Calice premium come leva", desc: "Un calice a 8-12€ ancora il valore percepito e rende il calice standard un'opzione conveniente. Non ha bisogno di vendere molto per funzionare." },
      { title: "Abbinamento visibile in carta", desc: "Ogni piatto principale con un vino suggerito abbassa la barriera di decisione. I ristoranti con abbinamenti visibili vendono il 15-25% di vino in più." },
      { title: "Raccomandazione attiva del team", desc: "'Con questo piatto va benissimo questo Verdejo, le porto un calice?' è l'azione di vendita più redditizia nella ristorazione." },
      { title: "Scala prezzi senza salti", desc: "Se c'è un salto tra un calice a 5€ e la bottiglia più economica a 22€, perdi il cliente che spenderebbe 8-10€." },
    ],
    mistakes_title: "Errori comuni nel tentativo di alzare lo scontrino medio",
    mistakes: [
      { error: "Alzare i prezzi senza dati", fix: "Alzare i prezzi senza misurare l'elasticità può far calare il volume. Prima misura, poi aggiusta." },
      { error: "Eliminare le opzioni entry-level", fix: "I vini entry-level non sono un problema: sono la porta d'ingresso al vino per il 40% dei tavoli." },
      { error: "Pressare il cameriere a 'vendere di più'", fix: "Senza formazione né strumenti, la pressione genera disagio, non vendite." },
      { error: "Ignorare il calice come leva", fix: "Il calice è il modo più sicuro per aumentare la % di tavoli che ordinano vino." },
    ],
    faqs: [
      { q: "Un miglioramento del 20% è realistico?", a: "Sì, per ristoranti che partono da un rapporto vino basso (< 40% dei tavoli) e non hanno strategia al calice né raccomandazione attiva. Con ottimizzazione carta + formazione team, il 15-25% è un range abituale." },
      { q: "Quanto tempo prima di vedere l'impatto?", a: "I miglioramenti di pricing e calice si vedono in 2-4 settimane. La formazione del team dà risultati in 1-2 settimane. Winerim permette di misurare l'impatto dal primo giorno." },
      { q: "Cosa ha più impatto: più tavoli che ordinano o spesa più alta per tavolo?", a: "Dipende dal punto di partenza. Se meno del 35% dei tavoli ordina vino, la priorità è aumentare il rapporto (tramite calice e accessibilità). Se il rapporto è già alto, la leva è alzare lo scontrino (calice premium, abbinamenti, raccomandazione)." },
      { q: "Winerim calcola questo automaticamente?", a: "Sì. Winerim monitora lo scontrino medio in vino per tavolo, la percentuale di tavoli che ordinano e l'evoluzione mensile. Inoltre suggerisce azioni concrete per migliorare ogni leva." },
    ],
    cta_title: "Winerim collega analisi e azione in tempo reale",
    cta_desc: "Winerim Core analizza penetrazione, mix e calice. L'Intelligenza Dinamica attiva le raccomandazioni del team in sala perché l'impatto si traduca in fatturato reale.",
    cta_core: "Vedi Winerim Core",
    cta_id: "Intelligenza Dinamica",
    decides: [
      "Se la leva prioritaria è più tavoli che ordinano vino o spesa più alta per tavolo",
      "Quale scenario (calice, mix o combinato) genera più ritorno per il tuo profilo",
      "Quanto impatto reale ha ogni leva sul fatturato mensile",
    ],
    avoids: [
      "Alzare i prezzi senza dati di elasticità né visibilità di impatto",
      "Investire in formazione senza sapere quale leva muovere per prima",
      "Prendere decisioni di carta senza una stima quantificata del ritorno",
    ],
    impact: [
      "Incremento di fatturato mensile stimato e azionabile per scenario",
      "Prioritizzazione delle leve con maggior impatto per il tuo tipo di business",
      "Base quantitativa per giustificare investimenti in carta, calice o formazione",
    ],
    sc_none: "Nessun cambiamento",
    sc_glass: "Più calice",
    sc_mix: "Mix migliore",
    sc_full: "Calice + mix + sala",
    sc_none_desc: "Situazione attuale senza intervento.",
    sc_glass_desc: "Ampliare l'offerta al calice per catturare tavoli che non ordinavano vino.",
    sc_mix_desc: "Migliorare la scala prezzi e la visibilità della gamma media-alta.",
    sc_full_desc: "Combinazione di calice, mix e raccomandazione attiva del team.",
    locale: "it-IT",
    currency: "€",
    link_analyzer: "Analizzatore carta gratuito",
    link_ticket_article: "Come migliorare lo scontrino medio con i dati",
    link_assortment: "Assortimento per scontrino medio",
    link_margin: "Calcolatrice margini vino",
    link_core: "Winerim Core: analitica completa",
    link_demo: "Richiedi demo di Winerim",
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
    intro_desc: "Winerim aide à simuler l'impact de la pénétration du vin, de la vente au verre, du mix de références et de la visibilité de la carte sur le ticket moyen du restaurant.",
    summary_label: "Ce que cet outil simule",
    summary_def: "Compare des scénarios d'amélioration du ticket moyen vin en combinant trois leviers : pénétration (% de tables commandant du vin), mix (dépense moyenne par table) et verre (ratio verre vs bouteille).",
    summary_bullets: [
      "Chaque scénario représente une stratégie différente : plus de verre, meilleur mix ou action combinée.",
      "Utilisez vos données réelles de couverts, jours d'ouverture et prix.",
      "Le résultat est une estimation indicative. L'impact réel dépend de la mise en œuvre.",
    ],
    input_title: "Entrez vos données",
    covers_label: "Couverts journaliers (moyenne)",
    covers_help: "Nombre moyen de couverts par jour.",
    days_label: "Jours d'ouverture par mois",
    penetration_label: "Pénétration actuelle du vin (%)",
    penetration_help: "% de tables commandant au moins un vin (verre ou bouteille).",
    ticket_label: "Ticket moyen vin par table (€)",
    ticket_help: "Dépense moyenne en vin par table qui commande (verres + bouteilles).",
    glass_ratio_label: "Ratio actuel de vente au verre (%)",
    glass_ratio_help: "% du CA vin correspondant à la vente au verre.",
    simulate_btn: "Simuler les scénarios",
    results_title: "Scénarios d'amélioration",
    current_label: "Situation actuelle",
    tables_wine_month: "Tables avec vin / mois",
    ticket_table: "Ticket vin / table",
    revenue_month: "CA vin / mois",
    scenario_label: "Scénario",
    penetration: "Pénétration",
    ticket_per_table: "Ticket / table",
    glass_ratio: "Ratio verre",
    interpret_title: "Comment lire ces scénarios",
    interpret_p1: "<strong>Plus de verre</strong> augmente la pénétration : plus de tables accèdent au vin par le verre. <strong>Meilleur mix</strong> fait monter le ticket par table en optimisant l'échelle de prix et la visibilité du milieu-haut de gamme. <strong>Verre + mix + salle</strong> combine les deux leviers avec la recommandation active de l'équipe.",
    interpret_p2: "Une amélioration de 15-25% est une fourchette réaliste pour les restaurants qui optimisent leur carte avec des données. Des résultats supérieurs à 30% nécessitent des changements structurels importants.",
    edu_title: "Comment améliorer le ticket moyen vin",
    edu_items: [
      { title: "Verre premium comme levier", desc: "Un verre à 8-12€ ancre la valeur perçue et rend le verre standard attractif. Il n'a pas besoin de se vendre beaucoup pour remplir sa fonction." },
      { title: "Accord visible sur la carte", desc: "Chaque plat principal avec un vin suggéré réduit la barrière de décision. Les restaurants avec des accords visibles vendent 15-25% de vin en plus." },
      { title: "Recommandation active de l'équipe", desc: "'Ce Verdejo accompagne parfaitement ce plat, je vous sers un verre ?' est l'action de vente la plus rentable en restauration." },
      { title: "Échelle de prix sans trous", desc: "S'il y a un saut entre un verre à 5€ et la bouteille la moins chère à 22€, vous perdez le client qui dépenserait 8-10€." },
    ],
    mistakes_title: "Erreurs courantes en essayant de monter le ticket moyen",
    mistakes: [
      { error: "Monter les prix sans données", fix: "Monter les prix sans mesurer l'élasticité peut faire baisser le volume. Mesurez d'abord, ajustez ensuite." },
      { error: "Supprimer les options d'entrée de gamme", fix: "Les vins d'entrée ne sont pas un problème : ils sont la porte d'entrée au vin pour 40% des tables." },
      { error: "Presser le serveur pour qu'il 'vende plus'", fix: "Sans formation ni outils, la pression crée du malaise, pas des ventes." },
      { error: "Ignorer le verre comme levier", fix: "Le verre est le moyen le plus sûr d'augmenter le % de tables qui commandent du vin." },
    ],
    faqs: [
      { q: "Une amélioration de 20% est-elle réaliste ?", a: "Oui, pour les restaurants partant d'un ratio vin bas (< 40% des tables) et sans stratégie au verre ni recommandation active. Avec optimisation de carte + formation d'équipe, 15-25% est une fourchette courante." },
      { q: "Combien de temps avant de voir l'impact ?", a: "Les améliorations de pricing et verre se voient en 2-4 semaines. La formation d'équipe donne des résultats en 1-2 semaines. Winerim permet de mesurer l'impact dès le premier jour." },
      { q: "Qu'est-ce qui a le plus d'impact : plus de tables ou dépense plus élevée par table ?", a: "Cela dépend de votre point de départ. Si moins de 35% des tables commandent du vin, la priorité est d'augmenter le ratio (via le verre et l'accessibilité). Si le ratio est déjà élevé, le levier est de monter le ticket (verre premium, accords, recommandation)." },
      { q: "Winerim calcule-t-il cela automatiquement ?", a: "Oui. Winerim surveille le ticket moyen vin par table, le pourcentage de tables qui commandent et l'évolution mensuelle. Il suggère aussi des actions concrètes pour améliorer chaque levier." },
    ],
    cta_title: "Winerim relie analyse et action en temps réel",
    cta_desc: "Winerim Core analyse pénétration, mix et verre. L'Intelligence Dynamique active les recommandations de l'équipe en salle pour que l'impact se traduise en chiffre d'affaires réel.",
    cta_core: "Voir Winerim Core",
    cta_id: "Intelligence Dynamique",
    decides: [
      "Si le levier prioritaire est plus de tables commandant du vin ou une dépense plus élevée par table",
      "Quel scénario (verre, mix ou combiné) génère le meilleur retour pour votre profil",
      "Quel impact réel chaque levier a sur le CA mensuel",
    ],
    avoids: [
      "Monter les prix sans données d'élasticité ni visibilité d'impact",
      "Investir dans la formation sans savoir quel levier actionner en premier",
      "Prendre des décisions de carte sans estimation chiffrée du retour",
    ],
    impact: [
      "Augmentation estimée et actionnable du CA mensuel par scénario",
      "Priorisation des leviers avec le plus grand impact pour votre type d'établissement",
      "Base quantitative pour justifier les investissements en carte, verre ou formation",
    ],
    sc_none: "Pas de changement",
    sc_glass: "Plus de verre",
    sc_mix: "Meilleur mix",
    sc_full: "Verre + mix + salle",
    sc_none_desc: "Situation actuelle sans intervention.",
    sc_glass_desc: "Élargir l'offre au verre pour capter les tables qui ne commandaient pas de vin.",
    sc_mix_desc: "Améliorer l'échelle de prix et la visibilité du milieu-haut de gamme.",
    sc_full_desc: "Combinaison du verre, du mix et de la recommandation active de l'équipe.",
    locale: "fr-FR",
    currency: "€",
    link_analyzer: "Analyseur de carte gratuit",
    link_ticket_article: "Comment améliorer le ticket moyen avec des données",
    link_assortment: "Assortiment par ticket moyen",
    link_margin: "Calculateur de marge vin",
    link_core: "Winerim Core : analytics complète",
    link_demo: "Demander une démo Winerim",
  },
};

const CalculadoraTicketMedio = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const scenarios = [
    { id: "base", label: t.sc_none, deltaRatio: 0, deltaTicket: 0, deltaCopa: 0, desc: t.sc_none_desc },
    { id: "copa", label: t.sc_glass, deltaRatio: 5, deltaTicket: 0, deltaCopa: 15, desc: t.sc_glass_desc },
    { id: "mix", label: t.sc_mix, deltaRatio: 0, deltaTicket: 15, deltaCopa: 0, desc: t.sc_mix_desc },
    { id: "full", label: t.sc_full, deltaRatio: 8, deltaTicket: 20, deltaCopa: 10, desc: t.sc_full_desc },
  ];

  const [cubiertos, setCubiertos] = useState(120);
  const [diasMes, setDiasMes] = useState(26);
  const [ratioVino, setRatioVino] = useState(35);
  const [ticketVinoActual, setTicketVinoActual] = useState(8);
  const [ratioCopa, setRatioCopa] = useState(40);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [calculated, setCalculated] = useState(false);

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

  const results = useMemo(() => {
    const mesasMes = cubiertos * diasMes;
    const mesasConVino = Math.round(mesasMes * (ratioVino / 100));
    const facturacionActual = mesasConVino * ticketVinoActual;

    const scenarioResults = scenarios.map(sc => {
      const nuevoRatio = Math.min(ratioVino + sc.deltaRatio, 90);
      const nuevoTicket = ticketVinoActual * (1 + sc.deltaTicket / 100);
      const nuevoCopa = Math.min(ratioCopa + sc.deltaCopa, 100);
      const mesasNuevo = Math.round(mesasMes * (nuevoRatio / 100));
      const facNueva = mesasNuevo * nuevoTicket;
      const incrementoMes = facNueva - facturacionActual;
      const incrementoPct = facturacionActual > 0 ? (incrementoMes / facturacionActual) * 100 : 0;
      return {
        ...sc,
        nuevoRatio, nuevoTicket, nuevoCopa, mesasNuevo, facNueva,
        incrementoMes, incrementoAnual: incrementoMes * 12, incrementoPct,
      };
    });

    return { mesasMes, mesasConVino, facturacionActual, scenarioResults };
  }, [cubiertos, diasMes, ratioVino, ticketVinoActual, ratioCopa, scenarios]);

  const fmt = (n: number) => n.toLocaleString(t.locale, { maximumFractionDigits: 0 });
  const fmtEur = (n: number) => n.toLocaleString(t.locale, { maximumFractionDigits: 0 }) + t.currency;

  const selected = activeScenario ? results.scenarioResults.find(s => s.id === activeScenario) : null;
  const eduIcons = [GlassWater, Wine, Users, DollarSign];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`${CANONICAL_DOMAIN}${localePath("/herramientas/calculadora-ticket-medio-vino")}`} />
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
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Calculator size={20} className="text-wine" /> {t.input_title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.covers_label}</Label>
              <Input type="number" value={cubiertos} onChange={e => setCubiertos(Number(e.target.value))} className="bg-background" min={1} />
              <p className="text-xs text-muted-foreground mt-1">{t.covers_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.days_label}</Label>
              <Input type="number" value={diasMes} onChange={e => setDiasMes(Number(e.target.value))} className="bg-background" min={1} max={31} />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.penetration_label}</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={5} max={90} value={ratioVino} onChange={e => setRatioVino(Number(e.target.value))} className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioVino}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.penetration_help}</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">{t.ticket_label}</Label>
              <Input type="number" value={ticketVinoActual} onChange={e => setTicketVinoActual(Number(e.target.value))} className="bg-background" min={1} step={0.5} />
              <p className="text-xs text-muted-foreground mt-1">{t.ticket_help}</p>
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-1.5 block">{t.glass_ratio_label}</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={ratioCopa} onChange={e => setRatioCopa(Number(e.target.value))} className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioCopa}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.glass_ratio_help}</p>
            </div>
          </div>

          <Button onClick={() => { setCalculated(true); setActiveScenario("full"); }}
            className="w-full bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            {t.simulate_btn}
          </Button>

          {calculated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
              <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                <BarChart3 size={18} className="text-wine" /> {t.results_title}
              </h3>

              <div className="p-5 rounded-xl border border-border bg-background">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">{t.current_label}</p>
                <div className="grid grid-cols-3 gap-4 text-sm text-center">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.tables_wine_month}</p>
                    <p className="font-heading text-lg font-bold">{fmt(results.mesasConVino)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.ticket_table}</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(ticketVinoActual)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.revenue_month}</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(results.facturacionActual)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.scenarioResults.filter(s => s.id !== "base").map(sc => (
                  <button key={sc.id} onClick={() => setActiveScenario(sc.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeScenario === sc.id ? "border-wine/50 bg-wine/5 shadow-sm" : "border-border bg-background hover:border-wine/30"}`}>
                    <p className="text-xs font-semibold tracking-wide uppercase text-wine mb-1">{sc.label}</p>
                    <p className="font-heading text-xl font-bold text-foreground">
                      {sc.incrementoMes > 0 ? "+" : ""}{fmtEur(sc.incrementoMes)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">/{lang === "es" ? "mes" : lang === "fr" ? "mois" : lang === "it" ? "mese" : "mo"} · +{sc.incrementoPct.toFixed(0)}%</p>
                  </button>
                ))}
              </div>

              {selected && selected.id !== "base" && (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl border border-wine/20 bg-wine/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-1">{t.scenario_label}: {selected.label}</p>
                      <p className="text-sm text-muted-foreground">{selected.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-wine">+{fmtEur(selected.incrementoMes)}</p>
                      <p className="text-xs text-muted-foreground">+{fmtEur(selected.incrementoAnual)}/{lang === "es" ? "año" : lang === "fr" ? "an" : lang === "it" ? "anno" : "yr"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-wine/10">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">{t.penetration}</p>
                      <p className="font-heading text-lg font-bold">{selected.nuevoRatio}%</p>
                      {selected.deltaRatio > 0 && <p className="text-[11px] text-wine">+{selected.deltaRatio}pp</p>}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">{t.ticket_per_table}</p>
                      <p className="font-heading text-lg font-bold">{fmtEur(Math.round(selected.nuevoTicket * 100) / 100)}</p>
                      {selected.deltaTicket > 0 && <p className="text-[11px] text-wine">+{selected.deltaTicket}%</p>}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">{t.glass_ratio}</p>
                      <p className="font-heading text-lg font-bold">{selected.nuevoCopa}%</p>
                      {selected.deltaCopa > 0 && <p className="text-[11px] text-wine">+{selected.deltaCopa}pp</p>}
                    </div>
                  </div>
                </motion.div>
              )}

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

              {/* ── Winerim Executive Reading ── */}
              {(() => {
                const el: Record<string, { title: string; primaryLever: string; glassSplit: string; bottleSplit: string; glassRevenue: string; bottleRevenue: string; totalWineRevenue: string; perYear: string; penetrationLevel: string; low: string; moderate: string; good: string; high: string; lowAdvice: string; modAdvice: string; goodAdvice: string; highAdvice: string }> = {
                  es: { title: "Lectura ejecutiva · Winerim", primaryLever: "Palanca prioritaria", glassSplit: "Copa", bottleSplit: "Botella", glassRevenue: "Facturación copa", bottleRevenue: "Facturación botella", totalWineRevenue: "Facturación vino total", perYear: "/año", penetrationLevel: "Nivel de penetración", low: "Bajo", moderate: "Moderado", good: "Bueno", high: "Alto", lowAdvice: "Prioridad: activar programa de copa para captar mesas que hoy no piden vino.", modAdvice: "Oportunidad: mejorar mix de gama media-alta para subir ticket sin cambiar penetración.", goodAdvice: "Foco: optimizar margen por copa y visibilidad de referencias premium.", highAdvice: "Excelente penetración. Foco en incrementar ticket medio con copa premium y maridaje visible." },
                  en: { title: "Executive reading · Winerim", primaryLever: "Priority lever", glassSplit: "Glass", bottleSplit: "Bottle", glassRevenue: "Glass revenue", bottleRevenue: "Bottle revenue", totalWineRevenue: "Total wine revenue", perYear: "/yr", penetrationLevel: "Penetration level", low: "Low", moderate: "Moderate", good: "Good", high: "High", lowAdvice: "Priority: activate by-the-glass programme to capture tables not ordering wine.", modAdvice: "Opportunity: improve mid-high range mix to raise ticket without changing penetration.", goodAdvice: "Focus: optimise margin per glass and premium reference visibility.", highAdvice: "Excellent penetration. Focus on increasing average ticket with premium glass and visible pairings." },
                  it: { title: "Lettura esecutiva · Winerim", primaryLever: "Leva prioritaria", glassSplit: "Calice", bottleSplit: "Bottiglia", glassRevenue: "Fatturato calice", bottleRevenue: "Fatturato bottiglia", totalWineRevenue: "Fatturato vino totale", perYear: "/anno", penetrationLevel: "Livello di penetrazione", low: "Basso", moderate: "Moderato", good: "Buono", high: "Alto", lowAdvice: "Priorità: attivare programma al calice per catturare tavoli che oggi non ordinano vino.", modAdvice: "Opportunità: migliorare il mix di gamma medio-alta per alzare lo scontrino senza cambiare la penetrazione.", goodAdvice: "Focus: ottimizzare il margine per calice e la visibilità delle referenze premium.", highAdvice: "Eccellente penetrazione. Focus sull'aumento dello scontrino medio con calice premium e abbinamento visibile." },
                  fr: { title: "Lecture exécutive · Winerim", primaryLever: "Levier prioritaire", glassSplit: "Verre", bottleSplit: "Bouteille", glassRevenue: "CA verre", bottleRevenue: "CA bouteille", totalWineRevenue: "CA vin total", perYear: "/an", penetrationLevel: "Niveau de pénétration", low: "Bas", moderate: "Modéré", good: "Bon", high: "Élevé", lowAdvice: "Priorité : activer le programme au verre pour capter les tables qui ne commandent pas de vin.", modAdvice: "Opportunité : améliorer le mix milieu-haut de gamme pour monter le ticket sans changer la pénétration.", goodAdvice: "Focus : optimiser la marge par verre et la visibilité des références premium.", highAdvice: "Excellente pénétration. Focus sur l'augmentation du ticket moyen avec verre premium et accords visibles." },
                };
                const e = el[lang] || el.es;

                const glassRev = results.facturacionActual * (ratioCopa / 100);
                const bottleRev = results.facturacionActual - glassRev;
                const annualRev = results.facturacionActual * 12;
                const penetrationLevel = ratioVino < 25 ? "low" : ratioVino < 45 ? "moderate" : ratioVino < 65 ? "good" : "high";
                const penetrationLabel = penetrationLevel === "low" ? e.low : penetrationLevel === "moderate" ? e.moderate : penetrationLevel === "good" ? e.good : e.high;
                const penetrationColor = penetrationLevel === "low" ? "text-destructive" : penetrationLevel === "moderate" ? "text-amber-500" : "text-emerald-500";
                const penetrationBg = penetrationLevel === "low" ? "bg-destructive/10" : penetrationLevel === "moderate" ? "bg-amber-500/10" : "bg-emerald-500/10";
                const advice = penetrationLevel === "low" ? e.lowAdvice : penetrationLevel === "moderate" ? e.modAdvice : penetrationLevel === "good" ? e.goodAdvice : e.highAdvice;

                const glassWidth = ratioCopa;
                const bottleWidth = 100 - ratioCopa;

                return (
                  <div className="rounded-xl border border-amber-500/20 bg-gradient-card p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-500" />
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500">{e.title}</p>
                    </div>

                    {/* Glass vs Bottle split bar */}
                    <div className="space-y-2">
                      <div className="flex gap-0.5 h-8 rounded-lg overflow-hidden">
                        <div className="bg-wine/30 flex items-center justify-center" style={{ width: `${Math.max(glassWidth, 5)}%` }}>
                          <span className="text-[10px] font-bold text-foreground">{ratioCopa}%</span>
                        </div>
                        <div className="bg-amber-500/20 flex items-center justify-center" style={{ width: `${Math.max(bottleWidth, 5)}%` }}>
                          <span className="text-[10px] font-bold text-foreground">{100 - ratioCopa}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{e.glassSplit}: {fmtEur(glassRev)}</span>
                        <span>{e.bottleSplit}: {fmtEur(bottleRev)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg border border-border bg-background text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{e.totalWineRevenue}</p>
                        <p className="font-heading text-lg font-bold">{fmtEur(results.facturacionActual)}</p>
                        <p className="text-[10px] text-muted-foreground">{fmtEur(annualRev)}{e.perYear}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border bg-background text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{e.penetrationLevel}</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${penetrationBg} ${penetrationColor}`}>{penetrationLabel}</span>
                        <p className="text-[10px] text-muted-foreground mt-1">{ratioVino}%</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border bg-background text-center">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{e.primaryLever}</p>
                        <p className="text-xs font-bold text-wine">{ratioVino < 40 ? e.glassSplit : e.bottleSplit + " mix"}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">{e.primaryLever}:</span> {advice}</p>
                    </div>
                  </div>
                );
              })()}
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
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">{t.cta_desc}</p>
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
