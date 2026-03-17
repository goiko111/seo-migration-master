import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, RefreshCw, Users, Brain, BarChart3,
  TrendingUp, X, Check, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

interface ComparisonRow {
  category: string;
  icon: typeof RefreshCw;
  paper: string;
  digital: string;
  winerim: string;
}

const i18n: Record<SupportedLang, {
  metaTitle: string;
  metaDescription: string;
  url: string;
  breadcrumb: string;
  badge: string;
  h1pre: string;
  h1accent: string;
  subtitle: string;
  paperLabel: string;
  digitalLabel: string;
  ctaBadge: string;
  ctaH2pre: string;
  ctaH2accent: string;
  ctaDesc: string;
  ctaBtn: string;
  comparisons: ComparisonRow[];
  links: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
}> = {
  es: {
    metaTitle: "Carta de Vinos en Papel vs Carta Digital | Comparativa | Winerim",
    metaDescription: "Comparativa entre carta de vinos en papel y carta digital. Descubre cómo una carta digital mejora la actualización, experiencia del cliente, recomendación, analítica y ventas de vino.",
    url: "https://winerim.wine/carta-papel-vs-digital",
    breadcrumb: "Carta papel vs digital",
    badge: "Comparativa",
    h1pre: "Carta de vinos en papel vs carta",
    h1accent: "digital",
    subtitle: "La carta en papel fue el estándar durante décadas. Hoy, los restaurantes que más vino venden ya han dado el salto. Descubre por qué.",
    paperLabel: "Carta en papel",
    digitalLabel: "Carta digital",
    ctaBadge: "Da el salto",
    ctaH2pre: "Pasa de papel a",
    ctaH2accent: "resultados",
    ctaDesc: "Descubre cómo Winerim transforma la carta de vinos de tu restaurante en una herramienta de venta inteligente.",
    ctaBtn: "Solicitar demo",
    comparisons: [
      { category: "Actualización", icon: RefreshCw, paper: "Reimprimir cada vez que cambia un vino, un precio o una añada. Coste y tiempo perdido.", digital: "Cambios al instante desde cualquier dispositivo. Sin impresión, sin esperas.", winerim: "Edición en tiempo real con control de stock integrado. Cuando un vino se agota, desaparece automáticamente de la carta." },
      { category: "Experiencia del cliente", icon: Users, paper: "Carta estática, sin contexto. El cliente no sabe qué elegir y depende del camarero.", digital: "Notas de cata, maridajes sugeridos y filtros por estilo. El cliente explora con confianza.", winerim: "Fichas enriquecidas con aromas, temperatura de servicio y maridajes adaptados al menú del restaurante." },
      { category: "Recomendación", icon: Brain, paper: "Depende exclusivamente del conocimiento del equipo de sala. Inconsistente entre turnos.", digital: "Sugerencias automáticas basadas en el plato elegido o las preferencias del cliente.", winerim: "Motor de recomendación inteligente que cruza carta de comida, stock disponible y perfil de cliente." },
      { category: "Analítica", icon: BarChart3, paper: "Cero datos. No sabes qué vinos miran, cuáles ignoran ni qué influye en la decisión.", digital: "Métricas de visualización, clics y conversiones por referencia.", winerim: "Dashboard con rotación de bodega, márgenes por vino, tendencias de venta y alertas de stock bajo." },
      { category: "Venta de vino", icon: TrendingUp, paper: "El cliente elige por precio o familiaridad. Ticket medio bajo, bodega infrautilizada.", digital: "Venta guiada que eleva el ticket medio un 15-25 % de media.", winerim: "Estrategias de up-selling integradas: destacados del sommelier, vino por copa y escalera de precios optimizada." },
    ],
    links: [
      { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
      { to: "/wine-list-analyzer", label: "Analizador de carta de vinos", type: "tool" },
      { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
      { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", type: "resource" },
    ],
  },
  en: {
    metaTitle: "Paper Wine List vs Digital Wine List | Comparison | Winerim",
    metaDescription: "Paper vs digital wine list comparison. Discover how a digital wine list improves updates, guest experience, recommendations, analytics and wine sales.",
    url: "https://winerim.wine/en/paper-vs-digital-wine-list",
    breadcrumb: "Paper vs digital wine list",
    badge: "Comparison",
    h1pre: "Paper wine list vs",
    h1accent: "digital",
    subtitle: "Paper lists were the standard for decades. Today, restaurants that sell the most wine have already made the switch. Find out why.",
    paperLabel: "Paper list",
    digitalLabel: "Digital list",
    ctaBadge: "Make the switch",
    ctaH2pre: "From paper to",
    ctaH2accent: "results",
    ctaDesc: "Discover how Winerim transforms your restaurant's wine list into a smart sales tool.",
    ctaBtn: "Request demo",
    comparisons: [
      { category: "Updates", icon: RefreshCw, paper: "Reprint every time a wine, price or vintage changes. Wasted cost and time.", digital: "Instant changes from any device. No printing, no waiting.", winerim: "Real-time editing with integrated stock control. When a wine runs out, it automatically disappears from the list." },
      { category: "Guest experience", icon: Users, paper: "Static list, no context. The guest doesn't know what to choose and depends on the waiter.", digital: "Tasting notes, suggested pairings and style filters. The guest explores with confidence.", winerim: "Rich wine cards with aromas, serving temperature and pairings adapted to the restaurant's menu." },
      { category: "Recommendations", icon: Brain, paper: "Relies entirely on floor staff knowledge. Inconsistent across shifts.", digital: "Automatic suggestions based on the chosen dish or guest preferences.", winerim: "Smart recommendation engine that cross-references the food menu, available stock and guest profile." },
      { category: "Analytics", icon: BarChart3, paper: "Zero data. You don't know which wines guests look at, ignore or what influences their decision.", digital: "View metrics, clicks and conversions per reference.", winerim: "Dashboard with cellar rotation, margins per wine, sales trends and low-stock alerts." },
      { category: "Wine sales", icon: TrendingUp, paper: "Guests choose by price or familiarity. Low average ticket, underused cellar.", digital: "Guided selling that raises the average ticket by 15-25%.", winerim: "Integrated up-selling strategies: sommelier picks, by-the-glass and optimized price ladder." },
    ],
    links: [
      { to: "/en/wine-list-software", label: "Wine list software", type: "solution" },
      { to: "/en/wine-list-analyzer", label: "Wine list analyzer", type: "tool" },
      { to: "/en/how-to-organize-wine-list", label: "How to organize a wine list", type: "guide" },
      { to: "/en/resources/wine-list-template", label: "Wine list template", type: "resource" },
    ],
  },
  it: {
    metaTitle: "Carta dei Vini Cartacea vs Digitale | Confronto | Winerim",
    metaDescription: "Confronto tra carta dei vini cartacea e digitale. Scopri come una carta digitale migliora aggiornamento, esperienza cliente, raccomandazioni, analitica e vendite.",
    url: "https://winerim.wine/it/carta-cartacea-vs-digitale",
    breadcrumb: "Carta cartacea vs digitale",
    badge: "Confronto",
    h1pre: "Carta dei vini cartacea vs",
    h1accent: "digitale",
    subtitle: "La carta cartacea è stata lo standard per decenni. Oggi, i ristoranti che vendono più vino hanno già fatto il salto. Scopri perché.",
    paperLabel: "Carta cartacea",
    digitalLabel: "Carta digitale",
    ctaBadge: "Fai il salto",
    ctaH2pre: "Dalla carta alla",
    ctaH2accent: "performance",
    ctaDesc: "Scopri come Winerim trasforma la carta dei vini del tuo ristorante in uno strumento di vendita intelligente.",
    ctaBtn: "Richiedi demo",
    comparisons: [
      { category: "Aggiornamento", icon: RefreshCw, paper: "Ristampare ogni volta che cambia un vino, un prezzo o un'annata. Costo e tempo perso.", digital: "Modifiche istantanee da qualsiasi dispositivo. Nessuna stampa, nessuna attesa.", winerim: "Modifica in tempo reale con controllo stock integrato. Quando un vino finisce, scompare automaticamente dalla carta." },
      { category: "Esperienza del cliente", icon: Users, paper: "Carta statica, senza contesto. Il cliente non sa cosa scegliere e dipende dal cameriere.", digital: "Note di degustazione, abbinamenti suggeriti e filtri per stile. Il cliente esplora con fiducia.", winerim: "Schede arricchite con aromi, temperatura di servizio e abbinamenti adattati al menu del ristorante." },
      { category: "Raccomandazione", icon: Brain, paper: "Dipende esclusivamente dalla conoscenza del personale di sala. Inconsistente tra i turni.", digital: "Suggerimenti automatici basati sul piatto scelto o sulle preferenze del cliente.", winerim: "Motore di raccomandazione intelligente che incrocia menu, stock disponibile e profilo del cliente." },
      { category: "Analitica", icon: BarChart3, paper: "Zero dati. Non sai quali vini guardano, quali ignorano né cosa influenza la decisione.", digital: "Metriche di visualizzazione, clic e conversioni per referenza.", winerim: "Dashboard con rotazione cantina, margini per vino, tendenze di vendita e avvisi di stock basso." },
      { category: "Vendita di vino", icon: TrendingUp, paper: "Il cliente sceglie per prezzo o familiarità. Scontrino medio basso, cantina sottoutilizzata.", digital: "Vendita guidata che aumenta lo scontrino medio del 15-25%.", winerim: "Strategie di up-selling integrate: selezioni del sommelier, vino al calice e scala di prezzi ottimizzata." },
    ],
    links: [
      { to: "/it/software-carta-vini", label: "Software carta dei vini", type: "solution" },
      { to: "/it/analizzatore-carta-vini", label: "Analizzatore carta dei vini", type: "tool" },
      { to: "/it/come-organizzare-carta-vini", label: "Come organizzare una carta dei vini", type: "guide" },
      { to: "/it/risorse/modello-carta-vini", label: "Modello carta dei vini", type: "resource" },
    ],
  },
  fr: {
    metaTitle: "Carte des Vins Papier vs Digitale | Comparatif | Winerim",
    metaDescription: "Comparatif entre carte des vins papier et carte digitale. Découvrez comment une carte digitale améliore la mise à jour, l'expérience client, les recommandations, l'analytique et les ventes.",
    url: "https://winerim.wine/fr/carte-papier-vs-digitale",
    breadcrumb: "Carte papier vs digitale",
    badge: "Comparatif",
    h1pre: "Carte des vins papier vs",
    h1accent: "digitale",
    subtitle: "La carte papier a été la norme pendant des décennies. Aujourd'hui, les restaurants qui vendent le plus de vin ont déjà franchi le pas. Découvrez pourquoi.",
    paperLabel: "Carte papier",
    digitalLabel: "Carte digitale",
    ctaBadge: "Franchissez le pas",
    ctaH2pre: "Du papier aux",
    ctaH2accent: "résultats",
    ctaDesc: "Découvrez comment Winerim transforme la carte des vins de votre restaurant en un outil de vente intelligent.",
    ctaBtn: "Demander une démo",
    comparisons: [
      { category: "Mise à jour", icon: RefreshCw, paper: "Réimprimer à chaque changement de vin, prix ou millésime. Coût et temps perdu.", digital: "Modifications instantanées depuis n'importe quel appareil. Sans impression, sans attente.", winerim: "Édition en temps réel avec contrôle de stock intégré. Quand un vin est épuisé, il disparaît automatiquement de la carte." },
      { category: "Expérience client", icon: Users, paper: "Carte statique, sans contexte. Le client ne sait pas quoi choisir et dépend du serveur.", digital: "Notes de dégustation, accords suggérés et filtres par style. Le client explore en confiance.", winerim: "Fiches enrichies avec arômes, température de service et accords adaptés au menu du restaurant." },
      { category: "Recommandation", icon: Brain, paper: "Dépend exclusivement des connaissances du personnel de salle. Inconsistant entre les services.", digital: "Suggestions automatiques basées sur le plat choisi ou les préférences du client.", winerim: "Moteur de recommandation intelligent qui croise la carte des plats, le stock disponible et le profil client." },
      { category: "Analytique", icon: BarChart3, paper: "Zéro données. Vous ne savez pas quels vins sont consultés, ignorés ni ce qui influence la décision.", digital: "Métriques de consultation, clics et conversions par référence.", winerim: "Tableau de bord avec rotation de cave, marges par vin, tendances de vente et alertes de stock bas." },
      { category: "Vente de vin", icon: TrendingUp, paper: "Le client choisit par prix ou habitude. Ticket moyen bas, cave sous-exploitée.", digital: "Vente guidée qui augmente le ticket moyen de 15-25%.", winerim: "Stratégies d'up-selling intégrées : coups de cœur du sommelier, vin au verre et échelle de prix optimisée." },
    ],
    links: [
      { to: "/fr/logiciel-carte-des-vins", label: "Logiciel carte des vins", type: "solution" },
      { to: "/fr/analyseur-carte-des-vins", label: "Analyseur de carte des vins", type: "tool" },
      { to: "/fr/comment-organiser-carte-des-vins", label: "Comment organiser une carte des vins", type: "guide" },
      { to: "/fr/ressources/modele-carte-des-vins", label: "Modèle de carte des vins", type: "resource" },
    ],
  },
};

const CartaPapelVsDigital = () => {
  const { lang } = useLanguage();
  const t = i18n[lang];

  useEffect(() => {
    const jsonLd = document.createElement("script");
    jsonLd.id = "papel-vs-digital-jsonld";
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.metaTitle,
      description: t.metaDescription,
      author: { "@type": "Organization", name: "Winerim" },
    });
    document.head.appendChild(jsonLd);
    return () => { document.getElementById("papel-vs-digital-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.url} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: t.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1pre}{" "}<span className="text-gradient-wine italic">{t.h1accent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* COMPARISON TABLE – desktop */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto hidden lg:block">
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              <div className="bg-background p-6" />
              <div className="bg-background p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <X size={16} className="text-destructive" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider">{t.paperLabel}</h3>
                </div>
              </div>
              <div className="bg-background p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Check size={16} className="text-emerald-500" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider">{t.digitalLabel}</h3>
                </div>
              </div>
              <div className="bg-wine/5 p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap size={16} className="text-wine" />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-wine">Winerim</h3>
                </div>
              </div>

              {t.comparisons.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="contents">
                    <div className="bg-background p-6 flex items-start gap-3 border-t border-border">
                      <Icon size={18} className="text-wine shrink-0 mt-0.5" />
                      <span className="font-heading font-semibold text-sm">{row.category}</span>
                    </div>
                    <div className="bg-background p-6 text-sm text-muted-foreground border-t border-border">{row.paper}</div>
                    <div className="bg-background p-6 text-sm text-muted-foreground border-t border-border">{row.digital}</div>
                    <div className="bg-wine/5 p-6 text-sm font-medium border-t border-border">{row.winerim}</div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* COMPARISON CARDS – mobile */}
        <div className="max-w-2xl mx-auto lg:hidden space-y-8">
          {t.comparisons.map((row, i) => {
            const Icon = row.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className="text-wine" />
                    <h3 className="font-heading font-semibold">{row.category}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-destructive shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-muted-foreground">{t.paperLabel}:</span> {row.paper}</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-muted-foreground">{t.digitalLabel}:</span> {row.digital}</div>
                    </div>
                    <div className="flex items-start gap-2 bg-wine/5 -mx-2 px-2 py-2 rounded-lg">
                      <Zap size={14} className="text-wine shrink-0 mt-0.5" />
                      <div><span className="font-semibold text-wine">Winerim:</span> {row.winerim}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
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
                {t.ctaH2pre} <span className="text-gradient-wine italic">{t.ctaH2accent}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                {t.ctaBtn}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default CartaPapelVsDigital;
