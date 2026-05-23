import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { comparisons } from "@/data/comparisons";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

const i18n: I18nMap<{
  seoTitle: string; seoDesc: string; badge: string; h1: string; h1h: string; subtitle: string;
  viewComp: string; nextTitle: string; nextSub: string; ctaTitle1: string; ctaTitleH: string; ctaSub: string; ctaBtn: string;
  breadComparativas: string; relatedTitle: string;
  faqs: { q: string; a: string }[];
  steps: { to: string; label: string; description: string; type: "solution" | "tool" }[];
  links: { to: string; label: string; type: "solution" | "resource" | "tool" | "guide" }[];
}> = {
  es: {
    seoTitle: "Comparativas — Winerim vs Alternativas | Winerim",
    seoDesc: "Compara Winerim con cartas PDF, QR simples, cartas impresas, gestión manual y menús digitales genéricos. Datos claros para decidir.",
    badge: "Comparativas BOFU", h1: "Winerim vs ", h1h: "alternativas",
    subtitle: "Comparativas claras y honestas para que puedas decidir qué solución encaja mejor en tu restaurante. Sin ataques vacíos, con datos reales.",
    viewComp: "Ver comparativa", nextTitle: "Siguientes pasos", nextSub: "De la comparativa a la acción.",
    ctaTitle1: "¿Quieres ver Winerim con ", ctaTitleH: "tu carta real", ctaSub: "Demo personalizada gratuita. Sin compromiso.", ctaBtn: "Solicitar demo",
    breadComparativas: "Comparativas", relatedTitle: "Contenido relacionado",
    faqs: [
      { q: "¿Por qué comparar Winerim con otras opciones?", a: "Para que puedas tomar una decisión informada. Cada restaurante tiene necesidades diferentes y no siempre se necesita la herramienta más completa. Estas comparativas te ayudan a decidir qué encaja mejor en tu caso." },
      { q: "¿Winerim sustituye al sommelier?", a: "No. Winerim complementa al equipo de sala. En restaurantes con sommelier, amplifica su alcance. En restaurantes sin sommelier, actúa como asistente inteligente." },
      { q: "¿Puedo probar Winerim antes de decidir?", a: "Sí. Ofrecemos una demo personalizada gratuita con tu carta real para que veas cómo funciona en tu caso concreto." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Descubre Winerim en detalle", description: "Todas las funcionalidades del software de carta de vinos.", type: "solution" },
      { to: "/casos-exito", label: "Casos de éxito reales", description: "Cómo restaurantes reales usan Winerim y qué resultados obtienen.", type: "solution" },
      { to: "/analisis-carta", label: "Analiza tu carta gratis", description: "Sube tu carta y recibe un diagnóstico con recomendaciones.", type: "tool" },
      { to: "/demo", label: "Solicitar demo personalizada", description: "Demo con tu carta real. Sin compromiso.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "solution" },
      { to: "/precios", label: "Planes y precios de Winerim", type: "resource" },
      { to: "/herramientas", label: "Herramientas gratuitas de análisis", type: "tool" },
      { to: "/article/mejor-software-carta-vinos-restaurante", label: "Mejor software de carta de vinos 2026", type: "guide" },
      { to: "/benchmarks-playbooks", label: "Benchmarks y playbooks del sector", type: "resource" },
    ],
  },
  en: {
    seoTitle: "Comparisons — Winerim vs Alternatives | Winerim",
    seoDesc: "Compare Winerim with PDF menus, basic QR codes, printed lists, manual management and generic digital menus. Clear data to decide.",
    badge: "BOFU Comparisons", h1: "Winerim vs ", h1h: "alternatives",
    subtitle: "Clear, honest comparisons so you can decide which solution fits your restaurant best. No empty attacks, real data.",
    viewComp: "View comparison", nextTitle: "Next steps", nextSub: "From comparison to action.",
    ctaTitle1: "Want to see Winerim with ", ctaTitleH: "your real wine list", ctaSub: "Free personalised demo. No commitment.", ctaBtn: "Request demo",
    breadComparativas: "Comparisons", relatedTitle: "Related content",
    faqs: [
      { q: "Why compare Winerim with other options?", a: "So you can make an informed decision. Every restaurant has different needs and doesn't always need the most complete tool. These comparisons help you decide what fits your case." },
      { q: "Does Winerim replace the sommelier?", a: "No. Winerim complements the floor team. With a sommelier, it amplifies their reach. Without one, it acts as an intelligent assistant." },
      { q: "Can I try Winerim before deciding?", a: "Yes. We offer a free personalised demo with your real list so you can see how it works for your specific case." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Discover Winerim in detail", description: "All wine list software features.", type: "solution" },
      { to: "/casos-exito", label: "Real case studies", description: "How real restaurants use Winerim and what results they get.", type: "solution" },
      { to: "/analisis-carta", label: "Analyse your list for free", description: "Upload your list and receive a diagnostic with recommendations.", type: "tool" },
      { to: "/demo", label: "Request personalised demo", description: "Demo with your real list. No commitment.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "All Winerim features", type: "solution" },
      { to: "/precios", label: "Winerim plans and pricing", type: "resource" },
      { to: "/herramientas", label: "Free analysis tools", type: "tool" },
      { to: "/benchmarks-playbooks", label: "Industry benchmarks and playbooks", type: "resource" },
    ],
  },
  it: {
    seoTitle: "Confronti — Winerim vs Alternative | Winerim",
    seoDesc: "Confronta Winerim con PDF, QR semplici, carte stampate, gestione manuale e menù digitali generici. Dati chiari per decidere.",
    badge: "Confronti BOFU", h1: "Winerim vs ", h1h: "alternative",
    subtitle: "Confronti chiari e onesti per decidere quale soluzione si adatta meglio al tuo ristorante. Nessun attacco gratuito, dati reali.",
    viewComp: "Vedi confronto", nextTitle: "Prossimi passi", nextSub: "Dal confronto all'azione.",
    ctaTitle1: "Vuoi vedere Winerim con ", ctaTitleH: "la tua carta reale", ctaSub: "Demo personalizzata gratuita. Senza impegno.", ctaBtn: "Richiedi demo",
    breadComparativas: "Confronti", relatedTitle: "Contenuti correlati",
    faqs: [
      { q: "Perché confrontare Winerim con altre opzioni?", a: "Per prendere una decisione informata. Ogni ristorante ha esigenze diverse e non sempre serve lo strumento più completo. Questi confronti ti aiutano a decidere cosa si adatta meglio al tuo caso." },
      { q: "Winerim sostituisce il sommelier?", a: "No. Winerim completa il team di sala. Con un sommelier, ne amplifica la portata. Senza, agisce come assistente intelligente." },
      { q: "Posso provare Winerim prima di decidere?", a: "Sì. Offriamo una demo personalizzata gratuita con la tua carta reale per mostrarti come funziona nel tuo caso specifico." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Scopri Winerim nel dettaglio", description: "Tutte le funzionalità del software per carte dei vini.", type: "solution" },
      { to: "/casos-exito", label: "Casi di successo reali", description: "Come i ristoranti reali usano Winerim e quali risultati ottengono.", type: "solution" },
      { to: "/analisis-carta", label: "Analizza la tua carta gratis", description: "Carica la tua carta e ricevi una diagnosi con raccomandazioni.", type: "tool" },
      { to: "/demo", label: "Richiedi demo personalizzata", description: "Demo con la tua carta reale. Senza impegno.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "Tutte le funzionalità di Winerim", type: "solution" },
      { to: "/precios", label: "Piani e prezzi di Winerim", type: "resource" },
      { to: "/herramientas", label: "Strumenti di analisi gratuiti", type: "tool" },
      { to: "/benchmarks-playbooks", label: "Benchmark e playbook del settore", type: "resource" },
    ],
  },
  fr: {
    seoTitle: "Comparatifs — Winerim vs Alternatives | Winerim",
    seoDesc: "Comparez Winerim avec les PDF, QR simples, cartes imprimées, gestion manuelle et menus numériques génériques. Des données claires pour décider.",
    badge: "Comparatifs BOFU", h1: "Winerim vs ", h1h: "alternatives",
    subtitle: "Comparatifs clairs et honnêtes pour que vous puissiez décider quelle solution convient le mieux à votre restaurant. Sans attaques gratuites, avec des données réelles.",
    viewComp: "Voir le comparatif", nextTitle: "Prochaines étapes", nextSub: "Du comparatif à l'action.",
    ctaTitle1: "Vous voulez voir Winerim avec ", ctaTitleH: "votre vraie carte", ctaSub: "Démo personnalisée gratuite. Sans engagement.", ctaBtn: "Demander une démo",
    breadComparativas: "Comparatifs", relatedTitle: "Contenu associé",
    faqs: [
      { q: "Pourquoi comparer Winerim avec d'autres options ?", a: "Pour prendre une décision éclairée. Chaque restaurant a des besoins différents et n'a pas toujours besoin de l'outil le plus complet. Ces comparatifs vous aident à décider ce qui convient le mieux à votre cas." },
      { q: "Winerim remplace-t-il le sommelier ?", a: "Non. Winerim complète l'équipe de salle. Avec un sommelier, il amplifie sa portée. Sans, il agit comme un assistant intelligent." },
      { q: "Puis-je essayer Winerim avant de décider ?", a: "Oui. Nous offrons une démo personnalisée gratuite avec votre carte réelle pour que vous voyiez comment ça fonctionne dans votre cas concret." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Découvrir Winerim en détail", description: "Toutes les fonctionnalités du logiciel de carte des vins.", type: "solution" },
      { to: "/casos-exito", label: "Cas clients réels", description: "Comment les restaurants réels utilisent Winerim et quels résultats ils obtiennent.", type: "solution" },
      { to: "/analisis-carta", label: "Analysez votre carte gratuitement", description: "Envoyez votre carte et recevez un diagnostic avec des recommandations.", type: "tool" },
      { to: "/demo", label: "Demander une démo personnalisée", description: "Démo avec votre carte réelle. Sans engagement.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "Toutes les fonctionnalités de Winerim", type: "solution" },
      { to: "/precios", label: "Plans et tarifs de Winerim", type: "resource" },
      { to: "/herramientas", label: "Outils d'analyse gratuits", type: "tool" },
      { to: "/benchmarks-playbooks", label: "Benchmarks et playbooks du secteur", type: "resource" },
    ],
  },
  de: {
    seoTitle: "Vergleiche — Winerim vs Alternativen | Winerim",
    seoDesc: "Vergleichen Sie Winerim mit PDF-Karten, einfachen QR-Codes, gedruckten Listen, manueller Verwaltung und generischen digitalen Menüs. Klare Daten für Ihre Entscheidung.",
    badge: "BOFU-Vergleiche", h1: "Winerim vs ", h1h: "Alternativen",
    subtitle: "Klare, ehrliche Vergleiche, damit Sie entscheiden können, welche Lösung am besten zu Ihrem Restaurant passt. Keine leeren Angriffe, echte Daten.",
    viewComp: "Vergleich ansehen", nextTitle: "Nächste Schritte", nextSub: "Vom Vergleich zur Aktion.",
    ctaTitle1: "Möchten Sie Winerim mit ", ctaTitleH: "Ihrer echten Weinkarte", ctaSub: "Kostenlose persönliche Demo. Unverbindlich.", ctaBtn: "Demo anfordern",
    breadComparativas: "Vergleiche", relatedTitle: "Verwandte Inhalte",
    faqs: [
      { q: "Warum Winerim mit anderen Optionen vergleichen?", a: "Damit Sie eine fundierte Entscheidung treffen können. Jedes Restaurant hat unterschiedliche Bedürfnisse und braucht nicht immer das umfangreichste Werkzeug. Diese Vergleiche helfen Ihnen, das Passende zu finden." },
      { q: "Ersetzt Winerim den Sommelier?", a: "Nein. Winerim ergänzt das Serviceteam. Mit Sommelier verstärkt es dessen Reichweite. Ohne Sommelier fungiert es als intelligenter Assistent." },
      { q: "Kann ich Winerim vor einer Entscheidung testen?", a: "Ja. Wir bieten eine kostenlose persönliche Demo mit Ihrer echten Weinkarte, damit Sie sehen, wie es in Ihrem konkreten Fall funktioniert." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Winerim im Detail entdecken", description: "Alle Funktionen der Weinkarten-Software.", type: "solution" },
      { to: "/casos-exito", label: "Echte Erfolgsgeschichten", description: "Wie echte Restaurants Winerim nutzen und welche Ergebnisse sie erzielen.", type: "solution" },
      { to: "/analisis-carta", label: "Karte kostenlos analysieren", description: "Laden Sie Ihre Karte hoch und erhalten Sie eine Diagnose mit Empfehlungen.", type: "tool" },
      { to: "/demo", label: "Persönliche Demo anfordern", description: "Demo mit Ihrer echten Karte. Unverbindlich.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "Alle Funktionen von Winerim", type: "solution" },
      { to: "/precios", label: "Pläne und Preise von Winerim", type: "resource" },
      { to: "/herramientas", label: "Kostenlose Analyse-Werkzeuge", type: "tool" },
      { to: "/benchmarks-playbooks", label: "Branchen-Benchmarks und Playbooks", type: "resource" },
    ],
  },
  pt: {
    seoTitle: "Comparações — Winerim vs Alternativas | Winerim",
    seoDesc: "Compare o Winerim com cartas PDF, QR simples, cartas impressas, gestão manual e menus digitais genéricos. Dados claros para decidir.",
    badge: "Comparações BOFU", h1: "Winerim vs ", h1h: "alternativas",
    subtitle: "Comparações claras e honestas para que possa decidir qual solução se adequa melhor ao seu restaurante. Sem ataques vazios, com dados reais.",
    viewComp: "Ver comparação", nextTitle: "Próximos passos", nextSub: "Da comparação à ação.",
    ctaTitle1: "Quer ver o Winerim com ", ctaTitleH: "a sua carta real", ctaSub: "Demo personalizada gratuita. Sem compromisso.", ctaBtn: "Pedir demo",
    breadComparativas: "Comparações", relatedTitle: "Conteúdo relacionado",
    faqs: [
      { q: "Porquê comparar o Winerim com outras opções?", a: "Para que possa tomar uma decisão informada. Cada restaurante tem necessidades diferentes e nem sempre precisa da ferramenta mais completa. Estas comparações ajudam-no a decidir o que melhor se adapta ao seu caso." },
      { q: "O Winerim substitui o escanção?", a: "Não. O Winerim complementa a equipa de sala. Com escanção, amplifica o seu alcance. Sem escanção, funciona como assistente inteligente." },
      { q: "Posso experimentar o Winerim antes de decidir?", a: "Sim. Oferecemos uma demo personalizada gratuita com a sua carta real para que veja como funciona no seu caso concreto." },
    ],
    steps: [
      { to: "/software-carta-de-vinos", label: "Descubra o Winerim em detalhe", description: "Todas as funcionalidades do software de carta de vinhos.", type: "solution" },
      { to: "/casos-exito", label: "Casos de sucesso reais", description: "Como restaurantes reais usam o Winerim e que resultados obtêm.", type: "solution" },
      { to: "/analisis-carta", label: "Analise a sua carta grátis", description: "Envie a sua carta e receba um diagnóstico com recomendações.", type: "tool" },
      { to: "/demo", label: "Pedir demo personalizada", description: "Demo com a sua carta real. Sem compromisso.", type: "solution" },
    ],
    links: [
      { to: "/funcionalidades", label: "Todas as funcionalidades do Winerim", type: "solution" },
      { to: "/precios", label: "Planos e preços do Winerim", type: "resource" },
      { to: "/herramientas", label: "Ferramentas de análise gratuitas", type: "tool" },
      { to: "/benchmarks-playbooks", label: "Benchmarks e playbooks do setor", type: "resource" },
    ],
  },
};

const Comparativas = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;
  const url = `https://winerim.wine${localePath("/comparativas")}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={url}
        hreflang={allLangPaths("/comparativas")} />
      <DynamicSchemaMarkup
        id="comparativas"
        type="CollectionPage"
        title={t.seoTitle}
        description={t.seoDesc}
        url={url}
        faqs={t.faqs}
        breadcrumbs={[
          { name: lang === "es" ? "Inicio" : lang === "en" ? "Home" : lang === "it" ? "Home" : "Accueil", url: "https://winerim.wine" },
          { name: t.breadComparativas, url },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadComparativas }]} />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Scale size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            {t.h1} <span className="text-gradient-wine italic">{t.h1h}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp, i) => (
            <ScrollReveal key={comp.slug} delay={i * 0.06}>
              <Link
                to={localePath(`/comparativa/${comp.slug}`)}
                className="group flex flex-col bg-gradient-card rounded-2xl border border-border p-6 h-full hover:border-wine/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-30 group-hover:opacity-100 transition-opacity" />
                <Scale size={20} className="text-wine mb-3" />
                <h2 className="font-heading text-lg font-bold mb-2 group-hover:text-wine transition-colors">
                  {comp.h1} <span className="italic">{comp.h1Highlight}</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {comp.seoDesc}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-wine group-hover:gap-2 transition-all">
                  {t.viewComp} <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-3xl mx-auto">
          <FAQSection faqs={t.faqs} />
        </div>
      </section>

      {/* Next steps */}
      <NextSteps title={t.nextTitle} subtitle={t.nextSub} steps={t.steps} />
      <InternalLinks title={t.relatedTitle} links={t.links} />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {t.ctaTitle1}<span className="text-gradient-wine italic">{t.ctaTitleH}</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                {t.ctaBtn} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comparativas;
