import { Search, User, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const contactFormSchema = {
  restaurant: { required: true, maxLength: 255 },
  name: { required: true, maxLength: 100 },
  position: { required: true },
  phone: { required: true, maxLength: 30 },
  email: { required: true, maxLength: 255 },
};

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

interface ContactFormFieldsProps {
  register?: any;
  errors?: any;
  inputClassName?: string;
  position?: string;
  onPositionChange?: (value: string) => void;
  /** Use native HTML form (no react-hook-form) */
  native?: boolean;
}

const iconWrap = "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground";

const ContactFormFields = ({
  register,
  errors,
  inputClassName = "",
  position,
  onPositionChange,
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
            <select
              id="position"
              name="position"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue=""
            >
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
    </>
  );
};

export default ContactFormFields;
