import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Unlock } from "lucide-react";
import { unlockReport, SIMULATOR_BASE_URL } from "@/lib/simulatorApi";
import { simulatorText, type SimulatorCopy } from "./simulatorText";
import { simulatorFormText } from "./simulatorFormText";

type Props = {
  simulationId: string;
  showContactCopy?: boolean;
  prefill?: { name?: string; email?: string; phone?: string };
  copy?: SimulatorCopy;
};

export default function UnlockForm({ simulationId, showContactCopy, prefill, copy }: Props) {
  const c = copy ?? simulatorText("es");
  const f = simulatorFormText(c.lang);
  const schema = z.object({
    email: z.string().trim().email(f.unlock.invalidEmail).max(255),
    name: z.string().trim().min(2, f.unlock.invalidName).max(100),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
  });
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [name, setName] = useState(prefill?.name ?? "");
  const [phone, setPhone] = useState(prefill?.phone ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, name, phone });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? f.unlock.invalidData); return; }
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
        <h3 className="text-xl font-semibold">{c.unlockTitle}</h3>
        {showContactCopy ? (
          <p className="text-sm text-muted-foreground mt-2">
            {c.unlockContactCopy}
          </p>
        ) : (
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 text-left">
            {c.unlockBullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        )}
      </div>

      {done ? (
        <div className="text-center text-sm text-wine font-medium py-6">
          {c.unlockDone}
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="sim-email">{f.labels.email}</Label>
            <Input id="sim-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="sim-name">{f.labels.yourName}</Label>
            <Input id="sim-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="sim-phone">{f.labels.phone}</Label>
            <Input id="sim-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full bg-wine hover:bg-wine-dark text-white">
            {submitting ? f.unlock.sending : f.unlock.cta}
          </Button>
        </form>
      )}
    </Card>
  );
}
