import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import ScoreCircle from "./ScoreCircle";
import UnlockForm from "./UnlockForm";
import { WINE_TYPE_META } from "@/data/simulatorRegions";
import type { Teaser } from "@/lib/simulatorApi";

type Props = {
  teaser: Teaser;
  simulationId: string;
  isComplete: boolean;
};

export default function TeaserReport({ teaser, simulationId, isComplete }: Props) {
  const totalRefs = teaser.totalRefs;
  const distribution = teaser.distribution || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {!isComplete && (
        <div className="text-center text-sm text-muted-foreground">
          Vista preliminar — el informe se sigue procesando en segundo plano.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Score */}
        <Card className="p-6 flex flex-col items-center justify-center border-wine/20">
          <ScoreCircle score={teaser.coherenceScore} />
          <div className="mt-3 text-sm text-muted-foreground">Perfil: <span className="text-foreground font-medium">{teaser.profile}</span></div>
        </Card>

        {/* Métricas */}
        <Card className="p-6 border-wine/20 md:col-span-2">
          <h3 className="font-semibold mb-3">Métricas clave</h3>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Referencias recomendadas</dt>
            <dd className="font-medium">{teaser.refsRange.min}-{teaser.refsRange.max}</dd>
            <dt className="text-muted-foreground">Total estimado</dt>
            <dd className="font-medium">{totalRefs}</dd>
            <dt className="text-muted-foreground">Inversión primera compra</dt>
            <dd className="font-medium">{teaser.currency}{teaser.firstPurchase.low.toLocaleString("es-ES")} – {teaser.currency}{teaser.firstPurchase.high.toLocaleString("es-ES")}</dd>
            <dt className="text-muted-foreground">Alertas</dt>
            <dd className="font-medium">{teaser.alerts}</dd>
          </dl>
        </Card>
      </div>

      {/* Distribución */}
      <Card className="p-6 border-wine/20">
        <h3 className="font-semibold mb-3">Distribución por tipo</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b">
              <tr><th className="py-2">Tipo</th><th className="py-2">%</th><th className="py-2">Refs aprox.</th></tr>
            </thead>
            <tbody>
              {Object.entries(distribution).map(([key, pct]) => {
                const meta = WINE_TYPE_META[key] ?? { emoji: "🍷", label: key };
                const refs = Math.round((Number(pct) / 100) * totalRefs);
                return (
                  <tr key={key} className="border-b last:border-0">
                    <td className="py-2">{meta.emoji} {meta.label}</td>
                    <td className="py-2">{pct}%</td>
                    <td className="py-2">{refs}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Blurred sections */}
      <div className="relative">
        <div className="grid md:grid-cols-2 gap-6 select-none pointer-events-none" aria-hidden>
          {["Mapa de precios", "Geografía del vino", "Análisis financiero", "Recomendaciones IA"].map((t) => (
            <Card key={t} className="p-6 border-wine/20 min-h-[160px]">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Lock className="w-4 h-4 text-wine" /> {t}</h3>
              <div className="space-y-2">
                <div className="h-3 rounded bg-muted w-3/4" />
                <div className="h-3 rounded bg-muted w-1/2" />
                <div className="h-3 rounded bg-muted w-2/3" />
                <div className="h-3 rounded bg-muted w-1/3" />
              </div>
            </Card>
          ))}
        </div>
        <div className="absolute inset-0 backdrop-blur-md bg-background/60 flex items-center justify-center p-4">
          <UnlockForm simulationId={simulationId} showContactCopy={!isComplete} />
        </div>
      </div>
    </motion.div>
  );
}