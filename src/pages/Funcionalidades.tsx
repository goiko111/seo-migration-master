import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Utensils, BarChart3, Eye, ShoppingCart,
  QrCode, Smartphone, Globe, Palette, Wine, Filter, Search,
  RefreshCw, Bell, TrendingUp, FileText, Languages, Zap,
  Rocket, CheckCircle, Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import tabletHeroImg from "@/assets/winerim-tablet-hero.png";
import tabletDetailImg from "@/assets/winerim-tablet-detail.png";
import tabletComparatorImg from "@/assets/winerim-tablet-comparator.png";
import tabletPairingImg from "@/assets/winerim-tablet-pairing.png";
import tabletFichaImg from "@/assets/winerim-tablet-ficha.png";
import mobileListImg from "@/assets/winerim-mobile-list.png";
import mobileDetailImg from "@/assets/winerim-mobile-detail.png";
import mobileComparatorImg from "@/assets/winerim-mobile-comparator.png";
import mgmtCartaImg from "@/assets/mgmt-carta.png";
import mgmtStockImg from "@/assets/mgmt-stock.png";
import mgmtInsightsImg from "@/assets/mgmt-insights.png";
import mgmtRendimientoImg from "@/assets/mgmt-rendimiento.png";
import mgmtPedidosImg from "@/assets/mgmt-pedidos.png";
import mgmtAutomatizacionesImg from "@/assets/mgmt-automatizaciones.png";
import mgmtRotacionImg from "@/assets/mgmt-rotacion.png";
import mgmtRecomendadosImg from "@/assets/mgmt-recomendados.png";
import mgmtObsolescenciaImg from "@/assets/mgmt-obsolescencia.png";

const coreIcons = [Sparkles, Utensils, BarChart3, Eye, ShoppingCart, QrCode, Filter, Search, Wine, FileText, Languages, Palette];
const mgmtIcons = [RefreshCw, Bell, TrendingUp, Globe, Smartphone, Zap];

const i18n: Record<string, {
  seo_title: string; seo_desc: string; breadcrumb: string; badge: string; title: string; subtitle: string;
  core_badge: string; core_title: string; mgmt_badge: string; mgmt_title: string;
  changelog_badge: string; changelog_title: string; changelog_sub: string;
  roadmap_badge: string; roadmap_title: string; roadmap_sub: string;
  cta_badge: string; cta_title: string; cta_sub: string; cta_btn: string;
  core: { title: string; desc: string }[];
  mgmt: { title: string; desc: string }[];
  changelog: { date: string; title: string; desc: string; tag: "new" | "improvement" | "fix" }[];
  roadmap: { quarter: string; items: string[] }[];
  tag_labels: Record<string, string>;
}> = {
  es: {
    seo_title: "Funcionalidades de Winerim | Carta de Vinos Inteligente", seo_desc: "Descubre todas las funcionalidades de Winerim: recomendaciones IA, maridajes automáticos, filtros sensoriales, analítica y más.", breadcrumb: "Funcionalidades", badge: "Todo en uno", title: "Todo lo que <em>Winerim</em> puede hacer por ti", subtitle: "Una plataforma completa para transformar tu carta de vinos en una herramienta de venta inteligente.",
    core_badge: "Para el comensal", core_title: "Experiencia del <em>cliente</em>", mgmt_badge: "Para el restaurante", mgmt_title: "Gestión y <em>analítica</em>",
    changelog_badge: "Changelog", changelog_title: "Últimas <em>novedades</em>", changelog_sub: "Winerim evoluciona constantemente.",
    roadmap_badge: "Roadmap", roadmap_title: "Lo que viene en <em>Winerim</em>", roadmap_sub: "Nuestro plan de desarrollo para los próximos meses.",
    cta_badge: "Empieza hoy", cta_title: "Descubre Winerim en <em>acción</em>", cta_sub: "Prueba todas estas funcionalidades gratis durante 14 días. Sin compromiso.", cta_btn: "Prueba Gratis",
    core: [
      { title: "Recomendaciones IA", desc: "La inteligencia artificial sugiere vinos según las preferencias del comensal." },
      { title: "Maridajes automáticos", desc: "Propuestas de maridaje instantáneas para cada plato del menú." },
      { title: "Comparador de vinos", desc: "El comensal compara opciones con información clara y detallada." },
      { title: "Información visual", desc: "Notas de cata accesibles, sin tecnicismos, con imágenes." },
      { title: "Venta guiada", desc: "La carta conduce al cliente hacia mejores decisiones de compra." },
      { title: "Acceso por QR", desc: "El comensal accede escaneando un QR desde su móvil." },
      { title: "Filtros sensoriales", desc: "Busca vinos por sabor, cuerpo o intensidad." },
      { title: "Buscador inteligente", desc: "Encuentra cualquier referencia en segundos." },
      { title: "Gestión de bodega", desc: "Control total de stock con alertas." },
      { title: "Notas de cata IA", desc: "Generación automática de descripciones atractivas." },
      { title: "Multiidioma", desc: "Carta traducida automáticamente." },
      { title: "Personalización total", desc: "Adapta colores, logo y tipografía." },
    ],
    mgmt: [
      { title: "Rotación automática", desc: "Destaca vinos diferentes cada semana." },
      { title: "Alertas de stock", desc: "Notificaciones cuando un vino está por agotarse." },
      { title: "Analítica de ventas", desc: "Dashboard con datos de venta por vino y periodo." },
      { title: "Multirestaurante", desc: "Gestiona la carta de varios locales desde un panel." },
      { title: "App de gestión", desc: "Actualiza la carta desde cualquier dispositivo." },
      { title: "Alta instantánea", desc: "Añade vinos en segundos con +500.000 referencias." },
    ],
    changelog: [
      { date: "Feb 2026", title: "Filtros sensoriales v2", desc: "Nueva interfaz de filtrado por perfil aromático.", tag: "new" },
      { date: "Ene 2026", title: "Comparador mejorado", desc: "Compara hasta 4 vinos con gráficos radar.", tag: "improvement" },
      { date: "Dic 2025", title: "Traducción automática", desc: "Carta traducida a 12 idiomas en tiempo real.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard analítico v3", desc: "Nuevos KPIs de rentabilidad.", tag: "improvement" },
      { date: "Oct 2025", title: "Alta masiva de vinos", desc: "Importa tu bodega desde Excel o CSV.", tag: "new" },
      { date: "Sep 2025", title: "Integración Revo TPV", desc: "Sincronización bidireccional con Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Q2 2026", items: ["Recomendaciones por historial", "Integración con reservas", "Widget embebido para web"] },
      { quarter: "Q3 2026", items: ["App nativa para comensales", "Programa de fidelización", "Marketplace de bodegas"] },
      { quarter: "Q4 2026", items: ["IA predictiva de tendencias", "Carta con realidad aumentada", "API pública v2"] },
    ],
    tag_labels: { new: "Nuevo", improvement: "Mejora", fix: "Corrección" },
  },
  en: {
    seo_title: "Winerim Features | Smart Wine List", seo_desc: "Discover all Winerim features: AI recommendations, auto pairings, sensory filters, analytics and more.", breadcrumb: "Features", badge: "All in one", title: "Everything <em>Winerim</em> can do for you", subtitle: "A complete platform to transform your wine list into a smart sales tool.",
    core_badge: "For the diner", core_title: "Customer <em>experience</em>", mgmt_badge: "For the restaurant", mgmt_title: "Management & <em>analytics</em>",
    changelog_badge: "Changelog", changelog_title: "Latest <em>updates</em>", changelog_sub: "Winerim is constantly evolving.",
    roadmap_badge: "Roadmap", roadmap_title: "What's coming to <em>Winerim</em>", roadmap_sub: "Our development plan for the coming months.",
    cta_badge: "Start today", cta_title: "See Winerim in <em>action</em>", cta_sub: "Try all these features free for 14 days. No commitment.", cta_btn: "Try Free",
    core: [
      { title: "AI Recommendations", desc: "AI suggests wines based on diner preferences." },
      { title: "Auto pairings", desc: "Instant pairing suggestions for every dish." },
      { title: "Wine comparator", desc: "Guests compare options with clear, detailed info." },
      { title: "Visual information", desc: "Accessible tasting notes with images." },
      { title: "Guided selling", desc: "The list guides customers toward better purchases." },
      { title: "QR access", desc: "Guests access by scanning a QR from their phone." },
      { title: "Sensory filters", desc: "Search wines by taste, body, or intensity." },
      { title: "Smart search", desc: "Find any reference in seconds." },
      { title: "Cellar management", desc: "Full stock control with alerts." },
      { title: "AI tasting notes", desc: "Auto-generated attractive descriptions." },
      { title: "Multi-language", desc: "Automatically translated wine list." },
      { title: "Full customization", desc: "Adapt colors, logo, and typography." },
    ],
    mgmt: [
      { title: "Auto rotation", desc: "Feature different wines each week." },
      { title: "Stock alerts", desc: "Notifications when a wine is running low." },
      { title: "Sales analytics", desc: "Dashboard with sales data by wine and period." },
      { title: "Multi-restaurant", desc: "Manage lists for multiple locations from one panel." },
      { title: "Management app", desc: "Update your list from any device." },
      { title: "Instant adding", desc: "Add wines in seconds from 500K+ references." },
    ],
    changelog: [
      { date: "Feb 2026", title: "Sensory filters v2", desc: "New filtering UI by aromatic profile.", tag: "new" },
      { date: "Jan 2026", title: "Improved comparator", desc: "Compare up to 4 wines with radar charts.", tag: "improvement" },
      { date: "Dec 2025", title: "Auto translation", desc: "Wine list translated to 12 languages in real time.", tag: "new" },
      { date: "Nov 2025", title: "Analytics dashboard v3", desc: "New profitability KPIs.", tag: "improvement" },
      { date: "Oct 2025", title: "Bulk wine import", desc: "Import your entire cellar from Excel or CSV.", tag: "new" },
      { date: "Sep 2025", title: "Revo POS integration", desc: "Bidirectional sync with Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Q2 2026", items: ["History-based recommendations", "Reservation platform integration", "Embeddable web widget"] },
      { quarter: "Q3 2026", items: ["Native diner app", "Wine loyalty program", "Winery marketplace"] },
      { quarter: "Q4 2026", items: ["Predictive trend AI", "AR wine list", "Public API v2"] },
    ],
    tag_labels: { new: "New", improvement: "Improvement", fix: "Fix" },
  },
  it: {
    seo_title: "Funzionalità di Winerim | Carta dei Vini Intelligente", seo_desc: "Scopri tutte le funzionalità di Winerim.", breadcrumb: "Funzionalità", badge: "Tutto in uno", title: "Tutto ciò che <em>Winerim</em> può fare per te", subtitle: "Una piattaforma completa per trasformare la tua carta dei vini.",
    core_badge: "Per il commensale", core_title: "Esperienza del <em>cliente</em>", mgmt_badge: "Per il ristorante", mgmt_title: "Gestione e <em>analisi</em>",
    changelog_badge: "Changelog", changelog_title: "Ultime <em>novità</em>", changelog_sub: "Winerim si evolve costantemente.",
    roadmap_badge: "Roadmap", roadmap_title: "Cosa arriva su <em>Winerim</em>", roadmap_sub: "Il nostro piano di sviluppo.",
    cta_badge: "Inizia oggi", cta_title: "Scopri Winerim in <em>azione</em>", cta_sub: "Prova tutte le funzionalità gratis per 14 giorni.", cta_btn: "Prova Gratis",
    core: [
      { title: "Raccomandazioni IA", desc: "L'IA suggerisce vini in base alle preferenze." },
      { title: "Abbinamenti automatici", desc: "Proposte istantanee per ogni piatto." },
      { title: "Comparatore vini", desc: "Il cliente confronta opzioni con info dettagliate." },
      { title: "Info visiva", desc: "Note di degustazione accessibili con immagini." },
      { title: "Vendita guidata", desc: "La carta guida verso decisioni migliori." },
      { title: "Accesso QR", desc: "Accesso scansionando un QR dal telefono." },
      { title: "Filtri sensoriali", desc: "Cerca vini per gusto, corpo o intensità." },
      { title: "Ricerca intelligente", desc: "Trova qualsiasi referenza in secondi." },
      { title: "Gestione cantina", desc: "Controllo totale stock con avvisi." },
      { title: "Note IA", desc: "Descrizioni attrattive auto-generate." },
      { title: "Multilingua", desc: "Carta tradotta automaticamente." },
      { title: "Personalizzazione", desc: "Adatta colori, logo e tipografia." },
    ],
    mgmt: [
      { title: "Rotazione auto", desc: "Evidenzia vini diversi ogni settimana." },
      { title: "Avvisi stock", desc: "Notifiche quando un vino sta per esaurirsi." },
      { title: "Analisi vendite", desc: "Dashboard con dati vendita per vino." },
      { title: "Multi-ristorante", desc: "Gestisci più locali da un pannello." },
      { title: "App gestione", desc: "Aggiorna la carta da qualsiasi dispositivo." },
      { title: "Inserimento rapido", desc: "Aggiungi vini in secondi da +500K referenze." },
    ],
    changelog: [
      { date: "Feb 2026", title: "Filtri sensoriali v2", desc: "Nuova interfaccia filtri.", tag: "new" },
      { date: "Gen 2026", title: "Comparatore migliorato", desc: "Confronta fino a 4 vini.", tag: "improvement" },
      { date: "Dic 2025", title: "Traduzione automatica", desc: "Carta in 12 lingue.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard v3", desc: "Nuovi KPI di redditività.", tag: "improvement" },
      { date: "Ott 2025", title: "Import massivo", desc: "Importa da Excel o CSV.", tag: "new" },
      { date: "Set 2025", title: "Integrazione Revo", desc: "Sincronizzazione con Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Q2 2026", items: ["Raccomandazioni per storico", "Integrazione prenotazioni", "Widget per sito web"] },
      { quarter: "Q3 2026", items: ["App nativa", "Programma fedeltà vini", "Marketplace cantine"] },
      { quarter: "Q4 2026", items: ["IA predittiva tendenze", "Carta in realtà aumentata", "API pubblica v2"] },
    ],
    tag_labels: { new: "Nuovo", improvement: "Miglioramento", fix: "Correzione" },
  },
  fr: {
    seo_title: "Fonctionnalités Winerim | Carte des Vins Intelligente", seo_desc: "Découvrez toutes les fonctionnalités de Winerim.", breadcrumb: "Fonctionnalités", badge: "Tout en un", title: "Tout ce que <em>Winerim</em> peut faire pour vous", subtitle: "Une plateforme complète pour transformer votre carte des vins.",
    core_badge: "Pour le client", core_title: "Expérience <em>client</em>", mgmt_badge: "Pour le restaurant", mgmt_title: "Gestion et <em>analytique</em>",
    changelog_badge: "Changelog", changelog_title: "Dernières <em>nouveautés</em>", changelog_sub: "Winerim évolue constamment.",
    roadmap_badge: "Roadmap", roadmap_title: "Ce qui arrive sur <em>Winerim</em>", roadmap_sub: "Notre plan de développement.",
    cta_badge: "Commencez aujourd'hui", cta_title: "Découvrez Winerim en <em>action</em>", cta_sub: "Essayez toutes les fonctionnalités gratuitement pendant 14 jours.", cta_btn: "Essai Gratuit",
    core: [
      { title: "Recommandations IA", desc: "L'IA suggère des vins selon les préférences." },
      { title: "Accords automatiques", desc: "Suggestions instantanées pour chaque plat." },
      { title: "Comparateur de vins", desc: "Le client compare avec des infos détaillées." },
      { title: "Info visuelle", desc: "Notes de dégustation accessibles avec images." },
      { title: "Vente guidée", desc: "La carte guide vers de meilleurs achats." },
      { title: "Accès QR", desc: "Accès en scannant un QR depuis le téléphone." },
      { title: "Filtres sensoriels", desc: "Recherche par goût, corps ou intensité." },
      { title: "Recherche intelligente", desc: "Trouvez n'importe quelle référence en secondes." },
      { title: "Gestion de cave", desc: "Contrôle total du stock avec alertes." },
      { title: "Notes IA", desc: "Descriptions attractives auto-générées." },
      { title: "Multilingue", desc: "Carte traduite automatiquement." },
      { title: "Personnalisation", desc: "Adaptez couleurs, logo et typographie." },
    ],
    mgmt: [
      { title: "Rotation auto", desc: "Mettez en avant des vins différents chaque semaine." },
      { title: "Alertes stock", desc: "Notifications quand un vin est presque épuisé." },
      { title: "Analytique ventes", desc: "Dashboard avec données de vente par vin." },
      { title: "Multi-restaurant", desc: "Gérez plusieurs établissements depuis un panneau." },
      { title: "App de gestion", desc: "Mettez à jour depuis n'importe quel appareil." },
      { title: "Ajout instantané", desc: "Ajoutez des vins en secondes depuis +500K références." },
    ],
    changelog: [
      { date: "Fév 2026", title: "Filtres sensoriels v2", desc: "Nouvelle interface de filtrage.", tag: "new" },
      { date: "Jan 2026", title: "Comparateur amélioré", desc: "Comparez jusqu'à 4 vins.", tag: "improvement" },
      { date: "Déc 2025", title: "Traduction automatique", desc: "Carte en 12 langues.", tag: "new" },
      { date: "Nov 2025", title: "Dashboard v3", desc: "Nouveaux KPIs de rentabilité.", tag: "improvement" },
      { date: "Oct 2025", title: "Import massif", desc: "Importez depuis Excel ou CSV.", tag: "new" },
      { date: "Sep 2025", title: "Intégration Revo", desc: "Synchronisation avec Revo.", tag: "new" },
    ],
    roadmap: [
      { quarter: "Q2 2026", items: ["Recommandations par historique", "Intégration réservations", "Widget pour site web"] },
      { quarter: "Q3 2026", items: ["App native", "Programme fidélité vins", "Marketplace caves"] },
      { quarter: "Q4 2026", items: ["IA prédictive tendances", "Carte en réalité augmentée", "API publique v2"] },
    ],
    tag_labels: { new: "Nouveau", improvement: "Amélioration", fix: "Correction" },
  },
};

const tagColors: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  improvement: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  fix: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const emToGradient = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

const Funcionalidades = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = i18n[lang] || i18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/funcionalidades" hreflang={allLangPaths("/funcionalidades")} />
      <Navbar />

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

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.core_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.core_title) }} />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.core.map((feat, i) => { const Icon = coreIcons[i]; return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300"><Icon size={24} className="text-wine" /></div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            ); })}
          </div>

          {/* Tablet screenshots */}
          <ScrollReveal className="mt-16 mb-10">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { img: tabletHeroImg, alt: "Carta de vinos digital en tablet", label: "Carta interactiva" },
                { img: tabletDetailImg, alt: "Ficha de vino detallada", label: "Ficha del vino" },
                { img: tabletComparatorImg, alt: "Comparador de vinos Winerim", label: "Comparador de vinos" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={item.img} alt={item.alt} className="relative w-full rounded-xl border border-border shadow-lg" />
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { img: tabletPairingImg, alt: "Maridajes automáticos Winerim", label: "Maridajes automáticos" },
                { img: tabletFichaImg, alt: "Información visual del vino", label: "Información visual" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.1),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={item.img} alt={item.alt} className="relative w-full rounded-xl border border-border shadow-lg" />
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Mobile screenshots */}
          <ScrollReveal>
            <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide uppercase">También en móvil</p>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { img: mobileListImg, alt: "Carta de vinos en móvil", label: "Carta" },
                { img: mobileDetailImg, alt: "Detalle de vino en móvil", label: "Ficha del vino" },
                { img: mobileComparatorImg, alt: "Comparador en móvil", label: "Comparador" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-3 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.12),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-2xl border-2 border-border/60 overflow-hidden shadow-xl bg-background/50 group-hover:border-wine/30 transition-colors">
                    <img src={item.img} alt={item.alt} className="w-full" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.mgmt_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.mgmt_title) }} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.mgmt.map((feat, i) => { const Icon = mgmtIcons[i]; return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4 group-hover:bg-wine/20 transition-all duration-300"><Icon size={20} className="text-wine" /></div>
                  <h3 className="font-heading font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            ); })}
          </div>
        </div>
      </section>

      <section className="section-padding" id="changelog">
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

      <section className="section-padding bg-gradient-dark" id="roadmap">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.roadmap_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.roadmap_title) }} />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{c.roadmap_sub}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {c.roadmap.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-7 h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5 mb-5">
                    <Rocket size={12} className="text-wine" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{q.quarter}</span>
                  </div>
                  <ul className="space-y-3">
                    {q.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle size={16} className="text-wine/50 shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
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

      <InternalLinks links={[
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios" : "Pricing", type: "resource" },
        { to: localePath("/integraciones"), label: lang === "es" ? "Integraciones" : "Integrations", type: "tool" },
        { to: localePath("/clientes"), label: lang === "es" ? "Clientes" : "Clients", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default Funcionalidades;
