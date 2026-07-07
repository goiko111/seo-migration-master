import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, Download, Lightbulb, Wine, Brain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { type SupportedLang } from "@/i18n/types";

export interface RelatedLink {
  to: string;
  label: string;
  type: "tool" | "guide" | "resource" | "solution" | "conversion" | "decision-center";
}

const typeConfig = {
  tool: { icon: Calculator, badgeClass: "text-wine" },
  guide: { icon: BookOpen, badgeClass: "text-accent" },
  resource: { icon: Download, badgeClass: "text-emerald-500" },
  solution: { icon: Lightbulb, badgeClass: "text-amber-500" },
  conversion: { icon: ArrowRight, badgeClass: "text-amber-500" },
  "decision-center": { icon: Brain, badgeClass: "text-purple-500" },
};

const copy: Record<SupportedLang, { title: string; badges: Record<RelatedLink["type"], string> }> = {
  es: { title: "Contenido relacionado", badges: { tool: "Herramienta", guide: "Guía", resource: "Recurso", solution: "Solución", conversion: "Conversión", "decision-center": "Decision Center" } },
  en: { title: "Related content", badges: { tool: "Tool", guide: "Guide", resource: "Resource", solution: "Solution", conversion: "Conversion", "decision-center": "Decision Center" } },
  it: { title: "Contenuti correlati", badges: { tool: "Strumento", guide: "Guida", resource: "Risorsa", solution: "Soluzione", conversion: "Conversione", "decision-center": "Decision Center" } },
  fr: { title: "Contenus associés", badges: { tool: "Outil", guide: "Guide", resource: "Ressource", solution: "Solution", conversion: "Conversion", "decision-center": "Decision Center" } },
  de: { title: "Verwandte Inhalte", badges: { tool: "Tool", guide: "Ratgeber", resource: "Ressource", solution: "Lösung", conversion: "Conversion", "decision-center": "Decision Center" } },
  pt: { title: "Conteúdo relacionado", badges: { tool: "Ferramenta", guide: "Guia", resource: "Recurso", solution: "Solução", conversion: "Conversão", "decision-center": "Decision Center" } },
};

/** Keyword → related links mapping for automatic suggestion */
const autoLinkRules: { keywords: string[]; links: RelatedLink[] }[] = [
  {
    keywords: ["biblioteca", "uva", "uvas", "variedad", "variedades", "tempranillo", "albariño", "albarino", "godello", "mencía", "mencia", "rioja", "ribera", "rias baixas", "región", "region", "estilo", "maridaje", "pairing"],
    links: [
      { to: "/biblioteca-vino", label: "Biblioteca del vino", type: "guide" },
      { to: "/biblioteca-vino/uvas", label: "Uvas clave para carta de vinos", type: "guide" },
      { to: "/biblioteca-vino/regiones", label: "Regiones de vino para restauración", type: "guide" },
      { to: "/biblioteca-vino/maridajes", label: "Maridajes por plato y ocasión", type: "guide" },
    ],
  },
  {
    keywords: ["precio", "pricing", "margen", "coste", "rentab"],
    links: [
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes de vino", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: motor analítico de carta", type: "solution" },
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino en un restaurante", type: "guide" },
      { to: "/decision-center/margenes-pricing", label: "Decision Center: Márgenes y pricing", type: "decision-center" },
    ],
  },
  {
    keywords: ["copa", "glass", "calice", "verre"],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: análisis de copa y rentabilidad", type: "solution" },
      { to: "/vino-por-copa-restaurante", label: "Guía de vino por copa", type: "guide" },
      { to: "/decision-center/vino-por-copa", label: "Decision Center: Vino por copa", type: "decision-center" },
    ],
  },
  {
    keywords: ["carta", "wine list", "diseñ", "organiz", "referencias", "equilibr", "descompens"],
    links: [
      { to: "/analisis-carta", label: "Analiza tu carta de vinos gratis", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: diagnóstico y arquitectura", type: "solution" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
      { to: "/decision-center/carta-equilibrio", label: "Decision Center: Carta y equilibrio", type: "decision-center" },
    ],
  },
  {
    keywords: ["maridaje", "pairing", "abbinament", "accord"],
    links: [
      { to: "/biblioteca-vino/maridajes", label: "Biblioteca de maridajes", type: "guide" },
      { to: "/wine-pairing-generator", label: "Generador de maridajes con IA", type: "tool" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: recomendaciones IA", type: "solution" },
    ],
  },
  {
    keywords: ["rotación", "rotation", "stock", "inventario", "obsolesc", "muerto", "dead"],
    links: [
      { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: inteligencia de compras", type: "solution" },
      { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", label: "Mejorar la rotación de vinos", type: "guide" },
      { to: "/decision-center/stock-rotacion", label: "Decision Center: Stock y rotación", type: "decision-center" },
    ],
  },
  {
    keywords: ["compra", "purchas", "proveedor", "distribuidor", "acquist", "achat", "repon"],
    links: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: compra mejor, vende mejor", type: "solution" },
      { to: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", label: "Usar datos para comprar vinos", type: "guide" },
      { to: "/decision-center/compras-reposicion", label: "Decision Center: Compras y reposición", type: "decision-center" },
    ],
  },
  {
    keywords: ["vender", "venta", "ticket", "revenue", "roi"],
    links: [
      { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: análisis de ventas y rentabilidad", type: "solution" },
      { to: "/como-vender-mas-vino-en-un-restaurante", label: "Cómo vender más vino", type: "guide" },
    ],
  },
  {
    keywords: ["digital", "software", "tecnolog", "ia", "inteligencia"],
    links: [
      { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia Dinámica: IA táctica", type: "solution" },
      { to: "/herramientas", label: "Todas las herramientas gratuitas", type: "tool" },
    ],
  },
  {
    keywords: ["grupo", "multi", "cadena", "chain", "catena", "chaîne", "benchmark", "escala"],
    links: [
      { to: "/herramientas/auditor-carta-multilocal", label: "Auditor multi-local de carta", type: "tool" },
      { to: "/soluciones/grupos-restauracion", label: "Soluciones para grupos de restauración", type: "solution" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Gestionar carta en grupos", type: "guide" },
      { to: "/decision-center/grupos-benchmarking", label: "Decision Center: Grupos y benchmarking", type: "decision-center" },
    ],
  },
];

/** Default fallback links when no keywords match */
const defaultLinks: RelatedLink[] = [
  { to: "/analisis-carta", label: "Analiza tu carta de vinos gratis", type: "tool" },
  { to: "/producto/winerim-core", label: "Winerim Core: motor analítico de carta", type: "solution" },
  { to: "/herramientas", label: "Herramientas gratuitas para carta de vinos", type: "tool" },
  { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
];

/** Links that should always appear at the bottom of related content */
const mandatoryLinks: RelatedLink[] = [
  { to: "/precios", label: "Planes y precios de Winerim", type: "solution" },
  { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
];

const labelOverrides: Record<string, Partial<Record<SupportedLang, string>>> = {
  "/biblioteca-vino": { en: "Wine library", it: "Biblioteca del vino", fr: "Bibliothèque du vin", de: "Weinbibliothek", pt: "Biblioteca do vinho" },
  "/biblioteca-vino/uvas": { en: "Key grapes for wine lists", it: "Vitigni chiave per la carta", fr: "Cépages clés pour la carte", de: "Wichtige Rebsorten für die Weinkarte", pt: "Castas-chave para a carta" },
  "/biblioteca-vino/regiones": { en: "Wine regions for restaurants", it: "Regioni del vino per la ristorazione", fr: "Régions viticoles pour la restauration", de: "Weinregionen für die Gastronomie", pt: "Regiões de vinho para restauração" },
  "/biblioteca-vino/maridajes": { en: "Pairings by dish and occasion", it: "Abbinamenti per piatto e occasione", fr: "Accords par plat et moment", de: "Weinbegleitung nach Gericht und Anlass", pt: "Harmonizações por prato e ocasião" },
  "/analisis-carta": { en: "Analyse your wine list for free", it: "Analizza gratis la tua carta dei vini", fr: "Analyser votre carte des vins gratuitement", de: "Weinkarte kostenlos analysieren", pt: "Analisar carta de vinhos gratuitamente" },
  "/producto/winerim-core": { en: "Winerim Core: wine list analytics", it: "Winerim Core: analisi della carta", fr: "Winerim Core : analyse de carte", de: "Winerim Core: Weinkarten-Analyse", pt: "Winerim Core: análise da carta" },
  "/herramientas": { en: "Free wine list tools", it: "Strumenti gratuiti per la carta", fr: "Outils gratuits pour carte des vins", de: "Kostenlose Weinkarten-Tools", pt: "Ferramentas gratuitas para carta de vinhos" },
  "/demo": { en: "Request a free demo", it: "Richiedi una demo gratuita", fr: "Demander une démo gratuite", de: "Kostenlose Demo anfragen", pt: "Solicitar demo gratuita" },
  "/precios": { en: "Winerim plans and pricing", it: "Piani e prezzi Winerim", fr: "Plans et tarifs Winerim", de: "Winerim Pläne und Preise", pt: "Planos e preços Winerim" },
  "/soluciones/restaurantes-gastronomicos": { en: "Solutions for gastronomic restaurants", it: "Soluzioni per ristoranti gastronomici", fr: "Solutions pour restaurants gastronomiques", de: "Lösungen für Gourmetrestaurants", pt: "Soluções para restaurantes gastronómicos" },
};

const localizedPrefixes = /^\/(en|it|fr|de|pt)\//;

function localizeLink(link: RelatedLink, lang: SupportedLang, localePath: (path: string) => string): RelatedLink {
  const isAlreadyLocalized = localizedPrefixes.test(link.to);
  const shouldLocalize = link.to.startsWith("/") && !isAlreadyLocalized;
  return {
    ...link,
    to: shouldLocalize ? localePath(link.to) : link.to,
    label: labelOverrides[link.to]?.[lang] || link.label,
  };
}

function getAutoLinks(slug: string, body: string): RelatedLink[] {
  const text = `${slug} ${body}`.toLowerCase();
  const matched = new Map<string, RelatedLink>();

  for (const rule of autoLinkRules) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      for (const link of rule.links) {
        if (!matched.has(link.to)) matched.set(link.to, link);
      }
    }
  }

  const results = Array.from(matched.values());
  return results.length >= 2 ? results.slice(0, 6) : defaultLinks;
}

interface ArticleRelatedContentProps {
  slug: string;
  body: string;
  manualLinks?: RelatedLink[] | null;
}

const ArticleRelatedContent = ({ slug, body, manualLinks }: ArticleRelatedContentProps) => {
  const { lang, localePath } = useLanguage();
  const t = copy[lang] || copy.es;
  const baseLinks = manualLinks && manualLinks.length > 0 ? manualLinks : getAutoLinks(slug, body);
  // Ensure mandatory links (pricing, demo) are always present
  const existingPaths = new Set(baseLinks.map(l => l.to));
  const extras = mandatoryLinks.filter(l => !existingPaths.has(l.to));
  // Also ensure at least one solution link
  const hasSolution = baseLinks.some(l => l.type === "solution");
  if (!hasSolution && !extras.some(l => l.to.startsWith("/soluciones"))) {
    extras.unshift({ to: "/soluciones/restaurantes-gastronomicos", label: "Soluciones para restaurantes gastronómicos", type: "solution" });
  }
  const links = [...baseLinks, ...extras].slice(0, 8).map((link) => localizeLink(link, lang, localePath));

  if (!links.length) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <div className="border-t border-border pt-12">
          <div className="flex items-center gap-3 mb-8">
            <Wine size={20} className="text-wine" />
            <h2 className="font-heading text-xl md:text-2xl font-bold">{t.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {links.map((link, i) => {
              const config = typeConfig[link.type];
              const Icon = config.icon;
              return (
                <ScrollReveal key={link.to} delay={i * 0.04}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-wine" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-semibold tracking-widest uppercase ${config.badgeClass} block mb-0.5`}>
                        {t.badges[link.type]}
                      </span>
                      <p className="text-sm font-medium group-hover:text-wine transition-colors truncate">
                        {link.label}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0" />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArticleRelatedContent;
