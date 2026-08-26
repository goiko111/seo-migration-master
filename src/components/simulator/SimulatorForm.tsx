import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import ChipGroup from "./ChipGroup";
import WPSSlider from "./WPSSlider";
import { REGIONS_BY_COUNTRY } from "@/data/simulatorRegions";
import { TICKET_RANGES } from "@/data/simulatorRegions";
import type { SimulatePayload } from "@/lib/simulatorApi";
import { simulatorText, type SimulatorCopy } from "./simulatorText";
import { simulatorFormText, NUMBER_LOCALE } from "./simulatorFormText";
import { useLanguage } from "@/i18n/LanguageContext";

export type FormData = Omit<SimulatePayload, "simulationId" | "lang">;

const initial: FormData = {
  restaurantName: "",
  city: "",
  country: "ES",
  cuisineTypes: [],
  capacity: 60,
  hasExistingList: false,
  ticketMedio: "",
  wps: 50,
  wineService: [],
  hasSommelier: "",
  storageSize: "",
  clientProfiles: [],
  priceSensitivity: 50,
  wineKnowledge: "",
  originPreference: [],
  budgetFirstPurchase: 8000,
  bevCostTarget: "",
  minMargin: "",
  servicesPerWeek: 10,
  weeklyCovers: 0,
  preferredWineTypes: ["Tinto", "Blanco", "Rosado", "Espumoso"],
  preferredRegions: [],
  listStyle: "",
  includeNatural: "",
  notes: "",
  objective: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

export default function SimulatorForm({ onSubmit, copy }: { onSubmit: (data: FormData) => void; copy?: SimulatorCopy }) {
  const c = copy ?? simulatorText("es");
  const f = simulatorFormText(c.lang);
  const { localePath } = useLanguage();
  const numberLocale = NUMBER_LOCALE[String(c.lang ?? "es")] ?? "es-ES";
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [touched, setTouched] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Auto-calc weekly covers
  useEffect(() => {
    const auto = Math.round((data.capacity * 0.65 * (data.servicesPerWeek || 0)) / 2);
    setData((d) => (d.weeklyCovers === 0 || d.weeklyCovers == null ? { ...d, weeklyCovers: auto } : d));
  }, [data.capacity, data.servicesPerWeek]);

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!data.restaurantName || data.restaurantName.length < 2) return f.errors.name;
      if (!data.city) return f.errors.city;
      if (!data.country) return f.errors.country;
      if (!data.cuisineTypes?.length) return f.errors.cuisine;
    }
    if (step === 2) {
      if (!data.ticketMedio) return f.errors.ticket;
      if (data.wps == null) return f.errors.wps;
      if (!data.wineService?.length) return f.errors.wineService;
      if (!data.hasSommelier) return f.errors.sommelier;
    }
    if (step === 3) {
      if (!data.clientProfiles?.length) return f.errors.clientProfile;
    }
    if (step === 4) {
      if (!data.objective) return f.errors.objective;
    }
    if (step === 5) {
      if (!data.contactName || data.contactName.trim().length < 2) return f.errors.yourName;
      const email = (data.contactEmail ?? "").trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return f.errors.email;
      if (!acceptPrivacy) return f.errors.privacy;
    }
    return null;
  };

  const next = () => {
    setTouched(true);
    if (validateStep()) return;
    setTouched(false);
    if (step === 5) onSubmit(data);
    else setStep((s) => s + 1);
  };
  const back = () => { setTouched(false); setStep((s) => Math.max(1, s - 1)); };

  const error = touched ? validateStep() : null;
  const regions = REGIONS_BY_COUNTRY[data.country] ?? [];

  return (
    <Card className="p-6 md:p-8 max-w-2xl mx-auto bg-card border-wine/20">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-2 flex-1 rounded-full transition-colors ${n <= step ? "bg-wine" : "bg-muted"}`}
          />
        ))}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.stepOf(step)}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold">{f.steps.restaurant}</h2>
              <Field label={f.labels.name} required>
                <Input value={data.restaurantName} onChange={(e) => update("restaurantName", e.target.value)} placeholder={f.placeholders.name} />
              </Field>
              <Field label={f.labels.city} required>
                <Input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder={f.placeholders.city} />
              </Field>
              <Field label={f.labels.country} required>
                <Select value={data.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {f.options.countries.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={f.labels.cuisine} required>
                <ChipGroup options={f.options.cuisine} value={data.cuisineTypes} onChange={(v) => update("cuisineTypes", v)} />
              </Field>
              <Field label={f.labels.capacity(data.capacity)} required>
                <Slider value={[data.capacity]} min={20} max={300} step={5} onValueChange={([v]) => update("capacity", v)} />
              </Field>
              <Field label={f.labels.hasList} required>
                <RadioGroup value={data.hasExistingList ? "yes" : "no"} onValueChange={(v) => update("hasExistingList", v === "yes")} className="flex gap-6">
                  {f.options.hasList.map((o) => (
                    <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value={o.value} /> {o.label}
                    </label>
                  ))}
                </RadioGroup>
                {data.hasExistingList && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {f.helpExistingListPre}{" "}
                    <Link to={localePath("/analisis-carta")} className="text-wine underline">{f.helpExistingListLink}</Link>.{" "}
                    {f.helpExistingListPost}
                  </p>
                )}
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold">{f.steps.concept}</h2>
              <Field label={f.labels.ticket} required>
                <ChipGroup multi={false} options={TICKET_RANGES} value={data.ticketMedio} onChange={(v) => update("ticketMedio", v)} />
              </Field>
              <Field label={f.labels.wps} required>
                <WPSSlider value={data.wps} onChange={(v) => update("wps", v)} copy={f} />
              </Field>
              <Field label={f.labels.wineService} required>
                <ChipGroup options={f.options.wineService} value={data.wineService ?? []} onChange={(v) => update("wineService", v)} />
              </Field>
              <Field label={f.labels.sommelier} required>
                <RadioGroup value={data.hasSommelier} onValueChange={(v) => update("hasSommelier", v)} className="flex flex-wrap gap-6">
                  {f.options.sommelier.map((o) => (
                    <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value={o.value} /> {o.label}
                    </label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label={f.labels.storage}>
                <Select value={data.storageSize} onValueChange={(v) => update("storageSize", v)}>
                  <SelectTrigger><SelectValue placeholder={f.placeholders.select} /></SelectTrigger>
                  <SelectContent>
                    {f.options.storage.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold">{f.steps.client}</h2>
              <Field label={f.labels.clientProfile} required>
                <ChipGroup options={f.options.clientProfiles} value={data.clientProfiles ?? []} onChange={(v) => update("clientProfiles", v)} />
              </Field>
              <Field label={f.labels.priceSensitivity}>
                <Slider value={[data.priceSensitivity ?? 50]} min={0} max={100} step={5} onValueChange={([v]) => update("priceSensitivity", v)} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{f.labels.priceQuality}</span><span>{f.labels.pricePrice}</span>
                </div>
              </Field>
              <Field label={f.labels.wineKnowledge}>
                <ChipGroup multi={false} options={f.options.wineKnowledge} value={data.wineKnowledge ?? ""} onChange={(v) => update("wineKnowledge", v)} />
              </Field>
              <Field label={f.labels.originPreference}>
                <ChipGroup options={f.options.originPreference} value={data.originPreference ?? []} onChange={(v) => update("originPreference", v)} />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold">{f.steps.list}</h2>
              <p className="text-sm text-muted-foreground -mt-3">{f.listIntro}</p>

              <Field label={f.labels.objective} required>
                <RadioGroup value={data.objective ?? ""} onValueChange={(v) => update("objective", v)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {f.options.objective.map((o) => (
                    <label key={o.value} className="flex items-center gap-2 cursor-pointer p-2 rounded border border-input hover:border-wine/40">
                      <RadioGroupItem value={o.value} /> {o.label}
                    </label>
                  ))}
                </RadioGroup>
              </Field>

              <Field label={f.labels.budget(`€${(data.budgetFirstPurchase ?? 0).toLocaleString(numberLocale)}`)}>
                <Slider value={[data.budgetFirstPurchase ?? 1000]} min={1000} max={50000} step={500} onValueChange={([v]) => update("budgetFirstPurchase", v)} />
              </Field>
              <Field label={f.labels.bevCost}>
                <ChipGroup multi={false} options={f.options.bevCosts} value={data.bevCostTarget ?? ""} onChange={(v) => update("bevCostTarget", v)} />
              </Field>
              <Field label={f.labels.minMargin}>
                <ChipGroup multi={false} options={f.options.margins} value={data.minMargin ?? ""} onChange={(v) => update("minMargin", v)} />
              </Field>

              <Field label={f.labels.wineTypes}>
                <ChipGroup options={f.options.wineTypes} value={data.preferredWineTypes ?? []} onChange={(v) => update("preferredWineTypes", v)} />
              </Field>
              {regions.length > 0 && (
                <Field label={f.labels.regions}>
                  <ChipGroup options={regions} value={data.preferredRegions ?? []} onChange={(v) => update("preferredRegions", v)} />
                </Field>
              )}
              <Field label={f.labels.listStyle}>
                <RadioGroup value={data.listStyle} onValueChange={(v) => update("listStyle", v)} className="grid grid-cols-2 gap-2">
                  {f.options.listStyle.map((o) => (
                    <label key={o.value} className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value={o.value} /> {o.label}</label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label={f.labels.includeNatural}>
                <RadioGroup value={data.includeNatural} onValueChange={(v) => update("includeNatural", v)} className="flex gap-6">
                  {f.options.includeNatural.map((o) => (
                    <label key={o.value} className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value={o.value} /> {o.label}</label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label={f.labels.notes}>
                <Textarea
                  maxLength={500}
                  value={data.notes ?? ""}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder={f.placeholders.notes}
                />
                <div className="text-xs text-muted-foreground text-right mt-1">{(data.notes ?? "").length}/500</div>
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-2xl font-semibold">{f.steps.contact}</h2>
              <p className="text-sm text-muted-foreground -mt-3">{f.contactIntro}</p>

              <Field label={f.labels.yourName} required>
                <Input
                  value={data.contactName ?? ""}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder={f.placeholders.yourName}
                  maxLength={100}
                />
              </Field>
              <Field label={f.labels.email} required>
                <Input
                  type="email"
                  value={data.contactEmail ?? ""}
                  onChange={(e) => update("contactEmail", e.target.value)}
                  placeholder={f.placeholders.email}
                  maxLength={255}
                />
              </Field>
              <Field label={f.labels.phone}>
                <Input
                  type="tel"
                  value={data.contactPhone ?? ""}
                  onChange={(e) => update("contactPhone", e.target.value)}
                  placeholder={f.placeholders.phone}
                  maxLength={40}
                />
              </Field>
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  {f.labels.privacyPre}{" "}
                  <Link to={localePath("/politica-privacidad")} className="text-wine underline">{f.labels.privacyLink}</Link>
                  <span className="text-wine"> *</span>
                </span>
              </label>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="text-sm text-destructive mt-4">{error}</p>}

      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="ghost" onClick={back} disabled={step === 1}>
          <ArrowLeft className="mr-1" /> {c.back}
        </Button>
        <Button type="button" onClick={next} className="bg-wine hover:bg-wine-dark text-white">
          {step === 5 ? c.submit : c.next} <ArrowRight className="ml-1" />
        </Button>
      </div>
    </Card>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-wine">*</span>}
      </Label>
      {children}
    </div>
  );
}

function NumberStepper({ value, onChange, min = 0, max = 9999, step = 1 }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <div className="flex items-center gap-2 w-fit">
      <Button type="button" variant="outline" size="icon" onClick={() => onChange(Math.max(min, value - step))}><Minus /></Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (Number.isFinite(v)) onChange(Math.max(min, Math.min(max, v)));
        }}
        className="w-24 text-center"
      />
      <Button type="button" variant="outline" size="icon" onClick={() => onChange(Math.min(max, value + step))}><Plus /></Button>
    </div>
  );
}
// audit-marker: key-prop-verified 2026-05-25
