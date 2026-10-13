import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  Check,
  CircleX,
  Clock3,
  FileCheck2,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { PARTNER_LANDING_COPY } from "@/data/partnerLandingCopy";
import {
  calculateClientValue,
  calculatePortfolioFit,
  PARTNER_OPPORTUNITY_MODEL_VERSION,
  type ClientValueInputs,
  type PortfolioFitInputs,
} from "@/lib/partnerOpportunity";

type Currency = "EUR" | "USD" | "GBP";

const emptyClient: ClientValueInputs = { currentHoursPerWeek: "", scenarioHoursPerWeek: "", hourlyCost: "" };
const emptyPortfolio: PortfolioFitInputs = {
  activeAccounts: "",
  monthlyReachRate: "",
  qualificationRate: "",
  hoursPerConversation: "",
  availableHoursPerMonth: "",
};

const Afiliate = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const copy = PARTNER_LANDING_COPY[lang];
  const [currency, setCurrency] = useState<Currency>(lang === "en" ? "USD" : "EUR");
  const [clientInputs, setClientInputs] = useState<ClientValueInputs>(emptyClient);
  const [portfolioInputs, setPortfolioInputs] = useState<PortfolioFitInputs>(emptyPortfolio);
  const clientResult = useMemo(() => calculateClientValue(clientInputs), [clientInputs]);
  const portfolioResult = useMemo(() => calculatePortfolioFit(portfolioInputs), [portfolioInputs]);

  const number = (value: number, digits = 1) => new Intl.NumberFormat(copy.locale, {
    maximumFractionDigits: digits,
  }).format(value);
  const money = (value: number) => new Intl.NumberFormat(copy.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
  const signed = (value: number, suffix = "") => `${value > 0 ? "+" : ""}${number(value)}${suffix}`;
  const canonicalPath = localePath("/afiliate");
  const fullCalculatorPath = lang === "es"
    ? "/herramientas/calculadora-tiempo-operativo"
    : lang === "en"
      ? "/en/tools/operational-time-calculator"
      : localePath("/herramientas");

  const updateClient = (field: keyof ClientValueInputs, value: string) => {
    setClientInputs((current) => ({ ...current, [field]: value }));
  };
  const updatePortfolio = (field: keyof PortfolioFitInputs, value: string) => {
    setPortfolioInputs((current) => ({ ...current, [field]: value }));
  };

  const clientFields: { id: keyof ClientValueInputs; label: string; suffix: string }[] = [
    { id: "currentHoursPerWeek", label: copy.currentHours, suffix: "h" },
    { id: "scenarioHoursPerWeek", label: copy.scenarioHours, suffix: "h" },
    { id: "hourlyCost", label: `${copy.hourlyCost} (${copy.optional})`, suffix: `${currency}/h` },
  ];
  const portfolioFields: { id: keyof PortfolioFitInputs; label: string; suffix: string }[] = [
    { id: "activeAccounts", label: copy.activeAccounts, suffix: "" },
    { id: "monthlyReachRate", label: copy.monthlyReach, suffix: "%" },
    { id: "qualificationRate", label: copy.qualificationRate, suffix: "%" },
    { id: "hoursPerConversation", label: copy.hoursPerConversation, suffix: "h" },
    { id: "availableHoursPerMonth", label: copy.availableHours, suffix: "h" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        url={`${CANONICAL_DOMAIN}${canonicalPath}`}
        hreflang={allLangPaths("/afiliate")}
      />
      <DynamicSchemaMarkup
        id="partners"
        type="WebPage"
        title={copy.seoTitle}
        description={copy.seoDescription}
        url={`${CANONICAL_DOMAIN}${canonicalPath}`}
        faqs={copy.faqs}
        breadcrumbs={[
          { name: "Winerim", url: CANONICAL_DOMAIN },
          { name: copy.eyebrow, url: `${CANONICAL_DOMAIN}${canonicalPath}` },
        ]}
      />
      <Navbar />

      <main>
        <section className="border-b border-border bg-background pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase text-wine">{copy.eyebrow}</p>
              <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl">{copy.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
              <div className="mt-8 max-w-3xl border-l-2 border-wine bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">{copy.termsNote}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#encaje" className="inline-flex items-center gap-2 rounded-md bg-wine px-6 py-3 text-sm font-semibold text-white hover:bg-wine/90">
                  {copy.fitCta} <ArrowRight size={16} />
                </a>
                <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-wine/40">{copy.talkCta}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="text-xs font-semibold uppercase text-wine">{copy.valueEyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold md:text-4xl">{copy.valueTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">{copy.valueIntro}</p>
            <div className="mt-10 grid gap-8 border-y border-border py-10 md:grid-cols-3">
              {copy.valueItems.map((item, index) => {
                const Icon = [Clock3, BarChart3, FileCheck2][index];
                return <div key={item.title}><Icon className="mb-4 text-wine" size={22} /><h3 className="font-heading text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section id="encaje" className="scroll-mt-24 border-y border-border bg-muted/25 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="text-xs font-semibold uppercase text-wine">{copy.calculatorEyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-heading text-3xl font-bold md:text-4xl">{copy.calculatorTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">{copy.calculatorIntro}</p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-md border border-border bg-background p-6 md:p-8">
                <div className="flex items-start gap-3"><Calculator className="mt-1 shrink-0 text-wine" size={21} /><div><h3 className="font-heading text-2xl font-semibold">{copy.clientTitle}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.clientText}</p></div></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {clientFields.map((field) => (
                    <label key={field.id} htmlFor={`partner-client-${field.id}`}>
                      <span className="mb-2 block text-sm font-medium">{field.label}</span>
                      <span className="flex rounded-md border border-input bg-background focus-within:border-wine">
                        <input id={`partner-client-${field.id}`} inputMode="decimal" value={clientInputs[field.id]} onChange={(event) => updateClient(field.id, event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 outline-none" />
                        <small className="self-center px-3 text-muted-foreground">{field.suffix}</small>
                      </span>
                    </label>
                  ))}
                  <label htmlFor="partner-currency">
                    <span className="mb-2 block text-sm font-medium">{copy.currency}</span>
                    <select id="partner-currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="w-full rounded-md border border-input bg-background px-3 py-2.5">
                      <option value="EUR">EUR</option><option value="USD">USD</option><option value="GBP">GBP</option>
                    </select>
                  </label>
                </div>
                <div aria-live="polite" className="mt-6 border-t border-border pt-6">
                  {clientResult ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div><p className="text-xs uppercase text-muted-foreground">{clientResult.netHoursPerYear < 0 ? copy.additionalTime : copy.annualNetHours}</p><p className="mt-1 font-heading text-3xl font-semibold">{signed(clientResult.netHoursPerYear, " h")}</p></div>
                      <div><p className="text-xs uppercase text-muted-foreground">{copy.annualTimeValue}</p><p className="mt-1 font-heading text-3xl font-semibold">{clientResult.netTimeValuePerYear === null ? "—" : `${clientResult.netTimeValuePerYear > 0 ? "+" : ""}${money(clientResult.netTimeValuePerYear)}`}</p></div>
                    </div>
                  ) : <p className="text-sm text-muted-foreground">{copy.missingClient}</p>}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{copy.timeValueNote}</p>
                <Link to={fullCalculatorPath} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-wine hover:underline">{copy.fullCalculator} <ArrowRight size={15} /></Link>
              </article>

              <article className="rounded-md border border-border bg-background p-6 md:p-8">
                <div className="flex items-start gap-3"><Users className="mt-1 shrink-0 text-wine" size={21} /><div><h3 className="font-heading text-2xl font-semibold">{copy.portfolioTitle}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.portfolioText}</p></div></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {portfolioFields.map((field) => (
                    <label key={field.id} htmlFor={`partner-portfolio-${field.id}`}>
                      <span className="mb-2 block text-sm font-medium">{field.label}</span>
                      <span className="flex rounded-md border border-input bg-background focus-within:border-wine">
                        <input id={`partner-portfolio-${field.id}`} inputMode="decimal" value={portfolioInputs[field.id]} onChange={(event) => updatePortfolio(field.id, event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 outline-none" />
                        {field.suffix && <small className="self-center px-3 text-muted-foreground">{field.suffix}</small>}
                      </span>
                    </label>
                  ))}
                </div>
                <div aria-live="polite" className="mt-6 border-t border-border pt-6">
                  {portfolioResult ? (
                    <>
                      <dl className="grid grid-cols-2 gap-4">
                        <div><dt className="text-xs text-muted-foreground">{copy.reached}</dt><dd className="mt-1 text-xl font-semibold">{number(portfolioResult.accountsReachedPerMonth)}</dd></div>
                        <div><dt className="text-xs text-muted-foreground">{copy.qualified}</dt><dd className="mt-1 text-xl font-semibold">{number(portfolioResult.qualifiedConversationsPerMonth)}</dd></div>
                        <div><dt className="text-xs text-muted-foreground">{copy.hoursNeeded}</dt><dd className="mt-1 text-xl font-semibold">{number(portfolioResult.hoursNeededPerMonth)} h</dd></div>
                        <div><dt className="text-xs text-muted-foreground">{copy.capacityBalance}</dt><dd className="mt-1 text-xl font-semibold">{signed(portfolioResult.capacityBalanceHours, " h")}</dd></div>
                      </dl>
                      <p className={`mt-5 border-l-2 px-4 py-3 text-sm ${portfolioResult.hasCapacity ? "border-emerald-700 bg-emerald-950/10" : "border-amber-700 bg-amber-950/10"}`}>{portfolioResult.hasCapacity ? copy.capacityEnough : copy.capacityShort}</p>
                    </>
                  ) : <p className="text-sm text-muted-foreground">{copy.missingPortfolio}</p>}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{copy.portfolioNote}</p>
              </article>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-md border border-dashed border-border bg-background p-5"><ShieldCheck className="mt-0.5 shrink-0 text-wine" size={20} /><div><h3 className="font-semibold">{copy.sourceTitle}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy.sourceText}</p></div></div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:px-12">
            <div><h2 className="font-heading text-3xl font-bold">{copy.fitTitle}</h2><ul className="mt-6 space-y-4">{copy.fitItems.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 shrink-0 text-emerald-700" size={18} />{item}</li>)}</ul></div>
            <div><h2 className="font-heading text-3xl font-bold">{copy.noFitTitle}</h2><ul className="mt-6 space-y-4">{copy.noFitItems.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CircleX className="mt-0.5 shrink-0 text-wine" size={18} />{item}</li>)}</ul></div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/25 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="text-xs font-semibold uppercase text-wine">{copy.supportEyebrow}</p><h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold md:text-4xl">{copy.supportTitle}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">{copy.supportItems.map((item, index) => { const Icon = [BriefcaseBusiness, Handshake, ShieldCheck][index]; return <div key={item.title}><Icon className="mb-4 text-wine" size={22} /><h3 className="font-heading text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>; })}</div>
            <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div><h2 className="font-heading text-3xl font-bold">{copy.processTitle}</h2><ol className="mt-6 divide-y divide-border border-y border-border">{copy.processSteps.map((step, index) => <li key={step.title} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-heading text-xl text-wine">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div></li>)}</ol></div>
              <aside className="rounded-md border border-border bg-background p-6"><h2 className="font-heading text-2xl font-semibold">{copy.prepareTitle}</h2><ul className="mt-5 space-y-3">{copy.prepareItems.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check size={16} className="mt-0.5 shrink-0 text-wine" />{item}</li>)}</ul></aside>
            </div>
          </div>
        </section>

        <FAQSection faqs={copy.faqs} schemaId="partners" />
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12"><InternalLinks links={[{ to: localePath("/que-es-winerim"), label: "Winerim", type: "solution" }, { to: localePath("/funcionalidades"), label: copy.valueEyebrow, type: "solution" }, { to: fullCalculatorPath, label: copy.fullCalculator, type: "tool" }, { to: localePath("/distribuidor"), label: copy.eyebrow, type: "solution" }]} /></section>
        <section className="border-t border-border py-16 md:py-24"><div className="mx-auto max-w-4xl px-6 text-center md:px-12"><h2 className="font-heading text-3xl font-bold md:text-4xl">{copy.finalTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{copy.finalText}</p><Link to={localePath("/contacto")} className="mt-8 inline-flex items-center gap-2 rounded-md bg-wine px-7 py-3.5 text-sm font-semibold text-white hover:bg-wine/90">{copy.finalCta} <ArrowRight size={16} /></Link><p className="mt-6 text-xs text-muted-foreground">v{PARTNER_OPPORTUNITY_MODEL_VERSION}</p></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default Afiliate;
