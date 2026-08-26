import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChipOption = string | { value: string; label: string };

type Props = {
  options: ChipOption[];
  value: string[] | string;
  onChange: (v: any) => void;
  multi?: boolean;
  className?: string;
};

const toOption = (opt: ChipOption) =>
  typeof opt === "string" ? { value: opt, label: opt } : opt;

export default function ChipGroup({ options, value, onChange, multi = true, className }: Props) {
  const isSelected = (opt: string) =>
    multi ? (Array.isArray(value) && value.includes(opt)) : value === opt;

  const toggle = (opt: string) => {
    if (multi) {
      const current = Array.isArray(value) ? value : [];
      onChange(current.includes(opt) ? current.filter((v) => v !== opt) : [...current, opt]);
    } else {
      onChange(opt);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((raw) => {
        const opt = toOption(raw);
        const selected = isSelected(opt.value);
        return (
          <Button
            key={opt.value}
            type="button"
            variant={selected ? "default" : "outline"}
            size="sm"
            onClick={() => toggle(opt.value)}
            className={cn(
              "rounded-full transition-all",
              selected && "bg-wine hover:bg-wine-dark text-white border-wine",
            )}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
