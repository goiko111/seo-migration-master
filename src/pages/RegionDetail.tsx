import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, Grape } from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import RelatedWineLibraryLinks from "@/components/biblioteca/RelatedWineLibraryLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getLocalizedCountryBySlug, getLocalizedRegionBySlug } from "@/data/regionsLibraryI18n";
import { getRegionEditorialProfile, type LocalizedRegionEditorialProfile } from "@/data/wineLibraryRegionEditorial";
import { getStrategicWineLibraryLinks } from "@/data/wineLibraryLinks";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl, wineTypeLabels } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const prestigeLabelsByLang: Record<string, Record<string, string>> = {
  es: { "icónico": "Icónico", premium: "Premium", reconocido: "Reconocido", emergente: "Emergente", local: "Local" },
  en: { "icónico": "Iconic", premium: "Premium", reconocido: "Recognized", emergente: "Emerging", local: "Local" },
  it: { "icónico": "Iconico", premium: "Premium", reconocido: "Riconosciuto", emergente: "Emergente", local: "Locale" },
  fr: { "icónico": "Emblématique", premium: "Premium", reconocido: "Reconnu", emergente: "Émergent", local: "Local" },
  de: { "icónico": "Ikonisch", premium: "Premium", reconocido: "Anerkannt", emergente: "Aufstrebend", local: "Lokal" },
  pt: { "icónico": "Icónico", premium: "Premium", reconocido: "Reconhecido", emergente: "Emergente", local: "Local" },
};

const recognitionLabelsByLang: Record<string, Record<string, string>> = {
  es: { "muy-alto": "Muy alto", "medio-alto": "Medio alto", alto: "Alto", medio: "Medio", "bajo-medio": "Bajo medio", bajo: "Bajo", "muy-bajo": "Muy bajo", nicho: "Nicho" },
  en: { "muy-alto": "Very high", "medio-alto": "Medium-high", alto: "High", medio: "Medium", "bajo-medio": "Medium-low", bajo: "Low", "muy-bajo": "Very low", nicho: "Niche" },
  it: { "muy-alto": "Molto alto", "medio-alto": "Medio alto", alto: "Alto", medio: "Medio", "bajo-medio": "Medio basso", bajo: "Basso", "muy-bajo": "Molto basso", nicho: "Nicchia" },
  fr: { "muy-alto": "Très forte", "medio-alto": "Moyenne-forte", alto: "Forte", medio: "Moyenne", "bajo-medio": "Moyenne-faible", bajo: "Faible", "muy-bajo": "Très faible", nicho: "Niche" },
  de: { "muy-alto": "Sehr hoch", "medio-alto": "Mittel-hoch", alto: "Hoch", medio: "Mittel", "bajo-medio": "Mittel-niedrig", bajo: "Niedrig", "muy-bajo": "Sehr niedrig", nicho: "Nische" },
  pt: { "muy-alto": "Muito alto", "medio-alto": "Médio alto", alto: "Alto", medio: "Médio", "bajo-medio": "Médio baixo", bajo: "Baixo", "muy-bajo": "Muito baixo", nicho: "Nicho" },
};

const roleLabelsByLang: Record<string, Record<string, string>> = {
  es: { segura: "Segura", diferencial: "Diferencial", premium: "Premium", identitaria: "Identitaria", prestigio: "Prestigio", descubrimiento: "Descubrimiento", valor: "Valor" },
  en: { segura: "Reliable", diferencial: "Differentiating", premium: "Premium", identitaria: "Identity", prestigio: "Prestige", descubrimiento: "Discovery", valor: "Value" },
  it: { segura: "Sicura", diferencial: "Differenziante", premium: "Premium", identitaria: "Identitaria", prestigio: "Prestigio", descubrimiento: "Scoperta", valor: "Valore" },
  fr: { segura: "Sûre", diferencial: "Différenciante", premium: "Premium", identitaria: "Identitaire", prestigio: "Prestige", descubrimiento: "Découverte", valor: "Valeur" },
  de: { segura: "Verlässlich", diferencial: "Differenzierend", premium: "Premium", identitaria: "Identität", prestigio: "Prestige", descubrimiento: "Entdeckung", valor: "Wert" },
  pt: { segura: "Segura", diferencial: "Diferencial", premium: "Premium", identitaria: "Identitária", prestigio: "Prestígio", descubrimiento: "Descoberta", valor: "Valor" },
};

const regionDetailCopy: Record<string, {
  alsoKnownAs: string;
  subzones: string;
  wineListSignal: string;
  highlightRegion: string;
  comparableDescription: string;
  allRegionsIn: (country: string) => string;
  worldRegions: string;
  bringRegionTitle: (name: string) => string;
}> = {
  es: {
    alsoKnownAs: "También conocida como",
    subzones: "Subzonas",
    wineListSignal: "Qué comunica en una carta",
    highlightRegion: "Cuándo conviene destacarla",
    comparableDescription: "Denominaciones que compiten en percepción o segmento similar.",
    allRegionsIn: (country) => `Todas las regiones de ${country}`,
    worldRegions: "Regiones del mundo",
    bringRegionTitle: (name) => `Lleva ${name} a tu carta con criterio`,
  },
  en: {
    alsoKnownAs: "Also known as",
    subzones: "Subzones",
    wineListSignal: "What it signals on a wine list",
    highlightRegion: "When to highlight it",
    comparableDescription: "Denominations that compete in guest perception or a similar segment.",
    allRegionsIn: (country) => `All regions in ${country}`,
    worldRegions: "Wine regions of the world",
    bringRegionTitle: (name) => `Bring ${name} into your list with criteria`,
  },
  it: {
    alsoKnownAs: "Conosciuta anche come",
    subzones: "Sottozone",
    wineListSignal: "Cosa comunica in carta",
    highlightRegion: "Quando evidenziarla",
    comparableDescription: "Denominazioni che competono per percezione o segmento simile.",
    allRegionsIn: (country) => `Tutte le regioni di ${country}`,
    worldRegions: "Regioni vinicole del mondo",
    bringRegionTitle: (name) => `Porta ${name} nella tua carta con criterio`,
  },
  fr: {
    alsoKnownAs: "Aussi connue comme",
    subzones: "Sous-zones",
    wineListSignal: "Ce qu'elle communique en carte",
    highlightRegion: "Quand la mettre en avant",
    comparableDescription: "Appellations qui concurrencent en perception ou sur un segment similaire.",
    allRegionsIn: (country) => `Toutes les régions de ${country}`,
    worldRegions: "Régions viticoles du monde",
    bringRegionTitle: (name) => `Intégrez ${name} à votre carte avec méthode`,
  },
  de: {
    alsoKnownAs: "Auch bekannt als",
    subzones: "Subzonen",
    wineListSignal: "Was die Region auf der Weinkarte signalisiert",
    highlightRegion: "Wann sie hervorgehoben werden sollte",
    comparableDescription: "Herkünfte, die in Wahrnehmung oder Segment ähnlich konkurrieren.",
    allRegionsIn: (country) => `Alle Regionen in ${country}`,
    worldRegions: "Weinregionen der Welt",
    bringRegionTitle: (name) => `${name} gezielt auf die Weinkarte bringen`,
  },
  pt: {
    alsoKnownAs: "Também conhecida como",
    subzones: "Subzonas",
    wineListSignal: "O que comunica na carta",
    highlightRegion: "Quando destacar",
    comparableDescription: "Denominações que competem em perceção ou segmento semelhante.",
    allRegionsIn: (country) => `Todas as regiões de ${country}`,
    worldRegions: "Regiões vinícolas do mundo",
    bringRegionTitle: (name) => `Leve ${name} para a sua carta com critério`,
  },
};

const RegionDetail = () => {
  const { country, region } = useParams<{ country: string; region: string }>();
  const { lang } = useLanguage();
  const langKey = String(lang);
  const ui = getWineLibraryUi(lang);
  const copy = regionDetailCopy[langKey] || regionDetailCopy.en;
  const prestigeLabels = prestigeLabelsByLang[langKey] || prestigeLabelsByLang.en;
  const recognitionLabels = recognitionLabelsByLang[langKey] || recognitionLabelsByLang.en;
  const roleLabels = roleLabelsByLang[langKey] || roleLabelsByLang.en;
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const data = region ? getLocalizedRegionBySlug(region, lang) : undefined;
  const countryData = country ? getLocalizedCountryBySlug(country, lang) : undefined;
  const editorial = data ? getRegionEditorialProfile(data.slug, langKey, data.name) : undefined;

  // JSON-LD Schema
  useEffect(() => {
    if (!data || !countryData) return;
    const pageUrl = getWineLibraryUrl(lang, `/biblioteca-vino/regiones/${country}/${region}`);
    const schema = document.createElement("script");
    schema.id = "region-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: data.name,
          description: data.description,
          author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          mainEntityOfPage: pageUrl,
          about: { "@id": `${pageUrl}#region-term` },
        },
        {
          "@id": `${pageUrl}#region-term`,
          "@type": "DefinedTerm",
          name: data.name,
          description: data.description,
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Winerim Wine Library",
            url: getWineLibraryUrl(lang, "/biblioteca-vino/regiones"),
          },
        },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("region-detail-jsonld")?.remove(); };
  }, [data, countryData, country, region, lang]);

  if (!data || !countryData) {
    return <Navigate to={country ? linkTo(`/biblioteca-vino/regiones/${country}`) : linkTo("/biblioteca-vino/regiones")} replace />;
  }

  const wineTypeLabelsForLang = wineTypeLabels[langKey as keyof typeof wineTypeLabels] || wineTypeLabels.en;
  const wineTypesValue = data.wineTypes.map((type) => wineTypeLabelsForLang[type] || type).join(", ");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        url={getWineLibraryUrl(lang, `/biblioteca-vino/regiones/${country}/${region}`)}
        hreflang={getWineLibraryHreflang(`/biblioteca-vino/regiones/${country}/${region}`)}
        type="article"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.regions, href: linkTo("/biblioteca-vino/regiones") },
            { label: countryData.name, href: linkTo(`/biblioteca-vino/regiones/${country}`) },
            { label: data.name },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
              <span>{countryData.flag}</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{data.denominationType}</span>
            </span>
            <span className="text-xs bg-wine/10 text-wine px-3 py-1.5 rounded-full">{prestigeLabels[data.prestige]}</span>
            <span className="text-xs bg-secondary/50 px-3 py-1.5 rounded-full">{ui.detail.recognition}: {recognitionLabels[data.clientRecognition]}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            {data.name}
          </motion.h1>

          {data.altNames && data.altNames.length > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-muted-foreground mb-4">
              {copy.alsoKnownAs}: {data.altNames.join(", ")}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding pt-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed">{data.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* KEY FACTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.keyFacts}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.bodegasCount && (
              <FactCard icon={<Wine size={16} />} label={ui.detail.registeredWineries} value={data.bodegasCount.toLocaleString()} />
            )}
            <FactCard icon={<MapPin size={16} />} label={ui.detail.country} value={countryData.name} />
            <FactCard icon={<Target size={16} />} label={ui.detail.type} value={data.denominationType} />
            <FactCard icon={<TrendingUp size={16} />} label={ui.detail.prestige} value={prestigeLabels[data.prestige]} />
            <FactCard icon={<Users size={16} />} label={ui.detail.recognition} value={recognitionLabels[data.clientRecognition]} />
            <FactCard icon={<Grape size={16} />} label={ui.detail.wineTypes} value={wineTypesValue} />
          </div>
        </div>
      </section>

      {/* SUBZONES */}
      {data.subzones && data.subzones.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.subzones}</h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                {data.subzones.map((sz) => (
                  <span key={sz} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium">
                    <MapPin size={12} className="inline mr-1.5 text-wine" />
                    {sz}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* GRAPES & STYLES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal>
              <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.keyGrapes}</h2>
              <div className="flex flex-wrap gap-2">
                {data.mainGrapes.map((g) => (
                  <LinkedTag key={g} name={g} hint="grape" />
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl font-semibold mb-4">{ui.detail.usualStyles}</h2>
              <div className="space-y-2">
                {data.styles.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <Wine size={14} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WINERIM LAYER — Carta Role & Reading */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb size={18} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{ui.detail.cartaVision}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.wineListSignal}</h2>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal>
              <WinerimBlock title={ui.detail.cartaPerception} content={data.cartaReading} />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <WinerimBlock title={copy.highlightRegion} content={data.whenToHighlight} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <WinerimBlock title={ui.detail.clientProfile} content={data.clientProfile} />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <WinerimBlock title={ui.detail.sellByStrategy} content={data.sellByStrategy} />
            </ScrollReveal>
          </div>

          {/* Carta roles */}
          <ScrollReveal delay={0.2} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">{ui.detail.cartaRole}</h3>
            <div className="flex flex-wrap gap-3">
              {data.cartaRole.map((role) => (
                <span key={role} className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium">
                  {roleLabels[role] || role}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {editorial && <RegionServiceIntelligenceSection profile={editorial} />}

      {/* COMPETING REGIONS */}
      {data.competingRegions.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-6">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.comparableRegions}</h2>
              <p className="text-muted-foreground text-sm mt-2">{copy.comparableDescription}</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                {data.competingRegions.map((r) => (
                  <span key={r} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm">{r}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* COMMON MISTAKES */}
      {data.commonMistakes.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle size={18} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.commonMistakes}</h2>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {data.commonMistakes.map((m, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                    <AlertTriangle size={16} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{m}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAIRINGS */}
      {data.pairings && data.pairings.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.suggestedPairings}</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.pairings.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-5">
                    <Wine size={16} className="text-wine shrink-0" />
                    <span className="text-sm">{p}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={editorial ? [...data.faqs, ...editorial.faqs] : data.faqs} schemaId={`region-${data.slug}`} />

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <RelatedWineLibraryLinks
            items={[
              ...getStrategicWineLibraryLinks("region", data.slug),
              ...data.mainGrapes.map((name) => ({ name, hint: "grape" as const })),
              ...data.styles.map((name) => ({ name, hint: "style" as const })),
              ...data.competingRegions.map((name) => ({ name, hint: "region" as const })),
              ...(data.pairings || []).map((name) => ({ name, hint: "pairing" as const })),
            ]}
          />
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-xl font-semibold">{ui.detail.keepExploring}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: linkTo(`/biblioteca-vino/regiones/${country}`), label: copy.allRegionsIn(countryData.name) },
              { to: linkTo("/biblioteca-vino/regiones"), label: copy.worldRegions },
              { to: linkTo("/biblioteca-vino"), label: ui.libraryName },
              { to: "/producto/winerim-core", label: "Winerim Core" },
              { to: linkTo("/demo"), label: ui.actions.requestDemo },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group"
              >
                <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                {copy.bringRegionTitle(data.name)}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                {ui.cta.regionsBody()}
              </p>
              <Link
                to={linkTo("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
              >
                {ui.actions.requestDemo} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────────── */
const FactCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
    <p className="font-heading text-sm font-semibold capitalize">{value}</p>
  </div>
);

const WinerimBlock = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-6">
    <h3 className="font-heading text-sm font-semibold text-wine mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
  </div>
);

const RegionServiceIntelligenceSection = ({ profile }: { profile: LocalizedRegionEditorialProfile }) => (
  <section className="section-padding bg-gradient-dark">
    <div className="max-w-5xl mx-auto">
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
          <FactCard key={fact.label} icon={<Wine size={16} />} label={fact.label} value={fact.value} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {profile.sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.04}>
            <WinerimBlock title={section.title} content={section.body} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-8">
        <h3 className="font-heading text-lg font-semibold mb-4">{profile.menuTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {profile.menuHooks.map((hook) => (
            <div key={hook} className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-4">
              <Wine size={15} className="text-wine shrink-0" />
              <span className="text-sm text-muted-foreground">{hook}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default RegionDetail;
