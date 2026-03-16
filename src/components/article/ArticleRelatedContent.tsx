import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, Download, Lightbulb, Wine } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export interface RelatedLink {
  to: string;
  label: string;
  type: "tool" | "guide" | "resource" | "solution";
}

const typeConfig = {
  tool: { icon: Calculator, badge: "Herramienta", badgeClass: "text-wine" },
  guide: { icon: BookOpen, badge: "Guía", badgeClass: "text-accent" },
  resource: { icon: Download, badge: "Recurso", badgeClass: "text-emerald-500" },
  solution: { icon: Lightbulb, badge: "Solución", badgeClass: "text-amber-500" },
};

/** Keyword → related links mapping for automatic suggestion */
const autoLinkRules: { keywords: string[]; links: RelatedLink[] }[] = [
  {
    keywords: ["precio", "pricing", "margen", "coste", "rentab"],
    links: [
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes de vino", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: motor analítico de carta", type: "solution" },
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino en un restaurante", type: "guide" },
    ],
  },
  {
    keywords: ["copa", "glass", "calice", "verre"],
    links: [
      { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: análisis de copa y rentabilidad", type: "solution" },
      { to: "/vino-por-copa-restaurante", label: "Guía de vino por copa", type: "guide" },
    ],
  },
  {
    keywords: ["carta", "wine list", "diseñ", "organiz", "referencias"],
    links: [
      { to: "/analisis-carta", label: "Analiza tu carta de vinos gratis", type: "tool" },
      { to: "/producto/winerim-core", label: "Winerim Core: diagnóstico y arquitectura", type: "solution" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
    ],
  },
  {
    keywords: ["maridaje", "pairing", "abbinament", "accord"],
    links: [
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
    ],
  },
  {
    keywords: ["compra", "purchas", "proveedor", "distribuidor", "acquist", "achat"],
    links: [
      { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: compra mejor, vende mejor", type: "solution" },
      { to: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", label: "Usar datos para comprar vinos", type: "guide" },
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
    keywords: ["grupo", "multi", "cadena", "chain", "catena", "chaîne"],
    links: [
      { to: "/herramientas/auditor-carta-multilocal", label: "Auditor multi-local de carta", type: "tool" },
      { to: "/soluciones/grupos-restauracion", label: "Soluciones para grupos de restauración", type: "solution" },
      { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Gestionar carta en grupos", type: "guide" },
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
  const links = manualLinks && manualLinks.length > 0 ? manualLinks : getAutoLinks(slug, body);

  if (!links.length) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <ScrollReveal>
        <div className="border-t border-border pt-12">
          <div className="flex items-center gap-3 mb-8">
            <Wine size={20} className="text-wine" />
            <h2 className="font-heading text-xl md:text-2xl font-bold">Contenido relacionado</h2>
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
                        {config.badge}
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
