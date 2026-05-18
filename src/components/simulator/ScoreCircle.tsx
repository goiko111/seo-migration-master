export default function ScoreCircle({ score }: { score: number }) {
  const color = score >= 70 ? "hsl(142 70% 40%)" : score >= 45 ? "hsl(38 92% 50%)" : "hsl(0 75% 50%)";
  const label = score >= 70 ? "Concepto bien alineado" : score >= 45 ? "Concepto mejorable" : "Revisa el concepto";
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, score)) / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
          <circle
            cx="64" cy="64" r={r} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 800ms ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-muted-foreground">de 100</span>
        </div>
      </div>
      <div className="text-sm font-medium" style={{ color }}>{label}</div>
    </div>
  );
}