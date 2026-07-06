import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  BarChart3,
  Check,
  Clock,
  FileUp,
  Loader2,
  Quote,
  ShieldCheck,
  Sparkles,
  ShoppingCart,
  Users,
  Wine,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";
import PhoneInput, { PREFIXES } from "@/components/PhoneInput";
import { ads, hasConsent } from "@/lib/analytics";
import { notifyLead } from "@/lib/notifyLead";
import { trackFormStart, trackFormSubmit } from "@/hooks/useIntentTracker";
import { supabase } from "@/integrations/supabase/client";
import winerimLogo from "@/assets/winerim-logo.webp";

const META_PIXEL_ID = "450273446324682";
const META_DATASET_ID = META_PIXEL_ID;
const CAMPAIGN_HOST = "go.winerim.wine";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type UTMKey = (typeof UTM_KEYS)[number];
type Attribution = Partial<Record<UTMKey | "fbclid" | "landing_url" | "referrer", string>>;

const positionOptions = [
  "Propietario / Dueño",
  "Sommelier",
  "Chef / Jefe de cocina",
  "F&B Manager / Director de operaciones",
  "Maître / Jefe de sala",
  "Gerente",
  "Otro",
];

const referenceOptions = [
  "Menos de 30",
  "30 - 50",
  "50 - 100",
  "100 - 200",
  "200 - 500",
  "Más de 500",
];

const businessTypeOptions = [
  "Restaurante gastronómico",
  "Restaurante con estrella Michelin",
  "Restaurante con Sol Repsol",
  "Bistró / Wine bar",
  "Hotel / Resort",
  "Grupo de restauración",
  "Cadena de restaurantes",
  "Otro",
];

const locationOptions = ["1 local", "2 - 5 locales", "6 - 15 locales", "Más de 15 locales"];

const challengeOptions = [
  "Reducir stock muerto en bodega",
  "Aumentar el ticket medio de vino",
  "Liberar tiempo del sommelier",
  "Mejorar la experiencia del comensal",
  "Vender mejor mi carta actual",
  "Aumentar el margen",
  "Otro",
];

const stats = [
  { value: "+2.000", label: "Restaurantes", icon: Wine },
  { value: "48h", label: "Implementación", icon: Zap },
  { value: "0", label: "Permanencia", icon: Users },
];

const benefits = [
  {
    lead: "Exclusivo para restaurantes premium:",
    rest: " diseñado para salas de alta hostelería con más de 40 referencias que priorizan la excelencia en la experiencia del comensal.",
  },
  {
    lead: "Mismo stock, +23% de ventas:",
    rest: " aumentamos la facturación en sala optimizando las recomendaciones, sin necesidad de añadir etiquetas nuevas a tu bodega.",
  },
  {
    lead: "Reduce un 40% el stock muerto:",
    rest: " la IA da salida automática a esas botellas de alta gama e ingresos parados que hoy no estás aprovechando en el servicio.",
  },
  {
    lead: "Sin riesgo ni permanencia:",
    rest: " prueba tu demo 100% personalizada, con total libertad contractual, y recibe un análisis inicial gratuito del margen oculto de tu carta.",
  },
];

const workflowSteps = [
  {
    icon: FileUp,
    title: "Subes albaranes y facturas",
    desc: "Winerim convierte compras, costes y proveedores en datos ordenados para tu bodega.",
  },
  {
    icon: ShoppingCart,
    title: "Conectas ventas y stock",
    desc: "Con TPV activo, cada botella vendida ayuda a leer rotación, disponibilidad y reposición.",
  },
  {
    icon: BarChart3,
    title: "Decides con margen real",
    desc: "Detectas vinos dormidos, fugas de margen y referencias que conviene mover o revisar.",
  },
];

const cases = [
  {
    number: "01",
    label: "REAL",
    title: "Travieso Bar",
    quote:
      "Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos.",
    person: "Nacho Otamendi",
    role: "Propietario / Sommelier · Travieso Bar",
  },
  {
    number: "02",
    label: "REAL",
    title: "Rotación de bodega",
    quote:
      "Nos ha permitido rotar mejor los vinos, incluir etiquetas nuevas sin miedo, y dedicar más tiempo al cliente.",
    person: "Simone Monese",
    role: "Sommelier · La Vecchia Griglia",
  },
  {
    number: "03",
    label: "REAL",
    title: "Ticket medio y margen",
    quote:
      "Me ayuda al escandallo en el día a día de los vinos, a tener un mayor control de la carta con el precio de compra y el precio de venta.",
    person: "Lorena Cuevas",
    role: "Sommelier · El Paladar By Zuriñe García",
  },
  {
    number: "04",
    label: "REAL",
    title: "Tiempo recuperado",
    quote:
      "Me ayuda a ahorrar tiempo en la creación de cartas de vinos, ofrecer un aliado al camarero en la venta de los vinos.",
    person: "Xavi Nolla",
    role: "Sommelier y Fundador · enoAula",
  },
];

const fieldBase =
  "h-10 rounded-md border border-white/15 bg-white/95 px-3 py-2 text-sm text-slate-950 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const values: Attribution = {
    landing_url: window.location.href,
  };

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) values[key] = value;
  });

  const fbclid = params.get("fbclid");
  if (fbclid) values.fbclid = fbclid;
  if (document.referrer) values.referrer = document.referrer;

  return values;
}

function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || []);
  dataLayer.push({ event, ...params });
}

function ensureMetaPixel() {
  if (typeof window === "undefined" || !hasConsent()) return;

  const win = window as any;
  if (typeof win.fbq === "function") {
    win.fbq("track", "PageView", {
      content_name: "meta_demo_landing",
      meta_pixel_id: META_PIXEL_ID,
      meta_dataset_id: META_DATASET_ID,
    });
    return;
  }

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as any;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  win.fbq = fbq;
  win._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  win.fbq("init", META_PIXEL_ID);
  win.fbq("track", "PageView", {
    content_name: "meta_demo_landing",
    meta_pixel_id: META_PIXEL_ID,
    meta_dataset_id: META_DATASET_ID,
  });
}

function fireMetaLead(attribution: Attribution) {
  if (typeof window === "undefined" || !hasConsent()) return;
  const fbq = (window as any).fbq;
  if (typeof fbq !== "function") return;

  fbq("track", "Lead", {
    content_name: "meta_demo_landing",
    content_category: "demo_request",
    meta_pixel_id: META_PIXEL_ID,
    meta_dataset_id: META_DATASET_ID,
    ...attribution,
  });
}

const FieldLabel = ({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) => (
  <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
    {children}
    {required ? <span className="ml-1 text-accent">*</span> : null}
  </label>
);

const SelectField = ({
  id,
  name,
  label,
  options,
  placeholder,
  required,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <FieldLabel htmlFor={id} required={required}>
      {label}
    </FieldLabel>
    <select id={id} name={name} required={required} defaultValue="" className={`${fieldBase} w-full`}>
      <option value="" disabled>
        {placeholder || "Selecciona una opción"}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const MetaDemoLanding = () => {
  const [submitting, setSubmitting] = useState(false);
  const [attribution, setAttribution] = useState<Attribution>({});
  const startedForm = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentAttribution = getAttribution();
    setAttribution(currentAttribution);
    (window as any).__WINERIM_CHAT_DISABLED__ = true;
    document
      .querySelectorAll("#wc-toggle, #winerim-web-chat, .winerim-web-chat, [data-winerim-chat]")
      .forEach((el) => el.remove());
    ensureMetaPixel();
    pushDataLayerEvent("meta_landing_view", {
      landing_host: typeof window !== "undefined" ? window.location.hostname : CAMPAIGN_HOST,
      ...currentAttribution,
    });
  }, []);

  const handleFormFocus = () => {
    if (startedForm.current) return;
    startedForm.current = true;
    trackFormStart("demo");
    pushDataLayerEvent("meta_demo_form_start", attribution);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const currentAttribution = getAttribution();
    const honeypot = ((fd.get("company_website") as string) || "").trim();
    const rawPhone = (fd.get("phone") as string)?.trim();
    const prefixCode = (fd.get("phone_prefix") as string)?.trim();
    const prefix = PREFIXES.find((p) => p.code === prefixCode);
    const name = (fd.get("name") as string)?.trim() || null;
    const email = (fd.get("email") as string)?.trim() || null;
    // Normalize to strict E.164: +<countrycode><number>, no spaces/dashes/parens
    const digitsOnly = rawPhone ? rawPhone.replace(/[^\d]/g, "") : "";
    const phone = digitsOnly
      ? (prefix ? `${prefix.dial}${digitsOnly}` : `+${digitsOnly}`)
      : null;

    // Honeypot anti-spam: silently drop submission
    if (honeypot) {
      navigate("/gracias?tipo=demo&origen=meta");
      return;
    }

    const leadData = {
      form_type: "demo",
      restaurant: (fd.get("restaurant") as string)?.trim() || null,
      name,
      position: (fd.get("position") as string)?.trim() || null,
      phone,
      email,
      city: (fd.get("city") as string)?.trim() || null,
      references_count: (fd.get("references_count") as string)?.trim() || null,
      business_type: (fd.get("business_type") as string)?.trim() || null,
      num_locations: (fd.get("num_locations") as string)?.trim() || null,
      main_challenge: (fd.get("main_challenge") as string)?.trim() || null,
      message: JSON.stringify({
        landing: "meta_demo_landing",
        requested_demo: true,
        meta_pixel_id: META_PIXEL_ID,
        meta_dataset_id: META_DATASET_ID,
        attribution: currentAttribution,
      }),
    };

    const { error } = await supabase.from("contact_leads").insert(leadData);
    if (error) {
      toast.error("No hemos podido enviar la solicitud. Inténtalo de nuevo.");
      setSubmitting(false);
      return;
    }

    const notificationLead = {
      ...leadData,
      source: "meta_demo_landing",
      lead_type: "demo",
      lead_category: "meta_campaign",
      meta_pixel_id: META_PIXEL_ID,
      meta_dataset_id: META_DATASET_ID,
      tracking_source: "meta_pixel",
      landing_url: currentAttribution.landing_url || null,
      referrer: currentAttribution.referrer || null,
      fbclid: currentAttribution.fbclid || null,
      utm_source: currentAttribution.utm_source || null,
      utm_medium: currentAttribution.utm_medium || null,
      utm_campaign: currentAttribution.utm_campaign || null,
      utm_content: currentAttribution.utm_content || null,
      utm_term: currentAttribution.utm_term || null,
    };
    const notified = await notifyLead(notificationLead);
    if (!notified) {
      toast.warning("Solicitud guardada. Revisaremos la notificación interna manualmente.");
    }
    trackFormSubmit("demo");
    pushDataLayerEvent("meta_demo_lead", currentAttribution);
    fireMetaLead(currentAttribution);

    // Forward to GastroFunnel upstream (Winerim leads-upsert) via edge function
    try {
      const { data: gfData, error: gfError } = await supabase.functions.invoke("submit-gastrofunnel", {
        body: {
          name: name || "",
          email: email || "",
          phone: phone || "",
          restaurant: leadData.restaurant || "",
          city: leadData.city || "",
          utm_source: currentAttribution.utm_source || "",
          utm_medium: currentAttribution.utm_medium || "",
          utm_campaign: currentAttribution.utm_campaign || "",
          utm_content: currentAttribution.utm_content || "",
          utm_term: currentAttribution.utm_term || "",
          fbclid: currentAttribution.fbclid || "",
          meta_pixel_id: META_PIXEL_ID,
          meta_dataset_id: META_DATASET_ID,
          source: "meta_demo_landing",
          landing_host: CAMPAIGN_HOST,
        },
      });
      if (gfError) {
        console.warn("[gastrofunnel] forward error", gfError);
      } else if ((gfData as any)?.success && typeof (window as any).fbq === "function" && hasConsent()) {
        (window as any).fbq("track", "Lead", {
          content_name: "gastrofunnel",
          meta_pixel_id: META_PIXEL_ID,
          meta_dataset_id: META_DATASET_ID,
        });
      }
    } catch (err) {
      console.warn("[gastrofunnel] forward exception", err);
    }

    ads.conversion("demo", {
      email: email || undefined,
      phone: phone || undefined,
      first_name: name?.split(" ")[0] || undefined,
      last_name: name?.split(" ").slice(1).join(" ") || undefined,
      city: leadData.city || undefined,
    });

    navigate("/gracias?tipo=demo&origen=meta");
  };

  return (
    <div className="min-h-screen bg-[#111312] text-white">
      <SEOHead
        title="Solicita una demo gratuita de Winerim"
        description="Demo gratuita de Winerim para restaurantes, hoteles y grupos de restauración. 15 minutos, sin compromiso y con análisis gratuito de tu carta incluido."
        url={`https://${CAMPAIGN_HOST}/`}
        image="https://winerim.wine/og-image.png"
        noindex
      />

      <a
        href="#demo-form"
        className="fixed right-4 top-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-wine px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/25 transition hover:bg-wine-dark sm:right-8 sm:px-5"
      >
        Solicita tu demo
        <ArrowRight className="h-3.5 w-3.5" />
      </a>

      <main>
        <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:min-h-screen lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(131,40,59,0.42),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_34%)]" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:min-h-[calc(100vh-5rem)]">
            <header className="flex items-center justify-between">
              <Link to="/" className="flex items-center" aria-label="Winerim">
                <img src={winerimLogo} alt="Winerim" className="h-9 w-auto sm:h-10" />
              </Link>
            </header>

            <div className="grid flex-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.32em] text-accent">
                  Sistema Winerim IA
                </span>
                <h1 className="font-heading text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  Solicita una demo gratuita de <span className="text-wine">Winerim</span>
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/74">
                  15 minutos · Sin compromiso · Adaptada a tu tipo de negocio
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li key={benefit.lead} className="flex items-start gap-3 text-sm leading-6 text-white/78">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span>
                        <strong className="font-semibold text-white">{benefit.lead}</strong>
                        {benefit.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 grid grid-cols-3 gap-3">
                  {stats.map(({ value, label, icon: Icon }) => (
                    <div key={label} className="rounded-lg border border-white/12 bg-white/[0.06] p-4">
                      <Icon className="mb-3 h-5 w-5 text-accent" />
                      <p className="font-heading text-2xl font-bold">{value}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-6 text-xs uppercase tracking-[0.14em] text-white/58">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    Respuesta en 24 h
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Sin compromiso
                  </span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Demo de 15 min
                  </span>
                </div>

                <figure className="mt-7 rounded-lg border border-white/12 bg-white/[0.06] p-5">
                  <Quote className="mb-3 h-5 w-5 text-accent" />
                  <blockquote className="text-sm italic leading-7 text-white/76">
                    "Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos."
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      NO
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Nacho Otamendi</p>
                      <p className="text-xs text-white/54">Propietario/Sommelier · Travieso Bar</p>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>

              <motion.div
                id="demo-form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="scroll-mt-24 rounded-lg border border-white/12 bg-[#191b1a]/95 p-5 shadow-2xl shadow-black/20 sm:p-7 lg:p-8"
              >
                <div className="mb-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-accent/18">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold">Solicita tu demo personalizada</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Cuanto más contexto nos des, mejor adaptaremos la demo a tu caso.
                  </p>
                </div>

                <form className="space-y-4" onFocusCapture={handleFormFocus} onSubmit={handleSubmit}>
                  {UTM_KEYS.map((key) => (
                    <input key={key} type="hidden" name={key} value={attribution[key] || ""} readOnly />
                  ))}
                  <input type="hidden" name="fbclid" value={attribution.fbclid || ""} readOnly />
                  <input type="hidden" name="meta_pixel_id" value={META_PIXEL_ID} readOnly />
                  <input type="hidden" name="meta_dataset_id" value={META_DATASET_ID} readOnly />
                  {/* Honeypot anti-spam: must stay empty for humans */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="company_website">Website</label>
                    <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel htmlFor="restaurant" required>
                      Nombre del restaurante
                    </FieldLabel>
                    <Input
                      id="restaurant"
                      name="restaurant"
                      required
                      placeholder="Ej. Restaurante La Viña"
                      className={fieldBase}
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel htmlFor="name" required>
                      Tu nombre completo
                    </FieldLabel>
                    <Input id="name" name="name" required placeholder="Nombre y apellidos" className={fieldBase} />
                  </div>

                  <SelectField
                    id="position"
                    name="position"
                    label="Tu cargo en el negocio"
                    placeholder="¿Cuál es tu rol?"
                    options={positionOptions}
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="phone" required>
                        Teléfono
                      </FieldLabel>
                      <PhoneInput id="phone" name="phone" native required className="bg-white/95 text-slate-950" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="email" required>
                        Email profesional
                      </FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="tu@restaurante.com"
                        className={fieldBase}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="city" required>
                        Ciudad
                      </FieldLabel>
                      <Input id="city" name="city" required placeholder="Ej. Madrid" className={fieldBase} />
                    </div>
                    <SelectField
                      id="references_count"
                      name="references_count"
                      label="Referencias en carta"
                      options={referenceOptions}
                      required
                    />
                  </div>

                  <SelectField
                    id="business_type"
                    name="business_type"
                    label="Tipo de establecimiento"
                    options={businessTypeOptions}
                  />

                  <SelectField
                    id="num_locations"
                    name="num_locations"
                    label="Locales que gestionas"
                    options={locationOptions}
                  />

                  <SelectField
                    id="main_challenge"
                    name="main_challenge"
                    label="¿Qué quieres mejorar de tu carta?"
                    placeholder="Tu principal reto ahora mismo"
                    options={challengeOptions}
                  />

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 w-full rounded-md bg-wine text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-wine-dark"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando
                      </>
                    ) : (
                      <>
                        Solicitar demo gratuita
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-5 text-white/50">
                    Sin compromiso. Al enviar aceptas nuestra{" "}
                    <Link to="/politica-privacidad" className="text-white underline underline-offset-4">
                      política de privacidad
                    </Link>
                    .
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111312] px-5 py-14 text-white sm:px-8 lg:px-10 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">Qué verás en la demo</span>
              <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Cómo Winerim convierte tu bodega en un sistema de decisión
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
                No es solo una carta digital. En la demo vemos cómo compras, TPV, stock, carta y margen pueden trabajar juntos para vender mejor el vino.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {workflowSteps.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="rounded-lg border border-white/12 bg-white/[0.055] p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/16">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#f4f1ed] px-5 py-16 text-slate-950 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">Casos de éxito</span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Lo que cuentan los restaurantes que ya usan Winerim
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Cuatro testimonios reales de profesionales que usan Winerim para vender, rotar y explicar mejor su carta.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {cases.map((caseItem) => (
                <article
                  key={caseItem.number}
                  className={`rounded-lg border p-5 ${
                    caseItem.label === "REAL"
                      ? "border-accent/30 bg-white"
                      : "border-slate-300 bg-white/70"
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-slate-300">{caseItem.number}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {caseItem.label}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold">{caseItem.title}</h3>
                  <p className="mt-4 text-sm italic leading-7 text-slate-600">"{caseItem.quote}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-sm font-semibold">{caseItem.person}</p>
                    <p className="mt-1 text-xs text-slate-500">{caseItem.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MetaDemoLanding;
