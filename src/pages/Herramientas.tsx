import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, Utensils, Wine, TrendingUp, DollarSign, Search, GlassWater, RotateCcw, ClipboardList, ArrowRight, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import SummaryBox from "@/components/seo/SummaryBox";
import MethodologyBox from "@/components/seo/MethodologyBox";
import FAQSection from "@/components/seo/FAQSection";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  useTool: string; guidesTitle: string; ctaTitle: string; ctaDesc: string; ctaBtn1: string; ctaBtn2: string;
  tools: { to: string; title: string; desc: string; tag: string }[];
  guides: { to: string; label: string }[];
}> = {
  es: {
    seoTitle: "Herramientas gratuitas para carta de vinos",
    seoDesc: "Calculadoras, analizadores y generadores gratuitos para tu carta de vinos. Como cliente de Winerim, todo esto va automatizado.",
    badge: "Herramientas gratuitas", h1: "Optimiza tu carta de vinos",
    subtitle: "Prueba gratis estas herramientas de análisis, pricing y maridaje. La buena noticia: como cliente de Winerim, todo esto se ejecuta automáticamente — sin trabajo manual, sin perder tiempo, con resultados desde el día uno.",
    useTool: "Probar gratis →", guidesTitle: "Guías relacionadas",
    ctaTitle: "¿Y si todo esto fuese automático?",
    ctaDesc: "Con Winerim, no necesitas usar estas herramientas una por una. Nuestra plataforma analiza tu carta, optimiza precios, sugiere maridajes y controla la rotación — todo en automático. Ahorra horas de gestión cada semana y aumenta tus ventas de vino.",
    ctaBtn1: "Analizar mi carta gratis", ctaBtn2: "Solicitar demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizador de carta de vinos", desc: "Sube tu carta y recibe un análisis con recomendaciones de mejora. Con Winerim, este análisis se actualiza automáticamente cada semana.", tag: "Análisis" },
      { to: "/calculadora-margen-vino", title: "Calculadora de márgenes de vino", desc: "Calcula el margen óptimo para cada referencia. Como cliente de Winerim, los márgenes se optimizan automáticamente según tus objetivos.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculadora de precio por copa", desc: "Calcula el precio ideal por copa. Winerim lo calcula por ti y te alerta cuando conviene ajustar precios.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Herramienta de pricing de vinos", desc: "Optimiza la estructura de precios de tu carta. Con Winerim, el pricing inteligente se aplica en tiempo real.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generador de maridajes con IA", desc: "Genera sugerencias de maridaje con IA. Con Winerim, tus camareros reciben recomendaciones automáticas en cada servicio.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculadora de ROI", desc: "Calcula el potencial de mejora al digitalizar tu carta. Los resultados varían según el tipo de restaurante y la implementación.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark de cartas de vinos", desc: "Compara tu carta con los estándares del sector. Winerim te envía informes automáticos con tu posición competitiva.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Diagnóstico de vino por copa", desc: "Evalúa si tu oferta por copa está equilibrada en estilos, precios y rentabilidad. Con Winerim, esto se monitoriza en tiempo real.", tag: "Diagnóstico" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audita tu carta con un score de 0 a 100. Estructura, equilibrio, pricing, copa, rotación y potencial comercial en un solo diagnóstico.", tag: "Auditoría" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Calculadora de stock muerto", desc: "Estima el capital inmovilizado en vinos sin rotación. Winerim lo detecta automáticamente y te alerta antes de que se acumule.", tag: "Gestión" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Calculadora de impacto en ticket medio", desc: "Estima cuánto más facturarías en vino mejorando el ratio de mesas, el ticket por mesa y la estrategia de copa.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Auditor de carta multi-local", desc: "Compara la carta de vinos de tus locales: surtido, pricing, copa y ticket medio. Detecta inconsistencias y oportunidades.", tag: "Grupos" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Calculadora de compra inteligente", desc: "Analiza si una referencia merece seguir comprándose: rentabilidad, sobreprecio, stock inmovilizado y oportunidad de mejora. Demo de Winerim Supply.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino en un restaurante" },
      { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta de vinos rentable" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping para restaurantes" },
    ],
  },
  en: {
    seoTitle: "Free Wine List Tools for Restaurants",
    seoDesc: "Free calculators, analyzers and generators for your wine list. As a Winerim client, all of this is automated.",
    badge: "Free tools", h1: "Optimize your wine list",
    subtitle: "Try these analysis, pricing and pairing tools for free. The good news: as a Winerim client, all of this runs automatically — no manual work, no wasted time, results from day one.",
    useTool: "Try free →", guidesTitle: "Related guides",
    ctaTitle: "What if all of this were automatic?",
    ctaDesc: "With Winerim, you don't need to use these tools one by one. Our platform analyzes your list, optimizes prices, suggests pairings and controls rotation — all automatically. Save hours of management every week and increase wine sales.",
    ctaBtn1: "Analyze my list free", ctaBtn2: "Request demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Wine List Analyzer", desc: "Upload your list and get improvement recommendations. With Winerim, this analysis updates automatically every week.", tag: "Analysis" },
      { to: "/calculadora-margen-vino", title: "Wine Margin Calculator", desc: "Calculate the optimal margin for each reference. As a Winerim client, margins are optimized automatically based on your goals.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "By-the-Glass Price Calculator", desc: "Calculate the ideal price per glass. Winerim calculates it for you and alerts you when to adjust prices.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Wine Pricing Tool", desc: "Optimize your entire pricing structure. With Winerim, smart pricing is applied in real time.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "AI Pairing Generator", desc: "Generate AI pairing suggestions. With Winerim, your waitstaff get automatic recommendations every service.", tag: "AI" },
      { to: "/wine-roi-calculator", title: "ROI Calculator", desc: "Calculate the potential improvement from digitizing your list. Results vary by restaurant type and implementation.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Wine List Benchmark", desc: "Compare your list against industry standards. Winerim sends you automatic reports with your competitive position.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "By-the-Glass Diagnostic", desc: "Evaluate if your by-the-glass offering is balanced in styles, prices and profitability.", tag: "Diagnostic" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audit your wine list with a 0-100 score across structure, balance, pricing, rotation and commercial potential.", tag: "Audit" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Dead Stock Calculator", desc: "Estimate tied-up capital in slow-moving wines. Winerim detects this automatically.", tag: "Management" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Average Ticket Impact Calculator", desc: "Estimate how much more wine revenue you could generate by improving table ratio, ticket per table and glass strategy.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Multi-Unit Wine List Auditor", desc: "Compare wine lists across your locations: assortment, pricing, by-the-glass and average ticket. Detect inconsistencies and opportunities.", tag: "Groups" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Smart Purchase Calculator", desc: "Analyze if a wine reference is worth buying: profitability, overpricing, tied-up stock and improvement opportunity. Winerim Supply demo.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "How to price wine in a restaurant" },
      { to: "/vino-por-copa-restaurante", label: "Wine by the glass in restaurants" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "How to design a profitable wine list" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Wine mapping template for restaurants" },
    ],
  },
  it: {
    seoTitle: "Strumenti Gratuiti per la Carta dei Vini",
    seoDesc: "Calcolatrici, analizzatori e generatori gratuiti per la tua carta dei vini. Come cliente Winerim, tutto è automatizzato.",
    badge: "Strumenti gratuiti", h1: "Ottimizza la tua carta dei vini",
    subtitle: "Prova gratis questi strumenti di analisi, pricing e abbinamento. La buona notizia: come cliente Winerim, tutto funziona in automatico — senza lavoro manuale, senza perdere tempo, con risultati dal primo giorno.",
    useTool: "Prova gratis →", guidesTitle: "Guide correlate",
    ctaTitle: "E se tutto fosse automatico?",
    ctaDesc: "Con Winerim, non devi usare questi strumenti uno per uno. La nostra piattaforma analizza la tua carta, ottimizza i prezzi, suggerisce abbinamenti e controlla la rotazione — tutto in automatico. Risparmia ore di gestione ogni settimana e aumenta le vendite di vino.",
    ctaBtn1: "Analizza la mia carta gratis", ctaBtn2: "Richiedi demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizzatore carta dei vini", desc: "Carica la tua carta e ricevi raccomandazioni di miglioramento. Con Winerim, questa analisi si aggiorna automaticamente ogni settimana.", tag: "Analisi" },
      { to: "/calculadora-margen-vino", title: "Calcolatrice margini vino", desc: "Calcola il margine ottimale per ogni referenza. Come cliente Winerim, i margini si ottimizzano automaticamente.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calcolatrice prezzo al calice", desc: "Calcola il prezzo ideale al calice. Winerim lo calcola per te e ti avvisa quando conviene aggiustare i prezzi.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Strumento pricing vini", desc: "Ottimizza la struttura prezzi della tua carta. Con Winerim, il pricing intelligente si applica in tempo reale.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generatore abbinamenti IA", desc: "Genera suggerimenti di abbinamento con IA. Con Winerim, il personale riceve raccomandazioni automatiche ad ogni servizio.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calcolatrice ROI", desc: "Calcola il potenziale di miglioramento digitalizzando la tua carta. I risultati variano in base al tipo di ristorante.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark carte dei vini", desc: "Confronta la tua carta con gli standard del settore. Winerim ti invia report automatici con la tua posizione competitiva.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Diagnostica vino al calice", desc: "Valuta se la tua offerta al calice è equilibrata in stili, prezzi e redditività.", tag: "Diagnostica" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audita la tua carta con un punteggio 0-100 su struttura, equilibrio, pricing e potenziale commerciale.", tag: "Audit" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Calcolatrice stock morto", desc: "Stima il capitale immobilizzato in vini a bassa rotazione.", tag: "Gestione" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Calcolatrice impatto scontrino medio", desc: "Stima quanto in più potresti fatturare in vino migliorando il rapporto tavoli, lo scontrino per tavolo e la strategia al calice.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Auditor carta multi-locale", desc: "Confronta la carta dei vini dei tuoi locali: assortimento, pricing, calice e scontrino medio. Rileva incoerenze e opportunità.", tag: "Gruppi" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Calcolatrice acquisto intelligente", desc: "Analizza se una referenza vale la pena: redditività, sovrapprezzo, stock immobilizzato e opportunità di miglioramento. Demo di Winerim Supply.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Come prezzare il vino al ristorante" },
      { to: "/vino-por-copa-restaurante", label: "Vino al calice nei ristoranti" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Come progettare una carta dei vini redditizia" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Template wine mapping per ristoranti" },
    ],
  },
  fr: {
    seoTitle: "Outils Gratuits pour la Carte des Vins",
    seoDesc: "Calculateurs, analyseurs et générateurs gratuits pour votre carte des vins. En tant que client Winerim, tout est automatisé.",
    badge: "Outils gratuits", h1: "Optimisez votre carte des vins",
    subtitle: "Essayez gratuitement ces outils d'analyse, pricing et accords. La bonne nouvelle : en tant que client Winerim, tout fonctionne automatiquement — sans travail manuel, sans perte de temps, avec des résultats dès le premier jour.",
    useTool: "Essayer gratuitement →", guidesTitle: "Guides associés",
    ctaTitle: "Et si tout était automatique ?",
    ctaDesc: "Avec Winerim, pas besoin d'utiliser ces outils un par un. Notre plateforme analyse votre carte, optimise les prix, suggère des accords et contrôle la rotation — tout automatiquement. Économisez des heures de gestion chaque semaine et augmentez vos ventes de vin.",
    ctaBtn1: "Analyser ma carte gratuitement", ctaBtn2: "Demander une démo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analyseur de carte des vins", desc: "Téléchargez votre carte et recevez des recommandations. Avec Winerim, cette analyse se met à jour automatiquement chaque semaine.", tag: "Analyse" },
      { to: "/calculadora-margen-vino", title: "Calculateur de marges vin", desc: "Calculez la marge optimale pour chaque référence. En tant que client Winerim, les marges s'optimisent automatiquement.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculateur prix au verre", desc: "Calculez le prix idéal au verre. Winerim le calcule pour vous et vous alerte quand il faut ajuster les prix.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Outil de pricing vins", desc: "Optimisez la structure de prix de votre carte. Avec Winerim, le pricing intelligent s'applique en temps réel.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Générateur d'accords IA", desc: "Générez des suggestions d'accords avec l'IA. Avec Winerim, votre personnel reçoit des recommandations automatiques à chaque service.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculateur de ROI", desc: "Calculez combien vous pouvez gagner en digitalisant votre carte. Nos clients augmentent leurs ventes de vin de 30% en moyenne.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark cartes des vins", desc: "Comparez votre carte aux standards du secteur. Winerim vous envoie des rapports automatiques avec votre position concurrentielle.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Diagnostic vin au verre", desc: "Évaluez si votre offre au verre est équilibrée en styles, prix et rentabilité.", tag: "Diagnostic" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Auditez votre carte avec un score de 0 à 100 sur la structure, l'équilibre, le pricing et le potentiel commercial.", tag: "Audit" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Calculateur stock mort", desc: "Estimez le capital immobilisé dans les vins à faible rotation.", tag: "Gestion" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Calculateur impact ticket moyen", desc: "Estimez combien vous pourriez facturer en plus en vin en améliorant le ratio de tables, le ticket par table et la stratégie au verre.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Auditeur carte multi-sites", desc: "Comparez la carte des vins de vos établissements : assortiment, pricing, verre et ticket moyen. Détectez incohérences et opportunités.", tag: "Groupes" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Calculateur achat intelligent", desc: "Analysez si une référence vaut la peine : rentabilité, surcoût, stock immobilisé et opportunité d'amélioration. Démo de Winerim Supply.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Comment fixer le prix du vin au restaurant" },
      { to: "/vino-por-copa-restaurante", label: "Vin au verre dans les restaurants" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Comment concevoir une carte des vins rentable" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Template wine mapping pour restaurants" },
    ],
  },
  de: {
    seoTitle: "Kostenlose Tools für die Weinkarte",
    seoDesc: "Kostenlose Rechner, Analyse- und Generator-Tools für Ihre Weinkarte. Als Winerim-Kunde läuft alles automatisch.",
    badge: "Kostenlose Tools", h1: "Optimieren Sie Ihre Weinkarte",
    subtitle: "Testen Sie kostenlos diese Analyse-, Pricing- und Weinbegleitungs-Tools. Die gute Nachricht: Als Winerim-Kunde läuft alles automatisch — ohne manuelle Arbeit, ohne Zeitverlust, mit Ergebnissen ab dem ersten Tag.",
    useTool: "Kostenlos testen →", guidesTitle: "Verwandte Ratgeber",
    ctaTitle: "Was wäre, wenn all das automatisch liefe?",
    ctaDesc: "Mit Winerim müssen Sie diese Tools nicht einzeln nutzen. Unsere Plattform analysiert Ihre Karte, optimiert Preise, schlägt Weinbegleitungen vor und überwacht die Rotation — alles automatisch. Sparen Sie Stunden an Verwaltungsaufwand pro Woche und steigern Sie Ihren Weinumsatz.",
    ctaBtn1: "Meine Karte kostenlos analysieren", ctaBtn2: "Demo anfordern",
    tools: [
      { to: "/wine-list-analyzer", title: "Weinkarten-Analyzer", desc: "Laden Sie Ihre Karte hoch und erhalten Sie Verbesserungsempfehlungen. Mit Winerim aktualisiert sich diese Analyse jede Woche automatisch.", tag: "Analyse" },
      { to: "/calculadora-margen-vino", title: "Wein-Margen-Rechner", desc: "Berechnen Sie die optimale Marge pro Referenz. Als Winerim-Kunde werden Margen automatisch optimiert.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Glaspreis-Rechner", desc: "Berechnen Sie den idealen Preis pro Glas. Winerim macht das für Sie und benachrichtigt Sie, wann eine Anpassung sinnvoll ist.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Wein-Pricing-Tool", desc: "Optimieren Sie die Preisstruktur Ihrer Karte. Mit Winerim wird intelligentes Pricing in Echtzeit angewendet.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Weinbegleitung-Generator (KI)", desc: "Erzeugen Sie KI-gestützte Weinbegleitungen. Mit Winerim erhält Ihr Servicepersonal bei jedem Service automatische Empfehlungen.", tag: "KI" },
      { to: "/wine-roi-calculator", title: "ROI-Rechner", desc: "Berechnen Sie das Verbesserungspotenzial durch Digitalisierung Ihrer Karte. Die Ergebnisse variieren je nach Restauranttyp.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Weinkarten-Benchmark", desc: "Vergleichen Sie Ihre Karte mit Branchenstandards. Winerim sendet automatische Berichte zu Ihrer Wettbewerbsposition.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Glasausschank-Diagnose", desc: "Bewerten Sie, ob Ihr Glasangebot in Stilen, Preisen und Rentabilität ausgewogen ist.", tag: "Diagnose" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Auditieren Sie Ihre Karte mit einem 0-100 Score in Struktur, Ausgewogenheit, Pricing, Rotation und kommerziellem Potenzial.", tag: "Audit" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Totbestand-Rechner", desc: "Schätzen Sie das in langsam drehenden Weinen gebundene Kapital. Winerim erkennt dies automatisch.", tag: "Verwaltung" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Durchschnittsbon-Impact-Rechner", desc: "Schätzen Sie, wie viel mehr Weinumsatz Sie durch bessere Tischquote, höheren Bon pro Tisch und Glasstrategie erzielen könnten.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Multi-Standort-Karten-Auditor", desc: "Vergleichen Sie die Weinkarten Ihrer Standorte: Sortiment, Pricing, Glas und Durchschnittsbon. Erkennen Sie Inkonsistenzen und Chancen.", tag: "Gruppen" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Intelligenter-Einkauf-Rechner", desc: "Analysieren Sie, ob eine Weinreferenz es wert ist, weiter gekauft zu werden: Rentabilität, Überpreisung, gebundener Bestand und Verbesserungschance. Winerim Supply Demo.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Wie man Wein im Restaurant bepreist" },
      { to: "/vino-por-copa-restaurante", label: "Wein im Glas in Restaurants" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Wie man eine profitable Weinkarte gestaltet" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Wine-Mapping-Vorlage für Restaurants" },
    ],
  },
  pt: {
    seoTitle: "Ferramentas Gratuitas para a Carta de Vinhos",
    seoDesc: "Calculadoras, analisadores e geradores gratuitos para a sua carta de vinhos. Como cliente Winerim, tudo é automático.",
    badge: "Ferramentas gratuitas", h1: "Otimize a sua carta de vinhos",
    subtitle: "Experimente grátis estas ferramentas de análise, pricing e harmonização. A boa notícia: como cliente Winerim, tudo é executado automaticamente — sem trabalho manual, sem perder tempo, com resultados desde o primeiro dia.",
    useTool: "Experimentar grátis →", guidesTitle: "Guias relacionados",
    ctaTitle: "E se tudo isto fosse automático?",
    ctaDesc: "Com a Winerim não precisa de usar estas ferramentas uma a uma. A nossa plataforma analisa a sua carta, otimiza preços, sugere harmonizações e controla a rotação — tudo em automático. Poupe horas de gestão por semana e aumente as vendas de vinho.",
    ctaBtn1: "Analisar a minha carta grátis", ctaBtn2: "Pedir demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analisador de carta de vinhos", desc: "Carregue a sua carta e receba recomendações de melhoria. Com a Winerim, esta análise atualiza-se todas as semanas em automático.", tag: "Análise" },
      { to: "/calculadora-margen-vino", title: "Calculadora de margens de vinho", desc: "Calcule a margem ótima por cada referência. Como cliente Winerim, as margens otimizam-se automaticamente.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculadora de preço por copo", desc: "Calcule o preço ideal por copo. A Winerim calcula-o por si e avisa quando convém ajustar preços.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Ferramenta de pricing de vinhos", desc: "Otimize a estrutura de preços da sua carta. Com a Winerim, o pricing inteligente aplica-se em tempo real.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Gerador de harmonizações com IA", desc: "Gere sugestões de harmonização com IA. Com a Winerim, os seus empregados recebem recomendações automáticas em cada serviço.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculadora de ROI", desc: "Calcule o potencial de melhoria ao digitalizar a sua carta. Os resultados variam conforme o tipo de restaurante.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark de cartas de vinhos", desc: "Compare a sua carta com os padrões do setor. A Winerim envia relatórios automáticos com a sua posição competitiva.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Diagnóstico de vinho a copo", desc: "Avalie se a sua oferta a copo está equilibrada em estilos, preços e rentabilidade.", tag: "Diagnóstico" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audite a sua carta com um score de 0 a 100 em estrutura, equilíbrio, pricing, rotação e potencial comercial.", tag: "Auditoria" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Calculadora de stock morto", desc: "Estime o capital imobilizado em vinhos sem rotação. A Winerim deteta-o automaticamente.", tag: "Gestão" },
      { to: "/herramientas/calculadora-ticket-medio-vino", title: "Calculadora de impacto no ticket médio", desc: "Estime quanto mais poderia faturar em vinho melhorando o rácio de mesas, o ticket por mesa e a estratégia a copo.", tag: "ROI" },
      { to: "/herramientas/auditor-carta-multilocal", title: "Auditor de carta multi-local", desc: "Compare a carta de vinhos dos seus locais: sortido, pricing, copo e ticket médio. Detete inconsistências e oportunidades.", tag: "Grupos" },
      { to: "/herramientas/calculadora-compra-inteligente", title: "Calculadora de compra inteligente", desc: "Analise se uma referência vale a pena: rentabilidade, sobrepreço, stock imobilizado e oportunidade de melhoria. Demo da Winerim Supply.", tag: "Supply" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Como definir o preço do vinho num restaurante" },
      { to: "/vino-por-copa-restaurante", label: "Vinho a copo nos restaurantes" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Como desenhar uma carta de vinhos rentável" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Modelo wine mapping para restaurantes" },
    ],
  },
};

const toolIcons = [Search, Calculator, Wine, DollarSign, Utensils, TrendingUp, BarChart3, GlassWater, ClipboardList, RotateCcw, RotateCcw, RotateCcw, ShoppingCart];

const Herramientas = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;
  const [activeTag, setActiveTag] = useState("all");

  // Extract unique tags for filter pills
  const allTags = Array.from(new Set(t.tools.map(tool => tool.tag)));
  const tagFilters = [
    { key: "all", label: lang === "es" ? "Todas" : "All" },
    ...allTags.map(tag => ({ key: tag, label: tag })),
  ];

  const filteredTools = activeTag === "all" ? t.tools : t.tools.filter(tool => tool.tag === activeTag);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/herramientas")}`}
        hreflang={allLangPaths("/herramientas")}
      />
      <main>
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.h1 }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
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

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          {/* Tag filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tagFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveTag(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                  activeTag === f.key
                    ? "bg-wine text-white border-wine"
                    : "bg-transparent text-muted-foreground border-border hover:border-wine/40"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="self-center text-xs text-muted-foreground ml-2">{filteredTools.length} {lang === "es" ? "herramientas" : "tools"}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, i) => {
              const Icon = toolIcons[t.tools.indexOf(tool)] || Search;
              return (
                <ScrollReveal key={tool.to} delay={i * 0.04}>
                  <Link to={localePath(tool.to)} className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5 duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-[10px] font-semibold tracking-widest uppercase text-amber-400">{tool.tag}</span>
                    </div>
                    <h2 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors duration-300">{tool.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{tool.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                      {t.useTool} <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
          {filteredTools.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">
              {lang === "es" ? "No hay herramientas con este filtro." : "No tools match this filter."}
            </p>
          )}
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">{t.guidesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {t.guides.map((link) => (
              <ScrollReveal key={link.to}>
                <Link to={localePath(link.to)} className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-wine/50 transition-all">
                  <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
                  <span className="ml-auto text-muted-foreground group-hover:text-wine transition-colors text-xs">→</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Summary Box */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <SummaryBox
              label={lang === "es" ? "¿Qué son las herramientas Winerim?" : "What are Winerim tools?"}
              definition={lang === "es"
                ? "Las herramientas gratuitas de Winerim son calculadoras, analizadores y generadores especializados en la gestión del vino en restauración. Permiten diagnosticar la carta, optimizar precios, calcular márgenes y generar maridajes — sin registro ni coste."
                : "Winerim's free tools are calculators, analyzers and generators specialized in wine management for hospitality. They let you diagnose your list, optimize pricing, calculate margins and generate pairings — no signup required."
              }
              bullets={lang === "es" ? [
                "Cada herramienta resuelve un problema concreto de gestión del vino",
                "Resultados inmediatos, sin necesidad de registro",
                "Como cliente de Winerim, todas estas funciones se ejecutan automáticamente",
                "Diseñadas por profesionales del sector hostelero",
              ] : [
                "Each tool solves a specific wine management problem",
                "Immediate results, no signup required",
                "As a Winerim client, all these features run automatically",
                "Designed by hospitality industry professionals",
              ]}
            />
          </ScrollReveal>
        </section>

        {/* Methodology */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <MethodologyBox
              title={lang === "es" ? "Cómo funcionan las herramientas" : "How the tools work"}
              intro={lang === "es"
                ? "Cada herramienta sigue un proceso diseñado para generar resultados accionables sin necesidad de conocimientos técnicos."
                : "Each tool follows a process designed to generate actionable results without technical knowledge."
              }
              steps={lang === "es" ? [
                { title: "Introduces tus datos", description: "Cada herramienta pide los datos mínimos necesarios: referencias, precios, stock o tu carta actual." },
                { title: "El algoritmo procesa", description: "Análisis automático basado en benchmarks del sector, buenas prácticas de sommellerie y datos de mercado." },
                { title: "Recibes resultados accionables", description: "Recomendaciones concretas que puedes aplicar directamente o usar para solicitar una evaluación profesional." },
              ] : [
                { title: "Enter your data", description: "Each tool asks for the minimum data needed: references, prices, stock, or your current list." },
                { title: "The algorithm processes", description: "Automatic analysis based on industry benchmarks, sommelier best practices, and market data." },
                { title: "Get actionable results", description: "Concrete recommendations you can apply directly or use to request a professional evaluation." },
              ]}
              validatedBy={lang === "es"
                ? "Metodología basada en prácticas de gestión de vino en restauración real."
                : "Methodology based on real hospitality wine management practices."
              }
            />
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/analisis-carta" className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.ctaBtn1}
                </Link>
                <Link to={localePath("/demo")} className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.ctaBtn2}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQs */}
        <FAQSection
          schemaId="herramientas"
          title={lang === "es" ? "Preguntas frecuentes sobre las herramientas" : "Frequently asked questions"}
          faqs={lang === "es" ? [
            { q: "¿Las herramientas son realmente gratuitas?", a: "Sí. Todas las herramientas son de acceso libre, sin registro ni coste. Están diseñadas para que cualquier restaurante pueda evaluar su carta y tomar mejores decisiones." },
            { q: "¿Qué diferencia hay entre usar las herramientas y ser cliente de Winerim?", a: "Las herramientas ofrecen análisis puntuales. Como cliente de Winerim, estas funciones se ejecutan automáticamente y de forma continua, integradas con tus datos de venta y stock." },
            { q: "¿Necesito conocimientos técnicos para usarlas?", a: "No. Cada herramienta está diseñada para ser intuitiva. Introduces los datos que te pide y recibes un resultado accionable con explicaciones claras." },
            { q: "¿Puedo usar los resultados para mejorar mi carta?", a: "Absolutamente. Cada herramienta genera recomendaciones que puedes aplicar directamente. Si necesitas ayuda profesional, puedes solicitar un análisis completo o una demo." },
          ] : [
            { q: "Are the tools really free?", a: "Yes. All tools are free to use, no signup required. They're designed so any restaurant can evaluate its list and make better decisions." },
            { q: "What's the difference between the tools and being a Winerim client?", a: "The tools offer one-time analyses. As a Winerim client, these functions run automatically and continuously, integrated with your sales and stock data." },
            { q: "Do I need technical knowledge?", a: "No. Each tool is designed to be intuitive. Enter the requested data and receive actionable results with clear explanations." },
            { q: "Can I use the results to improve my list?", a: "Absolutely. Each tool generates recommendations you can apply directly. For professional help, request a full analysis or demo." },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Herramientas;
