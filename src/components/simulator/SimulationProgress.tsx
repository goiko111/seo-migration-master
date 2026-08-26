import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { SIMULATION_TIMELINE, type Teaser } from "@/lib/simulatorApi";
import type { SimulatorCopy } from "./simulatorText";
import { NUMBER_LOCALE, TIMELINE_LABELS } from "./simulatorFormText";

export default function SimulationProgress({ teaser, copy }: { teaser: Teaser | null; copy: SimulatorCopy }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const t = setInterval(() => setElapsed((Date.now() - start) / 1000), 200);
    return () => clearInterval(t);
  }, []);

  const current = [...SIMULATION_TIMELINE].reverse().find((t) => elapsed >= t.atSec) ?? SIMULATION_TIMELINE[0];
  const progress = Math.min(95, (elapsed / 30) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6 border-wine/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full bg-wine animate-pulse" />
          <div className="text-sm font-medium">{copy.stepWord} {current.step}/7 · {current.label}</div>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      <Card className="p-6 border-wine/20 space-y-4">
        {teaser ? (
          <>
            <div className="text-sm text-muted-foreground">{copy.preview}</div>
            <div className="grid grid-cols-2 gap-4">
              <Metric label={copy.score} value={String(teaser.coherenceScore)} />
              <Metric label={copy.refs} value={`${teaser.refsRange.min}-${teaser.refsRange.max}`} />
              <Metric label={copy.profile} value={teaser.profile} />
              <Metric label={copy.firstPurchase} value={`${teaser.currency}${teaser.firstPurchase.low.toLocaleString(NUMBER_LOCALE[String(copy.lang ?? "es")] ?? "es-ES")}+`} />
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}