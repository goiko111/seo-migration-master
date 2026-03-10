import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plug, Monitor, Database, Warehouse, Code2,
  RefreshCw, BarChart3, Wine, CheckCircle, Layers, Zap, Globe
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface Integration {
  name: string;
  desc: string;
}

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; h1Highlight: string;
  subtitle: string; cta: string; introTitle: string; introP1: string; introP2: string;
  posBadge: string; posTitle: string; posTitleHighlight: string; posDesc: string;
  posNote: string; posNoteTitle: string;
  erpBadge: string; erpTitle: string; erpTitleHighlight: string; erpDesc: string;
  invBadge: string; invTitle: string; invTitleHighlight: string; invDesc: string;
  apiBadge: string; apiTitle: string; apiTitleHighlight: string; apiDesc: string; apiNote: string;
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string; ctaBtn: string;
  pos: Integration[]; erp: Integration[];
  invFeatures: { label: string; desc: string }[];
  apiFeatures: { label: string; desc: string }[];
}> = {
  es: {
    seoTitle: "Integraciones de Winerim | POS, ERP, Inventario y API",
    seoDesc: "Winerim se integra con Revo, Agora, ICG, Lightspeed, Square, Holded, Sage, Odoo y más. Conecta tu carta de vinos con los sistemas que ya usas.",
    badge: "Ecosistema conectado", h1: "Integraciones de", h1Highlight: "Winerim",
    subtitle: "Winerim se integra con los sistemas que ya utilizas en tu restaurante. Sin fricciones, sin cambios.",
    cta: "Solicitar demo",
    introTitle: "Tu restaurante ya tiene herramientas. Winerim las completa.",
    introP1: "Los restaurantes utilizan sistemas de punto de venta (TPV), ERPs, herramientas de inventario, plataformas de pedidos y más. Winerim está diseñado para convivir con todo tu ecosistema tecnológico, no para reemplazarlo.",
    introP2: "Conectamos tu carta de vinos con los datos que ya tienes para que tomes mejores decisiones sobre ventas, stock y precios.",
    posBadge: "Punto de venta", posTitle: "Integración con", posTitleHighlight: "TPV",
    posDesc: "Winerim puede integrarse con tu sistema de punto de venta para sincronizar ventas en tiempo real, analizar el consumo de vino y gestionar el inventario de forma automática.",
    posNoteTitle: "¿Tu TPV no está en la lista?", posNote: "Nuestro equipo puede desarrollar integraciones personalizadas con cualquier sistema de punto de venta. Contáctanos para más información.",
    erpBadge: "Gestión empresarial", erpTitle: "Integración con sistemas de", erpTitleHighlight: "gestión",
    erpDesc: "Conecta Winerim con tu ERP para mejorar el control de bodega, automatizar pedidos a proveedores y tener una visión completa de costes y márgenes.",
    invBadge: "Control de bodega", invTitle: "Gestión de", invTitleHighlight: "inventario",
    invDesc: "Winerim te ayuda a controlar cada botella de tu bodega, desde la entrada hasta la venta, pasando por el servicio por copa.",
    apiBadge: "Para desarrolladores", apiTitle: "API de", apiTitleHighlight: "Winerim",
    apiDesc: "Winerim dispone de una API completa para integraciones personalizadas. Conecta cualquier sistema con tu carta de vinos de forma programática.",
    apiNote: "Documentación completa disponible para clientes del plan Enterprise.",
    ctaBadge: "Conecta todo", ctaTitle: "Integra Winerim con tu ecosistema", ctaTitleHighlight: "tecnológico",
    ctaDesc: "Te mostramos cómo conectar Winerim con los sistemas que ya utilizas. Sin fricciones, sin cambios.",
    ctaBtn: "Solicitar demo",
    pos: [
      { name: "Agora POS", desc: "Integración TPV completa con sincronización bidireccional de ventas y catálogo" },
      { name: "Revo XEF", desc: "API REST con autenticación Bearer, ventas, catálogo y sincronización bidireccional" },
      { name: "ICG FrontRest", desc: "POS on-premise con acceso directo SQL Server. Ventas, catálogo y stock" },
      { name: "Glop", desc: "TPV con documentación API en apidoc.glop.es" },
      { name: "Hiopos / Hioffice", desc: "Integración basada en exportación/importación CSV/XML de ventas y artículos" },
      { name: "Turbopos", desc: "Integración on-premise sin API pública" },
      { name: "BDP NET", desc: "Integración REST API Weblink con URL, puerto y perfil configurables" },
      { name: "Zucchetti Tilby", desc: "API de ventas y endpoints de sandbox" },
      { name: "Cassa in Cloud", desc: "POS empresarial TeamSystem con autenticación por token" },
      { name: "Scloby", desc: "OAuth2 + OpenAPI para pedidos y catálogo" },
      { name: "RCH", desc: "Integración mediante canales comerciales" },
      { name: "Kumo (TCPOS)", desc: "API REST Zucchetti para ventas, catálogo y pedidos" },
      { name: "SoftRestaurant", desc: "API REST/JSON con endpoints de catálogo" },
      { name: "Poster POS", desc: "Portal de desarrolladores con API abierta" },
      { name: "Fudo", desc: "APIs de inyección de pedidos y catálogo" },
      { name: "Toast POS", desc: "Sincronización de pedidos, ventas y menús en tiempo real" },
      { name: "Clover", desc: "Pedidos, pagos, artículos y webhooks con OAuth2" },
      { name: "Square POS", desc: "Pagos, catálogo y analítica de ventas integrada" },
      { name: "Lightspeed Restaurant", desc: "TPV cloud con datos financieros y webhooks" },
      { name: "Revel Systems", desc: "Autenticación REST y webhooks de menú" },
      { name: "NCR Aloha", desc: "API cloud In-Store con TLS/gRPC" },
      { name: "TouchBistro", desc: "Importación de ventas, facturas y artículos" },
      { name: "Oracle MICROS Simphony", desc: "APIs REST con OAuth2/TLS para transacciones cloud" },
    ],
    erp: [
      { name: "Holded", desc: "Facturación, inventario y contabilidad en la nube" },
      { name: "Sage", desc: "ERP para gestión financiera y operativa" },
      { name: "Odoo", desc: "ERP modular de código abierto" },
    ],
    invFeatures: [
      { label: "Stock de vinos en tiempo real", desc: "Control automático de existencias por botella y por copa." },
      { label: "Rotación de referencias", desc: "Identifica qué vinos se venden y cuáles se estancan." },
      { label: "Consumo por botella y copa", desc: "Analítica detallada de consumo para optimizar compras." },
      { label: "Alertas de stock bajo", desc: "Notificaciones automáticas cuando un vino está por agotarse." },
    ],
    apiFeatures: [
      { label: "Automatización", desc: "Sincroniza datos entre Winerim y tus sistemas sin intervención manual." },
      { label: "Sistemas propios", desc: "Conecta Winerim con tu ERP, CRM o cualquier software interno." },
      { label: "Apps externas", desc: "Integra Winerim con aplicaciones de terceros y plataformas de reservas." },
    ],
  },
  en: {
    seoTitle: "Winerim Integrations | POS, ERP, Inventory & API",
    seoDesc: "Winerim integrates with Revo, Agora, ICG, Lightspeed, Square, Holded, Sage, Odoo and more. Connect your wine list with your existing systems.",
    badge: "Connected ecosystem", h1: "Winerim", h1Highlight: "Integrations",
    subtitle: "Winerim integrates with the systems you already use in your restaurant. No friction, no changes.",
    cta: "Request demo",
    introTitle: "Your restaurant already has tools. Winerim completes them.",
    introP1: "Restaurants use POS systems, ERPs, inventory tools, ordering platforms and more. Winerim is designed to coexist with your entire tech ecosystem, not to replace it.",
    introP2: "We connect your wine list with the data you already have so you can make better decisions about sales, stock and pricing.",
    posBadge: "Point of sale", posTitle: "Integration with", posTitleHighlight: "POS",
    posDesc: "Winerim integrates with your point of sale system to sync sales in real time, analyze wine consumption and manage inventory automatically.",
    posNoteTitle: "Your POS not listed?", posNote: "Our team can develop custom integrations with any POS system. Contact us for more information.",
    erpBadge: "Business management", erpTitle: "Integration with management", erpTitleHighlight: "systems",
    erpDesc: "Connect Winerim with your ERP to improve cellar control, automate supplier orders and get a complete view of costs and margins.",
    invBadge: "Cellar control", invTitle: "Inventory", invTitleHighlight: "management",
    invDesc: "Winerim helps you control every bottle in your cellar, from entry to sale, including by-the-glass service.",
    apiBadge: "For developers", apiTitle: "Winerim", apiTitleHighlight: "API",
    apiDesc: "Winerim offers a complete API for custom integrations. Connect any system with your wine list programmatically.",
    apiNote: "Full documentation available for Enterprise plan customers.",
    ctaBadge: "Connect everything", ctaTitle: "Integrate Winerim with your", ctaTitleHighlight: "tech stack",
    ctaDesc: "We'll show you how to connect Winerim with the systems you already use. No friction, no changes.",
    ctaBtn: "Request demo",
    pos: [
      { name: "Agora POS", desc: "Full-featured POS integration with bidirectional sales and catalog sync" },
      { name: "Revo XEF", desc: "REST API with Bearer auth, sales, catalog and bidirectional sync" },
      { name: "ICG FrontRest", desc: "On-prem POS via SQL Server direct access. Sales, catalog and stock" },
      { name: "Glop", desc: "POS with API documentation at apidoc.glop.es" },
      { name: "Hiopos / Hioffice", desc: "Export/import file-based integration for CSV/XML sales and articles" },
      { name: "Turbopos", desc: "On-prem integration without public API" },
      { name: "BDP NET", desc: "Weblink REST API integration with configurable URL, port and profile" },
      { name: "Toast POS", desc: "Real-time order, sales and menu synchronization" },
      { name: "Clover", desc: "Orders, payments, items and webhooks with OAuth2" },
      { name: "Square POS", desc: "Integrated payments, catalog and sales analytics" },
      { name: "Lightspeed Restaurant", desc: "Cloud POS with financial data and webhooks" },
      { name: "Revel Systems", desc: "REST authentication and menu webhooks" },
      { name: "NCR Aloha", desc: "Cloud In-Store API with TLS/gRPC" },
      { name: "TouchBistro", desc: "Sales, bills, payments and items import" },
      { name: "Oracle MICROS Simphony", desc: "REST APIs with OAuth2/TLS for cloud transactions" },
      { name: "Zucchetti Tilby", desc: "Sales API and sandbox endpoints" },
      { name: "Cassa in Cloud", desc: "TeamSystem enterprise POS with token-based auth" },
      { name: "Scloby", desc: "OAuth2 + OpenAPI for orders and catalog" },
      { name: "RCH", desc: "Integration via commercial channels" },
      { name: "Kumo (TCPOS)", desc: "Zucchetti REST API for sales, catalog and orders" },
      { name: "SoftRestaurant", desc: "REST/JSON API with catalog endpoints" },
      { name: "Poster POS", desc: "Developer portal with open API" },
      { name: "Fudo", desc: "Order injection and catalog query APIs" },
    ],
    erp: [
      { name: "Holded", desc: "Cloud billing, inventory and accounting" },
      { name: "Sage", desc: "ERP for financial and operational management" },
      { name: "Odoo", desc: "Modular open-source ERP" },
    ],
    invFeatures: [
      { label: "Real-time wine stock", desc: "Automatic stock control per bottle and glass." },
      { label: "Reference rotation", desc: "Identify which wines sell and which stagnate." },
      { label: "Consumption per bottle & glass", desc: "Detailed consumption analytics to optimize purchasing." },
      { label: "Low stock alerts", desc: "Automatic notifications when a wine is running low." },
    ],
    apiFeatures: [
      { label: "Automation", desc: "Sync data between Winerim and your systems without manual intervention." },
      { label: "Custom systems", desc: "Connect Winerim with your ERP, CRM or any internal software." },
      { label: "External apps", desc: "Integrate Winerim with third-party apps and booking platforms." },
    ],
  },
  it: {
    seoTitle: "Integrazioni Winerim | POS, ERP, Inventario e API",
    seoDesc: "Winerim si integra con Revo, Agora, ICG, Lightspeed, Square, Holded, Sage, Odoo e altri. Collega la tua carta dei vini ai sistemi che già usi.",
    badge: "Ecosistema connesso", h1: "Integrazioni di", h1Highlight: "Winerim",
    subtitle: "Winerim si integra con i sistemi che già utilizzi nel tuo ristorante. Senza attriti, senza cambiamenti.",
    cta: "Richiedi demo",
    introTitle: "Il tuo ristorante ha già gli strumenti. Winerim li completa.",
    introP1: "I ristoranti utilizzano sistemi POS, ERP, strumenti di inventario, piattaforme per ordini e altro. Winerim è progettato per convivere con tutto il tuo ecosistema tecnologico, non per sostituirlo.",
    introP2: "Colleghiamo la tua carta dei vini con i dati che già possiedi per aiutarti a prendere decisioni migliori su vendite, stock e prezzi.",
    posBadge: "Punto vendita", posTitle: "Integrazione con", posTitleHighlight: "POS",
    posDesc: "Winerim si integra con il tuo sistema POS per sincronizzare le vendite in tempo reale, analizzare il consumo di vino e gestire l'inventario automaticamente.",
    posNoteTitle: "Il tuo POS non è nella lista?", posNote: "Il nostro team può sviluppare integrazioni personalizzate con qualsiasi sistema POS. Contattaci per maggiori informazioni.",
    erpBadge: "Gestione aziendale", erpTitle: "Integrazione con sistemi di", erpTitleHighlight: "gestione",
    erpDesc: "Collega Winerim al tuo ERP per migliorare il controllo della cantina, automatizzare gli ordini ai fornitori e avere una visione completa di costi e margini.",
    invBadge: "Controllo cantina", invTitle: "Gestione", invTitleHighlight: "inventario",
    invDesc: "Winerim ti aiuta a controllare ogni bottiglia della tua cantina, dall'ingresso alla vendita, passando per il servizio al calice.",
    apiBadge: "Per sviluppatori", apiTitle: "API di", apiTitleHighlight: "Winerim",
    apiDesc: "Winerim offre un'API completa per integrazioni personalizzate. Collega qualsiasi sistema alla tua carta dei vini in modo programmatico.",
    apiNote: "Documentazione completa disponibile per i clienti del piano Enterprise.",
    ctaBadge: "Collega tutto", ctaTitle: "Integra Winerim con il tuo ecosistema", ctaTitleHighlight: "tecnologico",
    ctaDesc: "Ti mostriamo come collegare Winerim ai sistemi che già utilizzi. Senza attriti, senza cambiamenti.",
    ctaBtn: "Richiedi demo",
    pos: [
      { name: "Agora POS", desc: "Integrazione TPV completa con sincronizzazione bidirezionale vendite e catalogo" },
      { name: "Revo XEF", desc: "API REST con autenticazione Bearer, vendite, catalogo e sync bidirezionale" },
      { name: "ICG FrontRest", desc: "POS on-premise con accesso diretto SQL Server. Vendite, catalogo e stock" },
      { name: "Glop", desc: "TPV con documentazione API su apidoc.glop.es" },
      { name: "Hiopos / Hioffice", desc: "Integrazione basata su esportazione/importazione CSV/XML vendite e articoli" },
      { name: "Turbopos", desc: "Integrazione on-premise senza API pubblica" },
      { name: "BDP NET", desc: "Integrazione REST API Weblink con URL, porta e profilo configurabili" },
      { name: "Toast POS", desc: "Sincronizzazione ordini, vendite e menu in tempo reale" },
      { name: "Clover", desc: "Ordini, pagamenti, articoli e webhooks con OAuth2" },
      { name: "Square POS", desc: "Pagamenti, catalogo e analytics vendite integrati" },
      { name: "Lightspeed Restaurant", desc: "POS cloud con dati finanziari e webhooks" },
      { name: "Revel Systems", desc: "Autenticazione REST e webhooks menu" },
      { name: "NCR Aloha", desc: "API cloud In-Store con TLS/gRPC" },
      { name: "TouchBistro", desc: "Importazione vendite, fatture e articoli" },
      { name: "Oracle MICROS Simphony", desc: "API REST con OAuth2/TLS per transazioni cloud" },
      { name: "Zucchetti Tilby", desc: "API vendite e endpoint sandbox" },
      { name: "Cassa in Cloud", desc: "POS enterprise TeamSystem con autenticazione token" },
      { name: "Scloby", desc: "OAuth2 + OpenAPI per ordini e catalogo" },
      { name: "RCH", desc: "Integrazione tramite canali commerciali" },
      { name: "Kumo (TCPOS)", desc: "API REST Zucchetti per vendite, catalogo e ordini" },
      { name: "SoftRestaurant", desc: "API REST/JSON con endpoint catalogo" },
      { name: "Poster POS", desc: "Portale sviluppatori con API aperta" },
      { name: "Fudo", desc: "API di iniezione ordini e query catalogo" },
    ],
    erp: [
      { name: "Holded", desc: "Fatturazione, inventario e contabilità in cloud" },
      { name: "Sage", desc: "ERP per gestione finanziaria e operativa" },
      { name: "Odoo", desc: "ERP modulare open source" },
    ],
    invFeatures: [
      { label: "Stock vini in tempo reale", desc: "Controllo automatico delle scorte per bottiglia e calice." },
      { label: "Rotazione referenze", desc: "Identifica quali vini vendono e quali ristagnano." },
      { label: "Consumo per bottiglia e calice", desc: "Analytics dettagliati del consumo per ottimizzare gli acquisti." },
      { label: "Avvisi stock basso", desc: "Notifiche automatiche quando un vino sta per esaurirsi." },
    ],
    apiFeatures: [
      { label: "Automazione", desc: "Sincronizza i dati tra Winerim e i tuoi sistemi senza intervento manuale." },
      { label: "Sistemi propri", desc: "Collega Winerim al tuo ERP, CRM o qualsiasi software interno." },
      { label: "App esterne", desc: "Integra Winerim con app di terze parti e piattaforme di prenotazione." },
    ],
  },
  fr: {
    seoTitle: "Intégrations Winerim | POS, ERP, Inventaire et API",
    seoDesc: "Winerim s'intègre avec Revo, Agora, ICG, Lightspeed, Square, Holded, Sage, Odoo et plus. Connectez votre carte des vins à vos systèmes existants.",
    badge: "Écosystème connecté", h1: "Intégrations", h1Highlight: "Winerim",
    subtitle: "Winerim s'intègre aux systèmes que vous utilisez déjà dans votre restaurant. Sans friction, sans changement.",
    cta: "Demander une démo",
    introTitle: "Votre restaurant a déjà ses outils. Winerim les complète.",
    introP1: "Les restaurants utilisent des systèmes de caisse, des ERP, des outils d'inventaire, des plateformes de commande et plus. Winerim est conçu pour cohabiter avec tout votre écosystème technologique, pas pour le remplacer.",
    introP2: "Nous connectons votre carte des vins avec les données que vous possédez déjà pour vous aider à prendre de meilleures décisions sur les ventes, les stocks et les prix.",
    posBadge: "Point de vente", posTitle: "Intégration avec", posTitleHighlight: "POS",
    posDesc: "Winerim s'intègre à votre système de caisse pour synchroniser les ventes en temps réel, analyser la consommation de vin et gérer l'inventaire automatiquement.",
    posNoteTitle: "Votre POS n'est pas listé ?", posNote: "Notre équipe peut développer des intégrations personnalisées avec n'importe quel système de caisse. Contactez-nous pour plus d'informations.",
    erpBadge: "Gestion d'entreprise", erpTitle: "Intégration avec les systèmes de", erpTitleHighlight: "gestion",
    erpDesc: "Connectez Winerim à votre ERP pour améliorer le contrôle de cave, automatiser les commandes fournisseurs et avoir une vision complète des coûts et marges.",
    invBadge: "Contrôle de cave", invTitle: "Gestion des", invTitleHighlight: "stocks",
    invDesc: "Winerim vous aide à contrôler chaque bouteille de votre cave, de l'entrée à la vente, en passant par le service au verre.",
    apiBadge: "Pour développeurs", apiTitle: "API", apiTitleHighlight: "Winerim",
    apiDesc: "Winerim dispose d'une API complète pour les intégrations personnalisées. Connectez n'importe quel système à votre carte des vins de manière programmatique.",
    apiNote: "Documentation complète disponible pour les clients du plan Enterprise.",
    ctaBadge: "Tout connecter", ctaTitle: "Intégrez Winerim à votre écosystème", ctaTitleHighlight: "technologique",
    ctaDesc: "Nous vous montrons comment connecter Winerim aux systèmes que vous utilisez déjà. Sans friction, sans changement.",
    ctaBtn: "Demander une démo",
    pos: [
      { name: "Agora POS", desc: "Intégration TPV complète avec synchronisation bidirectionnelle ventes et catalogue" },
      { name: "Revo XEF", desc: "API REST avec authentification Bearer, ventes, catalogue et sync bidirectionnelle" },
      { name: "ICG FrontRest", desc: "POS on-premise avec accès direct SQL Server. Ventes, catalogue et stock" },
      { name: "Glop", desc: "TPV avec documentation API sur apidoc.glop.es" },
      { name: "Hiopos / Hioffice", desc: "Intégration basée sur export/import CSV/XML de ventes et articles" },
      { name: "Turbopos", desc: "Intégration on-premise sans API publique" },
      { name: "BDP NET", desc: "Intégration REST API Weblink avec URL, port et profil configurables" },
      { name: "Toast POS", desc: "Synchronisation des commandes, ventes et menus en temps réel" },
      { name: "Clover", desc: "Commandes, paiements, articles et webhooks avec OAuth2" },
      { name: "Square POS", desc: "Paiements, catalogue et analytics de ventes intégrés" },
      { name: "Lightspeed Restaurant", desc: "POS cloud avec données financières et webhooks" },
      { name: "Revel Systems", desc: "Authentification REST et webhooks de menu" },
      { name: "NCR Aloha", desc: "API cloud In-Store avec TLS/gRPC" },
      { name: "TouchBistro", desc: "Importation des ventes, factures et articles" },
      { name: "Oracle MICROS Simphony", desc: "APIs REST avec OAuth2/TLS pour transactions cloud" },
      { name: "Zucchetti Tilby", desc: "API de ventes et endpoints sandbox" },
      { name: "Cassa in Cloud", desc: "POS entreprise TeamSystem avec authentification par token" },
      { name: "Scloby", desc: "OAuth2 + OpenAPI pour commandes et catalogue" },
      { name: "RCH", desc: "Intégration via canaux commerciaux" },
      { name: "Kumo (TCPOS)", desc: "API REST Zucchetti pour ventes, catalogue et commandes" },
      { name: "SoftRestaurant", desc: "API REST/JSON avec endpoints catalogue" },
      { name: "Poster POS", desc: "Portail développeurs avec API ouverte" },
      { name: "Fudo", desc: "APIs d'injection de commandes et requête catalogue" },
    ],
    erp: [
      { name: "Holded", desc: "Facturation, inventaire et comptabilité dans le cloud" },
      { name: "Sage", desc: "ERP pour la gestion financière et opérationnelle" },
      { name: "Odoo", desc: "ERP modulaire open source" },
    ],
    invFeatures: [
      { label: "Stock de vins en temps réel", desc: "Contrôle automatique des stocks par bouteille et au verre." },
      { label: "Rotation des références", desc: "Identifiez quels vins se vendent et lesquels stagnent." },
      { label: "Consommation par bouteille et verre", desc: "Analytics détaillés de consommation pour optimiser les achats." },
      { label: "Alertes stock bas", desc: "Notifications automatiques quand un vin est bientôt épuisé." },
    ],
    apiFeatures: [
      { label: "Automatisation", desc: "Synchronisez les données entre Winerim et vos systèmes sans intervention manuelle." },
      { label: "Systèmes internes", desc: "Connectez Winerim à votre ERP, CRM ou tout logiciel interne." },
      { label: "Apps externes", desc: "Intégrez Winerim avec des apps tierces et des plateformes de réservation." },
    ],
  },
};

const invIcons = [Wine, RefreshCw, BarChart3, Layers];
const apiIcons = [Zap, Database, Globe];

const Integraciones = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "integraciones-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.seoTitle,
      description: t.seoDesc,
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("integraciones-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/integraciones")}`}
        hreflang={allLangPaths("/integraciones")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Plug size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1}{" "}<span className="text-gradient-wine italic">{t.h1Highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.cta} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                  <Plug size={24} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">{t.introTitle}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{t.introP1}</p>
                  <p className="text-muted-foreground leading-relaxed">{t.introP2}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* POS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Monitor size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.posBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.posTitle} <span className="text-gradient-wine italic">{t.posTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.posDesc}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.pos.map((int, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-lg font-bold text-wine">{int.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1">{int.name}</h3>
                  <p className="text-sm text-muted-foreground">{int.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

      {/* ERP */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.erpBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.erpTitle}{" "}<span className="text-gradient-wine italic">{t.erpTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{t.erpDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {t.erp.map((int, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-lg font-bold text-wine">{int.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1">{int.name}</h3>
                  <p className="text-sm text-muted-foreground">{int.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INVENTARIO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Warehouse size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.invBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.invTitle} <span className="text-gradient-wine italic">{t.invTitleHighlight}</span>
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

      {/* API */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Code2 size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.apiBadge}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {t.apiTitle} <span className="text-gradient-wine italic">{t.apiTitleHighlight}</span>
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

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle}{" "}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaBtn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integraciones;
