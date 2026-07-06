import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, CheckCircle, ClipboardList, Scale, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";

type Distributor = {
  name: string;
  references: string;
  price: string;
  service: string;
  docs: string;
  unique: string;
  rotation: string;
};

type InternalLinkType = "guide" | "tool" | "resource" | "solution" | "decision-center";

type PageCopy = {
  intro: string;
  scoreTitle: string;
  scoreHelp: string;
  distributorLabel: string;
  fields: Record<Exclude<keyof Distributor, "name">, string>;
  updateRanking: string;
  bestFit: string;
  evaluatedRefs: string;
  supplierToReview: string;
  mainAction: string;
  viewSupply: string;
  actions: {
    prioritize: string;
    maintain: string;
    review: string;
  };
  pillars: Array<{ icon: typeof Scale; title: string; text: string }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  auditDownload: string;
  viewCloudrim: string;
  faqs: Array<{ q: string; a: string }>;
  internalLinksTitle: string;
  internalLinks: Array<{ to: string; label: string; type: InternalLinkType }>;
};

const initialRows: Distributor[] = [
  { name: "Distribuidor A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
  { name: "Distribuidor B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
  { name: "Distribuidor C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
];

const localizedInitialRows: Record<"es" | "de" | "pt", Distributor[]> = {
  es: initialRows,
  de: [
    { name: "Lieferant A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
    { name: "Lieferant B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
    { name: "Lieferant C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
  ],
  pt: initialRows,
};

const numberValue = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const clamp = (value: number, min = 0, max = 10) => Math.min(max, Math.max(min, value));

const seoCopy = {
  es: {
    title: "Comparador de distribuidores de vino",
    description: "Compara distribuidores por precio, servicio, documentación, referencias diferenciales y rotación real para priorizar compras de vino.",
    tools: "Herramientas",
    breadcrumb: "Comparador de distribuidores",
  },
  en: {
    title: "Wine distributor comparator",
    description: "Compare distributors by price, service, documentation, distinctive references and real rotation to prioritize wine purchasing.",
    tools: "Tools",
    breadcrumb: "Distributor comparator",
  },
  it: {
    title: "Comparatore distributori di vino",
    description: "Confronta distributori per prezzo, servizio, documentazione, referenze differenzianti e rotazione reale per dare priorità agli acquisti di vino.",
    tools: "Strumenti",
    breadcrumb: "Comparatore distributori",
  },
  fr: {
    title: "Comparateur de distributeurs de vin",
    description: "Comparez les distributeurs par prix, service, documentation, références différenciantes et rotation réelle pour prioriser les achats de vin.",
    tools: "Outils",
    breadcrumb: "Comparateur distributeurs",
  },
  de: {
    title: "Distributoren-Vergleich für Weineinkauf",
    description: "Vergleichen Sie Lieferanten nach Preis, Service, Dokumentation, differenzierenden Referenzen und realer Rotation, um Weineinkäufe zu priorisieren.",
    tools: "Tools",
    breadcrumb: "Distributoren-Vergleich",
  },
  pt: {
    title: "Comparador de distribuidores de vinho",
    description: "Compare distribuidores por preço, serviço, documentação, referências diferenciais e rotação real para priorizar compras de vinho.",
    tools: "Ferramentas",
    breadcrumb: "Comparador de distribuidores",
  },
};

const pageCopy: Record<"es" | "de" | "pt", PageCopy> = {
  es: {
    intro: "Evalúa qué proveedor aporta más valor real a tu carta: precio, servicio, orden documental, referencias diferenciales y vinos que sí rotan.",
    scoreTitle: "Puntúa tus proveedores",
    scoreHelp: "Usa notas de 0 a 10 salvo el número de referencias.",
    distributorLabel: "Distribuidor",
    fields: {
      references: "Refs.",
      price: "Precio",
      service: "Servicio",
      docs: "Docs.",
      unique: "Diferencial",
      rotation: "Rotación",
    },
    updateRanking: "Actualizar ranking",
    bestFit: "Mejor encaje",
    evaluatedRefs: "Refs. evaluadas",
    supplierToReview: "Proveedor a revisar",
    mainAction: "Acción principal",
    viewSupply: "Ver Winerim Supply",
    actions: {
      prioritize: "Priorizar y negociar condiciones de crecimiento",
      maintain: "Mantener, pero revisar solapes y precios",
      review: "Revisar: posible simplificación o renegociación",
    },
    pillars: [
      { icon: Scale, title: "Precio real", text: "No mires solo descuento: compara coste, formato, servicio y referencias que realmente rotan." },
      { icon: Truck, title: "Servicio", text: "Retrasos, pedidos incompletos y documentación desordenada también son coste operativo." },
      { icon: ClipboardList, title: "Catálogo", text: "Detecta solapes, huecos y proveedores que aportan vinos diferenciales a tu propuesta." },
    ],
    ctaEyebrow: "Distribuidores y compras",
    ctaTitle: "En Winerim el proveedor se compara contra la carta viva.",
    ctaText: "CloudRIM y Winerim Supply conectan catálogos, albaranes, facturas, costes, referencias y stock para decidir qué proveedor conviene en cada momento.",
    auditDownload: "Descargar auditoría de distribuidores",
    viewCloudrim: "Ver CloudRIM",
    faqs: [
      {
        q: "¿Qué significa referencia diferencial?",
        a: "Una referencia que aporta algo que no cubren otros proveedores: estilo, DO, formato, margen, disponibilidad o encaje con tu propuesta.",
      },
      {
        q: "¿El proveedor con mejor precio siempre gana?",
        a: "No. Un proveedor barato puede salir caro si genera errores de albarán, roturas de stock o referencias que no rotan.",
      },
      {
        q: "¿Cómo lo haría Winerim con datos reales?",
        a: "Cruza catálogo, costes, stock, ventas, albaranes y facturas para comparar proveedores con evidencia continua.",
      },
    ],
    internalLinksTitle: "Sigue afinando compras",
    internalLinks: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist albaranes y facturas", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/distribuidor", label: "Winerim para distribuidores", type: "solution" },
    ],
  },
  de: {
    intro: "Bewerten Sie, welcher Lieferant Ihrer Weinkarte wirklich mehr Wert bringt: Preis, Service, saubere Unterlagen, differenzierende Referenzen und Weine, die sich tatsaechlich drehen.",
    scoreTitle: "Lieferanten bewerten",
    scoreHelp: "Vergeben Sie Werte von 0 bis 10, ausser bei der Anzahl der Referenzen.",
    distributorLabel: "Lieferant",
    fields: {
      references: "Ref.",
      price: "Preis",
      service: "Service",
      docs: "Belege",
      unique: "Differenzierung",
      rotation: "Rotation",
    },
    updateRanking: "Ranking aktualisieren",
    bestFit: "Bester Fit",
    evaluatedRefs: "Bewertete Ref.",
    supplierToReview: "Zu pruefender Lieferant",
    mainAction: "Wichtigste Aktion",
    viewSupply: "Winerim Supply ansehen",
    actions: {
      prioritize: "Priorisieren und Wachstumsbedingungen verhandeln",
      maintain: "Beibehalten, aber Ueberschneidungen und Preise pruefen",
      review: "Pruefen: moegliche Vereinfachung oder Neuverhandlung",
    },
    pillars: [
      { icon: Scale, title: "Tatsaechlicher Preis", text: "Schauen Sie nicht nur auf Rabatte: vergleichen Sie Kosten, Format, Service und Referenzen, die wirklich rotieren." },
      { icon: Truck, title: "Service", text: "Verspaetungen, unvollstaendige Bestellungen und ungeordnete Unterlagen verursachen ebenfalls operative Kosten." },
      { icon: ClipboardList, title: "Katalog", text: "Erkennen Sie Ueberschneidungen, Luecken und Lieferanten, die Ihrer Positionierung differenzierende Weine hinzufuegen." },
    ],
    ctaEyebrow: "Lieferanten und Einkauf",
    ctaTitle: "In Winerim wird jeder Lieferant mit der lebendigen Weinkarte abgeglichen.",
    ctaText: "CloudRIM und Winerim Supply verbinden Kataloge, Lieferscheine, Rechnungen, Kosten, Referenzen und Bestand, damit Sie jederzeit den passenden Lieferanten waehlen.",
    auditDownload: "Lieferantenaudit herunterladen",
    viewCloudrim: "CloudRIM ansehen",
    faqs: [
      {
        q: "Was bedeutet differenzierende Referenz?",
        a: "Eine Referenz, die etwas liefert, was andere Lieferanten nicht abdecken: Stil, Herkunftsbezeichnung, Format, Marge, Verfuegbarkeit oder Passung zu Ihrem Konzept.",
      },
      {
        q: "Gewinnt immer der Lieferant mit dem besten Preis?",
        a: "Nein. Ein guenstiger Lieferant kann teuer werden, wenn er Lieferscheinfehler, Bestandsluecken oder Referenzen verursacht, die sich nicht drehen.",
      },
      {
        q: "Wie wuerde Winerim das mit echten Daten machen?",
        a: "Es verknuepft Katalog, Kosten, Bestand, Verkaeufe, Lieferscheine und Rechnungen, um Lieferanten laufend auf Basis von Evidenz zu vergleichen.",
      },
    ],
    internalLinksTitle: "Einkauf weiter schaerfen",
    internalLinks: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Rechner fuer intelligenten Einkauf", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checkliste fuer Lieferscheine und Rechnungen", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/distribuidor", label: "Winerim fuer Distributoren", type: "solution" },
    ],
  },
  pt: {
    intro: "Avalie que fornecedor traz mais valor real para a sua carta: preço, serviço, organização documental, referências diferenciais e vinhos que realmente rodam.",
    scoreTitle: "Pontue os seus fornecedores",
    scoreHelp: "Use notas de 0 a 10, exceto no número de referências.",
    distributorLabel: "Distribuidor",
    fields: {
      references: "Refs.",
      price: "Preço",
      service: "Serviço",
      docs: "Docs.",
      unique: "Diferencial",
      rotation: "Rotação",
    },
    updateRanking: "Atualizar ranking",
    bestFit: "Melhor encaixe",
    evaluatedRefs: "Refs. avaliadas",
    supplierToReview: "Fornecedor a rever",
    mainAction: "Ação principal",
    viewSupply: "Ver Winerim Supply",
    actions: {
      prioritize: "Priorizar e negociar condições de crescimento",
      maintain: "Manter, mas rever sobreposições e preços",
      review: "Rever: possível simplificação ou renegociação",
    },
    pillars: [
      { icon: Scale, title: "Preço real", text: "Não olhe apenas para o desconto: compare custo, formato, serviço e referências que realmente rodam." },
      { icon: Truck, title: "Serviço", text: "Atrasos, encomendas incompletas e documentação desorganizada também são custo operacional." },
      { icon: ClipboardList, title: "Catálogo", text: "Detete sobreposições, lacunas e fornecedores que acrescentam vinhos diferenciais à sua proposta." },
    ],
    ctaEyebrow: "Distribuidores e compras",
    ctaTitle: "Na Winerim, o fornecedor é comparado com a carta viva.",
    ctaText: "CloudRIM e Winerim Supply ligam catálogos, guias de remessa, faturas, custos, referências e stock para decidir que fornecedor convém em cada momento.",
    auditDownload: "Descarregar auditoria de distribuidores",
    viewCloudrim: "Ver CloudRIM",
    faqs: [
      {
        q: "O que significa referência diferencial?",
        a: "Uma referência que traz algo que outros fornecedores não cobrem: estilo, DO, formato, margem, disponibilidade ou encaixe com a sua proposta.",
      },
      {
        q: "O fornecedor com melhor preço ganha sempre?",
        a: "Não. Um fornecedor barato pode sair caro se gerar erros em guias de remessa, ruturas de stock ou referências que não rodam.",
      },
      {
        q: "Como é que a Winerim faria isto com dados reais?",
        a: "Cruza catálogo, custos, stock, vendas, guias de remessa e faturas para comparar fornecedores com evidência contínua.",
      },
    ],
    internalLinksTitle: "Continue a afinar as compras",
    internalLinks: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist de guias de remessa e faturas", type: "resource" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/distribuidor", label: "Winerim para distribuidores", type: "solution" },
    ],
  },
};

const ComparadorDistribuidores = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const s = seoCopy[lang] || seoCopy.es;
  const p = pageCopy[lang === "de" || lang === "pt" ? lang : "es"];
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/comparador-distribuidores")}`;
  const [rows, setRows] = useState(() => localizedInitialRows[lang === "de" || lang === "pt" ? lang : "es"]);

  const results = useMemo(() => {
    return rows
      .map((row) => {
        const references = numberValue(row.references);
        const score =
          clamp(numberValue(row.price)) * 0.25 +
          clamp(numberValue(row.service)) * 0.2 +
          clamp(numberValue(row.docs)) * 0.2 +
          clamp(numberValue(row.unique)) * 0.2 +
          clamp(numberValue(row.rotation)) * 0.15;
        const normalized = Math.round(score * 10);
        const action =
          normalized >= 78
            ? p.actions.prioritize
            : normalized >= 62
              ? p.actions.maintain
              : p.actions.review;
        return { ...row, references, score: normalized, action };
      })
      .sort((a, b) => b.score - a.score);
  }, [p.actions.maintain, p.actions.prioritize, p.actions.review, rows]);

  const best = results[0];
  const worst = results[results.length - 1];
  const totalReferences = results.reduce((sum, row) => sum + row.references, 0);

  const updateRow = (index: number, key: keyof Distributor, value: string) => {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={s.title}
        description={s.description}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/comparador-distribuidores")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: s.tools, href: localePath("/herramientas") }, { label: s.breadcrumb }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              Demo · Winerim Supply
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {p.intro}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Building2 size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{p.scoreTitle}</h2>
                  <p className="text-sm text-muted-foreground">{p.scoreHelp}</p>
                </div>
              </div>

              <div className="space-y-5">
                {rows.map((row, index) => (
                  <div key={index} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="grid md:grid-cols-[1.1fr_repeat(6,minmax(0,0.75fr))] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`dist-${index}`}>{p.distributorLabel}</Label>
                        <Input id={`dist-${index}`} value={row.name} onChange={(e) => updateRow(index, "name", e.target.value)} />
                      </div>
                      {[
                        ["references", p.fields.references],
                        ["price", p.fields.price],
                        ["service", p.fields.service],
                        ["docs", p.fields.docs],
                        ["unique", p.fields.unique],
                        ["rotation", p.fields.rotation],
                      ].map(([key, label]) => (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={`${key}-${index}`}>{label}</Label>
                          <Input
                            id={`${key}-${index}`}
                            inputMode="decimal"
                            value={row[key as keyof Distributor]}
                            onChange={(e) => updateRow(index, key as keyof Distributor, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="mt-6 w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "comparador-distribuidores")}
              >
                {p.updateRanking}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{p.bestFit}</p>
                  <h2 className="font-heading text-2xl font-semibold">{best.name}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle size={14} />
                  {best.score}/100
                </span>
              </div>

              <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-6">
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{p.evaluatedRefs}</p>
                  <p className="text-2xl font-semibold mt-1">{totalReferences}</p>
                </div>
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{p.supplierToReview}</p>
                  <p className="text-lg font-semibold mt-1">{worst.name}</p>
                </div>
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{p.mainAction}</p>
                  <p className="text-sm font-medium mt-1">{best.action}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {results.map((row, index) => (
                  <div key={row.name} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-semibold">{index + 1}. {row.name}</p>
                      <p className="font-semibold text-wine">{row.score}/100</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
                      <div className="h-full bg-wine" style={{ width: `${row.score}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{row.action}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full bg-wine hover:bg-wine/90">
                <Link to={localePath("/producto/winerim-supply")}>
                  {p.viewSupply}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {p.pillars.map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{p.ctaEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{p.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {p.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/auditoria-distribuidores-catalogo")}>{p.auditDownload}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/producto/cloudrim")}>{p.viewCloudrim}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="comparador-distribuidores"
          faqs={p.faqs}
        />

        <InternalLinks
          title={p.internalLinksTitle}
          links={p.internalLinks.map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ComparadorDistribuidores;
