import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── Country prefix data ── */
const PREFIXES = [
  { code: "ES", dial: "+34", flag: "\u{1F1EA}\u{1F1F8}", label: "España" },
  { code: "US", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}", label: "USA" },
  { code: "GB", dial: "+44", flag: "\u{1F1EC}\u{1F1E7}", label: "UK" },
  { code: "FR", dial: "+33", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "IT", dial: "+39", flag: "\u{1F1EE}\u{1F1F9}", label: "Italia" },
  { code: "DE", dial: "+49", flag: "\u{1F1E9}\u{1F1EA}", label: "Deutschland" },
  { code: "PT", dial: "+351", flag: "\u{1F1F5}\u{1F1F9}", label: "Portugal" },
  { code: "MX", dial: "+52", flag: "\u{1F1F2}\u{1F1FD}", label: "México" },
  { code: "AR", dial: "+54", flag: "\u{1F1E6}\u{1F1F7}", label: "Argentina" },
  { code: "CO", dial: "+57", flag: "\u{1F1E8}\u{1F1F4}", label: "Colombia" },
  { code: "CL", dial: "+56", flag: "\u{1F1E8}\u{1F1F1}", label: "Chile" },
  { code: "PE", dial: "+51", flag: "\u{1F1F5}\u{1F1EA}", label: "Perú" },
  { code: "BR", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}", label: "Brasil" },
  { code: "AT", dial: "+43", flag: "\u{1F1E6}\u{1F1F9}", label: "Austria" },
  { code: "CH", dial: "+41", flag: "\u{1F1E8}\u{1F1ED}", label: "Schweiz" },
  { code: "BE", dial: "+32", flag: "\u{1F1E7}\u{1F1EA}", label: "Belgique" },
  { code: "NL", dial: "+31", flag: "\u{1F1F3}\u{1F1F1}", label: "Nederland" },
  { code: "IE", dial: "+353", flag: "\u{1F1EE}\u{1F1EA}", label: "Ireland" },
  { code: "PR", dial: "+1", flag: "\u{1F1F5}\u{1F1F7}", label: "Puerto Rico" },
  { code: "UY", dial: "+598", flag: "\u{1F1FA}\u{1F1FE}", label: "Uruguay" },
  { code: "EC", dial: "+593", flag: "\u{1F1EA}\u{1F1E8}", label: "Ecuador" },
  { code: "PA", dial: "+507", flag: "\u{1F1F5}\u{1F1E6}", label: "Panamá" },
  { code: "CR", dial: "+506", flag: "\u{1F1E8}\u{1F1F7}", label: "Costa Rica" },
  { code: "DO", dial: "+1", flag: "\u{1F1E9}\u{1F1F4}", label: "Rep. Dominicana" },
  { code: "GT", dial: "+502", flag: "\u{1F1EC}\u{1F1F9}", label: "Guatemala" },
  { code: "AE", dial: "+971", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "SA", dial: "+966", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi Arabia" },
  { code: "AU", dial: "+61", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "JP", dial: "+81", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "CN", dial: "+86", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
];

/* No default country prefix: leads must explicitly choose their country
 * regardless of the UI language. */
const PLACEHOLDER_BY_LANG: Record<string, string> = {
  es: "Selecciona país",
  en: "Select country",
  it: "Seleziona paese",
  fr: "Choisir pays",
  de: "Land wählen",
  pt: "Selecionar país",
};

interface PhoneInputProps {
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  /** For react-hook-form controlled usage */
  register?: any;
  /** For controlled value (non-native mode) */
  value?: string;
  onChange?: (fullValue: string) => void;
  /** native = use raw html elements (not react-hook-form) */
  native?: boolean;
}

const PhoneInput = ({
  id = "phone",
  name = "phone",
  required = true,
  className = "",
  register,
  native = false,
}: PhoneInputProps) => {
  const { lang } = useLanguage();
  const placeholder = PLACEHOLDER_BY_LANG[lang] || PLACEHOLDER_BY_LANG.en;

  const selectCls =
    "h-10 rounded-l-md border border-r-0 border-input bg-background px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer";

  const inputCls = cn(
    "flex-1 h-10 rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className
  );

  if (native) {
    return (
      <div className="flex mt-1.5">
        <select
          id={`${id}_prefix`}
          name={`${id}_prefix`}
          defaultValue=""
          className={selectCls}
          style={{ width: "130px", minWidth: "130px" }}
          aria-label="Country prefix"
          required={required}
        >
          <option value="">{placeholder}</option>
          {PREFIXES.map((p) => (
            <option key={p.code} value={p.code}>
              {p.flag} {p.dial}
            </option>
          ))}
        </select>
        <Input
          id={id}
          name={name}
          type="tel"
          placeholder="600 000 000"
          required={required}
          maxLength={15}
          className={inputCls}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        />
      </div>
    );
  }

  /* react-hook-form mode */
  return (
    <div className="flex mt-1.5">
      <select
        id={`${id}_prefix`}
        defaultValue=""
        className={selectCls}
        style={{ width: "130px", minWidth: "130px" }}
        aria-label="Country prefix"
        required={required}
        {...(register ? register(`${name}_prefix`) : {})}
      >
        <option value="">{placeholder}</option>
        {PREFIXES.map((p) => (
          <option key={p.code} value={p.code}>
            {p.flag} {p.dial}
          </option>
        ))}
      </select>
      <Input
        id={id}
        type="tel"
        placeholder="600 000 000"
        maxLength={15}
        className={inputCls}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        {...(register ? register(name) : {})}
      />
    </div>
  );
};

export { PREFIXES };
export default PhoneInput;
