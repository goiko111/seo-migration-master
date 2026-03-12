import { Search, User, Phone, Mail, MapPin, Wine, Building2, MapPinned, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const positionOptions = [
  { value: "propietario", label: "Propietario/a" },
  { value: "director", label: "Director/a de F&B" },
  { value: "sommelier", label: "Sommelier / Jefe de bebidas" },
  { value: "jefe-sala", label: "Jefe/a de sala" },
  { value: "chef", label: "Chef ejecutivo" },
  { value: "responsable-bebidas", label: "Responsable de compras" },
  { value: "gerente", label: "Gerente / Dirección general" },
  { value: "otro", label: "Otro cargo" },
];

export const referencesOptions = [
  { value: "20-40", label: "20–40 referencias" },
  { value: "40-80", label: "40–80 referencias" },
  { value: "80-150", label: "80–150 referencias" },
  { value: "150-300", label: "150–300 referencias" },
  { value: "300-500", label: "300–500 referencias" },
  { value: "500+", label: "Más de 500 referencias" },
];

export const businessTypeOptions = [
  { value: "restaurante-independiente", label: "Restaurante independiente" },
  { value: "grupo-restauracion", label: "Grupo de restauración" },
  { value: "hotel", label: "Hotel / Resort" },
  { value: "wine-bar", label: "Wine bar / Vinoteca" },
  { value: "catering", label: "Catering / Eventos" },
  { value: "otro", label: "Otro tipo de negocio" },
];

export const numLocationsOptions = [
  { value: "1", label: "1 local" },
  { value: "2-5", label: "2–5 locales" },
  { value: "6-15", label: "6–15 locales" },
  { value: "16-50", label: "16–50 locales" },
  { value: "50+", label: "Más de 50 locales" },
];

export const mainChallengeOptions = [
  { value: "vender-mas-vino", label: "Aumentar ventas de vino" },
  { value: "mejorar-margenes", label: "Mejorar márgenes por botella" },
  { value: "rotacion-stock", label: "Reducir stock muerto / mejorar rotación" },
  { value: "formar-equipo", label: "Formar al equipo de sala en vino" },
  { value: "optimizar-carta", label: "Optimizar surtido y estructura de carta" },
  { value: "digitalizar-carta", label: "Digitalizar la carta de vinos" },
  { value: "gestionar-multi-local", label: "Centralizar gestión en varios locales" },
  { value: "otro", label: "Otro reto" },
];

/**
 * Form variant determines which fields are shown:
 * - "demo" (BOFU): All core fields + business type, locales, main challenge
 * - "contact" (BOFU): All core fields (unchanged from current)
 * - "analysis" (MOFU): Lighter — no position/phone required, optional qualifiers
 * - "resource" (MOFU): Lightest — name, email, restaurant, optional refs
 */
export type FormVariant = "demo" | "contact" | "analysis" | "resource";

interface ContactFormFieldsProps {
  register?: any;
  errors?: any;
  inputClassName?: string;
  position?: string;
  onPositionChange?: (value: string) => void;
  referencesCount?: string;
  onReferencesCountChange?: (value: string) => void;
  native?: boolean;
  /** Form variant to control field visibility */
  variant?: FormVariant;
}

const iconWrap = "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground";

const NativeSelect = ({
  id, name, required, options, placeholder,
}: { id: string; name: string; required?: boolean; options: { value: string; label: string }[]; placeholder: string }) => (
  <select
    id={id}
    name={name}
    required={required}
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    defaultValue=""
  >
    <option value="" disabled>{placeholder}</option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);

const ContactFormFields = ({
  register,
  errors,
  inputClassName = "",
  position,
  onPositionChange,
  referencesCount,
  onReferencesCountChange,
  native,
  variant = "contact",
}: ContactFormFieldsProps) => {
  const cls = cn("pl-10 bg-background border-border", inputClassName);
  const isDemo = variant === "demo";
  const isAnalysis = variant === "analysis";
  const isResource = variant === "resource";
  const isContact = variant === "contact";

  // Phone & position are required for demo/contact, optional for analysis, hidden for resource
  const phoneRequired = isDemo || isContact;
  const positionRequired = isDemo || isContact;
  const showPosition = !isResource;
  const showPhone = !isResource;
  const showCity = !isResource;
  const showReferences = !isResource;
  const showBusinessType = isDemo;
  const showLocations = isDemo;
  const showChallenge = isDemo;

  return (
    <>
      {/* Restaurant */}
      <div>
        <Label htmlFor="restaurant" className="text-sm font-medium">
          Nombre del restaurante <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <Search size={16} className={iconWrap} />
          {native ? (
            <Input id="restaurant" name="restaurant" placeholder="Ej. Restaurante La Viña" required maxLength={100} className={cls} />
          ) : (
            <Input id="restaurant" placeholder="Ej. Restaurante La Viña" {...register("restaurant")} className={cls} />
          )}
        </div>
        {errors?.restaurant && <p className="text-xs text-destructive mt-1">{errors.restaurant.message}</p>}
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-sm font-medium">
          Tu nombre completo <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <User size={16} className={iconWrap} />
          {native ? (
            <Input id="name" name="name" placeholder="Nombre y apellidos" required maxLength={100} className={cls} />
          ) : (
            <Input id="name" placeholder="Nombre y apellidos" {...register("name")} className={cls} />
          )}
        </div>
        {errors?.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      {/* Position (hidden for resource) */}
      {showPosition && (
        <div>
          <Label htmlFor="position" className="text-sm font-medium">
            Tu cargo en el negocio {positionRequired && <span className="text-destructive">*</span>}
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="position" name="position" required={positionRequired} options={positionOptions} placeholder="¿Cuál es tu rol?" />
            ) : (
              <Select value={position} onValueChange={onPositionChange}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="¿Cuál es tu rol?" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {errors?.position && <p className="text-xs text-destructive mt-1">{errors.position.message}</p>}
        </div>
      )}

      {/* Two-column row: Phone + Email */}
      <div className={showPhone ? "grid sm:grid-cols-2 gap-4" : ""}>
        {showPhone && (
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Teléfono {phoneRequired && <span className="text-destructive">*</span>}
            </Label>
            <div className="relative mt-1.5">
              <Phone size={16} className={iconWrap} />
              {native ? (
                <Input id="phone" name="phone" type="tel" placeholder="+34 600 000 000" required={phoneRequired} maxLength={20} className={cls} />
              ) : (
                <Input id="phone" type="tel" placeholder="+34 600 000 000" {...register("phone")} className={cls} />
              )}
            </div>
            {errors?.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
          </div>
        )}

        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email profesional <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Mail size={16} className={iconWrap} />
            {native ? (
              <Input id="email" name="email" type="email" placeholder="tu@restaurante.com" required maxLength={255} className={cls} />
            ) : (
              <Input id="email" type="email" placeholder="tu@restaurante.com" {...register("email")} className={cls} />
            )}
          </div>
          {errors?.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Two-column row: City + References */}
      {(showCity || showReferences) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {showCity && (
            <div>
              <Label htmlFor="city" className="text-sm font-medium">
                Ciudad {(isDemo || isContact) && <span className="text-destructive">*</span>}
              </Label>
              <div className="relative mt-1.5">
                <MapPin size={16} className={iconWrap} />
                {native ? (
                  <Input id="city" name="city" placeholder="Ej. Madrid" required={isDemo || isContact} maxLength={80} className={cls} />
                ) : (
                  <Input id="city" placeholder="Ej. Madrid" {...register("city")} className={cls} />
                )}
              </div>
              {errors?.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
            </div>
          )}

          {showReferences && (
            <div>
              <Label htmlFor="references_count" className="text-sm font-medium">
                Referencias en carta {(isDemo || isContact) && <span className="text-destructive">*</span>}
              </Label>
              <div className="mt-1.5">
                {native ? (
                  <NativeSelect id="references_count" name="references_count" required={isDemo || isContact} options={referencesOptions} placeholder="Selecciona un rango" />
                ) : (
                  <Select value={referencesCount} onValueChange={onReferencesCountChange}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      {referencesOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {errors?.references_count && <p className="text-xs text-destructive mt-1">{errors.references_count.message}</p>}
            </div>
          )}
        </div>
      )}

      {/* ── BOFU Qualifying Fields (Demo only) ── */}
      {showBusinessType && (
        <div>
          <Label htmlFor="business_type" className="text-sm font-medium">
            Tipo de negocio
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="business_type" name="business_type" options={businessTypeOptions} placeholder="Selecciona tipo de negocio" />
            ) : null}
          </div>
        </div>
      )}

      {showLocations && (
        <div>
          <Label htmlFor="num_locations" className="text-sm font-medium">
            Número de locales
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="num_locations" name="num_locations" options={numLocationsOptions} placeholder="¿Cuántos locales gestionas?" />
            ) : null}
          </div>
        </div>
      )}

      {showChallenge && (
        <div>
          <Label htmlFor="main_challenge" className="text-sm font-medium">
            Principal reto con tu carta de vinos
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="main_challenge" name="main_challenge" options={mainChallengeOptions} placeholder="¿Qué quieres mejorar?" />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFormFields;
