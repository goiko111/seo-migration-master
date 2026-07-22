import { Fragment, useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/types";

type LegalKind = "privacy" | "terms";

type LegalDocument = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  sourceLabel: string;
  sourceNote?: string;
  summary: string[];
  metaRows: { label: string; value: string }[];
  sections: { heading: string; blocks: string[] }[];
};

type LegalDocuments = Record<LegalKind, Partial<Record<Language, LegalDocument>>>;

const routes: Record<LegalKind, Record<Language, string>> = {
  privacy: {
    es: "/politica-privacidad",
    en: "/en/privacy",
    it: "/it/privacy",
    fr: "/fr/confidentialite",
    de: "/de/datenschutz",
    pt: "/pt/privacidade",
  },
  terms: {
    es: "/terminos-y-condiciones-del-contrato",
    en: "/en/terms",
    it: "/it/termini",
    fr: "/fr/conditions",
    de: "/de/agb",
    pt: "/pt/termos",
  },
};

const fallback = {
  es: {
    privacy: { title: "Política de Privacidad · España", description: "Política de privacidad de Winerim para clientes, usuarios y visitantes en España.", label: "Documento España", loading: "Cargando el documento legal completo...", error: "No se ha podido cargar el documento. Recarga la página para intentarlo de nuevo." },
    terms: { title: "Términos y Condiciones de Contratación y Uso SaaS", description: "Términos y condiciones de contratación y uso SaaS de Winerim para clientes en España.", label: "Documento España", loading: "Cargando el documento legal completo...", error: "No se ha podido cargar el documento. Recarga la página para intentarlo de nuevo." },
  },
  en: {
    privacy: { title: "Privacy Policy", description: "International Winerim privacy policy.", label: "International document", loading: "Loading the full legal document...", error: "The document could not be loaded. Reload the page to try again." },
    terms: { title: "Terms and Conditions", description: "International Winerim SaaS terms and conditions.", label: "International document", loading: "Loading the full legal document...", error: "The document could not be loaded. Reload the page to try again." },
  },
  it: {
    privacy: { title: "Informativa sulla Privacy", description: "Informativa internazionale sulla privacy di Winerim.", label: "Documento internazionale", loading: "Caricamento del documento legale completo...", error: "Impossibile caricare il documento. Ricarica la pagina per riprovare." },
    terms: { title: "Termini e condizioni", description: "Termini e condizioni SaaS internazionali di Winerim.", label: "Documento internazionale", loading: "Caricamento del documento legale completo...", error: "Impossibile caricare il documento. Ricarica la pagina per riprovare." },
  },
  fr: {
    privacy: { title: "Politique de confidentialité", description: "Politique internationale de confidentialité de Winerim.", label: "Document international", loading: "Chargement du document juridique complet...", error: "Le document n’a pas pu être chargé. Rechargez la page pour réessayer." },
    terms: { title: "Conditions générales", description: "Conditions générales SaaS internationales de Winerim.", label: "Document international", loading: "Chargement du document juridique complet...", error: "Le document n’a pas pu être chargé. Rechargez la page pour réessayer." },
  },
  de: {
    privacy: { title: "Datenschutzrichtlinie", description: "Internationale Datenschutzrichtlinie von Winerim.", label: "Internationales Dokument", loading: "Das vollständige Rechtsdokument wird geladen...", error: "Das Dokument konnte nicht geladen werden. Laden Sie die Seite erneut." },
    terms: { title: "Vertrags- und Nutzungsbedingungen", description: "Internationale SaaS-Bedingungen von Winerim.", label: "Internationales Dokument", loading: "Das vollständige Rechtsdokument wird geladen...", error: "Das Dokument konnte nicht geladen werden. Laden Sie die Seite erneut." },
  },
  pt: {
    privacy: { title: "Política de Privacidade", description: "Política internacional de privacidade da Winerim.", label: "Documento internacional", loading: "A carregar o documento jurídico completo...", error: "Não foi possível carregar o documento. Recarregue a página para tentar novamente." },
    terms: { title: "Termos e condições", description: "Termos e condições SaaS internacionais da Winerim.", label: "Documento internacional", loading: "A carregar o documento jurídico completo...", error: "Não foi possível carregar o documento. Recarregue a página para tentar novamente." },
  },
} satisfies Record<Language, Record<LegalKind, { title: string; description: string; label: string; loading: string; error: string }>>;

const slugify = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const LegalBlocks = ({ blocks }: { blocks: string[] }) => {
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    nodes.push(
      <ul className="list-disc space-y-2 pl-5" key={`list-${nodes.length}`}>
        {list.map((item) => <li key={item}>{item}</li>)}
      </ul>,
    );
    list = [];
  };

  blocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("•")) {
      list.push(trimmed.replace(/^•\s*/, ""));
      return;
    }
    flushList();
    nodes.push(
      <Fragment key={`paragraph-${index}`}>
        <p className="whitespace-pre-line">{block}</p>
      </Fragment>,
    );
  });
  flushList();

  return <>{nodes}</>;
};

const LegalDocumentPage = ({ kind }: { kind: LegalKind }) => {
  const { lang } = useLanguage();
  const labels = fallback[lang]?.[kind] ?? fallback.es[kind];
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [failed, setFailed] = useState(false);
  const path = routes[kind][lang] ?? routes[kind].es;

  useEffect(() => {
    let cancelled = false;
    setDocument(null);
    setFailed(false);

    fetch("/legal/legalDocuments.json", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw new Error(`Legal documents unavailable: ${response.status}`);
        return response.json() as Promise<LegalDocuments>;
      })
      .then((documents) => {
        if (!cancelled) setDocument(documents[kind][lang] ?? documents[kind].es ?? null);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => { cancelled = true; };
  }, [kind, lang]);

  const hreflang = useMemo(() => [
    ...Object.entries(routes[kind]).map(([language, route]) => ({ lang: language, url: `https://winerim.wine${route}` })),
    { lang: "x-default", url: `https://winerim.wine${routes[kind].es}` },
  ], [kind]);

  const title = document?.title ?? labels.title;
  const description = document?.seoDescription ?? labels.description;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={document?.seoTitle ?? title} description={description} url={`https://winerim.wine${path}`} hreflang={hreflang} noindex />
      <Navbar />
      <main>
        <section className="border-b border-border pb-12 pt-28 md:pb-16 md:pt-36">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <Breadcrumbs items={[{ label: title }]} />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded border border-wine/25 bg-wine/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-wine-light">
                <FileText size={14} aria-hidden="true" />
                {document?.sourceLabel ?? labels.label}
              </div>
              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
              <div className="mt-6 max-w-3xl space-y-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                {(document?.summary ?? [description]).map((summary) => <p key={summary}>{summary}</p>)}
                {document?.sourceNote && <p className="text-sm text-foreground/80">{document.sourceNote}</p>}
              </div>
            </div>
            {document && document.metaRows.length > 0 && (
              <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
                {document.metaRows.map((row) => (
                  <div className="bg-card p-5" key={`${row.label}-${row.value}`}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{row.label}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            {!document && <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">{failed ? labels.error : labels.loading}</div>}
            {document && (
              <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)]">
                <aside className="hidden lg:block">
                  <div className="sticky top-28 border-l border-border pl-5">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{lang === "es" ? "Contenido" : "Contents"}</p>
                    <nav aria-label="Legal document sections" className="max-h-[68vh] space-y-2 overflow-auto pr-3">
                      {document.sections.map((section) => <a href={`#${slugify(section.heading)}`} className="block text-xs leading-relaxed text-muted-foreground transition-colors hover:text-foreground" key={section.heading}>{section.heading}</a>)}
                    </nav>
                  </div>
                </aside>
                <article className="min-w-0">
                  {document.sections.map((section) => (
                    <section id={slugify(section.heading)} className="scroll-mt-28 border-t border-border py-8 first:border-t-0 first:pt-0" key={section.heading}>
                      <h2 className="font-heading text-2xl font-semibold leading-tight md:text-3xl">{section.heading}</h2>
                      <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground md:text-base"><LegalBlocks blocks={section.blocks} /></div>
                    </section>
                  ))}
                </article>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalDocumentPage;
