import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plug, Monitor, Database, Warehouse, Code2,
  RefreshCw, BarChart3, Wine, CheckCircle, Layers, Zap, Globe,
  AlertTriangle, Check, X, Clock, Wrench, ShieldCheck, Settings,
  TrendingUp, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── types ─── */
interface Integration { name: string; desc: string; status: "active" | "development" | "custom" }
interface BenefitItem { title: string; desc: string }
interface ImplStep { title: string; desc: string }

type Content = {
  seoTitle: string; seoDesc: string; badge: string;
  breadProduct: string; breadLabel: string;
  h1: string; h1Highlight: string;
  subtitle: string; ctaDemo: string; ctaContact: string;
  heroSummary: string;
  /* Why */
  whyLabel: string; whyTitle1: string; whyTitleHighlight: string;
  whyPains: { text: string }[];
  /* What they solve */
  solvesLabel: string; solvesTitle: string;
  solves: BenefitItem[];
  /* Status legend */
  statusActive: string; statusDev: string; statusCustom: string;
  /* POS */
  posBadge: string; posTitle: string; posTitleHighlight: string; posDesc: string;
  posNoteTitle: string; posNote: string;
  pos: Integration[];
  /* ERP */
  erpBadge: string; erpTitle: string; erpTitleHighlight: string; erpDesc: string;
  erp: Integration[];
  /* PMS */
  pmsBadge: string; pmsTitle: string; pmsTitleHighlight: string; pmsDesc: string;
  pms: Integration[];
  /* Inventory */
  invBadge: string; invTitle: string; invTitleHighlight: string; invDesc: string;
  invFeatures: { label: string; desc: string }[];
  /* API */
  apiBadge: string; apiTitle: string; apiTitleHighlight: string; apiDesc: string; apiNote: string;
  apiFeatures: { label: string; desc: string }[];
  /* Implementation */
  implLabel: string; implTitle: string; implSubtitle: string;
  implSteps: ImplStep[];
  /* Use cases */
  ucLabel: string; ucTitle: string;
  useCases: { title: string; scenario: string; result: string }[];
  /* Does / doesn't */
  doesTitle: string; doesLabel: string; doesItems: string[];
  doesNotLabel: string; doesNotItems: string[];
  /* CTA */
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string; ctaBtn: string; ctaSecondary: string;
  ctaMicro: string;
  /* FAQs */
  faqs: { q: string; a: string }[];
};

/* ═══════════════════════════════════════════════════════════ */
/*  SPANISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const ES: Content = {
  seoTitle: "Integraciones de Winerim | TPV, PMS, ERP, Inventario y API",
  seoDesc: "Winerim se integra con los sistemas que ya usas: TPV, PMS hotelero, ERP y gestión de inventario. Ecosistema conectado para restaurantes, hoteles y grupos.",
  badge: "Ecosistema conectado",
  breadProduct: "Producto", breadLabel: "Integraciones",
  h1: "Winerim se conecta con tu ", h1Highlight: "ecosistema operativo",
  subtitle: "No somos una herramienta aislada. Winerim se integra con los sistemas de punto de venta, gestión hotelera, ERP e inventario que ya usas. Sin fricciones, sin cambios en tu operativa.",
  ctaDemo: "Solicitar demo", ctaContact: "Consultar integración",
  heroSummary: "Winerim está diseñado para convivir con el ecosistema tecnológico del restaurante o hotel, no para reemplazarlo. Conectamos la carta de vinos con tus datos de ventas, stock y operativa para que tomes decisiones con información real.",

  whyLabel: "Por qué importa", whyTitle1: "Sin conexión con tu operativa, el vino es un ", whyTitleHighlight: "dato aislado",
  whyPains: [
    { text: "Si la carta no se conecta con el TPV, no sabes qué vinos se venden realmente ni qué margen generan." },
    { text: "Si el stock no está sincronizado, vendes vinos que ya no tienes o mantienes en carta referencias sin rotación." },
    { text: "Sin datos de venta reales, las decisiones de compra se basan en intuición, no en rendimiento." },
    { text: "En hoteles, si el PMS no está conectado, no puedes personalizar la experiencia de vino por perfil de huésped." },
    { text: "En grupos, sin integración centralizada cada local opera como una isla: sin benchmarking, sin coherencia." },
  ],

  solvesLabel: "Qué resuelven", solvesTitle: "Beneficios operativos de las integraciones",
  solves: [
    { title: "Datos de venta reales", desc: "El TPV alimenta Winerim con datos de venta por referencia, periodo y punto de servicio. Sabes qué se vende de verdad." },
    { title: "Stock sincronizado", desc: "El inventario refleja la realidad: entradas, salidas, merma y redistribución entre locales." },
    { title: "Pricing con contexto", desc: "Los multiplicadores y márgenes se calculan con datos reales de coste, no con estimaciones." },
    { title: "Operativa sin duplicidades", desc: "No introduces datos dos veces. Lo que ocurre en el TPV se refleja automáticamente en Winerim." },
    { title: "Analítica consolidada", desc: "Un solo panel con datos de carta, ventas, stock y margen. Para dirección, F&B o compras." },
    { title: "Experiencia conectada", desc: "En hoteles, la carta se adapta al perfil del huésped. En grupos, se compara rendimiento entre locales." },
  ],

  statusActive: "Integración activa", statusDev: "En desarrollo", statusCustom: "Bajo proyecto",

  posBadge: "Punto de venta (TPV)", posTitle: "Integración con ", posTitleHighlight: "TPV / POS",
  posDesc: "Winerim se integra con tu sistema de punto de venta para sincronizar ventas en tiempo real, analizar el consumo de vino y alimentar la analítica de rendimiento.",
  posNoteTitle: "¿Tu TPV no está en la lista?", posNote: "Nuestro equipo puede evaluar y desarrollar integraciones con cualquier sistema de punto de venta. Consulta disponibilidad.",
  pos: [
    { name: "Agora POS", desc: "Sincronización bidireccional de ventas, catálogo y stock", status: "active" },
    { name: "Revo XEF", desc: "API REST con autenticación Bearer, ventas y catálogo", status: "active" },
    { name: "ICG FrontRest", desc: "POS on-premise con acceso SQL Server. Ventas, catálogo y stock", status: "active" },
    { name: "Glop", desc: "TPV con API documentada para ventas y artículos", status: "active" },
    { name: "Hiopos / Hioffice", desc: "Integración CSV/XML de ventas y artículos", status: "active" },
    { name: "BDP NET", desc: "REST API Weblink con URL, puerto y perfil configurables", status: "active" },
    { name: "Turbopos", desc: "Integración on-premise sin API pública", status: "custom" },
    { name: "Zucchetti Tilby", desc: "API de ventas y sandbox para Italia", status: "active" },
    { name: "Cassa in Cloud", desc: "POS TeamSystem con autenticación por token", status: "active" },
    { name: "Scloby", desc: "OAuth2 + OpenAPI para pedidos y catálogo", status: "active" },
    { name: "RCH", desc: "Integración vía canales comerciales", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "API REST Zucchetti para ventas y pedidos", status: "active" },
    { name: "Toast POS", desc: "Sincronización de pedidos, ventas y menús en tiempo real", status: "active" },
    { name: "Clover", desc: "Pedidos, pagos, artículos y webhooks con OAuth2", status: "active" },
    { name: "Square POS", desc: "Pagos, catálogo y analítica de ventas integrada", status: "active" },
    { name: "Lightspeed Restaurant", desc: "TPV cloud con datos financieros y webhooks", status: "active" },
    { name: "Revel Systems", desc: "REST API y webhooks de menú", status: "development" },
    { name: "NCR Aloha", desc: "API cloud In-Store con TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Importación de ventas, facturas y artículos", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "APIs REST con OAuth2/TLS para transacciones cloud", status: "development" },
    { name: "SoftRestaurant", desc: "API REST/JSON con endpoints de catálogo", status: "active" },
    { name: "Poster POS", desc: "Portal de desarrolladores con API abierta", status: "active" },
    { name: "Fudo", desc: "APIs de inyección de pedidos y catálogo", status: "active" },
  ],

  erpBadge: "Gestión empresarial (ERP)", erpTitle: "Integración con sistemas de ", erpTitleHighlight: "gestión",
  erpDesc: "Conecta Winerim con tu ERP para mejorar el control de bodega, automatizar pedidos a proveedores y tener una visión completa de costes y márgenes.",
  erp: [
    { name: "Holded", desc: "Facturación, inventario y contabilidad en la nube", status: "development" },
    { name: "Sage", desc: "ERP para gestión financiera y operativa", status: "development" },
    { name: "Odoo", desc: "ERP modular de código abierto", status: "development" },
  ],

  pmsBadge: "Gestión hotelera (PMS)", pmsTitle: "Integración con ", pmsTitleHighlight: "PMS hoteleros",
  pmsDesc: "En hoteles, Winerim se conecta con el sistema de gestión para personalizar la experiencia del huésped, sincronizar datos de consumo entre outlets y alimentar el reporting de F&B.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Perfil de huésped, consumo por habitación y reporting F&B", status: "development" },
    { name: "Mews", desc: "PMS cloud con API abierta para hospitality moderna", status: "development" },
    { name: "Protel / Planet", desc: "Integración de servicios F&B con perfil de huésped", status: "custom" },
    { name: "Clock PMS+", desc: "API REST para datos de huésped y consumo", status: "custom" },
  ],

  invBadge: "Control de bodega", invTitle: "Gestión de ", invTitleHighlight: "inventario y stock",
  invDesc: "Winerim controla cada botella de tu bodega: entrada, salida, servicio por copa, merma y redistribución entre locales.",
  invFeatures: [
    { label: "Stock en tiempo real", desc: "Control automático de existencias por botella y por copa en cada punto de servicio." },
    { label: "Rotación de referencias", desc: "Identifica qué vinos se venden, cuáles se estancan y cuáles generan capital inmovilizado." },
    { label: "Consumo por botella y copa", desc: "Analítica detallada de consumo para optimizar compras y reducir merma." },
    { label: "Alertas automáticas", desc: "Notificaciones de stock bajo, sobrestock, rotación lenta y oportunidades de redistribución." },
  ],

  apiBadge: "Para equipos técnicos", apiTitle: "API de ", apiTitleHighlight: "Winerim",
  apiDesc: "Winerim dispone de una API REST documentada para integraciones personalizadas. Conecta cualquier sistema con tu carta de vinos de forma programática.",
  apiNote: "Documentación completa disponible para clientes del plan Enterprise.",
  apiFeatures: [
    { label: "Automatización", desc: "Sincroniza datos entre Winerim y tus sistemas sin intervención manual." },
    { label: "Sistemas propios", desc: "Conecta Winerim con tu ERP, CRM, BI o cualquier software interno." },
    { label: "Apps y plataformas", desc: "Integra Winerim con apps de terceros, plataformas de reservas o canales digitales." },
  ],

  implLabel: "Implantación", implTitle: "Cómo funciona la integración", implSubtitle: "Un proceso diseñado para no interrumpir tu operativa.",
  implSteps: [
    { title: "1. Evaluación técnica", desc: "Revisamos tu ecosistema actual: TPV, PMS, ERP, procesos de stock. Identificamos qué conectar y cómo." },
    { title: "2. Configuración", desc: "Configuramos la integración con tu sistema. En la mayoría de casos, se activa en menos de 48 horas." },
    { title: "3. Validación", desc: "Verificamos que los datos fluyen correctamente: ventas, stock, catálogo. Ajustamos lo que haga falta." },
    { title: "4. Operación", desc: "La integración funciona en segundo plano. Los datos se sincronizan automáticamente sin intervención manual." },
  ],

  ucLabel: "Casos de uso", ucTitle: "Cómo funciona en la práctica",
  useCases: [
    { title: "Restaurante independiente con TPV", scenario: "Restaurante con Revo XEF y carta de 70 vinos. Quiere saber qué vinos se venden realmente y cuáles sobran.", result: "Winerim se conecta con Revo y recibe datos de venta en tiempo real. El restaurador ve rotación, margen y ticket medio por vino sin tocar una hoja de cálculo." },
    { title: "Hotel con PMS y múltiples outlets", scenario: "Hotel 5★ con restaurante, bar y room service. Usa Opera PMS y quiere coherencia de oferta y datos consolidados.", result: "Winerim centraliza la carta en todos los outlets, personaliza por perfil de huésped y genera reporting de F&B unificado." },
    { title: "Grupo con varios TPVs", scenario: "Grupo con 12 locales, cada uno con su TPV (Agora, ICG, Glop). Necesita benchmarking interno y gobierno del surtido.", result: "Winerim se conecta con cada TPV y consolida datos en un panel único. Compara rendimiento, detecta oportunidades y escala estrategias." },
  ],

  doesTitle: "Integraciones de Winerim: transparencia total",
  doesLabel: "Qué hacen las integraciones",
  doesItems: [
    "Sincronizan datos de venta del TPV para alimentar la analítica de Winerim",
    "Mantienen el stock actualizado automáticamente entre sistemas",
    "Permiten calcular márgenes reales con datos de coste del ERP",
    "Conectan la carta con el perfil del huésped en hoteles con PMS",
    "Consolidan datos de múltiples locales en un panel único para grupos",
    "Funcionan en segundo plano sin cambiar la operativa del restaurante",
  ],
  doesNotLabel: "Qué no hacen",
  doesNotItems: [
    "No sustituyen al TPV, PMS ni ERP: se conectan con ellos",
    "No requieren cambiar de sistema ni de proveedor tecnológico",
    "No todas las integraciones están disponibles desde el día 1: algunas están en desarrollo o requieren proyecto",
  ],

  ctaBadge: "Ecosistema conectado",
  ctaTitle: "Integra Winerim con tu ecosistema ", ctaTitleHighlight: "tecnológico",
  ctaDesc: "Te mostramos cómo conectar Winerim con los sistemas que ya utilizas. Sin fricciones, sin cambios operativos.",
  ctaBtn: "Solicitar demo", ctaSecondary: "Consultar integración",
  ctaMicro: "Si tu sistema no está en la lista, consúltanos. Evaluamos viabilidad técnica sin compromiso.",

  faqs: [
    { q: "¿Winerim se integra con mi TPV?", a: "Winerim se integra con más de 20 sistemas de punto de venta, incluyendo Agora, Revo, ICG, Glop, Toast, Clover, Square, Lightspeed y más. Si tu TPV no está en la lista, podemos evaluar una integración personalizada." },
    { q: "¿Las integraciones están todas disponibles?", a: "No todas. Diferenciamos claramente entre integraciones activas (listas para usar), en desarrollo (próximamente) y bajo proyecto (requieren evaluación técnica específica). Cada integración indica su estado actual." },
    { q: "¿Necesito cambiar de TPV para usar Winerim?", a: "No. Winerim se conecta con el sistema que ya usas. No requiere cambiar de proveedor ni de infraestructura tecnológica." },
    { q: "¿Cuánto tarda la integración?", a: "La mayoría de integraciones activas se configuran en menos de 48 horas. Las integraciones bajo proyecto pueden requerir más tiempo dependiendo de la complejidad técnica." },
    { q: "¿Las integraciones son bidireccionales?", a: "Depende del sistema. En la mayoría de TPVs, Winerim recibe datos de venta y envía actualizaciones de catálogo. La sincronización es automática y en tiempo real." },
    { q: "¿Se integra con PMS hoteleros?", a: "Sí, estamos desarrollando integraciones con los principales PMS hoteleros (Opera, Mews, Protel). Si tu hotel usa un PMS específico, consúltanos." },
    { q: "¿Tiene API para integraciones personalizadas?", a: "Sí. Winerim dispone de una API REST documentada disponible para clientes del plan Enterprise. Permite conectar cualquier sistema de forma programática." },
    { q: "¿Las integraciones tienen coste adicional?", a: "Las integraciones activas están incluidas en el plan Enterprise. Las integraciones bajo proyecto pueden tener un coste de desarrollo dependiendo de la complejidad." },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
/*  ENGLISH                                                   */
/* ═══════════════════════════════════════════════════════════ */

const EN: Content = {
  seoTitle: "Winerim Integrations | POS, PMS, ERP, Inventory & API",
  seoDesc: "Winerim integrates with your POS, hotel PMS, ERP and inventory systems. Connected ecosystem for restaurants, hotels and groups.",
  badge: "Connected ecosystem",
  breadProduct: "Product", breadLabel: "Integrations",
  h1: "Winerim connects with your ", h1Highlight: "operational ecosystem",
  subtitle: "We're not a standalone tool. Winerim integrates with your POS, hotel management, ERP and inventory systems. No friction, no changes to your operations.",
  ctaDemo: "Request demo", ctaContact: "Ask about integrations",
  heroSummary: "Winerim is designed to coexist with your restaurant or hotel's tech ecosystem, not to replace it. We connect the wine list with your sales, stock and operations data so you make decisions with real information.",

  whyLabel: "Why it matters", whyTitle1: "Without connection to your operations, wine is an ", whyTitleHighlight: "isolated data point",
  whyPains: [
    { text: "If the list doesn't connect to the POS, you don't know which wines actually sell or what margin they generate." },
    { text: "If stock isn't synced, you sell wines you don't have or keep non-rotating references on the list." },
    { text: "Without real sales data, purchase decisions are based on intuition, not performance." },
    { text: "In hotels, if the PMS isn't connected, you can't personalize the wine experience by guest profile." },
    { text: "In groups, without centralized integration each venue operates as an island: no benchmarking, no consistency." },
  ],

  solvesLabel: "What they solve", solvesTitle: "Operational benefits of integrations",
  solves: [
    { title: "Real sales data", desc: "The POS feeds Winerim with sales data by reference, period and service point." },
    { title: "Synced stock", desc: "Inventory reflects reality: entries, exits, waste and cross-location redistribution." },
    { title: "Pricing with context", desc: "Multipliers and margins calculated with real cost data, not estimates." },
    { title: "No duplicated work", desc: "What happens in the POS is automatically reflected in Winerim." },
    { title: "Consolidated analytics", desc: "Single panel with list, sales, stock and margin data for management." },
    { title: "Connected experience", desc: "In hotels, the list adapts to guest profiles. In groups, compare performance across venues." },
  ],

  statusActive: "Active integration", statusDev: "In development", statusCustom: "Custom project",

  posBadge: "Point of sale (POS)", posTitle: "Integration with ", posTitleHighlight: "POS systems",
  posDesc: "Winerim integrates with your POS to sync sales in real time, analyze wine consumption and feed performance analytics.",
  posNoteTitle: "Your POS not listed?", posNote: "Our team can evaluate and develop integrations with any POS system. Ask about availability.",
  pos: [
    { name: "Agora POS", desc: "Bidirectional sales, catalog and stock sync", status: "active" },
    { name: "Revo XEF", desc: "REST API with Bearer auth, sales and catalog", status: "active" },
    { name: "ICG FrontRest", desc: "On-prem POS via SQL Server. Sales, catalog and stock", status: "active" },
    { name: "Glop", desc: "POS with documented API for sales and items", status: "active" },
    { name: "Hiopos / Hioffice", desc: "CSV/XML export/import for sales and items", status: "active" },
    { name: "BDP NET", desc: "Weblink REST API with configurable URL and profile", status: "active" },
    { name: "Turbopos", desc: "On-prem integration without public API", status: "custom" },
    { name: "Zucchetti Tilby", desc: "Sales API and sandbox endpoints for Italy", status: "active" },
    { name: "Cassa in Cloud", desc: "TeamSystem enterprise POS with token auth", status: "active" },
    { name: "Scloby", desc: "OAuth2 + OpenAPI for orders and catalog", status: "active" },
    { name: "RCH", desc: "Integration via commercial channels", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "Zucchetti REST API for sales and orders", status: "active" },
    { name: "Toast POS", desc: "Real-time order, sales and menu sync", status: "active" },
    { name: "Clover", desc: "Orders, payments, items and webhooks with OAuth2", status: "active" },
    { name: "Square POS", desc: "Integrated payments, catalog and sales analytics", status: "active" },
    { name: "Lightspeed Restaurant", desc: "Cloud POS with financial data and webhooks", status: "active" },
    { name: "Revel Systems", desc: "REST API and menu webhooks", status: "development" },
    { name: "NCR Aloha", desc: "Cloud In-Store API with TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Sales, bills and items import", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "REST APIs with OAuth2/TLS for cloud transactions", status: "development" },
    { name: "SoftRestaurant", desc: "REST/JSON API with catalog endpoints", status: "active" },
    { name: "Poster POS", desc: "Developer portal with open API", status: "active" },
    { name: "Fudo", desc: "Order injection and catalog APIs", status: "active" },
  ],

  erpBadge: "Business management (ERP)", erpTitle: "Integration with management ", erpTitleHighlight: "systems",
  erpDesc: "Connect Winerim with your ERP to improve cellar control, automate supplier orders and get a complete view of costs and margins.",
  erp: [
    { name: "Holded", desc: "Cloud billing, inventory and accounting", status: "development" },
    { name: "Sage", desc: "ERP for financial and operational management", status: "development" },
    { name: "Odoo", desc: "Modular open-source ERP", status: "development" },
  ],

  pmsBadge: "Hotel management (PMS)", pmsTitle: "Integration with hotel ", pmsTitleHighlight: "PMS systems",
  pmsDesc: "In hotels, Winerim connects with the PMS to personalize guest experience, sync consumption data across outlets and feed F&B reporting.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Guest profile, room consumption and F&B reporting", status: "development" },
    { name: "Mews", desc: "Cloud PMS with open API for modern hospitality", status: "development" },
    { name: "Protel / Planet", desc: "F&B service integration with guest profile", status: "custom" },
    { name: "Clock PMS+", desc: "REST API for guest data and consumption", status: "custom" },
  ],

  invBadge: "Cellar control", invTitle: "Inventory and ", invTitleHighlight: "stock management",
  invDesc: "Winerim controls every bottle in your cellar: entry, exit, by-the-glass service, waste and cross-location redistribution.",
  invFeatures: [
    { label: "Real-time stock", desc: "Automatic stock control per bottle and glass at each service point." },
    { label: "Reference rotation", desc: "Identify which wines sell, which stagnate and which tie up capital." },
    { label: "Consumption per bottle & glass", desc: "Detailed consumption analytics to optimize purchasing and reduce waste." },
    { label: "Automatic alerts", desc: "Low stock, overstock, slow rotation and redistribution opportunity notifications." },
  ],

  apiBadge: "For technical teams", apiTitle: "Winerim ", apiTitleHighlight: "API",
  apiDesc: "Winerim offers a documented REST API for custom integrations. Connect any system with your wine list programmatically.",
  apiNote: "Full documentation available for Enterprise plan customers.",
  apiFeatures: [
    { label: "Automation", desc: "Sync data between Winerim and your systems without manual intervention." },
    { label: "Custom systems", desc: "Connect Winerim with your ERP, CRM, BI or any internal software." },
    { label: "Apps & platforms", desc: "Integrate Winerim with third-party apps, booking platforms or digital channels." },
  ],

  implLabel: "Implementation", implTitle: "How integration works", implSubtitle: "A process designed not to interrupt your operations.",
  implSteps: [
    { title: "1. Technical assessment", desc: "We review your current ecosystem: POS, PMS, ERP, stock processes. We identify what to connect and how." },
    { title: "2. Configuration", desc: "We configure the integration with your system. In most cases, activated in under 48 hours." },
    { title: "3. Validation", desc: "We verify data flows correctly: sales, stock, catalog. We adjust what's needed." },
    { title: "4. Operation", desc: "The integration runs in the background. Data syncs automatically without manual intervention." },
  ],

  ucLabel: "Use cases", ucTitle: "How it works in practice",
  useCases: [
    { title: "Independent restaurant with POS", scenario: "Restaurant with Revo XEF and 70-wine list. Wants to know which wines actually sell.", result: "Winerim connects with Revo and receives real-time sales data. The owner sees rotation, margin and ticket per wine without touching a spreadsheet." },
    { title: "Hotel with PMS and multiple outlets", scenario: "5★ hotel with restaurant, bar and room service. Uses Opera PMS and wants consistent offer and consolidated data.", result: "Winerim centralizes the list across all outlets, personalizes by guest profile and generates unified F&B reporting." },
    { title: "Group with multiple POS systems", scenario: "Group with 12 venues, each with its own POS. Needs internal benchmarking and assortment governance.", result: "Winerim connects with each POS and consolidates data in a single panel. Compares performance, detects opportunities and scales strategies." },
  ],

  doesTitle: "Winerim integrations: full transparency",
  doesLabel: "What integrations do",
  doesItems: [
    "Sync POS sales data to feed Winerim's analytics",
    "Keep stock automatically updated between systems",
    "Enable real margin calculation with ERP cost data",
    "Connect the list with guest profiles in hotels with PMS",
    "Consolidate multi-location data in a single panel for groups",
    "Run in the background without changing restaurant operations",
  ],
  doesNotLabel: "What they don't do",
  doesNotItems: [
    "Don't replace your POS, PMS or ERP: they connect with them",
    "Don't require changing systems or technology providers",
    "Not all integrations are available from day 1: some are in development or require a custom project",
  ],

  ctaBadge: "Connected ecosystem",
  ctaTitle: "Integrate Winerim with your ", ctaTitleHighlight: "tech stack",
  ctaDesc: "We'll show you how to connect Winerim with the systems you already use. No friction, no operational changes.",
  ctaBtn: "Request demo", ctaSecondary: "Ask about integrations",
  ctaMicro: "If your system isn't listed, ask us. We evaluate technical feasibility with no commitment.",

  faqs: [
    { q: "Does Winerim integrate with my POS?", a: "Winerim integrates with 20+ POS systems including Agora, Revo, ICG, Glop, Toast, Clover, Square, Lightspeed and more. If yours isn't listed, we can evaluate a custom integration." },
    { q: "Are all integrations available?", a: "Not all. We clearly differentiate between active integrations (ready to use), in development (coming soon) and custom project (require specific technical evaluation). Each shows its current status." },
    { q: "Do I need to change my POS?", a: "No. Winerim connects with your existing system. No provider or infrastructure changes required." },
    { q: "How long does integration take?", a: "Most active integrations are configured in under 48 hours. Custom projects may take longer depending on technical complexity." },
    { q: "Are integrations bidirectional?", a: "Depends on the system. Most POS integrations receive sales data and send catalog updates. Sync is automatic and real-time." },
    { q: "Does it integrate with hotel PMS?", a: "Yes, we're developing integrations with major hotel PMS (Opera, Mews, Protel). Ask us about your specific PMS." },
    { q: "Is there an API for custom integrations?", a: "Yes. Winerim has a documented REST API available for Enterprise plan customers." },
    { q: "Do integrations cost extra?", a: "Active integrations are included in the Enterprise plan. Custom projects may have a development cost depending on complexity." },
  ],
};

const IT: Content = { ...EN,
  seoTitle: "Integrazioni Winerim | POS, PMS, ERP, Inventario e API",
  seoDesc: "Winerim si integra con POS, PMS, ERP e sistemi di inventario. Ecosistema connesso per ristoranti, hotel e gruppi.",
  badge: "Ecosistema connesso", breadProduct: "Prodotto", breadLabel: "Integrazioni",
  h1: "Winerim si collega al tuo ", h1Highlight: "ecosistema operativo",
  subtitle: "Non siamo uno strumento isolato. Winerim si integra con i sistemi POS, PMS, ERP e inventario che già utilizzi.",
  ctaDemo: "Richiedi demo", ctaContact: "Chiedi info integrazione",
  statusActive: "Integrazione attiva", statusDev: "In sviluppo", statusCustom: "Su progetto",
  ctaBtn: "Richiedi demo", ctaSecondary: "Chiedi info integrazione",
};

const FR: Content = { ...EN,
  seoTitle: "Intégrations Winerim | POS, PMS, ERP, Inventaire et API",
  seoDesc: "Winerim s'intègre avec vos systèmes POS, PMS, ERP et inventaire. Écosystème connecté pour restaurants, hôtels et groupes.",
  badge: "Écosystème connecté", breadProduct: "Produit", breadLabel: "Intégrations",
  h1: "Winerim se connecte à votre ", h1Highlight: "écosystème opérationnel",
  subtitle: "Nous ne sommes pas un outil isolé. Winerim s'intègre aux systèmes POS, PMS, ERP et inventaire que vous utilisez déjà.",
  ctaDemo: "Demander une démo", ctaContact: "Renseignements intégration",
  statusActive: "Intégration active", statusDev: "En développement", statusCustom: "Sur projet",
  ctaBtn: "Demander une démo", ctaSecondary: "Renseignements intégration",
};

const contentMap: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR };

/* ─── helpers ─── */
const invIcons = [Wine, RefreshCw, BarChart3, Layers];
const apiIcons = [Zap, Database, Globe];
const solveIcons = [BarChart3, RefreshCw, TrendingUp, CheckCircle, Layers, Users];
const implIcons = [Settings, Wrench, ShieldCheck, Zap];
const ucIcons = [Monitor, Globe, Layers];

const StatusBadge = ({ status, t }: { status: Integration["status"]; t: Content }) => {
  const cfg = {
    active: { label: t.statusActive, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: Check },
    development: { label: t.statusDev, cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
    custom: { label: t.statusCustom, cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", icon: Wrench },
  }[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${cfg.cls}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════ */

const Integraciones = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = contentMap[lang] || contentMap.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "integraciones-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.seoTitle,
      description: t.seoDesc,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.heroSummary,
        offers: { "@type": "Offer", category: "Enterprise" },
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("integraciones-jsonld")?.remove(); };
  }, [t]);

  const renderIntGrid = (items: Integration[], cols = "lg:grid-cols-3") => (
    <div className={`grid sm:grid-cols-2 ${cols} gap-4`}>
      {items.map((int, i) => (
        <ScrollReveal key={i} delay={i * 0.03}>
          <div className="bg-gradient-card rounded-xl border border-border p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-sm">{int.name}</h3>
              <StatusBadge status={int.status} t={t} />
            </div>
            <p className="text-xs text-muted-foreground mt-auto">{int.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/integraciones")}`} hreflang={allLangPaths("/integraciones")} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadProduct, href: localePath("/software-carta-de-vinos") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Plug size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1}<span className="text-gradient-wine italic">{t.h1Highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaDemo} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SUMMARY ── */}
      <section className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-wine/15 p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">{t.heroSummary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY INTEGRATIONS MATTER ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.whyLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.whyTitle1}<span className="text-gradient-wine italic">{t.whyTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.whyPains.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT THEY SOLVE ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solvesLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.solvesTitle}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.solves.map((s, i) => {
              const Icon = solveIcons[i] || CheckCircle;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── POS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Monitor size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.posBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.posTitle}<span className="text-gradient-wine italic">{t.posTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.posDesc}</p>
          </ScrollReveal>
          {renderIntGrid(t.pos)}
          <ScrollReveal delay={0.2} className="mt-8">
            <div className="bg-wine/5 border border-wine/20 rounded-xl p-5 flex items-start gap-3">
              <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t.posNoteTitle}</span> {t.posNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PMS ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Globe size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.pmsBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.pmsTitle}<span className="text-gradient-wine italic">{t.pmsTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.pmsDesc}</p>
          </ScrollReveal>
          {renderIntGrid(t.pms, "lg:grid-cols-2")}
        </div>
      </section>

      {/* ── ERP ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.erpBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.erpTitle}<span className="text-gradient-wine italic">{t.erpTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.erpDesc}</p>
          </ScrollReveal>
          {renderIntGrid(t.erp)}
        </div>
      </section>

      {/* ── INVENTORY ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Warehouse size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.invBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.invTitle}<span className="text-gradient-wine italic">{t.invTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.invDesc}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.invFeatures.map((feat, i) => {
              const Icon = invIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{feat.label}</h3>
                      <p className="text-sm text-muted-foreground">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── API ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Code2 size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.apiBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.apiTitle}<span className="text-gradient-wine italic">{t.apiTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.apiDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {t.apiFeatures.map((feat, i) => {
              const Icon = apiIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-semibold mb-1">{feat.label}</h3>
                    <p className="text-sm text-muted-foreground">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <div className="font-mono text-xs text-muted-foreground bg-background rounded-lg p-5 overflow-x-auto">
                <pre>{`GET  /api/v1/wine-list          → Wine list
GET  /api/v1/wines/:id          → Wine detail
POST /api/v1/wines              → Add reference
PUT  /api/v1/wines/:id/stock    → Update stock
GET  /api/v1/analytics/sales    → Sales data
GET  /api/v1/analytics/rotation → Cellar rotation`}</pre>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{t.apiNote}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── IMPLEMENTATION ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.implLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.implTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.implSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.implSteps.map((step, i) => {
              const Icon = implIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold text-sm mb-1.5">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.ucLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.ucTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => {
              const Icon = ucIcons[i] || Monitor;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-sm font-bold">{uc.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="mt-auto flex items-start gap-2 bg-wine/5 rounded-lg p-3">
                      <CheckCircle size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOES / DOESN'T ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.doesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.doesLabel}</p>
                <ul className="space-y-3">
                  {t.doesItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.doesNotLabel}</p>
                <ul className="space-y-3">
                  {t.doesNotItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQSection faqs={t.faqs} schemaId="integraciones" />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
                {t.ctaTitle}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaBtn} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/contacto")} className="inline-flex items-center justify-center gap-2 border border-border hover:border-wine/30 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:-translate-y-0.5 text-muted-foreground hover:text-foreground">
                  {t.ctaSecondary}
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60 max-w-lg mx-auto">{t.ctaMicro}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <NextSteps
        title={{ es: "Siguientes pasos", en: "Next steps", it: "Prossimi passi", fr: "Prochaines étapes" }[lang]}
        steps={[
          { to: "/demo", label: { es: "Solicitar demo", en: "Request demo", it: "Richiedi demo", fr: "Demander démo" }[lang]!, description: { es: "Te mostramos cómo se integra con tu ecosistema.", en: "We show you how it integrates with your stack.", it: "Ti mostriamo come si integra con il tuo ecosistema.", fr: "Nous vous montrons comment il s'intègre à votre écosystème." }[lang]!, type: "solution" },
          { to: "/precios", label: { es: "Planes y precios", en: "Plans and pricing", it: "Piani e prezzi", fr: "Plans et tarifs" }[lang]!, description: { es: "Las integraciones activas están en el plan Enterprise.", en: "Active integrations are in the Enterprise plan.", it: "Le integrazioni attive sono nel piano Enterprise.", fr: "Les intégrations actives sont dans le plan Enterprise." }[lang]!, type: "solution" },
          { to: "/soluciones/hoteles", label: { es: "Winerim para hoteles", en: "Winerim for hotels", it: "Winerim per hotel", fr: "Winerim pour hôtels" }[lang]!, description: { es: "Integración con PMS y múltiples outlets.", en: "PMS integration and multiple outlets.", it: "Integrazione con PMS e molteplici punti vendita.", fr: "Intégration PMS et points de vente multiples." }[lang]!, type: "solution" },
          { to: "/soluciones/grupos-restauracion", label: { es: "Winerim para grupos", en: "Winerim for groups", it: "Winerim per gruppi", fr: "Winerim pour groupes" }[lang]!, description: { es: "Integración centralizada multi-TPV.", en: "Centralized multi-POS integration.", it: "Integrazione centralizzata multi-POS.", fr: "Intégration centralisée multi-POS." }[lang]!, type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: { es: "Software de carta de vinos", en: "Wine list software", it: "Software carta dei vini", fr: "Logiciel carte des vins" }[lang]!, type: "solution" },
        { to: localePath("/funcionalidades"), label: { es: "Todas las funcionalidades", en: "All features", it: "Tutte le funzionalità", fr: "Toutes les fonctionnalités" }[lang]!, type: "solution" },
        { to: localePath("/producto/inteligencia-dinamica"), label: { es: "Inteligencia dinámica", en: "Dynamic intelligence", it: "Intelligenza dinamica", fr: "Intelligence dynamique" }[lang]!, type: "solution" },
        { to: localePath("/soluciones/restaurantes-sin-sumiller"), label: { es: "Para restaurantes sin sumiller", en: "For restaurants without sommelier", it: "Per ristoranti senza sommelier", fr: "Pour restaurants sans sommelier" }[lang]!, type: "solution" },
        { to: localePath("/casos-exito"), label: { es: "Casos de éxito", en: "Case studies", it: "Casi di successo", fr: "Cas clients" }[lang]!, type: "solution" },
        { to: localePath("/comparativas"), label: { es: "Compara Winerim", en: "Compare Winerim", it: "Confronta Winerim", fr: "Comparez Winerim" }[lang]!, type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default Integraciones;
