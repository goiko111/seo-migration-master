import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { WPS_ZONES } from "@/data/simulatorRegions";
import { Info, ChevronDown } from "lucide-react";

export default function WPSSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [showLegend, setShowLegend] = useState(false);
  const zone = WPS_ZONES.find((z) => value >= z.min && value <= z.max) ?? WPS_ZONES[0];
  return (
    <div className="space-y-3">
      <Slider value={[value]} min={0} max={100} step={1} onValueChange={([v]) => onChange(v)} />
      <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-[10px] text-muted-foreground px-1">
        {WPS_ZONES.map((z) => (
          <span key={z.name} className="text-center whitespace-nowrap">{z.name}</span>
        ))}
      </div>
      <div className="rounded-lg border border-wine/30 bg-wine/5 p-3 text-center">
        <div className="text-xl">{zone.icon}</div>
        <div className="font-semibold text-wine">{zone.name} <span className="text-muted-foreground font-normal">· {value}/100</span></div>
        <div className="text-sm text-muted-foreground mt-1">{zone.desc}</div>
      </div>

      <button
        type="button"
        onClick={() => setShowLegend((s) => !s)}
        className="flex items-center gap-2 text-xs text-wine hover:underline mx-auto"
      >
        <Info size={14} />
        {showLegend ? "Ocultar leyenda" : "Ver significado de cada nivel"}
        <ChevronDown size={14} className={`transition-transform ${showLegend ? "rotate-180" : ""}`} />
      </button>

      {showLegend && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
          {WPS_ZONES.map((z) => (
            <div key={z.name} className="flex gap-3">
              <span className="text-lg leading-none shrink-0">{z.icon}</span>
              <div>
                <div className="font-semibold text-foreground">
                  {z.name} <span className="text-muted-foreground font-normal">({z.min}–{z.max})</span>
                </div>
                <div className="text-muted-foreground mt-0.5 leading-relaxed">{z.legend}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}