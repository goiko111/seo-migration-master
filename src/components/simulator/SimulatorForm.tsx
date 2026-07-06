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
import {
  COUNTRIES, REGIONS_BY_COUNTRY, CUISINE_TYPES, TICKET_RANGES, WINE_SERVICE,
  CLIENT_PROFILES, WINE_KNOWLEDGE, ORIGIN_PREFERENCE, WINE_TYPES, BEV_COSTS, MARGINS,
} from "@/data/simulatorRegions";
import type { SimulatePayload } from "@/lib/simulatorApi";

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

export default function SimulatorForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
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
      if (!data.restaurantName || data.restaurantName.length < 2) return "Indica el nombre del restaurante";
      if (!data.city) return "Indica la ciudad o zona";
      if (!data.country) return "Selecciona el país";
      if (!data.cuisineTypes?.length) return "Selecciona al menos un tipo de cocina";
    }
    if (step === 2) {
      if (!data.ticketMedio) return "Selecciona el ticket medio";
      if (data.wps == null) return "Define el protagonismo del vino";
      if (!data.wineService?.length) return "Selecciona el servicio de vino";
      if (!data.hasSommelier) return "Indica si tienes sommelier";
    }
    if (step === 3) {
      if (!data.clientProfiles?.length) return "Selecciona al menos un perfil de cliente";
    }
    if (step === 4) {
      if (!data.objective) return "Selecciona tu objetivo principal";
    }
    if (step === 5) {
      if (!data.contactName || data.contactName.trim().length < 2) return "Indica tu nombre";
      const email = (data.contactEmail ?? "").trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Indica un email válido";
      if (!acceptPrivacy) return "Debes aceptar la política de privacidad";
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
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Paso {step} de 5</div>

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
              <h2 className="text-2xl font-semibold">Tu Restaurante</h2>
              <Field label="Nombre del restaurante" required>
                <Input value={data.restaurantName} onChange={(e) => update("restaurantName", e.target.value)} placeholder="Casa Modelo" />
              </Field>
              <Field label="Ciudad / Zona" required>
                <Input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="Madrid" />
              </Field>
              <Field label="País" required>
                <Select value={data.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Tipo de cocina" required>
                <ChipGroup options={CUISINE_TYPES} value={data.cuisineTypes} onChange={(v) => update("cuisineTypes", v)} />
              </Field>
              <Field label={`Aforo: ${data.capacity} comensales`} required>
                <Slider value={[data.capacity]} min={20} max={300} step={5} onValueChange={([v]) => update("capacity", v)} />
              </Field>
              <Field label="¿Ya tiene carta de vinos?" required>
                <RadioGroup value={data.hasExistingList ? "yes" : "no"} onValueChange={(v) => update("hasExistingList", v === "yes")} className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="no" /> No (nueva apertura)</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="yes" /> Sí (reestructuración)</label>
                </RadioGroup>
                {data.hasExistingList && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Si quieres analizar tu carta actual, usa nuestro{" "}
                    <Link to="/analisis-carta" className="text-wine underline">Analizador de Cartas</Link>.
                    El simulador es para diseñar una carta nueva desde cero.
                  </p>
                )}
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold">Tu Concepto</h2>
              <Field label="Ticket medio" required>
                <ChipGroup multi={false} options={TICKET_RANGES} value={data.ticketMedio} onChange={(v) => update("ticketMedio", v)} />
              </Field>
              <Field label="Protagonismo del vino (WPS)" required>
                <WPSSlider value={data.wps} onChange={(v) => update("wps", v)} />
              </Field>
              <Field label="Servicio de vino" required>
                <ChipGroup options={WINE_SERVICE} value={data.wineService ?? []} onChange={(v) => update("wineService", v)} />
              </Field>
              <Field label="¿Sommelier en sala?" required>
                <RadioGroup value={data.hasSommelier} onValueChange={(v) => update("hasSommelier", v)} className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="si_dedicado" /> Sí, dedicado</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="si_compartido" /> Sí, compartido</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="no" /> No</label>
                </RadioGroup>
              </Field>
              <Field label="Almacenamiento (opcional)">
                <Select value={data.storageSize} onValueChange={(v) => update("storageSize", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeño (&lt;50 refs)</SelectItem>
                    <SelectItem value="medio">Medio (50-150)</SelectItem>
                    <SelectItem value="grande">Grande (150-300)</SelectItem>
                    <SelectItem value="bodega_propia">Bodega propia (300+)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold">Tu Cliente</h2>
              <Field label="Perfil de cliente" required>
                <ChipGroup options={CLIENT_PROFILES} value={data.clientProfiles ?? []} onChange={(v) => update("clientProfiles", v)} />
              </Field>
              <Field label="Sensibilidad al precio">
                <Slider value={[data.priceSensitivity ?? 50]} min={0} max={100} step={5} onValueChange={([v]) => update("priceSensitivity", v)} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Calidad ante todo</span><span>El precio importa mucho</span>
                </div>
              </Field>
              <Field label="Conocimiento de vino (opcional)">
                <ChipGroup multi={false} options={WINE_KNOWLEDGE} value={data.wineKnowledge ?? ""} onChange={(v) => update("wineKnowledge", v)} />
              </Field>
              <Field label="Preferencia de origen (opcional)">
                <ChipGroup options={ORIGIN_PREFERENCE} value={data.originPreference ?? []} onChange={(v) => update("originPreference", v)} />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold">Tu Carta</h2>
              <p className="text-sm text-muted-foreground -mt-3">Objetivos y preferencias para tu carta de vinos.</p>

              <Field label="Objetivo principal" required>
                <RadioGroup value={data.objective ?? ""} onValueChange={(v) => update("objective", v)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    ["improve_margin", "Mejorar margen"],
                    ["increase_rotation", "Mayor rotación"],
                    ["reduce_waste", "Reducir merma"],
                    ["new_list", "Carta desde cero"],
                    ["update_list", "Actualizar carta existente"],
                  ].map(([v, l]) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer p-2 rounded border border-input hover:border-wine/40">
                      <RadioGroupItem value={v} /> {l}
                    </label>
                  ))}
                </RadioGroup>
              </Field>

              <Field label={`Presupuesto primera compra: €${(data.budgetFirstPurchase ?? 0).toLocaleString("es-ES")}`}>
                <Slider value={[data.budgetFirstPurchase ?? 1000]} min={1000} max={50000} step={500} onValueChange={([v]) => update("budgetFirstPurchase", v)} />
              </Field>
              <Field label="Bev. Cost objetivo (opcional)">
                <ChipGroup multi={false} options={BEV_COSTS} value={data.bevCostTarget ?? ""} onChange={(v) => update("bevCostTarget", v)} />
              </Field>
              <Field label="Margen mínimo deseado (opcional)">
                <ChipGroup multi={false} options={MARGINS} value={data.minMargin ?? ""} onChange={(v) => update("minMargin", v)} />
              </Field>

              <Field label="Tipos de vino deseados (opcional)">
                <ChipGroup options={WINE_TYPES} value={data.preferredWineTypes ?? []} onChange={(v) => update("preferredWineTypes", v)} />
              </Field>
              {regions.length > 0 && (
                <Field label={`Regiones preferidas (opcional)`}>
                  <ChipGroup options={regions} value={data.preferredRegions ?? []} onChange={(v) => update("preferredRegions", v)} />
                </Field>
              )}
              <Field label="Estilo de carta (opcional)">
                <RadioGroup value={data.listStyle} onValueChange={(v) => update("listStyle", v)} className="grid grid-cols-2 gap-2">
                  {[
                    ["clasica", "Clásica (por tipos)"],
                    ["regiones", "Por regiones"],
                    ["progresiva", "Progresiva (cuerpo/sabor)"],
                    ["mixta", "Mixta"],
                  ].map(([v, l]) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value={v} /> {l}</label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="¿Incluir vinos naturales? (opcional)">
                <RadioGroup value={data.includeNatural} onValueChange={(v) => update("includeNatural", v)} className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="si" /> Sí</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="no" /> No</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="algunos" /> Algunos</label>
                </RadioGroup>
              </Field>
              <Field label="Notas adicionales (opcional)">
                <Textarea
                  maxLength={500}
                  value={data.notes ?? ""}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Ej: Queremos enfocarnos en vinos de autor..."
                />
                <div className="text-xs text-muted-foreground text-right mt-1">{(data.notes ?? "").length}/500</div>
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-2xl font-semibold">Tus Datos</h2>
              <p className="text-sm text-muted-foreground -mt-3">Para enviarte el informe completo y guardar tu simulación.</p>

              <Field label="Tu nombre" required>
                <Input
                  value={data.contactName ?? ""}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder="Ej: María García"
                  maxLength={100}
                />
              </Field>
              <Field label="Email profesional" required>
                <Input
                  type="email"
                  value={data.contactEmail ?? ""}
                  onChange={(e) => update("contactEmail", e.target.value)}
                  placeholder="tu@restaurante.com"
                  maxLength={255}
                />
              </Field>
              <Field label="Teléfono (opcional)">
                <Input
                  type="tel"
                  value={data.contactPhone ?? ""}
                  onChange={(e) => update("contactPhone", e.target.value)}
                  placeholder="+34 600 000 000"
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
                  Acepto la <Link to="/politica-privacidad" className="text-wine underline">política de privacidad</Link>
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
          <ArrowLeft className="mr-1" /> Atrás
        </Button>
        <Button type="button" onClick={next} className="bg-wine hover:bg-wine-dark text-white">
          {step === 5 ? "Simular carta" : "Siguiente"} <ArrowRight className="ml-1" />
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
