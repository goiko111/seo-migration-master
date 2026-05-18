import { Slider } from "@/components/ui/slider";
import { WPS_ZONES } from "@/data/simulatorRegions";

export default function WPSSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
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
    </div>
  );
}