import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Restaurant {
  id: string;
  name: string;
  logo_url: string | null;
  city: string | null;
  category: string | null;
  featured: boolean;
}

const featuredTestimonials = [
  { name: "Miramar", location: "Llançà, Girona", type: "Alta Gastronomía", quote: { es: "Winerim nos ha permitido digitalizar nuestra bodega de más de 600 referencias.", en: "Winerim has allowed us to digitize our cellar of over 600 references.", it: "Winerim ci ha permesso di digitalizzare la nostra cantina di oltre 600 referenze.", fr: "Winerim nous a permis de digitaliser notre cave de plus de 600 références." } },
  { name: "Zortziko", location: "Bilbao", type: "Restaurante Gastronómico", quote: { es: "La gestión de nuestra carta de vinos nunca había sido tan ágil.", en: "Managing our wine list has never been so agile.", it: "La gestione della nostra carta dei vini non è mai stata così agile.", fr: "La gestion de notre carte n'a jamais été aussi agile." } },
  { name: "Cañabota", location: "Sevilla", type: "Gastrobar", quote: { es: "Nuestros clientes interactúan con el vino de una forma completamente nueva.", en: "Our customers interact with wine in a completely new way.", it: "I nostri clienti interagiscono con il vino in modo completamente nuovo.", fr: "Nos clients interagissent avec le vin d'une manière totalement nouvelle." } },
  { name: "Roig Robí", location: "Barcelona", type: "Cocina Catalana", quote: { es: "La IA de Winerim recomienda vinos que realmente encajan con cada plato.", en: "Winerim's AI recommends wines that truly match each dish.", it: "L'IA di Winerim consiglia vini che si abbinano davvero a ogni piatto.", fr: "L'IA de Winerim recommande des vins qui correspondent vraiment à chaque plat." } },
];

// Keep as fallback when DB is empty
const fallbackClients = [
  "Miramar", "Zortziko", "Tres", "Santé", "Sacla", "La Parra",
  "Ment", "La Carbonería", "Cocina del Sol", "Cañabota", "Alejandra",
  "Bidea", "Tribeca", "Taverna", "Serrano", "Roig Robí",
  "Ríos do Freixo", "Remigio", "La Fábrica", "Jauregibarria",
  "El Motel", "Dámaso", "Casamar", "Bocaatti", "Alameda",
];

const i18n: Record<string, {
  seo_title: string; seo_desc: string; breadcrumb: string; badge: string; title: string; subtitle: string;
  stats: { value: string; label: string }[];
  featured_badge: string; featured_title: string;
  all_title: string; all_sub: string;
  cta_badge: string; cta_title: string; cta_sub: string; cta_btn: string;
}> = {
  es: {
    seo_title: "Clientes de Winerim | Restaurantes que confían en nosotros", seo_desc: "Más de 1.000 restaurantes confían en Winerim para gestionar su carta de vinos.", breadcrumb: "Clientes", badge: "Nuestros clientes", title: "Los mejores restaurantes ya usan <em>Winerim</em>", subtitle: "Más de 1.000 establecimientos confían en nuestra tecnología para transformar su carta de vinos.",
    stats: [{ value: "1.000+", label: "Bodegas gestionadas" }, { value: "45.000+", label: "Referencias de vino" }, { value: "30%", label: "Incremento medio en ventas" }, { value: "12", label: "Países" }],
    featured_badge: "Destacados", featured_title: "Lo que dicen nuestros <em>clientes</em>",
    all_title: "Todos nuestros <em>clientes</em>", all_sub: "Restaurantes de toda España, Portugal, Italia y más confían en Winerim.",
    cta_badge: "Únete", cta_title: "¿Listo para ser el <em>siguiente?</em>", cta_sub: "Prueba Winerim gratis y descubre por qué más de 1.000 restaurantes ya confían en nosotros.", cta_btn: "Solicitar demo",
  },
  en: {
    seo_title: "Winerim Clients | Restaurants that trust us", seo_desc: "Over 1,000 restaurants trust Winerim to manage their wine list.", breadcrumb: "Clients", badge: "Our clients", title: "The best restaurants already use <em>Winerim</em>", subtitle: "Over 1,000 establishments trust our technology to transform their wine list.",
    stats: [{ value: "1,000+", label: "Cellars managed" }, { value: "45,000+", label: "Wine references" }, { value: "30%", label: "Average sales increase" }, { value: "12", label: "Countries" }],
    featured_badge: "Featured", featured_title: "What our <em>clients</em> say",
    all_title: "All our <em>clients</em>", all_sub: "Restaurants across Spain, Portugal, Italy and more trust Winerim.",
    cta_badge: "Join us", cta_title: "Ready to be <em>next?</em>", cta_sub: "Try Winerim free and discover why over 1,000 restaurants already trust us.", cta_btn: "Request demo",
  },
  it: {
    seo_title: "Clienti Winerim | Ristoranti che si fidano di noi", seo_desc: "Oltre 1.000 ristoranti si fidano di Winerim.", breadcrumb: "Clienti", badge: "I nostri clienti", title: "I migliori ristoranti usano già <em>Winerim</em>", subtitle: "Oltre 1.000 ristoranti si fidano della nostra tecnologia.",
    stats: [{ value: "1.000+", label: "Cantine gestite" }, { value: "45.000+", label: "Referenze di vino" }, { value: "30%", label: "Incremento medio vendite" }, { value: "12", label: "Paesi" }],
    featured_badge: "In evidenza", featured_title: "Cosa dicono i nostri <em>clienti</em>",
    all_title: "Tutti i nostri <em>clienti</em>", all_sub: "Ristoranti in Spagna, Portogallo, Italia e oltre si fidano di Winerim.",
    cta_badge: "Unisciti", cta_title: "Pronto ad essere il <em>prossimo?</em>", cta_sub: "Prova Winerim gratis e scopri perché oltre 1.000 ristoranti si fidano di noi.", cta_btn: "Richiedi demo",
  },
  fr: {
    seo_title: "Clients Winerim | Restaurants qui nous font confiance", seo_desc: "Plus de 1 000 restaurants font confiance à Winerim.", breadcrumb: "Clients", badge: "Nos clients", title: "Les meilleurs restaurants utilisent déjà <em>Winerim</em>", subtitle: "Plus de 1 000 établissements font confiance à notre technologie.",
    stats: [{ value: "1 000+", label: "Caves gérées" }, { value: "45 000+", label: "Références de vin" }, { value: "30%", label: "Augmentation moyenne ventes" }, { value: "12", label: "Pays" }],
    featured_badge: "En vedette", featured_title: "Ce que disent nos <em>clients</em>",
    all_title: "Tous nos <em>clients</em>", all_sub: "Restaurants en Espagne, Portugal, Italie et ailleurs font confiance à Winerim.",
    cta_badge: "Rejoignez-nous", cta_title: "Prêt à être le <em>prochain ?</em>", cta_sub: "Essayez Winerim gratuitement et découvrez pourquoi plus de 1 000 restaurants nous font confiance.", cta_btn: "Demander démo",
  },
};

const emToGradient = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

const Clientes = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = i18n[lang] || i18n.es;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    supabase
      .from("restaurants")
      .select("id, name, logo_url, city, category, featured")
      .eq("visible", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setRestaurants(data as Restaurant[]);
      });
  }, []);

  const hasLogos = restaurants.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/clientes" hreflang={allLangPaths("/clientes")} />
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.badge}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl" dangerouslySetInnerHTML={{ __html: emToGradient(c.title) }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{c.subtitle}</motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {c.stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center bg-gradient-card rounded-xl border border-border p-6">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-wine mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.featured_badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: emToGradient(c.featured_title) }} />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredTestimonials.map((client, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-8 h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <span className="font-heading text-xl font-bold text-wine">{client.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.location} · {client.type}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="relative pl-4 border-l-2 border-wine/30">
                      <Quote size={16} className="text-wine/30 absolute -left-2 -top-1" />
                      <p className="text-muted-foreground italic leading-relaxed">{client.quote[lang as keyof typeof client.quote] || client.quote.es}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, s) => (<Star key={s} size={14} className="text-accent fill-accent" />))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: emToGradient(c.all_title) }} />
            <p className="text-muted-foreground max-w-2xl mx-auto">{c.all_sub}</p>
          </ScrollReveal>

          {hasLogos ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {restaurants.map((r, i) => (
                <ScrollReveal key={r.id} delay={Math.min(i * 0.02, 0.6)}>
                  <div className="group bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center gap-2 hover:border-wine/30 transition-all duration-300 aspect-square">
                    {r.logo_url ? (
                      <img
                        src={r.logo_url}
                        alt={r.name}
                        className="w-full h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center">
                        <span className="font-heading text-lg font-bold text-wine">{r.name.charAt(0)}</span>
                      </div>
                    )}
                    <p className="text-[11px] text-muted-foreground text-center font-medium leading-tight mt-1">{r.name}</p>
                    {r.city && <p className="text-[10px] text-muted-foreground/60 text-center">{r.city}</p>}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {fallbackClients.map((name, i) => (
                <ScrollReveal key={i} delay={Math.min(i * 0.02, 0.5)}>
                  <div className="px-5 py-3 rounded-lg border border-border bg-card text-muted-foreground text-sm font-medium tracking-wider whitespace-nowrap hover:border-wine/30 hover:text-foreground transition-all duration-300">{name}</div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

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

      <InternalLinks links={[
        { to: localePath("/funcionalidades"), label: lang === "es" ? "Funcionalidades" : "Features", type: "solution" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "guide" },
        { to: localePath("/precios"), label: lang === "es" ? "Precios" : "Pricing", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default Clientes;
