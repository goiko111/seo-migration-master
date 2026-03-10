import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface ComparisonRow {
  feature: string;
  /** false = no, true = yes, "partial" = limited */
  options: (boolean | "partial")[];
}

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  columns: string[];
  rows: ComparisonRow[];
  /** Index of the "recommended" column (highlighted) */
  highlightColumn?: number;
}

const CellIcon = ({ val }: { val: boolean | "partial" }) => {
  if (val === true) return <CheckCircle2 size={18} className="text-wine mx-auto" />;
  if (val === "partial") return <MinusCircle size={18} className="text-accent mx-auto" />;
  return <XCircle size={18} className="text-muted-foreground/40 mx-auto" />;
};

/**
 * Comparison table designed for AI citability.
 * Renders accessible <table> with clear headers and semantic markup.
 */
const ComparisonTable = ({ title, subtitle, columns, rows, highlightColumn }: ComparisonTableProps) => (
  <section className="my-12">
    {title && (
      <ScrollReveal className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </ScrollReveal>
    )}
    <ScrollReveal>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-card">
              <th className="text-left p-4 font-semibold text-muted-foreground">Característica</th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`p-4 font-semibold text-center ${
                    i === highlightColumn
                      ? "text-wine bg-wine/5 border-b-2 border-wine"
                      : "text-muted-foreground"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-4 font-medium text-foreground">{row.feature}</td>
                {row.options.map((val, ci) => (
                  <td
                    key={ci}
                    className={`p-4 text-center ${ci === highlightColumn ? "bg-wine/5" : ""}`}
                  >
                    <CellIcon val={val} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  </section>
);

export default ComparisonTable;
