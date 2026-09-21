import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plug, Monitor, Database, Warehouse, Code2,
  RefreshCw, BarChart3, Wine, CheckCircle, Layers, Zap, Globe,
  AlertTriangle, Check, X, Clock, Wrench, ShieldCheck, Settings,
  TrendingUp, Users, Cloud
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
  /* CloudRIM */
  cloudBadge: string; cloudTitle: string; cloudTitleHighlight: string; cloudDesc: string; cloudDesc2: string;
  cloudBullets: string[];
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

  statusActive: "Integración verificada", statusDev: "En desarrollo", statusCustom: "Disponibilidad a validar",

  posBadge: "Punto de venta (TPV)", posTitle: "Integración con ", posTitleHighlight: "TPV / POS",
  posDesc: "Con una integración validada, Winerim recibe ventas, catálogo o stock para convertir la operativa del TPV en trazabilidad y analítica. El alcance, la dirección y la frecuencia se confirman para cada proveedor y establecimiento.",
  posNoteTitle: "¿Tu TPV no está en la lista?", posNote: "Podemos revisar su API, exportaciones y permisos. La viabilidad, el alcance y el coste se confirman por escrito antes de activar nada.",
  pos: [
    { name: "Agora POS", desc: "Sincronización bidireccional de ventas, catálogo y stock", status: "active" },
    { name: "Revo XEF", desc: "Conector sujeto a preflight, permisos, mapeo y piloto de lectura", status: "custom" },
    { name: "ICG FrontRest", desc: "POS on-premise con acceso SQL Server por validar", status: "custom" },
    { name: "Glop", desc: "TPV con API documentada; alcance por validar", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "Importación CSV/XML sujeta a muestra y mapeo", status: "custom" },
    { name: "BDP NET", desc: "REST API Weblink; acceso y alcance por validar", status: "custom" },
    { name: "Turbopos", desc: "Integración on-premise sin API pública", status: "custom" },
    { name: "Zucchetti Tilby", desc: "API de ventas y sandbox para Italia por validar", status: "custom" },
    { name: "Cassa in Cloud", desc: "POS TeamSystem; permisos y alcance por validar", status: "custom" },
    { name: "Scloby", desc: "OAuth2 + OpenAPI; alcance por validar", status: "custom" },
    { name: "RCH", desc: "Integración vía canales comerciales", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "API REST Zucchetti; alcance por validar", status: "custom" },
    { name: "Toast POS", desc: "API de pedidos, ventas y menús; alcance por validar", status: "custom" },
    { name: "Clover", desc: "Pedidos, pagos, artículos y webhooks; alcance por validar", status: "custom" },
    { name: "Square POS", desc: "Pagos, catálogo y ventas; alcance por validar", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "TPV cloud con datos financieros; alcance por validar", status: "custom" },
    { name: "Revel Systems", desc: "REST API y webhooks de menú", status: "development" },
    { name: "NCR Aloha", desc: "API cloud In-Store con TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Importación de ventas, facturas y artículos", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "APIs REST con OAuth2/TLS para transacciones cloud", status: "development" },
    { name: "SoftRestaurant", desc: "API REST/JSON; alcance por validar", status: "custom" },
    { name: "Poster POS", desc: "Portal de desarrolladores; alcance por validar", status: "custom" },
    { name: "Fudo", desc: "APIs de pedidos y catálogo; alcance por validar", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "Cuando no hay integración perfecta, ",
  cloudTitleHighlight: "también hay camino",
  cloudDesc: "No todos los TPV, ERPs o distribuidores ofrecen una API limpia desde el primer día. CloudRIM permite recoger información por archivos, email, carpetas compartidas o FTP/SFTP, procesarla con IA y conectarla con Winerim.",
  cloudDesc2: "Esto permite empezar antes: ventas exportadas del TPV, tarifas enviadas por email, albaranes en PDF o reportes de stock se convierten en datos accionables sin obligar al restaurante a introducirlos a mano.",
  cloudBullets: [
    "Portal, email, carpetas compartidas, FTP/SFTP, API o proveedor.",
    "Albaranes, facturas, tarifas, cartas, stock y reportes de ventas.",
    "Clasificación y enrutado hacia carta, compras, stock, ventas y margen.",
    "Revisión humana solo en lo que necesita confirmación.",
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
    { label: "Stock conectado", desc: "Control de existencias por botella y por copa cuando el conector y el flujo operativo lo permiten." },
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
    { title: "2. Configuración", desc: "Configuramos accesos, mapeos y frecuencia de lectura según el sistema y el alcance acordado." },
    { title: "3. Validación", desc: "Verificamos que los datos fluyen correctamente: ventas, stock, catálogo. Ajustamos lo que haga falta." },
    { title: "4. Operación", desc: "La integración funciona en segundo plano. Los datos se sincronizan automáticamente sin intervención manual." },
  ],

  ucLabel: "Casos de uso", ucTitle: "Cómo funciona en la práctica",
  useCases: [
    { title: "Restaurante independiente con TPV", scenario: "Restaurante con Revo XEF y carta de 70 vinos. Quiere saber qué vinos se venden realmente y cuáles sobran.", result: "Tras validar accesos y mapeos, Winerim puede incorporar ventas del TPV y mostrar rotación, margen y ticket por vino con una frecuencia acordada." },
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
    { q: "¿Winerim se integra con mi TPV?", a: "Ágora dispone de un flujo verificado. Para REVO XEF y otros sistemas evaluamos accesos, datos disponibles, mapeo y frecuencia antes de confirmar el alcance de la integración." },
    { q: "¿Las integraciones están todas disponibles?", a: "No todas. Diferenciamos claramente entre integraciones activas (listas para usar), en desarrollo (próximamente) y bajo proyecto (requieren evaluación técnica específica). Cada integración indica su estado actual." },
    { q: "¿Necesito cambiar de TPV para usar Winerim?", a: "No. Winerim se conecta con el sistema que ya usas. No requiere cambiar de proveedor ni de infraestructura tecnológica." },
    { q: "¿Cuánto tarda la integración?", a: "Depende del proveedor, los permisos, la calidad del catálogo y el número de establecimientos. Tras el preflight entregamos un alcance y un plan de activación verificables." },
    { q: "¿Las integraciones son bidireccionales?", a: "No necesariamente. Cada conector documenta qué datos lee, qué datos puede escribir y con qué frecuencia. No asumimos bidireccionalidad ni tiempo real continuo sin validación técnica." },
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

  statusActive: "Verified integration", statusDev: "In development", statusCustom: "Availability to verify",

  posBadge: "Point of sale (POS)", posTitle: "Integration with ", posTitleHighlight: "POS systems",
  posDesc: "With a validated integration, Winerim can receive sales, catalog or stock data and turn POS activity into traceability and analytics. Scope, direction and frequency are confirmed for each provider and venue.",
  posNoteTitle: "Your POS not listed?", posNote: "We can review its API, exports and permissions. Feasibility, scope and cost are confirmed in writing before anything is activated.",
  pos: [
    { name: "Agora POS", desc: "Bidirectional sales, catalog and stock sync", status: "active" },
    { name: "Revo XEF", desc: "Connector subject to preflight, permissions, mapping and read pilot", status: "custom" },
    { name: "ICG FrontRest", desc: "On-prem SQL Server access to be validated", status: "custom" },
    { name: "Glop", desc: "Documented POS API; scope to be validated", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "CSV/XML imports subject to sample and mapping", status: "custom" },
    { name: "BDP NET", desc: "REST Weblink API; access and scope to be validated", status: "custom" },
    { name: "Turbopos", desc: "On-prem integration without public API", status: "custom" },
    { name: "Zucchetti Tilby", desc: "Sales API and sandbox for Italy to be validated", status: "custom" },
    { name: "Cassa in Cloud", desc: "TeamSystem POS; permissions and scope to be validated", status: "custom" },
    { name: "Scloby", desc: "OAuth2 + OpenAPI; scope to be validated", status: "custom" },
    { name: "RCH", desc: "Integration via commercial channels", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "Zucchetti REST API; scope to be validated", status: "custom" },
    { name: "Toast POS", desc: "Orders, sales and menu APIs; scope to be validated", status: "custom" },
    { name: "Clover", desc: "Orders, payments, items and webhooks; scope to be validated", status: "custom" },
    { name: "Square POS", desc: "Payments, catalog and sales; scope to be validated", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "Cloud POS with financial data; scope to be validated", status: "custom" },
    { name: "Revel Systems", desc: "REST API and menu webhooks", status: "development" },
    { name: "NCR Aloha", desc: "Cloud In-Store API with TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Sales, bills and items import", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "REST APIs with OAuth2/TLS for cloud transactions", status: "development" },
    { name: "SoftRestaurant", desc: "REST/JSON API; scope to be validated", status: "custom" },
    { name: "Poster POS", desc: "Developer portal; scope to be validated", status: "custom" },
    { name: "Fudo", desc: "Order and catalog APIs; scope to be validated", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "When there is no perfect integration, ",
  cloudTitleHighlight: "there is still a path",
  cloudDesc: "Not every POS, ERP or distributor offers a clean API from day one. CloudRIM can collect information via files, email, shared folders or FTP/SFTP, process it with AI and connect it with Winerim.",
  cloudDesc2: "That lets you start earlier: POS exports, distributor tariffs by email, delivery notes in PDF or stock reports become actionable data without forcing the restaurant to enter everything by hand.",
  cloudBullets: [
    "Portal, email, shared folders, FTP/SFTP, API or provider.",
    "Delivery notes, invoices, tariffs, wine lists, stock and sales reports.",
    "Classification and routing to list, purchasing, stock, sales and margin.",
    "Human review only where confirmation is needed.",
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
    { label: "Connected stock", desc: "Inventory control by bottle and glass when the connector and operating workflow support it." },
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
    { title: "2. Configuration", desc: "We configure access, mapping and reading frequency for the agreed system and scope." },
    { title: "3. Validation", desc: "We verify data flows correctly: sales, stock, catalog. We adjust what's needed." },
    { title: "4. Operation", desc: "The integration runs in the background. Data syncs automatically without manual intervention." },
  ],

  ucLabel: "Use cases", ucTitle: "How it works in practice",
  useCases: [
    { title: "Independent restaurant with POS", scenario: "Restaurant with Revo XEF and a 70-wine list. It wants to know which wines actually sell.", result: "Once access and mapping are validated, Winerim can import POS sales and show rotation, margin and ticket by wine at an agreed frequency." },
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
    { q: "Does Winerim integrate with my POS?", a: "Agora has a verified workflow. For REVO XEF and other systems, we evaluate access, available data, mapping and frequency before confirming the integration scope." },
    { q: "Are all integrations available?", a: "Not all. We clearly differentiate between active integrations (ready to use), in development (coming soon) and custom project (require specific technical evaluation). Each shows its current status." },
    { q: "Do I need to change my POS?", a: "No. Winerim connects with your existing system. No provider or infrastructure changes required." },
    { q: "How long does integration take?", a: "It depends on the provider, permissions, catalog quality and number of venues. After preflight, we provide a verifiable scope and activation plan." },
    { q: "Are integrations bidirectional?", a: "Not necessarily. Each connector documents what it reads, what it can write and at what frequency. We do not assume bidirectionality or continuous real-time sync without technical validation." },
    { q: "Does it integrate with hotel PMS?", a: "Yes, we're developing integrations with major hotel PMS (Opera, Mews, Protel). Ask us about your specific PMS." },
    { q: "Is there an API for custom integrations?", a: "Yes. Winerim has a documented REST API available for Enterprise plan customers." },
    { q: "Do integrations cost extra?", a: "Active integrations are included in the Enterprise plan. Custom projects may have a development cost depending on complexity." },
  ],
};

const IT: Content = {
  seoTitle: "Integrazioni Winerim | POS, PMS, ERP, Inventario e API",
  seoDesc: "Winerim si integra con POS, PMS, ERP e sistemi di inventario. Ecosistema connesso per ristoranti, hotel e gruppi.",
  badge: "Ecosistema connesso", breadProduct: "Prodotto", breadLabel: "Integrazioni",
  h1: "Winerim si collega al tuo ", h1Highlight: "ecosistema operativo",
  subtitle: "Non siamo uno strumento isolato. Winerim si integra con i sistemi POS, PMS, ERP e inventario che già utilizzi, senza stravolgere l'operatività.",
  ctaDemo: "Richiedi demo", ctaContact: "Chiedi info integrazione",
  heroSummary: "Winerim è progettato per convivere con l'ecosistema tecnologico del ristorante o dell'hotel, non per sostituirlo. Colleghiamo la carta dei vini ai dati di vendita, stock e operatività per prendere decisioni basate su informazioni reali.",

  whyLabel: "Perché è importante", whyTitle1: "Senza un collegamento con l'operatività, il vino resta un ", whyTitleHighlight: "dato isolato",
  whyPains: [
    { text: "Se la carta non è collegata al POS, non sai quali vini vendono davvero né quale margine generano." },
    { text: "Se lo stock non è aggiornato, rischi di vendere vini esauriti o mantenere in carta referenze ferme." },
    { text: "Senza dati di vendita reali, gli acquisti si basano sull'intuizione invece che sui risultati." },
    { text: "Negli hotel, senza collegamento al PMS non puoi adattare l'esperienza del vino al profilo dell'ospite." },
    { text: "Nei gruppi, senza un'integrazione centrale ogni locale opera da solo: niente benchmark e poca coerenza." },
  ],

  solvesLabel: "Cosa risolvono", solvesTitle: "Vantaggi operativi delle integrazioni",
  solves: [
    { title: "Dati di vendita reali", desc: "Il POS alimenta Winerim con vendite per referenza, periodo e punto di servizio." },
    { title: "Stock collegato", desc: "L'inventario riflette entrate, uscite, sprechi e trasferimenti tra locali secondo il flusso validato." },
    { title: "Prezzi con contesto", desc: "Moltiplicatori e margini utilizzano dati di costo reali invece di stime." },
    { title: "Meno lavoro duplicato", desc: "I dati concordati vengono trasferiti alla frequenza convalidata, evitando reinserimenti manuali." },
    { title: "Analisi consolidate", desc: "Un unico pannello riunisce carta, vendite, stock e margini per la direzione." },
    { title: "Esperienza connessa", desc: "Negli hotel e nei gruppi, i dati permettono confronti e decisioni coerenti tra punti vendita." },
  ],

  statusActive: "Integrazione verificata", statusDev: "In sviluppo", statusCustom: "Disponibilità da verificare",

  posBadge: "Punto vendita (POS)", posTitle: "Integrazione con i ", posTitleHighlight: "sistemi POS",
  posDesc: "Con un'integrazione convalidata, Winerim può ricevere dati di vendita, catalogo o stock e trasformare l'attività del POS in tracciabilità e analisi. Ambito, direzione e frequenza vengono confermati per ogni fornitore e locale.",
  posNoteTitle: "Il tuo POS non è nell'elenco?", posNote: "Possiamo esaminarne API, esportazioni e permessi. Fattibilità, ambito e costo vengono confermati per iscritto prima di qualsiasi attivazione.",
  pos: [
    { name: "Agora POS", desc: "Sincronizzazione bidirezionale verificata di vendite, catalogo e stock", status: "active" },
    { name: "Revo XEF", desc: "Connettore soggetto a preflight, permessi, mappatura e test di lettura", status: "custom" },
    { name: "ICG FrontRest", desc: "Accesso locale a SQL Server da convalidare", status: "custom" },
    { name: "Glop", desc: "API POS documentata; ambito da convalidare", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "Importazioni CSV/XML soggette a campione e mappatura", status: "custom" },
    { name: "BDP NET", desc: "API REST Weblink; accesso e ambito da convalidare", status: "custom" },
    { name: "Turbopos", desc: "Integrazione locale senza API pubblica", status: "custom" },
    { name: "Zucchetti Tilby", desc: "API vendite e sandbox per l'Italia da convalidare", status: "custom" },
    { name: "Cassa in Cloud", desc: "POS TeamSystem; permessi e ambito da convalidare", status: "custom" },
    { name: "Scloby", desc: "OAuth2 e OpenAPI; ambito da convalidare", status: "custom" },
    { name: "RCH", desc: "Integrazione tramite canali commerciali", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "API REST Zucchetti; ambito da convalidare", status: "custom" },
    { name: "Toast POS", desc: "API di ordini, vendite e menu; ambito da convalidare", status: "custom" },
    { name: "Clover", desc: "Ordini, pagamenti, articoli e webhook; ambito da convalidare", status: "custom" },
    { name: "Square POS", desc: "Pagamenti, catalogo e vendite; ambito da convalidare", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "POS cloud con dati finanziari; ambito da convalidare", status: "custom" },
    { name: "Revel Systems", desc: "API REST e webhook del menu", status: "development" },
    { name: "NCR Aloha", desc: "API cloud In-Store con TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Importazione di vendite, conti e articoli", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "API REST con OAuth2/TLS per transazioni cloud", status: "development" },
    { name: "SoftRestaurant", desc: "API REST/JSON; ambito da convalidare", status: "custom" },
    { name: "Poster POS", desc: "Portale sviluppatori; ambito da convalidare", status: "custom" },
    { name: "Fudo", desc: "API di ordini e catalogo; ambito da convalidare", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "Quando non esiste un'integrazione perfetta, ", cloudTitleHighlight: "c'e comunque una strada",
  cloudDesc: "Non tutti i POS, ERP o distributori offrono una API pulita dal primo giorno. CloudRIM raccoglie informazioni tramite file, email, cartelle condivise o FTP/SFTP, le elabora con IA e le collega a Winerim.",
  cloudDesc2: "Questo permette di iniziare prima: export POS, tariffe via email, documenti in PDF o report stock diventano dati operativi senza obbligare il ristorante a inserirli a mano.",
  cloudBullets: ["Portale, email, cartelle condivise, FTP/SFTP, API o fornitore.", "Documenti, fatture, tariffe, carte, stock e report vendite.", "Classificazione e instradamento verso carta, acquisti, stock, vendite e margine.", "Revisione umana solo dove serve conferma."],

  erpBadge: "Gestione aziendale (ERP)", erpTitle: "Integrazione con i sistemi di ", erpTitleHighlight: "gestione",
  erpDesc: "Collega Winerim al tuo ERP per migliorare il controllo della cantina, preparare gli ordini ai fornitori e ottenere una visione completa di costi e margini.",
  erp: [
    { name: "Holded", desc: "Fatturazione, inventario e contabilità in cloud", status: "development" },
    { name: "Sage", desc: "ERP per la gestione finanziaria e operativa", status: "development" },
    { name: "Odoo", desc: "ERP modulare open source", status: "development" },
  ],

  pmsBadge: "Gestione alberghiera (PMS)", pmsTitle: "Integrazione con i ", pmsTitleHighlight: "PMS alberghieri",
  pmsDesc: "Negli hotel, Winerim si collega al PMS per coordinare l'esperienza dell'ospite, i consumi tra outlet e la reportistica F&B, entro l'ambito convalidato.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Profilo ospite, consumi in camera e reportistica F&B", status: "development" },
    { name: "Mews", desc: "PMS cloud con API aperta per l'hospitality", status: "development" },
    { name: "Protel / Planet", desc: "Collegamento dei servizi F&B al profilo ospite", status: "custom" },
    { name: "Clock PMS+", desc: "API REST per dati dell'ospite e consumi", status: "custom" },
  ],

  invBadge: "Controllo della cantina", invTitle: "Gestione di inventario e ", invTitleHighlight: "stock",
  invDesc: "Winerim controlla ogni bottiglia della cantina: ingresso, uscita, servizio al calice, spreco e trasferimento tra locali.",
  invFeatures: [
    { label: "Stock collegato", desc: "Controllo per bottiglia e calice quando il connettore e il flusso operativo lo consentono." },
    { label: "Rotazione delle referenze", desc: "Individua i vini che vendono, quelli fermi e quelli che immobilizzano capitale." },
    { label: "Consumo per bottiglia e calice", desc: "Analisi dettagliata per ottimizzare gli acquisti e ridurre gli sprechi." },
    { label: "Avvisi operativi", desc: "Segnalazioni di stock basso, eccesso, rotazione lenta e opportunità di trasferimento." },
  ],

  apiBadge: "Per i team tecnici", apiTitle: "API ", apiTitleHighlight: "Winerim",
  apiDesc: "Winerim offre una API REST documentata per integrazioni personalizzate. Collega la carta dei vini ad altri sistemi in modo programmato.",
  apiNote: "Documentazione completa disponibile per i clienti del piano Enterprise.",
  apiFeatures: [
    { label: "Automazione", desc: "Scambia i dati concordati tra Winerim e i tuoi sistemi secondo l'ambito convalidato." },
    { label: "Sistemi personalizzati", desc: "Collega Winerim a ERP, CRM, BI o software interni." },
    { label: "App e piattaforme", desc: "Integra applicazioni di terzi, piattaforme di prenotazione o canali digitali." },
  ],

  implLabel: "Implementazione", implTitle: "Come funziona l'integrazione", implSubtitle: "Un processo progettato per non interrompere l'operatività.",
  implSteps: [
    { title: "1. Valutazione tecnica", desc: "Esaminiamo POS, PMS, ERP e processi di stock per definire cosa collegare e come." },
    { title: "2. Configurazione", desc: "Configuriamo accessi, mappatura e frequenza di lettura per il sistema e l'ambito concordati." },
    { title: "3. Validazione", desc: "Verifichiamo il flusso di vendite, stock e catalogo e correggiamo le eccezioni rilevate." },
    { title: "4. Operatività", desc: "Il connettore lavora secondo l'ambito documentato, con controlli e verifiche successive." },
  ],

  ucLabel: "Casi d'uso", ucTitle: "Come funziona nella pratica",
  useCases: [
    { title: "Ristorante indipendente con POS", scenario: "Ristorante con Revo XEF e una carta di 70 vini. Vuole sapere quali referenze vendono davvero.", result: "Dopo la validazione di accessi e mappatura, Winerim può importare le vendite e mostrare rotazione, margine e scontrino per vino alla frequenza concordata." },
    { title: "Hotel con PMS e più outlet", scenario: "Hotel 5★ con ristorante, bar e room service. Usa Opera PMS e vuole un'offerta coerente e dati consolidati.", result: "Nell'ambito convalidato, Winerim centralizza la carta, collega i consumi e prepara una reportistica F&B unificata." },
    { title: "Gruppo con più sistemi POS", scenario: "Gruppo con 12 locali e POS diversi. Ha bisogno di benchmark interno e governo dell'assortimento.", result: "Winerim consolida i dati disponibili in un unico pannello per confrontare risultati, individuare opportunità e coordinare le decisioni." },
  ],

  doesTitle: "Integrazioni Winerim: piena trasparenza",
  doesLabel: "Cosa fanno le integrazioni",
  doesItems: [
    "Acquisiscono i dati di vendita concordati per alimentare le analisi di Winerim",
    "Aggiornano lo stock alla frequenza convalidata quando il connettore lo consente",
    "Collegano costi ERP e vendite per calcolare margini su basi coerenti",
    "Collegano carta e dati PMS entro l'ambito approvato",
    "Consolidano i dati disponibili di più locali in un unico pannello",
    "Documentano origine, frequenza, mappatura, eccezioni e verifica finale",
  ],
  doesNotLabel: "Cosa non fanno",
  doesNotItems: [
    "Non sostituiscono POS, PMS o ERP: si collegano a questi sistemi",
    "Non richiedono automaticamente di cambiare fornitore o infrastruttura",
    "Non tutte le integrazioni sono subito disponibili: alcune richiedono valutazione o sviluppo",
  ],

  ctaBadge: "Ecosistema connesso",
  ctaTitle: "Collega Winerim al tuo ", ctaTitleHighlight: "ecosistema tecnologico",
  ctaDesc: "Verifichiamo come collegare Winerim ai sistemi che già utilizzi, con ambito e condizioni documentati.",
  ctaBtn: "Richiedi demo", ctaSecondary: "Chiedi info integrazione",
  ctaMicro: "Il tuo sistema non è nell'elenco? Chiedici una valutazione tecnica senza impegno.",

  faqs: [
    { q: "Winerim si integra con il mio POS?", a: "Agora dispone di un flusso verificato. Per REVO XEF e altri sistemi valutiamo accesso, dati disponibili, mappatura e frequenza prima di confermare l'ambito." },
    { q: "Tutte le integrazioni sono disponibili?", a: "No. Distinguiamo tra integrazioni verificate, in sviluppo e soggette a valutazione tecnica. Ogni connettore mostra il proprio stato." },
    { q: "Devo cambiare POS?", a: "Non necessariamente. Valutiamo il sistema esistente e confermiamo per iscritto fattibilità e requisiti." },
    { q: "Quanto tempo richiede l'integrazione?", a: "Dipende dal fornitore, dai permessi, dalla qualità del catalogo e dal numero di locali. Dopo il preflight forniamo ambito e piano di attivazione verificabili." },
    { q: "Le integrazioni sono bidirezionali?", a: "Non sempre. Ogni connettore documenta cosa legge, cosa può scrivere e con quale frequenza. Non presumiamo bidirezionalità o tempo reale continuo senza validazione tecnica." },
    { q: "Winerim si integra con i PMS alberghieri?", a: "Valutiamo integrazioni con PMS come Opera, Mews e Protel. La disponibilità dipende dall'accesso e dall'ambito tecnico." },
    { q: "Esiste una API per integrazioni personalizzate?", a: "Sì. Winerim dispone di una API REST documentata per i clienti del piano Enterprise." },
    { q: "Le integrazioni hanno un costo aggiuntivo?", a: "Il costo dipende dal piano e dall'ambito del connettore. Qualsiasi sviluppo personalizzato viene quotato e accettato prima dell'attivazione." },
  ],
};

const FR: Content = {
  seoTitle: "Intégrations Winerim | POS, PMS, ERP, Inventaire et API",
  seoDesc: "Winerim s'intègre avec vos systèmes POS, PMS, ERP et inventaire. Écosystème connecté pour restaurants, hôtels et groupes.",
  badge: "Écosystème connecté", breadProduct: "Produit", breadLabel: "Intégrations",
  h1: "Winerim se connecte à votre ", h1Highlight: "écosystème opérationnel",
  subtitle: "Winerim n'est pas un outil isolé. Il se connecte aux systèmes POS, PMS, ERP et inventaire que vous utilisez déjà, sans bouleverser vos opérations.",
  ctaDemo: "Demander une démo", ctaContact: "Renseignements intégration",
  heroSummary: "Winerim est conçu pour cohabiter avec l'écosystème technologique de votre restaurant ou hôtel, pas pour le remplacer. Nous relions la carte des vins aux données de ventes, de stock et d'exploitation afin de prendre des décisions fondées sur des informations réelles.",

  whyLabel: "Pourquoi c'est important", whyTitle1: "Sans connexion avec l'exploitation, le vin reste une ", whyTitleHighlight: "donnée isolée",
  whyPains: [
    { text: "Si la carte n'est pas reliée au POS, vous ignorez quels vins se vendent réellement et quelle marge ils génèrent." },
    { text: "Si le stock n'est pas mis à jour, vous risquez de vendre des vins épuisés ou de conserver des références sans rotation." },
    { text: "Sans données de vente réelles, les achats reposent sur l'intuition plutôt que sur les résultats." },
    { text: "Dans les hôtels, sans connexion au PMS, l'expérience vin ne peut pas être adaptée au profil du client." },
    { text: "Dans les groupes, sans intégration centralisée, chaque établissement fonctionne isolément, sans comparaison ni cohérence." },
  ],

  solvesLabel: "Ce qu'elles résolvent", solvesTitle: "Bénéfices opérationnels des intégrations",
  solves: [
    { title: "Données de vente réelles", desc: "Le POS transmet à Winerim les ventes par référence, période et point de service." },
    { title: "Stock connecté", desc: "L'inventaire reflète les entrées, sorties, pertes et transferts entre sites selon le flux validé." },
    { title: "Tarification contextualisée", desc: "Les multiplicateurs et marges s'appuient sur des coûts réels plutôt que sur des estimations." },
    { title: "Moins de doubles saisies", desc: "Les données convenues sont transférées à la fréquence validée, sans ressaisie inutile." },
    { title: "Analyses consolidées", desc: "Un seul tableau de bord réunit carte, ventes, stock et marge pour la direction." },
    { title: "Expérience connectée", desc: "Dans les hôtels et les groupes, les données facilitent les comparaisons et les décisions cohérentes entre sites." },
  ],

  statusActive: "Intégration vérifiée", statusDev: "En développement", statusCustom: "Disponibilité à vérifier",

  posBadge: "Point de vente (POS)", posTitle: "Intégration avec les ", posTitleHighlight: "systèmes POS",
  posDesc: "Avec une intégration validée, Winerim peut recevoir des données de vente, de catalogue ou de stock et transformer l'activité du POS en traçabilité et en analyses. Le périmètre, le sens des échanges et la fréquence sont confirmés pour chaque fournisseur et établissement.",
  posNoteTitle: "Votre POS n'est pas dans la liste ?", posNote: "Nous pouvons examiner son API, ses exports et ses autorisations. Faisabilité, périmètre et coût sont confirmés par écrit avant toute activation.",
  pos: [
    { name: "Agora POS", desc: "Synchronisation bidirectionnelle vérifiée des ventes, du catalogue et du stock", status: "active" },
    { name: "Revo XEF", desc: "Connecteur soumis au préflight, aux autorisations, au mapping et à un pilote de lecture", status: "custom" },
    { name: "ICG FrontRest", desc: "Accès local à SQL Server à valider", status: "custom" },
    { name: "Glop", desc: "API POS documentée ; périmètre à valider", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "Imports CSV/XML soumis à un échantillon et au mapping", status: "custom" },
    { name: "BDP NET", desc: "API REST Weblink ; accès et périmètre à valider", status: "custom" },
    { name: "Turbopos", desc: "Intégration locale sans API publique", status: "custom" },
    { name: "Zucchetti Tilby", desc: "API de ventes et sandbox Italie à valider", status: "custom" },
    { name: "Cassa in Cloud", desc: "POS TeamSystem ; autorisations et périmètre à valider", status: "custom" },
    { name: "Scloby", desc: "OAuth2 et OpenAPI ; périmètre à valider", status: "custom" },
    { name: "RCH", desc: "Intégration via les canaux commerciaux", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "API REST Zucchetti ; périmètre à valider", status: "custom" },
    { name: "Toast POS", desc: "API de commandes, ventes et menus ; périmètre à valider", status: "custom" },
    { name: "Clover", desc: "Commandes, paiements, articles et webhooks ; périmètre à valider", status: "custom" },
    { name: "Square POS", desc: "Paiements, catalogue et ventes ; périmètre à valider", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "POS cloud avec données financières ; périmètre à valider", status: "custom" },
    { name: "Revel Systems", desc: "API REST et webhooks de menu", status: "development" },
    { name: "NCR Aloha", desc: "API cloud In-Store avec TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Import des ventes, additions et articles", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "API REST avec OAuth2/TLS pour les transactions cloud", status: "development" },
    { name: "SoftRestaurant", desc: "API REST/JSON ; périmètre à valider", status: "custom" },
    { name: "Poster POS", desc: "Portail développeurs ; périmètre à valider", status: "custom" },
    { name: "Fudo", desc: "API de commandes et catalogue ; périmètre à valider", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "Quand il n'y a pas d'intégration parfaite, ", cloudTitleHighlight: "il existe quand même un chemin",
  cloudDesc: "Tous les POS, ERP ou distributeurs n'offrent pas une API propre dès le premier jour. CloudRIM collecte l'information par fichiers, email, dossiers partagés ou FTP/SFTP, la traite avec IA et la connecte à Winerim.",
  cloudDesc2: "Cela permet de commencer plus tôt : exports caisse, tarifs envoyés par email, bons en PDF ou rapports de stock deviennent des données actionnables sans saisie manuelle.",
  cloudBullets: ["Portail, email, dossiers partagés, FTP/SFTP, API ou fournisseur.", "Bons, factures, tarifs, cartes, stock et rapports de ventes.", "Classification et routage vers carte, achats, stock, ventes et marge.", "Révision humaine uniquement là où une confirmation est nécessaire."],

  erpBadge: "Gestion d'entreprise (ERP)", erpTitle: "Intégration avec les systèmes de ", erpTitleHighlight: "gestion",
  erpDesc: "Reliez Winerim à votre ERP pour mieux contrôler la cave, préparer les commandes fournisseurs et disposer d'une vision complète des coûts et marges.",
  erp: [
    { name: "Holded", desc: "Facturation, inventaire et comptabilité dans le cloud", status: "development" },
    { name: "Sage", desc: "ERP pour la gestion financière et opérationnelle", status: "development" },
    { name: "Odoo", desc: "ERP modulaire open source", status: "development" },
  ],

  pmsBadge: "Gestion hôtelière (PMS)", pmsTitle: "Intégration avec les ", pmsTitleHighlight: "PMS hôteliers",
  pmsDesc: "Dans les hôtels, Winerim se connecte au PMS pour coordonner l'expérience client, les consommations entre points de vente et le reporting F&B dans le périmètre validé.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Profil client, consommation en chambre et reporting F&B", status: "development" },
    { name: "Mews", desc: "PMS cloud avec API ouverte pour l'hôtellerie", status: "development" },
    { name: "Protel / Planet", desc: "Connexion des services F&B au profil client", status: "custom" },
    { name: "Clock PMS+", desc: "API REST pour les données client et la consommation", status: "custom" },
  ],

  invBadge: "Contrôle de cave", invTitle: "Gestion de l'inventaire et du ", invTitleHighlight: "stock",
  invDesc: "Winerim suit chaque bouteille de la cave : entrée, sortie, service au verre, perte et transfert entre établissements.",
  invFeatures: [
    { label: "Stock connecté", desc: "Contrôle par bouteille et par verre lorsque le connecteur et le processus opérationnel le permettent." },
    { label: "Rotation des références", desc: "Identifiez les vins qui se vendent, ceux qui stagnent et ceux qui immobilisent du capital." },
    { label: "Consommation bouteille et verre", desc: "Analyse détaillée pour optimiser les achats et réduire les pertes." },
    { label: "Alertes opérationnelles", desc: "Signalements de stock faible, surstock, rotation lente et possibilités de transfert." },
  ],

  apiBadge: "Pour les équipes techniques", apiTitle: "API ", apiTitleHighlight: "Winerim",
  apiDesc: "Winerim propose une API REST documentée pour les intégrations personnalisées. Reliez votre carte des vins à d'autres systèmes de manière programmée.",
  apiNote: "Documentation complète disponible pour les clients du forfait Enterprise.",
  apiFeatures: [
    { label: "Automatisation", desc: "Échangez les données convenues entre Winerim et vos systèmes dans le périmètre validé." },
    { label: "Systèmes personnalisés", desc: "Reliez Winerim à votre ERP, CRM, BI ou logiciel interne." },
    { label: "Applications et plateformes", desc: "Intégrez des applications tierces, des plateformes de réservation ou des canaux numériques." },
  ],

  implLabel: "Mise en œuvre", implTitle: "Comment fonctionne l'intégration", implSubtitle: "Un processus conçu pour ne pas interrompre vos opérations.",
  implSteps: [
    { title: "1. Évaluation technique", desc: "Nous examinons POS, PMS, ERP et processus de stock afin de définir ce qui doit être connecté et comment." },
    { title: "2. Configuration", desc: "Nous configurons les accès, le mapping et la fréquence de lecture pour le système et le périmètre convenus." },
    { title: "3. Validation", desc: "Nous vérifions les flux de ventes, de stock et de catalogue et corrigeons les exceptions détectées." },
    { title: "4. Exploitation", desc: "Le connecteur fonctionne selon le périmètre documenté, avec contrôles et vérifications ultérieures." },
  ],

  ucLabel: "Cas d'usage", ucTitle: "Fonctionnement en pratique",
  useCases: [
    { title: "Restaurant indépendant avec POS", scenario: "Un restaurant équipé de Revo XEF et d'une carte de 70 vins veut savoir quelles références se vendent réellement.", result: "Après validation des accès et du mapping, Winerim peut importer les ventes et afficher rotation, marge et ticket par vin à la fréquence convenue." },
    { title: "Hôtel avec PMS et plusieurs points de vente", scenario: "Un hôtel 5★ avec restaurant, bar et room service utilise Opera PMS et souhaite une offre cohérente et des données consolidées.", result: "Dans le périmètre validé, Winerim centralise la carte, relie les consommations et prépare un reporting F&B unifié." },
    { title: "Groupe avec plusieurs POS", scenario: "Un groupe de 12 établissements utilise plusieurs POS et souhaite comparer les performances et piloter l'assortiment.", result: "Winerim consolide les données disponibles dans un tableau de bord unique pour comparer les résultats, détecter les opportunités et coordonner les décisions." },
  ],

  doesTitle: "Intégrations Winerim : transparence complète",
  doesLabel: "Ce que font les intégrations",
  doesItems: [
    "Collecter les données de vente convenues pour alimenter les analyses Winerim",
    "Mettre à jour le stock à la fréquence validée lorsque le connecteur le permet",
    "Relier coûts ERP et ventes pour calculer des marges sur des bases cohérentes",
    "Relier carte et données PMS dans le périmètre approuvé",
    "Consolider les données disponibles de plusieurs établissements dans un même tableau de bord",
    "Documenter source, fréquence, mapping, exceptions et vérification finale",
  ],
  doesNotLabel: "Ce qu'elles ne font pas",
  doesNotItems: [
    "Elles ne remplacent pas votre POS, PMS ou ERP : elles s'y connectent",
    "Elles n'imposent pas automatiquement de changer de fournisseur ou d'infrastructure",
    "Toutes les intégrations ne sont pas immédiatement disponibles : certaines exigent une évaluation ou un développement",
  ],

  ctaBadge: "Écosystème connecté",
  ctaTitle: "Reliez Winerim à votre ", ctaTitleHighlight: "écosystème technologique",
  ctaDesc: "Nous vérifions comment connecter Winerim aux systèmes que vous utilisez déjà, avec un périmètre et des conditions documentés.",
  ctaBtn: "Demander une démo", ctaSecondary: "Renseignements intégration",
  ctaMicro: "Votre système n'est pas listé ? Demandez-nous une évaluation technique sans engagement.",

  faqs: [
    { q: "Winerim s'intègre-t-il à mon POS ?", a: "Agora dispose d'un flux vérifié. Pour REVO XEF et les autres systèmes, nous évaluons l'accès, les données disponibles, le mapping et la fréquence avant de confirmer le périmètre." },
    { q: "Toutes les intégrations sont-elles disponibles ?", a: "Non. Nous distinguons les intégrations vérifiées, celles en développement et celles soumises à une évaluation technique. Chaque connecteur affiche son statut." },
    { q: "Dois-je changer de POS ?", a: "Pas nécessairement. Nous évaluons le système existant et confirmons par écrit sa faisabilité et ses prérequis." },
    { q: "Combien de temps prend l'intégration ?", a: "Cela dépend du fournisseur, des autorisations, de la qualité du catalogue et du nombre d'établissements. Après le préflight, nous remettons un périmètre et un plan d'activation vérifiables." },
    { q: "Les intégrations sont-elles bidirectionnelles ?", a: "Pas toujours. Chaque connecteur documente ce qu'il lit, ce qu'il peut écrire et à quelle fréquence. Nous ne supposons ni bidirectionnalité ni temps réel continu sans validation technique." },
    { q: "Winerim s'intègre-t-il aux PMS hôteliers ?", a: "Nous évaluons les intégrations avec des PMS comme Opera, Mews et Protel. La disponibilité dépend de l'accès et du périmètre technique." },
    { q: "Existe-t-il une API pour les intégrations personnalisées ?", a: "Oui. Winerim dispose d'une API REST documentée pour les clients du forfait Enterprise." },
    { q: "Les intégrations entraînent-elles un coût supplémentaire ?", a: "Le coût dépend du forfait et du périmètre du connecteur. Tout développement personnalisé est chiffré et accepté avant activation." },
  ],
};

const DE: Content = {
  seoTitle: "Winerim-Integrationen | POS, PMS, ERP, Inventar und API",
  seoDesc: "Winerim integriert sich mit Ihren POS-, PMS-, ERP- und Inventarsystemen. Vernetztes Ökosystem für Restaurants, Hotels und Gruppen.",
  badge: "Vernetztes Ökosystem", breadProduct: "Produkt", breadLabel: "Integrationen",
  h1: "Winerim verbindet sich mit Ihrem ", h1Highlight: "operativen Ökosystem",
  subtitle: "Winerim ist keine Insellösung. Es verbindet sich mit Ihren vorhandenen POS-, PMS-, ERP- und Inventarsystemen, ohne Ihre Abläufe grundlegend zu verändern.",
  ctaDemo: "Demo anfordern", ctaContact: "Integrationen anfragen",
  heroSummary: "Winerim ist darauf ausgelegt, mit der technischen Infrastruktur Ihres Restaurants oder Hotels zusammenzuarbeiten, nicht sie zu ersetzen. Wir verbinden die Weinkarte mit Verkaufs-, Bestands- und Betriebsdaten, damit Entscheidungen auf tatsächlichen Informationen beruhen.",

  whyLabel: "Warum das wichtig ist", whyTitle1: "Ohne Verbindung zum Betrieb bleiben Weindaten ", whyTitleHighlight: "isoliert",
  whyPains: [
    { text: "Wenn die Weinkarte nicht mit dem Kassensystem verbunden ist, wissen Sie nicht, welche Weine sich tatsächlich verkaufen oder welche Marge sie erzielen." },
    { text: "Wenn der Bestand nicht aktualisiert wird, verkaufen Sie möglicherweise nicht verfügbare Weine oder führen Artikel ohne Umschlag weiter." },
    { text: "Ohne tatsächliche Verkaufsdaten beruhen Einkaufsentscheidungen auf Intuition statt auf Ergebnissen." },
    { text: "In Hotels lässt sich das Weinerlebnis ohne PMS-Verbindung nicht auf das Gästeprofil abstimmen." },
    { text: "In Gruppen arbeitet ohne zentrale Integration jeder Standort für sich, ohne Vergleichbarkeit und gemeinsame Steuerung." },
  ],

  solvesLabel: "Was Integrationen lösen", solvesTitle: "Betriebliche Vorteile von Integrationen",
  solves: [
    { title: "Tatsächliche Verkaufsdaten", desc: "Das Kassensystem liefert Winerim Verkäufe nach Artikel, Zeitraum und Verkaufsstelle." },
    { title: "Verbundener Bestand", desc: "Die Bestandsführung bildet Zugänge, Abgänge, Schwund und Umlagerungen gemäß dem validierten Ablauf ab." },
    { title: "Preise mit Kontext", desc: "Kalkulationsfaktoren und Margen basieren auf tatsächlichen Kostendaten statt auf Schätzungen." },
    { title: "Weniger Doppelerfassung", desc: "Vereinbarte Daten werden in der validierten Frequenz übertragen und müssen nicht erneut eingegeben werden." },
    { title: "Zusammengeführte Auswertungen", desc: "Eine Übersicht verbindet Weinkarte, Verkäufe, Bestand und Marge für die Betriebsleitung." },
    { title: "Vernetzter Betrieb", desc: "In Hotels und Gruppen ermöglichen die Daten vergleichbare und abgestimmte Entscheidungen über mehrere Bereiche hinweg." },
  ],

  statusActive: "Verifizierte Integration", statusDev: "In Entwicklung", statusCustom: "Verfügbarkeit zu prüfen",

  posBadge: "Kassensystem (POS)", posTitle: "Integration mit ", posTitleHighlight: "Kassensystemen",
  posDesc: "Mit einer validierten Integration kann Winerim Verkaufs-, Katalog- oder Bestandsdaten empfangen und POS-Aktivitäten in nachvollziehbare Auswertungen überführen. Umfang, Richtung und Frequenz werden für jeden Anbieter und Standort bestätigt.",
  posNoteTitle: "Ihr Kassensystem fehlt?", posNote: "Wir können API, Exporte und Berechtigungen prüfen. Machbarkeit, Umfang und Kosten werden vor jeder Aktivierung schriftlich bestätigt.",
  pos: [
    { name: "Agora POS", desc: "Verifizierte bidirektionale Synchronisierung von Verkäufen, Katalog und Bestand", status: "active" },
    { name: "Revo XEF", desc: "Konnektor vorbehaltlich Vorprüfung, Berechtigungen, Mapping und Lesepilot", status: "custom" },
    { name: "ICG FrontRest", desc: "Lokaler SQL-Server-Zugriff muss validiert werden", status: "custom" },
    { name: "Glop", desc: "Dokumentierte POS-API; Umfang muss validiert werden", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "CSV/XML-Import vorbehaltlich Beispieldaten und Mapping", status: "custom" },
    { name: "BDP NET", desc: "REST-Weblink-API; Zugriff und Umfang müssen validiert werden", status: "custom" },
    { name: "Turbopos", desc: "Lokale Integration ohne öffentliche API", status: "custom" },
    { name: "Zucchetti Tilby", desc: "Verkaufs-API und Italien-Sandbox müssen validiert werden", status: "custom" },
    { name: "Cassa in Cloud", desc: "TeamSystem POS; Berechtigungen und Umfang müssen validiert werden", status: "custom" },
    { name: "Scloby", desc: "OAuth2 und OpenAPI; Umfang muss validiert werden", status: "custom" },
    { name: "RCH", desc: "Integration über Vertriebskanäle", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "Zucchetti REST-API; Umfang muss validiert werden", status: "custom" },
    { name: "Toast POS", desc: "APIs für Bestellungen, Verkäufe und Menüs; Umfang muss validiert werden", status: "custom" },
    { name: "Clover", desc: "Bestellungen, Zahlungen, Artikel und Webhooks; Umfang muss validiert werden", status: "custom" },
    { name: "Square POS", desc: "Zahlungen, Katalog und Verkäufe; Umfang muss validiert werden", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "Cloud-POS mit Finanzdaten; Umfang muss validiert werden", status: "custom" },
    { name: "Revel Systems", desc: "REST-API und Menü-Webhooks", status: "development" },
    { name: "NCR Aloha", desc: "Cloud In-Store API mit TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Import von Verkäufen, Belegen und Artikeln", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "REST-APIs mit OAuth2/TLS für Cloud-Transaktionen", status: "development" },
    { name: "SoftRestaurant", desc: "REST/JSON-API; Umfang muss validiert werden", status: "custom" },
    { name: "Poster POS", desc: "Entwicklerportal; Umfang muss validiert werden", status: "custom" },
    { name: "Fudo", desc: "APIs für Bestellungen und Katalog; Umfang muss validiert werden", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "Wenn es keine perfekte Integration gibt, ", cloudTitleHighlight: "gibt es trotzdem einen Weg",
  cloudDesc: "Nicht jedes POS-, ERP- oder Vertriebssystem bietet vom ersten Tag an eine saubere API. CloudRIM kann Informationen über Dateien, E-Mail, freigegebene Ordner oder FTP/SFTP erfassen, mit KI verarbeiten und mit Winerim verbinden.",
  cloudDesc2: "So lässt sich früher starten: POS-Exporte, Preislisten per E-Mail, Lieferscheine als PDF oder Bestandsberichte werden zu nutzbaren Daten, ohne dass das Restaurant alles manuell eingeben muss.",
  cloudBullets: ["Portal, E-Mail, freigegebene Ordner, FTP/SFTP, API oder Anbieter.", "Lieferscheine, Rechnungen, Preislisten, Weinkarten, Bestand und Verkaufsberichte.", "Klassifizierung und Zuordnung zu Karte, Einkauf, Bestand, Verkauf und Marge.", "Menschliche Prüfung nur dort, wo eine Bestätigung erforderlich ist."],

  erpBadge: "Unternehmensverwaltung (ERP)", erpTitle: "Integration mit ", erpTitleHighlight: "Verwaltungssystemen",
  erpDesc: "Verbinden Sie Winerim mit Ihrem ERP, um die Kellerverwaltung zu verbessern, Lieferantenbestellungen vorzubereiten und Kosten sowie Margen vollständig zu überblicken.",
  erp: [
    { name: "Holded", desc: "Cloudbasierte Rechnungsstellung, Bestandsführung und Buchhaltung", status: "development" },
    { name: "Sage", desc: "ERP für finanzielle und betriebliche Verwaltung", status: "development" },
    { name: "Odoo", desc: "Modulares Open-Source-ERP", status: "development" },
  ],

  pmsBadge: "Hotelverwaltung (PMS)", pmsTitle: "Integration mit ", pmsTitleHighlight: "Hotel-PMS",
  pmsDesc: "In Hotels verbindet Winerim im validierten Umfang Gästeinformationen, Verbrauchsdaten verschiedener Outlets und das F&B-Reporting mit dem PMS.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Gästeprofil, Zimmerverbrauch und F&B-Reporting", status: "development" },
    { name: "Mews", desc: "Cloud-PMS mit offener API für die Hotellerie", status: "development" },
    { name: "Protel / Planet", desc: "Verknüpfung von F&B-Leistungen mit dem Gästeprofil", status: "custom" },
    { name: "Clock PMS+", desc: "REST-API für Gästedaten und Verbrauch", status: "custom" },
  ],

  invBadge: "Kellerkontrolle", invTitle: "Inventar- und ", invTitleHighlight: "Bestandsverwaltung",
  invDesc: "Winerim verfolgt jede Flasche im Keller: Zugang, Abgang, glasweisen Ausschank, Schwund und Umlagerungen zwischen Standorten.",
  invFeatures: [
    { label: "Verbundener Bestand", desc: "Kontrolle nach Flasche und Glas, wenn Konnektor und Betriebsablauf dies unterstützen." },
    { label: "Artikelumschlag", desc: "Erkennen Sie, welche Weine sich verkaufen, welche liegen bleiben und welche Kapital binden." },
    { label: "Verbrauch nach Flasche und Glas", desc: "Detaillierte Auswertungen zur Einkaufsoptimierung und Verringerung von Schwund." },
    { label: "Betriebliche Hinweise", desc: "Meldungen zu niedrigem Bestand, Überbestand, langsamem Umschlag und Umlagerungsmöglichkeiten." },
  ],

  apiBadge: "Für technische Teams", apiTitle: "Winerim ", apiTitleHighlight: "API",
  apiDesc: "Winerim bietet eine dokumentierte REST-API für individuelle Integrationen. Verbinden Sie Ihre Weinkarte programmatisch mit weiteren Systemen.",
  apiNote: "Die vollständige Dokumentation steht Kunden des Enterprise-Plans zur Verfügung.",
  apiFeatures: [
    { label: "Automatisierung", desc: "Tauschen Sie die vereinbarten Daten zwischen Winerim und Ihren Systemen im validierten Umfang aus." },
    { label: "Individuelle Systeme", desc: "Verbinden Sie Winerim mit ERP, CRM, BI oder interner Software." },
    { label: "Anwendungen und Plattformen", desc: "Integrieren Sie Drittanbieter-Apps, Buchungsplattformen oder digitale Kanäle." },
  ],

  implLabel: "Implementierung", implTitle: "So funktioniert die Integration", implSubtitle: "Ein Prozess, der den laufenden Betrieb nicht unterbrechen soll.",
  implSteps: [
    { title: "1. Technische Prüfung", desc: "Wir prüfen POS, PMS, ERP und Bestandsabläufe und legen fest, was wie verbunden werden soll." },
    { title: "2. Konfiguration", desc: "Wir konfigurieren Zugänge, Mapping und Lesefrequenz für das vereinbarte System und den bestätigten Umfang." },
    { title: "3. Validierung", desc: "Wir prüfen die Datenflüsse für Verkäufe, Bestand und Katalog und bearbeiten erkannte Ausnahmen." },
    { title: "4. Betrieb", desc: "Der Konnektor arbeitet im dokumentierten Umfang mit Kontrollen und anschließender Rückprüfung." },
  ],

  ucLabel: "Anwendungsfälle", ucTitle: "So funktioniert es in der Praxis",
  useCases: [
    { title: "Unabhängiges Restaurant mit POS", scenario: "Ein Restaurant mit Revo XEF und einer Karte mit 70 Weinen möchte wissen, welche Artikel sich tatsächlich verkaufen.", result: "Nach Validierung von Zugriff und Mapping kann Winerim Verkäufe importieren und Umschlag, Marge und Bonwert je Wein in der vereinbarten Frequenz ausweisen." },
    { title: "Hotel mit PMS und mehreren Outlets", scenario: "Ein 5-Sterne-Hotel mit Restaurant, Bar und Zimmerservice nutzt Opera PMS und benötigt ein einheitliches Angebot sowie konsolidierte Daten.", result: "Im validierten Umfang zentralisiert Winerim die Karte, verknüpft Verbrauchsdaten und bereitet ein einheitliches F&B-Reporting vor." },
    { title: "Gruppe mit mehreren Kassensystemen", scenario: "Eine Gruppe mit 12 Standorten und verschiedenen Kassensystemen benötigt interne Vergleiche und eine zentrale Sortimentssteuerung.", result: "Winerim führt die verfügbaren Daten in einer Übersicht zusammen, um Ergebnisse zu vergleichen, Potenziale zu erkennen und Entscheidungen zu koordinieren." },
  ],

  doesTitle: "Winerim-Integrationen: volle Transparenz",
  doesLabel: "Was Integrationen leisten",
  doesItems: [
    "Vereinbarte Verkaufsdaten erfassen und für Winerim-Auswertungen bereitstellen",
    "Bestände in der validierten Frequenz aktualisieren, sofern der Konnektor dies unterstützt",
    "ERP-Kosten und Verkäufe für nachvollziehbare Margenberechnungen verbinden",
    "Weinkarte und PMS-Daten im bestätigten Umfang verknüpfen",
    "Verfügbare Daten mehrerer Standorte in einer Übersicht zusammenführen",
    "Quelle, Frequenz, Mapping, Ausnahmen und Rückprüfung dokumentieren",
  ],
  doesNotLabel: "Was sie nicht leisten",
  doesNotItems: [
    "Sie ersetzen POS, PMS oder ERP nicht, sondern verbinden sich mit diesen Systemen",
    "Sie verlangen nicht automatisch einen Wechsel von Anbieter oder Infrastruktur",
    "Nicht jede Integration ist sofort verfügbar: Manche erfordern eine Prüfung oder Entwicklung",
  ],

  ctaBadge: "Vernetztes Ökosystem",
  ctaTitle: "Verbinden Sie Winerim mit Ihrer ", ctaTitleHighlight: "technischen Infrastruktur",
  ctaDesc: "Wir prüfen, wie Winerim mit Ihren vorhandenen Systemen verbunden werden kann, und dokumentieren Umfang und Bedingungen.",
  ctaBtn: "Demo anfordern", ctaSecondary: "Integrationen anfragen",
  ctaMicro: "Ihr System ist nicht aufgeführt? Fragen Sie nach einer unverbindlichen technischen Prüfung.",

  faqs: [
    { q: "Lässt sich Winerim mit meinem Kassensystem verbinden?", a: "Für Agora gibt es einen verifizierten Ablauf. Bei REVO XEF und anderen Systemen prüfen wir Zugriff, verfügbare Daten, Mapping und Frequenz, bevor wir den Integrationsumfang bestätigen." },
    { q: "Sind alle Integrationen verfügbar?", a: "Nein. Wir unterscheiden zwischen verifizierten Integrationen, Integrationen in Entwicklung und technisch zu prüfenden Konnektoren. Der jeweilige Status wird angezeigt." },
    { q: "Muss ich mein Kassensystem wechseln?", a: "Nicht grundsätzlich. Wir prüfen das bestehende System und bestätigen Machbarkeit und Voraussetzungen schriftlich." },
    { q: "Wie lange dauert die Integration?", a: "Das hängt von Anbieter, Berechtigungen, Katalogqualität und Anzahl der Standorte ab. Nach der Vorprüfung erhalten Sie einen überprüfbaren Umfang und Aktivierungsplan." },
    { q: "Sind Integrationen bidirektional?", a: "Nicht immer. Jeder Konnektor dokumentiert, welche Daten er liest, welche er schreiben kann und in welcher Frequenz. Ohne technische Validierung setzen wir weder Bidirektionalität noch kontinuierliche Echtzeit voraus." },
    { q: "Gibt es Integrationen mit Hotel-PMS?", a: "Wir prüfen Integrationen mit PMS wie Opera, Mews und Protel. Die Verfügbarkeit hängt von Zugriff und technischem Umfang ab." },
    { q: "Gibt es eine API für individuelle Integrationen?", a: "Ja. Winerim verfügt über eine dokumentierte REST-API für Kunden des Enterprise-Plans." },
    { q: "Entstehen zusätzliche Kosten?", a: "Die Kosten hängen vom Tarif und vom Umfang des Konnektors ab. Individuelle Entwicklungen werden vor der Aktivierung angeboten und freigegeben." },
  ],
};

const PT: Content = {
  seoTitle: "Integrações Winerim | POS, PMS, ERP, Inventário e API",
  seoDesc: "A Winerim integra-se com sistemas POS, PMS, ERP e inventário. Ecossistema conectado para restaurantes, hotéis e grupos.",
  badge: "Ecossistema conectado", breadProduct: "Produto", breadLabel: "Integrações",
  h1: "A Winerim liga-se ao seu ", h1Highlight: "ecossistema operacional",
  subtitle: "A Winerim não é uma ferramenta isolada. Liga-se aos sistemas POS, PMS, ERP e inventário que já utiliza, sem alterar desnecessariamente a operação.",
  ctaDemo: "Solicitar demonstração", ctaContact: "Informações de integração",
  heroSummary: "A Winerim foi concebida para trabalhar com o ecossistema tecnológico do restaurante ou hotel, não para o substituir. Ligamos a carta de vinhos aos dados de vendas, stock e operação para apoiar decisões baseadas em informação real.",

  whyLabel: "Porque é importante", whyTitle1: "Sem ligação à operação, o vinho fica como um ", whyTitleHighlight: "dado isolado",
  whyPains: [
    { text: "Se a carta não estiver ligada ao POS, não sabe que vinhos vendem realmente nem que margem geram." },
    { text: "Se o stock não for atualizado, pode vender vinhos esgotados ou manter referências sem rotação." },
    { text: "Sem dados reais de vendas, as compras baseiam-se na intuição e não no desempenho." },
    { text: "Nos hotéis, sem ligação ao PMS, a experiência de vinho não pode ser ajustada ao perfil do hóspede." },
    { text: "Nos grupos, sem integração central, cada unidade funciona isoladamente, sem comparação nem coerência." },
  ],

  solvesLabel: "O que resolvem", solvesTitle: "Benefícios operacionais das integrações",
  solves: [
    { title: "Dados reais de vendas", desc: "O POS fornece à Winerim vendas por referência, período e ponto de serviço." },
    { title: "Stock conectado", desc: "O inventário reflete entradas, saídas, perdas e transferências entre unidades segundo o fluxo validado." },
    { title: "Preços com contexto", desc: "Multiplicadores e margens utilizam dados reais de custo em vez de estimativas." },
    { title: "Menos trabalho duplicado", desc: "Os dados acordados são transferidos na frequência validada, evitando nova introdução manual." },
    { title: "Análise consolidada", desc: "Um único painel reúne carta, vendas, stock e margem para a direção." },
    { title: "Operação conectada", desc: "Em hotéis e grupos, os dados permitem comparar unidades e tomar decisões coerentes." },
  ],

  statusActive: "Integração verificada", statusDev: "Em desenvolvimento", statusCustom: "Disponibilidade a validar",

  posBadge: "Ponto de venda (POS)", posTitle: "Integração com ", posTitleHighlight: "sistemas POS",
  posDesc: "Com uma integração validada, a Winerim pode receber dados de vendas, catálogo ou stock e transformar a atividade do POS em rastreabilidade e análise. O âmbito, a direção e a frequência são confirmados para cada fornecedor e unidade.",
  posNoteTitle: "O seu POS não está na lista?", posNote: "Podemos rever a API, exportações e permissões. Viabilidade, âmbito e custo são confirmados por escrito antes de qualquer ativação.",
  pos: [
    { name: "Agora POS", desc: "Sincronização bidirecional verificada de vendas, catálogo e stock", status: "active" },
    { name: "Revo XEF", desc: "Conector sujeito a preflight, permissões, mapeamento e piloto de leitura", status: "custom" },
    { name: "ICG FrontRest", desc: "Acesso local a SQL Server por validar", status: "custom" },
    { name: "Glop", desc: "API POS documentada; âmbito por validar", status: "custom" },
    { name: "Hiopos / Hioffice", desc: "Importações CSV/XML sujeitas a amostra e mapeamento", status: "custom" },
    { name: "BDP NET", desc: "API REST Weblink; acesso e âmbito por validar", status: "custom" },
    { name: "Turbopos", desc: "Integração local sem API pública", status: "custom" },
    { name: "Zucchetti Tilby", desc: "API de vendas e sandbox para Itália por validar", status: "custom" },
    { name: "Cassa in Cloud", desc: "POS TeamSystem; permissões e âmbito por validar", status: "custom" },
    { name: "Scloby", desc: "OAuth2 e OpenAPI; âmbito por validar", status: "custom" },
    { name: "RCH", desc: "Integração através de canais comerciais", status: "custom" },
    { name: "Kumo (TCPOS)", desc: "API REST Zucchetti; âmbito por validar", status: "custom" },
    { name: "Toast POS", desc: "APIs de pedidos, vendas e menus; âmbito por validar", status: "custom" },
    { name: "Clover", desc: "Pedidos, pagamentos, artigos e webhooks; âmbito por validar", status: "custom" },
    { name: "Square POS", desc: "Pagamentos, catálogo e vendas; âmbito por validar", status: "custom" },
    { name: "Lightspeed Restaurant", desc: "POS cloud com dados financeiros; âmbito por validar", status: "custom" },
    { name: "Revel Systems", desc: "API REST e webhooks de menu", status: "development" },
    { name: "NCR Aloha", desc: "API cloud In-Store com TLS/gRPC", status: "development" },
    { name: "TouchBistro", desc: "Importação de vendas, contas e artigos", status: "development" },
    { name: "Oracle MICROS Simphony", desc: "APIs REST com OAuth2/TLS para transações cloud", status: "development" },
    { name: "SoftRestaurant", desc: "API REST/JSON; âmbito por validar", status: "custom" },
    { name: "Poster POS", desc: "Portal de programadores; âmbito por validar", status: "custom" },
    { name: "Fudo", desc: "APIs de pedidos e catálogo; âmbito por validar", status: "custom" },
  ],

  cloudBadge: "CloudRIM",
  cloudTitle: "Quando não há integração perfeita, ", cloudTitleHighlight: "também há caminho",
  cloudDesc: "Nem todos os POS, ERPs ou distribuidores oferecem uma API limpa desde o primeiro dia. CloudRIM recolhe informação por ficheiros, email, pastas partilhadas ou FTP/SFTP, processa com IA e liga-a à Winerim.",
  cloudDesc2: "Isto permite começar antes: exportações POS, tabelas por email, guias em PDF ou relatórios de stock tornam-se dados acionáveis sem obrigar o restaurante a introduzir tudo à mão.",
  cloudBullets: ["Portal, email, pastas partilhadas, FTP/SFTP, API ou fornecedor.", "Guias, faturas, tabelas, cartas, stock e relatórios de vendas.", "Classificação e encaminhamento para carta, compras, stock, vendas e margem.", "Revisão humana apenas quando é preciso confirmação."],

  erpBadge: "Gestão empresarial (ERP)", erpTitle: "Integração com sistemas de ", erpTitleHighlight: "gestão",
  erpDesc: "Ligue a Winerim ao ERP para melhorar o controlo da garrafeira, preparar encomendas a fornecedores e obter uma visão completa de custos e margens.",
  erp: [
    { name: "Holded", desc: "Faturação, inventário e contabilidade na cloud", status: "development" },
    { name: "Sage", desc: "ERP para gestão financeira e operacional", status: "development" },
    { name: "Odoo", desc: "ERP modular de código aberto", status: "development" },
  ],

  pmsBadge: "Gestão hoteleira (PMS)", pmsTitle: "Integração com ", pmsTitleHighlight: "PMS hoteleiros",
  pmsDesc: "Nos hotéis, a Winerim liga-se ao PMS para coordenar a experiência do hóspede, os consumos entre outlets e o reporting de F&B dentro do âmbito validado.",
  pms: [
    { name: "Opera PMS (Oracle)", desc: "Perfil do hóspede, consumo no quarto e reporting de F&B", status: "development" },
    { name: "Mews", desc: "PMS cloud com API aberta para hotelaria", status: "development" },
    { name: "Protel / Planet", desc: "Ligação dos serviços F&B ao perfil do hóspede", status: "custom" },
    { name: "Clock PMS+", desc: "API REST para dados do hóspede e consumos", status: "custom" },
  ],

  invBadge: "Controlo da garrafeira", invTitle: "Gestão de inventário e ", invTitleHighlight: "stock",
  invDesc: "A Winerim acompanha cada garrafa: entrada, saída, serviço a copo, perda e transferência entre unidades.",
  invFeatures: [
    { label: "Stock conectado", desc: "Controlo por garrafa e por copo quando o conector e o processo operacional o permitem." },
    { label: "Rotação das referências", desc: "Identifique os vinhos que vendem, os que ficam parados e os que imobilizam capital." },
    { label: "Consumo por garrafa e copo", desc: "Análise detalhada para otimizar compras e reduzir perdas." },
    { label: "Alertas operacionais", desc: "Avisos de stock baixo, excesso, rotação lenta e oportunidades de transferência." },
  ],

  apiBadge: "Para equipas técnicas", apiTitle: "API ", apiTitleHighlight: "Winerim",
  apiDesc: "A Winerim oferece uma API REST documentada para integrações personalizadas. Ligue a carta de vinhos a outros sistemas de forma programada.",
  apiNote: "Documentação completa disponível para clientes do plano Enterprise.",
  apiFeatures: [
    { label: "Automatização", desc: "Troque os dados acordados entre a Winerim e os seus sistemas dentro do âmbito validado." },
    { label: "Sistemas personalizados", desc: "Ligue a Winerim ao ERP, CRM, BI ou software interno." },
    { label: "Aplicações e plataformas", desc: "Integre aplicações de terceiros, plataformas de reservas ou canais digitais." },
  ],

  implLabel: "Implementação", implTitle: "Como funciona a integração", implSubtitle: "Um processo concebido para não interromper a operação.",
  implSteps: [
    { title: "1. Avaliação técnica", desc: "Revemos POS, PMS, ERP e processos de stock para definir o que deve ser ligado e como." },
    { title: "2. Configuração", desc: "Configuramos acessos, mapeamento e frequência de leitura para o sistema e âmbito acordados." },
    { title: "3. Validação", desc: "Verificamos os fluxos de vendas, stock e catálogo e tratamos as exceções encontradas." },
    { title: "4. Operação", desc: "O conector funciona dentro do âmbito documentado, com controlos e verificação posterior." },
  ],

  ucLabel: "Casos de uso", ucTitle: "Como funciona na prática",
  useCases: [
    { title: "Restaurante independente com POS", scenario: "Restaurante com Revo XEF e uma carta de 70 vinhos. Quer saber que referências vendem realmente.", result: "Depois de validar acessos e mapeamento, a Winerim pode importar vendas e mostrar rotação, margem e ticket por vinho na frequência acordada." },
    { title: "Hotel com PMS e vários outlets", scenario: "Hotel 5★ com restaurante, bar e serviço de quartos. Utiliza Opera PMS e pretende uma oferta coerente e dados consolidados.", result: "Dentro do âmbito validado, a Winerim centraliza a carta, liga os consumos e prepara reporting de F&B unificado." },
    { title: "Grupo com vários sistemas POS", scenario: "Grupo com 12 unidades e vários POS. Precisa de comparação interna e governação do sortido.", result: "A Winerim consolida os dados disponíveis num único painel para comparar resultados, detetar oportunidades e coordenar decisões." },
  ],

  doesTitle: "Integrações Winerim: transparência completa",
  doesLabel: "O que fazem as integrações",
  doesItems: [
    "Recolhem os dados de vendas acordados para alimentar a análise da Winerim",
    "Atualizam o stock na frequência validada quando o conector o permite",
    "Ligam custos do ERP e vendas para calcular margens sobre bases coerentes",
    "Ligam carta e dados do PMS dentro do âmbito aprovado",
    "Consolidam os dados disponíveis de várias unidades num único painel",
    "Documentam origem, frequência, mapeamento, exceções e verificação final",
  ],
  doesNotLabel: "O que não fazem",
  doesNotItems: [
    "Não substituem POS, PMS ou ERP: ligam-se a esses sistemas",
    "Não obrigam automaticamente a mudar de fornecedor ou infraestrutura",
    "Nem todas as integrações estão imediatamente disponíveis: algumas exigem avaliação ou desenvolvimento",
  ],

  ctaBadge: "Ecossistema conectado",
  ctaTitle: "Ligue a Winerim ao seu ", ctaTitleHighlight: "ecossistema tecnológico",
  ctaDesc: "Verificamos como ligar a Winerim aos sistemas que já utiliza, com âmbito e condições documentados.",
  ctaBtn: "Solicitar demonstração", ctaSecondary: "Informações de integração",
  ctaMicro: "O seu sistema não está na lista? Peça-nos uma avaliação técnica sem compromisso.",

  faqs: [
    { q: "A Winerim integra-se com o meu POS?", a: "O Agora dispõe de um fluxo verificado. Para REVO XEF e outros sistemas, avaliamos acesso, dados disponíveis, mapeamento e frequência antes de confirmar o âmbito." },
    { q: "Todas as integrações estão disponíveis?", a: "Não. Distinguimos integrações verificadas, em desenvolvimento e sujeitas a avaliação técnica. Cada conector mostra o respetivo estado." },
    { q: "Tenho de mudar de POS?", a: "Não necessariamente. Avaliamos o sistema existente e confirmamos por escrito a viabilidade e os requisitos." },
    { q: "Quanto tempo demora a integração?", a: "Depende do fornecedor, permissões, qualidade do catálogo e número de unidades. Depois do preflight, entregamos um âmbito e plano de ativação verificáveis." },
    { q: "As integrações são bidirecionais?", a: "Nem sempre. Cada conector documenta o que lê, o que pode escrever e com que frequência. Não assumimos bidirecionalidade nem tempo real contínuo sem validação técnica." },
    { q: "A Winerim integra-se com PMS hoteleiros?", a: "Avaliamos integrações com PMS como Opera, Mews e Protel. A disponibilidade depende do acesso e do âmbito técnico." },
    { q: "Existe uma API para integrações personalizadas?", a: "Sim. A Winerim dispõe de uma API REST documentada para clientes do plano Enterprise." },
    { q: "As integrações têm custo adicional?", a: "O custo depende do plano e do âmbito do conector. Qualquer desenvolvimento personalizado é orçamentado e aceite antes da ativação." },
  ],
};

const contentMap: Record<string, Content> = { es: ES, en: EN, it: IT, fr: FR, de: DE, pt: PT };

const proofCopy: Record<string, { eyebrow: string; title: string; intro: string; trace: string; analysis: string; note: string }> = {
  es: {
    eyebrow: "Flujo verificable",
    title: "Del dato del TPV a una decisión de bodega",
    intro: "La integración útil no termina al conectar una API. Winerim comprueba referencias, formatos y precios; después convierte ventas validadas en lectura de rotación, margen y servicio.",
    trace: "Trazabilidad por referencia entre catálogo, formato, precio y lectura del TPV.",
    analysis: "Análisis del servicio a partir de ventas recibidas y correctamente vinculadas.",
    note: "Cada implantación documenta origen, frecuencia, mapeo, excepciones y comprobación posterior. La disponibilidad depende del proveedor y de los permisos del cliente.",
  },
  en: {
    eyebrow: "Verifiable flow",
    title: "From POS data to a cellar decision",
    intro: "A useful integration does not end when an API is connected. Winerim checks references, formats and prices, then turns validated sales into rotation, margin and service insight.",
    trace: "Reference-level traceability across catalog, format, price and POS reads.",
    analysis: "Service analysis based on received and correctly mapped sales.",
    note: "Each implementation documents source, frequency, mapping, exceptions and readback. Availability depends on the provider and the client's permissions.",
  },
  it: {
    eyebrow: "Flusso verificabile",
    title: "Dal dato POS a una decisione di cantina",
    intro: "Un'integrazione utile non finisce con il collegamento di un'API. Winerim verifica referenze, formati e prezzi e trasforma le vendite validate in analisi di rotazione, margine e servizio.",
    trace: "Tracciabilità per referenza tra catalogo, formato, prezzo e lettura POS.",
    analysis: "Analisi del servizio basata su vendite ricevute e correttamente associate.",
    note: "Ogni implementazione documenta origine, frequenza, mappatura, eccezioni e verifica finale. La disponibilità dipende dal provider e dai permessi del cliente.",
  },
  fr: {
    eyebrow: "Flux vérifiable",
    title: "De la donnée caisse à la décision de cave",
    intro: "Une intégration utile ne s'arrête pas à la connexion d'une API. Winerim vérifie références, formats et prix, puis transforme les ventes validées en lecture de rotation, marge et service.",
    trace: "Traçabilité par référence entre catalogue, format, prix et lecture de caisse.",
    analysis: "Analyse du service à partir de ventes reçues et correctement associées.",
    note: "Chaque déploiement documente source, fréquence, mapping, exceptions et contrôle final. La disponibilité dépend du fournisseur et des autorisations du client.",
  },
  de: {
    eyebrow: "Prüfbarer Ablauf",
    title: "Von POS-Daten zur Kellerentscheidung",
    intro: "Eine sinnvolle Integration endet nicht mit der API-Verbindung. Winerim prüft Referenzen, Formate und Preise und übersetzt validierte Verkäufe in Rotation, Marge und Service-Analyse.",
    trace: "Nachvollziehbarkeit je Referenz über Katalog, Format, Preis und POS-Lesung.",
    analysis: "Service-Analyse auf Basis empfangener und korrekt zugeordneter Verkäufe.",
    note: "Jede Implementierung dokumentiert Quelle, Frequenz, Mapping, Ausnahmen und Readback. Die Verfügbarkeit hängt vom Anbieter und den Kundenberechtigungen ab.",
  },
  pt: {
    eyebrow: "Fluxo verificável",
    title: "Do dado do POS à decisão de garrafeira",
    intro: "Uma integração útil não termina ao ligar uma API. A Winerim verifica referências, formatos e preços e transforma vendas validadas em leitura de rotação, margem e serviço.",
    trace: "Rastreabilidade por referência entre catálogo, formato, preço e leitura do POS.",
    analysis: "Análise do serviço a partir de vendas recebidas e corretamente associadas.",
    note: "Cada implementação documenta origem, frequência, mapeamento, exceções e verificação final. A disponibilidade depende do fornecedor e das permissões do cliente.",
  },
};

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
  const proof = proofCopy[lang] || proofCopy.es;

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
          <div className="mt-16 border-t border-border pt-12">
            <ScrollReveal className="max-w-3xl mb-8">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-3">{proof.eyebrow}</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">{proof.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{proof.intro}</p>
            </ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <figure className="border border-border overflow-hidden bg-background">
                  <a href="/commercial-assets/product-proof/07-trazabilidad-vino-tpv.png" target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine">
                    <img src="/commercial-assets/product-proof/07-trazabilidad-vino-tpv.png" alt={proof.trace} loading="lazy" className="w-full aspect-[16/7] object-cover object-top" />
                  </a>
                  <figcaption className="p-4 text-sm text-muted-foreground">{proof.trace}</figcaption>
                </figure>
              </ScrollReveal>
              <ScrollReveal delay={0.06}>
                <figure className="border border-border overflow-hidden bg-background">
                  <a href="/commercial-assets/product-proof/02-analisis-ventas.png" target="_blank" rel="noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine">
                    <img src="/commercial-assets/product-proof/02-analisis-ventas.png" alt={proof.analysis} loading="lazy" className="w-full aspect-[16/7] object-cover object-top" />
                  </a>
                  <figcaption className="p-4 text-sm text-muted-foreground">{proof.analysis}</figcaption>
                </figure>
              </ScrollReveal>
            </div>
            <p className="mt-6 max-w-4xl text-xs text-muted-foreground leading-relaxed border-l-2 border-wine pl-4">{proof.note}</p>
          </div>
        </div>
      </section>

      {/* ── CloudRIM bridge ── */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Cloud size={20} className="text-wine" />
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.cloudBadge}</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {t.cloudTitle}<span className="text-gradient-wine italic">{t.cloudTitleHighlight}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t.cloudDesc}</p>
                <p>{t.cloudDesc2}</p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.cloudBullets.map((item, i) => (
                <ScrollReveal key={item} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-border bg-gradient-card p-5">
                    <CheckCircle size={18} className="text-wine mb-3" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
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
        title={{ es: "Siguientes pasos", en: "Next steps", it: "Prossimi passi", fr: "Prochaines étapes", de: "Nächste Schritte", pt: "Próximos passos" }[lang]}
        steps={[
          { to: "/demo", label: { es: "Solicitar demo", en: "Request demo", it: "Richiedi demo", fr: "Demander démo", de: "Demo anfordern", pt: "Solicitar demonstração" }[lang]!, description: { es: "Te mostramos cómo se integra con tu ecosistema.", en: "We show you how it integrates with your stack.", it: "Ti mostriamo come si integra con il tuo ecosistema.", fr: "Nous vous montrons comment il s'intègre à votre écosystème.", de: "Wir zeigen Ihnen, wie es sich in Ihren Stack integriert.", pt: "Mostramos como se integra com seu ecossistema." }[lang]!, type: "solution" },
          { to: "/precios", label: { es: "Planes y precios", en: "Plans and pricing", it: "Piani e prezzi", fr: "Plans et tarifs", de: "Pläne und Preise", pt: "Planos e preços" }[lang]!, description: { es: "Las integraciones activas están en el plan Enterprise.", en: "Active integrations are in the Enterprise plan.", it: "Le integrazioni attive sono nel piano Enterprise.", fr: "Les intégrations actives sont dans le plan Enterprise.", de: "Aktive Integrationen sind im Enterprise-Plan enthalten.", pt: "As integrações ativas estão no plano Enterprise." }[lang]!, type: "solution" },
          { to: "/soluciones/hoteles", label: { es: "Winerim para hoteles", en: "Winerim for hotels", it: "Winerim per hotel", fr: "Winerim pour hôtels", de: "Winerim für Hotels", pt: "Winerim para hotéis" }[lang]!, description: { es: "Integración con PMS y múltiples outlets.", en: "PMS integration and multiple outlets.", it: "Integrazione con PMS e molteplici punti vendita.", fr: "Intégration PMS et points de vente multiples.", de: "PMS-Integration und mehrere Verkaufsstellen.", pt: "Integração com PMS e múltiplos pontos de venda." }[lang]!, type: "solution" },
          { to: "/soluciones/grupos-restauracion", label: { es: "Winerim para grupos", en: "Winerim for groups", it: "Winerim per gruppi", fr: "Winerim pour groupes", de: "Winerim für Gruppen", pt: "Winerim para grupos de restauração" }[lang]!, description: { es: "Integración centralizada multi-TPV.", en: "Centralized multi-POS integration.", it: "Integrazione centralizzata multi-POS.", fr: "Intégration centralisée multi-POS.", de: "Zentralisierte Multi-POS-Integration.", pt: "Integração centralizada com múltiplos POS." }[lang]!, type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: { es: "Software de carta de vinos", en: "Wine list software", it: "Software carta dei vini", fr: "Logiciel carte des vins", de: "Weinkarten-Software", pt: "Software de carta de vinhos" }[lang]!, type: "solution" },
        { to: localePath("/funcionalidades"), label: { es: "Todas las funcionalidades", en: "All features", it: "Tutte le funzionalità", fr: "Toutes les fonctionnalités", de: "Alle Funktionen", pt: "Todas as funcionalidades" }[lang]!, type: "solution" },
        { to: localePath("/producto/inteligencia-dinamica"), label: { es: "Inteligencia dinámica", en: "Dynamic intelligence", it: "Intelligenza dinamica", fr: "Intelligence dynamique", de: "Dynamische Intelligenz", pt: "Inteligência dinâmica" }[lang]!, type: "solution" },
        { to: localePath("/soluciones/restaurantes-sin-sumiller"), label: { es: "Para restaurantes sin sumiller", en: "For restaurants without sommelier", it: "Per ristoranti senza sommelier", fr: "Pour restaurants sans sommelier", de: "Für Restaurants ohne Sommelier", pt: "Para restaurantes sem escanção" }[lang]!, type: "solution" },
        { to: localePath("/casos-exito"), label: { es: "Casos de éxito", en: "Case studies", it: "Casi di successo", fr: "Cas clients", de: "Fallstudien", pt: "Casos de sucesso" }[lang]!, type: "solution" },
        { to: localePath("/comparativas"), label: { es: "Compara Winerim", en: "Compare Winerim", it: "Confronta Winerim", fr: "Comparez Winerim", de: "Winerim vergleichen", pt: "Comparar Winerim" }[lang]!, type: "solution" },
      ]} />

      <Footer />
    </div>
  );
};

export default Integraciones;
