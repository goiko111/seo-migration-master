import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * State / Province field that conditionally appears when the user
 * selects a US or Canadian phone prefix. Listens to the related
 * `<phoneId>_prefix` <select> to toggle visibility.
 */
const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],
  ["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],
  ["DC","District of Columbia"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],
  ["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],
  ["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],
  ["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],
  ["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],
  ["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],
  ["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],
  ["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],["PR","Puerto Rico"],
] as const;

const CA_PROVINCES = [
  ["AB","Alberta"],["BC","British Columbia"],["MB","Manitoba"],["NB","New Brunswick"],
  ["NL","Newfoundland and Labrador"],["NS","Nova Scotia"],["ON","Ontario"],
  ["PE","Prince Edward Island"],["QC","Quebec"],["SK","Saskatchewan"],
  ["NT","Northwest Territories"],["NU","Nunavut"],["YT","Yukon"],
] as const;

const LABELS: Record<string, { state: string; placeholder: string }> = {
  es: { state: "Estado", placeholder: "Selecciona un estado" },
  en: { state: "State", placeholder: "Select a state" },
  it: { state: "Stato", placeholder: "Seleziona uno stato" },
  fr: { state: "État", placeholder: "Sélectionnez un état" },
  de: { state: "Bundesstaat", placeholder: "Bundesstaat wählen" },
  pt: { state: "Estado", placeholder: "Selecione um estado" },
};

interface StateFieldProps {
  /** id of the matching <PhoneInput>, used to find the `<id>_prefix` select. */
  phoneId?: string;
  /** Field name submitted with the form data. */
  name?: string;
}

const StateField = ({ phoneId = "phone", name = "state" }: StateFieldProps) => {
  const { lang } = useLanguage();
  const l = LABELS[lang] || LABELS.en;
  const [country, setCountry] = useState<"US" | "CA" | null>(null);

  useEffect(() => {
    const sel = document.getElementById(`${phoneId}_prefix`) as HTMLSelectElement | null;
    if (!sel) return;
    const update = () => {
      const v = sel.value;
      if (v === "US" || v === "PR" || v === "DO") setCountry("US");
      else if (v === "CA") setCountry("CA");
      else setCountry(null);
    };
    update();
    sel.addEventListener("change", update);
    return () => sel.removeEventListener("change", update);
  }, [phoneId]);

  if (!country) return null;

  const options = country === "US" ? US_STATES : CA_PROVINCES;

  return (
    <div>
      <Label htmlFor={name} className="text-sm font-medium">
        {l.state} <span className="text-destructive">*</span>
      </Label>
      <select
        id={name}
        name={name}
        required
        defaultValue=""
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="" disabled>{l.placeholder}</option>
        {options.map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default StateField;