import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Wrench } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { type SupportedLang } from "@/i18n/types";

interface ToolLink {
  to: string;
  label: string;
}

const toolRules: { keywords: string[]; tools: ToolLink[] }[] = [
  {
    keywords: ["margen", "precio", "pricing", "coste", "rentab"],
    tools: [
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes de vino" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa" },
    ],
  },
  {
    keywords: ["copa", "glass", "calice"],
    tools: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa" },
      { to: "/herramientas/diagnostico-vino-por-copa", label: "Diagnóstico de programa por copa" },
    ],
  },
  {
    keywords: ["stock", "rotación", "muerto", "dead", "inventario", "obsolesc"],
    tools: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto" },
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente" },
    ],
  },
  {
    keywords: ["ticket", "venta", "vender", "revenue"],
    tools: [
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio" },
      { to: "/herramientas/wine-roi-calculator", label: "Calculadora de ROI del vino" },
    ],
  },
  {
    keywords: ["carta", "wine list", "lista", "diseñ", "organiz"],
    tools: [
      { to: "/analisis-carta", label: "Analiza tu carta de vinos gratis" },
      { to: "/herramientas/wine-list-score", label: "Wine List Score: puntúa tu carta" },
    ],
  },
  {
    keywords: ["compra", "proveedor", "distribuidor", "repon"],
    tools: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente" },
    ],
  },
  {
    keywords: ["maridaje", "pairing", "abbinament"],
    tools: [
      { to: "/wine-pairing-generator", label: "Generador de maridajes con IA" },
    ],
  },
  {
    keywords: ["grupo", "multi", "cadena", "benchmark"],
    tools: [
      { to: "/herramientas/auditor-carta-multilocal", label: "Auditor de carta multi-local" },
      { to: "/herramientas/wine-list-benchmark", label: "Benchmark de carta de vinos" },
    ],
  },
];

const defaultTools: ToolLink[] = [
  { to: "/calculadora-margen-vino", label: "Calculadora de márgenes de vino" },
  { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto" },
  { to: "/analisis-carta", label: "Analiza tu carta de vinos gratis" },
];

const copy: Record<SupportedLang, { title: string; description: string; allTools: string }> = {
  es: {
    title: "Herramientas útiles",
    description: "Pon en práctica lo que has leído con estas herramientas gratuitas:",
    allTools: "Ver todas las herramientas gratuitas",
  },
  en: {
    title: "Useful tools",
    description: "Put what you have read into practice with these free tools:",
    allTools: "See all free tools",
  },
  it: {
    title: "Strumenti utili",
    description: "Metti in pratica quello che hai letto con questi strumenti gratuiti:",
    allTools: "Vedi tutti gli strumenti gratuiti",
  },
  fr: {
    title: "Outils utiles",
    description: "Mettez en pratique ce que vous venez de lire avec ces outils gratuits :",
    allTools: "Voir tous les outils gratuits",
  },
  de: {
    title: "Nützliche Tools",
    description: "Setzen Sie das Gelesene mit diesen kostenlosen Tools um:",
    allTools: "Alle kostenlosen Tools ansehen",
  },
  pt: {
    title: "Ferramentas úteis",
    description: "Ponha em prática o que leu com estas ferramentas gratuitas:",
    allTools: "Ver todas as ferramentas gratuitas",
  },
};

const toolLabelOverrides: Record<string, Partial<Record<SupportedLang, string>>> = {
  "/calculadora-margen-vino": {
    en: "Wine margin calculator",
    it: "Calcolatore margini vino",
    fr: "Calculateur de marge du vin",
    de: "Weinmargen-Rechner",
    pt: "Calculadora de margem do vinho",
  },
  "/herramientas/calculadora-precio-vino-por-copa": {
    en: "Wine-by-the-glass pricing calculator",
    it: "Calcolatore prezzo al calice",
    fr: "Calculateur de prix au verre",
    de: "Preisrechner für Wein im Glas",
    pt: "Calculadora de preço por copo",
  },
  "/herramientas/diagnostico-vino-por-copa": {
    en: "By-the-glass programme diagnosis",
    it: "Diagnosi del programma al calice",
    fr: "Diagnostic du programme au verre",
    de: "Analyse des Offenwein-Programms",
    pt: "Diagnóstico do programa por copo",
  },
  "/herramientas/calculadora-stock-muerto": {
    en: "Dead stock calculator",
    it: "Calcolatore stock fermo",
    fr: "Calculateur de stock dormant",
    de: "Rechner für gebundenen Lagerbestand",
    pt: "Calculadora de stock parado",
  },
  "/herramientas/calculadora-compra-inteligente": {
    en: "Smart purchasing calculator",
    it: "Calcolatore acquisto intelligente",
    fr: "Calculateur d'achat intelligent",
    de: "Rechner für intelligente Einkäufe",
    pt: "Calculadora de compra inteligente",
  },
  "/herramientas/calculadora-ticket-medio-vino": {
    en: "Average wine ticket calculator",
    it: "Calcolatore scontrino medio vino",
    fr: "Calculateur de ticket moyen vin",
    de: "Rechner für durchschnittlichen Weinbon",
    pt: "Calculadora de ticket médio de vinho",
  },
  "/herramientas/wine-roi-calculator": {
    en: "Wine ROI calculator",
    it: "Calcolatore ROI del vino",
    fr: "Calculateur ROI du vin",
    de: "Wein-ROI-Rechner",
    pt: "Calculadora de ROI do vinho",
  },
  "/analisis-carta": {
    en: "Analyse your wine list for free",
    it: "Analizza gratis la tua carta dei vini",
    fr: "Analyser votre carte des vins gratuitement",
    de: "Weinkarte kostenlos analysieren",
    pt: "Analisar carta de vinhos gratuitamente",
  },
  "/herramientas/wine-list-score": {
    en: "Wine List Score",
    it: "Wine List Score",
    fr: "Wine List Score",
    de: "Wine List Score",
    pt: "Wine List Score",
  },
  "/wine-pairing-generator": {
    en: "AI wine pairing generator",
    it: "Generatore abbinamenti con IA",
    fr: "Générateur d'accords mets-vins IA",
    de: "KI-Generator für Weinbegleitung",
    pt: "Gerador de harmonizações com IA",
  },
  "/herramientas/auditor-carta-multilocal": {
    en: "Multi-location wine list auditor",
    it: "Auditor carta multi-locale",
    fr: "Audit multi-site de carte des vins",
    de: "Multi-Standort-Auditor für Weinkarten",
    pt: "Auditor multi-local de carta de vinhos",
  },
  "/herramientas/wine-list-benchmark": {
    en: "Wine list benchmark",
    it: "Benchmark carta dei vini",
    fr: "Benchmark de carte des vins",
    de: "Weinkarten-Benchmark",
    pt: "Benchmark de carta de vinhos",
  },
};

const localizeTool = (tool: ToolLink, lang: SupportedLang, localePath: (path: string) => string): ToolLink => ({
  to: localePath(tool.to),
  label: toolLabelOverrides[tool.to]?.[lang] || tool.label,
});

function getTools(body: string): ToolLink[] {
  const text = body.toLowerCase();
  const matched = new Map<string, ToolLink>();

  for (const rule of toolRules) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      for (const tool of rule.tools) {
        if (!matched.has(tool.to)) matched.set(tool.to, tool);
      }
    }
  }

  const results = Array.from(matched.values());
  return results.length >= 2 ? results.slice(0, 4) : defaultTools;
}

interface ArticleToolsSectionProps {
  body: string;
}

const ArticleToolsSection = ({ body }: ArticleToolsSectionProps) => {
  const { lang, localePath } = useLanguage();
  const tools = getTools(body);
  const t = copy[lang] || copy.es;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-10">
      <ScrollReveal>
        <div className="border border-wine/20 rounded-2xl bg-wine/5 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wrench size={20} className="text-wine" />
            <h2 className="font-heading text-xl font-bold">{t.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            {t.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {tools.map((tool) => localizeTool(tool, lang, localePath)).map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-wine/40 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                  <Calculator size={14} className="text-wine" />
                </div>
                <span className="text-sm font-medium group-hover:text-wine transition-colors flex-1">
                  {tool.label}
                </span>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0" />
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-wine/10">
            <Link to={localePath("/herramientas")} className="text-sm font-semibold text-wine hover:underline inline-flex items-center gap-1">
              {t.allTools} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArticleToolsSection;
