import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2, BarChart3, TrendingUp, ArrowRight, Brain, Zap, ShoppingCart,
  Wine, GlassWater, Package, Layers, Target, LineChart, ArrowUpRight, Sprout,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import CTASection from "@/components/CTASection";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n } from "@/i18n/types";

/* ── i18n ──────────────────────────────────────────── */
const i18n: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  platformBadge: string; platformTitle: string; platformSubtitle: string;
  layers: { tag: string; name: string; desc: string; path: string; accent: string }[];
  useCaseBadge: string; useCaseTitle: string; useCaseSubtitle: string;
  solutions: { title: string; desc: string; path: string; icon: string }[];
  diagTitle: string; diagDesc: string; diagLink: string;
  linksTitle: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  es: {
    seoTitle: "Soluciones para Restaurantes | Winerim",
    seoDesc: "Soluciones de gestión de carta de vinos: motor analítico, IA táctica, inteligencia de compras, grupos, pricing, copa y stock.",
    badge: "Soluciones", h1: "Tu carta de vinos, resuelta",
    subtitle: "Winerim combina análisis, inteligencia artificial y datos de compra para que cada decisión sobre tu carta sea mejor que la anterior.",
    platformBadge: "La plataforma",
    platformTitle: "Tres capas, un sistema",
    platformSubtitle: "Cada capa resuelve una parte del problema. Juntas, cubren todo el ciclo del vino en tu restaurante.",
    layers: [
      { tag: "Motor analítico", name: "Winerim Core", desc: "26 módulos que conectan pricing, rotación, stock y equilibrio de carta en un sistema de decisión unificado.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "IA táctica", name: "Inteligencia Dinámica", desc: "La capa que adapta la carta en tiempo real: recomendaciones, destacados y acciones automáticas basadas en tus datos.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Inteligencia de compras", name: "Winerim Supply", desc: "Decide qué seguir comprando, qué renegociar y qué retirar. Comparativa de precios, alertas de sobreprecio y reposición inteligente.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "Por caso de uso",
    useCaseTitle: "Soluciones específicas",
    useCaseSubtitle: "Cada tipo de negocio tiene necesidades distintas. Estas son las más demandadas.",
    solutions: [
      { title: "Grupos de restauración", desc: "Gestión centralizada: control de cartas, precios, surtido y benchmarking interno entre locales.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Cartas amplias y complejas", desc: "Detección de stock muerto, equilibrio de surtido y arquitectura para cartas con alta densidad de referencias.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Cartas con profundidad", desc: "Pricing diferenciado, rotación equilibrada y vino por copa estratégico para cartas que ya tienen complejidad real.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing y márgenes", desc: "Multiplicadores diferenciados, escalera de precios coherente y desviación vs. óptimo por tipología.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Vino por copa", desc: "Estrategia de copeo: pricing, merma, rotación, vida útil y rentabilidad neta por referencia.", path: "/vino-por-copa", icon: "glass" },
      { title: "Stock y rotación", desc: "Capital inmovilizado, coste de oportunidad, plan de liquidación y alertas de obsolescencia.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Aumentar ticket medio", desc: "Penetración de vino, mix botella vs. copa y simulación de escenarios con impacto en facturación.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "¿Tu carta de vinos no vende?",
    diagDesc: "Diagnóstico gratuito de los problemas más comunes que frenan las ventas de vino en restaurantes.",
    diagLink: "Ver diagnóstico",
    linksTitle: "Contenido relacionado",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Winerim sirve para cualquier tipo de restaurante?", a: "Winerim está diseñado para restaurantes, hoteles, wine bars y grupos de restauración con cartas de al menos 80 referencias. Para establecimientos con cartas más contenidas (menos de 80 referencias), las herramientas gratuitas pueden ser un buen punto de partida." },
      { q: "¿Cuánto tiempo lleva implementar una solución?", a: "La implementación básica se completa en 1-5 días. Los resultados de optimización empiezan a ser visibles en las primeras 2-4 semanas." },
      { q: "¿Qué diferencia hay entre Core, Inteligencia Dinámica y Supply?", a: "Core es el motor analítico que diagnostica tu carta. Inteligencia Dinámica es la capa de IA que ejecuta acciones tácticas en tiempo real. Supply se centra en las decisiones de compra y relación con distribuidores. Las tres capas trabajan juntas." },
      { q: "¿Puedo probar antes de comprometerme?", a: "Sí. Puedes usar las herramientas gratuitas, solicitar un análisis sin coste o pedir una demo personalizada antes de decidir." },
    ],
  },
  en: {
    seoTitle: "Solutions for Restaurants | Winerim",
    seoDesc: "Wine list management solutions: analytical engine, tactical AI, purchasing intelligence, groups, pricing, by-the-glass and stock.",
    badge: "Solutions", h1: "Your wine list, solved",
    subtitle: "Winerim combines analytics, AI and purchasing data so every decision about your list is better than the last.",
    platformBadge: "The platform",
    platformTitle: "Three layers, one system",
    platformSubtitle: "Each layer solves part of the problem. Together, they cover the full wine cycle in your restaurant.",
    layers: [
      { tag: "Analytical engine", name: "Winerim Core", desc: "A deep analytical layer connecting pricing, rotation, stock and list balance into a unified decision system.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "Tactical AI", name: "Dynamic Intelligence", desc: "The layer that adapts your list in real time: recommendations, highlights and automated actions based on your data.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Purchasing intelligence", name: "Winerim Supply", desc: "Decide what to keep buying, renegotiate or delist. Price comparison, overpricing alerts and smart restocking.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "By use case",
    useCaseTitle: "Specific solutions",
    useCaseSubtitle: "Every business type has different needs. These are the most in-demand.",
    solutions: [
      { title: "Restaurant groups", desc: "Centralised management: list control, pricing, assortment and internal benchmarking across locations.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Large & complex lists", desc: "Dead stock detection, assortment balance and list architecture for high-density wine lists.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Growing wine lists", desc: "Differentiated pricing, balanced rotation and strategic by-the-glass for lists with real complexity.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing & margins", desc: "Differentiated multipliers, coherent price ladder and deviation vs. optimal by wine type.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Wine by the glass", desc: "Glass strategy: pricing, waste, rotation, shelf life and net profitability per reference.", path: "/vino-por-copa", icon: "glass" },
      { title: "Stock & rotation", desc: "Immobilised capital, opportunity cost, liquidation plan and obsolescence alerts.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Increase average ticket", desc: "Wine penetration, bottle vs. glass mix and scenario simulation with revenue impact.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "Is your wine list not selling?",
    diagDesc: "Free diagnosis of the most common problems holding back wine sales in restaurants.",
    diagLink: "View diagnosis",
    linksTitle: "Related content",
    faqTitle: "FAQ",
    faqs: [
      { q: "Does Winerim work for any type of restaurant?", a: "Winerim is designed for restaurants, hotels, wine bars and restaurant groups with wine lists of at least 80 references. For smaller venues, the free tools can be a good starting point." },
      { q: "How long does implementation take?", a: "Basic implementation is completed in 1-5 days. Optimisation results become visible in the first 2-4 weeks." },
      { q: "What's the difference between Core, Dynamic Intelligence and Supply?", a: "Core is the analytical engine that diagnoses your list. Dynamic Intelligence is the AI layer executing tactical actions in real time. Supply focuses on purchasing decisions and distributor management. All three layers work together." },
      { q: "Can I try before committing?", a: "Yes. You can use the free tools, request a no-cost analysis, or ask for a personalised demo." },
    ],
  },
  it: {
    seoTitle: "Soluzioni per Ristoranti | Winerim",
    seoDesc: "Soluzioni di gestione carta dei vini: motore analitico, IA tattica, intelligenza acquisti, gruppi, pricing, calice e stock.",
    badge: "Soluzioni", h1: "La tua carta dei vini, risolta",
    subtitle: "Winerim combina analisi, intelligenza artificiale e dati d'acquisto perché ogni decisione sulla tua carta sia migliore della precedente.",
    platformBadge: "La piattaforma",
    platformTitle: "Tre livelli, un sistema",
    platformSubtitle: "Ogni livello risolve una parte del problema. Insieme, coprono l'intero ciclo del vino nel tuo ristorante.",
    layers: [
      { tag: "Motore analitico", name: "Winerim Core", desc: "Un livello analitico profondo che collega pricing, rotazione, stock ed equilibrio della carta in un sistema decisionale unificato.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "IA tattica", name: "Intelligenza Dinamica", desc: "Il livello che adatta la carta in tempo reale: raccomandazioni, evidenziazioni e azioni automatiche basate sui tuoi dati.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Intelligenza acquisti", name: "Winerim Supply", desc: "Decidi cosa continuare a comprare, cosa rinegoziare e cosa ritirare. Confronto prezzi, alert sovrapprezzi e riassortimento intelligente.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "Per caso d'uso",
    useCaseTitle: "Soluzioni specifiche",
    useCaseSubtitle: "Ogni tipo di attività ha esigenze diverse. Queste sono le più richieste.",
    solutions: [
      { title: "Gruppi di ristorazione", desc: "Gestione centralizzata: controllo carte, prezzi, assortimento e benchmarking interno tra locali.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Carte ampie e complesse", desc: "Rilevamento stock morto, equilibrio assortimento e architettura per carte ad alta densità di referenze.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Carte con profondità", desc: "Pricing differenziato, rotazione equilibrata e calice strategico per carte con complessità reale.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing e margini", desc: "Moltiplicatori differenziati, scala prezzi coerente e deviazione vs. ottimale per tipologia.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Vino al calice", desc: "Strategia al calice: pricing, scarto, rotazione, vita utile e redditività netta per referenza.", path: "/vino-por-copa", icon: "glass" },
      { title: "Stock e rotazione", desc: "Capitale immobilizzato, costo opportunità, piano di liquidazione e alert di obsolescenza.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Aumentare lo scontrino medio", desc: "Penetrazione vino, mix bottiglia vs. calice e simulazione scenari con impatto sul fatturato.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "La tua carta dei vini non vende?",
    diagDesc: "Diagnosi gratuita dei problemi più comuni che frenano le vendite di vino nei ristoranti.",
    diagLink: "Vedi diagnosi",
    linksTitle: "Contenuti correlati",
    faqTitle: "Domande frequenti",
    faqs: [
      { q: "Winerim funziona per qualsiasi tipo di ristorante?", a: "Winerim è progettato per ristoranti, hotel, wine bar e gruppi di ristorazione con carte di almeno 80 referenze. Per locali con carte più contenute, gli strumenti gratuiti possono essere un buon punto di partenza." },
      { q: "Quanto tempo richiede l'implementazione?", a: "L'implementazione base si completa in 1-5 giorni. I risultati di ottimizzazione diventano visibili nelle prime 2-4 settimane." },
      { q: "Qual è la differenza tra Core, Intelligenza Dinamica e Supply?", a: "Core è il motore analitico che diagnostica la carta. Intelligenza Dinamica è il livello di IA che esegue azioni tattiche in tempo reale. Supply si concentra sulle decisioni d'acquisto. I tre livelli lavorano insieme." },
      { q: "Posso provare prima di impegnarmi?", a: "Sì. Puoi usare gli strumenti gratuiti, richiedere un'analisi senza costi o prenotare una demo personalizzata." },
    ],
  },
  fr: {
    seoTitle: "Solutions pour Restaurants | Winerim",
    seoDesc: "Solutions de gestion de carte des vins : moteur analytique, IA tactique, intelligence d'achats, groupes, pricing, verre et stock.",
    badge: "Solutions", h1: "Votre carte des vins, résolue",
    subtitle: "Winerim combine analytique, IA et données d'achat pour que chaque décision sur votre carte soit meilleure que la précédente.",
    platformBadge: "La plateforme",
    platformTitle: "Trois couches, un système",
    platformSubtitle: "Chaque couche résout une partie du problème. Ensemble, elles couvrent tout le cycle du vin dans votre restaurant.",
    layers: [
      { tag: "Moteur analytique", name: "Winerim Core", desc: "Une couche analytique profonde reliant pricing, rotation, stock et équilibre de la carte dans un système décisionnel unifié.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "IA tactique", name: "Intelligence Dynamique", desc: "La couche qui adapte la carte en temps réel : recommandations, mises en avant et actions automatiques basées sur vos données.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Intelligence d'achats", name: "Winerim Supply", desc: "Décidez quoi continuer d'acheter, quoi renégocier et quoi retirer. Comparatif de prix, alertes de surcoût et réapprovisionnement intelligent.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "Par cas d'usage",
    useCaseTitle: "Solutions spécifiques",
    useCaseSubtitle: "Chaque type d'établissement a des besoins différents. Voici les plus demandées.",
    solutions: [
      { title: "Groupes de restauration", desc: "Gestion centralisée : contrôle des cartes, prix, assortiment et benchmarking interne entre sites.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Cartes larges et complexes", desc: "Détection de stock mort, équilibre d'assortiment et architecture pour cartes à haute densité de références.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Cartes avec profondeur", desc: "Pricing différencié, rotation équilibrée et verre stratégique pour cartes avec une complexité réelle.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing et marges", desc: "Multiplicateurs différenciés, échelle de prix cohérente et écart vs. optimal par type de vin.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Vin au verre", desc: "Stratégie au verre : pricing, perte, rotation, durée de vie et rentabilité nette par référence.", path: "/vino-por-copa", icon: "glass" },
      { title: "Stock et rotation", desc: "Capital immobilisé, coût d'opportunité, plan de liquidation et alertes d'obsolescence.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Augmenter le ticket moyen", desc: "Pénétration vin, mix bouteille vs. verre et simulation de scénarios avec impact sur le CA.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "Votre carte des vins ne vend pas ?",
    diagDesc: "Diagnostic gratuit des problèmes les plus courants qui freinent les ventes de vin dans les restaurants.",
    diagLink: "Voir le diagnostic",
    linksTitle: "Contenu associé",
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Winerim fonctionne-t-il pour tout type de restaurant ?", a: "Winerim est conçu pour les restaurants, hôtels, wine bars et groupes de restauration avec des cartes d'au moins 80 références. Pour les établissements avec des cartes plus réduites, les outils gratuits peuvent être un bon point de départ." },
      { q: "Combien de temps prend l'implémentation ?", a: "L'implémentation de base se fait en 1-5 jours. Les résultats d'optimisation deviennent visibles dans les 2-4 premières semaines." },
      { q: "Quelle est la différence entre Core, Intelligence Dynamique et Supply ?", a: "Core est le moteur analytique qui diagnostique votre carte. Intelligence Dynamique est la couche IA exécutant des actions tactiques en temps réel. Supply se concentre sur les décisions d'achat. Les trois couches fonctionnent ensemble." },
      { q: "Puis-je essayer avant de m'engager ?", a: "Oui. Vous pouvez utiliser les outils gratuits, demander une analyse sans frais ou réserver une démo personnalisée." },
    ],
  },
  de: {
    seoTitle: "Lösungen für Restaurants | Winerim",
    seoDesc: "Weinkarten-Management-Lösungen: analytische Engine, taktische KI, Einkaufsintelligenz, Gruppen, Pricing, Glas und Bestand.",
    badge: "Lösungen", h1: "Ihre Weinkarte, gelöst",
    subtitle: "Winerim verbindet Analytik, KI und Einkaufsdaten, damit jede Entscheidung zu Ihrer Karte besser wird als die vorherige.",
    platformBadge: "Die Plattform",
    platformTitle: "Drei Schichten, ein System",
    platformSubtitle: "Jede Schicht löst einen Teil des Problems. Zusammen decken sie den gesamten Weinzyklus in Ihrem Restaurant ab.",
    layers: [
      { tag: "Analytische Engine", name: "Winerim Core", desc: "Eine tiefgehende Analyseschicht, die Pricing, Rotation, Bestand und Kartenbalance in einem einheitlichen Entscheidungssystem verbindet.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "Taktische KI", name: "Dynamische Intelligenz", desc: "Die Schicht, die die Karte in Echtzeit anpasst: Empfehlungen, Hervorhebungen und automatische Aktionen auf Basis Ihrer Daten.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Einkaufsintelligenz", name: "Winerim Supply", desc: "Entscheiden Sie, was Sie weiter kaufen, was Sie neu verhandeln und was Sie streichen. Preisvergleich, Überpreis-Alarme und intelligentes Nachbestellen.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "Nach Anwendungsfall",
    useCaseTitle: "Spezifische Lösungen",
    useCaseSubtitle: "Jeder Betriebstyp hat unterschiedliche Bedürfnisse. Hier sind die gefragtesten.",
    solutions: [
      { title: "Restaurantgruppen", desc: "Zentrale Verwaltung: Kontrolle der Karten, Preise, des Sortiments und internes Benchmarking zwischen Standorten.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Breite und komplexe Karten", desc: "Erkennung toter Bestände, Sortimentsbalance und Architektur für Karten mit hoher Referenzdichte.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Karten mit Tiefe", desc: "Differenziertes Pricing, ausgewogene Rotation und strategisches Offenausschank für Karten mit echter Komplexität.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing und Margen", desc: "Differenzierte Multiplikatoren, kohärente Preisskala und Abweichung zum Optimum pro Weintyp.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Wein im Glas", desc: "Glas-Strategie: Pricing, Verlust, Rotation, Haltbarkeit und Nettorentabilität pro Referenz.", path: "/vino-por-copa", icon: "glass" },
      { title: "Bestand und Rotation", desc: "Gebundenes Kapital, Opportunitätskosten, Abverkaufsplan und Veralterungsalarme.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Durchschnittsbon erhöhen", desc: "Weindurchdringung, Mix Flasche vs. Glas und Szenariosimulation mit Umsatzeinfluss.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "Verkauft Ihre Weinkarte nicht?",
    diagDesc: "Kostenlose Diagnose der häufigsten Probleme, die den Weinverkauf in Restaurants bremsen.",
    diagLink: "Diagnose ansehen",
    linksTitle: "Verwandte Inhalte",
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Funktioniert Winerim für jeden Restauranttyp?", a: "Winerim ist für Restaurants, Hotels, Weinbars und Restaurantgruppen mit Karten von mindestens 80 Referenzen konzipiert. Für Betriebe mit kleineren Karten sind die kostenlosen Tools ein guter Startpunkt." },
      { q: "Wie lange dauert die Implementierung?", a: "Die Basisimplementierung dauert 1–5 Tage. Optimierungsergebnisse werden in den ersten 2–4 Wochen sichtbar." },
      { q: "Was ist der Unterschied zwischen Core, Dynamischer Intelligenz und Supply?", a: "Core ist die analytische Engine, die Ihre Karte diagnostiziert. Dynamische Intelligenz ist die KI-Schicht, die taktische Aktionen in Echtzeit ausführt. Supply fokussiert sich auf Einkaufsentscheidungen. Alle drei Schichten arbeiten zusammen." },
      { q: "Kann ich es vor einer Verpflichtung testen?", a: "Ja. Sie können die kostenlosen Tools nutzen, eine kostenlose Analyse anfordern oder eine personalisierte Demo buchen." },
    ],
  },
  pt: {
    seoTitle: "Soluções para Restaurantes | Winerim",
    seoDesc: "Soluções de gestão da carta de vinhos: motor analítico, IA tática, inteligência de compras, grupos, pricing, copo e stock.",
    badge: "Soluções", h1: "A sua carta de vinhos, resolvida",
    subtitle: "A Winerim combina análise, IA e dados de compras para que cada decisão sobre a sua carta seja melhor do que a anterior.",
    platformBadge: "A plataforma",
    platformTitle: "Três camadas, um sistema",
    platformSubtitle: "Cada camada resolve uma parte do problema. Juntas, cobrem todo o ciclo do vinho no seu restaurante.",
    layers: [
      { tag: "Motor analítico", name: "Winerim Core", desc: "Uma camada analítica profunda que liga pricing, rotação, stock e equilíbrio da carta num sistema de decisão unificado.", path: "/producto/winerim-core", accent: "wine" },
      { tag: "IA tática", name: "Inteligência Dinâmica", desc: "A camada que adapta a carta em tempo real: recomendações, destaques e ações automáticas com base nos seus dados.", path: "/producto/inteligencia-dinamica", accent: "amber" },
      { tag: "Inteligência de compras", name: "Winerim Supply", desc: "Decida o que continuar a comprar, o que renegociar e o que retirar. Comparativo de preços, alertas de sobrepreço e reabastecimento inteligente.", path: "/producto/winerim-supply", accent: "emerald" },
    ],
    useCaseBadge: "Por caso de uso",
    useCaseTitle: "Soluções específicas",
    useCaseSubtitle: "Cada tipo de estabelecimento tem necessidades diferentes. Estas são as mais procuradas.",
    solutions: [
      { title: "Grupos de restauração", desc: "Gestão centralizada: controlo das cartas, preços, sortido e benchmarking interno entre unidades.", path: "/soluciones/grupos-restauracion", icon: "building" },
      { title: "Cartas amplas e complexas", desc: "Deteção de stock parado, equilíbrio de sortido e arquitetura para cartas com alta densidade de referências.", path: "/soluciones/carta-amplia", icon: "layers" },
      { title: "Cartas com profundidade", desc: "Pricing diferenciado, rotação equilibrada e copo estratégico para cartas com complexidade real.", path: "/soluciones/carta-crecimiento", icon: "sprout" },
      { title: "Pricing e margens", desc: "Multiplicadores diferenciados, escala de preços coerente e desvio vs. ótimo por tipo de vinho.", path: "/carta-de-vinos-rentable", icon: "target" },
      { title: "Vinho a copo", desc: "Estratégia a copo: pricing, perda, rotação, tempo de vida e rentabilidade líquida por referência.", path: "/vino-por-copa", icon: "glass" },
      { title: "Stock e rotação", desc: "Capital imobilizado, custo de oportunidade, plano de liquidação e alertas de obsolescência.", path: "/rotacion-de-vinos", icon: "package" },
      { title: "Aumentar o ticket médio", desc: "Penetração de vinho, mix garrafa vs. copo e simulação de cenários com impacto na faturação.", path: "/soluciones/aumentar-ticket-medio-restaurante", icon: "trending" },
    ],
    diagTitle: "A sua carta de vinhos não vende?",
    diagDesc: "Diagnóstico gratuito dos problemas mais comuns que travam as vendas de vinho nos restaurantes.",
    diagLink: "Ver diagnóstico",
    linksTitle: "Conteúdo relacionado",
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "A Winerim funciona para qualquer tipo de restaurante?", a: "A Winerim está desenhada para restaurantes, hotéis, wine bars e grupos de restauração com cartas de pelo menos 80 referências. Para estabelecimentos com cartas mais reduzidas, as ferramentas gratuitas podem ser um bom ponto de partida." },
      { q: "Quanto tempo demora a implementação?", a: "A implementação base realiza-se em 1 a 5 dias. Os resultados de otimização começam a ser visíveis nas primeiras 2 a 4 semanas." },
      { q: "Qual é a diferença entre Core, Inteligência Dinâmica e Supply?", a: "O Core é o motor analítico que diagnostica a sua carta. A Inteligência Dinâmica é a camada de IA que executa ações táticas em tempo real. A Supply foca-se nas decisões de compra. As três camadas trabalham em conjunto." },
      { q: "Posso experimentar antes de me comprometer?", a: "Sim. Pode usar as ferramentas gratuitas, pedir uma análise sem custo ou marcar uma demo personalizada." },
    ],
  },
};

/* ── Icon resolver ──────────────────────────────────── */
const iconMap: Record<string, typeof Building2> = {
  building: Building2, layers: Layers, target: Target,
  glass: GlassWater, package: Package, trending: TrendingUp, sprout: Sprout,
};

const layerIcons = [Brain, Zap, ShoppingCart];
const layerAccentClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  wine:    { bg: "bg-wine/10", text: "text-wine", border: "border-wine/20", glow: "bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.06),transparent_60%)]" },
  amber:   { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", glow: "bg-[radial-gradient(ellipse_at_top_right,hsl(45_90%_55%/0.06),transparent_60%)]" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", glow: "bg-[radial-gradient(ellipse_at_top_right,hsl(152_60%_50%/0.06),transparent_60%)]" },
};

/* ── Component ──────────────────────────────────────── */
const Soluciones = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/soluciones")}`}
        hreflang={allLangPaths("/soluciones")}
      />
      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.h1 }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-gradient-gold mb-4 block">
              {t.badge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.subtitle}
            </motion.p>
          </div>
        </section>

        {/* ── PLATFORM LAYERS ───────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gradient-gold mb-3">{t.platformBadge}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">{t.platformTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.platformSubtitle}</p>
            </ScrollReveal>

            <div className="grid gap-5">
              {t.layers.map((layer, i) => {
                const Icon = layerIcons[i];
                const ac = layerAccentClasses[layer.accent] || layerAccentClasses.wine;
                return (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <Link
                      to={localePath(layer.path)}
                      className={`group relative bg-gradient-card rounded-xl border ${ac.border} hover:border-opacity-60 transition-all block p-6 md:p-8 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 duration-300`}
                    >
                      <div className={`absolute inset-0 pointer-events-none ${ac.glow}`} />
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        <div className={`w-12 h-12 rounded-xl ${ac.bg} flex items-center justify-center shrink-0`}>
                          <Icon size={22} className={ac.text} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase ${ac.text} opacity-70 block mb-1`}>
                            {layer.tag}
                          </span>
                          <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-foreground transition-colors">{layer.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
                        </div>
                        <ArrowUpRight size={18} className={`${ac.text} opacity-40 group-hover:opacity-100 transition-opacity shrink-0 hidden md:block`} />
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── USE-CASE SOLUTIONS ─────────────────── */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">{t.useCaseBadge}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">{t.useCaseTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.useCaseSubtitle}</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.solutions.map((sol, i) => {
                const Icon = iconMap[sol.icon] || BarChart3;
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <Link
                      to={localePath(sol.path)}
                      className="group bg-gradient-card rounded-xl border border-border hover:border-wine/30 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5 duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/15 transition-colors">
                        <Icon size={18} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">{sol.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sol.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DIAGNOSIS CARD ─────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                  <LineChart size={18} className="text-wine" />
                </div>
                <h2 className="font-heading text-xl font-bold mb-2">{t.diagTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.diagDesc}</p>
                <Link
                  to="/problemas/carta-de-vinos-no-vende"
                  className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors"
                >
                  {t.diagLink} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── CTA ────────────────────────────────── */}
        <CTASection pageType="solutions" />

        {/* ── FAQ ────────────────────────────────── */}
        <FAQSection
          schemaId="soluciones"
          title={t.faqTitle}
          faqs={t.faqs}
        />

        {/* ── INTERNAL LINKS ─────────────────────── */}
        <InternalLinks
          title={t.linksTitle}
          links={[
            { to: localePath("/software-carta-de-vinos") || "/software-carta-de-vinos", label: { es: "Software de carta de vinos inteligente", en: "Smart wine list software", it: "Software intelligente per carta dei vini", fr: "Logiciel intelligent de carte des vins" }[lang]!, type: "solution" },
            { to: "/herramientas", label: { es: "Herramientas gratuitas", en: "Free tools", it: "Strumenti gratuiti", fr: "Outils gratuits" }[lang]!, type: "tool" },
            { to: "/guias-y-recursos", label: { es: "Guías y recursos", en: "Guides & resources", it: "Guide e risorse", fr: "Guides et ressources" }[lang]!, type: "guide" },
            { to: localePath("/casos-exito") || "/casos-exito", label: { es: "Casos de éxito", en: "Case studies", it: "Casi di successo", fr: "Cas clients" }[lang]!, type: "guide" },
            { to: "/benchmarks-playbooks", label: { es: "Benchmarks y playbooks", en: "Benchmarks & playbooks", it: "Benchmark e playbook", fr: "Benchmarks et playbooks" }[lang]!, type: "resource" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Soluciones;
