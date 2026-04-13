import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Globe, TrendingUp, Users, Shield, Briefcase, Target, Rocket, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";

const WA_NUMBER = "34658718350";
const WA_MSG = encodeURIComponent("Hola, me interesa ser distribuidor de Winerim. ¿Podemos hablar?");

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 size={18} className="text-wine shrink-0 mt-0.5" />
    <span className="text-sm text-muted-foreground leading-relaxed">{children}</span>
  </li>
);

const Distribuidor = () => {
  const { localePath } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sé Distribuidor Exclusivo de Winerim"
        description="Únete como distribuidor exclusivo de Winerim en tu territorio. Márgenes del 25-30%, soporte técnico, marketing co-branded y potencial de escalado real."
        url={`${CANONICAL_DOMAIN}/distribuidor`}
      />
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Globe size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Distribuidores 2025</span>
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                Sé Distribuidor Exclusivo de{" "}
                <span className="text-gradient-wine italic">Winerim</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
                El software de carta inteligente que están adoptando los mejores restaurantes del mundo.
                Llévalo a tu mercado con exclusividad territorial.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="mailto:info@winerim.com?subject=Distribuidor%20Winerim"
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  <Mail size={16} /> info@winerim.com
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── LA OPORTUNIDAD ─────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🌍 La oportunidad
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                Un mercado global de 15M+ restaurantes.{" "}
                <span className="text-gradient-wine italic">La mayoría sin digitalizar.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  El 90% de los restaurantes gestionan su carta de vinos con Excel, papel o intuición.
                  No tienen datos de rotación, no conocen su margen real por referencia y pierden dinero cada mes con stock muerto.
                </p>
                <p>
                  <strong className="text-foreground">Winerim resuelve esto.</strong> Una plataforma que conecta carta, stock, pricing,
                  ventas y compras inteligentes en un solo ecosistema con IA. Ya opera en 15 países y 4 idiomas.
                </p>
                <p>
                  Como distribuidor, tú llevas esta solución a tu mercado con <strong className="text-foreground">exclusividad territorial</strong>,
                  márgenes atractivos y soporte técnico centralizado.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── TU MODELO DE NEGOCIO ──────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                💼 Tu modelo de negocio
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                No eres empleado. Eres <span className="text-gradient-wine italic">empresario.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
                <ul className="space-y-4">
                  <Check>Relación B2B: eres distribuidor independiente con tu propia estructura</Check>
                  <Check>Márgenes del <strong className="text-foreground">25-30% por licencia</strong> vendida</Check>
                  <Check>Soporte técnico centralizado — tú vendes, nosotros implementamos</Check>
                  <Check>Marketing co-branded: materiales con tu marca + Winerim</Check>
                  <Check>Posibilidad de crear tu propia red de sub-distribuidores</Check>
                  <Check>Ingresos recurrentes: las licencias son anuales con renovación automática</Check>
                  <Check>Sin límite de facturación — cuanto más vendas, más ganas</Check>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── REQUISITOS ──────────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                📋 Requisitos
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                ¿Qué buscamos en un distribuidor?
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-card rounded-2xl border border-border p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-wine" /> Imprescindible
                  </h3>
                  <ul className="space-y-3">
                    <Check>Red consolidada en hostelería (restaurantes, hoteles, grupos)</Check>
                    <Check>Experiencia en distribución B2B (5+ años)</Check>
                    <Check>Empresa registrada en tu país</Check>
                    <Check>Idioma nativo del mercado objetivo</Check>
                  </ul>
                </div>
                <div className="bg-gradient-card rounded-2xl border border-border p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target size={18} className="text-wine" /> Deseable
                  </h3>
                  <ul className="space-y-3">
                    <Check>Capital inicial de arranque (8.000-25.000€ según país)</Check>
                    <Check>Compromiso con objetivos anuales de captación</Check>
                    <Check>Conocimiento del sector HORECA y sus dinámicas</Check>
                    <Check>Capacidad de construir equipo comercial propio</Check>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── POTENCIAL ECONÓMICO ─────────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                📈 Potencial económico
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Los números hablan solos.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Estimaciones basadas en licencias anuales estándar. El ingreso real depende de tu capacidad comercial y del mercado.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { clients: "50", annual: "12.500 – 15.000€", label: "Arranque", desc: "Primer año, un distribuidor a tiempo parcial" },
                  { clients: "150", annual: "37.500 – 45.000€", label: "Consolidación", desc: "Segundo año con equipo comercial básico" },
                  { clients: "500", annual: "125.000 – 150.000€", label: "Escalado", desc: "Red de sub-distribuidores activa" },
                ].map((s) => (
                  <div key={s.clients} className="bg-gradient-card rounded-2xl border border-border p-7 text-center hover:border-wine/30 transition-all">
                    <span className="text-xs font-semibold tracking-widest uppercase text-wine">{s.label}</span>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">{s.clients}</p>
                    <p className="text-xs text-muted-foreground mb-3">clientes</p>
                    <p className="font-heading text-lg font-bold text-wine">{s.annual}</p>
                    <p className="text-xs text-muted-foreground">anuales</p>
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                💡 Los ingresos son recurrentes: cada cliente que se renueva, sigues cobrando tu margen.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PROCESO DE SELECCIÓN ────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🔄 Proceso
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-10">
                Proceso de selección
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {[
                { step: "01", title: "Conversación de descubrimiento", desc: "Nos conocemos, entendemos tu mercado y evaluamos el encaje mutuo." },
                { step: "02", title: "Demo + plan de lanzamiento", desc: "Te mostramos el producto en profundidad y diseñamos juntos el plan de go-to-market para tu territorio." },
                { step: "03", title: "Acuerdo de distribución", desc: "Firmamos el contrato con exclusividad territorial, condiciones claras y objetivos realistas." },
                { step: "04", title: "Onboarding + kit de materiales", desc: "Formación comercial y técnica completa. Kit de ventas co-branded listo para usar." },
                { step: "05", title: "Soporte intensivo 6 meses", desc: "Acompañamiento directo del equipo de Winerim durante los primeros 6 meses de operación." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-5 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all">
                    <span className="font-heading text-2xl font-bold text-wine shrink-0 w-10">{item.step}</span>
                    <div>
                      <h3 className="font-heading text-base font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── DISTRIBUIDORES ACTUALES ──────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🌎 Red activa
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Ya operamos en estos mercados
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                Territorios con distribuidor asignado. ¿El tuyo aún está libre?
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { flag: "🇲🇽", country: "México" },
                  { flag: "🇮🇹", country: "Italia" },
                  { flag: "🇵🇷", country: "Puerto Rico" },
                  { flag: "🇨🇭", country: "Suiza" },
                ].map((d) => (
                  <div key={d.country} className="bg-gradient-card rounded-xl border border-border p-5 text-center">
                    <span className="text-2xl">{d.flag}</span>
                    <p className="font-heading font-bold text-foreground mt-2">{d.country}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-8 max-w-xl mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  💡 <strong className="text-foreground">Perfil ideal:</strong> Distribuidores de vino, distribuidores de software para hostelería, o profesionales del canal HORECA con red consolidada.
                </p>
                <p className="text-sm text-muted-foreground">
                  📍 Buscamos distribuidores en: <strong className="text-foreground">Portugal, Francia, Alemania, UK, USA, resto de LATAM</strong>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CTA FINAL ──────────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <Rocket size={32} className="text-wine mx-auto mb-6" />
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                    ¿Listo para cambiar{" "}
                    <span className="text-gradient-wine italic">tu negocio?</span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Lleva Winerim a tu mercado. Exclusividad, márgenes reales y un producto que se vende solo.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                    >
                      <MessageCircle size={16} /> WhatsApp: 658 718 350
                    </a>
                    <a
                      href="mailto:info@winerim.com?subject=Distribuidor%20Winerim"
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      <Mail size={16} /> info@winerim.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Distribuidor;
