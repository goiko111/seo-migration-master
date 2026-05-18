import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Unlock } from "lucide-react";
import { unlockReport, SIMULATOR_BASE_URL } from "@/lib/simulatorApi";

const schema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  name: z.string().trim().min(2, "Indica tu nombre").max(100),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
});

type Props = {
  simulationId: string;
  showContactCopy?: boolean;
};

export default function UnlockForm({ simulationId, showContactCopy }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, name, phone });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Datos inválidos"); return; }
    setError(null); setSubmitting(true);
    const res = await unlockReport(simulationId, { email: parsed.data.email, name: parsed.data.name, phone: parsed.data.phone || undefined });
    setSubmitting(false);
    if (res?.reportUrl) {
      setDone(true);
      setTimeout(() => {
        window.location.href = `${SIMULATOR_BASE_URL}${res.reportUrl}`;
      }, 800);
      return;
    }
    // Soft success even if backend slow — message already shown
    setDone(true);
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-card border-wine/30">
      <div className="text-center mb-4">
        <Unlock className="w-8 h-8 text-wine mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Desbloquea el informe completo</h3>
        {showContactCopy ? (
          <p className="text-sm text-muted-foreground mt-2">
            Te enviaremos el informe por email en menos de 48 horas.
          </p>
        ) : (
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 text-left">
            <li>📊 Mapa de precios detallado</li>
            <li>🗺️ Geografía del vino</li>
            <li>💰 Análisis financiero</li>
            <li>🤖 Recomendaciones IA personalizadas</li>
          </ul>
        )}
      </div>

      {done ? (
        <div className="text-center text-sm text-wine font-medium py-6">
          ✅ ¡Desbloqueado! Cargando informe...
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="sim-email">Email profesional</Label>
            <Input id="sim-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="sim-name">Tu nombre</Label>
            <Input id="sim-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="sim-phone">Teléfono (opcional)</Label>
            <Input id="sim-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full bg-wine hover:bg-wine-dark text-white">
            {submitting ? "Enviando..." : "🔓 Ver informe completo"}
          </Button>
        </form>
      )}
    </Card>
  );
}