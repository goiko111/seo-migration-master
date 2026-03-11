import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import FactsBox from "@/components/seo/FactsBox";
import MethodologyBox from "@/components/seo/MethodologyBox";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import QuickAnswer from "@/components/seo/QuickAnswer";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";
import {
  Wine, BarChart3, Brain, Users, Globe, Shield, BookOpen,
  Target, Layers, Award, TrendingUp, Database
} from "lucide-react";
import { Link } from "react-router-dom";

const SobreWinerim = () => {
  const { lang, localePath } = useLanguage();

  const expertiseAreas = [
    { icon: Wine, label: "Gestión de carta de vinos", desc: "Diseño, estructura y optimización de cartas para maximizar ventas y experiencia del comensal." },
    { icon: BarChart3, label: "Analítica de ventas de vino", desc: "KPIs específicos del vino en hostelería: rotación, margen, ticket medio, mix de referencias." },
    { icon: TrendingUp, label: "Pricing y estrategia de precios", desc: "Modelos de pricing para vino en restaurante: multiplicador, margen fijo, pricing dinámico." },
    { icon: Brain, label: "IA aplicada a restauración", desc: "Recomendaciones inteligentes, maridajes automáticos, predicción de demanda y optimización de stock." },
    { icon: Database, label: "Gestión de bodega y stock", desc: "Control de inventario, detección de vinos muertos, alertas de stock bajo y rotación de referencias." },
    { icon: Users, label: "Formación de equipos de sala", desc: "Herramientas y contenido para que el personal recomiende vino con confianza." },
  ];

  const faqs = [
    { q: "¿Quién está detrás de Winerim?", a: "Winerim es un equipo multidisciplinar con experiencia en tecnología, hostelería, sommellerie y análisis de datos. Combinamos conocimiento técnico con experiencia directa en restauración." },
    { q: "¿Cómo se generan las recomendaciones de Winerim?", a: "Las recomendaciones se basan en datos de la carta del restaurante, preferencias de maridaje, patrones de venta y objetivos comerciales configurados. No son genéricas: se adaptan a cada contexto." },
    { q: "¿Qué datos utiliza Winerim para sus análisis?", a: "Winerim trabaja con datos de la carta (referencias, precios, categorías), datos de venta (si hay integración con TPV), datos de stock y benchmarks del sector basados en información agregada y anónima." },
    { q: "¿Cómo se valida el contenido publicado por Winerim?", a: "Todo el contenido editorial (guías, benchmarks, playbooks) es revisado por profesionales con experiencia en sommellerie y gestión de restauración. Los datos de mercado se contrastan con fuentes del sector." },
    { q: "¿Winerim vende o almacena datos de clientes finales?", a: "No. Winerim no recopila datos personales de los comensales. La plataforma trabaja exclusivamente con datos operativos del restaurante (carta, ventas, stock)." },
    { q: "¿Qué diferencia a Winerim de un consultor de vinos?", a: "Un consultor ofrece asesoramiento puntual. Winerim es una plataforma continua que combina herramientas digitales, analítica automatizada y contenido experto para mejorar las ventas de vino de forma sostenida." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sobre Winerim — Metodología, Equipo y Expertise"
        description="Conoce quién está detrás de Winerim, nuestra metodología de trabajo, cómo medimos resultados y las áreas de expertise que avalan nuestra tecnología para restaurantes."
        url={`${CANONICAL_DOMAIN}/sobre-winerim`}
      />
      <DynamicSchemaMarkup
        id="sobre-winerim"
        type="AboutPage"
        title="Sobre Winerim"
        description="Metodología, equipo y áreas de expertise de Winerim."
        url={`${CANONICAL_DOMAIN}/sobre-winerim`}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL_DOMAIN },
          { name: "Sobre Winerim", url: `${CANONICAL_DOMAIN}/sobre-winerim` },
        ]}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-6">
                Sobre nosotros
              </span>
              <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-6">
                La tecnología detrás de{" "}
                <span className="text-wine">cada copa vendida</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Winerim nace de la intersección entre tecnología, hostelería y vino.
                Construimos herramientas que ayudan a restaurantes a tomar mejores decisiones
                sobre su carta, su bodega y sus ventas de vino.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick Answers */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-12">
          <QuickAnswer
            question="¿Qué es Winerim?"
            answer="Winerim es una plataforma de gestión inteligente de cartas de vino para restaurantes, hoteles y grupos de restauración. Combina carta digital interactiva, recomendaciones con IA, analítica de ventas y herramientas de optimización de precios."
            details={[
              "Fundada en 2024, con presencia en 15 países",
              "+1.000 bodegas gestionadas y +300.000 referencias únicas de vino en la base de datos",
              "Equipo con experiencia en tecnología, sommellerie y gestión de restauración",
            ]}
            source="Datos verificados a fecha de marzo 2025."
          />
          <QuickAnswer
            question="¿Cuál es la misión de Winerim?"
            answer="Ayudar a los restaurantes a vender más y mejor vino utilizando datos, inteligencia artificial y herramientas digitales diseñadas específicamente para la hostelería. No sustituimos al sommelier — le damos herramientas más potentes."
          />
        </section>

        {/* Facts */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <FactsBox
              title="Winerim en cifras"
              facts={[
                { label: "Bodegas gestionadas", value: "+1.000" },
                { label: "Referencias de vino en base de datos", value: "+300.000" },
                { label: "Países con presencia", value: "15" },
                { label: "Año de fundación", value: "2024" },
                { label: "Idiomas soportados", value: "Español, Inglés, Italiano, Francés" },
                { label: "Integraciones TPV disponibles", value: "22+" },
              ]}
            />
          </ScrollReveal>
        </section>

        {/* Expertise areas */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  Áreas de expertise
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                  Lo que sabemos hacer
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-background p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <area.icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-2">{area.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-16">
          <ScrollReveal>
            <MethodologyBox
              title="Cómo trabajamos"
              intro="Nuestra metodología combina rigor técnico con experiencia real en restauración. Cada funcionalidad, recomendación o benchmark que generamos sigue un proceso definido."
              steps={[
                { title: "Recogida de datos", description: "Integramos la carta existente del restaurante, sus datos de venta (si hay TPV conectado) y la información de stock. No inventamos datos — trabajamos con lo que el restaurante ya tiene." },
                { title: "Análisis y benchmarking", description: "Comparamos la estructura de la carta con benchmarks del sector: distribución de precios, ratio copa/botella, diversidad de regiones, balance por tipo. Los benchmarks se generan a partir de datos agregados y anónimos." },
                { title: "Generación de recomendaciones", description: "El motor de IA combina datos de la carta, patrones de venta y objetivos comerciales para generar sugerencias accionables: qué recomendar, qué rotar, qué precio ajustar." },
                { title: "Validación y contexto", description: "Cada recomendación se presenta con contexto y limitaciones. Indicamos el grado de confianza, los datos en los que se basa y las variables que pueden afectar al resultado." },
                { title: "Medición continua", description: "Los restaurantes con TPV integrado pueden medir el impacto real de los cambios: variación de ticket medio, rotación de referencias, evolución de margen." },
              ]}
              validatedBy="Metodología basada en prácticas de gestión de vino en restauración real, validada con profesionales del sector."
            />
          </ScrollReveal>
        </section>

        {/* How we measure results */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                  Transparencia
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  Cómo medimos resultados
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No todas las métricas son iguales. Así es como medimos y comunicamos el impacto de Winerim.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Métricas que usamos", items: ["Ticket medio de vino (€ por mesa)", "Ratio de venta copa vs. botella", "Rotación de referencias (ventas/mes por referencia)", "Margen bruto de la categoría vino", "% de referencias sin movimiento (vinos muertos)"] },
                { icon: Shield, title: "Cómo comunicamos los datos", items: ["Los potenciales de mejora se presentan como rangos, no como cifras absolutas", "Indicamos el contexto: tipo de restaurante, tamaño de carta, duración del análisis", "Las cifras globales (bodegas, referencias, países) se actualizan periódicamente con datos verificados", "Los benchmarks son promedios orientativos — cada restaurante es diferente"] },
              ].map((block, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-2xl border border-border bg-background p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center">
                        <block.icon size={16} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-sm font-bold">{block.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-wine mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Content validation */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-16">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold">Quién valida nuestro contenido</h2>
                  <p className="text-xs text-muted-foreground">Política editorial</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Todo el contenido publicado en Winerim — guías, benchmarks, playbooks, artículos y herramientas —
                  es revisado por profesionales con experiencia en al menos una de estas áreas:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2"><span className="text-wine shrink-0">—</span>Sommellerie y gestión de carta de vinos</li>
                  <li className="flex items-start gap-2"><span className="text-wine shrink-0">—</span>Dirección y operación de restaurantes</li>
                  <li className="flex items-start gap-2"><span className="text-wine shrink-0">—</span>Análisis de datos aplicado a hostelería</li>
                  <li className="flex items-start gap-2"><span className="text-wine shrink-0">—</span>Tecnología y producto SaaS para restauración</li>
                </ul>
                <p>
                  Los datos de mercado se contrastan con fuentes del sector siempre que es posible.
                  Cuando una cifra es una estimación o un promedio, se indica explícitamente.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQs */}
        <FAQSection faqs={faqs} schemaId="sobre-winerim" />

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <InternalLinks
            links={[
              { to: localePath("/que-es-winerim"), label: "¿Qué es Winerim?", type: "solution" },
              { to: localePath("/funcionalidades"), label: "Funcionalidades", type: "solution" },
              { to: localePath("/integraciones"), label: "Integraciones", type: "solution" },
              { to: localePath("/clientes"), label: "Clientes", type: "solution" },
              { to: localePath("/casos-exito"), label: "Casos de éxito", type: "solution" },
              { to: "/benchmarks-playbooks", label: "Benchmarks & Playbooks", type: "resource" },
              { to: localePath("/guias-y-recursos"), label: "Guías y recursos", type: "guide" },
              { to: localePath("/herramientas"), label: "Herramientas", type: "tool" },
            ]}
          />
        </section>

        {/* CTA */}
        <section className="py-16 bg-wine/5">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
                ¿Quieres saber más?
              </h2>
              <p className="text-muted-foreground mb-8">
                Solicita una demo y descubre cómo Winerim puede ayudar a tu restaurante.
              </p>
              <Link
                to={localePath("/demo")}
                className="inline-flex px-8 py-3 rounded-full bg-wine text-white font-semibold hover:bg-wine/90 transition-colors"
              >
                Solicitar demo gratuita
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SobreWinerim;
