interface Fact {
  label: string;
  value: string;
}

interface FactsBoxProps {
  title?: string;
  facts: Fact[];
}

/**
 * Structured facts panel — designed to be extracted by AI search as key data points.
 */
const FactsBox = ({ title = "Datos clave", facts }: FactsBoxProps) => (
  <aside
    role="note"
    aria-label={title}
    className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8 my-8"
  >
    <h3 className="font-heading text-lg font-bold mb-5">{title}</h3>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      {facts.map((f, i) => (
        <div key={i} className="flex flex-col">
          <dt className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{f.label}</dt>
          <dd className="text-sm font-medium text-foreground">{f.value}</dd>
        </div>
      ))}
    </dl>
  </aside>
);

export default FactsBox;
