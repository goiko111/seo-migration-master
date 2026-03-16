// Business profile segmentation — helps each visitor type self-identify
import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, Star, Building2, Hotel, UserX, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

interface Profile {
  icon: typeof Star;
  title: string;
  pain: string;
  benefit: string;
  cta: string;
  url: string;
}

const profilesByLang: Record<string, { badge: string; title: string; titleHighlight: string; profiles: Profile[] }> = {
  es: {
    badge: "¿En qué tipo de negocio estás?",
    title: "Winerim se adapta a ",
    titleHighlight: "tu realidad",
    profiles: [
      {
        icon: UtensilsCrossed,
        title: "Restaurante independiente",
        pain: "La carta de vinos no vende y no tienes tiempo para gestionarla.",
        benefit: "Carta digital que vende sola, con datos de rotación y margen por referencia.",
        cta: "Ver cómo funciona",
        url: "/demo",
      },
      {
        icon: Star,
        title: "Restaurante gastronómico",
        pain: "Tu carta tiene que estar a la altura de tu propuesta gastronómica.",
        benefit: "Fichas premium, maridajes automáticos y experiencia enológica memorable.",
        cta: "Solución gastronómica",
        url: "/soluciones/restaurantes-gastronomicos",
      },
      {
        icon: Building2,
        title: "Grupo de restauración",
        pain: "Gestionar cartas en múltiples locales sin control centralizado.",
        benefit: "Gobierno de surtido, benchmarking entre locales y despliegue escalonado.",
        cta: "Solución para grupos",
        url: "/soluciones/grupos-restauracion",
      },
      {
        icon: Hotel,
        title: "Hotel / Resort",
        pain: "F&B de vinos sin consistencia entre puntos de venta.",
        benefit: "Estandarización multi-punto con integración PMS y personalización por outlet.",
        cta: "Solución para hoteles",
        url: "/soluciones/hoteles",
      },
      {
        icon: UserX,
        title: "Sin sumiller",
        pain: "Tu equipo no sabe recomendar vinos y pierde ventas cada servicio.",
        benefit: "El equipo recomienda con confianza desde el primer día, guiado paso a paso.",
        cta: "Vender sin sumiller",
        url: "/soluciones/restaurantes-sin-sumiller",
      },
      {
        icon: BarChart3,
        title: "Perfil analítico / Dirección",
        pain: "No tienes datos para tomar decisiones de compra, pricing o surtido.",
        benefit: "KPIs en tiempo real, detección de stock muerto y análisis de rentabilidad.",
        cta: "Ver analítica",
        url: "/funcionalidades",
      },
    ],
  },
  en: {
    badge: "What type of business are you?",
    title: "Winerim adapts to ",
    titleHighlight: "your reality",
    profiles: [
      {
        icon: UtensilsCrossed,
        title: "Independent restaurant",
        pain: "Your wine list doesn't sell and you have no time to manage it.",
        benefit: "Digital list that sells on its own, with rotation and margin data per reference.",
        cta: "See how it works",
        url: "/demo",
      },
      {
        icon: Star,
        title: "Fine dining restaurant",
        pain: "Your wine list must match your gastronomic proposal.",
        benefit: "Premium wine sheets, auto pairings, and a memorable wine experience.",
        cta: "Fine dining solution",
        url: "/soluciones/restaurantes-gastronomicos",
      },
      {
        icon: Building2,
        title: "Restaurant group",
        pain: "Managing wine lists across multiple venues without central control.",
        benefit: "Assortment governance, cross-venue benchmarking, and staged rollout.",
        cta: "Group solution",
        url: "/soluciones/grupos-restauracion",
      },
      {
        icon: Hotel,
        title: "Hotel / Resort",
        pain: "Wine F&B lacks consistency across outlets.",
        benefit: "Multi-outlet standardization with PMS integration and per-venue customization.",
        cta: "Hotel solution",
        url: "/soluciones/hoteles",
      },
      {
        icon: UserX,
        title: "No sommelier",
        pain: "Your staff can't recommend wines and loses sales every service.",
        benefit: "Staff recommend with confidence from day one, guided step by step.",
        cta: "Sell without sommelier",
        url: "/soluciones/restaurantes-sin-sumiller",
      },
      {
        icon: BarChart3,
        title: "Analytical / Management",
        pain: "No data for purchasing, pricing, or assortment decisions.",
        benefit: "Real-time KPIs, dead stock detection, and profitability analysis.",
        cta: "See analytics",
        url: "/funcionalidades",
      },
    ],
  },
  it: {
    badge: "Che tipo di attività hai?",
    title: "Winerim si adatta alla ",
    titleHighlight: "tua realtà",
    profiles: [
      {
        icon: UtensilsCrossed,
        title: "Ristorante indipendente",
        pain: "La carta dei vini non vende e non hai tempo per gestirla.",
        benefit: "Carta digitale che vende da sola, con dati di rotazione e margine per referenza.",
        cta: "Scopri come funziona",
        url: "/demo",
      },
      {
        icon: Star,
        title: "Ristorante gastronomico",
        pain: "La tua carta deve essere all'altezza della proposta gastronomica.",
        benefit: "Schede premium, abbinamenti automatici e esperienza enologica memorabile.",
        cta: "Soluzione gastronomica",
        url: "/soluciones/restaurantes-gastronomicos",
      },
      {
        icon: Building2,
        title: "Gruppo di ristorazione",
        pain: "Gestire carte in più locali senza controllo centralizzato.",
        benefit: "Governo dell'assortimento, benchmarking tra locali e deployment graduale.",
        cta: "Soluzione per gruppi",
        url: "/soluciones/grupos-restauracion",
      },
      {
        icon: Hotel,
        title: "Hotel / Resort",
        pain: "F&B vini senza coerenza tra punti vendita.",
        benefit: "Standardizzazione multi-punto con integrazione PMS e personalizzazione per outlet.",
        cta: "Soluzione per hotel",
        url: "/soluciones/hoteles",
      },
      {
        icon: UserX,
        title: "Senza sommelier",
        pain: "Il tuo team non sa consigliare vini e perde vendite a ogni servizio.",
        benefit: "Il personale consiglia con sicurezza dal primo giorno, guidato passo dopo passo.",
        cta: "Vendere senza sommelier",
        url: "/soluciones/restaurantes-sin-sumiller",
      },
      {
        icon: BarChart3,
        title: "Profilo analitico / Direzione",
        pain: "Non hai dati per decisioni d'acquisto, pricing o assortimento.",
        benefit: "KPI in tempo reale, rilevamento stock morto e analisi della redditività.",
        cta: "Vedi analytics",
        url: "/funcionalidades",
      },
    ],
  },
  fr: {
    badge: "Quel type d'établissement avez-vous ?",
    title: "Winerim s'adapte à ",
    titleHighlight: "votre réalité",
    profiles: [
      {
        icon: UtensilsCrossed,
        title: "Restaurant indépendant",
        pain: "Votre carte des vins ne vend pas et vous n'avez pas le temps de la gérer.",
        benefit: "Carte digitale qui vend seule, avec données de rotation et marge par référence.",
        cta: "Voir comment ça marche",
        url: "/demo",
      },
      {
        icon: Star,
        title: "Restaurant gastronomique",
        pain: "Votre carte doit être à la hauteur de votre proposition culinaire.",
        benefit: "Fiches premium, accords automatiques et expérience œnologique mémorable.",
        cta: "Solution gastronomique",
        url: "/soluciones/restaurantes-gastronomicos",
      },
      {
        icon: Building2,
        title: "Groupe de restauration",
        pain: "Gérer des cartes dans plusieurs établissements sans contrôle centralisé.",
        benefit: "Gouvernance d'assortiment, benchmarking inter-sites et déploiement progressif.",
        cta: "Solution groupes",
        url: "/soluciones/grupos-restauracion",
      },
      {
        icon: Hotel,
        title: "Hôtel / Resort",
        pain: "F&B vins sans cohérence entre points de vente.",
        benefit: "Standardisation multi-points avec intégration PMS et personnalisation par outlet.",
        cta: "Solution hôtels",
        url: "/soluciones/hoteles",
      },
      {
        icon: UserX,
        title: "Sans sommelier",
        pain: "Votre équipe ne sait pas recommander et perd des ventes à chaque service.",
        benefit: "L'équipe recommande avec confiance dès le premier jour, guidée pas à pas.",
        cta: "Vendre sans sommelier",
        url: "/soluciones/restaurantes-sin-sumiller",
      },
      {
        icon: BarChart3,
        title: "Profil analytique / Direction",
        pain: "Aucune donnée pour les décisions d'achat, tarification ou assortiment.",
        benefit: "KPIs en temps réel, détection stock mort et analyse de rentabilité.",
        cta: "Voir l'analytique",
        url: "/funcionalidades",
      },
    ],
  },
};

const BusinessProfilesSection = () => {
  const { lang, localePath } = useLanguage();
  const d = profilesByLang[lang] || profilesByLang.es;

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{d.badge}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {d.title}<span className="text-gradient-wine italic">{d.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {d.profiles.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group relative bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-base font-bold leading-tight">{profile.title}</h3>
                  </div>

                  {/* Pain */}
                  <p className="text-xs text-muted-foreground/70 leading-relaxed mb-2 italic">
                    "{profile.pain}"
                  </p>

                  {/* Benefit */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                    {profile.benefit}
                  </p>

                  {/* CTA link */}
                  <Link
                    to={localePath(profile.url)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-wine hover:text-wine-light transition-colors group/link"
                  >
                    {profile.cta}
                    <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessProfilesSection;
