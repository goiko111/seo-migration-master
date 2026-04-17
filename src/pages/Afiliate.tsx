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
const WA_MSG_ES = encodeURIComponent("Hola, me interesa el programa de partners de Winerim.");
const WA_MSG_EN = encodeURIComponent("Hi, I am interested in Winerim's partner program.");
const WA_MSG_DE = encodeURIComponent("Hallo, ich bin an Winerims Partnerprogramm interessiert.");
const WA_MSG_PT = encodeURIComponent("Ola, estou interessado no programa de parceiros da Winerim.");

const faqs = {
  es: [
    { q: "Quien puede ser partner de Winerim?", a: "Distribuidores, importadores, sumilleres, consultores de hoteleria, formadores, agencias especializadas, partners tecnologicos y cualquier profesional con acceso real a restaurantes, hoteles o grupos de restauracion donde el vino sea una categoria relevante." },
    { q: "Como se remunera a los partners?", a: "Cada oportunidad cerrada genera una comision. El modelo exacto se detalla durante el proceso de onboarding y depende del tipo de colaboracion y el perfil del partner." },
    { q: "Cuando se cobra la comision?", a: "La comision se genera cuando la oportunidad recomendada se convierte en cliente activo de Winerim. Los plazos y condiciones se acuerdan durante el onboarding." },
    { q: "Hace falta exclusividad?", a: "No. Puedes colaborar con Winerim de forma complementaria a tu actividad principal. No pedimos exclusividad, pedimos encaje y compromiso profesional." },
    { q: "Se facilita material comercial?", a: "Si. Los partners reciben materiales de apoyo, documentacion de producto, casos de uso y soporte del equipo comercial de Winerim para acompanar cada oportunidad." },
    { q: "Se puede colaborar desde otros paises?", a: "Si. Winerim tiene presencia en 15 paises y soporta 4 idiomas. El programa de partners esta abierto a colaboraciones internacionales." },
    { q: "Tambien sirve para recomendar Winerim a grupos y hoteles?", a: "Especialmente. Grupos de restauracion y hoteles con F&B son perfiles ideales para Winerim. Las oportunidades de mayor valor suelen venir de este tipo de cuentas." },
  ],
  en: [
    { q: "Who can be a Winerim partner?", a: "Distributors, importers, sommeliers, hospitality consultants, trainers, specialized agencies, technology partners and any professional with real access to restaurants, hotels or restaurant groups where wine is a relevant category." },
    { q: "How are partners compensated?", a: "Each closed opportunity generates a commission. The exact model is detailed during the onboarding process and depends on the type of collaboration and the partner profile." },
    { q: "When is the commission paid?", a: "The commission is generated when the recommended opportunity becomes an active Winerim customer. Terms and conditions are agreed during onboarding." },
    { q: "Is exclusivity required?", a: "No. You can collaborate with Winerim in addition to your main activity. We don't require exclusivity, we require fit and professional commitment." },
    { q: "Is sales material provided?", a: "Yes. Partners receive support materials, product documentation, case studies and support from Winerim's sales team to support each opportunity." },
    { q: "Can we collaborate from other countries?", a: "Yes. Winerim has presence in 15 countries and supports 4 languages. The partner program is open to international collaborations." },
    { q: "Can it also be used to recommend Winerim to restaurant groups and hotels?", a: "Especially. Restaurant groups and hotels with F&B are ideal profiles for Winerim. The highest-value opportunities typically come from these types of accounts." },
  ],
  de: [
    { q: "Wer kann Partner von Winerim sein?", a: "Distributoren, Importeure, Sommelier, Gaststatten-Berater, Trainer, spezialisierte Agenturen, Technologie-Partner und alle Fachleute mit echtem Zugang zu Restaurants, Hotels oder Restaurantketten, wo Wein eine relevante Kategorie ist." },
    { q: "Wie werden Partner vergutet?", a: "Jede abgeschlossene Gelegenheit generiert eine Provision. Das exakte Modell wird wahrend des Onboarding-Prozesses erklart und hangt von der Art der Zusammenarbeit und dem Partner-Profil ab." },
    { q: "Wann wird die Provision bezahlt?", a: "Die Provision wird generiert, wenn die empfohhlene Gelegenheit zu einem aktiven Winerim-Kunden wird. Bedingungen werden wahrend des Onboarding vereinbart." },
    { q: "Ist Exklusivitat erforderlich?", a: "Nein. Sie konnen mit Winerim zusatzlich zu Ihrer Haupttatigkeit zusammenarbeiten. Wir fordern keine Exklusivitat, wir fordern Passform und berufliches Engagement." },
    { q: "Wird Verkaufsmaterial bereitgestellt?", a: "Ja. Partner erhalten Unterstutzungsmaterialien, Produktdokumentation, Fallstudien und Unterstutzung vom Winerim-Vertriebsteam fur jede Gelegenheit." },
    { q: "Konnen wir aus anderen Landern zusammenarbeiten?", a: "Ja. Winerim ist in 15 Landern praesent und unterstutzt 4 Sprachen. Das Partnerprogramm ist fur internationale Zusammenarbeit offen." },
    { q: "Kann es auch verwendet werden, um Winerim Restaurantketten und Hotels zu empfehlen?", a: "Besonders. Restaurantketten und Hotels mit F&B sind ideale Profile fur Winerim. Die wertvollsten Gelegenheiten kommen typischerweise von diesen Arten von Konten." },
  ],
  pt: [
    { q: "Quem pode ser parceiro da Winerim?", a: "Distribuidores, importadores, escancioes, consultores de hotelaria, formadores, agencias especializadas, parceiros tecnologicos e qualquer profissional com acesso real a restaurantes, hoteis ou grupos de restauracao onde o vinho seja uma categoria relevante." },
    { q: "Como sao remunerados os parceiros?", a: "Cada oportunidade fechada gera uma comissao. O modelo exato e detalhado durante o processo de onboarding e depende do tipo de colaboracao e do perfil do parceiro." },
    { q: "Quando e paga a comissao?", a: "A comissao e gerada quando a oportunidade recomendada se torna um cliente ativo da Winerim. Os prazos e condicoes sao acordados durante o onboarding." },
    { q: "A exclusividade e obrigatoria?", a: "Nao. Pode colaborar com Winerim alem da sua atividade principal. Nao requeremos exclusividade, requeremos adequacao e compromisso profissional." },
    { q: "Material de vendas e fornecido?", a: "Sim. Os parceiros recebem materiais de apoio, documentacao do produto, estudos de caso e apoio da equipa de vendas da Winerim para cada oportunidade." },
    { q: "Podemos colaborar de outros paises?", a: "Sim. Winerim tem presenca em 15 paises e suporta 4 idiomas. O programa de parceiros esta aberto a colaboracoes internacionais." },
    { q: "Tambem pode ser usado para recomendar Winerim a grupos de restauracao e hoteis?", a: "Especialmente. Grupos de restauracao e hoteis com F&B sao perfis ideais para Winerim. As oportunidades de maior valor tipicamente vem destes tipos de contas." },
  ],
};

const WA_MSG_BY_LANG: Record<string, string> = {
  es: WA_MSG_ES, en: WA_MSG_EN, de: WA_MSG_DE, pt: WA_MSG_PT,
};


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
  const { lang, localePath, allLangPaths } = useLanguage();
  const currentFaqs = faqs[lang as keyof typeof faqs] || faqs.es;
  const WA_MSG = WA_MSG_BY_LANG[lang] || WA_MSG_ES;

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
        faqs={currentFaqs}
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
        <FAQSection faqs={currentFaqs} schemaId="partners" />

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
