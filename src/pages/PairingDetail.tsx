import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Utensils, ArrowRight, Wine, Target, Users, Lightbulb,
  AlertTriangle, TrendingUp, ShieldCheck, MapPin, Grape,
  MessageSquare, Palette
} from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  getPairingBySlug,
  categoryMeta,
  pairingEntries,
  type PairingEntry,
} from "@/data/pairingsLibrary";

/* i18n translations */
const i18n = {
  es: {
    biblioteca: "Biblioteca del Vino",
    pairings: "Maridajes",
    keyPrinciples: "Principios clave",
    recommendedCombinations: "Combinaciones recomendadas",
    recommendedStyles: "Estilos recomendados",
    recommendedRegions: "Regiones recomendadas",
    commonGrapes: "Uvas frecuentes",
    commonMistakes: "Errores frecuentes",
    winerimReading: "Lectura Winerim",
    howUseInHospitality: "Cómo usar este maridaje en hostelería",
    howUseInCarta: "Cómo usarlo en carta",
    salaLanguage: "Lenguaje de sala",
    safeOptions: "Opciones seguras",
    differentialOptions: "Opciones diferenciales",
    restaurantMistakes: "Errores del restaurante",
    whenClassicLoses: "Cuándo lo clásico pierde fuerza",
    bestForConcepts: "Mejor para estos conceptos",
    relatedPairings: "Maridajes relacionados",
    frequentQuestions: "Preguntas frecuentes",
    suggestSmartPairings: "¿Quieres que tu carta sugiera maridajes con inteligencia?",
    winerimConnects: "Winerim conecta carta, platos y maridajes para que tu equipo recomiende mejor y tu cliente elija con criterio.",
    requestDemo: "Solicitar demo",
  },
  en: {
    biblioteca: "Wine Library",
    pairings: "Pairings",
    keyPrinciples: "Key Principles",
    recommendedCombinations: "Recommended Combinations",
    recommendedStyles: "Recommended Styles",
    recommendedRegions: "Recommended Regions",
    commonGrapes: "Common Grapes",
    commonMistakes: "Common Mistakes",
    winerimReading: "Winerim Reading",
    howUseInHospitality: "How to Use This Pairing in Hospitality",
    howUseInCarta: "How to Use It on Wine Lists",
    salaLanguage: "Floor Language",
    safeOptions: "Safe Options",
    differentialOptions: "Differential Options",
    restaurantMistakes: "Restaurant Mistakes",
    whenClassicLoses: "When Classic Loses Strength",
    bestForConcepts: "Best for These Concepts",
    relatedPairings: "Related Pairings",
    frequentQuestions: "Frequently Asked Questions",
    suggestSmartPairings: "Do You Want Your Wine List to Suggest Pairings Intelligently?",
    winerimConnects: "Winerim connects wine lists, dishes, and pairings so your team recommends better and your clients choose with criteria.",
    requestDemo: "Request Demo",
  },
  it: {
    biblioteca: "Biblioteca del Vino",
    pairings: "Abbinamenti",
    keyPrinciples: "Principi Chiave",
    recommendedCombinations: "Combinazioni Consigliate",
    recommendedStyles: "Stili Consigliati",
    recommendedRegions: "Regioni Consigliate",
    commonGrapes: "Uve Comuni",
    commonMistakes: "Errori Comuni",
    winerimReading: "Lettura Winerim",
    howUseInHospitality: "Come Usare Questo Abbinamento nell'Ospitalita",
    howUseInCarta: "Come Usarlo sulla Carta",
    salaLanguage: "Linguaggio di Sala",
    safeOptions: "Opzioni Sicure",
    differentialOptions: "Opzioni Differenziali",
    restaurantMistakes: "Errori del Ristorante",
    whenClassicLoses: "Quando il Classico Perde Forza",
    bestForConcepts: "Migliore per Questi Concetti",
    relatedPairings: "Abbinamenti Correlati",
    frequentQuestions: "Domande Frequenti",
    suggestSmartPairings: "Vuoi che la tua carta suggerisca abbinamenti con intelligenza?",
    winerimConnects: "Winerim collega carta, piatti e abbinamenti affinche il tuo team consigli meglio e il tuo cliente scelga con criterio.",
    requestDemo: "Richiedi Demo",
  },
  fr: {
    biblioteca: "Bibliotheque du Vin",
    pairings: "Accords",
    keyPrinciples: "Principes Cles",
    recommendedCombinations: "Combinaisons Recommandees",
    recommendedStyles: "Styles Recommandes",
    recommendedRegions: "Regions Recommandees",
    commonGrapes: "Cepages Communs",
    commonMistakes: "Erreurs Courantes",
    winerimReading: "Lecture Winerim",
    howUseInHospitality: "Comment Utiliser cet Accord dans l'Hospitalite",
    howUseInCarta: "Comment l'Utiliser sur la Carte",
    salaLanguage: "Langage de Salle",
    safeOptions: "Options Securisees",
    differentialOptions: "Options Differentielles",
    restaurantMistakes: "Erreurs de Restaurant",
    whenClassicLoses: "Quand le Classique Perd de la Force",
    bestForConcepts: "Meilleur pour Ces Concepts",
    relatedPairings: "Accords Associes",
    frequentQuestions: "Questions Frequentes",
    suggestSmartPairings: "Voulez-vous que votre carte suggere des accords avec intelligence?",
    winerimConnects: "Winerim relie la carte, les plats et les accords pour que votre equipe recommande mieux et votre client choisisse avec criteres.",
    requestDemo: "Demander une Demonstration",
  },
  de: {
    biblioteca: "Weinbibliothek",
    pairings: "Speisebegleitungen",
    keyPrinciples: "Schlusselprinzipien",
    recommendedCombinations: "Empfohlene Kombinationen",
    recommendedStyles: "Empfohlene Weinstile",
    recommendedRegions: "Empfohlene Weinregionen",
    commonGrapes: "Haufige Rebsorten",
    commonMistakes: "Haufige Fehler",
    winerimReading: "Winerim-Lesung",
    howUseInHospitality: "Wie man diese Speisebegleitung in der Gastronomie nutzt",
    howUseInCarta: "Wie man es auf der Weinkarte nutzt",
    salaLanguage: "Bedienungssprache",
    safeOptions: "Sichere Optionen",
    differentialOptions: "Differentielle Optionen",
    restaurantMistakes: "Fehler des Restaurants",
    whenClassicLoses: "Wenn das Klassische an Kraft verliert",
    bestForConcepts: "Am besten fur diese Konzepte",
    relatedPairings: "Verwandte Speisebegleitungen",
    frequentQuestions: "Haufig gestellte Fragen",
    suggestSmartPairings: "Mochten Sie, dass Ihre Weinkarte Speisebegleitungen intelligent vorschlagt?",
    winerimConnects: "Winerim verbindet Weinkarte, Gerichte und Speisebegleitungen, damit Ihr Team besser empfiehlt und Ihre Gaste mit Kriterium wahlen.",
    requestDemo: "Demo anfordern",
  },
  pt: {
    biblioteca: "Biblioteca do Vinho",
    pairings: "Harmonizacoes",
    keyPrinciples: "Principios-Chave",
    recommendedCombinations: "Combinacoes Recomendadas",
    recommendedStyles: "Estilos Recomendados",
    recommendedRegions: "Regioes Recomendadas",
    commonGrapes: "Castas Frequentes",
    commonMistakes: "Erros Frequentes",
    winerimReading: "Leitura Winerim",
    howUseInHospitality: "Como Usar esta Harmonizacao na Hospitalidade",
    howUseInCarta: "Como Usa-lo na Carta",
    salaLanguage: "Linguagem de Sala",
    safeOptions: "Opcoes Seguras",
    differentialOptions: "Opcoes Diferenciadas",
    restaurantMistakes: "Erros do Restaurante",
    whenClassicLoses: "Quando o Classico Perde Forca",
    bestForConcepts: "Melhor para Estes Conceitos",
    relatedPairings: "Harmonizacoes Relacionadas",
    frequentQuestions: "Perguntas Frequentes",
    suggestSmartPairings: "Quer que sua carta sugira harmonizacoes com inteligencia?",
    winerimConnects: "Winerim conecta carta, pratos e harmonizacoes para que sua equipe recomende melhor e seu cliente escolha com criterio.",
    requestDemo: "Solicitar Demo",
  },
};

const PairingDetail = () => {
  const { allLangPaths } = useLanguage();
  const { pairing: pairingSlug } = useParams<{ pairing: string }>();
  const entry = pairingSlug ? getPairingBySlug(pairingSlug) : undefined;

  useEffect(() => {
    if (!entry) return;
    const schema = document.createElement("script");
    schema.id = "pairing-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: entry.seo.description,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/maridajes/${entry.slug}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("pairing-detail-jsonld")?.remove(); };
  }, [entry, pairingSlug]);

  if (!entry) return <Navigate to="/biblioteca-vino/maridajes" replace />;

  const meta = categoryMeta[entry.category];

  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={entry.seo.title} description={entry.seo.description} url={`https://winerim.wine/biblioteca-vino/maridajes/${entry.slug}`} type="article"
        hreflang={allLangPaths("/biblioteca-vino/maridajes")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.biblioteca, href: "/biblioteca-vino" },
            { label: t.pairings, href: "/biblioteca-vino/maridajes" },
            { label: entry.name },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <span className="text-sm">{meta.emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{meta.label}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6"
          >
            {entry.name}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {entry.description}
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding pt-0">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{entry.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.keyPrinciples}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {entry.principles.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 bg-gradient-card border border-border rounded-xl p-5">
                  <span className="text-wine font-bold text-lg shrink-0">{i + 1}</span>
                  <p className="text-sm leading-relaxed">{p}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISHES TABLE */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.recommendedCombinations}</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {entry.dishes.map((dish, i) => (
              <ScrollReveal key={dish.dish} delay={i * 0.04}>
                <div className="bg-gradient-card border border-border rounded-xl p-5 md:p-6">
                  <div className="md:flex md:items-start md:gap-6">
                    <div className="md:w-1/3 mb-3 md:mb-0">
                      <h3 className="font-heading text-base font-semibold text-wine">{dish.dish}</h3>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {dish.wines.map(w => (
                          <span key={w} className="text-xs bg-wine/10 text-wine px-2.5 py-1 rounded-full">{w}</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{dish.notes}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">{t.recommendedStyles}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedStyles.map(s => (
                  <LinkedTag key={s} name={s} hint="style" />
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">{t.recommendedRegions}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedRegions.map(r => (
                  <LinkedTag key={r} name={r} hint="region" />
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Grape size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">{t.commonGrapes}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedGrapes.map(g => (
                  <LinkedTag key={g} name={g} hint="grape" />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.commonMistakes}</h2>
            </div>
            <div className="space-y-3">
              {entry.commonMistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                  <span className="text-destructive shrink-0">✗</span>
                  <p className="text-sm">{m}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WINERIM LAYER */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.winerimReading}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.howUseInHospitality}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: t.howUseInCarta, text: entry.cartaUsage },
              { icon: MessageSquare, title: t.salaLanguage, text: entry.salaLanguage },
              { icon: ShieldCheck, title: t.safeOptions, text: entry.safeOptions },
              { icon: TrendingUp, title: t.differentialOptions, text: entry.differentialOptions },
              { icon: AlertTriangle, title: t.restaurantMistakes, text: entry.restaurantMistakes },
              { icon: Lightbulb, title: t.whenClassicLoses, text: entry.whenClassicLoses },
            ].map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.06}>
                <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <block.icon size={18} className="text-wine shrink-0" />
                    <h3 className="font-heading text-base font-semibold">{block.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Best concepts */}
          <ScrollReveal className="mt-6">
            <div className="bg-gradient-card border border-border rounded-xl p-6">
              <h3 className="font-heading text-base font-semibold mb-3">{t.bestForConcepts}</h3>
              <div className="flex flex-wrap gap-2">
                {entry.bestConcepts.map(c => (
                  <span key={c} className="text-sm bg-accent/50 px-3 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Related pairings */}
          {entry.relatedPairings.length > 0 && (
            <ScrollReveal className="mt-6">
              <h3 className="font-heading text-lg font-semibold mb-4">{t.relatedPairings}</h3>
              <div className="flex flex-wrap gap-3">
                {entry.relatedPairings.map(slug => {
                  const related = pairingEntries.find(e => e.slug === slug || e.id === slug);
                  if (!related) return null;
                  const rMeta = categoryMeta[related.category];
                  return (
                    <Link key={slug} to={`/biblioteca-vino/maridajes/${related.slug}`}
                      className="flex items-center gap-2 bg-gradient-card border border-border rounded-lg px-4 py-2 hover:border-wine/30 transition-all text-sm"
                    >
                      <span>{rMeta.emoji}</span>
                      <span>{related.name}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FAQs */}
      {entry.faqs.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.frequentQuestions}</h2></ScrollReveal>
            <FAQSection faqs={entry.faqs} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  {t.suggestSmartPairings}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  {t.winerimConnects}
                </p>
                <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {t.requestDemo} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PairingDetail;
