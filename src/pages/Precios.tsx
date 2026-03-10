import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Check, Zap, Crown, Building2,
  BarChart3, TrendingUp, RotateCcw, Sparkles,
  Brain, GitCompare, DollarSign, Warehouse
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seo_title: string; seo_desc: string;
  breadcrumb: string; badge: string; title: string; subtitle: string;
  cta1: string; cta2: string;
  model_text: string; model_bold1: string; model_bold2: string;
  plans: { subtitle: string; badge?: string; features: string[]; cta: string }[];
  capabilities: string[];
  included_badge: string; included_title: string;
  impact_badge: string; impact_title: string;
  metrics: { value: string; label: string }[];
  cta_badge: string; cta_title: string; cta_sub: string; cta_btn: string;
  faqs: { q: string; a: string }[];
}> = {
  es: {
    seo_title: "Planes y Precios de Winerim | Carta de Vinos Digital para Restaurantes",
    seo_desc: "Descubre los planes de Winerim: Starter, Pro y Enterprise. Digitaliza tu carta de vinos, aumenta ventas y optimiza márgenes.",
    breadcrumb: "Precios", badge: "Planes y precios",
    title: "Planes de <em>Winerim</em>",
    subtitle: "Convierte tu carta de vinos en una herramienta que aumenta tus ventas.",
    cta1: "Solicitar demo", cta2: "Analizar mi carta",
    model_text: "Winerim adapta sus planes al", model_bold1: "tamaño del restaurante", model_bold2: "número de referencias de vino",
    plans: [
      { subtitle: "Ideal para restaurantes pequeños", features: ["Carta digital de vinos", "Filtros interactivos", "Fichas de vino completas", "Información visual por referencia", "Maridajes básicos", "Soporte por email"], cta: "Empezar" },
      { subtitle: "Para restaurantes con carta amplia", badge: "Más popular", features: ["Todo lo del plan Starter", "Analítica de ventas de vino", "Optimización de carta con IA", "Wine Mapping interactivo", "Recomendaciones inteligentes", "Venta por copa optimizada", "Comparador de vinos", "Soporte prioritario"], cta: "Solicitar demo" },
      { subtitle: "Grupos de restauración y grandes proyectos", features: ["Todo lo del plan Pro", "Multi-local centralizado", "Integraciones POS y PMS", "Analítica avanzada y reporting", "API personalizada", "Onboarding dedicado", "Account manager asignado", "SLA garantizado"], cta: "Contactar" },
    ],
    capabilities: ["Carta digital interactiva", "Maridajes inteligentes", "Comparador de vinos", "Analítica de ventas", "Optimización de precios", "Gestión de bodega"],
    included_badge: "Todo incluido", included_title: "Qué incluye <em>Winerim</em>",
    impact_badge: "Impacto real", impact_title: "Resultados que obtienen nuestros <em>clientes</em>",
    metrics: [{ value: "Más ventas", label: "Clientes que exploran más referencias" }, { value: "Mejor margen", label: "Control de precios y escalado de gama" }, { value: "Menos tiempo", label: "Gestión automatizada de la carta" }],
    cta_badge: "Da el paso", cta_title: "Descubre cuánto más podrías vender con tu <em>carta de vinos</em>", cta_sub: "Te mostramos el potencial de mejora de tu carta con una demo personalizada. Sin compromiso.", cta_btn: "Solicitar demo",
    faqs: [
      { q: "¿Cuánto tarda la implementación?", a: "La mayoría de restaurantes están operativos en menos de 48 horas." },
      { q: "¿Necesito cambiar mi POS?", a: "No. Winerim es compatible con cualquier sistema de punto de venta." },
      { q: "¿Es compatible con cualquier carta de vinos?", a: "Sí. Da igual si tienes 15 referencias o 500." },
      { q: "¿Los clientes necesitan descargar una app?", a: "No. La carta digital es accesible desde el navegador del móvil." },
      { q: "¿Puedo probar Winerim antes de decidir?", a: "Sí. Ofrecemos un análisis gratuito de tu carta de vinos." },
      { q: "¿Qué pasa si quiero cancelar?", a: "Sin permanencia. Puedes cancelar cuando quieras." },
    ],
  },
  en: {
    seo_title: "Winerim Plans & Pricing | Digital Wine List for Restaurants",
    seo_desc: "Discover Winerim plans: Starter, Pro and Enterprise. Digitize your wine list, increase sales and optimize margins.",
    breadcrumb: "Pricing", badge: "Plans and pricing",
    title: "<em>Winerim</em> Plans",
    subtitle: "Turn your wine list into a tool that drives sales.",
    cta1: "Request demo", cta2: "Analyze my list",
    model_text: "Winerim adapts its plans to the", model_bold1: "size of the restaurant", model_bold2: "number of wine references",
    plans: [
      { subtitle: "Ideal for small restaurants", features: ["Digital wine list", "Interactive filters", "Complete wine profiles", "Visual info per reference", "Basic pairings", "Email support"], cta: "Get started" },
      { subtitle: "For restaurants with extensive lists", badge: "Most popular", features: ["Everything in Starter", "Wine sales analytics", "AI-powered list optimization", "Interactive Wine Mapping", "Smart recommendations", "Optimized by-the-glass sales", "Wine comparator", "Priority support"], cta: "Request demo" },
      { subtitle: "Restaurant groups and large projects", features: ["Everything in Pro", "Centralized multi-location", "POS and PMS integrations", "Advanced analytics & reporting", "Custom API", "Dedicated onboarding", "Assigned account manager", "Guaranteed SLA"], cta: "Contact us" },
    ],
    capabilities: ["Interactive digital list", "Smart pairings", "Wine comparator", "Sales analytics", "Price optimization", "Cellar management"],
    included_badge: "All included", included_title: "What <em>Winerim</em> includes",
    impact_badge: "Real impact", impact_title: "Results our <em>clients</em> achieve",
    metrics: [{ value: "More sales", label: "Customers exploring more references" }, { value: "Better margins", label: "Price control and range optimization" }, { value: "Less time", label: "Automated wine list management" }],
    cta_badge: "Take the step", cta_title: "Discover how much more you could sell with your <em>wine list</em>", cta_sub: "We show you the improvement potential of your wine list with a personalized demo. No commitment.", cta_btn: "Request demo",
    faqs: [
      { q: "How long does implementation take?", a: "Most restaurants are up and running in under 48 hours." },
      { q: "Do I need to change my POS?", a: "No. Winerim is compatible with any point of sale system." },
      { q: "Is it compatible with any wine list?", a: "Yes. Whether you have 15 or 500 references." },
      { q: "Do customers need to download an app?", a: "No. The digital list is accessible from the mobile browser." },
      { q: "Can I try Winerim before deciding?", a: "Yes. We offer a free wine list analysis." },
      { q: "What if I want to cancel?", a: "No lock-in. Cancel anytime." },
    ],
  },
  it: {
    seo_title: "Piani e Prezzi di Winerim | Carta dei Vini Digitale per Ristoranti",
    seo_desc: "Scopri i piani di Winerim: Starter, Pro e Enterprise. Digitalizza la tua carta dei vini, aumenta le vendite e ottimizza i margini.",
    breadcrumb: "Prezzi", badge: "Piani e prezzi",
    title: "Piani di <em>Winerim</em>",
    subtitle: "Trasforma la tua carta dei vini in uno strumento che aumenta le vendite.",
    cta1: "Richiedi demo", cta2: "Analizza la mia carta",
    model_text: "Winerim adatta i suoi piani alla", model_bold1: "dimensione del ristorante", model_bold2: "numero di referenze di vino",
    plans: [
      { subtitle: "Ideale per piccoli ristoranti", features: ["Carta dei vini digitale", "Filtri interattivi", "Schede vino complete", "Info visiva per referenza", "Abbinamenti base", "Supporto email"], cta: "Inizia" },
      { subtitle: "Per ristoranti con carta ampia", badge: "Più popolare", features: ["Tutto dello Starter", "Analisi vendite vino", "Ottimizzazione carta con IA", "Wine Mapping interattivo", "Raccomandazioni intelligenti", "Vendita al calice ottimizzata", "Comparatore vini", "Supporto prioritario"], cta: "Richiedi demo" },
      { subtitle: "Gruppi di ristorazione e grandi progetti", features: ["Tutto del Pro", "Multi-locale centralizzato", "Integrazioni POS e PMS", "Analytics avanzata e reporting", "API personalizzata", "Onboarding dedicato", "Account manager assegnato", "SLA garantito"], cta: "Contattaci" },
    ],
    capabilities: ["Carta digitale interattiva", "Abbinamenti intelligenti", "Comparatore vini", "Analisi vendite", "Ottimizzazione prezzi", "Gestione cantina"],
    included_badge: "Tutto incluso", included_title: "Cosa include <em>Winerim</em>",
    impact_badge: "Impatto reale", impact_title: "Risultati ottenuti dai nostri <em>clienti</em>",
    metrics: [{ value: "Più vendite", label: "Clienti che esplorano più referenze" }, { value: "Margine migliore", label: "Controllo prezzi e ottimizzazione" }, { value: "Meno tempo", label: "Gestione automatizzata della carta" }],
    cta_badge: "Fai il passo", cta_title: "Scopri quanto di più potresti vendere con la tua <em>carta dei vini</em>", cta_sub: "Ti mostriamo il potenziale di miglioramento con una demo personalizzata. Senza impegno.", cta_btn: "Richiedi demo",
    faqs: [
      { q: "Quanto tempo richiede l'implementazione?", a: "La maggior parte dei ristoranti è operativa in meno di 48 ore." },
      { q: "Devo cambiare il mio POS?", a: "No. Winerim è compatibile con qualsiasi sistema di punto vendita." },
      { q: "È compatibile con qualsiasi carta dei vini?", a: "Sì. Che tu abbia 15 o 500 referenze." },
      { q: "I clienti devono scaricare un'app?", a: "No. La carta digitale è accessibile dal browser del telefono." },
      { q: "Posso provare Winerim prima di decidere?", a: "Sì. Offriamo un'analisi gratuita della tua carta." },
      { q: "Cosa succede se voglio cancellare?", a: "Nessun vincolo. Cancella quando vuoi." },
    ],
  },
  fr: {
    seo_title: "Plans et Tarifs Winerim | Carte des Vins Digitale pour Restaurants",
    seo_desc: "Découvrez les plans Winerim : Starter, Pro et Enterprise. Digitalisez votre carte des vins, augmentez les ventes et optimisez les marges.",
    breadcrumb: "Tarifs", badge: "Plans et tarifs",
    title: "Plans <em>Winerim</em>",
    subtitle: "Transformez votre carte des vins en un outil qui génère des ventes.",
    cta1: "Demander démo", cta2: "Analyser ma carte",
    model_text: "Winerim adapte ses plans à la", model_bold1: "taille du restaurant", model_bold2: "nombre de références de vin",
    plans: [
      { subtitle: "Idéal pour les petits restaurants", features: ["Carte des vins digitale", "Filtres interactifs", "Fiches vin complètes", "Info visuelle par référence", "Accords basiques", "Support email"], cta: "Commencer" },
      { subtitle: "Pour restaurants avec carte étendue", badge: "Le plus populaire", features: ["Tout du Starter", "Analytique ventes de vin", "Optimisation carte avec IA", "Wine Mapping interactif", "Recommandations intelligentes", "Vente au verre optimisée", "Comparateur de vins", "Support prioritaire"], cta: "Demander démo" },
      { subtitle: "Groupes de restauration et grands projets", features: ["Tout du Pro", "Multi-établissement centralisé", "Intégrations POS et PMS", "Analytique avancée et reporting", "API personnalisée", "Onboarding dédié", "Account manager assigné", "SLA garanti"], cta: "Nous contacter" },
    ],
    capabilities: ["Carte digitale interactive", "Accords intelligents", "Comparateur de vins", "Analytique des ventes", "Optimisation des prix", "Gestion de cave"],
    included_badge: "Tout inclus", included_title: "Ce que <em>Winerim</em> inclut",
    impact_badge: "Impact réel", impact_title: "Résultats obtenus par nos <em>clients</em>",
    metrics: [{ value: "Plus de ventes", label: "Clients explorant plus de références" }, { value: "Meilleure marge", label: "Contrôle des prix et optimisation" }, { value: "Moins de temps", label: "Gestion automatisée de la carte" }],
    cta_badge: "Faites le pas", cta_title: "Découvrez combien vous pourriez vendre de plus avec votre <em>carte des vins</em>", cta_sub: "Nous vous montrons le potentiel d'amélioration avec une démo personnalisée. Sans engagement.", cta_btn: "Demander démo",
    faqs: [
      { q: "Combien de temps prend l'implémentation ?", a: "La plupart des restaurants sont opérationnels en moins de 48 heures." },
      { q: "Dois-je changer mon POS ?", a: "Non. Winerim est compatible avec n'importe quel système de caisse." },
      { q: "Est-il compatible avec n'importe quelle carte ?", a: "Oui. Que vous ayez 15 ou 500 références." },
      { q: "Les clients doivent-ils télécharger une app ?", a: "Non. La carte digitale est accessible depuis le navigateur mobile." },
      { q: "Puis-je essayer avant de décider ?", a: "Oui. Nous offrons une analyse gratuite de votre carte." },
      { q: "Que se passe-t-il si je veux annuler ?", a: "Sans engagement. Annulez quand vous voulez." },
    ],
  },
};

const planIcons = [Zap, Crown, Building2];
const planNames = ["Starter", "Pro", "Enterprise"];
const capIcons = [Wine, Brain, GitCompare, BarChart3, DollarSign, Warehouse];
const metricIcons = [TrendingUp, BarChart3, RotateCcw];

const emToGradient = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

const Precios = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = content[lang] || content.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "precios-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: c.seo_title, description: c.seo_desc });
    document.head.appendChild(ld);
    return () => { document.getElementById("precios-jsonld")?.remove(); };
  }, [c]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/precios" hreflang={allLangPaths("/precios")} />
      <Navbar />

      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: emToGradient(c.title) }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">{c.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {c.cta1} <ArrowRight size={16} />
            </Link>
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">{c.cta2}</Link>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                {c.model_text} <span className="text-foreground font-medium">{c.model_bold1}</span> y al <span className="text-foreground font-medium">{c.model_bold2}</span>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {c.plans.map((plan, i) => {
              const Icon = planIcons[i];
              const highlight = i === 1;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`relative rounded-2xl border p-7 md:p-8 h-full flex flex-col ${highlight ? "border-wine bg-wine/[0.03] shadow-lg shadow-wine/5" : "border-border bg-gradient-card"}`}>
                    {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-4 py-1 rounded-full bg-gradient-wine text-primary-foreground text-xs font-semibold tracking-wider uppercase">{plan.badge}</span></div>}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? "bg-wine/15" : "bg-wine/10"}`}><Icon size={20} className="text-wine" /></div>
                      <h3 className="font-heading text-xl font-bold">{planNames[i]}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm"><Check size={14} className="text-wine shrink-0 mt-0.5" /><span className="text-muted-foreground">{f}</span></li>
                      ))}
                    </ul>
                    <Link to={i === 2 ? localePath("/contacto") : localePath("/demo")} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${highlight ? "bg-gradient-wine text-primary-foreground hover:opacity-90" : "border border-border hover:border-wine/50 hover:bg-wine/5"}`}>
                      {plan.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.included_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.included_title) }} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.capabilities.map((cap, i) => {
              const Icon = capIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-wine/10 flex items-center justify-center shrink-0"><Icon size={22} className="text-wine" /></div>
                    <span className="font-medium text-sm">{cap}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.impact_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.impact_title) }} />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {c.metrics.map((m, i) => {
              const Icon = metricIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-4"><Icon size={24} className="text-wine" /></div>
                    <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection faqs={c.faqs} schemaId="precios" />

      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{c.cta_badge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: emToGradient(c.cta_title) }} />
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{c.cta_sub}</p>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {c.cta_btn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: content[lang]?.capabilities[0] || "Software carta de vinos", type: "solution" },
        { to: "/analisis-carta", label: c.cta2, type: "tool" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "resource" },
        { to: localePath("/demo"), label: c.cta1, type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default Precios;
