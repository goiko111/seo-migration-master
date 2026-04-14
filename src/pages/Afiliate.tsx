import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wine, ArrowRight, CheckCircle2, Users, Briefcase, GraduationCap,
  Building2, Handshake, TrendingUp, Target, ShoppingCart, Brain,
  Lightbulb, Shield, Sparkles, Puzzle, BarChart3, MessageCircle, Mail, Calculator
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { Slider } from "@/components/ui/slider";

const WA_NUMBER = "34658718350";
const WA_MSG = encodeURIComponent("Hola, me interesa el programa de partners de Winerim.");

const faqs = [
  { q: "¿Quién puede ser partner de Winerim?", a: "Distribuidores, importadores, sumilleres, consultores de hostelería, formadores, agencias especializadas, partners tecnológicos y cualquier profesional con acceso real a restaurantes, hoteles o grupos de restauración donde el vino sea una categoría relevante." },
  { q: "¿Cómo se remunera a los partners?", a: "Cada oportunidad cerrada genera una comisión. El modelo exacto se detalla durante el proceso de onboarding y depende del tipo de colaboración y el perfil del partner." },
  { q: "¿Cuándo se cobra la comisión?", a: "La comisión se genera cuando la oportunidad recomendada se convierte en cliente activo de Winerim. Los plazos y condiciones se acuerdan durante el onboarding." },
  { q: "¿Hace falta exclusividad?", a: "No. Puedes colaborar con Winerim de forma complementaria a tu actividad principal. No pedimos exclusividad, pedimos encaje y compromiso profesional." },
  { q: "¿Se facilita material comercial?", a: "Sí. Los partners reciben materiales de apoyo, documentación de producto, casos de uso y soporte del equipo comercial de Winerim para acompañar cada oportunidad." },
  { q: "¿Se puede colaborar desde otros países?", a: "Sí. Winerim tiene presencia en 15 países y soporta 4 idiomas. El programa de partners está abierto a colaboraciones internacionales." },
  { q: "¿También sirve para recomendar Winerim a grupos y hoteles?", a: "Especialmente. Grupos de restauración y hoteles con F&B son perfiles ideales para Winerim. Las oportunidades de mayor valor suelen venir de este tipo de cuentas." },
];

const EarningsCalculator = () => {
  const [clients, setClients] = useState([10]);
  const avgLicense = 250; // € per month avg
  const tiers = [
    { name: "Influencer", pct: 0.10, color: "text-muted-foreground" },
    { name: "Partner Premium", pct: 0.15, color: "text-wine" },
  ];

  return (
    <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <Calculator size={20} className="text-wine" />
        <h3 className="font-heading text-lg font-bold text-foreground">Calculadora de ganancias</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">
            Clientes referidos: <strong className="text-foreground">{clients[0]}</strong>
          </label>
          <Slider
            value={clients}
            onValueChange={setClients}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span><span>50</span><span>100</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {tiers.map((t) => {
            const monthly = Math.round(clients[0] * avgLicense * t.pct);
            const annual = monthly * 12;
            return (
              <div key={t.name} className="rounded-xl border border-border p-5 text-center">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${t.color}`}>{t.name} ({Math.round(t.pct * 100)}%)</p>
                <p className="font-heading text-2xl font-bold text-foreground">{monthly.toLocaleString("es-ES")}€<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
                <p className="text-sm text-muted-foreground">{annual.toLocaleString("es-ES")}€/año</p>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Estimación basada en licencia media de {avgLicense}€/mes. Los importes reales varían según el tipo de cliente.
        </p>
      </div>
    </div>
  );
};

const Afiliate = () => {
  const { localePath, allLangPaths } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Programa de Partners Winerim — Colabora y genera ingresos"
        description="Hazte partner de Winerim: recomienda el software de carta de vinos con IA a restaurantes y hoteles. Comisiones, materiales y soporte."
        url={`${CANONICAL_DOMAIN}/afiliate`}
        hreflang={allLangPaths("/afiliate")}
      />
      <DynamicSchemaMarkup
        id="partners"
        type="WebPage"
        title="Programa de Partners Winerim"
        description="Programa de colaboración para prescriptores, distribuidores, sumilleres y consultores que quieran recomendar Winerim."
        url={`${CANONICAL_DOMAIN}/afiliate`}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: "Partners", url: `${CANONICAL_DOMAIN}/afiliate` },
        ]}
      />
      <Navbar />

      <main>
        {/* ═══ 1. HERO ═══ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Handshake size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Programa de partners</span>
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                Convierte tu red de contactos en una{" "}
                <span className="text-gradient-wine italic">oportunidad real</span>{" "}
                con Winerim
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
                Si trabajas con restaurantes, hoteles o grupos y entiendes el valor del vino en hostelería,
                puedes convertirte en partner de Winerim y generar ingresos recomendando una solución que sí aporta valor.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={localePath("/contacto")}
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  Quiero ser partner <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ 2. TIERS ═══ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Niveles
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Elige tu nivel de colaboración
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tres modelos adaptados a tu perfil, tu red y tu ambición.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  tier: "Influencer",
                  pct: "10%",
                  desc: "Para sumilleres, formadores y creadores de contenido que recomiendan Winerim a su audiencia.",
                  features: ["Comisión del 10% por cliente referido", "Link de referido personalizado", "Material de apoyo básico", "Sin compromiso mínimo"],
                  cta: "Empezar como Influencer",
                  highlight: false,
                },
                {
                  tier: "Partner Premium",
                  pct: "15%",
                  desc: "Para consultores, agencias y distribuidores con acceso activo a restaurantes y grupos.",
                  features: ["Comisión del 15% por cliente referido", "Acompañamiento comercial conjunto", "Co-branding en materiales", "Formación de producto completa", "Soporte prioritario"],
                  cta: "Ser Partner Premium",
                  highlight: true,
                },
                {
                  tier: "Distribuidor",
                  pct: "25-30%",
                  desc: "Exclusividad territorial. Tu propio negocio de distribución con márgenes máximos.",
                  features: ["Márgenes del 25-30%", "Exclusividad de zona", "Red de sub-distribuidores", "Marketing co-branded completo", "Soporte intensivo 6 meses"],
                  cta: "Ver programa de distribuidores",
                  link: "/distribuidor",
                  highlight: false,
                },
              ].map((t, i) => (
                <ScrollReveal key={t.tier} delay={i * 0.05}>
                  <div className={`rounded-2xl border p-7 h-full flex flex-col ${t.highlight ? "border-wine bg-wine/5" : "border-border bg-gradient-card"}`}>
                    <span className="text-xs font-semibold tracking-widest uppercase text-wine">{t.tier}</span>
                    <p className="font-heading text-3xl font-bold text-foreground mt-2 mb-3">{t.pct}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.desc}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="text-wine shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {t.link ? (
                      <Link
                        to={localePath(t.link)}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                          t.highlight
                            ? "bg-gradient-wine text-primary-foreground hover:opacity-90"
                            : "border border-border hover:border-wine/30 hover:text-wine"
                        }`}
                      >
                        {t.cta} <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <Link
                        to={localePath("/contacto")}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                          t.highlight
                            ? "bg-gradient-wine text-primary-foreground hover:opacity-90"
                            : "border border-border hover:border-wine/30 hover:text-wine"
                        }`}
                      >
                        {t.cta} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3. CALCULADORA ═══ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                📈 Simulador
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                ¿Cuánto puedes ganar?
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <EarningsCalculator />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ 4. CASOS DE ÉXITO ═══ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🏆 Casos reales
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Partners que ya generan ingresos
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  flag: "🇲🇽",
                  name: "Distribuidora de vinos — México",
                  desc: "Un importador de vinos en Ciudad de México integró Winerim como valor añadido para sus clientes restaurantes. En 8 meses, 35 restaurantes activados.",
                  result: "~10.500€ anuales en comisiones",
                },
                {
                  flag: "🇮🇹",
                  name: "Partner tecnológico — Italia",
                  desc: "Una empresa de TPV para hostelería añadió Winerim a su ecosistema. La integración tecnológica aceleró la adopción entre sus clientes existentes.",
                  result: "22 clientes en 6 meses, creciendo",
                },
              ].map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-2xl border border-border p-8">
                    <span className="text-3xl">{c.flag}</span>
                    <h3 className="font-heading text-base font-bold text-foreground mt-3 mb-2">{c.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                    <p className="text-sm font-semibold text-wine flex items-center gap-2">
                      <TrendingUp size={14} /> {c.result}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. PARA QUIÉN ═══ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Perfiles
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                ¿Para quién es este programa?
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: ShoppingCart, title: "Distribuidores e importadores", desc: "Ya tienes relación con la hostelería. Recomendar Winerim complementa tu propuesta y aporta un diferencial tecnológico." },
                { icon: Wine, title: "Sumilleres y consultores", desc: "Tu criterio tiene credibilidad. Prescribir Winerim refuerza tu posición como asesor que conecta vino con negocio." },
                { icon: GraduationCap, title: "Formadores de hostelería", desc: "Si formas equipos de sala o directores de F&B, Winerim cierra el círculo de lo que enseñas." },
                { icon: Puzzle, title: "Partners tecnológicos", desc: "Si desarrollas TPV, ERP o gestión para hostelería, Winerim se integra y añade inteligencia." },
                { icon: Briefcase, title: "Agencias especializadas", desc: "Si conectas hostelería con soluciones de valor, Winerim amplía tu porfolio." },
                { icon: Building2, title: "Asesores de grupos", desc: "Si trabajas con grupos u hoteles, Winerim cubre la gestión del vino a escala." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-7 h-full hover:border-wine/20 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <item.icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. CÓMO FUNCIONA ═══ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Proceso
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Cómo funciona
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                { step: "01", title: "Aplicas", desc: "Nos cuentas quién eres, a qué te dedicas y por qué crees que encajas como partner." },
                { step: "02", title: "Validamos encaje", desc: "Evaluamos tu perfil, tu red y tu capacidad de prescripción." },
                { step: "03", title: "Onboarding", desc: "Acceso a materiales, formación de producto y herramientas de venta." },
                { step: "04", title: "Recomiendas", desc: "Identificas oportunidades y presentas Winerim a negocios de tu red." },
                { step: "05", title: "Acompañamos", desc: "El equipo comercial de Winerim se involucra: demos, seguimiento y cierre." },
                { step: "06", title: "Cobras", desc: "La oportunidad se convierte en cliente, se genera tu comisión." },
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

        {/* ═══ FAQ ═══ */}
        <FAQSection faqs={faqs} schemaId="partners" />

        {/* ═══ INTERNAL LINKS ═══ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <InternalLinks
            links={[
              { to: localePath("/que-es-winerim"), label: "¿Qué es Winerim?", type: "solution" },
              { to: localePath("/funcionalidades"), label: "Funcionalidades", type: "solution" },
              { to: localePath("/distribuidor"), label: "Programa de distribuidores", type: "solution" },
              { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
              { to: localePath("/precios"), label: "Precios", type: "solution" },
            ]}
          />
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                    Si ya tienes acceso a restaurantes,{" "}
                    <span className="text-gradient-wine italic">
                      no recomiendes algo mediocre.
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Conviértete en partner de una solución especializada y construye una colaboración con recorrido.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to={localePath("/contacto")}
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                    >
                      Quiero aplicar <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      <MessageCircle size={16} /> WhatsApp: 658 718 350
                    </a>
                    <a
                      href="mailto:info@winerim.com?subject=Partner%20Winerim"
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      <Mail size={16} /> Email
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

export default Afiliate;
