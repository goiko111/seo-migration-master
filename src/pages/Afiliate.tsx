import { Link } from "react-router-dom";
import {
  Wine, ArrowRight, CheckCircle2, Users, Briefcase, GraduationCap,
  Building2, Handshake, TrendingUp, Target, ShoppingCart, Brain,
  Lightbulb, Shield, Sparkles, ChevronRight, Puzzle, BarChart3
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

const faqs = [
  { q: "¿Quién puede ser partner de Winerim?", a: "Distribuidores, importadores, sumilleres, consultores de hostelería, formadores, agencias especializadas, partners tecnológicos y cualquier profesional con acceso real a restaurantes, hoteles o grupos de restauración donde el vino sea una categoría relevante." },
  { q: "¿Cómo se remunera a los partners?", a: "Cada oportunidad cerrada genera una comisión. El modelo exacto se detalla durante el proceso de onboarding y depende del tipo de colaboración y el perfil del partner." },
  { q: "¿Cuándo se cobra la comisión?", a: "La comisión se genera cuando la oportunidad recomendada se convierte en cliente activo de Winerim. Los plazos y condiciones se acuerdan durante el onboarding." },
  { q: "¿Hace falta exclusividad?", a: "No. Puedes colaborar con Winerim de forma complementaria a tu actividad principal. No pedimos exclusividad, pedimos encaje y compromiso profesional." },
  { q: "¿Se facilita material comercial?", a: "Sí. Los partners reciben materiales de apoyo, documentación de producto, casos de uso y soporte del equipo comercial de Winerim para acompañar cada oportunidad." },
  { q: "¿Se puede colaborar desde otros países?", a: "Sí. Winerim tiene presencia en 15 países y soporta 4 idiomas. El programa de partners está abierto a colaboraciones internacionales." },
  { q: "¿También sirve para recomendar Winerim a grupos y hoteles?", a: "Especialmente. Grupos de restauración y hoteles con F&B son perfiles ideales para Winerim. Las oportunidades de mayor valor suelen venir de este tipo de cuentas." },
];

const Afiliate = () => {
  const { localePath } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Programa de Partners Winerim — Colabora y genera ingresos"
        description="Conviértete en partner de Winerim: recomienda la plataforma líder de gestión inteligente del vino a restaurantes, hoteles y grupos. Comisiones, materiales y soporte."
        url={`${CANONICAL_DOMAIN}/afiliate`}
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
        {/* ═══════════════════════════════════════════════════════════
            1. HERO
            ═══════════════════════════════════════════════════════════ */}
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
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  Hablar con el equipo
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. QUÉ ES EL PROGRAMA
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  El programa
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                  Esto no va de poner un link.{" "}
                  <span className="text-gradient-wine italic">Va de prescribir con criterio.</span>
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    El programa de partners de Winerim está pensado para profesionales y empresas que ya tienen
                    relaciones de confianza con negocios de hostelería.
                  </p>
                  <p>
                    No buscamos volumen de clics. Buscamos prescriptores que entiendan que recomendar una herramienta
                    seria refuerza su propio posicionamiento.
                  </p>
                  <p>
                    Recomendar Winerim no es recomendar "otro software". Es recomendar una solución especializada
                    que conecta carta, stock, pricing, ventas e inteligencia de compras en un solo ecosistema.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-8 space-y-6">
                  {[
                    { label: "Colaboración profesional", desc: "No es un programa de afiliados genérico. Es una relación de prescripción con soporte real." },
                    { label: "Materiales y acompañamiento", desc: "Recibimos materiales comerciales, apoyo técnico y presencia conjunta cuando encaja." },
                    { label: "Ingresos por valor generado", desc: "Cada oportunidad cerrada genera una comisión. Cuanto más valor, más recorrido." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-wine shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. PARA QUIÉN ENCAJA
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Perfiles
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                ¿Para quién es este programa?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Buscamos perfiles con acceso real a negocios donde el vino es una categoría importante.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: ShoppingCart, title: "Distribuidores e importadores", desc: "Ya tienes relación con la hostelería. Recomendar Winerim complementa tu propuesta y aporta un diferencial tecnológico a tu cartera de servicios." },
                { icon: Wine, title: "Sumilleres y consultores de vino", desc: "Tu criterio tiene credibilidad. Prescribir Winerim a tus clientes refuerza tu posición como asesor que conecta vino con negocio." },
                { icon: GraduationCap, title: "Formadores de hostelería", desc: "Si formas equipos de sala, directores de F&B o gestores de compra, Winerim es la herramienta que cierra el círculo de lo que enseñas." },
                { icon: Puzzle, title: "Partners tecnológicos", desc: "Si desarrollas soluciones de TPV, ERP o gestión para hostelería, Winerim se integra y añade una capa de inteligencia que tus clientes valoran." },
                { icon: Briefcase, title: "Agencias y comerciales especializados", desc: "Si tu negocio es conectar hostelería con soluciones de valor, Winerim amplía tu porfolio con una propuesta que resuelve problemas reales." },
                { icon: Building2, title: "Asesores de grupos y cadenas", desc: "Si trabajas con grupos de restauración u hoteles, Winerim cubre una necesidad crítica de gobierno y optimización del vino a escala." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-7 h-full hover:border-wine/20 transition-all duration-300">
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

        {/* ═══════════════════════════════════════════════════════════
            4. QUÉ GANA EL PARTNER
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Ventajas para el partner
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Qué ganas como partner de Winerim
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, text: "Comisión por cada oportunidad que se convierta en cliente activo" },
                { icon: Handshake, text: "Posibilidad de colaboración recurrente con ingresos sostenidos" },
                { icon: Shield, text: "Material comercial profesional y apoyo del equipo de Winerim" },
                { icon: Sparkles, text: "Posicionamiento como prescriptor de innovación en hostelería" },
                { icon: Target, text: "Acceso a una propuesta diferencial y especializada en vino" },
                { icon: Users, text: "Acompañamiento real en cada oportunidad: no estás solo" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.03}>
                  <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/20 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-wine" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. QUÉ GANA EL CLIENTE FINAL
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Valor para el cliente
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Por qué recomendar Winerim tiene sentido
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                No prescribes un software genérico. Prescribes una solución que resuelve problemas reales del negocio de tu cliente.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: BarChart3, title: "Vender mejor", desc: "Carta que activa la decisión del comensal, recomendaciones inteligentes y equipo de sala con más herramientas." },
                { icon: Brain, title: "Decidir mejor", desc: "Datos de rotación, margen, equilibrio de carta y benchmarks sectoriales para tomar decisiones con criterio." },
                { icon: ShoppingCart, title: "Comprar mejor", desc: "Inteligencia de compras basada en datos de rotación, alertas de sobrecoste y lógica de reposición." },
                { icon: Target, title: "Profesionalizar la gestión", desc: "Stock controlado, pricing inteligente, vinos muertos detectados y revisiones de carta estructuradas." },
                { icon: Sparkles, title: "Mejorar la experiencia", desc: "Maridajes contextuales, fichas de vino completas y una carta que guía al comensal en vez de abrumarle." },
                { icon: TrendingUp, title: "Proteger la rentabilidad", desc: "Alertas de erosión de margen, simulador de precios y visibilidad sobre la rentabilidad real de cada referencia." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <item.icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. CÓMO FUNCIONA
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Proceso
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Cómo funciona
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un proceso simple, profesional y con acompañamiento en cada paso.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                { step: "01", title: "Aplicas", desc: "Nos cuentas quién eres, a qué te dedicas y por qué crees que encajas como partner de Winerim." },
                { step: "02", title: "Validamos encaje", desc: "Evaluamos tu perfil, tu red de contactos y tu capacidad de prescripción. Buscamos calidad, no volumen." },
                { step: "03", title: "Onboarding y materiales", desc: "Te damos acceso a materiales comerciales, documentación de producto y formación sobre Winerim para que prescribas con conocimiento." },
                { step: "04", title: "Recomiendas", desc: "Identificas oportunidades en tu red y presentas Winerim a negocios donde el vino es una categoría relevante." },
                { step: "05", title: "Acompañamos", desc: "El equipo comercial de Winerim se involucra en la oportunidad: demos, seguimiento y cierre conjunto." },
                { step: "06", title: "Se cierra, cobras", desc: "Cuando la oportunidad se convierte en cliente activo, se genera tu comisión según las condiciones acordadas." },
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

        {/* ═══════════════════════════════════════════════════════════
            7. QUÉ TIPO DE PARTNER QUEREMOS
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.06),transparent_70%)]" />
                <div className="relative z-10">
                  <Shield size={32} className="text-wine mx-auto mb-6" />
                  <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    No buscamos volumen.{" "}
                    <span className="text-gradient-wine italic">Buscamos encaje.</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                    Este programa no es para todos. Es para profesionales y empresas que ya tienen relaciones
                    de confianza con negocios de hostelería y que entienden que prescribir bien es un acto de criterio, no de spam.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                    {[
                      "Acceso real a restaurantes, hoteles o grupos",
                      "Credibilidad profesional en el sector",
                      "Voluntad de construir una colaboración con recorrido",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-wine shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. POR QUÉ RECOMENDAR WINERIM ES DISTINTO
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Diferenciación
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Por qué recomendar Winerim es distinto
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Lightbulb, title: "No es software genérico", desc: "Winerim está construido específicamente para la gestión del vino en hostelería. No es un CRM, no es un TPV, no es una web de catálogo." },
                { icon: Target, title: "Especialización real", desc: "Une vino, negocio y tecnología en un solo punto. Esa intersección es difícil de replicar y fácil de comunicar." },
                { icon: Brain, title: "Narrativa potente", desc: "No vendes un producto aburrido. Vendes inteligencia aplicada al vino, rentabilidad y experiencia de cliente. Es una historia que engancha." },
                { icon: Sparkles, title: "Resuelve problemas reales", desc: "Pricing desactualizado, stock muerto, cartas que no venden, salas que no saben recomendar. Winerim ataca problemas que todos reconocen." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-8 h-full">
                    <item.icon size={20} className="text-wine mb-4" />
                    <h3 className="font-heading text-base font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FAQ
            ═══════════════════════════════════════════════════════════ */}
        <FAQSection faqs={faqs} schemaId="partners" />

        {/* ═══════════════════════════════════════════════════════════
            INTERNAL LINKS
            ═══════════════════════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <InternalLinks
            links={[
              { to: localePath("/que-es-winerim"), label: "¿Qué es Winerim?", type: "solution" },
              { to: localePath("/funcionalidades"), label: "Funcionalidades", type: "solution" },
              { to: localePath("/soluciones"), label: "Soluciones", type: "solution" },
              { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
              { to: localePath("/sobre-nosotros"), label: "Sobre nosotros", type: "solution" },
              { to: localePath("/precios"), label: "Precios", type: "solution" },
            ]}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════
            10. CTA FINAL
            ═══════════════════════════════════════════════════════════ */}
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
                    <Link
                      to={localePath("/demo")}
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      Hablar con Winerim
                    </Link>
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
