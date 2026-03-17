import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, Search, Utensils,
  Users, TrendingUp, Sparkles, CheckCircle, HelpCircle,
  Layers, DollarSign, RotateCcw, GlassWater, Globe,
  Building2, Target, Filter, GitCompare, Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import SummaryBox from "@/components/seo/SummaryBox";
import FactsBox from "@/components/seo/FactsBox";
import NotForSection from "@/components/seo/NotForSection";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

type L = SupportedLang;
const i = <T,>(r: Record<L, T>): Record<L, T> => r;

/* ── i18n data ── */
const seoI = i({
  es: { title: "¿Qué es Winerim? Plataforma de Inteligencia del Vino para Restaurantes", desc: "Winerim es una plataforma tecnológica que ayuda a restaurantes a gestionar cartas de vinos, recomendar vinos, analizar ventas y optimizar precios con inteligencia artificial.", url: "https://winerim.wine/que-es-winerim" },
  en: { title: "What is Winerim? Wine Intelligence Platform for Restaurants", desc: "Winerim is a wine intelligence platform that helps restaurants manage wine lists, recommend wines, analyze sales and optimize pricing using AI technology.", url: "https://winerim.wine/what-is-winerim" },
  it: { title: "Cos'è Winerim? Piattaforma di Intelligenza del Vino per Ristoranti", desc: "Winerim è una piattaforma di intelligenza del vino che aiuta i ristoranti a gestire carte dei vini, raccomandare vini, analizzare vendite e ottimizzare i prezzi con IA.", url: "https://winerim.wine/it/cose-winerim" },
  fr: { title: "Qu'est-ce que Winerim ? Plateforme d'Intelligence Vin pour Restaurants", desc: "Winerim est une plateforme d'intelligence vinicole qui aide les restaurants à gérer les cartes des vins, recommander des vins, analyser les ventes et optimiser les prix avec l'IA.", url: "https://winerim.wine/fr/quest-ce-que-winerim" },
});

const heroI = i({
  es: { badge: "Plataforma de Inteligencia del Vino", h1: "Winerim — Plataforma de Inteligencia del Vino para Restaurantes", sub: "Winerim es una plataforma tecnológica diseñada para ayudar a restaurantes a gestionar su carta de vinos, aumentar las ventas y optimizar su bodega mediante inteligencia artificial.", cta1: "Solicitar demo", cta2: "Ver precios", breadcrumb: "¿Qué es Winerim?" },
  en: { badge: "Wine Intelligence Platform", h1: "Winerim — Wine Intelligence Platform for Restaurants", sub: "Winerim is a technology platform designed to help restaurants manage their wine list, increase sales and optimise their cellar using artificial intelligence.", cta1: "Request demo", cta2: "See pricing", breadcrumb: "What is Winerim" },
  it: { badge: "Piattaforma di Intelligenza del Vino", h1: "Winerim — Piattaforma di Intelligenza del Vino per Ristoranti", sub: "Winerim è una piattaforma tecnologica progettata per aiutare i ristoranti a gestire la carta dei vini, aumentare le vendite e ottimizzare la cantina con l'intelligenza artificiale.", cta1: "Richiedi demo", cta2: "Vedi prezzi", breadcrumb: "Cos'è Winerim" },
  fr: { badge: "Plateforme d'Intelligence Vin", h1: "Winerim — Plateforme d'Intelligence Vin pour Restaurants", sub: "Winerim est une plateforme technologique conçue pour aider les restaurants à gérer leur carte des vins, augmenter les ventes et optimiser leur cave grâce à l'intelligence artificielle.", cta1: "Demander une démo", cta2: "Voir les tarifs", breadcrumb: "Qu'est-ce que Winerim" },
});

const summaryI = i({
  es: { label: "¿Qué es Winerim? — Resumen", def: "Winerim es un software especializado en la gestión y optimización de cartas de vinos para restaurantes. Combina carta digital interactiva, recomendaciones con IA, maridajes automáticos y analítica de ventas. No es un simple QR a un PDF: es una plataforma completa diseñada para convertir la carta de vinos en un motor activo de ventas.", bullets: ["Carta digital interactiva accesible por QR desde el móvil del comensal", "Motor de recomendaciones de vino basado en inteligencia artificial", "Maridajes automáticos con cada plato del menú, actualizados en tiempo real", "Dashboard de analítica con KPIs de ventas, rotación y margen", "Herramientas de optimización de precios y escalado de gama", "Gestión centralizada para grupos con múltiples restaurantes"] },
  en: { label: "What is Winerim? — Summary", def: "Winerim is specialised software for managing and optimising restaurant wine lists. It combines an interactive digital wine list, AI recommendations, automatic pairings and sales analytics. It's not just a QR to a PDF: it's a complete platform designed to turn your wine list into an active sales engine.", bullets: ["Interactive digital wine list accessible via QR from the guest's phone", "AI-powered wine recommendation engine", "Automatic food & wine pairings, updated in real time", "Analytics dashboard with sales, rotation and margin KPIs", "Price optimisation and range scaling tools", "Centralised management for multi-location groups"] },
  it: { label: "Cos'è Winerim? — Riepilogo", def: "Winerim è un software specializzato nella gestione e ottimizzazione delle carte dei vini per ristoranti. Combina carta digitale interattiva, raccomandazioni con IA, abbinamenti automatici e analisi delle vendite. Non è un semplice QR verso un PDF: è una piattaforma completa progettata per trasformare la carta dei vini in un motore attivo di vendite.", bullets: ["Carta digitale interattiva accessibile via QR dallo smartphone del cliente", "Motore di raccomandazione vini basato su intelligenza artificiale", "Abbinamenti automatici con ogni piatto del menu, aggiornati in tempo reale", "Dashboard di analisi con KPI di vendite, rotazione e margine", "Strumenti di ottimizzazione prezzi e scalabilità di gamma", "Gestione centralizzata per gruppi con più ristoranti"] },
  fr: { label: "Qu'est-ce que Winerim ? — Résumé", def: "Winerim est un logiciel spécialisé dans la gestion et l'optimisation des cartes des vins pour restaurants. Il combine carte digitale interactive, recommandations IA, accords automatiques et analytique des ventes. Ce n'est pas un simple QR vers un PDF : c'est une plateforme complète conçue pour transformer votre carte des vins en un moteur actif de ventes.", bullets: ["Carte digitale interactive accessible par QR depuis le mobile du client", "Moteur de recommandation de vins basé sur l'intelligence artificielle", "Accords mets-vins automatiques, mis à jour en temps réel", "Tableau de bord analytique avec KPIs de ventes, rotation et marge", "Outils d'optimisation des prix et de montée en gamme", "Gestion centralisée pour les groupes multi-établissements"] },
});

const factsI = i({
  es: { title: "Datos clave de Winerim", facts: [{ label: "Tipo", value: "Software SaaS para hostelería" }, { label: "Especialización", value: "Gestión de cartas de vinos" }, { label: "Tecnología", value: "Inteligencia artificial + carta digital interactiva" }, { label: "Acceso", value: "Multiplataforma: web, tablet y app nativa" }, { label: "Idiomas", value: "Español, inglés, italiano, francés" }, { label: "Público", value: "Restaurantes, wine bars, hoteles, grupos de restauración" }, { label: "Resultado medio", value: "+30% ventas de vino, +20% ticket medio" }, { label: "Integraciones", value: "TPV, PMS, sistemas de reservas" }] },
  en: { title: "Key facts about Winerim", facts: [{ label: "Type", value: "SaaS software for hospitality" }, { label: "Specialisation", value: "Wine list management" }, { label: "Technology", value: "Artificial intelligence + interactive digital wine list" }, { label: "Access", value: "Cross-platform: web, tablet and native app" }, { label: "Languages", value: "Spanish, English, Italian, French" }, { label: "Audience", value: "Restaurants, wine bars, hotels, restaurant groups" }, { label: "Average result", value: "+30% wine sales, +20% average ticket" }, { label: "Integrations", value: "POS, PMS, reservation systems" }] },
  it: { title: "Dati chiave su Winerim", facts: [{ label: "Tipo", value: "Software SaaS per l'ospitalità" }, { label: "Specializzazione", value: "Gestione carte dei vini" }, { label: "Tecnologia", value: "Intelligenza artificiale + carta digitale interattiva" }, { label: "Accesso", value: "Multipiattaforma: web, tablet e app nativa" }, { label: "Lingue", value: "Spagnolo, inglese, italiano, francese" }, { label: "Pubblico", value: "Ristoranti, wine bar, hotel, gruppi di ristorazione" }, { label: "Risultato medio", value: "+30% vendite di vino, +20% scontrino medio" }, { label: "Integrazioni", value: "POS, PMS, sistemi di prenotazione" }] },
  fr: { title: "Données clés sur Winerim", facts: [{ label: "Type", value: "Logiciel SaaS pour l'hôtellerie-restauration" }, { label: "Spécialisation", value: "Gestion des cartes des vins" }, { label: "Technologie", value: "Intelligence artificielle + carte digitale interactive" }, { label: "Accès", value: "Multiplateforme : web, tablette et app native" }, { label: "Langues", value: "Espagnol, anglais, italien, français" }, { label: "Public", value: "Restaurants, bars à vin, hôtels, groupes de restauration" }, { label: "Résultat moyen", value: "+30% ventes de vin, +20% ticket moyen" }, { label: "Intégrations", value: "Caisse, PMS, systèmes de réservation" }] },
});

const idealI = i({
  es: { idealFor: ["Restaurantes con 50 o más referencias de vino en carta", "Wine bars y vinotecas con alta rotación de referencias", "Hoteles con servicio de vino en restaurante, room service y eventos", "Grupos de restauración que necesitan gestión centralizada del vino", "Establecimientos que quieren aumentar el ticket medio con vino"], notFor: ["Bares sin carta de vinos estructurada", "Establecimientos con menos de 50 referencias de vino", "Negocios que no sirven vino (cervecerías, coctelerías)", "Restaurantes que no buscan optimizar sus ventas de vino"] },
  en: { idealFor: ["Restaurants with 50+ wine references on their list", "Wine bars with high reference rotation", "Hotels with wine service in restaurant, room service and events", "Restaurant groups needing centralised wine management", "Venues that want to increase average spend with wine"], notFor: ["Bars without a structured wine list", "Venues with fewer than 50 wine references", "Businesses that don't serve wine (breweries, cocktail bars)", "Restaurants not looking to optimise wine sales"] },
  it: { idealFor: ["Ristoranti con 50+ referenze di vino in carta", "Wine bar con alta rotazione di referenze", "Hotel con servizio vino al ristorante, room service ed eventi", "Gruppi di ristorazione che necessitano gestione centralizzata del vino", "Locali che vogliono aumentare lo scontrino medio con il vino"], notFor: ["Bar senza una carta dei vini strutturata", "Locali con meno di 50 referenze di vino", "Attività che non servono vino (birrerie, cocktail bar)", "Ristoranti che non cercano di ottimizzare le vendite di vino"] },
  fr: { idealFor: ["Restaurants avec 50+ références de vin en carte", "Bars à vin avec forte rotation de références", "Hôtels avec service vin au restaurant, room service et événements", "Groupes de restauration nécessitant une gestion centralisée du vin", "Établissements souhaitant augmenter le ticket moyen avec le vin"], notFor: ["Bars sans carte des vins structurée", "Établissements avec moins de 50 références de vin", "Commerces ne servant pas de vin (brasseries, bars à cocktails)", "Restaurants ne cherchant pas à optimiser leurs ventes de vin"] },
});

const defI = i({
  es: { title: "¿Qué es Winerim?", p1: "Winerim es un software especializado en la gestión y optimización de cartas de vinos para restaurantes.", p1b: " La plataforma está diseñada para convertir la carta de vinos en una herramienta activa de venta, no un simple listado de referencias.", p2: "Winerim combina tecnología de carta digital interactiva, un motor de recomendaciones de vino basado en inteligencia artificial, maridajes automáticos con cada plato del menú, analítica detallada de ventas y herramientas de optimización de precios. Todo integrado en una única plataforma pensada para el sector de la hostelería.", chips: ["Carta digital interactiva", "Recomendaciones de vino con IA", "Maridajes automáticos", "Analítica de ventas", "Optimización de precios", "Gestión de bodega"] },
  en: { title: "What is Winerim?", p1: "Winerim is specialised software for managing and optimising restaurant wine lists.", p1b: " The platform is designed to turn your wine list into an active sales tool, not just a list of references.", p2: "Winerim combines interactive digital wine list technology, an AI-powered wine recommendation engine, automatic food & wine pairings, detailed sales analytics and price optimisation tools. All integrated in a single platform built for the hospitality industry.", chips: ["Interactive digital wine list", "AI wine recommendations", "Automatic food pairings", "Sales analytics", "Price optimisation", "Cellar management"] },
  it: { title: "Cos'è Winerim?", p1: "Winerim è un software specializzato nella gestione e ottimizzazione delle carte dei vini per ristoranti.", p1b: " La piattaforma è progettata per trasformare la carta dei vini in uno strumento attivo di vendita, non un semplice elenco di referenze.", p2: "Winerim combina tecnologia di carta digitale interattiva, un motore di raccomandazione vini basato su intelligenza artificiale, abbinamenti automatici con ogni piatto del menu, analisi dettagliate delle vendite e strumenti di ottimizzazione dei prezzi. Tutto integrato in un'unica piattaforma pensata per il settore dell'ospitalità.", chips: ["Carta digitale interattiva", "Raccomandazioni vino con IA", "Abbinamenti automatici", "Analisi delle vendite", "Ottimizzazione dei prezzi", "Gestione cantina"] },
  fr: { title: "Qu'est-ce que Winerim ?", p1: "Winerim est un logiciel spécialisé dans la gestion et l'optimisation des cartes des vins pour restaurants.", p1b: " La plateforme est conçue pour transformer votre carte des vins en un outil actif de vente, pas un simple listing de références.", p2: "Winerim combine la technologie de carte digitale interactive, un moteur de recommandation de vins alimenté par l'IA, des accords mets-vins automatiques, des analyses détaillées des ventes et des outils d'optimisation des prix. Le tout intégré dans une plateforme unique conçue pour l'hôtellerie-restauration.", chips: ["Carte digitale interactive", "Recommandations vin avec IA", "Accords automatiques", "Analytique des ventes", "Optimisation des prix", "Gestion de cave"] },
});

const useCasesI = i({
  es: { badge: "Casos de uso", title: "¿Para qué sirve Winerim?", sub: "Winerim cubre todas las necesidades de gestión del vino en un restaurante, desde la carta hasta la analítica.", items: [
    { icon: Wine, title: "Gestionar cartas de vinos", desc: "Crea, organiza y actualiza tu carta de vinos digital en tiempo real. Categorías, descripciones, precios y disponibilidad desde un solo panel." },
    { icon: Sparkles, title: "Recomendar vinos a clientes", desc: "Sugerencias inteligentes basadas en el plato elegido, las preferencias del cliente y el historial de ventas del restaurante." },
    { icon: BarChart3, title: "Analizar ventas de vino", desc: "Datos de venta por referencia, categoría, precio y período. Identifica qué vinos funcionan y cuáles no se mueven." },
    { icon: DollarSign, title: "Optimizar precios", desc: "Compara tus precios con el mercado, detecta oportunidades de margen y ajusta tu escalera de precios para maximizar la rentabilidad." },
    { icon: Users, title: "Mejorar la experiencia del cliente", desc: "Una carta digital interactiva con filtros, descripciones claras y maridajes sugeridos que hace que elegir vino sea fácil y placentero." },
  ] },
  en: { badge: "Use cases", title: "What is Winerim for?", sub: "Winerim covers all wine management needs in a restaurant, from the list to analytics.", items: [
    { icon: Wine, title: "Manage wine lists", desc: "Create, organise and update your digital wine list in real time. Categories, descriptions, prices and availability from one panel." },
    { icon: Sparkles, title: "Recommend wines to guests", desc: "Smart suggestions based on the chosen dish, guest preferences and the restaurant's sales history." },
    { icon: BarChart3, title: "Analyse wine sales", desc: "Sales data by reference, category, price and period. Identify which wines work and which don't move." },
    { icon: DollarSign, title: "Optimise pricing", desc: "Compare your prices with the market, spot margin opportunities and adjust your price ladder to maximise profitability." },
    { icon: Users, title: "Improve guest experience", desc: "An interactive digital wine list with filters, clear descriptions and suggested pairings that makes choosing wine easy and enjoyable." },
  ] },
  it: { badge: "Casi d'uso", title: "A cosa serve Winerim?", sub: "Winerim copre tutte le esigenze di gestione del vino in un ristorante, dalla carta all'analisi.", items: [
    { icon: Wine, title: "Gestire carte dei vini", desc: "Crea, organizza e aggiorna la tua carta dei vini digitale in tempo reale. Categorie, descrizioni, prezzi e disponibilità da un unico pannello." },
    { icon: Sparkles, title: "Raccomandare vini ai clienti", desc: "Suggerimenti intelligenti basati sul piatto scelto, le preferenze del cliente e lo storico vendite del ristorante." },
    { icon: BarChart3, title: "Analizzare le vendite di vino", desc: "Dati di vendita per referenza, categoria, prezzo e periodo. Identifica quali vini funzionano e quali non si muovono." },
    { icon: DollarSign, title: "Ottimizzare i prezzi", desc: "Confronta i tuoi prezzi con il mercato, individua opportunità di margine e adatta la tua scala prezzi per massimizzare la redditività." },
    { icon: Users, title: "Migliorare l'esperienza del cliente", desc: "Una carta digitale interattiva con filtri, descrizioni chiare e abbinamenti suggeriti che rende la scelta del vino facile e piacevole." },
  ] },
  fr: { badge: "Cas d'usage", title: "À quoi sert Winerim ?", sub: "Winerim couvre tous les besoins de gestion du vin dans un restaurant, de la carte à l'analytique.", items: [
    { icon: Wine, title: "Gérer les cartes des vins", desc: "Créez, organisez et mettez à jour votre carte digitale en temps réel. Catégories, descriptions, prix et disponibilité depuis un seul panneau." },
    { icon: Sparkles, title: "Recommander des vins aux clients", desc: "Suggestions intelligentes basées sur le plat choisi, les préférences du client et l'historique de ventes du restaurant." },
    { icon: BarChart3, title: "Analyser les ventes de vin", desc: "Données de vente par référence, catégorie, prix et période. Identifiez quels vins fonctionnent et lesquels stagnent." },
    { icon: DollarSign, title: "Optimiser les prix", desc: "Comparez vos prix avec le marché, détectez les opportunités de marge et ajustez votre échelle de prix pour maximiser la rentabilité." },
    { icon: Users, title: "Améliorer l'expérience client", desc: "Une carte digitale interactive avec filtres, descriptions claires et accords suggérés qui rend le choix du vin facile et agréable." },
  ] },
});

const userTypesI = i({
  es: { badge: "Clientes", title: "¿Quién utiliza Winerim?", sub: "Winerim está diseñado para cualquier establecimiento hostelero que tenga vino en su oferta.", items: [
    { icon: Utensils, title: "Restaurantes", desc: "Desde bistrós con 20 referencias hasta gastronómicos con 200. Winerim se adapta a cualquier formato y volumen de carta." },
    { icon: GlassWater, title: "Wine bars y vinotecas", desc: "Gestión de cartas amplias y complejas con alta rotación, amplia oferta por copa y fichas detalladas de cada vino." },
    { icon: Building2, title: "Hoteles", desc: "Cartas para restaurante, room service y eventos. Gestión centralizada con múltiples puntos de venta." },
    { icon: Globe, title: "Grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes. Una plataforma, una estrategia, múltiples locales." },
  ] },
  en: { badge: "Clients", title: "Who uses Winerim?", sub: "Winerim is designed for any hospitality venue that serves wine.", items: [
    { icon: Utensils, title: "Restaurants", desc: "From bistros with 20 references to fine dining with 200. Winerim adapts to any format and list size." },
    { icon: GlassWater, title: "Wine bars", desc: "Management of large, complex lists with high rotation, extensive by-the-glass options and detailed wine profiles." },
    { icon: Building2, title: "Hotels", desc: "Lists for restaurant, room service and events. Centralised management across multiple outlets." },
    { icon: Globe, title: "Restaurant groups", desc: "Centralised wine management for multi-location groups. One platform, one strategy, multiple venues." },
  ] },
  it: { badge: "Clienti", title: "Chi usa Winerim?", sub: "Winerim è progettato per qualsiasi struttura di ospitalità che abbia vino nella propria offerta.", items: [
    { icon: Utensils, title: "Ristoranti", desc: "Dai bistrot con 20 referenze ai ristoranti gastronomici con 200. Winerim si adatta a qualsiasi formato e volume di carta." },
    { icon: GlassWater, title: "Wine bar ed enoteca", desc: "Gestione di carte ampie e complesse con alta rotazione, ampia offerta al calice e schede dettagliate di ogni vino." },
    { icon: Building2, title: "Hotel", desc: "Carte per ristorante, room service ed eventi. Gestione centralizzata con più punti vendita." },
    { icon: Globe, title: "Gruppi di ristorazione", desc: "Gestione centralizzata del vino per gruppi con più ristoranti. Una piattaforma, una strategia, più locali." },
  ] },
  fr: { badge: "Clients", title: "Qui utilise Winerim ?", sub: "Winerim est conçu pour tout établissement d'hôtellerie-restauration proposant du vin.", items: [
    { icon: Utensils, title: "Restaurants", desc: "Des bistros avec 20 références aux gastronomiques avec 200. Winerim s'adapte à tout format et volume de carte." },
    { icon: GlassWater, title: "Bars à vin", desc: "Gestion de cartes amples et complexes avec forte rotation, large offre au verre et fiches détaillées de chaque vin." },
    { icon: Building2, title: "Hôtels", desc: "Cartes pour restaurant, room service et événements. Gestion centralisée avec de multiples points de vente." },
    { icon: Globe, title: "Groupes de restauration", desc: "Gestion centralisée du vin pour groupes multi-établissements. Une plateforme, une stratégie, plusieurs sites." },
  ] },
});

const problemsI = i({
  es: { badge: "Problemas y soluciones", title: "¿Qué problemas resuelve Winerim?", sub: "Los problemas más comunes en la gestión del vino en restaurantes y cómo Winerim los soluciona.", probLabel: "Problema", solLabel: "Solución Winerim", items: [
    { problem: "El personal no tiene tiempo para recomendar vino", solution: "Winerim genera recomendaciones automáticas basadas en el plato elegido, las preferencias del cliente y los vinos disponibles." },
    { problem: "Los clientes no entienden la carta", solution: "Carta digital con descripciones simples, filtros por estilo/precio/región y maridajes sugeridos que cualquier cliente puede usar." },
    { problem: "Los vinos no rotan", solution: "Analítica de ventas que identifica vinos estancados, sugiere rotaciones y destaca las referencias con mayor demanda." },
    { problem: "La carta no está optimizada", solution: "Análisis automático de la estructura de precios, el equilibrio por categorías y la distribución de márgenes." },
  ] },
  en: { badge: "Problems & solutions", title: "What problems does Winerim solve?", sub: "The most common wine management challenges in restaurants and how Winerim solves them.", probLabel: "Problem", solLabel: "Winerim solution", items: [
    { problem: "Staff lack time to recommend wine", solution: "Winerim generates automatic recommendations based on the chosen dish, guest preferences and available wines." },
    { problem: "Guests don't understand the wine list", solution: "Digital list with simple descriptions, filters by style/price/region and suggested pairings that any guest can use." },
    { problem: "Wines don't rotate", solution: "Sales analytics that identifies stagnant wines, suggests rotations and highlights references with highest demand." },
    { problem: "The wine list isn't optimised", solution: "Automatic analysis of price structure, category balance and margin distribution." },
  ] },
  it: { badge: "Problemi e soluzioni", title: "Quali problemi risolve Winerim?", sub: "I problemi più comuni nella gestione del vino nei ristoranti e come Winerim li risolve.", probLabel: "Problema", solLabel: "Soluzione Winerim", items: [
    { problem: "Il personale non ha tempo per raccomandare vino", solution: "Winerim genera raccomandazioni automatiche basate sul piatto scelto, le preferenze del cliente e i vini disponibili." },
    { problem: "I clienti non capiscono la carta", solution: "Carta digitale con descrizioni semplici, filtri per stile/prezzo/regione e abbinamenti suggeriti che qualsiasi cliente può usare." },
    { problem: "I vini non ruotano", solution: "Analisi delle vendite che identifica vini stagnanti, suggerisce rotazioni e evidenzia le referenze con maggiore domanda." },
    { problem: "La carta non è ottimizzata", solution: "Analisi automatica della struttura dei prezzi, dell'equilibrio per categorie e della distribuzione dei margini." },
  ] },
  fr: { badge: "Problèmes & solutions", title: "Quels problèmes Winerim résout-il ?", sub: "Les défis les plus courants de la gestion du vin en restaurant et comment Winerim les résout.", probLabel: "Problème", solLabel: "Solution Winerim", items: [
    { problem: "Le personnel manque de temps pour recommander du vin", solution: "Winerim génère des recommandations automatiques basées sur le plat choisi, les préférences du client et les vins disponibles." },
    { problem: "Les clients ne comprennent pas la carte", solution: "Carte digitale avec des descriptions simples, des filtres par style/prix/région et des accords suggérés utilisables par tout client." },
    { problem: "Les vins ne tournent pas", solution: "Analytique des ventes qui identifie les vins stagnants, suggère des rotations et met en avant les références les plus demandées." },
    { problem: "La carte n'est pas optimisée", solution: "Analyse automatique de la structure des prix, de l'équilibre par catégorie et de la distribution des marges." },
  ] },
});

const featuresI = i({
  es: { badge: "Funcionalidades", title: "Principales funcionalidades de Winerim", sub: "Una plataforma completa para la gestión integral del vino en hostelería.", items: [
    { icon: Wine, title: "Carta digital interactiva", desc: "Carta de vinos digital accesible desde cualquier dispositivo. QR en mesa, tablet o integración con tu web." },
    { icon: Sparkles, title: "Recomendaciones de vino", desc: "Motor de recomendación que sugiere vinos basándose en el plato, las preferencias del cliente y el contexto." },
    { icon: Utensils, title: "Maridajes automáticos", desc: "Sugerencias de maridaje generadas por IA para cada plato de tu menú, actualizadas en tiempo real." },
    { icon: Filter, title: "Filtros inteligentes", desc: "Filtra por tipo, región, uva, estilo, precio o maridaje. El cliente encuentra su vino ideal en segundos." },
    { icon: GitCompare, title: "Comparador de vinos", desc: "Compara referencias lado a lado: precio, notas de cata, región, puntuación y maridajes." },
    { icon: BarChart3, title: "Analítica de ventas", desc: "Dashboard con datos de venta por referencia, categoría y período. KPIs de ticket medio, rotación y margen." },
  ] },
  en: { badge: "Features", title: "Key Winerim features", sub: "A complete platform for comprehensive wine management in hospitality.", items: [
    { icon: Wine, title: "Interactive digital wine list", desc: "Digital wine list accessible from any device. Table QR, tablet or website integration." },
    { icon: Sparkles, title: "Wine recommendations", desc: "Recommendation engine suggesting wines based on dish, guest preferences and context." },
    { icon: Utensils, title: "Automatic pairings", desc: "AI-generated pairing suggestions for every dish on your menu, updated in real time." },
    { icon: Filter, title: "Smart filters", desc: "Filter by type, region, grape, style, price or pairing. Guests find their ideal wine in seconds." },
    { icon: GitCompare, title: "Wine comparison", desc: "Compare references side by side: price, tasting notes, region, score and pairings." },
    { icon: BarChart3, title: "Sales analytics", desc: "Dashboard with sales data by reference, category and period. Average ticket, rotation and margin KPIs." },
  ] },
  it: { badge: "Funzionalità", title: "Principali funzionalità di Winerim", sub: "Una piattaforma completa per la gestione integrale del vino nell'ospitalità.", items: [
    { icon: Wine, title: "Carta digitale interattiva", desc: "Carta dei vini digitale accessibile da qualsiasi dispositivo. QR al tavolo, tablet o integrazione con il tuo sito." },
    { icon: Sparkles, title: "Raccomandazioni di vino", desc: "Motore di raccomandazione che suggerisce vini basandosi sul piatto, le preferenze del cliente e il contesto." },
    { icon: Utensils, title: "Abbinamenti automatici", desc: "Suggerimenti di abbinamento generati dall'IA per ogni piatto del tuo menu, aggiornati in tempo reale." },
    { icon: Filter, title: "Filtri intelligenti", desc: "Filtra per tipo, regione, uva, stile, prezzo o abbinamento. Il cliente trova il suo vino ideale in pochi secondi." },
    { icon: GitCompare, title: "Comparatore di vini", desc: "Confronta referenze fianco a fianco: prezzo, note di degustazione, regione, punteggio e abbinamenti." },
    { icon: BarChart3, title: "Analisi delle vendite", desc: "Dashboard con dati di vendita per referenza, categoria e periodo. KPI di scontrino medio, rotazione e margine." },
  ] },
  fr: { badge: "Fonctionnalités", title: "Fonctionnalités principales de Winerim", sub: "Une plateforme complète pour la gestion intégrale du vin en hôtellerie-restauration.", items: [
    { icon: Wine, title: "Carte digitale interactive", desc: "Carte des vins digitale accessible depuis n'importe quel appareil. QR en table, tablette ou intégration à votre site." },
    { icon: Sparkles, title: "Recommandations de vin", desc: "Moteur de recommandation suggérant des vins basés sur le plat, les préférences du client et le contexte." },
    { icon: Utensils, title: "Accords automatiques", desc: "Suggestions d'accords générées par IA pour chaque plat de votre menu, mises à jour en temps réel." },
    { icon: Filter, title: "Filtres intelligents", desc: "Filtrez par type, région, cépage, style, prix ou accord. Le client trouve son vin idéal en quelques secondes." },
    { icon: GitCompare, title: "Comparateur de vins", desc: "Comparez les références côte à côte : prix, notes de dégustation, région, score et accords." },
    { icon: BarChart3, title: "Analytique des ventes", desc: "Dashboard avec données de vente par référence, catégorie et période. KPIs de ticket moyen, rotation et marge." },
  ] },
});

const resultsI = i({
  es: { badge: "Impacto", title: "Resultados de utilizar Winerim", sub: "Los restaurantes que utilizan Winerim para gestionar su carta de vinos obtienen mejoras significativas.", items: [
    { value: "+30%", label: "Ventas de vino", desc: "Incremento medio en ventas de vino gracias a recomendaciones inteligentes y una carta optimizada." },
    { value: "+20%", label: "Ticket medio", desc: "Aumento del gasto medio por mesa con una estructura de precios estratégica y vinos ancla." },
    { value: "+35%", label: "Rotación", desc: "Más rotación de referencias al identificar y sustituir vinos de baja venta." },
  ] },
  en: { badge: "Impact", title: "Results from using Winerim", sub: "Restaurants using Winerim to manage their wine lists achieve significant improvements.", items: [
    { value: "+30%", label: "Wine sales", desc: "Average increase in wine sales through intelligent recommendations and an optimised list." },
    { value: "+20%", label: "Average ticket", desc: "Increase in average spend per table with strategic pricing and anchor wines." },
    { value: "+35%", label: "Rotation", desc: "More reference rotation by identifying and replacing low-selling wines." },
  ] },
  it: { badge: "Impatto", title: "Risultati dall'uso di Winerim", sub: "I ristoranti che utilizzano Winerim per gestire la carta dei vini ottengono miglioramenti significativi.", items: [
    { value: "+30%", label: "Vendite di vino", desc: "Incremento medio nelle vendite di vino grazie a raccomandazioni intelligenti e una carta ottimizzata." },
    { value: "+20%", label: "Scontrino medio", desc: "Aumento della spesa media per tavolo con una struttura di prezzi strategica e vini ancora." },
    { value: "+35%", label: "Rotazione", desc: "Più rotazione di referenze identificando e sostituendo i vini a bassa vendita." },
  ] },
  fr: { badge: "Impact", title: "Résultats de l'utilisation de Winerim", sub: "Les restaurants utilisant Winerim pour gérer leur carte des vins obtiennent des améliorations significatives.", items: [
    { value: "+30%", label: "Ventes de vin", desc: "Augmentation moyenne des ventes de vin grâce aux recommandations intelligentes et une carte optimisée." },
    { value: "+20%", label: "Ticket moyen", desc: "Augmentation de la dépense moyenne par table avec une structure de prix stratégique et des vins d'ancrage." },
    { value: "+35%", label: "Rotation", desc: "Plus de rotation de références en identifiant et remplaçant les vins à faible vente." },
  ] },
});

const faqsI = i({
  es: { title: "Preguntas frecuentes", items: [
    { q: "¿Qué es Winerim?", a: "Winerim es una plataforma tecnológica especializada en la gestión y optimización de cartas de vinos para restaurantes. Combina una carta digital interactiva, recomendaciones de vino con inteligencia artificial, maridajes automáticos y analítica de ventas para ayudar a los restaurantes a vender más vino y mejorar la experiencia del cliente." },
    { q: "¿Para qué sirve Winerim?", a: "Winerim sirve para gestionar la carta de vinos de un restaurante de forma digital, recomendar vinos a los clientes según el plato elegido, analizar las ventas de vino, optimizar los precios y mejorar la rotación de referencias." },
    { q: "¿Cómo ayuda Winerim a vender más vino?", a: "Mediante recomendaciones inteligentes, una carta digital interactiva que facilita la exploración y analítica de ventas que permite optimizar precios, rotación y selección de referencias." },
    { q: "¿Cuánto cuesta Winerim?", a: "Winerim ofrece planes adaptados a distintos tamaños de restaurante. Consulta los planes y precios actualizados en winerim.wine/precios o solicita una demo personalizada." },
    { q: "¿Winerim funciona en varios idiomas?", a: "Sí. Winerim es multilingüe y funciona en español, inglés, italiano y francés. La carta digital se presenta al cliente en su idioma preferido." },
  ] },
  en: { title: "Frequently asked questions", items: [
    { q: "What is Winerim?", a: "Winerim is a technology platform specialising in wine list management and optimisation for restaurants. It combines an interactive digital wine list, AI wine recommendations, automatic pairings and sales analytics to help restaurants sell more wine and improve the guest experience." },
    { q: "What is Winerim for?", a: "Winerim helps restaurants manage their wine list digitally, recommend wines based on the chosen dish, analyse wine sales, optimise pricing and improve reference rotation." },
    { q: "How does Winerim help sell more wine?", a: "Through intelligent recommendations, an interactive digital wine list that makes exploration easy, and sales analytics that allow you to optimise prices, rotation and reference selection." },
    { q: "How much does Winerim cost?", a: "Winerim offers plans adapted to different restaurant sizes. Check updated plans and pricing at winerim.wine/precios or request a personalised demo." },
    { q: "Does Winerim work in multiple languages?", a: "Yes. Winerim is multilingual and works in Spanish, English, Italian and French. The digital wine list is presented to guests in their preferred language." },
  ] },
  it: { title: "Domande frequenti", items: [
    { q: "Cos'è Winerim?", a: "Winerim è una piattaforma tecnologica specializzata nella gestione e ottimizzazione delle carte dei vini per ristoranti. Combina carta digitale interattiva, raccomandazioni con IA, abbinamenti automatici e analisi delle vendite per aiutare i ristoranti a vendere più vino e migliorare l'esperienza del cliente." },
    { q: "A cosa serve Winerim?", a: "Winerim serve per gestire la carta dei vini in modo digitale, raccomandare vini in base al piatto scelto, analizzare le vendite, ottimizzare i prezzi e migliorare la rotazione delle referenze." },
    { q: "Come aiuta Winerim a vendere più vino?", a: "Attraverso raccomandazioni intelligenti, una carta digitale interattiva che facilita l'esplorazione e analisi delle vendite che permettono di ottimizzare prezzi, rotazione e selezione delle referenze." },
    { q: "Quanto costa Winerim?", a: "Winerim offre piani adattati a diverse dimensioni di ristorante. Consulta i piani e i prezzi aggiornati su winerim.wine/precios o richiedi una demo personalizzata." },
    { q: "Winerim funziona in più lingue?", a: "Sì. Winerim è multilingue e funziona in spagnolo, inglese, italiano e francese. La carta digitale viene presentata al cliente nella sua lingua preferita." },
  ] },
  fr: { title: "Questions fréquentes", items: [
    { q: "Qu'est-ce que Winerim ?", a: "Winerim est une plateforme technologique spécialisée dans la gestion et l'optimisation des cartes des vins pour restaurants. Elle combine carte digitale interactive, recommandations IA, accords automatiques et analytique des ventes pour aider les restaurants à vendre plus de vin et améliorer l'expérience client." },
    { q: "À quoi sert Winerim ?", a: "Winerim sert à gérer la carte des vins de façon digitale, recommander des vins selon le plat choisi, analyser les ventes, optimiser les prix et améliorer la rotation des références." },
    { q: "Comment Winerim aide-t-il à vendre plus de vin ?", a: "Grâce à des recommandations intelligentes, une carte digitale interactive facilitant l'exploration et des analyses de ventes permettant d'optimiser prix, rotation et sélection de références." },
    { q: "Combien coûte Winerim ?", a: "Winerim propose des formules adaptées à différentes tailles de restaurants. Consultez les formules et tarifs à jour sur winerim.wine/precios ou demandez une démo personnalisée." },
    { q: "Winerim fonctionne-t-il en plusieurs langues ?", a: "Oui. Winerim est multilingue et fonctionne en espagnol, anglais, italien et français. La carte digitale est présentée au client dans sa langue préférée." },
  ] },
});

const linksI = i({
  es: [
    { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" as const },
    { to: "/analisis-carta", label: "Analizador de carta", type: "tool" as const },
    { to: "/herramientas/generador-maridaje", label: "Generador de maridajes", type: "tool" as const },
    { to: "/precios", label: "Planes y precios", type: "resource" as const },
  ],
  en: [
    { to: "/wine-list-management-software", label: "Wine List Software", type: "solution" as const },
    { to: "/wine-list-analyzer", label: "Wine List Analyzer", type: "tool" as const },
    { to: "/wine-pairing-generator", label: "Wine Pairing Generator", type: "tool" as const },
    { to: "/precios", label: "Pricing Plans", type: "resource" as const },
  ],
  it: [
    { to: "/it/software-carta-vini", label: "Software carta dei vini", type: "solution" as const },
    { to: "/it/analisi-carta-vini", label: "Analizzatore di carta", type: "tool" as const },
    { to: "/it/generatore-abbinamenti", label: "Generatore abbinamenti", type: "tool" as const },
    { to: "/it/prezzi", label: "Piani e prezzi", type: "resource" as const },
  ],
  fr: [
    { to: "/fr/logiciel-carte-des-vins", label: "Logiciel carte des vins", type: "solution" as const },
    { to: "/fr/analyse-carte-des-vins", label: "Analyseur de carte", type: "tool" as const },
    { to: "/fr/generateur-accords", label: "Générateur d'accords", type: "tool" as const },
    { to: "/fr/tarifs", label: "Plans et tarifs", type: "resource" as const },
  ],
});

const WhatIsWinerim = () => {
  const { lang } = useLanguage();
  const t = {
    seo: seoI[lang], hero: heroI[lang], summary: summaryI[lang], facts: factsI[lang],
    ideal: idealI[lang], def: defI[lang], uc: useCasesI[lang], ut: userTypesI[lang],
    prob: problemsI[lang], feat: featuresI[lang], res: resultsI[lang], faqs: faqsI[lang],
    links: linksI[lang],
  };

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "what-is-winerim-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.seo.desc,
        url: "https://winerim.wine",
        offers: { "@type": "Offer", url: "https://winerim.wine/precios", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
        featureList: ["Digital wine list management", "AI wine recommendations", "Automatic food and wine pairing", "Wine sales analytics", "Price optimization", "Smart wine filters", "Wine comparison tool"],
        audience: { "@type": "Audience", audienceType: "Restaurants, Wine Bars, Hotels, Restaurant Groups" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.faqs.items.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("what-is-winerim-jsonld")?.remove(); };
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo.title} description={t.seo.desc} url={t.seo.url} type="website" />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.hero.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.hero.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{t.hero.h1}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">{t.hero.sub}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">{t.hero.cta1} <ArrowRight size={16} /></Link>
            <Link to="/precios" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">{t.hero.cta2}</Link>
          </motion.div>
        </div>
      </section>

      {/* SUMMARY BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-6">
        <ScrollReveal><SummaryBox label={t.summary.label} definition={t.summary.def} bullets={t.summary.bullets} /></ScrollReveal>
      </section>

      {/* FACTS BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-6">
        <ScrollReveal><FactsBox title={t.facts.title} facts={t.facts.facts} /></ScrollReveal>
      </section>

      {/* NOT FOR SECTION */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <NotForSection idealFor={t.ideal.idealFor} notFor={t.ideal.notFor} />
      </section>

      {/* 2. DEFINICIÓN */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.def.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">{t.def.p1}</strong>{t.def.p1b}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{t.def.p2}</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {t.def.chips.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.04}>
              <div className="flex items-center gap-2 p-4 rounded-xl border border-border bg-gradient-card">
                <CheckCircle size={16} className="text-wine shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. PARA QUÉ SIRVE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.uc.badge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.uc.title}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.uc.sub}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.uc.items.map((uc, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-background h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><uc.icon size={20} className="text-wine" /></div>
                  <h3 className="font-heading font-bold mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUIÉN UTILIZA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.ut.badge}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ut.title}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.ut.sub}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {t.ut.items.map((ut, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.06}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-gradient-card">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5"><ut.icon size={20} className="text-wine" /></div>
                <div>
                  <h3 className="font-heading font-bold mb-2">{ut.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ut.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. PROBLEMAS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.prob.badge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.prob.title}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.prob.sub}</p>
          </ScrollReveal>
          <div className="space-y-6">
            {t.prob.items.map((p, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="grid md:grid-cols-2 gap-4 p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-start gap-3">
                    <Target size={18} className="text-wine shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.prob.probLabel}</p>
                      <p className="font-medium">{p.problem}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-wine shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-1">{t.prob.solLabel}</p>
                      <p className="text-sm text-muted-foreground">{p.solution}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FUNCIONALIDADES */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.feat.badge}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.feat.title}</h2>
          <p className="text-muted-foreground max-w-2xl mb-12">{t.feat.sub}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.feat.items.map((f, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><f.icon size={20} className="text-wine" /></div>
                <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. RESULTADOS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.res.badge}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.res.title}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.res.sub}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.res.items.map((r, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="text-center p-8 rounded-xl border border-border bg-background">
                  <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{r.value}</p>
                  <p className="font-semibold text-foreground mb-2">{r.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={t.faqs.items} schemaId="what-is-winerim" title={t.faqs.title} />
      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default WhatIsWinerim;
