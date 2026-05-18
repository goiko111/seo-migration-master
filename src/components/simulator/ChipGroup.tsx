import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  options: string[];
  value: string[] | string;
  onChange: (v: any) => void;
  multi?: boolean;
  className?: string;
};

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
      {options.map((opt) => {
        const selected = isSelected(opt);
        return (
          <Button
            key={opt}
            type="button"
            variant={selected ? "default" : "outline"}
            size="sm"
            onClick={() => toggle(opt)}
            className={cn(
              "rounded-full transition-all",
              selected && "bg-wine hover:bg-wine-dark text-white border-wine",
            )}
          >
            {opt}
          </Button>
        );
      })}
    </div>
  );
}