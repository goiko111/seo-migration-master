import { Search, User, Phone, Mail, MapPin, Wine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const positionOptions = [
  { value: "propietario", label: "Propietario/a" },
  { value: "director", label: "Director/a" },
  { value: "sommelier", label: "Sommelier" },
  { value: "jefe-sala", label: "Jefe/a de sala" },
  { value: "chef", label: "Chef" },
  { value: "responsable-bebidas", label: "Responsable de bebidas" },
  { value: "gerente", label: "Gerente" },
  { value: "otro", label: "Otro" },
];

export const referencesOptions = [
  { value: "20-40", label: "20–40 referencias" },
  { value: "40-80", label: "40–80 referencias" },
  { value: "80-150", label: "80–150 referencias" },
  { value: "150-300", label: "150–300 referencias" },
  { value: "300-500", label: "300–500 referencias" },
  { value: "500+", label: "+500 referencias" },
];

interface ContactFormFieldsProps {
  register?: any;
  errors?: any;
  inputClassName?: string;
  position?: string;
  onPositionChange?: (value: string) => void;
  referencesCount?: string;
  onReferencesCountChange?: (value: string) => void;
  native?: boolean;
}

const iconWrap = "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground";

const ContactFormFields = ({
  register,
  errors,
  inputClassName = "",
  position,
  onPositionChange,
  referencesCount,
  onReferencesCountChange,
  native,
}: ContactFormFieldsProps) => {
  const cls = cn("pl-10 bg-background border-border", inputClassName);

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
            <Input id="restaurant" name="restaurant" placeholder="Busca tu restaurante en Google..." required className={cls} />
          ) : (
            <Input id="restaurant" placeholder="Busca tu restaurante en Google..." {...register("restaurant")} className={cls} />
          )}
        </div>
        {errors?.restaurant && <p className="text-xs text-destructive mt-1">{errors.restaurant.message}</p>}
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-sm font-medium">
          Tu nombre <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <User size={16} className={iconWrap} />
          {native ? (
            <Input id="name" name="name" placeholder="Nombre completo" required className={cls} />
          ) : (
            <Input id="name" placeholder="Nombre completo" {...register("name")} className={cls} />
          )}
        </div>
        {errors?.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      {/* Position (dropdown) */}
      <div>
        <Label htmlFor="position" className="text-sm font-medium">
          Tu cargo <span className="text-destructive">*</span>
        </Label>
        <div className="mt-1.5">
          {native ? (
            <select id="position" name="position" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue="">
              <option value="" disabled>Selecciona tu cargo</option>
              {positionOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <Select value={position} onValueChange={onPositionChange}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Selecciona tu cargo" />
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

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-sm font-medium">
          Teléfono <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <Phone size={16} className={iconWrap} />
          {native ? (
            <Input id="phone" name="phone" type="tel" placeholder="+34 600 000 000" required className={cls} />
          ) : (
            <Input id="phone" type="tel" placeholder="+34 600 000 000" {...register("phone")} className={cls} />
          )}
        </div>
        {errors?.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <Mail size={16} className={iconWrap} />
          {native ? (
            <Input id="email" name="email" type="email" placeholder="tu@email.com" required className={cls} />
          ) : (
            <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} className={cls} />
          )}
        </div>
        {errors?.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      {/* City */}
      <div>
        <Label htmlFor="city" className="text-sm font-medium">
          Ciudad <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <MapPin size={16} className={iconWrap} />
          {native ? (
            <Input id="city" name="city" placeholder="Tu ciudad" required className={cls} />
          ) : (
            <Input id="city" placeholder="Tu ciudad" {...register("city")} className={cls} />
          )}
        </div>
        {errors?.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
      </div>

      {/* References count (dropdown) */}
      <div>
        <Label htmlFor="references_count" className="text-sm font-medium">
          Nº de referencias en carta <span className="text-destructive">*</span>
        </Label>
        <div className="mt-1.5">
          {native ? (
            <select id="references_count" name="references_count" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue="">
              <option value="" disabled>Selecciona un rango</option>
              {referencesOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
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
    </>
  );
};

export default ContactFormFields;
