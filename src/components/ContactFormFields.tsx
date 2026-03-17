import { Search, User, Phone, Mail, MapPin, Wine, Building2, MapPinned, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── i18n for form options ── */
const formI18n: Record<string, {
  positions: { value: string; label: string }[];
  references: { value: string; label: string }[];
  businessTypes: { value: string; label: string }[];
  locations: { value: string; label: string }[];
  challenges: { value: string; label: string }[];
  labels: {
    restaurant: string; restaurantPh: string;
    name: string; namePh: string;
    position: string; positionPh: string;
    phone: string;
    email: string; emailPh: string;
    city: string; cityPh: string;
    references: string; referencesPh: string;
    businessType: string; businessTypePh: string;
    locations: string; locationsPh: string;
    challenge: string; challengePh: string;
  };
}> = {
  es: {
    positions: [
      { value: "propietario", label: "Propietario/a" },
      { value: "director", label: "Director/a de F&B" },
      { value: "sommelier", label: "Sommelier / Jefe de bebidas" },
      { value: "jefe-sala", label: "Jefe/a de sala" },
      { value: "chef", label: "Chef ejecutivo" },
      { value: "responsable-bebidas", label: "Responsable de compras" },
      { value: "gerente", label: "Gerente / Dirección general" },
      { value: "otro", label: "Otro cargo" },
    ],
    references: [
      { value: "20-40", label: "20–40 referencias" },
      { value: "40-80", label: "40–80 referencias" },
      { value: "80-150", label: "80–150 referencias" },
      { value: "150-300", label: "150–300 referencias" },
      { value: "300-500", label: "300–500 referencias" },
      { value: "500+", label: "Más de 500 referencias" },
    ],
    businessTypes: [
      { value: "restaurante-independiente", label: "Restaurante independiente" },
      { value: "grupo-restauracion", label: "Grupo de restauración" },
      { value: "hotel", label: "Hotel / Resort" },
      { value: "wine-bar", label: "Wine bar / Vinoteca" },
      { value: "catering", label: "Catering / Eventos" },
      { value: "otro", label: "Otro tipo de negocio" },
    ],
    locations: [
      { value: "1", label: "1 local" },
      { value: "2-5", label: "2–5 locales" },
      { value: "6-15", label: "6–15 locales" },
      { value: "16-50", label: "16–50 locales" },
      { value: "50+", label: "Más de 50 locales" },
    ],
    challenges: [
      { value: "vender-mas-vino", label: "Aumentar ventas de vino" },
      { value: "mejorar-margenes", label: "Mejorar márgenes por botella" },
      { value: "rotacion-stock", label: "Reducir stock muerto / mejorar rotación" },
      { value: "formar-equipo", label: "Formar al equipo de sala en vino" },
      { value: "optimizar-carta", label: "Optimizar surtido y estructura de carta" },
      { value: "digitalizar-carta", label: "Digitalizar la carta de vinos" },
      { value: "gestionar-multi-local", label: "Centralizar gestión en varios locales" },
      { value: "otro", label: "Otro reto" },
    ],
    labels: {
      restaurant: "Nombre del restaurante", restaurantPh: "Ej. Restaurante La Viña",
      name: "Tu nombre completo", namePh: "Nombre y apellidos",
      position: "Tu cargo en el negocio", positionPh: "¿Cuál es tu rol?",
      phone: "Teléfono",
      email: "Email profesional", emailPh: "tu@restaurante.com",
      city: "Ciudad", cityPh: "Ej. Madrid",
      references: "Referencias en carta", referencesPh: "¿Cuántas referencias tienes?",
      businessType: "Tipo de establecimiento", businessTypePh: "¿Qué tipo de negocio es?",
      locations: "Locales que gestionas", locationsPh: "¿Cuántos locales?",
      challenge: "¿Qué quieres mejorar de tu carta?", challengePh: "Tu principal reto ahora mismo",
    },
  },
  en: {
    positions: [
      { value: "propietario", label: "Owner" },
      { value: "director", label: "F&B Director" },
      { value: "sommelier", label: "Sommelier / Beverage Manager" },
      { value: "jefe-sala", label: "Floor Manager" },
      { value: "chef", label: "Executive Chef" },
      { value: "responsable-bebidas", label: "Purchasing Manager" },
      { value: "gerente", label: "General Manager" },
      { value: "otro", label: "Other role" },
    ],
    references: [
      { value: "20-40", label: "20–40 references" },
      { value: "40-80", label: "40–80 references" },
      { value: "80-150", label: "80–150 references" },
      { value: "150-300", label: "150–300 references" },
      { value: "300-500", label: "300–500 references" },
      { value: "500+", label: "More than 500 references" },
    ],
    businessTypes: [
      { value: "restaurante-independiente", label: "Independent restaurant" },
      { value: "grupo-restauracion", label: "Restaurant group" },
      { value: "hotel", label: "Hotel / Resort" },
      { value: "wine-bar", label: "Wine bar" },
      { value: "catering", label: "Catering / Events" },
      { value: "otro", label: "Other business type" },
    ],
    locations: [
      { value: "1", label: "1 venue" },
      { value: "2-5", label: "2–5 venues" },
      { value: "6-15", label: "6–15 venues" },
      { value: "16-50", label: "16–50 venues" },
      { value: "50+", label: "More than 50 venues" },
    ],
    challenges: [
      { value: "vender-mas-vino", label: "Increase wine sales" },
      { value: "mejorar-margenes", label: "Improve margins per bottle" },
      { value: "rotacion-stock", label: "Reduce dead stock / improve rotation" },
      { value: "formar-equipo", label: "Train floor team on wine" },
      { value: "optimizar-carta", label: "Optimize assortment and list structure" },
      { value: "digitalizar-carta", label: "Digitize the wine list" },
      { value: "gestionar-multi-local", label: "Centralize multi-venue management" },
      { value: "otro", label: "Other challenge" },
    ],
    labels: {
      restaurant: "Restaurant name", restaurantPh: "E.g. The Wine House",
      name: "Your full name", namePh: "First and last name",
      position: "Your role", positionPh: "What's your role?",
      phone: "Phone",
      email: "Professional email", emailPh: "you@restaurant.com",
      city: "City", cityPh: "E.g. London",
      references: "List references", referencesPh: "How many references?",
      businessType: "Business type", businessTypePh: "What type of business?",
      locations: "Venues managed", locationsPh: "How many venues?",
      challenge: "What do you want to improve?", challengePh: "Your main challenge right now",
    },
  },
  it: {
    positions: [
      { value: "propietario", label: "Proprietario/a" },
      { value: "director", label: "Direttore F&B" },
      { value: "sommelier", label: "Sommelier / Responsabile bevande" },
      { value: "jefe-sala", label: "Responsabile di sala" },
      { value: "chef", label: "Chef esecutivo" },
      { value: "responsable-bebidas", label: "Responsabile acquisti" },
      { value: "gerente", label: "Direttore generale" },
      { value: "otro", label: "Altro ruolo" },
    ],
    references: [
      { value: "20-40", label: "20–40 referenze" },
      { value: "40-80", label: "40–80 referenze" },
      { value: "80-150", label: "80–150 referenze" },
      { value: "150-300", label: "150–300 referenze" },
      { value: "300-500", label: "300–500 referenze" },
      { value: "500+", label: "Più di 500 referenze" },
    ],
    businessTypes: [
      { value: "restaurante-independiente", label: "Ristorante indipendente" },
      { value: "grupo-restauracion", label: "Gruppo di ristorazione" },
      { value: "hotel", label: "Hotel / Resort" },
      { value: "wine-bar", label: "Wine bar / Enoteca" },
      { value: "catering", label: "Catering / Eventi" },
      { value: "otro", label: "Altro tipo di attività" },
    ],
    locations: [
      { value: "1", label: "1 locale" },
      { value: "2-5", label: "2–5 locali" },
      { value: "6-15", label: "6–15 locali" },
      { value: "16-50", label: "16–50 locali" },
      { value: "50+", label: "Più di 50 locali" },
    ],
    challenges: [
      { value: "vender-mas-vino", label: "Aumentare le vendite di vino" },
      { value: "mejorar-margenes", label: "Migliorare i margini per bottiglia" },
      { value: "rotacion-stock", label: "Ridurre lo stock morto / migliorare la rotazione" },
      { value: "formar-equipo", label: "Formare il team di sala sul vino" },
      { value: "optimizar-carta", label: "Ottimizzare assortimento e struttura della carta" },
      { value: "digitalizar-carta", label: "Digitalizzare la carta dei vini" },
      { value: "gestionar-multi-local", label: "Centralizzare la gestione multi-locale" },
      { value: "otro", label: "Altra sfida" },
    ],
    labels: {
      restaurant: "Nome del ristorante", restaurantPh: "Es. Ristorante La Vigna",
      name: "Il tuo nome completo", namePh: "Nome e cognome",
      position: "Il tuo ruolo", positionPh: "Qual è il tuo ruolo?",
      phone: "Telefono",
      email: "Email professionale", emailPh: "tu@ristorante.com",
      city: "Città", cityPh: "Es. Milano",
      references: "Referenze in carta", referencesPh: "Quante referenze hai?",
      businessType: "Tipo di attività", businessTypePh: "Che tipo di attività è?",
      locations: "Locali gestiti", locationsPh: "Quanti locali?",
      challenge: "Cosa vuoi migliorare della tua carta?", challengePh: "La tua sfida principale",
    },
  },
  fr: {
    positions: [
      { value: "propietario", label: "Propriétaire" },
      { value: "director", label: "Directeur F&B" },
      { value: "sommelier", label: "Sommelier / Responsable boissons" },
      { value: "jefe-sala", label: "Responsable de salle" },
      { value: "chef", label: "Chef exécutif" },
      { value: "responsable-bebidas", label: "Responsable achats" },
      { value: "gerente", label: "Directeur général" },
      { value: "otro", label: "Autre poste" },
    ],
    references: [
      { value: "20-40", label: "20–40 références" },
      { value: "40-80", label: "40–80 références" },
      { value: "80-150", label: "80–150 références" },
      { value: "150-300", label: "150–300 références" },
      { value: "300-500", label: "300–500 références" },
      { value: "500+", label: "Plus de 500 références" },
    ],
    businessTypes: [
      { value: "restaurante-independiente", label: "Restaurant indépendant" },
      { value: "grupo-restauracion", label: "Groupe de restauration" },
      { value: "hotel", label: "Hôtel / Resort" },
      { value: "wine-bar", label: "Bar à vin" },
      { value: "catering", label: "Traiteur / Événements" },
      { value: "otro", label: "Autre type d'activité" },
    ],
    locations: [
      { value: "1", label: "1 établissement" },
      { value: "2-5", label: "2–5 établissements" },
      { value: "6-15", label: "6–15 établissements" },
      { value: "16-50", label: "16–50 établissements" },
      { value: "50+", label: "Plus de 50 établissements" },
    ],
    challenges: [
      { value: "vender-mas-vino", label: "Augmenter les ventes de vin" },
      { value: "mejorar-margenes", label: "Améliorer les marges par bouteille" },
      { value: "rotacion-stock", label: "Réduire le stock mort / améliorer la rotation" },
      { value: "formar-equipo", label: "Former l'équipe de salle au vin" },
      { value: "optimizar-carta", label: "Optimiser l'assortiment et la structure de la carte" },
      { value: "digitalizar-carta", label: "Digitaliser la carte des vins" },
      { value: "gestionar-multi-local", label: "Centraliser la gestion multi-sites" },
      { value: "otro", label: "Autre défi" },
    ],
    labels: {
      restaurant: "Nom du restaurant", restaurantPh: "Ex. Restaurant Le Vignoble",
      name: "Votre nom complet", namePh: "Prénom et nom",
      position: "Votre poste", positionPh: "Quel est votre rôle ?",
      phone: "Téléphone",
      email: "Email professionnel", emailPh: "vous@restaurant.com",
      city: "Ville", cityPh: "Ex. Paris",
      references: "Références en carte", referencesPh: "Combien de références ?",
      businessType: "Type d'établissement", businessTypePh: "Quel type d'activité ?",
      locations: "Établissements gérés", locationsPh: "Combien d'établissements ?",
      challenge: "Que souhaitez-vous améliorer ?", challengePh: "Votre défi principal",
    },
  },
};

// Keep backwards-compatible exports (ES values)
export const positionOptions = formI18n.es.positions;
export const referencesOptions = formI18n.es.references;
export const businessTypeOptions = formI18n.es.businessTypes;
export const numLocationsOptions = formI18n.es.locations;
export const mainChallengeOptions = formI18n.es.challenges;

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
  const { lang } = useLanguage();
  const fi = formI18n[lang] || formI18n.es;
  const l = fi.labels;

  const cls = cn("pl-10 bg-background border-border", inputClassName);
  const isDemo = variant === "demo";
  const isAnalysis = variant === "analysis";
  const isResource = variant === "resource";
  const isContact = variant === "contact";

  const phoneRequired = isDemo || isContact || isResource;
  const positionRequired = isDemo || isContact || isResource;
  const showPosition = true;
  const showPhone = true;
  const showCity = true;
  const showReferences = true;
  const cityRequired = isDemo || isContact;
  const referencesRequired = isDemo || isContact || isResource;
  const showBusinessType = isDemo;
  const showLocations = isDemo;
  const showChallenge = isDemo;

  return (
    <>
      {/* Restaurant */}
      <div>
        <Label htmlFor="restaurant" className="text-sm font-medium">
          {l.restaurant} <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <Search size={16} className={iconWrap} />
          {native ? (
            <Input id="restaurant" name="restaurant" placeholder={l.restaurantPh} required maxLength={100} className={cls} />
          ) : (
            <Input id="restaurant" placeholder={l.restaurantPh} {...register("restaurant")} className={cls} />
          )}
        </div>
        {errors?.restaurant && <p className="text-xs text-destructive mt-1">{errors.restaurant.message}</p>}
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-sm font-medium">
          {l.name} <span className="text-destructive">*</span>
        </Label>
        <div className="relative mt-1.5">
          <User size={16} className={iconWrap} />
          {native ? (
            <Input id="name" name="name" placeholder={l.namePh} required maxLength={100} className={cls} />
          ) : (
            <Input id="name" placeholder={l.namePh} {...register("name")} className={cls} />
          )}
        </div>
        {errors?.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      {/* Position */}
      {showPosition && (
        <div>
          <Label htmlFor="position" className="text-sm font-medium">
            {l.position} {positionRequired && <span className="text-destructive">*</span>}
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="position" name="position" required={positionRequired} options={fi.positions} placeholder={l.positionPh} />
            ) : (
              <Select value={position} onValueChange={onPositionChange}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder={l.positionPh} />
                </SelectTrigger>
                <SelectContent>
                  {fi.positions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {errors?.position && <p className="text-xs text-destructive mt-1">{errors.position.message}</p>}
        </div>
      )}

      {/* Phone + Email */}
      <div className={showPhone ? "grid sm:grid-cols-2 gap-4" : ""}>
        {showPhone && (
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              {l.phone} {phoneRequired && <span className="text-destructive">*</span>}
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
            {l.email} <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Mail size={16} className={iconWrap} />
            {native ? (
              <Input id="email" name="email" type="email" placeholder={l.emailPh} required maxLength={255} className={cls} />
            ) : (
              <Input id="email" type="email" placeholder={l.emailPh} {...register("email")} className={cls} />
            )}
          </div>
          {errors?.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* City + References */}
      {(showCity || showReferences) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {showCity && (
            <div>
              <Label htmlFor="city" className="text-sm font-medium">
                {l.city} {cityRequired && <span className="text-destructive">*</span>}
              </Label>
              <div className="relative mt-1.5">
                <MapPin size={16} className={iconWrap} />
                {native ? (
                  <Input id="city" name="city" placeholder={l.cityPh} required={cityRequired} maxLength={80} className={cls} />
                ) : (
                  <Input id="city" placeholder={l.cityPh} {...register("city")} className={cls} />
                )}
              </div>
              {errors?.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
            </div>
          )}

          {showReferences && (
            <div>
              <Label htmlFor="references_count" className="text-sm font-medium">
                {l.references} {referencesRequired && <span className="text-destructive">*</span>}
              </Label>
              <div className="mt-1.5">
                {native ? (
                  <NativeSelect id="references_count" name="references_count" required={isDemo || isContact} options={fi.references} placeholder={l.referencesPh} />
                ) : (
                  <Select value={referencesCount} onValueChange={onReferencesCountChange}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder={l.referencesPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {fi.references.map((o) => (
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

      {/* BOFU Qualifying Fields (Demo only) */}
      {showBusinessType && (
        <div>
          <Label htmlFor="business_type" className="text-sm font-medium">
            {l.businessType}
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="business_type" name="business_type" options={fi.businessTypes} placeholder={l.businessTypePh} />
            ) : null}
          </div>
        </div>
      )}

      {showLocations && (
        <div>
          <Label htmlFor="num_locations" className="text-sm font-medium">
            {l.locations}
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="num_locations" name="num_locations" options={fi.locations} placeholder={l.locationsPh} />
            ) : null}
          </div>
        </div>
      )}

      {showChallenge && (
        <div>
          <Label htmlFor="main_challenge" className="text-sm font-medium">
            {l.challenge}
          </Label>
          <div className="mt-1.5">
            {native ? (
              <NativeSelect id="main_challenge" name="main_challenge" options={fi.challenges} placeholder={l.challengePh} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFormFields;
