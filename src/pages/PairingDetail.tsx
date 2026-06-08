import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Utensils, ArrowRight, Wine, Target, Users, Lightbulb,
  AlertTriangle, TrendingUp, ShieldCheck, MapPin, Grape,
  MessageSquare, Palette
} from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import RelatedWineLibraryLinks from "@/components/biblioteca/RelatedWineLibraryLinks";
import WineLibraryOperationalDepth from "@/components/biblioteca/WineLibraryOperationalDepth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  type PairingEntry,
} from "@/data/pairingsLibrary";
import { getPairingEditorialProfile, type LocalizedPairingEditorialProfile } from "@/data/wineLibraryPairingEditorial";
import { getStrategicWineLibraryLinks } from "@/data/wineLibraryLinks";
import {
  getLocalizedCategoryMeta,
  getLocalizedPairingBySlug,
  getLocalizedPairingEntries,
} from "@/data/pairingsLibraryI18n";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const pairingDetailCopy: Record<string, {
  principles: string;
  combinations: string;
  recommendedStyles: string;
  recommendedRegions: string;
  frequentGrapes: string;
  commonMistakes: string;
  winerimReading: string;
  hospitalityUse: string;
  cartaUsage: string;
  salaLanguage: string;
  safeOptions: string;
  differentialOptions: string;
  restaurantMistakes: string;
  whenClassicLoses: string;
  bestConcepts: string;
  relatedPairings: string;
  faqTitle: string;
  ctaTitle: string;
  ctaText: string;
}> = {
  es: {
    principles: "Principios clave",
    combinations: "Combinaciones recomendadas",
    recommendedStyles: "Estilos recomendados",
    recommendedRegions: "Regiones recomendadas",
    frequentGrapes: "Uvas frecuentes",
    commonMistakes: "Errores frecuentes",
    winerimReading: "Lectura Winerim",
    hospitalityUse: "Cómo usar este maridaje en hostelería",
    cartaUsage: "Cómo usarlo en carta",
    salaLanguage: "Lenguaje de sala",
    safeOptions: "Opciones seguras",
    differentialOptions: "Opciones diferenciales",
    restaurantMistakes: "Errores del restaurante",
    whenClassicLoses: "Cuándo lo clásico pierde fuerza",
    bestConcepts: "Mejor para estos conceptos",
    relatedPairings: "Maridajes relacionados",
    faqTitle: "Preguntas frecuentes",
    ctaTitle: "¿Quieres que tu carta sugiera maridajes con inteligencia?",
    ctaText: "Winerim conecta carta, platos y maridajes para que tu equipo recomiende mejor y tu cliente elija con criterio.",
  },
  en: {
    principles: "Key principles",
    combinations: "Recommended combinations",
    recommendedStyles: "Recommended styles",
    recommendedRegions: "Recommended regions",
    frequentGrapes: "Frequent grapes",
    commonMistakes: "Common mistakes",
    winerimReading: "Winerim reading",
    hospitalityUse: "How to use this pairing in hospitality",
    cartaUsage: "How to use it on the list",
    salaLanguage: "Floor language",
    safeOptions: "Safe options",
    differentialOptions: "Differentiating options",
    restaurantMistakes: "Restaurant mistakes",
    whenClassicLoses: "When the classic loses force",
    bestConcepts: "Best for these concepts",
    relatedPairings: "Related pairings",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Want your list to suggest pairings with intelligence?",
    ctaText: "Winerim connects wine lists, dishes and pairings so your team recommends better and guests choose with confidence.",
  },
  it: {
    principles: "Principi chiave",
    combinations: "Combinazioni consigliate",
    recommendedStyles: "Stili consigliati",
    recommendedRegions: "Regioni consigliate",
    frequentGrapes: "Vitigni frequenti",
    commonMistakes: "Errori frequenti",
    winerimReading: "Lettura Winerim",
    hospitalityUse: "Come usare questo abbinamento nella ristorazione",
    cartaUsage: "Come usarlo in carta",
    salaLanguage: "Linguaggio di sala",
    safeOptions: "Opzioni sicure",
    differentialOptions: "Opzioni differenzianti",
    restaurantMistakes: "Errori del ristorante",
    whenClassicLoses: "Quando il classico perde forza",
    bestConcepts: "Ideale per questi concept",
    relatedPairings: "Abbinamenti correlati",
    faqTitle: "Domande frequenti",
    ctaTitle: "Vuoi che la tua carta suggerisca abbinamenti con intelligenza?",
    ctaText: "Winerim connette carta, piatti e abbinamenti per aiutare la sala a raccomandare meglio.",
  },
  fr: {
    principles: "Principes cles",
    combinations: "Combinaisons recommandees",
    recommendedStyles: "Styles recommandes",
    recommendedRegions: "Regions recommandees",
    frequentGrapes: "Cepages frequents",
    commonMistakes: "Erreurs frequentes",
    winerimReading: "Lecture Winerim",
    hospitalityUse: "Comment utiliser cet accord en restauration",
    cartaUsage: "Comment l'utiliser en carte",
    salaLanguage: "Langage de salle",
    safeOptions: "Options sures",
    differentialOptions: "Options differentiantes",
    restaurantMistakes: "Erreurs du restaurant",
    whenClassicLoses: "Quand le classique perd de la force",
    bestConcepts: "Ideal pour ces concepts",
    relatedPairings: "Accords associes",
    faqTitle: "Questions frequentes",
    ctaTitle: "Votre carte doit-elle suggerer des accords avec intelligence ?",
    ctaText: "Winerim relie carte, plats et accords pour aider l'equipe a mieux recommander.",
  },
  de: {
    principles: "Schlusselprinzipien",
    combinations: "Empfohlene Kombinationen",
    recommendedStyles: "Empfohlene Stile",
    recommendedRegions: "Empfohlene Regionen",
    frequentGrapes: "Haufige Rebsorten",
    commonMistakes: "Haufige Fehler",
    winerimReading: "Winerim-Lesart",
    hospitalityUse: "Wie dieses Pairing in der Gastronomie genutzt wird",
    cartaUsage: "Nutzung auf der Weinkarte",
    salaLanguage: "Servicesprache",
    safeOptions: "Sichere Optionen",
    differentialOptions: "Differenzierende Optionen",
    restaurantMistakes: "Restaurantfehler",
    whenClassicLoses: "Wann der Klassiker an Kraft verliert",
    bestConcepts: "Am besten fur diese Konzepte",
    relatedPairings: "Verwandte Pairings",
    faqTitle: "Haufige Fragen",
    ctaTitle: "Soll Ihre Karte Pairings intelligent vorschlagen?",
    ctaText: "Winerim verbindet Weinkarte, Gerichte und Pairings, damit Ihr Team besser empfiehlt.",
  },
  pt: {
    principles: "Principios chave",
    combinations: "Combinacoes recomendadas",
    recommendedStyles: "Estilos recomendados",
    recommendedRegions: "Regioes recomendadas",
    frequentGrapes: "Castas frequentes",
    commonMistakes: "Erros frequentes",
    winerimReading: "Leitura Winerim",
    hospitalityUse: "Como usar esta harmonizacao em restauracao",
    cartaUsage: "Como usar na carta",
    salaLanguage: "Linguagem de sala",
    safeOptions: "Opcoes seguras",
    differentialOptions: "Opcoes diferenciais",
    restaurantMistakes: "Erros do restaurante",
    whenClassicLoses: "Quando o classico perde forca",
    bestConcepts: "Melhor para estes conceitos",
    relatedPairings: "Harmonizacoes relacionadas",
    faqTitle: "Perguntas frequentes",
    ctaTitle: "Quer que a sua carta sugira harmonizacoes com inteligencia?",
    ctaText: "Winerim liga carta, pratos e harmonizacoes para que a equipa recomende melhor.",
  },
};

const PairingDetail = () => {
  const { pairing: pairingSlug } = useParams<{ pairing: string }>();
  const { lang } = useLanguage();
  const langKey = String(lang);
  const ui = getWineLibraryUi(lang);
  const copy = pairingDetailCopy[langKey] || pairingDetailCopy.en;
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const entry = pairingSlug ? getLocalizedPairingBySlug(pairingSlug, lang) : undefined;
  const pairingEntries = getLocalizedPairingEntries(lang);
  const editorial = entry ? getPairingEditorialProfile(entry.slug, langKey, entry.name) : undefined;

  useEffect(() => {
    if (!entry) return;
    const pageUrl = getWineLibraryUrl(lang, `/biblioteca-vino/maridajes/${entry.slug}`);
    const schema = document.createElement("script");
    schema.id = "pairing-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: entry.name,
          description: entry.seo.description,
          author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          mainEntityOfPage: pageUrl,
          about: { "@id": `${pageUrl}#pairing-term` },
        },
        {
          "@id": `${pageUrl}#pairing-term`,
          "@type": "DefinedTerm",
          name: entry.name,
          description: entry.description,
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Winerim Wine Library",
            url: getWineLibraryUrl(lang, "/biblioteca-vino/maridajes"),
          },
        },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("pairing-detail-jsonld")?.remove(); };
  }, [entry, pairingSlug, lang]);

  if (!entry) return <Navigate to={linkTo("/biblioteca-vino/maridajes")} replace />;

  const meta = getLocalizedCategoryMeta(entry.category, lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={entry.seo.title} description={entry.seo.description} url={getWineLibraryUrl(lang, `/biblioteca-vino/maridajes/${entry.slug}`)} type="article" hreflang={getWineLibraryHreflang(`/biblioteca-vino/maridajes/${entry.slug}`)} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.pairings, href: linkTo("/biblioteca-vino/maridajes") },
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.principles}</h2>
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.combinations}</h2>
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
                <h3 className="font-heading text-base font-semibold">{copy.recommendedStyles}</h3>
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
                <h3 className="font-heading text-base font-semibold">{copy.recommendedRegions}</h3>
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
                <h3 className="font-heading text-base font-semibold">{copy.frequentGrapes}</h3>
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

      {editorial ? (
        <PairingServiceIntelligenceSection profile={editorial} />
      ) : (
        <WineLibraryOperationalDepth
          entityName={entry.name}
          kind="pairing"
          lang={lang}
          ctaHref={linkTo("/demo")}
          ctaLabel={ui.actions.requestDemo}
        />
      )}

      {/* COMMON MISTAKES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.commonMistakes}</h2>
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
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{copy.winerimReading}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.hospitalityUse}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: copy.cartaUsage, text: entry.cartaUsage },
              { icon: MessageSquare, title: copy.salaLanguage, text: entry.salaLanguage },
              { icon: ShieldCheck, title: copy.safeOptions, text: entry.safeOptions },
              { icon: TrendingUp, title: copy.differentialOptions, text: entry.differentialOptions },
              { icon: AlertTriangle, title: copy.restaurantMistakes, text: entry.restaurantMistakes },
              { icon: Lightbulb, title: copy.whenClassicLoses, text: entry.whenClassicLoses },
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
              <h3 className="font-heading text-base font-semibold mb-3">{copy.bestConcepts}</h3>
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
              <h3 className="font-heading text-lg font-semibold mb-4">{copy.relatedPairings}</h3>
              <div className="flex flex-wrap gap-3">
                {entry.relatedPairings.map(slug => {
                  const related = pairingEntries.find(e => e.slug === slug || e.id === slug);
                  if (!related) return null;
                  const rMeta = getLocalizedCategoryMeta(related.category, lang);
                  return (
                    <Link key={slug} to={linkTo(`/biblioteca-vino/maridajes/${related.slug}`)}
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
        <FAQSection
          faqs={editorial ? [...entry.faqs, ...editorial.faqs] : entry.faqs}
          title={copy.faqTitle}
          schemaId={`pairing-${entry.slug}`}
        />
      )}

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <RelatedWineLibraryLinks
            items={[
              ...getStrategicWineLibraryLinks("pairing", entry.slug),
              ...entry.recommendedStyles.map((name) => ({ name, hint: "style" as const })),
              ...entry.recommendedRegions.map((name) => ({ name, hint: "region" as const })),
              ...entry.recommendedGrapes.map((name) => ({ name, hint: "grape" as const })),
              ...entry.alternatives.map((name) => ({ name, hint: "style" as const })),
              ...entry.relatedPairings.map((name) => ({ name, hint: "pairing" as const })),
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  {copy.ctaTitle}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  {copy.ctaText}
                </p>
                <Link to={linkTo("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {ui.actions.requestDemo} <ArrowRight size={16} />
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

const PairingFactCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">
      <Wine size={16} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="font-heading text-sm font-semibold">{value}</p>
  </div>
);

const PairingServiceIntelligenceSection = ({ profile }: { profile: LocalizedPairingEditorialProfile }) => (
  <section className="section-padding bg-gradient-dark">
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <ScrollReveal className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target size={18} className="text-wine" />
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{profile.eyebrow}</p>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold">{profile.title}</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">{profile.subtitle}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {profile.facts.map((fact) => (
          <PairingFactCard key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {profile.sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.04}>
            <div className="bg-gradient-card rounded-xl border border-border p-6">
              <h3 className="font-heading text-sm font-semibold text-wine mb-2">{section.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{section.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-8">
        <h3 className="font-heading text-lg font-semibold mb-4">{profile.menuTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {profile.menuHooks.map((hook) => (
            <div key={hook} className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-4">
              <Utensils size={15} className="text-wine shrink-0" />
              <span className="text-sm text-muted-foreground">{hook}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default PairingDetail;
