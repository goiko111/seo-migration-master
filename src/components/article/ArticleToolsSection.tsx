import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Wrench } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

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
  const tools = getTools(body);

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-10">
      <ScrollReveal>
        <div className="border border-wine/20 rounded-2xl bg-wine/5 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wrench size={20} className="text-wine" />
            <h2 className="font-heading text-xl font-bold">Herramientas útiles</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Pon en práctica lo que has leído con estas herramientas gratuitas:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {tools.map((tool, i) => (
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
            <Link to="/herramientas" className="text-sm font-semibold text-wine hover:underline inline-flex items-center gap-1">
              Ver todas las herramientas gratuitas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArticleToolsSection;
