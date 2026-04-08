import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";
import {
  Wine, BarChart3, Brain, Users, Shield, Target, TrendingUp,
  Layers, Eye, ShoppingCart, ArrowRight, CheckCircle2, Lightbulb,
  Building2, Hotel, GlassWater, UtensilsCrossed, Store, BookOpen,
  Sparkles, Puzzle, Database, AlertTriangle, Gauge, Zap,
  Globe, Award, Heart, Handshake, MapPin, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const SobreWinerim = () => {
  const { localePath } = useLanguage();

  const faqs = [
    { q: "¿Quién está detrás de Winerim?", a: "Winerim nace de un equipo con experiencia directa en hostelería, sommellerie, gestión de F&B y tecnología aplicada. No es un proyecto de laboratorio: se construye desde dentro del sector, con personas que entienden los retos reales de gestionar vino en un restaurante, hotel o grupo." },
    { q: "¿Qué problema resuelve Winerim?", a: "Winerim resuelve la desconexión entre carta, bodega, sala y negocio. Conecta datos de venta, stock, pricing y comportamiento del comensal para que cada decisión sobre vino esté basada en información real, no en intuición o inercia." },
    { q: "¿Winerim sustituye al sumiller?", a: "No. Winerim potencia al sumiller dándole datos, criterio y herramientas para decidir mejor. Y en restaurantes sin sumiller, cubre el hueco con recomendaciones inteligentes y guías para el equipo de sala." },
    { q: "¿Qué tipo de restaurante encaja con Winerim?", a: "Restaurantes gastronómicos, hoteles con F&B, grupos de restauración, wine bars y cualquier negocio donde el vino sea una categoría relevante. Desde cartas de 30 referencias hasta cartas de más de 500." },
    { q: "¿En qué países opera Winerim?", a: "Winerim tiene presencia activa en 15 países, con foco principal en España, Italia, Francia y Reino Unido. La plataforma está disponible en español, inglés, italiano y francés." },
    { q: "¿Qué diferencia a Winerim de una carta digital estándar?", a: "Una carta digital muestra vinos. Winerim analiza la carta, detecta desequilibrios, sugiere cambios de pricing, alerta sobre stock muerto, activa recomendaciones por contexto y mide el impacto comercial de cada decisión." },
    { q: "¿Cómo puedo probar Winerim?", a: "Puedes solicitar una demo personalizada donde te mostramos cómo funciona Winerim con datos reales adaptados a tu tipo de negocio, sin compromiso." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sobre nosotros — Quiénes somos y por qué creamos Winerim"
        description="Conoce al equipo, la misión y la metodología detrás de Winerim: la plataforma de gestión inteligente del vino en hostelería usada en 15 países."
        url={`${CANONICAL_DOMAIN}/sobre-nosotros`}
      />
      <DynamicSchemaMarkup
        id="sobre-nosotros"
        type="AboutPage"
        title="Sobre nosotros — Winerim"
        description="Equipo, misión y metodología de Winerim: plataforma de gestión inteligente del vino en hostelería."
        url={`${CANONICAL_DOMAIN}/sobre-nosotros`}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: "Sobre nosotros", url: `${CANONICAL_DOMAIN}/sobre-nosotros` },
        ]}
      />
      <Navbar />

      <main>
        {/* ═══════════════════════════════════════════════════════════
            1. HERO — Misión y propósito
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Heart size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Sobre nosotros</span>
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                Creemos que el vino merece{" "}
                <span className="text-gradient-wine italic">
                  mejores decisiones en hostelería.
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
                Winerim nace de profesionales de hostelería, sommellerie y tecnología que vieron un problema claro:
                el vino se gestiona con intuición donde debería gestionarse con datos, criterio e inteligencia aplicada.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  Solicitar demo <ArrowRight size={16} />
                </Link>
                <Link
                  to={localePath("/que-es-winerim")}
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  Ver cómo funciona
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. NUESTRA MISIÓN
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  Nuestra misión
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                  Que cada decisión sobre vino en hostelería esté{" "}
                  <span className="text-gradient-wine italic">basada en datos reales</span>
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    La industria del vino en hostelería mueve miles de millones cada año.
                    Sin embargo, la mayoría de las decisiones — qué incluir en carta, cómo preciar,
                    qué rotar, qué recomendar — se siguen tomando por inercia, intuición o presión comercial.
                  </p>
                  <p>
                    Nuestra misión es cambiar eso. Construimos herramientas que conectan carta, bodega, sala
                    y negocio para que cada decisión sobre vino genere más valor — para el restaurante,
                    para el comensal y para el sector.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-8 space-y-6">
                  {[
                    { icon: Target, label: "Más rentabilidad", desc: "Que cada referencia en carta contribuya al margen, no lo erosione." },
                    { icon: Users, label: "Más confianza en sala", desc: "Que el equipo pueda recomendar vino con criterio, tenga o no sumiller." },
                    { icon: Eye, label: "Más visibilidad", desc: "Que el negocio sepa exactamente qué funciona, qué no y por qué." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={16} className="text-wine" />
                      </div>
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
            3. ORIGEN — E-E-A-T: Experience
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Nuestro origen
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4 max-w-3xl mx-auto">
                Nacemos desde dentro del sector,
                no desde fuera
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Winerim no es un software genérico adaptado al vino.
                Se construye desde la intersección real entre hostelería, sommellerie, negocio y tecnología.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wine,
                  title: "Experiencia en sommellerie",
                  desc: "Conocimiento profundo del vino, las denominaciones, los estilos de servicio y las necesidades reales de una carta profesional.",
                },
                {
                  icon: Building2,
                  title: "Experiencia en hostelería",
                  desc: "Años de operación en restaurantes, hoteles y grupos. Entendemos los retos de sala, cocina, dirección y compras porque los hemos vivido.",
                },
                {
                  icon: Brain,
                  title: "Experiencia en tecnología",
                  desc: "Ingeniería de producto, inteligencia artificial aplicada y diseño de experiencias digitales para B2B en hostelería.",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-8 h-full text-center">
                    <div className="w-14 h-14 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-6">
                      <item.icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. VALORES — E-E-A-T: Trustworthiness
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Nuestros valores
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight">
                Principios que guían cada decisión
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Rigor antes que ruido", desc: "Cada dato, cada recomendación, cada alerta tiene un porqué. No mostramos más: mostramos lo que importa para decidir mejor." },
                { icon: Handshake, title: "Sector, no laboratorio", desc: "No construimos para demostrar lo que la tecnología puede hacer. Construimos para resolver lo que la hostelería necesita." },
                { icon: Lightbulb, title: "Inteligencia útil", desc: "Un KPI sin contexto no sirve. Un dato sin acción es ruido. Cada insight de Winerim lleva asociada una decisión posible." },
                { icon: Sparkles, title: "Excelencia en la experiencia", desc: "La interfaz es limpia, la experiencia del comensal es fluida, las herramientas de gestión son claras. Premium en fondo y forma." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-8 h-full">
                    <item.icon size={22} className="text-wine mb-5" />
                    <h3 className="font-heading text-base font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. CIFRAS — E-E-A-T: Authoritativeness
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Winerim en cifras
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Datos que respaldan lo que hacemos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nuestro motor de inteligencia se alimenta de una de las bases de datos
                de vino en hostelería más amplias del sector.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { value: "+300K", label: "Referencias de vino en nuestra base de datos", icon: Database },
                { value: "+1.000", label: "Bodegas gestionadas en la plataforma", icon: Wine },
                { value: "15", label: "Países con presencia activa", icon: Globe },
                { value: "4", label: "Idiomas soportados", icon: MapPin },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-6 text-center h-full">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon size={18} className="text-wine" />
                    </div>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-wine mb-2">{item.value}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{item.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Zap, label: "22+ integraciones TPV disponibles" },
                  { icon: Award, label: "Contenido validado por profesionales de sommellerie" },
                  { icon: Brain, label: "Motor de IA entrenado con datos específicos del sector" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-4">
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-wine" />
                    </div>
                    <p className="text-xs text-foreground leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. QUÉ NOS DIFERENCIA — Infraestructura, no feature
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.06),transparent_70%)]" />
                <div className="relative z-10">
                  <Puzzle size={32} className="text-wine mx-auto mb-6" />
                  <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    No construimos un feature.{" "}
                    <span className="text-gradient-wine italic">Construimos una infraestructura.</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                    Winerim conecta carta, stock, ventas, pricing, compras y equipo de sala
                    en un solo ecosistema inteligente. No es una herramienta más:
                    es la capa de inteligencia que el vino necesita en hostelería.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {["Carta digital", "Analítica", "Pricing", "Stock", "Compras", "Recomendaciones IA"].map((cap) => (
                      <span key={cap} className="px-4 py-2 rounded-full border border-wine/20 bg-wine/5 text-xs font-semibold text-wine tracking-wide">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. A QUIÉN AYUDAMOS
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Para quién
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Trabajamos con negocios donde el vino importa
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Si el vino es una categoría relevante en tu operación, Winerim tiene algo para ti.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: UtensilsCrossed, title: "Restaurantes gastronómicos", desc: "Carta cuidada, equipo formado, ambición de elevar la experiencia del vino. Winerim potencia lo que ya haces bien." },
                { icon: Building2, title: "Grupos de restauración", desc: "Múltiples locales, coherencia, control de márgenes y benchmarking interno. Winerim funciona como capa de gobierno del vino a escala." },
                { icon: Hotel, title: "Hoteles con F&B", desc: "Varios puntos de venta, rotación de personal, cartas diversas. Winerim unifica criterio con gestión transversal." },
                { icon: GlassWater, title: "Wine bars", desc: "Alta rotación, servicio por copa protagonista. Winerim optimiza selección, pricing por copa y recomendación activa." },
                { icon: Store, title: "Restaurantes sin sumiller", desc: "Sin experto dedicado, pero con voluntad de vender bien vino. Winerim cubre el gap con inteligencia." },
                { icon: BookOpen, title: "Cartas amplias (+100 refs)", desc: "Gestionar una carta grande sin datos es un riesgo. Winerim da visibilidad sobre rotación, rentabilidad y equilibrio." },
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
            8. COMPROMISO CON EL SECTOR — E-E-A-T: Trust signals
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                Compromiso
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Nuestro compromiso con la hostelería
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No solo vendemos software. Contribuimos activamente al conocimiento del sector.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, text: "Publicamos guías, recursos y herramientas gratuitas para mejorar la gestión del vino en hostelería." },
                { icon: BarChart3, text: "Compartimos benchmarks y datos agregados del sector para elevar el nivel de todo el ecosistema." },
                { icon: Users, text: "Trabajamos con sumilleres, directores de F&B y equipos de sala para validar cada funcionalidad." },
                { icon: Globe, text: "Operamos en 4 idiomas y 15 países, adaptándonos a las particularidades de cada mercado." },
                { icon: Shield, text: "Todo el contenido de nuestra plataforma está validado por profesionales del vino y la hostelería." },
                { icon: Calendar, text: "Mantenemos una hoja de ruta pública de producto basada en feedback real de clientes." },
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
            FAQ
            ═══════════════════════════════════════════════════════════ */}
        <FAQSection faqs={faqs} schemaId="sobre-nosotros" />

        {/* ═══════════════════════════════════════════════════════════
            INTERNAL LINKS
            ═══════════════════════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <InternalLinks
            links={[
              { to: localePath("/que-es-winerim"), label: "¿Qué es Winerim?", type: "solution" },
              { to: localePath("/funcionalidades"), label: "Funcionalidades", type: "solution" },
              { to: localePath("/soluciones"), label: "Soluciones", type: "solution" },
              { to: localePath("/producto/winerim-core"), label: "Winerim Core", type: "solution" },
              { to: localePath("/producto/winerim-supply"), label: "Winerim Supply", type: "solution" },
              { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
              { to: localePath("/clientes"), label: "Clientes", type: "solution" },
              { to: "/biblioteca-vino", label: "Biblioteca del Vino", type: "resource" },
              { to: localePath("/herramientas"), label: "Herramientas", type: "tool" },
            ]}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA FINAL
            ═══════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                    ¿Quieres saber cómo Winerim puede{" "}
                    <span className="text-gradient-wine italic">
                      transformar la gestión del vino en tu negocio?
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Agenda una demo personalizada y descubre cómo convertir tu carta en un activo estratégico de venta, rentabilidad y experiencia.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to={localePath("/demo")}
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                    >
                      Solicitar demo <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={localePath("/contacto")}
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      Contactar
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

export default SobreWinerim;
