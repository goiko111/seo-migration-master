import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Utensils, BarChart3, QrCode, Wine, Filter, Search,
  RefreshCw, Bell, TrendingUp, FileText, Languages, Palette, Globe, Smartphone,
  Zap, Rocket, CheckCircle, Calendar, Package, DollarSign, ShoppingCart,
  Eye, Image, BookOpen, Settings, Users, ClipboardList, History, BellRing,
  Headphones, LayoutDashboard, Database, Link2, Cpu, MessageSquare, Share2,
  GraduationCap, Target, Lightbulb
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import SummaryBox from "@/components/seo/SummaryBox";
import FAQSection from "@/components/seo/FAQSection";
import CredibilitySection from "@/components/seo/CredibilitySection";
import { useLanguage } from "@/i18n/LanguageContext";

// ─── Screenshots ───
import tabletHeroImg from "@/assets/winerim-tablet-hero.png";
import tabletDetailImg from "@/assets/winerim-tablet-detail.png";
import tabletComparatorImg from "@/assets/winerim-tablet-comparator.png";
import tabletPairingImg from "@/assets/winerim-tablet-pairing.png";
import tabletFichaImg from "@/assets/winerim-tablet-ficha.png";
import mobileListImg from "@/assets/winerim-mobile-list.png";
import mobileDetailImg from "@/assets/winerim-mobile-detail.png";
import mobileComparatorImg from "@/assets/winerim-mobile-comparator.png";
import ss01 from "@/assets/screenshots/ss-01.png";
import ss02 from "@/assets/screenshots/ss-02.png";
import ss03 from "@/assets/screenshots/ss-03.png";
import ss04 from "@/assets/screenshots/ss-04.png";
import ss05 from "@/assets/screenshots/ss-05.png";
import ss06 from "@/assets/screenshots/ss-06.png";
import ss07 from "@/assets/screenshots/ss-07.png";
import ss08 from "@/assets/screenshots/ss-08.png";
import ss09 from "@/assets/screenshots/ss-09.png";
import ss10 from "@/assets/screenshots/ss-10.png";
import ss11 from "@/assets/screenshots/ss-11.png";
import ss12 from "@/assets/screenshots/ss-12.png";
import ss13 from "@/assets/screenshots/ss-13.png";
import ss14 from "@/assets/screenshots/ss-14.png";
import ss15 from "@/assets/screenshots/ss-15.png";
import ss16 from "@/assets/screenshots/ss-16.png";
import ss17 from "@/assets/screenshots/ss-17.png";
import ss18 from "@/assets/screenshots/ss-18.png";
import ss19 from "@/assets/screenshots/ss-19.png";
import ss20 from "@/assets/screenshots/ss-20.png";

// ─── Types ───
interface CategoryItem { icon: typeof Wine; title: string; desc: string }
interface Category { title: string; items: CategoryItem[] }
interface Block { badge: string; title: string; categories: Category[] }

interface LangContent {
  seo_title: string; seo_desc: string; breadcrumb: string; badge: string; title: string; subtitle: string;
  blocks: Block[];
  changelog_badge: string; changelog_title: string; changelog_sub: string;
  roadmap_badge: string; roadmap_title: string; roadmap_sub: string;
  cta_badge: string; cta_title: string; cta_sub: string; cta_btn: string;
  changelog: { date: string; title: string; desc: string; tag: "new" | "improvement" | "fix" }[];
  roadmap: { quarter: string; items: string[] }[];
  tag_labels: Record<string, string>;
  coming_soon: string;
}

// ─── i18n ───
const i18n: Record<string, LangContent> = {
  es: {
    seo_title: "Funcionalidades de Winerim | Carta de Vinos Inteligente",
    seo_desc: "Descubre todas las funcionalidades de Winerim: carta digital interactiva, maridajes IA, gestión de stock, pricing, analítica avanzada y más.",
    breadcrumb: "Funcionalidades", badge: "Todo en uno",
    title: "Todo lo que <em>Winerim</em> puede hacer por ti",
    subtitle: "Una plataforma completa para transformar tu carta de vinos en una herramienta de venta inteligente.",
    blocks: [
      {
        badge: "Para el comensal", title: "Experiencia del <em>cliente</em>",
        categories: [
          {
            title: "Carta digital interactiva",
            items: [
              { icon: QrCode, title: "Acceso por QR/link", desc: "El comensal accede escaneando un QR o desde un enlace." },
              { icon: Eye, title: "Visualización atractiva", desc: "Diseño más claro y visual que una carta tradicional." },
              { icon: Filter, title: "Filtros dinámicos", desc: "Filtros que se alimentan entre sí: tipo, país, región, uva, precio, estilo." },
              { icon: Search, title: "Búsqueda avanzada", desc: "Busca por cualquier criterio en segundos." },
              { icon: BarChart3, title: "Comparador de vinos", desc: "El comensal compara opciones con información clara." },
              { icon: Sparkles, title: "Recomendaciones IA", desc: "Sugerencias inteligentes personalizadas para cada comensal." },
              { icon: Utensils, title: "Maridajes automáticos", desc: "Propuestas de maridaje instantáneas con los platos de la carta." },
              { icon: Languages, title: "Multiidioma", desc: "Navegación automática en el idioma del comensal." },
            ],
          },
          {
            title: "Información avanzada de cada vino",
            items: [
              { icon: FileText, title: "Ficha técnica completa", desc: "Uvas, zona, productor, añada, estilo y más." },
              { icon: Sparkles, title: "Atributos asistidos por IA", desc: "Descriptores sensoriales generados automáticamente." },
              { icon: Image, title: "Fotografías de botella", desc: "Imágenes de cada referencia para decisión visual." },
              { icon: BookOpen, title: "Lenguaje accesible", desc: "Explicación del vino comprensible para cualquier cliente." },
            ],
          },
          {
            title: "Maridaje e inteligencia gastronómica",
            items: [
              { icon: Utensils, title: "Maridajes automáticos vino-plato", desc: "Relación directa entre los platos y vinos de tu carta." },
              { icon: Sparkles, title: "Recomendación contextual", desc: "Sugerencias que ayudan a vender mejor." },
              { icon: Target, title: "Estrategias de pairing", desc: "Herramientas para construir estrategias de maridaje rentables." },
            ],
          },
        ],
      },
      {
        badge: "Para el restaurante", title: "Gestión y <em>analítica</em>",
        categories: [
          {
            title: "Gestión de carta",
            items: [
              { icon: Wine, title: "Alta y edición de vinos", desc: "Añade y edita referencias de forma rápida." },
              { icon: ClipboardList, title: "Organización de la carta", desc: "Estructura por categorías, secciones y orden personalizado." },
              { icon: Palette, title: "Personalización visual", desc: "Adapta colores, logo, tipografía y estilo." },
              { icon: Settings, title: "Configuración avanzada", desc: "Ajustes específicos por restaurante." },
              { icon: Languages, title: "Gestión multiidioma", desc: "Traducciones automáticas y edición manual." },
              { icon: Database, title: "Base de datos de vinos", desc: "Catálogo con +500.000 referencias para alta instantánea." },
            ],
          },
          {
            title: "Stock e inventario",
            items: [
              { icon: Package, title: "Gestión de stock", desc: "Control de botellas y unidades disponibles." },
              { icon: RefreshCw, title: "Descuento de stock", desc: "Actualización automática al vender." },
              { icon: Bell, title: "Alertas de disponibilidad", desc: "Notificaciones cuando un vino está por agotarse." },
              { icon: TrendingUp, title: "Apoyo a rotación", desc: "Identifica vinos parados y sugiere acciones." },
            ],
          },
          {
            title: "Pricing, márgenes y estrategia comercial",
            items: [
              { icon: DollarSign, title: "Análisis de precios y márgenes", desc: "Visualiza rentabilidad por referencia." },
              { icon: Wine, title: "Pricing por botella y copa", desc: "Herramientas para fijar precios óptimos." },
              { icon: TrendingUp, title: "Optimización de ticket medio", desc: "Estrategias basadas en datos para subir el ticket." },
              { icon: Target, title: "Detección de referencias mal posicionadas", desc: "Identifica vinos poco rentables o sin demanda." },
            ],
          },
          {
            title: "Analítica y datos",
            items: [
              { icon: BarChart3, title: "Analítica avanzada", desc: "Dashboard con informes automáticos." },
              { icon: Eye, title: "Comportamiento del comensal", desc: "Qué vinos se consultan, qué categorías interesan más." },
              { icon: TrendingUp, title: "Métricas de conversión", desc: "Qué referencias convierten mejor y a qué precios." },
              { icon: Globe, title: "Big Data de la carta", desc: "Visión global para dirección y compras." },
            ],
          },
          {
            title: "Operativa del restaurante",
            items: [
              { icon: ShoppingCart, title: "Gestión de pedidos", desc: "Pedidos a proveedores integrados en el flujo." },
              { icon: History, title: "Historial completo", desc: "Registro de cambios, ventas y movimientos." },
              { icon: Users, title: "Usuarios y roles", desc: "Permisos por persona y nivel de acceso." },
              { icon: BellRing, title: "Notificaciones", desc: "Alertas inteligentes sobre stock, ventas y carta." },
              { icon: LayoutDashboard, title: "Panel de administración", desc: "Control centralizado de toda la operativa." },
            ],
          },
        ],
      },
      {
        badge: "Tecnología e IA", title: "Inteligencia <em>artificial</em>",
        categories: [
          {
            title: "IA aplicada al vino y a la venta",
            items: [
              { icon: Sparkles, title: "Generación de fichas con IA", desc: "Fichas de vino completas generadas automáticamente." },
              { icon: Cpu, title: "Atributos asistidos por IA", desc: "Descriptores sensoriales y categorización inteligente." },
              { icon: Utensils, title: "Maridajes con IA", desc: "Recomendaciones de maridaje basadas en machine learning." },
              { icon: TrendingUp, title: "Recomendación comercial", desc: "IA que apoya decisiones de sala y dirección." },
              { icon: Zap, title: "Acciones dinámicas en tiempo real", desc: "Ajustes automáticos sobre la carta según el momento." },
            ],
          },
          {
            title: "Integración y capa operativa",
            items: [
              { icon: Link2, title: "Carta + stock + venta conectados", desc: "Visión unificada de carta, comportamiento y gestión." },
              { icon: Database, title: "Base para integraciones", desc: "Preparado para conectar con TPV, comandas y cava." },
            ],
          },
        ],
      },
    ],
    coming_soon: "En desarrollo",
    changelog_badge: "Changelog", changelog_title: "Últimas <em>novedades</em>", changelog_sub: "Winerim evoluciona constantemente.",
    roadmap_badge: "Capacidades en expansión", roadmap_title: "Próximas <em>capacidades</em>", roadmap_sub: "Además de su núcleo de gestión e inteligencia, Winerim sigue ampliando la experiencia del comensal y del equipo de sala con nuevas capacidades.",
    cta_badge: "Empieza hoy", cta_title: "Descubre Winerim en <em>acción</em>", cta_sub: "Prueba todas estas funcionalidades gratis durante 14 días. Sin compromiso.", cta_btn: "Prueba Gratis",
    changelog: [
      { date: "Feb 2026", title: "Filtros sensoriales v2", desc: "Nueva interfaz de filtrado por perfil aromático.", tag: "new" },
      { date: "Ene 2026", title: "Comparador mejorado", desc: "Compara hasta 4 vinos con gráficos radar.", tag: "improvement" },
      { date: "Dic 2025", title: "Traducción automática", desc: "Carta traducida a 12 idiomas en tiempo real.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard analítico v3", desc: "Nuevos KPIs de rentabilidad.", tag: "improvement" },
      { date: "Oct 2025", title: "Alta masiva de vinos", desc: "Importa tu bodega desde Excel o CSV.", tag: "new" },
      { date: "Sep 2025", title: "Integración Revo TPV", desc: "Sincronización bidireccional con Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Experiencia comensal", items: ["Solicitar al sumiller desde la carta", "Compartir selección por QR/link", "Recomendaciones por historial"] },
      { quarter: "Formación y sala", items: ["Modo educación con tips de vino", "Guías de servicio para el equipo", "App nativa para comensales"] },
      { quarter: "Tecnología avanzada", items: ["IA predictiva de tendencias", "Carta con realidad aumentada", "API pública v2"] },
    ],
    tag_labels: { new: "Nuevo", improvement: "Mejora", fix: "Corrección" },
  },
  en: {
    seo_title: "Winerim Features | Smart Wine List", seo_desc: "Discover all Winerim features: interactive digital wine list, AI pairings, stock management, pricing, advanced analytics and more.",
    breadcrumb: "Features", badge: "All in one", title: "Everything <em>Winerim</em> can do for you", subtitle: "A complete platform to transform your wine list into a smart sales tool.",
    blocks: [
      {
        badge: "For the diner", title: "Customer <em>experience</em>",
        categories: [
          {
            title: "Interactive digital wine list",
            items: [
              { icon: QrCode, title: "QR/link access", desc: "Guests access by scanning a QR or link." },
              { icon: Eye, title: "Attractive display", desc: "Clearer, more visual design than a traditional list." },
              { icon: Filter, title: "Dynamic filters", desc: "Interconnected filters: type, country, region, grape, price, style." },
              { icon: Search, title: "Advanced search", desc: "Search by any criteria in seconds." },
              { icon: BarChart3, title: "Wine comparator", desc: "Guests compare options with clear info." },
              { icon: Sparkles, title: "AI recommendations", desc: "Personalized smart suggestions for each diner." },
              { icon: Utensils, title: "Auto pairings", desc: "Instant pairing suggestions with menu dishes." },
              { icon: Languages, title: "Multi-language", desc: "Automatic navigation in the guest's language." },
            ],
          },
          {
            title: "Advanced wine information",
            items: [
              { icon: FileText, title: "Complete tech sheet", desc: "Grapes, region, producer, vintage, style and more." },
              { icon: Sparkles, title: "AI-assisted attributes", desc: "Automatically generated sensory descriptors." },
              { icon: Image, title: "Bottle photos", desc: "Images for each reference for visual decision-making." },
              { icon: BookOpen, title: "Accessible language", desc: "Wine explanations understandable for any guest." },
            ],
          },
          {
            title: "Pairing & gastronomic intelligence",
            items: [
              { icon: Utensils, title: "Auto wine-dish pairings", desc: "Direct relationship between your dishes and wines." },
              { icon: Sparkles, title: "Contextual recommendations", desc: "Suggestions that help sell better." },
              { icon: Target, title: "Pairing strategies", desc: "Tools to build profitable pairing strategies." },
            ],
          },
        ],
      },
      {
        badge: "For the restaurant", title: "Management & <em>analytics</em>",
        categories: [
          {
            title: "Wine list management",
            items: [
              { icon: Wine, title: "Add & edit wines", desc: "Add and edit references quickly." },
              { icon: ClipboardList, title: "List organization", desc: "Structure by categories, sections and custom order." },
              { icon: Palette, title: "Visual customization", desc: "Adapt colors, logo, typography and style." },
              { icon: Settings, title: "Advanced settings", desc: "Restaurant-specific configurations." },
              { icon: Languages, title: "Multi-language management", desc: "Auto translations and manual editing." },
              { icon: Database, title: "Wine database", desc: "Catalog with 500K+ references for instant adding." },
            ],
          },
          {
            title: "Stock & inventory",
            items: [
              { icon: Package, title: "Stock management", desc: "Control bottles and available units." },
              { icon: RefreshCw, title: "Stock deduction", desc: "Automatic update on sale." },
              { icon: Bell, title: "Availability alerts", desc: "Notifications when a wine is running low." },
              { icon: TrendingUp, title: "Rotation support", desc: "Identify stagnant wines and suggest actions." },
            ],
          },
          {
            title: "Pricing, margins & commercial strategy",
            items: [
              { icon: DollarSign, title: "Price & margin analysis", desc: "Visualize profitability per reference." },
              { icon: Wine, title: "Bottle & glass pricing", desc: "Tools to set optimal prices." },
              { icon: TrendingUp, title: "Average ticket optimization", desc: "Data-driven strategies to increase the ticket." },
              { icon: Target, title: "Poorly positioned reference detection", desc: "Identify unprofitable or low-demand wines." },
            ],
          },
          {
            title: "Analytics & data",
            items: [
              { icon: BarChart3, title: "Advanced analytics", desc: "Dashboard with automatic reports." },
              { icon: Eye, title: "Diner behavior", desc: "Which wines are viewed, which categories interest most." },
              { icon: TrendingUp, title: "Conversion metrics", desc: "Which references convert best and at what prices." },
              { icon: Globe, title: "Wine list Big Data", desc: "Global vision for management and purchasing." },
            ],
          },
          {
            title: "Restaurant operations",
            items: [
              { icon: ShoppingCart, title: "Order management", desc: "Supplier orders integrated into the workflow." },
              { icon: History, title: "Complete history", desc: "Record of changes, sales and movements." },
              { icon: Users, title: "Users & roles", desc: "Permissions by person and access level." },
              { icon: BellRing, title: "Notifications", desc: "Smart alerts about stock, sales and list." },
              { icon: LayoutDashboard, title: "Admin panel", desc: "Centralized control of all operations." },
            ],
          },
        ],
      },
      {
        badge: "Technology & AI", title: "Artificial <em>intelligence</em>",
        categories: [
          {
            title: "AI for wine and sales",
            items: [
              { icon: Sparkles, title: "AI wine sheet generation", desc: "Complete wine sheets generated automatically." },
              { icon: Cpu, title: "AI-assisted attributes", desc: "Intelligent sensory descriptors and categorization." },
              { icon: Utensils, title: "AI pairings", desc: "Pairing recommendations based on machine learning." },
              { icon: TrendingUp, title: "Commercial recommendations", desc: "AI supporting floor and management decisions." },
              { icon: Zap, title: "Real-time dynamic actions", desc: "Automatic adjustments on the list based on context." },
            ],
          },
          {
            title: "Integration & operational layer",
            items: [
              { icon: Link2, title: "List + stock + sales connected", desc: "Unified view of list, behavior and management." },
              { icon: Database, title: "Integration-ready", desc: "Prepared to connect with POS, orders and cellar." },
            ],
          },
        ],
      },
    ],
    coming_soon: "Coming soon",
    changelog_badge: "Changelog", changelog_title: "Latest <em>updates</em>", changelog_sub: "Winerim is constantly evolving.",
    roadmap_badge: "Expanding capabilities", roadmap_title: "Upcoming <em>capabilities</em>", roadmap_sub: "Beyond its core management and intelligence engine, Winerim keeps expanding the diner and floor team experience with new capabilities.",
    cta_badge: "Start today", cta_title: "See Winerim in <em>action</em>", cta_sub: "Try all these features free for 14 days. No commitment.", cta_btn: "Try Free",
    changelog: [
      { date: "Feb 2026", title: "Sensory filters v2", desc: "New filtering UI by aromatic profile.", tag: "new" },
      { date: "Jan 2026", title: "Improved comparator", desc: "Compare up to 4 wines with radar charts.", tag: "improvement" },
      { date: "Dec 2025", title: "Auto translation", desc: "Wine list translated to 12 languages in real time.", tag: "new" },
      { date: "Nov 2025", title: "Analytics dashboard v3", desc: "New profitability KPIs.", tag: "improvement" },
      { date: "Oct 2025", title: "Bulk wine import", desc: "Import your entire cellar from Excel or CSV.", tag: "new" },
      { date: "Sep 2025", title: "Revo POS integration", desc: "Bidirectional sync with Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Diner experience", items: ["Request sommelier from the list", "Share selection via QR/link", "History-based recommendations"] },
      { quarter: "Training & floor", items: ["Education mode with wine tips", "Service guides for the team", "Native diner app"] },
      { quarter: "Advanced technology", items: ["Predictive trend AI", "AR wine list", "Public API v2"] },
    ],
    tag_labels: { new: "New", improvement: "Improvement", fix: "Fix" },
  },
  it: {
    seo_title: "Funzionalità di Winerim | Carta dei Vini Intelligente", seo_desc: "Scopri tutte le funzionalità di Winerim: carta digitale, abbinamenti IA, gestione stock, pricing e analisi avanzata.",
    breadcrumb: "Funzionalità", badge: "Tutto in uno", title: "Tutto ciò che <em>Winerim</em> può fare per te", subtitle: "Una piattaforma completa per trasformare la tua carta dei vini.",
    blocks: [
      {
        badge: "Per il commensale", title: "Esperienza del <em>cliente</em>",
        categories: [
          {
            title: "Carta digitale interattiva",
            items: [
              { icon: QrCode, title: "Accesso QR/link", desc: "Il commensale accede scansionando un QR o da un link." },
              { icon: Eye, title: "Visualizzazione attrattiva", desc: "Design più chiaro e visivo di una carta tradizionale." },
              { icon: Filter, title: "Filtri dinamici", desc: "Filtri interconnessi: tipo, paese, regione, uva, prezzo, stile." },
              { icon: Search, title: "Ricerca avanzata", desc: "Cerca per qualsiasi criterio in secondi." },
              { icon: BarChart3, title: "Comparatore vini", desc: "Il cliente confronta opzioni con info chiare." },
              { icon: Sparkles, title: "Raccomandazioni IA", desc: "Suggerimenti intelligenti personalizzati." },
              { icon: Utensils, title: "Abbinamenti automatici", desc: "Proposte istantanee con i piatti del menu." },
              { icon: Languages, title: "Multilingua", desc: "Navigazione automatica nella lingua del cliente." },
            ],
          },
          {
            title: "Informazioni avanzate di ogni vino",
            items: [
              { icon: FileText, title: "Scheda tecnica completa", desc: "Uve, zona, produttore, annata, stile e altro." },
              { icon: Sparkles, title: "Attributi assistiti da IA", desc: "Descrittori sensoriali generati automaticamente." },
              { icon: Image, title: "Foto bottiglia", desc: "Immagini per ogni referenza." },
              { icon: BookOpen, title: "Linguaggio accessibile", desc: "Spiegazione comprensibile per qualsiasi cliente." },
            ],
          },
          {
            title: "Abbinamento e intelligenza gastronomica",
            items: [
              { icon: Utensils, title: "Abbinamenti automatici vino-piatto", desc: "Relazione diretta tra piatti e vini." },
              { icon: Sparkles, title: "Raccomandazione contestuale", desc: "Suggerimenti che aiutano a vendere meglio." },
              { icon: Target, title: "Strategie di pairing", desc: "Strumenti per costruire strategie redditizie." },
            ],
          },
        ],
      },
      {
        badge: "Per il ristorante", title: "Gestione e <em>analisi</em>",
        categories: [
          {
            title: "Gestione carta",
            items: [
              { icon: Wine, title: "Inserimento e modifica vini", desc: "Aggiungi e modifica referenze rapidamente." },
              { icon: ClipboardList, title: "Organizzazione carta", desc: "Struttura per categorie, sezioni e ordine personalizzato." },
              { icon: Palette, title: "Personalizzazione visiva", desc: "Adatta colori, logo, tipografia e stile." },
              { icon: Settings, title: "Configurazione avanzata", desc: "Impostazioni specifiche per ristorante." },
              { icon: Languages, title: "Gestione multilingua", desc: "Traduzioni automatiche e modifica manuale." },
              { icon: Database, title: "Database vini", desc: "Catalogo con +500K referenze per inserimento istantaneo." },
            ],
          },
          {
            title: "Stock e inventario",
            items: [
              { icon: Package, title: "Gestione stock", desc: "Controllo bottiglie e unità disponibili." },
              { icon: RefreshCw, title: "Scarico stock", desc: "Aggiornamento automatico alla vendita." },
              { icon: Bell, title: "Avvisi disponibilità", desc: "Notifiche quando un vino sta per esaurirsi." },
              { icon: TrendingUp, title: "Supporto rotazione", desc: "Identifica vini fermi e suggerisce azioni." },
            ],
          },
          {
            title: "Pricing, margini e strategia commerciale",
            items: [
              { icon: DollarSign, title: "Analisi prezzi e margini", desc: "Visualizza redditività per referenza." },
              { icon: Wine, title: "Pricing bottiglia e calice", desc: "Strumenti per fissare prezzi ottimali." },
              { icon: TrendingUp, title: "Ottimizzazione scontrino medio", desc: "Strategie basate sui dati." },
              { icon: Target, title: "Rilevamento referenze mal posizionate", desc: "Identifica vini poco redditizi." },
            ],
          },
          {
            title: "Analisi e dati",
            items: [
              { icon: BarChart3, title: "Analisi avanzata", desc: "Dashboard con report automatici." },
              { icon: Eye, title: "Comportamento del cliente", desc: "Quali vini si consultano, quali categorie interessano." },
              { icon: TrendingUp, title: "Metriche di conversione", desc: "Quali referenze convertono meglio." },
              { icon: Globe, title: "Big Data della carta", desc: "Visione globale per direzione e acquisti." },
            ],
          },
          {
            title: "Operatività del ristorante",
            items: [
              { icon: ShoppingCart, title: "Gestione ordini", desc: "Ordini fornitori integrati nel flusso." },
              { icon: History, title: "Storico completo", desc: "Registro di cambiamenti, vendite e movimenti." },
              { icon: Users, title: "Utenti e ruoli", desc: "Permessi per persona e livello di accesso." },
              { icon: BellRing, title: "Notifiche", desc: "Avvisi intelligenti su stock, vendite e carta." },
              { icon: LayoutDashboard, title: "Pannello admin", desc: "Controllo centralizzato di tutta l'operatività." },
            ],
          },
        ],
      },
      {
        badge: "Tecnologia e IA", title: "Intelligenza <em>artificiale</em>",
        categories: [
          {
            title: "IA applicata al vino e alla vendita",
            items: [
              { icon: Sparkles, title: "Generazione schede con IA", desc: "Schede complete generate automaticamente." },
              { icon: Cpu, title: "Attributi assistiti da IA", desc: "Descrittori sensoriali e categorizzazione intelligente." },
              { icon: Utensils, title: "Abbinamenti con IA", desc: "Raccomandazioni basate su machine learning." },
              { icon: TrendingUp, title: "Raccomandazione commerciale", desc: "IA a supporto delle decisioni di sala e direzione." },
              { icon: Zap, title: "Azioni dinamiche in tempo reale", desc: "Aggiustamenti automatici sulla carta." },
            ],
          },
          {
            title: "Integrazione e livello operativo",
            items: [
              { icon: Link2, title: "Carta + stock + vendita connessi", desc: "Visione unificata di carta, comportamento e gestione." },
              { icon: Database, title: "Pronto per integrazioni", desc: "Preparato per connettere con POS, comande e cantina." },
            ],
          },
        ],
      },
    ],
    coming_soon: "In sviluppo",
    changelog_badge: "Changelog", changelog_title: "Ultime <em>novità</em>", changelog_sub: "Winerim si evolve costantemente.",
    roadmap_badge: "Capacità in espansione", roadmap_title: "Prossime <em>capacità</em>", roadmap_sub: "Oltre al suo nucleo di gestione e intelligenza, Winerim continua ad ampliare l'esperienza del cliente e del team di sala con nuove capacità.",
    cta_badge: "Inizia oggi", cta_title: "Scopri Winerim in <em>azione</em>", cta_sub: "Prova tutte le funzionalità gratis per 14 giorni.", cta_btn: "Prova Gratis",
    changelog: [
      { date: "Feb 2026", title: "Filtri sensoriali v2", desc: "Nuova interfaccia filtri.", tag: "new" },
      { date: "Gen 2026", title: "Comparatore migliorato", desc: "Confronta fino a 4 vini.", tag: "improvement" },
      { date: "Dic 2025", title: "Traduzione automatica", desc: "Carta in 12 lingue.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard v3", desc: "Nuovi KPI di redditività.", tag: "improvement" },
      { date: "Ott 2025", title: "Import massivo", desc: "Importa da Excel o CSV.", tag: "new" },
      { date: "Set 2025", title: "Integrazione Revo", desc: "Sincronizzazione con Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Esperienza cliente", items: ["Richiedere sommelier dalla carta", "Condividere selezione via QR/link", "Raccomandazioni per storico"] },
      { quarter: "Formazione e sala", items: ["Modalità educazione con tips", "Guide di servizio per il team", "App nativa"] },
      { quarter: "Tecnologia avanzata", items: ["IA predittiva tendenze", "Carta in realtà aumentata", "API pubblica v2"] },
    ],
    tag_labels: { new: "Nuovo", improvement: "Miglioramento", fix: "Correzione" },
  },
  fr: {
    seo_title: "Fonctionnalités Winerim | Carte des Vins Intelligente", seo_desc: "Découvrez toutes les fonctionnalités de Winerim: carte digitale, accords IA, gestion de stock, pricing et analytique avancée.",
    breadcrumb: "Fonctionnalités", badge: "Tout en un", title: "Tout ce que <em>Winerim</em> peut faire pour vous", subtitle: "Une plateforme complète pour transformer votre carte des vins.",
    blocks: [
      {
        badge: "Pour le client", title: "Expérience <em>client</em>",
        categories: [
          {
            title: "Carte digitale interactive",
            items: [
              { icon: QrCode, title: "Accès QR/lien", desc: "Le client accède en scannant un QR ou un lien." },
              { icon: Eye, title: "Affichage attractif", desc: "Design plus clair et visuel qu'une carte traditionnelle." },
              { icon: Filter, title: "Filtres dynamiques", desc: "Filtres interconnectés : type, pays, région, cépage, prix, style." },
              { icon: Search, title: "Recherche avancée", desc: "Recherche par n'importe quel critère en secondes." },
              { icon: BarChart3, title: "Comparateur de vins", desc: "Le client compare les options avec des infos claires." },
              { icon: Sparkles, title: "Recommandations IA", desc: "Suggestions intelligentes personnalisées." },
              { icon: Utensils, title: "Accords automatiques", desc: "Suggestions instantanées avec les plats du menu." },
              { icon: Languages, title: "Multilingue", desc: "Navigation automatique dans la langue du client." },
            ],
          },
          {
            title: "Informations avancées de chaque vin",
            items: [
              { icon: FileText, title: "Fiche technique complète", desc: "Cépages, région, producteur, millésime, style et plus." },
              { icon: Sparkles, title: "Attributs assistés par IA", desc: "Descripteurs sensoriels générés automatiquement." },
              { icon: Image, title: "Photos de bouteille", desc: "Images pour chaque référence." },
              { icon: BookOpen, title: "Langage accessible", desc: "Explication du vin compréhensible pour tout client." },
            ],
          },
          {
            title: "Accord & intelligence gastronomique",
            items: [
              { icon: Utensils, title: "Accords automatiques vin-plat", desc: "Relation directe entre vos plats et vos vins." },
              { icon: Sparkles, title: "Recommandation contextuelle", desc: "Suggestions qui aident à mieux vendre." },
              { icon: Target, title: "Stratégies d'accord", desc: "Outils pour construire des stratégies rentables." },
            ],
          },
        ],
      },
      {
        badge: "Pour le restaurant", title: "Gestion et <em>analytique</em>",
        categories: [
          {
            title: "Gestion de carte",
            items: [
              { icon: Wine, title: "Ajout et édition de vins", desc: "Ajoutez et éditez des références rapidement." },
              { icon: ClipboardList, title: "Organisation de la carte", desc: "Structure par catégories, sections et ordre personnalisé." },
              { icon: Palette, title: "Personnalisation visuelle", desc: "Adaptez couleurs, logo, typographie et style." },
              { icon: Settings, title: "Configuration avancée", desc: "Paramètres spécifiques par restaurant." },
              { icon: Languages, title: "Gestion multilingue", desc: "Traductions automatiques et édition manuelle." },
              { icon: Database, title: "Base de données vins", desc: "Catalogue de +500K références pour ajout instantané." },
            ],
          },
          {
            title: "Stock & inventaire",
            items: [
              { icon: Package, title: "Gestion de stock", desc: "Contrôle des bouteilles et unités disponibles." },
              { icon: RefreshCw, title: "Déduction de stock", desc: "Mise à jour automatique à la vente." },
              { icon: Bell, title: "Alertes de disponibilité", desc: "Notifications quand un vin est presque épuisé." },
              { icon: TrendingUp, title: "Support rotation", desc: "Identifiez les vins stagnants et suggérez des actions." },
            ],
          },
          {
            title: "Pricing, marges et stratégie commerciale",
            items: [
              { icon: DollarSign, title: "Analyse prix et marges", desc: "Visualisez la rentabilité par référence." },
              { icon: Wine, title: "Pricing bouteille et verre", desc: "Outils pour fixer des prix optimaux." },
              { icon: TrendingUp, title: "Optimisation ticket moyen", desc: "Stratégies basées sur les données." },
              { icon: Target, title: "Détection de références mal positionnées", desc: "Identifiez les vins peu rentables." },
            ],
          },
          {
            title: "Analytique et données",
            items: [
              { icon: BarChart3, title: "Analytique avancée", desc: "Dashboard avec rapports automatiques." },
              { icon: Eye, title: "Comportement du client", desc: "Quels vins sont consultés, quelles catégories intéressent." },
              { icon: TrendingUp, title: "Métriques de conversion", desc: "Quelles références convertissent le mieux." },
              { icon: Globe, title: "Big Data de la carte", desc: "Vision globale pour direction et achats." },
            ],
          },
          {
            title: "Opérations du restaurant",
            items: [
              { icon: ShoppingCart, title: "Gestion des commandes", desc: "Commandes fournisseurs intégrées au flux." },
              { icon: History, title: "Historique complet", desc: "Registre des changements, ventes et mouvements." },
              { icon: Users, title: "Utilisateurs et rôles", desc: "Permissions par personne et niveau d'accès." },
              { icon: BellRing, title: "Notifications", desc: "Alertes intelligentes sur stock, ventes et carte." },
              { icon: LayoutDashboard, title: "Panneau admin", desc: "Contrôle centralisé de toutes les opérations." },
            ],
          },
        ],
      },
      {
        badge: "Technologie et IA", title: "Intelligence <em>artificielle</em>",
        categories: [
          {
            title: "IA appliquée au vin et à la vente",
            items: [
              { icon: Sparkles, title: "Génération de fiches par IA", desc: "Fiches complètes générées automatiquement." },
              { icon: Cpu, title: "Attributs assistés par IA", desc: "Descripteurs sensoriels et catégorisation intelligente." },
              { icon: Utensils, title: "Accords par IA", desc: "Recommandations basées sur le machine learning." },
              { icon: TrendingUp, title: "Recommandation commerciale", desc: "IA au service des décisions de salle et direction." },
              { icon: Zap, title: "Actions dynamiques en temps réel", desc: "Ajustements automatiques sur la carte." },
            ],
          },
          {
            title: "Intégration et couche opérationnelle",
            items: [
              { icon: Link2, title: "Carte + stock + vente connectés", desc: "Vision unifiée de la carte, du comportement et de la gestion." },
              { icon: Database, title: "Prêt pour intégrations", desc: "Préparé pour connecter avec TPV, commandes et cave." },
            ],
          },
        ],
      },
    ],
    coming_soon: "En développement",
    changelog_badge: "Changelog", changelog_title: "Dernières <em>nouveautés</em>", changelog_sub: "Winerim évolue constamment.",
    roadmap_badge: "Capacités en expansion", roadmap_title: "Prochaines <em>capacités</em>", roadmap_sub: "Au-delà de son noyau de gestion et d'intelligence, Winerim continue d'enrichir l'expérience du client et de l'équipe de salle avec de nouvelles capacités.",
    cta_badge: "Commencez aujourd'hui", cta_title: "Découvrez Winerim en <em>action</em>", cta_sub: "Essayez toutes les fonctionnalités gratuitement pendant 14 jours.", cta_btn: "Essai Gratuit",
    changelog: [
      { date: "Fév 2026", title: "Filtres sensoriels v2", desc: "Nouvelle interface de filtrage.", tag: "new" },
      { date: "Jan 2026", title: "Comparateur amélioré", desc: "Comparez jusqu'à 4 vins.", tag: "improvement" },
      { date: "Déc 2025", title: "Traduction automatique", desc: "Carte en 12 langues.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard v3", desc: "Nouveaux KPIs de rentabilité.", tag: "improvement" },
      { date: "Oct 2025", title: "Import massif", desc: "Importez depuis Excel ou CSV.", tag: "new" },
      { date: "Sep 2025", title: "Intégration Revo", desc: "Synchronisation avec Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Expérience client", items: ["Demander le sommelier depuis la carte", "Partager sélection via QR/lien", "Recommandations par historique"] },
      { quarter: "Formation et salle", items: ["Mode éducation avec tips vin", "Guides de service pour l'équipe", "App native"] },
      { quarter: "Technologie avancée", items: ["IA prédictive tendances", "Carte en réalité augmentée", "API publique v2"] },
    ],
    tag_labels: { new: "Nouveau", improvement: "Amélioration", fix: "Correction" },
  },
};

// ─── Screenshot maps per category ───
const screenshotsByCategory: Record<string, { img: string; alt: string; label: string }[]> = {};

const tagColors: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  improvement: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  fix: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const emToGradient = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

// ─── Screenshot sections component ───
const ScreenshotGrid = ({ items, cols = 3 }: { items: { img: string; alt: string; label: string }[]; cols?: number }) => (
  <div className={`grid ${cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5`}>
    {items.map((item, i) => (
      <div key={i} className="relative group">
        <div className="absolute -inset-2 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <img src={item.img} alt={item.alt} className="relative w-full rounded-xl border border-border shadow-lg" loading="lazy" />
        <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
      </div>
    ))}
  </div>
);

const Funcionalidades = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = i18n[lang] || i18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/funcionalidades" hreflang={allLangPaths("/funcionalidades")} />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl" dangerouslySetInnerHTML={{ __html: emToGradient(c.title) }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{c.subtitle}</motion.p>
        </div>
      </section>

      {/* ─── Content blocks ─── */}
      {c.blocks.map((block, blockIdx) => (
        <section key={blockIdx} className={`section-padding ${blockIdx % 2 === 1 ? 'bg-gradient-dark' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{block.badge}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(block.title) }} />
            </ScrollReveal>

            {block.categories.map((cat, catIdx) => (
              <div key={catIdx} className="mb-16 last:mb-0">
                <ScrollReveal>
                  <h3 className="font-heading text-xl md:text-2xl font-bold mb-8 text-center">
                    {cat.title}
                  </h3>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cat.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <ScrollReveal key={i} delay={i * 0.04}>
                        <div className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                          <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                            <Icon size={20} className="text-wine" />
                          </div>
                          <h4 className="font-heading font-semibold mb-1.5 text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>

                {/* ─── Screenshots after specific categories ─── */}
                {blockIdx === 0 && catIdx === 0 && (
                  <>
                    <ScrollReveal className="mt-12">
                      <ScreenshotGrid items={[
                        { img: tabletHeroImg, alt: "Carta de vinos digital en tablet", label: "Carta interactiva" },
                        { img: tabletDetailImg, alt: "Ficha de vino detallada", label: "Ficha del vino" },
                        { img: tabletComparatorImg, alt: "Comparador de vinos Winerim", label: "Comparador de vinos" },
                      ]} />
                    </ScrollReveal>
                    <ScrollReveal className="mt-8">
                      <ScreenshotGrid items={[
                        { img: tabletPairingImg, alt: "Maridajes automáticos Winerim", label: "Maridajes automáticos" },
                        { img: tabletFichaImg, alt: "Información visual del vino", label: "Información visual" },
                      ]} cols={2} />
                    </ScrollReveal>
                    <ScrollReveal className="mt-8">
                      <p className="text-center text-sm text-muted-foreground mb-6 font-medium tracking-wide uppercase">
                        {lang === "es" ? "También en móvil" : lang === "en" ? "Also on mobile" : lang === "it" ? "Anche su mobile" : "Aussi sur mobile"}
                      </p>
                      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                          { img: mobileListImg, alt: "Carta de vinos en móvil", label: "Carta" },
                          { img: mobileDetailImg, alt: "Detalle de vino en móvil", label: "Ficha" },
                          { img: mobileComparatorImg, alt: "Comparador en móvil", label: "Comparador" },
                        ].map((item, i) => (
                          <div key={i} className="relative group">
                            <div className="relative rounded-2xl border-2 border-border/60 overflow-hidden shadow-xl bg-background/50 group-hover:border-wine/30 transition-colors">
                              <img src={item.img} alt={item.alt} className="w-full" />
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  </>
                )}

                {/* Stock screenshots */}
                {blockIdx === 1 && catIdx === 1 && (
                  <ScrollReveal className="mt-12">
                    <ScreenshotGrid items={[
                      { img: ss01, alt: "Inventario de vinos Winerim", label: "Inventario" },
                      { img: ss02, alt: "Importar ventas en Winerim", label: "Importar ventas" },
                      { img: ss03, alt: "Historial de ventas Winerim", label: "Historial de ventas" },
                    ]} />
                  </ScrollReveal>
                )}

                {/* Pricing screenshots */}
                {blockIdx === 1 && catIdx === 2 && (
                  <ScrollReveal className="mt-12">
                    <ScreenshotGrid items={[
                      { img: ss19, alt: "Rendimiento de la carta", label: "Rendimiento" },
                      { img: ss17, alt: "Vinos en obsolescencia", label: "Obsolescencia" },
                      { img: ss15, alt: "Probabilidad de venta", label: "Probabilidad venta" },
                    ]} />
                  </ScrollReveal>
                )}

                {/* Analytics screenshots */}
                {blockIdx === 1 && catIdx === 3 && (
                  <ScrollReveal className="mt-12">
                    <ScreenshotGrid items={[
                      { img: ss14, alt: "Dashboard Insights Winerim", label: "Insights" },
                      { img: ss16, alt: "Vinos populares Big Data", label: "Big Data" },
                      { img: ss18, alt: "Benchmark vs restaurantes", label: "Benchmark" },
                    ]} />
                  </ScrollReveal>
                )}

                {/* Operations screenshots */}
                {blockIdx === 1 && catIdx === 4 && (
                  <>
                    <ScrollReveal className="mt-12">
                      <ScreenshotGrid items={[
                        { img: ss04, alt: "Gestión de pedidos", label: "Pedidos" },
                        { img: ss05, alt: "Detalle de pedido", label: "Detalle pedido" },
                        { img: ss06, alt: "Proveedores", label: "Proveedores" },
                      ]} />
                    </ScrollReveal>
                    <ScrollReveal className="mt-8">
                      <ScreenshotGrid items={[
                        { img: ss07, alt: "Ajustes generales", label: "Ajustes" },
                        { img: ss08, alt: "Automatizaciones IA", label: "Automatizaciones" },
                        { img: ss10, alt: "IA de Winerim", label: "IA Winerim" },
                        { img: ss20, alt: "Catálogo distribuidores", label: "Catálogo +500K" },
                      ]} cols={4} />
                    </ScrollReveal>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ─── Coming soon ─── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <Lightbulb size={14} className="text-accent" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">{c.coming_soon}</span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
          {[
              { icon: MessageSquare, title: lang === "es" ? "Solicitar al sumiller" : lang === "en" ? "Request sommelier" : lang === "it" ? "Richiedere sommelier" : "Demander sommelier", desc: lang === "es" ? "Pide ayuda al sumiller directamente desde la carta." : lang === "en" ? "Ask the sommelier for help right from the list." : lang === "it" ? "Chiedi aiuto al sommelier dalla carta." : "Demandez au sommelier depuis la carte." },
              { icon: Share2, title: lang === "es" ? "Compartir selección" : lang === "en" ? "Share selection" : lang === "it" ? "Condividere selezione" : "Partager sélection", desc: lang === "es" ? "Comparte tu selección de vinos por QR o link." : lang === "en" ? "Share your wine selection via QR or link." : lang === "it" ? "Condividi la tua selezione via QR o link." : "Partagez votre sélection via QR ou lien." },
              { icon: GraduationCap, title: lang === "es" ? "Modo educación" : lang === "en" ? "Education mode" : lang === "it" ? "Modalità educazione" : "Mode éducation", desc: lang === "es" ? "Tips y curiosidades sobre cada vino mientras exploras." : lang === "en" ? "Tips and curiosities about each wine as you explore." : lang === "it" ? "Tips e curiosità su ogni vino mentre esplori." : "Tips et curiosités sur chaque vin en explorant." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-dashed border-border p-6 h-full opacity-80">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h4 className="font-heading font-semibold mb-1.5 text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Inteligencia Dinámica highlight ─── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-wine/6 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-3xl border border-wine/20 bg-gradient-to-br from-card via-card/95 to-wine/5 p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-wine/8 via-transparent to-transparent pointer-events-none rounded-3xl" />

              <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-5">
                    <span className="w-1 h-1 rounded-full bg-wine/50" />
                    Inteligencia dinámica
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    La nueva capa de{" "}
                    <span className="text-gradient-wine">inteligencia táctica</span>{" "}
                    de Winerim
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                    Más allá de digitalizar la carta, Winerim empieza a adaptar visibilidad, recomendaciones y prioridades según margen, stock, contexto y objetivo del restaurante.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Activa estrategias según el momento del servicio",
                      "Empuja referencias más rentables o prioritarias",
                      "Ayuda a equilibrar stock, rotación y experiencia",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-wine mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/producto/inteligencia-dinamica"
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/25 hover:-translate-y-0.5"
                  >
                    Descubrir Inteligencia dinámica
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="hidden lg:flex flex-col items-center gap-3 w-44 shrink-0">
                  {["MarginRIM™", "FocusRIM™", "SmartRIM™"].map((rim, i) => (
                    <motion.div
                      key={rim}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                      className="w-full text-center py-2.5 px-4 rounded-lg border border-wine/15 bg-wine/5 text-xs font-mono font-semibold text-wine/80 tracking-wide"
                    >
                      {rim}
                    </motion.div>
                  ))}
                  <span className="text-[10px] text-muted-foreground/40 mt-1">+8 módulos RIM™</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Changelog ─── */}
      <section className="section-padding bg-gradient-dark" id="changelog">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.changelog_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.changelog_title) }} />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{c.changelog_sub}</p>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {c.changelog.map((entry, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="relative pl-12 md:pl-16">
                    <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-wine border-2 border-background" />
                    <div className="bg-gradient-card rounded-xl border border-border p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"><Calendar size={12} /> {entry.date}</span>
                        <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${tagColors[entry.tag]}`}>{c.tag_labels[entry.tag]}</span>
                      </div>
                      <h3 className="font-heading font-bold mb-1">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Capacidades en expansión (discreto) ─── */}
      <section className="section-padding" id="roadmap">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-medium mb-3">{c.roadmap_badge}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground/80" dangerouslySetInnerHTML={{ __html: emToGradient(c.roadmap_title) }} />
            <p className="text-muted-foreground/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">{c.roadmap_sub}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {c.roadmap.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-xl border border-border/60 bg-card/40 p-6 h-full">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-4 block">{q.quarter}</span>
                  <ul className="space-y-2.5">
                    {q.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground/70 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{c.cta_badge}</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: emToGradient(c.cta_title) }} />
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{c.cta_sub}</p>
                <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {c.cta_btn} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Summary Box */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SummaryBox
              label={lang === "es" ? "¿Qué incluye Winerim?" : "What does Winerim include?"}
              definition={lang === "es"
                ? "Winerim es un software de gestión de cartas de vinos para restaurantes que integra carta digital interactiva, recomendaciones con IA, maridajes automáticos, analítica de ventas, gestión de stock, optimización de precios y herramientas de formación para el equipo de sala."
                : "Winerim is a wine list management software for restaurants that integrates interactive digital wine lists, AI recommendations, automatic pairings, sales analytics, stock management, price optimization and training tools for front-of-house teams."
              }
              bullets={lang === "es" ? [
                "11 categorías de funcionalidades especializadas en vino",
                "Diseñado para restaurantes, hoteles, wine bars y grupos de restauración",
                "Multiplataforma: web, tablet y app nativa (iOS y Android)",
                "Contenido validado por profesionales de la hostelería y la enología",
              ] : [
                "11 categories of wine-specialized features",
                "Designed for restaurants, hotels, wine bars and restaurant groups",
                "Multi-platform: web, tablet and native app (iOS and Android)",
                "Content validated by hospitality and oenology professionals",
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Credibility */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 pb-8">
        <CredibilitySection lang={lang} />
      </section>

      {/* FAQs */}
      <FAQSection
        schemaId="funcionalidades"
        title={lang === "es" ? "Preguntas frecuentes sobre las funcionalidades" : "Feature FAQ"}
        faqs={lang === "es" ? [
          { q: "¿Winerim funciona con mi TPV actual?", a: "Winerim se integra con los principales TPVs del mercado. Si tu TPV no está en la lista de integraciones, el equipo técnico evalúa la viabilidad de conexión." },
          { q: "¿Puedo gestionar varios locales desde un solo panel?", a: "Sí. La gestión centralizada multi-local es una de las funcionalidades clave de Winerim, especialmente diseñada para grupos de restauración y hoteles." },
          { q: "¿Cómo se generan las recomendaciones de IA?", a: "El motor de recomendación analiza el plato elegido, las preferencias del comensal, el historial de ventas y el stock disponible para sugerir el vino más adecuado en cada contexto." },
          { q: "¿Puedo personalizar el aspecto de la carta digital?", a: "Sí. La carta se adapta a la identidad visual de tu restaurante: colores, tipografía, logotipo y estilo fotográfico." },
          { q: "¿Qué pasa si un vino se agota?", a: "El sistema actualiza la disponibilidad en tiempo real. Cuando un vino se agota, desaparece automáticamente de la carta visible para el comensal." },
        ] : [
          { q: "Does Winerim work with my current POS?", a: "Winerim integrates with major POS systems. If yours isn't listed, the technical team evaluates connection feasibility." },
          { q: "Can I manage multiple venues from one dashboard?", a: "Yes. Centralized multi-venue management is a key Winerim feature, designed for restaurant groups and hotels." },
          { q: "How are AI recommendations generated?", a: "The recommendation engine analyzes the chosen dish, guest preferences, sales history and available stock to suggest the most suitable wine." },
          { q: "Can I customize the digital list design?", a: "Yes. The list adapts to your restaurant's visual identity: colors, typography, logo and photographic style." },
          { q: "What happens when a wine runs out?", a: "The system updates availability in real time. When a wine runs out, it automatically disappears from the guest-facing list." },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios de Winerim" : "Winerim pricing", type: "resource" },
        { to: localePath("/integraciones"), label: lang === "es" ? "Integraciones con TPV y sistemas" : "POS & system integrations", type: "tool" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito de restaurantes reales" : "Real case studies", type: "solution" },
        { to: "/herramientas", label: lang === "es" ? "Herramientas gratuitas de análisis y pricing" : "Free analysis tools", type: "tool" },
        { to: "/guias-y-recursos", label: lang === "es" ? "Guías prácticas y recursos descargables" : "Guides & resources", type: "guide" },
        { to: "/comparativas", label: lang === "es" ? "Compara Winerim con alternativas" : "Compare Winerim", type: "solution" },
        { to: "/benchmarks-playbooks", label: lang === "es" ? "Benchmarks y playbooks del sector" : "Industry benchmarks", type: "resource" },
        { to: "/producto/inteligencia-dinamica", label: lang === "es" ? "Inteligencia dinámica: IA táctica para carta" : "Dynamic intelligence", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default Funcionalidades;
